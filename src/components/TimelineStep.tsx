
import React from 'react';
import { LucideIcon, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import StepIndicator from './StepIndicator';

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
  icon, 
  stepNumber, 
  title, 
  description, 
  details, 
  isEven = false,
  onVisible 
}: TimelineStepProps) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.4 });

  // Notify parent when this step becomes visible
  React.useEffect(() => {
    if (isVisible) {
      onVisible(stepNumber);
    }
  }, [isVisible, stepNumber, onVisible]);

  return (
    <div 
      ref={elementRef}
      className={`min-h-screen flex items-center py-20 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-8'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16`}>
          <div className="flex-1 lg:pl-16">
            <StepIndicator 
              icon={icon} 
              stepNumber={stepNumber} 
              isActive={isVisible} 
            />
            
            <h2 className={`text-title text-foreground mb-4 transition-all duration-500 ${
              isVisible ? 'translate-x-0' : isEven ? 'translate-x-8' : '-translate-x-8'
            }`}>
              {title}
            </h2>
            
            <p className={`text-lg text-muted-foreground mb-6 transition-all duration-500 delay-100 ${
              isVisible ? 'translate-x-0' : isEven ? 'translate-x-8' : '-translate-x-8'
            }`}>
              {description}
            </p>
            
            <ul className="space-y-3">
              {details.map((detail, index) => (
                <li 
                  key={index} 
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isVisible ? 'translate-x-0 opacity-100' : isEven ? 'translate-x-8 opacity-0' : '-translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Visual element - could be an illustration or animation */}
          <div className={`flex-1 flex justify-center transition-all duration-700 delay-300 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}>
            <div className="w-80 h-64 bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl flex items-center justify-center">
              <icon className="h-24 w-24 text-accent/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineStep;
