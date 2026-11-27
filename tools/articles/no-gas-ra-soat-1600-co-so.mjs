// Tin: nổ gas ở TP.HCM (13/11/2026) và Hà Nội (24/11/2026); Công an TP.HCM rà soát hơn 1.600 cơ sở kinh doanh khí hóa lỏng
// (chủ site giao 27/11/2026, theo bài Tuổi Trẻ trên Facebook). Đăng cả hai site (chủ site 27/11/2026): bản chuẩn ở baohiempvi-vn.com
// (quy tắc baohiempvi cấm canonical ra ngoài), trang này khai canonical về đó như bài massage. Ảnh đại diện nằm ngang phần mô tả (besideTitle).
// Dữ kiện theo Tuổi Trẻ, VOH, Báo Đầu tư, Tiền Phong, Dân trí, VnExpress, Báo Chính phủ; nguồn ghi bằng chữ, không link ra ngoài.
// Thương vong thay đổi theo giờ cập nhật: ghi "ít nhất" kèm mốc thời gian và nguồn. Không nêu tên chủ cửa hàng.
// Biểu phí gói cửa hàng lấy từ tools/data/product.mjs (gói "Bảo hiểm cháy nổ cửa hàng, hộ kinh doanh" đang đăng trên site).
// Ảnh: dùng tạm ảnh của site (ElevenLabs hết credit 27/11/2026); câu lệnh tạo ảnh riêng ở cuối file.
import { ZALO_TU_VAN } from './khu-vuc.mjs';
import { articleSrcset } from '../chrome.mjs';

export const post = {
  slug: 'no-gas-tphcm-ha-noi-ra-soat-1600-co-so-kinh-doanh-gas',
  date: '2026-11-27',
  dateText: '27/11/2026',
  cat: 'Tin tức · Cháy nổ',
  title: 'Nổ gas ở TP.HCM và Hà Nội: TP.HCM rà soát hơn 1.600 cơ sở kinh doanh gas, cửa hàng và quán ăn cần làm gì',
  lead: 'Sau vụ nổ cửa hàng gas ở phường Tân Thuận ngày 13/11 và vụ nổ khí gas tại quán ăn ở Hà Nội ngày 24/11/2026, Công an TP.HCM tổng rà soát hơn 1.600 cơ sở kinh doanh khí hóa lỏng, tập trung vào điểm sang chiết trái phép. Cửa hàng, quán ăn dùng gas nên kiểm tra lại an toàn và bảo hiểm cháy nổ ngay.',
  image: '/assets/chay-no-hien-truong-sau-vu-no.webp',
  alt: 'Cảnh sát PCCC và CNCH đưa bình gas ra khỏi đống đổ nát của một cửa hàng sau vụ nổ',
  readMin: 6,
  schemaType: 'NewsArticle',
  canonical: 'https://www.baohiempvi-vn.com/kien-thuc/no-gas-tphcm-ha-noi-ra-soat-1600-co-so-kinh-doanh-gas',
};

export const crumb = 'Tin tức cháy nổ';
export const hero = { name: 'chay-no-hien-truong-sau-vu-no', w: 1200, h: 800, position: '50% 45%', besideTitle: true, caption: 'Lực lượng Cảnh sát PCCC và CNCH đưa bình gas ra khỏi đống đổ nát sau một vụ nổ cửa hàng gas. Ảnh minh họa, không phải ảnh của từng vụ việc trong bài.' };
export const seo = {
  title: 'Nổ gas TP.HCM, Hà Nội: rà soát 1.600 cơ sở gas | PVI',
  description: 'TP.HCM rà soát hơn 1.600 cơ sở kinh doanh gas sau vụ nổ ở Tân Thuận và Hà Nội. Cửa hàng, quán ăn dùng gas cần kiểm tra gì, bảo hiểm cháy nổ phí bao nhiêu.',
};

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';
const BAO_GIA_GAS = '/san-pham/chay-no-bat-buoc/#bao-gia-xang-gas';

