// Chiến dịch SEO cháy nổ bắt buộc, ngày 2 bài 1/5.
// Nhóm F: "cơ sở thuộc diện phải mua bảo hiểm cháy nổ", "đối tượng phải mua", "bảo hiểm cháy nổ bắt buộc là gì", "có bắt buộc không".
// Danh mục 44 mục tóm lược từ docs/chay-no-50-bai/CN03 (đã đối chiếu bản gốc Phụ lục VII NĐ 105/2025).
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const post = {
  slug: 'co-so-phai-mua-bao-hiem-chay-no-bat-buoc',
  date: '2026-11-14',
  dateText: '14/11/2026',
  cat: 'Cháy nổ bắt buộc · Đối tượng',
  title: 'Cơ sở nào phải mua bảo hiểm cháy nổ bắt buộc? Bảng tra 44 loại theo Phụ lục VII',
  lead: 'Bảo hiểm cháy nổ bắt buộc là bảo hiểm tài sản mà cơ sở có tên trong Phụ lục VII Nghị định 105/2025/NĐ-CP phải mua. Danh mục có 44 loại, nhiều loại kèm ngưỡng số tầng, diện tích sàn hoặc khối tích; đạt một điều kiện là thuộc diện.',
  image: '/assets/kho-san-kho-xe-container.webp',
  alt: 'Xe đầu kéo container đỗ ở lối vào nhà kho, sân bê tông rộng',
  readMin: 6,
};

export const crumb = 'Cháy nổ bắt buộc';
export const hero = { name: 'kho-san-kho-xe-container', w: 1000, h: 1333, position: '50% 45%', caption: 'Ảnh thực tế: lối xe container vào kho tại TP.HCM, biển số đã làm mờ. PVI Thành Đô khảo sát tháng 10/2026.' };
export const seo = {
  title: 'Cơ sở nào phải mua bảo hiểm cháy nổ bắt buộc? 44 loại | PVI',
  description: 'Bảo hiểm cháy nổ bắt buộc là gì, ai phải mua: bảng tra 44 loại cơ sở và ngưỡng tầng, diện tích theo Phụ lục VII Nghị định 105/2025. Cơ sở nào được miễn.',
};

