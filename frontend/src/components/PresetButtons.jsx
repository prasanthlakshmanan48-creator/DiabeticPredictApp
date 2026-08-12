import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, AlertCircle, RotateCcw } from 'lucide-react';

const PresetButtons = ({ onSelectPreset, onReset }) => {
  const presets = [
    {
      name: 'Healthy Sample',
      icon: CheckCircle2,
      color: 'bg-[#EAF3DE] text-[#3B6D11] border-[#3B6D11]/30 hover:opacity-90',
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
      name: 'Borderline Sample',
      icon: AlertTriangle,
      color: 'bg-[#FAEEDA] text-[#854F0B] border-[#854F0B]/30 hover:opacity-90',
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
      name: 'Elevated Risk Sample',
      icon: AlertCircle,
      color: 'bg-[#FCEBEB] text-[#A32D2D] border-[#A32D2D]/30 hover:opacity-90',
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
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-surface dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark shadow-subtle">
      <div className="flex items-center gap-2 text-xs font-bold text-text dark:text-text-dark">
        <Sparkles className="w-3.5 h-3.5 text-accent dark:text-accent-dark" />
        <span>Clinical Patient Presets:</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {presets.map((preset) => {
          const Icon = preset.icon;
          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => onSelectPreset(preset.data)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${preset.color}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{preset.name}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border dark:border-border-dark bg-bg dark:bg-bg-dark text-text-secondary dark:text-text-dark-secondary hover:bg-border/20 text-xs font-semibold transition-colors"
          title="Reset Form"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Clear
        </button>
      </div>
    </div>
  );
};

export default PresetButtons;


