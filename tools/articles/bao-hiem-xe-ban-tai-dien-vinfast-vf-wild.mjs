// Kiến thức bảo hiểm ô tô · vật chất xe · xe điện: biểu phí xe bán tải VinFast (chủ site giao 18/10/2026).
// Bản chuẩn ở baohiempvi-vn.com; trang này khai canonical về đó.
// Tỷ lệ 1,05% (xe bán tải VinFast) và 1,21% (xe bán tải thường) do chủ site cung cấp, áp dụng từ 18/10/2026 đến khi có thông báo mới.
// Ảnh giới thiệu của VinFast là ảnh dựng nên ghi "Hình ảnh mô phỏng"; ảnh showroom đã làm mờ mặt người.
import { ZALO_TU_VAN } from './khu-vuc.mjs';

export const post = {
  slug: 'bao-hiem-xe-ban-tai-dien-vinfast-vf-wild',
  date: '2026-10-18',
  dateText: '18/10/2026',
  cat: 'Kiến thức · Vật chất xe · Xe điện',
  title: 'Bảo hiểm xe bán tải điện VinFast VF Wild: phí vật chất xe 1,05% thay vì 1,21%',
  lead: 'Từ ngày 18/10/2026, PVI Thành Đô áp dụng tỷ lệ phí bảo hiểm vật chất xe 1,05% giá trị xe cho xe bán tải VinFast, thấp hơn mức 1,21% thường áp dụng cho xe bán tải. Với VF Wild giá 860 triệu đồng, phí ước tính khoảng 9,03 triệu đồng mỗi năm.',
  image: '/assets/vfw-bac-tong-quan.webp',
  alt: 'Hình ảnh mô phỏng xe bán tải VinFast VF Wild màu bạc đứng trên nền đất đỏ giữa các khối núi đá',
  readMin: 5,
  canonical: 'https://www.baohiempvi-vn.com/kien-thuc/bao-hiem-xe-ban-tai-dien-vinfast-vf-wild',
};

export const crumb = 'Vật chất xe · Xe điện';
export const hero = { name: 'vfw-bac-tong-quan', w: 1200, h: 630, position: '50% 60%', caption: 'Hình ảnh mô phỏng VinFast VF Wild màu bạc, ảnh giới thiệu sản phẩm của VinFast.' };
export const seo = {
  title: 'Bảo hiểm xe bán tải điện VinFast VF Wild: phí 1,05% | PVI',
  description: 'Biểu phí bảo hiểm vật chất xe bán tải VinFast tại PVI Thành Đô từ 18/10/2026: 1,05% giá trị xe thay vì 1,21%. Ví dụ VF Wild 860 triệu, điều khoản nên chọn, TNDS bắt buộc.',
};

const TNDS = '/san-pham/bao-hiem-bat-buoc/';

