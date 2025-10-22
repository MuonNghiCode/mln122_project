import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGame } from "../contexts/GameContext";
import { ROLES } from "../config/gameConfig";
import { generateDynamicLessons } from "../utils/dynamicLessons";
import ReputationDisplay from "../components/ReputationDisplay";
import MediaHeadline from "../components/MediaHeadline";
import {
  loadReputation,
  updateReputation,
  saveReputation,
} from "../utils/reputationUtils";
import { MENTORS } from "../config/mentorsConfig";
import { getBranchInfo } from "../config/storyBranchesConfig";

export default function ResultPage() {
  const navigate = useNavigate();
  const { gameState, resetGame } = useGame();
  const [showDetails, setShowDetails] = useState(false);
  const [reputationEarned, setReputationEarned] = useState(0);
  const [previousReputation, setPreviousReputation] = useState(0);

  useEffect(() => {
    if (!gameState || !gameState.isGameOver) {
      navigate("/");
    } else {
      // Calculate reputation earned this game
      const prevRep = loadReputation();
      setPreviousReputation(prevRep.points);

      const mediaImpact =
        gameState.mediaHeadlines?.reduce(
          (sum, h) => sum + h.reputationImpact,
          0
        ) || 0;
      const totalScore = roleConfig.primaryMetrics.reduce(
        (sum, key) => sum + metrics[key],
        0
      );
      const avgScore = Math.round(
        totalScore / roleConfig.primaryMetrics.length
      );

      const newRep = updateReputation(
        prevRep,
        avgScore,
        gameState.achievements,
        mediaImpact
      );
      saveReputation(newRep); // Save to localStorage
      setReputationEarned(newRep.points - prevRep.points);
    }
  }, [gameState, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setShowDetails(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!gameState) return null;

  const roleConfig = ROLES[gameState.role];
  const metrics = gameState.metrics;

  const totalScore = roleConfig.primaryMetrics.reduce(
    (sum, key) => sum + metrics[key],
    0
  );
  const averageScore = Math.round(
    totalScore / roleConfig.primaryMetrics.length
  );

  const getPerformanceLevel = (score: number) => {
    if (score >= 80)
      return {
        text: "Xuất sắc",
        color: "from-green-500 to-emerald-400",
        emoji: "🏆",
      };
    if (score >= 60)
      return { text: "Tốt", color: "from-blue-500 to-cyan-400", emoji: "⭐" };
    if (score >= 40)
      return {
        text: "Trung bình",
        color: "from-yellow-500 to-amber-400",
        emoji: "💫",
      };
    return {
      text: "Cần cải thiện",
      color: "from-red-500 to-orange-400",
      emoji: "💪",
    };
  };

  const performance = getPerformanceLevel(averageScore);

  const getRoleMessage = () => {
    switch (gameState.role) {
      case "smallbiz":
        return {
          title: "Doanh nghiệp nhỏ",
          message:
            averageScore >= 60
              ? "Bạn đã chứng minh rằng doanh nghiệp nhỏ có thể cạnh tranh hiệu quả thông qua đổi mới sáng tạo và dịch vụ chất lượng. Đây là bài học quý giá về sức mạnh của sự linh hoạt!"
              : 'Cạnh tranh với những "ông lớn" không dễ dàng. Nhưng lịch sử đã chứng minh: đổi mới, tập trung vào khách hàng, và sự bền bỉ là chìa khóa để doanh nghiệp nhỏ thành công.',
          theme: "from-blue-500 to-cyan-400",
          insight:
            "Doanh nghiệp nhỏ là xương sống của nền kinh tế, tạo ra 70% việc làm và thúc đẩy đổi mới từ cơ sở.",
        };
      case "platform":
        return {
          title: "Nền tảng công nghệ",
          message:
            averageScore >= 60
              ? "Bạn đã xây dựng một nền tảng mạnh mẽ với sự cân bằng giữa tăng trưởng và trách nhiệm. Đây là tấm gương cho những nền tảng số trong tương lai!"
              : "Sức mạnh lớn đi kèm trách nhiệm lớn. Nền tảng công nghệ cần minh bạch, công bằng và bảo vệ quyền lợi người dùng để phát triển bền vững.",
          theme: "from-purple-500 to-pink-400",
          insight:
            "Các nền tảng số kiểm soát 80% dữ liệu người dùng - trách nhiệm của họ không chỉ là lợi nhuận mà còn là bảo vệ quyền riêng tư và công bằng cạnh tranh.",
        };
      case "regulator":
        return {
          title: "Cơ quan quản lý",
          message:
            averageScore >= 60
              ? "Bạn đã tạo ra môi trường cạnh tranh lành mạnh, cân bằng giữa đổi mới và bảo vệ. Đây là nghệ thuật quản lý thị trường hiện đại!"
              : "Quản lý thị trường đòi hỏi sự khôn ngoan: quá lỏng lẻo tạo ra độc quyền, quá chặt chẽ kìm hãm đổi mới. Hãy tìm điểm cân bằng!",
          theme: "from-orange-500 to-amber-400",
          insight:
            "Nghiên cứu cho thấy các thị trường có quy định hợp lý phát triển nhanh hơn 40% so với thị trường thiếu giám sát hoặc quá kiểm soát.",
        };
      default:
        return {
          title: "Người chơi",
          message: "Cảm ơn bạn đã tham gia!",
          theme: "from-gray-500 to-gray-400",
          insight: "",
        };
    }
  };

  const roleMessage = getRoleMessage();

  // Generate dynamic lessons based on gameplay
  const educationalLessons = generateDynamicLessons(gameState);

  const handlePlayAgain = () => {
    // Navigate first, then reset after a short delay
    navigate("/select-role");
    setTimeout(() => resetGame(), 100);
  };

  const handleBackHome = () => {
    // Navigate first, then reset after a short delay
    navigate("/home");
    setTimeout(() => resetGame(), 100);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
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

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 py-16">
        <div className="max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
              className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-white/5 border border-white/10 mb-4 sm:mb-6"
            >
              <span className="text-gray-400 text-xs sm:text-sm tracking-widest uppercase">
                Game Over
              </span>
            </motion.div>
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-linear-to-r ${roleMessage.theme} bg-clip-text text-transparent mb-3 sm:mb-4`}
            >
              Kết quả của bạn
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-light">
              {roleMessage.title}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 px-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative h-full p-6 sm:p-8 md:p-10 backdrop-blur-xl bg-white/2 border border-white/10">
                <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-16 h-16 sm:w-20 sm:h-20 border-l-2 border-t-2 border-white/30" />
                <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-16 h-16 sm:w-20 sm:h-20 border-r-2 border-b-2 border-white/30" />

                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                    className="text-6xl sm:text-7xl md:text-9xl mb-4 sm:mb-6"
                  >
                    {performance.emoji}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                  >
                    <div className="mb-4">
                      <div
                        className={`text-6xl sm:text-7xl md:text-8xl font-black bg-linear-to-r ${performance.color} bg-clip-text text-transparent leading-none mb-2`}
                      >
                        {averageScore}
                      </div>
                      <div className="text-gray-600 text-base sm:text-lg md:text-xl font-light">
                        Điểm trung bình
                      </div>
                    </div>
                    <div
                      className={`inline-block px-6 sm:px-8 py-2 sm:py-3 bg-linear-to-r ${performance.color} text-white text-lg sm:text-xl md:text-2xl font-bold`}
                    >
                      {performance.text}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white/5 border-l-4 border-amber-500"
                  >
                    <div className="flex items-start gap-2 sm:gap-3 text-left">
                      <span className="text-2xl sm:text-3xl shrink-0">💡</span>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic">
                        {roleMessage.insight}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative h-full p-6 sm:p-8 md:p-10 backdrop-blur-xl bg-white/2 border border-white/10">
                <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-16 h-16 sm:w-20 sm:h-20 border-l-2 border-t-2 border-white/30" />
                <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-16 h-16 sm:w-20 sm:h-20 border-r-2 border-b-2 border-white/30" />

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">
                  Chi tiết chỉ số
                </h3>

                {showDetails && (
                  <div className="space-y-4">
                    {Object.entries(metrics).map(([key, value], index) => {
                      const isPrimary = roleConfig.primaryMetrics.includes(
                        key as any
                      );
                      const metricLabels: Record<string, string> = {
                        revenue: "Doanh thu",
                        marketShare: "Thị phần",
                        userTrust: "Niềm tin",
                        innovation: "Đổi mới",
                        publicWelfare: "Phúc lợi",
                        fairness: "Công bằng",
                      };

                      return (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + index * 0.1 }}
                          className={`p-4 border-l-4 ${
                            isPrimary
                              ? "border-white/50 bg-white/10"
                              : "border-white/10 bg-white/5"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm font-bold uppercase tracking-wider ${
                                  isPrimary ? "text-white" : "text-gray-500"
                                }`}
                              >
                                {metricLabels[key]}
                              </span>
                              {isPrimary && (
                                <span className="text-amber-400 text-lg">
                                  ★
                                </span>
                              )}
                            </div>
                            <span
                              className={`text-3xl font-black ${
                                isPrimary ? "text-white" : "text-gray-400"
                              }`}
                            >
                              {value}
                            </span>
                          </div>

                          <div className="h-2 bg-gray-900 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{
                                duration: 1.5,
                                delay: 1.2 + index * 0.1,
                                ease: "easeOut",
                              }}
                              className={`h-full ${
                                value >= 70
                                  ? "bg-linear-to-r from-green-500 to-emerald-400"
                                  : value >= 40
                                  ? "bg-linear-to-r from-yellow-500 to-amber-400"
                                  : "bg-linear-to-r from-red-500 to-orange-400"
                              }`}
                              style={{
                                boxShadow:
                                  value >= 70
                                    ? "0 0 10px rgba(34, 197, 94, 0.5)"
                                    : value >= 40
                                    ? "0 0 10px rgba(245, 158, 11, 0.5)"
                                    : "0 0 10px rgba(239, 68, 68, 0.5)",
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="mb-12 p-10 backdrop-blur-xl bg-white/2 border border-white/10 relative"
            >
              <div className="absolute -top-3 -left-3 w-20 h-20 border-l-2 border-t-2 border-white/30" />
              <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-white/30" />

              <div className="text-center max-w-4xl mx-auto">
                <h3
                  className={`text-3xl font-bold bg-linear-to-r ${roleMessage.theme} bg-clip-text text-transparent mb-6`}
                >
                  Nhận xét của chuyên gia
                </h3>
                <p className="text-2xl text-gray-200 leading-relaxed font-light">
                  {roleMessage.message}
                </p>
              </div>
            </motion.div>
          )}

          {/* Reputation Earned */}
          {showDetails && reputationEarned > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9 }}
              className="mb-12"
            >
              <div className="max-w-4xl mx-auto text-center pb-8 border-b border-white/10">
                <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">
                  Danh tiếng
                </h3>
                <div className="flex items-center justify-center gap-8 mb-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                      Trước
                    </p>
                    <p className="text-4xl font-black text-gray-400">
                      {previousReputation}
                    </p>
                  </div>
                  <div className="text-5xl text-gray-600">→</div>
                  <div className="text-left">
                    <p className="text-sm text-amber-500 uppercase tracking-wider mb-1">
                      Sau
                    </p>
                    <p className="text-4xl font-black text-amber-400">
                      {previousReputation + reputationEarned}
                    </p>
                  </div>
                </div>
                <p className="text-lg text-gray-400">
                  <span className="text-amber-400 font-bold">
                    +{reputationEarned}
                  </span>{" "}
                  điểm từ game này
                </p>
                <div className="mt-6">
                  <ReputationDisplay
                    reputation={loadReputation()}
                    compact={false}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Mentor Impact */}
          {showDetails && gameState.mentor && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.95 }}
              className="mb-12"
            >
              <div className="max-w-4xl mx-auto text-center pb-8 border-b border-white/10">
                <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">
                  Cố vấn
                </h3>
                <div className="mb-6">
                  <p className="text-2xl font-bold text-amber-400 mb-2">
                    {MENTORS[gameState.mentor].name}
                  </p>
                  <p className="text-gray-400 text-lg">
                    {MENTORS[gameState.mentor].title}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  {Object.entries(MENTORS[gameState.mentor].boost).map(
                    ([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="text-gray-500 uppercase tracking-wider text-sm">
                          {key === "revenue" && "Doanh thu"}
                          {key === "marketShare" && "Thị phần"}
                          {key === "innovation" && "Đổi mới"}
                          {key === "userTrust" && "Niềm tin"}
                          {key === "fairness" && "Công bằng"}
                          {key === "publicWelfare" && "Phúc lợi"}
                        </span>
                        <span className="text-xl font-bold text-amber-400">
                          +{value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Story Branch Summary */}
          {showDetails && gameState.storyBranch && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.98 }}
              className="mb-12"
            >
              <div className="max-w-4xl mx-auto text-center pb-8 border-b border-white/10">
                <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">
                  Nhánh câu chuyện
                </h3>
                <p className="text-2xl font-bold text-purple-400 mb-4">
                  {getBranchInfo(gameState.storyBranch).name}
                </p>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  {getBranchInfo(gameState.storyBranch).description}
                </p>
              </div>
            </motion.div>
          )}

          {/* Media Timeline */}
          {showDetails &&
            gameState.mediaHeadlines &&
            gameState.mediaHeadlines.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.99 }}
                className="mb-12"
              >
                <div className="max-w-4xl mx-auto text-center pb-8">
                  <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">
                    Dòng thời gian truyền thông
                  </h3>
                  <p className="text-gray-400 mb-8">
                    Những tiêu đề đã xuất hiện trong game
                  </p>
                  <div className="space-y-4">
                    {gameState.mediaHeadlines.map((headline, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.0 + index * 0.05 }}
                      >
                        <MediaHeadline headline={headline} index={index} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="mb-12"
            >
              <div className="text-center mb-10">
                <h2 className="text-5xl font-black text-white mb-4">
                  Bài học từ thực tế
                </h2>
                <p className="text-xl text-gray-400 font-light">
                  Những điều quan trọng về cạnh tranh công bằng
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {educationalLessons.map((lesson, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2 + index * 0.15 }}
                    className="group relative p-8 backdrop-blur-xl bg-white/2 border border-white/10 hover:bg-white/5 transition-all duration-500"
                  >
                    <div className="absolute -top-2 -left-2 w-16 h-16 border-l border-t border-white/20 group-hover:border-amber-500/50 transition-colors" />
                    <div className="absolute -bottom-2 -right-2 w-16 h-16 border-r border-b border-white/20 group-hover:border-amber-500/50 transition-colors" />

                    <div className="text-6xl font-black text-white/10 mb-4">
                      {lesson.number}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {lesson.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4 text-base">
                      {lesson.content}
                    </p>
                    <div className="pt-4 border-t border-white/10 space-y-2">
                      {lesson.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-amber-400 mt-2" />
                          <p className="text-amber-400 text-sm font-semibold">
                            {stat.label}: {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {showDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8 }}
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 flex-wrap px-4"
            >
              <button
                onClick={handlePlayAgain}
                className={`w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-linear-to-r ${roleMessage.theme} text-white text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105`}
              >
                Chơi lại
              </button>
              <button
                onClick={() => navigate("/achievements")}
                className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-linear-to-r from-amber-500 to-orange-500 text-white text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105"
              >
                Thành tựu
              </button>
              <button
                onClick={handleBackHome}
                className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-white/20 text-white text-base sm:text-lg font-light transition-all duration-300 hover:bg-white/5"
              >
                Về trang chủ
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
