/* Đánh giá trực tiếp sản phẩm, tách khỏi điểm hữu ích của bài viết.
   Chỉ gắn AggregateRating vào Product có sẵn khi API có lượt đánh giá thật. */
(() => {
  const box = document.querySelector('[data-product-reviews]');
  if (!box) return;
  const api = '/api/danh-gia-san-pham';
  const form = box.querySelector('form'), fieldset = form.querySelector('fieldset');
  const summary = box.querySelector('.pr-summary'), empty = box.querySelector('.pr-empty');
  const message = box.querySelector('.pr-message'), list = box.querySelector('.pr-list');
  const button = form.querySelector('button[type="submit"]');
  const storageKey = 'pvi-product-rating-tai-nan';
  let submissionId, sent = false, busy = false;
  try { submissionId = localStorage.getItem(storageKey); } catch {}
  if (!/^[a-f0-9-]{36}$/i.test(submissionId || '')) submissionId = crypto.randomUUID();
  try { localStorage.setItem(storageKey, submissionId); sent = localStorage.getItem(storageKey + '-sent') === '1'; } catch {}

  function schema(count, average) {
    document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
      let data;
      try { data = JSON.parse(script.textContent); } catch { return; }
      // Chỉ sửa đúng sản phẩm tai nạn đã khai, không đổi loại nội dung để ép hiện sao.
      if (data['@type'] !== 'Product' || data['@id'] !== 'https://pvihcm.com/san-pham/bao-hiem-tai-nan/#product') return;
      delete data.aggregateRating;
      if (count > 0) data.aggregateRating = { '@type': 'AggregateRating', ratingValue: average, ratingCount: count, bestRating: 5, worstRating: 1 };
      script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
    });
  }
  function totals(d) {
    if (!Number.isInteger(d.count) || d.count < 0 || (d.count > 0 && !(d.average >= 1 && d.average <= 5))) throw new Error('Chưa tải được đánh giá. Vui lòng thử lại sau.');
    summary.hidden = d.count === 0; empty.hidden = d.count > 0;
    empty.textContent = 'Chưa có đánh giá. Bạn có thể chia sẻ trải nghiệm đầu tiên.';
    summary.querySelector('strong').textContent = d.average.toFixed(1).replace('.', ',') + '/5';
    summary.querySelector('span').textContent = d.count + ' lượt đánh giá';
    schema(d.count, d.average);
  }
  function drawReviews(rows) {
    list.replaceChildren();
    rows.forEach((r) => {
      const li = document.createElement('li'), head = document.createElement('p'), body = document.createElement('p');
      const who = document.createElement('strong'), stars = document.createElement('span'), date = document.createElement('time');
      who.textContent = r.name || 'Khách truy cập'; stars.textContent = '★'.repeat(r.rating) + '☆'.repeat(5-r.rating);
      stars.setAttribute('aria-label', r.rating + ' trên 5 sao'); stars.className = 'pr-rated';
      date.dateTime = r.date; date.textContent = r.date.split('-').reverse().join('/');
      head.append(who, stars, date); body.textContent = r.comment;
      li.append(head); if (r.comment) li.append(body); list.append(li);
    });
    list.hidden = rows.length === 0;
  }
  async function load() {
    const r = await fetch(api, {cache:'no-store'}), d = await r.json();
    if (!r.ok || !d.ok) throw new Error(d.error || 'Chưa tải được đánh giá. Vui lòng thử lại sau.');
    totals(d); drawReviews(d.reviews || []);
    fieldset.disabled = sent; form.hidden = sent;
    if (sent) message.textContent = 'Cảm ơn bạn. Đánh giá từ trình duyệt này đã được ghi nhận.';
  }
  form.addEventListener('change', () => {
    const n = Number(form.elements.rating.value);
    box.querySelectorAll('.pr-stars label').forEach((label, i) => label.classList.toggle('is-filled', i < n));
    box.querySelector('.pr-choice').textContent = n ? 'Bạn chọn ' + n + '/5 sao' : 'Chưa chọn số sao';
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); if (busy || sent) return;
    const rating = Number(form.elements.rating.value);
    if (!rating) { message.textContent = 'Bạn chọn số sao trước khi gửi nhé.'; form.querySelector('input[name="rating"]').focus(); return; }
    busy = true; button.disabled = true; button.textContent = 'Đang gửi…'; message.textContent = '';
    try {
      const r = await fetch(api, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({rating, submissionId,
        name:form.elements.name.value, comment:form.elements.comment.value, website:form.elements.website.value})});
      const d = await r.json(); if (!r.ok || !d.ok) throw new Error(d.error || 'Chưa gửi được, vui lòng thử lại.');
      sent = true; try { localStorage.setItem(storageKey + '-sent', '1'); } catch {}
      form.hidden = true; totals(d); message.textContent = 'Cảm ơn bạn. Đánh giá đã được ghi nhận.';
      try { await load(); } catch { message.textContent = 'Đánh giá đã được ghi nhận. Tải lại trang để xem danh sách mới nhất.'; }
    } catch (err) { message.textContent = err.message || 'Chưa gửi được, vui lòng thử lại.'; }
    finally { busy = false; button.disabled = false; button.textContent = 'Gửi đánh giá'; }
  });
  load().catch((err) => { empty.textContent = err.message || 'Mục đánh giá tạm thời chưa sẵn sàng.'; form.hidden = true; schema(0,0); });
})();
