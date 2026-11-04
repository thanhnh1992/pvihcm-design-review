// Kiến thức · Mạng lưới PVI: danh sách 46 đơn vị trong danh bạ Bảo hiểm PVI, kèm mã số thuế (chủ site giao 04/11/2026).
// Bản chuẩn ở baohiempvi-vn.com (/don-vi-thanh-vien-pvi); trang này khai canonical về đó.
// Dữ liệu: tools/data/don-vi-thanh-vien-pvi.json, chép nguyên từ app/pvi-member-directory.json của baohiempvi-vnwebsite.
// Sửa dữ liệu bên đó thì chép lại file này sang, không gõ tay.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const units = JSON.parse(fs.readFileSync(path.resolve(HERE, '../data/don-vi-thanh-vien-pvi.json'), 'utf8'));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export const post = {
  slug: 'don-vi-thanh-vien-pvi',
  date: '2026-11-04',
  dateText: '04/11/2026',
  cat: 'Kiến thức · Mạng lưới PVI',
  title: `Danh sách ${units.length} đơn vị trong mạng lưới Bảo hiểm PVI 2026`,
  lead: `Danh sách dưới đây tổng hợp ${units.length} mục trong danh bạ mạng lưới của Tổng công ty Bảo hiểm PVI, đối chiếu ngày 26/09/2026: 33 công ty thành viên, 12 chi nhánh/đơn vị chi nhánh và một đơn vị khu vực, kèm địa chỉ, điện thoại và mã số thuế.`,
  image: '/assets/mang-luoi-pvi.webp',
  alt: 'Hình ảnh mô phỏng các văn phòng kết nối trong một mạng lưới tại Việt Nam',
  readMin: 6,
  canonical: 'https://www.baohiempvi-vn.com/don-vi-thanh-vien-pvi',
};

export const crumb = 'Mạng lưới PVI';
export const hero = { name: 'mang-luoi-pvi', w: 1200, h: 630, caption: 'Hình ảnh mô phỏng các văn phòng kết nối trên bản đồ Việt Nam, không xác định địa điểm PVI cụ thể.' };
export const seo = {
  title: `Danh sách ${units.length} đơn vị thành viên Bảo hiểm PVI 2026 | PVI`,
  description: `Tra cứu ${units.length} đơn vị trong mạng lưới Bảo hiểm PVI theo tên, tỉnh thành, địa chỉ, điện thoại và mã số thuế; đối chiếu danh bạ ngày 26/09/2026.`,
};

export const toc = [
  ['danh-sach', 'Danh sách đơn vị'],
  ['tra-cuu', 'Cách tra cứu đầu mối'],
  ['thanh-do', 'PVI Thành Đô và PVI TP.HCM'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: `Danh sách ${units.length} mục có phải đều là công ty thành viên không?`, answer: 'Không. Theo phân loại trong file danh bạ ngày 26/09/2026, có 33 dòng Công ty thành viên, 12 dòng chi nhánh hoặc đơn vị chi nhánh và một dòng đơn vị khu vực PVI Phía Nam.' },
  { question: 'Đây có phải danh sách công ty con PVI Holdings không?', answer: 'Không. Đây là danh sách trong mạng lưới Bảo hiểm PVI. Cơ cấu đầu tư của PVI Holdings là phạm vi khác.' },
  { question: 'Có thể dùng danh sách này để tìm địa chỉ mới nhất không?', answer: 'Địa chỉ và điện thoại được đối chiếu theo danh bạ ngày 26/09/2026. Vì thông tin có thể thay đổi, hãy kiểm tra trang Mạng lưới chính thức và gọi xác nhận trước khi đến.' },
  { question: 'PVI Thành Đô có phải PVI TP Hồ Chí Minh không?', answer: 'Danh bạ liệt kê hai tên riêng. Cần kiểm tra tên đầy đủ trên hợp đồng và thông tin của đúng đơn vị.' },
];

// Nguồn ghi bằng chữ, không gắn link ra ngoài (quy tắc pvihcm.com).
export const sources = [
  ['Mạng lưới chính thức của Tổng công ty Bảo hiểm PVI', 'https://www.pvi.com.vn/vi/network', 'Tổng công ty Bảo hiểm PVI · danh bạ đối chiếu ngày 26/09/2026'],
];

