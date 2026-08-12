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
    { title: 'Total Clinical Evaluations', value: '14,850+', icon: Activity, change: '+12.4% volume growth' },
    { title: 'Scikit-Learn Accuracy', value: '88.7%', icon: CheckCircle2, change: 'Cross-validated RF model' },
    { title: 'Active Medical Users', value: '3,420+', icon: Users, change: 'Clinicians & Public' },
    { title: "Today's Diagnostic Runs", value: '95', icon: Sparkles, change: 'SQLite Synchronized' }
  ];

  const features = [
    {
      title: 'AI Prediction Engine',
      description: 'Employs Random Forest & Logistic Regression algorithms trained on clinical biometric datasets to evaluate 8 metabolic vectors.',
      icon: BrainCircuit,
      link: '/prediction'
    },
    {
      title: 'Interactive Dashboard',
      description: 'Dynamic clinical metrics, Glucose vs BMI scatter plots, age distribution histograms, and correlation analytics.',
      icon: BarChart3,
      link: '/dashboard'
    },
    {
      title: 'Medical PDF Reports',
      description: 'Generates professional clinical diagnostic reports with patient biometric parameters, risk percentages, and physician notes.',
      icon: FileText,
      link: '/reports'
    },
    {
      title: 'Personalized Health Plan',
      description: 'Computes targeted dietary guidelines, exercise routines, hydration targets, and physician consult recommendations.',
      icon: HeartPulse,
      link: '/prediction'
    }
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Executive Hero Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative glass-card p-8 lg:p-12 shadow-subtle overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-accent-bg dark:bg-accent/15 text-xs font-semibold text-accent dark:text-accent-dark">
              <ShieldCheck className="w-4 h-4" />
              <span>Machine Learning Diagnostic Decision Support</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-text dark:text-text-dark">
              Intelligent Diabetes Risk Evaluation
            </h1>

            <p className="text-sm sm:text-base text-text-secondary dark:text-text-dark-secondary leading-relaxed font-normal max-w-2xl">
              An evidence-based clinical early detection platform. Evaluates multi-vector patient biometric data in seconds with high precision, transparent XAI factor attribution, and instant medical PDF report output.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/prediction')}
                className="px-6 py-3.5 rounded-xl bg-accent hover:opacity-95 text-white dark:bg-accent-dark dark:text-bg-dark font-bold text-sm flex items-center gap-2.5 transition-all shadow-subtle"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Start Risk Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/analytics')}
                className="px-6 py-3.5 rounded-xl bg-bg dark:bg-white/5 hover:bg-border/30 text-text dark:text-text-dark font-semibold text-sm border border-border dark:border-transparent transition-colors"
              >
                View Model Metrics
              </button>
            </div>
          </div>

          {/* Clinical Diagnostic Preview Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm">
              <div className="w-full rounded-2xl bg-bg dark:bg-white/5 border border-border dark:border-white/5 p-6 space-y-4 shadow-subtle">
                <div className="flex items-center justify-between border-b border-border dark:border-white/5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-accent-bg dark:bg-accent/20 flex items-center justify-center text-accent dark:text-accent-dark">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text dark:text-text-dark">Diagnostic Run Preview</p>
                      <p className="text-[10px] text-text-secondary dark:text-text-dark-secondary">Sample Patient Record</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-[#EAF3DE] text-[#3B6D11] rounded-md">
                    Low Risk (14.2%)
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center bg-surface dark:bg-white/5 p-2.5 rounded-xl">
                    <span className="text-text-secondary dark:text-text-dark-secondary">Fasting Glucose</span>
                    <span className="font-bold text-text dark:text-text-dark">98 mg/dL</span>
                  </div>
                  <div className="flex justify-between items-center bg-surface dark:bg-white/5 p-2.5 rounded-xl">
                    <span className="text-text-secondary dark:text-text-dark-secondary">Body Mass Index</span>
                    <span className="font-bold text-text dark:text-text-dark">22.4 kg/m²</span>
                  </div>
                  <div className="flex justify-between items-center bg-surface dark:bg-white/5 p-2.5 rounded-xl">
                    <span className="text-text-secondary dark:text-text-dark-secondary">Random Forest Index</span>
                    <span className="font-bold text-accent dark:text-accent-dark">0.142 (Negative)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border dark:border-white/5 text-[10px] text-text-secondary dark:text-text-dark-secondary flex items-center justify-between">
                  <span>SQLite Synchronized</span>
                  <span className="font-mono">RF-v1.2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>


      {/* Quick Statistics Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-text dark:text-text-dark">Platform Performance Indicators</h3>
          <span className="text-xs text-text-secondary dark:text-text-dark-secondary font-medium">Realtime Metrics</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 shadow-subtle clinical-card-hover"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-text-secondary dark:text-text-dark-secondary">{stat.title}</span>
                  <div className="w-8 h-8 rounded-xl bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-text dark:text-text-dark tracking-tight">{stat.value}</div>
                <div className="mt-2 text-[11px] font-medium text-accent dark:text-accent-dark flex items-center gap-1">
                  <span>{stat.change}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Feature Capabilities Grid */}
      <div>
        <div className="mb-6 max-w-2xl">
          <h2 className="text-xl font-extrabold text-text dark:text-text-dark">
            Clinical Diagnostic Capabilities
          </h2>
          <p className="text-xs text-text-secondary dark:text-text-dark-secondary mt-1">
            Engineered for medical professionals, clinicians, and health researchers seeking reliable early intervention tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                onClick={() => navigate(feat.link)}
                className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 shadow-subtle clinical-card-hover cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark border border-accent/20 dark:border-accent-dark/20 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-text dark:text-text-dark mb-1.5 group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-border dark:border-border-dark flex items-center gap-1.5 text-xs font-bold text-accent dark:text-accent-dark">
                  <span>Open Module</span>
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


