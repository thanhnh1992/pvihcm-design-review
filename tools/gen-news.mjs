// Mục Tin tức: trang danh sách + từng bài.
// Nội dung pháp lý chỉ lấy từ nguồn chính thức, mỗi bài ghi rõ nguồn tham chiếu ở cuối.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { page, t, esc, ctaRow, SITE } from './chrome.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(HERE, '../dist');
const write = (rel, html) => {
  const f = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
  console.log('wrote', rel, html.length);
};

/* ── Danh sách bài, mới nhất lên đầu ── */
export const posts = [
  {
    slug: 'cong-bo-quyet-dinh-bo-nhiem-giam-doc-pho-giam-doc-pvi-thanh-do',
    date: '2026-10-05',
    dateText: '05/10/2026',
    cat: 'Thông báo · PVI Thành Đô',
    title: 'Công bố quyết định bổ nhiệm Giám đốc và Phó Giám đốc Công ty Bảo hiểm PVI Thành Đô',
    lead: 'Ngày 05/10/2026, tại TP. Hồ Chí Minh, Tổng công ty Bảo hiểm PVI công bố quyết định bổ nhiệm ông Hồ Vũ Bình giữ chức vụ Giám đốc và bà Trần Thị Thanh Thương giữ chức vụ Phó Giám đốc Công ty Bảo hiểm PVI Thành Đô.',
    image: '/assets/bo-nhiem-thanh-do-tap-the.webp',
    alt: 'Lãnh đạo Tổng công ty Bảo hiểm PVI và cán bộ PVI Thành Đô chụp ảnh lưu niệm cùng tân Giám đốc và tân Phó Giám đốc',
  },
  {
    slug: 'nghi-dinh-347-2026-bao-hiem-chay-no',
    date: '2026-09-25',
    dateText: '25/09/2026',
    cat: 'Pháp lý · Cháy nổ bắt buộc',
    title: 'Nghị định 347/2026/NĐ-CP: bảo hiểm cháy nổ bắt buộc thay đổi gì từ 15/9/2026',
    lead: 'Nghị định bỏ thủ tục nghiệm thu phòng cháy chữa cháy của cơ quan Công an, thêm trường hợp không phải mua bảo hiểm và cho tính phí riêng từng hạng mục. Doanh nghiệp cần rà lại danh mục tài sản trước khi tái tục.',
    image: '/assets/section-chay-no.webp',
    alt: 'Chuyên viên khảo sát tủ báo cháy và đường ống chữa cháy trong kho hàng',
  },
];

const dateline = (p) => `<p class="art-meta"><span>${esc(p.cat)}</span><time datetime="${p.date}">${esc(p.dateText)}</time></p>`;

/* ── Trang danh sách ── */
{
  const P = '/tin-tuc/';
  const main = `
<section class="art-head"><div class="fire-wrap">
<p class="fx-kicker">Tin tức</p>
<h1>Tin tức và cập nhật pháp lý</h1>
<p class="art-lead">Thay đổi về quy định bảo hiểm bắt buộc và thông báo của PVI Thành Đô. Mỗi bài ghi rõ căn cứ và nguồn tham chiếu ở cuối trang.</p>
</div></section>

<section class="pd-section"><div class="fire-wrap">
<ul class="art-list">${posts.map((p) => `<li><a href="/tin-tuc/${p.slug}/">
<figure><img src="${p.image}" width="1280" height="853" alt="${esc(p.alt)}" loading="lazy"></figure>
<div><span class="cat">${esc(p.cat)} · <time datetime="${p.date}">${esc(p.dateText)}</time></span>
<b>${t(p.title)}</b><span class="d">${t(p.lead)}</span></div>
<i aria-hidden="true">&rarr;</i></a></li>`).join('')}</ul>
</div></section>`;
  write('tin-tuc/index.html', page({
    path: P,
    title: 'Tin tức và cập nhật pháp lý | PVI Thành Đô',
    description: 'Cập nhật quy định mới về bảo hiểm bắt buộc và thông báo của Công ty Bảo hiểm PVI Thành Đô, kèm nguồn tham chiếu chính thức.',
    image: posts[0].image,
    head: `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Tin tức PVI Thành Đô', url: SITE + P,
    })}</script>`,
    main,
    extraCss: '<link rel="stylesheet" href="/news.css">',
  }));
}

