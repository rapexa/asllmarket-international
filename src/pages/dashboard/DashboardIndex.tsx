import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ArrowRight, Building2, ShoppingCart, Store, User } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

type UserRole = 'buyer' | 'supplier' | 'market' | 'visitor' | 'admin';

const DashboardIndex: React.FC = () => {
  const { language, dir } = useLanguage();
  const location = useLocation();

  const authToken = localStorage.getItem('authToken');
  const role = (localStorage.getItem('userRole') as UserRole | null) || null;

  if (authToken && role) {
    if (role === 'buyer') return <Navigate to="/dashboard/buyer" replace />;
    if (role === 'supplier') return <Navigate to="/dashboard/supplier" replace />;
    if (role === 'market') return <Navigate to="/dashboard/market" replace />;
    if (role === 'visitor') return <Navigate to="/dashboard/visitor" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <main className="container px-4 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              {language === 'fa'
                ? 'داشبورد'
                : language === 'ar'
                ? 'لوحة التحكم'
                : 'Dashboard'}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base leading-relaxed">
              {language === 'fa'
                ? 'داشبورد مخصوص نقش شما. اگر وارد حساب نشده‌اید، ابتدا وارد شوید.'
                : language === 'ar'
                ? 'لوحة تحكم حسب دورك. إذا لم تسجل الدخول، قم بتسجيل الدخول أولاً.'
                : 'A role-based dashboard. If you are not logged in, please sign in first.'}
            </p>
          </div>

          {!authToken && (
            <Card className="p-6 sm:p-8 md:p-10 rounded-2xl border border-border/60 shadow-xl mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold">
                    {language === 'fa' ? 'ابتدا وارد شوید' : language === 'ar' ? 'سجّل الدخول أولاً' : 'Sign in first'}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    {language === 'fa'
                      ? 'برای دسترسی به داشبورد و امکانات کامل، لاگین کنید.'
                      : language === 'ar'
                      ? 'للوصول إلى لوحة التحكم والميزات الكاملة، قم بتسجيل الدخول.'
                      : 'Log in to access your dashboard and full features.'}
                  </p>
                </div>
                <Button asChild className="btn-gradient-primary rounded-xl">
                  <Link to="/login" state={{ from: location }}>
                    {language === 'fa' ? 'ورود' : language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                    <ArrowRight className={cn('ms-2 h-5 w-5', dir === 'rtl' && 'rotate-180')} />
                  </Link>
                </Button>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 sm:p-6 rounded-2xl border border-border/60 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {language === 'fa' ? 'خریدار' : language === 'ar' ? 'مشتري' : 'Buyer'}
                  </p>
                  <h3 className="font-bold text-lg mt-1">
                    {language === 'fa' ? 'داشبورد خریدار' : language === 'ar' ? 'لوحة المشتري' : 'Buyer Dashboard'}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === 'fa'
                      ? 'پیگیری سفارش‌ها، RFQها و اعلان‌ها'
                      : language === 'ar'
                      ? 'تتبع الطلبات وطلبات الأسعار والإشعارات'
                      : 'Track orders, RFQs, and notifications'}
                  </p>
                </div>
                <ShoppingCart className="h-7 w-7 text-primary shrink-0" />
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full rounded-xl">
                  <Link to="/dashboard/buyer">
                    {language === 'fa' ? 'مشاهده' : language === 'ar' ? 'عرض' : 'Open'}
                  </Link>
                </Button>
              </div>
            </Card>

            <Card className="p-5 sm:p-6 rounded-2xl border border-border/60 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {language === 'fa' ? 'تأمین‌کننده' : language === 'ar' ? 'مورد' : 'Supplier'}
                  </p>
                  <h3 className="font-bold text-lg mt-1">
                    {language === 'fa' ? 'داشبورد تأمین‌کننده' : language === 'ar' ? 'لوحة المورد' : 'Supplier Dashboard'}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === 'fa'
                      ? 'محصولات، سفارش‌ها، احراز هویت و اشتراک'
                      : language === 'ar'
                      ? 'المنتجات والطلبات والتحقق والاشتراك'
                      : 'Products, orders, verification & subscription'}
                  </p>
                </div>
                <Store className="h-7 w-7 text-primary shrink-0" />
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full rounded-xl">
                  <Link to="/dashboard/supplier">
                    {language === 'fa' ? 'مشاهده' : language === 'ar' ? 'عرض' : 'Open'}
                  </Link>
                </Button>
              </div>
            </Card>

            <Card className="p-5 sm:p-6 rounded-2xl border border-border/60 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {language === 'fa' ? 'بازار' : language === 'ar' ? 'سوق' : 'Market'}
                  </p>
                  <h3 className="font-bold text-lg mt-1">
                    {language === 'fa' ? 'داشبورد بازار' : language === 'ar' ? 'لوحة السوق' : 'Market Dashboard'}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === 'fa'
                      ? 'آمار، مدیریت و گزارش‌ها'
                      : language === 'ar'
                      ? 'إحصائيات وإدارة وتقارير'
                      : 'Analytics, management and reports'}
                  </p>
                </div>
                <Building2 className="h-7 w-7 text-primary shrink-0" />
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full rounded-xl">
                  <Link to="/dashboard/market">
                    {language === 'fa' ? 'مشاهده' : language === 'ar' ? 'عرض' : 'Open'}
                  </Link>
                </Button>
              </div>
            </Card>

            <Card className="p-5 sm:p-6 rounded-2xl border border-border/60 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {language === 'fa' ? 'بازدیدکننده' : language === 'ar' ? 'زائر' : 'Visitor'}
                  </p>
                  <h3 className="font-bold text-lg mt-1">
                    {language === 'fa' ? 'داشبورد بازدیدکننده' : language === 'ar' ? 'لوحة الزائر' : 'Visitor Dashboard'}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === 'fa'
                      ? 'ذخیره‌ها، پیشنهادها و شروع سریع'
                      : language === 'ar'
                      ? 'المحفوظات والاقتراحات والبداية السريعة'
                      : 'Saved items, suggestions, quick start'}
                  </p>
                </div>
                <User className="h-7 w-7 text-primary shrink-0" />
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full rounded-xl">
                  <Link to="/dashboard/visitor">
                    {language === 'fa' ? 'مشاهده' : language === 'ar' ? 'عرض' : 'Open'}
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardIndex;


