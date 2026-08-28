import React, { useState } from 'react';
import Card from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface MedicalRecord {
  id: string;
  date: string;
  doctorId: string;
  doctorName: string;
  diagnosis: string[];
  symptoms: string[];
  treatmentPlan: string;
  notes: string;
  attachments?: { id: string; name: string; url: string }[];
}

interface MedicalRecordViewProps {
  record: MedicalRecord;
  onEdit?: (id: string) => void;
  onPrint?: (id: string) => void;
}

export const MedicalRecordView: React.FC<MedicalRecordViewProps> = ({ record, onEdit, onPrint }) => {
  return (
    <div className="medical-record-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>Encounter on {new Date(record.date).toLocaleDateString()}</h2>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)' }}>Attending Provider: Dr. {record.doctorName}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {onPrint && <Button variant="secondary" onClick={() => onPrint(record.id)}>🖨️ Print</Button>}
          {onEdit && <Button variant="primary" onClick={() => onEdit(record.id)}>✏️ Edit Record</Button>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <Card title="Chief Complaint & Symptoms" variant="outlined">
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-primary)' }}>
            {record.symptoms.map((symptom, idx) => (
              <li key={idx} style={{ marginBottom: '0.25rem' }}>{symptom}</li>
            ))}
          </ul>
        </Card>

        <Card title="Diagnoses (ICD-10)" variant="outlined">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {record.diagnosis.map((diag, idx) => (
              <Badge key={idx} variant="info">{diag}</Badge>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Clinical Notes" variant="outlined" style={{ marginBottom: '1.5rem' }}>
        <p style={{ margin: 0, color: 'var(--text-primary)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
          {record.notes}
        </p>
      </Card>

      <Card title="Treatment Plan" variant="outlined" style={{ marginBottom: '1.5rem' }}>
        <p style={{ margin: 0, color: 'var(--text-primary)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
          {record.treatmentPlan}
        </p>
      </Card>

      {record.attachments && record.attachments.length > 0 && (
        <Card title="Attachments & Documents" variant="outlined">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {record.attachments.map(doc => (
              <div key={doc.id} style={{ 
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', 
                backgroundColor: 'var(--background-color)', borderRadius: '6px', border: '1px solid var(--border-color)' 
              }}>
                <span style={{ fontSize: '1.25rem' }}>📄</span>
                <a href={doc.url} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 500 }}>
                  {doc.name}
                </a>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default MedicalRecordView;
