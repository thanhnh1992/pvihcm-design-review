// Trang Bảo hiểm ô tô của pvihcm (/san-pham/bao-hiem-o-to/), dựng theo đúng bố cục trang
// /bao-hiem-o-to của baohiempvi-vn (chủ site yêu cầu 09/11/2026: "lấy nguyên toàn bộ sản phẩm
// bảo hiểm xe ô tô của baohiempvi-vn qua"). Bản gốc là React (page.tsx, auto-insurance-experience.tsx,
// story-section.tsx, tnds-seo-content.tsx); ở đây chuyển sang HTML tĩnh.
// Dữ liệu: tools/data/tnds.mjs (bản chép nguyên văn tnds-data.ts, chạy lại bằng tools/load-data.mjs),
// không gõ lại số liệu. Bộ tra phí: dist/o-to/tra-phi.js (dùng chung cho trang in sẵn và trình duyệt).
// CSS: dist/o-to.css (tools/extract-o-to-css.cjs). Hiệu ứng cuộn: dist/o-to/cuon.js.
// Chạy: node tools/o-to-ui.mjs (sau đó srcset không cần: ảnh đã có srcset).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { page, t, esc, SITE, faqJsonLd } from './chrome.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(HERE, '../dist');
// Trình duyệt và máy sinh trang dùng cùng một file dữ liệu.
fs.copyFileSync(path.join(HERE, 'data/tnds.mjs'), path.join(DIST, 'o-to/tnds-data.js'));
fs.copyFileSync(path.join(HERE, 'data/order-input-rules.mjs'), path.join(DIST, 'o-to/order-input-rules.js'));
const D = await import(pathToFileURL(path.join(DIST, 'o-to/tnds-data.js')).href);
const { renderDashboard, initialState } = await import(pathToFileURL(path.join(DIST, 'o-to/tra-phi.js')).href);
const { CLAIMS_HOTLINE, ONLINE_DISCOUNT_RATE, SALES_PHONE, SALES_TEL, feeWithVat, formatVnd, officialDocuments, tndsFaqs, tndsLimits, tndsReference, tndsVehicleClasses } = D;

export const PATH = '/san-pham/bao-hiem-o-to/';
const TNDS = '/san-pham/bao-hiem-bat-buoc/';
const VCX = '/san-pham/bao-hiem-vat-chat-xe/';
// Danh sách gara liên kết PVI: số đếm từ app/gara-data.json của baohiempvi-vn (09/11/2026).
// pvihcm chưa có trang tra gara nên dẫn sang trang danh sách chính thức của PVI.
const GARA_COUNT = 692;
const GARA_URL = 'https://online.pvi.com.vn/kien-thuc/danh-sach-gara-lien-ket-sua-chua-cua-bao-hiem-pvi';
const BHVN = 'https://www.baohiempvi-vn.com';
// Link nội bộ của baohiempvi-vn: trang có trên pvihcm thì đổi sang, chưa có thì dẫn sang baohiempvi-vn.
const docHref = (href) => href === '/gara-lien-ket-pvi' ? GARA_URL : href.startsWith('/') ? BHVN + href : href;
const ext = 'target="_blank" rel="noopener"';

