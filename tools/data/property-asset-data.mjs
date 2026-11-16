// Bản chép nguyên văn app/bao-hiem-chay-no-bat-buoc/property-asset-data.ts của baohiempvi-vn (16/11/2026); chỉ đổi đường dẫn bảng danh mục.
import catalog from "./property-asset-catalog.js";
export const propertyAssets = catalog;
export const MAX_SELECTED_ASSETS = 1;
export function togglePropertyAssetSelection(current, id) {
    if (current.includes(id))
        return current.filter((item) => item !== id);
    // Chỉ chọn 1 tài sản: tick loại khác thì thay loại đang chọn.
    return [id];
}
export const propertyAssetSource = {
    workbook: "Copy of Phân lại nhóm rủi ro Bảo hiểm Tài sản.xlsx",
    sheet: "Mã nhóm Rủi Ro",
    columns: "B/C: mã và tên tài sản; J: tỷ lệ phí/năm; K: loại miễn thường",
};
// These are navigation groups, not legal risk classifications.
export const propertyGroups = [
    { id: "kho", label: "Kho", hint: "Kho hàng, kho lạnh, kho gỗ", keywords: "kho hang nha kho warehouse", icon: "warehouse" },
    { id: "san-xuat", label: "Nhà máy, nhà xưởng", hint: "Sản xuất, chế biến, gia công", keywords: "xuong nha may san xuat", icon: "factory" },
    { id: "van-phong", label: "Văn phòng", hint: "Trụ sở, tòa nhà làm việc", keywords: "van phong tru so", icon: "office" },
    { id: "nha-o", label: "Nhà ở, chung cư", hint: "Căn hộ, nhà ở, biệt thự", keywords: "nha o chung cu can ho", icon: "home" },
    { id: "thuong-mai", label: "Cửa hàng, kinh doanh", hint: "Siêu thị, nhà hàng, dịch vụ", keywords: "cua hang kinh doanh thuong mai", icon: "store" },
    { id: "luu-tru", label: "Khách sạn, lưu trú", hint: "Khách sạn, nhà nghỉ, resort", keywords: "khach san luu tru nha nghi", icon: "hotel" },
    { id: "y-te", label: "Y tế, chăm sóc sức khỏe", hint: "Bệnh viện, phòng khám, cơ sở chăm sóc", keywords: "y te suc khoe", icon: "health" },
    { id: "giao-duc", label: "Giáo dục, nghiên cứu", hint: "Trường học, thư viện, viện nghiên cứu", keywords: "giao duc truong hoc nghien cuu", icon: "education" },
    { id: "nang-luong", label: "Điện, năng lượng", hint: "Cơ sở điện, xăng dầu, khí", keywords: "nang luong dien xang dau khi", icon: "energy" },
    { id: "giao-thong", label: "Giao thông, vận tải", hint: "Cảng, nhà ga, bến xe", keywords: "giao thong van tai", icon: "transport" },
    { id: "cong-trinh-khac", label: "Công trình, tài sản khác", hint: "Văn hóa, thể thao và loại hình khác", keywords: "cong trinh khac", icon: "building" },
];
export const insurancePurposes = [
    { id: "pccc", label: "Cung cấp hồ sơ PCCC", icon: "file", description: "Danh mục sẽ được đối chiếu với yêu cầu về bảo hiểm cháy, nổ và hồ sơ PCCC của cơ sở." },
    { id: "protection", label: "Bảo vệ tài sản", icon: "shield", description: "Chuyên viên sẽ tư vấn phạm vi bảo vệ phù hợp với tài sản và nhu cầu thực tế của bạn." },
    { id: "both", label: "Cả hai", icon: "both", description: "Danh mục sẽ được dùng để đối chiếu hồ sơ PCCC và tư vấn phương án bảo vệ tài sản." },
];
export function normalizeAssetSearch(value) {
    return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, " ").trim();
}
const warehousePriority = ["430107", "430110", "410114", "10309", "630309"];
export function searchPropertyAssets(query) {
    const terms = normalizeAssetSearch(query).split(/\s+/).filter(Boolean);
    return propertyGroups.map((group) => ({
        group,
        items: propertyAssets.filter((asset) => {
            if (asset.group !== group.id)
                return false;
            const haystack = normalizeAssetSearch(`${asset.code} ${asset.name} ${group.label} ${group.keywords}`);
            // Whole words keep "kho" from matching the qualifier "không".
            return terms.every((term) => new RegExp(`\\b${term}\\b`).test(haystack) || asset.code.startsWith(term));
        }).sort((a, b) => {
            const rank = (code) => { const index = warehousePriority.indexOf(code); return index < 0 ? 999 : index; };
            return rank(a.code) - rank(b.code) || a.sourceRow - b.sourceRow;
        }),
    })).filter((entry) => entry.items.length > 0);
}
export function formatAssetRate(asset) {
    if (asset.rate !== null) {
        return `${(asset.rate * 100).toLocaleString("vi-VN", { minimumFractionDigits: 2, maximumFractionDigits: 3 })}%`;
    }
    return asset.rateText ? asset.rateText.replace(/\./g, ",").replace(/-/g, "–") : "Cần xác nhận";
}
export function assetPremium(sumInMillions, rate) {
    const value = Number(sumInMillions);
    return rate !== null && Number.isFinite(value) && value > 0 ? value * rate : null;
}
export function assetDisplayName(name) {
    const index = name.indexOf(" (");
    // Keep the exact source wording; show the qualifiers on a second line.
    return index < 0 ? { title: name, detail: "" } : { title: name.slice(0, index), detail: name.slice(index + 1) };
}
