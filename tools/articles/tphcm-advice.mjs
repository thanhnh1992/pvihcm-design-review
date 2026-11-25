import { t } from '../chrome.mjs';

const advice = {
  'quan-1': {
    heading: 'Khai địa điểm bảo hiểm cho cửa hàng và văn phòng ở Quận 1 cũ',
    paragraphs: [
      'Nếu thuê một tầng trong tòa nhà, hãy gửi đúng số tầng, diện tích sử dụng và phần tài sản của bên thuê. Tách biển hiệu, máy tính, thiết bị bán hàng và hàng lưu kho, nhất là khi kho nằm ở địa chỉ khác.',
      'Khi tòa nhà đã có hợp đồng, hỏi ban quản lý xem hợp đồng đó ghi những tài sản nào. Mang theo phần mô tả mặt bằng hoặc trích đoạn hợp đồng thuê để tư vấn viên đối chiếu phần anh chị cần hỏi thêm.',
      'Ví dụ một cửa hàng thuê tầng trệt có hàng trưng bày tại chỗ và kho riêng. Khi xin báo phí, lập hai dòng theo từng địa chỉ và nêu giá trị cao nhất dự kiến ở mỗi nơi.',
    ],
  },
  'quan-3': {
    heading: 'Chuẩn bị hồ sơ khi sửa nhà hoặc cải tạo văn phòng ở Quận 3 cũ',
    paragraphs: [
      'Khi cải tạo mặt bằng đang hoạt động, ghi rõ phần sửa chữa, phần giữ nguyên và khu vực vẫn có người sử dụng trong thời gian thi công. Dự toán nên tách phần xây dựng, thiết bị lắp mới và tài sản có sẵn.',
      'Nếu công trình sát nhà khác hoặc dùng lối đi chung, mô tả vị trí và cách tổ chức mặt bằng. Khi xem báo phí, hỏi riêng về phần công trình, người lao động và trách nhiệm với bên thứ ba.',
      'Chuẩn bị lịch thi công theo từng giai đoạn, đặc biệt là ngày bắt đầu và bàn giao. Nếu đã thi công, nói rõ hạng mục đã làm để PVI xem xét thời điểm và điều kiện nhận bảo hiểm.',
    ],
  },
  'quan-4': {
    heading: 'Tách hàng trong kho và hàng đang giao tại Quận 4 cũ',
    paragraphs: [
      'Nếu hàng tập kết trong kho rồi chuyển qua nhiều điểm giao, ghi riêng vị trí lưu hàng và từng chặng vận chuyển. Với hàng nhận giữ hộ, nêu tên chủ hàng và công việc doanh nghiệp đã cam kết với khách.',
      'Khi hỏi bảo hiểm tài sản, đưa giá trị hàng tại từng kho vào danh mục. Khi hỏi cho hàng đang đi, ghi điểm nhận, điểm giao, phương tiện, cách đóng gói và chứng từ vận chuyển.',
      'Trước khi xác nhận, đối chiếu thời điểm kết thúc lưu kho và bắt đầu hành trình trên phương án. Ghi rõ trường hợp hàng chờ qua đêm hoặc đổi xe để được hướng dẫn cách khai.',
    ],
  },
  'quan-5': {
    heading: 'Kê hàng hóa và thiết bị cho hộ kinh doanh ở Quận 5 cũ',
    paragraphs: [
      'Một cửa hàng có thể có quầy bán riêng và chỗ chứa hàng ở tầng khác hoặc ở địa chỉ khác. Kê theo vị trí và nhóm hàng, ghi thêm giá trị thiết bị và phần hàng nhận ký gửi nếu có.',
      'Nếu hàng tồn tăng vào dịp cao điểm, gửi cả mức tồn kho thường ngày và mức cao nhất dự kiến. Tư vấn viên cần biết giá trị đó tập trung trong bao lâu và ở địa chỉ nào để trao đổi phương án.',
      'Khi hồ sơ liên quan đến cháy nổ, ghi công năng thực tế của mặt bằng, nơi để hàng và thông tin phòng cháy hiện có. Kiểm tra lại địa chỉ trên báo phí nếu giấy phép và địa chỉ giao hàng khác nhau.',
    ],
  },
  'quan-6': {
    heading: 'Lập danh mục bảo hiểm khi có nhiều điểm bán ở Quận 6 cũ',
    paragraphs: [
      'Nếu có nhiều điểm bán, lập bảng một dòng cho mỗi địa chỉ. Tách phần hàng tồn, kệ tủ, thiết bị và tài sản thuê ở từng nơi để PVI có đủ dữ liệu khi so báo phí.',
      'Khi chuyển hàng giữa các cửa hàng hoặc thuê kho ngoài, ghi rõ điểm gửi, điểm nhận và thời gian lưu tại kho. Hỏi cách ghi tài sản đang ở địa điểm khác với địa chỉ đăng ký kinh doanh.',
      'Khi nhận bản nháp, kiểm tra tên đơn vị, danh sách địa điểm cùng số tiền bảo hiểm áp dụng cho từng điểm. Nếu mở thêm cửa hàng giữa kỳ, hỏi thời điểm cần thông báo để cập nhật.',
    ],
  },
  'quan-7': {
    heading: 'Kiểm tra phần tài sản riêng khi thuê cửa hàng hoặc văn phòng ở Quận 7 cũ',
    paragraphs: [
      'Với cửa hàng trong khối đế chung cư hoặc văn phòng thuê, ghi rõ phần diện tích sử dụng, số tầng và mục đích sử dụng. Tách nội thất, thiết bị và hàng hóa của bên thuê khỏi phần tài sản do chủ tòa nhà quản lý.',
      'Trước khi hỏi phí cháy nổ, mang theo mô tả mặt bằng và thông tin do ban quản lý cung cấp. Nếu có kho riêng, phòng máy hoặc khu sửa chữa phía sau, nêu cả những khu này khi kê hồ sơ.',
      'Khi mua cho đội vận hành hoặc nhân viên cửa hàng, ghi công việc thực tế của từng nhóm. Nếu có người giao hàng hoặc bảo trì ngoài giờ, trao đổi rõ nhu cầu để so điều kiện của các gói.',
    ],
  },
  'quan-8': {
    heading: 'Khai công năng khi vừa ở vừa kinh doanh tại Quận 8 cũ',
    paragraphs: [
      'Nếu dùng cùng căn nhà để ở, bán hàng và làm kho, ghi từng khu sử dụng trong hồ sơ. Nêu lối ra vào, nơi đặt hàng và phần không gian dùng chung để tư vấn viên hiểu cách mặt bằng đang vận hành.',
      'Tách tài sản sinh hoạt khỏi thiết bị của cửa hàng, hàng tồn và nguyên vật liệu. Nếu chỗ chứa hàng thuê thêm gần nhà, kê địa chỉ riêng, tránh gộp cả hai vào một dòng.',
      'Khi xem báo phí, kiểm tra địa chỉ và mô tả công năng trước. Đây là hai thông tin nên xác nhận lại nếu giấy tờ cũ ghi địa chỉ khác hoặc cơ sở đã đổi loại hình kinh doanh.',
    ],
  },
  'quan-10': {
    heading: 'So bảo hiểm sức khỏe theo nơi thường khám ở Quận 10 cũ',
    paragraphs: [
      'Khi hỏi PVI Care, nên gửi nhóm tuổi, số người và tên cơ sở anh chị thường đến. Ghi loại nhu cầu chính như khám ngoại trú, nhập viện hoặc bảo hiểm cho nhân viên và người phụ thuộc.',
      'Đối chiếu danh sách cơ sở bảo lãnh viện phí áp dụng với chương trình đang xem. Hỏi rõ trường hợp nào cần thanh toán trước, bộ giấy tờ cần giữ và thời gian chờ nếu hợp đồng có quy định.',
      'Nếu mua cho doanh nghiệp có nhiều ca, tách danh sách người tham gia khỏi danh sách người phụ thuộc. So quyền lợi và thời điểm bắt đầu của từng nhóm trước khi xác nhận báo phí.',
    ],
  },
  'quan-11': {
    heading: 'Hỏi báo phí cho thiết bị và nhân sự tại cơ sở dịch vụ ở Quận 11 cũ',
    paragraphs: [
      'Nếu mặt bằng vừa đón khách vừa có khu gia công hoặc sửa chữa, mô tả riêng hai khu. Nêu thiết bị sử dụng, vật tư thường lưu và khu vực khách có thể đi qua khi gửi hồ sơ.',
      'Với bảo hiểm tai nạn cho nhân viên, tách nhóm lễ tân, kỹ thuật và giao nhận theo việc thực tế. Nếu một người làm nhiều việc, ghi đầy đủ để nhận hướng dẫn xếp nhóm phù hợp.',
      'Khi so hai báo phí tài sản, dùng cùng danh mục và giá trị đề nghị. Kiểm tra phần tự chịu và tài sản nào cần khai riêng trước khi chọn phương án.',
    ],
  },
  'quan-12': {
    heading: 'Kê hồ sơ cho kho, xưởng và đội giao hàng ở Quận 12 cũ',
    paragraphs: [
      'Ghi địa chỉ và công năng theo từng điểm sản xuất, lưu kho hay đóng gói. Nếu thuê nhà xưởng của nhiều chủ, tách thông tin tài sản sở hữu, thuê và nhận giữ hộ.',
      'Với xe giao hàng, gửi giấy đăng ký và nêu mục đích sử dụng. Với nhóm làm kho và nhóm giao hàng, tách công việc và số người để hỏi phương án tai nạn theo từng nhóm.',
      'Nếu giá trị hàng thay đổi thường xuyên, ghi mức hàng cao nhất dự kiến tại từng địa điểm và thời gian cao điểm. Cập nhật hồ sơ khi chuyển kho hoặc thay đổi chủng loại hàng lớn.',
    ],
  },
  'binh-tan': {
    heading: 'Hồ sơ bảo hiểm cho nhà xưởng và kho thuê ở Bình Tân cũ',
    paragraphs: [
      'Khi hỏi phí cho xưởng có nhiều công đoạn, ghi sơ đồ và công năng từng khu. Tách phần nhà, dây chuyền và nguyên liệu, nhất là khi một phần kho dùng chung với đơn vị khác.',
      'Nếu có khu làm việc và kho thành phẩm ở hai địa chỉ, kê riêng danh mục tài sản. Ghi ai sở hữu nhà, máy và hàng, đồng thời đối chiếu với hợp đồng thuê để làm rõ trách nhiệm từng bên.',
      'Muốn hỏi thêm bảo hiểm tai nạn, gửi số người theo công việc thực tế. Đội vận hành máy, kiểm hàng và vận chuyển có thông tin công việc khác nhau, nên chuẩn bị danh sách riêng ngay từ đầu.',
    ],
  },
  'binh-thanh': {
    heading: 'Hẹn tư vấn và chuẩn bị hồ sơ tại khu vực Bình Thạnh cũ',
    paragraphs: [
      'PVI Thành Đô đặt văn phòng tại số 473 Điện Biên Phủ, phường Thạnh Mỹ Tây. Nếu cần trao đổi trực tiếp về xe, tòa nhà hoặc bảo hiểm cho nhân viên, liên hệ trước để được hướng dẫn giấy tờ cần mang.',
      'Với xe gia đình, chuẩn bị giấy đăng ký và giờ hết hạn trên giấy chứng nhận hiện có. Nếu mua cho cả đội xe, lập bảng mỗi xe một dòng, ghi riêng xe dùng cá nhân và xe chạy theo công việc của công ty.',
      'Với doanh nghiệp thuê văn phòng, gửi số tầng, diện tích và danh mục thiết bị thuộc phần sử dụng của mình. Điểm này giúp kiểm tra phần bảo hiểm cần hỏi khi tòa nhà đã có hợp đồng riêng.',
    ],
  },
  'go-vap': {
    heading: 'Chọn hồ sơ báo phí cho xe gia đình và xe chạy dịch vụ ở Gò Vấp cũ',
    paragraphs: [
      'Khi tái tục TNDS, so loại xe, số chỗ và mục đích sử dụng trước khi nhập thông tin. Nếu xe đổi chủ hoặc bắt đầu dùng để chở khách, ghi rõ tình trạng để đối chiếu hồ sơ.',
      'Nếu hỏi thêm bảo hiểm vật chất xe, gửi giá trị xe dự kiến, ảnh hiện trạng theo hướng dẫn và gara anh chị muốn dùng. So cả điều khoản bổ sung và khoản tự chịu khi đối chiếu báo phí.',
      'Ghi giờ hết hạn của giấy chứng nhận cũ. Khi nhận chứng nhận mới, kiểm tra thời điểm hiệu lực, biển số hoặc số khung và thông tin liên hệ báo sự cố.',
    ],
  },
  'phu-nhuan': {
    heading: 'Chuẩn bị báo phí cho văn phòng nhỏ và nhóm nhân viên ở Phú Nhuận cũ',
    paragraphs: [
      'Với văn phòng thuê, kê thiết bị làm việc, nội thất và tài sản có thể di chuyển. Nêu số tầng, diện tích sử dụng và phần nào do chủ nhà trang bị để tư vấn viên đối chiếu hồ sơ.',
      'Nếu muốn mua sức khỏe hoặc tai nạn cho nhân viên, chuẩn bị số người, nhóm tuổi và nhu cầu chi trả. Hỏi riêng về người phụ thuộc và thủ tục cập nhật nhân viên khi có thay đổi.',
      'Khi báo phí cho hai nhóm có công việc khác nhau, chẳng hạn nhân viên bàn giấy và nhân viên thường ra ngoài gặp khách, ghi rõ tần suất di chuyển để làm rõ nhu cầu.',
    ],
  },
  'tan-binh': {
    heading: 'Khai hành trình lô hàng và hồ sơ chuyến công tác ở Tân Bình cũ',
    paragraphs: [
      'Nếu gửi hàng qua sân bay, nêu địa chỉ lấy hàng, điểm giao cuối và những chặng xe tải đi kèm. Ghi điều kiện giao với đối tác để biết bên nào thu xếp bảo hiểm.',
      'Với hàng dễ vỡ hoặc cần giữ lạnh, mô tả bao bì và yêu cầu vận chuyển ngay khi hỏi phí. Nếu hàng chờ giao trong kho, ghi thời gian và địa điểm lưu để xác định phạm vi cần xem.',
      'Với đoàn đi công tác, ghi điểm đến, ngày đi, ngày về và yêu cầu của nơi nhận hồ sơ. Kiểm tra tên theo hộ chiếu và thời điểm hiệu lực trên giấy chứng nhận trước khi sử dụng.',
    ],
  },
  'tan-phu': {
    heading: 'Kê xưởng nhỏ, hàng tồn và công nhân tại Tân Phú cũ',
    paragraphs: [
      'Nếu cùng một mặt bằng có khu sản xuất, khu đóng gói và kho, mô tả công năng của từng khu. Nêu máy móc đang sử dụng và giá trị nguyên liệu, hàng thành phẩm theo nơi lưu.',
      'Khi thuê mặt bằng, kiểm tra thỏa thuận về máy móc, kết cấu nhà và phần sửa chữa do bên thuê đầu tư. Gửi giấy tờ có sẵn về phòng cháy nếu hỏi phương án cháy nổ.',
      'Nếu mua bảo hiểm cho người lao động, ghi số người theo ca và việc thực tế. Với đội bảo trì hoặc người thường làm việc ngoài cơ sở, ghi rõ địa điểm và cách bố trí công việc.',
    ],
  },
  'thu-duc': {
    heading: 'Chọn hồ sơ và điểm liên hệ ở khu vực Thủ Đức cũ',
    paragraphs: [
      'Nếu giấy tờ của anh chị ghi Quận 2, Quận 9 hoặc quận Thủ Đức trước đây, gửi nguyên thông tin trên giấy tờ và thêm địa chỉ hiện tại nếu đã cập nhật. Với nhà xưởng, kho và công trình, ghi địa chỉ nơi đặt tài sản.',
      'Khách cần hỏi về lô hàng qua Cát Lái nên chuẩn bị hành trình từ kho tới điểm giao. Khách hỏi bảo hiểm xây lắp nên gửi dự toán, lịch thi công, thời điểm chạy thử và các tài sản đang sử dụng tại công trường.',
      'Nếu dự định đến điểm mua tại số 37 Đường số 2, An Khánh, xem ảnh và địa chỉ trong bài, rồi liên hệ 0938 072 236 trước khi tới. Anh chị cũng có thể gửi thông tin để được hướng dẫn hồ sơ từ xa.',
    ],
  },
  'binh-chanh': {
    heading: 'Tách kho, công trình và người thi công trên hồ sơ Bình Chánh cũ',
    paragraphs: [
      'Nếu một địa điểm vừa có kho đang hoạt động vừa xây thêm nhà xưởng, tách tài sản đang sử dụng khỏi phần đang thi công. Nêu hạng mục xây mới, thời điểm chạy thử và ngày dự kiến bàn giao.',
      'Nếu doanh nghiệp sử dụng xe để giao hàng, gửi tải trọng và mục đích sử dụng trên hồ sơ xe. Với đội thi công, ghi địa chỉ từng công trình và số người theo nhóm việc.',
      'Khi nhận báo phí, kiểm tra địa chỉ nào nằm trong mỗi phương án và ngày hiệu lực của từng phần. Điều đó giúp tránh bỏ sót kho hiện có hoặc kê trùng tài sản trong lúc chuyển giai đoạn.',
    ],
  },
  'can-gio': {
    heading: 'Hỏi phí cho tài sản lưu kho và hàng vận chuyển ở Cần Giờ cũ',
    paragraphs: [
      'Nếu lô hàng đi qua nhiều chặng hoặc có điểm trung chuyển, ghi rõ cách vận chuyển, thời gian chờ và điểm chuyển giao. Với hàng cần giữ nhiệt độ, nêu yêu cầu đóng gói và cách kiểm soát nhiệt độ.',
      'Nếu còn hàng tại kho hoặc thiết bị ở cơ sở, lập danh mục riêng cho từng địa điểm. Hỏi rõ tài sản nào cần đưa vào hồ sơ và rủi ro nào phải đề nghị ghi trên báo phí.',
      'Trước khi xác nhận, so thời gian lô hàng được bảo hiểm với lịch vận chuyển dự kiến. Nếu lịch đổi, nếu đổi phương tiện hay đổi điểm giao, liên hệ đầu mối cấp để kiểm tra lại hồ sơ.',
    ],
  },
  'cu-chi': {
    heading: 'Chuẩn bị danh mục tài sản và công nhân theo ca ở Củ Chi cũ',
    paragraphs: [
      'Đối với xưởng có nhiều dãy nhà, kê giá trị theo từng khu sản xuất và kho. Ghi dây chuyền mới lắp, máy móc đang thuê hoặc khu vực có giá trị hàng tồn tăng theo mùa.',
      'Khi hỏi bảo hiểm người lao động, chia số người theo vận hành máy, kho, bảo trì và nhóm làm việc khác. Ghi ca làm và phạm vi công việc để được tư vấn theo danh sách thực tế.',
      'Nếu xưởng có kế hoạch mở rộng, gửi dự toán và lịch đưa hạng mục mới vào vận hành. Tiến độ này cần được đối chiếu riêng khi chuẩn bị phương án xây lắp và cập nhật bảo hiểm tài sản.',
    ],
  },
  'hoc-mon': {
    heading: 'Hồ sơ cho xe tải và kho hàng phân phối ở Hóc Môn cũ',
    paragraphs: [
      'Với xe chở hàng, tra TNDS theo tải trọng và cách sử dụng thực tế. Nếu nhiều xe chung một đầu mối quản lý, lập bảng theo biển số, tải trọng và ngày hết hạn từng xe để dễ tái tục.',
      'Với kho phân phối, kê hàng theo từng địa điểm, nêu hàng sở hữu và hàng giữ hộ. Khi hàng giao nhiều đợt, gửi lịch, tuyến đường và mức giá trị dự kiến mỗi chuyến khi hỏi thêm bảo hiểm vận chuyển.',
      'Trước khi phát hành, kiểm tra doanh nghiệp đứng tên và địa chỉ nơi đặt tài sản. Ghi đúng thông tin người có thể liên hệ khi cần kiểm tra hồ sơ hoặc báo sự cố.',
    ],
  },
  'nha-be': {
    heading: 'Chuẩn bị thông tin cho kho, hàng trên đường và đội vận hành ở Nhà Bè cũ',
    paragraphs: [
      'Nếu hàng vào kho rồi chuyển sang điểm giao, ghi thời gian tại kho và ai chịu trách nhiệm trong mỗi công đoạn. Với hàng của khách, gửi phần thỏa thuận lưu kho và mô tả loại hàng để PVI xem xét đúng nhu cầu.',
      'Nếu thuê nhà kho, phân tách phần tài sản do bên thuê đầu tư và phần do chủ kho quản lý. Kê thiết bị, hàng tồn và giá trị theo từng nơi, đặc biệt khi dùng nhiều kho khác nhau.',
      'Đối với nhóm vận hành, bảo trì và giao nhận, khai công việc thực tế trước khi xin báo phí tai nạn. Hỏi cách cập nhật khi bổ sung người hoặc chuyển ca làm trong kỳ.',
    ],
  },
};

export function tphcmAdvice(slug, articleClass = 'kv-shell kv-prose') {
  const district = advice[slug.replace(/^mua-bao-hiem-pvi-/, '')];
  if (!district) return '';
  return `<section class="kv-block" aria-labelledby="ho-so-khu-vuc"><div class="${articleClass}">
<h2 id="ho-so-khu-vuc">${t(district.heading)}</h2>
${district.paragraphs.map((paragraph) => `<p>${t(paragraph)}</p>`).join('\n')}
<p>Xem thêm <a class="kb-link" href="/tphcm/#quan-huyen">hướng dẫn bảo hiểm PVI theo quận, huyện tại TP.HCM</a>.</p>
</div></section>`;
}
