/**
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
