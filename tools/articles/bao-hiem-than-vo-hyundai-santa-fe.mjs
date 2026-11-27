import { carFeeAtRate, carFeeBands, carFeeRows, formatCarMoney as money } from '../car-fee-rates.mjs';

const slug = 'bao-hiem-than-vo-hyundai-santa-fe';
const cover = 'bao-hiem-than-vo-hyundai-santa-fe-pvi-v2';
const inspection = 'kiem-tra-hyundai-santa-fe';
const marketLow = 869_000_000;
const marketHigh = 965_000_000;
const exampleValue = (marketLow + marketHigh) / 2;
const preferredRate = carFeeBands.at(-1).rate;
const feeAtRate = (value, rate) => money(carFeeAtRate(value, rate));
const preferredFee = feeAtRate(exampleValue, preferredRate);
const feeRange = (rate) => feeAtRate(marketLow, rate) + ' đến ' + feeAtRate(marketHigh, rate) + ' đồng/năm';
const marketRange = money(marketLow / 1_000_000) + '–' + money(marketHigh / 1_000_000) + ' triệu đồng';
export const leadHighlight = 'thấp nhất chỉ từ ' + feeAtRate(marketLow, preferredRate) + ' đồng/năm';

export const post = {
  slug,
  path: '/kien-thuc/bao-hiem-o-to/' + slug + '/',
  date: '2026-11-25',
  dateText: '25/11/2026',
  cat: 'Kiến thức · Bảo hiểm vật chất xe',
  title: 'Bảo hiểm thân vỏ Hyundai Santa Fe PVI giá bao nhiêu?',
  lead: 'Hyundai Santa Fe 2023 bản dầu cao cấp được rao ở mức ' + marketRange + ' trong hai tin tại TP.HCM. Nếu giá trị bảo hiểm nằm trong khoảng này và hồ sơ đủ điều kiện tính 0,85%, phí dự tính ' + leadHighlight + '. Tỷ lệ này được xét cho xe mới hoặc đã sử dụng đến 3 năm, với số tiền bảo hiểm trên 800 triệu đồng.',
  image: '/assets/' + cover + '.webp',
  imageWidth: 1200,
  imageHeight: 630,
  alt: 'Hình ảnh minh họa Hyundai Santa Fe bản dầu cao cấp bên ngoài xưởng dịch vụ ô tô',
  readMin: 6,
};

export const crumb = 'Bảo hiểm vật chất xe';
export const hero = { name: cover, w: 1200, h: 630, besideTitle: true, download: true, caption: 'Hình ảnh minh họa: Hyundai Santa Fe tại khu vực tiếp nhận của xưởng dịch vụ ô tô.' };
export const seo = {
  title: 'Bảo hiểm thân vỏ Hyundai Santa Fe PVI bao nhiêu?',
  description: 'Tính thử phí bảo hiểm thân vỏ Hyundai Santa Fe theo giá trị xe, năm sản xuất, quyền lợi bổ sung và lịch sử bồi thường tại PVI Thành Đô.',
};
export const stylesheet = '/santa-fe-fee.css';
export const script = '/santa-fe-fee.js';
export const tocOptions = { startOpen: false, label: 'Tóm tắt nội dung' };

export const toc = [
  ['bang-tinh-phi', 'Tính thử phí bảo hiểm Santa Fe'],
  ['yeu-to-tinh-phi', 'Bốn yếu tố ảnh hưởng đến phí'],
  ['phi-tu-085', 'Khi nào có thể được xét phí 0,85%'],
  ['so-bao-gia', 'Cách đọc và so hai báo giá'],
  ['hyundai-auto-care', 'PVI có liên kết với Hyundai không?'],
  ['showroom-hyundai', 'Showroom và xưởng Hyundai liên kết PVI'],
  ['nhan-bao-phi', 'Nhận báo phí cho xe của bạn'],
];

