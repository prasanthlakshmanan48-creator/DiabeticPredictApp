import React from 'react';
import { CheckCircle, AlertOctagon, HelpCircle, XCircle } from 'lucide-react';

const ConfusionMatrix = ({ matrix, modelName = "Random Forest Classifier" }) => {
  const { tn = 95, fp = 9, fn = 9, tp = 47 } = matrix || {};
  const total = tn + fp + fn + tp;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-text dark:text-text-dark">{modelName} - Confusion Matrix</h4>
        <span className="text-xs text-text-secondary dark:text-text-dark-secondary">Test Size: {total} Samples</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* True Negative */}
        <div className="p-4 rounded-2xl bg-[#EAF3DE] dark:bg-[#3B6D11]/20 border border-[#3B6D11]/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#3B6D11] dark:text-[#5DCAA5] font-semibold">
            <span>True Negative (TN)</span>
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-[#3B6D11] dark:text-[#5DCAA5]">{tn}</span>
            <p className="text-[11px] opacity-80 mt-0.5">Correctly Classified Non-Diabetic</p>
          </div>
        </div>

        {/* False Positive */}
        <div className="p-4 rounded-2xl bg-[#FAEEDA] dark:bg-[#854F0B]/20 border border-[#854F0B]/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#854F0B] dark:text-[#F3B664] font-semibold">
            <span>False Positive (FP)</span>
            <AlertOctagon className="w-4 h-4" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-[#854F0B] dark:text-[#F3B664]">{fp}</span>
            <p className="text-[11px] opacity-80 mt-0.5">Type I Error (False Alarm)</p>
          </div>
        </div>

        {/* False Negative */}
        <div className="p-4 rounded-2xl bg-[#FAEEDA] dark:bg-[#854F0B]/20 border border-[#854F0B]/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#854F0B] dark:text-[#F3B664] font-semibold">
            <span>False Negative (FN)</span>
            <HelpCircle className="w-4 h-4" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-[#854F0B] dark:text-[#F3B664]">{fn}</span>
            <p className="text-[11px] opacity-80 mt-0.5">Type II Error (Missed Diagnosis)</p>
          </div>
        </div>

        {/* True Positive */}
        <div className="p-4 rounded-2xl bg-[#FCEBEB] dark:bg-[#A32D2D]/20 border border-[#A32D2D]/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#A32D2D] dark:text-[#F87171] font-semibold">
            <span>True Positive (TP)</span>
            <XCircle className="w-4 h-4" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-[#A32D2D] dark:text-[#F87171]">{tp}</span>
            <p className="text-[11px] opacity-80 mt-0.5">Correctly Classified Diabetic</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfusionMatrix;

