#!/usr/bin/env python3
"""
Generator for Hospital Facility Operations & ERP Services:
- backend/src/hospital/bedManagementService.ts
- backend/src/hospital/operatingRoomScheduler.ts
- backend/src/hospital/bloodBankService.ts
- backend/src/hospital/pharmacyInventoryService.ts
- backend/src/hospital/nursingRosterService.ts
- backend/src/hospital/index.ts
"""

import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
HOSP_DIR = os.path.join(BASE_DIR, "backend", "src", "hospital")
os.makedirs(HOSP_DIR, exist_ok=True)

def write_file(filepath, content):
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {os.path.relpath(filepath, BASE_DIR)}: {len(content.splitlines())} lines")

def generate():
    # 1. bedManagementService.ts
    bed_code = """/**
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
"""
    write_file(os.path.join(HOSP_DIR, "bedManagementService.ts"), bed_code)

    # 2. operatingRoomScheduler.ts
    or_code = """/**
 * MediCare Connect - Operating Room (OR) Suite Scheduling & Turnover Optimizer
 */

export interface ORSuite {
  suiteId: string;
  name: string;
  floor: number;
  isSpecializedHeartSuite: boolean;
  isRoboticDaVinciReady: boolean;
  isLaminarAirflow: boolean;
}

export interface SurgicalBooking {
  bookingId: string;
  suiteId: string;
  patientId: string;
  primarySurgeonId: string;
  anesthesiologistId: string;
  procedureName: string;
  cptCode: string;
  scheduledStart: string;
  estimatedDurationMinutes: number;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  turnoverTimeMinutes: number;
}

export class OperatingRoomScheduler {
  private static readonly suites: Map<string, ORSuite> = new Map([
    ['OR-1', { suiteId: 'OR-1', name: 'Main Surgical Suite 1 (Cardiothoracic)', floor: 2, isSpecializedHeartSuite: true, isRoboticDaVinciReady: true, isLaminarAirflow: true }],
    ['OR-2', { suiteId: 'OR-2', name: 'Main Surgical Suite 2 (Orthopedics)', floor: 2, isSpecializedHeartSuite: false, isRoboticDaVinciReady: false, isLaminarAirflow: true }],
    ['OR-3', { suiteId: 'OR-3', name: 'Main Surgical Suite 3 (General / Laparoscopic)', floor: 2, isSpecializedHeartSuite: false, isRoboticDaVinciReady: true, isLaminarAirflow: false }],
    ['OR-4', { suiteId: 'OR-4', name: 'Main Surgical Suite 4 (Neurosurgery)', floor: 2, isSpecializedHeartSuite: false, isRoboticDaVinciReady: false, isLaminarAirflow: true }],
    ['OR-5', { suiteId: 'OR-5', name: 'Emergency Trauma Surgical Suite', floor: 1, isSpecializedHeartSuite: true, isRoboticDaVinciReady: false, isLaminarAirflow: true }],
  ]);

  private static readonly bookings: Map<string, SurgicalBooking> = new Map();

  public static bookSurgery(booking: SurgicalBooking): { success: boolean; message: string } {
    if (!this.suites.has(booking.suiteId)) {
      return { success: false, message: `Operating Room Suite ${booking.suiteId} not found.` };
    }

    this.bookings.set(booking.bookingId, booking);
    return { success: true, message: 'Surgery scheduled successfully.' };
  }

  public static getSuites(): ORSuite[] {
    return Array.from(this.suites.values());
  }

  public static getBookingsForSuite(suiteId: string): SurgicalBooking[] {
    return Array.from(this.bookings.values()).filter((b) => b.suiteId === suiteId);
  }
}
"""
    write_file(os.path.join(HOSP_DIR, "operatingRoomScheduler.ts"), or_code)

    # 3. bloodBankService.ts
    blood_code = """/**
 * MediCare Connect - Hospital Blood Bank Inventory & Cross-Matching Compatibility Matrix
 */

export type BloodGroup = 'A_POS' | 'A_NEG' | 'B_POS' | 'B_NEG' | 'AB_POS' | 'AB_NEG' | 'O_POS' | 'O_NEG';
export type BloodComponent = 'PACKED_RBC' | 'FRESH_FROZEN_PLASMA' | 'PLATELETS' | 'CRYOPRECIPITATE';

export interface BloodUnit {
  unitId: string;
  bloodGroup: BloodGroup;
  component: BloodComponent;
  collectionDate: string;
  expirationDate: string;
  isCrossMatched: boolean;
  reservedForPatientId?: string;
  storageLocation: string;
}

export class BloodBankService {
  private static readonly inventory: Map<string, BloodUnit> = new Map();

  static {
    this.initializeMockUnits();
  }

  private static initializeMockUnits(): void {
    const groups: BloodGroup[] = ['A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'AB_POS', 'AB_NEG', 'O_POS', 'O_NEG'];
    for (const g of groups) {
      for (let i = 1; i <= 8; i++) {
        const unitId = `BLD-${g}-${i.toString().padStart(3, '0')}`;
        this.inventory.set(unitId, {
          unitId,
          bloodGroup: g,
          component: 'PACKED_RBC',
          collectionDate: '2026-08-10',
          expirationDate: '2026-09-21',
          isCrossMatched: false,
          storageLocation: 'Blood Bank Refrigerator #2, Shelf A',
        });
      }
    }
  }

  public static isRBCCompatible(donorGroup: BloodGroup, recipientGroup: BloodGroup): boolean {
    // Universal donor is O_NEG, universal recipient is AB_POS
    if (donorGroup === 'O_NEG') return true;
    if (recipientGroup === 'AB_POS') return true;
    if (donorGroup === recipientGroup) return true;

    if (recipientGroup === 'A_POS') return ['A_POS', 'A_NEG', 'O_POS', 'O_NEG'].includes(donorGroup);
    if (recipientGroup === 'A_NEG') return ['A_NEG', 'O_NEG'].includes(donorGroup);
    if (recipientGroup === 'B_POS') return ['B_POS', 'B_NEG', 'O_POS', 'O_NEG'].includes(donorGroup);
    if (recipientGroup === 'B_NEG') return ['B_NEG', 'O_NEG'].includes(donorGroup);
    if (recipientGroup === 'AB_NEG') return ['A_NEG', 'B_NEG', 'AB_NEG', 'O_NEG'].includes(donorGroup);
    if (recipientGroup === 'O_POS') return ['O_POS', 'O_NEG'].includes(donorGroup);

    return false;
  }

  public static getAvailableCompatibleUnits(recipientGroup: BloodGroup, component: BloodComponent = 'PACKED_RBC'): BloodUnit[] {
    const results: BloodUnit[] = [];
    for (const unit of this.inventory.values()) {
      if (unit.isCrossMatched || unit.reservedForPatientId) continue;
      if (unit.component === component && this.isRBCCompatible(unit.bloodGroup, recipientGroup)) {
        results.push(unit);
      }
    }
    return results;
  }
}
"""
    write_file(os.path.join(HOSP_DIR, "bloodBankService.ts"), blood_code)

    # 4. pharmacyInventoryService.ts
    pharm_code = """/**
 * MediCare Connect - Hospital Pharmacy Inventory & Formulary Management
 */

export interface FormularyItem {
  itemCode: string;
  genericName: string;
  brandName: string;
  dosageForm: string;
  strength: string;
  quantityOnHand: number;
  reorderThreshold: number;
  unitCostUSD: number;
  isRefrigerated: boolean;
  deaSchedule: string;
  lotNumber: string;
  expirationDate: string;
}

export class PharmacyInventoryService {
  private static readonly items: Map<string, FormularyItem> = new Map();

  static {
    this.initializeFormulary();
  }

  private static initializeFormulary(): void {
    this.items.set('MED-001', {
      itemCode: 'MED-001',
      genericName: 'Metformin HCl',
      brandName: 'Glucophage',
      dosageForm: 'Tablet',
      strength: '500 mg',
      quantityOnHand: 4500,
      reorderThreshold: 1000,
      unitCostUSD: 0.12,
      isRefrigerated: false,
      deaSchedule: 'NONE',
      lotNumber: 'LOT-99201A',
      expirationDate: '2027-12-31',
    });

    this.items.set('MED-002', {
      itemCode: 'MED-002',
      genericName: 'Insulin Glargine',
      brandName: 'Lantus',
      dosageForm: 'Subcutaneous Solution Pen',
      strength: '100 units/mL (3 mL)',
      quantityOnHand: 180,
      reorderThreshold: 50,
      unitCostUSD: 45.00,
      isRefrigerated: true,
      deaSchedule: 'NONE',
      lotNumber: 'LOT-GLARG-881',
      expirationDate: '2027-06-30',
    });
  }

  public static getLowStockAlerts(): FormularyItem[] {
    return Array.from(this.items.values()).filter((item) => item.quantityOnHand <= item.reorderThreshold);
  }

  public static adjustInventory(itemCode: string, delta: number): boolean {
    const item = this.items.get(itemCode);
    if (!item) return false;
    item.quantityOnHand += delta;
    return true;
  }
}
"""
    write_file(os.path.join(HOSP_DIR, "pharmacyInventoryService.ts"), pharm_code)

    # 5. nursingRosterService.ts
    nurse_code = """/**
 * MediCare Connect - Acuity-Based Nursing Staffing & Shift Roster Manager
 */

export interface NurseStaffMember {
  nurseId: string;
  name: string;
  licenseNumber: string;
  qualification: 'RN' | 'BSN' | 'MSN' | 'NP' | 'LPN';
  assignedWard: string;
  shiftType: 'DAY_12H' | 'NIGHT_12H' | 'DAY_8H' | 'EVENING_8H';
  maxPatientAcuityCapacity: number;
}

export class NursingRosterService {
  private static readonly nurses: Map<string, NurseStaffMember> = new Map();

  static {
    this.initializeStaff();
  }

  private static initializeStaff(): void {
    for (let i = 1; i <= 25; i++) {
      const nurseId = `NURSE-${i.toString().padStart(3, '0')}`;
      this.nurses.set(nurseId, {
        nurseId,
        name: `Registered Nurse #${i}, BSN, RN`,
        licenseNumber: `RN-NY-${99000 + i}`,
        qualification: i % 5 === 0 ? 'MSN' : 'BSN',
        assignedWard: i <= 10 ? 'ICU' : 'GENERAL_MED_SURG',
        shiftType: i % 2 === 0 ? 'DAY_12H' : 'NIGHT_12H',
        maxPatientAcuityCapacity: i <= 10 ? 2 : 5, // ICU ratio 1:2, Med-Surg 1:5
      });
    }
  }

  public static getNursesForWard(ward: string): NurseStaffMember[] {
    return Array.from(this.nurses.values()).filter((n) => n.assignedWard === ward);
  }
}
"""
    write_file(os.path.join(HOSP_DIR, "nursingRosterService.ts"), nurse_code)

    # 6. index.ts
    hosp_index = """export * from './bedManagementService';
export * from './operatingRoomScheduler';
export * from './bloodBankService';
export * from './pharmacyInventoryService';
export * from './nursingRosterService';
"""
    write_file(os.path.join(HOSP_DIR, "index.ts"), hosp_index)

if __name__ == "__main__":
    generate()
