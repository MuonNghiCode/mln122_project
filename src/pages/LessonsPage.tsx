import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FloatingChatbot from "../components/FloatingChatbot";

export default function LessonsPage() {
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  interface Lesson {
    number: string;
    title: string;
    subtitle: string;
    content: string[];
    stats: { label: string; value: string }[];
    isComparison?: boolean;
    comparisonData?: {
      intro?: string;
      negative: string[];
      positive: string[];
      conclusion?: string;
    };
    isSectioned?: boolean;
    sections?: {
      title: string;
      color: string;
      items: string[];
    }[];
    isMultiComparison?: boolean;
    comparisonRows?: {
      title: string;
      traditional: string;
      digital: string;
    }[];
  }

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      blue: { bg: "bg-blue-950/20", border: "border-blue-800/30", text: "text-blue-400" },
      purple: { bg: "bg-purple-950/20", border: "border-purple-800/30", text: "text-purple-400" },
      orange: { bg: "bg-orange-950/20", border: "border-orange-800/30", text: "text-orange-400" },
      green: { bg: "bg-green-950/20", border: "border-green-800/30", text: "text-green-400" },
      cyan: { bg: "bg-cyan-950/20", border: "border-cyan-800/30", text: "text-cyan-400" },
      pink: { bg: "bg-pink-950/20", border: "border-pink-800/30", text: "text-pink-400" },
      indigo: { bg: "bg-indigo-950/20", border: "border-indigo-800/30", text: "text-indigo-400" },
      violet: { bg: "bg-violet-950/20", border: "border-violet-800/30", text: "text-violet-400" },
      emerald: { bg: "bg-emerald-950/20", border: "border-emerald-800/30", text: "text-emerald-400" },
      teal: { bg: "bg-teal-950/20", border: "border-teal-800/30", text: "text-teal-400" },
      sky: { bg: "bg-sky-950/20", border: "border-sky-800/30", text: "text-sky-400" },
      lime: { bg: "bg-lime-950/20", border: "border-lime-800/30", text: "text-lime-400" },
      red: { bg: "bg-red-950/20", border: "border-red-800/30", text: "text-red-400" },
      rose: { bg: "bg-rose-950/20", border: "border-rose-800/30", text: "text-rose-400" },
      amber: { bg: "bg-amber-950/20", border: "border-amber-800/30", text: "text-amber-400" },
      yellow: { bg: "bg-yellow-950/20", border: "border-yellow-800/30", text: "text-yellow-400" },
      slate: { bg: "bg-slate-950/20", border: "border-slate-800/30", text: "text-slate-400" },
    };
    return colors[color] || colors.blue;
  };

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // 1.2s loading

    return () => clearTimeout(timer);
  }, []);

  const lessons: Lesson[] = [
    {
      number: "01",
      title: "Cạnh tranh & Độc quyền",
      subtitle: "Hai mặt của kinh tế thị trường",
      content: [
        "🔸 CẠNH TRANH:",
        "Là quá trình ganh đua giữa các chủ thể kinh tế (cá nhân, doanh nghiệp, tổ chức) để giành điều kiện sản xuất, tiêu thụ và lợi nhuận tốt nhất.",
        "",
        "Đây là động lực phát triển của kinh tế thị trường, thúc đẩy các doanh nghiệp nâng cao năng suất, cải tiến kỹ thuật và giảm giá thành sản phẩm.",
        "",
        "🔸 ĐỘC QUYỀN:",
        "Là trạng thái khi một hoặc một nhóm doanh nghiệp chiếm ưu thế tuyệt đối trên thị trường, có khả năng chi phối giá cả, sản lượng và hành vi tiêu dùng.",
        "",
        "Độc quyền có thể hình thành do:",
        "• Tự nhiên: nguồn tài nguyên độc quyền hoặc công nghệ tiên tiến",
        "• Do nhà nước cấp phép",
        "• Do sáp nhập và thâu tóm doanh nghiệp",
        "",
        "🔸 MỐI QUAN HỆ BIỆN CHỨNG:",
        "Cạnh tranh thúc đẩy phát triển → Hình thành doanh nghiệp lớn → Tạo ra độc quyền → Công nghệ mới phá vỡ độc quyền → Chu kỳ cạnh tranh mới.",
        "",
        "Đây là quy luật vận động không ngừng của kinh tế thị trường.",
      ],
      stats: [
        { label: "Động lực", value: "Cạnh tranh" },
        { label: "Hình thành độc quyền", value: "Sáp nhập" },
        { label: "Phá vỡ độc quyền", value: "Công nghệ mới" },
      ],
    },
    {
      number: "02",
      title: "Tác động của Độc quyền",
      subtitle: "Hai mặt của đồng xu",
      content: [],
      isComparison: true,
      comparisonData: {
        intro: "Độc quyền có cả tác động tích cực và tiêu cực đến nền kinh tế thị trường. Việc hiểu rõ hai mặt này giúp nhà nước điều chỉnh chính sách phù hợp.",
        negative: [
          "Cạnh tranh không hoàn hảo gây thiệt hại người tiêu dùng và xã hội",
          "Kìm hãm sự phát triển tiến bộ kỹ thuật và kinh tế - xã hội",
          "Tăng sự phân hóa giàu - nghèo khi bị chi phối",
        ],
        positive: [
          "Tạo khả năng nghiên cứu, triển khai khoa học công nghệ, thúc đẩy tiến bộ",
          "Tăng năng suất lao động, nâng cao năng lực cạnh tranh của tổ chức độc quyền",
          "Phát triển kinh tế theo hướng sản xuất lớn",
        ],
        conclusion: "Độc quyền không hoàn toàn xấu hay tốt. Cần có sự quản lý và điều tiết của nhà nước để tận dụng lợi ích, hạn chế tác hại.",
      },
      stats: [
        { label: "Tác động tiêu cực", value: "Thiệt hại cao" },
        { label: "Tác động tích cực", value: "R&D mạnh" },
        { label: "Giải pháp", value: "Quản lý chặt" },
      ],
    },
    {
      number: "03",
      title: "Cạnh tranh Truyền thống",
      subtitle: "Nền kinh tế vật lý - trước kỷ nguyên số",
      content: [],
      isSectioned: true,
      sections: [
        {
          title: "📍 Đặc điểm nổi bật",
          color: "blue",
          items: [
            "Diễn ra trực tiếp, vật lý trong các chợ, cửa hàng, khu công nghiệp",
            "Dựa vào nguồn lực hữu hình: vốn, đất đai, mặt bằng, lao động, nguyên liệu",
            "Giá cả và chất lượng sản phẩm là yếu tố cạnh tranh chủ yếu",
          ],
        },
        {
          title: "📍 Tốc độ và thông tin",
          color: "purple",
          items: [
            "Tốc độ cạnh tranh chậm",
            "Thông tin lan truyền qua báo chí, truyền miệng, quảng cáo truyền thống (TV, radio, billboard)",
            "Quan hệ người bán – người mua mang tính một chiều: người bán đưa ra sản phẩm, người mua lựa chọn",
            "Người mua không có nhiều cơ hội phản hồi",
          ],
        },
        {
          title: "📍 Rào cản gia nhập cao",
          color: "orange",
          items: [
            "Cần vốn đầu tư lớn cho mặt bằng kinh doanh",
            "Xây dựng cơ sở vật chất",
            "Tuyển dụng nhân sự",
            "Thiết lập quan hệ phân phối và logistics",
            "Điều này khiến doanh nghiệp nhỏ khó khăn khi muốn tham gia thị trường",
          ],
        },
        {
          title: "📍 Ví dụ thực tế",
          color: "green",
          items: [
            "Các hãng taxi truyền thống: cạnh tranh bằng số lượng xe, vị trí đón khách thuận lợi và giá cước",
            "Cửa hàng tạp hóa, siêu thị: cạnh tranh bằng vị trí địa lý, giá cả và chất lượng phục vụ",
          ],
        },
      ],
      stats: [
        { label: "Không gian", value: "Vật lý" },
        { label: "Tốc độ thay đổi", value: "Chậm" },
        { label: "Rào cản", value: "Cao" },
      ],
    },
    {
      number: "04",
      title: "Cạnh tranh Kinh tế Số",
      subtitle: "Grab • Shopee • TikTok Shop",
      content: [],
      isSectioned: true,
      sections: [
        {
          title: "💻 Không gian số hóa",
          color: "cyan",
          items: [
            "Mọi hoạt động sản xuất – kinh doanh – tiếp thị diễn ra trên nền tảng Internet",
            "Ứng dụng di động và mạng xã hội",
            "Không còn giới hạn bởi vị trí địa lý vật lý",
            "Khách hàng có thể mua sắm, đặt xe, giao hàng chỉ bằng vài cú chạm trên điện thoại",
          ],
        },
        {
          title: "💻 Dữ liệu là vũ khí",
          color: "pink",
          items: [
            "Các nền tảng như Shopee, TikTok, Grab thu thập lượng lớn dữ liệu người dùng",
            "Phân tích hành vi mua sắm, thời gian online, sở thích cá nhân",
            "Tối ưu trải nghiệm và cá nhân hóa sản phẩm",
            "Ai có dữ liệu tốt hơn = hiểu khách hàng hơn = thắng thế cạnh tranh",
          ],
        },
        {
          title: "💻 Công nghệ và thuật toán",
          color: "indigo",
          items: [
            "AI mạnh, Big Data phân tích tốt",
            "Thuật toán gợi ý chính xác = nhiều khách hàng hơn",
            "Tốc độ cạnh tranh cực nhanh",
            "Chương trình khuyến mãi, giá sản phẩm, đánh giá thay đổi theo giờ, thậm chí phút",
          ],
        },
        {
          title: "💻 Quan hệ đa chiều",
          color: "violet",
          items: [
            "Người dùng vừa là khách hàng",
            "Vừa là người bán (Shopee, TikTok Shop)",
            "Vừa là người tạo nội dung quảng bá (TikTok, Facebook)",
            "Vừa là người đánh giá và review",
            "Cạnh tranh hệ sinh thái: giành thời gian và dữ liệu người dùng",
          ],
        },
      ],
      stats: [
        { label: "Không gian", value: "Số hóa" },
        { label: "Vũ khí chính", value: "Dữ liệu + AI" },
        { label: "Tốc độ", value: "Real-time" },
      ],
    },
    {
      number: "05",
      title: "So sánh Truyền thống vs Số",
      subtitle: "7 khác biệt căn bản",
      content: [],
      isMultiComparison: true,
      comparisonRows: [
        {
          title: "1️⃣ Không gian cạnh tranh",
          traditional: "Cửa hàng, chợ, nhà máy, văn phòng thực tế. Cần có mặt bằng vật lý.",
          digital: "Nền tảng online, ứng dụng di động, không gian ảo. Không cần mặt bằng vật lý.",
        },
        {
          title: "2️⃣ Yếu tố cốt lõi",
          traditional: "Giá cả, chất lượng sản phẩm, vị trí địa lý (location, location, location!).",
          digital: "Dữ liệu người dùng, công nghệ AI/Big Data, trải nghiệm và thuật toán cá nhân hóa.",
        },
        {
          title: "3️⃣ Tốc độ cạnh tranh",
          traditional: "Theo chu kỳ sản xuất, thay đổi theo tháng/quý. Quyết định chậm.",
          digital: "Real-time, từng giờ, từng phút. Flash sale, giá động (dynamic pricing), phản ứng tức thì.",
        },
        {
          title: "4️⃣ Mối quan hệ khách hàng",
          traditional: "Một chiều (người bán → người mua). Khách hàng thụ động.",
          digital: "Hai chiều - tương tác, phản hồi, review, tạo nội dung (UGC), thậm chí trở thành người bán.",
        },
        {
          title: "5️⃣ Chi phí mở rộng",
          traditional: "Rất cao - cần thêm mặt bằng, nhân công, kho bãi, vận chuyển vật lý cho mỗi thị trường mới.",
          digital: "Thấp hơn 80% - chủ yếu là server, bandwidth và quảng cáo online. Scale up dễ dàng.",
        },
        {
          title: "6️⃣ Cách tiếp cận thị trường",
          traditional: "Giới hạn trong khu vực địa lý. Khó mở rộng quốc tế.",
          digital: "Toàn cầu hóa ngay từ đầu. Một app có thể phục vụ nhiều quốc gia, xuyên biên giới.",
        },
        {
          title: "7️⃣ Ví dụ tiêu biểu",
          traditional: "Taxi Mai Linh, Vinasun, siêu thị Co.opmart, cửa hàng bán lẻ.",
          digital: "Grab, Gojek, Shopee, Lazada, TikTok Shop, Facebook Marketplace.",
        },
      ],
      stats: [
        { label: "Chi phí mở rộng", value: "Giảm 80%" },
        { label: "Phạm vi", value: "Toàn cầu" },
        { label: "Tốc độ", value: "Nhanh x100" },
      ],
    },
    {
      number: "06",
      title: "Tác động Tích cực",
      subtitle: "Lợi ích của cạnh tranh số",
      content: [],
      isSectioned: true,
      sections: [
        {
          title: "✅ Thúc đẩy đổi mới",
          color: "emerald",
          items: [
            "Cạnh tranh số buộc doanh nghiệp phải đổi mới liên tục về công nghệ, sản phẩm, dịch vụ",
            "Tăng năng suất lao động đáng kể",
            "Giảm chi phí vận hành nhờ tự động hóa và AI",
          ],
        },
        {
          title: "✅ Cơ hội cho doanh nghiệp nhỏ (SMEs)",
          color: "teal",
          items: [
            "Thương mại điện tử mở rộng cơ hội kinh doanh",
            "Không cần vốn lớn để thuê mặt bằng",
            "Có thể bán hàng trên Shopee, TikTok Shop với chi phí thấp",
            "Tiếp cận khách hàng toàn quốc, thậm chí quốc tế",
          ],
        },
        {
          title: "✅ Lợi ích người tiêu dùng",
          color: "sky",
          items: [
            "Dễ dàng so sánh giá giữa hàng trăm nhà bán chỉ trong vài phút",
            "Nhận ưu đãi, voucher, khuyến mãi liên tục",
            "Trải nghiệm cá nhân hóa - app hiểu bạn cần gì và gợi ý đúng sản phẩm",
            "Giao hàng nhanh, thanh toán tiện lợi",
          ],
        },
        {
          title: "✅ Toàn cầu hóa",
          color: "lime",
          items: [
            "Thúc đẩy kết nối cung – cầu vượt biên giới",
            "Người Việt Nam có thể mua hàng từ Trung Quốc, Hàn Quốc dễ dàng",
            "Doanh nghiệp Việt có thể bán hàng ra quốc tế qua các nền tảng như Shopee, Lazada khu vực",
          ],
        },
      ],
      stats: [
        { label: "Năng suất", value: "Tăng 150%" },
        { label: "Cơ hội SMEs", value: "Tăng 200%" },
        { label: "Giá người mua", value: "Giảm 15-40%" },
      ],
    },
    {
      number: "07",
      title: "Tác động Tiêu cực",
      subtitle: "Rủi ro và thách thức",
      content: [],
      isSectioned: true,
      sections: [
        {
          title: "⚠️ Độc quyền số",
          color: "red",
          items: [
            "Dễ hình thành độc quyền số - một vài 'ông lớn' như Grab, Shopee, TikTok, Meta",
            "Nắm toàn bộ dữ liệu người dùng và thống trị thị trường",
            "Hiệu ứng mạng (network effect) khiến người dùng khó chuyển sang nền tảng khác",
            "Hiện tượng 'winner takes all'",
          ],
        },
        {
          title: "⚠️ Cạnh tranh không lành mạnh",
          color: "rose",
          items: [
            "Thao túng thuật toán để ưu tiên sản phẩm của mình, đẩy đối thủ xuống",
            "'Đốt tiền' khuyến mãi phi lý để chiếm thị phần",
            "Sau đó tăng giá khi đã độc quyền",
            "Chèn ép đối thủ nhỏ bằng các chính sách không công bằng trên nền tảng",
          ],
        },
        {
          title: "⚠️ Doanh nghiệp nhỏ gặp khó",
          color: "amber",
          items: [
            "Thiếu dữ liệu và nguồn lực công nghệ để cạnh tranh với 'ông lớn'",
            "Không đủ tiền để chạy quảng cáo trên nền tảng",
            "Bị phụ thuộc vào nền tảng",
            "Nền tảng thay đổi chính sách → doanh nghiệp nhỏ có thể phá sản",
          ],
        },
        {
          title: "⚠️ An toàn dữ liệu",
          color: "yellow",
          items: [
            "Nguy cơ mất an toàn thông tin",
            "Rò rỉ dữ liệu cá nhân của hàng triệu người dùng",
            "Gian lận thương mại, hàng giả, hàng nhái tràn lan",
            "Khó kiểm soát chất lượng khi có hàng triệu người bán trên nền tảng",
          ],
        },
      ],
      stats: [
        { label: "Độc quyền", value: "60-80%" },
        { label: "Rủi ro dữ liệu", value: "Rất cao" },
        { label: "SMEs phụ thuộc", value: "85%" },
      ],
    },
    {
      number: "08",
      title: "Kết luận & Bài học",
      subtitle: "Hành động cho tương lai",
      content: [],
      isSectioned: true,
      sections: [
        {
          title: "🎯 Kết luận",
          color: "slate",
          items: [
            "Cạnh tranh trong nền kinh tế số là hình thái phát triển mới của cạnh tranh tư bản chủ nghĩa – mạnh mẽ hơn, nhanh hơn, hiệu quả hơn, nhưng cũng rủi ro và phức tạp hơn nhiều.",
            "Đây là xu hướng tất yếu và không thể đảo ngược.",
          ],
        },
        {
          title: "💼 Doanh nghiệp muốn tồn tại phải",
          color: "blue",
          items: [
            "Chuyển đổi số ngay lập tức - tận dụng công nghệ và dữ liệu để không bị bỏ lại phía sau",
            "Xây dựng thương hiệu mạnh và trải nghiệm người dùng xuất sắc làm lợi thế cạnh tranh dài hạn",
            "Đầu tư vào AI, Big Data và phân tích dữ liệu khách hàng",
          ],
        },
        {
          title: "🏛️ Nhà nước cần",
          color: "indigo",
          items: [
            "Ban hành chính sách quản lý cạnh tranh và chống độc quyền số một cách nghiêm túc",
            "Không để hình thành 'ông lớn' quá mạnh",
            "Bảo vệ dữ liệu cá nhân và quyền lợi người tiêu dùng",
            "Ban hành luật pháp cụ thể và minh bạch",
          ],
        },
        {
          title: "🤝 Hỗ trợ doanh nghiệp vừa và nhỏ",
          color: "violet",
          items: [
            "Hỗ trợ SMEs chuyển đổi số thông qua đào tạo",
            "Cung cấp tài chính ưu đãi",
            "Giúp tiếp cận nền tảng công nghệ",
            "Tạo môi trường cạnh tranh công bằng hơn giữa doanh nghiệp lớn và nhỏ trong kỷ nguyên số",
          ],
        },
      ],
      stats: [
        { label: "Doanh nghiệp", value: "Chuyển đổi số" },
        { label: "Nhà nước", value: "Quản lý chặt" },
        { label: "SMEs", value: "Hỗ trợ mạnh" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Floating Chatbot */}
      <FloatingChatbot />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br from-purple-950/50 via-black to-orange-950/40" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #ff6b00 0%, #8b00ff 50%, transparent 70%)",
          }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #8b00ff 0%, #ff6b00 50%, transparent 70%)",
          }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          {isLoading ? (
            /* Loading Skeleton Header */
            <div className="mb-16 animate-pulse">
              <div className="mb-8 flex gap-3">
                <div className="h-10 w-40 bg-gray-800 rounded" />
                <div className="h-10 w-32 bg-gray-800 rounded" />
              </div>
              <div className="h-16 w-3/4 bg-gray-800 rounded mb-4" />
              <div className="h-8 w-1/2 bg-gray-800 rounded" />
            </div>
          ) : (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
              <div className="mb-8 flex gap-3">
            <button
              onClick={() => navigate("/home")}
                  className="px-4 py-2 text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-white transition-all duration-300"
            >
              ← Quay lại trang chủ
            </button>
              </div>

              <h1 className="text-6xl font-black text-white mb-4">
                🎓 Chương 4: Cạnh tranh & Độc quyền
              </h1>
            <p className="text-2xl text-gray-400 font-light">
                Từ kinh tế truyền thống đến kỷ nguyên nền tảng số
            </p>
          </motion.div>
          )}

          {/* Lessons Grid */}
          <div className="space-y-8">
            {isLoading ? (
              /* Loading Skeleton Lessons */
              <>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="relative p-8 backdrop-blur-xl bg-white/2 border border-white/10">
                      <div className="flex items-start gap-8">
                        <div className="w-20 h-20 bg-gray-800 rounded" />
                        <div className="flex-1 space-y-3">
                          <div className="h-8 bg-gray-800 rounded w-2/3" />
                          <div className="h-6 bg-gray-800 rounded w-1/2" />
                          <div className="h-4 bg-gray-800 rounded w-1/4" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              /* Actual Lessons */
              <>
            {lessons.map((lesson, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative"
              >
                <div
                  onClick={() =>
                    setSelectedLesson(selectedLesson === index ? null : index)
                  }
                  className="relative p-8 backdrop-blur-xl bg-white/2 border border-white/10 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                >
                  <div className="absolute -top-3 -left-3 w-20 h-20 border-l-2 border-t-2 border-white/20" />
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-white/20" />

                  <div className="flex items-start gap-8">
                    {/* Number */}
                    <div className="text-7xl font-black text-white/10 leading-none">
                      {lesson.number}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {lesson.title}
                      </h2>
                      <p className="text-lg text-gray-400 mb-4">
                        {lesson.subtitle}
                      </p>

                      {/* Expanded Content */}
                      {selectedLesson === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 space-y-6"
                        >
                          {/* Different Content Types */}
                          {lesson.isSectioned && lesson.sections ? (
                            /* Sectioned Content with Color Boxes */
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {lesson.sections.map((section, sIdx) => {
                                const colorClasses = getColorClasses(section.color);
                                return (
                                  <div key={sIdx} className={`${colorClasses.bg} border ${colorClasses.border} p-5 rounded-lg`}>
                                    <h3 className={`text-xl font-bold ${colorClasses.text} mb-3`}>
                                      {section.title}
                                    </h3>
                                    <ul className="space-y-2">
                                      {section.items.map((item, iIdx) => (
                                        <li key={iIdx} className="text-gray-300 leading-relaxed flex items-start gap-2 text-base">
                                          <span className={`${colorClasses.text} mt-1 flex-shrink-0`}>•</span>
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>
                          ) : lesson.isMultiComparison && lesson.comparisonRows ? (
                            /* Multi-row Comparison Table */
                            <div className="space-y-4">
                              {lesson.comparisonRows.map((row, rIdx) => (
                                <div key={rIdx}>
                                  <h3 className="text-lg font-bold text-white mb-2">{row.title}</h3>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-900/40 border border-slate-700/50 p-4 rounded">
                                      <div className="text-sm font-semibold text-slate-400 mb-2">🏪 Truyền thống</div>
                                      <p className="text-gray-300 text-sm leading-relaxed">{row.traditional}</p>
                                    </div>
                                    <div className="bg-cyan-900/40 border border-cyan-700/50 p-4 rounded">
                                      <div className="text-sm font-semibold text-cyan-400 mb-2">💻 Kinh tế số</div>
                                      <p className="text-gray-300 text-sm leading-relaxed">{row.digital}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : lesson.isComparison && lesson.comparisonData ? (
                            <div className="space-y-6">
                              {/* Intro */}
                              {lesson.comparisonData.intro && (
                                <p className="text-gray-300 leading-relaxed text-lg">
                                  {lesson.comparisonData.intro}
                                </p>
                              )}

                              {/* Comparison Table */}
                              <div className="grid grid-cols-2 gap-6">
                                {/* Negative Column */}
                                <div className="bg-red-950/20 border-2 border-red-800/30 p-6 rounded-lg">
                                  <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                                    <span>❌</span>
                                    <span>Tác động Tiêu cực</span>
                                  </h3>
                                  <ul className="space-y-3">
                                    {lesson.comparisonData.negative.map((item, i) => (
                                      <li key={i} className="text-gray-300 leading-relaxed flex items-start gap-2">
                                        <span className="text-red-400 mt-1">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Positive Column */}
                                <div className="bg-green-950/20 border-2 border-green-800/30 p-6 rounded-lg">
                                  <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
                                    <span>✅</span>
                                    <span>Tác động Tích cực</span>
                                  </h3>
                                  <ul className="space-y-3">
                                    {lesson.comparisonData.positive.map((item, i) => (
                                      <li key={i} className="text-gray-300 leading-relaxed flex items-start gap-2">
                                        <span className="text-green-400 mt-1">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {/* Conclusion */}
                              {lesson.comparisonData.conclusion && (
                                <div className="bg-amber-950/20 border border-amber-800/30 p-4 rounded-lg">
                                  <p className="text-amber-200 leading-relaxed text-lg flex items-start gap-2">
                                    <span className="text-amber-400">⚖️</span>
                                    <span>{lesson.comparisonData.conclusion}</span>
                                  </p>
                                </div>
                              )}
                            </div>
                          ) : (
                            /* Regular Text Content */
                          <div className="space-y-4">
                            {lesson.content.map((paragraph, pIndex) => (
                              <p
                                key={pIndex}
                                className="text-gray-300 leading-relaxed text-lg"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                          )}

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                            {lesson.stats.map((stat, sIndex) => (
                              <div
                                key={sIndex}
                                className="p-4 bg-white/5 border border-white/10"
                              >
                                <div className="text-3xl font-black bg-linear-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent mb-2">
                                  {stat.value}
                                </div>
                                <div className="text-sm text-gray-400">
                                  {stat.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Expand/Collapse Indicator */}
                      <div className="flex items-center gap-2 mt-4 text-gray-500 text-sm">
                        <span>
                          {selectedLesson === index
                            ? "Thu gọn"
                            : "Xem chi tiết"}
                        </span>
                        <motion.span
                          animate={{
                            rotate: selectedLesson === index ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          ↓
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            </>
            )}
          </div>

          {/* CTA */}
          {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="mb-8">
              <p className="text-2xl text-white font-bold mb-2">
                🎮 Đã hiểu rõ về cạnh tranh và độc quyền?
              </p>
              <p className="text-lg text-gray-400 mb-4">
                Hãy thử thách bản thân trong vai trò quản lý doanh nghiệp số!
              </p>
              <p className="text-sm text-gray-500">
                💡 Còn thắc mắc? Hãy hỏi AI để được giải đáp chi tiết hơn!
              </p>
            </div>
            <button
              onClick={() => navigate("/rules")}
              className="px-12 py-4 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 text-white text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/50"
            >
              Bắt đầu Minigame →
            </button>
          </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
