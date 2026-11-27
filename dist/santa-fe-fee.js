const carFeeCalculator = document.querySelector('[data-santa-fe-fee], [data-car-fee-calculator]');

if (carFeeCalculator) {
  const input = carFeeCalculator.querySelector('input');
  const profile = carFeeCalculator.querySelector('select');
  const output = carFeeCalculator.querySelector('output');
  const bands = [...carFeeCalculator.querySelectorAll('[data-rate-bps]')].map((row) => ({
    min: Number(row.dataset.min) * 1_000_000,
    max: row.dataset.max ? Number(row.dataset.max) * 1_000_000 : Infinity,
    rate: Number(row.dataset.rateBps),
    inclusiveMax: row.hasAttribute('data-inclusive-max'),
  }));
  const currency = new Intl.NumberFormat('vi-VN');
  const percentage = new Intl.NumberFormat('vi-VN', { style: 'percent', minimumFractionDigits: 2 });

  const update = () => {
    if (profile.value !== 'standard') {
      output.value = 'Liên hệ chuyên viên để được báo phí';
      return;
    }
    const value = Math.round(input.valueAsNumber * 1_000_000);
    if (!input.validity.valid || !Number.isSafeInteger(value)) {
      output.value = input.value ? 'Nhập giá trị xe hợp lệ' : 'Nhập giá trị bảo hiểm để tính phí';
      return;
    }
    const band = bands.find(({ min, max, inclusiveMax }) => {
      if (max === Infinity) return value > min;
      return value >= min && (value < max || (inclusiveMax && value === max));
    });
    if (!band) {
      output.value = 'Liên hệ chuyên viên để được báo phí';
      return;
    }
    const rate = band.rate / 10_000;
    const fee = Math.round(value * rate);
    const prefix = band.max === Infinity ? 'Chỉ từ ' : '';
    output.value = `${prefix}${currency.format(fee)} đồng/năm (${percentage.format(rate)})`;
  };

  input.addEventListener('input', update);
  profile.addEventListener('change', update);
  update();
}
