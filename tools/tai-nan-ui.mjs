// Trang Bảo hiểm tai nạn 24/24 của pvihcm, dựng theo đúng bố cục trang
// /bao-hiem-tai-nan-24-24 của baohiempvi-vn (chủ site yêu cầu 28/10/2026).
// Bản gốc là React (accident-calculator.tsx, accident-sections.tsx,
// accident-knowledge-trio.tsx); ở đây chuyển sang HTML tĩnh, dữ liệu lấy từ
// tools/data/accident.mjs và tools/data/accident-updates.mjs (bản chép nguyên
// văn của accident-data.ts, accident-updates.ts). Không gõ lại số liệu.
// CSS: dist/tai-nan.css (trích từ globals.css của baohiempvi-vn). JS: dist/tai-nan.js.
// Link nội bộ của baohiempvi-vn được đổi sang trang tương ứng trên pvihcm.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { t, esc } from './chrome.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(HERE, '../dist');

// Tài liệu PVI chép sang /tai-lieu/ của pvihcm (cùng file với baohiempvi-vn).
const PDF = {
  quyTac: '/tai-lieu/pvi-quy-tac-bao-hiem-tai-nan-ca-nhan-01-07-2025.pdf',
  thuongTat: '/tai-lieu/pvi-bang-ty-le-thuong-tat-tai-nan-ca-nhan-01-07-2025.pdf',
  gcn: '/tai-lieu/pvi-giay-chung-nhan-tai-nan-ca-nhan-ban-an-danh-tham-khao.pdf',
};
// Bài viết của pvihcm về tai nạn, dùng thay các link kiến thức của baohiempvi-vn.
const POSTS = {
  loiIch: '/tin-tuc/loi-ich-bao-hiem-tai-nan-ca-nhan/',
  congTrinh: '/tin-tuc/bao-hiem-tai-nan-cong-trinh-pvi/',
};
const RELATED_HREF = {
  '/bao-hiem-xay-dung-lap-dat': '/san-pham/bao-hiem-cong-trinh/',
  '/bao-hiem-cham-soc-suc-khoe': '/san-pham/bao-hiem-suc-khoe/',
  '/kien-thuc/bao-hiem-tai-nan-24-24': POSTS.loiIch,
};
const IMG = {
  'nha-thau': 'tn-the-nha-thau',
  'doanh-nghiep': 'tn-the-doanh-nghiep',
  'ca-nhan': 'tn-the-ca-nhan',
};

const h1Of = (href) => {
  try {
    const html = fs.readFileSync(path.join(DIST, href, 'index.html'), 'utf8');
    return (html.match(/<h1[^>]*>([^<]*)/) || [])[1]?.trim() || '';
  } catch { return ''; }
};
const pct = (x) => Math.round(x * 100);
const ext = (href) => /^https?:/.test(href) || /\.pdf$/.test(href);
const tgt = (href) => (ext(href) ? ' target="_blank" rel="noopener"' : '');
const br = (s) => s.split(/<br\s*\/?>/).map(t).join('<br>');

/* ── Hero ── */
const hero = (ac) => `
<section class="auto-hero accident-hero">
<div class="auto-hero-orb orb-one"></div><div class="auto-hero-orb orb-two"></div>
<div class="shell auto-hero-copy">
<span class="auto-kicker">BẢO HIỂM CON NGƯỜI · PVI</span>
<h1>Bảo hiểm Tai nạn <em>24/24</em> PVI</h1>
<p>${t('Bảo vệ người lao động 24 giờ mỗi ngày, trong và ngoài giờ làm việc — và là giấy tờ nhà thầu cần có trong hồ sơ theo Nghị định 220/2026/NĐ-CP.')}</p>
<ul class="accident-chips"><li>Bồi thường tai nạn 24/24h, trong và ngoài giờ</li><li>Cấp giấy chứng nhận trong ngày</li><li>Xuất hóa đơn VAT</li></ul>
<div class="auto-hero-links"><a href="${ac.ZALO_URL}" target="_blank" rel="noopener">Nhận báo giá qua Zalo <i>→</i></a><a href="#tinh-phi">Tính phí ngay <i>↓</i></a></div>
</div>
</section>`;

