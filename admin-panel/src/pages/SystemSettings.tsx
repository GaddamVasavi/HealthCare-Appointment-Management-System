import React from 'react';
import { Tabs } from '../components/common/Tabs';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

export const SystemSettings: React.FC = () => {
  
  const GeneralSettings = () => (
    <form style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input label="Hospital Name" defaultValue="City General Hospital" />
      <Input label="Contact Email" type="email" defaultValue="admin@citygeneral.com" />
      <Input label="Support Phone" defaultValue="+1 (555) 123-4567" />
      <div style={{ marginTop: '1rem' }}>
        <Button type="button">Save Changes</Button>
      </div>
    </form>
  );

  const SecuritySettings = () => (
    <div style={{ maxWidth: '500px' }}>
      <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '0.375rem' }}>
        <h4 style={{ marginBottom: '0.5rem' }}>Two-Factor Authentication (2FA)</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
          Require all admins to use 2FA when logging in.
        </p>
        <Button variant="outline">Enable 2FA Requirement</Button>
      </div>
      <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '0.375rem' }}>
        <h4 style={{ marginBottom: '0.5rem' }}>Session Timeout</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
          Automatically log out inactive users.
        </p>
        <select className="form-control" defaultValue="30">
          <option value="15">15 Minutes</option>
          <option value="30">30 Minutes</option>
          <option value="60">1 Hour</option>
        </select>
      </div>
    </div>
  );

  const tabs = [
    { id: 'general', label: 'General Configuration', content: <GeneralSettings /> },
    { id: 'security', label: 'Security', content: <SecuritySettings /> },
    { id: 'notifications', label: 'Email & Notifications', content: <div>Notification settings here.</div> },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2>System Settings</h2>
      </div>

      <div className="card">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};
