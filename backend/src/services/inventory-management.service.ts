import mongoose from 'mongoose';
import { BadRequestError, ConflictError, NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger';

export type InventoryStatus = 'active' | 'quarantined' | 'recalled' | 'expired' | 'depleted';
export type TransactionType = 'receipt' | 'issue' | 'return' | 'adjustment' | 'transfer' | 'waste' | 'recall';

export interface InventoryItem {
  itemId: string;
  sku: string;
  name: string;
  category: 'medication' | 'consumable' | 'equipment' | 'implant' | 'laboratory' | 'ppe';
  manufacturer?: string;
  unit: string;
  reorderPoint: number;
  reorderQuantity: number;
  totalQuantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  locations: StockLocation[];
  batches: StockBatch[];
  status: InventoryStatus;
  controlledSubstance: boolean;
  requiresTemperatureControl: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StockLocation { locationId: string; name: string; quantity: number; bin?: string; }
export interface StockBatch { batchId: string; lotNumber: string; quantity: number; receivedAt: Date; expiryDate?: Date; unitCost: number; supplier?: string; status: 'available' | 'quarantined' | 'expired' | 'recalled'; }
export interface InventoryTransaction { transactionId: string; itemId: string; type: TransactionType; quantity: number; fromLocation?: string; toLocation?: string; performedBy: string; reference?: string; reason?: string; occurredAt: Date; }
export interface PurchaseOrder { purchaseOrderId: string; supplier: string; items: PurchaseOrderLine[]; status: 'draft' | 'submitted' | 'approved' | 'partially_received' | 'received' | 'cancelled'; expectedDate?: Date; createdBy: string; createdAt: Date; }
export interface PurchaseOrderLine { itemId: string; quantity: number; unitCost: number; receivedQuantity: number; }

export class InventoryManagementService {
  private readonly items = new Map<string, InventoryItem>();
  private readonly transactions = new Map<string, InventoryTransaction>();
  private readonly purchaseOrders = new Map<string, PurchaseOrder>();

  async registerItem(input: Omit<InventoryItem, 'itemId' | 'totalQuantity' | 'reservedQuantity' | 'availableQuantity' | 'locations' | 'batches' | 'status' | 'createdAt' | 'updatedAt'>): Promise<InventoryItem> {
    if (!input.sku?.trim() || !input.name?.trim() || !input.unit?.trim()) throw new BadRequestError('SKU, name, and unit are required');
    if (this.findBySku(input.sku)) throw new ConflictError('SKU already exists');
    const item: InventoryItem = { ...input, itemId: this.id('ITEM'), totalQuantity: 0, reservedQuantity: 0, availableQuantity: 0, locations: [], batches: [], status: 'depleted', createdAt: new Date(), updatedAt: new Date() };
    this.items.set(item.itemId, item);
    return this.clone(item);
  }

  async receiveStock(itemId: string, input: { quantity: number; lotNumber: string; expiryDate?: Date; unitCost: number; supplier?: string; locationId: string; performedBy: string; reference?: string }): Promise<{ item: InventoryItem; transaction: InventoryTransaction }> {
    const item = this.requireItem(itemId);
    this.assertQuantity(input.quantity);
    if (!input.lotNumber || !input.locationId || !input.performedBy) throw new BadRequestError('Lot, location, and performer are required');
    const batch: StockBatch = { batchId: this.id('BATCH'), lotNumber: input.lotNumber, quantity: input.quantity, receivedAt: new Date(), expiryDate: input.expiryDate, unitCost: input.unitCost, supplier: input.supplier, status: 'available' };
    item.batches.push(batch);
    this.adjustLocation(item, input.locationId, input.quantity);
    item.status = 'active';
    item.updatedAt = new Date();
    const transaction = this.transaction(itemId, 'receipt', input.quantity, input.performedBy, input.reference);
    return { item: this.clone(item), transaction };
  }

  async issueStock(itemId: string, quantity: number, locationId: string, performedBy: string, reference?: string): Promise<{ item: InventoryItem; transaction: InventoryTransaction }> {
    const item = this.requireItem(itemId);
    this.assertQuantity(quantity);
    const location = item.locations.find(entry => entry.locationId === locationId);
    if (!location || location.quantity < quantity) throw new ConflictError('Insufficient stock at requested location');
    if (item.availableQuantity < quantity) throw new ConflictError('Insufficient available stock');
    let remaining = quantity;
    for (const batch of item.batches.filter(entry => entry.status === 'available').sort((a, b) => a.expiryDate?.getTime() || Infinity - (b.expiryDate?.getTime() || Infinity))) {
      const used = Math.min(remaining, batch.quantity);
      batch.quantity -= used;
      remaining -= used;
      if (!remaining) break;
    }
    this.adjustLocation(item, locationId, -quantity);
    item.status = item.availableQuantity === 0 ? 'depleted' : 'active';
    const transaction = this.transaction(itemId, 'issue', quantity, performedBy, reference);
    return { item: this.clone(item), transaction };
  }

  async reserveStock(itemId: string, quantity: number, actorId: string): Promise<InventoryItem> {
    const item = this.requireItem(itemId);
    this.assertQuantity(quantity);
    if (item.availableQuantity < quantity) throw new ConflictError('Insufficient stock to reserve');
    item.reservedQuantity += quantity;
    item.availableQuantity = item.totalQuantity - item.reservedQuantity;
    item.updatedAt = new Date();
    logger.info(`Reserved ${quantity} units of ${itemId} by ${actorId}`);
    return this.clone(item);
  }

  async releaseReservation(itemId: string, quantity: number, actorId: string): Promise<InventoryItem> {
    const item = this.requireItem(itemId);
    if (quantity <= 0 || quantity > item.reservedQuantity) throw new BadRequestError('Invalid reservation quantity');
    item.reservedQuantity -= quantity;
    item.availableQuantity = item.totalQuantity - item.reservedQuantity;
    item.updatedAt = new Date();
    logger.info(`Released ${quantity} units of ${itemId} by ${actorId}`);
    return this.clone(item);
  }

  async transferStock(itemId: string, quantity: number, fromLocation: string, toLocation: string, performedBy: string): Promise<InventoryTransaction> {
    const item = this.requireItem(itemId);
    if (fromLocation === toLocation) throw new BadRequestError('Source and destination must differ');
    const source = item.locations.find(location => location.locationId === fromLocation);
    if (!source || source.quantity < quantity) throw new ConflictError('Insufficient source stock');
    this.adjustLocation(item, fromLocation, -quantity);
    this.adjustLocation(item, toLocation, quantity);
    return this.transaction(itemId, 'transfer', quantity, performedBy, undefined, fromLocation, toLocation);
  }

  async recordWaste(itemId: string, quantity: number, reason: string, performedBy: string): Promise<InventoryTransaction> {
    const item = this.requireItem(itemId);
    if (!reason?.trim()) throw new BadRequestError('Waste reason is required');
    if (item.availableQuantity < quantity) throw new ConflictError('Waste quantity exceeds available stock');
    const location = item.locations.find(entry => entry.quantity >= quantity);
    if (!location) throw new ConflictError('No location contains sufficient stock');
    this.adjustLocation(item, location.locationId, -quantity);
    return this.transaction(itemId, 'waste', quantity, performedBy, undefined, undefined, undefined, reason);
  }

  async recallBatch(itemId: string, lotNumber: string, reason: string, performedBy: string): Promise<InventoryItem> {
    const item = this.requireItem(itemId);
    const batch = item.batches.find(entry => entry.lotNumber === lotNumber);
    if (!batch) throw new NotFoundError('Stock batch not found');
    batch.status = 'recalled';
    const affected = batch.quantity;
    batch.quantity = 0;
    item.totalQuantity = Math.max(0, item.totalQuantity - affected);
    item.availableQuantity = Math.max(0, item.totalQuantity - item.reservedQuantity);
    item.status = item.availableQuantity ? 'active' : 'depleted';
    this.transaction(itemId, 'recall', affected, performedBy, undefined, undefined, undefined, reason);
    return this.clone(item);
  }

  async getLowStockItems(): Promise<InventoryItem[]> {
    return [...this.items.values()].filter(item => item.availableQuantity <= item.reorderPoint && item.status !== 'recalled').map(item => this.clone(item));
  }

  async createPurchaseOrder(input: { supplier: string; items: Array<{ itemId: string; quantity: number; unitCost: number }>; expectedDate?: Date; createdBy: string }): Promise<PurchaseOrder> {
    if (!input.supplier?.trim() || !input.items?.length || !input.createdBy) throw new BadRequestError('Supplier, items, and creator are required');
    const items = input.items.map(line => { this.requireItem(line.itemId); this.assertQuantity(line.quantity); return { ...line, receivedQuantity: 0 }; });
    const order: PurchaseOrder = { purchaseOrderId: this.id('PO'), supplier: input.supplier, items, status: 'draft', expectedDate: input.expectedDate, createdBy: input.createdBy, createdAt: new Date() };
    this.purchaseOrders.set(order.purchaseOrderId, order);
    return this.clone(order);
  }

  async submitPurchaseOrder(orderId: string, actorId: string): Promise<PurchaseOrder> {
    const order = this.requirePurchaseOrder(orderId);
    if (order.status !== 'draft') throw new ConflictError('Only draft orders can be submitted');
    order.status = 'submitted';
    logger.info(`Purchase order ${orderId} submitted by ${actorId}`);
    return this.clone(order);
  }

  async receivePurchaseLine(orderId: string, itemId: string, quantity: number, lotNumber: string, locationId: string, actorId: string): Promise<PurchaseOrder> {
    const order = this.requirePurchaseOrder(orderId);
    const line = order.items.find(entry => entry.itemId === itemId);
    if (!line) throw new NotFoundError('Purchase order line not found');
    if (line.receivedQuantity + quantity > line.quantity) throw new ConflictError('Received quantity exceeds ordered quantity');
    await this.receiveStock(itemId, { quantity, lotNumber, unitCost: line.unitCost, locationId, performedBy: actorId, reference: orderId });
    line.receivedQuantity += quantity;
    order.status = order.items.every(entry => entry.receivedQuantity === entry.quantity) ? 'received' : 'partially_received';
    return this.clone(order);
  }

  async getTransactions(itemId: string, startDate?: Date, endDate?: Date): Promise<InventoryTransaction[]> {
    return [...this.transactions.values()].filter(transaction => transaction.itemId === itemId && (!startDate || transaction.occurredAt >= startDate) && (!endDate || transaction.occurredAt <= endDate)).sort((a, b) => b.occurredAt.getTime() - a.occurredAt.getTime()).map(transaction => this.clone(transaction));
  }

  private adjustLocation(item: InventoryItem, locationId: string, delta: number): void {
    let location = item.locations.find(entry => entry.locationId === locationId);
    if (!location) { if (delta < 0) throw new ConflictError('Location stock not found'); location = { locationId, name: locationId, quantity: 0 }; item.locations.push(location); }
    location.quantity += delta;
    item.totalQuantity += delta;
    item.availableQuantity = item.totalQuantity - item.reservedQuantity;
  }
  private transaction(itemId: string, type: TransactionType, quantity: number, performedBy: string, reference?: string, fromLocation?: string, toLocation?: string, reason?: string): InventoryTransaction { const transaction = { transactionId: this.id('TX'), itemId, type, quantity, performedBy, reference, fromLocation, toLocation, reason, occurredAt: new Date() }; this.transactions.set(transaction.transactionId, transaction); return this.clone(transaction); }
  private requireItem(id: string): InventoryItem { const item = this.items.get(id); if (!item) throw new NotFoundError('Inventory item not found'); return item; }
  private requirePurchaseOrder(id: string): PurchaseOrder { const order = this.purchaseOrders.get(id); if (!order) throw new NotFoundError('Purchase order not found'); return order; }
  private findBySku(sku: string): InventoryItem | undefined { return [...this.items.values()].find(item => item.sku === sku); }
  private assertQuantity(quantity: number): void { if (!Number.isFinite(quantity) || quantity <= 0) throw new BadRequestError('Quantity must be greater than zero'); }
  private id(prefix: string): string { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }
  private clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)); }
}

export default new InventoryManagementService();
