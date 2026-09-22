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

  list.querySelectorAll('dd').forEach((dd, k) => {
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
  list.classList.add('odo-ready');

  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    io.disconnect();
    requestAnimationFrame(() => {
      list.classList.add('is-counting');
      setTimeout(() => list.classList.add('is-done'), 2800);
    });
  }, { threshold: 0.35 });
  io.observe(list);
  }
})();
