// Nhận xét, đánh giá của bạn đọc (Vercel Function). Lưu ở Vercel Blob nếu đã kết nối, không thì Redis (KV) của project.
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
// Che bớt tên người gửi khi hiện công khai (chủ site 23/11/2026): mỗi chữ trừ chữ cuối còn chữ cái đầu + "***",
// tên một chữ còn chữ cái đầu + "***". Ví dụ "Nguyễn Văn Minh" → "N*** V*** Minh", "Minh" → "M***".
// Tên đầy đủ chỉ gửi vào Google Sheet cho chủ site.
function maskName(name) {
  const w = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (!w.length) return '';
  const hide = (x) => Array.from(x)[0] + '***';
  if (w.length === 1) return hide(w[0]);
  return w.slice(0, -1).map(hide).concat(w[w.length - 1]).join(' ');
}
const publicView = (x) => ({ ...x, name: maskName(x.name) });
const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date());

function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE.windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > RATE.max;
}

// Gửi thêm 1 dòng sang Google Sheet (tab "Đánh giá") qua Apps Script đang nhận đơn của pvihcm
// (docs/apps-script-don-hang.gs, action "danh-gia"). Dùng lại ORDER_SHEET_WEBHOOK / ORDER_SHEET_SECRET trên Vercel.
// Lỗi hay chưa cấu hình thì bỏ qua: đánh giá vẫn lưu ở Blob, khách không bị báo lỗi.
async function pushReviewToSheet(row) {
  const endpoint = process.env.ORDER_SHEET_WEBHOOK, secret = process.env.ORDER_SHEET_SECRET;
  if (!endpoint || !secret) return false;
  try {
    const r = await fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'danh-gia', danhGiaSecret: secret, ...row }), signal: AbortSignal.timeout(6000),
    });
    return r.ok;
  } catch (e) { return false; }
}

async function readOne(pathname) {
  const r = await withAccess((a) => get(pathname, { access: a }));
  if (!r || r.statusCode !== 200) return null;
  const data = JSON.parse(await new Response(r.stream).text());
  return { id: pathname, ...data };
}

/* ── Kho Redis dự phòng (22/11/2026): pvihcm chưa kết nối Blob store nhưng đã có Redis (KV_REST_API_* / UPSTASH_*,
   đang dùng cho api/danh-gia-san-pham.mjs). Không có Blob thì lưu ở Redis, khóa riêng pvihcm:nhan-xet:<slug>
   (danh sách JSON, mới nhất đứng đầu), không đụng khóa khác. ── */
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const HAS_BLOB = !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
const HAS_REDIS = !!(REDIS_URL && REDIS_TOKEN);
const rkey = (slug) => `pvihcm:nhan-xet:${slug}`;
async function redis(command) {
  const r = await fetch(REDIS_URL.replace(/\/$/, ''), {
    method: 'POST', headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command), signal: AbortSignal.timeout(8000),
  });
  if (!r.ok) throw new Error('REDIS ' + r.status);
  const d = await r.json();
  if (d.error) throw new Error('REDIS ' + d.error);
  return d.result;
}
async function readAllRedis(slug) {
  const rows = (await redis(['LRANGE', rkey(slug), '0', '4999'])) || [];
  const items = rows.map((x) => { try { return JSON.parse(x); } catch (e) { return null; } }).filter(Boolean);
  const sum = items.reduce((t, x) => t + Number(x.rating || 0), 0);
  return {
    ok: true, count: items.length,
    average: items.length ? Math.round((sum / items.length) * 10) / 10 : 0,
    reviews: items.filter((x) => x.comment).slice(0, MAX_SHOW).map(publicView),
  };
}
async function removeRedis(id) {
  const m = /^nhan-xet\/([a-z0-9-]{3,120})\//.exec(id);
  if (!m) return false;
  const rows = (await redis(['LRANGE', rkey(m[1]), '0', '4999'])) || [];
  const hit = rows.find((x) => { try { return JSON.parse(x).id === id; } catch (e) { return false; } });
  if (!hit) return false;
  await redis(['LREM', rkey(m[1]), '1', hit]);
  return true;
}