/* ── Bài 1: Nghị định 347/2026/NĐ-CP ── */
{
  const p = posts.find((x) => x.slug === 'nghi-dinh-347-2026-bao-hiem-chay-no');
  const P = `/tin-tuc/${p.slug}/`;
  const sources = [
    ['Nghị định 105/2025/NĐ-CP (văn bản bị sửa đổi)', 'https://vanban.chinhphu.vn/?pageid=27160&docid=213702', 'Cổng thông tin điện tử Chính phủ'],
    ['Quy định mới về bảo hiểm cháy, nổ bắt buộc có hiệu lực từ 15/9', 'https://tienphong.vn/quy-dinh-moi-ve-bao-hiem-chay-no-bat-buoc-co-hieu-luc-tu-159-post1876423.tpo', 'Báo Tiền Phong'],
    ['Một số điểm mới của Nghị định 347/2026/NĐ-CP trong lĩnh vực PCCC và CNCH', 'https://baohatinh.vn/mot-so-diem-moi-cua-nghi-dinh-so-3472026nd-cp-trong-linh-vuc-pccc-va-cnch-post317660.html', 'Báo Hà Tĩnh'],
    ['Quy định mới về bảo hiểm cháy, nổ bắt buộc có hiệu lực từ 15/9', 'https://www.pjico.com.vn/quy-dinh-moi-ve-bao-hiem-chay-no-bat-buoc-co-hieu-luc-tu-159.html', 'Bảo hiểm PJICO'],
  ];
  const changes = [
    ['Nghiệm thu phòng cháy chữa cháy', 'Cơ quan Công an kiểm tra công tác nghiệm thu và cấp văn bản chấp thuận.', 'Chủ đầu tư tự tổ chức nghiệm thu, chịu trách nhiệm pháp lý về kết quả và khai báo trên cơ sở dữ liệu trước khi đưa công trình vào sử dụng.'],
    ['Điều kiện bán bảo hiểm', 'Hồ sơ thường kèm văn bản thẩm duyệt, nghiệm thu về phòng cháy chữa cháy.', 'Doanh nghiệp bảo hiểm không được từ chối bán vì cơ sở thiếu văn bản thẩm duyệt thiết kế phòng cháy chữa cháy.'],
    ['Trường hợp không phải mua', 'Theo danh mục cơ sở tại Nghị định 105/2025/NĐ-CP.', 'Bổ sung loại trừ với nhà, công trình độc lập đáp ứng tiêu chuẩn, quy chuẩn kỹ thuật về phòng cháy chữa cháy và có mức độ nguy hiểm cháy thấp.'],
    ['Cơ sở có nhiều hạng mục', 'Tính theo loại hình chung của cơ sở.', 'Cơ sở có nhiều hạng mục độc lập, công năng khác nhau được tính phí riêng theo từng hạng mục theo phân loại tại Phụ lục VI, nếu từng hạng mục đáp ứng yêu cầu an toàn.'],
    ['Trích nộp hỗ trợ lực lượng phòng cháy chữa cháy', 'Tối đa 65% số tiền thực tế thu được.', 'Tối đa 75% số tiền thực tế thu được, thêm tối đa 5% cho tuyên truyền, huấn luyện và kiểm tra việc chấp hành.'],
  ];
  const main = `
<article class="art">
<section class="art-head"><div class="fire-wrap">
${dateline(p)}
<h1>${t(p.title)}</h1>
<p class="art-lead">${t(p.lead)}</p>
</div></section>

<figure class="art-photo"><img src="${p.image}" width="1280" height="853" alt="${esc(p.alt)}" fetchpriority="high"><figcaption>Rà soát hệ thống phòng cháy và danh mục tài sản là bước đầu khi tái tục bảo hiểm cháy nổ bắt buộc.</figcaption></figure>

<div class="art-body"><div class="fire-wrap">

<div class="art-key">
<b>Tóm tắt nhanh</b>
<ul>
<li>Nghị định 347/2026/NĐ-CP ký ngày 08/9/2026, hiệu lực từ 15/9/2026.</li>
<li>Sửa đổi bốn nghị định, trong đó có Nghị định 105/2025/NĐ-CP về phòng cháy chữa cháy và Nghị định 106/2025/NĐ-CP về xử phạt trong lĩnh vực này.</li>
<li>Danh mục cơ sở và biểu phí tại Phụ lục VI vẫn là căn cứ tính phí; các nguồn công bố không nêu thay đổi tỷ lệ phí.</li>
</ul>
</div>

<h2>Năm thay đổi ảnh hưởng trực tiếp tới doanh nghiệp</h2>
<div class="pd-scroll"><table class="pd-table art-table"><thead><tr>
<th scope="col">Nội dung</th><th scope="col">Trước 15/9/2026</th><th scope="col">Từ 15/9/2026</th>
</tr></thead><tbody>${changes.map(([a, b, c]) => `<tr><th scope="row">${t(a)}</th><td>${t(b)}</td><td>${t(c)}</td></tr>`).join('')}</tbody></table></div>

<h2>Hồ sơ phòng cháy chữa cháy thay đổi cách chứng minh</h2>
<p>Trước đây nhiều cơ sở dùng văn bản chấp thuận kết quả nghiệm thu của cơ quan Công an làm bằng chứng đã hoàn thành phần phòng cháy chữa cháy. Từ 15/9/2026, thủ tục này bỏ, chủ đầu tư tự tổ chức nghiệm thu và tự chịu trách nhiệm pháp lý, đồng thời khai báo trên cơ sở dữ liệu về phòng cháy chữa cháy trước khi đưa công trình vào sử dụng.</p>
<p>Hệ quả với bảo hiểm: hồ sơ tham gia không còn phụ thuộc văn bản thẩm duyệt của cơ quan Công an, nhưng hồ sơ nội bộ của cơ sở, gồm biên bản tự nghiệm thu, tài liệu kỹ thuật và thông tin đã khai báo, trở thành phần quan trọng khi rà soát rủi ro và giải quyết bồi thường.</p>

<h2>Cơ sở nhiều hạng mục nên rà lại cách tính phí</h2>
<p>Với cơ sở có nhiều hạng mục độc lập và công năng khác nhau, ví dụ khu sản xuất, kho thành phẩm, nhà văn phòng trong cùng một khuôn viên, phí có thể tính riêng theo từng hạng mục theo phân loại tại Phụ lục VI, với điều kiện từng hạng mục đáp ứng yêu cầu an toàn. Việc kê khai gộp hay tách hạng mục dẫn tới tỷ lệ phí khác nhau, nên bảng kê tài sản cần khớp với thực tế bố trí mặt bằng.</p>

<h2>Doanh nghiệp cần làm gì trước kỳ tái tục</h2>
<div class="fire-steps">
<article><b>01</b><h3>Rà loại cơ sở</h3><p>Đối chiếu loại hình và quy mô cơ sở với danh mục tại Phụ lục VI, xác định cơ sở còn thuộc diện bắt buộc hay rơi vào nhóm loại trừ mới.</p></article>
<article><b>02</b><h3>Tách hạng mục</h3><p>Lập bảng kê theo từng hạng mục độc lập kèm công năng, diện tích và giá trị tài sản, thay vì một dòng chung cho cả cơ sở.</p></article>
<article><b>03</b><h3>Soát hồ sơ nội bộ</h3><p>Chuẩn bị biên bản tự nghiệm thu, hồ sơ kỹ thuật và thông tin đã khai báo trên cơ sở dữ liệu phòng cháy chữa cháy.</p></article>
<article><b>04</b><h3>Đối chiếu số tiền bảo hiểm</h3><p>Cập nhật giá trị nhà xưởng, máy móc và hàng hóa theo sổ sách trước khi đề nghị báo phí.</p></article>
</div>

<div class="fire-alert"><b>Bài viết này là tin tức, không thay cho văn bản gốc</b><p>Phạm vi áp dụng cho từng cơ sở cần đối chiếu nguyên văn Nghị định 347/2026/NĐ-CP và Nghị định 105/2025/NĐ-CP. Phí, điều kiện và phạm vi chính thức theo quy tắc và hợp đồng Bảo hiểm PVI phát hành.</p></div>

<h2>Tra loại cơ sở và ước tính phí</h2>
<p>Trang bảo hiểm cháy nổ bắt buộc của PVI Thành Đô có công cụ tra 59 dòng cơ sở theo Phụ lục VI, kèm tỷ lệ phí, loại khấu trừ và phí tạm tính theo từng hạng mục tài sản.</p>
${ctaRow('Gọi rà soát 0938 072 236')}

<h2>Nguồn tham chiếu</h2>
<ul class="art-sources">${sources.map(([name, href, org]) => `<li><a href="${href}" target="_blank" rel="noopener"><b>${esc(name)}</b><span>${esc(org)}</span><i aria-hidden="true">&#8599;</i></a></li>`).join('')}</ul>

</div></div>
</article>`;

  write(`tin-tuc/${p.slug}/index.html`, page({
    path: P,
    title: 'Nghị định 347/2026: bảo hiểm cháy nổ đổi gì từ 15/9 | PVI',
    description: 'Từ 15/9/2026, Nghị định 347/2026/NĐ-CP bỏ thủ tục nghiệm thu PCCC của Công an, thêm trường hợp loại trừ và cho tính phí riêng từng hạng mục theo Phụ lục VI.',
    image: p.image,
    head: `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org', '@type': 'NewsArticle',
      headline: p.title, datePublished: p.date, dateModified: p.date,
      image: [SITE + p.image], mainEntityOfPage: SITE + P,
      author: { '@type': 'Organization', name: 'Công ty Bảo hiểm PVI Thành Đô' },
      publisher: { '@type': 'Organization', name: 'Công ty Bảo hiểm PVI Thành Đô', logo: { '@type': 'ImageObject', url: SITE + '/assets/pvi-logo.svg' } },
      description: p.lead,
    }).replace(/</g, '\\u003c')}</script><script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: 'Tin tức', item: SITE + '/tin-tuc/' },
        { '@type': 'ListItem', position: 3, name: p.title, item: SITE + P }],
    })}</script>`,
    main,
    extraCss: '<link rel="stylesheet" href="/news.css">',
  }));
}

/* ── Bài 2: Công bố quyết định bổ nhiệm Giám đốc, Phó Giám đốc PVI Thành Đô ──
   Nội dung lấy nguyên văn từ Quyết định 1045/QĐ-PVIBH và 1051/QĐ-PVIBH do chủ site cung cấp.
   Không đăng ảnh chụp quyết định (có con dấu, chữ ký); chỉ dẫn số hiệu.
   Bố cục thông cáo (lớp .ann-*): một cột đọc giữa trang, ảnh lớn, khối nhân sự hai cột. */
{
  const p = posts.find((x) => x.slug === 'cong-bo-quyet-dinh-bo-nhiem-giam-doc-pho-giam-doc-pvi-thanh-do');
  const P = `/tin-tuc/${p.slug}/`;
  const img = (name, alt, sizes, eager = false) => `<img src="/assets/${name}.webp" srcset="/assets/${name}-480.webp 480w, /assets/${name}-800.webp 800w, /assets/${name}.webp 1280w" sizes="${sizes}" width="1280" height="853" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>`;
  const people = [
    {
      role: 'Giám đốc', name: 'Ông Hồ Vũ Bình',
      rows: [
        ['Trước khi bổ nhiệm', 'Phó Giám đốc Công ty Bảo hiểm PVI Thành Đô'],
        ['Quyết định', 'Số 1045/QĐ-PVIBH ngày 29/9/2026 của Hội đồng thành viên Tổng công ty Bảo hiểm PVI'],
        ['Thời hạn', '01 năm, hiệu lực từ ngày 01/10/2026'],
      ],
    },
    {
      role: 'Phó Giám đốc', name: 'Bà Trần Thị Thanh Thương',
      rows: [
        ['Trước khi bổ nhiệm', 'Trưởng phòng Quản lý nghiệp vụ và Bồi thường'],
        ['Quyết định', 'Số 1051/QĐ-PVIBH ngày 01/10/2026 của Tổng giám đốc Tổng công ty Bảo hiểm PVI'],
        ['Thời hạn', '01 năm, hiệu lực từ ngày ký'],
        ['Kiêm nhiệm', 'Trưởng phòng Quản lý nghiệp vụ và Bồi thường trong 06 tháng'],
      ],
    },
  ];
  const decisions = [
    'Quyết định số 1045/QĐ-PVIBH ngày 29/9/2026 của Hội đồng thành viên Tổng công ty Bảo hiểm PVI về việc công tác cán bộ.',
    'Quyết định số 1051/QĐ-PVIBH ngày 01/10/2026 của Tổng giám đốc Tổng công ty Bảo hiểm PVI về việc công tác cán bộ.',
  ];
  const main = `
