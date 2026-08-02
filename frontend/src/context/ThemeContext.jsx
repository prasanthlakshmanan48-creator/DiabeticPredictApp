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

  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem('theme_primary') || '#2563EB';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('theme_lang') || 'en';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme_dark', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (largeFont) root.classList.add('text-lg-mode');
    else root.classList.remove('text-lg-mode');
    localStorage.setItem('theme_large_font', JSON.stringify(largeFont));
  }, [largeFont]);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) root.classList.add('high-contrast');
    else root.classList.remove('high-contrast');
    localStorage.setItem('theme_high_contrast', JSON.stringify(highContrast));
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('theme_lang', language);
  }, [language]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLargeFont = () => setLargeFont(!largeFont);
  const toggleHighContrast = () => setHighContrast(!highContrast);

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
      primaryColor, setPrimaryColor,
      language, setLanguage,
      t
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
