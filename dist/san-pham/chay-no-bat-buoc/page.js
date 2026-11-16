/* Bảng biểu phí Phụ lục VI chia tab theo nhóm và thanh điều hướng trong trang cháy nổ.
   Dữ liệu lấy từ tariff-data.js (59 dòng Phụ lục VI). Không tính toán lại tỷ lệ,
   không làm tròn: mọi con số hiển thị đều bắt nguồn từ đúng dòng trong dữ liệu.
   Bộ tra cứu tài sản và ước tính phí (từ 16/11/2026, theo baohiempvi-vn) nằm ở
   /chay-no/tra-cuu.js; bộ tính theo Phụ lục VI cũ đã bỏ khỏi file này.
   Vanilla, không thư viện, không bước build. */
(() => {
  const items = window.FIRE_ITEMS || [];
  const groups = window.FIRE_GROUPS || [];
  if (!items.length) return;

  const $ = (id) => document.getElementById(id);
  const elTabs = $('fire-tabs');
  const elRef = $('fire-ref');

  /* Tỷ lệ phí luôn hiện tối thiểu 2 chữ số thập phân: 0,5 phải đọc là "0,50%",
     không được rút về "0,5%" vì người đọc dễ nhầm sang 0,05%. */
  const rateText = (r) => r.toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 3 }) + '%';
  const vnd = (n) => Math.round(n).toLocaleString('vi-VN') + ' đ';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ── Biểu phí tham khảo, chia tab theo nhóm ── */
  const SAMPLE = 5e9;   // phí mẫu tính trên số tiền bảo hiểm 5 tỷ đồng
  if (elTabs && elRef) {
    elTabs.innerHTML = groups
      .map((g, i) => `<button type="button" role="tab" data-g="${esc(g.id)}" aria-selected="${i === 0}">${esc(g.label)}</button>`)
      .join('');

    const drawRef = (gid) => {
      const rows = items.filter((it) => it.g === gid);
      elRef.innerHTML = '<table><thead><tr>'
        + '<th scope="col">Mã</th><th scope="col">Loại cơ sở</th>'
        + '<th scope="col" class="num">Tỷ lệ phí</th><th scope="col">Khấu trừ</th>'
        + '<th scope="col" class="num">Phí mẫu trên 5 tỷ</th></tr></thead><tbody>'
        + rows.map((it) => '<tr>'
          + `<td class="code">${esc(it.code)}</td>`
          + `<td>${esc(it.ten)}${it.nguong ? `<br><span style="color:var(--muted);font-size:14px">${esc(it.nguong)}</span>` : ''}</td>`
          + `<td class="num">${rateText(it.rate)}</td>`
          + `<td>Loại ${esc(it.kt)}</td>`
          + `<td class="num">${vnd(SAMPLE * it.rate / 100)}</td></tr>`).join('')
        + '</tbody></table>';
    };

    elTabs.addEventListener('click', (e) => {
      const b = e.target.closest('[data-g]');
      if (!b) return;
      for (const t of elTabs.children) t.setAttribute('aria-selected', String(t === b));
      drawRef(b.dataset.g);
    });
    drawRef(groups[0].id);
  }

  /* Thanh điều hướng trong trang: tô đậm mục đang đọc. */
  const localLinks = [...document.querySelectorAll('.fx-local a')];
  const targets = localLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && targets.length) {
    const seen = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
      const current = targets.find((t) => seen.get(t.id));
      localLinks.forEach((a) => a.classList.toggle('is-active', !!current && a.getAttribute('href') === '#' + current.id));
    }, { rootMargin: '-80px 0px -55% 0px' });
    targets.forEach((t) => io.observe(t));
  }
})();
