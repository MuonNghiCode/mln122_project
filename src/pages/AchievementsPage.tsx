import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import { ACHIEVEMENTS } from "../config/achievementsConfig";

export default function AchievementsPage() {
  const navigate = useNavigate();
  const { gameState } = useGame();

  const unlockedIds = gameState?.achievements || [];
  const totalAchievements = ACHIEVEMENTS.length;
  const unlockedCount = unlockedIds.length;
  const progress = (unlockedCount / totalAchievements) * 100;

  // Group by rarity
  const groupedAchievements = {
    legendary: ACHIEVEMENTS.filter((a) => a.rarity === "legendary"),
    epic: ACHIEVEMENTS.filter((a) => a.rarity === "epic"),
    rare: ACHIEVEMENTS.filter((a) => a.rarity === "rare"),
    common: ACHIEVEMENTS.filter((a) => a.rarity === "common"),
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "from-amber-500 to-yellow-400";
      case "epic":
        return "from-purple-500 to-pink-400";
      case "rare":
        return "from-blue-500 to-cyan-400";
      case "common":
        return "from-gray-500 to-gray-400";
      default:
        return "from-gray-500 to-gray-400";
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "border-amber-500/30";
      case "epic":
        return "border-purple-500/30";
      case "rare":
        return "border-blue-500/30";
      case "common":
        return "border-gray-500/30";
      default:
        return "border-gray-500/30";
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "bg-amber-500/5";
      case "epic":
        return "bg-purple-500/5";
      case "rare":
        return "bg-blue-500/5";
      case "common":
        return "bg-gray-500/5";
      default:
        return "bg-gray-500/5";
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br from-purple-950/50 via-black to-orange-950/40" />

        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with decorative corners */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-8 sm:mb-12 p-6 sm:p-8 md:p-12 backdrop-blur-xl bg-white/2 border border-white/10"
          >
            {/* Decorative corners */}
            <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-20 h-20 sm:w-32 sm:h-32 border-l-2 border-t-2 border-purple-500/30" />
            <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-20 h-20 sm:w-32 sm:h-32 border-r-2 border-b-2 border-orange-500/30" />

            <div className="relative">
              <button
                onClick={() => navigate(-1)}
                className="mb-4 sm:mb-6 text-gray-400 hover:text-white transition-colors text-xs sm:text-sm uppercase tracking-wider"
              >
                ← Quay lại
              </button>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 bg-linear-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                Thành Tựu
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light mb-6 sm:mb-8">
                Theo dõi tiến trình và thành tựu của bạn trong "Phiên tòa Cạnh
                tranh"
              </p>

              {/* Progress bar */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">
                    Tiến độ hoàn thành
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    {unlockedCount}/{totalAchievements}
                  </span>
                </div>
                <div className="relative h-2 sm:h-3 bg-white/5 border border-white/10 overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-linear-to-r from-purple-500 to-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements by rarity */}
          {Object.entries(groupedAchievements).map(([rarity, achievements]) => (
            <motion.div
              key={rarity}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 sm:mb-12"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
                <div
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 border ${getRarityBorder(
                    rarity
                  )} ${getRarityBg(rarity)} backdrop-blur-sm`}
                >
                  <span
                    className={`text-xs sm:text-sm font-bold uppercase tracking-wider bg-linear-to-r ${getRarityColor(
                      rarity
                    )} bg-clip-text text-transparent`}
                  >
                    {rarity === "legendary" && "Huyền Thoại"}
                    {rarity === "epic" && "Sử Thi"}
                    {rarity === "rare" && "Hiếm"}
                    {rarity === "common" && "Phổ Thông"}
                  </span>
                </div>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {achievements.map((achievement) => {
                  const isUnlocked = unlockedIds.includes(achievement.id);

                  return (
                    <motion.div
                      key={achievement.id}
                      whileHover={isUnlocked ? { scale: 1.02 } : {}}
                      className={`relative p-6 sm:p-8 backdrop-blur-xl border transition-all duration-300 ${
                        isUnlocked
                          ? `${getRarityBorder(rarity)} ${getRarityBg(rarity)}`
                          : "bg-white/1 border-white/5 opacity-50"
                      }`}
                    >
                      {/* Decorative corners */}
                      {isUnlocked && (
                        <>
                          <div
                            className={`absolute -top-2 -left-2 w-16 h-16 border-l border-t ${getRarityBorder(
                              rarity
                            )}`}
                          />
                          <div
                            className={`absolute -bottom-2 -right-2 w-16 h-16 border-r border-b ${getRarityBorder(
                              rarity
                            )}`}
                          />
                        </>
                      )}

                      <div className="relative">
                        {/* Number badge */}
                        <div
                          className={`inline-block mb-4 px-4 py-2 border ${
                            isUnlocked
                              ? getRarityBorder(rarity)
                              : "border-white/10"
                          }`}
                        >
                          <span
                            className={`text-4xl font-black ${
                              isUnlocked
                                ? `bg-linear-to-r ${getRarityColor(
                                    rarity
                                  )} bg-clip-text text-transparent`
                                : "text-gray-700"
                            }`}
                          >
                            {achievement.icon}
                          </span>
                        </div>

                        <h3
                          className={`text-2xl font-bold mb-2 ${
                            isUnlocked ? "text-white" : "text-gray-700"
                          }`}
                        >
                          {isUnlocked ? achievement.title : "???"}
                        </h3>

                        <p
                          className={`text-sm leading-relaxed ${
                            isUnlocked ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {isUnlocked
                            ? achievement.description
                            : "Chưa mở khóa. Tiếp tục chơi để khám phá!"}
                        </p>

                        {/* Unlocked indicator */}
                        {isUnlocked && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`mt-4 inline-block px-3 py-1 border ${getRarityBorder(
                              rarity
                            )} ${getRarityBg(rarity)}`}
                          >
                            <span className="text-xs uppercase tracking-wider text-gray-400">
                              ✓ Đã mở khóa
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 mb-6 text-lg">
              {unlockedCount === totalAchievements
                ? "🎉 Chúc mừng! Bạn đã mở khóa tất cả thành tựu!"
                : `Còn ${
                    totalAchievements - unlockedCount
                  } thành tựu chưa mở khóa. Tiếp tục chơi!`}
            </p>
            <button
              onClick={() => navigate("/home")}
              className="px-12 py-4 bg-linear-to-r from-purple-500 to-orange-500 text-white text-lg font-light tracking-wider uppercase hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Về trang chủ
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
