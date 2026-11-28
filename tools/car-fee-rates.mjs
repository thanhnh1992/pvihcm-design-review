export const carFeeBands = [
  { min: 300, max: 500, rate: 153, label: 'Từ 300 đến dưới 500 triệu đồng', note: '3 điều khoản' },
  { min: 500, max: 700, rate: 128, label: 'Từ 500 đến dưới 700 triệu đồng' },
  { min: 700, max: 800, inclusiveMax: true, rate: 119, label: 'Từ 700 đến 800 triệu đồng' },
  { min: 800, max: null, rate: 85, label: 'Trên 800 triệu đồng' },
];

export const formatCarMoney = (value) => new Intl.NumberFormat('vi-VN').format(value);
export const carFeeText = (rate) => (rate / 100).toFixed(2).replace('.', ',') + '%';
export const carFeeAtRate = (value, rate) => Math.round(value * rate / 10_000);
export const vinfastBusinessRate = 140;
export const vinfastBusinessPath = '/kien-thuc/bao-hiem-o-to/bao-hiem-vat-chat-vinfast-kinh-doanh/';
export const vinfastBusinessProfile = 'vinfast-business';
export const vinfastBusinessLabel = 'VinFast điện kinh doanh · 1,4% có bảo hiểm pin';
export const vinfastBusinessTerms = 'Phí bảo hiểm vật chất VinFast điện kinh doanh tham khảo là 1,4% số tiền bảo hiểm cho 12 tháng và có bảo hiểm pin điện động cơ. Khai báo quyền sở hữu, thông tin và giá trị pin để PVI ghi nhận ĐKBS 019/XCG-PVI trên giấy chứng nhận hoặc hợp đồng. Phạm vi, mức khấu trừ và điều kiện bồi thường theo hợp đồng được chấp thuận.';
const vinfastElectricModels = new Set([
  'VF 2', 'VF 3', 'VF 5', 'VF 5 Green', 'VF 6', 'VF 7', 'VF 8', 'VF 9', 'VF MPV 7', 'VF e34',
  'Minio Green', 'Herio Green', 'Nerio Green', 'Limo Green', 'EC Van', 'Lạc Hồng 900', 'xe điện kinh doanh',
]);
const vinfastBusinessModels = new Set(['VF 5 Green', 'Minio Green', 'Herio Green', 'Nerio Green', 'Limo Green', 'EC Van', 'xe điện kinh doanh']);
export const isVinfastElectric = (brand, model) => brand === 'VinFast' && vinfastElectricModels.has(model);
export const isVinfastBusinessDefault = (brand, model) => brand === 'VinFast' && vinfastBusinessModels.has(model);

export function carFeeRows() {
  return carFeeBands.map(({ min, max, inclusiveMax, rate, label, note }) => {
    const minimum = max === null;
    return `<tr data-min="${min}" data-max="${max ?? ''}" data-rate-bps="${rate}"${inclusiveMax ? ' data-inclusive-max' : ''}${minimum ? ' class="santa-fe-lowest"' : ''}><th scope="row">${label}</th><td><strong>${minimum ? 'Chỉ từ ' : ''}${carFeeText(rate)}</strong>${note ? ' · ' + note : ''}</td></tr>`;
  }).join('\n');
}

export const carElectricTerms = 'Xe điện dùng cùng mốc tỷ lệ phí tham khảo. Khi nhận báo giá, yêu cầu ghi rõ điều khoản bổ sung cho bộ pin điện động cơ (ĐKBS 019) và giá trị pin. Thiệt hại động cơ điện do nước cần kiểm tra riêng theo ĐKBS 008. Quyền lợi và phí chính thức theo điều khoản PVI chấp thuận, đặc biệt khi pin thuê hoặc mua riêng.';
