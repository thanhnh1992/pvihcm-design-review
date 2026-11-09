// Nhận đơn đặt mua bảo hiểm TNDS bắt buộc ô tô từ trang /san-pham/bao-hiem-o-to/dat-mua/
// (chủ site yêu cầu 09/11/2026: "vẫn làm trên gg sheet như baohiempvi-vn").
// Bản chuyển của app/api/dat-hang-tnds/route.ts + app/order-pipeline.ts của baohiempvi-vn:
//   - kiểm tra thông tin khách (tools/data/order-input-rules.mjs, chép nguyên văn),
//   - chống gửi trùng 5 phút (cùng SĐT, họ tên hoặc biển số),
//   - tính lại phí ở máy chủ (tools/data/tnds.mjs), không tin số tiền trình duyệt gửi lên,
//   - ghi đơn vào Google Sheet qua Apps Script (cùng Sheet "Đơn hàng online" với baohiempvi-vn),
//   - trả mã QR VietQR đúng số tiền vào tài khoản Công ty Bảo hiểm PVI Thành Đô.
//
// Biến môi trường trên Vercel (Settings → Environment Variables), KHÔNG ghi vào code vì repo này công khai:
//   ORDER_SHEET_WEBHOOK   đường dẫn web app Apps Script (…/exec), giống bên baohiempvi-vn
//   ORDER_SHEET_SECRET    chuỗi khóa trùng SHARED_SECRET trong Apps Script
//   KV_REST_API_URL / KV_REST_API_TOKEN (hoặc UPSTASH_REDIS_REST_URL / _TOKEN)  tùy chọn: chống trùng bền hơn
// Chưa khai ORDER_SHEET_* thì đơn vẫn nhận, trả nội dung để khách gửi qua Zalo (giống baohiempvi-vn khi lỗi).
// Không ghi log dữ liệu khách.
import crypto from 'node:crypto';
import {
  GIAM_GIA_ONLINE_AP_DUNG_NNTX, ONLINE_DISCOUNT_RATE, describeDeriveInput, findTndsSelection, formatVnd, parseNntxLimit,
  parseNntxSeats, parseSeats, parseTonnage, quoteTnds, resolveBaseFee, resolveNntxFee,
} from '../tools/data/tnds.mjs';
import { checkTndsOrderInput, normalizeName, normalizePhone, normalizePlate } from '../tools/data/order-input-rules.mjs';

const SOURCE = 'pvihcm.com /san-pham/bao-hiem-o-to/';

/* ── Người nhận tiền: khóa cứng, sai một ký tự là dừng (payment-recipient.ts) ── */
const PAYMENT_RECIPIENT = { bankBin: '970436', bankName: 'Vietcombank - Chi nhánh Thủ Thiêm', accountNumber: '1013971104', accountName: 'CONG TY BAO HIEM PVI THANH DO' };
const VIETQR_BASE_URL = 'https://img.vietqr.io/image/970436-1013971104-compact2.png';
function validatePaymentRecipient() {
  if (PAYMENT_RECIPIENT.bankBin !== '970436' || PAYMENT_RECIPIENT.accountNumber !== '1013971104' || PAYMENT_RECIPIENT.accountName !== 'CONG TY BAO HIEM PVI THANH DO') throw new Error('PAYMENT_RECIPIENT_MISMATCH');
  if (!VIETQR_BASE_URL.includes(`${PAYMENT_RECIPIENT.bankBin}-${PAYMENT_RECIPIENT.accountNumber}-`)) throw new Error('PAYMENT_RECIPIENT_MISMATCH');
}
const cleanTransferNote = (v) => v.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/[^A-Za-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 50);
function buildPaymentQr(amount, parts) {
  if (!amount || amount <= 0) return null;
  validatePaymentRecipient();
  const phone = cleanTransferNote(parts.phone), plate = parts.plate ? cleanTransferNote(parts.plate) : '';
  const tail = [phone, plate].filter(Boolean).join(' ');
  const name = cleanTransferNote(parts.name).slice(0, Math.max(0, 50 - tail.length - 1)).trim();
  const note = [name, tail].filter(Boolean).join(' ').trim();
  const params = new URLSearchParams({ amount: String(Math.round(amount)), addInfo: note, accountName: PAYMENT_RECIPIENT.accountName });
  return { imageUrl: `${VIETQR_BASE_URL}?${params}`, accountNumber: PAYMENT_RECIPIENT.accountNumber, accountName: PAYMENT_RECIPIENT.accountName, bankName: PAYMENT_RECIPIENT.bankName, amount: Math.round(amount), transferNote: note };
}

