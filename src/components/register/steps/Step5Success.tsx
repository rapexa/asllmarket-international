import React, { useEffect } from 'react';
import { CheckCircle2, ArrowRight, User, Building2, Sparkles, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { UserRole } from '../RegisterFlow';
import { useNavigate } from 'react-router-dom';

interface Step5SuccessProps {
  role: UserRole;
  onComplete: () => void;
}

const Step5Success: React.FC<Step5SuccessProps> = ({ role, onComplete }) => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();

  const roleInfo = {
    buyer: {
      title: 'Welcome, Buyer!',
      titleFa: 'خوش آمدید، خریدار!',
      titleAr: 'مرحباً، المشتري!',
      description: 'Start exploring products and connecting with verified suppliers',
      descriptionFa: 'شروع به کاوش محصولات و اتصال به تأمین‌کنندگان تایید شده کنید',
      descriptionAr: 'ابدأ استكشاف المنتجات والاتصال بالموردين المعتمدين',
      dashboardPath: '/dashboard/buyer',
      icon: User,
      color: 'from-green-500 to-emerald-500',
    },
    supplier: {
      title: 'Welcome, Supplier!',
      titleFa: 'خوش آمدید، تأمین‌کننده!',
      titleAr: 'مرحباً، المورد!',
      description: 'Your account is pending verification. Complete your profile to start selling.',
      descriptionFa: 'حساب شما در انتظار تایید است. پروفایل خود را تکمیل کنید تا شروع به فروش کنید.',
      descriptionAr: 'حسابك قيد المراجعة. أكمل ملفك الشخصي لبدء البيع.',
      dashboardPath: '/dashboard/supplier',
      icon: Building2,
      color: 'from-blue-500 to-cyan-500',
    },
    visitor: {
      title: 'Welcome!',
      titleFa: 'خوش آمدید!',
      titleAr: 'مرحباً!',
      description: 'Explore opportunities and connect with the global B2B network',
      descriptionFa: 'فرصت‌ها را کاوش کنید و با شبکه B2B جهانی ارتباط برقرار کنید',
      descriptionAr: 'استكشف الفرص وتواصل مع شبكة B2B العالمية',
      dashboardPath: '/dashboard/visitor',
      icon: Sparkles,
      color: 'from-orange-500 to-amber-500',
    },
    both: {
      title: 'Welcome!',
      titleFa: 'خوش آمدید!',
      titleAr: 'مرحباً!',
      description: 'You can now buy and sell on ASL Market',
      descriptionFa: 'اکنون می‌توانید در ASL Market خرید و فروش کنید',
      descriptionAr: 'يمكنك الآن الشراء والبيع على ASL Market',
      dashboardPath: '/dashboard',
      icon: Building2,
      color: 'from-purple-500 to-violet-500',
    },
    market: {
      title: 'Welcome, Market!',
      titleFa: 'خوش آمدید، بازار!',
      titleAr: 'مرحباً، السوق!',
      description: 'Your market account is pending approval. Complete your profile to start your trading platform.',
      descriptionFa: 'حساب بازار شما در انتظار تایید است. پروفایل خود را تکمیل کنید تا پلتفرم تجاری خود را شروع کنید.',
      descriptionAr: 'حساب السوق الخاص بك قيد المراجعة. أكمل ملفك الشخصي لبدء منصة التداول الخاصة بك.',
      dashboardPath: '/dashboard/market',
      icon: Store,
      color: 'from-teal-500 to-cyan-500',
    },
  };

  const info = roleInfo[role] || roleInfo.buyer;
  const Icon = info.icon;

  const getTitle = () => {
    if (language === 'fa') return info.titleFa;
    if (language === 'ar') return info.titleAr;
    return info.title;
  };

  const getDescription = () => {
    if (language === 'fa') return info.descriptionFa;
    if (language === 'ar') return info.descriptionAr;
    return info.description;
  };

  // Auto redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="space-y-8 text-center">
      {/* Success Animation */}
      <div className="flex justify-center">
        <div className="relative">
          <div className={cn(
            "w-32 h-32 rounded-full bg-gradient-to-br flex items-center justify-center",
            info.color,
            "animate-scale-in shadow-2xl"
          )}>
            <CheckCircle2 className="h-16 w-16 text-white" />
          </div>
          <div className={cn(
            "absolute -top-2 -end-2 w-16 h-16 rounded-full bg-gradient-to-br",
            info.color,
            "opacity-20 animate-ping"
          )} />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
          {getTitle()}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {getDescription()}
        </p>
      </div>

      {/* Role Badge */}
      <div className="flex justify-center">
        <div className={cn(
          "inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r",
          info.color,
          "text-white shadow-lg"
        )}>
          <Icon className="h-6 w-6" />
          <span className="font-semibold capitalize">{role}</span>
        </div>
      </div>

      {/* Next Steps */}
      {(role === 'supplier' || role === 'market') && (
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 max-w-2xl mx-auto">
          <h3 className="font-bold text-lg mb-2 text-blue-900 dark:text-blue-100">
            Account Status: Pending {role === 'supplier' ? 'Verification' : 'Approval'}
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            {role === 'supplier' 
              ? "We're reviewing your documents. You'll receive an email notification once your account is verified (usually within 1-3 business days)."
              : "We're reviewing your market application. You'll receive an email notification once your market is approved (usually within 2-5 business days)."}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
        <Button
          size="lg"
          onClick={onComplete}
          className={cn(
            "btn-gradient-primary rounded-2xl px-12 py-6 text-lg font-semibold",
            "shadow-xl hover:shadow-2xl"
          )}
        >
          Go to Dashboard
          <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate('/profile')}
          className="rounded-2xl px-12 py-6 text-lg"
        >
          Complete Profile
        </Button>
      </div>

      {/* Auto Redirect Notice */}
      <p className="text-sm text-muted-foreground pt-4">
        Redirecting to dashboard in 5 seconds...
      </p>
    </div>
  );
};

export default Step5Success;

