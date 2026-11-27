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


/* Dữ liệu danh mục "Sản phẩm" trên menu (chủ site yêu cầu 21/11/2026).
   Không có JS thì vẫn là link tới /san-pham/. Danh sách sinh từ tools/data/san-pham.mjs
   (node tools/gen-san-pham.mjs ghi đè đoạn giữa hai dấu NAV_SAN_PHAM, không sửa tay). */
/* NAV_SAN_PHAM:start */
const NAV_SAN_PHAM = [{"label":"Bắt buộc theo luật","items":[{"href":"/san-pham/bao-hiem-bat-buoc/","title":"Bảo hiểm TNDS ô tô bắt buộc","img":"bat-buoc"},{"href":"/san-pham/chay-no-bat-buoc/","title":"Bảo hiểm cháy nổ bắt buộc","img":"chay-no"}]},{"label":"Con người","items":[{"href":"/san-pham/bao-hiem-tai-nan/","title":"Bảo hiểm tai nạn 24/24","img":"tai-nan"},{"href":"/san-pham/bao-hiem-suc-khoe/","title":"Bảo hiểm sức khỏe PVI Care","img":"hero-suc-khoe"},{"href":"/san-pham/bao-hiem-y-te/","title":"BHYT hộ gia đình, BHXH tự nguyện","img":"diem-thu-bhxh-bhyt-pvi-thanh-do"},{"href":"/san-pham/bao-hiem-du-lich/","title":"Bảo hiểm du lịch quốc tế","img":"hero-du-lich"}]},{"label":"Tài sản và doanh nghiệp","items":[{"href":"/san-pham/hang-hoa-xuat-nhap-khau/","title":"Bảo hiểm hàng hóa xuất nhập khẩu","img":"hang-hoa"},{"href":"/san-pham/bao-hiem-cong-trinh/","title":"Bảo hiểm công trình và lắp đặt","img":"hero-cong-trinh"},{"href":"/san-pham/bao-hiem-trach-nhiem/","title":"Bảo hiểm trách nhiệm","img":"tu-van-doanh-nghiep"},{"href":"/san-pham/bao-hiem-vat-chat-xe/","title":"Bảo hiểm vật chất xe ô tô","img":"tu-van-xe-o-to"}]}];
/* NAV_SAN_PHAM:end */
/* Menu con cho các mục khác (chủ site 23/11/2026). Sinh bởi node tools/gen-nav-menu.mjs, không sửa tay. */
/* NAV_KHAC:start */
const NAV_KHAC = {"/gioi-thieu/":{"all":["/gioi-thieu/","Giới thiệu PVI Thành Đô"],"items":[{"href":"/gioi-thieu/","title":"Về Công ty Bảo hiểm PVI Thành Đô","desc":"Đơn vị thành viên Tổng công ty Bảo hiểm PVI"},{"href":"/danh-gia/","title":"Đánh giá của khách hàng","desc":"Điểm trên Google và đánh giá trên website"},{"href":"/#lien-he","title":"Liên hệ, địa chỉ","desc":"Trụ sở 473 Điện Biên Phủ, hotline tư vấn"}]},"/kien-thuc/":{"all":["/kien-thuc/","Tất cả kiến thức"],"items":[{"href":"/kien-thuc/tai-nan-24-24/","title":"Tai nạn 24/24","desc":"Bảo hiểm tai nạn 24/24"},{"href":"/kien-thuc/chay-no-bat-buoc/","title":"Cháy nổ, tài sản","desc":"Bảo hiểm cháy nổ bắt buộc"},{"href":"/kien-thuc/cong-trinh-lap-dat/","title":"Công trình","desc":"Bảo hiểm công trình xây dựng, lắp đặt"},{"href":"/kien-thuc/bao-hiem-o-to/","title":"Ô tô","desc":"Bảo hiểm ô tô"},{"href":"/kien-thuc/suc-khoe/","title":"Sức khỏe","desc":"Bảo hiểm sức khỏe"},{"href":"/kien-thuc/du-lich/","title":"Du lịch","desc":"Bảo hiểm du lịch"},{"href":"/kien-thuc/hang-hoa/","title":"Hàng hóa","desc":"Bảo hiểm hàng hóa xuất nhập khẩu"}]},"/tin-tuc/":{"all":["/tin-tuc/","Tất cả tin tức"],"items":[{"href":"/tin-tuc/#tin-san-pham","title":"Tin sản phẩm","desc":"Bài viết theo từng sản phẩm bảo hiểm"},{"href":"/tin-tuc/#phap-ly-moi","title":"Pháp lý mới","desc":"Nghị định, thông tư và ngày hiệu lực"},{"href":"/tin-tuc/#tin-chung","title":"Tin tức chung","desc":"Tin đơn vị, khu vực, thông báo"}]},"/#boi-thuong":{"all":["/#boi-thuong","Xem quy trình bồi thường"],"items":[{"href":"/#boi-thuong","title":"Quy trình và hồ sơ bồi thường","desc":"Các bước khi xảy ra sự cố"},{"href":"tel:1900545458","title":"Tổng đài bồi thường 1900 54 54 58","desc":"Gọi ngay khi có sự cố"},{"href":"tel:0938072236","title":"Tư vấn 0938 072 236","desc":"Hỏi quyền lợi, hồ sơ trước khi nộp"}]}};
/* NAV_KHAC:end */

