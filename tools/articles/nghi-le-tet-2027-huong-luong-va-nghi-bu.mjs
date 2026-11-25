const COVER = 'tn-cach-tinh-nghi-le-tet-2027';
const CHART = 'tn-nghi-bu-30-4-1-5-2027';
const SIZE = { w: 1200, h: 630 };
const CALENDAR = '/tin-tuc/lich-nghi-le-tet-2027/';
const LUNAR_NEW_YEAR = '/tin-tuc/lich-nghi-tet-nguyen-dan-2027/';

export const post = {
  slug: 'nghi-le-tet-2027-huong-luong-va-nghi-bu',
  date: '2026-11-25',
  dateText: '25/11/2026',
  cat: 'Tin tức chung',
  title: 'Nghỉ lễ, Tết 2027 hưởng lương bao nhiêu ngày? Cách tính nghỉ bù',
  lead: 'Năm 2027 có 13 ngày lễ, Tết hưởng nguyên lương. Con số 23 ngày tính thêm ngày nghỉ cuối tuần liền kề và ngày nghỉ bù theo lịch khối công. Để chốt lịch doanh nghiệp, HR cần xác định ngày nghỉ hằng tuần của từng ca trước khi cộng ngày nghỉ bù và tính lương làm thêm.',
  image: `/assets/${COVER}.webp`,
  imageWidth: SIZE.w,
  imageHeight: SIZE.h,
  alt: 'Cách tính 23 ngày trong các đợt nghỉ năm 2027, gồm 13 ngày lễ hưởng nguyên lương và 10 ngày nghỉ hằng tuần hoặc nghỉ bù',
  readMin: 5,
  schemaType: 'NewsArticle',
};

