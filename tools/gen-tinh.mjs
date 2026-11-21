// Sinh nhánh khu vực theo tỉnh: /<tinh>/ (trang tỉnh), /<tinh>/sanpham/ (danh mục) và /<tinh>/<sản phẩm>/
// (trang con dài). Cấu trúc theo /binhduong/ và SO-DO-TRANG.md (chủ site chốt 20/11/2026): trang con dẫn lên
// trang tỉnh, nối ngang với các sản phẩm cùng tỉnh, không gắn sang tỉnh khác. Bình Dương và TP.HCM chủ site tự
// viết, không sinh ở đây. Dữ liệu mỗi tỉnh: tools/data/tinh/<slug>.mjs (chỉ dữ kiện có nguồn).
// Ảnh: dùng /assets/<anh>.webp khi đã có (kèm -480/-800); chưa có thì dùng ảnh minh họa sản phẩm và ghi rõ.
// Chạy: node tools/gen-tinh.mjs [slug ...], rồi node tools/gen-sitemap.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { page, esc, SITE, ZALO, faqJsonLd, articleJsonLd } from './chrome.mjs';
import { formatVnd, tndsVehicleClasses, tndsLimits, tndsReference } from './data/tnds.mjs';
import { sampleCertificate, clauses as vcxClauses } from './data/vcx.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(HERE, '../dist');
const DATA = path.join(HERE, 'data/tinh');
const only = process.argv.slice(2);
const files = fs.readdirSync(DATA).filter((f) => f.endsWith('.mjs') && (!only.length || only.includes(f.replace('.mjs', ''))));

const NHOM = [
  ['xe', 'Bảo hiểm xe ô tô'],
  ['tai-san', 'Nhà xưởng, công trình và hàng hóa'],
  ['con-nguoi', 'Công nhân, sức khỏe và du lịch'],
];

const exists = (name) => fs.existsSync(path.join(DIST, 'assets', name + '.webp'));
// Ảnh địa phương nếu đã có, không thì ảnh minh họa sản phẩm (alt/caption nói thật là ảnh không chụp tại tỉnh).
function img({ anh, anhTam, alt, w = 1280, h = 853, tw = w, th = h, sizes, eager = false }, ten, tinhTen) {
  const local = anh && exists(anh);
  const name = local ? anh : anhTam;
  const [W, H] = local ? [tw, th] : [w, h];
  const a = local ? alt : `Hình ảnh minh họa ${lc(ten)}`;
  const cap = local ? alt + '.' : `Hình ảnh minh họa ${lc(ten)}, không chụp tại ${tinhTen}.`;
  const src = `/assets/${name}`;
  const variants = [480, 800].filter((x) => x < W && exists(`${name}-${x}`)).map((x) => `${src}-${x}.webp ${x}w`);
  const srcset = variants.length ? ` srcset="${variants.join(', ')}, ${src}.webp ${W}w" sizes="${sizes}"` : '';
  return { html: `<img src="${src}.webp"${srcset} width="${W}" height="${H}" alt="${esc(a)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`, cap, src: `${src}.webp` };
}

const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;
const crumbLd = (trail) => ld({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: trail.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + p })) });
const crumbNav = (trail) => `<nav class="bd-crumb" aria-label="Đường dẫn">${trail.map(([name, p], i) => i === trail.length - 1 ? `<span aria-current="page">${esc(name)}</span>` : `<a href="${p}">${esc(name)}</a><span aria-hidden="true">/</span>`).join('')}</nav>`;
// Viết thường chữ đầu, giữ nguyên chữ viết tắt (TNDS, PVI).
const lc = (x) => x.charAt(0).toLowerCase() + x.slice(1);
const words = (arr) => arr.join(' ').split(/\s+/).length;

