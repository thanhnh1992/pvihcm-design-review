// Tin cháy nổ: vụ nổ khí gas số 110B-E4 tập thể Vĩnh Hồ, phố Nguyễn Văn Tuyết, phường Đống Đa, Hà Nội, sáng 24/11/2026
// (chủ site giao 25/11/2026). Dữ kiện lấy từ báo chí ngày 24–25/11/2026 (VTV, Nhân Dân, Tiền Phong, Hànộimới, Vietnamnet...),
// ghi rõ "sơ bộ" vì cơ quan điều tra chưa kết luận. Số thương vong các báo đưa khác nhau theo giờ: dùng số mới nhất
// có nguồn (7 người tử vong), số bị thương ghi "khoảng 10" vì các nguồn lệch nhau (9 đến 10).
// ẢNH: chủ site yêu cầu ảnh thật. Bản này tạm dùng ảnh minh họa có sẵn; CHƯA được merge khi chưa có ảnh thật
// do chủ site gửi (ảnh tự chụp hoặc được phép dùng, không lấy ảnh của báo khi chưa xin phép).
const CHAY_NO = '/san-pham/chay-no-bat-buoc/';
const TRACH_NHIEM = '/san-pham/bao-hiem-trach-nhiem/';
const TAI_NAN = '/san-pham/bao-hiem-tai-nan/';
const ANH_BIA = 'chay-no-hien-truong-sau-vu-no';

export const post = {
  slug: 'no-gas-pho-nguyen-van-tuyet-dong-da-ha-noi',
  date: '2026-11-25',
  dateText: '25/11/2026',
  cat: 'Tin tức · Cháy nổ',
  title: 'Vụ nổ khí gas phố Nguyễn Văn Tuyết, Hà Nội: 7 người tử vong và bài học cho quán ăn đang cải tạo',
  lead: 'Khoảng 8 giờ sáng 24/11/2026, một vụ nổ xảy ra tại nhà số 110B-E4 tập thể Vĩnh Hồ, phố Nguyễn Văn Tuyết, phường Đống Đa, Hà Nội, làm 7 người tử vong. Theo kết quả điều tra sơ bộ của Công an Hà Nội, căn nhà đang được cải tạo làm quán ăn, khí gas rò rỉ gặp nguồn nhiệt gây cháy, nổ.',
  image: `/assets/${ANH_BIA}.webp`,
  imageWidth: 1200,
  imageHeight: 800,
  alt: 'Lực lượng chức năng kiểm tra hiện trường đổ nát sau một vụ nổ',
  readMin: 6,
  schemaType: 'NewsArticle',
};

export const crumb = 'Tin tức cháy nổ';
export const hero = { name: ANH_BIA, w: 1200, h: 800, caption: 'Ảnh minh họa, không phải hiện trường phố Nguyễn Văn Tuyết. Ảnh thật sẽ được cập nhật.' };
export const seo = {
  title: 'Vụ nổ khí gas phố Nguyễn Văn Tuyết, Hà Nội: bài học an toàn | PVI',
  description: 'Vụ nổ khí gas sáng 24/11/2026 tại phố Nguyễn Văn Tuyết, Đống Đa làm 7 người tử vong. Nguyên nhân sơ bộ, khuyến cáo của cảnh sát PCCC và bảo hiểm nào chi trả khi nổ gas.',
};

