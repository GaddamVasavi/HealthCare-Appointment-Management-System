import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Doctor } from '../types';

export const DoctorManagement: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  useEffect(() => {
    setDoctors([
      { id: '1', userId: 'u1', name: 'Dr. Gregory House', specialty: 'Diagnostic Medicine', departmentId: 'd1', verified: true, status: 'ACTIVE' },
      { id: '2', userId: 'u2', name: 'Dr. Allison Cameron', specialty: 'Immunology', departmentId: 'd1', verified: true, status: 'ACTIVE' },
      { id: '3', userId: 'u3', name: 'Dr. John Dorian', specialty: 'Internal Medicine', departmentId: 'd2', verified: false, status: 'INACTIVE' },
    ]);
  }, []);

  const handleVerify = (id: string) => {
    setSelectedDoc(id);
    setIsConfirmOpen(true);
  };

  const confirmVerify = () => {
    if (selectedDoc) {
      setDoctors(prev => prev.map(d => d.id === selectedDoc ? { ...d, verified: true, status: 'ACTIVE' } : d));
    }
    setIsConfirmOpen(false);
    setSelectedDoc(null);
  };

  const columns = [
    { key: 'name' as keyof Doctor, header: 'Name' },
    { key: 'specialty' as keyof Doctor, header: 'Specialty' },
    { 
      key: 'verified' as keyof Doctor, 
      header: 'Verification',
      render: (val: boolean) => (
        <Badge type={val ? 'success' : 'warning'}>{val ? 'VERIFIED' : 'PENDING'}</Badge>
      )
    },
    { 
      key: 'status' as keyof Doctor, 
      header: 'Status',
      render: (val: string) => (
        <Badge type={val === 'ACTIVE' ? 'success' : 'danger'}>{val}</Badge>
      )
    },
    {
      key: 'id' as keyof Doctor,
      header: 'Actions',
      render: (id: string, doc: Doctor) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {!doc.verified && (
            <Button variant="primary" size="sm" onClick={() => handleVerify(id)}>Verify</Button>
          )}
          <Button variant="outline" size="sm">Details</Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Doctor Management</h2>
        <Button>+ Onboard Doctor</Button>
      </div>

      <div className="card">
        <DataTable data={doctors} columns={columns} searchable />
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Verify Doctor Credentials"
        message="Are you sure you want to verify this doctor? This will grant them access to the platform and set their status to ACTIVE."
        confirmText="Verify Doctor"
        onConfirm={confirmVerify}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};
