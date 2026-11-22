// Đánh giá sao cho MỌI trang (chủ site chốt 22/11/2026: sản phẩm, kiến thức, tin tức, giới thiệu, trang khu vực...).
// Bài Tin tức / Kiến thức đã có khối nhận xét do gen-news.mjs sinh ([data-feedback]); trang tai nạn có hệ đánh giá
// riêng (product-reviews.js). Script này gắn cùng khối nhận xét (/feedback.js + /api/nhan-xet) cho các trang còn lại,
// chèn trước </main>, giữa <!-- danh-gia-sao:start/end -->, chạy lại bao nhiêu lần cũng được.
// Không gắn cho: trang noindex (chính sách, form đặt mua), trang không có <main>, file xác minh Google.
// Không ghi số sao cứng vào HTML. feedback.js chỉ hiện điểm khi đã có đánh giá thật.
// CSS: dist/danh-gia.css cắt nguyên khối .fb từ dist/news.css (một nguồn), cộng phần khung cho trang không phải bài viết.
// Chạy SAU mọi script sinh trang, TRƯỚC gen-sitemap: node tools/danh-gia-sao.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const START = '<!-- danh-gia-sao:start -->';
const END = '<!-- danh-gia-sao:end -->';
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
.dgs{padding:8px 0 56px}
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

const slugOf = (rel) => {
  const s = rel.replace(/(^|\/)index\.html$/, '').replace(/\/+$/, '').replace(/\//g, '-');
  return 'trang-' + (s || 'chu');
};

const block = (slug, title) => `${START}
<section class="dgs" aria-label="Đánh giá trang"><div class="dgs-in">
<section class="fb" data-feedback data-endpoint="/api/nhan-xet" data-slug="${slug}" data-title="${esc(title)}" aria-labelledby="fb-h" hidden>
<div class="fb-top"><h2 id="fb-h">Đánh giá của bạn</h2>
<p class="fb-summary" hidden><b class="fb-avg"></b><span class="fb-rate" role="img"><i></i></span><span class="fb-total"></span></p></div>
<form class="fb-form" novalidate>
<fieldset class="fb-field"><legend>Thông tin trên trang này có hữu ích với bạn không?</legend>
<div class="fb-pick"><div class="fb-stars" data-v="0">${[1, 2, 3, 4, 5].map((n) => `<label data-n="${n}"><input type="radio" name="rating" value="${n}">${STAR}<span class="fb-sr">${n} sao</span></label>`).join('')}</div><span class="fb-hint" aria-live="polite">Chọn số sao</span></div>
</fieldset>
<label class="fb-label" for="fb-comment">Nhận xét <span>(không bắt buộc)</span></label>
<textarea id="fb-comment" name="comment" rows="4" maxlength="1000" placeholder="Thông tin nào hữu ích với bạn, hoặc bạn cần thêm thông tin gì?"></textarea>
<label class="fb-label" for="fb-name">Tên hiển thị <span>(không bắt buộc)</span></label>
<input id="fb-name" name="name" maxlength="60" autocomplete="nickname">
<p class="fb-honey" aria-hidden="true"><label>Website <input name="website" tabindex="-1" autocomplete="off"></label></p>
<p class="fb-note">Nhận xét hiển thị công khai ngay sau khi gửi. Không ghi số điện thoại, số hợp đồng hay thông tin cá nhân.</p>
<div class="fb-actions"><button type="submit" class="fb-btn">Gửi đánh giá</button><span class="fb-count" aria-hidden="true">0/1000</span></div>
<p class="fb-msg" role="status" aria-live="polite"></p>
</form>
<div class="fb-done" role="status" hidden><b>Cảm ơn bạn đã đánh giá.</b><p>Đánh giá của bạn đã được ghi nhận.</p></div>
<ul class="fb-list" hidden></ul>
</section>
</div></section>
${END}`;

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
  if (html.includes('data-feedback')) { skip('đã có khối nhận xét của bài'); continue; }
  if (html.includes('product-reviews')) { skip('có hệ đánh giá sản phẩm riêng'); continue; }
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
  const title = (h1 ? h1.replace(/<[^>]+>/g, ' ') : (html.match(/<title>([^<]*)<\/title>/) || [])[1] || rel).replace(/\s+/g, ' ').trim();
  const i = html.lastIndexOf('</main>');
  html = html.slice(0, i) + block(slugOf(rel), title) + '\n' + html.slice(i);
  if (!html.includes('href="/danh-gia.css"')) html = html.replace('</head>', '<link rel="stylesheet" href="/danh-gia.css"></head>');
  if (!html.includes('src="/feedback.js"')) html = html.replace('</head>', '<script src="/feedback.js" defer></script></head>');
  fs.writeFileSync(file, html);
  had ? kept++ : added++;
}
console.log(`danh-gia-sao: gắn mới ${added}, cập nhật ${kept}; bỏ qua`, skipped);
