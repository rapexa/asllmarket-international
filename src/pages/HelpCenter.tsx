import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  Search,
  BookOpen,
  Video,
  MessageSquare,
  Mail,
  Phone,
  ArrowRight,
  ChevronRight,
  FileText,
  Shield,
  ShoppingCart,
  User,
  Building2,
  CreditCard,
  Package,
  Sparkles,
  X,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  popular?: boolean;
}

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  articles: number;
}

const helpCategories: HelpCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    titleFa: 'شروع کار',
    titleAr: 'البدء',
    description: 'Learn the basics of using ASL Market',
    descriptionFa: 'یادگیری اصول اولیه استفاده از ASL Market',
    descriptionAr: 'تعلم أساسيات استخدام ASL Market',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    articles: 12,
  },
  {
    id: 'account',
    title: 'Account & Profile',
    titleFa: 'حساب و پروفایل',
    titleAr: 'الحساب والملف الشخصي',
    description: 'Manage your account settings',
    descriptionFa: 'مدیریت تنظیمات حساب کاربری',
    descriptionAr: 'إدارة إعدادات حسابك',
    icon: User,
    color: 'from-green-500 to-emerald-500',
    articles: 8,
  },
  {
    id: 'buying',
    title: 'Buying & Orders',
    titleFa: 'خرید و سفارشات',
    titleAr: 'الشراء والطلبات',
    description: 'How to buy and manage orders',
    descriptionFa: 'نحوه خرید و مدیریت سفارشات',
    descriptionAr: 'كيفية الشراء وإدارة الطلبات',
    icon: ShoppingCart,
    color: 'from-purple-500 to-pink-500',
    articles: 15,
  },
  {
    id: 'selling',
    title: 'Selling & Products',
    titleFa: 'فروش و محصولات',
    titleAr: 'البيع والمنتجات',
    description: 'Sell products and manage listings',
    descriptionFa: 'فروش محصولات و مدیریت لیست‌ها',
    descriptionAr: 'بيع المنتجات وإدارة القوائم',
    icon: Package,
    color: 'from-orange-500 to-red-500',
    articles: 20,
  },
  {
    id: 'payment',
    title: 'Payment & Billing',
    titleFa: 'پرداخت و صورتحساب',
    titleAr: 'الدفع والفواتير',
    description: 'Payment methods and billing',
    descriptionFa: 'روش‌های پرداخت و صورتحساب',
    descriptionAr: 'طرق الدفع والفواتير',
    icon: CreditCard,
    color: 'from-yellow-500 to-amber-500',
    articles: 10,
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    titleFa: 'امنیت و حریم خصوصی',
    titleAr: 'الأمان والخصوصية',
    description: 'Keep your account secure',
    descriptionFa: 'حفظ امنیت حساب کاربری',
    descriptionAr: 'حماية حسابك',
    icon: Shield,
    color: 'from-indigo-500 to-blue-500',
    articles: 6,
  },
];

