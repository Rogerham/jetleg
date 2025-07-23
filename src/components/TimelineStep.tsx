
import React from 'react';
import { LucideIcon, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface TimelineStepProps {
  icon: LucideIcon;
  stepNumber: number;
  title: string;
  description: string;
  details: string[];
  isEven?: boolean;
  onVisible: (stepNumber: number) => void;
}

const TimelineStep = ({ 
  icon: Icon, 
  stepNumber, 
  title, 
  description, 
  details, 
  isEven = false,
  onVisible 
}: TimelineStepProps) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  React.useEffect(() => {
    if (isVisible) {
      onVisible(stepNumber);
    }
  }, [isVisible, stepNumber, onVisible]);

  return (
    <div 
      ref={elementRef}
      className={`relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-8'
      }`}
    >
      {/* Timeline dot - centered, desktop only with numbers */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden lg:block">
        <div className={`w-12 h-12 rounded-full border-4 border-background transition-all duration-500 flex items-center justify-center ${
          isVisible 
            ? 'bg-accent scale-110 shadow-lg' 
            : 'bg-muted/50 scale-100'
        }`}>
          <span className={`text-lg font-bold transition-colors duration-300 ${
            isVisible ? 'text-white' : 'text-muted-foreground'
          }`}>
            {stepNumber}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Content - alternates sides on desktop */}
        <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} ${isEven ? 'lg:pl-8' : 'lg:pr-8'}`}>
          {/* Mobile step indicator */}
          <div className="flex items-center gap-4 mb-6 lg:hidden">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isVisible 
                ? 'bg-accent scale-110' 
                : 'bg-accent/20'
            }`}>
              <Icon className={`h-6 w-6 transition-colors duration-300 ${
                isVisible ? 'text-white' : 'text-muted-foreground'
              }`} />
            </div>
            <div className={`text-sm font-semibold transition-colors duration-300 ${
              isVisible ? 'text-accent' : 'text-muted-foreground'
            }`}>
              Stap {stepNumber}
            </div>
          </div>

          <div className={`transition-all duration-500 ${
            isVisible ? 'translate-x-0' : isEven ? 'translate-x-8' : '-translate-x-8'
          }`}>
            <h2 className="text-title text-foreground mb-4">
              {title}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              {description}
            </p>
            
            <ul className="space-y-3">
              {details.map((detail, index) => (
                <li 
                  key={index} 
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isVisible ? 'translate-x-0 opacity-100' : isEven ? 'translate-x-4 opacity-0' : '-translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Visual element - desktop only with improved contrast */}
        <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'} ${isEven ? 'lg:pr-8' : 'lg:pl-8'} hidden lg:block`}>
          <div className={`transition-all duration-700 delay-300 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}>
            <div className="w-full max-w-md mx-auto h-64 sm:h-80 bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/20 rounded-3xl flex items-center justify-center shadow-xl backdrop-blur-sm">
              <Icon className="h-20 w-20 sm:h-24 sm:w-24 text-accent/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineStep;
