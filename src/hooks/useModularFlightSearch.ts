
// Gerefactoreerde flight search hook die gebruik maakt van de nieuwe backend architectuur
import { useQuery } from '@tanstack/react-query';
import { FlightController } from '../backend/controllers/flight.controller';
import { FlightSearchParams, FlightFilters, FlightSortOptions } from '../backend/models/flight.model';
import { DATABASE_CONFIG } from '../backend/config/database.config';

const flightController = new FlightController();

export const useModularFlightSearch = (
  searchParams: FlightSearchParams,
  filters?: FlightFilters,
  sortOptions?: FlightSortOptions,
  enabled = true
) => {
  return useQuery({
    queryKey: ['modular-flight-search', searchParams, filters, sortOptions],
    queryFn: async () => {
      console.log('Executing modular flight search with params:', searchParams);
      
      const result = await flightController.handleFlightSearch(searchParams, filters, sortOptions);
      
      if (!result.success) {
        throw new Error(result.error || 'Flight search failed');
      }
      
      return result.data;
    },
    enabled,
    staleTime: DATABASE_CONFIG.CACHE_TIMES.STALE_TIME,
    gcTime: DATABASE_CONFIG.CACHE_TIMES.FLIGHTS,
  });
};

export const useModularFlightById = (flightId: string, enabled = true) => {
  return useQuery({
    queryKey: ['modular-flight', flightId],
    queryFn: async () => {
      console.log('Executing get flight by ID:', flightId);
      
      const result = await flightController.handleGetFlightById(flightId);
      
      if (!result.success) {
        throw new Error(result.error || 'Flight not found');
      }
      
      return result.data;
    },
    enabled: enabled && !!flightId,
    staleTime: DATABASE_CONFIG.CACHE_TIMES.STALE_TIME,
    gcTime: DATABASE_CONFIG.CACHE_TIMES.FLIGHTS,
  });
};

export const useModularAllFlights = () => {
  return useQuery({
    queryKey: ['modular-all-flights'],
    queryFn: async () => {
      console.log('Executing get all flights');
      
      const result = await flightController.handleGetAllFlights();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to retrieve flights');
      }
      
      return result.data;
    },
    staleTime: DATABASE_CONFIG.CACHE_TIMES.LONG_CACHE,
    gcTime: DATABASE_CONFIG.CACHE_TIMES.FLIGHTS,
  });
};
