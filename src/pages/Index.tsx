import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSectionCompact from '@/components/home/HeroSectionCompact';
import HeroSection from '@/components/home/HeroSection';
import CategoryMenuSection from '@/components/home/CategoryMenuSection';
import FrequentlySearchedSection from '@/components/home/FrequentlySearchedSection';
import FeatureBannersSection from '@/components/home/FeatureBannersSection';
import TopDealsSection from '@/components/home/TopDealsSection';
import ProductsSection from '@/components/home/ProductsSection';
import OffersSection from '@/components/home/OffersSection';
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
        {/* Hero جدید - جستجو برجسته (بهتر) */}
        <HeroSectionCompact />

        {/* منوی دسته‌بندی */}
        <CategoryMenuSection />

        {/* جستجوهای پرتکرار */}
        <FrequentlySearchedSection />

        {/* بنرهای ویژه */}
        <FeatureBannersSection />

        {/* پیشنهادات ویژه */}
        <TopDealsSection />

        {/* Hero قدیمی - پایین وسط، کنار محصولات؛ رنگ سازمانی نارنجی و بنفش */}
        <HeroSection />

        {/* بخش محصولات (کارت‌ها با RFQ و سبد) */}
        <ProductsSection />

        {/* پیشنهادات با تایمر - قبلی */}
        <OffersSection />

        {/* برترین رتبه‌ها */}
        <TopRankingSection />

        {/* تازه‌ها */}
        <NewArrivalsSection />

        {/* انتخاب‌های ویژه */}
        <TailoredSelectionsSection />

        {/* تخفیف‌ها */}
        <SpecialOffersSection />

        {/* اعتماد و CTA */}
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
