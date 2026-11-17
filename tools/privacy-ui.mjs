// Chính sách và thông báo toàn site, theo yêu cầu chủ site ngày 17/11/2026.
export const PRIVACY_PATH = '/chinh-sach-bao-ve-du-lieu-ca-nhan/';
export const PRIVACY_PDF = '/tai-lieu/chinh-sach-bao-ve-du-lieu-ca-nhan-30-03-2026.pdf';

export function privacyLinks() {
  return `<nav class="privacy-footer-links" aria-label="Quyền riêng tư"><a href="${PRIVACY_PATH}">Chính sách Bảo vệ Dữ liệu Cá nhân</a><a href="${PRIVACY_PDF}" target="_blank" rel="noopener">Tải chính sách PVI (PDF)</a><button type="button" data-privacy-open>Cài đặt quyền riêng tư</button></nav>`;
}

export function privacyUi() {
  return `<link rel="stylesheet" href="/privacy.css"><dialog class="privacy-dialog privacy-banner" id="privacy-dialog" aria-labelledby="privacy-title" aria-describedby="privacy-description">
<button class="privacy-close" type="button" data-privacy-close aria-label="Đóng thông báo, chưa đồng ý">×</button>
<div class="privacy-copy">
<h2 id="privacy-title" tabindex="-1">Trung tâm ưu tiên quyền riêng tư</h2>
<p id="privacy-description">Bạn có thể cho phép cookie phân tích, quảng cáo và bản đồ/video. <a href="${PRIVACY_PATH}" data-same-tab>Chính sách</a>.</p>
</div>
<div class="privacy-actions"><button type="button" class="privacy-accept" data-privacy-accept>Đồng ý</button><button type="button" class="privacy-reject" data-privacy-reject>Từ chối</button><button type="button" class="privacy-customize" data-privacy-options aria-expanded="false" aria-controls="privacy-options">Tùy chọn</button></div>
<details class="privacy-options" id="privacy-options" hidden><summary>Tùy chọn cookie và nội dung bên ngoài</summary>
<p>Cookie cần thiết để lưu lựa chọn này luôn được sử dụng. Bạn có thể chọn riêng từng mục bên dưới.</p>
<label><input type="checkbox" name="privacy-analytics"><span><strong>Phân tích lượt truy cập</strong><small>Cho phép Google Analytics đo việc sử dụng website.</small></span></label>
<label><input type="checkbox" name="privacy-marketing"><span><strong>Tiếp thị và quảng cáo</strong><small>Cho phép Google Ads đo hiệu quả và cá nhân hóa quảng cáo.</small></span></label>
<label><input type="checkbox" name="privacy-media"><span><strong>Bản đồ và video bên ngoài</strong><small>Cho phép tải nội dung từ Google Maps và YouTube; các dịch vụ này có thể nhận thông tin thiết bị và sử dụng cookie.</small></span></label>
<button type="button" class="privacy-save" data-privacy-save>Lưu lựa chọn</button></details>
<p class="privacy-note" hidden>Bạn có thể thay đổi lựa chọn tại “Cài đặt quyền riêng tư” ở cuối trang. Đóng thông báo không có nghĩa là đồng ý. Việc gửi thông tin tư vấn, mua bảo hiểm được xác nhận riêng tại biểu mẫu.</p>
</dialog><script src="/privacy.js" defer></script>`;
}

// Giữ iframe không có src trước khi khách cho phép. Không gọi dịch vụ ngoài chỉ để hiển thị thông báo.
export function protectExternalEmbeds(html) {
  return html.replace(/<iframe\b([^>]*?)\ssrc="(https:\/\/(?:www\.google\.com|maps\.google\.com|www\.youtube-nocookie\.com)\/[^"]+)"([^>]*)><\/iframe>/g,
    (_, before, url, after) => {
      const kind = url.includes('youtube') ? 'video YouTube' : 'bản đồ Google';
      return `<div class="privacy-embed"><div class="privacy-embed-cover"><p>Cho phép nội dung bên ngoài để xem ${kind}.</p><button type="button" data-privacy-enable-media>Cài đặt quyền riêng tư</button></div><iframe${before} data-privacy-src="${url}"${after} hidden></iframe></div>`;
    });
}

export function stripPrivacyUi(html) {
  return html.replace(/<link rel="stylesheet" href="\/privacy\.css">[\s\S]*?<script src="\/privacy\.js" defer><\/script>/g, '');
}
