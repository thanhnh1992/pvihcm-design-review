import fs from 'node:fs';
import { page, esc, SITE, ZALO, faqJsonLd, breadcrumbJsonLd } from './chrome.mjs';
import { formatVnd, tndsVehicleClasses } from './data/tnds.mjs';
import { binhDuongGuides, binhDuongOffice, binhDuongOfficeSources } from './articles/binh-duong-guides.mjs';

const route = '/binhduong/';
const catalog = route + 'sanpham/';
const overview = '/tin-tuc/mua-bao-hiem-pvi-binh-duong/';
const title = 'Mua bảo hiểm tại Bình Dương | Uy tín, báo phí nhanh';
const description = 'Mua bảo hiểm tại Bình Dương. Tra biểu phí PVI 2026 theo sản phẩm, nhận báo phí, hỏi ưu đãi đang áp dụng và xem địa chỉ tư vấn tại Thủ Dầu Một.';
const groups = [
  {
    id: 'xe',
    title: 'Mua bảo hiểm xe ô tô tại Bình Dương',
    products: [
      ['bao-hiem-tnds-o-to-binh-duong', 'Bảo hiểm TNDS ô tô bắt buộc', 'Cho xe cá nhân và xe kinh doanh. Tra phí theo loại xe, số chỗ, tải trọng và mục đích sử dụng.', '#tnds-tra-cuu', 'Tra phí TNDS'],
      ['bao-hiem-vat-chat-xe-o-to-binh-duong', 'Bảo hiểm vật chất xe ô tô', 'Xem phạm vi bảo hiểm thân vỏ, mức khấu trừ và điều khoản bổ sung. Báo phí theo giá trị và tình trạng xe.', '', 'Xem quyền lợi vật chất xe'],
    ],
  },
  {
    id: 'tai-san',
    title: 'Bảo hiểm nhà xưởng, công trình và hàng hóa',
    products: [
      ['bao-hiem-chay-no-nha-xuong-kho-binh-duong', 'Mua bảo hiểm cháy nổ bắt buộc tại Bình Dương', 'Cho nhà xưởng, kho và cơ sở thuộc diện phải mua. Tra loại cơ sở và nhập giá trị tài sản để ước tính phí.', '#tra-cuu', 'Tra phí cháy nổ'],
      ['bao-hiem-tai-san-nha-xuong-binh-duong', 'Bảo hiểm tài sản nhà xưởng', 'Cho nhà xưởng đang vận hành, máy móc và tồn kho. Lập danh mục tài sản theo từng địa điểm để nhận báo phí.', '#nhan-bao-phi', 'Nhận báo phí tài sản'],
      ['bao-hiem-cong-trinh-lap-dat-binh-duong', 'Bảo hiểm công trình và lắp đặt', 'Cho chủ đầu tư và nhà thầu xây mới, cải tạo hoặc lắp dây chuyền. Chuẩn bị dự toán, tiến độ và lịch chạy thử.', '', 'Xem bảo hiểm công trình'],
      ['bao-hiem-hang-hoa-xuat-nhap-khau-binh-duong', 'Bảo hiểm hàng hóa xuất nhập khẩu', 'Cho lô hàng đi từ kho Bình Dương đến cảng hoặc điểm giao. Báo phí theo giá trị hàng, bao bì và hành trình.', '', 'Xem bảo hiểm hàng hóa'],
    ],
  },
  {
    id: 'con-nguoi',
    title: 'Bảo hiểm công nhân, sức khỏe và du lịch',
    products: [
      ['bao-hiem-tai-nan-cong-nhan-cong-truong-binh-duong', 'Bảo hiểm người lao động thi công', 'Cho nhà thầu cần bảo hiểm đội thi công. Khai địa điểm công trình, nhóm việc, số người và thời gian làm việc.', '#cong-truong', 'Xem bảo hiểm công trường'],
      ['bao-hiem-tai-nan-24-24-cong-nhan-binh-duong', 'Bảo hiểm tai nạn 24/24 cho công nhân', 'Cho doanh nghiệp mua theo danh sách nhân viên. Ước tính phí theo gói, số người và thời hạn.', '#tinh-phi', 'Tính phí tai nạn 24/24'],
      ['bao-hiem-suc-khoe-pvi-care-binh-duong', 'Bảo hiểm sức khỏe', 'Cho cá nhân, gia đình hoặc nhân viên. So quyền lợi nội trú, ngoại trú và điều kiện bảo lãnh viện phí.', '', 'Xem các chương trình sức khỏe'],
      ['bao-hiem-du-lich-quoc-te-binh-duong', 'Bảo hiểm du lịch quốc tế', 'Cho chuyến đi du lịch, công tác hoặc thăm thân. Tra phí theo điểm đến, số ngày và chương trình.', '#tinh-phi', 'Tính phí du lịch'],
    ],
  },
];
// URL địa phương và thông tin cần gửi để báo phí từng nghiệp vụ.
const localProducts = {
  tnds: ['tndsoto', ['Giấy đăng ký xe hoặc giấy tờ xe mới', 'Số chỗ ngồi hoặc tải trọng và mục đích sử dụng', 'Ngày cần hiệu lực, hoặc ngày hết hạn của đơn đang có']],
  'vat-chat-xe': ['vatchatxeoto', ['Giấy đăng ký, đời xe và mục đích sử dụng', 'Giá trị xe đề nghị và ảnh tình trạng thân vỏ', 'Nhu cầu về gara, mức khấu trừ và điều khoản bổ sung']],
  'chay-no': ['chaynobatbuoc', ['Địa chỉ, công năng, quy mô và sơ đồ từng khu', 'Danh mục nhà xưởng, máy móc, hàng hóa và giá trị theo hạng mục', 'Thông tin phòng cháy chữa cháy và thay đổi so với kỳ trước']],
  'tai-san': ['taisannhaxuong', ['Địa chỉ và công năng từng xưởng hoặc kho', 'Danh mục nhà, thiết bị và hàng tồn kho kèm giá trị', 'Thông tin chủ sở hữu, tài sản thuê hoặc nhận giữ hộ']],
  'cong-trinh': ['congtrinhlapdat', ['Địa chỉ dự án, hạng mục và dự toán', 'Tiến độ, lịch lắp đặt, chạy thử và bàn giao', 'Tài sản hiện hữu hoặc công trình lân cận cần xem xét']],
  'hang-hoa': ['hanghoaxuatnhapkhau', ['Loại hàng, hóa đơn hoặc giá trị lô hàng', 'Quy cách đóng gói, phương tiện và lịch vận chuyển', 'Điểm nhận, điểm giao và điều kiện giao hàng']],
  'cong-nhan': ['nguoilaodongthicong', ['Tên nhà thầu, tên và địa chỉ công trình', 'Hạng mục, thời gian thi công và nhóm công việc', 'Số người và danh sách theo mẫu khi được hướng dẫn']],
  'tai-nan': ['tainan2424', ['Số người theo bộ phận, ca làm hoặc nhóm nghề', 'Mức quyền lợi cần xem và thời hạn mong muốn', 'Nhu cầu bổ sung hoặc thay đổi người lao động trong kỳ']],
  'suc-khoe': ['suckhoe', ['Số người, nhóm tuổi và ngày cần hiệu lực', 'Nhu cầu nội trú, ngoại trú và nơi thường khám', 'Tờ khai sức khỏe theo hướng dẫn của đơn vị tiếp nhận']],
  'du-lich': ['dulichquocte', ['Điểm đến, ngày đi, ngày về và mục đích chuyến đi', 'Độ tuổi và thông tin hộ chiếu qua kênh được xác nhận', 'Yêu cầu về chứng nhận hoặc hồ sơ visa nếu có']],
};
const faqs = [
  { question: 'Bảo hiểm PVI có cấp hợp đồng cho khách tại Bình Dương không?', answer: 'Có. Bảo hiểm PVI tiếp nhận nhu cầu từ cá nhân và doanh nghiệp ở khu vực Bình Dương, gồm Thủ Dầu Một, Dĩ An, Thuận An, Bến Cát và Tân Uyên. Việc phát hành căn cứ hồ sơ và điều kiện của từng nghiệp vụ.' },
  { question: 'Nhà xưởng ở VSIP hoặc Mỹ Phước cần gửi gì để báo phí?', answer: 'Chuẩn bị địa chỉ và công năng từng khu, danh mục và giá trị tài sản, thông tin phòng cháy chữa cháy và thời hạn mong muốn. Nếu thuê xưởng, gửi thông tin về phần tài sản của chủ xưởng và phần tài sản của doanh nghiệp để xác định phạm vi cần bảo hiểm.' },
  { question: 'PVI Bình Dương hiện ở đâu?', answer: 'PVI Bình Dương hiện là Chi nhánh Bảo hiểm PVI Đông Sài Gòn. Văn phòng ở tầng 4 và 5, tòa nhà số 48 đường Hoàng Văn Thụ, khu dân cư Chánh Nghĩa, phường Thủ Dầu Một, TP.HCM. Điện thoại chi nhánh 0274 387 2528.' },
];
const exampleFees = tndsVehicleClasses
  .find(({ id }) => id === 'passenger').usages
  .find(({ id }) => id === 'private').rows.slice(0, 2);
