// Loạt 8 bài SEO "bảo hiểm tai nạn" (chủ site giao 16/11/2026, chốt đăng trên pvihcm.com làm bản chính).
// Nội dung trong tools/data/tai-nan-seo.json. Số liệu PVI lấy từ Quy tắc 498/QĐ-PVIBH (hiệu lực 01/7/2025)
// và biểu phí tham khảo đang công bố; ghi chú duyệt pháp lý ở bài 05–08 nằm trong gói gửi chủ site.
// Thân bài viết theo cấu trúc khối WordPress (Gutenberg): wp-block-heading, wp-block-table, wp-block-list,
// wp-block-image, wp-block-buttons — copy sang WordPress vẫn giữ đúng khối. Kiểu dáng ở news.css (.kb .wp-*).
// pvihcm.com không link ra ngoài: link nội bộ được đổi sang trang pvihcm tương ứng (LINK bên dưới).
import fs from 'node:fs';
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const data = JSON.parse(fs.readFileSync(new URL('../data/tai-nan-seo.json', import.meta.url), 'utf8'));
const SLUGS = new Set(data.map((a) => a.slug));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

// Trang baohiempvi-vn.com → trang pvihcm.com tương ứng. Không có trang tương ứng thì bỏ link.
const LINK = {
  '/bao-hiem-tai-nan-24-24': '/san-pham/bao-hiem-tai-nan/',
  '/kien-thuc/bao-hiem-tai-nan-24-24': '/san-pham/bao-hiem-tai-nan/',
  '/kien-thuc/bao-hiem-tai-nan-24-24-cong-nhan-nhan-vien': '/tai-nan-doanh-nghiep/',
  '/kien-thuc/quy-tac-bao-hiem-tai-nan-ca-nhan-pvi-2026': '/tai-lieu/pvi-quy-tac-bao-hiem-tai-nan-ca-nhan-01-07-2025.pdf',
  '/kien-thuc/muc-boi-thuong-bao-hiem-tai-nan': '/tai-lieu/pvi-bang-ty-le-thuong-tat-tai-nan-ca-nhan-01-07-2025.pdf',
  '/bao-hiem-xay-dung-lap-dat': '/san-pham/bao-hiem-cong-trinh/',
  '/bao-hiem-o-to/tnds-bat-buoc': '/san-pham/bao-hiem-bat-buoc/',
};
const mapHref = (href) => {
  const m = href.match(/^\/kien-thuc\/([a-z0-9-]+)$/);
  if (m && SLUGS.has(m[1])) return `/tin-tuc/${m[1]}/`;
  return LINK[href] || null;
};
// Nguồn: PDF quy tắc PVI có bản trong /tai-lieu/ của pvihcm.com; nguồn ngoài chỉ ghi tên, không gắn link.
const mapSource = (url) => {
  const pdf = url.match(/\/tai-lieu\/([a-z0-9.-]+\.pdf)$/);
  return pdf ? `/tai-lieu/${pdf[1]}` : url;
};

const FIGS = {
  xe: { name: 'tn-hinh-xe-may', w: 760, h: 950, alt: 'Hình ảnh mô phỏng người đàn ông đội mũ bảo hiểm chạy xe máy trên đường phố TP.HCM lúc hoàng hôn', caption: 'Hình ảnh mô phỏng người đi xe máy ở TP.HCM; không phải khách hàng hay vụ việc thực tế của PVI.' },
  vp: { name: 'tn-hinh-van-phong', w: 760, h: 950, alt: 'Hình ảnh mô phỏng nhóm nhân viên văn phòng trao đổi quanh bàn làm việc có máy tính', caption: 'Hình ảnh mô phỏng nhóm nhân viên văn phòng; không phải khách hàng thực tế của PVI.' },
  ct: { name: 'tn-hinh-cong-truong', w: 760, h: 950, alt: 'Hình ảnh mô phỏng công nhân đội mũ và mặc áo phản quang trao đổi tại công trường xây dựng', caption: 'Hình ảnh mô phỏng công nhân tại công trường xây dựng; không phải công trình hay khách hàng thực tế của PVI.' },
  bot: { name: 'tn-hinh-bo-bot', w: 800, h: 533, alt: 'Hình ảnh mô phỏng người đàn ông bó bột cánh tay cầm giấy tờ, ngồi ở hành lang cơ sở y tế', caption: 'Hình ảnh mô phỏng người bị bó bột cánh tay sau tai nạn; không phải khách hàng hay vụ việc thực tế của PVI.' },
};

