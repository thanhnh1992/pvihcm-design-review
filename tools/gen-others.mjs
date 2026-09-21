// Dựng lại /huong-dan/ và /tai-nan-doanh-nghiep/ theo khung chung. Giữ nội dung gốc của trang,
// bỏ mọi câu "bản duyệt / dữ liệu giả", thay biểu mẫu thử bằng bản tóm tắt gửi qua Zalo.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { page, faqBlock, breadcrumbJsonLd, ZALO, hotline } from './chrome.mjs';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(HERE, '../dist');
const write = (rel, html) => { fs.writeFileSync(path.join(DIST, rel), html); console.log('wrote', rel, html.length); };

/* ── /huong-dan/ ── */
{
  const P = '/huong-dan/';
  const items = [
    { t: 'Bạn mua để giải quyết việc gì?', p: 'Chăm lo thêm cho nhân viên, chuẩn bị yêu cầu của khách hàng hay đáp ứng hồ sơ công trường? Nói rõ mục tiêu giúp tránh nhận một báo giá không giải quyết đúng việc.', q: 'Doanh nghiệp cần bảo hiểm cho khoảng 30 người làm việc tại kho, dự kiến hiệu lực từ tháng tới.', checks: [] },
    { t: 'Số người và biến động dự kiến', p: 'Chuẩn bị số người dự kiến tham gia và cho biết doanh nghiệp có thường xuyên bổ sung nhân sự hay không. Chưa cần gửi họ tên, giấy tờ tùy thân hoặc thông tin sức khỏe ở lần trao đổi đầu tiên.', checks: ['Đã xác định số người dự kiến', 'Đã ghi chú nhu cầu tăng giảm nhân sự'] },
    { t: 'Mô tả việc thật, không chỉ chức danh', p: '“Nhân viên” chưa đủ để hiểu rủi ro. Hãy chia theo công việc thực tế: văn phòng, vận hành máy, làm kho hoặc thi công. Những điều kiện đặc thù cần trao đổi rõ để được rà soát.', checks: ['Đã chia nhóm công việc chính', 'Đã ghi chú công việc hoặc môi trường đặc thù'] },
    { t: 'Ngày cần hiệu lực và người phụ trách', p: 'Xác định mốc cần bảo hiểm và người có thể bổ sung thông tin. Gửi yêu cầu hoặc nhận báo giá chưa có nghĩa là bảo hiểm đã có hiệu lực.', checks: ['Đã chọn ngày dự kiến và người liên hệ'] },
  ];
  const main = `
<section class="fire-hero"><div class="fire-wrap"><div class="fire-hero-copy">
<span class="fire-eyebrow">Checklist · Bảo hiểm nhân viên</span>
<h1>Trước khi hỏi báo phí, <em>HR cần chuẩn bị gì?</em></h1>
<p>Bốn nhóm thông tin giúp cuộc trao đổi đầu tiên đi đúng trọng tâm. Chưa cần gửi dữ liệu cá nhân của từng nhân viên.</p>
<div class="fire-actions"><a class="fire-btn fire-btn-red" href="#checklist">Xem checklist</a><button class="fire-btn fire-btn-line" id="print-button" type="button">In checklist</button></div>
</div><figure class="fire-hero-art"><img src="/assets/section-tai-nan.webp" width="1280" height="853" alt="Nhân sự doanh nghiệp chuẩn bị hồ sơ bảo hiểm cho nhân viên"></figure></div></section>

<section class="pd-section" id="checklist"><div class="fire-wrap">
<h2>Bắt đầu với số liệu tổng hợp</h2>
<p class="fire-lede" style="margin-top:12px">Mục tiêu mua, số người, nhóm công việc và ngày cần hiệu lực là điểm bắt đầu. Danh sách chi tiết chỉ bổ sung qua kênh phù hợp khi có yêu cầu cụ thể.</p>
<div class="pd-rows">${items.map((it, i) => `<article class="pd-row" style="grid-template-columns:80px minmax(0,1fr)"><div><span class="flag">${String(i + 1).padStart(2, '0')}</span></div><div><h3>${it.t}</h3><p>${it.p}</p>${it.q ? `<p class="fire-note" style="margin-top:12px">“${it.q}” <br>Tình huống minh họa, không phải hồ sơ khách hàng thật.</p>` : ''}${it.checks.map((c) => `<label class="pd-check"><input type="checkbox"> ${c}</label>`).join('')}</div></article>`).join('')}</div>
<div class="fire-alert"><b>Phạm vi hướng dẫn</b><p>Đây là checklist chuẩn bị trao đổi, không phải danh mục hồ sơ bắt buộc áp dụng cho mọi hợp đồng. Yêu cầu chính thức, phạm vi, quyền lợi và phí cần được xác nhận theo sản phẩm và hồ sơ cụ thể.</p></div>
</div></section>

<section class="fire-docs pd-paper"><div class="fire-wrap">
<span class="fire-eyebrow">Đã có thông tin cơ bản?</span>
<h2>Chuyển checklist thành bước tiếp theo</h2>
<p class="fire-lede" style="margin-top:12px">Xem bảng phí theo gói và số người, hoặc gửi thông tin qua Zalo để nhận phương án cho nhân viên.</p>
<div class="pd-cta"><a class="fire-btn fire-btn-red" href="/san-pham/bao-hiem-tai-nan/#tinh-phi">Tính phí tai nạn cho nhóm</a><a class="fire-btn fire-btn-line" href="/tai-nan-doanh-nghiep/#bao-gia">Gửi nhu cầu cho tư vấn viên</a></div>
</div></section>`;
  write('huong-dan/index.html', page({
    path: P,
    title: 'Checklist chuẩn bị hồ sơ bảo hiểm nhân viên cho HR | PVI Thành Đô',
    description: 'Bốn nhóm thông tin HR cần chuẩn bị trước khi hỏi báo phí bảo hiểm cho nhân viên: mục tiêu mua, số người, nhóm công việc và ngày cần hiệu lực.',
    image: '/assets/section-tai-nan.webp',
    head: breadcrumbJsonLd(P, 'Checklist cho HR'),
    main,
  }));
}

