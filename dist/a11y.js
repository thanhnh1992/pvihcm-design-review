/* Bảng rộng vuốt ngang trên điện thoại: cho khung cuộn nhận focus bằng bàn phím
   (Tab rồi dùng phím mũi tên để cuộn) và gắn nhãn theo tiêu đề của mục chứa nó.
   Chỉ áp cho khung đang thật sự tràn ngang; kiểm lại khi đổi cỡ màn hình. */
(() => {
  const mark = () => {
    document.querySelectorAll('.pd-scroll, .fire-compare, .fire-ref, main table').forEach((el) => {
      const box = el.tagName === 'TABLE' ? el.parentElement : el;
      const cs = getComputedStyle(box);
      const scrolls = /(auto|scroll)/.test(cs.overflowX) && box.scrollWidth > box.clientWidth + 1;
      if (scrolls) {
        if (!box.hasAttribute('tabindex')) box.setAttribute('tabindex', '0');
        box.setAttribute('role', 'region');
        if (!box.hasAttribute('aria-label')) {
          const h = box.closest('section')?.querySelector('h2');
          box.setAttribute('aria-label', 'Bảng cuộn ngang' + (h ? ': ' + h.textContent.trim() : ''));
        }
        box.dataset.a11yScroll = '1';
      } else if (box.dataset.a11yScroll) {
        box.removeAttribute('tabindex'); box.removeAttribute('role'); box.removeAttribute('aria-label');
        delete box.dataset.a11yScroll;
      }
    });
  };
  mark();
  let t = 0;
  addEventListener('resize', () => { clearTimeout(t); t = setTimeout(mark, 200); }, { passive: true });
  // bảng biểu phí cháy nổ vẽ lại khi đổi thẻ
  document.getElementById('fire-tabs')?.addEventListener('click', () => setTimeout(mark, 0));
})();
