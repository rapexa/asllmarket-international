import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Camera, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSectionCompact: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-violet-900/80 to-accent/30 text-primary-foreground py-12 md:py-16">
      {/* رنگ سازمانی نارنجی و بنفش */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* AI Mode Badge - مثل علی‌بابا */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 backdrop-blur-xl px-5 py-2.5 rounded-full text-sm font-bold border border-white/20 shadow-2xl mb-6 hover:scale-105 transition-transform cursor-pointer">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-white">
              🤖 {language === 'fa' ? 'حالت هوشمند AI' : language === 'ar' ? 'وضع الذكاء الاصطناعي' : 'AI Mode'}
            </span>
            <span className="text-white/80 text-xs hidden sm:inline">
              • {language === 'fa' ? 'جستجوی هوشمند' : language === 'ar' ? 'بحث ذكي' : 'Smart Sourcing'}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {language === 'fa' 
              ? 'بزرگترین بازار B2B جهان' 
              : language === 'ar' 
              ? 'أكبر سوق B2B في العالم'
              : 'The Leading B2B eCommerce Platform'}
          </h1>

          {/* Search Bar - Prominent like Alibaba */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2 bg-white rounded-full shadow-2xl p-2 max-w-3xl mx-auto">
              <Input
                type="text"
                placeholder={
                  language === 'fa' 
                    ? 'محصولات، تامین‌کنندگان را جستجو کنید...' 
                    : language === 'ar'
                    ? 'ابحث عن المنتجات والموردين...'
                    : 'Search products, suppliers...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 focus-visible:ring-0 text-foreground bg-transparent text-base"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:text-foreground"
                onClick={() => navigate('/advanced-search')}
              >
                <Camera className="h-5 w-5" />
              </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-8"
                >
                <Search className="h-5 w-5 me-2" />
                {language === 'fa' ? 'جستجو' : language === 'ar' ? 'بحث' : 'Search'}
              </Button>
            </div>
          </form>

          {/* Quick Links - RFQ, Top Ranking, Fast Customization */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/post-request')}
              className="flex items-center gap-2 text-sm text-primary-foreground bg-background/15 hover:bg-background/25 px-5 py-2.5 rounded-full transition-colors backdrop-blur-sm border border-primary-foreground/20 font-semibold shadow-lg"
            >
              <span className="text-lg">📋</span>
              {language === 'fa' ? 'درخواست قیمت' : language === 'ar' ? 'طلب عرض أسعار' : 'Request for Quotation'}
            </button>
            <button
              onClick={() => navigate('/products')}
              className="flex items-center gap-2 text-sm text-primary-foreground bg-background/15 hover:bg-background/25 px-5 py-2.5 rounded-full transition-colors backdrop-blur-sm border border-primary-foreground/20 font-semibold shadow-lg"
            >
              <TrendingUp className="h-4 w-4" />
              {language === 'fa' ? 'برترین رتبه‌ها' : language === 'ar' ? 'أعلى التصنيفات' : 'Top Ranking'}
            </button>
            <button
              onClick={() => navigate('/products?filter=custom')}
              className="flex items-center gap-2 text-sm text-primary-foreground bg-background/15 hover:bg-background/25 px-5 py-2.5 rounded-full transition-colors backdrop-blur-sm border border-primary-foreground/20 font-semibold shadow-lg"
            >
              <Zap className="h-4 w-4" />
              {language === 'fa' ? 'سفارشی‌سازی سریع' : language === 'ar' ? 'التخصيص السريع' : 'Fast customization'}
            </button>
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16">
          <path 
            d="M0 60L60 55C120 50 240 40 360 37.5C480 35 600 40 720 42.5C840 45 960 45 1080 42.5C1200 40 1320 35 1380 32.5L1440 30V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSectionCompact;
