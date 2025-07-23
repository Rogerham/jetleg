
import { useState, useCallback } from 'react';
import { Search, Calendar, Plane, CheckCircle } from 'lucide-react';
import TimelineStep from './TimelineStep';

const TimelineContainer = () => {
  const [activeStep, setActiveStep] = useState(0);

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

  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Timeline line - centered and only spans the steps */}
        <div className="absolute left-1/2 transform -translate-x-0.5 hidden lg:block" style={{
          top: '10rem',
          bottom: '10rem',
          width: '2px',
          background: 'linear-gradient(to bottom, hsl(var(--muted)), hsl(var(--accent)), hsl(var(--muted)))'
        }}>
          {/* Active progress indicator */}
          <div 
            className="absolute top-0 left-0 w-full bg-accent transition-all duration-700 ease-out"
            style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
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
