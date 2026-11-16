// Chiến dịch SEO cháy nổ bắt buộc, ngày 3 bài 4/5.
// Nhóm K: "bảo hiểm cháy nổ nhà ở", "nhà tư nhân", "bảo hiểm cháy nổ tự nguyện", "bảo hiểm cháy nổ và các rủi ro đặc biệt".
// Rủi ro A đến S theo bảng chào phí thật (bài kho sprinkler) và Quy tắc bảo hiểm cháy và các rủi ro đặc biệt (QĐ 283/QĐ-PVIBH 13/04/2015).
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const post = {
  slug: 'bao-hiem-chay-no-nha-o-tu-nguyen',
  date: '2026-11-15',
  dateText: '15/11/2026',
  cat: 'Cháy nổ · Tự nguyện',
  title: 'Bảo hiểm cháy nổ nhà ở và bảo hiểm tự nguyện: khi nào bắt buộc, khi nào nên mua thêm',
  lead: 'Nhà ở riêng lẻ không có trong danh mục phải mua bảo hiểm cháy nổ bắt buộc, trừ nhà ở kết hợp sản xuất, kinh doanh có phần kinh doanh từ 200 m². Chủ nhà và doanh nghiệp vẫn có thể mua tự nguyện, và mở rộng thêm giông bão, lũ lụt, nước tràn theo Quy tắc bảo hiểm cháy và các rủi ro đặc biệt của PVI.',
  image: '/assets/chay-no.webp',
  alt: 'Nhân viên kiểm tra bình chữa cháy cạnh tủ chữa cháy vách tường',
  readMin: 5,
};

export const crumb = 'Cháy nổ · Tự nguyện';
export const hero = { name: 'chay-no', w: 1280, h: 853, position: '50% 50%', caption: 'Ảnh minh họa: kiểm tra phương tiện chữa cháy.' };
export const seo = {
  title: 'Bảo hiểm cháy nổ nhà ở: bắt buộc hay tự nguyện, mở rộng gì | PVI',
  description: 'Nhà ở có phải mua bảo hiểm cháy nổ bắt buộc không? Khi nào thuộc diện (mục 44), bảo hiểm cháy nổ tự nguyện và các rủi ro đặc biệt: bão lũ, nước tràn, đâm va.',
};

