import React from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  pill?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
  pill = false,
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'success':
        return { backgroundColor: '#dcfce7', color: '#166534' };
      case 'danger':
        return { backgroundColor: '#fee2e2', color: '#991b1b' };
      case 'warning':
        return { backgroundColor: '#fef3c7', color: '#92400e' };
      case 'info':
        return { backgroundColor: '#e0f2fe', color: '#075985' };
      case 'secondary':
        return { backgroundColor: '#f1f5f9', color: '#334155' };
      case 'primary':
      default:
        return { backgroundColor: '#dbeafe', color: '#1e40af' };
    }
  };

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.125rem 0.5rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    borderRadius: pill ? '9999px' : '4px',
    ...getVariantStyles(),
  };

  return (
    <span style={style} className={className}>
      {children}
    </span>
  );
};

export default Badge;