const B2B = new Set(['doanh-nghiep-co-bat-buoc-mua-bao-hiem-tai-nan', 'bao-hiem-tai-nan-lao-dong-la-gi']);

function wordCount(a) {
  const parts = [a.lead, ...a.sections.flatMap((s) => [s.title, ...(s.paragraphs || []), ...(s.items || []), ...(s.table ? s.table.rows.flat() : [])])];
  return parts.join(' ').split(/\s+/).length;
}

function build(a, i) {
  const ids = a.sections.map((s) => slugify(s.title));
  const fig = FIGS[a.figure];
  const b2b = B2B.has(a.slug);
  const siblings = data.filter((x) => x.slug !== a.slug);

  const block = {
    heading: (s, id) => `<h2 id="${id}" class="wp-block-heading">${esc(s)}</h2>`,
    para: (s) => `<p>${esc(s)}</p>`,
    table: (t, label) => `<figure class="wp-block-table is-style-stripes" role="region" aria-label="${esc(label)}" tabindex="0"><table><thead><tr>${t.headers.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${t.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></figure>`,
    list: (items, steps) => steps
      ? `<ol class="wp-block-list is-style-steps">${items.map((x) => `<li>${esc(x.replace(/^Bước \d+:\s*/, ''))}</li>`).join('')}</ol>`
      : `<ul class="wp-block-list">${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`,
  };

  const cta = (n) => `<div class="wp-block-group has-background is-layout-constrained tn-cta">
<p class="tn-cta-title">${b2b ? 'Cần báo phí cho danh sách nhân viên?' : 'Cần chọn gói phù hợp?'}</p>
<p>${b2b ? 'Gửi danh sách họ tên, ngày sinh, số CCCD và nhóm nghề qua Zalo. PVI Thành Đô gửi lại báo phí chính thức và bản nháp giấy chứng nhận để soát tên.' : 'Nhắn Zalo cho PVI Thành Đô số tiền bảo hiểm anh chị muốn và công việc đang làm, nhân viên tư vấn gói phù hợp.'}</p>
<div class="wp-block-buttons is-layout-flex"><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="${ZALO_TU_VAN}" target="_blank" rel="noopener" data-cta="tai-nan-seo-${n}">Nhắn Zalo 0938 072 236</a></div><div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="tel:0938072236">Gọi 0938 072 236</a></div></div>
</div>`;

  const sections = a.sections.map((s, k) => [
    block.heading(s.title, ids[k]),
    ...(s.paragraphs || []).map(block.para),
    s.table ? block.table(s.table, s.title) : '',
    s.items ? block.list(s.items, s.steps) : '',
    k === 1 ? `<figure class="wp-block-image size-large tn-fig${fig.h > fig.w ? ' is-portrait' : ''}"><img src="/assets/${fig.name}-800.webp" srcset="/assets/${fig.name}-480.webp 480w, /assets/${fig.name}-800.webp 800w" sizes="(max-width:820px) 92vw, 560px" width="${fig.w}" height="${fig.h}" alt="${esc(fig.alt)}" loading="lazy" decoding="async"><figcaption class="wp-element-caption">${esc(fig.caption)}</figcaption></figure>` : '',
    k === 2 ? cta(1) : '',
  ].filter(Boolean).join('\n')).join('\n\n');

  const relatedLinks = a.related.map((r) => ({ href: mapHref(r.href), label: r.label })).filter((r) => r.href && !r.href.startsWith('/tin-tuc/'));
  const readMore = `<h2 id="doc-them" class="wp-block-heading">Đọc thêm trong loạt bài bảo hiểm tai nạn</h2>
<ul class="wp-block-list tn-series">${siblings.map((x) => `<li><a href="/tin-tuc/${x.slug}/">${esc(x.title)}</a></li>`).join('')}${relatedLinks.map((r) => `<li><a href="${r.href}">${esc(r.label)}</a></li>`).join('')}</ul>`;


  return {
    post: {
      slug: a.slug,
      date: '2026-11-16',
      dateText: '16/11/2026',
      cat: b2b ? 'Kiến thức · Tai nạn doanh nghiệp' : 'Kiến thức · Bảo hiểm tai nạn',
      title: a.title,
      lead: a.lead,
      image: `/assets/tn-${a.slug}.webp`,
      alt: `Hình ảnh mô phỏng: đồ họa nền xanh ghi tiêu đề bài "${a.title}"`,
      readMin: Math.max(4, Math.round(wordCount(a) / 220)),
    },
    crumb: b2b ? 'Tai nạn doanh nghiệp' : 'Bảo hiểm tai nạn',
    hero: { name: `tn-${a.slug}`, w: 1200, h: 630, caption: 'Hình ảnh mô phỏng: đồ họa tiêu đề bài viết do PVI Thành Đô biên soạn.' },
    seo: { title: a.title, description: a.description },
    toc: [...a.sections.map((s, k) => [ids[k], s.title.replace(/\?$/, '')]), ['doc-them', 'Đọc thêm'], ['san-pham', 'Sản phẩm liên quan'], ['cau-hoi', 'Câu hỏi thường gặp']],
    faqs: a.faq.map((f) => ({ question: f.q, answer: f.a })),
    sources: a.sources.map((s) => {
      const [org, ...rest] = s.label.split(' — ');
      return [rest.length ? rest.join(' — ') : s.label, mapSource(s.url), rest.length ? org : 'Nguồn tham chiếu'];
    }),
    related: [
      b2b
        ? { href: '/tai-nan-doanh-nghiep/', img: 'tn-hinh-cong-truong', w: 760, h: 950, k: 'Sản phẩm chính', title: 'Bảo hiểm tai nạn cho doanh nghiệp', text: 'Mua theo danh sách nhân viên, công nhân; giảm phí theo số người.' }
        : { href: '/san-pham/bao-hiem-tai-nan/', img: 'tn-hinh-xe-may', w: 760, h: 950, k: 'Sản phẩm chính', title: 'Bảo hiểm tai nạn 24/24', text: 'Quyền lợi, phí tham khảo và cách mua cho cá nhân, gia đình.' },
      b2b
        ? { href: '/san-pham/bao-hiem-tai-nan/', img: 'tn-hinh-xe-may', w: 760, h: 950, k: 'Cho cá nhân', title: 'Bảo hiểm tai nạn 24/24', text: 'Gói cho cá nhân, gia đình, bảo vệ 24 giờ mỗi ngày.' }
        : { href: '/tai-nan-doanh-nghiep/', img: 'tn-hinh-van-phong', w: 760, h: 950, k: 'Cho doanh nghiệp', title: 'Bảo hiểm tai nạn cho doanh nghiệp', text: 'Mua theo danh sách nhân viên, giảm phí từ 20 người.' },
    ],
    body: ({ ctaRow }) => `
<div class="entry-content wp-block-post-content is-layout-constrained">
${sections}

${readMore}
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">${b2b ? 'Gửi danh sách nhân viên để nhận báo phí' : 'Nhận tư vấn bảo hiểm tai nạn'}</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> ${b2b ? 'danh sách họ tên, ngày sinh, CCCD và nhóm nghề. PVI Thành Đô gửi báo phí chính thức, giấy chứng nhận và hóa đơn VAT phát hành trong ngày làm việc sau khi thanh toán.' : 'để được tư vấn gói phù hợp. Khi xảy ra tai nạn, gọi tổng đài bồi thường PVI 1900 54 54 58.'}</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`,
  };
}

export const taiNanSeo = data.map(build);
