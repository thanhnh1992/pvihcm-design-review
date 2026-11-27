import { localProductArticles } from './local-product-articles.mjs';

const topics = {
  nguoilaodongthicong: {
    titleSuffix: 'Danh sách lao động và hồ sơ công trường',
    lead: 'Nhà thầu cần xác định người lao động làm việc trên công trường, công việc được giao và thời gian làm việc để thu xếp bảo hiểm. Đối chiếu hợp đồng lao động và phạm vi công trường trước khi nộp danh sách.',
    scope: ['Đối tượng bảo hiểm là trách nhiệm dân sự của nhà thầu thi công đối với người lao động trên công trường. Giới hạn trách nhiệm là 100 triệu đồng/người/vụ. Cần rà đúng người, địa điểm và thời gian tham gia, nhất là khi một đội làm ở nhiều dự án.'],
    fee: 'Gửi vị trí công việc, số lao động và thời gian thi công để chuyên viên đối chiếu nhóm nghề và biểu phí. Kiểm tra thuế, thời hạn và cách điều chỉnh danh sách trên phương án báo phí.',
    docs: ['Lập danh sách theo từng công trường và phần việc.', 'Chuẩn bị hợp đồng lao động và thông tin thời gian làm việc thực tế.', 'Khi đổi đội hoặc có người vào công trường giữa kỳ, báo chuyên viên để cập nhật.'],
    claim: ['Ưu tiên cấp cứu và thực hiện quy trình an toàn của công trường. Báo PVI và giữ hồ sơ y tế, biên bản sự cố, giấy tờ về việc phân công và thời gian làm việc.'],
    actions: [['Nhận báo phí', 'tel:0938072236'],['Xem bảo hiểm công trường','/san-pham/bao-hiem-bat-buoc/#cong-truong']],
    questions: [
      ['Có thể dùng một danh sách cho nhiều công trường không?', 'Cần cung cấp địa điểm và thời gian làm việc của từng đội để đối chiếu phạm vi. Yêu cầu báo phí ghi rõ công trường nào được bảo hiểm.'],
      ['Người lao động vào công trường giữa kỳ xử lý thế nào?', 'Báo thay đổi trước khi bố trí công việc và kiểm tra ngày hiệu lực trên xác nhận bổ sung.'],
    ],
    sources: ['Nghị định 67/2023/NĐ-CP, được sửa đổi, bổ sung bởi Nghị định 220/2026/NĐ-CP. Văn bản hợp nhất 64/2026/VBHN-NĐ-BTC.'],
  },
  tainan2424: {
    titleSuffix: 'Chọn quyền lợi cho cá nhân và nhóm',
    lead: 'Chọn bảo hiểm tai nạn 24/24 theo công việc, số tiền bảo hiểm và chương trình. Với doanh nghiệp, nên tách nhóm văn phòng, vận hành thiết bị và giao nhận để báo phí đúng hồ sơ.',
    scope: ['Phạm vi 24/24 và quyền lợi tai nạn áp dụng theo chương trình, giới hạn và điều khoản loại trừ ghi trên hợp đồng. Doanh nghiệp có lao động thi công cần rà riêng nghĩa vụ bảo hiểm bắt buộc tại công trường.'],
    fee: 'Chuẩn bị số người, độ tuổi, công việc, thời hạn và mức bảo hiểm mong muốn. Đối chiếu số tiền bảo hiểm và mức quyền lợi y tế hoặc thương tật trước khi chốt phí.',
    docs: ['Chuẩn bị danh sách người tham gia, vị trí làm việc và ngày cần hiệu lực.', 'Đối chiếu đối tượng, quyền lợi và loại trừ theo chương trình.', 'Với hợp đồng nhóm, xác nhận cách khai tăng giảm trong kỳ.'],
    claim: ['Đi khám hoặc cấp cứu theo tình huống. Giữ hồ sơ điều trị, hóa đơn và thông tin tai nạn, rồi báo PVI để được hướng dẫn chứng từ theo hợp đồng.'],
    actions: [['Nhận báo phí', 'tel:0938072236'],['Xem quyền lợi tai nạn','/san-pham/bao-hiem-tai-nan/#quyen-loi']],
    questions: [
      ['Có thể mua theo nhóm nhân viên không?', 'Có thể gửi số lượng, công việc và thời hạn dự kiến để nhận phương án nhóm theo điều kiện chương trình.'],
      ['Cần phân biệt tai nạn 24/24 và bảo hiểm công trường thế nào?', 'Tai nạn 24/24 áp dụng theo chương trình đã mua. Trách nhiệm tham gia cho lao động thi công được đối chiếu riêng theo quy định về công trường.'],
    ],
    sources: ['PVIHCM, trang Bảo hiểm tai nạn, các mục Quyền lợi và Chứng từ.'],
  },
  suckhoe: {
    titleSuffix: 'Chọn quyền lợi nội trú, ngoại trú',
    lead: 'Khi mua bảo hiểm sức khỏe, hãy đối chiếu quyền lợi nội trú, ngoại trú, hạn mức và cơ sở y tế dự kiến sử dụng. Gói phù hợp phụ thuộc người tham gia và nhu cầu khám chữa bệnh.',
    scope: ['Nội trú, ngoại trú, nha khoa hoặc thai sản được áp dụng theo từng chương trình và điều khoản ghi trên hợp đồng. Xem kỹ thời gian chờ, giới hạn, loại trừ và yêu cầu khai báo sức khỏe trước khi tham gia.'],
    fee: 'Báo phí theo tuổi, số người, chương trình, hạn mức và quyền lợi bổ sung. So sánh tổng phí cùng phần tự trả và phạm vi bảo lãnh, nếu chương trình có.',
    docs: ['Chuẩn bị thông tin người tham gia và ngày bắt đầu mong muốn.', 'Chọn nội trú, ngoại trú và quyền lợi cần thêm trước khi xin tư vấn.', 'Đối chiếu yêu cầu kê khai sức khỏe, thời gian chờ và cơ sở y tế theo chương trình.'],
    claim: ['Trước khi khám theo kế hoạch, kiểm tra điều kiện bảo lãnh đối với cơ sở y tế và chương trình đã mua. Nếu tự thanh toán, giữ hồ sơ khám và chứng từ theo hướng dẫn.'],
    actions: [['Nhận tư vấn sức khỏe','tel:0938072236'],['So sánh chương trình','/san-pham/bao-hiem-suc-khoe/#phuong-an']],
    questions: [
      ['Có bảo lãnh tại mọi bệnh viện không?', 'Kiểm tra danh sách cơ sở theo chương trình, loại điều trị và quy trình áp dụng tại thời điểm sử dụng.'],
      ['Đang có bệnh thì cần khai gì?', 'Khai theo câu hỏi trên hồ sơ tham gia và yêu cầu xác nhận cách áp dụng điều khoản, loại trừ hoặc thời gian chờ.'],
    ],
    sources: ['PVIHCM, trang Bảo hiểm sức khỏe, các mục Phương án và Chứng từ.'],
  },
  dulichquocte: {
    titleSuffix: 'Hồ sơ visa, thời gian và điểm đến',
    lead: 'Chọn bảo hiểm du lịch quốc tế theo quốc gia đến, thời gian, số người và yêu cầu hồ sơ visa. Kiểm tra thời hạn và vùng bảo hiểm trên giấy chứng nhận trước khi khởi hành.',
    scope: ['Chương trình có thể gồm chi phí y tế khẩn cấp, hỗ trợ và quyền lợi liên quan đến chuyến đi theo điều khoản. Đối chiếu tuyến đi, hoạt động dự kiến và loại trừ trước khi mua.'],
    fee: 'Gửi điểm đến, ngày đi về, tuổi, số khách và hạn mức cần có. Kiểm tra lịch nối chuyến và ngày về dự kiến để báo phí phù hợp hành trình.',
    docs: ['Chuẩn bị họ tên theo hộ chiếu và lịch trình.', 'Thông báo yêu cầu của hồ sơ visa và các quốc gia hoặc vùng lãnh thổ trong hành trình.', 'Nếu chuyến đi thay đổi, hỏi chuyên viên về sửa hoặc gia hạn trước khi thay đổi lịch.'],
    claim: ['Liên hệ đầu mối hỗ trợ ghi trên hợp đồng khi xảy ra sự cố ở nước ngoài. Lưu hồ sơ y tế, chứng từ thanh toán, vé và biên bản của đơn vị vận chuyển khi có liên quan.'],
    actions: [['Nhận tư vấn bảo hiểm du lịch','tel:0938072236'],['Xem quyền lợi du lịch','/san-pham/bao-hiem-du-lich/#quyen-loi']],
    questions: [
      ['Mua bảo hiểm có bảo đảm visa được duyệt không?', 'Giấy chứng nhận là một phần hồ sơ khi cơ quan xét duyệt yêu cầu. Việc cấp visa do cơ quan có thẩm quyền quyết định.'],
      ['Nếu lịch đi về thay đổi có dùng giấy chứng nhận cũ được không?', 'Đối chiếu lịch mới với hiệu lực đã ghi. Liên hệ trước ngày khởi hành hoặc trước khi hết hiệu lực để hỏi phương án điều chỉnh.'],
    ],
    sources: ['PVIHCM, trang Bảo hiểm du lịch quốc tế, các mục Quyền lợi và Chứng từ.'],
  },
};