<article class="ann">
<div class="ann-head"><div class="ann-col">
<p class="ann-crumb"><a href="/tin-tuc/">Tin tức</a><span aria-hidden="true">/</span><span>Thông báo</span></p>
<h1>${t(p.title)}</h1>
<p class="ann-lead">${t(p.lead)}</p>
<p class="ann-meta"><time datetime="${p.date}">${esc(p.dateText)}</time><span>TP. Hồ Chí Minh</span></p>
</div></div>

<figure class="ann-hero">${img('bo-nhiem-thanh-do-tap-the', p.alt, '(max-width:820px) 100vw, 1120px', true)}
<figcaption>${t('Lãnh đạo Tổng công ty Bảo hiểm PVI và cán bộ PVI Thành Đô chụp ảnh lưu niệm cùng ông Hồ Vũ Bình và bà Trần Thị Thanh Thương tại lễ công bố.')}</figcaption></figure>

<section class="ann-people" aria-labelledby="ann-people-h"><div class="ann-wide">
<h2 id="ann-people-h">Nhân sự được bổ nhiệm</h2>
<div class="ann-grid">${people.map((x) => `
<div class="ann-person"><p class="ann-role">${t(x.role)}</p><p class="ann-name">${t(x.name)}</p>
<dl>${x.rows.map(([k, v]) => `<div><dt>${t(k)}</dt><dd>${t(v)}</dd></div>`).join('')}</dl></div>`).join('')}
</div>
</div></section>

