import { FHIRResourceBase, FHIRIdentifier, FHIRHumanName, FHIRContactPoint, FHIRAddress, FHIRCodeableConcept } from './types';

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
