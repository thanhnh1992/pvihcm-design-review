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
<p class="fire-note"><b>Nguồn:</b> <a href="${p.sourceUrl}" target="_blank" rel="noopener" style="color:var(--blue);text-decoration:underline">${t(p.sourceLabel)}</a>. Phạm vi, điều khoản, mức khấu trừ và phí được chuyên viên xác nhận theo từng hồ sơ.</p>
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
<div><p class="fire-lede">${t(v.summary)}</p><p class="fire-lede" style="margin-top:16px">Phí và điều kiện không cố định như TNDS bắt buộc. Chuyên viên cần xem hồ sơ xe trước khi báo giá, vì các yếu tố sau quyết định phương án.</p></div>
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
   Chưa có trong dữ liệu đã duyệt. Chỉ dùng thông tin PVI công bố trên online.pvi.com.vn,
   ghi rõ nguồn, không tự đặt ra quyền lợi, hạn mức hay loại trừ. */
{
  const P = '/san-pham/bao-hiem-du-lich/';
  const SRC = 'https://online.pvi.com.vn/san-pham/bao-hiem-du-lich';
  const faqs = [
    { question: 'Bảo hiểm du lịch quốc tế của PVI bảo vệ những gì?', answer: 'Theo thông tin PVI công bố, sản phẩm chi trả chi phí y tế và tai nạn cá nhân trong hành trình, đồng thời hỗ trợ khi gặp sự cố như hủy chuyến, mất hành lý hoặc mất giấy tờ tùy thân. Hạn mức từng quyền lợi ghi trong quy tắc và giấy chứng nhận được phát hành.' },
    { question: 'Phí bảo hiểm du lịch quốc tế bao nhiêu?', answer: 'PVI công bố mức phí từ 100.000 đồng một người và số tiền bảo hiểm lên đến 3 tỷ đồng. Phí cụ thể phụ thuộc hành trình, số ngày, độ tuổi và chương trình chọn, nên cần báo phí theo từng chuyến.' },
    { question: 'Mua trước khi khởi hành bao lâu?', answer: 'Nên mua trước ngày khởi hành để giấy chứng nhận có hiệu lực đúng hành trình, nhất là khi hồ sơ xin thị thực yêu cầu kèm bảo hiểm du lịch. Gửi lịch trình và danh sách người đi để chuyên viên xác nhận thời hạn phù hợp.' },
    { question: 'Có bảo hiểm du lịch trong nước không?', answer: 'Trên kênh PVI Online, bảo hiểm du lịch trong nước đang ở trạng thái sắp ra mắt, phí và số tiền bảo hiểm đang cập nhật. Khi cần phương án cho chuyến trong nước, liên hệ để được tư vấn theo sản phẩm hiện có.' },
  ];
  const main = heroBlock({
    eyebrow: 'Cá nhân · Du lịch quốc tế',
    h1: 'Bảo hiểm du lịch quốc tế',
    lead: 'Chi phí y tế và tai nạn trong hành trình nước ngoài, kèm hỗ trợ khi hủy chuyến, mất hành lý hoặc mất giấy tờ tùy thân. Phí từ 100.000 đồng một người, số tiền bảo hiểm lên đến 3 tỷ đồng theo công bố của PVI.',
    cta1: ['Gọi báo phí 0938 072 236', 'tel:0938072236'],
    cta2: ['Thông tin cần gửi', '#chung-tu'],
    img: '/assets/hero-du-lich.webp',
    alt: 'Khách du lịch kéo vali tại sảnh làm thủ tục sân bay',
  }) + `
<section class="pd-section"><div class="fire-wrap">
<div class="pd-grid" style="margin-top:0">
<div>
<p class="fire-lede">Bảo hiểm du lịch quốc tế dành cho chuyến đi nước ngoài, thường được yêu cầu kèm trong hồ sơ xin thị thực của nhiều quốc gia. Sản phẩm xử lý phần chi phí phát sinh ngoài dự tính: khám chữa bệnh ở nước ngoài, tai nạn trong hành trình, và các sự cố làm gián đoạn chuyến đi.</p>
<p class="fire-lede" style="margin-top:16px">Mức phí và hạn mức quyền lợi thay đổi theo hành trình, số ngày đi, độ tuổi người tham gia và chương trình chọn. Vì vậy trang này không in bảng phí cố định, phí chính thức do chuyên viên PVI phát hành theo từng chuyến.</p>
</div>
<div class="pd-card"><table class="pd-table"><caption style="padding:16px 18px 0">PVI công bố</caption><tbody>
<tr><th scope="row">Phí bảo hiểm</th><td class="num strong">Từ 100.000đ</td><td>một người</td></tr>
<tr><th scope="row">Số tiền bảo hiểm</th><td class="num strong">Đến 3 tỷ đồng</td><td>theo chương trình</td></tr>
<tr><th scope="row">Du lịch trong nước</th><td colspan="2">Sắp ra mắt, phí đang cập nhật</td></tr>
</tbody></table>
<p class="fire-note">Nguồn: <a href="${SRC}" target="_blank" rel="noopener" style="color:var(--blue);text-decoration:underline">PVI Online, chuyên mục bảo hiểm du lịch</a>.</p>
</div>
</div>
</div></section>

<section class="pd-section pd-paper" id="pham-vi"><div class="fire-wrap">
<h2>Sản phẩm xử lý những tình huống nào</h2>
<div class="pd-two">
<div><h3>Nhóm quyền lợi PVI nêu</h3><ul class="pd-list">
<li>Chi phí y tế phát sinh trong hành trình nước ngoài.</li>
<li>Tai nạn cá nhân xảy ra trong thời gian chuyến đi.</li>
<li>Hỗ trợ khi hủy chuyến, mất hành lý hoặc mất giấy tờ tùy thân.</li>
</ul></div>
<div><h3>Cần làm rõ trước khi mua</h3><ul class="pd-list no">
<li>Hạn mức từng quyền lợi và mức miễn thường, ghi trong quy tắc và giấy chứng nhận.</li>
<li>Phạm vi lãnh thổ của hành trình, gồm cả điểm quá cảnh.</li>
<li>Bệnh có sẵn, hoạt động thể thao mạo hiểm và các điểm loại trừ khác theo quy tắc.</li>
<li>Thời điểm bắt đầu hiệu lực so với ngày khởi hành.</li>
</ul></div>
</div>
<div class="fire-alert"><b>Trang này nêu thông tin chung, không thay cho quy tắc bảo hiểm</b><p>Quyền lợi, hạn mức và điểm loại trừ cụ thể theo quy tắc và hợp đồng Bảo hiểm PVI phát hành cho từng chương trình. Gửi hành trình để chuyên viên đối chiếu trước khi phát hành.</p></div>
</div></section>

<section class="fire-docs" id="chung-tu"><div class="fire-wrap">
<h2>Thông tin cần gửi và các bước</h2>
<div class="fire-docs-grid">
<div><h3>Thông tin chuyến đi</h3><ol>
<li><b>Họ tên và ngày sinh của từng người đi</b></li>
<li><b>Hành trình: nước đến, nước quá cảnh</b></li>
<li><b>Ngày khởi hành và ngày về</b></li>
<li><b>Mục đích chuyến đi và yêu cầu của hồ sơ thị thực nếu có</b></li>
</ol></div>
<div><h3>Các bước</h3><ol>
<li><b>Gửi thông tin</b><span>Qua điện thoại hoặc Zalo, kèm lịch trình dự kiến.</span></li>
<li><b>Nhận báo phí</b><span>Chuyên viên xác nhận chương trình, hạn mức và phí theo hành trình.</span></li>
<li><b>Phát hành giấy chứng nhận</b><span>Sau khi xác nhận phương án và hoàn tất thanh toán, giấy chứng nhận được cấp trước ngày khởi hành.</span></li>
</ol></div>
</div>
${ctaRow('Gọi báo phí 0938 072 236')}
</div></section>

<section class="fire-claim pd-paper" id="boi-thuong"><div class="fire-wrap">
<span class="fire-eyebrow">Khi có sự cố trong chuyến đi</span>
<h2>Ba việc cần làm</h2>
<div class="fire-steps">
<article><b>01</b><h3>Giữ an toàn và chữa trị trước</h3><p>Ưu tiên khám chữa tại cơ sở y tế gần nhất, giữ toàn bộ chứng từ gốc và đơn thuốc.</p></article>
<article><b>02</b><h3>Thông báo sớm</h3><p>Gọi tổng đài bồi thường hoặc nhắn cho chuyên viên ngay khi sự việc xảy ra, trước khi làm thủ tục khác.</p></article>
<article><b>03</b><h3>Tập hợp chứng từ</h3><p>Giữ hóa đơn, hồ sơ y tế, biên bản của hãng bay hoặc cơ quan chức năng với trường hợp mất hành lý và giấy tờ.</p></article>
</div>
${hotline}
<p class="fire-note"><b>Nguồn thông tin sản phẩm:</b> <a href="${SRC}" target="_blank" rel="noopener" style="color:var(--blue);text-decoration:underline">PVI Online</a>. Thủ tục và hồ sơ bồi thường cụ thể theo quy tắc của chương trình đã phát hành.</p>
</div></section>
`
    + faqBlock(faqs);
  build({
    rel: 'san-pham/bao-hiem-du-lich/index.html', path: P, main, faqs,
    crumb: 'Bảo hiểm du lịch quốc tế', img: '/assets/hero-du-lich.webp',
    title: 'Bảo hiểm du lịch quốc tế PVI | PVI Thành Đô',
    desc: 'Bảo hiểm du lịch quốc tế PVI: chi phí y tế và tai nạn trong hành trình, hỗ trợ hủy chuyến và mất hành lý. Phí từ 100.000đ một người, bảo hiểm đến 3 tỷ đồng.',
  });
}
