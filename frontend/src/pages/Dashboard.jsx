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
    { name: 'Non-Diabetic', value: stats.non_diabetic_count || 515, color: '#3B6D11' },
    { name: 'Diabetic', value: stats.diabetic_count || 285, color: '#A32D2D' }
  ];

  const kpis = [
    { title: 'Total Evaluated Patients', value: stats.total_predictions, icon: Users },
    { title: 'Elevated Risk Cases', value: stats.diabetic_count, icon: UserX },
    { title: 'Normal Risk Cases', value: stats.non_diabetic_count, icon: UserCheck },
    { title: 'Mean Fasting Glucose', value: `${stats.avg_glucose} mg/dL`, icon: Activity },
    { title: 'Mean Body Mass Index', value: `${stats.avg_bmi} kg/m²`, icon: Scale },
    { title: 'Mean Cohort Age', value: `${stats.avg_age} yrs`, icon: Calendar }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text dark:text-text-dark">
            Clinical Executive Dashboard
          </h1>
          <p className="text-xs text-text-secondary dark:text-text-dark-secondary mt-1">
            Realtime epidemiological statistics, metric distributions, and risk trends.
          </p>
        </div>

        <button
          onClick={loadData}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark text-xs font-semibold text-text dark:text-text-dark hover:bg-bg dark:hover:bg-bg-dark transition-colors shadow-subtle self-start sm:self-auto"
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
              className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4 shadow-subtle"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-text-secondary dark:text-text-dark-secondary leading-tight">{kpi.title}</span>
                <div className="p-1.5 rounded-lg bg-accent-bg dark:bg-accent-bg-dark text-accent dark:text-accent-dark">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-xl font-extrabold text-text dark:text-text-dark mt-1 tracking-tight">
                {kpi.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 1 Charts: Bar Chart & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bar Chart: Outcome Count */}
        <div className="lg:col-span-7 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-text dark:text-text-dark">Outcome Count Breakdown</h3>
              <p className="text-[11px] text-text-secondary dark:text-text-dark-secondary">Total Classified Cases (Non-Diabetic vs Diabetic)</p>
            </div>
            <span className="px-2.5 py-1 text-[10px] font-bold bg-accent-bg text-accent dark:bg-accent-bg-dark dark:text-accent-dark rounded-md border border-accent/20 dark:border-accent-dark/20">
              PIMA Benchmark Sample
            </span>
          </div>
          <OutcomeBarChart diabeticCount={stats.diabetic_count} nonDiabeticCount={stats.non_diabetic_count} />
        </div>

        {/* Pie Chart: Diabetic Ratio */}
        <div className="lg:col-span-5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-subtle">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-bold text-sm text-text dark:text-text-dark">Diabetic Prevalence Ratio</h3>
              <p className="text-[11px] text-text-secondary dark:text-text-dark-secondary">Percentage distribution of positive vs negative cases</p>
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
                    backgroundColor: '#181B1F',
                    borderRadius: '12px',
                    border: '1px solid #26292E',
                    color: '#F2F1EF',
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
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-subtle">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-sm text-text dark:text-text-dark">Feature Distribution Histograms</h3>
            <p className="text-[11px] text-text-secondary dark:text-text-dark-secondary">Switch between Age, BMI, and Glucose parameter distributions</p>
          </div>
        </div>
        <DistributionCharts />
      </div>

      {/* Row 3 Charts: Scatter Plot & Line Chart Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scatter Plot: BMI vs Glucose */}
        <div className="lg:col-span-6 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-text dark:text-text-dark">Scatter Plot: BMI vs Glucose</h3>
              <p className="text-[11px] text-text-secondary dark:text-text-dark-secondary">Biometric correlation colored by diagnosis outcome</p>
            </div>
          </div>
          <ScatterPlotChart />
        </div>

        {/* Line Chart: Prediction Trends */}
        <div className="lg:col-span-6 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-text dark:text-text-dark">Weekly Prediction Volume Trends</h3>
              <p className="text-[11px] text-text-secondary dark:text-text-dark-secondary">Daily evaluation counts logged in SQLite database</p>
            </div>
          </div>
          <PredictionTrendChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


