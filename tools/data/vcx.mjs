/**
 * Dữ liệu trang Bảo hiểm vật chất xe ô tô (làm lại theo bản demo VCX V3, chủ site giao 30/10/2026).
 *
 * KHÔNG có tỷ lệ phí: chủ site gửi biểu phí sau. Khi có biểu phí đã đối chiếu, thêm vào đây
 * rồi bật phần tính phí trong vcx-builder.tsx. Không bịa giá xe gợi ý, không voucher,
 * không nhắc AI (AGENTS.md mục 12).
 */
export const PAGE_PATH = "/bao-hiem-o-to/bao-hiem-vat-chat-xe";
export const DOI_CHIEU_NGUON = "30/10/2026";
export const ZALO_TU_VAN = "https://zalo.me/0938072236";
export const HOTLINE_BOI_THUONG = { label: "1900 54 54 58", tel: "1900545458" };
export const RULES_PDF = "https://adminweb.pvi.com.vn/wp-content/uploads/2025/04/2025-QUY-TAC-BH-TU-NGUYEN-XE-O-TO.pdf";
export const CLAUSES_PDF = "https://adminweb.pvi.com.vn/wp-content/uploads/2025/05/CAC-DKBS-BH-TU-NGUYEN-XE-O-TO-HIEU-LUC-TU-1.7.2025.pdf";
/**
 * Ô "AI kiểm tra giá xe thực tế" (chủ site chốt 30/10/2026, ngoại lệ duy nhất của quy tắc
 * không nhắc AI, xem AGENTS.md mục 12). Chưa nối dịch vụ: để trống thì ô chỉ báo "đang kết nối",
 * không hiện con số nào. Khi nối, endpoint nhận POST {car, year} và trả
 * {low, high, sources: [{title, url}]}; thiếu nguồn hoặc số không hợp lệ thì báo cần định giá riêng.
 */
export const PRICE_CHECK_ENDPOINT = "";
export const PRICE_CHECK_LABEL = "AI kiểm tra giá xe thực tế";
/** Gợi ý nhãn hiệu và dòng xe cho ô nhập (chỉ tên xe, không kèm giá). Khách vẫn gõ được xe ngoài danh sách. */
export const carCatalogue = {
    VinFast: ["VF 3", "VF 5", "VF 6", "VF 7", "VF 8", "VF 9", "Lux A2.0", "Lux SA2.0", "Fadil", "Limo Green"],
    Toyota: ["Vios", "Wigo", "Yaris Cross", "Veloz Cross", "Avanza Premio", "Corolla Cross", "Corolla Altis", "Camry", "Innova Cross", "Fortuner", "Hilux", "Land Cruiser"],
    Hyundai: ["Grand i10", "Accent", "Elantra", "Creta", "Stargazer", "Tucson", "Santa Fe", "Custin", "Palisade"],
    Kia: ["Morning", "Soluto", "K3", "K5", "Sonet", "Seltos", "Sportage", "Sorento", "Carnival", "EV6", "EV9"],
    Mazda: ["Mazda2", "Mazda3", "Mazda6", "CX-3", "CX-30", "CX-5", "CX-8", "CX-60", "CX-90"],
    Mitsubishi: ["Attrage", "Xpander", "Xforce", "Outlander", "Pajero Sport", "Triton"],
    Ford: ["Territory", "Ranger", "Everest", "Explorer", "Mustang"],
    Honda: ["City", "Civic", "HR-V", "BR-V", "CR-V", "Accord"],
    "Mercedes-Benz": ["C 200", "C 300", "E 200", "E 300", "GLC 200", "GLC 300", "GLE", "S 450", "EQB", "EQE", "EQS"],
    BMW: ["320i", "330i", "520i", "X1", "X3", "X5", "X7", "i4", "iX"],
    Lexus: ["ES 250", "NX 350", "RX 350", "LX 600"],
    BYD: ["Dolphin", "Atto 3", "Seal", "M6"],
    MG: ["MG5", "ZS", "HS", "MG4"],
    Suzuki: ["Swift", "XL7", "Jimny"],
    Nissan: ["Almera", "Kicks", "Navara"],
    Peugeot: ["2008", "3008", "408", "5008"],
    Volkswagen: ["Viloran", "Tiguan", "Teramont", "Touareg"],
    Isuzu: ["D-Max", "mu-X"],
    Subaru: ["Forester", "Outback", "Crosstrek"],
    Audi: ["A4", "A6", "Q3", "Q5", "Q7", "Q8"],
    Volvo: ["XC40", "XC60", "XC90", "S90"],
    Porsche: ["Macan", "Cayenne", "911", "Taycan"],
    "Land Rover": ["Defender", "Range Rover", "Discovery"],
    Tesla: ["Model 3", "Model Y"],
};
export const basicScope = ["Va chạm", "Cháy, nổ", "Thiên tai", "Trộm cướp toàn bộ xe"];
/** 4 điều khoản bổ sung hay mua cùng nhau; mã theo bộ ĐKBS PVI hiệu lực 01/07/2025. */
export const clauses = [
    { id: "003", code: "ĐKBS 003/XCG-PVI", title: "Mất cắp bộ phận", text: "Bồi thường khi bộ phận của xe bị mất cắp, theo điều kiện của điều khoản.", icon: "lock" },
    { id: "006", code: "ĐKBS 006/XCG-PVI", title: "Không khấu hao thay mới", text: "Phụ tùng thay mới thuộc phạm vi bồi thường không bị trừ khấu hao.", icon: "wrench" },
    { id: "007", code: "ĐKBS 007/XCG-PVI", title: "Sửa chữa chính hãng", text: "Sửa xe tại cơ sở chính hãng với chi phí hợp lý, phù hợp loại xe được bảo hiểm.", icon: "garage" },
    { id: "008", code: "ĐKBS 008/XCG-PVI", title: "Động cơ do ảnh hưởng của nước", text: "Thiệt hại động cơ do nước khi xe vô ý đi vào đường, khu vực ngập (thủy kích), theo điều kiện của điều khoản.", icon: "drop" },
];
/** Số liệu từ một giấy chứng nhận PVI thật chủ site gửi 30/10/2026 (đã bỏ thông tin nhận diện khách). */
export const sampleCertificate = {
    vehicle: "Ô tô 7 chỗ, sản xuất năm 2026",
    use: "Chở người, không kinh doanh vận tải",
    insuredValue: "915.000.000 đ",
    clauses: "006 · 007 · 008",
    premium: "8.318.182 đ",
    vat: "831.818 đ",
    total: "9.150.000 đ",
    deductible: "500.000 đ/vụ",
    term: "12 tháng",
};
/**
 * Giấy chứng nhận mẫu vẽ bằng code: số liệu phí lấy từ giấy thật ở trên, còn thông tin
 * chủ xe, biển số, số khung, số máy là thông tin tượng trưng (chủ site chốt 30/10/2026).
 */
