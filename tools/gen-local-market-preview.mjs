import fs from 'node:fs';
import { renderLocalProduct } from './local-product-preview.mjs';
import { articlesForArea } from './data/local-product-drafts.mjs';
import { profiles } from './data/local-market-profiles.mjs';
import { page, esc } from './chrome.mjs';
import { formatVnd, tndsVehicleClasses } from './data/tnds.mjs';
import { localBreadcrumb, localPageSchema } from './local-market-schema.mjs';

const units = JSON.parse(fs.readFileSync(new URL('./data/don-vi-thanh-vien-pvi.json', import.meta.url), 'utf8'));
const photoManifest = JSON.parse(fs.readFileSync(new URL('./data/local-market-covers.json', import.meta.url), 'utf8'));
const images = new Map(photoManifest.map(item => [item.stem, item]));
const badges = { xe:'🚘', doanhnghiep:'🏭', connguoi:'🛡️', mua:'📝', diachi:'📍', suco:'☎', faq:'💬' };
const icon = key => '<span aria-hidden="true">' + badges[key] + '</span> ';
const groups = [
  ['xe','Bảo hiểm xe ô tô',[
    ['tndsoto','Bảo hiểm TNDS ô tô bắt buộc','Tra phí theo loại xe, số chỗ hoặc tải trọng và mục đích sử dụng.','/san-pham/bao-hiem-bat-buoc/'],
    ['vatchatxeoto','Bảo hiểm vật chất xe ô tô','Xem quyền lợi theo giá trị xe, mức khấu trừ và điều khoản bổ sung.','/san-pham/bao-hiem-vat-chat-xe/']]],
  ['doanhnghiep','Bảo hiểm nhà xưởng, công trình và hàng hóa',[
    ['chaynobatbuoc','Bảo hiểm cháy nổ bắt buộc','Đối chiếu cơ sở thuộc diện phải mua và tra phí theo hạng mục.','/san-pham/chay-no-bat-buoc/'],
    ['taisannhaxuong','Bảo hiểm tài sản nhà xưởng','Lập danh mục nhà xưởng, máy móc và hàng hóa cần bảo hiểm.','/san-pham/chay-no-bat-buoc/'],
    ['congtrinhlapdat','Bảo hiểm công trình và lắp đặt','Khai giá trị hạng mục và tiến độ thi công hoặc chạy thử.','/san-pham/bao-hiem-cong-trinh/'],
    ['hanghoaxuatnhapkhau','Bảo hiểm hàng hóa xuất nhập khẩu','Chuẩn bị giá trị lô hàng, hành trình và chứng từ liên quan.','/san-pham/hang-hoa-xuat-nhap-khau/']]],
  ['connguoi','Bảo hiểm công nhân, sức khỏe và du lịch',[
    ['nguoilaodongthicong','Bảo hiểm người lao động thi công','Chuẩn bị danh sách, công việc và thời gian thi công.','/san-pham/bao-hiem-bat-buoc/'],
    ['tainan2424','Bảo hiểm tai nạn 24/24','Chọn mức bảo hiểm phù hợp cho cá nhân hoặc nhóm lao động.','/san-pham/bao-hiem-tai-nan/'],
    ['suckhoe','Bảo hiểm sức khỏe','So sánh chương trình nội trú, ngoại trú và bảo lãnh viện phí.','/san-pham/bao-hiem-suc-khoe/'],
    ['dulichquocte','Bảo hiểm du lịch quốc tế','Đối chiếu chương trình theo điểm đến và thời gian chuyến đi.','/san-pham/bao-hiem-du-lich/']]],
];

