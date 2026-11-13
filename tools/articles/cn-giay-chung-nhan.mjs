// Chiến dịch SEO cháy nổ bắt buộc, bài 2/5 ngày 10/11/2026.
// Từ khóa chính: "giấy chứng nhận bảo hiểm cháy nổ bắt buộc" (30/tháng).
// Căn cứ: Điều 27 Nghị định 67/2023; Điều 4 Nghị định 105/2025 (đối chiếu bản gốc trong docs/chay-no-50-bai/CN01 của baohiempvi-vn).
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const post = {
  slug: 'giay-chung-nhan-bao-hiem-chay-no-bat-buoc',
  date: '2026-11-13',
  dateText: '13/11/2026',
  cat: 'Cháy nổ bắt buộc · Hồ sơ',
  title: 'Giấy chứng nhận bảo hiểm cháy nổ bắt buộc: 11 nội dung phải có và cách lưu trong hồ sơ PCCC',
  lead: 'Giấy chứng nhận bảo hiểm cháy nổ bắt buộc do doanh nghiệp bảo hiểm cấp, phải đủ 11 nội dung theo Điều 27 Nghị định 67/2023 và là một thành phần của hồ sơ PCCC, lưu tối thiểu 05 năm. Đây là giấy đoàn kiểm tra PCCC hỏi đến đầu tiên khi kiểm tra phần bảo hiểm.',
  image: '/assets/section-chay-no.webp',
  alt: 'Chuyên viên khảo sát tủ báo cháy và đường ống chữa cháy trong kho hàng',
  readMin: 5,
};

export const crumb = 'Cháy nổ bắt buộc';
export const hero = { name: 'section-chay-no', w: 1280, h: 853, position: '50% 45%', caption: 'Ảnh minh họa: khảo sát hệ thống chữa cháy trước khi cấp hợp đồng bảo hiểm cháy nổ bắt buộc.' };
export const seo = {
  title: 'Giấy chứng nhận bảo hiểm cháy nổ bắt buộc: 11 nội dung | PVI',
  description: 'Giấy chứng nhận bảo hiểm cháy nổ bắt buộc gồm 11 nội dung theo Điều 27 NĐ 67/2023, là hồ sơ PCCC phải lưu 05 năm. Cách kiểm tra từng mục trước khi cất.',
};

