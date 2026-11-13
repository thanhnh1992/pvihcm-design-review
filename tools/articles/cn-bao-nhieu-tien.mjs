// Chiến dịch SEO cháy nổ bắt buộc, bài 4/5 ngày 1.
// Từ khóa chính: "bảo hiểm cháy nổ bắt buộc bao nhiêu tiền" (210/tháng); phụ: giá, mức phí, phí bảo hiểm cháy nổ (nhóm B, 450 lượt).
// Tỷ lệ phí khớp tariff-data.js (Phụ lục VI NĐ 105/2025) và docs/chay-no-50-bai/CN01 của baohiempvi-vn. Ca kho 56 tỷ là ca thật đã đăng.
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const post = {
  slug: 'bao-hiem-chay-no-bat-buoc-bao-nhieu-tien',
  date: '2026-11-13',
  dateText: '13/11/2026',
  cat: 'Cháy nổ bắt buộc · Phí',
  title: 'Bảo hiểm cháy nổ bắt buộc bao nhiêu tiền? Ví dụ tính phí cho 7 loại cơ sở',
  lead: 'Phí bảo hiểm cháy nổ bắt buộc bằng số tiền bảo hiểm nhân tỷ lệ phí tối thiểu tại Phụ lục VI Nghị định 105/2025, từ 0,05% đến 0,5% mỗi năm, cộng VAT. Văn phòng 10 tỷ đồng đóng khoảng 5,5 triệu đồng một năm; kho hàng 56 tỷ đồng đóng 123,2 triệu đồng.',
  image: '/assets/kho-ke-hang-cao-tang.webp',
  alt: 'Hệ kệ thép xanh nhiều tầng chất thùng carton trong kho hàng',
  readMin: 5,
};

export const crumb = 'Cháy nổ bắt buộc';
export const hero = { name: 'kho-ke-hang-cao-tang', w: 1000, h: 1333, position: '50% 40%', caption: 'Ảnh thực tế: kệ hàng cao tầng trong kho tại TP.HCM, PVI Thành Đô khảo sát trước khi báo phí, tháng 10/2026.' };
export const seo = {
  title: 'Bảo hiểm cháy nổ bắt buộc bao nhiêu tiền? Phí 7 loại cơ sở | PVI',
  description: 'Phí bảo hiểm cháy nổ bắt buộc = số tiền bảo hiểm × tỷ lệ Phụ lục VI (0,05% đến 0,5%/năm) + VAT. Ví dụ văn phòng, chung cư, kho, xưởng, cây xăng, xưởng gỗ.',
};

