import React, { useState } from 'react';
import { Mail, Phone, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import RegisterWithEmail from './RegisterWithEmail';
import RegisterWithMobile from './RegisterWithMobile';
import RoleSelection from './RoleSelection';
import SuccessStep from './SuccessStep';
import type { UserRole } from './AuthModal';

interface RegisterFlowProps {
  onSuccess: (role: UserRole) => void;
  onClose: () => void;
}

type RegisterMethod = 'email' | 'mobile';
type RegisterStep = 'method' | 'form' | 'otp' | 'role' | 'success';

const RegisterFlow: React.FC<RegisterFlowProps> = ({ onSuccess, onClose }) => {
  const { language, dir } = useLanguage();
  const [step, setStep] = useState<RegisterStep>('method');
  const [method, setMethod] = useState<RegisterMethod>('email');
  const [emailData, setEmailData] = useState<any>(null);
  const [mobileData, setMobileData] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleMethodSelect = (selectedMethod: RegisterMethod) => {
    setMethod(selectedMethod);
    setStep('form');
  };

  const handleEmailSubmit = (data: any) => {
    setEmailData(data);
    setStep('role');
  };

  const handleMobileSubmit = (data: any) => {
    setMobileData(data);
    setStep('otp');
  };

  const handleOTPVerify = () => {
    setOtpVerified(true);
    setStep('role');
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('success');
  };

  const handleSuccess = () => {
    if (selectedRole) {
      onSuccess(selectedRole);
    }
  };

  const handleBack = () => {
    if (step === 'form') {
      setStep('method');
    } else if (step === 'otp') {
      setStep('form');
    } else if (step === 'role') {
      if (method === 'mobile') {
        setStep('otp');
      } else {
        setStep('form');
      }
    }
  };

  return (
    <div className="w-full">
      {step === 'method' && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">
              {language === 'fa' ? 'روش ثبت‌نام' : language === 'ar' ? 'طريقة التسجيل' : 'Registration Method'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === 'fa' ? 'انتخاب کنید' : language === 'ar' ? 'اختر' : 'Choose your preferred method'}
            </p>
          </div>

          <Tabs value={method} onValueChange={(value) => handleMethodSelect(value as RegisterMethod)} className="w-full">
            <TabsList className="w-full grid grid-cols-2 h-12">
              <TabsTrigger value="email" className="gap-2">
                <Mail className="h-4 w-4" />
                {language === 'fa' ? 'ایمیل' : language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </TabsTrigger>
              <TabsTrigger value="mobile" className="gap-2">
                <Phone className="h-4 w-4" />
                {language === 'fa' ? 'موبایل' : language === 'ar' ? 'الهاتف' : 'Mobile'}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            onClick={() => handleMethodSelect(method)}
            className="w-full btn-gradient-primary h-12 text-base font-semibold"
          >
            {language === 'fa' ? 'ادامه' : language === 'ar' ? 'متابعة' : 'Continue'}
            <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
          </Button>
        </div>
      )}

      {step === 'form' && method === 'email' && (
        <RegisterWithEmail
          onSubmit={handleEmailSubmit}
          onBack={handleBack}
        />
      )}

      {step === 'form' && method === 'mobile' && (
        <RegisterWithMobile
          onSubmit={handleMobileSubmit}
          onBack={handleBack}
        />
      )}

      {step === 'otp' && (
        <RegisterOTP
          mobileData={mobileData}
          onVerify={handleOTPVerify}
          onBack={handleBack}
        />
      )}

      {step === 'role' && (
        <RoleSelection
          onSelect={handleRoleSelect}
          onBack={handleBack}
        />
      )}

      {step === 'success' && (
        <SuccessStep
          onComplete={handleSuccess}
        />
      )}
    </div>
  );
};

export default RegisterFlow;

