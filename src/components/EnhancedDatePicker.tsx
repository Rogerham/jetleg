
import { useState } from 'react';
import { Calendar, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface EnhancedDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const EnhancedDatePicker = ({ value, onChange, className }: EnhancedDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState('calendar');

  const flexibleOptions = [
    { label: 'Vandaag', value: 'today' },
    { label: 'Morgen', value: 'tomorrow' },
    { label: 'Dit weekend', value: 'weekend' },
    { label: 'Volgende week', value: 'next-week' },
    { label: 'Volgende maand', value: 'next-month' },
    { label: 'Flexibel', value: 'flexible' }
  ];

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const formattedDate = format(date, 'yyyy-MM-dd');
      onChange(formattedDate);
      setIsOpen(false);
    }
  };

  const handleFlexibleSelect = (option: typeof flexibleOptions[0]) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (value) {
      const flexibleOption = flexibleOptions.find(opt => opt.value === value);
      if (flexibleOption) {
        return flexibleOption.label;
      }
      try {
        const date = new Date(value);
        return format(date, 'dd MMM yyyy');
      } catch {
        return value;
      }
    }
    return '';
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "input-jetleg justify-start text-left font-normal h-12 lg:h-12",
            !value && "text-muted-foreground",
            className
          )}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {value ? getDisplayValue() : <span className="text-white/70">Selecteer datum</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 bg-card border border-border" align="start">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Kalender
            </TabsTrigger>
            <TabsTrigger value="flexible" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Flexibel
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="mt-0">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              initialFocus
              className="p-3 pointer-events-auto"
              disabled={(date) => date < new Date()}
            />
          </TabsContent>
          
          <TabsContent value="flexible" className="mt-0 p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-4">
                Kies een flexibele periode voor betere deals
              </p>
              <div className="grid grid-cols-2 gap-2">
                {flexibleOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={value === option.value ? "default" : "outline"}
                    className="justify-start h-10 text-sm"
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
  );
};

export default EnhancedDatePicker;
