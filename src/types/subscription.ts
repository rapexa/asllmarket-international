export type SubscriptionPlan = 'free' | 'silver' | 'gold' | 'diamond';
export type BillingCycle = 'monthly' | 'yearly';
export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'pending';

export interface PlanFeature {
  id: string;
  name: string;
  nameFa: string;
  nameAr: string;
  enabled: boolean;
  limit?: number | 'unlimited';
}

export interface SubscriptionPlanConfig {
  id: SubscriptionPlan;
  name: string;
  nameFa: string;
  nameAr: string;
  description: string;
  descriptionFa: string;
  descriptionAr: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  color: string;
  bgColor: string;
  borderColor: string;
  badgeColor: string;
  features: PlanFeature[];
  productLimit: number | 'unlimited';
  priority: number; // Higher = more visibility
  support: 'basic' | 'standard' | 'priority' | 'dedicated';
  analytics: boolean;
  rfqPriority: boolean;
  featuredPlacement: boolean;
  customReports: boolean;
  specialOffers: boolean;
}

export interface Subscription {
  id: string;
  supplierId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: string;
  transactionId?: string;
  invoiceUrl?: string;
  paidAt?: Date;
  createdAt: Date;
}

export const subscriptionPlans: Record<SubscriptionPlan, SubscriptionPlanConfig> = {
  free: {
    id: 'free',
    name: 'Free',
    nameFa: 'رایگان',
    nameAr: 'مجاني',
    description: 'Perfect for getting started',
    descriptionFa: 'مناسب برای شروع کار',
    descriptionAr: 'مثالي للبدء',
    monthlyPrice: 0,
    yearlyPrice: 0,
    currency: 'USD',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-300',
    badgeColor: 'bg-gray-100 text-gray-700',
    priority: 1,
    productLimit: 10,
    support: 'basic',
    analytics: false,
    rfqPriority: false,
    featuredPlacement: false,
    customReports: false,
    specialOffers: false,
    features: [
      { id: 'products', name: 'Products', nameFa: 'محصولات', nameAr: 'منتجات', enabled: true, limit: 10 },
      { id: 'basic_display', name: 'Basic Display', nameFa: 'نمایش پایه', nameAr: 'عرض أساسي', enabled: true },
      { id: 'basic_support', name: 'Basic Support', nameFa: 'پشتیبانی پایه', nameAr: 'دعم أساسي', enabled: true },
    ],
  },
  silver: {
    id: 'silver',
    name: 'Silver',
    nameFa: 'نقره‌ای',
    nameAr: 'فضي',
    description: 'For growing businesses',
    descriptionFa: 'برای کسب‌وکارهای در حال رشد',
    descriptionAr: 'للشركات الناشئة',
    monthlyPrice: 49,
    yearlyPrice: 490, // ~2 months free
    currency: 'USD',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-300',
    badgeColor: 'bg-slate-100 text-slate-700',
    priority: 2,
    productLimit: 50,
    support: 'standard',
    analytics: false,
    rfqPriority: false,
    featuredPlacement: false,
    customReports: false,
    specialOffers: false,
    features: [
      { id: 'products', name: 'Products', nameFa: 'محصولات', nameAr: 'منتجات', enabled: true, limit: 50 },
      { id: 'priority_display', name: 'Priority Display', nameFa: 'اولویت نمایش', nameAr: 'عرض ذي أولوية', enabled: true },
      { id: 'silver_badge', name: 'Silver Badge', nameFa: 'نشان نقره‌ای', nameAr: 'شارة فضية', enabled: true },
      { id: 'standard_support', name: 'Standard Support', nameFa: 'پشتیبانی استاندارد', nameAr: 'دعم معياري', enabled: true },
    ],
  },
  gold: {
    id: 'gold',
    name: 'Gold',
    nameFa: 'طلایی',
    nameAr: 'ذهبي',
    description: 'For established suppliers',
    descriptionFa: 'برای تأمین‌کنندگان تأسیس شده',
    descriptionAr: 'للموردين المؤسسين',
    monthlyPrice: 149,
    yearlyPrice: 1490, // ~2 months free
    currency: 'USD',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    badgeColor: 'bg-amber-100 text-amber-700',
    priority: 3,
    productLimit: 'unlimited',
    support: 'priority',
    analytics: true,
    rfqPriority: true,
    featuredPlacement: false,
    customReports: false,
    specialOffers: true,
    features: [
      { id: 'products', name: 'Unlimited Products', nameFa: 'محصولات نامحدود', nameAr: 'منتجات غير محدودة', enabled: true, limit: 'unlimited' },
      { id: 'high_priority', name: 'High Priority Display', nameFa: 'اولویت بالا در نمایش', nameAr: 'عرض ذو أولوية عالية', enabled: true },
      { id: 'gold_badge', name: 'Gold Badge', nameFa: 'نشان طلایی', nameAr: 'شارة ذهبية', enabled: true },
      { id: 'analytics', name: 'Advanced Analytics', nameFa: 'آنالیتیکس پیشرفته', nameAr: 'تحليلات متقدمة', enabled: true },
      { id: 'rfq_priority', name: 'RFQ Priority', nameFa: 'اولویت در درخواست‌ها', nameAr: 'أولوية طلبات الأسعار', enabled: true },
      { id: 'priority_support', name: 'Priority Support', nameFa: 'پشتیبانی اولویت‌دار', nameAr: 'دعم ذو أولوية', enabled: true },
      { id: 'special_offers', name: 'Special Offers', nameFa: 'پیشنهادات ویژه', nameAr: 'عروض خاصة', enabled: true },
    ],
  },
  diamond: {
    id: 'diamond',
    name: 'Diamond',
    nameFa: 'الماس',
    nameAr: 'الماس',
    description: 'Premium for top suppliers',
    descriptionFa: 'پریمیوم برای تأمین‌کنندگان برتر',
    descriptionAr: 'مميز للموردين المتميزين',
    monthlyPrice: 299,
    yearlyPrice: 2990, // ~2 months free
    currency: 'USD',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-300',
    badgeColor: 'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800',
    priority: 4,
    productLimit: 'unlimited',
    support: 'dedicated',
    analytics: true,
    rfqPriority: true,
    featuredPlacement: true,
    customReports: true,
    specialOffers: true,
    features: [
      { id: 'products', name: 'Unlimited Products', nameFa: 'محصولات نامحدود', nameAr: 'منتجات غير محدودة', enabled: true, limit: 'unlimited' },
      { id: 'highest_priority', name: 'Highest Priority Display', nameFa: 'بالاترین اولویت نمایش', nameAr: 'أعلى أولوية في العرض', enabled: true },
      { id: 'diamond_badge', name: 'Diamond Badge', nameFa: 'نشان الماس', nameAr: 'شارة الماس', enabled: true },
      { id: 'featured', name: 'Featured Placement', nameFa: 'نمایش ویژه', nameAr: 'وضع مميز', enabled: true },
      { id: 'analytics', name: 'Advanced Analytics', nameFa: 'آنالیتیکس پیشرفته', nameAr: 'تحليلات متقدمة', enabled: true },
      { id: 'custom_reports', name: 'Custom Reports', nameFa: 'گزارش‌های سفارشی', nameAr: 'تقارير مخصصة', enabled: true },
      { id: 'rfq_priority', name: 'RFQ Priority', nameFa: 'اولویت در درخواست‌ها', nameAr: 'أولوية طلبات الأسعار', enabled: true },
      { id: 'dedicated_support', name: 'Dedicated Support', nameFa: 'پشتیبانی اختصاصی', nameAr: 'دعم مخصص', enabled: true },
      { id: 'special_offers', name: 'Special Offers', nameFa: 'پیشنهادات ویژه', nameAr: 'عروض خاصة', enabled: true },
    ],
  },
};

export const getPlanName = (plan: SubscriptionPlan, language: 'en' | 'fa' | 'ar'): string => {
  const config = subscriptionPlans[plan];
  if (language === 'fa') return config.nameFa;
  if (language === 'ar') return config.nameAr;
  return config.name;
};

export const getPlanDescription = (plan: SubscriptionPlan, language: 'en' | 'fa' | 'ar'): string => {
  const config = subscriptionPlans[plan];
  if (language === 'fa') return config.descriptionFa;
  if (language === 'ar') return config.descriptionAr;
  return config.description;
};

export const getFeatureName = (feature: PlanFeature, language: 'en' | 'fa' | 'ar'): string => {
  if (language === 'fa') return feature.nameFa;
  if (language === 'ar') return feature.nameAr;
  return feature.name;
};

