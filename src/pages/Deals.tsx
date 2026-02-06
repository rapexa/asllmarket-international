import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Flame, ShoppingCart, Filter, Grid, List, SlidersHorizontal, Clock, TrendingDown, Sparkles, ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RequestQuoteModal from '@/components/rfq/RequestQuoteModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { productService, Product as ApiProduct } from '@/services';

interface DealProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  priceRange: string;
  moq: number;
  rating: number;
  reviews: number;
  verified: boolean;
  badge?: 'hot' | 'verified' | 'new';
  category: string;
  supplier: {
    id: string;
    name: string;
    country: string;
    verified: boolean;
  };
  dealEndTime?: Date;
  stockLeft?: number;
}

type ViewMode = 'grid' | 'list';

const Deals: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['deals'],
    queryFn: () =>
      productService.list({
        limit: 100,
        offset: 0,
      }),
  });

  const [products, setProducts] = useState<DealProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<DealProduct[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('discount-high');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<Record<string, { hours: number; minutes: number; seconds: number }>>({});
  const [requestQuoteProduct, setRequestQuoteProduct] = useState<{
    id: string;
    name: string;
    image: string;
    supplierId?: string;
    supplierName?: string;
    moq: number;
    price?: number;
  } | null>(null);

  // Map API products to deal products when data changes
  useEffect(() => {
    if (!data) return;

    const mapped: DealProduct[] = (data.items || []).map((p: ApiProduct, index: number) => {
      const image = Array.isArray(p.images) ? p.images[0] : (p.images as any) || '';
      // Synthetic discount/original price for "deals" view
      const discount = 20 + (index % 20);
      const originalPrice = p.price * (1 + discount / 100);

      return {
        id: p.id,
        name: p.name,
        image: image || 'https://via.placeholder.com/400x400?text=Product',
        price: p.price,
        originalPrice,
        discount,
        priceRange: `${p.currency} ${p.price.toFixed(2)}`,
        moq: p.moq,
        rating: p.rating,
        reviews: p.reviewCount,
        verified: true,
        badge: p.featured ? 'hot' : undefined,
        category: p.categoryId || 'General',
        supplier: {
          id: p.supplierId,
          name: 'Supplier',
          country: '',
          verified: true,
        },
        dealEndTime: new Date(Date.now() + 1000 * 60 * 60 * (24 + index * 2)),
        stockLeft: p.stockQuantity,
      };
    });

    setProducts(mapped);
    setFilteredProducts(mapped);
  }, [data]);

  // Countdown timer
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const times: Record<string, { hours: number; minutes: number; seconds: number }> = {};
      products.forEach((product) => {
        if (product.dealEndTime) {
          const diff = product.dealEndTime.getTime() - Date.now();
          if (diff > 0) {
            times[product.id] = {
              hours: Math.floor(diff / (1000 * 60 * 60)),
              minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
              seconds: Math.floor((diff % (1000 * 60)) / 1000),
            };
          }
        }
      });
      setTimeRemaining(times);
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timer);
  }, [products]);

  // Filter and search products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Discount filter
    if (minDiscount > 0) {
      filtered = filtered.filter(p => p.discount >= minDiscount);
    }

    // Sort
    switch (sortBy) {
      case 'discount-high':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case 'discount-low':
        filtered.sort((a, b) => a.discount - b.discount);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'ending-soon':
        filtered.sort((a, b) => {
          const aTime = a.dealEndTime?.getTime() || 0;
          const bTime = b.dealEndTime?.getTime() || 0;
          return aTime - bTime;
        });
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, minDiscount, sortBy, products]);

  const getBadgeContent = (badge?: string) => {
    switch (badge) {
      case 'hot':
        return { icon: Flame, text: language === 'fa' ? 'پیشنهاد ویژه' : language === 'ar' ? 'عرض ساخن' : 'Hot Deal', className: 'bg-destructive text-destructive-foreground' };
      case 'verified':
        return { icon: ShieldCheck, text: language === 'fa' ? 'تایید شده' : language === 'ar' ? 'مؤكد' : 'Verified', className: 'bg-success text-success-foreground' };
      case 'new':
        return { icon: null, text: language === 'fa' ? 'جدید' : language === 'ar' ? 'جديد' : 'New', className: 'bg-accent text-accent-foreground' };
      default:
        return null;
    }
  };

  const handleAddToCart = (product: DealProduct) => {
    addItem({
      productId: product.id.toString(),
      name: product.name,
      image: product.image,
      supplierId: product.supplier.id,
      supplierName: product.supplier.name,
      supplierCountry: product.supplier.country,
      supplierVerified: product.supplier.verified,
      supplierEscrowSupported: true,
      unitPrice: product.price,
      quantity: product.moq,
      moq: product.moq,
      inStock: true,
      currency: 'USD',
    });
    toast({
      title: language === 'fa' ? 'اضافه شد به سبد' : language === 'ar' ? 'تمت الإضافة إلى السلة' : 'Added to Cart',
      description: language === 'fa'
        ? `${product.name} به سبد خرید شما اضافه شد.`
        : language === 'ar'
        ? `تمت إضافة ${product.name} إلى سلة التسوق الخاصة بك.`
        : `${product.name} has been added to your cart.`,
    });
  };

  const formatTimeRemaining = (productId: string) => {
    const time = timeRemaining[productId];
    if (!time) return null;
    return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />

      <div className="container py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-destructive to-accent flex items-center justify-center">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
                {language === 'fa' ? 'پیشنهادات ویژه' : language === 'ar' ? 'عروض خاصة' : 'Special Deals'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === 'fa'
                  ? `${filteredProducts.length} پیشنهاد ویژه یافت شد`
                  : language === 'ar'
                  ? `تم العثور على ${filteredProducts.length} عرض خاص`
                  : `${filteredProducts.length} special deals found`}
              </p>
            </div>
          </div>

          {/* Banner */}
          <Card className="p-6 bg-gradient-to-r from-destructive/10 via-accent/10 to-destructive/10 border-2 border-destructive/20 mt-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-destructive to-accent flex items-center justify-center">
                <TrendingDown className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {language === 'fa' ? 'فروش بزرگ سال نو' : language === 'ar' ? 'تخفيضات السنة الجديدة الكبرى' : 'New Year Mega Sale'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'fa'
                    ? 'تا 40% تخفیف روی سفارشات عمده - پیشنهادات محدود'
                    : language === 'ar'
                    ? 'خصم يصل إلى 40٪ على الطلبات بالجملة - عروض محدودة'
                    : 'Up to 40% off on bulk orders - Limited time offers'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters Bar */}
        <Card className="p-4 md:p-6 mb-6 animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'fa' ? 'جستجوی پیشنهادات...' : language === 'ar' ? 'البحث عن العروض...' : 'Search deals...'}
                className="w-full ps-10 pe-4 h-12 rounded-xl"
              />
              <Sparkles className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount-high">
                    {language === 'fa' ? 'بیشترین تخفیف' : language === 'ar' ? 'أكبر خصم' : 'Highest Discount'}
                  </SelectItem>
                  <SelectItem value="discount-low">
                    {language === 'fa' ? 'کمترین تخفیف' : language === 'ar' ? 'أقل خصم' : 'Lowest Discount'}
                  </SelectItem>
                  <SelectItem value="ending-soon">
                    {language === 'fa' ? 'به زودی تمام می‌شود' : language === 'ar' ? 'ينتهي قريباً' : 'Ending Soon'}
                  </SelectItem>
                  <SelectItem value="price-low">
                    {language === 'fa' ? 'قیمت: کم به زیاد' : language === 'ar' ? 'السعر: منخفض إلى مرتفع' : 'Price: Low to High'}
                  </SelectItem>
                  <SelectItem value="price-high">
                    {language === 'fa' ? 'قیمت: زیاد به کم' : language === 'ar' ? 'السعر: مرتفع إلى منخفض' : 'Price: High to Low'}
                  </SelectItem>
                  <SelectItem value="rating">
                    {language === 'fa' ? 'بالاترین امتیاز' : language === 'ar' ? 'أعلى تقييم' : 'Highest Rating'}
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 border border-border rounded-xl p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-10 w-10 rounded-lg"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-10 w-10 rounded-lg"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                className="h-12 px-4 rounded-xl gap-2"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {language === 'fa' ? 'فیلترها' : language === 'ar' ? 'المرشحات' : 'Filters'}
                </span>
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          {filtersOpen && (
            <div className="mt-6 pt-6 border-t border-border space-y-4 animate-fade-in">
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  {language === 'fa' ? 'حداقل تخفیف' : language === 'ar' ? 'الحد الأدنى للخصم' : 'Minimum Discount'}
                </label>
                <Select value={minDiscount.toString()} onValueChange={(v) => setMinDiscount(Number(v))}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">
                      {language === 'fa' ? 'همه تخفیف‌ها' : language === 'ar' ? 'جميع الخصومات' : 'All Discounts'}
                    </SelectItem>
                    <SelectItem value="20">20%+</SelectItem>
                    <SelectItem value="30">30%+</SelectItem>
                    <SelectItem value="40">40%+</SelectItem>
                    <SelectItem value="50">50%+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </Card>

        {/* Products Display */}
        {filteredProducts.length === 0 ? (
          <Card className="p-12 text-center">
            <Flame className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-bold mb-2">
              {language === 'fa' ? 'پیشنهادی یافت نشد' : language === 'ar' ? 'لم يتم العثور على عروض' : 'No Deals Found'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {language === 'fa'
                ? 'لطفاً فیلترها را تغییر دهید یا کلمه جستجوی دیگری را امتحان کنید'
                : language === 'ar'
                ? 'يرجى تغيير المرشحات أو تجربة كلمة بحث أخرى'
                : 'Please try changing filters or search with different keywords'}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setMinDiscount(0);
              }}
            >
              {language === 'fa' ? 'پاک کردن فیلترها' : language === 'ar' ? 'مسح المرشحات' : 'Clear Filters'}
            </Button>
          </Card>
        ) : (
          <div
            className={cn(
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            )}
          >
            {filteredProducts.map((product, index) => {
              const badgeInfo = getBadgeContent(product.badge);
              const timeRemainingStr = formatTimeRemaining(product.id);

              if (viewMode === 'list') {
                return (
                  <Card
                    key={product.id}
                    className="p-4 hover:shadow-lg transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex gap-4">
                      <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-muted shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 start-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-lg text-xs font-bold">
                          -{product.discount}%
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg line-clamp-2 mb-1">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                          </div>
                          {badgeInfo && (
                            <Badge className={`${badgeInfo.className} gap-1 shrink-0`}>
                              {badgeInfo.icon && <badgeInfo.icon className="h-3 w-3" />}
                              {badgeInfo.text}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-accent">${product.price}</span>
                              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {language === 'fa' ? 'حداقل سفارش' : language === 'ar' ? 'الحد الأدنى للطلب' : 'MOQ'}: {product.moq} pcs
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold">{product.rating}</span>
                            <span className="text-xs text-muted-foreground">({product.reviews})</span>
                          </div>
                        </div>
                        {timeRemainingStr && (
                          <div className="flex items-center gap-2 mt-2 text-xs text-destructive font-semibold">
                            <Clock className="h-3 w-3" />
                            <span>
                              {language === 'fa' ? 'زمان باقی‌مانده' : language === 'ar' ? 'الوقت المتبقي' : 'Time Left'}: {timeRemainingStr}
                            </span>
                          </div>
                        )}
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/products/${product.id}`)}
                            className="flex-1"
                          >
                            {language === 'fa' ? 'مشاهده جزئیات' : language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 btn-gradient-primary"
                          >
                            <ShoppingCart className="h-4 w-4 me-2" />
                            {language === 'fa' ? 'افزودن به سبد' : language === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              }

              return (
                <div
                  key={product.id}
                  className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Premium Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-destructive/0 via-accent/0 to-destructive/0 group-hover:from-destructive/5 group-hover:via-accent/10 group-hover:to-destructive/5 transition-all duration-500 rounded-2xl pointer-events-none z-0" />

                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-muted/50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Discount Badge - Large */}
                    <div className="absolute top-3 start-3 z-10">
                      <div className="bg-gradient-to-r from-destructive to-accent text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg pulse-glow">
                        -{product.discount}%
                      </div>
                    </div>

                    {/* Time Remaining Badge */}
                    {timeRemainingStr && (
                      <div className="absolute top-3 end-3 z-10">
                        <div className="bg-background/90 backdrop-blur-sm text-destructive px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-destructive/20">
                          <Clock className="h-3 w-3" />
                          {timeRemainingStr}
                        </div>
                      </div>
                    )}

                    {/* Stock Left Badge */}
                    {product.stockLeft && product.stockLeft < 200 && (
                      <div className="absolute bottom-3 start-3 z-10">
                        <div className="bg-warning/90 backdrop-blur-sm text-warning-foreground px-3 py-1.5 rounded-lg text-xs font-bold">
                          {language === 'fa' ? 'فقط' : language === 'ar' ? 'فقط' : 'Only'} {product.stockLeft} {language === 'fa' ? 'عدد باقی مانده' : language === 'ar' ? 'متبقي' : 'left'}
                        </div>
                      </div>
                    )}

                    {/* Badges */}
                    {badgeInfo && (
                      <div className="absolute bottom-3 end-3 z-10">
                        <Badge className={`${badgeInfo.className} gap-1.5 px-3 py-1.5 shadow-lg backdrop-blur-sm border border-current/20`}>
                          {badgeInfo.icon && <badgeInfo.icon className="h-3.5 w-3.5" />}
                          <span className="font-semibold">{badgeInfo.text}</span>
                        </Badge>
                      </div>
                    )}

                    {/* Quick Actions Overlay */}
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-20">
                      <div className="flex flex-col gap-3 items-center">
                        <Button
                          className="btn-gradient-accent rounded-2xl px-8 py-6 shadow-2xl hover:shadow-glow font-semibold scale-90 group-hover:scale-100 transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRequestQuoteProduct({
                              id: product.id.toString(),
                              name: product.name,
                              image: product.image,
                              supplierId: product.supplier.id,
                              supplierName: product.supplier.name,
                              moq: product.moq,
                              price: product.price,
                            });
                          }}
                        >
                          {language === 'fa' ? 'درخواست استعلام قیمت' : language === 'ar' ? 'طلب استعلام السعر' : 'Request Quote'}
                          <ArrowRight className="ms-2 h-4 w-4" />
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="rounded-xl px-6 py-3 bg-background/80 backdrop-blur-sm border-2 hover:bg-background"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/products/${product.id}`);
                            }}
                          >
                            {language === 'fa' ? 'مشاهده جزئیات' : language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                          </Button>
                          <Button
                            variant="outline"
                            className="rounded-xl px-4 py-3 bg-background/80 backdrop-blur-sm border-2 hover:bg-background"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-5 space-y-4 bg-card">
                    {product.verified && (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 bg-success/10 text-success px-3 py-1 rounded-full text-xs font-semibold border border-success/20">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          {language === 'fa' ? 'تایید شده' : language === 'ar' ? 'مؤكد' : 'Verified'}
                        </span>
                      </div>
                    )}

                    <h3 className="font-bold text-base text-foreground line-clamp-2 group-hover:text-accent transition-colors leading-snug">
                      {product.name}
                    </h3>

                    <div className="space-y-2 pt-2 border-t border-border/50">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold bg-gradient-to-r from-destructive to-accent bg-clip-text text-transparent">
                          ${product.price}
                        </span>
                        <span className="text-lg text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {product.discount}% {language === 'fa' ? 'تخفیف' : language === 'ar' ? 'خصم' : 'OFF'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium">
                          {language === 'fa' ? 'حداقل سفارش' : language === 'ar' ? 'الحد الأدنى للطلب' : 'MOQ'}:
                        </span>
                        <span className="bg-muted px-2 py-0.5 rounded-md font-semibold">{product.moq} pcs</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          <span className="font-bold text-sm">{product.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-7 px-3 rounded-lg hover:bg-accent/10 hover:text-accent"
                        onClick={(e) => {
                          e.stopPropagation();
                          const currentCompare = JSON.parse(localStorage.getItem('compareProducts') || '[]');
                          const productId = product.id.toString();

                          if (!currentCompare.includes(productId)) {
                            const newCompare = [...currentCompare, productId].slice(0, 4);
                            localStorage.setItem('compareProducts', JSON.stringify(newCompare));
                            navigate(`/compare?ids=${newCompare.join(',')}`);
                          } else {
                            navigate(`/compare?ids=${currentCompare.join(',')}`);
                          }
                        }}
                      >
                        {language === 'fa' ? 'مقایسه' : language === 'ar' ? 'مقارنة' : 'Compare'}
                      </Button>
                    </div>
                  </div>

                  {/* Hover Border Glow */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-destructive/0 group-hover:border-destructive/30 transition-all duration-500 pointer-events-none" />
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="btn-gradient-primary rounded-2xl px-12 py-7 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              {language === 'fa' ? 'نمایش پیشنهادات بیشتر' : language === 'ar' ? 'عرض المزيد من العروض' : 'Load More Deals'}
              <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
            </Button>
          </div>
        )}
      </div>

      {/* Request Quote Modal */}
      {requestQuoteProduct && (
        <RequestQuoteModal
          isOpen={!!requestQuoteProduct}
          onClose={() => setRequestQuoteProduct(null)}
          productId={requestQuoteProduct.id}
          productName={requestQuoteProduct.name}
          productImage={requestQuoteProduct.image}
          supplierId={requestQuoteProduct.supplierId}
          supplierName={requestQuoteProduct.supplierName}
          moq={requestQuoteProduct.moq}
          defaultPrice={requestQuoteProduct.price}
        />
      )}

      <Footer />
    </div>
  );
};

export default Deals;

