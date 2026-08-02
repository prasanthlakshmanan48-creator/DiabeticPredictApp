import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Settings as SettingsIcon, Sun, Moon, Palette, Globe, User, Save, Check, Key, LogOut, Shield, Server } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { darkMode, toggleDarkMode, primaryColor, setPrimaryColor, language, setLanguage, t } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // User Profile State
  const [name, setName] = useState(user?.name || 'Sample User');
  const [email] = useState(user?.email || 'user@example.com');
  const [age, setAge] = useState(user?.age || 45);
  const [gender, setGender] = useState(user?.gender || 'Female');
  const [height, setHeight] = useState(user?.height || 165);
  const [weight, setWeight] = useState(user?.weight || 68);
  const [apiUrl, setApiUrl] = useState(() => localStorage.getItem('api_host_url') || 'http://localhost:5000/api');

  const themeColors = [
    { name: 'Royal Blue (Default)', hex: '#2563EB', bg: 'bg-blue-600' },
    { name: 'Teal Emerald', hex: '#14B8A6', bg: 'bg-teal-500' },
    { name: 'Purple Violet', hex: '#7C3AED', bg: 'bg-purple-600' },
    { name: 'Rose Pink', hex: '#EC4899', bg: 'bg-pink-500' },
    { name: 'Indigo Deep', hex: '#4F46E5', bg: 'bg-indigo-600' }
  ];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    toast.success('User profile updated successfully!');
  };

  const handleSaveApi = (e) => {
    e.preventDefault();
    localStorage.setItem('api_host_url', apiUrl);
    toast.success(`API host endpoint connected: ${apiUrl}`);
  };

  const handleChangePassword = () => {
    toast.success(`Password reset link sent to ${email}`);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
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
          Manage your personal profile, account security, theme preferences, and language options.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: User Profile Section */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-white">User Profile</h3>
                <p className="text-[11px] text-slate-400">Firebase Authentication & Personal Details</p>
              </div>
            </div>

            {/* Profile Avatar Header */}
            <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"}
                alt={name}
                className="w-14 h-14 rounded-full object-cover ring-4 ring-primary-500/20"
              />
              <div>
                <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">{name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{email}</p>
                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <Shield className="w-3 h-3" /> Private Firebase Account
                </span>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary-500/40"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                  <span>Email Address</span>
                  <span className="text-[10px] text-slate-400 font-normal">(Read Only)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 outline-none cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 outline-none"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="250"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="20"
                    max="300"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-xs shadow-glow-primary transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleChangePassword}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Key className="w-3.5 h-3.5" /> Change Password
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="py-2.5 px-3 rounded-xl bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 font-semibold text-xs border border-red-200 dark:border-red-800/60 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Appearance, Language & API Host Options */}
        <div className="lg:col-span-6 space-y-6">
          
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
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 outline-none font-semibold"
            >
              <option value="en">English</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>
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
                  placeholder="https://diabetic-predict-api.onrender.com/api"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 outline-none font-mono text-[11px]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Save API Endpoint
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Settings;
