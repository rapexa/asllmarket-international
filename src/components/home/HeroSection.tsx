import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Users, Globe, Search, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 7, hours: 23, minutes: 59, seconds: 59 });
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: Shield, value: '100K+', label: 'Verified Suppliers' },
    { icon: Users, value: '5M+', label: 'Active Buyers' },
    { icon: Globe, value: '190+', label: 'Countries' },
  ];

  return (
    <section className="relative overflow-hidden hero-gradient min-h-[600px] sm:min-h-[650px] md:min-h-[750px] lg:min-h-[850px] xl:min-h-[900px]">
      {/* Premium Background: نارنجی و بنفش سازمانی */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-violet-900/90 to-accent/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-accent/20" />
        {/* Orbs - نارنجی و بنفش */}
        <div className="absolute top-10 start-5 md:top-20 md:start-10 w-64 h-64 md:w-96 md:h-96 bg-accent/40 rounded-full blur-3xl animate-pulse-glow" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-10 end-5 md:bottom-20 md:end-10 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-violet-500/40 rounded-full blur-3xl animate-pulse-glow" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDuration: '8s', animationDelay: '2s' }} />
      </div>

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background/30" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent/40 rounded-full float-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container relative z-10 py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32 px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content - Premium Typography */}
          <div className="text-primary-foreground space-y-6 md:space-y-8 lg:space-y-10">
            <div className="space-y-4 md:space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 md:gap-3 bg-background/20 backdrop-blur-xl px-3 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold border border-primary-foreground/10 shadow-lg flex-wrap">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-accent font-bold whitespace-nowrap">{t('hero.campaign.title')}</span>
                <span className="text-primary-foreground/60 hidden sm:inline">•</span>
                <span className="text-primary-foreground/80 whitespace-nowrap hidden sm:inline">Up to 40% OFF</span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight">
                <span className="block">{t('hero.title')}</span>
                <span className="block mt-2 md:mt-3 bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
                  ASL Market
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 max-w-xl leading-relaxed font-light px-1">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* Search Bar - مثل علی‌بابا */}
            <form onSubmit={handleSearch} className="max-w-xl">
              <div className="flex gap-2 bg-white/95 dark:bg-background/20 rounded-full shadow-2xl p-2 border border-primary-foreground/10 backdrop-blur-sm">
                <Input
                  type="text"
                  placeholder={language === 'fa' ? 'محصولات، تامین‌کنندگان را جستجو کنید...' : language === 'ar' ? 'ابحث عن المنتجات والموردين...' : 'Search products, suppliers...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-0 focus-visible:ring-0 bg-transparent text-foreground text-base"
                />
                <Button type="button" variant="ghost" size="icon" className="rounded-full shrink-0" onClick={() => navigate('/advanced-search')}>
                  <Camera className="h-5 w-5" />
                </Button>
                <Button type="submit" size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-6 shrink-0">
                  <Search className="h-5 w-5 me-2" />
                  {language === 'fa' ? 'جستجو' : language === 'ar' ? 'بحث' : 'Search'}
                </Button>
              </div>
            </form>

            {/* Premium CTA Buttons */}
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Button 
                size="lg" 
                className="btn-gradient-accent rounded-xl md:rounded-2xl text-base md:text-lg px-6 md:px-8 lg:px-10 py-5 md:py-6 lg:py-7 group shadow-2xl hover:shadow-glow transition-all duration-300 font-semibold flex-1 sm:flex-initial"
                onClick={() => navigate('/products')}
              >
                <span className="whitespace-nowrap">{t('hero.cta.explore')}</span>
                <ArrowRight className="ms-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform shrink-0" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-xl md:rounded-2xl text-base md:text-lg px-6 md:px-8 lg:px-10 py-5 md:py-6 lg:py-7 bg-background/10 backdrop-blur-xl border-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/40 transition-all font-semibold flex-1 sm:flex-initial whitespace-nowrap"
                onClick={() => navigate('/become-supplier')}
              >
                {t('hero.cta.supplier')}
              </Button>
            </div>

            {/* Premium Stats Cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 pt-4 md:pt-6">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="text-center p-3 md:p-4 rounded-xl md:rounded-2xl bg-background/10 backdrop-blur-xl border border-primary-foreground/10 hover:bg-background/20 transition-all group"
                >
                  <stat.icon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 mx-auto mb-2 md:mb-3 text-accent group-hover:scale-110 transition-transform" />
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 leading-none">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-primary-foreground/70 font-medium leading-tight px-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Premium Campaign Card */}
          <div className="relative mt-8 lg:mt-0">
            <div className="relative bg-background/15 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 border-2 border-primary-foreground/20 shadow-2xl overflow-hidden group mx-2 sm:mx-0">
              {/* نارنجی و بنفش سازمانی */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-violet-500/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              {/* Campaign Badge - Floating */}
              <div className="absolute top-1 md:top-2 start-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-accent-light text-accent-foreground px-4 sm:px-5 md:px-6 lg:px-8 py-1.5 md:py-2 lg:py-2.5 rounded-full font-bold text-[10px] sm:text-xs md:text-sm shadow-2xl pulse-glow z-10 whitespace-nowrap">
                🔥 {t('hero.campaign.subtitle')}
              </div>

              <div className="relative z-10 text-center pt-5 sm:pt-6 md:pt-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary-foreground mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-2 bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text leading-tight">
                  {t('hero.campaign.title')}
                </h3>

                {/* Premium Countdown */}
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-2">
                  {[
                    { value: timeLeft.days, label: t('hero.countdown.days') },
                    { value: timeLeft.hours, label: t('hero.countdown.hours') },
                    { value: timeLeft.minutes, label: t('hero.countdown.minutes') },
                    { value: timeLeft.seconds, label: t('hero.countdown.seconds') },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="flex flex-col items-center justify-center bg-background/30 backdrop-blur-xl border border-primary-foreground/20 shadow-lg hover:scale-105 transition-transform rounded-lg sm:rounded-xl px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 min-w-[55px] sm:min-w-[60px] md:min-w-[70px] lg:min-w-[80px]"
                    >
                      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-accent leading-none mb-1 sm:mb-1.5">
                        {String(item.value).padStart(2, '0')}
                      </div>
                      <div className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider text-primary-foreground/80 font-medium leading-tight">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  size="lg" 
                  className="btn-gradient-accent rounded-xl md:rounded-2xl text-sm sm:text-base md:text-lg w-full py-5 sm:py-6 md:py-7 shadow-2xl hover:shadow-glow font-semibold group/btn"
                  onClick={() => navigate('/deals')}
                >
                  <span className="whitespace-nowrap">{language === 'fa' ? 'خرید الان' : language === 'ar' ? 'تسوق الآن' : 'Shop Now'}</span>
                  <ArrowRight className="ms-2 h-4 w-4 md:h-5 md:w-5 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                </Button>
              </div>

              {/* Decorative Glow Elements */}
              <div className="absolute -bottom-4 -end-4 md:-bottom-8 md:-end-8 w-24 h-24 md:w-40 md:h-40 bg-accent/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -top-4 -start-4 md:-top-8 md:-start-8 w-20 h-20 md:w-32 md:h-32 bg-primary-light/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Premium Wave Bottom with Gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-32 md:h-40">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--background))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path 
            d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="url(#waveGradient)"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
