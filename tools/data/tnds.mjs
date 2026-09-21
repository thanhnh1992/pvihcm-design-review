export const VAT_RATE = 0.1;
export function feeWithVat(baseFee) {
    return baseFee ? Math.round(baseFee * (1 + VAT_RATE)) : undefined;
}
export function formatVnd(amount) {
    if (!amount)
        return "Theo quy định";
    return `${new Intl.NumberFormat("vi-VN").format(amount)}đ`;
}
export const tndsVehicleClasses = [
    {
        id: "passenger",
        label: "Xe chở người",
        description: "Xe cá nhân, xe dịch vụ, pickup và minivan.",
        usages: [
            {
                id: "private",
                label: "Không kinh doanh vận tải",
                controlLabel: "Số chỗ / dòng xe",
                rows: [
                    { id: "private-under-6", label: "Dưới 6 chỗ", baseFee: 437000 },
                    { id: "private-6-11", label: "Từ 6 đến 11 chỗ", baseFee: 794000 },
                    { id: "private-12-24", label: "Từ 12 đến 24 chỗ", baseFee: 1270000 },
                    { id: "private-over-24", label: "Trên 24 chỗ", baseFee: 1825000 },
                    { id: "private-pickup", label: "Pickup, minivan chở người & hàng", baseFee: 437000 },
                ],
            },
            {
                id: "business",
                label: "Kinh doanh vận tải",
                controlLabel: "Số chỗ / dòng xe",
                rows: [
                    { id: "business-under-6", label: "Dưới 6 chỗ", baseFee: 756000 },
                    { id: "business-6", label: "6 chỗ", baseFee: 929000 },
                    { id: "business-7", label: "7 chỗ", baseFee: 1080000 },
                    { id: "business-8", label: "8 chỗ", baseFee: 1253000 },
                    { id: "business-9", label: "9 chỗ", baseFee: 1404000 },
                    { id: "business-10", label: "10 chỗ", baseFee: 1512000 },
                    { id: "business-11", label: "11 chỗ", baseFee: 1656000 },
                    { id: "business-12", label: "12 chỗ", baseFee: 1822000 },
                    { id: "business-13", label: "13 chỗ", baseFee: 2049000 },
                    { id: "business-14", label: "14 chỗ", baseFee: 2221000 },
                    { id: "business-15", label: "15 chỗ", baseFee: 2394000 },
                    { id: "business-16", label: "16 chỗ", baseFee: 3054000 },
                    { id: "business-17", label: "17 chỗ", baseFee: 2718000 },
                    { id: "business-18", label: "18 chỗ", baseFee: 2869000 },
                    { id: "business-19", label: "19 chỗ", baseFee: 3041000 },
                    { id: "business-20", label: "20 chỗ", baseFee: 3191000 },
                    { id: "business-21", label: "21 chỗ", baseFee: 3364000 },
                    { id: "business-22", label: "22 chỗ", baseFee: 3515000 },
                    { id: "business-23", label: "23 chỗ", baseFee: 3688000 },
                    { id: "business-24", label: "24 chỗ", baseFee: 4632000 },
                    { id: "business-25", label: "25 chỗ", baseFee: 4813000 },
                    { id: "business-over-25", label: "Trên 25 chỗ", note: "4.813.000đ + 30.000đ × (số chỗ − 25)" },
                    { id: "business-pickup", label: "Pickup, minivan chở người & hàng", baseFee: 933000 },
                ],
            },
        ],
    },
    {
        id: "cargo",
        label: "Xe tải",
        description: "Xe chở hàng phân theo trọng tải.",
        usages: [
            {
                id: "cargo-use",
                label: "Chở hàng",
                controlLabel: "Trọng tải",
                rows: [
                    { id: "cargo-under-3", label: "Dưới 3 tấn", baseFee: 853000 },
                    { id: "cargo-3-8", label: "Từ 3 đến 8 tấn", baseFee: 1660000 },
                    { id: "cargo-8-15", label: "Trên 8 đến 15 tấn", baseFee: 2746000 },
                    { id: "cargo-over-15", label: "Trên 15 tấn", baseFee: 3200000 },
                ],
            },
        ],
    },
    {
        id: "special",
        label: "Xe chuyên dùng",
        description: "Taxi, xe tập lái, xe đầu kéo và xe có tính chất hoạt động riêng.",
        usages: [
            {
                id: "special-use",
                label: "Theo tính chất hoạt động",
                controlLabel: "Loại xe",
                rows: [
                    { id: "special-training", label: "Xe tập lái", note: "Bằng 120% phí xe cùng chủng loại", derive: "passenger-seats", rate: 1.2 },
                    { id: "special-taxi", label: "Xe taxi", note: "Bằng 170% phí xe kinh doanh cùng số chỗ", derive: "business-seats", rate: 1.7 },
                    { id: "special-ambulance", label: "Xe cứu thương", baseFee: 1119600 },
                    { id: "special-money", label: "Xe chở tiền", baseFee: 524400 },
                    { id: "special-other", label: "Xe chuyên dùng khác", note: "Bằng 120% phí xe tải cùng trọng tải", derive: "truck-tonnage", rate: 1.2 },
                    { id: "special-tractor", label: "Xe đầu kéo rơ-moóc", baseFee: 4800000 },
                    { id: "special-machine", label: "Máy kéo, xe máy chuyên dùng", baseFee: 1023600 },
                    { id: "special-bus", label: "Xe buýt", note: "Bằng mức phí xe không kinh doanh cùng số chỗ" },
                ],
            },
        ],
    },
];
export const tndsReference = {
    legalBasis: "Nghị định 67/2023/NĐ-CP · Phụ lục I",
    vat: "Thuế GTGT 10%",
    updated: "Đối chiếu nguồn Bảo hiểm PVI · 08/05/2026",
    sourceUrl: "https://online.pvi.com.vn/kien-thuc/bao-hiem-o-to-bao-nhieu-tien",
    productUrl: "https://online.pvi.com.vn/san-pham/bao-hiem-bat-buoc-xe-o-to",
};
export const tndsLimits = [
    { label: "Thiệt hại về người", value: "150.000.000đ", note: "/ người / vụ" },
    { label: "Thiệt hại về tài sản", value: "100.000.000đ", note: "/ vụ" },
];
export const tndsFaqs = [
    {
        question: "Bảo hiểm TNDS bắt buộc ô tô là gì?",
        answer: "Đây là bảo hiểm trách nhiệm dân sự bắt buộc của chủ xe cơ giới, bảo vệ thiệt hại của bên thứ ba và hành khách trong phạm vi quy định; không thay thế bảo hiểm cho chính chiếc xe.",
    },
    {
        question: "Phí TNDS có bao gồm VAT không?",
        answer: "Biểu phí hiển thị tại đây tách phí cơ bản và VAT 10%, sau đó cho biết tổng phí tham khảo đã gồm VAT. Cần đối chiếu thông tin trên giấy chứng nhận trước khi phát hành.",
    },
    {
        question: "TNDS có bồi thường thiệt hại của chính xe không?",
        answer: "Không. Thiệt hại vật chất của chính xe là nhu cầu thuộc bảo hiểm vật chất xe tự nguyện và được tư vấn theo giá trị xe, lịch sử và điều khoản lựa chọn.",
    },
    {
        question: "Vì sao xe kinh doanh vận tải có mức phí khác?",
        answer: "Biểu phí phân loại theo mục đích sử dụng và số chỗ/trọng tải. Việc xác định đúng nhóm xe cần bám theo hồ sơ đăng ký và hoạt động thực tế.",
    },
];
export const tndsAssistantFacts = {
    definition: "TNDS bắt buộc bảo vệ trách nhiệm của chủ xe với bên thứ ba và hành khách, không bảo vệ thiệt hại vật chất của chính xe.",
    legalBasis: tndsReference.legalBasis,
    vat: tndsReference.vat,
    limits: tndsLimits,
    feeGroups: tndsVehicleClasses,
    faqs: tndsFaqs,
};
export const vehicleDamageFacts = {
    title: "Bảo hiểm vật chất xe",
    summary: "Bảo vệ chi phí sửa chữa hoặc thay thế cho chính xe khi rủi ro nằm trong phạm vi và điều khoản được xác nhận.",
    sourceUrl: "https://online.pvi.com.vn/kien-thuc/bao-hiem-o-to-bao-nhieu-tien",
    considerations: [
        "Giá trị thực tế, năm sản xuất và mục đích sử dụng xe.",
        "Phạm vi tai nạn, cháy nổ, thiên tai hoặc mất cắp theo phương án.",
        "Điều khoản bổ sung như thủy kích, gara chính hãng, không khấu hao hoặc mất cắp bộ phận.",
    ],
};
export const officialDocuments = [
    {
        title: "Danh sách gara, showroom liên kết toàn quốc",
        type: "Tra cứu · Bảo hiểm PVI",
        href: "/gara-lien-ket-pvi",
    },
    {
        title: "Sửa xe Mercedes-Benz bằng bảo hiểm PVI tại TP.HCM",
        type: "Tra cứu · Đại lý liên kết & thủ tục",
        href: "/bao-lanh-sua-chua-xe-mercedes-tphcm",
    },
    {
        title: "Quy tắc bảo hiểm tự nguyện xe ô tô",
        type: "Quy tắc · Bảo hiểm PVI · Hiệu lực 01/07/2025",
        href: "https://adminweb.pvi.com.vn/wp-content/uploads/2025/04/2025-QUY-TAC-BH-TU-NGUYEN-XE-O-TO.pdf",
    },
    {
        title: "Thông báo tai nạn & yêu cầu bồi thường xe ô tô",
        type: "Mẫu biểu · Bảo hiểm PVI · 28/08/2024",
        href: "https://gw.pvi.digital/public/contract/GYCBH-oto.pdf",
    },
    {
        title: "Nghị định 67/2023/NĐ-CP",
        type: "Văn bản pháp lý · Chính phủ · 06/09/2023",
        href: "https://vanban.chinhphu.vn/?classid=1&docid=208599&orggroupid=2&pageid=27160",
    },
    {
        title: "Nghị định 220/2026/NĐ-CP",
        type: "Cập nhật pháp lý · Chính phủ · Hiệu lực 01/07/2026",
        href: "https://vanban.chinhphu.vn/?docid=218555&pageid=27160",
    },
];
/** Chấp nhận cả "3,5" lẫn "3.5". Số tấn vô lý thì trả null. */
export function parseTonnage(value) {
    if (typeof value === "number")
        return Number.isFinite(value) && value > 0 && value <= 1000 ? value : null;
    if (typeof value !== "string")
        return null;
    const so = Number.parseFloat(value.trim().replace(",", "."));
    return Number.isFinite(so) && so > 0 && so <= 1000 ? so : null;
}
/**
 * Bậc xe tải ứng với số tấn, bám đúng nhãn trong biểu phí:
 * dưới 3 · từ 3 đến 8 · trên 8 đến 15 · trên 15.
 */
