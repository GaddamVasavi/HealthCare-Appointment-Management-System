import React, { useState } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const AuditLogs: React.FC = () => {
  const [logs] = useState([
    { id: '1', timestamp: '2024-10-25 10:30:00', user: 'Admin User', action: 'CREATE_DOCTOR', resource: 'Doctor Profile', details: 'Created profile for Dr. Smith' },
    { id: '2', timestamp: '2024-10-25 11:15:22', user: 'System', action: 'BACKUP_DB', resource: 'Database', details: 'Automated daily backup completed' },
    { id: '3', timestamp: '2024-10-25 14:05:10', user: 'Support Staff', action: 'UPDATE_PATIENT', resource: 'Patient Record', details: 'Updated contact info for Alice Johnson' },
  ]);

  const columns = [
    { key: 'timestamp' as keyof typeof logs[0], header: 'Timestamp' },
    { key: 'user' as keyof typeof logs[0], header: 'User' },
    { 
      key: 'action' as keyof typeof logs[0], 
      header: 'Action',
      render: (val: string) => <Badge type="default">{val}</Badge>
    },
    { key: 'resource' as keyof typeof logs[0], header: 'Resource' },
    { key: 'details' as keyof typeof logs[0], header: 'Details' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>System Audit Logs</h2>
        <Button variant="outline">Export CSV</Button>
      </div>

      <div className="card">
        <DataTable data={logs} columns={columns} searchable />
      </div>
    </div>
  );
};
