import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const DistributionCharts = () => {
  const [activeTab, setActiveTab] = useState('age');

  const ageData = [
    { range: '21-30', count: 320, color: '#3B82F6' },
    { range: '31-40', count: 230, color: '#2563EB' },
    { range: '41-50', count: 145, color: '#1D4ED8' },
    { range: '51-60', count: 75, color: '#1E40AF' },
    { range: '61+', count: 30, color: '#1E3A8A' }
  ];

  const bmiData = [
    { range: '<18.5 (Under)', count: 25, color: '#38BDF8' },
    { range: '18.5-24.9 (Normal)', count: 215, color: '#10B981' },
    { range: '25-29.9 (Overweight)', count: 280, color: '#F59E0B' },
    { range: '30-34.9 (Obese I)', count: 170, color: '#F97316' },
    { range: '35+ (Obese II)', count: 110, color: '#EF4444' }
  ];

  const glucoseData = [
    { range: '<100 (Normal)', count: 310, color: '#10B981' },
    { range: '100-125 (Prediabetes)', count: 270, color: '#F59E0B' },
    { range: '126-160 (Elevated)', count: 140, color: '#F97316' },
    { range: '160+ (High Diabetes)', count: 80, color: '#EF4444' }
  ];

  const currentData = activeTab === 'age' ? ageData : activeTab === 'bmi' ? bmiData : glucoseData;

  return (
    <div className="space-y-4">
      {/* Tab Selectors */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-md">
        <button
          onClick={() => setActiveTab('age')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'age'
              ? 'bg-white dark:bg-dark-card text-primary-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Age Distribution
        </button>
        <button
          onClick={() => setActiveTab('bmi')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'bmi'
              ? 'bg-white dark:bg-dark-card text-primary-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          BMI Distribution
        </button>
        <button
          onClick={() => setActiveTab('glucose')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'glucose'
              ? 'bg-white dark:bg-dark-card text-primary-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Glucose Histogram
        </button>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={currentData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="range" tick={{ fontSize: 11 }} stroke="#94A3B8" />
            <YAxis tick={{ fontSize: 11 }} stroke="#94A3B8" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                borderRadius: '12px',
                border: 'none',
                color: '#fff',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="count" fill="#2563EB" radius={[8, 8, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistributionCharts;
