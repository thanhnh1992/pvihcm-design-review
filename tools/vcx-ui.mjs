// Trang Bảo hiểm vật chất xe ô tô của pvihcm (/san-pham/bao-hiem-vat-chat-xe/), dựng theo đúng trang
// /bao-hiem-o-to/bao-hiem-vat-chat-xe của baohiempvi-vn (chủ site yêu cầu 16/11/2026: "code lại giống trang
// baohiempvi-vn"). Bản gốc là React (page.tsx, vcx-builder.tsx, vf7-viewer.tsx, vcx.module.css); ở đây
// chuyển sang HTML tĩnh + JS thuần. Giữ nguyên URL cũ của pvihcm.
// Dữ liệu: tools/data/vcx.mjs (chép nguyên văn vcx-data.ts qua tools/load-data.mjs), không gõ lại số liệu;
// trình duyệt dùng bản chép dist/vcx/vcx-data.js. Phí TNDS ở bước 3 dùng dist/o-to/tnds-data.js.
// JS: dist/vcx/builder.js (chọn nhóm xe, quyền lợi và gửi Zalo).
// CSS: dist/vcx.css, sinh từ vcx.module.css của baohiempvi-vn khi có thư mục đó (BAOHIEMPVI_DIR):
// lớp module đổi thành vcx-<tên>, font về Be Vietnam Pro; sửa riêng cho pvihcm đặt trong FOOT bên dưới.
// Bỏ so với bản gốc: ô "AI kiểm tra giá xe thực tế" (chưa nối dịch vụ, bên đó chỉ báo "đang kết nối").
// Chạy: node tools/vcx-ui.mjs, rồi node tools/gen-sitemap.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { page, esc, SITE, faqJsonLd } from './chrome.mjs';
import { carFeeCard, carFeeStyles } from './car-fee-directory.mjs';
import { vcxEstimate, vcxEstimateLabel } from './data/vcx-estimate.mjs';
import { businessUses, mainClauses, moreClauses, vehicleUses } from './data/vcx-options.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(HERE, '../dist');
const B = process.env.BAOHIEMPVI_DIR || path.resolve(HERE, '../../baohiempvi-vnwebsite');
const SRC = path.join(B, 'app/bao-hiem-o-to/bao-hiem-vat-chat-xe');

fs.mkdirSync(path.join(DIST, 'vcx'), { recursive: true });
fs.copyFileSync(path.join(HERE, 'data/vcx.mjs'), path.join(DIST, 'vcx/vcx-data.js'));
const D = await import(pathToFileURL(path.join(DIST, 'vcx/vcx-data.js')).href);
const T = await import(pathToFileURL(path.join(DIST, 'o-to/tnds-data.js')).href);
const { askBeforeSigning, basicScope, carCatalogue, certificateMock, certificateNotes, claimSteps, DOI_CHIEU_NGUON, faqs, HOTLINE_BOI_THUONG, related, sampleCertificate, ZALO_TU_VAN } = D;
const currentRulesPdf = '/tai-lieu/pvi-quy-tac-o-to-01-07-2025.pdf';
const currentClausesPdf = '/tai-lieu/pvi-dieu-khoan-bo-sung-o-to-01-07-2025.pdf';
const earlierClausesPdf = '/tai-lieu/pvi-dieu-khoan-o-to-tham-khao-013-014-019.pdf';
const clauseDocument = (title, url) => `<details><summary>${esc(title)}</summary>
<iframe src="${url}" title="${esc(title)}" loading="lazy"></iframe>
<a href="${url}" target="_blank" aria-label="Mở PDF ${esc(title)} trong tab mới">Mở PDF trong tab mới</a></details>`;

// Ảnh và video minh họa: chép từ baohiempvi-vn khi có thư mục đó.
if (fs.existsSync(SRC)) {
  fs.mkdirSync(path.join(DIST, 'assets/vat-chat-xe'), { recursive: true });
  for (const f of ['showroom-kiem-tra-xe-poster.webp', 'showroom-kiem-tra-xe.mp4', 'showroom-kiem-tra-xe.vi.vtt']) fs.copyFileSync(path.join(B, 'public/img/vat-chat-xe', f), path.join(DIST, 'assets/vat-chat-xe', f));
  buildCss();
}

