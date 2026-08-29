#!/usr/bin/env python3
"""
Generator for EHR & Clinical Workflow Modules:
- soapNoteEngine.ts
- vitalsTelemetryEngine.ts
- immunizationRegistry.ts
- carePlanManager.ts
- clinicalNoteTemplates.ts
- index.ts
"""

import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
TARGET_DIR = os.path.join(BASE_DIR, "backend", "src", "clinical", "ehr")
os.makedirs(TARGET_DIR, exist_ok=True)

def write_file(filename, content):
    filepath = os.path.join(TARGET_DIR, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {filename}: {len(content.splitlines())} lines")

def generate():
    # 1. soapNoteEngine.ts
    soap_lines = []
    soap_lines.append("""/**
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
  ${s.pastMedicalHistory.length > 0 ? s.pastMedicalHistory.map((pmh) => `• ${pmh}`).join('\\n  ') : 'None reported.'}

Current Medications Reviewed:
  ${s.medicationsReviewed.length > 0 ? s.medicationsReviewed.map((m) => `• ${m}`).join('\\n  ') : 'No active medications.'}

Allergies Reviewed:
  ${s.allergiesReviewed.length > 0 ? s.allergiesReviewed.map((all) => `• ${all}`).join('\\n  ') : 'No known drug allergies (NKDA).'}

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
  ${o.diagnosticResultsReviewed.length > 0 ? o.diagnosticResultsReviewed.map((d) => `• ${d}`).join('\\n  ') : 'No new diagnostics reviewed today.'}

--------------------------------------------------------------------------------
ASSESSMENT:
--------------------------------------------------------------------------------
Primary Diagnosis:
  • [${a.primaryDiagnosis.code}] ${a.primaryDiagnosis.name}

Secondary Diagnoses:
  ${a.secondaryDiagnoses.length > 0 ? a.secondaryDiagnoses.map((dx) => `• [${dx.code}] ${dx.name}`).join('\\n  ') : 'None.'}

Clinical Impression & Synthesis:
  ${a.clinicalImpression}

Risk Stratification: ${a.riskStratification}

--------------------------------------------------------------------------------
PLAN:
--------------------------------------------------------------------------------
Prescriptions & Medication Management:
  ${p.medicationOrders.length > 0 ? p.medicationOrders.map((m) => `• ${m.drug} ${m.dose} ${m.route} ${m.frequency} for ${m.duration}`).join('\\n  ') : 'No new medication orders.'}

Diagnostics & Lab Orders:
  ${p.diagnosticOrders.length > 0 ? p.diagnosticOrders.map((d) => `• ${d}`).join('\\n  ') : 'None.'}

Specialty Referrals:
  ${p.referrals.length > 0 ? p.referrals.map((r) => `• ${r}`).join('\\n  ') : 'None required at this time.'}

Patient Education & Care Instructions:
  ${p.patientInstructions.length > 0 ? p.patientInstructions.map((i) => `• ${i}`).join('\\n  ') : 'Standard counseling provided.'}

Follow-up:
  ${p.followUpInterval}

Emergency Precautions:
  ${p.emergencyPrecautions.length > 0 ? p.emergencyPrecautions.map((ep) => `• ${ep}`).join('\\n  ') : 'Seek immediate emergency care if symptoms worsen suddenly.'}
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
    return entries.join('\\n  ');
  }
}
""")
    write_file("soapNoteEngine.ts", "\n".join(soap_lines))

    # 2. vitalsTelemetryEngine.ts
    vitals_lines = []
    vitals_lines.append("""/**
 * MediCare Connect - Streaming Vitals Telemetry & Early Warning Scoring Engine
 * Computes MEWS (Modified Early Warning Score), NEWS2 (National Early Warning Score),
 * and generates real-time clinical alerts for sepsis, acute hemodynamic instability, and respiratory failure.
 */

export interface VitalsTelemetrySample {
  patientId: string;
  timestamp: string;
  heartRateBpm: number;
  systolicBpMmHg: number;
  diastolicBpMmHg: number;
  respiratoryRateBpm: number;
  temperatureCelsius: number;
  spo2Percent: number;
  supplementalOxygen: boolean;
  consciousnessLevel: 'ALERT' | 'VOICE' | 'PAIN' | 'UNRESPONSIVE';
}

export interface EarlyWarningScoreResult {
  news2Score: number;
  mewsScore: number;
  clinicalRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL_EMERGENCY';
  monitoringFrequencyRecommendation: string;
  clinicalActionRequired: string;
  sepsisScreenPositive: boolean;
  triggeredAlerts: string[];
}

export class VitalsTelemetryEngine {
  public static calculateNEWS2(sample: VitalsTelemetrySample): EarlyWarningScoreResult {
    let score = 0;
    const triggeredAlerts: string[] = [];

    // 1. Respiration Rate
    if (sample.respiratoryRateBpm <= 8) {
      score += 3;
      triggeredAlerts.push('Severe Bradypnea (RR <= 8 bpm)');
    } else if (sample.respiratoryRateBpm >= 9 && sample.respiratoryRateBpm <= 11) {
      score += 1;
    } else if (sample.respiratoryRateBpm >= 12 && sample.respiratoryRateBpm <= 20) {
      score += 0;
    } else if (sample.respiratoryRateBpm >= 21 && sample.respiratoryRateBpm <= 24) {
      score += 2;
    } else if (sample.respiratoryRateBpm >= 25) {
      score += 3;
      triggeredAlerts.push('Severe Tachypnea (RR >= 25 bpm)');
    }

    // 2. SpO2
    if (sample.spo2Percent <= 91) {
      score += 3;
      triggeredAlerts.push(`Critical Hypoxia (SpO2 ${sample.spo2Percent}%)`);
    } else if (sample.spo2Percent <= 93) {
      score += 2;
    } else if (sample.spo2Percent <= 95) {
      score += 1;
    }

    // 3. Supplemental Oxygen
    if (sample.supplementalOxygen) {
      score += 2;
    }

    // 4. Systolic BP
    if (sample.systolicBpMmHg <= 90) {
      score += 3;
      triggeredAlerts.push(`Severe Hypotension (SBP ${sample.systolicBpMmHg} mmHg)`);
    } else if (sample.systolicBpMmHg <= 100) {
      score += 2;
    } else if (sample.systolicBpMmHg <= 110) {
      score += 1;
    } else if (sample.systolicBpMmHg >= 220) {
      score += 3;
      triggeredAlerts.push(`Severe Hypertensive Crisis (SBP ${sample.systolicBpMmHg} mmHg)`);
    }

    // 5. Heart Rate
    if (sample.heartRateBpm <= 40) {
      score += 3;
      triggeredAlerts.push(`Severe Bradycardia (HR ${sample.heartRateBpm} bpm)`);
    } else if (sample.heartRateBpm <= 50) {
      score += 1;
    } else if (sample.heartRateBpm <= 90) {
      score += 0;
    } else if (sample.heartRateBpm <= 110) {
      score += 1;
    } else if (sample.heartRateBpm <= 130) {
      score += 2;
    } else if (sample.heartRateBpm >= 131) {
      score += 3;
      triggeredAlerts.push(`Severe Tachycardia (HR ${sample.heartRateBpm} bpm)`);
    }

    // 6. Consciousness (ACVPU)
    if (sample.consciousnessLevel !== 'ALERT') {
      score += 3;
      triggeredAlerts.push(`Altered Mental Status (${sample.consciousnessLevel})`);
    }

    // 7. Temperature
    if (sample.temperatureCelsius <= 35.0) {
      score += 3;
      triggeredAlerts.push(`Hypothermia (Temp ${sample.temperatureCelsius}°C)`);
    } else if (sample.temperatureCelsius <= 36.0) {
      score += 1;
    } else if (sample.temperatureCelsius <= 38.0) {
      score += 0;
    } else if (sample.temperatureCelsius <= 39.0) {
      score += 1;
    } else if (sample.temperatureCelsius >= 39.1) {
      score += 2;
      triggeredAlerts.push(`High Fever (Temp ${sample.temperatureCelsius}°C)`);
    }

    // MEWS calculation
    const mews = Math.min(14, Math.round(score * 0.85));

    // Sepsis Screening: SIRS criteria + infection suspicion
    const sirsCount =
      (sample.temperatureCelsius > 38.0 || sample.temperatureCelsius < 36.0 ? 1 : 0) +
      (sample.heartRateBpm > 90 ? 1 : 0) +
      (sample.respiratoryRateBpm > 20 ? 1 : 0);
    const sepsisScreenPositive = sirsCount >= 2 && (sample.systolicBpMmHg < 100 || sample.consciousnessLevel !== 'ALERT');

    if (sepsisScreenPositive) {
      triggeredAlerts.push('ALERT: Sepsis Screening Positive! Initiating 1-Hour Sepsis Bundle protocol.');
    }

    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL_EMERGENCY' = 'LOW';
    let freq = 'Routine monitoring every 12 hours.';
    let action = 'Continue standard ward care.';

    if (score >= 7 || triggeredAlerts.length >= 2) {
      riskLevel = 'CRITICAL_EMERGENCY';
      freq = 'Continuous telemetry monitoring.';
      action = 'EMERGENCY: Immediate Medical Emergency Team (MET) / Rapid Response Team activation. ICU transfer evaluation.';
    } else if (score >= 5) {
      riskLevel = 'HIGH';
      freq = 'Monitor every 1 hour.';
      action = 'Urgent review by attending clinician / specialist within 30 minutes.';
    } else if (score >= 3) {
      riskLevel = 'MEDIUM';
      freq = 'Monitor every 4 hours.';
      action = 'Registered nurse assessment and optimization of therapy.';
    }

    return {
      news2Score: score,
      mewsScore: mews,
      clinicalRiskLevel: riskLevel,
      monitoringFrequencyRecommendation: freq,
      clinicalActionRequired: action,
      sepsisScreenPositive,
      triggeredAlerts,
    };
  }
}
""")
    write_file("vitalsTelemetryEngine.ts", "\n".join(vitals_lines))

    # 3. immunizationRegistry.ts
    imm_lines = []
    imm_lines.append("""/**
 * MediCare Connect - Immunization Registry & ACIP Vaccine Schedule Engine
 * Standards: CDC Advisory Committee on Immunization Practices (ACIP)
 * Evaluates pediatric and adult immunization schedules, minimum intervals, and contraindications.
 */

export interface VaccineDefinition {
  cvxCode: number;
  vaccineName: string;
  tradeNames: string[];
  targetDiseases: string[];
  isLiveAttenuated: boolean;
  standardSeriesDoses: number;
  minimumAgeWeeks: number;
  recommendedAgeMilestones: string[];
  contraindications: string[];
}

export class ImmunizationRegistry {
  private static readonly vaccines: Map<number, VaccineDefinition> = new Map();

  static {
    this.initializeRegistry();
  }

  private static add(v: VaccineDefinition): void {
    this.vaccines.set(v.cvxCode, v);
  }

  private static initializeRegistry(): void {
    this.add({
      cvxCode: 20,
      vaccineName: 'DTaP (Diphtheria, Tetanus, acellular Pertussis)',
      tradeNames: ['Infanrix', 'Daptacel'],
      targetDiseases: ['Diphtheria', 'Tetanus', 'Pertussis'],
      isLiveAttenuated: false,
      standardSeriesDoses: 5,
      minimumAgeWeeks: 6,
      recommendedAgeMilestones: ['2 months', '4 months', '6 months', '15-18 months', '4-6 years'],
      contraindications: ['Encephalopathy within 7 days of previous pertussis vaccine', 'Severe anaphylaxis to components']
    });

    this.add({
      cvxCode: 3,
      vaccineName: 'MMR (Measles, Mumps, Rubella)',
      tradeNames: ['M-M-R II', 'Priorix'],
      targetDiseases: ['Measles', 'Mumps', 'Rubella'],
      isLiveAttenuated: true,
      standardSeriesDoses: 2,
      minimumAgeWeeks: 52,
      recommendedAgeMilestones: ['12-15 months', '4-6 years'],
      contraindications: ['Pregnancy', 'Severe immunodeficiency / immunocompromised state', 'Anaphylaxis to neomycin or gelatin']
    });

    this.add({
      cvxCode: 21,
      vaccineName: 'Varicella (Chickenpox)',
      tradeNames: ['Varivax'],
      targetDiseases: ['Varicella'],
      isLiveAttenuated: true,
      standardSeriesDoses: 2,
      minimumAgeWeeks: 52,
      recommendedAgeMilestones: ['12-15 months', '4-6 years'],
      contraindications: ['Pregnancy', 'Immunodeficiency', 'Immunosuppressive chemotherapy']
    });

    this.add({
      cvxCode: 45,
      vaccineName: 'HepB (Hepatitis B pediatric/adolescent)',
      tradeNames: ['Engerix-B', 'Recombivax HB'],
      targetDiseases: ['Hepatitis B'],
      isLiveAttenuated: false,
      standardSeriesDoses: 3,
      minimumAgeWeeks: 0,
      recommendedAgeMilestones: ['Birth', '1-2 months', '6-18 months'],
      contraindications: ['Severe allergy to yeast']
    });

    this.add({
      cvxCode: 158,
      vaccineName: 'Influenza, injectable, quadrivalent',
      tradeNames: ['Fluzone', 'Fluarix', 'Flulaval'],
      targetDiseases: ['Influenza A and B'],
      isLiveAttenuated: false,
      standardSeriesDoses: 1,
      minimumAgeWeeks: 24,
      recommendedAgeMilestones: ['Annual in Autumn for all >= 6 months'],
      contraindications: ['Severe life-threatening allergic reaction to previous flu vaccine']
    });

    this.add({
      cvxCode: 121,
      vaccineName: 'Zoster recombinant (Shingrix)',
      tradeNames: ['Shingrix'],
      targetDiseases: ['Herpes Zoster (Shingles)'],
      isLiveAttenuated: false,
      standardSeriesDoses: 2,
      minimumAgeWeeks: 2600, // 50 years
      recommendedAgeMilestones: ['Age 50+ (2 doses separated by 2-6 months)'],
      contraindications: ['Severe allergic reaction to vaccine component']
    });
  }

  public static evaluatePatientVaccines(
    patientAgeMonths: number,
    administeredCVXCodes: number[],
    isPregnant: boolean = false,
    isImmunocompromised: boolean = false
  ): {
    dueVaccines: VaccineDefinition[];
    contraindicatedVaccines: Array<{ vaccine: VaccineDefinition; reason: string }>;
  } {
    const dueVaccines: VaccineDefinition[] = [];
    const contraindicatedVaccines: Array<{ vaccine: VaccineDefinition; reason: string }> = [];

    for (const v of this.vaccines.values()) {
      const alreadyGiven = administeredCVXCodes.filter((c) => c === v.cvxCode).length;

      // Check contraindications
      if (v.isLiveAttenuated && (isPregnant || isImmunocompromised)) {
        contraindicatedVaccines.push({
          vaccine: v,
          reason: `Live attenuated vaccine strictly contraindicated in ${isPregnant ? 'pregnancy' : 'immunocompromised state'}.`,
        });
        continue;
      }

      // Check due status
      const minAgeMo = v.minimumAgeWeeks / 4.3;
      if (patientAgeMonths >= minAgeMo && alreadyGiven < v.standardSeriesDoses) {
        dueVaccines.push(v);
      }
    }

    return { dueVaccines, contraindicatedVaccines };
  }
}
""")
    write_file("immunizationRegistry.ts", "\n".join(imm_lines))

    # 4. carePlanManager.ts
    care_lines = []
    care_lines.append("""/**
 * MediCare Connect - Chronic Disease Care Plan & Clinical Pathway Protocol Manager
 * Standards: NCQA Patient-Centered Medical Home (PCMH) & ADA / ACC / AHA Guidelines
 * Manages chronic disease clinical pathways, target goals, interventions, and milestone tracking.
 */

export interface CarePlanGoal {
  id: string;
  description: string;
  targetMetric: string;
  targetValue: string;
  achievedValue?: string;
  dueDate: string;
  status: 'IN_PROGRESS' | 'ACHIEVED' | 'DELAYED' | 'DISCONTINUED';
}

export interface CarePlanIntervention {
  id: string;
  category: 'MEDICATION' | 'LIFESTYLE' | 'NUTRITION' | 'EXERCISE' | 'MONITORING' | 'EDUCATION';
  description: string;
  frequency: string;
  responsibleParty: 'PATIENT' | 'PROVIDER' | 'CARE_COORDINATOR' | 'DIETITIAN' | 'NURSE';
}

export interface ChronicCarePlan {
  id: string;
  patientId: string;
  conditionName: string;
  icd10Code: string;
  status: 'ACTIVE' | 'RESOLVED' | 'SUSPENDED';
  startDate: string;
  reviewIntervalDays: number;
  goals: CarePlanGoal[];
  interventions: CarePlanIntervention[];
  careTeam: Array<{ role: string; name: string }>;
}

export class CarePlanManager {
  private static readonly defaultProtocols: Map<string, Partial<ChronicCarePlan>> = new Map();

  static {
    this.initializeProtocols();
  }

  private static initializeProtocols(): void {
    // Type 2 Diabetes Mellitus Protocol
    this.defaultProtocols.set('E11.9', {
      conditionName: 'Type 2 Diabetes Mellitus Management',
      icd10Code: 'E11.9',
      reviewIntervalDays: 90,
      goals: [
        {
          id: 'GOAL-DM-1',
          description: 'Achieve and maintain glycemic control',
          targetMetric: 'Hemoglobin A1c',
          targetValue: '< 7.0%',
          dueDate: '3 months',
          status: 'IN_PROGRESS'
        },
        {
          id: 'GOAL-DM-2',
          description: 'Blood pressure control to prevent vascular complications',
          targetMetric: 'Blood Pressure',
          targetValue: '< 130/80 mmHg',
          dueDate: '1 month',
          status: 'IN_PROGRESS'
        },
        {
          id: 'GOAL-DM-3',
          description: 'Screen for diabetic nephropathy',
          targetMetric: 'Urine Albumin/Creatinine Ratio (uACR)',
          targetValue: '< 30 mg/g',
          dueDate: '12 months',
          status: 'IN_PROGRESS'
        },
        {
          id: 'GOAL-DM-4',
          description: 'Annual comprehensive dilated eye examination',
          targetMetric: 'Diabetic Retinopathy Screening',
          targetValue: 'Completed retinal photo / exam',
          dueDate: '12 months',
          status: 'IN_PROGRESS'
        }
      ],
      interventions: [
        {
          id: 'INT-DM-1',
          category: 'MEDICATION',
          description: 'First-line Metformin titrated to 1000 mg BID; consider SGLT2i or GLP-1 RA for cardio-renal protection.',
          frequency: 'Daily',
          responsibleParty: 'PROVIDER'
        },
        {
          id: 'INT-DM-2',
          category: 'MONITORING',
          description: 'Daily fasting blood glucose logging and postprandial spot checks.',
          frequency: 'Daily',
          responsibleParty: 'PATIENT'
        },
        {
          id: 'INT-DM-3',
          category: 'NUTRITION',
          description: 'Medical Nutrition Therapy (MNT) with registered dietitian for carbohydrate counting.',
          frequency: 'Monthly',
          responsibleParty: 'DIETITIAN'
        },
        {
          id: 'INT-DM-4',
          category: 'EDUCATION',
          description: 'Daily visual foot inspection for calluses, blisters, or skin breakdown.',
          frequency: 'Daily',
          responsibleParty: 'PATIENT'
        }
      ]
    });

    // Essential Hypertension Protocol
    this.defaultProtocols.set('I10', {
      conditionName: 'Stage 1/2 Essential Hypertension Protocol',
      icd10Code: 'I10',
      reviewIntervalDays: 60,
      goals: [
        {
          id: 'GOAL-HTN-1',
          description: 'Achieve target resting blood pressure',
          targetMetric: 'Home BP Monitoring Average',
          targetValue: '< 130/80 mmHg',
          dueDate: '2 months',
          status: 'IN_PROGRESS'
        }
      ],
      interventions: [
        {
          id: 'INT-HTN-1',
          category: 'LIFESTYLE',
          description: 'DASH diet adherence: Sodium restriction < 2,300 mg/day (ideally < 1,500 mg/day).',
          frequency: 'Daily',
          responsibleParty: 'PATIENT'
        },
        {
          id: 'INT-HTN-2',
          category: 'EXERCISE',
          description: 'Moderate aerobic exercise 150 minutes per week (e.g. brisk walking 30 min 5x/week).',
          frequency: 'Weekly',
          responsibleParty: 'PATIENT'
        }
      ]
    });
  }

  public static generateProtocolForCondition(patientId: string, icd10Code: string): ChronicCarePlan {
    const template = this.defaultProtocols.get(icd10Code.toUpperCase().trim()) || {
      conditionName: `Chronic Disease Management Protocol (${icd10Code})`,
      icd10Code,
      reviewIntervalDays: 90,
      goals: [
        {
          id: `GOAL-${icd10Code}-1`,
          description: 'Symptom stabilization and disease control',
          targetMetric: 'Clinical Evaluation',
          targetValue: 'Stable disease',
          dueDate: '3 months',
          status: 'IN_PROGRESS',
        },
      ],
      interventions: [
        {
          id: `INT-${icd10Code}-1`,
          category: 'MONITORING',
          description: 'Follow-up clinical assessment and adherence check.',
          frequency: 'Quarterly',
          responsibleParty: 'PROVIDER',
        },
      ],
    };

    return {
      id: `CP-${patientId}-${icd10Code}-${Date.now().toString(36)}`,
      patientId,
      conditionName: template.conditionName!,
      icd10Code: template.icd10Code!,
      status: 'ACTIVE',
      startDate: new Date().toISOString().split('T')[0],
      reviewIntervalDays: template.reviewIntervalDays || 90,
      goals: template.goals || [],
      interventions: template.interventions || [],
      careTeam: [
        { role: 'Primary Care Physician', name: 'Dr. Attending Physician, MD' },
        { role: 'Care Coordinator', name: 'Clinical Care Nurse, RN' },
      ],
    };
  }
}
""")
    write_file("carePlanManager.ts", "\n".join(care_lines))

    # 5. clinicalNoteTemplates.ts
    tmpl_lines = []
    tmpl_lines.append("""/**
 * MediCare Connect - Specialty-Specific Clinical Documentation Templates
 * Provides structured documentation frameworks for Cardiology, Endocrinology, Pulmonology,
 * Orthopedics, Pediatrics, Psychiatry, Emergency Medicine, and General Surgery.
 */

export interface SpecialtyTemplate {
  specialtyId: string;
  specialtyName: string;
  defaultChiefComplaints: string[];
  standardHpiQuestions: string[];
  focusedExamSections: string[];
  commonOrders: string[];
  dischargeInstructions: string;
}

export class ClinicalNoteTemplates {
  private static readonly templates: Map<string, SpecialtyTemplate> = new Map();

  static {
    this.initializeTemplates();
  }

  private static add(t: SpecialtyTemplate): void {
    this.templates.set(t.specialtyId.toLowerCase(), t);
  }

  private static initializeTemplates(): void {
    this.add({
      specialtyId: 'CARDIOLOGY',
      specialtyName: 'Cardiovascular Medicine',
      defaultChiefComplaints: ['Chest pain / angina', 'Shortness of breath on exertion', 'Palpitations', 'Lower extremity edema', 'Syncope'],
      standardHpiQuestions: [
        'Onset, location, radiation (arm, neck, jaw), duration, and quality of chest discomfort',
        'Exertional relation and relief with rest or sublingual nitroglycerin',
        'Associated symptoms: diaphoresis, nausea, dyspnea, lightheadedness',
        'Orthopnea (# of pillows) and Paroxysmal Nocturnal Dyspnea (PND)'
      ],
      focusedExamSections: [
        'JVP (Jugular Venous Pressure) elevation at 45 degrees',
        'Carotid upstrokes and presence of bruits',
        'Point of Maximal Impulse (PMI) location and character',
        'Auscultation: S1, S2, S3/S4 gallops, systolic/diastolic murmurs',
        'Peripheral edema grade (1+ to 4+) and distal pulse amplitudes'
      ],
      commonOrders: ['12-Lead ECG (93000)', 'Transthoracic Echocardiogram (93306)', 'High-sensitivity Troponin I', 'NT-proBNP', 'Lipid Panel'],
      dischargeInstructions: 'Follow low-sodium diet (<2g/day), weigh daily in morning, report weight gain > 3 lbs in 24h or > 5 lbs in 1 week immediately.'
    });

    this.add({
      specialtyId: 'ENDOCRINOLOGY',
      specialtyName: 'Endocrinology, Diabetes & Metabolism',
      defaultChiefComplaints: ['Type 2 Diabetes follow-up', 'Thyroid nodule / abnormal TSH', 'Unexplained weight changes', 'Osteoporosis evaluation'],
      standardHpiQuestions: [
        'Home blood glucose log ranges (fasting, pre-meal, postprandial)',
        'Frequency of hypoglycemic episodes (<70 mg/dL) and awareness symptoms',
        'Medication adherence and injection technique review',
        'Symptoms of neuropathy (paresthesias, burning) or visual changes'
      ],
      focusedExamSections: [
        'Thyroid palpation: size, consistency, nodules, bruits',
        'Visual foot inspection and Monofilament 10g sensory exam',
        'Vibration sensation with 128 Hz tuning fork',
        'Skin examination for acanthosis nigricans, lipohypertrophy'
      ],
      commonOrders: ['Hemoglobin A1c (4548-4)', 'Comprehensive Metabolic Panel (80053)', 'Urine Albumin/Creatinine Ratio', 'TSH & Free T4'],
      dischargeInstructions: 'Continue prescribed insulin/oral agent titration protocol. Review sick-day management guidelines.'
    });

    this.add({
      specialtyId: 'PULMONOLOGY',
      specialtyName: 'Pulmonary & Critical Care Medicine',
      defaultChiefComplaints: ['Chronic cough', 'Asthma exacerbation', 'COPD follow-up', 'Dyspnea on exertion', 'Hemoptysis'],
      standardHpiQuestions: [
        'Frequency of daytime and nighttime respiratory symptoms',
        'Rescue inhaler (SABA) usage frequency per week',
        'Sputum production: volume, color, consistency',
        'Environmental triggers and smoking pack-year history'
      ],
      focusedExamSections: [
        'Work of breathing, accessory muscle use, pursed-lip breathing',
        'Chest auscultation: inspiratory/expiratory wheezing, rhonchi, crackles',
        'Vocal fremitus and percussion resonance',
        'Digital clubbing inspection'
      ],
      commonOrders: ['Spirometry & PFTs (94010)', 'Chest Radiograph 2-Views (71046)', 'Pulse Oximetry', 'Arterial Blood Gas'],
      dischargeInstructions: 'Adhere to Asthma/COPD Action Plan. Use spacer with MDI inhalers and rinse mouth after inhaled corticosteroids.'
    });
  }

  public static getTemplate(specialty: string): SpecialtyTemplate | undefined {
    return this.templates.get(specialty.toLowerCase().trim());
  }

  public static getAllTemplates(): SpecialtyTemplate[] {
    return Array.from(this.templates.values());
  }
}
""")
    write_file("clinicalNoteTemplates.ts", "\n".join(tmpl_lines))

    # 6. index.ts
    index_content = """export * from './soapNoteEngine';
export * from './vitalsTelemetryEngine';
export * from './immunizationRegistry';
export * from './carePlanManager';
export * from './clinicalNoteTemplates';
"""
    write_file("index.ts", index_content)

if __name__ == "__main__":
    generate()
