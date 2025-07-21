import { Plane, Users, Award, Globe, Shield, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  const stats = [
    { number: '500+', label: 'Tevreden klanten', icon: Users },
    { number: '50+', label: 'Bestemmingen', icon: Globe },
    { number: '98%', label: 'Tevredenheidsscore', icon: Award },
    { number: '24/7', label: 'Klantenservice', icon: Clock }
  ];

  const team = [
    {
      name: 'Thomas Janssen',
      role: 'CEO & Oprichter',
      description: 'Met 15 jaar ervaring in de luchtvaart, leidde Thomas de revolutie in private jet reizen.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Sarah De Vries',
      role: 'Head of Operations',
      description: 'Sarah zorgt ervoor dat elke vlucht perfect verloopt, van boeking tot landing.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Marc Dubois',
      role: 'Chief Technology Officer',
      description: 'Marc ontwikkelt de technologie die onze platform zo gebruiksvriendelijk maakt.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Veiligheid eerst',
      description: 'We werken alleen samen met gecertificeerde operators die voldoen aan de hoogste veiligheidsnormen.'
    },
    {
      icon: Award,
      title: 'Excellentie',
      description: 'Elke vlucht wordt verzorgd met de grootste aandacht voor detail en service.'
    },
    {
      icon: Users,
      title: 'Klantgericht',
      description: 'Onze klanten staan centraal in alles wat we doen, van boeking tot nazorg.'
    },
    {
      icon: Globe,
      title: 'Toegankelijkheid',
      description: 'We maken luxe reizen toegankelijk door ongebruikte capaciteit optimaal te benutten.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-hero mb-6">Over Jetleg</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            We revolutioneren private jet reizen door empty leg vluchten toegankelijk en betaalbaar te maken voor iedereen.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-title mb-6 text-foreground">Onze missie</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Jetleg werd opgericht met een simpele maar krachtige missie: luxe reizen democratiseren. 
                We geloven dat iedereen moet kunnen genieten van de voordelen van private jet reizen, 
                zonder de traditionele hoge kosten.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Door gebruik te maken van empty leg vluchten - vluchten die anders leeg zouden vliegen - 
                bieden we onze klanten de mogelijkheid om te reizen in stijl tegen een fractie van de normale prijs.
              </p>
              <p className="text-lg text-muted-foreground">
                Onze technologie verbindt reizigers direct met beschikbare vluchten, waardoor we zowel 
                economische als ecologische voordelen creëren.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=600&h=400&fit=crop" 
                alt="Luxe private jet interieur"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-white p-6 rounded-2xl">
                <Plane className="h-8 w-8 mb-2" />
                <div className="font-bold text-xl">2019</div>
                <div className="text-sm">Opgericht</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-title text-center mb-12 text-foreground">Jetleg in cijfers</h2>
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
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-title text-center mb-12 text-foreground">Onze waarden</h2>
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

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-title text-center mb-12 text-foreground">Ons team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card-jetleg p-6 text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
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
          <h2 className="text-3xl font-bold mb-6">Klaar om je volgende avontuur te beginnen?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ontdek onze beschikbare vluchten en ervaar zelf waarom duizenden reizigers voor Jetleg kiezen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-accent font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition-all">
              Bekijk vluchten
            </button>
            <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white hover:text-accent transition-all">
              Contact opnemen
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;