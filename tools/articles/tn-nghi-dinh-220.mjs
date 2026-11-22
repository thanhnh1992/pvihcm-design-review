// Bài pháp lý: Nghị định 220/2026/NĐ-CP về bảo hiểm bắt buộc trong hoạt động đầu tư xây dựng.
// Viết lại từ hub cập nhật đã đăng của baohiempvi-vn (app/bao-hiem-tai-nan-24-24/accident-updates.ts, 29/08/2026).
// Phạm vi: chỉ nêu phần đầu tư xây dựng. Không khẳng định 220/2026 thay toàn bộ NĐ 67/2023 vì bộ tài liệu cháy nổ
// (docs/chay-no-50-bai/CN07) ghi 220/2026 chỉ sửa Chương IV, chưa đối chiếu bản gốc. Không in mức trách nhiệm tối thiểu
// vì nguồn chưa in con số, phải đối chiếu theo loại công trình.
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const TAI_NAN = '/san-pham/bao-hiem-tai-nan/';

export const post = {
  slug: 'nghi-dinh-220-2026-bao-hiem-cong-trinh',
  date: '2026-11-16',
  dateText: '16/11/2026',
  cat: 'Pháp lý · Bảo hiểm công trường',
  title: 'Nghị định 220/2026/NĐ-CP: nhà thầu cần biết gì về bảo hiểm người lao động thi công',
  lead: 'Nghị định 220/2026/NĐ-CP có hiệu lực từ 01/7/2026, là căn cứ hiện hành cho bảo hiểm bắt buộc trong hoạt động đầu tư xây dựng, trong đó có bảo hiểm cho người lao động thi công trên công trường. Báo giá, giấy chứng nhận phát hành sau 01/7/2026 nên ghi căn cứ này.',
  image: '/assets/bai-nghi-dinh-220-2026.webp',
  alt: 'Ảnh bìa bài viết: Nghị định 220/2026/NĐ-CP quy định những gì, Bảo hiểm tai nạn 24/24 PVI Thành Đô',
  readMin: 5,
};

export const crumb = 'Pháp lý mới';
export const hero = { name: 'bai-nghi-dinh-220-2026', w: 1200, h: 630, position: '50% 50%', caption: 'Cập nhật pháp lý của PVI Thành Đô về bảo hiểm bắt buộc trong hoạt động đầu tư xây dựng.' };
export const seo = {
  title: 'Nghị định 220/2026/NĐ-CP: bảo hiểm người lao động thi công | PVI',
  description: 'Nghị định 220/2026/NĐ-CP hiệu lực 01/7/2026 về bảo hiểm bắt buộc trong đầu tư xây dựng: nhà thầu cần kiểm tra gì, văn bản cũ nào hết hiệu lực, hợp đồng ký trước có sao không.',
};

