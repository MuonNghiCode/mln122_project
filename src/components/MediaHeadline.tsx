import { motion } from "framer-motion";
import type { MediaHeadline as MediaHeadlineType } from "../types/game";

interface MediaHeadlineProps {
  headline: MediaHeadlineType;
  index: number;
}

export default function MediaHeadline({ headline, index }: MediaHeadlineProps) {
  const getSentimentStyle = () => {
    switch (headline.sentiment) {
      case "positive":
        return {
          bg: "from-green-500/20 to-emerald-500/10",
          border: "border-green-500/30",
          text: "text-green-400",
          icon: "📈",
          label: "Tích cực",
        };
      case "negative":
        return {
          bg: "from-red-500/20 to-orange-500/10",
          border: "border-red-500/30",
          text: "text-red-400",
          icon: "📉",
          label: "Tiêu cực",
        };
      default:
        return {
          bg: "from-gray-500/20 to-gray-600/10",
          border: "border-gray-500/30",
          text: "text-gray-400",
          icon: "📰",
          label: "Trung lập",
        };
    }
  };

  const style = getSentimentStyle();

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative p-4 bg-linear-to-r ${style.bg} backdrop-blur-xl border ${style.border} rounded-xl overflow-hidden`}
    >
      {/* Decorative line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-transparent via-white/30 to-transparent" />

      <div className="flex items-start gap-3">
        {/* Icon */}
        {/* <motion.div
          animate={{ 
            rotate: [0, -10, 10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-2xl flex-shrink-0 mt-1"
        >
          {style.icon}
        </motion.div> */}

        <div className="flex-1 space-y-2">
          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Vòng {headline.round}
            </span>
            <span className="text-xs text-gray-600">•</span>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${style.text}`}
            >
              {style.label}
            </span>
            {headline.reputationImpact !== 0 && (
              <>
                <span className="text-xs text-gray-600">•</span>
                <span
                  className={`text-xs font-bold ${
                    headline.reputationImpact > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {headline.reputationImpact > 0 ? "+" : ""}
                  {headline.reputationImpact} Rep
                </span>
              </>
            )}
          </div>

          {/* Headline text */}
          <p className="text-white text-base font-medium leading-relaxed">
            {headline.headline}
          </p>
        </div>
      </div>

      {/* Shimmer effect for positive news */}
      {headline.sentiment === "positive" && (
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </motion.div>
  );
}
