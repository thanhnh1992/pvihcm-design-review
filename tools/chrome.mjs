import { localityForPath } from './locality-footer.mjs';
import { nofollowExternal } from './link-out.mjs';
import { privacyLinks, privacyUi, protectExternalEmbeds } from './privacy-ui.mjs';
import { productCovers } from './data/product-covers.mjs';

// Khung dùng chung cho mọi trang: head SEO, header có menu, chân trang.
export const SITE = 'https://pvihcm.com';
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Luật chống giọng máy: không dùng gạch dài. Chỉ đổi dấu câu, không đổi nội dung.
// Chuẩn hóa chữ hiển thị: bỏ gạch ngang dài, đưa khoảng số về dấu nối,
// thống nhất kiểu bỏ dấu tiếng Việt (hoá -> hóa), sửa lỗi lặp từ của dữ liệu nguồn.
const SPELL = [[/hoá/g, 'hóa'], [/Hoá/g, 'Hóa'], [/thoả/g, 'thỏa'], [/Thoả/g, 'Thỏa'], [/hoạ/g, 'họa'], [/Hoạ/g, 'Họa'],
  [/tuý/g, 'túy'], [/huỷ/g, 'hủy'], [/khoẻ/g, 'khỏe'], [/toà/g, 'tòa'], [/hoà/g, 'hòa'], [/xoá/g, 'xóa'],
  [/luỹ/g, 'lũy'], [/thuỷ/g, 'thủy'], [/nguỵ/g, 'ngụy']];
export const clean = (s) => {
  let t = String(s).replace(/\s+—\s+/g, ', ').replace(/—/g, ', ')
    .replace(/(\d)\s*–\s*(\d)/g, '$1-$2').replace(/–/g, '-')
    .replace(/trong trong/g, 'trong');
  // Chỉ đổi khi là trọn một chữ: "hoà" thành "hòa" nhưng giữ "hoàn", "toàn", "hoạch", "hoạt".
  for (const [re, to] of SPELL) t = t.replace(new RegExp(re.source + '(?!\\p{L})', 'gu'), to);
  return t;
};
export const t = (s) => esc(clean(s));
// srcset cho ảnh trong bài: chỉ khai bản -480/-800 nhỏ hơn bản gốc (rộng w px), để điện thoại tải ảnh nhẹ.
// Ảnh phải có sẵn /assets/<tên>-480.webp và -800.webp (tools/srcset.mjs, AGENTS.md mục Hiệu năng).
// Ảnh đã thay nội dung nhưng giữ tên file: gắn ?v= để vượt cache 30 ngày của /assets/ (vercel.json).
export const ASSET_VER = { 'bat-buoc': '20261110', 'tai-nan': '20261110', 'chay-no': '20261110', 'hang-hoa': '20261110', 'hero-cong-trinh': '20261110', 'hero-suc-khoe': '20261110', 'hero-du-lich': '20261110', 'tu-van-xe-o-to': '20261110', 'tn-bao-hiem-tai-nan-la-gi': '20261116', 'tn-bao-hiem-tai-nan-bao-nhieu-tien': '20261116', 'tn-te-xe-may-co-duoc-bao-hiem-tai-nan-chi-tra': '20261116' };
export const av = (name) => (ASSET_VER[name] ? `?v=${ASSET_VER[name]}` : '');
export const articleSrcset = (base, w) => {
  const parts = [480, 800].filter((x) => x < w).map((x) => `/assets/${base}-${x}.webp${av(base)} ${x}w`);
  return parts.length ? ` srcset="${parts.join(', ')}, /assets/${base}.webp${av(base)} ${w}w" sizes="(max-width:820px) 92vw, 720px"` : '';
};

export const NAV = [
  ['/gioi-thieu/', 'Giới thiệu'],
  // Các trang sản phẩm gộp vào một mục, dẫn tới trang danh mục /san-pham/ (chủ site yêu cầu 28/10/2026).
  ['/san-pham/', 'Sản phẩm'],
  // Khu Kiến thức theo sản phẩm (chủ site yêu cầu 16/11/2026).
  ['/kien-thuc/', 'Kiến thức'],
  ['/tin-tuc/', 'Tin tức'],
  ['/#boi-thuong', 'Bồi thường'],
];

const PHONE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>';
// Nút tìm kiếm toàn site: app.js nạp dist/search.js khi bấm (dữ liệu dist/search-index.json, tools/gen-search.mjs).
const SEARCH_BTN = '<button class="search-btn" type="button" aria-haspopup="dialog" aria-label="Tìm kiếm trên website"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><span class="lbl">Tìm kiếm</span></button>';
const MENU_SVG = '<svg class="open-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg><svg class="close-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

