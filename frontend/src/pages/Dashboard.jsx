import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  PlusCircle, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  FileText,
  Inbox
} from 'lucide-react';
import { getPredictionHistory } from '../services/api';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getPredictionHistory();
      const list = Array.isArray(data) ? data : (data?.history || []);
      setHistory(list);
    } catch (err) {
      console.warn("Could not fetch database records:", err);
    } finally {
      setLoading(false);
    }
  };

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const totalAssessments = history.length;
  const lowRiskCount = history.filter(h => (h.risk_level || '').toLowerCase().includes('low')).length;
  const moderateRiskCount = history.filter(h => (h.risk_level || '').toLowerCase().includes('moderate')).length;
  const highRiskCount = history.filter(h => (h.risk_level || '').toLowerCase().includes('high')).length;

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05 + 0.1,
        duration: 0.25,
        ease: 'easeOut'
      }
    })
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Step 1: Heading Fades In */}
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700"
      >
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Welcome back, {user?.fullname || user?.email || 'Researcher'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Diabetes Risk Prediction System • {currentDate}
          </p>
        </div>

        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/prediction')}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Start New Assessment</span>
        </motion.button>
      </motion.div>

      {/* Step 2: Summary Cards Staggered */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        
        {/* Total Assessments */}
        <motion.div 
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-1.5 shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="font-semibold">Total Assessments</span>
            <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {totalAssessments}
          </div>
          <p className="text-[11px] text-slate-500">Database record count</p>
        </motion.div>

        {/* Low Risk Count */}
        <motion.div 
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-1.5 shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="font-semibold">Low Risk</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {lowRiskCount}
          </div>
          <p className="text-[11px] text-slate-500">Low risk evaluations</p>
        </motion.div>

        {/* Moderate Risk Count */}
        <motion.div 
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-1.5 shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="font-semibold">Moderate Risk</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {moderateRiskCount}
          </div>
          <p className="text-[11px] text-slate-500">Moderate risk evaluations</p>
        </motion.div>

        {/* High Risk Count */}
        <motion.div 
          custom={3}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-1.5 shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="font-semibold">High Risk</span>
            <XCircle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {highRiskCount}
          </div>
          <p className="text-[11px] text-slate-500">High risk evaluations</p>
        </motion.div>

      </div>

      {/* Step 3: Recent Assessments Table Section */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-4 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Recent Assessments
          </h2>
          {history.length > 0 && (
            <button
              onClick={() => navigate('/history')}
              className="text-xs text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading records...</span>
          </div>
        ) : history.length === 0 ? (
          /* Empty State */
          <div className="py-12 text-center space-y-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
            <Inbox className="w-8 h-8 text-slate-400 mx-auto" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No patient assessments recorded yet
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Perform your first risk prediction to view saved records here.
              </p>
            </div>
            <button
              onClick={() => navigate('/prediction')}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md text-xs font-semibold transition-colors"
            >
              Start New Assessment
            </button>
          </div>
        ) : (
          /* Recent Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 font-semibold">
                  <th className="py-2.5 px-3">Patient ID</th>
                  <th className="py-2.5 px-3">Assessment Date</th>
                  <th className="py-2.5 px-3">Risk Level</th>
                  <th className="py-2.5 px-3">Probability</th>
                  <th className="py-2.5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-700 dark:text-slate-300">
                {history.slice(0, 6).map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-slate-100">
                      {item.patient_name || `Patient #${item.id || idx + 1}`}
                    </td>
                    <td className="py-2.5 px-3">{item.created_at || currentDate}</td>
                    <td className="py-2.5 px-3">
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
                    <td className="py-2.5 px-3 font-mono">
                      {item.probability ? `${(item.probability * 100).toFixed(1)}%` : 'N/A'}
                    </td>
                    <td className="py-2.5 px-3">
                      <button
                        onClick={() => navigate('/reports', { state: { result: item } })}
                        className="text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Report</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </motion.div>

    </div>
  );
};

export default Dashboard;