// Situations used to explain declarations, not claims about customer incidents.
const contexts = {
  danang: ['xe cá nhân và xe đưa đón ở Hải Châu','xe sử dụng gần biển hoặc chở khách thường xuyên','khách sạn và khu phụ trợ ở Sơn Trà','kho và máy móc phát sinh thêm trong kỳ ở Liên Chiểu','gói cải tạo nhà hàng hoặc lắp thiết bị','lô hàng qua cảng và giao tiếp bằng đường bộ','đội thi công cải tạo cơ sở lưu trú','nhân viên kho hoặc nhân viên phục vụ theo ca','gia đình và nhóm lao động ở Hải Châu','hành khách khởi hành qua sân bay Đà Nẵng'],
  bencat: ['xe cá nhân hoặc xe giao nhận đi Quốc lộ 13','xe phục vụ xưởng tại Mỹ Phước','kho, xưởng và công trình phụ trợ tại Mỹ Phước','máy móc và tồn kho ở khu công nghiệp','gói lắp dây chuyền và chạy thử','lô hàng từ xưởng Mỹ Phước đến kho tập kết','đội thi công chia theo từng xưởng','nhân viên sản xuất và đội bảo trì theo ca','gia đình và nhóm lao động tại khu Bến Cát','chuyến công tác quốc tế có điểm khởi hành ngoài khu vực Bến Cát'],
  binhphuoc: ['xe gia đình và xe chở hàng quanh Đồng Xoài','xe đi đường dài giữa Đồng Xoài và Chơn Thành','xưởng chế biến và kho nguyên liệu tại Chơn Thành','máy móc và hàng tồn ở một cơ sở chế biến','hạng mục lắp mới thiết bị nhà xưởng','lô nguyên liệu có nhiều chặng giao nhận','nhà thầu chia ca theo địa điểm công trình','nhân viên phân loại hàng và vận hành xưởng','gia đình hoặc nhóm nhân viên ở Đồng Xoài','chuyến công tác đi qua sân bay ngoài khu vực Bình Phước'],
  phuquoc: ['xe cá nhân và xe đưa đón tại Dương Đông','xe thuê tự lái hoặc xe dịch vụ chạy trên đảo','cơ sở lưu trú có khu bếp và kho riêng','thiết bị vận hành và phần tài sản của bên thuê','công trình cải tạo cơ sở lưu trú','hàng đi đường bộ và chuyển tiếp ra đảo','đội thi công theo ca tại điểm lưu trú','nhân viên khách sạn và đội vận hành cơ sở','gia đình hoặc nhân viên làm việc trên đảo','chuyến quốc tế có chặng nối chuyến từ Phú Quốc'],
  tayninh: ['xe đi Hòa Thành và Trảng Bàng','xe dịch vụ chạy các điểm du lịch','mặt bằng dịch vụ tại Hòa Thành','xưởng sản xuất ở Trảng Bàng','gói cải tạo nhà xưởng tại Gò Dầu','hàng từ Trảng Bàng đi cửa khẩu hoặc cảng','đội lắp dựng ở Trảng Bàng','nhóm công nhân tại Gò Dầu','nhân viên doanh nghiệp ở Trảng Bàng','chuyến công tác qua cửa khẩu hoặc sân bay'],
  longan: ['xe gia đình đi Tân An và Bến Lức','xe giao nhận qua Đức Hòa và Bến Lức','kho và xưởng tại Đức Hòa','kho hàng ở Bến Lức có tồn kho thay đổi','gói lắp thiết bị trong nhà máy ở Đức Hòa','lô hàng từ Cần Giuộc đi cảng','nhà thầu mở rộng kho tại Bến Lức','đội vận hành kho tại Đức Hòa','nhân viên ở nhiều điểm làm việc quanh Tân An','lịch bay quốc tế khởi hành từ TP.HCM'],
  dongnai: ['xe vận tải đi giữa Trấn Biên và Long Thành','xe kỹ thuật đi các khu công nghiệp','cơ sở có cả xưởng và kho ở Nhơn Trạch','cụm nhà xưởng và kho tại các địa điểm khác nhau','công trình và lắp máy tại Long Thành','lô hàng đi chặng nội địa rồi chuyển tải','nhà thầu làm việc tại nhiều công trường','nhóm kho vận và sản xuất','doanh nghiệp có nhân sự ở Long Thành và Trấn Biên','đoàn kỹ thuật đi công tác nước ngoài'],
  bienhoa: ['xe cá nhân đi Trấn Biên, Tam Hiệp','ô tô thường gửi tại bãi đô thị hoặc trung tâm thương mại','hộ kinh doanh và cơ sở sản xuất ở Long Bình','xưởng và kho hàng khu vực Amata','cải tạo công trình gần nhà dân ở Tam Hiệp','lô hàng đóng gói tại Long Bình','đội cải tạo nhiều mặt bằng tại Biên Hòa','nhân viên xưởng ở Long Bình và nhóm văn phòng','chủ xe và các gia đình quanh Trấn Biên','gia đình có lịch đi nước ngoài nhiều điểm đến'],
  trangbom: ['xe chở hàng đi Quốc lộ 1','xe đưa đón nhân viên qua Giang Điền','kho, xưởng ở khu vực Bàu Xéo','máy móc và nguyên liệu ở Giang Điền','gói mở rộng kho hoặc xưởng ở Bàu Xéo','hàng đóng container từ kho ở Trảng Bom','đội thi công hạ tầng và lắp máy ở Giang Điền','lao động vận hành và đội giao hàng ở Bàu Xéo','bảo hiểm nhóm cho nhân sự làm việc theo ca','nhân viên đi công tác theo đợt'],
  baria: ['xe gia đình đi Bà Rịa và Long Hương','xe thường đi qua Long Hương, Tam Long','mặt bằng thương mại trong khu vực phường Bà Rịa','kho hoặc xưởng ở Long Hương','cải tạo hoặc xây mới tại Tam Long','lô hàng từ Bà Rịa chuyển đi khu vực cảng','đội xây dựng ở Tam Long','tổ kỹ thuật và giao nhận ở Long Hương','nhu cầu khám cho gia đình tại Bà Rịa','người xuất phát từ Bà Rịa có lịch nối chuyến'],
  thudaumot: ['xe cá nhân và xe dịch vụ trên Quốc lộ 13','xe qua khu thương mại ở Thủ Dầu Một','mặt bằng cho thuê ở khu Phú Lợi cũ','xưởng thuê ở khu vực Phú Tân cũ','cải tạo mặt bằng ở trung tâm hoặc lắp máy tại xưởng','lô hàng từ Phú Tân cũ đi cảng','đội cải tạo cửa hàng ở Chánh Nghĩa và đội lắp máy tại Phú Tân cũ','doanh nghiệp có nhân viên văn phòng tại Chánh Nghĩa và đội vận hành ở khu khác','gia đình hoặc nhóm nhân viên ở khu vực Thủ Dầu Một cũ','khách ở Thủ Dầu Một đi công tác hoặc làm hồ sơ visa'],
  dian: ['xe cá nhân đi qua Đông Hòa và khu giáp Thủ Đức','xe giao nhận thường xuyên ra vào kho khu vực Sóng Thần','kho hàng và xưởng ở Sóng Thần','hàng tồn của đơn vị thuê kho tại Sóng Thần','lắp thiết bị hoặc cải tạo kho đang hoạt động','chặng xe tải từ Sóng Thần tới cảng','lao động thi công trong khu kho vận','nhóm nhân viên vận hành thiết bị và bốc xếp hàng','người lao động hoặc gia đình ở Dĩ An và Đông Hòa','khách ở Dĩ An di chuyển ra sân bay cho chuyến quốc tế'],
  dalat: ['xe gia đình và xe chở khách du lịch','ô tô chạy đường dốc hoặc dùng trong kinh doanh vận tải','khách sạn và nhà hàng khu Xuân Hương – Đà Lạt','tài sản lưu trú và kho vật tư ở các địa điểm khác nhau','cải tạo cơ sở lưu trú có phần đang hoạt động','lô nông sản đi đường bộ trước chặng quốc tế','đội sửa chữa hoặc mở rộng cơ sở lưu trú','nhóm nhân viên phục vụ, bảo trì và giao nhận','gia đình ở Cam Ly – Đà Lạt','hành trình từ Đà Lạt có chặng nội địa trước chuyến quốc tế'],
  baoloc: ['xe gia đình và xe tải nhẹ đi Quốc lộ 20','xe chở hàng giữa Bảo Lộc và kho tập kết','cơ sở chế biến hoặc kho nông sản','dây chuyền chế biến và kho nguyên liệu tại Bảo Lộc','lắp dây chuyền mới trong nhà máy đang sản xuất','hàng trà hoặc nông sản gom tại kho trước khi đi cảng','đội thầu cải tạo xưởng chế biến','nhân viên chế biến, kho và giao hàng','gia đình ở B’Lao hoặc phường 1 Bảo Lộc','khách ở Bảo Lộc đi nước ngoài có lịch nối chuyến'],
  thuanan: ['xe đi Quốc lộ 13 và khu vực VSIP I','ô tô đỗ tại khu thương mại hoặc sử dụng đi làm hằng ngày','cơ sở dịch vụ ở Lái Thiêu và xưởng ở Bình Hòa','doanh nghiệp có kho và xưởng ở khu vực VSIP I','gói cải tạo hoặc lắp máy tại Bình Hòa','hàng gom từ kho Thuận An trước chặng đi cảng','đội thi công cải tạo mặt bằng ở Lái Thiêu hoặc Bình Hòa','nhóm nhân viên kho và văn phòng tại các điểm khác nhau','bảo hiểm nhóm cho người lao động ở Bình Hòa','nhân sự doanh nghiệp đi công tác theo nhóm'],
  nhontrach: ['xe tải ra vào các khu công nghiệp Nhơn Trạch','xe công ty sử dụng cho nhiều nhóm công việc','kho công nghiệp và cơ sở sản xuất ở Nhơn Trạch','xưởng, máy móc và kho ở các địa chỉ khác nhau','lắp máy trong nhà máy ở khu vực Nhơn Trạch','hàng chuyển từ khu vực Phước An qua nhiều điểm giao nhận','đội thi công xây mới hoặc lắp thiết bị','nhân viên logistics, kho vận và vận hành','nhân viên hoặc gia đình ở khu Đại Phước','đội kỹ thuật có lịch công tác quốc tế'],
  longthanh: ['xe vận chuyển vật tư và xe cá nhân qua Long Thành','xe kỹ thuật ra vào công trường','kho hoặc xưởng ở khu Phước Thái','xưởng sản xuất và nơi chứa thiết bị ở Bình An','gói việc xây lắp liên quan đến hạ tầng khu vực sân bay','hàng từ kho Long Thành có nhiều chặng giao nhận','đội thi công thay đổi địa điểm hoặc mốc bàn giao','nhân viên kho, tài xế và đội bảo trì','gia đình ở Long Thành hoặc nhóm nhân viên kho','chuyến đi quốc tế có chặng trung chuyển nội địa'],
};

