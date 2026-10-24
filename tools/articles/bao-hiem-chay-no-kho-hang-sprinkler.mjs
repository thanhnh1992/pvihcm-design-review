// Kiến thức thực tế: bảo hiểm cháy nổ kho hàng có sprinkler, đọc một bảng chào phí 56 tỷ đồng (chủ site gửi 18/10/2026).
// Bản chuẩn ở baohiempvi-vn.com (mảng Trải nghiệm thực tế); trang này khai canonical về đó.
// Đã che tên, địa chỉ, ngành nghề, số chứng từ của khách; không đăng trang 4 (số hợp đồng). Ảnh kho đã làm mờ biển số, số nhà, biển tên.
import { ZALO_TU_VAN } from './khu-vuc.mjs';

export const post = {
  slug: 'bao-hiem-chay-no-kho-hang-sprinkler-thuc-te',
  date: '2026-10-18',
  dateText: '18/10/2026',
  cat: 'Kiến thức thực tế · Cháy nổ',
  title: 'Bảo hiểm cháy nổ kho hàng có sprinkler: đọc một bảng chào phí thực tế 56 tỷ đồng',
  lead: 'Một kho hàng ở TP.HCM có hệ thống chữa cháy tự động sprinkler và báo cháy tự động vừa được PVI Thành Đô chào phí bảo hiểm cháy nổ bắt buộc mở rộng rủi ro khác: số tiền bảo hiểm 56 tỷ đồng, tỷ lệ phí 0,2%/năm, tổng phí 123,2 triệu đồng đã gồm VAT.',
  image: '/assets/kho-kho-hang-toan-canh.webp',
  alt: 'Bên trong nhà kho mái tôn khung thép rộng, các kiện hàng bao xếp trên pallet và thùng carton phía xa',
  readMin: 6,
  canonical: 'https://www.baohiempvi-vn.com/kien-thuc/bao-hiem-chay-no-kho-hang-sprinkler-thuc-te',
};

