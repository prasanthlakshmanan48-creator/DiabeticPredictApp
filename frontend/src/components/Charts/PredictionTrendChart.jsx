import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PredictionTrendChart = () => {
  const trendData = [
    { day: 'Mon', total: 42, diabetic: 14, nonDiabetic: 28 },
    { day: 'Tue', total: 58, diabetic: 19, nonDiabetic: 39 },
    { day: 'Wed', total: 65, diabetic: 22, nonDiabetic: 43 },
    { day: 'Thu', total: 51, diabetic: 18, nonDiabetic: 33 },
    { day: 'Fri', total: 74, diabetic: 25, nonDiabetic: 49 },
    { day: 'Sat', total: 89, diabetic: 31, nonDiabetic: 58 },
    { day: 'Sun', total: 95, diabetic: 34, nonDiabetic: 61 }
  ];

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
          <XAxis dataKey="day" stroke="#94A3B8" tick={{ fontSize: 12 }} />
          <YAxis stroke="#94A3B8" tick={{ fontSize: 12 }} />
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
          <Line type="monotone" dataKey="total" name="Total Predictions" stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="nonDiabetic" name="Non-Diabetic" stroke="#10B981" strokeWidth={2.5} />
          <Line type="monotone" dataKey="diabetic" name="Diabetic" stroke="#EF4444" strokeWidth={2.5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionTrendChart;
