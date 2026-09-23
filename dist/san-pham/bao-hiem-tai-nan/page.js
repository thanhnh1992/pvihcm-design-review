/* Bộ tính phí tai nạn 24/24. Công thức chép nguyên từ accident-data.ts:
   phí = phí gốc × (1 − giảm theo bậc) × tỷ lệ ngắn hạn, làm tròn theo đồng. */
(() => {
  const PLANS = [{"id":"20","sum":20,"label":"20 triệu","basePremium":50000},{"id":"50","sum":50,"label":"50 triệu","basePremium":125000},{"id":"100","sum":100,"label":"100 triệu","basePremium":250000},{"id":"150","sum":150,"label":"150 triệu","basePremium":375000},{"id":"200","sum":200,"label":"200 triệu","basePremium":500000}];
  const TIERS = [{"id":"bac-0","label":"1-19 người","shortLabel":"1-19","min":1,"max":19,"discount":0},{"id":"bac-1","label":"20-100 người","shortLabel":"20-100","min":20,"max":100,"discount":0.2},{"id":"bac-2","label":"101-300 người","shortLabel":"101-300","min":101,"max":300,"discount":0.35},{"id":"bac-3","label":"301-500 người","shortLabel":"301-500","min":301,"max":500,"discount":0.5},{"id":"bac-4","label":"Từ 501 người trở lên","shortLabel":"501+","min":501,"max":null,"discount":0.55}];
  const SHORT = [{"months":1,"rate":0.2},{"months":2,"rate":0.3},{"months":3,"rate":0.4},{"months":4,"rate":0.5},{"months":5,"rate":0.6},{"months":6,"rate":0.7},{"months":7,"rate":0.75},{"months":8,"rate":0.8},{"months":9,"rate":0.85},{"months":10,"rate":0.9},{"months":11,"rate":0.95},{"months":12,"rate":1}];
  const fmt = (n) => Math.round(n).toLocaleString('vi-VN') + ' đ';
  const $ = (id) => document.getElementById(id);
  const plan = $('acc-plan'), n = $('acc-n'), term = $('acc-term');
  if (!plan) return;
  function run() {
    const p = PLANS.find((x) => x.id === plan.value);
    const count = Number(n.value);
    const months = Number(term.value);
    const ok = Number.isInteger(count) && count >= 1 && count <= 100000;
    if (!ok) { $('acc-explain').textContent = 'Nhập số người là số nguyên từ 1 trở lên.'; ['acc-per','acc-tier','acc-count','acc-total'].forEach((id) => { $(id).textContent = '…'; }); return; }
    let ti = TIERS.findIndex((t) => count >= t.min && (t.max === null || count <= t.max)); if (ti < 0) ti = 0;
    const tier = TIERS[ti];
    const rate = (SHORT.find((s) => s.months === months) || { rate: 1 }).rate;
    const per = Math.round(p.basePremium * (1 - tier.discount) * rate);
    $('acc-per').textContent = fmt(per);
    $('acc-tier').textContent = tier.discount ? tier.label + ', giảm ' + Math.round(tier.discount * 100) + '%' : tier.label + ', phí gốc';
    $('acc-count').textContent = count.toLocaleString('vi-VN') + ' người';
    $('acc-total').textContent = fmt(per * count);
    $('acc-explain').textContent = 'Gói ' + p.label + ': ' + fmt(p.basePremium) + (tier.discount ? ' × ' + Math.round((1 - tier.discount) * 100) + '%' : '') + (rate !== 1 ? ' × ' + Math.round(rate * 100) + '% (thời hạn ' + months + ' tháng)' : '') + ' = ' + fmt(per) + ' mỗi người.';
  }
  [plan, n, term].forEach((el) => { el.addEventListener('input', run); el.addEventListener('change', run); });
  $('acc-form').addEventListener('submit', (e) => e.preventDefault());
  run();
})();
