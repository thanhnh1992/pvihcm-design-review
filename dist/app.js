const motionQuery = matchMedia('(min-width:821px) and (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');

/* Parallax theo cuộn đã chuyển sang CSS scroll-driven animation (animation-timeline: view()).
   addEventListener('scroll', ...) chạy mỗi khung hình và không gộp nhịp, nên đã được gỡ bỏ. */

const heroTiles = [...document.querySelectorAll('.hero-tile')];
function resetHeroTile(tile) {
  tile.classList.remove('is-tilting');
  tile.style.removeProperty('--pointer-x');
  tile.style.removeProperty('--pointer-y');
  tile.style.removeProperty('--shine-x');
}
for (const tile of heroTiles) {
  let bounds;
  let tiltFrame = 0;
  tile.addEventListener('pointerenter', () => {
    if (!motionQuery.matches) return;
    bounds = tile.getBoundingClientRect();
    tile.classList.add('is-tilting');
  });
  tile.addEventListener('pointermove', (event) => {
    if (!motionQuery.matches || !bounds) return;
    const x = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
    const y = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));
    cancelAnimationFrame(tiltFrame);
    tiltFrame = requestAnimationFrame(() => {
      // Biên độ siết còn 5deg/4deg: đủ thấy chiều sâu, không làm thẻ vặn vẹo.
      tile.style.setProperty('--pointer-x', `${(x * 5).toFixed(2)}deg`);
      tile.style.setProperty('--pointer-y', `${(-y * 4).toFixed(2)}deg`);
      tile.style.setProperty('--shine-x', `${(x * 90).toFixed(1)}%`);
    });
  });
  tile.addEventListener('pointerleave', () => {
    cancelAnimationFrame(tiltFrame);
    bounds = undefined;
    resetHeroTile(tile);
  });
  tile.addEventListener('blur', () => resetHeroTile(tile));
}
motionQuery.addEventListener('change', () => {
  if (!motionQuery.matches) heroTiles.forEach(resetHeroTile);
});
// Native links preserve keyboard, touch, new tabs and browser-back behavior.
document.querySelector('#print-button')?.addEventListener('click', () => print());

/* Lớp chiều sâu: lớp gần dịch nhiều hơn lớp xa, nên mắt đọc ra khoảng cách thật.
   CSS lo phần làm mượt bằng transition, JS chỉ đặt biến, mỗi khung hình một lần. */
const depthField = document.querySelector('.hero-depth');
if (depthField) {
  const depthLayers = [...depthField.children];
  let depthFrame = 0;
  addEventListener('pointermove', (event) => {
    if (!motionQuery.matches || event.pointerType !== 'mouse') return;
    cancelAnimationFrame(depthFrame);
    depthFrame = requestAnimationFrame(() => {
      const x = event.clientX / innerWidth - 0.5;
      const y = event.clientY / innerHeight - 0.5;
      depthLayers.forEach((layer, index) => {
        const pull = (index + 1) * 9;
        layer.style.setProperty('--px', `${(x * pull).toFixed(1)}px`);
        layer.style.setProperty('--py', `${(y * pull * 0.7).toFixed(1)}px`);
      });
    });
  }, { passive: true });
}

/* Quy tắc toàn site (chủ site chốt 28/10/2026): trên máy tính (có chuột), bấm link
   là mở tab mới; điện thoại và máy tính bảng cảm ứng vẫn mở cùng tab như cũ.
   Áp dụng cho mọi trang hiện có và trang thêm sau này vì trang nào cũng nạp app.js.
   Giữ nguyên tab hiện tại cho: link nhảy tới mục trong cùng trang (#...),
   tel:, mailto:, link tải file (download) và link có data-same-tab.
   Gắn sẵn khi tải trang, và gắn lại lúc bấm để link sinh ra sau (Zalo nổi,
   thông báo...) cũng theo quy tắc. Đoạn này phải đứng trước hiệu ứng mở trang. */
const opensNewTab = (link) => {
  if (link.hasAttribute('download') || link.hasAttribute('data-same-tab')) return false;
  const raw = link.getAttribute('href');
  if (!raw || raw.startsWith('#')) return false;
  let url;
  try { url = new URL(raw, location.href); } catch { return false; }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
  const samePage = url.origin === location.origin && url.pathname === location.pathname && url.search === location.search;
  return !(samePage && url.hash);
};
const desktopPointer = matchMedia('(hover:hover) and (pointer:fine)');
const setNewTab = (link) => {
  if (!desktopPointer.matches || !opensNewTab(link)) return;
  // Không gắn thuộc tính rel noopener (chủ site bỏ 22/11/2026); trình duyệt hiện đại tự áp noopener cho target="_blank".
  link.target = '_blank';
};
document.querySelectorAll('a[href]').forEach(setNewTab);
document.addEventListener('click', (event) => {
  const link = event.target.closest?.('a[href]');
  if (link) setNewTab(link);
}, true);

