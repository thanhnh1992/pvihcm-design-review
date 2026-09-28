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

/* Marquee: nút tạm dừng thật, trạng thái phản ánh qua aria-pressed. */
const marqueeToggle = document.querySelector('[data-marquee-toggle]');
const marqueeTrack = document.querySelector('[data-marquee-track]');
if (marqueeToggle && marqueeTrack) {
  marqueeToggle.addEventListener('click', () => {
    const paused = marqueeTrack.dataset.paused === 'true';
    marqueeTrack.dataset.paused = String(!paused);
    marqueeToggle.setAttribute('aria-pressed', String(!paused));
    marqueeToggle.textContent = paused ? 'Tạm dừng chuyển động' : 'Chạy tiếp chuyển động';
  });
}

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
  siteHeader.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && siteHeader.classList.contains('nav-open')) { setMenu(false); menuToggle.focus(); }
  });
  document.addEventListener('click', (event) => {
    if (siteHeader.classList.contains('nav-open') && !siteHeader.contains(event.target)) setMenu(false);
  });
}
