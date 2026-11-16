// Lõi dùng chung để trích CSS một phần giao diện của baohiempvi-vnwebsite sang pvihcm
// (trang ô tô: tools/extract-o-to-css.cjs; bộ tra cứu cháy nổ: tools/extract-chay-no-css.cjs).
//  - app/globals.css: chỉ giữ luật mà mọi lớp đều có trên phần được chép (danh sách lớp thu bằng
//    trình duyệt trên trang gốc). Luật gộp :is(...) chỉ cần một lựa chọn khớp.
//  - CSS module: tên lớp đổi thành <tiền tố>-<tên> (khớp markup bên pvihcm), :global(.x) giữ .x.
//  - Mọi luật gắn tiền tố khối bọc (scope); :root (biến màu, --pvi-readable-*) gắn vào
//    "<scope> .auto-page" và giữ trong @media của nó, để không đổi header, chân trang của pvihcm.
//  - Font Montserrat/DM Sans đổi về font của pvihcm; chữ dưới 13px nâng lên 13px (AGENTS.md).
// Cần node_modules của baohiempvi-vnwebsite (postcss). Đường dẫn qua BAOHIEMPVI_DIR.
const fs = require('fs');
const path = require('path');

const B = process.env.BAOHIEMPVI_DIR || path.resolve(__dirname, '../../baohiempvi-vnwebsite');

/**
 * @param {object} o
 * @param {string} o.scope        lớp khối bọc, ví dụ '.oto-page'
 * @param {string[]} o.classes    lớp có trên phần chép
 * @param {{dir:string,file:string,prefix:string}[]} o.modules  CSS module cần chép
 * @param {string} o.head         chú thích đầu file
 * @param {string} o.foot         sửa riêng của pvihcm, đặt cuối file
 * @returns {{text:string, rules:number}}
 */
function extract({ scope, classes, modules = [], head = '', foot = '' }) {
  const postcss = require(path.join(B, 'node_modules/postcss'));
  const used = new Set(classes);
  const scopeSel = (s) => (/^\.js-cuon\b/.test(s) ? s.replace(/^\.js-cuon\s*/, `.js-cuon ${scope} `) : `${scope} ${s}`);
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
  const splitTop = (s) => { const res = []; let depth = 0, cur = ''; for (const ch of s) { if (ch === '(') depth++; if (ch === ')') depth--; if (ch === ',' && !depth) { res.push(cur); cur = ''; } else cur += ch; } res.push(cur); return res.map((x) => x.trim()); };
  const okPart = (sel) => {
    let rest = '', i = 0, ok = true, hasClass = false;
    while (i < sel.length) {
      const m = /^:(is|where|not)\(/.exec(sel.slice(i));
      if (m) {
        let depth = 0, j = i + m[0].length - 1;
        for (; j < sel.length; j++) { if (sel[j] === '(') depth++; if (sel[j] === ')' && --depth === 0) break; }
        const inner = sel.slice(i + m[0].length, j);
        if (m[1] !== 'not') {
          const good = splitTop(inner).filter((a) => okPart(a) !== false);
          if (!good.length) ok = false;
          if (good.some((a) => /\./.test(a))) hasClass = true;
        }
        rest += ' '; i = j + 1;
      } else { rest += sel[i]; i++; }
    }
    const cls = [...rest.matchAll(/\.([a-zA-Z0-9_-]+)/g)].map((x) => x[1]);
    if (cls.length) hasClass = true;
    if (!cls.every((c) => used.has(c))) return false;
    return ok ? (hasClass ? true : null) : false;
  };
  const keepSel = (sel) => {
    if (sel === ':root') return true;
    sel = sel.replace(/^:root\s+/, '');
    if (/#|(^|[\s>+~(,])(html|body)\b|:root/.test(sel)) return false;
    return okPart(sel) === true;
  };
  const mapSel = (sel) => (sel === ':root' ? `${scope} .auto-page` : scopeSel(sel.replace(/^:root\s+/, '')));
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

  // 2) CSS module
  function moduleCss({ dir, file, prefix }) {
    const root = postcss.parse(fs.readFileSync(path.join(B, dir, file), 'utf8'));
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

  const text = head + out.toString() + modules.map((m) => `\n/* ── ${m.file} ── */\n` + moduleCss(m)).join('') + foot;
  return { text, rules: out.nodes.length };
}

/** Khối đặt lại nền giống baohiempvi-vn, độ ưu tiên thấp nhất (:where). */
const resetCss = (scope) => `/* Đặt lại giống phần nền của baohiempvi-vn, độ ưu tiên thấp nhất (:where) */
:where(${scope} .auto-page){display:block;background:#f7fbff;color:var(--ink);overflow:hidden;line-height:1.6}
:where(${scope} .auto-page) a{color:inherit;text-decoration:none}
:where(${scope} .auto-page) img{display:block;width:auto;max-width:100%}
:where(${scope} .auto-page) button,:where(${scope} .auto-page) input,:where(${scope} .auto-page) select,:where(${scope} .auto-page) textarea{font:inherit}
:where(${scope} .auto-page) button{cursor:pointer}
${scope} .auto-page [hidden]{display:none!important}
${scope} .auto-page a:hover i[aria-hidden],${scope} .auto-page a:focus-visible i[aria-hidden]{color:inherit}
`;

module.exports = { extract, resetCss, B };
