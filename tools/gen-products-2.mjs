// Bốn trang sản phẩm bổ sung: sức khỏe, công trình, vật chất xe, du lịch quốc tế.
// Nội dung lấy nguyên văn từ dữ liệu đã duyệt của baohiempvi-vn (tools/data/product.mjs).
// Riêng du lịch quốc tế chưa có trong dữ liệu đó, chỉ dùng số liệu PVI công bố trên
// online.pvi.com.vn và ghi rõ nguồn; phần còn thiếu nêu trong CAN-BO-SUNG-DU-LICH.md.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { page, t, esc, faqBlock, faqJsonLd, breadcrumbJsonLd, steps, hotline, ctaRow } from './chrome.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(HERE, '../dist');
const pr = await import(pathToFileURL(path.join(HERE, 'data/product.mjs')).href);
const tn = await import(pathToFileURL(path.join(HERE, 'data/tnds.mjs')).href);
const SISTER = 'https://www.baohiempvi-vn.com';
// pvi.com.vn/products/corporate trong dữ liệu nguồn đang trả 404, chuyển sang đường dẫn còn sống.
const fixUrl = (u) => (u === 'https://www.pvi.com.vn/products/corporate' ? 'https://www.pvi.com.vn/vi/products/business' : u);

const write = (rel, html) => {
  const f = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
  console.log('wrote', rel, html.length);
};

/* Khối dùng lại giữa các trang */
const heroBlock = (o) => `
<section class="fire-hero"><div class="fire-wrap"><div class="fire-hero-copy">
<span class="fire-eyebrow">${t(o.eyebrow)}</span>
<h1>${t(o.h1)}</h1>
<p>${t(o.lead)}</p>
<div class="fire-actions"><a class="fire-btn fire-btn-red" href="${o.cta1[1]}">${t(o.cta1[0])}</a><a class="fire-btn fire-btn-line" href="${o.cta2[1]}">${t(o.cta2[0])}</a></div>
</div><figure class="fire-hero-art"><img src="${o.img}" width="1280" height="853" alt="${esc(o.alt)}" fetchpriority="high"></figure></div></section>`;

const introBlock = (p, caption = 'Phí và phạm vi căn cứ vào') => `
<section class="pd-section"><div class="fire-wrap">
<div class="pd-grid" style="margin-top:0">
<div>${p.intro.map((x, i) => `<p class="fire-lede"${i ? ' style="margin-top:16px"' : ''}>${t(x)}</p>`).join('')}</div>
<div class="pd-card"><table class="pd-table"><caption style="padding:16px 18px 0">${esc(caption)}</caption><tbody>${p.metrics.map((m) => `<tr><th scope="row">${t(m.value)}</th><td>${t(m.label)}</td></tr>`).join('')}</tbody></table></div>
</div>
<h2 class="sr-only">Điểm chính của sản phẩm</h2>
<div class="pd-rows" style="margin-top:44px">${p.benefits.map((b, i) => `<article class="pd-row" style="grid-template-columns:80px minmax(0,1fr)"><div><span class="flag">${String(i + 1).padStart(2, '0')}</span></div><div><h3>${t(b.title)}</h3><p>${t(b.text)}</p></div></article>`).join('')}</div>
</div></section>`;

const plansBlock = (p, id, heading) => `
<section class="fire-compare pd-paper" id="${id}"><div class="fire-wrap">
<h2>${esc(heading)}</h2>
<div class="pd-scroll"><table><thead><tr><th scope="col"><span class="sr-only">Tiêu chí</span></th>${p.plans.map((x) => `<th scope="col">${x.featured ? '<span>Hay dùng nhất</span>' : '<span>&nbsp;</span>'}${t(x.name)}</th>`).join('')}</tr></thead><tbody>
<tr><th scope="row">Phù hợp với</th>${p.plans.map((x) => `<td class="yes">${t(x.forWhom)}</td>`).join('')}</tr>
<tr><th scope="row">Nội dung</th>${p.plans.map((x) => `<td>${x.items.map(t).join('<br>')}</td>`).join('')}</tr>
<tr><th scope="row">Điều kiện</th>${p.plans.map((x) => `<td>${t(x.note)}</td>`).join('')}</tr>
</tbody></table></div>
</div></section>`;

const scopeBlock = (p, id = 'pham-vi') => `
<section class="pd-section" id="${id}"><div class="fire-wrap">
<h2>Phạm vi bảo hiểm và điểm loại trừ</h2>
<div class="pd-two">
<div><h3>Phạm vi được xem xét</h3><ul class="pd-list">${p.coverage.map((c) => `<li>${t(c)}</li>`).join('')}</ul></div>
<div><h3>Không thuộc phạm vi nếu chưa thỏa thuận</h3><ul class="pd-list no">${p.exclusions.map((c) => `<li>${t(c)}</li>`).join('')}</ul></div>
</div>
</div></section>`;

const docsBlock = (p, id = 'chung-tu', title = 'Hồ sơ cần gửi và các bước') => `
<section class="fire-docs pd-paper" id="${id}"><div class="fire-wrap">
<h2>${esc(title)}</h2>
<div class="fire-docs-grid">
<div><h3>Hồ sơ</h3><ol>${p.documents.map((d) => `<li><b>${t(d)}</b></li>`).join('')}</ol></div>
<div><h3>Các bước</h3><ol>${p.buySteps.map((s) => `<li><b>${t(s.title)}</b><span>${t(s.text)}</span></li>`).join('')}</ol></div>
</div>
${ctaRow()}
</div></section>`;

const linksBlock = (p, id = 'tai-lieu', title = 'Tài liệu và nguồn chính thức') => {
  const items = p.attachments.filter((a) => a.href).map((a) => {
    const href = a.href.startsWith('/') ? SISTER + a.href : a.href;
    return `<li><a href="${href}" target="_blank" rel="noopener"><span class="cat">${t(a.meta || a.type)}</span><div><b>${t(a.title)}</b><span class="d">${t(a.description)}</span></div><i aria-hidden="true">&#8599;</i></a></li>`;
  }).join('');
  if (!items) return '';
  return `
<section class="fire-news" id="${id}" style="background:#fff"><div class="fire-wrap">
<h2>${esc(title)}</h2>
<ul class="pd-docs">${items}</ul>
</div></section>`;
};

