# Database Design

MongoDB stores users, patient profiles, doctor profiles, specializations, schedules, appointments, consultations, prescriptions, medical documents, notifications, and audit logs as separate collections.

Appointments reference patient and doctor users and preserve status history. Booking validates doctor schedule and overlapping appointments inside a transaction. Cancelled and rescheduled appointments are excluded from active overlap checks.

Clinical records reference the appointment and both parties. Documents reference the patient and uploader and contain metadata, access logs, and sharing references. User passwords and refresh tokens are excluded from ordinary query projections and JSON responses.
