/* Form đặt mua bảo hiểm TNDS bắt buộc ô tô (/san-pham/bao-hiem-o-to/dat-mua/), chủ site yêu cầu 09/11/2026.
   Bản chuyển sang JavaScript thuần của app/bao-hiem-o-to/dat-mua/order-form.tsx (baohiempvi-vn).
   Đơn gửi về /api/dat-hang-tnds của pvihcm: máy chủ tính lại phí, ghi Google Sheet, trả mã QR VietQR.
   Lựa chọn xe mang sang từ bảng tra cứu qua tham số URL; tuyệt đối không tin số tiền nào trên URL,
   phí luôn tính lại từ dữ liệu ./tnds-data.js. */
import {
  GIAM_GIA_ONLINE_AP_DUNG_NNTX, NNTX_MUC_MAC_DINH, NNTX_MUC_TRACH_NHIEM, NNTX_SO_CHO_MAX, NNTX_SO_CHO_MIN, ONLINE_DISCOUNT_RATE,
  SALES_PHONE, SALES_TEL, ZALO_URL, bacKhongKinhDoanh, explainDerivedFee, findTndsSelection, formatVnd, giaiThichBacSoCho, loiSoChoNntx,
  nhanMucTrachNhiem, nntxApDung, nntxBacSoCho, parseNntxLimit, parseNntxSeats, parseSeats, parseTonnage, phiNntx, quoteTnds,
  resolveBaseFee, resolveNntxFee, tndsVehicleClasses,
} from './tnds-data.js';
import { TNDS_ORDER_FIELDS, tndsOrderFieldErrors } from './order-input-rules.js';
import { dash } from './tra-phi.js';

const ZALO_QR_SRC = '/assets/o-to/zalo-pvi-thanh-do-qr.png';
const FORM_FIELDS = [...TNDS_ORDER_FIELDS, 'consent'];
const CONSENT_ERROR = 'Vui lòng tích chọn đồng ý để PVI liên hệ và cấp đơn cho anh/chị.';
const esc = (s) => dash(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const track = (event, payload = {}) => { if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...payload }); };
const pct = Math.round(ONLINE_DISCOUNT_RATE * 100);

/** Trạng thái ban đầu từ URL, giống dat-mua/page.tsx: tham số sai thì về lựa chọn mặc định. */
function fromUrl() {
  const q = new URLSearchParams(location.search);
  const fb = tndsVehicleClasses[0];
  const sel = findTndsSelection(q.get('xe'), q.get('sd'), q.get('loai')) ?? { vehicle: fb, usage: fb.usages[0], row: fb.usages[0].rows[0] };
  const nntxChon = q.get('nntx') === '1' && resolveNntxFee(sel.usage.id, sel.row.id, { chon: true, soCho: q.get('cho') ?? undefined, mucTrachNhiem: q.get('mtn') ?? undefined }) > 0;
  return {
    name: '', phone: '', plate: '', note: '', consent: false,
    vehicleId: sel.vehicle.id, usageId: sel.usage.id, rowId: sel.row.id, online: q.get('online') !== '0',
    tonnageText: q.get('tan') ?? '', seatsText: q.get('cho') ?? '', trainingBusiness: q.get('kd') === '1',
    nntxChon, soChoText: String(parseNntxSeats(q.get('cho') ?? '') ?? nntxBacSoCho(sel.row.id)?.macDinh ?? ''),
    nntxMuc: parseNntxLimit(q.get('mtn') ?? '') ?? NNTX_MUC_MAC_DINH,
    errors: {}, error: null, sending: false,
  };
}

