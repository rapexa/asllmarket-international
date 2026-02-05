import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import DocumentUpload from '../DocumentUpload';
import type { PersonalIdentity, IDType } from '@/types/verification';
import { countryCodes, getCountryName } from '@/data/countryCodes';

const personalIdentitySchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  nationality: z.string().min(1, 'Please select nationality'),
  idType: z.enum(['passport', 'national_id']),
  idNumber: z.string().min(4, 'ID number must be at least 4 characters'),
  identityFront: z.any().refine((val) => val instanceof File, 'Please upload ID front side'),
  identityBack: z.any().optional(),
}).refine((data) => {
  // If national_id, back side is required
  if (data.idType === 'national_id') {
    return data.identityBack instanceof File;
  }
  return true;
}, {
  message: 'Please upload ID back side',
  path: ['identityBack'],
});

type PersonalIdentityForm = z.infer<typeof personalIdentitySchema>;

interface Step1PersonalIdentityProps {
  onNext: (data: PersonalIdentity) => void;
  onBack: () => void;
  initialData?: Partial<PersonalIdentity>;
}

const Step1PersonalIdentity: React.FC<Step1PersonalIdentityProps> = ({
  onNext,
  onBack,
  initialData,
}) => {
  const { language, dir } = useLanguage();
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<PersonalIdentityForm>({
    resolver: zodResolver(personalIdentitySchema),
    defaultValues: {
      fullName: initialData?.fullName || '',
      nationality: initialData?.nationality || '',
      idType: initialData?.idType || 'passport',
      idNumber: initialData?.idNumber || '',
    },
    mode: 'onChange',
  });

  const idType = watch('idType');

  const onSubmit = (data: PersonalIdentityForm) => {
    onNext({
      fullName: data.fullName,
      nationality: data.nationality,
      idType: data.idType as IDType,
      idNumber: data.idNumber,
      identityFront: frontFile ? {
        id: '1',
        type: 'identity_front',
        file: frontFile,
        preview: URL.createObjectURL(frontFile),
      } : undefined,
      identityBack: backFile ? {
        id: '2',
        type: 'identity_back',
        file: backFile,
        preview: URL.createObjectURL(backFile),
      } : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">
          {language === 'fa' ? 'احراز هویت شخصی' : language === 'ar' ? 'التحقق من الهوية الشخصية' : 'Personal Identity Verification'}
        </h3>
        <p className="text-muted-foreground">
          {language === 'fa'
            ? 'لطفاً اطلاعات هویتی خود را وارد کنید'
            : language === 'ar'
            ? 'يرجى إدخال معلومات الهوية الخاصة بك'
            : 'Please provide your identity information'}
        </p>
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-semibold">
          {language === 'fa' ? 'نام کامل' : language === 'ar' ? 'الاسم الكامل' : 'Full Name'} <span className="text-destructive">*</span>
        </Label>
        <Input
          id="fullName"
          {...register('fullName')}
          className={cn("h-12 rounded-xl", errors.fullName && "border-destructive")}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      {/* Nationality */}
      <div className="space-y-2">
        <Label htmlFor="nationality" className="text-sm font-semibold">
          {language === 'fa' ? 'ملیت' : language === 'ar' ? 'الجنسية' : 'Nationality'} <span className="text-destructive">*</span>
        </Label>
        <Select
          value={watch('nationality')}
          onValueChange={(value) => setValue('nationality', value)}
        >
          <SelectTrigger
            id="nationality"
            className={cn("h-12 rounded-xl", errors.nationality && "border-destructive")}
          >
            <SelectValue placeholder={language === 'fa' ? 'انتخاب ملیت' : language === 'ar' ? 'اختر الجنسية' : 'Select nationality'} />
          </SelectTrigger>
          <SelectContent>
            {countryCodes.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {getCountryName(country, language)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.nationality && (
          <p className="text-sm text-destructive">{errors.nationality.message}</p>
        )}
      </div>

      {/* ID Type */}
      <div className="space-y-2">
        <Label htmlFor="idType" className="text-sm font-semibold">
          {language === 'fa' ? 'نوع سند هویت' : language === 'ar' ? 'نوع وثيقة الهوية' : 'ID Type'} <span className="text-destructive">*</span>
        </Label>
        <Select
          value={watch('idType')}
          onValueChange={(value) => setValue('idType', value as 'passport' | 'national_id')}
        >
          <SelectTrigger
            id="idType"
            className={cn("h-12 rounded-xl", errors.idType && "border-destructive")}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="passport">
              {language === 'fa' ? 'پاسپورت' : language === 'ar' ? 'جواز السفر' : 'Passport'}
            </SelectItem>
            <SelectItem value="national_id">
              {language === 'fa' ? 'کارت ملی' : language === 'ar' ? 'بطاقة الهوية' : 'National ID'}
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.idType && (
          <p className="text-sm text-destructive">{errors.idType.message}</p>
        )}
      </div>

      {/* ID Number */}
      <div className="space-y-2">
        <Label htmlFor="idNumber" className="text-sm font-semibold">
          {language === 'fa' ? 'شماره سند' : language === 'ar' ? 'رقم الوثيقة' : 'ID Number'} <span className="text-destructive">*</span>
        </Label>
        <Input
          id="idNumber"
          {...register('idNumber')}
          className={cn("h-12 rounded-xl", errors.idNumber && "border-destructive")}
        />
        {errors.idNumber && (
          <p className="text-sm text-destructive">{errors.idNumber.message}</p>
        )}
      </div>

      {/* ID Front Upload */}
      <DocumentUpload
        label={language === 'fa' ? 'روی سند هویت' : language === 'ar' ? 'وجه وثيقة الهوية' : 'ID Front Side'}
        description={language === 'fa' ? 'عکس یا اسکن روی سند' : language === 'ar' ? 'صورة أو مسح ضوئي لوجه الوثيقة' : 'Photo or scan of ID front'}
        value={frontFile}
        onChange={(file) => {
          setFrontFile(file);
          setValue('identityFront', file as any, { shouldValidate: true });
        }}
        error={errors.identityFront?.message as string}
        required
        side="front"
      />

      {/* ID Back Upload (Required for National ID) */}
      {idType === 'national_id' && (
        <DocumentUpload
          label={language === 'fa' ? 'پشت سند هویت' : language === 'ar' ? 'ظهر وثيقة الهوية' : 'ID Back Side'}
          description={language === 'fa' ? 'عکس یا اسکن پشت سند' : language === 'ar' ? 'صورة أو مسح ضوئي لظهر الوثيقة' : 'Photo or scan of ID back'}
          value={backFile}
          onChange={(file) => {
            setBackFile(file);
            setValue('identityBack', file as any, { shouldValidate: true });
          }}
          error={errors.identityBack?.message as string}
          required
          side="back"
        />
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 h-12"
        >
          <ArrowLeft className={cn("me-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
          {language === 'fa' ? 'بازگشت' : language === 'ar' ? 'رجوع' : 'Back'}
        </Button>
        <Button
          type="submit"
          disabled={!isValid || !frontFile}
          className="flex-1 btn-gradient-primary h-12"
        >
          {language === 'fa' ? 'ادامه' : language === 'ar' ? 'متابعة' : 'Continue'}
          <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
        </Button>
      </div>
    </form>
  );
};

export default Step1PersonalIdentity;

