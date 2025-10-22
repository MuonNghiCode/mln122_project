import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../contexts/GameContext";
import type { Choice, RandomEvent } from "../types/game";
import { ROLES } from "../config/gameConfig";
import ComboIndicator from "../components/ComboIndicator";
import MediaHeadline from "../components/MediaHeadline";
import StoryBranchNotification from "../components/StoryBranchNotification";
import { MENTORS } from "../config/mentorsConfig";
import { getMentorAdvice } from "../config/mentorsConfig";
import { POWER_UPS, getAvailablePowerUps } from "../config/powerUpsConfig";

const GamePage = () => {
  const navigate = useNavigate();
  const { gameState, makeChoice, isGameStarted, usePowerUp } = useGame();
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<RandomEvent | null>(null);
  const [showMentorAdvice, setShowMentorAdvice] = useState(false);
  const [mentorAdvice, setMentorAdvice] = useState<string>("");
  const [showStoryBranch, setShowStoryBranch] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45); // 45 seconds timer
  const [timerActive, setTimerActive] = useState(true);

  // Timer countdown
  useEffect(() => {
    if (!timerActive || showConfirm || showEvent || showMentorAdvice) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Auto-select random choice when time runs out
      if (currentRound && !selectedChoice) {
        const randomChoice =
          currentRound.choices[
            Math.floor(Math.random() * currentRound.choices.length)
          ];
        handleChoiceClick(randomChoice);
        setTimeout(() => handleConfirm(), 500);
      }
    }
  }, [timeLeft, timerActive, showConfirm, showEvent, showMentorAdvice]);

  // Reset timer on round change
  useEffect(() => {
    setTimeLeft(45);
    setTimerActive(true);
  }, [gameState?.currentRound]);

  useEffect(() => {
    if (!isGameStarted || !gameState) {
      navigate("/role-select");
    }
  }, [isGameStarted, gameState, navigate]);

  useEffect(() => {
    if (gameState?.isGameOver) {
      // Chuyển sang trang kết quả sau 1s
      setTimeout(() => {
        navigate("/result");
      }, 1000);
    }
  }, [gameState?.isGameOver, navigate]);

  if (!gameState) return null;

  // Use shuffled rounds stored in gameState (shuffled once at game start)
  const rounds = gameState.shuffledRounds || [];
  const currentRound = rounds[gameState.currentRound - 1];
  const roleConfig = ROLES[gameState.role];
  const progress = (gameState.currentRound / gameState.totalRounds) * 100;

  // Role color theme
  const getRoleTheme = () => {
    switch (gameState.role) {
      case "smallbiz":
        return {
          primary: "from-blue-500 to-cyan-400",
          glow: "rgba(59, 130, 246, 0.5)",
          text: "text-blue-400",
          border: "border-blue-500/30",
          bg: "bg-blue-500/5",
        };
      case "platform":
        return {
          primary: "from-purple-500 to-pink-400",
          glow: "rgba(168, 85, 247, 0.5)",
          text: "text-purple-400",
          border: "border-purple-500/30",
          bg: "bg-purple-500/5",
        };
      case "regulator":
        return {
          primary: "from-orange-500 to-amber-400",
          glow: "rgba(249, 115, 22, 0.5)",
          text: "text-orange-400",
          border: "border-orange-500/30",
          bg: "bg-orange-500/5",
        };
      default:
        return {
          primary: "from-gray-500 to-gray-400",
          glow: "rgba(156, 163, 175, 0.5)",
          text: "text-gray-400",
          border: "border-gray-500/30",
          bg: "bg-gray-500/5",
        };
    }
  };

  const theme = getRoleTheme();

  // Check for events after choice
  useEffect(() => {
    if (gameState && gameState.history.length > 0) {
      const lastHistory = gameState.history[gameState.history.length - 1];
      if (lastHistory.eventTriggered && !showEvent) {
        setCurrentEvent(lastHistory.eventTriggered);
        setShowEvent(true);
      }
    }
  }, [gameState?.history]);

  // Check for mentor advice
  useEffect(() => {
    if (
      gameState?.mentor &&
      gameState.currentRound > 1 &&
      gameState.currentRound % 2 === 0
    ) {
      const advice = getMentorAdvice(gameState.mentor);
      if (advice) {
        setMentorAdvice(advice);
        setShowMentorAdvice(true);
      }
    }
  }, [gameState?.currentRound]);

  // Check for story branch reveal (round 3)
  useEffect(() => {
    if (
      gameState?.storyBranch &&
      gameState.currentRound === 3 &&
      !showStoryBranch
    ) {
      setShowStoryBranch(true);
    }
  }, [gameState?.storyBranch, gameState?.currentRound]);

  // Handle time bonus from strategic pause power-up
  useEffect(() => {
    if (
      gameState?.activePowerUps?.timeBonus &&
      gameState.activePowerUps.timeBonus > 0
    ) {
      setTimeLeft((prev) => prev + gameState.activePowerUps!.timeBonus!);
      // Note: bonus will be cleared in next round
    }
  }, [gameState?.activePowerUps?.timeBonus]);

  const handleChoiceClick = (choice: Choice) => {
    setSelectedChoice(choice);
    setShowConfirm(true);
    setTimerActive(false); // Pause timer when reviewing choice
  };

  const handleConfirm = () => {
    if (selectedChoice) {
      makeChoice(selectedChoice);
      setSelectedChoice(null);
      setShowConfirm(false);
      setTimerActive(true); // Resume timer after choice
    }
  };

  const handleEventClose = () => {
    setShowEvent(false);
    setCurrentEvent(null);
  };

  const handleCancel = () => {
    setSelectedChoice(null);
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background - matching other pages */}
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

      {/* Combo Indicator - Fixed top-right */}
      {gameState.comboMultiplier > 1.0 && (
        <ComboIndicator
          comboMultiplier={gameState.comboMultiplier}
          maxStreak={Math.max(
            ...Object.values(gameState.streaks).map((s) => s.count)
          )}
        />
      )}

      {/* Story Branch Notification */}
      {gameState.storyBranch && (
        <StoryBranchNotification
          branch={gameState.storyBranch}
          show={showStoryBranch}
          onClose={() => setShowStoryBranch(false)}
        />
      )}

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-900/50 z-50">
        <motion.div
          className={`h-full bg-linear-to-r ${theme.primary}`}
          style={{
            width: `${progress}%`,
            boxShadow: `0 0 20px ${theme.glow}`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Main content - Responsive layout */}
      <div className="relative z-10 min-h-screen flex flex-col py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8">
        {/* Compact header - Responsive */}
        <div className="mb-4 sm:mb-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 md:gap-8"
            >
              {/* Role name - compact */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <div>
                  <span className="text-gray-500 text-[10px] sm:text-xs font-light tracking-wider uppercase block mb-1">
                    Vai trò
                  </span>
                  <h1
                    className={`text-xl sm:text-2xl md:text-3xl font-black bg-linear-to-r ${theme.primary} bg-clip-text text-transparent`}
                  >
                    {roleConfig.name}
                  </h1>
                </div>

                {/* Action buttons - Hidden on mobile, shown on tablet+ */}
                <div className="hidden sm:flex gap-2">
                  <button
                    onClick={() => navigate("/role-select")}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-white transition-all duration-300"
                  >
                    Đổi vai trò
                  </button>
                  <button
                    onClick={() => navigate("/rules")}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-white transition-all duration-300"
                  >
                    Luật
                  </button>
                </div>
              </div>

              {/* Metrics - Responsive grid, show primary on mobile */}
              <div className="grid grid-cols-3 sm:flex sm:flex-wrap lg:flex-nowrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-full sm:w-auto">
                {Object.entries(gameState.metrics).map(([key, value]) => {
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

                  // On mobile, only show primary metrics
                  const showOnMobile = isPrimary;

                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`relative flex flex-col items-center ${
                        !showOnMobile ? "hidden sm:flex" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-0.5 sm:mb-1">
                        <span
                          className={`text-[9px] sm:text-[10px] md:text-xs font-light uppercase tracking-wider ${
                            isPrimary ? theme.text : "text-gray-500"
                          }`}
                        >
                          {metricLabels[key]}
                        </span>
                        {isPrimary && (
                          <div
                            className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-linear-to-r ${theme.primary}`}
                            style={{ boxShadow: `0 0 6px ${theme.glow}` }}
                          />
                        )}
                      </div>
                      <motion.span
                        key={value}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={`text-lg sm:text-xl md:text-2xl font-bold ${
                          isPrimary ? theme.text : "text-gray-400"
                        }`}
                      >
                        {value}
                      </motion.span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Round number & Timer - compact */}
              <div className="text-right">
                <span className="text-gray-500 text-[10px] sm:text-xs font-light tracking-wider uppercase block mb-0.5 sm:mb-1">
                  Vòng
                </span>
                <div className="flex items-baseline gap-1 sm:gap-2 mb-2">
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    {gameState.currentRound}
                  </span>
                  <span className="text-base sm:text-lg md:text-xl text-gray-600 font-light">
                    /{gameState.totalRounds}
                  </span>
                </div>
                {/* Timer Display */}
                <div
                  className={`flex items-center gap-2 px-3 py-1 border backdrop-blur-sm ${
                    timeLeft <= 10
                      ? "border-red-500/50 bg-red-900/20"
                      : timeLeft <= 20
                      ? "border-amber-500/50 bg-amber-900/20"
                      : "border-white/20 bg-white/5"
                  }`}
                >
                  <span className="text-[10px] sm:text-xs text-gray-400 uppercase">
                    Thời gian
                  </span>
                  <span
                    className={`text-xl sm:text-2xl font-black ${
                      timeLeft <= 10
                        ? "text-red-400"
                        : timeLeft <= 20
                        ? "text-amber-400"
                        : "text-white"
                    }`}
                  >
                    {timeLeft}s
                  </span>
                </div>

                {/* Shield Indicator */}
                {gameState?.activePowerUps?.shieldRoundsLeft &&
                  gameState.activePowerUps.shieldRoundsLeft > 0 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      className="flex items-center gap-2 px-3 py-1 border border-cyan-500/50 bg-cyan-900/20 backdrop-blur-sm mt-2"
                    >
                      <span className="text-xl">🛡️</span>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-cyan-400 uppercase font-bold">
                          Shield Active
                        </span>
                        <span className="text-xs text-cyan-300">
                          {gameState.activePowerUps.shieldRoundsLeft} rounds
                          left
                        </span>
                      </div>
                    </motion.div>
                  )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Streak & Combo indicators */}
        {(gameState.comboMultiplier > 1.0 ||
          Object.values(gameState.streaks).some((s) => s.count > 0)) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto mb-4 px-4"
          >
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 justify-center">
              {/* Combo multiplier */}
              {gameState.comboMultiplier > 1.0 && (
                <div
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 border ${theme.border} ${theme.bg} backdrop-blur-sm`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider">
                      Combo
                    </span>
                    <span
                      className={`text-base sm:text-xl font-black ${theme.text}`}
                    >
                      x{gameState.comboMultiplier.toFixed(1)}
                    </span>
                  </div>
                </div>
              )}

              {/* Active streak - Only show the highest one */}
              {(() => {
                const activeStreaks = Object.entries(gameState.streaks)
                  .filter(([_, streak]) => streak.count > 0)
                  .sort((a, b) => b[1].count - a[1].count);

                if (activeStreaks.length === 0) return null;

                const [type, streak] = activeStreaks[0];
                return (
                  <div
                    key={type}
                    className={`px-4 py-2 border ${theme.border} ${theme.bg} backdrop-blur-sm`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs uppercase tracking-wider">
                        {type === "innovation" && "Đổi mới"}
                        {type === "aggressive" && "Tấn công"}
                        {type === "defensive" && "Phòng thủ"}
                        {type === "ethical" && "Đạo đức"}
                        {type === "balanced" && "Cân bằng"}
                      </span>
                      <span className={`text-lg font-bold ${theme.text}`}>
                        {streak.count} 🔥
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Mentor Info - Inline */}
              {gameState.mentor && (
                <div className="flex items-center gap-2 px-4 py-2 border border-amber-500/30 bg-amber-900/10 backdrop-blur-sm">
                  <span className="text-gray-400 text-xs uppercase tracking-wider">
                    Cố vấn:
                  </span>
                  <span className="text-sm font-bold text-amber-400">
                    {MENTORS[gameState.mentor].name}
                  </span>
                </div>
              )}

              {/* Power-ups - Inline */}
              {getAvailablePowerUps(gameState.achievements).map(
                (powerUpType) => {
                  const powerUp = POWER_UPS[powerUpType];
                  const isUsed = gameState.powerUpsUsed.includes(powerUpType);
                  const anyPowerUpUsed = gameState.powerUpsUsed.length > 0;
                  const isDisabled = isUsed || anyPowerUpUsed;

                  const getIcon = (type: string) => {
                    if (type === "market_insight") return "🔍";
                    if (type === "strategic_pause") return "⏸️";
                    if (type === "regulatory_shield") return "🛡️";
                    return "⚡";
                  };

                  return (
                    <motion.button
                      key={powerUpType}
                      whileHover={!isDisabled ? { scale: 1.05 } : {}}
                      onClick={() =>
                        !isDisabled && usePowerUp && usePowerUp(powerUpType)
                      }
                      disabled={isDisabled}
                      className={`px-3 py-2 border backdrop-blur-sm transition-all ${
                        isDisabled
                          ? "bg-gray-800/50 border-gray-700 text-gray-600 cursor-not-allowed"
                          : "bg-cyan-900/20 border-cyan-500/50 text-cyan-400 hover:bg-cyan-900/40 cursor-pointer"
                      }`}
                      title={
                        anyPowerUpUsed && !isUsed
                          ? "Chỉ được dùng 1 power-up mỗi game"
                          : powerUp.description
                      }
                    >
                      <div className="flex items-center gap-1">
                        <span className="text-base">
                          {getIcon(powerUpType)}
                        </span>
                        <span className="text-xs font-bold">
                          {powerUp.name}
                        </span>
                      </div>
                    </motion.button>
                  );
                }
              )}
            </div>
          </motion.div>
        )}

        {/* Latest Media Headline */}
        {gameState.mediaHeadlines && gameState.mediaHeadlines.length > 0 && (
          <motion.div
            key={`media-${gameState.mediaHeadlines.length}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto mb-4"
          >
            <MediaHeadline
              headline={
                gameState.mediaHeadlines[gameState.mediaHeadlines.length - 1]
              }
              index={gameState.mediaHeadlines.length - 1}
            />
          </motion.div>
        )}

        {/* Scenario - Compact center */}
        <div className="mb-6">
          <motion.div
            key={`scenario-${gameState.currentRound}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-7xl mx-auto"
          >
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-16 h-16 border-l border-t border-white/10" />
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-r border-b border-white/10" />

              <div className="p-6 sm:p-8 backdrop-blur-xl bg-white/2 border border-white/5">
                <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-200 leading-relaxed text-center">
                  {currentRound?.scenario}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Choices - Compact grid with all info visible */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-7xl mx-auto h-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 h-full">
              <AnimatePresence mode="wait">
                {currentRound?.choices.map((choice, index) => {
                  const isSelected = selectedChoice?.id === choice.id;

                  return (
                    <motion.button
                      key={choice.id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      onClick={() => handleChoiceClick(choice)}
                      disabled={showConfirm}
                      className="relative group text-left p-4 sm:p-6 transition-all duration-300 disabled:opacity-50"
                      style={{
                        background: isSelected
                          ? `linear-gradient(135deg, ${theme.glow.replace(
                              "0.5",
                              "0.08"
                            )}, transparent)`
                          : "transparent",
                      }}
                    >
                      {/* Border */}
                      <div
                        className={`absolute inset-0 border transition-all duration-300 ${
                          isSelected
                            ? `${theme.border} opacity-100`
                            : "border-white/5 opacity-100 group-hover:border-white/15"
                        }`}
                      />

                      {/* Choice letter - smaller */}
                      <div className="relative mb-2 sm:mb-3">
                        <span
                          className={`text-3xl sm:text-4xl md:text-5xl font-black transition-all duration-300 ${
                            isSelected
                              ? `bg-linear-to-r ${theme.primary} bg-clip-text text-transparent`
                              : "text-gray-900 group-hover:text-gray-800"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </span>
                      </div>

                      {/* Choice title */}
                      <div className="relative mb-2">
                        <h3
                          className={`text-base sm:text-lg md:text-xl font-bold transition-colors duration-300 ${
                            isSelected
                              ? theme.text
                              : "text-gray-500 group-hover:text-gray-300"
                          }`}
                        >
                          {choice.title}
                        </h3>
                      </div>

                      {/* Choice description */}
                      <div className="relative">
                        <p
                          className={`text-base font-light leading-relaxed transition-colors duration-300 ${
                            isSelected
                              ? "text-gray-300"
                              : "text-gray-600 group-hover:text-gray-400"
                          }`}
                        >
                          {choice.description}
                        </p>
                      </div>

                      {/* Market Insight Preview - Show when power-up is active */}
                      {gameState?.activePowerUps?.marketInsightActive && (
                        <div className="relative mt-3 pt-3 border-t border-white/10">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-cyan-400">
                              🔮 MARKET INSIGHT
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {Object.entries(choice.effects).map(
                              ([metric, value]) => {
                                const numValue =
                                  typeof value === "number" ? value : 0;
                                const isPositive = numValue > 0;
                                const isNegative = numValue < 0;

                                return (
                                  <div
                                    key={metric}
                                    className={`flex items-center justify-between px-2 py-1 rounded ${
                                      isPositive
                                        ? "bg-green-500/10 text-green-400"
                                        : isNegative
                                        ? "bg-red-500/10 text-red-400"
                                        : "bg-gray-500/10 text-gray-400"
                                    }`}
                                  >
                                    <span className="capitalize font-medium">
                                      {metric.replace(/([A-Z])/g, " $1").trim()}
                                    </span>
                                    <span className="font-bold">
                                      {isPositive ? "+" : ""}
                                      {numValue}
                                    </span>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}

                      {/* Selected indicator */}
                      {isSelected && (
                        <motion.div
                          layoutId="selected-choice"
                          className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${theme.primary}`}
                          style={{ boxShadow: `0 0 16px ${theme.glow}` }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && selectedChoice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={handleCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl mx-8 p-12 backdrop-blur-xl bg-white/2 border border-white/10"
            >
              {/* Decorative corners */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l border-t border-white/20" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-white/20" />

              <div className="relative">
                <h3 className="text-4xl font-light text-white mb-6 tracking-wide">
                  Xác nhận lựa chọn
                </h3>
                <p className="text-xl text-gray-400 mb-3 font-light">
                  Bạn đã chọn:
                </p>
                <p className={`text-3xl font-bold ${theme.text} mb-8`}>
                  {selectedChoice.title}
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-8 py-4 bg-transparent border border-white/20 text-white text-lg font-light tracking-wider uppercase hover:bg-white/5 transition-all duration-300"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={handleConfirm}
                    className={`flex-1 px-8 py-4 bg-linear-to-r ${theme.primary} text-white text-lg font-light tracking-wider uppercase transition-all duration-300`}
                    style={{ boxShadow: `0 8px 32px ${theme.glow}` }}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Random Event Modal */}
      <AnimatePresence>
        {showEvent && currentEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={handleEventClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl mx-8 p-12 backdrop-blur-xl bg-white/2 border border-white/10"
            >
              {/* Decorative corners */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l border-t border-white/20" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-white/20" />

              <div className="relative">
                {/* Event type indicator */}
                <div
                  className={`inline-block px-4 py-1 mb-4 border ${
                    currentEvent.type === "positive"
                      ? "border-green-500/30 bg-green-500/10 text-green-400"
                      : currentEvent.type === "negative"
                      ? "border-red-500/30 bg-red-500/10 text-red-400"
                      : "border-blue-500/30 bg-blue-500/10 text-blue-400"
                  } text-xs uppercase tracking-wider`}
                >
                  {currentEvent.type === "positive" && "Sự kiện tích cực"}
                  {currentEvent.type === "negative" && "Sự kiện tiêu cực"}
                  {currentEvent.type === "neutral" && "Sự kiện trung lập"}
                </div>

                <h3 className="text-4xl font-light text-white mb-4 tracking-wide">
                  {currentEvent.title}
                </h3>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {currentEvent.description}
                </p>

                {/* Show effects if any */}
                {currentEvent.effects &&
                  Object.keys(currentEvent.effects).length > 0 && (
                    <div className="mb-8 p-6 border border-white/10 bg-white/5">
                      <p className="text-sm text-gray-400 uppercase tracking-wider mb-3">
                        Tác động:
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(currentEvent.effects).map(
                          ([key, value]) => {
                            const metricLabels: Record<string, string> = {
                              revenue: "Doanh thu",
                              marketShare: "Thị phần",
                              userTrust: "Niềm tin",
                              innovation: "Đổi mới",
                              publicWelfare: "Phúc lợi",
                              fairness: "Công bằng",
                            };

                            return (
                              <div
                                key={key}
                                className="flex items-center gap-2"
                              >
                                <span className="text-gray-400 text-sm">
                                  {metricLabels[key]}:
                                </span>
                                <span
                                  className={`text-lg font-bold ${
                                    value! > 0
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  {value! > 0 ? "+" : ""}
                                  {value}
                                </span>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}

                <button
                  onClick={handleEventClose}
                  className={`w-full px-8 py-4 bg-linear-to-r ${theme.primary} text-white text-lg font-light tracking-wider uppercase transition-all duration-300`}
                  style={{ boxShadow: `0 8px 32px ${theme.glow}` }}
                >
                  Tiếp tục
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mentor Advice Modal */}
      <AnimatePresence>
        {showMentorAdvice && mentorAdvice && gameState.mentor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setShowMentorAdvice(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl mx-8 p-12 backdrop-blur-xl bg-linear-to-br from-amber-900/20 to-orange-900/20 border border-amber-500/30"
            >
              {/* Decorative corners */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l border-t border-amber-400/40" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-amber-400/40" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  {/* <div className="text-4xl">
                    {gameState.mentor === 'economist' && '📊'}
                    {gameState.mentor === 'tech_expert' && '💻'}
                    {gameState.mentor === 'policy_maker' && '⚖️'}
                  </div> */}
                  <div>
                    <p className="text-sm text-amber-400 uppercase tracking-wider">
                      Lời khuyên từ cố vấn
                    </p>
                    <h3 className="text-2xl font-bold text-amber-300">
                      {MENTORS[gameState.mentor].name}
                    </h3>
                  </div>
                </div>

                <p className="text-xl text-gray-200 mb-8 leading-relaxed italic">
                  "{mentorAdvice}"
                </p>

                <button
                  onClick={() => setShowMentorAdvice(false)}
                  className="w-full px-8 py-4 bg-linear-to-r from-amber-500 to-orange-500 text-white text-lg font-light tracking-wider uppercase transition-all duration-300 hover:from-amber-600 hover:to-orange-600"
                >
                  Cảm ơn
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamePage;
