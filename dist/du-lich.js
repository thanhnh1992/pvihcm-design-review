/* Trang bảo hiểm du lịch quốc tế: bộ tính phí tạm tính và vài tương tác nhỏ.
   Biểu phí nằm trong #tv-fee-data, sinh từ dữ liệu chính thức trong
   tools/gen-products-2.mjs. Web không gửi hay lưu thông tin khách nhập:
   bấm "Nhận tư vấn ngay" chỉ chép nội dung để khách dán vào Zalo. */
(() => {
  const form = document.getElementById('tinh-phi');
  const dataEl = document.getElementById('tv-fee-data');
  if (!form || !dataEl) return;
  const FEES = JSON.parse(dataEl.textContent);
  const BANDS = [3, 6, 10, 14, 18, 22, 27, 31];
  const REGION = { dna: 'dna', ca: 'ca', eu: 'tc', tc: 'tc' };
  const REGION_LABEL = { dna: 'Đông Nam Á', ca: 'Châu Á', tc: 'Toàn cầu' };
  const $ = (id) => document.getElementById(id);
  const dest = $('tv-dest'), from = $('tv-from'), to = $('tv-to'), people = $('tv-people'), visa = $('tv-visa');
  const quote = $('tv-quote'), cap = $('tv-quote-cap'), items = [...quote.querySelectorAll('li[data-goi]')];
  const msg = $('tv-send-msg');
  let goi = 'Vàng';

  const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const vnDate = (s) => s ? s.split('-').reverse().join('/') : '';
  const vnd = (n) => n.toLocaleString('vi-VN') + 'đ';
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const add = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  from.min = iso(today); to.min = iso(today);
  // Mặc định: khởi hành sau 14 ngày, đi 11 ngày (khớp ví dụ in sẵn trong HTML).
  if (!from.value) from.value = iso(add(today, 14));
  if (!to.value) to.value = iso(add(today, 24));

  const days = () => {
    if (!from.value || !to.value) return 0;
    return Math.round((new Date(to.value) - new Date(from.value)) / 86400000) + 1;
  };

  const paint = () => {
    items.forEach((li) => li.classList.toggle('on', li.dataset.goi === goi));
  };

  const calc = () => {
    to.min = from.value || iso(today);
    const d = days(), p = Number(people.value), r = REGION[dest.value];
    quote.classList.remove('is-call');
    if (d < 1) { quote.classList.add('is-call'); cap.textContent = 'Ngày về phải trùng hoặc sau ngày đi.'; return; }
    if (p > 10) { quote.classList.add('is-call'); cap.textContent = `Đoàn trên 10 người, ${d} ngày: chuyên viên báo phí riêng cho đoàn.`; return; }
    const band = BANDS.findIndex((n) => d <= n);
    if (band < 0) { quote.classList.add('is-call'); cap.textContent = `Chuyến ${d} ngày: chuyên viên báo phí theo hồ sơ cho chuyến dài ngày.`; return; }
    cap.textContent = `Phí tạm tính cho ${p} người, ${d} ngày, vùng ${REGION_LABEL[r]}`;
    items.forEach((li) => { li.querySelector('b').textContent = vnd(FEES[r][li.dataset.goi][band] * p); });
    paint();
  };

  [dest, from, to, people].forEach((el) => el.addEventListener('change', calc));
  from.addEventListener('change', () => { if (to.value && to.value < from.value) to.value = from.value; calc(); });
  calc();

  // Thẻ mục đích chuyến đi và nút "Chọn gói" điền sẵn vào bộ tính phí.
  document.querySelectorAll('[data-dest]').forEach((a) => a.addEventListener('click', () => { dest.value = a.dataset.dest; calc(); }));
  document.querySelectorAll('a[data-goi]').forEach((a) => a.addEventListener('click', () => { goi = a.dataset.goi; paint(); }));
  document.querySelectorAll('[data-tv-focus],[data-dest],a[data-goi]').forEach((a) => a.addEventListener('click', () => {
    setTimeout(() => dest.focus({ preventScroll: true }), 450);
  }));

  // Chép thông tin chuyến đi rồi để link mở Zalo như bình thường.
  $('tv-send').addEventListener('click', () => {
    const p = Number(people.value);
    const text = [
      'Tôi cần tư vấn bảo hiểm du lịch quốc tế PVI.',
      `Điểm đến: ${dest.options[dest.selectedIndex].text}`,
      `Ngày đi: ${vnDate(from.value)}, ngày về: ${vnDate(to.value)} (${days()} ngày)`,
      `Số người: ${p > 10 ? 'trên 10 người (đoàn)' : p + ' người'}`,
      `Gói quan tâm: ${goi}`,
      `Cần cho hồ sơ visa: ${visa.checked ? 'Có' : 'Không'}`,
    ].join('\n');
    const done = () => { msg.textContent = 'Đã chép thông tin chuyến đi. Dán vào khung chat Zalo để gửi chuyên viên.'; };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, () => {});
  });

  // "Xem tất cả câu hỏi"
  const all = $('tv-faq-all');
  if (all) all.addEventListener('click', () => {
    const open = all.getAttribute('aria-expanded') !== 'true';
    document.querySelectorAll('.tv-qa[data-more]').forEach((q) => { q.hidden = !open; });
    all.setAttribute('aria-expanded', String(open));
    all.firstChild.textContent = open ? 'Thu gọn câu hỏi ' : 'Xem tất cả câu hỏi ';
  });
})();
