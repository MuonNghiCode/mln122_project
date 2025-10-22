import type { GameState } from '../types/game';

interface DynamicLesson {
  number: string;
  title: string;
  content: string;
  stats: { label: string; value: string }[];
}

export const generateDynamicLessons = (gameState: GameState): DynamicLesson[] => {
  const lessons: DynamicLesson[] = [];
  const metrics = gameState.metrics;
  const history = gameState.history;
  const achievements = gameState.achievements;
  const events = gameState.eventsHistory;
  
  // Analyze strategy from choices
  const strategyTags: Record<string, number> = {};
  history.forEach((h) => {
    (h.choice.tags || []).forEach((tag) => {
      strategyTags[tag] = (strategyTags[tag] || 0) + 1;
    });
  });
  
  const dominantStrategy = Object.entries(strategyTags).sort((a, b) => b[1] - a[1])[0]?.[0] || 'balanced';
  
  // Lesson 1: Based on dominant strategy
  if (dominantStrategy === 'innovation' && strategyTags['innovation'] >= 3) {
    lessons.push({
      number: '01',
      title: 'Sức mạnh của đổi mới',
      content: `Bạn đã tập trung vào đổi mới với ${strategyTags['innovation']} quyết định sáng tạo. ${metrics.innovation >= 80 ? 'Chiến lược này đã mang lại kết quả xuất sắc!' : 'Đổi mới cần thời gian để tạo ra giá trị.'} Nghiên cứu cho thấy các doanh nghiệp đầu tư mạnh vào R&D có tốc độ tăng trưởng gấp 2.5 lần so với đối thủ.`,
      stats: [
        { label: 'Chỉ số đổi mới của bạn', value: `${metrics.innovation}/100` },
        { label: 'Tỷ lệ thành công của doanh nghiệp đổi mới', value: '68%' },
        { label: 'ROI trung bình từ R&D', value: '250%' },
      ],
    });
  } else if (dominantStrategy === 'aggressive' && strategyTags['aggressive'] >= 3) {
    lessons.push({
      number: '01',
      title: 'Chiến lược tấn công',
      content: `Bạn đã chọn ${strategyTags['aggressive']} quyết định tấn công mạnh mẽ. ${metrics.revenue >= 80 ? 'Sự quyết đoán này đã tăng doanh thu đáng kể!' : 'Tấn công quá mức có thể gây mất cân bằng.'} Tuy nhiên, cạnh tranh lành mạnh mang lại lợi ích dài hạn cho toàn bộ thị trường.`,
      stats: [
        { label: 'Doanh thu của bạn', value: `${metrics.revenue}/100` },
        { label: 'Thị phần của bạn', value: `${metrics.marketShare}/100` },
        { label: 'Tăng giá khi độc quyền', value: '+15-40%' },
      ],
    });
  } else if (dominantStrategy === 'ethical' && strategyTags['ethical'] >= 3) {
    lessons.push({
      number: '01',
      title: 'Đạo đức kinh doanh',
      content: `Bạn đã ưu tiên đạo đức với ${strategyTags['ethical']} quyết định có trách nhiệm. ${metrics.fairness >= 70 ? 'Điều này xây dựng nền tảng bền vững!' : 'Đạo đức đôi khi đòi hỏi hy sinh ngắn hạn.'} 73% thế hệ Gen Z chọn mua hàng từ doanh nghiệp có trách nhiệm xã hội.`,
      stats: [
        { label: 'Chỉ số công bằng', value: `${metrics.fairness}/100` },
        { label: 'Niềm tin người dùng', value: `${metrics.userTrust}/100` },
        { label: 'Khách hàng trung thành với thương hiệu đạo đức', value: '73%' },
      ],
    });
  } else {
    lessons.push({
      number: '01',
      title: 'Cân bằng chiến lược',
      content: `Bạn đã áp dụng chiến lược cân bằng, kết hợp nhiều cách tiếp cận khác nhau. ${metrics.fairness >= 40 && metrics.revenue >= 40 && metrics.innovation >= 40 ? 'Sự đa dạng này tạo nên sức mạnh!' : 'Đôi khi cần tập trung hơn vào một hướng cụ thể.'} Doanh nghiệp cân bằng tốt có tỷ lệ sống sót cao hơn 55%.`,
      stats: [
        { label: 'Độ cân bằng tổng thể', value: `${Math.min(...Object.values(metrics))}/100` },
        { label: 'Tỷ lệ thành công của chiến lược cân bằng', value: '55%' },
        { label: 'Tăng trưởng ổn định dài hạn', value: '+12%/năm' },
      ],
    });
  }
  
  // Lesson 2: Based on events
  const negativeEvents = events.filter(e => e.type === 'negative').length;
  const positiveEvents = events.filter(e => e.type === 'positive').length;
  
  if (negativeEvents >= 2) {
    lessons.push({
      number: '02',
      title: 'Vượt qua khủng hoảng',
      content: `Bạn đã trải qua ${negativeEvents} sự kiện tiêu cực nhưng vẫn hoàn thành game. ${gameState.isGameOver && Object.values(metrics).every(v => v > 20) ? 'Khả năng phục hồi của bạn đáng ngưỡng mộ!' : 'Mỗi khủng hoảng là bài học quý giá.'} Nghiên cứu cho thấy 60% doanh nghiệp sống sót qua khủng hoảng trở nên mạnh mẽ hơn.`,
      stats: [
        { label: 'Sự kiện tiêu cực đã vượt qua', value: `${negativeEvents}` },
        { label: 'Chỉ số phục hồi', value: `${Math.min(100, (Object.values(metrics).reduce((a, b) => a + b, 0) / 6))}%` },
        { label: 'Doanh nghiệp mạnh hơn sau khủng hoảng', value: '60%' },
      ],
    });
  } else if (positiveEvents >= 2) {
    lessons.push({
      number: '02',
      title: 'Tận dụng cơ hội',
      content: `Bạn đã may mắn nhận được ${positiveEvents} sự kiện tích cực. ${metrics.revenue >= 70 || metrics.marketShare >= 70 ? 'Và bạn đã tận dụng chúng hiệu quả!' : 'Tuy nhiên, cơ hội cần được khai thác đúng cách.'} 78% doanh nghiệp thành công biết cách nắm bắt đúng thời cơ.`,
      stats: [
        { label: 'Sự kiện tích cực', value: `${positiveEvents}` },
        { label: 'Mức độ tận dụng cơ hội', value: `${Math.round((metrics.revenue + metrics.marketShare) / 2)}%` },
        { label: 'Doanh nghiệp biết nắm thời cơ', value: '78%' },
      ],
    });
  } else {
    lessons.push({
      number: '02',
      title: 'Ổn định trong biến động',
      content: `Bạn đã duy trì sự ổn định với ít biến động bất ngờ. ${Object.values(metrics).every(v => v >= 30 && v <= 80) ? 'Sự đều đặn này là dấu hiệu của quản lý tốt!' : 'Đôi khi cần chấp nhận rủi ro để tăng trưởng.'} Các công ty ổn định có tỷ lệ sống sót cao hơn 45% trong thời kỳ suy thoái.`,
      stats: [
        { label: 'Độ ổn định', value: `${100 - Math.max(...Object.values(metrics).map((v, i, arr) => Math.abs(v - arr[i-1] || v)))}%` },
        { label: 'Biến động thị trường', value: `${events.length} sự kiện` },
        { label: 'Tỷ lệ sống sót trong suy thoái', value: '45%' },
      ],
    });
  }
  
  // Lesson 3: Based on metrics performance
  const highestMetric = Object.entries(metrics).sort((a, b) => b[1] - a[1])[0];
  const lowestMetric = Object.entries(metrics).sort((a, b) => a[1] - b[1])[0];
  
  const metricNames: Record<string, string> = {
    revenue: 'Doanh thu',
    marketShare: 'Thị phần',
    userTrust: 'Niềm tin',
    innovation: 'Đổi mới',
    publicWelfare: 'Phúc lợi xã hội',
    fairness: 'Công bằng',
  };
  
  if (highestMetric[1] >= 80) {
    lessons.push({
      number: '03',
      title: `Xuất sắc về ${metricNames[highestMetric[0]]}`,
      content: `Chỉ số ${metricNames[highestMetric[0]]} của bạn đạt ${highestMetric[1]} điểm - một thành tích ấn tượng! ${highestMetric[0] === 'revenue' ? 'Doanh thu cao cho thấy sản phẩm/dịch vụ đáp ứng tốt nhu cầu thị trường.' : ''} ${highestMetric[0] === 'innovation' ? 'Đổi mới là chìa khóa cho tăng trưởng dài hạn.' : ''} ${highestMetric[0] === 'fairness' ? 'Công bằng tạo nền tảng cho thị trường lành mạnh.' : ''} Hãy duy trì thế mạnh này!`,
      stats: [
        { label: metricNames[highestMetric[0]], value: `${highestMetric[1]}/100` },
        { label: 'Thành tựu đạt được', value: `${achievements.length}/15` },
        { label: 'Top performers trong ngành', value: '15%' },
      ],
    });
  } else if (lowestMetric[1] <= 30) {
    lessons.push({
      number: '03',
      title: `Cải thiện ${metricNames[lowestMetric[0]]}`,
      content: `Chỉ số ${metricNames[lowestMetric[0]]} còn thấp (${lowestMetric[1]} điểm). ${lowestMetric[0] === 'userTrust' ? 'Niềm tin là tài sản quý giá nhất - mất 5 năm xây dựng nhưng chỉ 5 phút để phá hủy.' : ''} ${lowestMetric[0] === 'fairness' ? 'Công bằng không chỉ là đạo đức mà còn là lợi thế cạnh tranh.' : ''} ${lowestMetric[0] === 'innovation' ? 'Không đổi mới là lùi bước - đối thủ sẽ vượt qua bạn.' : ''} Đây là điểm cần tập trung cải thiện.`,
      stats: [
        { label: metricNames[lowestMetric[0]], value: `${lowestMetric[1]}/100` },
        { label: 'Mức cần cải thiện', value: `+${Math.max(0, 50 - lowestMetric[1])} điểm` },
        { label: 'Tác động khi cải thiện', value: '+25% tổng thể' },
      ],
    });
  } else {
    lessons.push({
      number: '03',
      title: 'Phát triển toàn diện',
      content: `Các chỉ số của bạn khá cân bằng, không có điểm quá yếu hoặc quá mạnh. ${Object.values(metrics).every(v => v >= 40 && v <= 70) ? 'Đây là nền tảng tốt cho tăng trưởng bền vững!' : 'Hãy xác định điểm mạnh để phát huy.'} Doanh nghiệp phát triển toàn diện có khả năng thích ứng cao hơn 42%.`,
      stats: [
        { label: 'Điểm trung bình tất cả chỉ số', value: `${Math.round(Object.values(metrics).reduce((a, b) => a + b, 0) / 6)}/100` },
        { label: 'Độ cân bằng', value: `${Math.round(100 - (Math.max(...Object.values(metrics)) - Math.min(...Object.values(metrics))))}%` },
        { label: 'Khả năng thích ứng cao', value: '+42%' },
      ],
    });
  }
  
  // Lesson 4: Based on achievements
  if (achievements.length >= 8) {
    lessons.push({
      number: '04',
      title: 'Người chinh phục thử thách',
      content: `Bạn đã mở khóa ${achievements.length}/15 thành tựu - một con số ấn tượng! ${achievements.includes('perfect_score') ? 'Đặc biệt, bạn đã đạt điểm hoàn hảo!' : ''} ${achievements.includes('innovation_master') ? 'Bạn là bậc thầy về đổi mới!' : ''} Những thành tựu này phản ánh chiến lược đa dạng và khả năng thích ứng xuất sắc.`,
      stats: [
        { label: 'Thành tựu đã mở', value: `${achievements.length}/15` },
        { label: 'Tỷ lệ hoàn thành', value: `${Math.round((achievements.length / 15) * 100)}%` },
        { label: 'Top achievers', value: '8%' },
      ],
    });
  } else if (achievements.length >= 4) {
    lessons.push({
      number: '04',
      title: 'Tiến bộ vững chắc',
      content: `Bạn đã mở khóa ${achievements.length}/15 thành tựu. ${achievements.includes('first_victory') ? 'Chiến thắng đầu tiên là bước khởi đầu quan trọng!' : ''} Mỗi thành tựu là minh chứng cho một khía cạnh xuất sắc trong gameplay. Hãy thử các chiến lược khác để mở khóa thêm!`,
      stats: [
        { label: 'Thành tựu đã mở', value: `${achievements.length}/15` },
        { label: 'Còn lại', value: `${15 - achievements.length} thành tựu` },
        { label: 'Tỷ lệ người chơi trung bình', value: '4-6 thành tựu' },
      ],
    });
  } else {
    lessons.push({
      number: '04',
      title: 'Hành trình mới bắt đầu',
      content: `Bạn đã mở khóa ${achievements.length}/15 thành tựu - còn nhiều điều để khám phá! ${gameState.comboMultiplier >= 1.5 ? 'Combo system đã hoạt động tốt!' : 'Thử duy trì một chiến lược nhất quán để đạt combo cao hơn.'} Mỗi lần chơi là cơ hội học hỏi thêm về cạnh tranh công bằng.`,
      stats: [
        { label: 'Thành tựu đã mở', value: `${achievements.length}/15` },
        { label: 'Combo cao nhất', value: `x${gameState.comboMultiplier.toFixed(1)}` },
        { label: 'Thử thách còn lại', value: `${15 - achievements.length}` },
      ],
    });
  }
  
  return lessons;
};
