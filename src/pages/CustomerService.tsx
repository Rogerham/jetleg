
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { Phone, Mail, MessageCircle, Clock, HelpCircle, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CustomerService = () => {
  const { t } = useTranslation();
  
  const contactMethods = [
    {
      icon: Phone,
      title: t('customerService.contact.phone.title'),
      description: t('customerService.contact.phone.description'),
      contact: t('customerService.contact.phone.contact'),
      availability: t('customerService.contact.phone.availability')
    },
    {
      icon: Mail,
      title: t('customerService.contact.email.title'),
      description: t('customerService.contact.email.description'),
      contact: t('customerService.contact.email.contact'),
      availability: t('customerService.contact.email.availability')
    },
    {
      icon: MessageCircle,
      title: t('customerService.contact.chat.title'),
      description: t('customerService.contact.chat.description'),
      contact: t('customerService.contact.chat.contact'),
      availability: t('customerService.contact.chat.availability')
    }
  ];

  const serviceCategories = [
    {
      icon: HelpCircle,
      title: t('customerService.services.booking.title'),
      description: t('customerService.services.booking.description'),
      services: [
        t('customerService.services.booking.services.0'),
        t('customerService.services.booking.services.1'),
        t('customerService.services.booking.services.2'),
        t('customerService.services.booking.services.3')
      ]
    },
    {
      icon: FileText,
      title: t('customerService.services.management.title'),
      description: t('customerService.services.management.description'),
      services: [
        t('customerService.services.management.services.0'),
        t('customerService.services.management.services.1'),
        t('customerService.services.management.services.2'),
        t('customerService.services.management.services.3')
      ]
    },
    {
      icon: Clock,
      title: t('customerService.services.dayOf.title'),
      description: t('customerService.services.dayOf.description'),
      services: [
        t('customerService.services.dayOf.services.0'),
        t('customerService.services.dayOf.services.1'),
        t('customerService.services.dayOf.services.2'),
        t('customerService.services.dayOf.services.3')
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Standardized Page Header */}
      <PageHeader
        title={t('customerService.hero.title')}
        subtitle={t('customerService.hero.subtitle')}
      />

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-title text-foreground mb-4">
              Neem contact met ons op
            </h2>
            <p className="text-lg text-muted-foreground">
              Kies de methode die het beste bij je past
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => <div key={index} className="card-jetleg p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <method.icon className="h-8 w-8 text-accent" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {method.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {method.description}
                </p>
                
                <div className="font-semibold text-accent mb-2">
                  {method.contact}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {method.availability}
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-title text-foreground mb-4">
              Hoe kunnen we je helpen?
            </h2>
            <p className="text-lg text-muted-foreground">
              Onze specialisten staan klaar voor al je vragen
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => <div key={index} className="card-jetleg p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                  <category.icon className="h-8 w-8 text-accent" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {category.title}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {category.description}
                </p>
                
                <ul className="space-y-3">
                  {category.services.map((service, serviceIndex) => <li key={serviceIndex} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                      <span className="text-foreground">{service}</span>
                    </li>)}
                </ul>
              </div>)}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="card-jetleg p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  24/7 Noodlijn
                </h2>
                <p className="text-muted-foreground mb-6">
                  Voor urgente zaken op de dag van je vlucht of tijdens je reis, zijn we altijd bereikbaar via onze 24/7 noodlijn.
                </p>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-accent" />
                  <div>
                    <div className="font-semibold text-foreground">+32 2 123 45 99</div>
                    <div className="text-sm text-muted-foreground">Alleen voor noodgevallen</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-accent/5 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Wanneer bellen?
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Vluchtannulering op de dag zelf</li>
                  <li>• Medische noodgevallen</li>
                  <li>• Weersomstandigheden</li>
                  <li>• Technische problemen</li>
                  <li>• Andere dringende zaken</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-title text-foreground mb-4">
              Veel voorkomende vragen
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Kijk eerst in onze uitgebreide FAQ sectie - misschien staat je antwoord er al bij.
            </p>
            <a href="/faq" className="btn-jetleg-outline">
              Bekijk FAQ
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomerService;
