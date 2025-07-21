import { Plane, DollarSign, Clock, Shield } from 'lucide-react';
import jetInteriorImage from '@/assets/jet-interior.jpg';
const HowItWorks = () => {
  const benefits = [{
    icon: DollarSign,
    title: 'Tot 75% Besparing',
    description: 'Bespaar tot 75% ten opzichte van reguliere privévluchten door gebruik te maken van empty leg positioneringsvluchten.'
  }, {
    icon: Clock,
    title: 'Last-minute Beschikbaarheid',
    description: 'Vind en boek exclusieve vluchten die binnenkort beschikbaar komen, perfect voor flexibele reizigers.'
  }, {
    icon: Plane,
    title: 'Premium Vliegtuigen',
    description: 'Vlieg in luxe jets van gecertificeerde operators met de hoogste veiligheids- en kwaliteitsnormen.'
  }, {
    icon: Shield,
    title: 'Betrouwbaar & Veilig',
    description: 'Alle operators zijn volledig gecertificeerd en voldoen aan de strengste Europese luchtvaartnormen.'
  }];
  return <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-title text-foreground mb-6">
            Wat is een "Empty Leg"?
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="animate-fade-in">
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Een <strong className="text-foreground">empty leg vlucht</strong>, ook wel "positioning flight" genoemd, 
                is een privévliegtuig dat leeg vliegt na het afzetten van passagiers, of op weg is om passagiers op te halen.
              </p>
              <p>
                Omdat het vliegtuig deze vlucht sowieso moet maken, bieden chartermaatschappijen deze "lege" stoelen aan 
                met een aanzienlijke korting - <strong className="text-accent">vaak tot wel 75% van de normale prijs</strong>.
              </p>
              <p>
                Jetleg centraliseert het aanbod van honderden betrouwbare operatoren, zodat jij gemakkelijk de perfecte 
                deal kunt vinden en boeken. Het is de slimste manier om de luxe van privévliegen te ervaren.
              </p>
            </div>
          </div>
          
          <div className="animate-fade-in">
            <img src={jetInteriorImage} alt="Luxe interieur van een privéjet" className="rounded-2xl shadow-2xl animate-scale-hover" />
          </div>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => <div key={index} className="text-center p-6 bg-muted/20 rounded-2xl card-jetleg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <benefit.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">
                {benefit.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default HowItWorks;