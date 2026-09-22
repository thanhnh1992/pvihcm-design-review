// Sinh 3 trang sản phẩm tĩnh từ dữ liệu đã duyệt của baohiempvi-vn (nhập thẳng, không gõ lại).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { page, t, esc, clean, faqBlock, faqJsonLd, breadcrumbJsonLd, steps, hotline, ctaRow, ZALO } from './chrome.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const D = (f) => pathToFileURL(path.join(HERE, 'data', f)).href;
const tn = await import(D('tnds.mjs'));
const ac = await import(D('accident.mjs'));
const pr = await import(D('product.mjs'));
const DIST = path.resolve(HERE, '../dist');
const vnd = (n) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;
const write = (rel, html) => { const f = path.join(DIST, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); console.log('wrote', rel, html.length); };

/* ═════════════ 1. BẢO HIỂM BẮT BUỘC (TNDS ô tô + công trường) ═════════════ */
{
  const P = '/san-pham/bao-hiem-bat-buoc/';
  const car = pr.getProduct('bao-hiem-o-to');
  const classes = tn.tndsVehicleClasses;
  const limits = tn.tndsLimits;
  const ref = tn.tndsReference;
  const contractor = ac.audienceCards.find((c) => c.id === 'nha-thau');

  // Dữ liệu cho bộ tính phí: giữ nguyên id, nhãn, phí, hệ số của nguồn.
  const calcData = classes.map((c) => ({ id: c.id, label: c.label, usages: c.usages.map((u) => ({ id: u.id, label: u.label, rows: u.rows.map((r) => ({ id: r.id, label: r.label, baseFee: r.baseFee ?? null, note: r.note ?? null, derive: r.derive ?? null, rate: r.rate ?? null })) })) }));

  const options = classes.map((c) => c.usages.map((u) => `<optgroup label="${esc(c.label)} · ${esc(u.label)}">${u.rows.map((r) => `<option value="${r.id}">${esc(r.label)}</option>`).join('')}</optgroup>`).join('')).join('');

  const feeTables = classes.map((c, i) => `<div class="fire-ref" role="tabpanel" id="tab-${c.id}" aria-labelledby="tb-${c.id}"${i ? ' hidden' : ''}><table class="pd-table"><thead><tr><th scope="col">Loại xe</th><th scope="col" class="num">Phí chưa VAT</th><th scope="col" class="num">Tổng gồm VAT 10%</th></tr></thead><tbody>${c.usages.map((u) => `${c.usages.length > 1 || u.label !== c.label ? `<tr class="sub"><th colspan="3" scope="colgroup">${esc(u.label)}</th></tr>` : ''}${u.rows.map((r) => r.baseFee
    ? `<tr><th scope="row">${esc(r.label)}</th><td class="num">${vnd(r.baseFee)}</td><td class="num strong">${vnd(tn.feeWithVat(r.baseFee))}</td></tr>`
    : `<tr><th scope="row">${esc(r.label)}</th><td colspan="2">${t(r.note || 'Theo quy định')}</td></tr>`).join('')}`).join('')}</tbody></table></div>`).join('');

  const docs = car.attachments.filter((a) => /^https?:/.test(a.href || ''));

  const main = `
<section class="fire-hero"><div class="fire-wrap"><div class="fire-hero-copy">
<span class="fire-eyebrow">Bảo hiểm bắt buộc · Xe cơ giới và công trường</span>
<h1>TNDS ô tô bắt buộc, <em>tra phí đúng loại xe.</em></h1>
<p>${t(tn.tndsAssistantFacts.definition)} Biểu phí theo ${t(ref.legalBasis)}, tách phí cơ bản và ${t(ref.vat)}.</p>
<div class="fire-actions"><a class="fire-btn fire-btn-red" href="#tinh-phi">Tính phí xe của tôi</a><a class="fire-btn fire-btn-line" href="#cong-truong">Người lao động công trường</a></div>
</div><figure class="fire-hero-art"><img src="/assets/section-bat-buoc.webp" width="1280" height="853" alt="Chủ xe trao đổi hồ sơ bảo hiểm bắt buộc với tư vấn viên"></figure></div></section>

<section class="fire-tool" id="tinh-phi"><div class="fire-wrap">
<h2>Tính phí TNDS theo loại xe</h2>
<p class="fire-lede" style="margin-top:12px">Chọn đúng dòng xe theo đăng ký và mục đích sử dụng. Xe taxi, xe tập lái và xe chuyên dùng khác tính theo hệ số trên xe gốc, nhập số chỗ hoặc số tấn để ra phí.</p>
<div class="pd-grid">
<div class="fire-panel"><div class="fire-panel-head"><h3>Thông tin xe</h3><p>Phí một năm, mức trách nhiệm theo quy định.</p></div>
<form class="pd-form" id="tnds-form" novalidate>
<label class="pd-field"><span>Loại xe</span><select id="tnds-row">${options}</select></label>
<div class="pd-field" id="tnds-seats-wrap" hidden><label class="pd-field"><span>Số chỗ ngồi</span><input id="tnds-seats" type="number" inputmode="numeric" min="1" max="100" step="1" placeholder="Ví dụ: 7"></label></div>
<label class="pd-check" id="tnds-biz-wrap" hidden><input id="tnds-biz" type="checkbox"> Xe có kinh doanh vận tải</label>
<div class="pd-field" id="tnds-ton-wrap" hidden><label class="pd-field"><span>Trọng tải (tấn)</span><input id="tnds-ton" type="text" inputmode="decimal" autocomplete="off" placeholder="Ví dụ: 3,5"></label></div>
<p class="pd-explain" id="tnds-explain" aria-live="polite"></p>
</form></div>
<div>
<div class="fire-total pd-result" id="tnds-result">
<div class="fire-total-rows"><div><span>Phí cơ bản</span><b id="tnds-base">437.000đ</b></div><div><span>VAT 10%</span><b id="tnds-vat">43.700đ</b></div></div>
<div class="fire-total-sum"><span>Tổng phí một năm</span><strong id="tnds-total">480.700đ</strong></div>
<div class="fire-total-foot"><a class="fire-btn fire-btn-red" href="tel:0938072236">Gọi mua 0938 072 236</a><a class="fire-btn fire-btn-line" href="${ZALO}" target="_blank" rel="noopener" style="color:var(--ink);border:1px solid #c9d6e3;background:#fff">Gửi cà vẹt qua Zalo</a></div>
</div>
<div class="pd-card" style="margin-top:18px"><table class="pd-table"><caption style="padding:16px 18px 0">Mức trách nhiệm bảo hiểm</caption><tbody>${limits.map((l) => `<tr><th scope="row">${esc(l.label)}</th><td class="num strong">${esc(l.value)}</td><td>${esc(l.note)}</td></tr>`).join('')}</tbody></table></div>
<p class="fire-note"><b>Căn cứ:</b> ${t(ref.legalBasis)}. ${t(ref.updated)}. Phí trên là phí theo biểu quy định, cần đối chiếu thông tin trên giấy chứng nhận trước khi phát hành.</p>
</div></div></div></section>

<section class="fire-tables" id="bieu-phi"><div class="fire-wrap">
<span class="fire-eyebrow">${t(ref.legalBasis)}</span>
<h2>Biểu phí TNDS đầy đủ</h2>
<div class="fire-tabs" role="tablist" aria-label="Nhóm xe">${classes.map((c, i) => `<button type="button" role="tab" id="tb-${c.id}" aria-controls="tab-${c.id}" aria-selected="${i === 0}">${esc(c.label)}</button>`).join('')}</div>
${feeTables}
<p class="fire-note"><b>Nguồn:</b> <a href="${ref.sourceUrl}" target="_blank" rel="noopener" style="color:var(--blue);text-decoration:underline">Bảo hiểm PVI</a>, ${t(ref.legalBasis)}. Tổng phí làm tròn theo đồng, đã gồm ${t(ref.vat)}.</p>
</div></section>

<section class="fire-compare" id="vat-chat"><div class="fire-wrap">
<h2>TNDS và bảo hiểm vật chất xe là hai thứ khác nhau</h2>
<p class="fire-lede" style="margin-top:12px">${t(tn.tndsFaqs[2].answer)}</p>
<table><thead><tr><th scope="col"><span class="sr-only">Tiêu chí</span></th><th scope="col"><span>Bắt buộc</span>TNDS chủ xe</th><th scope="col"><span>Tự nguyện</span>${t(tn.vehicleDamageFacts.title)}</th></tr></thead><tbody>
<tr><th scope="row">Bảo vệ</th><td>${t(car.coverage[0])}</td><td>${t(tn.vehicleDamageFacts.summary)}</td></tr>
<tr><th scope="row">Căn cứ phí</th><td>${t(ref.legalBasis)}, theo loại xe và mục đích sử dụng</td><td>${tn.vehicleDamageFacts.considerations.map(t).join('<br>')}</td></tr>
<tr><th scope="row">Tính phí trên web</th><td class="yes">Có, theo biểu phí phía trên</td><td>${t(car.faqs[1].answer)}</td></tr>
</tbody></table>
</div></section>

<section class="fire-docs" id="cong-truong"><div class="fire-wrap">
<span class="fire-eyebrow">${esc(contractor.flag)} · ${esc(contractor.eyebrow.toLowerCase().replace(/^./, (c) => c.toUpperCase()))}</span>
<h2>Người lao động thi công trên công trường</h2>
<p class="fire-lede" style="margin-top:12px">${t(contractor.summary)}</p>
<div class="fire-alert"><b>${t(ac.legalReference.current)} · ${t(ac.legalReference.effective)}</b><p>${t(ac.legalReference.replaces)}. ${t(ac.faqs[3].answer)}</p></div>
<div class="pd-cta"><a class="fire-btn fire-btn-dark" href="/san-pham/bao-hiem-tai-nan/#doi-tuong">Xem phí cho nhà thầu</a><a class="fire-btn fire-btn-line" href="${ac.legalReference.href}" target="_blank" rel="noopener">Đọc Nghị định 220/2026/NĐ-CP</a></div>
</div></section>

<section class="fire-docs pd-paper" id="chung-tu"><div class="fire-wrap">
<h2>Hồ sơ xe cần gửi và các bước mua</h2>
<div class="fire-docs-grid">
<div><h3>Hồ sơ</h3><ol>${car.documents.map((d) => `<li><b>${t(d)}</b></li>`).join('')}</ol></div>
<div><h3>Các bước</h3><ol>${car.buySteps.map((s) => `<li><b>${t(s.title)}</b><span>${t(s.text)}</span></li>`).join('')}</ol></div>
</div>
<p class="fire-note">${t(car.faqs[2].answer)}</p>
</div></section>

<section class="fire-news" id="tai-lieu" style="background:#fff"><div class="fire-wrap">
<h2>Quy tắc, mẫu biểu và văn bản pháp lý</h2>
<ul class="pd-docs">${docs.map((a) => `<li><a href="${a.href}" target="_blank" rel="noopener"><span class="cat">${t(a.type)}</span><div><b>${t(a.title)}</b><span class="d">${t(a.description)} ${t(a.meta)}.</span></div><i aria-hidden="true">&#8599;</i></a></li>`).join('')}</ul>
</div></section>

<section class="fire-claim pd-paper" id="boi-thuong"><div class="fire-wrap">
<span class="fire-eyebrow">Khi xảy ra tai nạn</span>
<h2>Ba bước xử lý bồi thường</h2>
${steps(car.claimSteps)}
${hotline}
<div class="pd-two">
<div><h3>Phạm vi được xem xét</h3><ul class="pd-list">${car.coverage.map((c) => `<li>${t(c)}</li>`).join('')}</ul></div>
<div><h3>Điểm loại trừ chính</h3><ul class="pd-list no">${car.exclusions.map((c) => `<li>${t(c)}</li>`).join('')}</ul></div>
</div>
</div></section>

${faqBlock([...tn.tndsFaqs, car.faqs[2]])}`;

  const faqs = [...tn.tndsFaqs, car.faqs[2]];
  const html = page({
    path: P,
    title: 'Bảo hiểm TNDS ô tô bắt buộc | Biểu phí và tính phí theo loại xe | PVI Thành Đô',
    description: 'Tính phí bảo hiểm TNDS ô tô bắt buộc theo Nghị định 67/2023/NĐ-CP, biểu phí đầy đủ từng loại xe kèm VAT, mức trách nhiệm, hồ sơ và bồi thường. Bảo hiểm người lao động công trường.',
    image: '/assets/section-bat-buoc.webp',
    head: faqJsonLd(faqs) + breadcrumbJsonLd(P, 'Bảo hiểm bắt buộc'),
    main,
    scripts: '<script src="page.js" defer></script>',
  });
  write('san-pham/bao-hiem-bat-buoc/index.html', html);

  const js = `/* Bộ tính phí TNDS. Dữ liệu và công thức chép nguyên từ tnds-data.ts của baohiempvi-vn:
   dòng thường lấy thẳng phí; taxi = 170% xe kinh doanh cùng số chỗ; tập lái = 120% xe cùng chủng loại;
   xe chuyên dùng khác = 120% xe tải cùng trọng tải; kinh doanh trên 25 chỗ = 4.813.000đ + 30.000đ × (số chỗ − 25). */
(() => {
  const DATA = ${JSON.stringify(calcData)};
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
`;
  write('san-pham/bao-hiem-bat-buoc/page.js', js);
}

/* ═════════════ 2. BẢO HIỂM TAI NẠN 24/24 ═════════════ */
{
  const P = '/san-pham/bao-hiem-tai-nan/';
  const plans = ac.accidentPlans, tiers = ac.groupTiers;
  const planOpts = plans.map((p, i) => `<option value="${p.id}"${p.id === '100' ? ' selected' : ''}>Gói ${esc(p.label)}, phí gốc ${vnd(p.basePremium)}/người/năm</option>`).join('');
  const termOpts = ac.termOptions.map((o) => `<option value="${o.months}">${esc(o.label)}</option>`).join('');
  const matrix = `<div class="pd-scroll pd-card"><table class="pd-table"><thead><tr><th scope="col">Gói (số tiền bảo hiểm)</th>${tiers.map((x) => `<th scope="col" class="num">${esc(x.shortLabel)} người${x.discount ? `<br>giảm ${Math.round(x.discount * 100)}%` : '<br>phí gốc'}</th>`).join('')}</tr></thead><tbody>${plans.map((p) => `<tr><th scope="row">${esc(p.label)}</th>${tiers.map((x, i) => `<td class="num${i === 0 ? ' strong' : ''}">${vnd(ac.premiumFor(p, i, 12))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  const audience = ac.audienceCards.map((c) => {
    const plan = plans.find((p) => p.id === c.planId);
    const fee = ac.premiumFor(plan, c.tierIndex, 12);
    return `<article class="pd-row"${c.id === 'nha-thau' ? ' id="nha-thau"' : ''}><div><span class="flag${c.required ? ' req' : ''}">${esc(c.flag)}</span><span class="who">${esc(c.eyebrow)}</span></div><div><h3>${t(c.title.replace(/<br\s*\/?>/g, ' '))}</h3><p>${t(c.summary)}</p></div><div class="price"><b>${vnd(fee)}</b><span>${t(c.priceNote)}</span></div></article>`;
  }).join('');

  const cases = ac.claimScenarios.map((s) => `<article class="pd-case"><h3>${t(s.title)}</h3><p>${t(s.context)}</p><dl>${s.steps.map((x) => `<div><dt>${t(x.label)}</dt><dd>${t(x.value)}</dd></div>`).join('')}</dl><div class="res"><span>Số tiền chi trả</span><strong>${t(s.result)}</strong></div><p class="fire-note">${t(s.note)}</p></article>`).join('');

  const main = `
<section class="fire-hero"><div class="fire-wrap"><div class="fire-hero-copy">
<span class="fire-eyebrow">Bảo hiểm tai nạn 24/24 · Cá nhân và doanh nghiệp</span>
<h1>Tai nạn 24/24, <em>phí theo gói và quy mô nhóm.</em></h1>
<p>${t(ac.comparisonRows[1].accident)}. ${t(ac.comparisonRows[3].accident)}. Từ 20 người trở lên được giảm phí theo quy mô, cao nhất ${esc(ac.MAX_DISCOUNT_LABEL)}.</p>
<div class="fire-actions"><a class="fire-btn fire-btn-red" href="#tinh-phi">Tính phí cho nhóm</a><a class="fire-btn fire-btn-line" href="#doi-tuong">Nhà thầu công trường</a></div>
</div><figure class="fire-hero-art"><img src="/assets/section-tai-nan.webp" width="1280" height="853" alt="Nhân sự doanh nghiệp trao đổi phương án bảo hiểm tai nạn"></figure></div></section>

<section class="fire-tool" id="tinh-phi"><div class="fire-wrap">
<h2>Tính phí theo gói, số người và thời hạn</h2>
<p class="fire-lede" style="margin-top:12px">Chọn gói số tiền bảo hiểm, nhập số người trong danh sách. Bậc giảm phí tự áp theo quy mô nhóm, thời hạn dưới 12 tháng tính theo tỷ lệ ngắn hạn.</p>
<div class="pd-grid">
<div class="fire-panel"><div class="fire-panel-head"><h3>Thông tin nhóm</h3><p>Phí tham chiếu, chưa gồm thẩm định nhóm nghề.</p></div>
<form class="pd-form" id="acc-form" novalidate>
<label class="pd-field"><span>Gói bảo hiểm</span><select id="acc-plan">${planOpts}</select></label>
<label class="pd-field"><span>Số người trong danh sách</span><input id="acc-n" type="number" inputmode="numeric" min="1" max="100000" step="1" value="50"></label>
<label class="pd-field"><span>Thời hạn</span><select id="acc-term">${termOpts}</select></label>
<p class="pd-explain" id="acc-explain" aria-live="polite">Gói 100 triệu: 250.000 đ × 80% = 200.000 đ mỗi người.</p>
</form></div>
<div>
<div class="fire-total pd-result">
<div class="fire-total-rows"><div><span>Phí mỗi người</span><b id="acc-per">200.000 đ</b></div><div><span>Bậc giảm phí</span><b id="acc-tier">20 – 100 người, giảm 20%</b></div><div><span>Số người</span><b id="acc-count">50 người</b></div></div>
<div class="fire-total-sum"><span>Tổng phí tham chiếu</span><strong id="acc-total">10.000.000 đ</strong></div>
<div class="fire-total-foot"><a class="fire-btn fire-btn-red" href="tel:0938072236">Gọi báo phí 0938 072 236</a><a class="fire-btn fire-btn-line" href="${ZALO}" target="_blank" rel="noopener" style="color:var(--ink);border:1px solid #c9d6e3;background:#fff">Gửi danh sách qua Zalo</a></div>
</div>
<p class="fire-note"><b>Lưu ý:</b> ${t(ac.FEE_SOURCE.note)}</p>
</div></div></div></section>

<section class="fire-tables" id="bang-phi"><div class="fire-wrap">
<span class="fire-eyebrow">Giảm phí theo quy mô, áp dụng từ ${esc(ac.DISCOUNT_EFFECTIVE_FROM)}</span>
<h2>Phí mỗi người một năm theo gói và số người</h2>
${matrix}
<p class="fire-note">${t(ac.faqs[8].answer)}</p>
</div></section>

<section class="pd-section" id="doi-tuong"><div class="fire-wrap">
<h2>Ai thường mua, mua để làm gì</h2>
<div class="pd-rows">${audience}</div>
<div class="fire-alert"><b>${t(ac.legalReference.current)} · ${t(ac.legalReference.effective)}</b><p>${t(ac.legalReference.replaces)}. ${t(ac.faqs[2].answer)} <a href="${ac.legalReference.href}" target="_blank" rel="noopener" style="color:var(--blue);text-decoration:underline">Đọc văn bản</a></p></div>
</div></section>

<section class="fire-compare pd-paper" id="quyen-loi"><div class="fire-wrap">
<h2>Quyền lợi và cách tính tiền chi trả</h2>
<div class="pd-scroll"><table><thead><tr><th scope="col">Quyền lợi</th><th scope="col">Căn cứ</th><th scope="col">Mức chi trả</th></tr></thead><tbody>${ac.benefitRows.map((b) => `<tr><th scope="row" style="width:34%">${t(b.group)}</th><td>${t(b.basis)}</td><td class="yes">${t(b.payout)}</td></tr>`).join('')}</tbody></table></div>
<div class="pd-cases">${cases}</div>
</div></section>

<section class="fire-compare" id="so-sanh"><div class="fire-wrap">
<h2>Khác gì chế độ tai nạn lao động của BHXH</h2>
<p class="fire-lede" style="margin-top:12px">${t(ac.faqs[1].answer)}</p>
<div class="pd-scroll"><table><thead><tr><th scope="col"><span class="sr-only">Tiêu chí</span></th><th scope="col"><span>Bắt buộc theo luật lao động</span>BHXH tai nạn lao động</th><th scope="col"><span>Bảo hiểm thương mại</span>Tai nạn 24/24</th></tr></thead><tbody>${ac.comparisonRows.map((r) => `<tr><th scope="row">${t(r.aspect)}</th><td>${t(r.social)}</td><td class="yes">${t(r.accident)}</td></tr>`).join('')}</tbody></table></div>
</div></section>

<section class="fire-docs pd-paper" id="loai-tru"><div class="fire-wrap">
<h2>Trường hợp không được chi trả</h2>
<ul class="pd-list no" style="margin-top:22px;max-width:880px">${ac.exclusions.map((e) => `<li>${t(e)}</li>`).join('')}</ul>
</div></section>

<section class="fire-docs" id="chung-tu"><div class="fire-wrap">
<h2>Mua theo danh sách, ba bước</h2>
${steps(ac.buySteps)}
${ctaRow('Gọi báo phí 0938 072 236')}
</div></section>

<section class="fire-claim pd-paper" id="boi-thuong"><div class="fire-wrap">
<span class="fire-eyebrow">Khi có người gặp tai nạn</span>
<h2>Bốn việc cần làm theo đúng thứ tự</h2>
${steps(ac.claimSteps)}
${hotline}
<div class="fire-docs-grid" style="margin-top:34px"><div><h3>Hồ sơ yêu cầu trả tiền bảo hiểm</h3><ol>${ac.claimDocuments.map((d) => `<li><b>${t(d)}</b></li>`).join('')}</ol></div>
<div><h3>Tài liệu chính thức</h3><ul class="pd-docs" style="margin-top:0;border-top:0">${ac.documents.map((d) => `<li><a href="${d.href}" target="_blank" rel="noopener" style="grid-template-columns:minmax(0,1fr) 24px"><div style="display:block;padding:0"><span class="cat">${t(d.type)}</span><b>${t(d.title)}</b></div><i aria-hidden="true">&#8599;</i></a></li>`).join('')}</ul></div></div>
</div></section>

${faqBlock(ac.faqs)}`;

  const html = page({
    path: P,
    title: 'Bảo hiểm tai nạn 24/24 | Bảng phí theo gói và số người | PVI Thành Đô',
    description: 'Bảo hiểm tai nạn 24/24 cho cá nhân, doanh nghiệp và nhà thầu công trường: phí gốc từ 50.000đ/người/năm, giảm đến 55% theo quy mô nhóm, quyền lợi, loại trừ, hồ sơ bồi thường.',
    image: '/assets/section-tai-nan.webp',
    head: faqJsonLd(ac.faqs) + breadcrumbJsonLd(P, 'Bảo hiểm tai nạn'),
    main,
    scripts: '<script src="page.js" defer></script>',
  });
  write('san-pham/bao-hiem-tai-nan/index.html', html);

  const js = `/* Bộ tính phí tai nạn 24/24. Công thức chép nguyên từ accident-data.ts:
   phí = phí gốc × (1 − giảm theo bậc) × tỷ lệ ngắn hạn, làm tròn theo đồng. */
(() => {
  const PLANS = ${JSON.stringify(plans)};
  const TIERS = ${JSON.stringify(tiers)};
  const SHORT = ${JSON.stringify(ac.shortTermRates)};
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
`;
  write('san-pham/bao-hiem-tai-nan/page.js', js);
}

/* ═════════════ 3. HÀNG HÓA XUẤT NHẬP KHẨU ═════════════ */
{
  const P = '/san-pham/hang-hoa-xuat-nhap-khau/';
  const g = pr.getProduct('hang-hoa-xuat-khau');
  const plans = g.plans;
  const main = `
<section class="fire-hero"><div class="fire-wrap"><div class="fire-hero-copy">
<span class="fire-eyebrow">${t(g.category)} · ${t(g.tag)}</span>
<h1>Bảo hiểm hàng hóa, <em>chốt trước khi hàng rời cảng.</em></h1>
<p>${t(g.summary)}</p>
<div class="fire-actions"><a class="fire-btn fire-btn-red" href="#chung-tu">Gửi thông tin lô hàng</a><a class="fire-btn fire-btn-line" href="#phuong-an">So sánh ba phương án</a></div>
</div><figure class="fire-hero-art"><img src="/assets/section-hang-hoa.webp" width="1280" height="853" alt="Container hàng hóa xuất nhập khẩu tại cảng"></figure></div></section>

<section class="pd-section"><div class="fire-wrap">
<div class="pd-grid" style="margin-top:0">
<div>${g.intro.map((p, i) => `<p class="fire-lede"${i ? ' style="margin-top:16px"' : ''}>${t(p)}</p>`).join('')}</div>
<div class="pd-card"><table class="pd-table"><caption style="padding:16px 18px 0">Phí và phạm vi căn cứ vào</caption><tbody>${g.metrics.map((m) => `<tr><th scope="row">${t(m.value)}</th><td>${t(m.label)}</td></tr>`).join('')}</tbody></table></div>
</div>
<h2 class="sr-only">Điểm chính của sản phẩm</h2><div class="pd-rows" style="margin-top:44px">${g.benefits.map((b, i) => `<article class="pd-row" style="grid-template-columns:80px minmax(0,1fr)"><div><span class="flag">${String(i + 1).padStart(2, '0')}</span></div><div><h3>${t(b.title)}</h3><p>${t(b.text)}</p></div></article>`).join('')}</div>
</div></section>

<section class="fire-compare pd-paper" id="phuong-an"><div class="fire-wrap">
<h2>Ba cách mua, chọn theo nhịp xuất nhập khẩu</h2>
<div class="pd-scroll"><table><thead><tr><th scope="col"><span class="sr-only">Tiêu chí</span></th>${plans.map((p) => `<th scope="col">${p.featured ? '<span>Hay dùng nhất</span>' : '<span>&nbsp;</span>'}${t(p.name)}</th>`).join('')}</tr></thead><tbody>
<tr><th scope="row">Phù hợp với</th>${plans.map((p) => `<td class="yes">${t(p.forWhom)}</td>`).join('')}</tr>
<tr><th scope="row">Nội dung</th>${plans.map((p) => `<td>${p.items.map(t).join('<br>')}</td>`).join('')}</tr>
<tr><th scope="row">Điều kiện</th>${plans.map((p) => `<td>${t(p.note)}</td>`).join('')}</tr>
</tbody></table></div>
</div></section>

<section class="fire-docs" id="pham-vi"><div class="fire-wrap">
<h2>Phạm vi bảo hiểm và điểm loại trừ</h2>
<div class="pd-two">
<div><h3>Phạm vi được xem xét</h3><ul class="pd-list">${g.coverage.map((c) => `<li>${t(c)}</li>`).join('')}</ul></div>
<div><h3>Không thuộc phạm vi nếu chưa thỏa thuận</h3><ul class="pd-list no">${g.exclusions.map((c) => `<li>${t(c)}</li>`).join('')}</ul></div>
</div>
</div></section>

<section class="fire-docs pd-paper" id="chung-tu"><div class="fire-wrap">
<h2>Chứng từ cần gửi và các bước nhận phương án</h2>
<div class="fire-docs-grid">
<div><h3>Chứng từ lô hàng</h3><ol>${g.documents.map((d) => `<li><b>${t(d)}</b></li>`).join('')}</ol></div>
<div><h3>Các bước</h3><ol>${g.buySteps.map((s) => `<li><b>${t(s.title)}</b><span>${t(s.text)}</span></li>`).join('')}</ol></div>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</div></section>

<section class="fire-news" id="tai-lieu" style="background:#fff"><div class="fire-wrap">
<h2>Tài liệu và hướng dẫn chính thức</h2>
<ul class="pd-docs">${g.attachments.filter((a) => a.href).map((a) => `<li><a href="${a.href}" target="_blank" rel="noopener"><span class="cat">${t(a.meta)}</span><div><b>${t(a.title)}</b><span class="d">${t(a.description)}</span></div><i aria-hidden="true">&#8599;</i></a></li>`).join('')}</ul>
</div></section>

<section class="fire-claim pd-paper" id="boi-thuong"><div class="fire-wrap">
<span class="fire-eyebrow">Khi phát hiện tổn thất</span>
<h2>Ba việc cần làm ngay</h2>
${steps(g.claimSteps)}
${hotline}
<p class="fire-note"><b>Nguồn:</b> <a href="${g.sourceUrl}" target="_blank" rel="noopener" style="color:var(--blue);text-decoration:underline">${t(g.sourceLabel)}</a>. Phạm vi, điều khoản, mức khấu trừ và phí được chuyên viên xác nhận theo từng hồ sơ.</p>
</div></section>

${faqBlock(g.faqs)}`;

  const html = page({
    path: P,
    title: 'Bảo hiểm hàng hóa xuất nhập khẩu | Theo chuyến, hợp đồng bao | PVI Thành Đô',
    description: 'Bảo hiểm hàng hóa xuất nhập khẩu của Bảo hiểm PVI: phương án từng chuyến, hợp đồng bao và chuỗi logistics; chứng từ cần gửi, phạm vi, loại trừ và các bước khi có tổn thất.',
    image: '/assets/section-hang-hoa.webp',
    head: faqJsonLd(g.faqs) + breadcrumbJsonLd(P, 'Bảo hiểm hàng hóa xuất nhập khẩu'),
    main,
  });
  write('san-pham/hang-hoa-xuat-nhap-khau/index.html', html);
}
