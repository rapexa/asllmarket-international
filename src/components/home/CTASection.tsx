import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Package, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const CTASection: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Buyer CTA */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary to-primary-light p-6 sm:p-8 md:p-10 lg:p-12 text-primary-foreground group card-hover">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 end-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-accent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-accent/20 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform shrink-0">
                <Package className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-accent" />
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
                {t('cta.buyer.title')}
              </h3>
              <p className="text-primary-foreground/80 mb-6 sm:mb-7 md:mb-8 max-w-sm text-sm sm:text-base leading-relaxed">
                {t('cta.buyer.desc')}
              </p>

              <Button 
                size="lg" 
                className="btn-gradient-accent rounded-lg sm:rounded-xl gap-2 group/btn text-sm sm:text-base px-4 sm:px-6 py-5 sm:py-6 w-full sm:w-auto"
                onClick={() => navigate('/post-request')}
              >
                <span className="whitespace-nowrap">{t('cta.buyer.btn')}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover/btn:translate-x-1 transition-transform shrink-0" />
              </Button>
            </div>

            {/* Decorative Icon */}
            <Package className="absolute bottom-4 end-4 sm:bottom-6 sm:end-6 md:bottom-8 md:end-8 h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 text-primary-foreground/5" />
          </div>

          {/* Supplier CTA */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-accent to-accent-dark p-6 sm:p-8 md:p-10 lg:p-12 text-accent-foreground group card-hover">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute bottom-0 start-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-primary rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-primary/20 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform shrink-0">
                <Store className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary-foreground" />
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
                {t('cta.supplier.title')}
              </h3>
              <p className="text-accent-foreground/80 mb-6 sm:mb-7 md:mb-8 max-w-sm text-sm sm:text-base leading-relaxed">
                {t('cta.supplier.desc')}
              </p>

              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary-light rounded-lg sm:rounded-xl gap-2 group/btn text-sm sm:text-base px-4 sm:px-6 py-5 sm:py-6 w-full sm:w-auto whitespace-nowrap"
                onClick={() => navigate('/become-supplier')}
              >
                {t('cta.supplier.btn')}
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover/btn:translate-x-1 transition-transform shrink-0" />
              </Button>
            </div>

            {/* Decorative Icon */}
            <Store className="absolute bottom-4 end-4 sm:bottom-6 sm:end-6 md:bottom-8 md:end-8 h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 text-accent-foreground/5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
