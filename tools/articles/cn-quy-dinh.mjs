// Chiến dịch SEO cháy nổ bắt buộc, bài 3/5 ngày 10/11/2026.
// Từ khóa chính: "quy định mua bảo hiểm cháy nổ bắt buộc" (50/tháng), phụ: "quy định về bảo hiểm cháy nổ bắt buộc" (40).
// Không đưa mức phạt bằng tiền: bộ tài liệu nguồn ghi "chưa đối chiếu bản gốc Nghị định 106/2025".
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const post = {
  slug: 'quy-dinh-mua-bao-hiem-chay-no-bat-buoc',
  date: '2026-11-13',
  dateText: '13/11/2026',
  cat: 'Pháp lý · Cháy nổ bắt buộc',
  title: 'Quy định mua bảo hiểm cháy nổ bắt buộc 2026: 7 điều chủ cơ sở cần nắm',
  lead: 'Quy định về bảo hiểm cháy nổ bắt buộc nằm ở hai văn bản chính: Nghị định 105/2025/NĐ-CP (ai phải mua, phí tối thiểu) và Nghị định 67/2023/NĐ-CP (mua ở đâu, bảo hiểm gì, bồi thường thế nào), cùng phần sửa đổi của Nghị định 347/2026 từ 15/09/2026.',
  image: '/assets/kho-duong-ong-chua-chay.webp',
  alt: 'Đường ống chữa cháy sơn đỏ chạy dọc tường nhà kho',
  readMin: 6,
};

export const crumb = 'Pháp lý cháy nổ';
export const hero = { name: 'kho-duong-ong-chua-chay', w: 1000, h: 750, position: '50% 50%', caption: 'Ảnh thực tế: đường ống chữa cháy dọc tường kho hàng tại TP.HCM, PVI Thành Đô khảo sát tháng 10/2026.' };
export const seo = {
  title: 'Quy định mua bảo hiểm cháy nổ bắt buộc 2026: 7 điều cần nắm | PVI',
  description: 'Quy định về bảo hiểm cháy nổ bắt buộc theo NĐ 105/2025, NĐ 67/2023 và NĐ 347/2026: ai phải mua, bảo hiểm tài sản nào, số tiền tối thiểu, phí, giấy chứng nhận.',
};

