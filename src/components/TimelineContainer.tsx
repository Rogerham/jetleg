
import { useState, useCallback, useEffect } from 'react';
import { Search, Calendar, Plane, CheckCircle } from 'lucide-react';
import TimelineStep from './TimelineStep';

const TimelineContainer = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const steps = [
    {
      icon: Search,
      title: "Zoek je ideale vlucht",
      description: "Gebruik onze geavanceerde zoekmachine om empty leg vluchten te vinden naar jouw gewenste bestemming. Filter op prijs, datum, vliegtuigtype en meer.",
      details: [
        "Doorzoek duizenden beschikbare empty legs",
        "Real-time beschikbaarheid en prijzen", 
        "Flexibele zoekopties voor beste deals"
      ]
    },
    {
      icon: Calendar,
      title: "Boek direct online",
      description: "Reserveer je vlucht met slechts een paar klikken. Ons veilige boekingsproces is snel en transparant, zonder verborgen kosten.",
      details: [
        "Veilige online betaling",
        "Directe bevestiging per email",
        "24/7 klantenservice beschikbaar"
      ]
    },
    {
      icon: Plane,
      title: "Geniet van je vlucht",
      description: "Stap aan boord van je privéjet en ervaar de ultieme luxe en comfort. Onze gecertificeerde operators zorgen voor een onvergetelijke vliegervaring.",
      details: [
        "Luxe privéjet ervaring",
        "Persoonlijke service aan boord",
        "Flexibele vertrek- en aankomsttijden"
      ]
    },
    {
      icon: CheckCircle,
      title: "Aankomst op bestemming",
      description: "Kom uitgerust en op tijd aan op je bestemming. Met privéjet vlieg je direct, zonder omreizen of wachttijden op drukke luchthavens.",
      details: [
        "Directe vluchten naar kleinere luchthavens",
        "Snellere in- en uitcheck procedures",
        "Meer tijd voor wat echt belangrijk is"
      ]
    }
  ];

  const handleStepVisible = useCallback((stepNumber: number) => {
    setActiveStep(stepNumber - 1);
  }, []);

  // Enhanced scroll tracking for smoother timeline progress
  useEffect(() => {
    const handleScroll = () => {
      const timelineSection = document.querySelector('[data-timeline-section]');
      if (!timelineSection) return;

      const rect = timelineSection.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on how much of the section has been scrolled through
      const scrolled = Math.max(0, windowHeight - sectionTop);
      const totalScrollDistance = sectionHeight + windowHeight;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollDistance));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section data-timeline-section className="py-20 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Enhanced timeline line - centered and responsive to scroll */}
        <div className="absolute left-1/2 transform -translate-x-0.5 hidden lg:block" style={{
          top: '10rem',
          bottom: '10rem',
          width: '3px',
          background: 'linear-gradient(to bottom, hsl(var(--muted)), hsl(var(--accent)), hsl(var(--muted)))',
          borderRadius: '2px'
        }}>
          {/* Enhanced active progress indicator with smoother animation */}
          <div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent to-accent/80 transition-all duration-300 ease-out rounded-full shadow-lg"
            style={{ 
              height: `${scrollProgress * 100}%`,
              background: `linear-gradient(to bottom, hsl(var(--accent)), hsl(var(--accent)) ${Math.max(20, scrollProgress * 100)}%, hsl(var(--accent)/0.6))`
            }}
          />
          
          {/* Glow effect for the progress line */}
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 bg-accent/20 transition-all duration-300 ease-out blur-sm"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        <div className="space-y-32 lg:space-y-40">
          {steps.map((step, index) => (
            <TimelineStep
              key={index}
              icon={step.icon}
              stepNumber={index + 1}
              title={step.title}
              description={step.description}
              details={step.details}
              isEven={index % 2 === 1}
              onVisible={handleStepVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineContainer;
