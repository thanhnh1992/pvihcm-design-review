// Đánh giá sao cho MỌI trang (chủ site chốt 22/11/2026: sản phẩm, kiến thức, tin tức, giới thiệu, trang khu vực...).
// Bài Tin tức / Kiến thức đã có khối nhận xét do gen-news.mjs sinh ([data-feedback]); trang tai nạn có hệ đánh giá
// riêng (product-reviews.js). Script này gắn cùng khối nhận xét (/feedback.js + /api/nhan-xet) cho các trang còn lại,
// chèn trước </main>, giữa <!-- danh-gia-sao:start/end -->, chạy lại bao nhiêu lần cũng được.
// Không gắn cho: trang noindex (chính sách, form đặt mua), trang không có <main>, file xác minh Google.
// Điểm tĩnh trong HTML = điểm Google thật (tools/data/google-rating.mjs); feedback.js cộng đánh giá thật của khách.
// CSS: dist/danh-gia.css cắt nguyên khối .fb từ dist/news.css (một nguồn), cộng phần khung cho trang không phải bài viết.
// Chạy SAU mọi script sinh trang, TRƯỚC gen-sitemap: node tools/danh-gia-sao.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GOOGLE_RATING as G } from './data/google-rating.mjs';
import { THANH_DO_ORG as O, ORG_ID, SITE } from './chrome.mjs';
import { PRODUCTS } from './data/san-pham-danh-gia.mjs';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const START = '<!-- danh-gia-sao:start -->';
const END = '<!-- danh-gia-sao:end -->';
const GSTART = '<!-- sao-google:start -->';
const GEND = '<!-- sao-google:end -->';
// Dòng điểm Google Maps thật (tools/data/google-rating.mjs). Bài Tin tức/Kiến thức không được có link ra ngoài
// (AGENTS.md) nên chỉ ghi chữ; trang khác có link Google Maps kèm rel="nofollow".
const orgLd = (attr = '') => {
  // Chủ site yêu cầu bắt buộc 22/11/2026 (đã được báo rủi ro Google bỏ qua hoặc phạt thủ công, chấp nhận):
  // khai điểm thật vào JSON-LD InsuranceAgency (cùng @id với thực thể trong chân trang). HTML tĩnh mang số Google;
  // trên trang có khối gộp, feedback.js cộng thêm đánh giá thật của khách trên website (script[data-org-rating]).
  const ld = {
    '@context': 'https://schema.org', '@type': 'InsuranceAgency', '@id': ORG_ID,
    name: O.name, alternateName: O.alternateName, url: SITE + '/', image: SITE + '/assets/pvi-logo.svg', telephone: '+84938072236',
    address: { '@type': 'PostalAddress', streetAddress: O.street, addressLocality: O.ward, addressRegion: O.city, addressCountry: 'VN' },
    parentOrganization: { '@type': 'Organization', name: O.parent },
    sameAs: [G.url],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: G.rating, bestRating: 5, worstRating: 1, ratingCount: G.count },
  };
  return `<script type="application/ld+json"${attr}>${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`;
};
// Dòng điểm riêng: chỉ còn dùng cho bài Tin tức/Kiến thức (đã có khối nhận xét của bài) và trang tai nạn.
const gBadge = (withLink) => {
  const num = String(G.rating).replace('.', ',');
  const label = `${num} trên 5 sao, ${G.count} đánh giá trên Google`;
  const more = withLink ? `<a class="gr-link" href="${G.url}" target="_blank" rel="nofollow">Xem và viết đánh giá trên Google Maps</a>` : '';
  return `${GSTART}
${orgLd()}
<aside class="gr" aria-label="Đánh giá trên Google Maps"><div class="gr-in">
<p class="gr-score"><b>${num}</b><span class="fb-rate" style="--v:${G.rating}" role="img" aria-label="${label}"><i></i></span><span class="gr-meta">${G.count} đánh giá trên Google · cập nhật ${G.checked}</span></p>
<p class="gr-note">Điểm lấy nguyên từ hồ sơ Google của Công ty Bảo hiểm PVI Thành Đô.${more ? ' ' + more : ''}</p>
</div></aside>
${GEND}`;
};
const EMAIL_FIELD = '<label class="fb-label" for="fb-email">Email <span>(không bắt buộc, không công khai)</span></label>\n<input id="fb-email" name="email" type="email" maxlength="120" autocomplete="email" inputmode="email">\n';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z"/></svg>';

