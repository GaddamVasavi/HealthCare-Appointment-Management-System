/**
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
