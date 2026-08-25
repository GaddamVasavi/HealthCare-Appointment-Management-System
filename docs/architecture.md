# Architecture

MediCare Connect uses a modular backend boundary:

- `src/app.ts` creates the Express application without opening a database connection, which keeps tests deterministic.
- `src/server.ts` validates configuration, connects to MongoDB, and starts the HTTP listener.
- Controllers translate HTTP requests into service calls.
- Services own appointment and authentication business rules.
- Mongoose models define persistence and indexes.
- Middleware owns authentication, role authorization, validation, rate limiting, and error formatting.
- Routes compose these boundaries into the public API.

Appointment booking performs application-level overlap checks inside a MongoDB transaction. A production deployment should also use replica-set-backed MongoDB and a database constraint strategy appropriate to the final slot representation.

The frontend, admin panel, shared package, reporting modules, and remaining resource route groups are planned boundaries but are not present in the current milestone.
