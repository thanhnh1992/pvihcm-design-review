/* Số chạy kiểu đồng hồ số cho khối "Niềm tin cần bằng chứng rõ ràng".
   - Số thật vẫn nằm trong HTML (không JS, máy đọc màn hình, Google đều đọc được).
   - Mỗi chữ số thành một cột 0-9 lặp 3 vòng; CSS quay cột tới đúng chữ số.
   - Chạy đúng một lần khi khối vào màn hình; máy bật giảm chuyển động thì giữ số tĩnh. */
(() => {
  const list = document.querySelector('.proof-points');
  if (!list || !('IntersectionObserver' in window)) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  ready.then(init);

  function init() {
  const strip = '<span class="odo-strip" aria-hidden="true">' +
    Array.from({ length: 30 }, (_, n) => `<span>${n % 10}</span>`).join('') + '</span>';

  const originals = new Map();
  const build = () => list.querySelectorAll('dd').forEach((dd, k) => {
    originals.set(dd, dd.innerHTML);
    const lead = dd.firstChild;
    if (!lead || lead.nodeType !== 3) return;
    const text = lead.textContent;
    const full = dd.textContent.replace(/\s+/g, ' ').trim();
    // Đo độ rộng thật của từng chữ số trong đúng ngữ cảnh dd (font, cỡ, letter-spacing)
    // để cột rộng bằng chữ số cuối: số dừng lại trông y hệt chữ tĩnh ban đầu.
    const probe = document.createElement('span');
    probe.style.cssText = 'font-size:inherit;letter-spacing:inherit;position:absolute;visibility:hidden;white-space:pre';
    dd.appendChild(probe);
    const fs = parseFloat(getComputedStyle(dd).fontSize) || 16;
    const widthOf = (ch) => { probe.textContent = ch; return probe.getBoundingClientRect().width / fs; };
    let col = 0;
    const html = [...text].map((ch) => {
      if (/\d/.test(ch)) return `<span class="odo-col" style="--d:${ch};--i:${col++};--w:${widthOf(ch).toFixed(3)}em">${strip}</span>`;
      return `<span aria-hidden="true">${ch === ' ' ? '&nbsp;' : ch}</span>`;
    }).join('');
    probe.remove();
    const odo = document.createElement('span');
    odo.className = 'odo';
    odo.setAttribute('aria-hidden', 'true');
    odo.innerHTML = html;
    dd.replaceChild(odo, lead);
    dd.parentElement.style.setProperty('--k', k);
    dd.style.setProperty('--k', k);
    dd.querySelectorAll(':scope > span:not(.odo)').forEach((unit) => {
      unit.classList.add('odo-unit');
      unit.setAttribute('aria-hidden', 'true');
      unit.style.setProperty('--k', k);
    });
    const sr = document.createElement('span');
    sr.className = 'odo-sr';
    sr.textContent = full;
    dd.appendChild(sr);
    dd.querySelectorAll('.odo-col').forEach((c) => c.style.setProperty('--k', k));
  });

  const restore = () => { for (const [dd, html] of originals) dd.innerHTML = html; list.classList.remove('odo-ready', 'is-counting'); };

  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    io.disconnect();
    build();
    list.classList.add('odo-ready');
    // hai khung hình: khung đầu vẽ cột ở vị trí 0, khung sau mới chạy, nếu không trình duyệt gộp lại và bỏ qua chuyển động
    requestAnimationFrame(() => requestAnimationFrame(() => {
      list.classList.add('is-counting');
      // Chạy xong thì trả lại chữ số tĩnh: mã trang không còn chuỗi 0-9 lặp,
      // Google và máy đọc màn hình chỉ thấy đúng con số cuối.
      setTimeout(() => { list.classList.add('is-done'); restore(); }, 2900);
    }));
  }, { threshold: 0.35 });
  io.observe(list);
  }
})();

/* Dải quan hệ hợp tác: hiệu ứng chạy dịch đi nửa dãy thẻ. Trên màn rộng, cả bốn thẻ
   đã hiện hết nên dãy hụt so với khung: lúc chạy sẽ hở một mảng trống bên phải và
   cắt mất thẻ đầu. Vừa khung thì cho đứng yên và ẩn luôn nút tạm dừng cho khỏi thừa. */
(() => {
  const track = document.querySelector('[data-marquee-track]');
  const toggle = document.querySelector('[data-marquee-toggle]');
  if (!track || !track.parentElement) return;
  const apply = () => {
    // Dãy gồm hai bản giống nhau, hiệu ứng dịch đúng một bản. Chạy liền mạch chỉ khi
    // một bản đã phủ kín khung; không thì để đứng yên.
    const fits = track.scrollWidth / 2 <= track.parentElement.clientWidth + 8;
    track.style.animation = fits ? 'none' : '';
    track.style.justifyContent = fits ? 'center' : '';
    // CSS đặt display cho nút nên thuộc tính hidden không đủ, phải đặt thẳng style.
    if (toggle) { toggle.hidden = fits; toggle.style.display = fits ? 'none' : ''; }
  };
  apply();
  let t = 0;
  addEventListener('resize', () => { clearTimeout(t); t = setTimeout(apply, 250); }, { passive: true });
})();
