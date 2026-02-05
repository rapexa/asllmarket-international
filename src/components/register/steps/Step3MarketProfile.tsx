import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, Upload, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Alert, AlertDescription } from '@/components/ui/alert';

const marketProfileSchema = z.object({
  marketName: z.string().min(2, 'Market name is required'),
  marketType: z.string().min(1, 'Please select market type'),
  country: z.string().min(1, 'Please select country'),
  city: z.string().optional(),
  marketAddress: z.string().min(10, 'Address must be at least 10 characters'),
  contactPersonName: z.string().min(2, 'Contact person name is required'),
  contactPhone: z.string().min(10, 'Invalid phone number'),
  businessEmail: z.string().email('Invalid email address'),
  marketCategories: z.array(z.string()).min(1, 'Select at least one category'),
  numberOfStalls: z.string().optional(),
  operatingHours: z.string().optional(),
  marketDescription: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  businessLicense: z.instanceof(File).optional(),
  marketCertificate: z.instanceof(File).optional(),
});

type MarketProfileForm = z.infer<typeof marketProfileSchema>;

interface Step3MarketProfileProps {
  onNext: (data: MarketProfileForm) => void;
  onBack: () => void;
}

const marketTypes = [
  'Physical Market',
  'Digital Marketplace',
  'Hybrid Market',
  'Trading Hub',
  'Wholesale Market',
  'Retail Market',
];

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

const countries = [
  'United States', 'China', 'India', 'Germany', 'United Kingdom',
  'Iran', 'Saudi Arabia', 'UAE', 'Turkey', 'Other',
];