function compute(st) {
  const vehicle = tndsVehicleClasses.find((v) => v.id === st.vehicleId) ?? tndsVehicleClasses[0];
  const usage = vehicle.usages.find((u) => u.id === st.usageId) ?? vehicle.usages[0];
  const row = usage.rows.find((r) => r.id === st.rowId) ?? usage.rows[0];
  const deriveInput = { tonnage: parseTonnage(st.tonnageText), seats: parseSeats(st.seatsText), business: st.trainingBusiness };
  const baseFee = resolveBaseFee(row, deriveInput);
  const quote = quoteTnds(baseFee, st.online), fullQuote = quoteTnds(baseFee, false);
  const nntxHien = nntxApDung(usage.id);
  const nntxSoCho = parseNntxSeats(st.soChoText);
  const nntxLoi = nntxHien && st.nntxChon ? loiSoChoNntx(row.id, nntxSoCho) : '';
  const nntxPhi = nntxHien && st.nntxChon && !nntxLoi && nntxSoCho ? phiNntx(nntxSoCho, st.nntxMuc) : 0;
  const nntxPhaiTra = st.online && GIAM_GIA_ONLINE_AP_DUNG_NNTX ? Math.round(nntxPhi * (1 - ONLINE_DISCOUNT_RATE)) : nntxPhi;
  const grandTotal = quote ? quote.total + nntxPhaiTra : null;
  return { vehicle, usage, row, deriveInput, quote, fullQuote, nntxHien, nntxSoCho, nntxLoi, nntxPhaiTra, grandTotal };
}

const fieldErr = (st, f) => (st.errors[f] ? `<p class="accident-field-error" id="tnds-${f}-error">${esc(st.errors[f])}</p>` : '');
const inv = (st, f) => (st.errors[f] ? ` aria-invalid="true" aria-describedby="tnds-${f}-error"` : '');
const opts = (list, cur) => list.map((x) => `<option value="${esc(x.id)}"${x.id === cur ? ' selected' : ''}>${esc(x.label)}</option>`).join('');

