/* Tìm kiếm toàn site (chủ site yêu cầu 13/11/2026).
   Nút .search-btn trên header (tools/chrome.mjs) gọi file này lúc bấm lần đầu (app.js), nên trang không tải thêm gì khi chưa tìm.
   Dữ liệu: /search-index.json do tools/gen-search.mjs sinh từ chữ hiển thị của mọi trang.
   Gõ có dấu hay không dấu đều ra: "chay no" tìm được "cháy nổ". */
(() => {
  if (window.pviSearch) return;
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = '/search.css';
  document.head.append(css);

  // Bỏ dấu từng ký tự, giữ nguyên độ dài chuỗi để tô đậm đúng chỗ trên chữ gốc.
  const MARKS = /[̀-ͯ]/g;
  const foldChar = (c) => {
    if (c === 'đ' || c === 'Đ') return 'd';
    const f = c.toLowerCase().normalize('NFD').replace(MARKS, '');
    return f.length === 1 ? f : c.toLowerCase().length === 1 ? c.toLowerCase() : ' ';
  };
  const fold = (s) => { let o = ''; for (let i = 0; i < s.length; i++) o += foldChar(s[i]); return o; };
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const SUGGEST = ['Cháy nổ bắt buộc', 'Tai nạn 24/24', 'Bảo hiểm ô tô', 'Bồi thường', 'Bình Dương', 'Mã số thuế'];

  const dlg = document.createElement('dialog');
  dlg.className = 'srch';
  dlg.setAttribute('aria-label', 'Tìm kiếm trên website');
  dlg.innerHTML = `<form class="srch-bar" role="search" method="dialog">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
<input type="search" name="q" placeholder="Tìm sản phẩm, bài viết, câu hỏi…" aria-label="Từ khóa tìm kiếm" autocomplete="off" enterkeyhint="search" spellcheck="false">
<button type="button" class="srch-close" aria-label="Đóng tìm kiếm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
</form>
<p class="srch-status" role="status" aria-live="polite"></p>
<div class="srch-body"></div>`;
  document.body.append(dlg);
  const input = dlg.querySelector('input');
  const status = dlg.querySelector('.srch-status');
  const body = dlg.querySelector('.srch-body');

  let pages = null;
  let loading = null;
  // Mỗi trang giữ 2 bản chữ: chữ thường có dấu (l*) và chữ bỏ dấu (f*), cùng độ dài với chữ gốc.
  const views = (p) => ({ lt: p.t.toLowerCase(), ld: p.d.toLowerCase(), lb: p.b.toLowerCase(), lh: p.h.map(([, t]) => t.toLowerCase()),
    ft: fold(p.t), fd: fold(p.d), fb: fold(p.b), fh: p.h.map(([, t]) => fold(t)) });
  const load = () => loading ||= fetch('/search-index.json')
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((list) => { pages = list.map((p) => ({ ...p, ...views(p) })); run(); })
    .catch(() => { loading = null; status.textContent = 'Chưa tải được dữ liệu tìm kiếm. Kiểm tra mạng rồi thử lại.'; });

  // Khớp theo trọn chữ: "the" không ra "theo". Riêng chữ cuối đang gõ dở thì khớp đầu chữ ("bồi thư" ra "bồi thường").
  // Gõ có dấu: so đúng dấu ("tài" không ra "tại"); gõ không dấu: so bỏ dấu ("tai nan" ra "tai nạn").
  const B = '(?<![\\p{L}\\p{N}])', E = '(?![\\p{L}\\p{N}])';
  function parse(q) {
    const nq = q.normalize('NFC');
    const accented = fold(nq) !== nq.toLowerCase();
    const raw = (accented ? nq.toLowerCase() : fold(nq)).split(/[^\p{L}\p{N}/]+/u).filter(Boolean);
    const words = [...new Set(raw)];
    const open = /[\p{L}\p{N}]$/u.test(q); // chưa gõ dấu cách sau chữ cuối
    const res = words.map((w) => new RegExp(B + reEsc(w) + (open && w === raw[raw.length - 1] ? '' : E), 'gu'));
    const phrase = raw.length > 1 ? new RegExp(B + raw.map(reEsc).join('[^\\p{L}\\p{N}]+') + (open ? '' : E), 'gu') : null;
    return { v: accented ? 'l' : 'f', words, res, phrase };
  }
  const count = (s, re, cap) => { re.lastIndex = 0; let n = 0; while (n < cap && re.exec(s)) n++; return n; };

  function search(q) {
    const Q = parse(q);
    if (!Q.words.length) return { Q, list: [] };
    const { v, res, phrase } = Q;
    const list = [];
    for (const p of pages) {
      const T = p[v + 't'], D = p[v + 'd'], Bd = p[v + 'b'], H = p[v + 'h'];
      let score = 0;
      let ok = true;
      for (const re of res) {
        const t = count(T, re, 1), d = count(D, re, 1), b = count(Bd, re, 8);
        const h = H.reduce((n, s) => n + count(s, re, 1), 0);
        if (!t && !d && !b && !h) { ok = false; break; }
        score += t * 10 + Math.min(h, 3) * 4 + d * 3 + b;
      }
      if (!ok) continue;
      // Cả cụm từ đứng liền nhau: xếp trên hẳn trang chỉ có các chữ rời rạc.
      if (phrase) score += count(T, phrase, 1) * 40 + count(D, phrase, 1) * 15 + Math.min(H.reduce((n, s) => n + count(s, phrase, 1), 0), 2) * 12 + count(Bd, phrase, 3) * 10;
      // Trang sản phẩm là nơi khách mua: xếp trên bài viết khi điểm gần nhau.
      if (p.k === 'Sản phẩm') score += 6;
      // Trỏ thẳng tới mục (H2/H3) khớp nhiều từ nhất trong trang.
      let sec = -1, best = 0;
      H.forEach((s, i) => { const n = res.filter((re) => count(s, re, 1)).length + (phrase && count(s, phrase, 1) ? 1 : 0); if (n > best) { best = n; sec = i; } });
      list.push({ p, score, sec: best >= Math.min(res.length, 2) ? sec : -1 });
    }
    list.sort((a, b) => b.score - a.score);
    return { Q, list };
  }

  // Tô vàng chữ khớp trên chữ gốc, dựa vào vị trí trên bản chữ thường/bỏ dấu (cùng độ dài).
  function mark(orig, view, Q) {
    const hits = [];
    for (const re of Q.phrase ? [Q.phrase, ...Q.res] : Q.res) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(view))) { hits.push([m.index, m.index + m[0].length]); if (!m[0].length) re.lastIndex++; }
    }
    hits.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
    let out = '', pos = 0;
    for (const [a, b] of hits) {
      if (a < pos) continue;
      out += esc(orig.slice(pos, a)) + '<mark>' + esc(orig.slice(a, b)) + '</mark>';
      pos = b;
    }
    return out + esc(orig.slice(pos));
  }

  function snippet(p, Q) {
    const view = p[Q.v + 'b'];
    let at = -1;
    for (const re of Q.phrase ? [Q.phrase, ...Q.res] : Q.res) { re.lastIndex = 0; const m = re.exec(view); if (m) { at = m.index; break; } }
    if (at < 0) return mark(p.d, p[Q.v + 'd'], Q);
    let a = Math.max(0, at - 60), b = Math.min(p.b.length, at + 150);
    if (a > 0) a = p.b.indexOf(' ', a) + 1;
    if (b < p.b.length) b = p.b.lastIndexOf(' ', b);
    return (a > 0 ? '… ' : '') + mark(p.b.slice(a, b), view.slice(a, b), Q) + (b < p.b.length ? ' …' : '');
  }

  function render(q) {
    if (!pages) { status.textContent = 'Đang tải dữ liệu…'; body.innerHTML = ''; return; }
    if (!q.trim()) {
      status.textContent = `Tìm trong ${pages.length} trang sản phẩm, bài viết và hướng dẫn của PVI Thành Đô.`;
      body.innerHTML = `<p class="srch-hint">Gợi ý</p><div class="srch-chips">${SUGGEST.map((s) => `<button type="button">${esc(s)}</button>`).join('')}</div>`;
      return;
    }
    const { Q, list } = search(q);
    if (!list.length) {
      status.textContent = `Không thấy trang nào có "${q.trim()}".`;
      body.innerHTML = `<div class="srch-empty"><p>Thử từ khóa ngắn hơn, hoặc hỏi trực tiếp chuyên viên PVI Thành Đô.</p><a class="srch-call" href="tel:0938072236">Gọi tư vấn 0938 072 236</a></div>`;
      return;
    }
    status.textContent = `Tìm thấy ${list.length} trang có "${q.trim()}".`;
    body.innerHTML = `<ol class="srch-list">${list.map(({ p, sec }) => {
      const href = sec >= 0 ? `${p.u}#${p.h[sec][0]}` : p.u;
      const where = sec >= 0 ? `<span class="srch-sec">Mục: ${mark(p.h[sec][1], p[Q.v + 'h'][sec], Q)}</span>` : '';
      return `<li><a href="${esc(href)}"><span class="srch-kind">${esc(p.k)}</span><b>${mark(p.t, p[Q.v + 't'], Q)}</b>${where}<span class="srch-snip">${snippet(p, Q)}</span></a></li>`;
    }).join('')}</ol>`;
  }

  let timer = 0;
  const run = () => render(input.value);
  input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(run, 120); });
  // Enter: mở kết quả đầu tiên.
  dlg.querySelector('form').addEventListener('submit', (e) => e.preventDefault());
  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || e.isComposing) return;
    e.preventDefault();
    clearTimeout(timer);
    run();
    const first = body.querySelector('.srch-list a');
    if (first) { location.href = first.href; dlg.close(); }
  });
  body.addEventListener('click', (e) => {
    const chip = e.target.closest('.srch-chips button');
    if (chip) { input.value = chip.textContent; run(); input.focus(); return; }
    // Kết quả trỏ vào chính trang đang mở: đóng khung để thấy đoạn được cuộn tới.
    if (e.target.closest('a')) setTimeout(() => dlg.open && dlg.close(), 0);
  });
  dlg.querySelector('.srch-close').addEventListener('click', () => dlg.close());
  // Bấm ra vùng tối bên ngoài khung để đóng.
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => document.documentElement.classList.remove('srch-lock'));

  window.pviSearch = (opener) => {
    if (!dlg.open) dlg.showModal();
    document.documentElement.classList.add('srch-lock');
    dlg.returnFocusTo = opener;
    input.focus();
    input.select();
    run();
    load();
  };
  dlg.addEventListener('close', () => dlg.returnFocusTo?.focus?.());
})();
