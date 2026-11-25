// Sinh nhánh TP.HCM: node tools/gen-tphcm.mjs
import fs from 'node:fs';
import { SITE, ORG_ID, ZALO, esc, page } from './chrome.mjs';
import { districtGroups, productGroups, products } from './data/tphcm.mjs';

const root = '/tphcm/';
const catalog = root + 'sanpham/';
const city = 'Thành phố Hồ Chí Minh';
const hubTitle = 'Mua bảo hiểm PVI tại TP.HCM';
const catalogTitle = 'Sản phẩm bảo hiểm PVI tại TP.HCM';
const phone = 'tel:0938072236';
const units = JSON.parse(fs.readFileSync(new URL('./data/don-vi-thanh-vien-pvi.json', import.meta.url), 'utf8'));
const office = units.find(({ name }) => name === 'Bảo hiểm PVI Thành Đô');
if (!office) throw new Error('Thiếu dữ liệu danh bạ PVI Thành Đô');
const officePhone = office.phone.replace(/\D/g, '');
const areaPath = (slug) => '/tin-tuc/mua-bao-hiem-pvi-' + slug + '/';
const productPath = (product) => root + product.slug + '/';
const productTitle = ({ name }) => name + ' tại TP.HCM';
const heroName = 'tphcm/bitexco-song-sai-gon';
const heroAlt = 'Tháp Bitexco nổi bật trên đường chân trời bên sông Sài Gòn';
const officePhoto = 'tru-so-pvi-thanh-do';
const css = '<link rel="stylesheet" href="/binhduong/landing.css"><link rel="stylesheet" href="/binhduong/product-detail.css"><link rel="stylesheet" href="/tphcm/local.css">';

const homeCrumb = ['Trang chủ', '/'];
const cityCrumb = ['Bảo hiểm tại TP.HCM', root];
const catalogCrumb = ['Sản phẩm tại TP.HCM', catalog];
const json = (value) => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', ...value }).replace(/</g, '\\u003c')}</script>`;
const itemList = (entries) => ({
  '@type': 'ItemList',
  numberOfItems: entries.length,
  itemListElement: entries.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, url: SITE + path })),
});
const crumbNav = (trail) => `<nav class="bd-crumb" aria-label="Đường dẫn">${trail.map(([name, path], i) => i === trail.length - 1
  ? `<span aria-current="page">${esc(name)}</span>`
  : `<a href="${path}">${esc(name)}</a><span aria-hidden="true">/</span>`).join('')}</nav>`;

function write({ path, title, description, image, imageAlt, main, trail, type = 'WebPage', structured = {} }) {
  const imageMeta = `<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(imageAlt)}"><meta name="twitter:image" content="${SITE + image}"><meta name="twitter:image:alt" content="${esc(imageAlt)}">`;
  const head = imageMeta + json({
    '@type': type, '@id': SITE + path + '#webpage', name: title, url: SITE + path, description,
    publisher: { '@id': ORG_ID }, inLanguage: 'vi-VN',
    about: { '@type': 'AdministrativeArea', name: city },
    primaryImageOfPage: { '@type': 'ImageObject', contentUrl: SITE + image },
    ...structured,
  }) + json({
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + p })),
  });
  const html = page({ path, title, description, image, head, main: main.replace(/^[\t ]+$/gm, ''), bodyClass: 'fire', extraCss: css });
  const output = new URL('../dist' + path, import.meta.url);
  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(new URL('index.html', output), html);
}

function photo(base, alt, height, eager = false, sizes = '(max-width:800px) 92vw, 550px') {
  const src = '/assets/' + base;
  return `<img src="${src}.webp" srcset="${src}-480.webp 480w, ${src}-800.webp 800w, ${src}.webp 1200w" sizes="${sizes}" width="1200" height="${height}" decoding="async" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} alt="${esc(alt)}">`;
}

function button(href, label, secondary = false) {
  return `<a class="bd-button${secondary ? ' bd-secondary' : ''}" href="${esc(href)}">${esc(label)}</a>`;
}

