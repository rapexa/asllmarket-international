import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, 
  Target, 
  Heart, 
  Shield, 
  TrendingUp, 
  Users, 
  Award, 
  Zap,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart3,
  Handshake
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const About: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();

  const stats = [
    {
      value: '100K+',
      label: language === 'fa' ? 'تأمین‌کننده فعال' : language === 'ar' ? 'مورد نشط' : 'Active Suppliers',
      icon: Building2,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      value: '5M+',
      label: language === 'fa' ? 'خریدار جهانی' : language === 'ar' ? 'مشتر عالمي' : 'Global Buyers',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
    },
    {
      value: '190+',
      label: language === 'fa' ? 'کشور' : language === 'ar' ? 'دولة' : 'Countries',
      icon: Globe,
      color: 'from-purple-500 to-pink-500',
    },
    {
      value: '$2B+',
      label: language === 'fa' ? 'حجم معاملات' : language === 'ar' ? 'حجم المعاملات' : 'Transaction Volume',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
    },
  ];

  const values = [
    {
      icon: Shield,
      title: language === 'fa' ? 'امنیت و اعتماد' : language === 'ar' ? 'الأمان والثقة' : 'Security & Trust',
      description: language === 'fa'
        ? 'ما متعهد به ایجاد محیطی امن و قابل اعتماد برای تمام معاملات B2B هستیم'
        : language === 'ar'
        ? 'نلتزم بإنشاء بيئة آمنة وموثوقة لجميع معاملات B2B'
        : 'We are committed to creating a secure and trustworthy environment for all B2B transactions',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Globe,
      title: language === 'fa' ? 'دسترسی جهانی' : language === 'ar' ? 'الوصول العالمي' : 'Global Reach',
      description: language === 'fa'
        ? 'اتصال کسب‌وکارها در سراسر جهان و تسهیل تجارت بین‌المللی'
        : language === 'ar'
        ? 'ربط الشركات في جميع أنحاء العالم وتسهيل التجارة الدولية'
        : 'Connecting businesses worldwide and facilitating international trade',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Heart,
      title: language === 'fa' ? 'تمرکز بر مشتری' : language === 'ar' ? 'التركيز على العميل' : 'Customer Focus',
      description: language === 'fa'
        ? 'مشتریان ما در مرکز هر تصمیم و ابتکار ما قرار دارند'
        : language === 'ar'
        ? 'عملاؤنا في قلب كل قرار ومبادرة'
        : 'Our customers are at the heart of every decision and initiative',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: language === 'fa' ? 'نوآوری' : language === 'ar' ? 'الابتكار' : 'Innovation',
      description: language === 'fa'
        ? 'همیشه در حال پیشرفت و بهبود برای ارائه بهترین تجربه ممکن'
        : language === 'ar'
        ? 'نطور باستمرار ونحسن لتقديم أفضل تجربة ممكنة'
        : 'Constantly evolving and improving to deliver the best possible experience',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const milestones = [
    {
      year: '2020',
      title: language === 'fa' ? 'شروع' : language === 'ar' ? 'البداية' : 'Founded',
      description: language === 'fa'
        ? 'ASL Market با چشم‌انداز ایجاد بزرگترین پلتفرم B2B جهانی تأسیس شد'
        : language === 'ar'
        ? 'تم تأسيس ASL Market برؤية إنشاء أكبر منصة B2B عالمية'
        : 'ASL Market was founded with a vision to create the world\'s largest B2B platform',
    },
    {
      year: '2021',
      title: language === 'fa' ? 'رشد سریع' : language === 'ar' ? 'نمو سريع' : 'Rapid Growth',
      description: language === 'fa'
        ? 'رسیدن به 10,000 تأمین‌کننده و 500,000 خریدار در سراسر جهان'
        : language === 'ar'
        ? 'الوصول إلى 10,000 مورد و 500,000 مشتر في جميع أنحاء العالم'
        : 'Reached 10,000 suppliers and 500,000 buyers worldwide',
    },
    {
      year: '2022',
      title: language === 'fa' ? 'گسترش جهانی' : language === 'ar' ? 'التوسع العالمي' : 'Global Expansion',
      description: language === 'fa'
        ? 'گسترش به 100+ کشور و راه‌اندازی مراکز منطقه‌ای'
        : language === 'ar'
        ? 'التوسع إلى أكثر من 100 دولة وإطلاق المراكز الإقليمية'
        : 'Expanded to 100+ countries and launched regional centers',
    },
    {
      year: '2023',
      title: language === 'fa' ? 'نوآوری تکنولوژی' : language === 'ar' ? 'الابتكار التكنولوجي' : 'Tech Innovation',
      description: language === 'fa'
        ? 'راه‌اندازی AI-powered matching و سیستم Escrow پیشرفته'
        : language === 'ar'
        ? 'إطلاق المطابقة المدعومة بالذكاء الاصطناعي ونظام الضمان المتقدم'
        : 'Launched AI-powered matching and advanced Escrow system',
    },
    {
      year: '2024',
      title: language === 'fa' ? 'رهبری بازار' : language === 'ar' ? 'الريادة في السوق' : 'Market Leadership',
      description: language === 'fa'
        ? 'رسیدن به 100K+ تأمین‌کننده و 5M+ خریدار با حجم معاملات $2B+'
        : language === 'ar'
        ? 'الوصول إلى أكثر من 100K مورد و 5M مشتر بحجم معاملات 2B+ دولار'
        : 'Reached 100K+ suppliers and 5M+ buyers with $2B+ transaction volume',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-24">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 start-5 sm:top-20 sm:start-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 end-5 sm:bottom-20 sm:end-10 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-7 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-primary/10 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold border border-primary/20 flex-wrap justify-center">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              <span className="text-primary font-bold whitespace-nowrap">
                {language === 'fa' ? 'درباره ما' : language === 'ar' ? 'عنا' : 'About Us'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight px-2">
              <span className="block text-foreground">
                {language === 'fa' ? 'درباره ASL Market' : language === 'ar' ? 'حول ASL Market' : 'About ASL Market'}
              </span>
              <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'اتصال جهان از طریق تجارت' : language === 'ar' ? 'ربط العالم من خلال التجارة' : 'Connecting the World Through Trade'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              {language === 'fa'
                ? 'ما بزرگترین پلتفرم B2B جهانی هستیم که خریداران و تأمین‌کنندگان را در سراسر جهان به هم متصل می‌کنیم'
                : language === 'ar'
                ? 'نحن أكبر منصة B2B عالمية تربط المشترين والموردين في جميع أنحاء العالم'
                : 'We are the world\'s largest B2B platform connecting buyers and suppliers worldwide'}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 sm:pt-10 md:pt-12">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="p-4 sm:p-5 md:p-6 bg-card/50 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all group"
                >
                  <div className={cn("w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br flex items-center justify-center mx-auto mb-2 sm:mb-3", stat.color)}>
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white shrink-0" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground mb-1 leading-none">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium leading-tight px-1">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-3 sm:mb-4 px-2">
                {language === 'fa' ? 'داستان ما' : language === 'ar' ? 'قصتنا' : 'Our Story'}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
                {language === 'fa'
                  ? 'سفر ما از یک ایده ساده تا تبدیل شدن به رهبر بازار'
                  : language === 'ar'
                  ? 'رحلتنا من فكرة بسيطة إلى أن نصبح رواد السوق'
                  : 'Our journey from a simple idea to becoming a market leader'}
              </p>
            </div>

            <Card className="p-6 sm:p-8 md:p-10 lg:p-12 bg-card/80 backdrop-blur-xl border-2 border-border">
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                {language === 'fa'
                  ? 'ASL Market در سال 2020 با یک مأموریت ساده اما قدرتمند تأسیس شد: ایجاد بزرگترین و قابل اعتمادترین پلتفرم B2B جهانی که خریداران و تأمین‌کنندگان را در سراسر جهان به هم متصل می‌کند.'
                  : language === 'ar'
                  ? 'تم تأسيس ASL Market في عام 2020 بمهمة بسيطة لكنها قوية: إنشاء أكبر منصة B2B عالمية موثوقة تربط المشترين والموردين في جميع أنحاء العالم.'
                  : 'ASL Market was founded in 2020 with a simple yet powerful mission: to create the world\'s largest and most trusted B2B platform connecting buyers and suppliers worldwide.'}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                {language === 'fa'
                  ? 'از آن زمان، ما به طور مداوم در حال رشد و نوآوری بوده‌ایم و راه‌حل‌های پیشرفته‌ای را برای تسهیل تجارت بین‌المللی ارائه می‌دهیم. امروز، ما به بیش از 100,000 تأمین‌کننده و 5 میلیون خریدار در 190+ کشور خدمت می‌کنیم.'
                  : language === 'ar'
                  ? 'منذ ذلك الحين، نطور باستمرار ونبتكر، ونقدم حلولاً متقدمة لتسهيل التجارة الدولية. اليوم، نخدم أكثر من 100,000 مورد و 5 ملايين مشتر في أكثر من 190 دولة.'
                  : 'Since then, we have continuously grown and innovated, providing cutting-edge solutions to facilitate international trade. Today, we serve over 100,000 suppliers and 5 million buyers across 190+ countries.'}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Mission */}
            <Card className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 hover:shadow-xl transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-4 sm:mb-5 md:mb-6 shrink-0">
                <Target className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                {language === 'fa' ? 'ماموریت ما' : language === 'ar' ? 'مهمتنا' : 'Our Mission'}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {language === 'fa'
                  ? 'ایجاد بزرگترین و قابل اعتمادترین پلتفرم B2B جهانی که تجارت بین‌المللی را برای همه قابل دسترس، امن و سودآور می‌کند.'
                  : language === 'ar'
                  ? 'إنشاء أكبر منصة B2B عالمية موثوقة تجعل التجارة الدولية في متناول الجميع وآمنة ومربحة.'
                  : 'To create the world\'s largest and most trusted B2B platform that makes international trade accessible, secure, and profitable for everyone.'}
              </p>
            </Card>

            {/* Vision */}
            <Card className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-accent/5 to-accent/10 border-2 border-accent/20 hover:shadow-xl transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center mb-4 sm:mb-5 md:mb-6 shrink-0">
                <BarChart3 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                {language === 'fa' ? 'چشم‌انداز ما' : language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {language === 'fa'
                  ? 'تبدیل شدن به پلتفرم شماره یک B2B جهانی که در آن هر کسب‌وکاری می‌تواند به راحتی با شرکای تجاری مناسب در سراسر جهان ارتباط برقرار کند.'
                  : language === 'ar'
                  ? 'أن نصبح المنصة رقم واحد B2B عالمية حيث يمكن لأي شركة التواصل بسهولة مع شركاء الأعمال المناسبين في جميع أنحاء العالم.'
                  : 'To become the world\'s #1 B2B platform where any business can easily connect with the right trading partners worldwide.'}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-3 sm:mb-4 px-2">
              {language === 'fa' ? 'ارزش‌های ما' : language === 'ar' ? 'قيمنا' : 'Our Values'}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              {language === 'fa'
                ? 'اصولی که ما را راهنمایی می‌کنند و هر کاری که انجام می‌دهیم را شکل می‌دهند'
                : language === 'ar'
                ? 'المبادئ التي توجهنا وتشكل كل ما نقوم به'
                : 'The principles that guide us and shape everything we do'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-6 sm:p-7 md:p-8 relative overflow-hidden border-2 border-border hover:border-primary/50 transition-all hover:shadow-xl group"
              >
                {/* Gradient Background */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500",
                  value.color
                )} />

                <div className="relative z-10">
                  <div className={cn(
                    "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4 sm:mb-5 md:mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110 shrink-0",
                    value.color
                  )}>
                    <value.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white shrink-0" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors leading-tight">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container px-4">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-3 sm:mb-4 px-2">
              {language === 'fa' ? 'نقاط عطف' : language === 'ar' ? 'المعالم' : 'Milestones'}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              {language === 'fa'
                ? 'سفر رشد و موفقیت ما'
                : language === 'ar'
                ? 'رحلتنا في النمو والنجاح'
                : 'Our journey of growth and success'}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-7 md:space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                {/* Timeline Line */}
                {index < milestones.length - 1 && (
                  <div className="absolute start-6 sm:start-8 top-12 sm:top-14 md:top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent" />
                )}

                <div className="flex gap-3 sm:gap-4 md:gap-6">
                  {/* Year Badge */}
                  <div className="shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xs sm:text-sm">{milestone.year}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <Card className="flex-1 p-4 sm:p-5 md:p-6 bg-card/80 backdrop-blur-xl border-2 border-border hover:border-primary/50 transition-all hover:shadow-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-tight">{milestone.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary via-primary-light to-accent text-primary-foreground">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-7 md:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight px-2">
              {language === 'fa' ? 'به ما بپیوندید' : language === 'ar' ? 'انضم إلينا' : 'Join Us'}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 px-4 leading-relaxed">
              {language === 'fa'
                ? 'آماده شروع هستید؟ به بزرگترین شبکه B2B جهانی بپیوندید'
                : language === 'ar'
                ? 'هل أنت مستعد للبدء؟ انضم إلى أكبر شبكة B2B عالمية'
                : 'Ready to get started? Join the world\'s largest B2B network'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 rounded-xl sm:rounded-2xl text-base sm:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 shadow-2xl font-semibold group w-full sm:w-auto"
                onClick={() => navigate('/register')}
              >
                <span className="whitespace-nowrap">
                  {language === 'fa' ? 'ثبت‌نام کنید' : language === 'ar' ? 'سجل الآن' : 'Sign Up Now'}
                </span>
                <ArrowRight className={cn("ms-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform shrink-0", dir === 'rtl' && "rotate-180")} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl sm:rounded-2xl text-base sm:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 bg-primary-foreground/10 backdrop-blur-xl border-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 transition-all font-semibold w-full sm:w-auto whitespace-nowrap"
                onClick={() => navigate('/contact', { replace: false })}
              >
                {language === 'fa' ? 'تماس با ما' : language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

