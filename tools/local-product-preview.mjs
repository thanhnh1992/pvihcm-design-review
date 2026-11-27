import { esc, page } from './chrome.mjs';
import { tndsVehicleClasses, feeWithVat, formatVnd } from './data/tnds.mjs';
import { localBreadcrumb, localPageSchema } from './local-market-schema.mjs';

const headings = [
  ['pham-vi', '🛡️', 'Phạm vi và đối tượng bảo hiểm'],
  ['bieu-phi', '🧾', 'Phí và cách tra'],
  ['mua-bao-hiem', '📝', 'Mua mới hoặc tái tục'],
  ['boi-thuong', '☎', 'Xử lý khi có sự cố'],
  ['dia-chi-pvi', '📍', 'Địa chỉ và đầu mối địa phương'],
  ['cau-hoi', '💬', 'Câu hỏi thường gặp'],
  ['nguon', '📚', 'Nguồn tham khảo'],
  ['san-pham-lien-quan', '🚘', 'Sản phẩm liên quan'],
  ['lien-he-tu-van', '📝', 'Nhận báo phí'],
];
const para = text => '<p>' + esc(text) + '</p>';
const list = items => '<ul>' + items.map(text => '<li>' + esc(text) + '</li>').join('') + '</ul>';
const section = ([id, icon, label], content, classes = 'bd-guide') => '<section class="bd-section ' + classes + '" aria-labelledby="' + id + '"><h2 id="' + id + '"><span aria-hidden="true">' + icon + '</span> ' + esc(label) + '</h2>' + content + '</section>';
const link = (href, label, classes = 'bd-link') => '<a class="' + classes + '" href="' + esc(href) + '">' + esc(label) + '</a>';
const actionRow = actions => '<div class="bd-actions">' + actions.map(([label, href], i) => link(href, label, i ? 'bd-button bd-secondary' : 'bd-button')).join('') + '</div>';
const phone = ['Liên hệ tư vấn ngay','tel:0938072236'];

function tndsTable() {
  const [privateUse, businessUse] = tndsVehicleClasses.find(group => group.id === 'passenger').usages;
  const rows = [
    ['Không kinh doanh vận tải', privateUse.rows[0]], ['Không kinh doanh vận tải', privateUse.rows[1]],
    ['Kinh doanh vận tải', businessUse.rows[0]], ['Kinh doanh vận tải', businessUse.rows[2]],
    ['Xe tải chở hàng', tndsVehicleClasses.find(group => group.id === 'cargo').usages[0].rows[0]],
  ];
  return '<div class="tn-table" role="region" aria-label="Ví dụ phí TNDS ô tô một năm" tabindex="0"><table><caption>Phí TNDS ô tô theo năm · Một số nhóm xe phổ biến</caption><thead><tr><th scope="col">Mục đích sử dụng</th><th scope="col">Loại xe</th><th scope="col">Chưa VAT</th><th scope="col">Gồm VAT 10%</th></tr></thead><tbody>' +
    rows.map(([usage,row]) => '<tr><td>' + esc(usage) + '</td><th scope="row">' + esc(row.label) + '</th><td>' + formatVnd(row.baseFee) + '</td><td>' + formatVnd(feeWithVat(row.baseFee)) + '</td></tr>').join('') +
    '</tbody></table></div>' + para('Căn cứ Phụ lục I Nghị định 67/2023/NĐ-CP và Văn bản hợp nhất 64/2026/VBHN-NĐ-BTC.');
}

