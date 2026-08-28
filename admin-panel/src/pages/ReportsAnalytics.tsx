import React, { useState } from 'react';
import { Button } from '../components/common/Button';
import { PieChart } from '../components/analytics/PieChart';
import { BarChart } from '../components/analytics/BarChart';

export const ReportsAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const pieData = [
    { label: 'Cardiology', value: 45, color: '#3b82f6' },
    { label: 'Neurology', value: 25, color: '#10b981' },
    { label: 'Pediatrics', value: 30, color: '#f59e0b' },
  ];

  const barData = [
    { label: 'Mon', value: 120 },
    { label: 'Tue', value: 150 },
    { label: 'Wed', value: 180 },
    { label: 'Thu', value: 130 },
    { label: 'Fri', value: 210 },
    { label: 'Sat', value: 90 },
    { label: 'Sun', value: 60 },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Reports & Analytics</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select className="form-control" value={dateRange} onChange={e => setDateRange(e.target.value)}>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
          <Button variant="outline">Export PDF</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Appointments by Department</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PieChart data={pieData} size={250} />
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Weekly Revenue Trends</h3>
          <div style={{ height: '250px' }}>
            <BarChart data={barData} color="#3b82f6" />
          </div>
        </div>
      </div>
    </div>
  );
};
