// Đánh giá riêng từng sản phẩm (chủ site chốt 23/11/2026): trên trang sản phẩm, khách chấm sao CHO SẢN PHẨM ĐÓ
// (khóa sp-<thư mục>), schema Product mang điểm riêng của sản phẩm; mỗi lượt vẫn được cộng vào điểm chung
// của công ty (Google + mọi lượt trên website, khóa pvi-thanh-do) như trước.
// offers: CHỈ khi có biểu phí thật trong tools/data (không tự đặt giá). Không có offers thì schema Product chỉ
// được thêm (bằng feedback.js) khi đã có ít nhất 1 lượt chấm thật.
// Không đưa vào đây: trang tai nạn (có hệ đánh giá riêng), trang BHYT/BHXH (không phải sản phẩm của PVI),
// trang sản phẩm theo tỉnh (tránh nhiều URL khai cùng một Product).
import { tndsVehicleClasses, feeWithVat } from './tnds.mjs';

const tndsFees = (() => {
  const fees = [];
  const walk = (o) => { if (Array.isArray(o)) o.forEach(walk); else if (o && typeof o === 'object') { if (typeof o.baseFee === 'number') fees.push(feeWithVat(o.baseFee)); Object.values(o).forEach(walk); } };
  walk(tndsVehicleClasses);
  return { low: Math.min(...fees), high: Math.max(...fees), count: fees.length };
})();

export const PRODUCTS = {
  'san-pham/bao-hiem-bat-buoc/index.html': { slug: 'sp-tnds-o-to', name: 'Bảo hiểm TNDS ô tô bắt buộc', offers: { low: tndsFees.low, high: tndsFees.high, count: tndsFees.count, note: 'Biểu phí Nghị định 67/2023/NĐ-CP, đã gồm VAT (tools/data/tnds.mjs)' } },
  'san-pham/bao-hiem-o-to/index.html': { slug: 'sp-bao-hiem-o-to', name: 'Bảo hiểm ô tô PVI' },
  'san-pham/bao-hiem-vat-chat-xe/index.html': { slug: 'sp-vat-chat-xe', name: 'Bảo hiểm vật chất xe ô tô' },
  'san-pham/chay-no-bat-buoc/index.html': { slug: 'sp-chay-no-bat-buoc', name: 'Bảo hiểm cháy nổ bắt buộc' },
  'san-pham/bao-hiem-cong-trinh/index.html': { slug: 'sp-cong-trinh', name: 'Bảo hiểm công trình và lắp đặt' },
  'san-pham/bao-hiem-suc-khoe/index.html': { slug: 'sp-suc-khoe', name: 'Bảo hiểm sức khỏe PVI Care' },
  'san-pham/bao-hiem-du-lich/index.html': { slug: 'sp-du-lich', name: 'Bảo hiểm du lịch quốc tế' },
  'san-pham/bao-hiem-trach-nhiem/index.html': { slug: 'sp-trach-nhiem', name: 'Bảo hiểm trách nhiệm PVI' },
  'san-pham/hang-hoa-xuat-nhap-khau/index.html': { slug: 'sp-hang-hoa', name: 'Bảo hiểm hàng hóa xuất nhập khẩu' },
};
