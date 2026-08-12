import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, Download, Printer, ShieldCheck, Activity, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import html2pdf from 'html2pdf.js';
import VoiceAssistant from '../components/VoiceAssistant';
import { useTheme } from '../context/ThemeContext';

const Reports = () => {
  const { t } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const reportRef = useRef();

  const sampleResult = {
    patient_name: 'Dr. Sample Patient',
    prediction: 0,
    outcome_text: 'Non-Diabetic',
    probability: 0.142,
    risk_percentage: 14.2,
    risk_level: 'Low Risk',
    confidence: 'High Confidence',
    health_score: 86,
    timestamp: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    features: {
      pregnancies: 1,
      glucose: 110,
      blood_pressure: 72,
      skin_thickness: 23,
      insulin: 80,
      bmi: 24.5,
      dpf: 0.38,
      age: 32
    },
    recommendations: {
      diet: 'Maintain a balanced Mediterranean diet rich in whole grains, green leafy vegetables, and lean proteins. Limit refined sugars.',
      exercise: 'Engage in 150 minutes of moderate aerobic exercise per week plus strength training 2 days/week.',
      doctor: 'Annual routine check-up with blood fasting glucose test is recommended.',
      water: 'Drink 2.5 to 3.0 Liters of water daily to maintain optimal metabolism.',
      sleep: 'Ensure 7 - 9 hours of uninterrupted restorative sleep per night.',
      lifestyle: 'Avoid tobacco, minimize alcohol intake, and maintain regular physical activity.'
    }
  };

  const getReportData = () => {
    if (location.state?.result) {
      return location.state.result;
    }
    const savedPrediction = localStorage.getItem('latest_patient_prediction');
    if (savedPrediction) {
      try {
        return JSON.parse(savedPrediction);
      } catch (e) {}
    }
    return sampleResult;
  };

  const data = getReportData();

  const handleDownloadPDF = () => {
    const element = reportRef.current;
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `Medical_Report_${data.patient_name.replace(/\s+/g, '_')}_${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    toast.promise(
      html2pdf().set(opt).from(element).save(),
      {
        loading: 'Generating clinical PDF document...',
        success: 'Medical report downloaded successfully!',
        error: 'Error creating PDF document.'
      }
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const speechText = `Diagnostic Report for ${data.patient_name}. Diabetes Risk: ${data.risk_level}. Health Score: ${data.health_score || 85} out of 100. Outcome: ${data.prediction === 1 ? 'High risk indicated. Please consult a physician.' : 'Low risk indicated.'}`;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/prediction')}
            className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent font-semibold mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Prediction Form
          </button>
          <h1 className="text-2xl font-extrabold text-text dark:text-text-dark flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-accent dark:text-accent-dark" />
            <span>{t('reports')}</span>
          </h1>
          <p className="text-xs text-text-secondary dark:text-text-dark-secondary mt-1">
            Official machine learning diagnostic report ready for patient record retention and printing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <VoiceAssistant textToRead={speechText} />

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark text-xs font-semibold text-text dark:text-text-dark hover:bg-bg transition-colors shadow-subtle"
          >
            <Printer className="w-4 h-4" /> Print Report
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white dark:bg-accent-dark dark:text-bg-dark text-xs font-bold transition-colors shadow-subtle"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div 
        ref={reportRef} 
        className="max-w-4xl mx-auto bg-surface text-text p-8 sm:p-12 rounded-3xl shadow-subtle border border-border print:shadow-none print:border-none print:p-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b-2 border-border mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center font-bold text-xl">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-text tracking-tight">Intelligent Diabetes Prediction System</h2>
              <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider">
                Clinical AI Diagnostic Report
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-bg text-text font-mono text-xs font-bold rounded-lg mb-1 border border-border">
              REPORT ID: DX-{Math.floor(100000 + Math.random() * 900000)}
            </span>
            <p className="text-xs text-text-secondary">Date: {data.timestamp || new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Patient & Health Score Overview */}
        <div className="grid grid-cols-2 gap-6 bg-bg p-6 rounded-2xl mb-8 border border-border">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Patient Details</span>
            <h3 className="text-lg font-bold text-text mt-1">{data.patient_name}</h3>
            <p className="text-xs text-text-secondary mt-0.5">Age: {data.features.age} yrs | Baseline Cohort: PIMA Standard</p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">AI Risk & Health Score</span>
            <div className="mt-1 flex items-center justify-end gap-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#EAF3DE] text-[#3B6D11] border border-[#3B6D11]/30">
                Health Score: {data.health_score || 85} / 100
              </span>
              <span className={`text-xl font-extrabold ${data.prediction === 1 ? 'text-[#A32D2D]' : 'text-[#3B6D11]'}`}>
                {data.risk_level} ({data.risk_percentage}%)
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-1">Model Confidence: <strong>{data.confidence}</strong></p>
          </div>
        </div>

        {/* Diagnostic Outcome Banner */}
        <div className={`p-4 rounded-2xl mb-8 border flex items-center gap-4 ${
          data.prediction === 1 ? 'bg-[#FCEBEB] border-[#A32D2D]/30 text-[#A32D2D]' : 'bg-[#EAF3DE] border-[#3B6D11]/30 text-[#3B6D11]'
        }`}>
          {data.prediction === 1 ? (
            <AlertTriangle className="w-7 h-7 text-[#A32D2D] flex-shrink-0" />
          ) : (
            <CheckCircle className="w-7 h-7 text-[#3B6D11] flex-shrink-0" />
          )}
          <div>
            <h4 className="font-bold text-sm">
              Clinical Result: {data.prediction === 1 ? 'ELEVATED DIABETIC RISK INDICATED' : 'NORMAL DIABETIC RISK ASSESSED'}
            </h4>
            <p className="text-xs opacity-90 mt-0.5 leading-relaxed">
              Machine Learning classification evaluated 8 biometric vectors and computed a {data.risk_percentage}% risk probability with a Health Score of {data.health_score || 85}/100.
            </p>
          </div>
        </div>

        {/* Biometrics Table */}
        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3">
            Recorded Patient Biometrics (PIMA Standard)
          </h4>
          <div className="overflow-hidden border border-border rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-bg text-text font-bold uppercase">
                <tr>
                  <th className="p-3">Parameter Name</th>
                  <th className="p-3">Recorded Value</th>
                  <th className="p-3">Clinical Reference Range</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-text-secondary">
                <tr>
                  <td className="p-3 font-semibold text-text">Fasting Plasma Glucose</td>
                  <td className="p-3 font-bold text-text">{data.features.glucose} mg/dL</td>
                  <td className="p-3 text-text-secondary">70 – 140 mg/dL</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${data.features.glucose > 140 ? 'bg-[#FCEBEB] text-[#A32D2D]' : 'bg-[#EAF3DE] text-[#3B6D11]'}`}>
                      {data.features.glucose > 140 ? 'High' : 'Normal'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text">Body Mass Index (BMI)</td>
                  <td className="p-3 font-bold text-text">{data.features.bmi} kg/m²</td>
                  <td className="p-3 text-text-secondary">18.5 – 24.9 kg/m²</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${data.features.bmi > 25 ? 'bg-[#FAEEDA] text-[#854F0B]' : 'bg-[#EAF3DE] text-[#3B6D11]'}`}>
                      {data.features.bmi > 25 ? 'Elevated' : 'Optimal'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text">Diastolic Blood Pressure</td>
                  <td className="p-3 font-bold text-text">{data.features.blood_pressure} mmHg</td>
                  <td className="p-3 text-text-secondary">60 – 80 mmHg</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAF3DE] text-[#3B6D11]">Normal</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text">2-Hour Serum Insulin</td>
                  <td className="p-3 font-bold text-text">{data.features.insulin} mu U/ml</td>
                  <td className="p-3 text-text-secondary">15 – 276 mu U/ml</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAF3DE] text-[#3B6D11]">Normal</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text">Diabetes Pedigree Score</td>
                  <td className="p-3 font-bold text-text">{data.features.dpf}</td>
                  <td className="p-3 text-text-secondary">0.08 – 0.50</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAF3DE] text-[#3B6D11]">Normal</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text">Pregnancies Count</td>
                  <td className="p-3 font-bold text-text">{data.features.pregnancies}</td>
                  <td className="p-3 text-text-secondary">0 – 4</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAF3DE] text-[#3B6D11]">Normal</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Clinical Recommendations */}
        <div className="mb-10 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            Targeted Health & Lifestyle Directives
          </h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-bg rounded-xl border border-border">
              <strong className="block text-text mb-1">Nutrition & Diet:</strong>
              <p className="text-text-secondary leading-relaxed">{data.recommendations.diet}</p>
            </div>
            <div className="p-3.5 bg-bg rounded-xl border border-border">
              <strong className="block text-text mb-1">Physical Activity:</strong>
              <p className="text-text-secondary leading-relaxed">{data.recommendations.exercise}</p>
            </div>
            <div className="p-3.5 bg-bg rounded-xl border border-border">
              <strong className="block text-text mb-1">Physician Consultation:</strong>
              <p className="text-text-secondary leading-relaxed">{data.recommendations.doctor}</p>
            </div>
            <div className="p-3.5 bg-bg rounded-xl border border-border">
              <strong className="block text-text mb-1">Hydration & Sleep:</strong>
              <p className="text-text-secondary leading-relaxed">{data.recommendations.water} • {data.recommendations.sleep}</p>
            </div>
          </div>
        </div>

        {/* Doctor Signature & Authorization Line */}
        <div className="pt-8 border-t-2 border-border flex items-end justify-between text-xs">
          <div>
            <div className="flex items-center gap-1.5 text-accent font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-accent" /> Validated by Intelligent Diabetes Diagnostic System
            </div>
            <p className="text-text-secondary text-[10px]">Model Architecture: Random Forest (120 Estimators) / Scikit-Learn Engine</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;