<div class="ann-body"><div class="ann-col">
<p class="ann-first">${t('Tham dự buổi lễ có Tổng giám đốc Tổng công ty Bảo hiểm PVI Phạm Anh Đức, Phó Tổng giám đốc Tổng công ty Bảo hiểm PVI Phạm Thành Vinh, Trưởng Ban Tổ chức nhân sự Tổng công ty Bảo hiểm PVI Trần Việt Hải, cùng toàn thể cán bộ, nhân viên Công ty Bảo hiểm PVI Thành Đô. Tại buổi lễ, các quyết định của Tổng công ty Bảo hiểm PVI về công tác cán bộ đối với Công ty Bảo hiểm PVI Thành Đô đã được công bố.')}</p>

<h2>${t('Ông Hồ Vũ Bình giữ chức vụ Giám đốc')}</h2>
<p>${t('Theo Quyết định số 1045/QĐ-PVIBH ngày 29/9/2026 của Hội đồng thành viên Tổng công ty Bảo hiểm PVI, ông Hồ Vũ Bình, Phó Giám đốc Công ty Bảo hiểm PVI Thành Đô, được bổ nhiệm giữ chức vụ Giám đốc Công ty Bảo hiểm PVI Thành Đô thuộc Tổng công ty Bảo hiểm PVI, thời hạn 01 năm. Quyết định có hiệu lực kể từ ngày 01/10/2026.')}</p>

