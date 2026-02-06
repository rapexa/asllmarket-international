import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Package, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import VerificationDashboard from '@/components/verification/VerificationDashboard';
import SubscriptionDashboard from '@/components/subscription/SubscriptionDashboard';
import { useQuery } from '@tanstack/react-query';
import { supplierService, orderService, productService } from '@/services';

const SupplierDashboard: React.FC = () => {
  const { language, dir } = useLanguage();

  const {
    data: supplier,
    isLoading: supplierLoading,
  } = useQuery({
    queryKey: ['supplierDashboard', 'profile'],
    queryFn: () => supplierService.getMyProfile(),
  });

  const {
    data: productsData,
    isLoading: productsLoading,
  } = useQuery({
    queryKey: ['supplierDashboard', 'products', supplier?.id],
    queryFn: () =>
      productService.list({
        supplierId: supplier!.id,
        limit: 10,
        offset: 0,
      }),
    enabled: !!supplier,
  });

  const {
    data: supplierOrdersData,
    isLoading: supplierOrdersLoading,
  } = useQuery({
    queryKey: ['supplierDashboard', 'orders', supplier?.id],
    queryFn: () =>
      orderService.getSupplierOrders(supplier!.id, {
        limit: 5,
        offset: 0,
      }),
    enabled: !!supplier,
  });

  const products = productsData?.items ?? [];
  const supplierOrders = supplierOrdersData?.items ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <main className="container px-4 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="space-y-6 sm:space-y-8">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              {language === 'fa' ? 'داشبورد تأمین‌کننده' : language === 'ar' ? 'لوحة المورد' : 'Supplier Dashboard'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {language === 'fa'
                ? 'مدیریت محصولات، سفارش‌ها، احراز هویت و اشتراک'
                : language === 'ar'
                ? 'إدارة المنتجات والطلبات والتحقق والاشتراك'
                : 'Manage products, orders, verification and subscription'}
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Package,
                label:
                  language === 'fa'
                    ? 'محصولات'
                    : language === 'ar'
                    ? 'المنتجات'
                    : 'Products',
                value: supplierLoading
                  ? '...'
                  : (supplier?.totalProducts ?? products.length).toString(),
              },
              {
                icon: ShoppingCart,
                label:
                  language === 'fa'
                    ? 'سفارشات'
                    : language === 'ar'
                    ? 'الطلبات'
                    : 'Orders',
                value: supplierLoading
                  ? '...'
                  : (supplier?.totalOrders ?? supplierOrders.length).toString(),
              },
              {
                icon: CheckCircle2,
                label:
                  language === 'fa'
                    ? 'تأیید شده'
                    : language === 'ar'
                    ? 'تم التحقق'
                    : 'Verified',
                value: supplierLoading
                  ? '...'
                  : supplier?.verified
                  ? language === 'fa'
                    ? 'بله'
                    : language === 'ar'
                    ? 'نعم'
                    : 'Yes'
                  : language === 'fa'
                  ? 'خیر'
                  : language === 'ar'
                  ? 'لا'
                  : 'No',
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

          {/* Verification & Subscription */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <VerificationDashboard
              initialStatus={supplier?.verified ? 'verified' : 'pending'}
            />
            <SubscriptionDashboard
              currentPlan={supplier?.subscription ?? 'free'}
              billingCycle="monthly"
            />
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-6 rounded-2xl border border-border/60">
              <h3 className="font-semibold text-lg">
                {language === 'fa' ? 'محصولات من' : language === 'ar' ? 'منتجاتي' : 'My Products'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'fa' ? 'مدیریت، ویرایش و افزودن محصولات' : language === 'ar' ? 'إدارة المنتجات' : 'Manage and add products'}
              </p>
              <div className="mt-4 space-y-3">
                {productsLoading ? (
                  <p className="text-sm text-muted-foreground">
                    {language === 'fa'
                      ? 'در حال بارگذاری محصولات...'
                      : language === 'ar'
                      ? 'جارٍ تحميل المنتجات...'
                      : 'Loading products...'}
                  </p>
                ) : products.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {language === 'fa'
                      ? 'هنوز محصولی ثبت نکرده‌اید.'
                      : language === 'ar'
                      ? 'لم تقم بإضافة أي منتج بعد.'
                      : 'You have no products yet.'}
                  </p>
                ) : (
                  products.slice(0, 3).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/40 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Stock: {product.stockQuantity} ·{' '}
                          {product.currency} {product.price.toFixed(2)}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-slate-100 text-slate-700 border-slate-300"
                      >
                        {product.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button asChild variant="outline" className="rounded-xl">
                  <Link to="/dashboard/supplier">
                    {language === 'fa' ? 'مدیریت' : language === 'ar' ? 'إدارة' : 'Manage'}
                  </Link>
                </Button>
                <Button asChild className="btn-gradient-primary rounded-xl">
                  <Link to="/dashboard/supplier">
                    {language === 'fa' ? 'افزودن محصول' : language === 'ar' ? 'إضافة منتج' : 'Add Product'}
                    <ArrowRight className={cn('ms-2 h-4 w-4', dir === 'rtl' && 'rotate-180')} />
                  </Link>
                </Button>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border border-border/60">
              <h3 className="font-semibold text-lg">
                {language === 'fa' ? 'سفارش‌های اخیر' : language === 'ar' ? 'الطلبات الأخيرة' : 'Recent Orders'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'fa' ? 'وضعیت سفارش‌ها را بررسی کنید' : language === 'ar' ? 'تحقق من حالة الطلبات' : 'Check order statuses'}
              </p>
              <div className="mt-4 space-y-3">
                {supplierOrdersLoading ? (
                  <p className="text-sm text-muted-foreground">
                    {language === 'fa'
                      ? 'در حال بارگذاری سفارش‌ها...'
                      : language === 'ar'
                      ? 'جارٍ تحميل الطلبات...'
                      : 'Loading orders...'}
                  </p>
                ) : supplierOrders.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {language === 'fa'
                      ? 'هنوز سفارشی دریافت نکرده‌اید.'
                      : language === 'ar'
                      ? 'لم تستلم أي طلب بعد.'
                      : 'You have no orders yet.'}
                  </p>
                ) : (
                  supplierOrders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/40 transition-colors"
                    >
                      <div>
                        <p className="font-medium">Order #{order.orderNumber}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.quantity} pcs · {order.currency}{' '}
                          {order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-cyan-100 text-cyan-700 border-cyan-300"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
              <Button asChild variant="outline" className="w-full mt-4 rounded-xl">
                <Link to="/dashboard/supplier">
                  {language === 'fa' ? 'مشاهده همه سفارش‌ها' : language === 'ar' ? 'عرض كل الطلبات' : 'View all orders'}
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

export default SupplierDashboard;


