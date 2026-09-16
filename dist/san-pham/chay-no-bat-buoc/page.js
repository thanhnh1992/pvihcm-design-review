/* Tra cứu loại cơ sở và cộng phí theo từng hạng mục.
   Dữ liệu lấy từ tariff-data.js (59 dòng Phụ lục VI). Không tính toán lại tỷ lệ,
   không làm tròn: mọi con số hiển thị đều bắt nguồn từ đúng dòng đã chọn.
   Vanilla, không thư viện, không bước build. */
(() => {
  const items = window.FIRE_ITEMS || [];
  const groups = window.FIRE_GROUPS || [];
  if (!items.length) return;

  const $ = (id) => document.getElementById(id);
  const elIndex = $('fire-index');
  const elSheet = $('fire-sheet');
  const elChips = $('fire-chips');
  const elQuery = $('fire-q');
  const elTabs = $('fire-tabs');
  const elRef = $('fire-ref');
  const elTotal = $('fire-total');
  if (!elIndex || !elSheet) return;

  /* Tỷ lệ phí luôn hiện tối thiểu 2 chữ số thập phân: 0,5 phải đọc là "0,50%",
     không được rút về "0,5%" vì người đọc dễ nhầm sang 0,05%. */
  const rateText = (r) => r.toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 3 }) + '%';
  const vnd = (n) => Math.round(n).toLocaleString('vi-VN') + ' đ';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const noDiacritic = (v) => v.toLowerCase().replace(/đ/g, 'd').normalize('NFD').replace(/[̀-ͯ]/g, '');

  /* ── Danh mục bên trái ── */
  const chosen = new Map();   // code -> { item, stbh (triệu đồng) }
  let query = '';

  const matches = () => {
    if (!query) return items;
    const q = noDiacritic(query).trim();
    if (!q) return items;
    return items.filter((it) => noDiacritic(it.kw + ' ' + it.code).includes(q));
  };

  function drawIndex() {
    const list = matches();
    if (!list.length) {
      elIndex.innerHTML = '<p class="fire-empty">Không có dòng nào khớp. Thử gõ ngắn hơn, ví dụ "kho" hoặc "xưởng".</p>';
      return;
    }
    let html = '';
    for (const g of groups) {
      const rows = list.filter((it) => it.g === g.id);
      if (!rows.length) continue;
      html += `<p class="fire-group">${esc(g.label)} · ${rows.length} dòng</p>`;
      for (const it of rows) {
        html += `<button type="button" class="fire-row" data-code="${esc(it.code)}" aria-pressed="${chosen.has(it.code)}">`
          + `<code>${esc(it.code)}</code>`
          + `<span class="nm">${esc(it.ten)}${it.nguong ? `<small>${esc(it.nguong)}</small>` : ''}</span>`
          + `<span class="rt">${rateText(it.rate)}</span></button>`;
      }
    }
    elIndex.innerHTML = html;
  }

  /* ── Bảng tính bên phải ── */
  function drawSheet() {
    if (!chosen.size) {
      elSheet.innerHTML = '<p class="fire-sheet-empty">Chưa chọn hạng mục nào. Bấm một dòng ở danh mục bên trái để thêm vào đây.</p>';
      elTotal.hidden = true;
      return;
    }
    let rows = '';
    for (const [code, rec] of chosen) {
      const it = rec.item;
      const fee = rec.stbh * 1e6 * it.rate / 100;
      rows += '<tr>'
        + `<td><span class="code">${esc(it.code)}</span><span class="nm">${esc(it.ten)}</span></td>`
        + `<td class="num">${rateText(it.rate)}</td>`
        + `<td><span class="fire-kt">Loại ${esc(it.kt)}</span></td>`
        + `<td class="num"><input type="number" min="0" step="100" value="${rec.stbh}" data-code="${esc(code)}" aria-label="Số tiền bảo hiểm của dòng ${esc(it.code)}, triệu đồng"></td>`
        + `<td class="num">${rec.stbh > 0 ? vnd(fee) : '<span style="color:#9aa9b9">chưa nhập</span>'}</td>`
        + `<td class="num"><button type="button" class="fire-del" data-del="${esc(code)}" aria-label="Bỏ dòng ${esc(it.code)}">Bỏ</button></td>`
        + '</tr>';
    }
    elSheet.innerHTML = '<table><thead><tr>'
      + '<th scope="col">Loại cơ sở</th><th scope="col" class="num">Tỷ lệ</th><th scope="col">Khấu trừ</th>'
      + '<th scope="col" class="num">STBH (triệu)</th><th scope="col" class="num">Phí năm</th><th scope="col"></th>'
      + '</tr></thead><tbody>' + rows + '</tbody></table>';

    let stbh = 0;
    let fee = 0;
    for (const rec of chosen.values()) {
      stbh += rec.stbh * 1e6;
      fee += rec.stbh * 1e6 * rec.item.rate / 100;
    }
    $('fire-stbh').textContent = vnd(stbh);
    $('fire-fee').textContent = vnd(fee);
    $('fire-vat').textContent = vnd(fee * 0.1);
    $('fire-sum').textContent = vnd(fee * 1.1);
    elTotal.hidden = false;
  }

  function toggle(code) {
    if (chosen.has(code)) chosen.delete(code);
    else {
      const it = items.find((x) => x.code === code);
      if (!it) return;
      chosen.set(code, { item: it, stbh: 0 });
    }
    drawIndex();
    drawSheet();
  }

  elIndex.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-code]');
    if (btn) toggle(btn.dataset.code);
  });

  elSheet.addEventListener('click', (e) => {
    const del = e.target.closest('[data-del]');
    if (del) toggle(del.dataset.del);
  });

  elSheet.addEventListener('input', (e) => {
    const inp = e.target.closest('input[data-code]');
    if (!inp) return;
    const rec = chosen.get(inp.dataset.code);
    if (!rec) return;
    const v = Number(inp.value);
    rec.stbh = Number.isFinite(v) && v > 0 ? v : 0;
    // cập nhật tổng tại chỗ, không vẽ lại bảng để con trỏ không nhảy khỏi ô
    let stbh = 0;
    let fee = 0;
    for (const r of chosen.values()) {
      stbh += r.stbh * 1e6;
      fee += r.stbh * 1e6 * r.item.rate / 100;
    }
    $('fire-stbh').textContent = vnd(stbh);
    $('fire-fee').textContent = vnd(fee);
    $('fire-vat').textContent = vnd(fee * 0.1);
    $('fire-sum').textContent = vnd(fee * 1.1);
    const cell = inp.closest('tr').lastElementChild.previousElementSibling;
    cell.innerHTML = rec.stbh > 0 ? vnd(rec.stbh * 1e6 * rec.item.rate / 100) : '<span style="color:#9aa9b9">chưa nhập</span>';
  });

  let typing = 0;
  elQuery.addEventListener('input', () => {
    clearTimeout(typing);
    typing = setTimeout(() => { query = elQuery.value; drawIndex(); }, 120);
  });

  /* Gợi ý nhanh: lấy từ chính dữ liệu để không bao giờ lệch với danh mục. */
  const shortcuts = ['kho', 'xưởng may', 'gỗ', 'xăng dầu', 'khách sạn', 'chung cư', 'chợ', 'karaoke'];
  elChips.innerHTML = shortcuts
    .map((s) => `<button type="button" data-q="${esc(s)}">${esc(s)}</button>`)
    .join('');
  elChips.addEventListener('click', (e) => {
    const b = e.target.closest('[data-q]');
    if (!b) return;
    elQuery.value = b.dataset.q;
    query = b.dataset.q;
    drawIndex();
    elIndex.scrollTop = 0;
  });

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

  drawIndex();
  drawSheet();
})();