const buoc = [
  { so: '01', nhan: 'Báo tổn thất', tieuDe: 'Gọi ngay, đừng sửa trước', mo: `Gọi ${CLAIMS_HOTLINE} báo cho Bảo hiểm PVI ngay tại chỗ. Chụp hiện trường, biển số và vết hư hỏng trước khi di chuyển xe.`, manh: 'Tự sửa trước rồi mới báo là lý do hồ sơ hay bị kéo dài nhất.' },
  { so: '02', nhan: 'Giám định', tieuDe: 'Giám định viên xem xe cùng gara', mo: 'Giám định viên PVI và cố vấn dịch vụ thống nhất hạng mục sửa chữa, thay thế rồi lập biên bản.', manh: 'Chưa có biên bản giám định thì chưa tháo sửa.' },
  { so: '03', nhan: 'Bảo lãnh', tieuDe: 'PVI trả thẳng cho gara', mo: `Chọn một trong ${GARA_COUNT} gara và showroom liên kết trên cả nước. PVI duyệt báo giá rồi thanh toán trực tiếp phần thuộc trách nhiệm bảo hiểm.`, manh: 'Chủ xe không phải ứng tiền phần được bảo hiểm chi trả.' },
  { so: '04', nhan: 'Nhận xe', tieuDe: 'Chỉ trả phần của mình', mo: 'Chủ xe thanh toán mức khấu trừ theo hợp đồng và các hạng mục ngoài phạm vi bảo hiểm, giữ lại hoá đơn và biên bản bàn giao.', manh: 'Giữ chứng từ để đối chiếu khi cần.' },
];

const card = (kind, img, alt, small, title, em, amount, unit, prio) => `<button class="auto-choice-card card-${kind}" data-chon="${kind}" type="button" aria-pressed="false"><span class="auto-choice-tick" aria-hidden="true"><i>✓</i><em>Chọn</em></span><img src="/assets/o-to/${img}.webp" srcset="/assets/o-to/${img}-800.webp 800w, /assets/o-to/${img}.webp 1400w" sizes="(max-width: 768px) 90vw, 900px" alt="${esc(alt)}" ${prio ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" width="1400" height="788"><span class="auto-choice-veil"></span><span class="auto-choice-copy"><small>${small}</small><strong>${title}</strong><em>${em}</em><b class="auto-choice-price"><small class="auto-choice-price-prefix">Chỉ từ</small><strong class="auto-choice-price-amount">${amount}</strong><span>${unit}</span></b><span class="auto-choice-selected">Đang xem <i>→</i></span></span></button>`;

