export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN' | 'DOCTOR' | 'RECEPTIONIST';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface Doctor {
  id: string;
  userId: string;
  name: string;
  specialty: string;
  departmentId: string;
  verified: boolean;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  bloodGroup: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

export interface Department {
  id: string;
  name: string;
  description: string;
  headDoctorId?: string;
  status: 'ACTIVE' | 'INACTIVE';
}
