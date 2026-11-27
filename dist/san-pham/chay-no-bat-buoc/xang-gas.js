import { cnbbLeadFieldErrors, normalizeCompanyName, normalizeEmail, normalizePhone } from '/o-to/order-input-rules.js';

const form = document.querySelector('#fuel-form');
const status = document.querySelector('#fuel-status');
const fallback = document.querySelector('#fuel-fallback');
const button = form.querySelector('button');
const certificate = document.querySelector('#mau-gcn-chay-no');
const facilities = {
  gas: 'Cửa hàng gas (cơ sở kinh doanh khí đốt)',
  xang: 'Trạm xăng (cửa hàng xăng dầu)',
  'can-ho-dich-vu': 'Căn hộ dịch vụ',
  'phong-tro': 'Phòng trọ cho thuê',
};
const rentalFacilities = new Set(['can-ho-dich-vu', 'phong-tro']);
const rental = document.querySelector('#fuel-rental');
const estimate = document.querySelector('#fuel-estimate');
const estimateRate = document.querySelector('#fuel-estimate-rate');
const assetLabel = document.querySelector('#fuel-asset-label');
const assetValue = document.querySelector('#fuel-asset-value');
const estimateResult = document.querySelector('#fuel-estimate-result');
const currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
const percentage = new Intl.NumberFormat('vi-VN', { style: 'percent', maximumFractionDigits: 1 });
const rentalRates = {
  co: { label: 'Giá trị tài sản', rate: 0.001, purpose: 'Đã có biên bản kiểm tra PCCC' },
  'chua-co': { label: 'Giá trị xây dựng', rate: 0.002, purpose: 'Chưa có biên bản kiểm tra PCCC' },
};

function updateEstimate() {
  const isRental = rentalFacilities.has(form.elements.facility.value);
  rental.hidden = !isRental;
  rental.disabled = !isRental;
  const terms = isRental ? rentalRates[form.elements.pccc.value] : undefined;
  estimate.hidden = !terms;
  if (!terms) return;

  assetLabel.textContent = terms.label;
  estimateRate.textContent = `Phí tham khảo mỗi năm: ${percentage.format(terms.rate)} × ${terms.label.toLowerCase()}.`;
  const amount = assetValue.valueAsNumber;
  const fee = amount * 1_000_000 * terms.rate;
  estimateResult.textContent = assetValue.validity.valid && Number.isFinite(fee)
    ? `Phí ước tính: ${currency.format(fee)}/năm`
    : '';
}

const requestedFacility = new URLSearchParams(location.search).get('loai-co-so');
if (rentalFacilities.has(requestedFacility)) form.elements.facility.value = requestedFacility;
form.hidden = false;
updateEstimate();
if (form.elements.facility.value || location.hash === '#mau-gcn-chay-no') certificate.open = true;

form.addEventListener('change', (event) => {
  if (event.target.name === 'facility') certificate.open = true;
  if (event.target.name === 'facility' || event.target.name === 'pccc') {
    assetValue.value = '';
    updateEstimate();
  }
});
assetValue.addEventListener('input', updateEstimate);

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
  if (!Object.hasOwn(facilities, facility) || values.get('consent') !== 'on') return;
  const isRental = rentalFacilities.has(facility);
  const terms = rentalRates[values.get('pccc')];
  if (isRental && !terms) return;
  const purpose = isRental ? `${terms.purpose} · ${terms.label}` : 'Báo giá cửa hàng gas và trạm xăng';
  const sum = isRental && Number.isFinite(assetValue.valueAsNumber) ? String(assetValue.valueAsNumber) : '';

  button.disabled = true;
  status.textContent = 'Đang gửi yêu cầu…';

  try {
    const response = await fetch('/api/chay-no-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...contact, kind: 'bang-chao', consent: true, assetName, purpose, sum }),
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
    updateEstimate();
    status.textContent = 'PVI đã nhận yêu cầu báo giá và sẽ liên hệ qua thông tin bạn cung cấp.';
    if (Array.isArray(window.dataLayer)) {
      const conversion = isRental ? 'cnbb_nha_cho_thue_lead' : 'cnbb_xang_gas_lead';
      window.dataLayer.push({ event: conversion, facility });
    }
  } catch {
    status.textContent = 'Hệ thống chưa xác nhận lưu yêu cầu. Bạn có thể liên hệ PVI qua Zalo hoặc gọi 0938 072 236.';
    fallback.hidden = false;
  } finally {
    button.disabled = false;
  }
  status.focus();
});

document.querySelector('.fuel-sample-link a').addEventListener('click', () => {
  certificate.open = true;
});
