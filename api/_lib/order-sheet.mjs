// Dùng chung cho các hàm nhận đơn / yêu cầu báo giá của pvihcm (api/dat-hang-tnds.mjs, api/bao-gia-tai-nan.mjs).
// Thư mục bắt đầu bằng "_" nên Vercel không coi đây là một địa chỉ API.
//   pushToSheet(row): ghi 1 dòng vào Google Sheet "Đơn hàng online" qua Apps Script (Apps Script tự gửi mail báo).
//     Cần biến môi trường trên Vercel: ORDER_SHEET_WEBHOOK, ORDER_SHEET_SECRET (repo công khai, KHÔNG ghi vào code).
//   claimOrderSubmission(scope, values): chống gửi trùng 5 phút (Redis nếu có KV_REST_API_*, không thì bộ nhớ tạm).
//   orderCode(prefix): mã yêu cầu theo ngày giờ Việt Nam, ví dụ OT261116-1234.
// Không ghi log dữ liệu khách.
import crypto from 'node:crypto';

/* ── Google Sheet qua Apps Script: không bao giờ làm hỏng phản hồi cho khách ── */
export async function pushToSheet(row) {
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
export const DUPLICATE_ORDER_ERROR = 'Thông tin này vừa được gửi trong 5 phút gần đây nên đơn không được gửi lại. Đơn trước đã được ghi nhận, nhân viên sẽ gọi lại cho anh/chị.';
const memory = (globalThis.__pvihcmOrderDedupe ??= new Map());
const windowSeconds = () => { const raw = process.env.ORDER_DEDUPE_SECONDS; if (raw === undefined || raw === '') return 300; const v = Number(raw); return Number.isFinite(v) && v >= 0 ? Math.floor(v) : 300; };
export async function claimOrderSubmission(scope, values) {
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

export const asText = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
export function orderCode(prefix = 'OT') {
  const now = new Date(Date.now() + 7 * 3600 * 1000); // giờ Việt Nam
  const stamp = [now.getUTCFullYear() % 100, now.getUTCMonth() + 1, now.getUTCDate()].map((p) => String(p).padStart(2, '0')).join('');
  return `${prefix}${stamp}-${crypto.randomInt(1000, 10000)}`;
}

/* ── Yêu cầu tư vấn / bảng chào cháy nổ bắt buộc (bản chuyển pushCnbbLead trong order-pipeline.ts của baohiempvi-vn):
   ghi vào tab "CNBB" của cùng Google Sheet (action "cnbb"); Apps Script chưa có tab đó thì ghi sang tab đơn hàng. ── */
export async function pushCnbbLead(lead) {
  const endpoint = process.env.ORDER_SHEET_WEBHOOK, secret = process.env.ORDER_SHEET_SECRET;
  if (!endpoint || !secret) return { saved: false, reason: 'Chưa cấu hình ORDER_SHEET_WEBHOOK / ORDER_SHEET_SECRET trên Vercel.' };
  try {
    const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'cnbb', cnbbSecret: secret, ...lead }) });
    if (r.ok) { const j = await r.json(); if (j.ok) return { saved: true, tab: 'CNBB' }; }
  } catch { /* rơi xuống đường dự phòng */ }
  const kindLabel = lead.kind === 'bang-chao' ? 'Nhận bảng chào' : 'Nhận tư vấn';
  const fb = await pushToSheet({
    code: lead.code, product: `Bảo hiểm cháy nổ bắt buộc, ${kindLabel}`, name: lead.company, phone: lead.phone, subject: lead.company,
    detail: [`Email: ${lead.email}`, lead.detail].filter(Boolean).join(' · '),
    note: 'Yêu cầu từ công cụ cháy nổ bắt buộc (chưa có tab CNBB), chưa phát hành đơn', source: lead.source,
  });
  return fb.saved ? { saved: true, tab: 'don-hang' } : { saved: false, reason: fb.reason };
}
