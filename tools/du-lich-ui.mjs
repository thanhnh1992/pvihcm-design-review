// Giao diện trang Bảo hiểm du lịch quốc tế theo mẫu chủ site duyệt 28/10/2026.
// Chỉ lo phần trình bày. Mọi con số (quyền lợi, biểu phí) nhận từ khối dữ liệu
// trong gen-products-2.mjs, vốn lấy nguyên văn tài liệu chính thức của PVI.
// CSS: dist/du-lich.css (mọi lớp bắt đầu bằng tv-). JS: dist/du-lich.js (bộ tính phí).
import { t, esc, ZALO } from './chrome.mjs';

const ZALO_TV = 'https://zalo.me/0938072236';

const ico = {
  shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6L12 3Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.3 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.3-3.5-8.5s1.1-6.1 3.5-8.5Z"/>',
  plane: '<path d="M21 3 3 10.5l6.5 2.5L12 21l3.5-6.5L21 3Z"/><path d="m9.5 13 5.5-5"/>',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
  cal: '<rect x="4" y="5.5" width="16" height="14.5" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
  users: '<circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><circle cx="16.5" cy="9.5" r="2.4"/><path d="M16 14.2c2.3.2 4 1.8 4.5 4.8"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  phone: '<path d="M6.6 3.5h3l1.5 4.2-2 1.4a11 11 0 0 0 5.8 5.8l1.4-2 4.2 1.5v3a2 2 0 0 1-2.2 2C10.6 18.8 5.2 13.4 4.6 5.7a2 2 0 0 1 2-2.2Z"/>',
  medkit: '<rect x="3.5" y="7" width="17" height="13" rx="2"/><path d="M9 7V5h6v2M12 10.5v6M9 13.5h6"/>',
  cross: '<path d="M9.5 3.5h5v6h6v5h-6v6h-5v-6h-6v-5h6v-6Z"/>',
  doc: '<path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4M9.5 12h6M9.5 15.5h6"/><path d="M4.5 7v14h10"/>',
  hand: '<circle cx="12" cy="7" r="3"/><path d="M5 20c.7-3.6 3.5-6 7-6s6.3 2.4 7 6"/><path d="M15.5 11.5 19 9M8.5 11.5 5 9"/>',
  ambulance: '<path d="M3 16.5V8h11v8.5M14 11h4l3 3v2.5h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/><path d="M8.5 10.5v3M7 12h3"/>',
  q: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.6"/><circle cx="12" cy="16.8" r=".6" fill="currentColor"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
};
const svg = (name, cls = 'tv-ico') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ico[name]}</svg>`;

// Khiên của ba gói. Màu bạc, vàng, kim cương chỉ để nhận diện gói.
const badge = (kind) => {
  const g = {
    bac: ['#f4f6f9', '#aab4c2', '#6f7c8e'],
    vang: ['#ffe8a3', '#f2b631', '#c98712'],
    kc: ['#dff0ff', '#6fb2f2', '#2f6fc6'],
  }[kind];
  const gem = kind === 'kc' ? '<path d="M17.5 17h13l3 4.5-9.5 11-9.5-11z" fill="#fff" opacity=".9"/><path d="M14.5 21.5h19M20.5 17l-1.5 4.5 5 11 5-11-1.5-4.5" fill="none" stroke="#6fb2f2" stroke-width="1"/>' : '';
  return `<svg class="tv-badge" viewBox="0 0 48 52" aria-hidden="true"><defs><linearGradient id="tvg-${kind}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${g[0]}"/><stop offset=".55" stop-color="${g[1]}"/><stop offset="1" stop-color="${g[2]}"/></linearGradient></defs><path d="M24 2 4 9.5v15C4 37 12.6 46.6 24 50c11.4-3.4 20-13 20-25.5v-15L24 2Z" fill="url(#tvg-${kind})"/><path d="M24 7 9 12.7v11.8C9 34.4 15.4 42 24 44.8V7Z" fill="#fff" opacity=".28"/>${gem}</svg>`;
};

const pic = (name, alt, sizes, cls = '', eager = false) => `<img class="${cls}" src="/assets/${name}-800.webp" srcset="/assets/${name}-480.webp 480w, /assets/${name}-800.webp 800w, /assets/${name}.webp 1280w" sizes="${sizes}" width="800" height="600" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>`;

const vnd = (n) => n.toLocaleString('vi-VN') + 'đ';

/* ── 1. Hero + bộ tính phí ── */
export function tvHero({ regions, bands }) {
  // Biểu phí theo vùng, phạm vi chính, 8 bậc đến 31 ngày. Chuyến dài hơn: chuyên viên báo phí.
  const feeData = Object.fromEntries(regions.map(([id, , tb]) => [id, Object.fromEntries(Object.entries(tb).map(([k, v]) => [k, v.slice(0, bands.length).map((x) => x[0])]))]));
  const tc = feeData.tc; // Ví dụ mặc định: Châu Âu (vùng Toàn cầu), 11 ngày, 2 người, bậc 11 đến 14 ngày.
  const ex = (k) => vnd(tc[k][3] * 2);
  return `
