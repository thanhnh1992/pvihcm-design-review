import { breadcrumbJsonLd, esc, page } from './chrome.mjs';
import { existsSync } from 'node:fs';
import { normalizeCarName } from '../dist/car-fee-normalize.js';
import carCatalogue from './data/car-fee-catalogue.json' with { type: 'json' };
import { post as santaFe } from './articles/bao-hiem-than-vo-hyundai-santa-fe.mjs';

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
          <p>Tra cứu trong ${count.toLocaleString('vi-VN')} dòng xe thuộc ${groups.length} hãng. Chọn dòng có mũi tên để xem bài hướng dẫn tính phí.</p>
        </div>
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
              return `<li>${url ? `<a href="${url}">${esc(model)} <span aria-hidden="true">&rarr;</span></a>` : `<span>${esc(model)}</span>`}</li>`;
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
    scripts: '<script type="module" src="/car-fee-directory.js"></script>',
    head: breadcrumbJsonLd(CAR_FEE_PATH, CAR_FEE_TITLE),
    main,
  });
}
