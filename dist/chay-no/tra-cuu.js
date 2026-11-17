/* Bộ tra cứu tài sản và ước tính phí cháy nổ trên trang /san-pham/chay-no-bat-buoc/ của pvihcm
   (chủ site yêu cầu 16/11/2026: "code chỗ tính phí giống của baohiempvi-vn").
   Bản chuyển sang JavaScript thuần của property-asset-lookup.tsx và fire-lead-dialog.tsx (baohiempvi-vn).
   Dữ liệu: ./property-asset-data.js + ./property-asset-catalog.js (bảng phân nhóm rủi ro, tỷ lệ phí/năm,
   loại miễn thường, chép nguyên văn), ./fire-data.js (VAT, định dạng số). Không gõ lại số liệu.
   Biểu tượng: ./icons.js (SVG Phosphor xuất từ bản gốc).
   File dùng ở 2 nơi: tools/gen-chay-no-tra-cuu.mjs gọi renderLookup() để in sẵn HTML, trình duyệt nạp
   (type=module) để cập nhật khi khách bấm.
   Khác bản gốc: pvihcm không lưu yêu cầu tư vấn lên máy chủ (chủ site chốt không cần Google Sheet);
   hộp thoại chép thông tin khách nhập rồi mở Zalo để khách gửi cho chuyên viên. */
import ICONS from './icons.js';
import { VAT_RATE, formatMillions } from './fire-data.js';
import { assetDisplayName, assetPremium, formatAssetRate, insurancePurposes, propertyAssets, propertyGroups, searchPropertyAssets, togglePropertyAssetSelection } from './property-asset-data.js';
import { CNBB_LEAD_FIELDS, cnbbLeadFieldErrors, normalizeCompanyName, normalizeEmail, normalizePhone } from '../o-to/order-input-rules.js';

export const ZALO_URL = 'https://zalo.me/2076363329232219188?src=qr&f=1';
const ZALO_PERSONAL_URL = 'https://zalo.me/thanhnguyenhoang';
const uid = 'cn';
const esc = (s) => String(s ?? '').replace(/\s+—\s+/g, ', ').replace(/—/g, ', ').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ICON_OF_GROUP = { warehouse: 'Warehouse', factory: 'Factory', office: 'Buildings', home: 'House', store: 'Storefront', hotel: 'Bed', health: 'FirstAid', education: 'GraduationCap', energy: 'Lightning', transport: 'Train', building: 'Building', file: 'FileText', shield: 'ShieldCheck', both: 'Checks' };
/** SVG Phosphor, cỡ và nét giống bản gốc. */
export const ic = (name, size, weight = 'regular', cls = '') => `<svg class="ph${cls ? ' ' + cls : ''}" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true" focusable="false">${ICONS[name][weight]}</svg>`;
const byId = new Map(propertyAssets.map((a) => [a.id, a]));
const groupLabels = new Map(propertyGroups.map((g) => [g.id, g.label]));
const assetIcon = (asset) => {
  const title = assetDisplayName(asset.name).title;
  const name = /lạnh|đông lạnh/i.test(title) ? 'Snowflake' : /gỗ/i.test(title) ? 'Tree' : asset.group === 'kho' ? 'Package' : ICON_OF_GROUP[propertyGroups.find((g) => g.id === asset.group)?.icon ?? 'building'];
  return ic(name, 34, 'light');
};

export function initialState() {
  return { query: '', expanded: [], showAll: [], selected: [], purpose: null, calculated: false, leadKind: null, selectionError: null, sums: {} };
}

function view(st) {
  const matches = searchPropertyAssets(st.query);
  const assets = st.selected.map((id) => byId.get(id)).filter(Boolean);
  const selectedPurpose = insurancePurposes.find((p) => p.id === st.purpose);
  const lines = assets.map((asset) => ({ asset, fee: assetPremium(st.sums[asset.id] ?? '', asset.rate) }));
  const complete = lines.length > 0 && lines.every((l) => l.fee !== null);
  const totalNet = lines.reduce((t, l) => t + (l.fee ?? 0), 0);
  return { matches, assets, selectedPurpose, lines, complete, totalNet };
}

