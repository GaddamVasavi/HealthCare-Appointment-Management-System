import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, NavLink, Outlet } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import './App.css';

import { AdminSidebar } from './components/common/AdminSidebar';
import { AdminHeader } from './components/common/AdminHeader';



const AdminLayout = () => {
  const { isAuthenticated } = useAuthContext();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Pages
const LoginPage = () => {
  const { login } = useAuthContext();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('fake-token', { name: 'Admin', role: 'SUPER_ADMIN' });
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-control" type="email" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-control" type="password" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    </div>
  );
};

import { AdminDashboard } from './pages/AdminDashboard';
import { UserManagement } from './pages/UserManagement';
import { DoctorManagement } from './pages/DoctorManagement';
import { AppointmentManagement } from './pages/AppointmentManagement';
import { PatientManagement } from './pages/PatientManagement';
import { DepartmentManagement } from './pages/DepartmentManagement';
import { ReportsAnalytics } from './pages/ReportsAnalytics';
import { AuditLogs } from './pages/AuditLogs';
import { SystemSettings } from './pages/SystemSettings';

const DashboardPage = () => <AdminDashboard />;
const UsersPage = () => <UserManagement />;
const DoctorsPage = () => <DoctorManagement />;
const AppointmentsPage = () => <AppointmentManagement />;
const PatientsPage = () => <PatientManagement />;
const DepartmentsPage = () => <DepartmentManagement />;
const AnalyticsPage = () => <ReportsAnalytics />;
const AuditPage = () => <AuditLogs />;
const SettingsPage = () => <SystemSettings />;


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="doctors" element={<DoctorsPage />} />
            <Route path="patients" element={<PatientsPage />} />
            <Route path="departments" element={<DepartmentsPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="audit" element={<AuditPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
