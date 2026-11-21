(() => {
  const section = document.querySelector('#doi-tac-pvi');
  if (!section) return;

  const viewport = section.querySelector('[data-pt-viewport]');
  const controls = section.querySelector('[data-pt-controls]');
  const toggle = controls.querySelector('[data-pt-toggle]');
  const [firstCard, secondCard] = viewport.querySelectorAll('li');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduceMotion.matches;
  let visible = false;
  let hovered = false;
  let focused = false;
  let timer;

  function move(direction) {
    const step = secondCard.offsetLeft - firstCard.offsetLeft;
    const limit = viewport.scrollWidth - viewport.clientWidth;
    const position = viewport.scrollLeft;
    const atEnd = direction > 0 && position >= limit - 2;
    const atStart = direction < 0 && position <= 2;
    const next = atEnd ? 0 : atStart ? limit : Math.max(0, Math.min(limit, position + direction * step));
    viewport.scrollTo({ left: next, behavior: reduceMotion.matches || atEnd || atStart ? 'auto' : 'smooth' });
  }

  function schedule() {
    clearInterval(timer);
    if (visible && !paused && !hovered && !focused && !document.hidden) {
      timer = setInterval(() => move(1), 3400);
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
      move(direction);
      schedule();
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
  reduceMotion.addEventListener('change', event => {
    if (event.matches) setPaused(true);
  });
  controls.hidden = false;
  setPaused(paused);
})();
