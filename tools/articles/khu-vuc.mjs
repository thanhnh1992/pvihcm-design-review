// Loạt bài "Mua bảo hiểm PVI tại <khu vực>" (chủ site giao 15/10/2026, bố cục theo ảnh mẫu chủ site gửi).
// Dữ liệu dùng chung với baohiempvi-vnwebsite: tools/data/khu-vuc.json là bản chép của app/area-articles.json bên đó.
// Bản chuẩn nằm ở baohiempvi-vn.com (có danh mục đơn vị PVI và đặt mua online), nên trang ở đây khai canonical
// về bản chuẩn và tự rơi khỏi sitemap (QUY-TAC-VIET-BAI.md mục 2). Không link ra ngoài, trừ Zalo tư vấn của đơn vị.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { t, esc, SITE } from '../chrome.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const areas = JSON.parse(fs.readFileSync(path.resolve(HERE, '../data/khu-vuc.json'), 'utf8'));
// Bài có sẵn trên pvihcm từ trước (giữ nguyên, không tạo bản thứ hai).
export const SKIP = new Set(['mua-bao-hiem-pvi-binh-duong']);
export const BAN_CHUAN = 'https://www.baohiempvi-vn.com';
export const ZALO_TU_VAN = 'https://zalo.me/0938072236';

const ICON = {
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>',
  chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.4 1.2 4.6 3.1 6.1L4.5 21l3.7-1.9c1.2.4 2.5.6 3.8.6 5.5 0 10-3.8 10-8.5S17.5 3 12 3z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3zm-1.2 14.2-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.4 3.5 2.1-.8 1.3L11 13V6.5h2z"/></svg>',
  doc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm1 15H8v-2h7v2zm1-4H8v-2h8v2zm-2-4V3.5L18.5 8H14z"/></svg>',
  headset: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a9 9 0 0 0-9 9v6a3 3 0 0 0 3 3h2v-8H5v-1a7 7 0 0 1 14 0v1h-3v8h2.9a3 3 0 0 1-2.9 2h-3v2h3a5 5 0 0 0 5-5v-7a9 9 0 0 0-9-9z"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z"/></svg>',
  users: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM9 13c-3.3 0-7 1.7-7 4v3h14v-3c0-2.3-3.7-4-7-4zm8 0c-.5 0-1 0-1.5.1 1.5.9 2.5 2.2 2.5 3.9v3h5v-3c0-2.3-3-4-6-4z"/></svg>',
  list: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h2v2H3V5zm4 0h14v2H7V5zM3 11h2v2H3v-2zm4 0h14v2H7v-2zm-4 6h2v2H3v-2zm4 0h14v2H7v-2z"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.5 14.5-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z"/></svg>',
  building: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V5l8-3v6l8 3v10h-6v-4h-4v4H4zm3-13v2h2V8H7zm0 4v2h2v-2H7zm4-4v2h2V8h-2zm0 4v2h2v-2h-2zm5 1v2h2v-2h-2z"/></svg>',
  arrow: '<i aria-hidden="true">&rarr;</i>',
};

const srcset = (name, w = 1280, h = 853, sizes = '100vw', eager = false, alt = '') =>
  `<img src="/assets/${name}.webp" srcset="/assets/${name}-480.webp 480w, /assets/${name}-800.webp 800w, /assets/${name}.webp ${w}w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>`;

