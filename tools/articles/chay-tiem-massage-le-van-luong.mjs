// Tin: cháy tiệm massage trên đường Lê Văn Lương, phường Tân Hưng (Quận 7 cũ), sáng 17/10/2026.
// Bản chuẩn ở baohiempvi-vn.com (chủ site giao 17/10/2026, đăng cả hai mục Tin tức); trang này khai canonical về đó.
// Dữ kiện theo Tuổi Trẻ, VnExpress, Dân trí 17/10/2026; nguồn ghi bằng chữ, không link ra ngoài.
// Ảnh do chủ site cung cấp (người quen chụp), đã làm mờ tên, địa chỉ cơ sở, khuôn mặt, biển số.
import { ZALO_TU_VAN } from './khu-vuc.mjs';

export const post = {
  slug: 'chay-tiem-massage-le-van-luong-bao-hiem-chay-no',
  date: '2026-10-17',
  dateText: '17/10/2026',
  cat: 'Tin tức · Cháy nổ',
  title: 'Cháy tiệm massage trên đường Lê Văn Lương (Quận 7 cũ): bài học bảo hiểm cháy nổ cho cửa hàng, hộ kinh doanh',
  lead: 'Khoảng 9 giờ sáng 17/10/2026, một căn nhà 3 tầng dùng làm tiệm massage trên đường Lê Văn Lương, phường Tân Hưng (Quận 7 cũ), TP.HCM bốc cháy. Lửa được dập sau khoảng 30 phút, không có thương vong nhưng nhiều tài sản bên trong bị thiêu rụi. Nếu có bảo hiểm cháy nổ, phần thiệt hại này có được bồi thường không?',
  image: '/assets/chay-massage-hien-truong.webp',
  alt: 'Xe chữa cháy đỗ trước một tiệm massage, thang dựng lên mái, chiến sĩ chữa cháy đứng trên tầng hai; tên và địa chỉ trên biển hiệu đã được làm mờ',
  readMin: 5,
  canonical: 'https://www.baohiempvi-vn.com/kien-thuc/chay-tiem-massage-le-van-luong-bao-hiem-chay-no',
};

