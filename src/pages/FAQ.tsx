import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  Search,
  MessageSquare,
  Mail,
  Phone,
  ArrowRight,
  ChevronRight,
  Sparkles,
  X,
  BookOpen,
  ShoppingCart,
  User,
  Building2,
  CreditCard,
  Shield,
  Package,
  Globe
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
  questionFa: string;
  questionAr: string;
  answer: string;
  answerFa: string;
  answerAr: string;
  category: string;
  popular?: boolean;
}

const faqCategories = [
  { id: 'all', label: 'All', labelFa: 'همه', labelAr: 'الكل', icon: HelpCircle },
  { id: 'getting-started', label: 'Getting Started', labelFa: 'شروع کار', labelAr: 'البدء', icon: BookOpen },
  { id: 'account', label: 'Account', labelFa: 'حساب کاربری', labelAr: 'الحساب', icon: User },
  { id: 'buying', label: 'Buying', labelFa: 'خرید', labelAr: 'الشراء', icon: ShoppingCart },
  { id: 'selling', label: 'Selling', labelFa: 'فروش', labelAr: 'البيع', icon: Package },
  { id: 'payment', label: 'Payment', labelFa: 'پرداخت', labelAr: 'الدفع', icon: CreditCard },
  { id: 'security', label: 'Security', labelFa: 'امنیت', labelAr: 'الأمان', icon: Shield },
];

