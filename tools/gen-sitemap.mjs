// Sinh sitemap từ chính thư mục dist, để trang mới không bị bỏ sót.
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
// Chỉ đưa vào sitemap trang có bản chuẩn ở chính pvihcm.com: bỏ trang khai canonical sang tên miền khác
// (bài đăng lại có bản chuẩn ở baohiempvi-vn.com, xem QUY-TAC-VIET-BAI.md) và trang noindex.
const ROOT = 'https://pvihcm.com';
const indexable = (p) => {
  const html = fs.readFileSync(path.join(DIST, p, 'index.html'), 'utf8');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical && !canonical.startsWith(ROOT + '/')) return false;
  return !/<meta name="robots" content="[^"]*noindex/i.test(html);
};
const pages = walk().filter(indexable).sort((a, b) => a.split('/').length - b.split('/').length || a.localeCompare(b));
const today = new Date().toISOString().slice(0, 10);
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + pages.map((p) => `  <url><loc>${ROOT}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')
  + '\n</urlset>\n';
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml);
console.log('sitemap:', pages.length, 'URL');
