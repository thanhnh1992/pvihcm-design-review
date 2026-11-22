/**
 * PVI Thành Đô — nhận đơn hàng từ website, ghi vào Google Sheet và báo mail.
 * Nhận thêm ảnh bằng chứng chuyển khoản: lưu Google Drive, gắn link vào dòng
 * đơn, đổi trạng thái và gửi mail kèm ảnh.
 *
 * CÁCH CÀI LẦN ĐẦU (khoảng 3 phút):
 *  1. Mở Sheet "PVI Thành Đô — Đơn hàng online"
 *  2. Menu Tiện ích mở rộng (Extensions) → Apps Script
 *  3. Xoá hết code mẫu, dán toàn bộ file này vào
 *  4. Sửa dòng EMAIL_NHAN bên dưới thành email muốn nhận thông báo
 *  5. Bấm Triển khai (Deploy) → Lượt triển khai mới (New deployment)
 *       - Loại (Type): Ứng dụng web (Web app)
 *       - Thực thi với tư cách (Execute as): Tôi (Me)
 *       - Ai có quyền truy cập (Who has access): Bất kỳ ai (Anyone)
 *  6. Copy đường dẫn web app (dạng https://script.google.com/macros/s/.../exec)
 *     rồi đưa cho Claude để gắn vào website.
 *
 * CẬP NHẬT BẢN ĐANG CHẠY (giữ nguyên đường dẫn /exec, website không phải sửa):
 *  1. Mở Apps Script của Sheet, dán đè toàn bộ file này
 *  2. GIỮ NGUYÊN 3 dòng EMAIL_NHAN, SHARED_SECRET, TEN_SHEET như bản cũ
 *  3. Triển khai → Quản lý lượt triển khai (Manage deployments) → biểu tượng
 *     bút chì → Phiên bản (Version): Phiên bản mới (New version) → Triển khai
 *     (KHÔNG chọn "Lượt triển khai mới" — làm vậy sẽ ra đường dẫn khác)
 *  4. Google hỏi quyền truy cập Google Drive thì bấm Cho phép: cần quyền này
 *     để lưu ảnh bằng chứng chuyển khoản
 *  5. Chạy thử: chọn hàm chayThu → Run, rồi hàm chayThuBangChung → Run.
 *     Sheet có dòng TEST-0001 kèm link ảnh, hộp thư có 2 mail. Xoá dòng thử sau.
 *
 * THÊM TAB "CNBB" (yêu cầu từ công cụ cháy nổ bắt buộc): làm đúng các bước
 * "CẬP NHẬT BẢN ĐANG CHẠY" ở trên (dán đè, giữ 3 dòng cấu hình, triển khai
 * Phiên bản mới). Tab CNBB TỰ ĐƯỢC TẠO khi có yêu cầu đầu tiên, hoặc chạy hàm
 * chayThuCnbb để tạo ngay và có dòng TEST-CNBB. Xoá dòng thử sau.
 * Trước khi cập nhật script, yêu cầu cháy nổ vẫn không mất: website ghi tạm
 * vào tab đơn hàng như yêu cầu tư vấn.
 *
 * THÊM TAB "Đánh giá" (khách chấm sao trên pvihcm.com, chủ site yêu cầu 22/11/2026):
 * làm đúng các bước "CẬP NHẬT BẢN ĐANG CHẠY" ở trên (dán đè, giữ 3 dòng cấu hình,
 * triển khai Phiên bản mới). Tab "Đánh giá" TỰ ĐƯỢC TẠO khi có lượt đánh giá đầu
 * tiên, hoặc chạy hàm chayThuDanhGia để tạo ngay (có dòng TEST-DANH-GIA, xoá sau).
 * Đánh giá từ 1 đến 2 sao gửi thêm mail báo để kịp liên hệ khách.
 * Trước khi cập nhật script, đánh giá vẫn lưu trên website, chỉ chưa vào Sheet.
 *
 * LƯU Ý: chọn "Anyone" thì ai biết link cũng gửi được dữ liệu vào Sheet.
 * Vì vậy script kiểm tra SHARED_SECRET — website phải gửi đúng chuỗi này.
 * Đổi SHARED_SECRET thành chuỗi ngẫu nhiên của riêng bạn.
 * Ảnh bằng chứng chỉ được nhận khi mã đơn VÀ số điện thoại khớp cùng một dòng,
 * và lưu trong thư mục Drive riêng của bạn (không chia sẻ công khai).
 */