// 1. CSS: lấy khối .fb của news.css
{
  const news = fs.readFileSync(path.join(DIST, 'news.css'), 'utf8');
  const a = news.indexOf('NHẬN XÉT CỦA BẠN ĐỌC');
  const b = news.indexOf('BÀI KIẾN THỨC DÀI');
  if (a < 0 || b < 0) throw new Error('news.css: không tìm thấy khối .fb');
  const from = news.lastIndexOf('/*', a);
  const to = news.lastIndexOf('/*', b);
  const css = `/* SINH TỰ ĐỘNG bởi tools/danh-gia-sao.mjs từ khối .fb của news.css. Không sửa tay. */
.dgs{padding:0 0 32px}
.dgs-head{padding:40px 0 4px}
.dgs-head h1{margin:6px 0 10px;font-size:clamp(28px,3.4vw,40px);line-height:1.15;letter-spacing:-.02em;color:var(--ink,#17212e)}
.dgs-head p{margin:0;font-size:16px;line-height:1.6;color:#4a5d72}
.dgs-crumb a{color:#1F4A8C}
.gr{padding:0 0 24px}
/* Bài viết: dòng điểm Google nằm ngay dưới khối nhận xét, gọn (chủ site 23/11/2026) */
.kb-col .gr,.art-body .gr{padding:6px 0 0}
.kb-col .gr-in,.art-body .gr-in{width:auto;max-width:700px;margin:0;padding:12px 16px}
.gr-in{width:min(760px,calc(100% - 2*var(--gutter,20px)));margin-inline:auto;padding:12px 16px;border:1px solid #dbe4ec;border-radius:14px;background:#fff}
.gr-score{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;margin:0;font-size:15px;color:#5b6f86}
.gr-score b{font-size:22px;line-height:1;color:var(--ink,#17212e);font-variant-numeric:tabular-nums}
.gr .fb-rate{--s:18px}
.gr-note{margin:4px 0 0;font-size:13px;line-height:1.6;color:#5b6f86}
.gr-link{color:#1F4A8C;font-weight:600;text-decoration:underline;text-underline-offset:3px}
.fb .fb-src{margin:-4px 0 12px;font-size:14px;line-height:1.6;color:#5b6f86}
.dgs-in{width:min(760px,calc(100% - 2*var(--gutter,20px)));margin-inline:auto}
.dgs .fb{max-width:none}
${news.slice(from, to).trim()}
`;
  fs.writeFileSync(path.join(DIST, 'danh-gia.css'), css);
}

// 2. Gắn khối vào từng trang
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(d, e.name);
  return e.isDirectory() ? walk(p) : e.name === 'index.html' ? [p] : [];
});