export const toc = [
  ['la-gi', 'Bảo hiểm cháy nổ bắt buộc là gì'],
  ['nguyen-tac', 'Nguyên tắc xác định'],
  ['bang-tra', 'Bảng tra theo nhóm'],
  ['mien', 'Ai không phải mua'],
  ['cach-doc', 'Cách đọc đúng ngưỡng'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Bảo hiểm cháy nổ bắt buộc là gì?', answer: 'Là bảo hiểm tài sản mà pháp luật buộc cơ sở thuộc danh mục Phụ lục VII Nghị định 105/2025 phải mua tại doanh nghiệp bảo hiểm được phép. Bảo hiểm bồi thường thiệt hại tài sản do cháy, nổ; không bồi thường thương tật hay tử vong của con người.' },
  { question: 'Có bao nhiêu loại cơ sở phải mua bảo hiểm cháy nổ bắt buộc?', answer: '44 loại, liệt kê tại Phụ lục VII Nghị định 105/2025/NĐ-CP. Nhiều loại có ngưỡng về số tầng, diện tích sàn hoặc khối tích; một số loại như bệnh viện, cửa hàng xăng dầu, nhà máy điện không có ngưỡng.' },
  { question: 'Văn phòng công ty có phải mua bảo hiểm cháy nổ bắt buộc không?', answer: 'Có, nếu trụ sở, nhà làm việc của doanh nghiệp cao từ 3 tầng hoặc có tổng diện tích sàn từ 500 m² (mục 19 Phụ lục VII). Văn phòng thuê một phần tòa nhà thì cần xác định cơ sở là cả tòa nhà hay phần thuê.' },
  { question: 'Cửa hàng nhỏ có phải mua không?', answer: 'Tùy ngành và diện tích. Kinh doanh hàng hóa dễ cháy từ 200 m² sàn, dịch vụ ăn uống từ 300 m², chợ, siêu thị từ 300 m² là thuộc diện. Nhà ở kết hợp kinh doanh có phần kinh doanh từ 200 m² cũng phải mua.' },
  { question: 'Cơ sở không thuộc danh mục có nên mua không?', answer: 'Pháp luật khuyến khích. Cơ sở ngoài danh mục vẫn có thể mua bảo hiểm cháy và các rủi ro đặc biệt tự nguyện để bảo vệ tài sản.' },
];

export const sources = [
  ['Nghị định 105/2025/NĐ-CP, Điều 35, Phụ lục VII (44 loại cơ sở)', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 67/2023/NĐ-CP, Điều 4, Điều 23', 'https://congbao.chinhphu.vn/', 'Chính phủ'],
  ['Bảo hiểm cháy nổ bắt buộc: tra cứu cơ sở và tính phí', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Gõ tên ngành, tài sản để tra dòng Phụ lục VI và tính phí.' },
  { href: '/tin-tuc/quy-dinh-mua-bao-hiem-chay-no-bat-buoc/', img: 'kho-duong-ong-chua-chay', w: 1000, h: 750, k: 'Cùng cụm', title: 'Quy định mua bảo hiểm cháy nổ bắt buộc 2026', text: '7 quy định chủ cơ sở cần nắm.' },
];

const row = (stt, loai, nguong) => `<tr><td>${stt}</td><td>${loai}</td><td>${nguong}</td></tr>`;

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> là bảo hiểm tài sản mà cơ sở có tên trong Phụ lục VII Nghị định 105/2025/NĐ-CP phải mua (Điều 35 khoản 1). Danh mục có 44 loại. Cơ sở của Bộ Quốc phòng, Bộ Công an phục vụ quốc phòng, an ninh không thuộc diện; cơ sở khác ngoài danh mục được khuyến khích mua.</p>

<h2 id="la-gi">Bảo hiểm cháy nổ bắt buộc là gì?</h2>
<p>Là loại bảo hiểm tài sản pháp luật buộc một số cơ sở phải mua tại doanh nghiệp bảo hiểm được phép triển khai nghiệp vụ (Điều 4 khoản 1 Nghị định 67/2023). Đối tượng được bảo hiểm là toàn bộ tài sản của cơ sở: nhà, công trình, máy móc thiết bị, hàng hóa vật tư (Điều 23). Sản phẩm không bồi thường thương tật, tử vong của con người.</p>

<h2 id="nguyen-tac">Nguyên tắc xác định cơ sở phải mua</h2>
<ul>
<li>Xét theo <b>công năng thực tế</b> của cơ sở, không theo tên gọi trên biển hiệu.</li>
<li>Ngưỡng nối bằng chữ <b>"hoặc"</b>: đạt một điều kiện là thuộc diện.</li>
<li>Loại "không nêu ngưỡng" (bệnh viện, cửa hàng xăng dầu, nhà máy điện...) thì có là phải mua.</li>
<li>Hạng nguy hiểm cháy nổ A, B, C, D, E của kho, xưởng lấy theo hồ sơ kỹ thuật, không suy từ tên hàng.</li>
</ul>

<h2 id="bang-tra">Bảng tra các loại cơ sở hay gặp</h2>
<p>Tóm lược theo bản gốc Phụ lục VII, giữ số thứ tự. Muốn tra theo tên ngành, dùng <a class="kb-link" href="${CHAY_NO}#tra-cuu">công cụ tra cứu cơ sở phải mua bảo hiểm cháy nổ</a>.</p>
<h3>Nhà ở, giáo dục, y tế</h3>
<div class="kb-table" role="region" aria-label="Nhà ở, giáo dục, y tế" tabindex="0"><table>
<thead><tr><th scope="col">STT</th><th scope="col">Loại cơ sở</th><th scope="col">Ngưỡng</th></tr></thead><tbody>
${row(1, 'Chung cư, nhà ở tập thể', 'Cao từ 5 tầng hoặc sàn từ 1.000 m²')}
${row(2, 'Nhà trẻ, trường mẫu giáo, mầm non', 'Từ 50 cháu hoặc sàn từ 500 m²')}
${row(3, 'Trường học các cấp, cơ sở giáo dục khác', 'Cao từ 3 tầng hoặc sàn từ 1.500 m²')}
${row(4, 'Bệnh viện', 'Không nêu ngưỡng')}
${row(5, 'Phòng khám, trạm y tế, nhà hộ sinh, dưỡng lão, cơ sở y tế khác', 'Cao từ 3 tầng hoặc sàn từ 300 m²')}
${row(44, 'Nhà ở kết hợp sản xuất, kinh doanh', 'Diện tích phục vụ sản xuất, kinh doanh từ 200 m²')}
</tbody></table></div>
<h3>Thương mại, dịch vụ, văn phòng</h3>
<div class="kb-table" role="region" aria-label="Thương mại, dịch vụ, văn phòng" tabindex="0"><table>
<thead><tr><th scope="col">STT</th><th scope="col">Loại cơ sở</th><th scope="col">Ngưỡng</th></tr></thead><tbody>
${row(10, 'Karaoke, vũ trường, vui chơi giải trí, biểu diễn nghệ thuật', 'Cao từ 2 tầng hoặc sàn từ 300 m²')}
${row(11, 'Chợ, trung tâm thương mại, siêu thị', 'Sàn từ 300 m²')}
${row(12, 'Dịch vụ ăn uống, dịch vụ khác', 'Sàn từ 300 m²')}
${row(13, 'Kinh doanh hàng hóa dễ cháy', 'Sàn từ 200 m²')}
${row(14, 'Kinh doanh hàng khó cháy, không cháy đựng trong bao bì dễ cháy', 'Sàn từ 1.000 m²')}
${row(15, 'Kinh doanh khí đốt', 'Tồn chứa trên 500 kg')}
${row(16, 'Cửa hàng xăng dầu', 'Không nêu ngưỡng')}
${row(17, 'Khách sạn, nhà nghỉ, cơ sở lưu trú', 'Cao từ 3 tầng hoặc sàn từ 500 m²')}
${row(19, 'Trụ sở, nhà làm việc của cơ quan, doanh nghiệp', 'Cao từ 3 tầng hoặc sàn từ 500 m²')}
${row(31, 'Nhà để xe, nhà trưng bày ô tô, xe máy', 'Sàn từ 500 m²')}
</tbody></table></div>
<h3>Công nghiệp, kho, năng lượng</h3>
<div class="kb-table" role="region" aria-label="Công nghiệp, kho, năng lượng" tabindex="0"><table>
<thead><tr><th scope="col">STT</th><th scope="col">Loại cơ sở</th><th scope="col">Ngưỡng</th></tr></thead><tbody>
${row(22, 'Nhà máy điện', 'Không nêu ngưỡng')}
${row(23, 'Trạm biến áp', 'Điện áp từ 110 kV')}
${row(25, 'Cơ sở sản xuất có nhà sản xuất hạng A, B', 'Không nêu ngưỡng')}
${row(26, 'Cơ sở sản xuất có nhà sản xuất hạng C', 'Không nêu ngưỡng')}
${row(27, 'Cơ sở sản xuất có nhà sản xuất hạng D, E', 'Khối tích từ 5.000 m³ hoặc sàn từ 1.000 m²')}
${row(28, 'Kho hàng hóa hạng A, B, C', 'Sàn từ 200 m²')}
${row(30, 'Kho hàng hóa hạng D, E', 'Khối tích từ 5.000 m³ hoặc sàn từ 1.000 m²')}
</tbody></table></div>

<h2 id="mien">Ai không phải mua?</h2>
<p>Cơ sở thuộc phạm vi quản lý của Bộ Quốc phòng, Bộ Công an phục vụ mục đích quân sự, quốc phòng, an ninh, trật tự (Điều 35 khoản 1). Cơ sở không có tên trong Phụ lục VII thì không bắt buộc. Từ 15/09/2026, Nghị định 347/2026 còn loại khỏi đối tượng bảo hiểm các nhà, công trình độc lập bảo đảm quy định PCCC và có mức độ nguy hiểm cháy thấp.</p>

<h2 id="cach-doc">Cách đọc đúng ngưỡng: 3 ví dụ</h2>
<ol class="kb-steps">
<li><b>Văn phòng 2 tầng, sàn 600 m².</b> Chưa đủ 3 tầng nhưng sàn từ 500 m², nên thuộc mục 19: phải mua.</li>
<li><b>Kho 250 m² chứa giấy, carton.</b> Nếu hồ sơ xác định kho hạng C thì thuộc mục 28 (từ 200 m²): phải mua. Nếu hạng D, E thì xét mục 30.</li>
<li><b>Nhà phố tầng trệt bán hàng 150 m².</b> Phần kinh doanh dưới 200 m², chưa thuộc mục 44, trừ khi ngành hàng rơi vào mục khác như kinh doanh khí đốt.</li>
</ol>
<p>Thuộc diện rồi thì tra phí ở <a class="kb-link" href="${CHAY_NO}#bieu-phi">biểu phí bảo hiểm cháy nổ bắt buộc</a> hoặc đọc <a class="kb-link" href="/tin-tuc/bao-hiem-chay-no-bat-buoc-bao-nhieu-tien/">bảo hiểm cháy nổ bắt buộc bao nhiêu tiền</a>.</p>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Chưa chắc cơ sở có thuộc diện?</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> công năng, số tầng, diện tích sàn. PVI Thành Đô đối chiếu đúng mục Phụ lục VII và trả lời trước khi bạn mua.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