function hero(trail, heading, intro, buttons, image = '') {
  return `<section class="bd-hero"><div class="bd-wrap${image ? ' bd-hero-grid' : ''}">
    <div class="bd-intro">${crumbNav(trail)}<h1>${esc(heading)}</h1><p>${esc(intro)}</p>
    <div class="bd-actions">${buttons}</div></div>
    ${image}
  </div></section>`;
}

function toc(entries) {
  return `<nav aria-label="Mục lục" class="bd-detail-toc"><details open><summary>Mục lục</summary><ol>${entries.map(([id, title]) => `<li><a href="#${id}">${esc(title)}</a></li>`).join('')}</ol></details></nav>`;
}

function officeSection() {
  return `<section class="bd-section bd-detail-location" aria-labelledby="dia-chi-pvi">
    <h2 id="dia-chi-pvi">Địa chỉ PVI Thành Đô tại TP.HCM</h2>
    <address>${esc(office.address)}</address>
    <p>Điện thoại văn phòng <a class="bd-link" href="tel:${officePhone}">${esc(office.phone)}</a>. Nên gọi trước khi đến để hỏi đúng đầu mối.</p>
    <a class="bd-link" href="#lien-he">Xem bản đồ văn phòng ở chân trang</a>
  </section>`;
}

function quote() {
  return `<section class="bd-section bd-quote" aria-labelledby="nhan-bao-phi">
    <div><h2 id="nhan-bao-phi">Nhận báo phí từ PVI Thành Đô</h2><p>Cho biết loại bảo hiểm, khu vực, đối tượng và ngày cần hiệu lực. Tư vấn viên sẽ hướng dẫn hồ sơ cần gửi.</p></div>
    <div class="bd-actions bd-quote-actions">${button(phone, 'Gọi 0938 072 236')}${button(ZALO, 'Nhắn Zalo', true)}</div>
  </section>`;
}

function faq(entries) {
  return `<section class="bd-section bd-faq" aria-labelledby="cau-hoi"><h2 id="cau-hoi">Câu hỏi thường gặp</h2>
    ${entries.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}
  </section>`;
}

function productList() {
  return `<div class="hcm-product-groups">${productGroups.map(([group, label]) => `<section class="bd-group" aria-labelledby="${group}">
    <h3 id="${group}">${esc(label)}</h3>
    <ul>${products.filter((p) => p.group === group).map((p) => {
      const cover = p.photo;
      return `<li class="bd-product"><div class="bd-product-photo">${photo(cover.base, cover.alt, 630, false, '(max-width:620px) 92vw, (max-width:980px) 45vw, 30vw')}</div>
      <div class="bd-product-copy"><h4><a href="${productPath(p)}" class="bd-product-title">${esc(productTitle(p))}</a></h4>
      <p>${esc(p.intro)}</p></div></li>`;
    }).join('')}</ul>
  </section>`).join('')}</div>`;
}

