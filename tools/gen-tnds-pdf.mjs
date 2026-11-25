// Sinh file PDF "Biểu phí TNDS bắt buộc xe ô tô" cho nút tải ở /san-pham/bao-hiem-bat-buoc/#bieu-phi
// (chủ site yêu cầu 25/11/2026: PDF đẹp, có link về pvihcm.com để ai tải về cũng có đường dẫn về site).
// Số liệu lấy nguyên từ tools/data/tnds.mjs (cùng nguồn với bảng trên trang), không gõ tay.
// In bằng Chrome/Edge có sẵn trên máy (chế độ headless), không thêm thư viện. Chạy lại khi tnds.mjs đổi:
//   node tools/gen-tnds-pdf.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const tn = await import(pathToFileURL(path.join(ROOT, 'tools/data/tnds.mjs')).href);
export const TNDS_PDF = '/tai-lieu/pvi-bieu-phi-tnds-o-to-08-05-2026.pdf';

const SITE = 'https://pvihcm.com';
const PAGE = `${SITE}/san-pham/bao-hiem-bat-buoc/`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const vnd = (n) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;
const ref = tn.tndsReference;
const font = (w) => ['vietnamese', 'latin', 'latin-ext'].map((s) => `@font-face{font-family:BVP;font-weight:${w};font-display:block;src:url("${pathToFileURL(path.join(DIST, `fonts/bvp-${w}-${s}.woff2`)).href}") format("woff2")}`).join('');
const logo = fs.readFileSync(path.join(DIST, 'assets/pvi-logo.svg'), 'utf8').replace(/<\?xml[^>]*>/, '').replace(/<svg/, '<svg class="logo" aria-label="Bảo hiểm PVI"');

const table = (c) => `<section class="grp"><h2><span>${esc(c.label)}</span></h2><table><thead><tr><th>Loại xe</th><th class="num">Phí chưa VAT</th><th class="num">Tổng gồm VAT 10%</th></tr></thead><tbody>${c.usages.map((u) => `${c.usages.length > 1 || u.label !== c.label ? `<tr class="sub"><th colspan="3">${esc(u.label)}</th></tr>` : ''}${u.rows.map((r) => r.baseFee
  ? `<tr><td>${esc(r.label)}</td><td class="num">${vnd(r.baseFee)}</td><td class="num strong">${vnd(tn.feeWithVat(r.baseFee))}</td></tr>`
  : `<tr><td>${esc(r.label)}</td><td colspan="2" class="note">${esc(r.note || 'Theo quy định')}</td></tr>`).join('')}`).join('')}</tbody></table></section>`;

