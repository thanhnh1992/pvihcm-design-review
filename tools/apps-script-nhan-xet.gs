/**
 * PVI Thành Đô (pvihcm.com): nhận xét, đánh giá của bạn đọc cho các bài Tin tức.
 * Ghi vào Google Sheet, CHỈ hiển thị lên website những dòng đã tick cột "Duyệt".
 *
 * CÁCH CÀI LẦN ĐẦU (khoảng 3 phút):
 *  1. Tạo một Google Sheet mới, đặt tên "PVI Thành Đô - Nhận xét bài viết".
 *  2. Menu Tiện ích mở rộng (Extensions) → Apps Script.
 *  3. Xoá hết code mẫu, dán toàn bộ file này vào. Bấm Lưu.
 *  4. (Không bắt buộc) Điền EMAIL_NHAN bên dưới để nhận mail khi có nhận xét mới.
 *  5. Chọn hàm caiDat → Run (Chạy). Google hỏi quyền thì bấm Cho phép.
 *     Sheet sẽ có tab "Nhận xét" với dòng tiêu đề; mỗi nhận xét mới có ô tick "Duyệt".
 *  6. Triển khai (Deploy) → Lượt triển khai mới (New deployment)
 *       - Loại (Type): Ứng dụng web (Web app)
 *       - Thực thi với tư cách (Execute as): Tôi (Me)
 *       - Ai có quyền truy cập (Who has access): Bất kỳ ai (Anyone)
 *  7. Copy đường dẫn web app (dạng https://script.google.com/macros/s/.../exec)
 *     đưa cho Claude/Codex gắn vào FEEDBACK_ENDPOINT trong tools/gen-news.mjs.
 *
 * DUYỆT NHẬN XÉT: tick ô cột "Duyệt" của dòng đó. Website cập nhật trong vòng
 * vài phút. Bỏ tick là ẩn lại. Muốn sửa lỗi chính tả, chữ trong cột "Nhận xét"
 * sửa thẳng trong Sheet. Không xoá cột, không đổi thứ tự cột.
 *
 * CẬP NHẬT BẢN ĐANG CHẠY (giữ nguyên đường dẫn /exec):
 *  Triển khai → Quản lý lượt triển khai → bút chì → Phiên bản: Phiên bản mới →
 *  Triển khai. KHÔNG chọn "Lượt triển khai mới" (sẽ ra đường dẫn khác).
 *
 * BẢO VỆ: ai biết đường dẫn cũng gửi được, nên script giới hạn độ dài, số sao
 * 1-5, chặn bot bằng ô bẫy, giới hạn số lượt gửi mỗi phút, chặn chuỗi công thức
 * Sheet. Không có gì hiện lên web nếu chưa được duyệt.
 */

const EMAIL_NHAN = ""; // ví dụ "ten@gmail.com"; để trống nếu không cần mail báo
const TEN_TAB = "Nhận xét";
const TIEU_DE = ["Thời gian", "Bài viết (slug)", "Tiêu đề bài", "Số sao", "Tên hiển thị", "Nhận xét", "Duyệt", "Ghi chú nội bộ"];
const COT = { thoiGian: 1, slug: 2, tieuDe: 3, sao: 4, ten: 5, nhanXet: 6, duyet: 7 };
const MAX_TEN = 60;
const MAX_NHAN_XET = 1000;
const MAX_GUI_MOI_PHUT = 20;
const CACHE_GIAY = 120;
const MAX_HIEN_THI = 50;

function caiDat() {
  const sh = layTab_();
  sh.getRange(1, 1, 1, TIEU_DE.length).setValues([TIEU_DE]).setFontWeight("bold");
  sh.setFrozenRows(1);
  // Ô tick "Duyệt" được tạo cho từng dòng khi có nhận xét mới (tạo sẵn cả cột sẽ làm
  // getLastRow() đếm cả dòng trống có ô tick, dòng mới bị ghi xuống cuối Sheet).
  sh.setColumnWidth(COT.nhanXet, 420);
}