export function truckRowForTonnage(tons) {
    const cargo = tndsVehicleClasses.find((item) => item.id === "cargo")?.usages[0]?.rows ?? [];
    const lay = (id) => cargo.find((row) => row.id === id) ?? null;
    if (!Number.isFinite(tons) || tons <= 0)
        return null;
    if (tons < 3)
        return lay("cargo-under-3");
    if (tons <= 8)
        return lay("cargo-3-8");
    if (tons <= 15)
        return lay("cargo-8-15");
    return lay("cargo-over-15");
}
/** Số chỗ phải là số nguyên dương hợp lý; sai thì trả null. */
export function parseSeats(value) {
    const so = typeof value === "number" ? value : typeof value === "string" ? Number(value.trim()) : Number.NaN;
    return Number.isInteger(so) && so >= 1 && so <= 100 ? so : null;
}
function passengerRows(usageId) {
    return tndsVehicleClasses.find((item) => item.id === "passenger")?.usages.find((item) => item.id === usageId)?.rows ?? [];
}
/**
 * Phí xe chở người theo số chỗ, bám đúng các bậc trong biểu phí.
 * Kinh doanh: dưới 6 chỗ · từng số chỗ 6–25 · trên 25 = 4.813.000đ + 30.000đ × (số chỗ − 25).
 * Không kinh doanh: dưới 6 · 6–11 · 12–24 · trên 24.
 */
