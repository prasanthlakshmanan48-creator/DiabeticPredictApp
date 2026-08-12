import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Settings as SettingsIcon, Sun, Moon, Globe, Save, Server, Eye, Type } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const { darkMode, toggleDarkMode, largeFont, toggleLargeFont, highContrast, toggleHighContrast, language, setLanguage, t } = useTheme();

  const [apiUrl, setApiUrl] = useState(() => localStorage.getItem('api_host_url') || 'http://localhost:5000/api');

  const handleSaveApi = (e) => {
    e.preventDefault();
    localStorage.setItem('api_host_url', apiUrl);
    toast.success(`API host endpoint connected: ${apiUrl}`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-text dark:text-text-dark flex items-center gap-2.5">
          <SettingsIcon className="w-7 h-7 text-accent dark:text-accent-dark" />
          <span>{t('settings')}</span>
        </h1>
        <p className="text-xs text-text-secondary dark:text-text-dark-secondary mt-1">
          Manage your theme preferences, accessibility settings, language options, and API endpoint configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Interface Mode */}
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-subtle">
          <div className="flex items-center justify-between pb-4 border-b border-border dark:border-border-dark">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark border border-accent/20 dark:border-accent-dark/20">
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-bold text-sm text-text dark:text-text-dark">Interface Appearance</h3>
                <p className="text-[11px] text-text-secondary dark:text-text-dark-secondary">Toggle between Light and Dark mode</p>
              </div>
            </div>

            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                darkMode ? 'bg-accent-dark' : 'bg-border'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-surface dark:bg-bg-dark transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="pt-4 text-xs text-text-secondary dark:text-text-dark-secondary">
            Current Mode: <strong className="text-text dark:text-text-dark">{darkMode ? 'Dark Mode' : 'Light Mode'}</strong>
          </div>
        </div>

        {/* Accessibility Features */}
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-subtle">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark border border-accent/20 dark:border-accent-dark/20">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-text dark:text-text-dark">Accessibility Controls</h3>
              <p className="text-[11px] text-text-secondary dark:text-text-dark-secondary">High Contrast & Text Scaling</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={toggleHighContrast}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-xs font-semibold ${
                highContrast
                  ? 'bg-accent text-white dark:bg-accent-dark dark:text-bg-dark border-accent dark:border-accent-dark'
                  : 'bg-bg dark:bg-bg-dark text-text dark:text-text-dark border-border dark:border-border-dark'
              }`}
            >
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>High Contrast Mode</span>
              </div>
              <span>{highContrast ? 'Enabled' : 'Disabled'}</span>
            </button>

            <button
              onClick={toggleLargeFont}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-xs font-semibold ${
                largeFont
                  ? 'bg-accent text-white dark:bg-accent-dark dark:text-bg-dark border-accent dark:border-accent-dark'
                  : 'bg-bg dark:bg-bg-dark text-text dark:text-text-dark border-border dark:border-border-dark'
              }`}
            >
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                <span>Large Text Mode (112%)</span>
              </div>
              <span>{largeFont ? 'Enabled' : 'Disabled'}</span>
            </button>
          </div>
        </div>

        {/* Application Language */}
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-subtle">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark border border-accent/20 dark:border-accent-dark/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-text dark:text-text-dark">Application Language</h3>
              <p className="text-[11px] text-text-secondary dark:text-text-dark-secondary">Select language preference</p>
            </div>
          </div>

          <select
            value={language}
            onChange={(e) => { setLanguage(e.target.value); toast.success(`Language set to ${e.target.value.toUpperCase()}`); }}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-text dark:text-text-dark outline-none font-semibold cursor-pointer"
          >
            <option value="en">English</option>
            <option value="ta">தமிழ் (Tamil)</option>
          </select>
        </div>

        {/* Backend Server API Host */}
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-subtle">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark border border-accent/20 dark:border-accent-dark/20">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-text dark:text-text-dark">ML Backend API Endpoint</h3>
              <p className="text-[11px] text-text-secondary dark:text-text-dark-secondary">Connect to your deployed Render API (or Local API)</p>
            </div>
          </div>

          <form onSubmit={handleSaveApi} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-text-secondary dark:text-text-dark-secondary mb-1">
                API Host URL
              </label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="http://localhost:5000/api"
                className="w-full px-3.5 py-2.5 rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-text dark:text-text-dark outline-none font-mono text-[11px]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-accent hover:opacity-95 text-white dark:bg-accent-dark dark:text-bg-dark font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save API Endpoint
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Settings;


