// Chiến dịch SEO cháy nổ bắt buộc, bài 5/5 ngày 1.
// Từ khóa chính: "bảo hiểm cháy nổ chung cư" (260/tháng), "bảo hiểm cháy nổ bắt buộc chung cư" (140); nhóm C 23 từ, 910 lượt.
// Căn cứ: Phụ lục VII mục 1, Phụ lục VI dòng 2.1, 2.2, Phụ lục II NĐ 105/2025 (đối chiếu bản gốc trong docs/chay-no-50-bai/CN16 của baohiempvi-vn).
// Phần trách nhiệm chủ đầu tư theo Thông tư 05/2024/TT-BXD: nguồn tổng hợp, chưa đối chiếu bản gốc, nên ghi rõ trong bài.
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const post = {
  slug: 'bao-hiem-chay-no-bat-buoc-chung-cu',
  date: '2026-11-13',
  dateText: '13/11/2026',
  cat: 'Cháy nổ bắt buộc · Chung cư',
  title: 'Bảo hiểm cháy nổ chung cư: chung cư nào bắt buộc, ai mua, phí bao nhiêu',
  lead: 'Chung cư, nhà ở tập thể cao từ 5 tầng hoặc có tổng diện tích sàn từ 1.000 m² phải mua bảo hiểm cháy nổ bắt buộc. Phí tối thiểu 0,05% mỗi năm nếu có hệ thống chữa cháy tự động, 0,1% nếu không. Căn hộ riêng của cư dân là chuyện khác: bảo hiểm tự nguyện.',
  image: '/assets/chay-no.webp',
  alt: 'Nhân viên kiểm tra bình chữa cháy cạnh tủ chữa cháy vách tường',
  readMin: 6,
};

export const crumb = 'Cháy nổ bắt buộc';
export const hero = { name: 'chay-no', w: 1280, h: 853, position: '50% 50%', caption: 'Ảnh minh họa: kiểm tra phương tiện chữa cháy, một phần hồ sơ khi mua bảo hiểm cháy nổ bắt buộc.' };
export const seo = {
  title: 'Bảo hiểm cháy nổ chung cư: có bắt buộc không, phí bao nhiêu | PVI',
  description: 'Chung cư từ 5 tầng hoặc sàn từ 1.000 m² phải mua bảo hiểm cháy nổ bắt buộc. Phí 0,05% (có sprinkler) hoặc 0,1%/năm. Phần chung, phần riêng căn hộ và ai mua.',
};

