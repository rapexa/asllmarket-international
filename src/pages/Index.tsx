import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ProductsSection from '@/components/home/ProductsSection';
import OffersSection from '@/components/home/OffersSection';
import TrustSection from '@/components/home/TrustSection';
import CTASection from '@/components/home/CTASection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <OffersSection />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
