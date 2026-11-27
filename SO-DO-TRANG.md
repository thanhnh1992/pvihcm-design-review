# SƠ ĐỒ TRANG PVIHCM.COM: CẤU TRÚC CÂY (SILO)

**Chủ site chốt ngày 20/11/2026. Bắt buộc với mọi người và mọi AI (Codex, Claude Code…) làm trên repo này.**
Cấu trúc cây dưới đây **không được thay đổi**, không gắn trang hay link "lung tung". Muốn đổi thì phải hỏi chủ site trước và cập nhật file này trong cùng lần đổi.

Sơ đồ mẫu chủ site gửi: `Domain Index` (trang chủ) → `Subject` (trang chủ đề, ví dụ **Bình Dương**) → trang con (ví dụ **các dịch vụ ở Bình Dương**, **các xã phường, KCN Bình Dương**).

---

## 1. Ba tầng của cây

```
Tầng 0  DOMAIN INDEX            https://pvihcm.com/
          │
Tầng 1  TRANG CHỦ ĐỀ (Subject)   /san-pham/   /kien-thuc/   /tin-tuc/   /binhduong/   …
          │
Tầng 2  TRANG CON                /binhduong/tndsoto/   /binhduong/vatchatxeoto/   …
          │
Tầng 3  BÀI HỖ TRỢ (nếu có)      bài viết bổ trợ cho đúng 1 trang con
```

- Mỗi trang có **đúng 1 trang cha**. Trang cha thể hiện ở đường dẫn (URL) và ở breadcrumb.
- Không có trang nào nằm ngoài cây (trang "mồ côi", không trang cha nào dẫn tới).

## 2. Luật liên kết (theo mũi tên trong sơ đồ)

| Từ | Tới | Bắt buộc / Cho phép / Cấm |
|---|---|---|
| Trang chủ (tầng 0) | Mọi trang chủ đề tầng 1 | **Bắt buộc** |
| Trang chủ đề (tầng 1) | Trang chủ | **Bắt buộc** (logo, breadcrumb) |
| Trang chủ đề (tầng 1) | Tất cả trang con của chính nó | **Bắt buộc** |
| Trang con (tầng 2) | Trang chủ đề cha của nó | **Bắt buộc** (breadcrumb + 1 link trong nội dung) |
| Trang con (tầng 2) | Trang chủ | **Bắt buộc** (logo, breadcrumb) |
| Trang con (tầng 2) | Các trang con **cùng cha** (anh em) | **Bắt buộc**: nối ngang với nhau như hàng mũi tên dưới đáy sơ đồ |
| Trang con chủ đề A | Trang con của chủ đề Z | **CẤM** trong nội dung |
| Trang con | Trang chủ đề khác | Chỉ khi thật cần cho khách, tối đa 1 link, phải ghi lý do trong commit |
| Bài hỗ trợ (tầng 3) | Trang con cha của nó | **Bắt buộc** |

**Ngoại lệ duy nhất:** menu đầu trang, sơ đồ trang trong chân trang và chân trang là khung chung cố định của toàn site (`tools/chrome.mjs`). Các link trong khung chung không tính là "gắn lung tung". Không thêm link mới vào khung chung khi chưa hỏi chủ site.

## 3. Cây hiện tại (20/11/2026)

### Tầng 0
- `/` Trang chủ

### Tầng 1 và tầng 2

**`/san-pham/` Sản phẩm**
- `/san-pham/bao-hiem-o-to/` (con: `/san-pham/bao-hiem-o-to/dat-mua/`, trang đặt mua, noindex)
- `/san-pham/bao-hiem-bat-buoc/`
- `/san-pham/bao-hiem-vat-chat-xe/`
- `/san-pham/chay-no-bat-buoc/` (con: `/san-pham/chay-no-bat-buoc/bao-gia-theo-co-so/`, báo giá theo loại cơ sở và mẫu giấy chứng nhận)
- `/san-pham/bao-hiem-tai-nan/`
- `/san-pham/bao-hiem-suc-khoe/`
- `/san-pham/bao-hiem-y-te/` BHYT hộ gia đình và BHXH tự nguyện
- `/san-pham/bao-hiem-cong-trinh/`
- `/san-pham/bao-hiem-du-lich/`
- `/san-pham/hang-hoa-xuat-nhap-khau/`
- `/san-pham/bao-hiem-trach-nhiem/` Danh sách 10 mục bảo hiểm trách nhiệm và giải thưởng golf. Sinh bằng `node tools/gen-trach-nhiem.mjs` trước `node tools/gen-san-pham.mjs`.

