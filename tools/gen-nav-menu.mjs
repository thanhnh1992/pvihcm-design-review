// Danh sách con cho các mục menu khác "Sản phẩm" (chủ site yêu cầu 23/11/2026: bấm mục nào cũng hiện ngay
// danh sách con để khách chọn nhanh). Ghi vào dist/app.js giữa hai dấu NAV_KHAC (không sửa tay đoạn đó).
// Kiến thức lấy từ HUBS (chỉ hub đã có trang), Tin tức theo 3 mục của trang /tin-tuc/.
// Chạy: node tools/gen-nav-menu.mjs (sau gen-news khi thêm hub mới).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { HUBS } from './data/kien-thuc-hub.mjs';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const hubs = HUBS.filter((h) => fs.existsSync(path.join(DIST, 'kien-thuc', h.slug, 'index.html')));

const MENUS = {
  '/gioi-thieu/': { all: ['/gioi-thieu/', 'Giới thiệu PVI Thành Đô'], items: [
    { href: '/gioi-thieu/', title: 'Về Công ty Bảo hiểm PVI Thành Đô', desc: 'Đơn vị thành viên Tổng công ty Bảo hiểm PVI' },
    { href: '/danh-gia/', title: 'Đánh giá của khách hàng', desc: 'Điểm trên Google và đánh giá trên website' },
    { href: '/#lien-he', title: 'Liên hệ, địa chỉ', desc: 'Trụ sở 473 Điện Biên Phủ, hotline tư vấn' },
  ] },
  '/kien-thuc/': { all: ['/kien-thuc/', 'Tất cả kiến thức'], items: hubs.map((h) => ({ href: `/kien-thuc/${h.slug}/`, title: h.short, desc: h.name })) },
  '/tin-tuc/': { all: ['/tin-tuc/', 'Tất cả tin tức'], items: [
    { href: '/tin-tuc/#tin-san-pham', title: 'Tin sản phẩm', desc: 'Bài viết theo từng sản phẩm bảo hiểm' },
    { href: '/tin-tuc/#phap-ly-moi', title: 'Pháp lý mới', desc: 'Nghị định, thông tư và ngày hiệu lực' },
    { href: '/tin-tuc/#tin-chung', title: 'Tin tức chung', desc: 'Tin đơn vị, khu vực, thông báo' },
  ] },
  '/#boi-thuong': { all: ['/#boi-thuong', 'Xem quy trình bồi thường'], items: [
    { href: '/#boi-thuong', title: 'Quy trình và hồ sơ bồi thường', desc: 'Các bước khi xảy ra sự cố' },
    { href: 'tel:1900545458', title: 'Tổng đài bồi thường 1900 54 54 58', desc: 'Gọi ngay khi có sự cố' },
    { href: 'tel:0938072236', title: 'Tư vấn 0938 072 236', desc: 'Hỏi quyền lợi, hồ sơ trước khi nộp' },
  ] },
};

const appPath = path.join(DIST, 'app.js');
const app = fs.readFileSync(appPath, 'utf8');
const re = /\/\* NAV_KHAC:start \*\/[\s\S]*?\/\* NAV_KHAC:end \*\//;
if (!re.test(app)) throw new Error('app.js thiếu dấu NAV_KHAC');
fs.writeFileSync(appPath, app.replace(re, () => `/* NAV_KHAC:start */\nconst NAV_KHAC = ${JSON.stringify(MENUS)};\n/* NAV_KHAC:end */`));
console.log('app.js: menu con', Object.entries(MENUS).map(([k, v]) => `${k} ${v.items.length}`).join(', '));
