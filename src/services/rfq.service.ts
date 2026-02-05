import { api } from './api';

export type RFQStatus = 'draft' | 'submitted' | 'active' | 'closed' | 'cancelled';
export type ResponseStatus = 'pending' | 'accepted' | 'rejected' | 'countered';

export interface RFQ {
  id: string;
  buyerId: string;
  productId?: string;
  productName: string;
  productImage?: string;
  supplierId?: string;
  quantity: number;
  unit: string;
  specifications?: string;
  requirements?: string;
  deliveryLocation?: string;
  preferredDeliveryDate?: string;
  budget?: number;
  currency: string;
  status: RFQStatus;
  submittedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RFQResponse {
  id: string;
  rfqId: string;
  supplierId: string;
  unitPrice: number;
  totalPrice: number;
  currency: string;
  moq: number;
  estimatedDelivery: number; // days
  paymentTerms?: string;
  specifications?: string;
  message?: string;
  status: ResponseStatus;
  submittedAt: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRFQRequest {
  productId?: string;
  productName: string;
  productImage?: string;
  supplierId?: string;
  quantity: number;
  unit: string;
  specifications?: string;
  requirements?: string;
  deliveryLocation?: string;
  preferredDeliveryDate?: string;
  budget?: number;
  currency: string;
}

export interface CreateRFQResponseRequest {
  rfqId: string;
  unitPrice: number;
  currency: string;
  moq: number;
  estimatedDelivery: number;
  paymentTerms?: string;
  specifications?: string;
  message?: string;
}

export interface RFQListResponse {
  items: RFQ[];
}

export interface RFQResponseListResponse {
  items: RFQResponse[];
}

export const rfqService = {
  // Get my RFQs (buyer)
  async getMyRFQs(params?: {
    limit?: number;
    offset?: number;
  }): Promise<RFQListResponse> {
    return api.get<RFQListResponse>('/rfqs', params);
  },

  // Get RFQ by ID
  async getById(id: string): Promise<RFQ> {
    return api.get<RFQ>(`/rfqs/${id}`);
  },

  // Create RFQ (buyer)
  async create(data: CreateRFQRequest): Promise<RFQ> {
    return api.post<RFQ>('/rfqs', data);
  },

  // List responses for an RFQ
  async listResponses(rfqId: string): Promise<RFQResponseListResponse> {
    return api.get<RFQResponseListResponse>(`/rfqs/${rfqId}/responses`);
  },

  // Create response to RFQ (supplier)
  async createResponse(data: CreateRFQResponseRequest): Promise<RFQResponse> {
    return api.post<RFQResponse>('/rfqs/responses', data);
  },

  // Admin endpoints
  admin: {
    // List all RFQs
    async list(params?: {
      limit?: number;
      offset?: number;
    }): Promise<RFQListResponse> {
      return api.get<RFQListResponse>('/admin/rfqs', params);
    },
  },
};
