import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Bell, FileText, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { orderService, rfqService, notificationService } from '@/services';

const BuyerDashboard: React.FC = () => {
  const { language, dir } = useLanguage();

  const {
    data: ordersData,
    isLoading: ordersLoading,
  } = useQuery({
    queryKey: ['buyerDashboard', 'orders'],
    queryFn: () => orderService.getMyOrders({ limit: 5, offset: 0 }),
  });

  const {
    data: rfqsData,
    isLoading: rfqsLoading,
  } = useQuery({
    queryKey: ['buyerDashboard', 'rfqs'],
    queryFn: () => rfqService.getMyRFQs({ limit: 5, offset: 0 }),
  });

  const {
    data: notificationsData,
    isLoading: notificationsLoading,
  } = useQuery({
    queryKey: ['buyerDashboard', 'notifications'],
    queryFn: () => notificationService.getMyNotifications({ limit: 10, offset: 0 }),
  });

  const orders = ordersData?.items ?? [];
  const rfqs = rfqsData?.items ?? [];
  const notifications = notificationsData?.items ?? [];

  const unreadNotificationsCount = notifications.filter(
    (n) => !(n.read ?? n.isRead)
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <main className="container px-4 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="space-y-6 sm:space-y-8">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              {language === 'fa' ? 'داشبورد خریدار' : language === 'ar' ? 'لوحة المشتري' : 'Buyer Dashboard'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {language === 'fa'
                ? 'پیگیری سفارش‌ها، درخواست‌های قیمت و پیشنهادهای ویژه'
                : language === 'ar'
                ? 'تتبع الطلبات وطلبات الأسعار والعروض'
                : 'Track orders, RFQs and special offers'}
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: ShoppingCart,
                label:
                  language === 'fa'
                    ? 'سفارش‌های من'
                    : language === 'ar'
                    ? 'طلباتي'
                    : 'My Orders',
                value: ordersLoading ? '...' : orders.length.toString(),
              },
              {
                icon: FileText,
                label:
                  language === 'fa'
                    ? 'RFQ های من'
                    : language === 'ar'
                    ? 'طلبات الأسعار'
                    : 'My RFQs',
                value: rfqsLoading ? '...' : rfqs.length.toString(),
              },
              {
                icon: Bell,
                label:
                  language === 'fa'
                    ? 'اعلان‌ها'
                    : language === 'ar'
                    ? 'الإشعارات'
                    : 'Notifications',
                value: notificationsLoading
                  ? '...'
                  : unreadNotificationsCount.toString(),
              },
              {
                icon: Star,
                label:
                  language === 'fa'
                    ? 'علاقه‌مندی‌ها'
                    : language === 'ar'
                    ? 'المفضلة'
                    : 'Favorites',
                // TODO: وصل‌کردن به API علاقه‌مندی‌ها؛ فعلاً 0
                value: '0',
              },
            ].map((item, idx) => (
              <Card key={idx} className="p-5 rounded-2xl border border-border/60 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    <div className="text-2xl font-bold mt-1">{item.value}</div>
                  </div>
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="p-6 rounded-2xl border border-border/60">
              <h3 className="font-semibold text-lg">
                {language === 'fa' ? 'سفارش‌های اخیر' : language === 'ar' ? 'الطلبات الأخيرة' : 'Recent Orders'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'fa' ? 'وضعیت سفارش‌های اخیر شما' : language === 'ar' ? 'حالة طلباتك الأخيرة' : 'Status of your latest orders'}
              </p>
              <div className="mt-4 space-y-3">
                {ordersLoading ? (
                  <p className="text-sm text-muted-foreground">
                    {language === 'fa'
                      ? 'در حال بارگذاری سفارش‌ها...'
                      : language === 'ar'
                      ? 'جارٍ تحميل الطلبات...'
                      : 'Loading orders...'}
                  </p>
                ) : orders.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {language === 'fa'
                      ? 'هنوز سفارشی ثبت نکرده‌اید.'
                      : language === 'ar'
                      ? 'لم تقم بإنشاء أي طلب بعد.'
                      : 'You have no orders yet.'}
                  </p>
                ) : (
                  orders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/40 transition-colors"
                    >
                      <div>
                        <p className="font-medium">Order #{order.orderNumber}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.quantity} pcs · {order.currency} {order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          'border-green-300 bg-green-100 text-green-700',
                          order.status !== 'delivered' && 'border-amber-300 bg-amber-100 text-amber-700'
                        )}
                      >
                        {order.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
              <Button asChild variant="outline" className="w-full mt-4 rounded-xl">
                <Link to="/orders/">
                  {language === 'fa' ? 'مشاهده همه سفارش‌ها' : language === 'ar' ? 'عرض كل الطلبات' : 'View all orders'}
                  <ArrowRight className={cn('ms-2 h-4 w-4', dir === 'rtl' && 'rotate-180')} />
                </Link>
              </Button>
            </Card>

            <Card className="p-6 rounded-2xl border border-border/60">
              <h3 className="font-semibold text-lg">
                {language === 'fa' ? 'درخواست‌های قیمت (RFQ)' : language === 'ar' ? 'طلبات الأسعار' : 'Request for Quotation (RFQ)'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'fa' ? 'پاسخ‌های جدید را بررسی کنید' : language === 'ar' ? 'تحقق من الردود الجديدة' : 'Check new responses'}
              </p>
              <div className="mt-4 space-y-3">
                {rfqsLoading ? (
                  <p className="text-sm text-muted-foreground">
                    {language === 'fa'
                      ? 'در حال بارگذاری RFQ ها...'
                      : language === 'ar'
                      ? 'جارٍ تحميل طلبات الأسعار...'
                      : 'Loading RFQs...'}
                  </p>
                ) : rfqs.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {language === 'fa'
                      ? 'هنوز RFQ ثبت نکرده‌اید.'
                      : language === 'ar'
                      ? 'لم تقم بإنشاء أي طلب سعر بعد.'
                      : 'You have no RFQs yet.'}
                  </p>
                ) : (
                  rfqs.slice(0, 2).map((rfq) => (
                    <div
                      key={rfq.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/40 transition-colors"
                    >
                      <div>
                        <p className="font-medium">RFQ #{rfq.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {rfq.productName} · {rfq.quantity} {rfq.unit}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-700 border-blue-300"
                      >
                        {rfq.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button asChild variant="outline" className="rounded-xl">
                  <Link to="/rfq/responses">
                    {language === 'fa' ? 'پاسخ‌ها' : language === 'ar' ? 'الردود' : 'Responses'}
                  </Link>
                </Button>
                <Button asChild className="btn-gradient-primary rounded-xl">
                  <Link to="/post-request">
                    {language === 'fa' ? 'ارسال RFQ جدید' : language === 'ar' ? 'إرسال طلب جديد' : 'Post new RFQ'}
                  </Link>
                </Button>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border border-border/60">
              <h3 className="font-semibold text-lg">
                {language === 'fa' ? 'پیشنهادهای ویژه' : language === 'ar' ? 'عروض خاصة' : 'Special Offers'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'fa' ? 'کالاهای ترند با تخفیف' : language === 'ar' ? 'منتجات رائجة بخصومات' : 'Trending items with discounts'}
              </p>
              <div className="mt-4 space-y-3">
                {[1,2,3].map((id) => (
                  <div key={id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/40 transition-colors">
                    <div>
                      <p className="font-medium">Smart Watch Pro</p>
                      <p className="text-xs text-muted-foreground">-15% · Limited time</p>
                    </div>
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300">HOT</Badge>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4 rounded-xl">
                <Link to="/deals">
                  {language === 'fa' ? 'مشاهده همه' : language === 'ar' ? 'عرض الكل' : 'See all'}
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuyerDashboard;