export const related = [
  { href: '/gioi-thieu/', img: 'duong-pho-dien-bien-phu', k: 'Đơn vị', title: 'Giới thiệu Công ty Bảo hiểm PVI Thành Đô', text: 'Trụ sở 473 Điện Biên Phủ, đầu mối tư vấn và bồi thường.' },
];

// Hai cột, mỗi số đều có nhãn chữ: trên điện thoại bảng chuyển thành thẻ xếp dọc (news.css) và ẩn hàng tiêu đề.
const rows = units.map((u, i) => `<tr><td><b>${i + 1}. ${esc(u.name)}</b><br>${esc(u.type)} · ${esc(u.province)}<br>${esc(u.address)}</td><td>Điện thoại: ${esc(u.phone)}${u.taxCode ? `<br>Mã số thuế: ${esc(u.taxCode)}` : ''}</td></tr>`).join('\n');

export function body({ ctaRow }) {
  return `
<p class="kb-first">Đây là danh bạ mạng lưới Bảo hiểm PVI, không phải danh sách công ty con của PVI Holdings. Mỗi đơn vị có địa chỉ, điện thoại và mã số thuế.</p>

<h2 id="danh-sach">Danh sách ${units.length} mục trong danh bạ PVI năm 2026</h2>
<p>Danh sách lấy từ file danh bạ đối chiếu ngày 26/09/2026. Có ${units.length - 1} mục thuộc các nhóm công ty thành viên, chi nhánh và đơn vị chi nhánh; mục thứ ${units.length} là đơn vị khu vực PVI Phía Nam. Địa chỉ và số điện thoại được chép theo danh bạ Bảo hiểm PVI. Một số địa chỉ có thể thay đổi; hãy gọi xác nhận trước khi đến.</p>
<div class="kb-table" role="region" aria-label="Danh sách đơn vị trong mạng lưới Bảo hiểm PVI" tabindex="0"><table data-testid="member-directory">
<thead><tr><th scope="col">Đơn vị và địa chỉ</th><th scope="col">Điện thoại, mã số thuế</th></tr></thead>
<tbody>
${rows}
</tbody></table></div>

<h2 id="tra-cuu">Cách tra cứu địa chỉ và đầu mối chính xác</h2>
<p>Danh bạ còn hiển thị Tổng công ty, Bảo hiểm PVI phía Nam và các văn phòng đại diện chăm sóc khách hàng ở khu vực riêng. Bài này không gộp thêm các văn phòng hoặc Tổng công ty vào ${units.length} mục được liệt kê.</p>
<ol class="kb-steps">
<li>Mở trang Mạng lưới trên website chính thức của Bảo hiểm PVI (ghi ở mục nguồn cuối bài).</li>
<li>Tìm theo tên hoặc tỉnh thành phù hợp.</li>
<li>Đối chiếu địa chỉ và điện thoại; liên hệ xác nhận giờ tiếp nhận và nghiệp vụ trước khi đến.</li>
<li>Nếu cần xử lý hợp đồng đang có, ưu tiên đầu mối cấp đơn ghi trên hợp đồng; khi có tổn thất, dùng kênh bồi thường được hướng dẫn.</li>
</ol>

<h2 id="thanh-do">PVI Thành Đô và PVI TP Hồ Chí Minh không phải cùng một tên</h2>
<p>Danh bạ chính thức liệt kê Bảo hiểm PVI Thành Đô và Bảo hiểm PVI TP. Hồ Chí Minh là hai mục khác nhau. Khi tìm hoặc gửi hồ sơ, hãy đối chiếu đúng tên đơn vị trên hợp đồng thay vì chỉ dựa vào địa bàn thành phố.</p>
<p>Website pvihcm.com là website của Công ty Bảo hiểm PVI Thành Đô, không đại diện thay cho toàn bộ danh bạ của Tổng công ty. Thông tin về đơn vị vận hành và kênh tư vấn được công bố ở trang <a class="kb-link" href="/gioi-thieu/">Giới thiệu</a>.</p>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Cần tư vấn bảo hiểm PVI tại TP.HCM?</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> để PVI Thành Đô tư vấn và chuẩn bị bản chào phí.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
