import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const basicInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  country: z.string().min(1, 'Please select a country'),
  phone: z.string().min(10, 'Invalid phone number'),
  language: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type BasicInfoForm = z.infer<typeof basicInfoSchema>;

interface Step2BasicInfoProps {
  onNext: (data: BasicInfoForm) => void;
  onBack: () => void;
  initialData?: Partial<BasicInfoForm>;
}

const countries = [
  { code: 'US', name: 'United States', nameFa: 'ایالات متحده', nameAr: 'الولايات المتحدة' },
  { code: 'IR', name: 'Iran', nameFa: 'ایران', nameAr: 'إيران' },
  { code: 'SA', name: 'Saudi Arabia', nameFa: 'عربستان سعودی', nameAr: 'المملكة العربية السعودية' },
  { code: 'AE', name: 'United Arab Emirates', nameFa: 'امارات متحده عربی', nameAr: 'الإمارات العربية المتحدة' },
  { code: 'CN', name: 'China', nameFa: 'چین', nameAr: 'الصين' },
  { code: 'IN', name: 'India', nameFa: 'هند', nameAr: 'الهند' },
  { code: 'GB', name: 'United Kingdom', nameFa: 'انگلستان', nameAr: 'المملكة المتحدة' },
  { code: 'DE', name: 'Germany', nameFa: 'آلمان', nameAr: 'ألمانيا' },
];

const Step2BasicInfo: React.FC<Step2BasicInfoProps> = ({ onNext, onBack, initialData }) => {
  const { t, language, dir } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<BasicInfoForm>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      email: initialData?.email || '',
      password: '',
      confirmPassword: '',
      country: initialData?.country || '',
      phone: initialData?.phone || '',
      language: initialData?.language || language,
    },
    mode: 'onChange',
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, label: '', color: '' };
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    if (strength <= 2) return { strength, label: 'Weak', color: 'bg-destructive' };
    if (strength <= 3) return { strength, label: 'Fair', color: 'bg-warning' };
    if (strength <= 4) return { strength, label: 'Good', color: 'bg-blue-500' };
    return { strength, label: 'Strong', color: 'bg-success' };
  };

  const passwordStrength = getPasswordStrength(password || '');

  const getCountryName = (country: typeof countries[0]) => {
    if (language === 'fa') return country.nameFa;
    if (language === 'ar') return country.nameAr;
    return country.name;
  };

  const onSubmit = (data: BasicInfoForm) => {
    onNext(data);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Basic Information
        </h2>
        <p className="text-muted-foreground">
          Please provide your basic account details
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-semibold">
              First Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="firstName"
              {...register('firstName')}
              placeholder="John"
              className={cn(
                "h-12 rounded-xl",
                errors.firstName && "border-destructive focus-visible:ring-destructive"
              )}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-semibold">
              Last Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="lastName"
              {...register('lastName')}
              placeholder="Doe"
              className={cn(
                "h-12 rounded-xl",
                errors.lastName && "border-destructive focus-visible:ring-destructive"
              )}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john.doe@example.com"
            className={cn(
              "h-12 rounded-xl",
              errors.email && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {errors.email && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <XCircle className="h-3 w-3" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-semibold">
            Password <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Create a strong password"
              className={cn(
                "h-12 rounded-xl pe-12",
                errors.password && "border-destructive focus-visible:ring-destructive"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {password && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-300",
                      passwordStrength.color
                    )}
                    style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                  />
                </div>
                <span className={cn(
                  "text-xs font-semibold",
                  passwordStrength.strength <= 2 && "text-destructive",
                  passwordStrength.strength === 3 && "text-warning",
                  passwordStrength.strength >= 4 && "text-success"
                )}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                {[
                  { check: password.length >= 8, label: '8+ characters' },
                  { check: /[A-Z]/.test(password), label: 'Uppercase' },
                  { check: /[a-z]/.test(password), label: 'Lowercase' },
                  { check: /[0-9]/.test(password), label: 'Number' },
                  { check: /[^A-Za-z0-9]/.test(password), label: 'Special' },
                ].map((req, i) => (
                  <div key={i} className="flex items-center gap-1">
                    {req.check ? (
                      <CheckCircle2 className="h-3 w-3 text-success" />
                    ) : (
                      <XCircle className="h-3 w-3 text-muted-foreground" />
                    )}
                    <span className={req.check ? 'text-success' : 'text-muted-foreground'}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {errors.password && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <XCircle className="h-3 w-3" />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-semibold">
            Confirm Password <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              placeholder="Confirm your password"
              className={cn(
                "h-12 rounded-xl pe-12",
                errors.confirmPassword && "border-destructive focus-visible:ring-destructive",
                confirmPassword && password === confirmPassword && !errors.confirmPassword && "border-success"
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {confirmPassword && password === confirmPassword && !errors.confirmPassword && (
            <p className="text-sm text-success flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Passwords match
            </p>
          )}
          {errors.confirmPassword && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <XCircle className="h-3 w-3" />
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Country & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-semibold">
              Country <span className="text-destructive">*</span>
            </Label>
            <Select
              value={watch('country')}
              onValueChange={(value) => setValue('country', value)}
            >
              <SelectTrigger
                id="country"
                className={cn(
                  "h-12 rounded-xl",
                  errors.country && "border-destructive"
                )}
              >
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {getCountryName(country)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                {errors.country.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-semibold">
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="+1 234 567 8900"
              className={cn(
                "h-12 rounded-xl",
                errors.phone && "border-destructive focus-visible:ring-destructive"
              )}
            />
            {errors.phone && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <Label htmlFor="language" className="text-sm font-semibold">
            Preferred Language
          </Label>
          <Select
            value={watch('language')}
            onValueChange={(value) => setValue('language', value)}
          >
            <SelectTrigger id="language" className="h-12 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">🇺🇸 English</SelectItem>
              <SelectItem value="fa">🇮🇷 فارسی</SelectItem>
              <SelectItem value="ar">🇸🇦 العربية</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onBack}
            className="rounded-xl px-8"
          >
            <ArrowLeft className={cn("me-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
            Back
          </Button>
          <Button
            type="submit"
            size="lg"
            disabled={!isValid}
            className="btn-gradient-primary rounded-xl px-12 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step2BasicInfo;