const experience = `<section class="auto-experience" aria-label="Chọn sản phẩm và tra cứu phí bảo hiểm ô tô" data-vcx-url="${VCX}">
<div class="auto-choice-hint"><i aria-hidden="true">✓</i><span>Tick chọn sản phẩm, có thể chọn cả hai.</span></div>
<div class="auto-choice-grid state-default">${card('tnds', 'auto-tier-tnds', 'Cảnh sát giao thông điều tiết tại ngã tư, xe con và xe tải đang lưu thông đúng làn', 'TRÁCH NHIỆM PHÁP LÝ', 'Bảo hiểm<br>TNDS bắt buộc', 'Bảo vệ trách nhiệm của chủ xe đối với bên thứ ba theo quy định pháp luật.', '437.000đ', 'Phí cơ bản chưa VAT', true)}${card('damage', 'auto-tier-vat-chat-xe', 'Nhân viên giám định trao đổi với hai tài xế bên cạnh hai xe vừa va chạm', 'BẢO VỆ CHÍNH XE', 'Bảo hiểm<br>vật chất xe', 'Thiết kế phương án theo giá trị xe, rủi ro sử dụng và điều khoản bổ sung.', '3,5 triệu', 'Tỷ lệ phí chỉ từ 0,85%', false)}</div>
<div class="auto-trust-line" aria-label="Các điểm nổi bật"><span>◇ Phí theo biểu phí pháp luật</span><span>◇ Nguồn PVI được gắn rõ</span><span>◇ Không thay thế tư vấn theo hồ sơ</span></div>
<p class="auto-switch-note" role="status" hidden></p>
<div class="auto-dashboard" id="tnds-tra-cuu"><div class="auto-dashboard-main">
<div class="auto-dashboard-heading"><div><span>TNDS BẮT BUỘC · TRA CỨU NHANH</span><h2>Chọn từng bước. Phí cập nhật ngay.</h2></div><a href="${TNDS}">Xem dữ liệu đầy đủ <i>→</i></a></div>
<div class="auto-progress" aria-label="Các bước tra cứu phí"><div><span>01</span><b>Loại xe</b></div><i></i><div><span>02</span><b>Mục đích sử dụng</b></div><i></i><div><span>03</span><b>Thông số xe</b></div></div>
<div data-tra-phi>${renderDashboard(initialState())}</div>
</div>
<aside class="auto-dashboard-aside" aria-label="Thông tin hỗ trợ bảo hiểm ô tô">
<section class="auto-limit-card auto-side-card"><span>GIỚI HẠN TRÁCH NHIỆM</span>${tndsLimits.map((l, i) => `<div><i aria-hidden="true">${i === 0 ? '◎' : '◇'}</i><p>${esc(l.label)}<b>${esc(l.value)} <small>${esc(l.note)}</small></b></p></div>`).join('')}</section>
<section class="auto-sidebar-docs auto-side-card" aria-labelledby="auto-sidebar-docs-title"><span id="auto-sidebar-docs-title">TÀI LIỆU LIÊN QUAN</span>${officialDocuments.map((d) => `<a href="${esc(docHref(d.href))}" ${ext}><i aria-hidden="true">□</i><p><b>${t(d.title)}</b></p><em aria-hidden="true">↗</em></a>`).join('')}</section>
<section class="auto-sidebar-faqs auto-side-card" aria-labelledby="auto-sidebar-faqs-title"><span id="auto-sidebar-faqs-title">CÂU HỎI THƯỜNG GẶP</span>${tndsFaqs.slice(0, 3).map((f) => `<details><summary>${t(f.question)}<i aria-hidden="true">+</i></summary><p>${t(f.answer)}</p></details>`).join('')}<a href="#faq" class="auto-sidebar-more">Xem tất cả câu hỏi <i aria-hidden="true">→</i></a></section>
<section class="auto-sidebar-consult" aria-label="Tư vấn bảo hiểm vật chất xe"><span>VẬT CHẤT XE</span><h3>Xe cần bảo vệ<br>nhiều hơn?</h3><p>Nhận phương án theo giá trị xe và điều khoản thực tế.</p><a href="${VCX}">Khám phá bảo vệ xe <i>→</i></a></section>
</aside></div>
</section>`;

const story = `<section aria-labelledby="mach-ke" class="auto-section st-khoi"><div class="shell st-luoi"><div class="st-ben"><div class="st-dinh"><span class="st-nhan">KHI XE GẶP SỰ CỐ</span><h2 id="mach-ke">Bốn bước, <em class="st-chuSong">không phải tự xoay xở</em></h2><p>Cuộn xuống để xem thứ tự việc cần làm. Mỗi bước là một việc cụ thể, không phải lời hứa chung chung.</p><div aria-hidden="true" class="st-dongHo">${buoc.map((b) => `<span class="st-chamBuoc" data-buoc-anh="${b.so}"><b>${b.so}</b><i>${b.nhan}</i></span>`).join('')}</div><a class="st-nutGoi" href="tel:${CLAIMS_HOTLINE.replace(/\s/g, '')}">Báo tổn thất: ${CLAIMS_HOTLINE}</a></div></div>
<ol class="st-danhSach">${buoc.map((b) => `<li class="st-buoc" data-buoc="${b.so}"><span class="st-soBuoc">${b.so}</span><h3>${t(b.tieuDe)}</h3><p>${t(b.mo)}</p><p class="st-manh">${t(b.manh)}</p></li>`).join('')}</ol></div>
<p class="shell st-chanKhoi">Xem trước nơi sửa xe: <a href="${GARA_URL}" ${ext}>danh sách ${GARA_COUNT} gara liên kết PVI</a>.</p></section>`;

