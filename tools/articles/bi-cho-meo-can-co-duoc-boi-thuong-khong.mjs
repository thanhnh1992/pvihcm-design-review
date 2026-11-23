const TAI_NAN = '/san-pham/bao-hiem-tai-nan/';
const QUY_TAC = '/tai-lieu/pvi-quy-tac-bao-hiem-tai-nan-ca-nhan-01-07-2025.pdf';
const BANG_TY_LE = '/tai-lieu/pvi-bang-ty-le-thuong-tat-tai-nan-ca-nhan-01-07-2025.pdf';
const ANH_BIA = 'tn-cho-meo-can-so-chich-ngua';

export const post = {
  slug: 'bi-cho-meo-can-co-duoc-boi-thuong-khong',
  date: '2026-11-23',
  dateText: '23/11/2026',
  cat: 'Kiến thức · Bảo hiểm tai nạn',
  title: 'Bị chó mèo cắn có được bồi thường bảo hiểm không?',
  lead: 'Có, nếu vết chó hoặc mèo cắn gây thương tích trong thời hạn bảo hiểm và thuộc phạm vi hợp đồng bảo hiểm tai nạn cá nhân PVI. Sau khi tiêm xong theo chỉ định, hãy gộp sổ chích ngừa với giấy khám, chỉ định tiêm và hóa đơn để nộp hồ sơ.',
  image: `/assets/${ANH_BIA}.webp`,
  imageWidth: 1200,
  imageHeight: 630,
  alt: 'Nhân viên y tế chỉ lịch tiêm trong sổ chích ngừa cho người có băng ở cẳng tay tại phòng khám',
  readMin: 4,
};

export const crumb = 'Bảo hiểm tai nạn';
export const hero = {
  name: ANH_BIA,
  w: post.imageWidth,
  h: post.imageHeight,
  caption: 'Ảnh minh họa người đi khám kiểm tra sổ chích ngừa tại cơ sở y tế.',
};

export const seo = {
  title: post.title,
  description: 'Bị chó mèo cắn có được bồi thường bảo hiểm không? Xem điều kiện của bảo hiểm tai nạn PVI và cách gộp sổ chích ngừa, chỉ định tiêm, hóa đơn để nộp hồ sơ.',
};

