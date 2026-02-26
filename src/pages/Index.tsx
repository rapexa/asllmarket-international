import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AlibabaHero from '@/components/home/AlibabaHero';
import WelcomeSection from '@/components/home/WelcomeSection';
import AlibabaMainSection from '@/components/home/AlibabaMainSection';
import SavingsBoosterSection from '@/components/home/SavingsBoosterSection';
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

        {/* 4. Savings Booster - First order, FREE shipping */}
        <SavingsBoosterSection />

        {/* 5. Recommended - 3 بنر بزرگ */}
        <RecommendedSection />

        {/* 6. Top Deals - با badge "Top picks" */}
        <TopDealsSection />

        {/* 7. Top Ranking - 3 کارت با badge "TOP" */}
        <TopRankingSection />

        {/* 8. New Arrivals */}
        <NewArrivalsSection />

        {/* 9. Tailored Selections - 3 ستونه با views */}
        <TailoredSelectionsSection />

        {/* 10. Special Offers - €10 off every €100 */}
        <SpecialOffersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
