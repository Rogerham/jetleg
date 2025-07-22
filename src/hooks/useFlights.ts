
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Flight {
  id: string;
  departure_airport: string;
  arrival_airport: string;
  departure_time: string;
  arrival_time: string;
  price_per_seat: number;
  available_seats: number;
  operator: string;
  flight_duration: string;
  jet_id: number | null;
  jets?: {
    brand: string;
    model: string;
    type: string;
    seating_capacity: number;
    range_km: number;
    description: string;
    image_url: string;
  };
}

export const useFlights = (searchParams?: {
  from?: string;
  to?: string;
  date?: string;
  passengers?: string;
}) => {
  return useQuery({
    queryKey: ['flights', searchParams],
    queryFn: async () => {
      let query = supabase
        .from('flights')
        .select(`
          *,
          jets (
            brand,
            model,
            type,
            seating_capacity,
            range_km,
            description,
            image_url
          )
        `);

      // Apply filters if search params are provided
      if (searchParams?.from) {
        query = query.ilike('departure_airport', `%${searchParams.from.split('(')[0].trim()}%`);
      }
      
      // Handle "Overal" destination - don't filter by destination
      if (searchParams?.to && searchParams.to !== 'Overal') {
        query = query.ilike('arrival_airport', `%${searchParams.to.split('(')[0].trim()}%`);
      }

      // Handle flexible date options - only filter by date if it's a specific date
      if (searchParams?.date && !['today', 'tomorrow', 'weekend', 'next-week', 'next-month', 'flexible'].includes(searchParams.date)) {
        const searchDate = new Date(searchParams.date);
        const nextDay = new Date(searchDate);
        nextDay.setDate(nextDay.getDate() + 1);
        
        query = query
          .gte('departure_time', searchDate.toISOString())
          .lt('departure_time', nextDay.toISOString());
      }

      if (searchParams?.passengers) {
        const passengerCount = parseInt(searchParams.passengers);
        query = query.gte('available_seats', passengerCount);
      }

      const { data, error } = await query.order('departure_time');

      if (error) {
        console.error('Error fetching flights:', error);
        throw error;
      }

      return data as Flight[];
    },
  });
};

export const useFlightById = (flightId: string) => {
  return useQuery({
    queryKey: ['flight', flightId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('flights')
        .select(`
          *,
          jets (
            brand,
            model,
            type,
            seating_capacity,
            range_km,
            description,
            image_url
          )
        `)
        .eq('id', flightId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching flight:', error);
        throw error;
      }

      return data as Flight | null;
    },
  });
};

// Hook to get all available flights for deals sections
export const useAllFlights = () => {
  return useQuery({
    queryKey: ['all-flights'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('flights')
        .select(`
          *,
          jets (
            brand,
            model,
            type,
            seating_capacity,
            range_km,
            description,
            image_url
          )
        `)
        .order('price_per_seat', { ascending: true });

      if (error) {
        console.error('Error fetching all flights:', error);
        throw error;
      }

      return data as Flight[];
    },
  });
};
