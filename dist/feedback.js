/* Nhận xét, đánh giá của bạn đọc trên trang bài viết.
   Dữ liệu lưu ở Vercel Blob qua /api/nhan-xet (api/nhan-xet.js); gửi là hiện ngay.
   Chế độ quản trị: mở bài với ?quantri, nhập ADMIN_KEY một lần, mỗi nhận xét có nút Xóa.
   Nội dung người dùng luôn gán bằng textContent, không bao giờ chèn HTML. */
(function () {
  var box = document.querySelector('[data-feedback]');
  if (!box) return;
  var url = box.getAttribute('data-endpoint');
  var slug = box.getAttribute('data-slug');
  var title = box.getAttribute('data-title') || '';
  /* Chế độ "org" (tools/danh-gia-sao.mjs, chủ site yêu cầu 22/11/2026): khối gộp điểm Google thật
     (data-base-count/avg) với đánh giá khách gửi trên website (khóa chung pvi-thanh-do), tổng gộp được
     ghi vào JSON-LD InsuranceAgency (script[data-org-rating]). */
  var org = box.getAttribute('data-mode') === 'org';
  var baseCount = Number(box.getAttribute('data-base-count')) || 0;
  var baseAvg = Number(box.getAttribute('data-base-avg')) || 0;
  var siteLine = box.querySelector('[data-site-line]');
  /* Danh sách (chủ site 23/11/2026): trang thường hiện 3 nhận xét mới nhất; nhiều hơn thì khối công ty có link
     "Xem toàn bộ đánh giá" sang /danh-gia/, bài viết có nút mở thêm tại chỗ. Trang /danh-gia/ (data-full) hiện 20, bấm xem thêm. */
  var full = box.hasAttribute('data-full');
  var SHOW = full ? 20 : 3;
  var LINK_RE = /https?:\/\/|www\.|<\s*a\b|\b[a-z0-9-]+\.(com|vn|net|org|info|io|me|co|xyz|top|shop|site|online|link|ly|asia|biz)\b/i;
  if (!url || !slug) return;

  var form = box.querySelector('.fb-form');
  var stars = box.querySelector('.fb-stars');
  var hint = box.querySelector('.fb-hint');
  var msg = box.querySelector('.fb-msg');
  var btn = form.querySelector('button[type=submit]');
  var list = box.querySelector('.fb-list');
  var summary = box.querySelector('.fb-summary');
  var top = document.querySelector('[data-rating-top]');
  var topStatus = top && top.querySelector('[data-rating-status]');
  var topLink = top && top.querySelector('[data-rating-link]');

  function showTopStatus(text, canRate) {
    if (!topStatus || !topLink) return;
    topStatus.textContent = text;
    topLink.hidden = !canRate;
  }
  var count = form.querySelector('.fb-count');
  var area = form.querySelector('textarea');
  var HINTS = org ? ['', 'Rất không hài lòng', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Rất hài lòng']
    : ['', 'Chưa hữu ích', 'Ít hữu ích', 'Tạm được', 'Hữu ích', 'Rất hữu ích'];
  var started = Date.now();
  var sentKey = 'pvi-fb-' + slug;
  var adminKey = '';
  try {
    if (/[?&]quantri\b/.test(location.search)) {
      var k = window.prompt('Nhập mã quản trị để hiện nút Xóa nhận xét (để trống để thoát):', localStorage.getItem('pvi-fb-admin') || '');
      if (k) localStorage.setItem('pvi-fb-admin', k); else localStorage.removeItem('pvi-fb-admin');
    }
    adminKey = localStorage.getItem('pvi-fb-admin') || '';
  } catch (e) { /* trình duyệt chặn lưu trữ */ }
  var all = { count: 0, sum: 0 };

  function paint(v) { stars.setAttribute('data-v', v || 0); hint.textContent = HINTS[v] || 'Chọn số sao'; }
  function chosen() { var c = form.querySelector('input[name=rating]:checked'); return c ? Number(c.value) : 0; }
  function say(text, kind) { msg.textContent = text; msg.className = 'fb-msg' + (kind ? ' is-' + kind : ''); }

  stars.addEventListener('change', function () { paint(chosen()); say(''); });
  stars.addEventListener('mouseover', function (e) { var l = e.target.closest('label'); if (l) paint(Number(l.getAttribute('data-n'))); });
  stars.addEventListener('mouseleave', function () { paint(chosen()); });
  area.addEventListener('input', function () { count.textContent = area.value.length + '/1000'; });

  try { if (localStorage.getItem(sentKey)) done(); } catch (e) { /* trình duyệt chặn lưu trữ */ }

  function done() {
    form.hidden = true;
    var ok = box.querySelector('.fb-done');
    ok.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var rating = chosen();
    if (!rating) { say('Chọn số sao trước khi gửi.', 'err'); stars.querySelector('input').focus(); return; }
    if (LINK_RE.test(area.value + ' ' + form.elements.name.value)) { say('Nhận xét không được chèn đường link. Vui lòng xóa link rồi gửi lại.', 'err'); area.focus(); return; }
    if (Date.now() - started < 3000) { say('Vui lòng thử lại sau vài giây.', 'err'); return; }
    btn.disabled = true; btn.textContent = 'Đang gửi…'; say('');
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: slug, title: title, rating: rating,
        name: form.elements.name.value, comment: area.value, website: form.elements.website.value,
        email: form.elements.email ? form.elements.email.value : '',
        page: location.pathname,
      }),
    }).then(function (r) { return r.json(); }).then(function (res) {
      if (!res || !res.ok) throw new Error((res && res.error) || '');
      try { localStorage.setItem(sentKey, '1'); } catch (e) { /* bỏ qua */ }
      if (res.review) {
        all.count += 1; all.sum += res.review.rating; showSummary();
        if (res.review.comment) { list.insertBefore(item(res.review), list.firstChild); list.hidden = false; }
      }
      done();
    }).catch(function (err) {
      say(err && err.message ? err.message : 'Chưa gửi được. Kiểm tra kết nối mạng rồi thử lại.', 'err');
      btn.disabled = false; btn.textContent = 'Gửi nhận xét';
    });
  });

  function rate(el, v) { el.style.setProperty('--v', v); }
  function starRow(n) {
    var s = document.createElement('span');
    s.className = 'fb-rate'; s.setAttribute('role', 'img'); s.setAttribute('aria-label', n + ' trên 5 sao');
    s.appendChild(document.createElement('i')); rate(s, n);
    return s;
  }
  function viDate(iso) { var p = String(iso).split('-'); return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : ''; }
  /* AggregateRating trong JSON-LD Article của bài (chủ site cho phép 16/11/2026).
     Chỉ dùng số đánh giá thật vừa lấy từ /api/nhan-xet: có ít nhất 1 đánh giá mới gắn,
     về 0 thì gỡ. Không bao giờ ghi số cứng vào HTML. */
  function syncRatingLd(count, avg) {
    var nodes = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < nodes.length; i++) {
      var o; try { o = JSON.parse(nodes[i].textContent); } catch (e) { continue; }
      if (!o || !/Article$/.test(o['@type'] || '')) continue;
      if (count > 0) o.aggregateRating = { '@type': 'AggregateRating', ratingValue: avg, bestRating: 5, worstRating: 1, ratingCount: count };
      else delete o.aggregateRating;
      nodes[i].textContent = JSON.stringify(o);
      return;
    }
  }
  function syncOrgLd(count, avg) {
    var node = document.querySelector('script[data-org-rating]');
    if (!node) return;
    try {
      var o = JSON.parse(node.textContent);
      o.aggregateRating = { '@type': 'AggregateRating', ratingValue: avg, bestRating: 5, worstRating: 1, ratingCount: count };
      node.textContent = JSON.stringify(o);
    } catch (e) { /* giữ nguyên số Google tĩnh */ }
  }
  function showOrg() {
    var count = baseCount + all.count;
    var avg = count ? Math.round(((baseAvg * baseCount + all.sum) / count) * 10) / 10 : 0;
    var txt = avg.toFixed(1).replace('.', ',');
    summary.querySelector('.fb-avg').textContent = txt;
    var avgStars = summary.querySelector('.fb-rate');
    rate(avgStars, avg);
    avgStars.setAttribute('aria-label', txt + ' trên 5 sao, ' + count + ' đánh giá');
    summary.querySelector('.fb-total').textContent = count + ' đánh giá';
    summary.hidden = false;
    if (siteLine && all.count) siteLine.textContent = 'Gồm ' + baseCount + ' đánh giá trên Google và ' + all.count + ' đánh giá của khách trên website.';
    syncOrgLd(count, avg);
  }
  function showSummary() {
    if (org) return showOrg();
    if (!all.count) {
      summary.hidden = true;
      showTopStatus('Chưa có đánh giá', true);
      syncRatingLd(0);
      return;
    }
    var avg = Math.round((all.sum / all.count) * 10) / 10;
    syncRatingLd(all.count, avg);
    summary.querySelector('.fb-avg').textContent = avg.toFixed(1).replace('.', ',');
    var avgStars = summary.querySelector('.fb-rate');
    rate(avgStars, avg);
    avgStars.setAttribute('aria-label', 'Trung bình ' + avg.toFixed(1).replace('.', ',') + ' trên 5 sao');
    summary.querySelector('.fb-total').textContent = all.count + ' đánh giá';
    summary.hidden = false;
    showTopStatus(avg.toFixed(1).replace('.', ',') + '/5 · ' + all.count + ' đánh giá', true);
  }
  function item(r) {
    var li = document.createElement('li');
    var head = document.createElement('p'); head.className = 'fb-who';
    var b = document.createElement('b'); b.textContent = r.name || 'Bạn đọc';
    var t = document.createElement('time'); t.textContent = viDate(r.date); t.setAttribute('datetime', r.date);
    head.appendChild(b); head.appendChild(starRow(r.rating)); head.appendChild(t);
    if (adminKey && r.id) {
      var x = document.createElement('button'); x.type = 'button'; x.className = 'fb-del'; x.textContent = 'Xóa';
      x.addEventListener('click', function () {
        if (!window.confirm('Xóa nhận xét này khỏi website?')) return;
        x.disabled = true;
        fetch(url + '?id=' + encodeURIComponent(r.id), { method: 'DELETE', headers: { 'x-admin-key': adminKey } })
          .then(function (res) { return res.json(); })
          .then(function (d) {
            if (!d.ok) throw new Error(d.error || '');
            all.count -= 1; all.sum -= r.rating; showSummary();
            li.remove(); list.hidden = !list.children.length;
          })
          .catch(function (err) { x.disabled = false; window.alert(err.message || 'Chưa xóa được.'); });
      });
      head.appendChild(x);
    }
    var body = document.createElement('p'); body.className = 'fb-text'; body.textContent = r.comment;
    li.appendChild(head); li.appendChild(body);
    // Chế độ quản trị: hiện IP, email đi kèm (chỉ máy chủ trả khi đúng mã quản trị, khách không thấy).
    if (adminKey && (r.ip || r.email)) {
      var meta = document.createElement('p'); meta.className = 'fb-admin';
      meta.textContent = [r.ip ? 'IP: ' + r.ip : '', r.email ? 'Email: ' + r.email : ''].filter(Boolean).join(' · ');
      li.appendChild(meta);
    }
    return li;
  }

  function paginate() {
    var items = Array.prototype.slice.call(list.children);
    var old = box.querySelector('.fb-more'); if (old) old.remove();
    var shown = 0;
    items.forEach(function (li) { if (!li.hidden) shown++; });
    if (items.length <= shown) return;
    var more = document.createElement('p'); more.className = 'fb-more';
    if (org && !full) {
      var a = document.createElement('a'); a.href = '/danh-gia/'; a.setAttribute('data-same-tab', '');
      a.textContent = 'Xem toàn bộ ' + items.length + ' nhận xét →';
      more.appendChild(a);
    } else {
      var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'fb-more-btn';
      btn.textContent = full ? 'Xem thêm nhận xét' : 'Xem tất cả ' + items.length + ' nhận xét';
      btn.addEventListener('click', function () {
        var n = 0;
        items.forEach(function (li) { if (li.hidden && (n < 20 || !full)) { li.hidden = false; n++; } });
        paginate();
      });
      more.appendChild(btn);
    }
    list.parentNode.insertBefore(more, list.nextSibling);
  }

  fetch(url + (url.indexOf('?') < 0 ? '?' : '&') + 'slug=' + encodeURIComponent(slug) + (adminKey ? '&admin=1' : ''),
    adminKey ? { cache: 'no-store', headers: { 'x-admin-key': adminKey } } : undefined)
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (!d || !d.ok || d.disabled) {
        if (org) { form.hidden = true; }
        showTopStatus(d && d.disabled ? 'Chức năng đánh giá chưa được bật' : 'Chưa tải được đánh giá', false);
        return;
      }
      box.hidden = false;
      all.count = d.count; all.sum = d.average * d.count; showSummary();
      (d.reviews || []).forEach(function (r, i) { var li = item(r); if (i >= SHOW) li.hidden = true; list.appendChild(li); });
      list.hidden = !list.children.length;
      paginate();
    })
    .catch(function () { if (org) form.hidden = true; showTopStatus('Chưa tải được đánh giá', false); });
})();