<section class="tv-hero" aria-labelledby="tv-h1">
<picture class="tv-hero-bg"><source media="(max-width:760px)" srcset="/assets/du-lich-hero-800.webp"><img src="/assets/du-lich-hero-1280.webp" srcset="/assets/du-lich-hero-800.webp 800w, /assets/du-lich-hero-1280.webp 1280w, /assets/du-lich-hero.webp 1672w" sizes="100vw" width="1672" height="941" alt="Du khách mang vali và hộ chiếu ngắm biển Santorini, máy bay bay ngang bầu trời" fetchpriority="high"></picture>
<div class="tv-wrap tv-hero-grid">
<div class="tv-hero-copy">
<h1 id="tv-h1"><span class="tv-kicker">Bảo hiểm du lịch quốc tế <i aria-hidden="true">•</i> PVI</span><span class="tv-title">Đi xa hơn,<br><em>an tâm hơn.</em></span></h1>
<p class="tv-hero-lead">Bảo vệ bạn và gia đình trong mọi hành trình: chi phí y tế, tai nạn, hủy chuyến, hành lý, mức bảo hiểm đến 3 tỷ đồng mỗi người.</p>
<ul class="tv-hero-badges">
<li>${svg('shield')}<span>Quyền lợi<b>toàn diện</b></span></li>
<li>${svg('clock')}<span>Chi trả trong<b>15 ngày làm việc</b></span></li>
<li>${svg('globe')}<span>Phù hợp<b>mọi điểm đến</b></span></li>
</ul>
<div class="tv-hero-actions"><a class="tv-btn tv-btn-red" href="#tinh-phi" data-tv-focus>Nhận tư vấn ngay ${svg('arrow', 'tv-ico-sm')}</a><a class="tv-btn tv-btn-ghost" href="#so-sanh">Xem quyền lợi</a></div>
<p class="tv-hero-note">${svg('plane', 'tv-ico-sm')} Dùng cho du lịch, thăm thân, công tác và hồ sơ xin thị thực.</p>
</div>

