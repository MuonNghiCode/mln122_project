import { motion, AnimatePresence } from "framer-motion";
import type { StoryBranch } from "../types/game";
import { getBranchInfo } from "../config/storyBranchesConfig";

interface StoryBranchNotificationProps {
  branch: StoryBranch;
  show: boolean;
  onClose: () => void;
}

export default function StoryBranchNotification({
  branch,
  show,
  onClose,
}: StoryBranchNotificationProps) {
  const branchInfo = getBranchInfo(branch);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative max-w-2xl w-full p-10 bg-black border-2 border-white/20 rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated background */}
            <div
              className={`absolute inset-0 bg-linear-to-br ${branchInfo.color} opacity-20`}
            />

            {/* Decorative particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, "-100%"],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-6">
              {/* Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-xl rounded-full"
              >
                <span className="text-white/80 text-sm font-bold uppercase tracking-widest">
                  Nhánh Câu chuyện Mới
                </span>
              </motion.div>

              {/* Icon */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-8xl"
              >
                {branchInfo.icon}
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-5xl font-black bg-linear-to-r ${branchInfo.color} bg-clip-text text-transparent`}
              >
                {branchInfo.name}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-300 leading-relaxed max-w-lg mx-auto"
              >
                {branchInfo.description}
              </motion.p>

              {/* Divider */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className={`h-1 bg-linear-to-r ${branchInfo.color} mx-auto`}
                style={{ maxWidth: "200px" }}
              />

              {/* Info text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <p className="text-gray-400 text-base">
                  Chiến lược của bạn đã định hình hướng đi của câu chuyện.
                </p>
                <p className="text-white/90 text-sm font-semibold">
                  Các vòng tiếp theo sẽ có scenario phù hợp với con đường này!
                </p>
              </motion.div>

              {/* Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className={`px-12 py-4 bg-linear-to-r ${branchInfo.color} text-white text-lg font-bold rounded-full shadow-lg transition-all`}
              >
                Tiếp tục hành trình →
              </motion.button>
            </div>

            {/* Close hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-4 left-0 right-0 text-center"
            >
              <span className="text-xs text-gray-500">
                Nhấn ESC hoặc click bên ngoài để đóng
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
