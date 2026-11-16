// Chiến dịch SEO cháy nổ bắt buộc, ngày 2 bài 5/5.
// Nhóm G: "xử phạt không mua bảo hiểm cháy nổ bắt buộc", "phạt không mua bảo hiểm cháy nổ bắt buộc".
// KHÔNG ghi số tiền phạt: bộ tài liệu nguồn (docs/chay-no-50-bai/CN05) chưa đối chiếu bản gốc NĐ 106/2025, NĐ 69/2026.
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const post = {
  slug: 'khong-mua-bao-hiem-chay-no-bat-buoc-bi-phat',
  date: '2026-11-14',
  dateText: '14/11/2026',
  cat: 'Pháp lý · Cháy nổ bắt buộc',
  title: 'Không mua bảo hiểm cháy nổ bắt buộc bị xử phạt thế nào? 3 hành vi hay bị lập biên bản',
  lead: 'Cơ sở thuộc diện mà không mua bảo hiểm cháy nổ bắt buộc bị xử phạt theo Điều 17 Nghị định 106/2025/NĐ-CP. Từ 20/4/2026, Nghị định 69/2026/NĐ-CP bổ sung xử phạt hành vi mua không đủ đối tượng bảo hiểm và biện pháp buộc mua. Nộp phạt không thay cho việc mua.',
  image: '/assets/kho-cong-vao-kho.webp',
  alt: 'Cổng vào khu nhà kho, số nhà và biển tên đã được làm mờ',
  readMin: 5,
};

export const crumb = 'Pháp lý cháy nổ';
export const hero = { name: 'kho-cong-vao-kho', w: 1000, h: 1333, position: '50% 50%', caption: 'Ảnh thực tế: cổng vào một khu kho tại TP.HCM; số nhà, biển tên đã làm mờ. PVI Thành Đô khảo sát tháng 10/2026.' };
export const seo = {
  title: 'Không mua bảo hiểm cháy nổ bắt buộc bị phạt thế nào? | PVI',
  description: 'Xử phạt không mua bảo hiểm cháy nổ bắt buộc theo Điều 17 NĐ 106/2025, NĐ 69/2026: không mua, mua thiếu tài sản, sai mức phí; biện pháp buộc mua và cách tránh.',
};

