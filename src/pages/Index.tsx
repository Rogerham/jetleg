import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import DealsSection from '@/components/DealsSection';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <DealsSection />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
