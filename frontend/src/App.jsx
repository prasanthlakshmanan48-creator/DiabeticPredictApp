import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Prediction from './pages/Prediction';
import Reports from './pages/Reports';
import History from './pages/History';
import Analytics from './pages/Analytics';
import About from './pages/About';
import Settings from './pages/Settings';

import { useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 min-w-0 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/history" element={<History />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            borderRadius: '16px',
            background: '#1E293B',
            color: '#fff',
            fontSize: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
          }
        }} 
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<ProtectedLayout />} />
      </Routes>
    </>
  );
};

export default App;
