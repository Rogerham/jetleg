import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Phone, Mail, MessageCircle, Clock, HelpCircle, FileText } from 'lucide-react';
const CustomerService = () => {
  const contactMethods = [{
    icon: Phone,
    title: "Telefoon",
    description: "Bel ons voor directe hulp",
    contact: "+32 2 123 45 67",
    availability: "Ma-Vr: 8:00 - 20:00, Za-Zo: 9:00 - 17:00"
  }, {
    icon: Mail,
    title: "Email",
    description: "Stuur ons een email",
    contact: "support@jetleg.be",
    availability: "Reactie binnen 2 uur"
  }, {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat direct met onze experts",
    contact: "Start chat in de rechter hoek",
    availability: "24/7 beschikbaar"
  }];
  const serviceCategories = [{
    icon: HelpCircle,
    title: "Boekingshulp",
    description: "Hulp bij het zoeken en boeken van je perfecte vlucht",
    services: ["Vlucht zoeken en vergelijken", "Boekingsproces ondersteuning", "Betaling en factuurvragen", "Speciale verzoeken afhandelen"]
  }, {
    icon: FileText,
    title: "Boekingsbeheer",
    description: "Wijzigingen en vragen over bestaande boekingen",
    services: ["Boekingsdetails wijzigen", "Annulering en terugbetalingen", "Vliegtuig- en tijdwijzigingen", "Reisdocumenten en vouchers"]
  }, {
    icon: Clock,
    title: "Dag van de vlucht",
    description: "Support op de dag van je vlucht",
    services: ["Check-in informatie", "Vluchtvertragingen of annuleringen", "Terminal en bagagerichtlijnen", "Last-minute wijzigingen"]
  }];
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 ">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-hero mb-6">
              Klantenservice
            </h1>
            <p className="text-xl text-white/90">
              Ons ervaren team staat klaar om je te helpen met al je vragen over empty leg vluchten en boekingen.
            </p>
          </div>
        </div>
      </section>

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
    </div>;
};
export default CustomerService;