import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Shield,
  AlertCircle,
  CheckCircle2,
  Info,
  ArrowRight,
  Scale,
  Lock,
  Users,
  FileCheck,
  Clock,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const Terms: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();

  const sections = [
    {
      id: 'acceptance',
      title: language === 'fa' ? '1. پذیرش شرایط' : language === 'ar' ? '1. قبول الشروط' : '1. Acceptance of Terms',
      icon: CheckCircle2,
      content: language === 'fa' 
        ? 'با دسترسی و استفاده از وب‌سایت ASL Market، شما موافقت می‌کنید که از این شرایط خدمات پیروی کنید. اگر با هر بخشی از این شرایط موافق نیستید، لطفاً از استفاده از این وب‌سایت خودداری کنید.'
        : language === 'ar'
        ? 'من خلال الوصول إلى موقع ASL Market واستخدامه، فإنك توافق على الالتزام بهذه الشروط. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام هذا الموقع.'
        : 'By accessing and using the ASL Market website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use this website.',
    },
    {
      id: 'account',
      title: language === 'fa' ? '2. حساب کاربری' : language === 'ar' ? '2. حساب المستخدم' : '2. User Account',
      icon: Users,
      content: language === 'fa'
        ? 'برای استفاده از برخی ویژگی‌های ما، باید یک حساب کاربری ایجاد کنید. شما مسئول حفظ محرمانه‌بودن اطلاعات حساب کاربری خود هستید و تمام فعالیت‌هایی که تحت حساب کاربری شما انجام می‌شود را می‌پذیرید. ما حق داریم حساب کاربری شما را در صورت نقض این شرایط لغو کنیم.'
        : language === 'ar'
        ? 'لاستخدام بعض ميزاتنا، يجب عليك إنشاء حساب مستخدم. أنت مسؤول عن الحفاظة على سرية معلومات حسابك وتقبل جميع الأنشطة التي تتم تحت حسابك. نحتفظ بالحق في إلغاء حسابك في حالة انتهاك هذه الشروط.'
        : 'To use certain features of our service, you must create a user account. You are responsible for maintaining the confidentiality of your account information and accept all activities that occur under your account. We reserve the right to cancel your account if these terms are violated.',
    },
    {
      id: 'services',
      title: language === 'fa' ? '3. خدمات' : language === 'ar' ? '3. الخدمات' : '3. Services',
      icon: Globe,
      content: language === 'fa'
        ? 'ASL Market یک پلتفرم B2B است که خریداران و تأمین‌کنندگان را به هم متصل می‌کند. ما خدمات بازار را ارائه می‌دهیم اما مسئولیت معاملات بین کاربران را بر عهده نمی‌گیریم. ما حق داریم خدمات خود را بدون اطلاع قبلی تغییر، تعلیق یا متوقف کنیم.'
        : language === 'ar'
        ? 'ASL Market عبارة عن منصة B2B تربط المشترين والموردين. نقدم خدمات السوق ولكننا لسنا مسؤولين عن المعاملات بين المستخدمين. نحتفظ بالحق في تعديل أو تعليق أو إنهاء خدماتنا دون إشعار مسبق.'
        : 'ASL Market is a B2B platform that connects buyers and suppliers. We provide marketplace services but are not responsible for transactions between users. We reserve the right to modify, suspend, or terminate our services without prior notice.',
    },
    {
      id: 'user-conduct',
      title: language === 'fa' ? '4. رفتار کاربر' : language === 'ar' ? '4. سلوك المستخدم' : '4. User Conduct',
      icon: Shield,
      content: language === 'fa'
        ? 'شما موافقت می‌کنید که از خدمات ما به روشی قانونی و اخلاقی استفاده کنید. هرگونه استفاده غیرقانونی، کلاهبرداری، یا فعالیت‌هایی که باعث آسیب به دیگران شود ممنوع است. ما حق داریم کاربرانی را که این قوانین را نقض می‌کنند، مسدود کنیم.'
        : language === 'ar'
        ? 'أنت توافق على استخدام خدماتنا بطريقة قانونية وأخلاقية. يُحظر أي استخدام غير قانوني أو احتيالي أو أنشطة تسبب ضرراً للآخرين. نحتفظ بالحق في حظر المستخدمين الذين ينتهكون هذه القواعد.'
        : 'You agree to use our services in a lawful and ethical manner. Any illegal, fraudulent use or activities that cause harm to others are prohibited. We reserve the right to block users who violate these rules.',
    },
    {
      id: 'intellectual-property',
      title: language === 'fa' ? '5. مالکیت فکری' : language === 'ar' ? '5. الملكية الفكرية' : '5. Intellectual Property',
      icon: Lock,
      content: language === 'fa'
        ? 'تمام محتوا، لوگوها، علائم تجاری و سایر مطالب موجود در این وب‌سایت متعلق به ASL Market یا دارندگان مجوز آنهاست. شما حق کپی، توزیع یا استفاده تجاری از این مطالب را بدون مجوز کتبی ندارید.'
        : language === 'ar'
        ? 'جميع المحتوى والشعارات والعلامات التجارية والمحتوى الآخر على هذا الموقع مملوكة لـ ASL Market أو أصحاب الترخيص. ليس لديك الحق في نسخ أو توزيع أو استخدام تجاري لهذا المحتوى دون إذن كتابي.'
        : 'All content, logos, trademarks and other materials on this website are owned by ASL Market or their licensors. You do not have the right to copy, distribute or commercially use this content without written permission.',
    },
    {
      id: 'liability',
      title: language === 'fa' ? '6. محدودیت مسئولیت' : language === 'ar' ? '6. حدود المسؤولية' : '6. Limitation of Liability',
      icon: AlertCircle,
      content: language === 'fa'
        ? 'ASL Market و شرکای آن مسئولیتی در قبال خسارات مستقیم، غیرمستقیم، تصادفی یا ناشی از استفاده از خدمات ما ندارند. ما خدمات را "همان‌طور که هست" ارائه می‌دهیم و هیچ ضمانتی در مورد دقت یا کامل بودن اطلاعات ارائه نمی‌دهیم.'
        : language === 'ar'
        ? 'ASL Market وشركاؤها غير مسؤولين عن أي أضرار مباشرة أو غير مباشرة أو عرضية ناتجة عن استخدام خدماتنا. نقدم الخدمات "كما هي" ولا نقدم أي ضمانات فيما يتعلق بدقة أو اكتمال المعلومات المقدمة.'
        : 'ASL Market and its partners are not liable for any direct, indirect, incidental damages arising from the use of our services. We provide services "as is" and do not provide any warranties regarding the accuracy or completeness of the information provided.',
    },
    {
      id: 'indemnification',
      title: language === 'fa' ? '7. جبران خسارت' : language === 'ar' ? '7. التعويض' : '7. Indemnification',
      icon: Scale,
      content: language === 'fa'
        ? 'شما موافقت می‌کنید که ASL Market، کارکنان و شرکای آن را در برابر هرگونه ادعا، خسارت، ضرر یا هزینه‌ای که ناشی از استفاده شما از خدمات یا نقض این شرایط است، جبران خسارت کنید.'
        : language === 'ar'
        ? 'أنت توافق على تعويض ASL Market وموظفيه وشركائه من أي مطالبات أو أضرار أو خسائر أو نفقات ناتجة عن استخدامك للخدمات أو انتهاك هذه الشروط.'
        : 'You agree to indemnify ASL Market, its employees and partners against any claims, damages, losses or expenses arising from your use of the services or violation of these terms.',
    },
    {
      id: 'termination',
      title: language === 'fa' ? '8. فسخ' : language === 'ar' ? '8. الإنهاء' : '8. Termination',
      icon: FileCheck,
      content: language === 'fa'
        ? 'ما حق داریم حساب کاربری شما را در هر زمان و به هر دلیلی، با یا بدون اطلاع قبلی، تعلیق یا لغو کنیم. شما همچنین می‌توانید حساب کاربری خود را در هر زمان حذف کنید. پس از فسخ، حق استفاده از خدمات شما فوری پایان می‌یابد.'
        : language === 'ar'
        ? 'نحتفظ بالحق في تعليق أو إلغاء حسابك في أي وقت ولأي سبب، مع أو بدون إشعار مسبق. يمكنك أيضًا حذف حسابك في أي وقت. بعد الإنهاء، ينتهي حقك في استخدام الخدمات فورًا.'
        : 'We reserve the right to suspend or cancel your account at any time and for any reason, with or without prior notice. You can also delete your account at any time. After termination, your right to use the services ends immediately.',
    },
    {
      id: 'changes',
      title: language === 'fa' ? '9. تغییرات شرایط' : language === 'ar' ? '9. تغييرات الشروط' : '9. Changes to Terms',
      icon: Clock,
      content: language === 'fa'
        ? 'ما حق داریم این شرایط خدمات را در هر زمان تغییر دهیم. تغییرات پس از انتشار در این صفحه اعمال می‌شوند. ادامه استفاده شما از خدمات پس از تغییرات به معنای پذیرش شرایط جدید است.'
        : language === 'ar'
        ? 'نحتفظ بالحق في تعديل شروط الخدمة هذه في أي وقت. تصبح التغييرات سارية بعد نشرها على هذه الصفحة. استمرار استخدامك للخدمات بعد التغييرات يعني قبولك للشروط الجديدة.'
        : 'We reserve the right to change these Terms of Service at any time. Changes take effect after being published on this page. Your continued use of the services after changes means acceptance of the new terms.',
    },
    {
      id: 'contact',
      title: language === 'fa' ? '10. تماس با ما' : language === 'ar' ? '10. اتصل بنا' : '10. Contact Us',
      icon: Info,
      content: language === 'fa'
        ? 'اگر سوالی در مورد این شرایط خدمات دارید، لطفاً با ما از طریق ایمیل info@aslmarket.com یا از طریق صفحه تماس با ما تماس بگیرید.'
        : language === 'ar'
        ? 'إذا كان لديك أي أسئلة حول شروط الخدمة هذه، يرجى الاتصال بنا عبر البريد الإلكتروني info@aslmarket.com أو من خلال صفحة الاتصال بنا.'
        : 'If you have any questions about these Terms of Service, please contact us via email at info@aslmarket.com or through our contact page.',
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
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              <span className="text-primary font-bold whitespace-nowrap">
                {language === 'fa' ? 'شرایط خدمات' : language === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight px-2">
              <span className="block text-foreground">
                {language === 'fa' ? 'شرایط استفاده' : language === 'ar' ? 'شروط الاستخدام' : 'Terms of Service'}
              </span>
              <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'قوانین و مقررات ASL Market' : language === 'ar' ? 'القوانين واللوائح ASL Market' : 'ASL Market Rules & Regulations'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              {language === 'fa'
                ? 'لطفاً این شرایط را به دقت بخوانید. استفاده از خدمات ما به معنای پذیرش این شرایط است.'
                : language === 'ar'
                ? 'يرجى قراءة هذه الشروط بعناية. استخدام خدماتنا يعني قبول هذه الشروط.'
                : 'Please read these terms carefully. Using our services means accepting these terms.'}
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

      {/* Terms Content */}
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
                      ? 'خوش آمدید به ASL Market. این شرایط خدمات ("شرایط") قراردادی قانونی بین شما و ASL Market است که استفاده شما از وب‌سایت و خدمات ما را تنظیم می‌کند. با استفاده از خدمات ما، شما موافقت می‌کنید که از این شرایط پیروی کنید.'
                      : language === 'ar'
                      ? 'مرحباً بك في ASL Market. شروط الخدمة هذه ("الشروط") عبارة عن عقد قانوني بينك وبين ASL Market ينظم استخدامك لموقعنا وخدماتنا. من خلال استخدام خدماتنا، فإنك توافق على الالتزام بهذه الشروط.'
                      : 'Welcome to ASL Market. These Terms of Service ("Terms") are a legal contract between you and ASL Market that governs your use of our website and services. By using our services, you agree to be bound by these terms.'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Terms Sections */}
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

            {/* Agreement Section */}
            <Card className="p-5 sm:p-6 md:p-7 lg:p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="text-center space-y-4 sm:space-y-5 md:space-y-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto shrink-0">
                  <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white shrink-0" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 leading-tight px-2">
                    {language === 'fa' ? 'پذیرش شرایط' : language === 'ar' ? 'قبول الشروط' : 'Acceptance of Terms'}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4 sm:mb-5 md:mb-6 px-4">
                    {language === 'fa'
                      ? 'با استفاده از خدمات ASL Market، شما تأیید می‌کنید که این شرایط را خوانده، درک کرده و با آن موافقت کرده‌اید. اگر با هر بخشی از این شرایط موافق نیستید، لطفاً از خدمات ما استفاده نکنید.'
                      : language === 'ar'
                      ? 'من خلال استخدام خدمات ASL Market، فإنك تؤكد أنك قرأت وفهمت ووافقت على هذه الشروط. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا.'
                      : 'By using ASL Market services, you confirm that you have read, understood and agreed to these terms. If you do not agree with any part of these terms, please do not use our services.'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  <Button
                    size="lg"
                    className="btn-gradient-primary rounded-xl px-6 sm:px-8 md:px-10 py-5 sm:py-6 font-semibold text-sm sm:text-base w-full sm:w-auto whitespace-nowrap"
                    onClick={() => navigate('/contact')}
                  >
                    <span>{language === 'fa' ? 'سوال دارید؟ تماس بگیرید' : language === 'ar' ? 'هل لديك سؤال؟ اتصل بنا' : 'Have Questions? Contact Us'}</span>
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

export default Terms;