export const PATH = '/san-pham/bao-hiem-vat-chat-xe/';
const OTO = '/san-pham/bao-hiem-o-to/';
const TNDS = '/san-pham/bao-hiem-bat-buoc/';
// Danh sách gara liên kết: pvihcm chưa có trang tra gara, dẫn sang trang chính thức của PVI (giống o-to-ui.mjs).
const GARA_URL = 'https://online.pvi.com.vn/kien-thuc/danh-sach-gara-lien-ket-sua-chua-cua-bao-hiem-pvi';
const BHVN = 'https://www.baohiempvi-vn.com';
// Link nội bộ của baohiempvi-vn: trang có trên pvihcm thì đổi sang, chưa có thì dẫn sang baohiempvi-vn.
const LOCAL = { '/gara-lien-ket-pvi': GARA_URL, '/kien-thuc/bao-hiem-xe-ban-tai-dien-vinfast-vf-wild': '/tin-tuc/bao-hiem-xe-ban-tai-dien-vinfast-vf-wild/' };
const href = (h) => LOCAL[h] || (h.startsWith('/') ? BHVN + h : h);
const out = (h) => (/^https?:/.test(h) ? ' target="_blank"' : '');
const PVI_LOGO = '/assets/pvi-logo.svg';

const YEAR_NOW = 2026; // builder.js tự cập nhật theo năm hiện tại khi chạy
const YEARS = Array.from({ length: 21 }, (_, i) => YEAR_NOW - i);
const SEATS = ['2', '4', '5', '7', '8', '9', '16'];
const opt = (list, sel) => list.map((v) => `<option${String(v) === String(sel) ? ' selected' : ''}>${esc(v)}</option>`).join('');

