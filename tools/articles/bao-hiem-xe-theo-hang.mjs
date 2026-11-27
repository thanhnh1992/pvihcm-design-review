import { esc } from '../chrome.mjs';
import { moreModelFeeData } from '../data/car-fee-models-batch3.mjs';
import { additionalModelFeeData } from '../data/car-fee-models-batch4.mjs';
import { remainingModelFeeData } from '../data/car-fee-models-batch5.mjs';
import { individualModelFeeData } from '../data/car-fee-models-batch6.mjs';
import { carFeeAtRate, carFeeBands, carFeeRows, carFeeText, formatCarMoney as money, carElectricTerms } from '../car-fee-rates.mjs';

const models = [
  {
    brand: 'Volvo', model: 'XC60', logo: 'volvo', slug: 'volvo-xc60',
    variants: [['B5 AWD Mild hybrid', 2299, 85], ['T8 AWD Plug-in hybrid', 2750, 85]],
    source: 'Volvo Cars Việt Nam · Giá khởi điểm XC60 B5 và XC60 T8, đời 2026',
    context: 'B5 và T8 có giá và hệ truyền động khác nhau. Nếu đang tái tục, hãy gửi số tiền bảo hiểm trên hợp đồng cũ cùng phiên bản để chuyên viên xem lại giá trị xe hiện tại.',
    heading: 'XC60 B5 và T8 cần kiểm tra điều khoản gì?',
    advice: 'Với bản T8 sạc ngoài, hỏi riêng phạm vi của bộ pin cao áp và hệ truyền động hybrid. Gửi đúng phiên bản để PVI kiểm tra điều khoản có thể áp dụng. Nếu muốn sửa tại Volvo, ghi rõ xưởng bạn thường dùng và hỏi điều kiện thay phụ tùng mới.',
    question: 'Có thể dùng phí của XC60 B5 để dự trù cho bản T8 không?',
    answer: 'Hãy tính từ giá trị bảo hiểm của bản T8. Phạm vi pin cao áp và hệ truyền động hybrid cũng cần xác nhận riêng trên chào phí.',
    banner: ['SO PHÍ XC60 B5 VÀ T8', 'KIỂM ĐIỀU KHOẢN PIN CAO ÁP'],
  },
  {
    brand: 'Mercedes-Benz', model: 'GLC', logo: 'mercedesbenz', slug: 'mercedes-benz-glc',
    aliases: ['GLC 200', 'GLC 300'],
    variants: [['GLC 200 4MATIC', 1999, 85], ['GLC 300 4MATIC', 2499, 85]],
    source: 'Mercedes-Benz Việt Nam · Bảng giá bán lẻ đề xuất tháng 10/2026',
    context: 'Bảng giá hãng ghi mốc khởi điểm theo phiên bản. Xe có tùy chọn thêm hoặc đã qua sử dụng cần định giá lại theo chính chiếc xe.',
    heading: 'Muốn sửa GLC tại xưởng Mercedes-Benz cần hỏi gì?',
    advice: 'Gửi tên xưởng bạn định sử dụng, hỏi chào phí có điều khoản chọn xưởng hay không và mức tự trả mỗi vụ. Nếu xe có gói trang bị thêm, gửi danh sách để xác định phần nào được kê trong hợp đồng.',
    question: 'GLC 200 và GLC 300 cùng tỷ lệ thì phí có giống nhau không?',
    answer: 'Phí tính trên số tiền bảo hiểm của từng bản. Nếu hai mức giá trị chênh 500 triệu đồng và cùng đủ điều kiện tính 0,85%, phần chênh phí minh họa là 4.250.000 đồng/năm.',
    banner: ['SO PHÍ GLC 200 VÀ GLC 300', 'XEM ĐIỀU KIỆN SỬA CHỮA CHÍNH HÃNG'],
  },
  {
    brand: 'Subaru', model: 'Forester', logo: 'subaru', slug: 'subaru-forester',
    variants: [['2.5i-L EyeSight, VIN 2026', 1299, 85], ['2.5 Boxer', 1399, 85]],
    source: 'Subaru Việt Nam · Bảng giá Forester 2.5i-L EyeSight và chương trình Forester 2.5 Boxer tháng 11/2026',
    context: 'Tra đúng tên phiên bản và VIN trên hồ sơ. Các mốc trên lấy từ giá hãng công bố. Quà tặng, ưu đãi tín dụng hoặc chi phí lăn bánh được xem riêng.',
    heading: 'Forester có EyeSight cần hỏi gì trước khi chọn xưởng?',
    advice: 'Nếu chào phí có quyền lợi sửa kính hoặc sửa chữa chính hãng, hỏi cả phương án kiểm tra và hiệu chỉnh hệ thống hỗ trợ lái sau sửa chữa khi cần. Nhờ PVI xác nhận chi phí nào thuộc phạm vi và mức khấu trừ áp dụng.',
    question: 'Xe Forester bản cũ có dùng giá của bản 2.5 mới không?',
    answer: 'Gửi đúng năm sản xuất, phiên bản và tình trạng của xe để định giá ở kỳ bảo hiểm hiện tại. Xe trên ba năm hoặc có tỷ lệ bồi thường cao cần chuyên viên xem riêng.',
    banner: ['SO PHÍ HAI BẢN FORESTER 2.5', 'HỎI PHẠM VI SỬA KÍNH VÀ HỆ THỐNG EYESIGHT'],
  },
  {
    brand: 'VinFast', model: 'VF 5', logo: 'vinfast', slug: 'vinfast-vf-5',
    variants: [['VF 5 Plus', 496, 153], ['VF 5 mới Premium', 540, 128], ['VF 5 mới Green', 460]],
    source: 'VinFast · Chính sách giá bán kèm pin từ 12/11/2026',
    context: 'Mốc 496 triệu và 540 triệu nằm hai phía của ngưỡng 500 triệu, vì vậy hai ví dụ dùng hai tỷ lệ khác nhau. Bản Green được VinFast định hướng cho kinh doanh dịch vụ. Nếu dùng kinh doanh, hãy gửi thông tin để chuyên viên xác nhận phí.',
    heading: 'Bảo hiểm VF 5 có quyền lợi pin và động cơ điện thế nào?',
    advice: carElectricTerms,
    question: 'Giá VF 5 đã kèm pin thì pin có tự được bảo hiểm không?',
    answer: 'Cần kiểm tra báo giá có ghi giá trị pin và ĐKBS 019. Nếu pin thuê hoặc mua riêng, gửi hợp đồng pin và hồ sơ sở hữu để PVI xem cách kê khai.',
    banner: ['SO PHÍ VF 5 Ở HAI MỐC GIÁ', 'XEM ĐIỀU KHOẢN PIN VÀ ĐỘNG CƠ ĐIỆN'],
  },
  {
    brand: 'Volvo', model: 'XC90', logo: 'volvo', slug: 'volvo-xc90',
    variants: [['XC90 Mild hybrid', 3289, 85]],
    source: 'Volvo Cars Việt Nam · Giá khởi điểm XC90 Mild hybrid',
    context: 'Volvo công bố mức khởi điểm 3,289 tỷ đồng cho XC90 Mild hybrid. Nếu xe của bạn là bản plug-in hybrid hoặc có trang bị tùy chọn, hãy dùng giá trị của đúng phiên bản khi tính.',
    heading: 'XC90 có trang bị thêm thì kê giá trị thế nào?',
    advice: 'Gửi cấu hình xe và hóa đơn của các tùy chọn có giá trị đáng kể. Khi chọn xưởng Volvo, hỏi trước cách giám định, mức khấu trừ và điều kiện thay phụ tùng cần ghi trên hợp đồng.',
    question: 'XC90 Mild hybrid và XC90 plug-in hybrid có dùng chung một báo giá không?',
    answer: 'Hãy gửi riêng thông tin hệ truyền động và giá trị của xe. Nếu là bản sạc ngoài, hỏi thêm điều khoản dành cho bộ pin trước khi chốt.',
    banner: ['TÍNH THỬ PHÍ VOLVO XC90', 'KIỂM GIÁ TRỊ TÙY CHỌN VÀ ĐIỀU KIỆN SỬA CHỮA'],
  },
  {
    brand: 'Mercedes-Benz', model: 'E class', logo: 'mercedesbenz', slug: 'mercedes-benz-e-class',
    aliases: ['E 200', 'E 300'], displayModel: 'E-Class',
    variants: [['E 200 Avantgarde', 2189, 85], ['E 200 Exclusive', 2689, 85], ['E 300 AMG', 3259, 85]],
    source: 'Mercedes-Benz Việt Nam · Bảng giá bán lẻ đề xuất tháng 10/2026',
    context: 'Hai bản E 200 cũng có giá khác nhau. Nếu chỉ gửi tên E 200 khi báo phí, bạn có thể nhận một ví dụ tính trên giá trị của phiên bản khác.',
    heading: 'E-Class sửa ở đại lý Mercedes-Benz cần đối chiếu khoản nào?',
    advice: 'Hỏi rõ quyền lựa chọn xưởng và việc tính khấu hao khi thay phụ tùng. Nếu xe có gói AMG, mâm hoặc trang bị thêm, ghi đúng cấu hình và gửi hồ sơ để kiểm giá trị được ghi trên đơn.',
    question: 'Phí chênh bao nhiêu giữa hai bản E 200 nếu cùng dùng 0,85%?',
    answer: 'Theo hai mốc giá tham khảo trong bảng, chênh 500 triệu đồng số tiền bảo hiểm thì phí dự tính chênh 4.250.000 đồng/năm.',
    banner: ['SO PHÍ E 200 VÀ E 300', 'KIỂM ĐIỀU KIỆN CHỌN XƯỞNG VÀ PHỤ TÙNG'],
  },
  {
    brand: 'Subaru', model: 'Crosstrek', logo: 'subaru', slug: 'subaru-crosstrek',
    variants: [['2.0 i-S EyeSight MY24', 1098, 85], ['2.0 i-S EyeSight e-Boxer Hybrid MY24', 1268, 85]],
    source: 'Subaru Việt Nam · Giá niêm yết MY24 trong bảng Crosstrek tháng 09/2026',
    context: 'Ví dụ dùng giá niêm yết của hai bản MY24 được hãng công bố trong tháng 09/2026. Nếu mua lại hoặc nhận báo giá có ưu đãi khác, hãy thay bằng số tiền bảo hiểm được đề xuất cho xe của mình.',
    heading: 'Crosstrek e-Boxer cần kê khai gì khi nhận báo giá?',
    advice: 'Ghi rõ bản xăng hay e-Boxer và nhờ tư vấn viên xác nhận phạm vi bộ pin hybrid. Nếu thường đi đường ngập, kiểm tra điều khoản hư hỏng động cơ do nước và mức khấu trừ tương ứng.',
    question: 'Có nên lấy giá ưu đãi của đại lý làm số tiền bảo hiểm Crosstrek?',
    answer: 'Bạn có thể gửi báo giá hoặc hóa đơn của đại lý cho PVI cùng năm sản xuất và phiên bản. Phép tính dùng số tiền bảo hiểm được chấp thuận trên chào phí.',
    banner: ['SO PHÍ CROSSTREK XĂNG VÀ E-BOXER', 'HỎI PHẠM VI BẢO HIỂM PIN HYBRID'],
  },
  {
    brand: 'VinFast', model: 'VF 6', logo: 'vinfast', slug: 'vinfast-vf-6',
    variants: [['VF 6 mới Comfort', 646, 128], ['VF 6 mới Premium', 715, 119]],
    source: 'VinFast · Giá bán đề xuất kèm pin cho VF 6 mới từ 12/11/2026',
    context: 'Comfort ở mốc 646 triệu và Premium ở 715 triệu nên đi qua ngưỡng 700 triệu. Thử từng phiên bản để thấy vì sao tỷ lệ thấp hơn vẫn có thể cho tổng phí cao hơn.',
    heading: 'VF 6 cần hỏi gì về pin và động cơ điện?',
    advice: carElectricTerms,
    question: 'VF 6 Premium có tỷ lệ thấp hơn Comfort thì phí có thấp hơn không?',
    answer: 'Ở hai giá hãng trong ví dụ, Comfort tính 8.268.800 đồng còn Premium tính 8.508.500 đồng mỗi năm, vì Premium có số tiền bảo hiểm cao hơn.',
    banner: ['SO PHÍ VF 6 COMFORT VÀ PREMIUM', 'KIỂM KÊ KHAI PIN VÀ ĐỘNG CƠ ĐIỆN'],
  },
  ...moreModelFeeData,
  ...additionalModelFeeData,
  ...remainingModelFeeData,
  ...individualModelFeeData,
];

