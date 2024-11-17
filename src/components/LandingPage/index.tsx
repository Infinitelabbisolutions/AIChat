import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import PricingSection from './PricingSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

interface LandingPageProps {
  onGetStarted: () => void;
  onDemoStart?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onDemoStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onGetStarted={onGetStarted} onDemoStart={onDemoStart} />
      <HeroSection onGetStarted={onGetStarted} onDemoStart={onDemoStart} />
      <FeaturesSection />
      <PricingSection onGetStarted={onGetStarted} />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;