export const certificateMock = {
    owner: "NGUYỄN VĂN A",
    address: "Số 1 Đường A, Phường B, TP. Hồ Chí Minh",
    plate: "51X-XXX.XX",
    chassis: "XXXXXXXXXXXXXXXXX",
    engine: "XXXXXXXXXX",
    vehicle: "Ô tô chở người 7 chỗ",
    year: "2026",
    use: "Không kinh doanh vận tải",
};
/** Bốn dòng nên đọc kỹ trên giấy chứng nhận; số thứ tự khớp với dấu trên giấy mẫu. */
export const certificateNotes = [
    { label: "Số tiền bảo hiểm", value: sampleCertificate.insuredValue, text: "Giá trị xe tham gia bảo hiểm, căn cứ để tính phí. Giá trị khai nên sát giá trị thực tế; PVI xem xét, xác nhận trước khi cấp đơn." },
    { label: "Điều khoản bổ sung", value: sampleCertificate.clauses, text: "Xe này mua thêm không khấu hao thay mới, sửa chữa chính hãng và động cơ do ảnh hưởng của nước (thủy kích)." },
    { label: "Mức khấu trừ", value: sampleCertificate.deductible, text: "Phần chủ xe tự chịu trong mỗi vụ tổn thất. Một số điều khoản bổ sung có mức khấu trừ riêng." },
    { label: "Tổng phí 12 tháng", value: sampleCertificate.total, text: `Gồm phí ${sampleCertificate.premium} và VAT ${sampleCertificate.vat}.` },
];
export const askBeforeSigning = [
    "Xe đi vào đường ngập rồi chết máy, hoặc bị nước dâng khi đang đỗ: được trả không, cần điều khoản nào.",
    "Người lái không có giấy phép lái xe hợp lệ hoặc có nồng độ cồn: hợp đồng xử lý thế nào.",
    "Hao mòn, hỏng tự nhiên, hỏng máy không do tai nạn: thuộc phần được trả hay phần loại trừ.",
    "Thay phụ tùng mới có trừ khấu hao không; đã có ĐKBS 006 chưa.",
    "Sửa xe ở đâu: gara do ai chỉ định, có chọn được gara chính hãng không.",
    "Mức khấu trừ mỗi vụ: mỗi lần bồi thường bạn tự chịu bao nhiêu.",
];
export const claimSteps = [
    { title: "Báo tổn thất", text: `Gọi tổng đài ${HOTLINE_BOI_THUONG.label}, giữ nguyên hiện trường, chụp ảnh xe và khu vực xảy ra sự cố.` },
    { title: "Giám định, thống nhất phương án", text: "Giám định viên ghi nhận thiệt hại, thống nhất phương án sửa chữa với chủ xe và gara." },
    { title: "Bảo lãnh tại gara", text: "PVI xác nhận bảo lãnh với gara liên kết. Phần khấu trừ, ngoài phạm vi và chi phí chưa được chấp thuận do chủ xe trả." },
];
export const related = [
    { href: "/kien-thuc/bao-hiem-than-vo-o-to-la-gi-co-bat-buoc-khong", label: "Bảo hiểm thân vỏ ô tô là gì, có bắt buộc không" },
    { href: "/kien-thuc/bao-hiem-thuy-kich-la-gi", label: "Bảo hiểm thủy kích là gì" },
    { href: "/kien-thuc/xe-o-to-ngap-nuoc-thuy-kich-bao-hiem-vat-chat", label: "Xe ngập nước, thủy kích: bảo hiểm vật chất trả gì" },
    { href: "/kien-thuc/xe-bi-thuy-kich-phai-lam-gi", label: "Xe bị thủy kích phải làm gì" },
    { href: "/kien-thuc/bao-hiem-xe-ban-tai-dien-vinfast-vf-wild", label: "Biểu phí xe bán tải điện VinFast VF Wild" },
    { href: "/gara-lien-ket-pvi", label: "Tra cứu gara, showroom liên kết PVI" },
];
export const faqs = [
    {
        question: "Bảo hiểm vật chất xe ô tô là gì?",
        answer: "Bảo hiểm vật chất xe là bảo hiểm tự nguyện trả chi phí sửa chữa, thay thế cho chính chiếc xe của bạn khi xảy ra va chạm, cháy nổ, thiên tai hoặc trộm cướp toàn bộ xe, trong phạm vi quy tắc và hợp đồng. Bảo hiểm TNDS bắt buộc chỉ trả cho người khác, không trả cho xe của bạn.",
    },
    {
        question: "Xe bị thủy kích có được bảo hiểm vật chất xe trả không?",
        answer: "Thiệt hại động cơ do nước thuộc điều khoản bổ sung ĐKBS 008/XCG-PVI. Hợp đồng không có điều khoản này thì không mặc định được chi trả. Có điều khoản rồi vẫn phụ thuộc nguyên nhân, điều kiện, mức khấu trừ và kết quả giám định.",
    },
    {
        question: "Mức khấu trừ 500.000 đồng mỗi vụ nghĩa là gì?",
        answer: "Là phần chủ xe tự chịu trong mỗi vụ tổn thất trước khi bảo hiểm trả phần còn lại. Mức 500.000 đồng/vụ là mức khấu trừ chung ghi trên một giấy chứng nhận PVI thực tế; một số điều khoản bổ sung có mức khấu trừ riêng theo hợp đồng, quy tắc và điều khoản.",
    },
    {
        question: "Pin xe điện có được bảo hiểm tự động không?",
        answer: "Không mặc định. Cần khai báo đầy đủ giá trị và quyền sở hữu bộ pin khi mua. Phạm vi bồi thường cho pin phụ thuộc nguyên nhân tổn thất, điều kiện và loại trừ của hợp đồng; giấy chứng nhận PVI có dòng riêng cho giá trị bộ pin điện động cơ.",
    },
    {
        question: "Phí bảo hiểm vật chất xe tính thế nào?",
        answer: "Phí tính theo giá trị xe tham gia bảo hiểm nhân tỷ lệ phí, tỷ lệ phụ thuộc loại xe, tuổi xe, mục đích sử dụng và các điều khoản bổ sung chọn thêm. Ví dụ một xe 7 chỗ không kinh doanh vận tải, giá trị 915 triệu đồng, có ĐKBS 006, 007, 008 đóng 9.150.000 đồng một năm đã gồm VAT.",
    },
];
