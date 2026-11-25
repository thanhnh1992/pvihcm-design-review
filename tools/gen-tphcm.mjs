// Sinh nhánh TP.HCM: node tools/gen-tphcm.mjs
import fs from 'node:fs';
import { SITE, ORG_ID, ZALO, esc, page } from './chrome.mjs';
import { productCovers } from './data/product-covers.mjs';
import { districtGroups, productGroups, products } from './data/tphcm.mjs';

const root = '/tphcm/';
const catalog = root + 'sanpham/';
const city = 'Thành phố Hồ Chí Minh';
const hubTitle = 'Mua bảo hiểm PVI tại TPHCM';
const catalogTitle = 'Sản phẩm bảo hiểm PVI tại TP.HCM';
const phone = 'tel:0938072236';
const units = JSON.parse(fs.readFileSync(new URL('./data/don-vi-thanh-vien-pvi.json', import.meta.url), 'utf8'));
const office = units.find(({ name }) => name === 'Bảo hiểm PVI Thành Đô');
if (!office) throw new Error('Thiếu dữ liệu danh bạ PVI Thành Đô');
const officePhone = office.phone.replace(/\D/g, '');
const areaPath = (slug) => '/tin-tuc/mua-bao-hiem-pvi-' + slug + '/';
const productPath = (product) => root + product.slug + '/';
const productTitle = ({ name }) => name + ' tại TP.HCM';
const heroName = 'tru-so-pvi-thanh-do';
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

