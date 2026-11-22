// Các lựa chọn báo phí riêng của PVIHCM. Không sửa bộ dữ liệu đồng bộ từ site khác.
export const earlierClausesPdf = 'https://adminweb.pvi.com.vn/wp-content/uploads/2025/05/Dieu-khoan-bo-sung-1.pdf';

export const vehicleUses = [
  { id: 'private', icon: 'car', label: 'Xe không kinh doanh', text: 'Xe gia đình, đi làm hoặc phục vụ nội bộ.' },
  { id: 'business', icon: 'briefcase', label: 'Xe kinh doanh', text: 'Xe taxi, chở khách theo hợp đồng, cho thuê hoặc kinh doanh khác.' },
];

export const businessUses = [
  ['contract', 'Chở khách theo hợp đồng'],
  ['taxi', 'Taxi'],
  ['rental', 'Cho thuê tự lái'],
  ['other', 'Kinh doanh khác'],
];

export const mainClauses = [
  ['003', 'lock', 'Mất cắp bộ phận', 'Tổn thất do mất cắp hoặc mất cướp bộ phận của xe theo điều kiện bảo hiểm.'],
  ['006', 'wrench', 'Không khấu hao thay mới', 'Không trừ khấu hao khi thay phụ tùng, vật tư thuộc phạm vi của điều khoản.', true],
  ['007', 'garage', 'Sửa chữa chính hãng', 'Được yêu cầu sửa tại cơ sở chính hãng theo điều kiện bảo hiểm.', true],
  ['008', 'drop', 'Động cơ do ảnh hưởng của nước', 'Thiệt hại động cơ khi vô ý đi vào vùng ngập, áp dụng mức khấu trừ riêng.', true],
  ['019', 'battery', 'Pin động cơ ô tô điện', 'Yêu cầu báo phí cho bộ pin động cơ dùng để vận hành ô tô thuần điện. Khai rõ pin và giá trị bảo hiểm.'],
  ['014', 'parts', 'Thiết bị lắp thêm', 'Yêu cầu bảo hiểm thiết bị, phụ kiện lắp thêm hợp lệ. Cần kê khai thiết bị và giá trị.'],
];

export const moreClauses = [
  ['001', 'globe', 'Lưu hành ngoài Việt Nam', 'Dành cho xe có giấy phép lưu hành hợp lệ tại quốc gia thuộc phạm vi điều khoản.'],
  ['002', 'clock', 'Lưu hành tạm thời', 'Dành cho các trường hợp xe đủ điều kiện lưu hành tạm thời.'],
  ['004', 'car', 'Chi phí thuê xe thay thế', 'Chi phí thuê xe trong thời gian sửa chữa do tổn thất thuộc phạm vi bảo hiểm.'],
  ['005', 'shield', 'Bồi thường theo giới hạn trách nhiệm', 'Dành cho xe tạm nhập khẩu đáp ứng điều kiện miễn thuế theo điều khoản.'],
  ['009', 'clipboard', 'Trong thời gian chờ đăng kiểm', 'Dành cho xe mới hoặc xe nhập khẩu đủ điều kiện trong thời gian chờ đăng kiểm.'],
  ['013', 'parts', 'Thiết bị chuyên dùng', 'Cần khai báo thiết bị và đáp ứng điều kiện về bảo dưỡng, vận hành.'],
  ['018', 'tow', 'Cứu hộ khi xe hỏng bất ngờ', 'Cứu hộ và vận chuyển xe theo phạm vi, điều kiện và giới hạn của điều khoản.'],
];
