# AGENTS.md: pvihcm.com

Hướng dẫn chung cho mọi agent làm việc trên repo này (Codex, Claude Code…). Đọc hết file trước khi sửa.

> **ĐỌC MỤC "Tên miền gốc" TRƯỚC TIÊN:** nghiêm cấm đổi tên miền gốc `https://pvihcm.com`; mọi thay đổi dù nhỏ nhất trên tên miền gốc phải qua 2 bước **Cảnh báo → Phê duyệt** của chủ site. Chạy `node tools/check-domain.mjs` trước mỗi lần push.

## Dự án
- Website **pvihcm.com** của **Công ty Bảo hiểm PVI Thành Đô** (thuộc Tổng Công ty Bảo hiểm PVI).
- Site **tĩnh, không có bước build**: HTML/CSS/JS thuần nằm sẵn trong `dist/`. Vite chỉ dùng làm máy chủ xem thử.
- Repo: `github.com/thanhnh1992/pvihcm-design-review`, nhánh `main`. **Push lên `main` thì Vercel tự triển khai** (project `pvihcm-design-review`, xem thử tại https://pvihcm-design-review.vercel.app).
- `vercel.json`: `outputDirectory: dist`, `trailingSlash: true`, cache dài cho `/fonts/` và `/assets/`.
- **Không nhầm với baohiempvi-vn**: đó là site khác (Next.js, ở `C:/Users/DELL/Documents/Codex/2026-08-23/pvi-tp-h-ch-minh-sites-4/work/site`). Repo này chỉ *đọc dữ liệu* từ đó.

## Cấu trúc
```
dist/
  index.html                     trang chủ (có hiệu ứng nền 3D: hero-3d.js, polish.css chỉ nạp ở đây)
  san-pham/bao-hiem-bat-buoc/    TNDS ô tô + người lao động công trường, có bộ tính phí (page.js)
  san-pham/bao-hiem-tai-nan/     tai nạn 24/24, tính phí theo gói/số người/thời hạn (page.js)
  san-pham/chay-no-bat-buoc/     tra cứu Phụ lục VI NĐ 105/2025 + tính phí (page.js, tariff-data.js)
  san-pham/hang-hoa-xuat-nhap-khau/
  gioi-thieu/                    giới thiệu đơn vị (thay /about-us của site cũ)
  huong-dan/                     checklist cho HR
  tai-nan-doanh-nghiep/          gom nhu cầu thành bản tóm tắt gửi Zalo (page.js), không lưu/gửi dữ liệu
  style.css   CSS nền chung (có @font-face Be Vietnam Pro tự lưu trữ + phông dự phòng chỉnh số đo)
  product.css CSS chung của các trang sản phẩm (lớp .fire-*, .pd-*)
  site.css    header + menu điện thoại + chân trang dùng chung (nạp sau cùng)
  advisor.css/js  cụm 3 nút nổi: Zalo 0938072236 · Gọi · Chat chuyên viên (Zalo OA)
  app.js      menu điện thoại, hiệu ứng nhỏ trang chủ
  fonts/      Be Vietnam Pro woff2 (vietnamese, latin, latin-ext)
  assets/     ảnh; mỗi ảnh lớn có bản -480/-800 cho srcset
  robots.txt, sitemap.xml
tools/        script sinh trang (xem bên dưới)
```

## Sinh trang từ dữ liệu
Ba trang sản phẩm, `/huong-dan/` và `/tai-nan-doanh-nghiep/` **được sinh bằng script**. Muốn sửa lâu dài thì sửa script rồi chạy lại. Nếu sửa tay HTML, lần sinh sau sẽ ghi đè mất.
```
node tools/load-data.mjs      # chỉ khi dữ liệu bên baohiempvi-vn đổi (cần typescript trong project đó)
node tools/gen-products.mjs   # bắt buộc, tai nạn, hàng hóa
node tools/gen-others.mjs     # huong-dan, tai-nan-doanh-nghiep, gioi-thieu
node tools/gen-products-2.mjs # sức khỏe, công trình, vật chất xe, du lịch; phần đầu trang du lịch (mẫu duyệt 28/10/2026) ở tools/du-lich-ui.mjs + dist/du-lich.css + dist/du-lich.js
node tools/patch-static.mjs   # áp header/menu/chân trang mới cho index.html và trang cháy nổ
node tools/srcset.mjs         # gắn srcset cho ảnh
node tools/prerender-fire.mjs # in sẵn biểu phí cháy nổ (59 dòng Phụ lục VI) vào HTML cho bot không chạy JS; chạy lại khi đổi tariff-data.js
node tools/gen-news.mjs       # mục Tin tức và các bài
node tools/gen-why-pvi.mjs    # khối "Vì sao chọn PVI" trên trang chủ (chép từ baohiempvi-vn: thị phần, AM Best, công trình)
node tools/gen-hero-orbit.mjs # thẻ sản phẩm chạy vòng ở đầu trang chủ; thêm sản phẩm: sửa tools/data/hero-products.mjs rồi chạy lại
node tools/gen-sitemap.mjs    # PHẢI chạy sau cùng: sinh lại dist/sitemap.xml (không sửa tay file này)
```
- `tools/chrome.mjs`: header, menu, chân trang, thẻ SEO dùng chung. Hai trang `dist/index.html` và `dist/san-pham/chay-no-bat-buoc/index.html` sửa tay; header và chân trang của chúng lấy từ chrome.mjs qua `tools/patch-static.mjs`. JSON-LD của trang chủ thì sửa tay. Bảng trong `#fire-ref` của trang cháy nổ nằm giữa hai dấu `<!-- fire-ref:start ... -->` / `<!-- fire-ref:end -->`, do `tools/prerender-fire.mjs` sinh: không sửa tay, `page.js` vẫn vẽ lại theo tab khi trang tải.
- `tools/data/*.mjs`: dữ liệu đã duyệt, chuyển nguyên văn từ `product-data.ts`, `tnds-data.ts`, `accident-data.ts` của baohiempvi-vn. **Không gõ lại số liệu bằng tay.**

Xem thử: `npx vite dist` hoặc bất kỳ static server nào trỏ vào `dist/`.

## Quy tắc bắt buộc
**Dữ liệu và pháp lý**
- Không tự sửa phí, quyền lợi, điều kiện, loại trừ, căn cứ pháp lý, dữ liệu pháp nhân. Chỉ lấy từ `tools/data` hoặc từ nguồn chính thức PVI. Có mâu thuẫn thì hỏi chủ site.
- Thông tin liên hệ đã chốt:
  - Tư vấn / Zalo: **0938 072 236**
  - Số thứ hai: **0918 981 869** (cùng một người với 0938)
  - Bồi thường: **1900 54 54 58**, dùng trên toàn site
  - Email: **giadinhpvi@gmail.com**
  - Trụ sở: **Tầng 12A, Tòa nhà 194 Golden Building, 473 Điện Biên Phủ, P. Thạnh Mỹ Tây, TP.HCM**
  - MST: **0105402531-041**
  - Zalo OA: `https://zalo.me/2076363329232219188?src=qr&f=1`
- **Không dùng** dữ liệu của site pvihcm.com cũ: địa chỉ Thủ Đức, số 0901728999, NĐ 03/2021, bậc giảm phí tai nạn 15%/30%, IBond… Bản xuất site cũ ở `E:\Codex\PVIHCM\old-site-export\`, chỉ để tham khảo.

**Logo và thiết kế**
- Chỉ dùng logo gốc `dist/assets/pvi-logo.svg`, không vẽ lại, không đổi màu.
- Màu chủ đạo xanh/trắng: chữ #17212E, xanh #164F87, nền #F5F7F9, chữ phụ #586574. Đỏ #CB2530 chỉ làm điểm nhấn nhỏ (nút chính, hotline bồi thường).
- Hiệu ứng nền 3D chỉ dùng cho pvihcm, không mang sang baohiempvi-vn.

**Độ dễ đọc** (kiểm trước khi giao)
- Chữ nội dung ≥ 16px, nhãn phụ ≥ 13px, không bao giờ dùng 10–12px cho nội dung có ý nghĩa.
- Tương phản đạt AA (4,5:1).
- Vùng bấm ≥ 44px.
- Không cuộn ngang ở 360 / 390 / 768 / 1280 / 1440px.

**Văn phong** (chống giọng máy)
- Không dùng gạch dài "—". `clean()` trong chrome.mjs tự thay khi sinh trang.
- Không dựng 3 thẻ bằng nhau; ưu tiên bảng kẻ chỉ.
- Không bịa số liệu, ngày tháng, đánh giá, FPS.

**Quy tắc viết bài Tin tức / Kiến thức (chủ site chốt 14/10/2026, bắt buộc)**
- Đọc `QUY-TAC-VIET-BAI.md` trước khi viết bài. File này giống hệt bản trong repo baohiempvi-vnwebsite; sửa bên nào thì chép sang bên kia.
- Kiến thức chung, cập nhật pháp lý và bài theo khu vực: bản chuẩn ở baohiempvi-vn.com. Tin tức đơn vị: bản chuẩn ở pvihcm.com.
- Loạt bài "Mua bảo hiểm PVI tại <khu vực>" (chủ site giao 15/10/2026): `tools/articles/khu-vuc.mjs` + dữ liệu `tools/data/khu-vuc.json` (chép từ `app/area-articles.json` của baohiempvi-vnwebsite) + CSS `dist/khu-vuc.css`. Trang khai canonical về baohiempvi-vn.com nên không vào sitemap. Liên hệ đẩy về Zalo 0938 072 236 (`https://zalo.me/0938072236`, được `checkNoOutbound` cho phép cùng Zalo OA). `tools/data/don-vi-pvi.json` là bản chép danh bạ đơn vị PVI phía Nam từ `app/pvi-member-directory.json`.
- Đăng lại bài đã có bản chuẩn ở site khác: thêm `canonical: 'https://...'` vào `post` của module bài. `renderKb()` in canonical đó, `gen-sitemap.mjs` tự bỏ trang khỏi sitemap.

**Link ra ngoài (chủ site chốt 05/10/2026, bắt buộc)**
- Bài viết (mục Tin tức và mọi bài nội dung) **TUYỆT ĐỐI không có link ra ngoài**, đặc biệt không bao giờ link hay nhắc tên website của công ty bảo hiểm khác (đối thủ). Chỉ được: link nội bộ pvihcm.com, `tel:`, `mailto:` và Zalo OA của đơn vị.
- Nguồn tham chiếu ghi bằng chữ (tên tài liệu + đơn vị phát hành), không gắn link, không để URL trong HTML.
- `checkNoOutbound` trong `tools/gen-news.mjs` dừng sinh trang nếu phát hiện link ra ngoài. Không được tắt hay nới chốt này.
- Trang sản phẩm và trang chủ hiện còn link sang pvi.com.vn và cổng văn bản Chính phủ: giữ nguyên tới khi chủ site quyết định.

**Bấm link mở tab mới, chỉ trên máy tính (chủ site chốt 28/10/2026, áp dụng cho mọi trang hiện có và sau này)**
- Chỉ áp dụng khi thiết bị có chuột (`(hover:hover) and (pointer:fine)`). Điện thoại và máy tính bảng cảm ứng mở cùng tab như cũ (link vốn đã có sẵn `target="_blank"` trong HTML thì vẫn giữ).
- Đoạn `opensNewTab` / `setNewTab` ở đầu phần hiệu ứng trong `dist/app.js` tự gắn `target="_blank" rel="noopener"` cho mọi link http/https. Mọi trang đều nạp `app.js` (qua `page()` trong `tools/chrome.mjs` và `dist/index.html`), nên trang mới không cần làm gì thêm. Trang viết tay mới phải nạp `/app.js`.
- Giữ nguyên tab cho: link nhảy mục trong cùng trang (`#...`), `tel:`, `mailto:`, link có `download`. Link nào cần mở cùng tab thì thêm `data-same-tab`.
- Không gỡ hay đảo quy tắc này khi chủ site chưa đồng ý.

**Trang và URL**
- Trang hoặc bài mới: hỏi chủ site gắn ở đâu (URL, mục, link từ đâu) rồi mới push.
- Không tự đổi URL, xóa trang hay tạo redirect khi chưa được đồng ý.

**Hiệu năng** (Lighthouse gần nhất: điện thoại 94–100, máy tính 98–100 trên các trang sản phẩm)
- Ảnh mới phải có `width`/`height` và bản -480/-800. Chạy `tools/srcset.mjs` để gắn srcset.
- Không thêm font hay script từ CDN chặn hiển thị.
- Bộ tính phí phải điền sẵn giá trị mặc định trong HTML để không xô bố cục.

**Git**
- Commit tiếng Việt, mô tả ngắn điều đã đổi.
- Không force-push `main`.
- Trước khi push, kéo về (`git pull --rebase`) vì có nhiều agent cùng làm.

## Tên miền gốc: nghiêm cấm đổi, mọi thay đổi phải qua 2 bước
**Chủ site chốt ngày 15/10/2026, có hiệu lực cho đến khi chủ site yêu cầu thay đổi. Mục này cao hơn mọi mục khác.** Áp dụng giống mục 16 của repo baohiempvi-vnwebsite.

Tên miền gốc: **`https://pvihcm.com`** (không có www).

**Nghiêm cấm, không có ngoại lệ**
- Không đổi tên miền gốc sang tên miền khác (kể cả thêm/bỏ `www`), không trỏ canonical, sitemap, robots.txt hay schema sang tên miền khác. Ngoại lệ duy nhất đã có: bài đăng lại có bản chuẩn ở `https://www.baohiempvi-vn.com` theo `QUY-TAC-VIET-BAI.md`.
- Site khác phải là repo riêng; không gắn tên miền khác vào project Vercel của repo này.

**Mọi thay đổi dù nhỏ nhất trên tên miền gốc phải qua 2 bước**
Phạm vi: đổi tên, xóa, gộp trang/đường dẫn đang có; thêm, sửa, xóa chuyển hướng trong `vercel.json`; `trailingSlash`, `www`/https, canonical, robots.txt, sitemap; file xác minh Search Console; cấu hình tên miền/DNS trên Vercel hoặc nơi quản lý tên miền (kể cả việc "trỏ domain pvihcm.com sang Vercel" trong mục Việc đang mở).
1. **Bước 1, CẢNH BÁO:** agent gửi chủ site tin bắt đầu bằng `⚠️ CẢNH BÁO THAY ĐỔI TRÊN TÊN MIỀN GỐC`, ghi rõ đổi gì (cũ → mới), ảnh hưởng tới quảng cáo, SEO, link đã chia sẻ, cách hoàn tác. Chưa sửa gì ở bước này.
2. **Bước 2, PHÊ DUYỆT:** chỉ làm khi chủ site trả lời đúng cụm `DUYỆT THAY ĐỔI TÊN MIỀN` cho đúng cảnh báo đó. "ok", "làm đi", "đẩy lên", "sửa luôn" **không** tính là phê duyệt. Mỗi lần duyệt chỉ cho đúng thay đổi đã cảnh báo.
3. Khi đã duyệt: cập nhật `tools/domain-lock.json` cho đúng thay đổi đó; commit ghi `Đã qua 2 bước: cảnh báo <ngày> · phê duyệt <ngày>`.

**Chốt tự động:** `node tools/check-domain.mjs` so với bản khóa `tools/domain-lock.json` (tên miền, 56 chuyển hướng, `trailingSlash`, 15 trang đang có, file xác minh Search Console, canonical, sitemap, robots). Trang mới thêm vào thì không bị chặn; xóa/đổi trang cũ hay sửa chuyển hướng thì hỏng. **Không sửa script hay bản khóa để cho qua** khi chưa có phê duyệt.

## Việc đang mở
- Nhận xét, đánh giá bạn đọc cuối mọi bài Tin tức (`feedbackBlock` trong `tools/gen-news.mjs`, `dist/feedback.js`, CSS `.fb` trong `news.css`, hàm `api/nhan-xet.js`). Lưu ở Vercel Blob, gửi là hiện ngay (chủ site chốt 05/10/2026: không duyệt trước, thấy không phù hợp thì xóa). Cần trên Vercel: Blob store kết nối project (biến `BLOB_READ_WRITE_TOKEN`) và biến `ADMIN_KEY` để xóa qua web (mở bài với `?quantri`). Vì có `/api` cần thư viện `@vercel/blob`, `vercel.json` dùng `installCommand: npm ci`. Không gắn schema Review/AggregateRating cho các đánh giá này.
- Trỏ domain pvihcm.com sang Vercel. Chỉ sửa bản ghi A/CNAME, không đụng MX. **Phải qua 2 bước Cảnh báo → Phê duyệt (mục Tên miền gốc) trước khi làm.**
- Đã có: trang `/gioi-thieu/` và redirect 301 từ URL cũ trong `vercel.json` (mỗi luật có 2 biến thể có và không có dấu / cuối, vì trailingSlash chạy trước). Thêm URL cũ thì thêm cả 2 biến thể, luật cụ thể đặt trước luật `:id`.
- Sau khi trỏ domain: chủ site gửi sitemap trong Google Search Console.
- Xác minh Google Search Console bằng file `dist/google7d40bd15f458ed73.html` (thêm 07/10/2026). **Không xóa, không đổi tên, không sửa nội dung file này**, nếu không Search Console sẽ mất quyền xác minh.
- Trang chủ khối #ve-pvi: đã gỡ câu ghi chú nội bộ. Ba số liệu 2025 (#1, 16,93%, 14.908 tỷ) vẫn chờ chủ site gửi nguồn chính thức để ghi dòng trích nguồn.
- Rà soát định kỳ: axe-core (truy cập), wave.webaim.org, và đối chiếu chính tả bằng bản xuất chữ ở `E:CodexPVIHCM	ext-audit`. `clean()` trong chrome.mjs tự chuẩn hóa chính tả và gạch ngang cho trang sinh tự động; trang viết tay phải tự kiểm.
- Biểu phí TNDS đang theo NĐ 67/2023 (đối chiếu 08/05/2026). Cần xác nhận còn đúng sau NĐ 220/2026 (hiệu lực 01/07/2026).
- Nội dung PVI Care / sức khỏe từ site cũ: chưa quyết định có đưa lên không.
- `FINAL-POLISH.md` và `design-qa.md` là ghi chú của giai đoạn trước, đã cũ. File này mới là nguồn đúng.