/* ── Ba thẻ đối tượng + bộ tính phí + cột phải ── */
function experience(ac) {
  const fmt = ac.formatVnd;
  const cards = ac.audienceCards.map((c, i) => {
    const plan = ac.accidentPlans.find((p) => p.id === c.planId);
    const img = IMG[c.id];
    return `<button class="auto-choice-card is-tier${i === 0 ? ' is-selected' : ''}"${c.id === 'nha-thau' ? ' id="nha-thau"' : ''} type="button" aria-pressed="${i === 0}" data-card="${c.id}" data-audience="${c.audienceId}" data-plan="${c.planId}" data-n="${c.suggestedHeadcount}">`
      + `<img src="/assets/${img}.webp" srcset="/assets/${img}-480.webp 480w, /assets/${img}.webp 760w" sizes="(max-width:760px) 88vw, 380px" width="760" height="950" alt="${esc(c.imageAlt)}"${i === 0 ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`
      + `<span class="auto-choice-veil"></span><span class="auto-tier-flag${c.required ? ' is-required' : ''}">${esc(c.flag)}</span>`
      + `<span class="auto-choice-copy"><small>${esc(c.eyebrow)}</small><strong>${br(c.title)}</strong><em>${t(c.summary)}</em>`
      + `<b class="auto-choice-price"><small class="auto-choice-price-prefix">PHÍ THAM CHIẾU TỪ</small><strong class="auto-choice-price-amount">${plan ? fmt(ac.premiumFor(plan, c.tierIndex)) : '-'}</strong><span>${t(c.priceNote)}</span></b>`
      + `<span class="auto-choice-selected">Đang chọn <i>→</i></span></span></button>`;
  }).join('');

  // Trạng thái ban đầu giống bản gốc: nhà thầu, nhóm nghề 3, gói 20 triệu, 1 người, 12 tháng.
  const plan0 = ac.accidentPlans.find((p) => p.id === '20');
  const per0 = ac.premiumFor(plan0, 0, 12);
  const tier0 = ac.groupTiers[0];
  const seg = (label, inner) => `<div class="auto-segment-group"><small>${label}</small>${inner}</div>`;
  const laddder = ac.groupTiers.filter((x) => x.discount > 0).map((x) => `<li data-tier="${x.id}"><span>${t(x.label)}</span><b>−${pct(x.discount)}%</b></li>`).join('');

  return `
<section class="auto-experience accident-experience" id="doi-tuong" aria-label="Chọn nhóm người tham gia và ước tính phí">
<div class="auto-choice-grid accident-tier-grid">${cards}</div>
<div class="auto-trust-line" aria-label="Các điểm nổi bật">${ac.trustPoints.map((p) => `<span>◇ ${t(p)}</span>`).join('')}</div>

<div class="auto-dashboard" id="tinh-phi">
<div class="auto-dashboard-main">
<div class="auto-dashboard-heading"><div><span>CÔNG CỤ TÍNH PHÍ · CÓ TỶ LỆ NGẮN HẠN</span><h2 id="accident-calc-title">Nhập 4 thông tin. Thấy phí ngay.</h2></div><a href="#bang-phi">Xem bảng phí đầy đủ <i>→</i></a></div>
<div class="auto-segments">
${seg('01. Đối tượng tham gia', `<div role="radiogroup" aria-label="Đối tượng tham gia">${ac.audienceKinds.map((k, i) => `<button type="button" role="radio" aria-checked="${i === 0}" class="${i === 0 ? 'is-current' : ''}" data-aud="${k.id}" data-contractor="${k.contractor ? 1 : 0}">${t(k.label)}</button>`).join('')}</div>`)}
${seg('02. Nhóm nghề', `<div class="accident-field"><label for="accident-occupation">Nhóm nghề của người được bảo hiểm</label><select id="accident-occupation">${ac.occupationGroups.map((o, i) => `<option value="${o.id}"${i === 2 ? ' selected' : ''}>${t(o.label)}</option>`).join('')}</select><p class="accident-field-help">Nhóm nghề quyết định hệ số phí. Hệ số hiện chưa được nạp vào công cụ, nên kết quả bên dưới là phí tham chiếu chung.</p></div>`)}
${seg('03. Gói mức trách nhiệm', `<div>${ac.accidentPlans.map((p) => `<button type="button" class="${p.id === '20' ? 'is-current' : ''}" data-plan="${p.id}">${t(p.label)}</button>`).join('')}<button type="button" class="" data-plan="khac">Mức khác</button></div>`)}
${seg('04. Số người và thời hạn', `<div class="accident-field-row"><div class="accident-field"><label for="accident-headcount">Số người tham gia</label><input id="accident-headcount" type="number" min="1" step="1" inputmode="numeric" value="1"></div><div class="accident-field"><label for="accident-term">Thời hạn bảo hiểm</label><select id="accident-term">${ac.termOptions.map((o) => `<option value="${o.months}"${o.months === 12 ? ' selected' : ''}>${t(o.label)}</option>`).join('')}</select></div></div>`)}
</div>

<div class="auto-fee-panel" aria-live="polite">
<div id="tn-fee-ok">
<div class="auto-fee-value"><span>Tổng phí tạm tính <small id="tn-fee-ctx">(1 người · ${t(plan0.label)} · 12 tháng)</small></span><strong id="tn-fee-total">${fmt(per0)}</strong><p id="tn-fee-desc">${fmt(per0)} / người / 12 tháng · ${t(tier0.label)} · phí gốc, chưa có chiết khấu nhóm</p></div>
<div class="auto-fee-line"><span>Phí/người</span><b id="tn-fee-per">${fmt(per0)}</b><i>×</i><span>Số người</span><b id="tn-fee-n">1</b><i>=</i><span>Tổng tạm tính</span><b id="tn-fee-sum">${fmt(per0)}</b></div>
</div>
<div class="auto-fee-value" id="tn-fee-call" hidden><span>Trường hợp này không tự tính được</span><strong class="accident-fee-contact">Liên hệ báo phí</strong><p>Mức trách nhiệm ngoài 5 gói chuẩn cần nhân viên xác nhận trước khi báo phí.</p></div>
<div class="accident-compliance" role="note" id="tn-compliance"><span aria-hidden="true">!</span><p><b>Kiểm tra mức tối thiểu trước khi chốt gói.</b> ${t('Mức trách nhiệm tối thiểu áp dụng theo Nghị định 220/2026/NĐ-CP và yêu cầu riêng của hồ sơ mời thầu. Gửi hồ sơ qua Zalo để nhân viên đối chiếu trước khi chốt gói — chọn thấp hơn mức tối thiểu có thể bị loại khi thẩm định.')}</p></div>
<p class="accident-disclaimer">Phí tạm tính, chưa gồm thẩm định nhóm nghề. Báo phí chính thức do nhân viên PVI phát hành.</p>
</div>

<div class="accident-calc-actions"><button type="button" class="accident-primary" data-tn-share>Mua ngay <i aria-hidden="true">→</i></button><a class="accident-secondary" id="tn-template" href="${ac.ZALO_URL}" target="_blank" rel="noopener">Xin mẫu danh sách (.xlsx) qua Zalo</a></div>
<div class="accident-share-note" id="tn-share-note" hidden><p></p><pre></pre></div>
</div>

<aside class="auto-dashboard-aside" aria-label="Thông tin hỗ trợ khi tính phí">
<section class="auto-limit-card auto-side-card"><span>ĐANG ÁP DỤNG</span>
<div><i aria-hidden="true">◎</i><p>Bậc chiết khấu<b id="tn-aside-tier">${t(tier0.label)} <small>phí gốc</small></b></p></div>
<div><i aria-hidden="true">◇</i><p>Căn cứ pháp lý<b>NĐ 220/2026/NĐ-CP <small>hiệu lực 01/7/2026</small></b></p></div>
<div><i aria-hidden="true">◈</i><p>Cấp giấy chứng nhận<b>${t(ac.FACTS.certificateTurnaround)} <small>sau khi đủ danh sách</small></b></p></div>
</section>
<section class="auto-sidebar-consult accident-offer" aria-label="Mua ngay để hưởng giảm phí"><span>MUA NGAY · GIẢM PHÍ ĐẾN ${esc(ac.MAX_DISCOUNT_LABEL)}</span><h3>Càng đông người,<br>phí mỗi người càng rẻ.</h3>
<ul class="accident-offer-ladder">${laddder}</ul>
<p class="accident-offer-note">Áp dụng từ ${esc(ac.DISCOUNT_EFFECTIVE_FROM)}. Tỷ lệ tính trên phí gốc của gói đã chọn.</p>
<button type="button" class="accident-offer-cta" data-tn-share>Đặt mua ngay <i aria-hidden="true">→</i></button>
<a class="accident-offer-call" href="${ac.CUSTOMER_CARE_TEL}">Hoặc gọi ${esc(ac.CUSTOMER_CARE_PHONE)}</a>
</section>
<section class="accident-trio-aside" aria-labelledby="accident-trio-aside-title"><h3 id="accident-trio-aside-title">Tài liệu bảo hiểm tai nạn cá nhân</h3><ul>
${[
    ['01', 'Quy tắc bảo hiểm TNCN PVI 2026', 'Cập nhật 2026 · Quyết định 498/QĐ-PVIBH', PDF.quyTac, 'tn-mang-kien-thuc', 'kien-thuc-chung'],
    ['02', 'Bảng tỷ lệ trả tiền thương tật', 'Phụ lục 1 · Xem tài liệu PDF', PDF.thuongTat, 'tn-mang-van-ban', 'tin-tuc-nganh'],
    ['03', 'Giấy chứng nhận bảo hiểm PVI', 'Chứng từ thực tế · Bản đã ẩn thông tin', PDF.gcn, 'tn-mang-thuc-te', 'trai-nghiem-thuc-te'],
  ].map(([n, name, hint, href, img, stream]) => `<li><a class="accident-trio-tile" data-stream="${stream}" href="${href}" target="_blank" rel="noopener"><img src="/assets/${img}-480.webp" alt="" width="480" height="320" loading="lazy" decoding="async"><span class="accident-trio-veil" aria-hidden="true"></span><span class="accident-trio-index">${n}</span><strong>${t(name)}</strong><small>${t(hint)}</small><i aria-hidden="true">↗</i></a></li>`).join('')}
</ul><a class="accident-trio-all" href="/tin-tuc/">Xem toàn bộ tin tức và kiến thức <i aria-hidden="true">→</i></a></section>
</aside>
</div>
</section>`;
}