**`/kien-thuc/` Kiến thức** (chia theo sản phẩm, dữ liệu `tools/data/kien-thuc-hub.mjs`)
- `/kien-thuc/bao-hiem-o-to/` · `/kien-thuc/chay-no-bat-buoc/` · `/kien-thuc/tai-nan-24-24/` · `/kien-thuc/suc-khoe/` · `/kien-thuc/cong-trinh-lap-dat/` · `/kien-thuc/du-lich/` · `/kien-thuc/hang-hoa/`
- Bài kiến thức ở `/kien-thuc/<slug>/` hoặc giữ URL cũ `/tin-tuc/<slug>/`: mỗi bài thuộc đúng 1 nhóm sản phẩm ở trên.
- `/kien-thuc/bao-hiem-o-to/bao-hiem-than-vo-hyundai-santa-fe/` Bài tính phí tham khảo cho Hyundai Santa Fe của PVI Thành Đô, thuộc nhóm Bảo hiểm ô tô.
- `/kien-thuc/tinhphinhanhtheotenxe/` Danh sách dòng xe theo hãng, dẫn vào các bài phí đã có. Có lối vào từ trang Kiến thức và ô tra cứu trên trang Bảo hiểm vật chất xe.

**`/tin-tuc/` Tin tức**: tin đơn vị, pháp lý mới, tin sản phẩm. Bài theo khu vực TP.HCM (`/tin-tuc/mua-bao-hiem-pvi-<quận>/`), Đồng Nai, Vũng Tàu hiện cũng nằm ở đây.
- `/tin-tuc/mua-bao-hiem-y-te-online/` hướng dẫn đăng ký và gia hạn BHYT hộ gia đình tại TP.HCM, hỗ trợ trang tính mức đóng BHYT.
- `/tin-tuc/lich-nghi-tet-nguyen-dan-2027/` lịch nghỉ Tết Đinh Mùi theo Bộ Nội vụ và mẫu thông báo cho doanh nghiệp.
- `/tin-tuc/lich-nghi-le-tet-2027/` bảng tra các đợt nghỉ lễ, Tết trong năm 2027.
- `/tin-tuc/nghi-le-tet-2027-huong-luong-va-nghi-bu/` hướng dẫn tính ngày nghỉ bù và lương làm thêm dịp lễ, Tết.

**`/binhduong/` Bình Dương** (nhánh khu vực, đúng như ví dụ trong sơ đồ, dựng bằng `tools/gen-binhduong.mjs`)
- Nhánh t2a, **các dịch vụ ở Bình Dương**:
  - `/binhduong/sanpham/` Biểu phí bảo hiểm PVI tại Bình Dương
  - `/binhduong/tndsoto/` · `/binhduong/vatchatxeoto/` · `/binhduong/chaynobatbuoc/` · `/binhduong/taisannhaxuong/` · `/binhduong/congtrinhlapdat/` · `/binhduong/hanghoaxuatnhapkhau/` · `/binhduong/nguoilaodongthicong/` · `/binhduong/tainan2424/` · `/binhduong/suckhoe/` · `/binhduong/dulichquocte/`
- Nhánh t2b, **các xã phường, KCN Bình Dương**: hiện chỉ là 2 mục trong trang `/binhduong/` (`#dia-chi-pvi-binh-duong`, `#phi-khu-cong-nghiep`), **chưa có trang riêng**. Khi làm trang riêng, URL theo mẫu `/binhduong/<ten-phuong-hoac-kcn>/`, cha là `/binhduong/`.

**Nhánh các tỉnh từ Bình Thuận trở vào** (chủ site giao 20/11/2026; tên tỉnh cũ trước sắp xếp 01/7/2025; Bình Dương và TP.HCM chủ site tự viết). Dựng bằng `tools/gen-tinh.mjs`, dữ liệu mỗi tỉnh `tools/data/tinh/<slug>.mjs`, câu lệnh tạo ảnh `tools/data/tinh/<slug>-anh-gpt.md`. Mỗi tỉnh cùng một khuôn:
- `/<tinh>/` trang tỉnh → `/<tinh>/sanpham/` danh mục → 10 trang con: `tndsoto`, `vatchatxeoto`, `chaynobatbuoc`, `taisannhaxuong`, `congtrinhlapdat`, `hanghoaxuatnhapkhau`, `nguoilaodongthicong`, `tainan2424`, `suckhoe`, `dulichquocte`.
- Trang con nối ngang với 9 sản phẩm cùng tỉnh, dẫn lên trang tỉnh và danh mục; chỉ 1 link sang trang sản phẩm chung `/san-pham/...` (công cụ tra phí). Không link sang tỉnh khác.
- Đã có: `/cantho/` (TP Cần Thơ cũ, mẫu đầu tiên, chờ chủ site duyệt trước khi làm các tỉnh còn lại).
- Đã có: `/vungtau/` (tỉnh Bà Rịa – Vũng Tàu cũ, chủ site giao 21/11/2026). Cuối mỗi trang tỉnh có 2 khối như `/binhduong/`: khu công nghiệp (`#khu-cong-nghiep`, dữ liệu `kcn`: tên, vị trí, ngành nghề) và phường, xã lớn (`#phuong-xa`, dữ liệu `hanhChinh.viDu`: tên mới kèm đơn vị cũ hợp thành).