function renderForm(st) {
  const c = compute(st);
  const { vehicle, usage, row, deriveInput, quote, fullQuote } = c;
  let g = `<div class="accident-field"><label for="tnds-name">Họ và tên <span aria-hidden="true">*</span></label><input id="tnds-name" name="name" value="${esc(st.name)}" autocomplete="name" placeholder="Nguyễn Văn An" required${inv(st, 'name')} data-f="name">${fieldErr(st, 'name')}</div>`
    + `<div class="accident-field"><label for="tnds-phone">Số điện thoại <span aria-hidden="true">*</span></label><input id="tnds-phone" name="phone" type="tel" inputmode="numeric" value="${esc(st.phone)}" autocomplete="tel" placeholder="0912345678" maxlength="13" required${inv(st, 'phone')} data-f="phone">${fieldErr(st, 'phone')}</div>`
    + `<div class="accident-field"><label for="tnds-plate">Biển số xe <span aria-hidden="true">*</span></label><input id="tnds-plate" name="plate" value="${esc(st.plate)}" placeholder="51A-123.45" maxlength="14" required${inv(st, 'plate')} data-f="plate">${fieldErr(st, 'plate')}</div>`
    + `<div class="accident-field"><label for="tnds-vehicle">Nhóm xe</label><select id="tnds-vehicle" data-f="vehicle">${opts(tndsVehicleClasses, vehicle.id)}</select></div>`
    + `<div class="accident-field"><label for="tnds-usage">Mục đích sử dụng</label><select id="tnds-usage" data-f="usage">${opts(vehicle.usages, usage.id)}</select></div>`
    + `<div class="accident-field"><label for="tnds-row">Loại xe cụ thể</label><select id="tnds-row" data-f="row">${opts(usage.rows, row.id)}</select></div>`;
  if (c.nntxHien) g += `<div class="accident-field"><label for="tnds-private-seats">Số chỗ ngồi theo đăng ký (gồm cả lái xe)</label><input autocomplete="off" id="tnds-private-seats" inputmode="numeric" max="${NNTX_SO_CHO_MAX}" min="${NNTX_SO_CHO_MIN}" placeholder="Ví dụ: 7" type="number" value="${esc(st.soChoText)}" data-f="soCho"><small class="tnds-tonnage-help" aria-live="polite">${esc(giaiThichBacSoCho(c.nntxSoCho, row.id, Boolean(st.soChoText.trim())))}</small></div>`;
  if (row.derive === 'passenger-seats') g += `<div class="accident-field"><label for="tnds-training-usage">Xe tập lái dùng để</label><select id="tnds-training-usage" data-f="kd"><option value="0"${st.trainingBusiness ? '' : ' selected'}>Không kinh doanh vận tải</option><option value="1"${st.trainingBusiness ? ' selected' : ''}>Kinh doanh vận tải</option></select></div>`;
  if (row.derive === 'business-seats' || row.derive === 'passenger-seats') g += `<div class="accident-field"><label for="tnds-seats">Số chỗ ngồi theo đăng ký <span aria-hidden="true">*</span></label><input autocomplete="off" id="tnds-seats" inputmode="numeric" placeholder="Ví dụ: 5" type="text" value="${esc(st.seatsText)}" data-f="seats"><small class="tnds-tonnage-help" aria-live="polite">${esc(explainDerivedFee(row, deriveInput, Boolean(st.seatsText.trim())))}</small></div>`;
  if (row.derive === 'truck-tonnage') g += `<div class="accident-field"><label for="tnds-tonnage">Trọng tải thiết kế (tấn) <span aria-hidden="true">*</span></label><input autocomplete="off" id="tnds-tonnage" inputmode="decimal" placeholder="Ví dụ: 5" type="text" value="${esc(st.tonnageText)}" data-f="tonnage"><small class="tnds-tonnage-help" aria-live="polite">${esc(explainDerivedFee(row, deriveInput, Boolean(st.tonnageText.trim())))}</small></div>`;

  const nntx = c.nntxHien ? `<div class="tnds-nntx-order"><label class="accident-order-online"><input type="checkbox"${st.nntxChon ? ' checked' : ''} data-f="nntx"><span><b>Bảo hiểm tai nạn người ngồi trên xe và lái xe</b></span></label>`
    + (st.nntxChon ? `<div class="accident-order-grid"><div class="accident-field"><label for="tnds-nntx-muc">Mức trách nhiệm / người / vụ</label><select id="tnds-nntx-muc" data-f="muc">${NNTX_MUC_TRACH_NHIEM.map((m) => `<option value="${m}"${m === st.nntxMuc ? ' selected' : ''}>${esc(nhanMucTrachNhiem(m))}</option>`).join('')}</select><small class="tnds-tonnage-help" aria-live="polite">${esc(c.nntxLoi ? c.nntxLoi : `${c.nntxSoCho} chỗ × ${formatVnd(st.nntxMuc)} × 0,1% = ${c.nntxPhaiTra ? `${formatVnd(c.nntxPhaiTra)} (đã gồm VAT)` : '0đ'}`)}</small></div></div>` : '')
    + '</div>' : '';

  return `<div class="accident-order-grid">${g}</div>`
    + `<div class="accident-field"><label for="tnds-note">Ghi chú thêm</label><textarea id="tnds-note" rows="3" placeholder="Ngày muốn hiệu lực, cần thêm bảo hiểm vật chất xe, hoặc yêu cầu khác." data-f="note">${esc(st.note)}</textarea></div>`
    + `<div class="accident-order-summary">${nntx}<label class="accident-order-online"><input type="checkbox"${st.online ? ' checked' : ''} data-f="online"><span><b>Mua online + giấy chứng nhận điện tử, giảm ${pct}%</b><small class="accident-order-online-note">${esc(quote && fullQuote && st.online ? `Tiết kiệm ${formatVnd(quote.saving)} so với ${formatVnd(fullQuote.total)}.` : 'Bỏ tích nếu anh/chị muốn nhân viên báo phí theo cách thông thường.')}</small></span></label>`
    + `<dl><div><dt>Phí cơ bản</dt><dd>${quote ? formatVnd(quote.base) : 'Theo quy định'}</dd></div><div><dt>VAT 10%</dt><dd>${quote ? formatVnd(quote.vat) : '—'}</dd></div>${c.nntxPhaiTra ? `<div><dt>Phí TNDS (đã gồm VAT)</dt><dd>${quote ? formatVnd(quote.total) : '—'}</dd></div><div><dt>Phí người ngồi trên xe (đã gồm VAT)</dt><dd>${formatVnd(c.nntxPhaiTra)}</dd></div>` : ''}<div class="accident-order-total"><dt>Tổng phí 12 tháng</dt><dd>${c.grandTotal ? formatVnd(c.grandTotal) : 'Theo quy định'}</dd></div></dl>`
    + '<p class="accident-order-note">Phí tạm tính theo Phụ lục I Nghị định 67/2023/NĐ-CP. Phí chính thức xác nhận sau khi nhân viên đối chiếu giấy tờ xe.</p></div>'
    + `<label class="accident-consent"><input type="checkbox"${st.consent ? ' checked' : ''}${inv(st, 'consent')} id="tnds-consent" data-f="consent"><span>Tôi đồng ý để Bảo hiểm PVI Thành Đô liên hệ và xử lý thông tin trên cho mục đích cấp đơn bảo hiểm.</span></label>${fieldErr(st, 'consent')}`
    + (st.error ? `<p class="accident-order-error" role="alert">${esc(st.error)}</p>` : '')
    + `<div class="accident-order-actions"><button class="accident-primary" type="submit"${st.sending ? ' disabled' : ''}>${st.sending ? 'Đang gửi đơn…' : 'Gửi đơn đặt mua <i aria-hidden="true">→</i>'}</button><a class="accident-secondary" href="${SALES_TEL}">Gọi ${SALES_PHONE}</a></div>`;
}

