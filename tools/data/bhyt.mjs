// Dữ liệu trang Bảo hiểm y tế hộ gia đình (/san-pham/bao-hiem-y-te/), chủ site giao 21/11/2026.
// PVI Thành Đô là tổ chức dịch vụ thu BHXH, BHYT do cơ quan BHXH ủy quyền (bảng "Điểm thu" tại số 37 Đường số 2).
// Thẻ BHYT do cơ quan Bảo hiểm xã hội cấp, KHÔNG phải sản phẩm của PVI: trang không gắn thương hiệu PVI lên thẻ.
// Căn cứ số liệu (đã đối chiếu nhiều nguồn ngày 21/11/2026):
//   - Lương cơ sở 2.530.000 đ/tháng từ 01/7/2026: Nghị định 161/2026/NĐ-CP (ban hành 15/5/2026).
//   - BHYT hộ gia đình: người thứ nhất 4,5% lương cơ sở; người thứ 2, 3, 4 bằng 70%, 60%, 50% người thứ nhất;
//     từ người thứ 5 bằng 40% (khoản 5 Điều 6 Nghị định 188/2025/NĐ-CP).
//   - Đóng định kỳ 3, 6 hoặc 12 tháng; lương cơ sở đổi giữa kỳ thì không đóng bổ sung, không hoàn chênh lệch.
//   - Hợp đồng ủy quyền thu BHXH, BHYT số 02/2022/BHXHVN-PVI ngày 19/5/2022 (BHXH Việt Nam và Tổng công ty Bảo hiểm PVI).
// Lương cơ sở đổi thì chỉ sửa LUONG_CO_SO và EFFECTIVE, chạy lại node tools/gen-bhyt.mjs.

export const LUONG_CO_SO = 2530000;
export const EFFECTIVE = '01/7/2026';
export const RATE = 0.045;
export const STEPS = [1, 0.7, 0.6, 0.5, 0.4]; // người thứ 1, 2, 3, 4, từ người thứ 5
export const TERMS = [3, 6, 12];

export const perMonth = (i) => Math.round(LUONG_CO_SO * RATE * STEPS[Math.min(i, STEPS.length - 1)]);

export const DIEM_THU = {
  name: 'Điểm thu BHXH, BHYT của Công ty Bảo hiểm PVI Thành Đô',
  // Ghi đúng như bảng điểm thu (tên đơn vị hành chính trên bảng là trước khi sắp xếp năm 2025).
  address: 'Tầng 1, số 37 Đường số 2, P. An Khánh, TP. Thủ Đức, TP. Hồ Chí Minh',
  bhxhHotline: '1900 9068',
};

export const SOURCES = [
  ['Nghị định 161/2026/NĐ-CP quy định mức lương cơ sở', 'Chính phủ · ban hành 15/5/2026, hiệu lực 01/7/2026'],
  ['Nghị định 188/2025/NĐ-CP hướng dẫn Luật Bảo hiểm y tế (khoản 5 Điều 6: mức đóng hộ gia đình)', 'Chính phủ · ngày 01/7/2025'],
  ['Hợp đồng ủy quyền thu BHXH, BHYT số 02/2022/BHXHVN-PVI', 'Bảo hiểm xã hội Việt Nam và Tổng công ty Bảo hiểm PVI · ngày 19/5/2022'],
];
