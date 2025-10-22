import type { MediaHeadline, Role, Choice, Metrics } from '../types/game';

// Generate media headline based on choice and metrics
export const generateMediaHeadline = (
  role: Role,
  round: number,
  choice: Choice,
  metrics: Metrics
): MediaHeadline => {
  const headlines = getHeadlineTemplates(role, choice, metrics);
  const selected = headlines[Math.floor(Math.random() * headlines.length)];
  
  return {
    round,
    headline: selected.text,
    sentiment: selected.sentiment,
    reputationImpact: selected.reputationImpact,
  };
};

// Get headline templates based on role and choice
const getHeadlineTemplates = (
  role: Role,
  choice: Choice,
  metrics: Metrics
): Array<{ text: string; sentiment: 'positive' | 'negative' | 'neutral'; reputationImpact: number }> => {
  const templates: Array<{ text: string; sentiment: 'positive' | 'negative' | 'neutral'; reputationImpact: number }> = [];

  // Analyze choice tags
  const tags = choice.tags || [];
  const isInnovative = tags.includes('innovation');
  const isAggressive = tags.includes('aggressive');
  const isEthical = tags.includes('ethical');
  const isDefensive = tags.includes('defensive');

  // Role-specific headlines
  if (role === 'smallbiz') {
    if (isInnovative && metrics.innovation > 70) {
      templates.push(
        { text: 'Doanh nghiệp nhỏ đột phá với sáng kiến đổi mới', sentiment: 'positive', reputationImpact: 15 },
        { text: 'Startup Việt gây ấn tượng với giải pháp sáng tạo', sentiment: 'positive', reputationImpact: 12 }
      );
    }
    if (isAggressive && metrics.revenue > 75) {
      templates.push(
        { text: 'Doanh nghiệp nhỏ thách thức đối thủ lớn bằng chiến lược táo bạo', sentiment: 'neutral', reputationImpact: 5 },
        { text: 'Chiến lược mạnh mẽ giúp DN nhỏ tăng trưởng vượt bậc', sentiment: 'positive', reputationImpact: 10 }
      );
    }
    if (isDefensive && metrics.userTrust > 70) {
      templates.push(
        { text: 'DN nhỏ tập trung giữ chân khách hàng trung thành', sentiment: 'positive', reputationImpact: 8 },
        { text: 'Chiến lược phòng thủ giúp DN nhỏ vững vàng', sentiment: 'neutral', reputationImpact: 5 }
      );
    }
    if (isEthical && metrics.userTrust > 75) {
      templates.push(
        { text: 'Khách hàng tin tưởng doanh nghiệp vì cam kết chất lượng', sentiment: 'positive', reputationImpact: 18 },
        { text: 'Đạo đức kinh doanh - Chìa khóa thành công của DN nhỏ', sentiment: 'positive', reputationImpact: 15 }
      );
    }
    if (metrics.revenue < 40) {
      templates.push(
        { text: 'Doanh nghiệp nhỏ gặp khó khăn trong môi trường cạnh tranh gay gắt', sentiment: 'negative', reputationImpact: -10 },
        { text: 'Thách thức lớn cho DN nhỏ giữa sức ép từ đối thủ', sentiment: 'negative', reputationImpact: -8 }
      );
    }
  }

  if (role === 'platform') {
    if (isInnovative && metrics.innovation > 75) {
      templates.push(
        { text: 'Nền tảng công nghệ ra mắt tính năng AI đột phá', sentiment: 'positive', reputationImpact: 20 },
        { text: 'Đổi mới không ngừng - Chiến lược của platform hàng đầu', sentiment: 'positive', reputationImpact: 18 }
      );
    }
    if (isAggressive && metrics.marketShare > 80) {
      templates.push(
        { text: 'Platform mở rộng nhanh, làm dấy lên lo ngại về độc quyền', sentiment: 'negative', reputationImpact: -15 },
        { text: 'Chiến lược tăng trưởng mạnh mẽ của nền tảng số', sentiment: 'neutral', reputationImpact: 5 }
      );
    }
    if (isDefensive && metrics.userTrust > 75) {
      templates.push(
        { text: 'Platform tăng cường bảo mật sau sự cố rò rỉ', sentiment: 'neutral', reputationImpact: 4 },
        { text: 'Nền tảng ưu tiên trải nghiệm người dùng an toàn', sentiment: 'positive', reputationImpact: 10 }
      );
    }
    if (isEthical && metrics.userTrust > 80) {
      templates.push(
        { text: 'Platform cam kết bảo mật dữ liệu người dùng tuyệt đối', sentiment: 'positive', reputationImpact: 22 },
        { text: 'Minh bạch và đạo đức - Giá trị cốt lõi của nền tảng', sentiment: 'positive', reputationImpact: 20 }
      );
    }
    if (metrics.fairness < 40) {
      templates.push(
        { text: 'Cơ quan quản lý điều tra cáo buộc lạm dụng vị thế thống trị', sentiment: 'negative', reputationImpact: -25 },
        { text: 'Platform đối mặt với áp lực về công bằng cạnh tranh', sentiment: 'negative', reputationImpact: -20 }
      );
    }
  }

  if (role === 'regulator') {
    if (isInnovative && metrics.innovation > 70) {
      templates.push(
        { text: 'Cơ quan quản lý áp dụng công nghệ AI để giám sát thị trường', sentiment: 'positive', reputationImpact: 15 },
        { text: 'Quy định thông minh - Hướng tiếp cận mới của nhà quản lý', sentiment: 'positive', reputationImpact: 12 }
      );
    }
    if (isAggressive && metrics.fairness > 75) {
      templates.push(
        { text: 'Biện pháp mạnh tay đảm bảo công bằng cạnh tranh', sentiment: 'positive', reputationImpact: 18 },
        { text: 'Cơ quan quản lý xử phạt nghiêm vi phạm cạnh tranh', sentiment: 'neutral', reputationImpact: 8 }
      );
    }
    if (isDefensive && metrics.publicWelfare > 70) {
      templates.push(
        { text: 'Quy định bảo vệ quyền lợi DN nhỏ được hoan nghênh', sentiment: 'positive', reputationImpact: 12 },
        { text: 'Cơ quan quản lý cân bằng giữa đổi mới và an toàn', sentiment: 'neutral', reputationImpact: 6 }
      );
    }
    if (isEthical && metrics.publicWelfare > 75) {
      templates.push(
        { text: 'Chính sách mới ưu tiên phúc lợi xã hội và phát triển bền vững', sentiment: 'positive', reputationImpact: 20 },
        { text: 'Quy định vì lợi ích cộng đồng được đánh giá cao', sentiment: 'positive', reputationImpact: 18 }
      );
    }
    if (metrics.publicWelfare < 40) {
      templates.push(
        { text: 'Dư luận phê phán chính sách thiếu hiệu quả', sentiment: 'negative', reputationImpact: -15 },
        { text: 'Cơ quan quản lý bị chỉ trích vì chậm trễ trong hành động', sentiment: 'negative', reputationImpact: -12 }
      );
    }
  }

  // Generic fallback headlines
  if (templates.length === 0) {
    templates.push(
      { text: 'Quyết định mới trong bối cảnh cạnh tranh thị trường', sentiment: 'neutral', reputationImpact: 3 },
      { text: 'Thị trường theo dõi sát động thái tiếp theo', sentiment: 'neutral', reputationImpact: 2 }
    );
  }

  return templates;
};