// Biểu tượng điều khoản: đường nét tự vẽ (bản gốc dùng Phosphor duotone).
const SVG = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONS = {
  lock: SVG('<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1.4"/>'),
  wrench: SVG('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3.6 17.1a1.8 1.8 0 0 0 2.5 2.5l5.7-5.7a4 4 0 0 0 5.1-5.4l-2.4 2.4-2.2-.5-.5-2.2z"/>'),
  garage: SVG('<path d="M3 21V9l9-5 9 5v12"/><path d="M7 21v-8h10v8M7 16h10"/>'),
  drop: SVG('<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z"/><path d="M12 9v11"/>'),
  battery: SVG('<rect x="3" y="7" width="17" height="10" rx="2"/><path d="M22 10v4m-10-5-3 3h5l-3 3"/>'),
  parts: SVG('<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12 4 7.5M12 12v9m-4-16 8 4.5"/>'),
  car: SVG('<path d="m5 10 2-5h10l2 5M3 11l2-1h14l2 1v7H3v-7Zm2 7v2m14-2v2M7 14h1m8 0h1"/>'),
  briefcase: SVG('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12l9 3 9-3m-9 1v3"/>'),
  globe: SVG('<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>'),
  clock: SVG('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  shield: SVG('<path d="M12 3c2.8 1.7 5.5 2.5 8 3v5c0 5-3 8-8 10-5-2-8-5-8-10V6c2.5-.5 5.2-1.3 8-3Z"/>'),
  clipboard: SVG('<rect x="5" y="5" width="14" height="16" rx="2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6m-6 4h6"/>'),
  tow: SVG('<path d="M3 17V8h6v9m0-7h8l4 4v3h-3m-9 0h4M5 17h1"/><circle cx="6" cy="18" r="2"/><circle cx="16" cy="18" r="2"/>'),
};
const clauseButton = ([id, icon, title, text, checked]) => `<label class="vcx-choice" data-kind="${icon}"><input type="checkbox" name="clause" value="${id}"${checked ? ' checked' : ''} aria-describedby="vcx-clause-${id}" aria-labelledby="vcx-clause-title-${id}"><span class="vcx-choiceIcon">${ICONS[icon]}</span><span class="vcx-choiceText"><b id="vcx-clause-title-${id}">${esc(title)}</b><small>ĐKBS ${id}/XCG-PVI</small><span id="vcx-clause-${id}">${esc(text)}</span></span></label>`;
const fmt = (n) => new Intl.NumberFormat('vi-VN').format(n);
const tndsSeed = T.passengerFeeForSeats(5, false);
const tndsQ = T.quoteTnds(tndsSeed?.fee);

const builder = `<div class="vcx-builder" data-vcx>
<section class="vcx-step" id="tinh-phi" aria-labelledby="vcx-step1">
<header class="vcx-stepHead"><span>1</span><h2 id="vcx-step1">Thông tin xe cần bảo hiểm</h2></header>
<div class="vcx-fields">
<label><span>Nhãn hiệu</span><input name="brand" list="vcx-brands" placeholder="Ví dụ: Kia, Mazda, BYD" autocomplete="off"><datalist id="vcx-brands">${Object.keys(carCatalogue).map((b) => `<option value="${esc(b)}"></option>`).join('')}</datalist><em data-err="brand" hidden>Nhập nhãn hiệu xe.</em></label>
<label><span>Dòng xe</span><input name="model" list="vcx-models" placeholder="Ví dụ: Yaris, VF 8, Camry" autocomplete="off"><datalist id="vcx-models"></datalist><em data-err="model" hidden>Nhập dòng xe.</em></label>
<label><span>Số chỗ</span><select name="seats">${opt(SEATS, '5')}</select></label>
<label><span>Năm sản xuất</span><select name="year">${opt(YEARS, YEAR_NOW)}</select></label>
<div class="vcx-value"><label for="vcx-insured-value"><span>Giá trị xe muốn bảo hiểm</span></label><div class="vcx-money"><input id="vcx-insured-value" name="value" inputmode="numeric" placeholder="915.000.000" autocomplete="off" aria-describedby="vcx-estimate-help"><b>đ</b></div><em data-err="value" hidden>Nhập giá trị xe muốn bảo hiểm (từ 50 triệu đồng).</em><small id="vcx-estimate-help">Phí vật chất tham khảo: ${vcxEstimateLabel} giá trị xe mỗi năm.</small><output for="vcx-insured-value" data-vcx-estimate data-low-bps="${vcxEstimate.lowBps}" data-high-bps="${vcxEstimate.highBps}" hidden></output></div>
<button type="button" class="vcx-quoteBtn" data-send><span>Nhận báo giá ngay <b aria-hidden="true">→</b></span></button>
</div>
</section>

<section class="vcx-step" id="quyen-loi" aria-labelledby="vcx-step2">
<header class="vcx-stepHead"><span>2</span><h2 id="vcx-step2">Chọn nhóm xe và quyền lợi</h2></header>
<div class="vcx-options">
<fieldset class="vcx-uses"><legend>Mục đích sử dụng xe</legend>
<div class="vcx-useGrid">${vehicleUses.map(({ id, icon, label, text }) => `<label class="vcx-choice" data-kind="${icon}"><input type="radio" name="use" value="${id}"${id === 'private' ? ' checked' : ''}><span class="vcx-choiceIcon">${ICONS[icon]}</span><span class="vcx-choiceText"><b>${esc(label)}</b><span>${esc(text)}</span></span></label>`).join('')}</div>
<label class="vcx-businessUse" data-business-use hidden><span>Hình thức kinh doanh</span><select name="businessUse" disabled><option value="">Chọn hình thức (nếu đã xác định)</option>${businessUses.map(([id, label]) => `<option value="${id}">${esc(label)}</option>`).join('')}</select></label>
</fieldset>
<div class="vcx-basic"><small>PHẠM VI CƠ BẢN · ĐÃ GỒM</small><ul>${basicScope.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>
<fieldset class="vcx-addons"><legend>Điều khoản bổ sung</legend>
<div class="vcx-clauseGrid">${mainClauses.map(clauseButton).join('\n')}</div>
<p class="vcx-optionNote">Với pin động cơ (019), thiết bị lắp thêm (014) và thiết bị chuyên dùng (013), tư vấn viên sẽ xác nhận phiên bản điều khoản, điều kiện áp dụng và giá trị cần kê khai.</p>
<details class="vcx-more"><summary>Các điều khoản khác <span aria-hidden="true"></span></summary>
<div class="vcx-clauseGrid">${moreClauses.map(clauseButton).join('\n')}
<label class="vcx-choice" data-kind="shield"><input type="checkbox" name="totalLoss"><span class="vcx-choiceIcon">${ICONS.shield}</span><span class="vcx-choiceText"><b>Gói tổn thất toàn bộ</b><span>Yêu cầu tư vấn riêng về phạm vi chỉ bảo hiểm tổn thất toàn bộ.</span></span></label></div>
</details>
</fieldset>
<div class="vcx-clauseActions">
<div class="vcx-clauseDocs" aria-label="Tài liệu điều khoản bổ sung">
${clauseDocument('Xem bộ điều khoản hiệu lực 01/07/2025', currentClausesPdf)}
${clauseDocument('Tài liệu tham khảo có mã 013, 014 và 019', earlierClausesPdf)}
</div>
<a class="vcx-primary" href="https://online.pvi.com.vn/san-pham/bao-hiem-vat-chat-xe-o-to" target="_blank" rel="nofollow">Mua online ngay <span aria-hidden="true">↗</span></a>
</div>
</div>
</section>

<section class="vcx-step" id="phi-tnds" aria-labelledby="vcx-step3">
<header class="vcx-stepHead"><span>3</span><h2 id="vcx-step3">Phí TNDS bắt buộc</h2></header>
<div class="vcx-tnds">
<label class="vcx-tndsToggle"><input type="checkbox" name="kemTnds"><span><b>Mua kèm TNDS bắt buộc</b><small>Tính theo số chỗ và mục đích sử dụng xe</small></span></label>
<dl class="vcx-tndsFee" hidden><div><dt data-tnds="label">Phí ${esc(tndsSeed.label)}</dt><dd data-tnds="base">${fmt(tndsQ.base)} đ</dd></div><div><dt>VAT 10%</dt><dd data-tnds="vat">${fmt(tndsQ.vat)} đ</dd></div><div class="vcx-tndsTotal"><dt>Tổng phí TNDS 1 năm</dt><dd data-tnds="total">${fmt(tndsQ.total)} đ</dd></div></dl>
<p class="vcx-tndsSrc" hidden>Theo ${esc(T.tndsReference.legalBasis)}. Xe bán tải, minivan chở người và hàng có mức riêng. <a href="${TNDS}#tinh-phi">Xem biểu phí đầy đủ →</a></p>
<p class="vcx-optionNote" data-tnds-pending hidden>Tư vấn viên sẽ xác nhận nhóm xe và phí TNDS theo hồ sơ.</p>
</div>
</section>

<section class="vcx-summary" id="bao-phi" aria-labelledby="vcx-summary" aria-live="polite">
<div class="vcx-summaryInfo"><small>YÊU CẦU BÁO PHÍ</small><h2 id="vcx-summary" data-sum="car">Xe của bạn</h2><p data-sum="line">5 chỗ · ${YEAR_NOW} · ${esc(vehicleUses[0].label)} · chưa nhập giá trị · ĐKBS 006, 007, 008</p></div>
<div class="vcx-summaryFee"><small>Phí tham khảo</small><b>Tư vấn viên gửi báo phí</b><span>Ví dụ thật: xe ${esc(sampleCertificate.insuredValue)}, ĐKBS ${esc(sampleCertificate.clauses)}: ${esc(sampleCertificate.total)}/năm gồm VAT</span></div>
<div class="vcx-summaryAct"><button type="button" data-chat>Chat với chuyên viên ngay để nhận báo phí ưu đãi</button><span data-sum="note">Thông tin được sao chép để bạn dán vào Zalo; trang không lưu dữ liệu.</span></div>
</section>
</div>`;

const cert = `<figure class="vcx-cert"><div class="vcx-certPaper"><span class="vcx-certStamp" aria-hidden="true">MẪU</span>
<header class="vcx-certTop"><img src="${PVI_LOGO}" alt="Bảo hiểm PVI" width="92" height="36"><div><b>GIẤY CHỨNG NHẬN BẢO HIỂM XE Ô TÔ</b><small>Bảo hiểm vật chất xe · Số: XXXXXXXXX</small></div></header>
<dl class="vcx-certRows">
<div><dt>Chủ xe</dt><dd>${esc(certificateMock.owner)}</dd></div>
<div><dt>Địa chỉ</dt><dd>${esc(certificateMock.address)}</dd></div>
<div class="vcx-certHalf"><dt>Biển kiểm soát</dt><dd>${esc(certificateMock.plate)}</dd></div>
<div class="vcx-certHalf"><dt>Năm sản xuất</dt><dd>${esc(certificateMock.year)}</dd></div>
<div class="vcx-certHalf"><dt>Loại xe</dt><dd>${esc(certificateMock.vehicle)}</dd></div>
<div class="vcx-certHalf"><dt>Mục đích sử dụng</dt><dd>${esc(certificateMock.use)}</dd></div>
<div><dt>Số khung</dt><dd>${esc(certificateMock.chassis)}</dd></div>
<div><dt>Số máy</dt><dd>${esc(certificateMock.engine)}</dd></div>
<div class="vcx-certMark" data-n="1"><dt>Số tiền bảo hiểm</dt><dd>${esc(sampleCertificate.insuredValue)}</dd></div>
<div><dt>Giá trị bộ pin điện động cơ (xe ô tô điện)</dt><dd>—</dd></div>
<div class="vcx-certMark" data-n="2"><dt>Điều khoản bổ sung</dt><dd>${esc(sampleCertificate.clauses)}</dd></div>
<div class="vcx-certMark" data-n="3"><dt>Mức khấu trừ</dt><dd>${esc(sampleCertificate.deductible)}</dd></div>
<div class="vcx-certMark vcx-certTotal" data-n="4"><dt>Tổng phí (${esc(sampleCertificate.term)}, gồm VAT)</dt><dd>${esc(sampleCertificate.total)}</dd></div>
</dl></div>
<figcaption>Giấy chứng nhận mẫu minh họa: số liệu phí theo giấy thật, thông tin chủ xe và xe là thông tin tượng trưng, không có giá trị sử dụng.</figcaption></figure>`;

// Video YouTube đầu trang (chủ site gửi 28/11/2026). Ảnh bìa tự lưu trên site, bấm mới tải YouTube (dist/vcx/yt.js).
const YT = {
  id: 'bz7Xp1clJG0',
  title: 'Bảo hiểm thân xe PVI – Sửa xe ở đâu, trả bao nhiêu?',
  poster: '/assets/vat-chat-xe/video-than-xe-pvi',
  uploadDate: '2026-11-27T20:37:57-08:00',
  duration: 'PT1M57S',
  description: 'Bảo hiểm thân xe PVI: một đầu mối tiếp nhận bồi thường 24/7, gara liên kết và xưởng chính hãng toàn quốc, giám định viên khắp các tỉnh thành. Ví dụ: sửa 10 triệu đồng, miễn thường 500.000 đồng mỗi vụ, PVI thanh toán 9,5 triệu đồng trực tiếp cho gara.',
};

const main = `<div class="vcx-page">
<section class="vcx-hero" aria-labelledby="vcx-title"><div class="shell">
<nav class="vcx-breadcrumb" aria-label="Đường dẫn"><a href="/">Trang chủ</a><span aria-hidden="true">›</span><a href="/san-pham/">Sản phẩm</a><span aria-hidden="true">›</span><a href="${OTO}">Bảo hiểm ô tô</a><span aria-hidden="true">›</span><b>Vật chất xe</b></nav>
<div class="vcx-heroGrid">
<div class="vcx-heroCopy">
<span class="vcx-kicker">BẢO HIỂM VẬT CHẤT XE Ô TÔ · PVI</span>
<h1 id="vcx-title">Bảo hiểm vật chất xe <em>ô tô PVI</em></h1>
<p class="vcx-tagline">An tâm bảo vệ xe cùng Bảo hiểm PVI</p>
<p class="vcx-lead">Bảo hiểm PVI dẫn đầu thị phần bảo hiểm phi nhân thọ Việt Nam năm 2025 và có hơn 20 năm kinh nghiệm bảo hiểm xe cơ giới. Với mạng lưới hơn 700 gara và showroom liên kết trên toàn quốc cùng đội ngũ tư vấn, giám định và bồi thường giàu kinh nghiệm, chúng tôi đồng hành cùng chủ xe từ khi chọn quyền lợi đến khi cần sửa chữa và giải quyết bồi thường.</p>
<div class="vcx-heroActions"><a class="vcx-primary" href="#bao-phi">Nhận báo phí</a><a class="vcx-secondary" href="#quyen-loi">Xem quyền lợi</a></div>
<dl class="vcx-facts"><div><dt>Khấu trừ chung</dt><dd>500.000 đ/vụ</dd></div><div><dt>Bảo lãnh sửa chữa</dt><dd><a href="${GARA_URL}" target="_blank" rel="nofollow" aria-label="Mở danh sách gara liên kết PVI trong tab mới">Gara liên kết PVI <span aria-hidden="true">↗</span></a></dd></div><div><dt>Quy tắc bảo hiểm</dt><dd><a href="${currentRulesPdf}" target="_blank" rel="nofollow" aria-label="Mở PDF quy tắc bảo hiểm tự nguyện xe ô tô, hiệu lực 01/07/2025, trong tab mới">Hiệu lực 01/07/2025 <span aria-hidden="true">↗</span></a></dd></div></dl>
</div>
<figure class="vcx-video yt-facade"><button type="button" class="yt-play" data-yt="${YT.id}" data-title="${esc(YT.title)}" aria-label="Phát video: ${esc(YT.title)} (1 phút 57 giây)"><img src="${YT.poster}.webp" srcset="${YT.poster}-480.webp 480w, ${YT.poster}-800.webp 800w, ${YT.poster}.webp 1280w" sizes="(max-width: 900px) 100vw, 640px" width="1280" height="720" alt="Ảnh bìa video bảo hiểm thân xe PVI: sửa 10 triệu, chủ xe trả 500.000đ miễn thường"><span class="yt-icon" aria-hidden="true"></span></button>
<figcaption>Video: Bảo hiểm thân xe PVI, sửa xe ở đâu, trả bao nhiêu? · 1 phút 57 giây</figcaption></figure>
</div></div></section>

<section class="vcx-claim" id="boi-thuong" aria-labelledby="vcx-claim"><div class="shell"><div class="vcx-claimCard">
<div class="vcx-claimHead"><span>KHI XE GẶP SỰ CỐ</span><h2 id="vcx-claim">Quy trình bồi thường 3 bước</h2><a class="vcx-claimCall" href="tel:${HOTLINE_BOI_THUONG.tel}"><small>Tổng đài bồi thường</small><b>${esc(HOTLINE_BOI_THUONG.label)}</b></a><a class="vcx-claimLink" href="${GARA_URL}"${out(GARA_URL)}>Tra cứu gara, showroom liên kết →</a></div>
<ol class="vcx-claimSteps">${claimSteps.map((s, i) => `<li><i aria-hidden="true">${i + 1}</i><div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div></li>`).join('')}</ol>
</div></div></section>

<div class="shell">${builder}</div>

<section class="vcx-section" id="vi-du" aria-labelledby="vcx-sample"><div class="shell">
<div class="vcx-heading"><span class="vcx-kicker">VÍ DỤ TỪ GIẤY CHỨNG NHẬN THẬT</span><h2 id="vcx-sample">Một chiếc xe 915 triệu đồng đóng bao nhiêu?</h2><p>Số liệu phí lấy từ một giấy chứng nhận bảo hiểm xe ô tô PVI cấp tháng 10/2026. Tên chủ xe, địa chỉ, biển số, số khung, số máy trên giấy mẫu là thông tin tượng trưng. Phí của xe khác phụ thuộc loại xe, tuổi xe, mục đích sử dụng và điều khoản chọn.</p></div>
<div class="vcx-sample">${cert}
<ol class="vcx-certNotes">${certificateNotes.map((n, i) => `<li><i aria-hidden="true">${i + 1}</i><div><small>${esc(n.label)}</small><b>${esc(n.value)}</b><p>${esc(n.text)}</p></div></li>`).join('')}</ol>
</div></div></section>

<section class="vcx-section vcx-soft" aria-labelledby="vcx-ask"><div class="shell vcx-split">
<div class="vcx-heading"><span class="vcx-kicker">TRƯỚC KHI KÝ</span><h2 id="vcx-ask">Sáu điều nên hỏi rõ về hợp đồng</h2><p>Loại trừ nằm trong quy tắc bảo hiểm tự nguyện xe ô tô và hợp đồng của từng xe. Hỏi rõ và yêu cầu chỉ ra điều khoản cho các tình huống sau.</p><a class="vcx-textLink" href="${href('/kien-thuc/bao-hiem-than-vo-o-to-la-gi-co-bat-buoc-khong')}"${out(href('/kien-thuc/bao-hiem-than-vo-o-to-la-gi-co-bat-buoc-khong'))}>Đọc thêm: bảo hiểm thân vỏ khác TNDS thế nào →</a></div>
<ol class="vcx-askList">${askBeforeSigning.map((a) => `<li>${esc(a)}</li>`).join('')}</ol>
</div></section>

<section class="vcx-section vcx-soft" id="faq" aria-labelledby="vcx-faq"><div class="shell vcx-split">
<div class="vcx-heading"><span class="vcx-kicker">CÂU HỎI THƯỜNG GẶP</span><h2 id="vcx-faq">Hiểu thêm trước khi tham gia</h2><ul class="vcx-related">${related.map((r) => `<li><a href="${href(r.href)}"${out(href(r.href))}>${esc(r.label)}</a></li>`).join('')}</ul>${carFeeCard}</div>
<div class="vcx-faqs">${faqs.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f.question)}<i aria-hidden="true">+</i></summary><p>${esc(f.answer)}</p></details>`).join('')}</div>
</div></section>

