// Cụm 5 bài kỹ năng PCCC tại nơi làm việc (chủ site giao 22/11/2026). Xếp vào danh mục có sẵn:
// Kiến thức › Cháy nổ, tài sản (hub chay-no-bat-buoc, mảng kien-thuc) trong tools/data/kien-thuc-hub.mjs.
// Mỗi bài chứa nguyên văn câu chủ site yêu cầu; mỗi link nội bộ chỉ chèn 1 lần trong một bài.
// Ảnh: chủ site render 22/11/2026 (pccc-*.webp, giữ XMP/ICC); alt = mô tả, title = tiêu đề lấy từ metadata ảnh.
// Số liệu, quy định chỉ nêu ở mức đã có căn cứ: số 114, Luật PCCC và CNCH 2024 (55/2024/QH15), NĐ 105/2025/NĐ-CP.
import { t } from '../chrome.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';
const HUB = '/kien-thuc/chay-no-bat-buoc/';
const K = (slug) => `/kien-thuc/${slug}/`;
const S1 = 'neu-dam-chay-lon-khong-kiem-soat-duoc-can-bo-nhan-vien-can-lam-gi';
const S2 = 'quy-trinh-xu-ly-khi-co-chay-xay-ra';
const S3 = 'cac-nguy-co-chay-no-tai-noi-lam-viec';
const S4 = 'khi-co-chay-do-dien-dau-tien-phai-lam-gi';
const S5 = 'thuc-hien-tot-nhiem-vu-pccc-tai-co-so';

const META = {
  "pccc-binh-co2-tu-dien": {
    "title": "Dùng bình CO2 dập cháy tủ điện",
    "desc": "Nhân viên dùng bình khí CO2 dập đám cháy nhỏ tại tủ điện sau khi đã ngắt nguồn, cầm tay cầm, không cầm vào loa phun.",
    "w": 1280,
    "h": 853
  },
  "pccc-chay-do-dien-ngat-cau-dao-hero": {
    "title": "Khi có cháy do điện, việc đầu tiên là ngắt cầu dao",
    "desc": "Kỹ thuật viên ngắt aptomat tổng ngay khi phát hiện cháy do điện để cắt nguồn gây cháy và tránh điện giật khi dập lửa.",
    "w": 1200,
    "h": 630
  },
  "pccc-dam-chay-lon-thoat-nan-hero": {
    "title": "Nhân viên thoát nạn khi đám cháy lớn không kiểm soát được",
    "desc": "Cán bộ nhân viên đi theo lối thoát nạn bằng cầu thang bộ, có người hướng dẫn, khi đám cháy vượt khả năng dập bằng bình chữa cháy.",
    "w": 1200,
    "h": 630
  },
  "pccc-dau-hieu-chap-dien": {
    "title": "Dấu hiệu sắp cháy do điện: phích cắm nóng chảy, cháy xém",
    "desc": "Phích cắm và ổ điện biến màu, cháy xém, bốc khói nhẹ là dấu hiệu cần ngắt điện và kiểm tra ngay trước khi xảy ra cháy.",
    "w": 1280,
    "h": 853
  },
  "pccc-diem-tap-ket-diem-danh": {
    "title": "Tập trung tại điểm tập kết và điểm danh sau khi thoát nạn",
    "desc": "Công nhân tập trung tại điểm tập kết ngoài trời, trưởng bộ phận điểm danh để báo người còn thiếu cho lực lượng chữa cháy.",
    "w": 1280,
    "h": 853
  },
  "pccc-dien-tap-phuong-an": {
    "title": "Diễn tập phương án chữa cháy tại cơ sở",
    "desc": "Cơ sở diễn tập phương án chữa cháy: thoát nạn ra điểm tập kết, đội PCCC triển khai vòi chữa cháy từ tủ chữa cháy vách tường.",
    "w": 1280,
    "h": 853
  },
  "pccc-don-xe-chua-chay": {
    "title": "Mở cổng, dọn lối đón xe chữa cháy",
    "desc": "Bảo vệ mở cổng, dọn xe chắn lối để xe chữa cháy vào nhanh, rồi chỉ vị trí cầu dao, nguồn nước cho lực lượng chuyên nghiệp.",
    "w": 1280,
    "h": 853
  },
  "pccc-giu-hien-truong-sau-chay": {
    "title": "Giữ nguyên hiện trường và chụp ảnh thiệt hại sau đám cháy",
    "desc": "Giám định viên bảo hiểm chụp ảnh thiệt hại tại kho hàng sau cháy, hiện trường được giữ nguyên để xác định nguyên nhân và bồi thường.",
    "w": 1280,
    "h": 853
  },
  "pccc-goi-114": {
    "title": "Gọi 114 báo cháy, nói rõ địa chỉ và tình hình",
    "desc": "Người quản lý gọi 114, báo địa chỉ, chất đang cháy và có người mắc kẹt hay không để lực lượng chữa cháy đến nhanh.",
    "w": 1280,
    "h": 853
  },
  "pccc-han-cat-tia-lua": {
    "title": "Hàn cắt kim loại có giám sát và che chắn tia lửa",
    "desc": "Thợ hàn làm việc có người giám sát, tấm che tia lửa và bình chữa cháy đặt sẵn, cách kiểm soát nguồn lửa trần tại xưởng.",
    "w": 1280,
    "h": 853
  },
  "pccc-ho-so-bao-hiem-chay-no": {
    "title": "Hồ sơ PCCC và bảo hiểm cháy nổ bắt buộc của cơ sở",
    "desc": "Chủ cơ sở cùng chuyên viên bảo hiểm rà hồ sơ PCCC và giấy chứng nhận bảo hiểm cháy nổ bắt buộc cho nhà xưởng.",
    "w": 1280,
    "h": 853
  },
  "pccc-huan-luyen-doi-pccc": {
    "title": "Huấn luyện đội PCCC cơ sở dùng bình chữa cháy",
    "desc": "Đội PCCC cơ sở được huấn luyện thao tác rút chốt, hướng loa phun vào gốc lửa, sẵn sàng xử lý trong những phút đầu.",
    "w": 1280,
    "h": 853
  },
  "pccc-kho-hoa-chat": {
    "title": "Kho chứa hóa chất, dung môi được sắp xếp an toàn",
    "desc": "Hóa chất, dung môi được chứa trong kho riêng, đậy kín, có thông gió và bình chữa cháy ở cửa để giảm nguy cơ cháy nổ.",
    "w": 1280,
    "h": 853
  },
  "pccc-kiem-tra-binh-chua-chay": {
    "title": "Kiểm tra áp suất bình chữa cháy và ghi sổ theo dõi",
    "desc": "Nhân viên kiểm tra kim áp suất bình chữa cháy nằm vùng xanh, chốt và kẹp chì còn nguyên, ghi vào sổ theo dõi phương tiện.",
    "w": 1280,
    "h": 853
  },
  "pccc-kiem-tra-tu-dien": {
    "title": "Kiểm tra định kỳ tủ điện để phòng cháy do điện",
    "desc": "Thợ điện dùng camera nhiệt kiểm tra mối nối trong tủ điện nhà xưởng, phát hiện điểm nóng trước khi gây chập cháy.",
    "w": 1280,
    "h": 853
  },
  "pccc-nguy-co-chay-no-hero": {
    "title": "Nhận diện nguy cơ cháy nổ tại nơi làm việc",
    "desc": "Cán bộ an toàn kiểm tra kho hàng, phát hiện ổ cắm quá tải gần hàng hóa dễ cháy, một trong các nguy cơ cháy nổ thường gặp.",
    "w": 1200,
    "h": 630
  },
  "pccc-nhan-nut-bao-chay": {
    "title": "Nhấn nút báo cháy khi phát hiện cháy",
    "desc": "Bước đầu tiên khi phát hiện cháy là báo động: hô to và nhấn nút báo cháy gần nhất để mọi người cùng biết.",
    "w": 1280,
    "h": 853
  },
  "pccc-nhiem-vu-tai-co-so-hero": {
    "title": "Thực hiện tốt nhiệm vụ PCCC tại cơ sở",
    "desc": "Người đứng đầu cơ sở cùng đội an toàn rà soát sơ đồ thoát nạn và kế hoạch chữa cháy tại nhà xưởng.",
    "w": 1200,
    "h": 630
  },
  "pccc-o-cam-qua-tai": {
    "title": "Ổ cắm nối dài quá tải, nguy cơ chập cháy",
    "desc": "Ổ cắm nối dài cắm chồng nhiều thiết bị, có vết cháy xém, đặt gần thùng giấy là nguy cơ cháy do điện tại văn phòng.",
    "w": 1280,
    "h": 853
  },
  "pccc-quy-trinh-xu-ly-chay-hero": {
    "title": "Quy trình xử lý khi có cháy xảy ra ở nơi làm việc",
    "desc": "Đội PCCC cơ sở thực hành quy trình xử lý cháy: báo động, cắt điện, gọi 114, chữa cháy ban đầu bằng phương tiện tại chỗ.",
    "w": 1200,
    "h": 630
  },
  "pccc-thoat-nan-cui-thap-che-mui": {
    "title": "Cúi thấp, che mũi miệng khi thoát qua hành lang có khói",
    "desc": "Nhân viên cúi thấp người, che mũi miệng bằng khăn ướt và men theo tường để thoát khỏi hành lang có khói.",
    "w": 1280,
    "h": 853
  }
};

