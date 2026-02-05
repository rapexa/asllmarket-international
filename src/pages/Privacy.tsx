import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Lock,
  Eye,
  Database,
  Share2,
  Cookie,
  UserCheck,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  Info,
  ArrowRight,
  Globe,
  Mail,
  Key,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const Privacy: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();

  const sections = [
    {
      id: 'introduction',
      title: language === 'fa' ? '1. مقدمه' : language === 'ar' ? '1. مقدمة' : '1. Introduction',
      icon: Info,
      content: language === 'fa'
        ? 'ASL Market به حریم خصوصی شما اهمیت می‌دهد. این سیاست حریم خصوصی توضیح می‌دهد که ما چگونه اطلاعات شخصی شما را جمع‌آوری، استفاده، ذخیره و محافظت می‌کنیم. با استفاده از خدمات ما، شما موافقت می‌کنید که از این سیاست پیروی کنید.'
        : language === 'ar'
        ? 'ASL Market يهتم بخصوصيتك. توضح سياسة الخصوصية هذه كيف نجمع ونستخدم ونخزن ونحمي معلوماتك الشخصية. من خلال استخدام خدماتنا، فإنك توافق على الالتزام بهذه السياسة.'
        : 'ASL Market values your privacy. This Privacy Policy explains how we collect, use, store and protect your personal information. By using our services, you agree to be bound by this policy.',
    },
    {
      id: 'collection',
      title: language === 'fa' ? '2. جمع‌آوری اطلاعات' : language === 'ar' ? '2. جمع المعلومات' : '2. Information Collection',
      icon: Database,
      content: language === 'fa'
        ? 'ما اطلاعات زیر را جمع‌آوری می‌کنیم: اطلاعات حساب کاربری (نام، ایمیل، شماره تلفن)، اطلاعات معامله (سفارشات، پرداخت‌ها)، اطلاعات استفاده (لاگ‌های سیستم، کوکی‌ها)، اطلاعات دستگاه (آدرس IP، نوع مرورگر)، و اطلاعات عمومی کسب‌وکار (نام شرکت، آدرس) که شما ارائه می‌دهید.'
        : language === 'ar'
        ? 'نجمع المعلومات التالية: معلومات الحساب (الاسم والبريد الإلكتروني ورقم الهاتف)، معلومات المعاملات (الطلبات والمدفوعات)، معلومات الاستخدام (سجلات النظام والكوكيز)، معلومات الجهاز (عنوان IP ونوع المتصفح)، ومعلومات العمل العامة (اسم الشركة والعنوان) التي تقدمها.'
        : 'We collect the following information: Account information (name, email, phone number), Transaction information (orders, payments), Usage information (system logs, cookies), Device information (IP address, browser type), and general business information (company name, address) that you provide.',
    },
    {
      id: 'usage',
      title: language === 'fa' ? '3. استفاده از اطلاعات' : language === 'ar' ? '3. استخدام المعلومات' : '3. Use of Information',
      icon: Eye,
      content: language === 'fa'
        ? 'ما از اطلاعات شما برای: ارائه و بهبود خدمات، پردازش معاملات و سفارشات، ارتباط با شما در مورد حساب و خدمات، ارسال اطلاع‌رسانی‌ها و بروزرسانی‌ها، تحلیل و بهبود تجربه کاربری، امنیت و جلوگیری از کلاهبرداری، و رعایت تعهدات قانونی استفاده می‌کنیم.'
        : language === 'ar'
        ? 'نستخدم معلوماتك من أجل: تقديم وتحسين الخدمات، معالجة المعاملات والطلبات، التواصل معك بشأن الحساب والخدمات، إرسال الإشعارات والتحديثات، تحليل وتحسين تجربة المستخدم، الأمان ومنع الاحتيال، والامتثال للالتزامات القانونية.'
        : 'We use your information to: provide and improve services, process transactions and orders, communicate with you about your account and services, send notifications and updates, analyze and improve user experience, security and fraud prevention, and comply with legal obligations.',
    },
    {
      id: 'sharing',
      title: language === 'fa' ? '4. به‌اشتراک‌گذاری اطلاعات' : language === 'ar' ? '4. مشاركة المعلومات' : '4. Information Sharing',
      icon: Share2,
      content: language === 'fa'
        ? 'ما اطلاعات شما را با اشخاص ثالث به‌اشتراک نمی‌گذاریم، مگر در موارد زیر: با ارائه‌دهندگان خدمات مورد اعتماد (حمل‌ونقل، پرداخت)، در صورت الزام قانونی، برای محافظت از حقوق و امنیت ما و کاربران، در صورت ادغام یا خرید شرکت، و با رضایت صریح شما. ما فقط اطلاعات لازم را به‌اشتراک می‌گذاریم.'
        : language === 'ar'
        ? 'لا نشارك معلوماتك مع أطراف ثالثة، إلا في الحالات التالية: مع مقدمي الخدمات الموثوقين (الشحن والدفع)، في حالة المتطلبات القانونية، لحماية حقوقنا وأماننا والمستخدمين، في حالة الاندماج أو الشراء، ومع موافقتك الصريحة. نشارك فقط المعلومات الضرورية.'
        : 'We do not share your information with third parties, except in the following cases: with trusted service providers (shipping, payment), when legally required, to protect our rights and security and users, in case of merger or acquisition, and with your explicit consent. We only share necessary information.',
    },
    {
      id: 'security',
      title: language === 'fa' ? '5. امنیت داده‌ها' : language === 'ar' ? '5. أمان البيانات' : '5. Data Security',
      icon: Lock,
      content: language === 'fa'
        ? 'ما از اقدامات امنیتی پیشرفته برای محافظت از اطلاعات شما استفاده می‌کنیم: رمزگذاری SSL/TLS برای انتقال داده‌ها، سیستم‌های احراز هویت قوی، کنترل دسترسی محدود، نظارت مداوم بر امنیت، پشتیبان‌گیری منظم، و آموزش مداوم کارکنان در زمینه امنیت. با این حال، هیچ سیستم انتقال اینترنتی کاملاً امن نیست.'
        : language === 'ar'
        ? 'نستخدم إجراءات أمنية متقدمة لحماية معلوماتك: تشفير SSL/TLS لنقل البيانات، أنظمة مصادقة قوية، تحكم محدود بالوصول، مراقبة مستمرة للأمان، نسخ احتياطي منتظم، وتدريب مستمر للموظفين على الأمان. ومع ذلك، لا يوجد نظام نقل إنترنت آمن تمامًا.'
        : 'We use advanced security measures to protect your information: SSL/TLS encryption for data transmission, strong authentication systems, limited access control, continuous security monitoring, regular backups, and ongoing staff training on security. However, no internet transmission system is completely secure.',
    },
    {
      id: 'cookies',
      title: language === 'fa' ? '6. کوکی‌ها و فناوری‌های مشابه' : language === 'ar' ? '6. الكوكيز والتقنيات المشابهة' : '6. Cookies and Similar Technologies',
      icon: Cookie,
      content: language === 'fa'
        ? 'ما از کوکی‌ها و فناوری‌های مشابه استفاده می‌کنیم تا: عملکرد وب‌سایت را بهبود دهیم، تجربه کاربری را شخصی‌سازی کنیم، ترافیک و استفاده از سایت را تحلیل کنیم، و تبلیغات هدفمند نشان دهیم. شما می‌توانید تنظیمات مرورگر خود را برای مدیریت کوکی‌ها تغییر دهید، اما این ممکن است بر عملکرد برخی ویژگی‌ها تأثیر بگذارد.'
        : language === 'ar'
        ? 'نستخدم الكوكيز والتقنيات المشابهة من أجل: تحسين أداء الموقع، تخصيص تجربة المستخدم، تحليل حركة المرور واستخدام الموقع، وعرض إعلانات مستهدفة. يمكنك تغيير إعدادات المتصفح لإدارة الكوكيز، ولكن قد يؤثر هذا على أداء بعض الميزات.'
        : 'We use cookies and similar technologies to: improve website performance, personalize user experience, analyze traffic and site usage, and display targeted advertising. You can change your browser settings to manage cookies, but this may affect the performance of some features.',
    },
    {
      id: 'rights',
      title: language === 'fa' ? '7. حقوق شما' : language === 'ar' ? '7. حقوقك' : '7. Your Rights',
      icon: UserCheck,
      content: language === 'fa'
        ? 'شما حق دارید: به اطلاعات شخصی خود دسترسی داشته باشید، اطلاعات نادرست را اصلاح کنید، حذف اطلاعات خود را درخواست کنید، اعتراض به پردازش اطلاعات، محدود کردن پردازش اطلاعات، انتقال اطلاعات خود، و لغو رضایت در هر زمان. برای اعمال این حقوق، لطفاً با ما تماس بگیرید.'
        : language === 'ar'
        ? 'لديك الحق في: الوصول إلى معلوماتك الشخصية، تصحيح المعلومات غير الصحيحة، طلب حذف معلوماتك، الاعتراض على معالجة المعلومات، تقييد معالجة المعلومات، نقل معلوماتك، وإلغاء الموافقة في أي وقت. لممارسة هذه الحقوق، يرجى الاتصال بنا.'
        : 'You have the right to: access your personal information, correct inaccurate information, request deletion of your information, object to information processing, restrict information processing, transfer your information, and withdraw consent at any time. To exercise these rights, please contact us.',
    },
    {
      id: 'retention',
      title: language === 'fa' ? '8. نگهداری اطلاعات' : language === 'ar' ? '8. الاحتفاظ بالمعلومات' : '8. Data Retention',
      icon: FileCheck,
      content: language === 'fa'
        ? 'ما اطلاعات شما را فقط برای مدت زمان لازم برای اهداف ذکر شده در این سیاست نگهداری می‌کنیم. پس از پایان این دوره، اطلاعات به صورت ایمن حذف یا ناشناس می‌شوند، مگر اینکه قانون یا مقررات دیگری الزام کند که اطلاعات را برای مدت طولانی‌تری نگه داریم.'
        : language === 'ar'
        ? 'نحتفظ بمعلوماتك فقط للفترة اللازمة للأغراض المذكورة في هذه السياسة. بعد انتهاء هذه الفترة، يتم حذف المعلومات أو إخفاء هويتها بأمان، إلا إذا تطلب القانون أو اللوائح الأخرى الاحتفاظ بالمعلومات لفترة أطول.'
        : 'We retain your information only for as long as necessary for the purposes stated in this policy. After this period, information is securely deleted or anonymized, unless law or other regulations require us to retain information for a longer period.',
    },
    {
      id: 'children',
      title: language === 'fa' ? '9. کودکان' : language === 'ar' ? '9. الأطفال' : '9. Children',
      icon: Users,
      content: language === 'fa'
        ? 'خدمات ما برای افراد بالای 18 سال طراحی شده است. ما عمداً اطلاعات شخصی از کودکان زیر 18 سال جمع‌آوری نمی‌کنیم. اگر متوجه شویم که اطلاعات کودک را بدون رضایت والدین جمع‌آوری کرده‌ایم، فوراً آن را حذف خواهیم کرد.'
        : language === 'ar'
        ? 'خدماتنا مصممة للأشخاص الذين تزيد أعمارهم عن 18 عامًا. لا نجمع عمدًا معلومات شخصية من الأطفال دون سن 18 عامًا. إذا اكتشفنا أننا جمعنا معلومات طفل دون موافقة الوالدين، فسنحذفها فورًا.'
        : 'Our services are designed for people over 18 years of age. We do not knowingly collect personal information from children under 18. If we discover that we have collected child information without parental consent, we will delete it immediately.',
    },
    {
      id: 'changes',
      title: language === 'fa' ? '10. تغییرات در سیاست' : language === 'ar' ? '10. تغييرات في السياسة' : '10. Changes to Policy',
      icon: AlertCircle,
      content: language === 'fa'
        ? 'ما ممکن است این سیاست حریم خصوصی را به‌روزرسانی کنیم. تغییرات عمده از طریق ایمیل یا اطلاعیه در وب‌سایت به اطلاع شما خواهد رسید. تاریخ "آخرین بروزرسانی" در بالای این صفحه نشان می‌دهد که آخرین بار چه زمانی این سیاست به‌روزرسانی شده است.'
        : language === 'ar'
        ? 'قد نحدث سياسة الخصوصية هذه. سيتم إعلامك بالتغييرات الكبيرة عبر البريد الإلكتروني أو إشعار على الموقع. يشير تاريخ "آخر تحديث" أعلى هذه الصفحة إلى آخر مرة تم فيها تحديث هذه السياسة.'
        : 'We may update this Privacy Policy. Major changes will be notified to you via email or notice on the website. The "Last Updated" date at the top of this page indicates when this policy was last updated.',
    },
    {
      id: 'contact',
      title: language === 'fa' ? '11. تماس با ما' : language === 'ar' ? '11. اتصل بنا' : '11. Contact Us',
      icon: Mail,
      content: language === 'fa'
        ? 'اگر سوالی در مورد این سیاست حریم خصوصی دارید یا می‌خواهید حقوق خود را اعمال کنید، لطفاً با ما از طریق ایمیل privacy@aslmarket.com یا از طریق صفحه تماس با ما تماس بگیرید. ما در اسرع وقت به درخواست‌های شما پاسخ خواهیم داد.'
        : language === 'ar'
        ? 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ترغب في ممارسة حقوقك، يرجى الاتصال بنا عبر البريد الإلكتروني privacy@aslmarket.com أو من خلال صفحة الاتصال بنا. سنرد على طلباتك في أقرب وقت ممكن.'
        : 'If you have any questions about this Privacy Policy or want to exercise your rights, please contact us via email at privacy@aslmarket.com or through our contact page. We will respond to your requests as soon as possible.',
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
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              <span className="text-primary font-bold whitespace-nowrap">
                {language === 'fa' ? 'حریم خصوصی' : language === 'ar' ? 'الخصوصية' : 'Privacy Policy'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight px-2">
              <span className="block text-foreground">
                {language === 'fa' ? 'سیاست حریم خصوصی' : language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </span>
              <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'محافظت از اطلاعات شما' : language === 'ar' ? 'حماية معلوماتك' : 'Protecting Your Information'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              {language === 'fa'
                ? 'ما به حریم خصوصی شما اهمیت می‌دهیم. این صفحه توضیح می‌دهد که ما چگونه اطلاعات شما را محافظت می‌کنیم.'
                : language === 'ar'
                ? 'نهتم بخصوصيتك. توضح هذه الصفحة كيف نحمي معلوماتك.'
                : 'We care about your privacy. This page explains how we protect your information.'}
            </p>

            {/* Last Updated */}
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap px-4">
              <FileCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span className="leading-tight">
                {language === 'fa' ? 'آخرین بروزرسانی: ' : language === 'ar' ? 'آخر تحديث: ' : 'Last Updated: '}
                <span className="font-semibold text-foreground">January 1, 2024</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
            {/* Introduction */}
            <Card className="p-5 sm:p-6 md:p-7 lg:p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-tight">
                    {language === 'fa' ? 'تعهد ما' : language === 'ar' ? 'تعهدنا' : 'Our Commitment'}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {language === 'fa'
                      ? 'در ASL Market، ما به محافظت از حریم خصوصی و اطلاعات شخصی شما متعهد هستیم. این سیاست حریم خصوصی توضیح می‌دهد که ما چه اطلاعاتی را جمع‌آوری می‌کنیم، چگونه از آن استفاده می‌کنیم و چگونه از آن محافظت می‌کنیم.'
                      : language === 'ar'
                      ? 'في ASL Market، نحن ملتزمون بحماية خصوصيتك ومعلوماتك الشخصية. توضح سياسة الخصوصية هذه ما هي المعلومات التي نجمعها وكيف نستخدمها وكيف نحميها.'
                      : 'At ASL Market, we are committed to protecting your privacy and personal information. This Privacy Policy explains what information we collect, how we use it, and how we protect it.'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Privacy Sections */}
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

            {/* Security Highlights */}
            <Card className="p-5 sm:p-6 md:p-7 lg:p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/20">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shrink-0">
                  <Key className="h-5 w-5 sm:h-6 sm:w-6 text-white shrink-0" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-tight">
                    {language === 'fa' ? 'امنیت اطلاعات شما' : language === 'ar' ? 'أمان معلوماتك' : 'Your Information Security'}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                    {language === 'fa'
                      ? 'ما از آخرین فناوری‌های امنیتی برای محافظت از اطلاعات شما استفاده می‌کنیم:'
                      : language === 'ar'
                      ? 'نستخدم أحدث التقنيات الأمنية لحماية معلوماتك:'
                      : 'We use the latest security technologies to protect your information:'}
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{language === 'fa' ? 'رمزگذاری SSL/TLS برای تمام ارتباطات' : language === 'ar' ? 'تشفير SSL/TLS لجميع الاتصالات' : 'SSL/TLS encryption for all communications'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{language === 'fa' ? 'سیستم‌های احراز هویت چند مرحله‌ای' : language === 'ar' ? 'أنظمة مصادقة متعددة الخطوات' : 'Multi-factor authentication systems'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{language === 'fa' ? 'نظارت 24/7 بر امنیت سیستم' : language === 'ar' ? 'مراقبة على مدار الساعة لأمان النظام' : '24/7 system security monitoring'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{language === 'fa' ? 'پشتیبان‌گیری منظم و امن' : language === 'ar' ? 'نسخ احتياطي منتظم وآمن' : 'Regular and secure backups'}</span>
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
                      ? 'اگر سوالی در مورد این سیاست حریم خصوصی دارید یا می‌خواهید اطلاعات خود را مدیریت کنید، لطفاً با ما تماس بگیرید. تیم ما آماده کمک به شما است.'
                      : language === 'ar'
                      ? 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ترغب في إدارة معلوماتك، يرجى الاتصال بنا. فريقنا جاهز لمساعدتك.'
                      : 'If you have any questions about this Privacy Policy or want to manage your information, please contact us. Our team is ready to help you.'}
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
                    onClick={() => navigate('/terms')}
                  >
                    {language === 'fa' ? 'شرایط خدمات' : language === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
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

export default Privacy;

