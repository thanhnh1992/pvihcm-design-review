// Trang BHYT hộ gia đình và BHXH tự nguyện: /san-pham/bao-hiem-y-te/ (chủ site giao 21/11/2026).
// PVI Thành Đô là đơn vị thu BHXH, BHYT do cơ quan BHXH ủy quyền; đăng ký online cho khách ở mọi phường TP.HCM,
// có biên lai thu, chuyển khoản vào tài khoản công ty. Thẻ BHYT, sổ BHXH do cơ quan BHXH cấp.
// Số liệu: tools/data/bhyt.mjs (một nguồn cho trang, bảng và bộ tính dist/bhyt/tinh-phi.js).
// Chạy: node tools/gen-bhyt.mjs, rồi node tools/gen-san-pham.mjs, node tools/gen-search.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { page, esc, faqJsonLd, breadcrumbJsonLd, SITE, ORG_ID, ZALO } from './chrome.mjs';
import {
  LUONG_CO_SO, EFFECTIVE, RATE, STEPS, TERMS, perMonth, TN_RATE, TN_MIN, TN_MAX, TN_SUPPORT, TN_TERMS, TN_SAMPLES,
  PVI_THANH_DO, DIEM_THU, SOURCES,
} from './data/bhyt.mjs';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const P = '/san-pham/bao-hiem-y-te/';
const MA_NHAN_VIEN_THU = 'NV••••••••6029';
const vnd = (n) => Math.round(n).toLocaleString('vi-VN').replace(/,/g, '.') + ' đ';
const pct = (x) => `${String(Math.round(x * 1000) / 10).replace('.', ',')}%`;
const ORD = ['Người thứ nhất', 'Người thứ hai', 'Người thứ ba', 'Người thứ tư', 'Từ người thứ năm'];
const first = perMonth(0);
const tnMonth = (income, support) => Math.round(income * TN_RATE) - support;
const tnLowest = tnMonth(TN_MIN, TN_SUPPORT[0].amount);

const pic = (name, w, h, sizes, alt, { eager = false, widths = [480, 800] } = {}) =>
  `<img src="/assets/${name}-800.webp" srcset="${widths.map((x) => `/assets/${name}-${x}.webp ${x}w`).join(', ')}, /assets/${name}.webp ${w}w" sizes="${sizes}" width="${w}" height="${h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'} alt="${esc(alt)}">`;
const IMG_DIEM_THU = pic('diem-thu-bhxh-bhyt-pvi-thanh-do', 960, 890, '(max-width:860px) 100vw, 460px', 'Bảng điểm thu bảo hiểm xã hội, bảo hiểm y tế do Công ty Bảo hiểm PVI Thành Đô tổ chức tại số 37 Đường số 2', { eager: true });

const faqs = [
  { question: 'Mua BHYT hộ gia đình một người bao nhiêu tiền?', answer: `Từ ${EFFECTIVE}, người thứ nhất trong hộ đóng 4,5% mức tham chiếu ${vnd(LUONG_CO_SO)}, tức ${vnd(first * 3)} cho 3 tháng, ${vnd(first * 6)} cho 6 tháng, ${vnd(first * 12)} cho 12 tháng.` },
  { question: 'Hộ 4 người đóng BHYT bao nhiêu một năm?', answer: `Người thứ hai, thứ ba, thứ tư đóng lần lượt 70%, 60%, 50% mức của người thứ nhất. Hộ 4 người đóng ${vnd((perMonth(0) + perMonth(1) + perMonth(2) + perMonth(3)) * 12)} cho 12 tháng.` },
  { question: 'BHXH tự nguyện đóng thấp nhất bao nhiêu?', answer: `Thu nhập chọn đóng thấp nhất là ${vnd(TN_MIN)}/tháng, mức đóng 22% là ${vnd(TN_MIN * TN_RATE)}. Người tham gia thông thường được Nhà nước hỗ trợ ${vnd(TN_SUPPORT[0].amount)}/tháng, nên tự đóng ${vnd(tnLowest)}/tháng.` },
  { question: 'Ở phường khác của TP.HCM có đăng ký được không?', answer: 'Được. Công ty Bảo hiểm PVI Thành Đô nhận đăng ký online cho khách ở mọi phường trên địa bàn TP. Hồ Chí Minh, thanh toán chuyển khoản vào tài khoản công ty và có biên lai thu.' },
  { question: 'Mức đóng tăng giữa kỳ đã đóng thì có phải đóng thêm không?', answer: 'Không. Người đã đóng theo kỳ 3, 6 hoặc 12 tháng không phải đóng bổ sung khi mức tham chiếu thay đổi, và cũng không được hoàn phần chênh lệch cho thời gian đã đóng.' },
  { question: 'Thẻ bảo hiểm y tế do ai cấp?', answer: 'Thẻ do cơ quan Bảo hiểm xã hội cấp. Công ty Bảo hiểm PVI Thành Đô là đơn vị thu được cơ quan BHXH ủy quyền: nhận hồ sơ, thu tiền đóng, cấp biên lai và hướng dẫn thủ tục.' },
];