const feeText = (rate, value) => `${rate === carFeeBands.at(-1).rate ? 'Chỉ từ ' : ''}${money(carFeeAtRate(value * 1_000_000, rate))} đồng/năm`;
export const carFeeModelAnchor = (label) => label.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const modelFeeArticles = models.map((data) => {
  const { brand, model, logo, aliases = [], variants, slug, source, context, heading, advice, question, answer } = data;
  const name = brand + ' ' + (data.displayModel || model);
  const id = 'bao-hiem-vat-chat-' + slug;
  const title = `Phí bảo hiểm vật chất ${name} bao nhiêu?`;
  const [, firstValue, firstRate] = variants[0] || [];
  const reviewOnly = Boolean(data.commercial || data.profile?.startsWith('used') || data.profile === 'service');
  const electric = data.profile?.includes('electric') || (brand === 'VinFast' && data.profile === 'service');
  const reviewLabel = data.commercial ? 'Xe chở hàng, cần báo phí riêng' : data.profile === 'service'
    ? 'Xe cần báo phí theo mục đích sử dụng' : reviewOnly ? 'Hồ sơ cần thẩm định riêng' : 'Xe kinh doanh, trên 3 năm hoặc tỷ lệ bồi thường cao';
  const example = firstRate ? feeText(firstRate, firstValue) : 'Liên hệ chuyên viên để được báo phí';
  const lead = firstRate
    ? `Xem phí dự tính cho ${name} theo giá trị bảo hiểm và phiên bản. Với mốc ${money(firstValue)} triệu đồng, phí tham khảo là ${example.toLowerCase()} nếu hồ sơ đủ điều kiện.`
    : data.editorial ? context : `Xem giá hãng, điều khoản và hồ sơ cần gửi để được báo phí bảo hiểm ${name}. Mốc ${money(firstValue)} triệu đồng trong bài cần được báo phí riêng.`;
  const cover = 'phi-bao-hiem-' + slug + '-minh-hoa';
  const alt = `Ảnh minh họa ${name} tại khu tiếp nhận dịch vụ`;
  const post = {
    slug: id, path: '/kien-thuc/bao-hiem-o-to/' + id + '/', date: '2026-11-27', dateText: '27/11/2026',
    cat: 'Kiến thức · Bảo hiểm vật chất xe', title, lead, image: '/assets/' + cover + '.webp',
    imageWidth: 1200, imageHeight: 630, alt, readMin: 4,
    noindex: Boolean(data.archiveFromListing),
  };
  return {
    data, brand, model, aliases, post, cover, internalLinksOnly: true,
    crumb: 'Bảo hiểm vật chất xe',
    hero: { name: cover, w: 1200, h: 630, besideTitle: true, download: true, caption: `Hình ảnh minh họa: ${name}.` },
    seo: { title, description: `Tra phí bảo hiểm ${name} theo giá trị xe, xem các điều khoản và cách xác nhận xưởng ${brand} trong chương trình liên kết PVI.` },
    stylesheet: '/santa-fe-fee.css',
    script: '/santa-fe-fee.js',
    tocOptions: { startOpen: false, label: 'Tóm tắt nội dung' },
    toc: [['bang-tinh-phi', 'Bảng tính phí'], ['dieu-khoan', 'Điều khoản cần kiểm tra'], ['xuong-lien-ket', 'Kiểm tra xưởng liên kết']],
    faqs: [{ question, answer }, ...(data.editorial ? [
      { question: `Cần gửi thông tin nào để nhận báo phí bảo hiểm ${name}?`, answer: `Gửi đăng ký, năm sản xuất, phiên bản, mục đích sử dụng và ảnh hiện trạng. ${electric ? 'Với xe điện, gửi giấy tờ ghi nhận bộ pin cùng hồ sơ xe. ' : ''}Nếu đã có hợp đồng trước đó, bổ sung lịch sử bồi thường và tên xưởng muốn chọn để PVI kiểm tra.` },
      { question: `Khi nào cần xác nhận xưởng cho ${name}?`, answer: `Hỏi trước khi mua nếu bạn có xưởng muốn chọn. Gửi tên cơ sở, địa chỉ và phiên bản xe để đối chiếu việc tiếp nhận, khả năng sửa chữa và các điều kiện bảo lãnh trên báo giá.` },
    ] : [])],
    sources: [[source, '', 'Đối chiếu 27/11/2026'], ['Tỷ lệ phí tham khảo và chương trình liên kết', '', 'Thông tin do PVI Thành Đô cung cấp']],
    related: [{ href: '/kien-thuc/tinhphinhanhtheotenxe/', img: cover, w: 1200, h: 630, k: 'Tra cứu theo mẫu xe', title: 'Tra cứu phí theo dòng xe', text: 'Chọn hãng và tìm mẫu xe khác để tính thử.' }],
    disclaimer: 'Phép tính dùng để dự trù phí 12 tháng. Thuế, phí bổ sung, quyền lợi và điều kiện bảo lãnh theo báo giá và hợp đồng được PVI chấp thuận.',
    body() {
      return `
<h2 id="bang-tinh-phi">Tính thử phí cho ${esc(name)}</h2>
<p>${esc(context)}</p>
<!-- Thông tin giá được hiển thị khi có nguồn cho đúng phiên bản. -->
${variants.length ? `<div class="kb-table"><table aria-label="Ví dụ phí theo phiên bản">
<thead><tr><th scope="col">Phiên bản</th><th scope="col">Giá tham khảo</th><th scope="col">Phí 12 tháng</th></tr></thead>
<tbody>${variants.map(([label, value, rate]) => `<tr><th scope="row">${esc(label)}</th><td>${money(value)} triệu</td><td>${rate ? `${carFeeText(rate)} · ${feeText(rate, value)}` : 'Hỏi báo phí theo hồ sơ'}${rate === 153 ? ' · 3 điều khoản' : ''}</td></tr>`).join('')}</tbody>
</table></div>` : '<p>Nhập số tiền muốn tham gia bảo hiểm nếu đã có giá trị tham chiếu. PVI sẽ xem giá trị, ảnh hiện trạng và giấy tờ xe trước khi gửi báo phí.</p>'}
${data.checks ? `<div class="kb-table"><table aria-label="Thông tin cần chuẩn bị theo mẫu xe"><thead><tr><th scope="col">Mẫu xe</th><th scope="col">Kiểm trước khi hỏi phí</th></tr></thead><tbody>${Object.entries(data.checks).map(([label, note]) => `<tr id="xe-${carFeeModelAnchor(label)}"><th scope="row">${esc(label)}</th><td>${esc(note)}</td></tr>`).join('')}</tbody></table></div>` : ''}
<p>Giá xe là mốc để tính thử. Khi có số tiền bảo hiểm được chấp thuận, dùng số đó nhân tỷ lệ. Bảng áp dụng tham khảo cho xe mới hoặc sử dụng đến 3 năm, hồ sơ đủ điều kiện.</p>
<div class="santa-fe-fee" data-car-fee-calculator>
  <label for="model-fee-profile">Hồ sơ xe</label>
  <select id="model-fee-profile">${reviewOnly ? '' : '<option value="standard">Xe mới hoặc sử dụng đến 3 năm</option>'}<option value="review">${reviewLabel}</option></select>
  <label for="model-fee-value">Số tiền bảo hiểm (triệu đồng)</label>
  <input id="model-fee-value" type="number" inputmode="decimal" min="1" step="any" required${firstValue ? ` value="${firstValue}"` : ''}>
  <p class="santa-fe-estimate"><strong>Phí dự tính:</strong> <output for="model-fee-value model-fee-profile">${example}</output></p>
  <details><summary>Xem bốn mốc tỷ lệ phí</summary><div class="kb-table"><table><thead><tr><th scope="col">Số tiền bảo hiểm</th><th scope="col">Tỷ lệ phí</th></tr></thead><tbody>${carFeeRows()}</tbody></table></div></details>
</div>
<h2 id="dieu-khoan">${esc(heading)}</h2>
<p>${esc(advice)}</p>
${electric ? `<p>${esc(carElectricTerms)}</p>` : ''}
${data.editorial ? `<figure><img src="/assets/${cover}-800.webp" width="800" height="420" alt="${esc(alt)}" loading="lazy" decoding="async"><figcaption>Hình ảnh minh họa: ${esc(name)} tại khu tiếp nhận dịch vụ.</figcaption></figure>` : ''}
<h2 id="xuong-lien-ket">Kiểm tra xưởng ${esc(brand)} liên kết với PVI</h2>
<p>PVI đã ký hợp tác với ${esc(brand)} theo thông tin từ PVI Thành Đô. Nếu muốn sửa tại một cơ sở cụ thể, gửi tên và địa chỉ xưởng để chuyên viên kiểm tra cơ sở tiếp nhận, điều kiện bảo lãnh và quyền lợi sửa chữa trên báo giá.</p>
<p>Để nhận báo phí, chuẩn bị phiên bản, năm sản xuất, mục đích sử dụng, hồ sơ bồi thường kỳ trước nếu có và tên xưởng muốn chọn. Xem <a class="kb-link" href="/san-pham/bao-hiem-vat-chat-xe/">quyền lợi bảo hiểm vật chất xe PVI</a>.</p>`;
    },
  };
});
