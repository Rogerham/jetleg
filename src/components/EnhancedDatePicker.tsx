
import { useState } from 'react';
import { Calendar, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { format, addMonths, startOfMonth } from 'date-fns';
import { nl } from 'date-fns/locale';

interface EnhancedDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const EnhancedDatePicker = ({ value, onChange, className }: EnhancedDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const flexibleOptions = [
    { label: 'Dit weekend', value: 'weekend' },
    { label: 'Volgende week', value: 'next-week' },
    { label: 'Specifieke maand', value: 'specific-month' },
    { label: 'Volledig flexibel', value: 'flexible' }
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

  const handleMonthSelect = (monthOffset: number) => {
    const selectedMonth = addMonths(new Date(), monthOffset);
    const formattedDate = format(startOfMonth(selectedMonth), 'yyyy-MM-dd');
    onChange(formattedDate);
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
        return format(date, 'dd MMM yyyy', { locale: nl });
      } catch {
        return value;
      }
    }
    return '';
  };

  const generateMonthGrid = () => {
    const months = [];
    for (let i = 0; i < 6; i++) {
      const month = addMonths(new Date(), i);
      months.push({
        date: month,
        label: format(month, 'MMM yyyy', { locale: nl }),
        offset: i
      });
    }
    return months;
  };

  const navigateCalendar = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => addMonths(prev, direction === 'next' ? 1 : -1));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "input-jetleg justify-start text-left font-normal h-12 lg:h-12 w-full bg-white/90 hover:bg-white border-input",
            !value && "text-muted-foreground",
            className
          )}
        >
          <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate">
            {value ? getDisplayValue() : 'Selecteer datum'}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[400px] p-0 bg-card border border-border shadow-lg" 
        align="start"
        side="bottom"
        sideOffset={4}
        alignOffset={0}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 rounded-none rounded-t-lg">
            <TabsTrigger 
              value="calendar" 
              className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <CalendarDays className="h-4 w-4" />
              <span className="hidden sm:inline">Kalender</span>
              <span className="sm:hidden">Datum</span>
            </TabsTrigger>
            <TabsTrigger 
              value="flexible" 
              className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Flexibel</span>
              <span className="sm:hidden">Flex</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="mt-0">
            <div className="p-4 flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateCalendar('prev')}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="font-medium text-sm">
                  {format(currentMonth, 'MMMM yyyy', { locale: nl })}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateCalendar('next')}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                initialFocus
                className="pointer-events-auto"
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="flexible" className="mt-0 p-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-sm mb-2">Wanneer wil je vliegen?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Kies een flexibele periode voor de beste deals
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {flexibleOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={value === option.value ? "default" : "outline"}
                    className="justify-start h-12 text-sm font-normal"
                    onClick={() => handleFlexibleSelect(option)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-medium text-sm mb-3">Selecteer een maand</h4>
                <div className="grid grid-cols-2 gap-2">
                  {generateMonthGrid().map((month) => (
                    <Button
                      key={month.offset}
                      variant="outline"
                      className="h-10 text-sm font-normal justify-center"
                      onClick={() => handleMonthSelect(month.offset)}
                    >
                      {month.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default EnhancedDatePicker;