/* Menu thả xuống cho mọi mục có danh sách con (chủ site 23/11/2026: bấm là hiện NGAY, chọn nhanh nhất có thể).
   - Không hiệu ứng chờ; máy tính có chuột: rê vào là mở luôn, bấm cũng mở/đóng; điện thoại: chạm là mở tại chỗ.
   - Ảnh nhỏ của danh mục sản phẩm được tải trước khi trang rảnh, nên mở ra là có ảnh ngay.
   - Không có JS thì các mục vẫn là link bình thường. */
const navMenus = [];
const siteNav = siteHeader?.querySelector('.site-nav');
if (siteHeader && siteNav) {
  const here = location.pathname;
  const hoverable = matchMedia('(hover:hover) and (pointer:fine) and (min-width:1181px)');
  const closeAll = (except) => navMenus.forEach((m) => { if (m !== except) m.set(false); });
  const build = (link, html, wide) => {
    const panel = document.createElement('div');
    panel.id = 'nav-sub-' + navMenus.length;
    panel.className = 'nav-products' + (wide ? '' : ' nav-sub');
    panel.hidden = true;
    panel.innerHTML = html;
    link.after(panel);
    link.setAttribute('aria-expanded', 'false');
    link.setAttribute('aria-controls', panel.id);
    link.classList.add('nav-products-toggle');
    let timer = 0;
    const m = {
      link, panel,
      set(open) {
        clearTimeout(timer);
        if (open) {
          closeAll(m);
          if (!wide && hoverable.matches) panel.style.left = (link.offsetLeft + link.offsetWidth / 2) + 'px';
        }
        panel.hidden = !open;
        link.setAttribute('aria-expanded', String(open));
        siteHeader.classList.toggle('products-open', navMenus.some((x) => !x.panel.hidden));
      },
    };
    link.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      // Máy tính: rê chuột đã mở thì bấm giữ nguyên (không đóng lại); điện thoại: chạm để mở/đóng.
      m.set(hoverable.matches ? true : panel.hidden);
    });
    const later = () => { clearTimeout(timer); timer = setTimeout(() => m.set(false), 160); };
    link.addEventListener('pointerenter', () => { if (hoverable.matches) m.set(true); });
    link.addEventListener('pointerleave', () => { if (hoverable.matches) later(); });
    panel.addEventListener('pointerenter', () => clearTimeout(timer));
    panel.addEventListener('pointerleave', () => { if (hoverable.matches) later(); });
    navMenus.push(m);
    return m;
  };
  const cur = (href) => (href === here ? ' aria-current="page"' : '');
  const productsLink = siteNav.querySelector('a[href="/san-pham/"]');
  if (productsLink && NAV_SAN_PHAM.length) {
    build(productsLink, '<div class="nav-products-grid">' + NAV_SAN_PHAM.map((g) => '<div class="nav-products-col"><p class="nav-products-h">' + g.label + '</p><ul>'
      + g.items.map((p) => '<li><a href="' + p.href + '"' + cur(p.href) + '><img src="/assets/' + p.img + '-480.webp" width="56" height="56" alt="" decoding="async"><span>' + p.title + '</span></a></li>').join('')
      + '</ul></div>').join('') + '</div><a class="nav-products-all" href="/san-pham/">Xem tất cả sản phẩm <span aria-hidden="true">→</span></a>', true);
  }
  Object.keys(NAV_KHAC).forEach((href) => {
    const link = siteNav.querySelector('a[href="' + href + '"]');
    const d = NAV_KHAC[href];
    if (!link || !d.items || !d.items.length) return;
    build(link, '<ul>' + d.items.map((x) => '<li><a href="' + x.href + '"' + cur(x.href) + '><span><b>' + x.title + '</b>' + (x.desc ? '<small>' + x.desc + '</small>' : '') + '</span></a></li>').join('')
      + '</ul><a class="nav-products-all" href="' + d.all[0] + '">' + d.all[1] + ' <span aria-hidden="true">→</span></a>', false);
  });
  addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const open = navMenus.find((x) => !x.panel.hidden);
    if (open) { open.set(false); open.link.focus(); }
  });
  document.addEventListener('click', (event) => {
    navMenus.forEach((m) => { if (!m.panel.hidden && !m.panel.contains(event.target) && !m.link.contains(event.target)) m.set(false); });
  });
  menuToggle?.addEventListener('click', () => { if (!siteHeader.classList.contains('nav-open')) closeAll(); });
  addEventListener('pageshow', () => closeAll());
  // Tải trước ảnh nhỏ của danh mục sản phẩm khi trang rảnh: mở menu là thấy ảnh ngay.
  const warm = () => NAV_SAN_PHAM.forEach((g) => g.items.forEach((p) => { const i = new Image(); i.decoding = 'async'; i.src = '/assets/' + p.img + '-480.webp'; }));
  if ('requestIdleCallback' in window) requestIdleCallback(warm, { timeout: 3000 }); else setTimeout(warm, 1500);
}

