// Chiến dịch SEO cháy nổ bắt buộc, ngày 3 bài 3/5.
// Nhóm B (bài con): "biểu phí bảo hiểm cháy nổ bắt buộc", "tỷ lệ phí bảo hiểm cháy nổ bắt buộc", "quy tắc biểu phí", "quy định mức phí".
// Mọi tỷ lệ khớp tariff-data.js (59 dòng Phụ lục VI đã duyệt). Bài tóm lược theo nhóm, bảng đủ 59 dòng nằm ở trang gốc #bieu-phi.
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const post = {
  slug: 'bieu-phi-bao-hiem-chay-no-bat-buoc',
  date: '2026-11-15',
  dateText: '15/11/2026',
  cat: 'Cháy nổ bắt buộc · Biểu phí',
  title: 'Biểu phí bảo hiểm cháy nổ bắt buộc 2026: tỷ lệ phí theo Phụ lục VI Nghị định 105/2025',
  lead: 'Biểu phí bảo hiểm cháy nổ bắt buộc hiện hành là Phụ lục VI Nghị định 105/2025, thay Phụ lục II Nghị định 67/2023. Tỷ lệ tối thiểu từ 0,05% đến 0,5% mỗi năm tùy loại cơ sở; mỗi dòng ấn định loại khấu trừ M hoặc N. Không còn cơ chế giảm phí 25%.',
  image: '/assets/kho-bang-chao-phi-trang-2.webp',
  alt: 'Trang bảng chào phí ghi số tiền bảo hiểm, tỷ lệ phí và phí bảo hiểm',
  readMin: 5,
};

export const crumb = 'Cháy nổ bắt buộc';
export const hero = { name: 'kho-bang-chao-phi-trang-2', w: 1200, h: 1697, position: '50% 40%', caption: 'Ảnh thực tế: bảng chào phí cháy nổ bắt buộc năm 2026 áp tỷ lệ theo Phụ lục VI; thông tin khách đã che.' };
export const seo = {
  title: 'Biểu phí bảo hiểm cháy nổ bắt buộc 2026: tỷ lệ phí Phụ lục VI | PVI',
  description: 'Biểu phí, tỷ lệ phí bảo hiểm cháy nổ bắt buộc theo Phụ lục VI NĐ 105/2025: văn phòng 0,05%, chung cư 0,05% hoặc 0,1%, kho, xưởng, xăng dầu, chợ. Loại khấu trừ M, N.',
};

