(() => {
  const section = document.querySelector('#doi-tac-pvi');
  if (!section) return;

  const viewport = section.querySelector('[data-pt-viewport]');
  const controls = section.querySelector('[data-pt-controls]');
  const toggle = controls.querySelector('[data-pt-toggle]');
  const track = viewport.querySelector('.pt-track');
  const cards = Array.from(track.children);
  const [firstCard, secondCard] = cards;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const pixelsPerSecond = 34;
  let paused = reduceMotion.matches;
  let visible = false;
  let hovered = false;
  let focused = false;
  let frame;
  let lastTime;
  let position;
  let cycleWidth;

  // Bốn ô có thể cùng xuất hiện. Thêm năm ô đầu để lấp đầy cuối vòng.
  const copies = cards.slice(0, 5).map(card => {
    const copy = card.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    for (const link of copy.querySelectorAll('a')) link.tabIndex = -1;
    return copy;
  });
  track.append(...copies);

  function measureCycle() {
    return copies[0].getBoundingClientRect().left - firstCard.getBoundingClientRect().left;
  }

  function move(direction) {
    const lap = measureCycle();
    const step = secondCard.getBoundingClientRect().left - firstCard.getBoundingClientRect().left;
    const current = viewport.scrollLeft;
    const target = Math.round(current + direction * step);
    const next = (target + lap) % lap;
    const wrapped = target < 0 || current >= lap || target >= lap;
    viewport.scrollTo({ left: next, behavior: reduceMotion.matches || wrapped ? 'auto' : 'smooth' });
  }

  function tick(time) {
    if (lastTime !== undefined) {
      const elapsed = Math.min(time - lastTime, 64);
      position = (position + elapsed * pixelsPerSecond / 1000) % cycleWidth;
      viewport.scrollLeft = position;
    }
    lastTime = time;
    frame = requestAnimationFrame(tick);
  }

  function schedule() {
    cancelAnimationFrame(frame);
    if (visible && !paused && !hovered && !focused && !document.hidden) {
      cycleWidth = measureCycle();
      position = viewport.scrollLeft % cycleWidth;
      lastTime = undefined;
      if (cycleWidth > 0) frame = requestAnimationFrame(tick);
    }
  }

  function setPaused(value) {
    paused = value;
    toggle.textContent = paused ? 'Chạy tiếp' : 'Tạm dừng';
    schedule();
  }

  toggle.addEventListener('click', () => setPaused(!paused));
  for (const [selector, direction] of [['[data-pt-previous]', -1], ['[data-pt-next]', 1]]) {
    controls.querySelector(selector).addEventListener('click', () => {
      setPaused(true);
      move(direction);
    });
  }

  viewport.addEventListener('pointerenter', event => {
    if (event.pointerType !== 'mouse') return;
    hovered = true;
    schedule();
  });
  viewport.addEventListener('pointerleave', () => {
    hovered = false;
    schedule();
  });
  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch') setPaused(true);
  });
  viewport.addEventListener('focusin', () => {
    focused = true;
    schedule();
  });
  viewport.addEventListener('focusout', event => {
    focused = viewport.contains(event.relatedTarget);
    schedule();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    }).observe(viewport);
  } else {
    visible = true;
  }
  document.addEventListener('visibilitychange', schedule);
  window.addEventListener('resize', schedule);
  reduceMotion.addEventListener('change', event => {
    if (event.matches) setPaused(true);
  });
  controls.hidden = false;
  setPaused(paused);
})();