// Sản phẩm có trang riêng trên pvihcm.com (mua, tính phí đều đi về đây).
const PRODUCTS = [
  { href: '/san-pham/bao-hiem-bat-buoc/', ten: 'Bảo hiểm TNDS ô tô bắt buộc', moTa: 'Biểu phí theo loại xe, tính phí tham khảo ngay trên trang.', img: 'section-bat-buoc', alt: 'Hình ảnh minh họa: chuyên viên tư vấn trao đổi với chủ xe bên cạnh ô tô' },
  { href: '/san-pham/bao-hiem-tai-nan/', ten: 'Bảo hiểm tai nạn 24/24', moTa: 'Cho cá nhân, người lao động và doanh nghiệp mua theo danh sách.', img: 'section-tai-nan', alt: 'Hình ảnh minh họa: chuyên viên trao đổi với nhóm người lao động đội mũ bảo hộ' },
  { href: '/san-pham/chay-no-bat-buoc/', ten: 'Bảo hiểm cháy nổ bắt buộc', moTa: 'Nhà xưởng, kho, chung cư, khách sạn: tra cứu và tính phí.', img: 'section-chay-no', alt: 'Hình ảnh minh họa: chuyên viên khảo sát tủ báo cháy trong kho hàng' },
  { href: '/san-pham/hang-hoa-xuat-nhap-khau/', ten: 'Bảo hiểm hàng hóa xuất nhập khẩu', moTa: 'Hàng hóa vận chuyển đường biển, đường hàng không, đường bộ.', img: 'section-hang-hoa', alt: 'Hình ảnh minh họa: hai chuyên viên kiểm tra container tại cảng' },
  { href: '/tin-tuc/bao-hiem-tai-nan-cong-trinh-pvi/', ten: 'Bảo hiểm tai nạn công trình', moTa: 'Người lao động trên công trường xây dựng, lắp đặt.', img: 'cong-truong-thi-cong', alt: 'Hình ảnh minh họa: công trường xây dựng đang thi công có cần cẩu' },
];

const FEATURES = [
  [ICON.shield, 'Đủ nhóm sản phẩm cá nhân và doanh nghiệp'],
  [ICON.clock, 'Báo phí rõ ràng trước khi mua'],
  [ICON.doc, 'Hướng dẫn hồ sơ từng bước'],
  [ICON.headset, 'Đồng hành khi có sự cố, bồi thường'],
];
const REASONS = [
  [ICON.star, 'Thương hiệu Bảo hiểm PVI', 'PVI Thành Đô là đơn vị thành viên của Tổng công ty Bảo hiểm PVI.'],
  [ICON.users, 'Tư vấn đúng sản phẩm', 'Kiểm tra nhu cầu, điều khoản và mức khấu trừ trước khi phát hành.'],
  [ICON.list, 'Báo phí trước, mua sau', 'Nhận báo phí theo hồ sơ thật rồi mới quyết định tham gia.'],
  [ICON.check, 'Hỗ trợ khi có sự cố', 'Hướng dẫn trình báo, hồ sơ và kết nối bộ phận giám định, bồi thường.'],
];
const REMOTE_STEPS = [
  [ICON.chat, 'Nhắn Zalo', 'Nhắn Zalo 0938 072 236, nói rõ sản phẩm cần mua và địa chỉ tài sản hoặc thông tin xe.'],
  [ICON.doc, 'Gửi giấy tờ', 'Chụp đăng ký xe, danh sách người được bảo hiểm hoặc thông tin cơ sở theo hướng dẫn.'],
  [ICON.check, 'Nhận báo phí, xác nhận', 'Xem báo phí và điều khoản, đồng ý thì nhân viên hướng dẫn thanh toán và phát hành.'],
];

const dateVn = (iso) => iso.split('-').reverse().join('/');
const zaloBtn = (label, cls = 'kv-btn kv-btn-red') => `<a class="${cls}" href="${ZALO_TU_VAN}" target="_blank" rel="noopener">${ICON.chat}<span>${label}</span></a>`;

