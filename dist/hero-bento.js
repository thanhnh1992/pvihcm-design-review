/* "Đèn soi" của lưới bento ở trang chủ: lần lượt làm nổi một ô sản phẩm, 2,8 giây mỗi ô.
   Dừng khi khách rê chuột hoặc dùng bàn phím trong lưới, khi lưới ra khỏi màn hình hay tab bị ẩn.
   Máy bật giảm chuyển động thì không chạy. Không có JS thì lưới vẫn đầy đủ và bấm được. */
(() => {
  const grid = document.querySelector('[data-bento]');
  if (!grid || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const tiles = [...grid.querySelectorAll('.bt-photo')];
  if (tiles.length < 2) return;
  let i = -1, timer = 0, visible = true, hold = false;
  const step = () => {
    tiles[i]?.classList.remove('is-lit');
    i = (i + 1) % tiles.length;
    tiles[i].classList.add('is-lit');
  };
  const run = () => { clearInterval(timer); timer = 0; if (visible && !hold && !document.hidden) { if (i < 0) step(); timer = setInterval(step, 2800); } };
  const pause = (on) => { hold = on; grid.classList.toggle('is-paused', on); run(); };
  grid.addEventListener('pointerenter', () => pause(true));
  grid.addEventListener('pointerleave', () => pause(false));
  grid.addEventListener('focusin', () => pause(true));
  grid.addEventListener('focusout', (e) => { if (!grid.contains(e.relatedTarget)) pause(false); });
  document.addEventListener('visibilitychange', run);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; run(); }, { threshold: 0.2 }).observe(grid);
  setTimeout(run, 900); // chờ các ô hiện xong
})();
