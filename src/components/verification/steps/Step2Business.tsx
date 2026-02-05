import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import type { BusinessInfo } from '@/types/verification';
import { countryCodes, getCountryName } from '@/data/countryCodes';

const businessInfoSchema = z.object({
  legalName: z.string().min(2, 'Legal name must be at least 2 characters'),
  registrationNumber: z.string().min(1, 'Registration number is required'),
  countryOfRegistration: z.string().min(1, 'Please select country'),
  companyAddress: z.string().min(5, 'Company address must be at least 5 characters'),
  businessType: z.string().min(1, 'Please select business type'),
  businessLicense: z.any().optional(),
  certificate: z.any().optional(),
});

type BusinessInfoForm = z.infer<typeof businessInfoSchema>;

interface Step2BusinessProps {
  onNext: (data: BusinessInfo) => void;
  onBack: () => void;
  initialData?: Partial<BusinessInfo>;
}

const businessTypes = [
  { value: 'manufacturer', label: 'Manufacturer', labelFa: 'تولیدکننده', labelAr: 'مصنع' },
  { value: 'trader', label: 'Trader', labelFa: 'بازرگان', labelAr: 'تاجر' },
  { value: 'wholesaler', label: 'Wholesaler', labelFa: 'عمده‌فروش', labelAr: 'موزع' },
  { value: 'retailer', label: 'Retailer', labelFa: 'خرده‌فروش', labelAr: 'بائع تجزئة' },
  { value: 'service', label: 'Service Provider', labelFa: 'ارائه‌دهنده خدمات', labelAr: 'مزود خدمة' },
  { value: 'other', label: 'Other', labelFa: 'سایر', labelAr: 'أخرى' },
];

