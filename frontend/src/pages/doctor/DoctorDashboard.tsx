import React from 'react';
import { useAuth } from '../../context/AuthContext';

const DoctorDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-4">
        <h1>Doctor Dashboard</h1>
        <button 
          onClick={logout}
          style={{ padding: '8px 16px', background: 'var(--danger-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>

      <div style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', marginBottom: '24px' }}>
        <h2>Good morning, Dr. {user?.lastName}!</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          You have 5 appointments scheduled for today.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h3>Today's Queue</h3>
          <div style={{ marginTop: '16px' }}>
            {[1, 2, 3].map((item) => (
              <div key={item} style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600 }}>Patient #{item}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{9 + item}:00 AM • General Checkup</p>
                </div>
                <span style={{ padding: '4px 8px', background: '#dcfce7', color: '#166534', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
