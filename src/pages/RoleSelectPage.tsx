import { motion } from "framer-motion";
import { useState } from "react";
import type { MentorType } from "../types/game";
import MentorCard from "../components/MentorCard";

interface RoleSelectPageProps {
  onSelect: (role: string, mentor?: MentorType) => void;
}

const roles = [
  {
    key: "smallbiz",
    name: "Cửa hàng truyền thống",
    description:
      "Người chơi đại diện cho các doanh nghiệp nhỏ, cạnh tranh với nền tảng số.",
    badge: "CH",
    color: "from-blue-600 via-cyan-600 to-blue-700",
    shadow: "hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.6)]",
    glow: "hover:drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]",
  },
  {
    key: "platform",
    name: "Nền tảng số",
    description:
      "Người chơi điều hành nền tảng số lớn, mở rộng thị trường và tối ưu hóa lợi nhuận.",
    badge: "NT",
    color: "from-purple-600 via-violet-600 to-purple-700",
    shadow: "hover:shadow-[0_0_60px_-10px_rgba(147,51,234,0.6)]",
    glow: "hover:drop-shadow-[0_0_20px_rgba(147,51,234,0.4)]",
  },
  {
    key: "regulator",
    name: "Cơ quan quản lý",
    description:
      "Người chơi là nhà quản lý, đưa ra chính sách cân bằng lợi ích các bên.",
    badge: "CQ",
    color: "from-amber-600 via-orange-600 to-amber-700",
    shadow: "hover:shadow-[0_0_60px_-10px_rgba(234,88,12,0.6)]",
    glow: "hover:drop-shadow-[0_0_20px_rgba(234,88,12,0.4)]",
  },
];

const mentorTypes: MentorType[] = ["economist", "tech_expert", "policy_maker"];

export default function RoleSelectPage({ onSelect }: RoleSelectPageProps) {
  const [step, setStep] = useState<"role" | "mentor">("role");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<MentorType | null>(null);

  const handleRoleSelect = (roleKey: string) => {
    setSelectedRole(roleKey);
    setStep("mentor");
  };

  const handleMentorSelect = (mentorType: MentorType) => {
    setSelectedMentor(mentorType);
  };

  const handleConfirm = () => {
    if (selectedRole && selectedMentor) {
      onSelect(selectedRole, selectedMentor);
    }
  };

  const handleBack = () => {
    setStep("role");
    setSelectedMentor(null);
  };

  const selectedRoleInfo = roles.find((r) => r.key === selectedRole);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center relative overflow-hidden py-8 sm:py-12">
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #ff6b00 0%, #8b00ff 50%, transparent 70%)",
        }}
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6">
        {step === "role" ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-3 sm:mb-4 px-4">
                <span className="bg-linear-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                  Cuộc Chiến Thị Trường
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300">
                Chọn vai trò và bước vào trận chiến
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {roles.map((role, idx) => (
                <motion.button
                  key={role.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  whileHover={{ scale: 1.04, y: -8 }}
                  onClick={() => handleRoleSelect(role.key)}
                  className={`relative bg-gray-900/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-gray-800 hover:border-gray-700 transition-all ${role.shadow}`}
                >
                  <div className="mb-4 sm:mb-6 flex justify-center">
                    <div
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-linear-to-br ${role.color} flex items-center justify-center shadow-2xl`}
                    >
                      <span className="text-3xl sm:text-4xl font-black text-white">
                        {role.badge}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    {role.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {role.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6 sm:mb-8"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 px-4">
                <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Chọn Cố Vấn
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-2 px-4">
                Cố vấn sẽ tăng cường chỉ số và cho lời khuyên
              </p>
              {selectedRoleInfo && (
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-full mt-2">
                  <span className="text-xs sm:text-sm text-gray-400">
                    Vai trò:
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-bold bg-linear-to-r ${selectedRoleInfo.color} bg-clip-text text-transparent`}
                  >
                    {selectedRoleInfo.name}
                  </span>
                </div>
              )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {mentorTypes.map((mentorType, index) => (
                <MentorCard
                  key={mentorType}
                  mentorType={mentorType}
                  selected={selectedMentor === mentorType}
                  onSelect={() => handleMentorSelect(mentorType)}
                  index={index}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleBack}
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-full text-sm sm:text-base"
              >
                ← Quay lại
              </motion.button>

              {selectedMentor && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleConfirm}
                  className="w-full sm:w-auto px-8 sm:px-12 py-2.5 sm:py-3 bg-linear-to-r from-orange-500 to-amber-500 text-white font-bold rounded-full shadow-lg text-sm sm:text-base"
                >
                  Bắt đầu chơi →
                </motion.button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
