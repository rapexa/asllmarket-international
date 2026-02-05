import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import type { ContactVerification } from '@/types/verification';

const contactVerificationSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  emailVerified: z.boolean().default(false),
  phoneVerified: z.boolean().default(false),
});

type ContactVerificationForm = z.infer<typeof contactVerificationSchema>;

interface Step3ContactProps {
  onNext: (data: ContactVerification) => void;
  onBack: () => void;
  initialData?: Partial<ContactVerification>;
}

const Step3Contact: React.FC<Step3ContactProps> = ({
  onNext,
  onBack,
  initialData,
}) => {
  const { language, dir } = useLanguage();
  const [emailVerified, setEmailVerified] = useState(initialData?.emailVerified || false);
  const [phoneVerified, setPhoneVerified] = useState(initialData?.phoneVerified || false);
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ContactVerificationForm>({
    resolver: zodResolver(contactVerificationSchema),
    defaultValues: {
      email: '',
      phone: '',
      emailVerified: initialData?.emailVerified || false,
      phoneVerified: initialData?.phoneVerified || false,
    },
    mode: 'onChange',
  });

  const email = watch('email');
  const phone = watch('phone');

  const handleSendEmailCode = () => {
    // In real app, send verification code to email
    alert(language === 'fa' ? 'کد تأیید به ایمیل ارسال شد' : language === 'ar' ? 'تم إرسال رمز التحقق إلى البريد الإلكتروني' : 'Verification code sent to email');
  };

  const handleSendPhoneCode = () => {
    // In real app, send verification code to phone
    alert(language === 'fa' ? 'کد تأیید به شماره موبایل ارسال شد' : language === 'ar' ? 'تم إرسال رمز التحقق إلى رقم الهاتف' : 'Verification code sent to phone');
  };

  const handleVerifyEmail = () => {
    // In real app, verify code
    if (emailCode.length >= 4) {
      setEmailVerified(true);
    }
  };

  const handleVerifyPhone = () => {
    // In real app, verify code
    if (phoneCode.length >= 4) {
      setPhoneVerified(true);
    }
  };

  const onSubmit = (data: ContactVerificationForm) => {
    onNext({
      emailVerified: emailVerified,
      phoneVerified: phoneVerified,
      emailVerifiedAt: emailVerified ? new Date() : undefined,
      phoneVerifiedAt: phoneVerified ? new Date() : undefined,
    });
  };

  // Update form values when verification status changes
  useEffect(() => {
    setValue('emailVerified', emailVerified);
    setValue('phoneVerified', phoneVerified);
  }, [emailVerified, phoneVerified, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">
          {language === 'fa' ? 'تأیید تماس' : language === 'ar' ? 'التحقق من الاتصال' : 'Contact Verification'}
        </h3>
        <p className="text-muted-foreground">
          {language === 'fa'
            ? 'لطفاً ایمیل و شماره موبایل خود را تأیید کنید'
            : language === 'ar'
            ? 'يرجى التحقق من بريدك الإلكتروني ورقم هاتفك'
            : 'Please verify your email and phone number'}
        </p>
      </div>

      {/* Email Verification */}
      <div className="space-y-4 p-4 border rounded-xl">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {language === 'fa' ? 'ایمیل' : language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            className={cn("h-12 rounded-xl", errors.email && "border-destructive")}
            placeholder={language === 'fa' ? 'example@email.com' : language === 'ar' ? 'example@email.com' : 'example@email.com'}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {!emailVerified ? (
          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleSendEmailCode}
              className="w-full"
            >
              {language === 'fa' ? 'ارسال کد تأیید' : language === 'ar' ? 'إرسال رمز التحقق' : 'Send Verification Code'}
            </Button>
            <div className="flex gap-2">
              <Input
                value={emailCode}
                onChange={(e) => setEmailCode(e.target.value)}
                placeholder={language === 'fa' ? 'کد تأیید' : language === 'ar' ? 'رمز التحقق' : 'Verification code'}
                className="flex-1"
                maxLength={6}
              />
              <Button
                type="button"
                onClick={handleVerifyEmail}
                disabled={emailCode.length < 4}
              >
                {language === 'fa' ? 'تأیید' : language === 'ar' ? 'التحقق' : 'Verify'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">
              {language === 'fa' ? 'ایمیل تأیید شد' : language === 'ar' ? 'تم التحقق من البريد الإلكتروني' : 'Email verified'}
            </span>
          </div>
        )}
      </div>

      {/* Phone Verification */}
      <div className="space-y-4 p-4 border rounded-xl">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {language === 'fa' ? 'شماره موبایل' : language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            className={cn("h-12 rounded-xl", errors.phone && "border-destructive")}
            placeholder={language === 'fa' ? '+98 912 345 6789' : language === 'ar' ? '+966 50 123 4567' : '+1 234 567 8900'}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {!phoneVerified ? (
          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleSendPhoneCode}
              className="w-full"
            >
              {language === 'fa' ? 'ارسال کد تأیید' : language === 'ar' ? 'إرسال رمز التحقق' : 'Send Verification Code'}
            </Button>
            <div className="flex gap-2">
              <Input
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
                placeholder={language === 'fa' ? 'کد تأیید' : language === 'ar' ? 'رمز التحقق' : 'Verification code'}
                className="flex-1"
                maxLength={6}
              />
              <Button
                type="button"
                onClick={handleVerifyPhone}
                disabled={phoneCode.length < 4}
              >
                {language === 'fa' ? 'تأیید' : language === 'ar' ? 'التحقق' : 'Verify'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">
              {language === 'fa' ? 'شماره موبایل تأیید شد' : language === 'ar' ? 'تم التحقق من رقم الهاتف' : 'Phone verified'}
            </span>
          </div>
        )}
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
          type="submit"
          disabled={!emailVerified || !phoneVerified}
          className="flex-1 btn-gradient-primary h-12"
        >
          {language === 'fa' ? 'ادامه' : language === 'ar' ? 'متابعة' : 'Continue'}
          <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
        </Button>
      </div>
    </form>
  );
};

export default Step3Contact;
