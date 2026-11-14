// Chiến dịch SEO cháy nổ bắt buộc, ngày 2 bài 4/5.
// Nhóm C (bài con căn hộ): "mua bảo hiểm cháy nổ cho căn hộ chung cư", "bảo hiểm cháy nổ căn hộ", "bảo hiểm cháy nổ chung cư có bắt buộc không", "mua bảo hiểm cháy nổ nhà chung cư ở đâu".
// Quy tắc Mọi rủi ro căn hộ chung cư PVI 2016: DA_XAC_MINH tài liệu PVI trong docs/chay-no-50-bai/CN16; cần hỏi phiên bản đang bán.
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const post = {
  slug: 'mua-bao-hiem-chay-no-can-ho-chung-cu',
  date: '2026-11-14',
  dateText: '14/11/2026',
  cat: 'Cháy nổ · Căn hộ',
  title: 'Mua bảo hiểm cháy nổ cho căn hộ chung cư: bắt buộc hay tự nguyện, bảo vệ được gì?',
  lead: 'Bảo hiểm cháy nổ bắt buộc mua cho cả tòa chung cư, không đặt nghĩa vụ riêng cho từng căn hộ. Nội thất, đồ đạc và phần cải tạo bên trong căn hộ của bạn chỉ được bảo vệ khi mua thêm bảo hiểm tự nguyện, ví dụ Quy tắc Mọi rủi ro căn hộ chung cư của PVI.',
  image: '/assets/chay-no.webp',
  alt: 'Nhân viên kiểm tra bình chữa cháy cạnh tủ chữa cháy vách tường',
  readMin: 5,
};

export const crumb = 'Cháy nổ · Căn hộ';
export const hero = { name: 'chay-no', w: 1280, h: 853, position: '50% 50%', caption: 'Ảnh minh họa: kiểm tra phương tiện chữa cháy trong tòa nhà.' };
export const seo = {
  title: 'Bảo hiểm cháy nổ căn hộ chung cư: bắt buộc hay tự nguyện? | PVI',
  description: 'Căn hộ chung cư có phải mua bảo hiểm cháy nổ bắt buộc không? Phần chung do tòa nhà mua, phần riêng căn hộ nên mua tự nguyện. Phạm vi, số tiền bảo hiểm, nơi mua.',
};