/* ── Google Sheet qua Apps Script: không bao giờ làm hỏng phản hồi cho khách ── */
async function pushToSheet(row) {
  const endpoint = process.env.ORDER_SHEET_WEBHOOK, secret = process.env.ORDER_SHEET_SECRET;
  if (!endpoint || !secret) return { saved: false, reason: 'Chưa cấu hình ORDER_SHEET_WEBHOOK / ORDER_SHEET_SECRET trên Vercel.' };
  try {
    const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...row, secret }) });
    if (!r.ok) return { saved: false, reason: `Apps Script trả về ${r.status}.` };
    const j = await r.json();
    return j.ok ? { saved: true } : { saved: false, reason: j.error || 'Apps Script từ chối.' };
  } catch { return { saved: false, reason: 'Không gọi được Apps Script.' }; }
}

/* ── Chống gửi trùng (order-dedupe.ts): Redis nếu có, không thì nhớ trong phiên bản hàm ── */
const DUPLICATE_ORDER_ERROR = 'Thông tin này vừa được gửi trong 5 phút gần đây nên đơn không được gửi lại. Đơn trước đã được ghi nhận, nhân viên sẽ gọi lại cho anh/chị.';
const memory = (globalThis.__pvihcmOrderDedupe ??= new Map());
const windowSeconds = () => { const raw = process.env.ORDER_DEDUPE_SECONDS; if (raw === undefined || raw === '') return 300; const v = Number(raw); return Number.isFinite(v) && v >= 0 ? Math.floor(v) : 300; };
async function claimOrderSubmission(scope, values) {
  const seconds = windowSeconds();
  if (!seconds) return true;
  const keys = Object.entries(values).filter(([, v]) => v).map(([k, v]) => `chong-trung:${scope}:${k}:${crypto.createHash('sha256').update(v).digest('hex')}`);
  if (!keys.length) return true;
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL, token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      const r = await fetch(`${url.replace(/\/$/, '')}/pipeline`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(keys.map((k) => ['SET', k, '1', 'NX', 'EX', seconds])) });
      if (r.ok) { const rep = await r.json(); if (!rep.some((x) => x.error)) return rep.every((x) => x.result === 'OK'); }
    } catch { /* Redis lỗi thì dùng bộ nhớ tạm */ }
  }
  const now = Date.now();
  for (const [k, exp] of memory) if (exp <= now) memory.delete(k);
  const taken = keys.some((k) => memory.has(k));
  keys.forEach((k) => { if (!memory.has(k)) memory.set(k, now + seconds * 1000); });
  return !taken;
}

