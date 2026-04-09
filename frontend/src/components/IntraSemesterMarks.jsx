import React from 'react';
import { Table, Microscope, ClipboardList, Target } from 'lucide-react';

const IntraSemesterMarks = ({ marks }) => {
  if (!marks || marks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200/80 dark:border-gray-700 shadow-sm p-8 text-center">
        <p className="text-slate-500 dark:text-gray-400">No intra-semester marks available yet.</p>
      </div>
    );
  }

  const columns = ["Examination", ...marks.map(m => m.subject)];
  
  const examRows = [
    { label: "Module 1 (M1)", key: "m1", icon: <Target className="text-blue-500" size={16} /> },
    { label: "Module 2 (M2)", key: "m2", icon: <Microscope className="text-purple-500" size={16} /> },
    { label: "Technical Review (T1)", key: "t1", icon: <ClipboardList className="text-amber-500" size={16} /> },
    { label: "Cumulative Score", key: "total", icon: <Table className="text-emerald-500" size={16} /> }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200/80 dark:border-gray-700 shadow-sm p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
          <ClipboardList className="text-indigo-600 dark:text-indigo-400" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-gray-100">Intra Semester Examinations</h3>
          <p className="text-xs text-slate-500">Subject-wise performance breakdown</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 bg-slate-50 dark:bg-slate-900/50 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-gray-700 rounded-tl-xl">
                Examination
              </th>
              {marks.map((m, idx) => (
                <th key={idx} className="p-4 bg-slate-50 dark:bg-slate-900/50 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-gray-700">
                  {m.subject}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {examRows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-slate-50/50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="p-4 border-b border-slate-50 dark:border-gray-700/50">
                  <div className="flex items-center gap-3">
                    {row.icon}
                    <span className="text-sm font-bold text-slate-700 dark:text-gray-200">{row.label}</span>
                  </div>
                </td>
                {marks.map((m, colIdx) => {
                  const val = m[row.key];
                  const isLow = val < (row.key === 'total' ? 40 : 15); // Simple visual indicator
                  return (
                    <td key={colIdx} className="p-4 text-center border-b border-slate-50 dark:border-gray-700/50">
                      <span className={`text-sm font-black ${isLow ? 'text-rose-500' : 'text-slate-600 dark:text-gray-300'}`}>
                        {val}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 pt-4 border-t border-slate-50 dark:border-gray-700/50">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="w-2 h-2 rounded-full bg-rose-500"></div> Critical Review
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Satisfactory
        </div>
      </div>
    </div>
  );
};

export default IntraSemesterMarks;
