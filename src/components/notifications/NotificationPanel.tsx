import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, X, CheckCheck, Settings, ArrowRight, Building2, MessageSquare, FileText, AlertCircle, Star, CheckCircle2 } from 'lucide-react';
import { useNotifications, Notification, NotificationType } from '@/contexts/NotificationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NotificationPanel: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    getNotificationsByType,
    getUnreadByType,
  } = useNotifications();

  const [activeTab, setActiveTab] = useState<NotificationType | 'all'>('all');
  const [isOpen, setIsOpen] = useState(false);

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
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      setIsOpen(false);
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
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 end-1 min-w-[18px] h-[18px] bg-destructive text-destructive-foreground rounded-full text-[10px] font-bold flex items-center justify-center px-1 animate-scale-in">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={dir === 'rtl' ? 'start' : 'end'}
        className="w-[400px] md:w-[500px] p-0 rounded-2xl shadow-2xl border-2"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="h-8 text-xs"
              >
                <CheckCheck className="h-3 w-3 me-1" />
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                setIsOpen(false);
                navigate('/notifications/settings');
              }}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="w-full rounded-none border-b border-border bg-transparent h-auto p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent",
                  "h-12 text-sm font-medium"
                )}
              >
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <Badge variant="secondary" className="ms-2 h-5 min-w-[20px] text-xs">
                    {tab.count}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Notifications List */}
          <TabsContent value={activeTab} className="mt-0">
            <ScrollArea className="h-[500px]">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredNotifications.map((notification, index) => {
                  const Icon = getTypeIcon(notification.type);
                  const isUnread = !notification.read;

                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-4 cursor-pointer transition-all duration-200 animate-fade-in",
                        "hover:bg-muted/50",
                        isUnread && "bg-primary/5 border-s-4 border-primary",
                        !isUnread && "opacity-75"
                      )}
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex gap-3">
                        {/* Icon */}
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                          getTypeColor(notification.type)
                        )}>
                          <Icon className="h-5 w-5" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className={cn(
                              "font-semibold text-sm",
                              isUnread ? "text-foreground" : "text-muted-foreground"
                            )}>
                              {notification.title}
                            </h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 shrink-0 opacity-0 hover:opacity-100 transition-opacity"
                              onClick={(e) => handleRemoveNotification(notification, e)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {notification.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {notification.actionLabel && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs px-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNotificationClick(notification);
                                }}
                              >
                                {notification.actionLabel}
                                <ArrowRight className={cn("h-3 w-3 ms-1", dir === 'rtl' && "rotate-180")} />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            </ScrollArea>
          </TabsContent>

          {/* Footer */}
          {filteredNotifications.length > 0 && (
            <div className="p-4 border-t border-border">
              <Button
                variant="ghost"
                className="w-full justify-center text-sm"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/notifications');
                }}
              >
                View All Notifications
                <ArrowRight className={cn("ms-2 h-4 w-4", dir === 'rtl' && "rotate-180")} />
              </Button>
            </div>
          )}
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationPanel;