/* ── /tai-nan-doanh-nghiep/ ── */
{
  const P = '/tai-nan-doanh-nghiep/';
  const faqs = [
    { question: 'Chưa có danh sách đầy đủ có thể hỏi phương án không?', answer: 'Có thể bắt đầu với số người dự kiến và nhóm công việc. Danh sách cùng hồ sơ cần thiết sẽ được xác nhận ở bước tiếp theo.' },
    { question: 'Nhân viên làm công trường nên chọn mục nào?', answer: 'Chọn “Đáp ứng hồ sơ công trường” nếu mục tiêu là đáp ứng yêu cầu của dự án. Tư vấn viên cần kiểm tra loại bảo hiểm và yêu cầu hồ sơ cụ thể trước khi báo phương án.' },
    { question: 'Phí và quyền lợi được xác nhận khi nào?', answer: 'Sau khi thông tin và nhu cầu được làm rõ. Nội dung trang không thay thế báo giá, quy tắc, điều khoản hay hợp đồng được phát hành.' },
  ];
  const main = `
<section class="fire-hero"><div class="fire-wrap"><div class="fire-hero-copy">
<span class="fire-eyebrow">Dành cho HR và doanh nghiệp</span>
<h1>Chăm lo đội ngũ. <em>Bắt đầu từ đúng nhu cầu.</em></h1>
<p>Phương án tai nạn cho nhân viên theo danh sách. Làm rõ công việc, phạm vi và hồ sơ trước khi nhận báo phí.</p>
<div class="fire-actions"><a class="fire-btn fire-btn-red" href="#bao-gia">Nhận phương án cho nhân viên</a><a class="fire-btn fire-btn-line" href="/huong-dan/">Xem hồ sơ cần chuẩn bị</a></div>
</div><figure class="fire-hero-art"><img src="/assets/section-tai-nan.webp" width="1280" height="853" alt="Nhóm nhân sự doanh nghiệp trao đổi phương án bảo hiểm tai nạn"></figure></div></section>

<section class="fire-compare"><div class="fire-wrap">
<h2>Cùng là công nhân. Nhu cầu có thể khác.</h2>
<table><thead><tr><th scope="col"></th><th scope="col"><span>Tự nguyện</span>Chăm lo thêm cho nhân viên</th><th scope="col"><span>Theo yêu cầu dự án</span>Đáp ứng hồ sơ công trường</th></tr></thead><tbody>
<tr><th scope="row">Bắt đầu từ</th><td>Nhu cầu bảo hiểm tai nạn tự nguyện và phạm vi bảo vệ mong muốn.</td><td>Kiểm tra riêng yêu cầu bảo hiểm người lao động công trường. Không mặc định một gói tai nạn tự nguyện đáp ứng yêu cầu này.</td></tr>
<tr><th scope="row">Xem tiếp</th><td><a href="/san-pham/bao-hiem-tai-nan/#bang-phi" style="color:var(--blue);text-decoration:underline">Bảng phí theo gói và số người</a></td><td><a href="/san-pham/bao-hiem-tai-nan/#nha-thau" style="color:var(--blue);text-decoration:underline">Bảo hiểm cho nhà thầu thi công</a></td></tr>
</tbody></table>
</div></section>

<section class="fire-claim pd-paper"><div class="fire-wrap">
<span class="fire-eyebrow">Trước khi quyết định</span>
<h2>Ba điều cần làm rõ</h2>
<div class="fire-steps">
<article><b>01</b><h3>Ai được bảo hiểm?</h3><p>Số người, nhóm nghề và tính chất công việc thực tế.</p></article>
<article><b>02</b><h3>Bảo vệ trong phạm vi nào?</h3><p>Quyền lợi mong muốn, thời hạn và những trường hợp loại trừ cần hiểu.</p></article>
<article><b>03</b><h3>Danh sách thay đổi ra sao?</h3><p>Trao đổi cách bổ sung, giảm người và thủ tục áp dụng trong thời hạn hợp đồng.</p></article>
</div>
</div></section>

<section class="fire-tool" id="bao-gia" style="background:#fff"><div class="fire-wrap">
<h2>Đội ngũ của bạn. Phương án phù hợp.</h2>
<p class="fire-lede" style="margin-top:12px">Điền bốn ý dưới đây, trang sẽ gom thành một đoạn tóm tắt để anh/chị gửi qua Zalo hoặc đọc khi gọi. Chưa cần gửi danh sách nhân viên hoặc giấy tờ cá nhân ở bước này.</p>
<div class="pd-grid">
<div class="fire-panel"><form class="pd-form" id="need-form" novalidate>
<fieldset class="pd-field" style="border:0;padding:0;margin:0"><legend style="font-size:15px;font-weight:600;color:var(--ink);margin-bottom:6px">Mục tiêu của bạn</legend>
<label class="pd-check"><input type="radio" name="goal" value="Chăm lo nhân viên" checked> Chăm lo nhân viên</label>
<label class="pd-check"><input type="radio" name="goal" value="Đáp ứng hồ sơ công trường"> Đáp ứng hồ sơ công trường</label>
<label class="pd-check"><input type="radio" name="goal" value="Chưa rõ, cần tư vấn"> Chưa rõ, cần tư vấn</label></fieldset>
<label class="pd-field"><span>Số người dự kiến</span><input type="number" inputmode="numeric" min="1" max="100000" name="count" placeholder="Ví dụ: 30"></label>
<label class="pd-field"><span>Ngày cần hiệu lực</span><input type="date" name="date" style="width:100%;min-height:44px;padding:0 12px;font:inherit;font-size:16px;border:1px solid #cfdbe6;border-radius:10px"></label>
<label class="pd-field"><span>Nhóm công việc</span><input name="job" maxlength="120" placeholder="Ví dụ: văn phòng, thi công, vận hành kho" style="width:100%;min-height:44px;padding:0 12px;font:inherit;font-size:16px;border:1px solid #cfdbe6;border-radius:10px"></label>
<button class="fire-btn fire-btn-dark" type="submit">Tạo bản tóm tắt</button>
</form></div>
<div>
<div class="fire-total pd-result" id="need-result" tabindex="-1">
<div class="fire-total-rows"><p id="need-text" style="color:var(--ink);font-size:16px;line-height:1.7;white-space:pre-line">Bản tóm tắt sẽ hiện ở đây sau khi anh/chị bấm “Tạo bản tóm tắt”.</p></div>
<div class="fire-total-foot"><button class="fire-btn fire-btn-line" type="button" id="need-copy" style="color:var(--ink);border:1px solid #c9d6e3;background:#fff" disabled>Sao chép</button><a class="fire-btn fire-btn-red" href="${ZALO}" target="_blank" rel="noopener">Mở Zalo gửi tư vấn</a><a class="fire-btn fire-btn-line" href="tel:0938072236" style="color:var(--ink);border:1px solid #c9d6e3;background:#fff">Gọi 0938 072 236</a></div>
<p id="need-copied" role="status" style="padding:0 20px 14px;font-size:15px;color:#0a6b46"></p>
</div>
<p class="fire-note">Thông tin chỉ nằm trên máy của anh/chị để sao chép, trang không lưu và không tự gửi đi đâu.</p>
</div></div></div></section>

${faqBlock(faqs, 'Hiểu rõ rồi hãy quyết định')}`;
  write('tai-nan-doanh-nghiep/index.html', page({
    path: P,
    title: 'Bảo hiểm tai nạn cho nhân viên doanh nghiệp | PVI Thành Đô',
    description: 'Phương án bảo hiểm tai nạn cho nhân viên theo danh sách: phân biệt chăm lo nhân viên và hồ sơ công trường, ba điều cần làm rõ, gửi nhu cầu cho tư vấn viên qua Zalo.',
    image: '/assets/section-tai-nan.webp',
    head: breadcrumbJsonLd(P, 'Tai nạn cho doanh nghiệp'),
    main,
    scripts: '<script src="page.js" defer></script>',
  }));
  fs.writeFileSync(path.join(DIST, 'tai-nan-doanh-nghiep/page.js'), `/* Gom nhu cầu thành đoạn văn để khách tự gửi qua Zalo. Không lưu, không gửi đi đâu. */
(() => {
  const form = document.getElementById('need-form');
  if (!form) return;
  const out = document.getElementById('need-text'), copy = document.getElementById('need-copy'), done = document.getElementById('need-copied');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(form);
    const date = f.get('date') ? new Date(f.get('date') + 'T00:00').toLocaleDateString('vi-VN') : 'chưa xác định';
    out.textContent = 'Nhu cầu bảo hiểm tai nạn cho nhân viên\\n'
      + '• Mục tiêu: ' + f.get('goal') + '\\n'
      + '• Số người dự kiến: ' + (f.get('count') || 'chưa xác định') + '\\n'
      + '• Ngày cần hiệu lực: ' + date + '\\n'
      + '• Nhóm công việc: ' + (String(f.get('job') || '').trim() || 'chưa ghi');
    copy.disabled = false; done.textContent = '';
    document.getElementById('need-result').focus();
  });
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(out.textContent); done.textContent = 'Đã sao chép. Mở Zalo và dán vào khung chat.'; }
    catch { done.textContent = 'Trình duyệt chặn sao chép, anh/chị bôi đen đoạn trên để sao chép.'; }
  });
})();
`);
  console.log('wrote tai-nan-doanh-nghiep/page.js');
}
