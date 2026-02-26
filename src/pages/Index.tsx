import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSectionCompact from '@/components/home/HeroSectionCompact';
import CategoryMenuSection from '@/components/home/CategoryMenuSection';
import HotProductsGrid from '@/components/home/HotProductsGrid';
import FrequentlySearchedSection from '@/components/home/FrequentlySearchedSection';
import FeatureBannersSection from '@/components/home/FeatureBannersSection';
import TopDealsSection from '@/components/home/TopDealsSection';
import TopRankingSection from '@/components/home/TopRankingSection';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import TailoredSelectionsSection from '@/components/home/TailoredSelectionsSection';
import SpecialOffersSection from '@/components/home/SpecialOffersSection';
import TrustSection from '@/components/home/TrustSection';
import CTASection from '@/components/home/CTASection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* 1. Hero با Search برجسته + AI Mode - مثل Alibaba */}
        <HeroSectionCompact />

        {/* 2. Categories Grid - "Categories for you" */}
        <CategoryMenuSection />

        {/* 3. Frequently Searched - محصولات پرجستجو با تصاویر */}
        <HotProductsGrid />

        {/* 4. Featured Banners - Free Shipping, Alibaba Guaranteed, Fast Customization */}
        <FeatureBannersSection />

        {/* 5. Top Deals - "Score the lowest prices" */}
        <TopDealsSection />

        {/* 6. Top Ranking - "Navigate trends with data-driven rankings" */}
        <TopRankingSection />

        {/* 7. New Arrivals - "Stay ahead with the latest offerings" */}
        <NewArrivalsSection />

        {/* 8. Tailored Selections - "Smart sourcing" */}
        <TailoredSelectionsSection />

        {/* 9. Special Offers - "£10 off every £100 · Buy more, save more" */}
        <SpecialOffersSection />

        {/* 10. Trust & CTA */}
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
