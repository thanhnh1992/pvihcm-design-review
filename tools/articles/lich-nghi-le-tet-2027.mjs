const COVER = 'tn-lich-nghi-le-tet-2027';
const CHART = 'tn-bang-7-dot-nghi-2027';
const SIZE = { w: 1200, h: 630 };
const WORKPLACE_GUIDE = '/tin-tuc/nghi-le-tet-2027-huong-luong-va-nghi-bu/';
const LUNAR_NEW_YEAR = '/tin-tuc/lich-nghi-tet-nguyen-dan-2027/';

export const post = {
  slug: 'lich-nghi-le-tet-2027',
  date: '2026-11-25',
  dateText: '25/11/2026',
  cat: 'Tin tức chung',
  title: 'Lịch nghỉ lễ, Tết năm 2027 và bảng tra 23 ngày nghỉ',
  lead: 'Lịch nghỉ lễ, Tết 2027 có thể nối thành 23 ngày qua 7 đợt nếu áp dụng lịch khối công và nghỉ thứ Bảy, Chủ nhật. Tổng này gồm 13 ngày lễ, Tết hưởng nguyên lương cùng ngày nghỉ hằng tuần liền kề và ngày nghỉ bù. Bảng dưới đây ghi ngày bắt đầu và ngày kết thúc từng đợt.',
  image: `/assets/${COVER}.webp`,
  imageWidth: SIZE.w,
  imageHeight: SIZE.h,
  alt: 'Lịch nghỉ lễ, Tết 2027 với 7 đợt, tổng 23 ngày theo lịch khối công và cuối tuần thứ Bảy, Chủ nhật',
  readMin: 4,
  schemaType: 'NewsArticle',
};

