/* Lọc thẻ sản phẩm theo nhóm trên trang /san-pham/. Không có JS thì hiện đủ thẻ. */
(() => {
  const bar = document.querySelector('.sp-filter');
  if (!bar) return;
  const cards = [...document.querySelectorAll('.sp-card')];
  const empty = document.querySelector('.sp-empty');
  bar.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-filter]');
    if (!b) return;
    const f = b.dataset.filter;
    bar.querySelectorAll('button').forEach((x) => { const on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', String(on)); });
    let shown = 0;
    cards.forEach((c) => { const ok = f === 'all' || c.dataset.group === f; c.hidden = !ok; shown += ok; });
    if (empty) empty.hidden = shown > 0;
  });
})();
