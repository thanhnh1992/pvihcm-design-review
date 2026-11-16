// Trích CSS bộ tra cứu tài sản + ước tính phí cháy nổ từ baohiempvi-vnwebsite ra dist/chay-no.css
// (chủ site yêu cầu 16/11/2026: phần tính phí trang cháy nổ code giống baohiempvi-vn).
// Chạy lại khi giao diện bộ tra cứu bên baohiempvi-vn thay đổi:
//   BAOHIEMPVI_DIR=/đường/dẫn/baohiempvi-vnwebsite node tools/extract-chay-no-css.cjs
// Lõi trích ở tools/extract-bhvn-css.cjs. Nguồn:
//  - app/globals.css: lớp có trong khối bảng điều khiển (tools/data/chay-no-classes.json, thu bằng
//    trình duyệt trên trang /bao-hiem-chay-no-bat-buoc qua đủ các bước bấm).
//  - app/bao-hiem-chay-no-bat-buoc/property-asset-lookup.module.css (tiền tố pal-) và
//    fire-lead-dialog.module.css (tiền tố fld-), khớp markup trong dist/chay-no/tra-cuu.js.
// Mọi luật gắn tiền tố .cn-page (khối bọc trong trang cháy nổ của pvihcm).
const fs = require('fs');
const path = require('path');
const { extract, resetCss } = require('./extract-bhvn-css.cjs');

const SCOPE = '.cn-page';
const HEAD = `/* ═══════════════════════════════════════════════════════════════════
   BỘ TRA CỨU TÀI SẢN VÀ ƯỚC TÍNH PHÍ CHÁY NỔ: giao diện theo trang
   /bao-hiem-chay-no-bat-buoc của baohiempvi-vn (chủ site yêu cầu 16/11/2026).
   Markup do dist/chay-no/tra-cuu.js vẽ (tools/gen-chay-no-tra-cuu.mjs in sẵn).
   File này do tools/extract-chay-no-css.cjs sinh ra, đừng sửa tay: sửa riêng
   của pvihcm đặt trong khối FOOT của công cụ đó.
   ═══════════════════════════════════════════════════════════════════ */
` + resetCss(SCOPE);
// Sửa riêng của pvihcm, đặt cuối file để thắng luật gốc.
const FOOT = `
/* pvihcm: biểu tượng SVG vẽ từ chuỗi (bản gốc là component Phosphor), giữ không co lại trong hàng flex. */
.cn-page .auto-page svg.ph{flex:none}
/* pvihcm: style.css có luật chung "header{height:78px;display:flex…}" dành cho thanh đầu trang của site,
   lan vào các thẻ <header> trong bộ tra cứu (tiêu đề bị ép 2 cột). Trả về như bản gốc; luật module
   (.cn-page .pal-…) cụ thể hơn nên vẫn thắng. */
.cn-page header{height:auto;max-width:none;margin:0;padding:0;display:block;gap:normal}
/* pvihcm: product.css tô màu ".fire h2"; bản gốc tiêu đề lấy màu chữ của khối (xanh đậm #071a38). */
.cn-page :is(h2,h3,h4){color:inherit}

/* pvihcm: hiệu ứng ô "Bạn đang muốn bảo hiểm tài sản nào?" (chủ site yêu cầu 16/11/2026).
   Viền chạy vòng theo 2 màu logo PVI (giống CTA chung trong cta.css), kính lúp nhấp nháy nhẹ
   gợi ý chỗ gõ, bấm vào ô thì viền sáng và có quầng xanh. Giảm chuyển động thì đứng yên. */
@property --cn-a{syntax:'<angle>';inherits:false;initial-value:0deg}
.cn-page .pal-searchBar{border-color:transparent;
  background:linear-gradient(#fff,#fff) padding-box,
    conic-gradient(from var(--cn-a),#8eafd3 0deg,#E31F26 70deg,#ff8a8f 110deg,#8eafd3 170deg,#1F4A8C 240deg,#5b86c8 290deg,#8eafd3 360deg) border-box;
  box-shadow:0 7px 22px #1646740b,0 0 0 0 rgba(7,90,183,0);
  animation:cn-spin 4.5s linear infinite,cn-breathe 3s ease-in-out infinite}
.cn-page .pal-searchBar:focus-within{
  background:linear-gradient(#fff,#fff) padding-box,
    conic-gradient(from var(--cn-a),#1F4A8C 0deg,#E31F26 90deg,#1F4A8C 180deg,#E31F26 270deg,#1F4A8C 360deg) border-box;
  box-shadow:0 10px 28px #16467422,0 0 0 6px rgba(7,90,183,.14);animation-duration:2.2s,3s}
/* Ô ngoài đã có viền + quầng báo đang nhập; bỏ viền focus chung của site ở ô nhập bên trong cho khỏi 2 lớp viền. */
.cn-page .pal-searchBar input:focus,.cn-page .pal-searchBar input:focus-visible{outline:none;box-shadow:none}
.cn-page .pal-searchBar > svg.ph:first-child{color:#075ab7;animation:cn-lens 2.4s ease-in-out infinite;transform-origin:50% 50%}
.cn-page .pal-searchBar:focus-within > svg.ph:first-child{animation:none}
@keyframes cn-spin{to{--cn-a:360deg}}
@keyframes cn-breathe{0%,100%{box-shadow:0 7px 22px #1646740b,0 0 0 0 rgba(227,31,38,0)}50%{box-shadow:0 7px 22px #1646740b,0 0 0 5px rgba(227,31,38,.10)}}
@keyframes cn-lens{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.12) rotate(-8deg)}}
@media (prefers-reduced-motion:reduce){
  .cn-page .pal-searchBar,.cn-page .pal-searchBar > svg.ph:first-child{animation:none}
}
`;
const { text, rules } = extract({
  scope: SCOPE,
  classes: JSON.parse(fs.readFileSync(path.join(__dirname, 'data/chay-no-classes.json'), 'utf8')),
  modules: [
    { dir: 'app/bao-hiem-chay-no-bat-buoc', file: 'property-asset-lookup.module.css', prefix: 'pal' },
    { dir: 'app/bao-hiem-chay-no-bat-buoc', file: 'fire-lead-dialog.module.css', prefix: 'fld' },
  ],
  head: HEAD, foot: FOOT,
});
fs.writeFileSync(path.join(__dirname, '../dist/chay-no.css'), text);
console.log('chay-no.css:', rules, 'luật globals,', text.length, 'byte');
