import React from 'react';
import { CheckCircle, AlertOctagon, HelpCircle, XCircle } from 'lucide-react';

const ConfusionMatrix = ({ matrix, modelName = "Random Forest Classifier" }) => {
  const { tn = 95, fp = 9, fn = 9, tp = 47 } = matrix || {};
  const total = tn + fp + fn + tp;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{modelName} - Confusion Matrix</h4>
        <span className="text-xs text-slate-500">Test Size: {total} Samples</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* True Negative */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
            <span>True Negative (TN)</span>
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-emerald-800 dark:text-emerald-200">{tn}</span>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">Correctly Classified Non-Diabetic</p>
          </div>
        </div>

        {/* False Positive */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-300 font-semibold">
            <span>False Positive (FP)</span>
            <AlertOctagon className="w-4 h-4" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-amber-800 dark:text-amber-200">{fp}</span>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">Type I Error (False Alarm)</p>
          </div>
        </div>

        {/* False Negative */}
        <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-orange-700 dark:text-orange-300 font-semibold">
            <span>False Negative (FN)</span>
            <HelpCircle className="w-4 h-4" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-orange-800 dark:text-orange-200">{fn}</span>
            <p className="text-[11px] text-orange-600 dark:text-orange-400 mt-0.5">Type II Error (Missed Diagnosis)</p>
          </div>
        </div>

        {/* True Positive */}
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-red-700 dark:text-red-300 font-semibold">
            <span>True Positive (TP)</span>
            <XCircle className="w-4 h-4" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-red-800 dark:text-red-200">{tp}</span>
            <p className="text-[11px] text-red-600 dark:text-red-400 mt-0.5">Correctly Classified Diabetic</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfusionMatrix;
