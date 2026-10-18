// Tin: cháy căn hộ chung cư Happy Valley, đường Nguyễn Văn Linh, phường Tân Hưng (Quận 7 cũ), tối 17/10/2026.
// Bản chuẩn ở baohiempvi-vn.com (chủ site giao 18/10/2026, đăng cả hai mục Tin tức); trang này khai canonical về đó.
// Dữ kiện theo Thanh Niên, Sài Gòn Giải Phóng, Tiền Phong; nguồn ghi bằng chữ, không link ra ngoài.
// Không dùng ảnh, video TikTok của người khác (chủ site chốt); chỉ hình minh họa có sẵn.
import { ZALO_TU_VAN } from './khu-vuc.mjs';

export const post = {
  slug: 'chay-can-ho-chung-cu-happy-valley-bao-hiem-chay-no',
  date: '2026-10-18',
  dateText: '18/10/2026',
  cat: 'Tin tức · Cháy nổ',
  title: 'Cháy căn hộ chung cư Happy Valley (Quận 7 cũ): chủ căn hộ được bảo hiểm gì, ai mua phần chung',
  lead: 'Khoảng 18 giờ 39 ngày 17/10/2026, căn hộ M304 ở lầu 3, Block M chung cư Happy Valley trên đường Nguyễn Văn Linh, phường Tân Hưng (Quận 7 cũ), TP.HCM bốc cháy khi trong nhà không có người. Không ai bị thương, nhưng khoảng 20 m² trong căn hộ 100 m² bị thiêu rụi. Thiệt hại trong căn hộ do ai bồi thường?',
  image: '/assets/chung-cu-minh-hoa.webp',
  alt: 'Hình ảnh minh họa: tòa chung cư nhiều tầng trên nền xanh đậm, một số ô cửa sổ sáng màu cam',
  readMin: 5,
  canonical: 'https://www.baohiempvi-vn.com/kien-thuc/chay-can-ho-chung-cu-happy-valley-bao-hiem-chay-no',
};

