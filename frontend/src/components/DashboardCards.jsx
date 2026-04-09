import { CalendarCheck, Award, AlertCircle, CreditCard, TrendingUp } from 'lucide-react'

const cardConfig = [
  {
    title: 'Attendance %',
    valueKey: 'attendancePercentage',
    icon: CalendarCheck,
    color: 'from-emerald-400 to-teal-500',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
    trend: '+2.4%',
  },
  {
    title: 'Current CGPA',
    valueKey: 'cgpa',
    icon: Award,
    color: 'from-blue-500 to-indigo-600',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    trend: 'Steady',
  },
  {
    title: 'Backlogs',
    valueKey: 'backlogsCount',
    icon: AlertCircle,
    color: 'from-orange-400 to-rose-500',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-500',
    trend: 'Improved',
  },
  {
    title: 'Pending Fees',
    valueKey: 'pendingFees',
    icon: CreditCard,
    color: 'from-fuchsia-500 to-purple-600',
    iconBg: 'bg-fuchsia-500/10',
    iconColor: 'text-fuchsia-500',
    trend: 'Latest:REC-67890',
  },
]

export default function DashboardCards({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardConfig.map(({ title, valueKey, icon: Icon, color, iconBg, iconColor, trend }) => (
        <div
          key={title}
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/60 dark:border-gray-700/50 p-6 group hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
          {/* Subtle Top-Right Accent Glow */}
          <div className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${color} opacity-[0.03] dark:opacity-[0.1] blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
          
          <div className="flex flex-col h-full relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className={`p-3.5 rounded-xl bg-gradient-to-tr ${color} text-white shadow-lg shadow-current/20 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">{trend}</span>
              </div>
            </div>
            
            <div className="mt-auto">
              <p className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">{title}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">
                  {valueKey === 'pendingFees' ? `₹${data[valueKey] || '0'}` : (valueKey === 'attendancePercentage' ? `${data[valueKey]}` : data[valueKey])}
                </span>
                {valueKey === 'attendancePercentage' && <span className="text-sm font-bold text-slate-400">%</span>}
              </div>
            </div>
          </div>

          {/* Invisible hover line bottom */}
          <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${color} transition-all duration-500 w-0 group-hover:w-full`} />
        </div>
      ))}
    </div>
  )
}