**`/tphcm/` Mua bảo hiểm PVI tại TP.HCM** (sinh bằng `node tools/gen-tphcm.mjs`, dữ liệu `tools/data/tphcm.mjs`).
- Vị trí dẫn vào do chủ site chọn: ô **TP. Hồ Chí Minh** trong nhóm Đông Nam Bộ của `/gioi-thieu/#dia-ban`.
- Trang TP.HCM dẫn xuống `/tphcm/sanpham/` và 10 trang sản phẩm tương ứng với nhánh Bình Dương. Các trang sản phẩm nối ngang và dẫn lên trang TP.HCM, danh mục.
- Mục quận, huyện cũ dẫn xuống 22 bài khu vực đang có trong `/tin-tuc/`. Quận 2, Quận 9 và quận Thủ Đức cũ dùng chung bài Thủ Đức. Giữ URL, breadcrumb và canonical của các bài hiện có.

**Trang đơn vị** (con trực tiếp của trang chủ): `/gioi-thieu/` · `/huong-dan/` · `/tai-nan-doanh-nghiep/` · `/chinh-sach-bao-ve-du-lieu-ca-nhan/`

## 4. Thêm trang mới: làm đúng thứ tự

1. Chọn **đúng 1 trang cha** có sẵn trong mục 3. Không tìm được cha thì **dừng lại hỏi chủ site**, không tự tạo chủ đề tầng 1 mới.
2. Đặt URL nằm dưới URL của cha, ví dụ con của `/binhduong/` là `/binhduong/<slug>/`.
3. Gắn đủ link bắt buộc ở mục 2: lên cha, về trang chủ, ngang với anh em. Trang cha thêm link xuống trang mới.
4. Không gắn link nội dung sang trang con của chủ đề khác.
5. Cập nhật mục 3 của file này trong cùng commit.
6. Chạy `node tools/gen-sitemap.mjs` (sitemap, llms.txt, tìm kiếm) và `node tools/check-domain.mjs`.

**Cấm:** đổi URL, đổi trang cha, xóa hay gộp trang, thêm chuyển hướng khi chưa hỏi chủ site (AGENTS.md, mục Trang và URL).

## 5. Điểm đang lệch so với sơ đồ (chờ chủ site quyết, CHƯA sửa)

Các điểm dưới đây có sẵn từ trước khi chốt sơ đồ. Ghi lại để không ai làm lệch thêm. Chỉ sửa khi chủ site đồng ý.

1. **Bình Dương có 2 bộ trang cùng chủ đề.** 10 trang `/binhduong/<dịch vụ>/` và 10 bài `/tin-tuc/bao-hiem-<dịch vụ>-binh-duong/` nói cùng một việc, ví dụ `/binhduong/tndsoto/` và `/tin-tuc/bao-hiem-tnds-o-to-binh-duong/`. Thêm cặp `/binhduong/` và `/tin-tuc/mua-bao-hiem-pvi-binh-duong/`. Google có thể coi là trùng và để 2 trang tranh nhau một từ khóa. Hướng đề xuất: coi bài `/tin-tuc/` là **bài hỗ trợ tầng 3** của trang `/binhduong/` tương ứng (đổi góc viết cho khác), hoặc chọn 1 trang làm bản chuẩn.
2. **Trang con Bình Dương chưa nối ngang với nhau.** Ví dụ `/binhduong/tndsoto/` chỉ dẫn về `/binhduong/` và `/binhduong/sanpham/`, chưa dẫn sang các dịch vụ anh em (sơ đồ yêu cầu nối ngang).
3. **Link chéo nhánh:** `/kien-thuc/bao-hiem-o-to/` đang dẫn sang các bài Bình Dương (`/tin-tuc/bao-hiem-tnds-o-to-binh-duong/`, `/tin-tuc/bao-hiem-vat-chat-xe-o-to-binh-duong/`).
4. **Đồng Nai chưa có nhánh riêng:** bài Đồng Nai nằm trong `/tin-tuc/`. Nếu làm nhánh theo mô hình Bình Dương thì phải hỏi chủ site trước.
