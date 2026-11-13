// Chiến dịch SEO cháy nổ bắt buộc (chủ site giao 10/11/2026), bài 1/5 ngày 10/11/2026.
// Từ khóa chính: "mua bảo hiểm cháy nổ bắt buộc ở đâu" (110/tháng), phụ: "mua bảo hiểm cháy nổ bắt buộc" (90).
// Số liệu pháp lý lấy từ bộ bài đã đối chiếu bản gốc của baohiempvi-vn (docs/chay-no-50-bai/CN01), không gõ mới.
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const post = {
  slug: 'mua-bao-hiem-chay-no-bat-buoc-o-dau',
  date: '2026-11-13',
  dateText: '13/11/2026',
  cat: 'Cháy nổ bắt buộc · Hướng dẫn mua',
  title: 'Mua bảo hiểm cháy nổ bắt buộc ở đâu, cần giấy tờ gì và mất bao lâu?',
  lead: 'Bảo hiểm cháy nổ bắt buộc phải mua tại doanh nghiệp bảo hiểm được phép triển khai nghiệp vụ. Tại TP.HCM, chủ cơ sở có thể làm việc trực tiếp với Công ty Bảo hiểm PVI Thành Đô: gửi thông tin cơ sở, nhận báo phí, ký hợp đồng và nhận giấy chứng nhận để lưu vào hồ sơ PCCC.',
  image: '/assets/kho-kho-hang-toan-canh.webp',
  alt: 'Bên trong nhà kho mái tôn khung thép rộng, các kiện hàng xếp trên pallet',
  readMin: 6,
};

export const crumb = 'Cháy nổ bắt buộc';
export const hero = { name: 'kho-kho-hang-toan-canh', w: 1200, h: 630, position: '50% 55%', caption: 'Ảnh thực tế: kho hàng tại TP.HCM được PVI Thành Đô khảo sát trước khi báo phí, tháng 10/2026.' };
export const seo = {
  title: 'Mua bảo hiểm cháy nổ bắt buộc ở đâu? Giấy tờ và quy trình | PVI',
  description: 'Mua bảo hiểm cháy nổ bắt buộc tại doanh nghiệp bảo hiểm được phép. Giấy tờ cần chuẩn bị, 5 bước từ báo phí đến nhận giấy chứng nhận tại PVI Thành Đô TP.HCM.',
};

