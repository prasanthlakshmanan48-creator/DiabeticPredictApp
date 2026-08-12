import React, { useState, useEffect } from 'react';
import { getPredictionHistory, deleteHistoryItem } from '../services/api';
import { History as HistoryIcon, Search, Trash2, Download, RefreshCw, FileText, ChevronLeft, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [outcomeFilter, setOutcomeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await getPredictionHistory(search, riskFilter, outcomeFilter);
      if (res && res.history) {
        setHistory(res.history);
      }
    } catch (err) {
      toast.error('Failed to fetch prediction history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [search, riskFilter, outcomeFilter]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete prediction record #${id}?`)) return;

    try {
      await deleteHistoryItem(id);
      toast.success(`Record #${id} deleted.`);
      fetchHistory();
    } catch (err) {
      toast.error('Failed to delete record.');
    }
  };

  const handleExportCSV = () => {
    if (history.length === 0) {
      toast.error('No history records available to export.');
      return;
    }

    const headers = ['ID', 'Patient Name', 'Outcome', 'Probability (%)', 'Risk Level', 'Glucose', 'BMI', 'Age', 'Timestamp'];
    const rows = history.map(item => [
      item.id,
      `"${item.patient_name}"`,
      item.outcome === 1 ? 'Diabetic' : 'Non-Diabetic',
      (item.probability * 100).toFixed(1),
      item.risk_level,
      item.glucose,
      item.bmi,
      item.age,
      `"${item.created_at || item.timestamp}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Diabetes_Predictions_History_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Exported history as CSV file!');
  };

  const totalPages = Math.ceil(history.length / itemsPerPage) || 1;
  const paginatedHistory = history.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text dark:text-text-dark flex items-center gap-2.5">
            <HistoryIcon className="w-7 h-7 text-accent dark:text-accent-dark" />
            <span>Patient Prediction Logs & History</span>
          </h1>
          <p className="text-xs text-text-secondary dark:text-text-dark-secondary mt-1">
            SQLite database archives with search, risk filters, record deletion, and CSV export.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white dark:bg-accent-dark dark:text-bg-dark font-bold text-xs transition-colors shadow-subtle self-start sm:self-auto"
        >
          <Download className="w-4 h-4" /> Export CSV File
        </button>
      </div>

      {/* Search & Filters Card */}
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4 shadow-subtle">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search bar */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-text-secondary dark:text-text-dark-secondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search by patient name or record ID..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-text dark:text-text-dark focus:ring-2 focus:ring-accent/20 outline-none"
            />
          </div>

          {/* Risk Tier Filter */}
          <div className="md:col-span-3">
            <select
              value={riskFilter}
              onChange={(e) => { setRiskFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 text-xs rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-text dark:text-text-dark outline-none"
            >
              <option value="">All Risk Tiers</option>
              <option value="Low Risk">Low Risk</option>
              <option value="Medium Risk">Medium Risk</option>
              <option value="High Risk">High Risk</option>
            </select>
          </div>

          {/* Outcome Filter */}
          <div className="md:col-span-3">
            <select
              value={outcomeFilter}
              onChange={(e) => { setOutcomeFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 text-xs rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-text dark:text-text-dark outline-none"
            >
              <option value="">All Outcomes</option>
              <option value="0">Non-Diabetic (0)</option>
              <option value="1">Diabetic (1)</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Table Card */}
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-bg dark:bg-bg-dark text-text dark:text-text-dark font-bold border-b border-border dark:border-border-dark">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Outcome</th>
                <th className="p-4">Risk %</th>
                <th className="p-4">Biometrics (Glu/BMI/Age)</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-border-dark text-text-secondary dark:text-text-dark-secondary">
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-text-secondary">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-accent" />
                    <span>Loading prediction history...</span>
                  </td>
                </tr>
              ) : paginatedHistory.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-text-secondary">
                    No prediction records found matching search criteria.
                  </td>
                </tr>
              ) : (
                paginatedHistory.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate('/reports', { state: { result: item } })}
                    className="hover:bg-bg dark:hover:bg-bg-dark transition-colors cursor-pointer"
                  >
                    <td className="p-4 font-mono font-bold text-text-secondary">#{item.id}</td>
                    <td className="p-4 font-bold text-text dark:text-text-dark">{item.patient_name}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold ${
                        item.outcome === 1
                          ? 'bg-[#FCEBEB] text-[#A32D2D] border border-[#A32D2D]/30'
                          : 'bg-[#EAF3DE] text-[#3B6D11] border border-[#3B6D11]/30'
                      }`}>
                        {item.outcome === 1 ? <XCircle className="w-3 h-3 text-[#A32D2D]" /> : <CheckCircle2 className="w-3 h-3 text-[#3B6D11]" />}
                        <span>{item.outcome === 1 ? 'Diabetic' : 'Non-Diabetic'}</span>
                      </span>
                    </td>
                    <td className="p-4 font-extrabold text-text dark:text-text-dark">{item.risk_percentage || (item.probability * 100).toFixed(1)}%</td>
                    <td className="p-4 text-text-secondary dark:text-text-dark-secondary">
                      {item.glucose} mg/dL | {item.bmi} kg/m² | {item.age} yrs
                    </td>
                    <td className="p-4 text-[11px] text-text-secondary dark:text-text-dark-secondary">{item.created_at || item.timestamp}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => navigate('/reports', { state: { result: item } })}
                          className="p-1.5 rounded-lg text-text-secondary hover:text-accent hover:bg-bg transition-colors"
                          title="View Report"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(item.id, e)}
                          className="p-1.5 rounded-lg text-text-secondary hover:text-[#A32D2D] hover:bg-[#FCEBEB] transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-border dark:border-border-dark flex items-center justify-between text-xs text-text-secondary dark:text-text-dark-secondary">
          <span>Showing Page {currentPage} of {totalPages} ({history.length} Total Records)</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-bg dark:bg-bg-dark hover:bg-border/30 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-bg dark:bg-bg-dark hover:bg-border/30 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;


