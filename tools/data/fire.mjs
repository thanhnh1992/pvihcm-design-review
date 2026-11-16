// Bản chép nguyên văn app/bao-hiem-chay-no-bat-buoc/fire-data.ts của baohiempvi-vn (16/11/2026).
export const VAT_RATE = 0.1;
/** Số tiền bảo hiểm nhập theo đơn vị triệu đồng. */
export function premiumFromSum(sumInMillions, rate) {
    return (sumInMillions * rate) / 100;
}
export function formatMillions(amount) {
    if (amount === undefined || !Number.isFinite(amount))
        return "—";
    if (amount >= 1000) {
        return `${(Math.round((amount / 1000) * 100) / 100).toLocaleString("vi-VN")} tỷ đ`;
    }
    return `${(Math.round(amount * 100) / 100).toLocaleString("vi-VN")} triệu đ`;
}
export function formatRate(rate) {
    return `${String(rate).replace(".", ",")}%`;
}
/**
 * Tỷ lệ phí tối thiểu — Phụ lục VI, Nghị định 105/2025/NĐ-CP (hiệu lực 01/7/2025).
 * Đây là mức tối thiểu; phí chính thức do doanh nghiệp bảo hiểm và bên mua
 * thoả thuận không thấp hơn mức này, căn cứ mức độ rủi ro thực tế của cơ sở.
 */