const feeExample = `<div class="bd-fees">
  <div><h3>Phí TNDS ô tô không kinh doanh vận tải</h3><p>Mức phí cơ sở một năm, chưa gồm VAT.</p></div>
  <dl>${exampleFees.map((fee) => `<div><dt>${esc(fee.label)}</dt><dd>${formatVnd(fee.baseFee)}</dd></div>`).join('')}</dl>
  <p class="bd-source">Căn cứ Phụ lục I Nghị định 67/2023/NĐ-CP, đối chiếu Văn bản hợp nhất 64/2026/VBHN-NĐ-BTC ngày 05/11/2026.</p>
</div>`;

function photo(name, alt, sizes, { eager = false, width = 1200, height = 800 } = {}) {
  const src = `/assets/${name}`;
  return `<img src="${src}.webp" srcset="${src}-480.webp 480w, ${src}-800.webp 800w, ${src}.webp ${width}w" sizes="${sizes}" width="${width}" height="${height}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

function productDetails([slug, label, basis, anchor, action]) {
  const guide = binhDuongGuides.find(({ post }) => post.slug === slug);
  const [localSlug, documents] = localProducts[guide.hero.name.replace('binh-duong-', '')];
  const destination = anchor === '#nhan-bao-phi' ? route + anchor : guide.related[0].href + anchor;
  return { slug, label, basis, action, guide, documents, destination, url: route + localSlug + '/' };
}

function productCard({ label, basis, action, guide, destination, url }) {
  const { name, w, h } = guide.hero;
  return `<li class="bd-product">
  <div class="bd-product-photo">${photo(name, guide.post.alt, '(max-width:620px) calc(100vw - 40px), (max-width:1248px) 48vw, 588px', { width: w, height: h })}</div>
  <div class="bd-product-copy">
    <h3>${esc(label)}</h3><p>${esc(basis)}</p>
    <div class="bd-product-links">
      <a class="bd-product-primary" href="${destination}">${esc(action)} <span aria-hidden="true">→</span></a>
      <a class="bd-product-detail" href="${url}" aria-label="Xem chi tiết: ${esc(label)}">Xem chi tiết</a>
    </div>
  </div>
</li>`;
}

const productGroups = groups.map((group) => ({ ...group, products: group.products.map(productDetails) }));
const fireProduct = productGroups[1].products[0];

const main = `<div class="bd">
<section class="bd-hero">
  <div class="bd-wrap bd-hero-grid">
    <div class="bd-intro">
      <nav class="bd-crumb" aria-label="Đường dẫn"><a href="/">Trang chủ</a><span aria-hidden="true">/</span><span aria-current="page">Bảo hiểm tại Bình Dương</span></nav>
      <h1>Mua bảo hiểm tại Bình Dương</h1>
      <p class="bd-promise">Uy tín · Báo phí nhanh · Hỏi ưu đãi</p>
      <p>Tra phí bảo hiểm cho cá nhân và doanh nghiệp tại Bình Dương. Chọn sản phẩm, xem hồ sơ cần chuẩn bị và hỏi chính sách ưu đãi đang áp dụng cho nhu cầu của bạn.</p>
      <div class="bd-actions"><a class="bd-button" href="${catalog}">Xem sản phẩm bảo hiểm</a><a class="bd-button bd-secondary" href="#nhan-bao-phi">Nhận báo phí</a></div>
      <p class="bd-location"><strong>PVI Đông Sài Gòn (PVI Bình Dương trước đây)</strong><br>48 Hoàng Văn Thụ, phường Thủ Dầu Một, TP.HCM</p>
    </div>
    <figure class="bd-hero-photo">
      ${photo('binhduong-khu-cong-nghiep', 'Đại lộ Bình Dương minh họa với xe tải và nhà xưởng khu công nghiệp', '(max-width:800px) 92vw, 550px', { eager: true })}
      <figcaption>Hình ảnh minh họa lấy cảm hứng từ các khu công nghiệp VSIP và Mỹ Phước, Bình Dương.</figcaption>
    </figure>
  </div>
</section>
<div class="bd-wrap bd-body">
  <nav class="bd-jumps bd-page-nav" aria-label="Nội dung trang">
    <a href="#bieu-phi">Biểu phí</a><a href="#cach-mua">Cách mua</a><a href="#dai-ly">Kiểm tra đại lý</a><a href="#nhan-bao-phi">Hồ sơ</a><a href="#su-co">Khi có sự cố</a><a href="#dia-chi-pvi-binh-duong">Địa chỉ PVI</a>
  </nav>
  <section class="bd-section" aria-labelledby="bieu-phi">
    <h2 id="bieu-phi">Biểu phí bảo hiểm PVI tại Bình Dương mới nhất 2026</h2>
    <p class="bd-summary">Chọn nghiệp vụ để tra biểu phí công khai, tính phí tham khảo hoặc xem thông tin cần gửi để PVI báo phí theo hồ sơ.</p>
  </section>
  <nav class="bd-jumps" aria-label="Nhóm sản phẩm">
    <a href="#xe">Ô tô</a><a href="${fireProduct.url}">Cháy nổ bắt buộc</a><a href="#tai-san">Nhà xưởng và công trình</a><a href="#con-nguoi">Con người và du lịch</a>
  </nav>
  ${productGroups.map((g) => `<section class="bd-group" aria-labelledby="${g.id}">
    <h2 id="${g.id}">${g.title}</h2>${g.id === 'xe' ? '\n    ' + feeExample : ''}
    <ul${g.id === 'tai-san' ? ' id="chay-no"' : ''}>${g.products.map(productCard).join('\n')}</ul>
  </section>`).join('\n')}
  <section class="bd-section bd-guide bd-after-products" aria-labelledby="cach-mua">
    <h2 id="cach-mua">Ba bước mua bảo hiểm tại Bình Dương</h2>
    <ol>
      <li><strong>Gửi nhu cầu.</strong> Chọn nghiệp vụ, nêu đối tượng cần bảo hiểm và ngày muốn bắt đầu. Gửi giấy tờ theo hướng dẫn của đầu mối tư vấn.</li>
      <li><strong>Đọc báo phí.</strong> Soát phạm vi, mức phí, quyền lợi, loại trừ và mức khấu trừ nếu có. Hỏi lại nếu thông tin xe, nhà xưởng hoặc danh sách người lao động chưa khớp.</li>
      <li><strong>Xác nhận để phát hành.</strong> Đối chiếu tên, địa chỉ, thời hạn và đơn vị cấp trước khi thanh toán theo hướng dẫn trên chứng từ. Lưu giấy chứng nhận hoặc hợp đồng để dùng khi cần.</li>
    </ol>
  </section>
  <section class="bd-section bd-guide" aria-labelledby="dai-ly">
    <h2 id="dai-ly">Mua qua đại lý ở Bình Dương cần kiểm tra gì?</h2>
    <p class="bd-summary">Xác minh đại lý được phép phân phối sản phẩm PVI bạn định mua. Nếu cần kiểm tra, gọi <a class="bd-link" href="tel:02743872528">chi nhánh PVI Đông Sài Gòn</a> trước khi chuyển tiền.</p>
    <ul>
      <li>Chứng từ ghi rõ Bảo hiểm PVI, đơn vị cấp và đúng tên bên mua.</li>
      <li>Đối tượng bảo hiểm, địa chỉ hoặc biển số, thời hạn và quyền lợi khớp với báo phí đã xác nhận.</li>
      <li>Thông tin thanh toán khớp với hướng dẫn trên hợp đồng hoặc giấy chứng nhận.</li>
    </ul>
  </section>
  <section class="bd-section bd-quote" aria-labelledby="nhan-bao-phi">
    <div><h2 id="nhan-bao-phi">Nhận báo phí và hỏi ưu đãi</h2><p>Gửi nghiệp vụ, địa chỉ xe hoặc tài sản và ngày cần hiệu lực. Với nhà xưởng hoặc kho, thêm công năng và danh mục tài sản. Với công nhân, thêm số người, nhóm việc và nơi làm việc.</p><p>Hỏi chương trình ưu đãi đang áp dụng cho sản phẩm và điều kiện tham gia khi nhận báo phí.</p><a class="bd-link" href="${overview}">Xem hướng dẫn mua bảo hiểm PVI tại Bình Dương →</a></div>
    <div class="bd-actions bd-quote-actions"><a class="bd-button" href="tel:0938072236">Gọi tư vấn 0938 072 236</a><a class="bd-button bd-secondary" href="${esc(ZALO)}">Nhắn Zalo</a></div>
  </section>
  <section class="bd-section bd-guide" aria-labelledby="su-co">
    <h2 id="su-co">Khi có sự cố ở Bình Dương</h2>
    <p class="bd-summary">Ưu tiên an toàn và liên hệ cơ quan chức năng hoặc cấp cứu khi cần. Sau đó báo đầu mối đã cấp hợp đồng và gọi <a class="bd-link" href="tel:1900545458">tổng đài bồi thường PVI 1900 54 54 58</a> để nhận hướng dẫn.</p>
    <p class="bd-summary">Giữ ảnh hiện trường, giấy tờ và hóa đơn liên quan. Trước khi tự sửa chữa hoặc xử lý tài sản bị hư hỏng, hỏi PVI về việc giám định và hồ sơ cần nộp. Nếu phải di chuyển để bảo đảm an toàn, ghi lại tình trạng khi có thể.</p>
  </section>
  <section class="bd-section bd-faq" aria-labelledby="cau-hoi">
    <h2 id="cau-hoi">Câu hỏi thường gặp</h2>
    ${faqs.map((f) => `<details><summary>${esc(f.question)}</summary><p>${esc(f.answer)}</p></details>`).join('\n')}
  </section>
  <section class="bd-section bd-office" aria-labelledby="dia-chi-pvi-binh-duong">
    <figure>${photo('binhduong-thu-dau-mot', 'Minh họa hai tháp trung tâm hành chính và đại lộ có hàng cây ở Bình Dương', '(max-width:800px) 92vw, 510px')}<figcaption>Hình ảnh minh họa lấy cảm hứng từ Trung tâm Hành chính Bình Dương.</figcaption></figure>
    <div>${binhDuongOffice()}<p class="bd-source">Nguồn: ${binhDuongOfficeSources.map(([name]) => esc(name)).join(' và ')}.</p></div>
  </section>
</div>
</div>`;

const localName = 'Bảo hiểm tại Bình Dương';
const catalogName = 'Sản phẩm bảo hiểm tại Bình Dương';
const catalogTitle = 'Biểu phí bảo hiểm PVI tại Bình Dương mới nhất 2026';
const heroImage = '/assets/binhduong-khu-cong-nghiep.webp';

function subpageCrumb(label, isProduct = false) {
  return `<nav class="bd-crumb" aria-label="Đường dẫn">
    <a href="/">Trang chủ</a><span aria-hidden="true">/</span><a href="${route}">${localName}</a><span aria-hidden="true">/</span>${isProduct ? `<a href="${catalog}">${catalogName}</a><span aria-hidden="true">/</span>` : ''}
    <span aria-current="page">${esc(label)}</span>
  </nav>`;
}

function writePage({ url, title, description, image, main, type = 'WebPage', extraHead = '' }) {
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org', '@type': type, name: title, description,
    url: SITE + url,
    about: { '@type': 'Place', name: 'Khu vực Bình Dương, TP.HCM' },
  }).replace(/</g, '\\u003c');
  const html = page({
    path: url, title, description, image, main, bodyClass: 'fire bd-page',
    extraCss: '<link rel="stylesheet" href="/binhduong/landing.css">',
    head: `<script type="application/ld+json">${jsonLd}</script>${extraHead}`,
  });
  const output = new URL('../dist' + url, import.meta.url);
  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(new URL('index.html', output), html);
}

function subpageBreadcrumbJsonLd(url, name, isProduct = false) {
  const trail = [['Trang chủ', '/'], [localName, route]];
  if (isProduct) trail.push([catalogName, catalog]);
  trail.push([name, url]);
  return `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, path], index) => ({
      '@type': 'ListItem', position: index + 1, name, item: SITE + path,
    })),
  }).replace(/</g, '\\u003c')}</script>`;
}

writePage({ url: route, title, description, image: heroImage, main,
  extraHead: breadcrumbJsonLd(route, localName) + faqJsonLd(faqs) });

writePage({
  url: catalog, title: catalogTitle,
  description: 'Xem 10 sản phẩm bảo hiểm tại Bình Dương. Chọn ô tô, cháy nổ, nhà xưởng, công trình, tai nạn hoặc sức khỏe để xem hồ sơ và cách tra phí.',
  type: 'CollectionPage', image: heroImage, extraHead: subpageBreadcrumbJsonLd(catalog, catalogName),
  main: `<div class="bd"><div class="bd-wrap bd-body bd-catalog">
    ${subpageCrumb(catalogName)}
    <h1>${catalogTitle}</h1>
    <p class="bd-summary">Chọn sản phẩm để xem hồ sơ cần chuẩn bị, biểu phí tham khảo hoặc cách nhận báo phí tại Bình Dương.</p>
    <nav class="bd-jumps" aria-label="Nhóm sản phẩm">${productGroups.map((g) => `<a href="#${g.id}">${g.title}</a>`).join('')}</nav>
    ${productGroups.map((g) => `<section class="bd-group" aria-labelledby="${g.id}"><h2 id="${g.id}">${g.title}</h2><ul>${g.products.map(productCard).join('\n')}</ul></section>`).join('\n')}
    <div class="bd-actions"><a class="bd-button" href="${route}#bieu-phi">Xem biểu phí 2026</a><a class="bd-button bd-secondary" href="${route}#nhan-bao-phi">Nhận báo phí</a></div>
  </div></div>`,
});

for (const group of productGroups) {
  for (const product of group.products) {
    const { label, basis, guide, documents, action, destination, slug, url } = product;
    const heading = label.endsWith('tại Bình Dương') ? label : label + ' tại Bình Dương';
    const { name, w, h } = guide.hero;
    writePage({
      url, title: heading, description: basis + ' Xem hồ sơ và liên hệ tư vấn tại Bình Dương.',
      image: guide.post.socialImage, extraHead: subpageBreadcrumbJsonLd(url, heading, true),
      main: `<div class="bd">
  <section class="bd-hero">
    <div class="bd-wrap bd-hero-grid">
      <div class="bd-intro">
        ${subpageCrumb(heading, true)}
        <h1>${esc(heading)}</h1>
        <p>${esc(basis)}</p>
        <div class="bd-actions"><a class="bd-button" href="${destination}">${esc(action)}</a><a class="bd-button bd-secondary" href="#ho-so">Xem hồ sơ</a></div>
      </div>
      <figure class="bd-hero-photo">
        ${photo(name, guide.post.alt, '(max-width:800px) 92vw, 550px', { eager: true, width: w, height: h })}
        <figcaption>${esc(guide.hero.caption)}</figcaption>
      </figure>
    </div>
  </section>
  <div class="bd-wrap bd-body">
    <section class="bd-section bd-guide" aria-labelledby="ho-so">
      <h2 id="ho-so">Hồ sơ cần chuẩn bị</h2>
      <ul>${documents.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      <p class="bd-summary"><a class="bd-link" href="/tin-tuc/${slug}/">Đọc hướng dẫn chi tiết tại Bình Dương →</a></p>
    </section>
    <section class="bd-section bd-quote" aria-labelledby="lien-he-tu-van">
      <div><h2 id="lien-he-tu-van">Nhận tư vấn tại Bình Dương</h2><p>Liên hệ để kiểm tra hồ sơ, điều kiện và thời điểm có thể phát hành.</p><a class="bd-link" href="${route}#dia-chi-pvi-binh-duong">Xem địa chỉ chi nhánh tại Thủ Dầu Một →</a></div>
      <div class="bd-actions bd-quote-actions"><a class="bd-button" href="tel:0938072236">Gọi tư vấn 0938 072 236</a><a class="bd-button bd-secondary" href="${esc(ZALO)}">Nhắn Zalo</a></div>
    </section>
    <p class="bd-return"><a class="bd-link" href="${catalog}">← Xem tất cả sản phẩm bảo hiểm tại Bình Dương</a></p>
  </div>
</div>`,
    });
  }
}
