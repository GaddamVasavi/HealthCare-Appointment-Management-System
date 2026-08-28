import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  status,
  className = '',
}) => {
  const sizeMap = {
    sm: { width: '32px', height: '32px', fontSize: '0.875rem' },
    md: { width: '48px', height: '48px', fontSize: '1.25rem' },
    lg: { width: '64px', height: '64px', fontSize: '1.5rem' },
    xl: { width: '96px', height: '96px', fontSize: '2.5rem' },
  };

  const statusColorMap = {
    online: '#22c55e',
    offline: '#94a3b8',
    busy: '#ef4444',
    away: '#f59e0b',
  };

  const currentSize = sizeMap[size];

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    ...currentSize,
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    backgroundColor: 'var(--border-color)',
  };

  const initialsStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: currentSize.fontSize,
  };

  const statusStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: size === 'sm' ? '8px' : size === 'xl' ? '16px' : '12px',
    height: size === 'sm' ? '8px' : size === 'xl' ? '16px' : '12px',
    borderRadius: '50%',
    backgroundColor: status ? statusColorMap[status] : 'transparent',
    border: '2px solid var(--surface-color)',
  };

  return (
    <div style={containerStyle} className={className}>
      {src ? (
        <img src={src} alt={alt} style={imageStyle} />
      ) : (
        <div style={initialsStyle}>
          {initials || '?'}
        </div>
      )}
      {status && <span style={statusStyle} title={status} />}
    </div>
  );
};

export default Avatar;