export const crumb = 'Nghỉ lễ hưởng lương và nghỉ bù';
export const seo = {
  title: 'Nghỉ lễ, Tết 2027 hưởng lương mấy ngày? Cách tính nghỉ bù',
  description: 'Phân biệt 13 ngày lễ, Tết hưởng nguyên lương và tổng 23 ngày nghỉ năm 2027. Xem ví dụ nghỉ bù 30/4–1/5, lương làm thêm và cách chốt lịch theo ca.',
};
export const hero = {
  name: COVER,
  ...SIZE,
  caption: 'Hình ảnh minh họa 13 ngày lễ, Tết hưởng nguyên lương và 10 ngày nghỉ hằng tuần hoặc nghỉ bù trong lịch tính 23 ngày.',
};
export const toc = [
  ['so-ngay-huong-luong', '13 ngày lễ và cách tính 23 ngày'],
  ['nghi-bu-trung-cuoi-tuan', 'Cách tính nghỉ bù và ví dụ 30/4–1/5'],
  ['luong-lam-them', 'Mức lương khi làm thêm'],
  ['chot-lich-doanh-nghiep', 'Chốt lịch cho từng bộ phận'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export function body({ pic }) {
  return `
<h2 id="so-ngay-huong-luong">Vì sao có 13 ngày hưởng nguyên lương nhưng lịch cộng thành 23 ngày?</h2>
<p><strong>13 ngày</strong> là số ngày lễ, Tết hưởng nguyên lương trong năm 2027. <strong>23 ngày</strong> là tổng thời gian của 7 đợt nghỉ khi dùng lịch khối công và cộng ngày nghỉ hằng tuần liền kề, ngày nghỉ bù. Lịch 23 ngày có 13 ngày lễ, Tết, 7 ngày nghỉ hằng tuần liền kề và 3 ngày nghỉ bù.</p>
<p>Quốc hội thông qua việc bổ sung ngày 27/7 và ngày 24/11 vào danh mục nghỉ lễ, Tết hưởng nguyên lương ngày 21/11/2026. Luật sửa đổi có hiệu lực từ 01/03/2027. Ngày 24/11 đã được quy định là ngày nghỉ hưởng nguyên lương theo Nghị quyết 28/2026/QH16.</p>
<p>Xem <a href="${CALENDAR}">bảng lịch nghỉ lễ, Tết năm 2027 theo từng đợt</a> để đối chiếu các mốc dương lịch.</p>

<h2 id="nghi-bu-trung-cuoi-tuan">Ngày lễ trùng lịch nghỉ hằng tuần thì nghỉ bù khi nào?</h2>
<p>Theo khoản 3 Điều 111 Bộ luật Lao động, nếu ngày nghỉ hằng tuần trùng ngày nghỉ lễ, Tết thì người lao động được nghỉ bù ngày nghỉ hằng tuần vào ngày làm việc kế tiếp. Trong đợt 30/4 và 1/5 năm 2027, cách áp dụng phụ thuộc lịch nghỉ đã bố trí cho từng nhóm.</p>
<div class="kb-table">
  <table>
    <caption>Ví dụ hai lịch làm việc trong đợt 30/4 và 1/5 năm 2027</caption>
    <thead><tr><th scope="col">Lịch nghỉ hằng tuần</th><th scope="col">Diễn giải</th><th scope="col">Kỳ nghỉ theo ví dụ</th></tr></thead>
    <tbody>
      <tr><td>Thứ Bảy và Chủ nhật</td><td>01/05 trùng ngày nghỉ hằng tuần. Chủ nhật 02/05 nghỉ theo tuần. Thứ Hai 03/05 nghỉ bù.</td><td>30/04–03/05, 4 ngày</td></tr>
      <tr><td>Chỉ Chủ nhật</td><td>01/05 vẫn là ngày nghỉ lễ. Chủ nhật 02/05 nghỉ theo tuần. Thứ Hai 03/05 làm việc theo lịch thông thường.</td><td>30/04–02/05, 3 ngày</td></tr>
    </tbody>
  </table>
</div>
<figure class="kb-photo kb-doc">
  ${pic(CHART, { w: 1280, h: 800, sizes: '(max-width:820px) 100vw, 700px', alt: 'So sánh đợt 30/4 và 1/5/2027: nhóm nghỉ thứ Bảy và Chủ nhật nghỉ đến 3/5, nhóm chỉ nghỉ Chủ nhật đi làm lại 3/5.' })}
  <figcaption>Hình ảnh minh họa hai lịch tuần. Ví dụ áp dụng khoản 3 Điều 111 Bộ luật Lao động và giả định không có ngày nghỉ bổ sung của doanh nghiệp.</figcaption>
</figure>

<h2 id="luong-lam-them">Làm thêm ngày lễ và ngày nghỉ bù được trả thế nào?</h2>
<p>Theo Điều 98 Bộ luật Lao động và Điều 55 Nghị định 145/2020/NĐ-CP, làm thêm ban ngày vào ngày lễ, Tết được trả ít nhất <strong>300%</strong> theo căn cứ tính lương làm thêm. Mức này chưa kể tiền lương ngày lễ, Tết đối với người lao động hưởng lương ngày.</p>
<p>Nếu làm thêm đúng ngày lễ trùng ngày nghỉ hằng tuần, áp dụng mức của ngày lễ. Nếu làm thêm ban ngày vào ngày nghỉ bù do sự trùng này, áp dụng mức ngày nghỉ hằng tuần, ít nhất <strong>200%</strong>. Ca làm ban đêm có quy định trả thêm riêng tại Điều 98.</p>

<h2 id="chot-lich-doanh-nghiep">HR nên chốt lịch nghỉ lễ, Tết 2027 thế nào?</h2>
<p>Bắt đầu từ lịch nghỉ hằng tuần của từng nhóm nhân sự, sau đó đánh dấu ngày lễ, ngày nghỉ bù và ngày trở lại làm việc. Với Tết Nguyên đán và Quốc khánh, Thông báo 11483/TB-BNV yêu cầu thông báo phương án cho người lao động ít nhất 30 ngày trước khi thực hiện.</p>
<ol>
  <li><strong>Xác định lịch tháng</strong> theo ngày nghỉ hằng tuần của từng bộ phận hoặc ca.</li>
  <li><strong>Đánh dấu ngày nghỉ theo luật</strong> và ghi riêng ngày nghỉ bù phát sinh nếu trùng lịch nghỉ hằng tuần.</li>
  <li><strong>Đối chiếu lịch trực với bảng chấm công</strong> để phân loại ngày lễ, ngày nghỉ hằng tuần và ngày nghỉ bù trước khi tính lương.</li>
  <li><strong>Gửi lịch đã chốt</strong> cho người lao động, ghi đủ ngày nghỉ và ngày làm việc trở lại.</li>
</ol>
<p>Với kỳ nghỉ đầu năm, dùng <a href="${LUNAR_NEW_YEAR}#mau-thong-bao">mẫu thông báo nghỉ Tết Nguyên đán Đinh Mùi 2027</a> để điền lịch thực tế của doanh nghiệp.</p>
`;
}

export const related = [{
  href: '/san-pham/bao-hiem-tai-nan/',
  img: 'tai-nan',
  k: 'Bảo hiểm cho nhân sự',
  title: 'Bảo hiểm tai nạn 24/24',
  text: 'Xem phạm vi và điều kiện khi doanh nghiệp rà soát bảo hiểm cho nhân sự.',
}];

export const faqs = [
  { question: 'Người làm thứ Bảy có được nghỉ bù thứ Hai 03/05/2027 không?', answer: 'Nếu thứ Bảy 01/05 là ngày làm việc theo lịch tuần của người lao động thì ngày này được nghỉ Quốc tế Lao động. Trường hợp ngày nghỉ hằng tuần duy nhất là Chủ nhật 02/05, lịch đó không phát sinh ngày nghỉ bù 03/05 do 01/05 trùng ngày nghỉ hằng tuần.' },
  { question: 'Làm ngày 01/05 và làm ngày nghỉ bù 03/05 tính như nhau không?', answer: 'Điều 55 Nghị định 145/2020/NĐ-CP quy định hai trường hợp. Làm thêm ban ngày vào ngày lễ 01/05 áp dụng mức ngày lễ, ít nhất 300%. Nếu 03/05 là ngày nghỉ bù do ngày lễ trùng ngày nghỉ hằng tuần, làm thêm ban ngày áp dụng mức ngày nghỉ hằng tuần, ít nhất 200%.' },
  { question: 'Mốc báo trước 30 ngày áp dụng cho những dịp nào theo Thông báo 11483?', answer: 'Thông báo 11483/TB-BNV quy định người sử dụng lao động thông báo phương án nghỉ Tết Âm lịch và nghỉ lễ Quốc khánh năm 2027 ít nhất 30 ngày trước khi thực hiện. Doanh nghiệp căn theo ngày bắt đầu nghỉ của phương án đã chọn để xác định hạn gửi thông báo.' },
];

export const sources = [
  ['Bộ luật Lao động số 45/2019/QH14, Điều 98, Điều 111 và Điều 112', '', 'Quốc hội · 20/11/2019 · hiệu lực 01/01/2021'],
  ['Nghị định 145/2020/NĐ-CP, Điều 55', '', 'Chính phủ · 14/12/2020 · hiệu lực 01/02/2021'],
  ['Luật sửa đổi Bộ luật Lao động và bốn luật thuộc lĩnh vực nội vụ', '', 'Quốc hội thông qua 21/11/2026 · hiệu lực 01/03/2027'],
  ['Nghị quyết 28/2026/QH16 về phát triển văn hóa Việt Nam', '', 'Quốc hội · 24/04/2026'],
  ['Thông báo 11483/TB-BNV', '', 'Bộ Nội vụ · 09/10/2026'],
  ['Chi tiết 23 ngày nghỉ lễ, Tết năm 2027', '', 'Tuổi Trẻ Online · tham khảo cách trình bày các đợt nghỉ và tình huống trả lương'],
];
export const disclaimer = 'Các ví dụ minh họa cách tính theo lịch tuần. Lịch theo ca và mức lương thực tế cần được đối chiếu với lịch làm việc, bảng chấm công và quy định áp dụng.';