<form class="tv-calc" id="tinh-phi" aria-labelledby="tv-calc-h" onsubmit="return false">
<h2 id="tv-calc-h">Tính phí bảo hiểm du lịch</h2>
<p class="tv-calc-sub">Chỉ mất vài phút để tìm gói phù hợp với chuyến đi của bạn.</p>
<label class="tv-field"><span>Điểm đến</span><span class="tv-input">${svg('pin', 'tv-ico-sm')}<select name="dest" id="tv-dest">
<option value="dna">Đông Nam Á</option>
<option value="ca">Châu Á (ngoài Đông Nam Á)</option>
<option value="eu" selected>Châu Âu / Schengen</option>
<option value="tc">Mỹ, Úc và các nước khác</option>
</select>${svg('chev', 'tv-ico-sm tv-chev')}</span></label>
<div class="tv-row2">
<label class="tv-field"><span>Ngày đi</span><span class="tv-input">${svg('cal', 'tv-ico-sm')}<input type="date" name="from" id="tv-from"></span></label>
<label class="tv-field"><span>Ngày về</span><span class="tv-input">${svg('cal', 'tv-ico-sm')}<input type="date" name="to" id="tv-to"></span></label>
</div>
<label class="tv-field"><span>Số người</span><span class="tv-input">${svg('users', 'tv-ico-sm')}<select name="people" id="tv-people">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `<option value="${n}"${n === 2 ? ' selected' : ''}>${n} người</option>`).join('')}<option value="11">Trên 10 người (đoàn)</option></select>${svg('chev', 'tv-ico-sm tv-chev')}</span></label>
<label class="tv-switch"><span>Tôi cần bảo hiểm để làm hồ sơ visa</span><input type="checkbox" name="visa" id="tv-visa" role="switch"><i aria-hidden="true"></i></label>
<div class="tv-quote" id="tv-quote" aria-live="polite">
<p class="tv-quote-cap" id="tv-quote-cap">Phí tạm tính, ví dụ 2 người, 11 ngày, vùng Toàn cầu</p>
<ul class="tv-quote-list">
<li data-goi="Bạc"><span>Bạc</span><b>${ex('Bạc')}</b></li>
<li data-goi="Vàng" class="on"><span>Vàng</span><b>${ex('Vàng')}</b></li>
<li data-goi="Kim cương"><span>Kim cương</span><b>${ex('Kim cương')}</b></li>
</ul>
<p class="tv-quote-note">Theo biểu phí vùng của PVI, phạm vi chính. Chuyên viên xác nhận phí trước khi phát hành.</p>
</div>
<a class="tv-btn tv-btn-red tv-btn-block" id="tv-send" href="${ZALO_TV}" target="_blank" rel="noopener">Nhận tư vấn ngay ${svg('arrow', 'tv-ico-sm')}</a>
<p class="tv-send-msg" id="tv-send-msg" role="status"></p>
<ul class="tv-ticks"><li>${svg('check', 'tv-ico-xs')}Tư vấn miễn phí</li><li>${svg('check', 'tv-ico-xs')}Có báo phí nhanh</li><li>${svg('check', 'tv-ico-xs')}Không lưu dữ liệu trên web</li></ul>
<script type="application/json" id="tv-fee-data">${JSON.stringify(feeData)}</script>
</form>
</div>
</section>`;
}

/* ── 2. Mục đích chuyến đi ── */
export function tvPurpose() {
  const cards = [
    ['du-lich-schengen', 'Schengen / Visa', 'Du lịch châu Âu', 'eu', 'Cặp đôi du lịch bên sông Seine, phía sau là tháp Eiffel'],
    ['du-lich-chau-a', 'Đi châu Á', 'Du lịch, nghỉ dưỡng', 'ca', 'Du khách ngắm hoa anh đào và chùa tháp ở Kyoto'],
    ['du-lich-cong-tac', 'Công tác', 'Công tác, thăm người thân', '', 'Doanh nhân kéo vali trong sảnh sân bay'],
    ['du-lich-gia-dinh', 'Gia đình / Trẻ em', 'Trẻ từ 7 ngày tuổi được tham gia', '', 'Gia đình bốn người chơi cát trên bãi biển'],
    ['du-lich-du-hoc', 'Du học / Lao động', 'Chuyến dài ngày, chuyên viên báo phí', '', 'Sinh viên ôm sách trên cầu Westminster, London'],
  ];
  return `
<section class="tv-sec tv-purpose" aria-labelledby="tv-purpose-h"><div class="tv-wrap">
<div class="tv-head"><h2 id="tv-purpose-h">Chọn mục đích chuyến đi</h2><a class="tv-more" href="#phi">Xem tất cả điểm đến ${svg('arrow', 'tv-ico-xs')}</a></div>
<div class="tv-purpose-list">${cards.map(([img, title, sub, dest, alt]) => `<a class="tv-pcard" href="#tinh-phi"${dest ? ` data-dest="${dest}"` : ''}>${pic(img, alt, '(max-width:760px) 62vw, 240px')}<span class="tv-pcard-body"><b>${t(title)}</b><small>${t(sub)}</small><i>${svg('arrow', 'tv-ico-xs')}</i></span></a>`).join('')}</div>
</div></section>`;
}

/* ── 3. So sánh 3 gói ── */
export function tvPlans({ main1, main2 }) {
  const pick = (rows, label) => rows.find((r) => r[0] === label)[1].slice(3);
  const rows = [
    ['shield', 'Tai nạn cá nhân', pick(main1, 'Tai nạn cá nhân')],
    ['medkit', 'Chi phí y tế', pick(main1, 'Chi phí y tế')],
    ['ambulance', 'Vận chuyển y tế cấp cứu', pick(main1, 'Vận chuyển y tế cấp cứu')],
    ['plane', 'Hủy chuyến đi', pick(main2, 'Hủy chuyến đi, rút ngắn chuyến đi'), true],
  ];
  const plans = [
    ['bac', 'Gói BẠC', 'Bạc', 'Bảo vệ cơ bản, phí thấp nhất'],
    ['vang', 'Gói VÀNG', 'Vàng', 'Cân bằng quyền lợi và phí'],
    ['kc', 'Gói KIM CƯƠNG', 'Kim cương', 'Mức bảo hiểm cao nhất'],
  ];
  const up = (v) => (/tỷ|triệu/.test(v) ? 'Đến ' + v + ' đồng' : v);
  return `
