// Trích CSS trang Bảo hiểm ô tô từ baohiempvi-vnwebsite ra dist/o-to.css (chủ site yêu cầu 09/11/2026).
// Chạy lại khi giao diện trang /bao-hiem-o-to bên baohiempvi-vn thay đổi:
//   BAOHIEMPVI_DIR=/đường/dẫn/baohiempvi-vnwebsite node tools/extract-o-to-css.cjs
// (cần node_modules của project đó để có postcss).
// Nguồn:
//  - app/globals.css: chỉ giữ luật của lớp có trên trang (tools/data/o-to-classes.json,
//    thu bằng trình duyệt trên trang gốc, thêm tay các lớp chỉ hiện khi thao tác).
//  - app/bao-hiem-o-to/online-purchase-cta.module.css và story.module.css: CSS module,
//    tên lớp đổi thành ocp-<tên> và st-<tên> (khớp markup trong tools/o-to-ui.mjs).
// Mọi luật gắn tiền tố .oto-page; font Montserrat/DM Sans đổi về font của pvihcm;
// chữ dưới 13px nâng lên 13px (AGENTS.md).
const fs = require('fs');
const path = require('path');
const B = process.env.BAOHIEMPVI_DIR || path.resolve(__dirname, '../../baohiempvi-vnwebsite');
const postcss = require(path.join(B, 'node_modules/postcss'));
const SCOPE = '.oto-page';
const used = new Set(JSON.parse(fs.readFileSync(path.join(__dirname, 'data/o-to-classes.json'), 'utf8')));

const scopeSel = (s) => (/^\.js-cuon\b/.test(s) ? s.replace(/^\.js-cuon\s*/, `.js-cuon ${SCOPE} `) : `${SCOPE} ${s}`);
const fixDecls = (r) => {
  r.walkDecls((d) => {
    const FAM = '"Be Vietnam Pro","BVP Fallback",sans-serif';
    if (d.prop === 'font-family' && /Montserrat|DM Sans/.test(d.value)) d.value = 'inherit';
    if (d.prop === 'font' && /Montserrat|DM Sans/.test(d.value)) d.value = d.value.replace(/"?(Montserrat|DM Sans)"?(\s*,\s*[^;]*)?$/, FAM);
    if (d.prop === 'font-size' || d.prop === 'font') d.value = d.value.replace(/(^|[\s/])(\d+(?:\.\d+)?)px/g, (m, pre, n) => (d.prop === 'font' && pre === '/') ? m : (Number(n) < 13 ? pre + '13px' : m));
  });
};

