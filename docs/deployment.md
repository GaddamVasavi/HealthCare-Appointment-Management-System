# Deployment

For local development, copy `example.env` to `.env`, supply strong JWT secrets, and run:

```powershell
docker compose up --build
```

The Compose stack starts MongoDB, the backend API, the patient frontend, and the administrator panel. Ports are 27017, 5000, 5173, and 5174 respectively.

For production, terminate TLS at a trusted reverse proxy, store secrets in a managed secret store, use a persistent MongoDB volume or managed MongoDB service, configure explicit frontend origins, and run database backups. Do not publish `.env`, uploaded medical files, or build artifacts as source-controlled content.
