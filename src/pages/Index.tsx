import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AlibabaHero from '@/components/home/AlibabaHero';
import WelcomeSection from '@/components/home/WelcomeSection';
import AlibabaMainSection from '@/components/home/AlibabaMainSection';
import RecommendedSection from '@/components/home/RecommendedSection';
import TopDealsSection from '@/components/home/TopDealsSection';
import TopRankingSection from '@/components/home/TopRankingSection';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import TailoredSelectionsSection from '@/components/home/TailoredSelectionsSection';
import SpecialOffersSection from '@/components/home/SpecialOffersSection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* 1. Hero - دقیقاً مثل Alibaba */}
        <AlibabaHero />

        {/* 2. Welcome با 3 دکمه */}
        <WelcomeSection />

        {/* 3. Layout اصلی: Sidebar + Frequently Searched + Banner */}
        <AlibabaMainSection />

        {/* 4. Recommended - 3 بنر بزرگ */}
        <RecommendedSection />

        {/* 5. Top Deals - با badge "Top picks" */}
        <TopDealsSection />

        {/* 6. Top Ranking - 3 کارت با badge "TOP" */}
        <TopRankingSection />

        {/* 7. New Arrivals */}
        <NewArrivalsSection />

        {/* 8. Tailored Selections - 3 ستونه با views */}
        <TailoredSelectionsSection />

        {/* 9. Special Offers - €10 off every €100 */}
        <SpecialOffersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
