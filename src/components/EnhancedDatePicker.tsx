import { useState, useEffect, useMemo } from 'react';
import { Calendar as CalendarIcon, CalendarDays } from 'lucide-react';
import { format, isValid, parseISO } from 'date-fns';
import { nl } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// --- Best Practice 1: Constanten buiten de component definiëren ---
const FLEXIBLE_OPTIONS = [
  { label: 'Dit weekend', value: 'weekend' },
  { label: 'Volgende week', value: 'next-week' },
  { label: 'Volgende maand', value: 'next-month' },
  { label: 'Volledig flexibel', value: 'fully-flexible' }
];

const isDateInPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
};

interface EnhancedDatePickerProps {
  value: string | null;
  onChange: (value: string | null) => void;
  className?: string;
  hasError?: boolean;
  errorMessage?: string;
  text?: {
    selectDate: string;
    invalidDate: string;
    tabCalendar: string;
    tabFlexible: string;
    whenToLeave: string;
    flexibleSubtitle: string;
  }
}

const EnhancedDatePicker = ({
  value,
  onChange,
  className,
  hasError,
  errorMessage = "Selecteer een geldige datum",
  text = {
    selectDate: 'Selecteer datum',
    invalidDate: 'Ongeldige datum',
    tabCalendar: 'Kalender',
    tabFlexible: 'Ik ben flexibel',
    whenToLeave: 'Wanneer vertrek je?',
    flexibleSubtitle: 'Kies een flexibele periode voor betere deals'
  }
}: EnhancedDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const isFlexibleValue = useMemo(() => FLEXIBLE_OPTIONS.some(opt => opt.value === value), [value]);
  const initialTab = isFlexibleValue ? 'flexible' : 'calendar';
  const [activeTab, setActiveTab] = useState(initialTab);

  const selectedDate = useMemo(() => {
    if (value && !isFlexibleValue) {
      const date = parseISO(value);
      if (isValid(date)) {
        return date;
      }
    }
    return undefined;
  }, [value, isFlexibleValue]);

  useEffect(() => {
    setActiveTab(isFlexibleValue ? 'flexible' : 'calendar');
  }, [isFlexibleValue]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onChange(format(date, 'yyyy-MM-dd'));
      setIsOpen(false);
    }
  };

  const handleFlexibleSelect = (option: typeof FLEXIBLE_OPTIONS[0]) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const displayValue = useMemo(() => {
    if (!value) return text.selectDate;
    
    const flexibleOption = FLEXIBLE_OPTIONS.find(opt => opt.value === value);
    if (flexibleOption) return flexibleOption.label;
    
    const date = parseISO(value);
    if (isValid(date)) {
      return format(date, 'dd MMMM yyyy', { locale: nl });
    }
    
    return text.invalidDate;
  }, [value, text]);

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "input-jetleg justify-start text-left font-normal h-12 lg:h-12 w-full bg-white/90 hover:bg-white border-input",
              !value && "text-muted-foreground",
              hasError && "border-destructive ring-1 ring-destructive",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate">{displayValue}</span>
          </Button>
        </PopoverTrigger>
        {/* --- UPDATE: Popover is smaller gemaakt voor een betere pasvorm --- */}
        <PopoverContent
          className="w-[300px] p-0 bg-card border border-border shadow-lg"
          align="center"
          side="bottom"
          sideOffset={8}
          avoidCollisions={false}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50 rounded-none rounded-t-lg">
              <TabsTrigger
                value="calendar"
                className="flex items-center justify-center gap-1.5 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm px-2 py-2"
              >
                <CalendarDays className="h-4 w-4" />
                <span className="hidden xs:inline">{text.tabCalendar}</span>
                <span className="xs:hidden">Datum</span>
              </TabsTrigger>
              <TabsTrigger
                value="flexible"
                className="flex items-center justify-center gap-1.5 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm px-2 py-2"
              >
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden xs:inline">{text.tabFlexible}</span>
                <span className="xs:hidden">Flexibel</span>
              </TabsTrigger>
            </TabsList>
            
            {/* --- UPDATE: Kalender gecentreerd en natuurlijke breedte gegeven --- */}
            <TabsContent value="calendar" className="mt-0 flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus
                disabled={isDateInPast}
                fixedWeeks
                locale={nl}
              />
            </TabsContent>
            
            <TabsContent value="flexible" className="mt-0 p-3">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-1">{text.whenToLeave}</h3>
                  <p className="text-xs text-muted-foreground">
                    {text.flexibleSubtitle}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {FLEXIBLE_OPTIONS.map((option) => (
                    <Button
                      key={option.value}
                      variant={value === option.value ? "default" : "outline"}
                      className="justify-center h-9 text-sm font-normal px-3"
                      onClick={() => handleFlexibleSelect(option)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
      
      {hasError && (
        <div 
          className="absolute -bottom-5 left-0 text-xs text-destructive"
          role="alert"
          aria-live="polite"
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default EnhancedDatePicker;
