// Nhận "Nhận tư vấn miễn phí" / "Nhận bảng chào miễn phí" từ bộ tra cứu cháy nổ trang /san-pham/chay-no-bat-buoc/
// (chủ site yêu cầu 17/11/2026: bấm gửi là ghi vào Google Sheet, trường bảo hiểm cháy nổ bắt buộc).
// Bản chuyển app/api/chay-no-lead/route.ts của baohiempvi-vn: kiểm tra SĐT, email, tên đơn vị; chống trùng 5 phút;
// ghi tab "CNBB" (dự phòng: tab đơn hàng). Không phát hành đơn, không nhận tiền. Phí do trình duyệt gửi chỉ để ghi chú.
// Biến môi trường: xem api/_lib/order-sheet.mjs. Không ghi log dữ liệu khách.
import { CNBB_LEAD_FIELDS, cnbbLeadFieldErrors, normalizeCompanyName, normalizeEmail, normalizePhone } from '../tools/data/order-input-rules.mjs';
import { DUPLICATE_ORDER_ERROR, asText, claimOrderSubmission, orderCode, pushCnbbLead } from './_lib/order-sheet.mjs';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'Chỉ nhận POST.' }); }
  const origin = req.headers.origin;
  if (origin) { try { if (new URL(origin).host !== req.headers.host) return res.status(403).json({ ok: false, error: 'Nguồn gửi không hợp lệ.' }); } catch { return res.status(403).json({ ok: false, error: 'Nguồn gửi không hợp lệ.' }); } }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = null; } }
  if (!body || typeof body !== 'object') return res.status(400).json({ ok: false, error: 'Dữ liệu gửi lên không hợp lệ.' });

  const kind = body.kind === 'bang-chao' ? 'bang-chao' : body.kind === 'tu-van' ? 'tu-van' : null;
  if (!kind) return res.status(400).json({ ok: false, error: 'Yêu cầu không hợp lệ.' });
  const phone = normalizePhone(asText(body.phone, 20));
  const email = normalizeEmail(asText(body.email, 120));
  const company = normalizeCompanyName(asText(body.company, 150));
  const errors = cnbbLeadFieldErrors({ phone, email, company });
  const bad = CNBB_LEAD_FIELDS.find((f) => errors[f]);
  if (bad) return res.status(400).json({ ok: false, error: errors[bad], field: bad });
  if (body.consent !== true) return res.status(400).json({ ok: false, error: 'Cần đồng ý để chuyên viên liên hệ tư vấn.', field: 'consent' });
  if (!(await claimOrderSubmission(`cnbb-${kind}`, { sdt: phone, ten: company.toLowerCase() }))) return res.status(429).json({ ok: false, error: DUPLICATE_ORDER_ERROR });

  const assetCode = asText(body.assetCode, 12), assetName = asText(body.assetName, 160), sum = asText(body.sum, 30), fee = asText(body.fee, 40), purpose = asText(body.purpose, 60);
  const detail = [
    assetName ? `Tài sản: ${assetName}${assetCode ? ` (mã ${assetCode})` : ''}` : '',
    sum ? `Giá trị bảo hiểm: ${sum} triệu đồng` : '',
    fee ? `Phí tham khảo (gồm VAT): ${fee}` : '',
    purpose ? `Mục đích: ${purpose}` : '',
  ].filter(Boolean).join(' · ');
  const code = orderCode('CB');
  const sheet = await pushCnbbLead({ code, kind, phone, email, company, detail, source: 'pvihcm.com /san-pham/chay-no-bat-buoc/' });
  return res.status(200).json({ ok: true, code, sheet: { saved: sheet.saved } });
}
