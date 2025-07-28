import { Plane, Users, Award, Globe, Shield, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/PageHeader';

const About = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const stats = [
    {
      number: '500+',
      label: t('about.stats.customers'),
      icon: Users
    },
    {
      number: '50+',
      label: t('about.stats.destinations'),
      icon: Globe
    },
    {
      number: '98%',
      label: t('about.stats.satisfaction'),
      icon: Award
    },
    {
      number: '24/7',
      label: t('about.stats.support'),
      icon: Clock
    }
  ];

  const team = [
    {
      name: t('about.team.xavier.name'),
      role: t('about.team.xavier.role'),
      description: t('about.team.xavier.description')
    },
    {
      name: t('about.team.carley.name'),
      role: t('about.team.carley.role'),
      description: t('about.team.carley.description')
    },
    {
      name: t('about.team.marc.name'),
      role: t('about.team.marc.role'),
      description: t('about.team.marc.description')
    }
  ];

  const values = [
    {
      icon: Shield,
      title: t('about.values.safety.title'),
      description: t('about.values.safety.description')
    },
    {
      icon: Award,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: Users,
      title: t('about.values.customerCentric.title'),
      description: t('about.values.customerCentric.description')
    },
    {
      icon: Globe,
      title: t('about.values.accessibility.title'),
      description: t('about.values.accessibility.description')
    }
  ];

  const handleSearchFlights = () => {
    navigate('/');
  };

  const handleContact = () => {
    navigate('/contact');
  };

  return (
    <div>
      {/* Standardized Page Header */}
      <PageHeader
        title={t('about.hero.title')}
        subtitle={t('about.hero.subtitle')}
      />

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-title mb-6 text-foreground">{t('about.mission.title')}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t('about.mission.paragraph1')}
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                {t('about.mission.paragraph2')}
              </p>
              <p className="text-lg text-muted-foreground">
                {t('about.mission.paragraph3')}
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=600&h=400&fit=crop"
                alt="Luxe private jet interieur"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-title text-center mb-12 text-foreground">{t('about.stats.title')}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#0f1729]">
        <div className="container mx-auto px-6">
          <h2 className="text-title text-center mb-12 text-white">{t('about.values.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-jetleg p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Updated with User icons */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-title text-center mb-12 text-foreground">{t('about.team.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card-jetleg p-6 text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-accent/10 flex items-center justify-center">
                  <User className="w-12 h-12 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                <div className="text-accent font-medium mb-3">{member.role}</div>
                <p className="text-muted-foreground">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent to-[hsl(var(--jetleg-amber-dark))] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('about.cta.title')}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('about.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSearchFlights}
              className="bg-white text-accent font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition-all"
            >
              {t('about.cta.viewFlights')}
            </button>
            <button
              onClick={handleContact}
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white hover:text-accent transition-all"
            >
              {t('about.cta.contact')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
