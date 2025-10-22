import type { Mentor, MentorType } from '../types/game';

export const MENTORS: Record<MentorType, Mentor> = {
  economist: {
    id: 'economist',
    name: 'Dr. Nguyễn Minh Tuấn',
    title: 'Nhà Kinh tế học',
    description: 'Chuyên gia về cạnh tranh thị trường và chiến lược kinh doanh. Giúp tối ưu hóa doanh thu và thị phần.',
    boost: {
      revenue: 5,
      marketShare: 5,
    },
    adviceFrequency: 2,
  },
  tech_expert: {
    id: 'tech_expert',
    name: 'Ms. Trần Hải Yến',
    title: 'Chuyên gia Công nghệ',
    description: 'Tiên phong trong đổi mới và chuyển đổi số. Tăng cường khả năng sáng tạo và niềm tin người dùng.',
    boost: {
      innovation: 5,
      userTrust: 5,
    },
    adviceFrequency: 2,
  },
  policy_maker: {
    id: 'policy_maker',
    name: 'Ông Lê Văn Đức',
    title: 'Chuyên gia Chính sách',
    description: 'Kinh nghiệm về quản lý và quy định. Đảm bảo công bằng và phúc lợi xã hội.',
    boost: {
      fairness: 5,
      publicWelfare: 5,
    },
    adviceFrequency: 2,
  },
};

// Mentor advice based on game state
export const getMentorAdvice = (mentorType: MentorType): string => {
  const advicePool = {
    economist: [
      'Hãy cân nhắc giữa tăng trưởng ngắn hạn và bền vững dài hạn. Lợi nhuận không phải là tất cả.',
      'Thị phần cao không có nghĩa là độc quyền. Hãy cạnh tranh công bằng để thị trường phát triển lành mạnh.',
      'Đầu tư vào chất lượng sản phẩm sẽ mang lại lợi nhuận bền vững hơn cạnh tranh bằng giá.',
      'Niềm tin của khách hàng là tài sản vô giá. Đừng hy sinh nó vì lợi ích ngắn hạn.',
      'Khi thị trường khó khăn, đổi mới là cách tốt nhất để vượt qua, không phải cắt giảm chi phí.',
      'Thị trường cạnh tranh lành mạnh tạo ra giá trị cho toàn xã hội.',
      'Chi phí thấp không phải lúc nào cũng là lợi thế. Giá trị gia tăng mới quan trọng.',
    ],
    tech_expert: [
      'Công nghệ phải phục vụ con người, không phải ngược lại. Hãy đặt người dùng lên hàng đầu.',
      'Đổi mới không có nghĩa là phá vỡ mọi quy tắc. Hãy sáng tạo có trách nhiệm.',
      'Dữ liệu của người dùng là tài sản cần được bảo vệ tuyệt đối. Minh bạch là chìa khóa.',
      'AI và tự động hóa cần đi kèm với đạo đức và trách nhiệm xã hội.',
      'Platform mạnh không có nghĩa là có thể lạm dụng vị thế. Hãy xây dựng hệ sinh thái công bằng.',
      'Bảo mật không phải tính năng phụ, mà là nền tảng của sự tin tưởng.',
      'Trải nghiệm người dùng tốt không chỉ về giao diện đẹp, mà còn về sự an toàn.',
    ],
    policy_maker: [
      'Quy định không phải là rào cản, mà là bảo vệ quyền lợi của tất cả các bên.',
      'Cân bằng giữa đổi mới và an toàn là nghệ thuật của quản lý tốt.',
      'Công bằng cạnh tranh tạo ra thị trường lành mạnh, nơi mọi người đều có cơ hội.',
      'Phúc lợi xã hội không phải chi phí mà là đầu tư cho tương lai bền vững.',
      'Minh bạch trong quy định giúp doanh nghiệp hiểu và tuân thủ tốt hơn.',
      'Quy định tốt không cản trở đổi mới, mà định hướng phát triển bền vững.',
      'Bảo vệ DN nhỏ là bảo vệ sự đa dạng và sức sống của thị trường.',
    ],
  };

  const advice = advicePool[mentorType];
  // Randomize advice selection instead of using round number
  const randomIndex = Math.floor(Math.random() * advice.length);
  return advice[randomIndex];
};
