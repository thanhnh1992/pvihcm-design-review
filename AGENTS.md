# AGENTS.md: pvihcm.com

Hướng dẫn chung cho mọi agent làm việc trên repo này (Codex, Claude Code…). Đọc hết file trước khi sửa.

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
node tools/patch-static.mjs   # áp header/menu/chân trang mới cho index.html và trang cháy nổ
node tools/srcset.mjs         # PHẢI chạy sau cùng: gắn srcset cho ảnh
```
- `tools/chrome.mjs`: header, menu, chân trang, thẻ SEO dùng chung. Hai trang `dist/index.html` và `dist/san-pham/chay-no-bat-buoc/index.html` sửa tay; header và chân trang của chúng lấy từ chrome.mjs qua `tools/patch-static.mjs`. JSON-LD của trang chủ thì sửa tay.
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

## Việc đang mở
- Trỏ domain pvihcm.com sang Vercel. Chỉ sửa bản ghi A/CNAME, không đụng MX.
- Đã có: trang `/gioi-thieu/` và redirect 301 từ URL cũ trong `vercel.json` (mỗi luật có 2 biến thể có và không có dấu / cuối, vì trailingSlash chạy trước). Thêm URL cũ thì thêm cả 2 biến thể, luật cụ thể đặt trước luật `:id`.
- Sau khi trỏ domain: chủ site gửi sitemap trong Google Search Console.
- Trang chủ khối #ve-pvi: dòng `source-note` đang hiện công khai câu "cần bổ sung tài liệu nguồn... trước khi công bố". Chờ chủ site cung cấp nguồn số liệu 2025.
- Biểu phí TNDS đang theo NĐ 67/2023 (đối chiếu 08/05/2026). Cần xác nhận còn đúng sau NĐ 220/2026 (hiệu lực 01/07/2026).
- Nội dung PVI Care / sức khỏe từ site cũ: chưa quyết định có đưa lên không.
- `FINAL-POLISH.md` và `design-qa.md` là ghi chú của giai đoạn trước, đã cũ. File này mới là nguồn đúng.
