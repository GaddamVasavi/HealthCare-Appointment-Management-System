# Testing

Run the backend suite from the repository root:

```powershell
npm test -- --runInBand
```

The current suite covers password strength, bcrypt hashing, access and refresh token verification, token-type misuse prevention, API health, anonymous appointment denial, and anonymous administrator-report denial.

Build checks:

```powershell
npm run build:backend
npm run build:frontend
npm run build:admin
```

MongoDB-backed registration, booking, and double-booking integration tests require a running MongoDB instance or the configured in-memory MongoDB test harness.