const calcRows = (n, months) => Array.from({ length: n }, (_, i) => ({ who: i < 4 ? ORD[i] : `Người thứ ${i + 1}`, sum: perMonth(i) * months }));
const rows0 = calcRows(1, 12);
const tn0 = { income: 3000000, sup: TN_SUPPORT[0], k: 12 };
const tn0m = tnMonth(tn0.income, tn0.sup.amount);

const main = `
<article class="bh">
<section class="bh-hero">
  <div class="bh-wrap bh-hero-grid">
    <div class="bh-hero-copy">
      <p class="bh-kicker">BHYT hộ gia đình · BHXH tự nguyện · TP. Hồ Chí Minh</p>
      <h1>Bảo hiểm y tế hộ gia đình và BHXH tự nguyện tại TP.HCM</h1>
      <p class="bh-lead bh-collector">Mã nhân viên thu BHXH, BHYT của anh Khoa <a href="#ma-nhan-vien-thu-khoa">${MA_NHAN_VIEN_THU}</a></p>
      <p class="bh-lead">Công ty Bảo hiểm PVI Thành Đô là đơn vị thu BHXH, BHYT được cơ quan Bảo hiểm xã hội ủy quyền. Khách ở mọi phường TP.HCM đăng ký online, chuyển khoản vào tài khoản công ty và nhận biên lai thu.</p>
      <ul class="bh-facts">
        <li><b>${vnd(first * 12)}</b><span>BHYT người thứ nhất, 12 tháng</span></li>
        <li><b>Từ ${vnd(tnLowest)}</b><span>BHXH tự nguyện mỗi tháng</span></li>
        <li><b>Online</b><span>mọi phường TP.HCM, có biên lai</span></li>
      </ul>
      <div class="bh-cta"><a class="bh-btn bh-btn-main" href="#tinh-phi">Tính tiền đóng BHYT</a><a class="bh-btn bh-btn-line" href="#bhxh-tu-nguyen">Tính BHXH tự nguyện</a></div>
    </div>
    <figure class="bh-hero-photo">${IMG_DIEM_THU}<figcaption>Bảng điểm thu BHXH, BHYT ghi rõ đơn vị tổ chức là Công ty Bảo hiểm PVI Thành Đô, kèm logo Bảo hiểm xã hội Việt Nam.</figcaption></figure>
  </div>
</section>

<section class="bh-sec" id="tinh-phi" aria-labelledby="tinh-phi-h">
  <div class="bh-wrap">
    <h2 id="tinh-phi-h">Tính tiền đóng BHYT hộ gia đình</h2>
    <p class="bh-sub">Chọn số người trong hộ cần đóng và kỳ đóng. Kết quả theo mức tham chiếu ${vnd(LUONG_CO_SO)} áp dụng từ ${EFFECTIVE}.</p>
    <div class="bh-calc" data-bhyt-calc>
      <div class="bh-calc-in">
        <div class="bh-field"><span class="bh-label" id="bh-n-l">Số người trong hộ cần đóng</span>
          <div class="bh-stepper" role="group" aria-labelledby="bh-n-l"><button type="button" data-step="-1" aria-label="Bớt 1 người">−</button><output id="bh-n" aria-live="polite">1</output><button type="button" data-step="1" aria-label="Thêm 1 người">+</button></div>
        </div>
        <fieldset class="bh-field bh-terms"><legend class="bh-label">Kỳ đóng</legend>
          ${TERMS.map((k) => `<label><input type="radio" name="bh-term" value="${k}"${k === 12 ? ' checked' : ''}><span>${k} tháng</span></label>`).join('')}
        </fieldset>
      </div>
      <div class="bh-calc-out" aria-live="polite">
        <p class="bh-total-l">Tổng tiền đóng <span data-ctx>(1 người · 12 tháng)</span></p>
        <p class="bh-total" data-total>${vnd(rows0[0].sum)}</p>
        <ul class="bh-break" data-break>${rows0.map((r) => `<li><span>${r.who}</span><b>${vnd(r.sum)}</b></li>`).join('')}</ul>
        <a class="bh-btn bh-btn-main bh-btn-full" href="${ZALO}" target="_blank" rel="noopener">Đăng ký online qua Zalo</a>
      </div>
    </div>
    <p class="bh-note">Số tiền theo bảng mục 3 Thông báo 3508/TB-BHXH của BHXH TP. Hồ Chí Minh. Số chính thức theo biên lai thu khi đóng.</p>
  </div>
</section>

<section class="bh-sec bh-sec-alt" id="muc-dong" aria-labelledby="muc-dong-h">
  <div class="bh-wrap bh-two">
    <div>
      <h2 id="muc-dong-h">Mức đóng BHYT hộ gia đình từ ${EFFECTIVE}</h2>
      <p class="bh-sub">Người thứ nhất đóng ${pct(RATE)} mức tham chiếu mỗi tháng. Người thứ hai, thứ ba, thứ tư đóng lần lượt 70%, 60%, 50% mức của người thứ nhất. Từ người thứ năm trở đi đóng 40%.</p>
      <div class="bh-table" role="region" aria-label="Bảng mức đóng BHYT hộ gia đình" tabindex="0"><table>
        <thead><tr><th scope="col">Thành viên hộ</th><th scope="col">3 tháng</th><th scope="col">6 tháng</th><th scope="col">12 tháng</th></tr></thead>
        <tbody>${STEPS.map((s, i) => `<tr><th scope="row">${ORD[i]} (${Math.round(s * 100)}%)</th><td>${vnd(perMonth(i) * 3)}</td><td>${vnd(perMonth(i) * 6)}</td><td><b>${vnd(perMonth(i) * 12)}</b></td></tr>`).join('')}</tbody>
      </table></div>
      <p class="bh-note">Học sinh, sinh viên đóng BHYT tại trường theo nhóm học sinh, sinh viên, không đóng theo hộ gia đình. Đã đóng theo kỳ thì khi mức tham chiếu thay đổi không phải đóng bổ sung, không được hoàn chênh lệch.</p>
    </div>
    <figure class="bh-photo">${pic('mau-the-bhyt', 1200, 960, '(max-width:860px) 100vw, 440px', 'Mẫu thẻ bảo hiểm y tế do Bảo hiểm xã hội Việt Nam cấp, đã che thông tin cá nhân')}<figcaption>Thẻ bảo hiểm y tế do Bảo hiểm xã hội Việt Nam cấp. Ảnh thẻ thật, đã che toàn bộ thông tin cá nhân.</figcaption></figure>
  </div>
</section>

<section class="bh-sec" id="bhxh-tu-nguyen" aria-labelledby="bhxh-h">
  <div class="bh-wrap">
    <h2 id="bhxh-h">BHXH tự nguyện: tự chọn thu nhập, Nhà nước hỗ trợ một phần</h2>
    <p class="bh-sub">Người tham gia đóng 22% mức thu nhập tự chọn, từ ${vnd(TN_MIN)} đến ${vnd(TN_MAX)} mỗi tháng. Nhà nước hỗ trợ một khoản cố định theo nhóm người tham gia, tối đa 10 năm (120 tháng).</p>
    <div class="bh-calc" data-tn-calc>
      <div class="bh-calc-in">
        <div class="bh-field"><label class="bh-label" for="tn-income">Thu nhập chọn đóng (đồng/tháng)</label>
          <input class="bh-input" id="tn-income" type="number" inputmode="numeric" min="${TN_MIN}" max="${TN_MAX}" step="100000" value="${tn0.income}">
          <p class="bh-hint">Từ ${vnd(TN_MIN)} đến ${vnd(TN_MAX)}.</p></div>
        <div class="bh-field"><label class="bh-label" for="tn-group">Nhóm người tham gia</label>
          <select class="bh-input" id="tn-group">${TN_SUPPORT.map((s) => `<option value="${s.id}">${esc(s.label)} (hỗ trợ ${vnd(s.amount)}/tháng)</option>`).join('')}</select></div>
        <fieldset class="bh-field bh-terms"><legend class="bh-label">Kỳ đóng</legend>
          ${TN_TERMS.map((k) => `<label><input type="radio" name="tn-term" value="${k}"${k === 12 ? ' checked' : ''}><span>${k === 1 ? 'Hằng tháng' : `${k} tháng`}</span></label>`).join('')}
        </fieldset>
      </div>
      <div class="bh-calc-out" aria-live="polite">
        <p class="bh-total-l">Tiền tự đóng <span data-tn-ctx>(${tn0.k} tháng)</span></p>
        <p class="bh-total" data-tn-total>${vnd(tn0m * tn0.k)}</p>
        <ul class="bh-break">
          <li><span>Mức đóng 22% mỗi tháng</span><b data-tn-full>${vnd(tn0.income * TN_RATE)}</b></li>
          <li><span>Nhà nước hỗ trợ mỗi tháng</span><b data-tn-sup>− ${vnd(tn0.sup.amount)}</b></li>
          <li><span>Tự đóng mỗi tháng</span><b data-tn-month>${vnd(tn0m)}</b></li>
        </ul>
        <a class="bh-btn bh-btn-main bh-btn-full" href="${ZALO}" target="_blank" rel="noopener">Đăng ký online qua Zalo</a>
      </div>
    </div>
    <div class="bh-table bh-table-mt" role="region" aria-label="Bảng mức đóng BHXH tự nguyện cho người tham gia khác" tabindex="0"><table>
      <thead><tr><th scope="col">Thu nhập chọn đóng</th><th scope="col">Đóng 22%</th><th scope="col">Tự đóng 1 tháng</th><th scope="col">Tự đóng 12 tháng</th></tr></thead>
      <tbody>${TN_SAMPLES.map((x) => `<tr><th scope="row">${vnd(x)}</th><td>${vnd(x * TN_RATE)}</td><td>${vnd(tnMonth(x, TN_SUPPORT[0].amount))}</td><td><b>${vnd(tnMonth(x, TN_SUPPORT[0].amount) * 12)}</b></td></tr>`).join('')}</tbody>
    </table></div>
    <p class="bh-note">Bảng tính cho nhóm người tham gia khác (hỗ trợ ${vnd(TN_SUPPORT[0].amount)}/tháng). Người thuộc nhiều nhóm hỗ trợ thì được hỗ trợ theo mức cao nhất. Nguồn: mục 5 Thông báo 3508/TB-BHXH.</p>
  </div>
</section>

<section class="bh-sec bh-sec-alt" id="quyen-loi" aria-labelledby="quyen-loi-h">
  <div class="bh-wrap">
    <h2 id="quyen-loi-h">Quyền lợi khi tham gia BHXH tự nguyện</h2>
    <div class="bh-cards">
      <article><h3>Hưu trí</h3><p>Đóng từ 15 năm BHXH và đủ tuổi nghỉ hưu để nhận lương hưu hằng tháng. Nữ: 15 năm hưởng 45%, mỗi năm thêm 2%, tối đa 75%. Nam: 15 năm hưởng 40%, đến năm 20 đạt 45%, sau đó mỗi năm thêm 2%, tối đa 75%. Người hưởng lương hưu được cấp thẻ BHYT, mức hưởng 95%.</p></article>
      <article><h3>Thai sản</h3><p>Từ 01/7/2025, lao động nữ sinh con hoặc lao động nam có vợ sinh con được trợ cấp 2 triệu đồng mỗi con. Điều kiện là đóng BHXH tự nguyện từ đủ 6 tháng trong 12 tháng trước khi sinh.</p></article>
      <article><h3>Tử tuất</h3><p>Khi người tham gia qua đời, gia đình được trợ cấp mai táng bằng 10 lần mức tham chiếu và trợ cấp tuất một lần tính theo thời gian đóng.</p></article>
    </div>
    <div class="bh-gallery">
      <figure>${pic('bhxh-tu-nguyen-quyen-loi', 1280, 1280, '(max-width:860px) 100vw, 560px', 'Ảnh thông tin quyền lợi khi tham gia BHXH tự nguyện: hưu trí, thai sản, tử tuất')}<figcaption>Ba chế độ của BHXH tự nguyện.</figcaption></figure>
      <figure>${pic('bhxh-tu-nguyen-thai-san', 1024, 1801, '(max-width:860px) 100vw, 560px', 'Ảnh thông tin của Bảo hiểm xã hội Việt Nam về chế độ trợ cấp thai sản trong BHXH tự nguyện từ 01/7/2025')}<figcaption>Trợ cấp thai sản trong BHXH tự nguyện. Nguồn: Bảo hiểm xã hội Việt Nam.</figcaption></figure>
    </div>
  </div>
</section>

<section class="bh-sec" id="cac-buoc" aria-labelledby="cac-buoc-h">
  <div class="bh-wrap">
    <h2 id="cac-buoc-h">Đăng ký online tại PVI Thành Đô trong 3 bước</h2>
    <ol class="bh-steps">
      <li><b>01</b><h3>Gửi thông tin</h3><p>Nhắn Zalo hoặc gọi 0938 072 236, gửi họ tên, số căn cước của từng người và kỳ đóng. Với BHXH tự nguyện, cho biết thêm mức thu nhập chọn đóng.</p></li>
      <li><b>02</b><h3>Chuyển khoản</h3><p>Nhân viên kê khai theo mẫu của cơ quan BHXH và báo số tiền. Khách chuyển khoản vào tài khoản của Công ty Bảo hiểm PVI Thành Đô.</p></li>
      <li><b>03</b><h3>Nhận biên lai</h3><p>Khách nhận biên lai thu của đơn vị thu. Thẻ BHYT, quá trình đóng BHXH do cơ quan Bảo hiểm xã hội cấp và cập nhật, tra cứu được trên ứng dụng VssID.</p></li>
    </ol>
  </div>
</section>

<section class="bh-sec bh-sec-alt" id="don-vi-thu" aria-labelledby="don-vi-thu-h">
  <div class="bh-wrap bh-two bh-two-top">
    <div>
    <h2 id="don-vi-thu-h">PVI Thành Đô là đơn vị thu BHXH, BHYT được ủy quyền</h2>
    <p>Bảo hiểm xã hội Việt Nam và Tổng công ty Bảo hiểm PVI ký Hợp đồng ủy quyền thu BHXH, BHYT số 02/2022/BHXHVN-PVI ngày 19/5/2022. Các công ty thành viên của PVI tổ chức thu theo địa bàn do cơ quan BHXH giao. Công ty Bảo hiểm PVI Thành Đô nhận đăng ký online cho khách ở mọi phường trên địa bàn TP. Hồ Chí Minh.</p>
    <p>Đơn vị thu nhận hồ sơ, thu tiền đóng, cấp biên lai và hướng dẫn thủ tục. Thẻ BHYT do cơ quan Bảo hiểm xã hội cấp, quyền lợi theo Luật Bảo hiểm y tế và Luật Bảo hiểm xã hội.</p>
    <dl class="bh-dl">
      <div><dt>Đơn vị thu</dt><dd>${esc(PVI_THANH_DO.name)}</dd></div>
      <div><dt>Trụ sở</dt><dd>${esc(PVI_THANH_DO.address)}</dd></div>
      <div><dt>Điểm thu trực tiếp</dt><dd>${esc(DIEM_THU.address)}</dd></div>
      <div><dt>Đăng ký online, tư vấn</dt><dd><a href="tel:0938072236">0938 072 236</a> · <a href="${ZALO}" target="_blank" rel="noopener">Zalo</a></dd></div>
      <div><dt>Tổng đài hỗ trợ của BHXH</dt><dd><a href="tel:19009068">${DIEM_THU.bhxhHotline}</a></dd></div>
    </dl>
    </div>
    <figure class="bh-photo" id="ma-nhan-vien-thu-khoa" tabindex="-1">${pic('the-nhan-vien-thu-bhxh', 1200, 685, '(max-width:860px) 100vw, 460px', 'Thẻ nhân viên thu bảo hiểm xã hội, bảo hiểm y tế do Bảo hiểm xã hội TP. Hồ Chí Minh cấp, đã che số căn cước công dân')}<figcaption><b>Thẻ nhân viên thu BHXH, BHYT của Nguyễn Vũ Anh Khoa, số ${MA_NHAN_VIEN_THU}</b>, do Bảo hiểm xã hội TP. Hồ Chí Minh cấp, thời hạn từ ngày 10/12/2025. Đã che số căn cước công dân.</figcaption></figure>
  </div>
</section>

<section class="bh-sec" id="cau-hoi" aria-labelledby="cau-hoi-h">
  <div class="bh-wrap bh-narrow">
    <h2 id="cau-hoi-h">Câu hỏi thường gặp</h2>
    <div class="bh-faq">${faqs.map((f) => `<details><summary>${esc(f.question)}</summary><p>${esc(f.answer)}</p></details>`).join('')}</div>
    <h2 id="nguon" class="bh-h-small">Căn cứ</h2>
    <ul class="bh-src">${SOURCES.map(([n, o]) => `<li><b>${esc(n)}</b><span>${esc(o)}</span></li>`).join('')}</ul>
  </div>
</section>
</article>`;

