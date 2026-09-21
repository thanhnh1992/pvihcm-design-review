// Khung dùng chung cho mọi trang: head SEO, header có menu, chân trang.
export const SITE = 'https://pvihcm.com';
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Luật chống giọng máy: không dùng gạch dài. Chỉ đổi dấu câu, không đổi nội dung.
export const clean = (s) => String(s).replace(/\s+—\s+/g, ', ').replace(/—/g, ', ').replace(/trong trong/g, 'trong');
export const t = (s) => esc(clean(s));

export const NAV = [
  ['/gioi-thieu/', 'Giới thiệu'],
  ['/san-pham/bao-hiem-bat-buoc/', 'Bắt buộc'],
  ['/san-pham/bao-hiem-tai-nan/', 'Tai nạn'],
  ['/san-pham/chay-no-bat-buoc/', 'Cháy nổ'],
  ['/san-pham/hang-hoa-xuat-nhap-khau/', 'Hàng hóa'],
  ['/huong-dan/', 'Hướng dẫn'],
  ['/#boi-thuong', 'Bồi thường'],
];

const PHONE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>';
const MENU_SVG = '<svg class="open-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg><svg class="close-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

export function header(path) {
  const links = NAV.map(([href, label]) => `<a href="${href}"${href === path ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<a class="skip" href="#main">Đến nội dung chính</a><header class="site-header"><a class="brand" href="/"><img src="/assets/pvi-logo.svg" width="132" height="48" alt="Bảo hiểm PVI"><span>Thành Đô</span></a><nav id="site-nav" class="site-nav" aria-label="Điều hướng chính">${links}</nav><a class="phone" href="tel:0938072236" aria-label="Gọi tư vấn 0938 072 236">${PHONE_SVG}<span>0938 072 236</span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Mở menu">${MENU_SVG}<span class="lbl">Menu</span></button></header>`;
}

export function footer() {
  return `<footer id="lien-he" class="site-footer"><span id="dong-hanh" class="anchor-alias" aria-hidden="true"></span><div class="footer-identity"><strong class="footer-label">Đơn vị</strong><a class="brand" href="/"><img src="/assets/pvi-logo.svg" width="132" height="48" alt="Bảo hiểm PVI"><span>Thành Đô</span></a><p>Đơn vị thuộc hệ thống Bảo hiểm PVI<br>TỔNG CÔNG TY BẢO HIỂM PVI<br><strong>CÔNG TY BẢO HIỂM PVI THÀNH ĐÔ</strong></p><p>Mã số thuế: 0105402531-041</p><p><a href="/gioi-thieu/" style="color:#165a9c;font-weight:700">Giới thiệu đơn vị</a></p></div><address><strong>Trụ sở</strong><br>Tầng 12A, Tòa nhà 194 Golden Building<br>Số 473 Điện Biên Phủ, Phường Thạnh Mỹ Tây<br>Thành phố Hồ Chí Minh</address><div class="footer-links"><strong>Sản phẩm</strong><a href="/san-pham/bao-hiem-bat-buoc/">Bảo hiểm bắt buộc</a><a href="/san-pham/bao-hiem-tai-nan/">Bảo hiểm tai nạn</a><a href="/san-pham/chay-no-bat-buoc/">Cháy nổ bắt buộc</a><a href="/san-pham/hang-hoa-xuat-nhap-khau/">Hàng hóa xuất nhập khẩu</a></div><div class="footer-contact"><strong>Liên hệ tư vấn</strong><a href="tel:0938072236">0938 072 236</a><a href="tel:0918981869">0918 981 869</a><a href="mailto:giadinhpvi@gmail.com">giadinhpvi@gmail.com</a><a href="tel:1900545458">Bồi thường 1900 54 54 58</a></div><div class="footer-bottom"><p>Thông tin trên website để tham khảo. Phạm vi, điều kiện và phí chính thức theo quy tắc và hợp đồng Bảo hiểm PVI phát hành.</p><p>© 2026 Công ty Bảo hiểm PVI Thành Đô</p></div></footer>`;
}

export function seo({ path, title, description, image = '/assets/section-bat-buoc.webp' }) {
  const url = SITE + path;
  return `<link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:locale" content="vi_VN"><meta property="og:site_name" content="Bảo hiểm PVI Thành Đô"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}${image}"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#ffffff">`;
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

export function page({ path, title, description, image, bodyClass = 'fire', head = '', main, scripts = '' }) {
  return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}">${seo({ path, title, description, image })}<link rel="icon" href="/assets/pvi-logo.svg" type="image/svg+xml"><link rel="preload" href="/fonts/bvp-400-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/fonts/bvp-400-vietnamese.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/product.css"><link rel="stylesheet" href="/site.css"><link rel="stylesheet" href="/advisor.css">${head}<script src="/app.js" defer></script>${scripts}<script src="/advisor.js" defer></script></head><body class="${bodyClass}">${header(path)}<main id="main">${main}</main>${footer()}</body></html>`;
}

export const faqBlock = (faqs, heading = 'Câu hỏi thường gặp') => `<section class="fire-faq" id="cau-hoi"><div class="fire-wrap"><h2>${heading}</h2><div class="qa">${faqs.map((f) => `<details><summary>${t(f.question)}</summary><div class="ans">${t(f.answer)}</div></details>`).join('')}</div></div></section>`;

export const steps = (list) => `<div class="fire-steps">${list.map((s, i) => `<article><b>${String(i + 1).padStart(2, '0')}</b><h3>${t(s.title)}</h3><p>${t(s.text)}</p></article>`).join('')}</div>`;

export const hotline = `<div class="fire-hotline"><div><strong>Tổng đài bồi thường</strong><p>Gọi ngay khi sự cố xảy ra, trước khi làm thủ tục khác.</p></div><a href="tel:1900545458">1900 54 54 58</a></div>`;

export const ZALO = 'https://zalo.me/2076363329232219188?src=qr&f=1';
export const ctaRow = (primaryLabel = 'Gọi tư vấn 0938 072 236') => `<div class="pd-cta"><a class="fire-btn fire-btn-red" href="tel:0938072236">${primaryLabel}</a><a class="fire-btn fire-btn-line" href="${ZALO}" target="_blank" rel="noopener">Nhắn Zalo</a></div>`;
