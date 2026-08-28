import React, { useState, useRef, useEffect } from 'react';
import '../styles/Select.css';

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string | number | (string | number)[];
  onChange: (value: any) => void;
  placeholder?: string;
  multiSelect?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  label?: string;
  error?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  multiSelect = false,
  searchable = false,
  disabled = false,
  label,
  error,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string | number) => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
    setSearchTerm('');
  };

  const removeValue = (e: React.MouseEvent, optionValue: string | number) => {
    e.stopPropagation();
    if (multiSelect && Array.isArray(value)) {
      onChange(value.filter(v => v !== optionValue));
    }
  };

  const filteredOptions = searchable && searchTerm
    ? options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  const displayValue = () => {
    if (multiSelect && Array.isArray(value)) {
      if (value.length === 0) return <span className="select-placeholder">{placeholder}</span>;
      return (
        <div className="select-tags">
          {value.map(val => {
            const option = options.find(o => o.value === val);
            return option ? (
              <span key={val} className="select-tag">
                {option.label}
                <span className="select-tag-close" onClick={(e) => removeValue(e, val)}>&times;</span>
              </span>
            ) : null;
          })}
        </div>
      );
    }
    
    if (value !== undefined && value !== null && value !== '') {
      const option = options.find(o => o.value === value);
      return option ? option.label : <span className="select-placeholder">{placeholder}</span>;
    }
    
    return <span className="select-placeholder">{placeholder}</span>;
  };

  return (
    <div className={`select-container ${className}`} ref={containerRef}>
      {label && <label className="select-label">{label}</label>}
      <div 
        className={`select-trigger ${isOpen ? 'open' : ''} ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="select-value">{displayValue()}</div>
        <div className="select-arrow">&#9662;</div>
      </div>
      
      {isOpen && !disabled && (
        <div className="select-dropdown">
          {searchable && (
            <div className="select-search-wrapper">
              <input 
                type="text" 
                className="select-search" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search..."
                onClick={e => e.stopPropagation()}
                autoFocus
              />
            </div>
          )}
          <ul className="select-options">
            {filteredOptions.length === 0 ? (
              <li className="select-no-options">No options found</li>
            ) : (
              filteredOptions.map(option => {
                const isSelected = multiSelect 
                  ? Array.isArray(value) && value.includes(option.value)
                  : value === option.value;
                  
                return (
                  <li 
                    key={option.value} 
                    className={`select-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {multiSelect && (
                      <input type="checkbox" checked={isSelected} readOnly className="select-checkbox" />
                    )}
                    {option.label}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
      {error && <div className="select-error-msg">{error}</div>}
    </div>
  );
};

export default Select;
