import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Package, Truck, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { productService, Product } from '@/services';
import { Button } from '@/components/ui/button';

const RecommendedSection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await productService.list({ limit: 12 });
        setProducts(response.items || []);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="bg-muted/30 py-12">
      <div className="container">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-8">
          {language === 'fa' ? 'پیشنهاد شده برای کسب‌وکار شما' : language === 'ar' ? 'موصى به لعملك' : 'Recommended for your business'}
        </h2>

        {/* 3 Big Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1. EU Local Stock - Red */}
          <div className="bg-gradient-to-br from-red-900 to-red-700 rounded-2xl overflow-hidden text-white">
            <div className="p-6">
              <h3 className="text-3xl font-bold mb-4">EU local stock</h3>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Fastest delivery in 5 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>No import charges</span>
                </div>
              </div>
              <Button variant="secondary" className="rounded-full">
                Explore now
              </Button>
            </div>
            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-white/5">
              {products.slice(0, 2).map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-muted relative">
                    <img
                      src={product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-white text-red-600 text-xs font-bold px-2 py-1 rounded">
                      Local
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-600 line-clamp-1">{product.name}</p>
                    <p className="text-sm font-bold text-gray-900">${(Number(product.price) ?? 0).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Alibaba Guaranteed - Orange */}
          <div className="bg-gradient-to-br from-orange-600 to-orange-500 rounded-2xl overflow-hidden text-white">
            <div className="p-6">
              <h3 className="text-3xl font-bold mb-4">
                <span className="text-white">ASL</span> Guaranteed
              </h3>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Quick order and pay</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>On-time delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Money-back guarantee</span>
                </div>
              </div>
              <Button variant="secondary" className="rounded-full">
                Explore now
              </Button>
            </div>
            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-white/5">
              {products.slice(2, 4).map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-muted relative">
                    <img
                      src={product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Guaranteed
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-600 line-clamp-1">{product.name}</p>
                    <p className="text-sm font-bold text-gray-900">${(Number(product.price) ?? 0).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Fast Customization - Purple */}
          <div className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-2xl overflow-hidden text-white">
            <div className="p-6">
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Zap className="h-8 w-8" />
                Fast customization
              </h3>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Low MOQ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>14-day dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>True to design</span>
                </div>
              </div>
              <Button variant="secondary" className="rounded-full">
                Explore now
              </Button>
            </div>
            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-white/5">
              {products.slice(4, 6).map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-muted relative">
                    <img
                      src={product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Custom
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-600 line-clamp-1">{product.name}</p>
                    <p className="text-sm font-bold text-gray-900">${(Number(product.price) ?? 0).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedSection;
