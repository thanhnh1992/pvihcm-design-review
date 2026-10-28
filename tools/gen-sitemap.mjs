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
const pages = walk().sort((a, b) => a.split('/').length - b.split('/').length || a.localeCompare(b));
const today = new Date().toISOString().slice(0, 10);
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + pages.map((p) => `  <url><loc>https://pvihcm.com${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')
  + '\n</urlset>\n';
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml);
console.log('sitemap:', pages.length, 'URL');
