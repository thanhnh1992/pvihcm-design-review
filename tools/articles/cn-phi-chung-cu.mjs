// Chiến dịch SEO cháy nổ bắt buộc, ngày 2 bài 3/5.
// Nhóm C (bài con về phí): "phí bảo hiểm cháy nổ chung cư", "giá bảo hiểm cháy nổ chung cư", "mức phí bảo hiểm cháy nổ chung cư", "bảo hiểm cháy nổ chung cư bao nhiêu".
// Căn cứ: Phụ lục VI dòng 2.1, 2.2 (tariff-data.js); quy trình ban quản trị theo docs/chay-no-50-bai/CN17 (phần kinh phí ghi rõ chưa xác minh).
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const post = {
  slug: 'phi-bao-hiem-chay-no-chung-cu',
  date: '2026-11-14',
  dateText: '14/11/2026',
  cat: 'Cháy nổ bắt buộc · Chung cư',
  title: 'Phí bảo hiểm cháy nổ chung cư bao nhiêu? Cách tính cho chủ đầu tư và ban quản trị',
  lead: 'Phí bảo hiểm cháy nổ bắt buộc của chung cư bằng số tiền bảo hiểm phần tài sản của tòa nhà nhân 0,05% mỗi năm nếu có hệ thống chữa cháy tự động, hoặc 0,1% nếu không, cộng VAT. Tòa nhà có số tiền bảo hiểm 50 tỷ đồng, có sprinkler, đóng khoảng 27,5 triệu đồng một năm.',
  image: '/assets/section-chay-no.webp',
  alt: 'Chuyên viên khảo sát tủ báo cháy và đường ống chữa cháy',
  readMin: 5,
};

export const crumb = 'Cháy nổ bắt buộc';
export const hero = { name: 'section-chay-no', w: 1280, h: 853, position: '50% 45%', caption: 'Ảnh minh họa: kiểm tra hệ thống báo cháy, chữa cháy, yếu tố quyết định tỷ lệ phí của chung cư.' };
export const seo = {
  title: 'Phí bảo hiểm cháy nổ chung cư: 0,05% hay 0,1%, ví dụ tính | PVI',
  description: 'Phí bảo hiểm cháy nổ chung cư = số tiền bảo hiểm × 0,05% (có sprinkler) hoặc 0,1%/năm + VAT. Bảng ví dụ 20, 50, 100 tỷ và 5 bước ban quản trị xin báo phí.',
};

