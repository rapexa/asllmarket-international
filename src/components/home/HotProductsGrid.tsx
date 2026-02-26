import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, TrendingUp, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { productService, Product } from '@/services/product.service';

const HotProductsGrid: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotProducts = async () => {
      try {
        const response = await productService.list({ limit: 10 });
        setHotProducts(response.items || []);
      } catch (error) {
        console.error('Failed to fetch hot products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotProducts();
  }, []);

  const hotCategories = [
    { nameEn: 'Camera', nameFa: 'دوربین', nameAr: 'كاميرا', icon: '📷', tag: 'hot' },
    { nameEn: 'Smart Watches', nameFa: 'ساعت هوشمند', nameAr: 'ساعات ذكية', icon: '⌚', tag: 'hot' },
    { nameEn: 'Drones', nameFa: 'پهپاد', nameAr: 'طائرات بدون طيار', icon: '🚁', tag: 'hot' },
    { nameEn: 'Electric Scooters', nameFa: 'اسکوتر برقی', nameAr: 'سكوتر كهربائي', icon: '🛴', tag: 'trending' },
    { nameEn: 'Vending Machines', nameFa: 'دستگاه فروش خودکار', nameAr: 'آلات البيع', icon: '🏪', tag: 'new' },
    { nameEn: 'Smart TVs', nameFa: 'تلویزیون هوشمند', nameAr: 'تلفزيونات ذكية', icon: '📺', tag: 'hot' },
    { nameEn: 'Electric Cars', nameFa: 'خودروی برقی', nameAr: 'سيارات كهربائية', icon: '🚗', tag: 'trending' },
    { nameEn: 'Wedding Dresses', nameFa: 'لباس عروس', nameAr: 'فساتين الزفاف', icon: '👰', tag: 'hot' },
    { nameEn: 'Evening Dresses', nameFa: 'لباس مجلسی', nameAr: 'فساتين سهرة', icon: '👗', tag: 'new' },
    { nameEn: 'Handbags', nameFa: 'کیف دستی', nameAr: 'حقائب يد', icon: '👜', tag: 'hot' },
  ];

  const getName = (cat: typeof hotCategories[0]) => {
    if (language === 'fa') return cat.nameFa;
    if (language === 'ar') return cat.nameAr;
    return cat.nameEn;
  };

  const getBadge = (tag: string) => {
    switch (tag) {
      case 'hot':
        return { icon: Flame, text: 'HOT', color: 'bg-red-500' };
      case 'trending':
        return { icon: TrendingUp, text: 'TRENDING', color: 'bg-orange-500' };
      case 'new':
        return { icon: Zap, text: 'NEW', color: 'bg-green-500' };
      default:
        return null;
    }
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {language === 'fa' ? 'محصولات داغ' : language === 'ar' ? 'المنتجات الساخنة' : 'Frequently searched'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'fa' ? 'پرجستجوترین محصولات' : language === 'ar' ? 'المنتجات الأكثر بحثاً' : 'Most searched products and categories'}
          </p>
        </div>

        {/* Grid with infinite scroll effect */}
        <div className="relative overflow-hidden">
          {/* First Row - scrolling */}
          <div className="flex gap-4 mb-4 animate-marquee hover:pause">
            {[...hotCategories, ...hotCategories].map((cat, idx) => {
              const badge = getBadge(cat.tag);
              return (
                <button
                  key={idx}
                  onClick={() => navigate(`/search?q=${cat.nameEn.toLowerCase()}`)}
                  className="group relative flex-shrink-0 w-40 h-40 bg-card rounded-xl border hover:border-accent transition-all overflow-hidden hover:shadow-lg"
                >
                  {/* Badge */}
                  {badge && (
                    <div className={`absolute top-2 right-2 ${badge.color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 z-10`}>
                      <badge.icon className="h-3 w-3" />
                      {badge.text}
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <span className="text-sm font-medium text-center line-clamp-2 group-hover:text-accent transition-colors">
                      {getName(cat)}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}
          </div>

          {/* Second Row - Products from API */}
          {!loading && hotProducts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {hotProducts.slice(0, 5).map((product) => (
                <button
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="group relative aspect-square bg-card rounded-xl border hover:border-accent transition-all overflow-hidden hover:shadow-lg"
                >
                  <img
                    src={product.images?.[0] ?? (product as any).imageUrl ?? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Overlay with name */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-medium line-clamp-2">{product.name}</p>
                      <p className="text-accent text-xs font-bold mt-1">
                        ${(Number(product.price) ?? 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotProductsGrid;
