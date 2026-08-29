/**
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