/* Website gửi nhận xét mới. */
function doPost(e) {
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (d.website) return json_({ ok: true }); // ô bẫy bot: im lặng bỏ qua
    const slug = String(d.slug || "");
    if (!/^[a-z0-9-]{3,120}$/.test(slug)) return json_({ ok: false, error: "Bài viết không hợp lệ." });
    const sao = Number(d.rating);
    if (!(sao >= 1 && sao <= 5 && Math.floor(sao) === sao)) return json_({ ok: false, error: "Chọn từ 1 đến 5 sao." });
    const ten = gon_(d.name, MAX_TEN);
    const nhanXet = gon_(d.comment, MAX_NHAN_XET);
    const tieuDe = gon_(d.title, 200);
    if (String(d.comment || "").trim().length > MAX_NHAN_XET) return json_({ ok: false, error: "Nhận xét tối đa " + MAX_NHAN_XET + " ký tự." });

    const cache = CacheService.getScriptCache();
    const khoa = "gui:" + Math.floor(Date.now() / 60000);
    const dem = Number(cache.get(khoa) || 0);
    if (dem >= MAX_GUI_MOI_PHUT) return json_({ ok: false, error: "Hệ thống đang bận, vui lòng thử lại sau ít phút." });
    cache.put(khoa, String(dem + 1), 90);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sh = layTab_();
      sh.appendRow([new Date(), slug, an_(tieuDe), sao, an_(ten), an_(nhanXet), false, ""]);
      sh.getRange(sh.getLastRow(), COT.duyet).insertCheckboxes().setValue(false);
    } finally {
      lock.releaseLock();
    }
    if (EMAIL_NHAN) {
      MailApp.sendEmail(EMAIL_NHAN, "[pvihcm.com] Nhận xét mới chờ duyệt: " + sao + " sao",
        "Bài: " + tieuDe + " (" + slug + ")\nTên: " + (ten || "(trống)") + "\nSố sao: " + sao + "\n\n" + (nhanXet || "(không có nội dung)") +
        "\n\nMở Sheet và tick cột Duyệt để hiển thị: " + SpreadsheetApp.getActiveSpreadsheet().getUrl());
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: "Chưa gửi được, vui lòng thử lại." });
  }
}

/* Website lấy nhận xét đã duyệt của một bài: ?slug=... */
function doGet(e) {
  const slug = String((e && e.parameter && e.parameter.slug) || "");
  if (!/^[a-z0-9-]{3,120}$/.test(slug)) return json_({ ok: true, count: 0, average: 0, reviews: [] });
  const cache = CacheService.getScriptCache();
  const daLuu = cache.get("bai:" + slug);
  if (daLuu) return ContentService.createTextOutput(daLuu).setMimeType(ContentService.MimeType.JSON);

  const sh = layTab_();
  const n = sh.getLastRow() - 1;
  const rows = n > 0 ? sh.getRange(2, 1, n, TIEU_DE.length).getValues() : [];
  const duyet = rows.filter((r) => String(r[COT.slug - 1]) === slug && r[COT.duyet - 1] === true && Number(r[COT.sao - 1]) >= 1);
  const tong = duyet.reduce((s, r) => s + Number(r[COT.sao - 1]), 0);
  const coChu = duyet.filter((r) => String(r[COT.nhanXet - 1]).trim()).reverse().slice(0, MAX_HIEN_THI);
  const out = JSON.stringify({
    ok: true,
    count: duyet.length,
    average: duyet.length ? Math.round((tong / duyet.length) * 10) / 10 : 0,
    reviews: coChu.map((r) => ({
      name: bo_(r[COT.ten - 1]),
      rating: Number(r[COT.sao - 1]),
      comment: bo_(r[COT.nhanXet - 1]),
      date: ngay_(r[COT.thoiGian - 1]),
    })),
  });
  cache.put("bai:" + slug, out, CACHE_GIAY);
  return ContentService.createTextOutput(out).setMimeType(ContentService.MimeType.JSON);
}

/* Tick/bỏ tick Duyệt thì xoá bộ nhớ đệm của bài đó để web cập nhật ngay. */
function onEdit(e) {
  try {
    const sh = e.range.getSheet();
    if (sh.getName() !== TEN_TAB || e.range.getRow() < 2) return;
    const slug = String(sh.getRange(e.range.getRow(), COT.slug).getValue());
    if (slug) CacheService.getScriptCache().remove("bai:" + slug);
  } catch (err) { /* không chặn thao tác sửa Sheet */ }
}

function layTab_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(TEN_TAB);
  if (!sh) {
    sh = ss.insertSheet(TEN_TAB);
    sh.getRange(1, 1, 1, TIEU_DE.length).setValues([TIEU_DE]).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  return sh;
}

function gon_(v, max) {
  return String(v == null ? "" : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").replace(/\r\n?/g, "\n").trim().slice(0, max);
}
/* Chặn chèn công thức: ô bắt đầu bằng = + - @ được thêm dấu ' để Sheet coi là chữ. */
function an_(s) {
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
function bo_(v) {
  const s = String(v == null ? "" : v);
  return s.charAt(0) === "'" ? s.slice(1) : s;
}
function ngay_(v) {
  const d = v instanceof Date ? v : new Date(v);
  return isNaN(d) ? "" : Utilities.formatDate(d, "Asia/Ho_Chi_Minh", "yyyy-MM-dd");
}
function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
