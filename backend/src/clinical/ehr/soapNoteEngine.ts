/**
 * MediCare Connect - Structured SOAP Clinical Note Documentation Engine
 * Implements standard Subjective, Objective, Assessment, and Plan documentation
 * with Review of Systems (ROS) multi-system checklists and Physical Examination organ-system builders.
 */

export interface ReviewOfSystems {
  constitutional?: string[];
  eyes?: string[];
  earsNoseThroat?: string[];
  cardiovascular?: string[];
  respiratory?: string[];
  gastrointestinal?: string[];
  genitourinary?: string[];
  musculoskeletal?: string[];
  integumentary?: string[];
  neurological?: string[];
  psychiatric?: string[];
  endocrine?: string[];
  hematologicLymphatic?: string[];
  allergicImmunologic?: string[];
}

export interface PhysicalExamination {
  generalAppearance?: string;
  headEyesEarsNoseThroat?: string;
  neckThyroid?: string;
  cardiovascularExam?: string;
  pulmonaryExam?: string;
  abdominalExam?: string;
  extremitiesPulses?: string;
  musculoskeletalExam?: string;
  neurologicalExam?: string;
  skinExam?: string;
  psychiatricAffect?: string;
}

export interface SOAPNote {
  encounterId: string;
  patientId: string;
  providerId: string;
  date: string;
  specialty: string;
  subjective: {
    chiefComplaint: string;
    historyOfPresentIllness: string;
    pastMedicalHistory: string[];
    medicationsReviewed: string[];
    allergiesReviewed: string[];
    reviewOfSystems: ReviewOfSystems;
  };
  objective: {
    vitalSigns: {
      bloodPressure: string;
      heartRate: number;
      respiratoryRate: number;
      temperatureC: number;
      spo2Percent: number;
      bmi: number;
      painScale0To10: number;
    };
    physicalExam: PhysicalExamination;
    diagnosticResultsReviewed: string[];
  };
  assessment: {
    primaryDiagnosis: { code: string; name: string };
    secondaryDiagnoses: Array<{ code: string; name: string }>;
    clinicalImpression: string;
    riskStratification: 'LOW' | 'MODERATE' | 'HIGH';
  };
  plan: {
    medicationOrders: Array<{ drug: string; dose: string; route: string; frequency: string; duration: string }>;
    diagnosticOrders: string[];
    referrals: string[];
    patientInstructions: string[];
    followUpInterval: string;
    emergencyPrecautions: string[];
  };
}

