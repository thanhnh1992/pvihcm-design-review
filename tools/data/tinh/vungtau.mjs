// Nhánh khu vực VŨNG TÀU (tỉnh Bà Rịa – Vũng Tàu cũ, trước sắp xếp 01/7/2025), dựng theo khuôn /cantho/.
// Chỉ dùng dữ kiện có nguồn: danh bạ PVI (tools/data/don-vi-thanh-vien-pvi.json), dữ liệu sản phẩm của web
// (tnds.mjs, vcx.mjs, bài phí tai nạn, Nghị định 347/2026, 220/2026) và báo, nghị quyết ghi ở `nguon`.
// kcn đổi sang dạng object { ten, viTri, ghiChu } theo yêu cầu 21/11/2026.
// Bìa dùng ảnh thật có hồ sơ nguồn. Các quyền và tác giả ảnh gốc được ghi riêng với phần trình bày.

const coverSources = {
  road: {"creator":"Genghiskhanviet","alt":"Đường Hạ Long ven biển Vũng Tàu","caption":"Đường Hạ Long, Vũng Tàu, tháng 10/2004. Ảnh: Genghiskhanviet.","rights":"Phạm vi công cộng"},
  vcx: {"creator":"PVIHCM","alt":"Kỹ thuật viên kiểm tra vết xước trên thân ô tô","caption":"Ảnh minh họa: kỹ thuật viên kiểm tra vết xước trên thân ô tô.","rights":"Ảnh minh họa dựng riêng cho PVIHCM","illustration":true},
  fire: {"creator":"PVIHCM","alt":"Đường ống chữa cháy và tủ vòi chữa cháy trong nhà xưởng","caption":"Ảnh minh họa: đường ống chữa cháy và tủ vòi chữa cháy trong nhà xưởng.","rights":"Ảnh minh họa dựng riêng cho PVIHCM","illustration":true},
  warehouse: {"creator":"PVIHCM","alt":"Kho công nghiệp với kệ hàng và lối vận chuyển","caption":"Ảnh minh họa: kho công nghiệp với kệ hàng và lối vận chuyển.","rights":"Ảnh minh họa dựng riêng cho PVIHCM","illustration":true},
  cargo: {"creator":"PVIHCM","alt":"Tàu hàng, cẩu bờ và các dãy container tại cảng","caption":"Ảnh minh họa: tàu hàng, cẩu bờ và các dãy container tại cảng.","rights":"Ảnh minh họa dựng riêng cho PVIHCM","illustration":true},
  workers: {"creator":"PVIHCM","alt":"Công nhân kiểm tra hạng mục thi công tại công trường","caption":"Ảnh minh họa: công nhân kiểm tra hạng mục thi công tại công trường.","rights":"Ảnh minh họa dựng riêng cho PVIHCM","illustration":true},
  accident: {"creator":"PVIHCM","alt":"Công nhân rời xưởng sau ca làm việc","caption":"Ảnh minh họa: công nhân rời xưởng sau ca làm việc.","rights":"Ảnh minh họa dựng riêng cho PVIHCM","illustration":true},
  health: {"creator":"PVIHCM","alt":"Nhân viên y tế trao đổi với khách tại phòng khám","caption":"Ảnh minh họa: nhân viên y tế trao đổi với khách tại phòng khám.","rights":"Ảnh minh họa dựng riêng cho PVIHCM","illustration":true},
  travel: {"creator":"PVIHCM","alt":"Hành khách kéo vali tại khu ga khởi hành","caption":"Ảnh minh họa: hành khách kéo vali tại khu ga khởi hành.","rights":"Ảnh minh họa dựng riêng cho PVIHCM","illustration":true},
  front: {"source":"Bai_Truoc,_Vung_Tau.jpg","creator":"Nguyen Huu Son","alt":"Bãi Trước và bờ biển Vũng Tàu","caption":"Bãi Trước, Vũng Tàu, tháng 6/2011. Ảnh: Nguyen Huu Son.","rights":"Phạm vi công cộng"},
  offshore: {"source":"An_oil_rig_offshore_Vungtau.jpg","creator":"Genghiskhanviet","alt":"Giàn khoan ngoài khơi Vũng Tàu","caption":"Giàn khoan ngoài khơi Vũng Tàu, tháng 4/2004. Ảnh: Genghiskhanviet.","rights":"Phạm vi công cộng"},
};

