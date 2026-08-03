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
  Utensils, 
  Dumbbell, 
  UserCheck, 
  Droplets, 
  Moon, 
  Heart, 
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";


const Prediction = () => {
  const { t, language } = useTheme();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const navigate = useNavigate();

  const fieldsInfo = [
    {
      name: 'patient_name',
      label: t('patientName'),
      placeholder: 'e.g. Johnathan Doe',
      type: 'text',
      normalRange: 'N/A',
      tooltip: 'Identifies the clinical subject for record-keeping and PDF export.',
      defaultValue: user?.name || 'Dr. Sample Patient'
    },
    {
      name: 'pregnancies',
      label: t('pregnancies'),
      placeholder: '0 - 17',
      type: 'number',
      step: '1',
      min: 0,
      max: 20,
      normalRange: '0 – 4 pregnancies',
      tooltip: 'Number of past pregnancies. Gestational history influences metabolic insulin sensitivity.',
      defaultValue: 1
    },
    {
      name: 'glucose',
      label: t('glucose'),
      placeholder: '70 - 200 mg/dL',
      type: 'number',
      step: '1',
      min: 0,
      max: 300,
      normalRange: '70 – 140 mg/dL (Fasting <100)',
      tooltip: '2-hour plasma glucose concentration from an oral glucose tolerance test.',
      defaultValue: 110
    },
    {
      name: 'blood_pressure',
      label: t('bloodPressure'),
      placeholder: '60 - 120 mmHg',
      type: 'number',
      step: '1',
      min: 0,
      max: 200,
      normalRange: '60 – 80 mmHg',
      tooltip: 'Diastolic blood pressure reading in mmHg.',
      defaultValue: 72
    },
    {
      name: 'skin_thickness',
      label: t('skinThickness'),
      placeholder: '10 - 50 mm',
      type: 'number',
      step: '1',
      min: 0,
      max: 99,
      normalRange: '10 – 30 mm',
      tooltip: 'Triceps skin fold thickness in mm, used to estimate body fat percentage.',
      defaultValue: 23
    },
    {
      name: 'insulin',
      label: t('insulin'),
      placeholder: '15 - 276 mu U/ml',
      type: 'number',
      step: '1',
      min: 0,
      max: 900,
      normalRange: '16 – 166 μU/mL',
      tooltip: '2-Hour serum insulin level in micro-units per milliliter.',
      defaultValue: 80
    },
    {
      name: 'bmi',
      label: t('bmi'),
      placeholder: '18.5 - 45.0 kg/m²',
      type: 'number',
      step: '0.1',
      min: 10,
      max: 70,
      normalRange: '18.5 – 24.9 kg/m²',
      tooltip: 'Body Mass Index calculated as weight in kg / (height in m)². Key risk factor.',
      defaultValue: 24.5
    },
    {
      name: 'dpf',
      label: t('dpf'),
      placeholder: '0.08 - 2.42',
      type: 'number',
      step: '0.01',
      min: 0.01,
      max: 3.0,
      normalRange: '0.08 – 0.50 (Genetic History Score)',
      tooltip: 'Scores genetic likelihood of diabetes based on family medical history.',
      defaultValue: 0.38
    },
    {
      name: 'age',
      label: t('age'),
      placeholder: '21 - 85 years',
      type: 'number',
      step: '1',
      min: 21,
      max: 110,
      normalRange: '21 – 80 years',
      tooltip: 'Age of the patient in years.',
      defaultValue: 32
    }
  ];

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      patient_name: user?.name || 'Emma Watson',
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
    toast.success(`Loaded preset: ${presetData.patient_name}`);
  };

  const handleVoiceInputRecognized = (transcript) => {
    // Parse simple numbers or patient name from speech recognition
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
        // Calculate 0-100 Health Score
        const risk = response.risk_percentage || 20;
        const healthScore = Math.max(10, Math.min(100, Math.round(100 - risk)));
        
        const fullResult = { ...response, health_score: healthScore, userId: user?.uid };
        setResult(fullResult);
        localStorage.setItem('latest_patient_prediction', JSON.stringify(fullResult));

        // Step 16: Save Prediction History in Firestore
        try {
          await addDoc(collection(db, "predictions"), {
            uid: user?.uid || "guest_123",
            patientName: data.patient_name || response.patient_name || "Ravi",
            age: Number(data.age || 45),
            glucose: Number(data.glucose || 180),
            bmi: Number(data.bmi || 32.5),
            insulin: Number(data.insulin || 120),
            prediction: response.prediction === 1 ? "High Risk" : "Low Risk",
            probability: `${(response.probability * 100).toFixed(0)}%`,
            algorithm: response.algorithm || "Random Forest",
            risk: response.risk_level || (response.prediction === 1 ? "Severe" : "Low"),
            date: new Date().toISOString().split('T')[0],
            createdAt: new Date()
          });
        } catch (fsErr) {
          console.warn("Firestore prediction save:", fsErr);
        }

        if (response.prediction === 0) {
          toast.success(`Analysis Complete for ${response.patient_name}: LOW RISK`);
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
        } else {
          toast.error(`Analysis Complete for ${response.patient_name}: HIGH RISK`);
        }
      }
    } catch (err) {
      toast.dismiss(loaderToast);
      toast.error('Error computing prediction result.');
    } finally {
      setLoading(false);
    }
  };

  // Format text string for text-to-speech reading
  const speechText = result
    ? `Patient ${result.patient_name}. Diabetes Risk Level: ${result.risk_level}. Health Score: ${result.health_score} out of 100. ${result.prediction === 1 ? 'High risk indicated. Please consult a physician.' : 'Low risk indicated. Continue healthy lifestyle.'}`
    : "";

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2.5">
            <Stethoscope className="w-8 h-8 text-primary-600 animate-pulse" />
            <span>{t('prediction')}</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <VoiceAssistant textToRead={speechText} onVoiceInput={handleVoiceInputRecognized} />

          <button
            onClick={() => { reset(); setResult(null); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Quick Test Presets Banner */}
      <PresetButtons onSelectPreset={handleSelectPreset} onReset={() => { reset(); setResult(null); }} />

      {/* Main Grid: Input Form & Animated Result Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Form Column */}
        <div className="lg:col-span-7 bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary-600" />
              <span>Biometric & Clinical Input Form</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">8 Feature Vectors</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fieldsInfo.map((field) => (
                <div key={field.name} className={field.name === 'patient_name' ? 'sm:col-span-2' : ''}>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <span>{field.label}</span>
                      <div className="relative">
                        <button
                          type="button"
                          onMouseEnter={() => setActiveTooltip(field.name)}
                          onMouseLeave={() => setActiveTooltip(null)}
                          className="text-slate-400 hover:text-primary-600 transition-colors"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                        </button>
                        {activeTooltip === field.name && (
                          <div className="absolute left-0 bottom-full mb-2 w-56 p-2.5 bg-slate-900 text-white text-[10px] rounded-xl shadow-xl z-50 pointer-events-none">
                            {field.tooltip}
                          </div>
                        )}
                      </div>
                    </label>

                    <span className="text-[10px] text-slate-400 font-medium">
                      Normal: <strong className="text-slate-600 dark:text-slate-300">{field.normalRange}</strong>
                    </span>
                  </div>

                  <input
                    type={field.type}
                    step={field.step}
                    min={field.min}
                    max={field.max}
                    placeholder={field.placeholder}
                    {...register(field.name, { required: `${field.label} is required` })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary-500/50 outline-none transition-all"
                  />
                  {errors[field.name] && (
                    <p className="text-[10px] text-red-500 mt-1">{errors[field.name].message}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-extrabold text-sm sm:text-base shadow-glow-primary flex items-center justify-center gap-3 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Activity className="w-5 h-5 animate-spin" />
                    <span>{t('generating')}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <div className={`rounded-2xl p-6 shadow-xl border ${
                  result.prediction === 1
                    ? 'bg-gradient-to-b from-red-50 to-white dark:from-red-950/40 dark:to-dark-card border-red-200 dark:border-red-800/60'
                    : 'bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/40 dark:to-dark-card border-emerald-200 dark:border-emerald-800/60'
                }`}>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      {result.prediction === 1 ? (
                        <XCircle className="w-6 h-6 text-red-500" />
                      ) : (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      )}
                      <div>
                        <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
                          Hello {result.patient_name}
                        </h3>
                        <p className="text-[10px] text-slate-400">{result.timestamp}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/reports', { state: { result } })}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5" /> PDF Report
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
                  <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                    <button
                      onClick={() => navigate('/reports', { state: { result } })}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-extrabold text-xs shadow-glow-primary flex items-center justify-center gap-2 transition-all"
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
              <div className="h-full min-h-[380px] bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-8 shadow-glass dark:shadow-glass-dark flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-3xl bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4">
                  <Stethoscope className="w-8 h-8 animate-pulse" />
                </div>
                <h4 className="font-bold text-base text-slate-800 dark:text-white mb-1">
                  Ready for AI Health Assessment
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                  Enter your biometric details or use voice dictation on the left to calculate instant ML risk evaluation and 0-100 Health Score.
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
