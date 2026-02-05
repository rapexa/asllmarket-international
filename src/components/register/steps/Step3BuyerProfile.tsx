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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const buyerProfileSchema = z.object({
  companyName: z.string().optional(),
  businessType: z.string().min(1, 'Please select business type'),
  interestedCategories: z.array(z.string()).min(1, 'Select at least one category'),
  estimatedVolume: z.string().min(1, 'Please select estimated volume'),
  contactMethod: z.string().min(1, 'Please select contact method'),
});

type BuyerProfileForm = z.infer<typeof buyerProfileSchema>;

interface Step3BuyerProfileProps {
  onNext: (data: BuyerProfileForm) => void;
  onBack: () => void;
}

const categories = [
  'Electronics & Technology',
  'Fashion & Apparel',
  'Industrial Machinery',
  'Food & Beverages',
  'Beauty & Health',
  'Home & Living',
  'Construction Materials',
  'Automotive',
  'Packaging',
  'Agriculture',
];

const Step3BuyerProfile: React.FC<Step3BuyerProfileProps> = ({ onNext, onBack }) => {
  const { t, language, dir } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<BuyerProfileForm>({
    resolver: zodResolver(buyerProfileSchema),
    defaultValues: {
      companyName: '',
      businessType: '',
      interestedCategories: [],
      estimatedVolume: '',
      contactMethod: '',
    },
    mode: 'onChange',
  });

  const interestedCategories = watch('interestedCategories') || [];

  const toggleCategory = (category: string) => {
    const current = interestedCategories;
    if (current.includes(category)) {
      setValue('interestedCategories', current.filter(c => c !== category));
    } else {
      setValue('interestedCategories', [...current, category]);
    }
  };

  const onSubmit = (data: BuyerProfileForm) => {
    onNext(data);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Buyer Profile
        </h2>
        <p className="text-muted-foreground">
          Tell us more about your business needs
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
          <Select
            value={watch('businessType')}
            onValueChange={(value) => setValue('businessType', value)}
          >
            <SelectTrigger
              id="businessType"
              className={cn(
                "h-12 rounded-xl",
                errors.businessType && "border-destructive"
              )}
            >
              <SelectValue placeholder="Select your business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retailer">Retailer</SelectItem>
              <SelectItem value="wholesaler">Wholesaler</SelectItem>
              <SelectItem value="distributor">Distributor</SelectItem>
              <SelectItem value="individual">Individual</SelectItem>
            </SelectContent>
          </Select>
          {errors.businessType && (
            <p className="text-sm text-destructive">{errors.businessType.message}</p>
          )}
        </div>

        {/* Interested Categories */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">
            Interested Categories <span className="text-destructive">*</span>
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((category) => (
              <div
                key={category}
                className="flex items-center space-x-2 p-3 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-colors"
                onClick={() => toggleCategory(category)}
              >
                <Checkbox
                  checked={interestedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label className="text-sm font-normal cursor-pointer flex-1">
                  {category}
                </Label>
              </div>
            ))}
          </div>
          {errors.interestedCategories && (
            <p className="text-sm text-destructive">{errors.interestedCategories.message}</p>
          )}
        </div>

        {/* Estimated Purchase Volume */}
        <div className="space-y-2">
          <Label htmlFor="estimatedVolume" className="text-sm font-semibold">
            Estimated Purchase Volume <span className="text-destructive">*</span>
          </Label>
          <Select
            value={watch('estimatedVolume')}
            onValueChange={(value) => setValue('estimatedVolume', value)}
          >
            <SelectTrigger
              id="estimatedVolume"
              className={cn(
                "h-12 rounded-xl",
                errors.estimatedVolume && "border-destructive"
              )}
            >
              <SelectValue placeholder="Select estimated volume" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-10k">Under $10,000/year</SelectItem>
              <SelectItem value="10k-50k">$10,000 - $50,000/year</SelectItem>
              <SelectItem value="50k-100k">$50,000 - $100,000/year</SelectItem>
              <SelectItem value="100k-500k">$100,000 - $500,000/year</SelectItem>
              <SelectItem value="500k-1m">$500,000 - $1M/year</SelectItem>
              <SelectItem value="over-1m">Over $1M/year</SelectItem>
            </SelectContent>
          </Select>
          {errors.estimatedVolume && (
            <p className="text-sm text-destructive">{errors.estimatedVolume.message}</p>
          )}
        </div>

        {/* Preferred Contact Method */}
        <div className="space-y-2">
          <Label htmlFor="contactMethod" className="text-sm font-semibold">
            Preferred Contact Method <span className="text-destructive">*</span>
          </Label>
          <Select
            value={watch('contactMethod')}
            onValueChange={(value) => setValue('contactMethod', value)}
          >
            <SelectTrigger
              id="contactMethod"
              className={cn(
                "h-12 rounded-xl",
                errors.contactMethod && "border-destructive"
              )}
            >
              <SelectValue placeholder="Select contact method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="telegram">Telegram</SelectItem>
            </SelectContent>
          </Select>
          {errors.contactMethod && (
            <p className="text-sm text-destructive">{errors.contactMethod.message}</p>
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
            Create Account
            <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step3BuyerProfile;

