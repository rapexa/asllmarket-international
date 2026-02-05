import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Package, FileText, MapPin, Calendar, DollarSign, Search, Building2, Globe, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories, getCategoryName, getSubCategoryName } from '@/data/categories';

const postRequestSchema = z.object({
  productName: z.string().min(3, 'Product name must be at least 3 characters'),
  category: z.string().min(1, 'Please select a category'),
  subcategory: z.string().optional(),
  quantity: z.string().min(1, 'Quantity is required').regex(/^\d+$/, 'Quantity must be a number'),
  unit: z.string().min(1, 'Unit is required'),
  specifications: z.string().min(10, 'Specifications must be at least 10 characters'),
  requirements: z.string().optional(),
  deliveryLocation: z.string().min(3, 'Delivery location is required'),
  preferredDeliveryDate: z.string().optional(),
  budget: z.string().min(1, 'Budget is required'),
  currency: z.string().default('USD'),
  targetSuppliers: z.enum(['all', 'verified', 'specific']).default('all'),
  urgency: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
});

type PostRequestForm = z.infer<typeof postRequestSchema>;

const PostRequest: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<PostRequestForm>({
    resolver: zodResolver(postRequestSchema),
    defaultValues: {
      productName: '',
      category: '',
      subcategory: '',
      quantity: '',
      unit: 'pcs',
      specifications: '',
      requirements: '',
      deliveryLocation: '',
      preferredDeliveryDate: '',
      budget: '',
      currency: 'USD',
      targetSuppliers: 'all',
      urgency: 'medium',
    },
    mode: 'onChange',
  });

  const selectedCategory = selectedCategoryId
    ? categories.find(cat => cat.id === selectedCategoryId)
    : null;

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setValue('category', categoryId, { shouldValidate: true });
    setValue('subcategory', '', { shouldValidate: true });
  };

  const onSubmit = async (data: PostRequestForm) => {
    setIsSubmitting(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create RFQ object
      const rfqData = {
        productName: data.productName,
        category: data.category,
        subcategory: data.subcategory || undefined,
        quantity: parseInt(data.quantity),
        unit: data.unit,
        specifications: data.specifications,
        requirements: data.requirements || undefined,
        deliveryLocation: data.deliveryLocation,
        preferredDeliveryDate: data.preferredDeliveryDate ? new Date(data.preferredDeliveryDate) : undefined,
        budget: parseFloat(data.budget),
        currency: data.currency,
        targetSuppliers: data.targetSuppliers,
        urgency: data.urgency,
      };

      // In real app, save to backend
      console.log('RFQ Posted:', rfqData);

      // Show success toast
      toast({
        title: language === 'fa' ? 'درخواست ارسال شد' : language === 'ar' ? 'تم إرسال الطلب' : 'Request Posted',
        description: language === 'fa'
          ? 'درخواست شما با موفقیت ارسال شد و به تأمین‌کنندگان مرتبط ارسال می‌شود'
          : language === 'ar'
          ? 'تم إرسال طلبك بنجاح وسيتم إرساله إلى الموردين ذوي الصلة'
          : 'Your request has been posted and will be sent to relevant suppliers',
      });

      // Navigate to success page
      setTimeout(() => {
        navigate(`/rfq/success?rfqId=rfq-${Date.now()}&type=public`);
      }, 300);
    } catch (error) {
      toast({
        title: language === 'fa' ? 'خطا' : language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'fa'
          ? 'خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.'
          : language === 'ar'
          ? 'خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.'
          : 'Error posting request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Building2,
      title: language === 'fa' ? 'دسترسی به تأمین‌کنندگان متعدد' : language === 'ar' ? 'الوصول إلى موردين متعددين' : 'Access Multiple Suppliers',
      description: language === 'fa'
        ? 'درخواست شما به تأمین‌کنندگان مرتبط در سراسر جهان ارسال می‌شود'
        : language === 'ar'
        ? 'سيتم إرسال طلبك إلى موردين ذوي صلة في جميع أنحاء العالم'
        : 'Your request will be sent to relevant suppliers worldwide',
    },
    {
      icon: DollarSign,
      title: language === 'fa' ? 'بهترین قیمت' : language === 'ar' ? 'أفضل سعر' : 'Best Prices',
      description: language === 'fa'
        ? 'چندین پیشنهاد دریافت کنید و بهترین قیمت را انتخاب کنید'
        : language === 'ar'
        ? 'تلقي عدة عروض واختر أفضل سعر'
        : 'Receive multiple quotes and choose the best price',
    },
    {
      icon: CheckCircle2,
      title: language === 'fa' ? 'تأمین‌کنندگان تأیید شده' : language === 'ar' ? 'موردون مؤكدون' : 'Verified Suppliers',
      description: language === 'fa'
        ? 'فقط تأمین‌کنندگان تأیید شده می‌توانند پاسخ دهند'
        : language === 'ar'
        ? 'يمكن للموردين المؤكدين فقط الرد'
        : 'Only verified suppliers can respond',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />

      <div className="container py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
                {language === 'fa' ? 'ارسال درخواست' : language === 'ar' ? 'إرسال طلب' : 'Post Your Request'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === 'fa'
                  ? 'نیازهای خود را ارسال کنید و از تأمین‌کنندگان پیشنهاد دریافت کنید'
                  : language === 'ar'
                  ? 'أرسل متطلباتك وتلقي عروض من الموردين'
                  : 'Submit your requirements and receive quotes from suppliers'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 md:p-8 animate-fade-in">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Product Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">
                      {language === 'fa' ? 'اطلاعات محصول' : language === 'ar' ? 'معلومات المنتج' : 'Product Information'}
                    </h3>
                  </div>

                  {/* Product Name */}
                  <div className="space-y-2">
                    <Label htmlFor="productName" className="text-sm font-semibold">
                      {language === 'fa' ? 'نام محصول' : language === 'ar' ? 'اسم المنتج' : 'Product Name'} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="productName"
                      type="text"
                      {...register('productName')}
                      placeholder={language === 'fa' ? 'مثلاً: گوشی موبایل هوشمند' : language === 'ar' ? 'مثل: هاتف ذكي' : 'e.g., Smartphone'}
                      className={cn("h-12 rounded-xl", errors.productName && "border-destructive")}
                      disabled={isSubmitting}
                    />
                    {errors.productName && (
                      <p className="text-sm text-destructive">{errors.productName.message}</p>
                    )}
                  </div>

                  {/* Category Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-semibold">
                        {language === 'fa' ? 'دسته‌بندی' : language === 'ar' ? 'الفئة' : 'Category'} <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={watch('category')}
                        onValueChange={handleCategoryChange}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger
                          id="category"
                          className={cn("h-12 rounded-xl", errors.category && "border-destructive")}
                        >
                          <SelectValue placeholder={language === 'fa' ? 'انتخاب دسته‌بندی' : language === 'ar' ? 'اختر الفئة' : 'Select category'} />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {getCategoryName(category, language)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-destructive">{errors.category.message}</p>
                      )}
                    </div>

                    {/* Subcategory */}
                    {selectedCategory && selectedCategory.subcategories.length > 0 && (
                      <div className="space-y-2">
                        <Label htmlFor="subcategory" className="text-sm font-semibold">
                          {language === 'fa' ? 'زیردسته' : language === 'ar' ? 'الفئة الفرعية' : 'Subcategory'}
                          <span className="text-muted-foreground text-xs ms-1">({language === 'fa' ? 'اختیاری' : language === 'ar' ? 'اختياري' : 'Optional'})</span>
                        </Label>
                        <Select
                          value={watch('subcategory')}
                          onValueChange={(value) => setValue('subcategory', value)}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger id="subcategory" className="h-12 rounded-xl">
                            <SelectValue placeholder={language === 'fa' ? 'انتخاب زیردسته' : language === 'ar' ? 'اختر الفئة الفرعية' : 'Select subcategory'} />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedCategory.subcategories.map((subcat) => (
                              <SelectItem key={subcat.id} value={subcat.id}>
                                {getSubCategoryName(subcat, language)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity & Unit */}
                <div className="space-y-4 pt-6 border-t border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">
                      {language === 'fa' ? 'مقدار و واحد' : language === 'ar' ? 'الكمية والوحدة' : 'Quantity & Unit'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-sm font-semibold">
                        {language === 'fa' ? 'تعداد' : language === 'ar' ? 'الكمية' : 'Quantity'} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="quantity"
                        type="text"
                        {...register('quantity')}
                        placeholder={language === 'fa' ? '100' : language === 'ar' ? '100' : '100'}
                        className={cn("h-12 rounded-xl", errors.quantity && "border-destructive")}
                        disabled={isSubmitting}
                      />
                      {errors.quantity && (
                        <p className="text-sm text-destructive">{errors.quantity.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="unit" className="text-sm font-semibold">
                        {language === 'fa' ? 'واحد' : language === 'ar' ? 'الوحدة' : 'Unit'} <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={watch('unit')}
                        onValueChange={(value) => setValue('unit', value, { shouldValidate: true })}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger
                          id="unit"
                          className={cn("h-12 rounded-xl", errors.unit && "border-destructive")}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pcs">{language === 'fa' ? 'عدد' : language === 'ar' ? 'قطعة' : 'Pieces'}</SelectItem>
                          <SelectItem value="kg">{language === 'fa' ? 'کیلوگرم' : language === 'ar' ? 'كيلوغرام' : 'Kilograms'}</SelectItem>
                          <SelectItem value="g">{language === 'fa' ? 'گرم' : language === 'ar' ? 'جرام' : 'Grams'}</SelectItem>
                          <SelectItem value="m">{language === 'fa' ? 'متر' : language === 'ar' ? 'متر' : 'Meters'}</SelectItem>
                          <SelectItem value="l">{language === 'fa' ? 'لیتر' : language === 'ar' ? 'لتر' : 'Liters'}</SelectItem>
                          <SelectItem value="box">{language === 'fa' ? 'جعبه' : language === 'ar' ? 'صندوق' : 'Boxes'}</SelectItem>
                          <SelectItem value="set">{language === 'fa' ? 'ست' : language === 'ar' ? 'مجموعة' : 'Sets'}</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.unit && (
                        <p className="text-sm text-destructive">{errors.unit.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <div className="space-y-4 pt-6 border-t border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">
                      {language === 'fa' ? 'مشخصات فنی' : language === 'ar' ? 'المواصفات الفنية' : 'Technical Specifications'}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specifications" className="text-sm font-semibold">
                      {language === 'fa' ? 'مشخصات مورد نیاز' : language === 'ar' ? 'المواصفات المطلوبة' : 'Required Specifications'} <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="specifications"
                      {...register('specifications')}
                      placeholder={language === 'fa'
                        ? 'مشخصات فنی مورد نیاز را به تفصیل شرح دهید (مثلاً: رنگ، اندازه، مواد، استانداردها)'
                        : language === 'ar'
                        ? 'اوصف المواصفات الفنية المطلوبة بالتفصيل (مثل: اللون، الحجم، المواد، المعايير)'
                        : 'Describe required technical specifications in detail (e.g., color, size, materials, standards)'}
                      className={cn("min-h-[120px] rounded-xl", errors.specifications && "border-destructive")}
                      disabled={isSubmitting}
                    />
                    {errors.specifications && (
                      <p className="text-sm text-destructive">{errors.specifications.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements" className="text-sm font-semibold">
                      {language === 'fa' ? 'نیازهای اضافی' : language === 'ar' ? 'متطلبات إضافية' : 'Additional Requirements'}
                      <span className="text-muted-foreground text-xs ms-1">({language === 'fa' ? 'اختیاری' : language === 'ar' ? 'اختياري' : 'Optional'})</span>
                    </Label>
                    <Textarea
                      id="requirements"
                      {...register('requirements')}
                      placeholder={language === 'fa'
                        ? 'هر نیاز یا درخواست اضافی (مثلاً: بسته‌بندی خاص، گواهینامه‌ها)'
                        : language === 'ar'
                        ? 'أي متطلبات أو طلبات إضافية (مثل: تعبئة خاصة، شهادات)'
                        : 'Any additional requirements or requests (e.g., special packaging, certifications)'}
                      className="min-h-[100px] rounded-xl"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Delivery & Budget */}
                <div className="space-y-4 pt-6 border-t border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">
                      {language === 'fa' ? 'تحویل و بودجه' : language === 'ar' ? 'التسليم والميزانية' : 'Delivery & Budget'}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryLocation" className="text-sm font-semibold">
                      <MapPin className="inline h-4 w-4 me-2" />
                      {language === 'fa' ? 'آدرس تحویل' : language === 'ar' ? 'عنوان التسليم' : 'Delivery Location'} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="deliveryLocation"
                      type="text"
                      {...register('deliveryLocation')}
                      placeholder={language === 'fa' ? 'شهر، کشور' : language === 'ar' ? 'المدينة، الدولة' : 'City, Country'}
                      className={cn("h-12 rounded-xl", errors.deliveryLocation && "border-destructive")}
                      disabled={isSubmitting}
                    />
                    {errors.deliveryLocation && (
                      <p className="text-sm text-destructive">{errors.deliveryLocation.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDeliveryDate" className="text-sm font-semibold">
                        <Calendar className="inline h-4 w-4 me-2" />
                        {language === 'fa' ? 'تاریخ تحویل مطلوب' : language === 'ar' ? 'تاريخ التسليم المفضل' : 'Preferred Delivery Date'}
                        <span className="text-muted-foreground text-xs ms-1">({language === 'fa' ? 'اختیاری' : language === 'ar' ? 'اختياري' : 'Optional'})</span>
                      </Label>
                      <Input
                        id="preferredDeliveryDate"
                        type="date"
                        {...register('preferredDeliveryDate')}
                        className="h-12 rounded-xl"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="urgency" className="text-sm font-semibold">
                        {language === 'fa' ? 'فوریت' : language === 'ar' ? 'الإلحاح' : 'Urgency'}
                      </Label>
                      <Select
                        value={watch('urgency')}
                        onValueChange={(value) => setValue('urgency', value as any)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger id="urgency" className="h-12 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">{language === 'fa' ? 'کم' : language === 'ar' ? 'منخفض' : 'Low'}</SelectItem>
                          <SelectItem value="medium">{language === 'fa' ? 'متوسط' : language === 'ar' ? 'متوسط' : 'Medium'}</SelectItem>
                          <SelectItem value="high">{language === 'fa' ? 'زیاد' : language === 'ar' ? 'عالي' : 'High'}</SelectItem>
                          <SelectItem value="urgent">{language === 'fa' ? 'فوری' : language === 'ar' ? 'عاجل' : 'Urgent'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-sm font-semibold">
                        <DollarSign className="inline h-4 w-4 me-2" />
                        {language === 'fa' ? 'بودجه تخمینی' : language === 'ar' ? 'الميزانية المقدرة' : 'Estimated Budget'} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="budget"
                        type="text"
                        {...register('budget')}
                        placeholder={language === 'fa' ? '1000' : language === 'ar' ? '1000' : '1000'}
                        className={cn("h-12 rounded-xl", errors.budget && "border-destructive")}
                        disabled={isSubmitting}
                      />
                      {errors.budget && (
                        <p className="text-sm text-destructive">{errors.budget.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency" className="text-sm font-semibold">
                        {language === 'fa' ? 'ارز' : language === 'ar' ? 'العملة' : 'Currency'}
                      </Label>
                      <Select
                        value={watch('currency')}
                        onValueChange={(value) => setValue('currency', value)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger id="currency" className="h-12 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="IRR">IRR (ریال)</SelectItem>
                          <SelectItem value="SAR">SAR (ر.س)</SelectItem>
                          <SelectItem value="AED">AED (د.إ)</SelectItem>
                          <SelectItem value="CNY">CNY (¥)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Target Suppliers */}
                <div className="space-y-4 pt-6 border-t border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">
                      {language === 'fa' ? 'تأمین‌کنندگان هدف' : language === 'ar' ? 'الموردون المستهدفون' : 'Target Suppliers'}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetSuppliers" className="text-sm font-semibold">
                      {language === 'fa' ? 'ارسال به' : language === 'ar' ? 'إرسال إلى' : 'Send To'}
                    </Label>
                    <Select
                      value={watch('targetSuppliers')}
                      onValueChange={(value) => setValue('targetSuppliers', value as any)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="targetSuppliers" className="h-12 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          {language === 'fa' ? 'همه تأمین‌کنندگان' : language === 'ar' ? 'جميع الموردين' : 'All Suppliers'}
                        </SelectItem>
                        <SelectItem value="verified">
                          {language === 'fa' ? 'فقط تأیید شده' : language === 'ar' ? 'مؤكد فقط' : 'Verified Only'}
                        </SelectItem>
                        <SelectItem value="specific">
                          {language === 'fa' ? 'تأمین‌کنندگان خاص' : language === 'ar' ? 'موردون محددون' : 'Specific Suppliers'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                    className="flex-1 h-12 rounded-xl"
                  >
                    <ArrowLeft className={cn("me-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
                    {language === 'fa' ? 'بازگشت' : language === 'ar' ? 'رجوع' : 'Cancel'}
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="flex-1 btn-gradient-primary h-12 rounded-xl font-semibold"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        <span>{language === 'fa' ? 'در حال ارسال...' : language === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}</span>
                      </div>
                    ) : (
                      <>
                        {language === 'fa' ? 'ارسال درخواست' : language === 'ar' ? 'إرسال الطلب' : 'Post Request'}
                        <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Sidebar - Benefits */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Benefits Card */}
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">
                    {language === 'fa' ? 'مزایای ارسال درخواست' : language === 'ar' ? 'مزايا إرسال الطلب' : 'Benefits'}
                  </h3>
                </div>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{benefit.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Info Card */}
              <Card className="p-6 bg-muted/50">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-accent" />
                    <h4 className="font-semibold text-sm">
                      {language === 'fa' ? 'پوشش جهانی' : language === 'ar' ? 'التغطية العالمية' : 'Global Coverage'}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {language === 'fa'
                      ? 'درخواست شما به تأمین‌کنندگان در بیش از 190 کشور ارسال می‌شود'
                      : language === 'ar'
                      ? 'سيتم إرسال طلبك إلى موردين في أكثر من 190 دولة'
                      : 'Your request will be sent to suppliers in over 190 countries'}
                  </p>
                </div>
              </Card>

              {/* Tips Card */}
              <Card className="p-6 bg-accent/5 border-accent/20">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  {language === 'fa' ? 'نکات مهم' : language === 'ar' ? 'نصائح مهمة' : 'Tips'}
                </h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>
                      {language === 'fa'
                        ? 'مشخصات را به تفصیل شرح دهید تا پیشنهادات دقیق‌تری دریافت کنید'
                        : language === 'ar'
                        ? 'اوصف المواصفات بالتفصيل للحصول على عروض أكثر دقة'
                        : 'Describe specifications in detail to receive more accurate quotes'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>
                      {language === 'fa'
                        ? 'بودجه واقع‌بینانه تعیین کنید'
                        : language === 'ar'
                        ? 'حدد ميزانية واقعية'
                        : 'Set a realistic budget'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>
                      {language === 'fa'
                        ? 'معمولاً 24-48 ساعت طول می‌کشد تا پاسخ دریافت کنید'
                        : language === 'ar'
                        ? 'عادة ما يستغرق 24-48 ساعة لتلقي الردود'
                        : 'Usually takes 24-48 hours to receive responses'}
                    </span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostRequest;