export const toc = [
  ['can-cu', 'Căn cứ xử phạt'],
  ['hanh-vi', '3 hành vi bị xử phạt'],
  ['muc-phat', 'Mức phạt phụ thuộc gì'],
  ['buoc-mua', 'Biện pháp buộc mua'],
  ['tranh', 'Cách tránh bị lập biên bản'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Không mua bảo hiểm cháy nổ bắt buộc bị phạt theo văn bản nào?', answer: 'Điều 17 Nghị định 106/2025/NĐ-CP về xử phạt vi phạm hành chính trong lĩnh vực phòng cháy, chữa cháy, đã được Nghị định 69/2026/NĐ-CP sửa đổi, bổ sung từ 20/4/2026.' },
  { question: 'Mua bảo hiểm thiếu tài sản có bị phạt không?', answer: 'Có thể. Từ 20/4/2026, Nghị định 69/2026 bổ sung xử phạt hành vi mua không đủ đối tượng bảo hiểm hoặc không đúng mức phí. Đối tượng bảo hiểm là toàn bộ tài sản của cơ sở (Điều 23 Nghị định 67/2023).' },
  { question: 'Nộp phạt rồi có phải mua bảo hiểm nữa không?', answer: 'Có. Nghị định 69/2026 bổ sung biện pháp khắc phục hậu quả là buộc mua bảo hiểm cháy, nổ bắt buộc theo quy định. Nộp phạt không thay cho việc mua.' },
  { question: 'Mức phạt không mua bảo hiểm cháy nổ là bao nhiêu?', answer: 'Tùy hành vi, cơ sở thuộc nhóm 1 hay nhóm 2 về nguy hiểm cháy, nổ, và người vi phạm là cá nhân hay tổ chức. PVI Thành Đô chưa đối chiếu bản gốc văn bản xử phạt nên không nêu con số; hãy hỏi chuyên viên hoặc cơ quan Công an theo trường hợp cụ thể.' },
  { question: 'Hợp đồng hết hạn chưa tái tục có bị coi là không mua không?', answer: 'Trong thời gian hợp đồng hết hạn, cơ sở không có bảo hiểm. Nên tái tục trước ngày hết hạn và lưu giấy chứng nhận mới trong hồ sơ PCCC.' },
];

export const sources = [
  ['Nghị định 106/2025/NĐ-CP, Điều 17', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 69/2026/NĐ-CP sửa đổi Nghị định 106/2025 (hiệu lực 20/4/2026)', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 105/2025/NĐ-CP, Điều 35, Phụ lục II, VII; Nghị định 67/2023/NĐ-CP, Điều 23', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Bảo hiểm cháy nổ bắt buộc: tra cứu và tính phí', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Tra cơ sở thuộc diện và tính phí để mua đúng, mua đủ.' },
  { href: '/tin-tuc/co-so-phai-mua-bao-hiem-chay-no-bat-buoc/', img: 'kho-san-kho-xe-container', w: 1000, h: 1333, k: 'Cùng cụm', title: 'Cơ sở nào phải mua bảo hiểm cháy nổ bắt buộc', text: 'Bảng tra 44 loại theo Phụ lục VII.' },
];

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> cơ sở thuộc diện mà không mua <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> bị xử phạt theo Điều 17 Nghị định 106/2025/NĐ-CP. Từ 20/4/2026, mua thiếu tài sản hoặc sai mức phí cũng bị xử phạt, và cơ sở bị buộc mua theo quy định (Nghị định 69/2026/NĐ-CP).</p>

<h2 id="can-cu">Căn cứ xử phạt</h2>
<p>Nghĩa vụ mua nằm ở Điều 35 Nghị định 105/2025: cơ sở thuộc danh mục Phụ lục VII phải mua bảo hiểm cháy, nổ bắt buộc cho tài sản của cơ sở. Hành vi vi phạm nghĩa vụ này bị xử phạt theo Điều 17 Nghị định 106/2025, đã được Nghị định 69/2026 sửa đổi, bổ sung từ 20/4/2026.</p>

<h2 id="hanh-vi">3 hành vi bị xử phạt</h2>
<ol class="kb-steps">
<li><b>Không mua.</b> Cơ sở có tên trong Phụ lục VII nhưng không có hợp đồng bảo hiểm cháy, nổ bắt buộc còn hiệu lực.</li>
<li><b>Mua không đủ đối tượng bảo hiểm.</b> Chỉ mua cho nhà xưởng, bỏ máy móc, hàng hóa; trong khi đối tượng là toàn bộ tài sản của cơ sở (Điều 23 Nghị định 67/2023).</li>
<li><b>Mua không đúng mức phí.</b> Tỷ lệ phí thấp hơn mức tối thiểu tại <a class="kb-link" href="${CHAY_NO}#bieu-phi">biểu phí Phụ lục VI</a>.</li>
</ol>

<h2 id="muc-phat">Mức phạt phụ thuộc những gì?</h2>
<ul>
<li><b>Nhóm nguy hiểm cháy, nổ của cơ sở</b> (nhóm 1 hoặc nhóm 2 theo Phụ lục II Nghị định 105/2025). Ví dụ chung cư từ 7 tầng hoặc sàn từ 3.000 m² là nhóm 1.</li>
<li><b>Người vi phạm là cá nhân hay tổ chức.</b></li>
<li><b>Loại hành vi:</b> không mua, hay mua thiếu, mua sai mức phí.</li>
</ul>
<p>PVI Thành Đô chưa đối chiếu được bản gốc Nghị định 106/2025 và Nghị định 69/2026, nên bài này không nêu con số tiền phạt để tránh dẫn sai. Một số trang tin còn đảo mức phạt giữa nhóm 1 và nhóm 2; hãy đối chiếu văn bản gốc trước khi kết luận.</p>

<h2 id="buoc-mua">Nộp phạt xong vẫn phải mua</h2>
<p>Nghị định 69/2026 bổ sung biện pháp khắc phục hậu quả: buộc mua bảo hiểm cháy, nổ bắt buộc theo quy định. Rủi ro lớn hơn tiền phạt là khi cháy xảy ra trong thời gian chưa mua hoặc tài sản không có trong hợp đồng: phần đó không được bồi thường.</p>

<h2 id="tranh">Cách tránh bị lập biên bản về bảo hiểm</h2>
<ul>
<li>Kiểm tra cơ sở có thuộc diện tại <a class="kb-link" href="/tin-tuc/co-so-phai-mua-bao-hiem-chay-no-bat-buoc/">bảng tra cơ sở phải mua bảo hiểm cháy nổ</a>.</li>
<li>Mua đủ tài sản: nhà, công trình, máy móc thiết bị, hàng hóa vật tư.</li>
<li>Tỷ lệ phí không thấp hơn Phụ lục VI.</li>
<li>Tái tục trước ngày hết hạn, lưu giấy chứng nhận trong hồ sơ PCCC tối thiểu 05 năm.</li>
<li>Báo doanh nghiệp bảo hiểm khi thêm máy móc, chuyển kho, đổi tên cơ sở.</li>
</ul>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Rà hợp đồng trước đợt kiểm tra PCCC</h2>
<p>Gửi hợp đồng, giấy chứng nhận đang có qua <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a>. PVI Thành Đô kiểm tra danh mục tài sản, tỷ lệ phí và thời hạn, báo phí bổ sung nếu thiếu.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
