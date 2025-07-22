
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import HowItWorksComponent from '@/components/HowItWorks';

const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Breadcrumb Section */}
        <section className="py-6 bg-muted/20">
          <div className="container mx-auto px-6">
            <PageBreadcrumb 
              items={[
                { label: t('nav.howItWorks') }
              ]}
            />
          </div>
        </section>

        <HowItWorksComponent />
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
