// Lưới bento sản phẩm ở đầu trang chủ (chủ site yêu cầu 03/11/2026, thay vòng thẻ xoay).
// Mỗi ô là một sản phẩm cố định; chuyển động nhẹ liên tục: ảnh trôi chậm trong ô và "đèn soi"
// lần lượt sáng từng sản phẩm. Dữ liệu: tools/data/hero-products.mjs. Vị trí ô: SLOTS bên dưới.
// Ghi vào dist/index.html giữa <!-- hero-bento:start --> và <!-- hero-bento:end -->
// (lần đầu: thay khối <!-- hero-orbit:start/end --> cũ). CSS dist/hero-bento.css, JS dist/hero-bento.js.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { heroProducts } from './data/hero-products.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(HERE, '../dist');
const FILE = path.join(DIST, 'index.html');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Ô trên lưới 3 cột x 4 hàng (máy tính). Ô "tall" cao 2 hàng. Sản phẩm mới chưa có ô thì báo lỗi,
// để người thêm sản phẩm chủ động chọn chỗ (đổi lưới ở hero-bento.css nếu cần thêm hàng).
//   a b c      a: Tai nạn (cao)   b: ô Bồi thường     c: Hàng hóa
//   a d e      d: Sức khỏe (cao)  e: ô Tư vấn
//   f d g      f: Bắt buộc        g: Công trình
//   h i j      h: Cháy nổ         i: Du lịch          j: Vật chất xe
const SLOTS = {
  'tai-nan': 'a', 'hang-hoa': 'c', 'hero-suc-khoe': 'd', 'bat-buoc': 'f',
  'hero-cong-trinh': 'g', 'chay-no': 'h', 'hero-du-lich': 'i', 'tu-van-xe-o-to': 'j',
};
const TALL = new Set(['a', 'd']);

const tiles = heroProducts.map((p, i) => {
  const slot = SLOTS[p.img];
  if (!slot) throw new Error(`"${p.title}" (ảnh ${p.img}) chưa có ô trong SLOTS của gen-hero-bento.mjs`);
  if (!/^\/[^/]/.test(p.href)) throw new Error(`${p.title}: ô bento chỉ dẫn link nội bộ của pvihcm.com`);
  const base = `/assets/${p.img}`;
  for (const suf of ['', '-480', '-800']) if (!fs.existsSync(path.join(DIST, `${base}${suf}.webp`))) throw new Error(`Thiếu ảnh dist${base}${suf}.webp`);
  const tall = TALL.has(slot);
  return `<a class="bt bt-photo${tall ? ' is-tall' : ''}" data-slot="${slot}" href="${esc(p.href)}" style="--k:${i}">`
    + `<img src="${base}-800.webp" srcset="${base}-480.webp 480w, ${base}-800.webp 800w, ${base}.webp 1280w" sizes="(max-width:820px) 46vw, ${tall ? 300 : 220}px" width="800" height="533" alt="${esc(p.alt)}" decoding="async"${i < 3 ? '' : ' loading="lazy"'}>`
    + `<span class="bt-veil" aria-hidden="true"></span>`
    + `<span class="bt-label"><b class="bt-long">${esc(p.title)}</b><b class="bt-short" aria-hidden="true">${esc(p.short || p.title)}</b><i aria-hidden="true">&rarr;</i></span></a>`;
}).join('\n');

const info = `<a class="bt bt-info bt-red" data-slot="b" href="tel:1900545458"><small>Bồi thường 24/7</small><b>1900 54 54 58</b><span>Gọi khi có sự cố</span></a>
<a class="bt bt-info bt-blue" data-slot="e" href="tel:0938072236"><small>Tư vấn và báo phí</small><b>0938 072 236</b><span>Gọi hoặc nhắn Zalo</span></a>`;

const block = `<!-- hero-bento:start -->
<div class="bento" data-bento>
${tiles}
${info}
</div>
<!-- hero-bento:end -->`;

let page = fs.readFileSync(FILE, 'utf8');
const marked = /<!-- hero-bento:start -->[\s\S]*?<!-- hero-bento:end -->/;
const orbit = /<!-- hero-orbit:start -->[\s\S]*?<!-- hero-orbit:end -->/;
if (marked.test(page)) page = page.replace(marked, block);
else if (orbit.test(page)) page = page.replace(orbit, block);
else throw new Error('Không tìm thấy chỗ đặt lưới bento trong dist/index.html');
page = page.replace('<div class="hero-stage hero-stage--orbit" aria-label="Các nhóm sản phẩm">', '<div class="hero-stage hero-stage--bento" aria-label="Các nhóm sản phẩm">');
page = page.replace('<link rel="stylesheet" href="/hero-orbit.css">', '').replace('<script src="/hero-orbit.js" defer></script>', '');
if (!page.includes('href="/hero-bento.css"')) page = page.replace('<link rel="stylesheet" href="/polish.css">', '<link rel="stylesheet" href="/polish.css"><link rel="stylesheet" href="/hero-bento.css">');
if (!page.includes('src="/hero-bento.js"')) page = page.replace('<script src="/app.js" defer></script>', '<script src="/app.js" defer></script><script src="/hero-bento.js" defer></script>');
fs.writeFileSync(FILE, page);
console.log(`wrote dist/index.html (hero-bento, ${heroProducts.length} sản phẩm + 2 ô liên hệ)`);