export const toc = [
  ['la-gi', 'Giấy chứng nhận là gì'],
  ['noi-dung', '11 nội dung bắt buộc'],
  ['kiem-tra', 'Kiểm tra gì khi nhận'],
  ['luu-tru', 'Lưu trong hồ sơ PCCC'],
  ['khi-co-chay', 'Dùng khi có cháy'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Giấy chứng nhận bảo hiểm cháy nổ bắt buộc gồm những nội dung gì?', answer: 'Theo Điều 27 Nghị định 67/2023: thông tin bên mua và người được bảo hiểm; thông tin và đường dây nóng của doanh nghiệp bảo hiểm; tên cơ sở; địa điểm đối tượng bảo hiểm; tài sản được bảo hiểm; số tiền bảo hiểm; mức khấu trừ; thời hạn; tỷ lệ phí và phí; ngày cấp; mã số, mã vạch định danh.' },
  { question: 'Giấy chứng nhận bảo hiểm cháy nổ phải lưu bao lâu?', answer: 'Giấy chứng nhận là thành phần của hồ sơ PCCC của cơ sở phải mua bảo hiểm (Điều 4 khoản 1 điểm i Nghị định 105/2025) và được lưu trữ tối thiểu 05 năm kể từ năm lập, ban hành (Điều 4 khoản 4).' },
  { question: 'Giấy chứng nhận điện tử có giá trị không?', answer: 'Có. Doanh nghiệp bảo hiểm có thể cấp giấy chứng nhận điện tử; giấy chứng nhận điện tử phải tuân thủ Luật Giao dịch điện tử. Nên in hoặc lưu bản điện tử cùng hồ sơ PCCC để xuất trình khi kiểm tra.' },
  { question: 'Mất giấy chứng nhận bảo hiểm cháy nổ thì làm gì?', answer: 'Liên hệ doanh nghiệp bảo hiểm đã cấp để xin bản sao hoặc cấp lại theo số hợp đồng. Với hợp đồng tại PVI Thành Đô, nhắn Zalo 0938 072 236 kèm tên cơ sở và thời hạn bảo hiểm.' },
  { question: 'Thông tin trên giấy chứng nhận sai thì có ảnh hưởng bồi thường không?', answer: 'Có thể. Đối tượng bảo hiểm và địa điểm phải được ghi rõ trong hợp đồng và giấy chứng nhận (Điều 23 khoản 2 Nghị định 67/2023); số tiền bồi thường không vượt quá số tiền bảo hiểm ghi trên đó. Sai địa điểm, thiếu tài sản thì nên yêu cầu sửa đổi bổ sung ngay.' },
];

export const sources = [
  ['Nghị định 67/2023/NĐ-CP, Điều 23, Điều 27, Điều 29', 'https://congbao.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 105/2025/NĐ-CP, Điều 4 (hồ sơ PCCC)', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Bảo hiểm cháy nổ bắt buộc: tra cứu và tính phí', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Tra cơ sở thuộc diện phải mua, biểu phí Phụ lục VI và tính phí tham khảo.' },
  { href: '/tin-tuc/mua-bao-hiem-chay-no-bat-buoc-o-dau/', img: 'kho-kho-hang-toan-canh', w: 1200, h: 630, k: 'Cùng chủ đề', title: 'Mua bảo hiểm cháy nổ bắt buộc ở đâu', text: 'Giấy tờ cần chuẩn bị và 5 bước mua tại PVI Thành Đô.' },
];

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> giấy chứng nhận <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> là chứng từ doanh nghiệp bảo hiểm cấp cho bên mua, ghi đủ 11 nội dung theo Điều 27 Nghị định 67/2023/NĐ-CP. Giấy này nằm trong hồ sơ PCCC của cơ sở và phải lưu tối thiểu 05 năm.</p>

<h2 id="la-gi">Giấy chứng nhận bảo hiểm cháy nổ bắt buộc là gì?</h2>
<p>Khi cơ sở mua bảo hiểm cháy, nổ bắt buộc, doanh nghiệp bảo hiểm phải cấp giấy chứng nhận cho bên mua. Hợp đồng là văn bản thỏa thuận đầy đủ; giấy chứng nhận là bản tóm tắt những gì được bảo hiểm, ở đâu, bao nhiêu tiền và trong bao lâu. Cơ quan Công an khi kiểm tra PCCC thường đối chiếu giấy này với tài sản thực tế tại cơ sở.</p>

<h2 id="noi-dung">11 nội dung bắt buộc trên giấy chứng nhận</h2>
<div class="kb-table" role="region" aria-label="11 nội dung của giấy chứng nhận" tabindex="0"><table>
<thead><tr><th scope="col">#</th><th scope="col">Nội dung (Điều 27 Nghị định 67/2023)</th><th scope="col">Cần soát</th></tr></thead>
<tbody>
<tr><td>1</td><td>Tên, địa chỉ, số điện thoại bên mua và người được bảo hiểm</td><td>Khớp giấy đăng ký kinh doanh</td></tr>
<tr><td>2</td><td>Tên, địa chỉ, số điện thoại đường dây nóng của doanh nghiệp bảo hiểm</td><td>Số gọi khi có cháy</td></tr>
<tr><td>3</td><td>Tên cơ sở</td><td>Đúng tên trên hồ sơ PCCC</td></tr>
<tr><td>4</td><td>Địa điểm đối tượng bảo hiểm</td><td>Đủ mọi địa điểm có tài sản</td></tr>
<tr><td>5</td><td>Tài sản được bảo hiểm</td><td>Đủ nhà, máy móc, hàng hóa</td></tr>
<tr><td>6</td><td>Số tiền bảo hiểm</td><td>Không thấp hơn giá thị trường</td></tr>
<tr><td>7</td><td>Mức khấu trừ</td><td>Phần cơ sở tự chịu mỗi vụ</td></tr>
<tr><td>8</td><td>Thời hạn bảo hiểm</td><td>Ghi lịch tái tục</td></tr>
<tr><td>9</td><td>Tỷ lệ phí và phí bảo hiểm</td><td>Không thấp hơn Phụ lục VI</td></tr>
<tr><td>10</td><td>Ngày cấp</td><td></td></tr>
<tr><td>11</td><td>Mã số, mã vạch được đăng ký, quản lý để định danh</td><td>Dùng tra cứu, đối chiếu</td></tr>
</tbody></table></div>
<p>Tỷ lệ phí ghi trên giấy phải không thấp hơn mức tối thiểu của loại hình cơ sở tại Phụ lục VI Nghị định 105/2025. Bạn có thể tự đối chiếu dòng phí tại <a class="kb-link" href="${CHAY_NO}#bieu-phi">biểu phí bảo hiểm cháy nổ bắt buộc theo nhóm ngành</a>.</p>

<h2 id="kiem-tra">Nhận giấy chứng nhận, kiểm tra 4 điểm này trước khi cất</h2>
<ol class="kb-steps">
<li><b>Địa điểm.</b> Cơ sở có nhiều kho, nhiều nhà xưởng thì từng địa điểm phải được ghi rõ (Điều 23 khoản 2).</li>
<li><b>Danh mục tài sản.</b> Đối tượng bảo hiểm là toàn bộ tài sản của cơ sở: nhà, công trình, máy móc thiết bị, hàng hóa vật tư. Thiếu nhóm nào là rủi ro.</li>
<li><b>Số tiền bảo hiểm.</b> Số tiền bồi thường không vượt quá số tiền bảo hiểm đã ghi. Khai thấp để giảm phí thì bồi thường cũng thấp theo.</li>
<li><b>Mức khấu trừ.</b> Loại M tối đa 1%, loại N tối đa 10% số tiền bảo hiểm, có mức sàn bằng tiền theo bậc số tiền bảo hiểm.</li>
</ol>

<h2 id="luu-tru">Lưu giấy chứng nhận trong hồ sơ PCCC như thế nào?</h2>
<p>Điều 4 khoản 1 điểm i Nghị định 105/2025/NĐ-CP đưa giấy chứng nhận bảo hiểm cháy, nổ bắt buộc vào thành phần hồ sơ PCCC của cơ sở phải mua bảo hiểm. Khoản 4 cùng điều yêu cầu lưu tối thiểu 05 năm kể từ năm lập, ban hành.</p>
<p>Sai lầm hay gặp là giấy chứng nhận chỉ nằm ở phòng kế toán cùng hóa đơn. Khi đoàn kiểm tra đến, người phụ trách PCCC không xuất trình được. Cách đơn giản: một bản lưu trong hồ sơ PCCC, một bản ở kế toán, kèm bản điện tử.</p>

<h2 id="khi-co-chay">Giấy chứng nhận dùng thế nào khi có cháy?</h2>
<p>Khi xảy ra tổn thất, bên mua thông báo ngay cho doanh nghiệp bảo hiểm qua số đường dây nóng in trên giấy chứng nhận, sau đó thông báo bằng văn bản trong 14 ngày. Hợp đồng và giấy chứng nhận bảo hiểm là một trong 6 nhóm tài liệu của hồ sơ bồi thường (Điều 28, 29 Nghị định 67/2023). Với hợp đồng PVI, tổng đài bồi thường là <a href="tel:1900545458">1900 54 54 58</a>.</p>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Rà giấy chứng nhận đang có của cơ sở</h2>
<p>Gửi ảnh giấy chứng nhận hiện tại qua <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a>. PVI Thành Đô kiểm tra địa điểm, danh mục tài sản, tỷ lệ phí so với Phụ lục VI và báo phí tái tục.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
