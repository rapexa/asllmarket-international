import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { categoryService, productService, Product } from '@/services';

const AlibabaMainSection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cats, prods] = await Promise.all([
          categoryService.list(),
          productService.list({ limit: 4 }),
        ]);
        setCategories((cats.items || []).slice(0, 8));
        setProducts(prods.items || []);
      } catch (error) {
        console.error('Failed to load:', error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - Categories */}
          <div className="col-span-3">
            <div className="bg-card rounded-lg border overflow-hidden">
              <div className="p-4 border-b flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">
                  {language === 'fa' ? 'دسته‌بندی‌ها برای شما' : 'Categories for you'}
                </h3>
              </div>
              <div className="divide-y">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => navigate(`/categories/${cat.id}`)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.icon || '📦'}</span>
                      <span className="font-medium">{cat.nameEn}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle - Frequently Searched */}
          <div className="col-span-6">
            <div className="space-y-6">
              {/* Smart Watches */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">
                    {language === 'fa' ? 'جستجوهای مکرر' : 'Frequently searched'}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer hover:shadow-lg transition-shadow">
                    <img
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
                      alt="Smart Watches"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-bold">Smart Watches</h4>
                    </div>
                  </div>
                  
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer hover:shadow-lg transition-shadow">
                    <img
                      src="https://images.unsplash.com/photo-1627843563062-5f65939b8036?w=400&h=400&fit=crop"
                      alt="Cars"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-bold">Cars</h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products from API */}
              {products.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="bg-card rounded-lg border overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-square bg-muted">
                        <img
                          src={product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium line-clamp-2 mb-2">{product.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-primary font-bold">${(Number(product.price) ?? 0).toFixed(2)}</span>
                          <span className="text-sm text-muted-foreground">MOQ: {product.moq ?? 1}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right - Banner */}
          <div className="col-span-3">
            <div className="sticky top-4">
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-violet-600 to-purple-600 p-8 text-white h-full min-h-[400px]">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">
                    {language === 'fa' ? 'انتخاب محصولات با کیفیت' : 'Quality product selections'}
                  </h3>
                  <button className="mt-auto bg-white text-violet-600 px-6 py-2 rounded-full font-semibold hover:bg-white/90 transition-colors">
                    {language === 'fa' ? 'مشاهده بیشتر' : 'View more'}
                  </button>
                </div>
                <div className="absolute bottom-0 right-0 w-2/3 h-2/3 opacity-20">
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop"
                    alt="Shopping"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlibabaMainSection;