function write({ path, title, description, image, main, trail, type = 'WebPage', structured = {} }) {
  const head = json({
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

function photo(base, alt, height, eager = false) {
  const src = '/assets/' + base;
  return `<img src="${src}.webp" srcset="${src}-480.webp 480w, ${src}-800.webp 800w, ${src}.webp 1200w" sizes="(max-width:800px) 92vw, 550px" width="1200" height="${height}" decoding="async" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} alt="${esc(alt)}">`;
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
    <ul>${products.filter((p) => p.group === group).map((p) => `<li class="hcm-product-card"><h4><a href="${productPath(p)}" class="bd-link">${esc(productTitle(p))}</a></h4><p>${esc(p.intro)}</p><a href="${productPath(p)}" class="bd-link" aria-label="Xem ${esc(productTitle(p))}">Xem hồ sơ và cách tra phí →</a></li>`).join('')}</ul>
  </section>`).join('')}</div>`;
}

const districtEntries = districtGroups.flatMap(({ areas }) => areas.map(([name, slug]) => [name, areaPath(slug)]));
const productEntries = products.map((p) => [productTitle(p), productPath(p)]);
const districtSection = `<section class="bd-section" aria-labelledby="quan-huyen">
  <h2 id="quan-huyen">Mua bảo hiểm PVI theo quận, huyện cũ</h2>
  <p class="bd-summary">Chọn khu vực theo tên quen dùng trên giấy tờ. Các tên dưới đây chỉ địa bàn TP.HCM trước đợt sắp xếp năm 2025.</p>
  <div class="hcm-districts">${districtGroups.map(({ title, areas, note }) => `<section class="hcm-district-group"><h3>${esc(title)}</h3>
    ${note ? `<p>${esc(note)}</p>` : ''}
    <ul>${areas.map(([name, slug]) => `<li><a href="${areaPath(slug)}">${esc(name)}</a></li>`).join('')}</ul>
  </section>`).join('')}</div>
</section>`;
const heroAddressAlt = 'Tòa nhà 194 Golden Building trên đường Điện Biên Phủ, nơi đặt văn phòng PVI Thành Đô';
const hubTrail = [homeCrumb, cityCrumb];
const catalogTrail = [homeCrumb, cityCrumb, catalogCrumb];
const description = 'Mua bảo hiểm PVI tại TPHCM. Xem sản phẩm ô tô, cháy nổ, nhà xưởng, tai nạn và sức khỏe. Chọn quận, huyện cũ hoặc liên hệ PVI Thành Đô để được báo phí.';
write({
  path: root, title: hubTitle + ' | Báo phí và địa chỉ liên hệ', description,
  image: '/assets/' + heroName + '.webp', trail: hubTrail, type: 'CollectionPage',
  structured: { mainEntity: itemList(districtEntries), hasPart: { '@id': SITE + catalog + '#webpage' } },
  main: `<div class="bd bd-product-page hcm">
  ${hero(hubTrail, 'Mua bảo hiểm PVI tại TP.HCM', 'Cần bảo hiểm ô tô, nhà xưởng hay người lao động? Bạn có thể tra phí theo sản phẩm, chọn hướng dẫn theo quận huyện cũ hoặc liên hệ PVI Thành Đô để được kiểm tra hồ sơ và báo phí.', button('#nhan-bao-phi', 'Nhận báo phí') + button('#quan-huyen', 'Chọn quận, huyện cũ', true), `<figure class="bd-hero-photo">${photo(heroName, heroAddressAlt, 900, true)}<figcaption>PVI Thành Đô, 473 Điện Biên Phủ, phường Thạnh Mỹ Tây.</figcaption></figure>`)}
  <div class="bd-wrap bd-body">
    ${toc([['quan-huyen', 'Tra theo quận, huyện cũ'], ['san-pham', 'Chọn sản phẩm bảo hiểm'], ['cach-mua', 'Cách mua và nhận báo phí'], ['dia-chi-pvi', 'Địa chỉ văn phòng'], ['cau-hoi', 'Câu hỏi thường gặp']])}
    ${districtSection}
    <section class="bd-section" aria-labelledby="san-pham"><h2 id="san-pham">Chọn sản phẩm bảo hiểm PVI tại TP.HCM</h2>
      <p class="bd-summary">Chọn nghiệp vụ để xem hồ sơ, công cụ tra phí và cách liên hệ.</p>
      ${productList()}
      <div class="bd-actions">${button(catalog, 'Xem danh mục sản phẩm', true)}</div>
    </section>
    <section class="bd-section bd-guide" aria-labelledby="cach-mua"><h2 id="cach-mua">Cách mua bảo hiểm PVI tại TP.HCM</h2>
      <ol><li><strong>Chọn nghiệp vụ.</strong> Ghi rõ xe, tài sản, công trình hoặc nhóm người cần bảo hiểm và ngày cần hiệu lực.</li><li><strong>Nhận và kiểm tra báo phí.</strong> Đọc phạm vi, điều kiện, phí và mức tự chịu nếu có. Hỏi lại khi thông tin chưa khớp giấy tờ.</li><li><strong>Xác nhận trước khi phát hành.</strong> So thông tin chủ xe hoặc doanh nghiệp, địa chỉ tài sản, thời hạn và đầu mối cấp.</li></ol>
      <div class="bd-actions">${button('#nhan-bao-phi', 'Liên hệ tư vấn ngay')}</div>
    </section>
    ${officeSection()}
    ${quote()}
    ${faq([
      ['Mua bảo hiểm PVI ở đâu tại TP.HCM?', 'Bạn có thể liên hệ PVI Thành Đô tại 473 Điện Biên Phủ, phường Thạnh Mỹ Tây hoặc gọi 0938 072 236 để được hướng dẫn từ xa.'],
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
  image: '/assets/' + heroName + '.webp', trail: catalogTrail, type: 'CollectionPage',
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
  const cover = productCovers[product.original];
  if (!cover) throw new Error('Thiếu ảnh sản phẩm ' + product.original);
  const originalHref = product.original + (product.action?.[1] || '');
  const primary = product.buy ? button(product.buy, 'Mua ngay') : button(phone, 'Liên hệ tư vấn ngay');
  const secondary = product.action ? button(originalHref, product.action[0], true) : button('#nhan-bao-phi', 'Xem cách nhận báo phí', true);
  const links = [
    ...product.details.map(([id, label]) => [id, label]),
    ['ho-so', 'Hồ sơ cần chuẩn bị'], ['cau-hoi', 'Câu hỏi thường gặp'],
    ['dia-chi-pvi', 'Địa chỉ văn phòng'], ['nhan-bao-phi', 'Nhận báo phí'],
  ];
  write({
    path, title: heading + ' | Hồ sơ và báo phí', description: product.intro,
    image: '/assets/' + cover.base + '.jpg', trail,
    structured: {
      isPartOf: { '@id': SITE + catalog + '#webpage' },
      mainEntity: { '@type': 'Service', name: heading, url: SITE + path, description: product.intro,
        provider: { '@id': ORG_ID }, areaServed: { '@type': 'AdministrativeArea', name: city } },
    },
    main: `<div class="bd bd-product-page hcm">
    ${hero(trail, heading, product.intro, primary + secondary, `<figure class="hcm-cover">${photo(cover.base, cover.alt, 630, true)}<figcaption>Ảnh minh họa chủ đề bảo hiểm.</figcaption></figure>`)}
    <div class="bd-wrap bd-body">
      ${toc(links)}
      ${product.details.map(([id, label, text]) => `<section class="bd-section bd-guide" aria-labelledby="${id}"><h2 id="${id}">${esc(label)}</h2><p>${esc(text)}</p>
        ${id === 'pham-vi' ? `<div class="bd-actions">${button(product.original, product.originalLabel || 'Xem sản phẩm PVI và điều kiện', true)}</div>` : ''}
        ${id === 'tra-phi' ? `<div class="bd-actions">${button('#nhan-bao-phi', 'Nhận báo phí theo hồ sơ')}</div>` : ''}
      </section>`).join('')}
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