const districtEntries = districtGroups.flatMap(({ areas }) => areas.map(([name, slug]) => [name, areaPath(slug)]));
const productEntries = products.map((p) => [productTitle(p), productPath(p)]);
const districtSection = `<section class="bd-section" aria-labelledby="quan-huyen">
  <h2 id="quan-huyen">Mua bảo hiểm PVI theo quận, huyện cũ</h2>
  <p class="bd-summary">Chọn khu vực theo tên quen dùng trên giấy tờ. Các tên dưới đây chỉ địa bàn TP.HCM trước đợt sắp xếp năm 2025.</p>
  <p class="bd-summary">Nếu ở khu vực Quận 2, Quận 9 hoặc Thủ Đức cũ, bạn có thể đến điểm mua tại 37 Đường số 2, phường An Khánh. Xem ảnh mặt tiền trong mục Thủ Đức bên dưới và gọi 0938 072 236 để hẹn trước khi đến.</p>
  <div class="hcm-districts">${districtGroups.map(({ title, areas, note }) => `<section class="hcm-district-group"><h3>${esc(title)}</h3>
    ${note ? `<p>${esc(note)}</p>` : ''}
    <ul>${areas.map(([name, slug]) => `<li><a href="${areaPath(slug)}">${esc(name)}</a></li>`).join('')}</ul>
  </section>`).join('')}</div>
</section>`;
const heroAddressAlt = 'Tòa nhà 194 Golden Building trên đường Điện Biên Phủ, nơi đặt văn phòng PVI Thành Đô';
const hubTrail = [homeCrumb, cityCrumb];
const catalogTrail = [homeCrumb, cityCrumb, catalogCrumb];
const description = 'Mua bảo hiểm PVI tại TP.HCM. Xem cách tra phí ô tô, cháy nổ, nhà xưởng, tai nạn và sức khỏe. Tìm hướng dẫn theo quận, huyện cũ và liên hệ PVI Thành Đô.';
write({
  path: root, title: hubTitle + ' | Báo phí và địa chỉ liên hệ', description,
  image: '/assets/' + heroName + '.webp', imageAlt: heroAlt, trail: hubTrail, type: 'CollectionPage',
  structured: { mainEntity: itemList(districtEntries), hasPart: { '@id': SITE + catalog + '#webpage' } },
  main: `<div class="bd bd-product-page hcm">
  ${hero(hubTrail, hubTitle, 'Bạn có thể mua bảo hiểm PVI tại TP.HCM qua PVI Thành Đô tại 473 Điện Biên Phủ hoặc gửi thông tin từ xa để hỏi phí. Chọn sản phẩm bên dưới để biết giấy tờ cần chuẩn bị và cách kiểm tra hợp đồng trước khi thanh toán.', button(catalog, 'Xem sản phẩm bảo hiểm') + button('#nhan-bao-phi', 'Nhận báo phí', true), `<figure class="bd-hero-photo">${photo(heroName, heroAlt, 630, true)}<figcaption>Ảnh minh họa tháp Bitexco và bờ sông Sài Gòn.</figcaption></figure>`)}
  <div class="bd-wrap bd-body">
    ${toc([['bieu-phi', 'Cách tra phí theo nhu cầu'], ['san-pham', 'Sản phẩm bảo hiểm'], ['cach-mua', 'Ba bước mua bảo hiểm'], ['dai-ly', 'Kiểm tra khi mua qua đại lý'], ['nhan-bao-phi', 'Nhận báo phí'], ['su-co', 'Khi có sự cố'], ['dia-chi-pvi', 'Địa chỉ PVI Thành Đô'], ['quan-huyen', 'Hướng dẫn theo quận, huyện cũ'], ['cau-hoi', 'Câu hỏi thường gặp']])}
    <section class="bd-section bd-guide" aria-labelledby="bieu-phi">
      <h2 id="bieu-phi">Tra phí bảo hiểm PVI tại TP.HCM thế nào?</h2>
      <p>Để tra phí, hãy bắt đầu từ thứ cần bảo hiểm. Xe gia đình, xe kinh doanh, cửa hàng, nhà xưởng và nhóm nhân viên cần những thông tin khác nhau. Bảng dưới đây giúp bạn biết cần lấy dữ liệu nào trước khi hỏi phí.</p>
      <div class="bd-table-scroll">
        <table class="bd-table">
          <caption>Thông tin cần chuẩn bị để tra phí</caption>
          <thead><tr><th scope="col">Nhu cầu</th><th scope="col">Thông tin cần có</th></tr></thead>
          <tbody>
            <tr><th scope="row">Ô tô</th><td>Xem số chỗ hoặc tải trọng trên đăng ký, mục đích sử dụng và ngày hết hạn bảo hiểm. Nếu hỏi thêm bảo hiểm vật chất, gửi giá trị xe và nhu cầu sửa chữa tại gara.</td></tr>
            <tr><th scope="row">Cửa hàng, kho và nhà xưởng</th><td>Ghi địa chỉ, công năng và giá trị nhà, máy móc, hàng tồn theo từng địa điểm. Với cháy nổ bắt buộc, kiểm tra nhóm cơ sở trước khi dùng công cụ tính phí.</td></tr>
            <tr><th scope="row">Công trình hoặc lô hàng</th><td>Với công trình, gửi dự toán, tiến độ và mốc chạy thử nếu có. Với lô hàng, ghi loại hàng, giá trị, cách đóng gói và hành trình từ điểm nhận đến điểm giao.</td></tr>
            <tr><th scope="row">Nhân viên, sức khỏe và du lịch</th><td>Cho biết số người, nhóm công việc hoặc độ tuổi tùy sản phẩm. Với chuyến đi, chuẩn bị điểm đến, ngày khởi hành, ngày về và yêu cầu của hồ sơ visa nếu có.</td></tr>
          </tbody>
        </table>
      </div>
      <p>Phí từ công cụ tra cứu là mức tham khảo theo thông tin đã nhập. Khi nhận báo phí, hãy kiểm tra thời hạn, số tiền bảo hiểm, thuế nếu áp dụng và phần tổn thất bạn tự chịu theo điều khoản, nếu có.</p>
    </section>
    <section class="bd-section" aria-labelledby="san-pham"><h2 id="san-pham">Chọn sản phẩm bảo hiểm PVI tại TP.HCM</h2>
      <p class="bd-summary">Mua cho xe gia đình, hãy xem riêng trách nhiệm dân sự bắt buộc và bảo hiểm thiệt hại của chính chiếc xe. Nếu mua cho doanh nghiệp, bắt đầu từ tài sản, công trình hoặc nhóm người cần bảo hiểm. Mỗi sản phẩm bên dưới có hướng dẫn riêng về hồ sơ và cách nhận báo phí.</p>
      ${productList()}
      <div class="bd-actions">${button(catalog, 'Xem danh mục sản phẩm', true)}</div>
    </section>
    <section class="bd-section bd-guide" aria-labelledby="cach-mua"><h2 id="cach-mua">Ba bước mua bảo hiểm PVI tại TP.HCM</h2>
      <ol>
        <li><strong>Gửi nhu cầu và thông tin để báo phí.</strong> Cho biết bạn muốn mua loại bảo hiểm nào, khu vực, đối tượng cần bảo hiểm và ngày cần hiệu lực. Nếu tái tục, gửi thêm ngày giờ hết hạn trên giấy chứng nhận hiện tại. Với tài sản, dùng địa chỉ nơi đặt tài sản để tư vấn viên dễ đối chiếu hồ sơ.</li>
        <li><strong>Đọc báo phí và hỏi phần còn thiếu.</strong> So phạm vi, số tiền bảo hiểm, thời hạn và mức khấu trừ, tức phần tổn thất bạn tự chịu theo điều khoản nếu có. Ví dụ, nếu hai báo phí vật chất xe chênh nhau, hãy đối chiếu điều kiện sửa ở gara hãng trước khi chọn theo giá.</li>
        <li><strong>Kiểm tra thông tin trước khi thanh toán.</strong> Đối chiếu tên người được bảo hiểm, thông tin xe hoặc tài sản, ngày giờ hiệu lực và đơn vị phát hành. Sau khi nhận giấy chứng nhận hoặc hợp đồng, lưu cùng chứng từ thanh toán và số liên hệ để dùng khi cần sửa thông tin hoặc báo sự cố.</li>
      </ol>
    </section>
    <section class="bd-section bd-guide" aria-labelledby="dai-ly">
      <h2 id="dai-ly">Mua qua đại lý tại TP.HCM cần kiểm tra gì?</h2>
      <p>Khi nhận báo phí từ đại lý, nơi bán xe hoặc người giới thiệu, hãy hỏi công ty nào phát hành hợp đồng, ai sẽ cấp chứng từ và liên hệ ai nếu cần sửa thông tin. Đối chiếu tên người được bảo hiểm và thông tin thanh toán với hồ sơ đã gửi. Nếu tái tục qua một đầu mối khác, kiểm tra ngày hiệu lực của đơn mới để tránh khoảng thời gian gián đoạn.</p>
    </section>
    ${quote()}
    <section class="bd-section bd-guide" aria-labelledby="su-co">
      <h2 id="su-co">Liên hệ ai khi có sự cố?</h2>
      <p>Ưu tiên an toàn, báo cho cơ quan có thẩm quyền nếu tình huống cần và gọi tổng đài bồi thường PVI <a class="bd-link" href="tel:1900545458">1900 54 54 58</a>. Giữ giấy chứng nhận và ghi lại thời điểm, địa điểm, tình trạng tổn thất nếu việc đó an toàn. Hỏi đầu mối xử lý trước khi sửa chữa hoặc di chuyển tài sản, trừ khi cần để bảo đảm an toàn.</p>
    </section>
    ${officeSection()}
    <figure class="hcm-office-photo">${photo(officePhoto, heroAddressAlt, 900)}<figcaption>Trụ sở PVI Thành Đô tại 473 Điện Biên Phủ.</figcaption></figure>
    ${districtSection}
    ${faq([
      ['Mua bảo hiểm PVI ở đâu tại TP.HCM?', 'Bạn có thể liên hệ PVI Thành Đô tại 473 Điện Biên Phủ, phường Thạnh Mỹ Tây hoặc gọi 0938 072 236 để được hướng dẫn từ xa.'],
      ['Ở TP.HCM có thể gửi thông tin mua bảo hiểm PVI từ xa không?', 'Có. Bạn có thể nhắn Zalo hoặc gọi 0938 072 236, nêu sản phẩm và ngày cần hiệu lực để PVI Thành Đô hướng dẫn. Với hồ sơ cần khảo sát xe hoặc tài sản, tư vấn viên sẽ trao đổi bước tiếp theo.'],
      ['Phí tra trên trang có phải phí sẽ thanh toán không?', 'Công cụ cho mức tham khảo theo dữ liệu bạn nhập. Khi nhận báo phí, đối chiếu thông tin đối tượng bảo hiểm, thời hạn, phạm vi và điều khoản để biết mức phí áp dụng cho hồ sơ.'],
      ['Giấy tờ còn ghi tên quận, huyện cũ thì khai thế nào?', 'Gửi thông tin đúng như trên giấy tờ đang có. Nếu đã có địa chỉ mới, cung cấp cả hai để tư vấn viên đối chiếu trước khi phát hành.'],
      ['Tìm bài Quận 2 hoặc Quận 9 ở đâu?', 'Chọn hướng dẫn Thủ Đức trong mục quận, huyện cũ. Bài đó gồm địa bàn Quận 2, Quận 9 và quận Thủ Đức trước đây.'],
    ])}
    <p class="bd-source">Địa chỉ đối chiếu theo danh bạ Tổng công ty Bảo hiểm PVI. Tên địa bàn tham chiếu Nghị quyết 1685/NQ-UBTVQH15 về sắp xếp đơn vị hành chính cấp xã của TP.HCM năm 2025.</p>
  </div>
</div>`,
});

