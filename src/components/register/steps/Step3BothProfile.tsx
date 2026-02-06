import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const bothProfileSchema = z.object({
  companyName: z.string().optional(),
  businessType: z.string().min(1, 'Please select business type'),
});

type BothProfileForm = z.infer<typeof bothProfileSchema>;

interface Step3BothProfileProps {
  onNext: (data: BothProfileForm) => void;
  onBack: () => void;
}

const Step3BothProfile: React.FC<Step3BothProfileProps> = ({ onNext, onBack }) => {
  const { t, language, dir } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BothProfileForm>({
    resolver: zodResolver(bothProfileSchema),
    defaultValues: {
      companyName: '',
      businessType: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: BothProfileForm) => {
    onNext(data);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Buyer & Supplier Profile
        </h2>
        <p className="text-muted-foreground">
          You can buy and sell on ASL Market
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Company Name (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-sm font-semibold">
            Company Name <span className="text-muted-foreground text-xs">(Optional)</span>
          </Label>
          <Input
            id="companyName"
            {...register('companyName')}
            placeholder="Your company name"
            className="h-12 rounded-xl"
          />
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
            <option value="retailer">Retailer</option>
            <option value="wholesaler">Wholesaler</option>
            <option value="distributor">Distributor</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="trader">Trader</option>
          </select>
          {errors.businessType && (
            <p className="text-sm text-destructive">{errors.businessType.message}</p>
          )}
        </div>

        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            You can complete your detailed buyer and supplier profiles after registration from your dashboard.
          </p>
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

export default Step3BothProfile;