const mockFAQs: FAQ[] = [
  {
    id: 1,
    question: 'How do I create an account?',
    questionFa: 'چگونه حساب کاربری ایجاد کنم؟',
    questionAr: 'كيف أنشئ حساباً؟',
    answer: 'To create an account, click on the "Register" button in the top right corner. Fill in your basic information, verify your email, and complete your profile. You can choose to register as a Buyer, Supplier, or both.',
    answerFa: 'برای ایجاد حساب کاربری، روی دکمه "ثبت‌نام" در گوشه بالا راست کلیک کنید. اطلاعات اولیه خود را وارد کنید، ایمیل خود را تأیید کنید و پروفایل خود را تکمیل کنید. می‌توانید به عنوان خریدار، تأمین‌کننده یا هر دو ثبت‌نام کنید.',
    answerAr: 'لإنشاء حساب، انقر فوق زر "التسجيل" في الزاوية اليمنى العلوية. املأ معلوماتك الأساسية، وتحقق من بريدك الإلكتروني، وأكمل ملفك الشخصي. يمكنك التسجيل كمشتري أو مورد أو كليهما.',
    category: 'getting-started',
    popular: true,
  },
  {
    id: 2,
    question: 'How do I verify my supplier account?',
    questionFa: 'چگونه حساب تأمین‌کننده خود را تأیید کنم؟',
    questionAr: 'كيف أتحقق من حساب المورد؟',
    answer: 'To verify your supplier account, go to your dashboard and click on "Verification". You\'ll need to submit identity documents, business license, and verify your contact information. The verification process usually takes 2-3 business days.',
    answerFa: 'برای تأیید حساب تأمین‌کننده، به داشبورد خود بروید و روی "تأیید هویت" کلیک کنید. باید مدارک هویتی، مجوز کسب‌وکار و اطلاعات تماس خود را ارسال کنید. فرآیند تأیید معمولاً 2-3 روز کاری طول می‌کشد.',
    answerAr: 'للتحقق من حساب المورد، انتقل إلى لوحة التحكم وانقر فوق "التحقق". ستحتاج إلى تقديم مستندات الهوية وترخيص الأعمال والتحقق من معلومات الاتصال الخاصة بك. تستغرق عملية التحقق عادة 2-3 أيام عمل.',
    category: 'selling',
    popular: true,
  },
  {
    id: 3,
    question: 'What payment methods are accepted?',
    questionFa: 'چه روش‌های پرداختی پذیرفته می‌شود؟',
    questionAr: 'ما هي طرق الدفع المقبولة؟',
    answer: 'We accept various payment methods including credit cards, bank transfers, and our secure Escrow system. We also support international payment methods for cross-border transactions.',
    answerFa: 'ما روش‌های پرداخت مختلفی از جمله کارت‌های اعتباری، انتقال بانکی و سیستم Escrow امن خود را می‌پذیریم. همچنین از روش‌های پرداخت بین‌المللی برای معاملات فرامرزی پشتیبانی می‌کنیم.',
    answerAr: 'نقبل طرق دفع مختلفة بما في ذلك بطاقات الائتمان والتحويلات المصرفية ونظام الضمان الآمن الخاص بنا. ندعم أيضًا طرق الدفع الدولية للمعاملات عبر الحدود.',
    category: 'payment',
    popular: true,
  },
  {
    id: 4,
    question: 'How do I request a quote?',
    questionFa: 'چگونه استعلام قیمت درخواست کنم؟',
    questionAr: 'كيف أطلب عرض سعر؟',
    answer: 'You can request a quote by clicking the "Request Quote" button on any product page. Fill in the required information including quantity, specifications, and delivery requirements. Suppliers will respond with their quotes within 24-48 hours.',
    answerFa: 'می‌توانید با کلیک روی دکمه "درخواست استعلام قیمت" در صفحه هر محصول، استعلام قیمت درخواست کنید. اطلاعات مورد نیاز از جمله تعداد، مشخصات و نیازمندی‌های تحویل را وارد کنید. تأمین‌کنندگان ظرف 24-48 ساعت پاسخ خواهند داد.',
    answerAr: 'يمكنك طلب عرض سعر بالنقر فوق زر "طلب عرض سعر" في صفحة أي منتج. املأ المعلومات المطلوبة بما في ذلك الكمية والمواصفات ومتطلبات التسليم. سيرد الموردون بعروضهم في غضون 24-48 ساعة.',
    category: 'buying',
    popular: true,
  },
  {
    id: 5,
    question: 'What is MOQ?',
    questionFa: 'MOQ چیست؟',
    questionAr: 'ما هو MOQ؟',
    answer: 'MOQ stands for Minimum Order Quantity. It\'s the smallest number of units a supplier is willing to sell in a single order. MOQ helps suppliers maintain profitability and efficiency in production.',
    answerFa: 'MOQ مخفف Minimum Order Quantity (حداقل تعداد سفارش) است. این کمترین تعداد واحد است که یک تأمین‌کننده مایل به فروش در یک سفارش است. MOQ به تأمین‌کنندگان کمک می‌کند تا سودآوری و کارایی در تولید را حفظ کنند.',
    answerAr: 'MOQ تعني الحد الأدنى لكمية الطلب. إنه أصغر عدد من الوحدات التي يرغب المورد في بيعها في طلب واحد. يساعد MOQ الموردين في الحفاظ على الربحية والكفاءة في الإنتاج.',
    category: 'buying',
  },
  {
    id: 6,
    question: 'How do I add products to my store?',
    questionFa: 'چگونه محصولات را به فروشگاه خود اضافه کنم؟',
    questionAr: 'كيف أضيف المنتجات إلى متجري؟',
    answer: 'Go to your supplier dashboard and click "Add Product". Fill in product details including name, description, images, pricing, MOQ, and specifications. Once submitted, your products will be reviewed and published.',
    answerFa: 'به داشبورد تأمین‌کننده خود بروید و روی "افزودن محصول" کلیک کنید. جزئیات محصول از جمله نام، توضیحات، تصاویر، قیمت، MOQ و مشخصات را وارد کنید. پس از ارسال، محصولات شما بررسی و منتشر می‌شوند.',
    answerAr: 'انتقل إلى لوحة تحكم المورد وانقر فوق "إضافة منتج". املأ تفاصيل المنتج بما في ذلك الاسم والوصف والصور والأسعار وMOQ والمواصفات. بمجرد الإرسال، سيتم مراجعة منتجاتك ونشرها.',
    category: 'selling',
  },
  {
    id: 7,
    question: 'Is my payment information secure?',
    questionFa: 'آیا اطلاعات پرداخت من امن است؟',
    questionAr: 'هل معلومات الدفع الخاصة بي آمنة؟',
    answer: 'Yes, we use industry-standard encryption and secure payment processing. We also offer Escrow services that hold funds until order completion, providing additional security for both buyers and suppliers.',
    answerFa: 'بله، ما از رمزگذاری استاندارد صنعتی و پردازش پرداخت امن استفاده می‌کنیم. همچنین خدمات Escrow ارائه می‌دهیم که وجوه را تا تکمیل سفارش نگه می‌دارد و امنیت بیشتری برای خریداران و تأمین‌کنندگان فراهم می‌کند.',
    answerAr: 'نعم، نستخدم التشفير القياسي في الصناعة ومعالجة الدفع الآمنة. نقدم أيضًا خدمات الضمان التي تحتفظ بالأموال حتى اكتمال الطلب، مما يوفر أمانًا إضافيًا للمشترين والموردين.',
    category: 'security',
    popular: true,
  },
  {
    id: 8,
    question: 'How do I track my order?',
    questionFa: 'چگونه سفارش خود را پیگیری کنم؟',
    questionAr: 'كيف أتتبع طلبي؟',
    answer: 'You can track your order by going to "My Orders" in your dashboard. Click on the order you want to track to see detailed status updates, shipping information, and estimated delivery date.',
    answerFa: 'می‌توانید با رفتن به "سفارش‌های من" در داشبورد خود، سفارش خود را پیگیری کنید. روی سفارشی که می‌خواهید پیگیری کنید کلیک کنید تا به‌روزرسانی‌های وضعیت، اطلاعات ارسال و تاریخ تحویل تخمینی را ببینید.',
    answerAr: 'يمكنك تتبع طلبك بالانتقال إلى "طلباتي" في لوحة التحكم. انقر فوق الطلب الذي تريد تتبعه لرؤية تحديثات الحالة التفصيلية ومعلومات الشحن وتاريخ التسليم المقدر.',
    category: 'buying',
  },
  {
    id: 9,
    question: 'Can I cancel an order?',
    questionFa: 'آیا می‌توانم سفارش را لغو کنم؟',
    questionAr: 'هل يمكنني إلغاء طلب؟',
    answer: 'Yes, you can cancel an order if it hasn\'t been shipped yet. Go to "My Orders", select the order, and click "Cancel Order". If the order has already been shipped, you may need to contact the supplier directly.',
    answerFa: 'بله، می‌توانید سفارش را لغو کنید اگر هنوز ارسال نشده باشد. به "سفارش‌های من" بروید، سفارش را انتخاب کنید و روی "لغو سفارش" کلیک کنید. اگر سفارش قبلاً ارسال شده باشد، ممکن است نیاز باشد مستقیماً با تأمین‌کننده تماس بگیرید.',
    answerAr: 'نعم، يمكنك إلغاء طلب إذا لم يتم شحنه بعد. انتقل إلى "طلباتي"، وحدد الطلب، وانقر فوق "إلغاء الطلب". إذا تم شحن الطلب بالفعل، قد تحتاج إلى الاتصال بالمورد مباشرة.',
    category: 'buying',
  },
  {
    id: 10,
    question: 'How do I contact support?',
    questionFa: 'چگونه با پشتیبانی تماس بگیرم؟',
    questionAr: 'كيف أتصل بالدعم؟',
    answer: 'You can contact our support team through the "Contact Us" page, email us at support@aslmarket.com, or use the live chat feature available in your dashboard. We\'re available 24/7 to assist you.',
    answerFa: 'می‌توانید از طریق صفحه "تماس با ما"، ایمیل به support@aslmarket.com یا استفاده از ویژگی چت زنده موجود در داشبورد خود با تیم پشتیبانی ما تماس بگیرید. ما 24/7 در دسترس هستیم تا به شما کمک کنیم.',
    answerAr: 'يمكنك الاتصال بفريق الدعم من خلال صفحة "اتصل بنا" أو إرسال بريد إلكتروني إلى support@aslmarket.com أو استخدام ميزة الدردشة المباشرة المتاحة في لوحة التحكم. نحن متاحون على مدار الساعة لمساعدتك.',
    category: 'getting-started',
    popular: true,
  },
];

