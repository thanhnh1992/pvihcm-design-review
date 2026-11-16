// Nhận yêu cầu "Nhận báo giá chi tiết" từ bộ tính phí trang /san-pham/bao-hiem-tai-nan/
// (chủ site yêu cầu 16/11/2026: lấy thông tin đã nhập ở bộ tính phí kèm SĐT, đẩy vào Google Sheet và báo mail).
//   - kiểm tra họ tên, SĐT (tools/data/order-input-rules.mjs, dùng chung với đơn TNDS),
//   - chống gửi trùng 5 phút (cùng SĐT hoặc họ tên),
//   - tính lại phí ở máy chủ theo tools/data/accident.mjs (không tin số tiền trình duyệt gửi lên),
//   - ghi vào Google Sheet "Đơn hàng online" qua Apps Script; Apps Script tự gửi mail báo.
// Biến môi trường: xem api/_lib/order-sheet.mjs (ORDER_SHEET_WEBHOOK, ORDER_SHEET_SECRET). Không ghi log dữ liệu khách.
import {
  accidentPlans, audienceKinds, groupTiers, occupationGroups, premiumFor, shortTermRate, tierIndexForHeadcount, formatVnd,
} from '../tools/data/accident.mjs';
import { checkContactOrderInput, normalizeName, normalizePhone } from '../tools/data/order-input-rules.mjs';
import { DUPLICATE_ORDER_ERROR, asText, claimOrderSubmission, orderCode, pushToSheet } from './_lib/order-sheet.mjs';

const SOURCE = 'pvihcm.com /san-pham/bao-hiem-tai-nan/';
const PRODUCT = 'Bảo hiểm tai nạn 24/24';
const clean = (s) => String(s).replace(/\s+—\s+/g, ', ').replace(/—/g, ', ');

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'Chỉ nhận POST.' }); }
  // Chỉ nhận yêu cầu gửi từ chính trang pvihcm (chặn trang khác gọi thẳng vào).
  const origin = req.headers.origin;
  if (origin) { try { if (new URL(origin).host !== req.headers.host) return res.status(403).json({ ok: false, error: 'Nguồn gửi không hợp lệ.' }); } catch { return res.status(403).json({ ok: false, error: 'Nguồn gửi không hợp lệ.' }); } }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = null; } }
  if (!body || typeof body !== 'object') return res.status(400).json({ ok: false, error: 'Dữ liệu gửi lên không hợp lệ.' });

  const name = normalizeName(asText(body.name, 120));
  const phone = normalizePhone(asText(body.phone, 20));
  const inputError = checkContactOrderInput({ name, phone });
  if (inputError) return res.status(400).json({ ok: false, error: inputError.message, field: inputError.field });
  if (body.consent !== true) return res.status(400).json({ ok: false, error: 'Cần đồng ý cho phép xử lý dữ liệu.' });

  // Lựa chọn ở bộ tính phí: chỉ nhận giá trị có trong danh mục, sai thì coi như chưa rõ.
  const kind = audienceKinds.find((k) => k.id === body.aud) || null;
  const occ = occupationGroups.find((o) => o.id === body.occ) || null;
  const plan = accidentPlans.find((p) => p.id === body.plan) || null;
  const headcount = Number.isInteger(body.headcount) && body.headcount >= 1 && body.headcount <= 100000 ? body.headcount : null;
  const months = Number.isInteger(body.term) && body.term >= 1 && body.term <= 12 ? body.term : 12;

  if (!(await claimOrderSubmission('tai-nan', { sdt: phone, ten: name.toLowerCase() }))) return res.status(429).json({ ok: false, error: DUPLICATE_ORDER_ERROR });

  // Tính lại phí ở máy chủ, cùng công thức premiumFor() mà bộ tính phí dùng.
  const n = headcount || 1;
  const ti = tierIndexForHeadcount(n), tier = groupTiers[ti];
  const per = plan ? premiumFor(plan, ti, months) : null;
  const total = per === null ? null : per * n;
  const disc = Math.round(tier.discount * 100), rate = shortTermRate(months);

  const code = orderCode('TN');
  const detail = [
    kind ? `Đối tượng: ${clean(kind.label)}` : null,
    occ ? `Nhóm nghề: ${clean(occ.label)}` : null,
    `Gói: ${plan ? plan.label : 'Mức khác, cần tư vấn'}`,
    `${headcount ? `${headcount} người` : 'Số người chưa rõ'} · ${months} tháng`,
    per !== null ? `Phí tham chiếu ${formatVnd(per)}/người (${clean(tier.label)}${disc ? `, giảm ${disc}%` : ''}${rate < 1 ? `, tỷ lệ ngắn hạn ${Math.round(rate * 100)}%` : ''})` : null,
  ].filter(Boolean).join(' · ');

  const sheet = await pushToSheet({
    code, product: PRODUCT, name, phone, subject: 'Yêu cầu báo giá chi tiết',
    detail, base: '', vat: '', total: total !== null ? formatVnd(total) : '',
    online: false, note: 'Phí tạm tính, chưa gồm thẩm định nhóm nghề. Cần gửi báo giá chính thức.', source: SOURCE,
  });

  return res.status(200).json({ ok: true, code, sheet: { saved: sheet.saved } });
}