<section class="tv-sec tv-plans" id="so-sanh" aria-labelledby="tv-plans-h"><div class="tv-wrap">
<div class="tv-head"><div><h2 id="tv-plans-h">So sánh 3 gói bảo hiểm phổ biến</h2><p>Lựa chọn gói phù hợp theo nhu cầu chuyến đi. Quyền lợi theo Bảng quyền lợi PVI, mức phí tham khảo theo điểm đến và số ngày.</p></div><a class="tv-more" href="#quyen-loi">Xem chi tiết quyền lợi ${svg('arrow', 'tv-ico-xs')}</a></div>
<div class="tv-plan-list">${plans.map(([k, name, goi, sub], pi) => `<article class="tv-plan${pi === 1 ? ' tv-plan-hot' : ''}">${pi === 1 ? '<span class="tv-plan-flag">Phù hợp nhất</span>' : ''}
<header>${badge(k)}<div><h3>${name}</h3><p>${t(sub)}</p></div></header>
<ul>${rows.map(([ic, label, vals, extra]) => `<li>${svg(ic, 'tv-ico-sm')}<span>${t(label)}${extra ? '<sup>*</sup>' : ''}</span><b>${t(up(vals[pi]))}</b></li>`).join('')}</ul>
<a class="tv-btn ${pi === 1 ? 'tv-btn-red' : 'tv-btn-line'} tv-btn-block" href="#tinh-phi" data-goi="${goi}">Chọn gói ${goi}</a>
<a class="tv-link" href="#quyen-loi">Xem chi tiết quyền lợi ${svg('arrow', 'tv-ico-xs')}</a>
</article>`).join('')}</div>
<p class="tv-plan-foot"><sup>*</sup> Hủy chuyến đi thuộc phạm vi bảo hiểm bổ sung, tính phí riêng. Phí của từng gói theo điểm đến và số ngày: xem <a href="#phi">biểu phí</a> hoặc dùng bộ tính phí ở đầu trang.</p>
</div></section>`;
}

/* ── 4. Rủi ro khi đi nước ngoài ── */
export function tvRisks() {
  const tiles = [
    ['medkit', 'Chi phí y tế', 'khi bị ốm, tai nạn', '#quyen-loi'],
    ['cross', 'Hủy / trễ chuyến', 'bay, mất hành lý', '#bo-sung'],
    ['doc', 'Mất giấy tờ,', 'đồ dùng cá nhân', '#bo-sung'],
    ['hand', 'Trách nhiệm', 'bên thứ ba', '#bo-sung'],
    ['ambulance', 'Cấp cứu, hồi hương', 'về Việt Nam', '#quyen-loi'],
  ];
  return `
