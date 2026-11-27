// Giá bán lẻ đề xuất của hãng hoặc giá rao đã xác minh. Đơn vị triệu đồng.
const vinFastSource = 'VinFast · Chính sách giá bán kèm pin áp dụng từ 12/11/2026';

export const carFeePriceExamples = {
  Hyundai: {
    'Santa Fe': {
      source: 'Bonbanh · Santa Fe 2023 Cao cấp 2.2L HTRAC tại TP.HCM, hai tin đối chiếu 26/11/2026',
      values: [['Giá rao 1', 869], ['Giá rao 2', 965]],
    },
  },
  Toyota: {
    Vios: {
      source: 'Toyota Việt Nam · Khung giá Vios 2026 theo phiên bản và màu',
      values: [['Đầu dưới', 458], ['Đầu trên', 553]],
    },
  },
  Honda: {
    City: {
      source: 'Honda Việt Nam · Giá đề xuất Honda City từ 14/10/2026, màu tiêu chuẩn',
      values: [['L', 539], ['RS', 569]],
    },
  },
  Mazda: {
    'CX-5': {
      source: 'Mazda Việt Nam · Giá công bố theo phiên bản Mazda CX-5 2.0L',
      values: [['Deluxe tùy chọn', 749], ['Luxury', 789], ['Premium', 829], ['Premium Exclusive', 869]],
    },
  },
  Mitsubishi: {
    Xpander: {
      source: 'Mitsubishi Motors Việt Nam · Giá bán lẻ New Xpander MY26, bảng tháng 09/2026',
      values: [['MT CBU', 568], ['AT Premium', 659]],
    },
    Xforce: {
      source: 'Mitsubishi Motors Việt Nam · Giá bán lẻ New Xforce, bảng tháng 09/2026',
      values: [['GLX', 605], ['Luxury', 665], ['Ultimate', 720]],
    },
  },
  Ford: {
    Ranger: {
      source: 'Ford Việt Nam · Giá đề xuất New Ranger 2026 theo phiên bản',
      values: [['XLS', 707], ['Wildtrak', 949]],
      note: 'Nếu xe dùng chở hàng hay kinh doanh, gửi mục đích sử dụng để chuyên viên kiểm tra biểu phí phù hợp.',
    },
    'Ranger Raptor': {
      source: 'Ford Việt Nam · Giá đề xuất Ranger Raptor 2026',
      values: [['Raptor', 1448]],
      note: 'Khai đúng phiên bản, mục đích sử dụng và phụ kiện lắp thêm khi nhận báo giá.',
    },
  },
  VinFast: {
    'VF 2': { source: vinFastSource, electric: true, values: [['VF 2', 188]] },
    'VF 3': { source: vinFastSource, electric: true, values: [['Eco tiêu chuẩn 2', 278], ['Eco tiêu chuẩn 3', 285], ['Plus', 296]] },
    'VF 5': { source: vinFastSource, electric: true, values: [['VF 5 Plus', 496], ['VF 5 mới Green', 460], ['VF 5 mới Premium', 540]] },
    'VF 6': { source: vinFastSource, electric: true, values: [['Eco tiêu chuẩn 2', 646], ['Plus tiêu chuẩn 2', 700], ['VF 6 mới Premium', 715]] },
    'VF 7': { source: vinFastSource, electric: true, values: [['Eco tiêu chuẩn 2', 740], ['Plus trần thép tiêu chuẩn 2', 830], ['Plus trần kính tiêu chuẩn 2', 850]] },
    'VF 8': { source: vinFastSource, electric: true, values: [['Eco CATL bản VN tiêu chuẩn 2', 898], ['Thế hệ mới', 899], ['Plus CATL bản VN', 1079]] },
    'VF 9': { source: vinFastSource, electric: true, values: [['Eco CATL', 1348], ['Plus CATL trần thép', 1529]] },
    'VF MPV 7': { source: vinFastSource, electric: true, values: [['VF MPV 7', 750]] },
    'Minio Green': { source: vinFastSource, electric: true, values: [['Minio Green', 188]] },
    'Herio Green': { source: vinFastSource, electric: true, values: [['Tiêu chuẩn 2', 450], ['Tiêu chuẩn 1', 469]] },
    'Nerio Green': { source: vinFastSource, electric: true, values: [['Nerio Green', 628]] },
    'EC Van': { source: vinFastSource, electric: true, values: [['Tiêu chuẩn', 248], ['Nâng cao + cửa trượt', 306]], note: 'Khai rõ xe dùng chở hàng hay kinh doanh để chuyên viên kiểm tra biểu phí.' },
  },
};
