import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type {
  GameState,
  Role,
  Choice,
  Metrics,
  Difficulty,
  Streak,
  RandomEvent,
  MentorType,
  PowerUpType,
} from "../types/game";
import { ROLES, TOTAL_ROUNDS, getShuffledRounds } from "../config/gameConfig";
import { getRandomEvent } from "../config/eventsConfig";
import { checkAchievements } from "../config/achievementsConfig";
import { generateMediaHeadline } from "../config/mediaConfig";
import { MENTORS } from "../config/mentorsConfig";
import { determineStoryBranch } from "../config/storyBranchesConfig";

interface GameContextType {
  gameState: GameState | null;
  startGame: (role: Role, difficulty?: Difficulty, mentor?: MentorType) => void;
  makeChoice: (choice: Choice) => void;
  resetGame: () => void;
  isGameStarted: boolean;
  usePowerUp: (powerUpType: PowerUpType) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  // Load saved achievements from localStorage on mount
  const loadSavedAchievements = useCallback(() => {
    try {
      const saved = localStorage.getItem("gameAchievements");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load achievements:", error);
      return [];
    }
  }, []);

  // Save achievements to localStorage
  const saveAchievements = useCallback((achievements: string[]) => {
    try {
      localStorage.setItem("gameAchievements", JSON.stringify(achievements));
    } catch (error) {
      console.error("Failed to save achievements:", error);
    }
  }, []);

  const startGame = useCallback(
    (role: Role, difficulty: Difficulty = "normal", mentor?: MentorType) => {
      const roleConfig = ROLES[role];
      if (!roleConfig) {
        console.error("Invalid role:", role);
        return;
      }

      // Load saved achievements
      const savedAchievements = loadSavedAchievements();

      // Shuffle rounds once at game start (fixed for entire game)
      const shuffledRounds = getShuffledRounds(role);

      // Apply mentor boost if selected
      const initialMetrics = { ...roleConfig.initialMetrics };
      if (mentor) {
        const mentorConfig = MENTORS[mentor];
        Object.keys(mentorConfig.boost).forEach((key) => {
          const metricKey = key as keyof Metrics;
          initialMetrics[metricKey] =
            (initialMetrics[metricKey] || 0) +
            (mentorConfig.boost[metricKey] || 0);
        });
      }

      const initialState: GameState = {
        role,
        currentRound: 1,
        totalRounds: TOTAL_ROUNDS,
        metrics: initialMetrics,
        history: [],
        isGameOver: false,
        difficulty,
        streaks: {},
        achievements: savedAchievements, // Use saved achievements from localStorage
        eventsHistory: [],
        comboMultiplier: 1.0,
        mentor,
        powerUpsUsed: [],
        mediaHeadlines: [],
        shuffledRounds, // Store shuffled rounds for entire game
      };

      setGameState(initialState);
    },
    [loadSavedAchievements]
  );

  // Helper: Calculate cross-metric effects (metrics affect each other)
  const applyCrossEffects = (metrics: Metrics): Metrics => {
    const newMetrics = { ...metrics };

    // Revenue quá cao có thể giảm fairness (greed)
    if (newMetrics.revenue > 85) {
      newMetrics.fairness = Math.max(0, newMetrics.fairness - 3);
    }

    // Innovation cao tăng revenue sau thời gian
    if (newMetrics.innovation > 80) {
      newMetrics.revenue = Math.min(100, newMetrics.revenue + 2);
    }

    // UserTrust cao giúp tăng revenue
    if (newMetrics.userTrust > 80) {
      newMetrics.revenue = Math.min(100, newMetrics.revenue + 3);
    }

    // Fairness thấp làm giảm publicWelfare
    if (newMetrics.fairness < 40) {
      newMetrics.publicWelfare = Math.max(0, newMetrics.publicWelfare - 2);
    }

    // PublicWelfare cao giúp tăng userTrust
    if (newMetrics.publicWelfare > 75) {
      newMetrics.userTrust = Math.min(100, newMetrics.userTrust + 2);
    }

    return newMetrics;
  };

  // Helper: Update streaks based on choice tags
  const updateStreaks = (
    currentStreaks: Record<string, Streak>,
    choice: Choice
  ): Record<string, Streak> => {
    const newStreaks = { ...currentStreaks };

    // Determine dominant tag from effects
    let dominantTag = "balanced";
    if (choice.effects.innovation && choice.effects.innovation > 10) {
      dominantTag = "innovation";
    } else if (choice.effects.revenue && choice.effects.revenue > 10) {
      dominantTag = "aggressive";
    } else if (choice.riskLevel === "low") {
      dominantTag = "defensive";
    } else if (choice.effects.fairness && choice.effects.fairness > 10) {
      dominantTag = "ethical";
    }

    // Update streak for dominant tag
    if (newStreaks[dominantTag]) {
      newStreaks[dominantTag].count += 1;
    } else {
      newStreaks[dominantTag] = {
        type: dominantTag,
        count: 1,
        bonusApplied: false,
      };
    }

    // Reset other streaks
    Object.keys(newStreaks).forEach((key) => {
      if (key !== dominantTag) {
        newStreaks[key] = { type: key, count: 0, bonusApplied: false };
      }
    });

    return newStreaks;
  };