const knowledge = `<section class="auto-knowledge-grid" aria-label="Thông tin TNDS quan trọng"><article><span>01</span><h2>TNDS là gì?</h2><p>Bảo hiểm bắt buộc trách nhiệm dân sự của chủ xe cơ giới, bảo vệ thiệt hại của bên thứ ba và hành khách trong phạm vi pháp luật quy định.</p><a href="${TNDS}">Đọc trang TNDS <i>→</i></a></article><article><span>02</span><h2>Không thay thế vật chất xe</h2><p>Thiệt hại của chính xe cần được tư vấn bằng bảo hiểm vật chất xe, dựa trên giá trị xe và các điều khoản lựa chọn.</p><a href="${VCX}">Tìm hiểu vật chất xe <i>→</i></a></article><article><span>03</span><h2>Giới hạn trách nhiệm</h2><div class="auto-limit-list">${tndsLimits.map((l) => `<p><span>${esc(l.label)}</span><b>${esc(l.value)} <small>${esc(l.note)}</small></b></p>`).join('')}</div></article></section>
<section class="auto-faq-docs" id="faq"><div class="auto-faqs"><div class="auto-section-heading"><span>CÂU HỎI THƯỜNG GẶP</span><h2>Thông tin đủ rõ cho người và máy đọc.</h2></div>${tndsFaqs.map((f) => `<details><summary>${t(f.question)}<i>+</i></summary><p>${t(f.answer)}</p></details>`).join('')}</div>
<aside class="auto-docs"><span>TÀI LIỆU CHÍNH THỨC & PHÁP LÝ</span><h2>Tài liệu bảo hiểm ô tô từ Bảo hiểm PVI và Cổng thông tin Chính phủ.</h2>${officialDocuments.map((d) => `<a href="${esc(docHref(d.href))}" ${ext}><small>${t(d.type)}</small><b>${t(d.title)}</b><i>↗</i></a>`).join('')}</aside></section>`;

const feeTables = `<section class="auto-fee-tables" aria-labelledby="tnds-fee-tables-title"><div class="auto-section-heading"><span>BIỂU PHÍ THAM KHẢO · HTML</span><h2 id="tnds-fee-tables-title">Biểu phí TNDS hiển thị sẵn trên trang</h2><p>Phí cơ bản, VAT 10% và tổng phí được cùng một nguồn dữ liệu cung cấp cho bảng này và khu vực tra cứu phía trên.</p></div><div class="auto-fee-table-stack">${tndsVehicleClasses.flatMap((v) => v.usages.map((u) => `<article class="auto-fee-table-card"><div><span>${esc(v.label)}</span><h3>${esc(u.label)}</h3><p>${t(v.description)}</p></div><div class="auto-table-scroll"><table><thead><tr><th>${esc(u.controlLabel)}</th><th>Phí cơ bản</th><th>VAT (10%)</th><th>Đã gồm VAT</th></tr></thead><tbody>${u.rows.map((r) => `<tr><th>${esc(r.label)}</th><td>${r.baseFee ? formatVnd(r.baseFee) : t(r.note)}</td><td>${r.baseFee ? formatVnd(Math.round(r.baseFee * 0.1)) : '—'}</td><td>${r.baseFee ? formatVnd(feeWithVat(r.baseFee)) : 'Theo xe gốc'}</td></tr>`).join('')}</tbody></table></div></article>`)).join('')}</div><div class="auto-reference-note"><span>i</span><p><b>${esc(tndsReference.legalBasis)}.</b> ${esc(tndsReference.vat)}. Dữ liệu hiển thị để tham khảo và cần đối chiếu giấy chứng nhận/phương án phát hành tại thời điểm tham gia.</p><a href="${esc(tndsReference.sourceUrl)}" ${ext}>Đọc nguồn PVI ↗</a></div></section>`;

