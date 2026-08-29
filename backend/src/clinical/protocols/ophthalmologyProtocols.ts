/**
 * MediCare Connect - Specialty Clinical Protocols: Ophthalmology & Eye Care
 * Standards: Evidence-Based Clinical Guidelines
 */

import { DiseaseProtocol } from './cardiologyProtocols';

export class OphthalmologyProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {

    this.add({
      protocolId: 'PROTO-OPH-ACUTE-GLAUCOMA',
      conditionName: 'Acute Angle-Closure Glaucoma Emergency',
      icd10Code: 'H40.20X0',
      targetPopulation: 'Patients diagnosed with Acute Angle-Closure Glaucoma Emergency.',
      exclusionCriteria: ['Terminal hospice palliative care', 'Contraindications to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Diagnostic & Laboratory Evaluation',
          action: 'Stat intraocular pressure (IOP) tonometry measurement (typically > 40-50 mmHg) and slit-lamp exam',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Confirms ocular emergency and shallow anterior chamber.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Administer combination eye drops: Timolol 0.5% + Apraclonidine 1% + Pilocarpine 2% each 1 drop 1 min apart',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reduces aqueous humor production and induces pupillary miosis.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'IV Acetazolamide 500 mg stat plus IV Mannitol 1-2 g/kg if IOP > 50 mmHg',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Rapid osmotic dehydration of the vitreous body.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Clinical Surveillance & Follow-up',
          action: 'Urgent ophthalmology consult for definitive laser peripheral iridotomy (LPI)',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Creates permanent bypass channel for aqueous humor outflow.'
        },
      ],
      hospitalizationCriteria: [
        'Acute sight, limb, or life-threatening organ complication',
        'Severe toxicity from immunosuppressive or biological agents',
        'Intractable pain or metabolic instability'
      ]
    });

  }

  public static getProtocol(id: string): DiseaseProtocol | undefined {
    return this.protocols.get(id);
  }

  public static getAllProtocols(): DiseaseProtocol[] {
    return Array.from(this.protocols.values());
  }
}