// Khối gộp (chủ site yêu cầu 22/11/2026): điểm Google thật + khách chấm tiếp trên website, chung khóa pvi-thanh-do
// (đánh giá công ty, không theo từng trang); tổng gộp ghi vào JSON-LD. Nhận xét không bắt buộc, cấm chèn link
// (chặn ở feedback.js và api/nhan-xet.js).
// Schema Product của trang sản phẩm: chỉ in sẵn khi có giá thật (offers); điểm riêng do feedback.js gắn khi có lượt thật.
const productLd = (pr, rel) => {
  if (!pr.offers) return '';
  const ld = {
    '@context': 'https://schema.org', '@type': 'Product', '@id': SITE + '/' + rel.replace(/index\.html$/, '') + '#san-pham',
    name: pr.name, brand: { '@type': 'Brand', name: 'Bảo hiểm PVI' }, url: SITE + '/' + rel.replace(/index\.html$/, ''),
    offers: { '@type': 'AggregateOffer', priceCurrency: 'VND', lowPrice: pr.offers.low, highPrice: pr.offers.high, offerCount: pr.offers.count, seller: { '@id': ORG_ID } },
  };
  return `<script type="application/ld+json" data-product-rating>${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n`;
};
const block = (title, full = false, pr = null, rel = '') => {
  const num = String(G.rating).replace('.', ',');
  const who = pr ? pr.name : 'Bảo hiểm PVI Thành Đô';
  const attrs = pr
    ? `data-mode="product" data-slug="${pr.slug}" data-company-slug="pvi-thanh-do" data-product-name="${esc(pr.name)}" data-product-url="${SITE}/${rel.replace(/index\.html$/, '')}"`
    : `data-mode="org"${full ? ' data-full' : ''} data-slug="pvi-thanh-do"`;
  const summary = pr
    ? `<p class="fb-summary" hidden><b class="fb-avg"></b><span class="fb-rate" role="img"><i></i></span><span class="fb-total"></span></p></div>
<p class="fb-src"><span data-company-line>Điểm chung Bảo hiểm PVI Thành Đô: <b>${num}</b>/5 · ${G.count} đánh giá trên Google (cập nhật ${G.checked}).</span> <a class="gr-link" href="/danh-gia/" data-same-tab>Xem toàn bộ đánh giá</a></p>`
    : `<p class="fb-summary"><b class="fb-avg">${num}</b><span class="fb-rate" style="--v:${G.rating}" role="img" aria-label="${num} trên 5 sao, ${G.count} đánh giá"><i></i></span><span class="fb-total">${G.count} đánh giá</span></p></div>
<p class="fb-src"><span data-site-line>Gồm ${G.count} đánh giá trên Google (cập nhật ${G.checked}).</span> <a class="gr-link" href="${G.url}" target="_blank" rel="nofollow">Xem trên Google Maps</a></p>`;
  return `${START}
${orgLd(' data-org-rating')}
${pr ? productLd(pr, rel) : ''}<section class="dgs" aria-label="Đánh giá ${esc(who)}"><div class="dgs-in">
<section class="fb" data-feedback ${attrs} data-base-count="${G.count}" data-base-avg="${G.rating}" data-endpoint="/api/nhan-xet" data-title="${esc(title)}" aria-labelledby="fb-h">
<div class="fb-top"><h2 id="fb-h">Đánh giá ${esc(who)}</h2>
${summary}
<form class="fb-form" novalidate>
<fieldset class="fb-field"><legend>Bạn đánh giá ${pr ? esc(pr.name) : 'dịch vụ của PVI Thành Đô'} bao nhiêu sao?</legend>
<div class="fb-pick"><div class="fb-stars" data-v="0">${[1, 2, 3, 4, 5].map((n) => `<label data-n="${n}"><input type="radio" name="rating" value="${n}">${STAR}<span class="fb-sr">${n} sao</span></label>`).join('')}</div><span class="fb-hint" aria-live="polite">Chọn số sao</span></div>
</fieldset>
<label class="fb-label" for="fb-comment">Nhận xét <span>(không bắt buộc)</span></label>
<textarea id="fb-comment" name="comment" rows="3" maxlength="1000" placeholder="${pr ? 'Bạn thấy sản phẩm, quy trình mua và hỗ trợ thế nào?' : 'Bạn hài lòng điều gì, hoặc PVI Thành Đô cần làm tốt hơn ở đâu?'}"></textarea>
<label class="fb-label" for="fb-name">Tên hiển thị <span>(không bắt buộc)</span></label>
<input id="fb-name" name="name" maxlength="60" autocomplete="nickname">
<label class="fb-label" for="fb-email">Email <span>(không bắt buộc, không công khai)</span></label>
<input id="fb-email" name="email" type="email" maxlength="120" autocomplete="email" inputmode="email">
<p class="fb-honey" aria-hidden="true"><label>Website <input name="website" tabindex="-1" autocomplete="off"></label></p>
<div class="fb-actions"><button type="submit" class="fb-btn">Gửi đánh giá</button><span class="fb-count" aria-hidden="true">0/1000</span></div>
<p class="fb-msg" role="status" aria-live="polite"></p>
</form>
<div class="fb-done" role="status" hidden><b>Cảm ơn bạn đã đánh giá.</b><p>${pr ? 'Đánh giá đã ghi cho sản phẩm và cộng vào điểm chung.' : 'Đánh giá của bạn đã được cộng vào điểm chung.'}</p></div>
<ul class="fb-list" hidden></ul>
</section>
</div></section>
${END}`;
};

