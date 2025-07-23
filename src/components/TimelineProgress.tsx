
import { useEffect, useState } from 'react';

interface TimelineProgressProps {
  activeStep: number;
  totalSteps: number;
}

const TimelineProgress = ({ activeStep, totalSteps }: TimelineProgressProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const newProgress = (activeStep / totalSteps) * 100;
    setProgress(newProgress);
  }, [activeStep, totalSteps]);

  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
      <div className="relative h-64 w-1 bg-muted/30 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full bg-accent rounded-full transition-all duration-700 ease-out"
          style={{ height: `${progress}%` }}
        />
      </div>
      <div className="absolute -left-2 top-0 space-y-16">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
              index < activeStep 
                ? 'bg-accent border-accent' 
                : 'bg-background border-muted'
            }`}
            style={{ transform: `translateY(${index * 64 - 8}px)` }}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineProgress;
