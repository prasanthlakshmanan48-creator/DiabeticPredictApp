import React from 'react';
import { Info, Target, Database, Code2 } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl space-y-6">
      
      {/* Title */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Info className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <span>Project Documentation & Details</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Biomedical Engineering Student Project Overview & Technical Implementation.
        </p>
      </div>

      {/* Grid: Objectives & Dataset */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        
        {/* Project Objectives */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5 space-y-3">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700">
            <Target className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Project Objectives</span>
          </h2>
          <ul className="space-y-2 text-slate-700 dark:text-slate-300 list-disc list-inside">
            <li>Develop a functional web interface for early diabetes risk screening.</li>
            <li>Implement Random Forest classification algorithm for risk estimation.</li>
            <li>Provide clear, non-invasive risk probability feedback based on patient biometrics.</li>
            <li>Maintain historical prediction logs in a local database engine.</li>
          </ul>
        </div>

        {/* Dataset Details */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5 space-y-3">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700">
            <Database className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Dataset Information</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            The model is trained on the <strong>Pima Indians Diabetes Dataset</strong> from the National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK), containing 768 patient records with 8 key biometric variables.
          </p>
        </div>

      </div>

      {/* Tech Stack */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5 space-y-3 text-xs">
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700">
          <Code2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>Technology Stack</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 dark:text-slate-300">
          <div><strong className="text-slate-900 dark:text-slate-100">Frontend:</strong> React.js, Tailwind CSS, Lucide Icons</div>
          <div><strong className="text-slate-900 dark:text-slate-100">Backend API:</strong> Python 3.10+, Flask REST API</div>
          <div><strong className="text-slate-900 dark:text-slate-100">Machine Learning:</strong> Scikit-Learn (Random Forest & Logistic Regression)</div>
          <div><strong className="text-slate-900 dark:text-slate-100">Database:</strong> SQLite3 Embedded Database</div>
        </div>
      </div>

    </div>
  );
};

export default About;