export function header(path) {
  const links = NAV.map(([href, label]) => `<a href="${href}"${href === path ? ' aria-current="page"' : (href === '/san-pham/' || href === '/kien-thuc/') && path.startsWith(href) ? ' aria-current="true"' : ''}>${label}</a>`).join('');
  return `<a class="skip" href="#main">Đến nội dung chính</a><header class="site-header"><a class="brand" href="/"><img src="/assets/pvi-logo.svg" width="132" height="48" alt="Bảo hiểm PVI"><span>Thành Đô</span></a><nav id="site-nav" class="site-nav" aria-label="Điều hướng chính">${links}</nav>${SEARCH_BTN}<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Mở menu">${MENU_SVG}<span class="lbl">Menu</span></button></header>`;
}

// Ô trụ sở ở cột đầu chân trang: ảnh tòa nhà chuyển động chậm, rê chuột hiện logo PVI (file gốc),
// bấm mở sơ đồ trang bằng popover gốc của trình duyệt (không cần thêm script).
const SITEMAP = [
  ['Về PVI Thành Đô', [['/', 'Trang chủ'], ['/gioi-thieu/', 'Giới thiệu đơn vị'], ['/#boi-thuong', 'Bồi thường'], ['/#lien-he', 'Liên hệ']]],
  ['Sản phẩm', [['/san-pham/', 'Tất cả sản phẩm'], ['/san-pham/bao-hiem-bat-buoc/', 'Bảo hiểm bắt buộc'], ['/san-pham/bao-hiem-tai-nan/', 'Bảo hiểm tai nạn'], ['/san-pham/chay-no-bat-buoc/', 'Cháy nổ bắt buộc'], ['/san-pham/hang-hoa-xuat-nhap-khau/', 'Hàng hóa xuất nhập khẩu']]],
  ['Tin tức', [['/tin-tuc/', 'Tất cả tin tức'], ['/tin-tuc/#tin-san-pham', 'Tin sản phẩm'], ['/tin-tuc/#phap-ly-moi', 'Pháp lý mới'], ['/tin-tuc/#tin-chung', 'Tin tức chung']]],
  ['Doanh nghiệp', [['/huong-dan/', 'Hướng dẫn cho HR'], ['/tai-nan-doanh-nghiep/', 'Tai nạn cho doanh nghiệp']]],
];
// Bản đồ trụ sở + huy hiệu Bộ Công Thương (ô bên phải khối Liên hệ tư vấn).
// Huy hiệu là tuyên bố đã thông báo website với Bộ Công Thương. Chủ site chốt 15/10/2026: hiện trước,
// làm thủ tục sau, giống baohiempvi-vn. Khi online.gov.vn cấp link xác thực thì điền BCT_URL để huy hiệu
// bấm được. Không tự bịa link hay số đăng ký.
const BCT_URL = '';
const MAP_QUERY = '194 Golden Building, 473 Điện Biên Phủ, Phường Thạnh Mỹ Tây, Thành phố Hồ Chí Minh';
function footerMap(query = MAP_QUERY, label = 'Bản đồ trụ sở PVI Thành Đô: 194 Golden Building, 473 Điện Biên Phủ, TP.HCM') {
  const badge = `<img src="/assets/bct-da-thong-bao.webp" width="180" height="55" alt="Đã thông báo Bộ Công Thương" loading="lazy" decoding="async">`;
  return `<div class="footer-map"><div class="footer-map-frame"><iframe src="https://www.google.com/maps?q=${encodeURIComponent(query)}&amp;hl=vi&amp;z=17&amp;output=embed" title="${esc(label)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>${BCT_URL ? `<a class="footer-bct" href="${BCT_URL}" target="_blank">${badge}</a>` : `<span class="footer-bct">${badge}</span>`}</div>`;
}