const Step2Business: React.FC<Step2BusinessProps> = ({
  onNext,
  onBack,
  initialData,
}) => {
  const { language, dir } = useLanguage();
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BusinessInfoForm>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      legalName: initialData?.legalName || '',
      registrationNumber: initialData?.registrationNumber || '',
      countryOfRegistration: initialData?.countryOfRegistration || '',
      companyAddress: initialData?.companyAddress || '',
      businessType: initialData?.businessType || '',
    },
    mode: 'onChange',
  });

  const getBusinessTypeLabel = (value: string) => {
    const type = businessTypes.find(t => t.value === value);
    if (!type) return value;
    if (language === 'fa') return type.labelFa;
    if (language === 'ar') return type.labelAr;
    return type.label;
  };

  const onSubmit = (data: BusinessInfoForm) => {
    onNext({
      legalName: data.legalName,
      registrationNumber: data.registrationNumber,
      countryOfRegistration: data.countryOfRegistration,
      companyAddress: data.companyAddress,
      businessType: data.businessType,
      businessLicense: licenseFile ? {
        id: '3',
        type: 'business_license',
        file: licenseFile,
        preview: URL.createObjectURL(licenseFile),
      } : undefined,
      certificate: certificateFile ? {
        id: '4',
        type: 'certificate',
        file: certificateFile,
        preview: URL.createObjectURL(certificateFile),
      } : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">
          {language === 'fa' ? 'اطلاعات کسب‌وکار' : language === 'ar' ? 'معلومات الأعمال' : 'Business Information'}
        </h3>
        <p className="text-muted-foreground">
          {language === 'fa'
            ? 'لطفاً اطلاعات کسب‌وکار خود را وارد کنید'
            : language === 'ar'
            ? 'يرجى إدخال معلومات الأعمال الخاصة بك'
            : 'Please provide your business information'}
        </p>
      </div>

      {/* Legal Name */}
      <div className="space-y-2">
        <Label htmlFor="legalName" className="text-sm font-semibold">
          {language === 'fa' ? 'نام قانونی شرکت' : language === 'ar' ? 'الاسم القانوني للشركة' : 'Legal Company Name'} <span className="text-destructive">*</span>
        </Label>
        <Input
          id="legalName"
          {...register('legalName')}
          className={cn("h-12 rounded-xl", errors.legalName && "border-destructive")}
        />
        {errors.legalName && (
          <p className="text-sm text-destructive">{errors.legalName.message}</p>
        )}
      </div>

      {/* Registration Number */}
      <div className="space-y-2">
        <Label htmlFor="registrationNumber" className="text-sm font-semibold">
          {language === 'fa' ? 'شماره ثبت' : language === 'ar' ? 'رقم التسجيل' : 'Registration Number'} <span className="text-destructive">*</span>
        </Label>
        <Input
          id="registrationNumber"
          {...register('registrationNumber')}
          className={cn("h-12 rounded-xl", errors.registrationNumber && "border-destructive")}
        />
        {errors.registrationNumber && (
          <p className="text-sm text-destructive">{errors.registrationNumber.message}</p>
        )}
      </div>

      {/* Country of Registration */}
      <div className="space-y-2">
        <Label htmlFor="countryOfRegistration" className="text-sm font-semibold">
          {language === 'fa' ? 'کشور ثبت' : language === 'ar' ? 'بلد التسجيل' : 'Country of Registration'} <span className="text-destructive">*</span>
        </Label>
        <Select
          value={watch('countryOfRegistration')}
          onValueChange={(value) => setValue('countryOfRegistration', value)}
        >
          <SelectTrigger
            id="countryOfRegistration"
            className={cn("h-12 rounded-xl", errors.countryOfRegistration && "border-destructive")}
          >
            <SelectValue placeholder={language === 'fa' ? 'انتخاب کشور' : language === 'ar' ? 'اختر البلد' : 'Select country'} />
          </SelectTrigger>
          <SelectContent>
            {countryCodes.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {getCountryName(country, language)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.countryOfRegistration && (
          <p className="text-sm text-destructive">{errors.countryOfRegistration.message}</p>
        )}
      </div>

      {/* Company Address */}
      <div className="space-y-2">
        <Label htmlFor="companyAddress" className="text-sm font-semibold">
          {language === 'fa' ? 'آدرس شرکت' : language === 'ar' ? 'عنوان الشركة' : 'Company Address'} <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="companyAddress"
          {...register('companyAddress')}
          className={cn("min-h-[100px] rounded-xl", errors.companyAddress && "border-destructive")}
          placeholder={language === 'fa' ? 'آدرس کامل شرکت' : language === 'ar' ? 'عنوان الشركة الكامل' : 'Full company address'}
        />
        {errors.companyAddress && (
          <p className="text-sm text-destructive">{errors.companyAddress.message}</p>
        )}
      </div>

      {/* Business Type */}
      <div className="space-y-2">
        <Label htmlFor="businessType" className="text-sm font-semibold">
          {language === 'fa' ? 'نوع کسب‌وکار' : language === 'ar' ? 'نوع الأعمال' : 'Business Type'} <span className="text-destructive">*</span>
        </Label>
        <Select
          value={watch('businessType')}
          onValueChange={(value) => setValue('businessType', value)}
        >
          <SelectTrigger
            id="businessType"
            className={cn("h-12 rounded-xl", errors.businessType && "border-destructive")}
          >
            <SelectValue placeholder={language === 'fa' ? 'انتخاب نوع کسب‌وکار' : language === 'ar' ? 'اختر نوع الأعمال' : 'Select business type'} />
          </SelectTrigger>
          <SelectContent>
            {businessTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {getBusinessTypeLabel(type.value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.businessType && (
          <p className="text-sm text-destructive">{errors.businessType.message}</p>
        )}
      </div>

      {/* Business License Upload */}
      <DocumentUpload
        label={language === 'fa' ? 'مجوز کسب‌وکار' : language === 'ar' ? 'ترخيص الأعمال' : 'Business License'}
        description={language === 'fa' ? 'اسکن یا عکس مجوز کسب‌وکار' : language === 'ar' ? 'مسح ضوئي أو صورة ترخيص الأعمال' : 'Scan or photo of business license'}
        value={licenseFile}
        onChange={(file) => {
          setLicenseFile(file);
          setValue('businessLicense', file as any);
        }}
        error={errors.businessLicense?.message as string}
        required={false}
      />

      {/* Certificate Upload (Optional) */}
      <DocumentUpload
        label={language === 'fa' ? 'گواهی (اختیاری)' : language === 'ar' ? 'شهادة (اختياري)' : 'Certificate (Optional)'}
        description={language === 'fa' ? 'گواهی‌های اضافی' : language === 'ar' ? 'شهادات إضافية' : 'Additional certificates'}
        value={certificateFile}
        onChange={(file) => {
          setCertificateFile(file);
          setValue('certificate', file as any);
        }}
        error={errors.certificate?.message as string}
        required={false}
      />

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
          className="flex-1 btn-gradient-primary h-12"
        >
          {language === 'fa' ? 'ادامه' : language === 'ar' ? 'متابعة' : 'Continue'}
          <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
        </Button>
      </div>
    </form>
  );
};

export default Step2Business;
