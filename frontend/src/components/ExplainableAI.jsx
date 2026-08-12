import React from 'react';
import { HelpCircle, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ExplainableAI = ({ features, outcome, probability }) => {
  const { language, t } = useTheme();

  const glucose = parseFloat(features?.glucose || 120);
  const bmi = parseFloat(features?.bmi || 25);
  const age = parseFloat(features?.age || 35);

  const keyFactors = [];

  if (glucose > 140) {
    keyFactors.push({
      factor: language === 'ta' ? 'இரத்த சர்க்கரை அளவு அதிகம்' : 'High Fasting Glucose Concentration',
      detail: language === 'ta'
        ? `உங்கள் இரத்த சர்க்கரை அளவு (${glucose} mg/dL) ஆரோக்கியமான எல்லையை விட அதிகம்.`
        : `Your blood sugar level (${glucose} mg/dL) exceeds the standard fasting threshold of 100 mg/dL.`,
      type: 'high'
    });
  } else if (glucose > 100) {
    keyFactors.push({
      factor: language === 'ta' ? 'மிதமான இரத்த சர்க்கரை' : 'Elevated Pre-Diabetic Glucose',
      detail: language === 'ta'
        ? `உங்கள் சர்க்கரை அளவு (${glucose} mg/dL) சற்றே அதிகமாக உள்ளது.`
        : `Your glucose concentration (${glucose} mg/dL) falls into the pre-diabetic observation zone.`,
      type: 'warn'
    });
  } else {
    keyFactors.push({
      factor: language === 'ta' ? 'ஆரோக்கியமான இரத்த சர்க்கரை' : 'Optimal Fasting Glucose Level',
      detail: language === 'ta'
        ? `உங்கள் சர்க்கரை அளவு (${glucose} mg/dL) சிறந்த ஆரோக்கிய எல்லைக்குள் உள்ளது.`
        : `Your glucose level (${glucose} mg/dL) is within normal clinical limits.`,
      type: 'good'
    });
  }

  if (bmi >= 30) {
    keyFactors.push({
      factor: language === 'ta' ? 'உடற்பொருண்மை சுட்டெண் (BMI) அதிகம்' : 'Elevated Body Mass Index (BMI)',
      detail: language === 'ta'
        ? `உங்கள் BMI (${bmi} kg/m²) உடல் எடைக் காரணி அதிக அபாயத்திற்கு வழிவகுக்கிறது.`
        : `Your BMI of ${bmi} kg/m² is elevated, which contributes to insulin resistance.`,
      type: 'high'
    });
  } else if (bmi >= 25) {
    keyFactors.push({
      factor: language === 'ta' ? 'மிதமான BMI எடை' : 'Moderate BMI Level',
      detail: language === 'ta'
        ? `உங்கள் BMI (${bmi} kg/m²) சற்றே அதிகம்.`
        : `Your BMI of ${bmi} kg/m² is slightly elevated. Weight monitoring is recommended.`,
      type: 'warn'
    });
  } else {
    keyFactors.push({
      factor: language === 'ta' ? 'ஆரோக்கியமான BMI எடை' : 'Optimal Body Mass Index',
      detail: language === 'ta'
        ? `உங்கள் BMI (${bmi} kg/m²) சிறந்த ஆரோக்கிய எல்லைக்குள் உள்ளது.`
        : `Your BMI of ${bmi} kg/m² is in the healthy reference range.`,
      type: 'good'
    });
  }

  if (age >= 45) {
    keyFactors.push({
      factor: language === 'ta' ? 'வயதுக் காரணி' : 'Metabolic Age Indicator',
      detail: language === 'ta'
        ? `45 வயதிற்கு மேற்பட்ட வயது இயற்கையாகவே சர்க்கரை நோய் அபாயத்தை அதிகரிக்கும்.`
        : `Age ${age} is associated with progressive metabolic insulin sensitivity reduction.`,
      type: 'warn'
    });
  }

  return (
    <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-subtle space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border dark:border-border-dark">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark border border-accent/20 dark:border-accent-dark/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-text dark:text-text-dark">{t('whyPredicted')}</h4>
            <p className="text-[11px] text-text-secondary dark:text-text-dark-secondary">Clinical Explainable AI (XAI) Feature Attribution</p>
          </div>
        </div>

        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-bg text-text-secondary dark:bg-bg-dark dark:text-text-dark-secondary rounded-md border border-border dark:border-border-dark">
          Transparent AI
        </span>
      </div>

      <div className="space-y-2.5">
        {keyFactors.map((item, index) => (
          <div
            key={index}
            className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs ${
              item.type === 'high'
                ? 'bg-[#FCEBEB] border-[#A32D2D]/30 text-[#A32D2D]'
                : item.type === 'warn'
                ? 'bg-[#FAEEDA] border-[#854F0B]/30 text-[#854F0B]'
                : 'bg-[#EAF3DE] border-[#3B6D11]/30 text-[#3B6D11]'
            }`}
          >
            {item.type === 'high' ? (
              <AlertCircle className="w-4 h-4 text-[#A32D2D] flex-shrink-0 mt-0.5" />
            ) : item.type === 'warn' ? (
              <HelpCircle className="w-4 h-4 text-[#854F0B] flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-4 h-4 text-[#3B6D11] flex-shrink-0 mt-0.5" />
            )}
            <div>
              <strong className="font-extrabold block mb-0.5">{item.factor}</strong>
              <p className="opacity-90 leading-relaxed text-[11px]">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplainableAI;


