import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, AlertCircle, RotateCcw } from 'lucide-react';

const PresetButtons = ({ onSelectPreset, onReset }) => {
  const presets = [
    {
      name: 'Healthy Profile',
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
      data: {
        patient_name: 'Emma Watson',
        pregnancies: 1,
        glucose: 92,
        blood_pressure: 68,
        skin_thickness: 18,
        insulin: 70,
        bmi: 21.4,
        dpf: 0.22,
        age: 26
      }
    },
    {
      name: 'Borderline Profile',
      icon: AlertTriangle,
      color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
      data: {
        patient_name: 'Michael Chang',
        pregnancies: 3,
        glucose: 128,
        blood_pressure: 78,
        skin_thickness: 28,
        insulin: 110,
        bmi: 27.8,
        dpf: 0.45,
        age: 39
      }
    },
    {
      name: 'High Risk Profile',
      icon: AlertCircle,
      color: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800',
      data: {
        patient_name: 'Robert Davis',
        pregnancies: 6,
        glucose: 168,
        blood_pressure: 88,
        skin_thickness: 38,
        insulin: 210,
        bmi: 36.2,
        dpf: 0.88,
        age: 52
      }
    }
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
        <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Quick Test Presets:</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {presets.map((preset) => {
          const Icon = preset.icon;
          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => onSelectPreset(preset.data)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all shadow-sm ${preset.color}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{preset.name}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-medium transition-colors"
          title="Reset Form"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Clear
        </button>
      </div>
    </div>
  );
};

export default PresetButtons;