function renderSummary(v) {
  return `<span class="pal-summaryEyebrow">Phí năm tham khảo (gồm VAT)</span><strong class="pal-summaryTotal">${v.complete ? esc(formatMillions(v.totalNet * (1 + VAT_RATE))) : '—'}</strong>`
    + (v.complete ? `<dl class="pal-totals"><div><dt>Phí chưa VAT</dt><dd>${esc(formatMillions(v.totalNet))}</dd></div><div><dt>VAT ${VAT_RATE * 100}%</dt><dd>${esc(formatMillions(v.totalNet * VAT_RATE))}</dd></div></dl>` : '<p class="pal-summaryHint">Nhập giá trị tài sản để xem phí.</p>')
    + (v.selectedPurpose ? `<p class="pal-summaryPurpose">${ic('Checks', 18)}Mục đích: ${esc(v.selectedPurpose.label)}</p>` : '');
}

/** HTML của toàn bộ khối tra cứu, giống JSX trong property-asset-lookup.tsx. */
export function renderLookup(st) {
  const v = view(st);
  const err = st.selectionError;
  let h = `<section class="pal-lookup" aria-labelledby="${uid}-title" data-testid="property-asset-lookup">`
    + `<header class="pal-intro"><h2 id="${uid}-title">Chọn đúng loại tài sản, <span>giúp bạn tính phí bảo hiểm chính xác hơn</span></h2><p>Gõ tên tài sản, tick nhóm phù hợp rồi chọn loại cụ thể bên dưới.</p></header>`
    + `<form class="pal-searchArea" role="search" aria-label="Tìm loại tài sản" data-act="search"><label for="${uid}-search">Bạn đang muốn bảo hiểm tài sản nào?</label><div class="pal-searchBar">${ic('MagnifyingGlass', 30)}`
    + `<input id="${uid}-search" autocomplete="off" type="search"${err === 'asset' ? ` aria-invalid="true" aria-describedby="${uid}-asset-error"` : ''} placeholder="Ví dụ: kho, nhà xưởng, văn phòng…" value="${esc(st.query)}" data-in="query">`
    + (st.query ? `<button class="pal-clear" type="button" aria-label="Xóa từ khóa tìm kiếm" data-act="clear">${ic('X', 20)}</button>` : '')
    + '<button class="pal-searchButton" type="submit">Tìm kiếm</button></div>'
    + (err === 'asset' ? `<p class="pal-validationError" id="${uid}-asset-error" role="alert">Bạn chưa chọn tài sản. Tìm tên tài sản rồi tick loại phù hợp bên dưới.</p>` : '')
    + `<div class="pal-suggestions"><span>Gợi ý:</span>${[['Kho', 'kho'], ['Nhà xưởng', 'san-xuat'], ['Văn phòng', 'van-phong']].map(([t, g]) => `<button type="button" data-suggest="${esc(t)}" data-group="${g}">${t}</button>`).join('')}</div></form>`;

  // Cột trái: nhóm tài sản
  h += `<div class="pal-columns"><div class="pal-browse"><div class="pal-columnHeading pal-browseHeading"><h3 class="pal-stepHeading" id="${uid}-results" tabindex="-1">Bước 1 chọn loại hình tài sản cần mua bảo hiểm:</h3><span aria-live="polite">${v.matches.length} nhóm phù hợp</span></div>`
    + `<p class="pal-selectionLimit" id="${uid}-selection-limit" role="status">${st.selected.length === 0 ? 'Chọn 1 loại tài sản. Tick loại khác sẽ thay thế loại đang chọn.' : 'Đã chọn 1 loại tài sản. Tick loại khác để đổi, hoặc bỏ tick để chọn lại.'}</p><div class="pal-groupList">`;
  if (v.matches.length === 0) {
    h += `<div class="pal-empty">${ic('MagnifyingGlass', 38)}<strong>Chưa tìm thấy loại tài sản phù hợp</strong><p>Thử tên ngắn hơn, từ khóa không dấu hoặc mã tài sản.</p><button type="button" data-suggest="">Xem tất cả nhóm</button></div>`;
  } else {
    for (const { group, items } of v.matches) {
      const open = st.expanded.includes(group.id);
      const initialCount = group.id === 'kho' ? 5 : 8;
      const visible = st.showAll.includes(group.id) ? items : items.slice(0, initialCount);
      h += `<section class="pal-group"><label class="pal-groupRow${open ? ' pal-active' : ''}"><input type="checkbox"${open ? ' checked' : ''} aria-label="Nhóm ${esc(group.label)}" aria-controls="${uid}-${group.id}" data-group-toggle="${group.id}">${ic(ICON_OF_GROUP[group.icon], 38, 'light')}<span><strong>${esc(group.label)}</strong>${open ? '' : `<small>${esc(group.hint)}</small>`}</span>${ic('CaretDown', 22, 'regular', open ? 'pal-openCaret' : '')}</label>`;
      if (open) {
        h += `<div class="pal-children" id="${uid}-${group.id}"><div class="pal-childIntro"><h4>Chọn loại ${group.id === 'kho' ? 'kho' : 'tài sản'} của bạn</h4><p>Chọn một loại. Tick loại khác sẽ thay thế loại đang chọn.</p></div>`;
        for (const asset of visible) {
          const name = assetDisplayName(asset.name);
          const sel = st.selected.includes(asset.id);
          h += `<label class="pal-assetRow${sel ? ' pal-active' : ''}"><input type="checkbox"${sel ? ' checked' : ''} aria-describedby="${uid}-selection-limit" aria-label="Chọn ${esc(asset.name)} · mã ${esc(asset.code)}" data-asset="${esc(asset.id)}">${assetIcon(asset)}<span class="pal-code">${esc(asset.code)}</span><span class="pal-assetName"><strong>${esc(name.title)}</strong>${name.detail ? `<small>${esc(name.detail)}</small>` : ''}</span></label>`;
        }
        if (items.length > initialCount) h += `<button class="pal-showMore" type="button" data-show-all="${group.id}">${st.showAll.includes(group.id) ? 'Thu gọn danh sách' : `Xem thêm ${items.length - initialCount} loại tài sản`}${ic('CaretDown', 18)}</button>`;
        h += '</div>';
      }
      h += '</section>';
    }
  }
  h += '</div></div>';

  // Cột phải: danh mục đã chọn + mục đích
  h += `<div class="pal-selection"><div class="pal-columnHeading"><h3>Danh mục tài sản đã chọn</h3><button type="button" data-act="change">Đổi tài sản</button></div><div class="pal-tableWrap"><table class="pal-selectedTable"><caption class="pal-srOnly">Danh mục đã chọn, tỷ lệ phí một năm và loại miễn thường</caption><thead><tr><th scope="col">Nhóm chính</th><th scope="col">Loại tài sản</th><th scope="col">Tỷ lệ phí / năm</th><th scope="col">Miễn thường</th></tr></thead><tbody>`;
  h += v.assets.length === 0
    ? `<tr><td colspan="4"><div class="pal-empty">${ic('Warehouse', 44, 'light')}<strong>Danh mục của bạn đang trống</strong><p>Tick một loại tài sản bên trái để xem tỷ lệ phí và miễn thường.</p></div></td></tr>`
    : v.assets.map((a) => `<tr><td data-label="Nhóm chính">${esc(groupLabels.get(a.group))}</td><td data-label="Loại tài sản"><strong>${esc(a.name)}</strong><small>Mã tài sản ${esc(a.code)}</small><button class="pal-remove" type="button" aria-label="Bỏ ${esc(a.name)} · mã ${esc(a.code)}" data-asset="${esc(a.id)}">${ic('X', 14)} Bỏ chọn</button></td><td data-label="Tỷ lệ phí / năm"><b class="${a.rate === null ? 'pal-unconfirmedRate' : 'pal-rate'}">${esc(formatAssetRate(a))}</b>${a.rate !== null || a.rateText ? '<small>/ năm</small>' : ''}</td><td data-label="Miễn thường">${a.deductible ? `Loại ${esc(a.deductible)}` : 'Cần xác nhận'}</td></tr>`).join('');
  h += `</tbody></table></div><div class="pal-notice">${ic('Info', 25, 'fill')}<p>Miễn thường cụ thể sẽ được xác nhận theo hồ sơ.</p></div><p class="pal-source">Nguồn: bảng phân nhóm rủi ro do đơn vị cung cấp. Tỷ lệ tham khảo; báo giá chính thức được xác nhận theo hồ sơ.</p>`
    + `<fieldset class="pal-purposes${err === 'purpose' ? ' pal-invalidPurposes' : ''}"${err === 'purpose' ? ` aria-describedby="${uid}-purpose-error"` : ''}><legend>Mục đích mua bảo hiểm</legend><div class="pal-purposeGrid">`
    + insurancePurposes.map((p) => `<label class="pal-purpose${st.purpose === p.id ? ' pal-purposeSelected' : ''}"><input${p.id === 'pccc' ? ` id="${uid}-purpose-first"` : ''} type="radio" name="${uid}-purpose" value="${p.id}"${st.purpose === p.id ? ' checked' : ''} data-purpose="${p.id}">${ic(ICON_OF_GROUP[p.icon], 27, 'light')}<span>${esc(p.label)}</span></label>`).join('')
    + '</div>' + (err === 'purpose' ? `<p class="pal-validationError" id="${uid}-purpose-error" role="alert">Bạn chưa chọn mục đích mua bảo hiểm. Chọn một trong ba mục rồi bấm Tính phí.</p>` : '')
    + (v.selectedPurpose ? `<p class="pal-purposeDescription">${esc(v.selectedPurpose.description)}</p>` : '') + '</fieldset>'
    + `<button class="pal-calcButton" type="button" data-act="calc">${ic('Calculator', 26)}Tính phí</button>`
    + `<p class="pal-calcButtonHint" role="status">${st.calculated ? 'Phần báo phí nằm ngay bên dưới. Đổi tài sản hoặc mục đích thì bấm Tính phí lại.' : v.assets.length === 0 ? 'Chọn tài sản và mục đích mua, rồi bấm Tính phí.' : !st.purpose ? 'Chọn mục đích mua bảo hiểm, rồi bấm Tính phí.' : 'Đã sẵn sàng. Bấm Tính phí để nhập giá trị tài sản.'}</p></div></div>`;

  // Bước 2: nhập giá trị, xem phí
  if (st.calculated && v.assets.length > 0 && st.purpose) {
    h += `<section class="pal-calculation" id="${uid}-calc" aria-labelledby="${uid}-calculation" data-testid="fire-calculation"><header class="pal-calcHead"><span class="pal-calcStep">Bước 2</span><h3 id="${uid}-calculation">Nhập giá trị tài sản, xem phí tham khảo</h3><p>Nhập giá trị cần bảo hiểm của tài sản theo <b>triệu đồng</b>. Phí = giá trị bảo hiểm × tỷ lệ phí.</p><p class="pal-srOnly" role="status">Mời nhập giá trị tài sản để tính phí.</p></header><div class="pal-calcBody"><div class="pal-calcRows">`;
    for (const { asset, fee } of v.lines) {
      const name = assetDisplayName(asset.name);
      h += `<div class="pal-calcCard${fee !== null ? ' pal-calcCardDone' : ''}"><div class="pal-calcAsset"><span class="pal-calcIcon">${assetIcon(asset)}</span><label for="${uid}-sum-${esc(asset.id)}"><strong>${esc(name.title)}</strong><small>Mã ${esc(asset.code)} · ${esc(groupLabels.get(asset.group))}</small></label><span class="pal-rateChip">${esc(formatAssetRate(asset))}${asset.rate !== null || asset.rateText ? '<small> / năm</small>' : ''}</span></div>`
        + `<div class="pal-calcInputRow"><div class="pal-sumInput"><input id="${uid}-sum-${esc(asset.id)}" type="number" min="0" step="any" inputmode="decimal" placeholder="Nhập giá trị tài sản" value="${esc(st.sums[asset.id] ?? '')}" data-sum="${esc(asset.id)}"><span>triệu đồng</span></div><p class="pal-calcFee"><small>Phí / năm chưa VAT</small><b>${fee !== null ? esc(formatMillions(fee)) : '—'}</b></p></div>`
        + (asset.rate === null ? '<p class="pal-calcWarn">Loại này chưa có tỷ lệ cố định, phí cần được PVI xác nhận theo hồ sơ.</p>' : '') + '</div>';
    }
    h += `<div class="pal-leadLeft"><a class="pal-leadAdvice" href="${ZALO_PERSONAL_URL}">${ic('ChatCircleDots', 28, 'fill')}<span><strong>Nhận tư vấn miễn phí ngay</strong><small>Chuyên viên chat Zalo với bạn ngay</small></span></a></div></div>`
      + `<aside class="pal-calcSummary" aria-label="Tổng phí tham khảo"><div class="pal-summaryLive" aria-live="polite">${renderSummary(v)}`
      + `</div><button class="pal-leadQuote" type="button" data-lead="bang-chao">Nhận bảng chào miễn phí ngay${ic('ArrowRight', 22, 'bold')}</button></aside></div>`
      + '<p class="pal-calcNote">Mục đích đã chọn không làm thay đổi tỷ lệ phí trong danh mục. Phạm vi bảo hiểm và báo giá chính thức cần được tư vấn riêng theo hồ sơ.</p>'
      + `<div class="pal-calcActions"><button type="button" data-act="more">${ic('ArrowUp', 18)}Đổi tài sản đã chọn</button></div></section>`;
  }
  return h + '</section>';
}

