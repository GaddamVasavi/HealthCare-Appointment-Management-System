export interface FHIRResource {
  resourceType: string;
  id: string;
  meta?: {
    versionId?: string;
    lastUpdated: string;
    profile?: string[];
  };
  [key: string]: any;
}

export interface FHIRBundle {
  resourceType: 'Bundle';
  type: 'transaction' | 'searchset' | 'collection';
  total: number;
  entry: {
    fullUrl: string;
    resource: FHIRResource;
  }[];
}

export interface PatientEHRRecord {
  patientId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other' | 'unknown';
  phone?: string;
  email?: string;
  address?: {
    line: string;
    city: string;
    state: string;
    postalCode: string;
  };
  conditions?: Array<{ code: string; display: string; recordedDate: string }>;
  observations?: Array<{ code: string; display: string; value: number; unit: string; effectiveDateTime: string }>;
}

export class FHIRGatewayService {
  /**
   * Transforms internal healthcare records into standard HL7 FHIR R4 Patient resource
   */
  public static convertPatientToFHIR(patient: PatientEHRRecord): FHIRResource {
    return {
      resourceType: 'Patient',
      id: patient.patientId,
      meta: {
        versionId: '1',
        lastUpdated: new Date().toISOString(),
        profile: ['http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient'],
      },
      name: [
        {
          use: 'official',
          family: patient.lastName,
          given: [patient.firstName],
        },
      ],
      gender: patient.gender,
      birthDate: patient.birthDate,
      telecom: [
        ...(patient.phone ? [{ system: 'phone', value: patient.phone, use: 'mobile' }] : []),
        ...(patient.email ? [{ system: 'email', value: patient.email, use: 'home' }] : []),
      ],
      address: patient.address
        ? [
            {
              use: 'home',
              line: [patient.address.line],
              city: patient.address.city,
              state: patient.address.state,
              postalCode: patient.address.postalCode,
            },
          ]
        : [],
    };
  }

  /**
   * Generates a complete FHIR R4 Transaction/Collection Bundle for a patient encounter
   */
  public static buildPatientEncounterBundle(record: PatientEHRRecord, encounterId: string): FHIRBundle {
    const entries: FHIRBundle['entry'] = [];

    // 1. Patient Resource
    const patientResource = this.convertPatientToFHIR(record);
    entries.push({
      fullUrl: `urn:uuid:${record.patientId}`,
      resource: patientResource,
    });

    // 2. Encounter Resource
    const encounterResource: FHIRResource = {
      resourceType: 'Encounter',
      id: encounterId,
      status: 'finished',
      class: {
        system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
        code: 'AMB',
        display: 'ambulatory',
      },
      subject: {
        reference: `Patient/${record.patientId}`,
      },
      period: {
        start: new Date().toISOString(),
      },
    };
    entries.push({
      fullUrl: `urn:uuid:${encounterId}`,
      resource: encounterResource,
    });

    // 3. Condition Resources
    if (record.conditions) {
      record.conditions.forEach((cond, idx) => {
        entries.push({
          fullUrl: `urn:uuid:cond-${idx}`,
          resource: {
            resourceType: 'Condition',
            id: `cond-${idx}`,
            clinicalStatus: {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                  code: 'active',
                },
              ],
            },
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: cond.code,
                  display: cond.display,
                },
              ],
            },
            subject: {
              reference: `Patient/${record.patientId}`,
            },
            recordedDate: cond.recordedDate,
          },
        });
      });
    }

    // 4. Observation Resources
    if (record.observations) {
      record.observations.forEach((obs, idx) => {
        entries.push({
          fullUrl: `urn:uuid:obs-${idx}`,
          resource: {
            resourceType: 'Observation',
            id: `obs-${idx}`,
            status: 'final',
            code: {
              coding: [
                {
                  system: 'http://loinc.org',
                  code: obs.code,
                  display: obs.display,
                },
              ],
            },
            subject: {
              reference: `Patient/${record.patientId}`,
            },
            valueQuantity: {
              value: obs.value,
              unit: obs.unit,
              system: 'http://unitsofmeasure.org',
            },
            effectiveDateTime: obs.effectiveDateTime,
          },
        });
      });
    }

    return {
      resourceType: 'Bundle',
      type: 'collection',
      total: entries.length,
      entry: entries,
    };
  }
}