// Bỏ câu ghi chú dưới form trên mọi trang (chủ site 23/11/2026), kể cả bài viết đã sinh sẵn.
for (const file of walk(DIST)) {
  const html = fs.readFileSync(file, 'utf8');
  const out = html.replace(/<p class="fb-note">[\s\S]*?<\/p>\r?\n?/g, '');
  // Thêm ô email (không bắt buộc, không công khai) vào form nhận xét của bài viết đã sinh sẵn.
  const out1 = out.replace('(không bắt buộc, không hiển thị công khai)', '(không bắt buộc, không công khai)');
  const out2 = out1.includes('id="fb-email"') ? out1 : out1.replace(/(<input id="fb-name"[^>]*>\r?\n)/, `$1${EMAIL_FIELD}`);
  if (out2 !== html) fs.writeFileSync(file, out2);
}

let added = 0, kept = 0;
const skipped = {};
const skip = (why) => { skipped[why] = (skipped[why] || 0) + 1; };
for (const file of walk(DIST)) {
  const rel = path.relative(DIST, file).split(path.sep).join('/');
  let html = fs.readFileSync(file, 'utf8');
  const had = html.includes(START);
  if (had) html = html.replace(new RegExp(`\\n?${START}[\\s\\S]*?${END}`), '');
  if (!html.includes('</main>')) { skip('không có <main>'); continue; }
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) { skip('noindex'); continue; }
  if (html.includes('name="local-market-preview"')) continue;
  if (html.includes('data-rating-link-only')) { skip('đánh giá dẫn về trang công ty'); continue; }
  if (html.includes('data-feedback')) { skip('đã có khối nhận xét của bài'); continue; }
  if (html.includes('product-reviews')) { skip('có hệ đánh giá sản phẩm riêng'); continue; }
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
  const title = (h1 ? h1.replace(/<[^>]+>/g, ' ') : (html.match(/<title>([^<]*)<\/title>/) || [])[1] || rel).replace(/\s+/g, ' ').trim();
  const i = html.lastIndexOf('</main>');
  html = html.slice(0, i) + block(title, rel === 'danh-gia/index.html', PRODUCTS[rel] || null, rel) + '\n' + html.slice(i);
  if (!html.includes('href="/danh-gia.css"')) html = html.replace('</head>', '<link rel="stylesheet" href="/danh-gia.css"></head>');
  if (!html.includes('src="/feedback.js"')) html = html.replace('</head>', '<script src="/feedback.js" defer></script></head>');
  fs.writeFileSync(file, html);
  had ? kept++ : added++;
}
// 3. Dòng điểm Google Maps thật trên mọi trang đủ điều kiện (kể cả bài viết, trang tai nạn)
let gCount = 0;
for (const file of walk(DIST)) {
  const rel = path.relative(DIST, file).split(path.sep).join('/');
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(new RegExp(`\\n?${GSTART}[\\s\\S]*?${GEND}`, 'g'), '');
  if (!html.includes('</main>') || /<meta[^>]+name="robots"[^>]+noindex/i.test(html)) { fs.writeFileSync(file, html); continue; }
  if (html.includes('name="local-market-preview"')) continue;
  if (html.includes('data-rating-link-only')) continue;
  if (html.includes(START)) { fs.writeFileSync(file, html); gCount++; continue; } // khối gộp đã chứa điểm Google + schema
  const article = /^(tin-tuc|kien-thuc)\/[^/]+\/index\.html$/.test(rel) && html.includes('data-feedback');
  const badge = gBadge(!article && !html.includes('data-internal-links-only'));
  const fbAt = article ? html.indexOf('<section class="fb" data-feedback') : -1;
  const fbEnd = fbAt >= 0 ? html.indexOf('</section>', fbAt) : -1;
  if (fbEnd >= 0) { const i = fbEnd + '</section>'.length; html = html.slice(0, i) + '\n' + badge + html.slice(i); }
  else { const i = html.lastIndexOf('</main>'); html = html.slice(0, i) + badge + '\n' + html.slice(i); }
  if (!html.includes('href="/danh-gia.css"')) html = html.replace('</head>', '<link rel="stylesheet" href="/danh-gia.css"></head>');
  fs.writeFileSync(file, html);
  gCount++;
}
console.log(`sao-google: ${G.rating}/5, ${G.count} lượt, gắn ${gCount} trang`);
console.log(`danh-gia-sao: gắn mới ${added}, cập nhật ${kept}; bỏ qua`, skipped);
