// Chiến dịch SEO cháy nổ bắt buộc, ngày 3 bài 2/5.
// Nhóm I: "mức khấu trừ bảo hiểm cháy nổ bắt buộc", "mức khấu trừ trong bảo hiểm cháy nổ".
// Bảng mức tối thiểu và loại M, N: Mục II Phụ lục VI NĐ 105/2025, theo docs/chay-no-50-bai/CN11 (đã đối chiếu bản gốc).
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const post = {
  slug: 'muc-khau-tru-bao-hiem-chay-no-bat-buoc',
  date: '2026-11-15',
  dateText: '15/11/2026',
  cat: 'Cháy nổ bắt buộc · Khấu trừ',
  title: 'Mức khấu trừ bảo hiểm cháy nổ bắt buộc: loại M, loại N và bảng mức tối thiểu',
  lead: 'Mức khấu trừ là số tiền cơ sở tự chịu trong mỗi vụ tổn thất. Cơ sở loại M khấu trừ tối đa 1% số tiền bảo hiểm, loại N tối đa 10%, và không thấp hơn mức tối thiểu từ 4 triệu đến 100 triệu đồng tùy số tiền bảo hiểm (Mục II Phụ lục VI Nghị định 105/2025).',
  image: '/assets/kho-bang-chao-phi-trang-2.webp',
  alt: 'Trang 2 bảng chào phí: danh sách rủi ro, số tiền bảo hiểm, tỷ lệ phí và mức khấu trừ',
  readMin: 5,
};

export const crumb = 'Cháy nổ bắt buộc';
export const hero = { name: 'kho-bang-chao-phi-trang-2', w: 1200, h: 1697, position: '50% 55%', caption: 'Ảnh thực tế: trang bảng chào phí ghi mức khấu trừ 40 triệu đồng mỗi vụ cho phần cháy, nổ bắt buộc; thông tin khách đã che.' };
export const seo = {
  title: 'Mức khấu trừ bảo hiểm cháy nổ bắt buộc: loại M, N, bảng tối thiểu | PVI',
  description: 'Mức khấu trừ bảo hiểm cháy nổ bắt buộc: loại M tối đa 1%, loại N tối đa 10% số tiền bảo hiểm, mức tối thiểu 4 đến 100 triệu đồng mỗi vụ. Ví dụ tính bồi thường.',
};

