import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm sm:text-base">
            © 2025 Phiên tòa Cạnh tranh. Tất cả quyền được bảo lưu.
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/academic-integrity"
              className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
            >
              Cam kết liêm chính học thuật
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

