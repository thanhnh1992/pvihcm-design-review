// Đánh giá thật cho trang tai nạn. Dùng Redis đã nối project, không tạo điểm mẫu.
// Khóa có tiền tố riêng, không đụng dữ liệu đơn hàng hay website khác.
import crypto from 'node:crypto';

const PRODUCT = 'bao-hiem-tai-nan';
const PREFIX = `pvihcm:product-reviews:${PRODUCT}`;
const keys = [`${PREFIX}:votes`, `${PREFIX}:totals`, `${PREFIX}:recent`];
const HASH = (s) => crypto.createHash('sha256').update(s).digest('hex');
const clean = (s, max) => String(s ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max)
  .replace(/(?:\+?\d[\s.-]?){9,}/g, (v) => v.replace(/\d/g, '*'));

// Lưu phiếu + tổng điểm trong một thao tác nguyên tử. Gửi lại cùng mã không tăng lượt.
export const SAVE = `
local previous = redis.call('HGET', KEYS[1], ARGV[1])
if previous then return {0, redis.call('HGET', KEYS[2], 'count') or '0', redis.call('HGET', KEYS[2], 'sum') or '0'} end
local hits = redis.call('INCR', KEYS[4])
if hits == 1 then redis.call('EXPIRE', KEYS[4], 3600) end
if hits > 5 then return {-1, 0, 0} end
redis.call('HSET', KEYS[1], ARGV[1], ARGV[2])
local count = redis.call('HINCRBY', KEYS[2], 'count', 1)
local sum = redis.call('HINCRBY', KEYS[2], 'sum', ARGV[3])
redis.call('LPUSH', KEYS[3], ARGV[2])
redis.call('LTRIM', KEYS[3], 0, 49)
return {1, count, sum}`;

export const READ = `
local out = {redis.call('HGET', KEYS[1], 'count') or '0', redis.call('HGET', KEYS[1], 'sum') or '0'}
local rows = redis.call('LRANGE', KEYS[2], 0, 49)
for _, row in ipairs(rows) do table.insert(out, row) end
return out`;

async function redis(command) {
  const endpoint = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!endpoint || !token) throw new Error('UNAVAILABLE');
  const r = await fetch(endpoint.replace(/\/$/, ''), {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command), signal: AbortSignal.timeout(8000),
  });
  if (!r.ok) throw new Error('UNAVAILABLE');
  const data = await r.json();
  if (data.error || !Array.isArray(data.result)) throw new Error('UNAVAILABLE');
  return data.result;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'Phương thức không hỗ trợ.' });
  }
  try {
    if (req.method === 'GET') {
      const [rawCount, rawSum, ...rows] = await redis(['EVAL', READ, 2, keys[1], keys[2]]);
      const count = Number(rawCount), sum = Number(rawSum);
      return res.status(200).json({ ok: true, count, average: count ? Math.round(sum / count * 10) / 10 : 0,
        reviews: rows.map((r) => JSON.parse(r)) });
    }
    if (!/^application\/json\b/i.test(String(req.headers['content-type'] || ''))) {
      return res.status(415).json({ ok: false, error: 'Định dạng gửi không hợp lệ.' });
    }
    if (req.headers.origin) {
      let same = false;
      try { same = new URL(req.headers.origin).host === req.headers.host; } catch {}
      if (!same) return res.status(403).json({ ok: false, error: 'Nguồn gửi không hợp lệ.' });
    }
    let d = req.body;
    if (typeof d === 'string') { try { d = JSON.parse(d); } catch { d = null; } }
    if (!d || typeof d !== 'object' || Array.isArray(d)) return res.status(400).json({ ok: false, error: 'Dữ liệu không hợp lệ.' });
    if (d.website) return res.status(400).json({ ok: false, error: 'Không gửi được đánh giá.' });
    if (!Number.isInteger(d.rating) || d.rating < 1 || d.rating > 5) return res.status(400).json({ ok: false, error: 'Chọn từ 1 đến 5 sao.' });
    if (!/^[a-f0-9-]{36}$/i.test(String(d.submissionId || ''))) return res.status(400).json({ ok: false, error: 'Mã gửi không hợp lệ. Vui lòng tải lại trang.' });
    if (String(d.comment || '').length > 1000 || String(d.name || '').length > 60) return res.status(400).json({ ok: false, error: 'Tên tối đa 60 ký tự, nhận xét tối đa 1.000 ký tự.' });
    const name = clean(d.name, 60), comment = clean(d.comment, 1000);
    if (/https?:\/\/|www\./i.test(name + ' ' + comment)) return res.status(400).json({ ok: false, error: 'Không chèn đường dẫn trong nhận xét.' });
    const id = HASH(d.submissionId.toLowerCase());
    // Không lưu IP thô. Khóa giới hạn tự hết hạn sau một giờ.
    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
    const rateKey = `${PREFIX}:rate:${HASH(ip + ':' + new Date().toISOString().slice(0, 13))}`;
    const review = { id, rating: d.rating, name, comment, date: new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date()) };
    const [saved, count, sum] = await redis(['EVAL', SAVE, 4, ...keys, rateKey, id, JSON.stringify(review), d.rating]);
    if (Number(saved) === -1) return res.status(429).json({ ok: false, error: 'Bạn đã gửi nhiều lượt. Vui lòng thử lại sau.' });
    return res.status(200).json({ ok: true, duplicate: Number(saved) === 0, count: Number(count), average: Math.round(Number(sum) / Number(count) * 10) / 10 });
  } catch {
    // Không lộ lỗi máy chủ, thông tin khách hay khóa kết nối.
    return res.status(503).json({ ok: false, error: 'Mục đánh giá tạm thời chưa sẵn sàng. Vui lòng thử lại sau.' });
  }
}
