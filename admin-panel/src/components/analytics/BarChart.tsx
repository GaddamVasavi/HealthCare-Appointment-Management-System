import React from 'react';

interface BarChartProps {
  data: { label: string; value: number }[];
  color?: string;
}

export const BarChart: React.FC<BarChartProps> = ({ data, color = '#3b82f6' }) => {
  const maxVal = Math.max(...data.map(d => d.value));
  const height = 200;
  const width = '100%';

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', height, width, gap: '10px', paddingTop: '20px' }}>
      {data.map((item, idx) => {
        const barHeight = (item.value / maxVal) * 100;
        return (
          <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ 
              fontSize: '0.75rem', 
              color: 'var(--text-secondary)', 
              marginBottom: '4px' 
            }}>
              {item.value}
            </div>
            <div style={{ 
              width: '100%', 
              height: `${barHeight}%`, 
              backgroundColor: color,
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              transition: 'height 0.3s ease'
            }}></div>
            <div style={{ 
              fontSize: '0.75rem', 
              marginTop: '8px',
              color: 'var(--text-secondary)'
            }}>
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
