// Các thẻ sản phẩm chạy vòng ở đầu trang chủ (khối .orbit trong .hero-stage).
// THÊM SẢN PHẨM: thêm một dòng vào mảng dưới đây, đặt ảnh vào dist/assets/<img>.webp
// (nên có thêm bản <img>-480.webp và <img>-800.webp), rồi chạy: node tools/gen-hero-orbit.mjs
// Vòng quay tự chia đều cho số thẻ, không cần sửa CSS hay JS.
//   href  : đường dẫn trang sản phẩm (nội bộ)
//   title : tên hiện trên nhãn thẻ
//   short : (tùy chọn) tên ngắn cho điện thoại hẹp, khi title quá dài
//   img   : tên file ảnh trong dist/assets, không ghi đuôi .webp
//   alt   : mô tả ảnh
export const heroProducts = [
  { href: '/san-pham/bao-hiem-bat-buoc/', title: 'Bảo hiểm bắt buộc', img: 'bat-buoc', alt: 'Mô hình 3D xe tải và hồ sơ bảo hiểm bắt buộc' },
  { href: '/san-pham/bao-hiem-tai-nan/', title: 'Bảo hiểm tai nạn', img: 'tai-nan', alt: 'Mô hình 3D mũ bảo hộ và nhóm nhân viên' },
  { href: '/san-pham/chay-no-bat-buoc/', title: 'Cháy nổ bắt buộc', img: 'chay-no', alt: 'Mô hình 3D nhà xưởng được bảo vệ' },
  { href: '/san-pham/hang-hoa-xuat-nhap-khau/', title: 'Hàng hóa xuất nhập khẩu', short: 'Hàng hóa XNK', img: 'hang-hoa', alt: 'Mô hình 3D tàu container và máy bay vận tải' },
];
