import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { notificationService, Notification as BackendNotification } from '@/services';

export type NotificationType = 'system' | 'business' | 'interaction' | 'promotional';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  icon: string;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: Record<string, any>;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  getNotificationsByType: (type: NotificationType) => Notification[];
  getUnreadByType: (type: NotificationType) => number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Map backend notification shape to frontend context notification
const mapBackendNotification = (n: BackendNotification): Notification => ({
  id: n.id,
  type: (n.type as NotificationType) ?? 'system',
  priority: (n.priority as NotificationPriority) ?? 'medium',
  title: n.title,
  description: n.description || n.message,
  timestamp: new Date(n.createdAt),
  read: n.isRead || !!n.read,
  icon: '🔔',
  actionUrl: n.actionUrl,
  actionLabel: n.actionLabel,
  metadata: n.metadata ? { raw: n.metadata } : undefined,
});

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('notifications');
    return saved
      ? JSON.parse(saved).map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }))
      : [];
  });

  // Load from backend on mount
  useEffect(() => {
    const loadFromBackend = async () => {
      try {
        const response = await notificationService.getMyNotifications({
          limit: 100,
          offset: 0,
        });
        setNotifications(response.items.map(mapBackendNotification));
      } catch (error) {
        console.error('Failed to load notifications from backend:', error);
        // Fallback to existing (possibly localStorage) notifications
      }
    };

    loadFromBackend();
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getNotificationsByType = (type: NotificationType) => {
    return notifications.filter(n => n.type === type);
  };

  const getUnreadByType = (type: NotificationType) => {
    return notifications.filter(n => n.type === type && !n.read).length;
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
        getNotificationsByType,
        getUnreadByType,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

