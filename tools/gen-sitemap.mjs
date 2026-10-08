// Sinh dist/sitemap.xml tự động từ các trang trong dist/.
// Chạy SAU các script sinh trang khác (gen-products, gen-others, gen-news, srcset):
//   node tools/gen-sitemap.mjs
//
// - Chỉ lấy trang index.html có canonical trỏ về SITE và không có meta robots noindex.
// - lastmod = ngày commit gần nhất đã sửa file trang đó (ngày sửa thật, không đoán).
//   File đang sửa mà chưa commit thì lấy ngày hôm nay (giờ Việt Nam).
// - Kèm ảnh chính của trang (og:image) theo chuẩn image sitemap của Google.
// - Thứ tự: trang chủ, sản phẩm, trang đơn vị/hướng dẫn, Tin tức (bài mới nhất trước).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { SITE } from './chrome.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const DIST = path.join(ROOT, 'dist');

const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date());
const git = (args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();

function lastmod(file) {
  const rel = path.relative(ROOT, file);
  try {
    if (git(['status', '--porcelain', '--', rel])) return today;
    return git(['log', '-1', '--format=%cs', '--', rel]) || today;
  } catch {
    return today;
  }
}

function pages(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...pages(p));
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

const escXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rank = (loc) => {
  const u = loc.slice(SITE.length);
  if (u === '/') return 0;
  if (u.startsWith('/san-pham/')) return 1;
  if (u.startsWith('/tin-tuc/') && u !== '/tin-tuc/') return 4;
  if (u === '/tin-tuc/') return 3;
  return 2;
};

const entries = [];
const skipped = [];
for (const file of pages(DIST)) {
  const html = fs.readFileSync(file, 'utf8');
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  const robots = (html.match(/<meta name="robots" content="([^"]+)"/i) || [])[1] || '';
  const rel = path.relative(DIST, file);
  if (!canonical || !canonical.startsWith(SITE + '/')) { skipped.push(`${rel}: thiếu canonical hoặc khác tên miền`); continue; }
  if (/noindex/i.test(robots)) { skipped.push(`${rel}: noindex`); continue; }
  // canonical phải trỏ đúng chính file này, tránh khai báo URL không tồn tại
  const expect = SITE + '/' + rel.replace(/index\.html$/, '');
  if (canonical !== expect) { skipped.push(`${rel}: canonical ${canonical} khác đường dẫn file ${expect}`); continue; }
  const image = (html.match(/<meta property="og:image" content="([^"]+)"/) || [])[1];
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  entries.push({ loc: canonical, lastmod: lastmod(file), image: image && image.startsWith(SITE + '/') ? image : null, title });
}

entries.sort((a, b) => rank(a.loc) - rank(b.loc) || (rank(a.loc) === 4 ? b.lastmod.localeCompare(a.lastmod) : 0) || a.loc.localeCompare(b.loc));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map((e) => `  <url>
    <loc>${escXml(e.loc)}</loc>
    <lastmod>${e.lastmod}</lastmod>${e.image ? `
    <image:image><image:loc>${escXml(e.image)}</image:loc></image:image>` : ''}
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml);
console.log(`wrote sitemap.xml: ${entries.length} URL`);
for (const e of entries) console.log(`  ${e.lastmod}  ${e.loc}${e.image ? '' : '  (không có ảnh)'}`);
if (skipped.length) console.log('Bỏ qua:\n  ' + skipped.join('\n  '));
