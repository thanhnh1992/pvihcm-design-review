/* Bộ tính phí tai nạn 24/24, sinh từ tools/tai-nan-ui.mjs (bản chuyển của accident-calculator.tsx).
   Nút Mua ngay chép tóm tắt rồi mở Zalo để khách tự gửi. Nút Nhận báo giá chi tiết gửi họ tên, SĐT
   và lựa chọn hiện tại lên /api/bao-gia-tai-nan (ghi Google Sheet, có mail báo). */
(() => {
  const D = {"plans":[{"id":"20","sum":20,"label":"20 triệu","basePremium":50000},{"id":"50","sum":50,"label":"50 triệu","basePremium":125000},{"id":"100","sum":100,"label":"100 triệu","basePremium":250000},{"id":"150","sum":150,"label":"150 triệu","basePremium":375000},{"id":"200","sum":200,"label":"200 triệu","basePremium":500000}],"tiers":[{"id":"bac-0","label":"1-19 người","shortLabel":"1–19","min":1,"max":19,"discount":0},{"id":"bac-1","label":"20-100 người","shortLabel":"20–100","min":20,"max":100,"discount":0.2},{"id":"bac-2","label":"101-300 người","shortLabel":"101–300","min":101,"max":300,"discount":0.35},{"id":"bac-3","label":"301-500 người","shortLabel":"301–500","min":301,"max":500,"discount":0.5},{"id":"bac-4","label":"Từ 501 người trở lên","shortLabel":"501+","min":501,"max":null,"discount":0.55}],"short":[{"months":1,"rate":0.2},{"months":2,"rate":0.3},{"months":3,"rate":0.4},{"months":4,"rate":0.5},{"months":5,"rate":0.6},{"months":6,"rate":0.7},{"months":7,"rate":0.75},{"months":8,"rate":0.8},{"months":9,"rate":0.85},{"months":10,"rate":0.9},{"months":11,"rate":0.95},{"months":12,"rate":1}],"kinds":[{"id":"nha-thau","label":"Nhà thầu xây dựng","contractor":true},{"id":"nhom-dn","label":"Nhóm / Doanh nghiệp","contractor":false},{"id":"truong-hoc","label":"Trường học","contractor":false},{"id":"ca-nhan","label":"Cá nhân","contractor":false}],"occ":[{"id":"nhom-1","label":"Nhóm 1, Lao động văn phòng, gián tiếp"},{"id":"nhom-2","label":"Nhóm 2, Lao động phổ thông, sản xuất nhẹ"},{"id":"nhom-3","label":"Nhóm 3, Thi công xây dựng, làm việc trên cao"},{"id":"nhom-4","label":"Nhóm 4, Nghề đặc thù, cần thẩm định riêng"}],"zalo":"https://zalo.me/2076363329232219188?src=qr&f=1","phone":"0938 072 236"};
  const root = document.getElementById('tinh-phi');
  if (!root) return;
  const $ = (id) => document.getElementById(id);
  const fmt = (n) => Math.round(n).toLocaleString('vi-VN') + ' đ';
  const st = { aud: D.kinds[0].id, plan: '20' };
  const occ = $('accident-occupation'), nIn = $('accident-headcount'), term = $('accident-term');
  const tierIndex = (n) => { const i = D.tiers.findIndex((t) => n >= t.min && (t.max === null || n <= t.max)); return i < 0 ? 0 : i; };
  const rateOf = (m) => (D.short.find((s) => s.months === m) || { rate: 1 }).rate;
  const count = () => Math.max(1, parseInt(nIn.value, 10) || 1);

  function calc() {
    const plan = D.plans.find((p) => p.id === st.plan) || null;
    const n = count(), months = Number(term.value), ti = tierIndex(n), tier = D.tiers[ti], rate = rateOf(months);
    const per = plan ? Math.round(plan.basePremium * (1 - tier.discount) * rate) : null;
    return { plan, n, months, tier, rate, per, total: per === null ? null : per * n, disc: Math.round(tier.discount * 100) };
  }

  function render() {
    const r = calc();
    const kind = D.kinds.find((k) => k.id === st.aud) || D.kinds[0];
    document.querySelectorAll('[data-aud]').forEach((b) => { const on = b.dataset.aud === st.aud; b.classList.toggle('is-current', on); b.setAttribute('aria-checked', String(on)); });
    root.querySelectorAll('[data-plan]').forEach((b) => b.classList.toggle('is-current', b.dataset.plan === st.plan));
    document.querySelectorAll('.auto-choice-card').forEach((c) => { const on = c.dataset.audience === st.aud; c.classList.toggle('is-selected', on); c.setAttribute('aria-pressed', String(on)); });
    $('tn-fee-ok').hidden = !r.plan; $('tn-fee-call').hidden = !!r.plan;
    if (r.plan) {
      $('tn-fee-ctx').textContent = '(' + r.n + ' người · ' + r.plan.label + ' · ' + r.months + ' tháng)';
      $('tn-fee-total').textContent = fmt(r.total);
      $('tn-fee-desc').textContent = fmt(r.per) + ' / người / ' + r.months + ' tháng · ' + r.tier.label + ' · ' + (r.disc > 0 ? 'đã giảm ' + r.disc + '%' : 'phí gốc, chưa có chiết khấu nhóm') + (r.rate < 1 ? ' · tỷ lệ ngắn hạn ' + Math.round(r.rate * 100) + '%' : '');
      $('tn-fee-per').textContent = fmt(r.per); $('tn-fee-n').textContent = r.n; $('tn-fee-sum').textContent = fmt(r.total);
    }
    $('tn-compliance').hidden = !kind.contractor;
    $('tn-aside-tier').innerHTML = r.tier.label + ' <small>' + (r.disc > 0 ? 'giảm ' + r.disc + '%' : 'phí gốc') + '</small>';
    document.querySelectorAll('.accident-offer-ladder li').forEach((li) => li.classList.toggle('is-current', li.dataset.tier === r.tier.id));
  }

  function summary() {
    const r = calc();
    const kind = D.kinds.find((k) => k.id === st.aud) || D.kinds[0];
    const o = D.occ.find((x) => x.id === occ.value);
    const lines = ['Yêu cầu báo phí bảo hiểm tai nạn 24/24', '• Đối tượng: ' + kind.label, '• Nhóm nghề: ' + (o ? o.label : ''), '• Gói mức trách nhiệm: ' + (r.plan ? r.plan.label : 'Mức khác'), '• Số người tham gia: ' + r.n, '• Thời hạn: ' + r.months + ' tháng'];
    if (r.plan) { lines.push('• Phí tham chiếu: ' + fmt(r.per) + '/người/' + r.months + ' tháng'); lines.push('• Tổng tạm tính: ' + fmt(r.total)); }
    else lines.push('• Trường hợp này cần nhân viên báo phí theo hồ sơ.');
    lines.push('Nhờ anh/chị xác nhận phí chính thức giúp em.');
    return lines.join('\n');
  }

  async function share() {
    const text = summary(), box = $('tn-share-note');
    let note;
    try { await navigator.clipboard.writeText(text); note = 'Đã sao chép nội dung. Dán vào khung chat Zalo vừa mở là gửi được ngay.'; }
    catch { note = 'Trình duyệt chặn sao chép tự động. Anh/chị copy phần tóm tắt bên dưới rồi dán vào Zalo.'; }
    box.querySelector('p').textContent = note; box.querySelector('pre').textContent = text; box.hidden = false;
    window.open(D.zalo, '_blank', 'noopener');
  }

  document.querySelectorAll('[data-aud]').forEach((b) => b.addEventListener('click', () => { st.aud = b.dataset.aud; render(); }));
  root.querySelectorAll('[data-plan]').forEach((b) => b.addEventListener('click', () => { st.plan = b.dataset.plan; render(); }));
  document.querySelectorAll('.auto-choice-card').forEach((c) => c.addEventListener('click', () => {
    st.aud = c.dataset.audience; st.plan = c.dataset.plan; nIn.value = c.dataset.n; term.value = '12'; render();
  }));
  nIn.addEventListener('input', render);
  nIn.addEventListener('blur', () => { const v = parseInt(nIn.value, 10); nIn.value = Number.isFinite(v) && v >= 1 ? v : 1; render(); });
  [occ, term].forEach((el) => el.addEventListener('change', render));
  document.querySelectorAll('[data-tn-share]').forEach((b) => b.addEventListener('click', share));

  // Nút "Nhận báo giá chi tiết": mở form họ tên + SĐT, gửi kèm lựa chọn đang có ở bộ tính phí
  // lên /api/bao-gia-tai-nan (máy chủ tính lại phí, ghi Google Sheet, Apps Script gửi mail báo).
  const dBtn = root.querySelector('[data-tn-detail]'), dForm = $('tn-detail');
  if (dBtn && dForm) {
    dBtn.addEventListener('click', () => {
      const open = dForm.hidden; dForm.hidden = !open; dBtn.setAttribute('aria-expanded', String(open));
      if (open) { dForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); dForm.name.focus({ preventScroll: true }); }
    });
    dForm.addEventListener('input', (e) => { if (e.target.getAttribute('aria-invalid') === 'true') { e.target.removeAttribute('aria-invalid'); dForm.querySelector('.accident-form-error').hidden = true; } });
    dForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const err = dForm.querySelector('.accident-form-error'), ok = dForm.querySelector('.accident-form-ok'), btn = dForm.querySelector('button[type=submit]');
      const name = dForm.name.value.normalize('NFC').trim().replace(/\s+/g, ' '), phone = dForm.phone.value.replace(/[\s.\-]/g, '');
      const bad = (el, v) => el.setAttribute('aria-invalid', String(v));
      const nameBad = name.split(' ').length < 2, phoneBad = !/^0\d{9}$/.test(phone);
      bad(dForm.name, nameBad); bad(dForm.phone, phoneBad); ok.hidden = true;
      const fail = nameBad ? 'Nhập đầy đủ họ và tên (ví dụ: Nguyễn Văn An).' : phoneBad ? 'Nhập đúng số điện thoại: đủ 10 chữ số, bắt đầu bằng số 0.' : !dForm.consent.checked ? 'Cần tích chọn đồng ý xử lý dữ liệu trước khi gửi.' : '';
      err.textContent = fail; err.hidden = !fail;
      if (fail) { (nameBad ? dForm.name : phoneBad ? dForm.phone : dForm.consent).focus(); return; }
      const r = calc();
      btn.disabled = true;
      let j = null;
      try {
        const res = await fetch('/api/bao-gia-tai-nan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone, consent: true, aud: st.aud, occ: occ.value, plan: st.plan, headcount: r.n, term: r.months }) });
        j = await res.json().catch(() => null);
        if (res.status === 429 && j && j.error) { btn.disabled = false; err.textContent = j.error; err.hidden = false; return; }
        if (!res.ok || !j || !j.ok) throw new Error((j && j.error) || 'Chưa gửi được yêu cầu.');
      } catch (x) {
        btn.disabled = false;
        err.textContent = (x && x.message ? x.message : 'Chưa gửi được yêu cầu.') + ' Anh/chị có thể bấm Mua ngay để gửi qua Zalo hoặc gọi ' + D.phone + '.'; err.hidden = false;
        return;
      }
      btn.disabled = false;
      if (j.sheet && j.sheet.saved) {
        ok.textContent = 'Đã nhận yêu cầu ' + j.code + '. Nhân viên PVI Thành Đô sẽ gửi báo giá chi tiết và gọi lại cho anh/chị trong giờ làm việc.';
      } else {
        ok.textContent = 'Đã ghi nhận yêu cầu ' + j.code + ' nhưng hệ thống chưa chuyển được tới nhân viên. Anh/chị bấm Mua ngay để gửi qua Zalo hoặc gọi ' + D.phone + ' giúp em.';
      }
      ok.hidden = false; dForm.reset();
    });
  }

  // Form "Năm ô, không hơn": kiểm tra rồi chép thông tin, mở Zalo. Không gửi lên máy chủ.
  const f = document.getElementById('tn-quote');
  if (f) f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = f.querySelector('.accident-form-error'), ok = f.querySelector('.accident-form-ok');
    const name = f.name.value.trim(), phone = f.phone.value.trim();
    const fail = !name || !phone ? 'Cần họ tên và số điện thoại để nhân viên gọi lại.' : !f.consent.checked ? 'Cần tích chọn đồng ý xử lý dữ liệu trước khi gửi.' : '';
    err.textContent = fail; err.hidden = !fail; if (fail) return;
    const plan = f.plan.options[f.plan.selectedIndex].text;
    const text = ['Yêu cầu báo phí bảo hiểm tai nạn 24/24', '• Họ tên: ' + name, '• Số điện thoại: ' + phone, '• Số người: ' + (f.people.value || 'chưa rõ'), '• Gói quan tâm: ' + plan].join('\n');
    try { await navigator.clipboard.writeText(text); } catch {}
    window.open(D.zalo, '_blank', 'noopener');
    ok.textContent = 'Đã chép thông tin và mở Zalo. Dán vào khung chat để gửi. Nếu cửa sổ bị chặn, gọi ' + D.phone + ' giúp em.'; ok.hidden = false;
  });

  render();
})();
