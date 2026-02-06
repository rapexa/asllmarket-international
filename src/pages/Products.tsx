import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Flame, ShoppingCart, Filter, Grid, List, SlidersHorizontal, X, Search, Package, TrendingUp, Sparkles } from 'lucide-react';
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

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  priceRange: string;
  moq: number;
  rating: number;
  reviews: number;
  verified: boolean;
  badge?: 'hot' | 'verified' | 'new';
  discount?: number;
  category: string;
  supplier: {
    id: string;
    name: string;
    country: string;
    verified: boolean;
  };
}

type ViewMode = 'grid' | 'list';

const Products: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addItem } = useCart();
  const { toast } = useToast();
  const { data, isLoading } = useQuery({
    queryKey: ['products', { q: searchParams.get('q') || '' }],
    queryFn: () =>
      productService.list({
        limit: 100,
        offset: 0,
      }),
  });
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('relevance');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [requestQuoteProduct, setRequestQuoteProduct] = useState<{
    id: string;
    name: string;
    image: string;
    supplierId?: string;
    supplierName?: string;
    moq: number;
    price?: number;
  } | null>(null);

  // Map API products to UI products when data changes
  useEffect(() => {
    if (!data) return;

    const mapped: Product[] = (data.items || []).map((p: ApiProduct) => {
      const image = Array.isArray(p.images) ? p.images[0] : (p.images as any) || '';
      return {
        id: p.id,
        name: p.name,
        image: image || 'https://via.placeholder.com/400x400?text=Product',
        price: p.price,
        priceRange: `${p.currency} ${p.price.toFixed(2)}`,
        moq: p.moq,
        rating: p.rating,
        reviews: p.reviewCount,
        verified: true,
        // Until we have rich category/supplier info in the API, use simple labels
        badge: p.featured ? 'hot' : undefined,
        discount: undefined,
        category: p.categoryId || 'General',
        supplier: {
          id: p.supplierId,
          name: 'Supplier',
          country: '',
          verified: true,
        },
      };
    });

    setProducts(mapped);
    setFilteredProducts(mapped);
  }, [data]);

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

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category.includes(selectedCategory));
    }

    // Price filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(p => {
        if (max) {
          return p.price >= min && p.price <= max;
        }
        return p.price >= min;
      });
    }

    // Verified filter
    if (verifiedOnly) {
      filtered = filtered.filter(p => p.verified);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, priceRange, verifiedOnly, sortBy, products]);

  const getBadgeContent = (badge?: string) => {
    switch (badge) {
      case 'hot':
        return { icon: Flame, text: t('products.hot'), className: 'bg-destructive text-destructive-foreground' };
      case 'verified':
        return { icon: ShieldCheck, text: t('products.verified'), className: 'bg-success text-success-foreground' };
      case 'new':
        return { icon: null, text: t('products.new'), className: 'bg-accent text-accent-foreground' };
      default:
        return null;
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      
      <div className="container py-6 sm:py-8 md:py-12 px-4">
        {/* Page Header */}
        <div className="mb-6 sm:mb-7 md:mb-8 animate-fade-in">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Package className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                {language === 'fa' ? 'همه محصولات' : language === 'ar' ? 'جميع المنتجات' : 'All Products'}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1 leading-tight">
                {isLoading
                  ? language === 'fa'
                    ? 'در حال بارگذاری محصولات...'
                    : language === 'ar'
                    ? 'جارٍ تحميل المنتجات...'
                    : 'Loading products...'
                  : language === 'fa'
                  ? `${filteredProducts.length} محصول یافت شد`
                  : language === 'ar'
                  ? `تم العثور على ${filteredProducts.length} منتج`
                  : `${filteredProducts.length} products found`}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <Card className="p-3 sm:p-4 md:p-6 mb-4 sm:mb-5 md:mb-6 animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'fa' ? 'جستجوی محصولات...' : language === 'ar' ? 'البحث عن المنتجات...' : 'Search products...'}
                className="w-full ps-9 sm:ps-10 pe-3 sm:pe-4 h-10 sm:h-12 rounded-lg sm:rounded-xl text-sm sm:text-base"
              />
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[160px] lg:w-[180px] h-10 sm:h-12 rounded-lg sm:rounded-xl text-sm sm:text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">
                    {language === 'fa' ? 'مرتبط‌ترین' : language === 'ar' ? 'الأكثر صلة' : 'Most Relevant'}
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
                  <SelectItem value="reviews">
                    {language === 'fa' ? 'بیشترین نظرات' : language === 'ar' ? 'أكثر المراجعات' : 'Most Reviews'}
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-1.5 sm:gap-2 border border-border rounded-lg sm:rounded-xl p-0.5 sm:p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg shrink-0"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4 shrink-0" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg shrink-0"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4 shrink-0" />
                </Button>
              </div>

              <Button
                variant="outline"
                className="h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl gap-1.5 sm:gap-2 text-sm sm:text-base flex-1 sm:flex-initial"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <SlidersHorizontal className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline whitespace-nowrap">
                  {language === 'fa' ? 'فیلترها' : language === 'ar' ? 'المرشحات' : 'Filters'}
                </span>
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          {filtersOpen && (
            <div className="mt-6 pt-6 border-t border-border space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    {language === 'fa' ? 'دسته‌بندی' : language === 'ar' ? 'الفئة' : 'Category'}
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {language === 'fa' ? 'همه دسته‌بندی‌ها' : language === 'ar' ? 'جميع الفئات' : 'All Categories'}
                      </SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Machinery">Machinery</SelectItem>
                      <SelectItem value="Apparel">Apparel</SelectItem>
                      <SelectItem value="Food">Food & Beverage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    {language === 'fa' ? 'محدوده قیمت' : language === 'ar' ? 'نطاق السعر' : 'Price Range'}
                  </label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {language === 'fa' ? 'همه قیمت‌ها' : language === 'ar' ? 'جميع الأسعار' : 'All Prices'}
                      </SelectItem>
                      <SelectItem value="0-10">$0 - $10</SelectItem>
                      <SelectItem value="10-50">$10 - $50</SelectItem>
                      <SelectItem value="50-100">$50 - $100</SelectItem>
                      <SelectItem value="100-500">$100 - $500</SelectItem>
                      <SelectItem value="500-">
                        {language === 'fa' ? 'بالای $500' : language === 'ar' ? 'أكثر من $500' : '$500+'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={verifiedOnly}
                      onChange={(e) => setVerifiedOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-border"
                    />
                    <span className="text-sm font-medium">
                      {language === 'fa' ? 'فقط تأیید شده' : language === 'ar' ? 'مؤكد فقط' : 'Verified Only'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Products Display */}
        {isLoading ? (
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">
              {language === 'fa'
                ? 'در حال بارگذاری محصولات...'
                : language === 'ar'
                ? 'جارٍ تحميل المنتجات...'
                : 'Loading products...'}
            </p>
          </Card>
        ) : filteredProducts.length === 0 ? (
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-bold mb-2">
              {language === 'fa' ? 'محصولی یافت نشد' : language === 'ar' ? 'لم يتم العثور على منتجات' : 'No Products Found'}
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
                setSelectedCategory('all');
                setPriceRange('all');
                setVerifiedOnly(false);
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

              if (viewMode === 'list') {
                return (
                  <Card
                    key={product.id}
                    className="p-3 sm:p-4 hover:shadow-lg transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex gap-3 sm:gap-4">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg sm:rounded-xl overflow-hidden bg-muted shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 sm:gap-3 md:gap-4 mb-2 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base sm:text-lg line-clamp-2 mb-1 leading-tight">{product.name}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-tight">{product.category}</p>
                          </div>
                          {badgeInfo && (
                            <Badge className={`${badgeInfo.className} gap-1 shrink-0 text-xs px-2 py-0.5`}>
                              {badgeInfo.icon && <badgeInfo.icon className="h-3 w-3 shrink-0" />}
                              {badgeInfo.text}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-3 flex-wrap">
                          <div>
                            <p className="text-xl sm:text-2xl font-bold text-accent leading-none">{product.priceRange}</p>
                            <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                              {t('products.moq')}: {product.moq} pcs
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400 shrink-0" />
                            <span className="font-bold text-sm sm:text-base leading-tight">{product.rating}</span>
                            <span className="text-xs text-muted-foreground leading-tight">({product.reviews})</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3 sm:mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/products/${product.id}`)}
                            className="flex-1 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
                          >
                            {language === 'fa' ? 'مشاهده جزئیات' : language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 btn-gradient-primary text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
                          >
                            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4 me-1.5 sm:me-2 shrink-0" />
                            <span className="whitespace-nowrap">{language === 'fa' ? 'افزودن به سبد' : language === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}</span>
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
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:via-accent/10 group-hover:to-accent/5 transition-all duration-500 rounded-2xl pointer-events-none z-0" />

                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-muted/50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Badges */}
                    <div className="absolute top-3 start-3 flex flex-col gap-2 z-10">
                      {product.discount && (
                        <span className="bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg backdrop-blur-sm border border-destructive-foreground/20">
                          -{product.discount}%
                        </span>
                      )}
                      {badgeInfo && (
                        <Badge className={`${badgeInfo.className} gap-1.5 px-3 py-1.5 shadow-lg backdrop-blur-sm border border-current/20`}>
                          {badgeInfo.icon && <badgeInfo.icon className="h-3.5 w-3.5" />}
                          <span className="font-semibold">{badgeInfo.text}</span>
                        </Badge>
                      )}
                    </div>

                    {/* Quick Actions Overlay */}
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-20 p-2 sm:p-3">
                      <div className="flex flex-col gap-2 sm:gap-3 items-center w-full max-w-[90%]">
                        <Button
                          className="btn-gradient-accent rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 shadow-2xl hover:shadow-glow font-semibold scale-90 group-hover:scale-100 transition-all duration-300 text-xs sm:text-sm md:text-base w-full sm:w-auto whitespace-nowrap"
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
                          <span className="line-clamp-1">{language === 'fa' ? 'درخواست استعلام قیمت' : language === 'ar' ? 'طلب استعلام السعر' : 'Request Quote'}</span>
                          <ArrowRight className="ms-1.5 sm:ms-2 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                        </Button>
                        <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto">
                          <Button
                            variant="outline"
                            className="rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-background/80 backdrop-blur-sm border-2 hover:bg-background text-xs sm:text-sm flex-1 sm:flex-initial whitespace-nowrap"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/products/${product.id}`);
                            }}
                          >
                            {language === 'fa' ? 'مشاهده جزئیات' : language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                          </Button>
                          <Button
                            variant="outline"
                            className="rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-background/80 backdrop-blur-sm border-2 hover:bg-background text-xs sm:text-sm shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                          >
                            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-4 sm:p-5 space-y-3 sm:space-y-4 bg-card">
                    {product.verified && (
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="inline-flex items-center gap-1 bg-success/10 text-success px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold border border-success/20 leading-tight">
                          <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                          {t('products.verified')}
                        </span>
                      </div>
                    )}

                    <h3 className="font-bold text-sm sm:text-base text-foreground line-clamp-2 group-hover:text-accent transition-colors leading-snug">
                      {product.name}
                    </h3>

                    <div className="space-y-1.5 sm:space-y-2 pt-1.5 sm:pt-2 border-t border-border/50">
                      <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                        <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent leading-none">
                          {product.priceRange.split(' - ')[0]}
                        </span>
                        {product.priceRange.includes(' - ') && (
                          <>
                            <span className="text-muted-foreground text-sm sm:text-base leading-none">-</span>
                            <span className="text-base sm:text-lg font-semibold text-muted-foreground leading-none">
                              {product.priceRange.split(' - ')[1]}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-muted-foreground flex-wrap">
                        <span className="font-medium leading-tight">{t('products.moq')}:</span>
                        <span className="bg-muted px-1.5 sm:px-2 py-0.5 rounded-md font-semibold leading-tight">{product.moq} pcs</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-border/50 gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-accent text-accent shrink-0" />
                          <span className="font-bold text-xs sm:text-sm leading-tight">{product.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground leading-tight">({product.reviews})</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-6 sm:h-7 px-2 sm:px-3 rounded-lg hover:bg-accent/10 hover:text-accent shrink-0"
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
                  <div className="absolute inset-0 rounded-2xl border-2 border-accent/0 group-hover:border-accent/30 transition-all duration-500 pointer-events-none" />
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-8 sm:mt-10 md:mt-12 px-4">
            <Button
              size="lg"
              className="btn-gradient-primary rounded-xl sm:rounded-2xl px-6 sm:px-8 md:px-10 lg:px-12 py-5 sm:py-6 md:py-7 text-sm sm:text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto whitespace-nowrap"
              onClick={() => {
                // In a real app, this would load more products from API
                // For now, we can show a toast or scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>{language === 'fa' ? 'نمایش محصولات بیشتر' : language === 'ar' ? 'عرض المزيد من المنتجات' : 'Load More Products'}</span>
              <ArrowRight className={cn("ms-2 h-4 w-4 sm:h-5 sm:w-5 shrink-0", dir === 'rtl' && "rotate-180")} />
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

export default Products;