const Step3MarketProfile: React.FC<Step3MarketProfileProps> = ({ onNext, onBack }) => {
  const { t, language, dir } = useLanguage();
  const [businessLicenseFile, setBusinessLicenseFile] = useState<File | null>(null);
  const [marketCertificateFile, setMarketCertificateFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<MarketProfileForm>({
    resolver: zodResolver(marketProfileSchema),
    defaultValues: {
      marketName: '',
      marketType: '',
      country: '',
      city: '',
      marketAddress: '',
      contactPersonName: '',
      contactPhone: '',
      businessEmail: '',
      marketCategories: [],
      numberOfStalls: '',
      operatingHours: '',
      marketDescription: '',
    },
    mode: 'onChange',
  });

  const marketCategories = watch('marketCategories') || [];

  const toggleCategory = (category: string) => {
    const current = marketCategories;
    if (current.includes(category)) {
      setValue('marketCategories', current.filter(c => c !== category));
    } else {
      setValue('marketCategories', [...current, category]);
    }
  };

  const handleFileUpload = (file: File, type: 'license' | 'certificate') => {
    if (type === 'license') {
      setBusinessLicenseFile(file);
      setValue('businessLicense', file);
    } else {
      setMarketCertificateFile(file);
      setValue('marketCertificate', file);
    }
  };

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
          Complete your market profile to start your trading platform
        </p>
      </div>

      {/* Verification Notice */}
      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          Your market account will be reviewed by our team. You'll receive an email notification once approved (usually within 2-5 business days).
        </AlertDescription>
      </Alert>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Market Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
            Market Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="marketName" className="text-sm font-semibold">
                Market Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="marketName"
                {...register('marketName')}
                placeholder="Your market name"
                className={cn(
                  "h-12 rounded-xl",
                  errors.marketName && "border-destructive"
                )}
              />
              {errors.marketName && (
                <p className="text-sm text-destructive">{errors.marketName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="marketType" className="text-sm font-semibold">
                Market Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watch('marketType')}
                onValueChange={(value) => setValue('marketType', value)}
              >
                <SelectTrigger
                  id="marketType"
                  className={cn(
                    "h-12 rounded-xl",
                    errors.marketType && "border-destructive"
                  )}
                >
                  <SelectValue placeholder="Select market type" />
                </SelectTrigger>
                <SelectContent>
                  {marketTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.marketType && (
                <p className="text-sm text-destructive">{errors.marketType.message}</p>
              )}
            </div>
          </div>

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
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-sm text-destructive">{errors.country.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-semibold">
                City <span className="text-muted-foreground text-xs">(Optional)</span>
              </Label>
              <Input
                id="city"
                {...register('city')}
                placeholder="Your city"
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="marketAddress" className="text-sm font-semibold">
              Market Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="marketAddress"
              {...register('marketAddress')}
              placeholder="Full market address"
              className={cn(
                "h-12 rounded-xl",
                errors.marketAddress && "border-destructive"
              )}
            />
            {errors.marketAddress && (
              <p className="text-sm text-destructive">{errors.marketAddress.message}</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactPersonName" className="text-sm font-semibold">
                Contact Person Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="contactPersonName"
                {...register('contactPersonName')}
                placeholder="Full name"
                className={cn(
                  "h-12 rounded-xl",
                  errors.contactPersonName && "border-destructive"
                )}
              />
              {errors.contactPersonName && (
                <p className="text-sm text-destructive">{errors.contactPersonName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone" className="text-sm font-semibold">
                Contact Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="contactPhone"
                type="tel"
                {...register('contactPhone')}
                placeholder="+1 234 567 8900"
                className={cn(
                  "h-12 rounded-xl",
                  errors.contactPhone && "border-destructive"
                )}
              />
              {errors.contactPhone && (
                <p className="text-sm text-destructive">{errors.contactPhone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessEmail" className="text-sm font-semibold">
              Business Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="businessEmail"
              type="email"
              {...register('businessEmail')}
              placeholder="business@market.com"
              className={cn(
                "h-12 rounded-xl",
                errors.businessEmail && "border-destructive"
              )}
            />
            {errors.businessEmail && (
              <p className="text-sm text-destructive">{errors.businessEmail.message}</p>
            )}
          </div>
        </div>

        {/* Market Details */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
            Market Details
          </h3>

          <div className="space-y-3">
            <Label className="text-sm font-semibold">
              Market Categories <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((category) => (
                <div
                  key={category}
                  className="flex items-center space-x-2 p-3 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-colors"
                  onClick={() => toggleCategory(category)}
                >
                  <Checkbox
                    checked={marketCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label className="text-sm font-normal cursor-pointer flex-1">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
            {errors.marketCategories && (
              <p className="text-sm text-destructive">{errors.marketCategories.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="numberOfStalls" className="text-sm font-semibold">
                Number of Stalls/Vendors <span className="text-muted-foreground text-xs">(Optional)</span>
              </Label>
              <Input
                id="numberOfStalls"
                {...register('numberOfStalls')}
                placeholder="e.g., 50 stalls"
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="operatingHours" className="text-sm font-semibold">
                Operating Hours <span className="text-muted-foreground text-xs">(Optional)</span>
              </Label>
              <Input
                id="operatingHours"
                {...register('operatingHours')}
                placeholder="e.g., 9 AM - 6 PM"
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="marketDescription" className="text-sm font-semibold">
              Market Description <span className="text-muted-foreground text-xs">(Optional)</span>
            </Label>
            <Textarea
              id="marketDescription"
              {...register('marketDescription')}
              placeholder="Describe your market, its specialties, and what makes it unique..."
              className="min-h-32 rounded-xl resize-none"
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground text-end">
              {watch('marketDescription')?.length || 0} / 1000 characters
            </p>
            {errors.marketDescription && (
              <p className="text-sm text-destructive">{errors.marketDescription.message}</p>
            )}
          </div>
        </div>

        {/* Document Upload */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
            Business Documents <span className="text-muted-foreground text-sm font-normal">(Optional but Recommended)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business License */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Business License
              </Label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="businessLicense"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'license');
                  }}
                />
                <label
                  htmlFor="businessLicense"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {businessLicenseFile ? (
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-5 w-5 text-success" />
                      <span className="font-medium">{businessLicenseFile.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setBusinessLicenseFile(null);
                        }}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Click to upload</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Market Certificate */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Market Certificate
              </Label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="marketCertificate"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'certificate');
                  }}
                />
                <label
                  htmlFor="marketCertificate"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {marketCertificateFile ? (
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-5 w-5 text-success" />
                      <span className="font-medium">{marketCertificateFile.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMarketCertificateFile(null);
                        }}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Click to upload</span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
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
            Submit & Continue
            <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step3MarketProfile;

