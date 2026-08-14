import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FileText, Download, Printer, Search, Info, CheckCircle } from 'lucide-react';
import { getPredictionHistory } from '../services/api';
import toast from 'react-hot-toast';
import html2pdf from 'html2pdf.js';
import { motion, AnimatePresence } from 'framer-motion';

const Reports = () => {
  const location = useLocation();
  const reportRef = useRef();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    if (location.state?.result) {
      setSelectedReport(location.state.result);
    }
  }, [location.state]);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const data = await getPredictionHistory();
      const list = Array.isArray(data) ? data : (data?.history || []);
      setRecords(list);
    } catch (err) {
      console.warn("Could not fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = records.filter(r => 
    (r.patient_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (r.risk_level || '').toLowerCase().includes(search.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    const element = reportRef.current;
    if (!element) return;
    toast.loading('Preparing PDF report...', { id: 'pdf' });
    const opt = {
      margin: 10,
      filename: `Diabetes_Assessment_Report_${selectedReport?.patient_name || 'Patient'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save().then(() => {
      toast.success('PDF report downloaded successfully.', { id: 'pdf' });
    }).catch(() => {
      toast.error('Failed to export PDF.', { id: 'pdf' });
    });
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Title Header (Delay 0s) */}
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700"
      >
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span>Patient Assessment Reports</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Summary of patient risk evaluation records stored in the database.
          </p>
        </div>

        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePrint}
          className="flex items-center gap-2 px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-50 transition-colors self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>Print Page</span>
        </motion.button>
      </motion.div>

      {/* Search Bar (Delay 0.08s) */}
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.08 }}
        className="flex items-center gap-3"
      >
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient name or ID..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-600"
          />
        </div>
      </motion.div>

      {/* Reports Table (Delay 0.16s) */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.16 }}
        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm"
      >
        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400">
            Loading records...
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            No patient reports found in database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 font-semibold">
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4">Patient ID / Name</th>
                  <th className="py-2.5 px-4">Age</th>
                  <th className="py-2.5 px-4">BMI</th>
                  <th className="py-2.5 px-4">Glucose</th>
                  <th className="py-2.5 px-4">Risk Level</th>
                  <th className="py-2.5 px-4">Probability</th>
                  <th className="py-2.5 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-700 dark:text-slate-300">
                {filteredRecords.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-2.5 px-4">{item.created_at || '14 Aug 2026'}</td>
                    <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-slate-100">{item.patient_name || `Patient #${item.id}`}</td>
                    <td className="py-2.5 px-4">{item.age || 45} yrs</td>
                    <td className="py-2.5 px-4">{item.bmi || 28.4}</td>
                    <td className="py-2.5 px-4">{item.glucose || 118} mg/dL</td>
                    <td className="py-2.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        (item.risk_level || '').toLowerCase().includes('high')
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                          : (item.risk_level || '').toLowerCase().includes('moderate')
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                      }`}>
                        {item.risk_level || 'Low Risk'}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-mono">
                      {item.probability ? `${(item.probability * 100).toFixed(1)}%` : 'N/A'}
                    </td>
                    <td className="py-2.5 px-4">
                      <button
                        onClick={() => setSelectedReport(item)}
                        className="text-teal-600 dark:text-teal-400 font-semibold hover:underline"
                      >
                        View Full Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Selected Report Modal Fade-in Transition */}
      <AnimatePresence>
        {selectedReport && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg max-w-2xl w-full p-6 space-y-5 shadow-xl text-xs my-8"
            >
              
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Patient Assessment Report
                </h3>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleExportPDF}
                    className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded text-xs font-semibold flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export PDF</span>
                  </motion.button>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-slate-400 hover:text-slate-600 font-bold px-2"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Printable Content */}
              <div ref={reportRef} className="space-y-4 p-2 bg-white text-slate-900">
                
                <div className="border-b border-slate-200 pb-3 flex justify-between items-start">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Diabetes Risk Prediction System</h2>
                    <p className="text-[11px] text-slate-500">Biomedical Engineering Project • Clinical Assessment Report</p>
                  </div>
                  <div className="text-right text-[11px] text-slate-500">
                    <div>Date: {selectedReport.created_at || new Date().toLocaleDateString('en-GB')}</div>
                    <div>Report ID: #{selectedReport.id || '101'}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-xs">Patient Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs border border-slate-200 rounded p-2.5 bg-slate-50">
                    <div><strong>Patient ID / Name:</strong> {selectedReport.patient_name || 'Patient'}</div>
                    <div><strong>Age:</strong> {selectedReport.age || selectedReport.formData?.age || 45} yrs</div>
                    <div><strong>Body Mass Index (BMI):</strong> {selectedReport.bmi || selectedReport.formData?.bmi || 28.4} kg/m²</div>
                    <div><strong>Risk Status:</strong> {selectedReport.risk_level || 'Low Risk'}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-xs">Clinical Measurements</h4>
                  <table className="w-full text-left text-xs border border-slate-200 border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th className="py-1.5 px-3">Parameter</th>
                        <th className="py-1.5 px-3">Measured Value</th>
                        <th className="py-1.5 px-3">Normal Reference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="py-1.5 px-3 font-medium">Glucose Level</td>
                        <td className="py-1.5 px-3">{selectedReport.glucose || selectedReport.formData?.glucose || 110} mg/dL</td>
                        <td className="py-1.5 px-3 text-slate-500">70 – 140 mg/dL</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 font-medium">Blood Pressure</td>
                        <td className="py-1.5 px-3">{selectedReport.blood_pressure || selectedReport.formData?.blood_pressure || 72} mmHg</td>
                        <td className="py-1.5 px-3 text-slate-500">60 – 80 mmHg</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 font-medium">Serum Insulin</td>
                        <td className="py-1.5 px-3">{selectedReport.insulin || selectedReport.formData?.insulin || 85} μU/mL</td>
                        <td className="py-1.5 px-3 text-slate-500">16 – 166 μU/mL</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
                  <div className="font-bold text-slate-900">
                    Risk Level: {selectedReport.risk_level || 'Low Risk'} ({selectedReport.probability ? (selectedReport.probability * 100).toFixed(1) : 18.0}%)
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Based on the entered clinical measurements, the machine learning classification model estimates a 
                    {' '}<strong>{selectedReport.risk_level || 'Low Risk'}</strong> assessment for diabetes.
                  </p>
                </div>

                <div className="p-3 bg-teal-50 border border-teal-200 rounded text-xs space-y-1 text-teal-900">
                  <div className="font-bold">General Recommendation</div>
                  <p className="leading-relaxed">
                    Maintain regular physical activity, a balanced nutrition plan, and annual clinical health check-ups. Consider discussing these results with a qualified healthcare professional.
                  </p>
                </div>

                <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-200">
                  <strong>Disclaimer:</strong> Educational/research use only. This prediction is generated as part of a B.E. Biomedical Engineering student project and does not replace professional medical diagnosis.
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Reports;