/* ── Ngôn ngữ VN/EN và nút 3 gạch trên máy tính (chủ site 23/11/2026) ──
   - Quả địa cầu "VN" cạnh nút Tìm kiếm: chọn VN hoặc EN.
   - EN: mở bản dịch máy của Google cho đúng trang đang xem (pvihcm-com.translate.goog). Chủ site chốt: CHỈ đổi
     ngôn ngữ, KHÔNG tạo thêm trang tiếng Anh trên pvihcm.com, nên Google không index thêm trang, không có nội dung
     trùng. Link sang Google gắn rel="nofollow". Lựa chọn được nhớ trên máy khách (bot không có nên không bị chuyển).
   - Nút 3 gạch: điện thoại như cũ; máy tính mở ngăn kéo liệt kê đủ mọi mục để chọn nhanh. */
const onTranslate = /\.translate\.goog$/.test(location.hostname);
const pagePath = location.pathname;
const vungTauPage = pagePath.startsWith('/vungtau/');
const internalLinksOnly = vungTauPage || document.querySelector('[data-internal-links-only]');
const isEn = onTranslate;
const safeStore = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } return null; };
if (/[?&]lang=vi\b/.test(location.search)) {
  safeStore('pvi-lang', 'vi');
  try { history.replaceState(null, '', location.pathname + location.search.replace(/[?&]lang=vi\b/, '').replace(/^&/, '?') + location.hash); } catch (e) { /* bỏ qua */ }
}
const viHref = onTranslate ? 'https://pvihcm.com' + pagePath + '?lang=vi' : pagePath;
const enHref = 'https://pvihcm-com.translate.goog' + pagePath + '?_x_tr_sl=vi&_x_tr_tl=en&_x_tr_hl=en';
// Đã chọn EN trước đó mà quay lại trang tiếng Việt: chuyển sang tiếng Anh luôn.
if (!internalLinksOnly && !isEn && safeStore('pvi-lang') === 'en' && !/[?&]lang=vi\b/.test(location.search)) location.replace(enHref);

if (siteHeader) {
  if (!internalLinksOnly) {
    const GLOBE = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z"/></svg>';
    const pick = document.createElement('div');
    pick.className = 'lang-pick';
    pick.innerHTML = '<button type="button" class="lang-btn" aria-haspopup="true" aria-expanded="false" aria-label="' + (isEn ? 'Language: English' : 'Ngôn ngữ: Tiếng Việt') + '">' + GLOBE + '<b>' + (isEn ? 'EN' : 'VN') + '</b></button>'
      + '<div class="lang-menu" hidden><a href="' + viHref + '" hreflang="vi" lang="vi" data-lang="vi" data-same-tab' + (isEn ? '' : ' aria-current="true"') + '><b>VN</b><span>Tiếng Việt</span></a>'
      + '<a href="' + enHref + '" hreflang="en" lang="en" rel="nofollow" data-lang="en" data-same-tab' + (isEn ? ' aria-current="true"' : '') + '><b>EN</b><span>English</span></a></div>';
    const anchor = siteHeader.querySelector('.search-btn') || siteHeader.querySelector('.menu-toggle');
    if (anchor) anchor.before(pick);
    const btn = pick.querySelector('.lang-btn'), list = pick.querySelector('.lang-menu');
    const setLang = (open) => { list.hidden = !open; btn.setAttribute('aria-expanded', String(open)); };
    btn.addEventListener('click', (e) => { e.stopPropagation(); setLang(list.hidden); });
    list.addEventListener('click', (e) => { const a = e.target.closest('a[data-lang]'); if (a) safeStore('pvi-lang', a.dataset.lang); });
    document.addEventListener('click', (e) => { if (!pick.contains(e.target)) setLang(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && !list.hidden) { setLang(false); btn.focus(); } });
  }

  // Ngăn kéo cho nút 3 gạch trên máy tính: đủ mọi mục, mở ngay.
  if (menuToggle) {
    const drawer = document.createElement('div');
    drawer.className = 'nav-drawer';
    const col = (title, items) => '<div class="nav-drawer-col"><p class="nav-drawer-h">' + title + '</p><ul>' + items.map((x) => '<li><a href="' + x.href + '">' + x.title + '</a></li>').join('') + '</ul></div>';
    const prod = []; NAV_SAN_PHAM.forEach((g) => g.items.forEach((p) => prod.push(p)));
    drawer.innerHTML = '<div class="nav-drawer-grid">'
      + col('Sản phẩm', prod.concat([{ href: '/san-pham/', title: 'Tất cả sản phẩm →' }]))
      + Object.keys(NAV_KHAC).map((k) => col(({ '/gioi-thieu/': 'Giới thiệu', '/kien-thuc/': 'Kiến thức', '/tin-tuc/': 'Tin tức', '/#boi-thuong': 'Bồi thường' })[k] || k, NAV_KHAC[k].items)).join('')
      + '</div>';
    siteHeader.appendChild(drawer);
  }

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
