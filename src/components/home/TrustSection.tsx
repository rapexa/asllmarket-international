import React from 'react';
import { ShieldCheck, Lock, Headphones, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TrustSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: ShieldCheck,
      title: t('trust.verified.title'),
      description: t('trust.verified.desc'),
      color: 'bg-success/10 text-success',
    },
    {
      icon: Lock,
      title: t('trust.secure.title'),
      description: t('trust.secure.desc'),
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Headphones,
      title: t('trust.support.title'),
      description: t('trust.support.desc'),
      color: 'bg-accent/10 text-accent',
    },
    {
      icon: Globe,
      title: t('trust.global.title'),
      description: t('trust.global.desc'),
      color: 'bg-purple-500/10 text-purple-500',
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16">
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">{t('trust.title')}</h2>
          <p className="section-subtitle text-sm sm:text-base md:text-lg mt-2">{t('trust.subtitle')}</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground leading-tight">{feature.title}</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed px-2">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-10 sm:mt-12 md:mt-16 flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 opacity-60">
          {['SSL Secured', 'PCI Compliant', 'Trade Assurance', 'Verified Business'].map((badge, i) => (
            <div key={i} className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground text-xs sm:text-sm md:text-base">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              <span className="font-medium whitespace-nowrap">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
