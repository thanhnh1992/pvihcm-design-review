// Rà các trang bài trong dist/tin-tuc/ (chủ site yêu cầu 16/11/2026: sửa thẻ tiêu đề, schema, mục lục,
// đoạn văn ngắn 3-4 câu). Chỉ đọc, không sửa. Chạy: node tools/audit-articles.mjs [--chi-tiet]
// Báo cho từng trang:
//  - h1: số thẻ H1 (phải đúng 1); nhay: tiêu đề nhảy cấp (H2 -> H4...).
//  - toc: link mục lục trỏ tới id không có trong trang; thieu: H2 có id mà mục lục không liệt kê.
//  - ld: JSON-LD không đọc được, hoặc thiếu trường bắt buộc; trung: cùng @type khai 2 lần.
//  - dai: đoạn <p> trong thân bài dài hơn 4 câu.
//  - inline: <script> viết thẳng trong HTML (CSP site chỉ cho script-src 'self' + 1 mã băm).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist/tin-tuc');
const VERBOSE = process.argv.includes('--chi-tiet');
const csp = fs.readFileSync(path.resolve(ROOT, '../../vercel.json'), 'utf8').match(/'sha256-([^']+)'/g) || [];
const allowed = new Set(csp.map((s) => s.slice(8, -1)));
const strip = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
// Đếm câu: dấu . ! ? theo sau là khoảng trắng + chữ hoa, hoặc cuối đoạn. Bỏ qua số thập phân, viết tắt "TP.", "NĐ-CP".
export function sentences(text) {
  const t = text.replace(/\b(TP|Tp|NĐ|QĐ|TT|ThS|TS|Ths|Mr|Ms|v\.v)\./g, '$1·').replace(/(\d)\.(\d)/g, '$1·$2');
  return t.split(/(?<=[.!?…])\s+(?=[A-ZĐÀ-Ỹ0-9"“(])/u).filter((x) => x.trim().length > 1);
}

const rows = [];
for (const slug of fs.readdirSync(ROOT)) {
  const f = path.join(ROOT, slug, 'index.html');
  if (!fs.existsSync(f)) continue;
  const html = fs.readFileSync(f, 'utf8');
  const main = (html.match(/<main[^>]*>([\s\S]*)<\/main>/) || [, html])[1];
  const r = { slug, issues: [] };
  const h1 = (main.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) r.issues.push(`h1=${h1}`);
  // Nhảy cấp tiêu đề (bỏ khối nhận xét bạn đọc và chân trang)
  const heads = [...main.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  let prev = 1, jumps = 0;
  for (const h of heads) { if (h > prev + 1) jumps++; prev = h; }
  if (jumps) r.issues.push(`nhay=${jumps}`);
  // Mục lục
  const toc = main.match(/class="kb-toc[^"]*"[\s\S]*?<\/ol>/);
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  if (toc) {
    const links = [...toc[0].matchAll(/href="#([^"]+)"/g)].map((m) => decodeURIComponent(m[1]));
    const broken = links.filter((id) => !ids.has(id));
    if (broken.length) r.issues.push(`toc-hong=${broken.join(',')}`);
    const after = main.slice(main.indexOf('kb-main'));
    const h2ids = [...after.matchAll(/<h2 id="([^"]+)"/g)].map((m) => m[1]).filter((id) => !['fb-h', 'san-pham', 'nguon', 'cau-hoi'].includes(id));
    // H2 nằm ngay sau (trong 250 ký tự) một phần tử mà mục lục trỏ tới thì coi là đã có (khung bao <aside id=…><h2>).
    const covered = (id) => links.some((l) => { const a = html.indexOf(`id="${l}"`), h = html.indexOf(`id="${id}"`); return a >= 0 && h > a && h - a < 250; });
    const miss = h2ids.filter((id) => !links.includes(id) && !covered(id));
    if (miss.length) r.issues.push(`toc-thieu=${miss.join(',')}`);
    const h2NoId = (after.match(/<h2(?![^>]*\sid=)[\s>]/g) || []).length;
    if (h2NoId) r.issues.push(`h2-khong-id=${h2NoId}`);
  } else r.issues.push('khong-co-toc');
  // JSON-LD
  const types = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let o; try { o = JSON.parse(m[1]); } catch { r.issues.push('ld-hong'); continue; }
    for (const x of [].concat(o['@graph'] || o)) {
      types.push(x['@type']);
      if (/Article/.test(x['@type'])) {
        for (const k of ['headline', 'datePublished', 'dateModified', 'image', 'author', 'publisher', 'mainEntityOfPage']) if (!x[k]) r.issues.push(`ld-thieu-${k}`);
        if (x.headline && x.headline.length > 110) r.issues.push(`headline-dai=${x.headline.length}`);
        if (x.author && !x.author.url) r.issues.push('ld-author-khong-url');
      }
    }
  }
  const dup = types.filter((t, i) => types.indexOf(t) !== i);
  if (dup.length) r.issues.push(`trung=${[...new Set(dup)].join(',')}`);
  // Script viết thẳng
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)) {
    const h = crypto.createHash('sha256').update(m[1]).digest('base64');
    if (!allowed.has(h)) r.issues.push('inline-bi-chan');
  }
  // Đoạn văn dài trong thân bài
  const body = main.slice(Math.max(0, main.indexOf('kb-col')), main.indexOf('id="san-pham"') > 0 ? main.indexOf('id="san-pham"') : undefined);
  const long = [...body.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/g)].map((m) => strip(m[1])).filter((t) => sentences(t).length > 4);
  if (long.length) r.issues.push(`dai=${long.length}`);
  r.long = long;
  rows.push(r);
}
let bad = 0;
for (const r of rows) {
  if (r.issues.length) bad++;
  console.log(`${r.issues.length ? '✗' : '✓'} ${r.slug.padEnd(62)} ${r.issues.join('  ')}`);
  if (VERBOSE) r.long.forEach((t) => console.log(`     · (${sentences(t).length} câu) ${t.slice(0, 140)}…`));
}
console.log(`\n${rows.length} trang, ${bad} trang có vấn đề`);