export const toc = [
  ['nha-o', 'Nhà ở có bắt buộc không'],
  ['tu-nguyen', 'Bảo hiểm tự nguyện là gì'],
  ['rui-ro', 'Các rủi ro mở rộng'],
  ['ai-nen-mua', 'Ai nên mua thêm'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Nhà ở riêng có phải mua bảo hiểm cháy nổ bắt buộc không?', answer: 'Nhà ở thông thường không có trong Phụ lục VII Nghị định 105/2025. Nhà ở kết hợp sản xuất, kinh doanh có tổng diện tích phục vụ sản xuất, kinh doanh từ 200 m² thì phải mua (mục 44).' },
  { question: 'Bảo hiểm cháy nổ tự nguyện khác bắt buộc thế nào?', answer: 'Bắt buộc theo luật, chỉ bảo vệ rủi ro cháy, nổ, phí sàn theo Phụ lục VI. Tự nguyện do bên mua chọn, có thể mở rộng thêm giông bão, lũ lụt, nước tràn, đâm va, trộm cắp theo quy tắc của doanh nghiệp bảo hiểm.' },
  { question: 'Bảo hiểm cháy và các rủi ro đặc biệt gồm những rủi ro nào?', answer: 'Theo Quy tắc bảo hiểm cháy và các rủi ro đặc biệt của PVI, ngoài cháy, nổ có thể chọn thêm các rủi ro như máy bay rơi; nổi loạn, bạo động, đình công; giông, bão, lũ lụt; vỡ hay tràn nước từ bể, đường ống; đâm va; nước rò rỉ từ hệ thống chữa cháy tự động.' },
  { question: 'Cơ sở đã mua bắt buộc có mua thêm tự nguyện được không?', answer: 'Được, trong cùng hợp đồng. Phần bảo hiểm bắt buộc phải được tách riêng trong hợp đồng (Điều 4 khoản 3 Nghị định 67/2023), phần mở rộng tính phí bổ sung.' },
  { question: 'Nhà ở có bảo hiểm động đất không?', answer: 'Bảo hiểm cháy nổ bắt buộc loại trừ động đất. Với căn hộ chung cư, Quy tắc Mọi rủi ro căn hộ chung cư của PVI có động đất trong phạm vi; với nhà ở khác, hỏi chuyên viên phạm vi cụ thể.' },
];

export const sources = [
  ['Nghị định 105/2025/NĐ-CP, Điều 35, Phụ lục VII mục 44', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 67/2023/NĐ-CP, Điều 4 khoản 3, Điều 25', 'https://congbao.chinhphu.vn/', 'Chính phủ'],
  ['Quy tắc bảo hiểm cháy và các rủi ro đặc biệt (Quyết định 283/QĐ-PVIBH ngày 13/04/2015)', 'https://pvihcm.com/', 'Tổng công ty Bảo hiểm PVI'],
  ['Bảo hiểm cháy nổ bắt buộc và ba lớp bảo vệ tài sản', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'So sánh ba lớp: bắt buộc, cháy và rủi ro đặc biệt, mọi rủi ro.' },
  { href: '/tin-tuc/mua-bao-hiem-chay-no-can-ho-chung-cu/', img: 'chay-no', k: 'Cùng cụm', title: 'Bảo hiểm cháy nổ cho căn hộ chung cư', text: 'Phần riêng căn hộ nên mua tự nguyện.' },
];

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> nhà ở thông thường không thuộc diện <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a>. Ngoại lệ là nhà ở kết hợp sản xuất, kinh doanh có phần kinh doanh từ 200 m² (mục 44 Phụ lục VII Nghị định 105/2025). Ngoài diện bắt buộc, chủ nhà và doanh nghiệp được khuyến khích mua tự nguyện, và có thể mở rộng rủi ro.</p>

<h2 id="nha-o">Nhà ở có bắt buộc mua bảo hiểm cháy nổ không?</h2>
<ul>
<li><b>Nhà ở riêng lẻ chỉ để ở:</b> không có trong Phụ lục VII, không bắt buộc.</li>
<li><b>Nhà ở kết hợp sản xuất, kinh doanh:</b> bắt buộc khi tổng diện tích phục vụ sản xuất, kinh doanh từ 200 m² (mục 44). Tỷ lệ phí theo dòng tương ứng trong <a class="kb-link" href="${CHAY_NO}#bieu-phi">biểu phí bảo hiểm cháy nổ bắt buộc</a>, loại khấu trừ N.</li>
<li><b>Nhà ở kinh doanh ngành đặc thù</b> (khí đốt trên 500 kg, karaoke từ 2 tầng...) xét theo mục riêng của ngành.</li>
</ul>
<p>Không chắc thuộc mục nào, tra tại <a class="kb-link" href="${CHAY_NO}#tra-cuu">công cụ tra cứu cơ sở phải mua</a>.</p>

<h2 id="tu-nguyen">Bảo hiểm cháy nổ tự nguyện là gì?</h2>
<p>Là bảo hiểm tài sản bên mua tự chọn, không do luật buộc. Bảo hiểm cháy nổ bắt buộc chỉ bảo vệ rủi ro cháy, nổ và loại trừ nhiều trường hợp như động đất, thiết bị điện hỏng do quá tải, đoản mạch (Điều 25 Nghị định 67/2023). Bảo hiểm tự nguyện lấp các khoảng trống đó theo quy tắc của doanh nghiệp bảo hiểm.</p>

<h2 id="rui-ro">Các rủi ro có thể mở rộng</h2>
<p>Theo Quy tắc bảo hiểm cháy và các rủi ro đặc biệt của PVI (Quyết định 283/QĐ-PVIBH ngày 13/04/2015), một bảng chào phí kho thực tế năm 2026 gồm các rủi ro:</p>
<div class="kb-table" role="region" aria-label="Rủi ro mở rộng" tabindex="0"><table>
<thead><tr><th scope="col">Mã</th><th scope="col">Rủi ro</th><th scope="col">Bắt buộc hay mở rộng</th></tr></thead>
<tbody>
<tr><td>A, B</td><td>Cháy; nổ</td><td>Bắt buộc</td></tr>
<tr><td>C</td><td>Máy bay và phương tiện hàng không rơi vào</td><td>Mở rộng</td></tr>
<tr><td>E</td><td>Nổi loạn, bạo động, đình công, bế xưởng</td><td>Mở rộng</td></tr>
<tr><td>N</td><td>Giông, bão, lũ lụt</td><td>Mở rộng</td></tr>
<tr><td>P</td><td>Vỡ hay tràn nước từ bể chứa, đường ống</td><td>Mở rộng</td></tr>
<tr><td>Q</td><td>Đâm va</td><td>Mở rộng</td></tr>
<tr><td>S</td><td>Nước rò rỉ từ hệ thống phòng cháy tự động</td><td>Mở rộng</td></tr>
</tbody></table></div>
<p>Khi mua chung một hợp đồng, phần bắt buộc phải được tách riêng (Điều 4 khoản 3 Nghị định 67/2023). Xem ví dụ đầy đủ ở <a class="kb-link" href="/tin-tuc/bao-hiem-chay-no-kho-hang-sprinkler-thuc-te/">bảng chào phí kho có sprinkler</a>.</p>

<h2 id="ai-nen-mua">Ai nên mua thêm bảo hiểm tự nguyện?</h2>
<ol class="kb-steps">
<li><b>Nhà, kho ở vùng trũng dễ ngập:</b> rủi ro N (giông, bão, lũ lụt).</li>
<li><b>Cơ sở có sprinkler:</b> rủi ro S và điều khoản rò rỉ nước từ hệ thống chữa cháy tự động.</li>
<li><b>Kho có xe nâng, xe container ra vào:</b> rủi ro Q (đâm va).</li>
<li><b>Chủ căn hộ chung cư:</b> bảo hiểm căn hộ cho nội thất, đồ đạc, xem <a class="kb-link" href="/tin-tuc/mua-bao-hiem-chay-no-can-ho-chung-cu/">bảo hiểm cháy nổ căn hộ chung cư</a>.</li>
<li><b>Nhà ở, cửa hàng ngoài diện bắt buộc</b> nhưng có tài sản giá trị lớn.</li>
</ol>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Chọn phạm vi phù hợp cho nhà, cơ sở của bạn</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> loại nhà, khu vực, tài sản cần bảo vệ. PVI Thành Đô gợi ý phần bắt buộc, phần mở rộng và báo phí từng phần.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