export const toc = [
  ['bat-buoc', 'Có bắt buộc với căn hộ không'],
  ['khoang-trong', 'Khoảng trống của cư dân'],
  ['tu-nguyen', 'Bảo hiểm tự nguyện cho căn hộ'],
  ['so-tien', 'Khai số tiền bảo hiểm'],
  ['mua-o-dau', 'Mua ở đâu'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Căn hộ chung cư có bắt buộc mua bảo hiểm cháy nổ không?', answer: 'Phụ lục VII Nghị định 105/2025 xác định "cơ sở" là chung cư cao từ 5 tầng hoặc sàn từ 1.000 m² phải mua, không đặt nghĩa vụ riêng cho từng căn hộ. Việc phân chia giữa chủ đầu tư, ban quản trị và chủ sở hữu theo quy chế quản lý nhà chung cư.' },
  { question: 'Tòa nhà đã mua bảo hiểm cháy nổ thì đồ trong căn hộ có được bồi thường không?', answer: 'Không chắc. Hợp đồng của tòa nhà bảo hiểm tài sản được kê khai trong hợp đồng đó. Nội thất, đồ đạc của cư dân thường không nằm trong danh mục, nên cần bảo hiểm tự nguyện cho căn hộ.' },
  { question: 'Bảo hiểm căn hộ chung cư của PVI bảo vệ những rủi ro nào?', answer: 'Theo Quy tắc Mọi rủi ro căn hộ chung cư của PVI (hiệu lực 05/12/2016): cháy, nổ, sét đánh trực tiếp; giông, bão, lốc; nước tràn từ bể chứa, đường ống, hệ thống chữa cháy tự động; trộm cướp có dấu hiệu đột nhập hoặc bạo lực; động đất. Hỏi chuyên viên phiên bản quy tắc đang bán.' },
  { question: 'Khai số tiền bảo hiểm căn hộ thấp có sao không?', answer: 'Theo quy tắc trên, nếu số tiền bảo hiểm nhỏ hơn 85% giá trị thay thế mới, người được bảo hiểm tự chịu một phần tổn thất theo tỷ lệ. Nên khai đúng giá trị tài sản.' },
  { question: 'Căn hộ bỏ trống có được bảo hiểm không?', answer: 'Quy tắc có loại trừ, ví dụ thiệt hại khi căn hộ bị bỏ trống từ 15 ngày liên tục hoặc đang sửa chữa, cải tạo. Báo trước cho doanh nghiệp bảo hiểm nếu đi vắng dài ngày hoặc sửa nhà.' },
];

export const sources = [
  ['Nghị định 105/2025/NĐ-CP, Điều 35, Phụ lục VII mục 1', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Quy tắc Mọi rủi ro căn hộ chung cư (hiệu lực 05/12/2016)', 'https://pvihcm.com/', 'Tổng công ty Bảo hiểm PVI'],
  ['Bảo hiểm cháy nổ bắt buộc: tra cứu và tính phí', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: '/tin-tuc/bao-hiem-chay-no-bat-buoc-chung-cu/', img: 'chay-no', k: 'Bài chính', title: 'Bảo hiểm cháy nổ chung cư', text: 'Chung cư nào bắt buộc, ai mua, phí bao nhiêu.' },
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Phần bảo hiểm bắt buộc của tòa nhà.' },
];

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> mua cho cả tòa chung cư (Phụ lục VII mục 1 Nghị định 105/2025), không bắt từng căn hộ phải mua riêng. Muốn nội thất, đồ đạc trong căn hộ được bồi thường khi cháy, nước tràn hay trộm, cư dân nên mua thêm bảo hiểm tự nguyện cho căn hộ.</p>

<h2 id="bat-buoc">Căn hộ có bắt buộc mua bảo hiểm cháy nổ không?</h2>
<p>Nghĩa vụ đặt cho "cơ sở": chung cư, nhà ở tập thể cao từ 5 tầng hoặc có tổng diện tích sàn từ 1.000 m². Theo nguồn tổng hợp về quy chế quản lý nhà chung cư kèm Thông tư 05/2024/TT-BXD, chủ đầu tư mua trong thời gian chưa chuyển quyền sở hữu; sau đó việc mua cho phần chung theo quy chế và quyết định của Hội nghị nhà chung cư. Chi tiết phí xem <a class="kb-link" href="/tin-tuc/phi-bao-hiem-chay-no-chung-cu/">phí bảo hiểm cháy nổ chung cư</a>.</p>

<h2 id="khoang-trong">Khoảng trống cư dân hay bỏ qua</h2>
<p>Hợp đồng bắt buộc của tòa nhà bảo hiểm tài sản được kê khai trong hợp đồng đó. Những thứ thường <b>không</b> nằm trong danh mục:</p>
<ul>
<li>Nội thất, tủ bếp, sàn gỗ, trần thạch cao bạn tự làm thêm.</li>
<li>Đồ điện tử, đồ gia dụng, tài sản cá nhân.</li>
<li>Thiệt hại do nước từ căn hộ tầng trên tràn xuống, hay do sprinkler kích hoạt.</li>
</ul>
<p>Bảo hiểm cháy nổ bắt buộc cũng chỉ bảo vệ rủi ro cháy, nổ; giông bão, nước tràn, trộm cắp không thuộc phạm vi bắt buộc.</p>

<h2 id="tu-nguyen">Bảo hiểm tự nguyện cho căn hộ bảo vệ những gì?</h2>
<p>Quy tắc Mọi rủi ro căn hộ chung cư của PVI (hiệu lực 05/12/2016) có phạm vi:</p>
<div class="kb-table" role="region" aria-label="Phạm vi bảo hiểm căn hộ" tabindex="0"><table>
<thead><tr><th scope="col">Rủi ro</th><th scope="col">Ví dụ với căn hộ</th></tr></thead>
<tbody>
<tr><td>Cháy, nổ, sét đánh trực tiếp</td><td>Chập điện bếp gây cháy nội thất</td></tr>
<tr><td>Giông, bão, lốc</td><td>Kính ban công vỡ, nước mưa hắt vào</td></tr>
<tr><td>Nước tràn từ bể chứa, đường ống, hệ thống chữa cháy tự động</td><td>Ống nước căn trên vỡ, sprinkler kích hoạt</td></tr>
<tr><td>Trộm cướp có dấu hiệu đột nhập hoặc bạo lực</td><td>Phá khóa cửa lấy tài sản</td></tr>
<tr><td>Động đất</td><td></td></tr>
</tbody></table></div>
<p>Quy tắc có thể không còn là phiên bản đang bán; hỏi chuyên viên phạm vi và loại trừ hiện hành trước khi mua.</p>

<h2 id="so-tien">Khai số tiền bảo hiểm cho căn hộ</h2>
<p>Số tiền bảo hiểm là tổng giá trị tài sản được bảo hiểm theo giá trị thực tế. Nếu khai nhỏ hơn 85% giá trị thay thế mới, người được bảo hiểm tự chịu một phần tổn thất theo tỷ lệ. Lưu ý loại trừ: thiệt hại khi căn hộ bỏ trống từ 15 ngày liên tục hoặc đang sửa chữa, cải tạo.</p>

<h2 id="mua-o-dau">Mua bảo hiểm căn hộ ở đâu?</h2>
<p>Tại doanh nghiệp bảo hiểm được phép, như PVI Thành Đô ở TP.HCM. Gửi diện tích căn hộ, danh sách nội thất, đồ đạc chính và giá trị ước tính để nhận báo phí. Xem các bước tương tự trong <a class="kb-link" href="/tin-tuc/mua-bao-hiem-chay-no-bat-buoc-o-dau/">mua bảo hiểm cháy nổ bắt buộc ở đâu</a>.</p>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Báo phí bảo hiểm cho căn hộ của bạn</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> diện tích căn hộ và giá trị nội thất, đồ đạc. PVI Thành Đô gửi phạm vi, phí và các loại trừ cần biết.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
