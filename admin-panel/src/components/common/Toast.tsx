import React, { useEffect, useState } from 'react';
import { useNotification } from '../../context/NotificationContext';

export const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      zIndex: 9999
    }}>
      {notifications.map(toast => {
        let bgColor = '#3b82f6';
        if (toast.type === 'success') bgColor = '#10b981';
        if (toast.type === 'error') bgColor = '#ef4444';
        if (toast.type === 'warning') bgColor = '#f59e0b';

        return (
          <div key={toast.id} style={{
            backgroundColor: bgColor,
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '0.375rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: '300px'
          }}>
            <span>{toast.message}</span>
            <button 
              onClick={() => removeNotification(toast.id)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.25rem' }}
            >
              &times;
            </button>
          </div>
        );
      })}
    </div>
  );
};
