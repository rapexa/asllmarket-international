import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, 
  Package,
  Plane,
  Ship,
  Train,
  MapPin,
  Clock,
  Shield,
  Globe,
  ArrowRight,
  Sparkles,
  Zap,
  Award,
  TrendingUp,
  Headphones,
  DollarSign,
  CheckCircle2,
  BarChart3,
  Navigation,
  Route,
  Boxes,
  Warehouse
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const Logistics: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();

  const services = [
    {
      icon: Ship,
      title: language === 'fa' ? 'حمل دریایی' : language === 'ar' ? 'الشحن البحري' : 'Sea Freight',
      description: language === 'fa'
        ? 'حمل‌ونقل دریایی مقرون‌به‌صرفه برای محموله‌های بزرگ'
        : language === 'ar'
        ? 'شحن بحري اقتصادي للشحنات الكبيرة'
        : 'Cost-effective sea freight for large shipments',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Plane,
      title: language === 'fa' ? 'حمل هوایی' : language === 'ar' ? 'الشحن الجوي' : 'Air Freight',
      description: language === 'fa'
        ? 'حمل سریع و کارآمد برای محموله‌های فوری'
        : language === 'ar'
        ? 'شحن سريع وفعال للشحنات العاجلة'
        : 'Fast and efficient shipping for urgent shipments',
      color: 'from-sky-500 to-blue-500',
    },
    {
      icon: Truck,
      title: language === 'fa' ? 'حمل زمینی' : language === 'ar' ? 'الشحن البري' : 'Road Freight',
      description: language === 'fa'
        ? 'حمل‌ونقل زمینی قابل‌اعتماد در سطح منطقه'
        : language === 'ar'
        ? 'شحن بري موثوق على المستوى الإقليمي'
        : 'Reliable road freight across the region',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Train,
      title: language === 'fa' ? 'حمل ریلی' : language === 'ar' ? 'الشحن بالسكك الحديدية' : 'Rail Freight',
      description: language === 'fa'
        ? 'حمل‌ونقل ریلی برای محموله‌های بزرگ و سنگین'
        : language === 'ar'
        ? 'شحن بالسكك الحديدية للشحنات الكبيرة والثقيلة'
        : 'Rail freight for large and heavy shipments',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Warehouse,
      title: language === 'fa' ? 'انبارداری' : language === 'ar' ? 'التخزين' : 'Warehousing',
      description: language === 'fa'
        ? 'خدمات انبارداری و مدیریت موجودی پیشرفته'
        : language === 'ar'
        ? 'خدمات التخزين وإدارة المخزون المتقدمة'
        : 'Advanced warehousing and inventory management services',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Navigation,
      title: language === 'fa' ? 'ردیابی زنده' : language === 'ar' ? 'تتبع مباشر' : 'Live Tracking',
      description: language === 'fa'
        ? 'ردیابی لحظه‌ای موقعیت محموله در طول مسیر'
        : language === 'ar'
        ? 'تتبع فوري لموقع الشحنة خلال الرحلة'
        : 'Real-time shipment tracking throughout the journey',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const features = [
    {
      number: '01',
      title: language === 'fa' ? 'درخواست نقل‌وانتقال' : language === 'ar' ? 'طلب النقل' : 'Request Shipping',
      description: language === 'fa'
        ? 'درخواست نقل‌وانتقال خود را ارسال کنید و پیشنهادات دریافت کنید'
        : language === 'ar'
        ? 'أرسل طلب النقل واحصل على عروض'
        : 'Submit your shipping request and receive quotes',
      icon: Package,
      color: 'from-primary to-accent',
    },
    {
      number: '02',
      title: language === 'fa' ? 'مقایسه قیمت‌ها' : language === 'ar' ? 'مقارنة الأسعار' : 'Compare Prices',
      description: language === 'fa'
        ? 'قیمت‌ها و خدمات مختلف را مقایسه کنید'
        : language === 'ar'
        ? 'قارن الأسعار والخدمات المختلفة'
        : 'Compare different prices and services',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: '03',
      title: language === 'fa' ? 'انتخاب روش حمل' : language === 'ar' ? 'اختيار طريقة الشحن' : 'Choose Method',
      description: language === 'fa'
        ? 'بهترین روش حمل را بر اساس نیاز خود انتخاب کنید'
        : language === 'ar'
        ? 'اختر أفضل طريقة شحن بناءً على احتياجاتك'
        : 'Choose the best shipping method based on your needs',
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-500',
    },
    {
      number: '04',
      title: language === 'fa' ? 'بسته‌بندی و بارگیری' : language === 'ar' ? 'التعبئة والتغليف' : 'Packaging & Loading',
      description: language === 'fa'
        ? 'محصولات شما با استانداردهای بین‌المللی بسته‌بندی می‌شوند'
        : language === 'ar'
        ? 'يتم تعبئة منتجاتك وفق معايير دولية'
        : 'Your products are packaged to international standards',
      icon: Boxes,
      color: 'from-yellow-500 to-amber-500',
    },
    {
      number: '05',
      title: language === 'fa' ? 'ارسال و ردیابی' : language === 'ar' ? 'الإرسال والتتبع' : 'Ship & Track',
      description: language === 'fa'
        ? 'محموله ارسال می‌شود و می‌توانید ردیابی زنده داشته باشید'
        : language === 'ar'
        ? 'يتم إرسال الشحنة ويمكنك متابعتها مباشرة'
        : 'Shipment is sent and you can track it live',
      icon: Route,
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: '06',
      title: language === 'fa' ? 'تحویل به موقع' : language === 'ar' ? 'التسليم في الوقت المحدد' : 'Timely Delivery',
      description: language === 'fa'
        ? 'محصولات شما به موقع و با ایمنی کامل تحویل داده می‌شوند'
        : language === 'ar'
        ? 'يتم تسليم منتجاتك في الوقت المحدد وبأمان كامل'
        : 'Your products are delivered on time and safely',
      icon: Clock,
      color: 'from-orange-500 to-red-500',
    },
  ];

  const benefits = [
    {
      icon: Globe,
      title: language === 'fa' ? 'پوشش جهانی' : language === 'ar' ? 'تغطية عالمية' : 'Global Coverage',
      description: language === 'fa'
        ? 'خدمات لجستیک در بیش از 190 کشور جهان'
        : language === 'ar'
        ? 'خدمات لوجستية في أكثر من 190 دولة'
        : 'Logistics services in over 190 countries worldwide',
    },
    {
      icon: DollarSign,
      title: language === 'fa' ? 'قیمت‌های رقابتی' : language === 'ar' ? 'أسعار تنافسية' : 'Competitive Prices',
      description: language === 'fa'
        ? 'بهترین قیمت‌ها با مقایسه چندین ارائه‌دهنده خدمات'
        : language === 'ar'
        ? 'أفضل الأسعار من خلال مقارنة عدة مقدمي خدمات'
        : 'Best prices by comparing multiple service providers',
    },
    {
      icon: Clock,
      title: language === 'fa' ? 'تحویل سریع' : language === 'ar' ? 'تسليم سريع' : 'Fast Delivery',
      description: language === 'fa'
        ? 'گزینه‌های مختلف حمل برای تحویل سریع'
        : language === 'ar'
        ? 'خيارات شحن متنوعة للتسليم السريع'
        : 'Various shipping options for fast delivery',
    },
    {
      icon: Shield,
      title: language === 'fa' ? 'بیمه و امنیت' : language === 'ar' ? 'تأمين وأمان' : 'Insurance & Security',
      description: language === 'fa'
        ? 'بیمه کامل محموله و محافظت در برابر خسارات'
        : language === 'ar'
        ? 'تأمين كامل للشحنة وحماية من الأضرار'
        : 'Complete cargo insurance and damage protection',
    },
    {
      icon: Navigation,
      title: language === 'fa' ? 'ردیابی 24/7' : language === 'ar' ? 'تتبع على مدار الساعة' : '24/7 Tracking',
      description: language === 'fa'
        ? 'ردیابی لحظه‌ای محموله در تمام مراحل حمل'
        : language === 'ar'
        ? 'تتبع فوري للشحنة في جميع مراحل الشحن'
        : 'Real-time tracking of shipment at all shipping stages',
    },
    {
      icon: Headphones,
      title: language === 'fa' ? 'پشتیبانی اختصاصی' : language === 'ar' ? 'دعم مخصص' : 'Dedicated Support',
      description: language === 'fa'
        ? 'تیم پشتیبانی متخصص برای کمک در تمام مراحل'
        : language === 'ar'
        ? 'فريق دعم متخصص للمساعدة في جميع المراحل'
        : 'Expert support team to help at all stages',
    },
  ];

  const stats = [
    {
      number: '190+',
      label: language === 'fa' ? 'کشور' : language === 'ar' ? 'دولة' : 'Countries',
      icon: Globe,
    },
    {
      number: '500+',
      label: language === 'fa' ? 'شرکت لجستیک' : language === 'ar' ? 'شركة لوجستية' : 'Logistics Partners',
      icon: Truck,
    },
    {
      number: '99.8%',
      label: language === 'fa' ? 'نرخ تحویل' : language === 'ar' ? 'معدل التسليم' : 'Delivery Rate',
      icon: CheckCircle2,
    },
    {
      number: '24/7',
      label: language === 'fa' ? 'پشتیبانی' : language === 'ar' ? 'دعم' : 'Support',
      icon: Headphones,
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
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-primary font-bold">
                {language === 'fa' ? 'خدمات لجستیک' : language === 'ar' ? 'خدمات لوجستية' : 'Logistics Services'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block text-foreground">
                {language === 'fa' ? 'حمل‌ونقل بین‌المللی' : language === 'ar' ? 'نقل دولي' : 'International Shipping'}
              </span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'راه‌حل‌های لجستیک کامل' : language === 'ar' ? 'حلول لوجستية كاملة' : 'Complete Logistics Solutions'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === 'fa'
                ? 'از بسته‌بندی تا تحویل، ما تمام نیازهای لجستیک شما را پوشش می‌دهیم'
                : language === 'ar'
                ? 'من التعبئة إلى التسليم، نغطي جميع احتياجاتك اللوجستية'
                : 'From packaging to delivery, we cover all your logistics needs'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="btn-gradient-primary rounded-2xl px-10 py-7 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                onClick={() => navigate('/contact')}
              >
                {language === 'fa' ? 'درخواست نقل‌وانتقال' : language === 'ar' ? 'طلب النقل' : 'Request Quote'}
                <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl px-10 py-7 text-lg font-semibold bg-background/80 backdrop-blur-xl border-2 hover:bg-background transition-all"
                onClick={() => navigate('/contact')}
              >
                {language === 'fa' ? 'ردیابی محموله' : language === 'ar' ? 'تتبع الشحنة' : 'Track Shipment'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-accent">
                {language === 'fa' ? 'خدمات' : language === 'ar' ? 'خدمات' : 'Services'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {language === 'fa' ? 'خدمات لجستیک ما' : language === 'ar' ? 'خدماتنا اللوجستية' : 'Our Logistics Services'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? 'راه‌حل‌های جامع برای تمام نیازهای حمل‌ونقل شما'
                : language === 'ar'
                ? 'حلول شاملة لجميع احتياجات النقل الخاصة بك'
                : 'Comprehensive solutions for all your shipping needs'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
                >
                  <div className={cn(
                    "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                    service.color
                  )}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
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
              {language === 'fa' ? 'فرآیند لجستیک در 6 مرحله' : language === 'ar' ? 'العملية اللوجستية في 6 خطوات' : 'Logistics Process in 6 Steps'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? 'فرآیند ساده و شفاف برای حمل‌ونقل موفق'
                : language === 'ar'
                ? 'عملية بسيطة وشفافة للنقل الناجح'
                : 'Simple and transparent process for successful shipping'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
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
                        feature.color
                      )}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {feature.number}
                        </Badge>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {feature.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {language === 'fa' ? 'چرا خدمات لجستیک ما؟' : language === 'ar' ? 'لماذا خدماتنا اللوجستية؟' : 'Why Our Logistics Services?'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? 'مزایایی که ما را از دیگران متمایز می‌کند'
                : language === 'ar'
                ? 'المزايا التي تميزنا عن الآخرين'
                : 'Advantages that set us apart from others'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-all border-2">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-extrabold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
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
                <Truck className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                  {language === 'fa' ? 'آماده شروع هستید؟' : language === 'ar' ? 'هل أنت جاهز للبدء؟' : 'Ready to Get Started?'}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {language === 'fa'
                    ? 'درخواست نقل‌وانتقال خود را ارسال کنید و بهترین قیمت‌ها را دریافت کنید'
                    : language === 'ar'
                    ? 'أرسل طلب النقل واحصل على أفضل الأسعار'
                    : 'Submit your shipping request and get the best prices'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="btn-gradient-primary rounded-xl px-10 py-6 font-semibold"
                  onClick={() => navigate('/contact')}
                >
                  {language === 'fa' ? 'درخواست نقل‌وانتقال' : language === 'ar' ? 'طلب النقل' : 'Request Quote'}
                  <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl px-10 py-6 font-semibold"
                  onClick={() => navigate('/contact')}
                >
                  {language === 'fa' ? 'ردیابی محموله' : language === 'ar' ? 'تتبع الشحنة' : 'Track Shipment'}
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

export default Logistics;
