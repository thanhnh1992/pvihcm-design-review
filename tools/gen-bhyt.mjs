// Trang Bảo hiểm y tế hộ gia đình: /san-pham/bao-hiem-y-te/ (chủ site giao 21/11/2026).
// PVI Thành Đô là điểm thu BHXH, BHYT do cơ quan BHXH ủy quyền; thẻ BHYT do cơ quan BHXH cấp.
// Số liệu: tools/data/bhyt.mjs (một nguồn duy nhất cho trang, bảng mức đóng và bộ tính dist/bhyt/tinh-phi.js).
// Chạy: node tools/gen-bhyt.mjs, rồi node tools/gen-san-pham.mjs, node tools/gen-search.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { page, esc, faqJsonLd, breadcrumbJsonLd, SITE, ORG_ID } from './chrome.mjs';
import { LUONG_CO_SO, EFFECTIVE, RATE, STEPS, TERMS, perMonth, DIEM_THU, SOURCES } from './data/bhyt.mjs';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const P = '/san-pham/bao-hiem-y-te/';
const vnd = (n) => Math.round(n).toLocaleString('vi-VN').replace(/,/g, '.') + ' đ';
const pct = (x) => `${String(Math.round(x * 1000) / 10).replace('.', ',')}%`;
const ORD = ['Người thứ nhất', 'Người thứ hai', 'Người thứ ba', 'Người thứ tư', 'Từ người thứ năm'];
const first = perMonth(0);

const IMG = 'diem-thu-bhxh-bhyt-pvi-thanh-do';
const photo = (sizes, eager = false) => `<img src="/assets/${IMG}-800.webp" srcset="/assets/${IMG}-480.webp 480w, /assets/${IMG}-800.webp 800w, /assets/${IMG}.webp 960w" sizes="${sizes}" width="960" height="890" ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'} alt="Bảng điểm thu bảo hiểm xã hội, bảo hiểm y tế do Công ty Bảo hiểm PVI Thành Đô tổ chức tại số 37 Đường số 2">`;

const faqs = [
  { question: `Mua BHYT hộ gia đình một người bao nhiêu tiền?`, answer: `Từ ${EFFECTIVE}, người thứ nhất trong hộ đóng 4,5% lương cơ sở ${vnd(LUONG_CO_SO)}, tức ${vnd(first)} mỗi tháng, ${vnd(first * 12)} cho 12 tháng.` },
  { question: 'Hộ 4 người đóng bao nhiêu một năm?', answer: `Người thứ hai, thứ ba, thứ tư đóng lần lượt 70%, 60%, 50% mức của người thứ nhất. Hộ 4 người đóng ${vnd((perMonth(0) + perMonth(1) + perMonth(2) + perMonth(3)) * 12)} cho 12 tháng.` },
  { question: 'Có được đóng 3 tháng hoặc 6 tháng không?', answer: 'Có. Hộ gia đình đóng theo kỳ 3 tháng, 6 tháng hoặc 12 tháng.' },
  { question: 'Lương cơ sở tăng giữa kỳ đã đóng thì có phải đóng thêm không?', answer: 'Không. Người đã đóng theo kỳ 3, 6 hoặc 12 tháng không phải đóng bổ sung khi lương cơ sở hoặc mức đóng thay đổi, và cũng không được hoàn phần chênh lệch cho thời gian đã đóng.' },
  { question: 'Thẻ bảo hiểm y tế do ai cấp?', answer: 'Thẻ do cơ quan Bảo hiểm xã hội cấp. Công ty Bảo hiểm PVI Thành Đô là tổ chức dịch vụ thu được cơ quan BHXH ủy quyền: nhận hồ sơ, thu tiền đóng và hướng dẫn thủ tục.' },
];

const calcRows = (n, months) => Array.from({ length: n }, (_, i) => ({ who: i < 4 ? ORD[i] : `Người thứ ${i + 1}`, m: perMonth(i), sum: perMonth(i) * months }));
const n0 = 1, k0 = 12;
const rows0 = calcRows(n0, k0);