function footerHq() {
  const groups = SITEMAP.map(([title, links]) => `<div><strong>${title}</strong>${links.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')}</div>`).join('');
  return `<div class="footer-hq-wrap"><button type="button" class="footer-hq" popovertarget="so-do-site"><span class="footer-hq-media"><img src="/assets/tru-so-pvi-thanh-do-800.webp" srcset="/assets/tru-so-pvi-thanh-do-480.webp 480w, /assets/tru-so-pvi-thanh-do-800.webp 800w, /assets/tru-so-pvi-thanh-do.webp 1200w" sizes="(max-width:820px) 100vw, 340px" width="1200" height="900" alt="Tòa nhà 194 Golden Building, 473 Điện Biên Phủ, trụ sở Công ty Bảo hiểm PVI Thành Đô" loading="lazy" decoding="async"></span><span class="footer-hq-shine" aria-hidden="true"></span><span class="footer-hq-logo"><img src="/assets/pvi-logo.svg" width="132" height="48" alt=""><span>Thành Đô</span></span><span class="footer-hq-cap"><b>Trụ sở 194 Golden Building</b><span>Bấm để xem sơ đồ trang <i aria-hidden="true">&rarr;</i></span></span></button></div><div id="so-do-site" class="sitemap-pop" popover><div class="sitemap-head"><div><span class="footer-label">Sơ đồ trang</span><b>PVI Thành Đô</b></div><button type="button" class="sitemap-close" popovertarget="so-do-site" popovertargetaction="hide" aria-label="Đóng sơ đồ trang">&times;</button></div><nav class="sitemap-grid" aria-label="Sơ đồ trang">${groups}</nav><p class="sitemap-foot">Tư vấn <a href="tel:0938072236">0938 072 236</a> · Bồi thường <a href="tel:1900545458">1900 54 54 58</a></p></div>`;
}


const THANH_DO_NAME = 'Công ty Bảo hiểm PVI Thành Đô';
const PVI_PARENT = 'Tổng Công ty Bảo hiểm PVI';
const THANH_DO_LABEL = PVI_PARENT + ' - PVI Thành Đô';
const THANH_DO_STREET = 'Tầng 12A, Tòa nhà 194 Golden Building, số 473 Điện Biên Phủ';
const THANH_DO_WARD = 'Phường Thạnh Mỹ Tây';
const THANH_DO_CITY = 'Thành phố Hồ Chí Minh';
const THANH_DO_ENTITY = PVI_PARENT + ' - ' + THANH_DO_NAME + ', TP.HCM';
const THANH_DO_MST = '0105402531-041';
const THANH_DO_EMAIL = 'giadinhpvi@gmail.com';
// Dùng lại ở tools/danh-gia-sao.mjs (schema điểm Google Maps).
export const THANH_DO_ORG = { name: THANH_DO_NAME, alternateName: THANH_DO_ENTITY, taxID: THANH_DO_MST, email: THANH_DO_EMAIL, parent: PVI_PARENT, street: THANH_DO_STREET, ward: THANH_DO_WARD, city: THANH_DO_CITY };

function footerSiteOffice() {
  // Thông tin pháp nhân dạng danh sách (chủ site yêu cầu 21/11/2026): tên, MST, địa chỉ, SĐT, website, email.
  const address = `${THANH_DO_STREET}, ${THANH_DO_WARD}, ${THANH_DO_CITY}`;
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    '@id': ORG_ID,
    name: THANH_DO_NAME,
    alternateName: THANH_DO_ENTITY,
    taxID: THANH_DO_MST,
    telephone: '+84938072236',
    email: THANH_DO_EMAIL,
    url: SITE + '/',
    parentOrganization: { '@type': 'Organization', name: PVI_PARENT },
    address: {
      '@type': 'PostalAddress',
      streetAddress: THANH_DO_STREET,
      addressLocality: THANH_DO_WARD,
      addressRegion: THANH_DO_CITY,
      addressCountry: 'VN',
    },
  };
  const rows = [
    ['MST', esc(THANH_DO_MST)],
    ['Địa chỉ', `<address>${esc(address)}</address>`],
    ['SĐT', '<a href="tel:0938072236">0938 072 236</a>'],
    ['Website', '<a href="/">pvihcm.com</a>'],
    ['Email', `<a href="mailto:${THANH_DO_EMAIL}">${esc(THANH_DO_EMAIL)}</a>`],
  ];
  return `<section class="footer-site-office" aria-labelledby="footer-site-office-title"><h2 id="footer-site-office-title">${esc(THANH_DO_ENTITY)}</h2><dl class="footer-entity">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl><a class="footer-entity-more" href="/gioi-thieu/">Giới thiệu PVI Thành Đô</a><script type="application/ld+json">${JSON.stringify(organization).replace(/</g, '\\u003c')}</script></section>`;
}

