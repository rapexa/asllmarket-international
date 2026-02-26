import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { categoryService, productService, Product } from '@/services';
import { cn } from '@/lib/utils';

/** Frequently searched items (Alibaba-style) */
const FREQUENTLY_SEARCHED: { nameEn: string; nameFa: string; nameAr: string; image: string }[] = [
  { nameEn: 'Smart Watches', nameFa: 'ساعت هوشمند', nameAr: 'ساعات ذكية', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
  { nameEn: 'Cars', nameFa: 'خودرو', nameAr: 'سيارات', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=400&fit=crop' },
  { nameEn: 'Mobile Phones', nameFa: 'گوشی موبایل', nameAr: 'هواتف محمولة', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop' },
  { nameEn: 'Laptops', nameFa: 'لپ‌تاپ', nameAr: 'أجهزة كمبيوتر محمولة', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop' },
  { nameEn: 'Electric Scooters', nameFa: 'اسکوتر برقی', nameAr: 'سكوتر كهربائي', image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400&h=400&fit=crop' },
  { nameEn: 'Drones', nameFa: 'پهپاد', nameAr: 'طائرات بدون طيار', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop' },
  { nameEn: 'Evening Dresses', nameFa: 'لباس مجلسی', nameAr: 'فساتين سهرة', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop' },
  { nameEn: 'Electric Motorcycles', nameFa: 'موتور برقی', nameAr: 'دراجات نارية كهربائية', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' },
];

const AlibabaMainSection: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<{ id: string; nameEn: string; nameFa: string; nameAr: string; icon?: string }[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cats, prods] = await Promise.all([
          categoryService.list(),
          productService.list({ limit: 4 }),
        ]);
        const items = (cats.items ?? []).map((c: { id: string; nameEn?: string; nameFa?: string; nameAr?: string; icon?: string }) => ({
          id: c.id,
          nameEn: c.nameEn ?? c.nameFa ?? '',
          nameFa: c.nameFa ?? c.nameEn ?? '',
          nameAr: c.nameAr ?? c.nameEn ?? '',
          icon: c.icon ?? '📦',
        }));
        setCategories(items);
        setProducts(prods.items || []);
      } catch (error) {
        console.error('Failed to load:', error);
        setCategories([
          { id: '1', nameEn: 'Apparel & Accessories', nameFa: 'پوشاک و لوازم جانبی', nameAr: 'الملابس والإكسسوارات', icon: '👔' },
          { id: '2', nameEn: 'Consumer Electronics', nameFa: 'الکترونیک مصرفی', nameAr: 'الإلكترونيات الاستهلاكية', icon: '📱' },
          { id: '3', nameEn: 'Sports & Entertainment', nameFa: 'ورزش و سرگرمی', nameAr: 'الرياضة والترفيه', icon: '⚽' },
          { id: '4', nameEn: 'Beauty', nameFa: 'زیبایی', nameAr: 'الجمال', icon: '💄' },
          { id: '5', nameEn: 'Jewelry, Eyewear & Watches', nameFa: 'جواهرات، عینک و ساعت', nameAr: 'المجوهرات والنظارات والساعات', icon: '⌚' },
          { id: '6', nameEn: 'Home & Garden', nameFa: 'خانه و باغ', nameAr: 'المنزل والحديقة', icon: '🏠' },
          { id: '7', nameEn: 'Sportswear & Outdoor Apparel', nameFa: 'پوشاک ورزشی', nameAr: 'ملابس رياضية', icon: '👕' },
          { id: '8', nameEn: 'Shoes & Accessories', nameFa: 'کفش و لوازم جانبی', nameAr: 'أحذية وإكسسوارات', icon: '👟' },
        ]);
      }
    };
    loadData();
  }, []);

  const getCatName = (c: { nameEn: string; nameFa: string; nameAr: string }) => {
    if (language === 'fa') return c.nameFa;
    if (language === 'ar') return c.nameAr;
    return c.nameEn;
  };

  const getItemName = (item: { nameEn: string; nameFa: string; nameAr: string }) => {
    if (language === 'fa') return item.nameFa;
    if (language === 'ar') return item.nameAr;
    return item.nameEn;
  };

  return (
    <div className="bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - Categories for you (Alibaba deep copy) */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white dark:bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border flex items-center gap-2 bg-muted/30">
                <Star className="h-5 w-5 text-primary shrink-0" />
                <h3 className="font-bold text-base">
                  {language === 'fa' ? 'دسته‌بندی‌ها برای شما' : language === 'ar' ? 'فئات لك' : 'Categories for you'}
                </h3>
              </div>
              <div className="max-h-[480px] overflow-y-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => navigate(`/categories/${cat.id}`)}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors',
                      'hover:bg-primary/5 border-b border-border/50 last:border-b-0',
                      'group'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xl shrink-0">{cat.icon || '📦'}</span>
                      <span className="font-medium text-sm truncate">{getCatName(cat)}</span>
                    </div>
                    <ChevronRight className={cn('h-4 w-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors', dir === 'rtl' && 'rotate-180')} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle - Frequently Searched + Products */}
          <div className="col-span-12 lg:col-span-6">
            <div className="space-y-6">
              {/* Frequently searched (Alibaba-style grid) */}
              <div>
                <h3 className="text-lg font-bold mb-4">
                  {language === 'fa' ? 'جستجوهای مکرر' : language === 'ar' ? 'البحث المتكرر' : 'Frequently searched'}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {FREQUENTLY_SEARCHED.map((item) => (
                    <button
                      key={item.nameEn}
                      type="button"
                      onClick={() => navigate(`/search?q=${encodeURIComponent(item.nameEn)}`)}
                      className="group relative aspect-square rounded-xl overflow-hidden bg-muted border border-border hover:shadow-lg hover:border-primary/30 transition-all"
                    >
                      <img
                        src={item.image}
                        alt={getItemName(item)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <span className="text-white font-semibold text-sm drop-shadow-lg line-clamp-2">{getItemName(item)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Products from API */}
              {products.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold mb-4">
                    {language === 'fa' ? 'محصولات پیشنهادی' : language === 'ar' ? 'منتجات موصى بها' : 'Recommended products'}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="bg-card rounded-xl border border-border overflow-hidden cursor-pointer hover:shadow-lg hover:border-primary/20 transition-all"
                      >
                        <div className="aspect-square bg-muted">
                          <img
                            src={(product.images as string[])?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium line-clamp-2 mb-2 text-sm">{product.name}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-primary font-bold">${(Number(product.price) ?? 0).toFixed(2)}</span>
                            <span className="text-xs text-muted-foreground">MOQ: {product.moq ?? 1}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right - Banner (Discover manufacturers - Alibaba-style) */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-4">
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary to-primary-light p-8 text-primary-foreground h-full min-h-[320px] flex flex-col">
                <div className="relative z-10 flex-1">
                  <h3 className="text-xl font-bold mb-2">
                    {language === 'fa' ? 'تولیدکنندگان جدید را کشف کنید' : language === 'ar' ? 'اكتشف المصنعين الجدد' : 'Discover new manufacturers'}
                  </h3>
                  <p className="text-sm opacity-90 mb-6">
                    {language === 'fa' ? 'با هزاران تأمین‌کننده تأیید شده ارتباط برقرار کنید' : language === 'ar' ? 'تواصل مع آلاف الموردين المعتمدين' : 'Connect with thousands of verified suppliers'}
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate('/suppliers')}
                    className="mt-auto bg-white text-primary px-6 py-2.5 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                  >
                    {language === 'fa' ? 'مشاهده بیشتر' : language === 'ar' ? 'عرض المزيد' : 'View more'}
                  </button>
                </div>
                <div className="absolute bottom-0 end-0 w-2/3 h-2/3 opacity-20 pointer-events-none">
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop"
                    alt=""
                    className="w-full h-full object-cover rounded-tl-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlibabaMainSection;
