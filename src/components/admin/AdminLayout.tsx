import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  FileText,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  Shield,
  CreditCard,
  FolderOpen,
  BarChart3,
  CheckCircle2,
  UserCircle,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  CheckCircle,
  Trash2,
  Info,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  title: string;
  titleFa: string;
  titleAr: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  children?: NavItem[];
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language, dir } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'order',
      title: 'New Order Received',
      message: 'Order #12345 has been placed by ABC Trading Co.',
      status: 'unread',
      timestamp: '2 minutes ago',
      actionUrl: '/admin/orders/12345',
      priority: 'high',
    },
    {
      id: '2',
      type: 'verification',
      title: 'Verification Pending',
      message: 'Supplier "Tech Solutions Inc." submitted documents',
      status: 'unread',
      timestamp: '15 minutes ago',
      actionUrl: '/admin/verifications/2',
      priority: 'high',
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of $8,900 received for Order #12340',
      status: 'unread',
      timestamp: '1 hour ago',
      actionUrl: '/admin/orders/12340',
      priority: 'medium',
    },
    {
      id: '4',
      type: 'product',
      title: 'Low Stock Alert',
      message: 'Product "Smartphone Pro Max" is running low (45 units)',
      status: 'unread',
      timestamp: '2 hours ago',
      actionUrl: '/admin/products/1',
      priority: 'high',
    },
    {
      id: '5',
      type: 'user',
      title: 'New Supplier Registered',
      message: 'Global Import Ltd. has completed registration',
      status: 'unread',
      timestamp: '3 hours ago',
      actionUrl: '/admin/suppliers',
      priority: 'medium',
    },
  ]);

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return ShoppingCart;
      case 'product':
        return Package;
      case 'user':
        return Users;
      case 'payment':
        return CreditCard;
      case 'verification':
        return CheckCircle2;
      case 'system':
        return Info;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'product':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      case 'user':
        return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'payment':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'verification':
        return 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'system':
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, status: 'read' } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, status: 'read' }))
    );
  };

  const handleNotificationClick = (notification: any) => {
    if (notification.status === 'unread') {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      setNotificationsOpen(false);
    }
  };

  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      titleFa: 'داشبورد',
      titleAr: 'لوحة التحكم',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      title: 'Products',
      titleFa: 'محصولات',
      titleAr: 'المنتجات',
      href: '/admin/products',
      icon: Package,
      badge: 12,
    },
    {
      title: 'Suppliers',
      titleFa: 'تأمین‌کنندگان',
      titleAr: 'الموردون',
      href: '/admin/suppliers',
      icon: Users,
      badge: 5,
    },
    {
      title: 'Buyers',
      titleFa: 'خریداران',
      titleAr: 'المشترون',
      href: '/admin/buyers',
      icon: UserCircle,
    },
    {
      title: 'Orders',
      titleFa: 'سفارشات',
      titleAr: 'الطلبات',
      href: '/admin/orders',
      icon: ShoppingCart,
      badge: 23,
    },
    {
      title: 'RFQ Management',
      titleFa: 'مدیریت درخواست‌ها',
      titleAr: 'إدارة طلبات الأسعار',
      href: '/admin/rfq',
      icon: FileText,
      badge: 8,
    },
    {
      title: 'Categories',
      titleFa: 'دسته‌بندی‌ها',
      titleAr: 'الفئات',
      href: '/admin/categories',
      icon: FolderOpen,
    },
    {
      title: 'Verifications',
      titleFa: 'تأیید هویت',
      titleAr: 'التحقق',
      href: '/admin/verifications',
      icon: CheckCircle2,
      badge: 15,
    },
    {
      title: 'Subscriptions',
      titleFa: 'اشتراک‌ها',
      titleAr: 'الاشتراكات',
      href: '/admin/subscriptions',
      icon: CreditCard,
    },
    {
      title: 'Payments',
      titleFa: 'پرداخت‌ها',
      titleAr: 'المدفوعات',
      href: '/admin/payments',
      icon: CreditCard,
    },
    {
      title: 'Reports',
      titleFa: 'گزارش‌ها',
      titleAr: 'التقارير',
      href: '/admin/reports',
      icon: BarChart3,
    },
    {
      title: 'Settings',
      titleFa: 'تنظیمات',
      titleAr: 'الإعدادات',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  const getNavTitle = (item: NavItem) => {
    if (language === 'fa') return item.titleFa;
    if (language === 'ar') return item.titleAr;
    return item.title;
  };

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev =>
      prev.includes(href)
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-card border-r border-border transition-all duration-300",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          sidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className={cn(
            "flex h-16 items-center border-b border-border transition-all duration-300",
            sidebarCollapsed ? "justify-center px-3" : "justify-between px-6"
          )}>
            <Link to="/admin" className={cn(
              "flex items-center gap-2 transition-all duration-300",
              sidebarCollapsed && "justify-center"
            )}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light shrink-0">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <div className="font-bold text-lg whitespace-nowrap">Admin Panel</div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">ASL Market</div>
                </div>
              )}
            </Link>
            {!sidebarCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden shrink-0"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedItems.includes(item.href);

              return (
                <div key={item.href}>
                  <Link
                    to={item.href}
                    onClick={(e) => {
                      if (hasChildren && !sidebarCollapsed) {
                        e.preventDefault();
                        toggleExpanded(item.href);
                      } else {
                        setSidebarOpen(false);
                      }
                    }}
                    className={cn(
                      "flex items-center rounded-lg py-2.5 text-sm font-medium transition-colors relative group",
                      sidebarCollapsed ? "justify-center px-3" : "gap-3 px-3",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                    title={sidebarCollapsed ? getNavTitle(item) : undefined}
                  >
                    <Icon className={cn(
                      "h-5 w-5 shrink-0",
                      active && "text-primary-foreground"
                    )} />
                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1">{getNavTitle(item)}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ms-auto">
                            {item.badge}
                          </Badge>
                        )}
                        {hasChildren && (
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 transition-transform",
                              isExpanded && "rotate-90"
                            )}
                          />
                        )}
                      </>
                    )}
                    {/* Tooltip for collapsed state */}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                        <div className="font-medium">{getNavTitle(item)}</div>
                        {item.badge && (
                          <Badge variant="secondary" className="mt-1">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    )}
                  </Link>
                  {hasChildren && isExpanded && !sidebarCollapsed && (
                    <div className="mt-1 ml-8 space-y-1">
                      {item.children!.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                            isActive(child.href)
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-accent"
                          )}
                        >
                          {getNavTitle(child)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className={cn(
            "border-t border-border transition-all duration-300",
            sidebarCollapsed ? "p-3" : "p-4"
          )}>
            <Button
              variant="ghost"
              className={cn(
                "w-full gap-3 transition-all duration-300",
                sidebarCollapsed ? "justify-center px-3" : "justify-start"
              )}
              onClick={handleLogout}
              title={sidebarCollapsed ? (language === 'fa' ? 'خروج' : language === 'ar' ? 'تسجيل الخروج' : 'Logout') : undefined}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && (
                <span>{language === 'fa' ? 'خروج' : language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
              )}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div 
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        )}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-4 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Desktop Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </Button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === 'fa' ? 'جستجو...' : language === 'ar' ? 'بحث...' : 'Search...'}
                className="w-full bg-background pl-9"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle variant="ghost" size="icon" />
            <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge className="absolute top-1 right-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[400px] p-0 rounded-lg">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {unreadCount} new
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAllAsRead();
                        }}
                      >
                        <CheckCircle className="h-3 w-3 me-1" />
                        Mark all read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/admin/notifications');
                        setNotificationsOpen(false);
                      }}
                    >
                      View all
                      <ArrowRight className="h-3 w-3 ms-1" />
                    </Button>
                  </div>
                </div>

                {/* Notifications List */}
                <ScrollArea className="h-[400px]">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
                      <p className="text-sm text-muted-foreground">No notifications</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {notifications.map((notification) => {
                        const Icon = getNotificationIcon(notification.type);
                        return (
                          <div
                            key={notification.id}
                            className={cn(
                              "flex items-start gap-3 p-4 cursor-pointer transition-colors hover:bg-accent/50",
                              notification.status === 'unread' && "bg-blue-50/50 dark:bg-blue-950/20"
                            )}
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className={cn(
                              "p-2 rounded-lg shrink-0",
                              getNotificationColor(notification.type)
                            )}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className={cn(
                                      "text-sm font-medium",
                                      notification.status === 'unread' && "font-semibold"
                                    )}>
                                      {notification.title}
                                    </h4>
                                    {notification.status === 'unread' && (
                                      <div className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground line-clamp-2">
                                    {notification.message}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-muted-foreground">
                                  {notification.timestamp}
                                </span>
                                {notification.status === 'unread' && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      markAsRead(notification.id);
                                    }}
                                  >
                                    <CheckCircle className="h-3 w-3 me-1" />
                                    Mark read
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </ScrollArea>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="p-3 border-t">
                    <Button
                      variant="ghost"
                      className="w-full justify-center text-sm"
                      onClick={() => {
                        navigate('/admin/notifications');
                        setNotificationsOpen(false);
                      }}
                    >
                      View all notifications
                      <ArrowRight className="h-4 w-4 ms-2" />
                    </Button>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;