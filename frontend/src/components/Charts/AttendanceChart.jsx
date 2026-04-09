import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

export default function AttendanceChart({ data }) {
  return (
    <div className="h-[300px] w-full mt-4 group">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}>
          <defs>
            {COLORS.map((color, index) => (
              <linearGradient key={`grad-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor={color} stopOpacity={0.4} />
              </linearGradient>
            ))}
            {/* Glossy overlay effect */}
            <linearGradient id="gloss" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity={0.1} />
              <stop offset="50%" stopColor="#fff" stopOpacity={0} />
              <stop offset="100%" stopColor="#fff" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#e2e8f0" className="dark:stroke-gray-700/30" />
          
          <XAxis
            dataKey="subject"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
            interval={0}
            angle={-30}
            textAnchor="end"
            height={70}
            tickFormatter={(val) => val.startsWith('Semester') ? val : val.split(' ')[0]}
          />
          
          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
            tickFormatter={(val) => `${val}%`}
            dx={-10}
          />
          
          <Tooltip
            cursor={{ fill: 'transparent' }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-4 rounded-2xl shadow-2xl flex flex-col gap-1 transition-all">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</p>
                    <div className="flex items-baseline gap-2">
                       <p className="text-xl font-black text-slate-800 dark:text-white">{payload[0].value}%</p>
                       <p className="text-[10px] font-bold text-blue-500 uppercase">Attendance</p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />

          {/* Background Bar (Track) */}
          <Bar dataKey="attendance" radius={[12, 12, 0, 0]} barSize={34} background={{ fill: '#f1f5f9', radius: 12 }} className="dark:fill-gray-700/20">
            {data?.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={`url(#barGradient-${index % COLORS.length})`}
                className="transition-all duration-500 hover:opacity-80"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
