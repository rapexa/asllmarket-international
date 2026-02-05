import React, { useState } from 'react';
import { X, Check, Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface FilterValues {
  category?: string[];
  minPrice?: string;
  maxPrice?: string;
  moq?: string;
  readyToShip?: boolean;
  customizable?: boolean;
  supplierCountry?: string;
  verifiedSupplier?: boolean;
  escrowSupported?: boolean;
  deliveryTime?: string;
  bulkAvailable?: boolean;
  discounted?: boolean;
}

interface AdvancedFiltersPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
}

const AdvancedFiltersPanel: React.FC<AdvancedFiltersPanelProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const { language, dir } = useLanguage();
  const [filters, setFilters] = useState<FilterValues>({});

  if (!isOpen) return null;

  const handleApply = () => {
    const params: Record<string, string> = {};
    
    if (filters.category?.length) {
      params.category = filters.category.join(',');
    }
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.moq) params.moq = filters.moq;
    if (filters.readyToShip) params.readyToShip = 'true';
    if (filters.customizable) params.customizable = 'true';
    if (filters.supplierCountry) params.supplierCountry = filters.supplierCountry;
    if (filters.verifiedSupplier) params.verified = 'true';
    if (filters.escrowSupported) params.escrow = 'true';
    if (filters.deliveryTime) params.deliveryTime = filters.deliveryTime;
    if (filters.bulkAvailable) params.bulk = 'true';
    if (filters.discounted) params.discounted = 'true';

    onApply(params);
  };

  const handleReset = () => {
    setFilters({});
  };

  const activeFiltersCount = Object.keys(filters).filter(
    key => filters[key as keyof FilterValues] !== undefined && filters[key as keyof FilterValues] !== false
  ).length;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <Card className={cn(
        "fixed top-[120px] start-0 end-0 bg-card border-t-2 border-border shadow-2xl z-50",
        "animate-slide-down",
        "max-h-[calc(100vh-140px)] overflow-y-auto"
      )}>
        <div className="container py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-accent" />
              <h3 className="text-xl font-bold">
                {language === 'fa' ? 'فیلترهای پیشرفته' : language === 'ar' ? 'المرشحات المتقدمة' : 'Advanced Filters'}
              </h3>
              {activeFiltersCount > 0 && (
                <Badge variant="default" className="gap-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-9 w-9"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Filters Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product Filters */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                {language === 'fa' ? 'فیلترهای محصول' : language === 'ar' ? 'مرشحات المنتج' : 'Product Filters'}
              </h4>

              {/* Category */}
              <div className="space-y-2">
                <Label>
                  {language === 'fa' ? 'دسته‌بندی' : language === 'ar' ? 'الفئة' : 'Category'}
                </Label>
                <Select
                  value={filters.category?.[0] || ''}
                  onValueChange={(value) => setFilters({ ...filters, category: [value] })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={language === 'fa' ? 'انتخاب دسته' : language === 'ar' ? 'اختر الفئة' : 'Select category'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="machinery">Machinery</SelectItem>
                    <SelectItem value="apparel">Apparel</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                    <SelectItem value="beauty">Beauty & Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <Label>
                  {language === 'fa' ? 'محدوده قیمت' : language === 'ar' ? 'نطاق السعر' : 'Price Range'}
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder={language === 'fa' ? 'حداقل' : language === 'ar' ? 'الحد الأدنى' : 'Min'}
                    value={filters.minPrice || ''}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder={language === 'fa' ? 'حداکثر' : language === 'ar' ? 'الحد الأقصى' : 'Max'}
                    value={filters.maxPrice || ''}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* MOQ */}
              <div className="space-y-2">
                <Label>
                  {language === 'fa' ? 'حداقل سفارش (MOQ)' : language === 'ar' ? 'الحد الأدنى للطلب' : 'Minimum Order (MOQ)'}
                </Label>
                <Input
                  type="number"
                  placeholder={language === 'fa' ? 'مثال: 100' : language === 'ar' ? 'مثال: 100' : 'e.g. 100'}
                  value={filters.moq || ''}
                  onChange={(e) => setFilters({ ...filters, moq: e.target.value })}
                />
              </div>

              {/* Ready to Ship */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="readyToShip"
                  checked={filters.readyToShip || false}
                  onCheckedChange={(checked) => setFilters({ ...filters, readyToShip: !!checked })}
                />
                <Label htmlFor="readyToShip" className="font-normal cursor-pointer">
                  {language === 'fa' ? 'آماده ارسال' : language === 'ar' ? 'جاهز للشحن' : 'Ready to Ship'}
                </Label>
              </div>

              {/* Customizable */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="customizable"
                  checked={filters.customizable || false}
                  onCheckedChange={(checked) => setFilters({ ...filters, customizable: !!checked })}
                />
                <Label htmlFor="customizable" className="font-normal cursor-pointer">
                  {language === 'fa' ? 'قابل سفارشی‌سازی' : language === 'ar' ? 'قابل للتخصيص' : 'Customizable'}
                </Label>
              </div>
            </div>

            {/* Supplier Filters */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                {language === 'fa' ? 'فیلترهای تأمین‌کننده' : language === 'ar' ? 'مرشحات المورد' : 'Supplier Filters'}
              </h4>

              {/* Supplier Country */}
              <div className="space-y-2">
                <Label>
                  {language === 'fa' ? 'کشور تأمین‌کننده' : language === 'ar' ? 'بلد المورد' : 'Supplier Country'}
                </Label>
                <Select
                  value={filters.supplierCountry || ''}
                  onValueChange={(value) => setFilters({ ...filters, supplierCountry: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={language === 'fa' ? 'انتخاب کشور' : language === 'ar' ? 'اختر البلد' : 'Select country'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="china">China</SelectItem>
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                    <SelectItem value="uae">UAE</SelectItem>
                    <SelectItem value="turkey">Turkey</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Verified Supplier */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verifiedSupplier"
                  checked={filters.verifiedSupplier || false}
                  onCheckedChange={(checked) => setFilters({ ...filters, verifiedSupplier: !!checked })}
                />
                <Label htmlFor="verifiedSupplier" className="font-normal cursor-pointer">
                  {language === 'fa' ? 'تأمین‌کننده تأیید شده' : language === 'ar' ? 'مورد موثق' : 'Verified Supplier'}
                </Label>
              </div>

              {/* Escrow Supported */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="escrowSupported"
                  checked={filters.escrowSupported || false}
                  onCheckedChange={(checked) => setFilters({ ...filters, escrowSupported: !!checked })}
                />
                <Label htmlFor="escrowSupported" className="font-normal cursor-pointer">
                  {language === 'fa' ? 'پشتیبانی از Escrow' : language === 'ar' ? 'دعم الضمان' : 'Escrow Supported'}
                </Label>
              </div>
            </div>

            {/* Trade Filters */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                {language === 'fa' ? 'فیلترهای تجاری' : language === 'ar' ? 'مرشحات التجارية' : 'Trade Filters'}
              </h4>

              {/* Delivery Time */}
              <div className="space-y-2">
                <Label>
                  {language === 'fa' ? 'زمان تحویل' : language === 'ar' ? 'وقت التسليم' : 'Delivery Time'}
                </Label>
                <Select
                  value={filters.deliveryTime || ''}
                  onValueChange={(value) => setFilters({ ...filters, deliveryTime: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={language === 'fa' ? 'انتخاب زمان' : language === 'ar' ? 'اختر الوقت' : 'Select time'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Within 7 days</SelectItem>
                    <SelectItem value="15">Within 15 days</SelectItem>
                    <SelectItem value="30">Within 30 days</SelectItem>
                    <SelectItem value="60">Within 60 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bulk Available */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bulkAvailable"
                  checked={filters.bulkAvailable || false}
                  onCheckedChange={(checked) => setFilters({ ...filters, bulkAvailable: !!checked })}
                />
                <Label htmlFor="bulkAvailable" className="font-normal cursor-pointer">
                  {language === 'fa' ? 'قابل سفارش عمده' : language === 'ar' ? 'متاح بالجملة' : 'Bulk Available'}
                </Label>
              </div>

              {/* Discounted */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="discounted"
                  checked={filters.discounted || false}
                  onCheckedChange={(checked) => setFilters({ ...filters, discounted: !!checked })}
                />
                <Label htmlFor="discounted" className="font-normal cursor-pointer">
                  {language === 'fa' ? 'محصولات تخفیف‌دار' : language === 'ar' ? 'منتجات مخفضة' : 'Discounted Products'}
                </Label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              {language === 'fa' ? 'بازنشانی' : language === 'ar' ? 'إعادة تعيين' : 'Reset'}
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                {language === 'fa' ? 'لغو' : language === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={handleApply} className="gap-2">
                <Check className="h-4 w-4" />
                {language === 'fa' ? 'اعمال فیلترها' : language === 'ar' ? 'تطبيق المرشحات' : 'Apply Filters'}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AdvancedFiltersPanel;

