/* Thẻ sản phẩm chạy vòng ở đầu trang chủ.
   - Các thẻ chia đều trên một quỹ đạo tròn nghiêng: phía trước (dưới) to và rõ, phía sau (trên) nhỏ và nhạt hơn,
     nhưng thẻ nào cũng luôn nhìn thấy (chủ site chốt phương án A).
   - Tự quay chậm; rê chuột vào khu thẻ thì quay nhanh gấp 3; rê lên đúng một thẻ thì gần dừng để dễ bấm.
   - Lăn chuột trong khu thẻ: đẩy vòng quay theo chiều lăn rồi trôi chậm dần; trang vẫn cuộn bình thường.
   - Điện thoại: tự quay chậm, vuốt ngang để quay (vuốt dọc vẫn cuộn trang).
   - Dừng khi khu thẻ ra khỏi màn hình hoặc tab ẩn. Máy bật giảm chuyển động: giữ lưới tĩnh. */
(() => {
  const orbit = document.querySelector('[data-orbit]');
  if (!orbit) return;

  // Thẻ sản phẩm chưa có trang (data-soon): bấm vào hiện "Coming soon – Sắp ra mắt", không chuyển trang.
  let toast, hideT = 0;
  const showSoon = (card) => {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'orbit-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      orbit.parentElement.appendChild(toast);
    }
    toast.innerHTML = `<b>Coming soon · Sắp ra mắt</b><span>${card.dataset.title} đang được hoàn thiện. Cần tư vấn ngay? Gọi <a href="tel:0938072236">0938 072 236</a> hoặc nhắn <a href="https://zalo.me/2076363329232219188?src=qr&amp;f=1" target="_blank" rel="noopener">Zalo</a>.</span>`;
    toast.classList.add('is-on');
    clearTimeout(hideT);
    hideT = setTimeout(() => toast.classList.remove('is-on'), 4500);
  };
  orbit.querySelectorAll('[data-soon]').forEach((c) => c.addEventListener('click', () => showSoon(c)));
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = [...orbit.querySelectorAll('.orbit-card')];
  const n = cards.length;
  if (n < 2) return;

  const TAU = Math.PI * 2;
  const BASE = TAU / 22;          // tốc độ thường: 22 giây một vòng
  const FAST = BASE * 3;          // rê chuột vào khu thẻ
  const SLOW = BASE * 0.12;       // rê chuột lên một thẻ
  const S_BACK = 0.6, S_FRONT_BONUS = 0.12, S_MAX = (1 + S_FRONT_BONUS) * 1.05;
  orbit.classList.add('is-live');
  // Nhiều hơn 4 sản phẩm thì thu nhỏ thẻ cho vòng không chật.

  let W = 0, H = 0, angle = 0, speed = BASE, target = BASE, boost = 0;
  let inArea = false, hot = null, running = false, last = 0, raf = 0, visible = true;
  // Nhiều hơn 4 sản phẩm thì thu nhỏ thẻ cho vòng không chật; màn hình hẹp giữ thẻ to hơn để nhãn đọc được.
  const sizeCards = () => {
    if (n <= 4) return orbit.style.removeProperty('--cw');
    const min = orbit.clientWidth < 480 ? 48 : 37;
    orbit.style.setProperty('--cw', `${Math.max(min, 55 * Math.sqrt(4 / n)).toFixed(1)}%`);
  };
  const measure = () => { sizeCards(); W = orbit.clientWidth; H = orbit.clientHeight; };
  measure();
  if ('ResizeObserver' in window) new ResizeObserver(() => { measure(); place(); }).observe(orbit);

  function place() {
    const cw = cards[0].offsetWidth, ch = cards[0].offsetHeight;
    // Quỹ đạo co theo cỡ thẻ lớn nhất (thẻ trước nhất đang được rê chuột) để không tràn khỏi khung.
    const rx = Math.max(0, Math.min(W * 0.26, W / 2 - (cw * S_MAX) / 2 - 4));
    const ry = Math.max(0, Math.min(H * 0.27, H / 2 - (ch * S_MAX) / 2 - 4));
    cards.forEach((c, i) => {
      const t = angle + (i * TAU) / n;
      const d = (Math.cos(t) + 1) / 2;               // 1 = phía trước (dưới), 0 = phía sau (trên)
      // Thẻ sau nhỏ (0,6), thẻ trước to (1,0) và riêng vị trí trước nhất phóng thêm tới 1,12:
      // thẻ đang hiện ra to hơn thẻ phía sau khoảng 1,8 lần.
      const front = Math.max(0, (d - 0.8) / 0.2);
      const s = (S_BACK + (1 - S_BACK) * d + S_FRONT_BONUS * front) * (c === hot ? 1.05 : 1);
      c.style.transform = `translate(-50%,-50%) translate3d(${(Math.sin(t) * rx).toFixed(1)}px,${(Math.cos(t) * ry).toFixed(1)}px,0) scale(${s.toFixed(3)})`;
      c.style.opacity = (0.72 + 0.28 * d).toFixed(3);
      c.style.zIndex = c === hot ? 200 : 10 + Math.round(d * 100);
    });
  }

  function frame(now) {
    raf = 0;
    const dt = Math.min((now - (last || now)) / 1000, 0.05);
    last = now;
    target = hot ? SLOW : inArea ? FAST : BASE;
    speed += (target - speed) * Math.min(1, dt * 3);   // tăng/giảm tốc mượt
    boost *= Math.exp(-dt * 2.2);                       // lực lăn chuột/vuốt trôi chậm dần
    if (Math.abs(boost) < 0.001) boost = 0;
    if (!dragging) angle = (angle + (speed + boost) * dt) % TAU;
    place();
    loop();
  }
  const loop = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame); else if (!visible || document.hidden) last = 0; };

  // Rê chuột
  orbit.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') inArea = true; });
  orbit.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { inArea = false; hot = null; } });
  cards.forEach((c) => {
    c.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { hot = c; c.classList.add('is-hot'); } });
    c.addEventListener('pointerleave', () => { if (hot === c) hot = null; c.classList.remove('is-hot'); });
    c.addEventListener('focus', () => { hot = c; c.classList.add('is-hot'); });
    c.addEventListener('blur', () => { if (hot === c) hot = null; c.classList.remove('is-hot'); });
  });

  // Lăn chuột: không chặn cuộn trang, chỉ cộng thêm đà quay
  orbit.addEventListener('wheel', (e) => {
    const dy = Math.max(-200, Math.min(200, e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY));
    boost = Math.max(-8, Math.min(8, boost + dy * 0.02));
  }, { passive: true });

  // Vuốt ngang (cảm ứng); vuốt dọc để trình duyệt cuộn trang nhờ touch-action: pan-y
  let dragging = false, moved = false, sx = 0, lx = 0, lt = 0, vel = 0, pid = null;
  orbit.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    pid = e.pointerId; sx = lx = e.clientX; lt = performance.now(); vel = 0; moved = false; dragging = true;
  });
  orbit.addEventListener('pointermove', (e) => {
    if (!dragging || e.pointerId !== pid) return;
    const dx = e.clientX - lx, now = performance.now();
    if (Math.abs(e.clientX - sx) > 8) { moved = true; orbit.classList.add('is-dragging'); }
    const da = (dx / Math.max(W, 1)) * Math.PI;      // vuốt nửa bề ngang = quay 90 độ
    angle = (angle + da) % TAU;
    vel = da / Math.max((now - lt) / 1000, 0.008);
    lx = e.clientX; lt = now;
  });
  const end = (e) => {
    if (!dragging || e.pointerId !== pid) return;
    dragging = false; pid = null; orbit.classList.remove('is-dragging');
    if (moved) boost = Math.max(-8, Math.min(8, vel * 0.6));
  };
  orbit.addEventListener('pointerup', end);
  orbit.addEventListener('pointercancel', end);
  // Vừa vuốt xong thì không tính là bấm vào thẻ
  orbit.addEventListener('click', (e) => { if (moved) { e.preventDefault(); moved = false; } }, true);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((es) => { visible = es.some((x) => x.isIntersecting); loop(); }).observe(orbit);
  }
  document.addEventListener('visibilitychange', loop);
  place();
  loop();
})();
