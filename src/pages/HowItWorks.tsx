import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Search, Calendar, Plane, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const HowItWorks = () => {
  const navigate = useNavigate();
  const steps = [{
    icon: Search,
    title: "Zoek je ideale vlucht",
    description: "Gebruik onze geavanceerde zoekmachine om empty leg vluchten te vinden naar jouw gewenste bestemming. Filter op prijs, datum, vliegtuigtype en meer.",
    details: ["Doorzoek duizenden beschikbare empty legs", "Real-time beschikbaarheid en prijzen", "Flexibele zoekopties voor beste deals"]
  }, {
    icon: Calendar,
    title: "Boek direct online",
    description: "Reserveer je vlucht met slechts een paar klikken. Ons veilige boekingsproces is snel en transparant, zonder verborgen kosten.",
    details: ["Veilige online betaling", "Directe bevestiging per email", "24/7 klantenservice beschikbaar"]
  }, {
    icon: Plane,
    title: "Geniet van je vlucht",
    description: "Stap aan boord van je privéjet en ervaar de ultieme luxe en comfort. Onze gecertificeerde operators zorgen voor een onvergetelijke vliegervaring.",
    details: ["Luxe privéjet ervaring", "Persoonlijke service aan boord", "Flexibele vertrek- en aankomsttijden"]
  }, {
    icon: CheckCircle,
    title: "Aankomst op bestemming",
    description: "Kom uitgerust en op tijd aan op je bestemming. Met privéjet vlieg je direct, zonder omreizen of wachttijden op drukke luchthavens.",
    details: ["Directe vluchten naar kleinere luchthavens", "Snellere in- en uitcheck procedures", "Meer tijd voor wat echt belangrijk is"]
  }];
  const handleFAQClick = () => {
    navigate('/faq');
  };
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-hero mb-6">
              Hoe werkt Jetleg?
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Ontdek hoe eenvoudig het is om last-minute privéjet deals te boeken met Jetleg. Van zoeken tot landen, wij maken het proces zo gemakkelijk mogelijk.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-20">
            {steps.map((step, index) => <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16`}>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-accent" />
                    </div>
                    <div className="text-sm font-semibold text-accent">
                      Stap {index + 1}
                    </div>
                  </div>
                  
                  <h2 className="text-title text-foreground mb-4">
                    {step.title}
                  </h2>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {step.details.map((detail, detailIndex) => <li key={detailIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="text-foreground">{detail}</span>
                      </li>)}
                  </ul>
                </div>
                
                {/* Hide visual cards on tablet and mobile */}
                
              </div>)}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-title text-foreground mb-4">
              Veelgestelde vragen
            </h2>
            <p className="text-lg text-muted-foreground">
              Alles wat je moet weten over empty leg vluchten
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[{
            question: "Wat is een empty leg vlucht?",
            answer: "Een empty leg vlucht is een privéjet die leeg terugvliegt naar zijn basis of naar een nieuwe klant. Deze vluchten worden aangeboden tegen sterk gereduceerde prijzen."
          }, {
            question: "Hoe ver van tevoren moet ik boeken?",
            answer: "Empty legs zijn vaak last-minute beschikbaar, van enkele uren tot een paar dagen van tevoren. Hoe flexibeler je bent, hoe meer kans op geweldige deals."
          }, {
            question: "Kan ik mijn boeking wijzigen?",
            answer: "Wijzigingen zijn beperkt mogelijk en afhankelijk van de specifieke vlucht. Contacteer onze klantenservice voor meer informatie over jouw boeking."
          }, {
            question: "Wat is inbegrepen in de prijs?",
            answer: "De prijs omvat de volledige vlucht, brandstof, bemanning en standaard catering. Extra services kunnen tegen meerprijs worden toegevoegd."
          }].map((faq, index) => <div key={index} className="card-jetleg p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </div>)}
          </div>
          
          {/* FAQ Navigation Button */}
          <div className="text-center mt-12">
            <button onClick={handleFAQClick} className="btn-jetleg-primary">
              Bekijk alle veelgestelde vragen
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-title text-foreground mb-4">
              Klaar om te beginnen?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start je zoektocht naar de perfecte empty leg deal en ervaar privéjet reizen zoals nooit tevoren.
            </p>
            <a href="/" className="btn-jetleg-primary">
              Zoek Empty Legs
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default HowItWorks;