/* ── Hộp thoại nhận tư vấn / bảng chào (fire-lead-dialog.tsx) ── */
const COPY = {
  'tu-van': { title: 'Nhận tư vấn miễn phí', lead: 'Để lại 3 thông tin, chuyên viên PVI Thành Đô sẽ chat với bạn qua Zalo ngay.', send: 'Gửi và chat Zalo ngay' },
  'bang-chao': { title: 'Nhận bảng chào miễn phí', lead: 'Để lại 3 thông tin, chuyên viên lập bảng chào theo tài sản của bạn và chat Zalo ngay.', send: 'Gửi và nhận bảng chào' },
};
const LABELS = { phone: 'Số điện thoại', email: 'Email', company: 'Tên đơn vị' };
const FIELD = {
  phone: { type: 'tel', ac: 'tel', im: 'tel', ph: 'Ví dụ: 0912 345 678', max: 20 },
  email: { type: 'email', ac: 'email', im: 'email', ph: 'Ví dụ: ketoan@congty.vn', max: 120 },
  company: { type: 'text', ac: 'organization', im: '', ph: 'Ví dụ: Công ty TNHH ABC', max: 150 },
};
function renderDialogPanel(d, ctx) {
  const c = COPY[d.kind];
  if (d.sent) {
    return `<button class="fld-close" type="button" aria-label="Đóng" data-dlg="close">${ic('X', 22)}</button><div class="fld-done" role="status"><span class="fld-doneIcon">${ic('CheckCircle', 54, 'fill')}</span><h3 id="${uid}-dlg-title">Đã chép thông tin của bạn</h3>`
      + `<p>${d.copied ? 'Thông tin đã được chép. Dán vào khung chat Zalo vừa mở để gửi chuyên viên PVI Thành Đô.' : 'Trình duyệt chặn chép tự động. Bạn chép phần bên dưới rồi dán vào Zalo vừa mở.'}</p>`
      + `<pre class="fld-context" style="white-space:pre-wrap;text-align:left">${esc(d.text)}</pre>`
      + `<a class="fld-zaloButton" href="${ZALO_URL}" target="_blank" rel="noopener noreferrer">${ic('ChatCircleDots', 24, 'fill')}Mở Zalo chat với chuyên viên</a><button class="fld-ghost" type="button" data-dlg="close">Đóng</button></div>`;
  }
  const errors = cnbbLeadFieldErrors(d.values);
  const ready = CNBB_LEAD_FIELDS.every((f) => !errors[f]) && d.consent;
  return `<button class="fld-close" type="button" aria-label="Đóng" data-dlg="close">${ic('X', 22)}</button><form novalidate data-dlg="form"><header class="fld-head"><span class="fld-badge">${ic('ChatCircleDots', 26, 'fill')}</span><h3 id="${uid}-dlg-title">${c.title}</h3><p>${c.lead}</p></header>`
    + (ctx.assetName ? `<p class="fld-context"><b>Tài sản đã chọn:</b> ${esc(ctx.assetName)}</p>` : '')
    + '<div class="fld-fields">' + CNBB_LEAD_FIELDS.map((f) => {
      const show = d.touched[f] && errors[f], p = FIELD[f];
      return `<div class="fld-field"><label for="${uid}-dlg-${f}">${LABELS[f]}</label><input id="${uid}-dlg-${f}" name="${f}" value="${esc(d.values[f])}" data-dlg-field="${f}"${show ? ` aria-invalid="true" aria-describedby="${uid}-dlg-${f}-error"` : ''}${!errors[f] ? ' data-valid="true"' : ''} maxlength="${p.max}" required type="${p.type}" autocomplete="${p.ac}"${p.im ? ` inputmode="${p.im}"` : ''} placeholder="${p.ph}">${show ? `<p class="fld-error" id="${uid}-dlg-${f}-error" role="alert">${esc(errors[f])}</p>` : ''}</div>`;
    }).join('') + '</div>'
    + `<label class="fld-consent"><input type="checkbox"${d.consent ? ' checked' : ''} data-dlg-consent><span>Tôi đồng ý để PVI Thành Đô liên hệ tư vấn qua số điện thoại, email và Zalo ở trên.</span></label>`
    + `<div class="fld-actions" aria-live="polite">${ready ? `<button class="fld-send" type="submit">${ic('PaperPlaneTilt', 24, 'fill')}${c.send}</button>` : '<p class="fld-hint">Nhập đủ 3 thông tin và tích đồng ý, nút Gửi sẽ hiện ra.</p>'}</div></form>`;
}

