import { motion } from "framer-motion";
import type { ReputationData } from "../types/game";
import {
  getReputationDisplay,
  getNextRankProgress,
} from "../utils/reputationUtils";

interface ReputationDisplayProps {
  reputation: ReputationData;
  compact?: boolean;
}

export default function ReputationDisplay({
  reputation,
  compact = false,
}: ReputationDisplayProps) {
  const display = getReputationDisplay(reputation.rank);
  const progress = getNextRankProgress(reputation.points);

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full"
      >
        <span className="text-2xl">{display.icon}</span>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            Danh tiếng
          </span>
          <span
            className={`text-sm font-bold bg-linear-to-r ${display.color} bg-clip-text text-transparent`}
          >
            {display.name}
          </span>
        </div>
        <div className="text-right">
          <span className="text-lg font-black text-white">
            {reputation.points}
          </span>
          <span className="text-xs text-gray-500 ml-1">pts</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${display.color} opacity-10`}
      />

      {/* Decorative corners */}
      <div className="absolute -top-2 -left-2 w-20 h-20 border-l-2 border-t-2 border-white/20" />
      <div className="absolute -bottom-2 -right-2 w-20 h-20 border-r-2 border-b-2 border-white/20" />

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-6xl"
            >
              {display.icon}
            </motion.div>
            <div>
              <div className="text-sm text-gray-400 font-semibold uppercase tracking-widest mb-1">
                Danh tiếng của bạn
              </div>
              <h3
                className={`text-3xl font-black bg-linear-to-r ${display.color} bg-clip-text text-transparent`}
              >
                {display.name}
              </h3>
            </div>
          </div>

          {/* Points */}
          <div className="text-right">
            <div className="text-5xl font-black text-white">
              {reputation.points}
            </div>
            <div className="text-sm text-gray-400 font-semibold">
              Reputation Points
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-base leading-relaxed">
          {display.description}
        </p>

        {/* Progress to next rank */}
        {reputation.rank !== "legendary" && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400 font-semibold">
                Tiến độ lên hạng
              </span>
              <span className="text-sm text-gray-300 font-bold">
                {progress.current} / {progress.max}
              </span>
            </div>

            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress.percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`absolute inset-y-0 left-0 bg-linear-to-r ${display.color} rounded-full`}
              />

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div className="space-y-1">
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Số trận đã chơi
            </div>
            <div className="text-2xl font-black text-white">
              {reputation.totalGamesPlayed}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Điểm cao nhất
            </div>
            <div className="text-2xl font-black text-white">
              {reputation.bestScore}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
