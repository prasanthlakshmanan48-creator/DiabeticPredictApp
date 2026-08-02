import React from 'react';
import { Info, Target, Cpu, Database, Sparkles, Layers, ShieldCheck, Rocket, Code2 } from 'lucide-react';

const About = () => {
  const stack = [
    { name: 'Frontend Engine', desc: 'React.js 18, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide Icons' },
    { name: 'Backend API', desc: 'Python 3.10+, Flask REST API, Flask-CORS, Joblib Artifact Loader' },
    { name: 'Machine Learning', desc: 'Scikit-Learn (Random Forest & Logistic Regression), StandardScaler' },
    { name: 'Database & Export', desc: 'SQLite3 Embedded DB, html2pdf.js Report Renderer, CSV Exporter' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 text-white shadow-glow-primary">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold border border-white/30">
            <Info className="w-4 h-4" /> Comprehensive System Documentation
          </div>
          <h1 className="text-3xl font-extrabold">Intelligent Diabetes Prediction System</h1>
          <p className="text-xs text-blue-100 leading-relaxed">
            AI-Powered Early Diabetes Risk Assessment Platform designed to help individuals and seniors estimate their diabetes risk early using simple machine learning feature scoring.
          </p>
        </div>
      </div>

      {/* Grid: Problem Statement & Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">Problem Statement</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
            Diabetes Mellitus affects over 537 million adults globally, with millions remaining undiagnosed until severe complications emerge. Early screening using traditional laboratory blood panels can be slow or inaccessible. Machine Learning models trained on physiological parameters enable non-invasive, high-accuracy risk stratification in seconds.
          </p>
        </div>

        <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">Project Objectives</h3>
          </div>
          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
            <li>Achieve &gt;88% Diagnostic Accuracy using ensemble Random Forest classification.</li>
            <li>Deliver instantaneous risk scoring and dynamic confidence metrics via a clean REST API.</li>
            <li>Automate personalized nutrition, exercise, and clinical intervention plans.</li>
            <li>Provide PDF report generation, SQLite database archiving, and CSV export.</li>
          </ul>
        </div>
      </div>

      {/* Dataset Details */}
      <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">PIMA Indian Diabetes Dataset Specifications</h3>
            <p className="text-[11px] text-slate-400">National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)</p>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          The dataset consists of 768 female patients of Pima Indian heritage aged 21 and older. 8 diagnostic biometric features are used as input variables:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <strong className="block text-slate-800 dark:text-white">1. Pregnancies</strong>
            <span className="text-[10px] text-slate-500">Gestational history count</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <strong className="block text-slate-800 dark:text-white">2. Glucose</strong>
            <span className="text-[10px] text-slate-500">Plasma glucose concentration</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <strong className="block text-slate-800 dark:text-white">3. Blood Pressure</strong>
            <span className="text-[10px] text-slate-500">Diastolic BP in mmHg</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <strong className="block text-slate-800 dark:text-white">4. Skin Thickness</strong>
            <span className="text-[10px] text-slate-500">Triceps skin fold (mm)</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <strong className="block text-slate-800 dark:text-white">5. Insulin</strong>
            <span className="text-[10px] text-slate-500">2-Hour serum insulin</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <strong className="block text-slate-800 dark:text-white">6. BMI</strong>
            <span className="text-[10px] text-slate-500">Body mass index (kg/m²)</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <strong className="block text-slate-800 dark:text-white">7. DPF Score</strong>
            <span className="text-[10px] text-slate-500">Pedigree function</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <strong className="block text-slate-800 dark:text-white">8. Age</strong>
            <span className="text-[10px] text-slate-500">Years (21 - 81 yrs)</span>
          </div>
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-800 dark:text-white">Technology Stack Architecture</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stack.map((item) => (
            <div key={item.name} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold text-xs text-slate-800 dark:text-white mb-1">{item.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Future Scope */}
      <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
            <Rocket className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-800 dark:text-white">Future Scope & Clinical Roadmap</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-800 dark:text-white mb-1">Continuous Glucose Monitors (CGM)</strong>
            <p className="text-slate-500">Integrate IoT Bluetooth streaming for real-time glycemic variability monitoring.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-800 dark:text-white mb-1">Deep Learning Neural Networks</strong>
            <p className="text-slate-500">Train Multi-Layer Perceptron (MLP) architectures on multi-center EHR data.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-800 dark:text-white mb-1">HL7 / FHIR Interoperability</strong>
            <p className="text-slate-500">Enable direct integration with hospital Electronic Health Records systems.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
