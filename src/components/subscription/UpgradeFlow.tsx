import React, { useState } from 'react';
import { ArrowLeft, CreditCard, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { SubscriptionPlan, BillingCycle, subscriptionPlans, getPlanName } from '@/types/subscription';
import SubscriptionBadge from './SubscriptionBadge';

interface UpgradeFlowProps {
  plan: SubscriptionPlan;
  billingCycle: BillingCycle;
  currentPlan: SubscriptionPlan;
  onComplete: () => void;
  onCancel: () => void;
}

const UpgradeFlow: React.FC<UpgradeFlowProps> = ({
  plan,
  billingCycle,
  currentPlan,
  onComplete,
  onCancel,
}) => {
  const { language, dir } = useLanguage();
  const [step, setStep] = useState<'summary' | 'payment' | 'success'>('summary');
  const [isProcessing, setIsProcessing] = useState(false);

  const planConfig = subscriptionPlans[plan];
  const price = billingCycle === 'monthly' ? planConfig.monthlyPrice : planConfig.yearlyPrice;
  const currency = planConfig.currency;

  const handleProceedToPayment = () => {
    setStep('payment');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Mock payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setStep('success');
    
    // Auto redirect after 2 seconds
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  if (step === 'summary') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            {language === 'fa' ? 'ارتقا به پلن' : language === 'ar' ? 'الترقية إلى خطة' : 'Upgrade to'} {getPlanName(plan, language)}
          </h2>
          <p className="text-muted-foreground">
            {language === 'fa'
              ? 'جزئیات ارتقای حساب خود را بررسی کنید'
              : language === 'ar'
              ? 'راجع تفاصيل ترقية حسابك'
              : 'Review your account upgrade details'}
          </p>
        </div>

        {/* Plan Comparison */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {language === 'fa' ? 'پلن فعلی' : language === 'ar' ? 'الخطة الحالية' : 'Current Plan'}
              </p>
              <SubscriptionBadge plan={currentPlan} showTooltip={false} size="md" />
            </div>
            <ArrowRight className={cn("h-6 w-6 text-muted-foreground", dir === 'rtl' && "rotate-180")} />
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {language === 'fa' ? 'پلن جدید' : language === 'ar' ? 'الخطة الجديدة' : 'New Plan'}
              </p>
              <SubscriptionBadge plan={plan} showTooltip={false} size="md" />
            </div>
          </div>
        </Card>

        {/* Pricing Summary */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">
            {language === 'fa' ? 'خلاصه قیمت' : language === 'ar' ? 'ملخص السعر' : 'Pricing Summary'}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {getPlanName(plan, language)} ({billingCycle === 'monthly'
                  ? language === 'fa' ? 'ماهانه' : language === 'ar' ? 'شهري' : 'Monthly'
                  : language === 'fa' ? 'سالانه' : language === 'ar' ? 'سنوي' : 'Yearly'
                })
              </span>
              <span className="font-semibold">${price}/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
            {billingCycle === 'yearly' && planConfig.monthlyPrice > 0 && (
              <div className="flex items-center justify-between text-sm text-green-600">
                <span>
                  {language === 'fa' ? 'صرفه‌جویی' : language === 'ar' ? 'توفير' : 'You save'}
                </span>
                <span className="font-semibold">
                  ${(planConfig.monthlyPrice * 12 - planConfig.yearlyPrice).toFixed(2)}
                </span>
              </div>
            )}
            <div className="border-t border-border pt-3 flex items-center justify-between font-bold text-lg">
              <span>{language === 'fa' ? 'مجموع' : language === 'ar' ? 'الإجمالي' : 'Total'}</span>
              <span>${price}</span>
            </div>
          </div>
        </Card>

        {/* Security Notice */}
        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
          <Lock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            {language === 'fa'
              ? 'پرداخت شما امن است و توسط رمزگذاری SSL محافظت می‌شود'
              : language === 'ar'
              ? 'دفعتك آمنة ومحمية بتشفير SSL'
              : 'Your payment is secure and protected by SSL encryption'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 h-12"
          >
            <ArrowLeft className={cn("me-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
            {language === 'fa' ? 'بازگشت' : language === 'ar' ? 'رجوع' : 'Back'}
          </Button>
          <Button
            onClick={handleProceedToPayment}
            className="flex-1 btn-gradient-primary h-12"
          >
            {language === 'fa' ? 'ادامه به پرداخت' : language === 'ar' ? 'متابعة إلى الدفع' : 'Proceed to Payment'}
            <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            {language === 'fa' ? 'اطلاعات پرداخت' : language === 'ar' ? 'معلومات الدفع' : 'Payment Information'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'fa'
              ? 'لطفاً اطلاعات پرداخت خود را وارد کنید'
              : language === 'ar'
              ? 'يرجى إدخال معلومات الدفع الخاصة بك'
              : 'Please enter your payment information'}
          </p>
        </div>

        {/* Payment Form */}
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="text-sm font-semibold">
              {language === 'fa' ? 'شماره کارت' : language === 'ar' ? 'رقم البطاقة' : 'Card Number'} <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <CreditCard className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="h-12 rounded-xl ps-12"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry" className="text-sm font-semibold">
                {language === 'fa' ? 'تاریخ انقضا' : language === 'ar' ? 'تاريخ الانتهاء' : 'Expiry'} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="expiry"
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv" className="text-sm font-semibold">
                CVV <span className="text-destructive">*</span>
              </Label>
              <Input
                id="cvv"
                type="text"
                placeholder="123"
                maxLength={4}
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardName" className="text-sm font-semibold">
              {language === 'fa' ? 'نام روی کارت' : language === 'ar' ? 'الاسم على البطاقة' : 'Name on Card'} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="cardName"
              type="text"
              placeholder={language === 'fa' ? 'نام کامل' : language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              className="h-12 rounded-xl"
            />
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setStep('summary')}
            disabled={isProcessing}
            className="flex-1 h-12"
          >
            <ArrowLeft className={cn("me-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
            {language === 'fa' ? 'بازگشت' : language === 'ar' ? 'رجوع' : 'Back'}
          </Button>
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-1 btn-gradient-primary h-12"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                <span>{language === 'fa' ? 'در حال پردازش...' : language === 'ar' ? 'جاري المعالجة...' : 'Processing...'}</span>
              </div>
            ) : (
              <>
                {language === 'fa' ? 'پرداخت' : language === 'ar' ? 'دفع' : 'Pay ${price}'}
                <Lock className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="space-y-6 text-center py-8">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">
          {language === 'fa' ? 'ارتقا موفق!' : language === 'ar' ? 'نجحت الترقي' : 'Upgrade Successful!'}
        </h2>
        <p className="text-muted-foreground">
          {language === 'fa'
            ? `حساب شما به پلن ${getPlanName(plan, language)} ارتقا یافت`
            : language === 'ar'
            ? `تمت ترقية حسابك إلى خطة ${getPlanName(plan, language)}`
            : `Your account has been upgraded to ${getPlanName(plan, language)} plan`
          }
        </p>
        <SubscriptionBadge plan={plan} showTooltip={false} size="lg" />
      </div>
    );
  }

  return null;
};

export default UpgradeFlow;

