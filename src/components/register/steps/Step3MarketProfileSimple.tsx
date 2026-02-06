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

const marketProfileSchema = z.object({
  marketName: z.string().min(2, 'Market name is required'),
  marketType: z.string().min(1, 'Please select market type'),
  marketDescription: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
});

type MarketProfileForm = z.infer<typeof marketProfileSchema>;

interface Step3MarketProfileProps {
  onNext: (data: MarketProfileForm) => void;
  onBack: () => void;
}

const Step3MarketProfile: React.FC<Step3MarketProfileProps> = ({ onNext, onBack }) => {
  const { t, language, dir } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MarketProfileForm>({
    resolver: zodResolver(marketProfileSchema),
    defaultValues: {
      marketName: '',
      marketType: '',
      marketDescription: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: MarketProfileForm) => {
    onNext(data);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Market Profile
        </h2>
        <p className="text-muted-foreground">
          Tell us about your marketplace or trading platform
        </p>
      </div>

      {/* Verification Notice */}
      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          Your market application will be reviewed by our team. You can complete your full profile after approval.
        </AlertDescription>
      </Alert>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Market Name */}
        <div className="space-y-2">
          <Label htmlFor="marketName" className="text-sm font-semibold">
            Market Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="marketName"
            {...register('marketName')}
            placeholder="Your market or platform name"
            className={cn(
              "h-12 rounded-xl",
              errors.marketName && "border-destructive"
            )}
          />
          {errors.marketName && (
            <p className="text-sm text-destructive">{errors.marketName.message}</p>
          )}
        </div>

        {/* Market Type */}
        <div className="space-y-2">
          <Label htmlFor="marketType" className="text-sm font-semibold">
            Market Type <span className="text-destructive">*</span>
          </Label>
          <select
            id="marketType"
            {...register('marketType')}
            className={cn(
              "h-12 rounded-xl w-full border border-input bg-background px-3 py-2 text-sm",
              errors.marketType && "border-destructive"
            )}
            defaultValue=""
          >
            <option value="" disabled>
              Select market type
            </option>
            <option value="physical">Physical Market</option>
            <option value="digital">Digital Marketplace</option>
            <option value="hybrid">Hybrid Market</option>
            <option value="trading_hub">Trading Hub</option>
          </select>
          {errors.marketType && (
            <p className="text-sm text-destructive">{errors.marketType.message}</p>
          )}
        </div>

        {/* Market Description */}
        <div className="space-y-2">
          <Label htmlFor="marketDescription" className="text-sm font-semibold">
            Market Description <span className="text-muted-foreground text-xs">(Optional)</span>
          </Label>
          <Textarea
            id="marketDescription"
            {...register('marketDescription')}
            placeholder="Describe your market, its focus, and target audience"
            className="rounded-xl min-h-[120px]"
          />
          {errors.marketDescription && (
            <p className="text-sm text-destructive">{errors.marketDescription.message}</p>
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

export default Step3MarketProfile;
