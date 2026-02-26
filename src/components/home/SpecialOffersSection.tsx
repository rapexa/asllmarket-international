import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { productService, Product } from '@/services/product.service';

const SpecialOffersSection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.list({ limit: 6 });
        setProducts(response.items || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-muted/30 py-8">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-1">
              {language === 'fa' ? '€10 تخفیف هر €100' : '€10 off every €100'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === 'fa' ? 'خرید بیشتر، صرفه‌جویی بیشتر • معتبر در همه فروشگاه‌ها' : 'Buy more, save more · Valid across stores'}
            </p>
          </div>
          <button
            onClick={() => navigate('/deals')}
            className="flex items-center gap-1 text-sm font-semibold hover:text-primary transition-colors"
          >
            View more
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Products Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {products.map((product) => {
            const price = Number(product.price) ?? 0;
            return (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className="flex-shrink-0 w-[180px] bg-card rounded-lg border hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="aspect-square rounded-t-lg overflow-hidden bg-muted">
                  <img
                    src={product.images?.[0] ?? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <div className="text-xl font-bold mb-1">
                    €{price.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    MOQ: {product.moq ?? 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpecialOffersSection;
