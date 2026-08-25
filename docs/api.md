# API Reference

The API is served from `http://localhost:5000`.

## Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh-token`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `PATCH /api/auth/me`
- `PATCH /api/auth/change-password`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

## Care discovery

- `GET /api/doctors`
- `GET /api/doctors/top`
- `GET /api/doctors/:id`
- `GET /api/specializations`
- `GET /api/appointments/available-slots/:doctorId`

## Scheduling

- `POST /api/appointments`
- `GET /api/appointments`
- `GET /api/appointments/:id`
- `PATCH /api/appointments/:id/status`
- `GET /api/schedules/me`
- `POST /api/schedules`
- `PATCH /api/schedules/:id`
- `DELETE /api/schedules/:id`

## Clinical and operations resources

- `GET|POST /api/clinical/consultations`
- `GET|POST /api/clinical/prescriptions`
- `GET /api/clinical/prescriptions/:id`
- `GET /api/notifications`
- `PATCH /api/notifications/:id/read`
- `PATCH /api/notifications/read-all`
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id/status`
- `GET /api/admin/reports/overview`

Protected endpoints require `Authorization: Bearer <access-token>`. Role middleware restricts patient, doctor, and administrator operations.
