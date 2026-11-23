// Khu Kiến thức theo sản phẩm (chủ site yêu cầu 16/11/2026, theo mô hình /kien-thuc/san-pham/<sp> của baohiempvi-vn.com).
// /kien-thuc/ liệt kê sản phẩm; /kien-thuc/<hub>/ chia ba mảng: Kiến thức, Trải nghiệm thực tế, Tin tức.
// Bài GIỮ NGUYÊN URL đang chạy (/tin-tuc/<slug>/), hub chỉ dẫn tới bài; mỗi bài có khối dẫn về sản phẩm gốc.
// Thêm bài mới: thêm một dòng vào POST_HUB (hub chính đứng đầu). Bài không gắn sản phẩm (tin đơn vị, khu vực) thì không thêm.

export const HUBS = [
  { slug: 'tai-nan-24-24', name: 'Bảo hiểm tai nạn 24/24', short: 'Tai nạn 24/24', product: '/san-pham/bao-hiem-tai-nan/', image: '/assets/tn-bao-hiem-tai-nan-la-gi.webp', alt: 'Người đội mũ bảo hiểm chạy xe máy đi làm ở TP.HCM', lead: 'Bảo hiểm tai nạn là gì, phí bao nhiêu, té xe hay chơi thể thao có được trả, doanh nghiệp cần mua gì cho người lao động.' },
  { slug: 'chay-no-bat-buoc', name: 'Bảo hiểm cháy nổ bắt buộc', short: 'Cháy nổ, tài sản', product: '/san-pham/chay-no-bat-buoc/', image: '/assets/section-chay-no.webp', alt: 'Chuyên viên khảo sát tủ báo cháy và đường ống chữa cháy trong kho hàng', lead: 'Cơ sở nào phải mua, phí bao nhiêu, giấy chứng nhận ghi gì và bài học từ các vụ cháy thực tế.' },
  { slug: 'cong-trinh-lap-dat', name: 'Bảo hiểm công trình xây dựng, lắp đặt', short: 'Công trình', product: '/san-pham/bao-hiem-cong-trinh/', image: '/assets/bai-nghi-dinh-220-2026.webp', alt: 'Công trường xây dựng', lead: 'Bảo hiểm công trình, bảo hiểm cho người lao động thi công và các quy định mới về bảo hiểm bắt buộc trong xây dựng.' },
  { slug: 'bao-hiem-o-to', name: 'Bảo hiểm ô tô', short: 'Ô tô', product: '/san-pham/bao-hiem-o-to/', image: '/assets/vfw-bac-tong-quan.webp', alt: 'Xe bán tải điện màu bạc', lead: 'TNDS bắt buộc, bảo hiểm vật chất xe, biểu phí xe điện và cách mua bảo hiểm ô tô PVI.' },
  { slug: 'suc-khoe', name: 'Bảo hiểm sức khỏe', short: 'Sức khỏe', product: '/san-pham/bao-hiem-suc-khoe/', lead: 'Bảo hiểm sức khỏe PVI Care: quyền lợi, cách mua và bảo lãnh viện phí.' },
  { slug: 'du-lich', name: 'Bảo hiểm du lịch', short: 'Du lịch', product: '/san-pham/bao-hiem-du-lich/', lead: 'Bảo hiểm du lịch quốc tế: phạm vi, giấy tờ cần có và cách mua trước chuyến đi.' },
  { slug: 'hang-hoa', name: 'Bảo hiểm hàng hóa xuất nhập khẩu', short: 'Hàng hóa', product: '/san-pham/hang-hoa-xuat-nhap-khau/', lead: 'Bảo hiểm hàng hóa vận chuyển: điều kiện bảo hiểm, hồ sơ và cách nhận báo phí.' },
];

export const STREAMS = [
  { key: 'kien-thuc', name: 'Kiến thức', hint: 'Giải đáp, quyền lợi, phí', lead: 'Trả lời những câu hỏi khách hay hỏi nhất, dẫn căn cứ từ quy tắc PVI và văn bản pháp luật.' },
  { key: 'trai-nghiem', name: 'Trải nghiệm thực tế', hint: 'Hồ sơ, ảnh, chứng từ thật', lead: 'Những trường hợp PVI Thành Đô đã khảo sát, chào phí hoặc xử lý, có ảnh và chứng từ thật đã che thông tin khách.' },
  { key: 'tin-tuc', name: 'Tin tức', hint: 'Sự kiện, văn bản mới', lead: 'Tin sự kiện và văn bản pháp lý mới liên quan đến sản phẩm này.' },
];

