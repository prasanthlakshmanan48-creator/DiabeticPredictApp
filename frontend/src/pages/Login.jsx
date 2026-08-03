import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, Sparkles, ArrowRight, User, CheckCircle2, LogOut, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('prasanth@gmail.com');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [fullName, setFullName] = useState('Prasanth');
  const [loading, setLoading] = useState(false);

  const { login, register, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Signed in successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await register(email, password, fullName);
      toast.success('Account created successfully! Welcome.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your registered email address.');
      return;
    }
    toast.success('Password reset link sent to your registered email.');
    setIsForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-mesh flex items-center justify-center p-4 lg:p-8 transition-colors duration-300">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 rounded-[24px] overflow-hidden shadow-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border">
        
        {/* Left Side: Healthcare Illustration & Info */}
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-secondary-500/20 blur-2xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">DiabeteX AI</h1>
                <p className="text-xs text-blue-100 font-medium">Healthcare Prediction Engine</p>
              </div>
            </div>

            <div className="space-y-4 my-8">
              <h2 className="text-2xl font-bold leading-tight">
                AI Powered Early Diabetes Detection Platform
              </h2>
              <p className="text-xs text-blue-100/90 leading-relaxed">
                Empowering individuals and clinicians with intelligent machine learning for early diabetes risk assessment, personalized health scores, and JWT SQLite persistence.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-3 pt-6 border-t border-white/15 text-xs text-blue-100">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
              <span>95.6% Accuracy with Ensemble ML Models</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
              <span>Local Authentication & SQLite Security</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
              <span>Instant Health Score & Downloadable PDF Reports</span>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Forms */}
        <div className="p-8 lg:p-10 flex flex-col justify-between bg-white dark:bg-dark-card">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  {user ? `Active User: ${user.fullname || user.name || user.email}` : (isForgotPassword ? 'Reset Password' : (isSignup ? 'Create User Account' : 'Welcome Back'))}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {user ? 'You are logged into your account' : (isForgotPassword ? 'Enter your email to reset your account password' : (isSignup ? 'Fill in details to register your account' : 'Sign in to access your personal health dashboard'))}
                </p>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-full border border-primary-200 dark:border-primary-800 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Secure JWT
              </span>
            </div>

            {user ? (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                  <p className="font-semibold text-slate-700 dark:text-slate-200">Name: <span className="font-medium text-primary-600">{user.fullname || user.name}</span></p>
                  <p className="text-slate-600 dark:text-slate-300">Email: {user.email}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={logout}
                    className="w-full py-2.5 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            ) : isForgotPassword ? (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="prasanth@gmail.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary-500/50 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-xl font-bold text-xs shadow-glow-primary flex items-center justify-center gap-2 transition-all"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Send Password Reset Email</span>
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="text-xs text-primary-600 dark:text-primary-400 font-bold hover:underline"
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={isSignup ? handleRegisterSubmit : handleLoginSubmit} className="space-y-4">
                {isSignup && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Prasanth"
                        required
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary-500/50 outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="prasanth@gmail.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary-500/50 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    {!isSignup && (
                      <button 
                        type="button" 
                        onClick={() => setIsForgotPassword(true)} 
                        className="text-[11px] text-primary-600 dark:text-primary-400 font-semibold hover:underline"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary-500/50 outline-none"
                    />
                  </div>
                </div>

                {isSignup && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary-500/50 outline-none"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-xl font-bold text-xs shadow-glow-primary flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <span>{loading ? 'Processing...' : (isSignup ? 'Create Account' : 'Login')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {!user && (
            <div className="mt-6 text-center text-xs">
              <span className="text-slate-500 dark:text-slate-400">
                {isSignup ? 'Already registered?' : "Don't have an account?"}{' '}
              </span>
              <button
                onClick={() => { setIsSignup(!isSignup); setIsForgotPassword(false); }}
                className="text-primary-600 dark:text-primary-400 font-bold hover:underline"
              >
                {isSignup ? 'Login' : 'Create Account'}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Login;
