import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Stethoscope, 
  FileText, 
  History, 
  BarChart3, 
  Info, 
  Settings, 
  LogOut,
  Sparkles,
  Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Prediction', path: '/prediction', icon: Stethoscope, badge: 'AI Model' },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'History', path: '/history', icon: History },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 flex-shrink-0 hidden md:block">
      <div className="sticky top-20 p-4 space-y-6">
        {/* Navigation Section Card */}
        <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border border-slate-200/80 dark:border-dark-border rounded-2xl p-3.5 shadow-glass dark:shadow-glass-dark">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Clinical Modules
          </div>
          
          <nav className="space-y-1.5 mt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-glow-primary'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-primary-600 dark:hover:text-primary-400'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[9px] font-semibold bg-secondary-500/20 text-secondary-600 dark:text-secondary-400 rounded-full border border-secondary-500/30 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Quick Assistant Promo Banner */}
        <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl p-4 text-white shadow-glow-primary relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <h4 className="font-bold text-xs">AI Assistant Mode</h4>
          </div>
          <p className="text-[11px] text-blue-100 leading-relaxed mb-3">
            Real-time multi-variable diabetes risk scoring powered by Scikit-Learn.
          </p>
          <button
            onClick={() => navigate('/prediction')}
            className="w-full py-1.5 px-3 bg-white text-primary-700 hover:bg-blue-50 rounded-xl text-[11px] font-bold transition-colors shadow-sm"
          >
            New Screening
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
