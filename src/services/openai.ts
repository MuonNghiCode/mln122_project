// OpenAI API Service
const OPENAI_API_KEY = "VITE_OPENAI_API_KEY";
const OPENAI_BASE_URL = "https://api.openai.com/v1";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

const LESSON_CONTEXT = `
Bạn là trợ lý AI chuyên về kinh tế, đặc biệt là về Cạnh tranh và Độc quyền trong nền kinh tế thị trường.

Nội dung bài học chính:

CHƯƠNG 4: CẠNH TRANH VÀ ĐỘC QUYỀN TRONG NỀN KINH TẾ THỊ TRƯỜNG

I. KHÁI NIỆM CƠ BẢN
- Cạnh tranh: Quá trình ganh đua giữa các chủ thể kinh tế để giành điều kiện sản xuất, tiêu thụ và lợi nhuận tốt nhất. Là động lực phát triển của kinh tế thị trường.
- Độc quyền: Trạng thái một/nhóm doanh nghiệp chiếm ưu thế tuyệt đối, chi phối giá cả, sản lượng và hành vi tiêu dùng.
- Mối quan hệ: Cạnh tranh → Doanh nghiệp lớn → Độc quyền → Công nghệ mới phá vỡ → Chu kỳ mới

II. TÁC ĐỘNG CỦA ĐỘC QUYỀN
Tiêu cực:
- Cạnh tranh không hoàn hảo gây thiệt hại người tiêu dùng và xã hội
- Kìm hãm tiến bộ kỹ thuật và kinh tế - xã hội
- Tăng phân hóa giàu nghèo

Tích cực:
- Tạo khả năng nghiên cứu, triển khai KHCN
- Tăng năng suất lao động, nâng cao năng lực cạnh tranh
- Phát triển kinh tế theo hướng sản xuất lớn

III. CẠNH TRANH TRUYỀN THỐNG
- Không gian vật lý: chợ, cửa hàng, khu công nghiệp
- Nguồn lực hữu hình: vốn, đất đai, mặt bằng, lao động
- Yếu tố cạnh tranh: giá cả, chất lượng sản phẩm
- Tốc độ chậm, thông tin qua báo chí, truyền miệng
- Quan hệ một chiều: người bán → người mua
- Rào cản gia nhập cao
- Ví dụ: Taxi truyền thống, siêu thị, cửa hàng tạp hóa

IV. CẠNH TRANH KINH TẾ SỐ (Grab, Shopee, TikTok Shop)
- Không gian số hóa: Internet, app di động, mạng xã hội
- Dữ liệu là vũ khí cạnh tranh chính
- Công nghệ và thuật toán quyết định thành công (AI, Big Data)
- Tốc độ cực nhanh: thay đổi theo giờ, phút
- Quan hệ đa chiều: người dùng vừa là khách, người bán, người tạo nội dung
- Cạnh tranh hệ sinh thái: giành thời gian và dữ liệu người dùng

V. SO SÁNH TRUYỀN THỐNG VS SỐ
1. Không gian: Vật lý vs Số hóa
2. Yếu tố cốt lõi: Giá + vị trí vs Dữ liệu + AI
3. Tốc độ: Tháng/quý vs Real-time
4. Quan hệ: Một chiều vs Hai chiều
5. Chi phí mở rộng: Cao vs Thấp hơn 80%
6. Thị trường: Địa lý vs Toàn cầu
7. Ví dụ: Taxi Mai Linh vs Grab

VI. TÁC ĐỘNG CẠNH TRANH SỐ
Tích cực:
- Thúc đẩy đổi mới, tăng năng suất 150%
- Cơ hội cho SMEs tăng 200%
- Giá người mua giảm 15-40%
- Toàn cầu hóa

Tiêu cực:
- Độc quyền số 60-80% thị phần
- Cạnh tranh không lành mạnh: thao túng thuật toán, đốt tiền
- SMEs phụ thuộc 85%
- Rủi ro dữ liệu cao

VII. KẾT LUẬN & BÀI HỌC
- Doanh nghiệp: Chuyển đổi số, xây dựng thương hiệu, đầu tư AI
- Nhà nước: Quản lý cạnh tranh, chống độc quyền số, bảo vệ dữ liệu
- Hỗ trợ SMEs: Đào tạo, tài chính ưu đãi, tiếp cận công nghệ

Hãy trả lời các câu hỏi một cách chi tiết, dựa trên nội dung bài học này. Giải thích rõ ràng, dễ hiểu và đưa ra ví dụ thực tế khi cần thiết. Trả lời bằng tiếng Việt.
`;

export const createChatCompletion = async (
  messages: ChatMessage[]
): Promise<string> => {
  try {
    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: LESSON_CONTEXT,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
};

// Session Management
const SESSIONS_KEY = "chatbot_sessions";
const CURRENT_SESSION_KEY = "current_session_id";

export const getSessions = (): ChatSession[] => {
  const sessionsData = localStorage.getItem(SESSIONS_KEY);
  return sessionsData ? JSON.parse(sessionsData) : [];
};

export const getCurrentSessionId = (): string | null => {
  return localStorage.getItem(CURRENT_SESSION_KEY);
};

export const setCurrentSessionId = (sessionId: string): void => {
  localStorage.setItem(CURRENT_SESSION_KEY, sessionId);
};

export const createNewSession = (): ChatSession => {
  const newSession: ChatSession = {
    id: Date.now().toString(),
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const sessions = getSessions();
  sessions.unshift(newSession);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  setCurrentSessionId(newSession.id);

  return newSession;
};

export const getSession = (sessionId: string): ChatSession | null => {
  const sessions = getSessions();
  return sessions.find((s) => s.id === sessionId) || null;
};

export const updateSession = (session: ChatSession): void => {
  const sessions = getSessions();
  const index = sessions.findIndex((s) => s.id === session.id);

  if (index !== -1) {
    session.updatedAt = Date.now();
    sessions[index] = session;
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  }
};

export const deleteSession = (sessionId: string): void => {
  const sessions = getSessions();
  const filteredSessions = sessions.filter((s) => s.id !== sessionId);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(filteredSessions));

  if (getCurrentSessionId() === sessionId) {
    localStorage.removeItem(CURRENT_SESSION_KEY);
  }
};

