// Khối "Vì sao chọn PVI" trên trang chủ (thay khối "Niềm tin cần bằng chứng rõ ràng", chủ site chốt 15/10/2026).
// Chép nguyên số liệu, nguồn và ảnh từ baohiempvi-vn (app/components/why-pvi.tsx, why-pvi-market.tsx),
// chuyển sang HTML tĩnh: HTML in sẵn SỐ CUỐI để Google/AI đọc được; dist/why-pvi.js chỉ thêm hiệu ứng.
// Sửa số liệu/ảnh: sửa hằng số dưới đây rồi chạy `node tools/gen-why-pvi.mjs` (ghi vào dist/index.html,
// giữa hai dấu <!-- why-pvi:start --> và <!-- why-pvi:end -->).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.resolve(HERE, '../dist/index.html');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* 1. Thị phần: Bộ Tài chính, Bản tin thị trường bảo hiểm tháng 7/2026 */
const MARKET_SOURCE = {
  label: 'Bộ Tài chính, Bản tin thị trường bảo hiểm tháng 7/2026',
  href: 'https://www.mof.gov.vn/quan-ly-giam-sat-bao-hiem/ban-tin-thi-truong-bao-hiem-toan-cau/ban-tin-thi-truong-bao-hiem-thang-72026',
};
const SHARES = [
  { label: 'PVI', value: 17.83, color: '#1465d9' },
  { label: 'Bảo Việt', value: 12.44, color: '#eb6834' },
  { label: 'MIC', value: 6.97, color: '#1baf7a' },
  { label: 'Bảo Minh', value: 6.9, color: '#eda100' },
  { label: 'DBV', value: 5.92, color: '#e87ba4' },
  { label: 'Khác', full: 'Doanh nghiệp khác', value: 49.94, color: '#c9d3df' },
];
const BAR_MAX = 50;

/* 2. AM Best: giấy chứng nhận chủ site cung cấp, hiệu lực 19/03/2026 */
const AM_BEST_CERT = '/assets/am-best-a-tru-2026.webp';
const AM_BEST_SOURCE = 'https://www.pvi.com.vn/vi/news/bao-hiem-pvi-4-nam-lien-tiep-dat-a-xuat-sac-khi-noi-luc-tro-thanh-chuan-muc-quoc-te';
const AM_BEST_PRESS = 'https://dantri.com.vn/kinh-doanh/am-best-tai-xep-hang-tin-nhiem-a-cho-tong-cong-ty-bao-hiem-pvi-20250324170756606.htm';

/* 3. Công trình: mỗi ô là link tới bài báo/thông báo làm nguồn */
const PROJECTS = [
  { name: 'Lọc dầu Dung Quất', source: 'https://tapchicongthuong.vn/nha-may-loc-dau-dung-quat-34613.htm', img: 'loc-dau-dung-quat', alt: 'Toàn cảnh Nhà máy lọc dầu Dung Quất' },
  { name: 'Tổ hợp VinFast Hải Phòng', source: 'https://tapchicongthuong.vn/lien-danh-bao-hiem-trien-khai-chuong-trinh-bao-hiem-moi-rui-ro-tai-san-to-hop-nha-may-vinfast-hai-phong-140421.htm', img: 'vinfast-hai-phong', alt: 'Tòa nhà điều hành tổ hợp nhà máy VinFast Hải Phòng lúc hoàng hôn' },
  { name: 'Sân bay Long Thành', source: 'https://baodauthau.vn/lien-danh-6-thanh-vien-trung-goi-thau-bao-hiem-cang-hkqt-long-thanh-post136014.html', img: 'san-bay-long-thanh', alt: 'Phối cảnh thiết kế nhà ga hành khách Cảng hàng không quốc tế Long Thành', tag: 'Phối cảnh' },
  { name: 'Nhiệt điện Quảng Trạch I', source: 'https://mekongasean.vn/bao-hiem-pvi-vuot-113-chi-tieu-loi-nhuan-nam-chi-sau-9-thang-post28343.html', img: 'nhiet-dien-quang-trach-i', alt: 'Lễ ký hợp đồng gói thầu số 26 (BH03-QT1) bảo hiểm xây dựng Nhiệt điện Quảng Trạch I giữa EVN và liên danh do Bảo hiểm PVI đứng đầu' },
  { name: 'Nhiệt điện Thái Bình 2', source: 'https://www.tinnhanhchungkhoan.vn/pvi-bao-hiem-cho-nha-may-nhiet-dien-thai-binh-2-post37208.html', img: 'nhiet-dien-thai-binh-2', alt: 'Toàn cảnh Nhà máy Nhiệt điện Thái Bình 2 lúc hoàng hôn' },
  { name: 'Điện Vũng Áng 1', source: 'https://moit.gov.vn/tin-tuc/hoat-dong/le-ky-hop-dong-bao-hiem-van-hanh-nha-may-nhiet-dien-vung-ang2.html', img: 'dien-vung-ang-1', alt: 'Toàn cảnh Nhà máy Nhiệt điện Vũng Áng 1 bên bờ biển' },
  { name: 'Nhiệt điện Sông Hậu 1', source: 'https://baodauthau.vn/lien-danh-7-nha-thau-trung-goi-thau-bao-hiem-hon-138-ty-post150523.html', img: 'nhiet-dien-song-hau-1', alt: 'Toàn cảnh Nhà máy Nhiệt điện Sông Hậu 1 bên sông Hậu' },
  { name: 'Nhiệt điện Ô Môn IV', source: 'https://baodauthau.vn/chon-duoc-nha-thau-goi-thau-bao-hiem-gan-61-ty-tai-nha-may-nhiet-dien-o-mon-iv-post187511.html', img: 'nhiet-dien-o-mon-iv', alt: 'Ảnh chụp từ trên cao Trung tâm Điện lực Ô Môn, có đánh dấu vị trí Nhiệt điện Ô Môn IV' },
  { name: 'Đạm Cà Mau', source: 'https://baodauthau.vn/bao-hiem-pvi-trung-goi-thau-bao-hiem-van-hanh-nha-may-dam-ca-mau-post97895.html', img: 'dam-ca-mau', alt: 'Cán bộ, kỹ sư đi kiểm tra trong Nhà máy Đạm Cà Mau' },
  { name: 'Trực thăng Việt Nam (VNH)', source: 'https://thoibaotaichinhvietnam.vn/200-trieu-usd-bao-hiem-cho-doi-bay-truc-thang-3985.html', img: 'truc-thang-vnh', alt: 'Trực thăng mang màu sơn VNH tại lễ ký kết hợp đồng với AgustaWestland' },
];
const SLOGAN = 'Cùng tỷ lệ phí, tại sao không chọn doanh nghiệp tốt nhất?';

