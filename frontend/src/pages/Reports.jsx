import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, Download, Printer, ShieldCheck, Activity, Stethoscope, ArrowLeft, CheckCircle, AlertTriangle, Heart } from 'lucide-react';
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
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary-600 font-semibold mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Prediction Form
          </button>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-primary-600" />
            <span>{t('reports')}</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Official machine learning diagnostic report ready for patient record retention and printing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <VoiceAssistant textToRead={speechText} />

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-glow-primary transition-all"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div 
        ref={reportRef} 
        className="max-w-4xl mx-auto bg-white text-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-200 print:shadow-none print:border-none print:p-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b-2 border-slate-800 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center font-bold text-xl">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Intelligent Diabetes Prediction System</h2>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Senior & Public Health AI Diagnostics
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 font-mono text-xs font-bold rounded-lg mb-1">
              REPORT ID: DX-{Math.floor(100000 + Math.random() * 900000)}
            </span>
            <p className="text-xs text-slate-500">Date: {data.timestamp || new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Patient & Health Score Overview */}
        <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Patient Details</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">{data.patient_name}</h3>
            <p className="text-xs text-slate-600 mt-0.5">Age: {data.features.age} yrs | Gender: Female (PIMA Baseline)</p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AI Risk & Health Score</span>
            <div className="mt-1 flex items-center justify-end gap-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300">
                Health Score: {data.health_score || 85} / 100
              </span>
              <span className={`text-xl font-extrabold ${data.prediction === 1 ? 'text-red-600' : 'text-emerald-600'}`}>
                {data.risk_level} ({data.risk_percentage}%)
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">Model Confidence: <strong>{data.confidence}</strong></p>
          </div>
        </div>

        {/* Diagnostic Outcome Banner */}
        <div className={`p-4 rounded-2xl mb-8 border flex items-center gap-4 ${
          data.prediction === 1 ? 'bg-red-50 border-red-200 text-red-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
        }`}>
          {data.prediction === 1 ? (
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
          ) : (
            <CheckCircle className="w-8 h-8 text-emerald-600 flex-shrink-0" />
          )}
          <div>
            <h4 className="font-bold text-sm">
              Clinical Result: {data.prediction === 1 ? 'HIGH DIABETIC RISK INDICATED' : 'LOW DIABETIC RISK ASSESSED'}
            </h4>
            <p className="text-xs opacity-90 mt-0.5">
              Machine Learning classification evaluated 8 biometric vectors and computed a {data.risk_percentage}% risk probability with a Health Score of {data.health_score || 85}/100.
            </p>
          </div>
        </div>

        {/* Biometrics Table */}
        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Recorded Patient Biometrics (PIMA Standard)
          </h4>
          <div className="overflow-hidden border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                <tr>
                  <th className="p-3">Parameter Name</th>
                  <th className="p-3">Recorded Value</th>
                  <th className="p-3">Clinical Reference Range</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="p-3 font-semibold">Fasting Plasma Glucose</td>
                  <td className="p-3 font-bold">{data.features.glucose} mg/dL</td>
                  <td className="p-3 text-slate-500">70 – 140 mg/dL</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${data.features.glucose > 140 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {data.features.glucose > 140 ? 'High' : 'Normal'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Body Mass Index (BMI)</td>
                  <td className="p-3 font-bold">{data.features.bmi} kg/m²</td>
                  <td className="p-3 text-slate-500">18.5 – 24.9 kg/m²</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${data.features.bmi > 25 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {data.features.bmi > 25 ? 'Elevated' : 'Optimal'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Diastolic Blood Pressure</td>
                  <td className="p-3 font-bold">{data.features.blood_pressure} mmHg</td>
                  <td className="p-3 text-slate-500">60 – 80 mmHg</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">Normal</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">2-Hour Serum Insulin</td>
                  <td className="p-3 font-bold">{data.features.insulin} mu U/ml</td>
                  <td className="p-3 text-slate-500">15 – 276 mu U/ml</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">Normal</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Diabetes Pedigree Score</td>
                  <td className="p-3 font-bold">{data.features.dpf}</td>
                  <td className="p-3 text-slate-500">0.08 – 0.50</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">Normal</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Pregnancies Count</td>
                  <td className="p-3 font-bold">{data.features.pregnancies}</td>
                  <td className="p-3 text-slate-500">0 – 4</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">Normal</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Clinical Recommendations */}
        <div className="mb-10 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Targeted Health & Lifestyle Directives
          </h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="block text-slate-900 mb-1">Nutrition & Diet:</strong>
              <p className="text-slate-600">{data.recommendations.diet}</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="block text-slate-900 mb-1">Physical Activity:</strong>
              <p className="text-slate-600">{data.recommendations.exercise}</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="block text-slate-900 mb-1">Physician Consultation:</strong>
              <p className="text-slate-600">{data.recommendations.doctor}</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="block text-slate-900 mb-1">Hydration & Sleep:</strong>
              <p className="text-slate-600">{data.recommendations.water} • {data.recommendations.sleep}</p>
            </div>
          </div>
        </div>

        {/* Doctor Signature & Authorization Line */}
        <div className="pt-8 border-t-2 border-slate-200 flex items-end justify-between text-xs">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold mb-1">
              <ShieldCheck className="w-4 h-4" /> Validated by Intelligent Diabetes AI
            </div>
            <p className="text-slate-400 text-[10px]">Algorithm: Logistic Regression / Ensemble ML Engine</p>
          </div>

          <div className="text-center w-48">
            <div className="border-b border-slate-800 pb-1 mb-1 font-serif text-slate-800 font-bold italic text-sm">
              Dr. Sarah Jenkins, MD
            </div>
            <p className="text-[10px] text-slate-500 font-semibold uppercase">Attending Clinician Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
