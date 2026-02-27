import React, { useEffect } from 'react';
import { CheckCircle2, ArrowRight, User, Building2 } from 'lucide-react';
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

  // فقط buyer و supplier فعال؛ بقیه شاید در آینده استفاده بشوند.
  const roleInfo: Record<UserRole, { title: string; titleFa: string; titleAr: string; description: string; descriptionFa: string; descriptionAr: string; dashboardPath: string; icon: typeof User; color: string }> = {
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
      color: 'from-primary to-primary-light',
    },
    // شاید در آینده استفاده بشه: visitor, both, market
    // visitor: { ... },
    // both: { ... },
    // market: { ... },
  };

  const info = (role === 'buyer' || role === 'supplier' ? roleInfo[role] : null) || roleInfo.buyer;
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
      {role === 'supplier' && (
        <div className="bg-primary/10 dark:bg-primary/20 border border-primary/30 dark:border-primary/40 rounded-2xl p-6 max-w-2xl mx-auto">
          <h3 className="font-bold text-lg mb-2 text-primary">
            Account Status: Pending Verification
          </h3>
          <p className="text-sm text-foreground/90">
            We're reviewing your documents. You'll receive an email notification once your account is verified (usually within 1-3 business days).
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

