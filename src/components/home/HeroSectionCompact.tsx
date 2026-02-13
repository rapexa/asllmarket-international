import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Camera, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSectionCompact: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const quickLinks = [
    { labelEn: 'Request for Quotation', labelFa: 'درخواست قیمت', labelAr: 'طلب عرض أسعار', path: '/post-request' },
    { labelEn: 'Top Ranking', labelFa: 'برترین رتبه‌ها', labelAr: 'أعلى التصنيفات', path: '/products' },
    { labelEn: 'Fast customization', labelFa: 'سفارشی‌سازی سریع', labelAr: 'التخصيص السريع', path: '/products?filter=custom' },
  ];

  const getLabel = (link: typeof quickLinks[0]) => {
    if (language === 'fa') return link.labelFa;
    if (language === 'ar') return link.labelAr;
    return link.labelEn;
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-violet-900/80 to-accent/30 text-primary-foreground py-12 md:py-16">
      {/* رنگ سازمانی نارنجی و بنفش */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-xl px-4 py-2 rounded-full text-sm font-semibold border border-primary-foreground/10 shadow-lg mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span>
              {language === 'fa' ? 'به ASL Market خوش آمدید' : language === 'ar' ? 'مرحبا بك في ASL Market' : 'Welcome to ASL Market'}
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

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {quickLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => navigate(link.path)}
                className="flex items-center gap-1 text-sm text-primary-foreground/90 hover:text-primary-foreground bg-background/10 hover:bg-background/20 px-4 py-2 rounded-full transition-colors backdrop-blur-sm border border-primary-foreground/10"
              >
                {getLabel(link)}
                <ArrowRight className="h-3 w-3" />
              </button>
            ))}
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
