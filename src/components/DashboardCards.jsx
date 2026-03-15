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
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-slate-200/60 dark:border-gray-700/50 p-6 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* Subtle background glow on hover */}
          <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-500`} />
          
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${iconBg} ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="text-3xl font-black text-slate-800 dark:text-gray-100 tracking-tight">
                  {valueKey === 'pendingFees' ? `₹${data[valueKey] || '0'}` : (valueKey === 'attendancePercentage' ? `${data[valueKey]}%` : data[valueKey])}
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">{trend}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-gray-700/50">
              <h3 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">{title}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
