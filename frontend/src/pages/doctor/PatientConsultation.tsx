import React, { useState } from 'react';
import { Tabs } from '../../components/common/Tabs';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

const PatientConsultation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ehr');
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  // Mock patient
  const patient = {
    name: 'John Doe', age: 42, gender: 'Male', blood: 'O+', height: "5'10\"", weight: '175 lbs'
  };

  return (
    <div className="page-container" style={{ padding: 0 }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {patient.name} <Badge variant="success">Ongoing Consultation</Badge>
            </h1>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)' }}>
              {patient.age} yrs • {patient.gender} • Blood: {patient.blood} • {patient.height} • {patient.weight}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button variant="secondary" onClick={() => setShowPrescriptionModal(true)}>+ Prescribe</Button>
            <Button variant="primary">End Consultation</Button>
          </div>
        </div>
      </div>

      <div style={{ padding: '2rem' }}>
        <Tabs 
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={[
            {
              id: 'ehr',
              label: 'Medical History',
              content: (
                <div style={{ marginTop: '1.5rem', backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <h3>Past Diagnoses</h3>
                  <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                    <li>Hypertension (2019)</li>
                    <li>Type 2 Diabetes (2021)</li>
                  </ul>
                  
                  <h3>Allergies</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                    <Badge variant="danger">Penicillin</Badge>
                    <Badge variant="warning">Peanuts</Badge>
                  </div>
                </div>
              )
            },
            {
              id: 'vitals',
              label: 'Vitals & Notes',
              content: (
                <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                  <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Today's Vitals</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}><span>BP</span><strong>120/80</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}><span>Heart Rate</span><strong>72 bpm</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}><span>Temperature</span><strong>98.6 °F</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>SpO2</span><strong>99%</strong></div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Consultation Notes</h3>
                    <textarea 
                      style={{ width: '100%', height: '300px', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', resize: 'none', fontFamily: 'inherit' }} 
                      placeholder="Enter clinical notes here..."
                    />
                  </div>
                </div>
              )
            }
          ]}
        />
      </div>

      <Modal 
        isOpen={showPrescriptionModal} 
        onClose={() => setShowPrescriptionModal(false)}
        title="Write Prescription"
        size="lg"
        footer={<><Button variant="secondary" onClick={() => setShowPrescriptionModal(false)}>Cancel</Button><Button variant="primary" onClick={() => setShowPrescriptionModal(false)}>Sign & Save</Button></>}
      >
        <p>Prescription form integration placeholder.</p>
      </Modal>
    </div>
  );
};

export default PatientConsultation;
