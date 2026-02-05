import { api } from './api';

export interface Supplier {
  id: string;
  userId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  logo: string;
  description: string;
  verified: boolean;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  subscription: 'free' | 'silver' | 'gold' | 'diamond';
  rating: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  responseRate: number;
  responseTime: number;
  established: number;
  employees: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSupplierRequest {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address?: string;
  description?: string;
  established?: number;
  employees?: string;
}

export interface UpdateSupplierRequest {
  companyName?: string;
  contactName?: string;
  phone?: string;
  address?: string;
  city?: string;
  description?: string;
  logo?: string;
  status?: 'active' | 'inactive' | 'suspended' | 'pending';
  subscription?: 'free' | 'silver' | 'gold' | 'diamond';
}

export interface SupplierListResponse {
  items: Supplier[];
}

export const supplierService = {
  // List suppliers with pagination
  async list(params?: {
    limit?: number;
    offset?: number;
  }): Promise<SupplierListResponse> {
    return api.get<SupplierListResponse>('/suppliers', params);
  },

  // Get supplier by ID
  async getById(id: string): Promise<Supplier> {
    return api.get<Supplier>(`/suppliers/${id}`);
  },

  // Get my supplier profile (authenticated)
  async getMyProfile(): Promise<Supplier> {
    return api.get<Supplier>('/suppliers/me');
  },

  // Create supplier profile (authenticated)
  async create(data: CreateSupplierRequest): Promise<Supplier> {
    return api.post<Supplier>('/suppliers', data);
  },

  // Update supplier profile (authenticated)
  async update(id: string, data: UpdateSupplierRequest): Promise<Supplier> {
    return api.put<Supplier>(`/suppliers/${id}`, data);
  },

  // Delete supplier profile (authenticated)
  async delete(id: string): Promise<void> {
    return api.delete<void>(`/suppliers/${id}`);
  },
};