<section class="vcx-section" aria-labelledby="vcx-src"><div class="shell vcx-sources">
<h2 id="vcx-src">Nguồn tham chiếu</h2>
<ul><li><a href="${currentRulesPdf}" target="_blank">Bảo hiểm PVI: Quy tắc bảo hiểm tự nguyện xe ô tô, hiệu lực 01/07/2025 ↗</a></li><li><a href="${currentClausesPdf}" target="_blank">Bảo hiểm PVI: Các điều khoản bổ sung bảo hiểm tự nguyện xe ô tô, hiệu lực 01/07/2025 ↗</a></li><li>Giấy chứng nhận bảo hiểm xe ô tô PVI cấp ngày 27/10/2026 do PVI Thành Đô cung cấp (số liệu phí); thông tin chủ xe và xe trên giấy mẫu là thông tin tượng trưng.</li></ul>
<p>Đối chiếu nguồn ngày ${esc(DOI_CHIEU_NGUON)}. Phạm vi, loại trừ, mức khấu trừ và phí áp dụng theo quy tắc, điều khoản và hợp đồng được phát hành. Video là hình ảnh mô phỏng.</p>
<a class="vcx-primary" href="${ZALO_TU_VAN}" target="_blank">Nhắn Zalo 0938 072 236</a>
</div></section>
</div>`;

const title = 'Bảo hiểm vật chất xe ô tô PVI: quyền lợi, điều khoản, báo phí';
const description = 'Bảo hiểm vật chất xe ô tô PVI: phạm vi cơ bản, điều khoản bổ sung 003, 006, 007, 008 (thủy kích), mức khấu trừ, ví dụ phí thật và cách nhận báo phí qua Zalo tại PVI Thành Đô.';
const URL = SITE + PATH;
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;
const graph = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'WebPage', '@id': URL + '#webpage', url: URL, name: title, description, inLanguage: 'vi-VN', about: { '@id': URL + '#service' } },
  { '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE + '/' },
    { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: SITE + '/san-pham/' },
    { '@type': 'ListItem', position: 3, name: 'Bảo hiểm ô tô', item: SITE + OTO },
    { '@type': 'ListItem', position: 4, name: 'Vật chất xe', item: URL }] },
  { '@type': 'Service', '@id': URL + '#service', name: 'Bảo hiểm vật chất xe ô tô PVI', serviceType: 'Bảo hiểm tự nguyện vật chất xe ô tô', description, url: URL,
    provider: { '@type': 'InsuranceAgency', name: 'Bảo hiểm PVI Thành Đô', url: SITE + '/' }, areaServed: { '@type': 'Country', name: 'Việt Nam' } },
  { '@type': 'VideoObject', '@id': URL + '#video', name: YT.title, description: YT.description, inLanguage: 'vi-VN',
    thumbnailUrl: [SITE + YT.poster + '.webp'], uploadDate: YT.uploadDate, duration: YT.duration,
    embedUrl: 'https://www.youtube.com/embed/' + YT.id, publisher: { '@type': 'InsuranceAgency', name: 'Bảo hiểm PVI Thành Đô', url: SITE + '/' } },
] };

const html = page({
  path: PATH, title, description, image: '/assets/vat-chat-xe/showroom-kiem-tra-xe-poster.webp', bodyClass: 'fire vcx',
  extraCss: '<link rel="stylesheet" href="/vcx.css"><link rel="stylesheet" href="/vcx/yt.css">' + carFeeStyles,
  head: ld(graph) + faqJsonLd(faqs),
  scripts: '<script type="module" src="/vcx/builder.js"></script><script src="/vcx/yt.js" defer></script>',
  main,
});
fs.mkdirSync(path.join(DIST, 'san-pham/bao-hiem-vat-chat-xe'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'san-pham/bao-hiem-vat-chat-xe/index.html'), html);
console.log('wrote dist/san-pham/bao-hiem-vat-chat-xe/index.html', html.length, 'byte');

/* ── CSS: vcx.module.css → dist/vcx.css ── */
function buildCss() {
  let css = fs.readFileSync(path.join(SRC, 'vcx.module.css'), 'utf8');
  const FAM = '"Be Vietnam Pro","BVP Fallback",sans-serif';
  css = css.replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^.*:global\(.*$/gm, '') // menu riêng của trang gốc, pvihcm dùng header chung
    .replace(/"(Montserrat|DM Sans)",\s*sans-serif/g, FAM);
  // Đổi tên lớp module ở phần chọn (selector), không đụng số thập phân trong giá trị.
  css = css.split('\n').map((line) => {
    const i = line.indexOf('{');
    if (i < 0 || line.trim().startsWith('@')) return line;
    return line.slice(0, i).replace(/\.([a-zA-Z][\w-]*)/g, '.vcx-$1') + line.slice(i);
  }).join('\n');
  css = css.replace(/\n{3,}/g, '\n\n').trim();
  const HEAD = `/* BẢO HIỂM VẬT CHẤT XE: giao diện theo trang /bao-hiem-o-to/bao-hiem-vat-chat-xe của baohiempvi-vn
   (chủ site yêu cầu 16/11/2026). File này do tools/vcx-ui.mjs sinh từ vcx.module.css, đừng sửa tay:
   sửa riêng của pvihcm đặt trong FOOT của công cụ đó. */\n`;
  const FOOT = `