export function renderArea(A, { page, write, units }) {
  const P = `/tin-tuc/${A.slug}/`;
  // Khu vực lớn: dòng có "nhom" (thành phố, huyện cũ) thì gom nhóm trong bảng và chip.
  const groups = [];
  for (const r of A.phuong.rows) {
    const last = groups[groups.length - 1];
    if (last && last.nhom === (r.nhom || '')) last.rows.push(r); else groups.push({ nhom: r.nhom || '', rows: [r] });
  }
  const grouped = groups.some((g) => g.nhom);
  const canonical = BAN_CHUAN + A.path;
  const unit = A.donVi ? units.find((u) => u.name === A.donVi) : null;
  const others = [
    ['Bình Thạnh', '/tin-tuc/mua-bao-hiem-pvi-binh-thanh/'],
    ...areas.filter((x) => x.slug !== A.slug).map((x) => [x.ten, `/tin-tuc/${x.slug}/`]),
  ];
  const main = `
<article class="kv">
<div class="kv-hero"><div class="kv-shell">
<p class="kv-crumb"><a href="/">Trang chủ</a><span aria-hidden="true">›</span><a href="/tin-tuc/">Tin tức</a><span aria-hidden="true">›</span><span>${esc(A.ten)}</span></p>
<div class="kv-hero-grid">
<div class="kv-hero-text">
<p class="kv-eyebrow">PVI Thành Đô · Khu vực ${esc(A.nhan)}</p>
<h1><span>Mua bảo hiểm PVI</span> <em>tại ${esc(A.ten)}</em></h1>
<p class="kv-sub">${t(A.heroSubPvihcm || A.heroSub)}</p>
<ul class="kv-features">${FEATURES.map(([i, s]) => `<li><i>${i}</i><span>${esc(s)}</span></li>`).join('')}</ul>
</div>
<figure class="kv-hero-media">${srcset('tru-so-pvi-thanh-do', 1200, 900, '(max-width:860px) 100vw, 600px', true, 'Tòa nhà 194 Golden Building, 473 Điện Biên Phủ, trụ sở Công ty Bảo hiểm PVI Thành Đô')}
<p class="kv-pin">${ICON.pin}<span>${esc(A.nhan)}<small>${esc(A.thuocVe)}</small></span></p>
<figcaption>Ảnh thực tế: tòa nhà 194 Golden Building, 473 Điện Biên Phủ, nơi đặt văn phòng PVI Thành Đô · Nguồn: PVI Thành Đô.</figcaption></figure>
</div>
</div></div>

<div class="kv-shell"><div class="kv-answer">
<p class="kv-lead">${t(A.lead)}</p>
<p class="kv-byline">Công ty Bảo hiểm PVI Thành Đô · <time datetime="${A.reviewedAt}">Đối chiếu nguồn ngày ${dateVn(A.reviewedAt)}</time> · Tư vấn: <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a></p>
</div></div>

<section class="kv-block" aria-labelledby="san-pham"><div class="kv-shell">
<div class="kv-block-head"><h2 id="san-pham">Các sản phẩm bảo hiểm PVI phổ biến tại ${esc(A.ten)}</h2><a class="kv-head-link" href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Tư vấn theo nhu cầu của bạn ${ICON.arrow}</a></div>
<ul class="kv-products">${PRODUCTS.map((p) => `<li><a href="${p.href}">${srcset(p.img, 1280, 853, '(max-width:640px) 50vw, 230px', false, p.alt)}<span class="kv-product-body"><strong>${esc(p.ten)}</strong><small>${esc(p.moTa)}</small></span></a></li>`).join('')}</ul>
</div></section>

<section class="kv-block" aria-labelledby="nhu-cau"><div class="kv-shell kv-prose">
<h2 id="nhu-cau">${t(A.nhuCau.title)}</h2>
${A.nhuCau.paragraphs.map((x) => `<p>${t(x)}</p>`).join('\n')}
${A.nhuCau.items.length ? `<ul>${A.nhuCau.items.map((x) => `<li>${t(x)}</li>`).join('')}</ul>` : ''}
</div></section>

<section class="kv-block" aria-labelledby="van-phong"><div class="kv-shell">
<h2 id="van-phong"><b>1.</b> Văn phòng Bảo hiểm PVI cho khách hàng ${esc(A.ten)}</h2>
<p class="kv-intro">${t(A.vanPhongIntro)}</p>
<div class="kv-offices">
<div class="kv-office">${srcset('tru-so-pvi-thanh-do', 1200, 900, '(max-width:640px) 100vw, 200px', false, 'Tòa nhà 194 Golden Building, nơi đặt văn phòng PVI Thành Đô')}
<div><h3>Công ty Bảo hiểm PVI Thành Đô</h3>
<p class="kv-line">${ICON.pin}<span>Tầng 12A, Tòa nhà 194 Golden Building, 473 Điện Biên Phủ, Phường Thạnh Mỹ Tây, TP.HCM</span></p>
<p class="kv-line">${ICON.phone}<span>Văn phòng <a href="tel:02835352235">028 3535 2235</a> · Cá nhân, ô tô <a href="tel:0938072236">0938 072 236</a> · Doanh nghiệp, công trình <a href="tel:0918981869">0918 981 869</a></span></p>
<p class="kv-service"><strong>Dịch vụ:</strong> tư vấn và cấp đơn bảo hiểm ô tô, tai nạn 24/24, cháy nổ bắt buộc, hàng hóa, công trình và tài sản doanh nghiệp.</p>
${zaloBtn('Liên hệ tư vấn qua Zalo')}</div></div>
${unit ? `<div class="kv-office"><div class="kv-office-art" aria-hidden="true">${ICON.building}</div>
<div><h3>${esc(unit.name.replace('Bảo hiểm PVI', 'Công ty Bảo hiểm PVI'))}</h3>
<p class="kv-line">${ICON.pin}<span>${esc(unit.address)}</span></p>
<p class="kv-line">${ICON.phone}<span>Điện thoại theo danh bạ PVI: ${esc(unit.phone)}</span></p>
<p class="kv-service">${t(A.donViGhiChu)}</p>
${zaloBtn('Hỏi PVI Thành Đô qua Zalo', 'kv-btn kv-btn-blue')}</div></div>` : ''}
</div>
</div></section>

<section class="kv-block" aria-labelledby="tu-xa"><div class="kv-shell kv-online">
<div>
<h2 id="tu-xa"><b>2.</b> Nhận báo phí từ xa, không cần đến văn phòng</h2>
<p class="kv-intro">Khách hàng ở ${esc(A.ten)} có thể làm việc với PVI Thành Đô hoàn toàn qua Zalo, theo 3 bước:</p>
<ol class="kv-steps">${REMOTE_STEPS.map(([i, h, s]) => `<li><i>${i}</i><strong>${esc(h)}</strong><span>${esc(s)}</span></li>`).join('')}</ol>
<p class="kv-note">Bảo hiểm vật chất xe, cháy nổ, công trình và bảo hiểm doanh nghiệp cần kiểm tra hồ sơ trước khi báo phí; tùy trường hợp có thể cần ảnh hoặc khảo sát thực tế.</p>
</div>
<div class="kv-screen"><p class="kv-screen-bar" aria-hidden="true"><i></i><i></i><i></i></p><p class="kv-screen-title">Tính phí tham khảo trên pvihcm.com</p>
<a class="kv-screen-item" href="/san-pham/bao-hiem-bat-buoc/"><span><strong>TNDS ô tô bắt buộc</strong><small>Biểu phí theo loại xe</small></span>${ICON.arrow}</a>
<a class="kv-screen-item" href="/san-pham/bao-hiem-tai-nan/"><span><strong>Tai nạn 24/24</strong><small>Bảng phí theo nhóm nghề</small></span>${ICON.arrow}</a>
<a class="kv-screen-item" href="/san-pham/chay-no-bat-buoc/"><span><strong>Cháy nổ bắt buộc</strong><small>Tra cứu đối tượng và tính phí</small></span>${ICON.arrow}</a>
</div>
</div></section>

<section class="kv-block" aria-labelledby="vi-sao"><div class="kv-shell">
<h2 id="vi-sao">Vì sao nên mua bảo hiểm PVI tại ${esc(A.ten)}?</h2>
<ul class="kv-reasons">${REASONS.map(([i, h, s]) => `<li><i>${i}</i><span><strong>${esc(h)}</strong>${esc(s)}</span></li>`).join('')}</ul>
</div></section>

<section class="kv-block" aria-labelledby="khu-vuc"><div class="kv-shell kv-area">
<div class="kv-area-col">
<h2 id="khu-vuc">${t(A.phuong.title)}</h2>
<p>${t(A.phuong.answer)}</p>
<ul class="kv-chips">${grouped ? groups.map((g) => `<li>${ICON.pin}${esc(g.nhom)} · ${g.rows.length} đơn vị</li>`).join('') : A.phuong.rows.map((r) => `<li>${ICON.pin}${esc(r.ten)}</li>`).join('')}</ul>
${A.phuong.note ? `<p class="kv-note">${t(A.phuong.note)}</p>` : ''}
</div>
<div class="kv-map"><div class="kv-table"><table><caption>${t(A.phuong.tableCaption)}</caption>
<thead><tr><th scope="col">Đơn vị mới (từ 01/07/2025)</th><th scope="col">Hình thành từ (trước 01/07/2025)</th></tr></thead>
${groups.map((g) => `<tbody>${g.nhom ? `<tr class="kv-group"><th scope="colgroup" colspan="2">${esc(g.nhom)}</th></tr>` : ''}${g.rows.map((r) => `<tr><th scope="row">${esc(r.ten)}</th><td>${t(r.tu)}</td></tr>`).join('')}</tbody>`).join('')}</table></div></div>
<div class="kv-faq" id="cau-hoi"><h2>Câu hỏi thường gặp</h2>
${A.faq.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${t(f.q)}</summary><p>${t(f.a)}</p></details>`).join('')}
</div>
</div></section>