export const crumb = 'Tin tức cháy nổ';
export const hero = { name: 'chay-massage-hien-truong', w: 1200, h: 630, position: '50% 50%', caption: 'Ảnh thực tế: xe chữa cháy và thang tiếp cận tầng trên của tiệm massage trên đường Lê Văn Lương, phường Tân Hưng, sáng 17/10/2026. Tên, địa chỉ cơ sở đã được làm mờ · Nguồn: PVI Thành Đô.' };
export const seo = {
  title: 'Cháy tiệm massage Lê Văn Lương: bài học bảo hiểm cháy nổ | PVI',
  description: 'Sáng 17/10/2026, một tiệm massage trên đường Lê Văn Lương, phường Tân Hưng bốc cháy. Cơ sở nào phải mua bảo hiểm cháy nổ, tiệm nhỏ nên mua gì, phí ra sao.',
};

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const toc = [
  ['dien-bien', 'Vụ cháy diễn ra thế nào'],
  ['bat-buoc', 'Tiệm nhỏ có phải mua không'],
  ['boi-thuong', 'Bảo hiểm bồi thường gì'],
  ['xu-phat', 'Không mua bị xử lý thế nào'],
  ['phi', 'Mua ở đâu, phí bao nhiêu'],
  ['khi-chay', 'Khi bị cháy cần làm gì'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Vụ cháy tiệm massage trên đường Lê Văn Lương xảy ra khi nào?', answer: 'Khoảng 9 giờ sáng 17/10/2026, tại một căn nhà 3 tầng trên đường Lê Văn Lương, phường Tân Hưng (Quận 7 cũ). Theo báo chí, cơ sở đã ngưng hoạt động khoảng một năm và đang sửa chữa, lửa được dập sau khoảng 30 phút, không có thương vong. Nguyên nhân đang được xác định.' },
  { question: 'Tiệm massage nhỏ có phải mua bảo hiểm cháy nổ bắt buộc không?', answer: 'Chỉ khi cơ sở thuộc danh mục 44 nhóm tại Phụ lục VII Nghị định 105/2025/NĐ-CP và đạt ngưỡng quy mô của nhóm đó. Nhiều tiệm nhỏ không thuộc diện bắt buộc nhưng vẫn nên mua bảo hiểm tự nguyện, vì khi cháy chủ cơ sở tự chịu toàn bộ thiệt hại nếu không có bảo hiểm.' },
  { question: 'Bảo hiểm cháy nổ cho cửa hàng giá bao nhiêu?', answer: 'Với gói cửa hàng, hộ kinh doanh của PVI, phí tính theo tỷ lệ trên giá trị tài sản kê khai: bán lẻ 0,2%, gas và xăng dầu 0,3%, karaoke 0,4% mỗi năm, chưa gồm VAT. Cửa hàng bán lẻ kê khai 1 tỷ đồng đóng 2,2 triệu đồng một năm đã gồm VAT. Cơ sở dịch vụ khác được báo phí sau khi kiểm tra loại hình.' },
  { question: 'Cơ sở đang đóng cửa sửa chữa mà bị cháy thì bảo hiểm có bồi thường không?', answer: 'Tùy hợp đồng và việc chủ cơ sở đã thông báo cho doanh nghiệp bảo hiểm chưa. Ngừng hoạt động lâu, sửa chữa hay đổi công năng làm rủi ro thay đổi so với lúc mua, nên cần báo để được xác nhận phạm vi bảo hiểm. Kết luận cuối cùng dựa vào điều khoản hợp đồng và kết quả giám định.' },
  { question: 'Không mua bảo hiểm cháy nổ bắt buộc bị phạt bao nhiêu?', answer: 'Theo Điều 17 Nghị định 106/2025/NĐ-CP (theo nguồn tổng hợp đã đối chiếu), cá nhân bị phạt 30 đến 40 triệu đồng với cơ sở nhóm 2 và 40 đến 50 triệu đồng với cơ sở nhóm 1; tổ chức bị phạt gấp 2 lần. Từ 20/4/2026, mua không đủ đối tượng bảo hiểm cũng bị xử phạt theo Nghị định 69/2026/NĐ-CP.' },
];

export const sources = [
  ['Cháy lớn tiệm massage ở phường Tân Hưng (17/10/2026)', 'https://tuoitre.vn/', 'Báo Tuổi Trẻ'],
  ['Cháy lớn tại cơ sở massage cũ ở TP HCM (17/10/2026)', 'https://vnexpress.net/', 'Báo VnExpress'],
  ['Cháy quán massage ở TPHCM, khói đen bao trùm khu vực (17/10/2026)', 'https://dantri.com.vn/', 'Báo Dân trí'],
  ['Nghị định 105/2025/NĐ-CP, Phụ lục VII: danh mục cơ sở phải mua bảo hiểm cháy, nổ bắt buộc', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Bảo hiểm cháy nổ bắt buộc: tra cứu và tính phí', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Tra cứu cơ sở có thuộc diện bắt buộc không, biểu phí và tính phí tham khảo.' },
  { href: '/tin-tuc/nghi-dinh-347-2026-chay-no-bat-buoc/', img: 'section-chay-no', k: 'Pháp lý mới', title: 'Nghị định 347/2026: cháy nổ bắt buộc thay đổi gì', text: 'Bỏ nghiệm thu của Công an, thêm trường hợp không phải mua, tính phí riêng từng hạng mục.' },
];

const photo = (name, w, h, alt, caption) =>
  `<figure class="kb-photo"><img src="/assets/${name}.webp" width="${w}" height="${h}" alt="${alt}" loading="lazy" decoding="async"><figcaption>Ảnh thực tế: ${caption} · Nguồn: PVI Thành Đô</figcaption></figure>`;

export function body({ pic, ctaRow }) {
  return `
<p class="kb-first">Khoảng 9 giờ sáng 17/10/2026, một tiệm massage trên đường Lê Văn Lương, phường Tân Hưng (Quận 7 cũ) bốc cháy. Cơ sở đã ngưng hoạt động khoảng một năm, không ai bị thương, nhưng nhiều tài sản bên trong bị thiêu rụi. Câu hỏi thực tế với mọi chủ cửa hàng, hộ kinh doanh: nếu có <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ</a>, thiệt hại này được bồi thường đến đâu.</p>

<h2 id="dien-bien">Vụ cháy tiệm massage trên đường Lê Văn Lương diễn ra thế nào?</h2>
<p>Theo báo Tuổi Trẻ, VnExpress và Dân trí ngày 17/10/2026, đám cháy bùng lên khoảng 9 giờ sáng tại một căn nhà 3 tầng dùng làm tiệm massage, cách Lotte Mart Tân Hưng khoảng 500 m. Khói đen bốc cao, nhìn thấy từ nhiều tuyến đường xung quanh.</p>
<p>Người dân cho biết tiệm đang đóng cửa sửa chữa. Lãnh đạo UBND phường Tân Hưng cho biết cơ sở đã ngưng hoạt động khoảng một năm và hôm đó đang được sửa chữa. Cảnh sát PCCC và CNCH (PC07) Công an TP.HCM khống chế đám cháy sau khoảng 30 phút. Không có người bị thương; nhiều tài sản bên trong bị thiêu rụi. Nguyên nhân và thiệt hại đang được cơ quan chức năng xác định.</p>
${photo('chay-massage-chua-chay', 442, 786, 'Chiến sĩ chữa cháy kéo vòi nước trên mặt đường ướt trước tiệm massage', 'lực lượng chữa cháy kéo vòi trước mặt tiền căn nhà; biển hiệu và khuôn mặt đã được làm mờ')}
${photo('chay-massage-khoi-den', 720, 960, 'Cột khói đen bốc cao phía xa nhìn từ một tuyến đường có xe máy và ô tô đang chạy', 'cột khói đen nhìn từ tuyến đường gần khu vực, sáng 17/10/2026; biển số xe đã được làm mờ')}

<h2 id="bat-buoc">Tiệm massage, cửa hàng nhỏ có phải mua bảo hiểm cháy nổ bắt buộc không?</h2>
<p>Tùy quy mô. Nghĩa vụ mua bảo hiểm cháy, nổ bắt buộc chỉ áp dụng với cơ sở thuộc danh mục 44 nhóm tại Phụ lục VII Nghị định 105/2025/NĐ-CP, và mỗi nhóm có ngưỡng quy mô riêng. Ví dụ: karaoke từ 2 tầng hoặc 300 m² trở lên, cơ sở kinh doanh hàng hóa dễ cháy từ 200 m² sàn trở lên.</p>
<p>Nhiều cửa hàng, hộ kinh doanh nhỏ không thuộc diện bắt buộc. Không bắt buộc không có nghĩa là không có rủi ro: khi cháy, toàn bộ thiệt hại nhà, máy móc, nội thất, hàng hóa do chủ cơ sở tự gánh nếu không có bảo hiểm. Gửi diện tích, số tầng, ngành nghề qua <a class="kb-link" href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> để PVI Thành Đô kiểm tra cơ sở có thuộc diện bắt buộc hay không.</p>

<h2 id="boi-thuong">Nếu có bảo hiểm cháy nổ, chủ cơ sở được bồi thường những gì?</h2>
<p>Bảo hiểm cháy nổ bồi thường thiệt hại vật chất của tài sản được bảo hiểm do cháy, nổ gây ra, sau khi trừ mức khấu trừ và trong phạm vi số tiền bảo hiểm ghi trên hợp đồng. Số tiền bồi thường phụ thuộc vào:</p>
<ul>
<li>Tài sản có được kê khai trong hợp đồng không: nhà, máy móc thiết bị, nội thất, hàng hóa. Tài sản không kê khai thì không được bồi thường.</li>
<li>Số tiền bảo hiểm có sát giá trị thực không. Khai thấp hơn giá trị thực thì số tiền bồi thường có thể bị tính theo tỷ lệ.</li>
<li>Nguyên nhân cháy có thuộc điểm loại trừ trong quy tắc bảo hiểm hay không.</li>
<li>Cơ sở ngừng hoạt động lâu, đang sửa chữa hoặc đổi công năng nên thông báo cho doanh nghiệp bảo hiểm, vì rủi ro thay đổi so với lúc mua.</li>
</ul>

<h2 id="xu-phat">Không mua bảo hiểm cháy nổ bắt buộc thì bị xử lý thế nào?</h2>
<p>Cơ sở thuộc diện bắt buộc mà không mua có thể bị xử phạt theo Điều 17 Nghị định 106/2025/NĐ-CP. Theo nguồn tổng hợp đã đối chiếu (chưa đối chiếu bản gốc Nghị định 106/2025), mức phạt với cá nhân là 30 đến 40 triệu đồng (cơ sở nhóm 2) và 40 đến 50 triệu đồng (cơ sở nhóm 1); tổ chức bị phạt gấp 2 lần.</p>
<p>Từ 20/4/2026, Nghị định 69/2026/NĐ-CP bổ sung xử phạt hành vi mua không đủ đối tượng bảo hiểm và biện pháp buộc mua. Mua cho có, kê khai thiếu tài sản cũng có thể bị xử lý, ngoài việc không được bồi thường đủ khi có cháy.</p>

<h2 id="phi">Cửa hàng, hộ kinh doanh mua bảo hiểm cháy nổ ở đâu, phí bao nhiêu?</h2>
<p>PVI có gói bảo hiểm cháy và các rủi ro đặc biệt cho cửa hàng, hộ kinh doanh: kê khai giá trị tài sản là cấp đơn, số tiền bảo hiểm tới 2 tỷ đồng, khấu trừ 4 triệu đồng mỗi vụ. Phí tính theo tỷ lệ trên số tiền bảo hiểm, chưa gồm VAT 10%. Với cơ sở dịch vụ như massage, spa, tỷ lệ phí áp dụng sau khi PVI Thành Đô kiểm tra loại hình.</p>
<div class="kb-table" role="region" aria-label="Tỷ lệ phí gói cháy nổ cửa hàng, hộ kinh doanh" tabindex="0"><table>
<thead><tr><th scope="col">Loại cửa hàng</th><th scope="col">Tỷ lệ phí/năm (chưa VAT)</th><th scope="col">Ví dụ kê khai 1 tỷ đồng (đã gồm VAT)</th></tr></thead>
<tbody>
<tr><td>Cửa hàng, hộ kinh doanh bán lẻ</td><td>0,2%</td><td>2.200.000 đồng</td></tr>
<tr><td>Cửa hàng gas, xăng dầu</td><td>0,3%</td><td>3.300.000 đồng</td></tr>
<tr><td>Cơ sở karaoke</td><td>0,4%</td><td>4.400.000 đồng</td></tr>
</tbody></table></div>

<h2 id="khi-chay">Khi cơ sở bị cháy, cần làm gì để giữ quyền lợi bảo hiểm?</h2>
<p>An toàn của người là trên hết. Sau khi đám cháy được khống chế, làm theo thứ tự sau để hồ sơ bồi thường đầy đủ:</p>
<ol class="kb-steps">
<li><b>Gọi 114.</b> Đưa mọi người ra khỏi khu vực nguy hiểm.</li>
<li><b>Báo ngay cho doanh nghiệp bảo hiểm.</b> Với PVI, gọi tổng đài bồi thường 1900 54 54 58.</li>
<li><b>Giữ nguyên hiện trường.</b> Chụp ảnh, quay phim tài sản bị hư hỏng trước khi dọn dẹp.</li>
<li><b>Xin biên bản của cơ quan chức năng.</b> Biên bản, kết luận về vụ cháy là giấy tờ quan trọng trong hồ sơ.</li>
<li><b>Chuẩn bị chứng từ giá trị tài sản.</b> Hợp đồng, hóa đơn, sổ sách để giám định viên xác định thiệt hại.</li>
</ol>
<p class="kb-hotline">Khi có sự cố, gọi tổng đài bồi thường Bảo hiểm PVI <a href="tel:1900545458">1900 54 54 58</a></p>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Kiểm tra cơ sở của bạn có phải mua bảo hiểm cháy nổ không</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> diện tích, số tầng, ngành nghề và giá trị tài sản. PVI Thành Đô trả lời có thuộc diện bắt buộc không và báo phí trước khi bạn quyết định.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
