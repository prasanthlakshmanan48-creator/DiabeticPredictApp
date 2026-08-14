import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  User, 
  Search, 
  ChevronDown, 
  ChevronUp,
  Stethoscope
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getApiBaseUrl } from '../services/api';
import { motion } from 'framer-motion';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Test accounts drawer
  const [dbUsers, setDbUsers] = useState([]);
  const [showPresets, setShowPresets] = useState(false);
  const [presetSearch, setPresetSearch] = useState('');

  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchPresets();
  }, []);

  const fetchPresets = async () => {
    try {
      const apiBase = getApiBaseUrl();
      const res = await axios.get(`${apiBase}/presets/credentials`);
      if (res.data && res.data.presets) {
        setDbUsers(res.data.presets);
      }
    } catch (err) {
      console.warn("Could not load preset accounts:", err);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error('Please enter both email address and password.');
      return;
    }
    setLoading(true);
    try {
      const loggedUser = await login(email, password);
      toast.success(`Welcome back, ${loggedUser.fullname || loggedUser.email}!`);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Invalid email address or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match. Please verify your password.');
      return;
    }
    setLoading(true);
    try {
      const newUser = await register(email, password, fullName);
      toast.success(`Account created successfully! Welcome, ${newUser.fullname}.`);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (presetUser) => {
    setEmail(presetUser.email);
    setPassword(presetUser.password);
    if (isRegister) {
      setFullName(presetUser.fullname);
      setConfirmPassword(presetUser.password);
    }
    setShowPresets(false);
    toast.success(`Loaded credentials for ${presetUser.fullname}`);
  };

  const filteredPresets = dbUsers.filter(u => 
    u.fullname?.toLowerCase().includes(presetSearch.toLowerCase()) ||
    u.email?.toLowerCase().includes(presetSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      
      {/* Full Card with Sequential Micro-Animations */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 sm:p-8 shadow-sm space-y-6"
      >
        
        {/* Step 1: Logo & Title Stagger */}
        <motion.div 
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="text-center space-y-2"
        >
          <div className="w-10 h-10 rounded-md bg-teal-600 text-white mx-auto flex items-center justify-center shadow-sm">
            <Stethoscope className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Diabetes Risk Prediction System
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Early risk assessment using patient health information.
          </p>
        </motion.div>

        {/* Mode Switcher Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="flex border-b border-slate-200 dark:border-slate-700 text-xs font-medium"
        >
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-2 text-center border-b-2 transition-colors ${
              !isRegister
                ? 'border-teal-600 text-teal-600 font-semibold dark:text-teal-400 dark:border-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2 text-center border-b-2 transition-colors ${
              isRegister
                ? 'border-teal-600 text-teal-600 font-semibold dark:text-teal-400 dark:border-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            Register Account
          </button>
        </motion.div>

        {/* Step 2: Form Controls Gentle Slide Up */}
        <motion.form 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.22 }}
          onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit} 
          className="space-y-4 text-xs"
        >
          {isRegister && (
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  required
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@college.edu"
                required
                className="w-full pl-9 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-9 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>
          )}

          {!isRegister && (
            <div className="flex items-center justify-between py-1 text-slate-600 dark:text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span>Remember me</span>
              </label>
            </div>
          )}

          {/* Step 3: Button with Hover & Scale Interaction */}
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : (isRegister ? 'Register Account' : 'Sign In')}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.form>

        {/* Collapsible Test Accounts List */}
        {dbUsers.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-2 border-t border-slate-100 dark:border-slate-700 text-xs"
          >
            <button
              type="button"
              onClick={() => setShowPresets(!showPresets)}
              className="w-full text-left text-slate-500 hover:text-slate-700 dark:text-slate-400 flex items-center justify-between py-1"
            >
              <span>Test Accounts ({dbUsers.length} Available)</span>
              {showPresets ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showPresets && (
              <div className="mt-2 space-y-1.5 p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-slate-400" />
                  <input
                    type="text"
                    value={presetSearch}
                    onChange={(e) => setPresetSearch(e.target.value)}
                    placeholder="Search accounts..."
                    className="w-full pl-7 pr-2 py-1 text-[11px] border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                  {filteredPresets.slice(0, 8).map((preset) => (
                    <div
                      key={preset.id || preset.email}
                      onClick={() => handleSelectPreset(preset)}
                      className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded cursor-pointer hover:border-teal-500 flex items-center justify-between text-[11px]"
                    >
                      <div className="truncate pr-2">
                        <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">{preset.fullname}</p>
                        <p className="text-[10px] text-slate-500 truncate">{preset.email}</p>
                      </div>
                      <span className="text-[10px] text-teal-600 font-semibold">Select</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-center pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px] text-slate-400"
        >
          Biomedical Engineering Project
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Login;
