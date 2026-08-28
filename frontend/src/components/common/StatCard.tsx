import React from 'react';
import Card from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  className = ''
}) => {
  return (
    <Card className={className} variant="default" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>
            {title}
          </p>
          <h3 style={{ margin: '0.5rem 0 0', fontSize: '1.75rem', color: 'var(--text-primary)' }}>
            {value}
          </h3>
          
          {trend && (
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ 
                color: trend.isPositive ? 'var(--success-color)' : 'var(--danger-color)',
                display: 'inline-flex', alignItems: 'center'
              }}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>vs last month</span>
            </p>
          )}
        </div>
        
        <div style={{
          width: '48px', height: '48px', 
          borderRadius: '12px', 
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          color: 'var(--primary-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem'
        }}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
