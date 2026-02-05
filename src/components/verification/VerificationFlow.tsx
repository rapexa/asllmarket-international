import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { VerificationStatus } from '@/types/verification';
import Step1PersonalIdentity from './steps/Step1PersonalIdentity';
import Step2Business from './steps/Step2Business';
import Step3Contact from './steps/Step3Contact';
import Step4Review from './steps/Step4Review';

interface VerificationFlowProps {
  onComplete: (status: VerificationStatus) => void;
  onCancel: () => void;
}

const VerificationFlow: React.FC<VerificationFlowProps> = ({ onComplete, onCancel }) => {
  const { language, dir } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const totalSteps = 4;
  const steps = [
    { number: 1, title: 'Personal Identity', titleFa: 'هویت شخصی', titleAr: 'الهوية الشخصية' },
    { number: 2, title: 'Business Info', titleFa: 'اطلاعات کسب‌وکار', titleAr: 'معلومات الأعمال' },
    { number: 3, title: 'Contact', titleFa: 'تماس', titleAr: 'اتصال' },
    { number: 4, title: 'Review', titleFa: 'بررسی', titleAr: 'مراجعة' },
  ];

  const handleStepComplete = (stepData: any) => {
    setFormData((prev: any) => ({ ...prev, ...stepData }));
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit verification
      onComplete('pending');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onCancel();
    }
  };

  const getStepTitle = (step: typeof steps[0]) => {
    if (language === 'fa') return step.titleFa;
    if (language === 'ar') return step.titleAr;
    return step.title;
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                    currentStep >= step.number
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-background border-border text-muted-foreground"
                  )}
                >
                  {currentStep > step.number ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </div>
                <span className={cn(
                  "text-xs font-medium text-center",
                  currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                )}>
                  {getStepTitle(step)}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-1 flex-1 mx-2 transition-all duration-300",
                    currentStep > step.number ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-card rounded-2xl border border-border p-6">
        {currentStep === 1 && (
          <Step1PersonalIdentity
            onNext={handleStepComplete}
            onBack={handleBack}
            initialData={formData.personalIdentity}
          />
        )}
        {currentStep === 2 && (
          <Step2Business
            onNext={handleStepComplete}
            onBack={handleBack}
            initialData={formData.businessInfo}
          />
        )}
        {currentStep === 3 && (
          <Step3Contact
            onNext={handleStepComplete}
            onBack={handleBack}
            initialData={formData.contactVerification}
          />
        )}
        {currentStep === 4 && (
          <Step4Review
            formData={formData}
            onSubmit={() => onComplete('pending')}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default VerificationFlow;

