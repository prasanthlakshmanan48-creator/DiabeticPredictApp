import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { predictDiabetes } from '../services/api';
import RiskGauge from '../components/RiskGauge';
import HealthScoreGauge from '../components/HealthScoreGauge';
import ExplainableAI from '../components/ExplainableAI';
import VoiceAssistant from '../components/VoiceAssistant';
import PresetButtons from '../components/PresetButtons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  Stethoscope, 
  HelpCircle, 
  Sparkles, 
  Activity, 
  FileText,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

const Prediction = () => {
  const { t } = useTheme();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const navigate = useNavigate();

  const fieldsInfo = [
    {
      name: 'patient_name',
      label: t('patientName'),
      placeholder: 'Full patient name',
      type: 'text',
      unit: '',
      section: 'metadata',
      tooltip: 'Identifies the clinical subject for record-keeping and PDF export.',
      defaultValue: 'Patient 1'
    },
    {
      name: 'glucose',
      label: t('glucose'),
      placeholder: 'e.g. 110',
      type: 'number',
      step: 'any',
      unit: 'mg/dL',
      section: 'lab',
      tooltip: '2-hour plasma glucose concentration from oral glucose tolerance test.',
      defaultValue: 110
    },
    {
      name: 'blood_pressure',
      label: t('bloodPressure'),
      placeholder: 'e.g. 72',
      type: 'number',
      step: 'any',
      unit: 'mmHg',
      section: 'lab',
      tooltip: 'Diastolic blood pressure reading in mmHg.',
      defaultValue: 72
    },
    {
      name: 'insulin',
      label: t('insulin'),
      placeholder: 'e.g. 80',
      type: 'number',
      step: 'any',
      unit: 'μU/mL',
      section: 'lab',
      tooltip: '2-Hour serum insulin level in micro-units per milliliter.',
      defaultValue: 80
    },
    {
      name: 'dpf',
      label: t('dpf'),
      placeholder: 'e.g. 0.38',
      type: 'number',
      step: 'any',
      unit: 'score',
      section: 'lab',
      tooltip: 'Scores genetic likelihood of diabetes based on family medical history.',
      defaultValue: 0.38
    },
    {
      name: 'bmi',
      label: t('bmi'),
      placeholder: 'e.g. 24.5',
      type: 'number',
      step: 'any',
      unit: 'kg/m²',
      section: 'physical',
      tooltip: 'Body Mass Index calculated as weight in kg / (height in m)². Key risk factor.',
      defaultValue: 24.5
    },
    {
      name: 'age',
      label: t('age'),
      placeholder: 'e.g. 32',
      type: 'number',
      step: 'any',
      unit: 'years',
      section: 'physical',
      tooltip: 'Age of the patient in years.',
      defaultValue: 32
    },
    {
      name: 'pregnancies',
      label: t('pregnancies'),
      placeholder: 'e.g. 1',
      type: 'number',
      step: 'any',
      unit: 'count',
      section: 'physical',
      tooltip: 'Number of past pregnancies. Gestational history influences metabolic insulin sensitivity.',
      defaultValue: 1
    },
    {
      name: 'skin_thickness',
      label: t('skinThickness'),
      placeholder: 'e.g. 23',
      type: 'number',
      step: 'any',
      unit: 'mm',
      section: 'physical',
      tooltip: 'Triceps skin fold thickness in mm, used to estimate body fat percentage.',
      defaultValue: 23
    }
  ];

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      patient_name: 'Patient 1',
      pregnancies: 1,
      glucose: 110,
      blood_pressure: 72,
      skin_thickness: 23,
      insulin: 80,
      bmi: 24.5,
      dpf: 0.38,
      age: 32
    }
  });

  const handleSelectPreset = (presetData) => {
    Object.keys(presetData).forEach(key => {
      setValue(key, presetData[key]);
    });
    toast.success(`Loaded clinical preset: ${presetData.patient_name}`);
  };

  const handleVoiceInputRecognized = (transcript) => {
    if (transcript.toLowerCase().includes('glucose')) {
      const match = transcript.match(/\d+/);
      if (match) setValue('glucose', parseInt(match[0]));
    } else if (transcript.toLowerCase().includes('age')) {
      const match = transcript.match(/\d+/);
      if (match) setValue('age', parseInt(match[0]));
    } else {
      setValue('patient_name', transcript);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setResult(null);

    const loaderToast = toast.loading(t('generating'));

    try {
      const payload = { ...data, userId: user?.uid || 'guest_user' };
      const response = await predictDiabetes(payload);
      toast.dismiss(loaderToast);

      if (response) {
        const risk = response.risk_percentage || 20;
        const healthScore = Math.max(10, Math.min(100, Math.round(100 - risk)));
        
        const fullResult = { ...response, health_score: healthScore, userId: user?.id };
        setResult(fullResult);
        localStorage.setItem('latest_patient_prediction', JSON.stringify(fullResult));

        if (response.prediction === 0) {
          toast.success(`Diagnostic Complete for ${response.patient_name}: LOW RISK`);
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
        } else {
          toast.error(`Diagnostic Complete for ${response.patient_name}: ELEVATED RISK`);
        }
      }
    } catch (err) {
      toast.dismiss(loaderToast);
      toast.error('Error computing prediction result.');
    } finally {
      setLoading(false);
    }
  };

  const speechText = result
    ? `Patient ${result.patient_name}. Diabetes Risk Level: ${result.risk_level}. Health Score: ${result.health_score} out of 100. ${result.prediction === 1 ? 'High risk indicated. Please consult a physician.' : 'Low risk indicated. Continue healthy lifestyle.'}`
    : "";

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text dark:text-text-dark flex items-center gap-2.5">
            <Stethoscope className="w-7 h-7 text-accent dark:text-accent-dark" />
            <span>{t('prediction')}</span>
          </h1>
          <p className="text-xs text-text-secondary dark:text-text-dark-secondary mt-1">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <VoiceAssistant textToRead={speechText} onVoiceInput={handleVoiceInputRecognized} />

          <button
            onClick={() => { reset(); setResult(null); }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark text-xs font-semibold text-text dark:text-text-dark hover:bg-bg dark:hover:bg-bg-dark transition-colors shadow-subtle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Form</span>
          </button>
        </div>
      </div>

      {/* Quick Test Presets Banner */}
      <PresetButtons onSelectPreset={handleSelectPreset} onReset={() => { reset(); setResult(null); }} />

      {/* Main Grid: Input Form & Animated Result Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Form Column */}
        <div className="lg:col-span-7 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-subtle">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-border dark:border-border-dark">
            <h3 className="font-bold text-sm text-text dark:text-text-dark flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-accent dark:text-accent-dark" />
              <span>Biometric & Clinical Vector Input</span>
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary bg-bg dark:bg-bg-dark px-2 py-0.5 rounded border border-border dark:border-border-dark">
              8 Diagnostic Indicators
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Metadata Section */}
            <div>
              <label className="block text-xs font-bold text-text-secondary dark:text-text-dark-secondary uppercase tracking-wider mb-2">
                Patient Metadata
              </label>
              <div>
                <input
                  type="text"
                  placeholder="e.g. Emma Watson"
                  {...register('patient_name', { required: 'Patient Name is required' })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-text dark:text-text-dark focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                />
                {errors.patient_name && (
                  <p className="text-[10px] text-[#A32D2D] mt-1">{errors.patient_name.message}</p>
                )}
              </div>
            </div>

            {/* Laboratory Metrics Section */}
            <div>
              <label className="block text-xs font-bold text-text-secondary dark:text-text-dark-secondary uppercase tracking-wider mb-2">
                Laboratory Metrics
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fieldsInfo.filter(f => f.section === 'lab').map((field) => (
                  <div key={field.name}>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-text dark:text-text-dark flex items-center gap-1.5">
                        <span>{field.label}</span>
                        <div className="relative">
                          <button
                            type="button"
                            onMouseEnter={() => setActiveTooltip(field.name)}
                            onMouseLeave={() => setActiveTooltip(null)}
                            className="text-text-secondary hover:text-accent transition-colors"
                          >
                            <HelpCircle className="w-3.5 h-3.5" />
                          </button>
                          {activeTooltip === field.name && (
                            <div className="absolute left-0 bottom-full mb-2 w-56 p-2.5 bg-surface-dark text-text-dark text-[10px] border border-border-dark rounded-xl shadow-xl z-50 pointer-events-none">
                              {field.tooltip}
                            </div>
                          )}
                        </div>
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type={field.type}
                        step={field.step}
                        placeholder={field.placeholder}
                        {...register(field.name, { required: `${field.label} is required` })}
                        className="w-full pl-3.5 pr-14 py-2.5 text-xs rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-text dark:text-text-dark focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                      />
                      {field.unit && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-text-secondary dark:text-text-dark-secondary pointer-events-none">
                          {field.unit}
                        </span>
                      )}
                    </div>
                    {errors[field.name] && (
                      <p className="text-[10px] text-[#A32D2D] mt-1">{errors[field.name].message}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Physical Indicators Section */}
            <div>
              <label className="block text-xs font-bold text-text-secondary dark:text-text-dark-secondary uppercase tracking-wider mb-2">
                Physical & Demographic Indicators
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fieldsInfo.filter(f => f.section === 'physical').map((field) => (
                  <div key={field.name}>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-text dark:text-text-dark flex items-center gap-1.5">
                        <span>{field.label}</span>
                        <div className="relative">
                          <button
                            type="button"
                            onMouseEnter={() => setActiveTooltip(field.name)}
                            onMouseLeave={() => setActiveTooltip(null)}
                            className="text-text-secondary hover:text-accent transition-colors"
                          >
                            <HelpCircle className="w-3.5 h-3.5" />
                          </button>
                          {activeTooltip === field.name && (
                            <div className="absolute left-0 bottom-full mb-2 w-56 p-2.5 bg-surface-dark text-text-dark text-[10px] border border-border-dark rounded-xl shadow-xl z-50 pointer-events-none">
                              {field.tooltip}
                            </div>
                          )}
                        </div>
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type={field.type}
                        step={field.step}
                        placeholder={field.placeholder}
                        {...register(field.name, { required: `${field.label} is required` })}
                        className="w-full pl-3.5 pr-14 py-2.5 text-xs rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-text dark:text-text-dark focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                      />
                      {field.unit && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-text-secondary dark:text-text-dark-secondary pointer-events-none">
                          {field.unit}
                        </span>
                      )}
                    </div>
                    {errors[field.name] && (
                      <p className="text-[10px] text-[#A32D2D] mt-1">{errors[field.name].message}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 mt-6 border-t border-border dark:border-border-dark">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-accent hover:opacity-95 text-white dark:bg-accent-dark dark:text-bg-dark font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    <span>{t('generating')}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t('predictBtn')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Animated Result Card & Health Score Gauge Column */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                <div className={`rounded-2xl p-6 shadow-subtle border ${
                  result.prediction === 1
                    ? 'bg-[#FCEBEB] dark:bg-[#A32D2D]/20 border-[#A32D2D]/30'
                    : 'bg-[#EAF3DE] dark:bg-[#3B6D11]/20 border-[#3B6D11]/30'
                }`}>
                  <div className="flex items-center justify-between pb-4 border-b border-border dark:border-border-dark">
                    <div className="flex items-center gap-2.5">
                      {result.prediction === 1 ? (
                        <XCircle className="w-6 h-6 text-[#A32D2D]" />
                      ) : (
                        <CheckCircle2 className="w-6 h-6 text-[#3B6D11]" />
                      )}
                      <div>
                        <h3 className="font-extrabold text-base text-text dark:text-text-dark">
                          Subject: {result.patient_name}
                        </h3>
                        <p className="text-[10px] text-text-secondary dark:text-text-dark-secondary font-medium">{result.timestamp}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/reports', { state: { result } })}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark text-xs font-bold text-accent dark:text-accent-dark hover:bg-bg transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" /> Report PDF
                    </button>
                  </div>

                  {/* Risk Gauge & 0-100 Health Score */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <RiskGauge
                      percentage={result.risk_percentage}
                      riskLevel={result.risk_level}
                      confidence={result.confidence}
                      outcome={result.prediction}
                    />

                    <HealthScoreGauge score={result.health_score || 85} />
                  </div>

                  {/* Primary Action Button: View & Print Full Patient Report */}
                  <div className="mt-4 pt-4 border-t border-border dark:border-border-dark">
                    <button
                      onClick={() => navigate('/reports', { state: { result } })}
                      className="w-full py-3 px-4 rounded-xl bg-accent text-white dark:bg-accent-dark dark:text-bg-dark font-extrabold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{t('viewReport')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Plain-English Explainable AI Card */}
                <ExplainableAI features={result.features} outcome={result.prediction} probability={result.probability} />
              </motion.div>
            ) : (
              <div className="h-full min-h-[380px] bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-8 shadow-subtle flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark border border-accent/20 dark:border-accent-dark/20 flex items-center justify-center mb-4">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <h4 className="font-extrabold text-base text-text dark:text-text-dark mb-1">
                  Ready for Diagnostic Screening
                </h4>
                <p className="text-xs text-text-secondary dark:text-text-dark-secondary max-w-xs leading-relaxed">
                  Provide patient biometrics on the left or click a clinical test preset to compute ML risk probability and transparent factor attribution.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Prediction;

