/**
 * HUB CẬP NHẬT — nguồn dữ liệu cho khối hỏi–đáp pháp lý trên trang sản phẩm,
 * trang danh sách /bao-hiem-tai-nan-24-24/cap-nhat và các trang bài viết con
 * /bao-hiem-tai-nan-24-24/cap-nhat/[slug].
 *
 * Viết bài mới = thêm một phần tử vào `legalUpdates`. Không phải sửa component
 * nào: khối hỏi–đáp trên trang sản phẩm, trang danh sách, trang chi tiết,
 * sitemap và JSON-LD đều đọc từ mảng này.
 *
 * Quy ước:
 * - `title` viết dưới dạng câu hỏi người mua thực sự gõ, vì khối trên trang sản
 *   phẩm hiển thị theo kiểu FAQ gấp/mở cho gọn.
 * - `publishedAt` / `updatedAt`: ISO có giờ, giờ Việt Nam (+07:00). Đây là mốc
 *   xuất bản của bài trên site, không phải ngày ban hành văn bản.
 * - `status`: chỉ "current" mới hiện nhãn xanh "Đang áp dụng". Không dùng nhãn
 *   đỏ cho văn bản hết hiệu lực — thông tin đó nằm trong nội dung trả lời.
 * - `body`: mỗi phần tử là một đoạn văn. Để mảng rỗng nếu mục chỉ trỏ ra nguồn
 *   ngoài — khi đó link sẽ đi thẳng tới `sourceHref`.
 */
