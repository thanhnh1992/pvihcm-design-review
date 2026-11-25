import { normalizeCarName } from './car-fee-normalize.js';

const carFilter = document.querySelector('.car-fee-filter');

if (carFilter) {
  const search = carFilter.querySelector('input');
  const status = carFilter.querySelector('[role="status"]');
  const groups = [...document.querySelectorAll('.car-fee-brand')].map((group) => {
    const brand = group.dataset.brand;
    return {
      group,
      models: [...group.querySelectorAll('li')].map((item) => ({
        item,
        name: normalizeCarName(brand + item.textContent),
      })),
    };
  });

  let searchActive = false;
  const filter = () => {
    const query = normalizeCarName(search.value);
    let matches = 0;
    for (const { group, models } of groups) {
      let groupMatches = 0;
      for (const { item, name } of models) {
        const match = name.includes(query);
        item.hidden = !match;
        if (match) groupMatches++;
      }
      group.hidden = groupMatches === 0;
      if (query) group.open = groupMatches > 0;
      else if (searchActive) group.open = false;
      matches += groupMatches;
    }
    status.textContent = query ? (matches ? `${matches} dòng xe phù hợp` : 'Chưa tìm thấy dòng xe phù hợp.') : '';
    searchActive = Boolean(query);
  };

  carFilter.hidden = false;
  search.addEventListener('input', filter);
  filter();
}
