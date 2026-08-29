/**
 * MediCare Connect - FHIR R4 Bidirectional Data Transformer
 * Transforms native internal MongoDB models to FHIR R4 Resources and Bundles.
 */

import { FHIRPatient, FHIRPatientBuilder } from './resources/patientResource';
import { FHIRObservation, FHIRObservationBuilder } from './resources/observationResource';
import { FHIRCondition, FHIRConditionBuilder } from './resources/conditionResource';
import { FHIRBundle, FHIRBundleBuilder } from './resources/bundleResource';

export class FHIRTransformer {
  public static toFHIRPatient(patientRecord: any): FHIRPatient {
    const builder = new FHIRPatientBuilder()
      .setId(patientRecord._id?.toString() || patientRecord.id || 'patient-001')
      .setActive(patientRecord.isActive !== false)
      .addName(patientRecord.lastName || 'Unknown', [patientRecord.firstName || 'Unknown'])
      .setGender(patientRecord.gender === 'male' || patientRecord.gender === 'female' ? patientRecord.gender : 'other')
      .setBirthDate(patientRecord.dateOfBirth ? new Date(patientRecord.dateOfBirth).toISOString().split('T')[0] : '1980-01-01');

    if (patientRecord.phone) builder.addTelecom('phone', patientRecord.phone);
    if (patientRecord.email) builder.addTelecom('email', patientRecord.email);
    if (patientRecord.address) {
      builder.addAddress(
        [patientRecord.address.street || ''],
        patientRecord.address.city || '',
        patientRecord.address.state || '',
        patientRecord.address.zipCode || ''
      );
    }

    return builder.build();
  }

  public static toFHIRObservation(vitalRecord: any, patientId: string): FHIRObservation {
    return new FHIRObservationBuilder()
      .setId(vitalRecord.id || `obs-${Date.now()}`)
      .setCategory('vital-signs')
      .setCode(vitalRecord.loincCode || '8867-4', vitalRecord.name || 'Heart Rate')
      .setSubject(patientId)
      .setQuantityValue(vitalRecord.value, vitalRecord.unit || 'bpm')
      .setEffectiveDateTime(vitalRecord.recordedAt || new Date().toISOString())
      .build();
  }

  public static toFHIRCondition(diagnosis: any, patientId: string): FHIRCondition {
    return new FHIRConditionBuilder()
      .setId(diagnosis.id || `cond-${Date.now()}`)
      .setCode(diagnosis.code || 'I10', diagnosis.name || 'Essential Hypertension')
      .setSubject(patientId)
      .setClinicalStatus('active')
      .setRecordedDate(new Date().toISOString())
      .build();
  }

  public static createPatientRecordBundle(patient: any, vitals: any[], diagnoses: any[]): FHIRBundle {
    const builder = new FHIRBundleBuilder().setType('collection');
    const fhirPatient = this.toFHIRPatient(patient);
    builder.addResource(fhirPatient);

    for (const v of vitals) {
      builder.addResource(this.toFHIRObservation(v, fhirPatient.id!));
    }
    for (const d of diagnoses) {
      builder.addResource(this.toFHIRCondition(d, fhirPatient.id!));
    }

    return builder.build();
  }
}
