// Chiến dịch SEO cháy nổ bắt buộc, ngày 4.
// Nhóm M: "hạch toán phí bảo hiểm cháy nổ".
// Căn cứ: Điều 4 khoản 6, 7 NĐ 67/2023 (DA_XAC_MINH trong docs/chay-no-50-bai/CN14). Mốc thanh toán cụ thể theo thông tư Bộ Tài chính chưa xác minh: không nêu số ngày.
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const post = {
  slug: 'hach-toan-phi-bao-hiem-chay-no',
  date: '2026-11-16',
  dateText: '16/11/2026',
  cat: 'Cháy nổ bắt buộc · Kế toán',
  title: 'Hạch toán phí bảo hiểm cháy nổ bắt buộc: tính vào chi phí nào, cần giữ chứng từ gì',
  lead: 'Điều 4 khoản 6 Nghị định 67/2023/NĐ-CP cho cơ sở sản xuất kinh doanh tính chi phí mua bảo hiểm cháy nổ bắt buộc vào giá thành hoặc chi phí hoạt động kinh doanh; cơ quan nhà nước, đơn vị công lập tính vào chi thường xuyên. Thời hạn thanh toán phí không được vượt quá thời hạn bảo hiểm.',
  image: '/assets/kho-bang-chao-phi-trang-2.webp',
  alt: 'Trang bảng chào phí ghi phí bảo hiểm, thuế GTGT và tổng phí',
  readMin: 4,
};

export const crumb = 'Cháy nổ · Kế toán';
export const hero = { name: 'kho-bang-chao-phi-trang-2', w: 1200, h: 1697, position: '50% 50%', caption: 'Ảnh thực tế: bảng chào phí tách phí bảo hiểm, thuế GTGT và tổng phí; thông tin khách đã che.' };
export const seo = {
  title: 'Hạch toán phí bảo hiểm cháy nổ bắt buộc: chi phí nào, chứng từ gì | PVI',
  description: 'Chi phí bảo hiểm cháy nổ bắt buộc tính vào giá thành, chi phí kinh doanh hoặc chi thường xuyên (Điều 4 NĐ 67/2023). Bộ chứng từ kế toán cần giữ và lưu ý thanh toán phí.',
};