const HelpCenter: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredFAQs, setFilteredFAQs] = useState<FAQ[]>(mockFAQs);

  // Filter FAQs
  React.useEffect(() => {
    let filtered = [...mockFAQs];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(faq =>
        (language === 'fa' ? faq.questionFa : language === 'ar' ? faq.questionAr : faq.question)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (language === 'fa' ? faq.answerFa : language === 'ar' ? faq.answerAr : faq.answer)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    setFilteredFAQs(filtered);
  }, [searchQuery, selectedCategory, language]);

  const getCategoryTitle = (category: HelpCategory) => {
    if (language === 'fa') return category.titleFa;
    if (language === 'ar') return category.titleAr;
    return category.title;
  };

  const getCategoryDescription = (category: HelpCategory) => {
    if (language === 'fa') return category.descriptionFa;
    if (language === 'ar') return category.descriptionAr;
    return category.description;
  };

  const getFAQQuestion = (faq: FAQ) => {
    if (language === 'fa') return faq.questionFa;
    if (language === 'ar') return faq.questionAr;
    return faq.question;
  };

  const getFAQAnswer = (faq: FAQ) => {
    if (language === 'fa') return faq.answerFa;
    if (language === 'ar') return faq.answerAr;
    return faq.answer;
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all';

  const popularFAQs = mockFAQs.filter(faq => faq.popular);

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
              <HelpCircle className="h-5 w-5 text-primary" />
              <span className="text-primary font-bold">
                {language === 'fa' ? 'مرکز راهنما' : language === 'ar' ? 'مركز المساعدة' : 'Help Center'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block text-foreground">
                {language === 'fa' ? 'چگونه می‌توانیم کمک کنیم؟' : language === 'ar' ? 'كيف يمكننا المساعدة؟' : 'How Can We Help?'}
              </span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'پاسخ سوالات شما اینجاست' : language === 'ar' ? 'إجابات أسئلتك هنا' : 'Find Answers Here'}
              </span>
            </h1>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'fa' ? 'جستجوی راهنما...' : language === 'ar' ? 'البحث في المساعدة...' : 'Search for help...'}
                  className="w-full ps-12 pe-4 h-14 rounded-2xl text-lg shadow-xl"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute end-2 top-1/2 -translate-y-1/2 h-10 w-10"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {language === 'fa' ? 'دسته‌بندی‌های راهنما' : language === 'ar' ? 'فئات المساعدة' : 'Help Categories'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {language === 'fa'
                ? 'موضوع مورد نظر خود را انتخاب کنید'
                : language === 'ar'
                ? 'اختر الموضوع الذي تهتم به'
                : 'Choose a topic you need help with'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category) => (
              <Card
                key={category.id}
                className="p-6 hover:shadow-xl transition-all border-2 border-border hover:border-primary/50 cursor-pointer group"
                onClick={() => {
                  setSelectedCategory(category.id);
                  // Scroll to FAQs section
                  setTimeout(() => {
                    document.getElementById('faqs-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                <div className={cn(
                  "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
                  category.color
                )}>
                  <category.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {getCategoryTitle(category)}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {getCategoryDescription(category)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {category.articles} {language === 'fa' ? 'مقاله' : language === 'ar' ? 'مقالة' : 'articles'}
                  </span>
                  <ChevronRight className={cn("h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors", dir === 'rtl' && "rotate-180")} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular FAQs */}
      {popularFAQs.length > 0 && !hasActiveFilters && (
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                {language === 'fa' ? 'سوالات متداول' : language === 'ar' ? 'الأسئلة الشائعة' : 'Popular Questions'}
              </h2>
              <p className="text-xl text-muted-foreground">
                {language === 'fa'
                  ? 'سوالات پرتکرار کاربران'
                  : language === 'ar'
                  ? 'الأسئلة الأكثر شيوعاً'
                  : 'Most frequently asked questions'}
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {popularFAQs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={`faq-${faq.id}`}
                    className="bg-card border-2 border-border rounded-xl px-6"
                  >
                    <AccordionTrigger className="text-start hover:no-underline py-4">
                      <div className="flex items-start gap-3 flex-1">
                        <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="font-semibold text-foreground">
                          {getFAQQuestion(faq)}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 ps-8">
                      <p className="text-muted-foreground leading-relaxed">
                        {getFAQAnswer(faq)}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* All FAQs Section */}
      <section id="faqs-section" className="py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
                {language === 'fa' ? 'همه سوالات' : language === 'ar' ? 'جميع الأسئلة' : 'All Questions'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'fa'
                  ? `${filteredFAQs.length} سوال پیدا شد`
                  : language === 'ar'
                  ? `تم العثور على ${filteredFAQs.length} سؤال`
                  : `${filteredFAQs.length} questions found`}
              </p>
            </div>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="gap-2">
                <X className="h-4 w-4" />
                {language === 'fa' ? 'پاک کردن فیلترها' : language === 'ar' ? 'مسح المرشحات' : 'Clear Filters'}
              </Button>
            )}
          </div>

          {filteredFAQs.length === 0 ? (
            <Card className="p-12 text-center">
              <HelpCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-bold mb-2">
                {language === 'fa' ? 'سوالی یافت نشد' : language === 'ar' ? 'لم يتم العثور على سؤال' : 'No Questions Found'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {language === 'fa'
                  ? 'لطفاً فیلترها را تغییر دهید یا کلمه جستجوی دیگری را امتحان کنید'
                  : language === 'ar'
                  ? 'يرجى تغيير المرشحات أو تجربة كلمة بحث أخرى'
                  : 'Please try changing filters or search with different keywords'}
              </p>
              <Button variant="outline" onClick={clearFilters}>
                {language === 'fa' ? 'پاک کردن فیلترها' : language === 'ar' ? 'مسح المرشحات' : 'Clear Filters'}
              </Button>
            </Card>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={`faq-${faq.id}`}
                  className="bg-card border-2 border-border rounded-xl px-6 hover:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-start hover:no-underline py-4">
                    <div className="flex items-start gap-3 flex-1">
                      <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div className="flex-1 text-start">
                        <span className="font-semibold text-foreground block">
                          {getFAQQuestion(faq)}
                        </span>
                        {faq.popular && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {language === 'fa' ? 'محبوب' : language === 'ar' ? 'شائع' : 'Popular'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 ps-8">
                    <p className="text-muted-foreground leading-relaxed">
                      {getFAQAnswer(faq)}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                  {language === 'fa' ? 'هنوز پاسخ خود را پیدا نکردید؟' : language === 'ar' ? 'لم تجد إجابتك بعد؟' : 'Still Can\'t Find Your Answer?'}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {language === 'fa'
                    ? 'تیم پشتیبانی ما 24/7 آماده کمک به شما است'
                    : language === 'ar'
                    ? 'فريق الدعم لدينا متاح على مدار الساعة لمساعدتك'
                    : 'Our support team is available 24/7 to help you'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="btn-gradient-primary rounded-xl px-8 py-6 font-semibold"
                  onClick={() => navigate('/contact')}
                >
                  <Mail className="me-2 h-5 w-5" />
                  {language === 'fa' ? 'تماس با پشتیبانی' : language === 'ar' ? 'اتصل بالدعم' : 'Contact Support'}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl px-8 py-6 font-semibold"
                  onClick={() => navigate('/contact')}
                >
                  <Phone className="me-2 h-5 w-5" />
                  {language === 'fa' ? 'تماس تلفنی' : language === 'ar' ? 'اتصال هاتفي' : 'Call Us'}
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

export default HelpCenter;