  // Helper: Calculate combo multiplier based on streaks (Enhanced System)
  const calculateComboMultiplier = (
    streaks: Record<string, Streak>
  ): number => {
    const maxStreak = Math.max(
      ...Object.values(streaks).map((s) => s.count),
      0
    );

    // Enhanced multiplier system: x1.0 → x1.2 → x1.5 → x2.0 → x3.0
    if (maxStreak >= 5) return 3.0; // LEGENDARY COMBO!
    if (maxStreak >= 4) return 2.0; // MEGA COMBO!
    if (maxStreak >= 3) return 1.5; // SUPER COMBO!
    if (maxStreak >= 2) return 1.2; // COMBO!
    return 1.0; // Normal
  };

  const calculateMetricsAfterChoice = (
    currentMetrics: Metrics,
    choiceEffects: Partial<Metrics>,
    comboMultiplier: number,
    difficulty: Difficulty
  ): Metrics => {
    const newMetrics = { ...currentMetrics };

    // Difficulty modifier
    const difficultyMod =
      difficulty === "easy" ? 1.2 : difficulty === "hard" ? 0.8 : 1.0;

    // Áp dụng effects từ choice với combo multiplier
    Object.keys(choiceEffects).forEach((key) => {
      const metricKey = key as keyof Metrics;
      const effect = choiceEffects[metricKey];
      if (effect !== undefined) {
        const modifiedEffect = effect * comboMultiplier * difficultyMod;
        newMetrics[metricKey] = Math.max(
          0,
          Math.min(100, newMetrics[metricKey] + modifiedEffect)
        );
      }
    });

    // Apply cross-effects
    return applyCrossEffects(newMetrics);
  };

  const makeChoice = useCallback(
    (choice: Choice) => {
      if (!gameState || gameState.isGameOver) return;

      // Update streaks
      const newStreaks = updateStreaks(gameState.streaks, choice);
      const newComboMultiplier = calculateComboMultiplier(newStreaks);

      // Tính toán metrics mới
      let newMetrics = calculateMetricsAfterChoice(
        gameState.metrics,
        choice.effects,
        newComboMultiplier,
        gameState.difficulty
      );

      // Check for random event (30% chance)
      const randomRoll = Math.random();
      let triggeredEvent: RandomEvent | null = null;

      // Check if Regulatory Shield is active (blocks negative events)
      const hasShield =
        gameState.activePowerUps?.shieldRoundsLeft &&
        gameState.activePowerUps.shieldRoundsLeft > 0;

      if (randomRoll < 0.3) {
        const tempState: GameState = {
          ...gameState,
          metrics: newMetrics,
          streaks: newStreaks,
          comboMultiplier: newComboMultiplier,
        };
        triggeredEvent = getRandomEvent(tempState);

        // Apply event effects ONLY if not blocked by shield
        if (triggeredEvent && triggeredEvent.effects) {
          // Check if event is negative (has any negative effects)
          const isNegativeEvent = Object.values(triggeredEvent.effects).some(
            (value) => typeof value === "number" && value < 0
          );

          // Block negative events if shield is active
          if (isNegativeEvent && hasShield) {
            console.log(
              "🛡️ Regulatory Shield blocked negative event:",
              triggeredEvent.title
            );
            // Create a positive notification event instead
            triggeredEvent = {
              id: "shield_block",
              title: "🛡️ Shield Activated!",
              description: `Regulatory Shield đã chặn sự kiện tiêu cực: "${triggeredEvent.title}". Bạn được bảo vệ!`,
              type: "positive",
              effects: {},
              probability: 1.0,
            };
          } else {
            // Apply event effects normally
            Object.keys(triggeredEvent.effects).forEach((key) => {
              const metricKey = key as keyof Metrics;
              const effect = triggeredEvent!.effects![metricKey];
              if (effect !== undefined) {
                newMetrics[metricKey] = Math.max(
                  0,
                  Math.min(100, newMetrics[metricKey] + effect)
                );
              }
            });
          }
        }
      }

      // Generate media headline
      const mediaHeadline = generateMediaHeadline(
        gameState.role,
        gameState.currentRound,
        choice,
        newMetrics
      );
      const newMediaHeadlines = [...gameState.mediaHeadlines, mediaHeadline];

      // Update events history
      const newEventsHistory = triggeredEvent
        ? [...gameState.eventsHistory, triggeredEvent]
        : gameState.eventsHistory;

      // Check nếu hết vòng chơi
      const isLastRound = gameState.currentRound >= gameState.totalRounds;

      // Determine story branch after round 2
      let storyBranch = gameState.storyBranch;
      if (gameState.currentRound === 2 && !storyBranch) {
        // Create temporary state to analyze
        const tempState: GameState = {
          ...gameState,
          currentRound: gameState.currentRound,
          history: [
            ...gameState.history,
            {
              round: gameState.currentRound,
              choice,
              metricsAfter: newMetrics,
              eventTriggered: triggeredEvent || undefined,
              mediaHeadline,
            },
          ],
        };
        storyBranch = determineStoryBranch(tempState);
      }

      // Update activePowerUps for next round
      const updatedActivePowerUps = { ...gameState.activePowerUps };

      // Reset market insight after use (one-time per activation)
      if (updatedActivePowerUps.marketInsightActive) {
        updatedActivePowerUps.marketInsightActive = false;
      }

      // Decrease shield rounds counter
      if (
        updatedActivePowerUps.shieldRoundsLeft &&
        updatedActivePowerUps.shieldRoundsLeft > 0
      ) {
        updatedActivePowerUps.shieldRoundsLeft -= 1;
      }

      // Reset time bonus (already consumed)
      if (updatedActivePowerUps.timeBonus) {
        updatedActivePowerUps.timeBonus = 0;
      }

      // Create new state
      const newState: GameState = {
        ...gameState,
        currentRound: isLastRound
          ? gameState.currentRound
          : gameState.currentRound + 1,
        metrics: newMetrics,
        history: [
          ...gameState.history,
          {
            round: gameState.currentRound,
            choice,
            metricsAfter: newMetrics,
            eventTriggered: triggeredEvent || undefined,
            mediaHeadline,
          },
        ],
        isGameOver: isLastRound,
        streaks: newStreaks,
        comboMultiplier: newComboMultiplier,
        eventsHistory: newEventsHistory,
        achievements: gameState.achievements,
        mediaHeadlines: newMediaHeadlines,
        mentor: gameState.mentor,
        powerUpsUsed: gameState.powerUpsUsed,
        storyBranch: storyBranch, // Update story branch
        activePowerUps: updatedActivePowerUps, // Update power-ups state
      };

      // Check achievements
      const newAchievements = checkAchievements(newState);
      if (newAchievements.length > 0) {
        newState.achievements = [...newState.achievements, ...newAchievements];
        // Save achievements to localStorage
        saveAchievements(newState.achievements);
      }

      setGameState(newState);
    },
    [gameState, saveAchievements]
  );