/* ── Các khối nội dung (accident-sections.tsx) ── */
const heading = (kicker, id, title, lead = '') => `<div class="auto-section-heading"><span>${kicker}</span><h2 id="${id}">${t(title)}</h2>${lead ? `<p>${t(lead)}</p>` : ''}</div>`;

const answer = () => `
<section class="accident-answer" id="la-gi" aria-labelledby="accident-answer-title"><span class="auto-kicker blue">TRẢ LỜI THẲNG</span><h2 id="accident-answer-title">Bảo hiểm tai nạn 24/24 là gì?</h2>
<p class="accident-answer-lead">${t('Bảo hiểm tai nạn 24/24 là hợp đồng bảo hiểm con người chi trả một khoản tiền khi người được bảo hiểm bị thương tật hoặc tử vong do tai nạn, trong 24 giờ mỗi ngày và suốt thời hạn hợp đồng. Không phân biệt tai nạn xảy ra trong hay ngoài giờ làm việc, ở công trường hay trên đường về nhà. Số tiền chi trả xác định theo số tiền bảo hiểm đã chọn nhân với tỷ lệ thương tật do giám định y khoa kết luận, chứ không phụ thuộc chi phí điều trị thực tế — trừ phần quyền lợi chi phí y tế. Với nhà thầu thi công, đây cũng là loại bảo hiểm bắt buộc cho người lao động trên công trường theo pháp luật về đầu tư xây dựng.')}</p></section>`;

