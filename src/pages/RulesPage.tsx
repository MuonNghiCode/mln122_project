import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGame } from "../contexts/GameContext";

gsap.registerPlugin(ScrollTrigger);

interface RulesPageProps {
  onContinue: () => void;
}

export default function RulesPage({ onContinue }: RulesPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const { isGameStarted } = useGame();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animate each section's words smoothly and slowly
    const sections = container.querySelectorAll(".rule-section");

    sections.forEach((section) => {
      const words = section.querySelectorAll(".word");

      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 30,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 30%",
            scrub: 1.5,
          },
        }
      );
    });

    // Track scroll progress
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Split text into words
  const splitWords = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="word inline-block mr-[0.35em]">
        {word}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background - matching LoadingPage and RoleSelectPage */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient background overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-950/50 via-black to-orange-950/40" />

        {/* Animated gradient orbs - matching other pages */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #ff6b00 0%, #8b00ff 50%, transparent 70%)",
          }}
          initial={{ opacity: 0 }}
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
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-px bg-gray-900/50 z-50">
        <motion.div
          className="h-full bg-linear-to-r from-orange-600 via-amber-400 to-orange-600 shadow-[0_0_15px_rgba(255,107,0,0.5)]"
          style={{ width: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Scrollable content */}
      <div ref={containerRef} className="relative z-10">
        {/* Header Section */}
        <div className="h-screen flex flex-col items-center justify-center px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center space-y-8 max-w-5xl"
          >
            {/* Decorative top line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-px bg-linear-to-r from-transparent via-orange-500 to-transparent mb-8"
            />

            <div className="inline-block px-6 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-6">
              <span className="text-orange-400 text-sm tracking-[0.3em] uppercase font-semibold">
                Hướng dẫn
              </span>
            </div>

            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.9]">
              <span className="block text-white/20 mb-2">Luật chơi</span>
              <span className="block bg-linear-to-r from-orange-500 via-amber-400 to-orange-600 bg-clip-text text-transparent">
                Cuộc chiến
              </span>
              <span className="block bg-linear-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                Thị trường
              </span>
            </h1>

            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              Tham gia trò chơi mô phỏng thị trường với 3 vai trò khác nhau. Đưa
              ra quyết định chiến lược và học về cạnh tranh công bằng.
            </p>

            {/* Decorative bottom line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.7 }}
              className="h-px bg-linear-to-r from-transparent via-orange-500/50 to-transparent mt-12"
            />

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pt-16"
            >
              <div className="inline-flex flex-col items-center gap-3">
                <span className="text-gray-500 text-xs tracking-[0.2em] uppercase">
                  Scroll để khám phá
                </span>
                <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center pt-2">
                  <motion.div
                    animate={{ y: [0, 12, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Rule 1 */}
        <div className="rule-section min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-6xl w-full flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Number - Always first on mobile */}
            <div className="relative order-1 md:order-1">
              <div className="relative inline-block">
                <div className="text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-br from-orange-500/30 to-orange-600/10 leading-none">
                  01
                </div>
                <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-br from-orange-500 to-orange-600 blur-2xl opacity-40" />
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-1 bg-linear-to-r from-orange-500 to-transparent" />
            </div>

            {/* Content - Second on mobile */}
            <div className="space-y-6 order-2 md:order-2">
              <div className="inline-block px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full mb-4">
                <span className="text-orange-400 text-xs tracking-widest uppercase font-semibold">
                  Bước đầu tiên
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                {splitWords("Vai trò của bạn")}
              </h2>
              <div className="w-20 h-px bg-linear-to-r from-orange-500/50 to-transparent" />
              <p className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed">
                {splitWords(
                  "Chọn một trong ba vai trò: Cửa hàng truyền thống, Nền tảng số, hoặc Cơ quan quản lý. Mỗi vai trò có chiến lược riêng."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Rule 2 */}
        <div className="rule-section min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-6xl w-full flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Number - Always first on mobile, right on desktop */}
            <div className="relative order-1 md:order-2 md:text-right">
              <div className="relative inline-block">
                <div className="text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-br from-amber-500/30 to-amber-600/10 leading-none">
                  02
                </div>
                <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-br from-amber-500 to-amber-600 blur-2xl opacity-40" />
              </div>
              <div className="absolute bottom-0 left-0 md:right-0 md:left-auto w-32 h-1 bg-linear-to-r md:bg-linear-to-l from-amber-500 to-transparent" />
            </div>

            {/* Content - Second on mobile, left on desktop */}
            <div className="space-y-6 order-2 md:order-1">
              <div className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
                <span className="text-amber-400 text-xs tracking-widest uppercase font-semibold">
                  Điểm số quan trọng
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                {splitWords("Sáu chỉ số quan trọng")}
              </h2>
              <div className="w-20 h-px bg-linear-to-r from-amber-500/50 to-transparent" />
              <p className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed">
                {splitWords(
                  "Theo dõi 6 chỉ số: Doanh thu, Thị phần, Niềm tin, Đổi mới, Phúc lợi, và Công bằng. Mỗi vai trò có 3 chỉ số ưu tiên riêng."
                )}
              </p>
              {/* All 6 metrics indicators */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-500">Doanh thu</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-xs text-gray-500">Thị phần</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span className="text-xs text-gray-500">Niềm tin</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span className="text-xs text-gray-500">Đổi mới</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span className="text-xs text-gray-500">Phúc lợi</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="text-xs text-gray-500">Công bằng</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rule 3 */}
        <div className="rule-section min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-6xl w-full flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Number - Always first on mobile */}
            <div className="relative order-1 md:order-1">
              <div className="relative inline-block">
                <div className="text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-br from-purple-500/30 to-purple-600/10 leading-none">
                  03
                </div>
                <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-br from-purple-500 to-purple-600 blur-2xl opacity-40" />
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-1 bg-linear-to-r from-purple-500 to-transparent" />
            </div>

            {/* Content - Second on mobile */}
            <div className="space-y-6 order-2 md:order-2">
              <div className="inline-block px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
                <span className="text-purple-400 text-xs tracking-widest uppercase font-semibold">
                  Cơ chế chơi
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                {splitWords("Vòng chơi")}
              </h2>
              <div className="w-20 h-px bg-linear-to-r from-purple-500/50 to-transparent" />
              <p className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed">
                {splitWords(
                  "Game có 3-4 vòng. Mỗi vòng bạn đưa ra quyết định chiến lược ảnh hưởng đến ba chỉ số."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Rule 4 */}
        <div className="rule-section min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-6xl w-full flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Number - Always first on mobile, right on desktop */}
            <div className="relative order-1 md:order-2 md:text-right">
              <div className="relative inline-block">
                <div className="text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-br from-cyan-500/30 to-cyan-600/10 leading-none">
                  04
                </div>
                <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-br from-cyan-500 to-cyan-600 blur-2xl opacity-40" />
              </div>
              <div className="absolute bottom-0 left-0 md:right-0 md:left-auto w-32 h-1 bg-linear-to-r md:bg-linear-to-l from-cyan-500 to-transparent" />
            </div>

            {/* Content - Second on mobile, left on desktop */}
            <div className="space-y-6 order-2 md:order-1">
              <div className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
                <span className="text-cyan-400 text-xs tracking-widest uppercase font-semibold">
                  Chiến lược thắng
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                {splitWords("Mục tiêu cân bằng")}
              </h2>
              <div className="w-20 h-px bg-linear-to-r from-cyan-500/50 to-transparent" />
              <p className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed">
                {splitWords(
                  "Không tối đa hóa một chỉ số, mà cân bằng cả ba yếu tố để thành công."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Rule 5 */}
        <div className="rule-section min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-6xl w-full flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Number - Always first on mobile */}
            <div className="relative order-1 md:order-1">
              <div className="relative inline-block">
                <div className="text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-br from-pink-500/30 to-pink-600/10 leading-none">
                  05
                </div>
                <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-br from-pink-500 to-pink-600 blur-2xl opacity-40" />
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-1 bg-linear-to-r from-pink-500 to-transparent" />
            </div>

            {/* Content - Second on mobile */}
            <div className="space-y-6 order-2 md:order-2">
              <div className="inline-block px-4 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full mb-4">
                <span className="text-pink-400 text-xs tracking-widest uppercase font-semibold">
                  Phần thưởng
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                {splitWords("Kết quả và bài học")}
              </h2>
              <div className="w-20 h-px bg-linear-to-r from-pink-500/50 to-transparent" />
              <p className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed">
                {splitWords(
                  "Sau game, nhận phản hồi chi tiết và bài học về cạnh tranh công bằng trong thị trường số."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Section 06: Reputation & Mentor */}
        <div className="rule-section min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-6xl w-full flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Number - Always first on mobile, right on desktop */}
            <div className="relative order-1 md:order-2 md:text-right">
              <div className="relative inline-block">
                <div className="text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-br from-indigo-500/30 to-indigo-600/10 leading-none">
                  06
                </div>
                <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-br from-indigo-500 to-indigo-600 blur-2xl opacity-40" />
              </div>
              <div className="absolute bottom-0 left-0 md:right-0 md:left-auto w-32 h-1 bg-linear-to-r md:bg-linear-to-l from-indigo-500 to-transparent" />
            </div>

            {/* Content - Second on mobile, left on desktop */}
            <div className="space-y-6 order-2 md:order-1">
              <div className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4">
                <span className="text-indigo-400 text-xs tracking-widest uppercase font-semibold">
                  Hệ thống mới
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                {splitWords("Danh tiếng & Cố vấn")}
              </h2>
              <div className="w-20 h-px bg-linear-to-r from-indigo-500/50 to-transparent" />
              <p className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed mb-6">
                {splitWords(
                  "Xây dựng danh tiếng qua nhiều lần chơi và chọn cố vấn phù hợp để có lợi thế chiến lược."
                )}
              </p>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2" />
                  <span>
                    {splitWords(
                      "Reputation tích lũy: Vô Danh → Được Biết → Tôn Trọng → Huyền Thoại"
                    )}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2" />
                  <span>
                    {splitWords(
                      "3 Cố vấn: Nhà kinh tế, Chuyên gia công nghệ, Chuyên gia chính sách"
                    )}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2" />
                  <span>
                    {splitWords(
                      "Cố vấn tăng chỉ số và cho lời khuyên mỗi 2 vòng"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 07: Enhanced Combo System */}
        <div className="rule-section min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-6xl w-full flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Number - Always first on mobile */}
            <div className="relative order-1 md:order-1">
              <div className="relative inline-block">
                <div className="text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-br from-purple-500/30 to-pink-600/10 leading-none">
                  07
                </div>
                <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-br from-purple-500 to-pink-600 blur-2xl opacity-40" />
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-1 bg-linear-to-r from-purple-500 to-transparent" />
            </div>

            {/* Content - Second on mobile */}
            <div className="space-y-6 order-2 md:order-2">
              <div className="inline-block px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
                <span className="text-purple-400 text-xs tracking-widest uppercase font-semibold">
                  Chuỗi combo nâng cao
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                {splitWords("Hệ thống nhân điểm mạnh mẽ")}
              </h2>
              <div className="w-20 h-px bg-linear-to-r from-purple-500/50 to-transparent" />
              <p className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed mb-6">
                {splitWords(
                  "Giữ chiến lược nhất quán để tăng nhân điểm lên x3.0!"
                )}
              </p>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
                  <span>{splitWords("Streak 2: COMBO x1.2")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                  <span>{splitWords("Streak 3: SUPER COMBO x1.5")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2" />
                  <span>{splitWords("Streak 4: MEGA COMBO x2.0")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2" />
                  <span>{splitWords("Streak 5+: LEGENDARY COMBO x3.0")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 08: Media Coverage & Power-ups */}
        <div className="rule-section min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-6xl w-full flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Number - Always first on mobile, right on desktop */}
            <div className="relative order-1 md:order-2 md:text-right">
              <div className="relative inline-block">
                <div className="text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-br from-cyan-500/30 to-cyan-600/10 leading-none">
                  08
                </div>
                <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-br from-cyan-500 to-cyan-600 blur-2xl opacity-40" />
              </div>
              <div className="absolute bottom-0 left-0 md:right-0 md:left-auto w-32 h-1 bg-linear-to-r md:bg-linear-to-l from-cyan-500 to-transparent" />
            </div>

            {/* Content - Second on mobile, left on desktop */}
            <div className="space-y-6 order-2 md:order-1">
              <div className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
                <span className="text-cyan-400 text-xs tracking-widest uppercase font-semibold">
                  Tính năng đặc biệt
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                {splitWords("Truyền thông & Kỹ năng")}
              </h2>
              <div className="w-20 h-px bg-linear-to-r from-cyan-500/50 to-transparent" />
              <p className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed mb-6">
                {splitWords(
                  "Báo chí theo dõi hành động của bạn. Mở khóa kỹ năng đặc biệt qua thành tựu."
                )}
              </p>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />
                  <span>
                    {splitWords("Headlines mỗi vòng ảnh hưởng danh tiếng")}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />
                  <span>
                    {splitWords(
                      "Power-ups: Market Insight, Strategic Pause, Regulatory Shield"
                    )}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />
                  <span>
                    {splitWords(
                      "Unlock qua achievements, dùng giới hạn mỗi game"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="min-h-screen flex items-center justify-center px-8 py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center space-y-12 max-w-4xl"
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-block px-6 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-8"
              >
                <span className="text-orange-400 text-sm tracking-[0.3em] uppercase font-semibold">
                  Bước cuối cùng
                </span>
              </motion.div>

              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-tight mb-6">
                Sẵn sàng <br />
                <span className="bg-linear-to-r from-orange-500 via-amber-400 to-orange-600 bg-clip-text text-transparent">
                  bắt đầu?
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-12">
                Hãy chọn vai trò của bạn và tham gia vào cuộc chiến thị trường.
                Đưa ra quyết định chiến lược và khám phá bài học về cạnh tranh
                công bằng.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 80px rgba(255,107,0,0.7)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (isGameStarted) {
                      navigate("/game");
                    } else {
                      onContinue();
                    }
                  }}
                  className="group relative px-12 py-5 bg-linear-to-r from-orange-600 via-amber-500 to-orange-600 text-white text-xl font-bold rounded-full shadow-[0_0_50px_rgba(255,107,0,0.5)] transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isGameStarted ? "Tiếp tục chơi" : "Bắt đầu chơi"}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-orange-500 via-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="px-12 py-5 bg-gray-900/50 border-2 border-gray-700 hover:border-gray-600 text-gray-300 text-lg font-semibold rounded-full transition-all"
                >
                  Xem lại
                </motion.button>
              </div>

              {/* Progress indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                viewport={{ once: true }}
                className="mt-16 flex items-center justify-center gap-2"
              >
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-orange-500" />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