function renderDone(r, ui) {
  const p = r.payment;
  const pay = p ? `<section class="tnds-pay" aria-labelledby="tnds-pay-title"><div class="tnds-pay-copy"><h3 id="tnds-pay-title">Thanh toán ${formatVnd(p.amount)}</h3><p>Mở app ngân hàng, quét mã bên cạnh. Số tiền và nội dung đã điền sẵn, anh/chị không cần gõ lại.</p><dl>`
    + `<div><dt>Ngân hàng</dt><dd>${esc(p.bankName)}</dd></div><div><dt>Số tài khoản</dt><dd>${esc(p.accountNumber)}<button type="button" class="tnds-copy" data-copy="stk">${ui.copied === 'stk' ? 'Đã chép' : 'Chép'}</button></dd></div>`
    + `<div><dt>Chủ tài khoản</dt><dd>${esc(p.accountName)}</dd></div><div><dt>Nội dung</dt><dd>${esc(p.transferNote)}<button type="button" class="tnds-copy" data-copy="nd">${ui.copied === 'nd' ? 'Đã chép' : 'Chép'}</button></dd></div></dl>`
    + '<p class="tnds-pay-note">Giữ đúng nội dung chuyển khoản để nhân viên đối soát nhanh. Giấy chứng nhận phát hành sau khi nhân viên xác nhận thông tin xe. Chưa xác nhận thì tiền được hoàn lại đầy đủ.</p></div>'
    + `<div class="tnds-pay-qr">${ui.qrFailed ? '<p class="tnds-qr-error" role="alert">Không thể tải mã VietQR. Anh/chị thử lại, hoặc chuyển khoản theo thông tin bên trên.</p>'
      : `<img src="${esc(p.imageUrl)}" alt="Mã QR chuyển khoản ${formatVnd(p.amount)} tới ${esc(p.accountName)}" width="220" height="220" decoding="async" data-qr><button type="button" class="tnds-save-qr" data-bill>Upload lệnh chuyển tiền</button><small class="tnds-save-hint">Chuyển xong thì gửi ảnh lệnh chuyển tiền qua Zalo, nhân viên đối soát và phát hành nhanh hơn.</small>`}</div>`
    + `<div class="tnds-verify" role="note"><b>LƯU Ý TRƯỚC KHI CHUYỂN TIỀN</b><p>Sau khi quét mã, hãy kiểm tra tên người nhận trên app ngân hàng. Chỉ chuyển tiền khi tên hiển thị đúng là <strong>${esc(p.accountName)}</strong>.</p></div>`
    + `<div class="tnds-confirm"><label><input type="checkbox"${ui.verified ? ' checked' : ''} data-verify><span>Tôi đã kiểm tra tên người nhận trên app ngân hàng là ${esc(p.accountName)}</span></label>`
    + (ui.paidNotified ? '<div class="tnds-paid" role="status"><b>Đã ghi nhận: khách thông báo đã chuyển khoản</b><p>Đây chưa phải xác nhận đã nhận được tiền. Nhân viên đối soát với ngân hàng rồi mới phát hành giấy chứng nhận.</p><button type="button" class="accident-primary" data-bill>Gửi lại ảnh lệnh chuyển tiền <i aria-hidden="true">→</i></button><small>Gửi ảnh biên lai giúp nhân viên đối soát nhanh hơn.</small></div>'
      : `<button type="button" class="tnds-paid-btn"${ui.verified ? '' : ' disabled'} data-paid>Tôi đã chuyển khoản</button>`)
    + '</div></section>' : '';
  return `<div class="accident-order-done" role="status"><span class="accident-order-code">Mã yêu cầu ${esc(r.code)}</span><h2>Đã nhận đơn của anh/chị.</h2>${pay}`
    + `<p>Đơn đã được ghi nhận nhưng chưa đẩy tự động được vào Zalo OA. Anh/chị bấm nút bên dưới để gửi thẳng nội dung đơn qua Zalo, hoặc gọi ${SALES_PHONE}.</p>`
    + `<div class="accident-order-actions"><button type="button" class="accident-primary" data-zalo>Gửi đơn qua Zalo <i aria-hidden="true">→</i></button><a class="accident-secondary" href="${SALES_TEL}">Gọi ${SALES_PHONE}</a></div>`
    + `<div class="accident-order-qr"><img src="${ZALO_QR_SRC}" alt="Mã QR Zalo chính thức của Bảo hiểm PVI Thành Đô" width="148" height="148" loading="lazy" decoding="async"><p>Hoặc mở Zalo trên điện thoại và quét mã này.</p></div>`
    + (r.message ? `<pre class="accident-order-message">${esc(r.message)}</pre>` : '') + '</div>';
}

