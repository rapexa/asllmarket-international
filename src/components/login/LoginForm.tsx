import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onLogin: (data: LoginFormData) => Promise<void>;
  onSwitchToOTP: () => void;
  onForgotPassword: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onSwitchToOTP,
  onForgotPassword,
  isLoading = false,
  error,
}) => {
  const { t, language, dir } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
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

      {/* Email Field */}
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
              errors.email && "border-destructive focus-visible:ring-destructive"
            )}
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-semibold">
            Password <span className="text-destructive">*</span>
          </Label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            Forgot Password?
          </button>
        </div>
        <div className="relative">
          <Lock className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="Enter your password"
            className={cn(
              "h-12 rounded-xl ps-12 pe-12",
              errors.password && "border-destructive focus-visible:ring-destructive"
            )}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute end-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Remember Me & OTP Switch */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            {...register('rememberMe')}
            disabled={isLoading}
          />
          <Label
            htmlFor="rememberMe"
            className="text-sm font-normal cursor-pointer"
          >
            Remember me
          </Label>
        </div>
        <button
          type="button"
          onClick={onSwitchToOTP}
          className="text-sm text-primary hover:text-primary/80 font-medium"
          disabled={isLoading}
        >
          Login with OTP
        </button>
      </div>

      {/* Security Indicator */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
        <Lock className="h-3 w-3" />
        <span>Secure login with encrypted connection</span>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={!isValid || isLoading}
        className="w-full btn-gradient-primary rounded-xl h-12 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            <span>Signing in...</span>
          </div>
        ) : (
          <>
            Sign In
            <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
          </>
        )}
      </Button>
    </form>
  );
};

export default LoginForm;

