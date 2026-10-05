// Nhận xét, đánh giá của bạn đọc cho các bài Tin tức (Vercel Function + Vercel Blob).
//
// GET    /api/nhan-xet?slug=...            → nhận xét của bài (mới nhất trước) + điểm trung bình
// POST   /api/nhan-xet  {slug,rating,...}  → lưu và hiện ngay (không qua duyệt, theo yêu cầu chủ site)
// DELETE /api/nhan-xet?id=...              → xóa một nhận xét; cần header x-admin-key khớp ADMIN_KEY
//
// Biến môi trường trên Vercel:
//   BLOB_READ_WRITE_TOKEN  tự có khi tạo Blob store và kết nối với project
//   ADMIN_KEY              mã quản trị tự đặt, dùng để hiện nút Xóa trên trang (không có thì không xóa được qua web)
//
// Mỗi nhận xét là một tệp JSON: nhan-xet/<slug>/<thời gian>-<ngẫu nhiên>.json
// Cũng xóa được trực tiếp trong Vercel: Storage → Blob store → chọn tệp → Delete.
const { put, list, get, del } = require('@vercel/blob');
const crypto = require('node:crypto');

const PREFIX = 'nhan-xet/';
const SLUG_RE = /^[a-z0-9-]{3,120}$/;
const MAX_NAME = 60;
const MAX_COMMENT = 1000;
const MAX_SHOW = 100;
const RATE = { windowMs: 10 * 60 * 1000, max: 5 }; // mỗi IP 5 lượt / 10 phút (trong một phiên bản hàm)
const hits = new Map();

// Kho Blob có thể tạo ở chế độ private hoặc public; thử private trước, nhớ chế độ chạy được.
let access = process.env.BLOB_ACCESS === 'public' ? 'public' : 'private';
async function withAccess(fn) {
  try { return await fn(access); } catch (err) {
    const other = access === 'private' ? 'public' : 'private';
    const res = await fn(other).catch(() => { throw err; });
    access = other;
    return res;
  }
}

const clean = (v, max) => String(v == null ? '' : v)
  .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
  .replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n').trim().slice(0, max);
// Che chuỗi số dài (số điện thoại, số hợp đồng, CCCD) để khách không vô tình lộ thông tin.
const maskNumbers = (s) => s.replace(/(?:\+?\d[\s.-]?){9,}/g, (m) => m.replace(/\d/g, '*'));
const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date());

function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE.windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > RATE.max;
}

async function readOne(pathname) {
  const r = await withAccess((a) => get(pathname, { access: a }));
  if (!r || r.statusCode !== 200) return null;
  const data = JSON.parse(await new Response(r.stream).text());
  return { id: pathname, ...data };
}

async function readAll(slug) {
  const blobs = [];
  let cursor;
  do {
    const page = await list({ prefix: `${PREFIX}${slug}/`, cursor, limit: 1000 });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor && blobs.length < 5000);
  blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
  const items = (await Promise.all(blobs.map((b) => readOne(b.pathname).catch(() => null)))).filter(Boolean);
  const sum = items.reduce((s, x) => s + Number(x.rating || 0), 0);
  return {
    ok: true,
    count: items.length,
    average: items.length ? Math.round((sum / items.length) * 10) / 10 : 0,
    reviews: items.filter((x) => x.comment).slice(0, MAX_SHOW),
  };
}

module.exports = async function handler(req, res) {
  res.setHeader('X-Robots-Tag', 'noindex');
  // Chưa kết nối Blob store: báo cho trang ẩn khối nhận xét thay vì để khách gửi rồi lỗi.
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    res.setHeader('Cache-Control', 'public, s-maxage=60');
    return res.status(req.method === 'GET' ? 200 : 503).json({ ok: req.method === 'GET', disabled: true, error: 'Mục nhận xét chưa được bật.' });
  }
  try {
    if (req.method === 'GET') {
      const slug = String(req.query.slug || '');
      if (!SLUG_RE.test(slug)) return res.status(400).json({ ok: false, error: 'Bài viết không hợp lệ.' });
      // CDN của Vercel giữ kết quả 30 giây: đỡ tốn lượt gọi Blob khi nhiều người đọc.
      res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=120');
      return res.status(200).json(await readAll(slug));
    }

    if (req.method === 'POST') {
      res.setHeader('Cache-Control', 'no-store');
      const d = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      if (d.website) return res.status(200).json({ ok: true }); // ô bẫy bot
      const slug = String(d.slug || '');
      if (!SLUG_RE.test(slug)) return res.status(400).json({ ok: false, error: 'Bài viết không hợp lệ.' });
      const rating = Number(d.rating);
      if (!(Number.isInteger(rating) && rating >= 1 && rating <= 5)) return res.status(400).json({ ok: false, error: 'Chọn từ 1 đến 5 sao.' });
      if (String(d.comment || '').trim().length > MAX_COMMENT) return res.status(400).json({ ok: false, error: `Nhận xét tối đa ${MAX_COMMENT} ký tự.` });
      const comment = maskNumbers(clean(d.comment, MAX_COMMENT));
      const name = maskNumbers(clean(d.name, MAX_NAME));
      if (/https?:\/\/|www\.|\.(com|vn|net|xyz|top)\b/i.test(comment + ' ' + name)) {
        return res.status(400).json({ ok: false, error: 'Nhận xét không được chứa đường link.' });
      }
      const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
      if (limited(ip)) return res.status(429).json({ ok: false, error: 'Bạn gửi hơi nhiều, vui lòng thử lại sau ít phút.' });

      const review = { rating, name, comment, date: today() };
      const pathname = `${PREFIX}${slug}/${Date.now()}-${crypto.randomBytes(4).toString('hex')}.json`;
      await withAccess((a) => put(pathname, JSON.stringify(review), {
        access: a, contentType: 'application/json', addRandomSuffix: false, cacheControlMaxAge: 60,
      }));
      return res.status(200).json({ ok: true, review: { id: pathname, ...review } });
    }

    if (req.method === 'DELETE') {
      res.setHeader('Cache-Control', 'no-store');
      const key = process.env.ADMIN_KEY || '';
      const given = String(req.headers['x-admin-key'] || '');
      const okKey = key.length >= 8 && given.length === key.length &&
        crypto.timingSafeEqual(Buffer.from(given), Buffer.from(key));
      if (!okKey) return res.status(403).json({ ok: false, error: 'Sai mã quản trị.' });
      const id = String(req.query.id || '');
      if (!/^nhan-xet\/[a-z0-9-]{3,120}\/\d+-[a-f0-9]{8}\.json$/.test(id)) return res.status(400).json({ ok: false, error: 'Mã nhận xét không hợp lệ.' });
      await del(id);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST, DELETE');
    return res.status(405).json({ ok: false, error: 'Phương thức không hỗ trợ.' });
  } catch (err) {
    console.error('nhan-xet', err && err.message);
    return res.status(500).json({ ok: false, error: 'Chưa xử lý được, vui lòng thử lại.' });
  }
};
