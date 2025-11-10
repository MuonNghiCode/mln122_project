import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";
import HomePage from "./pages/HomePage";
import LessonsPage from "./pages/LessonsPage";
import RulesPage from "./pages/RulesPage";
import RoleSelectPage from "./pages/RoleSelectPage";
import GamePage from "./pages/GamePage";
import AchievementsPage from "./pages/AchievementsPage";
import ResultPage from "./pages/ResultPage";
import AcademicIntegrityPage from "./pages/AcademicIntegrityPage";
import { useGame } from "./contexts/GameContext";
import type { Role } from "./types/game";

export default function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { startGame } = useGame();

  // Khi loading xong, chuyển sang HomePage
  const handleLoadingDone = () => {
    setLoading(false);
    navigate("/home");
  };

  // Khi đọc xong rules, chuyển sang chọn vai trò
  const handleRulesContinue = () => {
    navigate("/select-role");
  };

  // Khi chọn vai trò và mentor, khởi động game và chuyển sang trang game
  const handleSelectRole = (r: string, mentor?: string) => {
    console.log("Selected role:", r, "mentor:", mentor);
    startGame(r as Role, "normal", mentor as any);
    navigate("/game");
  };

  return (
    <div className="relative w-full h-full min-h-screen">
      {/* Overlay loading, chỉ hiển thị khi loading */}
      {loading && (
        <div className="fixed inset-0 z-50">
          <LoadingPage onDone={handleLoadingDone} />
        </div>
      )}
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route
          path="/rules"
          element={<RulesPage onContinue={handleRulesContinue} />}
        />
        <Route
          path="/select-role"
          element={<RoleSelectPage onSelect={handleSelectRole} />}
        />
        <Route
          path="/role-select"
          element={<RoleSelectPage onSelect={handleSelectRole} />}
        />
        <Route path="/game" element={<GamePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route
          path="/academic-integrity"
          element={<AcademicIntegrityPage />}
        />
      </Routes>
    </div>
  );
}
