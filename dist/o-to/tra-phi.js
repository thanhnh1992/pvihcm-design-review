/* Bộ tra phí TNDS ô tô trên trang /san-pham/bao-hiem-o-to/ (chủ site yêu cầu 09/11/2026).
   Bản chuyển sang JavaScript thuần của auto-insurance-experience.tsx (baohiempvi-vn).
   Dữ liệu và công thức tính phí lấy từ ./tnds-data.js: bản chép nguyên văn của
   app/bao-hiem-o-to/tnds-data.ts (tools/data/tnds.mjs), không gõ lại số liệu.
   File này dùng ở 2 nơi: tools/o-to-ui.mjs gọi renderDashboard() để in sẵn HTML ban đầu,
   trình duyệt nạp nó (type=module) để cập nhật khi khách bấm. */
import {
  GIAM_GIA_ONLINE_AP_DUNG_NNTX, NNTX_MUC_MAC_DINH, NNTX_MUC_TRACH_NHIEM, NNTX_SO_CHO_MAX, NNTX_SO_CHO_MIN,
  ONLINE_DISCOUNT_RATE, VAT_RATE, bacKhongKinhDoanh, feeWithVat, formatVnd, explainDerivedFee, giaiThichBacSoCho,
  loiSoChoNntx, nhanMucTrachNhiem, nntxApDung, nntxBacSoCho, parseNntxSeats, parseSeats, parseTonnage, phiNntx,
  resolveBaseFee, tndsReference, tndsVehicleClasses,
} from './tnds-data.js';

