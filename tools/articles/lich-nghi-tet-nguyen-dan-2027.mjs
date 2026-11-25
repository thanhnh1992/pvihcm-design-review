const COVER = 'tn-lich-nghi-tet-nguyen-dan-2027';
const FIGURE = 'tn-lich-nghi-tet-2027-khoi-cong';
const SIZE = { w: 1200, h: 630 };
const NOTICE = 'Thông báo 11483/TB-BNV ngày 09/10/2026 của Bộ Nội vụ';

export const post = {
  slug: 'lich-nghi-tet-nguyen-dan-2027',
  date: '2026-11-25',
  dateText: '25/11/2026',
  cat: 'Tin tức chung',
  title: 'Lịch nghỉ Tết Nguyên đán 2027 và mẫu thông báo cho doanh nghiệp',
  lead: 'Theo Thông báo 11483/TB-BNV, công chức, viên chức nghỉ Tết Nguyên đán Đinh Mùi 2027 từ thứ Năm 04/02 đến hết thứ Tư 10/02/2027. Doanh nghiệp chọn một trong ba phương án nghỉ Tết 5 ngày và thông báo cho người lao động ít nhất 30 ngày trước khi thực hiện.',
  image: `/assets/${COVER}.webp`,
  imageWidth: SIZE.w,
  imageHeight: SIZE.h,
  alt: 'Lịch nghỉ Tết Đinh Mùi 2027 của khối công chức, viên chức từ ngày 04/02 đến hết ngày 10/02',
  readMin: 4,
  schemaType: 'NewsArticle',
};

export const crumb = 'Lịch nghỉ Tết Nguyên đán 2027';
export const seo = {
  title: 'Lịch nghỉ Tết Nguyên đán 2027 và mẫu thông báo nghỉ Tết',
  description: 'Lịch nghỉ Tết Đinh Mùi 2027 theo Thông báo 11483/TB-BNV. Khối công nghỉ từ 04/02 đến 10/02. Xem 3 phương án và mẫu thông báo nghỉ Tết cho doanh nghiệp.',
};
export const hero = {
  name: COVER,
  ...SIZE,
  caption: `Hình ảnh minh họa lịch nghỉ Tết Đinh Mùi 2027 của khối công chức, viên chức theo ${NOTICE}.`,
};

