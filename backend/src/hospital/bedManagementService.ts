/**
 * MediCare Connect - Hospital Inpatient Bed & Ward Management Service
 * Manages census tracking, bed turnover states, infection control isolation (Airborne, Contact, Droplet).
 */

export type BedStatus = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'CLEANING' | 'MAINTENANCE' | 'BLOCKED';
export type WardType = 'GENERAL_MED_SURG' | 'ICU' | 'CCU' | 'NICU' | 'PICU' | 'LABOR_DELIVERY' | 'PSYCHIATRIC' | 'STEP_DOWN' | 'EMERGENCY_OBS';
export type IsolationType = 'NONE' | 'AIRBORNE' | 'DROPLET' | 'CONTACT' | 'PROTECTIVE_ENVIRONMENT';

export interface HospitalBed {
  bedId: string;
  roomNumber: string;
  wing: string;
  floor: number;
  wardType: WardType;
  status: BedStatus;
  currentPatientId?: string;
  admissionDate?: string;
  isolationRequired: IsolationType;
  hasOxygen: boolean;
  hasVentilator: boolean;
  hasTelemetry: boolean;
  hasNegativePressure: boolean;
}

export class BedManagementService {
  private static readonly beds: Map<string, HospitalBed> = new Map();

  static {
    this.initializeBeds();
  }

  private static addBed(bed: HospitalBed): void {
    this.beds.set(bed.bedId, bed);
  }

  private static initializeBeds(): void {
    const wards: Array<{ type: WardType; floor: number; wing: string; count: number; hasVent: boolean; isIso: boolean }> = [
      { type: 'ICU', floor: 3, wing: 'North', count: 20, hasVent: true, isIso: true },
      { type: 'CCU', floor: 3, wing: 'South', count: 16, hasVent: true, isIso: false },
      { type: 'STEP_DOWN', floor: 4, wing: 'East', count: 24, hasVent: false, isIso: false },
      { type: 'GENERAL_MED_SURG', floor: 5, wing: 'West', count: 40, hasVent: false, isIso: false },
      { type: 'EMERGENCY_OBS', floor: 1, wing: 'Emergency', count: 20, hasVent: true, isIso: true },
    ];

    for (const w of wards) {
      for (let i = 1; i <= w.count; i++) {
        const bedId = `${w.type.substring(0, 3)}-${w.floor}${w.wing[0]}-${i.toString().padStart(2, '0')}`;
        this.addBed({
          bedId,
          roomNumber: `${w.floor}${i.toString().padStart(2, '0')}`,
          wing: w.wing,
          floor: w.floor,
          wardType: w.type,
          status: i % 4 === 0 ? 'AVAILABLE' : 'OCCUPIED',
          currentPatientId: i % 4 === 0 ? undefined : `PT-AUTOBED-${i}`,
          admissionDate: i % 4 === 0 ? undefined : '2026-08-27',
          isolationRequired: w.isIso && i === 1 ? 'AIRBORNE' : 'NONE',
          hasOxygen: true,
          hasVentilator: w.hasVent,
          hasTelemetry: w.type === 'ICU' || w.type === 'CCU' || w.type === 'STEP_DOWN',
          hasNegativePressure: w.isIso && i === 1,
        });
      }
    }
  }

  public static getAvailableBeds(wardType?: WardType, requiresTelemetry?: boolean, requiresIsolation?: IsolationType): HospitalBed[] {
    const results: HospitalBed[] = [];
    for (const bed of this.beds.values()) {
      if (bed.status !== 'AVAILABLE') continue;
      if (wardType && bed.wardType !== wardType) continue;
      if (requiresTelemetry && !bed.hasTelemetry) continue;
      if (requiresIsolation && requiresIsolation !== 'NONE' && bed.isolationRequired !== requiresIsolation) continue;
      results.push(bed);
    }
    return results;
  }

  public static assignBedToPatient(bedId: string, patientId: string): boolean {
    const bed = this.beds.get(bedId);
    if (!bed || bed.status !== 'AVAILABLE') return false;

    bed.status = 'OCCUPIED';
    bed.currentPatientId = patientId;
    bed.admissionDate = new Date().toISOString();
    return true;
  }

  public static dischargePatientFromBed(bedId: string): boolean {
    const bed = this.beds.get(bedId);
    if (!bed || bed.status !== 'OCCUPIED') return false;

    bed.status = 'CLEANING';
    bed.currentPatientId = undefined;
    bed.admissionDate = undefined;
    return true;
  }

  public static completeBedCleaning(bedId: string): boolean {
    const bed = this.beds.get(bedId);
    if (!bed) return false;
    bed.status = 'AVAILABLE';
    return true;
  }

  public static getWardCensusReport(): Record<WardType, { total: number; occupied: number; available: number; occupancyRatePercent: number }> {
    const report: any = {};
    for (const bed of this.beds.values()) {
      if (!report[bed.wardType]) {
        report[bed.wardType] = { total: 0, occupied: 0, available: 0, occupancyRatePercent: 0 };
      }
      report[bed.wardType].total += 1;
      if (bed.status === 'OCCUPIED') report[bed.wardType].occupied += 1;
      if (bed.status === 'AVAILABLE') report[bed.wardType].available += 1;
    }

    for (const key of Object.keys(report)) {
      const w = report[key];
      w.occupancyRatePercent = Number(((w.occupied / w.total) * 100).toFixed(1));
    }

    return report;
  }
}
