import fs from 'node:fs';
import { page, SITE, t, ZALO } from './chrome.mjs';
import { products } from './data/san-pham.mjs';

const parent = '/san-pham/';
const path = `${parent}bao-hiem-trach-nhiem/`;
const cargo = `${parent}hang-hoa-xuat-nhap-khau/`;
const entry = products.find((product) => product.href === path);

const items = [
  {
    id: 'ben-thu-ba', title: 'Bảo hiểm trách nhiệm bên thứ ba',
    audience: 'Doanh nghiệp và nhà thầu có hoạt động có thể gây thiệt hại cho người hoặc tài sản bên ngoài.',
    description: 'Chọn mục này nếu anh chị cần xác định trách nhiệm bồi thường cho người khác trong một công việc cụ thể. Khi hỏi phí, hãy nêu công việc, địa điểm và đối tượng có thể bị ảnh hưởng.',
  },
  {
    id: 'cong-cong', title: 'Bảo hiểm trách nhiệm công cộng',
    audience: 'Cửa hàng, văn phòng, khách sạn và cơ sở thường xuyên đón khách hoặc đối tác.',
    description: 'Dùng để xem xét trách nhiệm bồi thường khi hoạt động kinh doanh tại địa điểm được bảo hiểm gây thương tật hoặc thiệt hại tài sản của bên thứ ba.',
  },
  {
    id: 'san-pham', title: 'Bảo hiểm trách nhiệm sản phẩm',
    audience: 'Doanh nghiệp sản xuất, nhập khẩu hoặc phân phối hàng hóa.',
    description: 'Xem xét trách nhiệm của doanh nghiệp khi sản phẩm đã cung cấp gây thương tật hoặc làm hư hỏng tài sản của bên thứ ba. Khi hỏi phí, hãy gửi danh sách sản phẩm và thị trường tiêu thụ.',
  },
  {
    id: 'nghe-nghiep', title: 'Bảo hiểm trách nhiệm nghề nghiệp',
    audience: 'Cá nhân hành nghề và tổ chức cung cấp dịch vụ chuyên môn.',
    description: 'Dành cho nhu cầu bảo hiểm trách nhiệm phát sinh từ sai sót, sơ suất hoặc thiếu sót khi cung cấp dịch vụ. Nêu rõ ngành nghề và công việc cần bảo hiểm để PVI đối chiếu quy tắc phù hợp.',
  },
  {
    id: 'giai-thuong-golf', title: 'Bảo hiểm bồi thường giải thưởng golf',
    audience: 'Ban tổ chức và nhà tài trợ giải golf.',
    description: 'Tư vấn phương án bảo hiểm cho giá trị giải thưởng golf, chẳng hạn Hole-in-One. Để PVI xem xét, hãy gửi thể lệ, ngày tổ chức, hố áp dụng và giá trị giải thưởng dự kiến.',
  },
  {
    id: 'giam-doc', title: 'Bảo hiểm trách nhiệm giám đốc và cán bộ quản lý (D&O)',
    audience: 'Doanh nghiệp cần tư vấn cho thành viên hội đồng quản trị, ban điều hành và cán bộ quản lý.',
    description: 'Trao đổi với PVI về nhu cầu bảo hiểm khi có khiếu nại liên quan đến quyết định hoặc hành vi trong vai trò quản lý. Hãy cho biết các chức danh cần bảo hiểm và giới hạn trách nhiệm mong muốn.',
  },
  {
    id: 'o-nhiem-moi-truong', title: 'Bảo hiểm trách nhiệm ô nhiễm môi trường',
    audience: 'Doanh nghiệp sản xuất, lưu kho hoặc vận hành cơ sở có nguy cơ xảy ra sự cố ô nhiễm.',
    description: 'Tư vấn trách nhiệm với bên thứ ba khi xảy ra sự cố ô nhiễm. PVI cần biết hoạt động tại cơ sở, vật liệu đang lưu trữ và biện pháp phòng ngừa để xem xét phương án.',
  },
  {
    id: 'nguoi-su-dung-lao-dong', title: 'Bảo hiểm trách nhiệm người sử dụng lao động',
    audience: 'Doanh nghiệp có người lao động làm việc tại văn phòng, nhà xưởng hoặc công trường.',
    description: 'Tư vấn trách nhiệm bồi thường của người sử dụng lao động khi người lao động bị thương trong quá trình làm việc. Khi hỏi phí, hãy chuẩn bị số lao động, loại công việc và địa điểm làm việc.',
  },
  {
    id: 'chu-nuoi-cho', title: 'Bảo hiểm trách nhiệm dân sự chủ nuôi chó',
    audience: 'Cá nhân cần tư vấn bảo hiểm trách nhiệm khi chó mình nuôi gây sự cố cho người khác.',
    description: 'PVI xem xét trách nhiệm bồi thường đối với bên thứ ba khi có tai nạn do chó của người được bảo hiểm gây ra, theo điều kiện của hợp đồng.',
  },
  {
    id: 'giao-nhan', title: 'Bảo hiểm trách nhiệm giao nhận',
    audience: 'Doanh nghiệp giao nhận hàng hóa, đại lý giao nhận vận tải và đơn vị logistics.',
    description: 'Tư vấn trách nhiệm pháp lý của doanh nghiệp khi thực hiện dịch vụ giao nhận. Để xem xét phương án, PVI cần biết vai trò của doanh nghiệp, công đoạn đảm nhận và loại chứng từ vận tải phát hành.',
    related: cargo,
  },
];

