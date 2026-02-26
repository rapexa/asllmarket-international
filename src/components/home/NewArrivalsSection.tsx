import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { productService, Product } from '@/services/product.service';

const NewArrivalsSection: React.FC = () => {
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

  return (
    <div className="bg-background py-8">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-1">
              {language === 'fa' ? 'تازه‌ها' : 'New Arrivals'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === 'fa' ? 'با آخرین پیشنهادات پیشرو باشید' : 'Stay ahead with the latest offerings'}
            </p>
          </div>
          <button
            onClick={() => navigate('/products?sort=new')}
            className="flex items-center gap-1 text-sm font-semibold hover:text-primary transition-colors"
          >
            View more
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Products Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const price = Number(product.price) ?? 0;
            return (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-3">
                  <img
                    src={product.images?.[0] ?? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="text-xl font-bold mb-1">
                  €{price.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">
                  MOQ: {product.moq ?? 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewArrivalsSection;
