import { LogOut, User, Menu, Moon, Sun, Lock, ChevronDown, Phone } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Navbar({ onMenuClick, onLogout }) {
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Get student data from localStorage
  const authData = JSON.parse(localStorage.getItem('auth') || '{}');
  const [displayPhone, setDisplayPhone] = useState(authData.phone || 'N/A');

  // Background fetch to sync phone number if missing from localStorage
  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const res = await axios.get('/api/v1/student/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.data.student?.phone) {
          setDisplayPhone(res.data.student.phone);
          // Update localStorage for future
          localStorage.setItem('auth', JSON.stringify({
            ...authData,
            phone: res.data.student.phone
          }));
        }
      } catch (err) {
        console.error("Error syncing navbar profile:", err);
      }
    };

    if (displayPhone === 'N/A') {
      fetchPhone();
    }
  }, [displayPhone, authData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 shadow-sm dark:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between h-full px-6 sm:px-8 lg:px-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-slate-500 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-800 dark:hover:text-white transition-all transform active:scale-95"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-sm sm:text-base font-black text-slate-800 dark:text-white tracking-widest uppercase hidden md:block">
              Parent <span className="text-blue-500">Academic</span> Monitoring
            </h1>
            <h1 className="text-sm font-black text-slate-800 dark:text-white tracking-widest uppercase md:hidden">
              PAMS
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/70 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-200 dark:border-white/5 shadow-inner"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-white/10 h-8 relative" ref={dropdownRef}>
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 group hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer active:scale-95"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center p-1.5 group-hover:rotate-6 transition-transform">
                <User className="w-full h-full text-white" />
              </div>
              <span className="hidden sm:inline text-xs font-bold text-slate-700 dark:text-white uppercase tracking-tighter">
                {authData.name || 'Parent Account'}
              </span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 p-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-3 mb-2 border-b border-slate-100 dark:border-white/5">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Guardian Contact</p>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-white font-bold">
                    <Phone className="w-3 h-3 text-blue-500" />
                    <span>{displayPhone}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    if (window.confirm("Are you sure you want to logout?")) {
                      onLogout?.();
                    }
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors font-bold text-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                    <LogOut className="w-4 h-4" />
                  </div>
                  Logout Session
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>

  );
}
