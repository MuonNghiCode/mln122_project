import type { Achievement, GameState } from '../types/game';

export const ACHIEVEMENTS: Achievement[] = [
  // ===== PERFORMANCE ACHIEVEMENTS =====
  {
    id: 'perfect_score',
    title: 'Điểm Hoàn Hảo',
    description: 'Đạt tất cả chỉ số trên 80 điểm',
    icon: '01',
    rarity: 'legendary',
    condition: (state: GameState) => {
      return Object.values(state.metrics).every((v) => v >= 80);
    },
  },
  {
    id: 'high_revenue',
    title: 'Tỷ Phú',
    description: 'Đạt doanh thu trên 90 điểm',
    icon: '02',
    rarity: 'rare',
    condition: (state: GameState) => state.metrics.revenue >= 90,
  },
  {
    id: 'market_dominator',
    title: 'Thống Trị Thị Trường',
    description: 'Đạt thị phần trên 85 điểm',
    icon: '03',
    rarity: 'rare',
    condition: (state: GameState) => state.metrics.marketShare >= 85,
  },
  {
    id: 'innovation_master',
    title: 'Bậc Thầy Đổi Mới',
    description: 'Đạt chỉ số đổi mới trên 90 điểm',
    icon: '04',
    rarity: 'epic',
    condition: (state: GameState) => state.metrics.innovation >= 90,
  },
  {
    id: 'trusted_brand',
    title: 'Thương Hiệu Đáng Tin',
    description: 'Đạt niềm tin người dùng trên 90 điểm',
    icon: '05',
    rarity: 'epic',
    condition: (state: GameState) => state.metrics.userTrust >= 90,
  },
  {
    id: 'fair_play_champion',
    title: 'Nhà Vô Địch Công Bằng',
    description: 'Đạt chỉ số công bằng trên 90 điểm',
    icon: '06',
    rarity: 'epic',
    condition: (state: GameState) => state.metrics.fairness >= 90,
  },

  // ===== STRATEGY ACHIEVEMENTS =====
  {
    id: 'risk_taker',
    title: 'Người Liều Lĩnh',
    description: 'Chọn 4 lựa chọn có rủi ro cao liên tiếp',
    icon: '07',
    rarity: 'rare',
    condition: (state: GameState) => {
      const recentChoices = state.history.slice(-4);
      return (
        recentChoices.length === 4 &&
        recentChoices.every((h) => h.choice.riskLevel === 'high')
      );
    },
  },
  {
    id: 'safe_player',
    title: 'Người Thận Trọng',
    description: 'Hoàn thành game chỉ với lựa chọn rủi ro thấp',
    icon: '08',
    rarity: 'rare',
    condition: (state: GameState) => {
      return state.isGameOver && state.history.every((h) => h.choice.riskLevel === 'low');
    },
  },
  {
    id: 'innovation_streak',
    title: 'Chuỗi Đổi Mới',
    description: 'Duy trì streak đổi mới 3 vòng liên tiếp',
    icon: '09',
    rarity: 'common',
    condition: (state: GameState) => {
      return state.streaks['innovation']?.count >= 3;
    },
  },
  {
    id: 'balanced_approach',
    title: 'Cân Bằng Hoàn Hảo',
    description: 'Không có chỉ số nào dưới 40 điểm',
    icon: '10',
    rarity: 'rare',
    condition: (state: GameState) => {
      return Object.values(state.metrics).every((v) => v >= 40);
    },
  },

  // ===== SURVIVOR ACHIEVEMENTS =====
  {
    id: 'comeback_king',
    title: 'Vua Lội Ngược Dòng',
    description: 'Tăng 40 điểm cho bất kỳ chỉ số nào từ vòng 1 đến vòng cuối',
    icon: '11',
    rarity: 'epic',
    condition: (state: GameState) => {
      if (state.history.length < 2) return false;
      const firstMetrics = state.history[0].metricsAfter;
      const currentMetrics = state.metrics;
      return Object.keys(currentMetrics).some((key) => {
        const metricKey = key as keyof typeof currentMetrics;
        return currentMetrics[metricKey] - firstMetrics[metricKey] >= 40;
      });
    },
  },
  {
    id: 'event_survivor',
    title: 'Sống Sót Qua Bão',
    description: 'Trải qua 3 sự kiện tiêu cực nhưng vẫn hoàn thành game',
    icon: '12',
    rarity: 'epic',
    condition: (state: GameState) => {
      const negativeEvents = state.eventsHistory.filter((e) => e.type === 'negative');
      return state.isGameOver && negativeEvents.length >= 3;
    },
  },

  // ===== SPECIAL ACHIEVEMENTS =====
  {
    id: 'lucky_star',
    title: 'Ngôi Sao May Mắn',
    description: 'Nhận 3 sự kiện tích cực trong một game',
    icon: '13',
    rarity: 'rare',
    condition: (state: GameState) => {
      const positiveEvents = state.eventsHistory.filter((e) => e.type === 'positive');
      return positiveEvents.length >= 3;
    },
  },
  {
    id: 'combo_master',
    title: 'Bậc Thầy Combo',
    description: 'Đạt combo multiplier x2.0 trở lên',
    icon: '14',
    rarity: 'epic',
    condition: (state: GameState) => state.comboMultiplier >= 2.0,
  },
  {
    id: 'first_victory',
    title: 'Chiến Thắng Đầu Tiên',
    description: 'Hoàn thành game lần đầu với bất kỳ vai trò nào',
    icon: '15',
    rarity: 'common',
    condition: (state: GameState) => state.isGameOver,
  },
];

// Helper function to check and unlock achievements
export const checkAchievements = (gameState: GameState): string[] => {
  const newAchievements: string[] = [];
  
  for (const achievement of ACHIEVEMENTS) {
    // Nếu đã unlock rồi thì skip
    if (gameState.achievements.includes(achievement.id)) {
      continue;
    }
    
    // Check condition
    if (achievement.condition(gameState)) {
      newAchievements.push(achievement.id);
    }
  }
  
  return newAchievements;
};

// Get achievement by ID
export const getAchievementById = (id: string): Achievement | undefined => {
  return ACHIEVEMENTS.find((a) => a.id === id);
};
