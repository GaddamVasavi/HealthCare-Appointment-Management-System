import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Select } from '../components/common/Select';
import { Appointment } from '../types';

export const AppointmentManagement: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    setAppointments([
      { id: '1', patientId: 'p1', doctorId: 'd1', date: '2024-10-25', time: '10:00 AM', status: 'CONFIRMED' },
      { id: '2', patientId: 'p2', doctorId: 'd2', date: '2024-10-25', time: '11:30 AM', status: 'PENDING' },
      { id: '3', patientId: 'p3', doctorId: 'd1', date: '2024-10-26', time: '09:00 AM', status: 'CANCELLED' },
      { id: '4', patientId: 'p4', doctorId: 'd3', date: '2024-10-26', time: '02:00 PM', status: 'COMPLETED' },
    ]);
  }, []);

  const filteredAppointments = appointments.filter(app => 
    statusFilter ? app.status === statusFilter : true
  );

  const columns = [
    { key: 'patientId' as keyof Appointment, header: 'Patient ID' },
    { key: 'doctorId' as keyof Appointment, header: 'Doctor ID' },
    { key: 'date' as keyof Appointment, header: 'Date' },
    { key: 'time' as keyof Appointment, header: 'Time' },
    { 
      key: 'status' as keyof Appointment, 
      header: 'Status',
      render: (val: string) => {
        let type: any = 'default';
        if (val === 'CONFIRMED') type = 'success';
        if (val === 'PENDING') type = 'warning';
        if (val === 'CANCELLED') type = 'danger';
        if (val === 'COMPLETED') type = 'info';
        return <Badge type={type}>{val}</Badge>;
      }
    },
    {
      key: 'id' as keyof Appointment,
      header: 'Actions',
      render: (id: string) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="outline" size="sm">Reschedule</Button>
          <Button variant="danger" size="sm">Cancel</Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Appointment Oversight</h2>
        <div style={{ width: '200px' }}>
          <Select 
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'PENDING', label: 'Pending' },
              { value: 'CONFIRMED', label: 'Confirmed' },
              { value: 'COMPLETED', label: 'Completed' },
              { value: 'CANCELLED', label: 'Cancelled' },
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        <DataTable data={filteredAppointments} columns={columns} searchable />
      </div>
    </div>
  );
};