<section class="kv-block" aria-labelledby="khu-vuc-khac"><div class="kv-shell">
<h2 id="khu-vuc-khac" class="kv-h2-sm">Mua bảo hiểm PVI tại khu vực khác</h2>
<ul class="kv-others">${others.map(([ten, href]) => `<li><a href="${href}">${esc(ten)}</a></li>`).join('')}</ul>
<div class="kv-sources"><h2 class="kv-h2-sm">Nguồn tham chiếu</h2>
<ul class="art-sources">${A.sources.filter((s) => !s.url.startsWith('/')).map((s) => `<li><p class="src"><b>${esc(s.label)}</b><span>${esc(s.org || '')}</span></p></li>`).join('')}<li><p class="src"><b>Danh bạ đơn vị thành viên Tổng công ty Bảo hiểm PVI</b><span>Tổng công ty Bảo hiểm PVI</span></p></li></ul>
<p class="kv-disclaimer">Bài viết để tham khảo. Phạm vi, điều kiện và phí chính thức theo quy tắc và hợp đồng Bảo hiểm PVI phát hành. Tên phường, xã theo nghị quyết sắp xếp đơn vị hành chính có hiệu lực từ 01/07/2025.</p>
</div>
</div></section>
</article>

<section class="kv-final" aria-labelledby="lien-he"><div class="kv-shell kv-final-inner">
<div><h2 id="lien-he">Bảo vệ bạn và những điều quan trọng cùng Bảo hiểm PVI</h2><p>Nhắn Zalo để được tư vấn và nhận báo phí cho khách hàng tại ${esc(A.ten)}.</p></div>
<div class="kv-final-btns">${zaloBtn('Zalo 0938 072 236')}<a class="kv-btn kv-btn-ghost" href="tel:0938072236">${ICON.phone}<span>Gọi 0938 072 236</span></a></div>
</div></section>`;

  const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;
  write(`tin-tuc/${A.slug}/index.html`, page({
    path: P,
    canonical,
    title: `${A.title} | PVI Thành Đô`.length > 70 ? A.title : `${A.title} | PVI Thành Đô`,
    description: A.description,
    image: '/assets/tru-so-pvi-thanh-do.webp',
    head: ld({
      '@context': 'https://schema.org', '@type': 'Article', headline: A.title, description: A.description,
      datePublished: A.reviewedAt, dateModified: A.reviewedAt, image: [SITE + '/assets/tru-so-pvi-thanh-do.webp'], mainEntityOfPage: canonical,
      author: { '@type': 'Organization', name: 'Công ty Bảo hiểm PVI Thành Đô' },
      publisher: { '@type': 'Organization', name: 'Công ty Bảo hiểm PVI Thành Đô', logo: { '@type': 'ImageObject', url: SITE + '/assets/pvi-logo.svg' } },
    }) + ld({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: 'Tin tức', item: SITE + '/tin-tuc/' },
        { '@type': 'ListItem', position: 3, name: A.title, item: SITE + P }],
    }) + ld({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: A.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }),
    main,
    extraCss: '<link rel="stylesheet" href="/news.css"><link rel="stylesheet" href="/khu-vuc.css">',
  }));
}