// slug bài → danh sách [hub, mảng]. Phần tử đầu là hub chính (dùng cho khối "Thuộc sản phẩm" và đường dẫn trên bài).
export const POST_HUB = {
  'thoi-diem-phat-sinh-trach-nhiem-bao-hiem': [['chay-no-bat-buoc', 'kien-thuc']],
  'cac-loai-bao-hiem-xe-o-to': [['bao-hiem-o-to', 'kien-thuc']],
  'dong-phi-bao-hiem-tre-han': [['chay-no-bat-buoc', 'kien-thuc']],
  // Tai nạn 24/24
  'bao-hiem-tai-nan-la-gi': [['tai-nan-24-24', 'kien-thuc']],
  'bao-hiem-tai-nan-bao-nhieu-tien': [['tai-nan-24-24', 'kien-thuc']],
  'te-xe-may-co-duoc-bao-hiem-tai-nan-chi-tra': [['tai-nan-24-24', 'kien-thuc']],
  'tai-nan-choi-the-thao-co-duoc-boi-thuong': [['tai-nan-24-24', 'kien-thuc']],
  'bao-hiem-tai-nan-va-bao-hiem-y-te-khac-nhau': [['tai-nan-24-24', 'kien-thuc']],
  'bao-hiem-tai-nan-co-bat-buoc-khong': [['tai-nan-24-24', 'kien-thuc']],
  'doanh-nghiep-co-bat-buoc-mua-bao-hiem-tai-nan': [['tai-nan-24-24', 'kien-thuc']],
  'bao-hiem-tai-nan-lao-dong-la-gi': [['tai-nan-24-24', 'kien-thuc']],
  'loi-ich-bao-hiem-tai-nan-ca-nhan': [['tai-nan-24-24', 'kien-thuc']],
  'bao-hiem-tai-nan-24-24-cong-nhan-binh-duong': [['tai-nan-24-24', 'kien-thuc']],
  'bao-hiem-tai-nan-cong-nhan-cong-truong-binh-duong': [['tai-nan-24-24', 'kien-thuc'], ['cong-trinh-lap-dat', 'kien-thuc']],
  'bao-hiem-tai-nan-cong-trinh-pvi': [['tai-nan-24-24', 'kien-thuc'], ['cong-trinh-lap-dat', 'kien-thuc']],
  // Cháy nổ, tài sản
  // Kỹ năng PCCC tại nơi làm việc (chủ site giao 22/11/2026)
  'neu-dam-chay-lon-khong-kiem-soat-duoc-can-bo-nhan-vien-can-lam-gi': [['chay-no-bat-buoc', 'kien-thuc']],
  'quy-trinh-xu-ly-khi-co-chay-xay-ra': [['chay-no-bat-buoc', 'kien-thuc']],
  'cac-nguy-co-chay-no-tai-noi-lam-viec': [['chay-no-bat-buoc', 'kien-thuc']],
  'khi-co-chay-do-dien-dau-tien-phai-lam-gi': [['chay-no-bat-buoc', 'kien-thuc']],
  'thuc-hien-tot-nhiem-vu-pccc-tai-co-so': [['chay-no-bat-buoc', 'kien-thuc']],
  'bao-hiem-chay-no-bat-buoc-bao-nhieu-tien': [['chay-no-bat-buoc', 'kien-thuc']],
  'bao-hiem-chay-no-bat-buoc-chung-cu': [['chay-no-bat-buoc', 'kien-thuc']],
  'giay-chung-nhan-bao-hiem-chay-no-bat-buoc': [['chay-no-bat-buoc', 'kien-thuc']],
  'mua-bao-hiem-chay-no-bat-buoc-o-dau': [['chay-no-bat-buoc', 'kien-thuc']],
  'quy-dinh-mua-bao-hiem-chay-no-bat-buoc': [['chay-no-bat-buoc', 'kien-thuc']],
  'bao-hiem-chay-no-nha-xuong-kho-binh-duong': [['chay-no-bat-buoc', 'kien-thuc']],
  'bao-hiem-tai-san-nha-xuong-binh-duong': [['chay-no-bat-buoc', 'kien-thuc']],
  'bao-hiem-chay-no-kho-hang-sprinkler-thuc-te': [['chay-no-bat-buoc', 'trai-nghiem']],
  'chay-can-ho-chung-cu-happy-valley-bao-hiem-chay-no': [['chay-no-bat-buoc', 'tin-tuc']],
  'chay-tiem-massage-le-van-luong-bao-hiem-chay-no': [['chay-no-bat-buoc', 'tin-tuc']],
  'chay-nha-duong-tran-quang-khai-tan-dinh': [['chay-no-bat-buoc', 'tin-tuc']],
  'nghi-dinh-347-2026-chay-no-bat-buoc': [['chay-no-bat-buoc', 'tin-tuc']],
  // Công trình
  'bao-hiem-cong-trinh-lap-dat-binh-duong': [['cong-trinh-lap-dat', 'kien-thuc']],
  'nghi-dinh-220-2026-bao-hiem-cong-trinh': [['cong-trinh-lap-dat', 'tin-tuc'], ['tai-nan-24-24', 'tin-tuc']],
  // Ô tô
  'bai-bo-thong-tu-04-2021-tt-btc-bao-hiem-xe-co-gioi': [['bao-hiem-o-to', 'tin-tuc']],
  'bao-hiem-xe-ban-tai-dien-vinfast-vf-wild': [['bao-hiem-o-to', 'kien-thuc']],
  'bao-hiem-tnds-o-to-binh-duong': [['bao-hiem-o-to', 'kien-thuc']],
  'bao-hiem-vat-chat-xe-o-to-binh-duong': [['bao-hiem-o-to', 'kien-thuc']],
  // Sức khỏe, du lịch, hàng hóa
  'bao-hiem-suc-khoe-pvi-care-binh-duong': [['suc-khoe', 'kien-thuc']],
  'bao-hiem-du-lich-quoc-te-binh-duong': [['du-lich', 'kien-thuc']],
  'bao-hiem-hang-hoa-xuat-nhap-khau-binh-duong': [['hang-hoa', 'kien-thuc']],
};

export const hubOf = (slug) => {
  const e = POST_HUB[slug];
  if (!e) return null;
  const [hub, stream] = e[0];
  return { hub: HUBS.find((h) => h.slug === hub), stream };
};
