import React, { useState } from 'react';

export const VirtualConsultationWorkspace: React.FC<{ appointmentId: string; patientName: string; doctorName: string }> = ({
  appointmentId,
  patientName,
  doctorName,
}) => {
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeTab, setActiveTab] = useState<'NOTES' | 'VITALS' | 'PRESCRIPTIONS' | 'CHAT'>('NOTES');
  const [notes, setNotes] = useState('');

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white">
      {/* Top Header */}
      <header className="h-16 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-900">
        <div className="flex items-center space-x-3">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-lg">Telehealth Enc: {appointmentId}</span>
          <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-400">Encrypted WebRTC HD</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-slate-300">Patient: <strong className="text-white">{patientName}</strong></span>
          <span className="text-sm font-medium text-slate-300">Provider: <strong className="text-white">{doctorName}</strong></span>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Video Area */}
        <div className="flex-1 flex flex-col p-4 bg-slate-900/40 relative">
          <div className="flex-1 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden relative flex items-center justify-center">
            {isVideoMuted ? (
              <div className="flex flex-col items-center text-slate-500">
                <span className="text-5xl mb-2">📷</span>
                <p>Camera is paused</p>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-indigo-600/30 border border-indigo-400 flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-indigo-200">
                    {patientName.substring(0, 2).toUpperCase()}
                  </div>
                  <h3 className="text-xl font-bold">{patientName}</h3>
                  <p className="text-xs text-emerald-400 mt-1">Live Telemetry Connected • 60 FPS HD</p>
                </div>
              </div>
            )}

            {/* Picture-in-picture Doctor Camera */}
            <div className="absolute bottom-4 right-4 w-48 h-32 rounded-xl bg-slate-800 border-2 border-indigo-500 overflow-hidden shadow-2xl flex items-center justify-center">
              <span className="text-xs font-semibold text-slate-400">Doctor Self-View</span>
            </div>
          </div>

          {/* Control Bar */}
          <div className="h-20 flex items-center justify-center space-x-4 mt-4">
            <button
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              className={`p-4 rounded-full font-bold transition shadow-lg ${isAudioMuted ? 'bg-red-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
            >
              {isAudioMuted ? '🔇 Unmute' : '🎙️ Mute'}
            </button>
            <button
              onClick={() => setIsVideoMuted(!isVideoMuted)}
              className={`p-4 rounded-full font-bold transition shadow-lg ${isVideoMuted ? 'bg-red-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
            >
              {isVideoMuted ? '📹 Start Video' : '📷 Stop Video'}
            </button>
            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`p-4 rounded-full font-bold transition shadow-lg ${isScreenSharing ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
            >
              🖥️ Share Screen
            </button>
            <button className="px-6 py-4 rounded-full bg-red-600 hover:bg-red-700 font-bold text-white transition shadow-lg">
              End Consultation
            </button>
          </div>
        </div>

        {/* Right: Clinical Charting Workspace */}
        <div className="w-96 border-l border-slate-800 bg-slate-900 flex flex-col">
          <div className="flex border-b border-slate-800 text-xs font-bold">
            {(['NOTES', 'VITALS', 'PRESCRIPTIONS', 'CHAT'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 border-b-2 transition ${activeTab === tab ? 'border-indigo-500 text-indigo-400 bg-slate-800/50' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {activeTab === 'NOTES' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-300">Live SOAP Documentation</h4>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record subjective history, assessment, and care plan during consultation..."
                  className="w-full h-80 p-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            {activeTab === 'VITALS' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-300">Live Patient Telemetry</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                    <span className="text-xs text-slate-400">Heart Rate</span>
                    <p className="text-xl font-bold text-emerald-400">74 <span className="text-xs text-slate-400">bpm</span></p>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                    <span className="text-xs text-slate-400">SpO2</span>
                    <p className="text-xl font-bold text-emerald-400">98 <span className="text-xs text-slate-400">%</span></p>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                    <span className="text-xs text-slate-400">Blood Pressure</span>
                    <p className="text-xl font-bold text-indigo-400">122/78 <span className="text-xs text-slate-400">mmHg</span></p>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                    <span className="text-xs text-slate-400">Temperature</span>
                    <p className="text-xl font-bold text-indigo-400">36.8 <span className="text-xs text-slate-400">°C</span></p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
