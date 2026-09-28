/* Hai kênh liên hệ rõ tên, không dùng chân dung minh họa như ảnh nhân viên thật. */
(() => {
  if (document.querySelector('.consult-stack')) return;
  const stack = document.createElement('aside');
  stack.className = 'consult-stack';
  stack.setAttribute('aria-label', 'Liên hệ tư vấn nhanh');
  stack.innerHTML = '<a href="https://zalo.me/2076363329232219188?src=qr&f=1" target="_blank" rel="noopener" aria-label="Nhắn Zalo với PVI Thành Đô">Nhắn Zalo</a><a href="tel:0938072236" aria-label="Gọi tư vấn 0938 072 236">Gọi tư vấn</a>';
  document.body.appendChild(stack);
  const footer = document.querySelector('footer');
  if (footer && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      stack.classList.toggle('is-at-footer', entry.isIntersecting);
      stack.toggleAttribute('inert', entry.isIntersecting);
    }, { rootMargin: '0px 0px -40px 0px' }).observe(footer);
  }
})();