export const toc = [
  ['la-gi', 'Mức khấu trừ là gì'],
  ['bang', 'Bảng mức tối thiểu'],
  ['m-n', 'Loại M và loại N'],
  ['vi-du', 'Ví dụ tính bồi thường'],
  ['sai-lam', 'Sai lầm hay gặp'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Mức khấu trừ bảo hiểm cháy nổ là gì?', answer: 'Là số tiền bên mua bảo hiểm phải tự chịu trong mỗi sự kiện bảo hiểm (Điều 3 khoản 6 Nghị định 67/2023). Doanh nghiệp bảo hiểm bồi thường phần tổn thất vượt quá mức này.' },
  { question: 'Khấu trừ tính theo năm hay theo vụ?', answer: 'Theo mỗi sự kiện bảo hiểm, tức mỗi vụ tổn thất.' },
  { question: 'Loại M và loại N khác nhau thế nào?', answer: 'Loại M: mức khấu trừ tối đa 1% số tiền bảo hiểm. Loại N: tối đa 10%. Cả hai đều không thấp hơn mức tối thiểu theo bậc số tiền bảo hiểm. Loại M hay N do Phụ lục VI ấn định theo từng dòng cơ sở.' },
  { question: 'Cơ sở có số tiền bảo hiểm 56 tỷ đồng khấu trừ bao nhiêu?', answer: 'Mức tối thiểu của bậc trên 50 đến 100 tỷ đồng là 40 triệu đồng mỗi vụ. Với một kho loại N trong thực tế, hợp đồng ghi đúng 40 triệu đồng; 10% số tiền bảo hiểm chỉ là giới hạn trên.' },
  { question: 'Có chọn được mức khấu trừ thấp hơn để được bồi thường nhiều hơn không?', answer: 'Không thấp hơn mức tối thiểu tại Mục II Phụ lục VI. Trong khoảng từ mức tối thiểu đến mức tối đa, mức cụ thể ghi trên hợp đồng và giấy chứng nhận.' },
];

export const sources = [
  ['Nghị định 105/2025/NĐ-CP, Phụ lục VI Mục II (mức khấu trừ)', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 67/2023/NĐ-CP, Điều 3 khoản 6, Điều 27, Điều 28', 'https://congbao.chinhphu.vn/', 'Chính phủ'],
  ['Biểu phí bảo hiểm cháy nổ bắt buộc, cột loại khấu trừ', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Mỗi dòng biểu phí ghi rõ loại khấu trừ M hay N.' },
  { href: '/tin-tuc/bao-hiem-chay-no-bat-buoc-bao-nhieu-tien/', img: 'kho-ke-hang-cao-tang', w: 1000, h: 1333, k: 'Cùng cụm', title: 'Bảo hiểm cháy nổ bắt buộc bao nhiêu tiền', text: 'Ví dụ tính phí 7 loại cơ sở.' },
];

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> trong <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a>, mức khấu trừ là phần cơ sở tự chịu mỗi vụ tổn thất. Loại M tối đa 1% số tiền bảo hiểm, loại N tối đa 10%, và không bao giờ thấp hơn mức tối thiểu từ 4 triệu đến 100 triệu đồng theo bậc số tiền bảo hiểm.</p>

<h2 id="la-gi">Mức khấu trừ là gì?</h2>
<p>Điều 3 khoản 6 Nghị định 67/2023/NĐ-CP định nghĩa mức khấu trừ là số tiền bên mua bảo hiểm phải tự chịu trong mỗi sự kiện bảo hiểm. Mức này ghi trên giấy chứng nhận (Điều 27). Khi có tổn thất thuộc phạm vi bảo hiểm, doanh nghiệp bảo hiểm bồi thường phần còn lại theo nguyên tắc tại Điều 28.</p>

<h2 id="bang">Bảng mức khấu trừ tối thiểu</h2>
<div class="kb-table" role="region" aria-label="Mức khấu trừ tối thiểu" tabindex="0"><table>
<thead><tr><th scope="col">Số tiền bảo hiểm</th><th scope="col">Mức khấu trừ tối thiểu mỗi vụ</th></tr></thead>
<tbody>
<tr><td>Đến 2 tỷ đồng</td><td>4 triệu đồng</td></tr>
<tr><td>Trên 2 đến 10 tỷ đồng</td><td>10 triệu đồng</td></tr>
<tr><td>Trên 10 đến 50 tỷ đồng</td><td>20 triệu đồng</td></tr>
<tr><td>Trên 50 đến 100 tỷ đồng</td><td>40 triệu đồng</td></tr>
<tr><td>Trên 100 đến 200 tỷ đồng</td><td>60 triệu đồng</td></tr>
<tr><td>Trên 200 tỷ đồng</td><td>100 triệu đồng</td></tr>
</tbody></table></div>
<p>Cơ sở có số tiền bảo hiểm từ 1.000 tỷ đồng tại một địa điểm: khấu trừ theo Điều 26 khoản 2 Nghị định 67/2023, nhưng không thấp hơn mức tối thiểu của Phụ lục VI.</p>

<h2 id="m-n">Loại M và loại N</h2>
<ul>
<li><b>Loại M</b> (tối đa 1% số tiền bảo hiểm): ví dụ trụ sở, trường học, bệnh viện, khách sạn, siêu thị, chung cư, xưởng và kho hạng D, E.</li>
<li><b>Loại N</b> (tối đa 10% số tiền bảo hiểm): ví dụ chợ, cửa hàng xăng dầu, kinh doanh khí đốt, nhà để xe, xưởng và kho hạng A, B, C, dệt may, gỗ, giày, giấy, nhà ở kết hợp sản xuất, kinh doanh.</li>
</ul>
<p>Mỗi dòng trong <a class="kb-link" href="${CHAY_NO}#bieu-phi">biểu phí bảo hiểm cháy nổ bắt buộc</a> ghi sẵn loại khấu trừ; bên mua không tự chọn M hay N.</p>

<h2 id="vi-du">Ví dụ tính tiền bồi thường</h2>
<ol class="kb-steps">
<li><b>Kho loại N, số tiền bảo hiểm 56 tỷ đồng</b> (ca thật đã ẩn danh). Mức tối thiểu của bậc trên 50 đến 100 tỷ là 40 triệu đồng; hợp đồng ghi 40 triệu đồng mỗi vụ.</li>
<li><b>Giả sử có vụ cháy thiệt hại 300 triệu đồng</b> thuộc phạm vi bảo hiểm.</li>
<li><b>Phần thuộc trách nhiệm bồi thường</b> trước các khoản giảm trừ khác: 300 − 40 = 260 triệu đồng.</li>
</ol>
<p>Thiệt hại nhỏ hơn 40 triệu đồng thì cơ sở tự chịu. Lưu ý thêm: số tiền bồi thường có thể bị giảm trừ tối đa 20% nếu cơ sở không thực hiện kiến nghị tại biên bản kiểm tra PCCC dẫn đến tăng thiệt hại (Điều 28 Nghị định 67/2023).</p>

<h2 id="sai-lam">4 sai lầm hay gặp</h2>
<ul>
<li>Nhầm khấu trừ với phí bảo hiểm.</li>
<li>So phí giữa hai báo giá mà không so mức khấu trừ.</li>
<li>Tưởng khấu trừ là phần trăm của tổn thất. Thực tế là số tiền mỗi vụ theo bậc số tiền bảo hiểm.</li>
<li>Không dự phòng tiền mặt cho khoản khấu trừ khi có sự cố.</li>
</ul>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">So sánh báo phí, kể cả mức khấu trừ</h2>
<p>Gửi báo phí đang có qua <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a>. PVI Thành Đô đối chiếu tỷ lệ phí, loại khấu trừ và mức khấu trừ với Phụ lục VI.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
