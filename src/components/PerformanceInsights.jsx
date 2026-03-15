import { TrendingUp, TrendingDown, Lightbulb } from 'lucide-react';

export default function PerformanceInsights({ insights }) {
  if (!insights) return null;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm p-6 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100 mb-5 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-500" />
        Performance Insights
      </h3>
      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
          <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">Strongest Subject</p>
            <p className="font-semibold text-slate-900 dark:text-gray-100">{insights.strongSubject}</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
          <TrendingDown className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-rose-800 dark:text-rose-300 uppercase tracking-wider mb-1">Needs Improvement</p>
            <p className="font-semibold text-slate-900 dark:text-gray-100">{insights.weakSubject}</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
          <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-1">AI Suggestion</p>
            <p className="text-sm font-medium text-slate-700 dark:text-gray-300 leading-relaxed">{insights.suggestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
