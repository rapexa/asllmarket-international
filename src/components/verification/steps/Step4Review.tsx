import React from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, FileText, Building2, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { getCountryName } from '@/data/countryCodes';
import { countryCodes } from '@/data/countryCodes';

interface Step4ReviewProps {
  formData: any;
  onSubmit: () => void;
  onBack: () => void;
}

const Step4Review: React.FC<Step4ReviewProps> = ({
  formData,
  onSubmit,
  onBack,
}) => {
  const { language, dir } = useLanguage();

  const getCountryNameFromCode = (code: string) => {
    const country = countryCodes.find(c => c.code === code);
    return country ? getCountryName(country, language) : code;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">
          {language === 'fa' ? 'بررسی و تأیید نهایی' : language === 'ar' ? 'المراجعة والتحقق النهائي' : 'Review & Final Submission'}
        </h3>
        <p className="text-muted-foreground">
          {language === 'fa'
            ? 'لطفاً اطلاعات خود را بررسی کنید و تأیید کنید'
            : language === 'ar'
            ? 'يرجى مراجعة معلوماتك والتأكيد'
            : 'Please review your information and confirm'}
        </p>
      </div>

      {/* Personal Identity Section */}
      {formData.personalIdentity && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-lg">
              {language === 'fa' ? 'هویت شخصی' : language === 'ar' ? 'الهوية الشخصية' : 'Personal Identity'}
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {language === 'fa' ? 'نام کامل' : language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              </span>
              <span className="font-medium">{formData.personalIdentity.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {language === 'fa' ? 'ملیت' : language === 'ar' ? 'الجنسية' : 'Nationality'}
              </span>
              <span className="font-medium">
                {getCountryNameFromCode(formData.personalIdentity.nationality)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {language === 'fa' ? 'نوع سند' : language === 'ar' ? 'نوع الوثيقة' : 'ID Type'}
              </span>
              <Badge variant="outline">
                {formData.personalIdentity.idType === 'passport'
                  ? (language === 'fa' ? 'پاسپورت' : language === 'ar' ? 'جواز السفر' : 'Passport')
                  : (language === 'fa' ? 'کارت ملی' : language === 'ar' ? 'بطاقة الهوية' : 'National ID')}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {language === 'fa' ? 'شماره سند' : language === 'ar' ? 'رقم الوثيقة' : 'ID Number'}
              </span>
              <span className="font-medium">{formData.personalIdentity.idNumber}</span>
            </div>
            {formData.personalIdentity.identityFront && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                {language === 'fa' ? 'روی سند آپلود شده' : language === 'ar' ? 'تم تحميل وجه الوثيقة' : 'ID front uploaded'}
              </div>
            )}
            {formData.personalIdentity.identityBack && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                {language === 'fa' ? 'پشت سند آپلود شده' : language === 'ar' ? 'تم تحميل ظهر الوثيقة' : 'ID back uploaded'}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Business Info Section */}
      {formData.businessInfo && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-lg">
              {language === 'fa' ? 'اطلاعات کسب‌وکار' : language === 'ar' ? 'معلومات الأعمال' : 'Business Information'}
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {language === 'fa' ? 'نام قانونی' : language === 'ar' ? 'الاسم القانوني' : 'Legal Name'}
              </span>
              <span className="font-medium">{formData.businessInfo.legalName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {language === 'fa' ? 'شماره ثبت' : language === 'ar' ? 'رقم التسجيل' : 'Registration Number'}
              </span>
              <span className="font-medium">{formData.businessInfo.registrationNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {language === 'fa' ? 'کشور ثبت' : language === 'ar' ? 'بلد التسجيل' : 'Country of Registration'}
              </span>
              <span className="font-medium">
                {getCountryNameFromCode(formData.businessInfo.countryOfRegistration)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {language === 'fa' ? 'نوع کسب‌وکار' : language === 'ar' ? 'نوع الأعمال' : 'Business Type'}
              </span>
              <span className="font-medium">{formData.businessInfo.businessType}</span>
            </div>
            {formData.businessInfo.businessLicense && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                {language === 'fa' ? 'مجوز کسب‌وکار آپلود شده' : language === 'ar' ? 'تم تحميل ترخيص الأعمال' : 'Business license uploaded'}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Contact Verification Section */}
      {formData.contactVerification && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-lg">
              {language === 'fa' ? 'تأیید تماس' : language === 'ar' ? 'التحقق من الاتصال' : 'Contact Verification'}
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {language === 'fa' ? 'ایمیل' : language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </span>
              {formData.contactVerification.emailVerified ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {language === 'fa' ? 'تأیید شده' : language === 'ar' ? 'مؤكد' : 'Verified'}
                  </span>
                </div>
              ) : (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  {language === 'fa' ? 'تأیید نشده' : language === 'ar' ? 'غير مؤكد' : 'Not Verified'}
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {language === 'fa' ? 'شماره موبایل' : language === 'ar' ? 'رقم الهاتف' : 'Phone'}
              </span>
              {formData.contactVerification.phoneVerified ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {language === 'fa' ? 'تأیید شده' : language === 'ar' ? 'مؤكد' : 'Verified'}
                  </span>
                </div>
              ) : (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  {language === 'fa' ? 'تأیید نشده' : language === 'ar' ? 'غير مؤكد' : 'Not Verified'}
                </Badge>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Warning Message */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          {language === 'fa'
            ? 'پس از ارسال، درخواست شما توسط تیم ما بررسی خواهد شد. این فرآیند معمولاً 2-3 روز کاری طول می‌کشد.'
            : language === 'ar'
            ? 'بعد الإرسال، سيتم مراجعة طلبك من قبل فريقنا. تستغرق هذه العملية عادة 2-3 أيام عمل.'
            : 'After submission, your request will be reviewed by our team. This process usually takes 2-3 business days.'}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 h-12"
        >
          <ArrowLeft className={cn("me-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
          {language === 'fa' ? 'بازگشت' : language === 'ar' ? 'رجوع' : 'Back'}
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          className="flex-1 btn-gradient-primary h-12"
        >
          {language === 'fa' ? 'ارسال درخواست' : language === 'ar' ? 'إرسال الطلب' : 'Submit Request'}
          <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
        </Button>
      </div>
    </div>
  );
};

export default Step4Review;
