import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

interface PassengerCounterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const PassengerCounter = ({ value, onChange, className = '' }: PassengerCounterProps) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Validate and update parent
    const num = parseInt(newValue);
    if (num >= 1 && num <= 20) {
      onChange(newValue);
    }
  };

  const increment = () => {
    const num = parseInt(inputValue);
    if (num < 20) {
      const newValue = (num + 1).toString();
      setInputValue(newValue);
      onChange(newValue);
    }
  };

  const decrement = () => {
    const num = parseInt(inputValue);
    if (num > 1) {
      const newValue = (num - 1).toString();
      setInputValue(newValue);
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    const num = parseInt(inputValue);
    if (isNaN(num) || num < 1 || num > 20) {
      setInputValue(value);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button
        type="button"
        onClick={decrement}
        className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-l-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={parseInt(inputValue) <= 1}
      >
        <Minus className="h-4 w-4 text-white" />
      </button>
      
      <input
        type="number"
        min="1"
        max="20"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="w-16 h-8 text-center bg-white/90 text-foreground border-0 focus:ring-0 focus:outline-none"
      />
      
      <button
        type="button"
        onClick={increment}
        className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-r-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={parseInt(inputValue) >= 20}
      >
        <Plus className="h-4 w-4 text-white" />
      </button>
    </div>
  );
};

export default PassengerCounter;