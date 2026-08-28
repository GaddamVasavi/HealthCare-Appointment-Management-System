import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Department } from '../types';

export const DepartmentManagement: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setDepartments([
      { id: '1', name: 'Cardiology', description: 'Heart and blood vessel diseases', headDoctorId: 'd1', status: 'ACTIVE' },
      { id: '2', name: 'Neurology', description: 'Brain and nervous system', headDoctorId: 'd2', status: 'ACTIVE' },
      { id: '3', name: 'Pediatrics', description: 'Medical care of infants and children', status: 'INACTIVE' },
    ]);
  }, []);

  const columns = [
    { key: 'name' as keyof Department, header: 'Department Name' },
    { key: 'description' as keyof Department, header: 'Description' },
    { 
      key: 'status' as keyof Department, 
      header: 'Status',
      render: (val: string) => (
        <Badge type={val === 'ACTIVE' ? 'success' : 'danger'}>{val}</Badge>
      )
    },
    {
      key: 'id' as keyof Department,
      header: 'Actions',
      render: (id: string) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="outline" size="sm">Manage</Button>
          <Button variant="primary" size="sm">Edit</Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Department Management</h2>
        <Button onClick={() => setIsModalOpen(true)}>+ Add Department</Button>
      </div>

      <div className="card">
        <DataTable data={departments} columns={columns} searchable />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Department">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input label="Department Name" placeholder="e.g. Orthopedics" required />
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows={3} placeholder="Department description..."></textarea>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
