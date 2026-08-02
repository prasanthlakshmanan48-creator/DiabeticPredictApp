import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ScatterPlotChart = () => {
  // Synthesize illustrative scatter plot data points of Glucose vs BMI
  const diabeticPoints = [
    { bmi: 34.2, glucose: 148, name: 'Diabetic Patient' },
    { bmi: 36.6, glucose: 162, name: 'Diabetic Patient' },
    { bmi: 31.0, glucose: 180, name: 'Diabetic Patient' },
    { bmi: 42.1, glucose: 155, name: 'Diabetic Patient' },
    { bmi: 28.5, glucose: 172, name: 'Diabetic Patient' },
    { bmi: 38.0, glucose: 195, name: 'Diabetic Patient' },
    { bmi: 35.8, glucose: 130, name: 'Diabetic Patient' },
    { bmi: 45.2, glucose: 168, name: 'Diabetic Patient' },
    { bmi: 39.4, glucose: 185, name: 'Diabetic Patient' },
  ];

  const nonDiabeticPoints = [
    { bmi: 22.5, glucose: 95, name: 'Non-Diabetic Patient' },
    { bmi: 24.1, glucose: 105, name: 'Non-Diabetic Patient' },
    { bmi: 21.8, glucose: 88, name: 'Non-Diabetic Patient' },
    { bmi: 26.3, glucose: 112, name: 'Non-Diabetic Patient' },
    { bmi: 28.0, glucose: 99, name: 'Non-Diabetic Patient' },
    { bmi: 25.4, glucose: 115, name: 'Non-Diabetic Patient' },
    { bmi: 23.9, glucose: 102, name: 'Non-Diabetic Patient' },
    { bmi: 27.1, glucose: 92, name: 'Non-Diabetic Patient' },
    { bmi: 20.4, glucose: 85, name: 'Non-Diabetic Patient' },
  ];

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
          <XAxis type="number" dataKey="bmi" name="BMI (kg/m²)" unit=" kg/m²" stroke="#94A3B8" tick={{ fontSize: 11 }} />
          <YAxis type="number" dataKey="glucose" name="Glucose (mg/dL)" unit=" mg/dL" stroke="#94A3B8" tick={{ fontSize: 11 }} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              borderRadius: '12px',
              border: 'none',
              color: '#fff',
              fontSize: '12px'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Scatter name="Non-Diabetic" data={nonDiabeticPoints} fill="#10B981" shape="circle" />
          <Scatter name="Diabetic" data={diabeticPoints} fill="#EF4444" shape="triangle" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterPlotChart;