const main = `<div class="oto-page"><div class="auto-page">
<section class="auto-hero"><div class="auto-hero-orb orb-one"></div><div class="auto-hero-orb orb-two"></div><div class="shell auto-hero-copy"><span class="auto-kicker">BẢO HIỂM XE CƠ GIỚI · PVI</span><h1>Bảo hiểm ô tô <em>PVI</em></h1><p>Lựa chọn giải pháp bảo vệ phù hợp cho bạn và chiếc xe thân yêu. Bảo vệ trách nhiệm với người khác và bảo vệ chính chiếc xe trước mọi rủi ro.</p><div class="auto-hero-links"><a href="#tnds-tra-cuu">Tra cứu phí TNDS <i>↓</i></a><a href="${VCX}">Xem vật chất xe <i>→</i></a></div></div></section>
<div class="shell auto-product-surface">${experience}</div>
<section class="auto-section auto-intro"><div class="shell auto-intro-grid"><div><span class="auto-kicker blue">HIỂU ĐÚNG TRƯỚC KHI CHỌN</span><h2>Hai lớp bảo vệ.<br><em>Một hành trình rõ ràng.</em></h2></div><div><p>TNDS bắt buộc giúp chủ xe thực hiện trách nhiệm với bên thứ ba và hành khách theo quy định. Bảo hiểm vật chất xe tập trung vào thiệt hại của chính chiếc xe theo quy tắc, điều khoản và hồ sơ được xác nhận.</p><p>Trang này ưu tiên trải nghiệm chọn nhanh; hai trang chuyên sâu tách riêng phần dữ liệu và nội dung cần đọc kỹ: <a href="${TNDS}">TNDS bắt buộc</a> và <a href="${VCX}">vật chất xe</a>.</p></div></div></section>
${story}
<section class="auto-section auto-soft-section"><div class="shell">${knowledge}</div></section>
<section class="auto-section"><div class="shell">${feeTables}</div></section>
<section class="auto-cta"><div class="shell auto-cta-inner"><div><span>KHÔNG CẦN TỰ ĐOÁN</span><h2>Đúng dữ liệu trước.<br>Đúng phương án sau.</h2><p>Thông tin biểu phí là điểm bắt đầu; phương án thực tế luôn cần đối chiếu hồ sơ xe và mục đích sử dụng.</p></div><a href="tel:0938072236">Trao đổi cùng chuyên viên <i>→</i></a></div></section>
</div></div>`;

const title = 'Bảo hiểm ô tô PVI | TNDS bắt buộc & vật chất xe';
const description = 'Tra cứu biểu phí TNDS ô tô, hiểu giới hạn trách nhiệm và chuẩn bị phương án bảo hiểm vật chất xe theo hồ sơ. Bảo hiểm PVI Thành Đô, TP.HCM.';
const service = {
  '@context': 'https://schema.org', '@type': 'Service',
  name: 'Bảo hiểm ô tô Bảo hiểm PVI Thành Đô', serviceType: 'Bảo hiểm xe cơ giới: TNDS bắt buộc của chủ xe, bảo hiểm vật chất xe, tai nạn người ngồi trên xe',
  provider: { '@type': 'InsuranceAgency', name: 'Bảo hiểm PVI Thành Đô', url: SITE + '/' }, areaServed: { '@type': 'AdministrativeArea', name: 'Việt Nam' },
  description: 'Tra cứu phí TNDS ô tô theo loại xe, mục đích sử dụng, số chỗ hoặc trọng tải; hiển thị riêng phí cơ bản, VAT 10% và tổng phí.',
  additionalProperty: [{ '@type': 'PropertyValue', name: 'Căn cứ pháp lý', value: tndsReference.legalBasis }, { '@type': 'PropertyValue', name: 'Thuế GTGT', value: tndsReference.vat },
    ...tndsLimits.map((l) => ({ '@type': 'PropertyValue', name: l.label, value: `${l.value} ${l.note}` }))],
};
const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
  { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE + '/' },
  { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: SITE + '/san-pham/' },
  { '@type': 'ListItem', position: 3, name: 'Bảo hiểm ô tô', item: SITE + PATH }] };
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