  const resetGame = useCallback(() => {
    // Keep achievements when resetting game
    const savedAchievements =
      gameState?.achievements || loadSavedAchievements();
    if (savedAchievements.length > 0) {
      saveAchievements(savedAchievements);
    }
    setGameState(null);
  }, [gameState, loadSavedAchievements, saveAchievements]);

  const usePowerUp = useCallback(
    (powerUpType: PowerUpType) => {
      if (!gameState || gameState.isGameOver) return;

      // LIMIT: Only 1 power-up per game
      if (gameState.powerUpsUsed.length > 0) {
        console.warn(
          "Only 1 power-up allowed per game. Already used:",
          gameState.powerUpsUsed[0]
        );
        return;
      }

      // Check if this specific power-up was already used (redundant but safe)
      if (gameState.powerUpsUsed.includes(powerUpType)) {
        console.warn("Power-up already used:", powerUpType);
        return;
      }

      // Apply power-up effects
      const newMetrics = { ...gameState.metrics };
      const activePowerUps = { ...gameState.activePowerUps };

      switch (powerUpType) {
        case "market_insight":
          // Enable insight mode - will show all choice impacts in UI
          activePowerUps.marketInsightActive = true;
          // Boost all primary metrics by 3 points
          const roleConfig = ROLES[gameState.role];
          roleConfig.primaryMetrics.forEach((metric) => {
            newMetrics[metric] = Math.min(100, newMetrics[metric] + 3);
          });
          break;
        case "strategic_pause":
          // Add 30 seconds (handled in GamePage)
          activePowerUps.timeBonus = 30;
          // Boost all metrics
          Object.keys(newMetrics).forEach((key) => {
            const metricKey = key as keyof Metrics;
            newMetrics[metricKey] = Math.min(100, newMetrics[metricKey] + 5);
          });
          break;
        case "regulatory_shield":
          // Activate shield for 2 rounds
          activePowerUps.shieldRoundsLeft = 2;
          // Boost fairness and public welfare significantly
          newMetrics.fairness = Math.min(100, newMetrics.fairness + 8);
          newMetrics.publicWelfare = Math.min(
            100,
            newMetrics.publicWelfare + 5
          );
          break;
      }

      // Add to used list, update metrics and active power-ups
      setGameState({
        ...gameState,
        metrics: newMetrics,
        powerUpsUsed: [...gameState.powerUpsUsed, powerUpType],
        activePowerUps,
      });
    },
    [gameState]
  );

  const isGameStarted = gameState !== null;

  return (
    <GameContext.Provider
      value={{
        gameState,
        startGame,
        makeChoice,
        resetGame,
        isGameStarted,
        usePowerUp,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
