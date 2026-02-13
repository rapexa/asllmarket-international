import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Tag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { productService, Product } from '@/services/product.service';

const SpecialOffersSection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.list({ limit: 6 });
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
    <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-red-500 text-white p-2 rounded-lg">
              <Tag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {language === 'fa' ? '€10 تخفیف هر €100' : language === 'ar' ? '€10 خصم لكل €100' : '€10 off every €100'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {language === 'fa' ? 'خرید بیشتر، صرفه‌جویی بیشتر. قیمت‌های معتبر' : language === 'ar' ? 'اشتري أكثر، وفر أكثر. عروض صالحة' : 'Buy more, save more. Valid across stores'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80"
            onClick={() => navigate('/deals')}
          >
            {language === 'fa' ? 'مشاهده همه' : language === 'ar' ? 'عرض الكل' : 'View more'}
            <ChevronRight className={`h-4 w-4 ${language === 'fa' || language === 'ar' ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="animate-pulse">
                <div className="bg-muted rounded-lg aspect-square mb-3" />
                <div className="bg-muted h-4 rounded mb-2" />
                <div className="bg-muted h-4 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className="group cursor-pointer bg-white dark:bg-card rounded-lg overflow-hidden border hover:shadow-xl transition-all"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.images?.[0] ?? (product as { imageUrl?: string }).imageUrl ?? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Discount Badge */}
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                    -10%
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-red-600 font-bold text-lg">
                      {product.currency === 'USD' ? '$' : product.currency === 'EUR' ? '€' : ''}
                      {((Number(product.price) ?? 0) * 0.9).toFixed(2)}
                    </span>
                    <span className="text-muted-foreground text-sm line-through ms-2">
                      {product.currency === 'USD' ? '$' : product.currency === 'EUR' ? '€' : ''}
                      {(Number(product.price) ?? 0).toFixed(2)}
                    </span>
                  </div>

                  {/* MOQ */}
                  <div className="text-xs text-muted-foreground mb-2">
                    MOQ: {product.moq ?? 1}
                  </div>

                  {/* Product Name */}
                  <h3 className="text-sm font-medium text-foreground line-clamp-2 min-h-[40px]">
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

export default SpecialOffersSection;
