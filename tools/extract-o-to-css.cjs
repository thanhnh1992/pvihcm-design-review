// Trích CSS trang Bảo hiểm ô tô từ baohiempvi-vnwebsite ra dist/o-to.css (chủ site yêu cầu 09/11/2026).
// Chạy lại khi giao diện trang /bao-hiem-o-to bên baohiempvi-vn thay đổi:
//   BAOHIEMPVI_DIR=/đường/dẫn/baohiempvi-vnwebsite node tools/extract-o-to-css.cjs
// (cần node_modules của project đó để có postcss). Lõi trích ở tools/extract-bhvn-css.cjs.
// Nguồn:
//  - app/globals.css: chỉ giữ luật của lớp có trên trang (tools/data/o-to-classes.json,
//    thu bằng trình duyệt trên trang gốc, thêm tay các lớp chỉ hiện khi thao tác).
//  - app/bao-hiem-o-to/online-purchase-cta.module.css và story.module.css: CSS module,
//    tên lớp đổi thành ocp-<tên> và st-<tên> (khớp markup trong tools/o-to-ui.mjs).
// Mọi luật gắn tiền tố .oto-page.
const fs = require('fs');
const path = require('path');
const { extract, resetCss } = require('./extract-bhvn-css.cjs');

const SCOPE = '.oto-page';
const HEAD = `/* ═══════════════════════════════════════════════════════════════════
   BẢO HIỂM Ô TÔ: giao diện theo trang /bao-hiem-o-to của baohiempvi-vn
   (chủ site yêu cầu 09/11/2026). Markup sinh từ tools/o-to-ui.mjs.
   File này do tools/extract-o-to-css.cjs sinh ra, đừng sửa tay: sửa riêng
   của pvihcm đặt trong khối FOOT của công cụ đó.
   ═══════════════════════════════════════════════════════════════════ */
` + resetCss(SCOPE);
// Sửa riêng của pvihcm, đặt cuối file để thắng luật gốc.
const FOOT = `
/* pvihcm: bản gốc giới hạn mỗi mục của bộ tra phí cao 115px và cuộn bên trong trên điện thoại,
   nút "Pickup, minivan…" bị cắt nửa. Hiện đủ, không cuộn trong (giống trang tai nạn). */
.oto-page .auto-segment-group > div { max-height: none; overflow: visible; }
`;
const { text, rules } = extract({
  scope: SCOPE,
  classes: JSON.parse(fs.readFileSync(path.join(__dirname, 'data/o-to-classes.json'), 'utf8')),
  modules: [
    { dir: 'app/bao-hiem-o-to', file: 'online-purchase-cta.module.css', prefix: 'ocp' },
    { dir: 'app/bao-hiem-o-to', file: 'story.module.css', prefix: 'st' },
  ],
  head: HEAD, foot: FOOT,
});
fs.writeFileSync(path.join(__dirname, '../dist/o-to.css'), text);
console.log('o-to.css:', rules, 'luật globals,', text.length, 'byte');