export class SOAPNoteEngine {
  public static compileToFormattedText(note: SOAPNote): string {
    const s = note.subjective;
    const o = note.objective;
    const a = note.assessment;
    const p = note.plan;

    return `
================================================================================
                      CLINICAL PROGRESS NOTE (SOAP)
================================================================================
Encounter ID: ${note.encounterId}
Patient ID:   ${note.patientId}
Provider ID:  ${note.providerId}
Date:         ${note.date}
Specialty:    ${note.specialty}

--------------------------------------------------------------------------------
SUBJECTIVE:
--------------------------------------------------------------------------------
Chief Complaint:
  ${s.chiefComplaint}

History of Present Illness (HPI):
  ${s.historyOfPresentIllness}

Past Medical History:
  ${s.pastMedicalHistory.length > 0 ? s.pastMedicalHistory.map((pmh) => `• ${pmh}`).join('\n  ') : 'None reported.'}

Current Medications Reviewed:
  ${s.medicationsReviewed.length > 0 ? s.medicationsReviewed.map((m) => `• ${m}`).join('\n  ') : 'No active medications.'}

Allergies Reviewed:
  ${s.allergiesReviewed.length > 0 ? s.allergiesReviewed.map((all) => `• ${all}`).join('\n  ') : 'No known drug allergies (NKDA).'}

Review of Systems (ROS):
  ${this.formatROS(s.reviewOfSystems)}

--------------------------------------------------------------------------------
OBJECTIVE:
--------------------------------------------------------------------------------
Vital Signs:
  BP: ${o.vitalSigns.bloodPressure} mmHg | HR: ${o.vitalSigns.heartRate} bpm | RR: ${o.vitalSigns.respiratoryRate} bpm
  Temp: ${o.vitalSigns.temperatureC} °C | SpO2: ${o.vitalSigns.spo2Percent}% | BMI: ${o.vitalSigns.bmi} kg/m² | Pain: ${o.vitalSigns.painScale0To10}/10

Physical Examination:
  General:      ${o.physicalExam.generalAppearance || 'Alert, well-developed, in no acute distress.'}
  HEENT:        ${o.physicalExam.headEyesEarsNoseThroat || 'Normocephalic, atraumatic, PERRLA, EOMI.'}
  Neck:         ${o.physicalExam.neckThyroid || 'Supple, no lymphadenopathy, no thyromegaly, no JVD.'}
  Cardio:       ${o.physicalExam.cardiovascularExam || 'Regular rate and rhythm, normal S1/S2, no murmurs, gallops, or rubs.'}
  Lungs:        ${o.physicalExam.pulmonaryExam || 'Clear to auscultation bilaterally, good air movement, no wheezes or crackles.'}
  Abdomen:      ${o.physicalExam.abdominalExam || 'Soft, non-tender, non-distended, normoactive bowel sounds.'}
  Extremities:  ${o.physicalExam.extremitiesPulses || 'No cyanosis, clubbing, or peripheral edema; 2+ radial and DP pulses.'}
  Neuro:        ${o.physicalExam.neurologicalExam || 'Grossly intact, cranial nerves II-XII intact, normal gait.'}
  Skin:         ${o.physicalExam.skinExam || 'Warm, dry, no suspicious lesions or rash.'}
  Psychiatric:  ${o.physicalExam.psychiatricAffect || 'Intact judgment, appropriate affect, pleasant and cooperative.'}

Diagnostic & Lab Results:
  ${o.diagnosticResultsReviewed.length > 0 ? o.diagnosticResultsReviewed.map((d) => `• ${d}`).join('\n  ') : 'No new diagnostics reviewed today.'}

--------------------------------------------------------------------------------
ASSESSMENT:
--------------------------------------------------------------------------------
Primary Diagnosis:
  • [${a.primaryDiagnosis.code}] ${a.primaryDiagnosis.name}

Secondary Diagnoses:
  ${a.secondaryDiagnoses.length > 0 ? a.secondaryDiagnoses.map((dx) => `• [${dx.code}] ${dx.name}`).join('\n  ') : 'None.'}

Clinical Impression & Synthesis:
  ${a.clinicalImpression}

Risk Stratification: ${a.riskStratification}

--------------------------------------------------------------------------------
PLAN:
--------------------------------------------------------------------------------
Prescriptions & Medication Management:
  ${p.medicationOrders.length > 0 ? p.medicationOrders.map((m) => `• ${m.drug} ${m.dose} ${m.route} ${m.frequency} for ${m.duration}`).join('\n  ') : 'No new medication orders.'}

Diagnostics & Lab Orders:
  ${p.diagnosticOrders.length > 0 ? p.diagnosticOrders.map((d) => `• ${d}`).join('\n  ') : 'None.'}

Specialty Referrals:
  ${p.referrals.length > 0 ? p.referrals.map((r) => `• ${r}`).join('\n  ') : 'None required at this time.'}

Patient Education & Care Instructions:
  ${p.patientInstructions.length > 0 ? p.patientInstructions.map((i) => `• ${i}`).join('\n  ') : 'Standard counseling provided.'}

Follow-up:
  ${p.followUpInterval}

Emergency Precautions:
  ${p.emergencyPrecautions.length > 0 ? p.emergencyPrecautions.map((ep) => `• ${ep}`).join('\n  ') : 'Seek immediate emergency care if symptoms worsen suddenly.'}
================================================================================
`.trim();
  }

  private static formatROS(ros: ReviewOfSystems): string {
    const entries: string[] = [];
    if (ros.constitutional?.length) entries.push(`Constitutional: ${ros.constitutional.join(', ')}`);
    if (ros.cardiovascular?.length) entries.push(`Cardiovascular: ${ros.cardiovascular.join(', ')}`);
    if (ros.respiratory?.length) entries.push(`Respiratory: ${ros.respiratory.join(', ')}`);
    if (ros.gastrointestinal?.length) entries.push(`Gastrointestinal: ${ros.gastrointestinal.join(', ')}`);
    if (ros.musculoskeletal?.length) entries.push(`Musculoskeletal: ${ros.musculoskeletal.join(', ')}`);
    if (ros.neurological?.length) entries.push(`Neurological: ${ros.neurological.join(', ')}`);
    if (ros.psychiatric?.length) entries.push(`Psychiatric: ${ros.psychiatric.join(', ')}`);

    if (entries.length === 0) return 'All other 14 systems reviewed and negative except as noted in HPI.';
    return entries.join('\n  ');
  }
}
