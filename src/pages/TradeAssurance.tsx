import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Lock,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Clock,
  FileCheck,
  Users,
  Globe,
  ArrowRight,
  Sparkles,
  Zap,
  Award,
  TrendingUp,
  Headphones,
  CreditCard,
  Package,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const TradeAssurance: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: language === 'fa' ? 'محافظت کامل' : language === 'ar' ? 'حماية كاملة' : 'Complete Protection',
      description: language === 'fa'
        ? 'محافظت از خریداران و فروشندگان در تمام مراحل معامله'
        : language === 'ar'
        ? 'حماية المشترين والموردين في جميع مراحل المعاملة'
        : 'Protection for buyers and suppliers at all stages of the transaction',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Lock,
      title: language === 'fa' ? 'پرداخت امن' : language === 'ar' ? 'دفع آمن' : 'Secure Payment',
      description: language === 'fa'
        ? 'سیستم Escrow که وجوه را تا تکمیل سفارش نگه می‌دارد'
        : language === 'ar'
        ? 'نظام الضمان الذي يحتفظ بالأموال حتى اكتمال الطلب'
        : 'Escrow system that holds funds until order completion',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: CheckCircle2,
      title: language === 'fa' ? 'تضمین کیفیت' : language === 'ar' ? 'ضمان الجودة' : 'Quality Guarantee',
      description: language === 'fa'
        ? 'تضمین کیفیت محصولات و مطابقت با مشخصات'
        : language === 'ar'
        ? 'ضمان جودة المنتجات ومطابقتها مع المواصفات'
        : 'Guarantee of product quality and specification compliance',
      color: 'from-yellow-500 to-amber-500',
    },
    {
      icon: Clock,
      title: language === 'fa' ? 'تضمین زمان تحویل' : language === 'ar' ? 'ضمان وقت التسليم' : 'Delivery Time Guarantee',
      description: language === 'fa'
        ? 'تضمین تحویل به موقع محصولات طبق توافق'
        : language === 'ar'
        ? 'ضمان التسليم في الوقت المحدد للمنتجات حسب الاتفاق'
        : 'Guarantee of timely product delivery as agreed',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: FileCheck,
      title: language === 'fa' ? 'مستندات معتبر' : language === 'ar' ? 'مستندات موثقة' : 'Verified Documents',
      description: language === 'fa'
        ? 'بررسی و تأیید تمام مستندات معامله'
        : language === 'ar'
        ? 'مراجعة وتأكيد جميع مستندات المعاملة'
        : 'Review and verification of all transaction documents',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Headphones,
      title: language === 'fa' ? 'پشتیبانی اختصاصی' : language === 'ar' ? 'دعم مخصص' : 'Dedicated Support',
      description: language === 'fa'
        ? 'تیم پشتیبانی اختصاصی برای حل اختلافات'
        : language === 'ar'
        ? 'فريق دعم مخصص لحل النزاعات'
        : 'Dedicated support team for dispute resolution',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const howItWorks = [
    {
      number: '01',
      title: language === 'fa' ? 'فعال‌سازی Trade Assurance' : language === 'ar' ? 'تفعيل Trade Assurance' : 'Activate Trade Assurance',
      description: language === 'fa'
        ? 'Trade Assurance را در هنگام ثبت سفارش فعال کنید'
        : language === 'ar'
        ? 'فعّل Trade Assurance عند تسجيل الطلب'
        : 'Activate Trade Assurance when placing your order',
      icon: Shield,
      color: 'from-primary to-accent',
    },
    {
      number: '02',
      title: language === 'fa' ? 'پرداخت به Escrow' : language === 'ar' ? 'الدفع إلى الضمان' : 'Payment to Escrow',
      description: language === 'fa'
        ? 'پرداخت شما به حساب Escrow امن منتقل می‌شود'
        : language === 'ar'
        ? 'يتم تحويل دفعتك إلى حساب الضمان الآمن'
        : 'Your payment is transferred to a secure Escrow account',
      icon: CreditCard,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: '03',
      title: language === 'fa' ? 'تأیید سفارش' : language === 'ar' ? 'تأكيد الطلب' : 'Order Confirmation',
      description: language === 'fa'
        ? 'تأمین‌کننده سفارش را تأیید می‌کند و تولید/ارسال را شروع می‌کند'
        : language === 'ar'
        ? 'يؤكد المورد الطلب ويبدأ الإنتاج/الشحن'
        : 'Supplier confirms order and starts production/shipping',
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-500',
    },
    {
      number: '04',
      title: language === 'fa' ? 'بررسی کیفیت' : language === 'ar' ? 'فحص الجودة' : 'Quality Inspection',
      description: language === 'fa'
        ? 'محصولات قبل از ارسال از نظر کیفیت بررسی می‌شوند'
        : language === 'ar'
        ? 'يتم فحص المنتجات من حيث الجودة قبل الشحن'
        : 'Products are inspected for quality before shipping',
      icon: FileCheck,
      color: 'from-yellow-500 to-amber-500',
    },
    {
      number: '05',
      title: language === 'fa' ? 'تحویل و تأیید' : language === 'ar' ? 'التسليم والتأكيد' : 'Delivery & Confirmation',
      description: language === 'fa'
        ? 'محصولات تحویل داده می‌شوند و شما تأیید می‌کنید'
        : language === 'ar'
        ? 'يتم تسليم المنتجات وتؤكد'
        : 'Products are delivered and you confirm receipt',
      icon: Package,
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: '06',
      title: language === 'fa' ? 'پرداخت به تأمین‌کننده' : language === 'ar' ? 'الدفع للمورد' : 'Payment to Supplier',
      description: language === 'fa'
        ? 'پس از تأیید شما، پرداخت به تأمین‌کننده انجام می‌شود'
        : language === 'ar'
        ? 'بعد تأكيدك، يتم الدفع للمورد'
        : 'After your confirmation, payment is released to supplier',
      icon: DollarSign,
      color: 'from-orange-500 to-red-500',
    },
  ];

  const protections = [
    {
      icon: Users,
      title: language === 'fa' ? 'برای خریداران' : language === 'ar' ? 'للمشترين' : 'For Buyers',
      items: [
        language === 'fa' ? 'محافظت از پرداخت' : language === 'ar' ? 'حماية الدفع' : 'Payment Protection',
        language === 'fa' ? 'تضمین کیفیت محصول' : language === 'ar' ? 'ضمان جودة المنتج' : 'Product Quality Guarantee',
        language === 'fa' ? 'تضمین زمان تحویل' : language === 'ar' ? 'ضمان وقت التسليم' : 'Delivery Time Guarantee',
        language === 'fa' ? 'حل اختلافات' : language === 'ar' ? 'حل النزاعات' : 'Dispute Resolution',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Globe,
      title: language === 'fa' ? 'برای فروشندگان' : language === 'ar' ? 'للموردين' : 'For Suppliers',
      items: [
        language === 'fa' ? 'پرداخت تضمین شده' : language === 'ar' ? 'دفع مضمون' : 'Guaranteed Payment',
        language === 'fa' ? 'محافظت از معاملات' : language === 'ar' ? 'حماية المعاملات' : 'Transaction Protection',
        language === 'fa' ? 'پشتیبانی در اختلافات' : language === 'ar' ? 'دعم في النزاعات' : 'Support in Disputes',
        language === 'fa' ? 'افزایش اعتماد' : language === 'ar' ? 'زيادة الثقة' : 'Increased Trust',
      ],
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: language === 'fa' ? 'افزایش اعتماد' : language === 'ar' ? 'زيادة الثقة' : 'Increased Trust',
      description: language === 'fa'
        ? 'Trade Assurance اعتماد بین خریداران و فروشندگان را افزایش می‌دهد'
        : language === 'ar'
        ? 'Trade Assurance يزيد الثقة بين المشترين والموردين'
        : 'Trade Assurance increases trust between buyers and suppliers',
    },
    {
      icon: Award,
      title: language === 'fa' ? 'کیفیت تضمین شده' : language === 'ar' ? 'جودة مضمونة' : 'Guaranteed Quality',
      description: language === 'fa'
        ? 'محصولات با کیفیت تضمین شده و مطابق با مشخصات'
        : language === 'ar'
        ? 'منتجات بجودة مضمونة ومطابقة للمواصفات'
        : 'Products with guaranteed quality and specification compliance',
    },
    {
      icon: Zap,
      title: language === 'fa' ? 'حل سریع اختلافات' : language === 'ar' ? 'حل سريع للنزاعات' : 'Quick Dispute Resolution',
      description: language === 'fa'
        ? 'تیم پشتیبانی ما اختلافات را به سرعت حل می‌کند'
        : language === 'ar'
        ? 'فريق الدعم لدينا يحل النزاعات بسرعة'
        : 'Our support team resolves disputes quickly',
    },
    {
      icon: Shield,
      title: language === 'fa' ? 'امنیت کامل' : language === 'ar' ? 'أمان كامل' : 'Complete Security',
      description: language === 'fa'
        ? 'محافظت کامل از معاملات با سیستم Escrow امن'
        : language === 'ar'
        ? 'حماية كاملة للمعاملات مع نظام الضمان الآمن'
        : 'Complete transaction protection with secure Escrow system',
    },
  ];

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
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-primary font-bold">
                {language === 'fa' ? 'Trade Assurance' : language === 'ar' ? 'Trade Assurance' : 'Trade Assurance'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block text-foreground">
                {language === 'fa' ? 'تضمین معاملات' : language === 'ar' ? 'ضمان المعاملات' : 'Transaction Guarantee'}
              </span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'محافظت کامل از خریداران و فروشندگان' : language === 'ar' ? 'حماية كاملة للمشترين والموردين' : 'Complete Protection for Buyers & Suppliers'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === 'fa'
                ? 'سیستم تضمین معاملات ما از شما در تمام مراحل خرید و فروش محافظت می‌کند'
                : language === 'ar'
                ? 'نظام ضمان المعاملات لدينا يحميك في جميع مراحل الشراء والبيع'
                : 'Our transaction guarantee system protects you at all stages of buying and selling'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="btn-gradient-primary rounded-2xl px-10 py-7 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                onClick={() => navigate('/register')}
              >
                {language === 'fa' ? 'شروع کنید' : language === 'ar' ? 'ابدأ' : 'Get Started'}
                <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl px-10 py-7 text-lg font-semibold bg-background/80 backdrop-blur-xl border-2 hover:bg-background transition-all"
                onClick={() => navigate('/contact')}
              >
                {language === 'fa' ? 'اطلاعات بیشتر' : language === 'ar' ? 'مزيد من المعلومات' : 'Learn More'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-accent">
                {language === 'fa' ? 'ویژگی‌ها' : language === 'ar' ? 'الميزات' : 'Features'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {language === 'fa' ? 'چرا Trade Assurance؟' : language === 'ar' ? 'لماذا Trade Assurance؟' : 'Why Trade Assurance?'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? 'محافظت کامل در تمام مراحل معامله'
                : language === 'ar'
                ? 'حماية كاملة في جميع مراحل المعاملة'
                : 'Complete protection at all stages of the transaction'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
                >
                  <div className={cn(
                    "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                    feature.color
                  )}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                {language === 'fa' ? 'نحوه کار' : language === 'ar' ? 'كيف يعمل' : 'How It Works'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {language === 'fa' ? 'فرآیند Trade Assurance' : language === 'ar' ? 'عملية Trade Assurance' : 'Trade Assurance Process'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? '6 مرحله ساده برای معامله امن و تضمین شده'
                : language === 'ar'
                ? '6 خطوات بسيطة لمعاملة آمنة ومضمونة'
                : '6 simple steps for a secure and guaranteed transaction'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card
                  key={index}
                  className="p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50"
                >
                  <div className="absolute top-0 end-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0",
                        step.color
                      )}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {step.number}
                        </Badge>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Protections Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {language === 'fa' ? 'محافظت برای همه' : language === 'ar' ? 'حماية للجميع' : 'Protection for Everyone'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? 'Trade Assurance از خریداران و فروشندگان به طور یکسان محافظت می‌کند'
                : language === 'ar'
                ? 'Trade Assurance يحمي المشترين والموردين على قدم المساواة'
                : 'Trade Assurance protects buyers and suppliers equally'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {protections.map((protection, index) => {
              const Icon = protection.icon;
              return (
                <Card
                  key={index}
                  className="p-8 relative overflow-hidden border-2 hover:border-primary/50 transition-all"
                >
                  <div className={cn(
                    "absolute top-0 start-0 w-full h-2 bg-gradient-to-r",
                    protection.color
                  )} />
                  <div className="flex items-center gap-4 mb-6">
                    <div className={cn(
                      "w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center",
                      protection.color
                    )}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {protection.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {protection.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {language === 'fa' ? 'مزایای Trade Assurance' : language === 'ar' ? 'مزايا Trade Assurance' : 'Trade Assurance Benefits'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? 'چرا باید از Trade Assurance استفاده کنید'
                : language === 'ar'
                ? 'لماذا يجب استخدام Trade Assurance'
                : 'Why you should use Trade Assurance'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="p-6 flex items-start gap-4 hover:shadow-lg transition-all border-2 hover:border-primary/50"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                  {language === 'fa' ? 'آماده شروع هستید؟' : language === 'ar' ? 'هل أنت جاهز للبدء؟' : 'Ready to Get Started?'}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {language === 'fa'
                    ? 'Trade Assurance را فعال کنید و از معاملات امن و تضمین شده لذت ببرید'
                    : language === 'ar'
                    ? 'فعّل Trade Assurance واستمتع بمعاملات آمنة ومضمونة'
                    : 'Activate Trade Assurance and enjoy secure and guaranteed transactions'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="btn-gradient-primary rounded-xl px-10 py-6 font-semibold"
                  onClick={() => navigate('/register')}
                >
                  {language === 'fa' ? 'شروع کنید' : language === 'ar' ? 'ابدأ' : 'Get Started'}
                  <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl px-10 py-6 font-semibold"
                  onClick={() => navigate('/contact')}
                >
                  {language === 'fa' ? 'تماس با ما' : language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TradeAssurance;


