import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { productService, Product } from '@/services';
import { Button } from '@/components/ui/button';

const SavingsBoosterSection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.list({ limit: 4 });
        setProducts(response.items || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-100 via-pink-50 to-orange-100 py-12">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: Text Content */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            <div className="text-sm font-bold text-muted-foreground mb-3">
              {language === 'fa' ? 'تقویت کننده صرفه‌جویی' : 'Savings Booster'}
            </div>
            <h2 className="text-4xl font-bold mb-2">
              {language === 'fa' ? 'اولین سفارش،' : 'First order,'}
            </h2>
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-primary">{language === 'fa' ? 'رایگان' : 'FREE'}</span>{' '}
              {language === 'fa' ? 'ارسال' : 'shipping'}
            </h2>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white rounded-full w-fit px-6"
              onClick={() => navigate('/deals')}
            >
              {language === 'fa' ? 'اکنون کاوش کنید' : 'Explore now'}
            </Button>
          </div>

          {/* Right: Products Grid - 4 columns */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => {
              const price = Number(product.price) ?? 0;
              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
                >
                  <div className="aspect-square bg-muted overflow-hidden">
                    <img
                      src={product.images?.[0] ?? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-xl font-bold text-primary mb-1">
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
    </div>
  );
};

export default SavingsBoosterSection;
