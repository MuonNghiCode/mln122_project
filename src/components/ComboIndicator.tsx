import { motion, AnimatePresence } from "framer-motion";

interface ComboIndicatorProps {
  comboMultiplier: number;
  maxStreak: number;
}

export default function ComboIndicator({
  comboMultiplier,
  maxStreak,
}: ComboIndicatorProps) {
  if (comboMultiplier <= 1.0) return null;

  const getComboLevel = () => {
    if (maxStreak >= 5)
      return {
        text: "LEGENDARY COMBO",
        color: "from-amber-400 via-orange-500 to-red-500",
        glow: "shadow-[0_0_40px_rgba(251,191,36,0.8)]",
        icon: "👑",
        scale: 1.3,
      };
    if (maxStreak >= 4)
      return {
        text: "MEGA COMBO",
        color: "from-purple-400 via-pink-500 to-purple-600",
        glow: "shadow-[0_0_30px_rgba(168,85,247,0.7)]",
        icon: "⚡",
        scale: 1.2,
      };
    if (maxStreak >= 3)
      return {
        text: "SUPER COMBO",
        color: "from-blue-400 via-cyan-500 to-blue-600",
        glow: "shadow-[0_0_25px_rgba(59,130,246,0.6)]",
        icon: "🔥",
        scale: 1.1,
      };
    return {
      text: "COMBO",
      color: "from-green-400 to-emerald-500",
      glow: "shadow-[0_0_20px_rgba(34,197,94,0.5)]",
      icon: "✨",
      scale: 1.0,
    };
  };

  const level = getComboLevel();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0, y: -20 }}
        animate={{
          scale: level.scale,
          opacity: 1,
          y: 0,
          rotate: [0, -5, 5, -5, 0],
        }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15,
          rotate: {
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2,
          },
        }}
        className="fixed top-24 right-8 z-50"
      >
        <div
          className={`relative px-6 py-4 bg-linear-to-r ${level.color} ${level.glow} backdrop-blur-xl rounded-2xl border-2 border-white/30`}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                initial={{
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  opacity: 0,
                }}
                animate={{
                  y: [null, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          <div className="relative flex items-center gap-3">
            <motion.span
              className="text-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              {level.icon}
            </motion.span>

            <div className="flex flex-col">
              <motion.span
                className="text-xs font-black text-white/90 tracking-widest"
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {level.text}
              </motion.span>
              <motion.span
                className="text-2xl font-black text-white drop-shadow-lg"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                }}
              >
                x{comboMultiplier.toFixed(1)}
              </motion.span>
            </div>
          </div>

          {/* Streak count */}
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/80 rounded-full border border-white/20">
            <span className="text-xs text-white font-bold">
              {maxStreak} Streak
            </span>
          </div>
        </div>

        {/* Pulsing ring effect */}
        <motion.div
          className={`absolute inset-0 rounded-2xl border-2 ${level.color}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
