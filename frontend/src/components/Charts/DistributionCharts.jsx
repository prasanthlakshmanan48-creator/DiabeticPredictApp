import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const DistributionCharts = () => {
  const [activeTab, setActiveTab] = useState('age');

  const ageData = [
    { range: '21-30', count: 320, color: '#0F6E56' },
    { range: '31-40', count: 230, color: '#0F6E56' },
    { range: '41-50', count: 145, color: '#0F6E56' },
    { range: '51-60', count: 75, color: '#0F6E56' },
    { range: '61+', count: 30, color: '#0F6E56' }
  ];

  const bmiData = [
    { range: '<18.5 (Under)', count: 25, color: '#0F6E56' },
    { range: '18.5-24.9 (Normal)', count: 215, color: '#3B6D11' },
    { range: '25-29.9 (Overweight)', count: 280, color: '#854F0B' },
    { range: '30-34.9 (Obese I)', count: 170, color: '#A32D2D' },
    { range: '35+ (Obese II)', count: 110, color: '#A32D2D' }
  ];

  const glucoseData = [
    { range: '<100 (Normal)', count: 310, color: '#3B6D11' },
    { range: '100-125 (Prediabetes)', count: 270, color: '#854F0B' },
    { range: '126-160 (Elevated)', count: 140, color: '#A32D2D' },
    { range: '160+ (High Diabetes)', count: 80, color: '#A32D2D' }
  ];

  const currentData = activeTab === 'age' ? ageData : activeTab === 'bmi' ? bmiData : glucoseData;

  return (
    <div className="space-y-4">
      {/* Tab Selectors */}
      <div className="flex items-center gap-2 p-1 bg-bg dark:bg-bg-dark border border-border dark:border-border-dark rounded-xl max-w-md">
        <button
          onClick={() => setActiveTab('age')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'age'
              ? 'bg-surface dark:bg-surface-dark text-accent dark:text-accent-dark shadow-subtle'
              : 'text-text-secondary dark:text-text-dark-secondary'
          }`}
        >
          Age Distribution
        </button>
        <button
          onClick={() => setActiveTab('bmi')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'bmi'
              ? 'bg-surface dark:bg-surface-dark text-accent dark:text-accent-dark shadow-subtle'
              : 'text-text-secondary dark:text-text-dark-secondary'
          }`}
        >
          BMI Distribution
        </button>
        <button
          onClick={() => setActiveTab('glucose')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'glucose'
              ? 'bg-surface dark:bg-surface-dark text-accent dark:text-accent-dark shadow-subtle'
              : 'text-text-secondary dark:text-text-dark-secondary'
          }`}
        >
          Glucose Histogram
        </button>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={currentData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="range" tick={{ fontSize: 11 }} stroke="#9B9994" />
            <YAxis tick={{ fontSize: 11 }} stroke="#9B9994" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#181B1F',
                borderRadius: '12px',
                border: '1px solid #26292E',
                color: '#F2F1EF',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
              {currentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistributionCharts;

