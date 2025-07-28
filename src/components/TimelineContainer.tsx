
import { useState, useCallback, useEffect } from 'react';
import { Search, Calendar, Plane, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TimelineStep from './TimelineStep';

const TimelineContainer = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const steps = [
    {
      icon: Search,
      title: t('howItWorks.steps.search.title'),
      description: t('howItWorks.steps.search.description'),
      details: [
        t('howItWorks.steps.search.details.0'),
        t('howItWorks.steps.search.details.1'),
        t('howItWorks.steps.search.details.2')
      ]
    },
    {
      icon: Calendar,
      title: t('howItWorks.steps.book.title'),
      description: t('howItWorks.steps.book.description'),
      details: [
        t('howItWorks.steps.book.details.0'),
        t('howItWorks.steps.book.details.1'),
        t('howItWorks.steps.book.details.2')
      ]
    },
    {
      icon: Plane,
      title: t('howItWorks.steps.fly.title'),
      description: t('howItWorks.steps.fly.description'),
      details: [
        t('howItWorks.steps.fly.details.0'),
        t('howItWorks.steps.fly.details.1'),
        t('howItWorks.steps.fly.details.2')
      ]
    },
    {
      icon: CheckCircle,
      title: t('howItWorks.steps.arrive.title'),
      description: t('howItWorks.steps.arrive.description'),
      details: [
        t('howItWorks.steps.arrive.details.0'),
        t('howItWorks.steps.arrive.details.1'),
        t('howItWorks.steps.arrive.details.2')
      ]
    }
  ];

  const handleStepVisible = useCallback((stepNumber: number) => {
    setActiveStep(stepNumber - 1);
  }, []);

  // Enhanced scroll tracking - ensures timeline reaches 100% at step 4
  useEffect(() => {
    const handleScroll = () => {
      const timelineSection = document.querySelector('[data-timeline-section]');
      if (!timelineSection) return;

      const rect = timelineSection.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on scroll position within the section
      const scrolled = Math.max(0, windowHeight - sectionTop);
      const totalScrollDistance = sectionHeight + windowHeight * 0.5; // Reduced for earlier completion
      let progress = Math.min(1, Math.max(0, scrolled / totalScrollDistance));
      
      // Ensure progress reaches 100% when at step 4 (index 3)
      if (activeStep >= 3) {
        progress = Math.max(progress, 1);
      }
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStep]);

  return (
    <section data-timeline-section className="py-20 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Clean timeline line - centered and responsive to scroll */}
        <div className="absolute left-1/2 transform -translate-x-0.5 hidden lg:block" style={{
          top: '10rem',
          bottom: '10rem',
          width: '3px',
          background: 'hsl(var(--muted))',
          borderRadius: '2px'
        }}>
          {/* Clean progress indicator without glow */}
          <div 
            className="absolute top-0 left-0 w-full bg-accent transition-all duration-300 ease-out rounded-full"
            style={{ 
              height: `${scrollProgress * 100}%`
            }}
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
