import fs from 'node:fs';
import { page, esc, SITE, faqJsonLd, breadcrumbJsonLd } from './chrome.mjs';
import { formatVnd, tndsVehicleClasses } from './data/tnds.mjs';
import { binhDuongGuides, binhDuongOffice, binhDuongOfficeSources } from './articles/binh-duong-guides.mjs';

const route = '/binhduong/';
const overview = '/tin-tuc/mua-bao-hiem-pvi-binh-duong/';
const title = 'Biểu phí bảo hiểm PVI tại Bình Dương mới nhất 2026';
const description = 'Tra biểu phí bảo hiểm PVI tại Bình Dương năm 2026 cho ô tô, cháy nổ, tai nạn và nhà xưởng. Xem hồ sơ, báo phí và địa chỉ chi nhánh ở Thủ Dầu Một.';
const groups = [
  {
    id: 'xe',
    title: 'Xe ô tô',
    products: [
      ['bao-hiem-tnds-o-to-binh-duong', 'TNDS ô tô bắt buộc', 'Tra theo loại xe, số chỗ hoặc tải trọng và mục đích sử dụng.', '#tnds-tra-cuu', 'Tra phí TNDS'],
      ['bao-hiem-vat-chat-xe-o-to-binh-duong', 'Vật chất xe ô tô', 'Báo phí theo giá trị xe, cách sử dụng, khấu trừ và điều khoản bổ sung.', '', 'Xem bảo hiểm vật chất xe'],
    ],
  },
  {
    id: 'tai-san',
    title: 'Nhà xưởng, công trình và hàng hóa',
    products: [
      ['bao-hiem-chay-no-nha-xuong-kho-binh-duong', 'Cháy nổ nhà xưởng, kho', 'Tra nhóm cơ sở và tỷ lệ phí, sau đó nhập giá trị tài sản để ước tính.', '#tra-cuu', 'Tra phí cháy nổ'],
      ['bao-hiem-tai-san-nha-xuong-binh-duong', 'Tài sản nhà xưởng', 'Gửi danh mục và giá trị nhà xưởng, máy móc, tồn kho theo từng địa điểm.', '#nhan-bao-phi', 'Nhận báo phí tài sản'],
      ['bao-hiem-cong-trinh-lap-dat-binh-duong', 'Công trình và lắp đặt', 'Gửi dự toán, địa điểm thi công, thời gian lắp đặt và chạy thử.', '', 'Xem bảo hiểm công trình'],
      ['bao-hiem-hang-hoa-xuat-nhap-khau-binh-duong', 'Hàng hóa xuất nhập khẩu', 'Báo phí theo giá trị lô hàng, cách đóng gói và hành trình vận chuyển.', '', 'Xem bảo hiểm hàng hóa'],
    ],
  },
  {
    id: 'con-nguoi',
    title: 'Công nhân, sức khỏe và du lịch',
    products: [
      ['bao-hiem-tai-nan-cong-nhan-cong-truong-binh-duong', 'Người lao động thi công', 'Khai công trình, nhóm công việc, số người và thời gian thi công.', '#cong-truong', 'Xem bảo hiểm công trường'],
      ['bao-hiem-tai-nan-24-24-cong-nhan-binh-duong', 'Tai nạn 24/24 cho công nhân', 'Ước tính theo gói, số người và thời hạn. Nêu rõ các nhóm nghề khi hỏi báo phí.', '#tinh-phi', 'Tính phí tai nạn 24/24'],
      ['bao-hiem-suc-khoe-pvi-care-binh-duong', 'Sức khỏe PVI Care', 'Chọn quyền lợi theo nhu cầu khám, điều trị và bảo lãnh viện phí.', '', 'Xem các chương trình PVI Care'],
      ['bao-hiem-du-lich-quoc-te-binh-duong', 'Du lịch quốc tế', 'Tra phí theo điểm đến, thời hạn và chương trình bảo hiểm.', '#tinh-phi', 'Tính phí du lịch'],
    ],
  },
];
const faqs = [
  { question: 'Bảo hiểm PVI có cấp hợp đồng cho khách tại Bình Dương không?', answer: 'Có. Bảo hiểm PVI tiếp nhận nhu cầu từ cá nhân và doanh nghiệp ở khu vực Bình Dương, gồm Thủ Dầu Một, Dĩ An, Thuận An, Bến Cát và Tân Uyên. Việc phát hành căn cứ hồ sơ và điều kiện của từng nghiệp vụ.' },
  { question: 'Nhà xưởng ở VSIP hoặc Mỹ Phước cần gửi gì để báo phí?', answer: 'Chuẩn bị địa chỉ và công năng từng khu, danh mục và giá trị tài sản, thông tin phòng cháy chữa cháy và thời hạn mong muốn. Nếu thuê xưởng, gửi thông tin về phần tài sản của chủ xưởng và phần tài sản của doanh nghiệp để xác định phạm vi cần bảo hiểm.' },
  { question: 'PVI Bình Dương hiện ở đâu?', answer: 'PVI Bình Dương hiện là Chi nhánh Bảo hiểm PVI Đông Sài Gòn. Văn phòng ở tầng 4 và 5, tòa nhà số 48 đường Hoàng Văn Thụ, khu dân cư Chánh Nghĩa, phường Thủ Dầu Một, TP.HCM. Điện thoại chi nhánh 0274 387 2528.' },
];
const exampleFees = tndsVehicleClasses
  .find(({ id }) => id === 'passenger').usages
  .find(({ id }) => id === 'private').rows.slice(0, 2);

