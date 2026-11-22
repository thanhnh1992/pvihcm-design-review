// Trang /danh-gia/: toàn bộ đánh giá của khách về Công ty Bảo hiểm PVI Thành Đô (chủ site yêu cầu 23/11/2026).
// Các trang khác chỉ hiện 3 nhận xét mới nhất kèm link "Xem toàn bộ" về đây. Khối đánh giá (điểm Google + điểm khách,
// form, danh sách) do tools/danh-gia-sao.mjs gắn vào trước </main> với data-full (hiện 20, bấm xem thêm).
// Chạy: node tools/gen-danh-gia.mjs, rồi node tools/danh-gia-sao.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { page, breadcrumbJsonLd } from './chrome.mjs';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const P = '/danh-gia/';
const main = `
<section class="dgs-head"><div class="dgs-in">
<p class="dgs-crumb"><a href="/">Trang chủ</a> / <span>Đánh giá khách hàng</span></p>
<h1>Đánh giá khách hàng về Bảo hiểm PVI Thành Đô</h1>
<p>Toàn bộ đánh giá khách đã gửi trên website pvihcm.com, cộng với điểm trên Google của công ty. Bạn đã mua bảo hiểm hoặc được tư vấn tại PVI Thành Đô? Hãy chấm sao bên dưới.</p>
</div></section>`;
const html = page({
  path: P,
  title: 'Đánh giá khách hàng về Bảo hiểm PVI Thành Đô',
  description: 'Toàn bộ đánh giá của khách hàng về Công ty Bảo hiểm PVI Thành Đô trên website và điểm trên Google. Chấm sao, gửi nhận xét về dịch vụ tư vấn, cấp đơn, bồi thường.',
  head: breadcrumbJsonLd(P, 'Đánh giá khách hàng'),
  main,
});
fs.mkdirSync(path.join(DIST, 'danh-gia'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'danh-gia/index.html'), html);
console.log('wrote danh-gia/index.html');