export const UPDATES_PATH = "/bao-hiem-tai-nan-24-24/cap-nhat";
const AUTHOR = "Ban nội dung Bảo hiểm PVI Thành Đô";
export const legalUpdates = [
    {
        slug: "nghi-dinh-220-2026",
        title: "Nghị định 220/2026/NĐ-CP quy định những gì?",
        label: "Nghị định 220/2026/NĐ-CP",
        category: "Văn bản pháp lý",
        status: "current",
        statusLabel: "Đang áp dụng",
        publishedAt: "2026-08-29T09:00:00+07:00",
        updatedAt: "2026-08-29T09:00:00+07:00",
        author: AUTHOR,
        image: "/bai-cn-nghi-dinh-220-2026.jpg",
        summary: "Văn bản đang có hiệu lực về bảo hiểm bắt buộc trong hoạt động đầu tư xây dựng, thay thế Nghị định 67/2023/NĐ-CP từ 01/7/2026.",
        body: [
            "Nghị định 220/2026/NĐ-CP có hiệu lực từ 01/7/2026, thay thế Nghị định 67/2023/NĐ-CP. Đây là căn cứ duy nhất đang áp dụng cho bảo hiểm bắt buộc trong hoạt động đầu tư xây dựng, trong đó có bảo hiểm cho người lao động thi công trên công trường.",
            "Với nhà thầu, hai nội dung liên quan trực tiếp là: mức trách nhiệm tối thiểu phải mua cho mỗi người lao động, và phạm vi công trình thuộc diện bắt buộc. Hai nội dung này quyết định hồ sơ thầu có được chấp nhận hay không.",
            "Mọi báo giá phát hành sau 01/7/2026 phải ghi căn cứ là Nghị định 220/2026/NĐ-CP. Báo giá còn ghi văn bản cũ là căn cứ đã hết hiệu lực, có thể bị loại khi thẩm định.",
        ],
        sourceLabel: "Cổng thông tin văn bản Chính phủ",
        sourceHref: "https://vanban.chinhphu.vn/?docid=218555&pageid=27160",
    },
    {
        slug: "muc-trach-nhiem-toi-thieu",
        title: "Mức trách nhiệm tối thiểu cho người lao động thi công là bao nhiêu?",
        label: "Mức trách nhiệm tối thiểu",
        category: "Hướng dẫn",
        status: "info",
        publishedAt: "2026-08-29T09:05:00+07:00",
        updatedAt: "2026-08-29T09:05:00+07:00",
        author: AUTHOR,
        image: "/bai-cn-muc-trach-nhiem-toi-thieu.jpg",
        summary: "Mức tối thiểu áp dụng theo Nghị định 220/2026/NĐ-CP và phải đối chiếu theo loại công trình; nhiều chủ đầu tư còn đặt mức cao hơn.",
        body: [
            "Mức trách nhiệm tối thiểu áp dụng theo Nghị định 220/2026/NĐ-CP, hiệu lực từ 01/7/2026. Trang này không in một con số chung vì mức tối thiểu phải đối chiếu đúng nguyên văn điều khoản áp dụng cho từng loại công trình.",
            "Điểm nhiều nhà thầu bỏ sót: hồ sơ mời thầu của chủ đầu tư thường đặt mức yêu cầu cao hơn mức tối thiểu của Nghị định. Mua đúng mức tối thiểu vẫn có thể bị loại nếu hồ sơ thầu đòi cao hơn. Luôn đọc yêu cầu riêng của gói thầu trước khi chốt.",
            "Cách làm an toàn: gửi phần yêu cầu bảo hiểm trong hồ sơ mời thầu qua Zalo. Nhân viên đối chiếu với Nghị định 220/2026 và báo lại bằng văn bản mức cần mua, trước khi anh/chị thanh toán.",
            "Nếu đang cầm một báo giá sẵn, kiểm tra ngay hai thứ: căn cứ pháp lý ghi trên báo giá là văn bản nào, và số tiền bảo hiểm mỗi người có đạt yêu cầu của gói thầu không.",
        ],
    },
    {
        slug: "thong-tu-329-2016-con-hieu-luc-khong",
        title: "Thông tư 329/2016 còn hiệu lực không?",
        label: "Thông tư 329/2016/TT-BTC",
        category: "Phân tích",
        status: "info",
        publishedAt: "2026-08-29T09:10:00+07:00",
        updatedAt: "2026-08-29T09:10:00+07:00",
        author: AUTHOR,
        image: "/bai-cn-thong-tu-329-2016.jpg",
        summary: "Không. Đã hết hiệu lực từ 01/10/2022 nhưng vẫn là văn bản bị trích sai nhiều nhất trên báo giá và website.",
        body: [
            "Không. Thông tư 329/2016/TT-BTC đã hết hiệu lực từ 01/10/2022, khi Thông tư 50/2022/TT-BTC thay thế. Sau đó nội dung tiếp tục chuyển lên cấp nghị định: Nghị định 67/2023/NĐ-CP, rồi Nghị định 220/2026/NĐ-CP.",
            "Đây là văn bản bị trích sai nhiều nhất trong lĩnh vực này. Nếu báo giá anh/chị đang cầm ghi căn cứ là Thông tư 329/2016, mức trách nhiệm trong đó được tính theo một quy định đã hết hiệu lực gần bốn năm.",
            "Hậu quả thực tế không phải lý thuyết: hồ sơ có thể bị loại khi thẩm định, hoặc phải làm lại giấy chứng nhận sát ngày nộp thầu. Đề nghị bên bán phát hành lại theo Nghị định 220/2026/NĐ-CP trước khi nộp.",
            "Nghị định 119/2015/NĐ-CP cũng thuộc nhóm này — đã được sửa đổi bởi Nghị định 20/2022/NĐ-CP rồi thay thế, nhưng vẫn xuất hiện trên nhiều trang web.",
        ],
    },
    {
        slug: "chuoi-van-ban-thay-the",
        title: "Các văn bản đã thay thế nhau theo thứ tự nào?",
        label: "Chuỗi văn bản thay thế",
        category: "Phân tích",
        status: "info",
        publishedAt: "2026-08-29T09:15:00+07:00",
        updatedAt: "2026-08-29T09:15:00+07:00",
        author: AUTHOR,
        image: "/bai-cn-chuoi-van-ban-thay-the.jpg",
        summary: "Toàn bộ chuỗi từ Nghị định 119/2015 đến Nghị định 220/2026, để đối chiếu nhanh xem báo giá đang dẫn văn bản đời nào.",
        body: [
            "Thứ tự đầy đủ: Nghị định 119/2015/NĐ-CP là văn bản gốc, được sửa đổi bởi Nghị định 20/2022/NĐ-CP.",
            "Song song ở cấp thông tư: Thông tư 329/2016/TT-BTC hướng dẫn thi hành, bị thay bởi Thông tư 50/2022/TT-BTC từ 01/10/2022.",
            "Sau đó toàn bộ nội dung được đưa lên cấp nghị định: Nghị định 67/2023/NĐ-CP gom ba nhóm bảo hiểm bắt buộc gồm trách nhiệm dân sự chủ xe cơ giới, cháy nổ, và đầu tư xây dựng.",
            "Cuối cùng, Nghị định 220/2026/NĐ-CP thay thế Nghị định 67/2023 từ 01/7/2026. Đây là văn bản duy nhất còn hiệu lực để xác định mức trách nhiệm tối thiểu hiện nay.",
            "Cách dùng chuỗi này: nhìn căn cứ ghi trên báo giá, đối chiếu xem nó đứng ở đâu trong chuỗi. Bất cứ văn bản nào không phải Nghị định 220/2026 đều là đời cũ.",
        ],
    },
    {
        slug: "hop-dong-ky-truoc-01-7-2026",
        title: "Hợp đồng ký trước 1/7/2026 có bị ảnh hưởng không?",
        label: "Hợp đồng ký trước 01/7/2026",
        category: "Hướng dẫn",
        status: "info",
        publishedAt: "2026-08-29T09:20:00+07:00",
        updatedAt: "2026-08-29T09:20:00+07:00",
        author: AUTHOR,
        image: "/bai-cn-hop-dong-ky-truoc-01-7-2026.jpg",
        summary: "Không. Hợp đồng đã phát hành vẫn có hiệu lực đến hết thời hạn ghi trên giấy chứng nhận; việc đổi căn cứ pháp lý không làm mất hiệu lực hợp đồng đang chạy.",
        body: [
            "Không. Hợp đồng bảo hiểm phát hành trước 01/7/2026 vẫn có hiệu lực đến hết thời hạn ghi trên giấy chứng nhận. Việc thay đổi căn cứ pháp lý không làm mất hiệu lực hợp đồng đang chạy, và quyền lợi bồi thường giữ nguyên theo hợp đồng đã ký.",
            "Việc cần làm là ở lần tái tục: hợp đồng tái tục sau 01/7/2026 phải phát hành theo Nghị định 220/2026/NĐ-CP, và mức trách nhiệm cần được đối chiếu lại theo văn bản mới.",
            "Với gói thầu đang thi công, nếu chủ đầu tư yêu cầu bổ sung giấy chứng nhận theo căn cứ mới, có thể làm phụ lục thay vì mua lại từ đầu. Gửi hợp đồng hiện có qua Zalo để nhân viên xem cách xử lý gọn nhất.",
        ],
    },
];
export function getUpdate(slug) {
    return legalUpdates.find((item) => item.slug === slug);
}
/** Mục có nội dung bài thì mở trang chi tiết; không thì trỏ thẳng ra nguồn. */
export function updateHref(update) {
    if (update.body.length > 0)
        return `${UPDATES_PATH}/${update.slug}`;
    return update.sourceHref ?? UPDATES_PATH;
}
export function isExternal(update) {
    return update.body.length === 0 && Boolean(update.sourceHref);
}
/** Mốc cập nhật gần nhất của cả hub. */
export function latestUpdatedAt() {
    return legalUpdates.map((item) => item.updatedAt).sort().at(-1) ?? legalUpdates[0].updatedAt;
}
export function formatUpdateStamp(iso) {
    const date = new Date(iso);
    const pad = (value) => String(value).padStart(2, "0");
    // Cố định về giờ Việt Nam để máy chủ và trình duyệt cho ra cùng một chuỗi.
    const vn = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    return `${pad(vn.getUTCDate())}/${pad(vn.getUTCMonth() + 1)}/${vn.getUTCFullYear()} · ${pad(vn.getUTCHours())}:${pad(vn.getUTCMinutes())}`;
}
export function formatUpdateDate(iso) {
    return formatUpdateStamp(iso).split(" · ")[0];
}
