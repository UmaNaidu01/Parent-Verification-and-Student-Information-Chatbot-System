import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  GraduationCap,
  AlertTriangle,
  CreditCard,
  Bell,
  MessageCircle,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

const navItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Overview", desc: "Main Insights" },
  { path: "/dashboard/attendance", icon: CalendarCheck, label: "Attendance", desc: "Track Status" },
  { path: "/dashboard/academic", icon: GraduationCap, label: "Performance", desc: "Subject Grades" },
  { path: "/dashboard/backlogs", icon: AlertTriangle, label: "Backlogs", desc: "Pending Clearances" },
  { path: "/dashboard/fees", icon: CreditCard, label: "Fee Status", desc: "Payment Logs" },
  { path: "/dashboard/notifications", icon: Bell, label: "Updates", desc: "Campus News" },
  { path: "/dashboard/chatbot", icon: MessageCircle, label: "AI Assistant", desc: "24/7 Support" },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-72 bg-white dark:bg-[#0F172A] border-r border-slate-200 dark:border-white/5 text-slate-800 dark:text-white transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide mt-4">
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Main Navigation</p>
            {navItems.map(({ path, icon: Icon, label, desc }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/dashboard"}
                onClick={() => onClose?.()}
                className={({ isActive }) =>
                  `group relative flex items-center justify-between gap-3 px-4 py-4 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 shadow-lg shadow-blue-500/30 text-white"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-white"
                  }`
                }
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 ${
                    ({ isActive }) => isActive ? "bg-white/20" : "bg-slate-100 dark:bg-white/5"
                  }`}>
                    <Icon className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold tracking-tight">{label}</span>
                    <span className="block text-[9px] font-bold opacity-50 uppercase tracking-tighter">{desc}</span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 opacity-0 group-hover:opacity-100`} />
              </NavLink>
            ))}
          </nav>

          <div className="p-6 bg-slate-50/50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3 p-3 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none">Verified</p>
                <p className="text-[9px] text-slate-500 mt-1">Encrypted Session</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
