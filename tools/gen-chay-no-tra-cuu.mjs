// Gắn bộ tra cứu tài sản + ước tính phí cháy nổ (theo trang /bao-hiem-chay-no-bat-buoc của baohiempvi-vn)
// vào trang /san-pham/chay-no-bat-buoc/ của pvihcm, ĐẶT TRƯỚC phần Nghị định (chủ site yêu cầu 16/11/2026:
// "đẩy phần tính phí lên trước phần nghị định, và code chỗ tính phí giống của baohiempvi-vn").
// Trang cháy nổ sửa tay; script này chỉ thay khối giữa <!-- chay-no-tra-cuu:start --> và
// <!-- chay-no-tra-cuu:end --> (lần đầu: thay khối <section class="fx-tool"> cũ và chuyển lên trước
// <section class="fx-legal">). Giữ id="tra-cuu" cho thanh điều hướng, nút đầu trang và link từ trang khác.
// Dữ liệu (chép nguyên văn từ baohiempvi-vn, chạy lại khi bên đó đổi):
//   tools/data/fire.mjs, property-asset-data.mjs, property-asset-catalog.js, chay-no-icons.js
//   → chép sang dist/chay-no/ để trình duyệt dùng chung với script này.
// Bộ tra cứu: dist/chay-no/tra-cuu.js. CSS: dist/chay-no.css (tools/extract-chay-no-css.cjs).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(HERE, '../dist');
const FILE = path.join(DIST, 'san-pham/chay-no-bat-buoc/index.html');
for (const [from, to] of [['fire.mjs', 'fire-data.js'], ['property-asset-data.mjs', 'property-asset-data.js'], ['property-asset-catalog.js', 'property-asset-catalog.js'], ['chay-no-icons.js', 'icons.js']]) {
  fs.copyFileSync(path.join(HERE, 'data', from), path.join(DIST, 'chay-no', to));
}
const { fireDeductibles, fireDocuments, fireFaqs, fireReference } = await import(pathToFileURL(path.join(DIST, 'chay-no/fire-data.js')).href);
const { renderLookup, initialState } = await import(pathToFileURL(path.join(DIST, 'chay-no/tra-cuu.js')).href);

const esc = (s) => String(s).replace(/\s+—\s+/g, ', ').replace(/—/g, ', ').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Tài liệu: trang nghị định của baohiempvi-vn đổi sang bài tương ứng trên pvihcm, chưa có thì Cổng Chính phủ.
const DOC_HREF = {
  '/bao-hiem-chay-no-bat-buoc/nghi-dinh-347-2026': '/tin-tuc/nghi-dinh-347-2026-chay-no-bat-buoc/',
  '/bao-hiem-chay-no-bat-buoc/nghi-dinh-105-2025': 'https://vanban.chinhphu.vn/?pageid=27160&docid=213702',
};
const docHref = (h) => DOC_HREF[h] || h;

