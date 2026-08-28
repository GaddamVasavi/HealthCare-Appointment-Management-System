import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from './Button';

export const AdminHeader: React.FC = () => {
  const { logout } = useAuthContext();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="admin-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <input 
          type="text" 
          placeholder="Global Search..." 
          className="form-control" 
          style={{ width: '300px' }} 
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button 
          onClick={toggleTheme} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          🔔
          <span style={{
            position: 'absolute', top: '-5px', right: '-5px', 
            background: 'red', color: 'white', borderRadius: '50%',
            width: '16px', height: '16px', fontSize: '10px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>3</span>
        </div>
        <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
      </div>
    </header>
  );
};
