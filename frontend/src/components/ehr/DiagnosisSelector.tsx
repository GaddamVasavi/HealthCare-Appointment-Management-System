import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Badge } from '../common/Badge';
import { useDebounce } from '../../hooks/useDebounce';

interface DiagnosisCode {
  code: string;
  description: string;
}

// Mock ICD-10 database subset
const MOCK_CODES: DiagnosisCode[] = [
  { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' },
  { code: 'I10', description: 'Essential (primary) hypertension' },
  { code: 'J01.90', description: 'Acute sinusitis, unspecified' },
  { code: 'J20.9', description: 'Acute bronchitis, unspecified' },
  { code: 'M54.5', description: 'Low back pain' },
  { code: 'R05', description: 'Cough' },
];

interface DiagnosisSelectorProps {
  selectedCodes: string[];
  onChange: (codes: string[]) => void;
}

export const DiagnosisSelector: React.FC<DiagnosisSelectorProps> = ({ selectedCodes, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredCodes = MOCK_CODES.filter(item => 
    item.code.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
    item.description.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleSelect = (code: string) => {
    if (!selectedCodes.includes(code)) {
      onChange([...selectedCodes, code]);
    }
    setSearchTerm(''); // clear search after select
  };

  const handleRemove = (code: string) => {
    onChange(selectedCodes.filter(c => c !== code));
  };

  return (
    <div className="diagnosis-selector">
      <div style={{ position: 'relative' }}>
        <Input 
          label="Search Diagnosis (ICD-10)" 
          placeholder="Search by code or description..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        
        {debouncedSearch && (
          <ul style={{
            position: 'absolute', top: '100%', left: 0, right: 0, 
            backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', 
            borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-md)', 
            listStyle: 'none', padding: 0, margin: 0, zIndex: 10, maxHeight: '200px', overflowY: 'auto'
          }}>
            {filteredCodes.length > 0 ? filteredCodes.map(item => (
              <li 
                key={item.code} 
                onClick={() => handleSelect(item.code)}
                style={{ padding: '0.75rem 1rem', cursor: 'pointer', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1rem' }}
              >
                <span style={{ fontWeight: 600, color: 'var(--primary-color)', minWidth: '60px' }}>{item.code}</span>
                <span>{item.description}</span>
              </li>
            )) : (
              <li style={{ padding: '1rem', color: 'var(--text-secondary)' }}>No matches found.</li>
            )}
          </ul>
        )}
      </div>

      {selectedCodes.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Selected Diagnoses</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {selectedCodes.map(code => {
              const details = MOCK_CODES.find(c => c.code === code) || { description: 'Unknown code' };
              return (
                <div key={code} style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
                  padding: '0.25rem 0.5rem', backgroundColor: 'var(--background-color)', 
                  border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '0.875rem' 
                }}>
                  <strong style={{ color: 'var(--primary-color)' }}>{code}</strong>
                  <span>{details.description}</span>
                  <button 
                    type="button" 
                    onClick={() => handleRemove(code)}
                    style={{ background: 'none', border: 'none', color: 'var(--danger-color)', cursor: 'pointer', padding: '0 4px' }}
                  >&times;</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosisSelector;