export const toc = [
  ['bat-buoc', 'Chung cư nào bắt buộc'],
  ['phi', 'Phí bao nhiêu'],
  ['ai-mua', 'Ai đứng ra mua'],
  ['can-ho', 'Căn hộ của cư dân'],
  ['nhom', 'Nhóm 1, nhóm 2'],
  ['sai-lam', 'Sai lầm hay gặp'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Bảo hiểm cháy nổ chung cư có bắt buộc không?', answer: 'Bắt buộc với chung cư, nhà ở tập thể cao từ 5 tầng trở lên hoặc có tổng diện tích sàn từ 1.000 m² (Phụ lục VII mục 1 Nghị định 105/2025). Chỉ cần đạt một trong hai điều kiện.' },
  { question: 'Chung cư mini có phải mua bảo hiểm cháy nổ bắt buộc không?', answer: 'Có, nếu cao từ 5 tầng hoặc có tổng diện tích sàn từ 1.000 m². Tên gọi "mini" không làm thay đổi nghĩa vụ.' },
  { question: 'Phí bảo hiểm cháy nổ chung cư bao nhiêu?', answer: 'Tối thiểu 0,05% số tiền bảo hiểm mỗi năm nếu có hệ thống chữa cháy tự động, 0,1% nếu không, chưa gồm VAT. Ví dụ số tiền bảo hiểm 20 tỷ đồng, có sprinkler: phí 10 triệu đồng, tổng 11 triệu đồng có VAT.' },
  { question: 'Chủ căn hộ có phải tự mua bảo hiểm cháy nổ bắt buộc không?', answer: 'Phụ lục VII xác định "cơ sở" là chung cư phải mua, không đặt nghĩa vụ riêng cho từng căn hộ. Việc phân chia giữa chủ đầu tư, ban quản trị và chủ sở hữu theo quy chế quản lý nhà chung cư. Để bảo vệ tài sản trong căn hộ, cư dân nên mua thêm bảo hiểm tự nguyện.' },
  { question: 'Phí quản lý chung cư đã gồm bảo hiểm cháy nổ chưa?', answer: 'Theo quy chế quản lý, sử dụng nhà chung cư kèm Thông tư 05/2024/TT-BXD (nguồn tổng hợp), giá dịch vụ quản lý vận hành không bao gồm kinh phí mua bảo hiểm cháy, nổ. Đây là khoản tách riêng; nên hỏi ban quản trị cách thu.' },
];

export const sources = [
  ['Nghị định 105/2025/NĐ-CP, Phụ lục VII mục 1, Phụ lục VI dòng 2.1 và 2.2, Phụ lục II', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 67/2023/NĐ-CP, Chương III', 'https://congbao.chinhphu.vn/', 'Chính phủ'],
  ['Quy chế quản lý, sử dụng nhà chung cư kèm Thông tư 05/2024/TT-BXD, Điều 30, Điều 40 (nguồn tổng hợp, chưa đối chiếu bản gốc)', 'https://vanban.chinhphu.vn/', 'Bộ Xây dựng'],
  ['Bảo hiểm cháy nổ bắt buộc: tra cứu và tính phí', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Tra mục 1 Phụ lục VII và tính phí chung cư có, không có sprinkler.' },
  { href: '/tin-tuc/chay-can-ho-chung-cu-happy-valley-bao-hiem-chay-no/', img: 'chay-happy-valley-hien-truong', w: 1200, h: 630, k: 'Tình huống', title: 'Cháy căn hộ chung cư: bảo hiểm nào chi trả', text: 'Phần chung, phần riêng và bảo hiểm căn hộ tự nguyện.' },
];

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> chung cư, nhà ở tập thể cao từ 5 tầng <b>hoặc</b> có tổng diện tích sàn từ 1.000 m² phải mua <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> (Phụ lục VII mục 1 Nghị định 105/2025/NĐ-CP). Phí tối thiểu 0,05% mỗi năm nếu tòa nhà có hệ thống chữa cháy tự động, 0,1% nếu không.</p>

<h2 id="bat-buoc">Chung cư nào bắt buộc mua bảo hiểm cháy nổ?</h2>
<p>Chỉ cần đạt <b>một trong hai</b> điều kiện:</p>
<ul>
<li>Cao từ 5 tầng trở lên; hoặc</li>
<li>Tổng diện tích sàn từ 1.000 m² trở lên.</li>
</ul>
<p>Một tòa 4 tầng nhưng sàn 1.200 m² vẫn thuộc diện. Chung cư mini, nhà ở tập thể, nhà đa năng hoặc hỗn hợp cũng được xét theo cùng ngưỡng. Kiểm tra nhanh tại <a class="kb-link" href="${CHAY_NO}#tra-cuu">công cụ tra cứu cơ sở phải mua bảo hiểm cháy nổ</a>.</p>

<h2 id="phi">Phí bảo hiểm cháy nổ chung cư bao nhiêu?</h2>
<div class="kb-table" role="region" aria-label="Tỷ lệ phí chung cư" tabindex="0"><table>
<thead><tr><th scope="col">Phụ lục VI</th><th scope="col">Loại hình</th><th scope="col">Khấu trừ</th><th scope="col">Tỷ lệ/năm</th></tr></thead>
<tbody>
<tr><td>2.1</td><td>Chung cư, nhà ở tập thể, nhà đa năng hoặc hỗn hợp có hệ thống chữa cháy tự động</td><td>M</td><td>0,05%</td></tr>
<tr><td>2.2</td><td>Nhóm trên, không có hệ thống chữa cháy tự động</td><td>M</td><td>0,1%</td></tr>
</tbody></table></div>
<p><b>Ví dụ:</b> số tiền bảo hiểm 20 tỷ đồng, có sprinkler: phí 10 triệu đồng, VAT 1 triệu đồng, tổng 11 triệu đồng mỗi năm. Cùng tòa nhà đó không có sprinkler: tổng 22 triệu đồng. Xem thêm <a class="kb-link" href="/tin-tuc/bao-hiem-chay-no-bat-buoc-bao-nhieu-tien/">bảo hiểm cháy nổ bắt buộc bao nhiêu tiền</a> cho 7 loại cơ sở.</p>
<p>Mức khấu trừ loại M: tối đa 1% số tiền bảo hiểm và không thấp hơn mức tối thiểu theo bậc số tiền bảo hiểm.</p>

<h2 id="ai-mua">Ai đứng ra mua cho tòa nhà?</h2>
<p>Theo quy chế quản lý, sử dụng nhà chung cư kèm Thông tư 05/2024/TT-BXD (nguồn tổng hợp, PVI Thành Đô chưa đối chiếu bản gốc):</p>
<ul>
<li>Chủ đầu tư có trách nhiệm mua bảo hiểm cháy, nổ bắt buộc trong thời gian chưa chuyển quyền sở hữu cho chủ sở hữu nhà chung cư.</li>
<li>Giá dịch vụ quản lý vận hành không bao gồm kinh phí mua bảo hiểm cháy, nổ: đây là khoản tách riêng.</li>
</ul>
<p>Sau khi bàn giao, ban quản trị thường là đầu mối làm việc với doanh nghiệp bảo hiểm. Cách thu kinh phí từ cư dân cần thông qua theo quy chế của tòa nhà.</p>

<h2 id="can-ho">Căn hộ của cư dân được bảo vệ thế nào?</h2>
<p>Bảo hiểm cháy nổ bắt buộc mua theo "cơ sở" là cả tòa nhà. Đồ đạc, nội thất, phần cải tạo bên trong căn hộ của bạn nên được bảo vệ bằng bảo hiểm tự nguyện. Quy tắc Mọi rủi ro căn hộ chung cư của PVI (hiệu lực 05/12/2016) có phạm vi gồm cháy, nổ, sét đánh trực tiếp; giông, bão, lốc; nước tràn từ bể chứa, đường ống, hệ thống chữa cháy tự động; trộm cướp có dấu hiệu đột nhập; động đất. Hỏi chuyên viên phiên bản quy tắc đang bán trước khi mua.</p>

<h2 id="nhom">Chung cư nhóm 1, nhóm 2 khác gì?</h2>
<p>Theo Phụ lục II Nghị định 105/2025: nhóm 1 là chung cư cao từ 7 tầng hoặc sàn từ 3.000 m²; nhóm 2 là từ 5 đến dưới 7 tầng hoặc sàn từ 1.000 đến dưới 3.000 m². Nhóm ảnh hưởng chu kỳ kiểm tra PCCC và mức xử phạt khi vi phạm, không đổi tỷ lệ phí bảo hiểm.</p>

<h2 id="sai-lam">3 sai lầm hay gặp</h2>
<ol class="kb-steps">
<li><b>Chỉ nhớ "5 tầng".</b> Quên điều kiện sàn từ 1.000 m², nên tòa thấp tầng nhưng rộng vẫn không mua.</li>
<li><b>Không khai hệ thống chữa cháy tự động.</b> Bị tính 0,1% thay vì 0,05%, đóng gấp đôi.</li>
<li><b>Nhầm bắt buộc với tự nguyện.</b> Tưởng tòa nhà đã mua thì căn hộ đã được bảo vệ đầy đủ.</li>
</ol>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Báo phí cho ban quản trị, chủ đầu tư</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> số tầng, diện tích sàn, có hay không hệ thống chữa cháy tự động. PVI Thành Đô gửi báo phí và tư vấn thêm bảo hiểm căn hộ cho cư dân.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
