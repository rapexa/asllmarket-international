import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  CheckCircle2,
  FileCheck,
  Scale,
  Lock,
  Globe,
  Award,
  Info,
  ArrowRight,
  Clock,
  Mail,
  AlertCircle,
  BarChart3,
  Users,
  Database,
  Key,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const Compliance: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();

  const standards = [
    {
      name: language === 'fa' ? 'GDPR' : language === 'ar' ? 'GDPR' : 'GDPR',
      title: language === 'fa' ? 'حفاظت از داده‌های عمومی' : language === 'ar' ? 'حماية البيانات العامة' : 'General Data Protection Regulation',
      description: language === 'fa'
        ? 'ما با مقررات GDPR اتحادیه اروپا مطابقت کامل داریم و حقوق کاربران برای کنترل داده‌های شخصی خود را تضمین می‌کنیم.'
        : language === 'ar'
        ? 'نحن متوافقون بالكامل مع لوائح GDPR للاتحاد الأوروبي ونضمن حقوق المستخدمين للتحكم في بياناتهم الشخصية.'
        : 'We fully comply with EU GDPR regulations and guarantee users\' rights to control their personal data.',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      status: language === 'fa' ? 'تطابق کامل' : language === 'ar' ? 'امتثال كامل' : 'Fully Compliant',
    },
    {
      name: language === 'fa' ? 'ISO 27001' : language === 'ar' ? 'ISO 27001' : 'ISO 27001',
      title: language === 'fa' ? 'مدیریت امنیت اطلاعات' : language === 'ar' ? 'إدارة أمان المعلومات' : 'Information Security Management',
      description: language === 'fa'
        ? 'ما استانداردهای ISO 27001 را برای مدیریت امنیت اطلاعات پیاده‌سازی کرده‌ایم و از اطلاعات شما با بالاترین استانداردها محافظت می‌کنیم.'
        : language === 'ar'
        ? 'قمنا بتنفيذ معايير ISO 27001 لإدارة أمان المعلومات ونحمي معلوماتك بأعلى المعايير.'
        : 'We have implemented ISO 27001 standards for information security management and protect your information with the highest standards.',
      icon: Lock,
      color: 'from-green-500 to-emerald-500',
      status: language === 'fa' ? 'گواهینامه' : language === 'ar' ? 'شهادة' : 'Certified',
    },
    {
      name: language === 'fa' ? 'PCI DSS' : language === 'ar' ? 'PCI DSS' : 'PCI DSS',
      title: language === 'fa' ? 'امنیت پرداخت' : language === 'ar' ? 'أمان الدفع' : 'Payment Card Security',
      description: language === 'fa'
        ? 'ما استانداردهای PCI DSS را برای امنیت پرداخت‌های کارتی رعایت می‌کنیم و تمام معاملات مالی شما را با امنیت کامل پردازش می‌کنیم.'
        : language === 'ar'
        ? 'نحن نلتزم بمعايير PCI DSS لأمان بطاقات الدفع ونعالج جميع معاملاتك المالية بأمان كامل.'
        : 'We comply with PCI DSS standards for payment card security and process all your financial transactions with complete security.',
      icon: Key,
      color: 'from-purple-500 to-pink-500',
      status: language === 'fa' ? 'تطابق کامل' : language === 'ar' ? 'امتثال كامل' : 'Fully Compliant',
    },
    {
      name: language === 'fa' ? 'SOC 2' : language === 'ar' ? 'SOC 2' : 'SOC 2',
      title: language === 'fa' ? 'کنترل‌های امنیتی' : language === 'ar' ? 'ضوابط الأمان' : 'Security Controls',
      description: language === 'fa'
        ? 'ما کنترل‌های امنیتی و عملیاتی SOC 2 را رعایت می‌کنیم و سیستم‌های ما به طور منظم مورد بررسی و ممیزی قرار می‌گیرند.'
        : language === 'ar'
        ? 'نحن نلتزم بضوابط الأمان والتشغيلية SOC 2 ويتم مراجعة وأنظمة المراجعة لأنظمتنا بانتظام.'
        : 'We comply with SOC 2 security and operational controls, and our systems are regularly reviewed and audited.',
      icon: FileCheck,
      color: 'from-orange-500 to-red-500',
      status: language === 'fa' ? 'در حال بررسی' : language === 'ar' ? 'قيد المراجعة' : 'Under Review',
    },
  ];

  const sections = [
    {
      id: 'introduction',
      title: language === 'fa' ? '1. مقدمه' : language === 'ar' ? '1. مقدمة' : '1. Introduction',
      icon: Info,
      content: language === 'fa'
        ? 'ASL Market متعهد است که با تمام قوانین، مقررات و استانداردهای بین‌المللی مربوط به تجارت الکترونیک، حفاظت از داده‌ها، امنیت اطلاعات و تجارت بین‌المللی مطابقت داشته باشد. این صفحه تعهدات ما در زمینه Compliance را شرح می‌دهد.'
        : language === 'ar'
        ? 'ASL Market ملتزم بالامتثال لجميع القوانين واللوائح والمعايير الدولية المتعلقة بالتجارة الإلكترونية وحماية البيانات وأمان المعلومات والتجارة الدولية. توضح هذه الصفحة التزاماتنا في مجال الامتثال.'
        : 'ASL Market is committed to complying with all laws, regulations and international standards related to e-commerce, data protection, information security and international trade. This page describes our compliance commitments.',
    },
    {
      id: 'data-protection',
      title: language === 'fa' ? '2. حفاظت از داده‌ها' : language === 'ar' ? '2. حماية البيانات' : '2. Data Protection',
      icon: Shield,
      content: language === 'fa'
        ? 'ما با قوانین حفاظت از داده‌ها در سراسر جهان مطابقت داریم، از جمله GDPR در اتحادیه اروپا، CCPA در کالیفرنیا و سایر قوانین محلی. ما اطلاعات شخصی شما را با بالاترین استانداردهای امنیتی محافظت می‌کنیم و حقوق شما برای دسترسی، اصلاح و حذف داده‌های خود را تضمین می‌کنیم.'
        : language === 'ar'
        ? 'نحن متوافقون مع قوانين حماية البيانات في جميع أنحاء العالم، بما في ذلك GDPR في الاتحاد الأوروبي وCCPA في كاليفورنيا والقوانين المحلية الأخرى. نحمي معلوماتك الشخصية بأعلى معايير الأمان ونضمن حقوقك في الوصول وتعديل وحذف بياناتك.'
        : 'We comply with data protection laws worldwide, including GDPR in the EU, CCPA in California and other local laws. We protect your personal information with the highest security standards and guarantee your rights to access, modify and delete your data.',
    },
    {
      id: 'security-standards',
      title: language === 'fa' ? '3. استانداردهای امنیتی' : language === 'ar' ? '3. معايير الأمان' : '3. Security Standards',
      icon: Lock,
      content: language === 'fa'
        ? 'ما استانداردهای بین‌المللی امنیت اطلاعات را رعایت می‌کنیم، از جمله ISO 27001، SOC 2 و PCI DSS. سیستم‌های ما به طور منظم مورد ممیزی قرار می‌گیرند و ما از رمزگذاری پیشرفته، کنترل دسترسی و نظارت مداوم برای محافظت از اطلاعات شما استفاده می‌کنیم.'
        : language === 'ar'
        ? 'نحن نلتزم بمعايير الأمان الدولية للمعلومات، بما في ذلك ISO 27001 وSOC 2 وPCI DSS. يتم مراجعة أنظمتنا بانتظام ونستخدم تشفيرًا متقدمًا وضبط الوصول ومراقبة مستمرة لحماية معلوماتك.'
        : 'We comply with international information security standards, including ISO 27001, SOC 2 and PCI DSS. Our systems are regularly audited and we use advanced encryption, access control and continuous monitoring to protect your information.',
    },
    {
      id: 'financial-compliance',
      title: language === 'fa' ? '4. Compliance مالی' : language === 'ar' ? '4. الامتثال المالي' : '4. Financial Compliance',
      icon: Scale,
      content: language === 'fa'
        ? 'ما با قوانین مالی و مقررات ضد پولشویی (AML) و شناخت مشتری (KYC) مطابقت داریم. تمام معاملات مالی ما شفاف و قابل ردیابی هستند و ما با مقامات نظارتی همکاری کامل داریم تا اطمینان حاصل کنیم که فعالیت‌های ما قانونی و شفاف هستند.'
        : language === 'ar'
        ? 'نحن متوافقون مع القوانين المالية ولوائح مكافحة غسيل الأموال (AML) ومعرفة العميل (KYC). جميع معاملاتنا المالية شفافة وقابلة للتتبع ونحن نتعاون بالكامل مع السلطات التنظيمية لضمان أن أنشطتنا قانونية وشفافة.'
        : 'We comply with financial laws and anti-money laundering (AML) and know-your-customer (KYC) regulations. All our financial transactions are transparent and traceable, and we fully cooperate with regulatory authorities to ensure our activities are legal and transparent.',
    },
    {
      id: 'trade-compliance',
      title: language === 'fa' ? '5. Compliance تجاری' : language === 'ar' ? '5. الامتثال التجاري' : '5. Trade Compliance',
      icon: Globe,
      content: language === 'fa'
        ? 'ما با قوانین تجارت بین‌المللی، مقررات صادرات و واردات و تحریم‌های بین‌المللی مطابقت داریم. ما اطمینان می‌دهیم که تمام معاملات تجاری ما قانونی و مطابق با قوانین محلی و بین‌المللی هستند. همچنین ما با قوانین ضد انحصار و رقابت مطابقت داریم.'
        : language === 'ar'
        ? 'نحن متوافقون مع قوانين التجارة الدولية ولوائح التصدير والاستيراد والعقوبات الدولية. نضمن أن جميع معاملاتنا التجارية قانونية ومتوافقة مع القوانين المحلية والدولية. كما أننا متوافقون مع قوانين مكافحة الاحتكار والمنافسة.'
        : 'We comply with international trade laws, export and import regulations and international sanctions. We ensure that all our trade transactions are legal and comply with local and international laws. We also comply with anti-monopoly and competition laws.',
    },
    {
      id: 'certifications',
      title: language === 'fa' ? '6. گواهینامه‌ها و تأییدیه‌ها' : language === 'ar' ? '6. الشهادات والاعتمادات' : '6. Certifications & Accreditations',
      icon: Award,
      content: language === 'fa'
        ? 'ما گواهینامه‌ها و تأییدیه‌های متعددی از سازمان‌های معتبر بین‌المللی دریافت کرده‌ایم که نشان می‌دهد سیستم‌ها و فرآیندهای ما با بالاترین استانداردها مطابقت دارند. این گواهینامه‌ها به طور منظم مورد بررسی و تجدید نظر قرار می‌گیرند.'
        : language === 'ar'
        ? 'لقد حصلنا على شهادات واعتمادات متعددة من منظمات دولية معترف بها مما يدل على أن أنظمتنا وعملياتنا متوافقة مع أعلى المعايير. يتم مراجعة وتجديد هذه الشهادات بانتظام.'
        : 'We have received multiple certifications and accreditations from recognized international organizations that demonstrate our systems and processes comply with the highest standards. These certifications are regularly reviewed and renewed.',
    },
    {
      id: 'monitoring',
      title: language === 'fa' ? '7. نظارت و ممیزی' : language === 'ar' ? '7. المراقبة والمراجعة' : '7. Monitoring & Auditing',
      icon: Eye,
      content: language === 'fa'
        ? 'ما سیستم‌های نظارت مداوم و ممیزی منظم را برای اطمینان از مطابقت مداوم با استانداردها پیاده‌سازی کرده‌ایم. تیم Compliance ما به طور منظم فرآیندها را بررسی می‌کند و هرگونه عدم تطابق را به سرعت شناسایی و برطرف می‌کند.'
        : language === 'ar'
        ? 'قمنا بتنفيذ أنظمة مراقبة مستمرة ومراجعة منتظمة لضمان الامتثال المستمر للمعايير. يقوم فريق الامتثال لدينا بمراجعة العمليات بانتظام ويحدد ويحل أي عدم امتثال بسرعة.'
        : 'We have implemented continuous monitoring systems and regular auditing to ensure ongoing compliance with standards. Our Compliance team regularly reviews processes and quickly identifies and resolves any non-compliance.',
    },
    {
      id: 'updates',
      title: language === 'fa' ? '8. بروزرسانی‌ها' : language === 'ar' ? '8. التحديثات' : '8. Updates',
      icon: Clock,
      content: language === 'fa'
        ? 'ما این صفحه Compliance را به طور منظم به‌روزرسانی می‌کنیم تا تغییرات در قوانین، مقررات و استانداردها را منعکس کنیم. تاریخ "آخرین بروزرسانی" در بالای این صفحه نشان می‌دهد که آخرین بار چه زمانی این صفحه به‌روزرسانی شده است.'
        : language === 'ar'
        ? 'نقوم بتحديث صفحة الامتثال هذه بانتظام لتعكس التغييرات في القوانين واللوائح والمعايير. يشير تاريخ "آخر تحديث" أعلى هذه الصفحة إلى آخر مرة تم فيها تحديث هذه الصفحة.'
        : 'We regularly update this Compliance page to reflect changes in laws, regulations and standards. The "Last Updated" date at the top of this page indicates when this page was last updated.',
    },
    {
      id: 'contact',
      title: language === 'fa' ? '9. تماس با ما' : language === 'ar' ? '9. اتصل بنا' : '9. Contact Us',
      icon: Mail,
      content: language === 'fa'
        ? 'اگر سوالی در مورد Compliance ما دارید یا می‌خواهید اطلاعات بیشتری دریافت کنید، لطفاً با تیم Compliance ما از طریق ایمیل compliance@aslmarket.com یا از طریق صفحه تماس با ما تماس بگیرید.'
        : language === 'ar'
        ? 'إذا كان لديك أي أسئلة حول الامتثال لدينا أو ترغب في الحصول على مزيد من المعلومات، يرجى الاتصال بفريق الامتثال لدينا عبر البريد الإلكتروني compliance@aslmarket.com أو من خلال صفحة الاتصال بنا.'
        : 'If you have any questions about our Compliance or want more information, please contact our Compliance team via email at compliance@aslmarket.com or through our contact page.',
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
                {language === 'fa' ? 'امتثال' : language === 'ar' ? 'الامتثال' : 'Compliance'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block text-foreground">
                {language === 'fa' ? 'امتثال و انطباق' : language === 'ar' ? 'الامتثال والموافقة' : 'Compliance & Standards'}
              </span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'تعهد به قوانین و استانداردها' : language === 'ar' ? 'التزام بالقوانين والمعايير' : 'Commitment to Laws & Standards'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === 'fa'
                ? 'ما متعهد هستیم که با تمام قوانین، مقررات و استانداردهای بین‌المللی مطابقت داشته باشیم.'
                : language === 'ar'
                ? 'نحن ملتزمون بالامتثال لجميع القوانين واللوائح والمعايير الدولية.'
                : 'We are committed to complying with all laws, regulations and international standards.'}
            </p>

            {/* Last Updated */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <FileCheck className="h-4 w-4" />
              <span>
                {language === 'fa' ? 'آخرین بروزرسانی: ' : language === 'ar' ? 'آخر تحديث: ' : 'Last Updated: '}
                <span className="font-semibold text-foreground">January 1, 2024</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Content */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Introduction */}
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {language === 'fa' ? 'تعهد ما' : language === 'ar' ? 'تعهدنا' : 'Our Commitment'}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === 'fa'
                      ? 'در ASL Market، Compliance برای ما یک اولویت است. ما متعهد هستیم که با تمام قوانین و مقررات مربوط به تجارت الکترونیک، حفاظت از داده‌ها، امنیت اطلاعات و تجارت بین‌المللی مطابقت داشته باشیم. این تعهد ما را قادر می‌سازد تا خدمات امن، قابل اعتماد و قانونی را به کاربران خود ارائه دهیم.'
                      : language === 'ar'
                      ? 'في ASL Market، الامتثال أولوية بالنسبة لنا. نحن ملتزمون بالامتثال لجميع القوانين واللوائح المتعلقة بالتجارة الإلكترونية وحماية البيانات وأمان المعلومات والتجارة الدولية. يسمح لنا هذا الالتزام بتقديم خدمات آمنة وموثوقة وقانونية لمستخدمينا.'
                      : 'At ASL Market, Compliance is a priority for us. We are committed to complying with all laws and regulations related to e-commerce, data protection, information security and international trade. This commitment enables us to provide secure, reliable and legal services to our users.'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Standards Section */}
            <Card className="p-8 border-2 hover:border-primary/50 transition-all">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {language === 'fa' ? 'استانداردها و گواهینامه‌ها' : language === 'ar' ? 'المعايير والشهادات' : 'Standards & Certifications'}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {standards.map((standard, index) => {
                  const Icon = standard.icon;
                  return (
                    <Card
                      key={index}
                      className="p-4 sm:p-5 md:p-6 border-2 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className={cn(
                          "w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0",
                          standard.color
                        )}>
                          <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white shrink-0" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
                            <Badge variant="secondary" className="text-xs font-bold leading-tight">
                              {standard.name}
                            </Badge>
                            <Badge variant="outline" className="text-xs leading-tight">
                              {standard.status}
                            </Badge>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 leading-tight">
                            {standard.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {standard.description}
                      </p>
                    </Card>
                  );
                })}
              </div>
            </Card>

            {/* Policy Sections */}
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card
                  key={section.id}
                  id={section.id}
                  className="p-5 sm:p-6 md:p-7 lg:p-8 hover:shadow-lg transition-all border-2 hover:border-primary/50"
                >
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white shrink-0" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                        {section.title}
                      </h2>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}

            {/* Compliance Highlights */}
            <Card className="p-5 sm:p-6 md:p-7 lg:p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/20">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-white shrink-0" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-tight">
                    {language === 'fa' ? 'تعهدات Compliance ما' : language === 'ar' ? 'التزامات الامتثال لدينا' : 'Our Compliance Commitments'}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                    {language === 'fa'
                      ? 'ما در ASL Market متعهد هستیم به:'
                      : language === 'ar'
                      ? 'نحن في ASL Market ملتزمون بـ:'
                      : 'At ASL Market, we are committed to:'}
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{language === 'fa' ? 'رعایت تمام قوانین و مقررات محلی و بین‌المللی' : language === 'ar' ? 'الامتثال لجميع القوانين واللوائح المحلية والدولية' : 'Compliance with all local and international laws and regulations'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{language === 'fa' ? 'حفاظت از اطلاعات شخصی کاربران با بالاترین استانداردها' : language === 'ar' ? 'حماية المعلومات الشخصية للمستخدمين بأعلى المعايير' : 'Protecting users\' personal information with the highest standards'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{language === 'fa' ? 'شفافیت کامل در فعالیت‌های تجاری و مالی' : language === 'ar' ? 'شفافية كاملة في الأنشطة التجارية والمالية' : 'Complete transparency in business and financial activities'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{language === 'fa' ? 'نظارت مداوم و به‌روزرسانی منظم سیستم‌های Compliance' : language === 'ar' ? 'مراقبة مستمرة وتحديث منتظم لأنظمة الامتثال' : 'Continuous monitoring and regular updates of Compliance systems'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{language === 'fa' ? 'همکاری کامل با مقامات نظارتی و قانونی' : language === 'ar' ? 'تعاون كامل مع السلطات التنظيمية والقانونية' : 'Full cooperation with regulatory and legal authorities'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Contact Section */}
            <Card className="p-5 sm:p-6 md:p-7 lg:p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="text-center space-y-4 sm:space-y-5 md:space-y-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto shrink-0">
                  <Mail className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white shrink-0" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 leading-tight px-2">
                    {language === 'fa' ? 'سوال یا نگرانی دارید؟' : language === 'ar' ? 'هل لديك سؤال أو قلق؟' : 'Have Questions or Concerns?'}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4 sm:mb-5 md:mb-6 px-4">
                    {language === 'fa'
                      ? 'اگر سوالی در مورد Compliance ما دارید یا می‌خواهید اطلاعات بیشتری دریافت کنید، لطفاً با تیم Compliance ما تماس بگیرید.'
                      : language === 'ar'
                      ? 'إذا كان لديك أي أسئلة حول الامتثال لدينا أو ترغب في الحصول على مزيد من المعلومات، يرجى الاتصال بفريق الامتثال لدينا.'
                      : 'If you have any questions about our Compliance or want more information, please contact our Compliance team.'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  <Button
                    size="lg"
                    className="btn-gradient-primary rounded-xl px-6 sm:px-8 md:px-10 py-5 sm:py-6 font-semibold text-sm sm:text-base w-full sm:w-auto whitespace-nowrap"
                    onClick={() => navigate('/contact')}
                  >
                    <span>{language === 'fa' ? 'تماس با ما' : language === 'ar' ? 'اتصل بنا' : 'Contact Us'}</span>
                    <ArrowRight className={cn("ms-2 h-4 w-4 sm:h-5 sm:w-5 shrink-0", dir === 'rtl' && "rotate-180")} />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-xl px-6 sm:px-8 md:px-10 py-5 sm:py-6 font-semibold text-sm sm:text-base w-full sm:w-auto whitespace-nowrap"
                    onClick={() => navigate('/privacy')}
                  >
                    {language === 'fa' ? 'سیاست حریم خصوصی' : language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Compliance;

