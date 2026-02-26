import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Camera, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const AlibabaHero: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'manufacturers' | 'worldwide'>('products');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="bg-background border-b">
      <div className="container py-8">
        {/* AI Mode + Tabs */}
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">AI Mode</span>
            <span className="text-primary text-xl">✦</span>
          </div>
          <span className="text-2xl text-muted-foreground">|</span>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('products')}
              className={cn(
                "text-xl font-semibold pb-1 transition-colors relative",
                activeTab === 'products' ? "text-primary" : "text-foreground hover:text-primary"
              )}
            >
              {language === 'fa' ? 'محصولات' : language === 'ar' ? 'منتجات' : 'Products'}
              {activeTab === 'products' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('manufacturers')}
              className={cn(
                "text-xl font-semibold pb-1 transition-colors",
                activeTab === 'manufacturers' ? "text-primary" : "text-foreground hover:text-primary"
              )}
            >
              {language === 'fa' ? 'تولیدکنندگان' : language === 'ar' ? 'الشركات المصنعة' : 'Manufacturers'}
            </button>
            <button
              onClick={() => setActiveTab('worldwide')}
              className={cn(
                "text-xl font-semibold pb-1 transition-colors",
                activeTab === 'worldwide' ? "text-primary" : "text-foreground hover:text-primary"
              )}
            >
              {language === 'fa' ? 'جهانی' : language === 'ar' ? 'عالمي' : 'Worldwide'}
            </button>
          </div>
        </div>

        {/* Search Bar - Exact Alibaba style */}
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
          <div className="flex items-center gap-0 bg-white rounded-full border-2 border-primary shadow-lg overflow-hidden">
            <Input
              type="text"
              placeholder={language === 'fa' ? 'health watch' : language === 'ar' ? 'ساعة صحية' : 'health watch'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-0 focus-visible:ring-0 text-lg px-6 py-7 rounded-none bg-transparent"
            />
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 text-muted-foreground hover:text-foreground border-l"
              onClick={() => navigate('/image-search')}
            >
              <Camera className="h-5 w-5" />
              <span className="text-sm">Image Search</span>
            </button>
            <Button
              type="submit"
              className="rounded-none rounded-e-full bg-primary hover:bg-primary/90 px-12 py-7 text-lg"
            >
              <Search className="h-5 w-5 me-2" />
              {language === 'fa' ? 'جستجو' : language === 'ar' ? 'بحث' : 'Search'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlibabaHero;
