// Bài kiến thức: Bảo hiểm tai nạn công trình PVI.
// Nguồn chữ: bài Semrush chủ site cung cấp ngày 05/10/2026, giữ nguyên ý; chỉ sửa chính tả,
// tách mở bài, đổi danh sách dài thành nhóm. Bổ sung khối "bắt buộc" lấy đúng nội dung đã
// duyệt của /san-pham/bao-hiem-bat-buoc/#cong-truong (không in mức tối thiểu chưa chốt).
// Số liệu quyền lợi (300.000.000 VND, 70 tuổi, hóa đơn từ 200.000 VND) trích từ pvi.com.vn
// theo bài gốc, mỗi chỗ có link nguồn ngay cạnh.

export const post = {
  slug: 'bao-hiem-tai-nan-cong-trinh-pvi',
  date: '2026-10-05',
  dateText: '05/10/2026',
  cat: 'Kiến thức · Công trình',
  title: 'Bảo hiểm tai nạn công trình PVI',
  lead: 'Giải pháp cho chủ đầu tư, nhà thầu và đơn vị thi công chủ động chuẩn bị tài chính khi xảy ra tai nạn lao động hoặc sự cố tại công trường, có thể kết hợp với bảo hiểm công trình và bảo hiểm tai nạn cá nhân.',
  image: '/assets/section-tai-nan.webp',
  alt: 'Hình ảnh minh họa: cán bộ nhân sự trao đổi danh sách người lao động với công nhân đội mũ bảo hộ tại công trường',
  readMin: 9,
};

const SRC = {
  car: 'https://www.pvi.com.vn/vi/products/business/construction-all-risk',
  pa: 'https://www.pvi.com.vn/vi/products/personal/personal-accident',
  claim: 'https://adminweb.pvi.com.vn/wp-content/uploads/2025/04/Huong-dan-thu-tuc-va-quy-trinh-boi-thuong.pdf',
};
const cite = (key, label = 'pvi.com.vn') => `<a class="kb-cite" href="${SRC[key]}" target="_blank" rel="noopener" aria-label="Nguồn: ${label}">${label}</a>`;

export const faqs = [
  {
    question: 'Bảo hiểm cho người lao động thi công trên công trường có bắt buộc không?',
    answer: 'Có. Đây là loại bảo hiểm bắt buộc theo Nghị định 220/2026/NĐ-CP (hiệu lực 01/7/2026, sửa đổi Nghị định 67/2023/NĐ-CP). Nhà thầu cần giấy chứng nhận đúng tên gói thầu và hóa đơn VAT. Mức trách nhiệm tối thiểu cần đối chiếu nguyên văn điều khoản cho từng loại công trình; nhiều chủ đầu tư đặt mức cao hơn mức tối thiểu.',
  },
  {
    question: 'Bảo hiểm tai nạn công trình có thay được bảo hiểm mọi rủi ro xây dựng không?',
    answer: 'Không. Bảo hiểm tai nạn bảo vệ con người khi bị tai nạn. Bảo hiểm mọi rủi ro xây dựng bảo vệ thiệt hại vật chất của công trình đang thi công và trách nhiệm pháp lý với bên thứ ba. Công trình có cả hai nhóm rủi ro nên xem xét kết hợp.',
  },
  {
    question: 'Phí bảo hiểm tai nạn công trình PVI là bao nhiêu?',
    answer: 'Phí phụ thuộc số lượng lao động, ngành nghề thi công, thời hạn, số tiền bảo hiểm, quyền lợi bổ sung và mức độ rủi ro công việc. Với bảo hiểm công trình còn phụ thuộc giá trị xây dựng, loại công trình, thời gian và biện pháp thi công. Cần gửi thông tin công trình để nhận báo phí chính thức.',
  },
  {
    question: 'Khi có tai nạn lao động cần chuẩn bị hồ sơ gì?',
    answer: 'Biên bản tai nạn lao động do cơ quan nơi người được bảo hiểm làm việc lập và xác nhận, hoặc bản tường trình theo mẫu; thông tin người chứng kiến nếu có; chứng từ y tế như giấy ra viện, toa thuốc, hóa đơn, bảng kê chi phí. Nên liên hệ PVI để được hướng dẫn mẫu biểu và thời hạn nộp.',
  },
];

