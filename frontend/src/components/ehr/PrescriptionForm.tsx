import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';

interface DrugEntry {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  refills: number;
}

interface PrescriptionFormProps {
  patientId: string;
  onSubmit: (drugs: Omit<DrugEntry, 'id'>[], pharmacyNotes: string) => void;
  onCancel: () => void;
}

export const PrescriptionForm: React.FC<PrescriptionFormProps> = ({ onSubmit, onCancel }) => {
  const [drugs, setDrugs] = useState<DrugEntry[]>([
    { id: '1', medicationName: '', dosage: '', frequency: '', duration: '', instructions: '', refills: 0 }
  ]);
  const [notes, setNotes] = useState('');

  const handleDrugChange = (id: string, field: keyof DrugEntry, value: string | number) => {
    setDrugs(prev => prev.map(drug => drug.id === id ? { ...drug, [field]: value } : drug));
  };

  const addDrug = () => {
    setDrugs(prev => [
      ...prev, 
      { id: Date.now().toString(), medicationName: '', dosage: '', frequency: '', duration: '', instructions: '', refills: 0 }
    ]);
  };

  const removeDrug = (id: string) => {
    setDrugs(prev => prev.filter(d => d.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedDrugs = drugs.map(({ id, ...rest }) => rest);
    onSubmit(cleanedDrugs, notes);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Medications</h3>
        <Button type="button" variant="secondary" size="sm" onClick={addDrug}>+ Add Medication</Button>
      </div>

      {drugs.map((drug, index) => (
        <div key={drug.id} style={{ 
          padding: '1.5rem', backgroundColor: 'var(--background-color)', 
          borderRadius: '8px', border: '1px solid var(--border-color)', position: 'relative' 
        }}>
          {drugs.length > 1 && (
            <button 
              type="button" 
              onClick={() => removeDrug(drug.id)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--danger-color)', cursor: 'pointer', fontSize: '1.25rem' }}
            >
              &times;
            </button>
          )}
          
          <h4 style={{ marginTop: 0, marginBottom: '1rem' }}>Medication #{index + 1}</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
            <Input 
              label="Medication Name" 
              placeholder="e.g. Amoxicillin" 
              value={drug.medicationName} 
              onChange={e => handleDrugChange(drug.id, 'medicationName', e.target.value)} 
              required 
            />
            <Input 
              label="Dosage" 
              placeholder="e.g. 500mg" 
              value={drug.dosage} 
              onChange={e => handleDrugChange(drug.id, 'dosage', e.target.value)} 
              required 
            />
            <Input 
              label="Duration" 
              placeholder="e.g. 7 days" 
              value={drug.duration} 
              onChange={e => handleDrugChange(drug.id, 'duration', e.target.value)} 
              required 
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
            <Select 
              label="Frequency"
              options={[
                { value: 'qd', label: 'Once a day (qd)' },
                { value: 'bid', label: 'Twice a day (bid)' },
                { value: 'tid', label: 'Three times a day (tid)' },
                { value: 'qid', label: 'Four times a day (qid)' },
                { value: 'prn', label: 'As needed (prn)' }
              ]}
              value={drug.frequency}
              onChange={val => handleDrugChange(drug.id, 'frequency', val)}
            />
            <Input 
              label="Refills" 
              type="number" 
              min="0" 
              value={drug.refills} 
              onChange={e => handleDrugChange(drug.id, 'refills', parseInt(e.target.value) || 0)} 
            />
          </div>
          
          <div style={{ marginTop: '0.5rem' }}>
            <Input 
              label="Patient Instructions" 
              placeholder="e.g. Take with food" 
              value={drug.instructions} 
              onChange={e => handleDrugChange(drug.id, 'instructions', e.target.value)} 
            />
          </div>
        </div>
      ))}

      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Notes to Pharmacy (Optional)</label>
        <textarea 
          rows={3}
          value={notes}
          onChange={e => setNotes(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontFamily: 'inherit', resize: 'vertical' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">Authorize & Submit</Button>
      </div>
    </form>
  );
};

export default PrescriptionForm;