const css = '<link rel="stylesheet" href="/binhduong/landing.css">';
const publish = process.argv.includes('--publish');
const preview = '<meta name="local-market-preview" content="' + !publish + '" data-internal-links-only>' + (publish ? '' : '<meta name="robots" content="noindex,follow">');
const write = (route, html) => {
  const directory = 'dist' + route;
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(directory + 'index.html', html);
};
const groupLinks = groups.map(([id,label]) => '<a href="#nhom-' + id + '">' + esc(label) + '</a>').join('');
const groupNav = '<nav class="bd-jumps" aria-label="Nhóm sản phẩm">' + groupLinks + '</nav>';
const groupHtml = (profile, route, localProducts, feeExample = '') => groups.map(([id,label,products]) => {
  const items = products.map(([slug, title, detail]) => {
    const article = localProducts.get(slug);
    const link = route + slug + '/';
    const label = title + ' tại ' + profile.name;
    const cover = images.get(article.image);
    const picture = hasPicture(cover) ? '<div class="bd-product-photo">' + photoHtml(cover, '(max-width:620px) calc(100vw - 40px), (max-width:1248px) 48vw, 588px') + '</div>' : '';
    const [action, href] = article.actions[0];
    const destination = href.startsWith('tel:') ? route + '#nhan-bao-phi' : href;
    return `<li class="bd-product">${picture}<div class="bd-product-copy"><h3><a class="bd-product-title" href="${link}">${esc(label)}</a></h3><p>${esc(detail)}</p>
      <div class="bd-product-links"><a class="bd-product-primary" href="${esc(destination)}">${esc(action)} <span aria-hidden="true">→</span></a><a class="bd-product-detail" href="${link}" aria-label="Xem chi tiết ${esc(label)}">Xem chi tiết</a></div></div></li>`;
  }).join('');
  return '<section class="bd-group" aria-labelledby="nhom-' + id + '"><h2 id="nhom-' + id + '">' + icon(id) + esc(label) + '</h2>' + (id === 'xe' ? feeExample : '') + '<ul>' + items + '</ul></section>';
}).join('');
function photoHtml(photo, sizes, eager = false) {
  const path = '/assets/' + photo.stem;
  return `<img src="${path}.webp" srcset="${path}-480.webp 480w, ${path}-800.webp 800w, ${path}.webp 1200w" sizes="${sizes}" width="1200" height="630" alt="${esc(photo.alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}
const section = (key, id, heading, content) => '<section class="bd-section bd-guide' + (key === 'faq' ? ' bd-faq' : '') + '" aria-labelledby="' + id + '"><h2 id="' + id + '">' + icon(key) + esc(heading) + '</h2>' + content + '</section>';
const para = t => '<p>' + esc(t) + '</p>';
const list = values => '<ul>' + values.map(v => '<li>' + esc(v) + '</li>').join('') + '</ul>';
const phone = value => /\d/.test(value) ? '<a href="tel:' + value.replace(/\D/g, '') + '">' + esc(value) + '</a>' : '';
const contact = '<a class="bd-button" href="tel:0938072236">Liên hệ tư vấn ngay</a>';
const hasPicture = item => item && fs.existsSync('dist/assets/' + item.stem + '.webp');
if (publish) {
  for (const [slug, profile] of Object.entries(profiles)) {
    const stems = ['local-' + slug + '-bia', ...Array.from(articlesForArea(slug, profile).values(), article => article.image)];
    for (const stem of stems) {
      if (!images.has(stem) || ['', '-480', '-800'].some(suffix => !fs.existsSync('dist/assets/' + stem + suffix + '.webp'))) {
        throw new Error('Thiếu ảnh khi xuất bản ' + stem);
      }
    }
  }
}
for (const [slug, profile] of Object.entries(profiles)) {
  const photo = images.get('local-' + slug + '-bia');
  if (!hasPicture(photo)) continue;
  const route = '/' + slug + '/';
  const catalog = route + 'sanpham/';
  const localProducts = articlesForArea(slug, profile);
  const title = 'Mua bảo hiểm PVI tại ' + profile.name;
  const productTitle = 'Sản phẩm bảo hiểm PVI tại ' + profile.name;
  const unit = units.find(item=>item.name === 'Bảo hiểm PVI ' + profile.unit);
  if (!unit) throw new Error('Thiếu đơn vị ' + profile.unit);
  const updatedOfficeAddresses = {
    'Đông Nam Bộ': 'Tầng 12, Tòa nhà Sonadezi, số 1, đường 1, khu phố An Hào, phường Trấn Biên, thành phố Đồng Nai',
    'Cà Mau': 'Tầng 03, Tòa nhà Vikki Bank Cà Mau, số 03 đường An Dương Vương, phường Tân Thành, tỉnh Cà Mau',
  };
  const address = updatedOfficeAddresses[profile.unit] || unit.address;
  const officePhone = !/\d/.test(unit.phone) || profile.unit === 'Lâm Đồng' ? '' : profile.unit === 'Đông Nam Bộ' ? '0251 3918 691' : unit.phone;
  const local = { name:profile.name, unit:{...unit,address,phone:officePhone}, addressPage:route + '#dia-chi-pvi' };
  const office = { ...local.unit, key:profile.unit.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/đ/g,'d').replaceAll(' ', '-') };
  const img = '/assets/' + photo.stem;
  const desc = title + ' cho xe ô tô, cá nhân và doanh nghiệp. Xem nhóm sản phẩm, địa chỉ văn phòng PVI và cách nhận báo phí.';
  const area = { name:profile.area, path:route };
  const parents = { '/binhduong/':'Bình Dương', '/dongnai/':'Đồng Nai', '/vungtau/':'Vũng Tàu', '/kiengiang/':'Kiên Giang' };
  const children = Object.entries(profiles).filter(([, child]) => child.parent === route);
  const trail = [['Trang chủ', '/'], ...(profile.parent ? [[parents[profile.parent] || 'Khu vực phục vụ', profile.parent]] : []), [profile.name, route]];
  const catalogTrail = [...trail,[productTitle,catalog]];
  const catalogProducts = groups.flatMap(([, , products]) => products.map(([id, name]) => [name + ' tại ' + profile.name, route + id + '/']));
  const officeInfo = '<p>Văn phòng PVI tham khảo: <strong>' + esc(unit.name) + '</strong>, ' + esc(address) + '.</p>' + (phone(officePhone) ? '<p>Điện thoại văn phòng: ' + phone(officePhone) + '</p>' : '');
  const faqs = [
    {question:'Mua bảo hiểm PVI tại ' + profile.name + ' ở đâu?',answer:'Khách tại ' + profile.area + ' có thể gọi tư vấn theo số 0938 072 236. Văn phòng tham khảo: ' + unit.name + ' tại ' + address + '. Nên gọi trước khi đến.'},
    {question:'Cần gửi thông tin gì để nhận báo phí?',answer:profile.needs[0]},
    {question:'Giấy tờ vẫn ghi địa chỉ cũ thì khai thế nào?',answer:'Gửi nguyên thông tin trên giấy tờ để đối chiếu và cung cấp tên phường, xã hiện hành nếu đã xác định.'},
  ];
  const sections = [
    ['bieu-phi','Biểu phí'],['cach-mua','Cách mua'],['dai-ly','Kiểm tra đại lý'],['nhan-bao-phi','Nhận báo phí'],['su-co','Khi có sự cố'],['dia-chi-pvi','Địa chỉ PVI']
  ];
  const [privateUse] = tndsVehicleClasses.find(group => group.id === 'passenger').usages;
  const feeExample = '<div class="bd-fees"><div><h3>Phí TNDS ô tô không kinh doanh vận tải</h3><p>Mức phí cơ sở một năm, chưa gồm VAT.</p></div><dl>' +
    privateUse.rows.slice(0, 2).map(row => '<div><dt>' + esc(row.label) + '</dt><dd>' + formatVnd(row.baseFee) + '</dd></div>').join('') +
    '</dl><p class="bd-source">Căn cứ Phụ lục I Nghị định 67/2023/NĐ-CP, đối chiếu Văn bản hợp nhất 64/2026/VBHN-NĐ-BTC.</p></div>';
  const intro = '<div class="bd"><section class="bd-hero"><div class="bd-wrap bd-hero-grid"><div class="bd-intro">' + localBreadcrumb(trail) + '<h1>' + esc(title) + '</h1>' + para('Cá nhân và doanh nghiệp ở ' + profile.area + ' có thể chọn bảo hiểm cho xe, tài sản hoặc con người và nhận báo phí theo hồ sơ.') + '<div class="bd-actions"><a class="bd-button" href="' + catalog + '">Xem sản phẩm bảo hiểm</a><a class="bd-button bd-secondary" href="#nhan-bao-phi">Nhận báo phí</a></div><p class="bd-location"><strong>' + esc(unit.name) + '</strong><br>' + esc(address) + '</p></div><figure class="bd-hero-photo">' + photoHtml(photo, '(max-width:800px) 92vw, 550px', true) + '<figcaption>' + esc(photo.caption) + '</figcaption></figure></div></section>';
  const body = '<div class="bd-wrap bd-body"><nav class="bd-jumps bd-page-nav" aria-label="Nội dung trang">' + sections.map(([id,label])=>'<a href="#' + id + '">' + esc(label) + '</a>').join('') + '</nav>' +
    '<section class="bd-section" id="san-pham" aria-labelledby="bieu-phi"><h2 id="bieu-phi">' + icon('xe') + 'Biểu phí bảo hiểm PVI tại ' + esc(profile.name) + '</h2><div class="bd-local-intro">' + list(profile.needs) + '</div></section>' +
    groupNav + groupHtml(profile, route, localProducts, feeExample) +
    section('mua','cach-mua','Ba bước mua bảo hiểm tại ' + profile.name,
      para('Khách hàng mua bảo hiểm PVI tại ' + profile.name + ' có thể đến văn phòng ' + unit.name + ' tại ' + address + ' hoặc gọi chuyên viên để được hướng dẫn mua online.') +
      '<ol><li>Chọn nghiệp vụ, gửi thông tin đối tượng bảo hiểm và ngày cần hiệu lực.</li><li>Đối chiếu phí, quyền lợi, loại trừ và mức khấu trừ nếu có.</li><li>Kiểm tra thông tin trên chứng từ trước khi thanh toán và lưu giấy chứng nhận hoặc hợp đồng.</li></ol>' +
      '<div class="bd-actions">' + contact + '<a class="bd-button bd-secondary" href="/san-pham/bao-hiem-o-to/dat-mua/">Đặt mua TNDS ô tô</a></div>' +
      '<h3>Ưu điểm khi mua online</h3>' + list(['Tiết kiệm thời gian đi lại khi ở xa điểm tiếp nhận hồ sơ.', 'Nhận báo phí theo hồ sơ và xem điều kiện, quyền lợi trước khi quyết định mua.', 'Thanh toán trực tiếp cho đơn vị bảo hiểm theo hướng dẫn chính thức và nhận giấy chứng nhận điện tử khi đơn được phát hành.'])) +
    section('mua','dai-ly','Kiểm tra đại lý bảo hiểm tại ' + profile.name, list([
      'Xác nhận đại lý được phân phối sản phẩm PVI bạn định mua.',
      'Đối chiếu đơn vị cấp, tên bên mua, đối tượng bảo hiểm và thời hạn với báo phí.',
      'Kiểm tra thông tin thanh toán trên chứng từ trước khi chuyển tiền.',
    ])) +
    '<section class="bd-section bd-quote" aria-labelledby="nhan-bao-phi"><div><h2 id="nhan-bao-phi">' + icon('mua') + 'Nhận báo phí và hỏi ưu đãi</h2>' + para('Gửi tên sản phẩm, địa chỉ xe hoặc tài sản và ngày cần hiệu lực để chuyên viên kiểm tra phương án.') + '</div><div class="bd-actions bd-quote-actions">' + contact + '</div></section>' +
    section('suco','su-co','Khi có sự cố','<p>Đảm bảo an toàn trước. Khi có thể, giữ hình ảnh và giấy tờ liên quan rồi gọi <a href="tel:1900545458">1900 54 54 58</a> để nhận hướng dẫn giám định. Phạm vi bồi thường theo hợp đồng bảo hiểm.</p>') +
    section('faq','cau-hoi','Câu hỏi thường gặp',faqs.map(q=>'<details><summary>' + esc(q.question) + '</summary>' + para(q.answer) + '</details>').join('')) +
    '<section class="bd-section bd-detail-location" aria-labelledby="dia-chi-pvi"><h2 id="dia-chi-pvi">' + icon('diachi') + 'Địa chỉ PVI phục vụ ' + esc(profile.name) + '</h2>' + officeInfo + para(profile.current) + '</section>' +
    '<section class="bd-section bd-industrial" aria-labelledby="dia-ban"><h2 id="dia-ban">' + icon('doanhnghiep') + 'Địa bàn và nhu cầu bảo hiểm tại ' + esc(profile.name) + '</h2>' +
    (profile.figure ? '<p><strong>' + esc(profile.figure) + '</strong> · ' + esc(profile.period) + '.</p>' : '') + '<ul class="bd-industrial-list">' +
    profile.rows.map(([name,uses])=>'<li><strong>' + esc(name) + '</strong><span>' + esc(uses) + '</span></li>').join('') + '</ul><p class="bd-source">' + esc([...new Set([profile.pop, profile.law, 'Danh bạ hệ thống Bảo hiểm PVI.'].filter(Boolean))].join(' · ')) + '</p>' +
    (children.length ? '<nav class="bd-jumps" aria-label="Trang địa bàn liên quan">' + children.map(([key,child]) => '<a href="/' + key + '/">Xem bảo hiểm PVI tại ' + esc(child.name) + '</a>').join('') + '</nav>' : '') + '</section>' +
    '</div></div>';
  const common = {bodyClass:'fire bd-page',extraCss:css,localFooter:local};
  const catalogDescription = 'Xem các nhóm sản phẩm bảo hiểm PVI tại ' + profile.name + ' và tài liệu phí, điều kiện và hướng dẫn mua.';
  write(route,page({...common,path:route,title,description:desc,image:img+'.webp',main:intro+body,head:preview+localPageSchema({path:route,title,description:desc,trail,area,office,photo,questions:faqs})}));
  write(catalog,page({...common,path:catalog,title:productTitle,image:img+'.webp',description:catalogDescription,main:'<div class="bd"><div class="bd-wrap bd-body bd-catalog">'+localBreadcrumb(catalogTrail)+'<h1>'+esc(productTitle)+'</h1><p class="bd-summary">Chọn sản phẩm để xem biểu phí tham khảo và cách nhận báo phí tại '+esc(profile.name)+'.</p>'+groupNav+groupHtml(profile,route,localProducts)+'<div class="bd-actions"><a class="bd-button" href="'+route+'#bieu-phi">Xem biểu phí</a><a class="bd-button bd-secondary" href="'+route+'#nhan-bao-phi">Nhận báo phí</a></div></div></div>',head:preview+localPageSchema({path:catalog,title:productTitle,description:catalogDescription,trail:catalogTrail,area,office,products:catalogProducts})}));
  for (const [, , products] of groups) for (const product of products) {
    const article = localProducts.get(product[0]);
    if (!article) continue;
    const related = products.filter(([id]) => id !== product[0] && localProducts.has(id)).map(([id, name]) => [name + ' tại ' + profile.name, route + id + '/']);
    write(route + product[0] + '/', renderLocalProduct({article, product, profile, route, catalog, common, officeInfo, area, office, trail:catalogTrail, preview, photo:hasPicture(images.get(article.image)) ? images.get(article.image) : null, related}));
  }
  console.log(route+' · '+catalog+' · '+localProducts.size+' sản phẩm local');
}
