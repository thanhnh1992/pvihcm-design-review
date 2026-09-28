// Tác vụ chung: in checklist và menu điện thoại.

document.querySelector('#print-button')?.addEventListener('click', () => print());

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
