/**
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
