import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Star, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { productService, Product } from '@/services/product.service';

const TopRankingSection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.list({ limit: 3 });
        setProducts(response.items || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-background py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {language === 'fa' ? 'برترین رتبه‌ها' : language === 'ar' ? 'أعلى التصنيفات' : 'Top Ranking'}
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

        <p className="text-sm text-muted-foreground mb-6">
          {language === 'fa' 
            ? 'بهترین محصولات با بیشترین رتبه‌بندی' 
            : language === 'ar' 
            ? 'أفضل المنتجات مع أعلى التصنيفات'
            : 'Discover trends with top-rated rankings'}
        </p>

        {/* Products Grid */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="animate-pulse">
                <div className="bg-muted rounded-lg aspect-square mb-3" />
                <div className="bg-muted h-4 rounded mb-2" />
                <div className="bg-muted h-4 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className="group cursor-pointer bg-card rounded-xl overflow-hidden border hover:shadow-xl transition-all"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.images?.[0] ?? (product as { imageUrl?: string }).imageUrl ?? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Ranking Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current" />
                    #{idx + 1} {language === 'fa' ? 'رتبه' : language === 'ar' ? 'التصنيف' : 'Hot selling'}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Product Name */}
                  <h3 className="text-base font-semibold text-foreground mb-3 line-clamp-2 min-h-[48px]">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(Number(product.rating) ?? 0) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
                    ))}
                    <span className="text-sm text-muted-foreground ms-2">{(Number(product.rating) ?? 0).toFixed(1)}</span>
                  </div>

                  {/* Price & MOQ */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-primary">
                        {product.currency === 'USD' ? '$' : product.currency === 'EUR' ? '€' : ''}
                        {(Number(product.price) ?? 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      MOQ: {product.moq ?? 1}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopRankingSection;
