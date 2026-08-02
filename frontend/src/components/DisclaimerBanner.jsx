import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const DisclaimerBanner = () => {
  const { t } = useTheme();

  return (
    <div className="bg-amber-500/10 dark:bg-amber-950/40 border-b border-amber-500/30 px-4 py-2 text-amber-800 dark:text-amber-300 text-xs font-semibold">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
        <span>{t('disclaimer')}</span>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
