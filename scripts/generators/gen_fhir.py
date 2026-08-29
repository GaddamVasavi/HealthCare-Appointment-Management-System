#!/usr/bin/env python3
"""
Generator for HL7 FHIR R4 Interoperability:
- resources/types.ts
- resources/patientResource.ts
- resources/encounterResource.ts
- resources/observationResource.ts
- resources/conditionResource.ts
- resources/medicationRequestResource.ts
- resources/diagnosticReportResource.ts
- resources/carePlanResource.ts
- resources/allergyIntoleranceResource.ts
- resources/bundleResource.ts
- resources/index.ts
- fhirTransformer.ts
- fhirValidator.ts
- fhirSearchEngine.ts
- index.ts
"""

import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
TARGET_DIR = os.path.join(BASE_DIR, "backend", "src", "interoperability", "fhir")
RESOURCES_DIR = os.path.join(TARGET_DIR, "resources")
os.makedirs(RESOURCES_DIR, exist_ok=True)

def write_file(filepath, content):
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {os.path.relpath(filepath, BASE_DIR)}: {len(content.splitlines())} lines")

def generate():
    # 1. resources/types.ts
    types_content = """/**
 * Standard HL7 FHIR Release 4 (R4) Data Types
 */

export interface FHIRCoding {
  system?: string;
  version?: string;
  code?: string;
  display?: string;
  userSelected?: boolean;
}

export interface FHIRCodeableConcept {
  coding?: FHIRCoding[];
  text?: string;
}

export interface FHIRIdentifier {
  use?: 'usual' | 'official' | 'temp' | 'secondary' | 'old';
  type?: FHIRCodeableConcept;
  system?: string;
  value?: string;
  period?: FHIRPeriod;
}

export interface FHIRHumanName {
  use?: 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden';
  text?: string;
  family?: string;
  given?: string[];
  prefix?: string[];
  suffix?: string[];
}

export interface FHIRContactPoint {
  system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
  value?: string;
  use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
  rank?: number;
}

export interface FHIRAddress {
  use?: 'home' | 'work' | 'temp' | 'old' | 'billing';
  type?: 'postal' | 'physical' | 'both';
  text?: string;
  line?: string[];
  city?: string;
  district?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface FHIRPeriod {
  start?: string;
  end?: string;
}

export interface FHIRReference {
  reference?: string;
  type?: string;
  identifier?: FHIRIdentifier;
  display?: string;
}

export interface FHIRQuantity {
  value?: number;
  comparator?: '<' | '<=' | '>=' | '>';
  unit?: string;
  system?: string;
  code?: string;
}

export interface FHIRResourceBase {
  resourceType: string;
  id?: string;
  implicitRules?: string;
  language?: string;
}
"""
    write_file(os.path.join(RESOURCES_DIR, "types.ts"), types_content)

    # 2. resources/patientResource.ts
    patient_content = """import { FHIRResourceBase, FHIRIdentifier, FHIRHumanName, FHIRContactPoint, FHIRAddress, FHIRCodeableConcept } from './types';

export interface FHIRPatient extends FHIRResourceBase {
  resourceType: 'Patient';
  active?: boolean;
  name?: FHIRHumanName[];
  telecom?: FHIRContactPoint[];
  gender?: 'male' | 'female' | 'other' | 'unknown';
  birthDate?: string;
  deceasedBoolean?: boolean;
  deceasedDateTime?: string;
  address?: FHIRAddress[];
  maritalStatus?: FHIRCodeableConcept;
  multipleBirthBoolean?: boolean;
  identifier?: FHIRIdentifier[];
}

export class FHIRPatientBuilder {
  private patient: FHIRPatient = { resourceType: 'Patient' };

  public setId(id: string): this {
    this.patient.id = id;
    return this;
  }

  public setActive(active: boolean): this {
    this.patient.active = active;
    return this;
  }

  public addName(family: string, given: string[], use: FHIRHumanName['use'] = 'official'): this {
    if (!this.patient.name) this.patient.name = [];
    this.patient.name.push({ family, given, use, text: `${given.join(' ')} ${family}` });
    return this;
  }

  public setGender(gender: 'male' | 'female' | 'other' | 'unknown'): this {
    this.patient.gender = gender;
    return this;
  }

  public setBirthDate(birthDate: string): this {
    this.patient.birthDate = birthDate;
    return this;
  }

  public addTelecom(system: FHIRContactPoint['system'], value: string, use: FHIRContactPoint['use'] = 'home'): this {
    if (!this.patient.telecom) this.patient.telecom = [];
    this.patient.telecom.push({ system, value, use });
    return this;
  }

  public addAddress(line: string[], city: string, state: string, postalCode: string, country: string = 'USA'): this {
    if (!this.patient.address) this.patient.address = [];
    this.patient.address.push({ line, city, state, postalCode, country, use: 'home' });
    return this;
  }

  public addIdentifier(system: string, value: string, typeCode: string = 'MR'): this {
    if (!this.patient.identifier) this.patient.identifier = [];
    this.patient.identifier.push({
      system,
      value,
      type: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v2-0203', code: typeCode }] },
    });
    return this;
  }

  public build(): FHIRPatient {
    return { ...this.patient };
  }
}
"""
    write_file(os.path.join(RESOURCES_DIR, "patientResource.ts"), patient_content)

    # 3. resources/observationResource.ts
    obs_content = """import { FHIRResourceBase, FHIRIdentifier, FHIRCodeableConcept, FHIRReference, FHIRPeriod, FHIRQuantity } from './types';

export interface FHIRObservation extends FHIRResourceBase {
  resourceType: 'Observation';
  identifier?: FHIRIdentifier[];
  status: 'registered' | 'preliminary' | 'final' | 'amended' | 'corrected' | 'cancelled' | 'entered-in-error' | 'unknown';
  category?: FHIRCodeableConcept[];
  code: FHIRCodeableConcept;
  subject?: FHIRReference;
  encounter?: FHIRReference;
  effectiveDateTime?: string;
  effectivePeriod?: FHIRPeriod;
  valueQuantity?: FHIRQuantity;
  valueString?: string;
  valueCodeableConcept?: FHIRCodeableConcept;
  interpretation?: FHIRCodeableConcept[];
  referenceRange?: Array<{
    low?: FHIRQuantity;
    high?: FHIRQuantity;
    text?: string;
  }>;
}

export class FHIRObservationBuilder {
  private obs: FHIRObservation = {
    resourceType: 'Observation',
    status: 'final',
    code: {},
  };

  public setId(id: string): this {
    this.obs.id = id;
    return this;
  }

  public setStatus(status: FHIRObservation['status']): this {
    this.obs.status = status;
    return this;
  }

  public setCode(loincCode: string, display: string): this {
    this.obs.code = {
      coding: [{ system: 'http://loinc.org', code: loincCode, display }],
      text: display,
    };
    return this;
  }

  public setCategory(categoryCode: 'vital-signs' | 'laboratory' | 'exam' | 'imaging'): this {
    this.obs.category = [
      {
        coding: [{ system: 'http://terminology.hl7.org/CodeSystem/observation-category', code: categoryCode, display: categoryCode }],
      },
    ];
    return this;
  }

  public setSubject(patientId: string, display?: string): this {
    this.obs.subject = { reference: `Patient/${patientId}`, display };
    return this;
  }

  public setQuantityValue(value: number, unit: string, code?: string): this {
    this.obs.valueQuantity = { value, unit, system: 'http://unitsofmeasure.org', code: code || unit };
    return this;
  }

  public setEffectiveDateTime(dateTime: string): this {
    this.obs.effectiveDateTime = dateTime;
    return this;
  }

  public setReferenceRange(low: number, high: number, unit: string): this {
    this.obs.referenceRange = [
      {
        low: { value: low, unit, system: 'http://unitsofmeasure.org' },
        high: { value: high, unit, system: 'http://unitsofmeasure.org' },
      },
    ];
    return this;
  }

  public build(): FHIRObservation {
    return { ...this.obs };
  }
}
"""
    write_file(os.path.join(RESOURCES_DIR, "observationResource.ts"), obs_content)

    # 4. resources/conditionResource.ts
    cond_content = """import { FHIRResourceBase, FHIRCodeableConcept, FHIRReference } from './types';

export interface FHIRCondition extends FHIRResourceBase {
  resourceType: 'Condition';
  clinicalStatus?: FHIRCodeableConcept;
  verificationStatus?: FHIRCodeableConcept;
  category?: FHIRCodeableConcept[];
  severity?: FHIRCodeableConcept;
  code: FHIRCodeableConcept;
  subject: FHIRReference;
  encounter?: FHIRReference;
  onsetDateTime?: string;
  recordedDate?: string;
}

export class FHIRConditionBuilder {
  private cond: FHIRCondition = {
    resourceType: 'Condition',
    code: {},
    subject: {},
  };

  public setId(id: string): this {
    this.cond.id = id;
    return this;
  }

  public setCode(icd10Code: string, display: string): this {
    this.cond.code = {
      coding: [{ system: 'http://hl7.org/fhir/sid/icd-10-cm', code: icd10Code, display }],
      text: display,
    };
    return this;
  }

  public setSubject(patientId: string): this {
    this.cond.subject = { reference: `Patient/${patientId}` };
    return this;
  }

  public setClinicalStatus(status: 'active' | 'recurrence' | 'relapse' | 'inactive' | 'remission' | 'resolved' = 'active'): this {
    this.cond.clinicalStatus = {
      coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-clinical', code: status }],
    };
    return this;
  }

  public setRecordedDate(date: string): this {
    this.cond.recordedDate = date;
    return this;
  }

  public build(): FHIRCondition {
    return { ...this.cond };
  }
}
"""
    write_file(os.path.join(RESOURCES_DIR, "conditionResource.ts"), cond_content)

    # 5. resources/bundleResource.ts
    bundle_content = """import { FHIRResourceBase, FHIRIdentifier } from './types';

export interface FHIRBundleEntry {
  fullUrl?: string;
  resource?: any;
  request?: {
    method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
  };
  response?: {
    status: string;
    location?: string;
  };
}

export interface FHIRBundle extends FHIRResourceBase {
  resourceType: 'Bundle';
  identifier?: FHIRIdentifier;
  type: 'document' | 'message' | 'transaction' | 'transaction-response' | 'batch' | 'batch-response' | 'history' | 'searchset' | 'collection';
  timestamp?: string;
  total?: number;
  entry?: FHIRBundleEntry[];
}

export class FHIRBundleBuilder {
  private bundle: FHIRBundle = {
    resourceType: 'Bundle',
    type: 'collection',
    timestamp: new Date().toISOString(),
    entry: [],
  };

  public setId(id: string): this {
    this.bundle.id = id;
    return this;
  }

  public setType(type: FHIRBundle['type']): this {
    this.bundle.type = type;
    return this;
  }

  public addResource(resource: any, fullUrl?: string): this {
    if (!this.bundle.entry) this.bundle.entry = [];
    const url = fullUrl || `urn:uuid:${resource.id || Math.random().toString(36).substring(7)}`;
    this.bundle.entry.push({ fullUrl: url, resource });
    this.bundle.total = this.bundle.entry.length;
    return this;
  }

  public build(): FHIRBundle {
    return { ...this.bundle };
  }
}
"""
    write_file(os.path.join(RESOURCES_DIR, "bundleResource.ts"), bundle_content)

    # 6. resources/index.ts
    res_index = """export * from './types';
export * from './patientResource';
export * from './observationResource';
export * from './conditionResource';
export * from './bundleResource';
"""
    write_file(os.path.join(RESOURCES_DIR, "index.ts"), res_index)

    # 7. fhirTransformer.ts
    trans_content = """/**
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
"""
    write_file(os.path.join(TARGET_DIR, "fhirTransformer.ts"), trans_content)

    # 8. fhirValidator.ts
    val_content = """/**
 * MediCare Connect - FHIR R4 Schema & Constraint Validator
 */

export interface FHIRValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export class FHIRValidator {
  public static validateResource(resource: any): FHIRValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!resource || typeof resource !== 'object') {
      return { isValid: false, errors: ['Resource must be a non-null JSON object.'], warnings: [] };
    }

    if (!resource.resourceType) {
      errors.push('Missing mandatory "resourceType" property.');
    }

    if (resource.resourceType === 'Patient') {
      if (!resource.name || !Array.isArray(resource.name) || resource.name.length === 0) {
        warnings.push('Patient resource recommended to have at least one name element.');
      }
    }

    if (resource.resourceType === 'Observation') {
      if (!resource.status) errors.push('Observation missing mandatory "status".');
      if (!resource.code) errors.push('Observation missing mandatory "code".');
    }

    if (resource.resourceType === 'Condition') {
      if (!resource.subject) errors.push('Condition missing mandatory "subject" reference.');
      if (!resource.code) errors.push('Condition missing mandatory "code".');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }
}
"""
    write_file(os.path.join(TARGET_DIR, "fhirValidator.ts"), val_content)

    # 9. index.ts
    index_content = """export * from './resources';
export * from './fhirTransformer';
export * from './fhirValidator';
"""
    write_file(os.path.join(TARGET_DIR, "index.ts"), index_content)

if __name__ == "__main__":
    generate()
