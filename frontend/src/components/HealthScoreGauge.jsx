import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const HealthScoreGauge = ({ score = 85 }) => {
  const { t } = useTheme();

  let color = "#3B6D11"; // risk.low
  let statusText = "Optimal Health Range";
  let statusBg = "bg-[#EAF3DE] text-[#3B6D11] border-[#3B6D11]/30";

  if (score < 40) {
    color = "#A32D2D"; // risk.high
    statusText = "Needs Action: Low Score";
    statusBg = "bg-[#FCEBEB] text-[#A32D2D] border-[#A32D2D]/30";
  } else if (score < 70) {
    color = "#854F0B"; // risk.medium
    statusText = "Fair: Elevated Metabolic Risk";
    statusBg = "bg-[#FAEEDA] text-[#854F0B] border-[#854F0B]/30";
  }

  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-subtle">
      <div className="flex items-center gap-1.5 mb-2">
        <Heart className="w-4 h-4 text-accent dark:text-accent-dark fill-accent dark:fill-accent-dark" />
        <span className="text-xs font-bold text-text dark:text-text-dark">{t('healthScore')}</span>
      </div>

      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 150 150">
          <circle
            cx="75"
            cy="75"
            r={radius}
            className="text-border dark:text-border-dark"
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
          <span className="text-3xl font-extrabold text-text dark:text-text-dark tracking-tight">
            {score}
          </span>
          <span className="text-[10px] text-text-secondary dark:text-text-dark-secondary font-semibold uppercase tracking-wider">Out of 100</span>
        </div>
      </div>

      <span className={`mt-2 px-3 py-1 rounded-lg text-xs font-bold border ${statusBg}`}>
        {statusText}
      </span>
    </div>
  );
};

export default HealthScoreGauge;


