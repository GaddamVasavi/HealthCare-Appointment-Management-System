import { FHIRResourceBase, FHIRCodeableConcept, FHIRReference } from './types';

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
