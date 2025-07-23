
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TimelineContainer from '@/components/TimelineContainer';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const navigate = useNavigate();

  const handleFAQClick = () => {
    navigate('/faq');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-hero mb-6 animate-fade-in">
              Hoe werkt Jetleg?
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-fade-in">
              Ontdek hoe eenvoudig het is om last-minute privéjet deals te boeken met Jetleg. Van zoeken tot landen, wij maken het proces zo gemakkelijk mogelijk.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <TimelineContainer />

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
            {[
              {
                question: "Wat is een empty leg vlucht?",
                answer: "Een empty leg vlucht is een privéjet die leeg terugvliegt naar zijn basis of naar een nieuwe klant. Deze vluchten worden aangeboden tegen sterk gereduceerde prijzen."
              },
              {
                question: "Hoe ver van tevoren moet ik boeken?",
                answer: "Empty legs zijn vaak last-minute beschikbaar, van enkele uren tot een paar dagen van tevoren. Hoe flexibeler je bent, hoe meer kans op geweldige deals."
              },
              {
                question: "Kan ik mijn boeking wijzigen?",
                answer: "Wijzigingen zijn beperkt mogelijk en afhankelijk van de specifieke vlucht. Contacteer onze klantenservice voor meer informatie over jouw boeking."
              },
              {
                question: "Wat is inbegrepen in de prijs?",
                answer: "De prijs omvat de volledige vlucht, brandstof, bemanning en standaard catering. Extra services kunnen tegen meerprijs worden toegevoegd."
              }
            ].map((faq, index) => (
              <div key={index} className="card-jetleg p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
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
    </div>
  );
};

export default HowItWorks;
