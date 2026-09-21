/**
 * Nguồn dữ liệu DUY NHẤT cho trang /bao-hiem-tai-nan-24-24.
 *
 * Sửa phí, chiết khấu, thời gian cam kết, thông tin chuyên gia ở đây —
 * không sửa trong component.
 *
 * Quy ước: giá trị chưa được xác nhận bằng văn bản chính thức thì để `null`
 * trong `FACTS`. Trang tự bỏ mệnh đề hoặc ẩn khối liên quan thay vì in chỗ
 * trống ra cho khách đọc — xem chú thích của `FACTS` ngay bên dưới.
 */
/* ------------------------------------------------------------------ */
/* 1. SỐ LIỆU CHỜ XÁC NHẬN — điền vào là nội dung tự hiện lại            */
/* ------------------------------------------------------------------ */
/**
 * Số liệu chưa được xác nhận bằng văn bản chính thức thì để `null`.
 *
 * Khi còn `null`, trang KHÔNG in dấu ngoặc kép ra màn hình mà tự bỏ mệnh đề
 * hoặc ẩn hẳn khối liên quan — khách không thấy chỗ trống, và không ai vô tình
 * publish một con số chưa kiểm chứng. Điền chuỗi vào là nội dung tự hiện lại,
 * không phải sửa component nào.
 *
 * Ví dụ khi có số liệu:
 *   minLiability: "100 triệu đồng/người",
 *   claimTurnaround: "15 ngày làm việc",
 *   certificateTurnaround: "trong ngày làm việc",
 *   medicalExpenseCap: "30%",
 */
export const FACTS = {
    minLiability: null,
    // Đã xác nhận: Bảo hiểm PVI Thành Đô giữ được 15 ngày bồi thường và cấp GCN trong ngày.
    claimTurnaround: "15 ngày",
    certificateTurnaround: "trong ngày làm việc",
    medicalExpenseCap: null,
    messengerLink: null,
    expertName: null,
    expertRole: null,
    expertYears: null,
};
/** Đường dẫn file mẫu danh sách người được bảo hiểm (.xlsx) trong `public/`. */
export const INSURED_LIST_TEMPLATE_HREF = null;
/**
 * Mức trách nhiệm tối thiểu theo NĐ 220/2026/NĐ-CP, đơn vị triệu đồng.
 * Để `null` cho tới khi đọc nguyên văn điều khoản và chốt được con số.
 * Khi còn `null`, công cụ tính phí hiển thị cảnh báo trung tính cho nhà thầu
 * thay vì so sánh với một con số chưa kiểm chứng.
 */
export const MINIMUM_LIABILITY_MILLIONS = null;
/* ------------------------------------------------------------------ */
/* 2. KÊNH LIÊN HỆ — dùng lại hằng số đang có trên toàn site           */
/* ------------------------------------------------------------------ */
export const ZALO_URL = "https://zalo.me/2076363329232219188?src=qr&f=1";
/** Mã QR Zalo chính thức, dùng chung với footer trang chủ. */
export const ZALO_QR_SRC = "/zalo-pvi-thanh-do-qr.png";
export const CUSTOMER_CARE_PHONE = "0938 072 236";
export const CUSTOMER_CARE_TEL = "tel:0938072236";
/** Tổng đài bồi thường — CHỈ dùng khi có sự cố, không dùng cho tư vấn/bán hàng. */
export const CLAIMS_HOTLINE = "1900 54 54 58";
export const CLAIMS_TEL = "tel:1900545458";
export const contactChannels = [
    {
        id: "cskh",
        label: "Tư vấn & báo giá",
        value: CUSTOMER_CARE_PHONE,
        href: CUSTOMER_CARE_TEL,
        when: "Khi cần một mức phí có căn cứ cho danh sách cụ thể, hoặc cần hoá đơn VAT xuất theo tên công ty.",
        external: false,
    },
    {
        id: "zalo",
        label: "Zalo — kênh nhanh nhất",
        value: "Nhắn Zalo chính thức",
        href: ZALO_URL,
        when: "Khi cần gửi danh sách công nhân, ảnh CCCD, hoặc cần giấy chứng nhận gấp để kịp nộp hồ sơ thầu.",
        external: true,
    },
    {
        id: "messenger",
        label: "Messenger",
        value: "Nhắn qua Facebook",
        href: FACTS.messengerLink,
        when: "Khi anh/chị quen làm việc trên Facebook và muốn giữ lại lịch sử trao đổi ở đó.",
        external: true,
    },
    {
        id: "claims",
        label: "Trung tâm bồi thường 24/7",
        value: CLAIMS_HOTLINE,
        href: CLAIMS_TEL,
        when: "Khi tai nạn vừa xảy ra. Gọi trước khi làm bất cứ thủ tục nào, kể cả trước khi chuyển viện.",
        external: false,
    },
    // Kênh chưa có đường dẫn thì không hiển thị, tránh để một ô chết trên trang.
].filter((channel) => channel.href !== null);
/**
 * Phí gốc tham chiếu, thời hạn 1 năm, đang công bố trong chuyên mục Kiến thức
 * của site (`app/kien-thuc/bao-hiem-tai-nan-24-24`).
 * KHÔNG phải báo phí chính thức: phí thật phụ thuộc thẩm định nhóm nghề.
 */
