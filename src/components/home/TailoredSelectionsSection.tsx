import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { productService, Product } from '@/services/product.service';

const TailoredSelectionsSection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.list({ limit: 12 });
        setProducts(response.items || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const collections = [
    { name: 'Signature Artificial Roses and Lotus...', views: '38K+ views', items: products.slice(0, 2) },
    { name: 'Nature And Celestial Motif Fashion Rings', views: '28K+ views', items: products.slice(2, 4) },
    { name: "Women's Cushioned Performance...", views: '12K+ views', items: products.slice(4, 6) },
  ];

  return (
    <div className="bg-background py-8">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">
            {language === 'fa' ? 'انتخاب‌های ویژه' : 'Tailored Selections'}
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-1 text-sm font-semibold hover:text-primary transition-colors"
          >
            View more
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Collections Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, idx) => (
            <div key={idx} className="space-y-3">
              <div>
                <h3 className="font-bold text-lg mb-1">{collection.name}</h3>
                <p className="text-sm text-muted-foreground">{collection.views}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {collection.items.map((product) => {
                  const price = Number(product.price) ?? 0;
                  return (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="cursor-pointer group"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-2">
                        <img
                          src={product.images?.[0] ?? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="font-bold">
                        €{price.toFixed(4)}-{(price * 1.2).toFixed(4)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TailoredSelectionsSection;
