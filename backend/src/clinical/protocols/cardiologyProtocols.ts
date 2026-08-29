/**
 * MediCare Connect - Specialty Clinical Protocols: Cardiovascular Medicine
 * Guidelines: ACC / AHA / ESC 2026 Clinical Practice Guidelines
 */

export interface ClinicalStep {
  stepNumber: number;
  phase: string;
  action: string;
  evidenceClass: 'I' | 'IIa' | 'IIb' | 'III';
  levelOfEvidence: 'A' | 'B-R' | 'B-NR' | 'C-LD' | 'C-EO';
  rationale: string;
}

export interface DiseaseProtocol {
  protocolId: string;
  conditionName: string;
  icd10Code: string;
  targetPopulation: string;
  exclusionCriteria: string[];
  initialEvaluationSteps: ClinicalStep[];
  pharmacotherapySteps: ClinicalStep[];
  lifestyleAndMonitoringSteps: ClinicalStep[];
  hospitalizationCriteria: string[];
}

export class CardiologyProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {
    this.add({
      protocolId: 'PROTO-CARDIO-STEMI',
      conditionName: 'Acute ST-Elevation Myocardial Infarction (STEMI)',
      icd10Code: 'I21.3',
      targetPopulation: 'Adult patients presenting with acute ischemic chest discomfort and persistent ST-segment elevation on ECG.',
      exclusionCriteria: ['Active non-compressible life-threatening hemorrhage for fibrinolysis', 'Do Not Resuscitate (DNR) palliative care order'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Emergency Triage & Diagnostics',
          action: 'Obtain and interpret 12-lead ECG within 10 minutes of first medical contact (FMC).',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Rapid identification of transmural ischemia is critical to minimize myocardial necrosis.'
        },
        {
          stepNumber: 2,
          phase: 'Diagnostic Biomarkers',
          action: 'Draw high-sensitivity cardiac Troponin I (hs-cTnI) and basic metabolic panel; do not delay reperfusion for results.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reperfusion therapy should proceed immediately based on ECG findings.'
        },
        {
          stepNumber: 3,
          phase: 'Continuous Telemetry',
          action: 'Attach continuous cardiac telemetry and pulse oximetry, establish dual large-bore IV access.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'High risk of lethal ventricular fibrillation in early acute infarction phase.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Antiplatelet Loading',
          action: 'Administer Aspirin 324 mg chewable orally plus Ticagrelor 180 mg loading dose (or Clopidogrel 600 mg).',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Dual antiplatelet therapy (DAPT) reduces acute stent thrombosis and recurrent ischemic events.'
        },
        {
          stepNumber: 2,
          phase: 'Anticoagulation',
          action: 'Administer unfractionated heparin (UFH) 60 units/kg IV bolus (max 4000 units) followed by infusion adjusted to target ACT 250-300 seconds.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Inhibits thrombin generation during primary percutaneous coronary intervention (PCI).'
        },
        {
          stepNumber: 3,
          phase: 'Lipid & Statin Therapy',
          action: 'Initiate high-intensity statin therapy (Atorvastatin 80 mg daily) as early as possible.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Plaque stabilization and anti-inflammatory pleiotropic vascular benefits.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Post-PCI Care',
          action: 'Monitor in Cardiac Intensive Care Unit (CICU) for at least 24 hours post-successful reperfusion.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Surveillance for reperfusion arrhythmias, acute stent thrombosis, or access site hematoma.'
        },
        {
          stepNumber: 2,
          phase: 'Echocardiography',
          action: 'Perform transthoracic echocardiogram (TTE) prior to discharge to evaluate Left Ventricular Ejection Fraction (LVEF).',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Guides indications for ACEi/ARB and mineralocorticoid receptor antagonists (MRA).'
        }
      ],
      hospitalizationCriteria: [
        'Confirmed ST-elevation on 12-lead ECG',
        'Hemodynamic instability or Cardiogenic Shock (Killip Class IV)',
        'Sustained Ventricular Tachycardia or Ventricular Fibrillation'
      ]
    });

    this.add({
      protocolId: 'PROTO-CARDIO-HFrEF',
      conditionName: 'Heart Failure with Reduced Ejection Fraction (HFrEF)',
      icd10Code: 'I50.22',
      targetPopulation: 'Adult clinical population presenting with features of Heart Failure with Reduced Ejection Fraction (HFrEF).',
      exclusionCriteria: ['End-stage hospice care', 'Anaphylactic allergy to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Assessment',
          action: 'Complete focused cardiovascular exam, baseline vitals, and ECG: GDMT Quadruple Therapy: ARNI + Beta-Blocker + MRA + SGLT2i.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Establishes diagnosis and baseline hemodynamics.'
        },
        {
          stepNumber: 2,
          phase: 'Laboratory & Imaging',
          action: 'Order targeted biomarker panel, metabolic chemistry, and diagnostic imaging.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Identifies end-organ involvement and therapeutic baseline.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Guideline-Directed Medical Therapy',
          action: 'Initiate first-line evidence-based pharmacotherapy tailored to renal function and hemodynamic status.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reduces mortality, prevents disease progression, and mitigates symptom burden.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Long-term Surveillance',
          action: 'Schedule structured follow-up at 2 weeks, 3 months, and annually with repeat metric checks.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Ensures therapeutic drug titration and detects early decompensation.'
        }
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or refractory symptoms',
        'Acute end-organ dysfunction (renal, hepatic, cerebral)',
        'High-risk telemetry arrhythmias'
      ]
    });
    this.add({
      protocolId: 'PROTO-CARDIO-AFIB',
      conditionName: 'Non-Valvular Atrial Fibrillation Management',
      icd10Code: 'I48.91',
      targetPopulation: 'Adult clinical population presenting with features of Non-Valvular Atrial Fibrillation Management.',
      exclusionCriteria: ['End-stage hospice care', 'Anaphylactic allergy to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Assessment',
          action: 'Complete focused cardiovascular exam, baseline vitals, and ECG: Rate vs Rhythm control, Stroke prophylaxis with DOAC per CHA2DS2-VASc.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Establishes diagnosis and baseline hemodynamics.'
        },
        {
          stepNumber: 2,
          phase: 'Laboratory & Imaging',
          action: 'Order targeted biomarker panel, metabolic chemistry, and diagnostic imaging.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Identifies end-organ involvement and therapeutic baseline.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Guideline-Directed Medical Therapy',
          action: 'Initiate first-line evidence-based pharmacotherapy tailored to renal function and hemodynamic status.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reduces mortality, prevents disease progression, and mitigates symptom burden.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Long-term Surveillance',
          action: 'Schedule structured follow-up at 2 weeks, 3 months, and annually with repeat metric checks.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Ensures therapeutic drug titration and detects early decompensation.'
        }
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or refractory symptoms',
        'Acute end-organ dysfunction (renal, hepatic, cerebral)',
        'High-risk telemetry arrhythmias'
      ]
    });
    this.add({
      protocolId: 'PROTO-CARDIO-HTN-CRISIS',
      conditionName: 'Hypertensive Emergency with Acute End-Organ Damage',
      icd10Code: 'I11.0',
      targetPopulation: 'Adult clinical population presenting with features of Hypertensive Emergency with Acute End-Organ Damage.',
      exclusionCriteria: ['End-stage hospice care', 'Anaphylactic allergy to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Assessment',
          action: 'Complete focused cardiovascular exam, baseline vitals, and ECG: IV Nicardipine / Labetalol titration with arterial line monitoring.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Establishes diagnosis and baseline hemodynamics.'
        },
        {
          stepNumber: 2,
          phase: 'Laboratory & Imaging',
          action: 'Order targeted biomarker panel, metabolic chemistry, and diagnostic imaging.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Identifies end-organ involvement and therapeutic baseline.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Guideline-Directed Medical Therapy',
          action: 'Initiate first-line evidence-based pharmacotherapy tailored to renal function and hemodynamic status.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reduces mortality, prevents disease progression, and mitigates symptom burden.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Long-term Surveillance',
          action: 'Schedule structured follow-up at 2 weeks, 3 months, and annually with repeat metric checks.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Ensures therapeutic drug titration and detects early decompensation.'
        }
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or refractory symptoms',
        'Acute end-organ dysfunction (renal, hepatic, cerebral)',
        'High-risk telemetry arrhythmias'
      ]
    });
    this.add({
      protocolId: 'PROTO-CARDIO-AORTIC-DISSECT',
      conditionName: 'Acute Type A/B Aortic Dissection',
      icd10Code: 'I71.01',
      targetPopulation: 'Adult clinical population presenting with features of Acute Type A/B Aortic Dissection.',
      exclusionCriteria: ['End-stage hospice care', 'Anaphylactic allergy to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Assessment',
          action: 'Complete focused cardiovascular exam, baseline vitals, and ECG: Immediate heart rate control <60 bpm and SBP <120 mmHg with IV Esmolol.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Establishes diagnosis and baseline hemodynamics.'
        },
        {
          stepNumber: 2,
          phase: 'Laboratory & Imaging',
          action: 'Order targeted biomarker panel, metabolic chemistry, and diagnostic imaging.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Identifies end-organ involvement and therapeutic baseline.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Guideline-Directed Medical Therapy',
          action: 'Initiate first-line evidence-based pharmacotherapy tailored to renal function and hemodynamic status.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reduces mortality, prevents disease progression, and mitigates symptom burden.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Long-term Surveillance',
          action: 'Schedule structured follow-up at 2 weeks, 3 months, and annually with repeat metric checks.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Ensures therapeutic drug titration and detects early decompensation.'
        }
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or refractory symptoms',
        'Acute end-organ dysfunction (renal, hepatic, cerebral)',
        'High-risk telemetry arrhythmias'
      ]
    });
    this.add({
      protocolId: 'PROTO-CARDIO-INF-ENDOCARD',
      conditionName: 'Infectious Endocarditis Duke Criteria Workup',
      icd10Code: 'I33.0',
      targetPopulation: 'Adult clinical population presenting with features of Infectious Endocarditis Duke Criteria Workup.',
      exclusionCriteria: ['End-stage hospice care', 'Anaphylactic allergy to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Assessment',
          action: 'Complete focused cardiovascular exam, baseline vitals, and ECG: Three sets of blood cultures, TEE imaging, and bactericidal synergy.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Establishes diagnosis and baseline hemodynamics.'
        },
        {
          stepNumber: 2,
          phase: 'Laboratory & Imaging',
          action: 'Order targeted biomarker panel, metabolic chemistry, and diagnostic imaging.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Identifies end-organ involvement and therapeutic baseline.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Guideline-Directed Medical Therapy',
          action: 'Initiate first-line evidence-based pharmacotherapy tailored to renal function and hemodynamic status.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reduces mortality, prevents disease progression, and mitigates symptom burden.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Long-term Surveillance',
          action: 'Schedule structured follow-up at 2 weeks, 3 months, and annually with repeat metric checks.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Ensures therapeutic drug titration and detects early decompensation.'
        }
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or refractory symptoms',
        'Acute end-organ dysfunction (renal, hepatic, cerebral)',
        'High-risk telemetry arrhythmias'
      ]
    });
    this.add({
      protocolId: 'PROTO-CARDIO-PERICARDITIS',
      conditionName: 'Acute Viral / Idiopathic Pericarditis',
      icd10Code: 'I30.9',
      targetPopulation: 'Adult clinical population presenting with features of Acute Viral / Idiopathic Pericarditis.',
      exclusionCriteria: ['End-stage hospice care', 'Anaphylactic allergy to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Assessment',
          action: 'Complete focused cardiovascular exam, baseline vitals, and ECG: High-dose Ibuprofen plus Colchicine for 3 months to prevent recurrence.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Establishes diagnosis and baseline hemodynamics.'
        },
        {
          stepNumber: 2,
          phase: 'Laboratory & Imaging',
          action: 'Order targeted biomarker panel, metabolic chemistry, and diagnostic imaging.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Identifies end-organ involvement and therapeutic baseline.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Guideline-Directed Medical Therapy',
          action: 'Initiate first-line evidence-based pharmacotherapy tailored to renal function and hemodynamic status.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reduces mortality, prevents disease progression, and mitigates symptom burden.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Long-term Surveillance',
          action: 'Schedule structured follow-up at 2 weeks, 3 months, and annually with repeat metric checks.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Ensures therapeutic drug titration and detects early decompensation.'
        }
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or refractory symptoms',
        'Acute end-organ dysfunction (renal, hepatic, cerebral)',
        'High-risk telemetry arrhythmias'
      ]
    });
    this.add({
      protocolId: 'PROTO-CARDIO-SYNCOPE',
      conditionName: 'Vasovagal vs Cardiac Syncope Risk Stratification',
      icd10Code: 'R55',
      targetPopulation: 'Adult clinical population presenting with features of Vasovagal vs Cardiac Syncope Risk Stratification.',
      exclusionCriteria: ['End-stage hospice care', 'Anaphylactic allergy to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Assessment',
          action: 'Complete focused cardiovascular exam, baseline vitals, and ECG: San Francisco Syncope Rule, orthostatic vitals, and telemetry monitoring.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Establishes diagnosis and baseline hemodynamics.'
        },
        {
          stepNumber: 2,
          phase: 'Laboratory & Imaging',
          action: 'Order targeted biomarker panel, metabolic chemistry, and diagnostic imaging.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Identifies end-organ involvement and therapeutic baseline.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Guideline-Directed Medical Therapy',
          action: 'Initiate first-line evidence-based pharmacotherapy tailored to renal function and hemodynamic status.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reduces mortality, prevents disease progression, and mitigates symptom burden.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Long-term Surveillance',
          action: 'Schedule structured follow-up at 2 weeks, 3 months, and annually with repeat metric checks.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Ensures therapeutic drug titration and detects early decompensation.'
        }
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or refractory symptoms',
        'Acute end-organ dysfunction (renal, hepatic, cerebral)',
        'High-risk telemetry arrhythmias'
      ]
    });
    this.add({
      protocolId: 'PROTO-CARDIO-HYPERTROPHIC',
      conditionName: 'Hypertrophic Cardiomyopathy (HCM)',
      icd10Code: 'I42.1',
      targetPopulation: 'Adult clinical population presenting with features of Hypertrophic Cardiomyopathy (HCM).',
      exclusionCriteria: ['End-stage hospice care', 'Anaphylactic allergy to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Assessment',
          action: 'Complete focused cardiovascular exam, baseline vitals, and ECG: LVOT gradient assessment, Mavacamten myosin inhibition, and ICD evaluation.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Establishes diagnosis and baseline hemodynamics.'
        },
        {
          stepNumber: 2,
          phase: 'Laboratory & Imaging',
          action: 'Order targeted biomarker panel, metabolic chemistry, and diagnostic imaging.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Identifies end-organ involvement and therapeutic baseline.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Guideline-Directed Medical Therapy',
          action: 'Initiate first-line evidence-based pharmacotherapy tailored to renal function and hemodynamic status.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reduces mortality, prevents disease progression, and mitigates symptom burden.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Long-term Surveillance',
          action: 'Schedule structured follow-up at 2 weeks, 3 months, and annually with repeat metric checks.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Ensures therapeutic drug titration and detects early decompensation.'
        }
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or refractory symptoms',
        'Acute end-organ dysfunction (renal, hepatic, cerebral)',
        'High-risk telemetry arrhythmias'
      ]
    });
    this.add({
      protocolId: 'PROTO-CARDIO-PAD',
      conditionName: 'Peripheral Artery Disease with Claudication',
      icd10Code: 'I73.9',
      targetPopulation: 'Adult clinical population presenting with features of Peripheral Artery Disease with Claudication.',
      exclusionCriteria: ['End-stage hospice care', 'Anaphylactic allergy to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Assessment',
          action: 'Complete focused cardiovascular exam, baseline vitals, and ECG: Cilostazol therapy, supervised exercise training, and ABI measurements.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Establishes diagnosis and baseline hemodynamics.'
        },
        {
          stepNumber: 2,
          phase: 'Laboratory & Imaging',
          action: 'Order targeted biomarker panel, metabolic chemistry, and diagnostic imaging.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Identifies end-organ involvement and therapeutic baseline.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Guideline-Directed Medical Therapy',
          action: 'Initiate first-line evidence-based pharmacotherapy tailored to renal function and hemodynamic status.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reduces mortality, prevents disease progression, and mitigates symptom burden.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Long-term Surveillance',
          action: 'Schedule structured follow-up at 2 weeks, 3 months, and annually with repeat metric checks.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Ensures therapeutic drug titration and detects early decompensation.'
        }
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or refractory symptoms',
        'Acute end-organ dysfunction (renal, hepatic, cerebral)',
        'High-risk telemetry arrhythmias'
      ]
    });
    this.add({
      protocolId: 'PROTO-CARDIO-DEEP-VEIN',
      conditionName: 'Acute Pulmonary Embolism with Right Heart Strain',
      icd10Code: 'I26.99',
      targetPopulation: 'Adult clinical population presenting with features of Acute Pulmonary Embolism with Right Heart Strain.',
      exclusionCriteria: ['End-stage hospice care', 'Anaphylactic allergy to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Assessment',
          action: 'Complete focused cardiovascular exam, baseline vitals, and ECG: PESI score stratification, bedside Echo, and systemic catheter thrombolysis.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Establishes diagnosis and baseline hemodynamics.'
        },
        {
          stepNumber: 2,
          phase: 'Laboratory & Imaging',
          action: 'Order targeted biomarker panel, metabolic chemistry, and diagnostic imaging.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Identifies end-organ involvement and therapeutic baseline.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Guideline-Directed Medical Therapy',
          action: 'Initiate first-line evidence-based pharmacotherapy tailored to renal function and hemodynamic status.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reduces mortality, prevents disease progression, and mitigates symptom burden.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Long-term Surveillance',
          action: 'Schedule structured follow-up at 2 weeks, 3 months, and annually with repeat metric checks.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Ensures therapeutic drug titration and detects early decompensation.'
        }
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or refractory symptoms',
        'Acute end-organ dysfunction (renal, hepatic, cerebral)',
        'High-risk telemetry arrhythmias'
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
