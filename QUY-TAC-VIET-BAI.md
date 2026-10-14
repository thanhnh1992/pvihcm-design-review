# Quy tắc viết bài Tin tức và Kiến thức (dùng chung pvihcm.com và baohiempvi-vn.com)

Chủ site chốt ngày 14/10/2026. Áp dụng cho mọi người và mọi agent (Claude, Codex…) viết bài trên
hai repo `pvihcm-design-review` (pvihcm.com) và `baohiempvi-vnwebsite` (baohiempvi-vn.com).
Bản này giống nhau ở cả hai repo; sửa một bên thì chép sang bên kia.

---

## 1. Bài nào lấy site nào làm bản chuẩn

Mỗi chủ đề chỉ có **một bản chuẩn** (bản gốc để Google xếp hạng và để AI trích dẫn).

| Loại bài | Bản chuẩn | Ví dụ |
|---|---|---|
| **Kiến thức chung**: sản phẩm, quyền lợi, loại trừ, hồ sơ, bồi thường, giải thích pháp lý | **baohiempvi-vn.com** (`/kien-thuc/...` hoặc bài SEO) | Bảo hiểm tai nạn 24/24 có chi trả khi té xe không; thủy kích là gì; hồ sơ bồi thường cháy nổ |
| **Tin tức đơn vị**: nhân sự, sự kiện, thông báo của PVI Thành Đô | **pvihcm.com** (`/tin-tuc/...`) | Công bố quyết định bổ nhiệm; lịch làm việc dịp lễ |
| **Bài theo khu vực**: mua bảo hiểm PVI ở một quận, tỉnh | **pvihcm.com** (`/tin-tuc/...`) | Mua bảo hiểm PVI tại Bình Thạnh, Bình Dương |
| **Cập nhật pháp lý** (nghị định, thông tư mới) | **baohiempvi-vn.com** | Nghị định 347/2026 thay đổi gì |

Bài kiến thức đã đăng trên pvihcm.com trước ngày 14/10/2026 (tai nạn công trình, lợi ích tai nạn cá nhân,
Nghị định 347) giữ nguyên URL; khi baohiempvi-vn có bài cùng chủ đề thì xử lý theo mục 2.

## 2. Khi site còn lại cũng cần nói về chủ đề đó

Chọn **một** trong hai cách, không đăng hai bản giống nhau:

1. **Viết góc khác (ưu tiên).** Khác tiêu đề, khác H1, khác câu hỏi chính, phần lớn nội dung viết mới.
   Ví dụ: baohiempvi-vn viết "quyền lợi và hồ sơ bồi thường tai nạn 24/24"; pvihcm viết "mua bảo hiểm tai nạn
   cho công nhân ở TP.HCM: liên hệ ai, chuẩn bị gì".
2. **Đăng lại nguyên bài.** Trang bản phụ phải khai báo `canonical` trỏ về URL bản chuẩn, và **không** đưa vào
   sitemap của site bản phụ.
   - pvihcm.com: thêm `canonical: 'https://www.baohiempvi-vn.com/...'` vào `post` của module bài trong
     `tools/articles/`. `renderKb()` tự in canonical đó, `tools/gen-sitemap.mjs` tự bỏ trang khỏi sitemap.

Link giữa hai site:
- **pvihcm.com không link ra ngoài, kể cả sang baohiempvi-vn** (chủ site chốt 05/10/2026, có chốt chặn
  `checkNoOutbound`). Quan hệ bản chuẩn giữa hai site chỉ thể hiện qua thẻ `canonical`.
- baohiempvi-vn được link sang pvihcm.com theo quy tắc riêng của repo đó.
- **Không site nào link hay nhắc tên website công ty bảo hiểm khác.**

## 3. Cấu trúc HTML để Google và AI dễ trích dẫn

Mục tiêu: một đoạn bất kỳ cắt ra vẫn tự đứng được, đúng sự thật, có nguồn và ngày.

### 3.1 Đầu bài
- **Một H1 duy nhất**, nói đúng câu hỏi hoặc chủ đề người dùng tìm. Tiêu đề trang (`<title>`) tối đa khoảng 60 ký tự,
  mô tả (`meta description`) tối đa khoảng 155 ký tự, cả hai viết riêng, không trùng bài khác.
- **Đoạn mở bài trả lời thẳng câu hỏi trong 40 đến 60 chữ**, nằm ngay sau H1. Không mở bằng câu chung chung
  kiểu "Trong cuộc sống hiện đại…".
- Ngay dưới mở bài: **đơn vị biên soạn, ngày đăng** (và ngày cập nhật nếu có sửa), thời gian đọc.
- Bài dài từ 5 mục trở lên: có **mục lục** dẫn tới các H2.

### 3.2 Thân bài
- **Mỗi H2 là một câu hỏi hoặc một ý rõ ràng** người dùng thật hay hỏi.
- **Câu đầu tiên dưới mỗi H2 trả lời trực tiếp** (1 đến 2 câu), rồi mới giải thích. Tránh "như đã nói ở trên",
  "điều này" ở đầu mục, vì khi bị cắt riêng sẽ mất nghĩa.
