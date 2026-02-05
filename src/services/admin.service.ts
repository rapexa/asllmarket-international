import { api } from './api';

// Dashboard Statistics
export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  newUsers: number;
  newProducts: number;
  pendingOrders: number;
  revenueChange: number;
  activeSuppliers: number;
  pendingVerifications: number;
}

// Sales Data
export interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

export interface SalesDataResponse {
  items: SalesData[];
}

// Category Statistics
export interface CategoryStats {
  categoryId: string;
  categoryName: string;
  productCount: number;
  revenue: number;
  percentage: number;
}

export interface CategoryStatsResponse {
  items: CategoryStats[];
}

// Top Products
export interface TopProduct {
  productId: string;
  productName: string;
  salesCount: number;
  revenue: number;
  change: number;
}

export interface TopProductsResponse {
  items: TopProduct[];
}

// User Statistics
export interface UserStats {
  date: string;
  newUsers: number;
  activeUsers: number;
  buyers: number;
  suppliers: number;
}

export interface UserStatsResponse {
  items: UserStats[];
}

// Recent Activities
export interface RecentActivity {
  id: string;
  type: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface RecentActivitiesResponse {
  items: RecentActivity[];
}

// Buyer List Item
export interface BuyerListItem {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  country: string;
  totalOrders: number;
  totalSpent: number;
  status: string;
  createdAt: string;
  lastActive: string;
}

export interface BuyerListResponse {
  items: BuyerListItem[];
}

// Update User Status
export interface UpdateUserStatusRequest {
  status: 'active' | 'inactive' | 'suspended';
  reason?: string;
}

// Admin Product
export interface AdminProduct {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  supplierId: string;
  supplierName: string;
  price: number;
  currency: string;
  minOrderQty: number;
  stock: number;
  status: 'active' | 'inactive' | 'pending' | 'rejected';
  views: number;
  orders: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProductsResponse {
  items: AdminProduct[];
}

export interface UpdateProductStatusRequest {
  status: 'active' | 'inactive' | 'pending' | 'rejected';
  reason?: string;
}

// Admin Order
export interface AdminOrder {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyerName: string;
  buyerCountry: string;
  supplierId: string;
  supplierName: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface AdminOrdersResponse {
  items: AdminOrder[];
}

export interface AdminUpdateOrderStatusRequest {
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  reason?: string;
}

// Admin Supplier
export interface AdminSupplier {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  verified: boolean;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  subscription: 'free' | 'silver' | 'gold' | 'diamond';
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  rating: number;
  createdAt: string;
}

export interface AdminSuppliersResponse {
  items: AdminSupplier[];
}

export interface UpdateSupplierStatusRequest {
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  reason?: string;
}

// Admin Verification
export interface AdminVerification {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  documentType: string;
  documentUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewMessage?: string;
}

export interface AdminVerificationsResponse {
  items: AdminVerification[];
}

export interface AdminReviewVerificationRequest {
  status: 'approved' | 'rejected';
  message?: string;
}

export const adminService = {
  // Dashboard statistics
  async getDashboardStats(): Promise<DashboardStats> {
    return api.get<DashboardStats>('/admin/dashboard/stats');
  },

  // Sales data over time
  async getSalesData(days: number = 30): Promise<SalesDataResponse> {
    return api.get<SalesDataResponse>('/admin/dashboard/sales', { days });
  },

  // Category distribution statistics
  async getCategoryStats(): Promise<CategoryStatsResponse> {
    return api.get<CategoryStatsResponse>('/admin/dashboard/categories');
  },

  // Top selling products
  async getTopProducts(limit: number = 10): Promise<TopProductsResponse> {
    return api.get<TopProductsResponse>('/admin/dashboard/top-products', { limit });
  },

  // User growth statistics
  async getUserStats(days: number = 30): Promise<UserStatsResponse> {
    return api.get<UserStatsResponse>('/admin/dashboard/user-stats', { days });
  },

  // Recent platform activities
  async getRecentActivities(limit: number = 20): Promise<RecentActivitiesResponse> {
    return api.get<RecentActivitiesResponse>('/admin/dashboard/activities', { limit });
  },

  // List all buyers
  async listBuyers(params?: {
    limit?: number;
    offset?: number;
  }): Promise<BuyerListResponse> {
    return api.get<BuyerListResponse>('/admin/buyers', params);
  },

  // Update user status
  async updateUserStatus(userId: string, data: UpdateUserStatusRequest): Promise<void> {
    return api.patch<void>(`/admin/users/${userId}/status`, data);
  },

  // Product management
  async listProducts(params?: { 
    limit?: number; 
    offset?: number; 
    status?: string; 
    category?: string 
  }): Promise<AdminProductsResponse> {
    return api.get<AdminProductsResponse>('/admin/products', params);
  },

  async updateProductStatus(productId: string, data: UpdateProductStatusRequest): Promise<void> {
    return api.patch<void>(`/admin/products/${productId}/status`, data);
  },

  async deleteProduct(productId: string): Promise<void> {
    return api.delete<void>(`/admin/products/${productId}`);
  },

  // Order management
  async listOrders(params?: { 
    limit?: number; 
    offset?: number; 
    status?: string; 
    paymentStatus?: string 
  }): Promise<AdminOrdersResponse> {
    return api.get<AdminOrdersResponse>('/admin/orders', params);
  },

  async updateOrderStatus(orderId: string, data: AdminUpdateOrderStatusRequest): Promise<void> {
    return api.patch<void>(`/admin/orders/${orderId}/status`, data);
  },

  // Supplier management
  async listSuppliers(params?: { 
    limit?: number; 
    offset?: number; 
    status?: string; 
    subscription?: string 
  }): Promise<AdminSuppliersResponse> {
    return api.get<AdminSuppliersResponse>('/admin/suppliers', params);
  },

  async updateSupplierStatus(supplierId: string, data: UpdateSupplierStatusRequest): Promise<void> {
    return api.patch<void>(`/admin/suppliers/${supplierId}/status`, data);
  },

  // Verification management
  async listVerifications(params?: { 
    limit?: number; 
    offset?: number; 
    status?: string 
  }): Promise<AdminVerificationsResponse> {
    return api.get<AdminVerificationsResponse>('/admin/verifications', params);
  },

  async reviewVerification(verificationId: string, data: AdminReviewVerificationRequest): Promise<void> {
    return api.post<void>(`/admin/verifications/${verificationId}/review`, data);
  },
};