export const toc = [
  ['dieu-kien', 'Khi nào được xem xét chi trả?'],
  ['tien-tiem', 'Tiền tiêm phòng dại được tính thế nào?'],
  ['bao-som', 'Đi khám và báo bảo hiểm sớm'],
  ['ho-so', 'Hồ sơ sau khi tiêm xong'],
  ['gui-ho-so', 'Cách nộp hồ sơ cho PVI'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
  ['nguon', 'Nguồn tham chiếu'],
];

export const faqs = [
  {
    question: 'Mèo nhà cắn có được bảo hiểm tai nạn chi trả không?',
    answer: 'Vết cắn bất ngờ của mèo nhà gây thương tích có thể được xem xét theo cùng nguyên tắc như vết chó cắn. PVI kiểm tra thời điểm xảy ra, hồ sơ khám và loại trừ theo hợp đồng. Khi đi khám, hãy nói rõ thời điểm và tình huống để cơ sở y tế ghi nhận đúng.',
  },
  {
    question: 'Tiêm phòng dại ở cơ sở khác nơi khám ban đầu thì gom giấy tờ thế nào?',
    answer: 'Giữ giấy khám và chỉ định ban đầu, sau đó thêm sổ hoặc phiếu xác nhận mũi tiêm và hóa đơn của nơi tiêm. Xếp chứng từ theo ngày để PVI đối chiếu các lần tiêm với vết cắn. Nếu giấy tờ chưa ghi rõ lý do tiêm, hãy liên hệ cơ sở y tế để lấy chứng từ phù hợp.',
  },
  {
    question: 'Mất sổ chích ngừa thì có nộp hồ sơ được không?',
    answer: 'Hãy hỏi cơ sở đã tiêm về bản sao phiếu tiêm, xác nhận lịch sử tiêm hoặc chứng từ có thể cấp lại. Gửi kèm hồ sơ khám, chỉ định và hóa đơn còn giữ. PVI sẽ hướng dẫn giấy tờ thay thế hoặc tài liệu cần bổ sung theo trường hợp cụ thể.',
  },
];

export const sources = [
  ['Quyết định 498/QĐ-PVIBH và Quy tắc bảo hiểm tai nạn cá nhân, Phần I, III, IV, V', QUY_TAC, 'Tổng công ty Bảo hiểm PVI'],
  ['Bảng tỷ lệ trả tiền bảo hiểm thương tật kèm Quy tắc bảo hiểm tai nạn cá nhân', BANG_TY_LE, 'Tổng công ty Bảo hiểm PVI'],
  ['Khuyến cáo sơ cứu và khám ngay sau khi bị động vật có nguy cơ truyền bệnh dại cắn hoặc cào', 'https://www.who.int/vietnam/vi/health-topics/rabies/rabies', 'Tổ chức Y tế Thế giới tại Việt Nam'],
];

export const related = [
  {
    href: TAI_NAN,
    img: 'tn-bao-hiem-tai-nan-la-gi',
    w: 1200,
    h: 630,
    k: 'Sản phẩm',
    title: 'Bảo hiểm tai nạn 24/24',
    text: 'Xem quyền lợi, quy tắc áp dụng và hướng dẫn yêu cầu chi trả.',
  },
  {
    href: '/tin-tuc/bao-hiem-tai-nan-va-bao-hiem-y-te-khac-nhau/',
    img: 'tn-so-sanh-bao-hiem-tai-nan-va-y-te',
    w: 1200,
    h: 630,
    k: 'Đọc thêm',
    title: 'Bảo hiểm tai nạn và bảo hiểm y tế khác nhau thế nào?',
    text: 'Đối chiếu phạm vi, cách tính khoản chi trả và giấy tờ cần giữ.',
  },
];

export function body({ pic }) {
  return `
<h2 id="dieu-kien">Bị chó hoặc mèo cắn khi nào được bảo hiểm tai nạn chi trả?</h2>
<p>Vết cắn xảy ra bất ngờ, ngoài ý muốn và trực tiếp gây thương tích có thể đáp ứng định nghĩa tai nạn trong <a class="kb-link" href="${QUY_TAC}">Quy tắc bảo hiểm tai nạn cá nhân PVI</a>. Để xem xét chi trả, PVI đối chiếu ngày xảy ra, người được bảo hiểm, phạm vi của hợp đồng và các điều khoản loại trừ. Giấy khám ghi nhận vết cắn và tình trạng thương tích là chứng từ quan trọng.</p>
<p>Ví dụ, một người bị chó cắn vào tay khi đang có <a class="kb-link" href="${TAI_NAN}">bảo hiểm tai nạn 24/24</a> có thể nộp hồ sơ yêu cầu trả tiền bảo hiểm. Cơ sở y tế ghi nhận vết thương và chỉ định xử trí, còn PVI xác định quyền lợi theo hồ sơ và giấy chứng nhận bảo hiểm của người đó.</p>

<h2 id="tien-tiem">Tiêm phòng dại sau khi bị chó mèo cắn có được bảo hiểm chi trả không?</h2>
<p>Hãy nộp chứng từ tiêm sau vết cắn nếu có chỉ định của cơ sở y tế. PVI sẽ xem khoản này có thuộc phạm vi chi phí y tế cần thiết, hợp lý theo phương thức chi trả và giới hạn ghi trong hợp đồng hay không. Hóa đơn tiêm, chỉ định và sổ chích ngừa giúp đối chiếu khoản chi với cùng một vụ tai nạn.</p>
<p>Đối với thương tật tạm thời thuộc phạm vi, Quy tắc PVI quy định cách chi trả theo tỷ lệ thương tật hoặc theo chi phí y tế có giới hạn, tùy hợp đồng. Hãy kiểm tra phương thức ghi trên giấy chứng nhận bảo hiểm trước khi tính số tiền dự kiến.</p>

<h2 id="bao-som">Đi khám và thông báo cho bảo hiểm ngay từ lần đầu</h2>
<p>WHO khuyến cáo rửa vết cắn dưới vòi nước với xà phòng ít nhất 15 phút và đến cơ sở y tế ngay để được đánh giá nguy cơ và chỉ định dự phòng phù hợp. Tuân thủ lịch hẹn của cơ sở y tế. Sau khi đi khám, liên hệ PVI hoặc đầu mối bảo hiểm của công ty để được hướng dẫn chứng từ ngay từ mũi tiêm đầu.</p>

<h2 id="ho-so">Gộp sổ chích ngừa và chứng từ sau khi tiêm xong</h2>
<p>Khi hoàn tất lịch tiêm theo chỉ định, xếp các chứng từ theo ngày và gộp chung theo một vụ tai nạn. Nếu đã mở hồ sơ trước đó, dùng mã hồ sơ để bổ sung sổ chích ngừa và các hóa đơn còn lại.</p>
<figure class="kb-photo kb-doc">
  ${pic('tn-ho-so-sau-khi-tiem-ngua', { w: 1200, h: 630, sizes: '(max-width:820px) 92vw, 700px', alt: 'Sổ chích ngừa, phiếu khám và biên lai được xếp chung trên bàn' })}
  <figcaption>Ảnh minh họa cách gom giấy tờ khám và tiêm theo cùng một vụ tai nạn.</figcaption>
</figure>
<ul>
  <li><strong>Hồ sơ bảo hiểm:</strong> Giấy yêu cầu trả tiền bảo hiểm, thông tin hợp đồng hoặc giấy chứng nhận bảo hiểm và bản tường trình vụ việc theo hướng dẫn của PVI.</li>
  <li><strong>Hồ sơ khám:</strong> Phiếu khám hoặc hồ sơ điều trị ghi nhận vết chó, mèo cắn, chỉ định tiêm và chứng từ điều trị vết thương nếu có.</li>
  <li><strong>Sổ chích ngừa:</strong> Sổ tiêm, phiếu tiêm hoặc xác nhận tiêm có ngày ghi nhận từng mũi. Chụp đủ các trang liên quan và giữ bản gốc để đối chiếu khi cần.</li>
  <li><strong>Chứng từ chi phí:</strong> Hóa đơn, bảng kê hoặc chứng từ thanh toán hợp lệ cho từng lần khám và tiêm. Nếu khám và tiêm ở hai nơi, giữ giấy tờ của cả hai.</li>
</ul>

<h2 id="gui-ho-so">Nộp hồ sơ cho PVI bằng cách nào?</h2>
<p>Gọi tổng đài <a class="kb-link" href="tel:1900545458">1900 54 54 58</a> hoặc liên hệ đầu mối được ghi trên giấy chứng nhận để biết kênh nộp, bản giấy cần giữ và thời hạn áp dụng. Khi báo sự việc, chuẩn bị ngày bị cắn, số hợp đồng hoặc giấy chứng nhận và tên cơ sở khám. Nếu lịch tiêm kéo dài, hỏi cách mở hồ sơ sớm và bổ sung chứng từ sau.</p>`;
}
