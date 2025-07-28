import { useState, useCallback, useEffect, useRef } from 'react';
import { Search, Calendar, Plane, CheckCircle, type LucideProps } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

// =================================================================
//  1. TIMELINE STEP COMPONENT
// =================================================================

interface TimelineStepProps {
  icon: React.ComponentType<LucideProps>;
  stepNumber: number;
  title: string;
  description: string;
  details: string[];
  isEven: boolean;
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  onVisible: (stepNumber: number) => void;
}

const TimelineStep = ({ icon: Icon, stepNumber, title, description, details, isEven, isActive, isFirst, isLast, onVisible }: TimelineStepProps) => {
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible(stepNumber);
        }
      },
      { 
        threshold: 0.8 // <-- DE FIX: Verhoogde drempel voor nauwkeurigheid
      }
    );

    const currentRef = stepRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onVisible, stepNumber]);

  const contentBlock = (
    <>
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
    </>
  );

  const desktopContentBlock = (
     <>
      <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
       <ul className="space-y-2 mt-4">
        {details.map((detail, index) => (
          <li key={index} className={`flex items-start gap-3 ${!isEven ? 'justify-end' : ''}`}>
            {!isEven && <span className="text-muted-foreground text-right">{detail}</span>}
            <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            {isEven && <span className="text-muted-foreground">{detail}</span>}
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <div ref={stepRef} className="relative w-full">
      {/* Mobile/Tablet Layout (Flexbox) */}
      <div className="lg:hidden flex gap-6">
        <div className="flex flex-col items-center w-12 flex-shrink-0">
          <div className={cn("w-0.5 flex-grow", isFirst ? 'bg-transparent' : isActive ? 'bg-accent' : 'bg-muted')} />
          <div className={cn("z-10 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-colors", isActive ? 'bg-accent text-white' : 'bg-card text-accent')}>
            <Icon className="h-6 w-6" />
          </div>
          <div className={cn("w-0.5 flex-grow", isLast ? 'bg-transparent' : isActive ? 'bg-accent' : 'bg-muted')} />
        </div>
        <div className={cn("flex-grow transition-opacity duration-500 pb-16", isActive ? 'opacity-100' : 'opacity-50')}>
          {contentBlock}
        </div>
      </div>

      {/* Desktop Layout (Corrected Alignment) */}
      <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
        {isEven ? <div className="col-span-5"></div> : 
          <div className={cn("col-span-5 text-right pr-8 transition-opacity duration-500", isActive ? 'opacity-100' : 'opacity-50')}>
            {desktopContentBlock}
          </div>
        }
        <div className="col-span-2 flex justify-center pt-2">
          <div className={cn("z-10 flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-colors", isActive ? 'bg-accent text-white' : 'bg-card text-accent')}>
            <Icon className="h-8 w-8" />
          </div>
        </div>
        {isEven ? 
          <div className={cn("col-span-5 text-left pl-8 transition-opacity duration-500", isActive ? 'opacity-100' : 'opacity-50')}>
            {desktopContentBlock}
          </div> : <div className="col-span-5"></div>
        }
      </div>
    </div>
  );
};

// =================================================================
//  2. TIMELINE CONTAINER COMPONENT
// =================================================================

const TimelineContainer = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const steps = [
    { icon: Search, title: t('howItWorks.steps.search.title'), description: t('howItWorks.steps.search.description'), details: [t('howItWorks.steps.search.details.0'), t('howItWorks.steps.search.details.1'), t('howItWorks.steps.search.details.2')] },
    { icon: Calendar, title: t('howItWorks.steps.book.title'), description: t('howItWorks.steps.book.description'), details: [t('howItWorks.steps.book.details.0'), t('howItWorks.steps.book.details.1'), t('howItWorks.steps.book.details.2')] },
    { icon: Plane, title: t('howItWorks.steps.fly.title'), description: t('howItWorks.steps.fly.description'), details: [t('howItWorks.steps.fly.details.0'), t('howItWorks.steps.fly.details.1'), t('howItWorks.steps.fly.details.2')] },
    { icon: CheckCircle, title: t('howItWorks.steps.arrive.title'), description: t('howItWorks.steps.arrive.description'), details: [t('howItWorks.steps.arrive.details.0'), t('howItWorks.steps.arrive.details.1'), t('howItWorks.steps.arrive.details.2')] }
  ];

  const handleStepVisible = useCallback((stepNumber: number) => {
    setActiveStep(prevStep => Math.max(prevStep, stepNumber - 1));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      
      const triggerPoint = window.innerHeight * 0.5;
      const scrollAmount = triggerPoint - rect.top;
      const totalScrollableHeight = rect.height - window.innerHeight * 0.5;
      
      const progress = Math.min(1, Math.max(0, scrollAmount / totalScrollableHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div ref={timelineRef} className="container mx-auto px-6 relative">
        {/* Vertical Timeline Line for Desktop with Animation */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[3px] -translate-x-1/2 bg-muted rounded-full hidden lg:block">
           <div 
            className="absolute top-0 left-0 w-full bg-accent transition-all duration-150 ease-linear"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        <div className="relative lg:space-y-48">
          {steps.map((step, index) => (
            <TimelineStep
              key={index}
              icon={step.icon}
              stepNumber={index + 1}
              title={step.title}
              description={step.description}
              details={step.details}
              isEven={index % 2 === 1}
              isActive={index <= activeStep}
              isFirst={index === 0}
              isLast={index === steps.length - 1}
              onVisible={handleStepVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineContainer;