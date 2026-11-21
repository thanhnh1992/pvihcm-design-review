/* Bộ tính BHYT hộ gia đình, sinh từ tools/gen-bhyt.mjs (số liệu tools/data/bhyt.mjs). Không sửa tay. */
(() => {
  const box = document.querySelector('[data-bhyt-calc]');
  if (!box) return;
  const M = [113850,79695,68310,56925,45540];
  const ORD = ["Người thứ nhất","Người thứ hai","Người thứ ba","Người thứ tư"];
  const vnd = (n) => Math.round(n).toLocaleString('vi-VN').replace(/,/g, '.') + ' đ';
  const out = box.querySelector('#bh-n');
  let n = 1;
  const render = () => {
    const k = Number((box.querySelector('input[name="bh-term"]:checked') || {}).value || 12);
    out.textContent = n;
    const rows = Array.from({ length: n }, (_, i) => ({ who: i < 4 ? ORD[i] : 'Người thứ ' + (i + 1), sum: M[Math.min(i, M.length - 1)] * k }));
    box.querySelector('[data-total]').textContent = vnd(rows.reduce((a, r) => a + r.sum, 0));
    box.querySelector('[data-ctx]').textContent = '(' + n + ' người · ' + k + ' tháng)';
    box.querySelector('[data-break]').innerHTML = rows.map((r) => '<li><span>' + r.who + '</span><b>' + vnd(r.sum) + '</b></li>').join('');
    box.querySelector('[data-step="-1"]').disabled = n <= 1;
    box.querySelector('[data-step="1"]').disabled = n >= 10;
  };
  box.addEventListener('click', (e) => { const b = e.target.closest('[data-step]'); if (!b) return; n = Math.min(10, Math.max(1, n + Number(b.dataset.step))); render(); });
  box.addEventListener('change', render);
  render();
})();
