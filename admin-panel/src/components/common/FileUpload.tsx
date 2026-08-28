import React, { useRef, useState } from 'react';
import { Button } from './Button';

interface FileUploadProps {
  label?: string;
  accept?: string;
  onUpload: (file: File) => void;
  maxSizeMB?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({ label = 'Upload File', accept, onUpload, maxSizeMB = 5 }) => {
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB`);
      return;
    }
    
    setFileName(file.name);
    onUpload(file);
  };

  return (
    <div className="form-group">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={() => fileInputRef.current?.click()}
        >
          {label}
        </Button>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {fileName || 'No file selected'}
        </span>
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept={accept} 
        onChange={handleFileChange} 
      />
      {error && <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.5rem' }}>{error}</div>}
    </div>
  );
};