const service = (id, name, serviceType, description) => ({
  '@type': 'Service', '@id': SITE + P + '#' + id, name, serviceType, description,
  provider: { '@id': ORG_ID }, areaServed: { '@type': 'City', name: 'Thành phố Hồ Chí Minh' }, url: SITE + P,
});
const head = `<link rel="stylesheet" href="/bhyt.css">${breadcrumbJsonLd(P, 'BHYT hộ gia đình, BHXH tự nguyện')}<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    service('bhyt', 'Thu bảo hiểm y tế hộ gia đình tại TP. Hồ Chí Minh', 'Đơn vị thu BHXH, BHYT', `Đăng ký online BHYT hộ gia đình cho khách ở mọi phường TP.HCM. Mức đóng theo mức tham chiếu ${LUONG_CO_SO} đồng từ ${EFFECTIVE}.`),
    service('bhxh-tu-nguyen', 'Thu bảo hiểm xã hội tự nguyện tại TP. Hồ Chí Minh', 'Đơn vị thu BHXH, BHYT', `Đóng 22% thu nhập tự chọn từ ${TN_MIN} đến ${TN_MAX} đồng/tháng, Nhà nước hỗ trợ theo nhóm.`),
  ],
}).replace(/</g, '\\u003c')}</script>${faqJsonLd(faqs)}`;

