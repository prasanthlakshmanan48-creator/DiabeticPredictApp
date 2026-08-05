import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Settings as SettingsIcon, Sun, Moon, Palette, Globe, Save, Check, Server } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const { darkMode, toggleDarkMode, primaryColor, setPrimaryColor, language, setLanguage, t } = useTheme();

  const [apiUrl, setApiUrl] = useState(() => localStorage.getItem('api_host_url') || 'http://localhost:5000/api');

  const themeColors = [
    { name: 'Royal Blue (Default)', hex: '#2563EB', bg: 'bg-blue-600' },
    { name: 'Teal Emerald', hex: '#14B8A6', bg: 'bg-teal-500' },
    { name: 'Purple Violet', hex: '#7C3AED', bg: 'bg-purple-600' },
    { name: 'Rose Pink', hex: '#EC4899', bg: 'bg-pink-500' },
    { name: 'Indigo Deep', hex: '#4F46E5', bg: 'bg-indigo-600' }
  ];

  const handleSaveApi = (e) => {
    e.preventDefault();
    localStorage.setItem('api_host_url', apiUrl);
    toast.success(`API host endpoint connected: ${apiUrl}`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2.5">
          <SettingsIcon className="w-7 h-7 text-primary-600" />
          <span>{t('settings')}</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage your theme preferences, primary accent colors, language options, and API endpoint configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Interface Mode */}
        <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950/50 dark:text-primary-400">
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-white">Interface Appearance</h3>
                <p className="text-[11px] text-slate-400">Toggle between Light and Dark mode</p>
              </div>
            </div>

            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                darkMode ? 'bg-primary-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="pt-4 text-xs text-slate-500 dark:text-slate-400">
            Current Mode: <strong className="text-slate-800 dark:text-white">{darkMode ? 'Dark Mode' : 'Light Mode'}</strong>
          </div>
        </div>

        {/* Application Language */}
        <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">Application Language</h3>
              <p className="text-[11px] text-slate-400">Select language preference</p>
            </div>
          </div>

          <select
            value={language}
            onChange={(e) => { setLanguage(e.target.value); toast.success(`Language set to ${e.target.value.toUpperCase()}`); }}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 outline-none font-semibold cursor-pointer"
          >
            <option value="en">English</option>
            <option value="ta">தமிழ் (Tamil)</option>
          </select>
        </div>

        {/* Theme Accent Color */}
        <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">Primary Accent Color</h3>
              <p className="text-[11px] text-slate-400">Choose your preferred highlight color</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {themeColors.map((color) => (
              <button
                key={color.hex}
                onClick={() => setPrimaryColor(color.hex)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                  primaryColor === color.hex
                    ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/30 font-bold'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded-full ${color.bg} ring-2 ring-white shadow-sm`}></span>
                  <span className="text-xs text-slate-800 dark:text-slate-200">{color.name}</span>
                </div>
                {primaryColor === color.hex && <Check className="w-4 h-4 text-primary-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* Backend Server API Host */}
        <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">ML Backend API Endpoint</h3>
              <p className="text-[11px] text-slate-400">Connect to your deployed Render API (or Local API)</p>
            </div>
          </div>

          <form onSubmit={handleSaveApi} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                API Host URL
              </label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="http://localhost:5000/api"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 outline-none font-mono text-[11px]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
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