const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<title>Biểu phí bảo hiểm TNDS bắt buộc xe ô tô · Bảo hiểm PVI Thành Đô · pvihcm.com</title>
<meta name="author" content="Công ty Bảo hiểm PVI Thành Đô"><meta name="description" content="Biểu phí TNDS bắt buộc xe ô tô theo ${esc(ref.legalBasis)}. Tính phí và mua tại ${PAGE}">
<style>${[400, 500, 600, 700, 800].map(font).join('')}
@page{size:A4;margin:16mm 14mm 22mm}
*{box-sizing:border-box}html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font:400 10pt/1.5 BVP,Arial,sans-serif;color:#17212E}
a{color:#1F4A8C;text-decoration:none}
.top{display:flex;align-items:center;justify-content:space-between;padding-bottom:10px;border-bottom:2px solid #183665}
.brand{display:flex;align-items:center;gap:10px}.logo{height:34px;width:auto}
.brand b{font-weight:800;font-size:13pt;color:#183665;letter-spacing:-.01em}
.top .site{font-weight:700;font-size:10.5pt;color:#183665}.top .site small{display:block;font-weight:500;font-size:8pt;color:#586574;text-align:right}
.hero{margin:12px 0 10px;padding:14px 18px;border-radius:12px;background:linear-gradient(135deg,#183665 0%,#1F4A8C 100%);color:#fff;position:relative;overflow:hidden}
.hero:after{content:"";position:absolute;right:-40px;top:-40px;width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,.07)}
.eyebrow{font-weight:700;font-size:8pt;letter-spacing:.12em;text-transform:uppercase;color:#cfe0f7}
h1{margin:6px 0 6px;font-weight:800;font-size:20pt;line-height:1.15;letter-spacing:-.02em}
.hero p{margin:0;max-width:150mm;color:#e7eef9;font-size:9.5pt}
.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:0 0 10px}
.fact{border:1px solid #dbe3ec;border-radius:10px;padding:9px 12px;background:#F5F7F9}
.fact span{display:block;font-size:7.5pt;font-weight:600;color:#586574;text-transform:uppercase;letter-spacing:.06em}.fact b{font-weight:800;font-size:12pt;color:#183665}.fact small{font-size:8pt;color:#586574}
.grp{margin:0 0 9px;break-inside:auto}
.grp h2{margin:0 0 6px;font-size:11.5pt;font-weight:800;color:#183665;display:flex;align-items:center;gap:8px}
.grp h2:before{content:"";width:4px;height:14px;border-radius:2px;background:#CB2530}
table{width:100%;border-collapse:collapse;font-size:9pt}
thead th{background:#183665;color:#fff;font-weight:700;font-size:8pt;text-transform:uppercase;letter-spacing:.05em;padding:6px 10px;text-align:left}
thead th:first-child{border-radius:6px 0 0 0}thead th:last-child{border-radius:0 6px 0 0}
td{padding:3.2px 10px;border-bottom:1px solid #e6ecf2}tbody tr:nth-child(even) td{background:#FAFBFC}
tr{break-inside:avoid}.num{text-align:right;white-space:nowrap}.strong{font-weight:700;color:#183665}
tr.sub th{text-align:left;padding:7px 10px 5px;font-weight:700;color:#1F4A8C;background:#eef3f9;font-size:8.5pt}
.note{color:#586574;font-style:italic}
.cta{margin:14px 0 10px;display:grid;grid-template-columns:1.5fr 1fr;gap:10px;break-inside:avoid}
.cta .box{border-radius:12px;padding:14px 16px;border:1.5px solid #183665}
.cta .box.red{border-color:#CB2530;background:#fff5f5}
.cta h3{margin:0 0 4px;font-size:11pt;font-weight:800;color:#183665}.cta .red h3{color:#CB2530}
.cta p{margin:0 0 6px;font-size:9pt;color:#33475c}
.cta .url{display:inline-block;font-weight:700;font-size:10pt;color:#fff;background:#183665;padding:6px 12px;border-radius:999px}
.cta .tel{font-weight:800;font-size:14pt;color:#CB2530}
.fine{font-size:7.8pt;color:#586574;margin:8px 0 0;break-inside:avoid}
.fine b{color:#17212E}
.foot{position:fixed;bottom:-14mm;left:0;right:0;display:flex;justify-content:space-between;align-items:center;font-size:7.8pt;color:#586574;border-top:1px solid #dbe3ec;padding-top:5px}
.foot a{font-weight:700;color:#183665}
</style></head><body>
<div class="foot"><span>© ${new Date().getFullYear()} Công ty Bảo hiểm PVI Thành Đô · MST 0105402531-041</span><span>Tính phí và mua online: <a href="${PAGE}">pvihcm.com/san-pham/bao-hiem-bat-buoc</a></span></div>
<header class="top"><a class="brand" href="${SITE}/">${logo}<b>Thành Đô</b></a><a class="site" href="${SITE}/">pvihcm.com<small>Bảo hiểm PVI Thành Đô</small></a></header>
<section class="hero"><div class="eyebrow">${esc(ref.legalBasis)}</div>
<h1>Biểu phí bảo hiểm TNDS bắt buộc xe ô tô</h1>
<p>Phí một năm theo loại xe và mục đích sử dụng, tách phí chưa VAT và tổng phí đã gồm ${esc(ref.vat)}. Tính nhanh phí cho xe của bạn tại <a href="${PAGE}" style="color:#fff;font-weight:700;text-decoration:underline">pvihcm.com</a>.</p></section>
<div class="facts">${tn.tndsLimits.map((l) => `<div class="fact"><span>${esc(l.label)}</span><b>${esc(l.value)}</b> <small>${esc(l.note)}</small></div>`).join('')}<div class="fact"><span>Thuế GTGT</span><b>VAT 10%</b> <small>đã tính trong cột tổng</small></div></div>
${tn.tndsVehicleClasses.map(table).join('')}
<div class="cta"><div class="box"><h3>Tính phí đúng xe của bạn</h3><p>Chọn loại xe, số chỗ hoặc trọng tải, xem ngay phí chưa VAT và tổng phí, rồi đặt mua online.</p><a class="url" href="${PAGE}">pvihcm.com/san-pham/bao-hiem-bat-buoc</a></div>
<div class="box red"><h3>Tư vấn và mua qua Zalo</h3><p>Gửi ảnh cà vẹt xe, chuyên viên báo phí và cấp đơn.</p><a class="tel" href="tel:0938072236">0938 072 236</a><p style="margin:4px 0 0">Bồi thường 24/7: <a href="tel:1900545458"><b>1900 54 54 58</b></a></p></div></div>
<p class="fine"><b>Căn cứ:</b> ${esc(ref.legalBasis)}. ${esc(ref.updated)}. Phí trên là phí theo biểu quy định, cần đối chiếu thông tin trên giấy chứng nhận trước khi phát hành. Tổng phí làm tròn theo đồng, đã gồm ${esc(ref.vat)}.<br>
<b>Công ty Bảo hiểm PVI Thành Đô</b> (đơn vị thành viên Tổng Công ty Bảo hiểm PVI) · Tầng 12A, Tòa nhà 194 Golden Building, 473 Điện Biên Phủ, P. Thạnh Mỹ Tây, TP.HCM · <a href="mailto:giadinhpvi@gmail.com">giadinhpvi@gmail.com</a> · <a href="${SITE}/">https://pvihcm.com</a></p>
</body></html>`;

// Chỉ in PDF khi chạy trực tiếp; gen-products.mjs import file này chỉ để lấy đường dẫn TNDS_PDF.
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const browsers = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/usr/bin/google-chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].filter(Boolean);
  const chrome = browsers.find((b) => fs.existsSync(b));
  if (!chrome) throw new Error('Không tìm thấy Chrome/Edge; đặt biến CHROME_PATH.');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'tnds-pdf-'));
  const src = path.join(tmp, 'bieu-phi.html');
  fs.writeFileSync(src, html);
  const out = path.join(DIST, TNDS_PDF.slice(1));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=10000', '--run-all-compositor-stages-before-draw', `--user-data-dir=${path.join(tmp, 'profile')}`, `--print-to-pdf=${out}`, pathToFileURL(src).href], { stdio: 'ignore', timeout: 60000 });
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log('wrote', path.relative(ROOT, out), fs.statSync(out).size, 'byte');
}
