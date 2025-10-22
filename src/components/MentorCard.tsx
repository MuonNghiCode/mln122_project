import { motion } from "framer-motion";
import type { MentorType } from "../types/game";
import { MENTORS } from "../config/mentorsConfig";

interface MentorCardProps {
  mentorType: MentorType;
  selected: boolean;
  onSelect: () => void;
  index: number;
}

export default function MentorCard({
  mentorType,
  selected,
  onSelect,
  index,
}: MentorCardProps) {
  const mentor = MENTORS[mentorType];

  const getColor = () => {
    switch (mentorType) {
      case "economist":
        return {
          gradient: "from-blue-500 to-cyan-500",
          border: "border-blue-500/50",
          glow: "shadow-[0_0_30px_rgba(59,130,246,0.5)]",
          icon: "📊",
        };
      case "tech_expert":
        return {
          gradient: "from-purple-500 to-pink-500",
          border: "border-purple-500/50",
          glow: "shadow-[0_0_30px_rgba(168,85,247,0.5)]",
          icon: "💻",
        };
      case "policy_maker":
        return {
          gradient: "from-amber-500 to-orange-500",
          border: "border-amber-500/50",
          glow: "shadow-[0_0_30px_rgba(245,158,11,0.5)]",
          icon: "⚖️",
        };
    }
  };

  const color = getColor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={onSelect}
      className={`relative cursor-pointer p-6 backdrop-blur-xl bg-white/5 border-2 ${
        selected
          ? `${color.border} ${color.glow}`
          : "border-white/10 hover:border-white/20"
      } rounded-2xl transition-all duration-300 overflow-hidden`}
    >
      {/* Background gradient when selected */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          className={`absolute inset-0 bg-linear-to-br ${color.gradient}`}
        />
      )}

      {/* Decorative corners */}
      <div
        className={`absolute -top-2 -left-2 w-16 h-16 border-l-2 border-t-2 ${
          selected ? color.border : "border-white/10"
        } transition-colors`}
      />
      <div
        className={`absolute -bottom-2 -right-2 w-16 h-16 border-r-2 border-b-2 ${
          selected ? color.border : "border-white/10"
        } transition-colors`}
      />

      <div className="relative z-10 space-y-4">
        {/* Header with icon */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            {/* <motion.div
              animate={
                selected
                  ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: selected ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="text-5xl"
            >
              {color.icon}
            </motion.div> */}

            <div>
              <h3 className="text-2xl font-black text-white mb-1">
                {mentor.name}
              </h3>
              <p
                className={`text-sm font-bold bg-linear-to-r ${color.gradient} bg-clip-text text-transparent`}
              >
                {mentor.title}
              </p>
            </div>
          </div>

          {/* Selection indicator */}
          {selected && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`w-12 h-12 rounded-full bg-linear-to-r ${color.gradient} flex items-center justify-center ${color.glow}`}
            >
              <span className="text-2xl">✓</span>
            </motion.div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed">
          {mentor.description}
        </p>

        {/* Boost stats */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">
            Bonus Metrics
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(mentor.boost).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg"
              >
                <span className="text-green-400 font-bold text-lg">
                  +{value}
                </span>
                <span className="text-xs text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Advice frequency */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Tư vấn mỗi {mentor.adviceFrequency} vòng</span>
        </div>
      </div>

      {/* Shimmer effect when selected */}
      {selected && (
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </motion.div>
  );
}