export const toc = [
  ['tan-thuan', 'Vụ nổ ở Tân Thuận, TP.HCM'],
  ['ha-noi', 'Vụ nổ ở Hà Nội'],
  ['ra-soat', 'TP.HCM rà soát 1.600 cơ sở'],
  ['kiem-tra', 'Cửa hàng, quán ăn cần kiểm tra gì'],
  ['bao-hiem', 'Bảo hiểm cháy nổ cho cửa hàng gas'],
  ['su-co', 'Khi có sự cố cần làm gì'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Vì sao TP.HCM rà soát hơn 1.600 cơ sở kinh doanh gas?', answer: 'Sau vụ nổ cửa hàng gas ở phường Tân Thuận ngày 13/11/2026, Công an TP.HCM tổng rà soát hơn 1.600 cơ sở kinh doanh khí hóa lỏng, tập trung vào điểm sang chiết trái phép và cơ sở nằm xen trong khu dân cư. Cơ sở không bảo đảm an toàn bị đình chỉ hoạt động.' },
  { question: 'Thấy điểm kinh doanh gas có dấu hiệu vi phạm thì báo ở đâu?', answer: 'Theo Công an TP.HCM, người dân phản ánh qua số 114 hoặc số 098.348.1400 của Phòng Cảnh sát PCCC và CNCH (PC07).' },
  { question: 'Cửa hàng gas có phải mua bảo hiểm cháy nổ bắt buộc không?', answer: 'Phụ thuộc cơ sở có thuộc danh mục tại Phụ lục VII Nghị định 105/2025/NĐ-CP (sửa bởi Nghị định 347/2026/NĐ-CP) hay không, căn cứ công năng và quy mô. Không thuộc diện bắt buộc thì vẫn nên mua bảo hiểm cháy tự nguyện cho tài sản và hàng hóa.' },
  { question: 'Bảo hiểm cháy nổ cho cửa hàng gas phí bao nhiêu?', answer: 'Với gói cửa hàng, hộ kinh doanh của Bảo hiểm PVI, cửa hàng gas và xăng dầu có tỷ lệ phí 0,3%/năm: tài sản 1 tỷ đồng đóng 3.300.000 đồng đã gồm VAT, mức khấu trừ 4 triệu đồng mỗi vụ, số tiền bảo hiểm tới 2 tỷ đồng chỉ cần kê khai.' },
  { question: 'Nhà bên cạnh bị hư hại do cửa hàng mình nổ gas thì bảo hiểm cháy có trả không?', answer: 'Bảo hiểm cháy bảo vệ tài sản của chính cơ sở được bảo hiểm. Thiệt hại của nhà bên cạnh, người đi đường thuộc trách nhiệm dân sự của chủ cơ sở; muốn được bảo vệ phần này, cần hỏi thêm bảo hiểm trách nhiệm đối với bên thứ ba.' },
];

export const sources = [
  ['TP.HCM tổng rà soát hơn 1.600 cơ sở kinh doanh gas, siết an toàn PCCC dịp cuối năm', '', 'Báo Tuổi Trẻ, VOH, Báo Đầu tư · 11/2026'],
  ['TP.HCM phát hiện 2 điểm kinh doanh gas không phép, có 103 bình', '', 'Báo Tuổi Trẻ · 25/11/2026'],
  ['Thông tin về vụ nổ do khí gas làm sập nhà trên địa bàn phường Tân Thuận; Đã có 3 người tử vong trong vụ nổ cửa hàng gas ở TP.HCM', '', 'Báo Chính phủ · 13/11/2026; Báo Tiền Phong · 14/11/2026'],
  ['Vụ nổ tại cửa hàng gas ở Tân Thuận: có thể khởi tố hình sự những cá nhân liên quan', '', 'Báo Tuổi Trẻ · 19/11/2026'],
  ['Vụ nổ khí gas ở phố Nguyễn Văn Tuyết, Hà Nội', '', 'Báo Dân trí, VnExpress · 24/11/2026'],
  ['Nghị định 105/2025/NĐ-CP (Phụ lục VII), sửa đổi bởi Nghị định 347/2026/NĐ-CP', '', 'Chính phủ'],
  ['Bảo hiểm cháy nổ bắt buộc và báo giá cho cửa hàng gas', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Tra cứu loại cơ sở, báo giá cho cửa hàng gas, trạm xăng và tính phí tham khảo.' },
  { href: '/tin-tuc/chay-tiem-massage-le-van-luong-bao-hiem-chay-no/', img: 'chay-massage-hien-truong', k: 'Tin cháy nổ', title: 'Cháy tiệm massage Lê Văn Lương', text: 'Bài học bảo hiểm cháy nổ cho cửa hàng, hộ kinh doanh nhỏ.' },
];

const photo = (name, w, h, alt, caption) =>
  `<figure class="kb-photo"><img src="/assets/${name}.webp"${articleSrcset(name, w)} width="${w}" height="${h}" alt="${alt}" loading="lazy" decoding="async"><figcaption>${caption}</figcaption></figure>`;

export function body({ ctaRow }) {
  return `
<h2 id="tan-thuan">Vụ nổ cửa hàng gas ở phường Tân Thuận, TP.HCM</h2>
<p>Khoảng 10 giờ 30 sáng 13/11/2026, một cửa hàng kinh doanh gas trên đường Bùi Văn Ba, phường Tân Thuận, TP.HCM phát nổ, làm sập hoàn toàn hai căn nhà. Nhiều người bị vùi dưới đống đổ nát, trong đó có nhân viên đang làm việc tại cửa hàng.</p>
<p>Theo Báo Tiền Phong, đến chiều 14/11 vụ nổ làm ít nhất 3 người tử vong và khoảng 10 người bị thương. Ngày 19/11, Công an TP.HCM cho biết có thể khởi tố hình sự những cá nhân liên quan. Đợt rà soát sau đó tập trung vào hoạt động sang chiết gas trái phép.</p>

<h2 id="ha-noi">Vụ nổ khí gas tại quán ăn ở Hà Nội</h2>
<p>Khoảng 8 giờ sáng 24/11/2026, khu bếp gas của một quán lẩu đang chuẩn bị khai trương trên phố Nguyễn Văn Tuyết, phường Đống Đa, Hà Nội phát nổ, làm sập một phần căn nhà. Công an Hà Nội bước đầu nghi do nổ khí gas.</p>
<p>Theo Sở Y tế Hà Nội, tính đến 13 giờ cùng ngày có 16 nạn nhân, trong đó 6 người tử vong; một số báo sau đó ghi nhận số người tử vong tăng thêm. Đây là vụ nổ khí gas lớn thứ hai trong nửa tháng, sau vụ ở phường Tân Thuận.</p>

<h2 id="ra-soat">TP.HCM tổng rà soát hơn 1.600 cơ sở kinh doanh gas</h2>
<p>Công an TP.HCM giao Phòng Cảnh sát PCCC và CNCH (PC07) chủ trì, phối hợp công an cấp xã rà soát, kiểm tra hơn 1.600 cơ sở kinh doanh khí hóa lỏng. Trọng tâm là điểm sang chiết gas trái phép và cơ sở nằm xen trong khu dân cư.</p>
<p>Cơ sở không bảo đảm an toàn bị đình chỉ hoạt động; trường hợp đủ yếu tố cấu thành tội phạm sẽ được đề xuất xử lý hình sự. Trong đợt kiểm tra đột xuất ngày 25/11 ở phường Hòa Bình, lực lượng chức năng phát hiện 2 điểm kinh doanh gas không phép với tổng cộng 103 bình gas.</p>
<div class="kb-table" role="region" aria-label="Tóm tắt đợt rà soát" tabindex="0"><table>
<thead><tr><th scope="col">Nội dung</th><th scope="col">Thông tin đã công bố</th></tr></thead>
<tbody>
<tr><td>Phạm vi</td><td>Hơn 1.600 cơ sở kinh doanh khí hóa lỏng trên địa bàn TP.HCM</td></tr>
<tr><td>Đơn vị chủ trì</td><td>Phòng Cảnh sát PCCC và CNCH (PC07), phối hợp công an cấp xã</td></tr>
<tr><td>Trọng tâm</td><td>Điểm sang chiết gas trái phép, cơ sở xen trong khu dân cư</td></tr>
<tr><td>Xử lý vi phạm</td><td>Đình chỉ cơ sở không bảo đảm an toàn; đủ yếu tố thì đề xuất xử lý hình sự</td></tr>
<tr><td>Kết quả ngày 25/11</td><td>2 điểm kinh doanh không phép, 103 bình gas tại phường Hòa Bình</td></tr>
<tr><td>Kênh phản ánh</td><td>114 hoặc 098.348.1400 (Phòng PC07)</td></tr>
</tbody></table></div>
<p>Từ nay đến hết năm, lực lượng PCCC thành phố tăng cường kiểm tra an toàn tại khu dân cư, cơ sở sản xuất, kinh doanh, khu chế xuất và khu công nghiệp, nhất là dịp cuối năm và mùa khô.</p>

<h2 id="kiem-tra">Cửa hàng, quán ăn dùng gas cần kiểm tra gì ngay?</h2>
<p>Cả hai vụ nổ đều xảy ra ở nơi kinh doanh có nhiều bình gas hoặc bếp gas công suất lớn, giữa khu dân cư đông người. Trước đợt kiểm tra, chủ cửa hàng gas và quán ăn nên tự rà lại những điểm sau:</p>
<ul>
<li>Chỉ mua gas từ cửa hàng, đại lý có giấy phép; không nhận gas sang chiết, bình không rõ nguồn gốc.</li>
<li>Kiểm tra van, dây dẫn, bộ điều áp; thay dây cũ, nứt; bình phải còn hạn kiểm định.</li>
<li>Đặt bình gas ở nơi thông thoáng, xa nguồn nhiệt; không dồn nhiều bình trong bếp kín hay dưới gầm cầu thang.</li>
<li>Lắp đầu báo rò rỉ khí gas và để sẵn bình chữa cháy ở khu bếp, khu chứa gas.</li>
<li>Ngửi thấy mùi gas: khóa van bình, mở cửa cho thoáng, không bật hoặc tắt công tắc điện, không dùng lửa, ra khỏi khu vực rồi gọi 114.</li>
<li>Hướng dẫn nhân viên cách khóa van tổng, sơ tán và báo cháy; giữ hồ sơ phòng cháy chữa cháy của cơ sở đầy đủ.</li>
</ul>

<h2 id="bao-hiem">Bảo hiểm cháy nổ cho cửa hàng gas, quán ăn</h2>
<p>Cơ sở thuộc danh mục tại Phụ lục VII Nghị định 105/2025/NĐ-CP (sửa bởi Nghị định 347/2026/NĐ-CP) phải mua <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a>. Cửa hàng, quán ăn có thuộc diện hay không phụ thuộc công năng và quy mô; không thuộc diện thì vẫn nên mua bảo hiểm cháy tự nguyện, vì nhà, máy móc và hàng tồn là tài sản lớn nhất của hộ kinh doanh.</p>
<p>Với cơ sở nhỏ, Bảo hiểm PVI có gói cửa hàng, hộ kinh doanh: số tiền bảo hiểm tới 2 tỷ đồng chỉ cần kê khai giá trị tài sản là cấp đơn, không phải khảo sát tại chỗ. Bảo vệ kết cấu, máy móc, thiết bị, nội thất và hàng tồn trước cháy, nổ, sét đánh trực tiếp.</p>
<div class="kb-table" role="region" aria-label="Phí gói cửa hàng, hộ kinh doanh" tabindex="0"><table>
<thead><tr><th scope="col">Loại cửa hàng</th><th scope="col">Tỷ lệ phí năm</th><th scope="col">Ví dụ tài sản 1 tỷ đồng</th></tr></thead>
<tbody>
<tr><td>Cửa hàng gas, xăng dầu</td><td>0,3%</td><td>3.300.000 đồng đã gồm VAT</td></tr>
<tr><td>Quán ăn, cà phê, bán lẻ</td><td>0,2%</td><td>2.200.000 đồng đã gồm VAT</td></tr>
<tr><td>Karaoke</td><td>0,4%</td><td>4.400.000 đồng đã gồm VAT</td></tr>
</tbody></table></div>
<p>Mức khấu trừ 4 triệu đồng mỗi vụ tổn thất. Số tiền bảo hiểm trên 2 tỷ đồng phải thẩm định riêng. Xem <a class="kb-link" href="${BAO_GIA_GAS}">báo giá cho cửa hàng gas, trạm xăng</a> để ước tính phí.</p>
<p>Lưu ý hai điểm. Thứ nhất, bảo hiểm cháy trả cho tài sản của chính cơ sở; thiệt hại của nhà bên cạnh, người đi đường thuộc trách nhiệm dân sự của chủ cơ sở, cần hỏi thêm bảo hiểm trách nhiệm đối với bên thứ ba. Thứ hai, kinh doanh không phép hay vi phạm quy định phòng cháy có thể ảnh hưởng quyền lợi bồi thường; đọc kỹ phần loại trừ trên giấy chứng nhận.</p>

</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Nhận báo phí bảo hiểm cháy nổ cho cửa hàng</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> loại cửa hàng, địa chỉ và giá trị tài sản, hàng tồn. PVI Thành Đô gửi báo phí trước khi anh chị quyết định.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
<h2 id="su-co">Khi có sự cố cháy nổ gas cần làm gì?</h2>
<ol class="kb-steps">
<li><b>An toàn trước.</b> Sơ tán người ra khỏi khu vực, gọi 114. Không quay lại lấy tài sản.</li>
<li><b>Báo bảo hiểm trong ngày.</b> Gọi tổng đài bồi thường PVI 1900 54 54 58 hoặc đầu mối ghi trên giấy chứng nhận.</li>
<li><b>Giữ hiện trường.</b> Chụp ảnh, giữ nguyên tài sản hư hỏng cho tới khi giám định viên đến.</li>
<li><b>Giữ giấy tờ.</b> Biên bản của cơ quan phòng cháy chữa cháy, hóa đơn hàng hóa, sổ sách tài sản để làm hồ sơ bồi thường.</li>
</ol>
${photo('pccc-goi-114', 1280, 853, 'Người quản lý gọi điện báo cháy trước tòa nhà văn phòng, nhân viên đang sơ tán phía sau', 'Hình ảnh mô phỏng: người quản lý gọi 114, báo địa chỉ và tình hình trong lúc nhân viên sơ tán.')}
`;
}

/* Câu lệnh tạo ảnh riêng cho bài (chủ site render, kèm metadata):
   1) Ảnh đại diện 1200x630: "Candid photo shot on iPhone 16 Pro: inside a small neighborhood LPG gas cylinder shop in Ho Chi Minh City,
      a Vietnamese safety inspector in a plain dark-blue work jacket (no badges, no logos) checks the valve of a grey gas cylinder with a
      flashlight while the shop owner stands beside him; rows of plain unbranded cylinders, red fire extinguisher near the door. Natural
      daylight, documentary feel. No text, no logos, no readable labels, no fire, no injuries."
   2) Ảnh trong bài 1200x800: "Candid photo shot on iPhone 16 Pro: kitchen of a small Vietnamese hotpot restaurant before opening, a cook's
      hand turning off the regulator valve on a plain LPG cylinder connected by a short new hose to a stainless gas stove; a white gas leak
      detector mounted low on the tiled wall; fire extinguisher nearby. Clean, natural light. No text, no logos, no flames, no faces." */