const list = items.map(({ id, title, audience, description, related }) => `
  <details class="liab-item" id="${id}">
    <summary><h2>${t(title)}</h2></summary>
    <div class="liab-body">
      <p><strong>Phù hợp với</strong> ${t(audience)}</p>
      <p>${t(description)}</p>${related ? `
      <p>Nếu cần bảo hiểm cho chính lô hàng, xem <a href="${related}">Bảo hiểm hàng hóa xuất nhập khẩu</a>.</p>` : ''}
      <a class="fire-btn fire-btn-red" href="${ZALO}" target="_blank" rel="nofollow" aria-label="Nhận tư vấn qua Zalo về ${t(title)}">Nhận tư vấn qua Zalo</a>
    </div>
  </details>`).join('');

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE + '/' },
    { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: SITE + parent },
    { '@type': 'ListItem', position: 3, name: entry.title, item: SITE + path },
  ],
};

const related = products.filter((product) => product.href !== path).map((product) =>
  `<li><a href="${product.href}">${t(product.title)}</a></li>`).join('');

const html = page({
  path,
  title: 'Bảo hiểm trách nhiệm PVI | PVI Thành Đô',
  description: 'Xem 10 mục bảo hiểm trách nhiệm PVI, gồm công cộng, sản phẩm, nghề nghiệp, giám đốc và giao nhận. Liên hệ PVI Thành Đô để được tư vấn.',
  image: `/assets/${entry.img}.webp`,
  bodyClass: 'liab-page',
  extraCss: '<link rel="stylesheet" href="/trach-nhiem.css">',
  head: `<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>`,
  main: `
<section class="liab-hero">
  <div class="liab-wrap">
    <nav class="liab-crumb" aria-label="Đường dẫn">
      <a href="/">Trang chủ</a><span aria-hidden="true">/</span>
      <a href="${parent}">Sản phẩm</a><span aria-hidden="true">/</span>
      <span aria-current="page">Trách nhiệm</span>
    </nav>
    <h1>Bảo hiểm trách nhiệm PVI</h1>
    <p>Chọn loại bảo hiểm để xem phù hợp với ai và cần chuẩn bị gì khi hỏi phí.</p>
  </div>
</section>
<section class="liab-wrap liab-list" aria-label="Các loại bảo hiểm trách nhiệm và bảo hiểm giải thưởng golf">${list}
  <p class="liab-note">Phạm vi, điều kiện và phí bảo hiểm theo phương án PVI xác nhận cho từng hồ sơ.</p>
</section>
<section class="liab-wrap liab-related">
  <h2>Sản phẩm bảo hiểm khác</h2>
  <ul>${related}</ul>
  <p><a href="${parent}">Xem tất cả sản phẩm</a></p>
</section>`,
});

const output = new URL(`../dist${path}`, import.meta.url);
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(new URL('index.html', output), html);
console.log(path, items.length, 'mục');