export function passengerFeeForSeats(seats, business) {
    if (!Number.isInteger(seats) || seats < 1)
        return null;
    if (business) {
        const rows = passengerRows("business");
        const lay = (id) => rows.find((row) => row.id === id);
        if (seats > 25) {
            const goc = lay("business-25")?.baseFee;
            return goc ? { label: `xe kinh doanh ${seats} chỗ`, fee: goc + 30000 * (seats - 25) } : null;
        }
        const row = seats < 6 ? lay("business-under-6") : lay(`business-${seats}`);
        return row?.baseFee ? { label: `xe kinh doanh ${row.label.toLowerCase()}`, fee: row.baseFee } : null;
    }
    const rows = passengerRows("private");
    const id = seats < 6 ? "private-under-6" : seats <= 11 ? "private-6-11" : seats <= 24 ? "private-12-24" : "private-over-24";
    const row = rows.find((item) => item.id === id);
    return row?.baseFee ? { label: `xe không kinh doanh ${row.label.toLowerCase()}`, fee: row.baseFee } : null;
}
/** Dòng phí gốc mà một dòng suy ra dựa vào; thiếu thông số thì null. */
export function derivedSource(row, input = {}) {
    if (row.derive === "truck-tonnage") {
        const truck = input.tonnage ? truckRowForTonnage(input.tonnage) : null;
        return truck?.baseFee ? { label: `xe tải ${truck.label.toLowerCase()}`, fee: truck.baseFee } : null;
    }
    if (row.derive === "business-seats")
        return input.seats ? passengerFeeForSeats(input.seats, true) : null;
    if (row.derive === "passenger-seats")
        return input.seats ? passengerFeeForSeats(input.seats, input.business === true) : null;
    return null;
}
/** Hệ số dạng phần trăm để hiển thị, ví dụ 1.7 → 170. */
export function derivedRatePercent(row) {
    return Math.round((row.rate ?? 1) * 100);
}
/**
 * Phí cơ bản thực áp cho một dòng. Dòng thường lấy thẳng baseFee; dòng suy ra
 * thì = phí dòng gốc × hệ số (xe tải × 120%, taxi × 170%, tập lái × 120%).
 *
 * Trình duyệt (bảng tra cứu, form đặt mua) và máy chủ (API tính lại giá cho
 * mã QR) đều gọi đúng hàm này — sửa công thức một chỗ là đồng bộ mọi nơi.
 */