export const accidentPlans = [
    { id: "20", sum: 20, label: "20 triệu", basePremium: 50000 },
    { id: "50", sum: 50, label: "50 triệu", basePremium: 125000 },
    { id: "100", sum: 100, label: "100 triệu", basePremium: 250000 },
    { id: "150", sum: 150, label: "150 triệu", basePremium: 375000 },
    { id: "200", sum: 200, label: "200 triệu", basePremium: 500000 },
];
/** Biểu tỷ lệ giảm phí theo quy mô nhóm, áp dụng từ 01/01/2026. */
export const groupTiers = [
    { id: "bac-0", label: "1 – 19 người", shortLabel: "1–19", min: 1, max: 19, discount: 0 },
    { id: "bac-1", label: "20 – 100 người", shortLabel: "20–100", min: 20, max: 100, discount: 0.2 },
    { id: "bac-2", label: "101 – 300 người", shortLabel: "101–300", min: 101, max: 300, discount: 0.35 },
    { id: "bac-3", label: "301 – 500 người", shortLabel: "301–500", min: 301, max: 500, discount: 0.5 },
    { id: "bac-4", label: "Từ 501 người trở lên", shortLabel: "501+", min: 501, max: null, discount: 0.55 },
];
export const DISCOUNT_EFFECTIVE_FROM = "01/01/2026";
/** Mức giảm cao nhất của biểu, dùng trong các nhãn kêu gọi hành động. */
export const MAX_DISCOUNT_LABEL = `${Math.round(Math.max(...groupTiers.map((tier) => tier.discount)) * 100)}%`;
export const FEE_SOURCE = {
    label: "Phí gốc tham chiếu công bố trên chuyên mục Kiến thức của site",
    note: `Thời hạn 1 năm. Tỷ lệ giảm phí theo quy mô nhóm áp dụng từ ${DISCOUNT_EFFECTIVE_FROM}. Chưa gồm thẩm định nhóm nghề — báo phí chính thức do nhân viên PVI phát hành.`,
    href: "/kien-thuc/bao-hiem-tai-nan-24-24",
};
export const occupationGroups = [
    { id: "nhom-1", label: "Nhóm 1 — Lao động văn phòng, gián tiếp", factor: null },
    { id: "nhom-2", label: "Nhóm 2 — Lao động phổ thông, sản xuất nhẹ", factor: null },
    { id: "nhom-3", label: "Nhóm 3 — Thi công xây dựng, làm việc trên cao", factor: null },
    { id: "nhom-4", label: "Nhóm 4 — Nghề đặc thù, cần thẩm định riêng", factor: null },
];
export const audienceKinds = [
    { id: "nha-thau", label: "Nhà thầu xây dựng", contractor: true },
    { id: "nhom-dn", label: "Nhóm / Doanh nghiệp", contractor: false },
    { id: "truong-hoc", label: "Trường học", contractor: false },
    { id: "ca-nhan", label: "Cá nhân", contractor: false },
];
export const audienceCards = [
    {
        id: "nha-thau",
        audienceId: "nha-thau",
        flag: "BẮT BUỘC",
        required: true,
        eyebrow: "NHÀ THẦU · CÔNG TRƯỜNG",
        title: "Người lao động<br />thi công",
        summary: "Bảo hiểm bắt buộc theo Nghị định 220/2026/NĐ-CP. Cần giấy chứng nhận đúng tên gói thầu và hoá đơn VAT.",
        planId: "20",
        tierIndex: 2,
        priceNote: "/ người / năm · gói 20 triệu · từ 101 người, giảm 35%",
        suggestedHeadcount: 120,
        image: "/accident-tier-nha-thau.webp",
        imageAlt: "Năm công nhân đội mũ bảo hộ họp nhanh trước công trình đang xây, chỉ huy trưởng chỉ vào máy tính bảng",
    },
    {
        id: "doanh-nghiep",
        audienceId: "nhom-dn",
        flag: "PHÚC LỢI",
        required: false,
        eyebrow: "DOANH NGHIỆP · TRƯỜNG HỌC",
        title: "Nhóm nhân sự<br />và học sinh",
        summary: "Mua theo năm tài chính hoặc trước năm học. Thay người trong danh sách bằng phụ lục, không phải làm lại hợp đồng.",
        planId: "20",
        tierIndex: 1,
        priceNote: "/ người / năm · gói 20 triệu · 20–100 người, giảm 20%",
        suggestedHeadcount: 50,
        image: "/accident-tier-doanh-nghiep.webp",
        imageAlt: "Nhóm nhân sự văn phòng họp quanh bàn làm việc với laptop, một quản lý đứng hướng dẫn",
    },
    {
        id: "ca-nhan",
        audienceId: "ca-nhan",
        flag: "TỰ NGUYỆN",
        required: false,
        eyebrow: "CÁ NHÂN · LAO ĐỘNG TỰ DO",
        title: "Một người,<br />24 giờ mỗi ngày",
        summary: "Không cần hợp đồng lao động, không cần đang đóng BHXH. Có tên trong danh sách là được bảo hiểm.",
        planId: "20",
        tierIndex: 0,
        priceNote: "/ người / năm · gói 20 triệu · 1 người, phí gốc",
        suggestedHeadcount: 1,
        image: "/accident-tier-ca-nhan.webp",
        imageAlt: "Người giao hàng mặc áo khoác xanh đội mũ bảo hiểm chạy xe máy trên đường phố lúc hoàng hôn",
    },
];
export const trustPoints = [
    "Bồi thường tai nạn 24/24h, trong và ngoài giờ làm",
    "Căn cứ Nghị định 220/2026/NĐ-CP, hiệu lực 01/7/2026",
    "Phí tham chiếu công khai, không thay thế thẩm định nhóm nghề",
];
/**
 * Tỷ lệ phí ngắn hạn — % của phí năm theo số tháng bảo hiểm.
 * Nguồn: biểu phí PVI, mục 4.2 "Áp dụng giảm phí so với phí chuẩn,
 * tính phí cụ thể theo từng GCN".
 */