<h2>${t('Bà Trần Thị Thanh Thương giữ chức vụ Phó Giám đốc')}</h2>
<p>${t('Theo Quyết định số 1051/QĐ-PVIBH ngày 01/10/2026 của Tổng giám đốc Tổng công ty Bảo hiểm PVI, bà Trần Thị Thanh Thương, Trưởng phòng Quản lý nghiệp vụ và Bồi thường, Công ty Bảo hiểm PVI Thành Đô, được bổ nhiệm giữ chức vụ Phó Giám đốc Công ty Bảo hiểm PVI Thành Đô, thời hạn 01 năm. Đồng thời, bà Trần Thị Thanh Thương kiêm nhiệm chức vụ Trưởng phòng Quản lý nghiệp vụ và Bồi thường, Công ty Bảo hiểm PVI Thành Đô trong thời gian 06 tháng. Quyết định có hiệu lực kể từ ngày ký.')}</p>
</div>

<div class="ann-pair ann-wide">
<figure>${img('bo-nhiem-thanh-do-giam-doc', 'Lãnh đạo Tổng công ty Bảo hiểm PVI trao quyết định bổ nhiệm và tặng hoa chúc mừng ông Hồ Vũ Bình', '(max-width:820px) 100vw, 548px')}<figcaption>${t('Trao quyết định bổ nhiệm ông Hồ Vũ Bình, Giám đốc Công ty Bảo hiểm PVI Thành Đô.')}</figcaption></figure>
<figure>${img('bo-nhiem-thanh-do-pho-giam-doc', 'Lãnh đạo Tổng công ty Bảo hiểm PVI trao quyết định bổ nhiệm và tặng hoa chúc mừng bà Trần Thị Thanh Thương', '(max-width:820px) 100vw, 548px')}<figcaption>${t('Trao quyết định bổ nhiệm bà Trần Thị Thanh Thương, Phó Giám đốc Công ty Bảo hiểm PVI Thành Đô.')}</figcaption></figure>
</div>

