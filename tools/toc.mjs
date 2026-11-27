// Mục lục bài viết dựng từ chính các H2 trong bài (chủ site yêu cầu 16/11/2026: "fix lại phần mục lục").
// Trước đây mục lục gõ tay trong từng module bài (A.toc) nên hay sót mục (ví dụ phần "Đăng ký tư vấn",
// hai mục giữa bài tai nạn công trình). Nay:
//  - mọi H2 trong phần nội dung đều có id (thiếu thì tự đặt từ chữ tiêu đề) để mục lục và Google
//    trỏ thẳng được tới từng mục;
//  - mục lục = các mục người viết đã khai (giữ tên ngắn và thứ tự của họ) + mọi H2 còn sót,
//    chèn đúng vị trí trong bài. Mục khai trỏ vào khung bao ngay trước một H2 (ví dụ
//    <aside id="bat-buoc"><h2 id="bat-buoc-h">) được coi là chính H2 đó, không sinh mục trùng.
// Không đưa vào mục lục: khối nhận xét bạn đọc (fb-h) và "Nguồn tham chiếu" (nguon).
import { esc } from './chrome.mjs';

const SKIP = new Set(['fb-h', 'nguon', 'nguon-tham-chieu']);
const plain = (s) => s.replace(/<b>\s*\d+\.\s*<\/b>/g, '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const slugify = (s) => plain(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'muc';

/** Gắn id cho mọi <h2> chưa có id. Trả về HTML mới. */
export function ensureH2Ids(html) {
  const used = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  return html.replace(/<h2((?:\s(?!id=)[^>]*)?)>([\s\S]*?)<\/h2>/g, (m, attrs = '', inner) => {
    let id = slugify(inner), n = 2;
    while (used.has(id)) id = `${slugify(inner)}-${n++}`;
    used.add(id);
    return `<h2 id="${id}"${attrs}>${inner}</h2>`;
  });
}

/**
 * Danh sách mục [id, nhãn] theo thứ tự trong bài.
 * @param {string} html     phần nội dung (đã qua ensureH2Ids)
 * @param {[string,string][]} declared  mục người viết khai (có thể rỗng)
 */
export function tocEntries(html, declared = []) {
  const pos = (id) => html.indexOf(`id="${id}"`);
  const h2s = [...html.matchAll(/<h2 id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => ({ id: m[1], label: plain(m[2]), at: m.index }));
  const out = [];
  const covered = new Set();
  for (const [id, label] of declared) {
    const at = pos(id);
    if (at < 0) continue; // mục khai mà bài không có thì bỏ, tránh link hỏng
    out.push({ id, label, at });
    covered.add(id);
    // khung bao ngay trước một H2 (trong vòng 250 ký tự): H2 đó coi như đã có trong mục lục
    const h = h2s.find((x) => x.at > at && x.at - at < 250);
    if (h && !declared.some(([d]) => d === h.id)) covered.add(h.id);
  }
  for (const h of h2s) if (!covered.has(h.id) && !SKIP.has(h.id)) out.push(h);
  return out.sort((a, b) => a.at - b.at).map((x) => [x.id, x.label]);
}

/** Khối mục lục, cùng markup với bài kiến thức (.kb-toc). inline=true: ô nằm đầu thân bài (bài một cột). */
export function tocHtml(entries, { inline = false, startOpen = inline, label = 'Trong bài này' } = {}) {
  if (entries.length < 2) return '';
  // Dùng <div role="navigation"> chứ không <nav>: style.css ẩn mọi thẻ nav dưới 820px (luật của menu đầu trang).
  return `<div class="kb-toc${inline ? ' kb-toc-inline' : ''}" role="navigation" aria-label="Mục lục bài viết"><details${startOpen ? ' open' : ''}><summary>${esc(label)} <span>${entries.length} mục</span></summary><ol>${entries.map(([id, label]) => `<li><a href="#${esc(id)}">${esc(label)}</a></li>`).join('')}</ol></details></div>`;
}

/**
 * Bài một cột (tin tức, trang khu vực): gắn id cho H2 rồi chèn ô mục lục ngay trước chỗ `before`
 * (lần xuất hiện đầu tiên, tính từ sau `from` nếu có). Không tìm thấy chỗ chèn thì báo lỗi để biết sửa.
 */
export function withInlineToc(html, before, { from = '' } = {}) {
  const out = ensureH2Ids(html);
  const start = from ? out.indexOf(from) : 0;
  const at = out.indexOf(before, start < 0 ? 0 : start);
  if (at < 0) throw new Error(`withInlineToc: không thấy "${before}"`);
  const entries = tocEntries(out.slice(at));
  return out.slice(0, at) + tocHtml(entries, { inline: true }) + '\n' + out.slice(at);
}
