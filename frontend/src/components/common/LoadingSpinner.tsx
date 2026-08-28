import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  fullPage?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'var(--primary-color)',
  fullPage = false,
}) => {
  const sizeMap = {
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
  };

  const spinner = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg 
        style={{ width: sizeMap[size], height: sizeMap[size], animation: 'spin 1s linear infinite' }} 
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="4" fill="none" opacity="0.25" />
        <path fill={color} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );

  if (fullPage) {
    return (
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
        zIndex: 9999
      }}>
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
