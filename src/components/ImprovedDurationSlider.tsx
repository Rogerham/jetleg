
import { useState, useEffect, useCallback, useRef } from 'react';

interface ImprovedDurationSliderProps {
  minDuration: number;
  maxDuration: number;
  onDurationChange: (min: number, max: number) => void;
}

const ImprovedDurationSlider = ({ 
  minDuration, 
  maxDuration, 
  onDurationChange 
}: ImprovedDurationSliderProps) => {
  const [range, setRange] = useState([minDuration, maxDuration]);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const [dragStartPos, setDragStartPos] = useState(0);
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

  const getValueFromClientX = (clientX: number) => {
    if (!sliderRef.current) return MIN_VALUE;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const value = MIN_VALUE + (percentage / 100) * (MAX_VALUE - MIN_VALUE);
    
    // Round to nearest step
    return Math.round(value / STEP) * STEP;
  };

  const updateRange = useCallback((clientX: number) => {
    const newValue = getValueFromClientX(clientX);
    
    setRange(prevRange => {
      const [currentMin, currentMax] = prevRange;
      let newMin = currentMin;
      let newMax = currentMax;

      if (isDragging === 'min') {
        newMin = Math.min(newValue, currentMax - STEP);
        newMin = Math.max(MIN_VALUE, Math.min(newMin, MAX_VALUE));
      } else if (isDragging === 'max') {
        newMax = Math.max(newValue, currentMin + STEP);
        newMax = Math.max(MIN_VALUE, Math.min(newMax, MAX_VALUE));
      }

      const finalRange = [newMin, newMax];
      
      // Only call the debounced callback if values actually changed
      if (finalRange[0] !== currentMin || finalRange[1] !== currentMax) {
        debouncedOnChange(finalRange[0], finalRange[1]);
      }
      
      return finalRange;
    });
  }, [isDragging, debouncedOnChange]);

  // Mouse event handlers
  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(type);
    setDragStartPos(e.clientX);
    
    // Add event listeners to document for better tracking
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      updateRange(e.clientX);
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      setIsDragging(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Touch event handlers
  const handleTouchStart = (type: 'min' | 'max') => (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(type);
    setDragStartPos(e.touches[0].clientX);

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches[0]) {
        updateRange(e.touches[0].clientX);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      setIsDragging(null);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  // Track click handler
  const handleTrackClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    
    const clickValue = getValueFromClientX(e.clientX);
    const [currentMin, currentMax] = range;
    
    // Determine which handle is closer
    const distanceToMin = Math.abs(clickValue - currentMin);
    const distanceToMax = Math.abs(clickValue - currentMax);
    
    const newRange = [...range];
    if (distanceToMin < distanceToMax) {
      newRange[0] = Math.max(MIN_VALUE, Math.min(clickValue, currentMax - STEP));
    } else {
      newRange[1] = Math.min(MAX_VALUE, Math.max(clickValue, currentMin + STEP));
    }
    
    setRange(newRange);
    debouncedOnChange(newRange[0], newRange[1]);
  };

  // Keyboard handlers
  const handleKeyDown = (type: 'min' | 'max') => (e: React.KeyboardEvent) => {
    let newRange = [...range];
    const index = type === 'min' ? 0 : 1;
    let newValue = range[index];
    
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        newValue = Math.max(MIN_VALUE, newValue - STEP);
        if (type === 'min') {
          newValue = Math.min(newValue, range[1] - STEP);
        }
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        newValue = Math.min(MAX_VALUE, newValue + STEP);
        if (type === 'max') {
          newValue = Math.max(newValue, range[0] + STEP);
        }
        break;
      case 'Home':
        e.preventDefault();
        newValue = type === 'min' ? MIN_VALUE : Math.max(range[0] + STEP, MIN_VALUE);
        break;
      case 'End':
        e.preventDefault();
        newValue = type === 'max' ? MAX_VALUE : Math.min(range[1] - STEP, MAX_VALUE);
        break;
    }
    
    if (newValue !== range[index]) {
      newRange[index] = newValue;
      setRange(newRange);
      debouncedOnChange(newRange[0], newRange[1]);
    }
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
          className="relative h-2 bg-secondary rounded-full cursor-pointer select-none"
          onClick={handleTrackClick}
        >
          {/* Active Track */}
          <div 
            className="absolute h-full bg-primary rounded-full transition-all duration-100"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`
            }}
          />
          
          {/* Min Handle */}
          <div
            className={`absolute top-1/2 w-6 h-6 bg-background border-2 border-primary rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-grab shadow-md hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 z-10 ${
              isDragging === 'min' ? 'cursor-grabbing scale-110 ring-2 ring-primary ring-offset-2' : 'hover:scale-105'
            }`}
            style={{ left: `${minPercentage}%` }}
            onMouseDown={handleMouseDown('min')}
            onTouchStart={handleTouchStart('min')}
            onKeyDown={handleKeyDown('min')}
            role="slider"
            aria-label="Minimum duration"
            aria-valuemin={MIN_VALUE}
            aria-valuemax={MAX_VALUE}
            aria-valuenow={range[0]}
            tabIndex={0}
          >
            <div className="absolute inset-0 rounded-full bg-primary opacity-0 hover:opacity-20 transition-opacity" />
          </div>
          
          {/* Max Handle */}
          <div
            className={`absolute top-1/2 w-6 h-6 bg-background border-2 border-primary rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-grab shadow-md hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 z-10 ${
              isDragging === 'max' ? 'cursor-grabbing scale-110 ring-2 ring-primary ring-offset-2' : 'hover:scale-105'
            }`}
            style={{ left: `${maxPercentage}%` }}
            onMouseDown={handleMouseDown('max')}
            onTouchStart={handleTouchStart('max')}
            onKeyDown={handleKeyDown('max')}
            role="slider"
            aria-label="Maximum duration"
            aria-valuemin={MIN_VALUE}
            aria-valuemax={MAX_VALUE}
            aria-valuenow={range[1]}
            tabIndex={0}
          >
            <div className="absolute inset-0 rounded-full bg-primary opacity-0 hover:opacity-20 transition-opacity" />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between text-sm text-muted-foreground">
        <span className="font-medium">{formatHours(range[0])}</span>
        <span className="text-xs text-muted-foreground/70">Duration range</span>
        <span className="font-medium">{formatHours(range[1])}</span>
      </div>
    </div>
  );
};

export default ImprovedDurationSlider;