export const toc = [
  ['la-gi', 'Nghị định quy định gì'],
  ['nha-thau', 'Hai điểm nhà thầu cần kiểm tra'],
  ['van-ban-cu', 'Văn bản cũ đã hết hiệu lực'],
  ['hop-dong-cu', 'Hợp đồng ký trước 01/7/2026'],
  ['kiem-tra', 'Kiểm tra báo giá trong 2 phút'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Nghị định 220/2026/NĐ-CP có hiệu lực từ khi nào?', answer: 'Từ 01/7/2026. Đây là căn cứ hiện hành cho bảo hiểm bắt buộc trong hoạt động đầu tư xây dựng, trong đó có bảo hiểm cho người lao động thi công trên công trường.' },
  { question: 'Mức trách nhiệm tối thiểu cho mỗi người lao động là bao nhiêu?', answer: 'Áp dụng theo Nghị định 220/2026/NĐ-CP và phải đối chiếu đúng điều khoản theo loại công trình. Hồ sơ mời thầu thường đặt mức cao hơn mức tối thiểu; nên gửi phần yêu cầu bảo hiểm của gói thầu để chuyên viên đối chiếu trước khi mua.' },
  { question: 'Thông tư 329/2016/TT-BTC còn hiệu lực không?', answer: 'Không. Thông tư 329/2016 hết hiệu lực từ 01/10/2022 khi Thông tư 50/2022/TT-BTC thay thế; sau đó nội dung chuyển lên Nghị định 67/2023/NĐ-CP và nay là Nghị định 220/2026/NĐ-CP.' },
  { question: 'Hợp đồng bảo hiểm ký trước 01/7/2026 có còn hiệu lực không?', answer: 'Còn, đến hết thời hạn ghi trên giấy chứng nhận; quyền lợi giữ nguyên theo hợp đồng đã ký. Lần tái tục sau 01/7/2026 phát hành theo Nghị định 220/2026 và đối chiếu lại mức trách nhiệm.' },
  { question: 'Báo giá còn ghi văn bản cũ thì sao?', answer: 'Căn cứ đã hết hiệu lực có thể khiến hồ sơ bị loại khi thẩm định. Đề nghị bên bán phát hành lại theo Nghị định 220/2026/NĐ-CP trước khi nộp thầu.' },
];

export const sources = [
  ['Nghị định 220/2026/NĐ-CP (hiệu lực 01/7/2026)', 'https://vanban.chinhphu.vn/', 'Cổng thông tin văn bản Chính phủ'],
  ['Thông tư 50/2022/TT-BTC; Nghị định 67/2023/NĐ-CP', 'https://vanban.chinhphu.vn/', 'Chính phủ, Bộ Tài chính'],
  ['Bảo hiểm tai nạn 24/24 cho nhà thầu, công trường', TAI_NAN, 'PVI Thành Đô'],
];

export const related = [
  { href: TAI_NAN, img: 'tai-nan', k: 'Sản phẩm chính', title: 'Bảo hiểm tai nạn 24/24 PVI', text: 'Bảo hiểm người lao động công trường, cấp giấy chứng nhận trong ngày.' },
  { href: '/tin-tuc/bao-hiem-tai-nan-cong-trinh-pvi/', img: 'hero-cong-trinh', k: 'Cùng chủ đề', title: 'Bảo hiểm tai nạn công trình PVI', text: 'Nhà thầu cần chuẩn bị gì cho hồ sơ bảo hiểm công trường.' },
];

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> Nghị định 220/2026/NĐ-CP có hiệu lực từ <b>01/7/2026</b> và là căn cứ hiện hành cho bảo hiểm bắt buộc trong hoạt động đầu tư xây dựng, trong đó có <a class="kb-link" href="${TAI_NAN}">bảo hiểm tai nạn cho người lao động thi công</a>. Nhà thầu cần kiểm tra hai thứ: mức trách nhiệm cho mỗi người lao động và căn cứ pháp lý ghi trên báo giá, giấy chứng nhận.</p>

<h2 id="la-gi">Nghị định 220/2026/NĐ-CP quy định những gì?</h2>
<p>Nghị định quy định bảo hiểm bắt buộc trong hoạt động đầu tư xây dựng. Với nhà thầu thi công, phần liên quan trực tiếp là bảo hiểm cho người lao động trên công trường: ai phải mua, công trình nào thuộc diện bắt buộc, và mức trách nhiệm tối thiểu cho mỗi người.</p>
<p>Từ 01/7/2026, báo giá và giấy chứng nhận phát hành mới nên ghi căn cứ là Nghị định 220/2026/NĐ-CP.</p>

<h2 id="nha-thau">Hai điểm nhà thầu cần kiểm tra</h2>
<ol class="kb-steps">
<li><b>Mức trách nhiệm tối thiểu cho mỗi người lao động.</b> Áp dụng theo Nghị định 220/2026 và phải đối chiếu theo loại công trình. PVI Thành Đô không in một con số chung để tránh áp sai.</li>
<li><b>Phạm vi công trình thuộc diện bắt buộc.</b> Hai điểm này quyết định hồ sơ thầu có được chấp nhận hay không.</li>
</ol>
<p>Điểm nhiều nhà thầu bỏ sót: hồ sơ mời thầu của chủ đầu tư thường đặt mức yêu cầu <b>cao hơn</b> mức tối thiểu của Nghị định. Mua đúng mức tối thiểu vẫn có thể bị loại nếu gói thầu đòi cao hơn. Đọc yêu cầu riêng của gói thầu trước khi chốt.</p>

<h2 id="van-ban-cu">Văn bản cũ nào đã hết hiệu lực?</h2>
<div class="kb-table" role="region" aria-label="Chuỗi văn bản" tabindex="0"><table>
<thead><tr><th scope="col">Văn bản</th><th scope="col">Tình trạng</th></tr></thead>
<tbody>
<tr><td>Nghị định 119/2015/NĐ-CP (sửa bởi Nghị định 20/2022/NĐ-CP)</td><td>Văn bản gốc thế hệ cũ, đã được thay thế</td></tr>
<tr><td>Thông tư 329/2016/TT-BTC</td><td>Hết hiệu lực từ 01/10/2022, thay bởi Thông tư 50/2022/TT-BTC</td></tr>
<tr><td>Thông tư 50/2022/TT-BTC</td><td>Nội dung chuyển lên cấp nghị định</td></tr>
<tr><td>Nghị định 67/2023/NĐ-CP (phần đầu tư xây dựng)</td><td>Phần này nay theo Nghị định 220/2026</td></tr>
<tr><td><b>Nghị định 220/2026/NĐ-CP</b></td><td><b>Đang áp dụng từ 01/7/2026</b></td></tr>
</tbody></table></div>
<p>Thông tư 329/2016 là văn bản bị trích sai nhiều nhất trên báo giá và website. Nếu báo giá bạn đang cầm còn ghi căn cứ này, mức trách nhiệm trong đó được tính theo quy định đã hết hiệu lực từ năm 2022.</p>
<p>Lưu ý: bảo hiểm cháy, nổ bắt buộc có hệ thống văn bản riêng (Nghị định 105/2025 và các văn bản liên quan), xem <a class="kb-link" href="/tin-tuc/quy-dinh-mua-bao-hiem-chay-no-bat-buoc/">quy định mua bảo hiểm cháy nổ bắt buộc</a>.</p>

<h2 id="hop-dong-cu">Hợp đồng ký trước 01/7/2026 có bị ảnh hưởng không?</h2>
<p>Không. Hợp đồng phát hành trước 01/7/2026 vẫn có hiệu lực đến hết thời hạn ghi trên giấy chứng nhận, quyền lợi bồi thường giữ nguyên. Việc cần làm là ở lần tái tục: phát hành theo Nghị định 220/2026 và đối chiếu lại mức trách nhiệm.</p>
<p>Gói thầu đang thi công mà chủ đầu tư yêu cầu bổ sung giấy chứng nhận theo căn cứ mới thì có thể làm phụ lục thay vì mua lại từ đầu.</p>

<h2 id="kiem-tra">Kiểm tra báo giá đang cầm trong 2 phút</h2>
<ul>
<li>Căn cứ pháp lý ghi trên báo giá là văn bản nào? Không phải Nghị định 220/2026 là đời cũ.</li>
<li>Số tiền bảo hiểm mỗi người có đạt yêu cầu của gói thầu không?</li>
<li>Giấy chứng nhận có ghi đúng tên gói thầu, có xuất được hóa đơn VAT không?</li>
</ul>
<p>Tính phí theo số người và thời hạn tại <a class="kb-link" href="${TAI_NAN}">bảo hiểm tai nạn 24/24 PVI</a>.</p>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Gửi yêu cầu bảo hiểm của gói thầu để đối chiếu</h2>
<p>Chụp phần yêu cầu bảo hiểm trong hồ sơ mời thầu gửi qua <a href="${ZALO_TU_VAN}" target="_blank">Zalo 0938 072 236</a>. PVI Thành Đô đối chiếu với Nghị định 220/2026 và báo lại bằng văn bản mức cần mua trước khi bạn thanh toán.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
