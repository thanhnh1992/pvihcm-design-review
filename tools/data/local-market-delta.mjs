const law = 'Nghị quyết 202/2025/QH15 về sắp xếp đơn vị hành chính cấp tỉnh.';

const records = {
  binhthuan: {
    name:'Bình Thuận', region:'Lâm Đồng', unit:'Lâm Đồng',
    office:'Văn phòng PVI Lâm Đồng tham khảo nằm tại khu vực Đà Lạt.',
    rows:[
      ['Phan Thiết','Xe cá nhân, cơ sở lưu trú và hộ kinh doanh'],
      ['Hàm Thuận Bắc','Sản xuất, kho chứa và vận chuyển hàng hóa'],
      ['La Gi','Cơ sở kinh doanh, xe giao nhận và người lao động'],
    ],
    needs:['Cơ sở lưu trú gần biển nên kê tách tài sản của chủ sở hữu, thiết bị và phần khách thuê đầu tư.','Xe đưa đón khách cần đối chiếu số chỗ và mục đích sử dụng trước khi tra TNDS.','Lô hàng đi qua nhiều kho nên ghi rõ điểm giao, điểm nhận và quy cách đóng gói.'],
    contexts:['xe gia đình và xe đưa đón khách quanh Phan Thiết','xe hoạt động thường xuyên ở khu vực ven biển','cơ sở lưu trú có bếp và kho tách khu','trang thiết bị và phần tài sản do bên thuê đầu tư','công trình cải tạo khu lưu trú trước mùa khách','lô hàng từ kho ở Hàm Thuận Bắc đi qua điểm trung chuyển','đội thi công chia ca theo từng hạng mục','đội vận hành và lao động thời vụ tại cơ sở lưu trú','gia đình và nhân viên làm việc quanh Phan Thiết','chuyến đi nước ngoài có chặng nối từ Bình Thuận'],
  },
  tiengiang: {
    name:'Tiền Giang', region:'Đồng Tháp', unit:'Đồng Tháp',
    office:'Văn phòng PVI Đồng Tháp tham khảo nằm tại phường Đạo Thạnh, khu vực Mỹ Tho.',
    rows:[['Mỹ Tho','Xe gia đình và cơ sở kinh doanh'],['Châu Thành','Kho trái cây, hàng hóa và lao động'],['Cái Bè','Vận chuyển, điểm tập kết và xe giao nhận']],
    needs:['Đơn vị thu mua trái cây nên ghi loại hàng, giá trị, cách đóng gói và điểm chuyển tải.','Kho ở khu Châu Thành nên tách nhà kho, máy móc và hàng của bên thứ ba khi kê khai.','Xe giao hàng dùng cả cho gia đình cần xác định mục đích thực tế theo hồ sơ.'],
    contexts:['xe giao nhận vào khu Mỹ Tho','xe chở hàng chạy thường xuyên trên tuyến liên tỉnh','kho đóng gói và khu phụ trợ ở Châu Thành','hàng nhận giữ hộ tại một điểm tập kết','lắp đặt hệ thống làm mát kho hàng','trái cây từ Cái Bè chuyển qua kho rồi đi tiếp','nhóm lắp đặt máy theo lịch vận hành của kho','lao động phân loại và bốc xếp theo ca','nhóm nhân viên ở khu vực Mỹ Tho','chuyến công tác có chặng đường bộ trước khi bay'],
  },
  dongthap: {
    name:'Đồng Tháp', region:'Đồng Tháp', unit:'Đồng Tháp',
    office:'Trang này tập trung vào địa bàn Đồng Tháp trước sắp xếp. Văn phòng PVI Đồng Tháp tham khảo hiện đặt ở phường Đạo Thạnh, khu vực Mỹ Tho.',
    rows:[['Cao Lãnh','Xe cá nhân, hộ kinh doanh và sức khỏe'],['Sa Đéc','Sản xuất, hàng hóa và công trình'],['Hồng Ngự','Vận chuyển, kho và lao động']],
    needs:['Cơ sở chế biến và kho ở khu Sa Đéc nên kê khai công năng từng khu để tra cháy nổ.','Nếu tài sản hoặc hàng hóa đặt ở nhiều nơi, ghi giá trị theo từng địa điểm trong yêu cầu báo phí.','Đội vận hành kho và người bốc xếp nên khai rõ công việc để chọn bảo hiểm tai nạn phù hợp.'],
    contexts:['xe di chuyển giữa Cao Lãnh và các khu dân cư','xe chạy tuyến Cao Lãnh và Sa Đéc','cơ sở sản xuất có kho vật tư riêng ở Sa Đéc','xưởng chế biến và hàng tồn thay đổi theo mùa','gói cải tạo xưởng và chạy thử thiết bị','lô hàng từ Hồng Ngự đi qua điểm trung chuyển','đội thi công lắp đặt ở xưởng đang vận hành','nhân viên kho và đội giao nhận tại Sa Đéc','gia đình hoặc nhóm người lao động ở Cao Lãnh','chuyến đi quốc tế xuất phát từ khu Cao Lãnh'],
  },
  bentre: {
    name:'Bến Tre', region:'Vĩnh Long', unit:'Cửu Long',
    office:'Văn phòng PVI Cửu Long tham khảo nằm tại phường Phước Hậu, ngoài địa bàn Bến Tre cũ.',
    rows:[['Khu vực Bến Tre','Xe cá nhân, dịch vụ và sức khỏe'],['Châu Thành','Kho, hàng hóa và sản xuất'],['Giồng Trôm','Tài sản cơ sở kinh doanh và người lao động']],
    needs:['Xưởng chế biến dừa cần tách nhà xưởng, máy móc và nguyên liệu theo từng công năng.','Hàng đi bằng đường bộ rồi chuyển phương tiện cần kê đủ các chặng trong yêu cầu bảo hiểm.','Hộ kinh doanh thuê mặt bằng nên đối chiếu quyền sở hữu đối với phần thiết bị tự đầu tư.'],
    contexts:['xe gia đình và xe giao hàng quanh khu Bến Tre','xe chạy giữa điểm thu mua và kho chế biến','xưởng chế biến dừa có nhiều công đoạn','máy móc chế biến và nguyên liệu lưu kho','gói lắp đặt dây chuyền trong nhà xưởng','lô hàng nông sản đóng thùng chuyển qua kho','nhóm lắp đặt thuê theo tiến độ dự án','lao động đứng máy và vận chuyển nội bộ','gia đình hoặc người lao động ở khu Bến Tre','chuyến du lịch có hành trình bay từ ngoài địa bàn'],
  },
  vinhlong: {
    name:'Vĩnh Long', region:'Vĩnh Long', unit:'Cửu Long',
    office:'Trang này tập trung vào khu vực Vĩnh Long trước sắp xếp. Văn phòng PVI Cửu Long tham khảo nằm tại phường Phước Hậu.',
    rows:[['Phước Hậu','Văn phòng PVI và hồ sơ khách cá nhân'],['Long Hồ','Kho, sản xuất và xe giao hàng'],['Bình Minh','Giao nhận liên tỉnh và công trình']],
    needs:['Xe vận chuyển liên tỉnh cần đối chiếu tải trọng và mục đích sử dụng với giấy đăng ký.','Cơ sở có cả kho và khu bán hàng cần xác định tài sản theo từng công năng.','Nhà thầu nên gửi dự toán, tiến độ và danh sách lao động theo từng gói thi công.'],
    contexts:['xe gia đình hoặc xe giao hàng quanh khu Vĩnh Long','xe đi qua Bình Minh hoặc giao hàng liên tỉnh','kho và cơ sở bán hàng ở Long Hồ','hàng lưu kho luân chuyển giữa hai địa điểm','gói cải tạo nền và lắp máy trong công trình','hàng giao qua điểm tập kết trước khi đến đại lý','đội lắp đặt luân phiên giữa các hạng mục','lao động kho và nhân viên phục vụ theo ca','gia đình và nhóm nhân viên quanh Phước Hậu','chuyến công tác nước ngoài có chặng nối qua Cần Thơ'],
  },
  travinh: {
    name:'Trà Vinh', region:'Vĩnh Long', unit:'Cửu Long',
    office:'Văn phòng PVI Cửu Long tham khảo nằm tại phường Phước Hậu, ngoài địa bàn Trà Vinh cũ.',
    rows:[['Khu vực Trà Vinh','Xe cá nhân và hộ kinh doanh'],['Càng Long','Kho, vận tải và hàng hóa'],['Duyên Hải','Công trình, thiết bị và người lao động']],
    needs:['Cơ sở tại khu Duyên Hải nên ghi rõ phần tài sản đang vận hành và phần còn thi công.','Phương tiện giao hàng nên kê đúng tải trọng và mục đích thực tế.','Với công nhân công trình, bổ sung nhóm công việc và ngày bắt đầu theo từng địa điểm.'],
    contexts:['xe cá nhân và xe giao hàng ở khu Trà Vinh','xe vận hành giữa đô thị và khu Duyên Hải','cơ sở sản xuất có kho riêng ở Càng Long','thiết bị đang lắp và thiết bị đang vận hành','công trình ở Duyên Hải theo nhiều giai đoạn','lô hàng đi đường bộ từ khu Trà Vinh đến điểm giao','nhà thầu có đội làm việc ở nhiều hạng mục','nhân viên vận hành thiết bị, kho và bảo trì','gia đình và lao động tại khu Trà Vinh','chuyến công tác đi qua sân bay ngoài khu Trà Vinh'],
  },
  angiang: {
    name:'An Giang', region:'An Giang', unit:'An Giang',
    office:'Trang này tập trung vào phần An Giang trước sắp xếp. Văn phòng PVI An Giang tham khảo nằm tại phường Rạch Giá, trên địa bàn Kiên Giang cũ.',
    rows:[['Long Xuyên','Xe cá nhân, vận tải và cơ sở kinh doanh'],['Châu Đốc','Cơ sở lưu trú, hàng hóa và người lao động'],['Tân Châu','Kho, sản xuất và vận chuyển']],
    needs:['Xe phục vụ khách lưu trú hoặc giao hàng cần khai đúng mục đích sử dụng.','Kho hàng chuyển nhiều lần nên ghi nơi lưu, phương tiện và điều kiện đóng gói.','Cơ sở thuê mặt bằng cần xác định phần tài sản của chủ nhà và của bên thuê.'],
    contexts:['xe cá nhân và xe kinh doanh quanh Long Xuyên','xe đi nhiều giữa Long Xuyên và Châu Đốc','nhà nghỉ, bếp và kho phụ trợ tại Châu Đốc','thiết bị và hàng tại một kho ở Tân Châu','cải tạo khu lưu trú hoặc lắp đặt thiết bị mới','lô hàng có điểm tập kết ở khu Tân Châu','đội thi công nhà nghỉ theo thời kỳ đóng cửa','nhân viên kho, giao nhận và lễ tân','gia đình hoặc người lao động quanh Long Xuyên','chuyến đi nước ngoài khởi hành ngoài khu Long Xuyên'],
  },
  kiengiang: {
    name:'Kiên Giang', region:'An Giang', unit:'An Giang',
    office:'Văn phòng PVI An Giang tham khảo nằm ở phường Rạch Giá. Khách tại Phú Quốc có trang hướng dẫn riêng.',
    rows:[['Rạch Giá','Văn phòng, xe cá nhân và cơ sở kinh doanh'],['Hà Tiên','Lưu trú, hàng hóa và xe dịch vụ'],['Kiên Lương','Kho, nhà xưởng và lao động']],
    needs:['Cơ sở chế biến hoặc lưu kho ở khu Kiên Lương nên kê giá trị theo từng nơi.','Lô hàng đi qua cảng cần xác định các chặng và ai chịu rủi ro khi chuyển tải.','Cơ sở lưu trú nên tách tài sản cố định, hàng dự trữ và thiết bị lắp thêm.'],
    contexts:['xe gia đình và xe dịch vụ quanh Rạch Giá','xe chạy tuyến Rạch Giá và Hà Tiên','cơ sở lưu trú có bếp và kho riêng tại Hà Tiên','kho và thiết bị sản xuất ở khu Kiên Lương','gói sửa chữa kho đang hoạt động','lô hàng chuyển từ cảng đến kho bằng nhiều phương tiện','đội thi công hoặc lắp đặt tại kho chế biến','nhân viên vận hành, phục vụ và giao nhận','gia đình hoặc người lao động quanh Rạch Giá','chuyến nước ngoài có chặng trung chuyển từ Rạch Giá'],
  },
  haugiang: {
    name:'Hậu Giang', region:'Cần Thơ', unit:'Tây Nam',
    office:'Văn phòng PVI Tây Nam tham khảo nằm tại phường Ninh Kiều, ngoài địa bàn Hậu Giang cũ.',
    rows:[['Vị Thanh','Xe cá nhân, cơ sở kinh doanh và sức khỏe'],['Châu Thành','Nhà xưởng, kho và vận chuyển'],['Ngã Bảy','Giao nhận, công trình và lao động']],
    needs:['Hàng tại khu Châu Thành nên kê giá trị, điểm đi, điểm đến và cách xử lý lúc chuyển tải.','Xưởng đang mở rộng cần phân biệt tài sản hiện hữu và hạng mục chưa bàn giao.','Danh sách bảo hiểm nhóm cần phản ánh ca làm việc, vị trí và thời hạn mong muốn.'],
    contexts:['xe cá nhân và xe giao hàng quanh Vị Thanh','xe đi giữa khu dân cư và cơ sở chế biến','xưởng và kho riêng ở khu Châu Thành','thiết bị lắp mới trong xưởng còn vận hành','công trình mở rộng kho hàng và chạy thử','hàng từ kho tại Ngã Bảy đi nhiều chặng','lao động nhà thầu vào ca ở xưởng mở rộng','nhân viên kho và vận hành máy theo ca','gia đình hoặc nhóm lao động tại Vị Thanh','hành trình nước ngoài có chặng nối từ Cần Thơ'],
  },
  soctrang: {
    name:'Sóc Trăng', region:'Cần Thơ', unit:'Tây Nam',
    office:'Văn phòng PVI Tây Nam tham khảo nằm tại phường Ninh Kiều, ngoài địa bàn Sóc Trăng cũ.',
    rows:[['Khu vực Sóc Trăng','Xe cá nhân, cửa hàng và sức khỏe'],['Mỹ Xuyên','Xưởng, hàng hóa và lao động'],['Vĩnh Châu','Vận chuyển, kho và cơ sở chế biến']],
    needs:['Với kho hoặc xưởng chế biến, ghi rõ công năng, địa điểm và danh mục máy móc.','Hàng cần bảo quản đặc biệt nên kê phương thức đóng gói và điều kiện vận chuyển.','Xe tải giao hàng cần xác định tải trọng và mục đích sử dụng theo hồ sơ.'],
    contexts:['xe giao hàng hoặc xe gia đình quanh khu Sóc Trăng','xe vận hành đường dài giữa cơ sở chế biến và điểm giao','kho và cơ sở chế biến ở Mỹ Xuyên','máy móc, khu lạnh và hàng tồn theo từng địa chỉ','gói lắp thiết bị vào kho đang vận hành','lô hàng cần bảo quản khi vận chuyển từ Vĩnh Châu','đội thi công đổi ca theo tiến độ lắp đặt','người lao động làm việc quanh khu đóng gói và kho','gia đình hoặc lao động quanh khu Sóc Trăng','chuyến đi nước ngoài có chặng đường bộ trước khi bay'],
  },
  baclieu: {
    name:'Bạc Liêu', region:'Cà Mau', unit:'Cà Mau',
    office:'Văn phòng PVI Cà Mau tham khảo nằm tại phường Tân Thành, ngoài địa bàn Bạc Liêu cũ.',
    rows:[['Khu vực Bạc Liêu','Xe cá nhân, dịch vụ và hộ kinh doanh'],['Giá Rai','Kho hàng, vận tải và lao động'],['Đông Hải','Công trình, cơ sở chế biến và thiết bị']],
    needs:['Cơ sở lưu kho hoặc chế biến ở khu Đông Hải nên khai rõ phần máy móc, thiết bị và hàng.','Khi bảo hiểm hàng đi nhiều chặng, ghi lịch giao, nguyên tắc bàn giao và điểm dừng.','Nhà thầu ở khu ven biển nên mô tả giai đoạn thi công, thử máy và vận hành.'],
    contexts:['xe cá nhân và xe kinh doanh tại khu Bạc Liêu','xe thường chạy tuyến giữa khu Bạc Liêu và Giá Rai','kho và khu chế biến có công năng khác nhau','tài sản ở cơ sở chế biến quanh Đông Hải','gói thi công hoặc lắp thiết bị tại công trình ven biển','hàng từ điểm tập kết ở Giá Rai đi tiếp bằng đường bộ','đội vận hành thi công theo tiến độ bàn giao','lao động kho, chế biến và giao nhận','gia đình hoặc nhóm nhân viên quanh khu Bạc Liêu','chuyến quốc tế có điểm bay ngoài khu Bạc Liêu'],
  },
  camau: {
    name:'Cà Mau', region:'Cà Mau', unit:'Cà Mau',
    office:'Trang này tập trung vào khu vực Cà Mau trước sắp xếp. Văn phòng PVI Cà Mau tham khảo nằm tại phường Tân Thành.',
    rows:[['Tân Thành','Văn phòng PVI và hồ sơ bảo hiểm xe'],['Năm Căn','Vận chuyển, kho và công trình'],['Đầm Dơi','Tài sản, lao động và hàng hóa']],
    needs:['Cơ sở chế biến nên ghi điều kiện lưu giữ hàng và tách máy móc khỏi hàng tồn kho.','Với hàng chuyển từ đường thủy sang đường bộ, mô tả các điểm và thời gian chuyển tải.','Nếu một nhóm lao động làm tại nhiều cơ sở, gửi địa điểm và loại công việc theo nhóm.'],
    contexts:['xe cá nhân và xe giao hàng quanh phường Tân Thành','xe đi giữa khu đô thị, kho và xưởng','kho chế biến có khu phụ trợ và máy móc riêng','máy móc hoặc hàng tồn trong khu bảo quản','gói lắp đặt tại cơ sở đang hoạt động trong khu Cà Mau','hàng đi từ Năm Căn qua điểm chuyển tải','đội thi công tách theo gói việc và vị trí','lao động kho, chế biến và vận chuyển','gia đình hoặc nhóm lao động quanh Cà Mau','chuyến đi quốc tế có nhiều chặng nối chuyến'],
  },
};

const population = {
  binhthuan:1266200, tiengiang:1796100, dongthap:1601100, bentre:1306300,
  vinhlong:1037300, travinh:1023900, angiang:1912600, kiengiang:1766700,
  haugiang:730000, soctrang:1205300, baclieu:928700, camau:1212000,
};
const populationSource = 'Cục Thống kê, Tình hình kinh tế – xã hội 63 tỉnh, thành phố năm 2024.';

export const additionalProfiles = Object.fromEntries(Object.entries(records).map(([slug,data]) => {
  const { name, region, unit, office, needs, rows } = data;
  const area = 'địa bàn tỉnh ' + name + ' cũ';
  const current = (name === region ? '' : name + ' trên trang này là địa bàn tỉnh trước sắp xếp, nay thuộc ' +
    (region === 'Cần Thơ' ? 'thành phố ' : 'tỉnh ') + region + '. ') + office;
  return [slug, {
    name, area, unit, law, current, needs, rows,
    figure: population[slug].toLocaleString('vi-VN') + ' người',
    period: 'dân số trung bình năm 2024 theo địa giới trước sắp xếp',
    pop: populationSource,
  }];
}));
export const additionalContexts = Object.fromEntries(Object.entries(records).map(([slug,data]) => [slug,data.contexts]));