const IDs = ['tndsoto','vatchatxeoto','chaynobatbuoc','taisannhaxuong','congtrinhlapdat','hanghoaxuatnhapkhau','nguoilaodongthicong','tainan2424','suckhoe','dulichquocte'];
const details = {
  tndsoto: x => 'Với ' + x + ', đối chiếu giấy đăng ký xe, mục đích sử dụng thực tế và số chỗ hoặc tải trọng trước khi chọn dòng phí.',
  vatchatxeoto: x => 'Với ' + x + ', nêu mục đích sử dụng, số năm sử dụng và nơi muốn sửa. Yêu cầu báo phí ghi rõ quyền lợi sửa hãng và khấu trừ nếu có.',
  chaynobatbuoc: x => 'Với ' + x + ', đối chiếu riêng công năng và quy mô từng cơ sở, rồi chuẩn bị hồ sơ phòng cháy và giá trị tài sản theo địa chỉ.',
  taisannhaxuong: x => 'Với ' + x + ', kê riêng tài sản thuê, tài sản sở hữu và lượng tồn kho cao nhất dự kiến. Xác nhận cách khai từng địa chỉ trong báo phí.',
  congtrinhlapdat: x => 'Với ' + x + ', tách giá trị xây dựng và lắp đặt, ghi rõ phần hiện hữu, các mốc chạy thử và thời điểm dự kiến nghiệm thu.',
  hanghoaxuatnhapkhau: x => 'Với ' + x + ', khai đủ điểm nhận, điểm giao, chặng chuyển tiếp, đóng gói và bên thu xếp bảo hiểm trong điều kiện giao hàng.',
  nguoilaodongthicong: x => 'Với ' + x + ', lập danh sách theo công trường, việc được phân công và ngày làm việc dự kiến để kiểm tra phạm vi.',
  tainan2424: x => 'Với ' + x + ', tách nhóm công việc và đối chiếu số người, hạn mức và phạm vi 24/24 trước khi chọn phương án.',
  suckhoe: x => 'Với ' + x + ', ghi nhu cầu nội trú hay ngoại trú, số người và nơi dự kiến khám để đối chiếu quyền lợi và mạng lưới bảo lãnh.',
  dulichquocte: x => 'Với ' + x + ', gửi đủ điểm đến và mốc đi, về. Nếu có nối chuyến, kiểm tra thời hạn và vùng bảo hiểm trên giấy chứng nhận.',
};

