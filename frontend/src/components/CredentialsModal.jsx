import React, { useState, useEffect } from 'react';
import { Search, X, Copy, Check, LogIn, Users, Shield, Stethoscope, UserCheck, Sparkles, Filter, FileSpreadsheet, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CredentialsModal = ({ isOpen, onClose, onSelectCredential }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    if (isOpen) {
      fetchCredentials();
    }
  }, [isOpen]);

  const fetchCredentials = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/presets/credentials`);
      if (res.data && res.data.presets) {
        setUsers(res.data.presets);
      }
    } catch (err) {
      console.error("Failed to fetch preset credentials:", err);
      toast.error("Could not load full live credentials list. Loading fallback dataset.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const categories = ['All', 'Clinician', 'Doctor', 'Specialist', 'Nurse / Educator', 'Researcher', 'Patient', 'Administrator', 'Dietitian'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      selectedCategory === 'All' || 
      user.badge === selectedCategory ||
      (selectedCategory === 'Dietitian' && user.role?.includes('Dietitian'));

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCopy = (user) => {
    const text = `Email: ${user.email}\nPassword: ${user.password}`;
    navigator.clipboard.writeText(text);
    setCopiedId(user.id || user.email);
    toast.success(`Copied credentials for ${user.fullname}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleQuickLogin = (user) => {
    onSelectCredential(user.email, user.password);
    toast.success(`Selected ${user.fullname} (${user.role})`);
    onClose();
  };

  const downloadCSV = () => {
    window.open(`${API_BASE}/presets/credentials`, '_blank');
    toast.success('Credentials reference catalog exported!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark w-full max-w-5xl h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-text dark:text-text-dark transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-border dark:border-border-dark flex items-center justify-between bg-bg/50 dark:bg-bg-dark/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark flex items-center justify-center border border-accent/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight">100+ User Credentials Directory</h2>
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-accent/10 text-accent dark:bg-accent-dark/20 dark:text-accent-dark border border-accent/20">
                  {users.length} Active Accounts
                </span>
              </div>
              <p className="text-xs text-text-secondary dark:text-text-dark-secondary mt-0.5">
                Select any individual credential to instant sign in or copy credentials to clipboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const csvData = "id,fullname,email,password,role,department,badge\n" + users.map(u => `"${u.id}","${u.fullname}","${u.email}","${u.password}","${u.role}","${u.department}","${u.badge}"`).join("\n");
                const blob = new Blob([csvData], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.setAttribute('href', url);
                a.setAttribute('download', 'user_credentials_100_individuals.csv');
                a.click();
                toast.success('Downloaded CSV spreadsheet!');
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-accent-bg text-accent dark:bg-accent-bg-dark dark:text-accent-dark border border-accent/20 hover:opacity-90 transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl hover:bg-border/20 text-text-secondary dark:text-text-dark-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-border dark:border-border-dark space-y-3 bg-surface dark:bg-surface-dark">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-text-secondary dark:text-text-dark-secondary" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search by name, email, department, role, or title..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-text dark:text-text-dark focus:ring-2 focus:ring-accent/20 outline-none"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-medium text-text-secondary dark:text-text-dark-secondary flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-accent text-white dark:bg-accent-dark dark:text-bg-dark shadow-sm'
                    : 'bg-bg dark:bg-bg-dark text-text-secondary dark:text-text-dark-secondary border border-border dark:border-border-dark hover:border-accent/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-3">
              <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-text-secondary">Loading 100+ credentials directory...</p>
            </div>
          ) : currentUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-2">
              <Users className="w-10 h-10 text-text-secondary opacity-40" />
              <p className="text-sm font-semibold">No matching credentials found</p>
              <p className="text-xs text-text-secondary">Try adjusting your search keywords or category filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentUsers.map((user) => {
                const isCopied = copiedId === (user.id || user.email);
                return (
                  <div
                    key={user.id || user.email}
                    className="p-4 rounded-2xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark hover:border-accent/50 dark:hover:border-accent-dark/50 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.fullname}`}
                            alt={user.fullname}
                            className="w-10 h-10 rounded-full object-cover border border-border dark:border-border-dark"
                            onError={(e) => {
                              e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${user.fullname}`;
                            }}
                          />
                          <div>
                            <h3 className="text-xs font-bold text-text dark:text-text-dark leading-tight group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
                              {user.fullname}
                            </h3>
                            <p className="text-[11px] text-text-secondary dark:text-text-dark-secondary font-medium">
                              {user.role}
                            </p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-accent-bg text-accent dark:bg-accent-bg-dark dark:text-accent-dark border border-accent/20 shrink-0">
                          {user.badge || 'User'}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-[11px] bg-surface/70 dark:bg-surface-dark/70 p-2.5 rounded-xl border border-border/50 dark:border-border-dark/50">
                        <div className="flex items-center justify-between text-text-secondary dark:text-text-dark-secondary">
                          <span>Dept:</span>
                          <span className="font-semibold text-text dark:text-text-dark truncate max-w-[170px]">{user.department}</span>
                        </div>
                        <div className="flex items-center justify-between text-text-secondary dark:text-text-dark-secondary">
                          <span>Email:</span>
                          <span className="font-mono text-text dark:text-text-dark truncate max-w-[170px]">{user.email}</span>
                        </div>
                        <div className="flex items-center justify-between text-text-secondary dark:text-text-dark-secondary">
                          <span>Password:</span>
                          <span className="font-mono font-bold text-accent dark:text-accent-dark">{user.password}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/60 dark:border-border-dark/60">
                      <button
                        onClick={() => handleQuickLogin(user)}
                        className="flex-1 py-2 px-3 bg-accent text-white dark:bg-accent-dark dark:text-bg-dark rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>1-Click Login</span>
                      </button>
                      <button
                        onClick={() => handleCopy(user)}
                        className="p-2 rounded-xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark hover:border-accent/40 text-text-secondary dark:text-text-dark-secondary transition-colors"
                        title="Copy Email & Password"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-accent dark:text-accent-dark" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Pagination */}
        <div className="p-4 border-t border-border dark:border-border-dark flex items-center justify-between bg-bg/50 dark:bg-bg-dark/50">
          <span className="text-xs text-text-secondary dark:text-text-dark-secondary font-medium">
            Showing {filteredUsers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} Users
          </span>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="p-2 rounded-xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark disabled:opacity-40 text-xs font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="p-2 rounded-xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark disabled:opacity-40 text-xs font-semibold"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CredentialsModal;
