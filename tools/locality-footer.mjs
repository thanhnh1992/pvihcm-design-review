import fs from 'node:fs';
import { guides } from './articles/binh-duong-content.mjs';
const data = (name) => JSON.parse(fs.readFileSync(new URL('./data/' + name, import.meta.url), 'utf8'));
const areas = data('khu-vuc.json');
const units = data('don-vi-thanh-vien-pvi.json');
const mappings = new Map(areas.map((area) => ['/tin-tuc/' + area.slug + '/', { name: area.ten, unit: units.find((unit) => unit.name === area.donVi) }]));
const binhDuongArticlePath = '/tin-tuc/mua-bao-hiem-pvi-binh-duong/';
const binhDuong = { ...mappings.get(binhDuongArticlePath), name: 'Bình Dương' };
mappings.set(binhDuongArticlePath, binhDuong);
for (const guide of guides) mappings.set('/tin-tuc/' + guide.slug + '/', binhDuong);
mappings.set('/tin-tuc/mua-bao-hiem-pvi-binh-thanh/', { name: 'Bình Thạnh', unit: units.find((unit) => unit.name === 'Bảo hiểm PVI Thành Đô') });
// Điểm mua thực tế đã được chủ site cung cấp ảnh, địa chỉ trong bài Thủ Đức.
mappings.set('/tin-tuc/mua-bao-hiem-pvi-thu-duc/', { name: 'Thủ Đức', point: true, unit: { address: '37 Đường số 2, phường An Khánh, khu vực TP Thủ Đức cũ, TP.HCM' } });
export const localityPaths = [...mappings.keys()];
export function localityForPath(path) {
  const binhDuongPage = path.startsWith('/binhduong/') && path !== '/binhduong/sanpham/';
  const entry = binhDuongPage
    ? binhDuong
    : mappings.get(path);
  if (entry && !entry.unit) throw new Error('Thiếu đơn vị PVI cho ' + path);
  return entry;
}
