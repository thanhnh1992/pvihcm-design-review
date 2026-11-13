// Sinh dist/search-index.json cho nút tìm kiếm trên header (dist/search.js, chủ site yêu cầu 13/11/2026).
// Đọc toàn bộ chữ hiển thị trong <main> của mọi trang (bỏ trang noindex), nên trang hay bài mới tự có trong kết quả.
// File chỉ tải khi khách bấm nút tìm (khoảng 110 KB sau nén), không làm chậm trang.
// Chạy trong tools/gen-sitemap.mjs (bước cuối khi sinh trang); không sửa tay file JSON.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const walk = (d = '', out = []) => {
  for (const e of fs.readdirSync(path.join(DIST, d), { withFileTypes: true })) {
    if (e.isDirectory()) walk(path.join(d, e.name), out);
    else if (e.name === 'index.html') out.push('/' + d.split(path.sep).join('/') + (d ? '/' : ''));
  }
  return out;
};
const ENT = { amp: '&', quot: '"', '#39': "'", lt: '<', gt: '>', nbsp: ' ', rarr: '→', larr: '←', times: '×', middot: '·', hellip: '…', ndash: '-', mdash: '-' };
const decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (m, e) => {
  if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : +e.slice(1));
  return ENT[e] ?? m;
});
const text = (h) => decode(h.replace(/<[^>]+>/g, ' ')).normalize('NFC').replace(/\s+/g, ' ').trim();
const kind = (p) => p === '/' ? 'Trang chủ' : p.startsWith('/san-pham/') ? 'Sản phẩm' : p.startsWith('/tin-tuc/') ? (p === '/tin-tuc/' ? 'Tin tức' : 'Bài viết') : 'Trang';

const pages = walk().sort().flatMap((p) => {
  const html = fs.readFileSync(path.join(DIST, p, 'index.html'), 'utf8');
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) return [];
  const title = text(html.match(/<title>([^<]*)<\/title>/)?.[1] || p).replace(/\s*\|[^|]*$/, '');
  const desc = text(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '');
  let main = html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1] || '';
  // Bỏ phần không phải nội dung: nav và *crumb (đường dẫn, mục lục), dòng tác giả/ngày, chữ trên nút bấm.
  main = main.replace(/<(script|style|svg|template|noscript|select|button|nav)\b[\s\S]*?<\/\1>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(p|div|ol)[^>]*class="[^"]*(?:crumb|kb-meta)[^"]*"[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  // Trang chủ: H1 là khẩu hiệu, nên hiện tên trang trong <title>.
  const h1 = p === '/' ? title : text(main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '') || title;
  // Mục có id: kết quả trỏ thẳng tới đúng đoạn trong trang.
  const heads = [...main.matchAll(/<h([23])[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => [m[2], text(m[3])]).filter(([, t]) => t);
  const body = text(main.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, ' '));
  return [{ u: p, k: kind(p), t: h1, d: desc, h: heads, b: body }];
});
fs.writeFileSync(path.join(DIST, 'search-index.json'), JSON.stringify(pages));
console.log('search-index.json:', pages.length, 'trang,', Math.round(fs.statSync(path.join(DIST, 'search-index.json')).size / 1024), 'KB');
