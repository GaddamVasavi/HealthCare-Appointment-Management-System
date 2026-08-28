import React from 'react';
import { useAuth } from '../../context/AuthContext';

const PatientDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-4">
        <h1>Patient Dashboard</h1>
        <button 
          onClick={logout}
          style={{ padding: '8px 16px', background: 'var(--danger-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>

      <div style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', marginBottom: '24px' }}>
        <h2>Welcome back, {user?.firstName}!</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Here is an overview of your health profile and upcoming appointments.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Mock Data Cards */}
        <div style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h3>Upcoming Appointments</h3>
          <div style={{ marginTop: '16px', padding: '16px', background: 'var(--background-color)', borderRadius: '6px' }}>
            <p style={{ fontWeight: 600 }}>Dr. Sarah Jenkins (Cardiologist)</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '4px' }}>Oct 24, 2023 • 10:00 AM</p>
          </div>
        </div>

        <div style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h3>Recent Prescriptions</h3>
          <ul style={{ listStyle: 'none', marginTop: '16px' }}>
            <li style={{ padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ fontWeight: 500 }}>Amoxicillin 500mg</span> - Take 1 pill twice daily
            </li>
            <li style={{ padding: '12px 0' }}>
              <span style={{ fontWeight: 500 }}>Lisinopril 10mg</span> - Take 1 pill daily
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