export const toc = [
  ['cong-thuc', 'Công thức tính phí'],
  ['vi-du', 'Ví dụ 7 loại cơ sở'],
  ['ngan-han', 'Mua dưới 1 năm'],
  ['vi-sao-khac', 'Vì sao báo phí khác nhau'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Bảo hiểm cháy nổ bắt buộc bao nhiêu tiền một năm?', answer: 'Bằng số tiền bảo hiểm nhân tỷ lệ phí tối thiểu của loại cơ sở tại Phụ lục VI Nghị định 105/2025 (0,05% đến 0,5% mỗi năm), cộng thuế GTGT. Ví dụ văn phòng có số tiền bảo hiểm 10 tỷ đồng, tỷ lệ 0,05%: phí 5 triệu đồng, cộng VAT 10% là 5,5 triệu đồng.' },
  { question: 'Phí bảo hiểm cháy nổ chung cư bao nhiêu?', answer: 'Chung cư có hệ thống chữa cháy tự động: tối thiểu 0,05% mỗi năm; không có: 0,1%. Số tiền bảo hiểm 20 tỷ đồng, có sprinkler: phí 10 triệu đồng, cộng VAT 1 triệu đồng, tổng 11 triệu đồng.' },
  { question: 'Có được giảm phí bảo hiểm cháy nổ bắt buộc không?', answer: 'Không được thấp hơn tỷ lệ tối thiểu tại Phụ lục VI. Cơ chế tăng hoặc giảm phí tối đa 25% đã bị bãi bỏ từ Nghị định 105/2025. Cách tiết kiệm hợp pháp là khai đúng hệ thống chữa cháy tự động và phân loại đúng từng công trình.' },
  { question: 'Mua bảo hiểm cháy nổ bắt buộc 6 tháng tính phí thế nào?', answer: 'Phí phải nộp = phí năm ÷ 365 × số ngày được bảo hiểm. Ví dụ phí năm 10 triệu đồng, mua 182 ngày: khoảng 4,99 triệu đồng chưa VAT.' },
  { question: 'Cơ sở có tổng số tiền bảo hiểm từ 1.000 tỷ đồng tính phí thế nào?', answer: 'Không dùng bảng thông thường. Cơ sở hạt nhân hoặc có tổng số tiền bảo hiểm tại một địa điểm từ 1.000 tỷ đồng áp dụng Điều 26 Nghị định 67/2023, báo phí theo hồ sơ riêng.' },
];

export const sources = [
  ['Nghị định 105/2025/NĐ-CP, Phụ lục VI (mức phí và khấu trừ), Điều 44', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 67/2023/NĐ-CP, Điều 24, Điều 26', 'https://congbao.chinhphu.vn/', 'Chính phủ'],
  ['Biểu phí 59 dòng và bộ tính phí bảo hiểm cháy nổ bắt buộc', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Bộ tính phí theo 59 dòng Phụ lục VI, đã gồm VAT.' },
  { href: '/tin-tuc/bao-hiem-chay-no-kho-hang-sprinkler-thuc-te/', img: 'kho-kho-hang-toan-canh', w: 1200, h: 630, k: 'Ca thực tế', title: 'Kho có sprinkler: bảng chào phí 56 tỷ đồng', text: 'Đọc từng dòng của một bảng chào phí thật.' },
];

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> phí <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> = số tiền bảo hiểm × tỷ lệ phí tối thiểu của loại cơ sở (Phụ lục VI Nghị định 105/2025/NĐ-CP), chưa gồm thuế GTGT. Tỷ lệ thấp nhất 0,05%, cao nhất 0,5% mỗi năm. Muốn ra con số cho cơ sở của mình trong 1 phút, dùng <a class="kb-link" href="${CHAY_NO}#tra-cuu">bộ tính phí bảo hiểm cháy nổ</a>.</p>

<h2 id="cong-thuc">Công thức tính phí bảo hiểm cháy nổ bắt buộc</h2>
<p><b>Phí năm = Số tiền bảo hiểm × Tỷ lệ phí</b>, sau đó cộng thuế GTGT.</p>
<ul>
<li><b>Số tiền bảo hiểm</b> tối thiểu là giá trị theo giá thị trường của toàn bộ tài sản: nhà, công trình, máy móc, hàng hóa (Điều 24 Nghị định 67/2023).</li>
<li><b>Tỷ lệ phí</b> không thấp hơn mức tối thiểu của loại cơ sở trong Phụ lục VI. Cơ chế tăng giảm 25% cũ đã bị bãi bỏ (Điều 44 khoản 1 điểm d Nghị định 105/2025).</li>
</ul>

<h2 id="vi-du">Ví dụ phí cho 7 loại cơ sở</h2>
<p>Số tiền bảo hiểm trong bảng là ví dụ để so sánh; tỷ lệ là mức tối thiểu theo Phụ lục VI; VAT tính 10%.</p>
<div class="kb-table" role="region" aria-label="Ví dụ phí bảo hiểm cháy nổ bắt buộc" tabindex="0"><table>
<thead><tr><th scope="col">Loại cơ sở</th><th scope="col">Số tiền bảo hiểm</th><th scope="col">Tỷ lệ/năm</th><th scope="col">Phí chưa VAT</th><th scope="col">Tổng có VAT</th></tr></thead>
<tbody>
<tr><td>Trụ sở, văn phòng doanh nghiệp</td><td>10 tỷ</td><td>0,05%</td><td>5.000.000</td><td>5.500.000</td></tr>
<tr><td>Chung cư có chữa cháy tự động</td><td>20 tỷ</td><td>0,05%</td><td>10.000.000</td><td>11.000.000</td></tr>
<tr><td>Chung cư không có chữa cháy tự động</td><td>20 tỷ</td><td>0,1%</td><td>20.000.000</td><td>22.000.000</td></tr>
<tr><td>Xưởng hạng D, E</td><td>30 tỷ</td><td>0,15%</td><td>45.000.000</td><td>49.500.000</td></tr>
<tr><td>Kho hạng A, B, C (ca thật)</td><td>56 tỷ</td><td>0,2%</td><td>112.000.000</td><td>123.200.000</td></tr>
<tr><td>Cửa hàng xăng dầu</td><td>5 tỷ</td><td>0,3%</td><td>15.000.000</td><td>16.500.000</td></tr>
<tr><td>Xưởng gỗ, kho gỗ, chợ</td><td>8 tỷ</td><td>0,5%</td><td>40.000.000</td><td>44.000.000</td></tr>
</tbody></table></div>
<p>Dòng kho 56 tỷ đồng là bảng chào phí thật PVI Thành Đô cấp tháng 10/2026, đã che thông tin khách: <a class="kb-link" href="/tin-tuc/bao-hiem-chay-no-kho-hang-sprinkler-thuc-te/">đọc bảng chào phí kho có sprinkler</a>. Tỷ lệ của đủ 59 loại cơ sở có tại <a class="kb-link" href="${CHAY_NO}#bieu-phi">biểu phí bảo hiểm cháy nổ bắt buộc theo nhóm ngành</a>.</p>

<h2 id="ngan-han">Mua dưới 1 năm thì tính thế nào?</h2>
<p>Thời hạn bảo hiểm khác 01 năm: <b>phí phải nộp = phí năm ÷ 365 × số ngày được bảo hiểm</b>. Cách này hay dùng khi muốn gom ngày tái tục của nhiều địa điểm về cùng một mốc.</p>

<h2 id="vi-sao-khac">Vì sao hai báo phí cho cùng một cơ sở lại khác nhau?</h2>
<ol class="kb-steps">
<li><b>Số tiền bảo hiểm khác nhau.</b> Một bên tính cả hàng tồn cao điểm, bên kia chỉ tính nhà xưởng. Phí thấp hơn có thể vì thiếu tài sản.</li>
<li><b>Phân loại cơ sở khác nhau.</b> Kho hạng A, B, C (0,2%) khác xưởng hạng D, E (0,15%). Hạng nguy hiểm phải theo hồ sơ kỹ thuật.</li>
<li><b>Có hay không hệ thống chữa cháy tự động.</b> Với chung cư, khách sạn, mức chênh là gấp đôi.</li>
<li><b>Phần mở rộng.</b> Bão lũ, nước tràn, sprinkler rò rỉ là phí bổ sung, phải tách riêng khỏi phần bắt buộc trong hợp đồng.</li>
<li><b>Nhiều công trình độc lập.</b> Từ 15/09/2026, Nghị định 347/2026 cho tính phí từng công trình theo loại hình tương ứng, có thể làm tổng phí thấp hơn.</li>
</ol>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Nhận báo phí chính xác cho cơ sở của bạn</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> loại cơ sở, diện tích và danh mục tài sản. PVI Thành Đô phân loại đúng dòng Phụ lục VI và gửi báo phí trước khi bạn quyết định.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
