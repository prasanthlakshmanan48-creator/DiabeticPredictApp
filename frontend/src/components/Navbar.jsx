import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Activity, Type, Eye, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { darkMode, toggleDarkMode, largeFont, toggleLargeFont, highContrast, toggleHighContrast, language, setLanguage, t } = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md border-b border-slate-200/80 dark:border-dark-border px-4 lg:px-8 py-3 transition-colors duration-300">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Senior Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center text-white shadow-glow-primary">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-base lg:text-lg bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent tracking-tight">
                {t('title')}
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Senior Accessibility Toolbar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher (EN / TA) */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition-colors ${
                  language === 'en'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition-colors ${
                  language === 'ta'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary-600'
                }`}
              >
                தமிழ்
              </button>
            </div>

            {/* Font Size Toggle */}
            <button
              onClick={toggleLargeFont}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                largeFont
                  ? 'bg-primary-50 text-primary-700 border-primary-300 dark:bg-primary-950/60 dark:text-primary-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
              title="Toggle Large Font Size for Seniors"
            >
              <Type className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{largeFont ? 'Large Text' : 'Normal Text'}</span>
            </button>

            {/* High Contrast Toggle */}
            <button
              onClick={toggleHighContrast}
              className={`p-2 rounded-xl border transition-all ${
                highContrast
                  ? 'bg-amber-400 text-slate-950 border-amber-500 font-extrabold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
              title="Toggle High Contrast Mode"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-primary-600" />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
