/* Cụm liên hệ nổi, chép bố cục ba nút của baohiempvi-vn:
   Zalo (0938 072 236) · Gọi điện · Chat với chuyên viên (đi thẳng Zalo OA).
   Không có hộp thoại, không có bước chọn: bấm là mở đúng kênh. */
(() => {
  if (document.querySelector('.consult-stack')) return;
  const ZALO_PHONE = 'https://zalo.me/0938072236';
  const ZALO_OA = 'https://zalo.me/2076363329232219188?src=qr&f=1';
  const HEADSET = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h3v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2ZM20 14h-3v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-1-2ZM17 20c0 1-2 2-5 2"/></svg>';

  const stack = document.createElement('aside');
  stack.className = 'consult-stack';
  stack.setAttribute('aria-label', 'Liên hệ tư vấn nhanh');
  stack.innerHTML =
    `<a class="consult-action consult-zalo" href="${ZALO_PHONE}" target="_blank" rel="noopener" aria-label="Nhắn Zalo 0938 072 236"><span class="consult-zalo-mark" aria-hidden="true">Z</span><span class="consult-tip">Zalo 0938 072 236</span></a>` +
    `<a class="consult-action consult-phone" href="tel:0938072236" aria-label="Gọi tư vấn 0938 072 236">${HEADSET}<span class="consult-tip">Gọi 0938 072 236</span></a>` +
    `<span class="consult-advisor-motion"><a class="consult-advisor" href="${ZALO_OA}" target="_blank" rel="noopener" aria-label="Chat với chuyên viên tư vấn qua Zalo"><span class="consult-advisor-photo"><img src="/assets/pvi-support-advisor-168.webp" alt="" width="68" height="68"></span><span class="consult-advisor-label"><b>Chuyên viên tư vấn</b><small>Chat ngay qua Zalo</small></span></a></span>`;
  document.body.appendChild(stack);

  // Tới chân trang thì ẩn: chân trang đã có đủ kênh liên hệ, cụm nút chỉ che mất địa chỉ.
  const footer = document.querySelector('footer');
  if (footer && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      stack.classList.toggle('is-at-footer', entry.isIntersecting);
      stack.toggleAttribute('inert', entry.isIntersecting);
    }, { rootMargin: '0px 0px -40px 0px' }).observe(footer);
  }
})();
