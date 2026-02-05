import { api } from './api';

export interface SubCategory {
  id: string;
  nameEn: string;
  nameFa: string;
  nameAr: string;
  productCount: number;
  icon?: string;
  trending: boolean;
}

export interface Category {
  id: string;
  nameEn: string;
  nameFa: string;
  nameAr: string;
  icon?: string;
  descriptionEn?: string;
  descriptionFa?: string;
  descriptionAr?: string;
  productCount: number;
  supplierCount: number;
  featured: boolean;
  trending: boolean;
  image?: string;
  gradient?: string;
  accent?: string;
  subcategories: SubCategory[];
}

export interface CategoryListResponse {
  items: Category[];
}

export const categoryService = {
  // List all categories
  async list(): Promise<CategoryListResponse> {
    return api.get<CategoryListResponse>('/categories');
  },

  // Get category by ID
  async getById(id: string): Promise<Category> {
    return api.get<Category>(`/categories/${id}`);
  },
};
