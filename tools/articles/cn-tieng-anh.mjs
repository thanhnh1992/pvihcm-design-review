// Chiến dịch SEO cháy nổ bắt buộc, ngày 3 bài 5/5.
// Nhóm L: "bảo hiểm cháy nổ tiếng anh là gì", "bảo hiểm cháy nổ bắt buộc tiếng anh là gì", "bảo hiểm cháy nổ tiếng anh".
// Nghị định không quy định tên tiếng Anh chính thức; bài nêu thuật ngữ thông dụng trong ngành và ghi rõ điều này.
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const post = {
  slug: 'bao-hiem-chay-no-tieng-anh',
  date: '2026-11-15',
  dateText: '15/11/2026',
  cat: 'Cháy nổ · Thuật ngữ',
  title: 'Bảo hiểm cháy nổ tiếng Anh là gì? 15 thuật ngữ trong hợp đồng cho kế toán, doanh nghiệp FDI',
  lead: 'Bảo hiểm cháy nổ bắt buộc thường được dịch là Compulsory Fire and Explosion Insurance. Văn bản pháp luật Việt Nam không quy định tên tiếng Anh chính thức, nên khi làm việc với công ty mẹ ở nước ngoài, nên kèm tên tiếng Việt và số nghị định để tránh hiểu nhầm.',
  image: '/assets/kho-bang-chao-phi-trang-3.webp',
  alt: 'Trang bảng chào phí liệt kê điều khoản bổ sung và giới hạn trách nhiệm',
  readMin: 5,
};

export const crumb = 'Cháy nổ · Thuật ngữ';
export const hero = { name: 'kho-bang-chao-phi-trang-3', w: 1200, h: 1697, position: '50% 35%', caption: 'Ảnh thực tế: trang điều khoản bổ sung của một bảng chào phí cháy nổ năm 2026; thông tin khách đã che.' };
export const seo = {
  title: 'Bảo hiểm cháy nổ tiếng Anh là gì? 15 thuật ngữ hợp đồng | PVI',
  description: 'Bảo hiểm cháy nổ bắt buộc tiếng Anh: Compulsory Fire and Explosion Insurance. Bảng 15 thuật ngữ: sum insured, deductible, premium rate, certificate, fire and special perils.',
};

