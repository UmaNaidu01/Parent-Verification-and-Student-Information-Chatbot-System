import { LogOut, User, Menu, Moon, Sun, Lock } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar({ onMenuClick, onLogout }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0F172A]/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-white/5 shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between h-full px-6 sm:px-8 lg:px-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all transform active:scale-95"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-sm sm:text-base font-black text-white tracking-widest uppercase hidden md:block">
              Parent <span className="text-blue-500">Academic</span> Monitoring
            </h1>
            <h1 className="text-sm font-black text-white tracking-widest uppercase md:hidden">
              PAMS
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all border border-white/5 shadow-inner"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-white/10 h-8">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all cursor-pointer">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center p-1.5 group-hover:rotate-6 transition-transform">
                <User className="w-full h-full text-white" />
              </div>
              <span className="hidden sm:inline text-xs font-bold text-white uppercase tracking-tighter">
                Parent Account
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to terminate the secure session?")) {
                  onLogout?.();
                }
              }}
              className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20 shadow-lg group active:scale-95"
              title="Terminate Secure Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