/* Hiệu ứng mở trang 280ms. Chỉ bắt cú bấm chuột trái thuần tuý; mọi kiểu mở
   khác (tab mới, chuột giữa, Ctrl/Cmd, phím tắt) đều để trình duyệt tự lo.
   Nếu JavaScript hỏng, thẻ <a> vẫn là thẻ <a>. */
const openOverlay = document.querySelector('.open-overlay');
if (openOverlay && matchMedia('(prefers-reduced-motion:no-preference)').matches) {
  for (const tile of heroTiles) {
    tile.addEventListener('click', (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (tile.target && tile.target !== '_self') return;
      event.preventDefault();
      openOverlay.classList.add('active');
      setTimeout(() => { location.href = tile.href; }, 280);
    });
  }
  // Quay lại bằng nút Back (kể cả từ bfcache) phải thấy trang sạch, không còn lớp phủ.
  addEventListener('pageshow', () => openOverlay.classList.remove('active'));
}

/* Menu trên màn hẹp: nút thật, trạng thái qua aria-expanded; Esc và bấm ra ngoài để đóng. */
const siteHeader = document.querySelector('.site-header');
const menuToggle = siteHeader?.querySelector('.menu-toggle');
if (siteHeader && menuToggle) {
  const setMenu = (open) => {
    siteHeader.classList.toggle('nav-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  };
  menuToggle.addEventListener('click', () => setMenu(!siteHeader.classList.contains('nav-open')));
  // Bấm một trang trong menu thì đóng menu; nút mở danh mục "Sản phẩm" (có aria-expanded) thì không.
  siteHeader.querySelector('.site-nav')?.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (link && !link.hasAttribute('aria-expanded')) setMenu(false);
  });
  addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && siteHeader.classList.contains('nav-open')) { setMenu(false); menuToggle.focus(); }
  });
  document.addEventListener('click', (event) => {
    if (siteHeader.classList.contains('nav-open') && !siteHeader.contains(event.target)) setMenu(false);
  });
}


/* Mục "Sản phẩm" trên menu: bấm thì mở danh mục sản phẩm (chủ site yêu cầu 21/11/2026).
   Không có JS thì vẫn là link tới /san-pham/. Danh sách sinh từ tools/data/san-pham.mjs
   (node tools/gen-san-pham.mjs ghi đè đoạn giữa hai dấu NAV_SAN_PHAM, không sửa tay). */
/* NAV_SAN_PHAM:start */
const NAV_SAN_PHAM = [{"label":"Bắt buộc theo luật","items":[{"href":"/san-pham/bao-hiem-bat-buoc/","title":"Bảo hiểm TNDS ô tô bắt buộc","img":"bat-buoc"},{"href":"/san-pham/chay-no-bat-buoc/","title":"Bảo hiểm cháy nổ bắt buộc","img":"chay-no"}]},{"label":"Con người","items":[{"href":"/san-pham/bao-hiem-tai-nan/","title":"Bảo hiểm tai nạn 24/24","img":"tai-nan"},{"href":"/san-pham/bao-hiem-suc-khoe/","title":"Bảo hiểm sức khỏe PVI Care","img":"hero-suc-khoe"},{"href":"/san-pham/bao-hiem-y-te/","title":"BHYT hộ gia đình, BHXH tự nguyện","img":"diem-thu-bhxh-bhyt-pvi-thanh-do"},{"href":"/san-pham/bao-hiem-du-lich/","title":"Bảo hiểm du lịch quốc tế","img":"hero-du-lich"}]},{"label":"Tài sản và doanh nghiệp","items":[{"href":"/san-pham/hang-hoa-xuat-nhap-khau/","title":"Bảo hiểm hàng hóa xuất nhập khẩu","img":"hang-hoa"},{"href":"/san-pham/bao-hiem-cong-trinh/","title":"Bảo hiểm công trình và lắp đặt","img":"hero-cong-trinh"},{"href":"/san-pham/bao-hiem-vat-chat-xe/","title":"Bảo hiểm vật chất xe ô tô","img":"tu-van-xe-o-to"}]}];
/* NAV_SAN_PHAM:end */
const productsLink = document.querySelector('.site-nav a[href="/san-pham/"]');
if (siteHeader && productsLink && NAV_SAN_PHAM.length) {
  const panel = document.createElement('div');
  panel.id = 'nav-san-pham';
  panel.className = 'nav-products';
  panel.hidden = true;
  const here = location.pathname;
  panel.innerHTML = '<div class="nav-products-grid">' + NAV_SAN_PHAM.map((g) => '<div class="nav-products-col"><p class="nav-products-h">' + g.label + '</p><ul>'
    + g.items.map((p) => '<li><a href="' + p.href + '"' + (p.href === here ? ' aria-current="page"' : '') + '><img src="/assets/' + p.img + '-480.webp" width="56" height="56" alt="" loading="lazy" decoding="async"><span>' + p.title + '</span></a></li>').join('')
    + '</ul></div>').join('') + '</div><a class="nav-products-all" href="/san-pham/">Xem tất cả sản phẩm <span aria-hidden="true">→</span></a>';
  productsLink.after(panel);
  productsLink.setAttribute('aria-expanded', 'false');
  productsLink.setAttribute('aria-controls', panel.id);
  productsLink.classList.add('nav-products-toggle');
  const setProducts = (open) => {
    panel.hidden = !open;
    productsLink.setAttribute('aria-expanded', String(open));
    siteHeader.classList.toggle('products-open', open);
  };
  productsLink.addEventListener('click', (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setProducts(panel.hidden);
  });
  addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) { setProducts(false); productsLink.focus(); }
  });
  document.addEventListener('click', (event) => {
    if (!panel.hidden && !panel.contains(event.target) && event.target !== productsLink && !productsLink.contains(event.target)) setProducts(false);
  });
  menuToggle?.addEventListener('click', () => { if (!siteHeader.classList.contains('nav-open')) setProducts(false); });
  addEventListener('pageshow', () => setProducts(false));
}

