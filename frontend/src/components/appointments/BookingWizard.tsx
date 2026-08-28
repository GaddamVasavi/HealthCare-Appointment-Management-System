import React, { useState } from 'react';
import Card from '../common/Card';
import { Button } from '../common/Button';
import Input from '../common/Input';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  fee: number;
}

// Mock Doctors
const MOCK_DOCTORS: Doctor[] = [
  { id: '1', name: 'Dr. Sarah Jenkins', specialty: 'Cardiologist', fee: 150 },
  { id: '2', name: 'Dr. Mike Ross', specialty: 'General Physician', fee: 80 },
  { id: '3', name: 'Dr. Emily Chen', specialty: 'Dermatologist', fee: 120 }
];

// Mock Time Slots
const MOCK_SLOTS = ['09:00 AM', '09:30 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:30 PM'];

const BookingWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [reason, setReason] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleConfirm = () => {
    setIsBooking(true);
    setTimeout(() => {
      alert(`Appointment booked with ${selectedDoctor?.name} on ${selectedDate} at ${selectedSlot}`);
      setIsBooking(false);
      // reset or redirect
      window.location.href = '/patient/appointments';
    }, 1500);
  };

  return (
    <Card className="booking-wizard">
      <div style={{ display: 'flex', gap: '4px', marginBottom: '2rem' }}>
        {['Select Doctor', 'Pick Date/Time', 'Details', 'Confirm'].map((label, idx) => {
          const s = idx + 1;
          const isActive = s === step;
          const isDone = s < step;
          return (
            <div key={s} style={{ flex: 1 }}>
              <div style={{ height: '4px', borderRadius: '4px', backgroundColor: isDone || isActive ? 'var(--primary-color)' : 'var(--border-color)' }} />
              <p style={{ fontSize: '0.75rem', marginTop: '4px', color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)', fontWeight: isActive ? 600 : 400 }}>
                {label}
              </p>
            </div>
          );
        })}
      </div>

      {step === 1 && (
        <div>
          <h2>Select a Doctor</h2>
          <Input placeholder="Search by name or specialty..." leftIcon="🔍" />
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
            {MOCK_DOCTORS.map(doc => (
              <div 
                key={doc.id}
                onClick={() => setSelectedDoctor(doc)}
                style={{ 
                  padding: '1rem', border: `2px solid ${selectedDoctor?.id === doc.id ? 'var(--primary-color)' : 'var(--border-color)'}`, 
                  borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' 
                }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {doc.name.split(' ')[1][0]}
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>{doc.name}</h4>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{doc.specialty} • ${doc.fee}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <Button onClick={nextStep} disabled={!selectedDoctor}>Next: Date & Time</Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Select Date & Time</h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Select Date</label>
            <Input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
          </div>
          
          {selectedDate && (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Available Slots</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {MOCK_SLOTS.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    style={{
                      padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid var(--border-color)',
                      backgroundColor: selectedSlot === slot ? 'var(--primary-color)' : 'transparent',
                      color: selectedSlot === slot ? 'white' : 'inherit',
                      cursor: 'pointer'
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <Button variant="secondary" onClick={prevStep}>Back</Button>
            <Button onClick={nextStep} disabled={!selectedDate || !selectedSlot}>Next: Details</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Appointment Details</h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Reason for Visit</label>
            <textarea 
              rows={4}
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Please describe your symptoms or reason for visit..."
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <Button variant="secondary" onClick={prevStep}>Back</Button>
            <Button onClick={nextStep} disabled={!reason.trim()}>Review</Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2>Review & Confirm</h2>
          <div style={{ backgroundColor: 'var(--background-color)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Doctor</span>
              <span style={{ fontWeight: 600 }}>{selectedDoctor?.name} ({selectedDoctor?.specialty})</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Date & Time</span>
              <span style={{ fontWeight: 600 }}>{selectedDate} at {selectedSlot}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Consultation Fee</span>
              <span style={{ fontWeight: 600 }}>${selectedDoctor?.fee}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Reason for Visit</span>
              <p style={{ margin: 0, fontStyle: 'italic' }}>{reason}</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <Button variant="secondary" onClick={prevStep} disabled={isBooking}>Back</Button>
            <Button onClick={handleConfirm} isLoading={isBooking}>Confirm Booking</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default BookingWizard;