// Địa chỉ địa phương tách rõ với đơn vị vận hành website Thành Đô.
function localityFooter({ name, unit, point }) {
  let html = footer();
  html = html.replace('class="site-footer"', 'class="site-footer site-footer-local"');
  html = html.replace(footerHq(), '');
  const identity = '<div class="footer-identity"><strong class="footer-label">PVI · ' + esc(name) + '</strong><a class="brand" href="/"><img src="/assets/pvi-logo.svg" width="132" height="48" alt="Bảo hiểm PVI"><span>' + esc(name) + '</span></a><p><strong>' + esc(point ? 'Điểm mua bảo hiểm PVI Thành Đô tại An Khánh' : unit.name) + '</strong></p><p>' + (point ? 'Tiếp nhận tư vấn và hồ sơ bảo hiểm tại khu vực TP Thủ Đức cũ.' : 'Văn phòng PVI tham khảo cho khách hàng khu vực ' + esc(name) + '. Nên gọi trước khi đến.') + '</p></div>';
  html = html.replace(/<div class="footer-identity">[\s\S]*?<\/div>/, identity);
  html = html.replace(/<address>[\s\S]*?<\/address>/, '<address><strong>' + (point ? 'Địa chỉ điểm mua' : 'Địa chỉ văn phòng') + '</strong>' + esc(unit.address) + (point ? '' : '<br><a href="tel:' + unit.phone.replace(/\D/g, '') + '">Điện thoại văn phòng: ' + esc(unit.phone) + '</a>') + '</address>');
  html = html.replace('<strong>Liên hệ tư vấn</strong>', '<strong>Tư vấn PVI Thành Đô</strong>');
  html = html.replace('</div><div class="footer-contact">', () => footerSiteOffice() + '</div><div class="footer-contact">');
  html = html.replace(footerMap(), footerMap(unit.address, 'Bản đồ: ' + (point ? 'Điểm mua PVI Thành Đô tại An Khánh' : unit.name)));
  return html;
}

export function footer(path = '/') {
  const local = localityForPath(path);
  if (local) return localityFooter(local);
  return `<footer id="lien-he" class="site-footer"><span id="dong-hanh" class="anchor-alias" aria-hidden="true"></span>${footerHq()}<div class="footer-identity"><strong class="footer-label">Đơn vị</strong><a class="brand" href="/"><img src="/assets/pvi-logo.svg" width="132" height="48" alt="Bảo hiểm PVI"><span>Thành Đô</span></a><p>Đơn vị thuộc hệ thống Bảo hiểm PVI<br>TỔNG CÔNG TY BẢO HIỂM PVI<br><strong>CÔNG TY BẢO HIỂM PVI THÀNH ĐÔ</strong></p><p>Mã số thuế: 0105402531-041</p><p><a href="/gioi-thieu/" style="color:#1F4A8C;font-weight:700">Giới thiệu đơn vị</a></p></div><address><strong>Trụ sở</strong><br>Tầng 12A, Tòa nhà 194 Golden Building<br>Số 473 Điện Biên Phủ, Phường Thạnh Mỹ Tây<br>Thành phố Hồ Chí Minh</address><div class="footer-links"><strong>Sản phẩm</strong><a href="/san-pham/">Tất cả sản phẩm</a><a href="/san-pham/bao-hiem-bat-buoc/">Bảo hiểm bắt buộc</a><a href="/san-pham/bao-hiem-tai-nan/">Bảo hiểm tai nạn</a><a href="/san-pham/chay-no-bat-buoc/">Cháy nổ bắt buộc</a><a href="/san-pham/hang-hoa-xuat-nhap-khau/">Hàng hóa xuất nhập khẩu</a><a href="/san-pham/bao-hiem-suc-khoe/">Chăm sóc sức khỏe</a><a href="/san-pham/bao-hiem-vat-chat-xe/">Vật chất xe ô tô</a><a href="/san-pham/bao-hiem-cong-trinh/">Công trình và lắp đặt</a><a href="/san-pham/bao-hiem-du-lich/">Du lịch quốc tế</a><a href="/tin-tuc/">Tin tức</a><a href="/huong-dan/">Hướng dẫn cho HR</a></div><div class="footer-contact"><strong>Liên hệ tư vấn</strong><a href="tel:0938072236">0938 072 236</a><a href="mailto:giadinhpvi@gmail.com">giadinhpvi@gmail.com</a><a href="tel:1900545458">Bồi thường 1900 54 54 58</a></div>${footerMap()}<div class="footer-bottom">${privacyLinks()}<p>Thông tin trên website để tham khảo. Phạm vi, điều kiện và phí chính thức theo quy tắc và hợp đồng Bảo hiểm PVI phát hành.</p><p>© 2026 Công ty Bảo hiểm PVI Thành Đô</p></div></footer>${privacyUi()}`;
}

// canonical: chỉ truyền khi trang là bản phụ của bài đã có bản chuẩn ở site khác (xem QUY-TAC-VIET-BAI.md mục 2).
export function seo({ path, title, description, image = '/assets/section-bat-buoc.webp', canonical }) {
  const url = canonical || SITE + path;
  const cover = productCovers[path];
  const imageMeta = cover ? productCoverMeta(cover) : `<meta property="og:image" content="${SITE}${image}">`;
  return `<link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:locale" content="vi_VN"><meta property="og:site_name" content="Bảo hiểm PVI Thành Đô"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}">${imageMeta}<meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#ffffff">`;
}

