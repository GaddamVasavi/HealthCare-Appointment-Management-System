import React from 'react';

interface PieChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
}

export const PieChart: React.FC<PieChartProps> = ({ data, size = 200 }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let currentAngle = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <svg width={size} height={size} viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
        {data.map((item, i) => {
          const sliceAngle = (item.value / total) * 360;
          const startAngle = currentAngle;
          const endAngle = startAngle + sliceAngle;
          
          currentAngle = endAngle;
          
          const x1 = Math.cos((startAngle * Math.PI) / 180);
          const y1 = Math.sin((startAngle * Math.PI) / 180);
          const x2 = Math.cos((endAngle * Math.PI) / 180);
          const y2 = Math.sin((endAngle * Math.PI) / 180);
          
          const largeArcFlag = sliceAngle > 180 ? 1 : 0;
          
          const pathData = [
            `M 0 0`,
            `L ${x1} ${y1}`,
            `A 1 1 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `Z`
          ].join(' ');

          return (
            <path key={i} d={pathData} fill={item.color} />
          );
        })}
      </svg>
      <div>
        {data.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: item.color, borderRadius: '50%' }}></div>
            <span style={{ fontSize: '0.875rem' }}>{item.label} ({Math.round((item.value / total) * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};
