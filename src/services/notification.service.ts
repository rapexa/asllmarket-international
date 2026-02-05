import { api } from './api';

export type NotificationType = 'system' | 'business' | 'interaction' | 'promotional';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  description?: string;
  icon?: string;
  actionUrl?: string;
  actionLabel?: string;
  isRead: boolean;
  read?: boolean; // Backward compatibility
  metadata?: string;
  createdAt: string;
  readAt?: string;
}

export interface NotificationListResponse {
  items: Notification[];
}

export const notificationService = {
  // Get my notifications
  async getMyNotifications(params?: {
    limit?: number;
    offset?: number;
  }): Promise<NotificationListResponse> {
    return api.get<NotificationListResponse>('/notifications', params);
  },

  // Mark notification as read
  async markAsRead(id: string): Promise<void> {
    return api.patch<void>(`/notifications/${id}/read`);
  },

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    return api.post<void>('/notifications/read-all');
  },

  // Delete notification
  async delete(id: string): Promise<void> {
    return api.delete<void>(`/notifications/${id}`);
  },
};
