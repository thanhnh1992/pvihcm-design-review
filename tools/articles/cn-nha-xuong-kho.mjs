// Chiến dịch SEO cháy nổ bắt buộc, ngày 3 bài 1/5.
// Nhóm J: "bảo hiểm cháy nổ nhà xưởng", "phí bảo hiểm cháy nổ nhà xưởng", "bảo hiểm cháy nổ kho hàng".
// Tỷ lệ nhóm 35, 36 Phụ lục VI khớp tariff-data.js; ngưỡng Phụ lục VII mục 25 đến 30 theo docs/chay-no-50-bai/CN18, CN19 (đã đối chiếu bản gốc).
import { ZALO_TU_VAN } from './khu-vuc.mjs';

const CHAY_NO = '/san-pham/chay-no-bat-buoc/';

export const post = {
  slug: 'bao-hiem-chay-no-nha-xuong-kho-hang',
  date: '2026-11-15',
  dateText: '15/11/2026',
  cat: 'Cháy nổ bắt buộc · Nhà xưởng, kho',
  title: 'Bảo hiểm cháy nổ nhà xưởng, kho hàng: xưởng, kho nào phải mua và phí theo hạng A đến E',
  lead: 'Xưởng hạng A, B, C phải mua bảo hiểm cháy nổ bắt buộc không kể diện tích; xưởng hạng D, E từ 5.000 m³ hoặc 1.000 m² sàn. Kho hạng A, B, C từ 200 m² sàn. Phí tối thiểu từ 0,1% (kho hạng D, E) đến 0,5% (xưởng, kho gỗ) mỗi năm.',
  image: '/assets/kho-trong-kho-hang-bao.webp',
  alt: 'Hàng bao xếp chồng cao trên pallet nhựa trong nhà kho mái tôn khung thép',
  readMin: 6,
};

export const crumb = 'Cháy nổ bắt buộc';
export const hero = { name: 'kho-trong-kho-hang-bao', w: 1000, h: 1333, position: '50% 45%', caption: 'Ảnh thực tế: hàng bao xếp trên pallet trong kho tại TP.HCM, PVI Thành Đô khảo sát tháng 10/2026.' };
export const seo = {
  title: 'Bảo hiểm cháy nổ nhà xưởng, kho hàng: ai phải mua, phí theo hạng | PVI',
  description: 'Xưởng, kho nào phải mua bảo hiểm cháy nổ bắt buộc (Phụ lục VII mục 25 đến 30) và tỷ lệ phí theo hạng A, B, C, D, E, dệt may, giấy, giày, gỗ. Ví dụ tính phí.',
};

export const toc = [
  ['phai-mua', 'Xưởng, kho nào phải mua'],
  ['phi-xuong', 'Phí nhà xưởng'],
  ['phi-kho', 'Phí kho hàng'],
  ['kho-trong-nha-may', 'Kho trong nhà máy'],
  ['tai-san', 'Khai tài sản'],
  ['san-pham', 'Sản phẩm liên quan'],
  ['cau-hoi', 'Câu hỏi thường gặp'],
];

export const faqs = [
  { question: 'Nhà xưởng nào phải mua bảo hiểm cháy nổ bắt buộc?', answer: 'Cơ sở sản xuất có nhà sản xuất hạng A, B (mục 25) hoặc hạng C (mục 26) phải mua, không nêu ngưỡng diện tích. Hạng D, E phải mua khi khối tích từ 5.000 m³ hoặc sàn từ 1.000 m² (mục 27 Phụ lục VII Nghị định 105/2025).' },
  { question: 'Phí bảo hiểm cháy nổ nhà xưởng bao nhiêu?', answer: 'Tối thiểu mỗi năm: xưởng hạng D, E 0,15%; hạng A, B, C 0,2%; dệt may 0,25%; giày, giấy 0,35%; gỗ 0,5%, chưa gồm VAT. Ví dụ xưởng gỗ 10 tỷ đồng: 50 triệu đồng, tổng 55 triệu đồng có VAT.' },
  { question: 'Kho hàng bao nhiêu m² thì phải mua bảo hiểm cháy nổ?', answer: 'Kho hạng A, B, C từ 200 m² sàn (mục 28); kho hạng D, E khối tích từ 5.000 m³ hoặc sàn từ 1.000 m² (mục 30); kho dự trữ quốc gia không nêu ngưỡng.' },
  { question: 'Kho nằm trong nhà máy tính phí theo kho hay theo xưởng?', answer: 'Tỷ lệ nhóm 36 Phụ lục VI chỉ áp cho kho độc lập, không nằm trong phạm vi cơ sở sản xuất. Kho trong nhà máy tính theo tỷ lệ của cơ sở sản xuất. Từ 15/09/2026, công trình độc lập trong cùng cơ sở có thể tính riêng theo Nghị định 347/2026.' },
  { question: 'Hạng nguy hiểm A, B, C, D, E lấy ở đâu?', answer: 'Theo hồ sơ thẩm duyệt, nghiệm thu hoặc biên bản kiểm tra về PCCC của cơ sở. Phụ lục VI ghi rõ nếu biên bản phân hạng khác chi tiết trong nhóm 35 thì thực hiện theo biên bản.' },
];

