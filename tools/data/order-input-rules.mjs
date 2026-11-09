// Bản chép nguyên văn app/order-input-rules.ts của baohiempvi-vn (chuyển TS sang JS, 09/11/2026).
/**
 * Quy cách nhập của đơn đặt mua — dùng CHUNG cho form trên trình duyệt và API
 * phía máy chủ, để hai bên không bao giờ lệch nhau. Máy chủ vẫn là nơi chặn
 * thật: bot gọi thẳng API, không đi qua form.
 */
/** Bỏ khoảng trắng, dấu chấm, gạch — "0938 072 236" → "0938072236". */
export function normalizePhone(value) {
    return value.replace(/[\s.\-]/g, "");
}
/** Số điện thoại Việt Nam: đúng 10 chữ số, bắt đầu bằng 0. */
export function isValidPhone(value) {
    return /^0\d{9}$/.test(normalizePhone(value));
}
/** Gộp khoảng trắng thừa, chuẩn hoá dấu tiếng Việt về một dạng (NFC). */
export function normalizeName(value) {
    return value.normalize("NFC").trim().replace(/\s+/g, " ");
}
/** Họ và tên đầy đủ: ít nhất hai từ, mỗi từ chỉ gồm chữ cái. */
export function isValidFullName(value) {
    const words = normalizeName(value).split(" ").filter(Boolean);
    return words.length >= 2 && words.every((word) => /^[\p{L}\p{M}]+$/u.test(word));
}
/** Bỏ khoảng trắng, dấu chấm, gạch và viết hoa — "51a-123.45" → "51A12345". */
export function normalizePlate(value) {
    return value.replace(/[\s.\-]/g, "").toUpperCase();
}
/**
 * Biển số xe Việt Nam: 2 số mã tỉnh + 1–2 chữ cái sê-ri + dãy số đăng ký,
 * tổng 7–10 ký tự sau khi bỏ dấu phân cách. Ví dụ 51A-123.45, 30LD-1234.
 */
export function isValidPlate(value) {
    const plate = normalizePlate(value);
    return plate.length >= 7 && plate.length <= 10 && /^\d{2}[A-Z]{1,2}\d{4,6}$/.test(plate);
}
export const ORDER_INPUT_ERRORS = {
    name: "Nhập đầy đủ họ và tên, có cả họ và tên (ví dụ: Nguyễn Văn An).",
    phone: "Nhập đúng số điện thoại: đủ 10 chữ số, bắt đầu bằng số 0 (ví dụ: 0912345678).",
    plate: "Nhập đúng biển số xe, ví dụ 51A-123.45 (7–10 ký tự, không tính dấu chấm, gạch).",
};
/** Khi khách bỏ trống hẳn thì nhắc nhập, không báo "sai định dạng". */
export const ORDER_INPUT_EMPTY = {
    name: "Vui lòng nhập họ và tên người mua.",
    phone: "Vui lòng nhập số điện thoại.",
    plate: "Vui lòng nhập biển số xe.",
};
/** Thứ tự các ô trên form — lỗi đầu tiên theo thứ tự này là ô được đưa con trỏ về. */
export const TNDS_ORDER_FIELDS = ["name", "phone", "plate"];
export const CONTACT_ORDER_FIELDS = ["name", "phone"];
const VALIDATORS = {
    name: isValidFullName,
    phone: isValidPhone,
    plate: isValidPlate,
};
/** Lỗi của từng ô trong `fields`, chỉ gồm các ô đang sai. Rỗng khi mọi ô đều hợp lệ. */
function fieldErrors(fields, input) {
    const errors = {};
    for (const field of fields) {
        const value = input[field];
        if (!value.trim())
            errors[field] = ORDER_INPUT_EMPTY[field];
        else if (!VALIDATORS[field](value))
            errors[field] = ORDER_INPUT_ERRORS[field];
    }
    return errors;
}
/** Ô sai đầu tiên theo thứ tự trên form kèm lời nhắc, hoặc null. */
function firstError(fields, errors) {
    const field = fields.find((item) => errors[item]);
    return field ? { field, message: errors[field] } : null;
}
export function tndsOrderFieldErrors(input) {
    return fieldErrors(TNDS_ORDER_FIELDS, input);
}
export function checkTndsOrderInput(input) {
    return firstError(TNDS_ORDER_FIELDS, tndsOrderFieldErrors(input));
}
export function contactOrderFieldErrors(input) {
    return fieldErrors(CONTACT_ORDER_FIELDS, input);
}
export function checkContactOrderInput(input) {
    return firstError(CONTACT_ORDER_FIELDS, contactOrderFieldErrors(input));
}
/**
 * Email liên hệ: một dấu @, tên miền có dấu chấm, không khoảng trắng.
 * Chỉ kiểm tra hình thức, không đoán hộp thư có tồn tại hay không.
 */
export function normalizeEmail(value) {
    return value.trim().toLowerCase();
}
export function isValidEmail(value) {
    const email = normalizeEmail(value);
    return email.length <= 120 && /^[a-z0-9._%+\-]+@[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?)+$/.test(email);
}
/**
 * Tên đơn vị (công ty, cửa hàng, cơ sở): 3–150 ký tự, có ít nhất 2 chữ cái,
 * chỉ gồm chữ, số, khoảng trắng và & . , - ( ) ' / — không chấp nhận chuỗi chỉ
 * toàn số hoặc ký hiệu. Chỉ gộp khoảng trắng thừa, không tự đổi chữ hoa/thường.
 */
export function normalizeCompanyName(value) {
    return normalizeName(value);
}
export function isValidCompanyName(value) {
    const name = normalizeCompanyName(value);
    const letters = name.match(/[\p{L}]/gu) ?? [];
    return name.length >= 3 && name.length <= 150 && letters.length >= 2 && /^[\p{L}\p{M}\p{N}\s&.,\-()'/]+$/u.test(name);
}
export const CNBB_LEAD_FIELDS = ["phone", "email", "company"];
export const CNBB_LEAD_ERRORS = {
    phone: { empty: ORDER_INPUT_EMPTY.phone, invalid: ORDER_INPUT_ERRORS.phone },
    email: { empty: "Vui lòng nhập email.", invalid: "Nhập đúng email, ví dụ: ketoan@congty.vn." },
    company: { empty: "Vui lòng nhập tên đơn vị.", invalid: "Nhập đúng tên đơn vị (3–150 ký tự, có chữ cái), ví dụ: Công ty TNHH ABC." },
};
const CNBB_VALIDATORS = {
    phone: isValidPhone,
    email: isValidEmail,
    company: isValidCompanyName,
};
/** Lỗi từng ô của form cháy nổ bắt buộc; rỗng khi cả ba ô đều hợp lệ. */
export function cnbbLeadFieldErrors(input) {
    const errors = {};
    for (const field of CNBB_LEAD_FIELDS) {
        const value = input[field];
        if (!value.trim())
            errors[field] = CNBB_LEAD_ERRORS[field].empty;
        else if (!CNBB_VALIDATORS[field](value))
            errors[field] = CNBB_LEAD_ERRORS[field].invalid;
    }
    return errors;
}
