
import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { format, addWeeks, addMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { nl } from 'date-fns/locale';

interface FlexibleDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

type DateOption = 'specific' | 'week' | 'month';

const FlexibleDatePicker = ({ value, onChange, className = '' }: FlexibleDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateOption, setDateOption] = useState<DateOption>('specific');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDisplayText = () => {
    if (!value) return 'Selecteer datum';
    
    const date = new Date(value);
    
    switch (dateOption) {
      case 'specific':
        return format(date, 'dd MMM yyyy', { locale: nl });
      case 'week':
        const weekStart = startOfWeek(date, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
        return `Week ${format(weekStart, 'dd MMM')} - ${format(weekEnd, 'dd MMM')}`;
      case 'month':
        return format(date, 'MMMM yyyy', { locale: nl });
      default:
        return 'Selecteer datum';
    }
  };

  const handleDateOptionChange = (option: DateOption) => {
    setDateOption(option);
    const today = new Date();
    
    switch (option) {
      case 'specific':
        onChange(today.toISOString().split('T')[0]);
        break;
      case 'week':
        onChange(startOfWeek(today, { weekStartsOn: 1 }).toISOString().split('T')[0]);
        break;
      case 'month':
        onChange(startOfMonth(today).toISOString().split('T')[0]);
        break;
    }
    setSelectedDate(today);
  };

  const handleDateChange = (increment: number) => {
    let newDate: Date;
    
    switch (dateOption) {
      case 'specific':
        newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + increment);
        break;
      case 'week':
        newDate = addWeeks(selectedDate, increment);
        break;
      case 'month':
        newDate = addMonths(selectedDate, increment);
        break;
      default:
        return;
    }
    
    setSelectedDate(newDate);
    onChange(newDate.toISOString().split('T')[0]);
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="input-jetleg h-12 flex items-center justify-between w-full"
      >
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-white/70" />
          <span className="text-white">{getDisplayText()}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-white/70 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-xl mt-1 shadow-lg z-50 overflow-hidden">
          {/* Date Type Options */}
          <div className="border-b border-border">
            <div className="grid grid-cols-3">
              {[
                { key: 'specific' as DateOption, label: 'Dag' },
                { key: 'week' as DateOption, label: 'Week' },
                { key: 'month' as DateOption, label: 'Maand' }
              ].map(option => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => handleDateOptionChange(option.key)}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    dateOption === option.key
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Date Selection */}
          {dateOption === 'specific' ? (
            <div className="p-4">
              <input
                type="date"
                value={value}
                onChange={e => onChange(e.target.value)}
                min={minDate}
                className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDateChange(-1)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  ←
                </button>
                <div className="text-center">
                  <div className="font-medium text-foreground">
                    {getDisplayText()}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDateChange(1)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FlexibleDatePicker;
