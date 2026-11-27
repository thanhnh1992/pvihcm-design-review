import { cnbbLeadFieldErrors, normalizeCompanyName, normalizeEmail, normalizePhone } from '/o-to/order-input-rules.js';

const form = document.querySelector('#fuel-form');
const status = document.querySelector('#fuel-status');
const fallback = document.querySelector('#fuel-fallback');
const button = form.querySelector('button');
const facilities = {
  gas: 'Cửa hàng gas (cơ sở kinh doanh khí đốt)',
  xang: 'Trạm xăng (cửa hàng xăng dầu)',
};

form.hidden = false;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (button.disabled) return;

  const values = new FormData(form);
  const contact = {
    company: normalizeCompanyName(values.get('company')),
    phone: normalizePhone(values.get('phone')),
    email: normalizeEmail(values.get('email')),
  };
  const errors = cnbbLeadFieldErrors(contact);
  const invalid = Object.keys(errors).find((field) => errors[field]);
  fallback.hidden = true;
  if (invalid) {
    status.textContent = errors[invalid];
    form.elements.namedItem(invalid).focus();
    return;
  }

  const facility = values.get('facility');
  const assetName = facilities[facility];
  if (!assetName || values.get('consent') !== 'on') return;

  button.disabled = true;
  status.textContent = 'Đang gửi yêu cầu…';

  try {
    const response = await fetch('/api/chay-no-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...contact, kind: 'bang-chao', consent: true, assetName, purpose: 'Báo giá cửa hàng gas và trạm xăng' }),
    });
    const result = await response.json();
    if (response.status === 400 || response.status === 429) {
      status.textContent = result.error || 'Vui lòng kiểm tra thông tin và thử lại.';
      fallback.hidden = response.status !== 429;
      status.focus();
      return;
    }
    if (!response.ok || !result.ok || !result.sheet?.saved) throw new Error('Yêu cầu chưa được lưu');

    form.reset();
    status.textContent = 'PVI đã nhận yêu cầu báo giá và sẽ liên hệ qua thông tin bạn cung cấp.';
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'cnbb_xang_gas_lead', facility });
    }
  } catch {
    status.textContent = 'Hệ thống chưa xác nhận lưu yêu cầu. Bạn có thể liên hệ PVI qua Zalo hoặc gọi 0938 072 236.';
    fallback.hidden = false;
  } finally {
    button.disabled = false;
  }
  status.focus();
});