export const toc = [
  ['dien-bien', 'Diễn biến vụ nổ'],
  ['nguyen-nhan', 'Nguyên nhân sơ bộ'],
  ['vi-sao', 'Vì sao khí gas nổ mạnh như vậy'],
  ['khuyen-cao', 'Khuyến cáo của cảnh sát PCCC'],
  ['bao-hiem', 'Bảo hiểm nào chi trả khi nổ gas'],
  ['quan-an', 'Quán ăn đang cải tạo cần lưu ý'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Nổ khí gas có được bảo hiểm cháy nổ bắt buộc bồi thường không?', answer: 'Nổ là một trong các rủi ro được bảo hiểm theo Quy tắc bảo hiểm cháy, nổ bắt buộc ban hành kèm Nghị định 67/2023/NĐ-CP. Thiệt hại về tài sản của cơ sở đã mua bảo hiểm được xem xét bồi thường, trừ các trường hợp loại trừ ghi trong quy tắc như hành vi cố ý gây cháy, nổ. Kết luận cuối cùng dựa trên hồ sơ giám định và hợp đồng cụ thể.' },
  { question: 'Nhà hàng xóm bị hư hỏng vì vụ nổ thì ai bồi thường?', answer: 'Bảo hiểm cháy nổ bắt buộc bảo vệ tài sản của chính cơ sở mua bảo hiểm, không trả cho nhà bên cạnh. Thiệt hại của người khác do cơ sở gây ra là trách nhiệm dân sự của chủ cơ sở; muốn có nguồn tiền chi trả phần này cần mua thêm bảo hiểm trách nhiệm công cộng hoặc trách nhiệm đối với bên thứ ba.' },
  { question: 'Người bị thương, tử vong trong vụ nổ có được bảo hiểm cháy nổ chi trả không?', answer: 'Không. Bảo hiểm cháy nổ bắt buộc chỉ bảo hiểm tài sản. Thương tật, tử vong của con người được chi trả qua bảo hiểm tai nạn hoặc bảo hiểm sức khỏe của từng người, hoặc qua trách nhiệm bồi thường của bên gây thiệt hại.' },
  { question: 'Ngửi thấy mùi gas thì làm gì đầu tiên?', answer: 'Không bật, tắt bất kỳ công tắc điện, quạt, đèn nào và không dùng lửa. Khóa van bình gas nếu tiếp cận được an toàn, mở cửa cho thông gió, đưa mọi người ra ngoài, rồi gọi 114 từ khu vực an toàn. Không quay lại khi chưa được lực lượng chức năng xác nhận an toàn.' },
];

export const sources = [
  ['Công an Hà Nội thông tin nguyên nhân vụ nổ tại phố Nguyễn Văn Tuyết, 24/11/2026', 'https://vtv.vn/cong-an-ha-noi-thong-tin-nguyen-nhan-vu-no-tai-pho-nguyen-van-tuyet-100261124202507474.htm', 'VTV'],
  ['Hà Nội: Xác định nguyên nhân vụ nổ trên phố Nguyễn Văn Tuyết', 'https://nhandan.vn/ha-noi-xac-dinh-nguyen-nhan-vu-no-tren-pho-nguyen-van-tuyet-post1005179.html', 'Báo Nhân Dân'],
  ['Thông tin mới về nguyên nhân vụ nổ làm 7 người tử vong ở Hà Nội', 'https://tienphong.vn/thong-tin-moi-ve-nguyen-nhan-vu-no-lam-7-nguoi-tu-vong-o-ha-noi-post1897187.tpo', 'Báo Tiền Phong'],
  ['Thủ tướng yêu cầu khẩn trương khắc phục hậu quả, điều tra vụ nổ tại Hà Nội', 'https://tienphong.vn/thu-tuong-yeu-cau-khan-truong-khac-phuc-hau-qua-dieu-tra-vu-no-tai-ha-noi-post1897111.tpo', 'Báo Tiền Phong'],
  ['Sau vụ nổ khí gas ở Hà Nội, Cục Cảnh sát PCCC và CNCH đưa khuyến cáo quan trọng', 'https://vietnamnet.vn/sau-vu-no-khi-gas-o-ha-noi-cuc-canh-sat-pccc-khuyen-cao-2578258.html', 'VietNamNet'],
  ['Từ vụ nổ tại phố Nguyễn Văn Tuyết: Cảnh giác nguy cơ cháy, nổ khi sử dụng gas', 'https://hanoimoi.vn/tu-vu-no-tai-pho-nguyen-van-tuyet-canh-giac-nguy-co-chay-no-khi-su-dung-gas-1767516.html', 'Báo Hànộimới'],
  ['Chương III Nghị định 67/2023/NĐ-CP về bảo hiểm cháy, nổ bắt buộc; Phụ lục VII Nghị định 105/2025/NĐ-CP', '', 'Chính phủ'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', w: 1280, h: 853, k: 'Sản phẩm', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Tra cứu cơ sở có thuộc diện phải mua, xem biểu phí và tính phí tham khảo.' },
  { href: TRACH_NHIEM, img: 'tu-van-doanh-nghiep', w: 1280, h: 853, k: 'Sản phẩm', title: 'Bảo hiểm trách nhiệm', text: 'Chi trả thiệt hại cơ sở gây ra cho người và tài sản xung quanh.' },
];

export function body() {
  return `
<p class="kb-first"><b>Tóm tắt:</b> sáng 24/11/2026, căn nhà số 110B-E4 tập thể Vĩnh Hồ, phố Nguyễn Văn Tuyết (phường Đống Đa, Hà Nội) phát nổ khi đang được cải tạo làm quán ăn. Vụ nổ làm 7 người tử vong, khoảng 10 người bị thương, làm sập một phần công trình và hư hại nhiều nhà xung quanh. Nguyên nhân sơ bộ là khí gas rò rỉ gặp nguồn nhiệt. Bài viết tóm tắt diễn biến theo thông tin chính thức và nêu những điểm chủ quán, chủ nhà cần biết về an toàn gas và <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a>.</p>

<h2 id="dien-bien">Diễn biến vụ nổ ở phố Nguyễn Văn Tuyết</h2>
<p>Vụ nổ xảy ra khoảng 8 giờ sáng 24/11/2026 tại nhà số 110B-E4, khu tập thể Vĩnh Hồ. Sức ép làm đổ sập một phần căn nhà một tầng phía sau nhà tập thể E4, nhiều công trình lân cận bị hư hại cửa, tường và mái.</p>
<p>Số thương vong được cập nhật nhiều lần trong ngày. Các bản tin buổi chiều ghi 6 người tử vong, 10 người bị thương. Tối 24/11, Bệnh viện Đa khoa Xanh Pôn cho biết một nữ nạn nhân 24 tuổi được đưa vào trong tình trạng rất nặng đã tử vong, nâng số người chết lên 7.</p>
<p>Cùng ngày, Thủ tướng Chính phủ ban hành Công điện số 75/CĐ-TTg yêu cầu Hà Nội khẩn trương khắc phục hậu quả, chăm lo cho người bị nạn và điều tra làm rõ nguyên nhân. Lãnh đạo thành phố yêu cầu rà soát các công trình mất an toàn trong khu vực.</p>

<h2 id="nguyen-nhan">Nguyên nhân sơ bộ: khí gas rò rỉ gặp nguồn nhiệt</h2>
<p>Theo Công an TP Hà Nội, căn nhà số 110B-E4 đang được cải tạo, sửa chữa để làm quán ăn. Khí gas bị rò rỉ, hòa trộn với oxy trong không khí, gặp nguồn nhiệt thích hợp dẫn đến cháy, nổ. Đây là kết luận sơ bộ; cơ quan điều tra đang tiếp tục làm rõ nguồn gas, thời điểm rò rỉ và nguồn gây cháy.</p>
<p>Một số bản tin đầu tiên ghi địa chỉ và số thương vong khác. Bài này dùng thông tin của Công an Hà Nội và các báo cập nhật tối 24/11, ngày 25/11/2026.</p>

<h2 id="vi-sao">Vì sao khí gas nổ mạnh như vậy?</h2>
<p>Khí gas dân dụng (LPG) nặng hơn không khí. Khi rò rỉ trong phòng kín, gas không bay lên mà lắng xuống sát sàn, len vào gầm bếp, hốc tường, tầng hầm. Khi nồng độ gas trong không khí ở khoảng chừng vài phần trăm, chỉ một tia lửa nhỏ cũng đủ kích nổ cả khối khí.</p>
<p>Nguồn kích nổ thường rất bình thường: công tắc đèn, quạt, tủ lạnh tự đóng điện, bật lửa, máy cắt, máy hàn. Nhà đang cải tạo càng nhiều nguy cơ vì thợ dùng máy mài, máy hàn, điện tạm, trong khi đường ống, van, dây dẫn gas có thể đang tháo lắp dở dang và không ai kiểm soát.</p>
<p>Năng lượng của vụ nổ gas trong không gian kín đẩy tường, cửa và mái ra ngoài. Vì vậy thiệt hại không dừng ở căn nhà có gas mà lan sang nhà hàng xóm, người đi đường, xe cộ, như đã xảy ra ở phố Nguyễn Văn Tuyết.</p>

<h2 id="khuyen-cao">Khuyến cáo của Cục Cảnh sát PCCC và CNCH sau vụ nổ</h2>
<ul>
<li>Chỉ mua, đổi bình gas ở cửa hàng đủ điều kiện; kiểm tra nhãn, niêm phong và tình trạng vỏ bình. Không dùng bình không rõ nguồn gốc hoặc có dấu hiệu bị can thiệp.</li>
<li>Đặt bình thẳng đứng ở nơi thông thoáng, không đặt trong hầm, hố hoặc chỗ thấp, kín gió; không tự ý đấu nối thêm bình.</li>
<li>Cơ sở kinh doanh kiểm tra hệ thống cấp gas, van khóa, bộ điều áp, dây dẫn và mối nối trước khi vận hành; khóa van tổng khi nghỉ.</li>
<li>Khi nghi rò rỉ: tuyệt đối không bật, tắt công tắc điện, cầu dao, quạt; không hút thuốc, không tạo tia lửa. Ra ngoài an toàn rồi mới gọi 114, không quay lại khi chưa được xác nhận an toàn.</li>
</ul>

<h2 id="bao-hiem">Khi nổ gas, bảo hiểm nào chi trả cho phần nào?</h2>
<p>Một vụ nổ như ở Đống Đa gây ba loại thiệt hại khác nhau, và mỗi loại cần một loại bảo hiểm khác nhau. Đây là điểm nhiều chủ nhà, chủ quán chỉ nhận ra sau khi sự cố đã xảy ra.</p>
<div class="kb-table" role="region" aria-label="Thiệt hại khi nổ gas và loại bảo hiểm tương ứng" tabindex="0"><table>
<thead><tr><th scope="col">Thiệt hại</th><th scope="col">Bảo hiểm liên quan</th><th scope="col">Lưu ý</th></tr></thead>
<tbody>
<tr><td>Nhà, máy móc, hàng hóa của chính cơ sở</td><td>Bảo hiểm cháy nổ bắt buộc hoặc bảo hiểm tài sản</td><td>Nổ là rủi ro được bảo hiểm theo Nghị định 67/2023/NĐ-CP; cần kê khai đúng địa điểm, công năng và giá trị tài sản.</td></tr>
<tr><td>Nhà, xe, tài sản của hàng xóm, người đi đường</td><td><a class="kb-link" href="${TRACH_NHIEM}">Bảo hiểm trách nhiệm</a> (công cộng, bên thứ ba)</td><td>Bảo hiểm cháy nổ của cơ sở không trả cho tài sản người khác; đây là trách nhiệm dân sự của chủ cơ sở.</td></tr>
<tr><td>Thương tật, tử vong của con người</td><td><a class="kb-link" href="${TAI_NAN}">Bảo hiểm tai nạn</a>, bảo hiểm sức khỏe</td><td>Bảo hiểm cháy nổ bắt buộc không bảo hiểm cho người.</td></tr>
</tbody></table></div>
<p>Nhà đang cải tạo, sửa chữa còn một điểm riêng: phần việc thi công và vật tư đang lắp đặt thường thuộc phạm vi của bảo hiểm công trình, không phải bảo hiểm cháy nổ của tài sản đang sử dụng. Trước khi khởi công, chủ nhà nên hỏi đơn vị bảo hiểm phần nào đang được bảo vệ trong thời gian thi công.</p>

<h2 id="quan-an">Quán ăn, nhà hàng đang cải tạo cần lưu ý gì?</h2>
<ol>
<li><strong>Tách việc thi công khỏi hệ thống gas.</strong> Khóa van, tháo bình hoặc cô lập đường ống trước khi thợ hàn, cắt, mài. Không để bình gas trong khu vực đang thi công.</li>
<li><strong>Lắp hệ thống gas bởi đơn vị có chuyên môn.</strong> Dùng van, dây dẫn, bộ điều áp đúng chuẩn; thử kín trước khi đưa vào dùng; lắp đầu báo rò rỉ gas ở vị trí thấp gần sàn.</li>
<li><strong>Kiểm tra diện phải mua bảo hiểm cháy nổ bắt buộc.</strong> Nhà hàng, quán ăn có quy mô thuộc danh mục tại Phụ lục VII Nghị định 105/2025/NĐ-CP phải mua; các quán nhỏ hơn không bắt buộc nhưng vẫn nên cân nhắc vì thiệt hại một vụ nổ thường vượt xa phí bảo hiểm một năm.</li>
<li><strong>Mua kèm bảo hiểm trách nhiệm.</strong> Quán ăn ở khu dân cư, tập thể đông người là nơi thiệt hại cho bên thứ ba có thể rất lớn.</li>
</ol>
<p>Cần tư vấn cho quán ăn, nhà hàng hoặc nhà đang cải tạo, gọi PVI Thành Đô <a class="kb-link" href="tel:0938072236">0938 072 236</a>. Khi xảy ra sự cố, khách hàng PVI gọi tổng đài bồi thường <a class="kb-link" href="tel:1900545458">1900 54 54 58</a>.</p>`;
}
