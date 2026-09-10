const motionQuery = matchMedia('(min-width:821px) and (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
const heroStage = document.querySelector('.hero-stage');
const depthLayers = [...document.querySelectorAll('[data-depth]')];
let frame = 0;
let inView = true;
function drawDepth() {
  frame = 0;
  if (!heroStage || !motionQuery.matches || !inView) return;
  const bounds = heroStage.getBoundingClientRect();
  const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - bounds.top - bounds.height / 2) / innerHeight));
  for (const layer of depthLayers) layer.style.setProperty('--depth-y', `${(progress * Number(layer.dataset.depth)).toFixed(2)}px`);
}
function scheduleDepth() {
  if (!frame && inView && motionQuery.matches) frame = requestAnimationFrame(drawDepth);
}
function resetDepth() {
  cancelAnimationFrame(frame);
  frame = 0;
  for (const layer of depthLayers) layer.style.removeProperty('--depth-y');
  scheduleDepth();
}
if (heroStage && depthLayers.length) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; if (inView) scheduleDepth(); });
    observer.observe(heroStage);
  }
  addEventListener('scroll', scheduleDepth, { passive: true });
  addEventListener('resize', resetDepth, { passive: true });
  motionQuery.addEventListener('change', resetDepth);
  scheduleDepth();
}

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
      tile.style.setProperty('--pointer-x', `${(x * 14).toFixed(2)}deg`);
      tile.style.setProperty('--pointer-y', `${(-y * 11).toFixed(2)}deg`);
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
