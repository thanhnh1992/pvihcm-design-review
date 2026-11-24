import { DIEM_THU, EFFECTIVE, LUONG_CO_SO, PVI_THANH_DO, RATE, STEPS, TERMS, perMonth } from '../data/bhyt.mjs';

const slug = 'mua-bao-hiem-y-te-online';
const product = '/san-pham/bao-hiem-y-te/';
const cover = 'mua-bao-hiem-y-te-online-pvihcm';
const format = new Intl.NumberFormat('vi-VN');
const vnd = (amount) => `${format.format(amount)} đ`;
const labels = ['Người thứ nhất', 'Người thứ hai', 'Người thứ ba', 'Người thứ tư', 'Từ người thứ năm'];

export const post = {
  slug,
  date: '2026-11-22',
  dateText: '22/11/2026',
  readMin: 5,
  cat: 'Tin sản phẩm · BHYT hộ gia đình',
  title: 'Mua bảo hiểm y tế online tại TP.HCM: cách đăng ký và gia hạn',
  lead: 'Bạn có thể đăng ký lần đầu hoặc gia hạn bảo hiểm y tế (BHYT) hộ gia đình online. Tại TP.HCM, bạn có thể tự làm thủ tục trên cổng dịch vụ công hoặc gửi yêu cầu để PVI Thành Đô, đơn vị thu được ủy quyền, hỗ trợ.',
  image: `/assets/${cover}.webp`,
  alt: 'Hình ảnh minh họa: người con hướng dẫn mẹ đăng ký bảo hiểm y tế hộ gia đình trên điện thoại',
  ratingTop: true,
};

export const seo = {
  title: 'Mua bảo hiểm y tế online tại TP.HCM: Đăng ký, gia hạn',
  description: 'Cách mua bảo hiểm y tế online tại TP.HCM. Xem mức đóng BHYT hộ gia đình, hồ sơ đăng ký mới, cách gia hạn và kiểm tra hiệu lực thẻ.',
};

export const crumb = 'Đăng ký BHYT online';
export const disclaimer = 'Mức đóng, quyền lợi và hiệu lực thẻ BHYT theo quy định và dữ liệu do cơ quan BHXH xác nhận.';
export const hero = { name: cover, w: 1200, h: 630, caption: post.alt };
export const toc = [
  ['dang-ky-hay-gia-han', 'Đăng ký mới hay gia hạn'],
  ['ba-buoc-dang-ky', 'Ba bước đăng ký online'],
  ['muc-dong-bhyt', 'Mức đóng BHYT hộ gia đình'],
  ['khu-vuc-binh-duong', 'Hỗ trợ tại khu vực Đông Sài Gòn'],
];