const baseScopeCount = { tndsoto: 1, vatchatxeoto: 1, chaynobatbuoc: 1, taisannhaxuong: 1, congtrinhlapdat: 1, hanghoaxuatnhapkhau: 1 };
const neutralLeads = {
  tndsoto: 'Tra phí ô tô theo số chỗ, tải trọng và mục đích sử dụng. Xe dưới 6 chỗ không kinh doanh vận tải có phí 437.000đ/năm trước VAT, 480.700đ/năm gồm VAT 10%.',
  vatchatxeoto: 'Khi xin báo phí vật chất xe, chuẩn bị giá trị xe, năm sản xuất, mục đích sử dụng và quyền lợi bổ sung.',
  chaynobatbuoc: 'Kiểm tra cơ sở thuộc diện mua bảo hiểm cháy nổ bắt buộc theo công năng và quy mô. Sau đó chuẩn bị danh mục giá trị tài sản để tra phí.',
  taisannhaxuong: 'Lập danh mục riêng cho kết cấu nhà xưởng, máy móc và hàng tồn. Với xưởng thuê, xác định tài sản của từng bên trước khi xin báo phí.',
  congtrinhlapdat: 'Chuẩn bị giá trị công trình và các mốc thi công, lắp đặt, chạy thử, bàn giao để được tư vấn theo từng hạng mục.',
  hanghoaxuatnhapkhau: 'Khi xin báo phí, khai giá trị, đặc tính, cách đóng gói và các chặng vận chuyển của lô hàng, gồm cả chặng nội địa nếu cần bảo hiểm.',
};
const actions = {
  taisannhaxuong: [['Nhận tư vấn bảo hiểm tài sản','tel:0938072236'],['Tra bảo hiểm cháy nổ bắt buộc','/san-pham/chay-no-bat-buoc/#tra-cuu']],
};

export function articlesForArea(slug, profile) {
  const situation = contexts[slug];
  if (!situation || situation.length !== IDs.length) throw new Error('Thiếu tình huống địa phương: ' + slug);
  return new Map(IDs.map((id, index) => {
    const authored = localProductArticles[slug]?.[id];
    if (authored) return [id, authored];
    const fromThudaumot = localProductArticles.thudaumot[id];
    const base = topics[id] || fromThudaumot;
    const note = details[id](situation[index]);
    const scope = fromThudaumot ? base.scope.slice(0, baseScopeCount[id]) : base.scope;
    const questions = base.questions.filter(([q], i) => !(id === 'tndsoto' && i === 1) && !(id === 'hanghoaxuatnhapkhau' && i === 0));

    return [id, {
      ...base,
      image: 'local-' + slug + '-' + id,
      lead: (neutralLeads[id] || base.lead) + ' ' + note,
      scope: [...scope, profile.current],
      questions,
      actions: actions[id] || base.actions,
      sources: [...base.sources, profile.law],
    }];
  }));
}
