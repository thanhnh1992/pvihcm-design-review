// Địa danh dưới đây là tên dùng trước đợt sắp xếp năm 2025.
export const districtGroups = [
  { title: 'Các quận đánh số', areas: [
    ['Quận 1', 'quan-1'], ['Quận 3', 'quan-3'], ['Quận 4', 'quan-4'],
    ['Quận 5', 'quan-5'], ['Quận 6', 'quan-6'], ['Quận 7', 'quan-7'],
    ['Quận 8', 'quan-8'], ['Quận 10', 'quan-10'], ['Quận 11', 'quan-11'],
    ['Quận 12', 'quan-12'],
  ] },
  { title: 'Các quận theo tên', areas: [
    ['Bình Tân', 'binh-tan'], ['Bình Thạnh', 'binh-thanh'], ['Gò Vấp', 'go-vap'],
    ['Phú Nhuận', 'phu-nhuan'], ['Tân Bình', 'tan-binh'], ['Tân Phú', 'tan-phu'],
  ] },
  { title: 'Các huyện', areas: [
    ['Bình Chánh', 'binh-chanh'], ['Cần Giờ', 'can-gio'], ['Củ Chi', 'cu-chi'],
    ['Hóc Môn', 'hoc-mon'], ['Nhà Bè', 'nha-be'],
  ] },
  { title: 'Khu vực Thủ Đức', note: 'Tìm theo tên Quận 2, Quận 9 hoặc quận Thủ Đức trước đây? Xem chung hướng dẫn dành cho khu vực TP Thủ Đức cũ.', areas: [
    ['Thủ Đức (Quận 2, Quận 9 và quận Thủ Đức cũ)', 'thu-duc'],
  ] },
];

export const productGroups = [
  ['xe', 'Bảo hiểm ô tô'],
  ['tai-san', 'Bảo hiểm tài sản, công trình và hàng hóa'],
  ['con-nguoi', 'Bảo hiểm con người và du lịch'],
];

