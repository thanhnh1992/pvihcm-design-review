import fs from 'node:fs';
import assert from 'node:assert/strict';
import { footer, page } from './chrome.mjs';
import { localityPaths, localityForPath } from './locality-footer.mjs';
import { localProductCopy } from './data/binh-duong-product-copy.mjs';
import { protectExternalEmbeds } from './privacy-ui.mjs';
import { nofollowExternal } from './link-out.mjs';
const paths = [...localityPaths, '/binhduong/', ...Object.keys(localProductCopy).map((slug) => '/binhduong/' + slug + '/')];
for (const path of paths) {
  const file = 'dist' + path + 'index.html';
  assert(fs.existsSync(file), file);
  const before = fs.readFileSync(file, 'utf8');
  const oldFooter = before.match(/<footer id="lien-he"[\s\S]*?<\/footer>/)?.[0];
  assert(oldFooter, file);
  const html = nofollowExternal(protectExternalEmbeds(footer(path))).match(/<footer id="lien-he"[\s\S]*?<\/footer>/)[0];
  const after = before.replace(oldFooter, html);
  assert.equal(after.replace(html, ''), before.replace(oldFooter, ''), 'Đổi ngoài footer: ' + path);
  const local = localityForPath(path);
  assert(html.includes(local.unit.address.replaceAll('&', '&amp;')), path);
  assert(html.includes('data-privacy-src="https://www.google.com/maps?q=' + encodeURIComponent(local.unit.address)), 'Bản đồ: ' + path);
  assert(!html.includes('footer-hq-wrap'), 'Ảnh trụ sở sai: ' + path);
  if (!local.point) assert(html.includes('tel:' + local.unit.phone.replace(/\D/g, '')), 'Số văn phòng: ' + path);
  const generated = page({path,title:'Kiểm tra',description:'Kiểm tra',main:''});
  assert(generated.includes(html), 'Không giữ khi sinh lại: ' + path);
  fs.writeFileSync(file, after);
}
assert(!footer('/').includes('site-footer-local'));
assert(footer('/').includes('473 Điện Biên Phủ'));
assert(!footer('/san-pham/chay-no-bat-buoc/').includes('site-footer-local'));
console.log('PASS: ' + paths.length + ' trang địa phương; chỉ đổi footer, đúng địa chỉ/điện thoại/bản đồ; nguồn sinh giữ thay đổi.');

