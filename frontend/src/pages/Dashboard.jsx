import React, { useState, useEffect } from 'react';
import { getAnalyticsData } from '../services/api';
import OutcomeBarChart from '../components/Charts/OutcomeBarChart';
import DistributionCharts from '../components/Charts/DistributionCharts';
import ScatterPlotChart from '../components/Charts/ScatterPlotChart';
import PredictionTrendChart from '../components/Charts/PredictionTrendChart';
import { Users, UserX, UserCheck, Activity, Scale, Calendar, RefreshCw } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_predictions: 800,
    diabetic_count: 285,
    non_diabetic_count: 515,
    avg_bmi: 31.9,
    avg_glucose: 121.2,
    avg_age: 33.2
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAnalyticsData();
      if (data) {
        setStats(data);
      }
    } catch (err) {
      toast.error('Failed to load dynamic analytics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const pieData = [
    { name: 'Non-Diabetic', value: stats.non_diabetic_count || 515, color: '#10B981' },
    { name: 'Diabetic', value: stats.diabetic_count || 285, color: '#EF4444' }
  ];

  const kpis = [
    { title: 'Total Patients Tested', value: stats.total_predictions, icon: Users, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40' },
    { title: 'Diabetic Patients', value: stats.diabetic_count, icon: UserX, color: 'text-red-600 bg-red-50 dark:bg-red-950/40' },
    { title: 'Non-Diabetic Patients', value: stats.non_diabetic_count, icon: UserCheck, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' },
    { title: 'Average Glucose', value: `${stats.avg_glucose} mg/dL`, icon: Activity, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40' },
    { title: 'Average BMI', value: `${stats.avg_bmi} kg/m²`, icon: Scale, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' },
    { title: 'Average Patient Age', value: `${stats.avg_age} yrs`, icon: Calendar, color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/40' }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">
            Clinical Executive Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Realtime epidemiological statistics, metric distributions, and risk trends.
          </p>
        </div>

        <button
          onClick={loadData}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors shadow-sm self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.title}
              className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-4 shadow-glass dark:shadow-glass-dark"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight">{kpi.title}</span>
                <div className={`p-2 rounded-xl ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl font-extrabold text-slate-800 dark:text-white mt-1">
                {kpi.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 1 Charts: Bar Chart & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bar Chart: Outcome Count */}
        <div className="lg:col-span-7 bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">Outcome Count Breakdown</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Total Classified Cases (Non-Diabetic vs Diabetic)</p>
            </div>
            <span className="px-2.5 py-1 text-[10px] font-bold bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400 rounded-full border border-primary-200 dark:border-primary-800">
              PIMA Sample
            </span>
          </div>
          <OutcomeBarChart diabeticCount={stats.diabetic_count} nonDiabeticCount={stats.non_diabetic_count} />
        </div>

        {/* Pie Chart: Diabetic Ratio */}
        <div className="lg:col-span-5 bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">Diabetic Prevalence Ratio</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Percentage distribution of positive vs negative cases</p>
            </div>
          </div>
          <div className="w-full h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2 Charts: Histograms (Age, BMI, Glucose) */}
      <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">Feature Distribution Histograms</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Switch between Age, BMI, and Glucose parameter distributions</p>
          </div>
        </div>
        <DistributionCharts />
      </div>

      {/* Row 3 Charts: Scatter Plot & Line Chart Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scatter Plot: BMI vs Glucose */}
        <div className="lg:col-span-6 bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">Scatter Plot: BMI vs Glucose</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Biometric correlation colored by diagnosis outcome</p>
            </div>
          </div>
          <ScatterPlotChart />
        </div>

        {/* Line Chart: Prediction Trends */}
        <div className="lg:col-span-6 bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">Weekly Prediction Volume Trends</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Daily evaluation counts logged in SQLite database</p>
            </div>
          </div>
          <PredictionTrendChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
