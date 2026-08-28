import React, { forwardRef, InputHTMLAttributes } from 'react';
import '../styles/Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  const hasError = !!error;
  
  return (
    <div className={`input-container ${fullWidth ? 'full-width' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label} {props.required && <span className="input-required">*</span>}
        </label>
      )}
      
      <div className={`input-wrapper ${hasError ? 'input-error' : ''} ${props.disabled ? 'input-disabled' : ''}`}>
        {leftIcon && <span className="input-icon-left">{leftIcon}</span>}
        
        <input
          ref={ref}
          id={inputId}
          className={`input-field ${leftIcon ? 'with-left-icon' : ''} ${rightIcon ? 'with-right-icon' : ''}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        
        {rightIcon && <span className="input-icon-right">{rightIcon}</span>}
      </div>
      
      {hasError && <p id={`${inputId}-error`} className="input-error-message">{error}</p>}
      {!hasError && helperText && <p id={`${inputId}-helper`} className="input-helper-text">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
