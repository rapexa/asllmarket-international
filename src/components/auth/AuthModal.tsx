import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import RegisterFlow from './RegisterFlow';
import LoginFlow from './LoginFlow';

export type UserRole = 'buyer' | 'supplier' | 'visitor' | 'both' | 'market';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'login',
}) => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const [isMobile, setIsMobile] = useState(false);

  // Get redirect path from location state
  const from = (location.state as any)?.from?.pathname || null;

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle register success
  const handleRegisterSuccess = (role: UserRole) => {
    onClose();
    
    // Redirect based on role
    setTimeout(() => {
      if (role === 'buyer') {
        navigate('/dashboard/buyer', { replace: true });
      } else if (role === 'supplier') {
        navigate('/dashboard/supplier', { replace: true });
      } else if (role === 'visitor') {
        navigate('/dashboard/visitor', { replace: true });
      } else if (role === 'market') {
        navigate('/dashboard/market', { replace: true });
      } else if (role === 'both') {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }, 100);
  };

  // Handle login success
  const handleLoginSuccess = (role: UserRole) => {
    onClose();
    
    // Redirect based on role or return to previous page
    setTimeout(() => {
      if (from) {
        navigate(from, { replace: true });
      } else if (role === 'buyer') {
        navigate('/dashboard/buyer', { replace: true });
      } else if (role === 'supplier') {
        navigate('/dashboard/supplier', { replace: true });
      } else if (role === 'visitor') {
        navigate('/dashboard/visitor', { replace: true });
      } else if (role === 'market') {
        navigate('/dashboard/market', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }, 100);
  };

  // Reset tab when modal closes
  useEffect(() => {
    if (!isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  // Prevent body scroll when modal is open (mobile)
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "p-0 gap-0 max-w-5xl max-h-[95vh] overflow-hidden",
          "md:max-w-4xl",
          isMobile && "h-screen max-h-screen rounded-none w-full max-w-full"
        )}
      >
        {/* Header */}
        <DialogHeader className={cn(
          "px-6 pt-6 pb-4 border-b border-border shrink-0",
          isMobile && "px-4 pt-4"
        )}>
          <DialogTitle className="text-2xl font-bold text-center">
            {language === 'fa' 
              ? activeTab === 'login' ? 'ورود به حساب' : 'ایجاد حساب جدید'
              : language === 'ar'
              ? activeTab === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'
              : activeTab === 'login' ? 'Sign In' : 'Create Account'
            }
          </DialogTitle>
          <DialogDescription className="text-center">
            {language === 'fa'
              ? activeTab === 'login' 
                ? 'به پلتفرم B2B بین‌المللی خوش آمدید'
                : 'یک حساب کاربری جدید ایجاد کنید'
              : language === 'ar'
              ? activeTab === 'login'
                ? 'مرحباً بك في منصة B2B الدولية'
                : 'إنشاء حساب مستخدم جديد'
              : activeTab === 'login'
              ? 'Welcome to ASL Market International'
              : 'Create your account to get started'
            }
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'login' | 'register')}
          className="w-full"
        >
          <TabsList className={cn(
            "w-full rounded-none border-b border-border bg-muted/50",
            "grid grid-cols-2 h-14"
          )}>
            <TabsTrigger
              value="login"
              className={cn(
                "text-base font-semibold rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none",
                "border-b-2 border-transparent data-[state=active]:border-primary"
              )}
            >
              {language === 'fa' ? 'ورود' : language === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className={cn(
                "text-base font-semibold rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none",
                "border-b-2 border-transparent data-[state=active]:border-primary"
              )}
            >
              {language === 'fa' ? 'ثبت‌نام' : language === 'ar' ? 'تسجيل' : 'Register'}
            </TabsTrigger>
          </TabsList>

          {/* Login Content */}
          <TabsContent value="login" className={cn(
            "mt-0 p-6 overflow-y-auto",
            "max-h-[calc(95vh-200px)] md:max-h-[calc(95vh-180px)]",
            isMobile && "max-h-[calc(100vh-180px)] p-4"
          )}>
            <LoginFlow
              onSuccess={handleLoginSuccess}
              onClose={onClose}
            />
          </TabsContent>

          {/* Register Content */}
          <TabsContent value="register" className={cn(
            "mt-0 p-6 overflow-y-auto",
            "max-h-[calc(95vh-200px)] md:max-h-[calc(95vh-180px)]",
            isMobile && "max-h-[calc(100vh-180px)] p-4"
          )}>
            <RegisterFlow
              onSuccess={handleRegisterSuccess}
              onClose={onClose}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