- **Định nghĩa viết dạng "X là …"** trong một câu đầy đủ.
- Quy trình dùng `<ol>`, danh sách dùng `<ul>`, so sánh dùng `<table>` có `<th scope>`.
  Không đặt nội dung chính trong ảnh, slider, tab ẩn hay chỉ hiện sau khi bấm (trừ FAQ dạng `<details>`).
- **Mọi nội dung chính phải có trong HTML server**, không sinh bằng JavaScript sau khi tải trang.
- Đoạn văn ngắn (2 đến 4 câu), một ý một đoạn.

### 3.3 Số liệu và nguồn
- **Không bịa** phí, quyền lợi, tỷ lệ, điều khoản, căn cứ pháp lý. Thiếu nguồn thì để trống và hỏi chủ site.
- Mỗi con số cần có **nguồn ghi ngay cạnh** (tên văn bản hoặc trang, đơn vị phát hành, ngày hoặc phiên bản).
  pvihcm.com ghi nguồn bằng chữ, không gắn link.
- Văn bản pháp luật ghi đủ số hiệu, ngày ban hành, ngày hiệu lực.
- Ví dụ từ hồ sơ thật ghi rõ là ví dụ ("trên giấy chứng nhận này…"), không biến thành cam kết chung.
- Tình huống giả định ghi rõ "Tình huống giả định".

### 3.4 Cuối bài
- **Câu hỏi thường gặp: 3 đến 6 câu**, là câu khách thật hay hỏi. Mỗi câu trả lời 40 đến 80 chữ, đọc riêng vẫn hiểu.
- **Link nội bộ** về trang sản phẩm chính và bài liên quan cùng site.
- Mục **Nguồn tham chiếu**.
- Một lời kêu gọi rõ ràng (gọi, Zalo, tính phí). Không lặp nhiều nút cùng ý.
- Dòng miễn trừ: phạm vi, điều kiện, phí chính thức theo quy tắc và hợp đồng Bảo hiểm PVI phát hành.

### 3.5 Dữ liệu cấu trúc (JSON-LD, có trong HTML server)
- Bài kiến thức: `Article`. Tin tức đơn vị: `NewsArticle`.
  Có `headline`, `description`, `image`, `datePublished`, `dateModified`, `author`, `publisher`, `mainEntityOfPage`.
- `BreadcrumbList` khớp đường dẫn hiển thị trên trang.
- `FAQPage` chỉ khi FAQ hiển thị trên trang, câu chữ khớp nguyên văn.
- Không tự thêm `Review`, `AggregateRating` hay chức danh chuyên gia không có thật.
- Ngày trong JSON-LD là ngày thật, không suy từ ngày commit.

### 3.6 Ảnh
- Ảnh đầu bài và ít nhất một ảnh trong thân bài; WebP, có `width`/`height`, có bản nhỏ cho điện thoại.
- Ảnh chụp thật: chú thích `Ảnh thực tế: <cảnh> · Nguồn: <đơn vị>`. Ảnh không phải chụp sự việc thật:
  chú thích bắt đầu bằng `Hình ảnh minh họa:` và chỉ tả cảnh.
- **Không nhắc tới AI** ở bất kỳ đâu (nội dung, chú thích, alt, tên file, metadata). Xóa EXIF/GPS trước khi dùng.
- Che tên khách, địa chỉ, số hợp đồng hoặc giấy chứng nhận, biển số, CCCD, chữ ký, QR trước khi đăng.
- Không dùng logo tự vẽ hoặc logo trong ảnh có thể do máy vẽ lại.

### 3.7 Văn phong
- Trả lời câu hỏi thật, cụ thể, giọng người có kinh nghiệm. Không sáo rỗng, không kéo dài để đủ chữ.
- Trình tự: nhu cầu → câu trả lời → căn cứ → giải thích → việc cần làm tiếp.
- pvihcm.com không dùng gạch dài "—".

## 4. Kiểm tra trước khi đẩy

- [ ] Đúng site bản chuẩn theo mục 1; site còn lại xử lý theo mục 2.
- [ ] Một H1; mở bài trả lời thẳng trong 40 đến 60 chữ; mỗi H2 mở bằng câu trả lời.
- [ ] Mọi số liệu có nguồn; không có số chưa kiểm chứng.
- [ ] JSON-LD parse được, FAQPage khớp FAQ hiển thị.
- [ ] Không link ra ngoài (pvihcm.com), không link hay nhắc tên đối thủ (cả hai site).
- [ ] Ảnh có chú thích đúng mẫu, đã che thông tin khách, không nhắc AI.
- [ ] Xem thử ở khổ 390px và 1280px: không tràn ngang, không lỗi console.
- [ ] Sinh lại sitemap (pvihcm.com: `node tools/gen-sitemap.mjs`); trang bản phụ không nằm trong sitemap.
