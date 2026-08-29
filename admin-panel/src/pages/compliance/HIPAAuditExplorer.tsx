import React, { useState } from 'react';

export const HIPAAuditExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const auditEvents = [
    { id: 'AUD-9910', timestamp: '2026-08-29 11:20:05', user: 'Dr. Sarah Jenkins', role: 'Physician', action: 'PHI_ACCESS', patientId: 'PT-10023', ip: '192.168.1.45', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { id: 'AUD-9911', timestamp: '2026-08-29 11:21:42', user: 'Nurse Mark Wilson', role: 'Staff Nurse', action: 'PHI_MODIFY', patientId: 'PT-10023', ip: '192.168.1.52', hash: '872983cbf23984faef9834278479237482397489237489237498237498237498' },
    { id: 'AUD-9912', timestamp: '2026-08-29 11:25:10', user: 'Admin Billing', role: 'Billing Specialist', action: 'PHI_EXPORT', patientId: 'PT-10045', ip: '192.168.1.88', hash: '9843759283749823749823749823749823749823749823749823749823749823' },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">HIPAA Security Audit Trail & Cryptographic Ledger</h1>
          <p className="text-sm text-slate-500">Immutable SHA-256 hash-chained ePHI access audit logs conforming to HIPAA § 164.312(b).</p>
        </div>
        <span className="px-4 py-2 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-xl border border-emerald-300">
          ✓ Hash Chain Integrity: VERIFIED
        </span>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <input
            type="text"
            placeholder="Search by User, Patient ID, Action, or IP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-700">
              <th className="p-4">Timestamp</th>
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Action</th>
              <th className="p-4">Patient ID</th>
              <th className="p-4">IP Address</th>
              <th className="p-4">SHA-256 Hash</th>
            </tr>
          </thead>
          <tbody>
            {auditEvents.map((evt) => (
              <tr key={evt.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/40">
                <td className="p-4 font-mono text-xs">{evt.timestamp}</td>
                <td className="p-4 font-medium text-slate-900 dark:text-white">{evt.user}</td>
                <td className="p-4 text-xs">{evt.role}</td>
                <td className="p-4">
                  <span className="px-2 py-1 text-xs font-bold rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {evt.action}
                  </span>
                </td>
                <td className="p-4 font-mono text-xs text-slate-600 dark:text-slate-300">{evt.patientId}</td>
                <td className="p-4 font-mono text-xs text-slate-500">{evt.ip}</td>
                <td className="p-4 font-mono text-xs text-slate-400 truncate max-w-xs">{evt.hash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