const EMAIL_NHAN = "EMAIL-NHAN-THONG-BAO@gmail.com"; // GIỮ email đang dùng trong bản đang chạy
const SHARED_SECRET = "DOI-CHUOI-NAY-THANH-CHUOI-NGAU-NHIEN-CUA-BAN";
const TEN_SHEET = "Trang tính1"; // đổi nếu bạn đổi tên tab
const TEN_SHEET_CNBB = "CNBB"; // tab yêu cầu cháy nổ bắt buộc, tự tạo nếu chưa có
const TEN_SHEET_DANH_GIA = "Đánh giá"; // tab đánh giá sao từ website, tự tạo nếu chưa có
const TIEU_DE_DANH_GIA = [
  "Thời gian", "Số sao", "Nhận xét", "Tên hiển thị", "Loại", "Trang", "Tiêu đề trang", "Mã lưu trữ", "Đã xử lý", "Ghi chú",
];
const MAIL_DANH_GIA_THAP = 2; // báo mail khi khách chấm từ số sao này trở xuống; đặt 0 để tắt
const TIEU_DE_CNBB = [
  "Thời gian", "Mã yêu cầu", "Loại yêu cầu", "Số điện thoại", "Email",
  "Tên đơn vị", "Chi tiết (tài sản · giá trị · phí tham khảo)", "Nguồn", "Trạng thái", "Ghi chú",
];

