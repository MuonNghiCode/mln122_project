import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LessonsPage() {
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  const lessons = [
    {
      number: "01",
      title: "Cạnh tranh công bằng là gì?",
      subtitle: "Nền tảng của thị trường hiệu quả",
      content: [
        "Cạnh tranh công bằng là môi trường mà các doanh nghiệp cạnh tranh dựa trên chất lượng sản phẩm, đổi mới và hiệu quả, không phải thông qua hành vi phi công bằng như độc quyền, lạm dụng vị thế thống trị hay thỏa thuận hạn chế cạnh tranh.",
        "Thị trường cạnh tranh công bằng mang lại lợi ích cho người tiêu dùng thông qua giá cả hợp lý, chất lượng tốt hơn và sự lựa chọn đa dạng. Nó cũng khuyến khích doanh nghiệp đổi mới và cải tiến liên tục.",
        "Khi thị trường thiếu cạnh tranh công bằng, người tiêu dùng phải chịu giá cao hơn, chất lượng thấp hơn và ít lựa chọn hơn. Nghiên cứu của EU cho thấy độc quyền có thể làm tăng giá 15-40%.",
      ],
      stats: [
        { label: "Tăng giá do độc quyền", value: "15-40%" },
        { label: "Giảm đổi mới", value: "50%" },
        { label: "Thiệt hại người tiêu dùng", value: "Tỷ USD" },
      ],
    },
    {
      number: "02",
      title: "Vai trò của doanh nghiệp nhỏ",
      subtitle: "Xương sống của nền kinh tế",
      content: [
        "Doanh nghiệp nhỏ và vừa (SME) chiếm 70% tổng số việc làm toàn cầu và đóng góp khoảng 50% GDP. Họ là nguồn đổi mới quan trọng, thường linh hoạt hơn và gần gũi với khách hàng hơn các tập đoàn lớn.",
        "Thách thức lớn nhất của SME là cạnh tranh với các nền tảng công nghệ có vị thế thống trị. Họ cần môi trường cạnh tranh công bằng để có cơ hội phát triển và đổi mới.",
        "Các chính sách hỗ trợ SME như tiếp cận vốn, công nghệ và thị trường là cần thiết để duy trì sự đa dạng và cạnh tranh lành mạnh trong nền kinh tế.",
      ],
      stats: [
        { label: "Tỷ lệ việc làm", value: "70%" },
        { label: "Đóng góp GDP", value: "50%" },
        { label: "Tốc độ đổi mới", value: "Cao x2" },
      ],
    },
    {
      number: "03",
      title: "Sức mạnh nền tảng số",
      subtitle: "Trách nhiệm và kiểm soát dữ liệu",
      content: [
        "Các nền tảng công nghệ lớn như Google, Facebook, Amazon kiểm soát hơn 80% dữ liệu người dùng và thống trị nhiều thị trường. Sức mạnh này mang lại hiệu quả kinh tế nhưng cũng đặt ra thách thức về cạnh tranh công bằng.",
        "Nền tảng có hiệu ứng mạng (network effects) - càng nhiều người dùng, nền tảng càng có giá trị, tạo ra rào cản gia nhập cao. Điều này có thể dẫn đến độc quyền tự nhiên và lạm dụng vị thế.",
        "Trách nhiệm của nền tảng không chỉ là tạo ra lợi nhuận mà còn bảo vệ quyền riêng tư, minh bạch thuật toán, và không phân biệt đối xử với đối thủ cạnh tranh sử dụng nền tảng của họ.",
      ],
      stats: [
        { label: "Kiểm soát dữ liệu", value: "80%" },
        { label: "Thị phần quảng cáo", value: "60%" },
        { label: "Rào cản gia nhập", value: "Rất cao" },
      ],
    },
    {
      number: "04",
      title: "Vai trò cơ quan quản lý",
      subtitle: "Cân bằng giữa tự do và kiểm soát",
      content: [
        "Cơ quan quản lý cạnh tranh đóng vai trò quan trọng trong việc duy trì môi trường cạnh tranh lành mạnh. Họ điều tra và xử lý các hành vi vi phạm như thỏa thuận hạn chế cạnh tranh, lạm dụng vị thế thống trị.",
        "Thách thức lớn là tìm điểm cân bằng: quy định quá lỏng tạo ra độc quyền và thiệt hại cho người tiêu dùng, nhưng quy định quá chặt kìm hãm đổi mới và đầu tư.",
        "Nghiên cứu cho thấy các thị trường có quy định hợp lý phát triển nhanh hơn 40% so với thị trường thiếu giám sát hoặc quá kiểm soát. Quy định tốt khuyến khích cạnh tranh chứ không thay thế cạnh tranh.",
      ],
      stats: [
        { label: "Tăng trưởng thị trường", value: "+40%" },
        { label: "Hiệu quả quy định", value: "Cao" },
        { label: "Bảo vệ người dùng", value: "100%" },
      ],
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
      <div className="relative z-10 min-h-screen px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <button
              onClick={() => navigate("/home")}
              className="mb-8 px-4 py-2 text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-white transition-all duration-300"
            >
              ← Quay lại trang chủ
            </button>

            <h1 className="text-6xl font-black text-white mb-4">Bài học</h1>
            <p className="text-2xl text-gray-400 font-light">
              Kiến thức chuyên sâu về cạnh tranh công bằng và thị trường
            </p>
          </motion.div>

          {/* Lessons Grid */}
          <div className="space-y-8">
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
                          {/* Text Content */}
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
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <p className="text-xl text-gray-400 mb-8">
              Đã sẵn sàng áp dụng kiến thức?
            </p>
            <button
              onClick={() => navigate("/rules")}
              className="px-12 py-4 bg-linear-to-r from-orange-600 via-amber-500 to-orange-600 text-white text-lg font-bold hover:scale-105 transition-all duration-300"
            >
              Chơi Minigame ngay
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
