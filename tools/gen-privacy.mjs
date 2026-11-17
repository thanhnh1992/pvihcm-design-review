// Source is the complete viPolicy payload of online.pvi.com.vn supplied by the owner.
// Keep its wording unchanged; only escape HTML and remove markdown heading/list markers.
// Re-run after any page generator to apply the common footer and block external embeds before consent.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { page, footer, esc } from './chrome.mjs';
import { PRIVACY_PATH, PRIVACY_PDF, protectExternalEmbeds, stripPrivacyUi } from './privacy-ui.mjs';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const policy = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/data/privacy-policy.json'), 'utf8'));
const data = policy.content;
const title = article => article.title.replace(/^#\s*/, '');
function lines(items) {
  let html = '', list = false;
  for (const line of items) {
    if (line.startsWith('- ')) {
      if (!list) { html += '<ul>'; list = true; }
      html += `<li>${esc(line.slice(2))}</li>`;
    } else {
      if (list) { html += '</ul>'; list = false; }
      html += `<p>${esc(line)}</p>`;
    }
  }
  return html + (list ? '</ul>' : '');
}
const main = `<section class="privacy-page"><article class="privacy-document">
<p class="privacy-breadcrumb"><a href="/">Trang chủ</a> / ${esc(policy.title)}</p>
<h1>${esc(policy.title)}</h1><p class="privacy-decision">${esc(policy.decision)}</p>
<div class="privacy-document-actions"><a href="${PRIVACY_PDF}" target="_blank" rel="noopener">Tải chính sách PVI (PDF)</a><button type="button" data-privacy-open>Cài đặt quyền riêng tư</button></div>
<section class="privacy-intro"><h2>${esc(data.introTitle)}</h2>${lines(data.introLines)}<h2>${esc(data.purposeTitle)}</h2>${lines(data.purposeLines)}<h2>${esc(data.updateTitle)}</h2>${lines(data.updateLines)}</section>
<nav class="privacy-toc" aria-label="Các điều trong chính sách"><strong>Nội dung chính sách</strong>${data.articles.map(a=>`<a href="#dieu-${a.key}">${esc(title(a))}</a>`).join('')}</nav>
${data.articles.map(a=>`<details class="privacy-article" id="dieu-${a.key}"><summary><h2>${esc(title(a))}</h2></summary><div class="privacy-article-body">${lines(a.lines)}</div></details>`).join('\n')}
</article></section>`;
const output = path.join(DIST, PRIVACY_PATH, 'index.html');
fs.mkdirSync(path.dirname(output), {recursive:true});
fs.writeFileSync(output, page({path:PRIVACY_PATH,title:policy.title+' | PVI Thành Đô',description:'Chính sách Bảo vệ Dữ liệu Cá nhân của Tổng công ty Bảo hiểm PVI, ban hành kèm Quyết định 351/QĐ-PVIBH ngày 30/03/2026. Đọc 17 điều và tải tài liệu chính thức.',main,head:'<meta name="robots" content="noindex,follow">'}));
let count = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
    const f=path.join(dir,entry.name);
    if(entry.isDirectory()) walk(f);
    else if(entry.name.endsWith('.html')) {
      const original=fs.readFileSync(f,'utf8');
      if(!/<footer\b[^>]*class="site-footer"/.test(original)) continue;
      let html=stripPrivacyUi(original);
      html=html.replace(/<footer id="lien-he"[\s\S]*?<\/footer>/,footer());
      html=protectExternalEmbeds(html);
      if(html!==original) {fs.writeFileSync(f,html);count++;}
    }
  }
}
walk(DIST);
console.log('Privacy: complete 17 articles; common footer/notice updated on',count,'pages.');
