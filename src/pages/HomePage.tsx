import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

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
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl w-full">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
              className="inline-block px-4 sm:px-6 py-2 bg-white/5 border border-white/10 mb-6 sm:mb-8"
            >
              <span className="text-gray-400 text-xs sm:text-sm tracking-widest uppercase">
                Khám phá cạnh tranh công bằng
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 sm:mb-6 leading-tight px-4">
              Phiên tòa
              <br />
              <span className="bg-linear-to-r from-orange-500 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Cạnh tranh
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-4 px-4">
              Trải nghiệm thực tế về cạnh tranh thị trường qua vai trò của doanh
              nghiệp nhỏ, nền tảng công nghệ, và cơ quan quản lý
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center gap-2 sm:gap-3 text-gray-500"
            >
              <div className="h-px w-8 sm:w-12 bg-gray-700" />
              <span className="text-xs sm:text-sm">
                Học qua chơi, chơi mà học
              </span>
              <div className="h-px w-8 sm:w-12 bg-gray-700" />
            </motion.div>
          </motion.div>

          {/* Two Main Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={() => navigate("/rules")}
              className="group relative cursor-pointer"
            >
              <div className="relative h-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] p-6 sm:p-8 md:p-10 backdrop-blur-xl bg-white/2 border border-white/10 hover:bg-white/5 transition-all duration-500">
                {/* Decorative corners */}
                <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-16 sm:w-24 h-16 sm:h-24 border-l-2 border-t-2 border-orange-500/30 group-hover:border-orange-500/60 transition-colors" />
                <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-16 sm:w-24 h-16 sm:h-24 border-r-2 border-b-2 border-orange-500/30 group-hover:border-orange-500/60 transition-colors" />

                <div className="flex flex-col h-full">
                  {/* Number */}
                  <div className="text-6xl sm:text-7xl md:text-9xl font-black text-white/5 mb-4 sm:mb-6 leading-none">
                    01
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black bg-linear-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent mb-4 sm:mb-6">
                    Minigame
                  </h2>

                  {/* Description */}
                  <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6 sm:mb-8 flex-1">
                    Tham gia trò chơi tương tác với 5 vòng ra quyết định. Chọn
                    vai trò của bạn và đối mặt với những tình huống thực tế
                    trong thị trường cạnh tranh.
                  </p>

                  {/* Features */}
                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 sm:mt-2 shrink-0" />
                      <span className="text-sm sm:text-base text-gray-400">
                        5 vòng chơi với tình huống thực tế
                      </span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 sm:mt-2 shrink-0" />
                      <span className="text-sm sm:text-base text-gray-400">
                        3 vai trò khác nhau để lựa chọn
                      </span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 sm:mt-2 shrink-0" />
                      <span className="text-sm sm:text-base text-gray-400">
                        Đo lường 6 chỉ số quan trọng
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 text-orange-400 text-base sm:text-lg font-bold"
                  >
                    <span>Bắt đầu chơi</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Option 2: Educational Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              onClick={() => navigate("/lessons")}
              className="group relative cursor-pointer"
            >
              <div className="relative h-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] p-6 sm:p-8 md:p-10 backdrop-blur-xl bg-white/2 border border-white/10 hover:bg-white/5 transition-all duration-500">
                {/* Decorative corners */}
                <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-16 sm:w-24 h-16 sm:h-24 border-l-2 border-t-2 border-purple-500/30 group-hover:border-purple-500/60 transition-colors" />
                <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-16 sm:w-24 h-16 sm:h-24 border-r-2 border-b-2 border-purple-500/30 group-hover:border-purple-500/60 transition-colors" />

                <div className="flex flex-col h-full">
                  {/* Number */}
                  <div className="text-6xl sm:text-7xl md:text-9xl font-black text-white/5 mb-4 sm:mb-6 leading-none">
                    02
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black bg-linear-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent mb-4 sm:mb-6">
                    Bài học
                  </h2>

                  {/* Description */}
                  <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6 sm:mb-8 flex-1">
                    Khám phá kiến thức chuyên sâu về cạnh tranh công bằng, quy
                    định thị trường, và vai trò của từng bên trong hệ sinh thái
                    kinh doanh.
                  </p>

                  {/* Features */}
                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 sm:mt-2 shrink-0" />
                      <span className="text-sm sm:text-base text-gray-400">
                        Lý thuyết cạnh tranh công bằng
                      </span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 sm:mt-2 shrink-0" />
                      <span className="text-sm sm:text-base text-gray-400">
                        Nghiên cứu tình huống thực tế
                      </span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 sm:mt-2 shrink-0" />
                      <span className="text-sm sm:text-base text-gray-400">
                        Số liệu và phân tích chuyên sâu
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 text-purple-400 text-base sm:text-lg font-bold"
                  >
                    <span>Khám phá ngay</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Key Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 backdrop-blur-xl bg-white/2 border border-white/10">
                <div className="text-5xl font-black text-white/10 mb-3">01</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Học qua trải nghiệm
                </h3>
                <p className="text-gray-400 text-sm">
                  Ra quyết định thực tế và xem tác động ngay lập tức
                </p>
              </div>

              <div className="p-6 backdrop-blur-xl bg-white/2 border border-white/10">
                <div className="text-5xl font-black text-white/10 mb-3">02</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Kiến thức chuyên sâu
                </h3>
                <p className="text-gray-400 text-sm">
                  Dữ liệu thực tế từ nghiên cứu và thị trường
                </p>
              </div>

              <div className="p-6 backdrop-blur-xl bg-white/2 border border-white/10">
                <div className="text-5xl font-black text-white/10 mb-3">03</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Phản hồi cá nhân
                </h3>
                <p className="text-gray-400 text-sm">
                  Nhận xét chi tiết về quyết định của bạn
                </p>
              </div>
            </div>
          </motion.div>

          {/* Achievements Link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-12 flex justify-center"
          >
            <motion.button
              onClick={() => navigate("/achievements")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="absolute -top-2 -left-2 w-12 h-12 border-l border-t border-amber-500/30 group-hover:border-amber-500/60 transition-colors" />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 border-r border-b border-amber-500/30 group-hover:border-amber-500/60 transition-colors" />

              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-white">
                  Xem Thành tựu
                </span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-amber-400"
                >
                  →
                </motion.span>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
