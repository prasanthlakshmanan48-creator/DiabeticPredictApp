import React from 'react';
import { Settings as SettingsIcon, User, Database, Cpu, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Settings = () => {
  const { user } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08 + 0.1,
        duration: 0.25,
        ease: 'easeOut'
      }
    })
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      
      {/* Title (Delay 0s) */}
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="pb-4 border-b border-slate-200 dark:border-slate-700"
      >
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <span>System Settings & Project Details</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Account details, model parameters, and project configuration.
        </p>
      </motion.div>

      {/* Staggered Grid Cards (Delay 0.08s per card) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        
        {/* Card 1: User Profile */}
        <motion.div 
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5 space-y-3 shadow-sm"
        >
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700">
            <User className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Account Details</span>
          </h2>

          <div className="space-y-2 text-slate-700 dark:text-slate-300">
            <div>
              <span className="font-semibold text-slate-500">Full Name:</span> {user?.fullname || 'Student User'}
            </div>
            <div>
              <span className="font-semibold text-slate-500">Email Address:</span> {user?.email || 'student@college.edu'}
            </div>
            <div>
              <span className="font-semibold text-slate-500">Role / Designation:</span> {user?.role || 'Biomedical Researcher'}
            </div>
            <div>
              <span className="font-semibold text-slate-500">Department:</span> {user?.department || 'Biomedical Engineering'}
            </div>
          </div>
        </motion.div>

        {/* Card 2: ML Model Details */}
        <motion.div 
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5 space-y-3 shadow-sm"
        >
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700">
            <Cpu className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Machine Learning Model</span>
          </h2>

          <div className="space-y-2 text-slate-700 dark:text-slate-300">
            <div>
              <span className="font-semibold text-slate-500">Classifier Algorithm:</span> Random Forest Classifier
            </div>
            <div>
              <span className="font-semibold text-slate-500">Training Accuracy:</span> 88.75%
            </div>
            <div>
              <span className="font-semibold text-slate-500">Dataset Source:</span> Pima Indians Diabetes Dataset
            </div>
            <div>
              <span className="font-semibold text-slate-500">Evaluation Metrics:</span> Precision: 84.2% • Recall: 82.1%
            </div>
          </div>
        </motion.div>

        {/* Card 3: Database & Storage */}
        <motion.div 
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5 space-y-3 shadow-sm"
        >
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700">
            <Database className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Database & System Storage</span>
          </h2>

          <div className="space-y-2 text-slate-700 dark:text-slate-300">
            <div>
              <span className="font-semibold text-slate-500">Database Engine:</span> SQLite (`database.db`)
            </div>
            <div>
              <span className="font-semibold text-slate-500">Session Token:</span> JWT Authentication
            </div>
            <div>
              <span className="font-semibold text-slate-500">Backend API:</span> Python Flask REST API
            </div>
          </div>
        </motion.div>

        {/* Card 4: Project Info */}
        <motion.div 
          custom={3}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5 space-y-3 shadow-sm"
        >
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700">
            <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Project Information</span>
          </h2>

          <div className="space-y-2 text-slate-700 dark:text-slate-300">
            <div>
              <span className="font-semibold text-slate-500">Project Title:</span> Diabetes Risk Prediction System
            </div>
            <div>
              <span className="font-semibold text-slate-500">Department:</span> B.E. Biomedical Engineering
            </div>
            <div>
              <span className="font-semibold text-slate-500">Interface Theme:</span> Academic Healthcare Web Application
            </div>
          </div>
        </motion.div>

      </div>

    </div>
  );
};

export default Settings;
