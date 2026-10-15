// Kiểm tra tên miền gốc pvihcm.com không bị đổi (AGENTS.md mục "Tên miền gốc").
// Chạy: node tools/check-domain.mjs  (bắt buộc trước mỗi lần push)
// So với bản khóa tools/domain-lock.json. Hỏng ở đâu thì in lý do và thoát mã 1.
// KHÔNG sửa script hay bản khóa để cho qua khi chưa có câu "DUYỆT THAY ĐỔI TÊN MIỀN" của chủ site.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const lock = JSON.parse(read("tools/domain-lock.json"));
const ROOT = "https://pvihcm.com";
// Bài đăng lại có bản chuẩn ở baohiempvi-vn.com được phép trỏ canonical sang đó (QUY-TAC-VIET-BAI.md).
const CANONICAL_HOSTS = ["https://pvihcm.com", "https://www.baohiempvi-vn.com"];
const errors = [];
const fail = (msg) => errors.push(msg);

if (lock.root !== ROOT) fail(`Bản khóa ghi tên miền gốc ${lock.root}, phải là ${ROOT}.`);

const vercel = JSON.parse(read("vercel.json"));
if (vercel.trailingSlash !== lock.trailingSlash) fail("vercel.json: trailingSlash đã đổi.");
if (JSON.stringify(vercel.redirects ?? []) !== JSON.stringify(lock.redirects)) fail("vercel.json: danh sách chuyển hướng (redirects) khác bản khóa.");
if (JSON.stringify(vercel.rewrites ?? []) !== JSON.stringify(lock.rewrites)) fail("vercel.json: rewrites khác bản khóa.");

const robots = read("dist/robots.txt");
if (!robots.includes(`Sitemap: ${ROOT}/sitemap.xml`)) fail("robots.txt: dòng Sitemap không trỏ về https://pvihcm.com/sitemap.xml.");

const sitemap = read("dist/sitemap.xml");
for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  if (!loc.startsWith(`${ROOT}/`)) fail(`sitemap.xml: ${loc} không thuộc tên miền gốc.`);
}

for (const p of lock.protectedPaths) {
  const file = p.endsWith("/") ? path.join("dist", p, "index.html") : path.join("dist", p);
  if (!fs.existsSync(path.join(root, file))) fail(`Trang đang có bị xóa hoặc đổi đường dẫn: ${p}`);
}
for (const f of lock.mustKeepFiles) {
  if (!fs.existsSync(path.join(root, "dist", f))) fail(`Thiếu file bắt buộc giữ nguyên: dist/${f}`);
}

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : e.name.endsWith(".html") ? [path.join(dir, e.name)] : []));
for (const file of walk(path.join(root, "dist"))) {
  const html = fs.readFileSync(file, "utf8");
  for (const [, href] of html.matchAll(/rel="canonical" href="([^"]+)"/g)) {
    if (!CANONICAL_HOSTS.some((host) => href === host || href.startsWith(`${host}/`))) {
      fail(`${path.relative(root, file)}: canonical lạ ${href}`);
    }
  }
}

if (errors.length) {
  console.error("TÊN MIỀN GỐC: KHÔNG ĐẠT. Phải qua 2 bước Cảnh báo -> Phê duyệt (AGENTS.md) trước khi đổi:");
  for (const e of errors) console.error(" - " + e);
  process.exit(1);
}
console.log(`TÊN MIỀN GỐC: ĐẠT (${ROOT}, ${lock.redirects.length} chuyển hướng, ${lock.protectedPaths.length} trang được giữ).`);
