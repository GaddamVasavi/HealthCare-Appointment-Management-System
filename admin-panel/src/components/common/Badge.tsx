import React from 'react';

interface BadgeProps {
  type?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ type = 'default', children }) => {
  return (
    <span className={`badge badge-${type}`}>
      {children}
    </span>
  );
};
