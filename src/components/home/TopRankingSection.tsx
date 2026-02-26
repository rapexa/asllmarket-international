import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { productService, Product } from '@/services/product.service';

const TopRankingSection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.list({ limit: 3 });
        setProducts(response.items || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { name: 'Tiles', badge: 'Hot selling', image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=300&h=300&fit=crop' },
    { name: 'Blenders', badge: 'Hot selling', image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&h=300&fit=crop' },
    { name: 'Feed Processing...', badge: 'Hot selling', image: 'https://images.unsplash.com/photo-1581093458791-9d42e40c8f3f?w=300&h=300&fit=crop' },
  ];

  return (
    <div className="bg-background py-8">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-1">
              {language === 'fa' ? 'برترین رتبه‌ها' : 'Top Ranking'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === 'fa' ? 'روندها را با رتبه‌بندی‌های مبتنی بر داده پیدا کنید' : 'Navigate trends with data-driven rankings'}
            </p>
          </div>
          <button
            onClick={() => navigate('/products?sort=ranking')}
            className="flex items-center gap-1 text-sm font-semibold hover:text-primary transition-colors"
          >
            View more
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Categories Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group cursor-pointer"
              onClick={() => navigate('/products')}
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* TOP badge */}
                <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-3 py-1 rounded">
                  TOP
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1">{cat.name}</h3>
              <p className="text-sm text-muted-foreground">{cat.badge}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRankingSection;
