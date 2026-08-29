import React, { useState } from 'react';

export const BedManagementDashboard: React.FC = () => {
  const [selectedWard, setSelectedWard] = useState<'ALL' | 'ICU' | 'GENERAL' | 'CCU' | 'EMERGENCY'>('ALL');

  const wards = [
    { name: 'ICU (Intensive Care)', capacity: 20, occupied: 18, criticalVentilatorCount: 6 },
    { name: 'CCU (Coronary Care)', capacity: 16, occupied: 12, criticalVentilatorCount: 2 },
    { name: 'General Med-Surg', capacity: 40, occupied: 31, criticalVentilatorCount: 0 },
    { name: 'Emergency Observation', capacity: 20, occupied: 15, criticalVentilatorCount: 4 },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Inpatient Bed Census & Capacity Management</h1>
          <p className="text-sm text-slate-500">Real-time hospital ward occupancy, isolation tracking, and bed turnover status.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition">
          + Transfer / Admit Patient
        </button>
      </div>

      {/* Ward Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {wards.map((w) => {
          const occPercent = Math.round((w.occupied / w.capacity) * 100);
          return (
            <div key={w.name} className="p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold uppercase text-slate-400">{w.name}</span>
              <div className="mt-2 flex items-baseline justify-between">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">{w.occupied} / {w.capacity}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${occPercent >= 90 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {occPercent}% Occupied
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
                <div className={`h-full ${occPercent >= 90 ? 'bg-red-500' : 'bg-indigo-600'}`} style={{ width: `${occPercent}%` }} />
              </div>
              <p className="text-xs text-slate-500 mt-2">Ventilators Active: {w.criticalVentilatorCount}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
