import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function CGPATrendChart({ data }) {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="cgpaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-gray-700/50" />
          <XAxis
            dataKey="semester"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
            dy={10}
          />
          <YAxis
            domain={[0, 10]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
              padding: '12px'
            }}
            itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#3b82f6' }}
            labelStyle={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', fontWeight: '800' }}
            formatter={(value) => [value, 'CGPA']}
          />
          <Area
            type="monotone"
            dataKey="cgpa"
            stroke="#3b82f6"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#cgpaGradient)"
            dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