function legal(ac, up) {
  const date = (iso) => iso.slice(0, 10).split('-').reverse().join('/');
  const items = up.legalUpdates.map((u) => `<details><summary><span class="accident-hub-q">${t(u.title)}${u.status === 'current' ? ` <b class="accident-flag is-ok">${t(u.statusLabel)}</b>` : ''}</span><em>${date(u.updatedAt)}</em><i aria-hidden="true">+</i></summary><div class="accident-hub-answer">${u.body.map((p) => `<p>${t(p)}</p>`).join('')}<p class="accident-hub-byline">Cập nhật ${date(u.updatedAt)} · Ban nội dung Bảo hiểm PVI Thành Đô</p>${u.sourceHref ? `<a href="${u.sourceHref}" target="_blank" rel="noopener">${t(u.sourceLabel || 'Mở văn bản gốc')} <i aria-hidden="true">↗</i></a>` : ''}</div></details>`).join('');
  const trio = [
    ['01', 'kien-thuc-chung', 'tn-mang-kien-thuc', 'Kiến thức chung', 'Theo từng loại bảo hiểm', POSTS.loiIch],
    ['02', 'trai-nghiem-thuc-te', 'tn-mang-thuc-te', 'Trải nghiệm thực tế', 'Tình huống thật và tra cứu', POSTS.congTrinh],
    ['03', 'tin-tuc-nganh', 'tn-mang-van-ban', 'Tin tức toàn ngành', 'Pháp lý và hiệu lực mới', '/tin-tuc/#phap-ly-moi'],
  ].map(([n, stream, img, name, hint, href]) => {
    const latest = href.includes('#') ? '' : h1Of(href);
    return `<a class="accident-trio-card" data-stream="${stream}" href="${href}"><img src="/assets/${img}.webp" alt="" width="960" height="640" loading="lazy" decoding="async"><span class="accident-trio-veil" aria-hidden="true"></span><span class="accident-trio-top"><span class="accident-trio-index">${n}</span></span><span class="accident-trio-body"><strong>${t(name)}</strong><span class="accident-trio-hint">${t(hint)}</span><span class="accident-trio-latest">${latest ? `Đọc: ${t(latest)}` : 'Mục Pháp lý mới trên trang Tin tức'}</span></span><span class="accident-trio-go">Xem bài <i aria-hidden="true">→</i></span></a>`;
  }).join('');
  return `
<section class="accident-legal" id="can-cu-phap-ly" aria-labelledby="accident-legal-title">
${heading('HUB CẬP NHẬT · CĂN CỨ PHÁP LÝ', 'accident-legal-title', 'Văn bản nào đang áp dụng từ 1/7/2026?', `Văn bản đang có hiệu lực là ${ac.legalReference.current}, ${ac.legalReference.effective.toLowerCase()}, thay thế Nghị định 67/2023/NĐ-CP. Mọi mức trách nhiệm tối thiểu phải đối chiếu theo văn bản này.`)}
<div class="accident-product-docs" aria-labelledby="accident-product-docs-title"><div class="accident-product-docs-copy"><span class="auto-kicker blue">TÀI LIỆU SẢN PHẨM · PVI</span><h3 id="accident-product-docs-title">Quy tắc và chứng từ bảo hiểm tai nạn cá nhân</h3>
<p>Tải tài liệu tham khảo trực tiếp tại trang sản phẩm. Quy tắc được ban hành theo Quyết định 498/QĐ-PVIBH, áp dụng từ ngày 01/07/2025; quyền lợi cụ thể vẫn căn cứ giấy chứng nhận và điều khoản ghi trên hợp đồng của từng khách hàng.</p>
<ul class="accident-product-doc-list">
<li><a href="${PDF.quyTac}" target="_blank" rel="noopener"><span><b>Quy tắc bảo hiểm tai nạn cá nhân PVI</b><small>Quyết định 498/QĐ-PVIBH · hiệu lực 01/07/2025 · PDF</small></span><i aria-hidden="true">↗</i></a></li>
<li><a href="${PDF.thuongTat}" target="_blank" rel="noopener"><span><b>Bảng tỷ lệ trả tiền thương tật</b><small>Tài liệu dùng cùng quy tắc bảo hiểm · PDF</small></span><i aria-hidden="true">↗</i></a></li>
<li><a href="${PDF.gcn}" target="_blank" rel="noopener"><span><b>Giấy chứng nhận PVI · bản tham khảo đã ẩn danh</b><small>Mẫu chứng nhận đã ẩn thông tin khách hàng · PDF</small></span><i aria-hidden="true">↗</i></a></li>
</ul>
<p class="accident-product-doc-note">Mẫu giấy chứng nhận được trích từ chứng từ PVI thực tế và đã ẩn thông tin khách hàng. Khách hàng có thể dùng mẫu để nhận biết các mục cần kiểm tra khi nhận giấy chứng nhận; quyền lợi cụ thể áp dụng theo hợp đồng PVI cấp cho từng người mua.</p>
<div class="accident-step-actions"><a class="accident-secondary" href="${POSTS.loiIch}">Đọc bài: lợi ích và cách đọc giấy chứng nhận →</a></div>
</div><img src="/assets/tn-mang-van-ban.webp" alt="Hình ảnh mô phỏng tài liệu, bút và kính trên bàn làm việc" width="960" height="640" loading="lazy" decoding="async"></div>
<div class="auto-faqs accident-hub-faq">${items}</div>
<div class="accident-callout"><span aria-hidden="true">!</span><p>${t(`Mua theo mức của văn bản cũ có thể bị loại khi thẩm định hồ sơ thầu. Nhiều báo giá vẫn dẫn Thông tư 329/2016 hoặc Nghị định 119/2015 — cả hai đã hết hiệu lực. Nếu báo giá anh/chị đang cầm ghi hai văn bản đó, đề nghị bên bán phát hành lại theo ${ac.legalReference.current}.`)}</p><a href="${ac.legalReference.href}" target="_blank" rel="noopener">Mở văn bản ↗</a></div>
<section class="accident-trio-band" aria-labelledby="accident-trio-band-title"><div class="accident-trio-band-head"><span class="accident-trio-eyebrow">BA MẢNG KIẾN THỨC · TAI NẠN 24/24</span><h3 id="accident-trio-band-title">Hiểu sản phẩm, xem tình huống thật, theo dõi văn bản mới</h3></div><div class="accident-trio-grid">${trio}</div></section>
</section>`;
}

