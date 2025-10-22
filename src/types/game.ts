// Game Types and Interfaces for Competition Trial Game

export type Role = 'smallbiz' | 'platform' | 'regulator';
export type Difficulty = 'easy' | 'normal' | 'hard';
export type EventType = 'positive' | 'negative' | 'neutral' | 'choice';
export type MentorType = 'economist' | 'tech_expert' | 'policy_maker';
export type ReputationRank = 'unknown' | 'known' | 'respected' | 'legendary';
export type PowerUpType = 'market_insight' | 'strategic_pause' | 'regulatory_shield';
export type StoryBranch = 'growth' | 'stability' | 'innovation' | 'ethical';

// Mentor System
export interface Mentor {
  id: MentorType;
  name: string;
  title: string;
  description: string;
  boost: Partial<Metrics>; // Bonus metrics
  adviceFrequency: number; // Mỗi X rounds
}

// Reputation System
export interface ReputationData {
  points: number; // 0-1000+
  rank: ReputationRank;
  totalGamesPlayed: number;
  bestScore: number;
}

// Power-up System
export interface PowerUp {
  id: PowerUpType;
  name: string;
  description: string;
  cost: number; // Score penalty percentage
  usageLimit: number; // Per game
  unlockRequirement: string; // Achievement ID required
}

// Media Coverage
export interface MediaHeadline {
  round: number;
  headline: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  reputationImpact: number;
}

export interface Metrics {
  revenue: number;        // Doanh thu (SmallBiz, Platform)
  marketShare: number;    // Thị phần (SmallBiz, Platform)
  userTrust: number;      // Niềm tin người dùng (Platform)
  innovation: number;     // Đổi mới (SmallBiz)
  publicWelfare: number;  // Phúc lợi xã hội (Regulator)
  fairness: number;       // Công bằng cạnh tranh (Regulator)
}

export interface Choice {
  id: string;
  title: string;
  description: string;
  effects: Partial<Metrics>; // Ảnh hưởng đến các chỉ số
  riskLevel?: 'low' | 'medium' | 'high'; // Mức độ rủi ro
  consequence?: string; // Hậu quả có thể xảy ra
  tags?: string[]; // Tags để track strategy (innovation, aggressive, defensive, ethical)
}

export interface Round {
  roundNumber: number;
  scenario: string; // Tình huống trong vòng này
  choices: Choice[]; // Các lựa chọn khả dụng
}

// Sự kiện ngẫu nhiên
export interface RandomEvent {
  id: string;
  title: string;
  description: string;
  type: EventType;
  effects?: Partial<Metrics>;
  triggerCondition?: (state: GameState) => boolean; // Điều kiện để trigger event
  probability: number; // 0-1, xác suất xuất hiện
  roles?: Role[]; // Chỉ xuất hiện với vai trò cụ thể
}

// Achievement System
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Number like "01", "02"
  condition: (state: GameState) => boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// Streak tracking
export interface Streak {
  type: string; // innovation, aggressive, defensive, ethical
  count: number;
  bonusApplied: boolean;
}

export interface GameState {
  role: Role;
  currentRound: number;
  totalRounds: number;
  metrics: Metrics;
  history: {
    round: number;
    choice: Choice;
    metricsAfter: Metrics;
    eventTriggered?: RandomEvent;
    mediaHeadline?: MediaHeadline;
  }[];
  isGameOver: boolean;
  difficulty: Difficulty;
  streaks: Record<string, Streak>; // Track multiple streaks
  achievements: string[]; // IDs of unlocked achievements
  eventsHistory: RandomEvent[]; // Events đã xảy ra
  comboMultiplier: number; // Bonus multiplier từ combos
  mentor?: MentorType; // Selected mentor
  powerUpsUsed: PowerUpType[]; // Power-ups used this game
  activePowerUps?: {
    marketInsightActive?: boolean; // Show all choice impacts
    shieldRoundsLeft?: number; // Rounds of protection remaining
    timeBonus?: number; // Extra seconds added
  };
  storyBranch?: StoryBranch; // Current story path
  mediaHeadlines: MediaHeadline[]; // Headlines generated
  shuffledRounds?: Round[]; // Rounds with shuffled choices (fixed for entire game)
}

export interface RoleConfig {
  id: Role;
  name: string;
  description: string;
  icon: string;
  primaryMetrics: (keyof Metrics)[]; // Chỉ số chính cần theo dõi
  initialMetrics: Metrics;
}

export interface GameResult {
  role: Role;
  finalMetrics: Metrics;
  totalScore: number;
  rating: 'poor' | 'fair' | 'good' | 'excellent';
  feedback: string;
  educationalMessage: string;
}
