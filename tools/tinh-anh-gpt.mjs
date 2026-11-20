// Xuất danh sách câu lệnh tạo ảnh (cho ChatGPT) của một tỉnh ra tools/data/tinh/<slug>-anh-gpt.md.
// Chạy: node tools/tinh-anh-gpt.mjs cantho
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const slug = process.argv[2];
const { tinh: T } = await import(pathToFileURL(path.join(HERE, 'data/tinh', slug + '.mjs')).href);

const parts = [
  `# Câu lệnh tạo ảnh cho nhánh ${T.ten} (dùng với ChatGPT tạo ảnh)`,
  '',
  'Tạo xong: lưu đúng **tên file** bên dưới (JPG, PNG hay WebP đều được), gửi lại để gắn vào web; web tự nén và làm bản -480/-800 cho điện thoại.',
  'Ảnh tạo bằng máy luôn được ghi "Hình ảnh mô phỏng" trên trang. Không đưa logo PVI, logo hãng hay chữ vào ảnh.',
  '',
  '## Trang tỉnh: ảnh đầu trang',
  `- Trang: /${T.slug}/`,
  `- Tên file: \`${T.hero.anh}\` (1200×960)`,
  `- Mô tả trên web: ${T.hero.alt}`,
  '', '```', T.prompts.hero, '```', '',
];
for (const p of T.products) {
  parts.push(`## ${p.ten} tại ${T.ten}`, `- Trang: /${T.slug}/${p.id}/`, `- Tên file: \`${p.anh}\` (${p.anhW ? `${p.anhW}×${p.anhH}` : '1280×853'})`, `- Mô tả trên web: ${p.anhAlt}`, '', '```', p.prompt, '```', '');
}
parts.push('## Dự phòng: ảnh địa danh khác', '', '```', T.prompts.office, '```', '');
const out = path.join(HERE, 'data/tinh', `${T.slug}-anh-gpt.md`);
fs.writeFileSync(out, parts.join('\n'));
console.log('wrote', path.relative(process.cwd(), out));