const benefits = (ac) => `
<section class="accident-benefits" id="quyen-loi" aria-labelledby="accident-benefits-title">
${heading('QUYỀN LỢI', 'accident-benefits-title', 'Được bồi thường bao nhiêu, tính thế nào?', 'Bốn nhóm quyền lợi dưới đây là khung chi trả của sản phẩm. Ba nhóm đầu tính trên số tiền bảo hiểm; nhóm cuối xử lý trường hợp người được bảo hiểm tử vong sau một thời gian điều trị.')}
<div class="auto-table-scroll"><table class="accident-table"><caption>Bốn nhóm quyền lợi của bảo hiểm tai nạn 24/24</caption><thead><tr><th scope="col">Nhóm quyền lợi</th><th scope="col">Căn cứ xác định</th><th scope="col">Mức chi trả</th></tr></thead><tbody>${ac.benefitRows.map((r) => `<tr><th scope="row">${t(r.group)}</th><td>${t(r.basis)}</td><td><b>${t(r.payout)}</b></td></tr>`).join('')}</tbody></table></div>
</section>`;

const scenarios = (ac) => `
<section class="accident-scenarios" id="vi-du" aria-labelledby="accident-scenarios-title">
${heading('VÍ DỤ BẰNG SỐ', 'accident-scenarios-title', 'Bồi thường thật thì ra bao nhiêu tiền?', 'Hai tình huống hay gặp nhất trên hồ sơ, tính từng bước để anh/chị đối chiếu với trường hợp của mình.')}
<div class="accident-scenario-grid">${ac.claimScenarios.map((s, i) => `<article><span class="accident-scenario-index">Tình huống ${i + 1}</span><h3>${t(s.title)}</h3><p class="accident-scenario-context">${t(s.context)}</p><ol class="accident-scenario-steps">${s.steps.map((x) => `<li><span>${t(x.label)}</span><b>${t(x.value)}</b></li>`).join('')}</ol><p class="accident-scenario-result"><span>Số tiền chi trả</span><strong>${t(s.result)}</strong></p><p class="accident-scenario-note">${t(s.note)}</p></article>`).join('')}</div>
</section>`;

const exclusions = (ac) => `
<section class="accident-exclusions" id="loai-tru" aria-labelledby="accident-exclusions-title">
${heading('ĐIỀU KHOẢN LOẠI TRỪ', 'accident-exclusions-title', 'Trường hợp nào không được chi trả?', 'Nói trước để anh/chị không mất thời gian làm hồ sơ rồi bị từ chối. Đây là các nhóm loại trừ chính.')}
<ul class="accident-exclusion-list">${ac.exclusions.map((x) => `<li>${t(x)}</li>`).join('')}</ul>
</section>`;