const claimBlock = (p, eyebrow, heading) => `
<section class="fire-claim pd-paper" id="boi-thuong"><div class="fire-wrap">
<span class="fire-eyebrow">${esc(eyebrow)}</span>
<h2>${esc(heading)}</h2>
${steps(p.claimSteps)}
${hotline}
<p class="fire-note"><b>Nguồn:</b> <a href="${fixUrl(p.sourceUrl)}" target="_blank" rel="noopener" style="color:var(--blue);text-decoration:underline">${t(p.sourceLabel)}</a>. Phạm vi, điều khoản, mức khấu trừ và phí được chuyên viên xác nhận theo từng hồ sơ.</p>
</div></section>`;

const build = (o) => {
  write(o.rel, page({
    path: o.path, title: o.title, description: o.desc, image: o.img,
    head: (o.faqs ? faqJsonLd(o.faqs) : '') + breadcrumbJsonLd(o.path, o.crumb),
    main: o.main,
  }));
};

/* ═════════════ 1. CHĂM SÓC SỨC KHỎE (PVI Care) ═════════════ */
{
  const p = pr.getProduct('cham-soc-suc-khoe');
  const P = '/san-pham/bao-hiem-suc-khoe/';
  const main = heroBlock({
    eyebrow: `${p.category} · ${p.tag}`,
    h1: 'Bảo hiểm chăm sóc sức khỏe PVI Care',
    lead: p.summary,
    cta1: ['Gọi tư vấn 0938 072 236', 'tel:0938072236'],
    cta2: ['Xem chương trình', '#phuong-an'],
    img: '/assets/hero-suc-khoe.webp',
    alt: 'Bác sĩ trao đổi với khách hàng tại quầy tiếp nhận bệnh viện',
  })
    + introBlock(p, 'Chương trình căn cứ vào')
    + plansBlock(p, 'phuong-an', 'Ba nhóm chương trình, chọn theo nhu cầu điều trị')
    + scopeBlock(p)
    + docsBlock(p, 'chung-tu', 'Thông tin cần gửi và các bước tham gia')
    + linksBlock(p, 'tai-lieu', 'Bảo lãnh viện phí và tài liệu chính thức')
    + claimBlock(p, 'Khi cần khám chữa bệnh', 'Ba bước khi sử dụng quyền lợi')
    + faqBlock(p.faqs);
  build({
    rel: 'san-pham/bao-hiem-suc-khoe/index.html', path: P, main, faqs: p.faqs,
    crumb: 'Bảo hiểm chăm sóc sức khỏe', img: '/assets/hero-suc-khoe.webp',
    title: 'Bảo hiểm sức khỏe PVI Care | PVI Thành Đô',
    desc: 'Bảo hiểm chăm sóc sức khỏe PVI Care: chương trình nội trú và ngoại trú theo độ tuổi, bảo lãnh viện phí tại 69 cơ sở ở TP.HCM, hồ sơ và cách tham gia.',
  });
}

/* ═════════════ 2. CÔNG TRÌNH VÀ LẮP ĐẶT ═════════════ */
{
  const p = pr.getProduct('cong-trinh-lap-dat');
  const P = '/san-pham/bao-hiem-cong-trinh/';
  const main = heroBlock({
    eyebrow: `${p.category} · ${p.tag}`,
    h1: 'Bảo hiểm công trình và lắp đặt',
    lead: p.summary,
    cta1: ['Gửi hồ sơ công trình', '#chung-tu'],
    cta2: ['Xem ba phương án', '#phuong-an'],
    img: '/assets/hero-cong-trinh.webp',
    alt: 'Kỹ sư và nhà thầu kiểm tra tiến độ tại công trường xây dựng',
  })
    + introBlock(p, 'Phương án căn cứ vào')
    + plansBlock(p, 'phuong-an', 'Ba phương án theo tính chất công trình')
    + scopeBlock(p)
    + docsBlock(p, 'chung-tu', 'Hồ sơ công trình cần gửi và các bước')
    + linksBlock(p)
    + claimBlock(p, 'Khi công trình có sự cố', 'Ba việc cần làm ngay')
    + faqBlock(p.faqs);
  build({
    rel: 'san-pham/bao-hiem-cong-trinh/index.html', path: P, main, faqs: p.faqs,
    crumb: 'Bảo hiểm công trình và lắp đặt', img: '/assets/hero-cong-trinh.webp',
    title: 'Bảo hiểm công trình và lắp đặt | PVI Thành Đô',
    desc: 'Bảo hiểm mọi rủi ro xây dựng và lắp đặt của Bảo hiểm PVI: phương án theo hợp đồng, dự toán và tiến độ thi công; hồ sơ cần gửi và quy trình bồi thường.',
  });
}

