import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/login/LoginForm';
import OTPLoginForm from '@/components/login/OTPLoginForm';
import ForgotPasswordFlow from '@/components/login/ForgotPasswordFlow';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

type LoginMode = 'password' | 'otp' | 'forgot';

const Login: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin, user } = useAuth();
  const [mode, setMode] = useState<LoginMode>('password');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Get redirect path from location state
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handlePasswordLogin = async (data: { email: string; password: string; rememberMe?: boolean }) => {
    setIsLoading(true);
    setError(null);
    try {
      await authLogin(data.email, data.password);

      setLoginSuccess(true);
      
      // Redirect based on role after successful login
      setTimeout(() => {
        // If we know the role, send user directly to role-based dashboard
        const role = (user?.role || localStorage.getItem('userRole')) as
          | 'buyer'
          | 'supplier'
          | 'market'
          | 'visitor'
          | 'admin'
          | null;

        if (role === 'buyer') {
          navigate('/dashboard/buyer', { replace: true });
        } else if (role === 'supplier') {
          navigate('/dashboard/supplier', { replace: true });
        } else if (role === 'market') {
          navigate('/dashboard/market', { replace: true });
        } else if (role === 'visitor') {
          navigate('/dashboard/visitor', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPLogin = async (data: { method: 'email' | 'phone'; email?: string; phone?: string; otp: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      // In real app, verify OTP and login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Store temporary auth session (OTP login defaults to buyer in this demo)
      localStorage.setItem('authToken', 'dev-auth-token');
      localStorage.setItem('userRole', 'buyer');
      if (data.email) localStorage.setItem('userEmail', data.email);

      setLoginSuccess(true);
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSuccess = () => {
    setMode('password');
    setError(null);
    // Show success message
  };

  if (loginSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center px-4">
        <Card className="p-8 sm:p-10 md:p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-success shrink-0" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">Login Successful!</h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Redirecting to your dashboard...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <div className="container py-8 sm:py-10 md:py-12 lg:py-20 px-4">
        <div className="max-w-md mx-auto">
          <Card className="bg-card rounded-2xl sm:rounded-3xl shadow-2xl border border-border/50 p-6 sm:p-8 md:p-10 lg:p-12">
            {/* Logo & Header */}
            <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-7 md:mb-8">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg shrink-0">
                  <span className="text-primary-foreground font-bold text-lg sm:text-xl">A</span>
                </div>
                <div className="text-start">
                  <h1 className="font-bold text-lg sm:text-xl text-foreground leading-tight">ASL Market</h1>
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground leading-tight">International Trade</p>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight px-2">
                Sign in to your account
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-4">
                Access your global B2B dashboard
              </p>
            </div>

            {/* Login Forms */}
            {mode === 'password' && (
              <LoginForm
                onLogin={handlePasswordLogin}
                onSwitchToOTP={() => setMode('otp')}
                onForgotPassword={() => setMode('forgot')}
                isLoading={isLoading}
                error={error}
              />
            )}

            {mode === 'otp' && (
              <OTPLoginForm
                onLogin={handleOTPLogin}
                onBack={() => {
                  setMode('password');
                  setError(null);
                }}
                isLoading={isLoading}
                error={error}
              />
            )}

            {mode === 'forgot' && (
              <ForgotPasswordFlow
                onBack={() => {
                  setMode('password');
                  setError(null);
                }}
                onSuccess={handleForgotPasswordSuccess}
              />
            )}

            {/* Register Link */}
            <div className="mt-4 sm:mt-5 md:mt-6 text-center px-4">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary/80 font-semibold underline whitespace-nowrap"
                >
                  Register now
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

