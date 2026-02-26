import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Flame, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { productService, Product } from '@/services/product.service';

const TopDealsSection: React.FC = () => {
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
    <div className="bg-background py-8">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-1">
              {language === 'fa' ? 'پیشنهادات ویژه' : 'Top Deals'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === 'fa' ? 'بهترین قیمت‌ها در ASL Market' : 'Score the lowest prices on ASL Market'}
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

        {/* Top picks badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">
            <Flame className="h-3 w-3" />
            Top picks
          </span>
        </div>

        {/* Products Horizontal Scroll - Alibaba style */}
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {products.map((product) => {
            const price = Number(product.price) ?? 0;
            const originalPrice = price * 1.2; // Simulate discount
            return (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className="flex-shrink-0 w-[180px] bg-card rounded-lg border hover:shadow-lg transition-shadow cursor-pointer group"
              >
                {/* Image */}
                <div className="relative aspect-square bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={product.images?.[0] ?? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Discount badge */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    10% off
                  </div>
                  {/* Heart icon */}
                  <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-3">
                  {/* Price */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-red-600 font-bold text-lg">
                      €{price.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      €{originalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* MOQ */}
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

export default TopDealsSection;
