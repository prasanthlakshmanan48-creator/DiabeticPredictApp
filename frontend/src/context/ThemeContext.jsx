import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme_dark');
    return saved ? JSON.parse(saved) : false;
  });

  const [largeFont, setLargeFont] = useState(() => {
    const saved = localStorage.getItem('theme_large_font');
    return saved ? JSON.parse(saved) : false;
  });

  const [highContrast, setHighContrast] = useState(() => {
    const saved = localStorage.getItem('theme_high_contrast');
    return saved ? JSON.parse(saved) : false;
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('theme_lang') || 'en';
  });

  // Dark mode effect & meta tag update
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme_dark', JSON.stringify(darkMode));

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', darkMode ? '#101214' : '#FAFAF9');
    }
  }, [darkMode]);

  // Large font effect
  useEffect(() => {
    const root = document.documentElement;
    if (largeFont) {
      root.classList.add('text-lg-mode');
    } else {
      root.classList.remove('text-lg-mode');
    }
    localStorage.setItem('theme_large_font', JSON.stringify(largeFont));
  }, [largeFont]);

  // High contrast effect
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    localStorage.setItem('theme_high_contrast', JSON.stringify(highContrast));
  }, [highContrast]);

  // Language persistence
  useEffect(() => {
    localStorage.setItem('theme_lang', language);
  }, [language]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleLargeFont = () => setLargeFont(prev => !prev);
  const toggleHighContrast = () => setHighContrast(prev => !prev);

  // Translation helper function
  const t = (key) => {
    const dict = translations[language] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  return (
    <ThemeContext.Provider value={{
      darkMode, setDarkMode, toggleDarkMode,
      largeFont, setLargeFont, toggleLargeFont,
      highContrast, setHighContrast, toggleHighContrast,
      language, setLanguage,
      t
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);