export const sources = [
  ['Nghị định 105/2025/NĐ-CP, Phụ lục VII mục 25 đến 30; Phụ lục VI nhóm 35, 36', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 67/2023/NĐ-CP, Điều 23, Điều 24', 'https://congbao.chinhphu.vn/', 'Chính phủ'],
  ['Nghị định 347/2026/NĐ-CP', 'https://vanban.chinhphu.vn/', 'Chính phủ'],
  ['Biểu phí và bộ tính phí bảo hiểm cháy nổ bắt buộc', CHAY_NO, 'PVI Thành Đô'],
];

export const related = [
  { href: '/tin-tuc/bao-hiem-chay-no-kho-hang-sprinkler-thuc-te/', img: 'kho-kho-hang-toan-canh', w: 1200, h: 630, k: 'Ca thực tế', title: 'Kho có sprinkler: bảng chào phí 56 tỷ đồng', text: 'Đọc từng dòng của một bảng chào phí kho thật.' },
  { href: CHAY_NO, img: 'section-chay-no', k: 'Sản phẩm chính', title: 'Bảo hiểm cháy nổ bắt buộc', text: 'Tính phí xưởng, kho theo 59 dòng Phụ lục VI.' },
];

export function body({ ctaRow }) {
  return `
<p class="kb-first"><b>Trả lời nhanh:</b> với nhà xưởng và kho, nghĩa vụ mua <a class="kb-link" href="${CHAY_NO}">bảo hiểm cháy nổ bắt buộc</a> và mức phí đều phụ thuộc <b>hạng nguy hiểm cháy nổ</b> (A, B, C, D, E) ghi trong hồ sơ PCCC. Xưởng hạng A, B, C phải mua không kể diện tích; kho hạng A, B, C phải mua từ 200 m² sàn.</p>

<h2 id="phai-mua">Xưởng, kho nào phải mua?</h2>
<div class="kb-table" role="region" aria-label="Xưởng, kho phải mua" tabindex="0"><table>
<thead><tr><th scope="col">Mục PL VII</th><th scope="col">Loại cơ sở</th><th scope="col">Ngưỡng</th></tr></thead>
<tbody>
<tr><td>25</td><td>Cơ sở sản xuất có nhà sản xuất hạng A, B</td><td>Không nêu ngưỡng</td></tr>
<tr><td>26</td><td>Cơ sở sản xuất có nhà sản xuất hạng C</td><td>Không nêu ngưỡng</td></tr>
<tr><td>27</td><td>Cơ sở sản xuất có nhà sản xuất hạng D, E</td><td>Khối tích từ 5.000 m³ hoặc sàn từ 1.000 m²</td></tr>
<tr><td>28</td><td>Kho hàng hóa hạng A, B, C</td><td>Sàn từ 200 m²</td></tr>
<tr><td>29</td><td>Kho dự trữ quốc gia</td><td>Không nêu ngưỡng</td></tr>
<tr><td>30</td><td>Kho hàng hóa hạng D, E</td><td>Khối tích từ 5.000 m³ hoặc sàn từ 1.000 m²</td></tr>
</tbody></table></div>
<p>Các loại cơ sở khác xem <a class="kb-link" href="/tin-tuc/co-so-phai-mua-bao-hiem-chay-no-bat-buoc/">bảng tra cơ sở phải mua bảo hiểm cháy nổ</a>.</p>

<h2 id="phi-xuong">Phí bảo hiểm cháy nổ nhà xưởng (nhóm 35)</h2>
<div class="kb-table" role="region" aria-label="Phí nhà xưởng" tabindex="0"><table>
<thead><tr><th scope="col">Loại xưởng</th><th scope="col">Khấu trừ</th><th scope="col">Tỷ lệ/năm</th></tr></thead>
<tbody>
<tr><td>Hạng D, E (khối tích từ 5.000 m³ hoặc sàn từ 1.000 m²)</td><td>M</td><td>0,15%</td></tr>
<tr><td>Hạng A, B; hạng C (trừ dệt may, gỗ, giày, giấy)</td><td>N</td><td>0,2%</td></tr>
<tr><td>Sản xuất dệt may</td><td>N</td><td>0,25%</td></tr>
<tr><td>Sản xuất giày</td><td>N</td><td>0,35%</td></tr>
<tr><td>Sản xuất giấy, bao bì</td><td>N</td><td>0,35%</td></tr>
<tr><td>Sản xuất gỗ</td><td>N</td><td>0,5%</td></tr>
</tbody></table></div>
<p><b>Ví dụ:</b> xưởng gỗ, số tiền bảo hiểm 10 tỷ đồng: phí 50 triệu đồng, VAT 5 triệu đồng, tổng 55 triệu đồng mỗi năm.</p>

<h2 id="phi-kho">Phí bảo hiểm cháy nổ kho hàng (nhóm 36, kho độc lập)</h2>
<div class="kb-table" role="region" aria-label="Phí kho hàng" tabindex="0"><table>
<thead><tr><th scope="col">Loại kho</th><th scope="col">Khấu trừ</th><th scope="col">Tỷ lệ/năm</th></tr></thead>
<tbody>
<tr><td>Kho hạng D, E (gạch, gốm sứ, xi măng, kim loại, đồ uống...)</td><td>M</td><td>0,1%</td></tr>
<tr><td>Kho dự trữ quốc gia; kho hạng A, B, C</td><td>N</td><td>0,2%</td></tr>
<tr><td>Kho bông vải sợi, len dạ, sản phẩm dệt</td><td>N</td><td>0,25%</td></tr>
<tr><td>Kho giấy, bìa, bao bì</td><td>N</td><td>0,35%</td></tr>
<tr><td>Kho đồ gỗ và sản phẩm về gỗ</td><td>N</td><td>0,5%</td></tr>
</tbody></table></div>
<p><b>Ca thật:</b> kho hạng A, B, C ở TP.HCM có sprinkler, số tiền bảo hiểm 56 tỷ đồng, tỷ lệ 0,2%, tổng phí 123,2 triệu đồng có VAT, khấu trừ 40 triệu đồng mỗi vụ. Đủ 59 dòng có tại <a class="kb-link" href="${CHAY_NO}#bieu-phi">biểu phí bảo hiểm cháy nổ bắt buộc</a>.</p>

<h2 id="kho-trong-nha-may">Kho nằm trong nhà máy thì tính thế nào?</h2>
<p>Phụ lục VI ghi tỷ lệ nhóm 36 áp dụng cho kho độc lập, không nằm trong phạm vi nhà máy, cơ sở có hoạt động sản xuất. Kho trong nhà máy tính theo tỷ lệ của cơ sở sản xuất. Từ 15/09/2026, cơ sở có nhiều nhà, công trình độc lập, tính chất hoạt động khác nhau và bảo đảm quy định PCCC thì phí từng công trình được tính theo loại hình tương ứng (Nghị định 347/2026).</p>

<h2 id="tai-san">Khai tài sản xưởng, kho thế nào cho đủ?</h2>
<ol class="kb-steps">
<li><b>Nhà xưởng, nhà kho, công trình phụ.</b> Giá trị theo giá thị trường, hoặc giá trị còn lại, giá trị thay thế khi không có giá thị trường.</li>
<li><b>Máy móc, thiết bị.</b> Bảng kê tên máy, năm sử dụng, giá trị, vị trí.</li>
<li><b>Hàng hóa, nguyên vật liệu.</b> Theo thời gian lưu trữ; nên tính mức tồn cao điểm.</li>
<li><b>Hạng nguy hiểm.</b> Gửi kèm biên bản thẩm duyệt, nghiệm thu hoặc kiểm tra PCCC để áp đúng dòng phí.</li>
</ol>
<p>Chỉ khai nhà xưởng hoặc chỉ khai thiết bị là mua không đủ đối tượng, có thể bị xử phạt từ 20/4/2026. Ước tính nhanh tại <a class="kb-link" href="${CHAY_NO}#tra-cuu">bộ tính phí bảo hiểm cháy nổ</a>.</p>
</div>

<section class="kb-cta kb-wide" aria-labelledby="tu-van">
<div>
<h2 id="tu-van">Khảo sát và báo phí cho xưởng, kho</h2>
<p>Nhắn <a href="${ZALO_TU_VAN}" target="_blank" rel="noopener">Zalo 0938 072 236</a> địa chỉ, diện tích, hạng nguy hiểm và danh mục tài sản. PVI Thành Đô khảo sát khi cần và gửi báo phí trước khi bạn quyết định.</p>
</div>
${ctaRow('Gọi tư vấn 0938 072 236')}
</section>

<div class="kb-col">
`;
}