/* ── Hình học biểu đồ (giống why-pvi-market.tsx) ── */
const R = 70, CIRC = 2 * Math.PI * R, GAP = 2.5, POP = 10;
const pct = (n) => `${n.toFixed(2).replace('.', ',')}%`;
const TOTAL = SHARES.reduce((s, x) => s + x.value, 0);
let start = 0;
const ARCS = SHARES.map((s, i) => {
  const len = (s.value / TOTAL) * CIRC;
  const mid = ((start + len / 2) / CIRC) * 2 * Math.PI;
  const a = { ...s, i, len, offset: -start, dx: Math.cos(mid) * POP, dy: Math.sin(mid) * POP, mid };
  start += len;
  return a;
});
const br = (R + 26) / 200;
const BADGE = { left: `${(50 + Math.sin(ARCS[0].mid) * br * 100).toFixed(1)}%`, top: `${(50 - Math.cos(ARCS[0].mid) * br * 100).toFixed(1)}%` };
const f2 = (n) => n.toFixed(2);

const market = `<div class="wp-market" data-phase="done" data-pop>
<div class="wp-donut"><svg viewBox="0 0 200 200" role="img" aria-label="Thị phần bảo hiểm phi nhân thọ: ${esc(SHARES.map((s) => `${s.full || s.label} ${pct(s.value)}`).join(', '))}"><g transform="rotate(-90 100 100)" fill="none">
<circle class="wp-halo" cx="100" cy="100" r="${R}" stroke="${ARCS[0].color}" stroke-width="28" stroke-dasharray="${f2(Math.max(ARCS[0].len - GAP, 0))} ${f2(CIRC)}" stroke-dashoffset="${f2(ARCS[0].offset)}" style="transform:translate(${f2(ARCS[0].dx)}px,${f2(ARCS[0].dy)}px)"/>
${[...ARCS].reverse().map((a) => `<circle class="wp-slice" data-label="${esc(a.label)}" data-i="${a.i}" data-len="${f2(Math.max(a.len - GAP, 0))}" data-dx="${f2(a.dx)}" data-dy="${f2(a.dy)}" cx="100" cy="100" r="${R}" stroke="${a.color}" stroke-width="${a.label === 'PVI' ? 28 : 21}" stroke-dasharray="${f2(Math.max(a.len - GAP, 0))} ${f2(CIRC)}" stroke-dashoffset="${f2(a.offset)}"${a.label === 'PVI' ? ` style="transform:translate(${f2(a.dx)}px,${f2(a.dy)}px)"` : ''}/>`).join('\n')}
</g></svg>
<span class="wp-badge" style="left:${BADGE.left};top:${BADGE.top}" aria-hidden="true">#1</span>
<div class="wp-center" aria-hidden="true"><b>${pct(SHARES[0].value)}</b><span>PVI · #1</span></div></div>
<ul class="wp-legend">${SHARES.map((s, i) => `<li tabindex="0" data-label="${esc(s.label)}" data-value="${s.value}" data-full="${esc(s.full || s.label)}"${s.label === 'PVI' ? ' data-pvi' : ''} style="--d:${150 + i * 110}ms;--w:${Math.min((s.value / BAR_MAX) * 100, 100).toFixed(1)}%;--c:${s.color}"><i aria-hidden="true"></i><span${s.full ? ` title="${esc(s.full)}"` : ''}>${esc(s.label)}</span><b>${pct(s.value)}</b><em aria-hidden="true"></em></li>`).join('')}</ul>
</div>`;

