// Chiến dịch SEO cháy nổ bắt buộc, ngày 2 bài 2/5.
// Nhóm E2: "nghị định 23 bảo hiểm cháy nổ" và biến thể (6 từ, 130 lượt/tháng). Người dùng vẫn tìm văn bản đã hết hiệu lực.
// Căn cứ: docs/chay-no-50-bai/CN07 (Điều 77 NĐ 67/2023, Điều 44 NĐ 105/2025, đã đối chiếu bản gốc).
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const post = {
  slug: 'nghi-dinh-23-2018-bao-hiem-chay-no-het-hieu-luc',
  date: '2026-11-14',
  dateText: '14/11/2026',
  cat: 'Pháp lý · Cháy nổ bắt buộc',
  title: 'Nghị định 23/2018 về bảo hiểm cháy nổ đã hết hiệu lực: nay áp dụng văn bản nào?',
  lead: 'Nghị định 23/2018/NĐ-CP và Nghị định 97/2021/NĐ-CP sửa đổi nó đã hết hiệu lực từ khi Nghị định 67/2023/NĐ-CP có hiệu lực. Bảo hiểm cháy nổ bắt buộc hiện áp dụng Chương III Nghị định 67/2023 đã sửa đổi, cùng Điều 35, Phụ lục VI, VII Nghị định 105/2025.',
  image: '/assets/kho-bang-chao-phi-trang-1.webp',
  alt: 'Trang 1 bảng chào phí bảo hiểm cháy nổ bắt buộc, thông tin khách hàng đã được che',
  readMin: 5,
};

export const crumb = 'Pháp lý cháy nổ';
export const hero = { name: 'kho-bang-chao-phi-trang-1', w: 1200, h: 1697, position: '50% 30%', caption: 'Ảnh thực tế: bảng chào phí cháy nổ bắt buộc năm 2026 dẫn căn cứ Nghị định 67/2023 và Nghị định 105/2025; thông tin khách đã che.' };
export const seo = {
  title: 'Nghị định 23/2018 bảo hiểm cháy nổ hết hiệu lực: dùng văn bản nào? | PVI',
  description: 'Nghị định 23/2018 và 97/2021 về bảo hiểm cháy nổ bắt buộc đã hết hiệu lực. Văn bản đang áp dụng: NĐ 67/2023, NĐ 105/2025, NĐ 347/2026. Bảng đối chiếu cũ, mới.',
};

