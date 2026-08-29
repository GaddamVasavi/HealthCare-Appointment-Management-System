import React from 'react';

export interface DDIAlertProps {
  isOpen: boolean;
  drugA: string;
  drugB: string;
  severity: 'CONTRAINDICATED' | 'MAJOR' | 'MODERATE' | 'MINOR';
  mechanism: string;
  clinicalEffect: string;
  recommendation: string;
  onOverride: (reason: string) => void;
  onCancel: () => void;
}

export const CDSDrugInteractionAlertModal: React.FC<DDIAlertProps> = ({
  isOpen,
  drugA,
  drugB,
  severity,
  mechanism,
  clinicalEffect,
  recommendation,
  onOverride,
  onCancel,
}) => {
  const [overrideReason, setOverrideReason] = React.useState('');
  const [showOverrideInput, setShowOverrideInput] = React.useState(false);

  if (!isOpen) return null;

  const severityColors = {
    CONTRAINDICATED: 'bg-red-600 text-white',
    MAJOR: 'bg-orange-500 text-white',
    MODERATE: 'bg-amber-400 text-slate-900',
    MINOR: 'bg-blue-400 text-white',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full border border-red-200 dark:border-red-900/50 overflow-hidden">
        <div className={`p-4 font-bold flex items-center justify-between ${severityColors[severity]}`}>
          <div className="flex items-center space-x-2">
            <span className="text-xl">⚠️</span>
            <span>CLINICAL DECISION SUPPORT ALERT: {severity} INTERACTION</span>
          </div>
          <span className="text-xs uppercase px-2 py-1 bg-black/20 rounded-md">Safety Trigger</span>
        </div>

        <div className="p-6 space-y-4 text-slate-800 dark:text-slate-200">
          <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs uppercase text-slate-500 font-semibold">Interacting Pair</span>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {drugA.toUpperCase()} ⟷ {drugB.toUpperCase()}
              </p>
            </div>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${severityColors[severity]}`}>
              {severity}
            </span>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-slate-500 mb-1">Pharmacokinetic Mechanism</h4>
            <p className="text-sm bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
              {mechanism}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-slate-500 mb-1">Clinical Consequence</h4>
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              {clinicalEffect}
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="text-xs font-bold uppercase text-blue-800 dark:text-blue-300 mb-1">
              Evidence-Based Management Recommendation
            </h4>
            <p className="text-sm text-blue-900 dark:text-blue-200">
              {recommendation}
            </p>
          </div>

          {showOverrideInput && (
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
                Clinical Justification for Override (Mandatory for Audit Log)
              </label>
              <textarea
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
                placeholder="Document clinical rationale, monitoring strategy, and patient consent..."
                className="w-full p-3 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-red-500 outline-none"
                rows={3}
              />
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 text-sm font-semibold rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
          >
            Cancel Order
          </button>

          {!showOverrideInput ? (
            <button
              onClick={() => setShowOverrideInput(true)}
              className="px-5 py-2 text-sm font-semibold rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
            >
              Override Warning
            </button>
          ) : (
            <button
              disabled={overrideReason.trim().length < 5}
              onClick={() => onOverride(overrideReason)}
              className="px-5 py-2 text-sm font-semibold rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition"
            >
              Confirm Override & Proceed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
