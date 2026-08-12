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
  Sparkles,
  Home,
  ShieldCheck
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Prediction', path: '/prediction', icon: Stethoscope, badge: 'ML Model' },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'History', path: '/history', icon: History },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 flex-shrink-0 hidden md:block">
      <div className="sticky top-20 p-4 space-y-5">
        {/* Navigation Section Card */}
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-3 shadow-subtle">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-text-secondary dark:text-text-dark-secondary flex items-center justify-between">
            <span>Clinical Modules</span>
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          
          <nav className="space-y-1 mt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all duration-150 relative ${
                      isActive
                        ? 'bg-accent-bg text-accent dark:bg-accent/15 dark:text-accent-dark font-bold'
                        : 'text-text-secondary dark:text-text-dark-secondary hover:bg-bg dark:hover:bg-white/5 hover:text-text dark:hover:text-text-dark'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-accent dark:text-accent-dark' : 'text-text-secondary dark:text-text-dark-secondary'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md ${
                          isActive 
                            ? 'bg-accent text-white dark:bg-accent-dark dark:text-bg-dark'
                            : 'bg-bg text-text-secondary dark:bg-white/10 dark:text-text-dark-secondary'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>

              );
            })}
          </nav>
        </div>

        {/* Executive Clinical Assistant Card */}
        <div className="bg-surface dark:bg-surface-dark rounded-2xl p-4 border border-border dark:border-border-dark shadow-subtle relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h4 className="font-bold text-xs text-text dark:text-text-dark">Diagnostic Suite</h4>
          </div>
          <p className="text-[11px] text-text-secondary dark:text-text-dark-secondary leading-relaxed mb-3">
            Realtime 8-biometric clinical risk evaluation engine.
          </p>
          <button
            onClick={() => navigate('/prediction')}
            className="w-full py-2 px-3 bg-accent hover:opacity-95 text-white dark:bg-accent-dark dark:text-bg-dark rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>New Patient Screening</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;