export const toc = [
  ['o-dau', 'Mua ở đâu thì hợp lệ'],
  ['giay-to', 'Giấy tờ cần chuẩn bị'],
  ['quy-trinh', '5 bước mua tại PVI Thành Đô'],
  ['dieu-kien', 'Điều kiện hồ sơ PCCC'],
  ['luu-y', 'Lưu ý trước khi ký'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Mua bảo hiểm cháy nổ bắt buộc ở đâu thì hợp lệ?', answer: 'Tại doanh nghiệp bảo hiểm được phép triển khai nghiệp vụ bảo hiểm theo quy định pháp luật (Điều 4 khoản 1 Nghị định 67/2023/NĐ-CP). Tổng công ty Bảo hiểm PVI và các công ty thành viên như PVI Thành Đô cấp hợp đồng và giấy chứng nhận bảo hiểm cháy, nổ bắt buộc.' },
  { question: 'Có mua bảo hiểm cháy nổ bắt buộc online được không?', answer: 'Có thể gửi thông tin, nhận báo phí và trao đổi qua Zalo hoặc email. Hợp đồng và giấy chứng nhận vẫn được lập theo hồ sơ của từng cơ sở; giấy chứng nhận điện tử phải tuân thủ Luật Giao dịch điện tử.' },
  { question: 'Mua bảo hiểm cháy nổ bắt buộc mất bao lâu?', answer: 'Phụ thuộc hồ sơ. Cơ sở có đủ thông tin tài sản và hồ sơ PCCC thường nhận báo phí nhanh; cơ sở lớn, nhiều hạng mục hoặc cần khảo sát hiện trường sẽ lâu hơn. Nên liên hệ trước ngày hết hạn hợp đồng cũ ít nhất vài tuần.' },
  { question: 'Doanh nghiệp bảo hiểm có được từ chối bán bảo hiểm cháy nổ bắt buộc không?', answer: 'Có trường hợp. Cơ sở thuộc diện phải thẩm định thiết kế về PCCC nhưng chưa đáp ứng điều kiện hồ sơ theo Điều 4 khoản 5 điểm b Nghị định 67/2023 (đã sửa đổi) thì doanh nghiệp bảo hiểm có căn cứ từ chối bán hoặc không bồi thường. Từ 15/09/2026, mốc xét là văn bản thẩm định thiết kế về PCCC.' },
  { question: 'Mua thêm rủi ro bão lũ trong cùng hợp đồng được không?', answer: 'Được. Bên mua và doanh nghiệp bảo hiểm thỏa thuận phí bổ sung cho phần mở rộng, nhưng phần bảo hiểm bắt buộc phải được tách riêng trong hợp đồng (Điều 4 khoản 3 Nghị định 67/2023).' },
];

export const sources = [
  ['Nghị định 67/2023/NĐ-CP, Điều 4, Điều 27 (đã sửa đổi bởi Nghị định 105/2025/NĐ-CP)', 'https://congbao.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 105/2025/NĐ-CP, Điều 4, Điều 35, Phụ lục VI, VII', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 347/2026/NĐ-CP (hiệu lực 15/09/2026)', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Bảo hiểm cháy nổ bắt buộc: tra cứu và tính phí', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Tra cơ sở thuộc diện phải mua, biểu phí Phụ lục VI và tính phí tham khảo.' },
  { href: '/tin-tuc/giay-chung-nhan-bao-hiem-chay-no-bat-buoc/', img: 'section-chay-no', k: 'Cùng chủ đề', title: 'Giấy chứng nhận bảo hiểm cháy nổ bắt buộc', text: '11 nội dung bắt buộc và cách lưu trong hồ sơ PCCC.' },
];

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> bạn mua <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> tại một doanh nghiệp bảo hiểm được phép triển khai nghiệp vụ, không mua qua bên trung gian không có tư cách. Ở TP.HCM, Công ty Bảo hiểm PVI Thành Đô nhận hồ sơ, khảo sát khi cần, báo phí và cấp giấy chứng nhận. Cả quá trình gồm 5 bước, phần lớn làm qua Zalo.</p>

<h2 id="o-dau">Mua bảo hiểm cháy nổ bắt buộc ở đâu thì hợp lệ?</h2>
<p>Điều 4 khoản 1 Nghị định 67/2023/NĐ-CP quy định bên mua là cơ sở thuộc diện bắt buộc và phải mua tại doanh nghiệp bảo hiểm được phép triển khai nghiệp vụ bảo hiểm theo quy định pháp luật. Cơ sở thuộc diện là cơ sở có tên trong danh mục Phụ lục VII Nghị định 105/2025/NĐ-CP (Điều 35 khoản 1).</p>
<p>Điều cần kiểm tra khi mua không phải là "mua ở đâu rẻ nhất" mà là ba thứ:</p>
<ul>
<li>Hợp đồng và giấy chứng nhận do chính doanh nghiệp bảo hiểm phát hành, có số điện thoại đường dây nóng của doanh nghiệp.</li>
<li>Tỷ lệ phí không thấp hơn mức tối thiểu tại Phụ lục VI. Mức "giảm phí 25%" kiểu cũ đã bị bãi bỏ (Điều 44 khoản 1 điểm d Nghị định 105/2025).</li>
<li>Danh mục tài sản đủ: nhà, công trình, máy móc thiết bị, hàng hóa vật tư. Thiếu tài sản thì vừa có rủi ro bị xử phạt, vừa bồi thường thiếu khi có cháy.</li>
</ul>
<p>Chưa chắc cơ sở có thuộc diện phải mua? Tra theo loại hình và quy mô tại <a class="kb-link" href="${CHAY_NO}#tra-cuu">công cụ tra cứu cơ sở phải mua bảo hiểm cháy nổ</a>.</p>

<h2 id="giay-to">Cần chuẩn bị giấy tờ gì để mua?</h2>
<p>Không có một bộ giấy tờ giống nhau cho mọi cơ sở. Bộ dưới đây đủ để PVI Thành Đô báo phí chính xác cho đa số văn phòng, kho, xưởng và chung cư:</p>
<div class="kb-table" role="region" aria-label="Giấy tờ cần chuẩn bị" tabindex="0"><table>
<thead><tr><th scope="col">Nhóm thông tin</th><th scope="col">Cụ thể</th></tr></thead>
<tbody>
<tr><td>Pháp lý cơ sở</td><td>Giấy đăng ký kinh doanh, tên và địa chỉ cơ sở, ngành nghề thực tế tại địa điểm</td></tr>
<tr><td>Quy mô công trình</td><td>Số tầng, tổng diện tích sàn, khối tích (với kho, xưởng hạng D, E), hạng nguy hiểm cháy nổ nếu có</td></tr>
<tr><td>Danh mục tài sản</td><td>Nhà xưởng, công trình; máy móc thiết bị; hàng hóa tồn kho bình quân và cao điểm, kèm giá trị</td></tr>
<tr><td>Hồ sơ PCCC</td><td>Văn bản thẩm duyệt hoặc thẩm định thiết kế, nghiệm thu (nếu có), biên bản kiểm tra gần nhất, hệ thống chữa cháy tự động</td></tr>
<tr><td>Bảo hiểm đang có</td><td>Hợp đồng cũ và lịch sử tổn thất nếu là tái tục</td></tr>
</tbody></table></div>
<p>Số tiền bảo hiểm tối thiểu là giá trị theo giá thị trường của tài sản tại thời điểm giao kết hợp đồng (Điều 24 khoản 1 Nghị định 67/2023). Vì vậy danh mục tài sản là phần quyết định phí, nên chuẩn bị kỹ nhất.</p>

<h2 id="quy-trinh">5 bước mua bảo hiểm cháy nổ bắt buộc tại PVI Thành Đô</h2>
<ol class="kb-steps">
<li><b>Gửi thông tin cơ sở.</b> Nhắn Zalo 0938 072 236 tên cơ sở, địa chỉ, loại hình, diện tích và danh mục tài sản sơ bộ.</li>
<li><b>Đối chiếu diện bắt buộc.</b> Chuyên viên kiểm tra cơ sở thuộc mục nào của Phụ lục VII và dòng phí nào của Phụ lục VI.</li>
<li><b>Khảo sát khi cần.</b> Với kho, xưởng, cơ sở nhiều hạng mục, PVI Thành Đô khảo sát kết cấu, cách xếp hàng và hệ thống PCCC.</li>
<li><b>Nhận báo phí và chọn phạm vi.</b> Báo phí ghi rõ số tiền bảo hiểm, tỷ lệ phí, mức khấu trừ; có thể mở rộng thêm bão lũ, nước tràn, sprinkler rò rỉ.</li>
<li><b>Ký hợp đồng, nhận giấy chứng nhận.</b> Thanh toán phí, nhận giấy chứng nhận và lưu vào hồ sơ PCCC tối thiểu 05 năm (Điều 4 khoản 4 Nghị định 105/2025).</li>
</ol>
<p>Muốn biết trước phí ước tính, dùng <a class="kb-link" href="${CHAY_NO}#tra-cuu">bộ tính phí bảo hiểm cháy nổ bắt buộc</a>: chọn loại cơ sở, nhập số tiền bảo hiểm, xem phí một năm đã gồm VAT.</p>

<h2 id="dieu-kien">Điều kiện hồ sơ PCCC: lý do hay bị chậm nhất</h2>
<p>Với cơ sở thuộc diện phải thẩm duyệt, thẩm định thiết kế về PCCC, Điều 4 khoản 5 điểm b Nghị định 67/2023 (đã sửa đổi) cho doanh nghiệp bảo hiểm căn cứ từ chối bán hoặc không bồi thường nếu cơ sở chưa đáp ứng điều kiện hồ sơ. Từ 15/09/2026, Nghị định 347/2026/NĐ-CP chuyển mốc xét sang "đã có văn bản thẩm định thiết kế về PCCC".</p>
<p>Nói cách khác: cơ sở đang chờ giấy tờ PCCC nên gửi kèm tình trạng hồ sơ ngay từ đầu, để chuyên viên báo trước có mua được không và cần bổ sung gì. Đọc thêm phần <a class="kb-link" href="${CHAY_NO}#can-cu">căn cứ pháp lý Nghị định 105/2025</a> trên trang sản phẩm.</p>

<h2 id="luu-y">Bốn lưu ý trước khi ký hợp đồng</h2>
<ul>
<li><b>Tách phần bắt buộc.</b> Khi mua thêm rủi ro, phần bảo hiểm bắt buộc phải được tách riêng trong hợp đồng (Điều 4 khoản 3 Nghị định 67/2023).</li>
<li><b>Kiểm tra mức khấu trừ.</b> Cơ sở loại M khấu trừ tối đa 1% số tiền bảo hiểm, loại N tối đa 10%, và không thấp hơn mức tối thiểu theo bậc số tiền bảo hiểm.</li>
<li><b>Khai đúng hệ thống chữa cháy tự động.</b> Chung cư, khách sạn có sprinkler áp tỷ lệ 0,05%, không có thì 0,1%. Khai thiếu là đóng phí cao hơn mức cần.</li>
<li><b>Báo khi tài sản thay đổi.</b> Thêm máy móc, chuyển kho, đổi tên cơ sở đều cần báo doanh nghiệp bảo hiểm để sửa đổi hợp đồng.</li>
</ul>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Mua bảo hiểm cháy nổ bắt buộc tại PVI Thành Đô</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> thông tin cơ sở và danh mục tài sản. Chuyên viên đối chiếu Phụ lục VI, VII và gửi báo phí trước khi bạn quyết định.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