export const toc = [
  ['bieu-phi', 'Biểu phí xe bán tải VinFast'],
  ['vf-wild', 'VF Wild là xe gì'],
  ['vinfast', 'PVI và hệ thống VinFast'],
  ['luu-y', 'Cần chú ý khi mua'],
  ['tnds', 'TNDS bắt buộc xe bán tải'],
  ['nhan-chao-phi', 'Cách nhận bản chào phí'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Phí bảo hiểm vật chất xe VinFast VF Wild là bao nhiêu?', answer: 'Từ 18/10/2026, PVI Thành Đô áp dụng tỷ lệ 1,05% giá trị xe cho xe bán tải VinFast. Với giá niêm yết 860 triệu đồng, phí ước tính khoảng 9.030.000 đồng mỗi năm, chưa tính điều khoản bổ sung.' },
  { question: 'Vì sao xe bán tải VinFast có phí thấp hơn xe bán tải khác?', answer: 'Xe bán tải thông thường có tỷ lệ phí 1,21%. Xe bán tải VinFast được áp dụng 1,05% theo biểu phí của PVI Thành Đô từ 18/10/2026 cho đến khi có thông báo mới.' },
  { question: 'VF Wild là xe điện hay xe hybrid?', answer: 'VinFast gọi VF Wild là xe điện mở rộng phạm vi (REEV): xe vận hành bằng mô tơ điện, máy xăng dùng để phát điện sạc pin khi cần.' },
  { question: 'Bảo hiểm vật chất xe có bắt buộc không?', answer: 'Không. Bắt buộc chỉ là bảo hiểm TNDS, phí 437.000 đồng mỗi năm chưa thuế với xe bán tải không kinh doanh vận tải. Bảo hiểm vật chất xe là tự nguyện, nhưng ngân hàng thường yêu cầu khi mua xe trả góp.' },
  { question: 'Xe VF Wild bị hư có được sửa tại xưởng VinFast không?', answer: 'Được, nếu hợp đồng có điều khoản sửa chữa tại gara chính hãng. PVI là một trong 7 công ty bảo hiểm ký thỏa thuận với VinFast để rút ngắn thời gian duyệt giá sửa chữa.' },
];

export const sources = [
  ['VinFast VF Wild: thông số và giá niêm yết', 'https://vinfastauto.com/vn_vi/dat-coc-xe-vf-wild', 'VinFast'],
  ['VinFast hợp tác với 7 hãng bảo hiểm, rút ngắn thời gian giám định', 'https://vingroup.net/tin-tuc-su-kien/bai-viet/3282/vinfast-hop-tac-voi-7-hang-bao-hiem-rut-ngan-thoi-gian-giam-dinh-va-xu-ly-su-co-cho-khach-hang', 'Vingroup · 12/12/2024'],
  ['Các điều khoản bổ sung bảo hiểm tự nguyện xe ô tô, ĐKBS 008/XCG-PVI', 'https://adminweb.pvi.com.vn/wp-content/uploads/2025/05/CAC-DKBS-BH-TU-NGUYEN-XE-O-TO-HIEU-LUC-TU-1.7.2025.pdf', 'Tổng công ty Bảo hiểm PVI · hiệu lực 01/07/2025'],
  ['Biểu phí bảo hiểm TNDS bắt buộc ô tô', TNDS, 'PVI Thành Đô · theo Nghị định 67/2023/NĐ-CP'],
];

export const related = [
  { href: TNDS, img: 'section-bat-buoc', k: 'Sản phẩm chính', title: 'Bảo hiểm TNDS ô tô bắt buộc', text: 'Biểu phí theo loại xe và tính phí tham khảo, gồm xe bán tải.' },
];

const pic = (name, w, h, alt, caption, real = true) =>
  `<figure class="kb-photo${h > w ? ' kb-doc' : ''}"><img src="/assets/vfw-${name}.webp" width="${w}" height="${h}" alt="${alt}" loading="lazy" decoding="async"><figcaption>${real ? `Ảnh thực tế: ${caption} · Nguồn: PVI Thành Đô` : caption}</figcaption></figure>`;

export function body({ ctaRow }) {
  return `
<p class="kb-first">Bảo hiểm vật chất xe (còn gọi là bảo hiểm thân vỏ) tính phí bằng tỷ lệ phí nhân với số tiền bảo hiểm, thường là giá trị xe. Xe bán tải thông thường có tỷ lệ phí 1,21% giá trị xe. Xe bán tải VinFast được áp dụng 1,05%, áp dụng từ ngày 18/10/2026 cho đến khi PVI Thành Đô có thông báo mới.</p>

<h2 id="bieu-phi">Phí bảo hiểm vật chất xe bán tải VinFast là bao nhiêu?</h2>
<p>Bảng dưới tính trên giá niêm yết VF Wild do VinFast công bố. Số tiền bảo hiểm thực tế theo giá trị xe ghi trên hóa đơn hoặc thỏa thuận khi chào phí; bản chào phí ghi rõ phí đã gồm hay chưa gồm thuế GTGT và phần phí của điều khoản bổ sung.</p>
<div class="kb-table" role="region" aria-label="Phí vật chất xe VF Wild theo hai tỷ lệ" tabindex="0"><table>
<thead><tr><th scope="col">Giá trị xe</th><th scope="col">1,21% (bán tải thường)</th><th scope="col">1,05% (bán tải VinFast)</th><th scope="col">Chênh lệch mỗi năm</th></tr></thead>
<tbody>
<tr><td>860.000.000 đồng (đen, đỏ, trắng)</td><td>10.406.000 đồng</td><td>9.030.000 đồng</td><td>1.376.000 đồng</td></tr>
<tr><td>872.000.000 đồng (màu bạc)</td><td>10.551.200 đồng</td><td>9.156.000 đồng</td><td>1.395.200 đồng</td></tr>
</tbody></table></div>

<h2 id="vf-wild">VinFast VF Wild là xe gì?</h2>
<p>VF Wild là xe bán tải đầu tiên của VinFast, ra mắt tháng 9/2026. Xe chạy bằng mô tơ điện, có thêm máy phát chạy xăng để sạc pin khi cần, VinFast gọi là xe điện mở rộng phạm vi (REEV). Vì vậy khi mua bảo hiểm, xe vừa có pin cao áp như xe điện, vừa có động cơ xăng cần được tính đến.</p>
<div class="kb-table" role="region" aria-label="Thông số VF Wild" tabindex="0"><table>
<thead><tr><th scope="col">Thông số</th><th scope="col">VinFast VF Wild (theo VinFast công bố)</th></tr></thead>
<tbody>
<tr><td>Hệ truyền động</td><td>Điện mở rộng phạm vi (REEV)</td></tr>
<tr><td>Pin</td><td>LFP 46,4 kWh</td></tr>
<tr><td>Công suất, mô-men xoắn</td><td>160 kW, 280 Nm</td></tr>
<tr><td>Quãng đường chạy điện</td><td>Hơn 250 km mỗi lần sạc (chuẩn NEDC)</td></tr>
<tr><td>Quãng đường kết hợp xăng và điện</td><td>Tới khoảng 1.000 km</td></tr>
<tr><td>Thùng xe</td><td>1.574 x 1.512 x 509 mm, tải trọng 750 kg</td></tr>
<tr><td>Cấp điện ra ngoài</td><td>Có V2L</td></tr>
<tr><td>Giá niêm yết</td><td>860 triệu đồng; màu bạc 872 triệu đồng</td></tr>
</tbody></table></div>
${pic('thung-xe-showroom', 1200, 900, 'Thùng xe lót nhựa trắng của VinFast VF Wild nhìn từ phía sau, khách và nhân viên đứng quanh xe trong showroom; mặt người đã được làm mờ', 'thùng xe VF Wild tại showroom VinFast ngày ra mắt; mặt người đã được làm mờ')}
${pic('mau-do', 1200, 895, 'Hình ảnh mô phỏng VinFast VF Wild màu đỏ trên sân tròn, phía sau là đồi xám và mặt trăng', 'Hình ảnh mô phỏng VinFast VF Wild màu đỏ, ảnh giới thiệu sản phẩm của VinFast.', false)}
${pic('mau-den', 1200, 895, 'Hình ảnh mô phỏng VinFast VF Wild màu đen trên sân tròn dưới bầu trời tối', 'Hình ảnh mô phỏng VinFast VF Wild màu đen, ảnh giới thiệu sản phẩm của VinFast.', false)}
${pic('cum-cong-tac-den-gat-mua', 900, 1102, 'Cận cảnh cần điều khiển đèn pha và gạt mưa bên trái vô lăng VinFast VF Wild', 'cần điều khiển đèn và gạt mưa trên xe VF Wild trưng bày')}

<h2 id="vinfast">PVI và hệ thống VinFast: sửa xe, duyệt giá nhanh hơn</h2>
<p>Ngày 12/12/2024, VinFast ký thỏa thuận với 7 công ty bảo hiểm, trong đó có PVI, để rút ngắn thời gian giám định. Với sự cố nhỏ dưới 10 triệu đồng, công ty bảo hiểm duyệt giá sửa chữa tối đa trong 4 giờ làm việc kể từ khi nhận báo giá từ xưởng dịch vụ VinFast.</p>
<p>Theo PVI Thành Đô, PVI đã liên kết với toàn bộ hệ thống VinFast. Chủ xe VF Wild gặp sự cố có thể đưa xe về xưởng dịch vụ VinFast gần nhất và báo PVI để giám định tại đó.</p>
${pic('khoang-lai', 1200, 900, 'Khoang lái VinFast VF Wild với vô lăng hai chấu, màn hình trung tâm và ghế da đen, khách tham quan phía ngoài kính; mặt người đã được làm mờ', 'khoang lái VF Wild tại showroom VinFast; mặt người đã được làm mờ')}

<h2 id="luu-y">Bán tải điện cần chú ý gì khi mua bảo hiểm vật chất xe?</h2>
<p>Mức phí thấp chỉ có ý nghĩa khi hợp đồng bảo vệ đúng những phần đắt tiền của xe. Với VF Wild, nên hỏi rõ các điểm sau trước khi ký:</p>
<ul>
<li>Số tiền bảo hiểm khớp giá trị xe trên hóa đơn. Khai thấp hơn để giảm phí thì khi có tổn thất có thể bị bồi thường theo tỷ lệ.</li>
<li>Pin cao áp nằm trong số tiền bảo hiểm của xe. Hỏi rõ cách xử lý khi pin hư do va chạm và mức khấu hao áp dụng.</li>
<li>Điều khoản bổ sung ĐKBS 008/XCG-PVI về thiệt hại động cơ do nước: tài liệu PVI ghi nhận cho cả động cơ đốt trong và động cơ điện, quan trọng với xe hay đi đường ngập.</li>
<li>Sửa chữa tại xưởng chính hãng VinFast: chọn điều khoản sửa tại gara chính hãng nếu muốn xe về đúng xưởng dịch vụ.</li>
<li>Mục đích sử dụng: xe chở hàng kinh doanh và xe gia đình có phí khác nhau. Khai đúng ngay từ đầu để tránh tranh chấp khi bồi thường.</li>
<li>Phụ kiện lắp thêm như nắp thùng, giá nóc, đèn trợ sáng chỉ được bảo hiểm khi đã khai báo và tính vào số tiền bảo hiểm.</li>
</ul>

<h2 id="tnds">Phí bảo hiểm TNDS bắt buộc cho xe bán tải</h2>
<p>Ngoài bảo hiểm vật chất xe là tự nguyện, mọi xe bán tải phải có <a class="kb-link" href="${TNDS}">bảo hiểm trách nhiệm dân sự (TNDS) bắt buộc</a> theo Nghị định 67/2023/NĐ-CP. Phí theo biểu phí ban hành kèm nghị định này.</p>
<div class="kb-table" role="region" aria-label="Phí TNDS xe bán tải" tabindex="0"><table>
<thead><tr><th scope="col">Loại xe bán tải (pickup)</th><th scope="col">Phí năm chưa thuế</th><th scope="col">Gồm thuế GTGT 10%</th></tr></thead>
<tbody>
<tr><td>Không kinh doanh vận tải</td><td>437.000 đồng</td><td>480.700 đồng</td></tr>
<tr><td>Kinh doanh vận tải</td><td>933.000 đồng</td><td>1.026.300 đồng</td></tr>
</tbody></table></div>

<h2 id="nhan-chao-phi">Cách nhận bản chào phí bảo hiểm VF Wild</h2>
<p>PVI Thành Đô chuẩn bị bản chào phí theo thông tin xe của bạn. Nhân viên PVI kiểm tra và duyệt trước khi phát hành hợp đồng.</p>
<ol class="kb-steps">
<li><b>Gửi giấy tờ xe.</b> Ảnh hóa đơn hoặc hợp đồng mua xe, đăng ký xe (nếu đã có) qua Zalo 0938 072 236.</li>
<li><b>Mục đích sử dụng.</b> Xe gia đình hay kinh doanh, phụ kiện lắp thêm.</li>
<li><b>Chọn điều khoản bổ sung.</b> Sửa tại xưởng chính hãng, thiệt hại động cơ do nước và các điều khoản khác theo nhu cầu.</li>
<li><b>Nhận bản chào phí.</b> Ghi rõ tỷ lệ phí, số tiền bảo hiểm, mức khấu trừ và tổng phí.</li>
<li><b>Xác nhận.</b> Kiểm tra thông tin, đồng ý và nhận hợp đồng do PVI phát hành.</li>
</ol>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Nhận chào phí cho xe bán tải VinFast</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> ảnh hóa đơn hoặc đăng ký xe. PVI Thành Đô gửi bản chào phí theo tỷ lệ 1,05% trước khi bạn quyết định.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
