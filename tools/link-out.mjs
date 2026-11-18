// Link ra ngoài (chủ site chốt 18/11/2026): hạn chế tối đa; link nào buộc phải có thì gắn rel="nofollow".
// nofollowExternal(html): thêm "nofollow" vào rel của mọi <a href="http(s)://..."> không trỏ về pvihcm.com,
// giữ nguyên các giá trị rel đang có (noopener, noreferrer...). Chạy lại nhiều lần không đổi kết quả.
// Chạy như script: node tools/link-out.mjs  → áp cho mọi trang HTML trong dist/ (trừ file xác minh Google).
// Đặt ở cuối quy trình sinh trang (sau srcset.mjs, trước gen-sitemap.mjs). chrome.mjs cũng gọi hàm này.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OWN = /^(?:[a-z0-9-]+\.)*pvihcm\.com$/i;

export function nofollowExternal(html) {
  return html.replace(/<a\b[^>]*>/gi, (tag) => {
    const href = tag.match(/\shref="(https?:\/\/[^"]+)"/i);
    if (!href) return tag;
    let host;
    try { host = new URL(href[1]).hostname; } catch { return tag; }
    if (OWN.test(host)) return tag;
    const rel = tag.match(/\srel="([^"]*)"/i);
    if (rel) {
      const parts = rel[1].split(/\s+/).filter(Boolean);
      if (parts.includes('nofollow')) return tag;
      return tag.replace(rel[0], ` rel="${['nofollow', ...parts].join(' ')}"`);
    }
    return tag.replace(/<a\b/i, '<a rel="nofollow"');
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  let n = 0;
  for (const f of walk(DIST)) {
    if (!f.endsWith('.html') || path.basename(f).startsWith('google')) continue;
    const s = fs.readFileSync(f, 'utf8'), t = nofollowExternal(s);
    if (t !== s) { fs.writeFileSync(f, t); n++; }
  }
  console.log(`link-out: gắn nofollow cho link ra ngoài ở ${n} trang`);
}
