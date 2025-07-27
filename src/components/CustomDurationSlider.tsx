
import { useState, useEffect, useCallback, useRef } from 'react';

interface CustomDurationSliderProps {
  minDuration: number;
  maxDuration: number;
  onDurationChange: (min: number, max: number) => void;
}

const CustomDurationSlider = ({ minDuration, maxDuration, onDurationChange }: CustomDurationSliderProps) => {
  const [range, setRange] = useState([minDuration, maxDuration]);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const MIN_VALUE = 0.5;
  const MAX_VALUE = 20;
  const STEP = 0.5;

  useEffect(() => {
    setRange([minDuration, maxDuration]);
  }, [minDuration, maxDuration]);

  // Debounced callback to prevent excessive API calls
  const debouncedOnChange = useCallback((min: number, max: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      onDurationChange(min, max);
    }, 150);
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

  const getPercentage = (value: number) => {
    return ((value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100;
  };

  const getValueFromPosition = (clientX: number) => {
    if (!sliderRef.current) return MIN_VALUE;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const value = MIN_VALUE + (percentage / 100) * (MAX_VALUE - MIN_VALUE);
    
    // Round to nearest step
    return Math.round(value / STEP) * STEP;
  };

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (type: 'min' | 'max') => (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(type);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    updateValue(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (!isDragging) return;
    updateValue(e.touches[0].clientX);
  };

  const updateValue = (clientX: number) => {
    const newValue = getValueFromPosition(clientX);
    
    setRange(prevRange => {
      const [currentMin, currentMax] = prevRange;
      let newMin = currentMin;
      let newMax = currentMax;

      if (isDragging === 'min') {
        newMin = Math.min(newValue, currentMax - STEP);
      } else if (isDragging === 'max') {
        newMax = Math.max(newValue, currentMin + STEP);
      }

      // Clamp values
      newMin = Math.max(MIN_VALUE, Math.min(newMin, MAX_VALUE));
      newMax = Math.max(MIN_VALUE, Math.min(newMax, MAX_VALUE));

      const finalRange = [newMin, newMax];
      
      // Only call the debounced callback if values actually changed
      if (finalRange[0] !== currentMin || finalRange[1] !== currentMax) {
        debouncedOnChange(finalRange[0], finalRange[1]);
      }
      
      return finalRange;
    });
  };

  const handleMouseUp = () => {
    setIsDragging(null);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchEnd = () => {
    setIsDragging(null);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    
    const clickValue = getValueFromPosition(e.clientX);
    const [currentMin, currentMax] = range;
    
    // Determine which handle is closer
    const distanceToMin = Math.abs(clickValue - currentMin);
    const distanceToMax = Math.abs(clickValue - currentMax);
    
    const newRange = [...range];
    if (distanceToMin < distanceToMax) {
      newRange[0] = Math.min(clickValue, currentMax - STEP);
    } else {
      newRange[1] = Math.max(clickValue, currentMin + STEP);
    }
    
    setRange(newRange);
    debouncedOnChange(newRange[0], newRange[1]);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const minPercentage = getPercentage(range[0]);
  const maxPercentage = getPercentage(range[1]);

  return (
    <div className="space-y-4">
      <div className="px-2">
        <div 
          ref={sliderRef}
          className="relative h-2 bg-secondary rounded-full cursor-pointer select-none touch-none"
          onClick={handleTrackClick}
        >
          {/* Track */}
          <div 
            className="absolute h-full bg-primary rounded-full transition-all duration-100"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`
            }}
          />
          
          {/* Min Handle */}
          <div
            className="absolute top-1/2 w-5 h-5 bg-background border-2 border-primary rounded-full transform -translate-y-1/2 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform duration-200 touch-none"
            style={{ left: `${minPercentage}%`, marginLeft: '-10px' }}
            onMouseDown={handleMouseDown('min')}
            onTouchStart={handleTouchStart('min')}
            role="slider"
            aria-label="Minimum duration"
            aria-valuemin={MIN_VALUE}
            aria-valuemax={MAX_VALUE}
            aria-valuenow={range[0]}
            tabIndex={0}
            onKeyDown={(e) => {
              let newMin = range[0];
              if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                newMin = Math.max(MIN_VALUE, range[0] - STEP);
              } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                newMin = Math.min(range[1] - STEP, range[0] + STEP);
              }
              if (newMin !== range[0]) {
                const newRange = [newMin, range[1]];
                setRange(newRange);
                debouncedOnChange(newRange[0], newRange[1]);
              }
            }}
          />
          
          {/* Max Handle */}
          <div
            className="absolute top-1/2 w-5 h-5 bg-background border-2 border-primary rounded-full transform -translate-y-1/2 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform duration-200 touch-none"
            style={{ left: `${maxPercentage}%`, marginLeft: '-10px' }}
            onMouseDown={handleMouseDown('max')}
            onTouchStart={handleTouchStart('max')}
            role="slider"
            aria-label="Maximum duration"
            aria-valuemin={MIN_VALUE}
            aria-valuemax={MAX_VALUE}
            aria-valuenow={range[1]}
            tabIndex={0}
            onKeyDown={(e) => {
              let newMax = range[1];
              if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                newMax = Math.max(range[0] + STEP, range[1] - STEP);
              } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                newMax = Math.min(MAX_VALUE, range[1] + STEP);
              }
              if (newMax !== range[1]) {
                const newRange = [range[0], newMax];
                setRange(newRange);
                debouncedOnChange(newRange[0], newRange[1]);
              }
            }}
          />
        </div>
      </div>
      
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{formatHours(range[0])}</span>
        <span>{formatHours(range[1])}</span>
      </div>
    </div>
  );
};

export default CustomDurationSlider;
