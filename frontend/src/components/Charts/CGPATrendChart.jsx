import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function CGPATrendChart({ data }) {
  return (
    <div className="h-[300px] w-full mt-4 group">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
          <defs>
            <linearGradient id="cgpaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#e2e8f0" className="dark:stroke-gray-700/30" />
          
          <XAxis
            dataKey="semester"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
            dy={15}
          />
          
          <YAxis
            domain={[0, 10]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
            dx={-10}
            tickCount={6}
          />
          
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-4 rounded-2xl shadow-2xl flex flex-col gap-0.5">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</p>
                    <div className="flex items-baseline gap-2">
                       <p className="text-xl font-black text-blue-600 dark:text-blue-400">{payload[0].value}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase">GPA</p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />

          <Area
            type="monotone"
            dataKey="cgpa"
            stroke="url(#lineGradient)"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#cgpaGradient)"
            dot={{ r: 5, fill: '#3b82f6', strokeWidth: 3, stroke: '#fff', className: "drop-shadow-lg" }}
            activeDot={{ r: 8, fill: '#6366f1', strokeWidth: 0 }}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
