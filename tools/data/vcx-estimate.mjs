// Khoảng tỷ lệ tham khảo do chủ site xác nhận, tính theo điểm cơ bản.
export const vcxEstimate = { lowBps: 85, highBps: 180 };
const percent = new Intl.NumberFormat('vi-VN', { style: 'percent', maximumFractionDigits: 2 });
export const vcxEstimateLabel = `${percent.format(vcxEstimate.lowBps / 10000)} đến ${percent.format(vcxEstimate.highBps / 10000)}`;
