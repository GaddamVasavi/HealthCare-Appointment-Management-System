# Healthcare Platform Interoperability & Clinical AI Architecture

## 1. Overview
This module introduces production-grade Clinical AI Triage, HL7 FHIR R4 standard data interchange, HIPAA-compliant field encryption, and WebRTC Telehealth session orchestration.

## 2. New Subsystems
- **AI Clinical Triage (`AITriageService`)**: Emergency Severity Index (ESI 1-5) automated classification with vital sign risk scoring.
- **HL7 FHIR R4 Gateway (`FHIRGatewayService`)**: Compliant Patient, Encounter, Condition, and Observation JSON schema exporter.
- **HIPAA Field Encryption (`FieldEncryptionService`)**: AES-256-GCM authenticated encryption for sensitive PHI identifiers.
- **WebRTC Telehealth Rooms (`SessionRoomService`)**: Real-time multi-peer room status, clinical note synchronization, and recording archive tracking.

## 3. Test Coverage
Run automated unit and integration tests via:
```bash
npm test -- backend/tests/clinical_interoperability_suite.spec.ts
```
