import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, Upload, FileText, X, AlertCircle } from 'lucide-react';
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
import { Alert, AlertDescription } from '@/components/ui/alert';

const supplierProfileSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  registrationNumber: z.string().min(5, 'Registration number is required'),
  countryOfOperation: z.string().min(1, 'Please select country'),
  companyAddress: z.string().min(10, 'Address must be at least 10 characters'),
  contactPersonName: z.string().min(2, 'Contact person name is required'),
  contactPhone: z.string().min(10, 'Invalid phone number'),
  businessEmail: z.string().email('Invalid email address'),
  productCategories: z.array(z.string()).min(1, 'Select at least one category'),
  moq: z.string().min(1, 'Please specify MOQ'),
  exportCountries: z.array(z.string()).optional(),
  yearsOfExperience: z.string().min(1, 'Please select years of experience'),
  tradeLicense: z.instanceof(File).optional(),
  companyCertificate: z.instanceof(File).optional(),
});

type SupplierProfileForm = z.infer<typeof supplierProfileSchema>;

interface Step3SupplierProfileProps {
  onNext: (data: SupplierProfileForm) => void;
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

const countries = [
  'United States', 'China', 'India', 'Germany', 'United Kingdom',
  'Iran', 'Saudi Arabia', 'UAE', 'Turkey', 'Other',
];

const Step3SupplierProfile: React.FC<Step3SupplierProfileProps> = ({ onNext, onBack }) => {
  const { t, language, dir } = useLanguage();
  const [tradeLicenseFile, setTradeLicenseFile] = useState<File | null>(null);
  const [companyCertificateFile, setCompanyCertificateFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<SupplierProfileForm>({
    resolver: zodResolver(supplierProfileSchema),
    defaultValues: {
      companyName: '',
      registrationNumber: '',
      countryOfOperation: '',
      companyAddress: '',
      contactPersonName: '',
      contactPhone: '',
      businessEmail: '',
      productCategories: [],
      moq: '',
      exportCountries: [],
      yearsOfExperience: '',
    },
    mode: 'onChange',
  });

  const productCategories = watch('productCategories') || [];
  const exportCountries = watch('exportCountries') || [];

  const toggleCategory = (category: string) => {
    const current = productCategories;
    if (current.includes(category)) {
      setValue('productCategories', current.filter(c => c !== category));
    } else {
      setValue('productCategories', [...current, category]);
    }
  };

  const toggleExportCountry = (country: string) => {
    const current = exportCountries;
    if (current.includes(country)) {
      setValue('exportCountries', current.filter(c => c !== country));
    } else {
      setValue('exportCountries', [...current, country]);
    }
  };

  const handleFileUpload = (file: File, type: 'license' | 'certificate') => {
    if (type === 'license') {
      setTradeLicenseFile(file);
      setValue('tradeLicense', file);
    } else {
      setCompanyCertificateFile(file);
      setValue('companyCertificate', file);
    }
  };

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
          Your account will be marked as <strong>"Pending Verification"</strong> until we review your documents. This usually takes 1-3 business days.
        </AlertDescription>
      </Alert>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Company Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
            Company Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="space-y-2">
              <Label htmlFor="registrationNumber" className="text-sm font-semibold">
                Business Registration Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="registrationNumber"
                {...register('registrationNumber')}
                placeholder="Registration number"
                className={cn(
                  "h-12 rounded-xl",
                  errors.registrationNumber && "border-destructive"
                )}
              />
              {errors.registrationNumber && (
                <p className="text-sm text-destructive">{errors.registrationNumber.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="countryOfOperation" className="text-sm font-semibold">
                Country of Operation <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watch('countryOfOperation')}
                onValueChange={(value) => setValue('countryOfOperation', value)}
              >
                <SelectTrigger
                  id="countryOfOperation"
                  className={cn(
                    "h-12 rounded-xl",
                    errors.countryOfOperation && "border-destructive"
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
              {errors.countryOfOperation && (
                <p className="text-sm text-destructive">{errors.countryOfOperation.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearsOfExperience" className="text-sm font-semibold">
                Years of Experience <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watch('yearsOfExperience')}
                onValueChange={(value) => setValue('yearsOfExperience', value)}
              >
                <SelectTrigger
                  id="yearsOfExperience"
                  className={cn(
                    "h-12 rounded-xl",
                    errors.yearsOfExperience && "border-destructive"
                  )}
                >
                  <SelectValue placeholder="Select years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="2-5">2-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="11-20">11-20 years</SelectItem>
                  <SelectItem value="20+">20+ years</SelectItem>
                </SelectContent>
              </Select>
              {errors.yearsOfExperience && (
                <p className="text-sm text-destructive">{errors.yearsOfExperience.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyAddress" className="text-sm font-semibold">
              Company Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="companyAddress"
              {...register('companyAddress')}
              placeholder="Full company address"
              className={cn(
                "h-12 rounded-xl",
                errors.companyAddress && "border-destructive"
              )}
            />
            {errors.companyAddress && (
              <p className="text-sm text-destructive">{errors.companyAddress.message}</p>
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
              placeholder="business@company.com"
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

        {/* Business Details */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
            Business Details
          </h3>

          <div className="space-y-3">
            <Label className="text-sm font-semibold">
              Product Categories <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((category) => (
                <div
                  key={category}
                  className="flex items-center space-x-2 p-3 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-colors"
                  onClick={() => toggleCategory(category)}
                >
                  <Checkbox
                    checked={productCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label className="text-sm font-normal cursor-pointer flex-1">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
            {errors.productCategories && (
              <p className="text-sm text-destructive">{errors.productCategories.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="moq" className="text-sm font-semibold">
                Minimum Order Quantity (MOQ) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="moq"
                {...register('moq')}
                placeholder="e.g., 100 units"
                className={cn(
                  "h-12 rounded-xl",
                  errors.moq && "border-destructive"
                )}
              />
              {errors.moq && (
                <p className="text-sm text-destructive">{errors.moq.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Export Countries <span className="text-muted-foreground text-xs">(Optional)</span>
              </Label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 border border-border rounded-xl">
                {countries.slice(0, 6).map((country) => (
                  <div
                    key={country}
                    className="flex items-center space-x-2"
                    onClick={() => toggleExportCountry(country)}
                  >
                    <Checkbox
                      checked={exportCountries.includes(country)}
                      onCheckedChange={() => toggleExportCountry(country)}
                    />
                    <Label className="text-xs font-normal cursor-pointer">{country}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Document Upload */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
            Business Documents <span className="text-muted-foreground text-sm font-normal">(Optional but Recommended)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trade License */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Trade License
              </Label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="tradeLicense"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'license');
                  }}
                />
                <label
                  htmlFor="tradeLicense"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {tradeLicenseFile ? (
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-5 w-5 text-success" />
                      <span className="font-medium">{tradeLicenseFile.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTradeLicenseFile(null);
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

            {/* Company Certificate */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Company Certificate
              </Label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="companyCertificate"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'certificate');
                  }}
                />
                <label
                  htmlFor="companyCertificate"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {companyCertificateFile ? (
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-5 w-5 text-success" />
                      <span className="font-medium">{companyCertificateFile.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCompanyCertificateFile(null);
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

export default Step3SupplierProfile;

