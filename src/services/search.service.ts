import { api } from './api';

export type SearchType = 'text' | 'image' | 'video';

export interface ProductResult {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string;
  supplierId: string;
  supplierName: string;
  rating: number;
  moq: number;
}

export interface SupplierResult {
  id: string;
  companyName: string;
  country: string;
  logo: string;
  verified: boolean;
  rating: number;
  description: string;
}

export interface SearchResponse {
  products: ProductResult[];
  suppliers: SupplierResult[];
  total: number;
}

export interface SearchRequest {
  q: string;
  type?: SearchType;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  country?: string;
  verified?: boolean;
  limit?: number;
  offset?: number;
}

export const searchService = {
  // Unified search
  async search(params: SearchRequest): Promise<SearchResponse> {
    return api.get<SearchResponse>('/search', params);
  },
};
