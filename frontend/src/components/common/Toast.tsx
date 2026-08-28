import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../styles/Toast.css';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const getIcon = (type: string) => {
  switch (type) {
    case 'success': return '✅';
    case 'error': return '❌';
    case 'warning': return '⚠️';
    case 'info': return 'ℹ️';
    default: return '🔔';
  }
};

const ToastItem: React.FC<{ toast: ToastMessage; remove: (id: string) => void }> = ({ toast, remove }) => {
  useEffect(() => {
    if (toast.duration !== 0) { // 0 means don't auto-dismiss
      const timer = setTimeout(() => {
        remove(toast.id);
      }, toast.duration || 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, remove]);

  return (
    <div className={`toast-item toast-${toast.type}`}>
      <div className="toast-icon">{getIcon(toast.type)}</div>
      <div className="toast-content">
        <h4 className="toast-title">{toast.title}</h4>
        {toast.message && <p className="toast-message">{toast.message}</p>}
      </div>
      <button className="toast-close" onClick={() => remove(toast.id)}>&times;</button>
    </div>
  );
};

export const ToastContainer: React.FC<ToastContainerProps> = ({ 
  toasts, 
  removeToast, 
  position = 'top-right' 
}) => {
  const portalRoot = document.getElementById('toast-root') || document.body;
  
  if (toasts.length === 0) return null;

  return createPortal(
    <div className={`toast-container toast-pos-${position}`}>
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} remove={removeToast} />
      ))}
    </div>,
    portalRoot
  );
};

export default ToastContainer;
