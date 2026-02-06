import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

const supplierProfileSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  businessType: z.string().min(1, 'Please select business type'),
  productCategories: z.string().min(1, 'Please describe your products'),
});

type SupplierProfileForm = z.infer<typeof supplierProfileSchema>;

interface Step3SupplierProfileProps {
  onNext: (data: SupplierProfileForm) => void;
  onBack: () => void;
}

const Step3SupplierProfile: React.FC<Step3SupplierProfileProps> = ({ onNext, onBack }) => {
  const { t, language, dir } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SupplierProfileForm>({
    resolver: zodResolver(supplierProfileSchema),
    defaultValues: {
      companyName: '',
      businessType: '',
      productCategories: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: SupplierProfileForm) => {
    onNext(data);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Supplier Profile
        </h2>
        <p className="text-muted-foreground">
          Complete your supplier profile to start selling globally
        </p>
      </div>

      {/* Verification Notice */}
      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          Your account will be marked as <strong>"Pending Verification"</strong> until we review your documents. You can complete your full profile after registration.
        </AlertDescription>
      </Alert>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Company Name */}
        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-sm font-semibold">
            Company Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="companyName"
            {...register('companyName')}
            placeholder="Your company name"
            className={cn(
              "h-12 rounded-xl",
              errors.companyName && "border-destructive"
            )}
          />
          {errors.companyName && (
            <p className="text-sm text-destructive">{errors.companyName.message}</p>
          )}
        </div>

        {/* Business Type */}
        <div className="space-y-2">
          <Label htmlFor="businessType" className="text-sm font-semibold">
            Business Type <span className="text-destructive">*</span>
          </Label>
          <select
            id="businessType"
            {...register('businessType')}
            className={cn(
              "h-12 rounded-xl w-full border border-input bg-background px-3 py-2 text-sm",
              errors.businessType && "border-destructive"
            )}
            defaultValue=""
          >
            <option value="" disabled>
              Select your business type
            </option>
            <option value="manufacturer">Manufacturer</option>
            <option value="wholesaler">Wholesaler</option>
            <option value="distributor">Distributor</option>
            <option value="trading_company">Trading Company</option>
            <option value="exporter">Exporter</option>
          </select>
          {errors.businessType && (
            <p className="text-sm text-destructive">{errors.businessType.message}</p>
          )}
        </div>

        {/* Product Categories */}
        <div className="space-y-2">
          <Label htmlFor="productCategories" className="text-sm font-semibold">
            Product Categories <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="productCategories"
            {...register('productCategories')}
            placeholder="Describe the products you supply (e.g., Electronics, Textiles, Machinery)"
            className={cn(
              "rounded-xl min-h-[100px]",
              errors.productCategories && "border-destructive"
            )}
          />
          {errors.productCategories && (
            <p className="text-sm text-destructive">{errors.productCategories.message}</p>
          )}
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

export default Step3SupplierProfile;