const feeTable = (ac) => `
<section class="accident-fee" id="bang-phi" aria-labelledby="accident-fee-title">
${heading('BẢNG PHÍ THAM CHIẾU · THỜI HẠN 12 THÁNG', 'accident-fee-title', 'Phí một người một năm là bao nhiêu?', `Từ 20 người trở lên là có giảm phí. Cột càng sang phải, nhóm càng đông, phí mỗi người càng thấp — cao nhất giảm ${ac.MAX_DISCOUNT_LABEL}, áp dụng từ ${ac.DISCOUNT_EFFECTIVE_FROM}.`)}
<div class="accident-discount-band"><span>TỶ LỆ GIẢM PHÍ THEO QUY MÔ NHÓM</span><ol>${ac.groupTiers.filter((x) => x.discount > 0).map((x) => `<li><b>−${pct(x.discount)}%</b><span>${t(x.label)}</span></li>`).join('')}</ol><p>Áp dụng từ ${esc(ac.DISCOUNT_EFFECTIVE_FROM)}. Tỷ lệ tính trên phí gốc của gói mức trách nhiệm đã chọn.</p></div>
<div class="auto-table-scroll"><table class="accident-table accident-fee-table"><caption>Phí bảo hiểm tai nạn 24/24 theo gói mức trách nhiệm và số người tham gia, đơn vị đồng/người/năm</caption><thead><tr><th scope="col">Gói mức trách nhiệm</th>${ac.groupTiers.map((x) => `<th scope="col">${t(x.label)}<small>${x.discount > 0 ? `−${pct(x.discount)}%` : 'phí gốc'}</small></th>`).join('')}</tr></thead><tbody>${ac.accidentPlans.map((p) => `<tr><th scope="row">${t(p.label)}</th>${ac.groupTiers.map((x, i) => `<td>${ac.formatVnd(ac.premiumFor(p, i))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
<h3 class="accident-subheading" id="phi-ngan-han">Mua dưới 12 tháng thì tính phí thế nào?</h3>
<p class="accident-subheading-lead">Phí ngắn hạn không chia đều theo tháng. Lấy phí cả năm nhân với tỷ lệ dưới đây, rồi mới trừ chiết khấu theo quy mô nhóm. Ví dụ gói 100 triệu mua 6 tháng cho 120 người: 250.000 × 65% × 70% = 113.750 đ/người.</p>
<div class="auto-table-scroll"><table class="accident-table accident-shortterm-table"><caption>Tỷ lệ phí ngắn hạn tính trên phí bảo hiểm một năm</caption><thead><tr><th scope="col">Số tháng bảo hiểm</th>${ac.shortTermRates.map((x) => `<th scope="col">${x.months}</th>`).join('')}</tr></thead><tbody><tr><th scope="row">Tỷ lệ phí</th>${ac.shortTermRates.map((x) => `<td>${pct(x.rate)}%</td>`).join('')}</tr></tbody></table></div>
<div class="auto-reference-note"><span aria-hidden="true">i</span><p><b>Phí gốc tham chiếu, chưa phải báo phí chính thức.</b> ${t(ac.FEE_SOURCE.note)}</p></div>
</section>`;

const comparison = (ac) => `
<section class="accident-comparison" id="so-sanh-bhxh" aria-labelledby="accident-comparison-title">
${heading('XỬ LÝ MỘT HIỂU LẦM PHỔ BIẾN', 'accident-comparison-title', 'Đóng BHXH rồi thì mua cái này làm gì?', 'Vì hai loại phủ hai vùng khác nhau. BHXH phủ tai nạn gắn với quá trình lao động; bảo hiểm tai nạn 24/24 phủ cả phần ngoài giờ làm. Và trong hồ sơ thầu, chỉ giấy chứng nhận bảo hiểm mới được tính.')}
<div class="auto-table-scroll"><table class="accident-table"><caption>${t('So sánh chế độ BHXH về tai nạn lao động — bệnh nghề nghiệp với bảo hiểm tai nạn 24/24')}</caption><thead><tr><th scope="col">Tiêu chí</th><th scope="col">BHXH · TNLĐ-BNN</th><th scope="col">Bảo hiểm tai nạn 24/24</th></tr></thead><tbody>${ac.comparisonRows.map((r) => `<tr><th scope="row">${t(r.aspect)}</th><td>${t(r.social)}</td><td><b>${t(r.accident)}</b></td></tr>`).join('')}</tbody></table></div>
</section>`;

const stepsList = (arr) => `<ol class="accident-steps">${arr.map((s, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><div><h3>${t(s.title)}</h3><p>${t(s.text)}</p></div></li>`).join('')}</ol>`;

const buy = (ac) => `
<section class="accident-buy" id="quy-trinh-mua" aria-labelledby="accident-buy-title">
${heading('QUY TRÌNH MUA', 'accident-buy-title', 'Mua thế nào, mất bao lâu?', 'Ba bước. Phần lâu nhất là chuẩn bị danh sách, phần còn lại nhân viên làm.')}
${stepsList(ac.buySteps)}
<div class="accident-step-actions"><a class="accident-secondary" href="${ac.ZALO_URL}" target="_blank" rel="noopener">Xin mẫu danh sách người được bảo hiểm (.xlsx)</a><p class="accident-field-help">Không gửi được file? Chụp CCCD gửi Zalo, nhân viên nhập giúp.</p></div>
</section>`;

const claim = (ac) => `
<section class="accident-claim" id="quy-trinh-boi-thuong" aria-labelledby="accident-claim-title">
${heading('QUY TRÌNH BỒI THƯỜNG', 'accident-claim-title', 'Tai nạn xảy ra thì làm gì trước?', `Gọi ${ac.CLAIMS_HOTLINE} trước khi làm thủ tục. Phần lớn hồ sơ bị kéo dài là do thiếu chứng từ ngay từ ngày đầu.`)}
<div class="accident-claim-grid">${stepsList(ac.claimSteps)}<aside class="accident-claim-docs" id="chung-tu"><h3>Hồ sơ cần chuẩn bị</h3><ul>${ac.claimDocuments.map((x) => `<li>${t(x)}</li>`).join('')}</ul><a class="accident-secondary" href="${ac.documents[2].href}" target="_blank" rel="noopener">Mở hướng dẫn bồi thường của PVI ↗</a></aside></div>
</section>`;

const faqs = (ac) => `
<section class="auto-faq-docs" id="cau-hoi"><div class="auto-faqs"><div class="auto-section-heading"><span>CÂU HỎI THƯỜNG GẶP</span><h2>Những câu khách hỏi nhiều nhất</h2></div>
${ac.faqs.map((f) => `<details><summary>${t(f.question)}<i aria-hidden="true">+</i></summary><p>${t(f.answer)}</p></details>`).join('')}</div>
<aside class="auto-docs"><span>TÀI LIỆU THAM KHẢO</span><h2>Văn bản và hướng dẫn, mở trực tiếp từ nguồn.</h2>${ac.documents.map((d) => `<a href="${d.href}" target="_blank" rel="noopener"><small>${t(d.type)}</small><b>${t(d.title)}</b><i aria-hidden="true">↗</i></a>`).join('')}</aside>
</section>`;

const contact = (ac) => `
<section class="accident-contact" id="kenh-lien-he" aria-labelledby="accident-contact-title">
${heading('LIÊN HỆ', 'accident-contact-title', 'Gọi kênh nào cho đúng việc?', `${['', 'Một', 'Hai', 'Ba', 'Bốn'][ac.contactChannels.length] || ac.contactChannels.length} kênh, mỗi kênh một loại việc. Chọn đúng kênh thì xử lý nhanh hơn nhiều.`)}
<div class="accident-contact-grid">${ac.contactChannels.map((c) => `<article><span>${t(c.label)}</span><a href="${c.href}"${c.external ? ' target="_blank" rel="noopener"' : ''}>${t(c.value)}</a><p>${t(c.when)}</p>${c.id === 'zalo' ? '<img class="accident-zalo-qr" src="/assets/zalo-qr-pvi-thanh-do.png" alt="Mã QR Zalo chính thức của Bảo hiểm PVI Thành Đô" width="132" height="132" loading="lazy" decoding="async">' : ''}</article>`).join('')}</div>
<div class="accident-form-block"><div><span class="auto-kicker blue">GỬI YÊU CẦU BÁO PHÍ</span><h3>Năm ô, không hơn.</h3><p>Kênh chốt nhanh nhất vẫn là Zalo. Form này dành cho anh/chị muốn để lại thông tin trước rồi nhận cuộc gọi sau.</p></div>
<form class="accident-form" id="tn-quote" novalidate>
<div class="accident-field"><label for="accident-name">Họ và tên</label><input id="accident-name" name="name" autocomplete="name"></div>
<div class="accident-field"><label for="accident-phone">Số điện thoại</label><input id="accident-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel"></div>
<div class="accident-field"><label for="accident-people">Số người cần bảo hiểm</label><input id="accident-people" name="people" type="number" min="1" inputmode="numeric"></div>
<div class="accident-field"><label for="accident-plan">Gói quan tâm</label><select id="accident-plan" name="plan">${ac.accidentPlans.map((p) => `<option value="${p.id}">${t(p.label)}</option>`).join('')}<option value="khac">Chưa rõ, cần tư vấn</option></select></div>
<label class="accident-consent"><input type="checkbox" name="consent"><span>Tôi đồng ý để Bảo hiểm PVI Thành Đô liên hệ và xử lý thông tin trên cho mục đích tư vấn bảo hiểm.</span></label>
<p class="accident-form-error" role="alert" hidden></p>
<button type="submit" class="accident-primary">Gửi yêu cầu báo phí <i aria-hidden="true">→</i></button>
<p class="accident-field-help">Trang không lưu thông tin này trên máy anh/chị và không đưa số điện thoại lên đường dẫn. Nút gửi chép thông tin rồi mở Zalo để anh/chị gửi trực tiếp cho nhân viên.</p>
<p class="accident-form-ok" role="status" hidden></p>
</form></div>
</section>`;

const related = (ac) => `
<section class="accident-related" aria-labelledby="accident-related-title"><div class="auto-section-heading"><span>SẢN PHẨM LIÊN QUAN</span><h2 id="accident-related-title">Thường được hỏi cùng lúc</h2></div>
<div class="accident-related-grid">${ac.relatedProducts.map((r) => `<a href="${RELATED_HREF[r.href] || r.href}"><h3>${t(r.title)}</h3><p>${t(r.text)}</p><span aria-hidden="true">→</span></a>`).join('')}</div></section>`;

const cta = (ac) => `
<section class="auto-cta"><div class="shell auto-cta-inner"><div><span>DANH SÁCH XONG LÀ CẤP ĐƯỢC</span><h2>Gửi danh sách trước.<br>Phí và giấy chứng nhận theo sau.</h2><p>Phí trên trang là phí tham chiếu. Báo phí chính thức được phát hành sau khi nhân viên soát nhóm nghề của từng người trong danh sách.</p></div><a href="${ac.CUSTOMER_CARE_TEL}">Gọi ${esc(ac.CUSTOMER_CARE_PHONE)} <i>→</i></a></div></section>`;

/* ── Ghép trang (thứ tự như page.tsx của baohiempvi-vn) ── */
export function taiNanMain(ac, up) {
  return `<div class="auto-page accident-page">