const catalogDescription = 'So sánh 10 nghiệp vụ bảo hiểm PVI tại TP.HCM. Chọn ô tô, tài sản, công trình, hàng hóa, tai nạn, sức khỏe hoặc du lịch để xem hồ sơ và cách báo phí.';
write({
  path: catalog, title: catalogTitle + ' | Tra phí và hồ sơ', description: catalogDescription,
  image: '/assets/' + heroName + '.webp', imageAlt: heroAlt, trail: catalogTrail, type: 'CollectionPage',
  structured: { mainEntity: itemList(productEntries), isPartOf: { '@id': SITE + root + '#webpage' } },
  main: `<div class="bd bd-product-page hcm">
  ${hero(catalogTrail, catalogTitle, catalogDescription, button('#nhan-bao-phi', 'Nhận báo phí') + button(root + '#quan-huyen', 'Xem theo quận, huyện', true))}
  <div class="bd-wrap bd-body">
    ${toc([...productGroups, ['dia-chi-pvi', 'Địa chỉ văn phòng'], ['nhan-bao-phi', 'Nhận báo phí']])}
    <section class="bd-section" aria-labelledby="danh-muc"><h2 id="danh-muc">Danh mục bảo hiểm theo nhu cầu</h2>${productList()}</section>
    ${officeSection()}${quote()}
  </div>
</div>`,
});