const main = `
<article class="bh">
<section class="bh-hero">
  <div class="bh-wrap bh-hero-grid">
    <div class="bh-hero-copy">
      <p class="bh-kicker">Bảo hiểm y tế hộ gia đình · TP. Hồ Chí Minh</p>
      <h1>Bảo hiểm y tế hộ gia đình tại TP.HCM</h1>
      <p class="bh-lead">Đóng bảo hiểm y tế cho cả nhà tại điểm thu BHXH, BHYT của Công ty Bảo hiểm PVI Thành Đô. Mức đóng tính theo lương cơ sở ${vnd(LUONG_CO_SO)} từ ${EFFECTIVE}, người thứ hai trở đi được giảm.</p>
      <ul class="bh-facts">
        <li><b>${vnd(first * 12)}</b><span>người thứ nhất, 12 tháng</span></li>
        <li><b>Giảm đến 60%</b><span>từ người thứ hai trở đi</span></li>
        <li><b>3, 6, 12 tháng</b><span>chọn kỳ đóng</span></li>
      </ul>
      <div class="bh-cta"><a class="bh-btn bh-btn-main" href="#tinh-phi">Tính tiền đóng cho cả nhà</a><a class="bh-btn bh-btn-line" href="tel:0938072236">Gọi 0938 072 236</a></div>
    </div>
    <figure class="bh-hero-photo">${photo('(max-width:860px) 100vw, 460px', true)}<figcaption>Bảng điểm thu BHXH, BHYT tại số 37 Đường số 2 ghi rõ đơn vị tổ chức là Công ty Bảo hiểm PVI Thành Đô, kèm logo Bảo hiểm xã hội Việt Nam.</figcaption></figure>
  </div>
</section>

<section class="bh-sec" id="tinh-phi" aria-labelledby="tinh-phi-h">
  <div class="bh-wrap">
    <h2 id="tinh-phi-h">Tính tiền đóng BHYT hộ gia đình</h2>
    <p class="bh-sub">Chọn số người trong hộ cần đóng và kỳ đóng. Kết quả tính theo lương cơ sở ${vnd(LUONG_CO_SO)} áp dụng từ ${EFFECTIVE}.</p>
    <div class="bh-calc" data-bhyt-calc>
      <div class="bh-calc-in">
        <div class="bh-field"><span class="bh-label" id="bh-n-l">Số người trong hộ cần đóng</span>
          <div class="bh-stepper" role="group" aria-labelledby="bh-n-l"><button type="button" data-step="-1" aria-label="Bớt 1 người">−</button><output id="bh-n" aria-live="polite">${n0}</output><button type="button" data-step="1" aria-label="Thêm 1 người">+</button></div>
        </div>
        <fieldset class="bh-field bh-terms"><legend class="bh-label">Kỳ đóng</legend>
          ${TERMS.map((k) => `<label><input type="radio" name="bh-term" value="${k}"${k === k0 ? ' checked' : ''}><span>${k} tháng</span></label>`).join('')}
        </fieldset>
      </div>
      <div class="bh-calc-out" aria-live="polite">
        <p class="bh-total-l">Tổng tiền đóng <span data-ctx>(${n0} người · ${k0} tháng)</span></p>
        <p class="bh-total" data-total>${vnd(rows0.reduce((a, r) => a + r.sum, 0))}</p>
        <ul class="bh-break" data-break>${rows0.map((r) => `<li><span>${r.who}</span><b>${vnd(r.sum)}</b></li>`).join('')}</ul>
        <a class="bh-btn bh-btn-main bh-btn-full" href="tel:0938072236">Gọi để đóng tại PVI Thành Đô</a>
      </div>
    </div>
    <p class="bh-note">Số tiền tham khảo theo công thức của Nghị định 188/2025/NĐ-CP. Số chính thức theo biên lai của điểm thu khi đóng.</p>
  </div>
</section>

<section class="bh-sec bh-sec-alt" id="muc-dong" aria-labelledby="muc-dong-h">
  <div class="bh-wrap">
    <h2 id="muc-dong-h">Mức đóng BHYT hộ gia đình từ ${EFFECTIVE}</h2>
    <p class="bh-sub">Người thứ nhất đóng ${pct(RATE)} lương cơ sở mỗi tháng. Người thứ hai, thứ ba, thứ tư đóng lần lượt 70%, 60%, 50% mức của người thứ nhất. Từ người thứ năm trở đi đóng 40%.</p>
    <div class="bh-table" role="region" aria-label="Bảng mức đóng BHYT hộ gia đình" tabindex="0"><table>
      <thead><tr><th scope="col">Thành viên</th><th scope="col">Tỷ lệ</th><th scope="col">1 tháng</th><th scope="col">3 tháng</th><th scope="col">6 tháng</th><th scope="col">12 tháng</th></tr></thead>
      <tbody>${STEPS.map((s, i) => `<tr><th scope="row">${ORD[i]}</th><td>${i ? `${Math.round(s * 100)}% người thứ nhất` : `${pct(RATE)} lương cơ sở`}</td><td>${vnd(perMonth(i))}</td><td>${vnd(perMonth(i) * 3)}</td><td>${vnd(perMonth(i) * 6)}</td><td><b>${vnd(perMonth(i) * 12)}</b></td></tr>`).join('')}</tbody>
    </table></div>
    <p class="bh-note">Lương cơ sở ${vnd(LUONG_CO_SO)} theo Nghị định 161/2026/NĐ-CP. Đã đóng theo kỳ thì khi lương cơ sở thay đổi không phải đóng bổ sung, không được hoàn chênh lệch.</p>
  </div>
</section>

<section class="bh-sec" id="diem-thu" aria-labelledby="diem-thu-h">
  <div class="bh-wrap">
    <div class="bh-narrow">
      <h2 id="diem-thu-h">PVI Thành Đô là điểm thu BHXH, BHYT được ủy quyền</h2>
      <p>Bảo hiểm xã hội Việt Nam và Tổng công ty Bảo hiểm PVI ký Hợp đồng ủy quyền thu BHXH, BHYT số 02/2022/BHXHVN-PVI ngày 19/5/2022. Theo đó, các công ty thành viên của PVI tổ chức điểm thu theo địa bàn do cơ quan BHXH giao. Công ty Bảo hiểm PVI Thành Đô tổ chức điểm thu tại TP. Hồ Chí Minh.</p>
      <p>Điểm thu nhận hồ sơ, thu tiền đóng và hướng dẫn thủ tục. Thẻ bảo hiểm y tế do cơ quan Bảo hiểm xã hội cấp, quyền lợi khám chữa bệnh theo Luật Bảo hiểm y tế.</p>
      <dl class="bh-dl">
        <div><dt>Địa chỉ điểm thu</dt><dd>${esc(DIEM_THU.address)}</dd></div>
        <div><dt>Tư vấn, hẹn đóng</dt><dd><a href="tel:0938072236">0938 072 236</a></dd></div>
        <div><dt>Tổng đài hỗ trợ của BHXH</dt><dd><a href="tel:19009068">${DIEM_THU.bhxhHotline}</a></dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="bh-sec bh-sec-alt" id="luu-y" aria-labelledby="luu-y-h">
  <div class="bh-wrap">
    <h2 id="luu-y-h">Ai đóng theo hộ gia đình, cần lưu ý gì</h2>
    <div class="bh-cards">
      <article><h3>Thành viên chưa có thẻ ở nhóm khác</h3><p>Hộ gia đình đóng cho các thành viên chưa tham gia bảo hiểm y tế qua nhóm khác, như người lao động có hợp đồng, học sinh, sinh viên hoặc nhóm được ngân sách đóng. Người đã có thẻ ở nhóm khác thì không tính vào hộ.</p></article>
      <article><h3>Thứ tự người được giảm</h3><p>Mức giảm tính theo thứ tự người tham gia trong cùng hộ: người thứ nhất đóng đủ, người thứ hai trở đi đóng thấp hơn. Đăng ký cùng lúc cho cả nhà giúp hưởng đủ mức giảm.</p></article>
      <article><h3>Chọn kỳ đóng phù hợp</h3><p>Hộ gia đình đóng theo kỳ 3, 6 hoặc 12 tháng. Đóng 12 tháng thì không phải gia hạn nhiều lần trong năm.</p></article>
    </div>
  </div>
</section>

<section class="bh-sec" id="cac-buoc" aria-labelledby="cac-buoc-h">
  <div class="bh-wrap">
    <h2 id="cac-buoc-h">Đóng BHYT tại PVI Thành Đô trong 3 bước</h2>
    <ol class="bh-steps">
      <li><b>01</b><h3>Gọi hoặc nhắn trước</h3><p>Gọi 0938 072 236 để nhân viên kiểm tra số người, kỳ đóng và giấy tờ cần mang.</p></li>
      <li><b>02</b><h3>Đến điểm thu</h3><p>Mang căn cước của từng người cần đóng đến điểm thu tại số 37 Đường số 2. Nhân viên hướng dẫn kê khai theo mẫu của cơ quan BHXH.</p></li>
      <li><b>03</b><h3>Đóng tiền, nhận biên lai</h3><p>Đóng tiền theo kỳ đã chọn và giữ biên lai. Thẻ bảo hiểm y tế do cơ quan Bảo hiểm xã hội cấp theo hồ sơ đã nộp.</p></li>
    </ol>
  </div>
</section>

<section class="bh-sec bh-sec-alt" id="cau-hoi" aria-labelledby="cau-hoi-h">
  <div class="bh-wrap">
    <h2 id="cau-hoi-h">Câu hỏi thường gặp</h2>
    <div class="bh-faq">${faqs.map((f) => `<details><summary>${esc(f.question)}</summary><p>${esc(f.answer)}</p></details>`).join('')}</div>
    <h2 id="nguon" class="bh-h-small">Căn cứ</h2>
    <ul class="bh-src">${SOURCES.map(([n, o]) => `<li><b>${esc(n)}</b><span>${esc(o)}</span></li>`).join('')}</ul>
  </div>
</section>
</article>`;

