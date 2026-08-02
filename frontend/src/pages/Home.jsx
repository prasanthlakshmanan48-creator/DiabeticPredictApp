import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stethoscope, 
  Activity, 
  CheckCircle2, 
  Users, 
  FileText, 
  BarChart3, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck,
  BrainCircuit,
  HeartPulse,
  HeartHandshake
} from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Predictions', value: '14,850+', icon: Activity, change: '+12.4% this week', color: 'from-blue-600 to-indigo-600' },
    { title: 'Model Accuracy', value: '88.7%', icon: CheckCircle2, change: 'Scikit-Learn RF', color: 'from-emerald-500 to-teal-600' },
    { title: 'Active Users', value: '14,850+', icon: Users, change: 'Public & Senior Community', color: 'from-purple-600 to-indigo-600' },
    { title: 'Today\'s Predictions', value: '95', icon: Sparkles, change: 'Live SQLite Sync', color: 'from-amber-500 to-orange-600' }
  ];

  const features = [
    {
      title: 'AI Prediction Engine',
      description: 'Uses Random Forest & Logistic Regression trained on PIMA Indian Diabetes data to analyze 8 biometrics simultaneously.',
      icon: BrainCircuit,
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      link: '/prediction'
    },
    {
      title: 'Interactive Dashboard',
      description: 'Dynamic KPI metrics, glucose vs BMI scatter plots, age distribution histograms, and correlation matrix analysis.',
      icon: BarChart3,
      color: 'bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400 border-teal-200 dark:border-teal-800',
      link: '/dashboard'
    },
    {
      title: 'Medical PDF Reports',
      description: 'Generates professional clinical reports with diagnostic parameters, risk percentage, and doctor sign-off fields.',
      icon: FileText,
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 border-purple-200 dark:border-purple-800',
      link: '/reports'
    },
    {
      title: 'Personalized Health Plan',
      description: 'Calculates targeted dietary guidelines, exercise routines, water intake targets, and physician consult urgencies.',
      icon: HeartPulse,
      color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200 dark:border-amber-800',
      link: '/prediction'
    }
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Banner Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 text-white p-8 lg:p-12 shadow-2xl overflow-hidden"
      >
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-secondary-400/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-blue-100 border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Next-Gen Machine Learning Healthcare</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Intelligent Diabetes Prediction System
            </h1>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
              AI Powered Early Diabetes Detection Platform. Evaluate patient risk probabilities in seconds with high clinical accuracy, real-time diagnostic parameters, and downloadable medical reports.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/prediction')}
                className="px-8 py-4 rounded-2xl bg-white text-primary-700 hover:bg-blue-50 font-extrabold text-sm shadow-xl flex items-center gap-3 transition-all hover:scale-105"
              >
                <Stethoscope className="w-5 h-5 text-primary-600" />
                <span>Start Diabetes Prediction</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/analytics')}
                className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-sm border border-white/20 transition-all"
              >
                View Model Metrics
              </button>
            </div>
          </div>

          {/* Large Medical Illustration Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="w-full h-80 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 flex flex-col justify-between shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                      <HeartHandshake className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Clinical Diagnostic Preview</p>
                      <p className="text-[10px] text-blue-200">Patient: Simulated Profile</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-400/20 text-emerald-300 rounded-full border border-emerald-400/30">
                    Low Risk (14.2%)
                  </span>
                </div>

                <div className="space-y-3 py-4 text-xs">
                  <div className="flex justify-between items-center bg-white/10 p-2.5 rounded-xl">
                    <span className="text-blue-100">Glucose (Fasting)</span>
                    <span className="font-bold">98 mg/dL</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/10 p-2.5 rounded-xl">
                    <span className="text-blue-100">BMI</span>
                    <span className="font-bold">22.4 kg/m²</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/10 p-2.5 rounded-xl">
                    <span className="text-blue-100">Random Forest Score</span>
                    <span className="font-bold text-emerald-300">0.142 (Non-Diabetic)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/20 text-[10px] text-blue-200 flex items-center justify-between">
                  <span>SQLite Synchronized</span>
                  <span>Model: RF-120</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Statistics Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Platform Performance & Statistics</h3>
          <span className="text-xs text-slate-500 font-medium">Updated Realtime</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-5 shadow-glass dark:shadow-glass-dark hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{stat.title}</span>
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${stat.color} text-white flex items-center justify-center shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">{stat.value}</div>
                <div className="mt-2 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span>{stat.change}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div>
        <div className="mb-6 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
            Core AI Clinical Capabilities
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Engineered for medical professionals, clinicians, and researchers seeking early diabetes intervention tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                onClick={() => navigate(feat.link)}
                className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl border ${feat.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-800 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
