import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSectionCompact from '@/components/home/HeroSectionCompact';
import CategoryMenuSection from '@/components/home/CategoryMenuSection';
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
        {/* Hero Section - Compact Alibaba style with prominent search */}
        <HeroSectionCompact />
        
        {/* Category Menu - Horizontal scrollable categories */}
        <CategoryMenuSection />
        
        {/* Frequently Searched - Image cards with search queries */}
        <FrequentlySearchedSection />
        
        {/* Feature Banners - EU Stock, Guaranteed, Fast Customization */}
        <FeatureBannersSection />
        
        {/* Top Deals - Products with prices and MOQ */}
        <TopDealsSection />
        
        {/* Top Ranking - Best rated products */}
        <TopRankingSection />
        
        {/* New Arrivals - Latest products */}
        <NewArrivalsSection />
        
        {/* Tailored Selections - Curated product collections */}
        <TailoredSelectionsSection />
        
        {/* Special Offers - Discount promotions */}
        <SpecialOffersSection />
        
        {/* Trust & CTA Sections */}
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