const head = `<link rel="stylesheet" href="/bhyt.css">${breadcrumbJsonLd(P, 'Bảo hiểm y tế hộ gia đình')}<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Service', '@id': SITE + P + '#service',
  name: 'Thu bảo hiểm y tế hộ gia đình tại TP. Hồ Chí Minh', serviceType: 'Điểm thu BHXH, BHYT',
  description: `Điểm thu BHXH, BHYT của Công ty Bảo hiểm PVI Thành Đô. Mức đóng BHYT hộ gia đình theo lương cơ sở ${LUONG_CO_SO} đồng từ ${EFFECTIVE}.`,
  provider: { '@id': ORG_ID }, areaServed: { '@type': 'City', name: 'Thành phố Hồ Chí Minh' }, url: SITE + P,
  image: SITE + `/assets/${IMG}.webp`,
}).replace(/</g, '\\u003c')}</script>${faqJsonLd(faqs)}`;

const html = page({
  path: P,
  title: 'Bảo hiểm y tế hộ gia đình TP.HCM: mức đóng 2026 | PVI Thành Đô',
  description: `Mức đóng BHYT hộ gia đình từ ${EFFECTIVE}: người thứ nhất ${vnd(first)}/tháng, giảm từ người thứ hai. Đóng tại điểm thu BHXH, BHYT của PVI Thành Đô, TP.HCM.`,
  image: '/assets/product-covers/bao-hiem-y-te.jpg',
  bodyClass: 'fire bh-page',
  head,
  main,
  scripts: '<script src="/bhyt/tinh-phi.js" defer></script>',
});
fs.mkdirSync(path.join(DIST, 'san-pham/bao-hiem-y-te'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'san-pham/bao-hiem-y-te/index.html'), html);