function feeBlock(kind) {
  if (kind === 'tnds') {
    const u = tndsVehicleClasses.find((c) => c.id === 'passenger').usages;
    const rows = (id, n) => u.find((x) => x.id === id).rows.slice(0, n);
    const table = (cap, list) => `<div class="tn-table" role="region" aria-label="${esc(cap)}" tabindex="0"><table><caption>${esc(cap)}</caption><thead><tr><th scope="col">Loại xe</th><th scope="col">Phí năm chưa VAT</th><th scope="col">Đã gồm VAT 10%</th></tr></thead><tbody>${list.map((r) => `<tr><th scope="row">${esc(r.label)}</th><td>${formatVnd(r.baseFee)}</td><td>${formatVnd(Math.round(r.baseFee * 1.1))}</td></tr>`).join('')}</tbody></table></div>`;
    return table('Xe chở người không kinh doanh vận tải', rows('private', 5)) + table('Xe chở người kinh doanh vận tải', rows('business', 6))
      + `<p class="bd-source">Căn cứ ${esc(tndsReference.legalBasis)}. Mức trách nhiệm: ${tndsLimits.map((l) => `${esc(l.label.toLowerCase())} ${esc(l.value)} ${esc(l.note)}`).join('; ')}.</p>`;
  }
  if (kind === 'vcx') {
    return `<div class="tn-table" role="region" aria-label="Ví dụ phí bảo hiểm vật chất xe" tabindex="0"><table><caption>Ví dụ phí theo giấy chứng nhận PVI cấp tháng 10/2026</caption><tbody>
<tr><th scope="row">Loại xe</th><td>${esc(sampleCertificate.vehicle)}, ${esc(sampleCertificate.use.toLowerCase())}</td></tr>
<tr><th scope="row">Số tiền bảo hiểm</th><td>${esc(sampleCertificate.insuredValue)}</td></tr>
<tr><th scope="row">Điều khoản bổ sung</th><td>${esc(sampleCertificate.clauses)}</td></tr>
<tr><th scope="row">Mức khấu trừ</th><td>${esc(sampleCertificate.deductible)}</td></tr>
<tr><th scope="row">Tổng phí ${esc(sampleCertificate.term)}, gồm VAT</th><td><strong>${esc(sampleCertificate.total)}</strong></td></tr>
</tbody></table></div>
<ul class="tn-clauses">${vcxClauses.map((c) => `<li><strong>${esc(c.code)}</strong> ${esc(c.title)}: ${esc(c.text)}</li>`).join('')}</ul>`;
  }
  if (kind === 'tainan') {
    const goi = [[20, 50000], [50, 125000], [100, 250000], [150, 375000], [200, 500000]];
    const nhom = [['1–19 người', '0%', 250000], ['20–100 người', '20%', 200000], ['101–300 người', '35%', 162500], ['301–500 người', '50%', 125000], ['Từ 501 người', '55%', 112500]];
    return `<div class="tn-table" role="region" aria-label="Phí bảo hiểm tai nạn theo số tiền bảo hiểm" tabindex="0"><table><caption>Phí tham khảo 1 người 1 năm (0,25% số tiền bảo hiểm)</caption><thead><tr><th scope="col">Số tiền bảo hiểm</th><th scope="col">Phí/người/năm</th></tr></thead><tbody>${goi.map(([m, f]) => `<tr><th scope="row">${m} triệu đồng</th><td>${formatVnd(f)}</td></tr>`).join('')}</tbody></table></div>
<div class="tn-table" role="region" aria-label="Giảm phí theo số người" tabindex="0"><table><caption>Giảm phí theo quy mô nhóm, từ 01/01/2026 (gói 100 triệu)</caption><thead><tr><th scope="col">Số người</th><th scope="col">Mức giảm</th><th scope="col">Phí/người/năm</th></tr></thead><tbody>${nhom.map(([n, g, f]) => `<tr><th scope="row">${n}</th><td>${g}</td><td>${formatVnd(f)}</td></tr>`).join('')}</tbody></table></div>`;
  }
  return '';
}

