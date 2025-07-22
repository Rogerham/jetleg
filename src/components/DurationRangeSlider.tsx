
import { useState, useEffect } from 'react';
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

  const handleRangeChange = (newRange: number[]) => {
    // Ensure minimum gap of 0.5 hours between handles
    const minGap = 0.5;
    let [newMin, newMax] = newRange;
    
    if (newMax - newMin < minGap) {
      if (newMin !== range[0]) {
        // User moved min handle, adjust max
        newMax = Math.min(20, newMin + minGap);
      } else {
        // User moved max handle, adjust min
        newMin = Math.max(0.5, newMax - minGap);
      }
    }
    
    const adjustedRange = [newMin, newMax];
    setRange(adjustedRange);
    onDurationChange(adjustedRange[0], adjustedRange[1]);
  };

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
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Minimum</label>
          <input
            type="number"
            min="0.5"
            max="19.5"
            step="0.5"
            value={range[0]}
            onChange={e => {
              const newMin = Math.max(0.5, Math.min(parseFloat(e.target.value) || 0.5, range[1] - 0.5));
              const newRange = [newMin, range[1]];
              setRange(newRange);
              onDurationChange(newRange[0], newRange[1]);
            }}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-accent/20 text-sm"
            placeholder="0.5"
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Maximum</label>
          <input
            type="number"
            min="1"
            max="20"
            step="0.5"
            value={range[1]}
            onChange={e => {
              const newMax = Math.min(20, Math.max(parseFloat(e.target.value) || 20, range[0] + 0.5));
              const newRange = [range[0], newMax];
              setRange(newRange);
              onDurationChange(newRange[0], newRange[1]);
            }}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-accent/20 text-sm"
            placeholder="20"
          />
        </div>
      </div>
    </div>
  );
};

export default DurationRangeSlider;