export function resolveBaseFee(row, input = {}) {
    if (!row.derive)
        return row.baseFee;
    const source = derivedSource(row, input);
    if (!source)
        return undefined;
    return Math.round(source.fee * (row.rate ?? 1));
}
/**
 * Câu giải thích hiện dưới ô nhập, dùng chung cho bảng tra cứu và form đặt mua.
 * `typed`: khách đã gõ gì chưa — để phân biệt "chưa nhập" với "nhập sai".
 */
export function explainDerivedFee(row, input, typed) {
    const pct = derivedRatePercent(row);
    const source = derivedSource(row, input);
    if (source) {
        return `Tính theo ${source.label}: ${formatVnd(source.fee)} × ${pct}% = ${formatVnd(resolveBaseFee(row, input))}`;
    }
    if (row.derive === "truck-tonnage") {
        return typed
            ? "Số tấn chưa hợp lệ — nhập số lớn hơn 0, ví dụ 5 hoặc 3,5."
            : `Phí bằng ${pct}% phí xe tải cùng trọng tải. Nhập số tấn để tính.`;
    }
    const loai = row.derive === "business-seats" || input.business ? "xe kinh doanh" : "xe không kinh doanh";
    return typed
        ? "Số chỗ chưa hợp lệ — nhập số nguyên từ 1 đến 100, ví dụ 4 hoặc 7."
        : `Phí bằng ${pct}% phí ${loai} cùng số chỗ. Nhập số chỗ để tính.`;
}
/** Thông số khách đã nhập, viết gọn để ghi vào đơn: "5 tấn", "7 chỗ · kinh doanh". */
export function describeDeriveInput(row, input) {
    if (row.derive === "truck-tonnage")
        return input.tonnage ? `${String(input.tonnage).replace(".", ",")} tấn` : "";
    if (row.derive === "business-seats")
        return input.seats ? `${input.seats} chỗ` : "";
    if (row.derive === "passenger-seats") {
        return input.seats ? `${input.seats} chỗ · ${input.business ? "kinh doanh" : "không kinh doanh"}` : "";
    }
    return "";
}
/** Ưu đãi khi khách chốt đơn online. */
export const ONLINE_DISCOUNT_RATE = 0.1;
export const ONLINE_DISCOUNT_LABEL = "Mua online + giấy chứng nhận điện tử — giảm 10%";
/** Kênh liên hệ trong ngữ cảnh mua/tư vấn — KHÔNG dùng số bồi thường. */
export const SALES_PHONE = "0938 072 236";
export const SALES_TEL = "tel:0938072236";
export const CLAIMS_HOTLINE = "1900 54 54 58";
export const ZALO_URL = "https://zalo.me/2076363329232219188?src=qr&f=1";
export const ZALO_QR_SRC = "/zalo-pvi-thanh-do-qr.png";
/** Tra cứu loại xe theo id. Sai id thì trả null để phía gọi tự quyết định. */
export function findTndsSelection(vehicleId, usageId, rowId) {
    const vehicle = tndsVehicleClasses.find((item) => item.id === vehicleId);
    if (!vehicle)
        return null;
    const usage = vehicle.usages.find((item) => item.id === usageId);
    if (!usage)
        return null;
    const row = usage.rows.find((item) => item.id === rowId);
    if (!row)
        return null;
    return { vehicle, usage, row };
}
/**
 * Tính phí TNDS. `online = true` thì áp ưu đãi 10% lên phí cơ bản trước
 * khi tính VAT — VAT luôn tính trên phần thực trả.
 */
export function quoteTnds(baseFee, online = false) {
    if (!baseFee)
        return null;
    const base = online ? Math.round(baseFee * (1 - ONLINE_DISCOUNT_RATE)) : baseFee;
    const vat = Math.round(base * VAT_RATE);
    const fullTotal = baseFee + Math.round(baseFee * VAT_RATE);
    const total = base + vat;
    return { base, vat, total, saving: fullTotal - total };
}
