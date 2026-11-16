/* Trang Bảo hiểm vật chất xe: 3 bước (thông tin xe, điều khoản bổ sung, phí TNDS mua kèm) rồi gom thành
   tin nhắn gửi tư vấn viên qua Zalo. Chuyển từ vcx-builder.tsx của baohiempvi-vn (16/11/2026).
   Chưa tính phí vật chất xe: chờ biểu phí đã đối chiếu. Không lưu, không gửi dữ liệu đi đâu.
   HTML in sẵn đủ giá trị mặc định (tools/vcx-ui.mjs); file này chỉ gắn thao tác. */
import { carCatalogue, ZALO_TU_VAN } from './vcx-data.js';
import { passengerFeeForSeats, quoteTnds } from '../o-to/tnds-data.js';

const root = document.querySelector('[data-vcx]');
if (root) {
  const $ = (s) => root.querySelector(s);
  const f = (n) => root.querySelector(`[name="${n}"]`);
  const fmt = (n) => new Intl.NumberFormat('vi-VN').format(n);
  const USES0 = f('use').options[0].value;

  // Năm sản xuất: 21 năm tính từ năm hiện tại (HTML in sẵn theo năm sinh trang).
  const yearNow = new Date().getFullYear();
  if (Number(f('year').options[0].value) !== yearNow) {
    f('year').innerHTML = Array.from({ length: 21 }, (_, i) => `<option>${yearNow - i}</option>`).join('');
  }
  // Mua kèm TNDS bật sẵn khi khách chọn cả hai sản phẩm ở trang ô tô (?kem-tnds=1).
  if (new URLSearchParams(location.search).has('kem-tnds')) f('kemTnds').checked = true;

  let touched = false;
  let copied = false;

  const state = () => {
    const amount = Number(f('value').value.replace(/\D/g, ''));
    const picked = [...root.querySelectorAll('[name="clause"]:checked')].map((c) => c.value).sort();
    const src = passengerFeeForSeats(Number(f('seats').value), f('use').value !== USES0);
    const tnds = f('kemTnds').checked ? quoteTnds(src?.fee) : null;
    return { brand: f('brand').value.trim(), model: f('model').value.trim(), seats: f('seats').value, year: f('year').value, use: f('use').value, amount, picked, src, tnds };
  };
  const errorsOf = (s) => ({ brand: s.brand.length < 2, model: !s.model, value: s.amount < 50_000_000 });

  const models = $('#vcx-models');
  let lastBrand = null;
  const render = () => {
    const s = state();
    // Gợi ý dòng xe theo nhãn hiệu (không phân biệt hoa thường).
    const key = Object.keys(carCatalogue).find((b) => b.toLowerCase() === s.brand.toLowerCase()) ?? '';
    if (key !== lastBrand) { lastBrand = key; models.innerHTML = (carCatalogue[key] ?? []).map((m) => `<option value="${m}"></option>`).join(''); }
    // Lỗi chỉ hiện sau khi bấm gửi.
    const err = errorsOf(s);
    for (const k of ['brand', 'model', 'value']) {
      const show = touched && err[k];
      root.querySelector(`[data-err="${k}"]`).hidden = !show;
      f(k).setAttribute('aria-invalid', String(!!show));
    }
    root.querySelectorAll('.vcx-clause').forEach((l) => l.toggleAttribute('data-on', l.querySelector('input').checked));
    // Bước 3: phí TNDS theo số chỗ và mục đích sử dụng.
    const on = f('kemTnds').checked;
    $('.vcx-tndsFee').hidden = !(on && s.tnds && s.src);
    $('.vcx-tndsSrc').hidden = !on;
    if (s.tnds && s.src) {
      root.querySelector('[data-tnds="label"]').textContent = `Phí ${s.src.label}`;
      root.querySelector('[data-tnds="base"]').textContent = `${fmt(s.tnds.base)} đ`;
      root.querySelector('[data-tnds="vat"]').textContent = `${fmt(s.tnds.vat)} đ`;
      root.querySelector('[data-tnds="total"]').textContent = `${fmt(s.tnds.total)} đ`;
    }
    const car = `${s.brand} ${s.model}`.trim();
    root.querySelector('[data-sum="car"]').textContent = car || 'Xe của bạn';
    root.querySelector('[data-sum="line"]').textContent = `${s.seats} chỗ · ${s.year} · ${s.use} · ${s.amount ? `${fmt(s.amount)} đ` : 'chưa nhập giá trị'} · ĐKBS ${s.picked.length ? s.picked.join(', ') : 'không chọn'}${s.tnds ? ` · TNDS ${fmt(s.tnds.total)} đ` : ''}`;
    root.querySelector('[data-sum="note"]').textContent = copied ? 'Đã sao chép thông tin, dán vào Zalo để gửi.' : 'Thông tin được sao chép để bạn dán vào Zalo; trang không lưu dữ liệu.';
  };

  // Ô giá trị: hiện dấu chấm ngăn cách hàng nghìn khi gõ.
  f('value').addEventListener('input', () => {
    const n = Number(f('value').value.replace(/\D/g, ''));
    f('value').value = n ? fmt(n) : '';
  });
  root.addEventListener('input', render);
  root.addEventListener('change', render);

  const message = (s) => [
    'YÊU CẦU BÁO PHÍ BẢO HIỂM VẬT CHẤT XE',
    `Nhãn hiệu: ${s.brand || '(chưa nhập)'}`,
    `Dòng xe: ${s.model || '(chưa nhập)'}`,
    `Số chỗ: ${s.seats}`,
    `Năm sản xuất: ${s.year}`,
    `Mục đích: ${s.use}`,
    `Giá trị xe muốn bảo hiểm: ${s.amount ? fmt(s.amount) + ' đ' : '(chưa nhập)'}`,
    `Điều khoản bổ sung: ${s.picked.length ? s.picked.join(', ') : 'không chọn'}`,
    `Mua kèm TNDS bắt buộc: ${s.tnds ? `có, ${fmt(s.tnds.total)} đ gồm VAT` : 'không'}`,
  ].join('\n');

  root.querySelectorAll('[data-send]').forEach((btn) => btn.addEventListener('click', async () => {
    touched = true;
    const s = state();
    const err = errorsOf(s);
    if (err.brand || err.model || err.value) {
      render();
      const first = ['brand', 'model', 'value'].find((k) => err[k]);
      f(first).focus();
      return;
    }
    // Như bản gốc: sao chép trước (cần trang đang được chọn), rồi mở Zalo.
    try { await navigator.clipboard.writeText(message(s)); copied = true; } catch { copied = false; }
    render();
    window.open(ZALO_TU_VAN, '_blank', 'noopener');
  }));

  render();
}

// Mô hình 3D: chỉ tải khi khối sắp vào màn hình.
const viewer = document.querySelector('[data-vf7]');
if (viewer) {
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    io.disconnect();
    import('./vf7.js').then((m) => m.mount(viewer)).catch(() => {
      viewer.querySelector('.vcx-canvasNote').textContent = 'Thiết bị chưa hỗ trợ mô hình 3D.';
    });
  }, { rootMargin: '300px' });
  io.observe(viewer);
}
