import { FHIRResourceBase, FHIRIdentifier, FHIRCodeableConcept, FHIRReference, FHIRPeriod, FHIRQuantity } from './types';

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
