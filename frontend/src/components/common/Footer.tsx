import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ 
      backgroundColor: 'var(--surface-color)', 
      borderTop: '1px solid var(--border-color)',
      padding: '2rem',
      marginTop: 'auto',
      textAlign: 'center',
      color: 'var(--text-secondary)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Terms of Service</a>
          <a href="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Privacy Policy</a>
          <a href="/help" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Help Center</a>
          <a href="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Contact Us</a>
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} MediCare Connect. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
