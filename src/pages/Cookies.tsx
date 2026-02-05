import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Cookie, 
  Info,
  Settings,
  Eye,
  Shield,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Clock,
  FileCheck,
  Globe,
  Lock,
  BarChart3,
  Mail,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const Cookies: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();

  const cookieTypes = [
    {
      name: language === 'fa' ? 'کوکی‌های ضروری' : language === 'ar' ? 'الكوكيز الضرورية' : 'Essential Cookies',
      description: language === 'fa'
        ? 'این کوکی‌ها برای عملکرد صحیح وب‌سایت ضروری هستند و نمی‌توانند غیرفعال شوند.'
        : language === 'ar'
        ? 'هذه الكوكيز ضرورية لعمل الموقع بشكل صحيح ولا يمكن تعطيلها.'
        : 'These cookies are essential for the website to function properly and cannot be disabled.',
      examples: language === 'fa'
        ? 'کوکی‌های احراز هویت، کوکی‌های امنیتی، کوکی‌های سبد خرید'
        : language === 'ar'
        ? 'كوكيز المصادقة وكوكيز الأمان وكوكيز سلة التسوق'
        : 'Authentication cookies, security cookies, shopping cart cookies',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: language === 'fa' ? 'کوکی‌های عملکردی' : language === 'ar' ? 'الكوكيز الوظيفية' : 'Functional Cookies',
      description: language === 'fa'
        ? 'این کوکی‌ها به ما کمک می‌کنند تا تجربه کاربری را بهبود بخشیم و ترجیحات شما را به خاطر بسپاریم.'
        : language === 'ar'
        ? 'تساعدنا هذه الكوكيز على تحسين تجربة المستخدم وتذكر تفضيلاتك.'
        : 'These cookies help us improve user experience and remember your preferences.',
      examples: language === 'fa'
        ? 'زبان انتخابی، تنظیمات منطقه‌ای، تنظیمات رابط کاربری'
        : language === 'ar'
        ? 'اللغة المختارة وإعدادات المنطقة وإعدادات واجهة المستخدم'
        : 'Selected language, regional settings, user interface settings',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: language === 'fa' ? 'کوکی‌های تحلیلی' : language === 'ar' ? 'الكوكيز التحليلية' : 'Analytics Cookies',
      description: language === 'fa'
        ? 'این کوکی‌ها به ما کمک می‌کنند تا نحوه استفاده شما از وب‌سایت را درک کنیم و عملکرد آن را بهبود بخشیم.'
        : language === 'ar'
        ? 'تساعدنا هذه الكوكيز على فهم كيفية استخدامك للموقع وتحسين أدائه.'
        : 'These cookies help us understand how you use the website and improve its performance.',
      examples: language === 'fa'
        ? 'Google Analytics، تجزیه و تحلیل ترافیک، گزارش‌گیری استفاده'
        : language === 'ar'
        ? 'Google Analytics وتحليل حركة المرور وتقارير الاستخدام'
        : 'Google Analytics, traffic analysis, usage reporting',
      color: 'from-yellow-500 to-amber-500',
    },
    {
      name: language === 'fa' ? 'کوکی‌های تبلیغاتی' : language === 'ar' ? 'الكوكيز الإعلانية' : 'Advertising Cookies',
      description: language === 'fa'
        ? 'این کوکی‌ها برای نمایش تبلیغات مرتبط با علایق شما استفاده می‌شوند.'
        : language === 'ar'
        ? 'تستخدم هذه الكوكيز لعرض إعلانات مرتبطة باهتماماتك.'
        : 'These cookies are used to display advertisements relevant to your interests.',
      examples: language === 'fa'
        ? 'تبلیغات هدفمند، ردیابی تبدیل، مدیریت تبلیغات'
        : language === 'ar'
        ? 'إعلانات مستهدفة وتتبع التحويل وإدارة الإعلانات'
        : 'Targeted advertising, conversion tracking, ad management',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const sections = [
    {
      id: 'what-are-cookies',
      title: language === 'fa' ? '1. کوکی‌ها چیستند؟' : language === 'ar' ? '1. ما هي الكوكيز؟' : '1. What Are Cookies?',
      icon: Cookie,
      content: language === 'fa'
        ? 'کوکی‌ها فایل‌های متنی کوچکی هستند که در دستگاه شما (کامپیوتر، تبلت، موبایل) هنگام بازدید از وب‌سایت ذخیره می‌شوند. کوکی‌ها به وب‌سایت کمک می‌کنند تا عملکرد بهتری داشته باشد و تجربه کاربری شما را بهبود بخشد.'
        : language === 'ar'
        ? 'الكوكيز هي ملفات نصية صغيرة يتم حفظها على جهازك (كمبيوتر أو لوحي أو هاتف) عند زيارة الموقع. تساعد الكوكيز الموقع على الأداء بشكل أفضل وتحسين تجربة المستخدم.'
        : 'Cookies are small text files that are stored on your device (computer, tablet, mobile) when you visit a website. Cookies help the website perform better and improve your user experience.',
    },
    {
      id: 'how-we-use',
      title: language === 'fa' ? '2. چگونه از کوکی‌ها استفاده می‌کنیم؟' : language === 'ar' ? '2. كيف نستخدم الكوكيز؟' : '2. How We Use Cookies?',
      icon: Eye,
      content: language === 'fa'
        ? 'ما از کوکی‌ها برای: حفظ تنظیمات و ترجیحات شما، بهبود عملکرد وب‌سایت، تجزیه و تحلیل نحوه استفاده از وب‌سایت، ارائه محتوای شخصی‌سازی شده، و بهبود امنیت استفاده می‌کنیم. ما فقط از کوکی‌های ضروری برای عملکرد وب‌سایت استفاده می‌کنیم و سایر کوکی‌ها با رضایت شما فعال می‌شوند.'
        : language === 'ar'
        ? 'نستخدم الكوكيز من أجل: حفظ إعداداتك وتفضيلاتك، تحسين أداء الموقع، تحليل كيفية استخدام الموقع، تقديم محتوى مخصص، وتحسين الأمان. نستخدم فقط الكوكيز الضرورية لعمل الموقع وتفعيل الكوكيز الأخرى بموافقتك.'
        : 'We use cookies to: save your settings and preferences, improve website performance, analyze how the website is used, provide personalized content, and improve security. We only use essential cookies for website functionality and other cookies are activated with your consent.',
    },
    {
      id: 'types',
      title: language === 'fa' ? '3. انواع کوکی‌ها' : language === 'ar' ? '3. أنواع الكوكيز' : '3. Types of Cookies',
      icon: BarChart3,
      content: language === 'fa'
        ? 'ما از انواع مختلف کوکی‌ها استفاده می‌کنیم که هر کدام هدف خاصی دارند. در بخش زیر می‌توانید انواع کوکی‌های مورد استفاده را مشاهده کنید.'
        : language === 'ar'
        ? 'نستخدم أنواعًا مختلفة من الكوكيز ولكل منها غرض محدد. يمكنك في القسم أدناه رؤية أنواع الكوكيز المستخدمة.'
        : 'We use different types of cookies, each with a specific purpose. In the section below, you can see the types of cookies used.',
    },
    {
      id: 'third-party',
      title: language === 'fa' ? '4. کوکی‌های شخص ثالث' : language === 'ar' ? '4. كوكيز الطرف الثالث' : '4. Third-Party Cookies',
      icon: Globe,
      content: language === 'fa'
        ? 'ما ممکن است از کوکی‌های ارائه‌شده توسط شرکت‌های شخص ثالث استفاده کنیم، مانند Google Analytics برای تجزیه و تحلیل ترافیک. این کوکی‌ها توسط آن شرکت‌ها تنظیم می‌شوند و استفاده از آنها تابع سیاست‌های حریم خصوصی آنهاست. ما توصیه می‌کنیم که سیاست‌های حریم خصوصی این شرکت‌ها را نیز مطالعه کنید.'
        : language === 'ar'
        ? 'قد نستخدم كوكيز مقدمة من شركات طرف ثالث، مثل Google Analytics لتحليل حركة المرور. يتم تعيين هذه الكوكيز من قبل هذه الشركات واستخدامها يخضع لسياسات الخصوصية الخاصة بها. نوصي بقراءة سياسات الخصوصية لهذه الشركات أيضًا.'
        : 'We may use cookies provided by third-party companies, such as Google Analytics for traffic analysis. These cookies are set by those companies and their use is subject to their privacy policies. We recommend that you also read the privacy policies of these companies.',
    },
    {
      id: 'management',
      title: language === 'fa' ? '5. مدیریت کوکی‌ها' : language === 'ar' ? '5. إدارة الكوكيز' : '5. Managing Cookies',
      icon: Settings,
      content: language === 'fa'
        ? 'شما می‌توانید تنظیمات مرورگر خود را تغییر دهید تا کوکی‌ها را بپذیرید، رد کنید یا هنگام ارسال کوکی اطلاع‌رسانی شوید. توجه داشته باشید که غیرفعال کردن برخی کوکی‌ها ممکن است بر عملکرد وب‌سایت تأثیر بگذارد. همچنین می‌توانید کوکی‌های ذخیره شده را از طریق تنظیمات مرورگر خود حذف کنید.'
        : language === 'ar'
        ? 'يمكنك تغيير إعدادات المتصفح لقبول أو رفض الكوكيز أو الإشعار عند إرسال الكوكيز. يرجى ملاحظة أن تعطيل بعض الكوكيز قد يؤثر على أداء الموقع. يمكنك أيضًا حذف الكوكيز المحفوظة من خلال إعدادات المتصفح.'
        : 'You can change your browser settings to accept, reject, or be notified when cookies are sent. Please note that disabling some cookies may affect website performance. You can also delete saved cookies through your browser settings.',
    },
    {
      id: 'duration',
      title: language === 'fa' ? '6. مدت زمان نگهداری کوکی‌ها' : language === 'ar' ? '6. مدة الاحتفاظ بالكوكيز' : '6. Cookie Duration',
      icon: Clock,
      content: language === 'fa'
        ? 'کوکی‌ها می‌توانند "session" (موقت) یا "persistent" (دائمی) باشند. کوکی‌های session پس از بستن مرورگر حذف می‌شوند، در حالی که کوکی‌های persistent تا تاریخ انقضای مشخص شده یا تا زمانی که شما آنها را حذف نکنید، باقی می‌مانند. مدت زمان نگهداری کوکی‌های ما معمولاً بین 30 روز تا 2 سال است.'
        : language === 'ar'
        ? 'يمكن أن تكون الكوكيز "session" (مؤقتة) أو "persistent" (دائمة). يتم حذف كوكيز الجلسة عند إغلاق المتصفح، بينما تبقى الكوكيز الدائمة حتى تاريخ انتهاء الصلاحية المحدد أو حتى تحذفها. عادة ما تكون مدة الاحتفاظ بكوكيزنا بين 30 يومًا إلى سنتين.'
        : 'Cookies can be "session" (temporary) or "persistent" (permanent). Session cookies are deleted when you close the browser, while persistent cookies remain until the specified expiration date or until you delete them. The duration of our cookies is usually between 30 days and 2 years.',
    },
    {
      id: 'your-rights',
      title: language === 'fa' ? '7. حقوق شما' : language === 'ar' ? '7. حقوقك' : '7. Your Rights',
      icon: UserCheck,
      content: language === 'fa'
        ? 'شما حق دارید: کوکی‌ها را مدیریت کنید، کوکی‌های غیرضروری را غیرفعال کنید، کوکی‌های ذخیره شده را حذف کنید، و در مورد استفاده از کوکی‌ها اطلاع‌رسانی دریافت کنید. ما ابزارهایی در اختیار شما قرار می‌دهیم تا کنترل کاملی بر کوکی‌ها داشته باشید.'
        : language === 'ar'
        ? 'لديك الحق في: إدارة الكوكيز وتعطيل الكوكيز غير الضرورية وحذف الكوكيز المحفوظة والحصول على إشعارات حول استخدام الكوكيز. نوفر لك الأدوات للحصول على تحكم كامل في الكوكيز.'
        : 'You have the right to: manage cookies, disable non-essential cookies, delete saved cookies, and receive notifications about cookie use. We provide you with tools to have full control over cookies.',
    },
    {
      id: 'updates',
      title: language === 'fa' ? '8. بروزرسانی‌های سیاست' : language === 'ar' ? '8. تحديثات السياسة' : '8. Policy Updates',
      icon: FileCheck,
      content: language === 'fa'
        ? 'ما ممکن است این سیاست کوکی را به‌روزرسانی کنیم تا تغییرات در فناوری یا قوانین را منعکس کند. هر گونه تغییرات عمده از طریق اطلاع‌رسانی در وب‌سایت یا ایمیل به اطلاع شما خواهد رسید. تاریخ "آخرین بروزرسانی" در بالای این صفحه نشان می‌دهد که آخرین بار چه زمانی این سیاست به‌روزرسانی شده است.'
        : language === 'ar'
        ? 'قد نحدث سياسة الكوكيز هذه لتعكس التغييرات في التكنولوجيا أو القوانين. سيتم إبلاغك بأي تغييرات كبيرة من خلال إشعار على الموقع أو البريد الإلكتروني. يشير تاريخ "آخر تحديث" أعلى هذه الصفحة إلى آخر مرة تم فيها تحديث هذه السياسة.'
        : 'We may update this Cookie Policy to reflect changes in technology or laws. Any major changes will be notified to you through a notice on the website or email. The "Last Updated" date at the top of this page indicates when this policy was last updated.',
    },
    {
      id: 'contact',
      title: language === 'fa' ? '9. تماس با ما' : language === 'ar' ? '9. اتصل بنا' : '9. Contact Us',
      icon: Mail,
      content: language === 'fa'
        ? 'اگر سوالی در مورد این سیاست کوکی دارید یا می‌خواهید اطلاعات بیشتری در مورد استفاده ما از کوکی‌ها دریافت کنید، لطفاً با ما از طریق ایمیل privacy@aslmarket.com یا از طریق صفحه تماس با ما تماس بگیرید.'
        : language === 'ar'
        ? 'إذا كان لديك أي أسئلة حول سياسة الكوكيز هذه أو ترغب في الحصول على مزيد من المعلومات حول استخدامنا للكوكيز، يرجى الاتصال بنا عبر البريد الإلكتروني privacy@aslmarket.com أو من خلال صفحة الاتصال بنا.'
        : 'If you have any questions about this Cookie Policy or want more information about our use of cookies, please contact us via email at privacy@aslmarket.com or through our contact page.',
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
              <Cookie className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              <span className="text-primary font-bold whitespace-nowrap">
                {language === 'fa' ? 'سیاست کوکی' : language === 'ar' ? 'سياسة الكوكيز' : 'Cookie Policy'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight px-2">
              <span className="block text-foreground">
                {language === 'fa' ? 'سیاست کوکی' : language === 'ar' ? 'سياسة الكوكيز' : 'Cookie Policy'}
              </span>
              <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'استفاده از کوکی‌ها در ASL Market' : language === 'ar' ? 'استخدام الكوكيز في ASL Market' : 'Cookie Usage at ASL Market'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              {language === 'fa'
                ? 'این صفحه توضیح می‌دهد که ما چگونه از کوکی‌ها استفاده می‌کنیم و شما چگونه می‌توانید آنها را مدیریت کنید.'
                : language === 'ar'
                ? 'توضح هذه الصفحة كيف نستخدم الكوكيز وكيف يمكنك إدارتها.'
                : 'This page explains how we use cookies and how you can manage them.'}
            </p>

            {/* Last Updated */}
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap px-4">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span className="leading-tight">
                {language === 'fa' ? 'آخرین بروزرسانی: ' : language === 'ar' ? 'آخر تحديث: ' : 'Last Updated: '}
                <span className="font-semibold text-foreground">January 1, 2024</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Policy Content */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
            {/* Introduction */}
            <Card className="p-5 sm:p-6 md:p-7 lg:p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Info className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-tight">
                    {language === 'fa' ? 'مقدمه' : language === 'ar' ? 'مقدمة' : 'Introduction'}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {language === 'fa'
                      ? 'در ASL Market، ما از کوکی‌ها و فناوری‌های مشابه برای بهبود تجربه کاربری، تحلیل استفاده از وب‌سایت و ارائه خدمات بهتر استفاده می‌کنیم. این سیاست توضیح می‌دهد که کوکی‌ها چیستند، چگونه از آنها استفاده می‌کنیم و چگونه می‌توانید آنها را مدیریت کنید.'
                      : language === 'ar'
                      ? 'في ASL Market، نستخدم الكوكيز والتقنيات المشابهة لتحسين تجربة المستخدم وتحليل استخدام الموقع وتقديم خدمات أفضل. توضح هذه السياسة ما هي الكوكيز وكيف نستخدمها وكيف يمكنك إدارتها.'
                      : 'At ASL Market, we use cookies and similar technologies to improve user experience, analyze website usage and provide better services. This policy explains what cookies are, how we use them, and how you can manage them.'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Cookie Types Section */}
            <Card className="p-5 sm:p-6 md:p-7 lg:p-8 border-2 hover:border-primary/50 transition-all">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-5 md:mb-6 leading-tight px-2">
                {language === 'fa' ? 'انواع کوکی‌های مورد استفاده' : language === 'ar' ? 'أنواع الكوكيز المستخدمة' : 'Types of Cookies We Use'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {cookieTypes.map((type, index) => (
                  <Card
                    key={index}
                    className="p-4 sm:p-5 md:p-6 border-2 hover:shadow-lg transition-all"
                  >
                    <div className={cn(
                      "w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br flex items-center justify-center mb-3 sm:mb-4 shrink-0",
                      type.color
                    )}>
                      <Cookie className="h-5 w-5 sm:h-6 sm:w-6 text-white shrink-0" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 leading-tight">
                      {type.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 leading-relaxed">
                      {type.description}
                    </p>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-semibold">
                        {language === 'fa' ? 'مثال‌ها: ' : language === 'ar' ? 'أمثلة: ' : 'Examples: '}
                      </span>
                      {type.examples}
                    </div>
                  </Card>
                ))}
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

            {/* Cookie Management Help */}
            <Card className="p-5 sm:p-6 md:p-7 lg:p-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/20">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
                  <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-white shrink-0" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-tight">
                    {language === 'fa' ? 'مدیریت کوکی‌ها در مرورگرها' : language === 'ar' ? 'إدارة الكوكيز في المتصفحات' : 'Managing Cookies in Browsers'}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                    {language === 'fa'
                      ? 'برای مدیریت کوکی‌ها در مرورگر خود، به بخش تنظیمات یا حریم خصوصی بروید:'
                      : language === 'ar'
                      ? 'لإدارة الكوكيز في متصفحك، انتقل إلى قسم الإعدادات أو الخصوصية:'
                      : 'To manage cookies in your browser, go to the settings or privacy section:'}
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{language === 'fa' ? 'Google Chrome: تنظیمات → حریم خصوصی و امنیت → کوکی‌ها' : language === 'ar' ? 'Google Chrome: الإعدادات → الخصوصية والأمان → الكوكيز' : 'Google Chrome: Settings → Privacy and Security → Cookies'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{language === 'fa' ? 'Mozilla Firefox: تنظیمات → حریم خصوصی و امنیت' : language === 'ar' ? 'Mozilla Firefox: الإعدادات → الخصوصية والأمان' : 'Mozilla Firefox: Settings → Privacy and Security'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{language === 'fa' ? 'Safari: تنظیمات → حریم خصوصی' : language === 'ar' ? 'Safari: الإعدادات → الخصوصية' : 'Safari: Settings → Privacy'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{language === 'fa' ? 'Microsoft Edge: تنظیمات → حریم خصوصی و سرویس‌ها' : language === 'ar' ? 'Microsoft Edge: الإعدادات → الخصوصية والخدمات' : 'Microsoft Edge: Settings → Privacy and Services'}</span>
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
                      ? 'اگر سوالی در مورد این سیاست کوکی دارید یا می‌خواهید اطلاعات بیشتری دریافت کنید، لطفاً با ما تماس بگیرید. تیم ما آماده کمک به شما است.'
                      : language === 'ar'
                      ? 'إذا كان لديك أي أسئلة حول سياسة الكوكيز هذه أو ترغب في الحصول على مزيد من المعلومات، يرجى الاتصال بنا. فريقنا جاهز لمساعدتك.'
                      : 'If you have any questions about this Cookie Policy or want more information, please contact us. Our team is ready to help you.'}
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

export default Cookies;

