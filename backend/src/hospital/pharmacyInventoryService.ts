/**
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
