// Các thẻ sản phẩm chạy vòng ở đầu trang chủ (khối .orbit trong .hero-stage).
// THÊM SẢN PHẨM: thêm một dòng vào mảng dưới đây, đặt ảnh vào dist/assets/<img>.webp
// (nên có thêm bản <img>-480.webp và <img>-800.webp), rồi chạy: node tools/gen-hero-orbit.mjs
// Vòng quay tự chia đều cho số thẻ, không cần sửa CSS hay JS.
//   href  : đường dẫn trang sản phẩm nội bộ (/...), hoặc https://www.baohiempvi-vn.com/... / https://zalo.me/... (mở tab mới)
//   title : tên hiện trên nhãn thẻ
//   short : (tùy chọn) tên ngắn cho điện thoại hẹp, khi title quá dài
//   img   : tên file ảnh trong dist/assets, không ghi đuôi .webp
//   alt   : mô tả ảnh
//   soon  : (tùy chọn) true khi trang sản phẩm chưa có: thẻ là nút, bấm vào hiện "Coming soon – Sắp ra mắt"
export const heroProducts = [
  { href: '/san-pham/bao-hiem-bat-buoc/', title: 'Bảo hiểm bắt buộc', short: 'Bắt buộc', img: 'bat-buoc', alt: 'Mô hình 3D xe tải và hồ sơ bảo hiểm bắt buộc' },
  { href: '/san-pham/bao-hiem-tai-nan/', title: 'Bảo hiểm tai nạn', short: 'Tai nạn', img: 'tai-nan', alt: 'Mô hình 3D mũ bảo hộ đỏ, nhóm nhân viên và vòng sáng đỏ trên đế kính' },
  { href: '/san-pham/chay-no-bat-buoc/', title: 'Cháy nổ bắt buộc', short: 'Cháy nổ', img: 'chay-no', alt: 'Mô hình 3D nhà xưởng có bình chữa cháy, khiên sáng bảo vệ và vòng sáng đỏ trên đế kính' },
  { href: '/san-pham/hang-hoa-xuat-nhap-khau/', title: 'Hàng hóa xuất nhập khẩu', short: 'Hàng hóa XNK', img: 'hang-hoa', alt: 'Mô hình 3D tàu container và máy bay vận tải' },
  // Ba sản phẩm thêm 27/10/2026: chưa có trang trên pvihcm.com. soon: true -> bấm vào hiện "Coming soon – Sắp ra mắt",
  // không chuyển trang. Khi trang đã làm xong ở đúng href thì xóa "soon: true" là thẻ thành link thường.
  { href: '/san-pham/bao-hiem-cong-trinh/', soon: true, title: 'Bảo hiểm công trình', short: 'Công trình', img: 'hero-cong-trinh', alt: 'Mô hình 3D tòa nhà đang xây, cần cẩu và vòng sáng đỏ trên đế kính' },
  { href: '/san-pham/bao-hiem-suc-khoe/', soon: true, title: 'Bảo hiểm sức khỏe', short: 'Sức khỏe', img: 'hero-suc-khoe', alt: 'Mô hình 3D trái tim đỏ, ống nghe và gia đình nhỏ trên đế kính' },
  { href: '/san-pham/bao-hiem-du-lich/', soon: true, title: 'Bảo hiểm du lịch', short: 'Du lịch', img: 'hero-du-lich', alt: 'Mô hình 3D vali đỏ, máy bay và quả địa cầu trên đế kính' },
];
