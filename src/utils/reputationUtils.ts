import type { ReputationData, ReputationRank } from '../types/game';

const REPUTATION_STORAGE_KEY = 'gameReputation';

// Get reputation rank based on points
export const getReputationRank = (points: number): ReputationRank => {
  if (points >= 600) return 'legendary';
  if (points >= 300) return 'respected';
  if (points >= 100) return 'known';
  return 'unknown';
};

// Load reputation from localStorage
export const loadReputation = (): ReputationData => {
  try {
    const saved = localStorage.getItem(REPUTATION_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load reputation:', error);
  }
  
  // Default reputation
  return {
    points: 0,
    rank: 'unknown',
    totalGamesPlayed: 0,
    bestScore: 0,
  };
};

// Save reputation to localStorage
export const saveReputation = (reputation: ReputationData): void => {
  try {
    localStorage.setItem(REPUTATION_STORAGE_KEY, JSON.stringify(reputation));
  } catch (error) {
    console.error('Failed to save reputation:', error);
  }
};

// Update reputation after game
export const updateReputation = (
  currentReputation: ReputationData,
  gameScore: number,
  achievements: string[],
  mediaImpact: number
): ReputationData => {
  const newReputation = { ...currentReputation };
  
  // Update total games played
  newReputation.totalGamesPlayed += 1;
  
  // Update best score
  if (gameScore > newReputation.bestScore) {
    newReputation.bestScore = gameScore;
  }
  
  // Calculate reputation points earned
  let pointsEarned = 0;
  
  // Base points from score
  if (gameScore >= 80) pointsEarned += 50;
  else if (gameScore >= 60) pointsEarned += 30;
  else if (gameScore >= 40) pointsEarned += 15;
  else pointsEarned += 5;
  
  // Bonus from achievements (10 points per achievement)
  pointsEarned += achievements.length * 10;
  
  // Media impact
  pointsEarned += Math.max(-20, Math.min(30, mediaImpact));
  
  // Add points
  newReputation.points = Math.max(0, newReputation.points + pointsEarned);
  
  // Update rank
  newReputation.rank = getReputationRank(newReputation.points);
  
  return newReputation;
};

// Get reputation display info
export const getReputationDisplay = (rank: ReputationRank) => {
  const displays = {
    unknown: {
      name: 'Vô Danh',
      color: 'from-gray-500 to-gray-400',
      icon: '🌑',
      description: 'Bạn mới bắt đầu hành trình. Hãy chơi nhiều hơn để xây dựng danh tiếng!',
    },
    known: {
      name: 'Được Biết Đến',
      color: 'from-blue-500 to-cyan-400',
      icon: '🌙',
      description: 'Tên tuổi của bạn bắt đầu được biết đến trong cộng đồng.',
    },
    respected: {
      name: 'Được Tôn Trọng',
      color: 'from-purple-500 to-pink-400',
      icon: '⭐',
      description: 'Bạn là người chơi có uy tín với nhiều thành tựu đáng nể.',
    },
    legendary: {
      name: 'Huyền Thoại',
      color: 'from-amber-500 to-orange-500',
      icon: '👑',
      description: 'Bạn đã đạt đỉnh cao! Là tấm gương cho mọi người.',
    },
  };
  
  return displays[rank];
};

// Calculate next rank progress
export const getNextRankProgress = (points: number): { current: number; max: number; percentage: number } => {
  let current = points;
  let max = 100;
  
  if (points < 100) {
    current = points;
    max = 100;
  } else if (points < 300) {
    current = points - 100;
    max = 200;
  } else if (points < 600) {
    current = points - 300;
    max = 300;
  } else {
    current = points - 600;
    max = 1000; // No upper limit for legendary
  }
  
  const percentage = max > 0 ? Math.min(100, (current / max) * 100) : 100;
  
  return { current, max, percentage };
};
