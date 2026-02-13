import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { productService, Product } from '@/services/product.service';

const TailoredSelectionsSection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.list({ limit: 8 });
        setProducts(response.items || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    {
      titleEn: 'Signature Artificial Roses and Lotu...',
      titleFa: 'گل‌های مصنوعی امضا و نیلوفر...',
      titleAr: 'الورود الاصطناعية المميزة واللوتس...',
      count: '280+ items'
    },
    {
      titleEn: 'Nature And Celestial Motif Fashion...',
      titleFa: 'مد طبیعت و نقوش آسمانی...',
      titleAr: 'موضة الطبيعة والزخارف السماوية...',
      count: '150+ items'
    },
    {
      titleEn: 'Affordable Precious Look Fine Ring...',
      titleFa: 'حلقه‌های ظریف با ظاهر گرانبها...',
      titleAr: 'خواتم فاخرة بأسعار معقولة...',
      count: '320+ items'
    },
  ];

  const getTitle = (cat: typeof categories[0]) => {
    if (language === 'fa') return cat.titleFa;
    if (language === 'ar') return cat.titleAr;
    return cat.titleEn;
  };

  return (
    <div className="bg-background py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {language === 'fa' ? 'انتخاب‌های ویژه' : language === 'ar' ? 'التحديدات المخصصة' : 'Tailored Selections'}
            </h2>
          </div>
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80"
            onClick={() => navigate('/products')}
          >
            {language === 'fa' ? 'مشاهده همه' : language === 'ar' ? 'عرض الكل' : 'View more'}
            <ChevronRight className={`h-4 w-4 ${language === 'fa' || language === 'ar' ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigate('/products')}
              className="p-4 bg-card border rounded-lg hover:shadow-md transition-all cursor-pointer group"
            >
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                {getTitle(cat)}
              </h3>
              <p className="text-sm text-muted-foreground">{cat.count}</p>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {[...Array(8)].map((_, idx) => (
              <div key={idx} className="animate-pulse">
                <div className="bg-muted rounded-lg aspect-square mb-2" />
                <div className="bg-muted h-3 rounded mb-1" />
                <div className="bg-muted h-3 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {products.slice(0, 8).map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className="group cursor-pointer bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-all"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.images?.[0] ?? (product as { imageUrl?: string }).imageUrl ?? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-2">
                  {/* Price */}
                  <div className="mb-1">
                    <span className="text-primary font-bold text-sm">
                      {product.currency === 'USD' ? '$' : product.currency === 'EUR' ? '€' : ''}
                      {(Number(product.price) ?? 0).toFixed(2)}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-xs text-foreground line-clamp-2 min-h-[32px]">
                    {product.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TailoredSelectionsSection;
