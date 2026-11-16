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
