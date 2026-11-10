// Sinh sitemap.xml và llms.txt từ chính thư mục dist, để trang mới không bị bỏ sót.
// llms.txt (bản đồ site cho AI) dùng đúng danh sách trang của sitemap; tên và mô tả lấy từ <title>, meta description của từng trang.
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

const attr = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const info = (p) => {
  const html = fs.readFileSync(path.join(DIST, p, 'index.html'), 'utf8');
  const title = attr(html.match(/<title>([^<]*)<\/title>/)?.[1] || p).replace(/\s*\|[^|]*$/, '');
  const desc = attr(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '');
  return `- [${title}](${ROOT}${p})${desc ? `: ${desc}` : ''}`;
};
const groups = [
  ['Sản phẩm bảo hiểm', (p) => p.startsWith('/san-pham/')],
  ['Tin tức và kiến thức', (p) => p.startsWith('/tin-tuc/')],
  ['Đơn vị và hướng dẫn', () => true],
];
const left = new Set(pages);
const sections = groups.map(([name, test]) => {
  const list = [...left].filter(test);
  list.forEach((p) => left.delete(p));
  return list.length ? `## ${name}\n\n${list.map(info).join('\n')}` : '';
}).filter(Boolean);
const home = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const llms = `# Công ty Bảo hiểm PVI Thành Đô (pvihcm.com)\n\n> ${attr(home.match(/<meta name="description" content="([^"]*)"/)[1])}\n\n${sections.join('\n\n')}\n`;
fs.writeFileSync(path.join(DIST, 'llms.txt'), llms);
console.log('llms.txt:', pages.length, 'trang');
