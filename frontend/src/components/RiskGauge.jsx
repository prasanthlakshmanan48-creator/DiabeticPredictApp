import React from 'react';
import { motion } from 'framer-motion';

const RiskGauge = ({ percentage = 0, riskLevel = "Low Risk", confidence = "High Confidence", outcome = 0 }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let strokeColor = "#10B981"; // Green
  let bgGlow = "shadow-glow-teal";
  let statusBadgeBg = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300";

  if (percentage >= 65 || outcome === 1) {
    strokeColor = "#EF4444"; // Red
    bgGlow = "shadow-glow-red";
    statusBadgeBg = "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-300";
  } else if (percentage >= 30) {
    strokeColor = "#F59E0B"; // Amber
    bgGlow = "shadow-glow-primary";
    statusBadgeBg = "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300";
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* SVG Circular Progress Bar */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="text-slate-100 dark:text-slate-800"
            strokeWidth="14"
            stroke="currentColor"
            fill="transparent"
          />
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            strokeWidth="14"
            stroke={strokeColor}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span 
            className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {percentage}%
          </motion.span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-1">
            Diabetes Probability
          </span>
        </div>
      </div>

      {/* Dynamic Status Pill */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${statusBadgeBg} shadow-sm uppercase tracking-wide`}>
          {riskLevel} • {outcome === 1 ? 'High Risk Diabetic' : 'Low Risk Non-Diabetic'}
        </span>
        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
          Model Confidence: <strong className="text-slate-700 dark:text-slate-200">{confidence}</strong>
        </span>
      </div>
    </div>
  );
};

export default RiskGauge;