export const products = [
  {
    slug: 'tndsoto', group: 'xe', name: 'Bảo hiểm TNDS ô tô PVI',
    original: '/san-pham/bao-hiem-o-to/', action: ['Tra phí TNDS', '#tnds-tra-cuu'], buy: '/san-pham/bao-hiem-o-to/dat-mua/',
    intro: 'Chủ ô tô tại TP.HCM có thể tra phí TNDS theo loại xe, số chỗ hoặc tải trọng và mục đích sử dụng. Khi tái tục, đối chiếu ngày giờ hết hạn của giấy chứng nhận đang có để chọn thời điểm bắt đầu kỳ mới.',
    details: [
      ['pham-vi', 'TNDS ô tô bảo hiểm phần nào?', 'Bảo hiểm trách nhiệm dân sự bắt buộc áp dụng với trách nhiệm của chủ xe đối với bên thứ ba và hành khách theo quy định. Với nhu cầu bảo hiểm thiệt hại của chính chiếc xe, xem thêm bảo hiểm vật chất xe.'],
      ['tra-phi', 'Tra phí theo nhóm xe nào?', 'Xe gia đình đi làm ở Bình Thạnh và xe chạy dịch vụ chở khách có thể thuộc hai nhóm phí khác nhau dù cùng số chỗ. Xe tải giao hàng trong thành phố cần kiểm tra đúng tải trọng trên giấy tờ xe.'],
      ['kiem-tra', 'Kiểm tra giấy chứng nhận khi mua và tái tục', 'So tên chủ xe, biển số hoặc số khung, nhóm xe và giờ hiệu lực. Nếu xe chưa có biển hoặc đang sang tên, nêu rõ tình trạng trước khi gửi yêu cầu phát hành.'],
    ],
    docs: ['Giấy đăng ký xe hoặc giấy tờ xe mới.', 'Số chỗ hoặc tải trọng và mục đích sử dụng.', 'Ngày cần hiệu lực hoặc ngày hết hạn trên giấy chứng nhận cũ.'],
    faq: ['Có thể đặt mua TNDS ô tô trực tuyến không?', 'Bạn có thể mở trang đặt mua, điền thông tin xe và kiểm tra lại phí, thời hạn trước khi gửi. Nếu xe mới chưa có biển hoặc hồ sơ chưa khớp, gọi tư vấn trước khi đặt.'],
    imageText: ['Tra phí theo đúng nhóm xe', 'Kiểm tra giấy chứng nhận khi tái tục'],
  },
  {
    slug: 'vatchatxeoto', group: 'xe', name: 'Bảo hiểm vật chất xe ô tô PVI',
    original: '/san-pham/bao-hiem-vat-chat-xe/',
    intro: 'Khi mua bảo hiểm vật chất xe tại TP.HCM, hãy so giá trị bảo hiểm, mức khấu trừ và điều kiện chọn gara. Nếu xe thường đỗ ngoài trời hoặc đi qua tuyến hay ngập, hỏi rõ các điều khoản bổ sung trước khi chọn gói.',
    details: [
      ['pham-vi', 'Cần xem quyền lợi nào trước?', 'Xem phạm vi va chạm, điều khoản ngập nước hoặc thủy kích và điều kiện lựa chọn gara. Đọc quyền lợi trên báo phí và giấy chứng nhận để biết nội dung nào đã được chọn.'],
      ['tra-phi', 'So báo phí xe theo cùng điều kiện', 'Đặt hai báo phí cạnh nhau với cùng giá trị xe và mức khấu trừ. Nếu thường mang xe đến gara quen ở Tân Bình hoặc Thủ Đức, kiểm tra trước điều kiện sửa tại gara đó.'],
    ],
    docs: ['Giấy đăng ký, đời xe và mục đích sử dụng.', 'Giá trị xe đề nghị, ảnh hiện trạng nếu được yêu cầu.', 'Nhu cầu về gara, mức khấu trừ và quyền lợi bổ sung.'],
    faq: ['Cùng một loại xe, vì sao báo phí có thể khác nhau?', 'Giá trị xe, phạm vi quyền lợi, tình trạng sử dụng và mức khấu trừ có thể khác. Hãy yêu cầu báo phí ghi rõ các nội dung đó khi so sánh.'],
    imageText: ['So quyền lợi bảo hiểm vật chất xe', 'Đối chiếu gara và mức khấu trừ'],
  },
  {
    slug: 'chaynobatbuoc', group: 'tai-san', name: 'Bảo hiểm cháy nổ bắt buộc PVI',
    original: '/san-pham/chay-no-bat-buoc/', action: ['Tra loại cơ sở và phí', '#tra-cuu'],
    intro: 'Chủ kho, xưởng và cơ sở kinh doanh tại TP.HCM nên xác định cơ sở có thuộc diện phải mua trước khi tra phí. Hồ sơ báo phí cần ghi công năng thực tế, địa chỉ và giá trị tài sản theo từng khu.',
    details: [
      ['pham-vi', 'Cơ sở có thuộc diện phải mua?', 'Tra theo nhóm cơ sở và thông số thực tế. Với một tòa nhà vừa có cửa hàng, kho và khu làm việc, mô tả từng khu để PVI rà đúng thông tin khi nhận hồ sơ.'],
      ['tra-phi', 'Kê tài sản theo hạng mục', 'Khi báo phí cho xưởng ở Bình Tân hoặc kho tại Bình Chánh, hãy tách giá trị nhà, thiết bị và hàng tồn kho theo địa điểm. Nếu thuê mặt bằng, ghi phần do bên thuê cần bảo hiểm.'],
    ],
    docs: ['Địa chỉ và công năng từng khu của cơ sở.', 'Danh mục tài sản và giá trị theo hạng mục.', 'Thông tin PCCC đang có và thay đổi so với kỳ trước.'],
    faq: ['Một doanh nghiệp có nhiều cơ sở thì gửi hồ sơ thế nào?', 'Lập danh sách từng địa chỉ và kê giá trị tài sản riêng cho từng nơi. Ghi rõ điểm nào là nơi sản xuất, nơi kinh doanh hoặc nơi lưu kho.'],
    imageText: ['Tra cơ sở thuộc diện bắt buộc', 'Tách giá trị từng nhóm tài sản'],
  },
  {
    slug: 'taisannhaxuong', group: 'tai-san', name: 'Bảo hiểm tài sản nhà xưởng PVI',
    original: '/san-pham/chay-no-bat-buoc/', originalLabel: 'Xem bảo hiểm cháy nổ bắt buộc cho nhà xưởng',
    intro: 'Doanh nghiệp tại TP.HCM nên lập danh mục nhà xưởng, máy móc và hàng tồn trước khi hỏi bảo hiểm tài sản. Nếu dùng nhà xưởng thuê, đọc hợp đồng thuê để xác định phần tài sản do từng bên chịu trách nhiệm.',
    details: [
      ['pham-vi', 'Xác định tài sản cần đưa vào hợp đồng', 'Tách nhà, máy móc và hàng hóa theo địa điểm. Ghi rõ hàng nhận giữ hộ, thiết bị thuê hoặc tài sản vừa lắp thêm để hỏi cách khai từng nhóm.'],
      ['tra-phi', 'So phạm vi và mức tự chịu giữa các báo phí', 'Với doanh nghiệp có kho ở Tân Phú và xưởng ở Củ Chi, ghi thông tin riêng từng điểm. Khi nhận báo phí, đối chiếu cơ sở định giá, mức khấu trừ và rủi ro muốn bổ sung.'],
    ],
    docs: ['Địa chỉ, công năng và quy mô từng điểm.', 'Danh mục nhà, thiết bị, hàng tồn và giá trị đề nghị.', 'Thông tin tài sản sở hữu, thuê và nhận giữ hộ.'],
    faq: ['Có thể hỏi bảo hiểm hàng nằm trong xưởng thuê không?', 'Có thể gửi đề nghị để xem xét. Ghi rõ chủ sở hữu hàng, nơi lưu kho và phần trách nhiệm theo hợp đồng thuê hoặc lưu kho.'],
    imageText: ['Tách nhà xưởng, máy móc, hàng tồn', 'Khai tài sản theo từng địa điểm'],
  },
  {
    slug: 'congtrinhlapdat', group: 'tai-san', name: 'Bảo hiểm công trình và lắp đặt PVI',
    original: '/san-pham/bao-hiem-cong-trinh/',
    intro: 'Khi cần bảo hiểm xây dựng hoặc lắp đặt tại TP.HCM, gửi dự toán, hạng mục và tiến độ ngay từ đầu. Ghi rõ thời điểm chạy thử, bàn giao và tài sản đang sử dụng tại công trường.',
    details: [
      ['pham-vi', 'Tách hạng mục xây dựng và lắp đặt', 'Một dự án cải tạo tại Quận 3 và một dự án lắp dây chuyền ở Bình Chánh cần mô tả khác nhau. Tách phần xây lắp mới, thiết bị và tài sản hiện hữu cần xem xét.'],
      ['tra-phi', 'Mốc tiến độ nào cần gửi?', 'Gửi ngày khởi công, thời gian lắp đặt và lịch chạy thử nếu có. Nếu bàn giao từng phần, đánh dấu khu vực đưa vào vận hành trước để đối chiếu thời hạn bảo hiểm.'],
    ],
    docs: ['Địa điểm, hạng mục công việc và dự toán.', 'Tiến độ xây lắp, chạy thử, bàn giao.', 'Thông tin công trình hiện hữu và khu vực lân cận.'],
    faq: ['Đổi tiến độ thi công có cần báo PVI không?', 'Hãy báo cho đơn vị cấp ngay khi lịch thay đổi để kiểm tra thời hạn còn lại và điều kiện điều chỉnh theo hợp đồng.'],
    imageText: ['Báo phí theo hạng mục xây lắp', 'Đối chiếu tiến độ và lịch chạy thử'],
  },
  {
    slug: 'hanghoaxuatnhapkhau', group: 'tai-san', name: 'Bảo hiểm hàng hóa xuất nhập khẩu PVI',
    original: '/san-pham/hang-hoa-xuat-nhap-khau/',
    intro: 'Để báo phí lô hàng xuất nhập khẩu qua TP.HCM, chuẩn bị thông tin về loại hàng, giá trị, cách đóng gói và hành trình. Ghi cả chặng nội địa nếu cần bảo hiểm từ kho đến cảng hoặc từ cảng về kho.',
    details: [
      ['pham-vi', 'Xác định đúng hai đầu hành trình', 'Nếu lô xuất qua Cát Lái, ghi rõ kho xuất hàng, cảng đi và nơi giao cuối. Đối chiếu điều kiện giao hàng với đối tác để xác định bên nào thu xếp bảo hiểm.'],
      ['tra-phi', 'Thông tin nào ảnh hưởng đến báo phí?', 'Gửi lịch vận chuyển, phương tiện và quy cách đóng gói. Hàng dễ vỡ, hàng giữ lạnh hoặc lô ghép nên nêu rõ đặc điểm ngay khi gửi đề nghị.'],
    ],
    docs: ['Giá trị hàng và mô tả loại hàng.', 'Cách đóng gói, phương tiện và lịch đi.', 'Điểm nhận, điểm giao và điều kiện giao hàng.'],
    faq: ['Có thể bảo hiểm cả đoạn xe tải nội địa không?', 'Hãy ghi điểm đầu, điểm cuối và các chặng cần bảo hiểm khi hỏi báo phí. Phạm vi áp dụng được xác nhận trên chứng từ phát hành.'],
    imageText: ['Khai đủ hành trình của lô hàng', 'Chuẩn bị giá trị và cách đóng gói'],
  },
  {
    slug: 'nguoilaodongthicong', group: 'con-nguoi', name: 'Bảo hiểm người lao động thi công PVI',
    original: '/san-pham/bao-hiem-bat-buoc/', action: ['Xem mục bảo hiểm công trường', '#cong-truong'],
    intro: 'Nhà thầu có đội thi công tại TP.HCM nên gửi tên công trình, thời hạn thi công và số người theo nhóm việc. Danh sách phải phản ánh đội ngũ thực tế làm việc tại công trường.',
    details: [
      ['pham-vi', 'Khai đúng nhóm việc tại công trình', 'Tách đội làm trên cao, đội lắp máy và nhóm làm việc mặt đất. Nếu nhân sự đổi công trường trong kỳ, ghi rõ từng địa điểm và thời gian dự kiến.'],
      ['tra-phi', 'Chuẩn bị danh sách cho báo phí', 'Khi gửi yêu cầu, nêu số người, ca làm và hạng mục. Hỏi thời hạn gửi danh sách và thủ tục báo người mới trước khi họ bắt đầu công việc.'],
    ],
    docs: ['Tên nhà thầu và địa chỉ công trình.', 'Nhóm việc và thời gian thực hiện.', 'Số người và danh sách theo hướng dẫn của PVI.'],
    faq: ['Thay người giữa kỳ thì làm gì?', 'Liên hệ đơn vị cấp để được hướng dẫn cách cập nhật và xác nhận thời điểm người mới được ghi nhận theo hồ sơ.'],
    imageText: ['Khai nhóm việc tại công trường', 'Cập nhật danh sách khi thay người'],
  },
  {
    slug: 'tainan2424', group: 'con-nguoi', name: 'Bảo hiểm tai nạn 24/24 PVI',
    original: '/san-pham/bao-hiem-tai-nan/', action: ['Tính phí tai nạn 24/24', '#tinh-phi'],
    intro: 'Doanh nghiệp ở TP.HCM có thể tra phí tai nạn 24/24 theo gói, số người và thời hạn. Khi hỏi báo phí chính thức, tách danh sách theo nhóm nghề và công việc thực tế.',
    details: [
      ['pham-vi', 'Chọn quyền lợi theo nhu cầu của nhóm', 'Với công ty có bộ phận kho ở Nhà Bè và văn phòng ở Quận 7, mô tả công việc của từng nhóm. Xem giới hạn quyền lợi, điều kiện và các loại trừ trước khi chốt.'],
      ['tra-phi', 'Cách so hai phương án phí', 'Giữ cùng số người và thời hạn khi so các gói. Nếu có lao động thời vụ, hỏi trước cách báo tăng giảm và thời điểm ghi nhận thay đổi.'],
    ],
    docs: ['Số người và nhóm nghề.', 'Gói quyền lợi và thời hạn mong muốn.', 'Tần suất thay đổi danh sách trong kỳ.'],
    faq: ['Chưa chốt danh sách có thể tra phí trước không?', 'Bạn có thể dùng số người dự kiến để xem mức tham khảo. Báo phí và giấy chứng nhận chính thức theo hồ sơ được chốt.'],
    imageText: ['Tra phí tai nạn theo gói và số người', 'Tách danh sách theo nhóm nghề'],
  },
  {
    slug: 'suckhoe', group: 'con-nguoi', name: 'Bảo hiểm sức khỏe PVI Care',
    original: '/san-pham/bao-hiem-suc-khoe/',
    intro: 'Khi hỏi PVI Care tại TP.HCM, chọn từ nhu cầu nội trú, ngoại trú và cơ sở y tế thường sử dụng. Cho biết số người, nhóm tuổi và thời điểm muốn bắt đầu để nhận phương án phù hợp.',
    details: [
      ['pham-vi', 'So quyền lợi nội trú và ngoại trú', 'Nếu trọng tâm là nằm viện, xem tiền phòng và giới hạn nội trú. Nếu thường khám trong ngày, hỏi quyền lợi ngoại trú, giới hạn theo lần và điều kiện bảo lãnh của gói dự định mua.'],
      ['tra-phi', 'Kiểm tra cơ sở y tế trước khi chốt', 'Gửi tên bệnh viện hoặc phòng khám mà bạn dự định đến. Yêu cầu kiểm tra mạng lưới áp dụng cho chương trình và hình thức khám cụ thể.'],
    ],
    docs: ['Số người, nhóm tuổi và ngày cần hiệu lực.', 'Nhu cầu nội trú, ngoại trú và cơ sở thường khám.', 'Tờ khai theo hướng dẫn của đơn vị tiếp nhận.'],
    faq: ['Bệnh viện gần nhà có được bảo lãnh viện phí không?', 'Danh sách áp dụng theo chương trình và có thể thay đổi. Hãy đưa tên cơ sở và chương trình để PVI đối chiếu trước khi mua.'],
    imageText: ['So quyền lợi nội trú và ngoại trú', 'Kiểm tra nơi bảo lãnh viện phí'],
  },
  {
    slug: 'dulichquocte', group: 'con-nguoi', name: 'Bảo hiểm du lịch quốc tế PVI',
    original: '/san-pham/bao-hiem-du-lich/', action: ['Tính phí theo chuyến đi', '#tinh-phi'],
    intro: 'Khách xuất phát từ TP.HCM có thể tra phí bảo hiểm du lịch quốc tế theo điểm đến, thời gian và chương trình. Nếu cần giấy chứng nhận cho visa, đối chiếu yêu cầu của nơi tiếp nhận trước khi chọn mức quyền lợi.',
    details: [
      ['pham-vi', 'Khai đúng lịch trình và mục đích chuyến đi', 'Ghi ngày đi, ngày về, điểm đến và các điểm quá cảnh có lưu trú. Nêu mục đích đi du lịch, thăm thân hay công tác để kiểm tra điều kiện chương trình.'],
      ['tra-phi', 'Kiểm tra giấy chứng nhận khi nhận', 'Đối chiếu tên theo hộ chiếu, ngày bảo hiểm, vùng áp dụng và mức trách nhiệm. Nếu đổi lịch bay, báo đơn vị cấp để hỏi phương án điều chỉnh.'],
    ],
    docs: ['Điểm đến, ngày đi và ngày về.', 'Số người, độ tuổi và mục đích chuyến đi.', 'Yêu cầu giấy chứng nhận của nơi nhận hồ sơ visa nếu có.'],
    faq: ['Gắn mốc thời gian theo ngày bay hay ngày tại điểm đến?', 'Gửi đầy đủ hành trình và giờ đến dự kiến để được hướng dẫn chọn thời hạn bao phủ phù hợp với hồ sơ chuyến đi.'],
    imageText: ['Tra phí theo điểm đến và thời hạn', 'Kiểm tra giấy chứng nhận cho visa'],
  },
];
