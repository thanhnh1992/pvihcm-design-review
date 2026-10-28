// Trích CSS trang tai nạn từ app/globals.css của baohiempvi-vnwebsite ra dist/tai-nan.css.
// Chạy lại khi giao diện trang /bao-hiem-tai-nan-24-24 bên baohiempvi-vn thay đổi:
//   BAOHIEMPVI_DIR=/đường/dẫn/baohiempvi-vnwebsite node tools/extract-tai-nan-css.cjs
// (cần `npm ci` trong project đó để có postcss). Danh sách lớp có trên trang nằm ở
// tools/data/tai-nan-classes.json (thu bằng trình duyệt từ trang gốc, thêm tay các lớp
// chỉ hiện khi thao tác). Giữ luật của các lớp đó, gắn tiền tố .tn-page, đổi font
// Montserrat/DM Sans về font của pvihcm, nâng chữ dưới 13px lên 13px (AGENTS.md).
const fs = require('fs');
const path = require('path');
const B = process.env.BAOHIEMPVI_DIR || path.resolve(__dirname, '../../baohiempvi-vnwebsite');
const postcss = require(path.join(B, 'node_modules/postcss'));
const css = fs.readFileSync(path.join(B, 'app/globals.css'), 'utf8');
const used = new Set(JSON.parse(fs.readFileSync(path.join(__dirname, 'data/tai-nan-classes.json'), 'utf8')).filter(c => !/^(legal-footer|quote-feedback)/.test(c) && !/^auto-header/.test(c)));
const root = postcss.parse(css);
const out = postcss.root();
const keepSel = (sel) => {
  const classes = [...sel.matchAll(/\.([a-zA-Z0-9_-]+)/g)].map(m => m[1]);
  if (!classes.length) return false;
  if (/#|(^|[\s>+~(])(html|body)\b|:root/.test(sel)) return false;
  return classes.every(c => used.has(c));
};
const anims = new Set();
const SCOPE = '.tn-page';
function handleRule(rule, parent) {
  const sels = rule.selectors.filter(keepSel);
  if (!sels.length) return;
  const r = rule.clone();
  r.selectors = sels.map(s => `${SCOPE} ${s}`);
  r.walkDecls(d => {
    if (/^animation(-name)?$/.test(d.prop)) d.value.split(/[\s,]+/).forEach(v => anims.add(v));
    const FAM = '"Be Vietnam Pro","BVP Fallback",sans-serif';
    if (d.prop === 'font-family' && /Montserrat|DM Sans/.test(d.value)) d.value = 'inherit';
    if (d.prop === 'font' && /Montserrat|DM Sans/.test(d.value)) d.value = d.value.replace(/"?(Montserrat|DM Sans)"?(\s*,\s*[^;]*)?$/, FAM);
  });
  // Quy tắc độ dễ đọc của pvihcm (AGENTS.md): chữ không nhỏ hơn 13px.
  r.walkDecls(d => {
    if (d.prop === 'font-size' || d.prop === 'font') d.value = d.value.replace(/(^|[\s/])(\d+(?:\.\d+)?)px/g, (m, pre, n) => (d.prop === 'font' && pre === '/') ? m : (Number(n) < 13 ? pre + '13px' : m));
  });
  parent.append(r);
}
root.each(node => {
  if (node.type === 'rule') handleRule(node, out);
  else if (node.type === 'atrule' && node.name === 'media') {
    const m = node.clone({ nodes: [] });
    node.each(n => { if (n.type === 'rule') handleRule(n, m); });
    if (m.nodes.length) out.append(m);
  }
});
root.walkAtRules('keyframes', k => { if (anims.has(k.params)) out.append(k.clone()); });
// biến màu: gắn vào khối bọc thay vì :root để không đổi màu header/chân trang của pvihcm
const vars = []; root.walkRules(':root', r => r.walkDecls(d => vars.push(`${d.prop}:${d.value}`)));
const HEAD = `/* ═══════════════════════════════════════════════════════════════════\n   BẢO HIỂM TAI NẠN 24/24: giao diện theo trang /bao-hiem-tai-nan-24-24 của\n   baohiempvi-vn (chủ site yêu cầu 28/10/2026). Markup sinh từ tools/tai-nan-ui.mjs.\n   Phần dưới khối "đặt lại" là luật trích nguyên từ app/globals.css của\n   baohiempvi-vnwebsite, chỉ giữ lớp có trên trang và gắn tiền tố .tn-page.\n   ═══════════════════════════════════════════════════════════════════ */\n/* Đặt lại giống phần nền của baohiempvi-vn, độ ưu tiên thấp nhất (:where) */\n:where(.tn-page .auto-page){display:block;background:#f7fbff;color:var(--ink);overflow:hidden;line-height:normal}\n:where(.tn-page .auto-page) a{color:inherit;text-decoration:none}\n:where(.tn-page .auto-page) img{display:block;width:auto;max-width:100%}\n:where(.tn-page .auto-page) button,:where(.tn-page .auto-page) input,:where(.tn-page .auto-page) select,:where(.tn-page .auto-page) textarea{font:inherit}\n:where(.tn-page .auto-page) button{cursor:pointer}\n/* Phần tử có thuộc tính hidden luôn ẩn, kể cả khi lớp CSS đặt display */\n.tn-page .auto-page [hidden]{display:none!important}\n/* Mũi tên trong link không đổi sang đỏ khi rê chuột như luật chung của site.css */\n.tn-page .auto-page a:hover i[aria-hidden],.tn-page .auto-page a:focus-visible i[aria-hidden]{color:inherit}\n`;
// Sửa riêng của pvihcm, đặt cuối file để thắng luật gốc.
const FOOT = `
/* pvihcm: trên màn hẹp, bản gốc ép thẻ đối tượng cao 268px (flex 1 1 0 trong cột) nên phần đầu thẻ
   bị cắt mất tiêu đề. Cho thẻ cao theo nội dung. */
@media (max-width: 900px) {
  .tn-page .accident-page .auto-choice-card.is-tier { flex: 0 0 auto; }
}
/* pvihcm: bản gốc giới hạn mỗi mục của bộ tính phí cao 115px và cuộn bên trong trên điện thoại,
   khách dễ không thấy nút "Trường học", "Cá nhân" hay ô thời hạn. Hiện đủ, không cuộn trong. */
.tn-page .accident-page .auto-segment-group > div { max-height: none; overflow: visible; }
`;
let text = HEAD + `${SCOPE} .auto-page{${vars.join(';')}}\n` + out.toString() + FOOT;
fs.writeFileSync(path.join(__dirname, '../dist/tai-nan.css'), text);
console.log('tai-nan.css:', out.nodes.length, 'luật,', text.length, 'byte');
