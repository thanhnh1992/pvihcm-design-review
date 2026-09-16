/* Widget "Tư vấn & báo giá" — chuyển nguyên từ SupportAdvisor của baohiempvi-vn
   sang JS thuần cho site tĩnh.

   KHÔNG phải chat: không nhân viên trực, không bong bóng hội thoại giả, không ô
   nhập tin, không trạng thái online, không thu dữ liệu cá nhân. Chỉ dẫn khách
   tới đúng trang sản phẩm hoặc đúng đầu mối.

   Số liên hệ (chủ site chốt, chỉ áp dụng trong widget):
     0938 072 236  — tư vấn cá nhân và Zalo
     0918 981 869  — doanh nghiệp và công trình (cùng người phụ trách với 0938)
     1900 54 54 58 — CHỈ cho bồi thường

   Khác bản gốc duy nhất ở đường dẫn: mọi link nội bộ trỏ về trang có thật trên
   pvihcm. Sản phẩm chưa có trang riêng thì chỉ có nút Zalo và nút gọi. */
(() => {
  const ZALO_URL = 'https://zalo.me/2076363329232219188?src=qr&f=1';
  const PERSONAL_PHONE = '0938 072 236';
  const BUSINESS_PHONE = '0918 981 869';
  const BUSINESS_TEL = 'tel:0918981869';
  const CLAIMS_PHONE = '1900 54 54 58';
  const CLAIMS_TEL = 'tel:1900545458';

  const personalZalo = (label) => ({ kind: 'contact', label, detail: PERSONAL_PHONE, href: ZALO_URL, dest: 'zalo' });
  const businessCall = (label) => ({ kind: 'contact', label, detail: BUSINESS_PHONE, href: BUSINESS_TEL, dest: 'phone' });
  const page = (kind, label, href) => ({ kind, label, href, dest: 'page' });

  const products = {
    'tnds-o-to': {
      intent: 'personal', menuLabel: 'TNDS bắt buộc ô tô', title: 'Bảo hiểm TNDS bắt buộc ô tô',
      description: 'Kiểm tra loại xe, mục đích sử dụng và thông tin cần thiết trước khi phát hành.',
      actions: [page('primary', 'Xem bảo hiểm bắt buộc', '/san-pham/bao-hiem-bat-buoc/'), personalZalo('Nhắn Zalo tư vấn xe')],
    },
    'tai-nan-ca-nhan': {
      intent: 'personal', menuLabel: 'Bảo hiểm tai nạn cá nhân 24/24', title: 'Bảo hiểm tai nạn cá nhân 24/24',
      description: 'Bảo vệ trước rủi ro tai nạn cho cá nhân và gia đình, tư vấn theo độ tuổi và công việc.',
      actions: [page('primary', 'Xem bảo hiểm tai nạn', '/san-pham/bao-hiem-tai-nan/'), personalZalo('Nhắn Zalo tư vấn cá nhân')],
    },
    'suc-khoe': {
      intent: 'personal', menuLabel: 'Bảo hiểm chăm sóc sức khỏe', title: 'Bảo hiểm chăm sóc sức khỏe',
      description: 'Chương trình được tư vấn theo độ tuổi, lịch sử tham gia và nhu cầu nội trú, ngoại trú.',
      actions: [personalZalo('Nhắn Zalo tư vấn cá nhân')],
    },
    'tai-nan-doanh-nghiep': {
      intent: 'business', menuLabel: 'Tai nạn 24/24 cho doanh nghiệp', title: 'Bảo hiểm tai nạn cho danh sách nhân sự',
      description: 'Chuẩn bị số lượng người, nhóm nghề, thời hạn và danh sách nhân sự để kiểm tra trước khi báo phí.',
      zaloMessage: 'Tôi cần báo phí bảo hiểm tai nạn cho danh sách nhân sự doanh nghiệp.',
      actions: [
        { kind: 'primary', label: 'Gửi danh sách nhân sự', href: ZALO_URL, dest: 'zalo' },
        page('secondary', 'Xem tai nạn doanh nghiệp', '/tai-nan-doanh-nghiep/'),
        businessCall('Gọi tư vấn doanh nghiệp'),
      ],
    },
    'chay-no': {
      intent: 'business', menuLabel: 'Bảo hiểm cháy nổ bắt buộc', title: 'Kiểm tra cơ sở và hồ sơ cháy nổ',
      description: 'Tra cứu loại cơ sở, hồ sơ cần chuẩn bị và các dữ liệu cần thiết trước khi báo phí.',
      actions: [page('primary', 'Kiểm tra cơ sở và hồ sơ', '/san-pham/chay-no-bat-buoc/#tra-cuu'), businessCall('Gọi tư vấn doanh nghiệp')],
    },
    'cong-trinh': {
      intent: 'business', menuLabel: 'Bảo hiểm công trình và lắp đặt', title: 'Bảo hiểm công trình và lắp đặt',
      description: 'Chuẩn bị hợp đồng, dự toán, tiến độ và phạm vi thi công để lập phương án cho từng công trình.',
      actions: [businessCall('Gọi tư vấn công trình'), personalZalo('Nhắn Zalo gửi hồ sơ công trình')],
    },
    'tai-san': {
      intent: 'business', menuLabel: 'Bảo hiểm tài sản doanh nghiệp', title: 'Bảo hiểm tài sản doanh nghiệp',
      description: 'Chuẩn bị danh mục nhà xưởng, máy móc, hàng hóa và đặc điểm rủi ro của từng địa điểm.',
      actions: [businessCall('Gọi tư vấn doanh nghiệp'), personalZalo('Nhắn Zalo gửi danh mục tài sản')],
    },
    'hang-hoa': {
      intent: 'business', menuLabel: 'Bảo hiểm hàng hóa xuất nhập khẩu', title: 'Bảo hiểm hàng hóa xuất nhập khẩu',
      description: 'Chuẩn bị thông tin lô hàng, tuyến vận chuyển và điều kiện giao hàng để được kiểm tra phương án.',
      actions: [page('primary', 'Xem hồ sơ lô hàng cần chuẩn bị', '/san-pham/hang-hoa-xuat-nhap-khau/'), businessCall('Gọi tư vấn hàng hóa')],
    },
  };

  const audiences = [
    { intent: 'personal', label: 'Xe và bảo hiểm cá nhân', description: 'TNDS ô tô, bảo hiểm tai nạn cá nhân và chăm sóc sức khỏe.' },
    { intent: 'business', label: 'Doanh nghiệp và công trình', description: 'Tai nạn nhân sự, cháy nổ, tài sản, hàng hóa và bảo hiểm công trình.' },
    { intent: 'claims', label: 'Bồi thường / xử lý sự cố', description: 'Hướng dẫn việc cần làm và liên hệ đúng đầu mối hỗ trợ bồi thường.' },
  ];

  const productLists = {
    personal: { main: ['tnds-o-to', 'tai-nan-ca-nhan', 'suc-khoe'], more: [] },
    business: { main: ['tai-nan-doanh-nghiep', 'chay-no', 'cong-trinh'], more: ['tai-san', 'hang-hoa'] },
  };

  const accidentChoices = [
    { product: 'tai-nan-ca-nhan', label: 'Tai nạn cá nhân', description: 'Cho bản thân hoặc gia đình.' },
    { product: 'tai-nan-doanh-nghiep', label: 'Tai nạn doanh nghiệp', description: 'Cho danh sách nhân sự của doanh nghiệp.' },
  ];

  const claims = {
    title: 'Hỗ trợ bồi thường và xử lý sự cố',
    warning: 'Ưu tiên bảo đảm an toàn cho người và tài sản trước khi thực hiện các bước tiếp theo.',
    actions: [
      { kind: 'primary', claims: true, label: 'Gọi hỗ trợ bồi thường 24/7', detail: CLAIMS_PHONE, href: CLAIMS_TEL, dest: 'phone' },
      page('secondary', 'Xem hướng dẫn xử lý sự cố', '/#boi-thuong'),
    ],
  };

  const START = { name: 'AUDIENCE' };
  const back = (s) => {
    if (s.name === 'ACTIONS') return s.via === 'accident'
      ? { name: 'ACCIDENT', selected: s.product }
      : { name: 'PRODUCT', intent: products[s.product].intent, selected: s.product };
    if (s.name === 'PRODUCT') return { name: 'AUDIENCE', selected: s.intent };
    if (s.name === 'CLAIMS') return { name: 'AUDIENCE', selected: 'claims' };
    return START;
  };

  /* Mở thẳng vào ngữ cảnh của trang đang xem; trang khác về bước chọn nhóm. */
  const contextRoutes = {
    '/san-pham/bao-hiem-tai-nan': { name: 'ACCIDENT' },
    '/tai-nan-doanh-nghiep': { name: 'ACTIONS', product: 'tai-nan-doanh-nghiep', via: 'list' },
    '/san-pham/chay-no-bat-buoc': { name: 'ACTIONS', product: 'chay-no', via: 'list' },
    '/san-pham/hang-hoa-xuat-nhap-khau': { name: 'ACTIONS', product: 'hang-hoa', via: 'list' },
  };
  const initialStep = () => contextRoutes[location.pathname.replace(/\/+$/, '')] || START;

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const icon = {
    chat: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.2-.6L3 21l1.8-4.6A8.3 8.3 0 0 1 3.6 11.5a8.4 8.4 0 0 1 9-8.4 8.4 8.4 0 0 1 8.4 8.4Z"/></svg>',
    close: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    left: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></svg>',
    right: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>',
    phone: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6.4 3h3l1.5 4-2.1 1.5a12 12 0 0 0 5.7 5.7L16 12.1l4 1.5v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4 6.2 2 2 0 0 1 6.4 3Z"/></svg>',
    ext: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-8.5 8.5M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/></svg>',
    copy: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></svg>',
  };

  /* ── Nút mở ── */
  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.className = 'adv-launcher';
  launcher.setAttribute('aria-haspopup', 'dialog');
  launcher.setAttribute('aria-expanded', 'false');
  launcher.setAttribute('aria-label', 'Mở tư vấn và báo giá');
  launcher.innerHTML = icon.chat + '<span class="adv-long">Tư vấn &amp; báo giá</span><span class="adv-short">Tư vấn</span>';
  document.body.appendChild(launcher);

  let backdrop = null;
  let step = START;

  const option = (key, label, desc, selected, focus, compact) =>
    `<button type="button" class="adv-option${compact ? ' adv-compact' : ''}" data-opt="${esc(key)}"${selected ? ' aria-current="true"' : ''}${focus ? ' data-autofocus' : ''}>`
    + `<span><b>${esc(label)}</b><small>${esc(desc)}</small></span>${icon.right}</button>`;

  const action = (a, focus) => {
    const tone = a.kind === 'primary' ? (a.claims ? 'adv-a-claims' : 'adv-a-primary') : a.kind === 'secondary' ? 'adv-a-secondary' : 'adv-a-contact';
    const ext = a.dest === 'zalo';
    const tail = a.dest === 'phone' ? icon.phone : ext ? icon.ext : icon.right;
    return `<a class="adv-action ${tone}" href="${esc(a.href)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}${a.dest === 'page' ? ' data-internal' : ''}${focus ? ' data-autofocus' : ''}>`
      + `<span><span class="adv-a-label">${esc(a.label)}</span>${a.detail ? `<span class="adv-a-detail">${esc(a.detail)}</span>` : ''}</span>`
      + tail + (ext ? '<span class="adv-sr">(mở tab mới)</span>' : '') + '</a>';
  };

  function stepHtml() {
    if (step.name === 'AUDIENCE') {
      const fi = Math.max(0, audiences.findIndex((x) => x.intent === step.selected));
      return '<h3 class="adv-step">Chọn nhóm nhu cầu</h3><div class="adv-options">'
        + audiences.map((x, i) => option('i:' + x.intent, x.label, x.description, x.intent === step.selected, i === fi)).join('') + '</div>';
    }
    if (step.name === 'PRODUCT') {
      const list = productLists[step.intent];
      const all = list.main.concat(list.more);
      const focusId = step.selected && all.includes(step.selected) ? step.selected : all[0];
      let h = '<h3 class="adv-step">Chọn sản phẩm cần tìm hiểu</h3><div class="adv-options">'
        + list.main.map((id) => option('p:' + id, products[id].menuLabel, products[id].description, id === step.selected, id === focusId)).join('') + '</div>';
      if (list.more.length) {
        h += '<p class="adv-group">Sản phẩm khác</p><div class="adv-options">'
          + list.more.map((id) => option('p:' + id, products[id].menuLabel, products[id].description, id === step.selected, id === focusId, true)).join('') + '</div>';
      }
      return h;
    }
    if (step.name === 'ACCIDENT') {
      const focusId = step.selected || accidentChoices[0].product;
      return '<h3 class="adv-step">Bảo hiểm tai nạn 24/24 cho ai?</h3><div class="adv-options">'
        + accidentChoices.map((x) => option('a:' + x.product, x.label, x.description, x.product === step.selected, x.product === focusId)).join('') + '</div>';
    }
    if (step.name === 'CLAIMS') {
      return `<h3 class="adv-step">${esc(claims.title)}</h3><p class="adv-warning" role="note">${esc(claims.warning)}</p>`
        + '<div class="adv-actions">' + claims.actions.map((a, i) => action(a, i === 0)).join('') + '</div>';
    }
    const p = products[step.product];
    let h = `<h3 class="adv-step">${esc(p.title)}</h3><p class="adv-text">${esc(p.description)}</p>`;
    if (p.zaloMessage) {
      h += `<div class="adv-hint"><p class="adv-hint-label">Nội dung gợi ý khi nhắn Zalo</p><p class="adv-hint-text">${esc(p.zaloMessage)}</p>`
        + `<button type="button" class="adv-copy" data-copy="${esc(p.zaloMessage)}">${icon.copy}Sao chép nội dung</button>`
        + '<p class="adv-copied" aria-live="polite"></p></div>';
    }
    return h + '<div class="adv-actions">' + p.actions.map((a, i) => action(a, i === 0)).join('') + '</div>';
  }

  function trailHtml() {
    if (step.name === 'AUDIENCE') return '';
    const crumbs = [];
    if (step.name === 'CLAIMS') crumbs.push(audiences[2].label);
    else if (step.name === 'ACCIDENT') crumbs.push('Bảo hiểm tai nạn 24/24');
    else if (step.name === 'PRODUCT') crumbs.push(audiences.find((x) => x.intent === step.intent).label);
    else {
      const p = products[step.product];
      crumbs.push(step.via === 'accident' ? 'Bảo hiểm tai nạn 24/24' : audiences.find((x) => x.intent === p.intent).label);
      crumbs.push(p.menuLabel);
    }
    return `<div class="adv-nav"><button type="button" class="adv-back" data-back>${icon.left}Quay lại</button>`
      + '<ol class="adv-trail" aria-label="Lựa chọn hiện tại">'
      + crumbs.map((c, i) => `<li${i === crumbs.length - 1 ? ' aria-current="step"' : ''}>${esc(c)}</li>`).join('') + '</ol></div>';
  }

  function render() {
    const body = backdrop.querySelector('.adv-body');
    body.innerHTML = trailHtml() + '<div role="group">' + stepHtml() + '</div>';
    body.scrollTop = 0;
    const t = body.querySelector('[data-autofocus]') || body.querySelector('a[href],button');
    if (t) t.focus();
  }

  function go(next) { step = next; render(); }

  function open() {
    if (backdrop) return;
    step = initialStep();
    backdrop = document.createElement('div');
    backdrop.className = 'adv-backdrop';
    backdrop.innerHTML = '<section class="adv-panel" role="dialog" aria-modal="true" aria-labelledby="adv-title">'
      + '<header class="adv-header"><div class="adv-header-top">'
      + '<span class="adv-brand"><span class="adv-brand-logo"><img alt="" src="/assets/pvi-logo.svg"></span>PVI THÀNH ĐÔ</span>'
      + `<button type="button" class="adv-close" data-close aria-label="Đóng tư vấn và báo giá">${icon.close}</button></div>`
      + '<h2 class="adv-title" id="adv-title">Anh/chị cần hỗ trợ việc gì?</h2>'
      + '<p class="adv-lead">Chọn nhu cầu để đến đúng sản phẩm và đúng người phụ trách.</p></header>'
      + '<div class="adv-body"></div>'
      + '<p class="adv-privacy">Widget chỉ giúp chọn đúng kênh hỗ trợ. Không nhập hoặc gửi hồ sơ cá nhân tại đây.</p>'
      + '</section>';
    document.body.appendChild(backdrop);
    launcher.setAttribute('aria-expanded', 'true');
    launcher.classList.add('adv-hidden');
    render();
    document.addEventListener('keydown', onKey);
  }

  function close(restore = true) {
    if (!backdrop) return;
    backdrop.remove();
    backdrop = null;
    launcher.setAttribute('aria-expanded', 'false');
    launcher.classList.toggle('adv-hidden', atFooter);
    document.removeEventListener('keydown', onKey);
    if (restore) launcher.focus();
  }

  function onKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab' || !backdrop) return;
    const f = [...backdrop.querySelectorAll('a[href],button:not([disabled])')];
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1], act = document.activeElement;
    const outside = !backdrop.contains(act);
    if (e.shiftKey ? act === first || outside : act === last || outside) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
  }

  launcher.addEventListener('click', open);

  document.addEventListener('pointerdown', (e) => { if (backdrop && e.target === backdrop) close(); });

  document.addEventListener('click', (e) => {
    if (!backdrop || !backdrop.contains(e.target)) return;
    if (e.target.closest('[data-close]')) { close(); return; }
    if (e.target.closest('[data-back]')) { go(back(step)); return; }
    const opt = e.target.closest('[data-opt]');
    if (opt) {
      const [kind, id] = opt.dataset.opt.split(':');
      if (kind === 'i') go(id === 'claims' ? { name: 'CLAIMS' } : { name: 'PRODUCT', intent: id });
      else if (kind === 'p') go({ name: 'ACTIONS', product: id, via: 'list' });
      else go({ name: 'ACTIONS', product: id, via: 'accident' });
      return;
    }
    const cp = e.target.closest('[data-copy]');
    if (cp) {
      const out = backdrop.querySelector('.adv-copied');
      navigator.clipboard?.writeText(cp.dataset.copy)
        .then(() => { if (out) out.textContent = 'Đã sao chép nội dung gợi ý.'; })
        .catch(() => { /* trình duyệt chặn clipboard thì câu gợi ý vẫn hiện để khách tự chép */ });
      return;
    }
    // Link nội bộ: đóng widget im lặng để trang đích (hoặc neo #) hiện ra.
    if (e.target.closest('a[data-internal]')) close(false);
  });

  /* Cuộn tới footer thì ẩn nút nổi: footer đã có đủ kênh liên hệ. */
  let atFooter = false;
  const footer = document.querySelector('footer');
  if (footer && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      atFooter = entries.some((x) => x.isIntersecting);
      if (!backdrop) launcher.classList.toggle('adv-hidden', atFooter);
    }, { rootMargin: '0px 0px -40% 0px' }).observe(footer);
  }
})();