for (const product of products) {
  const path = productPath(product);
  const heading = productTitle(product);
  const trail = [homeCrumb, cityCrumb, catalogCrumb, [heading, path]];
  const cover = product.photo;
  const originalHref = product.original + (product.action?.[1] || '');
  const primary = product.buy ? button(product.buy, 'Mua ngay') : button(phone, 'Liên hệ tư vấn ngay');
  const secondary = product.action ? button(originalHref, product.action[0], true) : button('#nhan-bao-phi', 'Xem cách nhận báo phí', true);
  const [exampleTitle, ...exampleParagraphs] = product.example;
  const links = [
    ...product.details.map(([id, label]) => [id, label]),
    ['tinh-huong', exampleTitle],
    ['ho-so', 'Hồ sơ cần chuẩn bị'], ['cau-hoi', 'Câu hỏi thường gặp'],
    ['dia-chi-pvi', 'Địa chỉ văn phòng'], ['nhan-bao-phi', 'Nhận báo phí'],
  ];
  write({
    path, title: heading + ' | Hồ sơ và báo phí', description: product.intro,
    image: '/assets/' + cover.base + '.webp', imageAlt: cover.alt, trail,
    structured: {
      isPartOf: { '@id': SITE + catalog + '#webpage' },
      mainEntity: { '@type': 'Service', name: heading, url: SITE + path, description: product.intro,
        provider: { '@id': ORG_ID }, areaServed: { '@type': 'AdministrativeArea', name: city } },
    },
    main: `<div class="bd bd-product-page hcm">
    ${hero(trail, heading, product.intro, primary + secondary, `<figure class="hcm-cover">${photo(cover.base, cover.alt, 630, true)}<figcaption>Ảnh minh họa bối cảnh ${esc(cover.place)}.</figcaption></figure>`)}
    <div class="bd-wrap bd-body">
      ${toc(links)}
      ${product.details.map(([id, label, text]) => `<section class="bd-section bd-guide" aria-labelledby="${id}"><h2 id="${id}">${esc(label)}</h2><p>${esc(text)}</p>
        ${id === 'pham-vi' && !product.action ? `<div class="bd-actions">${button(product.original, product.originalLabel || 'Xem sản phẩm PVI và điều kiện', true)}</div>` : ''}
        ${id === 'tra-phi' ? `<div class="bd-actions">${button('#nhan-bao-phi', 'Nhận báo phí theo hồ sơ')}</div>` : ''}
      </section>`).join('')}
      <section class="bd-section bd-guide" aria-labelledby="tinh-huong">
        <h2 id="tinh-huong">${esc(exampleTitle)}</h2>
        ${exampleParagraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}
      </section>
      <section class="bd-section bd-guide" aria-labelledby="ho-so"><h2 id="ho-so">Hồ sơ cần chuẩn bị</h2><ul>${product.docs.map((doc) => `<li>${esc(doc)}</li>`).join('')}</ul>
        <div class="bd-actions">${button(ZALO, 'Nhắn Zalo hỏi về hồ sơ')}</div>
      </section>
      ${faq([product.faq])}${officeSection()}${quote()}
      <nav class="bd-section bd-guide bd-sibling-products" aria-labelledby="san-pham-khac">
        <h2 id="san-pham-khac">Sản phẩm khác tại TP.HCM</h2>
        <ul>${products.filter((p) => p !== product).map((p) => `<li><a class="bd-link" href="${productPath(p)}">${esc(productTitle(p))}</a></li>`).join('')}</ul>
        <p><a class="bd-link" href="${catalog}">Xem danh mục</a> · <a class="bd-link" href="${root}">Hướng dẫn mua bảo hiểm PVI tại TP.HCM</a></p>
      </nav>
    </div>
  </div>`,
  });
}
console.log('TP.HCM: 1 trang tổng, 1 danh mục, ' + products.length + ' sản phẩm và ' + districtEntries.length + ' liên kết khu vực.');
