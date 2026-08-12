import React from 'react';
import { motion } from 'framer-motion';

const RiskGauge = ({ percentage = 0, riskLevel = "Low Risk", confidence = "High Confidence", outcome = 0 }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let strokeColor = "#3B6D11"; // risk.low
  let statusBadgeBg = "bg-[#EAF3DE] text-[#3B6D11] border-[#3B6D11]/30";

  if (percentage >= 65 || outcome === 1) {
    strokeColor = "#A32D2D"; // risk.high
    statusBadgeBg = "bg-[#FCEBEB] text-[#A32D2D] border-[#A32D2D]/30";
  } else if (percentage >= 30) {
    strokeColor = "#854F0B"; // risk.medium
    statusBadgeBg = "bg-[#FAEEDA] text-[#854F0B] border-[#854F0B]/30";
  }

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-subtle">
      <span className="text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-text-dark-secondary mb-2">
        Diabetes Risk Meter
      </span>

      <div className="relative w-44 h-44 flex items-center justify-center">
        {/* SVG Circular Progress Bar */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="text-border dark:text-border-dark"
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
          />
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            strokeWidth="12"
            stroke={strokeColor}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span 
            className="text-3xl font-extrabold tracking-tight text-text dark:text-text-dark"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {percentage}%
          </motion.span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary dark:text-text-dark-secondary mt-0.5">
            Probability
          </span>
        </div>
      </div>

      {/* Dynamic Status Pill */}
      <div className="mt-3 flex flex-col items-center gap-1.5 text-center">
        <span className={`px-3 py-1 rounded-lg text-xs font-extrabold border ${statusBadgeBg} tracking-tight`}>
          {riskLevel} • {outcome === 1 ? 'Elevated Risk' : 'Normal Range'}
        </span>
        <span className="text-[11px] font-medium text-text-secondary dark:text-text-dark-secondary">
          Confidence: <strong className="text-text dark:text-text-dark">{confidence}</strong>
        </span>
      </div>
    </div>
  );
};

export default RiskGauge;


