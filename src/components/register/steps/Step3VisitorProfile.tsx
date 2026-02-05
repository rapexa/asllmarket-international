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

const visitorProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  country: z.string().min(1, 'Please select country'),
  city: z.string().optional(),
  areaOfActivity: z.array(z.string()).min(1, 'Select at least one area'),
  interestedCategories: z.array(z.string()).optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  resume: z.instanceof(File).optional(),
});

type VisitorProfileForm = z.infer<typeof visitorProfileSchema>;

interface Step3VisitorProfileProps {
  onNext: (data: VisitorProfileForm) => void;
  onBack: () => void;
}

const areasOfActivity = [
  'Sales',
  'Marketing',
  'Distribution',
  'Sourcing',
  'Logistics',
  'Consulting',
];

const categories = [
  'Electronics & Technology',
  'Fashion & Apparel',
  'Industrial Machinery',
  'Food & Beverages',
  'Beauty & Health',
  'Home & Living',
];

const countries = [
  'United States', 'China', 'India', 'Germany', 'United Kingdom',
  'Iran', 'Saudi Arabia', 'UAE', 'Turkey', 'Other',
];

const Step3VisitorProfile: React.FC<Step3VisitorProfileProps> = ({ onNext, onBack }) => {
  const { t, language, dir } = useLanguage();
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<VisitorProfileForm>({
    resolver: zodResolver(visitorProfileSchema),
    defaultValues: {
      fullName: '',
      country: '',
      city: '',
      areaOfActivity: [],
      interestedCategories: [],
      bio: '',
    },
    mode: 'onChange',
  });

  const areaOfActivity = watch('areaOfActivity') || [];
  const interestedCategories = watch('interestedCategories') || [];

  const toggleArea = (area: string) => {
    const current = areaOfActivity;
    if (current.includes(area)) {
      setValue('areaOfActivity', current.filter(a => a !== area));
    } else {
      setValue('areaOfActivity', [...current, area]);
    }
  };

  const toggleCategory = (category: string) => {
    const current = interestedCategories;
    if (current.includes(category)) {
      setValue('interestedCategories', current.filter(c => c !== category));
    } else {
      setValue('interestedCategories', [...current, category]);
    }
  };

  const handleFileUpload = (file: File) => {
    setResumeFile(file);
    setValue('resume', file);
  };

  const onSubmit = (data: VisitorProfileForm) => {
    onNext(data);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Visitor / Agent Profile
        </h2>
        <p className="text-muted-foreground">
          Tell us about yourself and your interests
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
            Personal Information
          </h3>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-semibold">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              {...register('fullName')}
              placeholder="Your full name"
              className={cn(
                "h-12 rounded-xl",
                errors.fullName && "border-destructive"
              )}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName.message}</p>
            )}
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
        </div>

        {/* Activity & Interests */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
            Activity & Interests
          </h3>

          <div className="space-y-3">
            <Label className="text-sm font-semibold">
              Area of Activity <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {areasOfActivity.map((area) => (
                <div
                  key={area}
                  className="flex items-center space-x-2 p-3 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-colors"
                  onClick={() => toggleArea(area)}
                >
                  <Checkbox
                    checked={areaOfActivity.includes(area)}
                    onCheckedChange={() => toggleArea(area)}
                  />
                  <Label className="text-sm font-normal cursor-pointer flex-1">
                    {area}
                  </Label>
                </div>
              ))}
            </div>
            {errors.areaOfActivity && (
              <p className="text-sm text-destructive">{errors.areaOfActivity.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold">
              Interested Categories <span className="text-muted-foreground text-xs">(Optional)</span>
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
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2 pt-6 border-t border-border">
          <Label htmlFor="bio" className="text-sm font-semibold">
            Short Bio / Description <span className="text-muted-foreground text-xs">(Optional)</span>
          </Label>
          <Textarea
            id="bio"
            {...register('bio')}
            placeholder="Tell us about yourself, your experience, and what you're looking for..."
            className="min-h-32 rounded-xl resize-none"
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground text-end">
            {watch('bio')?.length || 0} / 500 characters
          </p>
          {errors.bio && (
            <p className="text-sm text-destructive">{errors.bio.message}</p>
          )}
        </div>

        {/* Resume Upload */}
        <div className="space-y-2 pt-6 border-t border-border">
          <Label className="text-sm font-semibold">
            Upload Resume or Document <span className="text-muted-foreground text-xs">(Optional)</span>
          </Label>
          <div className="relative">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              id="resume"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
            <label
              htmlFor="resume"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors"
            >
              {resumeFile ? (
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-5 w-5 text-success" />
                  <span className="font-medium">{resumeFile.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setResumeFile(null);
                    }}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Click to upload resume</span>
                </>
              )}
            </label>
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
            Create Account
            <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step3VisitorProfile;

