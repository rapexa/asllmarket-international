import { api } from './api';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  supplierId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  currency: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingAddress: string;
  shippingMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  productId: string;
  supplierId: string;
  quantity: number;
  unitPrice: number;
  currency: string;
  paymentMethod: string;
  shippingAddress: string;
  shippingMethod?: string;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
  trackingNumber?: string;
  deliveredAt?: string;
}

export interface OrderListResponse {
  items: Order[];
}

export const orderService = {
  // Get my orders (buyer)
  async getMyOrders(params?: {
    limit?: number;
    offset?: number;
  }): Promise<OrderListResponse> {
    return api.get<OrderListResponse>('/orders', params);
  },

  // Get order by ID
  async getById(id: string): Promise<Order> {
    return api.get<Order>(`/orders/${id}`);
  },

  // Create order (buyer)
  async create(data: CreateOrderRequest): Promise<Order> {
    return api.post<Order>('/orders', data);
  },

  // Update order status
  async updateStatus(id: string, data: UpdateOrderStatusRequest): Promise<Order> {
    return api.patch<Order>(`/orders/${id}/status`, data);
  },

  // Get supplier orders (supplier only)
  async getSupplierOrders(
    supplierId: string,
    params?: {
      limit?: number;
      offset?: number;
    }
  ): Promise<OrderListResponse> {
    return api.get<OrderListResponse>(`/orders/supplier/${supplierId}`, params);
  },

  // Admin endpoints
  admin: {
    // List all orders
    async list(params?: {
      limit?: number;
      offset?: number;
    }): Promise<OrderListResponse> {
      return api.get<OrderListResponse>('/admin/orders', params);
    },

    // Delete order
    async delete(id: string): Promise<void> {
      return api.delete<void>(`/admin/orders/${id}`);
    },
  },
};
