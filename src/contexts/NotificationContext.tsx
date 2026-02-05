import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

// Mock notifications for demo
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'business',
    priority: 'high',
    title: 'New Order Received',
    description: 'Order #12345 for 500 units of Wireless Earbuds has been placed',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    icon: '💼',
    actionUrl: '/orders/12345',
    actionLabel: 'View Order',
  },
  {
    id: '2',
    type: 'interaction',
    priority: 'high',
    title: 'New Message from Supplier',
    description: 'TechGlobal Industries sent you a message about your RFQ',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    read: false,
    icon: '💬',
    actionUrl: '/messages/1',
    actionLabel: 'View Message',
  },
  {
    id: '3',
    type: 'business',
    priority: 'high',
    title: 'Escrow Payment Locked',
    description: 'Payment of $12,500 has been secured for Order #12345',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
    icon: '🔒',
    actionUrl: '/orders/12345',
  },
  {
    id: '4',
    type: 'system',
    priority: 'medium',
    title: 'Account Verified',
    description: 'Your supplier account has been successfully verified',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    icon: '✅',
    actionUrl: '/dashboard/supplier',
  },
  {
    id: '5',
    type: 'promotional',
    priority: 'low',
    title: 'Special Offer Available',
    description: 'Get 20% off on bulk orders this week',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    read: true,
    icon: '⭐',
    actionUrl: '/deals',
    actionLabel: 'View Deal',
  },
  {
    id: '6',
    type: 'business',
    priority: 'critical',
    title: 'Payment Required',
    description: 'Payment for Order #12345 is pending. Please complete payment to proceed.',
    timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    read: false,
    icon: '💳',
    actionUrl: '/orders/12345/payment',
    actionLabel: 'Pay Now',
  },
  {
    id: '7',
    type: 'interaction',
    priority: 'high',
    title: 'RFQ Response Received',
    description: '3 suppliers have responded to your RFQ for Industrial Pumps',
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    read: false,
    icon: '📋',
    actionUrl: '/rfq/responses',
    actionLabel: 'View Responses',
  },
];

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved).map((n: any) => ({
      ...n,
      timestamp: new Date(n.timestamp),
    })) : mockNotifications;
  });

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

