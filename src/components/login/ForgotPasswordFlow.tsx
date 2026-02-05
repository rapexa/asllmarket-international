import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

const passwordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type EmailFormData = z.infer<typeof emailSchema>;
type OTPFormData = z.infer<typeof otpSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

interface ForgotPasswordFlowProps {
  onBack: () => void;
  onSuccess: () => void;
}

const ForgotPasswordFlow: React.FC<ForgotPasswordFlowProps> = ({ onBack, onSuccess }) => {
  const { t, language, dir } = useLanguage();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Email
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  // Step 2: OTP
  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  // Step 3: New Password
  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const handleSendResetLink = async (data: EmailFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      // In real app, call API to send reset link/OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      setEmail(data.email);
      setStep(2);
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (data: OTPFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      // In real app, verify OTP with backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(3);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data: PasswordFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      // In real app, reset password with backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSuccess();
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                step >= s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
            </div>
            {s < 3 && (
              <div
                className={cn(
                  "h-1 w-12",
                  step > s ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Enter Email */}
      {step === 1 && (
        <form onSubmit={emailForm.handleSubmit(handleSendResetLink)} className="space-y-6">
          <div className="text-center space-y-2 mb-6">
            <h3 className="text-2xl font-bold text-foreground">Reset Password</h3>
            <p className="text-muted-foreground">
              Enter your email address and we'll send you a reset code
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                {...emailForm.register('email')}
                placeholder="your.email@example.com"
                className={cn(
                  "h-12 rounded-xl ps-12",
                  emailForm.formState.errors.email && "border-destructive"
                )}
                disabled={isLoading}
              />
            </div>
            {emailForm.formState.errors.email && (
              <p className="text-sm text-destructive">
                {emailForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onBack}
              className="flex-1 rounded-xl"
              disabled={isLoading}
            >
              <ArrowLeft className={cn("me-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
              Back
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={!emailForm.formState.isValid || isLoading}
              className="flex-1 btn-gradient-primary rounded-xl disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send Reset Code'}
            </Button>
          </div>
        </form>
      )}

      {/* Step 2: Verify OTP */}
      {step === 2 && (
        <form onSubmit={otpForm.handleSubmit(handleVerifyOTP)} className="space-y-6">
          <div className="text-center space-y-2 mb-6">
            <h3 className="text-2xl font-bold text-foreground">Verify Code</h3>
            <p className="text-muted-foreground">
              We've sent a 6-digit code to <strong>{email}</strong>
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="otp" className="text-sm font-semibold">
              Enter Verification Code <span className="text-destructive">*</span>
            </Label>
            <Input
              id="otp"
              type="text"
              {...otpForm.register('otp')}
              placeholder="000000"
              className={cn(
                "h-14 text-center text-2xl font-mono tracking-widest rounded-xl",
                otpForm.formState.errors.otp && "border-destructive"
              )}
              maxLength={6}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                otpForm.setValue('otp', value);
              }}
              disabled={isLoading}
            />
            {otpForm.formState.errors.otp && (
              <p className="text-sm text-destructive">
                {otpForm.formState.errors.otp.message}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setStep(1)}
              className="flex-1 rounded-xl"
              disabled={isLoading}
            >
              <ArrowLeft className={cn("me-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
              Back
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={!otpForm.formState.isValid || isLoading}
              className="flex-1 btn-gradient-primary rounded-xl disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </div>
        </form>
      )}

      {/* Step 3: New Password */}
      {step === 3 && (
        <form onSubmit={passwordForm.handleSubmit(handleResetPassword)} className="space-y-6">
          <div className="text-center space-y-2 mb-6">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Create New Password</h3>
            <p className="text-muted-foreground">
              Enter a strong password for your account
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold">
              New Password <span className="text-destructive">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              {...passwordForm.register('password')}
              placeholder="Create a strong password"
              className={cn(
                "h-12 rounded-xl",
                passwordForm.formState.errors.password && "border-destructive"
              )}
              disabled={isLoading}
            />
            {passwordForm.formState.errors.password && (
              <p className="text-sm text-destructive">
                {passwordForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-semibold">
              Confirm Password <span className="text-destructive">*</span>
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              {...passwordForm.register('confirmPassword')}
              placeholder="Confirm your password"
              className={cn(
                "h-12 rounded-xl",
                passwordForm.formState.errors.confirmPassword && "border-destructive"
              )}
              disabled={isLoading}
            />
            {passwordForm.formState.errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {passwordForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={!passwordForm.formState.isValid || isLoading}
            className="w-full btn-gradient-primary rounded-xl h-12 disabled:opacity-50"
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
            <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
          </Button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordFlow;

