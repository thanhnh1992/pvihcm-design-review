/* Phần mở đầu trang chủ (ảnh tòa nhà PVI): ảnh nghiêng 3D theo chuột (chủ site yêu cầu 09/11/2026).
   Chuột đi tới đâu ảnh nghiêng theo tới đó, có quán tính (mỗi khung hình chỉ đi một phần
   quãng đường còn lại) nên chuyển động mềm, không giật. Logo và chữ trôi ngược chiều nhẹ
   để mắt đọc ra 3 lớp sâu khác nhau. JS chỉ đặt biến --mx/--my trên .intro, CSS lo phần hiển thị.
   Chỉ chạy trên máy có chuột; điện thoại dùng chuyển động trôi chậm bằng CSS trong intro.css. */
(() => {
  const intro = document.querySelector('.intro');
  if (!intro) return;
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
