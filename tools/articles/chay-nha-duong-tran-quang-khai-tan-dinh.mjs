const CHAY_NO = '/san-pham/chay-no-bat-buoc/';
const QUY_DINH = '/tin-tuc/nghi-dinh-347-2026-chay-no-bat-buoc/';
const ANH_HIEN_TRUONG = 'tn-chay-tan-dinh-tran-quang-khai';
const NGUON_ANH = 'Ảnh do người gửi cung cấp';
const KICH_THUOC_ANH_BIA = { w: 1173, h: 616 };

export const post = {
  slug: 'chay-nha-duong-tran-quang-khai-tan-dinh',
  date: '2026-11-23',
  dateText: '23/11/2026',
  cat: 'Tin tức · Cháy nổ',
  title: 'Cháy nhà đường Trần Quang Khải, phường Tân Định',
  lead: 'Sáng 23/11/2026, lửa bùng lên ở sân thượng một căn nhà trên đường Trần Quang Khải, phường Tân Định, TP.HCM. Người trong nhà thoát ra an toàn, nhiều tài sản bị thiêu rụi. Chủ nhà kết hợp kinh doanh có thể tra cứu diện phải mua bảo hiểm cháy nổ bắt buộc theo hướng dẫn dưới đây.',
  image: `/assets/${ANH_HIEN_TRUONG}.webp`,
  imageWidth: KICH_THUOC_ANH_BIA.w,
  imageHeight: KICH_THUOC_ANH_BIA.h,
  alt: 'Xe chữa cháy phun nước về phía căn nhà đang bốc lửa trên đường Trần Quang Khải',
  readMin: 3,
  schemaType: 'NewsArticle',
};

export const crumb = 'Tin tức cháy nổ';
export const hero = {
  name: ANH_HIEN_TRUONG,
  ...KICH_THUOC_ANH_BIA,
  caption: `Ảnh thực tế: Xe chữa cháy phun nước từ đường Trần Quang Khải, phường Tân Định, sáng 23/11/2026 · Nguồn: ${NGUON_ANH}.`,
};
export const seo = {
  title: 'Cháy nhà đường Trần Quang Khải, Tân Định | PVI Thành Đô',
  description: 'Cháy nhà trên đường Trần Quang Khải, phường Tân Định, TP.HCM sáng 23/11/2026. Xem diễn biến và cách tra cứu bảo hiểm cháy nổ bắt buộc cho nhà kết hợp kinh doanh.',
};