export function renderLocalProduct({ article, product, profile, route, catalog, common, officeInfo, area, office, trail, preview, photo, related }) {
  const [slug, label, , root] = product;
  const path = route + slug + '/';
  const title = label + ' tại ' + profile.name;
  const description = title + '. ' + article.titleSuffix + ', hồ sơ tái tục và đầu mối hỗ trợ tại địa phương.';
  const asset = photo ? '/assets/' + photo.stem : '';
  const fullTrail = [...trail, [title, path]];
  const nav = localBreadcrumb(fullTrail);
  const questions = article.questions.map(([question, answer]) => ({question, answer}));
  const [scope, fee, buy, claim, location, faq, sources, siblings, quote] = headings;
  const toc = [scope, fee, claim, buy, faq, sources, location, quote, siblings];
  const quoteAction = ['Nhận báo phí theo hồ sơ', '#lien-he-tu-van'];
  const primary = article.actions[0][1].startsWith('tel:') ? ['Nhận báo phí', quoteAction[1]] : article.actions[0];
  const next = slug === 'tndsoto' ? ['Mua ngay', '/san-pham/bao-hiem-o-to/dat-mua/'] : phone;
  const cover = photo ? '<figure class="bd-hero-photo"><img src="' + asset + '.webp" srcset="' + asset + '-480.webp 480w, ' + asset + '-800.webp 800w, ' + asset + '.webp 1200w" sizes="(max-width:800px) 92vw, 550px" width="1200" height="630" fetchpriority="high" decoding="async" alt="' + esc(photo.alt) + '"><figcaption>' + esc(photo.caption) + '</figcaption></figure>' : '';
  const main = '<div class="bd bd-product-page"><section class="bd-hero"><div class="bd-wrap' + (photo ? ' bd-hero-grid' : '') + '"><div class="bd-intro">' + nav + '<h1>' + esc(title) + '</h1>' +
    para(article.lead) + actionRow([primary, next]) + '</div>' + cover + '</div></section><div class="bd-wrap bd-body">' +
    '<nav class="bd-detail-toc" aria-label="Mục lục"><details open><summary>Mục lục</summary><ol>' + toc.map(([id,,label]) => '<li>' + link('#'+id,label) + '</li>').join('') + '</ol></details></nav>' +
    section(scope, article.scope.map(para).join('') + '<div class="bd-actions">' + link(root, article.referenceLabel || 'Xem chi tiết sản phẩm PVI', 'bd-button bd-secondary') + '</div>') +
    section(fee, para(article.fee) + (slug === 'tndsoto' ? tndsTable() : '') + actionRow([...article.actions.filter(([,href]) => !href.startsWith('tel:')), quoteAction])) +
    section(claim, article.claim.map(para).join('') + '<p>Tổng đài bồi thường PVI ' + link('tel:1900545458','1900 54 54 58') + '.</p>') +
    section(buy, list(article.docs) + actionRow([next])) +
    section(faq, questions.map(({question,answer}) => '<details><summary>' + esc(question) + '</summary>' + para(answer) + '</details>').join(''), 'bd-guide bd-faq') +
    section(sources, list([...article.sources, 'Danh bạ hệ thống Bảo hiểm PVI.'])) +
    section(location, officeInfo + para('Khách hàng mua ' + label.charAt(0).toLowerCase() + label.slice(1) + ' tại ' + profile.name + ' có thể đến trực tiếp địa chỉ trên hoặc gọi chuyên viên để được hướng dẫn qua PVI Online.') + '<h3>Ưu điểm khi mua online</h3>' + list(['Tiết kiệm thời gian đi lại khi ở xa văn phòng.', 'Xem báo phí và quyền lợi trước khi quyết định.', 'Thanh toán trực tiếp cho đơn vị bảo hiểm theo hướng dẫn chính thức và nhận giấy chứng nhận điện tử khi đơn được phát hành.']) + link('#lien-he','Xem thông tin văn phòng ở chân trang'), 'bd-guide bd-detail-location') +
    '<section class="bd-section bd-quote" aria-labelledby="' + quote[0] + '"><div><h2 id="' + quote[0] + '"><span aria-hidden="true">' + quote[1] + '</span> ' + quote[2] + '</h2>' + para('Gửi thông tin theo mục mua mới hoặc tái tục để chuyên viên kiểm tra phương án và thời điểm có thể phát hành.') + '</div><div class="bd-actions bd-quote-actions">' + link(phone[1], phone[0], 'bd-button') + '</div></section>' +
    section(siblings, (related.length ? '<ul>' + related.map(([name,href]) => '<li>' + link(href,name) + '</li>').join('') + '</ul>' : '') + '<p class="bd-return">' + link(catalog, 'Xem danh mục sản phẩm tại ' + profile.name) + '</p>', 'bd-guide bd-sibling-products') +
    '</div></div>';
  const image = photo ? '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="' + esc(photo.alt) + '">' : '';
  const schema = localPageSchema({path,title,description,trail:fullTrail,area,office,photo,questions,serviceType:label});
  return page({...common,extraCss:common.extraCss+'<link rel="stylesheet" href="/tinh/tinh.css"><link rel="stylesheet" href="/binhduong/product-detail.css">',path,title:title+' | '+article.titleSuffix,description,image:photo ? asset+'.webp' : null,main,
    head:preview+(photo ? '' : '<meta name="local-cover-status" content="pending">')+image+schema});
}
