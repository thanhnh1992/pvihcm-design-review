/* Hiệu ứng biểu đồ thị phần trong khối "Vì sao chọn PVI" (chép hành vi từ why-pvi-market.tsx của baohiempvi-vn).
   HTML đã in sẵn số cuối; script chỉ đưa về trạng thái chờ khi khối còn dưới màn hình rồi chạy:
   vòng xoay vào, lát vẽ lần lượt, chú giải trượt vào, số chạy từ 0, lát PVI bật ra kèm huy hiệu #1.
   Di chuột / chạm vào lát hoặc dòng chú giải để xem từng hãng. */
(() => {
  const root = document.querySelector('.wp-market');
  if (!root) return;
  const slices = [...root.querySelectorAll('.wp-slice')];
  const items = [...root.querySelectorAll('.wp-legend li')];
  const centerB = root.querySelector('.wp-center b');
  const centerS = root.querySelector('.wp-center span');
  const CIRC = (2 * Math.PI * 70).toFixed(2);
  const pct = (n) => `${n.toFixed(2).replace('.', ',')}%`;
  const val = (label) => Number(items.find((li) => li.dataset.label === label).dataset.value);
  let phase = 'done', t = 1, popped = true, active = null;

  function render() {
    root.dataset.phase = phase;
    if (popped) root.setAttribute('data-pop', ''); else root.removeAttribute('data-pop');
    const drawn = phase !== 'armed';
    slices.forEach((c) => {
      const label = c.dataset.label, isPvi = label === 'PVI';
      c.style.strokeDasharray = `${drawn ? c.dataset.len : 0} ${CIRC}`;
      c.style.transitionDelay = phase === 'play' ? `${250 + Number(c.dataset.i) * 130}ms` : '0ms';
      const lifted = isPvi ? popped || active === 'PVI' : active === label;
      c.style.transform = lifted ? `translate(${c.dataset.dx}px,${c.dataset.dy}px)` : 'none';
      if (active && active !== label) c.setAttribute('data-dim', ''); else c.removeAttribute('data-dim');
    });
    const k = phase === 'done' ? 1 : t;
    items.forEach((li) => {
      li.querySelector('b').textContent = pct(Number(li.dataset.value) * k);
      if (active && active !== li.dataset.label) li.setAttribute('data-dim', ''); else li.removeAttribute('data-dim');
    });
    const focus = items.find((li) => li.dataset.label === active) || items[0];
    centerB.textContent = pct(Number(focus.dataset.value) * k);
    centerS.textContent = focus.dataset.label === 'PVI' ? 'PVI · #1' : focus.dataset.full;
  }

  const setActive = (label) => { active = label; render(); };
  slices.forEach((c) => c.addEventListener('mouseenter', () => setActive(c.dataset.label)));
  items.forEach((li) => {
    li.addEventListener('mouseenter', () => setActive(li.dataset.label));
    li.addEventListener('focus', () => setActive(li.dataset.label));
    li.addEventListener('blur', () => setActive(null));
  });
  root.addEventListener('mouseleave', () => setActive(null));

  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Khối đang nằm trong màn hình lúc tải thì không làm tắt rồi chạy lại.
  if (root.getBoundingClientRect().top < innerHeight) return;

  phase = 'armed'; t = 0; popped = false; render();
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    io.disconnect();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      phase = 'play'; render();
      const t0 = performance.now();
      const tick = (now) => {
        const k = Math.min((now - t0) / 1700, 1);
        t = 1 - Math.pow(1 - k, 3);
        popped = t > 0.7;
        if (k >= 1) { phase = 'done'; popped = true; }
        render();
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }));
  }, { threshold: 0.35 });
  io.observe(root);
})();
