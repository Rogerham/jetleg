
import { X } from 'lucide-react';
import { formatHoursToDuration } from '@/utils/durationUtils';

interface Filter {
  key: string;
  label: string;
  value: any;
  defaultValue: any;
}

interface ActiveFiltersProps {
  filters: {
    minPrice: number;
    maxPrice: number;
    minPassengers: number;
    maxPassengers: number;
    minDuration: number;
    maxDuration: number;
    aircraft: string;
    timeOfDay: string;
  };
  onRemoveFilter: (key: string) => void;
  onClearAll: () => void;
}

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }: ActiveFiltersProps) => {
  const activeFilters: Filter[] = [];

  // Check for active filters
  if (filters.minPrice > 0) {
    activeFilters.push({
      key: 'minPrice',
      label: `Min. prijs: €${filters.minPrice}`,
      value: filters.minPrice,
      defaultValue: 0
    });
  }

  if (filters.maxPrice < 10000) {
    activeFilters.push({
      key: 'maxPrice',
      label: `Max. prijs: €${filters.maxPrice}`,
      value: filters.maxPrice,
      defaultValue: 10000
    });
  }

  if (filters.minPassengers > 1) {
    activeFilters.push({
      key: 'minPassengers',
      label: `Min. ${filters.minPassengers} passagiers`,
      value: filters.minPassengers,
      defaultValue: 1
    });
  }

  if (filters.maxPassengers < 20) {
    activeFilters.push({
      key: 'maxPassengers',
      label: `Max. ${filters.maxPassengers} passagiers`,
      value: filters.maxPassengers,
      defaultValue: 20
    });
  }

  if (filters.minDuration > 0.5) {
    activeFilters.push({
      key: 'minDuration',
      label: `Min. duur: ${formatHoursToDuration(filters.minDuration)}`,
      value: filters.minDuration,
      defaultValue: 0.5
    });
  }

  if (filters.maxDuration < 20) {
    activeFilters.push({
      key: 'maxDuration',
      label: `Max. duur: ${formatHoursToDuration(filters.maxDuration)}`,
      value: filters.maxDuration,
      defaultValue: 20
    });
  }

  if (filters.aircraft) {
    activeFilters.push({
      key: 'aircraft',
      label: `Vliegtuig: ${filters.aircraft}`,
      value: filters.aircraft,
      defaultValue: ''
    });
  }

  if (filters.timeOfDay !== 'any') {
    const timeLabels = {
      morning: 'Ochtend',
      afternoon: 'Middag',
      evening: 'Avond'
    };
    
    activeFilters.push({
      key: 'timeOfDay',
      label: `Tijd: ${timeLabels[filters.timeOfDay as keyof typeof timeLabels]}`,
      value: filters.timeOfDay,
      defaultValue: 'any'
    });
  }

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-foreground">Actieve filters</h3>
        <button
          onClick={onClearAll}
          className="text-sm text-accent hover:text-accent/80 transition-colors"
        >
          Wis alle filters
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <div
            key={filter.key}
            className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
          >
            <span>{filter.label}</span>
            <button
              onClick={() => onRemoveFilter(filter.key)}
              className="hover:bg-accent/20 rounded-full p-0.5 transition-colors"
              title={`Verwijder filter: ${filter.label}`}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;
