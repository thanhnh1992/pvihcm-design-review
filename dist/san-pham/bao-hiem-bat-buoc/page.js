/* Bộ tính phí TNDS. Dữ liệu và công thức chép nguyên từ tnds-data.ts của baohiempvi-vn:
   dòng thường lấy thẳng phí; taxi = 170% xe kinh doanh cùng số chỗ; tập lái = 120% xe cùng chủng loại;
   xe chuyên dùng khác = 120% xe tải cùng trọng tải; kinh doanh trên 25 chỗ = 4.813.000đ + 30.000đ × (số chỗ − 25). */
(() => {
  const DATA = [{"id":"passenger","label":"Xe chở người","usages":[{"id":"private","label":"Không kinh doanh vận tải","rows":[{"id":"private-under-6","label":"Dưới 6 chỗ","baseFee":437000,"note":null,"derive":null,"rate":null},{"id":"private-6-11","label":"Từ 6 đến 11 chỗ","baseFee":794000,"note":null,"derive":null,"rate":null},{"id":"private-12-24","label":"Từ 12 đến 24 chỗ","baseFee":1270000,"note":null,"derive":null,"rate":null},{"id":"private-over-24","label":"Trên 24 chỗ","baseFee":1825000,"note":null,"derive":null,"rate":null},{"id":"private-pickup","label":"Pickup, minivan chở người & hàng","baseFee":437000,"note":null,"derive":null,"rate":null}]},{"id":"business","label":"Kinh doanh vận tải","rows":[{"id":"business-under-6","label":"Dưới 6 chỗ","baseFee":756000,"note":null,"derive":null,"rate":null},{"id":"business-6","label":"6 chỗ","baseFee":929000,"note":null,"derive":null,"rate":null},{"id":"business-7","label":"7 chỗ","baseFee":1080000,"note":null,"derive":null,"rate":null},{"id":"business-8","label":"8 chỗ","baseFee":1253000,"note":null,"derive":null,"rate":null},{"id":"business-9","label":"9 chỗ","baseFee":1404000,"note":null,"derive":null,"rate":null},{"id":"business-10","label":"10 chỗ","baseFee":1512000,"note":null,"derive":null,"rate":null},{"id":"business-11","label":"11 chỗ","baseFee":1656000,"note":null,"derive":null,"rate":null},{"id":"business-12","label":"12 chỗ","baseFee":1822000,"note":null,"derive":null,"rate":null},{"id":"business-13","label":"13 chỗ","baseFee":2049000,"note":null,"derive":null,"rate":null},{"id":"business-14","label":"14 chỗ","baseFee":2221000,"note":null,"derive":null,"rate":null},{"id":"business-15","label":"15 chỗ","baseFee":2394000,"note":null,"derive":null,"rate":null},{"id":"business-16","label":"16 chỗ","baseFee":3054000,"note":null,"derive":null,"rate":null},{"id":"business-17","label":"17 chỗ","baseFee":2718000,"note":null,"derive":null,"rate":null},{"id":"business-18","label":"18 chỗ","baseFee":2869000,"note":null,"derive":null,"rate":null},{"id":"business-19","label":"19 chỗ","baseFee":3041000,"note":null,"derive":null,"rate":null},{"id":"business-20","label":"20 chỗ","baseFee":3191000,"note":null,"derive":null,"rate":null},{"id":"business-21","label":"21 chỗ","baseFee":3364000,"note":null,"derive":null,"rate":null},{"id":"business-22","label":"22 chỗ","baseFee":3515000,"note":null,"derive":null,"rate":null},{"id":"business-23","label":"23 chỗ","baseFee":3688000,"note":null,"derive":null,"rate":null},{"id":"business-24","label":"24 chỗ","baseFee":4632000,"note":null,"derive":null,"rate":null},{"id":"business-25","label":"25 chỗ","baseFee":4813000,"note":null,"derive":null,"rate":null},{"id":"business-over-25","label":"Trên 25 chỗ","baseFee":null,"note":"4.813.000đ + 30.000đ × (số chỗ − 25)","derive":null,"rate":null},{"id":"business-pickup","label":"Pickup, minivan chở người & hàng","baseFee":933000,"note":null,"derive":null,"rate":null}]}]},{"id":"cargo","label":"Xe tải","usages":[{"id":"cargo-use","label":"Chở hàng","rows":[{"id":"cargo-under-3","label":"Dưới 3 tấn","baseFee":853000,"note":null,"derive":null,"rate":null},{"id":"cargo-3-8","label":"Từ 3 đến 8 tấn","baseFee":1660000,"note":null,"derive":null,"rate":null},{"id":"cargo-8-15","label":"Trên 8 đến 15 tấn","baseFee":2746000,"note":null,"derive":null,"rate":null},{"id":"cargo-over-15","label":"Trên 15 tấn","baseFee":3200000,"note":null,"derive":null,"rate":null}]}]},{"id":"special","label":"Xe chuyên dùng","usages":[{"id":"special-use","label":"Theo tính chất hoạt động","rows":[{"id":"special-training","label":"Xe tập lái","baseFee":null,"note":"Bằng 120% phí xe cùng chủng loại","derive":"passenger-seats","rate":1.2},{"id":"special-taxi","label":"Xe taxi","baseFee":null,"note":"Bằng 170% phí xe kinh doanh cùng số chỗ","derive":"business-seats","rate":1.7},{"id":"special-ambulance","label":"Xe cứu thương","baseFee":1119600,"note":null,"derive":null,"rate":null},{"id":"special-money","label":"Xe chở tiền","baseFee":524400,"note":null,"derive":null,"rate":null},{"id":"special-other","label":"Xe chuyên dùng khác","baseFee":null,"note":"Bằng 120% phí xe tải cùng trọng tải","derive":"truck-tonnage","rate":1.2},{"id":"special-tractor","label":"Xe đầu kéo rơ-moóc","baseFee":4800000,"note":null,"derive":null,"rate":null},{"id":"special-machine","label":"Máy kéo, xe máy chuyên dùng","baseFee":1023600,"note":null,"derive":null,"rate":null},{"id":"special-bus","label":"Xe buýt","baseFee":null,"note":"Bằng mức phí xe không kinh doanh cùng số chỗ","derive":null,"rate":null}]}]}];
  const VAT = 0.1;
  const rows = {}; DATA.forEach((c) => c.usages.forEach((u) => u.rows.forEach((r) => { rows[r.id] = r; })));
  const fmt = (n) => new Intl.NumberFormat('vi-VN').format(n) + 'đ';
  const byId = (id) => rows[id];
  function truck(t) { if (!(t > 0)) return null; return byId(t < 3 ? 'cargo-under-3' : t <= 8 ? 'cargo-3-8' : t <= 15 ? 'cargo-8-15' : 'cargo-over-15'); }
  function seatsFee(s, biz) {
    if (!Number.isInteger(s) || s < 1 || s > 100) return null;
    if (biz) {
      if (s > 25) return { label: 'xe kinh doanh ' + s + ' chỗ', fee: byId('business-25').baseFee + 30000 * (s - 25) };
      const r = s < 6 ? byId('business-under-6') : byId('business-' + s);
      return r && r.baseFee ? { label: 'xe kinh doanh ' + r.label.toLowerCase(), fee: r.baseFee } : null;
    }
    const r = byId(s < 6 ? 'private-under-6' : s <= 11 ? 'private-6-11' : s <= 24 ? 'private-12-24' : 'private-over-24');
    return { label: 'xe không kinh doanh ' + r.label.toLowerCase(), fee: r.baseFee };
  }
  // Hai dòng nguồn chỉ ghi chú công thức (không có phí, không có hệ số): áp đúng công thức ghi chú.
  const mode = (r) => r.derive || (r.id === 'business-over-25' ? 'business-seats' : r.id === 'special-bus' ? 'private-seats' : null);
  const $ = (id) => document.getElementById(id);
  const sel = $('tnds-row'), seats = $('tnds-seats'), ton = $('tnds-ton'), biz = $('tnds-biz');
  if (!sel) return;
  function run() {
    const r = byId(sel.value); const m = mode(r);
    $('tnds-seats-wrap').hidden = !(m && m.endsWith('seats'));
    $('tnds-biz-wrap').hidden = m !== 'passenger-seats';
    $('tnds-ton-wrap').hidden = m !== 'truck-tonnage';
    let base = null, why = '';
    const rate = r.rate || 1, pct = Math.round(rate * 100);
    if (!m) { base = r.baseFee; why = r.note || ''; }
    else if (m === 'truck-tonnage') {
      const typed = ton.value.trim() !== ''; const src = truck(parseFloat(ton.value.replace(',', '.')));
      if (src) { base = Math.round(src.baseFee * rate); why = 'Tính theo xe tải ' + src.label.toLowerCase() + ': ' + fmt(src.baseFee) + ' × ' + pct + '% = ' + fmt(base); }
      else why = typed ? 'Số tấn chưa hợp lệ, nhập số lớn hơn 0, ví dụ 5 hoặc 3,5.' : 'Phí bằng ' + pct + '% phí xe tải cùng trọng tải. Nhập số tấn để tính.';
    } else {
      const typed = seats.value.trim() !== '';
      const isBiz = m === 'business-seats' || (m === 'passenger-seats' && biz.checked);
      const src = seatsFee(Number(seats.value), isBiz);
      if (src) { base = Math.round(src.fee * rate); why = rate === 1 ? 'Tính theo ' + src.label + ': ' + fmt(base) : 'Tính theo ' + src.label + ': ' + fmt(src.fee) + ' × ' + pct + '% = ' + fmt(base); }
      else why = typed ? 'Số chỗ chưa hợp lệ, nhập số nguyên từ 1 đến 100, ví dụ 4 hoặc 7.' : (r.note ? r.note + '. ' : '') + 'Nhập số chỗ để tính.';
    }
    $('tnds-explain').textContent = why;
    const vat = base ? Math.round(base * VAT) : null;
    $('tnds-base').textContent = base ? fmt(base) : '…';
    $('tnds-vat').textContent = base ? fmt(vat) : '…';
    $('tnds-total').textContent = base ? fmt(base + vat) : '…';
  }
  [sel, seats, ton, biz].forEach((el) => { el.addEventListener('input', run); el.addEventListener('change', run); });
  $('tnds-form').addEventListener('submit', (e) => e.preventDefault());
  run();

  // Thẻ biểu phí: nút thật, phím mũi tên chuyển thẻ.
  const tabs = [...document.querySelectorAll('#bieu-phi [role=tab]')];
  const show = (tab) => tabs.forEach((b) => { const on = b === tab; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; document.getElementById(b.getAttribute('aria-controls')).hidden = !on; });
  tabs.forEach((b, i) => {
    b.addEventListener('click', () => show(b));
    b.addEventListener('keydown', (e) => { if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return; const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]; show(n); n.focus(); });
  });
  if (tabs[0]) show(tabs[0]);
})();