export const toc = [
  ['lich-khoi-cong', 'Lịch nghỉ của công chức, viên chức'],
  ['lich-doanh-nghiep', 'Ba phương án cho doanh nghiệp'],
  ['mau-thong-bao', 'Mẫu thông báo nghỉ Tết 2027'],
  ['lich-tphcm', 'Lịch nghỉ Tết 2027 tại TP.HCM'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
  ['nguon', 'Nguồn tham chiếu'],
];

export function body({ pic }) {
  return `
<h2 id="lich-khoi-cong">Công chức, viên chức nghỉ Tết 2027 từ ngày nào?</h2>
<p>Theo ${NOTICE}, kỳ nghỉ kéo dài <strong>7 ngày liên tục, từ 04/02 đến hết 10/02/2027</strong>. Lịch này tương ứng từ 28 tháng Chạp năm Bính Ngọ đến mùng 5 tháng Giêng năm Đinh Mùi, gồm 5 ngày nghỉ Tết và 2 ngày nghỉ bù do trùng ngày nghỉ hằng tuần.</p>
<p>Mùng 1 Tết là thứ Bảy 06/02/2027. Theo lịch nghỉ trên, cơ quan làm việc theo tuần từ thứ Hai đến thứ Sáu trở lại vào thứ Năm 11/02/2027. Đơn vị có lịch nghỉ hằng tuần khác bố trí theo kế hoạch công tác của mình.</p>
<figure class="kb-photo kb-chart">
  ${pic(FIGURE, { w: 1280, h: 720, sizes: '(max-width:820px) 100vw, 700px', alt: 'Lịch Tết 2027 của khối công chức, viên chức. Ngày 4 đến 8/2 nghỉ Tết, 9 và 10/2 nghỉ bù, 11/2 làm việc trở lại theo lịch tuần thông thường.' })}
  <figcaption>Hình ảnh minh họa các mốc nghỉ Tết và nghỉ bù theo ${NOTICE}.</figcaption>
</figure>
<p>Trong giai đoạn lấy ý kiến, Bộ Nội vụ từng nêu phương án nghỉ 10 ngày. Lịch đã chốt tại Thông báo 11483/TB-BNV là 7 ngày.</p>

<h2 id="lich-doanh-nghiep">Doanh nghiệp nghỉ Tết Nguyên đán 2027 mấy ngày?</h2>
<p>Doanh nghiệp bố trí <strong>5 ngày nghỉ Tết hưởng nguyên lương</strong>. Theo ${NOTICE}, người sử dụng lao động chọn một trong ba cách bố trí dưới đây tùy lịch vận hành và lịch nghỉ hằng tuần.</p>
<div class="kb-table">
  <table>
    <caption>Ba phương án bố trí 5 ngày nghỉ Tết Đinh Mùi cho doanh nghiệp</caption>
    <thead><tr><th scope="col">Cách bố trí theo âm lịch</th><th scope="col">Năm ngày tương ứng theo dương lịch</th></tr></thead>
    <tbody>
      <tr><td>1 ngày cuối năm và 4 ngày đầu năm</td><td>05/02 đến hết 09/02/2027</td></tr>
      <tr><td>2 ngày cuối năm và 3 ngày đầu năm</td><td>04/02 đến hết 08/02/2027</td></tr>
      <tr><td>3 ngày cuối năm và 2 ngày đầu năm</td><td>03/02 đến hết 07/02/2027</td></tr>
    </tbody>
  </table>
</div>
<p>Bảng quy đổi 5 ngày nghỉ Tết theo từng phương án. Nếu ngày nghỉ hằng tuần trùng ngày nghỉ Tết, người lao động được nghỉ bù vào ngày làm việc kế tiếp theo khoản 3 Điều 111 Bộ luật Lao động. Doanh nghiệp ghi rõ ngày nghỉ bù và ngày đi làm lại theo lịch của từng bộ phận.</p>

<h2 id="mau-thong-bao">Mẫu thông báo nghỉ Tết Nguyên đán 2027 cho doanh nghiệp</h2>
<p>Doanh nghiệp phải thông báo phương án nghỉ Tết cho người lao động <strong>ít nhất 30 ngày trước khi thực hiện</strong>, theo ${NOTICE}. Bộ phận nhân sự có thể sao chép mẫu sau và điền lịch đã được phê duyệt.</p>
<blockquote>
  <p><strong>[Tên doanh nghiệp] thông báo lịch nghỉ Tết Nguyên đán Đinh Mùi 2027</strong></p>
  <p>Kính gửi toàn thể người lao động tại [tên đơn vị hoặc bộ phận]. Công ty bố trí 5 ngày nghỉ Tết hưởng nguyên lương từ [thứ, ngày/tháng/2027] đến hết [thứ, ngày/tháng/2027].</p>
  <ul>
    <li><strong>Ngày nghỉ bù hằng tuần</strong> [Ghi ngày cụ thể nếu có].</li>
    <li><strong>Ngày làm việc trở lại</strong> [Thứ, ngày/tháng/2027 và giờ bắt đầu].</li>
    <li><strong>Lịch trực và bàn giao</strong> [Bộ phận, người phụ trách và cách liên hệ].</li>
    <li><strong>Đầu mối giải đáp</strong> [Phòng Nhân sự, email hoặc số điện thoại].</li>
  </ul>
  <p>[Ngày ban hành] · [Người ký và chức vụ]</p>
</blockquote>
<p>Với doanh nghiệp làm việc theo ca, nên gửi kèm bảng ngày nghỉ, ngày nghỉ bù và thời điểm trở lại làm việc của từng ca. Nếu cần báo cho khách hàng, dùng lịch giao dịch thực tế và ghi riêng giờ mở cửa trở lại.</p>

<h2 id="lich-tphcm">Lịch nghỉ Tết 2027 tại TP.HCM xem ở đâu?</h2>
<p>Tại TP.HCM, người đi làm tra lịch theo thông báo của cơ quan hoặc doanh nghiệp mình. Phụ huynh xem lịch do ngành giáo dục hoặc nhà trường công bố. Khách hàng cần giao dịch với PVI Thành Đô trong dịp Tết có thể <a href="tel:0938072236">gọi 0938 072 236</a> để xác nhận giờ làm việc.</p>
`;
}

export const related = [
  {
    href: '/san-pham/bao-hiem-du-lich/',
    img: 'hero-du-lich',
    k: 'Du lịch quốc tế',
    title: 'Bảo hiểm du lịch PVI',
    text: 'Xem quyền lợi và điều kiện nếu bạn đi nước ngoài dịp Tết.',
  },
];

export const faqs = [
  {
    question: 'Mùng 1 Tết Nguyên đán 2027 là ngày nào?',
    answer: 'Mùng 1 Tết Đinh Mùi là thứ Bảy 06/02/2027. Theo Thông báo 11483/TB-BNV, lịch của khối công chức, viên chức bắt đầu sớm hơn hai ngày, từ thứ Năm 04/02/2027, và kết thúc vào hết thứ Tư 10/02/2027, tức mùng 5 tháng Giêng.',
  },
  {
    question: 'Lịch nghỉ Tết 2027 của công ty có giống lịch 7 ngày của khối công chức không?',
    answer: 'Doanh nghiệp có thể áp dụng thời gian nghỉ tương tự lịch của công chức, viên chức nếu bảo đảm đủ chế độ cho người lao động. Số ngày nghỉ liền mạch thực tế phụ thuộc vào phương án công ty chọn, lịch nghỉ hằng tuần và số ngày nghỉ bù phát sinh.',
  },
  {
    question: 'Khi nào công ty phải gửi thông báo nghỉ Tết Nguyên đán 2027?',
    answer: 'Theo Thông báo 11483/TB-BNV, doanh nghiệp phải báo cho người lao động ít nhất 30 ngày trước khi thực hiện phương án nghỉ Tết. Hãy căn ngày gửi từ ngày bắt đầu nghỉ của doanh nghiệp và nêu rõ trong thông báo ngày nghỉ bù, ngày làm việc lại và lịch trực nếu có.',
  },
];

export const sources = [
  ['Thông báo 11483/TB-BNV về nghỉ Tết Âm lịch và nghỉ lễ Quốc khánh năm 2027', '', 'Bộ Nội vụ · 09/10/2026'],
  ['Công văn 10065/VPCP-KGVX về phương án nghỉ một số dịp lễ, Tết năm 2026 và năm 2027', '', 'Văn phòng Chính phủ · 02/10/2026'],
  ['Bộ luật Lao động số 45/2019/QH14, Điều 111 và Điều 112', '', 'Quốc hội · 20/11/2019 · hiệu lực từ 01/01/2021'],
  ['Lịch nghỉ Tết Nguyên đán Đinh Mùi, nghỉ lễ Quốc khánh 2027', '', 'Báo điện tử Chính phủ'],
];

export const disclaimer = 'Lịch giao dịch của từng cơ quan, doanh nghiệp và nhà trường thực hiện theo thông báo của đơn vị đó.';