export const fireFacilityGroups = [
    {
        id: "cong-cong",
        label: "Công trình công cộng",
        description: "Trụ sở, bệnh viện, chung cư và công trình phục vụ cộng đồng.",
        rows: [
            { id: "tru-so", label: "Trụ sở làm việc từ 3 tầng hoặc 500m² trở lên", rate: 0.05, band: "M" },
            { id: "benh-vien", label: "Bệnh viện", rate: 0.05, band: "M" },
            { id: "chung-cu-sprinkler", label: "Chung cư có hệ thống chữa cháy tự động", rate: 0.05, band: "M" },
            { id: "chung-cu-khong", label: "Chung cư không có hệ thống chữa cháy tự động", rate: 0.1, band: "M" },
        ],
    },
    {
        id: "thuong-mai",
        label: "Thương mại & lưu trú",
        description: "Khách sạn, trung tâm thương mại, siêu thị và chợ.",
        rows: [
            { id: "ks-sprinkler", label: "Khách sạn có hệ thống chữa cháy tự động", rate: 0.05, band: "M" },
            { id: "ks-khong", label: "Khách sạn không có hệ thống chữa cháy tự động", rate: 0.1, band: "M" },
            { id: "ttmt", label: "Trung tâm thương mại", rate: 0.06, band: "M" },
            { id: "sieu-thi", label: "Siêu thị", rate: 0.08, band: "M" },
            { id: "cho", label: "Chợ", rate: 0.5, band: "N" },
        ],
    },
    {
        id: "san-xuat",
        label: "Sản xuất & kho vận",
        description: "Nhà xưởng, dây chuyền sản xuất và kho hàng hoá.",
        rows: [
            { id: "cn-ab", label: "Cơ sở công nghiệp hạng nguy hiểm cháy A, B", rate: 0.2, band: "N" },
            { id: "det-may", label: "Cơ sở sản xuất dệt may", rate: 0.25, band: "N" },
            { id: "go", label: "Cơ sở sản xuất, chế biến gỗ", rate: 0.5, band: "N" },
            { id: "kho", label: "Kho hàng hoá", rate: 0.2, band: "N" },
        ],
    },
    {
        id: "nhien-lieu",
        label: "Xăng dầu & khí đốt",
        description: "Cửa hàng xăng dầu và cơ sở kinh doanh khí đốt.",
        rows: [
            { id: "xang-dau", label: "Cửa hàng kinh doanh xăng dầu", rate: 0.3, band: "N" },
            { id: "khi-dot", label: "Cơ sở kinh doanh khí đốt", rate: 0.3, band: "N" },
        ],
    },
];
/** Gợi ý số tiền bảo hiểm, đơn vị triệu đồng. */
export const sumPresets = [1000, 5000, 20000, 100000];
export const fireReference = {
    legalBasis: "Nghị định 67/2023 · 105/2025 · 347/2026 · Phụ lục VI",
    updated: "Biểu phí Phụ lục VI theo NĐ 105/2025 (hiệu lực 01/7/2025); NĐ 347/2026 (hiệu lực 15/9/2026) sửa đối tượng bảo hiểm, số tiền tối thiểu và cách áp loại hình cho cơ sở nhiều công trình",
    sourceUrl: "https://vanban.chinhphu.vn/?pageid=27160&docid=213702",
};
export const fireDeductibles = [
    { label: "Mức khấu trừ loại M", value: "Tối đa 1%", note: "số tiền bảo hiểm" },
    { label: "Mức khấu trừ loại N", value: "Tối đa 10%", note: "số tiền bảo hiểm" },
    { label: "Công thức tính phí", value: "STBH × Tỷ lệ phí", note: "chưa gồm VAT 10%" },
];
export const fireTiers = [
    {
        id: "bat-buoc",
        flag: "BẮT BUỘC",
        required: true,
        eyebrow: "NGHĨA VỤ PHÁP LÝ",
        title: "Cháy, nổ<br />bắt buộc",
        summary: "Áp dụng với cơ sở có nguy hiểm về cháy, nổ theo danh mục quy định.",
        pricePrefix: "Tỷ lệ phí từ",
        priceAmount: "0,05%",
        priceNote: "/năm trên số tiền bảo hiểm",
        image: "/fire-tier-bat-buoc.webp",
        imageAlt: "Nhà xưởng và kho hàng lúc chạng vạng, xe cứu hoả cùng trụ nước và tủ vòi chữa cháy phía trước",
    },
    {
        id: "rui-ro-dac-biet",
        flag: "TỰ NGUYỆN",
        required: false,
        eyebrow: "MỞ RỘNG THEO TÊN RỦI RO",
        title: "Cháy &amp; các<br />rủi ro đặc biệt",
        summary: "Thêm sét đánh, nổ, máy bay rơi, bạo động, động đất, giông bão, lũ.",
        pricePrefix: "Phạm vi",
        priceAmount: "8 nhóm",
        priceNote: "rủi ro được nêu tên",
        image: "/fire-tier-rui-ro-dac-biet.webp",
        imageAlt: "Nhà xưởng trong cơn giông, mưa lớn và tia sét đánh phía sau khu kho",
    },
    {
        id: "moi-rui-ro",
        flag: "TỰ NGUYỆN",
        required: false,
        eyebrow: "PHẠM VI RỘNG NHẤT",
        title: "Mọi rủi ro<br />tài sản",
        summary: "Bồi thường mọi tổn thất vật chất bất ngờ, trừ các loại trừ nêu trong quy tắc.",
        pricePrefix: "Cơ chế",
        priceAmount: "All risk",
        priceNote: "trừ loại trừ đã nêu",
        image: "/fire-tier-moi-rui-ro.webp",
        imageAlt: "Toàn cảnh khu nhà xưởng và kho vận được một vòm bảo vệ trong suốt bao trọn",
    },
];
export const fireFaqs = [
    {
        question: "Mọi doanh nghiệp đều bắt buộc phải mua?",
        answer: "Không. Chỉ cơ sở có nguy hiểm về cháy, nổ thuộc danh mục quy định mới bắt buộc tham gia. Loại hình và quy mô cơ sở cần được đối chiếu với danh mục trước khi kết luận.",
    },
    {
        question: "Phí bảo hiểm cháy nổ được tính thế nào?",
        answer: "Phí bằng số tiền bảo hiểm nhân tỷ lệ phí áp dụng cho loại hình cơ sở, chưa gồm VAT 10%. Tỷ lệ phí tối thiểu quy định tại Phụ lục VI Nghị định 105/2025/NĐ-CP; doanh nghiệp bảo hiểm và bên mua thoả thuận mức không thấp hơn mức tối thiểu này.",
    },
    {
        question: "Cháy nổ bắt buộc có bồi thường thiệt hại do bão lũ không?",
        answer: "Không. Phạm vi bắt buộc giới hạn ở rủi ro cháy và nổ. Giông bão, lũ, động đất thuộc nhóm rủi ro đặc biệt và chỉ được bảo hiểm khi cơ sở tham gia thêm Cháy và các rủi ro đặc biệt hoặc Mọi rủi ro tài sản.",
    },
    {
        question: 'Khác nhau giữa "rủi ro đặc biệt" và "mọi rủi ro tài sản"?',
        answer: "Cháy và rủi ro đặc biệt bảo hiểm theo danh sách rủi ro được nêu tên — ngoài danh sách thì không bồi thường. Mọi rủi ro tài sản làm ngược lại: bồi thường mọi tổn thất vật chất bất ngờ trừ những gì quy tắc loại trừ, nên phạm vi rộng hơn.",
    },
    {
        question: "Cần thông báo tổn thất trong bao lâu?",
        answer: "Thông báo ngay cho PVI và cơ quan phòng cháy chữa cháy khi xảy ra sự cố. Với cơ sở có nguy hiểm về cháy, nổ, cần gửi báo cáo bằng văn bản trong vòng 14 ngày kể từ ngày xảy ra tổn thất theo quy định hiện hành.",
    },
];
export const fireDocuments = [
    {
        title: "Nghị định 347/2026/NĐ-CP",
        type: "Văn bản pháp lý · Chính phủ · Hiệu lực 15/09/2026",
        href: "/bao-hiem-chay-no-bat-buoc/nghi-dinh-347-2026",
    },
    {
        title: "Nghị định 105/2025/NĐ-CP",
        type: "Văn bản pháp lý · Chính phủ · Hiệu lực 01/07/2025",
        href: "/bao-hiem-chay-no-bat-buoc/nghi-dinh-105-2025",
    },
    {
        title: "Bảo hiểm cháy nổ bắt buộc",
        type: "Sản phẩm · Bảo hiểm PVI",
        href: "https://www.pvi.com.vn/vi/products/business/compulsory-fire-and-explosion",
    },
    {
        title: "Cháy và các rủi ro đặc biệt",
        type: "Sản phẩm · Bảo hiểm PVI",
        href: "https://www.pvi.com.vn/vi/products/business/fire-and-special-perils",
    },
    {
        title: "Quy tắc bảo hiểm mọi rủi ro tài sản",
        type: "Quy tắc · Bảo hiểm PVI",
        href: "https://adminweb.pvi.com.vn/wp-content/uploads/2025/05/Quy-tac-bao-hiem-28.pdf",
    },
];