const tile = (p, copy) => `<li class="wp-tile"${copy ? ' aria-hidden="true"' : ''}><a class="wp-tile-link" href="${p.source}" target="_blank" rel="noopener noreferrer"${copy ? ' tabindex="-1"' : ' title="Xem nguồn"'}><span class="wp-photo"><img src="/assets/cong-trinh/${p.img}.webp" width="352" height="208" loading="lazy" decoding="async" alt="${copy ? '' : esc(p.alt)}">${p.tag ? `<span class="wp-photo-tag">${esc(p.tag)}</span>` : ''}</span><span class="wp-tile-name">${esc(p.name)}</span></a></li>`;

const html = `<!-- why-pvi:start -->
<section class="why-pvi" id="ve-pvi" aria-labelledby="vi-sao-chon-pvi"><div class="wp-card">
<div class="wp-head"><small>VÌ SAO CHỌN PVI</small><h2 id="vi-sao-chon-pvi">Tại sao các doanh nghiệp lớn lựa chọn <span class="wp-brand-red">Bảo Hiểm PVI</span>?</h2></div>
<div class="wp-row">
<figure class="wp-figure wp-market-figure">${market}
<figcaption>Số 1 thị phần bảo hiểm phi nhân thọ<a href="${MARKET_SOURCE.href}" target="_blank" rel="noopener noreferrer">Nguồn: ${esc(MARKET_SOURCE.label)}</a></figcaption></figure>
<figure class="wp-figure"><a class="wp-cert" href="${AM_BEST_CERT}" target="_blank" rel="noopener"><img src="${AM_BEST_CERT}" width="960" height="737" loading="lazy" decoding="async" alt="Giấy chứng nhận AM Best: PVI Insurance Corporation được xếp hạng năng lực tài chính A− (Excellent), hiệu lực từ 19/03/2026"></a>
<figcaption>AM Best A− (Xuất sắc), 4 năm liên tiếp<span>Hiệu lực 19/03/2026</span><span class="wp-sources">Nguồn: <a href="${AM_BEST_SOURCE}" target="_blank" rel="noopener noreferrer">PVI</a> · <a href="${AM_BEST_PRESS}" target="_blank" rel="noopener noreferrer">Dân trí</a></span></figcaption></figure>
<div class="wp-projects"><div class="wp-strip" tabindex="0" aria-label="Công trình lớn PVI đã bảo hiểm. Dải tự chạy, di chuột để dừng; bấm vào từng công trình để xem nguồn."><ul class="wp-track">${PROJECTS.map((p) => tile(p, false)).join('')}${PROJECTS.map((p) => tile(p, true)).join('')}</ul></div>
<p class="wp-note">Công trình lớn PVI đã bảo hiểm (xây dựng hoặc vận hành), một số trong liên danh nhà bảo hiểm.</p>
<div class="wp-slogan"><div class="wp-slogan-track"><span>${esc(SLOGAN)}</span><span aria-hidden="true">${esc(SLOGAN)}</span></div></div></div>
</div></div></section>
<!-- why-pvi:end -->`;

let page = fs.readFileSync(FILE, 'utf8');
const re = /<!-- why-pvi:start -->[\s\S]*?<!-- why-pvi:end -->/;
if (re.test(page)) page = page.replace(re, html);
else {
  const old = /<section class="trust-block" id="ve-pvi"[\s\S]*?<\/section>/;
  if (!old.test(page)) throw new Error('Không tìm thấy khối #ve-pvi trong dist/index.html');
  page = page.replace(old, html);
}
if (!page.includes('src="/why-pvi.js"')) page = page.replace('<script src="/counters.js" defer></script>', '<script src="/why-pvi.js" defer></script>');
if (!page.includes('href="/why-pvi.css"')) page = page.replace('<link rel="stylesheet" href="/polish.css">', '<link rel="stylesheet" href="/polish.css"><link rel="stylesheet" href="/why-pvi.css">');
fs.writeFileSync(FILE, page);
console.log('wrote dist/index.html (why-pvi)', html.length);
