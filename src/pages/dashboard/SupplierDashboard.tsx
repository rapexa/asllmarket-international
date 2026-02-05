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

const SupplierDashboard: React.FC = () => {
  const { language, dir } = useLanguage();

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
              { icon: Package, label: language === 'fa' ? 'محصولات' : language === 'ar' ? 'المنتجات' : 'Products', value: '86' },
              { icon: ShoppingCart, label: language === 'fa' ? 'سفارشات' : language === 'ar' ? 'الطلبات' : 'Orders', value: '42' },
              { icon: CheckCircle2, label: language === 'fa' ? 'تأیید شده' : language === 'ar' ? 'تم التحقق' : 'Verified', value: 'Yes' },
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
            <VerificationDashboard initialStatus="pending" />
            <SubscriptionDashboard currentPlan="silver" billingCycle="monthly" />
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
                {[1,2,3].map((id) => (
                  <div key={id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/40 transition-colors">
                    <div>
                      <p className="font-medium">Smartphone Pro Max</p>
                      <p className="text-xs text-muted-foreground">Stock: 1,500 · Price: $899</p>
                    </div>
                    <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300">Active</Badge>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button asChild variant="outline" className="rounded-xl">
                  <Link to="/admin/products">
                    {language === 'fa' ? 'مدیریت' : language === 'ar' ? 'إدارة' : 'Manage'}
                  </Link>
                </Button>
                <Button asChild className="btn-gradient-primary rounded-xl">
                  <Link to="/admin/products">
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
                {[1,2,3].map((id) => (
                  <div key={id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/40 transition-colors">
                    <div>
                      <p className="font-medium">Order #{22340 + id}</p>
                      <p className="text-xs text-muted-foreground">Buyer: ABC Trading</p>
                    </div>
                    <Badge variant="outline" className="bg-cyan-100 text-cyan-700 border-cyan-300">Shipped</Badge>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4 rounded-xl">
                <Link to="/admin/orders">
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