export const body = ({ pic }) => `
<h2 id="dang-ky-hay-gia-han">Đăng ký mới hay gia hạn thẻ BHYT?</h2>
<p>Người đang tham gia BHYT hộ gia đình dùng thủ tục gia hạn khi thẻ sắp hết hạn. Người tham gia lần đầu hoặc chuyển từ nhóm khác cần xác định nhóm tham gia hiện tại trước khi kê khai.</p>
<div style="overflow-x:auto"><table><thead><tr><th scope="col">Tình trạng</th><th scope="col">Việc cần làm</th></tr></thead><tbody>
<tr><th scope="row">Lần đầu tham gia hoặc chuyển nhóm</th><td>Chọn thủ tục đăng ký phù hợp. Nếu vừa nghỉ việc, kiểm tra ngày hết hạn thẻ cũ trước khi chuyển nhóm.</td></tr>
<tr><th scope="row">Đang tham gia theo hộ gia đình</th><td>Kiểm tra hạn thẻ trên VssID rồi chọn thủ tục gia hạn. Đối chiếu thông tin từng người nếu cần tính giảm trừ cho nhiều thành viên.</td></tr>
<tr><th scope="row">Thẻ đã hết hạn hoặc dữ liệu bị sai</th><td>Báo rõ thời gian gián đoạn hoặc thông tin chưa khớp để được hướng dẫn trước khi thanh toán.</td></tr>
</tbody></table></div>
<p>Với người tham gia theo hộ gia đình lần đầu hoặc không liên tục từ 90 ngày trở lên, thẻ có giá trị sau 30 ngày kể từ ngày đóng đủ. Căn cứ là Điều 16 Luật Bảo hiểm y tế, được sửa đổi bởi Luật 51/2024/QH15. Nếu cần khám sớm, nên kiểm tra ngày có hiệu lực trước khi đặt lịch.</p>

<h2 id="ba-buoc-dang-ky">Ba bước mua bảo hiểm y tế online qua PVI Thành Đô</h2>
<p>Quy trình gồm gửi yêu cầu đăng ký, đối chiếu và nộp tiền, sau đó lưu biên lai và kiểm tra hiệu lực thẻ.</p>
<ol>
<li><strong>Chuẩn bị thông tin người tham gia.</strong> Chọn số người và kỳ đóng 3, 6 hoặc 12 tháng trên trang <a href="${product}">BHYT hộ gia đình tại TP.HCM</a> để ước tính. Gửi yêu cầu trên trang hoặc gọi <a href="tel:0938072236">0938 072 236</a>. Khi kê khai, chuẩn bị họ tên, số căn cước và kỳ đóng của từng người. Nếu gia hạn, chuẩn bị thêm mã số BHXH hoặc thông tin thẻ cũ.</li>
<li><strong>Đối chiếu số tiền và chuyển khoản.</strong> PVI Thành Đô kiểm tra thông tin, hướng dẫn kê khai và thông báo số tiền cần đóng. Trước khi chuyển khoản, đối chiếu họ tên, số người, kỳ đóng và tên chủ tài khoản nhận tiền là Công ty Bảo hiểm PVI Thành Đô theo hướng dẫn của đơn vị thu.</li>
<li><strong>Nhận biên lai và kiểm tra hiệu lực thẻ.</strong> Lưu biên lai thu sau khi thanh toán. Khi cơ quan BHXH đã cập nhật, mở VssID để kiểm tra họ tên và hạn sử dụng. Nếu chưa thấy kỳ mới hoặc phát hiện sai thông tin, liên hệ đơn vị thu để đối chiếu.</li>
</ol>
<figure>${pic('diem-thu-bhxh-bhyt-pvi-thanh-do', { w: 960, h: 890, alt: 'Ảnh thực tế: bảng điểm thu BHXH, BHYT của PVI Thành Đô', sizes: '(max-width:760px) 100vw, 720px' })}<figcaption>Ảnh thực tế: Bảng điểm thu BHXH, BHYT · Nguồn: PVI Thành Đô.</figcaption></figure>

<h2 id="muc-dong-bhyt">Mua BHYT hộ gia đình online hết bao nhiêu tiền?</h2>
<p>Từ ${EFFECTIVE}, mức đóng 12 tháng của người thứ nhất trong hộ là <strong>${format.format(perMonth(0) * 12)} đồng</strong>, trước khi tính khoản hỗ trợ riêng nếu có. Người thứ nhất đóng ${format.format(RATE * 100)}% mức tham chiếu ${format.format(LUONG_CO_SO)} đồng mỗi tháng. Mức đóng dưới đây theo mục 3 Thông báo 3508/TB-BHXH ngày 21/5/2026 của BHXH TP.HCM.</p>
<div style="overflow-x:auto"><table><thead><tr><th scope="col">Người tham gia</th>${TERMS.map((term) => `<th scope="col">${term} tháng</th>`).join('')}</tr></thead><tbody>
${STEPS.map((rate, index) => `<tr><th scope="row">${labels[index]} (${Math.round(rate * 100)}%)</th>${TERMS.map((term) => `<td>${vnd(perMonth(index) * term)}</td>`).join('')}</tr>`).join('\n')}
</tbody></table></div>
<p>Ví dụ, ba người trong hộ đủ điều kiện giảm trừ, cùng đóng kỳ 12 tháng, có tổng tiền là <strong>${format.format((perMonth(0) + perMonth(1) + perMonth(2)) * 12)} đồng</strong>. Khi gia hạn cho một người, kiểm tra mức giảm trừ được áp dụng trước khi thanh toán. Số tiền chính thức theo kết quả đối chiếu và biên lai thu.</p>

<h2 id="khu-vuc-binh-duong">Ở khu vực Đông Sài Gòn thì liên hệ ở đâu?</h2>
<p>Người ở khu vực Dĩ An, Thuận An hoặc Thủ Dầu Một có thể gửi yêu cầu cho PVI Thành Đô và báo phường cư trú hiện tại. PVI Thành Đô tiếp nhận hồ sơ và thu tiền theo ủy quyền. Cơ quan BHXH cấp thẻ và cập nhật hiệu lực.</p>
<p>Khi cần tìm đầu mối bảo hiểm khác, xem <a href="/dongsaigon/">Bảo hiểm PVI tại Đông Sài Gòn</a> hoặc <a href="/dongsaigon/sanpham/">danh mục sản phẩm tại Đông Sài Gòn</a>. Nếu cần quyền lợi nội trú, ngoại trú hoặc bảo lãnh viện phí theo hợp đồng thương mại, xem riêng <a href="/dongsaigon/suckhoe/">bảo hiểm sức khỏe PVI Care tại Đông Sài Gòn</a>.</p>
<p>Xem thêm <a href="/tin-tuc/mua-bao-hiem-pvi-binh-duong/">hướng dẫn mua bảo hiểm PVI ở Đông Sài Gòn</a> hoặc trở về <a href="/tin-tuc/">mục Tin tức PVI Thành Đô</a>.</p>`;

