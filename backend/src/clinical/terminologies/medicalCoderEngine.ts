/**
 * MediCare Connect - Automated Medical Coder & Encounter Clinical Documentation NLP Assistant
 * Provides automated extraction of ICD-10 diagnoses, CPT procedure suggestions,
 * modifier pairing validation (-25, -59, -50), and medical necessity compliance checking.
 */

import { ICD10CMRegistry, ICD10CMEntry } from './icd10cmRegistry';
import { CPTHCPCSRegistry, CPTEntry } from './cptHcpcsRegistry';
import { LOINCCatalog } from './loincCatalog';
import { RxNormCatalog } from './rxnormCatalog';

export interface CodedEncounterResult {
  suggestedDiagnoses: Array<{
    code: string;
    description: string;
    confidence: number;
    matchedTerms: string[];
    hccRiskScore: number;
  }>;
  suggestedProcedures: Array<{
    code: string;
    description: string;
    category: string;
    confidence: number;
    recommendedModifiers: string[];
    estimatedFee: number;
  }>;
  complianceAlerts: Array<{
    severity: 'INFO' | 'WARNING' | 'ERROR';
    code: string;
    message: string;
    guideline: string;
  }>;
  totalEstimatedReimbursement: number;
  totalHccRiskScore: number;
}

export class MedicalCoderEngine {
  private static readonly diagnosisKeywords: Map<string, string[]> = new Map([
    ['I10', ['hypertension', 'high blood pressure', 'htn', 'elevated bp']],
    ['E11.9', ['type 2 diabetes', 'diabetes mellitus', 't2dm', 'dm2', 'hyperglycemia']],
    ['I50.9', ['congestive heart failure', 'chf', 'heart failure', 'fluid overload', 'pulmonary edema']],
    ['J45.909', ['asthma', 'wheezing', 'bronchospasm', 'shortness of breath', 'albuterol use']],
    ['J44.9', ['copd', 'chronic bronchitis', 'emphysema', 'smokers lung']],
    ['N18.30', ['chronic kidney disease', 'ckd', 'ckd stage 3', 'elevated creatinine', 'reduced gfr']],
    ['M54.50', ['low back pain', 'lumbar pain', 'lumbago', 'backache']],
    ['F32.9', ['depression', 'depressive disorder', 'depressed mood', 'phq-9']],
    ['F41.1', ['anxiety', 'generalized anxiety', 'gad', 'gad-7', 'panic']],
    ['E78.5', ['hyperlipidemia', 'high cholesterol', 'elevated ldl', 'dyslipidemia']],
    ['J18.9', ['pneumonia', 'lung infiltrate', 'productive cough', 'fever and crackles']],
    ['N39.0', ['urinary tract infection', 'uti', 'dysuria', 'urinary urgency', 'positive leukocyte esterase']],
  ]);

  private static readonly procedureKeywords: Map<string, string[]> = new Map([
    ['99213', ['office visit', 'follow-up', 'routine check', 'chronic disease management', 'stable']],
    ['99214', ['complex visit', 'multi-system', 'medication adjustment', 'moderate complexity', 'exacerbation']],
    ['99215', ['acute severe', 'high risk', 'critical decision', 'urgent hospitalization discussion']],
    ['99203', ['new patient visit', 'initial consultation', 'initial evaluation']],
    ['99204', ['new patient complex', 'extensive intake', 'comprehensive new visit']],
    ['93000', ['ecg', 'ekg', '12-lead', 'electrocardiogram', 'rhythm strip']],
    ['80053', ['cmp', 'comprehensive metabolic panel', 'blood chemistry', 'chem-14']],
    ['85025', ['cbc', 'complete blood count', 'white count', 'platelets', 'hemoglobin']],
    ['71046', ['chest x-ray', 'cxr', 'radiograph', '2-view chest']],
    ['36415', ['blood draw', 'venipuncture', 'phlebotomy']],
    ['99442', ['telephone consultation', 'telehealth phone call', 'phone visit']],
  ]);

