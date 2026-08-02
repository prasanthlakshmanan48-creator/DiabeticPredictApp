import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const FeatureImportance = ({ features = [] }) => {
  const defaultFeatures = [
    { feature: "Glucose", importance: 0.312 },
    { feature: "BMI", importance: 0.224 },
    { feature: "Age", importance: 0.145 },
    { feature: "DiabetesPedigreeFunction", importance: 0.118 },
    { feature: "Insulin", importance: 0.076 },
    { feature: "Pregnancies", importance: 0.055 },
    { feature: "BloodPressure", importance: 0.042 },
    { feature: "SkinThickness", importance: 0.028 }
  ];

  const data = features.length > 0 ? features : defaultFeatures;
  const formattedData = data.map(item => ({
    ...item,
    importancePercentage: (item.importance * 100).toFixed(1)
  }));

  const colors = ['#2563EB', '#14B8A6', '#3B82F6', '#0D9488', '#60A5FA', '#2DD4BF', '#93C5FD', '#99F6E4'];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={formattedData}
          margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
        >
          <XAxis type="number" domain={[0, 40]} unit="%" stroke="#94A3B8" tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="feature" stroke="#94A3B8" tick={{ fontSize: 11 }} />
          <Tooltip
            formatter={(value) => [`${value}%`, 'Importance Weight']}
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              borderRadius: '12px',
              border: 'none',
              color: '#fff',
              fontSize: '12px'
            }}
          />
          <Bar dataKey="importancePercentage" radius={[0, 8, 8, 0]} barSize={18}>
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureImportance;
