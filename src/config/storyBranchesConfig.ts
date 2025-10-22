import type { StoryBranch, Role, GameState } from '../types/game';

// Determine story branch based on early game choices
export const determineStoryBranch = (gameState: GameState): StoryBranch => {
  if (gameState.currentRound < 2) {
    return 'growth'; // Default branch for early game
  }

  // Analyze first 2 rounds of choices
  const earlyChoices = gameState.history.slice(0, 2);
  const allTags = earlyChoices.flatMap(h => h.choice.tags || []);
  
  // Count strategy types
  const tagCounts = {
    innovation: allTags.filter(t => t === 'innovation').length,
    aggressive: allTags.filter(t => t === 'aggressive').length,
    ethical: allTags.filter(t => t === 'ethical').length,
    defensive: allTags.filter(t => t === 'defensive').length,
    balanced: allTags.filter(t => t === 'balanced').length,
  };

  // Determine dominant strategy
  const maxCount = Math.max(...Object.values(tagCounts));
  
  if (tagCounts.innovation === maxCount && maxCount >= 2) {
    return 'innovation';
  }
  if (tagCounts.ethical === maxCount && maxCount >= 2) {
    return 'ethical';
  }
  if (tagCounts.aggressive === maxCount && maxCount >= 2) {
    return 'growth';
  }
  
  return 'stability'; // Default balanced branch
};

