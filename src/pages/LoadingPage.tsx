import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type LoadingPageProps = {
  onDone?: () => void;
};

export default function LoadingPage({ onDone }: LoadingPageProps) {
  const [progress, setProgress] = useState(0);
  const loadStart = useRef(Date.now());

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const elapsed = Date.now() - loadStart.current;
      const wait = Math.max(800, 2000 - elapsed);
      const timeout = window.setTimeout(() => {
        if (onDone) onDone();
      }, wait);
      return () => clearTimeout(timeout);
    }
  }, [progress, onDone]);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-950/50 via-black to-orange-950/40" />

      {/* Animated gradient orbs - simple entrance */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #ff6b00 0%, #8b00ff 50%, transparent 70%)",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.25,
          x: ["-20%", "20%", "-20%"],
          y: ["-10%", "10%", "-10%"],
        }}
        transition={{
          opacity: { duration: 0.5 },
          x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #8b00ff 0%, #ff6b00 50%, transparent 70%)",
          right: 0,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.2,
          x: ["10%", "-10%", "10%"],
          y: ["10%", "-10%", "10%"],
        }}
        transition={{
          opacity: { duration: 0.5 },
          x: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 14, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Loading content - simple entrance */}
      <div className="z-10 flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-amber-300 to-orange-500 mb-2 tracking-tight drop-shadow-[0_0_30px_rgba(255,107,0,0.4)]">
            Cuộc Chiến Thị Trường
          </h1>
          <p className="text-gray-400 text-sm tracking-wider">
            Đang chuẩn bị trải nghiệm...
          </p>
        </motion.div>

        {/* Premium loading bar - simple entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="w-80 relative"
        >
          <div className="h-2 bg-gray-900/90 rounded-full overflow-hidden backdrop-blur-sm border border-gray-800/60 shadow-2xl relative">
            {/* Texture overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px)`,
              }}
            />
            <motion.div
              className="h-full bg-linear-to-r from-orange-600 via-amber-400 to-orange-600 relative shadow-[0_0_20px_rgba(255,107,0,0.6)]"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
              {/* Inner glow */}
              <div className="absolute inset-0 bg-linear-to-b from-white/20 to-transparent" />
            </motion.div>
          </div>
          <div className="mt-3 text-center">
            <span className="text-2xl font-semibold text-orange-400/90 tabular-nums">
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
        </motion.div>

        {/* Loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-orange-500/60"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
