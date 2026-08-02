import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const HealthScoreGauge = ({ score = 85 }) => {
  const { t } = useTheme();

  let color = "#10B981"; // Green (80-100)
  let statusText = "Excellent Health Score";
  let statusBg = "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300";

  if (score < 40) {
    color = "#EF4444"; // Red (0-39)
    statusText = "Action Required: Low Score";
    statusBg = "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/60 dark:text-red-300";
  } else if (score < 60) {
    color = "#F97316"; // Orange (40-59)
    statusText = "Fair Health: Moderate Risk";
    statusBg = "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300";
  } else if (score < 80) {
    color = "#F59E0B"; // Yellow (60-79)
    statusText = "Good Health Score";
    statusBg = "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300";
  }

  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl shadow-glass dark:shadow-glass-dark">
      <div className="flex items-center gap-2 mb-2">
        <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{t('healthScore')}</span>
      </div>

      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 150 150">
          <circle
            cx="75"
            cy="75"
            r={radius}
            className="text-slate-100 dark:text-slate-800"
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
          />
          <motion.circle
            cx="75"
            cy="75"
            r={radius}
            strokeWidth="12"
            stroke={color}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {score}
          </span>
          <span className="text-[10px] text-slate-400 font-semibold uppercase">Out of 100</span>
        </div>
      </div>

      <span className={`mt-2 px-3 py-1 rounded-full text-[11px] font-bold border ${statusBg}`}>
        {statusText}
      </span>
    </div>
  );
};

export default HealthScoreGauge;
