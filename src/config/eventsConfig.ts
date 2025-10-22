import type { RandomEvent, GameState } from '../types/game';

// Random Events - Sự kiện bất ngờ có thể xảy ra giữa các vòng
export const RANDOM_EVENTS: RandomEvent[] = [
  // ===== POSITIVE EVENTS =====
  {
    id: 'viral_success',
    title: '🎉 Viral trên mạng xã hội!',
    description: 'Sản phẩm của bạn bất ngờ được một influencer nổi tiếng đề cập. Lượng truy cập tăng vọt!',
    type: 'positive',
    effects: { revenue: 15, marketShare: 10, userTrust: 10 },
    probability: 0.15,
    roles: ['smallbiz', 'platform'],
  },
  {
    id: 'innovation_award',
    title: '🏆 Giải thưởng đổi mới!',
    description: 'Doanh nghiệp bạn nhận giải thưởng "Most Innovative Company" từ hiệp hội công nghệ.',
    type: 'positive',
    effects: { innovation: 20, userTrust: 15, revenue: 10 },
    probability: 0.1,
    roles: ['smallbiz', 'platform'],
    triggerCondition: (state: GameState) => state.metrics.innovation >= 70,
  },
  {
    id: 'policy_support',
    title: 'Chính sách hỗ trợ',
    description: 'Chính phủ công bố gói hỗ trợ doanh nghiệp nhỏ với ưu đãi thuế và vốn.',
    type: 'positive',
    effects: { revenue: 12, marketShare: 8, publicWelfare: 5 },
    probability: 0.12,
    roles: ['smallbiz'],
  },
  {
    id: 'partnership_offer',
    title: 'Đề nghị hợp tác',
    description: 'Một công ty lớn muốn hợp tác chiến lược với bạn để mở rộng thị trường.',
    type: 'positive',
    effects: { marketShare: 15, revenue: 10, innovation: 5 },
    probability: 0.1,
    roles: ['smallbiz', 'platform'],
  },
  {
    id: 'positive_media',
    title: 'Báo chí tích cực',
    description: 'Các báo lớn đưa tin tích cực về nỗ lực cạnh tranh công bằng của cơ quan quản lý.',
    type: 'positive',
    effects: { publicWelfare: 15, fairness: 10, userTrust: 10 },
    probability: 0.12,
    roles: ['regulator'],
  },

  // ===== NEGATIVE EVENTS =====
  {
    id: 'data_breach',
    title: 'Rò rỉ dữ liệu!',
    description: 'Phát hiện lỗ hổng bảo mật. Dữ liệu người dùng bị đánh cắp. Niềm tin sụt giảm nghiêm trọng!',
    type: 'negative',
    effects: { userTrust: -25, revenue: -15, marketShare: -10 },
    probability: 0.08,
    roles: ['platform'],
    triggerCondition: (state: GameState) => state.metrics.userTrust < 50,
  },
  {
    id: 'competitor_attack',
    title: 'Đối thủ tấn công giá!',
    description: 'Đối thủ cạnh tranh giảm giá 50% trong 1 tháng. Khách hàng của bạn chuyển sang đối thủ.',
    type: 'negative',
    effects: { revenue: -20, marketShare: -15, userTrust: -5 },
    probability: 0.15,
    roles: ['smallbiz', 'platform'],
  },
  {
    id: 'supply_chain_crisis',
    title: 'Khủng hoảng chuỗi cung ứng',
    description: 'Giá nguyên vật liệu tăng 40%. Chi phí vận hành tăng cao, lợi nhuận giảm.',
    type: 'negative',
    effects: { revenue: -15, innovation: -10 },
    probability: 0.12,
    roles: ['smallbiz'],
  },
  {
    id: 'public_scandal',
    title: 'Bê bối công khai',
    description: 'Một vụ bê bối liên quan đến lãnh đạo công ty làm hình ảnh thương hiệu bị ảnh hưởng.',
    type: 'negative',
    effects: { userTrust: -30, revenue: -10, marketShare: -12 },
    probability: 0.07,
    roles: ['platform'],
  },
  {
    id: 'regulatory_criticism',
    title: 'Chỉ trích dư luận',
    description: 'Công chúng phản ứng tiêu cực với quyết định quản lý gần đây. Sức ép tăng cao.',
    type: 'negative',
    effects: { publicWelfare: -15, fairness: -10 },
    probability: 0.1,
    roles: ['regulator'],
    triggerCondition: (state: GameState) => state.metrics.fairness < 55,
  },

  // ===== NEUTRAL/OPPORTUNITY EVENTS =====
  {
    id: 'market_shift',
    title: 'Thị trường biến động',
    description: 'Xu hướng tiêu dùng thay đổi đột ngột. Cơ hội mới xuất hiện nhưng cũng đầy rủi ro.',
    type: 'neutral',
    effects: { innovation: 5, marketShare: -5, revenue: 5 },
    probability: 0.15,
  },
  {
    id: 'new_regulation',
    title: 'Luật mới được thông qua',
    description: 'Quy định mới về bảo vệ dữ liệu có hiệu lực. Doanh nghiệp cần thích nghi nhanh chóng.',
    type: 'neutral',
    effects: { fairness: 10, revenue: -8, userTrust: 12 },
    probability: 0.1,
    roles: ['platform'],
  },
  {
    id: 'tech_breakthrough',
    title: 'Công nghệ đột phá',
    description: 'Công nghệ AI mới giúp tối ưu hóa hoạt động, nhưng cần đầu tư ban đầu.',
    type: 'neutral',
    effects: { innovation: 15, revenue: -10 },
    probability: 0.12,
  },
  {
    id: 'economic_uncertainty',
    title: 'Bất ổn kinh tế',
    description: 'Nền kinh tế có dấu hiệu suy thoái. Người tiêu dùng thắt chặt chi tiêu.',
    type: 'neutral',
    effects: { revenue: -10, marketShare: -5, publicWelfare: -5 },
    probability: 0.1,
  },
];

// Helper functions
export const getRandomEvent = (gameState: GameState): RandomEvent | null => {
  // Filter events phù hợp với role và condition
  const availableEvents = RANDOM_EVENTS.filter((event) => {
    // Check role
    if (event.roles && !event.roles.includes(gameState.role)) {
      return false;
    }

    // Check trigger condition
    if (event.triggerCondition && !event.triggerCondition(gameState)) {
      return false;
    }

    // Check if already triggered
    if (gameState.eventsHistory.some((e) => e.id === event.id)) {
      return false;
    }

    return true;
  });

  if (availableEvents.length === 0) return null;

  // Random selection based on probability
  const roll = Math.random();
  let cumulativeProbability = 0;

  for (const event of availableEvents) {
    cumulativeProbability += event.probability;
    if (roll < cumulativeProbability) {
      return event;
    }
  }

  return null;
};