export const crumb = 'Kiến thức thực tế';
export const hero = { name: 'kho-kho-hang-toan-canh', w: 1200, h: 630, position: '50% 55%', caption: 'Ảnh thực tế: bên trong kho hàng được PVI Thành Đô khảo sát trước khi chào phí, tháng 10/2026 · Nguồn: PVI Thành Đô.' };
export const seo = {
  title: 'Bảo hiểm cháy nổ kho hàng có sprinkler: bảng chào phí thật | PVI',
  description: 'Kho hàng có sprinkler và báo cháy tự động ở TP.HCM: số tiền bảo hiểm 56 tỷ, phí 0,2%/năm, 8 rủi ro, mức khấu trừ và các điều khoản bổ sung nên có.',
};

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const toc = [
  ['tai-san', 'Kho được bảo hiểm những gì'],
  ['pham-vi', 'Phần bắt buộc và phần mở rộng'],
  ['sprinkler', 'Vì sao cần rủi ro S'],
  ['phi', 'Phí và mức khấu trừ'],
  ['dieu-khoan', 'Điều khoản bổ sung'],
  ['chuan-bi', 'Cần chuẩn bị gì'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Phí bảo hiểm cháy nổ cho kho hàng 56 tỷ đồng là bao nhiêu?', answer: 'Với kho trong bài, tỷ lệ phí 0,2%/năm, phí 112 triệu đồng, thuế GTGT 11,2 triệu, tổng 123,2 triệu đồng cho 1 năm, gồm phần cháy nổ bắt buộc và 6 rủi ro mở rộng. Kho khác có thể có tỷ lệ khác tùy phân loại rủi ro, hệ thống phòng cháy chữa cháy và phạm vi chọn mua.' },
  { question: 'Kho có sprinkler thì nên mua thêm điều khoản gì?', answer: 'Nên có rủi ro S (nước thoát ra hay rò rỉ từ hệ thống phòng cháy tự động) và Điều khoản bảo hiểm cho rò rỉ nước từ hệ thống chữa cháy tự động. Hai mục này bảo vệ hàng hóa khi đầu phun vỡ, đường ống rò rỉ hoặc hệ thống kích hoạt ngoài ý muốn.' },
  { question: 'Mức khấu trừ bảo hiểm cháy nổ kho hàng là gì?', answer: 'Là phần chủ kho tự chịu trong mỗi vụ tổn thất. Trên bảng chào phí trong bài, phần cháy, nổ bắt buộc khấu trừ 40 triệu đồng mỗi vụ, các rủi ro khác 20 triệu đồng mỗi vụ. Thiệt hại thấp hơn mức này thì không được bồi thường.' },
  { question: 'Bảo hiểm cháy nổ bắt buộc có bồi thường khi kho bị ngập lụt không?', answer: 'Phần bắt buộc chỉ bảo vệ cháy, nổ. Muốn được bảo vệ khi giông, bão, lũ lụt hay nước tràn từ đường ống, cần mua mở rộng theo Quy tắc bảo hiểm cháy và các rủi ro đặc biệt của PVI, như các rủi ro N, P, S trong bảng chào phí của bài.' },
  { question: 'Hàng tồn kho thay đổi liên tục thì khai số tiền bảo hiểm thế nào?', answer: 'Nên khai theo giá trị hàng tồn cao điểm hoặc trao đổi với PVI Thành Đô để có điều khoản tự động bảo hiểm cho tài sản bổ sung và điều chỉnh số tiền bảo hiểm do biến động giá. Khai thấp hơn giá trị thực có thể bị áp dụng bồi thường theo tỷ lệ.' },
];

export const sources = [
  ['Bảng chào phí bảo hiểm cháy nổ bắt buộc mở rộng rủi ro khác (đã che thông tin khách hàng)', 'https://pvihcm.com/', 'PVI Thành Đô · cấp 06/10/2026'],
  ['Nghị định 105/2025/NĐ-CP và Nghị định 67/2023/NĐ-CP; Quy tắc bảo hiểm cháy và các rủi ro đặc biệt (Quyết định 283/QĐ-PVIBH ngày 13/04/2015)', 'https://vanban.chinhphu.vn/', 'Chính phủ; Tổng công ty Bảo hiểm PVI'],
  ['Bảo hiểm cháy nổ bắt buộc: tra cứu và tính phí', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Tra cứu cơ sở có thuộc diện bắt buộc không, biểu phí và tính phí tham khảo.' },
  { href: '/tin-tuc/nghi-dinh-347-2026-chay-no-bat-buoc/', img: 'section-chay-no', k: 'Pháp lý mới', title: 'Nghị định 347/2026: cháy nổ bắt buộc thay đổi gì', text: 'Bỏ nghiệm thu của Công an, thêm trường hợp không phải mua, tính phí riêng từng hạng mục.' },
];

const photo = (name, w, h, alt, caption) =>
  `<figure class="kb-photo kb-doc"><img src="/assets/kho-${name}.webp" width="${w}" height="${h}" alt="${alt}" loading="lazy" decoding="async"><figcaption>Ảnh thực tế: ${caption} · Nguồn: PVI Thành Đô</figcaption></figure>`;

export function body({ ctaRow }) {
  return `
<p class="kb-first">Một kho hàng ở TP.HCM có hệ thống chữa cháy tự động sprinkler và báo cháy tự động vừa được PVI Thành Đô chào phí <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> mở rộng rủi ro khác. Dưới đây là từng mục trên bảng chào phí và lý do chủ kho nên kiểm tra kỹ.</p>

<h2 id="tai-san">Kho hàng này được bảo hiểm những gì?</h2>
<p>Tài sản được bảo hiểm là danh sách máy móc, thiết bị (cũng là hàng hóa kinh doanh của doanh nghiệp) liệt kê tại địa điểm kho, theo giá trị chủ kho kê khai. Kho thuộc nhóm 4, số thứ tự 420119 trong danh mục tại Phụ lục VI Nghị định 105/2025/NĐ-CP, là căn cứ phân loại rủi ro để tính phí.</p>
<p>Trước khi chào phí, PVI Thành Đô khảo sát thực tế: kết cấu nhà kho, cách xếp hàng trên pallet và kệ cao tầng, lối xe container ra vào và hệ thống chữa cháy.</p>
${photo('trong-kho-hang-bao', 1000, 1333, 'Hàng bao xếp chồng cao trên pallet nhựa trong nhà kho mái tôn khung thép', 'hàng bao xếp trên pallet trong kho, tháng 10/2026')}
${photo('ke-hang-cao-tang', 1000, 1333, 'Hệ kệ thép xanh nhiều tầng chất thùng carton, pallet gỗ xếp chồng phía trước', 'kệ hàng cao tầng và pallet gỗ trong kho, tháng 10/2026')}
${photo('san-kho-xe-container', 1000, 1333, 'Xe đầu kéo container màu đỏ đỗ ở lối vào nhà kho, một người đi bộ trên sân bê tông', 'lối xe container vào kho; biển số xe đã được làm mờ')}
${photo('cong-vao-kho', 1000, 1333, 'Cổng vào khu nhà kho, trụ cổng đá và nhà bảo vệ mái ngói đỏ; số nhà và biển tên đã được làm mờ', 'cổng vào khu kho; số nhà, biển tên doanh nghiệp đã được làm mờ')}

<h2 id="pham-vi">Phạm vi bảo hiểm: phần bắt buộc và phần mở rộng</h2>
<p>Hợp đồng gồm hai lớp. Lớp bắt buộc theo Quy tắc bảo hiểm cháy, nổ bắt buộc ban hành kèm Nghị định 67/2023/NĐ-CP và Nghị định 105/2025/NĐ-CP. Lớp mở rộng theo Quy tắc bảo hiểm cháy và các rủi ro đặc biệt ban hành kèm Quyết định 283/QĐ-PVIBH ngày 13/04/2015 của Tổng công ty Bảo hiểm PVI. Bảng chào phí này bảo hiểm 8 rủi ro:</p>
<div class="kb-table" role="region" aria-label="8 rủi ro được bảo hiểm" tabindex="0"><table>
<thead><tr><th scope="col">Rủi ro được bảo hiểm</th><th scope="col">Ý nghĩa với kho hàng</th></tr></thead>
<tbody>
<tr><td>(A) Cháy</td><td>Thuộc phần bắt buộc.</td></tr>
<tr><td>(B) Nổ</td><td>Thuộc phần bắt buộc.</td></tr>
<tr><td>(C) Máy bay và phương tiện hàng không khác rơi vào</td><td>Rủi ro hiếm nhưng thiệt hại lớn.</td></tr>
<tr><td>(E) Nổi loạn, bạo động, đình công, bế xưởng</td><td>Thiệt hại tài sản do các sự kiện này.</td></tr>
<tr><td>(N) Giông, bão, lũ lụt</td><td>Quan trọng với kho mái tôn, kho ở vùng trũng dễ ngập.</td></tr>
<tr><td>(P) Vỡ hay tràn nước từ bể chứa, thiết bị chứa nước, đường ống</td><td>Hàng hóa hư hỏng do nước, không phải do cháy.</td></tr>
<tr><td>(Q) Đâm va</td><td>Xe nâng, xe container va vào kết cấu kho.</td></tr>
<tr><td>(S) Nước thoát ra hay rò rỉ từ hệ thống phòng cháy tự động</td><td>Cần thiết với kho có sprinkler.</td></tr>
</tbody></table></div>

<h2 id="sprinkler">Vì sao kho có sprinkler nên có rủi ro S và điều khoản rò rỉ nước?</h2>
<p>Hệ thống chữa cháy tự động sprinkler và báo cháy tự động giúp phát hiện, khống chế đám cháy sớm, nhưng chính hệ thống này có thể gây thiệt hại khi đầu phun vỡ, đường ống rò rỉ hoặc kích hoạt ngoài ý muốn. Hàng bao, thùng carton ngấm nước là tổn thất không nhỏ.</p>
<p>Vì vậy bảng chào phí có rủi ro S và thêm Điều khoản bảo hiểm cho rò rỉ nước từ hệ thống chữa cháy tự động, giới hạn 10% số tiền bảo hiểm mỗi vụ tổn thất và cả thời hạn bảo hiểm. Khi mua bảo hiểm cho kho có sprinkler, nên kiểm tra hợp đồng có hai mục này.</p>
${photo('duong-ong-chua-chay', 1000, 750, 'Đường ống chữa cháy sơn đỏ chạy dọc tường nhà kho, cạnh cửa cuốn và xe tải đang đỗ', 'đường ống chữa cháy sơn đỏ dọc tường nhà kho, tháng 10/2026')}

<h2 id="phi">Phí bảo hiểm và mức khấu trừ của kho 56 tỷ đồng</h2>
<p>Số liệu trên bảng chào phí, thời hạn bảo hiểm 1 năm từ 31/10/2026. Tỷ lệ phí của mỗi kho khác nhau tùy phân loại rủi ro, hệ thống phòng cháy chữa cháy và phạm vi mở rộng.</p>
<div class="kb-table" role="region" aria-label="Phí và mức khấu trừ" tabindex="0"><table>
<thead><tr><th scope="col">Mục</th><th scope="col">Giá trị trên bảng chào phí</th></tr></thead>
<tbody>
<tr><td>Số tiền bảo hiểm (tổn thất vật chất)</td><td>56.000.000.000 đồng</td></tr>
<tr><td>Tỷ lệ phí năm</td><td>0,2%</td></tr>
<tr><td>Phí bảo hiểm</td><td>112.000.000 đồng</td></tr>
<tr><td>Thuế GTGT</td><td>11.200.000 đồng</td></tr>
<tr><td>Tổng phí bảo hiểm</td><td>123.200.000 đồng</td></tr>
<tr><td>Mức khấu trừ phần cháy, nổ bắt buộc</td><td>40.000.000 đồng mỗi vụ</td></tr>
<tr><td>Mức khấu trừ các rủi ro khác</td><td>20.000.000 đồng mỗi vụ</td></tr>
<tr><td>Thanh toán</td><td>2 lần: trong 30 ngày và trong 90 ngày kể từ ngày hiệu lực</td></tr>
</tbody></table></div>
${photo('bang-chao-phi-trang-2', 1200, 1697, 'Trang 2 bảng chào phí: danh sách rủi ro, thời hạn, số tiền bảo hiểm, tỷ lệ phí, phí, thuế và mức khấu trừ', 'trang 2 bảng chào phí bảo hiểm cháy nổ bắt buộc mở rộng rủi ro khác, cấp tháng 10/2026')}

<h2 id="dieu-khoan">Các điều khoản bổ sung đáng chú ý</h2>
<ul>
<li>Chi phí chữa cháy và chi phí chữa cháy chuyên nghiệp: mỗi loại giới hạn 10% số tiền bảo hiểm.</li>
<li>Chi phí ngăn ngừa và hạn chế tổn thất; chi phí dọn dẹp hiện trường: giới hạn 10% số tiền bảo hiểm.</li>
<li>Tạm ứng bồi thường: tới 50% tổn thất ước tính, giúp kho có tiền khôi phục sớm.</li>
<li>Tự động bảo hiểm cho tài sản bổ sung và điều chỉnh số tiền bảo hiểm do biến động giá: giới hạn 10% số tiền bảo hiểm, hữu ích khi lượng hàng tồn thay đổi.</li>
<li>Cháy lan từ cơ sở hoặc nhà bên cạnh: giới hạn 10% số tiền bảo hiểm mỗi vụ và cả thời hạn.</li>
<li>Di chuyển nội bộ: giới hạn 10% số tiền bảo hiểm.</li>
<li>Bảo hiểm dưới giá trị: khai thấp hơn giá trị thực thì bồi thường có thể bị tính theo tỷ lệ.</li>
<li>Các loại trừ: chiến tranh, khủng bố, cấm vận, năng lượng hạt nhân, ô nhiễm, bệnh truyền nhiễm, tổn thất do tin tặc.</li>
</ul>
${photo('bang-chao-phi-trang-3', 1200, 1697, 'Trang 3 bảng chào phí: danh sách điều khoản bổ sung và giới hạn trách nhiệm', 'trang 3 bảng chào phí, danh sách điều khoản bổ sung')}
${photo('bang-chao-phi-trang-1', 1200, 1697, 'Trang 1 bảng chào phí, phần thông tin người được bảo hiểm và địa điểm đã được che', 'trang 1 bảng chào phí; tên, địa chỉ, số chứng từ của khách hàng đã được che')}

<h2 id="chuan-bi">Chủ kho cần chuẩn bị gì để được báo phí?</h2>
<ol class="kb-steps">
<li><b>Thông tin kho.</b> Địa chỉ, ngành nghề, giấy phép kinh doanh.</li>
<li><b>Danh sách tài sản và giá trị.</b> Nhà kho, máy móc thiết bị, hàng tồn bình quân và tối đa.</li>
<li><b>Kết cấu kho.</b> Khung thép, mái tôn, tường, diện tích, số tầng, cách xếp hàng.</li>
<li><b>Hồ sơ phòng cháy chữa cháy.</b> Sprinkler, báo cháy tự động, họng nước, bình chữa cháy.</li>
<li><b>Lịch sử tổn thất.</b> Các năm trước và bảo hiểm đang có nếu tái tục.</li>
</ol>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Nhận chào phí cho kho của bạn</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> thông tin kho và hồ sơ phòng cháy chữa cháy. PVI Thành Đô khảo sát và gửi bảng chào phí trước khi bạn quyết định.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
