import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Package, MapPin, Calendar, DollarSign, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { rfqService } from '@/services';

const requestQuoteSchema = z.object({
  quantity: z.string().min(1, 'Quantity is required').regex(/^\d+$/, 'Quantity must be a number'),
  unit: z.string().min(1, 'Unit is required'),
  specifications: z.string().optional(),
  requirements: z.string().optional(),
  deliveryLocation: z.string().optional(),
  preferredDeliveryDate: z.string().optional(),
  budget: z.string().optional(),
  currency: z.string().default('USD'),
});

type RequestQuoteForm = z.infer<typeof requestQuoteSchema>;

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  productImage?: string;
  supplierId?: string;
  supplierName?: string;
  moq?: number;
  defaultPrice?: number;
}

const RequestQuoteModal: React.FC<RequestQuoteModalProps> = ({
  isOpen,
  onClose,
  productId,
  productName,
  productImage,
  supplierId,
  supplierName,
  moq,
  defaultPrice,
}) => {
  const { language, dir } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<RequestQuoteForm>({
    resolver: zodResolver(requestQuoteSchema),
    defaultValues: {
      quantity: moq?.toString() || '',
      unit: 'pcs',
      currency: 'USD',
      specifications: '',
      requirements: '',
      deliveryLocation: '',
      preferredDeliveryDate: '',
      budget: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: RequestQuoteForm) => {
    setIsSubmitting(true);

    try {
      const created = await rfqService.create({
        productId,
        productName,
        productImage,
        supplierId,
        quantity: parseInt(data.quantity, 10),
        unit: data.unit,
        specifications: data.specifications || undefined,
        requirements: data.requirements || undefined,
        deliveryLocation: data.deliveryLocation || undefined,
        preferredDeliveryDate: data.preferredDeliveryDate || undefined,
        budget: data.budget ? parseFloat(data.budget) : undefined,
        currency: data.currency,
      });

      // Show success toast
      toast({
        title: language === 'fa' ? 'درخواست ارسال شد' : language === 'ar' ? 'تم إرسال الطلب' : 'Request Submitted',
        description: language === 'fa'
          ? 'درخواست استعلام قیمت شما با موفقیت ارسال شد'
          : language === 'ar'
          ? 'تم إرسال طلب استعلام السعر بنجاح'
          : 'Your quote request has been submitted successfully',
      });

      // Close modal and navigate to success page
      onClose();
      reset();
      
      setTimeout(() => {
        navigate(`/rfq/success?productId=${productId}&rfqId=${created.id}`);
      }, 300);
    } catch (error) {
      toast({
        title: language === 'fa' ? 'خطا' : language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'fa'
          ? 'خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.'
          : language === 'ar'
          ? 'خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.'
          : 'Error submitting request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={cn(
        "max-w-2xl max-h-[90vh] overflow-y-auto",
        "p-0 gap-0"
      )}>
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="text-2xl font-bold">
            {language === 'fa' ? 'درخواست استعلام قیمت' : language === 'ar' ? 'طلب استعلام السعر' : 'Request for Quote'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fa'
              ? 'جزئیات درخواست خود را وارد کنید'
              : language === 'ar'
              ? 'أدخل تفاصيل طلبك'
              : 'Enter your request details'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Product Info */}
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl border border-border">
            {productImage && (
              <img
                src={productImage}
                alt={productName}
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{productName}</h3>
              {supplierName && (
                <p className="text-sm text-muted-foreground truncate">{supplierName}</p>
              )}
              {moq && (
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'fa' ? `MOQ: ${moq}` : language === 'ar' ? `الحد الأدنى للطلب: ${moq}` : `MOQ: ${moq}`}
                </p>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm font-semibold">
                <Package className="inline h-4 w-4 me-2" />
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
              {moq && (
                <p className="text-xs text-muted-foreground">
                  {language === 'fa' ? `حداقل سفارش: ${moq}` : language === 'ar' ? `الحد الأدنى: ${moq}` : `Minimum: ${moq}`}
                </p>
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

          {/* Specifications */}
          <div className="space-y-2">
            <Label htmlFor="specifications" className="text-sm font-semibold">
              <FileText className="inline h-4 w-4 me-2" />
              {language === 'fa' ? 'مشخصات فنی (اختیاری)' : language === 'ar' ? 'المواصفات الفنية (اختياري)' : 'Specifications (Optional)'}
            </Label>
            <Textarea
              id="specifications"
              {...register('specifications')}
              placeholder={language === 'fa'
                ? 'مشخصات فنی مورد نیاز (مثلاً: رنگ، اندازه، مواد)'
                : language === 'ar'
                ? 'المواصفات الفنية المطلوبة (مثل: اللون، الحجم، المواد)'
                : 'Technical specifications (e.g., color, size, materials)'}
              className={cn("min-h-[100px] rounded-xl", errors.specifications && "border-destructive")}
              disabled={isSubmitting}
            />
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label htmlFor="requirements" className="text-sm font-semibold">
              {language === 'fa' ? 'نیازهای اضافی (اختیاری)' : language === 'ar' ? 'متطلبات إضافية (اختياري)' : 'Additional Requirements (Optional)'}
            </Label>
            <Textarea
              id="requirements"
              {...register('requirements')}
              placeholder={language === 'fa'
                ? 'هر نیاز یا درخواست اضافی'
                : language === 'ar'
                ? 'أي متطلبات أو طلبات إضافية'
                : 'Any additional requirements or requests'}
              className={cn("min-h-[100px] rounded-xl", errors.requirements && "border-destructive")}
              disabled={isSubmitting}
            />
          </div>

          {/* Delivery Location */}
          <div className="space-y-2">
            <Label htmlFor="deliveryLocation" className="text-sm font-semibold">
              <MapPin className="inline h-4 w-4 me-2" />
              {language === 'fa' ? 'آدرس تحویل (اختیاری)' : language === 'ar' ? 'عنوان التسليم (اختياري)' : 'Delivery Location (Optional)'}
            </Label>
            <Input
              id="deliveryLocation"
              type="text"
              {...register('deliveryLocation')}
              placeholder={language === 'fa' ? 'شهر، کشور' : language === 'ar' ? 'المدينة، الدولة' : 'City, Country'}
              className="h-12 rounded-xl"
              disabled={isSubmitting}
            />
          </div>

          {/* Preferred Delivery Date */}
          <div className="space-y-2">
            <Label htmlFor="preferredDeliveryDate" className="text-sm font-semibold">
              <Calendar className="inline h-4 w-4 me-2" />
              {language === 'fa' ? 'تاریخ تحویل مطلوب (اختیاری)' : language === 'ar' ? 'تاريخ التسليم المفضل (اختياري)' : 'Preferred Delivery Date (Optional)'}
            </Label>
            <Input
              id="preferredDeliveryDate"
              type="date"
              {...register('preferredDeliveryDate')}
              className="h-12 rounded-xl"
              disabled={isSubmitting}
            />
          </div>

          {/* Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-sm font-semibold">
                <DollarSign className="inline h-4 w-4 me-2" />
                {language === 'fa' ? 'بودجه تخمینی (اختیاری)' : language === 'ar' ? 'الميزانية المقدرة (اختياري)' : 'Estimated Budget (Optional)'}
              </Label>
              <Input
                id="budget"
                type="text"
                {...register('budget')}
                placeholder={language === 'fa' ? '1000' : language === 'ar' ? '1000' : '1000'}
                className="h-12 rounded-xl"
                disabled={isSubmitting}
              />
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

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 h-12"
            >
              <ArrowLeft className={cn("me-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
              {language === 'fa' ? 'بازگشت' : language === 'ar' ? 'رجوع' : 'Cancel'}
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="flex-1 btn-gradient-primary h-12"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>{language === 'fa' ? 'در حال ارسال...' : language === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}</span>
                </div>
              ) : (
                <>
                  {language === 'fa' ? 'ارسال درخواست' : language === 'ar' ? 'إرسال الطلب' : 'Submit Request'}
                  <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestQuoteModal;

