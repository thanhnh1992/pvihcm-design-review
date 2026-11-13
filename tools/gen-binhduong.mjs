import fs from 'node:fs';
import { page, esc, SITE, ZALO, faqJsonLd, breadcrumbJsonLd } from './chrome.mjs';
import { formatVnd, tndsVehicleClasses } from './data/tnds.mjs';
import { binhDuongGuides, binhDuongOffice, binhDuongOfficeSources } from './articles/binh-duong-guides.mjs';

const route = '/binhduong/';
const overview = '/tin-tuc/mua-bao-hiem-pvi-binh-duong/';
const title = 'Mua bảo hiểm xe ô tô tại Bình Dương | Biểu phí 2026';
const description = 'Mua bảo hiểm xe ô tô tại Bình Dương. Tra phí TNDS, vật chất xe và cháy nổ bắt buộc 2026. Xem hồ sơ cho nhà xưởng và địa chỉ tư vấn ở Thủ Dầu Một.';
const groups = [
  {
    id: 'xe',
    title: 'Xe ô tô',
    products: [
      ['bao-hiem-tnds-o-to-binh-duong', 'Bảo hiểm TNDS ô tô bắt buộc', 'Cho xe cá nhân và xe kinh doanh. Tra phí theo loại xe, số chỗ, tải trọng và mục đích sử dụng.', '#tnds-tra-cuu', 'Tra phí TNDS'],
      ['bao-hiem-vat-chat-xe-o-to-binh-duong', 'Bảo hiểm vật chất xe ô tô', 'Xem phạm vi bảo hiểm thân vỏ, mức khấu trừ và điều khoản bổ sung. Báo phí theo giá trị và tình trạng xe.', '', 'Xem quyền lợi vật chất xe'],
    ],
  },
  {
    id: 'tai-san',
    title: 'Nhà xưởng, công trình và hàng hóa',
    products: [
      ['bao-hiem-chay-no-nha-xuong-kho-binh-duong', 'Mua bảo hiểm cháy nổ bắt buộc tại Bình Dương', 'Cho nhà xưởng, kho và cơ sở thuộc diện phải mua. Tra loại cơ sở và nhập giá trị tài sản để ước tính phí.', '#tra-cuu', 'Tra phí cháy nổ'],
      ['bao-hiem-tai-san-nha-xuong-binh-duong', 'Bảo hiểm tài sản nhà xưởng', 'Cho nhà xưởng đang vận hành, máy móc và tồn kho. Lập danh mục tài sản theo từng địa điểm để nhận báo phí.', '#nhan-bao-phi', 'Nhận báo phí tài sản'],
      ['bao-hiem-cong-trinh-lap-dat-binh-duong', 'Bảo hiểm công trình và lắp đặt', 'Cho chủ đầu tư và nhà thầu xây mới, cải tạo hoặc lắp dây chuyền. Chuẩn bị dự toán, tiến độ và lịch chạy thử.', '', 'Xem bảo hiểm công trình'],
      ['bao-hiem-hang-hoa-xuat-nhap-khau-binh-duong', 'Bảo hiểm hàng hóa xuất nhập khẩu', 'Cho lô hàng đi từ kho Bình Dương đến cảng hoặc điểm giao. Báo phí theo giá trị hàng, bao bì và hành trình.', '', 'Xem bảo hiểm hàng hóa'],
    ],
  },
  {
    id: 'con-nguoi',
    title: 'Công nhân, sức khỏe và du lịch',
    products: [
      ['bao-hiem-tai-nan-cong-nhan-cong-truong-binh-duong', 'Bảo hiểm người lao động thi công', 'Cho nhà thầu cần bảo hiểm đội thi công. Khai địa điểm công trình, nhóm việc, số người và thời gian làm việc.', '#cong-truong', 'Xem bảo hiểm công trường'],
      ['bao-hiem-tai-nan-24-24-cong-nhan-binh-duong', 'Bảo hiểm tai nạn 24/24 cho công nhân', 'Cho doanh nghiệp mua theo danh sách nhân viên. Ước tính phí theo gói, số người và thời hạn.', '#tinh-phi', 'Tính phí tai nạn 24/24'],
      ['bao-hiem-suc-khoe-pvi-care-binh-duong', 'Bảo hiểm sức khỏe', 'Cho cá nhân, gia đình hoặc nhân viên. So quyền lợi nội trú, ngoại trú và điều kiện bảo lãnh viện phí.', '', 'Xem các chương trình sức khỏe'],
      ['bao-hiem-du-lich-quoc-te-binh-duong', 'Bảo hiểm du lịch quốc tế', 'Cho chuyến đi du lịch, công tác hoặc thăm thân. Tra phí theo điểm đến, số ngày và chương trình.', '#tinh-phi', 'Tính phí du lịch'],
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
const feeExample = `<div class="bd-fees">
  <div><h4>Phí TNDS ô tô không kinh doanh vận tải</h4><p>Mức phí cơ sở một năm, chưa gồm VAT.</p></div>
  <dl>${exampleFees.map((fee) => `<div><dt>${esc(fee.label)}</dt><dd>${formatVnd(fee.baseFee)}</dd></div>`).join('')}</dl>
  <p class="bd-source">Căn cứ Phụ lục I Nghị định 67/2023/NĐ-CP, đối chiếu Văn bản hợp nhất 64/2026/VBHN-NĐ-BTC ngày 05/11/2026.</p>
</div>`;

function photo(name, alt, sizes, { eager = false, width = 1200, height = 800 } = {}) {
  const src = `/assets/${name}`;
  return `<img src="${src}.webp" srcset="${src}-480.webp 480w, ${src}-800.webp 800w, ${src}.webp ${width}w" sizes="${sizes}" width="${width}" height="${height}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

function productCard([slug, label, basis, anchor, action]) {
  const guide = binhDuongGuides.find(({ post }) => post.slug === slug);
  const destination = anchor.startsWith('#nhan-') ? anchor : guide.related[0].href + anchor;
  const { name, w, h } = guide.hero;
  return `<li class="bd-product">
  <div class="bd-product-photo">${photo(name, guide.post.alt, '(max-width:620px) calc(100vw - 40px), (max-width:1248px) 48vw, 588px', { width: w, height: h })}</div>
  <div class="bd-product-copy">
    <h4>${esc(label)}</h4><p>${esc(basis)}</p>
    <div class="bd-product-links">
      <a class="bd-product-primary" href="${destination}">${esc(action)} <span aria-hidden="true">→</span></a>
      <a class="bd-product-detail" href="/tin-tuc/${slug}/" aria-label="Xem hồ sơ cho sản phẩm: ${esc(label)}">Xem hồ sơ</a>
    </div>
  </div>
</li>`;
}

const main = `<div class="bd">
<section class="bd-hero">
  <div class="bd-wrap bd-hero-grid">
    <div class="bd-intro">
      <nav class="bd-crumb" aria-label="Đường dẫn"><a href="/">Trang chủ</a><span aria-hidden="true">/</span><span aria-current="page">Bảo hiểm tại Bình Dương</span></nav>
      <p class="bd-eyebrow">Biểu phí bảo hiểm 2026</p>
      <h1>Mua bảo hiểm xe ô tô tại Bình Dương</h1>
      <p>Tra phí TNDS theo loại xe, xem quyền lợi thân vỏ và chuẩn bị hồ sơ mua bảo hiểm. Doanh nghiệp có thể tra phí cháy nổ cho nhà xưởng, kho và các cơ sở thuộc diện bắt buộc.</p>
      <div class="bd-actions"><a class="bd-button" href="#xe">Xem bảo hiểm ô tô</a><a class="bd-button bd-secondary" href="#chay-no">Xem cháy nổ bắt buộc</a></div>
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
    <h2 id="bieu-phi">Biểu phí bảo hiểm tại Bình Dương 2026</h2>
    <p class="bd-summary">Chọn nghiệp vụ để tra biểu phí công khai, tính phí tham khảo hoặc xem thông tin cần gửi để PVI báo phí theo hồ sơ.</p>
    <nav class="bd-jumps" aria-label="Nhóm sản phẩm">${groups.map((g) => `<a href="#${g.id}">${g.title}</a>`).join('')}</nav>
    ${groups.map((g) => `<section class="bd-group" aria-labelledby="${g.id}">
      <h3 id="${g.id}">${g.title}</h3>${g.id === 'xe' ? '\n      ' + feeExample : ''}
      <ul${g.id === 'tai-san' ? ' id="chay-no"' : ''}>${g.products.map(productCard).join('\n')}</ul>
    </section>`).join('\n')}
  </section>
  <section class="bd-section bd-guide" aria-labelledby="cach-mua">
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
    <div><h2 id="nhan-bao-phi">Hồ sơ để nhận báo phí</h2><p>Gửi nghiệp vụ, địa chỉ xe hoặc tài sản và ngày cần hiệu lực. Với nhà xưởng hoặc kho, thêm công năng và danh mục tài sản. Với công nhân, thêm số người, nhóm việc và nơi làm việc.</p><a class="bd-link" href="${overview}">Xem hướng dẫn mua bảo hiểm PVI tại Bình Dương →</a></div>
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

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org', '@type': 'WebPage', name: title, description,
  url: SITE + route,
  about: { '@type': 'Place', name: 'Khu vực Bình Dương, TP.HCM' },
}).replace(/</g, '\\u003c');
const html = page({
  path: route, title, description, image: '/assets/binhduong-khu-cong-nghiep.webp', main, bodyClass: 'fire bd-page',
  extraCss: '<link rel="stylesheet" href="/binhduong/landing.css">',
  head: `<script type="application/ld+json">${jsonLd}</script>${breadcrumbJsonLd(route, 'Bảo hiểm tại Bình Dương')}${faqJsonLd(faqs)}`,
});
const output = new URL('../dist/binhduong/', import.meta.url);
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(new URL('index.html', output), html);
