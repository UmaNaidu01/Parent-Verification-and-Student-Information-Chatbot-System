import { User, Hash, Building2, GraduationCap, BookOpen, Phone, MapPin, BadgeCheck } from 'lucide-react'

export default function StudentProfileCard({ student }) {
  const details = [
    { icon: Hash, label: 'Reg ID', value: student.registrationNumber, color: 'text-blue-400' },
    { icon: Building2, label: 'Dept', value: student.department || 'CSE', color: 'text-indigo-400' },
    { icon: GraduationCap, label: 'Year', value: student.year || 'Sem 6', color: 'text-violet-400' },
    { icon: BookOpen, label: 'Sec', value: student.section || 'A', color: 'text-emerald-400' },
    { icon: Phone, label: 'Parent', value: student.parentPhone || 'N/A', color: 'text-rose-400' },
  ]

  return (
    <div className="bg-[#0F172A] rounded-3xl shadow-2xl border border-white/5 overflow-hidden transition-all duration-300">
      <div className="relative px-6 py-4 sm:px-8 sm:py-6">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-full bg-blue-600/5 blur-[80px]" />
        
        <div className="relative flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          {/* Compact Profile Section */}
          <div className="flex items-center gap-5 shrink-0">
            <div className="relative group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-xl">
                <div className="w-full h-full bg-slate-900 rounded-[0.9rem] flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-2 border-[#0F172A] rounded-lg flex items-center justify-center">
                <BadgeCheck className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <div className="text-left">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase leading-none">{student.name}</h2>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mt-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Verified Student
              </p>
            </div>
          </div>
          
          {/* Ultra-wide details bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-10">
            {details.map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="group flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] transition-all">
                <div className="w-8 h-8 rounded-lg bg-slate-900/50 flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
                  <p className="text-xs font-bold text-white truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
