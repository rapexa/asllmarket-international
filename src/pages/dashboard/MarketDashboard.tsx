import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const MarketDashboard: React.FC = () => {
  const { language, dir } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <main className="container px-4 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              {language === 'fa' ? 'داشبورد بازار' : language === 'ar' ? 'لوحة السوق' : 'Market Dashboard'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {language === 'fa'
                ? 'تحلیل‌ها، مدیریت و دسترسی سریع به پنل ادمین'
                : language === 'ar'
                ? 'التحليلات والإدارة والوصول إلى لوحة الإدارة'
                : 'Analytics, management and quick access to Admin Panel'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="p-6 rounded-2xl border border-border/60">
              <h3 className="font-semibold text-lg">KPI</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'fa' ? 'شاخص‌های کلیدی عملکرد' : language === 'ar' ? 'المؤشرات الرئيسية' : 'Key Performance Indicators'}
              </p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 rounded-lg border">
                  <p className="text-xs text-muted-foreground">Active Users</p>
                  <p className="text-xl font-bold mt-1">45,678</p>
                </div>
                <div className="p-3 rounded-lg border">
                  <p className="text-xs text-muted-foreground">Orders</p>
                  <p className="text-xl font-bold mt-1">12,345</p>
                </div>
                <div className="p-3 rounded-lg border">
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <p className="text-xl font-bold mt-1">$1.25M</p>
                </div>
                <div className="p-3 rounded-lg border">
                  <p className="text-xs text-muted-foreground">RFQs</p>
                  <p className="text-xl font-bold mt-1">2,345</p>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full mt-4 rounded-xl">
                <Link to="/admin/reports">
                  {language === 'fa' ? 'گزارش‌ها' : language === 'ar' ? 'التقارير' : 'Reports'}
                  <BarChart3 className="ms-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>

            <Card className="p-6 rounded-2xl border border-border/60 lg:col-span-2">
              <h3 className="font-semibold text-lg">
                {language === 'fa' ? 'تنظیمات و مدیریت' : language === 'ar' ? 'الإعدادات والإدارة' : 'Settings & Management'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'fa' ? 'دسترسی سریع به پنل ادمین' : language === 'ar' ? 'وصول سريع إلى لوحة الإدارة' : 'Quick access to admin panel'}
              </p>
              <div className="mt-4 p-4 rounded-xl border flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {language === 'fa' ? 'پنل ادمین' : language === 'ar' ? 'لوحة الإدارة' : 'Admin Panel'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'fa' ? 'مدیریت کامل سیستم' : language === 'ar' ? 'إدارة النظام بالكامل' : 'Full system management'}
                  </p>
                </div>
                <Button asChild className="btn-gradient-primary rounded-xl">
                  <Link to="/admin">
                    {language === 'fa' ? 'ورود' : language === 'ar' ? 'دخول' : 'Enter'}
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

export default MarketDashboard;


