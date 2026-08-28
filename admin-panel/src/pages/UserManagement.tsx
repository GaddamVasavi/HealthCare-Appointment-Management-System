import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { userService } from '../services/user.service';
import { User } from '../types';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mock data for display
    setUsers([
      { id: '1', name: 'Admin User', email: 'admin@system.com', role: 'SUPER_ADMIN', status: 'ACTIVE', createdAt: '2024-01-01' },
      { id: '2', name: 'Support Staff', email: 'support@system.com', role: 'ADMIN', status: 'ACTIVE', createdAt: '2024-02-15' },
      { id: '3', name: 'John Doe', email: 'john@hospital.com', role: 'RECEPTIONIST', status: 'INACTIVE', createdAt: '2024-03-10' },
    ]);
  }, []);

  const columns = [
    { key: 'name' as keyof User, header: 'Name' },
    { key: 'email' as keyof User, header: 'Email' },
    { 
      key: 'role' as keyof User, 
      header: 'Role',
      render: (val: string) => <Badge type="info">{val.replace('_', ' ')}</Badge>
    },
    { 
      key: 'status' as keyof User, 
      header: 'Status',
      render: (val: string) => (
        <Badge type={val === 'ACTIVE' ? 'success' : 'danger'}>{val}</Badge>
      )
    },
    {
      key: 'id' as keyof User,
      header: 'Actions',
      render: (id: string, user: User) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="outline" size="sm">Edit</Button>
          <Button variant="danger" size="sm">Disable</Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>User Management</h2>
        <Button onClick={() => setIsModalOpen(true)}>+ Create User</Button>
      </div>

      <div className="card">
        <DataTable data={users} columns={columns} searchable />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New User">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input label="Full Name" placeholder="Enter name" required />
          <Input label="Email Address" type="email" placeholder="Enter email" required />
          <div className="form-group">
            <label className="form-label">Role</label>
            <select className="form-control" required>
              <option value="">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="RECEPTIONIST">Receptionist</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Create User</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
