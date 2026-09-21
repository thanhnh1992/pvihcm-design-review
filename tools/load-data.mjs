// Chuyển dữ liệu đã duyệt của baohiempvi-vn (TypeScript) sang tools/data/*.mjs, giữ nguyên văn.
// Chạy lại khi dữ liệu bên baohiempvi-vn thay đổi, sau đó chạy gen-products.mjs + srcset.mjs.
// Đường dẫn project baohiempvi-vn có thể đặt qua biến môi trường BAOHIEMPVI_DIR.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const APP = process.env.BAOHIEMPVI_DIR || 'C:/Users/DELL/Documents/Codex/2026-08-23/pvi-tp-h-ch-minh-sites-4/work/site';
const require = createRequire(APP + '/package.json');
const ts = require('typescript');
const OUT = path.join(HERE, 'data');
for (const [name, rel] of [['product', 'app/product-data.ts'], ['tnds', 'app/bao-hiem-o-to/tnds-data.ts'], ['accident', 'app/bao-hiem-tai-nan-24-24/accident-data.ts']]) {
  const src = fs.readFileSync(`${APP}/${rel}`, 'utf8');
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  fs.writeFileSync(path.join(OUT, `${name}.mjs`), js, 'utf8');
  const m = await import(pathToFileURL(path.join(OUT, `${name}.mjs`)).href);
  console.log(name.padEnd(9), Object.keys(m).length, 'exports');
}
