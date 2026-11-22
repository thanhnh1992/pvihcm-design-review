// Trang Bảo hiểm vật chất xe ô tô của pvihcm (/san-pham/bao-hiem-vat-chat-xe/), dựng theo đúng trang
// /bao-hiem-o-to/bao-hiem-vat-chat-xe của baohiempvi-vn (chủ site yêu cầu 16/11/2026: "code lại giống trang
// baohiempvi-vn"). Bản gốc là React (page.tsx, vcx-builder.tsx, vf7-viewer.tsx, vcx.module.css); ở đây
// chuyển sang HTML tĩnh + JS thuần. Giữ nguyên URL cũ của pvihcm.
// Dữ liệu: tools/data/vcx.mjs (chép nguyên văn vcx-data.ts qua tools/load-data.mjs), không gõ lại số liệu;
// trình duyệt dùng bản chép dist/vcx/vcx-data.js. Phí TNDS ở bước 3 dùng dist/o-to/tnds-data.js.
// JS: dist/vcx/builder.js (3 bước, gửi Zalo), dist/vcx/vf7.js (mô hình 3D, Three.js r170 ở dist/vendor).
// CSS: dist/vcx.css, sinh từ vcx.module.css của baohiempvi-vn khi có thư mục đó (BAOHIEMPVI_DIR):
// lớp module đổi thành vcx-<tên>, font về Be Vietnam Pro; sửa riêng cho pvihcm đặt trong FOOT bên dưới.
// Bỏ so với bản gốc: ô "AI kiểm tra giá xe thực tế" (chưa nối dịch vụ, bên đó chỉ báo "đang kết nối").
// Chạy: node tools/vcx-ui.mjs, rồi node tools/gen-sitemap.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { page, esc, SITE, faqJsonLd } from './chrome.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(HERE, '../dist');
const B = process.env.BAOHIEMPVI_DIR || path.resolve(HERE, '../../baohiempvi-vnwebsite');
const SRC = path.join(B, 'app/bao-hiem-o-to/bao-hiem-vat-chat-xe');

fs.mkdirSync(path.join(DIST, 'vcx'), { recursive: true });
fs.copyFileSync(path.join(HERE, 'data/vcx.mjs'), path.join(DIST, 'vcx/vcx-data.js'));
const D = await import(pathToFileURL(path.join(DIST, 'vcx/vcx-data.js')).href);
const T = await import(pathToFileURL(path.join(DIST, 'o-to/tnds-data.js')).href);
const { askBeforeSigning, basicScope, carCatalogue, certificateMock, certificateNotes, claimSteps, clauses, CLAUSES_PDF, DOI_CHIEU_NGUON, faqs, HOTLINE_BOI_THUONG, related, RULES_PDF, sampleCertificate, ZALO_TU_VAN } = D;

