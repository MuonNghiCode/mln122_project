import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  createChatCompletion,
  type ChatMessage,
} from "../services/openai";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: inputMessage.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      const assistantResponse = await createChatCompletion(newMessages);

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: assistantResponse,
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <>
      {/* Floating Button - Samsung Style */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 w-[72px] h-[72px] bg-gradient-to-br from-[#147CE5] to-[#0A4D9F] rounded-[24px] shadow-[0_8px_32px_rgba(20,124,229,0.4)] flex items-center justify-center backdrop-blur-lg hover:shadow-[0_12px_40px_rgba(20,124,229,0.5)] transition-all duration-300"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 14.99 3 16.26V22L8.74 19C9.81 19.32 10.89 19.5 12 19.5C17.52 19.5 22 15.02 22 9.5C22 6.48 17.52 2 12 2Z" fill="white"/>
              <circle cx="8.5" cy="10" r="1.5" fill="#147CE5"/>
              <circle cx="12" cy="10" r="1.5" fill="#147CE5"/>
              <circle cx="15.5" cy="10" r="1.5" fill="#147CE5"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Samsung One UI Style */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-8 right-8 z-50 w-[400px] h-[650px] bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-[0_16px_64px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-gray-200/50"
          >
            {/* Header - Samsung Style */}
            <div className="bg-gradient-to-br from-[#147CE5] to-[#0A4D9F] px-6 pt-8 pb-6 rounded-t-[32px]">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 14.99 3 16.26V22L8.74 19C9.81 19.32 10.89 19.5 12 19.5C17.52 19.5 22 15.02 22 9.5C22 6.48 17.52 2 12 2Z" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg tracking-tight">Trợ lý AI</h3>
                    <p className="text-xs text-white/70 font-medium">Luôn sẵn sàng hỗ trợ</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 hover:bg-white/20 rounded-2xl transition-all duration-200 text-white flex items-center justify-center"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={handleClearChat}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full transition-all duration-200 text-white text-sm font-medium"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m3 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6h14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Xóa đoạn chat
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 14.99 3 16.26V22L8.74 19C9.81 19.32 10.89 19.5 12 19.5C17.52 19.5 22 15.02 22 9.5C22 6.48 17.52 2 12 2Z" fill="#147CE5"/>
                    </svg>
                  </div>
                  <h3 className="text-gray-900 font-bold text-lg mb-2">Xin chào! 👋</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    Hãy đặt câu hỏi về bài học<br/>Tôi luôn sẵn sàng giúp bạn!
                  </p>
                  <div className="space-y-2">
                    {[
                      { q: "Cạnh tranh là gì?", icon: "💡" },
                      { q: "So sánh truyền thống vs số?", icon: "📊" },
                      { q: "Tác động của độc quyền?", icon: "🎯" },
                    ].map((item, i) => (
                      <button
                        key={i}
                        onClick={() => setInputMessage(item.q)}
                        className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-left text-sm text-gray-700 font-medium transition-all duration-200 flex items-center gap-3"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.q}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-[#147CE5] to-[#0A4D9F] rounded-full flex items-center justify-center mr-2 flex-shrink-0 shadow-lg">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="8" cy="10" r="1.5" fill="white"/>
                        <circle cx="12" cy="10" r="1.5" fill="white"/>
                        <circle cx="16" cy="10" r="1.5" fill="white"/>
                      </svg>
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-5 py-3 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-[#147CE5] to-[#0A4D9F] text-white rounded-[20px] rounded-tr-[8px] shadow-lg"
                        : "bg-gray-100 text-gray-800 rounded-[20px] rounded-tl-[8px]"
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-medium">
                      {message.content}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start items-center gap-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#147CE5] to-[#0A4D9F] rounded-full flex items-center justify-center shadow-lg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="8" cy="10" r="1.5" fill="white"/>
                      <circle cx="12" cy="10" r="1.5" fill="white"/>
                      <circle cx="16" cy="10" r="1.5" fill="white"/>
                    </svg>
                  </div>
                  <div className="bg-gray-100 px-5 py-3 rounded-[20px] rounded-tl-[8px] flex gap-1">
                    <span className="w-2 h-2 bg-[#147CE5] rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-[#147CE5] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <span className="w-2 h-2 bg-[#147CE5] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input - Samsung Style */}
            <div className="px-6 pb-6 pt-3 bg-white/80 backdrop-blur-xl border-t border-gray-100">
              <div className="flex gap-3 items-end">
                <div className="flex-1 bg-gray-100 rounded-[24px] px-5 py-3 flex items-center gap-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập tin nhắn..."
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-gray-800 text-sm placeholder-gray-400 focus:outline-none disabled:opacity-50 font-medium"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="w-12 h-12 bg-gradient-to-br from-[#147CE5] to-[#0A4D9F] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

