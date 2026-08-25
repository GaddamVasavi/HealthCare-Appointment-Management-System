# MediCare Connect

MediCare Connect is a healthcare appointment management platform under active development. The current milestone provides a TypeScript/Express backend foundation with MongoDB models, JWT authentication, role-aware middleware, appointment booking services, and focused automated tests.

## Current milestone

Implemented:

- Express application entrypoint with security middleware, CORS, rate limiting, compression, and centralized errors
- Patient and doctor registration, login, refresh-token, logout, profile, password reset, and password change routes
- Authenticated appointment creation, listing, lookup, available-slot lookup, and doctor/admin status updates
- Password hashing with bcrypt and access/refresh JWT separation
- Six automated tests covering password strength, hashing, token verification, token misuse prevention, and API health

The frontend, separate admin panel, remaining REST resource routes, database integration tests, Docker setup, reporting, and complete documentation remain to be implemented. This repository does not yet satisfy the requested 50,000 meaningful LOC or five-commit completion target.

## Prerequisites

- Node.js 20+
- npm 10+
- MongoDB 7+ for database-backed API workflows

## Setup

```powershell
npm install
Copy-Item .env.example .env
```

Set `MONGODB_URI`, `JWT_SECRET`, and `JWT_REFRESH_SECRET` in `.env`. Never commit `.env` or real credentials.

## Run the backend

```powershell
npm run dev:backend
```

The API listens on `http://localhost:5000` by default. Health check:

```text
GET /health
```

## Test and build

```powershell
npm test -- --runInBand
npm run build:backend
```

## API groups currently wired

- `/api/auth`
- `/api/appointments`

All appointment routes require a bearer access token. Appointment creation is restricted to patients; appointment status changes are restricted to doctors and administrators.

## Repository structure

```text
backend/
  src/
    app.ts
    server.ts
    controllers/
    middleware/
    models/
    notifications/
    routes/
    services/
    utils/
    validators/
  tests/
```

## GitHub status

The local repository has not been connected to a remote because repository URL and branch details were not supplied. Provide those details before remote operations or pushes are attempted.
