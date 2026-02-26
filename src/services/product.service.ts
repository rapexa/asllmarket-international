import { api } from './api';

export interface Product {
  id: string;
  supplierId: string;
  categoryId?: string;
  subcategoryId?: string;
  name: string;
  description: string;
  specifications?: string;
  images: string[];
  imageUrl?: string;
  price: number;
  currency: string;
  moq: number;
  stockQuantity?: number;
  unit?: string;
  leadTime?: number;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  status?: 'active' | 'inactive' | 'draft' | 'out_of_stock';
  /** درصد تخفیف (۰–۱۰۰) */
  discountPercent?: number;
  /** ارسال رایگان */
  freeShipping?: boolean;
  /** اولین سفارش ارسال رایگان */
  firstOrderFreeShipping?: boolean;
  /** تضمین شده (ASL Guaranteed) */
  guaranteed?: boolean;
  /** سفارشی‌سازی سریع */
  fastCustomization?: boolean;
  /** تگ‌های فروش مثلاً ["Lower priced than similar","FREE shipping"] */
  sellingPointTags?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  categoryId?: string;
  subcategoryId?: string;
  name: string;
  description: string;
  specifications?: string;
  images?: string[];
  imageUrl?: string;
  price: number;
  currency: string;
  moq: number;
  stockQuantity?: number;
  unit?: string;
  leadTime?: number;
  discountPercent?: number;
  freeShipping?: boolean;
  firstOrderFreeShipping?: boolean;
  guaranteed?: boolean;
  fastCustomization?: boolean;
  sellingPointTags?: string;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  specifications?: string;
  images?: string[];
  price?: number;
  moq?: number;
  stockQuantity?: number;
  unit?: string;
  leadTime?: number;
  status?: 'active' | 'inactive' | 'draft' | 'out_of_stock';
  discountPercent?: number;
  freeShipping?: boolean;
  firstOrderFreeShipping?: boolean;
  guaranteed?: boolean;
  fastCustomization?: boolean;
  sellingPointTags?: string;
}

export interface ProductListResponse {
  items: Product[];
}

export const productService = {
  // List products with pagination
  async list(params?: {
    limit?: number;
    offset?: number;
    categoryId?: string;
    supplierId?: string;
  }): Promise<ProductListResponse> {
    return api.get<ProductListResponse>('/products', params);
  },

  // Get product by ID
  async getById(id: string): Promise<Product> {
    return api.get<Product>(`/products/${id}`);
  },

  // Create product (supplier/admin only)
  async create(data: CreateProductRequest): Promise<Product> {
    return api.post<Product>('/products', data);
  },

  // Update product (supplier/admin only)
  async update(id: string, data: UpdateProductRequest): Promise<Product> {
    return api.put<Product>(`/products/${id}`, data);
  },

  // Delete product (supplier/admin only)
  async delete(id: string): Promise<void> {
    return api.delete<void>(`/products/${id}`);
  },
};