function mount(box) {
  const st = fromUrl();
  let result = null;
  const ui = { copied: null, qrFailed: false, verified: false, paidNotified: false };
  const form = document.createElement('form');
  form.className = 'accident-order-form'; form.noValidate = true;
  box.replaceChildren(form);
  const render = () => {
    if (result) {
      box.innerHTML = renderDone(result, ui);
      const img = box.querySelector('[data-qr]');
      if (img) img.addEventListener('error', () => { ui.qrFailed = true; render(); }, { once: true });
      return;
    }
    const act = document.activeElement, id = act && act.id, pos = act && 'selectionStart' in act ? act.selectionStart : null;
    form.innerHTML = renderForm(st);
    if (id) { const el = document.getElementById(id); if (el && form.contains(el)) { el.focus({ preventScroll: true }); try { if (pos != null) el.setSelectionRange(pos, pos); } catch {} } }
  };
  const chooseRow = (id) => { st.rowId = id; const bac = nntxBacSoCho(id); if (bac) st.soChoText = String(bac.macDinh); };
  const update = (e) => {
    const f = e.target.dataset && e.target.dataset.f;
    if (!f) return;
    const v = e.target.value;
    if (['name', 'phone', 'plate'].includes(f)) { st[f] = v; delete st.errors[f]; }
    else if (f === 'note') { st.note = v; return; } // ghi chú không ảnh hưởng phần khác, khỏi vẽ lại
    else if (f === 'vehicle') { const nv = tndsVehicleClasses.find((x) => x.id === v) ?? tndsVehicleClasses[0]; st.vehicleId = nv.id; st.usageId = nv.usages[0].id; chooseRow(nv.usages[0].rows[0].id); }
    else if (f === 'usage') { const veh = compute(st).vehicle, nu = veh.usages.find((x) => x.id === v) ?? veh.usages[0]; st.usageId = nu.id; chooseRow(nu.rows[0].id); }
    else if (f === 'row') chooseRow(v);
    else if (f === 'soCho') { st.soChoText = v; const so = parseNntxSeats(v); if (so !== null && compute(st).row.id !== 'private-pickup') st.rowId = bacKhongKinhDoanh(so); }
    else if (f === 'kd') st.trainingBusiness = v === '1';
    else if (f === 'seats') st.seatsText = v;
    else if (f === 'tonnage') st.tonnageText = v;
    else if (f === 'nntx') st.nntxChon = e.target.checked;
    else if (f === 'muc') st.nntxMuc = Number(v);
    else if (f === 'online') st.online = e.target.checked;
    else if (f === 'consent') { st.consent = e.target.checked; delete st.errors.consent; }
    render();
  };
  const isToggle = (el) => el.type === 'checkbox' || el.tagName === 'SELECT';
  form.addEventListener('input', (e) => { if (!isToggle(e.target)) update(e); });
  form.addEventListener('change', (e) => { if (isToggle(e.target)) update(e); });

  const focusField = (f) => {
    const el = document.getElementById(f === 'consent' ? 'tnds-consent' : `tnds-${f}`);
    if (!el) return;
    el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    el.focus({ preventScroll: true });
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errors = tndsOrderFieldErrors({ name: st.name, phone: st.phone, plate: st.plate });
    if (!st.consent) errors.consent = CONSENT_ERROR;
    st.errors = errors; st.error = null;
    const first = FORM_FIELDS.find((f) => errors[f]);
    if (first) { render(); focusField(first); return; }
    st.sending = true; render();
    track('submit_form', { form: 'dat-mua-tnds-o-to', vehicle: st.vehicleId, usage: st.usageId, row: st.rowId });
    const c = compute(st);
    try {
      const res = await fetch('/api/dat-hang-tnds', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: st.name, phone: st.phone, plate: st.plate, vehicleId: st.vehicleId, usageId: st.usageId, rowId: st.rowId,
          tonnage: c.row.derive === 'truck-tonnage' ? c.deriveInput.tonnage : null,
          seats: c.row.derive === 'business-seats' || c.row.derive === 'passenger-seats' ? c.deriveInput.seats : null,
          business: c.row.derive === 'passenger-seats' ? st.trainingBusiness : null,
          nntx: c.nntxHien && st.nntxChon, nntxSeats: c.nntxSoCho, nntxLimit: st.nntxMuc, online: st.online, note: st.note, consent: st.consent }),
      });
      let data = {};
      try { data = await res.json(); } catch {}
      if (!res.ok || !data.ok) {
        const field = FORM_FIELDS.find((f) => f === data.field);
        if (field && data.error) { st.errors = { [field]: data.error }; st.sending = false; render(); focusField(field); return; }
        st.error = data.error || 'Gửi đơn không thành công. Anh/chị gọi giúp em theo hotline bên dưới.';
      } else {
        result = { code: data.code || '', message: data.message, payment: data.payment || null };
        track('purchase_request', { product: 'tnds-o-to', vehicle: st.vehicleId, delivered: false });
        if (data.sheet && data.sheet.saved) track('quote_conversion', { code: data.code });
      }
    } catch {
      st.error = 'Không kết nối được máy chủ. Anh/chị gọi giúp em theo hotline bên dưới.';
    }
    st.sending = false;
    render();
    if (result) box.scrollIntoView({ block: 'start' });
  });

  // Nút trên màn hình "Đã nhận đơn".
  const openZalo = () => window.open(ZALO_URL, '_blank', 'noopener,noreferrer');
  const copy = async (text) => { try { await navigator.clipboard.writeText(text); return true; } catch { return false; } };
  const sendBill = async () => { track('send_bill_zalo', { code: result && result.code }); if (result && result.code) await copy(`Đã chuyển khoản đơn ${result.code}`); openZalo(); };
  box.addEventListener('click', async (e) => {
    if (!result) return;
    const t = e.target.closest('button');
    if (!t) return;
    if (t.matches('[data-zalo]')) { track('click_zalo', { location: 'order-fallback-tnds' }); if (result.message) await copy(result.message); openZalo(); }
    else if (t.matches('[data-copy]')) {
      const k = t.dataset.copy, val = k === 'stk' ? result.payment.accountNumber : result.payment.transferNote;
      if (await copy(val)) { ui.copied = k; render(); setTimeout(() => { ui.copied = null; render(); }, 1600); }
    } else if (t.matches('[data-bill]')) sendBill();
    else if (t.matches('[data-paid]')) { ui.paidNotified = true; track('payment_notified', { code: result.code }); render(); sendBill(); }
  });
  box.addEventListener('change', (e) => { if (result && e.target.matches('[data-verify]')) { ui.verified = e.target.checked; render(); } });
  render();
}

const box = document.querySelector('[data-dat-mua]');
if (box) mount(box);
