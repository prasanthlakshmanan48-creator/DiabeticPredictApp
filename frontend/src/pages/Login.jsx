import React, { useState, useEffect } from 'react';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, Sparkles, ArrowRight, User, CheckCircle2, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

const provider = new GoogleAuthProvider();

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('prasanth@gmail.com');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('Prasanth');
  const [currentUser, setCurrentUser] = useState(null);
  
  const navigate = useNavigate();

  // Step 13: Detect Logged-in User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setCurrentUser(user);
      } else {
        console.log("No User");
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Step 8.3: Google Login
  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      
      // Step 15: Save User Details after Google Login
      if (result?.user) {
        await setDoc(doc(db, "users", result.user.uid), {
          name: result.user.displayName || "Prasanth",
          email: result.user.email || "prasanth@gmail.com",
          photo: result.user.photoURL || "photoURL",
          createdAt: new Date().toISOString().split('T')[0]
        });
      }

      toast.success(`Welcome ${result.user.displayName || result.user.email}!`);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Google sign-in failed.");
    }
  };

  // Step 9: Email Registration
  const register = async (e) => {
    if (e) e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(userCredential.user);

      // Step 15: Save User Details after Registration
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: fullName || userCredential.user.displayName || "Prasanth",
        email: userCredential.user.email || "prasanth@gmail.com",
        photo: userCredential.user.photoURL || "photoURL",
        createdAt: new Date().toISOString().split('T')[0]
      });

      toast.success("Account created successfully!");
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Registration failed.");
    }
  };

  // Step 10: Email Login
  const login = async (e) => {
    if (e) e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(userCredential.user);
      toast.success("Signed in successfully!");
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Login failed.");
    }
  };

  // Step 11: Logout
  const logout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully.");
  };

  // Step 12: Forgot Password
  const resetPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }
    await sendPasswordResetEmail(
      auth,
      email
    );
    alert("Password reset email sent.");
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
                Empowering individuals and clinicians with intelligent machine learning for early diabetes risk assessment, personalized health scores, and Firebase cloud authentication & storage.
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
              <span>Firebase Auth, Firestore Database & Storage</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
              <span>Instant Health Score & Downloadable PDF Reports</span>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Form */}
        <div className="p-8 lg:p-10 flex flex-col justify-between bg-white dark:bg-dark-card">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  {currentUser ? `Active User: ${currentUser.email}` : (isSignup ? 'Create User Account' : 'Welcome Back')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {currentUser ? 'You are currently authenticated in Firebase' : (isSignup ? 'Fill in details to register your account' : 'Sign in to access your personal health dashboard')}
                </p>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-full border border-primary-200 dark:border-primary-800 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Secure Auth
              </span>
            </div>

            {currentUser ? (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                  <p className="font-semibold text-slate-700 dark:text-slate-200">UID: <span className="font-mono text-primary-600">{currentUser.uid}</span></p>
                  <p className="text-slate-600 dark:text-slate-300">Email: {currentUser.email}</p>
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
            ) : (
              <div>
                <form onSubmit={isSignup ? register : login} className="space-y-4">
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
                          onClick={resetPassword} 
                          className="text-[11px] text-primary-600 dark:text-primary-400 font-semibold hover:underline"
                        >
                          Forgot Password
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

                  {isSignup ? (
                    <button
                      type="button"
                      onClick={register}
                      className="w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-xl font-bold text-xs shadow-glow-primary flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={login}
                      className="w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-xl font-bold text-xs shadow-glow-primary flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Login</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </form>

                <div className="relative my-6 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                  </div>
                  <span className="relative px-3 bg-white dark:bg-dark-card text-[11px] text-slate-400 uppercase font-semibold">
                    Or Continue With
                  </span>
                </div>

                {/* Step 8.3: Continue with Google Button */}
                <button
                  onClick={loginGoogle}
                  type="button"
                  className="w-full py-2.5 px-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-3 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 text-center text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              {isSignup ? 'Already registered?' : "Don't have an account?"}{' '}
            </span>
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-primary-600 dark:text-primary-400 font-bold hover:underline"
            >
              {isSignup ? 'Login' : 'Create Account'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
