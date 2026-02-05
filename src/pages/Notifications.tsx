import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Settings, CheckCheck, Trash2, ArrowRight, Building2, MessageSquare, CheckCircle2, Star, Filter, X } from 'lucide-react';
import { useNotifications, Notification, NotificationType } from '@/contexts/NotificationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

const Notifications: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    getNotificationsByType,
    getUnreadByType,
  } = useNotifications();

  const [activeTab, setActiveTab] = useState<NotificationType | 'all'>('all');

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case 'business':
        return Building2;
      case 'interaction':
        return MessageSquare;
      case 'system':
        return CheckCircle2;
      case 'promotional':
        return Star;
      default:
        return Bell;
    }
  };

  const getTypeColor = (type: NotificationType) => {
    switch (type) {
      case 'business':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'interaction':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'system':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'promotional':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast({
      title: 'All notifications marked as read',
      description: 'All notifications have been marked as read.',
    });
  };

  const handleRemoveNotification = (notification: Notification, e: React.MouseEvent) => {
    e.stopPropagation();
    removeNotification(notification.id);
    toast({
      title: 'Notification removed',
      description: 'The notification has been removed.',
    });
  };

  const handleClearAll = () => {
    clearAll();
    toast({
      title: 'All notifications cleared',
      description: 'All notifications have been removed.',
    });
  };

  const filteredNotifications = activeTab === 'all'
    ? notifications
    : getNotificationsByType(activeTab);

  const tabs: Array<{ value: NotificationType | 'all'; label: string; count?: number }> = [
    { value: 'all', label: 'All', count: unreadCount },
    { value: 'business', label: 'Orders', count: getUnreadByType('business') },
    { value: 'interaction', label: 'Messages', count: getUnreadByType('interaction') },
    { value: 'system', label: 'System', count: getUnreadByType('system') },
    { value: 'promotional', label: 'Promotional', count: getUnreadByType('promotional') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2">
              Notifications
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with your business activities
            </p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={handleMarkAllAsRead}
                className="gap-2"
              >
                <CheckCheck className="h-4 w-4" />
                Mark all read
              </Button>
            )}
            {notifications.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Clear all
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear all notifications?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all notifications. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearAll} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Clear All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button
              variant="outline"
              onClick={() => navigate('/notifications/settings')}
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-6">
          <TabsList className="w-full md:w-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="gap-2"
              >
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <Badge variant="secondary" className="h-5 min-w-[20px] text-xs">
                    {tab.count}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Notifications List */}
        <TabsContent value={activeTab} className="mt-6">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12 text-center">
              <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {activeTab === 'all' 
                  ? "You're all caught up! No new notifications."
                  : `No ${activeTab} notifications at the moment.`}
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification, index) => {
                const Icon = getTypeIcon(notification.type);
                const isUnread = !notification.read;

                return (
                  <Card
                    key={notification.id}
                    className={cn(
                      "p-6 cursor-pointer transition-all duration-200 hover:shadow-lg animate-fade-in",
                      isUnread && "bg-primary/5 border-l-4 border-primary",
                      !isUnread && "opacity-75"
                    )}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border",
                        getTypeColor(notification.type)
                      )}>
                        <Icon className="h-6 w-6" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <h3 className={cn(
                              "font-bold text-lg mb-1",
                              isUnread ? "text-foreground" : "text-muted-foreground"
                            )}>
                              {notification.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {notification.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {isUnread && (
                              <Badge variant="default" className="text-xs">
                                New
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => handleRemoveNotification(notification, e)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {notification.actionLabel && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNotificationClick(notification);
                              }}
                            >
                              {notification.actionLabel}
                              <ArrowRight className={cn("h-4 w-4", dir === 'rtl' && "rotate-180")} />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;

