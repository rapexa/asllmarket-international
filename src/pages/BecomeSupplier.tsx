import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, TrendingUp, Globe, Shield, Users, Star, Zap, Award, Building2, FileText, Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const BecomeSupplier: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const benefits = [
    {
      icon: Globe,
      title: language === 'fa' ? 'دسترسی جهانی' : language === 'ar' ? 'الوصول العالمي' : 'Global Reach',
      description: language === 'fa'
        ? 'به میلیون‌ها خریدار در سراسر جهان دسترسی پیدا کنید'
        : language === 'ar'
        ? 'الوصول إلى ملايين المشترين في جميع أنحاء العالم'
        : 'Reach millions of buyers worldwide',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      title: language === 'fa' ? 'رشد کسب‌وکار' : language === 'ar' ? 'نمو الأعمال' : 'Business Growth',
      description: language === 'fa'
        ? 'فروش خود را افزایش دهید و به بازارهای جدید دسترسی پیدا کنید'
        : language === 'ar'
        ? 'زيادة مبيعاتك والوصول إلى أسواق جديدة'
        : 'Scale your sales and access new markets',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Shield,
      title: language === 'fa' ? 'امنیت معاملات' : language === 'ar' ? 'أمان المعاملات' : 'Secure Transactions',
      description: language === 'fa'
        ? 'پرداخت‌های امن با سیستم Escrow و محافظت از فروشندگان'
        : language === 'ar'
        ? 'مدفوعات آمنة مع نظام الضمان وحماية البائعين'
        : 'Secure payments with Escrow system and seller protection',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: language === 'fa' ? 'مدیریت آسان' : language === 'ar' ? 'إدارة سهلة' : 'Easy Management',
      description: language === 'fa'
        ? 'داشبورد کامل برای مدیریت محصولات، سفارشات و مشتریان'
        : language === 'ar'
        ? 'لوحة تحكم كاملة لإدارة المنتجات والطلبات والعملاء'
        : 'Complete dashboard to manage products, orders, and customers',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Award,
      title: language === 'fa' ? 'اعتبار و اعتماد' : language === 'ar' ? 'المصداقية والثقة' : 'Credibility & Trust',
      description: language === 'fa'
        ? 'نشان تأیید شده دریافت کنید و اعتماد خریداران را جلب کنید'
        : language === 'ar'
        ? 'احصل على شارة التحقق واكسب ثقة المشترين'
        : 'Get verified badge and build buyer trust',
      color: 'from-amber-500 to-yellow-500',
    },
    {
      icon: Users,
      title: language === 'fa' ? 'پشتیبانی اختصاصی' : language === 'ar' ? 'دعم مخصص' : 'Dedicated Support',
      description: language === 'fa'
        ? 'تیم پشتیبانی 24/7 برای کمک به رشد کسب‌وکار شما'
        : language === 'ar'
        ? 'فريق دعم على مدار الساعة لمساعدتك في نمو أعمالك'
        : '24/7 support team to help grow your business',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const stats = [
    {
      value: '100K+',
      label: language === 'fa' ? 'تأمین‌کننده فعال' : language === 'ar' ? 'مورد نشط' : 'Active Suppliers',
      icon: Building2,
    },
    {
      value: '5M+',
      label: language === 'fa' ? 'خریدار جهانی' : language === 'ar' ? 'مشتر عالمي' : 'Global Buyers',
      icon: Users,
    },
    {
      value: '190+',
      label: language === 'fa' ? 'کشور' : language === 'ar' ? 'دولة' : 'Countries',
      icon: Globe,
    },
    {
      value: '$2B+',
      label: language === 'fa' ? 'حجم معاملات' : language === 'ar' ? 'حجم المعاملات' : 'Transaction Volume',
      icon: TrendingUp,
    },
  ];

  const steps = [
    {
      number: 1,
      title: language === 'fa' ? 'ثبت‌نام' : language === 'ar' ? 'التسجيل' : 'Sign Up',
      description: language === 'fa'
        ? 'حساب تأمین‌کننده خود را ایجاد کنید'
        : language === 'ar'
        ? 'إنشاء حساب مورد الخاص بك'
        : 'Create your supplier account',
      icon: FileText,
    },
    {
      number: 2,
      title: language === 'fa' ? 'تأیید هویت' : language === 'ar' ? 'التحقق من الهوية' : 'Verification',
      description: language === 'fa'
        ? 'مدارک خود را ارسال کنید و تأیید شوید'
        : language === 'ar'
        ? 'إرسال المستندات والتحقق'
        : 'Submit documents and get verified',
      icon: Shield,
    },
    {
      number: 3,
      title: language === 'fa' ? 'افزودن محصولات' : language === 'ar' ? 'إضافة المنتجات' : 'Add Products',
      description: language === 'fa'
        ? 'محصولات خود را اضافه کنید و شروع به فروش کنید'
        : language === 'ar'
        ? 'أضف منتجاتك وابدأ البيع'
        : 'Add your products and start selling',
      icon: Sparkles,
    },
    {
      number: 4,
      title: language === 'fa' ? 'دریافت سفارشات' : language === 'ar' ? 'تلقي الطلبات' : 'Receive Orders',
      description: language === 'fa'
        ? 'سفارشات را دریافت کنید و کسب‌وکار خود را رشد دهید'
        : language === 'ar'
        ? 'تلقي الطلبات وتنمية أعمالك'
        : 'Receive orders and grow your business',
      icon: Star,
    },
  ];

  const handleGetStarted = () => {
    // Navigate to register page with supplier role pre-selected
    navigate('/register?role=supplier', { replace: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 start-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 end-10 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-xl px-6 py-3 rounded-full text-sm font-semibold border border-primary/20">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-primary font-bold">
                {language === 'fa' ? 'شروع کنید و رشد کنید' : language === 'ar' ? 'ابدأ وانمو' : 'Start & Grow'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block text-foreground">
                {language === 'fa' ? 'تأمین‌کننده شوید' : language === 'ar' ? 'كن مورداً' : 'Become a Supplier'}
              </span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'و به میلیون‌ها خریدار دسترسی پیدا کنید' : language === 'ar' ? 'والوصول إلى ملايين المشترين' : '& Reach Millions of Buyers'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === 'fa'
                ? 'به بزرگترین پلتفرم B2B جهانی بپیوندید و کسب‌وکار خود را به سطح بعدی برسانید'
                : language === 'ar'
                ? 'انضم إلى أكبر منصة B2B عالمية وارفع أعمالك إلى المستوى التالي'
                : 'Join the world\'s largest B2B platform and take your business to the next level'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="btn-gradient-accent rounded-2xl text-lg px-10 py-7 shadow-2xl hover:shadow-glow font-semibold group"
                onClick={handleGetStarted}
              >
                <span>
                  {language === 'fa' ? 'شروع کنید' : language === 'ar' ? 'ابدأ الآن' : 'Get Started Now'}
                </span>
                <ArrowRight className={cn("ms-2 h-5 w-5 group-hover:translate-x-1 transition-transform", dir === 'rtl' && "rotate-180")} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl text-lg px-10 py-7 bg-background/80 backdrop-blur-xl border-2 hover:bg-background transition-all font-semibold"
                onClick={() => navigate('/register')}
              >
                {language === 'fa' ? 'اطلاعات بیشتر' : language === 'ar' ? 'مزيد من المعلومات' : 'Learn More'}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card/50 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all group"
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-extrabold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              {language === 'fa' ? 'چرا ASL Market را انتخاب کنید؟' : language === 'ar' ? 'لماذا تختار ASL Market؟' : 'Why Choose ASL Market?'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? 'همه چیزهایی که برای موفقیت در تجارت B2B نیاز دارید'
                : language === 'ar'
                ? 'كل ما تحتاجه للنجاح في التجارة B2B'
                : 'Everything you need to succeed in B2B trade'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className={cn(
                  "p-8 relative overflow-hidden border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group",
                  hoveredFeature === index ? "border-primary shadow-xl" : "border-border"
                )}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* Gradient Background */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                  benefit.color
                )} />

                <div className="relative z-10">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110",
                    benefit.color
                  )}>
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              {language === 'fa' ? 'چطور کار می‌کند؟' : language === 'ar' ? 'كيف يعمل؟' : 'How It Works?'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? 'در 4 قدم ساده شروع به فروش کنید'
                : language === 'ar'
                ? 'ابدأ البيع في 4 خطوات بسيطة'
                : 'Start selling in 4 simple steps'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 start-full w-full h-0.5 bg-gradient-to-r from-primary to-accent z-0" style={{ width: 'calc(100% - 4rem)', left: '50%' }} />
                )}

                <Card className="p-8 text-center relative z-10 bg-card/80 backdrop-blur-xl border-2 border-border hover:border-primary/50 transition-all hover:shadow-xl group">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute top-4 start-4 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-bold text-primary">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              {language === 'fa' ? 'پلن‌های اشتراک' : language === 'ar' ? 'خطط الاشتراك' : 'Subscription Plans'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? 'پلن مناسب خود را انتخاب کنید و شروع کنید'
                : language === 'ar'
                ? 'اختر الخطة المناسبة وابدأ'
                : 'Choose the plan that fits you and get started'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: language === 'fa' ? 'رایگان' : language === 'ar' ? 'مجاني' : 'Free',
                price: '$0',
                features: [
                  language === 'fa' ? '10 محصول' : language === 'ar' ? '10 منتجات' : '10 Products',
                  language === 'fa' ? 'نمایش پایه' : language === 'ar' ? 'عرض أساسي' : 'Basic Display',
                  language === 'fa' ? 'پشتیبانی پایه' : language === 'ar' ? 'دعم أساسي' : 'Basic Support',
                ],
                popular: false,
              },
              {
                name: language === 'fa' ? 'طلایی' : language === 'ar' ? 'ذهبي' : 'Gold',
                price: '$149',
                period: language === 'fa' ? '/ماه' : language === 'ar' ? '/شهر' : '/month',
                features: [
                  language === 'fa' ? 'محصولات نامحدود' : language === 'ar' ? 'منتجات غير محدودة' : 'Unlimited Products',
                  language === 'fa' ? 'اولویت بالا' : language === 'ar' ? 'أولوية عالية' : 'High Priority',
                  language === 'fa' ? 'آنالیتیکس پیشرفته' : language === 'ar' ? 'تحليلات متقدمة' : 'Advanced Analytics',
                  language === 'fa' ? 'پشتیبانی اولویت‌دار' : language === 'ar' ? 'دعم ذو أولوية' : 'Priority Support',
                ],
                popular: true,
              },
              {
                name: language === 'fa' ? 'الماس' : language === 'ar' ? 'الماس' : 'Diamond',
                price: '$299',
                period: language === 'fa' ? '/ماه' : language === 'ar' ? '/شهر' : '/month',
                features: [
                  language === 'fa' ? 'همه امکانات Gold' : language === 'ar' ? 'جميع ميزات Gold' : 'All Gold Features',
                  language === 'fa' ? 'نمایش ویژه' : language === 'ar' ? 'وضع مميز' : 'Featured Placement',
                  language === 'fa' ? 'گزارش‌های سفارشی' : language === 'ar' ? 'تقارير مخصصة' : 'Custom Reports',
                  language === 'fa' ? 'پشتیبانی اختصاصی' : language === 'ar' ? 'دعم مخصص' : 'Dedicated Support',
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={cn(
                  "p-8 relative overflow-hidden border-2 transition-all hover:shadow-2xl hover:-translate-y-2",
                  plan.popular
                    ? "border-primary shadow-xl scale-105"
                    : "border-border"
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 start-0 end-0 bg-gradient-to-r from-primary to-accent text-primary-foreground text-center py-2 text-sm font-bold">
                    {language === 'fa' ? 'محبوب' : language === 'ar' ? 'شائع' : 'Popular'}
                  </div>
                )}
                <div className={cn("pt-4", plan.popular && "pt-8")}>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-extrabold text-primary">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={cn(
                      "w-full rounded-xl h-12 font-semibold",
                      plan.popular
                        ? "btn-gradient-accent"
                        : "btn-gradient-primary"
                    )}
                    onClick={handleGetStarted}
                  >
                    {language === 'fa' ? 'شروع کنید' : language === 'ar' ? 'ابدأ' : 'Get Started'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-light to-accent text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-extrabold">
              {language === 'fa' ? 'آماده شروع هستید؟' : language === 'ar' ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}
            </h2>
            <p className="text-xl text-primary-foreground/90">
              {language === 'fa'
                ? 'همین الان ثبت‌نام کنید و به بزرگترین شبکه B2B جهان بپیوندید'
                : language === 'ar'
                ? 'سجل الآن وانضم إلى أكبر شبكة B2B في العالم'
                : 'Sign up now and join the world\'s largest B2B network'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 rounded-2xl text-lg px-10 py-7 shadow-2xl font-semibold group"
                onClick={handleGetStarted}
              >
                <span>
                  {language === 'fa' ? 'ثبت‌نام رایگان' : language === 'ar' ? 'تسجيل مجاني' : 'Sign Up Free'}
                </span>
                <ArrowRight className={cn("ms-2 h-5 w-5 group-hover:translate-x-1 transition-transform", dir === 'rtl' && "rotate-180")} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl text-lg px-10 py-7 bg-primary-foreground/10 backdrop-blur-xl border-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 transition-all font-semibold"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className={cn("me-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
                {language === 'fa' ? 'بازگشت' : language === 'ar' ? 'رجوع' : 'Go Back'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BecomeSupplier;

