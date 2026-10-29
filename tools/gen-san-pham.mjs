// Trang /san-pham/: danh mục mọi sản phẩm của pvihcm (chủ site yêu cầu 28/10/2026, gộp các mục
// sản phẩm trên thanh menu thành một mục "Sản phẩm"). Dữ liệu: tools/data/san-pham.mjs.
// Mô tả thẻ lấy từ <meta name="description"> của từng trang sản phẩm, nên phải chạy script này
// SAU các script sinh trang sản phẩm (gen-products, gen-products-2) và TRƯỚC gen-sitemap.
// CSS: dist/san-pham.css. Lọc theo nhóm: dist/san-pham.js (không có JS thì hiện đủ thẻ).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { page, t, esc, breadcrumbJsonLd, ZALO, SITE } from './chrome.mjs';
import { groups, products } from './data/san-pham.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(HERE, '../dist');
const P = '/san-pham/';

const metaOf = (href) => {
  const f = path.join(DIST, href, 'index.html');
  if (!fs.existsSync(f)) throw new Error(`Chưa có trang ${href}: thêm trang trước rồi mới đưa vào danh mục.`);
  const html = fs.readFileSync(f, 'utf8');
  const d = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!d) throw new Error(`Trang ${href} thiếu meta description.`);
  return d.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
};
for (const p of products) {
  if (!groups.some((g) => g.id === p.group)) throw new Error(`Nhóm "${p.group}" của ${p.href} không có trong groups.`);
  for (const suf of ['', '-800', '-480']) {
    if (!fs.existsSync(path.join(DIST, 'assets', `${p.img}${suf}.webp`))) throw new Error(`Thiếu ảnh /assets/${p.img}${suf}.webp`);
  }
}

const label = Object.fromEntries(groups.map((g) => [g.id, g.label]));
const count = (id) => products.filter((p) => p.group === id).length;

const cards = products.map((p, i) => `<li class="sp-card" data-group="${p.group}"><a href="${p.href}">
<span class="sp-media"><img src="/assets/${p.img}-800.webp" srcset="/assets/${p.img}-480.webp 480w, /assets/${p.img}-800.webp 800w, /assets/${p.img}.webp 1280w" sizes="(max-width:640px) 38vw, (max-width:860px) 46vw, (max-width:1100px) 31vw, 280px" width="800" height="533" alt="${esc(p.alt)}"${i < 3 ? '' : ' loading="lazy"'} decoding="async"><span class="sp-tag">${esc(label[p.group])}</span></span>
<span class="sp-body"><h2>${t(p.title)}</h2><p>${t(metaOf(p.href))}</p><span class="sp-more">Xem chi tiết <i aria-hidden="true">&rarr;</i></span></span>
</a></li>`).join('\n');

const main = `
<section class="sp-hero"><div class="sp-wrap">
<p class="sp-kicker">Sản phẩm · Bảo hiểm PVI</p>
<h1>Sản phẩm bảo hiểm <em>PVI Thành Đô</em></h1>
<p class="sp-lead">${products.length} sản phẩm Bảo hiểm PVI do PVI Thành Đô tư vấn tại TP.HCM. Chọn sản phẩm để xem quyền lợi, biểu phí, hồ sơ cần chuẩn bị và cách yêu cầu bồi thường.</p>
<div class="sp-filter" role="group" aria-label="Lọc theo nhóm sản phẩm">
<button type="button" class="is-on" data-filter="all" aria-pressed="true">Tất cả <b>${products.length}</b></button>
${groups.map((g) => `<button type="button" data-filter="${g.id}" aria-pressed="false">${esc(g.label)} <b>${count(g.id)}</b></button>`).join('\n')}
</div>
</div></section>

<section class="sp-list" aria-label="Danh sách sản phẩm"><div class="sp-wrap">
<ul class="sp-grid">
${cards}
</ul>
<p class="sp-empty" hidden>Chưa có sản phẩm trong nhóm này.</p>
</div></section>

<section class="sp-help"><div class="sp-wrap sp-help-box">
<div><h2>Chưa biết chọn sản phẩm nào?</h2><p>Gọi hoặc nhắn Zalo, chuyên viên hỏi vài thông tin rồi chỉ ra sản phẩm và mức bảo hiểm phù hợp.</p></div>
<div class="sp-help-actions"><a class="sp-btn sp-btn-red" href="tel:0938072236">Gọi 0938 072 236</a><a class="sp-btn sp-btn-line" href="${ZALO}" target="_blank" rel="noopener">Nhắn Zalo</a></div>
</div></section>`;

const itemList = {
  '@context': 'https://schema.org', '@type': 'ItemList', name: 'Sản phẩm bảo hiểm PVI Thành Đô',
  itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: SITE + p.href })),
};

const html = page({
  path: P,
  title: 'Sản phẩm bảo hiểm PVI | PVI Thành Đô',
  description: `${products.length} sản phẩm Bảo hiểm PVI tại TP.HCM: TNDS ô tô và cháy nổ bắt buộc, tai nạn 24/24, sức khỏe PVI Care, du lịch quốc tế, hàng hóa xuất nhập khẩu, công trình, vật chất xe ô tô.`,
  image: `/assets/${products[0].img}.webp`,
  head: breadcrumbJsonLd(P, 'Sản phẩm') + `<script type="application/ld+json">${JSON.stringify(itemList).replace(/</g, '\\u003c')}</script>`,
  main,
  bodyClass: 'sp-page',
  extraCss: '<link rel="stylesheet" href="/san-pham.css">',
  scripts: '<script src="/san-pham.js" defer></script>',
});
fs.mkdirSync(path.join(DIST, 'san-pham'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'san-pham/index.html'), html);
console.log('wrote san-pham/index.html', html.length, '·', products.length, 'sản phẩm');