for (const file of files) {
  const { tinh: T } = await import(pathToFileURL(path.join(DATA, file)).href);
  const route = `/${T.slug}/`;
  const catalog = route + 'sanpham/';
  const hubName = `Bảo hiểm tại ${T.ten}`;
  const catName = `Sản phẩm bảo hiểm tại ${T.ten}`;
  const O = T.office;
  const url = (p) => route + p.id + '/';
  const meta = (mins) => `<p class="tn-meta">Cập nhật: <time datetime="${T.ngay}">${T.ngayText}</time> · Biên soạn: Công ty Bảo hiểm PVI Thành Đô${mins ? ` · ${mins} phút đọc` : ''}</p>`;
  const write = (p, html) => { const out = path.join(DIST, p); fs.mkdirSync(out, { recursive: true }); fs.writeFileSync(path.join(out, 'index.html'), html); };
  const css = '<link rel="stylesheet" href="/binhduong/landing.css"><link rel="stylesheet" href="/tinh/tinh.css">';
  const place = { '@type': 'Place', name: `${T.ten} (${T.tenDayDu})`, address: { '@type': 'PostalAddress', addressRegion: T.ten, addressCountry: 'VN' } };
  const officeHtml = (h = 'h2', id = 'dia-chi-pvi') => `<${h} id="${id}">Địa chỉ PVI tại ${esc(T.ten)}</${h}>
<p><strong>${esc(O.ten)}</strong> là ${esc(O.loai.charAt(0).toLowerCase() + O.loai.slice(1))}, đầu mối của Bảo hiểm PVI tại ${esc(T.ten)}.</p>
<p><strong>Địa chỉ:</strong> ${esc(O.diaChi)}. <strong>Điện thoại:</strong> <a class="bd-link" href="tel:${O.tel}">${esc(O.dienThoai)}</a>.</p>
<p>Muốn làm từ xa, gửi hồ sơ qua Zalo và nhận giấy chứng nhận điện tử, liên hệ Công ty Bảo hiểm PVI Thành Đô: <a class="bd-link" href="tel:0938072236">0938 072 236</a>. Hợp đồng bảo hiểm PVI có hiệu lực trên toàn quốc, không phụ thuộc đơn vị cấp.</p>`;
  const card = (p) => {
    const im = img({ anh: p.anh, anhTam: p.anhTam, alt: p.anhAlt, w: p.anhW || 1280, h: p.anhH || 853, sizes: '(max-width:620px) calc(100vw - 40px), (max-width:1248px) 48vw, 588px' }, p.ten, T.ten);
    return `<li class="bd-product"><div class="bd-product-photo">${im.html}</div><div class="bd-product-copy"><h3><a class="bd-product-title" href="${url(p)}">${esc(p.ten)} tại ${esc(T.ten)}</a></h3><p>${esc(p.the)}</p><div class="bd-product-links"><a class="bd-product-primary" href="${url(p)}">Xem phí và hồ sơ <span aria-hidden="true">→</span></a></div></div></li>`;
  };
  const groups = NHOM.map(([id, title]) => ({ id, title, list: T.products.filter((p) => p.nhom === id) })).filter((g) => g.list.length);

  /* ── Trang tỉnh ── */
  const H = T.hero;
  const heroImg = img({ anh: H.anh, anhTam: H.anhTam, alt: H.alt, w: 1200, h: 630, tw: 1200, th: 960, sizes: '(max-width:800px) 92vw, 550px', eager: true }, 'mạng lưới Bảo hiểm PVI', T.ten);
  const hc = T.hanhChinh;
  const hub = `<div class="bd">
<section class="bd-hero"><div class="bd-wrap bd-hero-grid"><div class="bd-intro">
${crumbNav([['Trang chủ', '/'], [hubName, route]])}
<h1>${esc(H.tieuDe)}</h1>
<p class="bd-promise">${esc(H.promise)}</p>
<p>${esc(H.lead)}</p>
<div class="bd-actions"><a class="bd-button" href="${catalog}">Xem sản phẩm bảo hiểm</a><a class="bd-button bd-secondary" href="#nhan-bao-phi">Nhận báo phí</a></div>
<p class="bd-location"><strong>${esc(O.ten)}</strong><br>${esc(O.diaChi)}</p>
</div><figure class="bd-hero-photo">${heroImg.html}<figcaption>${esc(heroImg.cap)}</figcaption></figure></div></section>
<div class="bd-wrap bd-body">
${meta(0)}
<nav class="bd-jumps bd-page-nav" aria-label="Nội dung trang"><a href="#bao-hiem-pvi">PVI tại ${esc(T.ten)}</a><a href="#san-pham">Sản phẩm</a><a href="#khu-cong-nghiep">Khu công nghiệp</a><a href="#phuong-xa">Phường, xã</a><a href="#rui-ro">Rủi ro địa phương</a><a href="#cach-mua">Cách mua</a><a href="#su-co">Khi có sự cố</a><a href="#dia-chi-pvi">Địa chỉ PVI</a></nav>
<section class="bd-section" aria-labelledby="bao-hiem-pvi"><h2 id="bao-hiem-pvi">Bảo hiểm PVI tại ${esc(T.ten)}: ai phụ trách, mua ở đâu</h2>
<div class="bd-local-intro">
<p>Đầu mối của Bảo hiểm PVI tại ${esc(T.ten)} là <strong>${esc(O.ten)}</strong>, văn phòng ở ${esc(O.diaChi)}, điện thoại <a class="bd-link" href="tel:${O.tel}">${esc(O.dienThoai)}</a>. Khách có thể làm việc trực tiếp tại đây hoặc mua từ xa qua Công ty Bảo hiểm PVI Thành Đô bằng Zalo <a class="bd-link" href="tel:0938072236">0938 072 236</a>.</p>
<p>${esc(hc.cu)} ${esc(hc.moi)}</p>
<p>Danh sách phường, xã mới kèm đơn vị cũ hợp thành xem ở mục <a class="bd-link" href="#phuong-xa">phường, xã lớn</a> cuối trang. Giấy tờ còn ghi địa chỉ cũ vẫn dùng được khi mua bảo hiểm.</p>
</div></section>
<section class="bd-section" aria-labelledby="san-pham"><h2 id="san-pham">Sản phẩm bảo hiểm PVI tại ${esc(T.ten)}</h2>
<p class="bd-summary">Chọn sản phẩm để xem phí tham khảo, hồ sơ cần chuẩn bị và lưu ý riêng cho ${esc(T.ten)}.</p>
${groups.map((g) => `<section class="bd-group" aria-labelledby="nhom-${g.id}"><h3 id="nhom-${g.id}">${esc(g.title)}</h3><ul>${g.list.map(card).join('\n')}</ul></section>`).join('\n')}
</section>
<section class="bd-section bd-guide" aria-labelledby="rui-ro"><h2 id="rui-ro">Rủi ro riêng ở ${esc(T.ten)} cần tính khi mua bảo hiểm</h2>
<ul>${T.ruiRo.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
<p class="bd-summary">Vì vậy xe ô tô nên có <a class="bd-link" href="${route}vatchatxeoto/">điều khoản thủy kích</a>, nhà xưởng, kho ở vùng trũng, ven sông hay ven biển nên hỏi thêm rủi ro ngập, giông bão trong <a class="bd-link" href="${route}taisannhaxuong/">bảo hiểm tài sản</a>.</p></section>
<section class="bd-section bd-guide" aria-labelledby="cach-mua"><h2 id="cach-mua">Ba bước mua bảo hiểm tại ${esc(T.ten)}</h2><ol>
<li><strong>Gửi nhu cầu.</strong> Chọn sản phẩm, gửi giấy tờ xe, danh mục tài sản hoặc danh sách người qua Zalo hoặc tại văn phòng.</li>
<li><strong>Đọc báo phí.</strong> Soát phạm vi, quyền lợi, loại trừ và mức khấu trừ. Hỏi lại nếu thông tin chưa khớp giấy tờ.</li>
<li><strong>Xác nhận và nhận chứng nhận.</strong> Đối chiếu tên, địa chỉ, thời hạn trước khi thanh toán theo hướng dẫn trên chứng từ.</li></ol></section>
<section class="bd-section bd-guide" aria-labelledby="dai-ly"><h2 id="dai-ly">Mua qua đại lý ở ${esc(T.ten)} cần kiểm tra gì?</h2>
<ul><li>Chứng từ ghi rõ Bảo hiểm PVI, đơn vị cấp và đúng tên bên mua.</li><li>Đối tượng bảo hiểm, biển số hoặc địa chỉ, thời hạn khớp báo phí đã xác nhận.</li><li>Tài khoản thanh toán khớp hướng dẫn trên hợp đồng. Nghi ngờ thì gọi <a class="bd-link" href="tel:${O.tel}">${esc(O.ten)}</a> để kiểm tra trước khi chuyển tiền.</li></ul></section>
<section class="bd-section bd-quote" aria-labelledby="nhan-bao-phi"><div><h2 id="nhan-bao-phi">Nhận báo phí và hỏi ưu đãi</h2><p>Gửi sản phẩm cần mua, giấy tờ liên quan và ngày cần hiệu lực. Hỏi chương trình ưu đãi đang áp dụng khi nhận báo phí.</p></div>
<div class="bd-actions bd-quote-actions"><a class="bd-button" href="tel:0938072236">Gọi tư vấn 0938 072 236</a><a class="bd-button bd-secondary" href="${esc(ZALO)}">Nhắn Zalo</a></div></section>
<section class="bd-section bd-guide" aria-labelledby="su-co"><h2 id="su-co">Khi có sự cố ở ${esc(T.ten)}</h2>
<p class="bd-summary">Ưu tiên an toàn, gọi cấp cứu hoặc cơ quan chức năng khi cần. Sau đó gọi tổng đài bồi thường PVI <a class="bd-link" href="tel:1900545458">1900 54 54 58</a>, giữ ảnh hiện trường và giấy tờ, không tự sửa chữa hay thanh lý tài sản trước khi được hướng dẫn giám định.</p></section>
<section class="bd-section bd-faq" aria-labelledby="cau-hoi"><h2 id="cau-hoi">Câu hỏi thường gặp</h2>
${T.faqs.map((f) => `<details><summary>${esc(f.question)}</summary><p>${esc(f.answer)}</p></details>`).join('\n')}</section>
<section class="bd-section bd-guide" aria-labelledby="dia-chi-pvi">${officeHtml()}</section>
<section class="bd-section bd-industrial" aria-labelledby="khu-cong-nghiep"><h2 id="khu-cong-nghiep">Bảo hiểm cho doanh nghiệp tại các khu công nghiệp ${esc(T.ten)}</h2>
<p class="bd-summary">Nhà xưởng, kho trong khu công nghiệp thường cần ba lớp bảo hiểm: <a class="bd-link" href="${route}chaynobatbuoc/">cháy nổ bắt buộc</a>, <a class="bd-link" href="${route}taisannhaxuong/">tài sản nhà xưởng</a> cho rủi ro ngoài cháy và <a class="bd-link" href="${route}tainan2424/">tai nạn 24/24 cho công nhân</a>. Phí xác định theo công năng, giá trị tài sản và số người của từng cơ sở.</p>
<ul class="bd-industrial-list">${T.kcn.map((k) => { const K = typeof k === 'string' ? { ten: k } : k; return `<li><strong>Bảo hiểm PVI tại KCN ${esc(K.ten)}</strong>${K.viTri ? `<span>${esc(K.viTri)}</span>` : ''}${K.ghiChu ? `<small>${esc(K.ghiChu)}</small>` : ''}</li>`; }).join('')}</ul></section>
<section class="bd-section bd-industrial bd-wards" aria-labelledby="phuong-xa"><h2 id="phuong-xa">Bảo hiểm PVI tại các phường, xã lớn của ${esc(T.ten)}</h2>
<p class="bd-summary">Tên phường, xã theo sắp xếp từ 01/7/2025, kèm đơn vị cũ hợp thành. Giấy tờ còn ghi địa chỉ cũ vẫn dùng được khi mua bảo hiểm.</p>
<ul class="bd-industrial-list">${T.hanhChinh.viDu.map(([n, tu]) => `<li><strong>${esc(n)}</strong><span>${esc(tu)}</span></li>`).join('')}</ul>
${T.hanhChinh.phuongKhac && T.hanhChinh.phuongKhac.length ? `<p class="bd-summary">Các phường, xã khác trên địa bàn: ${T.hanhChinh.phuongKhac.map(esc).join(', ')}.</p>` : ''}</section>
<section class="bd-section" aria-labelledby="nguon"><h2 id="nguon" class="tn-h-small">Nguồn tham khảo</h2><ul class="tn-sources">${T.nguon.map((n) => `<li>${esc(n)}</li>`).join('')}</ul></section>
</div></div>`;
  const hubTrail = [['Trang chủ', '/'], [hubName, route]];
  write(route, page({
    path: route, title: H.title, description: H.description, image: heroImg.src, bodyClass: 'fire bd-page', extraCss: css, main: hub,
    head: ld({ '@context': 'https://schema.org', '@type': 'WebPage', '@id': SITE + route + '#webpage', url: SITE + route, name: H.title, description: H.description, inLanguage: 'vi-VN', dateModified: T.ngay, about: place,
      mentions: { '@type': 'InsuranceAgency', name: O.ten, telephone: '+84' + O.tel.slice(1), address: { '@type': 'PostalAddress', streetAddress: O.diaChi, addressRegion: T.ten, addressCountry: 'VN' }, parentOrganization: { '@type': 'Organization', name: 'Tổng công ty Bảo hiểm PVI' } } })
      + crumbLd(hubTrail) + faqJsonLd(T.faqs),
  }));

  /* ── Danh mục ── */
  const catTitle = `Biểu phí bảo hiểm PVI tại ${T.ten} mới nhất 2026`;
  const catTrail = [...hubTrail, [catName, catalog]];
  write(catalog, page({
    path: catalog, title: catTitle, description: `Xem ${T.products.length} sản phẩm bảo hiểm PVI tại ${T.ten}: TNDS và vật chất ô tô, cháy nổ, nhà xưởng, công trình, hàng hóa, tai nạn, sức khỏe, du lịch. Phí và hồ sơ từng sản phẩm.`,
    image: heroImg.src, bodyClass: 'fire bd-page', extraCss: css,
    head: ld({ '@context': 'https://schema.org', '@type': 'CollectionPage', url: SITE + catalog, name: catTitle, inLanguage: 'vi-VN', dateModified: T.ngay, about: place,
      hasPart: T.products.map((p) => ({ '@type': 'WebPage', name: `${p.ten} tại ${T.ten}`, url: SITE + url(p) })) }) + crumbLd(catTrail),
    main: `<div class="bd"><div class="bd-wrap bd-body bd-catalog">${crumbNav(catTrail)}<h1>${esc(catTitle)}</h1>${meta(0)}
<p class="bd-summary">Chọn sản phẩm để xem phí tham khảo, hồ sơ cần chuẩn bị và cách nhận báo phí tại ${esc(T.ten)}.</p>
<nav class="bd-jumps" aria-label="Nhóm sản phẩm">${groups.map((g) => `<a href="#${g.id}">${esc(g.title)}</a>`).join('')}</nav>
${groups.map((g) => `<section class="bd-group" aria-labelledby="${g.id}"><h2 id="${g.id}">${esc(g.title)}</h2><ul>${g.list.map(card).join('\n')}</ul></section>`).join('\n')}
<div class="bd-actions"><a class="bd-button" href="${route}#nhan-bao-phi">Nhận báo phí</a><a class="bd-button bd-secondary" href="${route}">Về trang ${esc(hubName)}</a></div></div></div>`,
  }));

  /* ── Trang sản phẩm con ── */
  for (const p of T.products) {
    const u = url(p);
    const trail = [...catTrail, [p.h1, u]];
    const im = img({ anh: p.anh, anhTam: p.anhTam, alt: p.anhAlt, w: p.anhW || 1280, h: p.anhH || 853, sizes: '(max-width:800px) 92vw, 550px', eager: true }, p.ten, T.ten);
    const toc = [...p.sections.map(([h], i) => [`muc-${i + 1}`, h]), ['ho-so', 'Hồ sơ cần chuẩn bị'], ['mua-o-dau', `Mua ${lc(p.ten)} ở đâu tại ${T.ten}`], ['cau-hoi', 'Câu hỏi thường gặp']];
    const mins = Math.max(3, Math.round(words([p.lead, ...p.sections.flatMap((s) => [s[0], ...s[1]]), ...p.faqs.flat(), ...p.hoSo]) / 200));
    const siblings = T.products.filter((x) => x !== p);
    const body = `<div class="bd">
<section class="bd-hero"><div class="bd-wrap bd-hero-grid"><div class="bd-intro">${crumbNav(trail)}
<h1>${esc(p.h1)}</h1>
<p>${esc(p.lead)}</p>
<div class="bd-actions"><a class="bd-button" href="#ho-so">Xem hồ sơ cần gửi</a><a class="bd-button bd-secondary" href="${esc(ZALO)}">Nhắn Zalo báo phí</a></div>
</div><figure class="bd-hero-photo">${im.html}<figcaption>${esc(im.cap)}</figcaption></figure></div></section>
<div class="bd-wrap bd-body tn-article">
${meta(mins)}
<nav class="tn-toc" aria-label="Mục lục"><details open><summary>Mục lục</summary><ol>${toc.map(([id, h]) => `<li><a href="#${id}">${esc(h)}</a></li>`).join('')}</ol></details></nav>
${p.sections.map(([h, paras], i) => `<section class="tn-sec" aria-labelledby="muc-${i + 1}"><h2 id="muc-${i + 1}">${esc(h)}</h2>${paras.map((x) => `<p>${esc(x)}</p>`).join('')}${i === 1 && p.bangPhi ? feeBlock(p.bangPhi) : ''}</section>`).join('\n')}
<section class="tn-sec bd-guide" aria-labelledby="ho-so"><h2 id="ho-so">Hồ sơ cần chuẩn bị</h2><ul>${p.hoSo.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
<p>Xem thêm công cụ và thông tin chung tại trang <a class="bd-link" href="${p.link}">${esc(lc(p.ten))} của PVI Thành Đô</a>.</p></section>
<section class="tn-sec bd-guide" aria-labelledby="mua-o-dau"><h2 id="mua-o-dau">Mua ${esc(lc(p.ten))} ở đâu tại ${esc(T.ten)}</h2>
<p>Tại ${esc(T.ten)}, đầu mối của Bảo hiểm PVI là <strong>${esc(O.ten)}</strong>, ${esc(O.diaChi)}, điện thoại <a class="bd-link" href="tel:${O.tel}">${esc(O.dienThoai)}</a>.</p>
<p>Muốn làm từ xa, gửi hồ sơ qua Zalo cho Công ty Bảo hiểm PVI Thành Đô (<a class="bd-link" href="tel:0938072236">0938 072 236</a>): nhận báo phí, thanh toán và giấy chứng nhận điện tử mà không cần đến văn phòng. Hợp đồng có hiệu lực toàn quốc; khi có tổn thất ở ${esc(T.ten)}, PVI giám định tại chỗ.</p></section>
<section class="tn-sec bd-quote" aria-labelledby="bao-phi"><div><h2 id="bao-phi">Nhận báo phí ${esc(lc(p.ten))} tại ${esc(T.ten)}</h2><p>Gửi hồ sơ ở trên qua Zalo, nhận báo phí và tư vấn điều khoản phù hợp.</p></div>
<div class="bd-actions bd-quote-actions"><a class="bd-button" href="tel:0938072236">Gọi 0938 072 236</a><a class="bd-button bd-secondary" href="${esc(ZALO)}">Nhắn Zalo</a></div></section>
<section class="tn-sec bd-faq" aria-labelledby="cau-hoi"><h2 id="cau-hoi">Câu hỏi thường gặp</h2>
${p.faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}</section>
<nav class="tn-sec tn-siblings" aria-labelledby="cung-tinh"><h2 id="cung-tinh" class="tn-h-small">Sản phẩm bảo hiểm khác tại ${esc(T.ten)}</h2><ul>${siblings.map((x) => `<li><a href="${url(x)}">${esc(x.ten)} tại ${esc(T.ten)}</a></li>`).join('')}</ul>
<p><a class="bd-link" href="${route}">← Về trang ${esc(hubName)}</a> · <a class="bd-link" href="${catalog}">Biểu phí các sản phẩm tại ${esc(T.ten)}</a></p></nav>
<section class="tn-sec" aria-labelledby="nguon"><h2 id="nguon" class="tn-h-small">Nguồn tham khảo</h2><ul class="tn-sources">${[...p.nguon, T.nguon[0]].map((n) => `<li>${esc(n)}</li>`).join('')}</ul></section>
</div></div>`;
    write(u, page({
      path: u, title: p.title, description: p.description, image: im.src, bodyClass: 'fire bd-page', extraCss: css, main: body,
      head: articleJsonLd({ path: u, title: p.title, description: p.description, image: im.src, date: T.ngay, updated: T.ngay })
        + ld({ '@context': 'https://schema.org', '@type': 'Service', name: `${p.ten} tại ${T.ten}`, serviceType: p.ten, url: SITE + u, areaServed: place,
          provider: { '@type': 'InsuranceAgency', name: 'Công ty Bảo hiểm PVI Thành Đô', url: SITE + '/' } })
        + crumbLd(trail) + faqJsonLd(p.faqs.map(([question, answer]) => ({ question, answer }))),
    }));
  }
  console.log(`${T.slug}: 1 trang tỉnh, 1 danh mục, ${T.products.length} trang sản phẩm`);
}
