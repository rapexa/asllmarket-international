import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Search,
  MessageSquare,
  Shield,
  Globe,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  User,
  Package,
  CreditCard,
  Truck,
  Headphones,
  Sparkles,
  Zap,
  Award,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const ForBuyers: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Shield,
      title: language === 'fa' ? 'تأمین‌کنندگان تأیید شده' : language === 'ar' ? 'موردون معتمدون' : 'Verified Suppliers',
      description: language === 'fa'
        ? 'همه تأمین‌کنندگان ما از نظر هویت و مجوز کسب‌وکار تأیید شده‌اند'
        : language === 'ar'
        ? 'جميع موردوننا تم التحقق منهم من حيث الهوية وترخيص الأعمال'
        : 'All our suppliers are verified for identity and business license',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Globe,
      title: language === 'fa' ? 'دسترسی جهانی' : language === 'ar' ? 'وصول عالمي' : 'Global Access',
      description: language === 'fa'
        ? 'به میلیون‌ها محصول از سراسر جهان دسترسی داشته باشید'
        : language === 'ar'
        ? 'احصل على وصول إلى ملايين المنتجات من جميع أنحاء العالم'
        : 'Access millions of products from around the world',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      title: language === 'fa' ? 'قیمت‌های رقابتی' : language === 'ar' ? 'أسعار تنافسية' : 'Competitive Prices',
      description: language === 'fa'
        ? 'قیمت‌های بهینه با مقایسه پیشنهادات مختلف'
        : language === 'ar'
        ? 'أسعار مثلى من خلال مقارنة عروض مختلفة'
        : 'Optimal prices by comparing different offers',
      color: 'from-yellow-500 to-amber-500',
    },
    {
      icon: Lock,
      title: language === 'fa' ? 'پرداخت امن' : language === 'ar' ? 'دفع آمن' : 'Secure Payment',
      description: language === 'fa'
        ? 'سیستم پرداخت امن با Escrow برای محافظت از شما'
        : language === 'ar'
        ? 'نظام دفع آمن مع الضمان لحمايتك'
        : 'Secure payment system with Escrow to protect you',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Truck,
      title: language === 'fa' ? 'حمل‌ونقل آسان' : language === 'ar' ? 'شحن سهل' : 'Easy Shipping',
      description: language === 'fa'
        ? 'راه‌حل‌های حمل‌ونقل بین‌المللی با شرکای معتبر'
        : language === 'ar'
        ? 'حلول شحن دولية مع شركاء موثوقين'
        : 'International shipping solutions with trusted partners',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Headphones,
      title: language === 'fa' ? 'پشتیبانی 24/7' : language === 'ar' ? 'دعم على مدار الساعة' : '24/7 Support',
      description: language === 'fa'
        ? 'تیم پشتیبانی ما همیشه آماده کمک به شما است'
        : language === 'ar'
        ? 'فريق الدعم لدينا دائماً جاهز لمساعدتك'
        : 'Our support team is always ready to help you',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const steps = [
    {
      number: '01',
      title: language === 'fa' ? 'ثبت‌نام رایگان' : language === 'ar' ? 'تسجيل مجاني' : 'Free Registration',
      description: language === 'fa'
        ? 'حساب کاربری خود را در کمتر از 2 دقیقه ایجاد کنید'
        : language === 'ar'
        ? 'أنشئ حسابك في أقل من دقيقتين'
        : 'Create your account in less than 2 minutes',
      icon: User,
      color: 'from-primary to-accent',
    },
    {
      number: '02',
      title: language === 'fa' ? 'جستجو و کاوش' : language === 'ar' ? 'البحث والاستكشاف' : 'Search & Explore',
      description: language === 'fa'
        ? 'میلیون‌ها محصول را جستجو کنید و بهترین گزینه را پیدا کنید'
        : language === 'ar'
        ? 'ابحث عن ملايين المنتجات واعثر على أفضل خيار'
        : 'Search millions of products and find the best option',
      icon: Search,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: '03',
      title: language === 'fa' ? 'درخواست استعلام قیمت' : language === 'ar' ? 'طلب عرض سعر' : 'Request Quote',
      description: language === 'fa'
        ? 'درخواست استعلام قیمت ارسال کنید و پیشنهادات دریافت کنید'
        : language === 'ar'
        ? 'أرسل طلب عرض سعر واحصل على عروض'
        : 'Send quote request and receive offers',
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-500',
    },
    {
      number: '04',
      title: language === 'fa' ? 'مقایسه و انتخاب' : language === 'ar' ? 'المقارنة والاختيار' : 'Compare & Choose',
      description: language === 'fa'
        ? 'پیشنهادات را مقایسه کنید و بهترین تأمین‌کننده را انتخاب کنید'
        : language === 'ar'
        ? 'قارن العروض واختر أفضل مورد'
        : 'Compare offers and choose the best supplier',
      icon: TrendingUp,
      color: 'from-yellow-500 to-amber-500',
    },
    {
      number: '05',
      title: language === 'fa' ? 'سفارش و پرداخت' : language === 'ar' ? 'الطلب والدفع' : 'Order & Pay',
      description: language === 'fa'
        ? 'سفارش خود را ثبت کنید و با امنیت کامل پرداخت کنید'
        : language === 'ar'
        ? 'ضع طلبك وادفع بأمان كامل'
        : 'Place your order and pay securely',
      icon: CreditCard,
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: '06',
      title: language === 'fa' ? 'دریافت محصول' : language === 'ar' ? 'استلام المنتج' : 'Receive Product',
      description: language === 'fa'
        ? 'محصول خود را با کیفیت تضمین شده دریافت کنید'
        : language === 'ar'
        ? 'احصل على منتجك بجودة مضمونة'
        : 'Receive your product with guaranteed quality',
      icon: Package,
      color: 'from-orange-500 to-red-500',
    },
  ];

  const features = [
    {
      icon: Search,
      title: language === 'fa' ? 'جستجوی پیشرفته' : language === 'ar' ? 'بحث متقدم' : 'Advanced Search',
      description: language === 'fa'
        ? 'فیلترهای قدرتمند برای یافتن دقیق محصول مورد نظر'
        : language === 'ar'
        ? 'مرشحات قوية للعثور على المنتج المطلوب بدقة'
        : 'Powerful filters to find exactly what you need',
    },
    {
      icon: Users,
      title: language === 'fa' ? 'شبکه تأمین‌کنندگان' : language === 'ar' ? 'شبكة الموردين' : 'Supplier Network',
      description: language === 'fa'
        ? 'دسترسی به هزاران تأمین‌کننده تأیید شده'
        : language === 'ar'
        ? 'وصول إلى آلاف الموردين المعتمدين'
        : 'Access to thousands of verified suppliers',
    },
    {
      icon: Award,
      title: language === 'fa' ? 'کیفیت تضمین شده' : language === 'ar' ? 'جودة مضمونة' : 'Guaranteed Quality',
      description: language === 'fa'
        ? 'محصولات با کیفیت بالا از تأمین‌کنندگان معتبر'
        : language === 'ar'
        ? 'منتجات عالية الجودة من موردين موثوقين'
        : 'High-quality products from trusted suppliers',
    },
    {
      icon: Zap,
      title: language === 'fa' ? 'پاسخ سریع' : language === 'ar' ? 'استجابة سريعة' : 'Quick Response',
      description: language === 'fa'
        ? 'دریافت پاسخ از تأمین‌کنندگان در کمتر از 24 ساعت'
        : language === 'ar'
        ? 'احصل على رد من الموردين في أقل من 24 ساعة'
        : 'Get responses from suppliers in less than 24 hours',
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
              <ShoppingCart className="h-5 w-5 text-primary" />
              <span className="text-primary font-bold">
                {language === 'fa' ? 'برای خریداران' : language === 'ar' ? 'للمشترين' : 'For Buyers'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block text-foreground">
                {language === 'fa' ? 'خرید آسان و امن' : language === 'ar' ? 'شراء سهل وآمن' : 'Easy & Secure Buying'}
              </span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'از تأمین‌کنندگان جهانی' : language === 'ar' ? 'من موردين عالميين' : 'From Global Suppliers'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === 'fa'
                ? 'به بزرگ‌ترین بازار B2B جهان بپیوندید و به میلیون‌ها محصول با کیفیت دسترسی پیدا کنید'
                : language === 'ar'
                ? 'انضم إلى أكبر سوق B2B في العالم واحصل على وصول إلى ملايين المنتجات عالية الجودة'
                : 'Join the world\'s largest B2B marketplace and access millions of quality products'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="btn-gradient-primary rounded-2xl px-10 py-7 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                onClick={() => navigate('/register?role=buyer')}
              >
                {language === 'fa' ? 'ثبت‌نام رایگان' : language === 'ar' ? 'تسجيل مجاني' : 'Get Started Free'}
                <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl px-10 py-7 text-lg font-semibold bg-background/80 backdrop-blur-xl border-2 hover:bg-background transition-all"
                onClick={() => navigate('/products')}
              >
                {language === 'fa' ? 'کاوش محصولات' : language === 'ar' ? 'استكشف المنتجات' : 'Explore Products'}
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
              {language === 'fa' ? 'چرا ASL Market را انتخاب کنید؟' : language === 'ar' ? 'لماذا تختار ASL Market؟' : 'Why Choose ASL Market?'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? 'همه چیزهایی که برای خرید موفق نیاز دارید'
                : language === 'ar'
                ? 'كل ما تحتاجه للشراء الناجح'
                : 'Everything you need for successful buying'}
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
                ? 'فرآیند خرید شما ساده و سریع است'
                : language === 'ar'
                ? 'عملية الشراء الخاصة بك بسيطة وسريعة'
                : 'Your buying process is simple and fast'}
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
                ? 'ابزارها و امکاناتی که خرید شما را آسان می‌کنند'
                : language === 'ar'
                ? 'الأدوات والميزات التي تجعل شراءك سهلاً'
                : 'Tools and features that make your buying easy'}
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
                number: '10M+',
                label: language === 'fa' ? 'محصول' : language === 'ar' ? 'منتج' : 'Products',
                icon: Package,
              },
              {
                number: '500K+',
                label: language === 'fa' ? 'تأمین‌کننده' : language === 'ar' ? 'مورد' : 'Suppliers',
                icon: Users,
              },
              {
                number: '190+',
                label: language === 'fa' ? 'کشور' : language === 'ar' ? 'دولة' : 'Countries',
                icon: Globe,
              },
              {
                number: '99.9%',
                label: language === 'fa' ? 'رضایت مشتری' : language === 'ar' ? 'رضا العملاء' : 'Satisfaction',
                icon: Star,
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
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                  {language === 'fa' ? 'آماده شروع هستید؟' : language === 'ar' ? 'هل أنت جاهز للبدء؟' : 'Ready to Get Started?'}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {language === 'fa'
                    ? 'به هزاران خریدار موفق بپیوندید و تجربه خرید حرفه‌ای را شروع کنید'
                    : language === 'ar'
                    ? 'انضم إلى آلاف المشترين الناجحين وابدأ تجربة شراء احترافية'
                    : 'Join thousands of successful buyers and start your professional buying experience'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="btn-gradient-primary rounded-xl px-10 py-6 font-semibold"
                  onClick={() => navigate('/register?role=buyer')}
                >
                  {language === 'fa' ? 'ثبت‌نام رایگان' : language === 'ar' ? 'تسجيل مجاني' : 'Sign Up Free'}
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

export default ForBuyers;

