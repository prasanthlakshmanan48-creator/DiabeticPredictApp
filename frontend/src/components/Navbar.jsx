import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Activity, Type, Eye, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { darkMode, toggleDarkMode, largeFont, toggleLargeFont, highContrast, toggleHighContrast, language, setLanguage, t } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-surface/90 dark:bg-[#121518]/80 backdrop-blur-xl border-b border-border dark:border-white/10 px-4 lg:px-8 py-3 transition-colors duration-200">

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-accent dark:bg-accent-dark text-white dark:text-bg-dark flex items-center justify-center transition-transform group-hover:scale-105">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base lg:text-lg text-text dark:text-text-dark tracking-tight">
                {t('title')}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark rounded-md border border-accent/20 dark:border-accent-dark/20">
                Clinical AI
              </span>
            </div>
            <p className="text-[11px] text-text-secondary dark:text-text-dark-secondary font-medium hidden sm:block">
              {t('tagline')}
            </p>
          </div>
        </div>

        {/* Accessibility & Settings Controls Toolbar */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Switcher Pill */}
          <div className="flex items-center gap-1 bg-bg dark:bg-bg-dark p-1 rounded-xl border border-border dark:border-border-dark">
            <Globe className="w-3.5 h-3.5 text-text-secondary dark:text-text-dark-secondary ml-1.5" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-surface dark:bg-surface-dark text-text dark:text-text-dark border border-border dark:border-border-dark'
                  : 'text-text-secondary dark:text-text-dark-secondary hover:text-text dark:hover:text-text-dark'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                language === 'ta'
                  ? 'bg-surface dark:bg-surface-dark text-text dark:text-text-dark border border-border dark:border-border-dark'
                  : 'text-text-secondary dark:text-text-dark-secondary hover:text-text dark:hover:text-text-dark'
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Font Size Toggle Pill */}
          <button
            onClick={toggleLargeFont}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              largeFont
                ? 'bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark border-accent/30 dark:border-accent-dark/30'
                : 'bg-bg dark:bg-bg-dark text-text-secondary dark:text-text-dark-secondary border-border dark:border-border-dark hover:text-text dark:hover:text-text-dark'
            }`}
            title="Toggle Accessibility Large Font"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{largeFont ? 'Large Text' : 'Normal Text'}</span>
          </button>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`p-2 rounded-xl border transition-all ${
              highContrast
                ? 'bg-accent text-white dark:bg-accent-dark dark:text-bg-dark border-accent dark:border-accent-dark font-extrabold'
                : 'bg-bg dark:bg-bg-dark text-text-secondary dark:text-text-dark-secondary border-border dark:border-border-dark hover:text-text dark:hover:text-text-dark'
            }`}
            title="Toggle High Contrast"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-text dark:text-text-dark hover:bg-border/40 dark:hover:bg-border-dark/60 transition-colors"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-accent-dark" /> : <Moon className="w-4 h-4 text-accent" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;


