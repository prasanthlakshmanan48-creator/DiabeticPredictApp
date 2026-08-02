import React from 'react';
import { Activity, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-16 bg-white dark:bg-dark-card border-t border-slate-200 dark:border-dark-border py-8 px-4 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center text-white shadow-glow-primary">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              Intelligent Diabetes Prediction System
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              AI Powered Early Diabetes Detection Platform & Clinical Decision Support
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
          <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <Link to="/prediction" className="hover:text-primary-600 transition-colors">Predict Risk</Link>
          <Link to="/analytics" className="hover:text-primary-600 transition-colors">Model Benchmarks</Link>
          <Link to="/about" className="hover:text-primary-600 transition-colors">About Project</Link>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>HIPAA-Compliant Diagnostic Mock Engine</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 DiabeteX AI Healthcare. Built with Scikit-Learn, Flask & React.</p>
        <p className="flex items-center gap-1">
          Designed with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Clinical Excellence
        </p>
      </div>
    </footer>
  );
};

export default Footer;
