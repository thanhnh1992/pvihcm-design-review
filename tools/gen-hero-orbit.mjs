// Sinh các thẻ sản phẩm chạy vòng ở đầu trang chủ từ tools/data/hero-products.mjs.
// Chỉ ghi vào dist/index.html giữa hai dấu <!-- hero-orbit:start --> và <!-- hero-orbit:end -->
// (lần đầu: thay 4 thẻ .hero-tile cũ trong .hero-stage). Lớp nền .hero-depth giữ nguyên.
// Chuyển động ở dist/hero-orbit.js, giao diện ở dist/hero-orbit.css.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { heroProducts } from './data/hero-products.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(HERE, '../dist');
const FILE = path.join(DIST, 'index.html');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

if (!heroProducts.length) throw new Error('hero-products.mjs: cần ít nhất 1 sản phẩm');
const cards = heroProducts.map((p, i) => {
  if (!/^\/[^/]/.test(p.href)) throw new Error(`${p.title}: href phải là đường dẫn nội bộ bắt đầu bằng /`);
  const base = `/assets/${p.img}`;
  if (!fs.existsSync(path.join(DIST, `${base}.webp`))) throw new Error(`Thiếu ảnh dist${base}.webp cho "${p.title}"`);
  const hasSet = ['480', '800'].every((w) => fs.existsSync(path.join(DIST, `${base}-${w}.webp`)));
  const srcset = hasSet ? ` srcset="${base}-480.webp 480w, ${base}-800.webp 800w, ${base}.webp 1280w" sizes="(max-width:820px) 60vw, 340px"` : '';
  const label = p.short ? `<span class="orbit-label"><span class="orbit-long">${esc(p.title)}</span><span class="orbit-short" aria-hidden="true">${esc(p.short)}</span></span>` : `<span class="orbit-label">${esc(p.title)}</span>`;
  return `<a class="orbit-card" href="${p.href}" style="--i:${i}"><img width="1280" height="853" decoding="async"${i === 0 ? ' fetchpriority="high"' : ' loading="lazy"'} src="${base}.webp"${srcset} alt="${esc(p.alt)}">${label}</a>`;
}).join('\n');
const block = `<!-- hero-orbit:start -->
<div class="orbit" data-orbit style="--n:${heroProducts.length};--cols:${heroProducts.length > 4 ? 3 : 2}">
${cards}
</div>
<!-- hero-orbit:end -->`;

let page = fs.readFileSync(FILE, 'utf8');
const marked = /<!-- hero-orbit:start -->[\s\S]*?<!-- hero-orbit:end -->/;
if (marked.test(page)) page = page.replace(marked, block);
else {
  const old = /(<div class="hero-depth" aria-hidden="true">[\s\S]*?<\/div>\n)(?:<a class="hero-tile[^>]*>[\s\S]*?<\/a>\n)+/;
  if (!old.test(page)) throw new Error('Không tìm thấy các thẻ .hero-tile trong .hero-stage của dist/index.html');
  page = page.replace(old, `$1${block}\n`);
}
page = page.replace('<div class="hero-stage" aria-label="Bốn nhóm sản phẩm">', '<div class="hero-stage hero-stage--orbit" aria-label="Các nhóm sản phẩm">');
if (!page.includes('href="/hero-orbit.css"')) page = page.replace('<link rel="stylesheet" href="/polish.css">', '<link rel="stylesheet" href="/polish.css"><link rel="stylesheet" href="/hero-orbit.css">');
if (!page.includes('src="/hero-orbit.js"')) page = page.replace('<script src="/app.js" defer></script>', '<script src="/app.js" defer></script><script src="/hero-orbit.js" defer></script>');
fs.writeFileSync(FILE, page);
console.log(`wrote dist/index.html (hero-orbit, ${heroProducts.length} thẻ)`);