/* ═════════════ 3. VẬT CHẤT XE Ô TÔ ═════════════ */
{
  const p = pr.getProduct('bao-hiem-o-to');
  const v = tn.vehicleDamageFacts;
  const P = '/san-pham/bao-hiem-vat-chat-xe/';
  // Chỉ lấy phần vật chất xe; phần TNDS bắt buộc đã có trang riêng.
  const plansVc = p.plans.filter((x) => x.name !== 'TNDS bắt buộc');
  const main = heroBlock({
    eyebrow: `${p.category} · Vật chất xe ô tô`,
    h1: 'Bảo hiểm vật chất xe ô tô',
    lead: v.summary,
    cta1: ['Gửi thông tin xe', '#chung-tu'],
    cta2: ['Khác gì TNDS bắt buộc', '#khac-tnds'],
    img: '/assets/tu-van-xe-o-to.webp',
    alt: 'Chuyên viên trao đổi với chủ xe về phương án bảo hiểm vật chất xe',
  }) + `
<section class="pd-section"><div class="fire-wrap">
<div class="pd-grid" style="margin-top:0">
<div><p class="fire-lede">Bảo hiểm vật chất xe là phần tự nguyện, nằm ngoài TNDS bắt buộc. Xe hỏng do va chạm, cháy nổ, thiên tai hay mất cắp bộ phận đều thuộc nhóm nhu cầu này, tùy phạm vi và điều khoản được xác nhận trên hợp đồng.</p><p class="fire-lede" style="margin-top:16px">Phí và điều kiện không cố định như TNDS bắt buộc. Chuyên viên cần xem hồ sơ xe trước khi báo giá, vì các yếu tố sau quyết định phương án.</p></div>
<div class="pd-card"><table class="pd-table"><caption style="padding:16px 18px 0">Phí và phạm vi căn cứ vào</caption><tbody>${v.considerations.map((c) => `<tr><td>${t(c)}</td></tr>`).join('')}</tbody></table></div>
</div>
<h2 class="sr-only">Điểm chính của sản phẩm</h2>
<div class="pd-rows" style="margin-top:44px">${p.benefits.map((b, i) => `<article class="pd-row" style="grid-template-columns:80px minmax(0,1fr)"><div><span class="flag">${String(i + 1).padStart(2, '0')}</span></div><div><h3>${t(b.title)}</h3><p>${t(b.text)}</p></div></article>`).join('')}</div>
</div></section>

<section class="fire-compare pd-paper" id="khac-tnds"><div class="fire-wrap">
<h2>Vật chất xe khác bảo hiểm bắt buộc ở chỗ nào</h2>
<p class="fire-lede" style="margin-top:12px"><b>${t(tn.tndsFaqs[2].question)}</b> ${t(tn.tndsFaqs[2].answer)}</p>
<div class="pd-scroll"><table><thead><tr><th scope="col"><span class="sr-only">Tiêu chí</span></th><th scope="col"><span>Bắt buộc</span>TNDS chủ xe</th><th scope="col"><span>Tự nguyện</span>${t(v.title)}</th></tr></thead><tbody>
<tr><th scope="row">Bảo vệ</th><td>${t(p.coverage[0])}</td><td class="yes">${t(p.coverage[1])}</td></tr>
<tr><th scope="row">Căn cứ phí</th><td>${t(tn.tndsReference.legalBasis)}, theo loại xe và mục đích sử dụng</td><td>${v.considerations.map(t).join('<br>')}</td></tr>
<tr><th scope="row">Tính phí trên web</th><td class="yes"><a href="/san-pham/bao-hiem-bat-buoc/#tinh-phi" style="color:var(--blue);text-decoration:underline">Có, xem biểu phí TNDS</a></td><td>${t(p.faqs[1].answer)}</td></tr>
</tbody></table></div>
</div></section>
`
    + plansBlock({ ...p, plans: plansVc }, 'phuong-an', 'Hai hướng tham gia cho xe của bạn')
    + scopeBlock(p)
    + docsBlock(p, 'chung-tu', 'Hồ sơ xe cần gửi và các bước mua')
    + linksBlock(p, 'tai-lieu', 'Quy tắc, mẫu biểu và gara liên kết')
    + claimBlock(p, 'Khi xe có tổn thất', 'Ba bước xử lý bồi thường')
    + faqBlock(p.faqs);
  build({
    rel: 'san-pham/bao-hiem-vat-chat-xe/index.html', path: P, main, faqs: p.faqs,
    crumb: 'Bảo hiểm vật chất xe ô tô', img: '/assets/tu-van-xe-o-to.webp',
    title: 'Bảo hiểm vật chất xe ô tô PVI | PVI Thành Đô',
    desc: 'Bảo hiểm vật chất xe ô tô của Bảo hiểm PVI: phạm vi, điều khoản bổ sung, hồ sơ xe cần gửi, gara liên kết và quy trình bồi thường. Khác gì TNDS bắt buộc.',
  });
}


