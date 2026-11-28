import { normalizeCarName } from './car-fee-normalize.js';

const carFilter = document.querySelector('.car-fee-filter');
const calculator = document.querySelector('#tinh-phi');

if (carFilter) {
  const search = carFilter.querySelector('input');
  const status = carFilter.querySelector('[role="status"]');
  const groups = [...document.querySelectorAll('.car-fee-brand')].map((group) => {
    const brand = group.dataset.brand;
    return {
      group,
      models: [...group.querySelectorAll('li')].map((item) => ({
        item,
        name: normalizeCarName(brand + item.dataset.model),
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

if (calculator) {
  const heading = calculator.querySelector('h2');
  const value = calculator.querySelector('input[type="number"]');
  const profile = calculator.querySelector('select');
  const electric = calculator.querySelector('[data-electric-choice]');
  const terms = calculator.querySelector('[data-electric-terms]');
  const priceTarget = calculator.querySelector('[data-price-example-target]');
  const examples = new Map([...calculator.querySelectorAll('template[data-price-example]')]
    .map((template) => [template.dataset.priceExample, template]));
  const businessOption = profile.querySelector('option[value="vinfast-business"]');
  const businessTerms = calculator.querySelector('[data-vinfast-business-terms]');
  const standardOption = profile.querySelector('option[value="standard"]');
  const updateTerms = () => {
    const business = profile.value === 'vinfast-business';
    terms.hidden = !electric.checked || business;
    if (businessTerms) businessTerms.hidden = !business;
  };
  electric.addEventListener('change', updateTerms);
  profile.addEventListener('change', updateTerms);
  updateTerms();

  let selected;
  document.querySelector('.car-fee-groups').addEventListener('click', (event) => {
    const link = event.target.closest('.car-fee-model');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const item = link.closest('[data-model]');
    const model = item.dataset.model;
    const brand = link.closest('[data-brand]').dataset.brand;
    const name = brand + ' ' + model;
    const example = examples.get(name);
    selected?.removeAttribute('aria-current');
    selected = link;
    selected.setAttribute('aria-current', 'true');
    heading.textContent = 'Tính phí bảo hiểm ' + name;
    priceTarget.replaceChildren();
    if (example) priceTarget.append(example.content.cloneNode(true));
    priceTarget.hidden = !example;
    const eligible = Boolean(businessOption && item.hasAttribute('data-vinfast-business'));
    const businessDefault = eligible && item.hasAttribute('data-vinfast-business-default');
    if (businessOption) {
      businessOption.disabled = !eligible;
      businessOption.hidden = !eligible;
    }
    standardOption.disabled = businessDefault;
    standardOption.hidden = businessDefault;
    electric.checked = eligible || Boolean(example?.hasAttribute('data-electric'));
    value.value = '';
    profile.value = businessDefault ? 'vinfast-business' : item.hasAttribute('data-quote-only') ? 'review-commercial' : 'standard';
    updateTerms();
    value.dispatchEvent(new Event('input'));
    heading.focus({ preventScroll: true });
    calculator.scrollIntoView({ block: 'start' });
  });

  priceTarget.addEventListener('click', (event) => {
    const button = event.target.closest('[data-example-value]');
    if (!button) return;
    value.value = button.dataset.exampleValue;
    value.dispatchEvent(new Event('input'));
  });
}
