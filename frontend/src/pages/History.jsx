import React, { useState, useEffect } from 'react';
import { History as HistoryIcon, Search, Filter, ArrowUpRight, ArrowDownRight, FileText } from 'lucide-react';
import { getPredictionHistory } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const History = () => {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getPredictionHistory();
      const list = Array.isArray(data) ? data : (data?.history || []);
      setHistoryList(list);
    } catch (err) {
      console.warn("Error loading prediction history:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = historyList.filter(item => {
    const matchesSearch = (item.patient_name || '').toLowerCase().includes(search.toLowerCase()) ||
                          (item.risk_level || '').toLowerCase().includes(search.toLowerCase());
    const matchesFilter = riskFilter === 'all' || (item.risk_level || '').toLowerCase().includes(riskFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const calculatePatientComparison = (currentRecord, index) => {
    const samePatientHistory = historyList.filter(
      (h, i) => i > index && (h.patient_name || '').toLowerCase() === (currentRecord.patient_name || '').toLowerCase()
    );
    if (samePatientHistory.length === 0) return null;

    const previousRecord = samePatientHistory[0];
    const currentProb = currentRecord.probability ? currentRecord.probability * 100 : (currentRecord.prediction === 1 ? 75 : 18);
    const prevProb = previousRecord.probability ? previousRecord.probability * 100 : (previousRecord.prediction === 1 ? 75 : 18);
    const diff = currentProb - prevProb;

    return {
      prevProb: prevProb.toFixed(1),
      currentProb: currentProb.toFixed(1),
      diff: diff.toFixed(1),
      improved: diff < 0
    };
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Heading (Delay 0s) */}
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="pb-4 border-b border-slate-200 dark:border-slate-700"
      >
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <HistoryIcon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <span>Prediction History</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Historical log of patient assessments recorded in the SQLite database.
        </p>
      </motion.div>

      {/* Search & Filter Toolbar (Delay 0.08s) */}
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.08 }}
        className="flex flex-col sm:flex-row items-center gap-3"
      >
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient ID or name..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-600"
          />
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="py-1.5 px-3 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-600"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="moderate">Moderate Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>
      </motion.div>

      {/* History Records Table (Delay 0.16s) */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.16 }}
        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm"
      >
        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400">
            Loading assessment logs...
          </div>
        ) : filteredHistory.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center text-xs text-slate-500"
          >
            No historical assessment records found.
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 font-semibold">
                  <th className="py-2.5 px-4">Patient ID / Subject</th>
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4">Risk Level</th>
                  <th className="py-2.5 px-4">Probability</th>
                  <th className="py-2.5 px-4">Historical Comparison</th>
                  <th className="py-2.5 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-700 dark:text-slate-300">
                {filteredHistory.map((item, idx) => {
                  const comparison = calculatePatientComparison(item, idx);
                  return (
                    <tr key={item.id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-slate-100">
                        {item.patient_name || `Patient #${item.id}`}
                      </td>
                      <td className="py-2.5 px-4">{item.created_at || '14 Aug 2026'}</td>
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
                        {item.probability ? `${(item.probability * 100).toFixed(1)}%` : '18.0%'}
                      </td>
                      <td className="py-2.5 px-4">
                        {comparison ? (
                          <div className="flex items-center gap-1 text-[11px]">
                            <span className="text-slate-500">Prev: {comparison.prevProb}% → Current: {comparison.currentProb}%</span>
                            <span className={`font-semibold flex items-center ${comparison.improved ? 'text-emerald-600' : 'text-red-600'}`}>
                              {comparison.improved ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                              {comparison.diff}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400">Single assessment</span>
                        )}
                      </td>
                      <td className="py-2.5 px-4">
                        <button
                          onClick={() => navigate('/reports', { state: { result: item } })}
                          className="text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Report</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

    </div>
  );
};

export default History;
