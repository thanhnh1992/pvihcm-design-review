/* Nhận xét, đánh giá của bạn đọc cuối mỗi bài Tin tức.
   Dữ liệu lưu ở Google Sheet qua Apps Script (tools/apps-script-nhan-xet.gs).
   Chỉ nhận xét đã được duyệt trong Sheet mới hiện ở đây. Nội dung người dùng
   luôn gán bằng textContent, không bao giờ chèn HTML. */
(function () {
  var box = document.querySelector('[data-feedback]');
  if (!box) return;
  var url = box.getAttribute('data-endpoint');
  var slug = box.getAttribute('data-slug');
  var title = box.getAttribute('data-title') || '';
  if (!url || !slug) return;

  var form = box.querySelector('.fb-form');
  var stars = box.querySelector('.fb-stars');
  var hint = box.querySelector('.fb-hint');
  var msg = box.querySelector('.fb-msg');
  var btn = form.querySelector('button[type=submit]');
  var list = box.querySelector('.fb-list');
  var summary = box.querySelector('.fb-summary');
  var count = form.querySelector('.fb-count');
  var area = form.querySelector('textarea');
  var HINTS = ['', 'Chưa hữu ích', 'Ít hữu ích', 'Tạm được', 'Hữu ích', 'Rất hữu ích'];
  var started = Date.now();
  var sentKey = 'pvi-fb-' + slug;

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
    if (Date.now() - started < 3000) { say('Vui lòng thử lại sau vài giây.', 'err'); return; }
    btn.disabled = true; btn.textContent = 'Đang gửi…'; say('');
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        slug: slug, title: title, rating: rating,
        name: form.elements.name.value, comment: area.value, website: form.elements.website.value,
      }),
    }).then(function (r) { return r.json(); }).then(function (res) {
      if (!res || !res.ok) throw new Error((res && res.error) || '');
      try { localStorage.setItem(sentKey, '1'); } catch (e) { /* bỏ qua */ }
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

  fetch(url + (url.indexOf('?') < 0 ? '?' : '&') + 'slug=' + encodeURIComponent(slug))
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (!d || !d.ok) return;
      if (d.count > 0) {
        summary.querySelector('.fb-avg').textContent = String(d.average.toFixed(1)).replace('.', ',');
        var avgStars = summary.querySelector('.fb-rate');
        rate(avgStars, d.average);
        avgStars.setAttribute('aria-label', 'Trung bình ' + String(d.average).replace('.', ',') + ' trên 5 sao');
        summary.querySelector('.fb-total').textContent = d.count + ' đánh giá';
        summary.hidden = false;
      }
      (d.reviews || []).forEach(function (r) {
        var li = document.createElement('li');
        var head = document.createElement('p'); head.className = 'fb-who';
        var b = document.createElement('b'); b.textContent = r.name || 'Bạn đọc';
        var t = document.createElement('time'); t.textContent = viDate(r.date); t.setAttribute('datetime', r.date);
        head.appendChild(b); head.appendChild(starRow(r.rating)); head.appendChild(t);
        var body = document.createElement('p'); body.className = 'fb-text'; body.textContent = r.comment;
        li.appendChild(head); li.appendChild(body); list.appendChild(li);
      });
      list.hidden = !list.children.length;
    })
    .catch(function () { /* không tải được thì chỉ ẩn danh sách, vẫn gửi được nhận xét */ });
})();
