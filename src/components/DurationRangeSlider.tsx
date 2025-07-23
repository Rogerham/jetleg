
import { useState, useEffect, useCallback } from 'react';
import { Slider } from '@/components/ui/slider';

interface DurationRangeSliderProps {
  minDuration: number;
  maxDuration: number;
  onDurationChange: (min: number, max: number) => void;
}

const DurationRangeSlider = ({ minDuration, maxDuration, onDurationChange }: DurationRangeSliderProps) => {
  const [range, setRange] = useState([minDuration, maxDuration]);

  useEffect(() => {
    setRange([minDuration, maxDuration]);
  }, [minDuration, maxDuration]);

  const handleRangeChange = useCallback((newRange: number[]) => {
    // Ensure we have exactly 2 values
    if (newRange.length !== 2) return;
    
    // Simple validation - ensure proper order and bounds
    let [newMin, newMax] = newRange;
    
    // Ensure proper order
    if (newMin > newMax) {
      [newMin, newMax] = [newMax, newMin];
    }
    
    // Ensure bounds
    newMin = Math.max(0.5, Math.min(newMin, 19.5));
    newMax = Math.min(20, Math.max(newMax, 1));
    
    const adjustedRange = [newMin, newMax];
    setRange(adjustedRange);
    onDurationChange(adjustedRange[0], adjustedRange[1]);
  }, [onDurationChange]);

  const formatHours = (hours: number) => {
    if (hours === Math.floor(hours)) {
      return `${hours}h`;
    } else {
      const wholeHours = Math.floor(hours);
      const minutes = Math.round((hours - wholeHours) * 60);
      return wholeHours > 0 ? `${wholeHours}h ${minutes}m` : `${minutes}m`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="px-2">
        <Slider
          value={range}
          onValueChange={handleRangeChange}
          min={0.5}
          max={20}
          step={0.5}
          className="w-full"
          aria-label="Flight duration range"
        />
      </div>
      
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{formatHours(range[0])}</span>
        <span>{formatHours(range[1])}</span>
      </div>
    </div>
  );
};

export default DurationRangeSlider;
