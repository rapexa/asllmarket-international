import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Shield, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const FeatureBannersSection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const features = [
    {
      titleEn: 'EU local stock',
      titleFa: 'موجودی محلی اروپا',
      titleAr: 'المخزون المحلي في الاتحاد الأوروبي',
      subtitleEn: 'Fast and easy to order',
      subtitleFa: 'سریع و آسان برای سفارش',
      subtitleAr: 'سريع وسهل الطلب',
      descEn: 'No import duty',
      descFa: 'بدون عوارض گمرکی',
      descAr: 'بدون رسوم استيراد',
      icon: Package,
      gradient: 'from-red-900 to-red-700',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=400&fit=crop',
      action: '/products?filter=eu-stock'
    },
    {
      titleEn: 'Alibaba Guaranteed',
      titleFa: 'تضمین کیفیت',
      titleAr: 'ضمان علي بابا',
      subtitleEn: 'Quick and easy to order',
      subtitleFa: 'سریع و آسان برای سفارش',
      subtitleAr: 'سريع وسهل الطلب',
      descEn: 'On-time delivery',
      descFa: 'تحویل به موقع',
      descAr: 'التسليم في الوقت المحدد',
      icon: Shield,
      gradient: 'from-orange-900 to-orange-700',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=400&fit=crop',
      action: '/trade-assurance'
    },
    {
      titleEn: 'Fast customization',
      titleFa: 'سفارشی‌سازی سریع',
      titleAr: 'التخصيص السريع',
      subtitleEn: 'Available',
      subtitleFa: 'در دسترس',
      subtitleAr: 'متاح',
      descEn: '1 day dispatch',
      descFa: 'ارسال ۱ روزه',
      descAr: 'شحن يوم واحد',
      icon: Zap,
      gradient: 'from-purple-900 to-purple-700',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
      action: '/products?filter=custom'
    },
  ];

  const getTitle = (item: typeof features[0]) => {
    if (language === 'fa') return item.titleFa;
    if (language === 'ar') return item.titleAr;
    return item.titleEn;
  };

  const getSubtitle = (item: typeof features[0]) => {
    if (language === 'fa') return item.subtitleFa;
    if (language === 'ar') return item.subtitleAr;
    return item.subtitleEn;
  };

  const getDesc = (item: typeof features[0]) => {
    if (language === 'fa') return item.descFa;
    if (language === 'ar') return item.descAr;
    return item.descEn;
  };

  return (
    <div className="bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${feature.gradient} p-6 text-white group hover:shadow-2xl transition-all cursor-pointer`}
              onClick={() => navigate(feature.action)}
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-20">
                <img 
                  src={feature.image} 
                  alt={getTitle(feature)}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <feature.icon className="h-10 w-10 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{getTitle(feature)}</h3>
                <p className="text-sm opacity-90 mb-1">● {getSubtitle(feature)}</p>
                <p className="text-sm opacity-90 mb-4">● {getDesc(feature)}</p>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30"
                >
                  {language === 'fa' ? 'کاوش کنید' : language === 'ar' ? 'استكشف الآن' : 'Explore now'}
                </Button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureBannersSection;
