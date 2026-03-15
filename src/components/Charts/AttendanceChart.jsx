import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

export default function AttendanceChart({ data }) {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <defs>
            {COLORS.map((color, index) => (
              <linearGradient key={`grad-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.6} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-gray-700/50" />
          <XAxis
            dataKey="subject"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
            interval={0}
            dy={10}
          />
          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
            dx={-10}
          />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
              padding: '12px'
            }}
            itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
            labelStyle={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', fontWeight: '800' }}
            formatter={(value) => [`${value}%`, 'Attendance Rate']}
          />
          <Bar dataKey="attendance" radius={[8, 8, 0, 0]} barSize={40}>
            {data?.map((_, index) => (
              <Cell key={`cell-${index}`} fill={`url(#barGradient-${index % COLORS.length})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
