import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function AcademicIntegrityPage() {
  const navigate = useNavigate();

  const usages = [
    {
      title: "Hỗ trợ nghiên cứu và phân tích",
      description:
        "Chúng tôi đã sử dụng công cụ AI để hỗ trợ quá trình nghiên cứu, phân tích dữ liệu, và tìm kiếm thông tin liên quan đến chủ đề học thuật. AI giúp tăng tốc độ thu thập và xử lý thông tin, nhưng không thay thế quá trình tư duy phản biện của chúng tôi.",
      practices: [
        "Chúng tôi đã tìm kiếm và tổng hợp các nghiên cứu học thuật về chủ đề cạnh tranh thị trường",
        "Chúng tôi đã phân tích dữ liệu thống kê và đưa ra các nhận định ban đầu",
        "Chúng tôi đã sử dụng AI để hỗ trợ dịch thuật và hiểu các tài liệu học thuật bằng ngôn ngữ khác",
      ],
    },
    {
      title: "Cải thiện chất lượng viết",
      description:
        "Chúng tôi đã sử dụng AI để cải thiện cấu trúc câu, ngữ pháp, và phong cách viết học thuật. Công cụ này hỗ trợ trình bày ý tưởng một cách rõ ràng và chuyên nghiệp hơn, nhưng nội dung và ý tưởng vẫn xuất phát từ chúng tôi.",
      practices: [
        "Chúng tôi đã sử dụng AI để kiểm tra và sửa lỗi ngữ pháp, chính tả trong bài viết",
        "Chúng tôi đã nhận đề xuất cải thiện cấu trúc câu và đoạn văn để rõ ràng hơn",
        "Chúng tôi đã sử dụng AI để hỗ trợ định dạng và trình bày tài liệu theo chuẩn học thuật",
      ],
    },
    {
      title: "Học tập và hiểu biết",
      description:
        "Chúng tôi đã sử dụng AI như một công cụ học tập để giải thích các khái niệm phức tạp, trả lời câu hỏi, và cung cấp các ví dụ minh họa. Điều này giúp chúng tôi hiểu sâu hơn về nội dung, nhưng không thay thế việc tự học và nghiên cứu độc lập.",
      practices: [
        "Chúng tôi đã yêu cầu giải thích các khái niệm kinh tế học phức tạp bằng ngôn ngữ đơn giản",
        "Chúng tôi đã đặt câu hỏi về các tình huống thực tế và nhận phản hồi phân tích",
        "Chúng tôi đã yêu cầu ví dụ minh họa cho các lý thuyết học thuật",
      ],
    },
    {
      title: "Tổ chức và quản lý thông tin",
      description:
        "Chúng tôi đã sử dụng AI để tổ chức, phân loại và quản lý thông tin học thuật một cách hiệu quả. Công cụ này giúp tạo cấu trúc cho bài viết, lập dàn ý, và quản lý tài liệu tham khảo.",
      practices: [
        "Chúng tôi đã tạo dàn ý cho bài nghiên cứu dựa trên các chủ đề đã chọn",
        "Chúng tôi đã tổ chức và phân loại các nguồn tài liệu tham khảo",
        "Chúng tôi đã tạo timeline và kế hoạch cho dự án nghiên cứu",
      ],
    },
  ];

  const commitments = [
    {
      title: "Tính minh bạch",
      description:
        "Chúng tôi cam kết công khai và minh bạch về việc sử dụng các công cụ hỗ trợ trong quá trình học tập và nghiên cứu. Mọi sự hỗ trợ từ công nghệ đều được ghi nhận và thông báo một cách rõ ràng.",
    },
    {
      title: "Tính trung thực",
      description:
        "Chúng tôi cam kết sử dụng AI một cách trung thực, không sao chép trực tiếp nội dung từ AI mà không có sự xử lý, phân tích và đóng góp cá nhân. Mọi nội dung đều phải thể hiện sự hiểu biết và tư duy của người học.",
    },
    {
      title: "Tính tham khảo",
      description:
        "Chúng tôi xác định rõ rằng AI là công cụ hỗ trợ tham khảo, không phải nguồn thông tin tuyệt đối. Mọi thông tin từ AI đều được kiểm chứng, đối chiếu với các nguồn học thuật chính thống và được xử lý qua lăng kính phản biện.",
    },
    {
      title: "Tính học hỏi",
      description:
        "Chúng tôi cam kết sử dụng AI như một phương tiện để học hỏi và phát triển kỹ năng, không phải để thay thế quá trình học tập. Mục tiêu là nâng cao năng lực tư duy, phân tích và sáng tạo thông qua việc tương tác có ý thức với công nghệ.",
    },
    {
      title: "Tính trách nhiệm",
      description:
        "Chúng tôi chịu trách nhiệm hoàn toàn về nội dung và chất lượng công việc của mình, bất kể có sử dụng công cụ hỗ trợ nào. Việc sử dụng AI không làm giảm trách nhiệm học thuật và đạo đức của người học.",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
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
      <div className="relative z-10 min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-12 sm:mb-16 p-6 sm:p-8 md:p-12 backdrop-blur-xl bg-white/2 border border-white/10"
          >
            {/* Decorative corners */}
            <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-20 h-20 sm:w-32 sm:h-32 border-l-2 border-t-2 border-blue-500/30" />
            <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-20 h-20 sm:w-32 sm:h-32 border-r-2 border-b-2 border-blue-500/30" />

            <div className="relative">
              <button
                onClick={() => navigate(-1)}
                className="mb-4 sm:mb-6 text-gray-400 hover:text-white transition-colors text-xs sm:text-sm uppercase tracking-wider"
              >
                ← Quay lại
              </button>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Cam kết liêm chính học thuật
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light mb-6 sm:mb-8 leading-relaxed">
                Tuyên bố về việc sử dụng công nghệ hỗ trợ trong học tập và
                nghiên cứu một cách có trách nhiệm và minh bạch
              </p>
            </div>
          </motion.div>

          {/* Introduction Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 sm:mb-16 p-6 sm:p-8 md:p-10 backdrop-blur-xl bg-white/2 border border-white/10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Cam kết của nhóm chúng tôi
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-base sm:text-lg">
                Trong quá trình phát triển dự án này, nhóm chúng tôi đã sử dụng
                các công cụ hỗ trợ bằng trí tuệ nhân tạo (AI) như một phần của
                quá trình học tập và nghiên cứu. Chúng tôi nhận thức rõ tầm quan
                trọng của việc sử dụng các công cụ này một cách có trách nhiệm và
                đạo đức để duy trì tính liêm chính học thuật.
              </p>
              <p className="text-base sm:text-lg">
                Đối với chúng tôi, liêm chính học thuật không chỉ là việc tránh
                đạo văn hay gian lận, mà còn là việc đảm bảo rằng mọi công việc
                học thuật đều phản ánh đúng năng lực, sự hiểu biết và đóng góp
                thực sự của nhóm. Chúng tôi hiểu rõ ranh giới giữa việc hỗ trợ
                học tập và việc thay thế quá trình tư duy độc lập.
              </p>
              <p className="text-base sm:text-lg">
                Trang này là tuyên bố cam kết của nhóm chúng tôi về việc sử dụng
                AI trong học tập một cách trong sạch, minh bạch và có trách
                nhiệm.
              </p>
            </div>
          </motion.div>

          {/* Prompts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">
              Cách chúng tôi sử dụng AI
            </h2>
            <p className="text-center text-gray-400 mb-8 sm:mb-12 text-base sm:text-lg max-w-3xl mx-auto">
              Dưới đây là cách nhóm chúng tôi đã sử dụng công cụ AI trong quá
              trình phát triển dự án này:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {usages.map((usage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-6 sm:p-8 backdrop-blur-xl bg-white/2 border border-white/10 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <span className="text-blue-400 font-bold text-lg">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white flex-1">
                      {usage.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">
                    {usage.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mb-2">
                      Chúng tôi đã:
                    </p>
                    {usage.practices.map((practice, exIndex) => (
                      <div
                        key={exIndex}
                        className="flex items-start gap-2 text-sm text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                        <span>{practice}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Commitments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">
              Cam kết của chúng tôi
            </h2>
            <p className="text-center text-gray-400 mb-8 sm:mb-12 text-base sm:text-lg max-w-3xl mx-auto">
              Chúng tôi cam kết tuân thủ các nguyên tắc sau đây trong việc sử
              dụng công nghệ hỗ trợ:
            </p>

            <div className="space-y-6 sm:space-y-8">
              {commitments.map((commitment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-6 sm:p-8 md:p-10 backdrop-blur-xl bg-white/2 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <span className="text-2xl sm:text-3xl">
                        {index === 0 && "🔍"}
                        {index === 1 && "✓"}
                        {index === 2 && "📚"}
                        {index === 3 && "🎓"}
                        {index === 4 && "⚖️"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                        {commitment.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
                        {commitment.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Best Practices Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mb-12 sm:mb-16 p-6 sm:p-8 md:p-10 backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8">
              Cam kết thực hành của chúng tôi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-400">
                  ✓ Chúng tôi đã làm
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>
                      Sử dụng AI để hỗ trợ nghiên cứu và tìm kiếm thông tin
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>
                      Kiểm chứng mọi thông tin từ AI với các nguồn đáng tin cậy
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>
                      Sử dụng AI để cải thiện cấu trúc và trình bày, không phải
                      nội dung
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>
                      Công khai việc sử dụng AI trong trang cam kết này
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>
                      Xem AI như một công cụ học tập, không phải giải pháp thay
                      thế
                    </span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-red-400">
                  ✗ Chúng tôi không làm
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>
                      Sao chép trực tiếp nội dung từ AI mà không xử lý hoặc phân
                      tích
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>
                      Sử dụng AI để tạo ra toàn bộ dự án mà không có đóng góp
                      của nhóm
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>
                      Che giấu việc sử dụng AI trong quá trình phát triển dự
                      án
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>
                      Tin tưởng hoàn toàn vào thông tin từ AI mà không kiểm
                      chứng
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>
                      Sử dụng AI để gian lận hoặc vi phạm quy định học thuật
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Conclusion Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mb-12 sm:mb-16 p-6 sm:p-8 md:p-10 backdrop-blur-xl bg-white/2 border border-white/10 text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Kết luận
            </h2>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg max-w-4xl mx-auto mb-6">
              Việc sử dụng công nghệ AI trong học tập và nghiên cứu là một xu
              hướng không thể tránh khỏi và mang lại nhiều lợi ích. Tuy nhiên,
              điều quan trọng là chúng ta phải sử dụng nó một cách có trách
              nhiệm, minh bạch và đạo đức.
            </p>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg max-w-4xl mx-auto mb-6">
              Mục tiêu cuối cùng của giáo dục không phải là tạo ra những sản
              phẩm hoàn hảo, mà là phát triển khả năng tư duy, phân tích và sáng
              tạo của người học. AI có thể là một công cụ mạnh mẽ để hỗ trợ quá
              trình này, nhưng nó không thể và không nên thay thế quá trình học
              tập thực sự.
            </p>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg max-w-4xl mx-auto">
              Chúng tôi cam kết tuân thủ các nguyên tắc được nêu trong trang
              này và khuyến khích tất cả người học cùng tham gia xây dựng một
              môi trường học thuật trong sạch, minh bạch và có trách nhiệm.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="text-center"
          >
            <button
              onClick={() => navigate("/home")}
              className="px-8 sm:px-12 py-3 sm:py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
            >
              Về trang chủ
            </button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