/* ═════════════ 4. DU LỊCH QUỐC TẾ ═════════════
   Quyền lợi, loại trừ và biểu phí lấy nguyên văn từ tài liệu chính thức của
   Tổng công ty Bảo hiểm PVI: Quy tắc bảo hiểm du lịch quốc tế và Bảng quyền lợi
   ban hành kèm Quyết định số 491/QĐ-PVIBH ngày 27/6/2025, cùng biểu phí đang
   niêm yết trên kênh PVI Online. Không tự đặt ra con số nào. */
{
  const P = '/san-pham/bao-hiem-du-lich/';
  const SRC = 'https://online.pvi.com.vn/bao-hiem-du-lich-quoc-te';
  const PDF = 'https://gw.pvi.digital/public/contract/';
  const QD = 'Quyết định số 491/QĐ-PVIBH ngày 27/6/2025';

  // Sáu chương trình trong Bảng quyền lợi chính thức. CT4, CT5, CT6 chính là ba gói
  // Bạc, Vàng, Kim cương đang bán trên PVI Online (mã DLQTCT4, DLQTCT5, DLQTCT6).
  const CT = ['1', '2', '3', '4', '5', '6'];
  const SOLD = { 3: 'Bạc', 4: 'Vàng', 5: 'Kim cương' };

  const main1 = [
    ['Tai nạn cá nhân', ['300 triệu', '500 triệu', '800 triệu', '1 tỷ', '2 tỷ', '3 tỷ'],
      'Người được bảo hiểm trên 75 tuổi: giới hạn 50% số tiền bảo hiểm của quyền lợi này.'],
    ['Tử vong do nguyên nhân khác ngoài tai nạn', ['30 triệu', '50 triệu', '80 triệu', '100 triệu', '200 triệu', '300 triệu'],
      'Không áp dụng với người được bảo hiểm trên 75 tuổi.'],
    ['Chi phí y tế', ['300 triệu', '500 triệu', '800 triệu', '1 tỷ', '2 tỷ', '3 tỷ'],
      'Người được bảo hiểm trên 75 tuổi: giới hạn 50% số tiền bảo hiểm của quyền lợi này.'],
    ['Trong đó, chi phí điều trị tiếp theo tại Việt Nam', ['15 triệu', '25 triệu', '40 triệu', '50 triệu', '100 triệu', '150 triệu'],
      'Nằm trong giới hạn của quyền lợi chi phí y tế, không cộng thêm.'],
    ['Trợ cấp nằm viện tại nước ngoài, mỗi ngày', ['300.000đ', '500.000đ', '800.000đ', '1 triệu', '2 triệu', '3 triệu'],
      'Tối đa 15 ngày. Người được bảo hiểm trên 75 tuổi: giới hạn 50%.'],
    ['Vận chuyển y tế cấp cứu', ['300 triệu', '500 triệu', '800 triệu', '1 tỷ', '2 tỷ', '3 tỷ'],
      'Người được bảo hiểm trên 75 tuổi: giới hạn 50% số tiền bảo hiểm của quyền lợi này.'],
    ['Hồi hương', ['300 triệu', '500 triệu', '800 triệu', '1 tỷ', '2 tỷ', '3 tỷ'],
      'Người được bảo hiểm trên 75 tuổi: giới hạn 50% số tiền bảo hiểm của quyền lợi này.'],
    ['Chi phí mai táng và hồi hương thi hài', ['60 triệu', '100 triệu', '160 triệu', '200 triệu', '400 triệu', '600 triệu'],
      'Người được bảo hiểm trên 75 tuổi: giới hạn 50% số tiền bảo hiểm của quyền lợi này.'],
    ['Thăm bệnh nhân ở nước ngoài', ['15 triệu', '25 triệu', '40 triệu', '50 triệu', '100 triệu', '150 triệu'], ''],
    ['Đưa trẻ em hồi hương', ['15 triệu', '25 triệu', '40 triệu', '50 triệu', '100 triệu', '150 triệu'], ''],
  ];

  const main2 = [
    ['Hủy chuyến đi, rút ngắn chuyến đi', ['30 triệu', '50 triệu', '80 triệu', '100 triệu', '200 triệu', '300 triệu'],
      'Nếu vận chuyển bằng máy bay thì chỉ chi trả đến giá trị vé máy bay ban đầu, tối đa đến số tiền bảo hiểm của quyền lợi này. Rút ngắn chuyến đi không áp dụng cho chuyến một chiều.'],
    ['Chuyến đi bị trì hoãn', ['6 triệu', '8 triệu', '10 triệu', '10 triệu', '15 triệu', '20 triệu'],
      'Chương trình 1 đến 3: 2 triệu đồng cho mỗi 8 giờ liên tục bị trì hoãn. Chương trình 4 đến 6: 2,5 triệu đồng cho mỗi 8 giờ.'],
    ['Lỡ nối chuyến', ['6 triệu', '8 triệu', '10 triệu', '10 triệu', '15 triệu', '20 triệu'],
      'Cùng một sự việc chỉ bồi thường theo quyền lợi trì hoãn hoặc quyền lợi lỡ nối chuyến, không cả hai.'],
    ['Nhận hành lý chậm', ['4,5 triệu', '6 triệu', '7,5 triệu', '10 triệu', '12 triệu', '14 triệu'],
      'Chương trình 1 đến 3: 1,5 triệu đồng cho mỗi 8 giờ liên tục đến chậm. Chương trình 4 đến 6: 2 triệu đồng cho mỗi 8 giờ.'],
    ['Hành lý và vật dụng cá nhân mang theo', ['15 triệu', '25 triệu', '40 triệu', '50 triệu', '100 triệu', '150 triệu'],
      '3 triệu đồng cho mỗi món đồ. Không yêu cầu cùng lúc quyền lợi này và quyền lợi nhận hành lý chậm cho cùng một sự kiện.'],
    ['Mất giấy tờ tùy thân', ['15 triệu', '25 triệu', '40 triệu', '50 triệu', '100 triệu', '150 triệu'],
      'Phải trình báo công an hoặc cơ quan có thẩm quyền trong vòng 24 giờ và có biên bản chính thức.'],
    ['Trách nhiệm cá nhân', ['150 triệu', '250 triệu', '400 triệu', '500 triệu', '1 tỷ', '1,5 tỷ'], ''],
  ];

  // Biểu phí lấy từ dữ liệu sản phẩm của PVI Online. Hai bộ: bộ chung không phân
  // vùng, và bộ chia theo vùng lãnh thổ kèm phí riêng của phạm vi bảo hiểm bổ sung.
  const bands = ['1 đến 3 ngày', '4 đến 6 ngày', '7 đến 10 ngày', '11 đến 14 ngày', '15 đến 18 ngày', '19 đến 22 ngày', '23 đến 27 ngày', '28 đến 31 ngày'];
  const GOI = ['Bạc', 'Vàng', 'Kim cương'];
  const fees = {
    'Bạc': [200000, 260000, 320000, 420000, 520000, 560000, 600000, 660000, 120000],
    'Vàng': [240000, 300000, 360000, 480000, 620000, 720000, 820000, 940000, 160000],
    'Kim cương': [340000, 420000, 560000, 740000, 880000, 1000000, 1100000, 1200000, 220000],
  };
  // Mỗi ô: [phí phạm vi chính, phí phạm vi bổ sung]
  const regions = [
    ['dna', 'Đông Nam Á', {
      'Bạc': [[100000, 17600], [119000, 20000], [182000, 28000], [245000, 35200], [278000, 40000], [317000, 44800], [341000, 47200], [364000, 50400], [65000, 5600]],
      'Vàng': [[168000, 26400], [198000, 30400], [303000, 44000], [408000, 56800], [464000, 64000], [528000, 72000], [568000, 76800], [605000, 81600], [108000, 5600]],
      'Kim cương': [[200000, 31200], [237000, 36000], [364000, 51200], [489000, 67200], [556000, 76000], [633000, 85600], [681000, 91200], [726000, 96800], [130000, 5600]],
    }],
    ['ca', 'Châu Á', {
      'Bạc': [[113000, 19800], [134000, 22500], [205000, 31500], [276000, 39600], [313000, 45000], [357000, 50400], [384000, 53100], [409000, 56700], [73000, 6300]],
      'Vàng': [[189000, 29700], [223000, 34200], [341000, 49500], [459000, 63900], [522000, 72000], [594000, 81000], [639000, 86400], [681000, 91800], [122000, 6300]],
      'Kim cương': [[225000, 35100], [267000, 40500], [409000, 57600], [550000, 75600], [625000, 85500], [712000, 96300], [766000, 102600], [817000, 108900], [146000, 6300]],
    }],
    ['tc', 'Toàn cầu', {
      'Bạc': [[125000, 22000], [148000, 25000], [227000, 35000], [306000, 44000], [347000, 50000], [396000, 56000], [426000, 59000], [454000, 63000], [81000, 7000]],
      'Vàng': [[209000, 33000], [247000, 38000], [378000, 55000], [509000, 71000], [579000, 80000], [659000, 90000], [710000, 96000], [756000, 102000], [135000, 7000]],
      'Kim cương': [[250000, 39000], [296000, 45000], [454000, 64000], [611000, 84000], [694000, 95000], [791000, 107000], [851000, 114000], [907000, 121000], [162000, 7000]],
    }],
  ];
  const vnd = (n) => n.toLocaleString('vi-VN') + 'đ';
  const goiHead = (lbl) => `<thead><tr><th scope="col">${esc(lbl)}</th>${GOI.map((k, i) => `<th scope="col" class="num">${i === 2 ? '<span>Cao nhất</span>' : '<span>&nbsp;</span>'}${k}</th>`).join('')}</tr></thead>`;

  const exclusions = [
    'Sự kiện xảy ra ngoài phạm vi lịch trình ghi trên hợp đồng hoặc giấy chứng nhận bảo hiểm.',
    'Đi nước ngoài trái với lời khuyên của bác sĩ, hoặc đi vì mục đích chữa bệnh, chăm sóc y tế.',
    'Tử vong, ốm đau, bệnh tật, thương tật do hành vi cố ý của người được bảo hiểm hoặc người thụ hưởng.',
    'Tai nạn hoặc bệnh tật có nguyên nhân từ rượu, bia, ma túy, chất kích thích, trừ thuốc hoặc chất gây mê theo chỉ dẫn của bác sĩ.',
    'Vi phạm pháp luật, vi phạm luật giao thông, vi phạm quy định của quốc gia nơi đến.',
    'Khám và điều trị tại cơ sở không có giấy phép hoạt động hợp pháp.',
    'Điều trị hoặc dùng thuốc không theo chỉ định của cơ sở y tế, bác sĩ.',
    'Tham gia đánh nhau, trừ khi được xác định là cứu người, bảo vệ tài sản hoặc tự vệ.',
    'Hậu quả của động đất, núi lửa, sóng thần, nhiễm phóng xạ, hạt nhân, hóa chất độc hay vụ nổ do vũ khí.',
    'Hậu quả của chiến tranh, nội chiến, đình công, gây rối, bạo động, tấn công và khủng bố theo công bố của cơ quan có thẩm quyền.',
    'Dịch bệnh, trừ khi tham gia điều khoản mở rộng "Bảo hiểm dịch bệnh".',
    'Thể thao chuyên nghiệp và thể thao mạo hiểm, trừ khi tham gia điều khoản mở rộng "Bảo hiểm các hoạt động rủi ro cao".',
    'Ngộ độc thức ăn, đồ uống, hít phải hơi độc, khí độc, chất độc, trừ khi tham gia điều khoản mở rộng "Bảo hiểm ngộ độc".',
    'Bệnh lây truyền qua đường tình dục, HIV, AIDS và hậu quả liên quan.',
    'Tình trạng y tế có trước, bệnh hoặc dị tật bẩm sinh. Hợp đồng bảo hiểm năm áp dụng loại trừ này trong 12 tháng đầu.',
    'Bệnh huyết áp, tim mạch, ung thư, u các loại, bệnh hệ thống tạo máu, lọc máu, chạy thận nhân tạo, đái tháo đường, Parkinson, dù xảy ra trước hay trong thời hạn bảo hiểm.',
    'Bệnh tâm thần, rối loạn tâm thần và hành vi, suy nhược không có nguyên nhân bệnh lý, hội chứng căng thẳng, bệnh Alzheimer.',
    'Điều trị răng, thai sản, sinh đẻ, trừ điều trị cấp cứu do tai nạn trong vòng 24 giờ kể từ khi xảy ra tai nạn.',
    'Người được bảo hiểm là thành viên phi hành đoàn hoặc lực lượng vũ trang đang thi hành nhiệm vụ.',
  ];

  const faqs = [
    { question: 'Ai được tham gia bảo hiểm du lịch quốc tế của PVI?', answer: 'Công dân Việt Nam hoặc người nước ngoài cư trú hợp pháp tại Việt Nam, từ 07 ngày tuổi trở lên. Trẻ em dưới 12 tuổi phải đi cùng người từ 18 tuổi trở lên được ủy quyền hợp pháp và được bảo hiểm trong cùng một hợp đồng hoặc giấy chứng nhận bảo hiểm.' },
    { question: 'Phí bảo hiểm du lịch quốc tế bao nhiêu một người?', answer: 'Phí tính theo số ngày của hành trình và chương trình chọn. Theo biểu phí chung của PVI, chuyến 1 đến 3 ngày là 200.000 đồng với chương trình Bạc, 240.000 đồng với chương trình Vàng và 340.000 đồng với chương trình Kim cương. Theo biểu phí chia vùng lãnh thổ thì chuyến đi Đông Nam Á rẻ hơn, 1 đến 3 ngày gói Bạc là 100.000 đồng. Phạm vi bảo hiểm bổ sung tính phí riêng, chẳng hạn 17.600 đồng cho gói Bạc đi Đông Nam Á 1 đến 3 ngày.' },
    { question: 'Số tiền bảo hiểm cao nhất là bao nhiêu?', answer: 'Chương trình Kim cương có số tiền bảo hiểm tai nạn cá nhân và chi phí y tế 3 tỷ đồng mỗi quyền lợi. Bảng quyền lợi chính thức của PVI có sáu chương trình, từ 300 triệu đến 3 tỷ đồng, ba chương trình cao nhất tương ứng với Bạc, Vàng và Kim cương bán trực tuyến.' },
    { question: 'Người trên 75 tuổi có mua được không?', answer: 'Mua được, nhưng một số quyền lợi bị giới hạn. Quyền lợi tai nạn cá nhân, chi phí y tế, vận chuyển y tế cấp cứu, hồi hương, mai táng và hồi hương thi hài chỉ áp dụng 50% số tiền bảo hiểm. Quyền lợi tử vong do nguyên nhân khác ngoài tai nạn không áp dụng.' },
    { question: 'Quyền lợi hủy chuyến đi có hiệu lực từ khi nào?', answer: 'Quyền lợi hủy chuyến đi bắt đầu có hiệu lực vào ngày cấp giấy chứng nhận bảo hiểm hoặc ngày thứ 60 trước ngày khởi hành đầu tiên, tùy thời điểm nào xảy ra sau. Các quyền lợi bổ sung còn lại có hiệu lực từ khi hoàn tất thủ tục xuất cảnh tại Việt Nam trong ngày khởi hành đầu tiên.' },
    { question: 'Bao lâu thì nhận được tiền bồi thường?', answer: 'Theo quy tắc bảo hiểm, thông báo sự kiện bảo hiểm trong vòng 30 ngày kể từ ngày xảy ra, và Bảo hiểm PVI chi trả trong vòng 15 ngày làm việc kể từ khi nhận đủ hồ sơ hợp lệ.' },
  ];

  const ctRow = (rows) => rows.map(([label, vals, note]) => `<tr><th scope="row">${t(label)}${note ? `<span class="dl-note">${t(note)}</span>` : ''}</th>${vals.map((v) => `<td class="num">${t(v)}</td>`).join('')}</tr>`).join('');
  const ctHead = `<thead><tr><th scope="col">Quyền lợi, số tiền bảo hiểm một người</th>${CT.map((n, i) => `<th scope="col" class="num">${SOLD[i] ? `<span>${SOLD[i]}</span>` : '<span>&nbsp;</span>'}Chương trình ${n}</th>`).join('')}</tr></thead>`;

  const main = heroBlock({
    eyebrow: 'Cá nhân · Du lịch quốc tế',
    h1: 'Bảo hiểm du lịch quốc tế',
    lead: 'Chi phí y tế ở nước ngoài, tai nạn cá nhân, hủy chuyến, hành lý và giấy tờ tùy thân, số tiền bảo hiểm đến 3 tỷ đồng một người. Phí từ 100.000 đồng cho chuyến 1 đến 3 ngày trong Đông Nam Á. Quyền lợi theo Bảng quyền lợi ban hành kèm ' + QD + '.',
    cta1: ['Gọi báo phí 0938 072 236', 'tel:0938072236'],
    cta2: ['Xem bảng quyền lợi', '#quyen-loi'],
    img: '/assets/hero-du-lich.webp',
    alt: 'Khách du lịch kéo vali tại sảnh làm thủ tục sân bay',
  }) + `
<section class="pd-section"><div class="fire-wrap">
<div class="pd-grid" style="margin-top:0">
<div>
<p class="fire-lede">Bảo hiểm du lịch quốc tế dành cho chuyến đi nước ngoài và thường được yêu cầu kèm trong hồ sơ xin thị thực. Sản phẩm xử lý phần chi phí phát sinh ngoài dự tính của chuyến đi: khám chữa bệnh ở nước ngoài, tai nạn trong hành trình, cùng các sự cố làm gián đoạn lịch trình như hủy chuyến, trì hoãn, chậm hoặc mất hành lý và mất giấy tờ tùy thân.</p>
<p class="fire-lede" style="margin-top:16px">Bảng quyền lợi chính thức của Bảo hiểm PVI có sáu chương trình. Ba chương trình cao nhất, tương ứng số tiền bảo hiểm 1 tỷ, 2 tỷ và 3 tỷ đồng, chính là ba gói Bạc, Vàng và Kim cương đang bán trên kênh PVI Online. Toàn bộ con số trên trang này lấy từ tài liệu PVI phát hành, không phải ước tính.</p>
</div>
<div class="pd-card"><table class="pd-table"><caption style="padding:16px 18px 0">Theo tài liệu chính thức</caption><tbody>
<tr><th scope="row">Số tiền bảo hiểm</th><td class="num strong">Đến 3 tỷ</td><td>một người</td></tr>
<tr><th scope="row">Phí thấp nhất</th><td class="num strong">100.000đ</td><td>đi Đông Nam Á</td></tr>
<tr><th scope="row">Độ tuổi</th><td colspan="2">Từ 07 ngày tuổi trở lên</td></tr>
<tr><th scope="row">Thông báo sự kiện</th><td colspan="2">Trong vòng 30 ngày</td></tr>
<tr><th scope="row">Thời hạn chi trả</th><td colspan="2">15 ngày làm việc kể từ khi đủ hồ sơ</td></tr>
</tbody></table>
<p class="fire-note">Nguồn: Quy tắc và Bảng quyền lợi bảo hiểm du lịch quốc tế ban hành kèm ${QD}.</p>
</div>
</div>
</div></section>

<section class="fire-compare pd-paper" id="quyen-loi"><div class="fire-wrap">
<h2>Bảng quyền lợi, phạm vi bảo hiểm chính</h2>
<p class="fire-lede" style="max-width:76ch">Sáu chương trình theo Bảng quyền lợi ban hành kèm ${QD}. Cột Bạc, Vàng, Kim cương là tên gọi của ba chương trình này trên kênh bán trực tuyến của PVI.</p>
<div class="pd-scroll"><table class="dl-table" style="min-width:920px">${ctHead}<tbody>${ctRow(main1)}</tbody></table></div>
</div></section>

<section class="pd-section" id="bo-sung"><div class="fire-wrap">
<h2>Phạm vi bảo hiểm bổ sung</h2>
<p class="fire-lede" style="max-width:76ch">Phần này đi kèm phạm vi bảo hiểm chính và có phí riêng. Đây là nhóm quyền lợi xử lý sự cố lịch trình và hành lý, nhóm hay dùng nhất trong thực tế.</p>
<div class="pd-scroll"><table class="dl-table" style="min-width:920px">${ctHead}<tbody>${ctRow(main2)}</tbody></table></div>
<div class="fire-alert"><b>Hiệu lực của phần bổ sung khác phần chính</b><p>Trừ quyền lợi hủy chuyến đi, các quyền lợi bổ sung bắt đầu có hiệu lực từ thời điểm hoàn tất thủ tục xuất cảnh tại Việt Nam trong ngày khởi hành đầu tiên. Riêng quyền lợi hủy chuyến đi có hiệu lực từ ngày cấp giấy chứng nhận bảo hiểm hoặc ngày thứ 60 trước ngày khởi hành đầu tiên, tùy thời điểm nào xảy ra sau.</p></div>
</div></section>

<section class="fire-compare pd-paper" id="phi"><div class="fire-wrap">
<h2>Biểu phí ba chương trình bán trực tuyến</h2>
<p class="fire-lede" style="max-width:76ch">Phí tính cho một người theo số ngày của hành trình. PVI đang áp hai biểu phí: một bộ chung không phân vùng, và một bộ chia theo vùng lãnh thổ kèm phí riêng cho phạm vi bảo hiểm bổ sung. Chuyên viên xác nhận biểu phí áp dụng cho hồ sơ của anh chị trước khi phát hành.</p>

<h3 style="margin-top:34px">Bộ một: biểu phí chung, không phân vùng</h3>
<div class="pd-scroll"><table class="pd-table" style="min-width:620px">${goiHead('Số ngày của chuyến đi')}<tbody>
<tr class="sub"><th scope="colgroup" colspan="4">Số tiền bảo hiểm tai nạn cá nhân và chi phí y tế, mỗi quyền lợi</th></tr>
<tr><th scope="row">Mức bảo hiểm</th><td class="num strong">1 tỷ</td><td class="num strong">2 tỷ</td><td class="num strong">3 tỷ</td></tr>
<tr class="sub"><th scope="colgroup" colspan="4">Phí bảo hiểm một người, phạm vi bảo hiểm chính</th></tr>
${[...bands, '32 đến 180 ngày'].map((b, i) => `<tr><th scope="row">${b}</th>${GOI.map((k) => `<td class="num">${vnd(fees[k][i])}</td>`).join('')}</tr>`).join('')}
</tbody></table></div>

<h3 style="margin-top:44px">Bộ hai: biểu phí theo vùng lãnh thổ</h3>
<p class="fire-lede" style="max-width:76ch">Mỗi ô có hai dòng: dòng trên là phí phạm vi bảo hiểm chính, dòng dưới là phí phạm vi bảo hiểm bổ sung nếu chọn thêm. Vùng tính theo điểm đến của hành trình.</p>
<div class="dl-tabs">
${regions.map(([id, label], i) => `<input type="radio" name="dl-vung" id="dl-${id}" aria-label="Xem biểu phí đi ${label}"${i === 0 ? ' checked' : ''}>`).join('')}
<div class="dl-tabbar" role="group" aria-label="Chọn vùng lãnh thổ của hành trình">${regions.map(([id, label]) => `<label for="dl-${id}">${esc(label)}</label>`).join('')}</div>
<div class="dl-panels">
${regions.map(([id, label, tb]) => `<div class="dl-panel" id="dl-p-${id}"><div class="pd-scroll"><table class="pd-table" style="min-width:660px"><caption class="sr-only">Biểu phí bảo hiểm du lịch quốc tế đi ${esc(label)}</caption>${goiHead('Số ngày, đi ' + label)}<tbody>${[...bands, '32 đến 185 ngày'].map((b, i) => `<tr><th scope="row">${b}</th>${GOI.map((k) => `<td class="num">${vnd(tb[k][i][0])}<span class="dl-sub">bổ sung ${vnd(tb[k][i][1])}</span></td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`).join('')}
</div>
</div>

<p class="fire-note">Bậc từ 32 ngày có mức thấp hơn các bậc ngắn ngày, đây là mức ghi trong biểu phí của PVI, cách áp cho chuyến dài ngày được chuyên viên xác nhận theo từng hồ sơ. Đoàn nhiều người và các điều khoản mở rộng (bảo hiểm dịch bệnh, hoạt động rủi ro cao, ngộ độc) được báo phí riêng. Nguồn: <a href="${SRC}" target="_blank" rel="noopener" style="color:var(--blue);text-decoration:underline">PVI Online, bảo hiểm du lịch quốc tế</a>.</p>
</div></section>

<section class="pd-section" id="loai-tru"><div class="fire-wrap">
<h2>Điểm loại trừ theo quy tắc bảo hiểm</h2>
<p class="fire-lede" style="max-width:76ch">Phần IV của Quy tắc bảo hiểm du lịch quốc tế liệt kê 19 trường hợp Bảo hiểm PVI không chi trả. Đọc kỹ trước khi mua, nhất là mục bệnh có sẵn và thể thao mạo hiểm.</p>
<ul class="pd-list no dl-cols">${exclusions.map((x) => `<li>${t(x)}</li>`).join('')}</ul>
<div class="fire-alert"><b>Ba điểm loại trừ có thể gỡ bằng điều khoản mở rộng</b><p>Dịch bệnh, thể thao mạo hiểm và ngộ độc là ba điểm loại trừ không áp dụng nếu người được bảo hiểm tham gia thêm điều khoản mở rộng tương ứng. Nếu chuyến đi có leo núi, lặn biển, trượt tuyết hoặc hoạt động rủi ro cao, nói trước để chuyên viên thêm điều khoản vào giấy chứng nhận.</p></div>
<p class="fire-note">Phạm vi bảo hiểm bổ sung còn có các điểm loại trừ riêng cho từng quyền lợi, xem Phụ lục 1 của quy tắc.</p>
</div></section>

<section class="fire-docs pd-paper" id="chung-tu"><div class="fire-wrap">
<h2>Mua và bồi thường</h2>
<div class="fire-docs-grid">
<div><h3>Thông tin cần gửi khi mua</h3><ol>
<li><b>Họ tên, ngày sinh, số hộ chiếu của từng người đi</b></li>
<li><b>Hành trình: nước đến và nước quá cảnh</b></li>
<li><b>Ngày khởi hành và ngày về</b></li>
<li><b>Chương trình chọn: Bạc, Vàng hay Kim cương</b></li>
<li><b>Có cần phạm vi bổ sung hoặc điều khoản mở rộng không</b></li>
</ol></div>
<div><h3>Hồ sơ bồi thường</h3><ol>
<li><b>Hồ sơ bệnh án, giấy chứng nhận thương tật, hóa đơn viện phí gốc</b></li>
<li><b>Vé vận chuyển, hợp đồng, hóa đơn liên quan tới khiếu nại</b></li>
<li><b>Xác nhận của hãng vận chuyển về trì hoãn, chậm hoặc mất hành lý</b></li>
<li><b>Hóa đơn mua hành lý, vật dụng bị mất hoặc hư hại</b></li>
<li><b>Xác nhận của công an nơi xảy ra việc mất giấy tờ tùy thân</b></li>
</ol></div>
</div>
${ctaRow('Gọi báo phí 0938 072 236')}
</div></section>

<section class="fire-claim" id="boi-thuong"><div class="fire-wrap">
<span class="fire-eyebrow">Khi có sự cố trong chuyến đi</span>
<h2>Bốn việc cần làm</h2>
<div class="fire-steps">
<article><b>01</b><h3>Chữa trị và giữ chứng từ gốc</h3><p>Khám chữa tại cơ sở y tế có giấy phép hợp pháp, giữ toàn bộ hóa đơn, đơn thuốc và hồ sơ bệnh án bản gốc.</p></article>
<article><b>02</b><h3>Lấy biên bản ngay tại chỗ</h3><p>Mất hành lý hoặc giấy tờ phải trình báo trong vòng 24 giờ và lấy biên bản của hãng vận chuyển hoặc công an sở tại. Trì hoãn chuyến cần giấy xác nhận ghi rõ nguyên nhân và thời gian.</p></article>
<article><b>03</b><h3>Thông báo trong 30 ngày</h3><p>Gọi tổng đài bồi thường hoặc nhắn cho chuyên viên trong vòng 30 ngày kể từ ngày xảy ra sự kiện bảo hiểm.</p></article>
<article><b>04</b><h3>Nhận chi trả</h3><p>Bảo hiểm PVI chi trả trong vòng 15 ngày làm việc kể từ khi nhận đủ hồ sơ hợp lệ.</p></article>
</div>
${hotline}
<p class="fire-note"><b>Nguồn:</b> Quy tắc bảo hiểm du lịch quốc tế của Tổng công ty Bảo hiểm PVI, ban hành kèm ${QD}. Danh mục chứng từ đầy đủ ở Phần V Mục 2 của quy tắc.</p>
</div></section>

<section class="fire-news pd-paper" id="tai-lieu"><div class="fire-wrap">
<h2>Tài liệu chính thức</h2>
<ul class="pd-docs">
<li><a href="${PDF}QTBH_DLQT_1.7.2025.pdf" target="_blank" rel="noopener"><span class="cat">Quy tắc bảo hiểm</span><div><b>Quy tắc bảo hiểm du lịch quốc tế</b><span class="d">Toàn văn quy tắc ban hành kèm ${QD}, gồm phạm vi, loại trừ, thủ tục bồi thường và Phụ lục 1 về phạm vi bổ sung.</span></div><i aria-hidden="true">&#8599;</i></a></li>
<li><a href="${PDF}BQL_dlqt_1.7.2025.pdf" target="_blank" rel="noopener"><span class="cat">Bảng quyền lợi</span><div><b>Bảng quyền lợi bảo hiểm du lịch quốc tế</b><span class="d">Hạn mức từng quyền lợi của cả sáu chương trình, bản PDF do Bảo hiểm PVI phát hành.</span></div><i aria-hidden="true">&#8599;</i></a></li>
<li><a href="${PDF}loaitrubaohiemDLQT.pdf" target="_blank" rel="noopener"><span class="cat">Loại trừ</span><div><b>Phần IV, loại trừ bảo hiểm</b><span class="d">19 điểm loại trừ của quy tắc, kèm Phụ lục 1 với loại trừ riêng của từng quyền lợi bổ sung.</span></div><i aria-hidden="true">&#8599;</i></a></li>
<li><a href="${SRC}" target="_blank" rel="noopener"><span class="cat">Kênh bán của PVI</span><div><b>PVI Online, bảo hiểm du lịch quốc tế</b><span class="d">Trang sản phẩm và biểu phí ba chương trình Bạc, Vàng, Kim cương của Tổng công ty Bảo hiểm PVI.</span></div><i aria-hidden="true">&#8599;</i></a></li>
</ul>
</div></section>
`
    + faqBlock(faqs);
  build({
    rel: 'san-pham/bao-hiem-du-lich/index.html', path: P, main, faqs,
    crumb: 'Bảo hiểm du lịch quốc tế', img: '/assets/hero-du-lich.webp',
    title: 'Bảo hiểm du lịch quốc tế PVI: quyền lợi và biểu phí | PVI Thành Đô',
    desc: 'Bảng quyền lợi 6 chương trình và biểu phí bảo hiểm du lịch quốc tế PVI theo Quyết định 491/QĐ-PVIBH. Bảo hiểm đến 3 tỷ đồng, phí từ 100.000đ một người.',
  });
}