<div class="ann-col">
<h2>${t('Trao quyết định trước toàn thể cán bộ, nhân viên')}</h2>
<p>${t('Trước sự chứng kiến của toàn thể cán bộ, nhân viên Công ty Bảo hiểm PVI Thành Đô, Tổng giám đốc Phạm Anh Đức, Phó Tổng giám đốc Phạm Thành Vinh và Trưởng Ban Tổ chức nhân sự Trần Việt Hải đã trao quyết định và tặng hoa chúc mừng ông Hồ Vũ Bình và bà Trần Thị Thanh Thương.')}</p>
<p>${t('Lễ công bố diễn ra trong năm Tổng công ty Bảo hiểm PVI kỷ niệm 30 năm thành lập. Việc công bố các quyết định trên góp phần kiện toàn bộ máy lãnh đạo của Công ty Bảo hiểm PVI Thành Đô. Buổi lễ khép lại trong không khí trang trọng, với lời chúc mừng của lãnh đạo Tổng công ty cùng toàn thể cán bộ, nhân viên PVI Thành Đô dành cho ông Hồ Vũ Bình và bà Trần Thị Thanh Thương trên cương vị mới.')}</p>

<aside class="ann-cite" aria-labelledby="ann-cite-h">
<h2 id="ann-cite-h">Căn cứ</h2>
<ul>${decisions.map((d) => `<li>${t(d)}</li>`).join('')}</ul>
</aside>

<p class="ann-foot"><a href="/tin-tuc/">&larr; Tất cả tin tức</a><a href="/gioi-thieu/">Giới thiệu PVI Thành Đô &rarr;</a></p>
</div></div>
</article>`;

  write(`tin-tuc/${p.slug}/index.html`, page({
    path: P,
    title: 'Bổ nhiệm Giám đốc, Phó Giám đốc PVI Thành Đô | PVI',
    description: 'Ngày 05/10/2026, Tổng công ty Bảo hiểm PVI công bố quyết định bổ nhiệm ông Hồ Vũ Bình làm Giám đốc và bà Trần Thị Thanh Thương làm Phó Giám đốc PVI Thành Đô.',
    image: p.image,
    head: `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org', '@type': 'NewsArticle',
      headline: p.title, datePublished: p.date, dateModified: p.date,
      image: ['bo-nhiem-thanh-do-tap-the', 'bo-nhiem-thanh-do-giam-doc', 'bo-nhiem-thanh-do-pho-giam-doc'].map((n) => `${SITE}/assets/${n}.webp`),
      mainEntityOfPage: SITE + P,
      author: { '@type': 'Organization', name: 'Công ty Bảo hiểm PVI Thành Đô' },
      publisher: { '@type': 'Organization', name: 'Công ty Bảo hiểm PVI Thành Đô', logo: { '@type': 'ImageObject', url: SITE + '/assets/pvi-logo.svg' } },
      description: p.lead,
    }).replace(/</g, '\\u003c')}</script><script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: 'Tin tức', item: SITE + '/tin-tuc/' },
        { '@type': 'ListItem', position: 3, name: p.title, item: SITE + P }],
    })}</script>`,
    main,
    extraCss: '<link rel="stylesheet" href="/news.css">',
  }));
}