const mockFAQs: FAQ[] = [
  {
    id: 1,
    question: 'How do I create an account on ASL Market?',
    questionFa: 'چگونه در ASL Market حساب کاربری ایجاد کنم؟',
    questionAr: 'كيف أنشئ حساباً على ASL Market؟',
    answer: 'Creating an account is easy! Click on the "Register" button in the top right corner, fill in your basic information (name, email, password), verify your email address, and complete your profile. You can choose to register as a Buyer, Supplier, or both.',
    answerFa: 'ایجاد حساب کاربری آسان است! روی دکمه "ثبت‌نام" در گوشه بالا راست کلیک کنید، اطلاعات اولیه خود را وارد کنید (نام، ایمیل، رمز عبور)، ایمیل خود را تأیید کنید و پروفایل خود را تکمیل کنید. می‌توانید به عنوان خریدار، تأمین‌کننده یا هر دو ثبت‌نام کنید.',
    answerAr: 'إنشاء حساب سهل! انقر فوق زر "التسجيل" في الزاوية اليمنى العلوية، واملأ معلوماتك الأساسية (الاسم والبريد الإلكتروني وكلمة المرور)، وتحقق من بريدك الإلكتروني، وأكمل ملفك الشخصي. يمكنك التسجيل كمشتري أو مورد أو كليهما.',
    category: 'getting-started',
    popular: true,
  },
  {
    id: 2,
    question: 'What is the difference between a Buyer and Supplier account?',
    questionFa: 'تفاوت حساب خریدار و تأمین‌کننده چیست؟',
    questionAr: 'ما الفرق بين حساب المشتري والمورد؟',
    answer: 'A Buyer account allows you to browse products, request quotes, place orders, and manage purchases. A Supplier account enables you to list products, receive quote requests, manage inventory, and fulfill orders. You can also have both roles in a single account.',
    answerFa: 'حساب خریدار به شما امکان می‌دهد محصولات را مرور کنید، استعلام قیمت درخواست کنید، سفارش دهید و خریدها را مدیریت کنید. حساب تأمین‌کننده به شما امکان می‌دهد محصولات را لیست کنید، درخواست‌های استعلام قیمت دریافت کنید، موجودی را مدیریت کنید و سفارش‌ها را تکمیل کنید. همچنین می‌توانید هر دو نقش را در یک حساب داشته باشید.',
    answerAr: 'يسمح حساب المشتري لك بتصفح المنتجات وطلب عروض الأسعار ووضع الطلبات وإدارة المشتريات. يتيح حساب المورد لك بإدراج المنتجات وتلقي طلبات عروض الأسعار وإدارة المخزون وتنفيذ الطلبات. يمكنك أيضًا الحصول على كلا الدورين في حساب واحد.',
    category: 'account',
    popular: true,
  },
  {
    id: 3,
    question: 'How do I search for products?',
    questionFa: 'چگونه محصولات را جستجو کنم؟',
    questionAr: 'كيف أبحث عن المنتجات؟',
    answer: 'You can search for products using the search bar at the top of any page. Enter keywords, product names, or categories. You can also use advanced filters to narrow down results by price, location, MOQ, supplier verification status, and more.',
    answerFa: 'می‌توانید با استفاده از نوار جستجو در بالای هر صفحه، محصولات را جستجو کنید. کلمات کلیدی، نام محصولات یا دسته‌بندی‌ها را وارد کنید. همچنین می‌توانید از فیلترهای پیشرفته برای محدود کردن نتایج بر اساس قیمت، موقعیت، MOQ، وضعیت تأیید تأمین‌کننده و موارد دیگر استفاده کنید.',
    answerAr: 'يمكنك البحث عن المنتجات باستخدام شريط البحث في أعلى أي صفحة. أدخل الكلمات الرئيسية أو أسماء المنتجات أو الفئات. يمكنك أيضًا استخدام المرشحات المتقدمة لتضييق النتائج حسب السعر والموقع وMOQ وحالة التحقق من المورد والمزيد.',
    category: 'buying',
    popular: true,
  },
  {
    id: 4,
    question: 'How do I request a quote?',
    questionFa: 'چگونه استعلام قیمت درخواست کنم؟',
    questionAr: 'كيف أطلب عرض سعر؟',
    answer: 'To request a quote, click the "Request Quote" button on any product page. Fill in the required information including quantity, specifications, delivery location, and preferred delivery date. Suppliers will respond with their quotes within 24-48 hours.',
    answerFa: 'برای درخواست استعلام قیمت، روی دکمه "درخواست استعلام قیمت" در صفحه هر محصول کلیک کنید. اطلاعات مورد نیاز از جمله تعداد، مشخصات، آدرس تحویل و تاریخ تحویل مطلوب را وارد کنید. تأمین‌کنندگان ظرف 24-48 ساعت با پیشنهادات خود پاسخ خواهند داد.',
    answerAr: 'لطلب عرض سعر، انقر فوق زر "طلب عرض سعر" في صفحة أي منتج. املأ المعلومات المطلوبة بما في ذلك الكمية والمواصفات وموقع التسليم وتاريخ التسليم المفضل. سيرد الموردون بعروضهم في غضون 24-48 ساعة.',
    category: 'buying',
    popular: true,
  },
  {
    id: 5,
    question: 'What is MOQ and why is it important?',
    questionFa: 'MOQ چیست و چرا مهم است؟',
    questionAr: 'ما هو MOQ ولماذا هو مهم؟',
    answer: 'MOQ stands for Minimum Order Quantity. It\'s the smallest number of units a supplier is willing to sell in a single order. MOQ helps suppliers maintain profitability and efficiency in production. Different suppliers may have different MOQ requirements.',
    answerFa: 'MOQ مخفف Minimum Order Quantity (حداقل تعداد سفارش) است. این کمترین تعداد واحد است که یک تأمین‌کننده مایل به فروش در یک سفارش است. MOQ به تأمین‌کنندگان کمک می‌کند تا سودآوری و کارایی در تولید را حفظ کنند. تأمین‌کنندگان مختلف ممکن است نیازمندی‌های MOQ متفاوتی داشته باشند.',
    answerAr: 'MOQ تعني الحد الأدنى لكمية الطلب. إنه أصغر عدد من الوحدات التي يرغب المورد في بيعها في طلب واحد. يساعد MOQ الموردين في الحفاظ على الربحية والكفاءة في الإنتاج. قد يكون للموردين المختلفين متطلبات MOQ مختلفة.',
    category: 'buying',
  },
  {
    id: 6,
    question: 'How do I add products to sell?',
    questionFa: 'چگونه محصولات برای فروش اضافه کنم؟',
    questionAr: 'كيف أضيف منتجات للبيع؟',
    answer: 'As a supplier, go to your dashboard and click "Add Product". Fill in product details including name, description, images, pricing, MOQ, specifications, and shipping information. Once submitted, your products will be reviewed and published on the platform.',
    answerFa: 'به عنوان تأمین‌کننده، به داشبورد خود بروید و روی "افزودن محصول" کلیک کنید. جزئیات محصول از جمله نام، توضیحات، تصاویر، قیمت، MOQ، مشخصات و اطلاعات ارسال را وارد کنید. پس از ارسال، محصولات شما بررسی و در پلتفرم منتشر می‌شوند.',
    answerAr: 'كمورد، انتقل إلى لوحة التحكم وانقر فوق "إضافة منتج". املأ تفاصيل المنتج بما في ذلك الاسم والوصف والصور والأسعار وMOQ والمواصفات ومعلومات الشحن. بمجرد الإرسال، سيتم مراجعة منتجاتك ونشرها على المنصة.',
    category: 'selling',
    popular: true,
  },
  {
    id: 7,
    question: 'How do I verify my supplier account?',
    questionFa: 'چگونه حساب تأمین‌کننده خود را تأیید کنم؟',
    questionAr: 'كيف أتحقق من حساب المورد؟',
    answer: 'To verify your supplier account, go to your dashboard and navigate to the "Verification" section. You\'ll need to submit identity documents, business license, and verify your contact information. The verification process usually takes 2-3 business days.',
    answerFa: 'برای تأیید حساب تأمین‌کننده، به داشبورد خود بروید و به بخش "تأیید هویت" بروید. باید مدارک هویتی، مجوز کسب‌وکار و اطلاعات تماس خود را ارسال کنید. فرآیند تأیید معمولاً 2-3 روز کاری طول می‌کشد.',
    answerAr: 'للتحقق من حساب المورد، انتقل إلى لوحة التحكم وانتقل إلى قسم "التحقق". ستحتاج إلى تقديم مستندات الهوية وترخيص الأعمال والتحقق من معلومات الاتصال الخاصة بك. تستغرق عملية التحقق عادة 2-3 أيام عمل.',
    category: 'selling',
  },
  {
    id: 8,
    question: 'What payment methods are accepted?',
    questionFa: 'چه روش‌های پرداختی پذیرفته می‌شود؟',
    questionAr: 'ما هي طرق الدفع المقبولة؟',
    answer: 'We accept various payment methods including credit cards (Visa, Mastercard, American Express), bank transfers, and our secure Escrow system. We also support international payment methods for cross-border transactions. All payments are processed securely.',
    answerFa: 'ما روش‌های پرداخت مختلفی از جمله کارت‌های اعتباری (ویزا، مسترکارت، امریکن اکسپرس)، انتقال بانکی و سیستم Escrow امن خود را می‌پذیریم. همچنین از روش‌های پرداخت بین‌المللی برای معاملات فرامرزی پشتیبانی می‌کنیم. همه پرداخت‌ها به صورت امن پردازش می‌شوند.',
    answerAr: 'نقبل طرق دفع مختلفة بما في ذلك بطاقات الائتمان (Visa وMastercard وAmerican Express) والتحويلات المصرفية ونظام الضمان الآمن الخاص بنا. ندعم أيضًا طرق الدفع الدولية للمعاملات عبر الحدود. تتم معالجة جميع المدفوعات بأمان.',
    category: 'payment',
    popular: true,
  },
  {
    id: 9,
    question: 'Is my payment information secure?',
    questionFa: 'آیا اطلاعات پرداخت من امن است؟',
    questionAr: 'هل معلومات الدفع الخاصة بي آمنة؟',
    answer: 'Yes, absolutely! We use industry-standard SSL encryption and secure payment processing. We also offer Escrow services that hold funds until order completion, providing additional security for both buyers and suppliers. We never store your full payment details.',
    answerFa: 'بله، کاملاً! ما از رمزگذاری SSL استاندارد صنعتی و پردازش پرداخت امن استفاده می‌کنیم. همچنین خدمات Escrow ارائه می‌دهیم که وجوه را تا تکمیل سفارش نگه می‌دارد و امنیت بیشتری برای خریداران و تأمین‌کنندگان فراهم می‌کند. ما هرگز جزئیات کامل پرداخت شما را ذخیره نمی‌کنیم.',
    answerAr: 'نعم، بالتأكيد! نستخدم تشفير SSL القياسي في الصناعة ومعالجة الدفع الآمنة. نقدم أيضًا خدمات الضمان التي تحتفظ بالأموال حتى اكتمال الطلب، مما يوفر أمانًا إضافيًا للمشترين والموردين. لا نخزن أبدًا تفاصيل الدفع الكاملة الخاصة بك.',
    category: 'security',
    popular: true,
  },
  {
    id: 10,
    question: 'How do I track my order?',
    questionFa: 'چگونه سفارش خود را پیگیری کنم؟',
    questionAr: 'كيف أتتبع طلبي؟',
    answer: 'You can track your order by going to "My Orders" in your dashboard. Click on the order you want to track to see detailed status updates, shipping information, tracking number, and estimated delivery date. You\'ll also receive email notifications for order updates.',
    answerFa: 'می‌توانید با رفتن به "سفارش‌های من" در داشبورد خود، سفارش خود را پیگیری کنید. روی سفارشی که می‌خواهید پیگیری کنید کلیک کنید تا به‌روزرسانی‌های وضعیت، اطلاعات ارسال، شماره پیگیری و تاریخ تحویل تخمینی را ببینید. همچنین اعلان‌های ایمیل برای به‌روزرسانی‌های سفارش دریافت خواهید کرد.',
    answerAr: 'يمكنك تتبع طلبك بالانتقال إلى "طلباتي" في لوحة التحكم. انقر فوق الطلب الذي تريد تتبعه لرؤية تحديثات الحالة التفصيلية ومعلومات الشحن ورقم التتبع وتاريخ التسليم المقدر. ستتلقى أيضًا إشعارات بريد إلكتروني لتحديثات الطلب.',
    category: 'buying',
  },
  {
    id: 11,
    question: 'Can I cancel an order?',
    questionFa: 'آیا می‌توانم سفارش را لغو کنم؟',
    questionAr: 'هل يمكنني إلغاء طلب؟',
    answer: 'Yes, you can cancel an order if it hasn\'t been shipped yet. Go to "My Orders", select the order, and click "Cancel Order". If the order has already been shipped, you may need to contact the supplier directly or request a return. Refund policies vary by supplier.',
    answerFa: 'بله، می‌توانید سفارش را لغو کنید اگر هنوز ارسال نشده باشد. به "سفارش‌های من" بروید، سفارش را انتخاب کنید و روی "لغو سفارش" کلیک کنید. اگر سفارش قبلاً ارسال شده باشد، ممکن است نیاز باشد مستقیماً با تأمین‌کننده تماس بگیرید یا درخواست بازگشت دهید. سیاست‌های بازپرداخت بسته به تأمین‌کننده متفاوت است.',
    answerAr: 'نعم، يمكنك إلغاء طلب إذا لم يتم شحنه بعد. انتقل إلى "طلباتي"، وحدد الطلب، وانقر فوق "إلغاء الطلب". إذا تم شحن الطلب بالفعل، قد تحتاج إلى الاتصال بالمورد مباشرة أو طلب إرجاع. تختلف سياسات الاسترداد حسب المورد.',
    category: 'buying',
  },
  {
    id: 12,
    question: 'How do I change my account password?',
    questionFa: 'چگونه رمز عبور حساب خود را تغییر دهم؟',
    questionAr: 'كيف أغير كلمة مرور حسابي؟',
    answer: 'To change your password, go to your account settings in the dashboard. Click on "Security" or "Password", enter your current password, then enter and confirm your new password. Make sure your new password is strong and unique.',
    answerFa: 'برای تغییر رمز عبور، به تنظیمات حساب در داشبورد بروید. روی "امنیت" یا "رمز عبور" کلیک کنید، رمز عبور فعلی خود را وارد کنید، سپس رمز عبور جدید را وارد و تأیید کنید. مطمئن شوید که رمز عبور جدید شما قوی و منحصر به فرد است.',
    answerAr: 'لتغيير كلمة المرور، انتقل إلى إعدادات حسابك في لوحة التحكم. انقر فوق "الأمان" أو "كلمة المرور"، وأدخل كلمة المرور الحالية، ثم أدخل وأكد كلمة المرور الجديدة. تأكد من أن كلمة المرور الجديدة قوية وفريدة.',
    category: 'account',
  },
  {
    id: 13,
    question: 'What are the subscription plans for suppliers?',
    questionFa: 'پلن‌های اشتراک برای تأمین‌کنندگان چیست؟',
    questionAr: 'ما هي خطط الاشتراك للموردين؟',
    answer: 'We offer multiple subscription plans: Free (basic features, limited products), Silver (more products, better visibility), Gold (unlimited products, high priority, analytics), and Diamond (all Gold features plus featured placement and dedicated support). You can upgrade anytime from your dashboard.',
    answerFa: 'ما چندین پلن اشتراک ارائه می‌دهیم: رایگان (امکانات پایه، محصولات محدود)، نقره‌ای (محصولات بیشتر، دید بهتر)، طلایی (محصولات نامحدود، اولویت بالا، آنالیتیکس) و الماس (همه امکانات طلایی به علاوه نمایش ویژه و پشتیبانی اختصاصی). می‌توانید در هر زمان از داشبورد خود ارتقا دهید.',
    answerAr: 'نقدم خطط اشتراك متعددة: مجاني (ميزات أساسية، منتجات محدودة)، فضي (منتجات أكثر، رؤية أفضل)، ذهبي (منتجات غير محدودة، أولوية عالية، تحليلات)، والماس (جميع ميزات الذهبي بالإضافة إلى الوضع المميز والدعم المخصص). يمكنك الترقية في أي وقت من لوحة التحكم.',
    category: 'selling',
  },
  {
    id: 14,
    question: 'How do I contact customer support?',
    questionFa: 'چگونه با پشتیبانی مشتری تماس بگیرم؟',
    questionAr: 'كيف أتصل بدعم العملاء؟',
    answer: 'You can contact our support team through the "Contact Us" page, email us at support@aslmarket.com, use the live chat feature available in your dashboard, or call us at +1 (234) 567-890. We\'re available 24/7 to assist you.',
    answerFa: 'می‌توانید از طریق صفحه "تماس با ما"، ایمیل به support@aslmarket.com، استفاده از ویژگی چت زنده موجود در داشبورد خود یا تماس با ما در +1 (234) 567-890 با تیم پشتیبانی ما تماس بگیرید. ما 24/7 در دسترس هستیم تا به شما کمک کنیم.',
    answerAr: 'يمكنك الاتصال بفريق الدعم من خلال صفحة "اتصل بنا" أو إرسال بريد إلكتروني إلى support@aslmarket.com أو استخدام ميزة الدردشة المباشرة المتاحة في لوحة التحكم أو الاتصال بنا على +1 (234) 567-890. نحن متاحون على مدار الساعة لمساعدتك.',
    category: 'getting-started',
    popular: true,
  },
  {
    id: 15,
    question: 'How do I update my profile information?',
    questionFa: 'چگونه اطلاعات پروفایل خود را به‌روزرسانی کنم؟',
    questionAr: 'كيف أحدث معلومات ملفي الشخصي؟',
    answer: 'To update your profile, go to your dashboard and click on "Profile" or "Account Settings". You can update your personal information, company details, contact information, and preferences. Remember to save your changes.',
    answerFa: 'برای به‌روزرسانی پروفایل، به داشبورد خود بروید و روی "پروفایل" یا "تنظیمات حساب" کلیک کنید. می‌توانید اطلاعات شخصی، جزئیات شرکت، اطلاعات تماس و تنظیمات خود را به‌روزرسانی کنید. فراموش نکنید که تغییرات خود را ذخیره کنید.',
    answerAr: 'لتحديث ملفك الشخصي، انتقل إلى لوحة التحكم وانقر فوق "الملف الشخصي" أو "إعدادات الحساب". يمكنك تحديث معلوماتك الشخصية وتفاصيل الشركة ومعلومات الاتصال والتفضيلات. تذكر حفظ التغييرات.',
    category: 'account',
  },
];