const asText = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
function orderCode() {
  const now = new Date(Date.now() + 7 * 3600 * 1000); // giờ Việt Nam
  const stamp = [now.getUTCFullYear() % 100, now.getUTCMonth() + 1, now.getUTCDate()].map((p) => String(p).padStart(2, '0')).join('');
  return `OT${stamp}-${crypto.randomInt(1000, 10000)}`;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'Chỉ nhận POST.' }); }
  // Chỉ nhận đơn gửi từ chính trang pvihcm (chặn trang khác gọi thẳng vào).
  const origin = req.headers.origin;
  if (origin) { try { if (new URL(origin).host !== req.headers.host) return res.status(403).json({ ok: false, error: 'Nguồn gửi không hợp lệ.' }); } catch { return res.status(403).json({ ok: false, error: 'Nguồn gửi không hợp lệ.' }); } }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = null; } }
  if (!body || typeof body !== 'object') return res.status(400).json({ ok: false, error: 'Dữ liệu gửi lên không hợp lệ.' });

  const name = normalizeName(asText(body.name, 120));
  const phone = normalizePhone(asText(body.phone, 20));
  const plate = asText(body.plate, 20).toUpperCase();
  const note = asText(body.note, 500);
  const inputError = checkTndsOrderInput({ name, phone, plate });
  if (inputError) return res.status(400).json({ ok: false, error: inputError.message, field: inputError.field });
  if (body.consent !== true) return res.status(400).json({ ok: false, error: 'Cần đồng ý cho phép xử lý dữ liệu.' });
  if (!(await claimOrderSubmission('tnds', { sdt: phone, ten: name.toLowerCase(), bien: normalizePlate(plate) }))) return res.status(429).json({ ok: false, error: DUPLICATE_ORDER_ERROR });

  // Tính lại phí ở máy chủ.
  const selection = findTndsSelection(asText(body.vehicleId, 32), asText(body.usageId, 32), asText(body.rowId, 48));
  const online = body.online === true;
  const deriveInput = { tonnage: parseTonnage(body.tonnage), seats: parseSeats(body.seats), business: body.business === true };
  const quote = selection ? quoteTnds(resolveBaseFee(selection.row, deriveInput), online) : null;
  const nntxSoCho = parseNntxSeats(body.nntxSeats), nntxMuc = parseNntxLimit(body.nntxLimit);
  const nntxGoc = selection ? resolveNntxFee(selection.usage.id, selection.row.id, { chon: body.nntx === true, soCho: nntxSoCho, mucTrachNhiem: nntxMuc }) : 0;
  const nntxPhi = online && GIAM_GIA_ONLINE_AP_DUNG_NNTX ? Math.round(nntxGoc * (1 - ONLINE_DISCOUNT_RATE)) : nntxGoc;
  const tongThanhToan = quote ? quote.total + nntxPhi : null;
  const thongSo = selection ? describeDeriveInput(selection.row, deriveInput) : '';
  const loaiXe = selection ? `${selection.vehicle.label} · ${selection.usage.label} · ${selection.row.label}${thongSo ? ` · ${thongSo}` : ''}` : null;
  const nntxDong = nntxPhi && nntxSoCho && nntxMuc;

  const code = orderCode();
  const message = [
    `[ĐƠN MỚI ${code}] Bảo hiểm TNDS bắt buộc ô tô`, `Khách: ${name}`, `SĐT: ${phone}`, plate ? `Biển số: ${plate}` : null,
    selection ? `Loại xe: ${loaiXe}` : 'Loại xe: chưa rõ, cần tư vấn', 'Thời hạn: 12 tháng',
    quote ? `Phí tạm tính: ${formatVnd(quote.base)} phí cơ bản + ${formatVnd(quote.vat)} VAT · tổng ${formatVnd(quote.total)}${online ? ` (đã giảm ${Math.round(ONLINE_DISCOUNT_RATE * 100)}% mua online, tiết kiệm ${formatVnd(quote.saving)})` : ''}` : 'Phí: cần nhân viên báo theo hồ sơ',
    nntxDong ? `Tai nạn người ngồi trên xe: ${nntxSoCho} chỗ × ${formatVnd(nntxMuc)}/người/vụ × 0,1% = ${formatVnd(nntxPhi)} (đã gồm VAT)` : null,
    nntxPhi && tongThanhToan ? `TỔNG THANH TOÁN: ${formatVnd(tongThanhToan)}` : null,
    note ? `Ghi chú: ${note}` : null, `Nguồn: ${SOURCE}`,
  ].filter(Boolean).join('\n');

  const sheet = await pushToSheet({
    code, product: 'Bảo hiểm TNDS bắt buộc ô tô', name, phone, subject: plate,
    detail: selection ? `${loaiXe}${nntxDong ? ` · NNTX ${nntxSoCho} chỗ × ${formatVnd(nntxMuc)} = ${formatVnd(nntxPhi)}` : ''}` : 'Chưa rõ, cần tư vấn',
    base: quote ? formatVnd(quote.base) : '', vat: quote ? formatVnd(quote.vat) : '', total: tongThanhToan ? formatVnd(tongThanhToan) : '',
    online, note, source: SOURCE,
  });

  let payment = null, paymentError;
  try { payment = buildPaymentQr(tongThanhToan, { name, phone, plate }); } catch { paymentError = 'Không thể tạo mã thanh toán. Vui lòng liên hệ tư vấn viên.'; }
  const customerMessage = payment ? [message, '', '--- CHUYỂN KHOẢN ---', `Ngân hàng: ${payment.bankName}`, `Số tài khoản: ${payment.accountNumber}`, `Chủ tài khoản: ${payment.accountName}`, `Số tiền: ${formatVnd(payment.amount)}`, `Nội dung: ${payment.transferNote}`].join('\n') : message;

  // Giống baohiempvi-vn: không đẩy Zalo OA tự động; đơn đã vào Sheet, khách có nút gửi qua Zalo.
  return res.status(200).json({ ok: true, code, payment, paymentError, sheet: { saved: sheet.saved }, delivered: false, message: customerMessage });
}