export const related = [{
  href: product, img: cover, w: 1200, h: 630, k: 'BHYT hộ gia đình',
  title: 'Tính tiền đóng và gửi yêu cầu tham gia BHYT',
  text: 'Chọn số người và kỳ đóng để ước tính tiền đóng BHYT hộ gia đình tại TP.HCM.',
}];

export const faqs = [
  { question: 'Có thể tự đăng ký BHYT online lần đầu không?', answer: 'Có. Theo BHXH Việt Nam, người tham gia BHYT hộ gia đình có thể đăng ký hoặc gia hạn trực tuyến trên Cổng Dịch vụ công Quốc gia hoặc Cổng Dịch vụ công BHXH Việt Nam. Người dân TP.HCM cũng có thể gửi yêu cầu cho PVI Thành Đô để được hướng dẫn đối chiếu hồ sơ và kỳ đóng.' },
  { question: 'Chuyển khoản xong có dùng thẻ BHYT ngay được không?', answer: 'Hãy căn cứ vào ngày có giá trị sử dụng do cơ quan BHXH cập nhật. Biên lai xác nhận khoản đã thu. Với người tham gia theo hộ gia đình lần đầu hoặc không liên tục từ 90 ngày trở lên, thẻ có giá trị sau 30 ngày kể từ ngày đóng đủ.' },
  { question: 'Có thể đăng ký trực tiếp thay vì online không?', answer: `Có thể liên hệ trước qua 0938 072 236 để được hướng dẫn đến điểm thu PVI Thành Đô tại ${DIEM_THU.address}. Trụ sở công ty đặt tại ${PVI_THANH_DO.address}.` },
];

export const sources = [
  ['Thông báo số 3508/TB-BHXH ngày 21/5/2026 về mức đóng kể từ 01/7/2026', '', 'Bảo hiểm xã hội TP.HCM · mục 3'],
  ['Luật số 51/2024/QH15 ngày 27/11/2024, sửa đổi, bổ sung Luật Bảo hiểm y tế', '', 'Quốc hội · hiệu lực 01/7/2025'],
  ['Nghị định 188/2025/NĐ-CP ngày 01/7/2025, quy định chi tiết và hướng dẫn thi hành Luật Bảo hiểm y tế', '', 'Chính phủ · hiệu lực 15/8/2025'],
  ['Hướng dẫn đăng ký, gia hạn thẻ BHYT hộ gia đình trực tuyến', '', 'Bảo hiểm xã hội Việt Nam · 08/9/2026'],
];