${hero(ac)}
<div class="shell auto-product-surface">${experience(ac)}</div>
<section class="auto-section"><div class="shell accident-stack">${answer()}</div></section>
<section class="auto-section auto-soft-section"><div class="shell">${legal(ac, up)}</div></section>
<section class="auto-section"><div class="shell accident-stack">${benefits(ac)}${scenarios(ac)}${exclusions(ac)}</div></section>
<section class="auto-section auto-soft-section"><div class="shell accident-stack">${feeTable(ac)}${comparison(ac)}</div></section>
<section class="auto-section"><div class="shell accident-stack">${buy(ac)}${claim(ac)}</div></section>
<section class="auto-section auto-soft-section"><div class="shell">${faqs(ac)}</div></section>
<section class="auto-section"><div class="shell accident-stack">${contact(ac)}${related(ac)}</div></section>
${cta(ac)}
</div>`;
}

/* ── JSON-LD sản phẩm và quy trình bồi thường (FAQ, breadcrumb do chrome.mjs lo) ── */
export function taiNanJsonLd(ac, url) {
  const data = [
    {
      '@context': 'https://schema.org', '@type': 'Product', name: 'Bảo hiểm Tai nạn 24/24 PVI',
      description: 'Bảo hiểm tai nạn 24/24 cho cá nhân, nhóm nhân sự và người lao động thi công trên công trường, chi trả tử vong và thương tật do tai nạn trong và ngoài giờ làm việc.',
      url, category: 'Bảo hiểm con người', brand: { '@type': 'Brand', name: 'PVI' },
      offers: ac.accidentPlans.map((p) => ({ '@type': 'Offer', name: `Gói ${p.label}`, price: p.basePremium, priceCurrency: 'VND', availability: 'https://schema.org/InStock', url: `${url}#bang-phi`, description: `Phí gốc ${ac.formatVnd(p.basePremium)}/người/năm, thời hạn 12 tháng. Giảm tới ${ac.MAX_DISCOUNT_LABEL} theo quy mô nhóm.` })),
    },
    {
      '@context': 'https://schema.org', '@type': 'HowTo', name: 'Quy trình yêu cầu bồi thường bảo hiểm tai nạn 24/24',
      supply: ac.claimDocuments.map((x) => ({ '@type': 'HowToSupply', name: x })),
      step: ac.claimSteps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.text, url: `${url}#quy-trinh-boi-thuong` })),
    },
  ];
  return data.map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`).join('');
}

/* ── JS bộ tính phí (thay accident-calculator.tsx). Công thức như premiumFor():
   phí/người = phí gốc năm × (1 − chiết khấu nhóm) × tỷ lệ ngắn hạn, làm tròn đồng. ── */
export function taiNanJs(ac, clean) {
  const data = {
    plans: ac.accidentPlans,
    tiers: ac.groupTiers.map((x) => ({ ...x, label: clean(x.label) })),
    short: ac.shortTermRates,
    kinds: ac.audienceKinds.map((k) => ({ ...k, label: clean(k.label) })),
    occ: ac.occupationGroups.map((o) => ({ id: o.id, label: clean(o.label) })),
    zalo: ac.ZALO_URL,
    phone: ac.CUSTOMER_CARE_PHONE,
  };
  return `/* Bộ tính phí tai nạn 24/24, sinh từ tools/tai-nan-ui.mjs (bản chuyển của accident-calculator.tsx).
   Web không gửi đi hay lưu thông tin: nút Mua ngay chép tóm tắt rồi mở Zalo để khách tự gửi. */