export const sources = [
  ['Bảo hiểm mọi rủi ro xây dựng', SRC.car, 'Bảo hiểm PVI · pvi.com.vn'],
  ['Bảo hiểm tai nạn cá nhân', SRC.pa, 'Bảo hiểm PVI · pvi.com.vn'],
  ['Hướng dẫn thủ tục và quy trình bồi thường (PDF)', SRC.claim, 'Bảo hiểm PVI · adminweb.pvi.com.vn'],
  ['Người lao động thi công trên công trường (bảo hiểm bắt buộc)', '/san-pham/bao-hiem-bat-buoc/#cong-truong', 'PVI Thành Đô'],
];

export const toc = [
  ['phu-hop', 'Phù hợp với ai'],
  ['bat-buoc', 'Phần bắt buộc với nhà thầu'],
  ['quyen-loi', 'Quyền lợi nổi bật'],
  ['phuong-an', 'Thông tin để nhận báo giá'],
  ['nhan-tho', 'Khác bảo hiểm nhân thọ'],
  ['bao-gia', 'Phí và quy trình báo giá'],
  ['boi-thuong', 'Hồ sơ bồi thường'],
  ['vi-sao-pvi', 'Vì sao chọn PVI'],
  ['ra-soat', 'Rà soát trước khi phát hành'],
  ['tinh-huong', 'Tình huống tham khảo'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export function body({ img, ctaRow }) {
  return `
<p class="kb-first">Một công trình đang thi công luôn có nhiều rủi ro cùng lúc: tai nạn lao động, thiệt hại vật tư, sự cố máy móc, ảnh hưởng đến người và tài sản xung quanh. Gói bảo hiểm tai nạn công trình PVI giúp chủ đầu tư, nhà thầu và đơn vị thi công chủ động chuẩn bị phương án tài chính khi phát sinh sự cố, đồng thời có thể kết hợp với bảo hiểm công trình và <a class="kb-link" href="/san-pham/bao-hiem-tai-nan/">bảo hiểm tai nạn cá nhân</a> tùy nhu cầu thực tế. Đây là giải pháp phù hợp cho các dự án xây dựng dân dụng, công nghiệp, hạ tầng và lắp đặt cần quản trị rủi ro bài bản ngay từ đầu.</p>

<h2 id="phu-hop">Gói bảo hiểm này phù hợp với ai?</h2>
<p>Bảo hiểm tai nạn công trình PVI phù hợp với các doanh nghiệp, nhà thầu, chủ đầu tư, ban quản lý dự án hoặc đội thi công muốn giảm áp lực tài chính khi tai nạn lao động hoặc sự cố tại công trường xảy ra. Với các dự án có nhiều nhân sự ra vào, làm việc trên cao, sử dụng thiết bị nặng, thi công điện nước, kết cấu, hoàn thiện hoặc lắp đặt, việc chỉ dựa vào quy trình an toàn nội bộ thường là chưa đủ. Một hợp đồng bảo hiểm được thiết kế đúng giúp công trình có thêm lớp bảo vệ cho con người, tài sản và trách nhiệm liên quan.</p>
<p>Bảo hiểm PVI hiện có sản phẩm bảo hiểm mọi rủi ro xây dựng dành cho các công trình dân dụng và công nghiệp như nhà ở, trường học, bệnh viện, cầu đường, nhà xưởng; phạm vi có thể bao gồm thiệt hại vật chất của công trình và trách nhiệm pháp lý với bên thứ ba trong quá trình thi công, xây dựng, lắp đặt. ${cite('car')} Với phần con người, sản phẩm bảo hiểm tai nạn cá nhân của PVI áp dụng cho công dân Việt Nam hoặc người nước ngoài cư trú hợp pháp tại Việt Nam có độ tuổi tối đa không quá 70 tuổi, có quyền lợi chi trả khi tử vong, mất tích hoặc thương tật do tai nạn theo điều kiện chương trình. ${cite('pa')}</p>

<div class="kb-who">
<p class="kb-who-h">Các nhóm nên cân nhắc tham gia</p>
<dl>
<div><dt>Chủ đầu tư</dt><dd>Cần bảo vệ tiến độ, ngân sách và trách nhiệm khi công trình phát sinh sự cố.</dd></div>
<div><dt>Tổng thầu và nhà thầu phụ</dt><dd>Cần bảo vệ người lao động, đội kỹ thuật, giám sát, công nhân thời vụ hoặc nhóm thi công theo hạng mục.</dd></div>
<div><dt>Đơn vị thi công lắp đặt</dt><dd>Làm việc với thiết bị, điện, cơ khí, thang nâng, giàn giáo hoặc các khu vực có nguy cơ cao.</dd></div>
<div><dt>Ban quản lý dự án</dt><dd>Cần kiểm soát hồ sơ bảo hiểm trước khi cho nhà thầu vào công trường.</dd></div>
<div><dt>Công trình sửa chữa, cải tạo</dt><dd>Muốn giảm rủi ro trong thời gian thi công ngắn nhưng mật độ người và tài sản xung quanh cao.</dd></div>
</dl>
</div>

<aside class="kb-must" id="bat-buoc" aria-labelledby="bat-buoc-h">
<p class="kb-must-tag">Bắt buộc</p>
<h2 id="bat-buoc-h">Người lao động thi công trên công trường phải có bảo hiểm</h2>
<p>Đây là loại bảo hiểm bắt buộc theo Nghị định 220/2026/NĐ-CP, hiệu lực từ 01/7/2026, sửa đổi Nghị định 67/2023/NĐ-CP. Nhà thầu cần giấy chứng nhận đúng tên gói thầu và hóa đơn VAT. Mức trách nhiệm tối thiểu phải đối chiếu nguyên văn điều khoản cho từng loại công trình; nhiều chủ đầu tư đặt mức cao hơn mức tối thiểu của Nghị định.</p>
<p class="kb-must-actions"><a class="kb-must-link" href="/san-pham/bao-hiem-tai-nan/#doi-tuong">Xem phí cho nhà thầu <span aria-hidden="true">&rarr;</span></a><a class="kb-link" href="/san-pham/bao-hiem-bat-buoc/#cong-truong">Quy định bảo hiểm bắt buộc cho công trường</a></p>
</aside>

<h2 id="lop-bao-ve">Lớp bảo vệ cần có cho công trường nhiều rủi ro</h2>
<p>Tại công trường, một sự cố nhỏ có thể kéo theo nhiều chi phí: sơ cứu, điều trị, ngừng việc, thay người, xử lý hiện trường, sửa chữa phần hư hỏng hoặc làm việc với bên thứ ba bị ảnh hưởng. Bảo hiểm tai nạn không thay thế quy trình an toàn lao động, nhưng giúp doanh nghiệp có phương án tài chính rõ ràng hơn nếu tai nạn lao động xảy ra. Khi được kết hợp với bảo hiểm công trình, giải pháp sẽ rộng hơn: không chỉ quan tâm đến người lao động mà còn tính đến vật tư, hạng mục đang thi công và trách nhiệm pháp lý phát sinh.</p>
<p>Với cách tiếp cận này, người mua không nên chỉ hỏi “phí bao nhiêu”, mà cần xác định đúng rủi ro của công trình. Một đội thi công hoàn thiện nội thất trong tòa nhà đã bàn giao sẽ khác với nhà thầu thi công móng, lắp dựng kết cấu thép hoặc làm việc gần khu dân cư. Bảo hiểm PVI có thể được xem xét theo từng nhóm nhu cầu, từ bảo hiểm tai nạn cá nhân cho người lao động đến bảo hiểm mọi rủi ro xây dựng cho toàn bộ dự án.</p>

<h2 id="quyen-loi">Quyền lợi bảo hiểm nổi bật</h2>
<p>Một sản phẩm bảo hiểm tai nạn công trình hiệu quả cần được thiết kế xoay quanh tình huống thực tế tại công trường. Nếu rủi ro chính nằm ở con người, doanh nghiệp nên chú ý quyền lợi tai nạn cá nhân, chi phí y tế và trợ cấp điều trị. Nếu rủi ro chính nằm ở tài sản hoặc bên thứ ba, doanh nghiệp nên xem xét thêm bảo hiểm mọi rủi ro xây dựng để tránh khoảng trống bảo vệ.</p>
</div>

<div class="kb-lanes kb-wide">
<section class="kb-lane" aria-labelledby="lane-1">
<p class="kb-lane-k">Lớp con người</p>
<h3 id="lane-1">Bảo hiểm tai nạn cá nhân</h3>
<p class="kb-figure"><b>300.000.000</b><span>VND</span></p>
<p class="kb-figure-note">Chi trả toàn bộ số tiền bảo hiểm lên tới mức này khi người được bảo hiểm tử vong do tai nạn hoặc mất tích theo quyết định của tòa án có thẩm quyền. ${cite('pa')}</p>
<ul>
<li>Chi phí y tế điều trị theo chỉ định của bác sĩ khi thương tật do tai nạn, không vượt quá số tiền tính theo bảng tỷ lệ trả tiền bảo hiểm thương tật.</li>
<li>Trợ cấp trong thời gian điều trị thương tật do tai nạn.</li>
<li>Bảo hiểm cho hoạt động rủi ro cao, rủi ro ngộ độc, trúng độc nếu tham gia theo điều kiện chương trình.</li>
</ul>
<a class="kb-lane-link" href="/san-pham/bao-hiem-tai-nan/#tinh-phi">Xem phí bảo hiểm tai nạn <span aria-hidden="true">&rarr;</span></a>
</section>
<section class="kb-lane" aria-labelledby="lane-2">
<p class="kb-lane-k">Lớp công trình</p>
<h3 id="lane-2">Bảo hiểm mọi rủi ro xây dựng</h3>
<p class="kb-lane-lead">PVI nêu rõ hai nhóm phạm vi chính. ${cite('car')}</p>
<ol>
<li><b>Thiệt hại vật chất</b> của công trình xây dựng, lắp đặt bị tổn thất trong quá trình thi công.</li>
<li><b>Trách nhiệm pháp lý</b> liên quan đến thiệt hại tài sản, con người của bên thứ ba trong quá trình thi công, xây dựng, lắp đặt công trình được bảo hiểm.</li>
</ol>
<p class="kb-lane-note">Đặc biệt quan trọng với công trình trong khu dân cư, khu công nghiệp, trung tâm thương mại, tòa nhà đang vận hành hoặc tuyến đường có lưu thông.</p>
</section>
</div>

<div class="kb-col">
<h2 id="phuong-an">Những gì có thể đưa vào phương án bảo hiểm</h2>
<p>Mỗi công trình có quy mô, thời gian, nhân sự và mức độ rủi ro khác nhau, vì vậy phương án bảo hiểm nên được tư vấn theo hồ sơ cụ thể. Một công trình cải tạo văn phòng có thể cần danh sách người lao động và thời hạn thi công ngắn. Một dự án nhà xưởng hoặc cầu đường cần xem thêm giá trị hợp đồng, hạng mục thi công, trách nhiệm với bên thứ ba, thiết bị và khu vực lân cận.</p>
<p>Khi trao đổi để nhận báo giá Bảo hiểm PVI, bạn nên chuẩn bị các thông tin sau:</p>
</div>

<ol class="kb-prep kb-wide">
<li><b>Thông tin công trình</b><span>Tên dự án, địa điểm, loại công trình, hạng mục thi công, thời gian bắt đầu và kết thúc dự kiến.</span></li>
<li><b>Thông tin người lao động</b><span>Số lượng nhân sự, nhóm công việc, độ tuổi, tình trạng làm việc toàn thời gian, thời vụ hoặc theo ca.</span></li>
<li><b>Mức bảo vệ mong muốn</b><span>Số tiền bảo hiểm cho từng người, quyền lợi chi phí y tế, trợ cấp điều trị, tử vong hoặc thương tật.</span></li>
<li><b>Rủi ro đặc thù</b><span>Làm việc trên cao, hàn cắt, điện, máy móc nặng, giàn giáo, không gian kín, thi công ban đêm hoặc gần khu dân cư.</span></li>
<li><b>Yêu cầu từ hợp đồng thầu</b><span>Điều khoản bảo hiểm bắt buộc, bên được bảo hiểm, bên thụ hưởng, thời hạn, điều kiện bổ sung nếu có.</span></li>
<li><b>Nhu cầu kết hợp</b><span>Bảo hiểm tai nạn, bảo hiểm công trình, trách nhiệm bên thứ ba hoặc các quyền lợi bổ sung phù hợp.</span></li>
</ol>

<div class="kb-col">
<p>Cách chuẩn bị này giúp tránh tình trạng mua thiếu, mua trùng hoặc mua không đúng đối tượng. Ví dụ, nếu hợp đồng thầu yêu cầu bảo hiểm công trình nhưng doanh nghiệp chỉ mua bảo hiểm tai nạn cho công nhân, phần thiệt hại vật chất của công trình có thể chưa được bảo vệ như mong muốn. Ngược lại, nếu đã có bảo hiểm công trình nhưng chưa có lớp bảo vệ tai nạn cá nhân cho đội thi công, doanh nghiệp vẫn có thể gặp áp lực lớn khi người lao động bị thương trong quá trình làm việc.</p>

<h2 id="nhan-tho">Bảo hiểm tai nạn công trình khác bảo hiểm nhân thọ</h2>
<p>Nhiều khách hàng tìm “bảo hiểm nhân thọ” khi thực tế đang cần một giải pháp bảo hiểm tai nạn cho công trình. Bảo hiểm nhân thọ thường hướng đến bảo vệ dài hạn, tích lũy hoặc kế hoạch tài chính cá nhân, trong khi bảo hiểm tai nạn công trình và bảo hiểm công trình thuộc nhóm bảo vệ rủi ro phát sinh trong hoạt động thi công, lao động và xây dựng.</p>
<p>Điểm khác biệt quan trọng nằm ở tình huống sử dụng. Nếu doanh nghiệp cần bảo vệ đội công nhân trong thời gian thi công, cần chứng từ bảo hiểm để đáp ứng yêu cầu hợp đồng, hoặc cần phương án xử lý khi tai nạn lao động xảy ra tại công trường, bảo hiểm tai nạn phù hợp hơn với nhu cầu vận hành. Nếu công trình còn có nguy cơ thiệt hại vật chất hoặc ảnh hưởng người, tài sản xung quanh, bảo hiểm mọi rủi ro xây dựng là lớp bảo vệ cần được xem xét cùng lúc.</p>
<div class="kb-table" role="region" aria-label="Bảng chọn giải pháp theo nhu cầu" tabindex="0"><table>
<thead><tr><th scope="col">Nhu cầu</th><th scope="col">Giải pháp nên xem xét</th></tr></thead>
<tbody>
<tr><td>Bảo vệ công nhân, kỹ sư, giám sát khi bị tai nạn</td><td>Bảo hiểm tai nạn cá nhân/nhóm theo điều kiện PVI</td></tr>
<tr><td>Bảo vệ hạng mục xây dựng, lắp đặt đang thi công</td><td>Bảo hiểm mọi rủi ro xây dựng</td></tr>
<tr><td>Bảo vệ khi bên thứ ba bị thiệt hại về người hoặc tài sản do quá trình thi công</td><td>Trách nhiệm đối với bên thứ ba trong bảo hiểm công trình</td></tr>
<tr><td>Chuẩn bị hồ sơ để vào công trường hoặc đáp ứng hợp đồng thầu</td><td>Tư vấn gói bảo hiểm theo yêu cầu hợp đồng</td></tr>
<tr><td>Tìm giải pháp tài chính dài hạn cho cá nhân</td><td>Bảo hiểm nhân thọ hoặc sản phẩm tài chính riêng, không thay thế bảo hiểm công trình</td></tr>
</tbody></table></div>

<h2 id="bao-gia">Phí bảo hiểm và cách nhận báo giá</h2>
<p>Phí bảo hiểm tai nạn công trình PVI không nên được ước lượng tùy tiện khi chưa có thông tin về công trình và người được bảo hiểm. Các yếu tố như số lượng lao động, ngành nghề thi công, thời hạn bảo hiểm, số tiền bảo hiểm, quyền lợi bổ sung và mức độ rủi ro của công việc đều có thể ảnh hưởng đến báo giá. Với bảo hiểm công trình, giá trị xây dựng, loại công trình, thời gian thi công, biện pháp thi công và yêu cầu trách nhiệm bên thứ ba cũng là những dữ liệu cần xem xét.</p>
<p>Thay vì chọn mức phí thấp nhất, doanh nghiệp nên chọn phương án cân bằng giữa ngân sách và rủi ro thực tế. Một gói quá hẹp có thể không đáp ứng yêu cầu của chủ đầu tư hoặc không đủ hỗ trợ khi sự cố nghiêm trọng xảy ra. Một gói quá rộng nhưng không bám vào hợp đồng thi công lại khiến chi phí khó kiểm soát. Cách tốt nhất là gửi hồ sơ cơ bản để được tư vấn phương án phù hợp trước khi chốt đơn.</p>
<ol class="kb-steps">
<li><b>Gửi thông tin công trình và nhu cầu bảo hiểm.</b> Càng rõ loại công việc, số lượng người và thời gian thi công, báo giá càng sát.</li>
<li><b>Xác định phạm vi cần bảo vệ.</b> Chọn bảo hiểm tai nạn, bảo hiểm công trình, trách nhiệm bên thứ ba hoặc phương án kết hợp.</li>
<li><b>Đối chiếu điều khoản hợp đồng thầu.</b> Kiểm tra yêu cầu về số tiền bảo hiểm, bên được bảo hiểm, thời hạn và chứng từ.</li>
<li><b>Nhận tư vấn và báo phí.</b> Phí cuối cùng phụ thuộc vào thông tin được thẩm định và điều kiện bảo hiểm áp dụng.</li>
<li><b>Hoàn tất hồ sơ, thanh toán và nhận giấy chứng nhận.</b> Kiểm tra kỹ tên dự án, danh sách người được bảo hiểm, thời hạn và quyền lợi trước khi triển khai.</li>
</ol>

<h2 id="boi-thuong">Hồ sơ bồi thường cần chuẩn bị khi có tai nạn</h2>
<p>Khi xảy ra tai nạn lao động, điều quan trọng đầu tiên vẫn là cứu người, kiểm soát hiện trường và hạn chế tổn thất phát sinh. Sau đó, bên mua bảo hiểm hoặc người đại diện cần thông báo cho PVI theo hướng dẫn trong hợp đồng và chuẩn bị hồ sơ liên quan. Theo hướng dẫn bồi thường của PVI, với hồ sơ tai nạn, người được bảo hiểm cần có chứng từ y tế tương ứng; trường hợp tai nạn lao động cần có biên bản tai nạn lao động do cơ quan nơi người được bảo hiểm làm việc lập và xác nhận. ${cite('claim', 'Hướng dẫn bồi thường PVI')}</p>
<p>PVI cũng hướng dẫn rằng hồ sơ tai nạn có thể cần biên bản tai nạn hoặc bản tường trình tai nạn theo mẫu, thông tin người chứng kiến nếu có, cùng chứng từ y tế như giấy ra viện, toa thuốc, hóa đơn, bảng kê chi phí tùy trường hợp điều trị nội trú hoặc ngoại trú. Với chi phí y tế từ 200.000 VND trở lên cho một lần khám hoặc một cơ sở y tế, chứng từ hợp lệ là hóa đơn tài chính, không chấp nhận phiếu bán lẻ. ${cite('claim', 'Hướng dẫn bồi thường PVI')}</p>
</div>

<div class="kb-claim kb-wide">
<div class="kb-claim-list">
<p class="kb-claim-h">Checklist xử lý sự cố, lập ngay từ khi khởi công</p>
<ol>
<li>Thông báo nội bộ cho chỉ huy trưởng, an toàn lao động và người phụ trách bảo hiểm.</li>
<li>Đưa người bị nạn đi cấp cứu hoặc điều trị tại cơ sở y tế phù hợp.</li>
<li>Ghi nhận thời gian, địa điểm, mô tả tai nạn và nhân chứng nếu có.</li>
<li>Lập biên bản tai nạn lao động theo quy định nội bộ và yêu cầu của hồ sơ bảo hiểm.</li>
<li>Lưu toàn bộ chứng từ y tế, hóa đơn, kết quả chụp chiếu, toa thuốc và giấy ra viện.</li>
<li>Liên hệ PVI để được hướng dẫn mẫu biểu, thời hạn và cách nộp hồ sơ.</li>
</ol>
</div>
<div class="kb-claim-call">
<p>Tổng đài bồi thường Bảo hiểm PVI</p>
<a href="tel:1900545458">1900 54 54 58</a>
<span>Gọi ngay khi sự cố xảy ra, trước khi làm thủ tục khác.</span>
</div>
</div>

<div class="kb-col">
<p>Một quy trình rõ ràng giúp giảm thất lạc chứng từ và tránh chậm trễ khi yêu cầu bồi thường. Trong thực tế, nhiều hồ sơ bị kéo dài không phải vì sự kiện không nghiêm trọng, mà vì thiếu giấy tờ y tế, thiếu xác nhận tai nạn lao động hoặc hóa đơn không hợp lệ. Với công trình có nhiều đội thầu phụ, chủ đầu tư nên thống nhất đầu mối phụ trách bảo hiểm ngay từ đầu.</p>

<h2 id="vi-sao-pvi">Lý do nên chọn Bảo hiểm PVI cho công trình</h2>
<p>Bảo hiểm công trình không chỉ là một giấy tờ để hoàn tất thủ tục. Khi sự cố xảy ra, doanh nghiệp cần một nhà bảo hiểm có kinh nghiệm trong lĩnh vực xây dựng, có quy trình giám định, hướng dẫn hồ sơ và xử lý bồi thường rõ ràng. Trên trang sản phẩm bảo hiểm mọi rủi ro xây dựng, Bảo hiểm PVI giới thiệu mình là nhà bảo hiểm đứng đầu trong lĩnh vực bảo hiểm xây dựng, lắp đặt và vận hành cho các công trình công nghiệp, đồng hành cùng chủ đầu tư và nhà thầu để đưa ra giải pháp quản lý rủi ro, bảo hiểm hiệu quả. ${cite('car')}</p>
<p>PVI cũng nêu các điểm khác biệt của sản phẩm bảo hiểm mọi rủi ro xây dựng gồm thủ tục yêu cầu bảo hiểm đơn giản, cấp đơn kịp thời và hệ thống giám định tổn thất, giải quyết bồi thường chuyên nghiệp. ${cite('car')} Với bảo hiểm tai nạn cá nhân, PVI cho biết có đội ngũ tư vấn viên chuyên nghiệp, giải quyết bồi thường minh bạch, nhanh chóng, chính xác và hỗ trợ qua hotline 1900 54 54 58. ${cite('pa')}</p>
<dl class="kb-why">
<div><dt>Dễ đáp ứng yêu cầu hợp đồng</dt><dd>Có cơ sở để chứng minh công trình đã được bảo hiểm theo phạm vi phù hợp.</dd></div>
<div><dt>Giảm áp lực tài chính khi có tai nạn</dt><dd>Chi phí điều trị hoặc quyền lợi tai nạn được xử lý theo điều khoản bảo hiểm.</dd></div>
<div><dt>Chuyên nghiệp hơn với chủ đầu tư</dt><dd>Nhà thầu có hồ sơ bảo hiểm rõ ràng, giảm rủi ro quản trị dự án.</dd></div>
<div><dt>Bảo vệ nhiều lớp</dt><dd>Kết hợp bảo hiểm tai nạn cho con người với bảo hiểm công trình cho tài sản và trách nhiệm bên thứ ba.</dd></div>
<div><dt>Hỗ trợ xử lý sau sự cố</dt><dd>Có đầu mối hướng dẫn thông báo tổn thất, chứng từ và quy trình bồi thường.</dd></div>
</dl>
</div>

<section class="kb-review kb-wide" aria-labelledby="ra-soat">
<div class="kb-review-head">
<h2 id="ra-soat">Thông số cần chốt trước khi phát hành hợp đồng</h2>
<p>Sai tên công trình, thiếu người được bảo hiểm, nhầm thời hạn hoặc chọn sai phạm vi đều có thể tạo ra khoảng trống bảo vệ. Rà theo ba nhóm sau trước khi mua.</p>
${img('tai-nan', 'Hình ảnh minh họa: mũ bảo hộ, danh sách kiểm tra và nhóm người lao động thu nhỏ', '(max-width:820px) 92vw, 420px')}
</div>
<div class="kb-review-groups">
<div><h3>Các bên và công trình</h3><ul>
<li>Tên bên mua bảo hiểm, người được bảo hiểm và bên thụ hưởng nếu có.</li>
<li>Tên, địa điểm và mô tả công trình.</li>
<li>Yêu cầu riêng từ chủ đầu tư, tổng thầu hoặc ban quản lý dự án.</li>
</ul></div>
<div><h3>Người và số tiền</h3><ul>
<li>Danh sách người lao động hoặc nhóm đối tượng được bảo hiểm.</li>
<li>Thời hạn bảo hiểm có khớp với tiến độ thi công hay không.</li>
<li>Số tiền bảo hiểm cho từng người hoặc từng hạng mục.</li>
</ul></div>
<div><h3>Phạm vi và điều kiện</h3><ul>
<li>Quyền lợi tai nạn, chi phí y tế, trợ cấp điều trị và điều khoản bổ sung.</li>
<li>Phạm vi bảo hiểm công trình, thiệt hại vật chất và trách nhiệm bên thứ ba nếu tham gia.</li>
<li>Điểm loại trừ, nghĩa vụ thông báo tổn thất và hồ sơ bồi thường.</li>
</ul></div>
</div>
</section>

<div class="kb-col">
<p>Nếu công trình thay đổi tiến độ, tăng số lượng nhân sự hoặc phát sinh hạng mục rủi ro hơn so với ban đầu, doanh nghiệp nên chủ động trao đổi để điều chỉnh hợp đồng nếu cần. Bảo hiểm chỉ phát huy hiệu quả khi thông tin trên hợp đồng phản ánh đúng thực tế vận hành.</p>

<h2 id="tinh-huong">Tình huống tham khảo</h2>
<figure class="kb-case">
<p class="kb-case-k">Tình huống giả định</p>
<blockquote><p>Một nhà thầu thi công cải tạo nhà xưởng trong khu công nghiệp. Công nhân làm việc trên giàn giáo, đội điện lắp đặt hệ thống chiếu sáng, bên cạnh là khu vực máy móc của đơn vị khác vẫn hoạt động.</p></blockquote>
</figure>
<p>Nếu một công nhân bị ngã và phải điều trị, bảo hiểm tai nạn giúp xử lý quyền lợi cho người được bảo hiểm theo điều kiện chương trình. Nếu sự cố làm hư hại tài sản của bên thứ ba hoặc ảnh hưởng hạng mục công trình, lớp bảo hiểm công trình và trách nhiệm liên quan sẽ cần được xem xét.</p>
<p>Trong tình huống này, một hợp đồng chỉ ghi chung chung “bảo hiểm tai nạn” có thể chưa đủ. Doanh nghiệp cần biết ai được bảo hiểm, số tiền bảo hiểm bao nhiêu, có quyền lợi chi phí y tế hay không, công việc rủi ro cao có được chấp nhận không, và phần thiệt hại tài sản có thuộc phạm vi bảo hiểm công trình không. Đây chính là lý do nên tư vấn trước khi mua thay vì chọn nhanh một gói có phí thấp.</p>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Đăng ký tư vấn và nhận báo giá</h2>
<p>Gửi thông tin công trình, số lượng nhân sự, thời gian thi công và yêu cầu hợp đồng để được tư vấn phương án phù hợp: bảo vệ người lao động, công trình, trách nhiệm bên thứ ba hay cả ba.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
<p>Một quyết định đúng trước ngày thi công có thể giúp doanh nghiệp tránh bị động khi tai nạn lao động hoặc sự cố công trình xảy ra. Liên hệ Bảo hiểm PVI hoặc đầu mối tư vấn được ủy quyền để kiểm tra phạm vi, phí bảo hiểm, hồ sơ cần chuẩn bị và quy trình cấp đơn. Khi đã có phương án rõ ràng, công trình có thể vận hành tự tin hơn, còn đội ngũ thi công có thêm lớp bảo vệ cần thiết trong suốt quá trình làm việc.</p>
`;
}

export const related = [
  { href: '/san-pham/bao-hiem-tai-nan/', img: 'section-tai-nan', k: 'Sản phẩm chính', title: 'Bảo hiểm tai nạn 24/24', text: 'Tính phí theo gói và số người, quyền lợi tai nạn, hồ sơ cho nhóm và nhà thầu.' },
  { href: '/san-pham/bao-hiem-bat-buoc/#cong-truong', img: 'tai-nan', k: 'Bắt buộc', title: 'Người lao động thi công trên công trường', text: 'Căn cứ Nghị định 220/2026/NĐ-CP, chứng từ cần có khi vào công trường.' },
];