export const shortTermRates = [
    { months: 1, rate: 0.2 },
    { months: 2, rate: 0.3 },
    { months: 3, rate: 0.4 },
    { months: 4, rate: 0.5 },
    { months: 5, rate: 0.6 },
    { months: 6, rate: 0.7 },
    { months: 7, rate: 0.75 },
    { months: 8, rate: 0.8 },
    { months: 9, rate: 0.85 },
    { months: 10, rate: 0.9 },
    { months: 11, rate: 0.95 },
    { months: 12, rate: 1 },
];
export function shortTermRate(months) {
    return shortTermRates.find((item) => item.months === months)?.rate ?? 1;
}
export const termOptions = shortTermRates
    .map((item) => ({ id: String(item.months), label: `${item.months} tháng`, months: item.months }))
    .reverse();
export function tierIndexForHeadcount(headcount) {
    const index = groupTiers.findIndex((tier) => headcount >= tier.min && (tier.max === null || headcount <= tier.max));
    return index === -1 ? 0 : index;
}
export function formatVnd(amount) {
    return `${Math.round(amount).toLocaleString("vi-VN")} đ`;
}
/**
 * Phí/người cho cả thời hạn: phí gốc năm × (1 − chiết khấu nhóm) × tỷ lệ ngắn hạn.
 * Mặc định 12 tháng thì tỷ lệ ngắn hạn bằng 1, kết quả là phí/người/năm.
 */
