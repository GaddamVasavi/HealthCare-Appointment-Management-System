import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import '../styles/Sidebar.css';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/patient/dashboard', icon: '📊', roles: [UserRole.PATIENT] },
  { label: 'My Appointments', path: '/patient/appointments', icon: '📅', roles: [UserRole.PATIENT] },
  { label: 'Medical Records', path: '/patient/records', icon: '📁', roles: [UserRole.PATIENT] },
  { label: 'Prescriptions', path: '/patient/prescriptions', icon: '💊', roles: [UserRole.PATIENT] },
  { label: 'Billing', path: '/patient/billing', icon: '💳', roles: [UserRole.PATIENT] },
  { label: 'Settings', path: '/patient/settings', icon: '⚙️', roles: [UserRole.PATIENT] },

  { label: 'Dashboard', path: '/doctor/dashboard', icon: '📊', roles: [UserRole.DOCTOR] },
  { label: 'Appointments', path: '/doctor/appointments', icon: '📅', roles: [UserRole.DOCTOR] },
  { label: 'Patients', path: '/doctor/patients', icon: '👥', roles: [UserRole.DOCTOR] },
  { label: 'Schedule', path: '/doctor/schedule', icon: '🕒', roles: [UserRole.DOCTOR] },
  { label: 'Settings', path: '/doctor/settings', icon: '⚙️', roles: [UserRole.DOCTOR] },
];

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const filteredNavItems = navItems.filter(item => item.roles.includes(user.role));

  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {filteredNavItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink 
                to={item.path} 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="help-box">
          <span className="help-icon">❓</span>
          <p>Need Help?</p>
          <a href="/support" className="help-link">Contact Support</a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
