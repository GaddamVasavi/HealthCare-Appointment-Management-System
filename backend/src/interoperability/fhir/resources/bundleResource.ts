import { FHIRResourceBase, FHIRIdentifier } from './types';

export interface FHIRBundleEntry {
  fullUrl?: string;
  resource?: any;
  request?: {
    method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
  };
  response?: {
    status: string;
    location?: string;
  };
}

export interface FHIRBundle extends FHIRResourceBase {
  resourceType: 'Bundle';
  identifier?: FHIRIdentifier;
  type: 'document' | 'message' | 'transaction' | 'transaction-response' | 'batch' | 'batch-response' | 'history' | 'searchset' | 'collection';
  timestamp?: string;
  total?: number;
  entry?: FHIRBundleEntry[];
}

export class FHIRBundleBuilder {
  private bundle: FHIRBundle = {
    resourceType: 'Bundle',
    type: 'collection',
    timestamp: new Date().toISOString(),
    entry: [],
  };

  public setId(id: string): this {
    this.bundle.id = id;
    return this;
  }

  public setType(type: FHIRBundle['type']): this {
    this.bundle.type = type;
    return this;
  }

  public addResource(resource: any, fullUrl?: string): this {
    if (!this.bundle.entry) this.bundle.entry = [];
    const url = fullUrl || `urn:uuid:${resource.id || Math.random().toString(36).substring(7)}`;
    this.bundle.entry.push({ fullUrl: url, resource });
    this.bundle.total = this.bundle.entry.length;
    return this;
  }

  public build(): FHIRBundle {
    return { ...this.bundle };
  }
}
