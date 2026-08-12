import React from 'react';
import { Info, Target, Database, Sparkles, Rocket, Code2 } from 'lucide-react';

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
      <div className="bg-surface dark:bg-surface-dark rounded-3xl p-8 text-text dark:text-text-dark shadow-subtle border border-border dark:border-border-dark">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent-bg dark:bg-accent-bg-dark text-xs font-bold text-accent dark:text-accent-dark border border-accent/20 dark:border-accent-dark/20">
            <Info className="w-4 h-4" /> System Documentation
          </div>
          <h1 className="text-3xl font-extrabold text-text dark:text-text-dark">Intelligent Diabetes Prediction System</h1>
          <p className="text-xs text-text-secondary dark:text-text-dark-secondary leading-relaxed">
            AI-Powered Early Diabetes Risk Assessment Platform designed to evaluate biometric vectors and provide transparent explainable ML factor attribution.
          </p>
        </div>
      </div>

      {/* Grid: Problem Statement & Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-subtle">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-[#FCEBEB] text-[#A32D2D] border border-[#A32D2D]/30">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-text dark:text-text-dark">Problem Statement</h3>
          </div>
          <p className="text-xs text-text-secondary dark:text-text-dark-secondary leading-relaxed">
            Diabetes Mellitus affects over 537 million adults globally, with millions remaining undiagnosed until severe complications emerge. Early screening using traditional laboratory blood panels can be slow or inaccessible. Machine Learning models trained on physiological parameters enable non-invasive, high-accuracy risk stratification in seconds.
          </p>
        </div>

        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-subtle">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark border border-accent/20 dark:border-accent-dark/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-text dark:text-text-dark">Project Objectives</h3>
          </div>
          <ul className="text-xs text-text-secondary dark:text-text-dark-secondary space-y-2 list-disc list-inside">
            <li>Achieve &gt;88% Diagnostic Accuracy using ensemble Random Forest classification.</li>
            <li>Deliver instantaneous risk scoring and dynamic confidence metrics via a clean REST API.</li>
            <li>Automate personalized nutrition, exercise, and clinical intervention plans.</li>
            <li>Provide PDF report generation, SQLite database archiving, and CSV export.</li>
          </ul>
        </div>
      </div>

      {/* Dataset Details */}
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-subtle">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark border border-accent/20 dark:border-accent-dark/20">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-text dark:text-text-dark">PIMA Indian Diabetes Dataset Specifications</h3>
            <p className="text-[11px] text-text-secondary dark:text-text-dark-secondary">National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)</p>
          </div>
        </div>
        <p className="text-xs text-text-secondary dark:text-text-dark-secondary leading-relaxed mb-4">
          The dataset consists of 768 female patients of Pima Indian heritage aged 21 and older. 8 diagnostic biometric features are used as input variables:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-bg dark:bg-bg-dark rounded-xl border border-border dark:border-border-dark">
            <strong className="block text-text dark:text-text-dark">1. Pregnancies</strong>
            <span className="text-[10px] text-text-secondary dark:text-text-dark-secondary">Gestational history count</span>
          </div>
          <div className="p-3 bg-bg dark:bg-bg-dark rounded-xl border border-border dark:border-border-dark">
            <strong className="block text-text dark:text-text-dark">2. Glucose</strong>
            <span className="text-[10px] text-text-secondary dark:text-text-dark-secondary">Plasma glucose concentration</span>
          </div>
          <div className="p-3 bg-bg dark:bg-bg-dark rounded-xl border border-border dark:border-border-dark">
            <strong className="block text-text dark:text-text-dark">3. Blood Pressure</strong>
            <span className="text-[10px] text-text-secondary dark:text-text-dark-secondary">Diastolic BP in mmHg</span>
          </div>
          <div className="p-3 bg-bg dark:bg-bg-dark rounded-xl border border-border dark:border-border-dark">
            <strong className="block text-text dark:text-text-dark">4. Skin Thickness</strong>
            <span className="text-[10px] text-text-secondary dark:text-text-dark-secondary">Triceps skin fold (mm)</span>
          </div>
          <div className="p-3 bg-bg dark:bg-bg-dark rounded-xl border border-border dark:border-border-dark">
            <strong className="block text-text dark:text-text-dark">5. Insulin</strong>
            <span className="text-[10px] text-text-secondary dark:text-text-dark-secondary">2-Hour serum insulin</span>
          </div>
          <div className="p-3 bg-bg dark:bg-bg-dark rounded-xl border border-border dark:border-border-dark">
            <strong className="block text-text dark:text-text-dark">6. BMI</strong>
            <span className="text-[10px] text-text-secondary dark:text-text-dark-secondary">Body mass index (kg/m²)</span>
          </div>
          <div className="p-3 bg-bg dark:bg-bg-dark rounded-xl border border-border dark:border-border-dark">
            <strong className="block text-text dark:text-text-dark">7. DPF Score</strong>
            <span className="text-[10px] text-text-secondary dark:text-text-dark-secondary">Pedigree function</span>
          </div>
          <div className="p-3 bg-bg dark:bg-bg-dark rounded-xl border border-border dark:border-border-dark">
            <strong className="block text-text dark:text-text-dark">8. Age</strong>
            <span className="text-[10px] text-text-secondary dark:text-text-dark-secondary">Years (21 - 81 yrs)</span>
          </div>
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-subtle">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark border border-accent/20 dark:border-accent-dark/20">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-text dark:text-text-dark">Technology Stack Architecture</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stack.map((item) => (
            <div key={item.name} className="p-4 rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark">
              <h4 className="font-bold text-xs text-text dark:text-text-dark mb-1">{item.name}</h4>
              <p className="text-xs text-text-secondary dark:text-text-dark-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Future Scope */}
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-subtle">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark border border-accent/20 dark:border-accent-dark/20">
            <Rocket className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-text dark:text-text-dark">Future Scope & Clinical Roadmap</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-text-secondary dark:text-text-dark-secondary">
          <div className="p-4 rounded-xl border border-border dark:border-border-dark bg-bg dark:bg-bg-dark">
            <strong className="block text-text dark:text-text-dark mb-1">Continuous Glucose Monitors (CGM)</strong>
            <p className="text-text-secondary dark:text-text-dark-secondary">Integrate IoT Bluetooth streaming for real-time glycemic variability monitoring.</p>
          </div>
          <div className="p-4 rounded-xl border border-border dark:border-border-dark bg-bg dark:bg-bg-dark">
            <strong className="block text-text dark:text-text-dark mb-1">Deep Learning Neural Networks</strong>
            <p className="text-text-secondary dark:text-text-dark-secondary">Train Multi-Layer Perceptron (MLP) architectures on multi-center EHR data.</p>
          </div>
          <div className="p-4 rounded-xl border border-border dark:border-border-dark bg-bg dark:bg-bg-dark">
            <strong className="block text-text dark:text-text-dark mb-1">HL7 / FHIR Interoperability</strong>
            <p className="text-text-secondary dark:text-text-dark-secondary">Enable direct integration with hospital Electronic Health Records systems.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;


