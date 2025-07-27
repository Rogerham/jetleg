
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Flight } from './useFlights';

export interface SearchFilters {
  from?: string;
  to?: string;
  date?: string;
  passengers?: string;
  minPrice?: number;
  maxPrice?: number;
  jetType?: string;
  operator?: string;
  maxDuration?: string;
}

export interface SortOptions {
  field: 'price_per_seat' | 'departure_time' | 'flight_duration';
  direction: 'asc' | 'desc';
}

export const useEnhancedFlightSearch = (
  filters: SearchFilters,
  sortOptions: SortOptions = { field: 'departure_time', direction: 'asc' }
) => {
  return useQuery({
    queryKey: ['enhanced-flight-search', filters, sortOptions],
    queryFn: async () => {
      let query = supabase
        .from('flights')
        .select(`
          id,
          departure_airport,
          arrival_airport,
          departure_time,
          arrival_time,
          price_per_seat,
          available_seats,
          operator,
          flight_duration,
          jet_id,
          img_destination,
          jets!flights_jet_id_fkey (
            brand,
            model,
            type,
            seating_capacity,
            range_km,
            description,
            image_url
          )
        `);

      // Apply location filters
      if (filters.from && filters.from.trim() !== '' && filters.from !== 'Alle luchthavens') {
        const fromCity = filters.from.split('(')[0].trim();
        query = query.ilike('departure_airport', `%${fromCity}%`);
      }
      
      if (filters.to && filters.to !== 'Overal' && filters.to.trim() !== '') {
        const toCity = filters.to.split('(')[0].trim();
        query = query.ilike('arrival_airport', `%${toCity}%`);
      }

      // Apply date filters
      if (filters.date && filters.date !== 'flexible' && filters.date !== 'fully-flexible') {
        if (!['today', 'tomorrow', 'weekend', 'next-week', 'next-month'].includes(filters.date)) {
          const searchDate = new Date(filters.date);
          const nextDay = new Date(searchDate);
          nextDay.setDate(nextDay.getDate() + 1);
          
          query = query
            .gte('departure_time', searchDate.toISOString())
            .lt('departure_time', nextDay.toISOString());
        } else {
          // Handle flexible date options
          const now = new Date();
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          
          switch (filters.date) {
            case 'today':
              const tomorrow = new Date(today);
              tomorrow.setDate(tomorrow.getDate() + 1);
              query = query
                .gte('departure_time', today.toISOString())
                .lt('departure_time', tomorrow.toISOString());
              break;
              
            case 'tomorrow':
              const tomorrowStart = new Date(today);
              tomorrowStart.setDate(tomorrowStart.getDate() + 1);
              const tomorrowEnd = new Date(tomorrowStart);
              tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);
              query = query
                .gte('departure_time', tomorrowStart.toISOString())
                .lt('departure_time', tomorrowEnd.toISOString());
              break;
              
            case 'weekend':
              const nextSaturday = new Date(today);
              const daysUntilSaturday = (6 - today.getDay()) % 7;
              nextSaturday.setDate(today.getDate() + (daysUntilSaturday === 0 ? 7 : daysUntilSaturday));
              const nextMonday = new Date(nextSaturday);
              nextMonday.setDate(nextSaturday.getDate() + 2);
              query = query
                .gte('departure_time', nextSaturday.toISOString())
                .lt('departure_time', nextMonday.toISOString());
              break;
              
            case 'next-week':
              const nextWeek = new Date(today);
              nextWeek.setDate(today.getDate() + 7);
              const weekAfter = new Date(nextWeek);
              weekAfter.setDate(nextWeek.getDate() + 7);
              query = query
                .gte('departure_time', nextWeek.toISOString())
                .lt('departure_time', weekAfter.toISOString());
              break;
              
            case 'next-month':
              const nextMonth = new Date(today);
              nextMonth.setMonth(today.getMonth() + 1);
              const monthAfter = new Date(nextMonth);
              monthAfter.setMonth(nextMonth.getMonth() + 1);
              query = query
                .gte('departure_time', nextMonth.toISOString())
                .lt('departure_time', monthAfter.toISOString());
              break;
          }
        }
      }

      // Apply passenger filter
      if (filters.passengers) {
        const passengerCount = parseInt(filters.passengers);
        if (!isNaN(passengerCount)) {
          query = query.gte('available_seats', passengerCount);
        }
      }

      // Apply price range filters
      if (filters.minPrice !== undefined && filters.minPrice >= 0) {
        query = query.gte('price_per_seat', filters.minPrice);
      }
      if (filters.maxPrice !== undefined && filters.maxPrice >= 0) {
        query = query.lte('price_per_seat', filters.maxPrice);
      }

      // Apply operator filter
      if (filters.operator && filters.operator.trim() !== '') {
        query = query.ilike('operator', `%${filters.operator}%`);
      }

      // Always show future flights only
      const now = new Date().toISOString();
      query = query.gte('departure_time', now);

      // Apply sorting
      const isAscending = sortOptions.direction === 'asc';
      query = query.order(sortOptions.field, { ascending: isAscending });

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching enhanced flight search:', error);
        throw error;
      }

      let filteredData = data as Flight[];

      // Apply client-side jet type filter (since we need to filter by joined table data)
      if (filters.jetType && filters.jetType.trim() !== '') {
        filteredData = filteredData.filter(flight => 
          flight.jets?.type?.toLowerCase().includes(filters.jetType!.toLowerCase())
        );
      }

      // Apply client-side duration filter if specified
      if (filters.maxDuration && filters.maxDuration.trim() !== '') {
        const maxHours = parseFloat(filters.maxDuration);
        if (!isNaN(maxHours)) {
          filteredData = filteredData.filter(flight => {
            const durationStr = flight.flight_duration;
            const hours = parseFloat(durationStr.replace(/[^0-9.]/g, ''));
            return hours <= maxHours;
          });
        }
      }

      console.log(`Enhanced search found ${filteredData.length} flights with filters:`, filters);
      return filteredData;
    },
    enabled: true,
    staleTime: 30000, // Cache for 30 seconds
  });
};
