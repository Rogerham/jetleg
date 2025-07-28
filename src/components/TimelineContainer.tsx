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
  onVisible: (stepNumber: number) => void;
}

const TimelineStep = ({ icon: Icon, stepNumber, title, description, details, isEven, isActive, onVisible }: TimelineStepProps) => {
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible(stepNumber);
        }
      },
      { threshold: 0.8 }
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

  // General content block for all views
  const contentBlock = (
    <div className={cn("transition-opacity duration-500", isActive ? 'opacity-100' : 'opacity-50')}>
      <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <ul className="space-y-2">
        {details.map((detail, index) => (
          <li key={index} className={`flex items-start gap-3 ${!isEven ? 'lg:justify-end' : ''}`}>
            {!isEven && <span className="text-muted-foreground text-right hidden lg:inline">{detail}</span>}
            <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <span className="text-muted-foreground">{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div ref={stepRef} className="relative w-full lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
      {/* Mobile & Tablet Layout Structure */}
      <div className="lg:hidden relative pl-20 pb-16">
        <div className="absolute left-8 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className={cn("z-10 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-colors", isActive ? 'bg-accent text-white' : 'bg-card text-accent')}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        {contentBlock}
      </div>

      {/* Desktop Layout Structure */}
      {isEven ? (
        <>
          <div className="hidden lg:block lg:col-span-5"></div>
          <div className="hidden lg:flex lg:col-span-2 lg:justify-center">
             <div className={cn("z-10 flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-colors", isActive ? 'bg-accent text-white' : 'bg-card text-accent')}>
              <Icon className="h-8 w-8" />
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-5 text-left pl-8">{contentBlock}</div>
        </>
      ) : (
        <>
          <div className="hidden lg:block lg:col-span-5 text-right pr-8">{contentBlock}</div>
           <div className="hidden lg:flex lg:col-span-2 lg:justify-center">
             <div className={cn("z-10 flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-colors", isActive ? 'bg-accent text-white' : 'bg-card text-accent')}>
              <Icon className="h-8 w-8" />
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-5"></div>
        </>
      )}
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
      <div className="container mx-auto px-6 relative">
        <div ref={timelineRef} className="relative">
          {/* Unified Vertical Timeline Line for ALL screen sizes */}
          <div className="absolute top-0 bottom-0 lg:left-1/2 left-8 w-[3px] -translate-x-1/2 bg-muted rounded-full">
            <div 
              className="absolute top-0 left-0 w-full bg-accent transition-all duration-150 ease-linear"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

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
              onVisible={handleStepVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineContainer;