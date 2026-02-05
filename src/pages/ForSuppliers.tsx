import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Store, 
  Upload,
  MessageSquare,
  Shield,
  Globe,
  TrendingUp,
  ArrowRight,
  Star,
  Users,
  User,
  Package,
  CreditCard,
  BarChart3,
  Headphones,
  Sparkles,
  Zap,
  Award,
  DollarSign,
  Target,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const ForSuppliers: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Users,
      title: language === 'fa' ? 'دسترسی به میلیون‌ها خریدار' : language === 'ar' ? 'وصول إلى ملايين المشترين' : 'Access to Millions of Buyers',
      description: language === 'fa'
        ? 'به شبکه جهانی خریداران متصل شوید و فروش خود را افزایش دهید'
        : language === 'ar'
        ? 'اتصل بشبكة المشترين العالمية وزد مبيعاتك'
        : 'Connect to the global buyer network and increase your sales',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      title: language === 'fa' ? 'افزایش فروش' : language === 'ar' ? 'زيادة المبيعات' : 'Increase Sales',
      description: language === 'fa'
        ? 'با دسترسی به بازارهای جدید، فروش خود را چند برابر کنید'
        : language === 'ar'
        ? 'ضاعف مبيعاتك بالوصول إلى أسواق جديدة'
        : 'Multiply your sales by accessing new markets',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Shield,
      title: language === 'fa' ? 'پرداخت امن و تضمین شده' : language === 'ar' ? 'دفع آمن ومضمون' : 'Secure & Guaranteed Payment',
      description: language === 'fa'
        ? 'سیستم پرداخت امن با Escrow برای محافظت از شما و خریداران'
        : language === 'ar'
        ? 'نظام دفع آمن مع الضمان لحمايتك والمشترين'
        : 'Secure payment system with Escrow to protect you and buyers',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: BarChart3,
      title: language === 'fa' ? 'ابزارهای تحلیلی' : language === 'ar' ? 'أدوات تحليلية' : 'Analytics Tools',
      description: language === 'fa'
        ? 'داشبورد کامل با آمار و گزارش‌های دقیق فروش'
        : language === 'ar'
        ? 'لوحة تحكم كاملة مع إحصائيات وتقارير مبيعات دقيقة'
        : 'Complete dashboard with detailed sales statistics and reports',
      color: 'from-yellow-500 to-amber-500',
    },
    {
      icon: Award,
      title: language === 'fa' ? 'نمایش ویژه' : language === 'ar' ? 'عرض مميز' : 'Featured Placement',
      description: language === 'fa'
        ? 'با ارتقای حساب، محصولات خود را در اولویت نمایش قرار دهید'
        : language === 'ar'
        ? 'ضع منتجاتك في أولوية العرض مع ترقية الحساب'
        : 'Put your products in display priority with account upgrade',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Headphones,
      title: language === 'fa' ? 'پشتیبانی اختصاصی' : language === 'ar' ? 'دعم مخصص' : 'Dedicated Support',
      description: language === 'fa'
        ? 'تیم پشتیبانی اختصاصی برای کمک به رشد کسب‌وکار شما'
        : language === 'ar'
        ? 'فريق دعم مخصص لمساعدتك على نمو عملك'
        : 'Dedicated support team to help grow your business',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const steps = [
    {
      number: '01',
      title: language === 'fa' ? 'ثبت‌نام و تأیید' : language === 'ar' ? 'التسجيل والتحقق' : 'Register & Verify',
      description: language === 'fa'
        ? 'حساب کاربری خود را ایجاد کنید و هویت کسب‌وکار خود را تأیید کنید'
        : language === 'ar'
        ? 'أنشئ حسابك وتحقق من هوية عملك'
        : 'Create your account and verify your business identity',
      icon: User,
      color: 'from-primary to-accent',
    },
    {
      number: '02',
      title: language === 'fa' ? 'افزودن محصولات' : language === 'ar' ? 'إضافة المنتجات' : 'Add Products',
      description: language === 'fa'
        ? 'محصولات خود را با تصاویر و جزئیات کامل اضافه کنید'
        : language === 'ar'
        ? 'أضف منتجاتك مع صور وتفاصيل كاملة'
        : 'Add your products with images and complete details',
      icon: Upload,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: '03',
      title: language === 'fa' ? 'دریافت درخواست‌ها' : language === 'ar' ? 'تلقي الطلبات' : 'Receive Requests',
      description: language === 'fa'
        ? 'درخواست‌های استعلام قیمت از خریداران را دریافت کنید'
        : language === 'ar'
        ? 'تلقي طلبات عروض الأسعار من المشترين'
        : 'Receive quote requests from buyers',
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-500',
    },
    {
      number: '04',
      title: language === 'fa' ? 'ارسال پیشنهاد' : language === 'ar' ? 'إرسال العرض' : 'Send Quote',
      description: language === 'fa'
        ? 'پیشنهاد قیمت و شرایط خود را برای خریداران ارسال کنید'
        : language === 'ar'
        ? 'أرسل عرض السعر والشروط الخاصة بك للمشترين'
        : 'Send your price quote and terms to buyers',
      icon: Target,
      color: 'from-yellow-500 to-amber-500',
    },
    {
      number: '05',
      title: language === 'fa' ? 'تأیید سفارش' : language === 'ar' ? 'تأكيد الطلب' : 'Confirm Order',
      description: language === 'fa'
        ? 'سفارشات را تأیید کنید و پرداخت امن را دریافت کنید'
        : language === 'ar'
        ? 'أكد الطلبات واحصل على دفع آمن'
        : 'Confirm orders and receive secure payment',
      icon: CheckCircle2,
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: '06',
      title: language === 'fa' ? 'ارسال و رشد' : language === 'ar' ? 'الشحن والنمو' : 'Ship & Grow',
      description: language === 'fa'
        ? 'محصولات را ارسال کنید و کسب‌وکار خود را رشد دهید'
        : language === 'ar'
        ? 'أرسل المنتجات ونم عملك'
        : 'Ship products and grow your business',
      icon: Package,
      color: 'from-orange-500 to-red-500',
    },
  ];

  const features = [
    {
      icon: Store,
      title: language === 'fa' ? 'فروشگاه اختصاصی' : language === 'ar' ? 'متجر مخصص' : 'Dedicated Store',
      description: language === 'fa'
        ? 'فروشگاه اختصاصی خود را با برند شخصی ایجاد کنید'
        : language === 'ar'
        ? 'أنشئ متجرك المخصص مع علامتك التجارية الشخصية'
        : 'Create your dedicated store with your personal brand',
    },
    {
      icon: BarChart3,
      title: language === 'fa' ? 'داشبورد مدیریتی' : language === 'ar' ? 'لوحة تحكم إدارية' : 'Management Dashboard',
      description: language === 'fa'
        ? 'مدیریت کامل محصولات، سفارشات و آمار فروش'
        : language === 'ar'
        ? 'إدارة كاملة للمنتجات والطلبات وإحصائيات المبيعات'
        : 'Complete management of products, orders and sales statistics',
    },
    {
      icon: DollarSign,
      title: language === 'fa' ? 'مدیریت قیمت‌گذاری' : language === 'ar' ? 'إدارة التسعير' : 'Pricing Management',
      description: language === 'fa'
        ? 'قیمت‌گذاری انعطاف‌پذیر با تخفیف‌های عمده'
        : language === 'ar'
        ? 'تسعير مرن مع خصومات الجملة'
        : 'Flexible pricing with bulk discounts',
    },
    {
      icon: Zap,
      title: language === 'fa' ? 'پاسخ سریع' : language === 'ar' ? 'استجابة سريعة' : 'Quick Response',
      description: language === 'fa'
        ? 'ابزارهای ارتباطی برای پاسخ سریع به خریداران'
        : language === 'ar'
        ? 'أدوات اتصال للرد السريع على المشترين'
        : 'Communication tools for quick response to buyers',
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
              <Store className="h-5 w-5 text-primary" />
              <span className="text-primary font-bold">
                {language === 'fa' ? 'برای تأمین‌کنندگان' : language === 'ar' ? 'للموردين' : 'For Suppliers'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block text-foreground">
                {language === 'fa' ? 'فروش جهانی' : language === 'ar' ? 'بيع عالمي' : 'Sell Globally'}
              </span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'به میلیون‌ها خریدار' : language === 'ar' ? 'لملايين المشترين' : 'To Millions of Buyers'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === 'fa'
                ? 'به بزرگ‌ترین بازار B2B جهان بپیوندید و کسب‌وکار خود را به سطح بعدی برسانید'
                : language === 'ar'
                ? 'انضم إلى أكبر سوق B2B في العالم وارفع عملك إلى المستوى التالي'
                : 'Join the world\'s largest B2B marketplace and take your business to the next level'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="btn-gradient-primary rounded-2xl px-10 py-7 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                onClick={() => navigate('/register?role=supplier')}
              >
                {language === 'fa' ? 'شروع فروش' : language === 'ar' ? 'ابدأ البيع' : 'Start Selling'}
                <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl px-10 py-7 text-lg font-semibold bg-background/80 backdrop-blur-xl border-2 hover:bg-background transition-all"
                onClick={() => navigate('/become-supplier')}
              >
                {language === 'fa' ? 'اطلاعات بیشتر' : language === 'ar' ? 'مزيد من المعلومات' : 'Learn More'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-accent">
                {language === 'fa' ? 'مزایا' : language === 'ar' ? 'مزايا' : 'Benefits'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {language === 'fa' ? 'چرا در ASL Market بفروشید؟' : language === 'ar' ? 'لماذا تبيع في ASL Market؟' : 'Why Sell on ASL Market?'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? 'همه چیزهایی که برای فروش موفق نیاز دارید'
                : language === 'ar'
                ? 'كل ما تحتاجه للبيع الناجح'
                : 'Everything you need for successful selling'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
                >
                  <div className={cn(
                    "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                    benefit.color
                  )}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
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
              {language === 'fa' ? 'شروع در 6 مرحله ساده' : language === 'ar' ? 'ابدأ في 6 خطوات بسيطة' : 'Get Started in 6 Simple Steps'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? 'فرآیند فروش شما ساده و سریع است'
                : language === 'ar'
                ? 'عملية البيع الخاصة بك بسيطة وسريعة'
                : 'Your selling process is simple and fast'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
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

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {language === 'fa' ? 'ویژگی‌های کلیدی' : language === 'ar' ? 'الميزات الرئيسية' : 'Key Features'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? 'ابزارها و امکاناتی که فروش شما را آسان می‌کنند'
                : language === 'ar'
                ? 'الأدوات والميزات التي تجعل بيعك سهلاً'
                : 'Tools and features that make your selling easy'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
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
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
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
            {[
              {
                number: '500K+',
                label: language === 'fa' ? 'تأمین‌کننده فعال' : language === 'ar' ? 'مورد نشط' : 'Active Suppliers',
                icon: Store,
              },
              {
                number: '10M+',
                label: language === 'fa' ? 'محصول' : language === 'ar' ? 'منتج' : 'Products',
                icon: Package,
              },
              {
                number: '190+',
                label: language === 'fa' ? 'کشور' : language === 'ar' ? 'دولة' : 'Countries',
                icon: Globe,
              },
              {
                number: '$50B+',
                label: language === 'fa' ? 'حجم معاملات' : language === 'ar' ? 'حجم المعاملات' : 'Transaction Volume',
                icon: DollarSign,
              },
            ].map((stat, index) => {
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
                <Store className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                  {language === 'fa' ? 'آماده شروع هستید؟' : language === 'ar' ? 'هل أنت جاهز للبدء؟' : 'Ready to Get Started?'}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {language === 'fa'
                    ? 'به هزاران تأمین‌کننده موفق بپیوندید و کسب‌وکار خود را رشد دهید'
                    : language === 'ar'
                    ? 'انضم إلى آلاف الموردين الناجحين ونم عملك'
                    : 'Join thousands of successful suppliers and grow your business'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="btn-gradient-primary rounded-xl px-10 py-6 font-semibold"
                  onClick={() => navigate('/register?role=supplier')}
                >
                  {language === 'fa' ? 'شروع فروش' : language === 'ar' ? 'ابدأ البيع' : 'Start Selling'}
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

export default ForSuppliers;

