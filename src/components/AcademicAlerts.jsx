import { AlertCircle, Calendar, FileText } from 'lucide-react';

const iconMap = {
  attendance: AlertCircle,
  exam: Calendar,
  assignment: FileText,
};

const colorMap = {
  attendance: 'bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/50',
  exam: 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/50',
  assignment: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50',
};

export default function AcademicAlerts({ alerts }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm p-6 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100 mb-5 flex items-center gap-2">
        <div className="relative">
          <AlertCircle className="w-5 h-5 text-blue-500 relative z-10" />
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20" />
        </div>
        Alerts & Updates
      </h3>
      <div className="space-y-3">
        {alerts?.map((alert, index) => {
          const Icon = iconMap[alert.type] || AlertCircle;
          const colorClass = colorMap[alert.type] || 'bg-slate-50 dark:bg-gray-700/50 text-slate-800 dark:text-gray-300 border-slate-200 dark:border-gray-600';
          return (
            <div
              key={index}
              className={`flex items-start gap-3 p-4 rounded-xl border ${colorClass}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">{alert.title}</p>
                <p className="text-sm opacity-90 mt-1">{alert.message}</p>
                {alert.date && (
                  <p className="text-xs mt-2 opacity-75 font-medium">{alert.date}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