const html = page({
  path: PATH, title, description, image: '/assets/o-to/og-o-to.webp', bodyClass: 'fire oto',
  extraCss: '<link rel="stylesheet" href="/o-to.css">',
  head: ld(service) + faqJsonLd(tndsFaqs) + ld(crumbs),
  scripts: '<script type="module" src="/o-to/tra-phi.js"></script><script src="/o-to/cuon.js" defer></script>',
  main,
});
fs.mkdirSync(path.join(DIST, 'san-pham/bao-hiem-o-to'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'san-pham/bao-hiem-o-to/index.html'), html);
console.log('wrote dist/san-pham/bao-hiem-o-to/index.html', html.length, 'byte');

/* ── Trang đặt mua: bản chuyển của app/bao-hiem-o-to/dat-mua/page.tsx ──
   Form do dist/o-to/dat-mua.js vẽ (cần JavaScript); chưa chạy được JS thì khách vẫn có số gọi và Zalo.
   Đơn gửi về api/dat-hang-tnds.mjs, ghi Google Sheet. noindex giống bản gốc. */
const ORDER_PATH = PATH + 'dat-mua/';
const orderMain = `<div class="oto-page"><div class="auto-page accident-page accident-order-page tnds-order-page">
<section class="shell accident-order-shell"><div class="accident-order-intro"><span class="accident-order-eyebrow">ĐẶT MUA · TNDS BẮT BUỘC Ô TÔ</span><h1>Chốt đơn bảo hiểm TNDS cho xe của anh/chị</h1>
<p>${t('Điền thông tin bên dưới, phí hiện ngay theo loại xe. Đơn gửi thẳng cho nhân viên Bảo hiểm PVI Thành Đô — không thanh toán trên trang này, nhân viên gọi lại xác nhận trước khi phát hành.')}</p>
<ul class="accident-order-points"><li><b>Giảm ${Math.round(ONLINE_DISCOUNT_RATE * 100)}%</b> khi đặt mua online</li>${tndsLimits.map((l) => `<li>${esc(l.label)}: <b>${esc(l.value)}</b> ${esc(l.note)}</li>`).join('')}</ul>
<p class="accident-order-legal">Căn cứ ${esc(tndsReference.legalBasis)} · ${esc(tndsReference.vat)}. <a href="${esc(tndsReference.sourceUrl)}" ${ext}>Xem nguồn PVI ↗</a></p>
<p class="accident-order-legal"><a href="${PATH}">← Về trang bảo hiểm ô tô</a> · <a href="${TNDS}">Biểu phí TNDS</a></p></div>
<div data-dat-mua><div class="accident-order-form"><p class="accident-order-note">Đang mở form đặt mua… Nếu form không hiện, anh/chị gọi <a href="${SALES_TEL}">${SALES_PHONE}</a> hoặc nhắn Zalo để đặt mua.</p></div></div>
</section></div></div>`;
const orderHtml = page({
  path: ORDER_PATH, title: 'Đặt mua Bảo hiểm TNDS bắt buộc ô tô PVI | Giảm 10% mua online',
  description: 'Điền đơn đặt mua bảo hiểm trách nhiệm dân sự bắt buộc cho ô tô, xem ngay phí sau ưu đãi và gửi thẳng cho nhân viên Bảo hiểm PVI Thành Đô.',
  image: '/assets/o-to/og-o-to.webp', bodyClass: 'fire oto', extraCss: '<link rel="stylesheet" href="/o-to.css">',
  head: '<meta name="robots" content="noindex, follow">',
  scripts: '<script type="module" src="/o-to/dat-mua.js"></script>', main: orderMain,
});
fs.mkdirSync(path.join(DIST, 'san-pham/bao-hiem-o-to/dat-mua'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'san-pham/bao-hiem-o-to/dat-mua/index.html'), orderHtml);
console.log('wrote dist/san-pham/bao-hiem-o-to/dat-mua/index.html', orderHtml.length, 'byte');