/* ───────────── Trình duyệt ───────────── */
function mount(box) {
  const st = initialState();
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const render = () => {
    const act = document.activeElement, id = act && act.id, pos = act && 'selectionStart' in act ? act.selectionStart : null;
    box.innerHTML = renderLookup(st);
    if (id && box.contains(document.getElementById(id))) { const el = document.getElementById(id); el.focus({ preventScroll: true }); try { if (pos != null) el.setSelectionRange(pos, pos); } catch {} }
  };
  const $ = (s) => box.querySelector(s);
  const toggleAsset = (id) => { st.selected = togglePropertyAssetSelection(st.selected, id); st.calculated = false; if (st.selectionError === 'asset') st.selectionError = null; render(); };
  const scrollCalc = () => $(`#${uid}-calc`)?.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', block: 'start' });

  box.addEventListener('input', (e) => {
    const t = e.target;
    if (t.dataset.in === 'query') { st.query = t.value; st.showAll = []; render(); }
    else if (t.dataset.sum) {
      st.sums = { ...st.sums, [t.dataset.sum]: t.value };
      const v = view(st);
      const { fee } = v.lines.find((line) => line.asset.id === t.dataset.sum);
      const card = t.closest('.pal-calcCard');
      // Chỉ cập nhật kết quả để giữ ô nhập và vị trí con trỏ khi đang gõ số.
      card.classList.toggle('pal-calcCardDone', fee !== null);
      card.querySelector('.pal-calcFee b').textContent = fee !== null ? formatMillions(fee) : '—';
      $('.pal-summaryLive').innerHTML = renderSummary(v);
    }
  });
  box.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.sum && t.value !== '' && Number.isFinite(Number(t.value))) {
      t.value = String(Number(t.value));
      st.sums = { ...st.sums, [t.dataset.sum]: t.value };
    }
    else if (t.dataset.groupToggle) { const g = t.dataset.groupToggle; st.expanded = st.expanded.includes(g) ? st.expanded.filter((x) => x !== g) : [...st.expanded, g]; render(); }
    else if (t.dataset.asset && t.type === 'checkbox') toggleAsset(t.dataset.asset);
    else if (t.dataset.purpose) { st.purpose = t.dataset.purpose; st.calculated = false; if (st.selectionError === 'purpose') st.selectionError = null; render(); }
  });
  box.addEventListener('submit', (e) => {
    if (!e.target.matches('[data-act=search]')) return;
    e.preventDefault();
    const m = searchPropertyAssets(st.query);
    if (m.length === 1) st.expanded = [...new Set([...st.expanded, m[0].group.id])];
    render();
    $(`#${uid}-results`)?.focus({ preventScroll: true });
  });
  box.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || !box.contains(b)) return;
    if (b.dataset.suggest !== undefined) {
      st.query = b.dataset.suggest;
      if (b.dataset.group) st.expanded = [...new Set([...st.expanded, b.dataset.group])];
      render(); $(`#${uid}-search`)?.focus({ preventScroll: true });
    } else if (b.dataset.showAll) { const g = b.dataset.showAll; st.showAll = st.showAll.includes(g) ? st.showAll.filter((x) => x !== g) : [...st.showAll, g]; render(); }
    else if (b.matches('.pal-remove')) toggleAsset(b.dataset.asset);
    else if (b.dataset.act === 'clear' || b.dataset.act === 'change') { st.query = ''; render(); $(`#${uid}-search`)?.focus(); }
    else if (b.dataset.act === 'calc') {
      const v = view(st);
      if (v.assets.length === 0) { st.selectionError = 'asset'; render(); $(`#${uid}-search`)?.focus(); return; }
      if (!st.purpose) { st.selectionError = 'purpose'; render(); $(`#${uid}-purpose-first`)?.focus(); return; }
      st.selectionError = null;
      if (st.calculated) { scrollCalc(); return; }
      st.calculated = true; render(); scrollCalc();
    } else if (b.dataset.act === 'more') {
      const inp = $(`#${uid}-search`);
      inp?.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', block: 'center' }); inp?.focus({ preventScroll: true });
    } else if (b.dataset.lead) openDialog(b.dataset.lead);
  });

  // Hộp thoại: một <dialog> riêng nằm ngoài khối vẽ lại, vẫn trong .cn-page để nhận CSS.
  const dlg = document.createElement('dialog');
  dlg.className = 'fld-dialog';
  dlg.setAttribute('aria-labelledby', `${uid}-dlg-title`);
  box.after(dlg);
  let d = null, ctx = null;
  const track = (event, payload = {}) => { if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...payload }); };
  const drawDlg = () => {
    const act = document.activeElement, id = act && act.id, pos = act && 'selectionStart' in act ? act.selectionStart : null;
    dlg.innerHTML = `<div class="fld-panel">${renderDialogPanel(d, ctx)}</div>`;
    if (id && dlg.contains(document.getElementById(id))) { const el = document.getElementById(id); el.focus(); try { if (pos != null) el.setSelectionRange(pos, pos); } catch {} }
  };
  function openDialog(kind) {
    const v = view(st), a = v.assets[0];
    if (!a) return;
    ctx = { assetCode: a.code, assetName: a.name, sum: st.sums[a.id] ?? '', fee: v.complete ? formatMillions(v.totalNet * (1 + VAT_RATE)) : '', purpose: v.selectedPurpose?.label ?? '' };
    d = { kind, values: { phone: '', email: '', company: '' }, touched: {}, consent: false, sent: false };
    drawDlg();
    if (!dlg.open) dlg.showModal();
    track('cnbb_lead_open', { kind });
  }
  dlg.addEventListener('close', () => { d = null; dlg.innerHTML = ''; });
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) { dlg.close(); return; }
    if (e.target.closest('[data-dlg=close]')) dlg.close();
  });
  dlg.addEventListener('input', (e) => { const f = e.target.dataset.dlgField; if (f && d) { d.values = { ...d.values, [f]: e.target.value }; drawDlg(); } });
  dlg.addEventListener('focusout', (e) => { const f = e.target.dataset && e.target.dataset.dlgField; if (f && d && !d.touched[f]) { d.touched = { ...d.touched, [f]: true }; setTimeout(drawDlg, 0); } });
  dlg.addEventListener('change', (e) => { if (e.target.matches('[data-dlg-consent]') && d) { d.consent = e.target.checked; drawDlg(); } });
  dlg.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!d) return;
    const errors = cnbbLeadFieldErrors(d.values);
    if (!CNBB_LEAD_FIELDS.every((f) => !errors[f]) || !d.consent) return;
    // Mở Zalo ngay trong lượt bấm (trình duyệt chỉ cho mở cửa sổ mới lúc này).
    window.open(ZALO_URL, '_blank', 'noopener,noreferrer');
    const text = [
      d.kind === 'bang-chao' ? 'Tôi cần bảng chào bảo hiểm cháy nổ PVI.' : 'Tôi cần tư vấn bảo hiểm cháy nổ PVI.',
      `Tài sản: ${ctx.assetName} (mã ${ctx.assetCode})`,
      ctx.sum ? `Giá trị tài sản: ${ctx.sum} triệu đồng` : null,
      ctx.fee ? `Phí tham khảo trên web: ${ctx.fee}/năm (gồm VAT)` : null,
      ctx.purpose ? `Mục đích: ${ctx.purpose}` : null,
      `Đơn vị: ${normalizeCompanyName(d.values.company)}`,
      `Số điện thoại: ${normalizePhone(d.values.phone)}`,
      `Email: ${normalizeEmail(d.values.email)}`,
      'Nguồn: pvihcm.com /san-pham/chay-no-bat-buoc/',
    ].filter(Boolean).join('\n');
    let copied = false;
    try { await navigator.clipboard.writeText(text); copied = true; } catch {}
    d = { ...d, sent: true, text, copied };
    track('cnbb_lead_submit', { kind: d.kind });
    drawDlg();
  });

  render();
}

if (typeof document !== 'undefined') {
  const box = document.querySelector('[data-cn-tra-cuu]');
  if (box) mount(box);
}
