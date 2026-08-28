import React, { useState } from 'react';
import Card from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { values, handleChange, errors } = useForm({
    initialValues: {
      firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
      dateOfBirth: '', gender: '', phone: '', address: '',
      bloodGroup: '', emergencyContactName: '', emergencyContactPhone: '',
      insuranceProvider: '', insuranceNumber: ''
    },
    onSubmit: async () => {} // handled manually at final step
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleRegister = async () => {
    setLoading(true);
    try {
      // Mock API delay
      setTimeout(() => {
        alert('Registration successful! Please login.');
        navigate('/login');
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', backgroundColor: 'var(--background-color)' }}>
      <Card title="Patient Registration" subtitle={`Step ${step} of 4`} style={{ width: '100%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '2rem' }}>
          {[1,2,3,4].map(s => (
            <div key={s} style={{ flex: 1, height: '6px', borderRadius: '4px', backgroundColor: s <= step ? 'var(--primary-color)' : 'var(--border-color)' }} />
          ))}
        </div>

        {step === 1 && (
          <div>
            <h3>Account Details</h3>
            <Input label="First Name" name="firstName" value={values.firstName} onChange={handleChange} required />
            <Input label="Last Name" name="lastName" value={values.lastName} onChange={handleChange} required />
            <Input label="Email Address" type="email" name="email" value={values.email} onChange={handleChange} required />
            <Input label="Password" type="password" name="password" value={values.password} onChange={handleChange} required />
            <Input label="Confirm Password" type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} required />
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <Button onClick={nextStep}>Next Step</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3>Personal Information</h3>
            <Input label="Date of Birth" type="date" name="dateOfBirth" value={values.dateOfBirth} onChange={handleChange} required />
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Gender *</label>
              <select 
                name="gender" 
                value={values.gender} 
                onChange={handleChange as any}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <Input label="Phone Number" type="tel" name="phone" value={values.phone} onChange={handleChange} required />
            <Input label="Full Address" name="address" value={values.address} onChange={handleChange} required />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
              <Button variant="secondary" onClick={prevStep}>Back</Button>
              <Button onClick={nextStep}>Next Step</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3>Medical & Emergency</h3>
            <Input label="Blood Group" name="bloodGroup" placeholder="e.g. O+, A-" value={values.bloodGroup} onChange={handleChange} />
            <Input label="Emergency Contact Name" name="emergencyContactName" value={values.emergencyContactName} onChange={handleChange} required />
            <Input label="Emergency Contact Phone" name="emergencyContactPhone" value={values.emergencyContactPhone} onChange={handleChange} required />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
              <Button variant="secondary" onClick={prevStep}>Back</Button>
              <Button onClick={nextStep}>Next Step</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3>Insurance Information (Optional)</h3>
            <Input label="Insurance Provider" name="insuranceProvider" value={values.insuranceProvider} onChange={handleChange} />
            <Input label="Insurance Policy Number" name="insuranceNumber" value={values.insuranceNumber} onChange={handleChange} />

            <div style={{ backgroundColor: 'var(--background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1.5rem' }}>
              <h4>Review</h4>
              <p>Name: {values.firstName} {values.lastName}</p>
              <p>Email: {values.email}</p>
              <p>DOB: {values.dateOfBirth}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
              <Button variant="secondary" onClick={prevStep}>Back</Button>
              <Button variant="primary" onClick={handleRegister} isLoading={loading}>Complete Registration</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RegisterPage;
