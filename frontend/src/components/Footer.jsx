import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-16 bg-surface dark:bg-surface-dark border-t border-border dark:border-border-dark py-8 px-4 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-accent dark:bg-accent-dark text-white dark:text-bg-dark flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-text dark:text-text-dark tracking-tight">
              Intelligent Diabetes Prediction System
            </span>
            <p className="text-[11px] text-text-secondary dark:text-text-dark-secondary">
              Clinical Decision Support Platform & Machine Learning Risk Evaluator
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-text-secondary dark:text-text-dark-secondary">
          <Link to="/" className="hover:text-accent dark:hover:text-accent-dark transition-colors">Home</Link>
          <Link to="/prediction" className="hover:text-accent dark:hover:text-accent-dark transition-colors">Predict Risk</Link>
          <Link to="/analytics" className="hover:text-accent dark:hover:text-accent-dark transition-colors">Model Benchmarks</Link>
          <Link to="/about" className="hover:text-accent dark:hover:text-accent-dark transition-colors">About System</Link>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-text-secondary dark:text-text-dark-secondary bg-bg dark:bg-bg-dark px-3 py-1.5 rounded-lg border border-border dark:border-border-dark">
          <ShieldCheck className="w-4 h-4 text-accent dark:text-accent-dark" />
          <span>Clinical ML Diagnostic Engine</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-border dark:border-border-dark text-center text-[11px] text-text-secondary dark:text-text-dark-secondary flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 DiabeteX AI Healthcare. Powered by Scikit-Learn & React.</p>
        <p className="flex items-center gap-1">
          Designed for Clinical Precision & Human Usability
        </p>
      </div>
    </footer>
  );
};

export default Footer;