export function premiumFor(plan, tierIndex, months = 12) {
    const tier = groupTiers[tierIndex] ?? groupTiers[0];
    return Math.round(plan.basePremium * (1 - tier.discount) * shortTermRate(months));
}
export function discountPercent(tierIndex) {
    const tier = groupTiers[tierIndex] ?? groupTiers[0];
    return Math.round(tier.discount * 100);
}
/* ------------------------------------------------------------------ */
/* 4. CĂN CỨ PHÁP LÝ                                                   */
/* ------------------------------------------------------------------ */
export const legalReference = {
    current: "Nghị định 220/2026/NĐ-CP",
    effective: "Hiệu lực 01/7/2026",
    replaces: "Thay thế Nghị định 67/2023/NĐ-CP",
    href: "https://vanban.chinhphu.vn/?docid=218555&pageid=27160",
};
/* ------------------------------------------------------------------ */
/* 5. NGƯỜI MUA                                                        */
/* ------------------------------------------------------------------ */
export const audiences = [
    { code: "P1", title: "Nhà thầu, chỉ huy trưởng công trường", need: "Cần giấy chứng nhận đứng tên đúng gói thầu, có ngay để kịp nộp hồ sơ, kèm hoá đơn VAT xuất theo tên công ty." },
    { code: "P2", title: "HR / hành chính doanh nghiệp", need: "Mua theo năm tài chính, cần một danh sách chuẩn để đưa vào chi phí và giải trình được với ban giám đốc." },
    { code: "P3", title: "Chủ xưởng sản xuất nhỏ", need: "Vài chục lao động, ca kíp đổi liên tục, cần thay người trong danh sách mà không phải làm lại hợp đồng." },
    { code: "P4", title: "Trường học", need: "Mua tập trung trước năm học, danh sách theo lớp, cần biên lai và giấy chứng nhận để thông báo với phụ huynh." },
    { code: "P5", title: "Cá nhân, shipper, lao động tự do", need: "Một người, đi đường nhiều, muốn biết phí một năm là bao nhiêu trước khi quyết định." },
];
export const benefitRows = [
    {
        group: "Tử vong, mất tích hoặc thương tật toàn bộ vĩnh viễn do tai nạn",
        basis: "Kết luận của cơ quan có thẩm quyền hoặc kết luận y khoa",
        payout: "100% số tiền bảo hiểm",
    },
    {
        group: "Thương tật bộ phận vĩnh viễn",
        basis: "Bảng tỷ lệ trả tiền bảo hiểm thương tật kèm theo quy tắc",
        payout: "Tỷ lệ thương tật × số tiền bảo hiểm",
    },
    {
        group: "Thương tật bộ phận tạm thời (điều trị, phục hồi)",
        basis: "Chi phí y tế thực tế, cần thiết và hợp lý theo chứng từ gốc",
        payout: FACTS.medicalExpenseCap
            ? `Theo chi phí thực tế, tối đa ${FACTS.medicalExpenseCap} số tiền bảo hiểm`
            : "Theo chi phí y tế thực tế, trong giới hạn quyền lợi ghi trên hợp đồng",
    },
    {
        group: "Tử vong trong vòng 365 ngày kể từ ngày xảy ra tai nạn",
        basis: "Tử vong là hậu quả trực tiếp của tai nạn đã thuộc phạm vi bảo hiểm",
        payout: "100% số tiền bảo hiểm, trừ số tiền đã chi trả cho chính tai nạn đó",
    },
];
export const claimScenarios = [
    {
        id: "cong-truong",
        title: "Ngã giàn giáo tại công trường, trong giờ làm việc",
        context: "Công nhân tham gia gói 100 triệu. Ngã từ giàn giáo tầng 2, gãy xương cẳng chân, điều trị nội trú rồi phục hồi chức năng. Giám định kết luận thương tật bộ phận vĩnh viễn 12%.",
        steps: [
            { label: "Số tiền bảo hiểm", value: "100.000.000 đ" },
            { label: "Tỷ lệ thương tật theo bảng tỷ lệ", value: "12%" },
            { label: "Phép tính", value: "100.000.000 × 12%" },
        ],
        result: "12.000.000 đ",
        note: "Chi phí y tế trong thời gian điều trị được xét riêng theo chứng từ, trong giới hạn quyền lợi chi phí y tế. Tỷ lệ 12% ở đây là con số minh hoạ cho cách tính — tỷ lệ thật do giám định y khoa kết luận.",
    },
    {
        id: "ngoai-gio",
        title: "Tai nạn giao thông lúc 21 giờ, trên đường về nhà",
        context: "Cùng công nhân đó, cùng gói 100 triệu. Ngã xe máy trên đường về sau giờ làm, không đi công tác, không có nồng độ cồn vượt mức cho phép. Chấn thương nặng, tử vong sau 9 ngày điều trị.",
        steps: [
            { label: "Số tiền bảo hiểm", value: "100.000.000 đ" },
            { label: "Tử vong do tai nạn, trong vòng 365 ngày", value: "100% số tiền bảo hiểm" },
            { label: "Phép tính", value: "100.000.000 × 100%" },
        ],
        result: "100.000.000 đ",
        note: "Đây là điểm khác biệt của phạm vi 24/24: tai nạn ngoài giờ làm, ngoài công trường vẫn thuộc phạm vi. Chế độ tai nạn lao động — bệnh nghề nghiệp của BHXH thì không, vì gắn với quá trình lao động.",
    },
];
export const exclusions = [
    "Hành vi cố ý của người được bảo hiểm hoặc người thụ hưởng, bao gồm tự gây thương tích và tự tử.",
    "Vi phạm pháp luật, đánh nhau, trừ trường hợp được xác định là tự vệ chính đáng.",
    "Điều khiển phương tiện khi trong máu hoặc hơi thở có nồng độ cồn vượt mức cho phép, hoặc có ma tuý, chất kích thích bị cấm.",
    "Điều khiển phương tiện mà không có giấy phép lái xe hợp lệ với loại xe đang điều khiển.",
    "Bệnh tật, đột quỵ, nhồi máu, biến chứng thai sản — nghĩa là mọi nguyên nhân không phải tai nạn.",
    "Chiến tranh, khủng bố, bạo động, nhiễm phóng xạ, phản ứng hạt nhân.",
    "Tham gia hoạt động thể thao chuyên nghiệp hoặc hoạt động nguy hiểm không khai báo và không được chấp thuận.",
    "Người được bảo hiểm làm công việc thuộc nhóm nghề khác với nhóm nghề đã kê khai khi tham gia.",
    "Các trường hợp loại trừ khác nêu trong quy tắc và điều khoản của hợp đồng đã phát hành.",
];
export const comparisonRows = [
    { aspect: "Ai được bảo vệ", social: "Người lao động có giao kết hợp đồng lao động và tham gia BHXH bắt buộc", accident: "Bất kỳ ai có tên trong danh sách người được bảo hiểm, kể cả lao động thời vụ" },
    { aspect: "Phạm vi thời gian", social: "Trong giờ làm, tại nơi làm việc, hoặc trên tuyến đường đi và về hợp lý", accident: "24 giờ mỗi ngày, trong và ngoài giờ làm, suốt thời hạn hợp đồng" },
    { aspect: "Nguyên nhân được xét", social: "Gắn với quá trình lao động và bệnh nghề nghiệp trong danh mục", accident: "Mọi tai nạn thuộc phạm vi, không phụ thuộc việc đang làm việc hay không" },
    { aspect: "Cách chi trả", social: "Trợ cấp một lần hoặc hằng tháng theo tỷ lệ suy giảm khả năng lao động", accident: "Chi trả một lần theo số tiền bảo hiểm và tỷ lệ thương tật" },
    { aspect: "Quan hệ giữa hai loại", social: "Nghĩa vụ bắt buộc theo pháp luật lao động", accident: "Lớp bảo vệ bổ sung, chi trả độc lập, không trừ vào quyền lợi BHXH" },
    { aspect: "Vai trò trong hồ sơ thầu", social: "Không dùng để chứng minh bảo hiểm bắt buộc cho người lao động thi công trên công trường", accident: "Giấy chứng nhận là tài liệu được yêu cầu theo quy định về bảo hiểm bắt buộc trong đầu tư xây dựng" },
];
/* ------------------------------------------------------------------ */
/* 8. QUY TRÌNH                                                        */
/* ------------------------------------------------------------------ */
export const buySteps = [
    { title: "Gửi danh sách", text: "Họ tên, ngày sinh, số CCCD và nhóm nghề của từng người. Gửi file Excel hoặc chụp gửi Zalo đều được." },
    { title: "Nhận báo phí và soát tên", text: "Nhân viên kiểm tra nhóm nghề, gửi lại mức phí chính thức và bản nháp giấy chứng nhận để anh/chị soát tên trước." },
    {
        title: "Thanh toán và nhận giấy chứng nhận",
        text: FACTS.certificateTurnaround
            ? `Sau khi thanh toán, giấy chứng nhận và hoá đơn VAT được phát hành trong ${FACTS.certificateTurnaround}.`
            : "Sau khi thanh toán, nhân viên phát hành giấy chứng nhận và hoá đơn VAT, báo lại mốc thời gian cụ thể theo hồ sơ.",
    },
];
export const claimDocuments = [
    "Giấy yêu cầu trả tiền bảo hiểm theo mẫu, có xác nhận của đơn vị tham gia",
    "Giấy chứng nhận bảo hiểm hoặc số hợp đồng",
    "CCCD của người được bảo hiểm và của người nhận tiền",
    "Biên bản tai nạn có xác nhận của đơn vị; biên bản tai nạn giao thông của công an nếu có",
    "Chứng từ y tế: giấy ra viện, bệnh án, phim và kết quả chẩn đoán hình ảnh, đơn thuốc, hoá đơn gốc",
    "Biên bản giám định tỷ lệ thương tật, nếu là thương tật vĩnh viễn",
    "Giấy chứng tử và giấy tờ thừa kế hợp pháp, nếu là quyền lợi tử vong",
];
export const claimSteps = [
    { title: "Báo ngay khi tai nạn xảy ra", text: `Gọi ${CLAIMS_HOTLINE} hoặc nhắn Zalo trước khi làm thủ tục, để được hướng dẫn giữ đúng chứng từ ngay từ đầu.` },
    { title: "Lập biên bản tại đơn vị", text: "Ghi rõ thời gian, địa điểm, diễn biến và người chứng kiến. Đây là tài liệu hay bị thiếu nhất khi hồ sơ nộp muộn." },
    { title: "Tập hợp chứng từ y tế", text: "Giữ bản gốc giấy ra viện và hoá đơn. Thiếu hoá đơn gốc là lý do phổ biến khiến hồ sơ bị kéo dài." },
    {
        title: "Nộp hồ sơ và nhận tiền",
        text: FACTS.claimTurnaround
            ? `Hồ sơ đầy đủ và hợp lệ được giải quyết trong ${FACTS.claimTurnaround}.`
            : "Hồ sơ đầy đủ và hợp lệ được giải quyết theo thời hạn quy định trong hợp đồng đã phát hành.",
    },
];
/* ------------------------------------------------------------------ */
/* 9. FAQ                                                              */
/* ------------------------------------------------------------------ */
export const faqs = [
    {
        question: "Bảo hiểm tai nạn 24/24 là gì?",
        answer: "Là hợp đồng bảo hiểm con người chi trả một khoản tiền khi người được bảo hiểm bị thương tật hoặc tử vong do tai nạn, trong 24 giờ mỗi ngày và suốt thời hạn hợp đồng. Không phân biệt tai nạn xảy ra trong hay ngoài giờ làm việc, tại nơi làm việc hay ở nhà. Số tiền chi trả xác định theo số tiền bảo hiểm đã chọn và tỷ lệ thương tật, không phụ thuộc chi phí điều trị thực tế, trừ phần quyền lợi chi phí y tế.",
    },
    {
        question: "Bảo hiểm tai nạn 24/24 khác gì bảo hiểm tai nạn lao động?",
        answer: "Khác ở phạm vi thời gian và nguyên nhân. Chế độ tai nạn lao động — bệnh nghề nghiệp thuộc BHXH bắt buộc, gắn với quá trình lao động. Bảo hiểm tai nạn 24/24 là bảo hiểm thương mại, bảo vệ cả tai nạn ngoài giờ làm và ngoài nơi làm việc. Hai loại chi trả độc lập, không loại trừ nhau.",
    },
    {
        question: "Đã đóng BHXH và bảo hiểm TNLĐ-BNN rồi có cần mua bảo hiểm tai nạn 24/24 không?",
        answer: "Cần, nếu công trường thuộc diện phải mua bảo hiểm bắt buộc cho người lao động thi công. Đây là hai nghĩa vụ khác nhau: BHXH là nghĩa vụ theo pháp luật lao động, còn bảo hiểm cho người lao động thi công trên công trường là nghĩa vụ theo pháp luật về đầu tư xây dựng. Giấy tờ BHXH không thay thế được giấy chứng nhận bảo hiểm khi thẩm định hồ sơ thầu.",
    },
    {
        question: "Mức bảo hiểm tối thiểu cho người lao động thi công trên công trường là bao nhiêu?",
        answer: FACTS.minLiability
            ? `Mức trách nhiệm tối thiểu là ${FACTS.minLiability} theo Nghị định 220/2026/NĐ-CP, hiệu lực từ 01/7/2026. Trước khi chốt gói, hãy đối chiếu thêm với yêu cầu ghi trong hồ sơ mời thầu của dự án — nhiều chủ đầu tư đặt mức cao hơn mức tối thiểu.`
            : "Mức trách nhiệm tối thiểu áp dụng theo Nghị định 220/2026/NĐ-CP, hiệu lực từ 01/7/2026. Trang này không in con số vì mức tối thiểu phải đối chiếu đúng nguyên văn điều khoản áp dụng cho từng loại công trình — gọi 0938 072 236 hoặc gửi hồ sơ mời thầu qua Zalo, nhân viên đối chiếu giúp. Lưu ý nhiều chủ đầu tư đặt mức cao hơn mức tối thiểu của Nghị định.",
    },
    {
        question: "Thông tư 329/2016 còn hiệu lực không?",
        answer: "Không. Thông tư 329/2016/TT-BTC đã được thay bởi Thông tư 50/2022/TT-BTC từ 01/10/2022; sau đó nội dung về bảo hiểm bắt buộc trong đầu tư xây dựng chuyển sang Nghị định 67/2023/NĐ-CP, và hiện nay là Nghị định 220/2026/NĐ-CP. Nếu một báo giá hoặc một trang web còn dẫn Thông tư 329/2016 hay Nghị định 119/2015 làm căn cứ mức trách nhiệm, đó là căn cứ đã hết hiệu lực.",
    },
    {
        question: "Từ 1/7/2026 công trình nào bắt buộc phải mua bảo hiểm?",
        answer: "Phạm vi công trình và đối tượng bắt buộc áp dụng theo Nghị định 220/2026/NĐ-CP, hiệu lực từ 01/7/2026, thay thế Nghị định 67/2023/NĐ-CP. Với nhà thầu thi công, phần liên quan trực tiếp là bảo hiểm cho người lao động thi công trên công trường. Hãy đối chiếu loại công trình và giá trị hợp đồng của dự án với văn bản, hoặc gửi hồ sơ mời thầu để nhân viên đọc giúp.",
    },
    {
        question: "Phí bảo hiểm tai nạn 24/24 mức 100 triệu là bao nhiêu một người một năm?",
        answer: "Phí gốc gói 100 triệu là 250.000 đ/người/năm. Từ 20 người trở lên có giảm phí theo quy mô nhóm: giảm 20% với nhóm 20–100 người, 35% với 101–300 người, 50% với 301–500 người và 55% từ 501 người trở lên, áp dụng từ 01/01/2026. Nghĩa là gói 100 triệu chỉ còn 200.000 đ/người/năm khi mua cho 20 người, và 112.500 đ khi mua cho từ 501 người. Đây là phí tham chiếu, chưa gồm thẩm định nhóm nghề.",
    },
    {
        question: "Mua bảo hiểm tai nạn cho 50 công nhân hết bao nhiêu tiền?",
        answer: "50 người thuộc bậc 20–100 người, được giảm 20%. Với gói 100 triệu, phí còn 200.000 đ/người/năm, tổng 10.000.000 đ cho một năm. Dùng công cụ tính phí trên trang để đổi gói và số người, kết quả hiện ngay. Con số cuối cùng vẫn cần báo phí chính thức sau khi xem nhóm nghề.",
    },
    {
        question: "Mua cho bao nhiêu người thì được giảm phí, giảm nhiều nhất bao nhiêu?",
        answer: "Từ 20 người trở lên là có giảm. Biểu tỷ lệ giảm phí áp dụng từ 01/01/2026: nhóm 20–100 người giảm 20%, nhóm 101–300 người giảm 35%, nhóm 301–500 người giảm 50%, và từ 501 người trở lên giảm 55% — đây là mức cao nhất. Tỷ lệ tính trên phí gốc của gói mức trách nhiệm đã chọn, không cộng dồn với chương trình khác.",
    },
    {
        question: "Công nhân trượt chân ngã ở công trường có được bồi thường không?",
        answer: "Có, nếu đó là tai nạn — tác động bất ngờ từ bên ngoài, không phải do bệnh lý — và người đó có tên trong danh sách người được bảo hiểm tại thời điểm xảy ra. Mức chi trả tính theo tỷ lệ thương tật do giám định y khoa kết luận, nhân với số tiền bảo hiểm. Xem hai ví dụ tính bằng số ở phần trên trang.",
    },
    {
        question: "Tai nạn ngoài giờ làm việc, đi nhậu về ngã xe có được bồi thường không?",
        answer: "Ngoài giờ làm việc thì vẫn thuộc phạm vi 24/24. Nhưng nếu người điều khiển phương tiện có nồng độ cồn vượt mức cho phép, hoặc có ma tuý và chất kích thích bị cấm, thì rơi vào điều khoản loại trừ và không được chi trả. Đây là loại trừ được áp dụng nghiêm, không có ngoại lệ theo cảm tính.",
    },
    {
        question: "Những trường hợp nào bị từ chối bồi thường?",
        answer: "Các nhóm chính: hành vi cố ý và tự gây thương tích; vi phạm pháp luật; điều khiển phương tiện khi có nồng độ cồn vượt mức cho phép hoặc không có giấy phép lái xe hợp lệ; nguyên nhân là bệnh tật chứ không phải tai nạn; chiến tranh và khủng bố; và trường hợp người được bảo hiểm làm công việc thuộc nhóm nghề khác với nhóm nghề đã kê khai. Danh sách đầy đủ ở mục Điều khoản loại trừ trên trang này.",
    },
    {
        question: "Công nhân nghỉ việc có thay người khác vào danh sách được không?",
        answer: "Được. Danh sách người được bảo hiểm có thể điều chỉnh trong thời hạn hợp đồng bằng phụ lục, theo nguyên tắc thay tên và giữ nguyên số lượng. Gửi danh sách người ra và người vào qua Zalo, nhân viên làm phụ lục. Người mới chỉ được bảo hiểm kể từ thời điểm phụ lục có hiệu lực, không hồi tố.",
    },
    {
        question: "Hồ sơ bồi thường gồm giấy tờ gì, bao lâu nhận được tiền?",
        answer: `Hồ sơ gồm giấy yêu cầu trả tiền bảo hiểm, giấy chứng nhận bảo hiểm, CCCD, biên bản tai nạn có xác nhận của đơn vị, chứng từ y tế bản gốc, và biên bản giám định thương tật hoặc giấy chứng tử tuỳ quyền lợi. ${FACTS.claimTurnaround
            ? `Hồ sơ đầy đủ và hợp lệ được giải quyết trong ${FACTS.claimTurnaround}.`
            : "Hồ sơ đầy đủ và hợp lệ được giải quyết theo thời hạn quy định trong hợp đồng đã phát hành; nhân viên báo mốc cụ thể ngay khi tiếp nhận hồ sơ."} Danh mục đầy đủ ở mục Quy trình bồi thường.`,
    },
    {
        question: "Có xuất hóa đơn VAT không? Cấp giấy chứng nhận trong bao lâu?",
        answer: `Có hoá đơn VAT xuất theo tên và mã số thuế của công ty, dùng để hạch toán chi phí. ${FACTS.certificateTurnaround
            ? `Giấy chứng nhận bảo hiểm được cấp trong ${FACTS.certificateTurnaround} kể từ khi có đủ danh sách và hoàn tất thanh toán.`
            : "Giấy chứng nhận bảo hiểm được cấp sau khi có đủ danh sách người được bảo hiểm và hoàn tất thanh toán; cần gấp để nộp thầu thì báo trước, nhân viên sắp xếp ưu tiên."}`,
    },
    {
        question: "Mua cho công nhân thời vụ, không có hợp đồng lao động được không?",
        answer: "Được. Bảo hiểm tai nạn 24/24 bảo vệ theo danh sách người được bảo hiểm, không yêu cầu người đó phải có hợp đồng lao động hay đang tham gia BHXH. Đó là lý do sản phẩm này phù hợp với công trường dùng nhiều lao động thời vụ, nơi BHXH không phủ hết.",
    },
];
/* ------------------------------------------------------------------ */
/* 10. CHUYÊN GIA PHỤ TRÁCH, TÀI LIỆU, LIÊN KẾT                        */
/* ------------------------------------------------------------------ */
export const expert = {
    name: FACTS.expertName,
    role: FACTS.expertRole,
    years: FACTS.expertYears,
    scope: "Phụ trách nhóm bảo hiểm con người và hồ sơ bảo hiểm bắt buộc trong đầu tư xây dựng tại Bảo hiểm PVI Thành Đô.",
};
export const documents = [
    { type: "Văn bản pháp lý · Chính phủ", title: "Nghị định 220/2026/NĐ-CP", href: legalReference.href },
    { type: "Sản phẩm · Bảo hiểm PVI", title: "Bảo hiểm tai nạn con người", href: "https://www.pvi.com.vn/vi/products/personal/personal-accident" },
    { type: "Hướng dẫn · PVI Digital", title: "Hướng dẫn yêu cầu bồi thường", href: "https://online.pvi.com.vn/huong-dan-boi-thuong" },
];
export const relatedProducts = [
    { title: "Bảo hiểm công trình & lắp đặt", text: "Bảo vệ chính hạng mục thi công và trách nhiệm với bên thứ ba của dự án.", href: "/bao-hiem-xay-dung-lap-dat" },
    { title: "Bảo hiểm chăm sóc sức khỏe", text: "Lớp bảo vệ cho ốm đau và bệnh tật — phần mà bảo hiểm tai nạn không chi trả.", href: "/bao-hiem-cham-soc-suc-khoe" },
    { title: "Kiến thức: bảo hiểm tai nạn 24/24", text: "Bài phân tích quyền lợi, cách chọn mức bảo vệ và hồ sơ bồi thường.", href: "/kien-thuc/bao-hiem-tai-nan-24-24" },
];
export const LAST_UPDATED_LABEL = "Cập nhật tháng 8/2026";
export const LAST_UPDATED_ISO = "2026-08-29";