// Ảnh trong thân bài: đủ alt, title, width/height, srcset, lazy, figcaption.
const fig = (pic, name) => {
  const m = META[name];
  const img = pic(name, { w: m.w, h: m.h, alt: m.desc, sizes: '(max-width:820px) 100vw, 700px' }).replace('<img ', `<img title="${m.title.replace(/"/g, '&quot;')}" `);
  return `<figure class="kb-fig">${img}<figcaption>${t('Ảnh minh họa: ' + m.desc)}</figcaption></figure>`;
};

const SRC_LUAT = ['Luật Phòng cháy, chữa cháy và cứu nạn, cứu hộ số 55/2024/QH15, hiệu lực 01/07/2025', '', 'Quốc hội'];
const SRC_ND105 = ['Nghị định 105/2025/NĐ-CP quy định chi tiết một số điều và biện pháp thi hành Luật Phòng cháy, chữa cháy và cứu nạn, cứu hộ', '', 'Chính phủ'];
const SRC_SP = ['Bảo hiểm cháy nổ bắt buộc: tra cứu và tính phí', CHAY_NO, 'PVI Thành Đô'];

const REL_SP = { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Tra cứu cơ sở có thuộc diện bắt buộc không, biểu phí và tính phí tham khảo.' };
const REL_HUB = { href: HUB, img: 'fire-layer-pccc', k: 'Kiến thức', title: 'Kiến thức cháy nổ, tài sản', text: 'Câu hỏi thường gặp, trải nghiệm thực tế và tin tức về bảo hiểm cháy nổ.' };

const base = (slug, date, cat, title, lead, hero, seo, readMin) => ({
  post: {
    slug, path: K(slug), date, dateText: date.split('-').reverse().join('/'), cat, title, lead, readMin,
    image: `/assets/${hero}.webp`, imageWidth: META[hero].w, imageHeight: META[hero].h, alt: META[hero].desc,
  },
  crumb: 'Kiến thức',
  hero: { name: hero, w: META[hero].w, h: META[hero].h, caption: 'Ảnh minh họa: ' + META[hero].desc },
  seo,
  toc: [],
});

const DATE = '2026-11-22';
const CAT = 'Kiến thức · Phòng cháy chữa cháy';

export const pcccNoiLamViec = [
  /* ── Bài 1 ── */
  {
    ...base(S1, DATE, CAT,
      'Nếu đám cháy lớn không kiểm soát được cán bộ nhân viên cần làm gì?',
      'Khi đám cháy đã vượt khả năng dập của bình chữa cháy và lửa lan nhanh, việc của cán bộ nhân viên không còn là chữa cháy mà là thoát nạn an toàn, báo đúng người và không cản trở lực lượng chữa cháy chuyên nghiệp.',
      'pccc-dam-chay-lon-thoat-nan-hero',
      { title: 'Đám cháy lớn không kiểm soát được: nhân viên cần làm gì? | PVI', description: 'Nếu đám cháy lớn không kiểm soát được, cán bộ nhân viên cần thoát nạn, gọi 114, tập kết điểm danh và báo thông tin cho lực lượng chữa cháy. Các bước cụ thể.' }, 6),
    faqs: [
      { question: 'Khi nào phải dừng chữa cháy để thoát nạn?', answer: 'Khi lửa lan rộng hơn khả năng của bình chữa cháy, khói dày làm khó thở hoặc che tầm nhìn, lửa chặn lối thoát phía sau lưng, hoặc đã dùng hết bình mà đám cháy không nhỏ đi. Lúc đó cần rời khu vực ngay.' },
      { question: 'Có được dùng thang máy để thoát khi cháy không?', answer: 'Không. Thang máy có thể mất điện và dừng giữa tầng, giếng thang dễ thành đường dẫn khói. Hãy dùng cầu thang bộ và lối thoát nạn có biển chỉ dẫn.' },
      { question: 'Gọi 114 cần nói những gì?', answer: 'Địa chỉ chính xác, tên cơ sở, điểm mốc dễ nhận, cái gì đang cháy, có người mắc kẹt hay không, có hóa chất, bình gas hoặc chất dễ nổ không, và số điện thoại để lực lượng chữa cháy gọi lại.' },
    ],
    related: [REL_SP, REL_HUB],
    sources: [SRC_LUAT, SRC_ND105, SRC_SP],
    body: ({ pic }) => `
<p class="kb-first"><b>Trả lời nhanh:</b> nếu đám cháy lớn không kiểm soát được cán bộ nhân viên cần làm gì? Ngừng chữa cháy, báo động cho mọi người, rời khỏi khu vực theo lối thoát nạn, gọi 114 nếu chưa ai gọi, tập trung tại điểm tập kết để điểm danh và báo ngay cho lực lượng chữa cháy biết còn ai bên trong. Tài sản để sau, con người là trên hết.</p>

<h2 id="nhan-biet">Nhận biết lúc nào đám cháy đã vượt tầm kiểm soát</h2>
<p>Bình chữa cháy xách tay chỉ dùng cho đám cháy mới bắt đầu. Một bình bột loại thường phun được trong khoảng chục giây, đủ cho một thùng rác, một ổ cắm hay một góc kệ hàng vừa bén lửa. Khi đám cháy đã lớn hơn thế, cố dập tiếp chỉ làm người cầm bình mắc kẹt.</p>
<p>Có bốn dấu hiệu nên dừng ngay: lửa lan sang vật liệu khác hoặc lên trần; khói đen dày làm cay mắt, khó thở; ngọn lửa nằm giữa bạn và lối thoát; đã dùng hết một đến hai bình mà lửa không nhỏ đi. Chỉ cần gặp một dấu hiệu, việc đúng là rút lui.</p>

${fig(pic, 'pccc-thoat-nan-cui-thap-che-mui')}
<h2 id="thoat-nan">Các bước thoát nạn an toàn</h2>
<ol>
<li><b>Báo động:</b> hô to "Cháy!", nhấn nút báo cháy gần nhất để cả tòa nhà biết. Đừng mặc định người khác đã nghe thấy.</li>
<li><b>Đi theo lối thoát nạn:</b> đi theo biển chỉ dẫn thoát nạn, dùng cầu thang bộ. Không dùng thang máy.</li>
<li><b>Chống ngạt khói:</b> che mũi miệng bằng khăn hoặc áo, làm ướt nếu có thể. Khói nóng bốc lên trên, nên cúi thấp người, men theo tường mà đi.</li>
<li><b>Thử cửa trước khi mở:</b> áp mu bàn tay lên cửa hoặc tay nắm. Nóng thì không mở, tìm lối khác. Ra khỏi phòng nào thì khép cửa phòng đó lại để chặn khói.</li>
<li><b>Không quay lại:</b> không quay vào lấy máy tính, hồ sơ, tiền hay xe. Đây là lý do thường gặp nhất khiến người đã thoát ra lại gặp nạn.</li>
</ol>
<p>Người được phân công trong đội PCCC cơ sở có thêm việc dẫn khách, người lạ và người cần hỗ trợ (người già, phụ nữ mang thai, người khuyết tật) ra ngoài. Các bước dập lửa ban đầu và báo cháy được trình bày trong bài <a class="kb-link" href="${K(S2)}">quy trình xử lý khi có cháy xảy ra</a>.</p>

<h2 id="mac-ket">Nếu bị mắc kẹt trong phòng</h2>
<p>Khi cả hành lang đã đầy khói, ở lại trong phòng kín đôi khi an toàn hơn lao ra ngoài. Đóng cửa, chèn khe cửa bằng vải ướt, tắt quạt và điều hòa để không hút khói vào. Gọi 114 báo chính xác bạn đang ở tầng nào, phòng nào. Ra cửa sổ hoặc ban công vẫy khăn sáng màu, bật đèn pin điện thoại để lực lượng cứu nạn nhìn thấy.</p>
<p>Không nhảy từ tầng cao. Không tự trèo ra ngoài bằng dây buộc tạm nếu chưa được hướng dẫn. Lực lượng cứu nạn có xe thang và thiết bị chuyên dụng để đưa người xuống.</p>

<h2 id="tap-ket">Tại điểm tập kết: điểm danh và cung cấp thông tin</h2>
<p>Ra khỏi tòa nhà rồi, mọi người tập trung ở điểm tập kết đã quy định, cách xa tòa nhà và không chắn đường xe chữa cháy. Trưởng bộ phận điểm danh theo danh sách ca làm việc. Ai còn thiếu thì báo ngay cho chỉ huy chữa cháy, kèm vị trí làm việc cuối cùng của người đó.</p>
<p>Người nắm rõ cơ sở (quản lý, bảo vệ, kỹ thuật) nên chủ động gặp lực lượng chữa cháy để chỉ vị trí cầu dao tổng, bể nước, trụ nước, khu chứa hóa chất, bình gas hay hàng dễ cháy. Những thông tin này giúp họ chọn cách dập và tránh nguy cơ nổ.</p>

${fig(pic, 'pccc-diem-tap-ket-diem-danh')}
<h2 id="khong-nen">Những việc không nên làm khi cháy lớn</h2>
<ul>
<li>Không đứng xem hoặc quay phim gần đám cháy, không đỗ xe chắn lối vào của xe chữa cháy.</li>
<li>Không tự ý mở toang cửa lớn của khu đang cháy: lượng khí mới tràn vào có thể làm lửa bùng mạnh.</li>
<li>Không dùng nước dập vào thiết bị điện khi chưa chắc đã cắt điện. Xem thêm bài <a class="kb-link" href="${K(S4)}">khi có cháy do điện đầu tiên phải làm gì</a>.</li>
<li>Không tự quay vào trong khi lực lượng chữa cháy chưa cho phép, kể cả khi lửa đã tắt: kết cấu có thể sập, khói độc vẫn còn.</li>
</ul>

<h2 id="sau-dam-chay">Sau đám cháy: giữ hiện trường và báo bảo hiểm</h2>
<p>Khi lửa đã được dập, cơ sở cần giữ nguyên hiện trường để cơ quan chức năng điều tra nguyên nhân. Chụp ảnh, quay video khu vực thiệt hại từ nhiều góc, lưu lại danh sách tài sản, hàng hóa bị ảnh hưởng và các chứng từ liên quan.</p>
<p>Nếu cơ sở có <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> hoặc bảo hiểm tài sản, hãy báo cho doanh nghiệp bảo hiểm ngay khi có thể và làm theo hướng dẫn trên hợp đồng. Khách hàng của PVI Thành Đô gọi tổng đài bồi thường <a class="kb-link" href="tel:1900545458">1900 54 54 58</a>. Không tự dọn dẹp, bán thanh lý hàng cháy trước khi giám định viên đến, vì đây là căn cứ để xác định mức bồi thường.</p>

${fig(pic, 'pccc-giu-hien-truong-sau-chay')}
<h2 id="tap-truoc">Muốn làm đúng khi cháy, phải tập từ trước</h2>
<p>Không ai nhớ được các bước trên nếu lần đầu nghe đến là lúc khói đã tràn hành lang. Cơ sở nên tổ chức diễn tập thoát nạn định kỳ, cho từng người đi thử lối thoát của khu mình làm việc, biết điểm tập kết nằm ở đâu và ai là người điểm danh. Cách xây dựng lực lượng và kế hoạch được nói rõ trong bài <a class="kb-link" href="${K(S5)}">phải làm gì để thực hiện tốt nhiệm vụ PCCC tại cơ sở</a>.</p>
<p>Cần tư vấn bảo hiểm cho nhà xưởng, kho hàng, văn phòng? Gọi PVI Thành Đô <a class="kb-link" href="tel:0938072236">0938 072 236</a>.</p>`,
  },

  /* ── Bài 2 ── */
  {
    ...base(S2, DATE, CAT,
      'Quy trình xử lý khi có cháy xảy ra ở địa phương hay nơi làm việc',
      'Một đám cháy nhỏ thành thảm họa thường vì mất vài phút đầu: không ai báo động, không ai cắt điện, không ai biết bình chữa cháy để đâu. Quy trình dưới đây gồm 7 bước, áp dụng được cho văn phòng, nhà xưởng, kho hàng và khu dân cư.',
      'pccc-quy-trinh-xu-ly-chay-hero',
      { title: 'Quy trình xử lý khi có cháy ở địa phương, nơi làm việc | PVI', description: 'Quy trình xử lý khi có cháy xảy ra ở địa phương hay nơi làm việc gồm 7 bước: báo động, cắt điện, gọi 114, cứu người, chữa cháy ban đầu, đón xe chữa cháy, khắc phục.' }, 6),
    faqs: [
      { question: 'Phát hiện cháy thì việc đầu tiên là gì?', answer: 'Báo động cho mọi người xung quanh biết bằng cách hô to và nhấn nút báo cháy. Sau đó cắt điện khu vực cháy, gọi 114 và chữa cháy ban đầu nếu đám cháy còn nhỏ.' },
      { question: 'Gọi 114 có mất phí không?', answer: 'Không. 114 là số điện thoại khẩn cấp gọi lực lượng Cảnh sát phòng cháy, chữa cháy và cứu nạn, cứu hộ, gọi miễn phí từ điện thoại cố định và di động.' },
      { question: 'Phương châm bốn tại chỗ là gì?', answer: 'Chỉ huy tại chỗ, lực lượng tại chỗ, phương tiện tại chỗ và hậu cần tại chỗ. Nghĩa là cơ sở, khu dân cư tự tổ chức xử lý ngay trong những phút đầu, trong lúc chờ lực lượng chuyên nghiệp đến.' },
    ],
    related: [REL_SP, { href: '/tin-tuc/chay-can-ho-chung-cu-happy-valley-bao-hiem-chay-no/', img: 'chay-happy-valley-hien-truong', w: 1200, h: 630, k: 'Tin tức', title: 'Cháy căn hộ chung cư Happy Valley', text: 'Vụ cháy thực tế và bài học về bảo hiểm cháy nổ cho chung cư.' }],
    sources: [SRC_LUAT, SRC_ND105, SRC_SP],
    body: ({ pic }) => `
<p class="kb-first"><b>Trả lời nhanh:</b> quy trình xử lý khi có cháy xảy ra ở địa phương hay nơi làm việc gồm 7 bước: báo động, cắt điện, gọi 114, cứu người, chữa cháy ban đầu, đón và hỗ trợ lực lượng chữa cháy, rồi bảo vệ hiện trường và khắc phục. Ba bước đầu nên làm gần như cùng lúc, do nhiều người cùng làm.</p>

<h2 id="buoc-1">Bước 1: Phát hiện và báo động</h2>
<p>Người phát hiện cháy hô to "Cháy! Cháy!" và nhấn nút báo cháy gần nhất. Ở khu dân cư chưa có hệ thống báo cháy, có thể dùng kẻng, còi, loa hoặc gõ cửa từng nhà. Mục tiêu là để mọi người trong khu vực biết sớm nhất có thể, vì mỗi phút trôi qua lửa và khói lan nhanh hơn.</p>

${fig(pic, 'pccc-nhan-nut-bao-chay')}
<h2 id="buoc-2">Bước 2: Cắt điện khu vực cháy</h2>
<p>Người gần cầu dao, aptomat nhất ngắt điện khu vực đang cháy, hoặc ngắt tổng nếu không rõ đường điện. Cắt điện giúp ngăn chập cháy lan rộng và giúp dùng nước an toàn. Riêng cháy do điện có những lưu ý riêng, đọc kỹ ở bài <a class="kb-link" href="${K(S4)}">khi có cháy xảy ra do điện đầu tiên ta phải làm gì</a>.</p>

<h2 id="buoc-3">Bước 3: Gọi 114</h2>
<p>Gọi ngay số 114 của lực lượng Cảnh sát phòng cháy, chữa cháy và cứu nạn, cứu hộ. Nói rõ và bình tĩnh:</p>
<ul>
<li>Địa chỉ chính xác: số nhà, tên đường, phường, điểm mốc dễ nhận.</li>
<li>Cái gì đang cháy: nhà ở, xưởng gỗ, kho hóa chất, xe, trạm điện.</li>
<li>Có người mắc kẹt không, ở tầng nào.</li>
<li>Số điện thoại để lực lượng chữa cháy gọi lại khi cần chỉ đường.</li>
</ul>
<p>Đừng nghĩ "chắc có người gọi rồi". Nhiều cuộc gọi về cùng một vụ không sao, không ai gọi mới là vấn đề.</p>

${fig(pic, 'pccc-goi-114')}
<h2 id="buoc-4">Bước 4: Cứu người và hướng dẫn thoát nạn</h2>
<p>Ưu tiên đưa người ra khỏi khu vực nguy hiểm, nhất là người già, trẻ em, người khuyết tật và người đang bị kẹt. Người được phân công hướng dẫn mọi người đi theo lối thoát nạn ra điểm tập kết, không dùng thang máy. Khi đám cháy đã vượt tầm, xem các bước chi tiết ở bài <a class="kb-link" href="${K(S1)}">nếu đám cháy lớn không kiểm soát được cán bộ nhân viên cần làm gì</a>.</p>

<h2 id="buoc-5">Bước 5: Chữa cháy ban đầu bằng phương tiện tại chỗ</h2>
<p>Khi đám cháy còn nhỏ và lối thoát phía sau lưng vẫn thông, lực lượng tại chỗ dùng bình chữa cháy, tủ chữa cháy vách tường hoặc cát, chăn ướt để dập. Đây là tinh thần "bốn tại chỗ": chỉ huy tại chỗ, lực lượng tại chỗ, phương tiện tại chỗ, hậu cần tại chỗ.</p>
<p>Cách dùng bình chữa cháy xách tay: rút chốt an toàn, đứng đầu hướng gió, cách đám cháy khoảng một đến hai mét, hướng loa phun vào gốc lửa rồi bóp van, quét qua lại cho đến khi lửa tắt. Đồng thời di chuyển hàng hóa, bình gas, can xăng dầu ra xa để ngăn cháy lan.</p>

<h2 id="buoc-6">Bước 6: Đón và hỗ trợ lực lượng chữa cháy</h2>
<p>Cử người ra đầu đường đón xe chữa cháy, mở cổng, dẹp xe máy, ô tô chắn lối. Khi lực lượng chuyên nghiệp đến, chỉ huy tại chỗ báo cáo tình hình: còn ai bên trong, vị trí cầu dao, nguồn nước, khu chứa chất dễ cháy nổ. Từ lúc này mọi người làm theo chỉ huy của lực lượng chữa cháy.</p>

${fig(pic, 'pccc-don-xe-chua-chay')}
<h2 id="buoc-7">Bước 7: Bảo vệ hiện trường và khắc phục</h2>
<p>Sau khi lửa tắt, giữ nguyên hiện trường cho cơ quan chức năng điều tra. Điểm danh lại người, kiểm tra người bị thương, ngạt khói để đưa đi cấp cứu. Chụp ảnh thiệt hại, lập danh sách tài sản hư hỏng và báo ngay cho doanh nghiệp bảo hiểm nếu cơ sở có hợp đồng. Với cơ sở thuộc diện phải mua, đây là lúc <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> phát huy tác dụng; khách hàng PVI Thành Đô gọi tổng đài bồi thường <a class="kb-link" href="tel:1900545458">1900 54 54 58</a>.</p>

<h2 id="dia-phuong">Ở khu dân cư thì khác gì?</h2>
<p>Ở khu dân cư, vai trò chỉ huy tại chỗ thường là tổ trưởng tổ dân phố, công an khu vực hoặc đội dân phòng. Người dân hỗ trợ báo động, cắt điện nhà mình và nhà bên cạnh, đưa người già, trẻ em ra ngoài, giữ lối đi trong hẻm thông thoáng cho xe chữa cháy. Đây cũng là lúc thấy rõ giá trị của việc mỗi nhà có một bình chữa cháy và biết cách dùng. Bài học từ các vụ cháy thực tế được tổng hợp trong <a class="kb-link" href="${HUB}">kiến thức cháy nổ, tài sản</a> của PVI Thành Đô.</p>`,
  },

  /* ── Bài 3 ── */
  {
    ...base(S3, DATE, CAT,
      'Các nguy cơ có thể xảy ra cháy nổ tại nơi làm việc và cách phòng ngừa',
      'Phần lớn vụ cháy ở văn phòng, nhà xưởng, kho hàng bắt đầu từ những thứ rất quen: ổ điện quá tải, tàn thuốc, hàng xếp sát bóng đèn, can dung môi để cạnh máy hàn. Nhận ra nguy cơ sớm là cách rẻ nhất để không phải xử lý một vụ cháy.',
      'pccc-nguy-co-chay-no-hero',
      { title: 'Các nguy cơ có thể xảy ra cháy nổ tại nơi làm việc | PVI', description: 'Các nguy cơ có thể xảy ra cháy nổ tại nơi làm việc: điện, nguồn lửa trần, hóa chất, bụi, hàng hóa xếp sai, thói quen chủ quan. Cách nhận biết và phòng ngừa.' }, 6),
    faqs: [
      { question: 'Nguyên nhân cháy phổ biến nhất ở nơi làm việc là gì?', answer: 'Sự cố hệ thống điện và thiết bị điện như quá tải, chập mạch, tiếp xúc kém, dây dẫn xuống cấp thường được nhắc đến nhiều nhất. Tiếp theo là nguồn lửa trần, nhiệt từ hàn cắt và việc sử dụng, bảo quản chất dễ cháy không đúng cách.' },
      { question: 'Văn phòng có nguy cơ cháy không?', answer: 'Có. Văn phòng nhiều giấy, thảm, nội thất gỗ, thiết bị điện chạy cả ngày, ổ cắm nối dài và sạc điện thoại, pin dự phòng để qua đêm. Nguy cơ thấp hơn nhà xưởng nhưng không phải là không có.' },
      { question: 'Bụi có thể gây nổ không?', answer: 'Có. Bụi gỗ, bột mì, bột đường, bụi nhôm và một số bụi nhựa khi lơ lửng trong không khí với nồng độ đủ lớn, gặp tia lửa có thể bắt cháy rất nhanh và gây nổ. Cơ sở có bụi cần hút bụi, vệ sinh định kỳ và kiểm soát nguồn lửa.' },
    ],
    related: [REL_SP, { href: '/tin-tuc/bao-hiem-chay-no-kho-hang-sprinkler-thuc-te/', img: 'kho-kho-hang-toan-canh', w: 1200, h: 630, k: 'Trải nghiệm thực tế', title: 'Bảo hiểm cháy nổ kho hàng có sprinkler', text: 'Đọc một bảng chào phí thật cho kho hàng 56 tỷ đồng.' }],
    sources: [SRC_LUAT, SRC_ND105, SRC_SP],
    body: ({ pic }) => `
<p class="kb-first"><b>Trả lời nhanh:</b> các nguy cơ có thể xảy ra cháy nổ tại nơi làm việc thường thuộc sáu nhóm: hệ thống điện, nguồn lửa trần và nhiệt, hóa chất và nhiên liệu, bụi dễ cháy, hàng hóa sắp xếp sai và thói quen chủ quan của con người. Mỗi nhóm có cách nhận biết và phòng ngừa riêng.</p>

<h2 id="dien">1. Hệ thống điện và thiết bị điện</h2>
<p>Đây là nhóm nguy cơ gặp nhiều nhất. Các dấu hiệu cần chú ý: ổ cắm, phích cắm nóng hoặc có vết cháy xém; aptomat hay nhảy; dây điện đi nổi, bị chuột cắn, bị đè dưới hàng hóa; ổ cắm nối dài cắm chồng nhiều thiết bị công suất lớn như ấm siêu tốc, máy sưởi, máy hàn.</p>
<p>Cách phòng ngừa: dùng dây dẫn và aptomat đúng công suất, không tự đấu nối thêm tải; kiểm tra định kỳ tủ điện, mối nối; tắt thiết bị không cần thiết khi hết ca. Xử lý khi đã xảy ra cháy do điện được hướng dẫn riêng trong bài <a class="kb-link" href="${K(S4)}">khi có cháy do điện đầu tiên phải làm gì</a>.</p>

${fig(pic, 'pccc-o-cam-qua-tai')}
<h2 id="nguon-lua">2. Nguồn lửa trần và nhiệt</h2>
<p>Hàn, cắt kim loại, mài, đun nấu, hút thuốc, thắp hương, đốt rác đều tạo ra lửa hoặc tia lửa. Tia lửa hàn có thể bắn xa vài mét, rơi vào khe kệ hàng và âm ỉ cháy sau khi thợ đã về. Bóng đèn công suất lớn đặt sát hàng hóa cũng đủ nóng để làm vải, giấy, nhựa bén lửa.</p>
<p>Cách phòng ngừa: hàn cắt phải có người giám sát, che chắn, dọn chất cháy quanh khu vực và kiểm tra lại sau khi xong việc; quy định khu hút thuốc riêng; giữ khoảng cách an toàn giữa đèn chiếu sáng và hàng hóa.</p>

${fig(pic, 'pccc-han-cat-tia-lua')}
<h2 id="hoa-chat">3. Hóa chất, nhiên liệu, khí đốt</h2>
<p>Xăng dầu, dung môi sơn, cồn, keo dán, bình gas, bình khí nén là những thứ chỉ cần một tia lửa là bùng cháy hoặc phát nổ. Nguy cơ tăng khi chúng được chiết rót bằng tay, để trong can không nắp, xếp cạnh nguồn nhiệt hay trong phòng kín không thông gió.</p>
<p>Cách phòng ngừa: chứa trong kho riêng, có biển cảnh báo, thông gió tốt; chỉ để tại khu sản xuất lượng đủ dùng trong ca; đậy kín nắp, không dùng chai nước uống để đựng hóa chất; nhân viên phải biết mình đang dùng chất gì và xử lý ra sao khi bị đổ tràn.</p>

${fig(pic, 'pccc-kho-hoa-chat')}
<h2 id="bui">4. Bụi dễ cháy</h2>
<p>Xưởng gỗ, xưởng may, nhà máy thực phẩm, xưởng đánh bóng kim loại tạo ra nhiều bụi mịn. Bụi bám trên máy, trần, đường ống là lớp chất cháy rất mỏng, dễ bén. Khi bụi bị thổi tung trong không khí ở nồng độ đủ lớn và gặp tia lửa, có thể gây nổ bụi.</p>
<p>Cách phòng ngừa: lắp hệ thống hút bụi, vệ sinh định kỳ cả những chỗ khuất như trên xà gồ, trong máng điện; nối đất cho máy móc để tránh tia lửa tĩnh điện; không dùng khí nén thổi bụi bay khắp xưởng.</p>

<h2 id="hang-hoa">5. Hàng hóa sắp xếp sai</h2>
<p>Kho hàng thường có rất nhiều chất cháy: thùng carton, màng bọc, pallet gỗ, vải, nhựa. Nguy cơ tăng khi hàng chất quá cao sát trần, che đầu phun chữa cháy tự động, chắn tủ chữa cháy, lấn ra lối thoát nạn; hoặc khi hàng dễ cháy để chung với hàng dễ nổ.</p>
<p>Cách phòng ngừa: chia lô, chừa lối đi, giữ khoảng cách từ đỉnh hàng tới đầu phun và đèn; không để hàng trước tủ chữa cháy và cửa thoát nạn. Kho có hệ thống chữa cháy tự động còn cần lưu ý rủi ro nước rò rỉ làm hỏng hàng, như trong bài trải nghiệm về kho hàng có sprinkler ở cuối trang.</p>

<h2 id="con-nguoi">6. Thói quen chủ quan của con người</h2>
<p>Nhiều nguy cơ không nằm ở thiết bị mà ở thói quen: sạc xe điện, pin dự phòng qua đêm trong xưởng; khóa cửa thoát nạn cho tiện quản lý; để bình chữa cháy hết hạn; tắt chuông báo cháy vì "hay kêu nhầm"; không ai được giao nhiệm vụ kiểm tra cuối ca. Khi đã thành thói quen, không ai thấy đó là nguy cơ nữa.</p>
<p>Cách phòng ngừa: giao rõ người chịu trách nhiệm từng khu vực, có bảng kiểm tra cuối ca, huấn luyện định kỳ. Toàn bộ việc tổ chức này được trình bày trong bài <a class="kb-link" href="${K(S5)}">phải làm gì để thực hiện tốt nhiệm vụ PCCC tại cơ sở</a>.</p>

<h2 id="tai-chinh">Rủi ro còn lại: chuẩn bị về tài chính</h2>
<p>Làm tốt phòng ngừa giảm mạnh khả năng cháy, nhưng không đưa rủi ro về con số không. Cơ sở thuộc danh mục tại Nghị định 105/2025/NĐ-CP phải mua <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> cho tài sản; cơ sở khác cũng nên cân nhắc để có nguồn tiền khôi phục nhà xưởng, máy móc, hàng hóa nếu sự cố xảy ra. Muốn biết cơ sở mình có thuộc diện bắt buộc không, xem bài <a class="kb-link" href="/tin-tuc/quy-dinh-mua-bao-hiem-chay-no-bat-buoc/">quy định mua bảo hiểm cháy nổ bắt buộc</a> hoặc gọi PVI Thành Đô <a class="kb-link" href="tel:0938072236">0938 072 236</a>.</p>`,
  },

  /* ── Bài 4 ── */
  {
    ...base(S4, DATE, CAT,
      'Khi có cháy xảy ra do điện đầu tiên ta phải làm gì?',
      'Cháy do điện nguy hiểm gấp đôi vì ngoài lửa còn có nguy cơ điện giật. Phản xạ tạt nước vào ổ điện đang cháy có thể khiến người dập lửa bị giật. Việc đầu tiên luôn là ngắt nguồn điện.',
      'pccc-chay-do-dien-ngat-cau-dao-hero',
      { title: 'Khi có cháy do điện, đầu tiên ta phải làm gì? | PVI', description: 'Khi có cháy xảy ra do điện đầu tiên ta phải làm gì: ngắt cầu dao, aptomat; báo động, gọi 114; dập bằng bình CO2 hoặc bình bột, không dùng nước khi chưa cắt điện.' }, 5),
    faqs: [
      { question: 'Cháy do điện có dùng nước dập được không?', answer: 'Chỉ khi đã chắc chắn ngắt điện khu vực cháy. Khi điện chưa được cắt, nước dẫn điện có thể khiến người dập lửa bị giật. Lúc đó dùng bình chữa cháy CO2 hoặc bình bột.' },
      { question: 'Bình chữa cháy nào dùng cho cháy do điện?', answer: 'Bình khí CO2 và bình bột (thường ghi ký hiệu BC hoặc ABC). Bình CO2 không để lại cặn, hợp với tủ điện, máy tính, thiết bị điện tử; khi dùng không cầm vào loa phun vì rất lạnh. Bình bột dập nhanh nhưng để lại bụi bột.' },
      { question: 'Không với tới cầu dao thì làm sao ngắt điện?', answer: 'Ngắt aptomat tổng hoặc cầu dao tổng của tầng, của tòa nhà; nếu vẫn không được thì báo ngay cho người phụ trách kỹ thuật điện và khi gọi 114 nói rõ là cháy do điện chưa cắt được nguồn. Không dùng tay không hoặc vật kim loại để giật dây điện.' },
    ],
    related: [REL_SP, REL_HUB],
    sources: [SRC_LUAT, SRC_ND105, SRC_SP],
    body: ({ pic }) => `
<p class="kb-first"><b>Trả lời nhanh:</b> khi có cháy xảy ra do điện đầu tiên ta phải làm gì? Ngắt nguồn điện: tắt cầu dao, aptomat của thiết bị hoặc khu vực đang cháy, không với tới thì ngắt tổng. Sau đó báo động, gọi 114 và dập lửa bằng bình CO2 hoặc bình bột. Chỉ dùng nước khi đã chắc chắn điện đã được cắt.</p>

<h2 id="vi-sao">Vì sao phải ngắt điện trước tiên?</h2>
<p>Khi thiết bị điện còn được cấp điện, đám cháy có nguồn nhiệt liên tục từ chỗ chập mạch, dập rồi vẫn có thể bùng lại. Nước và nhiều dung dịch dẫn điện, nếu tạt vào ổ điện đang có điện thì dòng điện có thể truyền ngược về người cầm vòi. Ngắt điện vừa cắt nguồn gây cháy, vừa làm cho các cách dập lửa trở nên an toàn.</p>
<p>Ngắt điện cũng là bước 2 trong <a class="kb-link" href="${K(S2)}">quy trình xử lý khi có cháy xảy ra</a> nói chung. Với cháy do điện, bước này lên hàng đầu.</p>

<h2 id="cac-buoc">Các bước xử lý cháy do điện</h2>
<ol>
<li><b>Ngắt điện:</b> tắt aptomat, cầu dao của thiết bị hoặc khu vực đang cháy. Không rõ đường điện thì ngắt cầu dao tổng. Thao tác bằng tay khô, đứng trên nền khô, không chạm vào thiết bị đang cháy.</li>
<li><b>Báo động:</b> hô to cho người xung quanh, nhấn nút báo cháy.</li>
<li><b>Gọi 114:</b> báo địa chỉ, nói rõ đây là cháy do điện và đã cắt được điện hay chưa.</li>
<li><b>Dập lửa ban đầu:</b> dùng bình CO2 hoặc bình bột, đứng đầu hướng gió, phun vào gốc lửa. Đám cháy nhỏ ở thiết bị gia dụng có thể dùng chăn ướt trùm lên sau khi đã rút điện.</li>
<li><b>Ngăn cháy lan:</b> di chuyển giấy, vải, hàng hóa, can nhiên liệu ra xa khu vực cháy.</li>
<li><b>Thoát nạn nếu không dập được:</b> khói từ dây điện, vỏ nhựa cháy rất độc, đừng cố ở lại trong phòng kín.</li>
</ol>

${fig(pic, 'pccc-binh-co2-tu-dien')}
<h2 id="chon-binh">Chọn đúng loại bình chữa cháy</h2>
<div class="kb-table" role="region" aria-label="Loại bình chữa cháy dùng cho cháy do điện" tabindex="0"><table>
<thead><tr><th scope="col">Loại bình</th><th scope="col">Dùng cho cháy do điện</th><th scope="col">Lưu ý</th></tr></thead>
<tbody>
<tr><td>Bình khí CO2</td><td>Phù hợp, nhất là tủ điện, máy tính, thiết bị điện tử</td><td>Không để lại cặn. Không cầm vào loa phun vì rất lạnh. Hạn chế dùng trong phòng kín nhỏ khi còn người.</td></tr>
<tr><td>Bình bột (BC, ABC)</td><td>Phù hợp</td><td>Dập nhanh, nhưng bột bám vào thiết bị, cần vệ sinh sau đó.</td></tr>
<tr><td>Nước, bình bọt</td><td>Chỉ khi đã ngắt điện chắc chắn</td><td>Dẫn điện, có thể gây điện giật nếu điện chưa cắt.</td></tr>
</tbody></table></div>
<p>Trên thân bình luôn có nhãn ghi loại đám cháy dập được. Nên đọc nhãn ngay từ hôm nay, đừng đợi lúc có cháy.</p>

<h2 id="dau-hieu">Dấu hiệu sắp cháy do điện</h2>
<p>Nhiều vụ cháy do điện có dấu hiệu báo trước: mùi khét nhựa, ổ cắm phát tiếng lách tách, đèn chập chờn, aptomat nhảy liên tục, vỏ dây hoặc phích cắm nóng và biến màu. Gặp những dấu hiệu này, hãy ngắt điện thiết bị và báo người phụ trách kỹ thuật kiểm tra, đừng bật lại aptomat liên tục cho đến khi nó "chịu" giữ điện.</p>

${fig(pic, 'pccc-dau-hieu-chap-dien')}
<h2 id="phong-ngua">Phòng ngừa cháy do điện ở nơi làm việc</h2>
<ul>
<li>Thiết kế, lắp đặt hệ thống điện đúng công suất; mỗi thiết bị công suất lớn nên có aptomat riêng.</li>
<li>Không dùng ổ cắm nối dài cho máy sưởi, ấm đun, máy hàn; không cắm chồng nhiều phích.</li>
<li>Kiểm tra định kỳ mối nối, tủ điện, dây dẫn đi qua khu vực ẩm, nóng hoặc có chuột.</li>
<li>Không sạc xe điện, pin dự phòng qua đêm ở khu vực không có người trực.</li>
<li>Tắt thiết bị không cần thiết và ngắt nguồn khu vực khi hết ca.</li>
</ul>
<p>Điện chỉ là một trong nhiều nhóm nguy cơ. Danh sách đầy đủ có trong bài <a class="kb-link" href="${K(S3)}">các nguy cơ có thể xảy ra cháy nổ tại nơi làm việc</a>.</p>

${fig(pic, 'pccc-kiem-tra-tu-dien')}
<h2 id="bao-hiem">Thiệt hại do chập điện có được bảo hiểm không?</h2>
<p>Với <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a>, thiệt hại do cháy, nổ đối với tài sản được bảo hiểm thuộc phạm vi bồi thường, kể cả khi đám cháy bắt nguồn từ sự cố điện, trừ các trường hợp loại trừ ghi trong quy tắc. Riêng hư hỏng của chính thiết bị điện do chập mạch, quá tải mà không phát sinh cháy thường cần thêm điều khoản mở rộng. Khi mua, hãy hỏi rõ phạm vi để biết hợp đồng có bảo vệ trường hợp của mình không. PVI Thành Đô tư vấn qua số <a class="kb-link" href="tel:0938072236">0938 072 236</a>.</p>`,
  },

  /* ── Bài 5 ── */
  {
    ...base(S5, DATE, CAT,
      'Phải làm gì để thực hiện tốt nhiệm vụ PCCC tại cơ sở?',
      'Thực hiện tốt nhiệm vụ PCCC tại cơ sở không chỉ là mua đủ bình chữa cháy. Đó là một hệ thống gồm người chịu trách nhiệm, nội quy, lực lượng tại chỗ, phương tiện còn hoạt động, kế hoạch chữa cháy được diễn tập và hồ sơ được cập nhật.',
      'pccc-nhiem-vu-tai-co-so-hero',
      { title: 'Phải làm gì để thực hiện tốt nhiệm vụ PCCC tại cơ sở? | PVI', description: 'Phải làm gì để thực hiện tốt nhiệm vụ PCCC tại cơ sở: phân công trách nhiệm, nội quy, đội PCCC cơ sở, phương tiện, kế hoạch và diễn tập, hồ sơ, bảo hiểm cháy nổ.' }, 6),
    faqs: [
      { question: 'Ai chịu trách nhiệm PCCC tại cơ sở?', answer: 'Người đứng đầu cơ sở chịu trách nhiệm tổ chức công tác phòng cháy, chữa cháy tại cơ sở của mình theo Luật Phòng cháy, chữa cháy và cứu nạn, cứu hộ. Người lao động có trách nhiệm chấp hành nội quy và tham gia khi được phân công.' },
      { question: 'Bao lâu nên diễn tập chữa cháy một lần?', answer: 'Tần suất và hình thức thực tập phương án chữa cháy theo quy định hiện hành và yêu cầu của cơ quan Công an quản lý địa bàn. Ngoài mức tối thiểu, cơ sở nên diễn tập thêm khi có nhiều nhân viên mới, thay đổi bố trí nhà xưởng hoặc sau một sự cố.' },
      { question: 'Bình chữa cháy cần kiểm tra những gì?', answer: 'Kim đồng hồ áp suất (với bình bột) nằm trong vùng xanh, chốt và kẹp chì còn nguyên, vỏ không móp, rỉ, loa phun không nứt, tem kiểm tra còn hạn, và bình đặt đúng vị trí, không bị hàng hóa che khuất.' },
    ],
    related: [REL_SP, { href: '/tin-tuc/quy-dinh-mua-bao-hiem-chay-no-bat-buoc/', img: 'kho-duong-ong-chua-chay', w: 1000, h: 750, k: 'Pháp lý', title: 'Quy định mua bảo hiểm cháy nổ bắt buộc', text: '7 điều chủ cơ sở cần nắm theo NĐ 105/2025, NĐ 67/2023 và NĐ 347/2026.' }],
    sources: [SRC_LUAT, SRC_ND105, SRC_SP],
    body: ({ pic }) => `
<p class="kb-first"><b>Trả lời nhanh:</b> phải làm gì để thực hiện tốt nhiệm vụ PCCC tại cơ sở? Làm đủ sáu việc: giao rõ người chịu trách nhiệm, ban hành nội quy, có lực lượng PCCC tại chỗ được huấn luyện, giữ phương tiện chữa cháy luôn hoạt động, có kế hoạch chữa cháy và diễn tập thường xuyên, cập nhật hồ sơ và mua bảo hiểm cho tài sản theo quy định.</p>

<h2 id="trach-nhiem">1. Giao rõ trách nhiệm từ người đứng đầu</h2>
<p>Theo Luật Phòng cháy, chữa cháy và cứu nạn, cứu hộ, người đứng đầu cơ sở chịu trách nhiệm tổ chức công tác PCCC tại cơ sở của mình. Trong thực tế, giám đốc hay chủ cơ sở nên giao bằng văn bản: ai phụ trách chung, ai phụ trách từng xưởng, từng kho, từng tầng. Khi không ai được giao, mọi việc đều bị xem là "việc của người khác".</p>
<p>Mỗi trưởng bộ phận cần biết khu vực mình có những nguy cơ gì, phương tiện chữa cháy để đâu và ai trong tổ là người xử lý ban đầu khi có sự cố.</p>

<h2 id="noi-quy">2. Nội quy, biển báo và thói quen hằng ngày</h2>
<p>Nội quy PCCC, sơ đồ thoát nạn, biển cấm lửa, biển chỉ dẫn lối thoát phải được treo ở vị trí dễ thấy. Quan trọng hơn là biến nội quy thành thói quen: không hút thuốc ngoài khu quy định, không để hàng chắn tủ chữa cháy và cửa thoát nạn, kiểm tra và ngắt điện khu vực trước khi ra về.</p>
<p>Một bảng kiểm tra cuối ca vài dòng, có chữ ký người trực, giúp phát hiện sớm những thứ hay bị bỏ qua. Danh sách những thứ cần soát có trong bài <a class="kb-link" href="${K(S3)}">các nguy cơ có thể xảy ra cháy nổ tại nơi làm việc</a>.</p>

<h2 id="luc-luong">3. Lực lượng PCCC tại chỗ được huấn luyện</h2>
<p>Lực lượng tại chỗ là những người có mặt ngay trong những phút đầu, trước khi xe chữa cháy đến. Cơ sở cần thành lập và duy trì đội PCCC cơ sở theo quy định, chia đủ người cho các ca làm việc, kể cả ca đêm và ngày nghỉ. Thành viên đội cần được huấn luyện nghiệp vụ, biết dùng bình chữa cháy, tủ chữa cháy vách tường, biết cắt điện và hướng dẫn thoát nạn.</p>
<p>Những người còn lại tối thiểu phải biết ba việc: báo động thế nào, gọi 114 nói gì, thoát nạn theo lối nào. Đây là kiến thức nền của <a class="kb-link" href="${K(S2)}">quy trình xử lý khi có cháy xảy ra ở địa phương hay nơi làm việc</a>.</p>

${fig(pic, 'pccc-huan-luyen-doi-pccc')}
<h2 id="phuong-tien">4. Phương tiện chữa cháy luôn trong tình trạng hoạt động</h2>
<p>Bình chữa cháy hết áp, vòi chữa cháy mục, máy bơm không nổ, chuông báo cháy bị tắt vì "hay kêu nhầm" là những lỗi thường gặp khi kiểm tra. Cơ sở nên có sổ theo dõi: ngày kiểm tra, người kiểm tra, tình trạng, việc đã sửa. Bình chữa cháy được kiểm tra, nạp lại theo hướng dẫn của nhà sản xuất và quy định; hệ thống báo cháy, chữa cháy tự động được bảo dưỡng định kỳ bởi đơn vị có chuyên môn.</p>

${fig(pic, 'pccc-kiem-tra-binh-chua-chay')}
<h2 id="ke-hoach">5. Kế hoạch chữa cháy và diễn tập</h2>
<p>Cơ sở cần có phương án hoặc kế hoạch chữa cháy theo quy định: tình huống cháy lớn nhất có thể xảy ra, ai làm gì, dùng phương tiện nào, thoát nạn theo đường nào, điểm tập kết ở đâu. Kế hoạch chỉ có giá trị khi được diễn tập. Qua mỗi lần diễn tập, cơ sở sẽ thấy cửa thoát nạn nào bị khóa, ai chưa biết dùng bình, điểm tập kết nào chắn đường xe.</p>
<p>Diễn tập nên có cả tình huống xấu nhất, khi lửa vượt tầm kiểm soát. Hướng dẫn cho nhân viên trong tình huống này có ở bài <a class="kb-link" href="${K(S1)}">nếu đám cháy lớn không kiểm soát được cán bộ nhân viên cần làm gì</a>.</p>

${fig(pic, 'pccc-dien-tap-phuong-an')}
<h2 id="ho-so">6. Hồ sơ PCCC và bảo hiểm cháy nổ</h2>
<p>Hồ sơ PCCC của cơ sở gồm các văn bản về tổ chức lực lượng, nội quy, phương án, sổ theo dõi kiểm tra, huấn luyện, diễn tập theo quy định tại Nghị định 105/2025/NĐ-CP và văn bản sửa đổi. Hồ sơ được cập nhật mỗi khi cơ sở thay đổi quy mô, công năng hoặc nhân sự phụ trách.</p>
<p>Với cơ sở có tên trong danh mục, mua <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> cho tài sản là nghĩa vụ, không phải lựa chọn. Bảo hiểm không thay cho phòng cháy, nhưng giúp cơ sở có tiền khôi phục nhà xưởng, máy móc, hàng hóa nếu sự cố vẫn xảy ra. Tìm hiểu thêm ở mục <a class="kb-link" href="${HUB}">kiến thức cháy nổ, tài sản</a> hoặc gọi PVI Thành Đô <a class="kb-link" href="tel:0938072236">0938 072 236</a> để được tư vấn theo loại hình cơ sở.</p>
${fig(pic, 'pccc-ho-so-bao-hiem-chay-no')}`,
  },
];
