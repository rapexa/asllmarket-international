export type Language = 'en' | 'fa' | 'ar';

export const languages: Record<Language, { name: string; dir: 'ltr' | 'rtl'; flag: string }> = {
  en: { name: 'English', dir: 'ltr', flag: '🇺🇸' },
  fa: { name: 'فارسی', dir: 'rtl', flag: '🇮🇷' },
  ar: { name: 'العربية', dir: 'rtl', flag: '🇸🇦' },
};

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.categories': 'Categories',
    'nav.suppliers': 'Suppliers',
    'nav.products': 'Products',
    'nav.deals': 'Deals',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.search': 'Search products, suppliers...',
    
    // Hero
    'hero.title': 'Global B2B Marketplace',
    'hero.subtitle': 'Connect with verified suppliers worldwide',
    'hero.cta.explore': 'Explore Products',
    'hero.cta.supplier': 'Become a Supplier',
    'hero.campaign.title': 'New Year Mega Sale',
    'hero.campaign.subtitle': 'Up to 40% off on bulk orders',
    'hero.countdown.days': 'Days',
    'hero.countdown.hours': 'Hours',
    'hero.countdown.minutes': 'Minutes',
    'hero.countdown.seconds': 'Seconds',
    
    // Categories
    'categories.title': 'Featured Categories',
    'categories.subtitle': 'Explore our wide range of products',
    'categories.viewAll': 'View All',
    
    // Products
    'products.title': 'Featured Products',
    'products.subtitle': 'Discover verified products from trusted suppliers',
    'products.viewMore': 'View More Products',
    'products.moq': 'MOQ',
    'products.verified': 'Verified',
    'products.hot': 'Hot Deal',
    'products.new': 'New',
    
    // Special Offers
    'offers.title': 'Special Offers',
    'offers.subtitle': "Don't miss out on these amazing deals",
    'offers.discount': 'OFF',
    
    // Trust Section
    'trust.title': 'Why Choose ASL Market',
    'trust.subtitle': 'Your trusted partner for international trade',
    'trust.verified.title': 'Verified Suppliers',
    'trust.verified.desc': 'All suppliers are thoroughly verified',
    'trust.secure.title': 'Secure Transactions',
    'trust.secure.desc': 'Safe and protected payments',
    'trust.support.title': '24/7 Support',
    'trust.support.desc': 'Round-the-clock customer service',
    'trust.global.title': 'Global Network',
    'trust.global.desc': 'Connect with suppliers worldwide',
    
    // CTA
    'cta.buyer.title': 'Looking for Products?',
    'cta.buyer.desc': 'Submit your requirements and get quotes from verified suppliers',
    'cta.buyer.btn': 'Post Your Request',
    'cta.supplier.title': 'Are You a Supplier?',
    'cta.supplier.desc': 'Join our network and reach millions of buyers worldwide',
    'cta.supplier.btn': 'Start Selling',
    
    // Footer
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.help': 'Help Center',
    'footer.copyright': '© 2024 ASL Market. All rights reserved.',
    'footer.tagline': 'Your Global B2B Marketplace',
  },
  fa: {
    // Header
    'nav.home': 'خانه',
    'nav.categories': 'دسته‌بندی‌ها',
    'nav.suppliers': 'تأمین‌کنندگان',
    'nav.products': 'محصولات',
    'nav.deals': 'پیشنهادات',
    'nav.login': 'ورود',
    'nav.register': 'ثبت‌نام',
    'nav.search': 'جستجوی محصولات، تأمین‌کنندگان...',
    
    // Hero
    'hero.title': 'بازار B2B بین‌المللی',
    'hero.subtitle': 'اتصال به تأمین‌کنندگان تایید شده در سراسر جهان',
    'hero.cta.explore': 'کاوش محصولات',
    'hero.cta.supplier': 'تأمین‌کننده شوید',
    'hero.campaign.title': 'فروش بزرگ سال نو',
    'hero.campaign.subtitle': 'تا ۴۰٪ تخفیف روی سفارشات عمده',
    'hero.countdown.days': 'روز',
    'hero.countdown.hours': 'ساعت',
    'hero.countdown.minutes': 'دقیقه',
    'hero.countdown.seconds': 'ثانیه',
    
    // Categories
    'categories.title': 'دسته‌بندی‌های ویژه',
    'categories.subtitle': 'طیف گسترده‌ای از محصولات را کاوش کنید',
    'categories.viewAll': 'مشاهده همه',
    
    // Products
    'products.title': 'محصولات ویژه',
    'products.subtitle': 'محصولات تایید شده از تأمین‌کنندگان معتبر را کشف کنید',
    'products.viewMore': 'مشاهده محصولات بیشتر',
    'products.moq': 'حداقل سفارش',
    'products.verified': 'تایید شده',
    'products.hot': 'پیشنهاد ویژه',
    'products.new': 'جدید',
    
    // Special Offers
    'offers.title': 'پیشنهادات ویژه',
    'offers.subtitle': 'این معاملات شگفت‌انگیز را از دست ندهید',
    'offers.discount': 'تخفیف',
    
    // Trust Section
    'trust.title': 'چرا ASL Market را انتخاب کنید',
    'trust.subtitle': 'شریک مورد اعتماد شما برای تجارت بین‌المللی',
    'trust.verified.title': 'تأمین‌کنندگان تایید شده',
    'trust.verified.desc': 'همه تأمین‌کنندگان به طور کامل تایید شده‌اند',
    'trust.secure.title': 'تراکنش‌های امن',
    'trust.secure.desc': 'پرداخت‌های امن و محافظت شده',
    'trust.support.title': 'پشتیبانی ۲۴/۷',
    'trust.support.desc': 'خدمات مشتری شبانه‌روزی',
    'trust.global.title': 'شبکه جهانی',
    'trust.global.desc': 'اتصال به تأمین‌کنندگان در سراسر جهان',
    
    // CTA
    'cta.buyer.title': 'به دنبال محصول هستید؟',
    'cta.buyer.desc': 'نیازهای خود را ثبت کنید و از تأمین‌کنندگان تایید شده قیمت بگیرید',
    'cta.buyer.btn': 'ثبت درخواست',
    'cta.supplier.title': 'تأمین‌کننده هستید؟',
    'cta.supplier.desc': 'به شبکه ما بپیوندید و به میلیون‌ها خریدار در سراسر جهان دسترسی پیدا کنید',
    'cta.supplier.btn': 'شروع فروش',
    
    // Footer
    'footer.about': 'درباره ما',
    'footer.contact': 'تماس با ما',
    'footer.terms': 'شرایط خدمات',
    'footer.privacy': 'حریم خصوصی',
    'footer.help': 'مرکز راهنما',
    'footer.copyright': '© ۲۰۲۴ ASL Market. تمامی حقوق محفوظ است.',
    'footer.tagline': 'بازار B2B جهانی شما',
  },
  ar: {
    // Header
    'nav.home': 'الرئيسية',
    'nav.categories': 'الفئات',
    'nav.suppliers': 'الموردون',
    'nav.products': 'المنتجات',
    'nav.deals': 'العروض',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'إنشاء حساب',
    'nav.search': 'البحث عن المنتجات والموردين...',
    
    // Hero
    'hero.title': 'سوق B2B العالمي',
    'hero.subtitle': 'تواصل مع الموردين المعتمدين في جميع أنحاء العالم',
    'hero.cta.explore': 'استكشاف المنتجات',
    'hero.cta.supplier': 'كن مورداً',
    'hero.campaign.title': 'تخفيضات السنة الجديدة الكبرى',
    'hero.campaign.subtitle': 'خصم يصل إلى 40٪ على الطلبات بالجملة',
    'hero.countdown.days': 'أيام',
    'hero.countdown.hours': 'ساعات',
    'hero.countdown.minutes': 'دقائق',
    'hero.countdown.seconds': 'ثواني',
    
    // Categories
    'categories.title': 'الفئات المميزة',
    'categories.subtitle': 'استكشف مجموعتنا الواسعة من المنتجات',
    'categories.viewAll': 'عرض الكل',
    
    // Products
    'products.title': 'منتجات مميزة',
    'products.subtitle': 'اكتشف منتجات معتمدة من موردين موثوقين',
    'products.viewMore': 'عرض المزيد',
    'products.moq': 'الحد الأدنى للطلب',
    'products.verified': 'معتمد',
    'products.hot': 'عرض ساخن',
    'products.new': 'جديد',
    
    // Special Offers
    'offers.title': 'عروض خاصة',
    'offers.subtitle': 'لا تفوت هذه الصفقات المذهلة',
    'offers.discount': 'خصم',
    
    // Trust Section
    'trust.title': 'لماذا تختار ASL Market',
    'trust.subtitle': 'شريكك الموثوق للتجارة الدولية',
    'trust.verified.title': 'موردون معتمدون',
    'trust.verified.desc': 'جميع الموردين تم التحقق منهم بدقة',
    'trust.secure.title': 'معاملات آمنة',
    'trust.secure.desc': 'مدفوعات آمنة ومحمية',
    'trust.support.title': 'دعم على مدار الساعة',
    'trust.support.desc': 'خدمة عملاء على مدار الساعة',
    'trust.global.title': 'شبكة عالمية',
    'trust.global.desc': 'تواصل مع الموردين في جميع أنحاء العالم',
    
    // CTA
    'cta.buyer.title': 'تبحث عن منتجات؟',
    'cta.buyer.desc': 'قدم متطلباتك واحصل على عروض أسعار من موردين معتمدين',
    'cta.buyer.btn': 'أرسل طلبك',
    'cta.supplier.title': 'هل أنت مورد؟',
    'cta.supplier.desc': 'انضم إلى شبكتنا وتواصل مع ملايين المشترين حول العالم',
    'cta.supplier.btn': 'ابدأ البيع',
    
    // Footer
    'footer.about': 'عنا',
    'footer.contact': 'اتصل بنا',
    'footer.terms': 'شروط الخدمة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.help': 'مركز المساعدة',
    'footer.copyright': '© 2024 ASL Market. جميع الحقوق محفوظة.',
    'footer.tagline': 'سوق B2B العالمي الخاص بك',
  },
};

export const useTranslation = (lang: Language) => {
  const t = (key: string): string => {
    return translations[lang][key] || key;
  };
  
  return { t, dir: languages[lang].dir };
};