// Bộ tính: số liệu lấy từ tools/data/bhyt.mjs, không gõ lại.
const months = STEPS.map((_, i) => perMonth(i));
fs.mkdirSync(path.join(DIST, 'bhyt'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'bhyt/tinh-phi.js'), `/* Bộ tính BHYT hộ gia đình, sinh từ tools/gen-bhyt.mjs (số liệu tools/data/bhyt.mjs). Không sửa tay. */
(() => {
  const box = document.querySelector('[data-bhyt-calc]');
  if (!box) return;
  const M = ${JSON.stringify(months)};
  const ORD = ${JSON.stringify(ORD.slice(0, 4))};
  const vnd = (n) => Math.round(n).toLocaleString('vi-VN').replace(/,/g, '.') + ' đ';
  const out = box.querySelector('#bh-n');
  let n = 1;
  const render = () => {
    const k = Number((box.querySelector('input[name="bh-term"]:checked') || {}).value || 12);
    out.textContent = n;
    const rows = Array.from({ length: n }, (_, i) => ({ who: i < 4 ? ORD[i] : 'Người thứ ' + (i + 1), sum: M[Math.min(i, M.length - 1)] * k }));
    box.querySelector('[data-total]').textContent = vnd(rows.reduce((a, r) => a + r.sum, 0));
    box.querySelector('[data-ctx]').textContent = '(' + n + ' người · ' + k + ' tháng)';
    box.querySelector('[data-break]').innerHTML = rows.map((r) => '<li><span>' + r.who + '</span><b>' + vnd(r.sum) + '</b></li>').join('');
    box.querySelector('[data-step="-1"]').disabled = n <= 1;
    box.querySelector('[data-step="1"]').disabled = n >= 10;
  };
  box.addEventListener('click', (e) => { const b = e.target.closest('[data-step]'); if (!b) return; n = Math.min(10, Math.max(1, n + Number(b.dataset.step))); render(); });
  box.addEventListener('change', render);
  render();
})();
`);
console.log('wrote san-pham/bao-hiem-y-te/index.html, bhyt/tinh-phi.js');
