export type RFQStatus = 'draft' | 'submitted' | 'active' | 'closed' | 'cancelled';
export type RFQResponseStatus = 'pending' | 'accepted' | 'rejected' | 'countered';

export interface RFQ {
  id: string;
  buyerId: string;
  productId: string;
  productName: string;
  productImage?: string;
  supplierId?: string; // Optional: can be general or supplier-specific
  quantity: number;
  unit: string;
  specifications?: string;
  requirements?: string;
  deliveryLocation?: string;
  preferredDeliveryDate?: Date;
  budget?: number;
  currency: string;
  status: RFQStatus;
  submittedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RFQResponse {
  id: string;
  rfqId: string;
  supplierId: string;
  supplierName: string;
  supplierCountry: string;
  supplierVerified: boolean;
  unitPrice: number;
  totalPrice: number;
  currency: string;
  moq: number;
  estimatedDelivery: number; // days
  paymentTerms: string;
  specifications?: string;
  message?: string;
  attachments?: string[];
  status: RFQResponseStatus;
  submittedAt: Date;
  expiresAt?: Date;
}