export const toc = [
  ['dien-bien', 'Diễn biến vụ cháy ở Tân Định'],
  ['dien-bat-buoc', 'Nhà kết hợp kinh doanh có phải mua?'],
  ['boi-thuong', 'Tài sản nào được xem xét bồi thường?'],
  ['sau-vu-chay', 'Việc cần làm sau vụ cháy'],
  ['san-pham', 'Tra cứu sản phẩm và biểu phí'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
  ['nguon', 'Nguồn tham chiếu'],
];

export const faqs = [
  {
    question: 'Vụ cháy trên đường Trần Quang Khải có ai bị thương không?',
    answer: 'Theo Tuổi Trẻ và Sài Gòn Giải Phóng ngày 23/11/2026, những người trong nhà đã thoát ra ngoài và vụ cháy không gây thương vong. Lửa làm hư hại nhiều tài sản ở khu vực sân thượng. Ở thời điểm báo chí đưa tin, cơ quan chức năng đang xác minh nguyên nhân và thống kê thiệt hại.',
  },
  {
    question: 'Mở cửa hàng ở tầng trệt thì có phải mua bảo hiểm cháy nổ bắt buộc không?',
    answer: 'Chủ cơ sở cần đối chiếu công năng, quy mô, loại hàng hóa và các điều kiện áp dụng tại Phụ lục VII Nghị định 105/2025/NĐ-CP cùng Điều 35 đã được sửa đổi. Ví dụ, cửa hàng buôn bán hàng dễ cháy và cơ sở kinh doanh dịch vụ ăn uống được đối chiếu theo những mục riêng trong danh mục.',
  },
  {
    question: 'Hàng của người thuê có được bồi thường theo hợp đồng của chủ nhà không?',
    answer: 'Hãy kiểm tra tên người được bảo hiểm, địa chỉ và danh mục tài sản được bảo hiểm cùng các điều khoản kèm theo. Hàng hóa của người thuê có thể cần được kê khai riêng và bảo hiểm theo hợp đồng phù hợp. Nếu chưa rõ, người thuê nên gửi danh mục hàng hóa cho doanh nghiệp bảo hiểm để kiểm tra.',
  },
];

export const sources = [
  ['Video hiện trường cháy nhà trên đường Trần Quang Khải, 23/11/2026', 'https://www.facebook.com/reel/1485139070471822', 'SaigonFun.vn · Facebook'],
  ['Cháy sân thượng căn nhà ở phường Tân Định, nhiều tài sản bị thiêu rụi, 23/11/2026', 'https://tuoitre.vn/chay-san-thuong-can-nha-o-phuong-tan-dinh-nhieu-tai-san-bi-thieu-rui-100261123075131314.htm', 'Báo Tuổi Trẻ'],
  ['Cháy nhà dân ở phường Tân Định, nhiều người tháo chạy, 23/11/2026', 'https://www.sggp.org.vn/chay-nha-dan-o-phuong-tan-dinh-nhieu-nguoi-thao-chay-post883189.html', 'Báo Sài Gòn Giải Phóng'],
  ['Điều 35 và Phụ lục VII Nghị định 105/2025/NĐ-CP', 'https://vanban.chinhphu.vn/?classid=0&docid=213702&pageid=27160', 'Chính phủ'],
  ['Điều 23 Nghị định 347/2026/NĐ-CP sửa đổi Điều 35 Nghị định 105/2025/NĐ-CP', 'https://vanban.chinhphu.vn/?classid=1&docid=219411&pageid=27160', 'Chính phủ'],
  ['Chương III Nghị định 67/2023/NĐ-CP về bảo hiểm cháy, nổ bắt buộc', 'https://vanban.chinhphu.vn/?classid=1&docid=208599&orggroupid=2&pageid=27160', 'Chính phủ'],
];

export const related = [
  {
    href: CHAY_NO,
    img: 'section-chay-no',
    w: 1280,
    h: 853,
    k: 'Sản phẩm',
    title: 'Bảo hiểm cháy nổ bắt buộc',
    text: 'Tra cứu loại hình cơ sở, xem biểu phí và tính phí tham khảo.',
  },
  {
    href: QUY_DINH,
    img: 'section-chay-no',
    w: 1280,
    h: 853,
    k: 'Quy định',
    title: 'Những thay đổi về bảo hiểm cháy nổ bắt buộc từ 15/9/2026',
    text: 'Đọc các quy định được sửa đổi theo Nghị định 347/2026/NĐ-CP.',
  },
];

export function body({ pic }) {
  return `
<h2 id="dien-bien">Diễn biến vụ cháy nhà trên đường Trần Quang Khải</h2>
<p>Theo Tuổi Trẻ và Sài Gòn Giải Phóng, khói bốc lên từ khu vực sân thượng một căn nhà trên đường Trần Quang Khải vào sáng 23/11. Những người bên trong thoát ra bằng cầu thang. Lực lượng Cảnh sát PCCC và cứu nạn, cứu hộ TP.HCM tiếp cận, phun nước từ bên ngoài để dập lửa.</p>
<p>Trang SaigonFun.vn cũng đăng video được giới thiệu là hiện trường vụ cháy sáng cùng ngày. Vụ cháy không gây thương vong, song nhiều tài sản ở khu vực sân thượng bị thiêu rụi. Khi báo chí đưa tin, cơ quan chức năng đang xác minh nguyên nhân và thống kê thiệt hại.</p>
<div class="kb-photo-pair">
  <figure class="kb-photo kb-doc">
    ${pic('chay-tan-dinh-lua-khoi', { w: 1168, h: 1280, sizes: '(max-width:600px) calc(100vw - 40px), 420px', alt: 'Lửa bốc lên phía sau lan can sân thượng, khói đen dày giữa các tòa nhà' })}
    <figcaption>Ảnh thực tế: Lửa và khói đen ở khu vực sân thượng · Nguồn: ${NGUON_ANH}.</figcaption>
  </figure>
  <figure class="kb-photo kb-doc">
    ${pic('chay-tan-dinh-khoi-san-thuong', { w: 1144, h: 1254, sizes: '(max-width:600px) calc(100vw - 40px), 420px', alt: 'Khói dày bốc lên trên sân thượng nhìn từ phía đường Trần Quang Khải' })}
    <figcaption>Ảnh thực tế: Cột khói nhìn từ đường Trần Quang Khải · Nguồn: ${NGUON_ANH}.</figcaption>
  </figure>
</div>

<h2 id="dien-bat-buoc">Nhà ở kết hợp kinh doanh có phải mua bảo hiểm cháy nổ bắt buộc?</h2>
<p>Chủ nhà hoặc người thuê mặt bằng kinh doanh cần xác định loại hình cơ sở, công năng, quy mô và loại hàng hóa để đối chiếu Phụ lục VII Nghị định 105/2025/NĐ-CP. Đồng thời, cần kiểm tra các điều kiện tại Điều 35 của nghị định này, đã được sửa đổi bởi Điều 23 Nghị định 347/2026/NĐ-CP.</p>
<p>Trên trang <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a>, bạn có thể tra cứu loại hình cơ sở, xem biểu phí và tính phí tham khảo. Nếu mặt bằng vừa để ở vừa dùng làm cửa hàng hoặc kho, hãy chuẩn bị thông tin diện tích từng khu vực, loại hàng lưu trữ và danh mục tài sản khi yêu cầu báo phí.</p>

<h2 id="boi-thuong">Khi xảy ra cháy, tài sản nào được xem xét bồi thường?</h2>
<p>Đối với bảo hiểm cháy, nổ bắt buộc, tài sản của cơ sở có thể gồm nhà, công trình, tài sản gắn liền với công trình, máy móc, thiết bị, hàng hóa và vật tư. Khi có tổn thất, doanh nghiệp bảo hiểm đối chiếu địa điểm, danh mục tài sản, thời hạn hiệu lực, số tiền bảo hiểm, mức khấu trừ và điều khoản loại trừ áp dụng.</p>
<p>Ví dụ, người thuê mặt bằng làm cửa hàng nên kiểm tra riêng phần công trình của chủ nhà và phần hàng hóa, thiết bị do mình đầu tư. Khi yêu cầu báo phí, ghi rõ tài sản thuộc về ai và gửi danh mục hàng tồn kho để làm rõ phần tài sản cần bảo hiểm.</p>

<h2 id="sau-vu-chay">Chủ nhà hoặc người thuê cần làm gì sau hỏa hoạn?</h2>
<ol>
<li><strong>Ưu tiên thoát nạn.</strong> Khi phát hiện cháy, báo cho người xung quanh, ra nơi an toàn và gọi 114.</li>
<li><strong>Thông báo cho doanh nghiệp bảo hiểm.</strong> Nếu đã có hợp đồng, cung cấp thời gian, địa điểm và thông tin ban đầu về tài sản bị ảnh hưởng để được hướng dẫn giám định.</li>
<li><strong>Ghi nhận thiệt hại khi khu vực đã an toàn.</strong> Giữ hợp đồng, hóa đơn, sổ kiểm kê và ảnh tài sản. Phối hợp với cơ quan chức năng và doanh nghiệp bảo hiểm trước khi di chuyển hoặc thanh lý tài sản bị hư hại.</li>
</ol>`;
}
