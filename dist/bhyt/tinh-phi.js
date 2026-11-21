/* Bộ tính BHYT hộ gia đình và BHXH tự nguyện, sinh từ tools/gen-bhyt.mjs (số liệu tools/data/bhyt.mjs). Không sửa tay. */
(() => {
  const vnd = (n) => Math.round(n).toLocaleString('vi-VN').replace(/,/g, '.') + ' đ';
  const box = document.querySelector('[data-bhyt-calc]');
  if (box) {
    const M = [113850,79695,68310,56925,45540];
    const ORD = ["Người thứ nhất","Người thứ hai","Người thứ ba","Người thứ tư"];
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
  }
  const tn = document.querySelector('[data-tn-calc]');
  if (tn) {
    const SUP = {"khac":66000,"dan-toc":99000,"can-ngheo":214500,"ngheo":264000};
    const MIN = 1500000, MAX = 50600000, RATE = 0.22;
    const inc = tn.querySelector('#tn-income');
    const render = () => {
      let x = Number(inc.value) || MIN;
      const clamped = Math.min(MAX, Math.max(MIN, x));
      const k = Number((tn.querySelector('input[name="tn-term"]:checked') || {}).value || 12);
      const sup = SUP[tn.querySelector('#tn-group').value] || 0;
      const full = Math.round(clamped * RATE), m = full - sup;
      tn.querySelector('[data-tn-full]').textContent = vnd(full);
      tn.querySelector('[data-tn-sup]').textContent = '− ' + vnd(sup);
      tn.querySelector('[data-tn-month]').textContent = vnd(m);
      tn.querySelector('[data-tn-total]').textContent = vnd(m * k);
      tn.querySelector('[data-tn-ctx]').textContent = '(' + (k === 1 ? '1 tháng' : k + ' tháng') + (clamped !== x ? ' · thu nhập tính trong khung ' + vnd(MIN) + ' đến ' + vnd(MAX) : '') + ')';
    };
    tn.addEventListener('input', render);
    tn.addEventListener('change', () => { const x = Number(inc.value); if (x && (x < MIN || x > MAX)) inc.value = Math.min(MAX, Math.max(MIN, x)); render(); });
    render();
  }
})();
