// Nhánh khu vực CẦN THƠ (TP Cần Thơ cũ, trước sắp xếp 01/7/2025). Trang mẫu đầu tiên của loạt tỉnh từ
// Bình Thuận trở vào (chủ site giao 20/11/2026), dựng theo cấu trúc /binhduong/ và SO-DO-TRANG.md.
// Chỉ dùng dữ kiện có nguồn: danh bạ PVI (tools/data/don-vi-thanh-vien-pvi.json), dữ liệu sản phẩm của web
// (tnds.mjs, vcx.mjs, bài phí tai nạn, Nghị định 347/2026, 220/2026) và báo, nghị quyết ghi ở `nguon`.
// Không có ảnh thật của Cần Thơ: ảnh tạm là ảnh minh họa sản phẩm, câu lệnh tạo ảnh ở `prompts`.

export const tinh = {
  slug: 'cantho',
  ten: 'Cần Thơ',
  tenDayDu: 'TP Cần Thơ cũ',
  ngay: '2026-11-20',
  ngayText: '20/11/2026',
  // Đơn vị PVI phụ trách địa bàn, chép nguyên từ danh bạ PVI.
  office: {
    ten: 'Bảo hiểm PVI Tây Nam',
    loai: 'Công ty thành viên của Tổng công ty Bảo hiểm PVI',
    diaChi: 'Tầng 9, Tòa nhà Xổ số kiến thiết Cần Thơ, Số 29 đường Cách mạng tháng Tám, Phường Ninh Kiều, Thành phố Cần Thơ',
    dienThoai: '0292 376 3067',
    tel: '02923763067',
    mst: '0105402531-022',
  },
  hanhChinh: {
    cu: 'TP Cần Thơ trước ngày 01/7/2025 gồm 5 quận Ninh Kiều, Bình Thủy, Cái Răng, Ô Môn, Thốt Nốt và 4 huyện Phong Điền, Cờ Đỏ, Thới Lai, Vĩnh Thạnh.',
    moi: 'Từ 01/7/2025, theo Nghị quyết 202/2025/QH15, TP Cần Thơ, tỉnh Hậu Giang và tỉnh Sóc Trăng hợp thành TP Cần Thơ mới. Nghị quyết 1668/NQ-UBTVQH15 ngày 16/6/2025 sắp xếp cấp xã, TP Cần Thơ mới có 103 đơn vị gồm 31 phường và 72 xã.',
    viDu: [
      ['Phường Ninh Kiều', 'từ các phường Tân An, Thới Bình, Xuân Khánh'],
      ['Phường Cái Khế', 'từ phường An Hòa, phường Cái Khế và một phần phường Bùi Hữu Nghĩa'],
      ['Phường Ô Môn', 'từ các phường Châu Văn Liêm, Thới Hòa, Thới An và xã Thới Thạnh'],
      ['Phường Tân Lộc', 'giữ nguyên, không sắp xếp'],
    ],
    phuongKhac: ['Bình Thủy', 'Long Tuyền', 'An Bình', 'Thới An Đông', 'Cái Răng', 'Hưng Phú', 'Phước Thới', 'Thới Long', 'Thuận Hưng'],
  },
  kcn: ['Trà Nóc 1', 'Trà Nóc 2', 'Hưng Phú 1', 'Hưng Phú 2', 'Thốt Nốt'],
  ruiRo: [
    'Triều cường sông Hậu: sáng 13/9/2026 triều vượt báo động III, công viên Bến Ninh Kiều và một số tuyến trung tâm bị ngập; cơ quan khí tượng cảnh báo ngập sâu ở Bình Thủy, Cái Khế và ngập cục bộ ở Ninh Kiều, Cái Răng.',
    'Sạt lở bờ sông, kênh rạch: từ đầu năm đến cuối tháng 7/2026, Cần Thơ (mới) ghi nhận 239 điểm sạt lở; thành phố chi khoảng 160 tỷ đồng gia cố khẩn cấp một đoạn bờ sông Hậu.',
    'Hạ tầng đang thi công: dự án chống ngập gần 8.700 tỷ đồng kiểm soát ngập cho khoảng 1.300 ha tại Bình Thủy, Thới An Đông và vùng lân cận.',
  ],
  nguon: [
    'Danh bạ mạng lưới Tổng công ty Bảo hiểm PVI, mục Bảo hiểm PVI Tây Nam (đối chiếu 26/09/2026)',
    'Nghị quyết 202/2025/QH15 về sắp xếp đơn vị hành chính cấp tỉnh; Nghị quyết 1668/NQ-UBTVQH15 ngày 16/6/2025 về sắp xếp đơn vị hành chính cấp xã của TP Cần Thơ',
    'Báo Tiền Phong, "Bến Ninh Kiều ở Cần Thơ lại ngập" (9/2026); VietnamPlus, "Người dân Cần Thơ chật vật khi triều cường vượt báo động III" (9/2026)',
    'Báo Tiền Phong, "Cần Thơ chi 160 tỷ đồng gia cố khẩn cấp sạt lở bờ sông Hậu" (2026); CafeF, "Cần Thơ triển khai dự án gần 8.700 tỷ đồng chống ngập" (10/2026)',
    'Báo Đầu tư và VnEconomy về các khu công nghiệp Trà Nóc 1, Trà Nóc 2, Hưng Phú 1, Hưng Phú 2, Thốt Nốt; Báo Đầu tư, Tiền Phong về cảng Cái Cui',
  ],
  hero: {
    tieuDe: 'Mua bảo hiểm tại Cần Thơ',
    title: 'Mua bảo hiểm tại Cần Thơ | Báo phí nhanh, PVI Tây Nam',
    description: 'Mua bảo hiểm PVI tại Cần Thơ: ô tô, cháy nổ nhà xưởng KCN Trà Nóc, Hưng Phú, tai nạn công nhân, sức khỏe. Biểu phí 2026, hồ sơ, địa chỉ PVI Tây Nam.',
    promise: 'Báo phí nhanh · Hồ sơ rõ ràng · Hỗ trợ bồi thường',
    lead: 'Cá nhân và doanh nghiệp ở Ninh Kiều, Bình Thủy, Cái Răng, Ô Môn, Thốt Nốt và các xã ven đô có thể mua bảo hiểm PVI qua PVI Tây Nam tại phường Ninh Kiều, hoặc làm từ xa với PVI Thành Đô qua Zalo 0938 072 236.',
    anh: 'cantho-ben-ninh-kieu',
    anhTam: 'mang-luoi-pvi',
    alt: 'Hình ảnh mô phỏng Bến Ninh Kiều và cầu đi bộ bên sông Hậu, Cần Thơ, lúc chiều tối',
    caption: 'Hình ảnh mô phỏng Bến Ninh Kiều và cầu đi bộ bên sông Hậu.',
  },
  faqs: [
    { question: 'PVI ở Cần Thơ nằm ở đâu?', answer: 'Đơn vị của Bảo hiểm PVI tại Cần Thơ là Bảo hiểm PVI Tây Nam, công ty thành viên của Tổng công ty Bảo hiểm PVI. Văn phòng ở tầng 9, Tòa nhà Xổ số kiến thiết Cần Thơ, số 29 đường Cách mạng tháng Tám, phường Ninh Kiều. Điện thoại 0292 376 3067.' },
    { question: 'Ở Cần Thơ có mua bảo hiểm PVI qua PVI Thành Đô được không?', answer: 'Được. Hợp đồng bảo hiểm PVI có hiệu lực trên toàn quốc, không phụ thuộc nơi mua. Bạn nhắn Zalo 0938 072 236, gửi giấy tờ qua Zalo, nhận báo phí và giấy chứng nhận bản điện tử hoặc bản giấy gửi qua bưu điện. Khi có tổn thất ở Cần Thơ, PVI cử giám định tại chỗ.' },
    { question: 'Giấy tờ còn ghi quận Ninh Kiều, huyện Phong Điền có phải đổi trước khi mua không?', answer: 'Không cần đổi trước. Giấy đăng ký xe, sổ đỏ hay giấy phép kinh doanh ghi địa chỉ cũ vẫn dùng được. Khi khai, ghi địa chỉ đúng như giấy tờ và thêm tên phường, xã mới nếu biết, để hợp đồng khớp với hồ sơ khi bồi thường.' },
    { question: 'Nhà xưởng ở KCN Trà Nóc hay Hưng Phú phải mua bảo hiểm gì?', answer: 'Nếu cơ sở thuộc danh mục phải mua theo Nghị định 105/2025/NĐ-CP (sửa bởi Nghị định 347/2026/NĐ-CP), bắt buộc mua bảo hiểm cháy nổ. Ngoài ra nên xem bảo hiểm tài sản cho rủi ro ngoài cháy như ngập, triều cường, và bảo hiểm tai nạn cho công nhân.' },
  ],
  products: [
    {
      id: 'tndsoto', nhom: 'xe', ten: 'Bảo hiểm TNDS ô tô bắt buộc', link: '/san-pham/bao-hiem-bat-buoc/',
      anh: 'cantho-tnds', anhTam: 'tu-van-xe-o-to', anhAlt: 'Hình ảnh mô phỏng ô tô lưu thông trên cầu Cần Thơ qua sông Hậu',
      title: 'Bảo hiểm TNDS ô tô bắt buộc tại Cần Thơ: phí 2026, hồ sơ, nơi mua',
      h1: 'Bảo hiểm TNDS ô tô bắt buộc tại Cần Thơ',
      description: 'Mua bảo hiểm TNDS ô tô PVI tại Cần Thơ: phí 2026 từ 437.000 đ/năm cho xe dưới 6 chỗ, mức trách nhiệm 150 triệu/người, hồ sơ cần gửi, mua online hoặc tại PVI Tây Nam.',
      the: 'Cho xe gia đình và xe kinh doanh vận tải. Phí theo Nghị định 67/2023/NĐ-CP, từ 437.000 đ/năm chưa VAT.',
      lead: 'Chủ ô tô ở Cần Thơ bắt buộc phải có bảo hiểm trách nhiệm dân sự (TNDS) còn hiệu lực khi lưu thông. Xe con không kinh doanh dưới 6 chỗ đóng 437.000 đồng một năm chưa VAT, tức 480.700 đồng đã gồm VAT; xe kinh doanh vận tải đóng theo số chỗ, cao hơn.',
      sections: [
        ['TNDS ô tô bảo vệ ai và bảo vệ đến đâu?', [
          'Bảo hiểm TNDS chủ xe trả thay chủ xe phần trách nhiệm bồi thường cho người thứ ba khi xe gây tai nạn: người bị thương, người tử vong và tài sản bị hư hỏng. Mức trách nhiệm theo quy định là 150 triệu đồng cho mỗi người trong một vụ và 100 triệu đồng cho tài sản trong một vụ.',
          'TNDS không trả cho thiệt hại của chính chiếc xe bạn. Xe bị trầy, móp hay ngập nước muốn được bồi thường thì cần thêm bảo hiểm vật chất xe. Hai loại này mua chung một lần được, nhưng là hai phạm vi tách biệt trên giấy chứng nhận.',
        ]],
        ['Biểu phí TNDS ô tô 2026 áp dụng tại Cần Thơ', [
          'Phí TNDS là phí do Nhà nước quy định tại Phụ lục I Nghị định 67/2023/NĐ-CP, giống nhau ở mọi tỉnh và mọi công ty bảo hiểm. Vì vậy khác biệt khi mua ở Cần Thơ nằm ở tốc độ cấp đơn, cách hỗ trợ khi có va chạm và ưu đãi kèm theo, không nằm ở mức phí gốc.',
          'Bảng dưới là phí gốc một năm chưa gồm VAT 10%. Xe tải, xe chuyên dùng và đầu kéo có biểu riêng, tra ở trang biểu phí TNDS đầy đủ.',
        ]],
        ['Xe gia đình hay xe kinh doanh: khai sai mục đích là rủi ro lớn nhất', [
          'Cần Thơ là đầu mối vận tải của miền Tây, nhiều xe 7 chỗ, xe 16 chỗ vừa chở gia đình vừa chạy dịch vụ đưa đón đi các tỉnh. Nếu xe có chạy kinh doanh mà mua theo phí xe gia đình, khi xảy ra tai nạn lúc đang chở khách, hồ sơ bồi thường dễ bị đối chiếu lại mục đích sử dụng.',
          'Cách an toàn là khai đúng như trên giấy đăng ký và phù hiệu xe. Xe đang chuyển từ gia đình sang chạy dịch vụ thì báo trước để điều chỉnh giấy chứng nhận cho khớp.',
        ]],
        ['Hồ sơ cần gửi và thời gian nhận giấy chứng nhận', [
          'Chỉ cần ảnh giấy đăng ký xe (hai mặt) hoặc giấy tờ xe mới chưa có biển, số điện thoại và ngày muốn bắt đầu hiệu lực. Xe công ty gửi thêm tên công ty, mã số thuế để xuất hóa đơn.',
          'Với đội xe nhiều biển số, nên lập bảng từng xe kèm ngày hết hạn đơn cũ. Mỗi xe nối tiếp đúng ngày của nó, tránh để một xe hở bảo hiểm vài ngày giữa hai kỳ.',
        ]],
        ['Khi va chạm trên đường ở Cần Thơ cần làm gì?', [
          'Ưu tiên an toàn, gọi cấp cứu nếu có người bị thương và báo cơ quan chức năng khi cần. Chụp ảnh hiện trường, biển số các xe và giấy tờ liên quan trước khi di chuyển xe.',
          'Gọi tổng đài bồi thường PVI 1900 54 54 58 để được hướng dẫn. Không tự cam kết số tiền bồi thường với bên kia khi chưa có hướng dẫn của PVI, vì phần vượt phạm vi có thể không được trả.',
        ]],
      ],
      bangPhi: 'tnds',
      hoSo: ['Ảnh giấy đăng ký xe hai mặt, hoặc giấy tờ xe mới chưa có biển', 'Số chỗ ngồi hoặc tải trọng và mục đích sử dụng (gia đình hay kinh doanh)', 'Ngày cần hiệu lực, hoặc ngày hết hạn của đơn đang có', 'Tên, mã số thuế công ty nếu cần hóa đơn'],
      faqs: [
        ['Mua TNDS ô tô ở Cần Thơ có rẻ hơn ở TP.HCM không?', 'Không. Phí TNDS do Nghị định 67/2023/NĐ-CP quy định, giống nhau trên cả nước. Xe dưới 6 chỗ không kinh doanh đóng 437.000 đồng/năm chưa VAT ở bất kỳ đâu. Khác biệt chỉ ở dịch vụ và ưu đãi kèm theo.'],
        ['Không có bảo hiểm TNDS ô tô thì bị xử lý thế nào?', 'Đây là bảo hiểm bắt buộc, lái xe phải mang theo giấy chứng nhận (bản giấy hoặc bản điện tử) khi lưu thông. Thiếu giấy chứng nhận còn hiệu lực có thể bị xử phạt hành chính, và khi gây tai nạn chủ xe phải tự bồi thường toàn bộ.'],
        ['Giấy chứng nhận điện tử có dùng được khi bị kiểm tra không?', 'Có. Giấy chứng nhận bảo hiểm bắt buộc được cấp dạng điện tử có giá trị như bản giấy. Bạn lưu file trên điện thoại để xuất trình khi cần.'],
        ['Xe biển 65 (Cần Thơ) đi làm ở TP.HCM mua ở đâu cũng được?', 'Được. Hợp đồng TNDS có hiệu lực trên toàn lãnh thổ Việt Nam. Bạn có thể mua qua PVI Tây Nam ở Cần Thơ hoặc qua PVI Thành Đô bằng Zalo 0938 072 236.'],
      ],
      nguon: ['Nghị định 67/2023/NĐ-CP, Phụ lục I; Văn bản hợp nhất 64/2026/VBHN-NĐ-BTC ngày 05/11/2026'],
      prompt: 'Ảnh chụp ngang 3:2, tỷ lệ 1280x853, phong cách ảnh báo chí chân thực: dòng ô tô con và xe khách lưu thông trên cầu dây văng bắc qua sông Hậu rộng, trời chiều nắng vàng, mặt sông có ghe chở hàng. Góc nhìn từ bờ sông chéo lên cầu. Không logo hãng xe, không chữ, không biển số đọc được, không người nhìn vào máy ảnh.',
    },
    {
      id: 'vatchatxeoto', nhom: 'xe', ten: 'Bảo hiểm vật chất xe ô tô', link: '/san-pham/bao-hiem-vat-chat-xe/',
      anh: 'cantho-vat-chat-xe', anhTam: 'cac-loai-bao-hiem-xe-o-to', anhW: 1200, anhH: 630, anhAlt: 'Hình ảnh mô phỏng ô tô đỗ trên đường bị ngập do triều cường ở trung tâm Cần Thơ',
      title: 'Bảo hiểm vật chất xe ô tô tại Cần Thơ: thủy kích, triều cường, phí',
      h1: 'Bảo hiểm vật chất xe ô tô tại Cần Thơ',
      description: 'Bảo hiểm vật chất xe ô tô PVI tại Cần Thơ: vì sao nên có ĐKBS 008 thủy kích khi triều cường, ví dụ xe 915 triệu đóng 9,15 triệu/năm, hồ sơ báo phí.',
      the: 'Trả chi phí sửa xe của bạn khi va chạm, cháy nổ, thiên tai, mất cắp. Chọn thêm thủy kích, sửa chính hãng.',
      lead: 'Bảo hiểm vật chất xe trả chi phí sửa chữa, thay thế cho chính chiếc xe của bạn khi va chạm, cháy nổ, thiên tai hoặc mất cắp toàn bộ xe. Ở Cần Thơ, nơi triều cường sông Hậu thường gây ngập đường trung tâm, điều khoản thủy kích (ĐKBS 008) là phần nên hỏi đầu tiên.',
      sections: [
        ['Vì sao xe ở Cần Thơ cần để ý điều khoản thủy kích?', [
          'Sáng 13/9/2026 triều cường vượt báo động III, công viên Bến Ninh Kiều và một số tuyến trung tâm bị ngập. Cơ quan khí tượng cảnh báo ngập sâu ở Bình Thủy, Cái Khế và ngập cục bộ ở Ninh Kiều, Cái Răng vào các đợt triều cao trong năm.',
          'Xe đi vào đường ngập rồi chết máy là tình huống thủy kích. Hư hỏng động cơ do nước thuộc điều khoản bổ sung ĐKBS 008/XCG-PVI; hợp đồng không có điều khoản này thì không mặc định được trả phần động cơ. Khi mua, hỏi rõ xe đã có ĐKBS 008 chưa.',
        ]],
        ['Phạm vi cơ bản và 4 điều khoản bổ sung hay chọn', [
          'Phạm vi cơ bản gồm va chạm, cháy nổ, thiên tai và trộm cướp toàn bộ xe. Bốn điều khoản bổ sung thường mua kèm là ĐKBS 003 mất cắp bộ phận, ĐKBS 006 không khấu hao khi thay mới, ĐKBS 007 sửa chữa chính hãng và ĐKBS 008 động cơ do ảnh hưởng của nước.',
          'Xe mới hoặc xe giá trị cao ở Cần Thơ thường chọn đủ 006, 007, 008. Xe đã nhiều năm có thể cân nhắc 008 trước tiên vì rủi ro ngập là rủi ro địa phương rõ nhất.',
        ]],
        ['Ví dụ phí thật: xe 915 triệu đóng bao nhiêu?', [
          'Theo một giấy chứng nhận PVI cấp tháng 10/2026: xe 7 chỗ không kinh doanh, số tiền bảo hiểm 915.000.000 đồng, có ĐKBS 006, 007, 008, mức khấu trừ 500.000 đồng/vụ, tổng phí 12 tháng 9.150.000 đồng đã gồm VAT.',
          'Phí xe khác phụ thuộc loại xe, tuổi xe, mục đích sử dụng và điều khoản chọn. Muốn so hai báo giá, phải so cùng giá trị xe, cùng điều khoản và cùng mức khấu trừ.',
        ]],
        ['Ảnh xe và hồ sơ gửi để nhận báo phí', [
          'Gửi giấy đăng ký xe, đời xe, mục đích sử dụng, giá trị muốn bảo hiểm và ngày cần hiệu lực. Xe đang có bảo hiểm ở nơi khác gửi kèm giấy chứng nhận cũ để giữ nguyên điều khoản khi chuyển.',
          'PVI sẽ hướng dẫn chụp ảnh xe các góc để xác nhận tình trạng trước khi cấp đơn. Vết trầy có sẵn nên chụp rõ, tránh tranh cãi khi bồi thường sau này.',
        ]],
        ['Xe bị ngập hoặc va chạm ở Cần Thơ: làm gì trước?', [
          'Xe chết máy trong vùng ngập thì không cố khởi động lại, vì nổ máy khi nước đã vào buồng đốt làm hư hỏng nặng hơn và có thể ảnh hưởng quyền lợi. Gọi cứu hộ kéo xe ra chỗ khô.',
          'Báo tổng đài bồi thường PVI 1900 54 54 58, chụp ảnh vị trí và mực nước. Đưa xe đến gara liên kết của PVI để giám định viên và gara thống nhất phương án trước khi tháo sửa.',
        ]],
      ],
      bangPhi: 'vcx',
      hoSo: ['Giấy đăng ký xe, đời xe và mục đích sử dụng', 'Giá trị xe muốn bảo hiểm', 'Điều khoản bổ sung muốn chọn (003, 006, 007, 008)', 'Ảnh xe các góc theo hướng dẫn, ảnh vết trầy có sẵn'],
      faqs: [
        ['Xe đỗ trong nhà bị nước triều dâng vào có được trả không?', 'Thiệt hại do thiên tai, ngập nước thuộc phạm vi xem xét theo quy tắc và điều khoản. Riêng hư hỏng động cơ do nước cần có ĐKBS 008. Kết quả cụ thể phụ thuộc nguyên nhân và giám định, nên hỏi rõ trường hợp xe đang đỗ khi mua.'],
        ['Mức khấu trừ 500.000 đồng/vụ là gì?', 'Là phần chủ xe tự chịu trong mỗi vụ tổn thất, bảo hiểm trả phần còn lại. Một số điều khoản bổ sung có mức khấu trừ riêng ghi trên hợp đồng.'],
        ['Có sửa xe tại gara chính hãng ở Cần Thơ được không?', 'Được nếu hợp đồng có ĐKBS 007 sửa chữa chính hãng. Nên báo tên gara muốn sửa khi nhận báo phí để kiểm tra gara có liên kết với PVI.'],
        ['Xe điện có cần khai riêng giá trị pin không?', 'Có. Giấy chứng nhận PVI có dòng riêng cho giá trị bộ pin điện động cơ. Pin không mặc định được bảo hiểm nếu không khai đầy đủ giá trị và quyền sở hữu.'],
      ],
      nguon: ['Quy tắc bảo hiểm tự nguyện xe ô tô và các ĐKBS của Bảo hiểm PVI, hiệu lực 01/07/2025', 'Giấy chứng nhận bảo hiểm xe ô tô PVI cấp tháng 10/2026 (số liệu phí)', 'Báo Tiền Phong, VietnamPlus về triều cường Cần Thơ tháng 9/2026'],
      prompt: 'Ảnh chụp ngang 1200x630, phong cách ảnh báo chí chân thực: một chiếc ô tô SUV màu trắng đỗ ven đường đô thị ven sông Hậu khi nước triều dâng ngập ngang bánh xe, phía xa là hàng cây và nhà phố miền Tây, trời âm u. Không logo hãng xe, không biển số đọc được, không chữ.',
    },
    {
      id: 'chaynobatbuoc', nhom: 'tai-san', ten: 'Bảo hiểm cháy nổ bắt buộc', link: '/san-pham/chay-no-bat-buoc/',
      anh: 'cantho-chay-no', anhTam: 'chay-no', anhAlt: 'Hình ảnh mô phỏng kho hàng nông sản trong khu công nghiệp ở Cần Thơ có hệ thống chữa cháy',
      title: 'Bảo hiểm cháy nổ bắt buộc tại Cần Thơ: ai phải mua, phí, hồ sơ 2026',
      h1: 'Mua bảo hiểm cháy nổ bắt buộc tại Cần Thơ',
      description: 'Bảo hiểm cháy nổ bắt buộc tại Cần Thơ cho nhà xưởng, kho KCN Trà Nóc, Hưng Phú: cơ sở nào phải mua, thay đổi từ 15/9/2026, hồ sơ báo phí.',
      the: 'Cho nhà xưởng, kho, chợ, khách sạn thuộc diện phải mua. Tính phí theo Phụ lục VI Nghị định 105/2025.',
      lead: 'Cơ sở có nguy hiểm về cháy, nổ ở Cần Thơ, như nhà xưởng, kho hàng trong KCN Trà Nóc, Hưng Phú, Thốt Nốt, chợ, khách sạn, phải mua bảo hiểm cháy nổ bắt buộc theo Nghị định 105/2025/NĐ-CP. Từ 15/9/2026, Nghị định 347/2026/NĐ-CP thay đổi cách chứng minh hồ sơ phòng cháy và cho tính phí riêng từng hạng mục.',
      sections: [
        ['Cơ sở nào ở Cần Thơ phải mua bảo hiểm cháy nổ bắt buộc?', [
          'Danh mục cơ sở phải mua nằm trong Nghị định 105/2025/NĐ-CP. Nhóm hay gặp ở Cần Thơ gồm nhà xưởng sản xuất, kho hàng, chợ, trung tâm thương mại, khách sạn, nhà cao tầng và cơ sở kinh doanh xăng dầu.',
          'Từ 15/9/2026, Nghị định 347/2026/NĐ-CP bổ sung trường hợp không phải mua: nhà, công trình độc lập đáp ứng tiêu chuẩn phòng cháy và có mức độ nguy hiểm cháy thấp. Nếu chưa chắc cơ sở mình thuộc diện nào, gửi công năng và quy mô để được kiểm tra.',
        ]],
        ['Nhà xưởng trong KCN Trà Nóc, Hưng Phú, Thốt Nốt cần lưu ý gì?', [
          'Các khu công nghiệp đang hoạt động ở Cần Thơ cũ gồm Trà Nóc 1, Trà Nóc 2, Hưng Phú 1, Hưng Phú 2 và Thốt Nốt. Nhiều cơ sở ở đây vừa có xưởng sản xuất, vừa có kho, văn phòng trên cùng khu đất.',
          'Theo Nghị định 347/2026, cơ sở có nhiều hạng mục độc lập, công năng khác nhau được tính phí riêng theo từng hạng mục nếu từng hạng mục đáp ứng yêu cầu an toàn. Lập danh mục tách xưởng, kho, văn phòng giúp phí phản ánh đúng rủi ro thay vì tính chung theo hạng mục nguy hiểm nhất.',
        ]],
        ['Hồ sơ phòng cháy thay đổi thế nào từ 15/9/2026?', [
          'Trước đây hồ sơ thường kèm văn bản chấp thuận nghiệm thu phòng cháy của cơ quan Công an. Từ 15/9/2026, thủ tục này bỏ; chủ đầu tư tự tổ chức nghiệm thu, tự chịu trách nhiệm và khai báo trên cơ sở dữ liệu về phòng cháy chữa cháy.',
          'Doanh nghiệp bảo hiểm không được từ chối bán vì cơ sở thiếu văn bản thẩm duyệt thiết kế phòng cháy. Dù vậy, nên chuẩn bị biên bản nghiệm thu tự tổ chức và thông tin hệ thống chữa cháy để báo phí sát rủi ro.',
        ]],
        ['Phí tính thế nào và tra ở đâu?', [
          'Phí bằng số tiền bảo hiểm nhân tỷ lệ phí theo loại cơ sở tại Phụ lục VI Nghị định 105/2025/NĐ-CP. Số tiền bảo hiểm tối thiểu là giá trị tài sản tính được thành tiền của nhà, công trình, máy móc và hàng hóa.',
          'Trang cháy nổ bắt buộc của PVI Thành Đô có bộ tra 59 loại cơ sở theo Phụ lục VI và tính phí ước tính. Báo phí chính thức do PVI phát hành sau khi xem danh mục tài sản.',
        ]],
        ['Ngoài cháy nổ, nhà xưởng ven sông ở Cần Thơ nên hỏi thêm gì?', [
          'Bảo hiểm cháy nổ bắt buộc chủ yếu bảo vệ rủi ro cháy, nổ. Nhà xưởng, kho gần sông Hậu, rạch Cái Khế hay khu trũng còn đối mặt triều cường và sạt lở bờ sông: từ đầu năm đến cuối tháng 7/2026, Cần Thơ ghi nhận 239 điểm sạt lở.',
          'Nếu muốn bảo vệ cả ngập lụt, giông bão, hãy hỏi thêm bảo hiểm tài sản với các rủi ro mở rộng, mua chung một hợp đồng với phần cháy nổ bắt buộc.',
        ]],
      ],
      hoSo: ['Địa chỉ, công năng và quy mô từng hạng mục (xưởng, kho, văn phòng)', 'Danh mục và giá trị nhà, máy móc, hàng hóa theo từng hạng mục', 'Thông tin hệ thống chữa cháy, biên bản nghiệm thu tự tổ chức nếu có', 'Giấy chứng nhận cũ và các thay đổi so với kỳ trước khi tái tục'],
      faqs: [
        ['Thuê xưởng ở KCN Trà Nóc thì ai mua bảo hiểm cháy nổ?', 'Ai có quyền lợi với tài sản thì mua cho tài sản đó. Thường chủ đầu tư hạ tầng hoặc chủ nhà xưởng mua cho phần nhà, doanh nghiệp thuê mua cho máy móc, hàng hóa của mình. Ghi rõ trong hợp đồng thuê để tránh trùng hoặc thiếu.'],
        ['Không mua bảo hiểm cháy nổ bắt buộc có bị phạt không?', 'Có. Cơ sở thuộc diện phải mua mà không mua có thể bị xử phạt theo Nghị định 106/2025/NĐ-CP, đã được sửa bởi Nghị định 347/2026/NĐ-CP.'],
        ['Kho nông sản nhỏ ở Phong Điền có phải mua không?', 'Phụ thuộc kho có thuộc danh mục cơ sở có nguy hiểm về cháy, nổ hay không, dựa trên công năng và quy mô. Gửi diện tích, loại hàng lưu trữ và kết cấu để được kiểm tra trước khi quyết định.'],
        ['Mua cháy nổ bắt buộc ở Cần Thơ có phải đến văn phòng không?', 'Không bắt buộc. Bạn gửi danh mục tài sản qua Zalo 0938 072 236 hoặc liên hệ PVI Tây Nam. PVI có thể cử người khảo sát cơ sở khi cần.'],
      ],
      nguon: ['Nghị định 105/2025/NĐ-CP, Phụ lục VI; Nghị định 347/2026/NĐ-CP ngày 08/9/2026, hiệu lực 15/9/2026', 'Báo Tiền Phong về sạt lở bờ sông Hậu, Cần Thơ (2026)'],
      prompt: 'Ảnh chụp ngang 1280x853, chân thực: bên trong kho hàng lớn trong khu công nghiệp miền Tây, bao gạo và thùng hàng xếp trên pallet, hệ thống ống chữa cháy sprinkler màu đỏ trên trần, bình chữa cháy treo tường, ánh sáng tự nhiên từ cửa cuốn. Không logo, không chữ, không người.',
    },
    {
      id: 'taisannhaxuong', nhom: 'tai-san', ten: 'Bảo hiểm tài sản nhà xưởng', link: '/san-pham/chay-no-bat-buoc/',
      anh: 'cantho-tai-san', anhTam: 'hero-tu-van', anhAlt: 'Hình ảnh mô phỏng nhà xưởng ven sông ở Cần Thơ với kè bờ sông',
      title: 'Bảo hiểm tài sản nhà xưởng tại Cần Thơ: ngập, triều cường, sạt lở',
      h1: 'Bảo hiểm tài sản nhà xưởng tại Cần Thơ',
      description: 'Bảo hiểm tài sản nhà xưởng PVI tại Cần Thơ: bảo vệ nhà, máy móc, hàng tồn kho trước cháy, ngập, triều cường. Cách kê khai tài sản theo địa điểm để nhận báo phí đúng.',
      the: 'Cho nhà xưởng, máy móc, hàng tồn kho. Mở rộng rủi ro ngập, giông bão ngoài cháy nổ bắt buộc.',
      lead: 'Bảo hiểm tài sản bảo vệ nhà xưởng, máy móc và hàng tồn kho trước các rủi ro được chọn, rộng hơn phần cháy nổ bắt buộc. Với cơ sở ở Cần Thơ gần sông Hậu hoặc vùng trũng, nên hỏi rõ rủi ro ngập lụt, triều cường khi lập phương án.',
      sections: [
        ['Khác gì bảo hiểm cháy nổ bắt buộc?', [
          'Cháy nổ bắt buộc là mức tối thiểu pháp luật yêu cầu, tập trung vào cháy và nổ. Bảo hiểm tài sản là hợp đồng tự nguyện, có thể mở rộng sang giông bão, lũ lụt, nước tràn, đổ vỡ máy móc tùy phương án.',
          'Doanh nghiệp thuộc diện bắt buộc thường mua chung một hợp đồng: phần cháy nổ bắt buộc theo quy định và phần mở rộng theo nhu cầu. Như vậy chỉ một đầu mối, một kỳ tái tục.',
        ]],
        ['Rủi ro riêng của nhà xưởng ở Cần Thơ', [
          'Cần Thơ nằm ven sông Hậu, nhiều cơ sở chế biến và kho hàng đặt gần bờ sông để tiện vận chuyển đường thủy. Đổi lại là rủi ro triều cường: tháng 9/2026 triều vượt báo động III, cơ quan khí tượng cảnh báo ngập sâu ở Bình Thủy, Cái Khế.',
          'Sạt lở bờ sông, kênh rạch cũng diễn biến phức tạp, với 239 điểm sạt lở ghi nhận đến cuối tháng 7/2026. Khi kê khai, nêu khoảng cách tới bờ sông, cao độ nền và lịch sử ngập của cơ sở để PVI đánh giá đúng.',
        ]],
        ['Kê khai tài sản theo địa điểm và chủ sở hữu', [
          'Chia danh mục thành ba nhóm: nhà và hạ tầng, máy móc thiết bị, hàng tồn kho. Mỗi nhóm ghi địa điểm, chủ sở hữu và cách xác định giá trị (giá trị còn lại hay giá trị thay thế mới).',
          'Doanh nghiệp có xưởng ở KCN Trà Nóc và kho trung chuyển ở Cái Răng nên lập bảng riêng cho từng địa điểm. Hàng nhận giữ hộ cho khách cần ghi riêng vì phạm vi có thể khác hàng của chính doanh nghiệp.',
        ]],
        ['Hàng tồn kho biến động theo mùa vụ', [
          'Cơ sở chế biến nông sản, thủy sản ở miền Tây thường có lượng hàng tồn thay đổi mạnh theo mùa. Khai một con số cố định dễ dẫn tới bảo hiểm dưới giá trị vào cao điểm.',
          'Hỏi PVI phương án khai báo hàng tồn kho phù hợp với chu kỳ nhập xuất, và lưu sổ sách kho để làm căn cứ khi có tổn thất.',
        ]],
        ['Khi có tổn thất', [
          'Hạn chế thiệt hại lan rộng nếu an toàn, báo PVI ngay và giữ nguyên hiện trạng chờ giám định. Chụp ảnh, quay video khu vực bị ảnh hưởng.',
          'Chuẩn bị sổ sách tài sản, hóa đơn mua máy móc, phiếu nhập xuất kho. Không tự thanh lý hàng hư hỏng trước khi PVI xác nhận.',
        ]],
      ],
      hoSo: ['Địa chỉ, công năng từng xưởng, kho và khoảng cách tới bờ sông', 'Danh mục nhà, máy móc, hàng tồn kho kèm giá trị', 'Thông tin chủ sở hữu, tài sản thuê hoặc nhận giữ hộ', 'Lịch sử ngập, tổn thất các năm trước nếu có'],
      faqs: [
        ['Bảo hiểm tài sản có trả cho ngập do triều cường không?', 'Chỉ khi hợp đồng có rủi ro lũ lụt, nước tràn trong phạm vi. Bảo hiểm cháy nổ bắt buộc không mặc định gồm rủi ro này. Hỏi rõ và kiểm tra điều khoản trên bản chào phí.'],
        ['Máy móc thuê của công ty khác có mua được không?', 'Được nếu doanh nghiệp có trách nhiệm hoặc quyền lợi với tài sản đó theo hợp đồng thuê. Khai rõ chủ sở hữu và căn cứ để ghi đúng người được bảo hiểm.'],
        ['Có cần khảo sát cơ sở trước khi cấp đơn không?', 'Với cơ sở giá trị lớn hoặc rủi ro cao, PVI thường khảo sát trước khi báo phí. Cơ sở nhỏ có thể báo phí dựa trên hồ sơ và ảnh chụp.'],
      ],
      nguon: ['Báo Tiền Phong, VietnamPlus về triều cường và sạt lở ở Cần Thơ (2026)'],
      prompt: 'Ảnh chụp ngang 1280x853, chân thực, chụp từ flycam: dãy nhà xưởng mái tôn ven một con sông lớn miền Tây, có bờ kè bê tông, sà lan chở hàng neo bến, cây dừa và ruộng xa xa, trời trong. Không logo, không chữ.',
    },
    {
      id: 'congtrinhlapdat', nhom: 'tai-san', ten: 'Bảo hiểm công trình và lắp đặt', link: '/san-pham/bao-hiem-cong-trinh/',
      anh: 'cantho-cong-trinh', anhTam: 'hero-cong-trinh', anhAlt: 'Hình ảnh mô phỏng công trường thi công kè và trạm bơm chống ngập ven sông ở Cần Thơ',
      title: 'Bảo hiểm công trình, lắp đặt tại Cần Thơ: Nghị định 220/2026, hồ sơ',
      h1: 'Bảo hiểm công trình và lắp đặt tại Cần Thơ',
      description: 'Bảo hiểm công trình, lắp đặt PVI tại Cần Thơ theo Nghị định 220/2026: rủi ro nền đất yếu, công trình ven sông, hồ sơ cần gửi.',
      the: 'Cho chủ đầu tư và nhà thầu xây mới, cải tạo, lắp dây chuyền. Căn cứ Nghị định 220/2026/NĐ-CP.',
      lead: 'Từ 01/7/2026, Nghị định 220/2026/NĐ-CP là căn cứ hiện hành cho bảo hiểm bắt buộc trong đầu tư xây dựng. Chủ đầu tư và nhà thầu ở Cần Thơ cần kiểm tra công trình có thuộc diện bắt buộc không và đọc yêu cầu bảo hiểm riêng của gói thầu.',
      sections: [
        ['Công trình nào phải mua bảo hiểm?', [
          'Nghị định 220/2026/NĐ-CP quy định bảo hiểm bắt buộc trong hoạt động đầu tư xây dựng: bảo hiểm công trình trong thời gian xây dựng cho công trình thuộc diện bắt buộc, và bảo hiểm cho người lao động thi công trên công trường.',
          'Báo giá, giấy chứng nhận phát hành sau 01/7/2026 nên ghi căn cứ Nghị định 220/2026. Nếu báo giá còn ghi Thông tư 329/2016/TT-BTC là căn cứ đã hết hiệu lực, cần yêu cầu sửa.',
        ]],
        ['Công trình ven sông ở Cần Thơ có rủi ro gì riêng?', [
          'Nền đất ven sông Hậu và kênh rạch là nền đất yếu, dễ lún, sạt. Gần âu thuyền Cái Khế, quá trình thi công từng làm 135 căn nhà lân cận bị lún nứt theo báo Tuổi Trẻ.',
          'Vì vậy công trình ở Cần Thơ nên xem kỹ phần trách nhiệm đối với bên thứ ba, nhất là thiệt hại cho nhà dân, công trình lân cận do lún, rung khi đóng cọc. Khai rõ công trình lân cận khi yêu cầu báo phí.',
        ]],
        ['Nhiều dự án hạ tầng đang triển khai', [
          'Cần Thơ đang triển khai dự án chống ngập gần 8.700 tỷ đồng, kiểm soát ngập cho khoảng 1.300 ha tại Bình Thủy, Thới An Đông và vùng lân cận, cùng nhiều gói gia cố bờ sông.',
          'Nhà thầu tham gia các gói này thường được yêu cầu bảo hiểm công trình và bảo hiểm người lao động ngay trong hồ sơ dự thầu. Mức yêu cầu của chủ đầu tư có thể cao hơn mức tối thiểu của nghị định.',
        ]],
        ['Bảo hiểm lắp đặt cho dây chuyền, máy móc', [
          'Doanh nghiệp lắp mới dây chuyền trong KCN Trà Nóc, Hưng Phú cần bảo hiểm lắp đặt cho giai đoạn vận chuyển vào công trường, lắp đặt và chạy thử. Giai đoạn chạy thử thường có điều kiện riêng.',
          'Gửi lịch lắp đặt, lịch chạy thử nghiệm và giá trị thiết bị để PVI xác định thời hạn bảo hiểm khớp tiến độ thực tế.',
        ]],
        ['Gia hạn khi chậm tiến độ', [
          'Mùa mưa và triều cường ở Cần Thơ có thể làm chậm tiến độ thi công. Khi dự kiến chậm, báo PVI trước ngày hết hạn để gia hạn, tránh để công trình hở bảo hiểm giữa chừng.',
        ]],
      ],
      hoSo: ['Tên, địa chỉ dự án, hạng mục và dự toán (giá trị hợp đồng xây dựng)', 'Tiến độ thi công, lịch lắp đặt, chạy thử và bàn giao', 'Yêu cầu bảo hiểm trong hồ sơ mời thầu hoặc hợp đồng', 'Công trình lân cận, nhà dân cần xem xét trách nhiệm bên thứ ba'],
      faqs: [
        ['Hợp đồng ký trước 01/7/2026 có phải mua lại theo Nghị định 220 không?', 'Hợp đồng bảo hiểm đã ký vẫn thực hiện theo nội dung đã ký đến hết thời hạn. Khi gia hạn hoặc mua mới sau 01/7/2026, áp dụng căn cứ Nghị định 220/2026.'],
        ['Nhà ở dân dụng nhỏ có phải mua không?', 'Phụ thuộc công trình có thuộc diện bắt buộc theo nghị định hay không. Nhiều chủ nhà vẫn mua tự nguyện để bảo vệ trách nhiệm với nhà lân cận khi xây trên nền đất yếu.'],
        ['Ai mua: chủ đầu tư hay nhà thầu?', 'Thường chủ đầu tư mua bảo hiểm công trình, nhà thầu mua bảo hiểm cho người lao động và thiết bị thi công của mình. Hợp đồng xây dựng có thể phân công khác, nên đọc kỹ điều khoản bảo hiểm.'],
      ],
      nguon: ['Nghị định 220/2026/NĐ-CP, hiệu lực 01/7/2026', 'CafeF về dự án chống ngập gần 8.700 tỷ đồng (10/2026); Tuổi Trẻ về âu thuyền Cái Khế'],
      prompt: 'Ảnh chụp ngang 1280x853, chân thực: công trường thi công kè bờ sông và trạm bơm bê tông ven sông lớn miền Tây, máy đóng cọc, công nhân đội mũ bảo hộ vàng mặc áo phản quang, sà lan chở vật liệu dưới sông. Không logo, không chữ, mặt người không rõ.',
    },
    {
      id: 'hanghoaxuatnhapkhau', nhom: 'tai-san', ten: 'Bảo hiểm hàng hóa xuất nhập khẩu', link: '/san-pham/hang-hoa-xuat-nhap-khau/',
      anh: 'cantho-hang-hoa', anhTam: 'hang-hoa', anhAlt: 'Hình ảnh mô phỏng cảng container Cái Cui bên sông Hậu, Cần Thơ',
      title: 'Bảo hiểm hàng hóa xuất nhập khẩu tại Cần Thơ: cảng Cái Cui, sà lan',
      h1: 'Bảo hiểm hàng hóa xuất nhập khẩu tại Cần Thơ',
      description: 'Bảo hiểm hàng hóa xuất nhập khẩu tại Cần Thơ cho gạo, thủy sản qua cảng Cái Cui hoặc sà lan lên TP.HCM: điều kiện, giá trị, hồ sơ.',
      the: 'Cho lô hàng đi qua cảng Cái Cui hoặc sà lan lên cảng TP.HCM. Báo phí theo giá trị, bao bì, hành trình.',
      lead: 'Bảo hiểm hàng hóa trả cho tổn thất của lô hàng trên đường vận chuyển, theo điều kiện bảo hiểm được chọn. Doanh nghiệp xuất nhập khẩu ở Cần Thơ cần khai đúng hành trình thật: tàu container từ cảng Cái Cui, hay sà lan từ Cần Thơ lên cảng TP.HCM rồi mới xuống tàu quốc tế.',
      sections: [
        ['Hành trình hàng hóa từ Cần Thơ thường đi thế nào?', [
          'Cụm cảng Cái Cui được mô tả là cảng biển lớn nhất Đồng bằng sông Cửu Long, có bến container. Từ tháng 9/2026 có tuyến tàu container trực tiếp Cần Thơ với Nam Ninh, Trung Quốc, chở cả container khô và container lạnh.',
          'Trước đó, nhiều doanh nghiệp miền Tây đưa hàng bằng sà lan lên TP.HCM hoặc Bà Rịa – Vũng Tàu mới xuống tàu quốc tế. Đoạn sà lan đường sông là một chặng của hành trình, phải được tính vào phạm vi bảo hiểm.',
        ]],
        ['Hàng nông sản, thủy sản cần lưu ý điều kiện nào?', [
          'Đồng bằng sông Cửu Long có thế mạnh về lúa gạo, thủy sản, trái cây. Hàng lạnh như thủy sản đông lạnh có rủi ro hỏng do sự cố máy lạnh container, thường cần điều kiện hoặc điều khoản riêng.',
          'Gạo, nông sản đóng bao dễ bị ẩm, nước mưa, nước biển. Khi nhận báo phí, hỏi rõ điều kiện bảo hiểm A, B hay C và các điều khoản bổ sung cho rủi ro ẩm, hấp hơi.',
        ]],
        ['Giá trị bảo hiểm và điều kiện giao hàng', [
          'Giá trị bảo hiểm thường tính theo giá CIF cộng thêm một tỷ lệ lãi dự tính. Ai mua bảo hiểm phụ thuộc điều kiện giao hàng: bán CIF thì người bán mua, bán FOB thì người mua tự lo.',
          'Đối chiếu điều kiện Incoterms trên hợp đồng mua bán trước khi mua, tránh cả hai bên cùng mua hoặc không bên nào mua.',
        ]],
        ['Hồ sơ cần chuẩn bị', [
          'Gửi hóa đơn thương mại, danh sách đóng gói, vận đơn hoặc thông tin tàu, cảng đi, cảng đến, ngày khởi hành. Hàng đi sà lan nội địa trước khi xuống tàu thì ghi rõ chặng sà lan.',
          'Doanh nghiệp xuất hàng đều đặn nên hỏi hợp đồng bao (open cover) để không phải mua lẻ từng lô.',
        ]],
        ['Khi hàng bị tổn thất', [
          'Kiểm tra hàng ngay khi nhận, ghi chú tình trạng trên phiếu giao nhận nếu thấy bao bì rách, ướt, container hư. Báo PVI và giữ nguyên hàng chờ giám định.',
          'Gửi thư khiếu nại cho người vận chuyển trong thời hạn quy định để giữ quyền đòi bồi hoàn, PVI sẽ hướng dẫn mẫu thư.',
        ]],
      ],
      hoSo: ['Loại hàng, hóa đơn thương mại, giá trị lô hàng', 'Quy cách đóng gói, container khô hay lạnh', 'Hành trình: sà lan, cảng Cái Cui hoặc cảng TP.HCM, cảng đến, ngày khởi hành', 'Điều kiện giao hàng (Incoterms) trên hợp đồng mua bán'],
      faqs: [
        ['Hàng đi sà lan từ Cần Thơ lên TP.HCM có cần bảo hiểm riêng không?', 'Có thể gộp vào một hợp đồng bảo hiểm cho cả hành trình từ kho Cần Thơ đến cảng đích, miễn là khai rõ chặng sà lan. Không khai thì chặng này có thể không thuộc phạm vi.'],
        ['Thủy sản đông lạnh có mua được không?', 'Được, nhưng rủi ro hỏng do sự cố máy lạnh thường cần điều kiện riêng. Gửi nhiệt độ bảo quản, loại container và thời gian vận chuyển để được báo phí.'],
        ['Có cần mua cho hàng nhập khẩu về Cần Thơ không?', 'Nếu mua theo điều kiện FOB hoặc CFR, người mua ở Cần Thơ chịu rủi ro từ khi hàng lên tàu, nên tự mua bảo hiểm cho chặng biển và chặng nội địa về kho.'],
      ],
      nguon: ['Báo Đầu tư về Tân Cảng Cái Cui; Báo Tiền Phong, VietnamPlus về tuyến container Nam Ninh – Cần Thơ (2026)'],
      prompt: 'Ảnh chụp ngang 1280x853, chân thực: cảng container ven sông Hậu rộng, cẩu bờ đang bốc container lên tàu, xe đầu kéo trên bãi, sà lan chở hàng gần bờ, trời nắng. Không logo hãng tàu, không chữ đọc được.',
    },
    {
      id: 'nguoilaodongthicong', nhom: 'con-nguoi', ten: 'Bảo hiểm người lao động thi công', link: '/san-pham/bao-hiem-tai-nan/',
      anh: 'cantho-cong-nhan-thi-cong', anhTam: 'tn-hinh-cong-truong', anhW: 760, anhH: 950, anhAlt: 'Hình ảnh mô phỏng công nhân thi công bờ kè ở Cần Thơ đội mũ bảo hộ',
      title: 'Bảo hiểm người lao động thi công tại Cần Thơ theo Nghị định 220/2026',
      h1: 'Bảo hiểm người lao động thi công tại Cần Thơ',
      description: 'Bảo hiểm người lao động thi công tại Cần Thơ theo Nghị định 220/2026: nhà thầu nào phải mua, yêu cầu gói thầu, danh sách công nhân.',
      the: 'Cho nhà thầu cần bảo hiểm đội thi công. Căn cứ Nghị định 220/2026/NĐ-CP, khai theo công trình.',
      lead: 'Nhà thầu thi công ở Cần Thơ phải mua bảo hiểm cho người lao động trên công trường thuộc diện bắt buộc, theo Nghị định 220/2026/NĐ-CP từ 01/7/2026. Hai thứ cần kiểm tra là mức trách nhiệm cho mỗi người và căn cứ pháp lý ghi trên báo giá.',
      sections: [
        ['Nhà thầu nào phải mua?', [
          'Nhà thầu thi công xây dựng có người lao động làm việc trên công trường thuộc diện bảo hiểm bắt buộc theo Nghị định 220/2026/NĐ-CP. Phạm vi công trình thuộc diện bắt buộc và mức trách nhiệm tối thiểu được quy định trong nghị định, đối chiếu theo loại công trình.',
          'PVI Thành Đô không in một con số chung cho mọi công trình để tránh áp sai. Gửi loại công trình để được đối chiếu đúng mức.',
        ]],
        ['Đọc yêu cầu riêng của gói thầu', [
          'Hồ sơ mời thầu của chủ đầu tư thường đặt mức yêu cầu cao hơn mức tối thiểu của nghị định. Mua đúng mức tối thiểu vẫn có thể bị loại nếu gói thầu đòi cao hơn.',
          'Các gói thầu hạ tầng ở Cần Thơ, như chống ngập và gia cố bờ sông, thường có yêu cầu bảo hiểm cụ thể. Gửi trích đoạn yêu cầu bảo hiểm của gói thầu để báo giá khớp ngay từ đầu.',
        ]],
        ['Công việc ven sông, dưới nước cần khai rõ', [
          'Thi công kè, trạm bơm, cầu cống ở Cần Thơ có nhiều hạng mục làm việc trên sà lan, gần nước, trên cao. Khai đúng nhóm công việc giúp phạm vi bảo hiểm phản ánh rủi ro thật.',
          'Nếu nhân sự thay đổi trong thời gian thi công, hỏi cách bổ sung, giảm người trong danh sách để luôn khớp với thực tế công trường.',
        ]],
        ['Khi có tai nạn trên công trường', [
          'Sơ cứu, đưa người lao động đi cấp cứu và báo cơ quan chức năng khi cần. Lập biên bản tai nạn lao động theo quy định, chụp ảnh hiện trường.',
          'Báo PVI sớm, chuẩn bị giấy tờ y tế, hóa đơn và danh sách người lao động có tên người bị nạn. Hồ sơ đầy đủ ngay từ đầu giúp rút ngắn thời gian giải quyết.',
        ]],
        ['Bảo hiểm tai nạn 24/24 có thay thế được không?', [
          'Không nên dùng thay. Bảo hiểm tai nạn 24/24 là sản phẩm tự nguyện, mục đích khác; hồ sơ thầu cần đúng sản phẩm theo căn cứ Nghị định 220/2026. Nhà thầu có thể mua thêm 24/24 để bảo vệ công nhân ngoài giờ làm.',
        ]],
      ],
      hoSo: ['Tên nhà thầu, tên và địa chỉ công trình', 'Loại công trình, hạng mục, thời gian thi công', 'Nhóm công việc và số người, danh sách theo mẫu khi được hướng dẫn', 'Trích yêu cầu bảo hiểm trong hồ sơ mời thầu'],
      faqs: [
        ['Báo giá còn ghi Thông tư 329/2016 có dùng được không?', 'Không nên. Thông tư 329/2016/TT-BTC đã hết hiệu lực. Báo giá phát hành sau 01/7/2026 nên ghi căn cứ Nghị định 220/2026/NĐ-CP.'],
        ['Công nhân thời vụ có mua được không?', 'Được. Khai danh sách và thời gian làm việc theo hướng dẫn; khi thay người thì báo bổ sung.'],
        ['Mua theo công trình hay theo năm?', 'Bảo hiểm người lao động thi công thường mua theo thời gian thi công của công trình. Nhà thầu nhiều công trình nên hỏi phương án theo từng công trình.'],
      ],
      nguon: ['Nghị định 220/2026/NĐ-CP, hiệu lực 01/7/2026', 'CafeF về dự án chống ngập gần 8.700 tỷ đồng ở Cần Thơ (10/2026)'],
      prompt: 'Ảnh chụp dọc 760x950, chân thực: hai công nhân đội mũ bảo hộ vàng, mặc áo phản quang, đang buộc thép trên công trình kè bờ sông miền Tây, phía sau là sông rộng và sà lan. Chụp từ phía sau hoặc nghiêng, mặt người không rõ. Không logo, không chữ.',
    },
    {
      id: 'tainan2424', nhom: 'con-nguoi', ten: 'Bảo hiểm tai nạn 24/24 cho công nhân', link: '/san-pham/bao-hiem-tai-nan/',
      anh: 'cantho-tai-nan', anhTam: 'tu-van-doanh-nghiep', anhAlt: 'Hình ảnh mô phỏng công nhân ca sáng vào nhà máy trong khu công nghiệp Trà Nóc, Cần Thơ',
      title: 'Bảo hiểm tai nạn 24/24 cho công nhân tại Cần Thơ: phí từ 50.000 đ',
      h1: 'Bảo hiểm tai nạn 24/24 cho công nhân tại Cần Thơ',
      description: 'Bảo hiểm tai nạn 24/24 PVI cho công nhân KCN Trà Nóc, Hưng Phú, Thốt Nốt: phí 0,25%/năm, gói 100 triệu 250.000 đ/người, giảm 20–55% theo số người, hồ sơ danh sách.',
      the: 'Cho doanh nghiệp mua theo danh sách nhân viên. Phí 0,25%/năm, giảm theo quy mô nhóm.',
      lead: 'Bảo hiểm tai nạn 24/24 trả tiền khi người được bảo hiểm bị tai nạn, cả trong và ngoài giờ làm. Phí tham khảo của PVI là 0,25% số tiền bảo hiểm mỗi năm: gói 100 triệu đồng là 250.000 đồng một người, nhóm từ 20 người được giảm phí.',
      sections: [
        ['Vì sao doanh nghiệp ở KCN Cần Thơ hay mua?', [
          'Công nhân KCN Trà Nóc, Hưng Phú, Thốt Nốt phần lớn đi làm bằng xe máy, có ca sáng sớm và ca tối. Bảo hiểm tai nạn 24/24 bảo vệ cả quãng đường đi làm và thời gian ngoài giờ, không chỉ trong xưởng.',
          'Đây là sản phẩm tự nguyện, thường được dùng như một phúc lợi giữ chân người lao động, bổ sung cho bảo hiểm xã hội và bảo hiểm y tế.',
        ]],
        ['Bảng phí tham khảo theo số tiền bảo hiểm', [
          'Phí tính theo tỷ lệ 0,25% số tiền bảo hiểm cho một người một năm. Gói 20 triệu đồng là 50.000 đồng, 50 triệu là 125.000 đồng, 100 triệu là 250.000 đồng, 200 triệu là 500.000 đồng.',
          'Đây là phí tham khảo cho thời hạn 1 năm, chưa gồm thẩm định nhóm nghề. Báo phí chính thức do PVI phát hành sau khi kiểm tra danh sách.',
        ]],
        ['Giảm phí theo quy mô nhóm', [
          'Từ 01/01/2026, danh sách 20–100 người giảm 20%, 101–300 người giảm 35%, 301–500 người giảm 50%, từ 501 người giảm 55%. Với gói 100 triệu, nhóm 20–100 người đóng 200.000 đồng một người một năm.',
          'Ví dụ một xưởng ở KCN Trà Nóc có 50 công nhân mua gói 100 triệu: 50 × 200.000 = 10.000.000 đồng một năm, theo phí tham khảo.',
        ]],
        ['Danh sách và thay đổi nhân sự', [
          'Gửi danh sách gồm họ tên, ngày sinh, số định danh, bộ phận hoặc nhóm nghề. Nhóm công việc nặng, làm trên cao hay vận hành máy cần khai đúng để báo phí khớp.',
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
        ['Tai nạn xe máy trên đường đi làm có được trả không?', 'Tai nạn giao thông thuộc phạm vi xem xét, trừ các trường hợp loại trừ ghi trong quy tắc bảo hiểm, ví dụ người điều khiển xe có nồng độ cồn vượt mức quy định. Đọc mục loại trừ trên giấy chứng nhận.'],
        ['Mua 3 tháng cho công nhân thời vụ được không?', 'Được, áp dụng biểu phí ngắn hạn. Hỏi PVI tỷ lệ phí theo số tháng khi gửi danh sách.'],
      ],
      nguon: ['Biểu phí bảo hiểm tai nạn PVI và mức giảm theo nhóm áp dụng từ 01/01/2026 (bài "Bảo hiểm tai nạn bao nhiêu tiền" trên pvihcm.com)'],
      prompt: 'Ảnh chụp ngang 1280x853, chân thực: dòng công nhân mặc đồng phục xanh đi xe máy vào cổng nhà máy trong khu công nghiệp lúc sáng sớm, trời mờ sương, hàng cây ven đường. Chụp từ xa, mặt người không rõ. Không logo, không chữ đọc được.',
    },
    {
      id: 'suckhoe', nhom: 'con-nguoi', ten: 'Bảo hiểm sức khỏe', link: '/san-pham/bao-hiem-suc-khoe/',
      anh: 'cantho-suc-khoe', anhTam: 'hero-suc-khoe', anhAlt: 'Hình ảnh mô phỏng gia đình ở Cần Thơ được tư vấn bảo hiểm sức khỏe',
      title: 'Bảo hiểm sức khỏe PVI Care tại Cần Thơ: nội trú, ngoại trú, bảo lãnh',
      h1: 'Bảo hiểm sức khỏe tại Cần Thơ',
      description: 'Bảo hiểm sức khỏe PVI Care tại Cần Thơ cho cá nhân, gia đình, nhân viên: so quyền lợi nội trú, ngoại trú, bảo lãnh viện phí, thời gian chờ và hồ sơ cần gửi.',
      the: 'Cho cá nhân, gia đình hoặc nhân viên. So quyền lợi nội trú, ngoại trú và bảo lãnh viện phí.',
      lead: 'Bảo hiểm sức khỏe PVI Care chi trả chi phí điều trị nội trú, và ngoại trú nếu chọn thêm, theo hạn mức của chương trình. Người ở Cần Thơ nên hỏi danh sách bệnh viện bảo lãnh viện phí tại Cần Thơ và TP.HCM trước khi chọn gói.',
      sections: [
        ['Nội trú, ngoại trú: chọn phần nào?', [
          'Quyền lợi nội trú chi trả khi phải nằm viện, phẫu thuật. Ngoại trú chi trả khám bệnh, thuốc không nằm viện, thường là phần chọn thêm và có hạn mức mỗi lần khám.',
          'Gia đình có trẻ nhỏ hay khám ngoại trú thường cần phần ngoại trú. Người trẻ ít bệnh có thể chọn nội trú để giảm phí.',
        ]],
        ['Bảo lãnh viện phí ở Cần Thơ', [
          'Nhiều người ở các tỉnh miền Tây đến Cần Thơ khám chữa bệnh. Bảo lãnh viện phí giúp không phải ứng tiền khi điều trị tại bệnh viện có liên kết.',
          'Danh sách bệnh viện bảo lãnh có thể thay đổi theo thời điểm. Hỏi danh sách hiện hành khi nhận báo phí, nhất là bệnh viện bạn hay khám ở Cần Thơ.',
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
          'Doanh nghiệp ở Cần Thơ mua cho nhân viên theo nhóm có thể được áp điều kiện riêng cho nhóm, khác với mua lẻ. Gửi số người, nhóm tuổi và chương trình mong muốn để nhận báo phí nhóm.',
        ]],
      ],
      hoSo: ['Số người, nhóm tuổi, ngày cần hiệu lực', 'Nhu cầu nội trú, ngoại trú và bệnh viện hay khám', 'Tờ khai sức khỏe theo hướng dẫn', 'Danh sách nhân viên nếu mua theo nhóm'],
      faqs: [
        ['Mua PVI Care ở Cần Thơ khám ở TP.HCM được không?', 'Được. Hợp đồng có hiệu lực toàn quốc. Khám ở bệnh viện có bảo lãnh thì xuất thẻ, ở nơi khác thì giữ hóa đơn để yêu cầu bồi thường.'],
        ['Có bảo hiểm y tế rồi có cần mua thêm không?', 'Bảo hiểm y tế chi trả theo danh mục và mức hưởng của Nhà nước. Bảo hiểm sức khỏe tư nhân bù phần chi phí ngoài, như phòng dịch vụ, thuốc ngoài danh mục, theo hạn mức gói.'],
        ['Người lớn tuổi có mua được không?', 'Mỗi chương trình có giới hạn tuổi tham gia và tái tục riêng. Gửi ngày sinh để kiểm tra chương trình phù hợp.'],
      ],
      nguon: ['Thông tin sản phẩm PVI Care trên pvihcm.com/san-pham/bao-hiem-suc-khoe/'],
      prompt: 'Ảnh chụp ngang 1280x853, chân thực: một gia đình ba thế hệ người miền Tây ngồi trong phòng khách sáng sủa, nhân viên tư vấn mặc sơ mi trắng đang giải thích tài liệu, cửa sổ nhìn ra hàng dừa. Ánh sáng tự nhiên, không logo, không chữ.',
    },
    {
      id: 'dulichquocte', nhom: 'con-nguoi', ten: 'Bảo hiểm du lịch quốc tế', link: '/san-pham/bao-hiem-du-lich/',
      anh: 'cantho-du-lich', anhTam: 'hero-du-lich', anhAlt: 'Hình ảnh mô phỏng hành khách làm thủ tục tại sân bay quốc tế Cần Thơ',
      title: 'Bảo hiểm du lịch quốc tế tại Cần Thơ: visa Schengen, mua online',
      h1: 'Bảo hiểm du lịch quốc tế tại Cần Thơ',
      description: 'Bảo hiểm du lịch quốc tế PVI cho người ở Cần Thơ: chọn chương trình theo điểm đến, visa Schengen, mua và nhận chứng nhận online qua Zalo.',
      the: 'Cho chuyến du lịch, công tác, thăm thân. Tra phí theo điểm đến, số ngày và chương trình.',
      lead: 'Bảo hiểm du lịch quốc tế chi trả chi phí y tế khẩn cấp, hành lý, chậm chuyến bay khi ở nước ngoài, theo chương trình được chọn. Người ở Cần Thơ có thể mua online và nhận giấy chứng nhận điện tử để nộp hồ sơ visa, không cần lên TP.HCM.',
      sections: [
        ['Chọn chương trình theo điểm đến', [
          'Phí và hạn mức phụ thuộc điểm đến (châu Á, châu Âu, toàn cầu), số ngày và chương trình. Đi khu Schengen cần mức chi phí y tế đáp ứng yêu cầu visa, kiểm tra trước khi nộp hồ sơ.',
          'Nhiều gia đình miền Tây có người thân ở Mỹ, Úc, Hàn Quốc; chuyến thăm thân dài ngày nên chọn thời hạn khớp vé khứ hồi.',
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
          'Đọc mục loại trừ: bệnh có sẵn, hoạt động thể thao mạo hiểm, chuyến đi nhằm mục đích chữa bệnh thường không thuộc phạm vi. Nếu chuyến đi có leo núi, lặn biển, hỏi trước khi mua.',
        ]],
        ['Mua từ Cần Thơ, không cần đến văn phòng', [
          'Toàn bộ quy trình có thể làm qua Zalo: gửi ảnh hộ chiếu, ngày đi về, điểm đến, nhận báo phí, thanh toán và nhận giấy chứng nhận điện tử. Phù hợp với khách ở Ninh Kiều, Bình Thủy, Cái Răng hay các xã xa trung tâm.',
        ]],
        ['Khi gặp sự cố ở nước ngoài', [
          'Gọi số hỗ trợ khẩn cấp trên giấy chứng nhận trước khi điều trị nếu có thể. Giữ hóa đơn, giấy tờ y tế, biên bản của hãng bay hoặc công an để yêu cầu bồi thường khi về nước.',
        ]],
      ],
      hoSo: ['Điểm đến, ngày đi, ngày về, mục đích chuyến đi', 'Họ tên, ngày sinh, số hộ chiếu', 'Yêu cầu bảo hiểm của lãnh sự quán hoặc trường học nếu có'],
      faqs: [
        ['Mua bảo hiểm du lịch cho cả nhà được không?', 'Được, có chương trình gia đình. Gửi số người và độ tuổi để được báo phí.'],
        ['Đã ra nước ngoài rồi có mua được không?', 'Thông thường phải mua trước khi khởi hành. Hỏi PVI trước nếu chuyến đi đã bắt đầu.'],
        ['Giấy chứng nhận có dùng nộp hồ sơ visa được không?', 'Được, nếu chương trình đáp ứng yêu cầu của nước cấp visa, ví dụ mức chi phí y tế tối thiểu cho khu Schengen. Báo nước đến khi mua để chọn đúng chương trình.'],
      ],
      nguon: ['Thông tin sản phẩm du lịch quốc tế trên pvihcm.com/san-pham/bao-hiem-du-lich/'],
      prompt: 'Ảnh chụp ngang 1280x853, chân thực: sảnh nhà ga sân bay hiện đại ở miền Tây Việt Nam, hành khách kéo vali đến quầy làm thủ tục, ánh nắng qua vách kính. Chụp từ xa, mặt người không rõ, không logo hãng bay, không chữ đọc được.',
    },
  ],
  prompts: {
    hero: 'Ảnh chụp ngang 1200x960 (tỷ lệ 5:4), phong cách ảnh du lịch chân thực, độ nét cao: Bến Ninh Kiều và cầu đi bộ có đèn bên sông Hậu, Cần Thơ, lúc hoàng hôn, mặt sông phản chiếu ánh đèn, vài chiếc ghe trên sông, bầu trời cam tím. Không chữ, không logo, không người nhìn vào máy ảnh.',
    office: 'Ảnh chụp ngang 1200x800, chân thực: chợ nổi Cái Răng buổi sáng sớm, ghe thuyền chở trái cây treo "cây bẹo", sương mỏng trên sông, nắng sớm. Không chữ, không logo, người ở xa, mặt không rõ.',
  },
};