/* Nút tìm kiếm trên header: lần bấm đầu mới tải search.js + dữ liệu, trang không nặng thêm. Ctrl/⌘+K cũng mở. */
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
  let searchScript = null;
  const openSearch = () => {
    if (window.pviSearch) return window.pviSearch(searchBtn);
    if (searchScript) return;
    searchScript = document.createElement('script');
    searchScript.src = '/search.js?v=20261113';
    searchScript.onload = () => window.pviSearch?.(searchBtn);
    searchScript.onerror = () => { searchScript.remove(); searchScript = null; };
    document.head.append(searchScript);
  };
  searchBtn.addEventListener('click', openSearch);
  addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); }
  });
}

// Basic Consent Mode: no Google tag/request until an optional purpose is accepted.
// The privacy notice is independent of consent to submit personal data in forms.
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
let privacyAnalytics = false;
let privacyGoogleLoaded = false;
let privacyGaConfigured = false;
let privacyAdsConfigured = false;
window['ga-disable-G-HYEVLMD710'] = true;
gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
window.addEventListener('pvi:privacy-change', ({ detail }) => {
  privacyAnalytics = detail.analytics === true;
  window['ga-disable-G-HYEVLMD710'] = !privacyAnalytics;
  gtag('consent', 'update', { analytics_storage: privacyAnalytics ? 'granted' : 'denied', ad_storage: detail.marketing ? 'granted' : 'denied', ad_user_data: detail.marketing ? 'granted' : 'denied', ad_personalization: detail.marketing ? 'granted' : 'denied' });
  // Bản xem thử và máy chạy thử không gửi số liệu vào GA4/Ads.
  if (!/(^|\.)pvihcm\.com$/.test(location.hostname) || (!privacyAnalytics && !detail.marketing)) return;
  if (!privacyGoogleLoaded) {
    privacyGoogleLoaded = true;
    gtag('js', new Date());
    const analyticsScript = document.createElement('script');
    analyticsScript.async = true;
    analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + (privacyAnalytics ? 'G-HYEVLMD710' : 'AW-18556160976');
    document.head.append(analyticsScript);
  }
  if (privacyAnalytics && !privacyGaConfigured) { privacyGaConfigured = true; gtag('config', 'G-HYEVLMD710', { allow_google_signals: !!detail.marketing, allow_ad_personalization_signals: !!detail.marketing }); }
  if (detail.marketing && !privacyAdsConfigured) { privacyAdsConfigured = true; gtag('config', 'AW-18556160976'); }
});

// Vercel Speed Insights: đo tốc độ tải trang thật của khách (không dùng cookie).
// Script phục vụ từ chính site (/_vercel/...) nên CSP 'self' đã cho phép; chỉ chạy trên pvihcm.com.
if (/(^|\.)pvihcm\.com$/.test(location.hostname)) {
  const speedInsights = document.createElement('script');
  speedInsights.defer = true;
  speedInsights.src = '/_vercel/speed-insights/script.js';
  document.head.append(speedInsights);
}

document.addEventListener('click', (event) => {
  const link = event.target.closest?.('a[href]');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  const method = /^tel:0938072236$/.test(href)
    ? 'phone'
    : href.startsWith('https://zalo.me/') ? 'zalo' : null;
  if (method && privacyAnalytics && /(^|\.)pvihcm\.com$/.test(location.hostname)) gtag('event', 'contact_click', { contact_method: method });
});