export const faqs = [
  { question: 'Santa Fe có giá trị bảo hiểm đúng 800 triệu đồng thì phí bao nhiêu?', answer: 'Theo bảng tham khảo, đúng 800 triệu đồng áp dụng tỷ lệ 1,19%, tương đương 9.520.000 đồng/năm nếu hồ sơ đủ điều kiện. Xe có số tiền bảo hiểm trên 800 triệu đồng mới được xét mức tối thiểu 0,85%.' },
  { question: 'Santa Fe trên 3 năm hoặc có tỷ lệ bồi thường cao thì tính phí thế nào?', answer: 'PVI Thành Đô sẽ xem xét và điều chỉnh phí theo tuổi xe, tình trạng xe, quyền lợi bổ sung và lịch sử bồi thường. Bạn có thể gửi thông tin xe và hợp đồng kỳ trước cho chuyên viên chăm sóc khách hàng qua Zalo 0938 072 236 để được báo phí cụ thể.' },
  { question: 'Có thể lấy giá mua Santa Fe năm trước để tính phí năm nay không?', answer: 'Bạn có thể gửi hóa đơn hoặc giá mua cũ làm thông tin tham khảo. Khi tái tục, PVI xem xét giá trị xe tại thời điểm tham gia, theo phiên bản, đời xe và tình trạng thực tế. Mốc trên hợp đồng cũ có thể khác số tiền bảo hiểm sẽ được chấp thuận cho kỳ mới.' },
  { question: 'Mức 0,85% đã gồm sửa xưởng Hyundai và thủy kích chưa?', answer: 'Hãy xem báo giá ghi rõ điều khoản sửa tại cơ sở chính hãng, thiệt hại động cơ do nước và mức khấu trừ của từng quyền lợi. Phép tính 0,85% trong bài giúp bạn dự trù chi phí. Bản chào phí sẽ cho biết những quyền lợi nào được tính trong tổng tiền và thuế GTGT được ghi thế nào.' },
];

export const sources = [
  ['Giá rao Hyundai Santa Fe Cao cấp 2.2L HTRAC đời 2023', '', 'Bonbanh · hai tin tại TP.HCM, mã 7062978 và 7036022 · đối chiếu 26/11/2026'],
  ['Bốn mốc tỷ lệ phí tham khảo và điều kiện áp dụng', '', 'Thông tin tư vấn do Bảo hiểm PVI Thành Đô cung cấp · 26/11/2026'],
  ['Hyundai Thành Công Việt Nam ra mắt Hyundai Auto Care', '', 'Tập đoàn Thành Công · 03/03/2026'],
  ['Bảo hiểm PVI tham gia triển khai Hyundai Auto Care', '', 'Tổng công ty Bảo hiểm PVI · 04/03/2026'],
  ['Danh sách gara và showroom hợp tác với Bảo hiểm PVI', '', 'PVI Digital · danh sách cập nhật 31/03/2025, đối chiếu 25/11/2026'],
  ['Quy tắc và các điều khoản bổ sung bảo hiểm tự nguyện xe ô tô', '', 'Tổng công ty Bảo hiểm PVI · bộ tài liệu hiệu lực từ 01/07/2025'],
];

export const related = [
  { href: '/san-pham/bao-hiem-vat-chat-xe/', img: cover, w: 1200, h: 630, k: 'Bảo hiểm PVI Thành Đô', title: 'Bảo hiểm vật chất xe ô tô', text: 'Xem quyền lợi bổ sung và nhận báo phí theo xe của bạn.' },
];

export const disclaimer = 'Bảng tính là ví dụ để dự trù ngân sách. Phạm vi bảo hiểm, mức khấu trừ, thuế GTGT và phí chính thức theo báo giá và hợp đồng do Bảo hiểm PVI phát hành.';

const hyundaiWorkshops = [
  ['Hyundai Miền Nam', '1374A Quốc lộ 1A, khu vực Quận 12 cũ'],
  ['Hyundai Kinh Dương Vương', '701 Kinh Dương Vương, khu vực Bình Tân cũ'],
  ['Hyundai Gia Định', '94–96 Phạm Đình Hổ, khu vực Quận 6 cũ và 162 Phạm Văn Đồng, khu vực Gò Vấp cũ'],
  ['Hyundai Phú Lâm', 'D6/28 Quốc lộ 1A, khu vực Tân Túc, Bình Chánh cũ'],
  ['Hyundai Ngọc An', '327 Quốc lộ 13, khu vực Thủ Đức cũ'],
  ['Hyundai Trường Chinh', '06 Trường Chinh, khu vực Tân Bình cũ'],
  ['Hyundai Phú Mỹ', 'Lô D3, đường D1, KCN Cát Lái, khu vực Quận 2 cũ'],
  ['Hyundai Đông Sài Gòn', '409 đường Song Hành Hà Nội, khu vực Thủ Đức cũ'],
  ['Hyundai An Phú', '141D Phan Đăng Lưu, khu vực Phú Nhuận cũ'],
  ['Hyundai Bình Dương', '45B Yersin, khu vực Thủ Dầu Một, Bình Dương cũ'],
  ['Hyundai Nguyên Gia Phát', '39 Đại lộ Bình Dương, khu vực Thuận An, Bình Dương cũ'],
];

