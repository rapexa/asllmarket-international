import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { productService, Product as ApiProduct } from '@/services';

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: number;
  endTime: Date;
  color: string;
}

const OffersSection: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<Record<string, TimeRemaining>>({});

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const res = await productService.list({ limit: 6 });
        const items = res.items || [];
        const palette = [
          'from-blue-600 to-purple-600',
          'from-pink-500 to-rose-500',
          'from-orange-500 to-amber-500',
        ];

        const mapped: Offer[] = items.slice(0, 3).map((p: ApiProduct, index) => {
          const baseDiscount = 20 - index * 5;
          const hoursAhead = 48 + index * 24;
          return {
            id: p.id,
            title: p.name,
            description: p.description || t('offers.subtitle'),
            image: p.images?.[0] ?? (p as { imageUrl?: string }).imageUrl ?? 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
            discount: baseDiscount > 5 ? baseDiscount : 5,
            endTime: new Date(Date.now() + 3600000 * hoursAhead),
            color: palette[index % palette.length],
          };
        });

        setOffers(mapped);
      } catch (e) {
        console.error('Failed to load offers for home page:', e);
      }
    };

    loadOffers();
  }, [t]);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const times: Record<string, TimeRemaining> = {};
      offers.forEach((offer) => {
        const diff = offer.endTime.getTime() - Date.now();
        if (diff > 0) {
          times[offer.id] = {
            hours: Math.floor(diff / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
          };
        }
      });
      setTimeRemaining(times);
    };

    if (offers.length > 0) {
      calculateTimeRemaining();
      const timer = setInterval(calculateTimeRemaining, 1000);
      return () => clearInterval(timer);
    }
  }, [offers]);

  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <Flame className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <h2 className="section-title">{t('offers.title')}</h2>
              <p className="section-subtitle">{t('offers.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const time = timeRemaining[offer.id];
            
            return (
              <div
                key={offer.id}
                className="relative overflow-hidden rounded-2xl group cursor-pointer card-hover"
              >
                {/* Background Image */}
                <div className="aspect-[4/3] relative">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${offer.color} opacity-80`} />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-primary-foreground">
                    {/* Discount Badge */}
                    <div className="flex items-start justify-between">
                      <div className="bg-background text-accent px-4 py-2 rounded-xl font-bold text-2xl pulse-glow">
                        -{offer.discount}%
                      </div>
                    </div>

                    <div>
                      {/* Timer */}
                      {time && (
                        <div className="flex items-center gap-2 mb-4">
                          <Clock className="h-4 w-4" />
                          <div className="flex gap-2 text-sm font-mono">
                            <span className="bg-background/20 backdrop-blur-sm px-2 py-1 rounded">
                              {String(time.hours).padStart(2, '0')}h
                            </span>
                            <span className="bg-background/20 backdrop-blur-sm px-2 py-1 rounded">
                              {String(time.minutes).padStart(2, '0')}m
                            </span>
                            <span className="bg-background/20 backdrop-blur-sm px-2 py-1 rounded">
                              {String(time.seconds).padStart(2, '0')}s
                            </span>
                          </div>
                        </div>
                      )}

                      <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
                      <p className="text-sm opacity-90 mb-4">{offer.description}</p>

                      <Button 
                        className="bg-background text-foreground hover:bg-background/90 gap-2 rounded-xl group/btn"
                        onClick={() => navigate('/deals')}
                      >
                        {language === 'fa' ? 'خرید الان' : language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
