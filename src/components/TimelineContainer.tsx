import { useState, useCallback, useEffect, useRef } from 'react';
import { Search, Calendar, Plane, CheckCircle, Icon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils'; // Aangenomen dat je de cn utility gebruikt

// =================================================================
//  1. TIMELINE STEP COMPONENT (VEREENVOUDIGD VOOR CONSISTENTE LAYOUT)
// =================================================================

interface TimelineStepProps {
  icon: Icon;
  stepNumber: number;
  title: string;
  description: string;
  details: string[];
  onVisible: (stepNumber: number) => void;
}

const TimelineStep = ({ icon: Icon, stepNumber, title, description, details, onVisible }: TimelineStepProps) => {
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible(stepNumber);
          if (stepRef.current) {
            observer.unobserve(stepRef.current);
          }
        }
      },
      { threshold: 0.6 }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, [onVisible, stepNumber]);

  return (
    <div ref={stepRef} className="relative">
      {/* Icoon, nu consistent gepositioneerd */}
      <div className="absolute top-0 left-6 -translate-x-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg lg:h-16 lg:w-16">
        <Icon className="h-6 w-6 lg:h-8 lg:w-8" />
      </div>

      {/* Tekst Content, nu consistent gepositioneerd */}
      <div className="w-full pl-20">
        <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <ul className="space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


// =================================================================
//  2. TIMELINE CONTAINER COMPONENT (AANGEPAST VOOR CONSISTENTE LAYOUT)
// =================================================================

const TimelineContainer = () => {
  const { t } = useTranslation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef<HTMLElement>(null);

  const steps = [
    { icon: Search, title: t('howItWorks.steps.search.title', 'Zoek je vlucht'), description: t('howItWorks.steps.search.description', 'Vind de perfecte privéjet voor jouw reis.'), details: [t('howItWorks.steps.search.details.0', 'Kies vertrek- en aankomstlocaties.'), t('howItWorks.steps.search.details.1', 'Selecteer je reisdatum.'), t('howItWorks.steps.search.details.2', 'Vergelijk direct prijzen.')] },
    { icon: Calendar, title: t('howItWorks.steps.book.title', 'Boek direct online'), description: t('howItWorks.steps.book.description', 'Bevestig je boeking in een paar simpele stappen.'), details: [t('howItWorks.steps.book.details.0', 'Veilige online betaling.'), t('howItWorks.steps.book.details.1', 'Ontvang direct bevestiging.'), t('howItWorks.steps.book.details.2', 'Beheer je boeking online.')] },
    { icon: Plane, title: t('howItWorks.steps.fly.title', 'Geniet van je vlucht'), description: t('howItWorks.steps.fly.description', 'Ervaar het ultieme comfort en gemak.'), details: [t('howItWorks.steps.fly.details.0', 'Exclusieve toegang tot privé-terminals.'), t('howItWorks.steps.fly.details.1', 'Catering en service van wereldklasse.'), t('howItWorks.steps.fly.details.2', 'Reis in alle privacy en comfort.')] },
    { icon: CheckCircle, title: t('howItWorks.steps.arrive.title', 'Kom verfrist aan'), description: t('howItWorks.steps.arrive.description', 'Land dichter bij je eindbestemming.'), details: [t('howItWorks.steps.arrive.details.0', 'Vermijd de drukte van grote luchthavens.'), t('howItWorks.steps.arrive.details.1', 'Naadloze transfer naar je eindbestemming.'), t('howItWorks.steps.arrive.details.2', 'Begin je reis ontspannen en efficiënt.')] }
  ];

  const handleStepVisible = useCallback(() => {}, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollAmount = windowHeight - rect.top;
      const totalScrollableHeight = rect.height + windowHeight;
      const progress = Math.min(1, Math.max(0, scrollAmount / totalScrollableHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={timelineRef} className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Lijn, nu consistent aan de linkerkant */}
        <div className="absolute top-0 bottom-0 left-6 w-[3px] -translate-x-1/2 bg-muted rounded-full">
          <div 
            className="absolute top-0 left-0 w-full bg-accent transition-all duration-150 ease-linear"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        <div className="relative space-y-24">
          {steps.map((step, index) => (
            <TimelineStep
              key={index}
              icon={step.icon}
              stepNumber={index + 1}
              title={step.title}
              description={step.description}
              details={step.details}
              isEven={false} // Niet meer relevant, maar we laten het staan voor consistentie
              onVisible={handleStepVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineContainer;
