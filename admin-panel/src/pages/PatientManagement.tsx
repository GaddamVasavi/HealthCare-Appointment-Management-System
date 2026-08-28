import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Patient } from '../types';

export const PatientManagement: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    setPatients([
      { id: '1', name: 'Alice Smith', email: 'alice@example.com', phone: '555-0101', dob: '1985-04-12', bloodGroup: 'O+' },
      { id: '2', name: 'Bob Brown', email: 'bob@example.com', phone: '555-0202', dob: '1990-11-23', bloodGroup: 'A-' },
      { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', phone: '555-0303', dob: '1975-08-30', bloodGroup: 'B+' },
    ]);
  }, []);

  const columns = [
    { key: 'name' as keyof Patient, header: 'Name' },
    { key: 'email' as keyof Patient, header: 'Email' },
    { key: 'phone' as keyof Patient, header: 'Phone' },
    { 
      key: 'bloodGroup' as keyof Patient, 
      header: 'Blood Group',
      render: (val: string) => <Badge type="info">{val}</Badge>
    },
    {
      key: 'id' as keyof Patient,
      header: 'Actions',
      render: (id: string) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="outline" size="sm">View Records</Button>
          <Button variant="primary" size="sm">Edit</Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Patient Directory</h2>
        <Button>+ Register Patient</Button>
      </div>

      <div className="card">
        <DataTable data={patients} columns={columns} searchable />
      </div>
    </div>
  );
};