async function readAll(slug) {
  if (!HAS_BLOB) return readAllRedis(slug);
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
    reviews: items.filter((x) => x.comment).slice(0, MAX_SHOW).map(publicView),
  };
}

module.exports = async function handler(req, res) {
  res.setHeader('X-Robots-Tag', 'noindex');
  // Chưa kết nối Blob store: báo cho trang ẩn khối nhận xét thay vì để khách gửi rồi lỗi.
  if (!HAS_BLOB && !HAS_REDIS) {
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
      // Chỉ nhận JSON: trang web khác không gửi được JSON tới đây mà trình duyệt không chặn (preflight),
      // nên chặn được việc site lạ âm thầm gửi nhận xét rác bằng form hoặc fetch text/plain.
      if (!/^application\/json\b/i.test(String(req.headers['content-type'] || ''))) {
        return res.status(415).json({ ok: false, error: 'Định dạng gửi không hợp lệ.' });
      }
      const d = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      if (d.website) return res.status(200).json({ ok: true }); // ô bẫy bot
      const slug = String(d.slug || '');
      if (!SLUG_RE.test(slug)) return res.status(400).json({ ok: false, error: 'Bài viết không hợp lệ.' });
      const rating = Number(d.rating);
      if (!(Number.isInteger(rating) && rating >= 1 && rating <= 5)) return res.status(400).json({ ok: false, error: 'Chọn từ 1 đến 5 sao.' });
      if (String(d.comment || '').trim().length > MAX_COMMENT) return res.status(400).json({ ok: false, error: `Nhận xét tối đa ${MAX_COMMENT} ký tự.` });
      const comment = maskNumbers(clean(d.comment, MAX_COMMENT));
      const name = maskNumbers(clean(d.name, MAX_NAME));
      // Cấm mọi đường link trong nhận xét, tên (chủ site chốt 22/11/2026).
      if (/https?:\/\/|www\.|<\s*a\b|\b[a-z0-9-]+\.(com|vn|net|org|info|io|me|co|xyz|top|shop|site|online|link|ly|asia|biz)\b/i.test(comment + ' ' + name)) {
        return res.status(400).json({ ok: false, error: 'Nhận xét không được chèn đường link.' });
      }
      const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
      if (limited(ip)) return res.status(429).json({ ok: false, error: 'Bạn gửi hơi nhiều, vui lòng thử lại sau ít phút.' });

      const review = { rating, name, comment, date: today() };
      const pathname = `${PREFIX}${slug}/${Date.now()}-${crypto.randomBytes(4).toString('hex')}.json`;
      if (HAS_BLOB) {
        await withAccess((a) => put(pathname, JSON.stringify(review), {
          access: a, contentType: 'application/json', addRandomSuffix: false, cacheControlMaxAge: 60,
        }));
      } else {
        await redis(['LPUSH', rkey(slug), JSON.stringify({ id: pathname, ...review })]);
      }
      const page = clean(d.page, 200);
      await pushReviewToSheet({
        id: pathname, rating, comment, name, slug, title: clean(d.title, 200),
        page: /^\/[a-z0-9\-/]*$/i.test(page) ? 'https://pvihcm.com' + page : '',
        kind: slug === 'pvi-thanh-do' ? 'Công ty (khối gộp với điểm Google)' : 'Bài viết',
      });
      return res.status(200).json({ ok: true, review: publicView({ id: pathname, ...review }) });
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
      if (HAS_BLOB) await del(id); else await removeRedis(id);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST, DELETE');
    return res.status(405).json({ ok: false, error: 'Phương thức không hỗ trợ.' });
  } catch (err) {
    console.error('nhan-xet', err && err.message);
    return res.status(500).json({ ok: false, error: 'Chưa xử lý được, vui lòng thử lại.' });
  }
};
