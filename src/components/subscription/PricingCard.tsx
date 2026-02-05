import React from 'react';
import { Check, X, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { SubscriptionPlan, SubscriptionPlanConfig, getFeatureName, BillingCycle } from '@/types/subscription';

interface PricingCardProps {
  plan: SubscriptionPlanConfig;
  currentPlan?: SubscriptionPlan;
  billingCycle: BillingCycle;
  onUpgrade: (plan: SubscriptionPlan) => void;
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  currentPlan,
  billingCycle,
  onUpgrade,
  isPopular = false,
}) => {
  const { language, dir } = useLanguage();
  const isCurrentPlan = currentPlan === plan.id;
  const isUpgrade = currentPlan && getPlanPriority(currentPlan) < getPlanPriority(plan.id);
  const isDowngrade = currentPlan && getPlanPriority(currentPlan) > getPlanPriority(plan.id);

  const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const yearlySavings = billingCycle === 'yearly' && plan.monthlyPrice > 0 
    ? Math.round(((plan.monthlyPrice * 12 - plan.yearlyPrice) / (plan.monthlyPrice * 12)) * 100)
    : 0;

  const handleClick = () => {
    if (!isCurrentPlan) {
      onUpgrade(plan.id);
    }
  };

  return (
    <Card
      className={cn(
        "relative p-6 border-2 transition-all duration-200",
        isCurrentPlan 
          ? `${plan.borderColor} ${plan.bgColor} shadow-lg`
          : "border-border hover:border-primary/50 hover:shadow-lg",
        isPopular && "ring-2 ring-primary ring-offset-2"
      )}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 start-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-3 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 fill-current" />
            {language === 'fa' ? 'محبوب' : language === 'ar' ? 'شائع' : 'Popular'}
          </Badge>
        </div>
      )}

      {/* Current Plan Badge */}
      {isCurrentPlan && (
        <div className="absolute -top-3 end-4">
          <Badge className={cn("px-3 py-1", plan.badgeColor)}>
            {language === 'fa' ? 'پلن فعلی' : language === 'ar' ? 'الخطة الحالية' : 'Current Plan'}
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className={cn("text-2xl font-bold mb-2", plan.color)}>
          {language === 'fa' ? plan.nameFa : language === 'ar' ? plan.nameAr : plan.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {language === 'fa' ? plan.descriptionFa : language === 'ar' ? plan.descriptionAr : plan.description}
        </p>

        {/* Price */}
        <div className="mb-2">
          <span className="text-4xl font-bold">{price === 0 ? 'Free' : `$${price}`}</span>
          {price > 0 && (
            <span className="text-muted-foreground text-lg">
              /{billingCycle === 'monthly' 
                ? (language === 'fa' ? 'ماه' : language === 'ar' ? 'شهر' : 'mo')
                : (language === 'fa' ? 'سال' : language === 'ar' ? 'سنة' : 'yr')
              }
            </span>
          )}
        </div>

        {/* Yearly Savings */}
        {yearlySavings > 0 && (
          <p className="text-sm text-green-600 font-semibold">
            {language === 'fa' 
              ? `صرفه‌جویی ${yearlySavings}%`
              : language === 'ar'
              ? `توفير ${yearlySavings}%`
              : `Save ${yearlySavings}%`
            }
          </p>
        )}
      </div>

      {/* Features */}
      <div className="space-y-3 mb-6 min-h-[300px]">
        {plan.features.map((feature) => (
          <div key={feature.id} className="flex items-start gap-3">
            {feature.enabled ? (
              <Check className={cn("h-5 w-5 shrink-0 mt-0.5", "text-green-600")} />
            ) : (
              <X className="h-5 w-5 shrink-0 mt-0.5 text-muted-foreground opacity-50" />
            )}
            <div className="flex-1">
              <p className={cn(
                "text-sm",
                feature.enabled ? "text-foreground" : "text-muted-foreground line-through"
              )}>
                {getFeatureName(feature, language)}
                {feature.limit && typeof feature.limit === 'number' && (
                  <span className="text-muted-foreground"> ({feature.limit})</span>
                )}
                {feature.limit === 'unlimited' && (
                  <span className="text-muted-foreground"> {language === 'fa' ? '(نامحدود)' : language === 'ar' ? '(غير محدود)' : '(Unlimited)'}</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Button
        onClick={handleClick}
        disabled={isCurrentPlan}
        className={cn(
          "w-full h-12 text-base font-semibold",
          isCurrentPlan 
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : isUpgrade
            ? "btn-gradient-primary"
            : "btn-outline-primary"
        )}
      >
        {isCurrentPlan 
          ? (language === 'fa' ? 'پلن فعلی' : language === 'ar' ? 'الخطة الحالية' : 'Current Plan')
          : isUpgrade
          ? (language === 'fa' ? 'ارتقا' : language === 'ar' ? 'ترقية' : 'Upgrade')
          : (language === 'fa' ? 'انتخاب' : language === 'ar' ? 'اختيار' : 'Select')
        }
        {!isCurrentPlan && (
          <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
        )}
      </Button>
    </Card>
  );
};

// Helper function to get plan priority for comparison
function getPlanPriority(plan: SubscriptionPlan): number {
  const priorities: Record<SubscriptionPlan, number> = {
    free: 1,
    silver: 2,
    gold: 3,
    diamond: 4,
  };
  return priorities[plan];
}

export default PricingCard;

