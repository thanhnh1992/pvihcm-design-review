import { breadcrumbJsonLd, esc, page } from './chrome.mjs';
import { existsSync } from 'node:fs';
import { normalizeCarName } from '../dist/car-fee-normalize.js';
import carCatalogue from './data/car-fee-catalogue.json' with { type: 'json' };
import { post as santaFe } from './articles/bao-hiem-than-vo-hyundai-santa-fe.mjs';
import { carElectricTerms, carFeeRows } from './car-fee-rates.mjs';
import { carFeePriceExamples } from './data/car-fee-price-examples.mjs';
import { modelFeeArticles } from './articles/bao-hiem-xe-theo-hang.mjs';

export const CAR_FEE_PATH = '/kien-thuc/tinhphinhanhtheotenxe/';
export const CAR_FEE_TITLE = 'Tra cứu phí bảo hiểm theo dòng xe';
const stylesheet = '/car-fee-directory.css';

export const carFeeStyles = `<link rel="stylesheet" href="${stylesheet}">`;

export const carFeeCard = `<a class="car-fee-card" href="${CAR_FEE_PATH}">
  <div class="car-fee-card-copy">
    <strong>Tra cứu phí chi tiết theo từng dòng xe</strong>
    <span>Chọn hãng và mẫu xe để xem cách tính phí bảo hiểm vật chất.</span>
    <b>Xem danh sách xe <i aria-hidden="true">&rarr;</i></b>
  </div>
  <img src="/assets/kiem-tra-hyundai-santa-fe-480.webp" width="480" height="320" alt="" loading="lazy" decoding="async">
</a>`;

const published = {
  Hyundai: { 'Santa Fe': santaFe.path },
  VinFast: { 'VF Wild': '/tin-tuc/bao-hiem-xe-ban-tai-dien-vinfast-vf-wild/' },
};

for (const { brand, model, aliases, post } of modelFeeArticles) {
  const links = published[brand] ??= {};
  for (const name of [model, ...aliases]) links[name] = post.path;
}

const priceCards = Object.entries(carFeePriceExamples).flatMap(([brand, models]) =>
  Object.entries(models).map(([model, { source, values, electric, note }]) => {
    if (!carCatalogue[brand]?.includes(model)) throw new Error(`Dòng xe ngoài danh mục: ${brand} ${model}`);
    return `<template data-price-example="${esc(brand + ' ' + model)}"${electric ? ' data-electric' : ''}>
      <p>Nguồn giá tham khảo: ${esc(source)}. Chọn một mốc để tính thử.</p>
      <div class="car-fee-price-buttons">${values.map(([label, value]) => `<button type="button" data-example-value="${value}">${esc(label)} · ${value.toLocaleString('vi-VN')} triệu</button>`).join('')}</div>${note ? `<p>${esc(note)}</p>` : ''}
    </template>`;
  })
).join('');

const feeCalculator = `<section class="car-fee-calculate" id="tinh-phi" data-car-fee-calculator aria-labelledby="car-fee-calculate-title">
  <h2 id="car-fee-calculate-title" tabindex="-1">Tính thử phí bảo hiểm xe</h2>
  <p>Chọn mẫu xe trong danh mục hoặc nhập số tiền dự kiến bảo hiểm. Giá niêm yết và giá rao chỉ dùng làm mốc tham khảo.</p>
  <div data-price-example-target hidden></div>
  ${priceCards}
  <div class="car-fee-inputs">
    <label>Hồ sơ xe<select><option value="standard">Xe mới hoặc sử dụng đến 3 năm</option><option value="review">Xe trên 3 năm hoặc tỷ lệ bồi thường cao</option><option value="review-commercial">Xe kinh doanh hoặc cần thẩm định riêng</option></select></label>
    <label>Số tiền bảo hiểm (triệu đồng)<input type="number" min="1" step="any" required inputmode="decimal" placeholder="Ví dụ 650"></label>
  </div>
  <label class="car-fee-electric-choice"><input type="checkbox" data-electric-choice aria-controls="car-fee-electric-terms"> Xe điện · xem quyền lợi pin và động cơ</label>
  <p id="car-fee-electric-terms" data-electric-terms>${carElectricTerms}</p>
  <p class="car-fee-result"><strong>Phí dự tính:</strong> <output>Nhập giá trị bảo hiểm để tính phí</output></p>
  <details class="car-fee-tariff">
    <summary>Xem các mốc tỷ lệ phí</summary>
    <table><thead><tr><th scope="col">Số tiền bảo hiểm</th><th scope="col">Tỷ lệ tham khảo</th></tr></thead>
    <tbody>${carFeeRows()}</tbody></table>
  </details>
  <p>Xe dưới 300 triệu đồng, xe trên 3 năm, xe kinh doanh hoặc hồ sơ có tỷ lệ bồi thường cao cần xác nhận riêng. Xem <a href="/san-pham/bao-hiem-vat-chat-xe/">quyền lợi và điều khoản bảo hiểm vật chất xe</a>.</p>
</section>`;

