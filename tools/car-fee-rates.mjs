export const carFeeBands = [
  { min: 300, max: 500, rate: 153, label: 'Từ 300 đến dưới 500 triệu đồng', note: '3 điều khoản' },
  { min: 500, max: 700, rate: 128, label: 'Từ 500 đến dưới 700 triệu đồng' },
  { min: 700, max: 800, inclusiveMax: true, rate: 119, label: 'Từ 700 đến 800 triệu đồng' },
  { min: 800, max: null, rate: 85, label: 'Trên 800 triệu đồng' },
];

export const formatCarMoney = (value) => new Intl.NumberFormat('vi-VN').format(value);
export const carFeeText = (rate) => (rate / 100).toFixed(2).replace('.', ',') + '%';
export const carFeeAtRate = (value, rate) => Math.round(value * rate / 10_000);

export function carFeeRows() {
  return carFeeBands.map(({ min, max, inclusiveMax, rate, label, note }) => {
    const minimum = max === null;
    return `<tr data-min="${min}" data-max="${max ?? ''}" data-rate-bps="${rate}"${inclusiveMax ? ' data-inclusive-max' : ''}${minimum ? ' class="santa-fe-lowest"' : ''}><th scope="row">${label}</th><td><strong>${minimum ? 'Chỉ từ ' : ''}${carFeeText(rate)}</strong>${note ? ' · ' + note : ''}</td></tr>`;
  }).join('\n');
}

export const carElectricTerms = 'Xe điện dùng cùng mốc tỷ lệ phí tham khảo. Khi nhận báo giá, yêu cầu ghi rõ điều khoản bổ sung cho bộ pin điện động cơ (ĐKBS 019) và giá trị pin. Thiệt hại động cơ điện do nước cần kiểm tra riêng theo ĐKBS 008. Quyền lợi và phí chính thức theo điều khoản PVI chấp thuận, đặc biệt khi pin thuê hoặc mua riêng.';