function photo(name, alt, sizes, eager = false) {
  const src = `/assets/${name}`;
  return `<img src="${src}.webp" srcset="${src}-480.webp 480w, ${src}-800.webp 800w, ${src}.webp 1200w" sizes="${sizes}" width="1200" height="800" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

function productRow([slug, label, basis, anchor, action]) {
  const guide = binhDuongGuides.find(({ post }) => post.slug === slug);
  const destination = anchor.startsWith('#nhan-') ? anchor : guide.related[0].href + anchor;
  return `<li class="bd-product">
  <div><h4>${esc(label)}</h4><p>${esc(basis)}</p></div>
  <div class="bd-product-links">
    <a href="${destination}">${esc(action)} <span aria-hidden="true">→</span></a>
    <a href="/tin-tuc/${slug}/" aria-label="Hồ sơ ${esc(label)} tại Bình Dương">Hồ sơ tại Bình Dương</a>
  </div>
</li>`;
}

const main = `<div class="bd">
<section class="bd-hero">
  <div class="bd-wrap bd-hero-grid">
    <div class="bd-intro">
      <nav class="bd-crumb" aria-label="Đường dẫn"><a href="/">Trang chủ</a><span aria-hidden="true">/</span><span aria-current="page">Bảo hiểm PVI tại Bình Dương</span></nav>
      <p class="bd-eyebrow">Bảo hiểm PVI · Khu vực Bình Dương</p>
      <h1>Biểu phí bảo hiểm PVI tại Bình Dương <span>mới nhất 2026</span></h1>
      <p>PVI có thể cấp bảo hiểm cho cá nhân và doanh nghiệp tại Bình Dương. Tra phí ô tô, cháy nổ, tai nạn hoặc xem hồ sơ báo phí cho nhà xưởng và công trình.</p>
      <div class="bd-actions"><a class="bd-button" href="#bieu-phi">Tra phí theo sản phẩm</a><a class="bd-button bd-secondary" href="#dia-chi-pvi-binh-duong">Xem địa chỉ PVI</a></div>
      <p class="bd-location"><strong>PVI Đông Sài Gòn (PVI Bình Dương trước đây)</strong><br>48 Hoàng Văn Thụ, phường Thủ Dầu Một, TP.HCM</p>
    </div>
    <figure class="bd-hero-photo">
      ${photo('binhduong-khu-cong-nghiep', 'Đại lộ Bình Dương minh họa với xe tải và nhà xưởng khu công nghiệp', '(max-width:800px) 92vw, 550px', true)}
      <figcaption>Hình ảnh minh họa lấy cảm hứng từ các khu công nghiệp VSIP và Mỹ Phước, Bình Dương.</figcaption>
    </figure>
  </div>
</section>
<div class="bd-wrap bd-body">
  <nav class="bd-jumps bd-page-nav" aria-label="Nội dung trang">
    <a href="#bieu-phi">Biểu phí</a><a href="#cach-mua">Cách mua</a><a href="#dai-ly">Kiểm tra đại lý</a><a href="#nhan-bao-phi">Hồ sơ</a><a href="#su-co">Khi có sự cố</a><a href="#dia-chi-pvi-binh-duong">Địa chỉ PVI</a>
  </nav>
  <section class="bd-section" aria-labelledby="bieu-phi">
    <h2 id="bieu-phi">Biểu phí theo sản phẩm</h2>
    <p class="bd-summary">Chọn nghiệp vụ để tra biểu phí công khai, tính phí tham khảo hoặc xem thông tin cần gửi để PVI báo phí theo hồ sơ.</p>
    <nav class="bd-jumps" aria-label="Nhóm sản phẩm">${groups.map((g) => `<a href="#${g.id}">${g.title}</a>`).join('')}</nav>
    <div class="bd-fees">
      <div><h3>Phí TNDS ô tô không kinh doanh vận tải</h3><p>Mức phí cơ sở một năm, chưa gồm VAT.</p></div>
      <dl>${exampleFees.map((fee) => `<div><dt>${esc(fee.label)}</dt><dd>${formatVnd(fee.baseFee)}</dd></div>`).join('')}</dl>
      <p class="bd-source">Căn cứ Phụ lục I Nghị định 67/2023/NĐ-CP, đối chiếu Văn bản hợp nhất 64/2026/VBHN-NĐ-BTC ngày 05/11/2026.</p>
    </div>
    ${groups.map((g) => `<section class="bd-group" aria-labelledby="${g.id}"><h3 id="${g.id}">${g.title}</h3><ul>${g.products.map(productRow).join('\n')}</ul></section>`).join('\n')}
  </section>
  <section class="bd-section bd-guide" aria-labelledby="cach-mua">
    <h2 id="cach-mua">Ba bước mua bảo hiểm PVI tại Bình Dương</h2>
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
    <div><h2 id="nhan-bao-phi">Hồ sơ để nhận báo phí</h2><p>Gửi nghiệp vụ, địa chỉ xe hoặc tài sản và ngày cần hiệu lực. Với nhà xưởng hoặc kho, thêm công năng và danh mục tài sản. Với công nhân, thêm số người, nhóm việc và nơi làm việc.</p><a class="bd-link" href="${overview}">Xem hướng dẫn mua bảo hiểm PVI tại Bình Dương →</a></div>
    <a class="bd-button" href="tel:0938072236">Gọi PVI Thành Đô 0938 072 236</a>
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

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org', '@type': 'WebPage', name: title, description,
  url: SITE + route,
  about: { '@type': 'Place', name: 'Khu vực Bình Dương, TP.HCM' },
}).replace(/</g, '\\u003c');
const html = page({
  path: route, title, description, image: '/assets/binhduong-khu-cong-nghiep.webp', main,
  extraCss: '<link rel="stylesheet" href="/binhduong/landing.css">',
  head: `<script type="application/ld+json">${jsonLd}</script>${breadcrumbJsonLd(route, 'Bảo hiểm PVI tại Bình Dương')}${faqJsonLd(faqs)}`,
});
const output = new URL('../dist/binhduong/', import.meta.url);
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(new URL('index.html', output), html);
