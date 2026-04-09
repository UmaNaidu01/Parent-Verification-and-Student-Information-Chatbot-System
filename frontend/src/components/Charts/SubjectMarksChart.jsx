import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

export default function SubjectMarksChart({ data }) {
  // We want to format subject names to be shorter on the X axis so they fit better
  const formatSubject = (name) => {
    if(!name) return "";
    let shortName = name.replace(/\(Sem \d+\)/i, '').trim();
    return shortName.length > 15 ? shortName.substring(0, 15) + '...' : shortName;
  };

  return (
    <div className="h-[300px] w-full mt-4 group">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#e2e8f0" className="dark:stroke-gray-700/30" />

          <XAxis
            dataKey="subject"
            axisLine={false}
            tickLine={false}
            tickFormatter={formatSubject}
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
            dy={15}
            interval={0}
            angle={-25}
            textAnchor="end"
          />

          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
            dx={-10}
            tickCount={6}
          />

          <Tooltip
            cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const mark = payload[0].value;
                const grade = payload[0].payload.grade;
                return (
                  <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-4 rounded-2xl shadow-2xl flex flex-col gap-1">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</p>
                    <div className="flex items-baseline gap-2">
                       <p className="text-xl font-black text-blue-600 dark:text-blue-400">{mark}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase">/ 100</p>
                    </div>
                    {grade && (
                       <div className="mt-1 pt-1 border-t border-slate-200 dark:border-slate-800 flex justify-between">
                         <span className="text-[10px] font-bold text-slate-500">GRADE</span>
                         <span className="text-xs font-black text-indigo-500">{grade}</span>
                       </div>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />

          <Bar 
            dataKey="marks" 
            radius={[6, 6, 0, 0]}
            animationDuration={1500}
            barSize={40}
          >
            {data && data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="url(#barGradient)" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