export const toc = [
  ['het-hieu-luc', 'Hết hiệu lực từ khi nào'],
  ['dang-ap-dung', 'Văn bản đang áp dụng'],
  ['khac-gi', 'Cũ và mới khác gì'],
  ['viec-can-lam', 'Việc cần làm'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Nghị định 23/2018 về bảo hiểm cháy nổ còn hiệu lực không?', answer: 'Không. Nghị định 23/2018/NĐ-CP và Nghị định 97/2021/NĐ-CP hết hiệu lực từ khi Nghị định 67/2023/NĐ-CP có hiệu lực (Điều 77 khoản 2 điểm b Nghị định 67/2023). Nghị định 67/2023 có hiệu lực từ ngày ký 06/9/2023.' },
  { question: 'Văn bản nào thay Nghị định 23/2018?', answer: 'Phần bảo hiểm cháy, nổ bắt buộc nay nằm ở Chương III Nghị định 67/2023/NĐ-CP, đã được Điều 44 Nghị định 105/2025/NĐ-CP sửa đổi. Danh mục cơ sở phải mua và biểu phí theo Phụ lục VII, VI Nghị định 105/2025.' },
  { question: 'Biểu phí theo Nghị định 23 còn dùng được không?', answer: 'Không. Biểu phí hiện hành là Phụ lục VI Nghị định 105/2025, thay Phụ lục II Nghị định 67/2023. Cơ chế tăng giảm phí tối đa 25% cũng đã bị bãi bỏ.' },
  { question: 'Nghị định 105/2025 có thay Nghị định 67/2023 không?', answer: 'Không thay toàn bộ. Nghị định 105/2025 sửa đổi một số điều của Nghị định 67/2023; Nghị định 67/2023 vẫn còn hiệu lực với các điều đã sửa.' },
  { question: 'Hợp đồng cũ ký theo quy định trước đây thì sao?', answer: 'Nên rà lại với doanh nghiệp bảo hiểm khi tái tục, vì danh mục và phí đã theo Phụ lục VI, VII mới. Điều 46 Nghị định 105/2025 không có khoản chuyển tiếp riêng cho hợp đồng bảo hiểm.' },
];

export const sources = [
  ['Nghị định 67/2023/NĐ-CP, Điều 77 (hiệu lực, văn bản hết hiệu lực)', 'https://congbao.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 105/2025/NĐ-CP, Điều 35, Điều 44, Điều 46, Phụ lục VI, VII', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 347/2026/NĐ-CP', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Bảo hiểm cháy nổ bắt buộc: căn cứ pháp lý và biểu phí', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Căn cứ Nghị định 105/2025 và biểu phí Phụ lục VI hiện hành.' },
  { href: '/tin-tuc/quy-dinh-mua-bao-hiem-chay-no-bat-buoc/', img: 'kho-duong-ong-chua-chay', w: 1000, h: 750, k: 'Cùng cụm', title: 'Quy định mua bảo hiểm cháy nổ bắt buộc 2026', text: '7 quy định đang áp dụng.' },
];

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> Nghị định 23/2018/NĐ-CP về <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> đã hết hiệu lực, cùng Nghị định 97/2021 sửa đổi nó. Hiện áp dụng Chương III Nghị định 67/2023/NĐ-CP (đã sửa bởi Nghị định 105/2025), Điều 35 và Phụ lục VI, VII Nghị định 105/2025, và từ 15/09/2026 thêm Nghị định 347/2026.</p>

<h2 id="het-hieu-luc">Nghị định 23/2018 hết hiệu lực từ khi nào?</h2>
<p>Điều 77 khoản 2 điểm b Nghị định 67/2023/NĐ-CP quy định Nghị định 23/2018/NĐ-CP (ngày 23/02/2018) và Nghị định 97/2021/NĐ-CP (ngày 08/11/2021) hết hiệu lực từ khi Nghị định 67/2023 có hiệu lực. Nghị định 67/2023 có hiệu lực từ ngày ký 06/9/2023 (Điều 77 khoản 1).</p>
<p>Vì vậy báo phí, hợp đồng hay bài viết năm 2026 mà còn dẫn "Nghị định 23" là đã cũ.</p>

<h2 id="dang-ap-dung">Văn bản đang áp dụng cho bảo hiểm cháy nổ bắt buộc</h2>
<div class="kb-table" role="region" aria-label="Văn bản đang áp dụng" tabindex="0"><table>
<thead><tr><th scope="col">Văn bản</th><th scope="col">Phần liên quan</th></tr></thead>
<tbody>
<tr><td>Nghị định 67/2023/NĐ-CP</td><td>Chương III (Điều 23 đến 31): đối tượng, số tiền bảo hiểm, phạm vi, loại trừ, phí, giấy chứng nhận, bồi thường</td></tr>
<tr><td>Nghị định 105/2025/NĐ-CP (hiệu lực 01/07/2025)</td><td>Điều 35, Phụ lục VII (44 loại cơ sở), Phụ lục VI (phí, khấu trừ); Điều 44 sửa Nghị định 67</td></tr>
<tr><td>Nghị định 347/2026/NĐ-CP (hiệu lực 15/09/2026)</td><td>Sửa điều kiện hồ sơ PCCC, đối tượng bảo hiểm, cách tính phí nhiều công trình</td></tr>
<tr><td>Nghị định 106/2025/NĐ-CP, Nghị định 69/2026/NĐ-CP</td><td>Xử phạt vi phạm về bảo hiểm cháy, nổ bắt buộc</td></tr>
</tbody></table></div>
<p>Toàn văn phần căn cứ hiện hành xem tại <a class="kb-link" href="${CHAY_NO}#can-cu">căn cứ pháp lý Nghị định 105/2025</a>.</p>

<h2 id="khac-gi">Quy định mới khác thế hệ Nghị định 23 ở những điểm nào?</h2>
<ul>
<li><b>Biểu phí mới.</b> Phụ lục VI Nghị định 105/2025 thay Phụ lục II Nghị định 67/2023. Tra tại <a class="kb-link" href="${CHAY_NO}#bieu-phi">biểu phí bảo hiểm cháy nổ bắt buộc</a>.</li>
<li><b>Bỏ cơ chế tăng giảm 25%.</b> Tỷ lệ phí không được thấp hơn mức tối thiểu (Điều 44 khoản 1 điểm d Nghị định 105/2025).</li>
<li><b>Danh mục 44 loại cơ sở</b> tại Phụ lục VII, kèm ngưỡng tầng, diện tích, khối tích.</li>
<li><b>Đối tượng là toàn bộ tài sản:</b> nhà, công trình, máy móc thiết bị, hàng hóa vật tư.</li>
<li><b>Hồ sơ bồi thường</b> dùng "biên bản kiểm tra về phòng cháy, chữa cháy" thay cho "biên bản kiểm tra an toàn về phòng cháy, chữa cháy".</li>
</ul>

<h2 id="viec-can-lam">Đang có hợp đồng cũ, cần làm gì?</h2>
<ol class="kb-steps">
<li><b>Xem căn cứ ghi trên hợp đồng, giấy chứng nhận.</b> Còn dẫn Nghị định 23/2018 hay 97/2021 thì đánh dấu để rà khi tái tục.</li>
<li><b>Đối chiếu dòng phí mới.</b> Tỷ lệ phí hợp đồng phải không thấp hơn Phụ lục VI.</li>
<li><b>Rà danh mục tài sản.</b> Bổ sung máy móc, hàng hóa nếu hợp đồng cũ chỉ có nhà xưởng.</li>
<li><b>Cập nhật hồ sơ PCCC.</b> Lưu giấy chứng nhận mới trong hồ sơ PCCC tối thiểu 05 năm.</li>
</ol>
<p>Xem thêm <a class="kb-link" href="/tin-tuc/quy-dinh-mua-bao-hiem-chay-no-bat-buoc/">quy định mua bảo hiểm cháy nổ bắt buộc 2026</a>.</p>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Rà hợp đồng cháy nổ theo quy định mới</h2>
<p>Gửi ảnh hợp đồng hoặc giấy chứng nhận đang có qua <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a>. PVI Thành Đô đối chiếu với Phụ lục VI, VII và báo phí tái tục.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
