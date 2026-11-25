const santaFeCalculator = document.querySelector('[data-santa-fe-fee]');

if (santaFeCalculator) {
  const input = santaFeCalculator.querySelector('input');
  const profile = santaFeCalculator.querySelector('select');
  const [preferred, standard] = santaFeCalculator.querySelectorAll('output');
  const threshold = Number(santaFeCalculator.dataset.threshold);
  const currency = new Intl.NumberFormat('vi-VN');
  const premium = (value, output) => {
    const fee = Math.round(value * (Number(output.dataset.rateBps) / 10_000));
    return `${currency.format(fee)} đồng`;
  };

  const update = () => {
    if (profile.value === 'review') {
      preferred.value = 'Liên hệ chuyên viên để được báo phí';
      standard.value = preferred.value;
      return;
    }
    const value = Math.round(input.valueAsNumber * 1_000_000);
    if (!input.validity.valid || !Number.isSafeInteger(value)) {
      preferred.value = 'Nhập giá trị xe hợp lệ';
      standard.value = 'Nhập giá trị xe hợp lệ';
      return;
    }
    preferred.value = value > threshold ? premium(value, preferred) : 'Chỉ xét xe trên 800 triệu đồng';
    standard.value = premium(value, standard);
  };

  input.addEventListener('input', update);
  profile.addEventListener('change', update);
  update();
}