/** Cột "Trạng thái" (cột L) — dòng đơn mới ghi "Chờ thanh toán". */
const COT_TRANG_THAI = 12;
const TIEU_DE_COT_BANG_CHUNG = "Bằng chứng thanh toán";
const TEN_THU_MUC_BANG_CHUNG = "PVI Thành Đô — Bằng chứng thanh toán";
const LOAI_ANH = ["image/jpeg", "image/png", "image/webp"];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Ảnh bằng chứng chuyển khoản. Website gửi khoá dưới tên proofSecret (không
    // phải secret) để bản script cũ từ chối, không ghi nhầm thành đơn mới.
    if (data.action === "bang-chung") {
      if (data.proofSecret !== SHARED_SECRET) {
        return json({ ok: false, error: "Sai khoá xác thực." });
      }
      return json(luuBangChung(data));
    }

    // Yêu cầu từ công cụ cháy nổ bắt buộc → tab CNBB. Khoá gửi dưới tên
    // cnbbSecret để bản script cũ từ chối, không ghi nhầm vào tab đơn hàng.
    if (data.action === "cnbb") {
      if (data.cnbbSecret !== SHARED_SECRET) {
        return json({ ok: false, error: "Sai khoá xác thực." });
      }
      return json(luuCnbb(data));
    }

    // Đánh giá sao từ website → tab "Đánh giá". Khoá gửi dưới tên danhGiaSecret
    // để bản script cũ từ chối, không ghi nhầm vào tab đơn hàng.
    if (data.action === "danh-gia") {
      if (data.danhGiaSecret !== SHARED_SECRET) {
        return json({ ok: false, error: "Sai khoá xác thực." });
      }
      return json(luuDanhGia(data));
    }

    if (data.secret !== SHARED_SECRET) {
      return json({ ok: false, error: "Sai khoá xác thực." });
    }

    const sheet = laySheet();

    const thoiGian = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");

    sheet.appendRow([
      thoiGian,
      data.code || "",
      data.product || "",
      data.name || "",
      // Dấu nháy đầu để Sheet giữ nguyên số 0 ở đầu số điện thoại.
      data.phone ? "'" + data.phone : "",
      data.subject || "",
      data.detail || "",
      data.base || "",
      data.vat || "",
      data.total || "",
      data.online ? "Có" : "Không",
      "Chờ thanh toán",
      data.note || "",
      data.source || "",
      "",
    ]);

    guiMail(data, thoiGian);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/** Tab "Đánh giá": tạo kèm dòng tiêu đề nếu chưa có. */
function laySheetDanhGia() {
  const bang = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = bang.getSheetByName(TEN_SHEET_DANH_GIA);
  if (!sheet) {
    sheet = bang.insertSheet(TEN_SHEET_DANH_GIA);
    sheet.getRange(1, 1, 1, TIEU_DE_DANH_GIA.length).setValues([TIEU_DE_DANH_GIA]).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Ghi một lượt đánh giá sao; 1-2 sao thì báo mail. */
function luuDanhGia(data) {
  const soSao = Number(data.rating);
  if (!(soSao >= 1 && soSao <= 5)) return { ok: false, error: "Số sao không hợp lệ." };
  const sheet = laySheetDanhGia();
  const thoiGian = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
  sheet.appendRow([
    thoiGian,
    soSao,
    data.comment || "",
    data.name || "",
    data.kind || "",
    data.page || "",
    data.title || "",
    data.id || "",
    "",
    "",
  ]);
  if (MAIL_DANH_GIA_THAP && soSao <= MAIL_DANH_GIA_THAP) guiMailDanhGiaThap(data, soSao, thoiGian);
  return { ok: true };
}

function guiMailDanhGiaThap(data, soSao, thoiGian) {
  const dong = [
    ["Thời gian", thoiGian],
    ["Số sao", soSao + "/5"],
    ["Nhận xét", data.comment],
    ["Tên hiển thị", data.name],
    ["Trang", data.page],
  ]
    .filter(function (r) { return r[1]; })
    .map(function (r) {
      return "<tr><td style='padding:6px 12px;color:#55718d'>" + r[0] +
             "</td><td style='padding:6px 12px;font-weight:600;color:#0d365f'>" + esc(r[1]) + "</td></tr>";
    })
    .join("");
  const html =
    "<div style='font-family:system-ui,sans-serif;font-size:15px'>" +
    "<h2 style='color:#b42318;margin:0 0 4px'>Khách chấm " + soSao + " sao trên website</h2>" +
    "<p style='color:#55718d;margin:0 0 16px'>Xem nhận xét và xử lý sớm. Đánh giá công khai, xoá được bằng chế độ quản trị (?quantri) nếu vi phạm.</p>" +
    "<table style='border-collapse:collapse;background:#f7fafd;border-radius:8px'>" + dong + "</table>" +
    "<p style='margin-top:16px'><a href='" + SpreadsheetApp.getActiveSpreadsheet().getUrl() +
    "' style='color:#0b57b6'>Mở bảng →</a></p></div>";
  MailApp.sendEmail({ to: EMAIL_NHAN, subject: "[Đánh giá " + soSao + " sao] pvihcm.com", htmlBody: html });
}

/** Tab CNBB: tạo kèm dòng tiêu đề nếu chưa có. */
function laySheetCnbb() {
  const bang = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = bang.getSheetByName(TEN_SHEET_CNBB);
  if (!sheet) {
    sheet = bang.insertSheet(TEN_SHEET_CNBB);
    sheet.getRange(1, 1, 1, TIEU_DE_CNBB.length).setValues([TIEU_DE_CNBB]).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Ghi một yêu cầu tư vấn / nhận bảng chào cháy nổ bắt buộc và báo mail. */
function luuCnbb(data) {
  const sheet = laySheetCnbb();
  const thoiGian = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
  const loai = data.kind === "bang-chao" ? "Nhận bảng chào miễn phí" : "Nhận tư vấn miễn phí";
  sheet.appendRow([
    thoiGian,
    data.code || "",
    loai,
    // Dấu nháy đầu để Sheet giữ nguyên số 0 ở đầu số điện thoại.
    data.phone ? "'" + data.phone : "",
    data.email || "",
    data.company || "",
    data.detail || "",
    data.source || "",
    "Mới",
    "",
  ]);
  guiMailCnbb(data, loai, thoiGian);
  return { ok: true };
}

function guiMailCnbb(data, loai, thoiGian) {
  const dong = [
    ["Thời gian", thoiGian],
    ["Mã yêu cầu", data.code],
    ["Loại yêu cầu", loai],
    ["Số điện thoại", data.phone],
    ["Email", data.email],
    ["Tên đơn vị", data.company],
    ["Chi tiết", data.detail],
    ["Nguồn", data.source],
  ]
    .filter(function (r) { return r[1]; })
    .map(function (r) {
      return "<tr><td style='padding:6px 12px;color:#55718d'>" + r[0] +
             "</td><td style='padding:6px 12px;font-weight:600;color:#0d365f'>" + esc(r[1]) + "</td></tr>";
    })
    .join("");
  const html =
    "<div style='font-family:system-ui,sans-serif;font-size:15px'>" +
    "<h2 style='color:#0b57b6;margin:0 0 4px'>" + esc(loai) + " — cháy nổ bắt buộc</h2>" +
    "<p style='color:#55718d;margin:0 0 16px'>Khách đang chờ chat Zalo OA. Liên hệ ngay, gửi bảng chào qua email nếu khách yêu cầu.</p>" +
    "<table style='border-collapse:collapse;background:#f7fafd;border-radius:8px'>" + dong + "</table>" +
    "<p style='margin-top:16px'><a href='" + SpreadsheetApp.getActiveSpreadsheet().getUrl() +
    "' style='color:#0b57b6'>Mở bảng đơn hàng →</a></p></div>";
  MailApp.sendEmail({
    to: EMAIL_NHAN,
    subject: "[CNBB " + (data.code || "") + "] " + loai + " — " + (data.company || ""),
    htmlBody: html,
  });
}

function laySheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TEN_SHEET)
    || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}

/**
 * Lưu ảnh bằng chứng: tìm dòng đơn theo mã đơn + SĐT (dòng mới nhất trước),
 * cất ảnh vào Drive, ghi link vào cột "Bằng chứng thanh toán", đổi trạng thái
 * "Chờ thanh toán" → "Khách báo đã chuyển khoản" và gửi mail kèm ảnh.
 * Khách gửi nhiều ảnh thì các link nối tiếp nhau trong cùng một ô.
 */
function luuBangChung(data) {
  const sheet = laySheet();
  const rows = sheet.getDataRange().getValues();
  const maDon = String(data.code || "");
  const sdt = String(data.phone || "").replace(/\D/g, "");
  let dong = 0;
  for (let i = rows.length - 1; i >= 0; i--) {
    if (String(rows[i][1]) === maDon && String(rows[i][4]).replace(/\D/g, "") === sdt) {
      dong = i + 1;
      break;
    }
  }
  if (!maDon || !sdt || !dong) {
    return { ok: false, notFound: true, error: "Không tìm thấy đơn khớp mã đơn và số điện thoại." };
  }
  if (LOAI_ANH.indexOf(data.mimeType) < 0 || !data.data) {
    return { ok: false, error: "Ảnh không hợp lệ." };
  }

  const blob = Utilities.newBlob(Utilities.base64Decode(data.data), data.mimeType, data.fileName || maDon + ".jpg");
  const file = layThuMuc().createFile(blob);
  file.setDescription("Bằng chứng chuyển khoản đơn " + maDon);

  const oLink = sheet.getRange(dong, timHoacTaoCot(sheet, TIEU_DE_COT_BANG_CHUNG));
  const linkCu = String(oLink.getValue() || "");
  oLink.setValue(linkCu ? linkCu + "\n" + file.getUrl() : file.getUrl());

  // Nhân viên đã đổi trạng thái (ví dụ "Đã thanh toán") thì không ghi đè.
  const oTrangThai = sheet.getRange(dong, COT_TRANG_THAI);
  if (String(oTrangThai.getValue()) === "Chờ thanh toán") {
    oTrangThai.setValue("Khách báo đã chuyển khoản");
  }

  guiMailBangChung(rows[dong - 1], file.getUrl(), blob);
  return { ok: true };
}

/** Thư mục Drive cất ảnh; nhớ ID để lần sau không tạo trùng. */
function layThuMuc() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty("THU_MUC_BANG_CHUNG_ID");
  if (id) {
    try {
      return DriveApp.getFolderById(id);
    } catch (err) {
      // Thư mục bị xoá — tạo lại bên dưới.
    }
  }
  const folder = DriveApp.createFolder(TEN_THU_MUC_BANG_CHUNG);
  props.setProperty("THU_MUC_BANG_CHUNG_ID", folder.getId());
  return folder;
}

/** Cột theo tiêu đề ở dòng 1; chưa có thì thêm cột mới sau cột cuối (không ghi đè cột nào). */
function timHoacTaoCot(sheet, tieuDe) {
  const cotCuoi = Math.max(sheet.getLastColumn(), 1);
  const tieuDeHienCo = sheet.getRange(1, 1, 1, cotCuoi).getValues()[0];
  const viTri = tieuDeHienCo.indexOf(tieuDe);
  if (viTri >= 0) return viTri + 1;
  const cotMoi = Math.max(cotCuoi + 1, 16);
  sheet.getRange(1, cotMoi).setValue(tieuDe);
  return cotMoi;
}

function guiMail(data, thoiGian) {
  const tieuDe = "[Đơn mới " + (data.code || "") + "] " + (data.product || "");
  const dong = [
    ["Thời gian", thoiGian],
    ["Mã đơn", data.code],
    ["Sản phẩm", data.product],
    ["Khách hàng", data.name],
    ["Số điện thoại", data.phone],
    ["Biển số / Đơn vị", data.subject],
    ["Chi tiết", data.detail],
    ["Tổng tiền", data.total],
    ["Mua online", data.online ? "Có (đã giảm)" : "Không"],
    ["Ghi chú", data.note],
    ["Nguồn", data.source],
  ]
    .filter(function (r) { return r[1]; })
    .map(function (r) {
      return "<tr><td style='padding:6px 12px;color:#55718d'>" + r[0] +
             "</td><td style='padding:6px 12px;font-weight:600;color:#0d365f'>" + r[1] + "</td></tr>";
    })
    .join("");

  const html =
    "<div style='font-family:system-ui,sans-serif;font-size:15px'>" +
    "<h2 style='color:#0b57b6;margin:0 0 4px'>Đơn hàng mới</h2>" +
    "<p style='color:#55718d;margin:0 0 16px'>Gọi lại xác nhận trước khi phát hành.</p>" +
    "<table style='border-collapse:collapse;background:#f7fafd;border-radius:8px'>" + dong + "</table>" +
    "<p style='margin-top:16px'><a href='" + SpreadsheetApp.getActiveSpreadsheet().getUrl() +
    "' style='color:#0b57b6'>Mở bảng đơn hàng →</a></p></div>";

  MailApp.sendEmail({ to: EMAIL_NHAN, subject: tieuDe, htmlBody: html });
}

/** Mail báo khách đã gửi ảnh chuyển khoản, đính kèm luôn ảnh để đối soát. */
function guiMailBangChung(row, linkAnh, blob) {
  const maDon = String(row[1] || "");
  const tieuDe = "[Bằng chứng chuyển khoản " + maDon + "] " + String(row[2] || "");
  const dong = [
    ["Mã đơn", maDon],
    ["Sản phẩm", row[2]],
    ["Khách hàng", row[3]],
    ["Số điện thoại", row[4]],
    ["Tổng tiền", row[9]],
  ]
    .filter(function (r) { return r[1]; })
    .map(function (r) {
      return "<tr><td style='padding:6px 12px;color:#55718d'>" + r[0] +
             "</td><td style='padding:6px 12px;font-weight:600;color:#0d365f'>" + esc(r[1]) + "</td></tr>";
    })
    .join("");

  const html =
    "<div style='font-family:system-ui,sans-serif;font-size:15px'>" +
    "<h2 style='color:#0b57b6;margin:0 0 4px'>Khách đã gửi bằng chứng chuyển khoản</h2>" +
    "<p style='color:#55718d;margin:0 0 16px'>Đối soát với sao kê ngân hàng trước khi phát hành. Ảnh đính kèm mail này.</p>" +
    "<table style='border-collapse:collapse;background:#f7fafd;border-radius:8px'>" + dong + "</table>" +
    "<p style='margin-top:16px'><a href='" + linkAnh + "' style='color:#0b57b6'>Mở ảnh trên Google Drive →</a></p>" +
    "<p><a href='" + SpreadsheetApp.getActiveSpreadsheet().getUrl() +
    "' style='color:#0b57b6'>Mở bảng đơn hàng →</a></p></div>";

  MailApp.sendEmail({ to: EMAIL_NHAN, subject: tieuDe, htmlBody: html, attachments: [blob] });
}

/** Chữ khách nhập vào mail HTML phải được thoát ký tự. */
function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Chạy thử: bấm Run hàm này để kiểm tra Sheet và mail có hoạt động không. */
function chayThu() {
  doPost({
    postData: {
      contents: JSON.stringify({
        secret: SHARED_SECRET,
        code: "TEST-0001",
        product: "Bảo hiểm TNDS bắt buộc ô tô",
        name: "Khách thử nghiệm",
        phone: "0938072236",
        subject: "51A-123.45",
        detail: "Xe chở người · Không kinh doanh vận tải · Từ 6 đến 11 chỗ",
        base: "714.600đ",
        vat: "71.460đ",
        total: "786.060đ",
        online: true,
        note: "Đây là đơn chạy thử, xoá sau khi kiểm tra xong.",
        source: "/bao-hiem-o-to",
      }),
    },
  });
}

/**
 * Chạy thử phần ảnh bằng chứng: chạy chayThu trước để có dòng TEST-0001,
 * rồi Run hàm này. Kết quả hiện ở Nhật ký thực thi (Execution log).
 */
function chayThuBangChung() {
  // Ảnh PNG 1×1 điểm ảnh, chỉ để thử đường đi.
  const anhThu = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
  const ketQua = doPost({
    postData: {
      contents: JSON.stringify({
        action: "bang-chung",
        proofSecret: SHARED_SECRET,
        code: "TEST-0001",
        phone: "0938072236",
        mimeType: "image/png",
        fileName: "TEST-0001.png",
        data: anhThu,
      }),
    },
  });
  Logger.log(ketQua.getContent());
}


/** Chạy thử tab CNBB: tạo tab nếu chưa có, thêm dòng TEST-CNBB và gửi mail thử. */
function chayThuCnbb() {
  const ketQua = doPost({
    postData: {
      contents: JSON.stringify({
        action: "cnbb",
        cnbbSecret: SHARED_SECRET,
        code: "TEST-CNBB",
        kind: "bang-chao",
        phone: "0938072236",
        email: "thu@congty.vn",
        company: "Công ty TNHH Thử Nghiệm",
        detail: "Tài sản: Kho hàng hóa tổng hợp (mã 430107) · Giá trị bảo hiểm: 5000 triệu đồng · Phí tham khảo (gồm VAT): 11 triệu đ · Mục đích: Bảo vệ tài sản",
        source: "/bao-hiem-chay-no-bat-buoc",
      }),
    },
  });
  Logger.log(ketQua.getContent());
}

/** Chạy thử tab "Đánh giá": tạo tab nếu chưa có, thêm dòng TEST-DANH-GIA (2 sao nên có mail thử). */
function chayThuDanhGia() {
  const ketQua = doPost({
    postData: {
      contents: JSON.stringify({
        action: "danh-gia",
        danhGiaSecret: SHARED_SECRET,
        id: "TEST-DANH-GIA",
        rating: 2,
        comment: "Đánh giá chạy thử, xoá dòng này sau khi kiểm tra.",
        name: "Khách thử nghiệm",
        kind: "Công ty (khối gộp với điểm Google)",
        page: "https://pvihcm.com/san-pham/chay-no-bat-buoc/",
        title: "Bảo hiểm cháy nổ bắt buộc",
      }),
    },
  });
  Logger.log(ketQua.getContent());
}