(() => {
  const D = ${JSON.stringify(data)};
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
    $('tn-template').hidden = kind.id === 'ca-nhan';
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
    return lines.join('\\n');
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

  // Form "Năm ô, không hơn": kiểm tra rồi chép thông tin, mở Zalo. Không gửi lên máy chủ.
  const f = document.getElementById('tn-quote');
  if (f) f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = f.querySelector('.accident-form-error'), ok = f.querySelector('.accident-form-ok');
    const name = f.name.value.trim(), phone = f.phone.value.trim();
    const fail = !name || !phone ? 'Cần họ tên và số điện thoại để nhân viên gọi lại.' : !f.consent.checked ? 'Cần tích chọn đồng ý xử lý dữ liệu trước khi gửi.' : '';
    err.textContent = fail; err.hidden = !fail; if (fail) return;
    const plan = f.plan.options[f.plan.selectedIndex].text;
    const text = ['Yêu cầu báo phí bảo hiểm tai nạn 24/24', '• Họ tên: ' + name, '• Số điện thoại: ' + phone, '• Số người: ' + (f.people.value || 'chưa rõ'), '• Gói quan tâm: ' + plan].join('\\n');
    try { await navigator.clipboard.writeText(text); } catch {}
    window.open(D.zalo, '_blank', 'noopener');
    ok.textContent = 'Đã chép thông tin và mở Zalo. Dán vào khung chat để gửi. Nếu cửa sổ bị chặn, gọi ' + D.phone + ' giúp em.'; ok.hidden = false;
  });

  render();
})();
`;
}
