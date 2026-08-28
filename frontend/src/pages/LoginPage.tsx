import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // MOCK API CALL
      setTimeout(() => {
        if (email === 'patient@test.com' && password === 'password') {
          login({
            user: {
              id: '1', email: 'patient@test.com', firstName: 'John', lastName: 'Doe',
              role: 'PATIENT' as any, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
            },
            token: 'mock-jwt-token',
            refreshToken: 'mock-refresh-token'
          });
          navigate('/patient/dashboard');
        } else if (email === 'doctor@test.com' && password === 'password') {
          login({
            user: {
              id: '2', email: 'doctor@test.com', firstName: 'Jane', lastName: 'Smith',
              role: 'DOCTOR' as any, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
            },
            token: 'mock-jwt-token',
            refreshToken: 'mock-refresh-token'
          });
          navigate('/doctor/dashboard');
        } else {
          setError('Invalid credentials. Use patient@test.com or doctor@test.com with password "password"');
        }
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('An error occurred during login.');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account to continue</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
