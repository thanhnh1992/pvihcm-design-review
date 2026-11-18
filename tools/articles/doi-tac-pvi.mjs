// 7 bài về quan hệ hợp tác của Bảo hiểm PVI (chủ site duyệt chữ 18/11/2026), thay cho 7 link ra pvi.com.vn
// ở khối "Một số quan hệ hợp tác của Bảo hiểm PVI" trên trang chủ: thẻ đối tác giờ trỏ vào các bài này.
// Chữ đúng bản nháp chủ site đã duyệt (nhap-7-bai-doi-tac.md): chỉ dùng dữ kiện trong bài gốc của Bảo hiểm PVI,
// viết lại câu, nguồn ghi bằng chữ, không link ra ngoài. Đoạn đầu mỗi bài là lead.
// Ảnh: CarDoctor tạo bằng AI (có metadata XMP, DigitalSourceType = trainedAlgorithmicMedia);
// 6 bài còn lại TẠM dùng ảnh minh họa có sẵn của site, chờ chủ site render ảnh riêng thì thay `hero.name`/`post.image`.

const SRC = 'Tổng công ty Bảo hiểm PVI';
const RELATED = {
  xe: [
    { href: '/san-pham/bao-hiem-vat-chat-xe/', img: 'binh-duong-vat-chat-xe', k: 'Sản phẩm', title: 'Bảo hiểm vật chất xe ô tô', text: 'Quyền lợi, phí và cách tham gia tại PVI Thành Đô.' },
    { href: '/san-pham/bao-hiem-o-to/', img: 'tu-van-xe-o-to', k: 'Sản phẩm', title: 'Bảo hiểm ô tô PVI', text: 'Trách nhiệm dân sự bắt buộc và các gói bảo hiểm ô tô.' },
  ],
  dn: [
    { href: '/san-pham/chay-no-bat-buoc/', img: 'section-chay-no', k: 'Sản phẩm', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Tra cứu loại cơ sở và tính phí theo Phụ lục VI.' },
    { href: '/san-pham/', img: 'tu-van-doanh-nghiep', k: 'Sản phẩm', title: 'Toàn bộ sản phẩm bảo hiểm PVI', text: 'Sản phẩm cho cá nhân và doanh nghiệp tại TP.HCM.' },
  ],
  dulich: [
    { href: '/san-pham/bao-hiem-du-lich/', img: 'du-lich-cong-tac', k: 'Sản phẩm', title: 'Bảo hiểm du lịch PVI', text: 'Bảo hiểm cho chuyến đi trong nước và quốc tế.' },
    { href: '/san-pham/', img: 'tu-van-doanh-nghiep', k: 'Sản phẩm', title: 'Toàn bộ sản phẩm bảo hiểm PVI', text: 'Sản phẩm cho cá nhân và doanh nghiệp tại TP.HCM.' },
  ],
};

function article({ slug, title, seoTitle, image, imageW = 1280, imageH = 853, alt, caption, paras, source, sourceDate, related }) {
  const [lead, ...rest] = paras;
  return {
    post: {
      slug, date: '2026-11-18', dateText: '18/11/2026', cat: 'Tin tức · Đối tác Bảo hiểm PVI',
      title, lead, image: `/assets/${image}.webp`, alt, readMin: 2, schemaType: 'NewsArticle',
    },
    crumb: 'Đối tác Bảo hiểm PVI',
    hero: { name: image, w: imageW, h: imageH, position: 'center', caption },
    seo: { title: seoTitle, description: lead.length > 158 ? lead.slice(0, lead.lastIndexOf(' ', 155)) + '…' : lead },
    toc: [],
    faqs: [],
    sources: [[source, '', `${SRC} · ${sourceDate}`]],
    related,
    body: () => rest.map((p) => `<p>${p}</p>`).join('\n') + `\n<p class="kb-source-note">Nguồn: Bảo hiểm PVI, ${sourceDate}.</p>`,
  };
}

export const doiTacPvi = [
  article({
    slug: 'bao-hiem-pvi-hop-tac-cardoctor',
    title: 'Bảo hiểm PVI hợp tác CarDoctor: tiện ích chăm sóc xe trên ứng dụng DriverPlus',
    seoTitle: 'Bảo hiểm PVI hợp tác CarDoctor, tiện ích DriverPlus',
    image: 'doi-tac-pvi-cardoctor', imageW: 1280, imageH: 720,
    alt: 'Chủ xe ô tô xem ứng dụng chăm sóc xe trên điện thoại tại xưởng dịch vụ',
    caption: 'Ảnh minh họa, tạo bằng AI.',
    paras: [
      'Tháng 12/2024, Tổng công ty Bảo hiểm PVI công bố hợp tác chiến lược với CarDoctor, nền tảng dịch vụ tiện ích xe hơi. Mục tiêu là đưa công nghệ vào bảo hiểm xe ô tô, từ lúc mua bảo hiểm đến khi chủ xe cần hỗ trợ trên đường.',
      'Kênh triển khai chính là ứng dụng DriverPlus. Chủ xe tham gia Bảo hiểm PVI được tư vấn từ chuyên gia ô tô và dịch vụ cứu hộ 24/7. Trên ứng dụng có thể tra cứu phạt giao thông, xem thông tin luật giao thông, tìm gara gần nhất và đặt lịch sửa chữa, bảo dưỡng.',
      'Khách hàng còn nhận voucher và quà tặng từ các đối tác của chương trình trong giáo dục, ẩm thực, mua sắm. Với đại lý, hợp tác này giúp việc tư vấn bảo hiểm xe ô tô dễ hơn nhờ có thêm tiện ích đi kèm.',
    ],
    source: 'Hợp tác chiến lược giữa Bảo hiểm PVI và CarDoctor', sourceDate: '13/12/2024', related: RELATED.xe,
  }),
  article({
    slug: 'opes-hop-tac-bao-hiem-pvi',
    title: 'OPES và Bảo hiểm PVI hợp tác giám định, bồi thường bảo hiểm xe cơ giới',
    seoTitle: 'OPES và Bảo hiểm PVI hợp tác giám định, bồi thường xe',
    image: 'tu-van-xe-o-to', alt: 'Chuyên viên bảo hiểm trao đổi với chủ xe ô tô', caption: 'Ảnh minh họa.',
    paras: [
      'Ngày 9/4/2026, Công ty Cổ phần Bảo hiểm OPES ký thỏa thuận hợp tác chiến lược với Tổng công ty Bảo hiểm PVI. Giai đoạn đầu tập trung vào dịch vụ giám định và xử lý bồi thường bảo hiểm xe cơ giới do Bảo hiểm PVI thực hiện. Các giai đoạn sau sẽ mở rộng sang đồng bảo hiểm nhà, xe, sức khỏe, tai nạn và các sản phẩm khác.',
      'OPES đóng góp nền tảng bảo hiểm số và trải nghiệm người dùng. Bảo hiểm PVI đóng góp hệ thống giám định, bồi thường và mạng lưới gara. Theo hai bên, cách phối hợp này giúp rút ngắn thời gian chờ, đơn giản hóa thủ tục và minh bạch hơn khi xử lý sự cố.',
      'Ông Phạm Anh Đức, Tổng Giám đốc Bảo hiểm PVI, cho biết thỏa thuận thể hiện cam kết phối hợp lâu dài, nâng cao năng lực triển khai và kiểm soát rủi ro.',
    ],
    source: 'OPES và Bảo hiểm PVI ký kết hợp tác chiến lược, nâng cao trải nghiệm khách hàng', sourceDate: '09/04/2026', related: RELATED.xe,
  }),
  article({
    slug: 'gara-lien-ket-bao-hiem-pvi',
    title: 'Mạng lưới gara liên kết sửa chữa xe của Bảo hiểm PVI',
    seoTitle: 'Gara liên kết sửa chữa xe của Bảo hiểm PVI',
    image: 'binh-duong-vat-chat-xe', alt: 'Kỹ thuật viên kiểm tra xe ô tô trong xưởng dịch vụ', caption: 'Ảnh minh họa.',
    paras: [
      'Bảo hiểm PVI có mạng lưới hơn 700 gara và showroom hợp tác trên toàn quốc, theo danh sách cập nhật đến ngày 31/03/2025. Danh sách gồm đại lý ủy quyền của Toyota, Ford, Hyundai, Honda, VinFast, Nissan, Suzuki, Mitsubishi, Mercedes-Benz, BMW, Subaru, Volvo, BYD và hàng trăm gara độc lập.',
      'Tại TP. Hồ Chí Minh, danh sách còn có các cơ sở thuộc hệ thống THACO (BMW, Peugeot, KIA, Mazda, xe tải và xe bus) tại Bình Tân, Bình Triệu, Gò Vấp, Trường Chinh, Phú Mỹ Hưng, Phú Nhuận và An Sương. Mỗi cơ sở được ghi tên pháp nhân, địa chỉ xưởng, mã số thuế và số điện thoại.',
      'Khi xe gặp sự cố, chủ xe có hợp đồng bảo hiểm vật chất xe tại PVI Thành Đô gọi tổng đài <a href="tel:1900545458">1900 54 54 58</a> để được hướng dẫn gara phù hợp gần nhất trước khi đưa xe vào sửa.',
    ],
    source: 'Danh sách Gara liên kết sửa chữa của Bảo hiểm PVI', sourceDate: '13/05/2026', related: RELATED.xe,
  }),
  article({
    slug: 'vcci-hop-tac-bao-hiem-pvi',
    title: 'VCCI và Bảo hiểm PVI hợp tác toàn diện giai đoạn 2026–2027',
    seoTitle: 'VCCI và Bảo hiểm PVI hợp tác toàn diện 2026–2027',
    image: 'tu-van-doanh-nghiep', alt: 'Hai chuyên viên trao đổi hồ sơ tại văn phòng doanh nghiệp', caption: 'Ảnh minh họa.',
    paras: [
      'Liên đoàn Thương mại và Công nghiệp Việt Nam (VCCI) và Tổng công ty Bảo hiểm PVI ký thỏa thuận hợp tác cho giai đoạn 2026–2027. Mục tiêu là đồng hành cùng doanh nghiệp Việt Nam nâng cao năng lực cạnh tranh, phát triển bền vững và hội nhập.',
      'Hai bên sẽ phối hợp các chương trình hỗ trợ doanh nghiệp và kết nối hội viên VCCI với hệ sinh thái khách hàng, đối tác của Bảo hiểm PVI theo ngành nghề và khu vực. Bảo hiểm PVI cung cấp giải pháp cho khối doanh nghiệp gồm bảo hiểm tài sản và kỹ thuật, hàng hải, trách nhiệm, con người, xe cơ giới và năng lượng.',
      'Ông Hồ Sỹ Hùng, Chủ tịch VCCI, đánh giá Bảo hiểm PVI là doanh nghiệp tiêu biểu trong lĩnh vực phi nhân thọ, có năng lực tài chính, kinh nghiệm quản trị rủi ro và hệ thống dịch vụ rộng khắp.',
    ],
    source: 'VCCI và Bảo hiểm PVI thiết lập hợp tác toàn diện, đồng hành nâng cao năng lực cạnh tranh cho doanh nghiệp', sourceDate: '22/05/2026', related: RELATED.dn,
  }),
  article({
    slug: 'misa-hop-tac-bao-hiem-pvi',
    title: 'MISA và Bảo hiểm PVI: mua bảo hiểm trực tuyến ngay trên phần mềm MISA',
    seoTitle: 'MISA và Bảo hiểm PVI: mua bảo hiểm trên phần mềm MISA',
    image: 'tu-van-van-phong', alt: 'Chuyên viên hướng dẫn khách hàng tại văn phòng, bên cạnh máy tính', caption: 'Ảnh minh họa.',
    paras: [
      'Ngày 25/12/2025, Tập đoàn MISA và Tổng công ty Bảo hiểm PVI ký thỏa thuận hợp tác chiến lược. Bảo hiểm phi nhân thọ của PVI được tích hợp trên nền tảng MISA Insurance, kết nối với phần mềm bán hàng, kế toán và hóa đơn điện tử của MISA. Khách hàng MISA mua bảo hiểm trực tuyến hoàn toàn ngay trên phần mềm đang dùng.',
      'Hai bên cũng triển khai dịch vụ thu bảo hiểm xã hội trên nền tảng số của MISA. Theo quy định có hiệu lực từ 01/7/2025, doanh nghiệp nhỏ và chủ hộ kinh doanh phải tham gia đóng bảo hiểm xã hội cho người lao động. Dịch vụ này giúp nhóm khách hàng đó đóng nhanh, theo dõi được lịch sử giao dịch.',
      'Theo đại diện MISA, hai bên hướng tới tích hợp thêm bảo hiểm xe, nhà, nhà xưởng trên cùng hệ sinh thái.',
    ],
    source: 'MISA Group and PVI Insurance Officially Sign Strategic Cooperation Agreement', sourceDate: '26/12/2025', related: RELATED.dn,
  }),
  article({
    slug: 'nam-a-bank-hop-tac-bao-hiem-pvi',
    title: 'Bảo hiểm PVI và Nam Á Bank khởi động hợp tác tại miền Tây',
    seoTitle: 'Bảo hiểm PVI và Nam Á Bank khởi động hợp tác miền Tây',
    image: 'hero-tu-van', alt: 'Nhân viên tư vấn trao đổi với khách hàng qua điện thoại', caption: 'Ảnh minh họa.',
    paras: [
      'Ngày 10/6/2026 tại Cần Thơ, Bảo hiểm PVI khu vực miền Tây và Ngân hàng Nam Á khu vực miền Tây tổ chức lễ khởi động kinh doanh. Đây là bước triển khai hợp tác chiến lược giữa hai bên, đặc biệt trong lĩnh vực bancassurance tại Tây Nam Bộ.',
      'Theo định hướng hợp tác, sản phẩm bảo hiểm PVI được phân phối qua chi nhánh và các kênh số của Nam Á Bank. Hai bên còn hợp tác dịch vụ thu hộ, chi hộ, kết nối công nghệ và cung cấp giải pháp tài chính cho cán bộ nhân viên, khách hàng của Bảo hiểm PVI.',
    ],
    source: 'Bảo hiểm PVI và Nam Á Bank khởi động hợp tác kinh doanh tại khu vực miền Tây', sourceDate: '10/06/2026', related: RELATED.dn,
  }),
  article({
    slug: 'vietnam-airlines-doi-tac-bao-hiem-pvi',
    title: 'Bảo hiểm PVI: nhà bảo hiểm chiến lược của Vietnam Airlines từ năm 2009',
    seoTitle: 'Bảo hiểm PVI, nhà bảo hiểm chiến lược của Vietnam Airlines',
    image: 'du-lich-cong-tac', imageW: 1280, imageH: 960, alt: 'Hành khách kéo vali trong nhà ga sân bay quốc tế', caption: 'Ảnh minh họa.',
    paras: [
      'Ngày 4/12/2025, Tổng công ty Bảo hiểm PVI tham dự Vietnam Airlines Platinum Partner Summit 2025, sự kiện thường niên của hệ sinh thái đối tác chiến lược Vietnam Airlines. Bảo hiểm PVI là đối tác chiến lược của hãng từ năm 2009, tức hơn 16 năm.',
      'Các chương trình Bảo hiểm PVI cung cấp cho Vietnam Airlines và đơn vị thành viên gồm bảo hiểm du lịch TripCARE cho hành khách, bảo hiểm thân máy bay và trách nhiệm hàng không, bảo hiểm cho đội bay, nhân sự vận hành và các hạng mục kỹ thuật, tài sản.',
      'Năng lực tài chính của Bảo hiểm PVI được AM Best xếp hạng A− (Xuất sắc), là cơ sở để nhận bảo hiểm cho tài sản và hoạt động có giá trị lớn như ngành hàng không.',
    ],
    source: 'Tổng công ty Bảo hiểm PVI tham dự Vietnam Airlines Platinum Partner Summit 2025', sourceDate: '05/12/2025', related: RELATED.dulich,
  }),
];