// Get branch-specific scenario modifications for rounds 3-5
export const getBranchScenarioModifier = (
  role: Role,
  branch: StoryBranch,
  currentRound: number,
  baseScenario: string
): string => {
  const modifiers = {
    smallbiz: {
      innovation: {
        3: 'Con đường đổi mới: Sản phẩm mới của bạn đang thu hút sự chú ý. Một quỹ đầu tư muốn tài trợ. ',
        4: 'Đột phá công nghệ: Giải pháp của bạn được công nhận. Các đối tác lớn quan tâm hợp tác. ',
        5: 'Thành công vang dội: Công ty bạn trở thành case study về innovation. Quyết định mở rộng hay tập trung? ',
      },
      ethical: {
        3: 'Con đường đạo đức: Khách hàng trung thành ủng hộ bạn. Media đưa tin tích cực về giá trị của công ty. ',
        4: 'Xây dựng thương hiệu: Reputation cao giúp bạn có lợi thế cạnh tranh. Đối tác tin tưởng hợp tác dài hạn. ',
        5: 'Bền vững và phát triển: Công ty bạn là mô hình doanh nghiệp có trách nhiệm. Cơ hội IPO xuất hiện. ',
      },
      growth: {
        3: 'Con đường tăng trưởng: Chiến lược mạnh mẽ giúp mở rộng thị phần nhanh. Nhưng đối thủ phản công. ',
        4: 'Cạnh tranh gay gắt: Bạn đối đầu trực tiếp với platform lớn. Phải chọn giữa tăng trưởng và ổn định. ',
        5: 'Thời điểm quyết định: Thị phần tăng nhưng áp lực cao. Tiếp tục đẩy mạnh hay củng cố vị thế? ',
      },
      stability: {
        3: 'Con đường ổn định: Công ty phát triển đều đặn với rủi ro thấp. Cơ hội mở rộng an toàn xuất hiện. ',
        4: 'Tăng trưởng bền vững: Chiến lược cân bằng mang lại kết quả tốt. Nhà đầu tư đánh giá cao. ',
        5: 'Vững chắc phát triển: Doanh nghiệp ổn định với nền tảng vững. Quyết định hướng đi dài hạn. ',
      },
    },
    platform: {
      innovation: {
        3: 'Tiên phong AI: Nền tảng của bạn dẫn đầu về công nghệ. Startup muốn tham gia hệ sinh thái. ',
        4: 'Đột phá công nghệ: Features mới tạo xu hướng. Nhưng cơ quan quản lý bắt đầu quan tâm. ',
        5: 'Định hình tương lai: Platform của bạn thay đổi ngành. Trách nhiệm lớn khi trở thành tiêu chuẩn. ',
      },
      ethical: {
        3: 'Platform có trách nhiệm: Chính sách công bằng được khen ngợi. User trust tăng mạnh. ',
        4: 'Minh bạch và tin cậy: Sellers và users đều hài lòng. Bạn trở thành mô hình cho ngành. ',
        5: 'Chuẩn mực mới: Platform của bạn chứng minh công nghệ và đạo đức đi cùng nhau. Regulatory praise. ',
      },
      growth: {
        3: 'Mở rộng thống trị: Market share tăng vọt. Nhưng cáo buộc monopoly xuất hiện. ',
        4: 'Áp lực điều tiết: Quy mô lớn thu hút sự giám sát. Phải cân bằng tăng trưởng và compliance. ',
        5: 'Quyền lực và trách nhiệm: Platform thống trị thị trường. Đối mặt với điều tra antitrust. ',
      },
      stability: {
        3: 'Tăng trưởng có kiểm soát: Platform mở rộng cân đối. Giữ được trust của mọi bên. ',
        4: 'Phát triển bền vững: Chiến lược cân bằng tạo hệ sinh thái lành mạnh. Regulator hài lòng. ',
        5: 'Platform trưởng thành: Quy mô lớn nhưng có trách nhiệm. Mô hình phát triển bền vững. ',
      },
    },
    regulator: {
      innovation: {
        3: 'Quy định thông minh: Áp dụng công nghệ vào giám sát. Doanh nghiệp hợp tác tích cực. ',
        4: 'Regulatory Tech: AI giúp phát hiện vi phạm sớm. Nâng cao hiệu quả và công bằng. ',
        5: 'Cơ quan tiên tiến: Mô hình quản lý của bạn được các nước học tập. Tech-enabled regulation. ',
      },
      ethical: {
        3: 'Ưu tiên công bằng: Chính sách bảo vệ người yếu thế được khen ngợi. Trust tăng cao. ',
        4: 'Quy định vì dân: Cân bằng giữa growth và protection. Được coi là "good regulator". ',
        5: 'Chuẩn mực đạo đức: Bạn thiết lập framework cho cạnh tranh công bằng. Model cho khu vực. ',
      },
      growth: {
        3: 'Hành động quyết đoán: Xử lý mạnh vi phạm. Một số doanh nghiệp phản đối quá khắt khe. ',
        4: 'Cứng rắn với vi phạm: Phạt nặng tạo hiệu ứng răn đe. Nhưng được chỉ trích là kìm hãm đổi mới. ',
        5: 'Quyền lực điều tiết: Market tuân thủ nghiêm ngặt. Cân bằng giữa control và innovation. ',
      },
      stability: {
        3: 'Quy định cân bằng: Vừa bảo vệ vừa khuyến khích đổi mới. Các bên đều chấp nhận. ',
        4: 'Regulatory Balance: Chính sách hài hòa lợi ích nhiều bên. Thị trường phát triển lành mạnh. ',
        5: 'Quản lý hiệu quả: Duy trì môi trường cạnh tranh công bằng và sáng tạo. Được đánh giá cao. ',
      },
    },
  };

  const roleMods = modifiers[role];
  if (!roleMods || !roleMods[branch]) return baseScenario;

  const roundMod = roleMods[branch][currentRound as 3 | 4 | 5];
  return roundMod ? roundMod + baseScenario : baseScenario;
};

// Get branch display info
export const getBranchInfo = (branch: StoryBranch) => {
  const info = {
    growth: {
      name: 'Tăng trưởng Mạnh mẽ',
      icon: '📈',
      color: 'from-red-500 to-orange-500',
      description: 'Con đường tăng trưởng tích cực, mở rộng nhanh và chiếm thị phần',
    },
    stability: {
      name: 'Phát triển Ổn định',
      icon: '⚖️',
      color: 'from-blue-500 to-cyan-500',
      description: 'Chiến lược cân bằng, tăng trưởng bền vững với rủi ro được kiểm soát',
    },
    innovation: {
      name: 'Đổi mới Đột phá',
      icon: '💡',
      color: 'from-purple-500 to-pink-500',
      description: 'Tập trung vào sáng tạo và công nghệ, dẫn đầu xu hướng',
    },
    ethical: {
      name: 'Đạo đức & Trách nhiệm',
      icon: '🌱',
      color: 'from-green-500 to-emerald-500',
      description: 'Ưu tiên công bằng, minh bạch và lợi ích xã hội',
    },
  };
  
  return info[branch];
};

// Check if should show branch notification (at round 3)
export const shouldShowBranchNotification = (gameState: GameState): boolean => {
  return gameState.currentRound === 3 && !gameState.storyBranch;
};
