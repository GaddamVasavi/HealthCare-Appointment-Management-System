import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export const AdminSidebar: React.FC = () => {
  const { user } = useAuthContext();
  
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        HealthCare Admin
      </div>
      <nav className="admin-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">📊</span>
          <span className="text">Dashboard</span>
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">👥</span>
          <span className="text">Users</span>
        </NavLink>
        <NavLink to="/doctors" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">👨‍⚕️</span>
          <span className="text">Doctors</span>
        </NavLink>
        <NavLink to="/patients" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">🤒</span>
          <span className="text">Patients</span>
        </NavLink>
        <NavLink to="/departments" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">🏥</span>
          <span className="text">Departments</span>
        </NavLink>
        <NavLink to="/appointments" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">📅</span>
          <span className="text">Appointments</span>
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">📈</span>
          <span className="text">Analytics</span>
        </NavLink>
        <NavLink to="/audit" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">📋</span>
          <span className="text">Audit Logs</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">⚙️</span>
          <span className="text">Settings</span>
        </NavLink>
      </nav>
      <div style={{ position: 'absolute', bottom: '2rem', left: '1.5rem', color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: '0.875rem' }}>Logged in as:</div>
        <div style={{ fontWeight: 600 }}>{user?.name || 'Admin'}</div>
      </div>
    </aside>
  );
};
