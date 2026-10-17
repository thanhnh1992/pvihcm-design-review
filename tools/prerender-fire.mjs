// In sẵn bảng "Biểu phí đầy đủ theo nhóm ngành" (59 dòng Phụ lục VI) vào #fire-ref của trang cháy nổ,
// để Google và bot AI không chạy JavaScript vẫn đọc được biểu phí.
// Số liệu lấy nguyên từ dist/san-pham/chay-no-bat-buoc/tariff-data.js, không gõ tay.
// Khi trang tải xong, page.js vẫn vẽ lại bảng theo từng tab như cũ (không sửa page.js).
// Chạy lại sau mỗi lần đổi tariff-data.js. Chạy nhiều lần không nhân đôi bảng.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist/san-pham/chay-no-bat-buoc');
const PAGE = path.join(DIR, 'index.html');

const win = {};
vm.runInNewContext(fs.readFileSync(path.join(DIR, 'tariff-data.js'), 'utf8'), { window: win });
const items = win.FIRE_ITEMS || [];
const groups = win.FIRE_GROUPS || [];
if (!items.length || !groups.length) throw new Error('tariff-data.js không có FIRE_ITEMS / FIRE_GROUPS');
const lost = items.filter((it) => !groups.some((g) => g.id === it.g));
if (lost.length) throw new Error('dòng không thuộc nhóm nào: ' + lost.map((it) => it.code).join(', '));

// Cùng cách định dạng với page.js (drawRef) để chữ trong HTML khớp với bảng JS vẽ.
const rateText = (r) => r.toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 3 }) + '%';
const vnd = (n) => Math.round(n).toLocaleString('vi-VN') + ' đ';
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
if (rateText(0.5) !== '0,50%' || vnd(25e6) !== '25.000.000 đ') throw new Error('Node thiếu dữ liệu định dạng vi-VN (ICU)');
const SAMPLE = 5e9; // phí mẫu tính trên số tiền bảo hiểm 5 tỷ đồng, như page.js

const head = '<thead><tr><th scope="col">Mã</th><th scope="col">Loại cơ sở</th>'
  + '<th scope="col" class="num">Tỷ lệ phí</th><th scope="col">Khấu trừ</th>'
  + '<th scope="col" class="num">Phí mẫu trên 5 tỷ</th></tr></thead>';

const tables = groups.map((g) => {
  const rows = items.filter((it) => it.g === g.id);
  return '<table>'
    + `<caption style="text-align:left;padding:14px 16px 6px;font-weight:700;color:var(--ink)">${esc(g.label)} · ${rows.length} dòng</caption>`
    + head + '<tbody>'
    + rows.map((it) => '<tr>'
      + `<td class="code">${esc(it.code)}</td>`
      + `<td>${esc(it.ten)}${it.nguong ? `<br><span style="color:var(--muted);font-size:14px">${esc(it.nguong)}</span>` : ''}</td>`
      + `<td class="num">${rateText(it.rate)}</td>`
      + `<td>Loại ${esc(it.kt)}</td>`
      + `<td class="num">${vnd(SAMPLE * it.rate / 100)}</td></tr>`).join('')
    + '</tbody></table>';
}).join('');

const START = '<!-- fire-ref:start (tools/prerender-fire.mjs) -->';
const END = '<!-- fire-ref:end -->';
const block = START + tables + END;

let html = fs.readFileSync(PAGE, 'utf8');
const empty = '<div class="fire-ref" id="fire-ref"></div>';
const a = html.indexOf(START);
if (a >= 0) {
  const b = html.indexOf(END, a);
  if (b < 0) throw new Error('thấy dấu mở fire-ref nhưng không thấy dấu đóng');
  html = html.slice(0, a) + block + html.slice(b + END.length);
} else if (html.includes(empty)) {
  html = html.replace(empty, `<div class="fire-ref" id="fire-ref">${block}</div>`);
} else {
  throw new Error('không thấy khung #fire-ref trong ' + PAGE);
}
fs.writeFileSync(PAGE, html);
console.log(`prerender-fire: ${items.length} dòng, ${groups.length} nhóm`);