const block = `<!-- chay-no-tra-cuu:start -->
<section class="cn-page" id="tra-cuu" aria-label="Tra cứu tài sản và ước tính phí cháy nổ"><div class="auto-page fire-page"><div class="shell auto-product-surface"><div class="auto-experience">
<div class="auto-dashboard pal-dashboard"><div class="auto-dashboard-main">
<div data-cn-tra-cuu>${renderLookup(initialState())}</div>
<div class="auto-rule-chip fire-tariff-source"><span>⌁</span><p><b>Đối chiếu quy định hiện hành: ${esc(fireReference.legalBasis)}</b><small>${esc(fireReference.updated)}</small></p><a href="${esc(fireReference.sourceUrl)}" target="_blank" rel="noopener">Xem văn bản ↗</a></div>
<p class="fire-note-inline">Công cụ sử dụng danh mục tài sản do đơn vị cung cấp. Tỷ lệ tham khảo cần được đối chiếu với quy định hiện hành và hồ sơ thực tế trước khi xác nhận phí chính thức. <a href="#bieu-phi">Xem biểu phí theo văn bản pháp luật.</a></p>
</div>
<aside class="auto-dashboard-aside" aria-label="Thông tin hỗ trợ bảo hiểm cháy nổ">
<section class="auto-limit-card auto-side-card"><span>ĐIỂM CẦN NHỚ</span>${fireDeductibles.map((d, i) => `<div><i aria-hidden="true">${i === 0 ? '◎' : i === 1 ? '◇' : '◈'}</i><p>${esc(d.label)}<b>${esc(d.value)} <small>${esc(d.note)}</small></b></p></div>`).join('')}</section>
<section class="auto-sidebar-docs auto-side-card" aria-labelledby="fire-sidebar-docs-title"><span id="fire-sidebar-docs-title">TÀI LIỆU LIÊN QUAN</span>${fireDocuments.map((d) => { const h = docHref(d.href); return `<a href="${esc(h)}"${h.startsWith('/') ? '' : ' target="_blank" rel="noopener"'}><i aria-hidden="true">□</i><p><b>${esc(d.title)}</b></p><em aria-hidden="true">↗</em></a>`; }).join('')}</section>
<section class="auto-sidebar-faqs auto-side-card" aria-labelledby="fire-sidebar-faqs-title"><span id="fire-sidebar-faqs-title">CÂU HỎI THƯỜNG GẶP</span>${fireFaqs.slice(0, 3).map((f) => `<details><summary>${esc(f.question)}<i aria-hidden="true">+</i></summary><p>${esc(f.answer)}</p></details>`).join('')}<a href="#cau-hoi" class="auto-sidebar-more">Xem tất cả câu hỏi <i aria-hidden="true">→</i></a></section>
<section class="auto-sidebar-consult" aria-label="Tư vấn mọi rủi ro tài sản"><span>MỌI RỦI RO TÀI SẢN</span><h3>Cơ sở cần bảo vệ<br>rộng hơn?</h3><p>Nhận phương án theo danh mục tài sản, ngành nghề và biện pháp quản lý rủi ro thực tế.</p><a href="#ba-lop">Khám phá phạm vi rộng <i>→</i></a></section>
</aside></div>
</div></div></div></section>
<!-- chay-no-tra-cuu:end -->`;

let page = fs.readFileSync(FILE, 'utf8');
const marked = /<!-- chay-no-tra-cuu:start -->[\s\S]*?<!-- chay-no-tra-cuu:end -->/;
if (marked.test(page)) {
  page = page.replace(marked, block);
} else {
  // Lần đầu: bỏ khối fx-tool cũ, đặt khối mới ngay trước phần Nghị định.
  const i = page.indexOf('<section class="fx-tool" id="tra-cuu">');
  const j = page.indexOf('<section class="fire-compare" id="ba-lop">');
  const k = page.indexOf('<section class="fx-legal"');
  if (i < 0 || j < 0 || k < 0 || !(k < i && i < j)) throw new Error('Không tìm thấy đúng vị trí khối tra cứu cũ / phần Nghị định trong trang cháy nổ');
  page = page.slice(0, i) + page.slice(j);
  page = page.replace('<section class="fx-legal"', block + '\n<section class="fx-legal"');
}
if (!page.includes('href="/chay-no.css"')) page = page.replace('<link rel="stylesheet" href="fire.css">', '<link rel="stylesheet" href="fire.css"><link rel="stylesheet" href="/chay-no.css">');
if (!page.includes('src="/chay-no/tra-cuu.js"')) page = page.replace('<script src="page.js" defer></script>', '<script src="page.js" defer></script><script type="module" src="/chay-no/tra-cuu.js"></script>');
fs.writeFileSync(FILE, page);
console.log('wrote dist/san-pham/chay-no-bat-buoc/index.html (bộ tra cứu tài sản trước phần Nghị định)');