export const toc = [
  ['van-ban', 'Văn bản đang áp dụng'],
  ['bay-dieu', '7 quy định cần nắm'],
  ['moi-347', 'Thay đổi từ 15/09/2026'],
  ['khong-mua', 'Không mua thì sao'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Quy định mua bảo hiểm cháy nổ bắt buộc hiện nay nằm ở văn bản nào?', answer: 'Nghị định 105/2025/NĐ-CP (hiệu lực 01/07/2025): Điều 35 và Phụ lục VII về cơ sở phải mua, Phụ lục VI về phí và khấu trừ. Nghị định 67/2023/NĐ-CP Chương III về đối tượng, số tiền bảo hiểm, phạm vi, giấy chứng nhận, bồi thường. Nghị định 347/2026/NĐ-CP sửa một số điểm từ 15/09/2026.' },
  { question: 'Cơ sở nào được miễn mua bảo hiểm cháy nổ bắt buộc?', answer: 'Cơ sở thuộc phạm vi quản lý của Bộ Quốc phòng, Bộ Công an phục vụ mục đích quân sự, quốc phòng, an ninh, trật tự (Điều 35 khoản 1 Nghị định 105/2025). Cơ sở không có tên trong Phụ lục VII thì không bắt buộc, được khuyến khích mua.' },
  { question: 'Bảo hiểm cháy nổ bắt buộc có bảo hiểm cho người không?', answer: 'Không. Đây là bảo hiểm tài sản của cơ sở: nhà, công trình, máy móc thiết bị, hàng hóa vật tư. Thương tật, tử vong của con người thuộc các sản phẩm bảo hiểm khác.' },
  { question: 'Doanh nghiệp bảo hiểm có được giảm phí dưới mức tối thiểu không?', answer: 'Không. Tỷ lệ phí thỏa thuận không thấp hơn tỷ lệ tối thiểu tại Phụ lục VI. Cơ chế tăng hoặc giảm phí tối đa 25% trước đây đã bị bãi bỏ (Điều 44 khoản 1 điểm d Nghị định 105/2025).' },
  { question: 'Không mua bảo hiểm cháy nổ bắt buộc bị xử lý thế nào?', answer: 'Bị xử phạt vi phạm hành chính theo Điều 17 Nghị định 106/2025/NĐ-CP. Từ 20/4/2026, Nghị định 69/2026/NĐ-CP bổ sung xử phạt hành vi mua không đủ đối tượng bảo hiểm và biện pháp buộc mua. Mức phạt cụ thể nên hỏi chuyên viên theo nhóm cơ sở.' },
];

export const sources = [
  ['Nghị định 105/2025/NĐ-CP ngày 15/05/2025, Điều 4, 35, 44, Phụ lục VI, VII', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 67/2023/NĐ-CP ngày 06/09/2023, Chương III (Điều 23 đến 31)', 'https://congbao.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 347/2026/NĐ-CP, hiệu lực 15/09/2026', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 106/2025/NĐ-CP, Điều 17; Nghị định 69/2026/NĐ-CP', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Bảo hiểm cháy nổ bắt buộc: tra cứu và tính phí', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Căn cứ pháp lý NĐ 105/2025, biểu phí Phụ lục VI và công cụ tính phí.' },
  { href: '/tin-tuc/nghi-dinh-347-2026-chay-no-bat-buoc/', img: 'section-chay-no', k: 'Pháp lý mới', title: 'Nghị định 347/2026: cháy nổ bắt buộc thay đổi gì', text: 'Bỏ nghiệm thu của Công an, thêm trường hợp không phải mua, tính phí từng hạng mục.' },
];

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> cơ sở có tên trong Phụ lục VII Nghị định 105/2025/NĐ-CP phải mua <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> cho toàn bộ tài sản của cơ sở, tại doanh nghiệp bảo hiểm được phép, với tỷ lệ phí không thấp hơn Phụ lục VI. Từ 15/09/2026, Nghị định 347/2026 sửa thêm ba điểm về hồ sơ PCCC, đối tượng và cách tính phí.</p>

<h2 id="van-ban">Quy định về bảo hiểm cháy nổ bắt buộc nằm ở đâu?</h2>
<div class="kb-table" role="region" aria-label="Văn bản đang áp dụng" tabindex="0"><table>
<thead><tr><th scope="col">Văn bản</th><th scope="col">Quy định gì</th></tr></thead>
<tbody>
<tr><td>Nghị định 105/2025/NĐ-CP (hiệu lực 01/07/2025)</td><td>Điều 35, Phụ lục VII: cơ sở phải mua. Phụ lục VI: tỷ lệ phí và khấu trừ. Điều 4: hồ sơ PCCC</td></tr>
<tr><td>Nghị định 67/2023/NĐ-CP, Chương III</td><td>Đối tượng, số tiền bảo hiểm, phạm vi, loại trừ, giấy chứng nhận, bồi thường</td></tr>
<tr><td>Nghị định 347/2026/NĐ-CP (hiệu lực 15/09/2026)</td><td>Sửa điều kiện hồ sơ PCCC, đối tượng bảo hiểm, cách tính phí nhiều công trình</td></tr>
<tr><td>Nghị định 106/2025/NĐ-CP, Nghị định 69/2026/NĐ-CP</td><td>Xử phạt vi phạm về bảo hiểm cháy, nổ bắt buộc</td></tr>
</tbody></table></div>
<p>Các nghị định 23/2018 và 97/2021 đã hết hiệu lực. Báo phí hay danh mục còn dẫn hai văn bản này là đã cũ. Toàn văn phần căn cứ có tại mục <a class="kb-link" href="${CHAY_NO}#can-cu">căn cứ pháp lý Nghị định 105/2025</a>.</p>

<h2 id="bay-dieu">7 quy định chủ cơ sở cần nắm</h2>
<h3>1. Ai phải mua</h3>
<p>Cơ sở thuộc danh mục Phụ lục VII (44 loại) phải mua cho tài sản của cơ sở, trừ cơ sở quốc phòng, an ninh (Điều 35 khoản 1). Một số ngưỡng hay gặp: chung cư từ 5 tầng hoặc sàn từ 1.000 m²; trụ sở doanh nghiệp từ 3 tầng hoặc sàn từ 500 m²; kho hạng A, B, C sàn từ 200 m²; xưởng, kho hạng D, E khối tích từ 5.000 m³ hoặc sàn từ 1.000 m²; cửa hàng xăng dầu không có ngưỡng. Chữ "hoặc" nghĩa là đạt một điều kiện là thuộc diện.</p>
<h3>2. Mua ở đâu</h3>
<p>Tại doanh nghiệp bảo hiểm được phép triển khai nghiệp vụ (Điều 4 khoản 1 Nghị định 67/2023). Xem <a class="kb-link" href="/tin-tuc/mua-bao-hiem-chay-no-bat-buoc-o-dau/">mua bảo hiểm cháy nổ bắt buộc ở đâu</a>.</p>
<h3>3. Bảo hiểm tài sản nào</h3>
<p>Toàn bộ tài sản của cơ sở: nhà, công trình và tài sản gắn liền; máy móc, thiết bị; hàng hóa, vật tư kể cả nguyên vật liệu, bán thành phẩm, thành phẩm (Điều 23). Chỉ bảo hiểm nhà xưởng mà bỏ máy móc, hàng hóa là chưa đủ.</p>
<h3>4. Số tiền bảo hiểm tối thiểu</h3>
<p>Là giá trị theo giá thị trường của tài sản tại thời điểm giao kết hợp đồng; hàng hóa phù hợp thời gian lưu trữ (Điều 24 khoản 1). Không xác định được giá thị trường thì thỏa thuận theo giá trị còn lại, giá trị thay thế hoặc hóa đơn chứng từ.</p>
<h3>5. Phí tối thiểu</h3>
<p>Phí = số tiền bảo hiểm × tỷ lệ phí tối thiểu tại Phụ lục VI, chưa gồm VAT. Tỷ lệ từ 0,05% (trụ sở, chung cư có chữa cháy tự động) đến 0,5% (xưởng gỗ, kho gỗ, chợ) mỗi năm. Không còn cơ chế giảm 25%. Tra dòng của cơ sở tại <a class="kb-link" href="${CHAY_NO}#bieu-phi">biểu phí bảo hiểm cháy nổ bắt buộc</a>.</p>
<h3>6. Phạm vi và loại trừ</h3>
<p>Bồi thường thiệt hại từ rủi ro cháy, nổ (Điều 25). Không bồi thường, ví dụ: động đất, núi lửa; sét đánh trực tiếp không gây cháy, nổ; thiết bị điện hỏng do quá tải, đoản mạch, tự đốt nóng; cố ý gây cháy; dữ liệu, phần mềm. Bão lũ chỉ được bảo hiểm khi mua mở rộng.</p>
<h3>7. Giấy chứng nhận và hồ sơ PCCC</h3>
<p>Doanh nghiệp bảo hiểm cấp giấy chứng nhận 11 nội dung (Điều 27). Giấy chứng nhận thuộc hồ sơ PCCC, lưu tối thiểu 05 năm (Điều 4 Nghị định 105/2025). Chi tiết: <a class="kb-link" href="/tin-tuc/giay-chung-nhan-bao-hiem-chay-no-bat-buoc/">giấy chứng nhận bảo hiểm cháy nổ bắt buộc</a>.</p>

<h2 id="moi-347">Ba thay đổi từ 15/09/2026 theo Nghị định 347/2026</h2>
<ul>
<li><b>Điều kiện hồ sơ PCCC:</b> mốc xét chuyển từ "đã có văn bản chấp thuận kết quả nghiệm thu về PCCC" sang "đã có văn bản thẩm định thiết kế về PCCC", với cơ sở thuộc diện phải thẩm định.</li>
<li><b>Đối tượng bảo hiểm:</b> loại trừ nhà, công trình độc lập bảo đảm quy định PCCC và có mức độ nguy hiểm cháy thấp.</li>
<li><b>Cách tính phí:</b> cơ sở nhiều nhà, công trình độc lập, tính chất hoạt động khác nhau thì phí từng công trình tính theo loại hình tương ứng tại Phụ lục VI.</li>
</ul>

<h2 id="khong-mua">Không mua đúng quy định thì sao?</h2>
<p>Hành vi vi phạm về bảo hiểm cháy, nổ bắt buộc bị xử phạt theo Điều 17 Nghị định 106/2025/NĐ-CP. Từ 20/4/2026, Nghị định 69/2026/NĐ-CP bổ sung xử phạt hành vi mua không đủ đối tượng bảo hiểm và biện pháp buộc mua. Mức phạt khác nhau theo nhóm cơ sở; hãy hỏi chuyên viên để biết đúng mức áp dụng cho cơ sở của bạn.</p>
<p>Rủi ro lớn hơn tiền phạt là khi cháy xảy ra mà tài sản không có trong hợp đồng: phần đó không được bồi thường.</p>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Kiểm tra cơ sở đã mua đúng quy định chưa</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> loại hình, diện tích và hợp đồng đang có. PVI Thành Đô đối chiếu Phụ lục VI, VII và các điểm sửa đổi của Nghị định 347/2026.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