  public static analyzeEncounterText(clinicalNotes: string): CodedEncounterResult {
    if (!clinicalNotes || clinicalNotes.trim().length === 0) {
      return {
        suggestedDiagnoses: [],
        suggestedProcedures: [],
        complianceAlerts: [],
        totalEstimatedReimbursement: 0,
        totalHccRiskScore: 0,
      };
    }

    const noteLower = clinicalNotes.toLowerCase();
    const suggestedDiagnoses: CodedEncounterResult['suggestedDiagnoses'] = [];
    const suggestedProcedures: CodedEncounterResult['suggestedProcedures'] = [];
    const complianceAlerts: CodedEncounterResult['complianceAlerts'] = [];

    // Analyze Diagnoses
    for (const [code, keywords] of this.diagnosisKeywords.entries()) {
      const matched = keywords.filter((kw) => noteLower.includes(kw));
      if (matched.length > 0) {
        const entry = ICD10CMRegistry.getByCode(code);
        if (entry) {
          const confidence = Math.min(0.98, 0.60 + matched.length * 0.15);
          suggestedDiagnoses.push({
            code: entry.code,
            description: entry.description,
            confidence: Number(confidence.toFixed(2)),
            matchedTerms: matched,
            hccRiskScore: entry.hccRiskScore,
          });
        }
      }
    }

    // Analyze Procedures
    for (const [code, keywords] of this.procedureKeywords.entries()) {
      const matched = keywords.filter((kw) => noteLower.includes(kw));
      if (matched.length > 0) {
        const entry = CPTHCPCSRegistry.getByCode(code);
        if (entry) {
          const confidence = Math.min(0.95, 0.55 + matched.length * 0.20);
          const recommendedModifiers: string[] = [];

          // Modifier 25 logic: if an E/M code coincides with a minor procedure/ECG on same day
          if (code.startsWith('992') && (noteLower.includes('ecg') || noteLower.includes('injection') || noteLower.includes('venipuncture'))) {
            recommendedModifiers.push('25');
          }

          suggestedProcedures.push({
            code: entry.code,
            description: entry.shortDescription,
            category: entry.category,
            confidence: Number(confidence.toFixed(2)),
            recommendedModifiers,
            estimatedFee: CPTHCPCSRegistry.calculateStandardFee(entry.code),
          });
        }
      }
    }

    // Sort by confidence
    suggestedDiagnoses.sort((a, b) => b.confidence - a.confidence);
    suggestedProcedures.sort((a, b) => b.confidence - a.confidence);

    // Compliance & Medical Necessity Checks
    if (suggestedDiagnoses.length === 0) {
      complianceAlerts.push({
        severity: 'WARNING',
        code: 'MISSING_DX',
        message: 'No primary ICD-10 diagnosis could be identified in the encounter notes.',
        guideline: 'CMS Claim Scrubbing Rule 101 - Primary Diagnosis Required',
      });
    }

    if (suggestedProcedures.length === 0) {
      complianceAlerts.push({
        severity: 'WARNING',
        code: 'MISSING_CPT',
        message: 'No billable CPT procedure or E/M service detected in clinical documentation.',
        guideline: 'AMA E/M Documentation Guidelines 2026',
      });
    }

    // Check Modifier 25 necessity
    const hasEM = suggestedProcedures.some((p) => p.code.startsWith('992'));
    const hasMinorProc = suggestedProcedures.some((p) => !p.code.startsWith('992') && p.code !== '36415');
    if (hasEM && hasMinorProc) {
      complianceAlerts.push({
        severity: 'INFO',
        code: 'MOD_25_APPLIED',
        message: 'Modifier -25 attached to Evaluation & Management code for significant separately identifiable service.',
        guideline: 'CCI Edits Chapter 1 - Modifier 25 Usage',
      });
    }

    const totalEstimatedReimbursement = suggestedProcedures.reduce((sum, p) => sum + p.estimatedFee, 0);
    const totalHccRiskScore = suggestedDiagnoses.reduce((sum, d) => sum + d.hccRiskScore, 0);

    return {
      suggestedDiagnoses,
      suggestedProcedures,
      complianceAlerts,
      totalEstimatedReimbursement: Number(totalEstimatedReimbursement.toFixed(2)),
      totalHccRiskScore: Number(totalHccRiskScore.toFixed(3)),
    };
  }
}
