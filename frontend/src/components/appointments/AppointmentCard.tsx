import React from 'react';
import Card from '../common/Card';
import { Button } from '../common/Button';
import { Appointment, AppointmentStatus } from '../../types';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: (id: string) => void;
  onReschedule?: (id: string) => void;
  onCheckIn?: (id: string) => void;
  isDoctorView?: boolean;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onCancel,
  onReschedule,
  onCheckIn,
  isDoctorView = false,
}) => {
  const isUpcoming = appointment.status === AppointmentStatus.PENDING || appointment.status === AppointmentStatus.CONFIRMED;
  
  const getStatusBadge = () => {
    const statusMap = {
      [AppointmentStatus.PENDING]: { color: '#f59e0b', bg: '#fef3c7', text: 'Pending' },
      [AppointmentStatus.CONFIRMED]: { color: '#2563eb', bg: '#dbeafe', text: 'Confirmed' },
      [AppointmentStatus.COMPLETED]: { color: '#16a34a', bg: '#dcfce7', text: 'Completed' },
      [AppointmentStatus.CANCELLED]: { color: '#dc2626', bg: '#fee2e2', text: 'Cancelled' },
      [AppointmentStatus.NO_SHOW]: { color: '#475569', bg: '#f1f5f9', text: 'No Show' }
    };
    const style = statusMap[appointment.status] || statusMap[AppointmentStatus.PENDING];
    
    return (
      <span style={{ 
        backgroundColor: style.bg, color: style.color, 
        padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 
      }}>
        {style.text}
      </span>
    );
  };

  const person = isDoctorView ? appointment.patient : appointment.doctor;
  const personName = isDoctorView 
    ? `${person?.firstName} ${person?.lastName}`
    : `Dr. ${person?.firstName} ${person?.lastName}`;
  const personSubtitle = isDoctorView 
    ? `DOB: ${appointment.patient?.dateOfBirth}` 
    : appointment.doctor?.specialty;

  const dateStr = new Date(appointment.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <Card 
      className="appointment-card"
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{dateStr} at {appointment.startTime}</span>
          {getStatusBadge()}
        </div>
      }
      subtitle={`${appointment.type.replace('_', ' ')} • ${appointment.reason}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
        <div style={{ 
          width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', 
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 600
        }}>
          {person?.firstName?.[0] || '?'}{person?.lastName?.[0] || '?'}
        </div>
        <div>
          <h4 style={{ margin: 0, fontSize: '1.125rem' }}>{personName}</h4>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{personSubtitle}</p>
        </div>
      </div>

      {isUpcoming && (
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
          {isDoctorView ? (
            <>
              <Button size="sm" variant="primary" fullWidth onClick={() => onCheckIn?.(appointment.id)}>Begin Consultation</Button>
            </>
          ) : (
            <>
              {onCheckIn && appointment.status !== AppointmentStatus.CONFIRMED && (
                <Button size="sm" variant="primary" fullWidth onClick={() => onCheckIn(appointment.id)}>Check In</Button>
              )}
              {onReschedule && (
                <Button size="sm" variant="secondary" fullWidth onClick={() => onReschedule(appointment.id)}>Reschedule</Button>
              )}
              {onCancel && (
                <Button size="sm" variant="danger" onClick={() => onCancel(appointment.id)}>Cancel</Button>
              )}
            </>
          )}
        </div>
      )}
    </Card>
  );
};

export default AppointmentCard;
