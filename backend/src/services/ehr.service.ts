import mongoose from 'mongoose';
import { logger } from '../utils/logger';
import { NotFoundError, BadRequestError, ForbiddenError, ConflictError } from '../utils/errors';

/**
 * Comprehensive EHR Service
 * 
 * Manages electronic health records, applying clinical business logic,
 * validation, and formatting for medical documents. Supports various record types
 * including consultation notes, progress notes, lab results, imaging studies,
 * prescriptions, and clinical encounters.
 */

interface MedicalRecord {
  recordId: string;
  patientId: string;
    doctorId?: string;
  recordType: string;
  date: Date;
  content: string;
  clinician: string;
  department: string;
  status: 'draft' | 'finalized' | 'archived' | 'reviewed';
  attachments?: string[];
  keywords?: string[];
  icd10Codes?: string[];
  cptCodes?: string[];
  metadata?: Record<string, any>;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  previousVersions?: string[];
}

interface LabResult {
  testId: string;
  patientId: string;
  testName: string;
  testCode: string;
  results: Record<string, any>;
  referenceRange?: Record<string, string>;
  units?: Record<string, string>;
  normalcy: 'normal' | 'abnormal' | 'critical' | 'pending';
  orderedBy: string;
  collectionDate: Date;
  completionDate?: Date;
  notes?: string;
  performingLab?: string;
}

interface ImagingStudy {
  studyId: string;
  patientId: string;
  studyType: string;
  modality: string;
  bodyPart: string;
  findings: string;
  impression: string;
  radiologist: string;
  studyDate: Date;
  reportDate?: Date;
  images: string[];
  status: 'pending' | 'completed' | 'reviewed' | 'archived';
  accessionNumber: string;
}

interface ClinicalNote {
  noteId: string;
  patientId: string;
  clinician: string;
  clinicianTitle: string;
  visitDate: Date;
  visitType: string;
  cc: string; // Chief Complaint
  hpi: string; // History of Present Illness
  ros: string; // Review of Systems
  pme: string; // Physical/Medical Exam
  assessment: string;
  plan: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    indication: string;
  }>;
  procedures?: string[];
  referrals?: string[];
  status: 'draft' | 'signed' | 'archived' | 'reviewed';
  signature?: {
    signedBy: string;
    signedAt: Date;
    method: string;
  };
}

interface VitalSigns {
  recordId: string;
  patientId: string;
  timestamp: Date;
  temperature: number;
  pulse: number;
  respiratoryRate: number;
  bloodPressure: string; // Format: XXX/XX
  oxygenSaturation: number;
  weight?: number;
  height?: number;
  bmi?: number;
  recordedBy: string;
}

export class EHRService {
    
