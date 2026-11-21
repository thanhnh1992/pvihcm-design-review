import { perMonth, TERMS } from '../tools/data/bhyt.mjs';
import { isValidEmail, isValidPhone, normalizeEmail, normalizePhone } from '../tools/data/order-input-rules.mjs';
import { claimOrderSubmission, orderCode, pushToSheet } from './_lib/order-sheet.mjs';

export default async function handler(req, res) {
  const fail = (status, error) => res.status(status).json({ ok: false, error });
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return fail(405, 'Chỉ nhận POST.');
  }
  const origin = req.headers.origin;
  if (origin) {
    try {
      if (new URL(origin).host !== req.headers.host) return fail(403, 'Nguồn gửi không hợp lệ.');
    } catch { return fail(403, 'Nguồn gửi không hợp lệ.'); }
  }
  const contentType = (req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
  if (contentType !== 'application/json') return fail(415, 'Định dạng yêu cầu không hợp lệ.');
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return fail(400, 'Thông tin đăng ký không hợp lệ.'); }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return fail(400, 'Thông tin đăng ký không hợp lệ.');

  const { headcount, term, consent } = body;
  if (!Number.isInteger(headcount) || headcount < 1 || headcount > 10) return fail(400, 'Số người tham gia phải từ 1 đến 10.');
  if (!TERMS.includes(term)) return fail(400, 'Vui lòng chọn kỳ đóng hợp lệ.');
  if (typeof body.phone !== 'string' || body.phone.length > 24 || !isValidPhone(body.phone)) return fail(400, 'Vui lòng nhập số điện thoại Việt Nam gồm 10 chữ số.');
  if (typeof body.email !== 'string' || !isValidEmail(body.email)) return fail(400, 'Vui lòng nhập email hợp lệ.');
  if (consent !== true) return fail(400, 'Vui lòng đồng ý để PVI Thành Đô xử lý yêu cầu.');
  const phone = normalizePhone(body.phone);
  const email = normalizeEmail(body.email);

  if (!process.env.ORDER_SHEET_WEBHOOK || !process.env.ORDER_SHEET_SECRET) {
    return fail(503, 'Kênh đăng ký online chưa sẵn sàng. Anh/chị có thể liên hệ qua Zalo.');
  }
  if (!(await claimOrderSubmission('bhyt', { request: `${phone}|${email}|${headcount}|${term}` }))) {
    return fail(429, 'Thông tin này vừa được gửi. Nếu chưa có mã yêu cầu, anh/chị có thể liên hệ qua Zalo để kiểm tra.');
  }

  const total = Array.from({ length: headcount }, (_, i) => perMonth(i)).reduce((sum, amount) => sum + amount, 0) * term;
  const code = orderCode('BHYT');
  const sheet = await pushToSheet({
    code,
    product: 'Bảo hiểm y tế hộ gia đình',
    phone,
    email,
    headcount,
    term,
    subject: 'Đăng ký mua BHYT hộ gia đình',
    detail: `${headcount} người · Kỳ đóng ${term} tháng · Email: ${email}`,
    total,
    online: false,
    note: 'Yêu cầu đăng ký BHYT, chưa thu tiền. Khách đồng ý để PVI Thành Đô liên hệ xử lý yêu cầu.',
    source: 'pvihcm.com /san-pham/bao-hiem-y-te/',
  });
  if (!sheet.saved) return fail(503, 'Chưa xác nhận lưu yêu cầu. Anh/chị có thể liên hệ qua Zalo để kiểm tra.');
  return res.status(201).json({ ok: true, code });
}
