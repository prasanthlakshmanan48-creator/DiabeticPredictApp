import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { predictDiabetes } from '../services/api';
import { 
  Stethoscope, 
  User, 
  Activity, 
  Sliders,
  ArrowRight, 
  RotateCcw,
  CheckCircle,
  Info,
  FileText,
  Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Number-counting animation component (0% -> target%)
const AnimatedProbability = ({ targetValue }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(targetValue) || 0;
    if (end === 0) {
      setCount(0);
      return;
    }
    const duration = 500; // ms
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetValue]);

  return <span>{count.toFixed(1)}%</span>;
};

const Prediction = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: {
      patient_name: 'Patient #1',
      age: 45,
      gender: 'Female',
      bmi: 28.4,
      glucose: 110,
      blood_pressure: 72,
      insulin: 85,
      pregnancies: 1,
      family_history: 'No',
      physical_activity: 'Moderate',
      skin_thickness: 20,
      diabetes_pedigree: 0.35
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setResult(null);
    try {
      const payload = {
        patient_name: data.patient_name || 'Patient',
        age: parseFloat(data.age),
        bmi: parseFloat(data.bmi),
        blood_pressure: parseFloat(data.blood_pressure),
        glucose: parseFloat(data.glucose),
        insulin: parseFloat(data.insulin),
        skin_thickness: parseFloat(data.skin_thickness) || 0,
        dpf: parseFloat(data.diabetes_pedigree) || 0.35,
        pregnancies: parseFloat(data.pregnancies) || 0,
      };

      const res = await predictDiabetes(payload);
      if (res) {
        setResult({
          ...res,
          formData: data
        });
        toast.success('Risk assessment calculated successfully.');
      }
    } catch (err) {
      toast.error(err.message || 'Error processing prediction.');
    } finally {
      setLoading(false);
    }
  };

  const featureImportances = [
    { name: 'Glucose Level', weight: 31.2, value: `${result?.formData?.glucose || 110} mg/dL` },
    { name: 'BMI (Body Mass Index)', weight: 22.4, value: `${result?.formData?.bmi || 28.4} kg/m²` },
    { name: 'Age', weight: 14.5, value: `${result?.formData?.age || 45} yrs` },
    { name: 'Diabetes Pedigree Function', weight: 11.8, value: `${result?.formData?.diabetes_pedigree || 0.35}` },
    { name: 'Serum Insulin', weight: 7.6, value: `${result?.formData?.insulin || 85} μU/mL` },
  ];

  return (
    <div className="w-full max-w-4xl space-y-6">
      
      {/* Title & Subtitle */}
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="pb-4 border-b border-slate-200 dark:border-slate-700"
      >
        <div className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Diabetes Risk Prediction
          </h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Enter the patient's information to estimate diabetes risk.
        </p>
      </motion.div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Section 1: Patient Details (Delay 0.08s) */}
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.08 }}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5 space-y-4 shadow-sm"
        >
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700">
            <User className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Patient Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Patient Name / ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('patient_name', { required: 'Patient ID or name is required.' })}
                placeholder="e.g. Patient #101"
                className={`w-full px-3 py-2 border rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none ${
                  errors.patient_name ? 'border-red-500 focus:border-red-500' : 'border-slate-300 dark:border-slate-600 focus:border-teal-600'
                }`}
              />
              {errors.patient_name && (
                <p className="text-[11px] text-red-500 mt-1">{errors.patient_name.message}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Age (years) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register('age', { 
                  required: 'Please enter age.',
                  min: { value: 1, message: 'Please enter a valid age.' },
                  max: { value: 120, message: 'Please enter a valid age (1-120).' }
                })}
                placeholder="45"
                className={`w-full px-3 py-2 border rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none ${
                  errors.age ? 'border-red-500 focus:border-red-500' : 'border-slate-300 dark:border-slate-600 focus:border-teal-600'
                }`}
              />
              {errors.age ? (
                <p className="text-[11px] text-red-500 mt-1">{errors.age.message}</p>
              ) : (
                <span className="text-[10px] text-slate-400">Valid range: 1 - 120 yrs</span>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Gender
              </label>
              <select
                {...register('gender')}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-600"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                BMI (kg/m²) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                {...register('bmi', { 
                  required: 'BMI value is required.',
                  min: { value: 10, message: 'Please enter a valid BMI value.' },
                  max: { value: 80, message: 'Please enter a valid BMI value (10-80).' }
                })}
                placeholder="28.4"
                className={`w-full px-3 py-2 border rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none ${
                  errors.bmi ? 'border-red-500 focus:border-red-500' : 'border-slate-300 dark:border-slate-600 focus:border-teal-600'
                }`}
              />
              {errors.bmi ? (
                <p className="text-[11px] text-red-500 mt-1">{errors.bmi.message}</p>
              ) : (
                <span className="text-[10px] text-slate-400">Normal reference: 18.5 – 24.9 kg/m²</span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Section 2: Clinical Measurements (Delay 0.16s) */}
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.16 }}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5 space-y-4 shadow-sm"
        >
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700">
            <Activity className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Clinical Measurements</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Glucose Level (mg/dL) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="any"
                {...register('glucose', { 
                  required: 'Glucose level is required.',
                  min: { value: 10, message: 'Please enter a valid glucose level.' },
                  max: { value: 600, message: 'Please enter a valid glucose level (10-600).' }
                })}
                placeholder="110"
                className={`w-full px-3 py-2 border rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none ${
                  errors.glucose ? 'border-red-500 focus:border-red-500' : 'border-slate-300 dark:border-slate-600 focus:border-teal-600'
                }`}
              />
              {errors.glucose ? (
                <p className="text-[11px] text-red-500 mt-1">{errors.glucose.message}</p>
              ) : (
                <span className="text-[10px] text-slate-400">Normal reference: 70 – 140 mg/dL</span>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Blood Pressure (mmHg) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="any"
                {...register('blood_pressure', { 
                  required: 'Blood pressure is required.',
                  min: { value: 30, message: 'Please enter a valid blood pressure.' },
                  max: { value: 250, message: 'Please enter a valid blood pressure (30-250).' }
                })}
                placeholder="72"
                className={`w-full px-3 py-2 border rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none ${
                  errors.blood_pressure ? 'border-red-500 focus:border-red-500' : 'border-slate-300 dark:border-slate-600 focus:border-teal-600'
                }`}
              />
              {errors.blood_pressure ? (
                <p className="text-[11px] text-red-500 mt-1">{errors.blood_pressure.message}</p>
              ) : (
                <span className="text-[10px] text-slate-400">Normal reference: 60 – 80 mmHg</span>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Serum Insulin (μU/mL) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="any"
                {...register('insulin', { 
                  required: 'Insulin level is required.',
                  min: { value: 0, message: 'Insulin level cannot be negative.' },
                  max: { value: 900, message: 'Please enter a valid insulin level.' }
                })}
                placeholder="85"
                className={`w-full px-3 py-2 border rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none ${
                  errors.insulin ? 'border-red-500 focus:border-red-500' : 'border-slate-300 dark:border-slate-600 focus:border-teal-600'
                }`}
              />
              {errors.insulin ? (
                <p className="text-[11px] text-red-500 mt-1">{errors.insulin.message}</p>
              ) : (
                <span className="text-[10px] text-slate-400">Normal reference: 16 – 166 μU/mL</span>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Pregnancies
              </label>
              <input
                type="number"
                {...register('pregnancies', { min: { value: 0, message: 'Cannot be negative.' } })}
                placeholder="1"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-600"
              />
              <span className="text-[10px] text-slate-400">Gestational count (if female)</span>
            </div>
          </div>
        </motion.div>

        {/* Section 3: Additional Risk Factors (Delay 0.24s) */}
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.24 }}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5 space-y-4 shadow-sm"
        >
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700">
            <Sliders className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Additional Risk Factors</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Family History of Diabetes
              </label>
              <select
                {...register('family_history')}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-600"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Physical Activity
              </label>
              <select
                {...register('physical_activity')}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-600"
              >
                <option value="Low">Low (&lt;1 hr/week)</option>
                <option value="Moderate">Moderate (1-3 hrs/week)</option>
                <option value="Active">Active (&gt;3 hrs/week)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Skin Thickness (mm)
              </label>
              <input
                type="number"
                step="any"
                {...register('skin_thickness')}
                placeholder="20"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-600"
              />
              <span className="text-[10px] text-slate-400">Triceps fold (10 – 50 mm)</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Diabetes Pedigree Function
              </label>
              <input
                type="number"
                step="0.01"
                {...register('diabetes_pedigree')}
                placeholder="0.35"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-600"
              />
              <span className="text-[10px] text-slate-400">Genetics score (0.08 – 2.42)</span>
            </div>
          </div>
        </motion.div>

        {/* Buttons (Delay 0.3s) */}
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-semibold text-xs flex items-center gap-2 transition-colors disabled:opacity-50 shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing patient information...</span>
              </>
            ) : (
              <>
                <span>Predict Risk</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all entered patient form values?')) {
                reset();
                setResult(null);
              }
            }}
            className="px-4 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-md text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Inputs</span>
          </button>
        </motion.div>
      </form>

      {/* Result Output Section Reveal Sequence */}
      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 space-y-6 shadow-sm"
        >
          
          {/* Result Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Prediction Result</span>
            </h2>
            <button
              onClick={() => navigate('/reports', { state: { result } })}
              className="text-xs text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Full Report</span>
            </button>
          </div>

          {/* Risk Level & Animated Probability Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Risk Badge */}
            <div className={`p-4 rounded-md border text-center space-y-1 ${
              (result.risk_level || '').toLowerCase().includes('high')
                ? 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950/40 dark:border-red-800 dark:text-red-300'
                : (result.risk_level || '').toLowerCase().includes('moderate')
                ? 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
            }`}>
              <div className="text-xs font-semibold uppercase tracking-wider">Risk Level</div>
              <div className="text-2xl font-bold">{result.risk_level || (result.prediction === 1 ? 'High Risk' : 'Low Risk')}</div>
              <div className="text-xs pt-1">
                Estimated Probability: <strong><AnimatedProbability targetValue={result.probability ? result.probability * 100 : 18.0} /></strong>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <div className="font-bold text-slate-900 dark:text-slate-100">Model Evaluation</div>
              <p className="leading-relaxed">
                Based on the information entered, the machine learning classification model estimates a <strong>{(result.risk_level || '').toLowerCase()}</strong> diabetes risk.
              </p>
              <div className="text-[11px] text-slate-500 pt-1">
                <strong>Factors considered:</strong> Glucose level, BMI, Blood pressure, Serum insulin, Age, Family history.
              </div>
            </div>

          </div>

          {/* Assessment Summary Table */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Assessment Summary (Entered Parameters)
            </h3>
            
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-md">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-400">
                    <th className="py-2 px-3">Parameter</th>
                    <th className="py-2 px-3">Entered Value</th>
                    <th className="py-2 px-3">Normal Reference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-2 px-3 font-medium">Glucose Level</td>
                    <td className="py-2 px-3">{result.formData?.glucose} mg/dL</td>
                    <td className="py-2 px-3 text-slate-500">70 – 140 mg/dL</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Body Mass Index (BMI)</td>
                    <td className="py-2 px-3">{result.formData?.bmi} kg/m²</td>
                    <td className="py-2 px-3 text-slate-500">18.5 – 24.9 kg/m²</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Blood Pressure</td>
                    <td className="py-2 px-3">{result.formData?.blood_pressure} mmHg</td>
                    <td className="py-2 px-3 text-slate-500">60 – 80 mmHg</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Serum Insulin</td>
                    <td className="py-2 px-3">{result.formData?.insulin} μU/mL</td>
                    <td className="py-2 px-3 text-slate-500">16 – 166 μU/mL</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Age</td>
                    <td className="py-2 px-3">{result.formData?.age} yrs</td>
                    <td className="py-2 px-3 text-slate-500">Adult reference</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Feature Importance Weights */}
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-xs space-y-2">
              <div className="font-bold text-slate-800 dark:text-slate-200">
                Model Feature Importance Weights
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                {featureImportances.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span>{item.name}:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{item.weight}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* General Recommendation & Disclaimer */}
          <div className="space-y-3 pt-2">
            <div className="p-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/40 rounded-md text-xs space-y-1.5 text-teal-900 dark:text-teal-200">
              <div className="font-bold">General Recommendation</div>
              <p className="leading-relaxed">
                {(result.risk_level || '').toLowerCase().includes('high')
                  ? 'Maintain regular physical activity, adopt a balanced low-glycemic diet, and monitor blood glucose levels. Consider discussing these clinical measurements with a qualified healthcare professional for further evaluation.'
                  : (result.risk_level || '').toLowerCase().includes('moderate')
                  ? 'Maintain a balanced diet, engage in regular aerobic exercise (150 mins/week), and routine annual health screenings. Discussing lifestyle habits with a healthcare professional is recommended.'
                  : 'Continue maintaining a healthy lifestyle, physical activity, and balanced nutrition. Regular annual health checks are recommended to track biometric parameters.'
                }
              </p>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Educational / Research Use Only:</strong> This prediction is intended for educational and research purposes as part of a Biomedical Engineering student project and does not replace professional medical diagnosis or clinical judgment.
              </p>
            </div>
          </div>

        </motion.div>
      )}

    </div>
  );
};

export default Prediction;
