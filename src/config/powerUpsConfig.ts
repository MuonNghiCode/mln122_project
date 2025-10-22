import type { PowerUp, PowerUpType } from '../types/game';

export const POWER_UPS: Record<PowerUpType, PowerUp> = {
  market_insight: {
    id: 'market_insight',
    name: 'Thông Tin Thị Trường',
    description: 'Xem trước tác động của TẤT CẢ các lựa chọn trước khi quyết định. Hiển thị chi tiết thay đổi chỉ số.',
    cost: 5, // -5% điểm cuối
    usageLimit: 1,
    unlockRequirement: 'first_victory', // Unlock sau game đầu tiên thắng
  },
  strategic_pause: {
    id: 'strategic_pause',
    name: 'Tạm Dừng Chiến Lược',
    description: 'Đóng băng thời gian +30s và cho phép đổi lựa chọn 1 lần. Tăng 5 điểm cho tất cả chỉ số.',
    cost: 3, // -3% điểm cuối
    usageLimit: 1,
    unlockRequirement: 'balanced_approach', // Unlock khi đạt cân bằng
  },
  regulatory_shield: {
    id: 'regulatory_shield',
    name: 'Khiên Quy Định',
    description: 'Vô hiệu hóa random events tiêu cực cho 2 vòng tiếp theo. Bảo vệ khỏi rủi ro và tăng 8 điểm Công bằng.',
    cost: 7, // -7% điểm cuối
    usageLimit: 1,
    unlockRequirement: 'combo_master', // Unlock khi master combo
  },
};

// Check if power-up is unlocked
export const isPowerUpUnlocked = (powerUpId: PowerUpType, achievements: string[]): boolean => {
  const powerUp = POWER_UPS[powerUpId];
  return achievements.includes(powerUp.unlockRequirement);
};

// Get available power-ups based on achievements
export const getAvailablePowerUps = (achievements: string[]): PowerUpType[] => {
  return Object.keys(POWER_UPS).filter(
    (id) => isPowerUpUnlocked(id as PowerUpType, achievements)
  ) as PowerUpType[];
};