export const crumb = 'Tin tức cháy nổ';
export const hero = { name: 'chung-cu-minh-hoa', w: 1200, h: 630, position: '50% 50%', caption: 'Hình ảnh minh họa: tòa chung cư nhiều tầng, không phải ảnh thật của chung cư Happy Valley hay vụ cháy.' };
export const seo = {
  title: 'Cháy căn hộ chung cư Happy Valley: bảo hiểm gì, ai mua | PVI',
  description: 'Tối 17/10/2026, căn hộ lầu 3 chung cư Happy Valley, phường Tân Hưng bốc cháy. Bảo hiểm cháy nổ chung cư bảo vệ phần nào, chủ căn hộ cần mua gì thêm.',
};

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const toc = [
  ['dien-bien', 'Vụ cháy diễn ra thế nào'],
  ['ai-chi-tra', 'Bảo hiểm nào chi trả'],
  ['can-ho', 'Bảo hiểm căn hộ bảo vệ gì'],
  ['luu-y', 'Lưu ý để được bồi thường đủ'],
  ['bat-buoc', 'Chung cư nào phải mua'],
  ['khi-chay', 'Khi căn hộ bị cháy'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Vụ cháy chung cư Happy Valley xảy ra khi nào, có ai bị thương không?', answer: 'Khoảng 18 giờ 39 ngày 17/10/2026, tại căn hộ M304, lầu 3, Block M chung cư Happy Valley, đường Nguyễn Văn Linh, phường Tân Hưng. Lửa bắt đầu ở phòng ngủ khi không có người, được dập lúc 18 giờ 58. Không có thiệt hại về người; khoảng 20 m² trên 100 m² căn hộ bị thiêu rụi.' },
  { question: 'Bảo hiểm cháy nổ bắt buộc của chung cư có bồi thường đồ đạc trong căn hộ không?', answer: 'Bảo hiểm cháy, nổ bắt buộc của tòa nhà thường được mua cho phần sở hữu chung. Đồ đạc, nội thất và phần sở hữu riêng trong căn hộ cần chủ căn hộ mua bảo hiểm riêng, ví dụ bảo hiểm theo Quy tắc Mọi rủi ro căn hộ chung cư của PVI. Nên hỏi ban quản trị hợp đồng của tòa nhà đang bảo vệ phần nào.' },
  { question: 'Bảo hiểm căn hộ chung cư PVI có bồi thường thiệt hại do nước chữa cháy không?', answer: 'Quy tắc Mọi rủi ro căn hộ chung cư của PVI có rủi ro nước tràn từ bể chứa, đường ống nước và hệ thống chữa cháy tự động, cùng cháy, nổ, sét đánh, giông bão, trộm cướp có dấu hiệu đột nhập và động đất. Mức bồi thường cụ thể theo hợp đồng và kết quả giám định.' },
  { question: 'Căn hộ đang sửa chữa hoặc bỏ trống mà bị cháy thì có được bồi thường không?', answer: 'Quy tắc Mọi rủi ro căn hộ chung cư của PVI loại trừ thiệt hại khi căn hộ bị bỏ trống từ 15 ngày liên tục hoặc đang sửa chữa, cải tạo. Chủ căn hộ đi vắng dài ngày hoặc sửa nhà nên báo trước cho doanh nghiệp bảo hiểm để được hướng dẫn.' },
  { question: 'Chung cư bao nhiêu tầng thì phải mua bảo hiểm cháy nổ bắt buộc?', answer: 'Chung cư, nhà ở tập thể cao từ 5 tầng trở lên hoặc tổng diện tích sàn từ 1.000 m² phải mua bảo hiểm cháy, nổ bắt buộc theo Phụ lục VII Nghị định 105/2025/NĐ-CP. Phí tối thiểu 0,05% mỗi năm nếu có hệ thống chữa cháy tự động, 0,1% nếu không, chưa gồm VAT.' },
];

export const sources = [
  ['Cháy chung cư trên đường Nguyễn Văn Linh (18/10/2026)', 'https://thanhnien.vn/', 'Báo Thanh Niên'],
  ['Cháy chung cư trên đường Nguyễn Văn Linh, TPHCM, hàng trăm người tháo chạy', 'https://www.sggp.org.vn/', 'Báo Sài Gòn Giải Phóng'],
  ['Cháy căn hộ chung cư Happy Valley ở TPHCM', 'https://tienphong.vn/', 'Báo Tiền Phong'],
  ['Nghị định 105/2025/NĐ-CP, Phụ lục VI và VII; Quy tắc Mọi rủi ro căn hộ chung cư PVI (hiệu lực 05/12/2016)', 'https://vanban.chinhphu.vn/', 'Chính phủ; Tổng công ty Bảo hiểm PVI'],
  ['Bảo hiểm cháy nổ bắt buộc: tra cứu và tính phí', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Tra cứu cơ sở có thuộc diện bắt buộc không, biểu phí và tính phí tham khảo.' },
  { href: '/tin-tuc/chay-tiem-massage-le-van-luong-bao-hiem-chay-no/', img: 'chay-massage-hien-truong', k: 'Tin liên quan', title: 'Cháy tiệm massage trên đường Lê Văn Lương', text: 'Cửa hàng, hộ kinh doanh có phải mua bảo hiểm cháy nổ không, phí gói cửa hàng.' },
];

export function body({ pic, ctaRow }) {
  return `
<p class="kb-first">Khoảng 18 giờ 39 ngày 17/10/2026, một căn hộ ở lầu 3 chung cư Happy Valley, phường Tân Hưng (Quận 7 cũ) bốc cháy. Không ai bị thương, nhưng một phần căn hộ bị thiêu rụi. Với cư dân chung cư, câu hỏi thực tế là: <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ</a> của tòa nhà có bồi thường đồ đạc trong căn hộ không, và chủ căn hộ cần mua gì thêm.</p>

<h2 id="dien-bien">Vụ cháy căn hộ chung cư Happy Valley diễn ra thế nào?</h2>
<p>Theo báo Thanh Niên, Sài Gòn Giải Phóng và Tiền Phong ngày 17 và 18/10/2026, Trung tâm Chỉ huy 114 nhận tin báo cháy khoảng 18 giờ 39 tại căn hộ M304, lầu 3, Block M chung cư Happy Valley. Lửa bắt đầu ở phòng ngủ khi bên trong không có người. Chuông báo cháy vang lên, hàng trăm cư dân di tản xuống đất bằng cầu thang bộ.</p>
<p>Đám cháy được dập tắt hoàn toàn lúc 18 giờ 58, thiêu rụi khoảng 20 m² trên tổng diện tích 100 m² của căn hộ; lực lượng chữa cháy bảo vệ được phần còn lại và các căn hộ lân cận. Không có thiệt hại về người. Công an phường Tân Hưng phối hợp Công an TP.HCM đang điều tra nguyên nhân.</p>
<p>Ngoài phần bị cháy, căn hộ sau hỏa hoạn thường còn hư hỏng do khói, muội và nước chữa cháy, đây là phần thiệt hại chủ nhà hay bỏ sót khi tính toán.</p>

<h2 id="ai-chi-tra">Căn hộ bị cháy thì bảo hiểm nào chi trả?</h2>
<p>Phải tách hai phần. Bảo hiểm cháy, nổ bắt buộc của tòa nhà thường được mua cho phần sở hữu chung (hành lang, thang máy, hệ thống kỹ thuật, kết cấu chung) do chủ đầu tư hoặc ban quản trị đứng ra mua. Phần sở hữu riêng của từng căn hộ và đồ đạc bên trong cần chủ căn hộ mua bảo hiểm riêng.</p>
<p>Nếu chủ căn hộ chưa có bảo hiểm riêng, thiệt hại nội thất, thiết bị, tài sản trong nhà do chính chủ nhà gánh. Với PVI, chủ căn hộ có thể mua bảo hiểm tự nguyện theo Quy tắc Mọi rủi ro căn hộ chung cư.</p>
<figure class="kb-photo">${pic('can-ho-ven-song', { w: 1280, h: 720, alt: 'Hình ảnh minh họa: các tòa căn hộ cao tầng ven sông lúc chạng vạng, cửa sổ sáng đèn', sizes: '(max-width:900px) 92vw, 700px' })}<figcaption>Hình ảnh minh họa: khu căn hộ cao tầng ven sông ở TP.HCM, không phải ảnh thật của chung cư Happy Valley.</figcaption></figure>

<h2 id="can-ho">Bảo hiểm căn hộ chung cư của PVI bảo vệ những gì?</h2>
<p>Quy tắc Mọi rủi ro căn hộ chung cư của PVI (hiệu lực 05/12/2016) là sản phẩm tự nguyện, khác với bảo hiểm cháy, nổ bắt buộc. Phạm vi gồm các rủi ro:</p>
<ul>
<li>Cháy, nổ, sét đánh trực tiếp.</li>
<li>Giông, bão, lốc.</li>
<li>Nước tràn từ bể chứa, đường ống nước, hệ thống chữa cháy tự động.</li>
<li>Trộm cướp kèm dấu hiệu đột nhập hoặc bạo lực.</li>
<li>Động đất.</li>
</ul>

<h2 id="luu-y">Mua bảo hiểm căn hộ cần lưu ý gì để được bồi thường đủ?</h2>
<ul>
<li>Số tiền bảo hiểm là tổng giá trị tài sản được bảo hiểm theo giá trị thực tế. Nếu số tiền bảo hiểm nhỏ hơn 85% giá trị thay thế mới, người được bảo hiểm tự chịu một phần tổn thất theo tỷ lệ.</li>
<li>Quy tắc loại trừ thiệt hại khi căn hộ bị bỏ trống từ 15 ngày liên tục hoặc đang sửa chữa, cải tạo. Đi vắng dài ngày hoặc sửa nhà nên báo trước cho doanh nghiệp bảo hiểm.</li>
<li>Lập danh sách tài sản có giá trị và giữ hóa đơn, ảnh chụp để chứng minh khi giám định.</li>
</ul>

<h2 id="bat-buoc">Chung cư nào phải mua bảo hiểm cháy nổ bắt buộc, phí bao nhiêu?</h2>
<p>Chung cư, nhà ở tập thể cao từ 5 tầng trở lên hoặc có tổng diện tích sàn từ 1.000 m² phải mua bảo hiểm cháy, nổ bắt buộc (Phụ lục VII mục 1 Nghị định 105/2025/NĐ-CP). Chỉ cần đạt một trong hai điều kiện.</p>
<p>Theo Quy chế quản lý, sử dụng nhà chung cư kèm Thông tư 05/2024/TT-BXD (nguồn tổng hợp, chưa đối chiếu văn bản gốc), chủ đầu tư có trách nhiệm mua bảo hiểm cháy, nổ bắt buộc trong thời gian chưa chuyển quyền sở hữu cho chủ sở hữu nhà chung cư; giá dịch vụ quản lý vận hành không bao gồm kinh phí mua bảo hiểm này.</p>
<div class="kb-table" role="region" aria-label="Tỷ lệ phí tối thiểu bảo hiểm cháy nổ bắt buộc chung cư" tabindex="0"><table>
<thead><tr><th scope="col">Loại chung cư</th><th scope="col">Tỷ lệ phí tối thiểu/năm (chưa VAT)</th></tr></thead>
<tbody>
<tr><td>Chung cư, nhà ở tập thể, nhà đa năng có hệ thống chữa cháy tự động</td><td>0,05%</td></tr>
<tr><td>Nhóm trên không có hệ thống chữa cháy tự động</td><td>0,1%</td></tr>
</tbody></table></div>

<h2 id="khi-chay">Khi căn hộ bị cháy, cần làm gì để giữ quyền lợi bảo hiểm?</h2>
<ol class="kb-steps">
<li><b>Gọi 114.</b> Thoát bằng cầu thang bộ, không dùng thang máy.</li>
<li><b>Báo ban quản lý và doanh nghiệp bảo hiểm.</b> Với PVI, gọi tổng đài bồi thường 1900 54 54 58.</li>
<li><b>Giữ nguyên hiện trường.</b> Chụp ảnh, quay phim tài sản bị cháy, ám khói, ngấm nước trước khi dọn dẹp.</li>
<li><b>Xin biên bản.</b> Biên bản của cơ quan chức năng và ban quản lý về vụ cháy.</li>
<li><b>Chuẩn bị hồ sơ.</b> Giấy chứng nhận bảo hiểm, hóa đơn, danh sách tài sản để giám định viên xác định thiệt hại.</li>
</ol>
<p class="kb-hotline">Khi có sự cố, gọi tổng đài bồi thường Bảo hiểm PVI <a href="tel:1900545458">1900 54 54 58</a></p>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Hỏi bảo hiểm cho căn hộ hoặc tòa nhà của bạn</h2>
<p>Chủ căn hộ, ban quản trị chung cư nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> diện tích, số tầng, giá trị tài sản. PVI Thành Đô kiểm tra phần nào đã được bảo hiểm và báo phí phần còn thiếu.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
