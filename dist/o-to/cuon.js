/* Hiệu ứng cuộn trang Bảo hiểm ô tô: bản chuyển của scroll-story.tsx (baohiempvi-vn).
   Chữ nằm sẵn trong HTML; file này chỉ gắn lớp để chạy hiệu ứng. Tắt JavaScript thì
   không ẩn chữ nào (CSS chỉ ẩn khi <html> có lớp js-cuon). Khách bật giảm chuyển động
   thì hiện thẳng. Dùng IntersectionObserver, không nghe sự kiện scroll. */
(() => {
  const page = document.querySelector('.oto-page');
  if (!page || !('IntersectionObserver' in window)) return;
  const KHOI = ['.auto-hero-copy > *', '.auto-choice-card', '.auto-trust-line span', '.auto-dashboard-heading', '.auto-segment-group',
    '.auto-fee-panel', '.auto-intro-grid > *', '.auto-knowledge-grid > article', '.auto-fee-table-card', '.auto-docs li, .auto-document-grid > a',
    '.auto-faqs details', '.auto-cta-inner > *', '[data-cuon]'];
  const GACH = '.auto-intro-grid h2, .auto-section-heading h2, .auto-cta-inner h2';
  const goc = document.documentElement;
  goc.classList.add('js-cuon');
  // Bộ tra phí vẽ lại khối khi khách bấm: chỉ áp hiệu ứng cho phần tĩnh, khối trong bộ tra phí luôn hiện.
  const tinh = (el) => !el.closest('[data-tra-phi]');
  const tp = new Set();
  KHOI.forEach((s) => page.querySelectorAll(s).forEach((el) => { if (tinh(el)) tp.add(el); }));
  page.querySelectorAll(GACH).forEach((el) => { el.classList.add('cuon-gach'); tp.add(el); });
  const dem = new Map();
  tp.forEach((el) => {
    const i = dem.get(el.parentElement) ?? 0; dem.set(el.parentElement, i + 1);
    el.style.setProperty('--cuon-thu-tu', String(Math.min(i, 5)));
    el.classList.add('cuon-hien');
  });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { tp.forEach((el) => el.classList.add('da-hien')); return; }
  const io = new IntersectionObserver((list) => list.forEach((m) => { if (m.isIntersecting) { m.target.classList.add('da-hien'); io.unobserve(m.target); } }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  tp.forEach((el) => { const r = el.getBoundingClientRect(); if (!r.width || !r.height) el.classList.add('da-hien'); else io.observe(el); });
  // Lưới an toàn: sau 3 giây, chữ nào còn ẩn mà đã trong tầm nhìn thì hiện.
  setTimeout(() => tp.forEach((el) => { if (!el.classList.contains('da-hien') && el.getBoundingClientRect().top < innerHeight * 1.2) el.classList.add('da-hien'); }), 3000);
  // Mạch kể: bước đang ở giữa màn hình thì sáng lên.
  const buoc = [...page.querySelectorAll('[data-buoc]')];
  const ib = new IntersectionObserver((list) => {
    list.forEach((m) => m.target.classList.toggle('buoc-dang-xem', m.isIntersecting));
    const dang = buoc.filter((b) => b.classList.contains('buoc-dang-xem'));
    const so = dang.length ? dang[0].dataset.buoc : null;
    page.querySelectorAll('[data-buoc-anh]').forEach((a) => a.classList.toggle('anh-dang-xem', a.dataset.buocAnh === so));
  }, { rootMargin: '-45% 0px -45% 0px' });
  buoc.forEach((b) => ib.observe(b));
})();
