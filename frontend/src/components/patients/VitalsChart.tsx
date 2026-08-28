import React from 'react';

interface Point {
  x: number;
  y: number;
  value: number;
  label: string;
}

interface VitalsChartProps {
  data: { date: string; systolic: number; diastolic: number; heartRate: number }[];
  width?: number;
  height?: number;
}

export const VitalsChart: React.FC<VitalsChartProps> = ({ data, width = 600, height = 300 }) => {
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Find min and max for Y axis scaling (buffer of 10)
  const allValues = data.flatMap(d => [d.systolic, d.diastolic, d.heartRate]);
  const minY = Math.max(0, Math.min(...allValues) - 10);
  const maxY = Math.max(...allValues) + 10;
  
  const getX = (index: number) => padding + (index * (chartWidth / Math.max(data.length - 1, 1)));
  const getY = (val: number) => padding + chartHeight - ((val - minY) / (maxY - minY)) * chartHeight;

  const pointsSystolic = data.map((d, i) => `${getX(i)},${getY(d.systolic)}`).join(' ');
  const pointsDiastolic = data.map((d, i) => `${getX(i)},${getY(d.diastolic)}`).join(' ');
  const pointsHR = data.map((d, i) => `${getX(i)},${getY(d.heartRate)}`).join(' ');

  // Y-axis ticks
  const yTicks = [minY, Math.round((minY + maxY) / 2), maxY];

  return (
    <div style={{ width: '100%', overflowX: 'auto', backgroundColor: 'var(--surface-color)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
      <h3 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>Vital Signs Trend</h3>
      <svg width={width} height={height} style={{ display: 'block', margin: '0 auto' }}>
        {/* Grid lines & Y Axis */}
        {yTicks.map(tick => (
          <g key={`y-${tick}`}>
            <text x={padding - 10} y={getY(tick) + 4} fontSize="10" textAnchor="end" fill="var(--text-secondary)">{tick}</text>
            <line x1={padding} y1={getY(tick)} x2={width - padding} y2={getY(tick)} stroke="var(--border-color)" strokeDasharray="4 4" />
          </g>
        ))}

        {/* X Axis */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="var(--border-color)" strokeWidth="2" />
        {data.map((d, i) => (
          <text key={`x-${i}`} x={getX(i)} y={height - padding + 20} fontSize="10" textAnchor="middle" fill="var(--text-secondary)">
            {new Date(d.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </text>
        ))}

        {/* Plot Lines */}
        <polyline points={pointsSystolic} fill="none" stroke="#ef4444" strokeWidth="3" />
        <polyline points={pointsDiastolic} fill="none" stroke="#3b82f6" strokeWidth="3" />
        <polyline points={pointsHR} fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="5 5" />

        {/* Plot Points */}
        {data.map((d, i) => (
          <g key={`points-${i}`}>
            <circle cx={getX(i)} cy={getY(d.systolic)} r="4" fill="#ef4444" />
            <circle cx={getX(i)} cy={getY(d.diastolic)} r="4" fill="#3b82f6" />
            <circle cx={getX(i)} cy={getY(d.heartRate)} r="3" fill="#10b981" />
          </g>
        ))}

        {/* Legend */}
        <g transform={`translate(${padding}, 10)`}>
          <line x1="0" y1="0" x2="20" y2="0" stroke="#ef4444" strokeWidth="3" />
          <text x="25" y="4" fontSize="10" fill="var(--text-primary)">Systolic BP</text>
          
          <line x1="100" y1="0" x2="120" y2="0" stroke="#3b82f6" strokeWidth="3" />
          <text x="125" y="4" fontSize="10" fill="var(--text-primary)">Diastolic BP</text>
          
          <line x1="210" y1="0" x2="230" y2="0" stroke="#10b981" strokeWidth="2" strokeDasharray="5 5" />
          <text x="235" y="4" fontSize="10" fill="var(--text-primary)">Heart Rate</text>
        </g>
      </svg>
    </div>
  );
};

export default VitalsChart;