/* ── Riêng pvihcm ── */
.vcx-page .shell{width:min(1180px,calc(100% - 48px));margin-inline:auto}
@media(max-width:720px){.vcx-page .shell{width:min(100% - 28px,1180px)}}
.vcx-page{line-height:1.6}
.vcx-page a{text-decoration:none}
.vcx-page .vcx-facts a{display:inline-flex;align-items:center;gap:.35em;min-height:44px;color:#1f4a8c;text-decoration:underline;text-underline-offset:.18em}
.vcx-facts a span{flex:none}
.vcx-page img,.vcx-page video{max-width:100%}
.vcx-page [hidden]{display:none!important}
/* style.css của pvihcm đặt kiểu chung cho mọi <header> (đầu trang cũ): gỡ cho các header bên trong trang này. */
.vcx-page header{height:auto;max-width:none;justify-content:flex-start}
.vcx-page .vcx-stepHead{margin:0 0 16px;padding:0}
.vcx-page .vcx-certTop{margin:0 0 6px;padding:0 0 14px}
/* Không có ô kiểm tra giá như bản gốc: nút báo giá nằm cạnh ô giá trị xe. */
.vcx-fields .vcx-value{display:grid;align-content:start;gap:7px;overflow-wrap:anywhere}
.vcx-fields [data-vcx-estimate]{color:var(--ink);font-size:16px;line-height:1.5}
/* Mục đích sử dụng và điều khoản bổ sung. */
.vcx-builder .vcx-fields{grid-template-columns:repeat(2,minmax(0,1.2fr)) repeat(2,minmax(0,.8fr))}
.vcx-fields .vcx-value,.vcx-fields .vcx-quoteBtn{grid-column:span 2}
.vcx-options{display:grid;gap:16px}
.vcx-options fieldset{margin:0;padding:0;border:0;min-inline-size:0}
.vcx-options legend{font-weight:750;font-size:18px;color:var(--ink);padding:0;margin-bottom:10px}
.vcx-useGrid,.vcx-clauseGrid{display:grid;gap:10px;grid-template-columns:repeat(2,minmax(0,1fr))}
.vcx-clauseGrid{grid-template-columns:repeat(3,minmax(0,1fr))}
.vcx-choice{--choice:#1f4a8c;--choice-bg:#edf4ff;display:grid;grid-template-columns:36px minmax(0,1fr) auto;gap:10px;align-items:start;padding:12px;min-height:60px;border:1px solid #cfdbe7;border-radius:12px;background:#fff;color:var(--ink);cursor:pointer}
.vcx-choice[data-kind="briefcase"],.vcx-choice[data-kind="garage"],.vcx-choice[data-kind="parts"]{--choice:#824904;--choice-bg:#fff5e5}
.vcx-choice[data-kind="lock"],.vcx-choice[data-kind="shield"]{--choice:#70429b;--choice-bg:#f7efff}
.vcx-choice[data-kind="battery"],.vcx-choice[data-kind="wrench"]{--choice:#216349;--choice-bg:#eaf8f0}
.vcx-choice[data-kind="drop"]{--choice:#125f81;--choice-bg:#eaf7fb}
.vcx-choice:hover{border-color:var(--choice)}
.vcx-choice:has(input:checked){border-color:var(--choice);background:var(--choice-bg)}
.vcx-choice:has(input:focus-visible){outline:2px solid var(--choice);outline-offset:2px}
.vcx-choice input{grid-column:3;grid-row:1;inline-size:18px;block-size:18px;margin:2px 0 0;accent-color:var(--choice);cursor:pointer}
.vcx-choiceIcon{grid-column:1;grid-row:1;display:grid;place-items:center;width:36px;height:36px;border-radius:8px;background:var(--choice-bg);color:var(--choice)}
.vcx-choice:has(input:checked) .vcx-choiceIcon{color:#fff;background:var(--choice)}
.vcx-choiceIcon svg{width:21px;height:21px}
.vcx-choiceText{grid-column:2;grid-row:1;display:grid;gap:2px;min-width:0}
.vcx-choiceText b{font-size:16px;line-height:1.4}
.vcx-choiceText small{font-size:13px;font-weight:700;color:var(--choice)}
.vcx-choiceText>span{font-size:14px;line-height:1.45;color:#43566a}
.vcx-businessUse{display:grid;gap:6px;margin:10px 0 0;max-width:380px;font-weight:650}
.vcx-businessUse select{width:100%;min-height:44px;border:1px solid #c1d0df;border-radius:9px;padding:8px 10px;color:var(--ink);background:#fff;font:inherit}
.vcx-optionNote{font-size:14px;line-height:1.5;color:#43566a;margin:10px 0 0}
.vcx-more{margin-top:12px;padding:0;border-top:1px solid #d5dfe9}
.vcx-more summary{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:48px;padding:6px 0;color:#183665;font-weight:750;cursor:pointer;list-style:none}
.vcx-more summary::-webkit-details-marker{display:none}
.vcx-more summary span{flex:0 0 8px;height:8px;margin-right:5px;border:solid currentColor;border-width:0 2px 2px 0;transform:rotate(45deg)}
.vcx-more[open] summary span{transform:rotate(225deg)}
.vcx-clauseActions{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:start;gap:12px 24px}
.vcx-clauseActions .vcx-primary{min-height:44px;text-align:center}
.vcx-summaryAct button[data-chat]{white-space:normal;text-align:center}
@media(max-width:720px){.vcx-clauseActions{grid-template-columns:minmax(0,1fr)}.vcx-clauseActions .vcx-primary{justify-self:stretch}}
.vcx-clauseDocs{display:grid;gap:10px}
.vcx-clauseDocs details{border:1px solid #c8d8e6;border-radius:12px;background:#fff}
.vcx-clauseDocs summary{min-height:44px;padding:12px 16px;color:#183665;font-weight:700;cursor:pointer}
.vcx-clauseDocs iframe{display:block;width:100%;height:clamp(340px,65vh,760px);border:0;border-top:1px solid #c8d8e6}
.vcx-clauseDocs a{display:inline-flex;align-items:center;min-height:44px;margin:0 16px;color:#183665;text-decoration:underline;text-underline-offset:3px}
@media(max-width:880px){.vcx-clauseGrid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:720px){.vcx-builder .vcx-fields{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:560px){.vcx-useGrid,.vcx-clauseGrid{grid-template-columns:minmax(0,1fr)}}
/* Chữ trên nền xanh đậm: product.css (.fire h2) và .vcx-sources a làm chìm chữ trắng. */
.vcx-page .vcx-summary h2{color:#fff}
.vcx-sources a.vcx-primary{color:#fff}
`;
  fs.writeFileSync(path.join(DIST, 'vcx.css'), HEAD + css + '\n' + FOOT);
  console.log('wrote dist/vcx.css');
}
