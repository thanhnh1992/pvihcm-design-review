import { esc, ORG_ID, SITE } from './chrome.mjs';

export const localJsonLd = node => '<script type="application/ld+json">' +
  JSON.stringify({ '@context': 'https://schema.org', ...node }).replace(/</g, '\\u003c') + '</script>';

const ref = id => ({ '@id': id });
const absolute = path => SITE + path;

export function localBreadcrumb(trail) {
  return '<nav class="bd-crumb" aria-label="Đường dẫn">' + trail.map(([name, path], index) =>
    index === trail.length - 1
      ? '<span aria-current="page">' + esc(name) + '</span>'
      : '<a href="' + esc(path) + '">' + esc(name) + '</a>'
  ).join('<span aria-hidden="true">/</span>') + '</nav>';
}

export function localPageSchema({ path, title, description, trail, area, office, photo, questions, products, serviceType }) {
  const url = absolute(path);
  const pageId = url + '#webpage';
  const areaId = absolute(area.path) + '#area';
  const breadcrumbId = url + '#breadcrumb';
  const imageId = url + '#primaryimage';
  const officeId = absolute('/#van-phong-pvi-' + office.key);
  const insurerId = absolute('/#tong-cong-ty-bao-hiem-pvi');
  const mainId = url + (serviceType ? '#service' : '#products');
  const graph = [
    {
      '@type': products ? 'CollectionPage' : 'WebPage',
      '@id': pageId, url, name: title, description, inLanguage: 'vi-VN',
      publisher: ref(ORG_ID), breadcrumb: ref(breadcrumbId), about: ref(areaId), mentions: ref(officeId),
      ...(photo ? { primaryImageOfPage: ref(imageId) } : {}),
      ...(products || serviceType ? { mainEntity: ref(mainId) } : {}),
    },
    {
      '@type': 'BreadcrumbList', '@id': breadcrumbId,
      itemListElement: trail.map(([name, path], index) => ({
        '@type': 'ListItem', position: index + 1, name, item: absolute(path),
      })),
    },
    { '@type': 'Place', '@id': areaId, name: area.name },
    {
      '@type': 'InsuranceAgency', '@id': officeId, name: office.name,
      address: { '@type': 'PostalAddress', streetAddress: office.address, addressCountry: 'VN' },
      parentOrganization: ref(insurerId),
      ...(office.phone ? { telephone: '+84' + office.phone.replace(/\D/g, '').replace(/^0/, '') } : {}),
    },
    { '@type': 'Organization', '@id': insurerId, name: 'Tổng Công ty Bảo hiểm PVI' },
  ];
  if (photo) graph.push({
    '@type': 'ImageObject', '@id': imageId, contentUrl: absolute('/assets/' + photo.stem + '.webp'),
    width: 1200, height: 630, name: photo.alt, caption: photo.caption, creditText: photo.creator,
  });
  if (serviceType) graph.push({
    '@type': 'Service', '@id': mainId, url, name: title, description, serviceType,
    provider: ref(insurerId), areaServed: ref(areaId),
  });
  if (products) graph.push({
    '@type': 'ItemList', '@id': mainId, numberOfItems: products.length,
    itemListElement: products.map(([name, path], index) => ({
      '@type': 'ListItem', position: index + 1, name, url: absolute(path),
    })),
  });
  if (questions?.length) graph.push({
    '@type': 'FAQPage', '@id': url + '#faq', isPartOf: ref(pageId), inLanguage: 'vi-VN',
    mainEntity: questions.map(({ question, answer }) => ({
      '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  });
  return localJsonLd({ '@graph': graph });
}
