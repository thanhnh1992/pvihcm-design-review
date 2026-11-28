import { vinfastBusinessPath } from '../car-fee-rates.mjs';

export const vinfastBusinessOverviewModel = 'xe điện kinh doanh';
export const vinfastBusinessBrandSource = 'VinFast · Chính sách giá bán lẻ đề xuất kèm pin áp dụng từ ngày 12/11/2026';
export const vinfastBusinessCompare = [
  ['Minio Green', 188, 'vinfast-minio-green'],
  ['EC Van Tiêu chuẩn', 248, 'vinfast-ec-van'],
  ['Herio Green, mốc công bố 450 triệu', 450, 'vinfast-herio-green'],
  ['VF 5 Green', 460, 'vinfast-vf-5-green'],
  ['Nerio Green', 628, 'vinfast-nerio-green'],
  ['Limo Green', 699, 'vinfast-limo-green'],
];

export const vinfastBusinessArticles = [
  {
    brand: 'VinFast', model: 'VF 5 Green', logo: 'vinfast', slug: 'vinfast-vf-5-green',
    variants: [['VF 5 Green kèm pin', 460]], source: vinfastBusinessBrandSource,
    context: 'Bảng giá của VinFast ghi VF 5 Green kèm pin ở mức 460 triệu đồng. Nếu số tiền bảo hiểm được duyệt bằng mốc này, lấy 460 triệu đồng nhân 1,4% để dự trù phí vật chất 12 tháng.',
    heading: 'VF 5 Green chạy taxi công nghệ cần khai gì?',
    advice: 'Khai xe chạy ứng dụng, taxi hoặc cho thuê, kèm giấy đăng ký, số khung và giá trị pin. Nếu xe thuê qua đơn vị quản lý, kiểm ai đứng tên trên hợp đồng và ai có quyền yêu cầu bồi thường.',
    question: 'Bảo hiểm VF 5 Green 460 triệu đồng giá bao nhiêu?',
    answer: 'Nếu số tiền bảo hiểm là 460 triệu đồng, phí minh họa là 6.440.000 đồng cho 12 tháng theo tỷ lệ 1,4% có bảo hiểm pin. Xác nhận số tiền bảo hiểm thân xe, pin và điều kiện khấu trừ trên báo giá.',
    banner: ['PHÍ VF 5 GREEN KINH DOANH 1,4%', 'CÓ BẢO HIỂM PIN ĐIỆN ĐỘNG CƠ'], editorial: true,
    updated: '2026-11-28',
  },
  {
    brand: 'VinFast', model: vinfastBusinessOverviewModel, fullName: 'xe điện VinFast kinh doanh', logo: 'vinfast',
    slug: 'vinfast-kinh-doanh', overview: true, variants: vinfastBusinessCompare,
    source: vinfastBusinessBrandSource,
    context: 'Đối chiếu nhanh sáu dòng xe điện dùng để chạy dịch vụ hoặc giao hàng. Mức tiền bên dưới lấy giá công bố kèm pin làm mốc, để chủ xe và đội xe nhập được giá trị của từng chiếc.',
    heading: 'Kê khai pin và chuẩn bị hồ sơ cho từng xe',
    advice: 'Lập bảng kê theo số khung, năm sản xuất, số tiền bảo hiểm, hình thức chạy xe và quyền sở hữu pin. Với đội xe đang tái tục, bổ sung lịch sử bồi thường và xưởng thường tiếp nhận. Với EC Van, ghi công năng chở hàng và các trang bị lắp thêm.',
    question: 'Đội xe có nhiều mẫu VinFast tính phí thế nào?',
    answer: 'Lấy số tiền bảo hiểm được chấp thuận của từng xe nhân 1,4%, sau đó cộng các khoản của từng xe để dự trù phí đội xe. Khi chốt báo giá, đối chiếu danh sách số khung, thông tin pin và mức khấu trừ trên từng hồ sơ.',
    banner: ['PHÍ XE ĐIỆN VINFAST KINH DOANH 1,4%', 'SO 6 DÒNG XE CÓ BẢO HIỂM PIN'], editorial: true,
    updated: '2026-11-28',
  },
];

export const vinfastBusinessRelated = { href: vinfastBusinessPath, text: 'So phí 1,4% của sáu dòng VinFast kinh doanh' };