export const toc = [
  ['cong-thuc', 'Công thức và tỷ lệ'],
  ['vi-du', 'Bảng ví dụ'],
  ['so-tien', 'Số tiền bảo hiểm gồm gì'],
  ['quy-trinh', '5 bước xin báo phí'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Phí bảo hiểm cháy nổ chung cư bao nhiêu một năm?', answer: 'Số tiền bảo hiểm × 0,05% nếu tòa nhà có hệ thống chữa cháy tự động, hoặc × 0,1% nếu không (Phụ lục VI dòng 2.1, 2.2 Nghị định 105/2025), cộng VAT. Ví dụ 50 tỷ đồng, có sprinkler: 25 triệu đồng, tổng 27,5 triệu đồng có VAT 10%.' },
  { question: 'Vì sao chung cư không có sprinkler đóng phí gấp đôi?', answer: 'Phụ lục VI tách chung cư thành hai dòng theo việc có hay không hệ thống chữa cháy tự động: 0,05% và 0,1%. Khai thiếu thông tin hệ thống là bị áp mức cao hơn.' },
  { question: 'Mỗi căn hộ phải đóng bao nhiêu tiền bảo hiểm cháy nổ?', answer: 'Không có mức cố định cho từng căn. Phí tính cho cả tòa nhà theo số tiền bảo hiểm; cách chia cho chủ sở hữu theo quy chế và quyết định của Hội nghị nhà chung cư, cần hỏi ban quản trị.' },
  { question: 'Phí bảo hiểm cháy nổ có nằm trong phí quản lý không?', answer: 'Theo Quy chế quản lý, sử dụng nhà chung cư kèm Thông tư 05/2024/TT-BXD (nguồn tổng hợp), giá dịch vụ quản lý vận hành không bao gồm kinh phí mua bảo hiểm cháy, nổ. Đây là khoản tách riêng.' },
  { question: 'Mức khấu trừ của chung cư là bao nhiêu?', answer: 'Chung cư thuộc loại khấu trừ M: tối đa 1% số tiền bảo hiểm và không thấp hơn mức tối thiểu theo bậc số tiền bảo hiểm tại Mục II Phụ lục VI.' },
];

export const sources = [
  ['Nghị định 105/2025/NĐ-CP, Phụ lục VI dòng 2.1, 2.2; Phụ lục VII mục 1', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 67/2023/NĐ-CP, Điều 23, Điều 24', 'https://congbao.chinhphu.vn/', 'Chính phủ'],
  ['Quy chế quản lý, sử dụng nhà chung cư kèm Thông tư 05/2024/TT-BXD (nguồn tổng hợp)', 'https://vanban.chinhphu.vn/', 'Bộ Xây dựng'],
  ['Bộ tính phí bảo hiểm cháy nổ bắt buộc', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: '/tin-tuc/bao-hiem-chay-no-bat-buoc-chung-cu/', img: 'chay-no', k: 'Bài chính', title: 'Bảo hiểm cháy nổ chung cư', text: 'Chung cư nào bắt buộc, ai mua, phần riêng căn hộ.' },
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Tính phí chung cư có và không có sprinkler.' },
];

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> phí <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> của chung cư = số tiền bảo hiểm × <b>0,05%</b> (có hệ thống chữa cháy tự động) hoặc × <b>0,1%</b> (không có), cộng VAT. Đây là mức tối thiểu tại Phụ lục VI Nghị định 105/2025; không có mức giảm thấp hơn.</p>

<h2 id="cong-thuc">Công thức và tỷ lệ phí của chung cư</h2>
<div class="kb-table" role="region" aria-label="Tỷ lệ phí chung cư" tabindex="0"><table>
<thead><tr><th scope="col">Phụ lục VI</th><th scope="col">Loại hình</th><th scope="col">Khấu trừ</th><th scope="col">Tỷ lệ/năm</th></tr></thead>
<tbody>
<tr><td>2.1</td><td>Chung cư, nhà ở tập thể, nhà đa năng, hỗn hợp có hệ thống chữa cháy tự động</td><td>M</td><td>0,05%</td></tr>
<tr><td>2.2</td><td>Nhóm trên, không có hệ thống chữa cháy tự động</td><td>M</td><td>0,1%</td></tr>
</tbody></table></div>

<h2 id="vi-du">Bảng ví dụ phí chung cư</h2>
<p>VAT tính 10%. Số tiền bảo hiểm là ví dụ để so sánh, số thật theo giá trị tài sản của tòa nhà.</p>
<div class="kb-table" role="region" aria-label="Ví dụ phí chung cư" tabindex="0"><table>
<thead><tr><th scope="col">Số tiền bảo hiểm</th><th scope="col">Có sprinkler (0,05%)</th><th scope="col">Không sprinkler (0,1%)</th></tr></thead>
<tbody>
<tr><td>20 tỷ</td><td>10 triệu + VAT = 11 triệu</td><td>20 triệu + VAT = 22 triệu</td></tr>
<tr><td>50 tỷ</td><td>25 triệu + VAT = 27,5 triệu</td><td>50 triệu + VAT = 55 triệu</td></tr>
<tr><td>100 tỷ</td><td>50 triệu + VAT = 55 triệu</td><td>100 triệu + VAT = 110 triệu</td></tr>
</tbody></table></div>
<p>Muốn ra số cho tòa nhà cụ thể, dùng <a class="kb-link" href="${CHAY_NO}#tra-cuu">bộ tính phí bảo hiểm cháy nổ</a>, chọn dòng chung cư phù hợp.</p>

<h2 id="so-tien">Số tiền bảo hiểm của chung cư gồm những gì?</h2>
<p>Đối tượng bảo hiểm là toàn bộ tài sản của cơ sở (Điều 23 Nghị định 67/2023). Với tòa chung cư, danh mục thường gồm kết cấu tòa nhà, hệ thống kỹ thuật (thang máy, máy phát, trạm bơm, hệ thống PCCC), tài sản phần sở hữu chung. Số tiền bảo hiểm tối thiểu là giá trị theo giá thị trường; không xác định được thì thỏa thuận theo giá trị còn lại hoặc giá trị thay thế (Điều 24).</p>
<p>Khai thấp số tiền bảo hiểm làm phí thấp nhưng bồi thường tối đa cũng thấp theo, và có rủi ro bị xử phạt vì mua không đủ đối tượng.</p>

<h2 id="quy-trinh">5 bước chủ đầu tư, ban quản trị xin báo phí</h2>
<ol class="kb-steps">
<li><b>Xác định tòa nhà thuộc diện.</b> Cao từ 5 tầng hoặc sàn từ 1.000 m² (Phụ lục VII mục 1).</li>
<li><b>Xác định bên mua.</b> Theo nguồn tổng hợp, chủ đầu tư mua khi chưa chuyển quyền sở hữu; sau đó đối chiếu quy chế và quyết định của Hội nghị nhà chung cư.</li>
<li><b>Lập danh mục tài sản và giá trị.</b> Kết cấu, hệ thống kỹ thuật, tài sản phần chung.</li>
<li><b>Ghi rõ hệ thống chữa cháy tự động.</b> Gửi kèm hồ sơ để được áp dòng 0,05%.</li>
<li><b>Nhận báo phí, thông qua, ký hợp đồng.</b> Lưu giấy chứng nhận trong hồ sơ PCCC tối thiểu 05 năm.</li>
</ol>
<p>Cách thu kinh phí từ chủ sở hữu theo quy chế và nghị quyết Hội nghị nhà chung cư; PVI Thành Đô chưa đối chiếu văn bản gốc nên không hướng dẫn mức thu. Cư dân muốn bảo vệ tài sản trong căn hộ, đọc <a class="kb-link" href="/tin-tuc/mua-bao-hiem-chay-no-can-ho-chung-cu/">mua bảo hiểm cháy nổ cho căn hộ chung cư</a>.</p>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Báo phí cho tòa chung cư</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> số tầng, diện tích sàn, danh mục tài sản và tình trạng hệ thống chữa cháy tự động. PVI Thành Đô gửi báo phí để ban quản trị trình Hội nghị nhà chung cư.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
