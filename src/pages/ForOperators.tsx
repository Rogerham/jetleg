import { useTranslation } from 'react-i18next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Plane, TrendingUp, Users, Shield, ArrowRight } from 'lucide-react';

const ForOperators = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: TrendingUp,
      title: t('forOperators.benefits.revenue.title'),
      description: t('forOperators.benefits.revenue.description'),
    },
    {
      icon: Plane,
      title: t('forOperators.benefits.utilization.title'),
      description: t('forOperators.benefits.utilization.description'),
    },
    {
      icon: Users,
      title: t('forOperators.benefits.exposure.title'),
      description: t('forOperators.benefits.exposure.description'),
    },
    {
      icon: Shield,
      title: t('forOperators.benefits.security.title'),
      description: t('forOperators.benefits.security.description'),
    },
  ];

  const features = [
    {
      title: t('forOperators.features.listing.title'),
      description: t('forOperators.features.listing.description'),
    },
    {
      title: t('forOperators.features.scheduling.title'),
      description: t('forOperators.features.scheduling.description'),
    },
    {
      title: t('forOperators.features.communication.title'),
      description: t('forOperators.features.communication.description'),
    },
    {
      title: t('forOperators.features.analytics.title'),
      description: t('forOperators.features.analytics.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Breadcrumb Section */}
        <section className="py-6 bg-muted/20">
          <div className="container mx-auto px-6">
            <PageBreadcrumb 
              items={[
                { label: 'Voor Operators' }
              ]}
            />
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              {t('forOperators.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in">
              {t('forOperators.hero.subtitle')}
            </p>
            <a
              href="/register"
              className="btn-jetleg-primary inline-flex items-center gap-2 animate-fade-in"
            >
              {t('forOperators.hero.cta')}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center text-foreground mb-12 animate-fade-in">
              {t('forOperators.benefits.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-2xl shadow-md card-jetleg animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <benefit.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center text-foreground mb-12 animate-fade-in">
              {t('forOperators.features.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-muted/20 rounded-2xl card-jetleg animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold text-foreground mb-8 animate-fade-in">
              {t('forOperators.cta.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in">
              {t('forOperators.cta.description')}
            </p>
            <a
              href="/register"
              className="btn-jetleg-secondary inline-flex items-center gap-2 animate-fade-in"
            >
              {t('forOperators.cta.button')}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForOperators;
