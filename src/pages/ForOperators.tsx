import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Plane, TrendingUp, Users, Shield, CheckCircle, Star } from 'lucide-react';

const ForOperators = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Meer omzet genereren",
      description: "Verdien geld met vluchten die anders leeg zouden vliegen. Gemiddeld 30% meer inkomsten uit je vloot."
    },
    {
      icon: Users,
      title: "Toegang tot nieuwe klanten",
      description: "Bereik duizenden potentiële klanten die op zoek zijn naar last-minute privéjet oplossingen."
    },
    {
      icon: Shield,
      title: "Veilige betalingen",
      description: "Gegarandeerde uitbetalingen binnen 48 uur na voltooiing van de vlucht."
    },
    {
      icon: Plane,
      title: "Eenvoudig beheer",
      description: "Intuïtief dashboard om je empty legs te beheren en real-time beschikbaarheid bij te werken."
    }
  ];

  const features = [
    "Real-time inventory management",
    "Automatische prijsoptimalisatie",
    "24/7 customer support",
    "Geïntegreerde betalingsverwerking",
    "Uitgebreide rapportage en analytics",
    "API integratie voor je eigen systemen"
  ];

  const testimonials = [
    {
      name: "Marc Van Der Berg",
      company: "Sky Elite Aviation",
      text: "Sinds we met Jetleg werken, hebben we onze empty leg inkomsten met 45% verhoogd. Het platform is gebruiksvriendelijk en de support is uitstekend.",
      rating: 5
    },
    {
      name: "Sophie Laurent",
      company: "European Jets",
      text: "Jetleg heeft ons geholpen om een volledig nieuwe klantengroep te bereiken. De automatische pricing is een game-changer voor ons bedrijf.",
      rating: 5
    },
    {
      name: "Thomas Mueller",
      company: "Alpine Air Charter",
      text: "De snelle uitbetalingen en transparante rapportage maken het gemakkelijk om onze cashflow te beheren. Zeer tevreden met de samenwerking.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-hero mb-6">
                Voor Operators
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Transformeer je empty legs in winstgevende vluchten. Sluit je aan bij honderden operators die al succesvol zijn met Jetleg.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-jetleg-primary bg-white text-primary hover:bg-white/90">
                  Word Partner
                </button>
                <button className="btn-jetleg-outline border-white text-white hover:bg-white hover:text-primary">
                  Plan Demo
                </button>
              </div>
            </div>
            
            <div className="card-jetleg p-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">€2.4M+</div>
                <p className="text-muted-foreground mb-6">Extra omzet gegenereerd voor onze partners in 2024</p>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-foreground">150+</div>
                    <div className="text-sm text-muted-foreground">Operators</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">2,500+</div>
                    <div className="text-sm text-muted-foreground">Vluchten</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">45%</div>
                    <div className="text-sm text-muted-foreground">Gem. toename</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-title text-foreground mb-4">
              Waarom kiezen voor Jetleg?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ons platform is speciaal ontworpen om operators te helpen het maximale uit hun empty legs te halen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card-jetleg p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-8 w-8 text-accent" />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-title text-foreground mb-6">
                Alles wat je nodig hebt in één platform
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Ons geavanceerde platform biedt alle tools die je nodig hebt om je empty leg business te laten groeien.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card-jetleg p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Real-time Analytics</div>
                    <div className="text-sm text-muted-foreground">Volg je performance en optimaliseer je prijzen</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Customer Management</div>
                    <div className="text-sm text-muted-foreground">Beheer klanten en bouw relaties op</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Secure Payments</div>
                    <div className="text-sm text-muted-foreground">Veilige en snelle betalingsafhandeling</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-title text-foreground mb-4">
              Wat onze partners zeggen
            </h2>
            <p className="text-lg text-muted-foreground">
              Hoor van operators die hun succes hebben vergroot met Jetleg
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-jetleg p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star key={starIndex} className="h-5 w-5 fill-current text-accent" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-title mb-6">
              Klaar om te beginnen?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Sluit je aan bij de snelst groeiende empty leg marketplace en start vandaag nog met het genereren van extra omzet.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-jetleg-primary bg-white text-primary hover:bg-white/90">
                Aanmelden als Partner
              </button>
              <button className="btn-jetleg-outline border-white text-white hover:bg-white hover:text-primary">
                Contact Opnemen
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForOperators;