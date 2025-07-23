
import { LucideIcon } from 'lucide-react';

interface StepIndicatorProps {
  icon: LucideIcon;
  stepNumber: number;
  isActive: boolean;
}

const StepIndicator = ({ icon: Icon, stepNumber, isActive }: StepIndicatorProps) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
        isActive 
          ? 'bg-accent/20 scale-110' 
          : 'bg-accent/10'
      }`}>
        <Icon className={`h-8 w-8 transition-colors duration-300 ${
          isActive ? 'text-accent' : 'text-muted-foreground'
        }`} />
      </div>
      <div className={`text-sm font-semibold transition-colors duration-300 ${
        isActive ? 'text-accent' : 'text-muted-foreground'
      }`}>
        Stap {stepNumber}
      </div>
    </div>
  );
};

export default StepIndicator;
