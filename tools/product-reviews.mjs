// Chỉ gắn trên trang sản phẩm được giao. Không nhập dữ liệu mẫu hoặc chọn sẵn sao.
export function accidentReviews() {
  return `<section class="product-reviews" id="danh-gia" data-product-reviews aria-labelledby="product-reviews-title">
<div class="pr-heading"><div><span class="auto-kicker blue">ĐÁNH GIÁ SẢN PHẨM</span><h2 id="product-reviews-title">Bạn đánh giá bảo hiểm Tai nạn 24/24 PVI thế nào?</h2></div><p class="pr-summary" hidden><strong></strong><span></span></p></div>
<p class="pr-empty" role="status">Đang tải đánh giá…</p>
<form class="pr-form" novalidate>
<fieldset disabled><legend>Chọn mức đánh giá của bạn</legend><div class="pr-stars">${[1,2,3,4,5].map((n) => `<label><input type="radio" name="rating" value="${n}" aria-label="${n} sao"><span aria-hidden="true">★</span></label>`).join('')}</div><p class="pr-choice" aria-live="polite">Chưa chọn số sao</p>
<label for="pr-name">Tên hiển thị <small>(không bắt buộc)</small></label><input id="pr-name" name="name" maxlength="60" autocomplete="nickname">
<label for="pr-comment">Chia sẻ trải nghiệm <small>(không bắt buộc)</small></label><textarea id="pr-comment" name="comment" rows="3" maxlength="1000" placeholder="Chia sẻ trải nghiệm của bạn với sản phẩm bảo hiểm này."></textarea>
<div class="pr-honey" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>
<p class="pr-note">Đánh giá và tên hiển thị được đăng công khai sau khi gửi. Không ghi số điện thoại, số hợp đồng, thông tin sức khỏe hoặc thông tin cá nhân khác.</p>
<button type="submit" class="accident-primary">Gửi đánh giá</button></fieldset></form>
<p class="pr-message" role="status" aria-live="polite"></p><ul class="pr-list" hidden></ul>
<noscript>Bật JavaScript để xem và gửi đánh giá sản phẩm.</noscript></section>`;
}
