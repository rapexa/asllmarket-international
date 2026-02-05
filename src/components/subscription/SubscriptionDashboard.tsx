import React, { useState } from 'react';
import { CreditCard, Calendar, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { SubscriptionPlan, BillingCycle, subscriptionPlans, getPlanName } from '@/types/subscription';
import SubscriptionBadge from './SubscriptionBadge';
import PricingCard from './PricingCard';
import UpgradeFlow from './UpgradeFlow';

interface SubscriptionDashboardProps {
  currentPlan?: SubscriptionPlan;
  billingCycle?: BillingCycle;
  autoRenew?: boolean;
  endDate?: Date;
}

const SubscriptionDashboard: React.FC<SubscriptionDashboardProps> = ({
  currentPlan = 'free',
  billingCycle = 'monthly',
  autoRenew = false,
  endDate,
}) => {
  const { language, dir } = useLanguage();
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<BillingCycle>(billingCycle);
  const [showUpgradeFlow, setShowUpgradeFlow] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  const currentPlanConfig = subscriptionPlans[currentPlan];

  const handleUpgrade = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setShowUpgradeFlow(true);
  };

  const handleUpgradeComplete = () => {
    setShowUpgradeFlow(false);
    setSelectedPlan(null);
    // In real app, refresh subscription data
  };

  if (showUpgradeFlow && selectedPlan) {
    return (
      <UpgradeFlow
        plan={selectedPlan}
        billingCycle={selectedBillingCycle}
        currentPlan={currentPlan}
        onComplete={handleUpgradeComplete}
        onCancel={() => {
          setShowUpgradeFlow(false);
          setSelectedPlan(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">
              {language === 'fa' ? 'اشتراک فعلی' : language === 'ar' ? 'الاشتراك الحالي' : 'Current Subscription'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'fa'
                ? 'مدیریت پلن و پرداخت‌های شما'
                : language === 'ar'
                ? 'إدارة الخطة والمدفوعات الخاصة بك'
                : 'Manage your plan and payments'}
            </p>
          </div>
          <SubscriptionBadge plan={currentPlan} showTooltip={false} size="lg" />
        </div>

        {/* Current Plan Info */}
        <div className={cn(
          "p-4 rounded-xl border-2 mb-4",
          currentPlanConfig.bgColor,
          currentPlanConfig.borderColor
        )}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-lg mb-1">
                {getPlanName(currentPlan, language)}
              </p>
              <p className="text-sm text-muted-foreground">
                {language === 'fa' ? currentPlanConfig.descriptionFa : language === 'ar' ? currentPlanConfig.descriptionAr : currentPlanConfig.description}
              </p>
            </div>
            <div className="text-end">
              <p className="text-2xl font-bold">
                {currentPlanConfig.monthlyPrice === 0 
                  ? language === 'fa' ? 'رایگان' : language === 'ar' ? 'مجاني' : 'Free'
                  : `$${selectedBillingCycle === 'monthly' ? currentPlanConfig.monthlyPrice : currentPlanConfig.yearlyPrice}`
                }
              </p>
              {currentPlanConfig.monthlyPrice > 0 && (
                <p className="text-sm text-muted-foreground">
                  /{selectedBillingCycle === 'monthly'
                    ? (language === 'fa' ? 'ماه' : language === 'ar' ? 'شهر' : 'month')
                    : (language === 'fa' ? 'سال' : language === 'ar' ? 'سنة' : 'year')
                  }
                </p>
              )}
            </div>
          </div>

          {/* Additional Info */}
          {endDate && (
            <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {language === 'fa'
                  ? `تاریخ انقضا: ${endDate.toLocaleDateString('fa-IR')}`
                  : language === 'ar'
                  ? `تاريخ الانتهاء: ${endDate.toLocaleDateString('ar')}`
                  : `Expires: ${endDate.toLocaleDateString()}`
                }
              </span>
            </div>
          )}

          {autoRenew && currentPlanConfig.monthlyPrice > 0 && (
            <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
              <RefreshCw className="h-4 w-4" />
              <span>
                {language === 'fa' ? 'تجدید خودکار فعال است' : language === 'ar' ? 'التجديد التلقائي مفعّل' : 'Auto-renewal enabled'}
              </span>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {currentPlan !== 'diamond' && (
          <Button
            onClick={() => {
              const nextPlan = getNextPlan(currentPlan);
              if (nextPlan) handleUpgrade(nextPlan);
            }}
            className="w-full btn-gradient-primary h-12"
          >
            {language === 'fa' ? 'ارتقا به پلن بالاتر' : language === 'ar' ? 'الترقية إلى خطة أعلى' : 'Upgrade Plan'}
          </Button>
        )}
      </Card>

      {/* Pricing Plans */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {language === 'fa' ? 'پلن‌های موجود' : language === 'ar' ? 'الخطط المتاحة' : 'Available Plans'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'fa'
              ? 'پلن مناسب خود را انتخاب کنید'
              : language === 'ar'
              ? 'اختر الخطة المناسبة لك'
              : 'Choose the plan that fits your needs'}
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-6">
          <Tabs value={selectedBillingCycle} onValueChange={(value) => setSelectedBillingCycle(value as BillingCycle)}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="monthly">
                {language === 'fa' ? 'ماهانه' : language === 'ar' ? 'شهري' : 'Monthly'}
              </TabsTrigger>
              <TabsTrigger value="yearly">
                {language === 'fa' ? 'سالانه' : language === 'ar' ? 'سنوي' : 'Yearly'}
                <span className="ms-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                  {language === 'fa' ? 'صرفه‌جویی' : language === 'ar' ? 'توفير' : 'Save'}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(subscriptionPlans).map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              currentPlan={currentPlan}
              billingCycle={selectedBillingCycle}
              onUpgrade={handleUpgrade}
              isPopular={plan.id === 'gold'}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

// Helper function to get next plan
function getNextPlan(currentPlan: SubscriptionPlan): SubscriptionPlan | null {
  const planOrder: SubscriptionPlan[] = ['free', 'silver', 'gold', 'diamond'];
  const currentIndex = planOrder.indexOf(currentPlan);
  return currentIndex < planOrder.length - 1 ? planOrder[currentIndex + 1] : null;
}

export default SubscriptionDashboard;

