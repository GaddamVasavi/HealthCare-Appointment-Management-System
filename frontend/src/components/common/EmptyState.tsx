import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem',
      textAlign: 'center',
      backgroundColor: 'var(--surface-color)',
      borderRadius: 'var(--border-radius)',
      border: '1px dashed var(--border-color)'
    }}>
      {icon && (
        <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          {icon}
        </div>
      )}
      <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
        {title}
      </h3>
      {description && (
        <p style={{ margin: '0 0 1.5rem', color: 'var(--text-secondary)', maxWidth: '400px' }}>
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
};

export default EmptyState;