export const toc = [
  ['ten', 'Tên tiếng Anh'],
  ['thuat-ngu', '15 thuật ngữ'],
  ['luu-y', 'Lưu ý khi dịch'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Bảo hiểm cháy nổ bắt buộc tiếng Anh là gì?', answer: 'Cách dịch thông dụng là Compulsory Fire and Explosion Insurance. Nghị định 105/2025 và 67/2023 không quy định tên tiếng Anh chính thức, nên nên ghi kèm tên tiếng Việt và số nghị định.' },
  { question: 'Mức khấu trừ tiếng Anh là gì?', answer: 'Deductible, có khi gọi là excess. Đây là số tiền bên mua tự chịu trong mỗi vụ tổn thất.' },
  { question: 'Số tiền bảo hiểm tiếng Anh là gì?', answer: 'Sum insured. Với bảo hiểm cháy nổ bắt buộc, số tiền bảo hiểm tối thiểu là giá trị theo giá thị trường của tài sản tại thời điểm giao kết hợp đồng.' },
  { question: 'Bảo hiểm cháy và các rủi ro đặc biệt tiếng Anh là gì?', answer: 'Thường dịch là Fire and Special Perils Insurance. Đây là bảo hiểm tự nguyện, mở rộng thêm các rủi ro như bão lũ, nước tràn, đâm va ngoài cháy, nổ.' },
  { question: 'Công ty FDI có phải mua bảo hiểm cháy nổ bắt buộc tại Việt Nam không?', answer: 'Nghĩa vụ đặt cho cơ sở có tên trong Phụ lục VII Nghị định 105/2025, không phân biệt vốn trong nước hay nước ngoài. Bảo hiểm phải mua tại doanh nghiệp bảo hiểm được phép triển khai nghiệp vụ.' },
];

export const sources = [
  ['Nghị định 105/2025/NĐ-CP, Điều 35, Phụ lục VI, VII', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 67/2023/NĐ-CP, Điều 3, Điều 4, Chương III', 'https://congbao.chinhphu.vn/', 'Chính phủ'],
  ['Bảo hiểm cháy nổ bắt buộc: tra cứu và tính phí', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Tra cơ sở thuộc diện, biểu phí và tính phí.' },
  { href: '/tin-tuc/giay-chung-nhan-bao-hiem-chay-no-bat-buoc/', img: 'section-chay-no', k: 'Cùng cụm', title: 'Giấy chứng nhận bảo hiểm cháy nổ bắt buộc', text: '11 nội dung phải có trên giấy chứng nhận.' },
];

const r = (vi, en, note) => `<tr><td>${vi}</td><td lang="en">${en}</td><td>${note}</td></tr>`;

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> thường được dịch là <span lang="en"><b>Compulsory Fire and Explosion Insurance</b></span>. Đây là cách dịch thông dụng trong ngành; luật Việt Nam không quy định tên tiếng Anh chính thức.</p>

<h2 id="ten">Tên tiếng Anh của các loại bảo hiểm cháy</h2>
<ul>
<li><b>Bảo hiểm cháy, nổ bắt buộc:</b> <span lang="en">Compulsory Fire and Explosion Insurance</span>.</li>
<li><b>Bảo hiểm cháy và các rủi ro đặc biệt:</b> <span lang="en">Fire and Special Perils Insurance</span> (tự nguyện, mở rộng thêm rủi ro).</li>
<li><b>Bảo hiểm mọi rủi ro tài sản:</b> <span lang="en">Property All Risks Insurance</span>.</li>
</ul>

<h2 id="thuat-ngu">15 thuật ngữ hay gặp trong hợp đồng, báo phí</h2>
<div class="kb-table" role="region" aria-label="Thuật ngữ tiếng Anh" tabindex="0"><table>
<thead><tr><th scope="col">Tiếng Việt</th><th scope="col">Tiếng Anh thông dụng</th><th scope="col">Ghi chú</th></tr></thead>
<tbody>
${r('Bên mua bảo hiểm', 'Policyholder', 'Cơ sở thuộc diện bắt buộc')}
${r('Người được bảo hiểm', 'Insured', '')}
${r('Doanh nghiệp bảo hiểm', 'Insurer', 'Phải được phép triển khai nghiệp vụ')}
${r('Hợp đồng bảo hiểm', 'Insurance policy / contract', '')}
${r('Giấy chứng nhận bảo hiểm', 'Certificate of insurance', '11 nội dung theo Điều 27 NĐ 67/2023')}
${r('Số tiền bảo hiểm', 'Sum insured', 'Tối thiểu theo giá thị trường')}
${r('Tỷ lệ phí', 'Premium rate', 'Mức sàn theo Phụ lục VI')}
${r('Phí bảo hiểm', 'Premium', 'Chưa gồm VAT')}
${r('Mức khấu trừ', 'Deductible', 'Loại M tối đa 1%, loại N tối đa 10%')}
${r('Đối tượng bảo hiểm', 'Subject-matter insured', 'Toàn bộ tài sản của cơ sở')}
${r('Phạm vi bảo hiểm', 'Scope of cover', '')}
${r('Điều khoản loại trừ', 'Exclusions', 'Điều 25 NĐ 67/2023')}
${r('Sự kiện bảo hiểm', 'Insured event', '')}
${r('Giám định tổn thất', 'Loss survey / adjustment', '')}
${r('Bồi thường', 'Claim settlement / indemnity', '')}
</tbody></table></div>

<h2 id="luu-y">3 lưu ý khi dịch cho công ty mẹ, kiểm toán</h2>
<ol class="kb-steps">
<li><b>Ghi kèm tên tiếng Việt và căn cứ.</b> Ví dụ: <span lang="en">"Compulsory Fire and Explosion Insurance (bảo hiểm cháy, nổ bắt buộc) under Decree 105/2025/ND-CP and Decree 67/2023/ND-CP"</span>.</li>
<li><b>Phân biệt bắt buộc và mở rộng.</b> Phần bắt buộc chỉ cháy, nổ; bão lũ, nước tràn thuộc phần mở rộng, tách riêng trong hợp đồng.</li>
<li><b>Đừng dịch "mức khấu trừ" thành phần trăm tổn thất.</b> Đây là số tiền mỗi vụ theo bậc số tiền bảo hiểm, xem <a class="kb-link" href="/tin-tuc/muc-khau-tru-bao-hiem-chay-no-bat-buoc/">mức khấu trừ bảo hiểm cháy nổ bắt buộc</a>.</li>
</ol>
<p>Muốn tra tỷ lệ phí cho báo cáo ngân sách, dùng <a class="kb-link" href="${CHAY_NO}#bieu-phi">biểu phí bảo hiểm cháy nổ bắt buộc</a>.</p>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Cần báo phí kèm bản tóm tắt cho công ty mẹ?</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> thông tin cơ sở. PVI Thành Đô gửi báo phí và giải thích các thuật ngữ chính để bạn trình nội bộ.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
