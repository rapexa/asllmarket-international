import React, { useState } from 'react';
import { CheckCircle2, Clock, XCircle, AlertCircle, ArrowRight, FileText, Building2, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { VerificationStatus, verificationStatusConfig } from '@/types/verification';
import VerificationBadge from './VerificationBadge';
import VerificationFlow from './VerificationFlow';

interface VerificationDashboardProps {
  initialStatus?: VerificationStatus;
}

const VerificationDashboard: React.FC<VerificationDashboardProps> = ({
  initialStatus = 'unverified',
}) => {
  const { language, dir } = useLanguage();
  const [status, setStatus] = useState<VerificationStatus>(initialStatus);
  const [showFlow, setShowFlow] = useState(false);

  const config = verificationStatusConfig[status];

  const getProgress = () => {
    switch (status) {
      case 'unverified':
        return 0;
      case 'pending':
        return 50;
      case 'verified':
        return 100;
      case 'rejected':
        return 25;
      case 'needs_update':
        return 40;
      default:
        return 0;
    }
  };

  const getNextAction = () => {
    switch (status) {
      case 'unverified':
        return language === 'fa'
          ? 'شروع فرآیند احراز هویت'
          : language === 'ar'
          ? 'ابدء عملية التحقق'
          : 'Start Verification Process';
      case 'pending':
        return language === 'fa'
          ? 'در انتظار بررسی توسط تیم ما'
          : language === 'ar'
          ? 'في انتظار المراجعة من قبل فريقنا'
          : 'Under review by our team';
      case 'rejected':
        return language === 'fa'
          ? 'بروزرسانی مدارک و ارسال مجدد'
          : language === 'ar'
          ? 'تحديث المستندات وإعادة الإرسال'
          : 'Update documents and resubmit';
      case 'needs_update':
        return language === 'fa'
          ? 'بروزرسانی اطلاعات'
          : language === 'ar'
          ? 'تحديث المعلومات'
          : 'Update information';
      case 'verified':
        return language === 'fa'
          ? 'احراز هویت تکمیل شده'
          : language === 'ar'
          ? 'اكتمل التحقق'
          : 'Verification completed';
      default:
        return '';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className="h-8 w-8 text-green-600" />;
      case 'pending':
        return <Clock className="h-8 w-8 text-amber-600" />;
      case 'rejected':
        return <XCircle className="h-8 w-8 text-red-600" />;
      case 'needs_update':
        return <AlertCircle className="h-8 w-8 text-orange-600" />;
      default:
        return <FileText className="h-8 w-8 text-muted-foreground" />;
    }
  };

  if (showFlow) {
    return (
      <VerificationFlow
        onComplete={(newStatus) => {
          setStatus(newStatus);
          setShowFlow(false);
        }}
        onCancel={() => setShowFlow(false)}
      />
    );
  }

  return (
    <Card className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            {language === 'fa' ? 'احراز هویت فروشنده' : language === 'ar' ? 'التحقق من البائع' : 'Supplier Verification'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'fa'
              ? 'هویت و کسب‌وکار خود را تأیید کنید'
              : language === 'ar'
              ? 'قم بالتحقق من هويتك وأعمالك'
              : 'Verify your identity and business'}
          </p>
        </div>
        {getIcon()}
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-4">
        <VerificationBadge status={status} showTooltip={false} size="lg" />
        <div className="flex-1">
          <Progress value={getProgress()} className="h-2" />
        </div>
      </div>

      {/* Current Status Info */}
      <div className={cn(
        "p-4 rounded-xl border-2",
        config.bgColor,
        config.borderColor
      )}>
        <p className="font-medium mb-1">
          {language === 'fa' ? 'وضعیت فعلی' : language === 'ar' ? 'الحالة الحالية' : 'Current Status'}
        </p>
        <p className="text-sm text-muted-foreground">
          {getNextAction()}
        </p>
      </div>

      {/* Requirements List */}
      {status === 'unverified' && (
        <div className="space-y-3">
          <p className="font-semibold text-sm">
            {language === 'fa' ? 'مدارک مورد نیاز:' : language === 'ar' ? 'المستندات المطلوبة:' : 'Required Documents:'}
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <FileText className="h-4 w-4 shrink-0" />
              {language === 'fa' ? 'شناسنامه یا پاسپورت' : language === 'ar' ? 'بطاقة الهوية أو جواز السفر' : 'National ID or Passport'}
            </li>
            <li className="flex items-center gap-2">
              <Building2 className="h-4 w-4 shrink-0" />
              {language === 'fa' ? 'مجوز کسب‌وکار یا گواهی ثبت' : language === 'ar' ? 'ترخيص الأعمال أو شهادة التسجيل' : 'Business License or Registration Certificate'}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              {language === 'fa' ? 'تأیید ایمیل' : language === 'ar' ? 'تأكيد البريد الإلكتروني' : 'Email Verification'}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              {language === 'fa' ? 'تأیید شماره موبایل' : language === 'ar' ? 'تأكيد رقم الهاتف' : 'Phone Verification'}
            </li>
          </ul>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="flex gap-3 pt-4">
        {status === 'unverified' || status === 'rejected' || status === 'needs_update' ? (
          <Button
            onClick={() => setShowFlow(true)}
            className="btn-gradient-primary flex-1 h-12"
          >
            {status === 'unverified'
              ? language === 'fa' ? 'شروع احراز هویت' : language === 'ar' ? 'ابدء التحقق' : 'Start Verification'
              : language === 'fa' ? 'بروزرسانی' : language === 'ar' ? 'تحديث' : 'Update'}
            <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
          </Button>
        ) : status === 'pending' ? (
          <Button variant="outline" disabled className="flex-1 h-12">
            {language === 'fa' ? 'در انتظار بررسی...' : language === 'ar' ? 'في انتظار المراجعة...' : 'Under Review...'}
          </Button>
        ) : null}
      </div>
    </Card>
  );
};

export default VerificationDashboard;