export function body({ pic }) {
  return `
<h2 id="bang-tinh-phi">Tính thử phí bảo hiểm thân vỏ Hyundai Santa Fe</h2>
<p>Phí vật chất xe dự tính bằng <strong>số tiền bảo hiểm nhân với tỷ lệ phí</strong>. Với khoảng giá rao ${marketRange}, có thể dự trù:</p>
<ul class="santa-fe-market-range">
  <li><strong>0,85% nếu đủ điều kiện: ${feeRange(preferredRate)}.</strong></li>
</ul>
<p>Bảng tính điền sẵn ${exampleValue / 1_000_000} triệu đồng, là mức giữa của hai giá rao. Bạn có thể nhập số tiền bảo hiểm của xe mình để tính lại.</p>
<p>Bảng phí tham khảo áp dụng cho <strong>xe mới và xe đã sử dụng đến 3 năm</strong>. Xe trên 3 năm hoặc hồ sơ có tỷ lệ bồi thường cao sẽ được xem xét và điều chỉnh phí. Bạn có thể <a class="kb-link" href="#nhan-bao-phi">liên hệ chuyên viên chăm sóc khách hàng</a> để biết phí cho xe của mình.</p>
<div class="santa-fe-fee" data-santa-fe-fee>
  <label for="santa-fe-vehicle-profile">Hồ sơ xe</label>
  <select id="santa-fe-vehicle-profile">
    <option value="standard">Xe mới hoặc sử dụng đến 3 năm</option>
    <option value="review">Xe trên 3 năm hoặc tỷ lệ bồi thường cao</option>
  </select>
  <label for="santa-fe-value">Giá trị bảo hiểm của xe <span>(triệu đồng)</span></label>
  <input id="santa-fe-value" type="number" inputmode="decimal" min="1" step="any" value="${exampleValue / 1_000_000}" aria-describedby="santa-fe-value-help" required>
  <p id="santa-fe-value-help">Ví dụ nhập 917 cho 917 triệu đồng.</p>
  <p class="santa-fe-estimate"><strong>Phí dự tính:</strong> <output for="santa-fe-value santa-fe-vehicle-profile">Chỉ từ ${preferredFee} đồng/năm (0,85%)</output></p>
  <div class="kb-table">
    <table aria-label="Tỷ lệ phí bảo hiểm theo giá trị xe">
      <thead><tr><th scope="col">Số tiền bảo hiểm</th><th scope="col">Tỷ lệ phí tham khảo</th></tr></thead>
      <tbody>
${carFeeRows()}
      </tbody>
    </table>
  </div>
  <noscript><p>Bảng đang hiển thị kết quả cho xe 917 triệu đồng. Bật JavaScript để thử giá trị khác.</p></noscript>
</div>
<p>Giá trị xe dưới 300 triệu đồng cần hỏi báo phí riêng. Khi nhận báo giá, bạn nên kiểm tra các điều khoản đi kèm, mức khấu trừ mỗi vụ và tổng phí đã gồm thuế GTGT hay chưa.</p>

<h2 id="yeu-to-tinh-phi">Bốn yếu tố quyết định phí bảo hiểm Santa Fe</h2>
<p>PVI Thành Đô xem giá trị xe, năm sản xuất, điều khoản khách chọn và lịch sử bồi thường trước khi báo phí. Mỗi yếu tố trả lời một câu hỏi khác nhau về chiếc xe và phạm vi khách muốn bảo hiểm.</p>

<h3>1. Giá trị thị trường của xe</h3>
<p>Hai chiếc Santa Fe 2023 bản dầu cao cấp ở TP.HCM được rao giá 869 và 965 triệu đồng trên Bonbanh. Bài dùng khoảng giá này để tính thử phí bảo hiểm.</p>
<p>Đó là mốc dự trù từ giá rao. Khi định giá chiếc xe cụ thể, còn cần đối chiếu quãng đường đã đi, tình trạng xe và hồ sơ thực tế. Nếu bạn đã có bản chào phí hoặc hợp đồng kỳ trước, hãy xem số tiền bảo hiểm được ghi trên đó để hỏi phần chênh lệch.</p>

<h3>2. Năm sản xuất</h3>
<p>Năm sản xuất giúp PVI xác định nhóm tuổi xe. Hai chiếc Santa Fe đang được định giá bằng nhau vẫn có thể nhận báo giá khác nhau nếu khác đời. Với xe đăng ký lần đầu sau năm sản xuất, nên gửi cả hai mốc để nhân viên kiểm tra cách tính thời gian sử dụng theo hồ sơ.</p>
<p>Chẳng hạn một chiếc Santa Fe sản xuất năm 2023 có thể đăng ký vào năm 2024. Khi gửi thông tin, ghi đúng hai năm này trên hai dòng riêng sẽ giúp tư vấn viên tra đúng xe và giảm việc phải bổ sung sau.</p>

<h3>3. Điều khoản bổ sung</h3>
<p>Với Santa Fe, nhiều chủ xe quan tâm đến sửa tại xưởng chính hãng, thay phụ tùng mới không trừ khấu hao, thiệt hại động cơ do nước và mất cắp bộ phận. Đây là các quyền lợi cần xem theo điều khoản cụ thể và số tiền ghi trên báo giá.</p>
<p>Nếu bạn hay đi qua khu vực dễ ngập, hãy hỏi điều khoản bảo hiểm thiệt hại động cơ do nước và mức khấu trừ áp dụng. Nếu thường bảo dưỡng ở một đại lý Hyundai, hãy nêu tên xưởng muốn đưa xe vào và hỏi cách bảo lãnh phần chi phí thuộc phạm vi bảo hiểm tại đó.</p>

<h3>4. Tỷ lệ tổn thất và lịch sử bồi thường</h3>
<p>Khi tái tục, PVI có thể xem số vụ đã yêu cầu bồi thường và số tiền đã chi trả trong kỳ trước nếu có dữ liệu. Tỷ lệ tổn thất thấp là một trong những yếu tố thuận lợi để PVI xem xét mức phí. Với hồ sơ từng phát sinh sửa chữa, bạn có thể gửi thông tin vụ việc để nhân viên kiểm tra ngay khi chào phí.</p>
<figure class="kb-photo">
  ${pic(inspection, { w: 1200, h: 800, alt: 'Hình ảnh minh họa nhân viên xưởng kiểm tra khu vực bánh trước của Hyundai Santa Fe', sizes: '(max-width:768px) 100vw, 700px' })}
  <figcaption>Hình ảnh minh họa: kiểm tra thân xe Hyundai Santa Fe tại xưởng dịch vụ.</figcaption>
</figure>

<h2 id="phi-tu-085">Santa Fe trên 800 triệu đồng khi nào được xét phí 0,85%?</h2>
<p>PVI Thành Đô có thể xem xét mức tối thiểu 0,85% cho xe mới hoặc sử dụng đến 3 năm nếu số tiền bảo hiểm trên 800 triệu đồng và hồ sơ đủ điều kiện. Từ 300 đến 800 triệu đồng, xem tỷ lệ theo từng mốc trong bảng. Xe cũ hơn hoặc có tỷ lệ bồi thường cao cần chuyên viên kiểm tra trước khi báo phí.</p>
<p>Với khoảng giá rao ${marketRange}, mức 0,85% tương ứng khoảng ${feeRange(preferredRate)} nếu PVI chấp thuận giá trị bảo hiểm và hồ sơ. Bạn có thể dùng bảng tính để thử số khác khi đã có định giá cho xe của mình.</p>

<h2 id="so-bao-gia">So hai báo giá cho cùng một chiếc Santa Fe thế nào?</h2>
<p>Hãy đưa hai báo giá về cùng số tiền bảo hiểm, cùng thời hạn và cùng quyền lợi chính. Một dòng tổng phí chỉ cho bạn biết số tiền đóng. Tên xưởng, mức tự trả và điều khoản đi kèm giúp bạn biết quyền lợi mình đang mua.</p>
<ul>
  <li><strong>Kiểm tra giá trị được bảo hiểm.</strong> Cùng một chiếc Santa Fe nhưng số tiền bảo hiểm khác nhau có thể làm phí chênh lệch dù tỷ lệ giống nhau.</li>
  <li><strong>Đối chiếu xưởng và phụ tùng.</strong> Nếu bạn chỉ muốn về xưởng Hyundai quen, hỏi tên cơ sở nhận xe và điều kiện thay mới phụ tùng.</li>
  <li><strong>Xem mức tự trả.</strong> Hỏi mức khấu trừ chung của mỗi vụ và mức riêng cho thủy kích hoặc mất cắp bộ phận, nếu có.</li>
  <li><strong>Chốt tổng tiền.</strong> Hỏi phí 12 tháng đã gồm thuế GTGT và những điều khoản đã chọn chưa. Bảo hiểm trách nhiệm dân sự bắt buộc được tính riêng.</li>
</ul>

<h2 id="hyundai-auto-care">PVI có liên kết với hãng Hyundai không?</h2>
<p>Có. Bảo hiểm PVI là đối tác của Hyundai Thành Công Việt Nam trong chương trình bảo hiểm liên kết chính hãng <strong>Hyundai Auto Care</strong>, ra mắt ngày 03/03/2026. Chương trình có quyền lợi sửa chữa tại hệ thống đại lý Hyundai ủy quyền theo điều kiện của gói tham gia.</p>
<p>Nếu muốn đưa Santa Fe vào xưởng Hyundai quen, hãy gửi tên chi nhánh khi hỏi phí. Chuyên viên PVI sẽ kiểm tra điều khoản sửa chữa chính hãng và xác nhận cơ sở tiếp nhận, bảo lãnh phù hợp với hợp đồng của bạn.</p>

<h2 id="showroom-hyundai">Các showroom và xưởng Hyundai nào liên kết với PVI tại TP.HCM?</h2>
<p>Dưới đây là các cơ sở Hyundai ở TP.HCM và khu vực Bình Dương cũ được ghi trong danh sách gara, showroom hợp tác do PVI Digital công bố. Bảng dùng địa chỉ tại cột <strong>showroom/gara</strong> của nguồn để khách tra điểm tiếp nhận xe.</p>
<div class="kb-table"><table aria-label="Xưởng Hyundai có trong danh sách liên kết của PVI">
  <thead><tr><th scope="col">Cơ sở Hyundai</th><th scope="col">Địa chỉ showroom hoặc xưởng theo danh sách</th></tr></thead>
  <tbody>${hyundaiWorkshops.map(([name, address]) => `<tr><td>${name}</td><td>${address}</td></tr>`).join('')}</tbody>
</table></div>
<p>Danh sách PVI công bố theo mốc 31/03/2025. Trước khi đưa xe đến, bạn nên xác nhận địa chỉ hiện hành và điều kiện bảo lãnh với chuyên viên PVI hoặc xưởng, nhất là khi đại lý có nhiều chi nhánh.</p>

<h2 id="nhan-bao-phi">Cần chuẩn bị gì để nhận báo phí Santa Fe?</h2>
<p>Gửi đúng phiên bản, năm sản xuất, số km và quyền lợi muốn chọn để PVI Thành Đô báo phí theo xe của bạn. Nếu đang tái tục, bổ sung thông tin hợp đồng hiện tại và các vụ bồi thường đã phát sinh để nhân viên kiểm tra đủ hồ sơ.</p>
<ol class="kb-steps">
  <li><strong>Gửi thông tin xe.</strong> Ví dụ Santa Fe dầu cao cấp 2.2L HTRAC, sản xuất 2023, dùng cho gia đình.</li>
  <li><strong>Nêu nhu cầu sửa chữa.</strong> Ghi tên xưởng Hyundai thường sử dụng và quyền lợi bạn cần, chẳng hạn sửa hãng hoặc thủy kích.</li>
  <li><strong>Đối chiếu báo phí.</strong> Xem lại số tiền bảo hiểm, tổng phí, quyền lợi, mức khấu trừ và ngày hiệu lực trước khi tham gia.</li>
</ol>
<p><a class="kb-link" href="https://zalo.me/0938072236" rel="nofollow">Nhắn chuyên viên chăm sóc khách hàng PVI qua Zalo 0938 072 236</a> để hỏi phí và kiểm tra xưởng tiếp nhận xe.</p>
`;
}
