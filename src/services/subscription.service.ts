import { api } from './api';

export type SubscriptionPlan = 'free' | 'silver' | 'gold' | 'diamond';
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'trial';

export interface Subscription {
  id: string;
  supplierId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startedAt: string;
  expiresAt?: string;
  cancelledAt?: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionRequest {
  plan: SubscriptionPlan;
  amount: number;
  currency: string;
  paymentMethod: string;
  durationDays: number;
}

export interface SubscriptionListResponse {
  items: Subscription[];
}

export const subscriptionService = {
  // Get my subscription (supplier)
  async getMySubscription(): Promise<Subscription> {
    return api.get<Subscription>('/subscriptions/me');
  },

  // Create subscription (supplier)
  async create(data: CreateSubscriptionRequest): Promise<Subscription> {
    return api.post<Subscription>('/subscriptions', data);
  },

  // Cancel subscription
  async cancel(id: string): Promise<Subscription> {
    return api.patch<Subscription>(`/subscriptions/${id}/cancel`);
  },

  // Admin endpoints
  admin: {
    // List all subscriptions
    async list(params?: {
      limit?: number;
      offset?: number;
    }): Promise<SubscriptionListResponse> {
      return api.get<SubscriptionListResponse>('/admin/subscriptions', params);
    },

    // Get subscription by ID
    async getById(id: string): Promise<Subscription> {
      return api.get<Subscription>(`/admin/subscriptions/${id}`);
    },

    // Delete subscription
    async delete(id: string): Promise<void> {
      return api.delete<void>(`/admin/subscriptions/${id}`);
    },
  },
};
