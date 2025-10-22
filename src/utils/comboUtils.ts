// Combo display utilities

export interface ComboDisplay {
  level: number;
  multiplier: number;
  text: string;
  color: string;
  icon: string;
}

export const getComboDisplay = (multiplier: number): ComboDisplay => {
  if (multiplier >= 3.0) {
    return {
      level: 5,
      multiplier: 3.0,
      text: 'LEGENDARY COMBO',
      color: 'from-amber-500 via-orange-500 to-red-500',
      icon: '👑',
    };
  }
  if (multiplier >= 2.0) {
    return {
      level: 4,
      multiplier: 2.0,
      text: 'MEGA COMBO',
      color: 'from-purple-500 via-pink-500 to-red-500',
      icon: '⚡',
    };
  }
  if (multiplier >= 1.5) {
    return {
      level: 3,
      multiplier: 1.5,
      text: 'SUPER COMBO',
      color: 'from-blue-500 to-purple-500',
      icon: '🔥',
    };
  }
  if (multiplier >= 1.2) {
    return {
      level: 2,
      multiplier: 1.2,
      text: 'COMBO',
      color: 'from-green-500 to-blue-500',
      icon: '✨',
    };
  }
  return {
    level: 1,
    multiplier: 1.0,
    text: 'NORMAL',
    color: 'from-gray-500 to-gray-400',
    icon: '⚪',
  };
};

// Get streak count from game state
export const getMaxStreak = (streaks: Record<string, { count: number }>): number => {
  return Math.max(...Object.values(streaks).map((s) => s.count), 0);
};