const FAQ: React.FC = () => {
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
      filtered = filtered.filter(faq => {
        const question = language === 'fa' ? faq.questionFa : language === 'ar' ? faq.questionAr : faq.question;
        const answer = language === 'fa' ? faq.answerFa : language === 'ar' ? faq.answerAr : faq.answer;
        return (
          question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          answer.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    setFilteredFAQs(filtered);
  }, [searchQuery, selectedCategory, language]);

  const getQuestion = (faq: FAQ) => {
    if (language === 'fa') return faq.questionFa;
    if (language === 'ar') return faq.questionAr;
    return faq.question;
  };

  const getAnswer = (faq: FAQ) => {
    if (language === 'fa') return faq.answerFa;
    if (language === 'ar') return faq.answerAr;
    return faq.answer;
  };

  const getCategoryLabel = (category: typeof faqCategories[0]) => {
    if (language === 'fa') return category.labelFa;
    if (language === 'ar') return category.labelAr;
    return category.label;
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
                {language === 'fa' ? 'سوالات متداول' : language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block text-foreground">
                {language === 'fa' ? 'سوالات متداول' : language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
              </span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'پاسخ سوالات شما' : language === 'ar' ? 'إجابات أسئلتك' : 'Find Answers to Your Questions'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === 'fa'
                ? 'پاسخ سوالات متداول درباره استفاده از ASL Market'
                : language === 'ar'
                ? 'إجابات الأسئلة الشائعة حول استخدام ASL Market'
                : 'Answers to common questions about using ASL Market'}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto pt-4">
              <div className="relative">
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'fa' ? 'جستجوی سوالات...' : language === 'ar' ? 'البحث عن الأسئلة...' : 'Search questions...'}
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

      {/* Categories Filter */}
      <section className="py-8 bg-muted/30 border-y border-border">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all text-sm font-medium",
                    selectedCategory === category.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{getCategoryLabel(category)}</span>
                </button>
              );
            })}
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                {language === 'fa' ? 'پاک کردن' : language === 'ar' ? 'مسح' : 'Clear'}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Popular FAQs */}
      {popularFAQs.length > 0 && !hasActiveFilters && (
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-accent">
                  {language === 'fa' ? 'محبوب' : language === 'ar' ? 'شائع' : 'Popular'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                {language === 'fa' ? 'سوالات پرتکرار' : language === 'ar' ? 'الأسئلة الأكثر شيوعاً' : 'Most Popular Questions'}
              </h2>
              <p className="text-xl text-muted-foreground">
                {language === 'fa'
                  ? 'سوالاتی که بیشترین جستجو را دارند'
                  : language === 'ar'
                  ? 'الأسئلة الأكثر بحثاً'
                  : 'Questions that are searched most often'}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {popularFAQs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={`faq-${faq.id}`}
                    className="bg-card border-2 border-border rounded-xl px-6 hover:border-primary/50 transition-colors"
                  >
                    <AccordionTrigger className="text-start hover:no-underline py-4">
                      <div className="flex items-start gap-3 flex-1">
                        <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="font-semibold text-foreground text-left">
                          {getQuestion(faq)}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 ps-8">
                      <p className="text-muted-foreground leading-relaxed">
                        {getAnswer(faq)}
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
      <section className="py-20">
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
            <div className="max-w-4xl mx-auto">
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
                            {getQuestion(faq)}
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
                        {getAnswer(faq)}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
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
                  onClick={() => navigate('/help')}
                >
                  <BookOpen className="me-2 h-5 w-5" />
                  {language === 'fa' ? 'مرکز راهنما' : language === 'ar' ? 'مركز المساعدة' : 'Help Center'}
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

export default FAQ;

