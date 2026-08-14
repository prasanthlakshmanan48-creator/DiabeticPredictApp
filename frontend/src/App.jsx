import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Prediction from './pages/Prediction';
import Reports from './pages/Reports';
import History from './pages/History';
import Analytics from './pages/Analytics';
import About from './pages/About';
import Settings from './pages/Settings';
import Login from './pages/Login';

import { Toaster } from 'react-hot-toast';

const PageWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full min-h-[calc(100vh-140px)] flex flex-col justify-between"
    >
      {children}
    </motion.div>
  );
};

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-6 min-w-0 overflow-y-auto flex flex-col">
          <PageWrapper>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/history" element={<History />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </PageWrapper>
        </main>
      </div>
      <Footer />
    </div>
  );
};

const RootNavigator = () => {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
};

const App = () => {
  return (
    <>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: '#1E293B',
            color: '#fff',
            fontSize: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }
        }} 
      />
      <Routes>
        {/* Unauthenticated standalone full-page login screen */}
        <Route path="/login" element={<Login />} />

        {/* Protected application layout & internal routes */}
        <Route 
          path="/*" 
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          } 
        />

        {/* Root redirect */}
        <Route path="/" element={<RootNavigator />} />
      </Routes>
    </>
  );
};

export default App;
