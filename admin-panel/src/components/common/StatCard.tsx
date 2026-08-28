import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: number;
  trendLabel?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendLabel }) => {
  const isPositive = trend && trend > 0;
  
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="stat-card-title">{title}</div>
        {icon && <div style={{ fontSize: '1.5rem', opacity: 0.5 }}>{icon}</div>}
      </div>
      <div className="stat-card-value">{value}</div>
      {trend !== undefined && (
        <div style={{ marginTop: '1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ 
            color: isPositive ? 'var(--success-color)' : 'var(--danger-color)',
            fontWeight: 600,
            display: 'flex', alignItems: 'center'
          }}>
            {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span style={{ color: 'var(--text-secondary)' }}>{trendLabel || 'vs last month'}</span>
        </div>
      )}
    </div>
  );
};
