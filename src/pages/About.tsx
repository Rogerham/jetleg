import { useTranslation } from 'react-i18next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Plane, Users, Award, Target } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Plane,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: Users,
      title: t('about.values.customerCentricity.title'),
      description: t('about.values.customerCentricity.description')
    },
    {
      icon: Award,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: Target,
      title: t('about.values.sustainability.title'),
      description: t('about.values.sustainability.description')
    }
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
                { label: t('nav.about') }
              ]}
            />
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              {t('about.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              {t('about.hero.subtitle')}
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-muted/10">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-semibold text-foreground mb-4">
                {t('about.story.title')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.story.description')}
              </p>
            </div>
            <div className="animate-fade-in">
              <img 
                src="/lovable-uploads/49f9675f-6c77-414d-8499-9963995a8bd9.jpg"
                alt={t('about.story.altText')}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold text-foreground mb-8 animate-fade-in">
              {t('about.valuesSection.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="p-6 bg-muted/20 rounded-2xl card-jetleg animate-fade-in">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                    <value.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-16 bg-muted/10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold text-foreground mb-8 animate-fade-in">
              {t('about.teamSection.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in">
              {t('about.teamSection.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => (
                <div key={index} className="card-jetleg p-4 bg-white rounded-2xl shadow-md animate-fade-in">
                  <div className="h-48 w-full bg-muted rounded-xl mb-4 animate-pulse"></div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 animate-pulse bg-muted h-6 w-3/4"></h3>
                  <p className="text-muted-foreground animate-pulse bg-muted h-4 w-1/2"></p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
