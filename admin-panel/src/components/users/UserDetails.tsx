import React, { useState } from 'react';
import { User } from '../../types';
import { Badge } from '../common/Badge';

export const UserDetails: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '0.375rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>{user.name}</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{user.email}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Badge type={user.status === 'ACTIVE' ? 'success' : 'danger'}>{user.status}</Badge>
          <div style={{ marginTop: '0.5rem' }}>
            <Badge type="info">{user.role}</Badge>
          </div>
        </div>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '1rem' }}>Recent Activity</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.875rem' }}>Logged in to system</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Today, 09:14 AM</div>
          </li>
          <li style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.875rem' }}>Updated patient record (ID: p123)</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Yesterday, 02:45 PM</div>
          </li>
        </ul>
      </div>
    </div>
  );
};
