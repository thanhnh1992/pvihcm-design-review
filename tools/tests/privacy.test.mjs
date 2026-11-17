import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { protectExternalEmbeds, PRIVACY_PATH } from '../privacy-ui.mjs';
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright');
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const DIST = path.join(ROOT, 'dist');
const policy = JSON.parse(fs.readFileSync(path.join(ROOT,'tools/data/privacy-policy.json'),'utf8')).content;
const CSP = JSON.parse(fs.readFileSync(path.join(ROOT,'vercel.json'),'utf8')).headers[0].headers.find(h=>h.key==='Content-Security-Policy').value;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2','.pdf':'application/pdf','.json':'application/json'};
const browser = await chromium.launch({executablePath:process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const requests=[];
const make = async()=>{
 const context=await browser.newContext({reducedMotion:'reduce'});
 await context.route('**/*',async route=>{
  const url=new URL(route.request().url());
  if(url.hostname!=='pvihcm.com') {requests.push(url.href);return route.fulfill({status:200,contentType:url.pathname.endsWith('.js')||url.hostname.includes('tagmanager')?'text/javascript':'text/html',body:''});}
  const rel=decodeURIComponent(url.pathname).replace(/^\//,'');
  const f=path.join(DIST,rel.endsWith('/')?rel+'index.html':rel || 'index.html');
  if(!fs.existsSync(f)||!fs.statSync(f).isFile())return route.fulfill({status:404,body:'Not found'});
  return route.fulfill({status:200,contentType:mime[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f),headers:path.extname(f)==='.html'?{'Content-Security-Policy':CSP}:{}});
 });
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 return {context,page,errors};
};
try {
 let {context,page,errors}=await make();
 await page.goto('https://pvihcm.com/san-pham/bao-hiem-tai-nan/',{waitUntil:'load'});
 await page.evaluate(()=>document.fonts.ready);
 await page.locator('#privacy-dialog').waitFor({state:'visible'});
 assert.equal(await page.locator('#privacy-description').textContent(), 'Bằng cách nhấp vào "Đồng ý", bạn đồng ý với việc lưu trữ cookie trên thiết bị của mình để nâng cao khả năng điều hướng trang web, phân tích việc sử dụng trang web và hỗ trợ các nỗ lực tiếp thị của chúng tôi.');
 assert.equal(requests.length,0,'No third-party request before consent');
 assert.equal(await page.locator('script[src*="googletagmanager"]').count(),0);
 assert.equal(await page.locator('.accident-consent input:checked').count(),0,'Form consents remain independent and unchecked');
 for(const width of [1440,1280,768,390,360]){
  await page.setViewportSize({width,height:width===360?640:width===390?844:1000});
  const m=await page.locator('#privacy-dialog').evaluate(d=>({x:d.getBoundingClientRect().x,right:d.getBoundingClientRect().right,width:innerWidth,scroll:d.scrollWidth,client:d.clientWidth,height:d.getBoundingClientRect().height,bottom:d.getBoundingClientRect().bottom,viewport:innerHeight,modal:d.matches(':modal'),scrollHeight:d.scrollHeight,clientHeight:d.clientHeight}));
  assert(m.x>=0&&m.right<=m.width&&m.scroll<=m.client+1,'Dialog fits '+width);
  assert(m.height<=m.viewport*.25+1,'Banner stays below one quarter of viewport');
  assert(Math.abs(m.bottom-m.viewport)<=1,'Banner stays at bottom');
  assert.equal(m.modal,false,'Banner does not block the page');
  assert(m.scrollHeight<=m.clientHeight+1,'Action row stays in the banner viewport');
  const readable=await page.locator('.privacy-copy').evaluate(copy=>{
   copy.scrollTop=copy.scrollHeight;
   const linkBottom=copy.querySelector('.privacy-policy-link').getBoundingClientRect().bottom;
   const fits=linkBottom<=copy.getBoundingClientRect().bottom+1;
   copy.scrollTop=0;
   return fits;
  });
  assert(readable,'Full text and policy link are reachable at '+width);
  if(width===1440||width===390){
   await page.locator('.accident-hero-frame img').evaluate(el=>el.decode());
   await page.screenshot({path:path.join(ROOT,'../privacy-preview-'+(width===1440?'desktop':'mobile')+'.png')});
  }
 }
 await page.getByRole('button',{name:'Từ chối',exact:false}).click();
 assert.equal(await page.locator('#privacy-dialog').isVisible(),false);
 await page.reload({waitUntil:'load'});assert.equal(await page.locator('#privacy-dialog').isVisible(),false);
 assert.equal(requests.length,0,'Reject persists and sends no third-party requests');
 await page.evaluate(()=>{localStorage.clear();sessionStorage.clear();});
 await page.reload({waitUntil:'load'});
 assert.equal(await page.locator('#privacy-dialog').isVisible(),true,'Clearing website data shows the banner again');
 await page.locator('[data-privacy-reject]').click();
 await page.locator('.privacy-footer-links [data-privacy-open]').click();
 await page.locator('[name="privacy-analytics"]').check();
 await page.getByRole('button',{name:'Lưu lựa chọn',exact:true}).click();
 await page.waitForFunction(()=>!!document.querySelector('script[src*="googletagmanager"]'));
 const configs=await page.evaluate(()=>window.dataLayer.map(a=>Array.from(a)).filter(a=>a[0]==='config'));
 assert(configs.some(a=>a[1]==='G-HYEVLMD710'));assert(!configs.some(a=>a[1]==='AW-18556160976'),'Analytics-only does not configure ads');
 assert.equal(await page.locator('iframe[src^="https://"]').count(),0,'External media remains blocked');
 await page.locator('.privacy-footer-links [data-privacy-open]').click();
 await Promise.all([page.waitForEvent('load'),page.locator('[data-privacy-reject]').click()]);
 assert.equal(await page.locator('script[src*="googletagmanager"]').count(),0,'Withdrawal unloads Google tags');
 assert.equal(await page.evaluate(()=>window['ga-disable-G-HYEVLMD710']),true);
 assert.equal(errors.length,0,errors.join('\n'));
 await context.close();

 ({context,page,errors}=await make());requests.length=0;
 await page.goto('https://pvihcm.com/tin-tuc/bao-hiem-pvi-ve-dich-som-vuot-ke-hoach-2026/',{waitUntil:'load'});
 assert.equal(requests.length,0,'YouTube has no request before consent');
 await page.locator('[data-privacy-close]').click();
 assert.equal(await page.evaluate(()=>localStorage.getItem('pvihcm.privacy.v1')),null,'Close is not consent');
 await page.locator('.privacy-footer-links [data-privacy-open]').click();
 await page.locator('[data-privacy-accept]').click();
 await page.waitForFunction(()=>!!document.querySelector('script[src*="googletagmanager"]'));
 assert(await page.locator('iframe[src*="youtube-nocookie"]').count());
 assert(await page.locator('iframe[src*="google.com/maps"]').count());
 await page.goto('https://pvihcm.com'+PRIVACY_PATH,{waitUntil:'load'});
 assert.equal(await page.locator('#privacy-dialog').isVisible(),false);
 assert.equal(await page.locator('.privacy-article').count(),17);
 const paragraphs=[...policy.introLines,...policy.purposeLines,...policy.updateLines,...policy.articles.flatMap(a=>a.lines)];
 const rendered=await page.locator('.privacy-document').textContent();
 for(const p of paragraphs)assert(rendered.includes(p.replace(/^- /,'')),'Full original policy text: '+p.slice(0,55));
 await page.locator('.privacy-toc a[href="#dieu-14"]').click();
 assert.equal(await page.locator('#dieu-14').getAttribute('open'),'');
 await page.setViewportSize({width:1440,height:1000});
 await page.evaluate(()=>scrollTo(0,0));
 await page.screenshot({path:path.join(ROOT,'../privacy-policy-preview.png')});
 await page.locator('.privacy-footer-links').scrollIntoViewIfNeeded();
 await page.screenshot({path:path.join(ROOT,'../privacy-footer-preview.png')});
 for(const width of [360,390,768,1280,1440]){
  await page.setViewportSize({width,height:1000});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Policy fits '+width);
 }
 await context.close();
 for(const invalid of [{version:'old',at:Date.now()},{version:'351-2026-03-30-v1',at:Date.now()-181*86400000}]){
  ({context,page}=await make());
  await page.addInitScript(record=>localStorage.setItem('pvihcm.privacy.v1',JSON.stringify({...record,analytics:true,marketing:true,media:true})),invalid);
  requests.length=0;await page.goto('https://pvihcm.com/san-pham/bao-hiem-tai-nan/',{waitUntil:'load'});
  assert.equal(requests.length,0,'Outdated consent grants no tracking');
  assert.equal(await page.locator('#privacy-dialog').isVisible(),true);
  await context.close();
 }
 ({context,page}=await make());requests.length=0;
 await page.goto('https://pvihcm.com'+PRIVACY_PATH,{waitUntil:'load'});
 assert.equal(await page.locator('#privacy-dialog').isVisible(),true,'First entry directly to the policy also shows the banner');
 assert.equal(requests.length,0);
 await context.close();
 const embed='<iframe src="https://www.google.com/maps?q=PVI" title="Map"></iframe>';
 assert.equal(protectExternalEmbeds(protectExternalEmbeds(embed)),protectExternalEmbeds(embed),'Embed protection is idempotent');
 console.log('PASS: consent gating, accept/reject/close, persistence, analytics-only, withdrawal, media, policy source equality (17 articles), expired version, responsive layouts.');
} finally {await browser.close();}