export const crumb = 'Lịch nghỉ lễ, Tết 2027';
export const seo = {
  title: 'Lịch nghỉ lễ, Tết 2027 | Bảng tra 7 đợt, 23 ngày',
  description: 'Tra lịch nghỉ lễ, Tết năm 2027 từ Tết Dương lịch đến 24/11. Bảng 7 đợt, 23 ngày theo lịch khối công và chế độ nghỉ thứ Bảy, Chủ nhật.',
};
export const hero = {
  name: COVER,
  ...SIZE,
  caption: 'Hình ảnh minh họa tổng 23 ngày qua 7 đợt theo lịch khối công và tuần nghỉ thứ Bảy, Chủ nhật.',
};
export const toc = [
  ['bang-ngay', 'Bảng tra ngày nghỉ năm 2027'],
  ['hai-ngay-moi', 'Ngày 27/7 và ngày 24/11'],
  ['lich-tet-quoc-khanh', 'Lịch Tết và Quốc khánh của doanh nghiệp'],
  ['nghi-lien-mach', 'Các đợt nghỉ liền mạch từ 3 ngày'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

const calendar = [
  ['Tết Dương lịch', '01–03/01', 'Thứ Sáu đến Chủ nhật', 1, 3],
  ['Tết Nguyên đán Đinh Mùi', '04–10/02', 'Thứ Năm đến thứ Tư', 5, 7],
  ['Giỗ Tổ Hùng Vương', '16–18/04', 'Thứ Sáu đến Chủ nhật', 1, 3],
  ['Ngày Chiến thắng và Quốc tế Lao động', '30/04–03/05', 'Thứ Sáu đến thứ Hai', 2, 4],
  ['Ngày Tổ quốc tri ân (27/7)', '27/07', 'Thứ Ba', 1, 1],
  ['Quốc khánh', '02–05/09', 'Thứ Năm đến Chủ nhật', 2, 4],
  ['Ngày Văn hóa Việt Nam', '24/11', 'Thứ Tư', 1, 1],
];

export function body({ pic }) {
  return `
<h2 id="bang-ngay">Bảng lịch nghỉ lễ, Tết năm 2027 theo từng đợt</h2>
<p><strong>13 ngày lễ, Tết hưởng nguyên lương</strong> nằm trong 7 đợt nghỉ của bảng này. Mốc Tết Nguyên đán và Quốc khánh lấy theo Thông báo 11483/TB-BNV của Bộ Nội vụ. Hai ngày 27/7 và 24/11 được ghi theo luật Quốc hội thông qua ngày 21/11/2026.</p>
<div class="kb-table">
  <table>
    <caption>Các mốc dương lịch năm 2027 với tuần nghỉ thứ Bảy, Chủ nhật</caption>
    <thead><tr><th scope="col">Dịp nghỉ</th><th scope="col">Thời gian</th><th scope="col">Ngày lễ, Tết hưởng nguyên lương</th><th scope="col">Ngày nghỉ liền mạch</th></tr></thead>
    <tbody>
      ${calendar.map(([event, date, days, paid, total]) => `<tr><th scope="row">${event}</th><td><strong>${date}</strong><br>${days}</td><td>${paid}</td><td>${total}</td></tr>`).join('\n      ')}
      <tr><th scope="row">Cộng cả năm</th><td>7 đợt</td><td><strong>13</strong></td><td><strong>23</strong></td></tr>
    </tbody>
  </table>
</div>
<p>Ngày 30/04/2027 rơi vào thứ Sáu, còn 01/05 rơi vào thứ Bảy. Nếu thứ Bảy là ngày nghỉ hằng tuần, ngày thứ Hai 03/05 là ngày nghỉ bù, tạo thành kỳ nghỉ 4 ngày liền.</p>
<figure class="kb-photo kb-doc">
  ${pic(CHART, { w: 1280, h: 960, sizes: '(max-width:820px) 100vw, 700px', alt: 'Bảy đợt nghỉ năm 2027 theo thứ tự: 01–03/01, 04–10/02, 16–18/04, 30/04–03/05, 27/07, 02–05/09 và 24/11.' })}
  <figcaption>Hình ảnh minh họa bảy đợt nghỉ lễ, Tết. Số ngày liền mạch tính theo lịch khối công và tuần nghỉ thứ Bảy, Chủ nhật.</figcaption>
</figure>

<h2 id="hai-ngay-moi">Năm 2027, ngày 27/7 và ngày 24/11 nghỉ thế nào?</h2>
<p><strong>Thứ Ba 27/07/2027</strong> là Ngày Tổ quốc tri ân, Ngày Thương binh, liệt sĩ. <strong>Thứ Tư 24/11/2027</strong> là Ngày Văn hóa Việt Nam. Mỗi dịp có một ngày nghỉ hưởng nguyên lương theo luật được Quốc hội thông qua ngày 21/11/2026, có hiệu lực từ 01/03/2027.</p>
<p>Cả hai ngày rơi giữa tuần nên bảng tính mỗi dịp một ngày. Riêng ngày 24/11 đã được Quốc hội quy định là ngày nghỉ hưởng nguyên lương tại Nghị quyết 28/2026/QH16 về phát triển văn hóa Việt Nam.</p>

<h2 id="lich-tet-quoc-khanh">Doanh nghiệp xem lịch Tết và Quốc khánh ở đâu?</h2>
<p>Doanh nghiệp căn cứ Thông báo 11483/TB-BNV và lịch làm việc của mình để bố trí Tết Nguyên đán, Quốc khánh. Tết có ba cách bố trí 5 ngày nghỉ. Quốc khánh có 2 ngày nghỉ, gồm 02/09 và một ngày do doanh nghiệp chọn giữa 01/09 và 03/09.</p>
<p>Tra <a href="${LUNAR_NEW_YEAR}">ba phương án nghỉ Tết Đinh Mùi và mẫu thông báo cho doanh nghiệp</a> để đối chiếu ngày cụ thể. Nếu đang chốt lịch theo ca, xem <a href="${WORKPLACE_GUIDE}">cách tính ngày lễ hưởng lương và ngày nghỉ bù năm 2027</a>.</p>

<h2 id="nghi-lien-mach">Đợt nào nghỉ liền từ 3 ngày trở lên?</h2>
<p>Theo bảng lịch khối công, có 5 đợt từ 3 ngày trở lên. Tết Nguyên đán dài nhất với 7 ngày. Hai đợt 30/4–1/5 và Quốc khánh có 4 ngày, còn Tết Dương lịch và Giỗ Tổ có 3 ngày.</p>
<p>Nếu định đi xa, hãy đối chiếu lịch của nơi làm việc trước khi đặt vé, đặc biệt nếu bạn làm thứ Bảy hoặc theo ca luân phiên.</p>
`;
}

export const related = [{
  href: '/san-pham/bao-hiem-du-lich/',
  img: 'hero-du-lich',
  k: 'Du lịch quốc tế',
  title: 'Bảo hiểm du lịch PVI',
  text: 'Tra quyền lợi và điều kiện bảo hiểm trước chuyến đi nước ngoài dịp lễ.',
}];

export const faqs = [
  { question: 'Lịch nghỉ lễ, Tết năm 2027 có 23 ngày hay 13 ngày?', answer: 'Có 13 ngày lễ, Tết hưởng nguyên lương. Tổng 23 ngày là phép cộng theo lịch nghỉ khối công, với ngày nghỉ thứ Bảy và Chủ nhật liền kề hoặc ngày nghỉ bù khi trùng lịch. Số ngày nghỉ liền mạch của người làm theo ca có thể khác.' },
  { question: 'Giỗ Tổ Hùng Vương 2027 là ngày nào dương lịch?', answer: 'Mùng 10 tháng 3 âm lịch năm Đinh Mùi rơi vào thứ Sáu 16/04/2027. Đây là một ngày nghỉ lễ hưởng nguyên lương theo Điều 112 Bộ luật Lao động. Nếu nghỉ hằng tuần vào thứ Bảy và Chủ nhật, đợt nghỉ kéo dài đến hết 18/04.' },
  { question: 'Quốc khánh 2027 khối công nghỉ từ ngày nào?', answer: 'Theo Thông báo 11483/TB-BNV, khối công chức, viên chức nghỉ từ thứ Năm 02/09 đến hết Chủ nhật 05/09/2027. Hai ngày lễ là 02/09 và 03/09. Với doanh nghiệp, ngày thứ hai của kỳ nghỉ có thể là 01/09 hoặc 03/09 theo lịch công bố.' },
];

export const sources = [
  ['Lịch nghỉ Tết, nghỉ lễ năm 2027', '', 'Báo điện tử Chính phủ · đối chiếu các mốc nghỉ và bảng tổng hợp'],
  ['Thông báo 11483/TB-BNV về nghỉ Tết Âm lịch và nghỉ lễ Quốc khánh năm 2027', '', 'Bộ Nội vụ · 09/10/2026'],
  ['Luật sửa đổi Bộ luật Lao động và bốn luật thuộc lĩnh vực nội vụ', '', 'Quốc hội thông qua 21/11/2026 · hiệu lực 01/03/2027'],
  ['Nghị quyết 28/2026/QH16 về phát triển văn hóa Việt Nam', '', 'Quốc hội · 24/04/2026'],
  ['Lịch cụ thể 23 ngày nghỉ dịp lễ, Tết năm 2027', '', 'Tuổi Trẻ Online · 23/11/2026'],
];
export const disclaimer = 'Đối chiếu lịch nghỉ và lịch làm việc trở lại với thông báo của cơ quan hoặc doanh nghiệp.';
