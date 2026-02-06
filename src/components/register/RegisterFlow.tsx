import React, { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import Step1RoleSelection from './steps/Step1RoleSelection';
import Step2BasicInfo from './steps/Step2BasicInfo';
import Step3BuyerProfile from './steps/Step3BuyerProfile';
import Step3SupplierProfile from './steps/Step3SupplierProfile';
import Step3VisitorProfile from './steps/Step3VisitorProfile';
import Step3MarketProfile from './steps/Step3MarketProfile';
import Step3BothProfile from './steps/Step3BothProfile';
import Step4Verification from './steps/Step4Verification';
import Step5Success from './steps/Step5Success';

export type UserRole = 'buyer' | 'supplier' | 'visitor' | 'both' | 'market';

interface RegisterData {
  role: UserRole | null;
  basicInfo: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    country: string;
    phone: string;
    language: string;
  };
  buyerProfile?: any;
  supplierProfile?: any;
  visitorProfile?: any;
  marketProfile?: any;
}

interface RegisterFlowProps {
  onComplete: (role: UserRole) => void;
  initialRole?: UserRole;
}

const RegisterFlow: React.FC<RegisterFlowProps> = ({ onComplete, initialRole }) => {
  const { t, dir } = useLanguage();
  const { register: authRegister } = useAuth();
  const [currentStep, setCurrentStep] = useState(initialRole ? 2 : 1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerData, setRegisterData] = useState<RegisterData>({
    role: initialRole || null,
    basicInfo: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      phone: '',
      language: 'en',
    },
  });

  const totalSteps = 5;
  const steps = [
    { number: 1, title: 'Role Selection', key: 'role' },
    { number: 2, title: 'Basic Info', key: 'basic' },
    { number: 3, title: 'Profile Details', key: 'profile' },
    { number: 4, title: 'Verification', key: 'verification' },
    { number: 5, title: 'Complete', key: 'complete' },
  ];

  const handleStepComplete = async (stepData: any) => {
    if (currentStep === 1) {
      setRegisterData(prev => ({ ...prev, role: stepData.role }));
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setRegisterData(prev => ({ ...prev, basicInfo: stepData }));
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (registerData.role === 'buyer') {
        setRegisterData(prev => ({ ...prev, buyerProfile: stepData }));
      } else if (registerData.role === 'supplier') {
        setRegisterData(prev => ({ ...prev, supplierProfile: stepData }));
      } else if (registerData.role === 'visitor') {
        setRegisterData(prev => ({ ...prev, visitorProfile: stepData }));
      } else if (registerData.role === 'market') {
        setRegisterData(prev => ({ ...prev, marketProfile: stepData }));
      } else if (registerData.role === 'both') {
        setRegisterData(prev => ({ ...prev, buyerProfile: stepData, supplierProfile: stepData }));
      }
      setCurrentStep(4);
    } else if (currentStep === 4) {
      // Step 4: Verification complete, now submit registration to backend
      setIsRegistering(true);
      setRegisterError(null);
      
      try {
        const { basicInfo, role } = registerData;
        const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`.trim();
        
        // Map 'both' to 'buyer' for backend (user can have both roles via separate mechanism)
        const backendRole = role === 'both' ? 'buyer' : role;
        
        await authRegister({
          email: basicInfo.email,
          password: basicInfo.password,
          fullName,
          phone: basicInfo.phone || undefined,
          role: backendRole as 'buyer' | 'supplier' | 'market' | 'visitor',
        });
        
        // Registration successful, move to success step
        setCurrentStep(5);
      } catch (error: any) {
        setRegisterError(error.message || 'Registration failed. Please try again.');
        setIsRegistering(false);
        // Stay on step 4 to show error
      }
    } else if (currentStep === 5) {
      if (registerData.role) {
        onComplete(registerData.role);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                      currentStep > step.number
                        ? "bg-success border-success text-success-foreground"
                        : currentStep === step.number
                        ? "bg-primary border-primary text-primary-foreground scale-110"
                        : "bg-muted border-border text-muted-foreground"
                    )}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <span className="font-bold">{step.number}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-2 text-xs font-medium text-center hidden md:block",
                      currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-1 flex-1 mx-2 transition-all duration-300",
                      currentStep > step.number ? "bg-success" : "bg-border"
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-card rounded-3xl shadow-2xl border border-border/50 p-8 md:p-12">
          {currentStep === 1 && (
            <Step1RoleSelection
              onNext={handleStepComplete}
              selectedRole={registerData.role}
              autoSelect={initialRole}
            />
          )}
          {currentStep === 2 && (
            <Step2BasicInfo
              onNext={handleStepComplete}
              onBack={handleBack}
              initialData={registerData.basicInfo}
            />
          )}
          {currentStep === 3 && registerData.role === 'buyer' && (
            <Step3BuyerProfile
              onNext={handleStepComplete}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && registerData.role === 'supplier' && (
            <Step3SupplierProfile
              onNext={handleStepComplete}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && registerData.role === 'visitor' && (
            <Step3VisitorProfile
              onNext={handleStepComplete}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && registerData.role === 'market' && (
            <Step3MarketProfile
              onNext={handleStepComplete}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && registerData.role === 'both' && (
            <Step3BothProfile
              onNext={handleStepComplete}
              onBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <Step4Verification
              onNext={() => handleStepComplete({})}
              onBack={handleBack}
              email={registerData.basicInfo.email}
              phone={registerData.basicInfo.phone}
              isLoading={isRegistering}
              error={registerError}
            />
          )}
          {currentStep === 5 && (
            <Step5Success
              role={registerData.role || 'buyer'}
              onComplete={() => {
                if (registerData.role) {
                  onComplete(registerData.role);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterFlow;

