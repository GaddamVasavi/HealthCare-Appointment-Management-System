/**
 * MediCare Connect - Picture Archiving & Communication System (PACS) Bridge Simulator
 * Simulates DICOM C-FIND, C-MOVE query/retrieve, and web-based study viewer URL generation (WADO-RS).
 */

export interface DICOMStudy {
  studyInstanceUID: string;
  patientId: string;
  patientName: string;
  accessionNumber: string;
  studyDate: string;
  studyDescription: string;
  modalities: string[];
  numberOfSeries: number;
  numberOfInstances: number;
  referringPhysician: string;
}

export class PACSBridgeService {
  private static readonly studiesDatabase: Map<string, DICOMStudy> = new Map();

  static {
    this.studiesDatabase.set('1.2.840.113619.2.55.3.283116.1', {
      studyInstanceUID: '1.2.840.113619.2.55.3.283116.1',
      patientId: 'PT-10023',
      patientName: 'DOE^JOHN',
      accessionNumber: 'ACC-2026-9901',
      studyDate: '2026-08-25',
      studyDescription: 'CT CHEST W/ CONTRAST',
      modalities: ['CT'],
      numberOfSeries: 4,
      numberOfInstances: 420,
      referringPhysician: 'Dr. Sarah Jenkins, MD',
    });
  }

  public static findStudies(query: { patientId?: string; accessionNumber?: string; modality?: string }): DICOMStudy[] {
    const results: DICOMStudy[] = [];
    for (const study of this.studiesDatabase.values()) {
      if (query.patientId && study.patientId !== query.patientId) continue;
      if (query.accessionNumber && study.accessionNumber !== query.accessionNumber) continue;
      if (query.modality && !study.modalities.includes(query.modality)) continue;
      results.push(study);
    }
    return results;
  }

  public static generateWadoViewerUrl(studyInstanceUID: string): string {
    return `/viewer/dicom?studyUID=${encodeURIComponent(studyInstanceUID)}&token=auth_${Date.now().toString(36)}`;
  }
}