// Ảnh, video (Hình ảnh mô phỏng) và Three.js: chép từ baohiempvi-vn khi có thư mục đó.
if (fs.existsSync(SRC)) {
  fs.mkdirSync(path.join(DIST, 'assets/vat-chat-xe'), { recursive: true });
  for (const f of ['showroom-kiem-tra-xe-poster.webp', 'showroom-kiem-tra-xe.mp4', 'showroom-kiem-tra-xe.vi.vtt']) fs.copyFileSync(path.join(B, 'public/img/vat-chat-xe', f), path.join(DIST, 'assets/vat-chat-xe', f));
  fs.mkdirSync(path.join(DIST, 'vendor/three-0.170.0'), { recursive: true });
  for (const f of ['three.module.min.js', 'LICENSE.txt']) fs.copyFileSync(path.join(B, 'public/vendor/three-0.170.0', f), path.join(DIST, 'vendor/three-0.170.0', f));
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
const USES = ['Không kinh doanh vận tải', 'Taxi / cho thuê tự lái', 'Kinh doanh vận tải theo hợp đồng'];
const SEATS = ['2', '4', '5', '7', '8', '9', '16'];
const opt = (list, sel) => list.map((v) => `<option${String(v) === String(sel) ? ' selected' : ''}>${esc(v)}</option>`).join('');

// Biểu tượng điều khoản: đường nét tự vẽ (bản gốc dùng Phosphor duotone).
const SVG = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONS = {
  lock: SVG('<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1.4"/>'),
  wrench: SVG('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3.6 17.1a1.8 1.8 0 0 0 2.5 2.5l5.7-5.7a4 4 0 0 0 5.1-5.4l-2.4 2.4-2.2-.5-.5-2.2z"/>'),
  garage: SVG('<path d="M3 21V9l9-5 9 5v12"/><path d="M7 21v-8h10v8M7 16h10"/>'),
  drop: SVG('<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z"/><path d="M12 9v11"/>'),
};
const fmt = (n) => new Intl.NumberFormat('vi-VN').format(n);
const tndsSeed = T.passengerFeeForSeats(5, false);
const tndsQ = T.quoteTnds(tndsSeed?.fee);

const builder = `<div class="vcx-builder" data-vcx>
<section class="vcx-step" aria-labelledby="vcx-step1">
<header class="vcx-stepHead"><span>1</span><h2 id="vcx-step1">Thông tin xe cần bảo hiểm</h2></header>
<div class="vcx-fields">
<label><span>Nhãn hiệu</span><input name="brand" list="vcx-brands" placeholder="Ví dụ: Kia, Mazda, BYD" autocomplete="off"><datalist id="vcx-brands">${Object.keys(carCatalogue).map((b) => `<option value="${esc(b)}"></option>`).join('')}</datalist><em data-err="brand" hidden>Nhập nhãn hiệu xe.</em></label>
<label><span>Dòng xe</span><input name="model" list="vcx-models" placeholder="Ví dụ: Yaris, VF 8, Camry" autocomplete="off"><datalist id="vcx-models"></datalist><em data-err="model" hidden>Nhập dòng xe.</em></label>
<label><span>Số chỗ</span><select name="seats">${opt(SEATS, '5')}</select></label>
<label><span>Năm sản xuất</span><select name="year">${opt(YEARS, YEAR_NOW)}</select></label>
<label><span>Mục đích sử dụng</span><select name="use">${opt(USES, USES[0])}</select></label>
<label class="vcx-value"><span>Giá trị xe muốn bảo hiểm</span><div class="vcx-money"><input name="value" inputmode="numeric" placeholder="915.000.000" autocomplete="off"><b>đ</b></div><em data-err="value" hidden>Nhập giá trị xe muốn bảo hiểm (từ 50 triệu đồng).</em><small>PVI xác nhận giá trị trước khi cấp đơn.</small></label>
<button type="button" class="vcx-quoteBtn" data-send><span>Nhận báo giá ngay <b aria-hidden="true">→</b></span></button>
</div>
</section>

<section class="vcx-step" id="quyen-loi" aria-labelledby="vcx-step2">
<header class="vcx-stepHead"><span>2</span><h2 id="vcx-step2">Chọn quyền lợi, xem rõ phạm vi</h2></header>
<div class="vcx-stepGrid">
<figure class="vcx-viewer" data-vf7>
<div class="vcx-viewerTop"><div><small>MÔ HÌNH 3D MINH HỌA</small><b>Dáng xe VF 7</b></div>
<div class="vcx-viewToggle" role="group" aria-label="Góc xem mô hình"><button type="button" aria-pressed="true" data-view="exterior">Ngoại thất</button><button type="button" aria-pressed="false" data-view="battery">Lật xem pin</button></div></div>
<div class="vcx-canvas" role="img" aria-label="Mô hình 3D minh họa dáng xe VF 7, kéo để xoay"><p class="vcx-canvasNote">Đang dựng mô hình 3D…</p><span class="vcx-packLabel" hidden>Bộ pin dưới sàn xe</span></div>
<div class="vcx-viewerBottom"><div class="vcx-paints" role="group" aria-label="Màu xe minh họa"><button type="button" aria-pressed="true" aria-label="Màu Trắng" title="Trắng" data-paint="0xe9eef2" style="background:#e9eef2"></button><button type="button" aria-pressed="false" aria-label="Màu Xanh" title="Xanh" data-paint="0x1d4f91" style="background:#1d4f91"></button><button type="button" aria-pressed="false" aria-label="Màu Xám" title="Xám" data-paint="0x6b7683" style="background:#6b7683"></button></div><span class="vcx-dragHint">Kéo để xoay xe</span></div>
<figcaption>Mô hình dựng bằng code để giải thích quyền lợi; hình dáng và bộ pin mang tính minh họa, không phải thiết kế chính hãng.</figcaption>
</figure>
<div class="vcx-cover">
<div class="vcx-basic"><small>PHẠM VI CƠ BẢN · ĐÃ GỒM</small><ul>${basicScope.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>
<fieldset class="vcx-clauses"><legend>Điều khoản bổ sung <span>chọn thêm</span></legend>
${clauses.map((c) => { const on = ['006', '007', '008'].includes(c.id); return `<label class="vcx-clause"${on ? ' data-on' : ''}><input type="checkbox" name="clause" value="${c.id}"${on ? ' checked' : ''}><i aria-hidden="true">${ICONS[c.icon]}</i><span><b>${esc(c.title)}</b><small>${esc(c.code)}</small><span>${esc(c.text)}</span></span></label>`; }).join('\n')}
</fieldset>
</div>
</div>
</section>

<section class="vcx-step" id="phi-tnds" aria-labelledby="vcx-step3">
<header class="vcx-stepHead"><span>3</span><h2 id="vcx-step3">Phí TNDS bắt buộc</h2></header>
<div class="vcx-tnds">
<label class="vcx-tndsToggle"><input type="checkbox" name="kemTnds"><span><b>Mua kèm TNDS bắt buộc</b><small>Tính theo số chỗ và mục đích sử dụng ở bước 1</small></span></label>
<dl class="vcx-tndsFee" hidden><div><dt data-tnds="label">Phí ${esc(tndsSeed.label)}</dt><dd data-tnds="base">${fmt(tndsQ.base)} đ</dd></div><div><dt>VAT 10%</dt><dd data-tnds="vat">${fmt(tndsQ.vat)} đ</dd></div><div class="vcx-tndsTotal"><dt>Tổng phí TNDS 1 năm</dt><dd data-tnds="total">${fmt(tndsQ.total)} đ</dd></div></dl>
<p class="vcx-tndsSrc" hidden>Theo ${esc(T.tndsReference.legalBasis)}. Xe bán tải, minivan chở người và hàng có mức riêng. <a href="${TNDS}#tinh-phi">Xem biểu phí đầy đủ →</a></p>
</div>
</section>

<section class="vcx-summary" id="bao-phi" aria-labelledby="vcx-summary" aria-live="polite">
<div class="vcx-summaryInfo"><small>YÊU CẦU BÁO PHÍ</small><h2 id="vcx-summary" data-sum="car">Xe của bạn</h2><p data-sum="line">5 chỗ · ${YEAR_NOW} · ${USES[0]} · chưa nhập giá trị · ĐKBS 006, 007, 008</p></div>
<div class="vcx-summaryFee"><small>Phí tham khảo</small><b>Tư vấn viên gửi báo phí</b><span>Ví dụ thật: xe ${esc(sampleCertificate.insuredValue)}, ĐKBS ${esc(sampleCertificate.clauses)}: ${esc(sampleCertificate.total)}/năm gồm VAT</span></div>
<div class="vcx-summaryAct"><button type="button" data-send>Gửi thông tin qua Zalo</button><span data-sum="note">Thông tin được sao chép để bạn dán vào Zalo; trang không lưu dữ liệu.</span></div>
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

const main = `<div class="vcx-page">
<section class="vcx-hero" aria-labelledby="vcx-title"><div class="shell">
<nav class="vcx-breadcrumb" aria-label="Đường dẫn"><a href="/">Trang chủ</a><span aria-hidden="true">›</span><a href="/san-pham/">Sản phẩm</a><span aria-hidden="true">›</span><a href="${OTO}">Bảo hiểm ô tô</a><span aria-hidden="true">›</span><b>Vật chất xe</b></nav>
<div class="vcx-heroGrid">
<div class="vcx-heroCopy">
<span class="vcx-kicker">BẢO HIỂM VẬT CHẤT XE Ô TÔ · PVI</span>
<h1 id="vcx-title">Bảo hiểm vật chất xe <em>ô tô PVI</em></h1>
<p class="vcx-tagline">Hiểu quyền lợi. Chọn sự an tâm.</p>
<p class="vcx-lead">Bảo hiểm vật chất xe trả chi phí sửa chữa, thay thế cho chính chiếc xe của bạn khi va chạm, cháy nổ, thiên tai hoặc bị trộm cướp toàn bộ xe. Chọn thêm điều khoản bổ sung như thủy kích, sửa chữa chính hãng, không khấu hao.</p>
<div class="vcx-heroActions"><a class="vcx-primary" href="#bao-phi">Nhận báo phí</a><a class="vcx-secondary" href="#quyen-loi">Xem quyền lợi</a></div>
<dl class="vcx-facts"><div><dt>Khấu trừ chung</dt><dd>500.000 đ/vụ</dd></div><div><dt>Bảo lãnh sửa chữa</dt><dd>Gara liên kết PVI</dd></div><div><dt>Quy tắc áp dụng</dt><dd>Hiệu lực 01/07/2025</dd></div></dl>
</div>
<figure class="vcx-video"><video controls muted playsinline preload="none" poster="/assets/vat-chat-xe/showroom-kiem-tra-xe-poster.webp" width="1280" height="720"><source src="/assets/vat-chat-xe/showroom-kiem-tra-xe.mp4" type="video/mp4"><track kind="captions" src="/assets/vat-chat-xe/showroom-kiem-tra-xe.vi.vtt" srclang="vi" label="Tiếng Việt" default></video>
<figcaption>Hình ảnh mô phỏng chủ xe và giám định viên kiểm tra xe tại showroom · 12 giây</figcaption></figure>
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
<div class="vcx-heading"><span class="vcx-kicker">CÂU HỎI THƯỜNG GẶP</span><h2 id="vcx-faq">Hiểu thêm trước khi tham gia</h2><ul class="vcx-related">${related.map((r) => `<li><a href="${href(r.href)}"${out(href(r.href))}>${esc(r.label)}</a></li>`).join('')}</ul></div>
<div class="vcx-faqs">${faqs.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f.question)}<i aria-hidden="true">+</i></summary><p>${esc(f.answer)}</p></details>`).join('')}</div>
</div></section>

<section class="vcx-section" aria-labelledby="vcx-src"><div class="shell vcx-sources">
<h2 id="vcx-src">Nguồn tham chiếu</h2>
<ul><li><a href="${RULES_PDF}" target="_blank">Bảo hiểm PVI: Quy tắc bảo hiểm tự nguyện xe ô tô, hiệu lực 01/07/2025 ↗</a></li><li><a href="${CLAUSES_PDF}" target="_blank">Bảo hiểm PVI: Các điều khoản bổ sung bảo hiểm tự nguyện xe ô tô, hiệu lực 01/07/2025 ↗</a></li><li>Giấy chứng nhận bảo hiểm xe ô tô PVI cấp ngày 27/10/2026 do PVI Thành Đô cung cấp (số liệu phí); thông tin chủ xe và xe trên giấy mẫu là thông tin tượng trưng.</li></ul>
<p>Đối chiếu nguồn ngày ${esc(DOI_CHIEU_NGUON)}. Phạm vi, loại trừ, mức khấu trừ và phí áp dụng theo quy tắc, điều khoản và hợp đồng được phát hành. Mô hình 3D và video là hình ảnh mô phỏng.</p>
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
] };

const html = page({
  path: PATH, title, description, image: '/assets/vat-chat-xe/showroom-kiem-tra-xe-poster.webp', bodyClass: 'fire vcx',
  extraCss: '<link rel="stylesheet" href="/vcx.css">',
  head: ld(graph) + faqJsonLd(faqs),
  scripts: '<script type="module" src="/vcx/builder.js"></script>',
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
.vcx-page img,.vcx-page video{max-width:100%}
.vcx-page [hidden]{display:none!important}
/* style.css của pvihcm đặt kiểu chung cho mọi <header> (đầu trang cũ): gỡ cho các header bên trong trang này. */
.vcx-page header{height:auto;max-width:none;justify-content:flex-start}
.vcx-page .vcx-stepHead{margin:0 0 16px;padding:0}
.vcx-page .vcx-certTop{margin:0 0 6px;padding:0 0 14px}
.vcx-page .vcx-viewer svg,.vcx-page .vcx-clause svg{width:1em;height:1em}
/* Không có ô kiểm tra giá như bản gốc: nút báo giá nằm cạnh ô giá trị xe. */
.vcx-fields .vcx-quoteBtn{grid-column:2/4}
@media(max-width:720px){.vcx-fields .vcx-quoteBtn{grid-column:1/-1}}
.vcx-canvas canvas{touch-action:pan-y}
/* Chữ trên nền xanh đậm: product.css (.fire h2) và .vcx-sources a làm chìm chữ trắng. */
.vcx-page .vcx-summary h2{color:#fff}
.vcx-sources a.vcx-primary{color:#fff}
`;
  fs.writeFileSync(path.join(DIST, 'vcx.css'), HEAD + css + '\n' + FOOT);
  console.log('wrote dist/vcx.css');
}
