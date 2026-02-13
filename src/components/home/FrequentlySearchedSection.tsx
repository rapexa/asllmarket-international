import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FrequentlySearchedSection: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const frequentSearches = [
    {
      titleEn: 'Electronics',
      titleFa: 'لوازم الکترونیکی',
      titleAr: 'الإلكترونيات',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop',
      query: 'electronics'
    },
    {
      titleEn: 'Fashion',
      titleFa: 'مد و پوشاک',
      titleAr: 'الموضة',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop',
      query: 'fashion'
    },
  ];

  const frequentCategories = [
    {
      titleEn: 'Cars',
      titleFa: 'خودرو',
      titleAr: 'السيارات',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=300&h=300&fit=crop',
      query: 'cars'
    },
  ];

  const getTitle = (item: typeof frequentSearches[0]) => {
    if (language === 'fa') return item.titleFa;
    if (language === 'ar') return item.titleAr;
    return item.titleEn;
  };

  return (
    <div className="bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Frequently Searched */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-foreground">
              {language === 'fa' ? 'جستجوهای پرتکرار' : language === 'ar' ? 'البحث المتكرر' : 'Frequently searched'}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {frequentSearches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(`/search?q=${item.query}`)}
                  className="group relative overflow-hidden rounded-xl bg-muted hover:shadow-lg transition-all"
                >
                  <div className="aspect-square">
                    <img 
                      src={item.image} 
                      alt={getTitle(item)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white font-semibold text-lg">
                      {getTitle(item)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Frequently Searched Categories */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-foreground">
              {language === 'fa' ? 'دسته‌بندی‌های پرتکرار' : language === 'ar' ? 'الفئات المتكررة' : 'Frequently searched'}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {frequentCategories.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(`/search?q=${item.query}`)}
                  className="group relative overflow-hidden rounded-xl bg-muted hover:shadow-lg transition-all"
                >
                  <div className="aspect-[2/1]">
                    <img 
                      src={item.image} 
                      alt={getTitle(item)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white font-semibold text-xl">
                      {getTitle(item)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequentlySearchedSection;
