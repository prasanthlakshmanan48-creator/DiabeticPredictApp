import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const OutcomeBarChart = ({ diabeticCount = 285, nonDiabeticCount = 515 }) => {
  const data = [
    { name: 'Non-Diabetic (0)', count: nonDiabeticCount, color: '#10B981' },
    { name: 'Diabetic (1)', count: diabeticCount, color: '#EF4444' }
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94A3B8" />
          <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.9)', 
              borderRadius: '12px', 
              border: 'none', 
              color: '#fff',
              fontSize: '12px'
            }} 
          />
          <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={50}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OutcomeBarChart;