export const toc = [
  ['tinh-vao-dau', 'Tính vào chi phí nào'],
  ['thanh-toan', 'Thời hạn thanh toán'],
  ['chung-tu', 'Bộ chứng từ cần giữ'],
  ['du-toan', 'Lập dự toán phí'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Phí bảo hiểm cháy nổ bắt buộc hạch toán vào đâu?', answer: 'Theo Điều 4 khoản 6 điểm a Nghị định 67/2023: cơ sở sản xuất kinh doanh tính vào giá thành sản phẩm, dịch vụ hoặc chi phí hoạt động kinh doanh; cơ quan nhà nước, đơn vị sự nghiệp công lập, tổ chức khác tính vào chi thường xuyên. Định khoản cụ thể do kế toán trưởng quyết định.' },
  { question: 'Thời hạn thanh toán phí bảo hiểm cháy nổ là bao lâu?', answer: 'Theo quy định của Bộ trưởng Bộ Tài chính, và trong mọi trường hợp không vượt quá thời hạn bảo hiểm (Điều 4 khoản 7 Nghị định 67/2023). Ngày phải thanh toán ghi trên hợp đồng; hỏi doanh nghiệp bảo hiểm khi ký.' },
  { question: 'Có phải phân bổ chi phí bảo hiểm cháy nổ nhiều kỳ không?', answer: 'Điều 4 khoản 6 không quy định việc phân bổ. Việc phân bổ theo chính sách kế toán và quy định thuế hiện hành của doanh nghiệp; hỏi kế toán trưởng hoặc tư vấn thuế.' },
  { question: 'Hóa đơn phí bảo hiểm cháy nổ có thuế GTGT không?', answer: 'Trên các chứng từ PVI Thành Đô đã cấp, phí bảo hiểm cháy nổ bắt buộc có thuế GTGT 10%, ghi tách riêng với phí. Khi lập dự toán nên cộng thuế vào.' },
  { question: 'Cần giữ những chứng từ gì?', answer: 'Giấy chứng nhận bảo hiểm (lưu tối thiểu 05 năm trong hồ sơ PCCC), hợp đồng kèm danh mục tài sản, hóa đơn phí và thuế GTGT, chứng từ thanh toán. Tên pháp nhân trên các giấy tờ phải khớp nhau.' },
];

export const sources = [
  ['Nghị định 67/2023/NĐ-CP, Điều 4 khoản 6, khoản 7', 'https://congbao.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 105/2025/NĐ-CP, Điều 4 khoản 4 (lưu giấy chứng nhận trong hồ sơ PCCC)', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Bộ tính phí bảo hiểm cháy nổ bắt buộc', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: '/tin-tuc/bao-hiem-chay-no-bat-buoc-bao-nhieu-tien/', img: 'kho-ke-hang-cao-tang', w: 1000, h: 1333, k: 'Cùng cụm', title: 'Bảo hiểm cháy nổ bắt buộc bao nhiêu tiền', text: 'Ví dụ phí 7 loại cơ sở để lập dự toán.' },
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Tính phí một năm đã gồm VAT.' },
];

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> chi phí mua <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> được tính vào giá thành hoặc chi phí hoạt động kinh doanh (cơ sở sản xuất kinh doanh), hoặc chi thường xuyên (cơ quan nhà nước, đơn vị công lập, tổ chức khác), theo Điều 4 khoản 6 điểm a Nghị định 67/2023/NĐ-CP. Bài này không thay tư vấn kế toán, thuế.</p>

<h2 id="tinh-vao-dau">Chi phí bảo hiểm cháy nổ tính vào đâu?</h2>
<div class="kb-table" role="region" aria-label="Nguồn chi theo loại đơn vị" tabindex="0"><table>
<thead><tr><th scope="col">Loại đơn vị</th><th scope="col">Tính vào</th></tr></thead>
<tbody>
<tr><td>Cơ sở sản xuất kinh doanh</td><td>Giá thành sản phẩm, dịch vụ hoặc chi phí hoạt động kinh doanh</td></tr>
<tr><td>Cơ quan hành chính nhà nước, đơn vị sự nghiệp công lập, tổ chức chính trị xã hội, tổ chức khác</td><td>Chi thường xuyên</td></tr>
</tbody></table></div>
<p>Định khoản cụ thể, việc phân bổ nhiều kỳ do kế toán trưởng quyết định theo chính sách kế toán và quy định thuế hiện hành.</p>

<h2 id="thanh-toan">Thời hạn thanh toán phí</h2>
<p>Điều 4 khoản 7 Nghị định 67/2023: thời hạn thanh toán phí thực hiện theo quy định của Bộ trưởng Bộ Tài chính, và trong mọi trường hợp không được vượt quá thời hạn bảo hiểm. Mốc cụ thể ghi trên hợp đồng; hợp đồng giá trị lớn có thể chia nhiều kỳ thanh toán. Hỏi rõ khi ký để đưa vào kế hoạch dòng tiền.</p>

<h2 id="chung-tu">Bộ chứng từ kế toán nên giữ</h2>
<ol class="kb-steps">
<li><b>Giấy chứng nhận bảo hiểm.</b> Đồng thời là thành phần hồ sơ PCCC, lưu tối thiểu 05 năm (Điều 4 khoản 4 Nghị định 105/2025). Xem <a class="kb-link" href="/tin-tuc/giay-chung-nhan-bao-hiem-chay-no-bat-buoc/">giấy chứng nhận bảo hiểm cháy nổ bắt buộc</a>.</li>
<li><b>Hợp đồng bảo hiểm kèm danh mục tài sản.</b></li>
<li><b>Hóa đơn:</b> phí bảo hiểm và thuế GTGT ghi tách riêng (10% trên các chứng từ PVI Thành Đô đã cấp).</li>
<li><b>Chứng từ thanh toán</b> theo từng kỳ.</li>
</ol>
<p>Lỗi hay gặp: giấy chứng nhận chỉ nằm ở phòng kế toán, bộ phận PCCC không có khi đoàn kiểm tra đến; hoặc tên pháp nhân trên hóa đơn và giấy chứng nhận không khớp.</p>

<h2 id="du-toan">Lập dự toán phí cho năm tới</h2>
<ul>
<li>Lấy danh mục tài sản và giá trị dự kiến (nhà, máy móc, hàng tồn cao điểm).</li>
<li>Tra tỷ lệ tối thiểu của loại cơ sở tại <a class="kb-link" href="${CHAY_NO}#bieu-phi">biểu phí bảo hiểm cháy nổ bắt buộc</a>.</li>
<li>Phí = số tiền bảo hiểm × tỷ lệ, cộng VAT; cộng thêm phí phần mở rộng nếu mua bão lũ, nước tràn.</li>
<li>Dự phòng tiền cho mức khấu trừ mỗi vụ, xem <a class="kb-link" href="/tin-tuc/muc-khau-tru-bao-hiem-chay-no-bat-buoc/">mức khấu trừ loại M, loại N</a>.</li>
</ul>
<p>Muốn có số nhanh cho dự toán, dùng <a class="kb-link" href="${CHAY_NO}#tra-cuu">bộ tính phí bảo hiểm cháy nổ</a>.</p>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Nhận báo phí để lập ngân sách</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> danh mục tài sản dự kiến. PVI Thành Đô gửi báo phí tách phí, thuế và lịch thanh toán để kế toán đưa vào dự toán.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