export const tinh = {
  slug: 'vungtau',
  ten: 'Vũng Tàu',
  tenDayDu: 'tỉnh Bà Rịa – Vũng Tàu cũ',
  ngay: '2026-11-27',
  ngayText: '27/11/2026',
  localActions: true,
  // Chủ site duyệt Zalo OA cho CTA PVI Online trên trang khu vực và các trang sản phẩm.
  onlinePurchase: { zaloUrl: 'https://zalo.me/2076363329232219188?src=qr&f=1', area: 'khu vực Bà Rịa – Vũng Tàu cũ' },
  // Đơn vị PVI phụ trách địa bàn, chép nguyên từ danh bạ PVI.
  office: {
    ten: 'Bảo hiểm PVI Vũng Tàu',
    loai: 'Công ty thành viên của Tổng công ty Bảo hiểm PVI',
    diaChi: 'Số 58A đường Võ Thị Sáu, Phường Vũng Tàu, Thành phố Hồ Chí Minh',
    dienThoai: '0254 3810 040',
    tel: '02543810040',
    streetAddress: '58A Võ Thị Sáu',
    addressLocality: 'Phường Vũng Tàu',
    addressRegion: 'Thành phố Hồ Chí Minh',
    mst: '0105402531-017',
  },
  hanhChinh: {
    cu: 'Tỉnh Bà Rịa – Vũng Tàu trước ngày 01/7/2025 gồm TP Vũng Tàu, TP Bà Rịa, TP Phú Mỹ (thị xã Phú Mỹ lên thành phố từ 01/3/2025), các huyện Châu Đức, Xuyên Mộc, Long Đất (hợp nhất Long Điền và Đất Đỏ từ 01/01/2025) và huyện Côn Đảo.',
    moi: 'Từ 01/7/2025, theo Nghị quyết 202/2025/QH15, tỉnh Bà Rịa – Vũng Tàu, tỉnh Bình Dương và TP.HCM hợp thành TP.HCM mới. Nghị quyết 1685/NQ-UBTVQH15 ngày 16/6/2025 sắp xếp cấp xã: TP.HCM mới có 168 đơn vị; riêng địa bàn Bà Rịa – Vũng Tàu cũ còn 30 đơn vị gồm 11 phường, 18 xã và đặc khu Côn Đảo.',
    viDu: [
      ['Phường Vũng Tàu', 'từ các Phường 1, 2, 3, 4, 5, phường Thắng Nhì và phường Thắng Tam'],
      ['Phường Tam Thắng', 'từ các Phường 7, 8, 9 và phường Nguyễn An Ninh'],
      ['Phường Rạch Dừa', 'từ Phường 10, phường Thắng Nhất và phường Rạch Dừa'],
      ['Phường Phước Thắng', 'từ Phường 11 và Phường 12'],
      ['Phường Bà Rịa', 'từ các phường Phước Trung, Phước Nguyên, Long Toàn, Phước Hưng'],
      ['Phường Long Hương', 'từ phường Kim Dinh, phường Long Hương và xã Tân Hưng'],
      ['Phường Tam Long', 'từ phường Long Tâm, xã Hòa Long và xã Long Phước'],
      ['Phường Phú Mỹ', 'từ phường Phú Mỹ và phường Mỹ Xuân'],
      ['Phường Tân Thành', 'từ phường Hắc Dịch và xã Sông Xoài'],
      ['Phường Tân Phước', 'từ phường Phước Hòa và phường Tân Phước'],
      ['Phường Tân Hải', 'từ phường Tân Hòa và phường Tân Hải'],
      ['Xã Long Hải', 'từ thị trấn Long Hải, xã Phước Tỉnh và xã Phước Hưng'],
      ['Xã Long Điền', 'từ thị trấn Long Điền và xã Tam An'],
      ['Xã Phước Hải', 'từ thị trấn Phước Hải và xã Phước Hội'],
      ['Xã Đất Đỏ', 'từ thị trấn Đất Đỏ và các xã Long Tân, Láng Dài, Phước Long Thọ'],
      ['Xã Ngãi Giao', 'từ thị trấn Ngãi Giao, xã Bình Ba và xã Suối Nghệ'],
      ['Xã Xuyên Mộc', 'từ các xã Bông Trang, Bưng Riềng và Xuyên Mộc'],
      ['Xã Hồ Tràm', 'từ thị trấn Phước Bửu, xã Phước Tân và xã Phước Thuận'],
      ['Xã Bình Châu', 'giữ nguyên, không sắp xếp'],
      ['Đặc khu Côn Đảo', 'từ toàn bộ huyện Côn Đảo'],
    ],
    phuongKhac: ['xã Long Sơn', 'xã Châu Pha', 'xã Châu Đức', 'xã Bình Giã', 'xã Kim Long', 'xã Xuân Sơn', 'xã Nghĩa Thành', 'xã Hòa Hội', 'xã Hòa Hiệp'],
  },
  // Theo danh sách trên trang Ban Quản lý các KCN tỉnh Bà Rịa – Vũng Tàu và báo (xem `nguon`).
  // viTri là phường, xã mới hoặc khu vực cũ; ghiChu chỉ ghi khi có nguồn.
  kcn: [
    { ten: 'Phú Mỹ I', viTri: 'phường Phú Mỹ', ghiChu: '' },
    { ten: 'Phú Mỹ II và Phú Mỹ II mở rộng', viTri: 'khu vực Phú Mỹ', ghiChu: '' },
    { ten: 'Phú Mỹ 3 (khu công nghiệp chuyên sâu)', viTri: 'phường Tân Phước (phường Phước Hòa cũ)', ghiChu: '' },
    { ten: 'Cái Mép', viTri: 'phường Tân Phước', ghiChu: 'khí hóa lỏng, xăng dầu, logistics, hóa chất' },
    { ten: 'Mỹ Xuân A', viTri: 'phường Phú Mỹ (phường Mỹ Xuân cũ)', ghiChu: '' },
    { ten: 'Mỹ Xuân A2', viTri: 'phường Phú Mỹ (phường Mỹ Xuân cũ)', ghiChu: '' },
    { ten: 'Mỹ Xuân B1 – Conac', viTri: 'khu vực Mỹ Xuân, Hắc Dịch cũ', ghiChu: 'cơ khí, chế biến nông lâm sản, công nghiệp nhẹ' },
    { ten: 'Mỹ Xuân B1 – Tiến Hùng', viTri: 'khu vực Mỹ Xuân, Hắc Dịch cũ', ghiChu: '' },
    { ten: 'Mỹ Xuân B1 – Đại Dương', viTri: 'khu vực Mỹ Xuân, Hắc Dịch cũ', ghiChu: '' },
    { ten: 'Đông Xuyên', viTri: 'khu vực TP Vũng Tàu cũ', ghiChu: '' },
    { ten: 'Long Sơn', viTri: 'xã Long Sơn', ghiChu: 'hóa dầu' },
    { ten: 'Đất Đỏ I', viTri: 'khu vực Đất Đỏ cũ', ghiChu: '' },
    { ten: 'Châu Đức', viTri: 'khu vực Suối Nghệ, Nghĩa Thành cũ', ghiChu: 'chế biến thực phẩm, điện tử, logistics' },
    { ten: 'Đá Bạc', viTri: 'khu vực Châu Đức cũ', ghiChu: '' },
  ],
  ruiRo: [
    'Ngập do mưa lớn: rạng sáng 21/8/2025, sau cơn mưa hơn 2 giờ, nhiều nơi ở các phường Vũng Tàu, Tam Thắng, Rạch Dừa ngập sâu; đường Thi Sách có chỗ ngập khoảng 60 cm, có ô tô bị nước đẩy trôi, nước tràn vào nhà dân.',
    'Giông lốc: tháng 7/2025, giông lớn quét qua các phường Vũng Tàu, Bà Rịa và xã Ngãi Giao, quật đổ hàng chục cây xanh, đè hai ô tô; nhiều nhà bị tốc mái.',
    'Cháy trong khu công nghiệp: tối 25/5/2026, cháy bùng lên ở xưởng tẩy gỉ của một nhà máy tôn trong KCN Phú Mỹ 1, phường Phú Mỹ, thiêu rụi một phần nhà xưởng và nhiều tài sản.',
    'Tai nạn trên quốc lộ 51: rạng sáng 10/6/2025, hai xe container va chạm trên quốc lộ 51, giao thông hướng Phú Mỹ ùn ứ nhiều giờ. Tuyến này có mật độ xe đầu kéo, xe bồn cao vì nối các KCN và cảng Cái Mép – Thị Vải.',
  ],
  nguon: [
    'Danh bạ mạng lưới Tổng công ty Bảo hiểm PVI, mục Bảo hiểm PVI Vũng Tàu (đối chiếu 26/09/2026)',
    'Nghị quyết 202/2025/QH15 về sắp xếp đơn vị hành chính cấp tỉnh; Nghị quyết 1685/NQ-UBTVQH15 ngày 16/6/2025 về sắp xếp đơn vị hành chính cấp xã của TP.HCM; Cổng thông tin Chính phủ, "Danh sách chính thức 168 phường, xã của TPHCM sau sắp xếp" (6/2025)',
    'Nghị quyết 1365/NQ-UBTVQH15 thành lập TP Phú Mỹ (hiệu lực 01/3/2025); Báo Chính phủ về thành lập huyện Long Đất từ 01/01/2025; Báo Đại biểu Nhân dân, Báo Bà Rịa – Vũng Tàu về phương án 30 đơn vị cấp xã (4/2025)',
    'Báo Bà Rịa – Vũng Tàu, "Mưa to, nhiều khu vực bị ngập sâu, xe ô tô bị trôi nhẹ, nước tràn vào nhà dân" (8/2025); VnExpress, "Mưa giông quật đổ hàng chục cây xanh, đè hai ôtô" (7/2025)',
    'Dân trí, VietNamNet về vụ cháy nhà máy trong KCN Phú Mỹ 1 (5/2026); VTV, "Tai nạn giữa 2 xe container lúc rạng sáng, Quốc lộ 51 ùn ứ nhiều giờ" (6/2025)',
    'Ban Quản lý các khu công nghiệp tỉnh Bà Rịa – Vũng Tàu, trang "Các khu công nghiệp"; VietnamPlus, Tạp chí Công Thương về tỷ lệ lấp đầy KCN; Báo Đầu tư về KCN chuyên sâu Phú Mỹ 3',
    'Báo Sài Gòn Giải Phóng, Bộ Xây dựng về cụm cảng Cái Mép – Thị Vải (2026)',
  ],
  catalogCover: {"source":"Vung_Tau_city_seen_from_Tuong_Ky_mountain_030324_6.jpg","creator":"Xuanphuocle","alt":"Vũng Tàu nhìn từ núi Tương Kỳ (Núi Lớn)","caption":"Vũng Tàu nhìn từ Núi Lớn, tháng 3/2024. Ảnh: Xuanphuocle.","rights":"CC0 1.0","stem":"vungtau-danh-muc"},
  hero: {
    tieuDe: 'Mua bảo hiểm PVI tại Vũng Tàu',
    title: 'Mua bảo hiểm PVI tại Vũng Tàu | Sản phẩm, báo phí và địa chỉ',
    description: 'Mua bảo hiểm PVI tại Vũng Tàu, Bà Rịa, Phú Mỹ: ô tô, cháy nổ nhà xưởng KCN Phú Mỹ, Cái Mép, tai nạn công nhân, sức khỏe. Biểu phí 2026, hồ sơ, địa chỉ.',
    promise: 'Báo phí nhanh · Hồ sơ rõ ràng · Hỗ trợ bồi thường',
    lead: 'Cá nhân và doanh nghiệp ở Vũng Tàu, Bà Rịa, Phú Mỹ, Long Điền, Đất Đỏ, Châu Đức, Xuyên Mộc và Côn Đảo có thể mua tại văn phòng PVI Vũng Tàu hoặc qua PVI Online.',
    anh: 'vungtau-bai-truoc',
    anhTam: 'mang-luoi-pvi',
    alt: coverSources.front.alt,
    cover: coverSources.front,
  },
  faqs: [
    { question: 'PVI ở Vũng Tàu nằm ở đâu?', answer: 'Đơn vị của Bảo hiểm PVI tại Vũng Tàu là Bảo hiểm PVI Vũng Tàu, công ty thành viên của Tổng công ty Bảo hiểm PVI. Văn phòng ở số 58A đường Võ Thị Sáu, phường Vũng Tàu, TP.HCM. Điện thoại 0254 3810 040.' },
    { question: 'Ở Vũng Tàu có mua bảo hiểm qua PVI Online được không?', answer: 'Bạn có thể mở PVI Online để chat với chuyên viên qua Zalo, nhận báo phí và được hướng dẫn mua, thanh toán và nhận giấy chứng nhận điện tử khi đơn được phát hành.' },
    { question: 'Giấy tờ còn ghi tỉnh Bà Rịa – Vũng Tàu, thị xã Phú Mỹ có phải đổi trước khi mua không?', answer: 'Không cần đổi trước. Giấy đăng ký xe, sổ đỏ hay giấy phép kinh doanh ghi địa chỉ cũ vẫn dùng được. Khi khai, ghi địa chỉ đúng như giấy tờ và thêm tên phường, xã mới nếu biết, ví dụ phường Tân Phước hay xã Long Hải, để hợp đồng khớp với hồ sơ khi bồi thường.' },
    { question: 'Nhà xưởng ở KCN Phú Mỹ, Mỹ Xuân hay Cái Mép phải mua bảo hiểm gì?', answer: 'Nếu cơ sở thuộc danh mục phải mua theo Nghị định 105/2025/NĐ-CP (sửa bởi Nghị định 347/2026/NĐ-CP), bắt buộc mua bảo hiểm cháy nổ. Ngoài ra nên xem bảo hiểm tài sản cho rủi ro ngoài cháy như ngập, giông lốc, và bảo hiểm tai nạn cho công nhân.' },
  ],
  products: [
    {
      id: 'tndsoto', nhom: 'xe', ten: 'Bảo hiểm TNDS ô tô bắt buộc', link: '/san-pham/bao-hiem-bat-buoc/',
      anh: 'vungtau-tnds', anhTam: 'tu-van-xe-o-to', anhAlt: coverSources.road.alt, cover: coverSources.road,
      related: ["vatchatxeoto"],
      buyPath: '/san-pham/bao-hiem-o-to/dat-mua/',
      title: 'Bảo hiểm TNDS ô tô bắt buộc tại Vũng Tàu: phí 2026 và hồ sơ',
      h1: 'Bảo hiểm TNDS ô tô bắt buộc tại Vũng Tàu',
      description: 'Mua bảo hiểm TNDS ô tô PVI tại Vũng Tàu: phí 2026 từ 437.000 đ/năm cho xe dưới 6 chỗ, mức trách nhiệm 150 triệu/người, hồ sơ, mua online hoặc tại PVI Vũng Tàu.',
      the: 'Cho xe gia đình và xe kinh doanh vận tải. Phí theo Nghị định 67/2023/NĐ-CP, từ 437.000 đ/năm chưa VAT.',
      lead: 'Chủ ô tô ở Vũng Tàu, Bà Rịa, Phú Mỹ bắt buộc phải có bảo hiểm trách nhiệm dân sự (TNDS) còn hiệu lực khi lưu thông. Xe con không kinh doanh dưới 6 chỗ đóng 437.000 đồng một năm chưa VAT, tức 480.700 đồng đã gồm VAT; xe kinh doanh vận tải đóng theo số chỗ, cao hơn.',
      sections: [
        ['TNDS ô tô bảo vệ ai và bảo vệ đến đâu?', [
          'Bảo hiểm TNDS chủ xe trả thay chủ xe phần trách nhiệm bồi thường cho người thứ ba khi xe gây tai nạn: người bị thương, người tử vong và tài sản bị hư hỏng. Mức trách nhiệm theo quy định là 150 triệu đồng cho mỗi người trong một vụ và 100 triệu đồng cho tài sản trong một vụ.',
          'TNDS không trả cho thiệt hại của chính chiếc xe bạn. Xe bị trầy, móp, ngập nước hay bị cây đổ đè muốn được bồi thường thì cần thêm bảo hiểm vật chất xe. Hai loại này mua chung một lần được, nhưng là hai phạm vi tách biệt trên giấy chứng nhận.',
        ]],
        ['Biểu phí TNDS ô tô 2026 áp dụng tại Vũng Tàu', [
          'Phí TNDS là phí do Nhà nước quy định tại Phụ lục I Nghị định 67/2023/NĐ-CP, giống nhau ở mọi tỉnh và mọi công ty bảo hiểm. Vì vậy khác biệt khi mua ở Vũng Tàu nằm ở tốc độ cấp đơn, cách hỗ trợ khi có va chạm và ưu đãi kèm theo, không nằm ở mức phí gốc.',
          'Bảng dưới là phí gốc một năm chưa gồm VAT 10%. Xe tải, xe chuyên dùng và đầu kéo có biểu riêng, tra ở trang biểu phí TNDS đầy đủ.',
        ]],
        ['Xe du lịch, xe đưa đón công nhân: khai đúng mục đích sử dụng', [
          'Vũng Tàu, Long Hải, Hồ Tràm đón nhiều khách du lịch từ TP.HCM, nên có không ít xe 7 chỗ, 16 chỗ vừa chở gia đình vừa chạy dịch vụ đưa khách ra biển. Các KCN Phú Mỹ, Mỹ Xuân, Châu Đức cũng có nhiều xe đưa đón công nhân theo ca.',
          'Nếu xe có chạy kinh doanh mà mua theo phí xe gia đình, khi xảy ra tai nạn lúc đang chở khách, hồ sơ bồi thường dễ bị đối chiếu lại mục đích sử dụng. Cách an toàn là khai đúng như trên giấy đăng ký và phù hiệu xe; xe đang chuyển sang chạy dịch vụ thì báo trước để điều chỉnh giấy chứng nhận.',
        ]],
        ['Hồ sơ cần gửi và thời gian nhận giấy chứng nhận', [
          'Chỉ cần ảnh giấy đăng ký xe (hai mặt) hoặc giấy tờ xe mới chưa có biển, số điện thoại và ngày muốn bắt đầu hiệu lực. Xe công ty gửi thêm tên công ty, mã số thuế để xuất hóa đơn.',
          'Với đội xe nhiều biển số, như xe đầu kéo chạy cảng Cái Mép hay xe đưa đón công nhân, nên lập bảng từng xe kèm ngày hết hạn đơn cũ. Mỗi xe nối tiếp đúng ngày của nó, tránh để một xe hở bảo hiểm vài ngày giữa hai kỳ.',
        ]],
        ['Khi va chạm trên quốc lộ 51 hay đường ven biển cần làm gì?', [
          'Quốc lộ 51 có nhiều xe container, xe bồn ra vào các KCN và cảng; rạng sáng 10/6/2025 hai xe container va chạm làm giao thông ùn ứ nhiều giờ. Khi va chạm, ưu tiên an toàn, gọi cấp cứu nếu có người bị thương và báo cơ quan chức năng khi cần. Chụp ảnh hiện trường, biển số các xe và giấy tờ liên quan trước khi di chuyển xe.',
          'Gọi tổng đài bồi thường PVI 1900 54 54 58 để được hướng dẫn. Không tự cam kết số tiền bồi thường với bên kia khi chưa có hướng dẫn của PVI, vì phần vượt phạm vi có thể không được trả.',
        ]],
      ],
      bangPhi: 'tnds',
      hoSo: ['Ảnh giấy đăng ký xe hai mặt, hoặc giấy tờ xe mới chưa có biển', 'Số chỗ ngồi hoặc tải trọng và mục đích sử dụng (gia đình hay kinh doanh)', 'Ngày cần hiệu lực, hoặc ngày hết hạn của đơn đang có', 'Tên, mã số thuế công ty nếu cần hóa đơn'],
      faqs: [
        ['Mua TNDS ô tô ở Vũng Tàu có rẻ hơn ở trung tâm TP.HCM không?', 'Không. Phí TNDS do Nghị định 67/2023/NĐ-CP quy định, giống nhau trên cả nước. Xe dưới 6 chỗ không kinh doanh đóng 437.000 đồng/năm chưa VAT ở bất kỳ đâu. Khác biệt chỉ ở dịch vụ và ưu đãi kèm theo.'],
        ['Không có bảo hiểm TNDS ô tô thì bị xử lý thế nào?', 'Đây là bảo hiểm bắt buộc, lái xe phải mang theo giấy chứng nhận (bản giấy hoặc bản điện tử) khi lưu thông. Thiếu giấy chứng nhận còn hiệu lực có thể bị xử phạt hành chính, và khi gây tai nạn chủ xe phải tự bồi thường toàn bộ.'],
        ['Giấy chứng nhận điện tử có dùng được khi bị kiểm tra không?', 'Có. Giấy chứng nhận bảo hiểm bắt buộc được cấp dạng điện tử có giá trị như bản giấy. Bạn lưu file trên điện thoại để xuất trình khi cần.'],
        ['Xe biển 72 (Bà Rịa – Vũng Tàu cũ) có phải đổi biển trước khi mua không?', 'Không. Bạn mua theo đúng biển số và thông tin trên giấy đăng ký xe hiện có. Hợp đồng TNDS có hiệu lực trên toàn lãnh thổ Việt Nam; bạn có thể mua tại văn phòng PVI Vũng Tàu hoặc qua PVI Online.'],
      ],
      nguon: ['Nghị định 67/2023/NĐ-CP, Phụ lục I; Văn bản hợp nhất 64/2026/VBHN-NĐ-BTC ngày 05/11/2026', 'VTV về tai nạn hai xe container trên quốc lộ 51 (6/2025)'],
    },
    {
      id: 'vatchatxeoto', nhom: 'xe', ten: 'Bảo hiểm vật chất xe ô tô', link: '/san-pham/bao-hiem-vat-chat-xe/',
      anh: 'vungtau-vat-chat-xe', anhTam: 'cac-loai-bao-hiem-xe-o-to', anhW: 1200, anhH: 630, anhAlt: coverSources.vcx.alt, cover: coverSources.vcx,
      related: ["tndsoto"],
      title: 'Bảo hiểm vật chất xe ô tô tại Vũng Tàu: thủy kích, cây đổ, phí',
      h1: 'Bảo hiểm vật chất xe ô tô tại Vũng Tàu',
      description: 'Bảo hiểm vật chất xe ô tô PVI tại Vũng Tàu: vì sao nên có ĐKBS 008 thủy kích khi mưa ngập, ví dụ xe 915 triệu đóng 9,15 triệu/năm, hồ sơ báo phí.',
      the: 'Trả chi phí sửa xe của bạn khi va chạm, cháy nổ, thiên tai, mất cắp. Chọn thêm thủy kích, sửa chính hãng.',
      lead: 'Bảo hiểm vật chất xe trả chi phí sửa chữa, thay thế cho chính chiếc xe của bạn khi va chạm, cháy nổ, thiên tai hoặc mất cắp toàn bộ xe. Ở Vũng Tàu, nơi mưa lớn có lúc làm ngập sâu đường trung tâm và giông lốc quật đổ cây xanh, điều khoản thủy kích (ĐKBS 008) là phần nên hỏi đầu tiên.',
      sections: [
        ['Vì sao xe ở Vũng Tàu cần để ý điều khoản thủy kích?', [
          'Rạng sáng 21/8/2025, sau cơn mưa hơn 2 giờ, nhiều nơi ở các phường Vũng Tàu, Tam Thắng, Rạch Dừa ngập sâu; đường Thi Sách có chỗ ngập khoảng 60 cm, có ô tô bị nước đẩy trôi. Mưa lớn trùng lúc triều cao làm nước rút chậm hơn.',
          'Xe đi vào đường ngập rồi chết máy là tình huống thủy kích. Hư hỏng động cơ do nước thuộc điều khoản bổ sung ĐKBS 008/XCG-PVI; hợp đồng không có điều khoản này thì không mặc định được trả phần động cơ. Khi mua, hỏi rõ xe đã có ĐKBS 008 chưa.',
        ]],
        ['Phạm vi cơ bản và 4 điều khoản bổ sung hay chọn', [
          'Phạm vi cơ bản gồm va chạm, cháy nổ, thiên tai và trộm cướp toàn bộ xe. Bốn điều khoản bổ sung thường mua kèm là ĐKBS 003 mất cắp bộ phận, ĐKBS 006 không khấu hao khi thay mới, ĐKBS 007 sửa chữa chính hãng và ĐKBS 008 động cơ do ảnh hưởng của nước.',
          'Xe mới hoặc xe giá trị cao ở Vũng Tàu thường chọn đủ 006, 007, 008. Xe đã nhiều năm có thể cân nhắc 008 trước tiên vì rủi ro ngập khi mưa lớn là rủi ro địa phương rõ nhất.',
        ]],
        ['Ví dụ phí thật: xe 915 triệu đóng bao nhiêu?', [
          'Theo một giấy chứng nhận PVI cấp tháng 10/2026: xe 7 chỗ không kinh doanh, số tiền bảo hiểm 915.000.000 đồng, có ĐKBS 006, 007, 008, mức khấu trừ 500.000 đồng/vụ, tổng phí 12 tháng 9.150.000 đồng đã gồm VAT.',
          'Phí xe khác phụ thuộc loại xe, tuổi xe, mục đích sử dụng và điều khoản chọn. Muốn so hai báo giá, phải so cùng giá trị xe, cùng điều khoản và cùng mức khấu trừ.',
        ]],
        ['Cây đổ, gió biển và hồ sơ gửi để nhận báo phí', [
          'Tháng 7/2025, giông lớn quét qua các phường Vũng Tàu, Bà Rịa và xã Ngãi Giao, quật đổ hàng chục cây xanh, đè hai ô tô. Thiệt hại do cây đổ, vật thể rơi khi giông bão được xem xét trong phạm vi vật chất xe theo quy tắc; TNDS không trả phần này.',
          'Gửi giấy đăng ký xe, đời xe, mục đích sử dụng, giá trị muốn bảo hiểm và ngày cần hiệu lực. PVI sẽ hướng dẫn chụp ảnh xe các góc để xác nhận tình trạng trước khi cấp đơn; vết trầy có sẵn nên chụp rõ, tránh tranh cãi khi bồi thường.',
        ]],
        ['Xe bị ngập hoặc va chạm ở Vũng Tàu: làm gì trước?', [
          'Xe chết máy trong vùng ngập thì không cố khởi động lại, vì nổ máy khi nước đã vào buồng đốt làm hư hỏng nặng hơn và có thể ảnh hưởng quyền lợi. Gọi cứu hộ kéo xe ra chỗ khô.',
          'Báo tổng đài bồi thường PVI 1900 54 54 58, chụp ảnh vị trí và mực nước. Đưa xe đến gara liên kết của PVI để giám định viên và gara thống nhất phương án trước khi tháo sửa.',
        ]],
      ],
      bangPhi: 'vcx',
      hoSo: ['Giấy đăng ký xe, đời xe và mục đích sử dụng', 'Giá trị xe muốn bảo hiểm', 'Điều khoản bổ sung muốn chọn (003, 006, 007, 008)', 'Ảnh xe các góc theo hướng dẫn, ảnh vết trầy có sẵn'],
      faqs: [
        ['Xe đỗ ven đường bị nước mưa ngập vào có được trả không?', 'Thiệt hại do thiên tai, ngập nước thuộc phạm vi xem xét theo quy tắc và điều khoản. Riêng hư hỏng động cơ do nước cần có ĐKBS 008. Kết quả cụ thể phụ thuộc nguyên nhân và giám định, nên hỏi rõ trường hợp xe đang đỗ khi mua.'],
        ['Mức khấu trừ 500.000 đồng/vụ là gì?', 'Là phần chủ xe tự chịu trong mỗi vụ tổn thất, bảo hiểm trả phần còn lại. Một số điều khoản bổ sung có mức khấu trừ riêng ghi trên hợp đồng.'],
        ['Có sửa xe tại gara chính hãng ở Vũng Tàu, Bà Rịa được không?', 'Được nếu hợp đồng có ĐKBS 007 sửa chữa chính hãng. Nên báo tên gara muốn sửa khi nhận báo phí để kiểm tra gara có liên kết với PVI.'],
        ['Xe điện có cần khai riêng giá trị pin không?', 'Có. Giấy chứng nhận PVI có dòng riêng cho giá trị bộ pin điện động cơ. Pin không mặc định được bảo hiểm nếu không khai đầy đủ giá trị và quyền sở hữu.'],
      ],
      nguon: ['Quy tắc bảo hiểm tự nguyện xe ô tô và các ĐKBS của Bảo hiểm PVI, hiệu lực 01/07/2025', 'Giấy chứng nhận bảo hiểm xe ô tô PVI cấp tháng 10/2026 (số liệu phí)', 'Báo Bà Rịa – Vũng Tàu về mưa ngập ngày 21/8/2025; VnExpress về giông tháng 7/2025'],
    },
    {
      id: 'chaynobatbuoc', nhom: 'tai-san', ten: 'Bảo hiểm cháy nổ bắt buộc', link: '/san-pham/chay-no-bat-buoc/',
      anh: 'vungtau-chay-no', anhTam: 'chay-no', anhAlt: coverSources.fire.alt, cover: coverSources.fire,
      related: ["taisannhaxuong","tainan2424"],
      title: 'Bảo hiểm cháy nổ bắt buộc tại Vũng Tàu: ai phải mua, phí, hồ sơ',
      h1: 'Mua bảo hiểm cháy nổ bắt buộc tại Vũng Tàu',
      description: 'Bảo hiểm cháy nổ bắt buộc tại Vũng Tàu cho nhà xưởng KCN Phú Mỹ, Mỹ Xuân, Cái Mép, khách sạn ven biển: cơ sở nào phải mua, thay đổi từ 15/9/2026, hồ sơ.',
      the: 'Cho nhà xưởng, kho, chợ, khách sạn thuộc diện phải mua. Tính phí theo Phụ lục VI Nghị định 105/2025.',
      lead: 'Cơ sở có nguy hiểm về cháy, nổ ở Vũng Tàu, Bà Rịa, Phú Mỹ, như nhà xưởng, kho hàng trong các KCN Phú Mỹ, Mỹ Xuân, Cái Mép, Đông Xuyên, khách sạn ven biển, phải mua bảo hiểm cháy nổ bắt buộc theo Nghị định 105/2025/NĐ-CP. Từ 15/9/2026, Nghị định 347/2026/NĐ-CP thay đổi cách chứng minh hồ sơ phòng cháy và cho tính phí riêng từng hạng mục.',
      sections: [
        ['Cơ sở nào ở Vũng Tàu phải mua bảo hiểm cháy nổ bắt buộc?', [
          'Danh mục cơ sở phải mua nằm trong Nghị định 105/2025/NĐ-CP. Nhóm hay gặp ở Vũng Tàu gồm nhà xưởng sản xuất, kho hàng, kho xăng dầu, khí hóa lỏng, chợ, trung tâm thương mại, khách sạn, nhà cao tầng và cơ sở kinh doanh xăng dầu.',
          'Từ 15/9/2026, Nghị định 347/2026/NĐ-CP bổ sung trường hợp không phải mua: nhà, công trình độc lập đáp ứng tiêu chuẩn phòng cháy và có mức độ nguy hiểm cháy thấp. Nếu chưa chắc cơ sở mình thuộc diện nào, gửi công năng và quy mô để được kiểm tra.',
        ]],
        ['Nhà xưởng trong KCN Phú Mỹ, Mỹ Xuân, Cái Mép cần lưu ý gì?', [
          'Địa bàn Bà Rịa – Vũng Tàu cũ có nhiều khu công nghiệp nặng: Phú Mỹ I, Phú Mỹ II, Phú Mỹ 3, Cái Mép, Mỹ Xuân A, A2, B1, Đông Xuyên, Long Sơn, Châu Đức, Đá Bạc. Tối 25/5/2026, cháy bùng lên ở xưởng tẩy gỉ của một nhà máy tôn trong KCN Phú Mỹ 1, thiêu rụi một phần nhà xưởng và nhiều tài sản.',
          'Theo Nghị định 347/2026, cơ sở có nhiều hạng mục độc lập, công năng khác nhau được tính phí riêng theo từng hạng mục nếu từng hạng mục đáp ứng yêu cầu an toàn. Lập danh mục tách xưởng, kho hóa chất, kho thành phẩm, văn phòng giúp phí phản ánh đúng rủi ro thay vì tính chung theo hạng mục nguy hiểm nhất.',
        ]],
        ['Hồ sơ phòng cháy thay đổi thế nào từ 15/9/2026?', [
          'Trước đây hồ sơ thường kèm văn bản chấp thuận nghiệm thu phòng cháy của cơ quan Công an. Từ 15/9/2026, thủ tục này bỏ; chủ đầu tư tự tổ chức nghiệm thu, tự chịu trách nhiệm và khai báo trên cơ sở dữ liệu về phòng cháy chữa cháy.',
          'Doanh nghiệp bảo hiểm không được từ chối bán vì cơ sở thiếu văn bản thẩm duyệt thiết kế phòng cháy. Dù vậy, nên chuẩn bị biên bản nghiệm thu tự tổ chức và thông tin hệ thống chữa cháy để báo phí sát rủi ro.',
        ]],
        ['Phí tính thế nào và tra ở đâu?', [
          'Phí bằng số tiền bảo hiểm nhân tỷ lệ phí theo loại cơ sở tại Phụ lục VI Nghị định 105/2025/NĐ-CP. Số tiền bảo hiểm tối thiểu là giá trị tài sản tính được thành tiền của nhà, công trình, máy móc và hàng hóa.',
          'Trang bảo hiểm cháy nổ bắt buộc có bộ tra 59 loại cơ sở theo Phụ lục VI và tính phí ước tính. Báo phí chính thức do PVI phát hành sau khi xem danh mục tài sản.',
        ]],
        ['Khách sạn, nhà nghỉ ven biển ở Vũng Tàu, Long Hải, Hồ Tràm', [
          'Khách sạn, nhà nghỉ thuộc diện nằm trong danh mục cơ sở có nguy hiểm về cháy, nổ theo quy mô và công năng. Mùa du lịch đông khách là lúc tải điện, bếp và khu giặt là cao nhất, nên thông tin hệ thống báo cháy, chữa cháy cần khai đầy đủ.',
          'Cơ sở sát biển còn chịu gió mạnh, giông lốc: tháng 7/2025 giông làm nhiều nhà ở Vũng Tàu, Bà Rịa tốc mái. Muốn bảo vệ cả giông bão, ngập nước, hãy hỏi thêm bảo hiểm tài sản với rủi ro mở rộng, mua chung một hợp đồng với phần cháy nổ bắt buộc.',
        ]],
      ],
      hoSo: ['Địa chỉ, công năng và quy mô từng hạng mục (xưởng, kho, văn phòng)', 'Danh mục và giá trị nhà, máy móc, hàng hóa theo từng hạng mục', 'Thông tin hệ thống chữa cháy, biên bản nghiệm thu tự tổ chức nếu có', 'Giấy chứng nhận cũ và các thay đổi so với kỳ trước khi tái tục'],
      faqs: [
        ['Thuê xưởng ở KCN Phú Mỹ, Mỹ Xuân thì ai mua bảo hiểm cháy nổ?', 'Ai có quyền lợi với tài sản thì mua cho tài sản đó. Thường chủ đầu tư hạ tầng hoặc chủ nhà xưởng mua cho phần nhà, doanh nghiệp thuê mua cho máy móc, hàng hóa của mình. Ghi rõ trong hợp đồng thuê để tránh trùng hoặc thiếu.'],
        ['Không mua bảo hiểm cháy nổ bắt buộc có bị phạt không?', 'Có. Cơ sở thuộc diện phải mua mà không mua có thể bị xử phạt theo Nghị định 106/2025/NĐ-CP, đã được sửa bởi Nghị định 347/2026/NĐ-CP.'],
        ['Homestay nhỏ ở Long Hải, Côn Đảo có phải mua không?', 'Phụ thuộc cơ sở có thuộc danh mục cơ sở có nguy hiểm về cháy, nổ hay không, dựa trên công năng và quy mô. Gửi số tầng, số phòng, diện tích và kết cấu để được kiểm tra trước khi quyết định.'],
        ['Mua cháy nổ bắt buộc ở Vũng Tàu có phải đến văn phòng không?', 'Không bắt buộc. Bạn gửi danh mục tài sản qua PVI Online hoặc liên hệ PVI Vũng Tàu. PVI có thể cử người khảo sát cơ sở khi cần.'],
      ],
      nguon: ['Nghị định 105/2025/NĐ-CP, Phụ lục VI; Nghị định 347/2026/NĐ-CP ngày 08/9/2026, hiệu lực 15/9/2026', 'Dân trí, VietNamNet về vụ cháy nhà máy trong KCN Phú Mỹ 1 (5/2026)'],
    },
    {
      id: 'taisannhaxuong', nhom: 'tai-san', ten: 'Bảo hiểm tài sản nhà xưởng', link: '/san-pham/chay-no-bat-buoc/',
      anh: 'vungtau-tai-san', anhTam: 'hero-tu-van', anhAlt: coverSources.warehouse.alt, cover: coverSources.warehouse,
      related: ["chaynobatbuoc","hanghoaxuatnhapkhau"],
      title: 'Bảo hiểm tài sản nhà xưởng tại Vũng Tàu: ngập, giông lốc, cháy',
      h1: 'Bảo hiểm tài sản nhà xưởng tại Vũng Tàu',
      description: 'Bảo hiểm tài sản nhà xưởng PVI tại Vũng Tàu, Phú Mỹ: bảo vệ nhà, máy móc, hàng tồn kho trước cháy, ngập, giông lốc. Cách kê khai tài sản để nhận báo phí đúng.',
      the: 'Cho nhà xưởng, máy móc, hàng tồn kho. Mở rộng rủi ro ngập, giông bão ngoài cháy nổ bắt buộc.',
      lead: 'Bảo hiểm tài sản bảo vệ nhà xưởng, máy móc và hàng tồn kho trước các rủi ro được chọn, rộng hơn phần cháy nổ bắt buộc. Với cơ sở ở Vũng Tàu, Phú Mỹ gần biển, gần sông Thị Vải hoặc vùng trũng, nên hỏi rõ rủi ro ngập, giông lốc khi lập phương án.',
      sections: [
        ['Khác gì bảo hiểm cháy nổ bắt buộc?', [
          'Cháy nổ bắt buộc là mức tối thiểu pháp luật yêu cầu, tập trung vào cháy và nổ. Bảo hiểm tài sản là hợp đồng tự nguyện, có thể mở rộng sang giông bão, lũ lụt, nước tràn, đổ vỡ máy móc tùy phương án.',
          'Doanh nghiệp thuộc diện bắt buộc thường mua chung một hợp đồng: phần cháy nổ bắt buộc theo quy định và phần mở rộng theo nhu cầu. Như vậy chỉ một đầu mối, một kỳ tái tục.',
        ]],
        ['Rủi ro riêng của nhà xưởng ở Vũng Tàu, Phú Mỹ', [
          'Nhiều nhà máy thép, hóa chất, kho xăng dầu và kho logistics đặt ven sông Thị Vải, gần cụm cảng Cái Mép để tiện xuất nhập hàng. Mái tôn, kết cấu nhẹ và hàng để ngoài bãi dễ chịu thiệt hại khi giông lốc: tháng 7/2025 giông quật đổ hàng chục cây xanh, làm nhiều nhà tốc mái ở Vũng Tàu, Bà Rịa.',
          'Ở khu vực TP Vũng Tàu cũ, rạng sáng 21/8/2025 mưa lớn làm ngập sâu nhiều nơi ở các phường Vũng Tàu, Tam Thắng, Rạch Dừa. Khi kê khai, nêu cao độ nền, khoảng cách tới sông, biển và lịch sử ngập của cơ sở để PVI đánh giá đúng.',
        ]],
        ['Kê khai tài sản theo địa điểm và chủ sở hữu', [
          'Chia danh mục thành ba nhóm: nhà và hạ tầng, máy móc thiết bị, hàng tồn kho. Mỗi nhóm ghi địa điểm, chủ sở hữu và cách xác định giá trị (giá trị còn lại hay giá trị thay thế mới).',
          'Doanh nghiệp có xưởng ở KCN Mỹ Xuân và kho bãi gần cảng Cái Mép nên lập bảng riêng cho từng địa điểm. Hàng nhận giữ hộ cho khách cần ghi riêng vì phạm vi có thể khác hàng của chính doanh nghiệp.',
        ]],
        ['Hàng tồn kho và hàng chờ xuất cảng', [
          'Kho logistics, kho thép, kho hạt nhựa quanh Phú Mỹ thường có lượng hàng thay đổi theo lịch tàu. Khai một con số cố định dễ dẫn tới bảo hiểm dưới giá trị vào lúc hàng dồn chờ xuất.',
          'Hỏi PVI phương án khai báo hàng tồn kho phù hợp với chu kỳ nhập xuất, và lưu sổ sách kho để làm căn cứ khi có tổn thất.',
        ]],
        ['Khi có tổn thất', [
          'Hạn chế thiệt hại lan rộng nếu an toàn, báo PVI ngay và giữ nguyên hiện trạng chờ giám định. Chụp ảnh, quay video khu vực bị ảnh hưởng.',
          'Chuẩn bị sổ sách tài sản, hóa đơn mua máy móc, phiếu nhập xuất kho. Không tự thanh lý hàng hư hỏng trước khi PVI xác nhận.',
        ]],
      ],
      hoSo: ['Địa chỉ, công năng từng xưởng, kho và khoảng cách tới sông, biển', 'Danh mục nhà, máy móc, hàng tồn kho kèm giá trị', 'Thông tin chủ sở hữu, tài sản thuê hoặc nhận giữ hộ', 'Lịch sử ngập, tổn thất các năm trước nếu có'],
      faqs: [
        ['Bảo hiểm tài sản có trả cho ngập do mưa lớn không?', 'Chỉ khi hợp đồng có rủi ro lũ lụt, nước tràn trong phạm vi. Bảo hiểm cháy nổ bắt buộc không mặc định gồm rủi ro này. Hỏi rõ và kiểm tra điều khoản trên bản chào phí.'],
        ['Mái tôn bị giông lốc thổi bay có được trả không?', 'Được xem xét nếu hợp đồng có rủi ro giông bão trong phạm vi và tổn thất đúng nguyên nhân đó. Mỗi rủi ro mở rộng thường có mức khấu trừ riêng, đọc kỹ trên bản chào phí.'],
        ['Máy móc thuê của công ty khác có mua được không?', 'Được nếu doanh nghiệp có trách nhiệm hoặc quyền lợi với tài sản đó theo hợp đồng thuê. Khai rõ chủ sở hữu và căn cứ để ghi đúng người được bảo hiểm.'],
        ['Có cần khảo sát cơ sở trước khi cấp đơn không?', 'Với cơ sở giá trị lớn hoặc rủi ro cao như kho hóa chất, kho xăng dầu, PVI thường khảo sát trước khi báo phí. Cơ sở nhỏ có thể báo phí dựa trên hồ sơ và ảnh chụp.'],
      ],
      nguon: ['Báo Bà Rịa – Vũng Tàu về mưa ngập ngày 21/8/2025; VnExpress về giông tháng 7/2025', 'Ban Quản lý các khu công nghiệp tỉnh Bà Rịa – Vũng Tàu, trang "Các khu công nghiệp"'],
    },
    {
      id: 'congtrinhlapdat', nhom: 'tai-san', ten: 'Bảo hiểm công trình và lắp đặt', link: '/san-pham/bao-hiem-cong-trinh/',
      anh: 'vungtau-cong-trinh', anhTam: 'hero-cong-trinh', anhAlt: coverSources.offshore.alt, cover: coverSources.offshore,
      related: ["nguoilaodongthicong"],
      title: 'Bảo hiểm công trình, lắp đặt tại Vũng Tàu: Nghị định 220/2026',
      h1: 'Bảo hiểm công trình và lắp đặt tại Vũng Tàu',
      description: 'Bảo hiểm công trình, lắp đặt PVI tại Vũng Tàu, Phú Mỹ theo Nghị định 220/2026: rủi ro công trình ven biển, cảng, nhà máy, hồ sơ cần gửi.',
      the: 'Cho chủ đầu tư và nhà thầu xây mới, cải tạo, lắp dây chuyền. Căn cứ Nghị định 220/2026/NĐ-CP.',
      lead: 'Từ 01/7/2026, Nghị định 220/2026/NĐ-CP là căn cứ hiện hành cho bảo hiểm bắt buộc trong đầu tư xây dựng. Chủ đầu tư và nhà thầu ở Vũng Tàu, Phú Mỹ cần kiểm tra công trình có thuộc diện bắt buộc không và đọc yêu cầu bảo hiểm riêng của gói thầu.',
      sections: [
        ['Công trình nào phải mua bảo hiểm?', [
          'Nghị định 220/2026/NĐ-CP quy định bảo hiểm bắt buộc trong hoạt động đầu tư xây dựng: bảo hiểm công trình trong thời gian xây dựng cho công trình thuộc diện bắt buộc, và bảo hiểm cho người lao động thi công trên công trường.',
          'Báo giá, giấy chứng nhận phát hành sau 01/7/2026 nên ghi căn cứ Nghị định 220/2026. Nếu báo giá còn ghi Thông tư 329/2016/TT-BTC là căn cứ đã hết hiệu lực, cần yêu cầu sửa.',
        ]],
        ['Công trình ven biển, ven sông Thị Vải có rủi ro gì riêng?', [
          'Công trình bến cảng, kè, nhà máy ven sông Thị Vải và bờ biển Vũng Tàu chịu sóng, gió mạnh và giông lốc trong mùa mưa. Vật tư, giàn giáo, cẩu tháp ngoài công trường là phần dễ bị thiệt hại nhất khi giông quét qua.',
          'Công trình đóng cọc, đào móng gần nhà dân, đường sá còn cần xem kỹ phần trách nhiệm đối với bên thứ ba, nhất là thiệt hại do lún, nứt, rung. Khai rõ công trình lân cận khi yêu cầu báo phí.',
        ]],
        ['Nhiều dự án cảng, công nghiệp đang triển khai', [
          'Cụm cảng Cái Mép – Thị Vải đang mở rộng: ngày 17/4/2026, dự án cảng nước sâu Gemalink giai đoạn 2 được động thổ. Các KCN Phú Mỹ 3, Cái Mép, Châu Đức cũng tiếp tục có nhà máy mới xây dựng.',
          'Nhà thầu tham gia các gói này thường được yêu cầu bảo hiểm công trình và bảo hiểm người lao động ngay trong hồ sơ dự thầu. Mức yêu cầu của chủ đầu tư có thể cao hơn mức tối thiểu của nghị định.',
        ]],
        ['Bảo hiểm lắp đặt cho dây chuyền, máy móc', [
          'Doanh nghiệp lắp mới dây chuyền trong các KCN Phú Mỹ, Mỹ Xuân, Châu Đức cần bảo hiểm lắp đặt cho giai đoạn vận chuyển vào công trường, lắp đặt và chạy thử. Giai đoạn chạy thử thường có điều kiện riêng.',
          'Gửi lịch lắp đặt, lịch chạy thử nghiệm và giá trị thiết bị để PVI xác định thời hạn bảo hiểm khớp tiến độ thực tế. Thiết bị nhập khẩu về cảng Cái Mép thì hỏi thêm cách nối với bảo hiểm hàng hóa chặng biển.',
        ]],
        ['Gia hạn khi chậm tiến độ', [
          'Mùa mưa, giông lốc ở Vũng Tàu có thể làm chậm tiến độ thi công. Khi dự kiến chậm, báo PVI trước ngày hết hạn để gia hạn, tránh để công trình hở bảo hiểm giữa chừng.',
        ]],
      ],
      hoSo: ['Tên, địa chỉ dự án, hạng mục và dự toán (giá trị hợp đồng xây dựng)', 'Tiến độ thi công, lịch lắp đặt, chạy thử và bàn giao', 'Yêu cầu bảo hiểm trong hồ sơ mời thầu hoặc hợp đồng', 'Công trình lân cận, nhà dân cần xem xét trách nhiệm bên thứ ba'],
      faqs: [
        ['Hợp đồng ký trước 01/7/2026 có phải mua lại theo Nghị định 220 không?', 'Hợp đồng bảo hiểm đã ký vẫn thực hiện theo nội dung đã ký đến hết thời hạn. Khi gia hạn hoặc mua mới sau 01/7/2026, áp dụng căn cứ Nghị định 220/2026.'],
        ['Xây khách sạn, nhà ở ven biển có phải mua không?', 'Phụ thuộc công trình có thuộc diện bắt buộc theo nghị định hay không. Nhiều chủ đầu tư vẫn mua tự nguyện để bảo vệ công trình trước giông bão và trách nhiệm với nhà lân cận.'],
        ['Ai mua: chủ đầu tư hay nhà thầu?', 'Thường chủ đầu tư mua bảo hiểm công trình, nhà thầu mua bảo hiểm cho người lao động và thiết bị thi công của mình. Hợp đồng xây dựng có thể phân công khác, nên đọc kỹ điều khoản bảo hiểm.'],
        ['Công trình bị giông lốc làm đổ giàn giáo có được trả không?', 'Thiệt hại do thiên tai như giông bão thuộc phạm vi xem xét của bảo hiểm công trình theo điều khoản đã chọn. Mỗi loại rủi ro có thể có mức khấu trừ riêng; chụp ảnh hiện trường và báo PVI trước khi dọn dẹp.'],
      ],
      nguon: ['Nghị định 220/2026/NĐ-CP, hiệu lực 01/7/2026', 'Báo Sài Gòn Giải Phóng, Bộ Xây dựng về cụm cảng Cái Mép – Thị Vải và dự án Gemalink giai đoạn 2 (2026)'],
    },
    {
      id: 'hanghoaxuatnhapkhau', nhom: 'tai-san', ten: 'Bảo hiểm hàng hóa xuất nhập khẩu', link: '/san-pham/hang-hoa-xuat-nhap-khau/',
      anh: 'vungtau-hang-hoa', anhTam: 'hang-hoa', anhAlt: coverSources.cargo.alt, cover: coverSources.cargo,
      related: ["taisannhaxuong"],
      title: 'Bảo hiểm hàng hóa xuất nhập khẩu tại Vũng Tàu: cảng Cái Mép',
      h1: 'Bảo hiểm hàng hóa xuất nhập khẩu tại Vũng Tàu',
      description: 'Bảo hiểm hàng hóa xuất nhập khẩu tại Vũng Tàu cho lô hàng qua cảng Cái Mép – Thị Vải: điều kiện bảo hiểm, giá trị, hồ sơ, khi hàng tổn thất.',
      the: 'Cho lô hàng qua cụm cảng Cái Mép – Thị Vải. Báo phí theo giá trị, bao bì, hành trình.',
      lead: 'Bảo hiểm hàng hóa trả cho tổn thất của lô hàng trên đường vận chuyển, theo điều kiện bảo hiểm được chọn. Doanh nghiệp xuất nhập khẩu ở Phú Mỹ, Vũng Tàu cần khai đúng hành trình thật: hàng đóng container tại kho trong KCN, kéo ra cảng Cái Mép – Thị Vải rồi lên tàu mẹ đi thẳng hay chuyển tải.',
      sections: [
        ['Hành trình hàng hóa qua Cái Mép – Thị Vải thường đi thế nào?', [
          'Cụm cảng Cái Mép – Thị Vải là cụm cảng nước sâu của khu vực phía Nam. Theo Hiệp hội Cảng biển Việt Nam, các hãng tàu lớn duy trì khoảng 48 tuyến container quốc tế mỗi tuần tại đây, trong đó hơn 20 tuyến tàu mẹ đi thẳng châu Âu và hai bờ nước Mỹ.',
          'Hàng từ KCN Phú Mỹ, Mỹ Xuân, Châu Đức thường đi bằng xe đầu kéo trên quốc lộ 51 hoặc đường nội bộ ra cảng. Chặng đường bộ từ kho tới cảng là một phần của hành trình, cần được tính vào phạm vi bảo hiểm.',
        ]],
        ['Thép, hóa chất, hạt nhựa, hàng lạnh cần lưu ý điều kiện nào?', [
          'Hàng thép cuộn, thép tấm dễ bị gỉ do nước biển, hơi ẩm trong container. Hóa chất, hạt nhựa đóng bao dễ rách bao, nhiễm bẩn khi bốc xếp. Hàng lạnh có rủi ro hỏng do sự cố máy lạnh container, thường cần điều kiện hoặc điều khoản riêng.',
          'Khi nhận báo phí, hỏi rõ điều kiện bảo hiểm A, B hay C và các điều khoản bổ sung cho rủi ro gỉ, ẩm, hấp hơi phù hợp với loại hàng.',
        ]],
        ['Giá trị bảo hiểm và điều kiện giao hàng', [
          'Giá trị bảo hiểm thường tính theo giá CIF cộng thêm một tỷ lệ lãi dự tính. Ai mua bảo hiểm phụ thuộc điều kiện giao hàng: bán CIF thì người bán mua, bán FOB thì người mua tự lo.',
          'Đối chiếu điều kiện Incoterms trên hợp đồng mua bán trước khi mua, tránh cả hai bên cùng mua hoặc không bên nào mua.',
        ]],
        ['Hồ sơ cần chuẩn bị', [
          'Gửi hóa đơn thương mại, danh sách đóng gói, vận đơn hoặc thông tin tàu, cảng đi, cảng đến, ngày khởi hành. Hàng có chặng chuyển tải hoặc chặng sà lan nội địa thì ghi rõ từng chặng.',
          'Doanh nghiệp xuất hàng đều đặn qua Cái Mép nên hỏi hợp đồng bao (open cover) để không phải mua lẻ từng lô.',
        ]],
        ['Khi hàng bị tổn thất', [
          'Kiểm tra hàng ngay khi nhận, ghi chú tình trạng trên phiếu giao nhận nếu thấy bao bì rách, ướt, container hư. Báo PVI và giữ nguyên hàng chờ giám định.',
          'Gửi thư khiếu nại cho người vận chuyển trong thời hạn quy định để giữ quyền đòi bồi hoàn, PVI sẽ hướng dẫn mẫu thư.',
        ]],
      ],
      hoSo: ['Loại hàng, hóa đơn thương mại, giá trị lô hàng', 'Quy cách đóng gói, container khô hay lạnh', 'Hành trình: kho, cảng Cái Mép – Thị Vải, cảng chuyển tải, cảng đến, ngày khởi hành', 'Điều kiện giao hàng (Incoterms) trên hợp đồng mua bán'],
      faqs: [
        ['Chặng xe đầu kéo từ KCN ra cảng Cái Mép có được bảo hiểm không?', 'Có thể gộp vào một hợp đồng bảo hiểm cho cả hành trình từ kho đến cảng đích, miễn là khai rõ chặng đường bộ. Không khai thì chặng này có thể không thuộc phạm vi.'],
        ['Thép cuộn bị gỉ khi tới nơi có được trả không?', 'Phụ thuộc điều kiện bảo hiểm và nguyên nhân. Gỉ do nước biển xâm nhập trong hành trình được xem xét theo điều kiện đã chọn; gỉ do bản chất hàng hoặc đóng gói không đạt thường bị loại trừ. Hỏi điều khoản phù hợp khi mua.'],
        ['Xuất hàng thường xuyên qua Cái Mép có phải mua lẻ từng lô không?', 'Không bắt buộc. Doanh nghiệp xuất nhập đều đặn có thể hỏi hợp đồng bao (open cover), khai báo từng lô theo kỳ, phí tính theo giá trị thực tế từng lô.'],
        ['Có cần mua cho hàng nhập khẩu về Phú Mỹ không?', 'Nếu mua theo điều kiện FOB hoặc CFR, người mua ở Phú Mỹ chịu rủi ro từ khi hàng lên tàu, nên tự mua bảo hiểm cho chặng biển và chặng nội địa về kho.'],
      ],
      nguon: ['Báo Sài Gòn Giải Phóng, Bộ Xây dựng về cụm cảng Cái Mép – Thị Vải, số liệu của Hiệp hội Cảng biển Việt Nam (2026)'],
    },
    {
      id: 'nguoilaodongthicong', nhom: 'con-nguoi', ten: 'Bảo hiểm người lao động thi công', link: '/san-pham/bao-hiem-tai-nan/',
      anh: 'vungtau-cong-nhan-thi-cong', anhTam: 'tn-hinh-cong-truong', anhW: 760, anhH: 950, anhAlt: coverSources.workers.alt, cover: coverSources.workers,
      related: ["congtrinhlapdat","tainan2424"],
      title: 'Bảo hiểm người lao động thi công tại Vũng Tàu: Nghị định 220/2026',
      h1: 'Bảo hiểm người lao động thi công tại Vũng Tàu',
      description: 'Bảo hiểm người lao động thi công tại Vũng Tàu, Phú Mỹ theo Nghị định 220/2026: nhà thầu nào phải mua, yêu cầu gói thầu, danh sách công nhân.',
      the: 'Cho nhà thầu cần bảo hiểm đội thi công. Căn cứ Nghị định 220/2026/NĐ-CP, khai theo công trình.',
      lead: 'Nhà thầu thi công ở Vũng Tàu, Bà Rịa, Phú Mỹ phải mua bảo hiểm cho người lao động trên công trường thuộc diện bắt buộc, theo Nghị định 220/2026/NĐ-CP từ 01/7/2026. Hai thứ cần kiểm tra là mức trách nhiệm cho mỗi người và căn cứ pháp lý ghi trên báo giá.',
      sections: [
        ['Nhà thầu nào phải mua?', [
          'Nhà thầu thi công xây dựng có người lao động làm việc trên công trường thuộc diện bảo hiểm bắt buộc theo Nghị định 220/2026/NĐ-CP. Phạm vi công trình thuộc diện bắt buộc và mức trách nhiệm tối thiểu được quy định trong nghị định, đối chiếu theo loại công trình.',
          'Phí được xác định theo loại, giá trị và tiến độ của từng công trình. Gửi thông tin hạng mục để được báo phí phù hợp.',
        ]],
        ['Đọc yêu cầu riêng của gói thầu', [
          'Hồ sơ mời thầu của chủ đầu tư thường đặt mức yêu cầu cao hơn mức tối thiểu của nghị định. Mua đúng mức tối thiểu vẫn có thể bị loại nếu gói thầu đòi cao hơn.',
          'Các gói thầu cảng, nhà máy ở Cái Mép, Phú Mỹ thường có yêu cầu bảo hiểm cụ thể, có khi theo chuẩn của chủ đầu tư nước ngoài. Gửi trích đoạn yêu cầu bảo hiểm của gói thầu để báo giá khớp ngay từ đầu.',
        ]],
        ['Công việc trên cao, trên sà lan, gần biển cần khai rõ', [
          'Thi công bến cảng, kè biển, nhà xưởng khung thép ở Vũng Tàu có nhiều hạng mục làm việc trên sà lan, gần nước, trên cao và dưới cẩu. Khai đúng nhóm công việc giúp phạm vi bảo hiểm phản ánh rủi ro thật.',
          'Nếu nhân sự thay đổi trong thời gian thi công, hỏi cách bổ sung, giảm người trong danh sách để luôn khớp với thực tế công trường.',
        ]],
        ['Khi có tai nạn trên công trường', [
          'Sơ cứu, đưa người lao động đi cấp cứu và báo cơ quan chức năng khi cần. Lập biên bản tai nạn lao động theo quy định, chụp ảnh hiện trường.',
          'Báo PVI sớm, chuẩn bị giấy tờ y tế, hóa đơn và danh sách người lao động có tên người bị nạn. Hồ sơ đầy đủ ngay từ đầu giúp rút ngắn thời gian giải quyết.',
        ]],
        ['Bảo hiểm tai nạn 24/24 có thay thế được không?', [
          'Không nên dùng thay. Bảo hiểm tai nạn 24/24 là sản phẩm tự nguyện, mục đích khác; hồ sơ thầu cần đúng sản phẩm theo căn cứ Nghị định 220/2026. Nhà thầu có thể mua thêm 24/24 để bảo vệ công nhân ngoài giờ làm, kể cả trên đường đi làm qua quốc lộ 51.',
        ]],
      ],
      hoSo: ['Tên nhà thầu, tên và địa chỉ công trình', 'Loại công trình, hạng mục, thời gian thi công', 'Nhóm công việc và số người, danh sách theo mẫu khi được hướng dẫn', 'Trích yêu cầu bảo hiểm trong hồ sơ mời thầu'],
      faqs: [
        ['Báo giá còn ghi Thông tư 329/2016 có dùng được không?', 'Không nên. Thông tư 329/2016/TT-BTC đã hết hiệu lực. Báo giá phát hành sau 01/7/2026 nên ghi căn cứ Nghị định 220/2026/NĐ-CP.'],
        ['Công nhân thời vụ có mua được không?', 'Được. Khai danh sách và thời gian làm việc theo hướng dẫn; khi thay người thì báo bổ sung.'],
        ['Công nhân làm trên sà lan, dưới nước có được bảo hiểm không?', 'Được xem xét nếu khai đúng nhóm công việc và nơi làm việc khi mua. Công việc dưới nước, lặn hoặc trên biển xa bờ có thể có điều kiện riêng, nên hỏi trước khi chốt danh sách.'],
        ['Mua theo công trình hay theo năm?', 'Bảo hiểm người lao động thi công thường mua theo thời gian thi công của công trình. Nhà thầu nhiều công trình nên hỏi phương án theo từng công trình.'],
      ],
      nguon: ['Nghị định 220/2026/NĐ-CP, hiệu lực 01/7/2026', 'Báo Sài Gòn Giải Phóng, Bộ Xây dựng về các dự án ở cụm cảng Cái Mép – Thị Vải (2026)'],
    },
    {
      id: 'tainan2424', nhom: 'con-nguoi', ten: 'Bảo hiểm tai nạn 24/24 cho công nhân', link: '/san-pham/bao-hiem-tai-nan/',
      anh: 'vungtau-tai-nan', anhTam: 'tu-van-doanh-nghiep', anhAlt: coverSources.accident.alt, cover: coverSources.accident,
      related: ["nguoilaodongthicong","suckhoe"],
      title: 'Bảo hiểm tai nạn 24/24 công nhân tại Vũng Tàu: phí từ 50.000 đ',
      h1: 'Bảo hiểm tai nạn 24/24 cho công nhân tại Vũng Tàu',
      description: 'Bảo hiểm tai nạn 24/24 PVI cho công nhân KCN Phú Mỹ, Mỹ Xuân, Châu Đức: phí 0,25%/năm, gói 100 triệu 250.000 đ/người, giảm 20–55% theo số người.',
      the: 'Cho doanh nghiệp mua theo danh sách nhân viên. Phí 0,25%/năm, giảm theo quy mô nhóm.',
      lead: 'Bảo hiểm tai nạn 24/24 trả tiền khi người được bảo hiểm bị tai nạn, cả trong và ngoài giờ làm. Phí tham khảo của PVI là 0,25% số tiền bảo hiểm mỗi năm: gói 100 triệu đồng là 250.000 đồng một người, nhóm từ 20 người được giảm phí.',
      sections: [
        ['Vì sao doanh nghiệp ở KCN Phú Mỹ, Mỹ Xuân hay mua?', [
          'Công nhân các KCN Phú Mỹ, Mỹ Xuân, Cái Mép, Châu Đức phần lớn đi làm bằng xe máy, nhiều người đi trên quốc lộ 51, nơi có mật độ xe container, xe bồn cao. Bảo hiểm tai nạn 24/24 bảo vệ cả quãng đường đi làm và thời gian ngoài giờ, không chỉ trong xưởng.',
          'Đây là sản phẩm tự nguyện, thường được dùng như một phúc lợi giữ chân người lao động, bổ sung cho bảo hiểm xã hội và bảo hiểm y tế.',
        ]],
        ['Bảng phí tham khảo theo số tiền bảo hiểm', [
          'Phí tính theo tỷ lệ 0,25% số tiền bảo hiểm cho một người một năm. Gói 20 triệu đồng là 50.000 đồng, 50 triệu là 125.000 đồng, 100 triệu là 250.000 đồng, 200 triệu là 500.000 đồng.',
          'Đây là phí tham khảo cho thời hạn 1 năm, chưa gồm thẩm định nhóm nghề. Báo phí chính thức do PVI phát hành sau khi kiểm tra danh sách.',
        ]],
        ['Giảm phí theo quy mô nhóm', [
          'Từ 01/01/2026, danh sách 20–100 người giảm 20%, 101–300 người giảm 35%, 301–500 người giảm 50%, từ 501 người giảm 55%. Với gói 100 triệu, nhóm 20–100 người đóng 200.000 đồng một người một năm.',
          'Ví dụ một xưởng ở KCN Mỹ Xuân có 50 công nhân mua gói 100 triệu: 50 × 200.000 = 10.000.000 đồng một năm, theo phí tham khảo.',
        ]],
        ['Danh sách và thay đổi nhân sự', [
          'Gửi danh sách gồm họ tên, ngày sinh, số định danh, bộ phận hoặc nhóm nghề. Nhóm công việc nặng như luyện thép, bốc xếp cảng, làm trên cao hay vận hành máy cần khai đúng để báo phí khớp.',
          'Khi tuyển thêm hoặc nghỉ việc, báo bổ sung, giảm người theo kỳ để danh sách luôn đúng với thực tế.',
        ]],
        ['Khi công nhân bị tai nạn', [
          'Đưa người bị nạn đi cấp cứu trước. Sau đó báo PVI, giữ giấy ra viện, hóa đơn, biên bản tai nạn nếu có.',
          'Quyền lợi thương tật trả theo bảng tỷ lệ thương tật. Ví dụ gãy xương chày có phẫu thuật, can tốt là 18%, với gói 100 triệu tối đa 18 triệu đồng.',
        ]],
      ],
      bangPhi: 'tainan',
      hoSo: ['Số người theo bộ phận, ca làm hoặc nhóm nghề', 'Danh sách họ tên, ngày sinh, số định danh', 'Số tiền bảo hiểm muốn chọn và thời hạn', 'Nhu cầu bổ sung, giảm người trong kỳ'],
      faqs: [
        ['Bảo hiểm tai nạn 24/24 có bắt buộc không?', 'Với cá nhân là tự nguyện. Doanh nghiệp có nghĩa vụ riêng về an toàn lao động và bảo hiểm xã hội; 24/24 là phúc lợi bổ sung.'],
        ['Tai nạn xe máy trên quốc lộ 51 khi đi làm có được trả không?', 'Tai nạn giao thông thuộc phạm vi xem xét, trừ các trường hợp loại trừ ghi trong quy tắc bảo hiểm, ví dụ người điều khiển xe có nồng độ cồn vượt mức quy định. Đọc mục loại trừ trên giấy chứng nhận.'],
        ['Công nhân bốc xếp cảng Cái Mép có mua được không?', 'Được. Nhóm công việc bốc xếp, vận hành thiết bị nâng có tỷ lệ phí theo mức độ rủi ro, nên khai đúng nhóm nghề trong danh sách để báo phí khớp.'],
        ['Mua 3 tháng cho công nhân thời vụ được không?', 'Được, áp dụng biểu phí ngắn hạn. Hỏi PVI tỷ lệ phí theo số tháng khi gửi danh sách.'],
      ],
      nguon: ['Biểu phí bảo hiểm tai nạn PVI và mức giảm theo nhóm áp dụng từ 01/01/2026 (bài "Bảo hiểm tai nạn bao nhiêu tiền" trên pvihcm.com)', 'VTV về tai nạn xe container trên quốc lộ 51 (6/2025)'],
    },
    {
      id: 'suckhoe', nhom: 'con-nguoi', ten: 'Bảo hiểm sức khỏe', link: '/san-pham/bao-hiem-suc-khoe/',
      anh: 'vungtau-suc-khoe', anhTam: 'hero-suc-khoe', anhAlt: coverSources.health.alt, cover: coverSources.health,
      related: ["tainan2424"],
      title: 'Bảo hiểm sức khỏe PVI Care tại Vũng Tàu: nội trú, ngoại trú',
      h1: 'Bảo hiểm sức khỏe tại Vũng Tàu',
      description: 'Bảo hiểm sức khỏe PVI Care tại Vũng Tàu cho cá nhân, gia đình, nhân viên: so quyền lợi nội trú, ngoại trú, bảo lãnh viện phí, thời gian chờ và hồ sơ cần gửi.',
      the: 'Cho cá nhân, gia đình hoặc nhân viên. So quyền lợi nội trú, ngoại trú và bảo lãnh viện phí.',
      lead: 'Bảo hiểm sức khỏe PVI Care chi trả chi phí điều trị nội trú, và ngoại trú nếu chọn thêm, theo hạn mức của chương trình. Người ở Vũng Tàu, Bà Rịa, Phú Mỹ nên hỏi danh sách bệnh viện bảo lãnh viện phí gần nơi ở và ở trung tâm TP.HCM trước khi chọn gói.',
      sections: [
        ['Nội trú, ngoại trú: chọn phần nào?', [
          'Quyền lợi nội trú chi trả khi phải nằm viện, phẫu thuật. Ngoại trú chi trả khám bệnh, thuốc không nằm viện, thường là phần chọn thêm và có hạn mức mỗi lần khám.',
          'Gia đình có trẻ nhỏ hay khám ngoại trú thường cần phần ngoại trú. Người trẻ ít bệnh có thể chọn nội trú để giảm phí.',
        ]],
        ['Bảo lãnh viện phí ở Vũng Tàu và TP.HCM', [
          'Nhiều người ở Vũng Tàu, Bà Rịa vừa khám ở địa phương, vừa lên trung tâm TP.HCM khi cần điều trị chuyên sâu. Bảo lãnh viện phí giúp không phải ứng tiền khi điều trị tại bệnh viện có liên kết.',
          'Danh sách bệnh viện bảo lãnh có thể thay đổi theo thời điểm. Hỏi danh sách hiện hành khi nhận báo phí, nhất là bệnh viện bạn hay khám ở Vũng Tàu, Bà Rịa.',
        ]],
        ['Thời gian chờ và bệnh có sẵn', [
          'Bảo hiểm sức khỏe có thời gian chờ cho bệnh thông thường, bệnh đặc biệt và thai sản. Bệnh có sẵn trước khi tham gia có thể bị loại trừ hoặc áp điều kiện riêng.',
          'Khai trung thực tờ khai sức khỏe. Khai sai có thể làm hợp đồng bị từ chối chi trả về sau.',
        ]],
        ['Cách đọc bảng quyền lợi trước khi chọn gói', [
          'Mỗi gói có hạn mức năm và hạn mức con: tiền phòng mỗi ngày, chi phí phẫu thuật, số lần khám ngoại trú, hạn mức mỗi lần khám. Gói có hạn mức năm cao nhưng hạn mức phòng thấp vẫn có thể phải bù tiền khi nằm phòng dịch vụ.',
          'So hai gói thì so cùng các dòng: hạn mức năm, tiền phòng, phẫu thuật, ngoại trú, thai sản, nha khoa. Hỏi phần đồng chi trả nếu có, tức phần người được bảo hiểm tự trả theo tỷ lệ.',
        ]],
        ['Hồ sơ yêu cầu bồi thường khi không dùng bảo lãnh', [
          'Khám ở nơi không có bảo lãnh thì tự thanh toán rồi gửi hồ sơ yêu cầu bồi thường: giấy ra viện hoặc sổ khám, đơn thuốc, hóa đơn, bảng kê chi phí. Chụp đủ các trang, giữ bản gốc.',
          'Gửi hồ sơ sớm sau khi điều trị xong. Thiếu chứng từ là lý do hay gặp khiến hồ sơ phải bổ sung nhiều lần.',
        ]],
        ['Bảo hiểm sức khỏe cho nhân viên doanh nghiệp', [
          'Doanh nghiệp trong các KCN Phú Mỹ, Mỹ Xuân, Đông Xuyên mua cho nhân viên theo nhóm có thể được áp điều kiện riêng cho nhóm, khác với mua lẻ. Gửi số người, nhóm tuổi và chương trình mong muốn để nhận báo phí nhóm.',
        ]],
      ],
      hoSo: ['Số người, nhóm tuổi, ngày cần hiệu lực', 'Nhu cầu nội trú, ngoại trú và bệnh viện hay khám', 'Tờ khai sức khỏe theo hướng dẫn', 'Danh sách nhân viên nếu mua theo nhóm'],
      faqs: [
        ['Mua PVI Care ở Vũng Tàu, khám ở trung tâm TP.HCM được không?', 'Được. Hợp đồng có hiệu lực toàn quốc. Khám ở bệnh viện có bảo lãnh thì xuất thẻ, ở nơi khác thì giữ hóa đơn để yêu cầu bồi thường.'],
        ['Có bảo hiểm y tế rồi có cần mua thêm không?', 'Bảo hiểm y tế chi trả theo danh mục và mức hưởng của Nhà nước. Bảo hiểm sức khỏe tư nhân bù phần chi phí ngoài, như phòng dịch vụ, thuốc ngoài danh mục, theo hạn mức gói.'],
        ['Người lớn tuổi có mua được không?', 'Mỗi chương trình có giới hạn tuổi tham gia và tái tục riêng. Gửi ngày sinh để kiểm tra chương trình phù hợp.'],
        ['Người ở Côn Đảo có mua được không?', 'Được. Toàn bộ thủ tục có thể làm qua PVI Online. Hợp đồng có hiệu lực toàn quốc; điều trị ở nơi không có bảo lãnh thì giữ đủ hóa đơn, giấy tờ y tế để yêu cầu bồi thường.'],
      ],
      nguon: ['Thông tin sản phẩm PVI Care trên pvihcm.com/san-pham/bao-hiem-suc-khoe/'],
    },
    {
      id: 'dulichquocte', nhom: 'con-nguoi', ten: 'Bảo hiểm du lịch quốc tế', link: '/san-pham/bao-hiem-du-lich/',
      anh: 'vungtau-du-lich', anhTam: 'hero-du-lich', anhAlt: coverSources.travel.alt, cover: coverSources.travel,
      related: ["suckhoe"],
      title: 'Bảo hiểm du lịch quốc tế tại Vũng Tàu: visa Schengen, mua online',
      h1: 'Bảo hiểm du lịch quốc tế tại Vũng Tàu',
      description: 'Bảo hiểm du lịch quốc tế PVI cho người ở Vũng Tàu, Bà Rịa: chọn chương trình theo điểm đến, visa Schengen, mua và nhận chứng nhận online qua Zalo.',
      the: 'Cho chuyến du lịch, công tác, thăm thân. Tra phí theo điểm đến, số ngày và chương trình.',
      lead: 'Bảo hiểm du lịch quốc tế chi trả chi phí y tế khẩn cấp, hành lý, chậm chuyến bay khi ở nước ngoài, theo chương trình được chọn. Người ở Vũng Tàu, Bà Rịa, Phú Mỹ có thể mua online và nhận giấy chứng nhận điện tử để nộp hồ sơ visa, không cần lên trung tâm TP.HCM.',
      sections: [
        ['Chọn chương trình theo điểm đến', [
          'Phí và hạn mức phụ thuộc điểm đến (châu Á, châu Âu, toàn cầu), số ngày và chương trình. Đi khu Schengen cần mức chi phí y tế đáp ứng yêu cầu visa, kiểm tra trước khi nộp hồ sơ.',
          'Kỹ sư, chuyên viên làm việc cho doanh nghiệp dầu khí, cảng biển ở Vũng Tàu hay đi công tác nước ngoài; chuyến công tác nên chọn thời hạn khớp lịch trình và hỏi quyền lợi cho công việc tại hiện trường nếu có.',
        ]],
        ['Mua trước khi khởi hành', [
          'Bảo hiểm phải mua trước khi rời Việt Nam. Mua sớm còn giúp được bảo vệ khi chuyến đi bị hủy vì lý do thuộc phạm vi, nếu chương trình có quyền lợi này.',
          'Giấy chứng nhận điện tử dùng được cho hồ sơ visa. Lưu bản trên điện thoại và in một bản mang theo.',
        ]],
        ['Du học, công tác dài hạn', [
          'Du học sinh hoặc người công tác dài hạn cần chương trình có thời hạn dài và đáp ứng yêu cầu của trường, đơn vị tiếp nhận. Gửi yêu cầu bảo hiểm của trường để chọn đúng.',
        ]],
        ['Quyền lợi nào nên đọc kỹ?', [
          'Phần quan trọng nhất là chi phí y tế khẩn cấp và vận chuyển cấp cứu, vì chi phí điều trị ở nước ngoài có thể rất cao. Sau đó mới đến hành lý, giấy tờ, chậm hoặc hủy chuyến bay.',
          'Đọc mục loại trừ: bệnh có sẵn, hoạt động thể thao mạo hiểm, chuyến đi nhằm mục đích chữa bệnh thường không thuộc phạm vi. Người quen chơi thể thao biển, lặn biển ở Côn Đảo mà định lặn ở nước ngoài thì hỏi trước khi mua.',
        ]],
        ['Mua từ Vũng Tàu, không cần đến văn phòng', [
          'Toàn bộ quy trình có thể làm qua Zalo: gửi ảnh hộ chiếu, ngày đi về, điểm đến, nhận báo phí, thanh toán và nhận giấy chứng nhận điện tử. Phù hợp với khách ở Vũng Tàu, Bà Rịa, Phú Mỹ hay các xã xa như Xuyên Mộc, Hồ Tràm, Bình Châu.',
        ]],
        ['Khi gặp sự cố ở nước ngoài', [
          'Gọi số hỗ trợ khẩn cấp trên giấy chứng nhận trước khi điều trị nếu có thể. Giữ hóa đơn, giấy tờ y tế, biên bản của hãng bay hoặc công an để yêu cầu bồi thường khi về nước.',
        ]],
      ],
      hoSo: ['Điểm đến, ngày đi, ngày về, mục đích chuyến đi', 'Họ tên, ngày sinh, số hộ chiếu', 'Yêu cầu bảo hiểm của lãnh sự quán hoặc trường học nếu có'],
      faqs: [
        ['Mua bảo hiểm du lịch cho cả nhà được không?', 'Được, có chương trình gia đình. Gửi số người và độ tuổi để được báo phí.'],
        ['Đã ra nước ngoài rồi có mua được không?', 'Thông thường phải mua trước khi khởi hành. Hỏi PVI trước nếu chuyến đi đã bắt đầu.'],
        ['Đi công tác nước ngoài theo cử của công ty có mua được không?', 'Được. Doanh nghiệp có thể mua cho từng chuyến hoặc hỏi phương án cho nhân viên đi lại nhiều lần trong năm. Gửi danh sách người, điểm đến và thời gian dự kiến.'],
        ['Giấy chứng nhận có dùng nộp hồ sơ visa được không?', 'Được, nếu chương trình đáp ứng yêu cầu của nước cấp visa, ví dụ mức chi phí y tế tối thiểu cho khu Schengen. Báo nước đến khi mua để chọn đúng chương trình.'],
      ],
      nguon: ['Thông tin sản phẩm du lịch quốc tế trên pvihcm.com/san-pham/bao-hiem-du-lich/'],
    },
  ],
};
