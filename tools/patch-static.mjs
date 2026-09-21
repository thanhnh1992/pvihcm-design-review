// Trang chủ và trang cháy nổ không sinh bằng script: chạy file này để áp header/menu/chân trang
// mới nhất từ chrome.mjs vào hai trang đó (sau mỗi lần đổi NAV hoặc footer).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { header, footer } from './chrome.mjs';
const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
for (const [rel, p] of [['index.html', '/'], ['san-pham/chay-no-bat-buoc/index.html', '/san-pham/chay-no-bat-buoc/']]) {
  const f = path.join(DIST, rel);
  let h = fs.readFileSync(f, 'utf8');
  const a = h.indexOf('<a class="skip"'), b = h.indexOf('</header>');
  if (a < 0 || b < 0) throw new Error('không thấy header trong ' + rel);
  h = h.slice(0, a) + header(p) + h.slice(b + '</header>'.length);
  h = h.replace(/<footer id="lien-he"[\s\S]*?<\/footer>/, footer());
  fs.writeFileSync(f, h);
  console.log('patched', rel);
}