export function faqJsonLd(faqs) {
  return `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: clean(f.question), acceptedAnswer: { '@type': 'Answer', text: clean(f.answer) } })),
  }).replace(/</g, '\\u003c')}</script>`;
}

export function breadcrumbJsonLd(path, name) {
  return `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name, item: SITE + path },
    ],
  })}</script>`;
}

export function page({ path, title, description, image, canonical, bodyClass = 'fire', head = '', main, scripts = '', extraCss = '' }) {
  return nofollowExternal(protectExternalEmbeds(`<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}">${seo({ path, title, description, image, canonical })}<link rel="icon" href="https://pvihcm.com/pvihcm.ico?v=2" sizes="48x48 96x96 144x144"><link rel="apple-touch-icon" href="https://pvihcm.com/apple-touch-icon.png" sizes="180x180"><link rel="preload" href="/fonts/bvp-400-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/fonts/bvp-400-vietnamese.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/product.css"><link rel="stylesheet" href="/site.css">${extraCss}<link rel="stylesheet" href="/advisor.css"><link rel="stylesheet" href="/cta.css">${head}<script src="/app.js" defer></script>${scripts}<script src="/a11y.js" defer></script><script src="/advisor.js" defer></script></head><body class="${bodyClass}">${header(path)}<main id="main">${main}</main>${footer(path)}</body></html>`));
}

export const faqBlock = (faqs, heading = 'Câu hỏi thường gặp') => `<section class="fire-faq" id="cau-hoi"><div class="fire-wrap"><h2>${heading}</h2><div class="qa">${faqs.map((f) => `<details><summary>${t(f.question)}</summary><div class="ans">${t(f.answer)}</div></details>`).join('')}</div></div></section>`;

export const steps = (list) => `<div class="fire-steps">${list.map((s, i) => `<article><b>${String(i + 1).padStart(2, '0')}</b><h3>${t(s.title)}</h3><p>${t(s.text)}</p></article>`).join('')}</div>`;

export const hotline = `<div class="fire-hotline"><div><strong>Tổng đài bồi thường</strong><p>Gọi ngay khi sự cố xảy ra, trước khi làm thủ tục khác.</p></div><a href="tel:1900545458">1900 54 54 58</a></div>`;

export const ZALO = 'https://zalo.me/2076363329232219188?src=qr&f=1';
export const ctaRow = (primaryLabel = 'Gọi tư vấn 0938 072 236') => `<div class="pd-cta"><a class="fire-btn fire-btn-red" href="tel:0938072236">${primaryLabel}</a><a class="fire-btn fire-btn-line" href="${ZALO}" target="_blank">Nhắn Zalo</a></div>`;

export function productCoverMeta({ base, alt }) {
  const src = SITE + `/assets/${base}.jpg`;
  return `<meta property="og:image" content="${src}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(alt)}"><meta name="twitter:image" content="${src}"><meta name="twitter:image:alt" content="${esc(alt)}">`;
}

/* JSON-LD cho mọi trang bài (bài kiến thức, tin, thông báo, khu vực), một nguồn duy nhất (16/11/2026).
   Tác giả và đơn vị xuất bản trỏ về tổ chức khai ở trang chủ (@id SITE/#organization).
   aggregateRating KHÔNG khai ở đây: feedback.js chỉ gắn khi bài có đánh giá thật của bạn đọc
   (lấy từ /api/nhan-xet), không bao giờ ghi số cứng. */
export const ORG_ID = SITE + '/#organization';
export function articleJsonLd({ type = 'Article', path, canonical, title, description, image, date, updated }) {
  const url = canonical || SITE + path;
  return `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': type, '@id': SITE + path + '#article',
    headline: title, description, inLanguage: 'vi-VN',
    image: [].concat(image).map((i) => (i.startsWith('http') ? i : SITE + i)),
    datePublished: date, dateModified: updated || date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', '@id': ORG_ID, name: 'Công ty Bảo hiểm PVI Thành Đô', url: SITE + '/gioi-thieu/' },
    publisher: { '@type': 'Organization', '@id': ORG_ID, name: 'Công ty Bảo hiểm PVI Thành Đô', url: SITE + '/', logo: { '@type': 'ImageObject', url: SITE + '/assets/pvi-logo.svg' } },
  }).replace(/</g, '\\u003c')}</script>`;
}
