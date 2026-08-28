import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <input className={`form-control ${error ? 'is-invalid' : ''}`} {...props} />
      {error && <span className="error-message" style={{ color: 'red', fontSize: '0.875rem' }}>{error}</span>}
    </div>
  );
};
