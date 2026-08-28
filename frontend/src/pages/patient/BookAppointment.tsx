import React from 'react';
import BookingWizard from '../../components/appointments/BookingWizard';

const BookAppointment: React.FC = () => {
  return (
    <div className="page-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Book an Appointment</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Follow the steps below to schedule a new consultation with one of our specialists.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <BookingWizard />
      </div>
      
      <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>ℹ️</span> Important Information
        </h3>
        <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', margin: 0, lineHeight: 1.6 }}>
          <li>Please arrive 15 minutes before your scheduled appointment time.</li>
          <li>Bring any relevant past medical records or test results.</li>
          <li>Cancellations should be made at least 24 hours in advance to avoid a fee.</li>
          <li>In case of emergency, please call 911 or visit the nearest ER immediately.</li>
        </ul>
      </div>
    </div>
  );
};

export default BookAppointment;