<section class="tv-sec tv-risks" aria-labelledby="tv-risks-h">
<svg class="tv-risks-plane" viewBox="0 0 240 90" aria-hidden="true"><path d="M8 70c50-6 120-30 170-52" fill="none" stroke="#c9dcf3" stroke-width="2" stroke-dasharray="3 7"/><path d="m176 20 46-16c6-2 11 2 7 6l-30 20 6 24-7 3-14-20-21 9 2 9-5 2-5-12-12-4 2-5 9 1 9-20-21-11 3-6Z" fill="#d5e5f7"/></svg>
<div class="tv-wrap">
<div class="tv-head"><div><h2 id="tv-risks-h">Những rủi ro có thể gặp khi đi nước ngoài</h2><p>Chủ động bảo vệ bản thân và gia đình trước các sự cố bất ngờ trong chuyến đi.</p></div></div>
<ul class="tv-risk-list">${tiles.map(([ic, a, b, href]) => `<li><a href="${href}">${svg(ic, 'tv-ico-lg')}<b>${t(a)}</b><span>${t(b)}</span></a></li>`).join('')}</ul>
<p class="tv-risk-note">Thiên tai, bạo động và dịch bệnh thuộc điểm loại trừ; riêng dịch bệnh mua thêm được bằng điều khoản mở rộng. <a href="#loai-tru">Xem điểm loại trừ</a></p>
</div></section>`;
}

/* ── 5. Dải tư vấn ── */
export function tvAdvisor() {
  return `
<section class="tv-advisor" aria-labelledby="tv-adv-h"><div class="tv-wrap"><div class="tv-adv-box">
${pic('du-lich-tu-van', 'Chuyên viên tư vấn đeo tai nghe trả lời khách', '(max-width:760px) 100vw, 260px', 'tv-adv-img')}
<div class="tv-adv-copy">
<h2 id="tv-adv-h">Cần tư vấn gói phù hợp với chuyến đi của bạn?</h2>
<p>Chuyên viên PVI Thành Đô tư vấn qua điện thoại và Zalo, báo phí theo đúng hành trình của bạn.</p>
<ul>
<li>${svg('sparkle', 'tv-ico-sm')}Tư vấn miễn phí</li>
<li>${svg('clock', 'tv-ico-sm')}Báo phí nhanh</li>
<li>${svg('doc', 'tv-ico-sm')}Giấy chứng nhận cho hồ sơ visa</li>
<li>${svg('shield', 'tv-ico-sm')}Đồng hành khi có sự cố</li>
</ul>
</div>
<div class="tv-adv-call">${svg('phone', 'tv-ico-xl')}<div><span>Gọi ngay</span><a href="tel:0918981869">0918 981 869</a><a href="tel:0938072236">0938 072 236</a></div><a class="tv-adv-zalo" href="${ZALO_TV}" target="_blank" rel="noopener" aria-label="Nhắn Zalo 0938 072 236">${svg('arrow', 'tv-ico-sm')}</a></div>
</div></div></section>`;
}

/* ── 6. Câu hỏi thường gặp, 2 cột; 6 câu đầu hiện sẵn ── */
export function tvFaq(faqs, shown = 6) {
  const item = (f, i) => `<details class="tv-qa"${i >= shown ? ' data-more hidden' : ''}><summary>${svg('q', 'tv-ico-q')}<span>${t(f.question)}</span>${svg('chev', 'tv-ico-sm tv-chev')}</summary><div class="tv-ans">${t(f.answer)}</div></details>`;
  return `
<section class="tv-sec tv-faq" id="cau-hoi" aria-labelledby="tv-faq-h"><div class="tv-wrap">
<div class="tv-head"><h2 id="tv-faq-h">Câu hỏi thường gặp</h2>${faqs.length > shown ? `<button type="button" class="tv-more" id="tv-faq-all" aria-expanded="false">Xem tất cả câu hỏi ${svg('arrow', 'tv-ico-xs')}</button>` : ''}</div>
<div class="tv-qa-list">${faqs.map(item).join('')}</div>
</div></section>`;
}

/* ── 7. Dải kêu gọi cuối trang ── */
export function tvCta() {
  return `
<section class="tv-cta" aria-labelledby="tv-cta-h"><div class="tv-wrap tv-cta-box">
<span class="tv-cta-mark">${svg('plane', 'tv-ico-lg')}</span>
<div class="tv-cta-copy"><h2 id="tv-cta-h">Sắp có chuyến đi?</h2><p>Gửi lịch trình qua Zalo, chúng tôi tư vấn gói phù hợp với bạn.</p></div>
<div class="tv-cta-actions"><a class="tv-btn tv-btn-phone" href="tel:0918981869">${svg('phone', 'tv-ico-sm')}0918 981 869</a><a class="tv-btn tv-btn-red" href="${ZALO}" target="_blank" rel="noopener">Nhận tư vấn ngay ${svg('arrow', 'tv-ico-sm')}</a></div>
</div></section>`;
}