export function renderCarFeeDirectory() {
  const priority = ['Hyundai', 'Kia', 'Toyota', 'VinFast', 'Ford', 'Mazda', 'Mitsubishi', 'Honda'];
  const groups = priority.map((name) => [name, carCatalogue[name]])
    .concat(Object.entries(carCatalogue).filter(([name]) => !priority.includes(name)));
  const count = groups.reduce((total, [, models]) => total + models.length, 0);
  const main = `
    <section class="car-fee-directory">
      <div class="fire-wrap">
        <nav class="car-fee-crumb" aria-label="Đường dẫn">
          <a href="/">Trang chủ</a><span aria-hidden="true">/</span>
          <a href="/kien-thuc/">Kiến thức</a><span aria-hidden="true">/</span>
          <span aria-current="page">Phí theo dòng xe</span>
        </nav>
        <div class="car-fee-directory-head">
          <h1>${CAR_FEE_TITLE}</h1>
          <p>Tra phí vật chất cho ${count.toLocaleString('vi-VN')} dòng xe thuộc ${groups.length} hãng. Chọn mẫu xe để tính phí. Mẫu đã có bài riêng sẽ hiện thêm liên kết đọc bài.</p>
        </div>
        ${feeCalculator}
        <div class="car-fee-filter" hidden>
          <label for="car-fee-search">Tìm theo hãng hoặc dòng xe</label>
          <input id="car-fee-search" type="search" placeholder="Ví dụ Santa Fe, Vios, VinFast" autocomplete="off">
          <p class="car-fee-status" role="status"></p>
        </div>
        <div class="car-fee-groups" aria-label="Danh sách dòng xe">
          ${groups.map(([brand, models]) => {
            const logoFile = '/assets/car-brands/' + normalizeCarName(brand) + '.webp';
            const logo = existsSync(new URL('../dist' + logoFile, import.meta.url)) ? logoFile : '';
            return `<details class="car-fee-brand" data-brand="${esc(brand)}">
            <summary>
              ${logo ? `<img class="car-fee-brand-logo" src="${logo}" alt="" width="64" height="44" loading="lazy" decoding="async">` : ''}
              <span class="car-fee-brand-title">${esc(brand)} <small>${models.length} dòng xe</small></span>
            </summary>
            <div class="car-fee-brand-models">
            ${logo ? `<img class="car-fee-brand-mark" src="${logo}" alt="" width="170" height="105" loading="lazy" decoding="async">` : ''}
            <ul aria-label="Dòng xe ${esc(brand)}" tabindex="0">${models.map((model) => {
              const url = published[brand]?.[model];
              return `<li data-model="${esc(model)}"><a class="car-fee-model" href="#tinh-phi">${esc(model)}</a>${url ? `<a class="car-fee-guide" href="${url}" aria-label="Đọc bài về ${esc(brand + ' ' + model)}">Đọc bài <span aria-hidden="true">&rarr;</span></a>` : ''}</li>`;
            }).join('')}</ul>
            </div>
          </details>`;
          }).join('')}
        </div>
        <p class="car-fee-back"><a href="/kien-thuc/bao-hiem-o-to/">Xem thêm kiến thức bảo hiểm ô tô</a></p>
      </div>
    </section>`;

  return page({
    path: CAR_FEE_PATH,
    bodyClass: 'fire car-fee-directory-page',
    title: CAR_FEE_TITLE + ' | PVI Thành Đô',
    description: 'Tìm dòng xe theo hãng và xem hướng dẫn tính phí bảo hiểm vật chất ô tô cho từng mẫu tại PVI Thành Đô.',
    extraCss: carFeeStyles,
    scripts: '<script src="/santa-fe-fee.js" defer></script><script type="module" src="/car-fee-directory.js"></script>',
    head: breadcrumbJsonLd(CAR_FEE_PATH, CAR_FEE_TITLE),
    main,
  });
}
