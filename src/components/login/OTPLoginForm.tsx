import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, ArrowRight, ArrowLeft, Clock, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const otpLoginSchema = z.object({
  method: z.enum(['email', 'phone']),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  otp: z.string().length(6, 'OTP must be 6 digits'),
}).refine((data) => {
  if (data.method === 'email') {
    return data.email && z.string().email().safeParse(data.email).success;
  }
  return data.phone && data.phone.length >= 10;
}, {
  message: 'Please provide a valid email or phone number',
});

type OTPLoginFormData = z.infer<typeof otpLoginSchema>;

interface OTPLoginFormProps {
  onLogin: (data: OTPLoginFormData) => Promise<void>;
  onBack: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const OTPLoginForm: React.FC<OTPLoginFormProps> = ({
  onLogin,
  onBack,
  isLoading = false,
  error,
}) => {
  const { t, language, dir } = useLanguage();
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<OTPLoginFormData>({
    resolver: zodResolver(otpLoginSchema),
    defaultValues: {
      method: 'email',
      email: '',
      phone: '',
      otp: '',
    },
    mode: 'onChange',
  });

  const method = watch('method');

  // Countdown timer
  useEffect(() => {
    if (resendTimer > 0 && otpSent) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer, otpSent]);

  const handleSendOTP = async () => {
    const data = watch();
    if ((method === 'email' && data.email) || (method === 'phone' && data.phone)) {
      // In real app, send OTP to backend
      setOtpSent(true);
      setResendTimer(60);
    }
  };

  const onSubmit = async (data: OTPLoginFormData) => {
    await onLogin(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Method Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Login Method <span className="text-destructive">*</span>
        </Label>
        <Select
          value={method}
          onValueChange={(value: 'email' | 'phone') => {
            setValue('method', value);
            setOtpSent(false);
          }}
          disabled={isLoading}
        >
          <SelectTrigger className="h-12 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone Number</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Email or Phone Input */}
      {method === 'email' ? (
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Mail className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="your.email@example.com"
              className={cn(
                "h-12 rounded-xl ps-12",
                errors.email && "border-destructive"
              )}
              disabled={isLoading || otpSent}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-semibold">
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Phone className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="+1 234 567 8900"
              className={cn(
                "h-12 rounded-xl ps-12",
                errors.phone && "border-destructive"
              )}
              disabled={isLoading || otpSent}
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
      )}

      {/* OTP Input */}
      {otpSent && (
        <div className="space-y-2 animate-fade-in">
          <Label htmlFor="otp" className="text-sm font-semibold">
            Enter OTP Code <span className="text-destructive">*</span>
          </Label>
          <Input
            id="otp"
            type="text"
            {...register('otp')}
            placeholder="000000"
            className={cn(
              "h-14 text-center text-2xl font-mono tracking-widest rounded-xl",
              errors.otp && "border-destructive"
            )}
            maxLength={6}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setValue('otp', value);
            }}
            disabled={isLoading}
          />
          {errors.otp && (
            <p className="text-sm text-destructive">{errors.otp.message}</p>
          )}
          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={resendTimer > 0}
              className="text-primary hover:text-primary/80 font-medium flex items-center gap-2"
            >
              {resendTimer > 0 ? (
                <>
                  <Clock className="h-4 w-4" />
                  Resend in {resendTimer}s
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Resend OTP
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-4">
        {!otpSent ? (
          <Button
            type="button"
            size="lg"
            onClick={handleSendOTP}
            disabled={!isValid || isLoading}
            className="w-full btn-gradient-primary rounded-xl h-12 text-base font-semibold"
          >
            Send OTP
            <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
          </Button>
        ) : (
          <Button
            type="submit"
            size="lg"
            disabled={!isValid || isLoading}
            className="w-full btn-gradient-primary rounded-xl h-12 text-base font-semibold disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                <span>Verifying...</span>
              </div>
            ) : (
              <>
                Verify & Sign In
                <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
              </>
            )}
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          className="w-full rounded-xl h-12"
          disabled={isLoading}
        >
          <ArrowLeft className={cn("me-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
          Back to Password Login
        </Button>
      </div>
    </form>
  );
};

export default OTPLoginForm;

