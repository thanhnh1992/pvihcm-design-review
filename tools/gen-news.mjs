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
  const p = posts[0];
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
