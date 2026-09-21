import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const D=path.resolve(HERE,'../dist')+'/';
const files=['index.html','san-pham/bao-hiem-bat-buoc/index.html','san-pham/bao-hiem-tai-nan/index.html','san-pham/chay-no-bat-buoc/index.html','san-pham/hang-hoa-xuat-nhap-khau/index.html','huong-dan/index.html','tai-nan-doanh-nghiep/index.html'];
const tiles=['bat-buoc','tai-nan','chay-no','hang-hoa'];
const big=[...tiles,'section-bat-buoc','section-tai-nan','section-chay-no','section-hang-hoa','claims-process'];
for(const f of files){
  let h=fs.readFileSync(D+f,'utf8'),n=0;
  h=h.replace(/<img([^>]*?)src="\/assets\/([a-z-]+)\.webp"([^>]*)>/g,(m,a,name,b)=>{
    if(/srcset=/.test(m))return m;
    const home=f==='index.html', inHero=/fire-hero-art/.test('');
    let srcset,sizes;
    if(big.includes(name)){srcset=`/assets/${name}-480.webp 480w, /assets/${name}-800.webp 800w, /assets/${name}.webp 1280w`;
      sizes= home ? (tiles.includes(name)?'(max-width:820px) 47vw, 340px':'(max-width:820px) 92vw, 700px') : '(max-width:1000px) 1px, 560px';}
    else if(name.startsWith('partner-')){srcset=`/assets/${name}-360.webp 360w, /assets/${name}.webp 720w`;sizes='240px';}
    else return m;
    n++;return `<img${a}src="/assets/${name}.webp" srcset="${srcset}" sizes="${sizes}"${b}>`;
  });
  fs.writeFileSync(D+f,h);console.log(f,n);
}
const js=D+'advisor.js';fs.writeFileSync(js,fs.readFileSync(js,'utf8').replace('/assets/pvi-support-advisor.webp','/assets/pvi-support-advisor-168.webp'));