export const toc = [
  ['la-gi', 'Biểu phí hiện hành'],
  ['bang', 'Tỷ lệ theo nhóm cơ sở'],
  ['nguyen-tac', 'Nguyên tắc áp dụng'],
  ['tra', 'Tra dòng của cơ sở'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Biểu phí bảo hiểm cháy nổ bắt buộc hiện nay theo văn bản nào?', answer: 'Phụ lục VI Nghị định 105/2025/NĐ-CP, hiệu lực 01/07/2025. Điều 44 Nghị định 105/2025 thay Phụ lục II Nghị định 67/2023 bằng Phụ lục VI này.' },
  { question: 'Tỷ lệ phí bảo hiểm cháy nổ bắt buộc thấp nhất là bao nhiêu?', answer: '0,05% mỗi năm, áp cho trụ sở, văn phòng, chung cư và khách sạn có hệ thống chữa cháy tự động, trường học, bệnh viện. Cao nhất 0,5% cho xưởng gỗ, kho gỗ, chợ.' },
  { question: 'Doanh nghiệp bảo hiểm có được bán thấp hơn biểu phí không?', answer: 'Không. Tỷ lệ thỏa thuận không thấp hơn tỷ lệ tối thiểu tại Phụ lục VI. Cơ chế tăng giảm phí tối đa 25% đã bị bãi bỏ (Điều 44 khoản 1 điểm d Nghị định 105/2025).' },
  { question: 'Tỷ lệ trong biểu phí đã gồm VAT chưa?', answer: 'Chưa. Phí = số tiền bảo hiểm × tỷ lệ, sau đó cộng thuế GTGT.' },
  { question: 'Cơ sở từ 1.000 tỷ đồng có dùng biểu phí này không?', answer: 'Không dùng bảng thông thường. Cơ sở hạt nhân hoặc có tổng số tiền bảo hiểm tại một địa điểm từ 1.000 tỷ đồng áp dụng Điều 26 Nghị định 67/2023, tỷ lệ không thấp hơn 75% tỷ lệ phí tối thiểu.' },
];

export const sources = [
  ['Nghị định 105/2025/NĐ-CP, Phụ lục VI (Mục I mức phí, Mục II khấu trừ), Điều 44', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 67/2023/NĐ-CP, Điều 26', 'https://congbao.chinhphu.vn/', 'Chính phủ'],
  ['Biểu phí đầy đủ 59 dòng và bộ tính phí', CHAY_NO + '#bieu-phi', 'PVI Thành Đô'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Biểu phí đủ 59 dòng theo nhóm ngành và bộ tính phí.' },
  { href: '/tin-tuc/muc-khau-tru-bao-hiem-chay-no-bat-buoc/', img: 'kho-bang-chao-phi-trang-2', w: 1200, h: 1697, k: 'Cùng cụm', title: 'Mức khấu trừ loại M, loại N', text: 'Bảng mức tối thiểu theo số tiền bảo hiểm.' },
];

const r = (a, b, c) => `<tr><td>${a}</td><td>${b}</td><td>${c}</td></tr>`;

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> biểu phí <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> đang áp dụng là Phụ lục VI Nghị định 105/2025/NĐ-CP. Tỷ lệ tối thiểu từ <b>0,05%</b> đến <b>0,5%</b> mỗi năm trên số tiền bảo hiểm, chưa gồm VAT. Bảng đủ 59 dòng có tại <a class="kb-link" href="${CHAY_NO}#bieu-phi">biểu phí theo nhóm ngành</a> trên trang sản phẩm.</p>

<h2 id="la-gi">Biểu phí hiện hành là văn bản nào?</h2>
<p>Điều 44 Nghị định 105/2025 thay Phụ lục II Nghị định 67/2023 bằng Phụ lục VI. Phụ lục VI có hai mục: Mục I là tỷ lệ phí tối thiểu theo loại cơ sở; Mục II là mức khấu trừ (loại M, N). Biểu phí theo Nghị định 23/2018 đã hết hiệu lực, xem <a class="kb-link" href="/tin-tuc/nghi-dinh-23-2018-bao-hiem-chay-no-het-hieu-luc/">Nghị định 23/2018 đã hết hiệu lực</a>.</p>

<h2 id="bang">Tỷ lệ phí tối thiểu theo nhóm cơ sở hay gặp</h2>
<div class="kb-table" role="region" aria-label="Tỷ lệ phí theo nhóm" tabindex="0"><table>
<thead><tr><th scope="col">Loại cơ sở</th><th scope="col">Khấu trừ</th><th scope="col">Tỷ lệ/năm</th></tr></thead>
<tbody>
${r('Trụ sở, nhà làm việc của cơ quan, doanh nghiệp', 'M', '0,05%')}
${r('Chung cư, nhà tập thể, nhà hỗn hợp có hệ thống chữa cháy tự động', 'M', '0,05%')}
${r('Chung cư, nhà tập thể, nhà hỗn hợp không có hệ thống chữa cháy tự động', 'M', '0,1%')}
${r('Kho hàng hạng D, E', 'M', '0,1%')}
${r('Xưởng sản xuất hạng D, E', 'M', '0,15%')}
${r('Xưởng hạng A, B, C; kho hạng A, B, C; kho dự trữ quốc gia', 'N', '0,2%')}
${r('Xưởng dệt may; kho bông vải sợi, sản phẩm dệt', 'N', '0,25%')}
${r('Cửa hàng xăng dầu; kho dầu mỏ, khí hóa lỏng, trạm chiết nạp', 'N', '0,3%')}
${r('Xưởng giày; xưởng giấy, bao bì; kho giấy, bìa, bao bì', 'N', '0,35%')}
${r('Xưởng gỗ; kho đồ gỗ; chợ', 'N', '0,5%')}
</tbody></table></div>
<p>Bảng trên trích các dòng hay gặp. Cơ sở khác (trường học, bệnh viện, khách sạn, karaoke, nhà để xe, nhà máy điện...) tra đúng dòng trên trang sản phẩm.</p>

<h2 id="nguyen-tac">5 nguyên tắc áp dụng biểu phí</h2>
<ol class="kb-steps">
<li><b>Là mức sàn.</b> Doanh nghiệp bảo hiểm và bên mua thỏa thuận tỷ lệ không thấp hơn mức tối thiểu.</li>
<li><b>Không giảm 25%.</b> Cơ chế tăng giảm phí tối đa 25% đã bị bãi bỏ.</li>
<li><b>Chưa gồm VAT.</b> Phí = số tiền bảo hiểm × tỷ lệ, cộng thuế GTGT.</li>
<li><b>Mua dưới 1 năm:</b> phí năm ÷ 365 × số ngày được bảo hiểm.</li>
<li><b>Nhiều công trình độc lập:</b> từ 15/09/2026, tính phí từng công trình theo loại hình tương ứng (Nghị định 347/2026).</li>
</ol>

<h2 id="tra">Tra đúng dòng phí của cơ sở</h2>
<p>Dòng phí phụ thuộc công năng và hạng nguy hiểm cháy nổ ghi trong hồ sơ PCCC, không phụ thuộc tên gọi. Cách nhanh nhất: gõ tên ngành hoặc tài sản vào <a class="kb-link" href="${CHAY_NO}#tra-cuu">bộ tra cứu và tính phí bảo hiểm cháy nổ</a>, nhập số tiền bảo hiểm, xem phí một năm đã gồm VAT. Ví dụ đã tính sẵn cho 7 loại cơ sở: <a class="kb-link" href="/tin-tuc/bao-hiem-chay-no-bat-buoc-bao-nhieu-tien/">bảo hiểm cháy nổ bắt buộc bao nhiêu tiền</a>.</p>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Không chắc cơ sở thuộc dòng phí nào?</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> công năng và hồ sơ PCCC. PVI Thành Đô xác định đúng dòng Phụ lục VI và gửi báo phí.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