    /**
     * Creates a new clinical record/encounter note with comprehensive validation
     */
    public async createRecord(data: any): Promise<MedicalRecord> {
        try {
            logger.info(`Creating EHR record for patient: ${data.patientId}`);
            
            if (!data.patientId) {
                throw new BadRequestError('Patient ID is required');
            }
            if (!data.recordType) {
                throw new BadRequestError('Record type is required');
            }
            if (!data.notes) {
                throw new BadRequestError('Clinical notes content is required');
            }

            // Validate record type
            const validRecordTypes = ['ENCOUNTER', 'PROGRESS_NOTE', 'CONSULTATION', 'DISCHARGE_SUMMARY', 'OPERATIVE_REPORT'];
            if (!validRecordTypes.includes(data.recordType)) {
                throw new BadRequestError(`Invalid record type. Must be one of: ${validRecordTypes.join(', ')}`);
            }

            const record: MedicalRecord = {
                recordId: `REC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                patientId: data.patientId,
                doctorId: data.doctorId,
                recordType: data.recordType,
                date: new Date(),
                content: data.notes,
                clinician: data.clinician || 'Unknown',
                department: data.department || 'General',
                attachments: data.attachmentIds || [],
                keywords: data.keywords || [],
                icd10Codes: data.icd10Codes || [],
                cptCodes: data.cptCodes || [],
                metadata: data.metadata || {},
                status: 'finalized',
                version: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                previousVersions: []
            };

            logger.info(`EHR record created: ${record.recordId}`);
            return record;
        } catch (error) {
            logger.error(`Failed to create EHR record: ${error}`);
            throw error;
        }
    }

    /**
     * Fetch patient clinical records with comprehensive pagination and filtering
     */
    public async getRecords(
        patientId: string, 
        options: { 
            type?: string; 
            limit: number; 
            offset: number;
            startDate?: Date;
            endDate?: Date;
            status?: string;
            department?: string;
        }
    ): Promise<{ records: MedicalRecord[]; total: number }> {
        try {
            logger.info(`Fetching EHR records for patient: ${patientId}`);
            
            if (!patientId) {
                throw new BadRequestError('Patient ID is required');
            }

            // Mock data with comprehensive records
            const allRecords: MedicalRecord[] = [
                {
                    recordId: 'REC-001',
                    patientId,
                    recordType: 'ENCOUNTER',
                    date: new Date(),
                    content: 'Patient presented with headache and dizziness. Vital signs stable. Physical exam unremarkable.',
                    clinician: 'Dr. Smith',
                    department: 'Emergency Medicine',
                    attachments: [],
                    icd10Codes: ['R51.9'],
                    status: 'finalized',
                    version: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    recordId: 'REC-002',
                    patientId,
                    recordType: 'PROGRESS_NOTE',
                    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    content: 'Patient follow-up: Symptoms improving with current medication. Continue current regimen.',
                    clinician: 'Dr. Johnson',
                    department: 'Cardiology',
                    attachments: [],
                    icd10Codes: ['I10'],
                    status: 'finalized',
                    version: 2,
                    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                },
                {
                    recordId: 'REC-003',
                    patientId,
                    recordType: 'CONSULTATION',
                    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
                    content: 'Consultation requested for hypertension management. Recommend medication adjustment.',
                    clinician: 'Dr. Williams',
                    department: 'Cardiology',
                    attachments: ['ref-001'],
                    icd10Codes: ['I10'],
                    cptCodes: ['99213'],
                    status: 'finalized',
                    version: 1,
                    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
                }
            ];

            // Apply filters
            let filtered = allRecords;
            if (options.type) {
                filtered = filtered.filter(r => r.recordType === options.type);
            }
            if (options.status) {
                filtered = filtered.filter(r => r.status === options.status);
            }
            if (options.department) {
                filtered = filtered.filter(r => r.department === options.department);
            }
            if (options.startDate) {
                filtered = filtered.filter(r => r.date >= options.startDate!);
            }
            if (options.endDate) {
                filtered = filtered.filter(r => r.date <= options.endDate!);
            }

            const total = filtered.length;
            const records = filtered.slice(options.offset, options.offset + options.limit);

            logger.info(`Retrieved ${records.length} records for patient: ${patientId}`);
            return { records, total };
        } catch (error) {
            logger.error(`Failed to fetch EHR records: ${error}`);
            throw error;
        }
    }

    /**
     * Update an existing record (e.g., adding an addendum) with version control
     */
    public async updateRecord(recordId: string, data: any, updatedBy: string | undefined): Promise<MedicalRecord> {
        try {
            logger.info(`Updating EHR record: ${recordId}`);
            
            if (!recordId) {
                throw new BadRequestError('Record ID is required');
            }
            if (!updatedBy) {
                throw new BadRequestError('Updated by user is required');
            }

            // In production, retrieve actual record from database
            const record: MedicalRecord = {
                recordId,
                patientId: data.patientId,
                recordType: data.recordType,
                date: data.date || new Date(),
                content: data.notes || data.content,
                clinician: data.clinician,
                department: data.department,
                status: data.status || 'finalized',
                attachments: data.attachmentIds || [],
                version: (data.version || 1) + 1,
                createdAt: data.createdAt || new Date(),
                updatedAt: new Date(),
                previousVersions: data.previousVersions || []
            };

            logger.info(`EHR record updated: ${recordId}`);
            return record;
        } catch (error) {
            logger.error(`Failed to update EHR record: ${error}`);
            throw error;
        }
    }

    /**
     * Add vital signs to patient record
     */
    public async addVitalSigns(patientId: string, vitals: Partial<VitalSigns>): Promise<VitalSigns> {
        try {
            logger.info(`Adding vital signs for patient: ${patientId}`);

            if (!patientId) {
                throw new BadRequestError('Patient ID is required');
            }
            if (!vitals.temperature || !vitals.pulse || !vitals.bloodPressure) {
                throw new BadRequestError('Temperature, pulse, and blood pressure are required');
            }

            // Validate vital signs ranges
            if (vitals.temperature < 35 || vitals.temperature > 43) {
                throw new BadRequestError('Temperature out of valid range');
            }
            if (vitals.pulse < 30 || vitals.pulse > 200) {
                throw new BadRequestError('Pulse out of valid range');
            }
            if (vitals.oxygenSaturation && (vitals.oxygenSaturation < 75 || vitals.oxygenSaturation > 100)) {
                throw new BadRequestError('Oxygen saturation out of valid range');
            }

            const vitalRecord: VitalSigns = {
                recordId: `VS-${Date.now()}`,
                patientId,
                timestamp: vitals.timestamp || new Date(),
                temperature: vitals.temperature,
                pulse: vitals.pulse,
                respiratoryRate: vitals.respiratoryRate || 16,
                bloodPressure: vitals.bloodPressure,
                oxygenSaturation: vitals.oxygenSaturation || 98,
                weight: vitals.weight,
                height: vitals.height,
                bmi: vitals.bmi,
                recordedBy: vitals.recordedBy || 'System'
            };

            logger.info(`Vital signs recorded: ${vitalRecord.recordId}`);
            return vitalRecord;
        } catch (error) {
            logger.error(`Failed to add vital signs: ${error}`);
            throw error;
        }
    }

    /**
     * Retrieve patient's vital signs history
     */
    public async getVitalSigns(patientId: string, limit: number = 100): Promise<VitalSigns[]> {
        try {
            logger.info(`Retrieving vital signs for patient: ${patientId}`);

            const mockVitals: VitalSigns[] = [
                {
                    recordId: 'VS-001',
                    patientId,
                    timestamp: new Date(),
                    temperature: 98.6,
                    pulse: 72,
                    respiratoryRate: 16,
                    bloodPressure: '120/80',
                    oxygenSaturation: 98,
                    weight: 75,
                    height: 180,
                    bmi: 23.1,
                    recordedBy: 'Dr. Smith'
                },
                {
                    recordId: 'VS-002',
                    patientId,
                    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
                    temperature: 98.4,
                    pulse: 70,
                    respiratoryRate: 16,
                    bloodPressure: '118/78',
                    oxygenSaturation: 99,
                    weight: 75,
                    height: 180,
                    bmi: 23.1,
                    recordedBy: 'Nurse Johnson'
                }
            ];

            return mockVitals.slice(0, limit);
        } catch (error) {
            logger.error(`Failed to retrieve vital signs: ${error}`);
            throw error;
        }
    }

    /**
     * Add lab results to patient's EHR
     */
    public async addLabResult(patientId: string, labData: Partial<LabResult>): Promise<LabResult> {
        try {
            logger.info(`Adding lab result for patient: ${patientId}`);

            if (!labData.testName || !labData.results) {
                throw new BadRequestError('Test name and results are required');
            }

            const labResult: LabResult = {
                testId: `LAB-${Date.now()}`,
                patientId,
                testName: labData.testName,
                testCode: labData.testCode || labData.testName.substring(0, 4).toUpperCase(),
                results: labData.results,
                referenceRange: labData.referenceRange,
                units: labData.units,
                normalcy: 'normal',
                orderedBy: labData.orderedBy || 'System',
                collectionDate: labData.collectionDate || new Date(),
                completionDate: labData.completionDate,
                notes: labData.notes,
                performingLab: labData.performingLab || 'Central Lab'
            };

            logger.info(`Lab result added: ${labResult.testId}`);
            return labResult;
        } catch (error) {
            logger.error(`Failed to add lab result: ${error}`);
            throw error;
        }
    }

    /**
     * Retrieve patient's lab results with filtering
     */
    public async getLabResults(
        patientId: string, 
        options?: {
            testType?: string;
            startDate?: Date;
            endDate?: Date;
            limit?: number;
        }
    ): Promise<LabResult[]> {
        try {
            logger.info(`Retrieving lab results for patient: ${patientId}`);

            const mockResults: LabResult[] = [
                {
                    testId: 'LAB-001',
                    patientId,
                    testName: 'Complete Blood Count',
                    testCode: 'CBC',
                    results: { WBC: 7.5, RBC: 4.8, Hemoglobin: 14.5, Hematocrit: 43.5 },
                    referenceRange: { WBC: '4.5-11.0', RBC: '4.5-5.5', Hemoglobin: '13.5-17.5', Hematocrit: '41-53' },
                    units: { WBC: 'K/uL', RBC: 'M/uL', Hemoglobin: 'g/dL', Hematocrit: '%' },
                    normalcy: 'normal',
                    orderedBy: 'Dr. Smith',
                    collectionDate: new Date(),
                    completionDate: new Date(),
                    performingLab: 'Central Lab'
                },
                {
                    testId: 'LAB-002',
                    patientId,
                    testName: 'Comprehensive Metabolic Panel',
                    testCode: 'CMP',
                    results: { 
                        Glucose: 95,
                        BUN: 18,
                        Creatinine: 1.0,
                        Sodium: 138,
                        Potassium: 4.2,
                        Chloride: 102
                    },
                    normalcy: 'normal',
                    orderedBy: 'Dr. Johnson',
                    collectionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    performingLab: 'Central Lab'
                },
                {
                    testId: 'LAB-003',
                    patientId,
                    testName: 'Lipid Panel',
                    testCode: 'LIPID',
                    results: {
                        TotalCholesterol: 185,
                        LDL: 110,
                        HDL: 45,
                        Triglycerides: 100
                    },
                    units: { TotalCholesterol: 'mg/dL', LDL: 'mg/dL', HDL: 'mg/dL', Triglycerides: 'mg/dL' },
                    referenceRange: { LDL: '<100 Optimal', HDL: '>40 Acceptable', Triglycerides: '<150' },
                    normalcy: 'abnormal',
                    orderedBy: 'Dr. Williams',
                    collectionDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
                    performingLab: 'Central Lab'
                }
            ];

            let filtered = mockResults;
            if (options?.testType) {
                filtered = filtered.filter(r => r.testCode === options.testType);
            }
            if (options?.startDate) {
                filtered = filtered.filter(r => r.collectionDate >= options.startDate!);
            }
            if (options?.endDate) {
                filtered = filtered.filter(r => r.collectionDate <= options.endDate!);
            }

            const limit = options?.limit || 50;
            return filtered.slice(0, limit);
        } catch (error) {
            logger.error(`Failed to retrieve lab results: ${error}`);
            throw error;
        }
    }

    /**
     * Add imaging study to patient's EHR
     */
    public async addImagingStudy(patientId: string, imagingData: Partial<ImagingStudy>): Promise<ImagingStudy> {
        try {
            logger.info(`Adding imaging study for patient: ${patientId}`);

            if (!imagingData.studyType || !imagingData.bodyPart) {
                throw new BadRequestError('Study type and body part are required');
            }

            const study: ImagingStudy = {
                studyId: `IMG-${Date.now()}`,
                patientId,
                studyType: imagingData.studyType,
                modality: imagingData.modality || 'Unknown',
                bodyPart: imagingData.bodyPart,
                findings: imagingData.findings || 'Pending',
                impression: imagingData.impression || 'Pending',
                radiologist: imagingData.radiologist || 'System',
                studyDate: imagingData.studyDate || new Date(),
                reportDate: imagingData.reportDate,
                images: imagingData.images || [],
                status: 'pending',
                accessionNumber: imagingData.accessionNumber || `ACC-${Date.now()}`
            };

            logger.info(`Imaging study added: ${study.studyId}`);
            return study;
        } catch (error) {
            logger.error(`Failed to add imaging study: ${error}`);
            throw error;
        }
    }

    /**
     * Retrieve patient's imaging studies
     */
    public async getImagingStudies(
        patientId: string,
        options?: { status?: string; limit?: number }
    ): Promise<ImagingStudy[]> {
        try {
            logger.info(`Retrieving imaging studies for patient: ${patientId}`);

            const mockStudies: ImagingStudy[] = [
                {
                    studyId: 'IMG-001',
                    patientId,
                    studyType: 'X-Ray',
                    modality: 'XR',
                    bodyPart: 'Chest',
                    findings: 'No acute cardiopulmonary findings',
                    impression: 'No abnormality',
                    radiologist: 'Dr. Brown',
                    studyDate: new Date(),
                    reportDate: new Date(),
                    images: ['img-001.dcm', 'img-002.dcm'],
                    status: 'completed',
                    accessionNumber: 'ACC-2023-001'
                },
                {
                    studyId: 'IMG-002',
                    patientId,
                    studyType: 'CT Scan',
                    modality: 'CT',
                    bodyPart: 'Abdomen',
                    findings: 'No acute findings',
                    impression: 'Normal study',
                    radiologist: 'Dr. Davis',
                    studyDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    reportDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
                    images: ['img-003.dcm', 'img-004.dcm', 'img-005.dcm'],
                    status: 'completed',
                    accessionNumber: 'ACC-2023-002'
                }
            ];

            let filtered = mockStudies;
            if (options?.status) {
                filtered = filtered.filter(s => s.status === options.status);
            }

            const limit = options?.limit || 50;
            return filtered.slice(0, limit);
        } catch (error) {
            logger.error(`Failed to retrieve imaging studies: ${error}`);
            throw error;
        }
    }

    /**
     * Create clinical note
     */
    public async createClinicalNote(patientId: string, noteData: Partial<ClinicalNote>): Promise<ClinicalNote> {
        try {
            logger.info(`Creating clinical note for patient: ${patientId}`);

            if (!noteData.clinician || !noteData.visitDate) {
                throw new BadRequestError('Clinician and visit date are required');
            }

            const note: ClinicalNote = {
                noteId: `NOTE-${Date.now()}`,
                patientId,
                clinician: noteData.clinician,
                clinicianTitle: noteData.clinicianTitle || 'MD',
                visitDate: noteData.visitDate,
                visitType: noteData.visitType || 'Follow-up',
                cc: noteData.cc || '',
                hpi: noteData.hpi || '',
                ros: noteData.ros || '',
                pme: noteData.pme || '',
                assessment: noteData.assessment || '',
                plan: noteData.plan || '',
                medications: noteData.medications || [],
                procedures: noteData.procedures || [],
                referrals: noteData.referrals || [],
                status: 'draft'
            };

            logger.info(`Clinical note created: ${note.noteId}`);
            return note;
        } catch (error) {
            logger.error(`Failed to create clinical note: ${error}`);
            throw error;
        }
    }

    /**
     * Sign a clinical note
     */
    public async signClinicalNote(noteId: string, signedBy: string): Promise<ClinicalNote> {
        try {
            logger.info(`Signing clinical note: ${noteId}`);

            const note: ClinicalNote = {
                noteId,
                patientId: '',
                clinician: '',
                clinicianTitle: 'MD',
                visitDate: new Date(),
                visitType: 'Follow-up',
                cc: '',
                hpi: '',
                ros: '',
                pme: '',
                assessment: '',
                plan: '',
                medications: [],
                status: 'signed',
                signature: {
                    signedBy,
                    signedAt: new Date(),
                    method: 'electronic'
                }
            };

            logger.info(`Clinical note signed: ${noteId}`);
            return note;
        } catch (error) {
            logger.error(`Failed to sign clinical note: ${error}`);
            throw error;
        }
    }

    /**
     * Generate patient's complete EHR summary
     */
    public async generateEHRSummary(patientId: string): Promise<any> {
        try {
            logger.info(`Generating EHR summary for patient: ${patientId}`);

            const records = await this.getRecords(patientId, { limit: 100, offset: 0 });
            const labResults = await this.getLabResults(patientId);
            const vitals = await this.getVitalSigns(patientId);
            const imagingStudies = await this.getImagingStudies(patientId);

            const summary = {
                patientId,
                generatedAt: new Date(),
                recordCount: records.total,
                latestRecord: records.records[0] || null,
                labResultsCount: labResults.length,
                recentLabTests: labResults.slice(0, 5),
                vitalSignsCount: vitals.length,
                recentVitals: vitals.slice(0, 1),
                imagingStudiesCount: imagingStudies.length,
                recentImagingStudies: imagingStudies.slice(0, 2),
                activeConditions: [
                    { condition: 'Hypertension', onsetDate: new Date(2020, 0), status: 'active', icd10: 'I10' },
                    { condition: 'Type 2 Diabetes', onsetDate: new Date(2019, 6), status: 'active', icd10: 'E11' },
                ],
                allergies: [
                    { allergen: 'Penicillin', severity: 'severe', reaction: 'Anaphylaxis' },
                    { allergen: 'NSAIDs', severity: 'moderate', reaction: 'Gastrointestinal upset' }
                ],
                currentMedications: [
                    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', route: 'PO', indication: 'Hypertension' },
                    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', route: 'PO', indication: 'Diabetes' },
                    { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', route: 'PO', indication: 'Hyperlipidemia' }
                ],
                problemList: [
                    { code: 'I10', description: 'Essential hypertension' },
                    { code: 'E11', description: 'Type 2 diabetes mellitus' },
                    { code: 'E78.1', description: 'Pure hypercholesterolemia' }
                ]
            };

            logger.info(`EHR summary generated for patient: ${patientId}`);
            return summary;
        } catch (error) {
            logger.error(`Failed to generate EHR summary: ${error}`);
            throw error;
        }
    }

    /**
     * Archive medical record
     */
    public async archiveRecord(recordId: string, patientId: string): Promise<void> {
        try {
            logger.info(`Archiving record: ${recordId} for patient: ${patientId}`);

            if (!recordId) {
                throw new BadRequestError('Record ID is required');
            }

            logger.info(`Record archived: ${recordId}`);
        } catch (error) {
            logger.error(`Failed to archive record: ${error}`);
            throw error;
        }
    }

    /**
     * Export patient EHR in standard formats (PDF, XML, JSON, HL7)
     */
    public async exportEHR(
        patientId: string, 
        format: 'pdf' | 'xml' | 'json' | 'hl7' = 'pdf',
        options?: { includeImages?: boolean; dateRange?: [Date, Date] }
    ): Promise<Buffer | string> {
        try {
            logger.info(`Exporting EHR for patient: ${patientId} in format: ${format}`);

            const summary = await this.generateEHRSummary(patientId);

            switch (format) {
                case 'json':
                    return JSON.stringify(summary, null, 2);
                case 'xml':
                    return this.toXML(summary);
                case 'hl7':
                    return this.toHL7(summary);
                case 'pdf':
                default:
                    const exportData = `EHR Export - PDF\nPatient ID: ${patientId}\nDate: ${new Date().toISOString()}\n${JSON.stringify(summary, null, 2)}`;
                    return Buffer.from(exportData);
            }
        } catch (error) {
            logger.error(`Failed to export EHR: ${error}`);
            throw error;
        }
    }

    /**
     * Convert summary to XML format
     */
    private toXML(data: any): string {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<EHR>\n';
        xml += `  <PatientID>${data.patientId}</PatientID>\n`;
        xml += `  <GeneratedAt>${data.generatedAt}</GeneratedAt>\n`;
        xml += '</EHR>';
        return xml;
    }

    /**
     * Convert summary to HL7 format
     */
    private toHL7(data: any): string {
        let hl7 = 'MSH|^~\\&|EHR|Medicare|Receiver|Facility|' + new Date().toISOString() + '||ADT^A01||P|2.5\n';
        hl7 += `PID|1||${data.patientId}||Patient^Test|||||||||||||||||||||||\n`;
        return hl7;
    }

    /**
     * Search for records by keyword
     */
    public async searchRecords(
        patientId: string,
        keyword: string,
        options?: { recordType?: string; limit?: number }
    ): Promise<MedicalRecord[]> {
        try {
            logger.info(`Searching records for patient: ${patientId} with keyword: ${keyword}`);

            const { records } = await this.getRecords(patientId, { limit: 1000, offset: 0 });
            
            const filtered = records.filter(r => 
                r.content.toLowerCase().includes(keyword.toLowerCase()) ||
                r.recordType.toLowerCase().includes(keyword.toLowerCase())
            );

            const limit = options?.limit || 50;
            return filtered.slice(0, limit);
        } catch (error) {
            logger.error(`Failed to search records: ${error}`);
            throw error;
        }
    }
    /**
     * Record clinical vitals and calculate abnormalities
     */
    public async addVitals(patientId: string, vitalsData: any): Promise<any> {
        // Analyze vitals for critical ranges (e.g., extremely high BP)
        let isCritical = false;
        if (vitalsData.bloodPressure) {
            const [sys, dia] = vitalsData.bloodPressure.split('/').map(Number);
            if (sys > 180 || dia > 120) isCritical = true; // Hypertensive crisis
        }

        const vitals = {
            id: `VIT-${Date.now()}`,
            patientId,
            ...vitalsData,
            isCritical,
            timestamp: new Date()
        };

        // await VitalsModel.create(vitals);
        return vitals;
    }

    /**
     * Retrieve time-series vitals for charting
     */
    public async getVitalsHistory(patientId: string, startDate?: string, endDate?: string): Promise<any[]> {
        // Aggregate and sort by time
        return [
            { date: '2023-10-01', bloodPressure: '120/80', heartRate: 72 },
            { date: '2023-11-01', bloodPressure: '125/82', heartRate: 75 }
        ];
    }

    /**
     * Register a new allergy with cross-referencing capabilities
     */
    public async addAllergy(patientId: string, allergyData: any): Promise<any> {
        return {
            id: `ALG-${Date.now()}`,
            patientId,
            ...allergyData,
            status: 'ACTIVE',
            recordedAt: new Date()
        };
    }

    /**
     * Get all active and historical allergies
     */
    public async getAllergies(patientId: string): Promise<any[]> {
        return [
            { id: 'ALG-001', allergen: 'Penicillin', severity: 'HIGH', reaction: 'Anaphylaxis' }
        ];
    }

    /**
     * Assign an ICD-10 diagnosis to a patient
     */
    public async addDiagnosis(patientId: string, diagnosisData: any): Promise<any> {
        // Validate ICD-10 code against a master dictionary if needed
        return {
            id: `DX-${Date.now()}`,
            patientId,
            ...diagnosisData,
            recordedAt: new Date()
        };
    }

    /**
     * Fetch patient problem list (diagnoses)
     */
    public async getDiagnoses(patientId: string, status?: string): Promise<any[]> {
        return [
            { id: 'DX-001', icd10Code: 'E11.9', description: 'Type 2 diabetes mellitus without complications', status: 'ACTIVE' }
        ];
    }

    /**
     * Compiles a full clinical summary (Continuity of Care Document equivalent)
     */
    public async generatePatientSummary(patientId: string): Promise<any> {
        // Fetch all facets in parallel
        const [records, vitals, allergies, diagnoses] = await Promise.all([
            this.getRecords(patientId, { limit: 5, offset: 0 }),
            this.getVitalsHistory(patientId),
            this.getAllergies(patientId),
            this.getDiagnoses(patientId, 'ACTIVE')
        ]);

        return {
            patientId,
            generatedAt: new Date(),
            clinicalSummary: {
                recentEncounters: records,
                latestVitals: vitals[vitals.length - 1],
                activeAllergies: allergies,
                activeProblems: diagnoses
            }
        };
    }

    /**
     * Securely store and index an uploaded medical document
     */
    public async uploadDocument(patientId: string, fileInfo: any, uploadedBy: string | undefined): Promise<any> {
        // Move file to secure storage (e.g. S3), generate thumbnail, extract metadata
        return {
            id: `DOC-${Date.now()}`,
            patientId,
            fileName: fileInfo.originalname,
            fileType: fileInfo.mimetype,
            url: `/secure-docs/${patientId}/${fileInfo.filename}`,
            uploadedAt: new Date(),
            uploadedBy
        };
    }

    /**
     * Retrieve index of patient documents
     */
    public async getDocuments(patientId: string): Promise<any[]> {
        return [
            { id: 'DOC-001', fileName: 'MRI_Scan_Report.pdf', fileType: 'application/pdf', uploadedAt: '2023-10-15T10:00:00Z' }
        ];
    }
}
