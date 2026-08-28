import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-logo" onClick={() => navigate('/')}>
        <div className="logo-icon">➕</div>
        <span className="logo-text">MediCare Connect</span>
      </div>
      
      <div className="header-actions">
        {isAuthenticated ? (
          <>
            <div className="notifications">
              <span className="bell-icon">🔔</span>
              <span className="badge">3</span>
            </div>
            <div className="user-profile">
              <div className="avatar">
                {user?.firstName?.[0] || 'U'}{user?.lastName?.[0] || ''}
              </div>
              <div className="user-info">
                <span className="user-name">{user?.firstName} {user?.lastName}</span>
                <span className="user-role">{user?.role}</span>
              </div>
              <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </div>
          </>
        ) : (
          <button className="login-btn" onClick={() => navigate('/login')}>Log In</button>
        )}
      </div>
    </header>
  );
};

export default Header;
