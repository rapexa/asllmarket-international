import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Lightbulb, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const VisitorDashboard: React.FC = () => {
  const { language, dir } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <main className="container px-4 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              {language === 'fa' ? 'داشبورد بازدیدکننده' : language === 'ar' ? 'لوحة الزائر' : 'Visitor Dashboard'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {language === 'fa'
                ? 'شروع سریع: مشاهده محصولات، ذخیره علاقه‌مندی‌ها و ثبت‌نام'
                : language === 'ar'
                ? 'بداية سريعة: تصفح المنتجات، احفظ المفضلة وسجّل'
                : 'Quick start: browse products, save favorites and register'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="p-6 rounded-2xl border border-border/60">
              <h3 className="font-semibold text-lg">
                {language === 'fa' ? 'علاقه‌مندی‌ها' : language === 'ar' ? 'المفضلة' : 'Favorites'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'fa' ? 'محصولات مورد علاقه‌تان را ذخیره کنید' : language === 'ar' ? 'احفظ منتجاتك المفضلة' : 'Save products you like'}
              </p>
              <div className="mt-4 p-4 rounded-xl border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{language === 'fa' ? 'لیست علاقه‌مندی‌ها' : language === 'ar' ? 'قائمة المفضلة' : 'Wishlist'}</p>
                    <p className="text-xs text-muted-foreground">0 {language === 'fa' ? 'آیتم' : language === 'ar' ? 'عنصر' : 'items'}</p>
                  </div>
                </div>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link to="/products">
                    {language === 'fa' ? 'مشاهده' : language === 'ar' ? 'عرض' : 'View'}
                  </Link>
                </Button>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border border-border/60">
              <h3 className="font-semibold text-lg">
                {language === 'fa' ? 'پیشنهادها' : language === 'ar' ? 'اقتراحات' : 'Suggestions'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'fa' ? 'محبوب‌ترین‌ها و ترندها' : language === 'ar' ? 'الأكثر شعبية والرائجة' : 'Most popular and trending'}
              </p>
              <div className="mt-4 p-4 rounded-xl border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium">{language === 'fa' ? 'پیشنهاد هوشمند' : language === 'ar' ? 'اقتراح ذكي' : 'Smart Suggestion'}</p>
                    <p className="text-xs text-muted-foreground">{language === 'fa' ? 'ساعت هوشمند' : language === 'ar' ? 'ساعة ذكية' : 'Smart Watch'}</p>
                  </div>
                </div>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link to="/deals">
                    {language === 'fa' ? 'مشاهده' : language === 'ar' ? 'عرض' : 'View'}
                  </Link>
                </Button>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border border-border/60">
              <h3 className="font-semibold text-lg">
                {language === 'fa' ? 'ثبت‌نام' : language === 'ar' ? 'تسجيل' : 'Register'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'fa' ? 'برای امکانات کامل ثبت‌نام کنید' : language === 'ar' ? 'سجّل للحصول على الميزات الكاملة' : 'Register for full features'}
              </p>
              <div className="mt-4 p-4 rounded-xl border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserPlus className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{language === 'fa' ? 'ثبت‌نام' : language === 'ar' ? 'تسجيل' : 'Register'}</p>
                    <p className="text-xs text-muted-foreground">{language === 'fa' ? 'خریدار یا تأمین‌کننده' : language === 'ar' ? 'مشتري أو مورد' : 'Buyer or Supplier'}</p>
                  </div>
                </div>
                <Button asChild className="btn-gradient-primary rounded-xl">
                  <Link to="/register">
                    {language === 'fa' ? 'شروع' : language === 'ar' ? 'ابدأ' : 'Start'}
                    <ArrowRight className={cn('ms-2 h-4 w-4', dir === 'rtl' && 'rotate-180')} />
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

export default VisitorDashboard;


