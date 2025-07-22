
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
    setRange(newRange);
    onDurationChange(newRange[0], newRange[1]);
  };

  const formatHours = (hours: number) => {
    return hours === Math.floor(hours) ? `${hours}h` : `${hours}h`;
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
            max="20"
            step="0.5"
            value={range[0]}
            onChange={e => {
              const newMin = Math.max(0.5, Math.min(parseFloat(e.target.value) || 0.5, range[1]));
              const newRange = [newMin, range[1]];
              setRange(newRange);
              onDurationChange(newRange[0], newRange[1]);
            }}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-accent/20"
            placeholder="0.5"
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Maximum</label>
          <input
            type="number"
            min="0.5"
            max="20"
            step="0.5"
            value={range[1]}
            onChange={e => {
              const newMax = Math.min(20, Math.max(parseFloat(e.target.value) || 20, range[0]));
              const newRange = [range[0], newMax];
              setRange(newRange);
              onDurationChange(newRange[0], newRange[1]);
            }}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-accent/20"
            placeholder="20"
          />
        </div>
      </div>
    </div>
  );
};

export default DurationRangeSlider;
