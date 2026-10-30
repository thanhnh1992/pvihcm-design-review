// Danh mục sản phẩm cho trang /san-pham/ (chủ site yêu cầu 28/10/2026: gộp các mục sản phẩm
// trên thanh menu thành một trang riêng).
// Thêm sản phẩm: thêm một dòng vào `products`, rồi chạy `node tools/gen-san-pham.mjs`.
// Mô tả trên thẻ KHÔNG gõ ở đây: script đọc thẻ <meta name="description"> của chính trang
// sản phẩm đó, để thẻ luôn khớp nội dung đã duyệt của trang.
//   href  : đường dẫn trang sản phẩm trên pvihcm.com (trang phải có sẵn trong dist/)
//   title : tên hiển thị trên thẻ
//   group : một trong các id của `groups`
//   img   : tên ảnh trong dist/assets/ (cần đủ bản .webp, -800.webp, -480.webp)
//   alt   : mô tả ảnh (lấy đúng alt đang dùng cho ảnh đó ở trang khác)
export const groups = [
  { id: 'bat-buoc', label: 'Bắt buộc theo luật' },
  { id: 'con-nguoi', label: 'Con người' },
  { id: 'tai-san', label: 'Tài sản và doanh nghiệp' },
];

export const products = [
  { href: '/san-pham/bao-hiem-bat-buoc/', title: 'Bảo hiểm TNDS ô tô bắt buộc', group: 'bat-buoc', img: 'bat-buoc', alt: 'Mô hình 3D xe tải và hồ sơ bảo hiểm bắt buộc' },
  { href: '/san-pham/chay-no-bat-buoc/', title: 'Bảo hiểm cháy nổ bắt buộc', group: 'bat-buoc', img: 'chay-no', alt: 'Mô hình 3D nhà xưởng có bình chữa cháy, khiên sáng bảo vệ và vòng sáng đỏ trên đế kính' },
  { href: '/san-pham/bao-hiem-tai-nan/', title: 'Bảo hiểm tai nạn 24/24', group: 'con-nguoi', img: 'tai-nan', alt: 'Mô hình 3D mũ bảo hộ đỏ, nhóm nhân viên và vòng sáng đỏ trên đế kính' },
  { href: '/san-pham/bao-hiem-suc-khoe/', title: 'Bảo hiểm sức khỏe PVI Care', group: 'con-nguoi', img: 'hero-suc-khoe', alt: 'Mô hình 3D trái tim đỏ, ống nghe và gia đình nhỏ trên đế kính' },
  { href: '/san-pham/bao-hiem-du-lich/', title: 'Bảo hiểm du lịch quốc tế', group: 'con-nguoi', img: 'hero-du-lich', alt: 'Mô hình 3D vali đỏ, máy bay và quả địa cầu trên đế kính' },
  { href: '/san-pham/hang-hoa-xuat-nhap-khau/', title: 'Bảo hiểm hàng hóa xuất nhập khẩu', group: 'tai-san', img: 'hang-hoa', alt: 'Mô hình 3D tàu container và máy bay vận tải' },
  { href: '/san-pham/bao-hiem-cong-trinh/', title: 'Bảo hiểm công trình và lắp đặt', group: 'tai-san', img: 'hero-cong-trinh', alt: 'Mô hình 3D tòa nhà đang xây, cần cẩu và vòng sáng đỏ trên đế kính' },
  { href: '/san-pham/bao-hiem-vat-chat-xe/', title: 'Bảo hiểm vật chất xe ô tô', group: 'tai-san', img: 'tu-van-xe-o-to', alt: 'Chuyên viên trao đổi với chủ xe về phương án bảo hiểm vật chất xe' },
];
