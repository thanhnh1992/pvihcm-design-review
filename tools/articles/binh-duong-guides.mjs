import { t } from '../chrome.mjs';
import { productCovers } from '../data/product-covers.mjs';
import { products } from '../data/san-pham.mjs';
import { guides } from './binh-duong-content.mjs';

const date = '2026-11-13';
const hub = '/tin-tuc/mua-bao-hiem-pvi-binh-duong/';
const articlePath = (guide) => `/tin-tuc/${guide.slug}/`;

const productPaths = {
  'o-to': '/san-pham/bao-hiem-o-to/',
  'vat-chat-xe': '/san-pham/bao-hiem-vat-chat-xe/',
  'chay-no': '/san-pham/chay-no-bat-buoc/',
  'bat-buoc': '/san-pham/bao-hiem-bat-buoc/',
  'tai-nan': '/san-pham/bao-hiem-tai-nan/',
  'cong-trinh': '/san-pham/bao-hiem-cong-trinh/',
  'hang-hoa': '/san-pham/hang-hoa-xuat-nhap-khau/',
  'suc-khoe': '/san-pham/bao-hiem-suc-khoe/',
  'du-lich': '/san-pham/bao-hiem-du-lich/',
};

export const binhDuongOfficeSources = [
  ['Mạng lưới Bảo hiểm PVI, mục Bảo hiểm PVI Đông Sài Gòn', '', 'Tổng công ty Bảo hiểm PVI'],
  ['Thông báo thay đổi tên gọi các đơn vị thành viên, ngày 21/08/2025', '', 'Tổng công ty Bảo hiểm PVI'],
];

export function binhDuongOffice() {
  return `
<h2 id="dia-chi-pvi-binh-duong">Địa chỉ PVI tại Bình Dương</h2>
<p><strong>Chi nhánh Bảo hiểm PVI Đông Sài Gòn</strong> là tên hiện tại của đơn vị trước đây mang tên Bảo hiểm PVI Bình Dương. Đây là đầu mối của Bảo hiểm PVI tại khu vực Thủ Dầu Một để hỏi về nghiệp vụ bảo hiểm và hồ sơ phát hành tại Bình Dương.</p>
<p><strong>Địa chỉ:</strong> Tầng 4 và 5, tòa nhà số 48 đường Hoàng Văn Thụ, khu dân cư Chánh Nghĩa, phường Thủ Dầu Một, TP.HCM. <strong>Điện thoại chi nhánh:</strong> <a class="kb-link" href="tel:02743872528">0274 387 2528</a>.</p>
<p>Nguồn địa chỉ và điện thoại là danh bạ Tổng công ty Bảo hiểm PVI. Nếu bạn muốn nhận tư vấn từ PVI Thành Đô, đơn vị biên soạn bài viết, hãy gọi <a class="kb-link" href="tel:0938072236">0938 072 236</a>.</p>`;
}

export function binhDuongGuideLinks() {
  return `
<h2 id="bao-hiem-theo-nghiep-vu">Hướng dẫn mua bảo hiểm PVI theo nghiệp vụ tại Bình Dương</h2>
<p>Bảo hiểm PVI có thể cấp bảo hiểm cho cá nhân và doanh nghiệp ở khu vực Bình Dương. Chọn nghiệp vụ dưới đây để xem cách chuẩn bị hồ sơ và những mục cần kiểm tra trước khi yêu cầu phát hành.</p>
<ul class="kb-ticks">${guides.map((guide) => `<li><a class="kb-link" href="${articlePath(guide)}">${t(guide.anchor)} tại Bình Dương</a></li>`).join('')}</ul>
<p>Xem thêm <a class="kb-link" href="/san-pham/">danh mục sản phẩm bảo hiểm PVI</a> và <a class="kb-link" href="/tin-tuc/#tin-san-pham">tin bảo hiểm theo từng sản phẩm</a>.</p>`;
}

export const binhDuongGuides = guides.map((guide) => {
  const name = `binh-duong-${guide.id}`;
  const caption = `Hình ảnh minh họa: ${guide.image.charAt(0).toLowerCase() + guide.image.slice(1)}.`;
  const product = productPaths[guide.product];
  const cover = productCovers[product];
  const productImage = products.find((item) => item.href === product)?.img ?? 'bat-buoc';
  const productCaption = `Hình ảnh minh họa: ${cover.alt.toLowerCase()}`;
  const next = guides.find((item) => item.id === guide.next);
  const faqs = guide.faq.map(([question, answer]) => ({ question, answer }));
  const readMin = Math.ceil([guide.lead, ...guide.sections.flat(2), ...guide.faq.flat()].join(' ').split(/\s+/).length / 200);

  return {
    post: {
      slug: guide.slug,
      date,
      dateText: '13/11/2026',
      cat: 'Tin sản phẩm · Bình Dương',
      title: guide.title,
      lead: guide.lead,
      image: `/assets/${name}.webp`,
      socialImage: `/assets/${name}-og.webp`,
      alt: caption,
      readMin,
    },
    crumb: 'Bình Dương',
    hero: { name, w: 1280, h: 853, position: 'center', caption },
    seo: { title: guide.title, description: guide.description },
    toc: [
      ...guide.sections.map(([heading], index) => [`phan-${index + 1}`, heading]),
      ['san-pham', 'Sản phẩm liên quan'],
      ['cau-hoi', 'Câu hỏi thường gặp'],
      ['dia-chi-pvi-binh-duong', 'Địa chỉ PVI tại Bình Dương'],
    ],
    faqs,
    sources: [...guide.sources, ...binhDuongOfficeSources],
    related: [{
      href: product,
      img: productImage,
      w: 1280,
      h: 853,
      k: 'Sản phẩm PVI',
      title: guide.id === 'tai-san' ? 'Tra cứu bảo hiểm cháy nổ bắt buộc' : guide.anchor,
      text: 'Xem thông tin sản phẩm và các bước gửi nhu cầu để PVI tư vấn theo hồ sơ.',
    }],
    body({ pic }) {
      return `
${guide.sections.map(([heading, paragraphs], index) => `
<h2 id="phan-${index + 1}">${t(heading)}</h2>
${paragraphs.map((paragraph) => `<p>${t(paragraph)}</p>`).join('\n')}
${index === 0 ? `<figure class="kb-photo kb-doc">${pic(cover.base, { w: 1200, h: 630, alt: productCaption, sizes: '(max-width:820px) 92vw, 700px' })}<figcaption>${t(productCaption)}</figcaption></figure>` : ''}`).join('')}
<p>Đọc thêm <a class="kb-link" href="${articlePath(next)}">${t(next.anchor)} tại Bình Dương</a>, <a class="kb-link" href="${hub}">hướng dẫn mua bảo hiểm PVI ở Bình Dương</a> hoặc <a class="kb-link" href="/tin-tuc/#tin-san-pham">tin tức bảo hiểm theo sản phẩm</a>.</p>`;
    },
    endMatter: binhDuongOffice,
  };
});
