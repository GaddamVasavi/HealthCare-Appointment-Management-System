import React, { useState } from 'react';
import { StatCard } from '../components/common/StatCard';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';

export const AdminDashboard: React.FC = () => {
  const recentAppointments = [
    { id: '1', patient: 'Alice Smith', doctor: 'Dr. Jones', date: '2024-10-20', status: 'CONFIRMED' },
    { id: '2', patient: 'Bob Brown', doctor: 'Dr. Lee', date: '2024-10-21', status: 'PENDING' },
    { id: '3', patient: 'Charlie Davis', doctor: 'Dr. Smith', date: '2024-10-21', status: 'COMPLETED' },
  ];

  const columns = [
    { key: 'patient' as keyof typeof recentAppointments[0], header: 'Patient' },
    { key: 'doctor' as keyof typeof recentAppointments[0], header: 'Doctor' },
    { key: 'date' as keyof typeof recentAppointments[0], header: 'Date' },
    { 
      key: 'status' as keyof typeof recentAppointments[0], 
      header: 'Status',
      render: (val: string) => {
        let type: any = 'default';
        if (val === 'CONFIRMED') type = 'success';
        if (val === 'PENDING') type = 'warning';
        if (val === 'COMPLETED') type = 'info';
        return <Badge type={type}>{val}</Badge>;
      }
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Dashboard Overview</h2>
        <div style={{ color: 'var(--text-secondary)' }}>
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      <div className="stat-grid">
        <StatCard title="Total Patients" value="1,245" icon="🤒" trend={5.2} />
        <StatCard title="Appointments Today" value="42" icon="📅" trend={-1.5} />
        <StatCard title="Active Doctors" value="38" icon="👨‍⚕️" trend={0} />
        <StatCard title="Monthly Revenue" value="$45,200" icon="💰" trend={12.4} trendLabel="vs last month" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Appointments</h3>
          <DataTable data={recentAppointments} columns={columns} />
        </div>
        
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>System Activity</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 500 }}>New Doctor Registration</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Dr. Emily White registered. Awaiting verification.</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>10 mins ago</div>
            </li>
            <li style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 500 }}>System Backup Completed</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Daily database backup successful.</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>2 hours ago</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
