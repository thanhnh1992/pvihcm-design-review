// Video YouTube đầu trang vật chất xe: hiện ảnh bìa tự lưu, bấm mới tải trình phát YouTube (youtube-nocookie)
// để trang không phải tải ~1 MB script của YouTube ngay khi mở. Tên miền đã khai trong CSP frame-src (vercel.json).
(function () {
  document.querySelectorAll('.yt-play[data-yt]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-yt');
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0&playsinline=1';
      f.title = btn.getAttribute('data-title') || 'Video';
      f.width = '1280'; f.height = '720';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      f.allowFullscreen = true;
      f.className = 'yt-frame';
      btn.replaceWith(f);
      f.focus();
    });
  });
})();