// 1) globals.css
const out = postcss.root();
const anims = new Set();
// Tách danh sách theo dấu phẩy ở cấp ngoài cùng (bỏ qua dấu phẩy trong ngoặc).
const splitTop = (s) => { const out = []; let depth = 0, cur = ''; for (const ch of s) { if (ch === '(') depth++; if (ch === ')') depth--; if (ch === ',' && !depth) { out.push(cur); cur = ''; } else cur += ch; } out.push(cur); return out.map((x) => x.trim()); };
// Luật gộp kiểu :is(.v4-home, .auto-page, …): nhóm :is/:where chỉ cần một lựa chọn khớp trang này;
// :not(...) không làm luật mất hiệu lực nên bỏ qua khi xét. Phần còn lại: mọi lớp phải có trên trang.
const okPart = (sel) => {
  let rest = '', i = 0, ok = true, hasClass = false;
  while (i < sel.length) {
    const m = /^:(is|where|not)\(/.exec(sel.slice(i));
    if (m) {
      let depth = 0, j = i + m[0].length - 1;
      for (; j < sel.length; j++) { if (sel[j] === '(') depth++; if (sel[j] === ')' && --depth === 0) break; }
      const inner = sel.slice(i + m[0].length, j);
      if (m[1] !== 'not') {
        const alts = splitTop(inner);
        const good = alts.filter((a) => okPart(a) !== false);
        if (!good.length) ok = false;
        if (good.some((a) => /\./.test(a))) hasClass = true;
      }
      rest += ' '; i = j + 1;
    } else { rest += sel[i]; i++; }
  }
  const classes = [...rest.matchAll(/\.([a-zA-Z0-9_-]+)/g)].map((x) => x[1]);
  if (classes.length) hasClass = true;
  if (!classes.every((c) => used.has(c))) return false;
  return ok ? (hasClass ? true : null) : false;
};
const keepSel = (sel) => {
  if (sel === ':root') return true;
  sel = sel.replace(/^:root\s+/, '');
  if (/#|(^|[\s>+~(,])(html|body)\b|:root/.test(sel)) return false;
  return okPart(sel) === true;
};
// :root (biến màu, cỡ chữ dễ đọc --pvi-readable-*) gắn vào khối bọc, giữ nguyên trong @media của nó,
// để không đổi màu/cỡ chữ ở header, chân trang của pvihcm. ":root :is(...)" bỏ :root rồi gắn tiền tố.
const mapSel = (sel) => (sel === ':root' ? `${SCOPE} .auto-page` : scopeSel(sel.replace(/^:root\s+/, '')));
function handleRule(rule, parent) {
  const sels = rule.selectors.filter(keepSel);
  if (!sels.length) return;
  const r = rule.clone();
  r.selectors = sels.map(mapSel);
  r.walkDecls((d) => { if (/^animation(-name)?$/.test(d.prop)) d.value.split(/[\s,]+/).forEach((v) => anims.add(v)); });
  fixDecls(r);
  parent.append(r);
}
const g = postcss.parse(fs.readFileSync(path.join(B, 'app/globals.css'), 'utf8'));
g.each((node) => {
  if (node.type === 'rule') handleRule(node, out);
  else if (node.type === 'atrule' && node.name === 'media') {
    const m = node.clone({ nodes: [] });
    node.each((n) => { if (n.type === 'rule') handleRule(n, m); });
    if (m.nodes.length) out.append(m);
  }
});
g.walkAtRules('keyframes', (k) => { if (anims.has(k.params)) out.append(k.clone()); });

// 2) CSS module: .ten -> .tiento-ten, :global(.x) -> .x, @keyframes ten -> tiento-ten
function moduleCss(file, prefix) {
  const root = postcss.parse(fs.readFileSync(path.join(B, 'app/bao-hiem-o-to', file), 'utf8'));
  const frames = new Set();
  root.walkAtRules('keyframes', (k) => { frames.add(k.params); k.params = `${prefix}-${k.params}`; });
  const ren = (sel) => {
    const globals = [];
    sel = sel.replace(/:global\(([^)]+)\)/g, (m, inner) => { globals.push(inner); return `\u0000${globals.length - 1}\u0000`; });
    sel = sel.replace(/\.([a-zA-Z_][a-zA-Z0-9_-]*)/g, (m, c) => `.${prefix}-${c}`);
    return sel.replace(/\u0000(\d+)\u0000/g, (m, i) => globals[i]);
  };
  root.walkRules((r) => {
    if (r.parent && r.parent.type === 'atrule' && r.parent.name === 'keyframes') return;
    r.selectors = r.selectors.map((s) => scopeSel(ren(s)));
    fixDecls(r);
    r.walkDecls((d) => {
      if (/^animation(-name)?$/.test(d.prop)) d.value = d.value.replace(/[a-zA-Z_][\w-]*/g, (w) => (frames.has(w) ? `${prefix}-${w}` : w));
    });
  });
  return root.toString();
}

const HEAD = `/* ═══════════════════════════════════════════════════════════════════
   BẢO HIỂM Ô TÔ: giao diện theo trang /bao-hiem-o-to của baohiempvi-vn
   (chủ site yêu cầu 09/11/2026). Markup sinh từ tools/o-to-ui.mjs.
   File này do tools/extract-o-to-css.cjs sinh ra, đừng sửa tay: sửa riêng
   của pvihcm đặt trong khối FOOT của công cụ đó.
   ═══════════════════════════════════════════════════════════════════ */
/* Đặt lại giống phần nền của baohiempvi-vn, độ ưu tiên thấp nhất (:where) */
:where(.oto-page .auto-page){display:block;background:#f7fbff;color:var(--ink);overflow:hidden;line-height:1.6}
:where(.oto-page .auto-page) a{color:inherit;text-decoration:none}
:where(.oto-page .auto-page) img{display:block;width:auto;max-width:100%}
:where(.oto-page .auto-page) button,:where(.oto-page .auto-page) input,:where(.oto-page .auto-page) select,:where(.oto-page .auto-page) textarea{font:inherit}
:where(.oto-page .auto-page) button{cursor:pointer}
.oto-page .auto-page [hidden]{display:none!important}
.oto-page .auto-page a:hover i[aria-hidden],.oto-page .auto-page a:focus-visible i[aria-hidden]{color:inherit}
`;
// Sửa riêng của pvihcm, đặt cuối file để thắng luật gốc.
const FOOT = `
/* pvihcm: bản gốc giới hạn mỗi mục của bộ tra phí cao 115px và cuộn bên trong trên điện thoại,
   nút "Pickup, minivan…" bị cắt nửa. Hiện đủ, không cuộn trong (giống trang tai nạn). */
.oto-page .auto-segment-group > div { max-height: none; overflow: visible; }
`;
const text = HEAD + out.toString()
  + '\n/* ── online-purchase-cta.module.css ── */\n' + moduleCss('online-purchase-cta.module.css', 'ocp')
  + '\n/* ── story.module.css ── */\n' + moduleCss('story.module.css', 'st') + FOOT;
fs.writeFileSync(path.join(__dirname, '../dist/o-to.css'), text);
console.log('o-to.css:', out.nodes.length, 'luật globals,', text.length, 'byte');
