// Dữ liệu trang BHYT hộ gia đình và BHXH tự nguyện (/san-pham/bao-hiem-y-te/), chủ site giao 21/11/2026.
// PVI Thành Đô là đơn vị thu BHXH, BHYT do cơ quan BHXH ủy quyền; thẻ BHYT, sổ BHXH do cơ quan BHXH cấp,
// KHÔNG phải sản phẩm của PVI: trang không gắn thương hiệu PVI lên thẻ.
// Nguồn chính: Thông báo số 3508/TB-BHXH ngày 21/5/2026 của BHXH TP. Hồ Chí Minh (chủ site gửi bản PDF),
// mức đóng BHXH, BHYT kể từ 01/7/2026 khi mức tham chiếu (mức lương cơ sở) là 2.530.000 đồng/tháng.
//   - BHYT hộ gia đình: người thứ 1 bằng 4,5% mức tham chiếu; người thứ 2, 3, 4 bằng 70%, 60%, 50%;
//     từ người thứ 5 bằng 40% (bảng mục 3 của Thông báo; căn cứ khoản 5 Điều 6 Nghị định 188/2025/NĐ-CP).
//   - BHXH tự nguyện: đóng 22% thu nhập tự chọn; thấp nhất 1.500.000 đ (chuẩn hộ nghèo nông thôn),
//     cao nhất 50.600.000 đ (20 lần mức tham chiếu); NSNN hỗ trợ theo nhóm, tối đa 120 tháng (mục 5).
//   - Đã đóng theo kỳ 3, 6, 12 tháng thì khi mức đóng đổi không đóng bổ sung, không hoàn chênh lệch (mục 6).
// Đổi mức tham chiếu: sửa LUONG_CO_SO, EFFECTIVE, các mức hỗ trợ BHXH tự nguyện theo thông báo mới, chạy node tools/gen-bhyt.mjs.

export const LUONG_CO_SO = 2530000;
export const EFFECTIVE = '01/7/2026';
export const RATE = 0.045;
export const STEPS = [1, 0.7, 0.6, 0.5, 0.4]; // người thứ 1, 2, 3, 4, từ người thứ 5
export const TERMS = [3, 6, 12];
export const perMonth = (i) => Math.round(LUONG_CO_SO * RATE * STEPS[Math.min(i, STEPS.length - 1)]);

// BHXH tự nguyện (mục 5 Thông báo 3508/TB-BHXH)
export const TN_RATE = 0.22;
export const TN_MIN = 1500000;
export const TN_MAX = 50600000;
export const TN_SUPPORT = [
  { id: 'khac', label: 'Người tham gia khác', pct: 20, amount: 66000 },
  { id: 'dan-toc', label: 'Người dân tộc thiểu số', pct: 30, amount: 99000 },
  { id: 'can-ngheo', label: 'Người thuộc hộ cận nghèo', pct: 65, amount: 214500 },
  { id: 'ngheo', label: 'Người thuộc hộ nghèo; người sống tại xã đảo, đặc khu', pct: 80, amount: 264000 },
];
export const TN_TERMS = [1, 3, 6, 12];
export const TN_SAMPLES = [1500000, 2000000, 3000000, 5000000, 10000000, 20000000, 50600000];

export const PVI_THANH_DO = {
  name: 'Công ty Bảo hiểm PVI Thành Đô',
  address: 'Tầng 12A, tòa nhà 194 Golden Building, số 473 Điện Biên Phủ, phường Thạnh Mỹ Tây, TP. Hồ Chí Minh',
};
export const DIEM_THU = {
  // Ghi đúng như bảng điểm thu (tên đơn vị hành chính trên bảng là trước khi sắp xếp năm 2025).
  address: 'Tầng 1, số 37 Đường số 2, P. An Khánh, TP. Thủ Đức, TP. Hồ Chí Minh',
  bhxhHotline: '1900 9068',
};

export const SOURCES = [
  ['Thông báo số 3508/TB-BHXH về mức đóng BHXH, BHYT, BHTN, BHTNLĐ-BNN kể từ ngày 01/7/2026', 'Bảo hiểm xã hội TP. Hồ Chí Minh · ngày 21/5/2026'],
  ['Nghị định 161/2026/NĐ-CP quy định mức lương cơ sở', 'Chính phủ · ngày 15/5/2026'],
  ['Nghị định 188/2025/NĐ-CP quy định chi tiết một số điều của Luật Bảo hiểm y tế', 'Chính phủ · ngày 25/6/2025'],
  ['Nghị định 159/2025/NĐ-CP hướng dẫn Luật BHXH về BHXH tự nguyện', 'Chính phủ · ngày 25/6/2025'],
  ['Luật Bảo hiểm xã hội số 41/2024/QH15', 'Quốc hội · hiệu lực 01/7/2025'],
  ['Hợp đồng ủy quyền thu BHXH, BHYT số 02/2022/BHXHVN-PVI', 'Bảo hiểm xã hội Việt Nam và Tổng công ty Bảo hiểm PVI · ngày 19/5/2022'],
];
