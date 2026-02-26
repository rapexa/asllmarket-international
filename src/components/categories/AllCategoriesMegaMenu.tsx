import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, Star, Flame } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { categoryService } from '@/services';
import { cn } from '@/lib/utils';

/** Featured items grid like Alibaba "Categories for you" right column */
const FEATURED_ITEMS: { id: string; nameEn: string; nameFa: string; nameAr: string; image: string; hot?: boolean }[] = [
  { id: 'sw', nameEn: 'Smart Watches', nameFa: 'ساعت هوشمند', nameAr: 'ساعات ذكية', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', hot: true },
  { id: 'cars', nameEn: 'Cars', nameFa: 'خودرو', nameAr: 'سيارات', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200&h=200&fit=crop', hot: true },
  { id: 'phones', nameEn: 'Mobile Phones', nameFa: 'گوشی موبایل', nameAr: 'هواتف محمولة', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop', hot: true },
  { id: 'laptops', nameEn: 'Laptops', nameFa: 'لپ‌تاپ', nameAr: 'أجهزة كمبيوتر محمولة', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop', hot: true },
  { id: 'scooters', nameEn: 'Electric Scooters', nameFa: 'اسکوتر برقی', nameAr: 'سكوتر كهربائي', image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=200&h=200&fit=crop', hot: true },
  { id: 'motorcycle', nameEn: 'Motorcycle', nameFa: 'موتور', nameAr: 'دراجة نارية', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=200&h=200&fit=crop', hot: true },
  { id: 'ebike', nameEn: 'Electric bike', nameFa: 'دوچرخه برقی', nameAr: 'دراجة كهربائية', image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=200&h=200&fit=crop', hot: false },
  { id: 'camera', nameEn: 'Camera', nameFa: 'دوربین', nameAr: 'كاميرا', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop', hot: true },
  { id: 'dresses', nameEn: 'Evening Dresses', nameFa: 'لباس مجلسی', nameAr: 'فساتين سهرة', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop', hot: true },
  { id: '5g', nameEn: '5G smartphone', nameFa: 'گوشی 5G', nameAr: 'هاتف 5G', image: 'https://images.unsplash.com/photo-1592286927505-d6e7d7c1c9c4?w=200&h=200&fit=crop', hot: true },
  { id: 'car-acc', nameEn: 'Car Accessories', nameFa: 'لوازم خودرو', nameAr: 'إكسسوارات السيارات', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop', hot: false },
  { id: 'drones', nameEn: 'Drones', nameFa: 'پهپاد', nameAr: 'طائرات بدون طيار', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=200&h=200&fit=crop', hot: true },
  { id: 'used-cars', nameEn: 'Used Cars', nameFa: 'خودروی دست دوم', nameAr: 'سيارات مستعملة', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200&h=200&fit=crop', hot: false },
  { id: 'e-moto', nameEn: 'Electric Motorcycles', nameFa: 'موتور برقی', nameAr: 'دراجات نارية كهربائية', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', hot: true },
];

interface AllCategoriesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllCategoriesMegaMenu: React.FC<AllCategoriesMegaMenuProps> = ({ isOpen, onClose }) => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<{ id: string; nameEn: string; nameFa: string; nameAr: string; icon?: string }[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const load = async () => {
      try {
        const res = await categoryService.list();
        const items = res.items ?? [];
        setCategories(items.map((c) => ({
          id: c.id,
          nameEn: c.nameEn ?? c.nameFa ?? '',
          nameFa: c.nameFa ?? c.nameEn ?? '',
          nameAr: c.nameAr ?? c.nameEn ?? '',
          icon: c.icon ?? '📦',
        })));
      } catch {
        setCategories([
          { id: '1', nameEn: 'Apparel & Accessories', nameFa: 'پوشاک و لوازم جانبی', nameAr: 'الملابس والإكسسوارات', icon: '👔' },
          { id: '2', nameEn: 'Consumer Electronics', nameFa: 'الکترونیک مصرفی', nameAr: 'الإلكترونيات الاستهلاكية', icon: '📱' },
          { id: '3', nameEn: 'Luggage, Bags & Cases', nameFa: 'چمدان و کیف', nameAr: 'الأمتعة والحقائب', icon: '👜' },
          { id: '4', nameEn: 'Parents, Kids & Toys', nameFa: 'کودک و اسباب‌بازی', nameAr: 'الأطفال والألعاب', icon: '🧸' },
          { id: '5', nameEn: 'Commercial Equipment & Machinery', nameFa: 'ماشین‌آلات تجاری', nameAr: 'معدات وآلات تجارية', icon: '🏭' },
          { id: '6', nameEn: 'Home & Garden', nameFa: 'خانه و باغ', nameAr: 'المنزل والحديقة', icon: '🏠' },
          { id: '7', nameEn: 'Sports & Entertainment', nameFa: 'ورزش و سرگرمی', nameAr: 'الرياضة والترفيه', icon: '🏆' },
          { id: '8', nameEn: 'Sportswear & Outdoor Apparel', nameFa: 'پوشاک ورزشی', nameAr: 'ملابس رياضية', icon: '👕' },
        ]);
      }
    };
    load();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const getCatName = (c: { nameEn: string; nameFa: string; nameAr: string }) => {
    if (language === 'fa') return c.nameFa;
    if (language === 'ar') return c.nameAr;
    return c.nameEn;
  };

  const getItemName = (item: typeof FEATURED_ITEMS[0]) => {
    if (language === 'fa') return item.nameFa;
    if (language === 'ar') return item.nameAr;
    return item.nameEn;
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} aria-hidden="true" />
      <div
        className="fixed top-0 left-0 right-0 z-50 bg-card border-b shadow-2xl max-h-[85vh] overflow-hidden flex flex-col"
        style={dir === 'rtl' ? { left: 0, right: 0 } : {}}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b shrink-0">
          <h2 className="text-lg font-bold">
            {language === 'fa' ? 'همه دسته‌بندی‌ها' : language === 'ar' ? 'جميع الفئات' : 'All categories'}
          </h2>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-auto min-h-0">
          {/* Left column - Categories for you (list) */}
          <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-e border-border bg-muted/20">
            <div className="p-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <h3 className="font-bold">
                {language === 'fa' ? 'دسته‌بندی‌ها برای شما' : language === 'ar' ? 'فئات لك' : 'Categories for you'}
              </h3>
            </div>
            <nav className="p-2 pb-4 space-y-0.5 max-h-[60vh] overflow-y-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-start transition-colors',
                    hoveredId === cat.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'
                  )}
                  onMouseEnter={() => setHoveredId(cat.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => { navigate(`/categories/${cat.id}`); onClose(); }}
                >
                  <span className="text-xl shrink-0">{cat.icon}</span>
                  <span className="flex-1 min-w-0 truncate text-sm font-medium">{getCatName(cat)}</span>
                  <ChevronRight className={cn('h-4 w-4 shrink-0', dir === 'rtl' && 'rotate-180')} />
                </button>
              ))}
            </nav>
          </div>

          {/* Right column - Categories for you (featured grid) */}
          <div className="lg:col-span-3 p-4 overflow-auto">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-primary" />
              <h3 className="font-bold">
                {language === 'fa' ? 'دسته‌بندی‌ها برای شما' : language === 'ar' ? 'فئات لك' : 'Categories for you'}
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {FEATURED_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="group relative rounded-xl overflow-hidden border bg-card hover:shadow-lg hover:border-primary/50 transition-all text-start"
                  onClick={() => { navigate(`/search?q=${encodeURIComponent(item.nameEn)}`); onClose(); }}
                >
                  <div className="aspect-square bg-muted relative">
                    <img
                      src={item.image}
                      alt={getItemName(item)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {item.hot && (
                      <span className="absolute top-1.5 end-1.5 bg-primary text-primary-foreground rounded-full p-1">
                        <Flame className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                  <div className="p-2">
                    <span className="text-xs font-medium line-clamp-2">{getItemName(item)}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t">
              <h4 className="text-sm font-bold text-muted-foreground mb-2">
                {language === 'fa' ? 'پوشاک و لوازم جانبی' : language === 'ar' ? 'الملابس والإكسسوارات' : 'Apparel & Accessories'}
              </h4>
              <button
                type="button"
                onClick={() => { navigate('/categories'); onClose(); }}
                className="text-primary font-semibold text-sm hover:underline flex items-center gap-1"
              >
                {language === 'fa' ? 'مشاهده انتخاب‌های برجسته' : language === 'ar' ? 'تصفح التحديدات المميزة' : 'Browse featured selections'}
                <ChevronRight className={cn('h-4 w-4', dir === 'rtl' && 'rotate-180')} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCategoriesMegaMenu;
