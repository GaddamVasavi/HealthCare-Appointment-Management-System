# Security

MediCare Connect uses bcrypt password hashing, short-lived access JWTs, rotating refresh tokens, HTTP-only refresh cookies, Helmet, CORS allowlists, HPP protection, JSON body limits, validation middleware, and rate limits.

Sensitive records are scoped by patient, doctor, or administrator role. Medical documents must not be served as public static files. Production deployments must provide strong secrets through the environment, use HTTPS, restrict CORS origins, and use a replica-set MongoDB deployment for transactional appointment booking.

The application does not diagnose patients or generate treatment decisions. Diagnosis and prescription fields are clinician-entered records.