export const DAT_MUA_URL = '/san-pham/bao-hiem-o-to/dat-mua/';
// Luật chữ của pvihcm: không dùng gạch dài (giống clean() trong tools/chrome.mjs).
export const dash = (s) => String(s ?? '').replace(/\s+—\s+/g, ', ').replace(/—/g, ', ');
const esc = (s) => dash(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function initialState() {
  return {
    vehicleId: 'passenger', usageId: 'private', rowId: 'private-6-11', online: false,
    tonnageText: '', seatsText: '', trainingBusiness: false,
    nntxChon: true, soChoText: String(nntxBacSoCho('private-6-11')?.macDinh ?? 5), nntxMuc: NNTX_MUC_MAC_DINH,
  };
}

/** Tính mọi con số từ trạng thái, giống phần useMemo của bản React. */
export function compute(st) {
  const vehicle = tndsVehicleClasses.find((v) => v.id === st.vehicleId) ?? tndsVehicleClasses[0];
  const usage = vehicle.usages.find((u) => u.id === st.usageId) ?? vehicle.usages[0];
  const row = usage.rows.find((r) => r.id === st.rowId) ?? usage.rows[0];
  const tonnage = parseTonnage(st.tonnageText);
  const seats = parseSeats(st.seatsText);
  const deriveInput = { tonnage, seats, business: st.trainingBusiness };
  const basePremium = resolveBaseFee(row, deriveInput);
  const deriveQuery = row.derive === 'truck-tonnage' && tonnage ? `&tan=${tonnage}`
    : row.derive && seats ? `&cho=${seats}${row.derive === 'passenger-seats' && st.trainingBusiness ? '&kd=1' : ''}` : '';
  const vat = basePremium ? Math.round(basePremium * VAT_RATE) : undefined;
  const totalFee = feeWithVat(basePremium);
  const rate = ONLINE_DISCOUNT_RATE;
  const discountedBasePremium = basePremium ? Math.round(basePremium * (1 - rate)) : undefined;
  const discountedVat = discountedBasePremium ? Math.round(discountedBasePremium * VAT_RATE) : undefined;
  const discountedTotal = discountedBasePremium && discountedVat ? discountedBasePremium + discountedVat : undefined;
  const payableTotal = st.online ? discountedTotal : totalFee;
  const savings = totalFee && discountedTotal ? totalFee - discountedTotal : undefined;
  const nntxHien = nntxApDung(usage.id);
  const nntxSoCho = parseNntxSeats(st.soChoText);
  const nntxLoi = nntxHien && st.nntxChon ? loiSoChoNntx(row.id, nntxSoCho) : '';
  const nntxPhi = nntxHien && st.nntxChon && !nntxLoi && nntxSoCho ? phiNntx(nntxSoCho, st.nntxMuc) : 0;
  const nntxPhaiTra = st.online && GIAM_GIA_ONLINE_AP_DUNG_NNTX ? Math.round(nntxPhi * (1 - rate)) : nntxPhi;
  const grandTotal = payableTotal ? payableTotal + nntxPhaiTra : undefined;
  const grandFullTotal = totalFee ? totalFee + nntxPhi : undefined;
  const nntxQuery = !nntxHien ? '' : `${nntxSoCho ? `&cho=${nntxSoCho}` : ''}${nntxPhi ? `&nntx=1&mtn=${st.nntxMuc}` : '&nntx=0'}`;
  const datMua = `${DAT_MUA_URL}?xe=${vehicle.id}&sd=${usage.id}&loai=${row.id}&online=${st.online ? '1' : '0'}${deriveQuery}${nntxQuery}`;
  return { vehicle, usage, row, deriveInput, basePremium, vat, totalFee, discountedBasePremium, discountedVat, payableTotal, savings,
    nntxHien, nntxSoCho, nntxLoi, nntxPhi, nntxPhaiTra, grandTotal, grandFullTotal, datMua };
}

const btn = (cur, attrs, label) => `<button class="${cur ? 'is-current' : ''}" type="button" ${attrs}>${esc(label)}</button>`;
/** Số tiền chạy từ số cũ tới số mới: in sẵn số cuối, trình duyệt tự chạy hiệu ứng. */
const money = (n) => `<span data-amount="${n ?? ''}">${esc(formatVnd(n))}</span>`;

/** HTML của cột chính (các bước chọn + khung phí), giống JSX trong auto-insurance-experience.tsx. */
export function renderDashboard(st) {
  const c = compute(st);
  const { vehicle, usage, row, deriveInput, basePremium, nntxHien } = c;
  const on = st.online;
  let seg = `<div class="auto-segment-group"><small>01. Loại xe</small><div>${tndsVehicleClasses.map((v) => btn(v.id === vehicle.id, `data-xe="${v.id}"`, v.label)).join('')}</div></div>`
    + `<div class="auto-segment-group"><small>02. Mục đích sử dụng</small><div>${vehicle.usages.map((u) => btn(u.id === usage.id, `data-sd="${u.id}"`, u.label)).join('')}</div></div>`
    + `<div class="auto-segment-group"><small>03. ${esc(nntxHien ? 'Khoảng chỗ / dòng xe' : usage.controlLabel)}</small><div>${usage.rows.map((r) => btn(r.id === row.id, `data-loai="${r.id}"`, r.label)).join('')}</div></div>`;
  if (nntxHien) seg += `<div class="auto-segment-group tnds-tonnage-group"><small>04. Số chỗ ngồi</small><div class="tnds-tonnage"><label for="tnds-private-seats">Số chỗ ngồi theo đăng ký (gồm cả lái xe)</label><input autocomplete="off" id="tnds-private-seats" inputmode="numeric" max="${NNTX_SO_CHO_MAX}" min="${NNTX_SO_CHO_MIN}" placeholder="Ví dụ: 7" type="number" value="${esc(st.soChoText)}" data-nhap="soCho"><p aria-live="polite">${esc(giaiThichBacSoCho(c.nntxSoCho, row.id, Boolean(st.soChoText.trim())))}</p></div></div>`;
  if (row.derive === 'passenger-seats') seg += `<div class="auto-segment-group"><small>04. Xe dùng để</small><div>${btn(!st.trainingBusiness, 'data-kd="0"', 'Không kinh doanh vận tải')}${btn(st.trainingBusiness, 'data-kd="1"', 'Kinh doanh vận tải')}</div></div>`;
  if (row.derive === 'truck-tonnage') seg += `<div class="auto-segment-group tnds-tonnage-group"><small>04. Trọng tải xe</small><div class="tnds-tonnage"><label for="tnds-tonnage-input">Trọng tải thiết kế (tấn)</label><input autocomplete="off" id="tnds-tonnage-input" inputmode="decimal" placeholder="Ví dụ: 5" type="text" value="${esc(st.tonnageText)}" data-nhap="tan"><p aria-live="polite">${esc(explainDerivedFee(row, deriveInput, Boolean(st.tonnageText.trim())))}</p></div></div>`;
  if (row.derive === 'business-seats' || row.derive === 'passenger-seats') seg += `<div class="auto-segment-group tnds-tonnage-group"><small>${row.derive === 'passenger-seats' ? '05' : '04'}. Số chỗ</small><div class="tnds-tonnage"><label for="tnds-seats-input">Số chỗ ngồi theo đăng ký</label><input autocomplete="off" id="tnds-seats-input" inputmode="numeric" placeholder="Ví dụ: 5" type="text" value="${esc(st.seatsText)}" data-nhap="cho"><p aria-live="polite">${esc(explainDerivedFee(row, deriveInput, Boolean(st.seatsText.trim())))}</p></div></div>`;

  const sub = basePremium
    ? (c.nntxPhaiTra ? `${formatVnd(c.payableTotal)} phí TNDS + ${formatVnd(c.nntxPhaiTra)} tai nạn người ngồi trên xe`
      : `${formatVnd(on ? c.discountedBasePremium : basePremium)} phí cơ bản${on ? ' sau ưu đãi' : ''} + ${formatVnd(on ? c.discountedVat : c.vat)} VAT`)
    : row.note;
  let nntx = '';
  if (nntxHien && basePremium) {
    nntx = `<section class="ocp-nntx" aria-labelledby="nntx-title"><label class="ocp-nntxToggle"><input ${st.nntxChon ? 'checked' : ''} type="checkbox" data-nhap="nntx"><span class="ocp-nntxCheck" aria-hidden="true">✓</span><span class="ocp-nntxToggleText"><b id="nntx-title">Bảo hiểm tai nạn người ngồi trên xe và lái xe</b></span></label>`
      + (st.nntxChon ? `<div class="ocp-nntxFields"><div class="ocp-nntxField"><label for="nntx-muc">Mức trách nhiệm / người / vụ</label><select id="nntx-muc" data-nhap="muc">${NNTX_MUC_TRACH_NHIEM.map((m) => `<option value="${m}"${m === st.nntxMuc ? ' selected' : ''}>${esc(nhanMucTrachNhiem(m))}</option>`).join('')}</select></div><div class="ocp-nntxField"><span class="ocp-nntxReadonlyLabel">Số chỗ ngồi</span>${c.nntxLoi ? `<p class="ocp-nntxError" role="alert">${esc(c.nntxLoi)}</p>` : `<p class="ocp-nntxReadonly"><b>${c.nntxSoCho} chỗ</b> × ${esc(formatVnd(st.nntxMuc))} × 0,1%<a href="#tnds-private-seats">Sửa số chỗ ở bước 04</a></p>`}</div></div>` : '')
      + `<div class="ocp-nntxTotals" aria-live="polite"><div><span>Phí TNDS${on ? ' sau ưu đãi' : ''}</span><b>${c.payableTotal ? esc(formatVnd(c.payableTotal)) : 'Theo quy định'}</b></div><div><span>Phí người ngồi trên xe <small>(đã gồm VAT)</small></span><b>${c.nntxPhaiTra ? esc(formatVnd(c.nntxPhaiTra)) : '0đ'}</b></div><div class="ocp-nntxGrand"><span>Tổng cộng</span><b>${c.grandTotal ? esc(formatVnd(c.grandTotal)) : 'Theo quy định'}</b></div></div></section>`;
  }
  const pct = Math.round(ONLINE_DISCOUNT_RATE * 100);
  const buy = `<section class="ocp-purchaseCard" aria-labelledby="online-purchase-title"><div class="ocp-purchaseHeader"><span class="ocp-cartIcon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.5L20 8H6.1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.9"/><circle cx="9" cy="20" r="1.2" fill="currentColor"/><circle cx="17" cy="20" r="1.2" fill="currentColor"/></svg></span><div><span class="ocp-eyebrow">Mua online + giấy chứng nhận điện tử</span><h3 id="online-purchase-title">GIẢM ${pct}%</h3></div><span class="ocp-secureMark" aria-label="Giấy chứng nhận điện tử">✓</span></div><p class="ocp-certificate">Nhận Giấy chứng nhận điện tử</p>`
    + `<label class="ocp-checkboxRow"><input ${on ? 'checked' : ''} ${basePremium ? '' : 'disabled'} type="checkbox" data-nhap="online"><span class="ocp-checkboxControl" aria-hidden="true">✓</span><span>Tôi chọn mua online – ưu đãi ${pct}%</span></label>`
    + (basePremium ? `<div class="ocp-onlinePrice" aria-live="polite">${on ? `<span class="ocp-originalPrice">Phí gốc <s>${esc(formatVnd(c.grandFullTotal))}</s></span>` : '<span class="ocp-originalPrice">Phí hiện tại theo lựa chọn xe</span>'}<strong>${money(c.grandTotal)}<small>${on ? ' Phí online đã gồm VAT' : ' Đã gồm VAT'}</small></strong>${c.nntxPhaiTra ? `<span class="ocp-discountBreakdown">Gồm TNDS ${esc(formatVnd(c.payableTotal))} + người ngồi trên xe ${esc(formatVnd(c.nntxPhaiTra))}</span>` : ''}${on ? `<span class="ocp-savings">Tiết kiệm ${esc(formatVnd(c.savings))}</span><span class="ocp-discountBreakdown">Phí cơ bản sau ưu đãi ${esc(formatVnd(c.discountedBasePremium))} + VAT mới ${esc(formatVnd(c.discountedVat))}</span>` : ''}</div>` : '<p class="ocp-unavailable">Chọn dòng xe có mức phí để áp dụng ưu đãi online.</p>')
    + (basePremium ? `<a class="ocp-purchaseButton" href="${esc(c.datMua)}" data-same-tab>MUA ONLINE NGAY <span aria-hidden="true">→</span></a>` : '<button class="ocp-purchaseButton" disabled type="button">MUA ONLINE NGAY <span aria-hidden="true">→</span></button>')
    + '</section>';
  const panel = `<div class="auto-fee-panel ocp-feePanel" aria-live="polite"><div class="ocp-feeContent"><div class="ocp-feeSummary"><div class="auto-fee-value"><span>${c.nntxPhaiTra ? 'Tổng phí tham khảo' : 'Phí TNDS tham khảo'} <small>(đã gồm VAT)</small></span><strong>${c.grandTotal ? money(c.grandTotal) : 'Theo quy định'}<em> / năm</em></strong><p>${esc(sub)}</p></div>`
    + `<div class="auto-fee-line"><span>Phí cơ bản</span><b>${esc(formatVnd(on ? c.discountedBasePremium : basePremium))}</b><i>+</i><span>VAT (10%)</span><b>${basePremium ? esc(formatVnd(on ? c.discountedVat : c.vat)) : '—'}</b><i>=</i><span>Tổng phí</span><b>${c.payableTotal ? esc(formatVnd(c.payableTotal)) : 'Theo quy định'}</b></div>`
    + nntx + `</div>${buy}</div><div class="ocp-ruleChip"><div class="auto-rule-chip"><span>⌁</span><p><b>${esc(tndsReference.legalBasis)}</b><small>${esc(tndsReference.updated)}</small></p><a href="${esc(tndsReference.sourceUrl)}" target="_blank" rel="noopener">Nguồn PVI ↗</a></div></div></div>`;
  return `<div class="auto-segments">${seg}</div>${panel}`;
}

/* ───────────── Trình duyệt ───────────── */
function animate(box, prev) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  box.querySelectorAll('[data-amount]').forEach((el) => {
    const to = Number(el.dataset.amount), from = prev ?? to;
    if (!to || from === to) return;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / 420, 1), e = 1 - Math.pow(1 - p, 4);
      el.textContent = formatVnd(Math.round(from + (to - from) * e));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

export function mount(root) {
  const box = root.querySelector('[data-tra-phi]');
  if (!box) return;
  const st = initialState();
  let lastTotal = compute(st).grandTotal;
  const render = () => {
    const act = document.activeElement, id = act && act.id, pos = act && 'selectionStart' in act ? act.selectionStart : null;
    box.innerHTML = renderDashboard(st);
    animate(box, lastTotal);
    lastTotal = compute(st).grandTotal;
    if (id) { const el = document.getElementById(id); if (el && box.contains(el)) { el.focus({ preventScroll: true }); try { if (pos != null) el.setSelectionRange(pos, pos); } catch {} } }
  };
  const chooseRow = (id) => { st.rowId = id; const bac = nntxBacSoCho(id); if (bac) st.soChoText = String(bac.macDinh); };
  box.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-xe],button[data-sd],button[data-loai],button[data-kd]');
    if (!b) return;
    if (b.dataset.xe) {
      const v = tndsVehicleClasses.find((x) => x.id === b.dataset.xe) ?? tndsVehicleClasses[0];
      st.vehicleId = v.id; st.usageId = v.usages[0].id; chooseRow(v.usages[0].rows[0].id);
    } else if (b.dataset.sd) {
      const v = compute(st).vehicle, u = v.usages.find((x) => x.id === b.dataset.sd) ?? v.usages[0];
      st.usageId = u.id; chooseRow(u.rows[0].id);
    } else if (b.dataset.loai) chooseRow(b.dataset.loai);
    else st.trainingBusiness = b.dataset.kd === '1';
    render();
  });
  const onInput = (e) => {
    const k = e.target.dataset && e.target.dataset.nhap;
    if (!k) return;
    if (k === 'soCho') {
      st.soChoText = e.target.value;
      const so = parseNntxSeats(e.target.value);
      if (so !== null && compute(st).row.id !== 'private-pickup') st.rowId = bacKhongKinhDoanh(so);
    } else if (k === 'tan') st.tonnageText = e.target.value;
    else if (k === 'cho') st.seatsText = e.target.value;
    else if (k === 'nntx') st.nntxChon = e.target.checked;
    else if (k === 'muc') st.nntxMuc = Number(e.target.value);
    else if (k === 'online') st.online = e.target.checked;
    render();
  };
  box.addEventListener('input', (e) => { if (e.target.type !== 'checkbox' && e.target.tagName !== 'SELECT') onInput(e); });
  box.addEventListener('change', (e) => { if (e.target.type === 'checkbox' || e.target.tagName === 'SELECT') onInput(e); });

  // Hai thẻ sản phẩm: chọn TNDS thì xem bộ tra phí; chọn vật chất xe (hoặc cả hai) thì sang trang vật chất xe.
  const grid = root.querySelector('.auto-choice-grid');
  const choices = new Set();
  const note = root.querySelector('.auto-switch-note');
  root.querySelectorAll('.auto-choice-card').forEach((card) => card.addEventListener('click', () => {
    const k = card.dataset.chon;
    if (choices.has(k)) choices.delete(k); else choices.add(k);
    root.querySelectorAll('.auto-choice-card').forEach((cc) => {
      const sel = choices.has(cc.dataset.chon);
      cc.classList.toggle('is-selected', sel); cc.setAttribute('aria-pressed', String(sel));
      cc.querySelector('.auto-choice-tick em').textContent = sel ? 'Đã chọn' : 'Chọn';
    });
    const state = choices.size === 2 ? 'both' : [...choices][0] || 'default';
    grid.className = `auto-choice-grid state-${state}`;
    if (state === 'damage' || state === 'both') {
      if (note) { note.hidden = false; note.textContent = state === 'both' ? 'Đang chuyển sang trang vật chất xe kèm phí TNDS…' : 'Đang chuyển sang trang vật chất xe…'; }
      setTimeout(() => location.assign(card.closest('[data-vcx-url]').dataset.vcxUrl), 450);
    } else if (state === 'tnds') {
      document.getElementById('tnds-tra-cuu')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    }
  }));
}

if (typeof document !== 'undefined') {
  const root = document.querySelector('.oto-page');
  if (root) mount(root);
}
