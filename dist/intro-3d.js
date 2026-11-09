/* Phần mở đầu trang chủ (ảnh tòa nhà PVI), chủ site yêu cầu 09/11/2026:
   1) Đặt lớp phát sáng của 2 ngôi sao PVI trên tòa nhà khớp đúng chỗ trong ảnh. Ảnh dùng
      object-fit:cover nên bị cắt khác nhau theo khổ màn hình; vị trí tính lại mỗi khi khung đổi cỡ.
      Tọa độ data-box tính theo ảnh gốc 1668x943 (x y rộng cao).
   2) Ảnh nghiêng 3D theo chuột, có quán tính nên mềm, không giật. JS chỉ đặt --mx/--my trên .intro,
      CSS lo phần hiển thị. Chỉ chạy khi có chuột; điện thoại dùng chuyển động trôi chậm trong intro.css. */
(() => {
  const intro = document.querySelector('.intro');
  if (!intro) return;

  // 1) Vị trí ngôi sao
  const pic = intro.querySelector('.intro-pic');
  const stars = [...intro.querySelectorAll('.intro-star[data-box]')];
  const W = 1668, H = 943, POS_Y = 0.45; // khớp object-position:50% 45% trong intro.css
  const place = () => {
    const w = pic.clientWidth, h = pic.clientHeight;
    if (!w || !h) return;
    const s = Math.max(w / W, h / H);
    const ox = (w - W * s) * 0.5, oy = (h - H * s) * POS_Y;
    stars.forEach((el) => {
      const [x, y, bw, bh] = el.dataset.box.split(' ').map(Number);
      el.style.left = `${(ox + x * s).toFixed(1)}px`;
      el.style.top = `${(oy + y * s).toFixed(1)}px`;
      el.style.width = `${(bw * s).toFixed(1)}px`;
      el.style.height = `${(bh * s).toFixed(1)}px`;
      el.classList.add('is-placed');
    });
  };
  if (pic && stars.length) {
    if (pic.complete) place(); else pic.addEventListener('load', place);
    if ('ResizeObserver' in window) new ResizeObserver(place).observe(pic);
    else addEventListener('resize', place);
  }

  // 2) Nghiêng 3D theo chuột
  const fine = matchMedia('(hover:hover) and (pointer:fine)');
  const calm = matchMedia('(prefers-reduced-motion: reduce)');
  let tx = 0, ty = 0, x = 0, y = 0, frame = 0;

  const step = () => {
    x += (tx - x) * 0.07;
    y += (ty - y) * 0.07;
    intro.style.setProperty('--mx', x.toFixed(4));
    intro.style.setProperty('--my', y.toFixed(4));
    // Gần tới đích thì dừng vòng lặp, không tốn pin khi chuột đứng yên.
    frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.0005 ? requestAnimationFrame(step) : 0;
  };
  const go = () => { if (!frame) frame = requestAnimationFrame(step); };

  intro.addEventListener('pointermove', (e) => {
    if (!fine.matches || calm.matches || e.pointerType !== 'mouse') return;
    const r = intro.getBoundingClientRect();
    tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
    intro.classList.add('is-3d');
    go();
  });
  intro.addEventListener('pointerleave', () => { tx = 0; ty = 0; go(); });
  calm.addEventListener('change', () => { if (calm.matches) { tx = ty = x = y = 0; intro.style.setProperty('--mx', 0); intro.style.setProperty('--my', 0); } });
})();
