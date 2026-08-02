import React from 'react';
import { HelpCircle, AlertCircle, CheckCircle, Sparkles, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ExplainableAI = ({ features, outcome, probability }) => {
  const { language, t } = useTheme();

  const glucose = parseFloat(features?.glucose || 120);
  const bmi = parseFloat(features?.bmi || 25);
  const age = parseFloat(features?.age || 35);
  const bp = parseFloat(features?.blood_pressure || 75);
  const insulin = parseFloat(features?.insulin || 80);

  const keyFactors = [];

  // Plain-English feature contributions
  if (glucose > 140) {
    keyFactors.push({
      factor: language === 'ta' ? 'இரத்த சர்க்கரை அளவு அதிகம்' : 'High Fasting Glucose',
      detail: language === 'ta'
        ? `உங்கள் இரத்த சர்க்கரை அளவு (${glucose} mg/dL) ஆரோக்கியமான எல்லையை விட அதிகம்.`
        : `Your blood sugar level (${glucose} mg/dL) is higher than the recommended fasting baseline of 100 mg/dL.`,
      type: 'high'
    });
  } else if (glucose > 100) {
    keyFactors.push({
      factor: language === 'ta' ? 'மிதமான இரத்த சர்க்கரை' : 'Elevated Glucose',
      detail: language === 'ta'
        ? `உங்கள் சர்க்கரை அளவு (${glucose} mg/dL) சற்றே அதிகமாக உள்ளது.`
        : `Your glucose concentration (${glucose} mg/dL) is slightly elevated into the pre-diabetic monitoring range.`,
      type: 'warn'
    });
  } else {
    keyFactors.push({
      factor: language === 'ta' ? 'ஆரோக்கியமான இரத்த சர்க்கரை' : 'Healthy Glucose Range',
      detail: language === 'ta'
        ? `உங்கள் சர்க்கரை அளவு (${glucose} mg/dL) சிறந்த ஆரோக்கிய எல்லைக்குள் உள்ளது.`
        : `Your glucose level (${glucose} mg/dL) is within normal healthy limits.`,
      type: 'good'
    });
  }

  if (bmi >= 30) {
    keyFactors.push({
      factor: language === 'ta' ? 'உடற்பொருண்மை சுட்டெண் (BMI) அதிகம்' : 'Higher Body Mass Index (BMI)',
      detail: language === 'ta'
        ? `உங்கள் BMI (${bmi} kg/m²) உடல் எடைக் காரணி அதிக அபாயத்திற்கு வழிவகுக்கிறது.`
        : `Your BMI of ${bmi} kg/m² indicates body mass is above normal limits, which increases metabolic resistance.`,
      type: 'high'
    });
  } else if (bmi >= 25) {
    keyFactors.push({
      factor: language === 'ta' ? 'மிதமான BMI எடை' : 'Overweight BMI Range',
      detail: language === 'ta'
        ? `உங்கள் BMI (${bmi} kg/m²) சற்றே அதிகம்.`
        : `Your BMI of ${bmi} kg/m² is slightly elevated. Managing weight helps prevent diabetes.`,
      type: 'warn'
    });
  } else {
    keyFactors.push({
      factor: language === 'ta' ? 'ஆரோக்கியமான BMI எடை' : 'Optimal Body Mass Index',
      detail: language === 'ta'
        ? `உங்கள் BMI (${bmi} kg/m²) சிறந்த ஆரோக்கிய எல்லைக்குள் உள்ளது.`
        : `Your BMI of ${bmi} kg/m² is in the ideal healthy range.`,
      type: 'good'
    });
  }

  if (age >= 45) {
    keyFactors.push({
      factor: language === 'ta' ? 'வயதுக் காரணி' : 'Age Factor Contribution',
      detail: language === 'ta'
        ? `45 வயதிற்கு மேற்பட்ட வயது இயற்கையாகவே சர்க்கரை நோய் அபாயத்தை அதிகரிக்கும்.`
        : `Age ${age} naturally increases metabolic vulnerability to insulin sensitivity reduction.`,
      type: 'warn'
    });
  }

  return (
    <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950/50 dark:text-primary-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-white">{t('whyPredicted')}</h4>
            <p className="text-[11px] text-slate-400">Plain-English Explainable AI (XAI) Feature Attribution</p>
          </div>
        </div>

        <span className="px-2.5 py-1 text-[10px] font-extrabold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 rounded-full border border-blue-200">
          Senior-Friendly XAI
        </span>
      </div>

      <div className="space-y-3">
        {keyFactors.map((item, index) => (
          <div
            key={index}
            className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs ${
              item.type === 'high'
                ? 'bg-red-50/60 border-red-200 text-red-900 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800'
                : item.type === 'warn'
                ? 'bg-amber-50/60 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800'
                : 'bg-emerald-50/60 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800'
            }`}
          >
            {item.type === 'high' ? (
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            ) : item.type === 'warn' ? (
              <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <strong className="font-bold block mb-0.5">{item.factor}</strong>
              <p className="opacity-90 leading-relaxed text-[11px]">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplainableAI;