const html = page({
  path: P,
  title: 'BHYT hộ gia đình, BHXH tự nguyện TP.HCM 2026 | PVI Thành Đô',
  description: `Mức đóng từ ${EFFECTIVE}: BHYT hộ gia đình ${vnd(first * 12)}/năm người thứ nhất, BHXH tự nguyện từ ${vnd(tnLowest)}/tháng. Đăng ký online mọi phường TP.HCM, có biên lai.`,
  image: '/assets/product-covers/bao-hiem-y-te.jpg',
  bodyClass: 'fire bh-page',
  head,
  main,
  scripts: '<script src="/bhyt/tinh-phi.js" defer></script>',
});
fs.mkdirSync(path.join(DIST, 'san-pham/bao-hiem-y-te'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'san-pham/bao-hiem-y-te/index.html'), html);

const months = STEPS.map((_, i) => perMonth(i));
fs.mkdirSync(path.join(DIST, 'bhyt'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'bhyt/tinh-phi.js'), `/* Bộ tính BHYT hộ gia đình và BHXH tự nguyện, sinh từ tools/gen-bhyt.mjs (số liệu tools/data/bhyt.mjs). Không sửa tay. */
(() => {
  const vnd = (n) => Math.round(n).toLocaleString('vi-VN').replace(/,/g, '.') + ' đ';
  const box = document.querySelector('[data-bhyt-calc]');
  if (box) {
    const M = ${JSON.stringify(months)};
    const ORD = ${JSON.stringify(ORD.slice(0, 4))};
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
  }
  const tn = document.querySelector('[data-tn-calc]');
  if (tn) {
    const SUP = ${JSON.stringify(Object.fromEntries(TN_SUPPORT.map((s) => [s.id, s.amount])))};
    const MIN = ${TN_MIN}, MAX = ${TN_MAX}, RATE = ${TN_RATE};
    const inc = tn.querySelector('#tn-income');
    const render = () => {
      let x = Number(inc.value) || MIN;
      const clamped = Math.min(MAX, Math.max(MIN, x));
      const k = Number((tn.querySelector('input[name="tn-term"]:checked') || {}).value || 12);
      const sup = SUP[tn.querySelector('#tn-group').value] || 0;
      const full = Math.round(clamped * RATE), m = full - sup;
      tn.querySelector('[data-tn-full]').textContent = vnd(full);
      tn.querySelector('[data-tn-sup]').textContent = '− ' + vnd(sup);
      tn.querySelector('[data-tn-month]').textContent = vnd(m);
      tn.querySelector('[data-tn-total]').textContent = vnd(m * k);
      tn.querySelector('[data-tn-ctx]').textContent = '(' + (k === 1 ? '1 tháng' : k + ' tháng') + (clamped !== x ? ' · thu nhập tính trong khung ' + vnd(MIN) + ' đến ' + vnd(MAX) : '') + ')';
    };
    tn.addEventListener('input', render);
    tn.addEventListener('change', () => { const x = Number(inc.value); if (x && (x < MIN || x > MAX)) inc.value = Math.min(MAX, Math.max(MIN, x)); render(); });
    render();
  }
})();
`);
console.log('wrote san-pham/bao-hiem-y-te/index.html, bhyt/tinh-phi.js');
