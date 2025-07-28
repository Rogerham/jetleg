
// Flight data access layer
import { supabase } from '@/integrations/supabase/client';
import { FlightEntity, FlightSearchParams, FlightFilters } from '../models/flight.model';
import { DateUtils } from '../utils/date.utils';
import { DATABASE_CONFIG } from '../config/database.config';

export class FlightRepository {
  async findFlights(searchParams: FlightSearchParams, filters?: FlightFilters): Promise<FlightEntity[]> {
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
    if (searchParams.from && searchParams.from !== DATABASE_CONFIG.SPECIAL_LOCATIONS.ALL_AIRPORTS) {
      const fromCity = searchParams.from.split('(')[0].trim();
      query = query.ilike('departure_airport', `%${fromCity}%`);
    }

    if (searchParams.to && searchParams.to !== DATABASE_CONFIG.SPECIAL_LOCATIONS.EVERYWHERE) {
      const toCity = searchParams.to.split('(')[0].trim();
      query = query.ilike('arrival_airport', `%${toCity}%`);
    }

    // Apply date filters
    if (searchParams.date && searchParams.date !== 'flexible' && searchParams.date !== 'fully-flexible') {
      if (DATABASE_CONFIG.FLEXIBLE_DATE_OPTIONS.includes(searchParams.date as any)) {
        const dateRange = DateUtils.getDateRange(searchParams.date);
        query = query
          .gte('departure_time', DateUtils.formatDateForDatabase(dateRange.start))
          .lt('departure_time', DateUtils.formatDateForDatabase(dateRange.end));
      } else {
        const searchDate = DateUtils.parseDateString(searchParams.date);
        if (searchDate) {
          const nextDay = new Date(searchDate);
          nextDay.setDate(nextDay.getDate() + 1);
          query = query
            .gte('departure_time', DateUtils.formatDateForDatabase(searchDate))
            .lt('departure_time', DateUtils.formatDateForDatabase(nextDay));
        }
      }
    }

    // Apply passenger filter
    if (searchParams.passengers) {
      const passengerCount = parseInt(searchParams.passengers);
      if (!isNaN(passengerCount)) {
        query = query.gte('available_seats', passengerCount);
      }
    }

    // Apply price filters
    if (filters?.minPrice !== undefined) {
      query = query.gte('price_per_seat', filters.minPrice);
    }
    if (filters?.maxPrice !== undefined) {
      query = query.lte('price_per_seat', filters.maxPrice);
    }

    // Apply operator filter
    if (filters?.operator) {
      query = query.ilike('operator', `%${filters.operator}%`);
    }

    // Always show future flights only
    const now = DateUtils.formatDateForDatabase(DateUtils.getCurrentDate());
    query = query.gte('departure_time', now);

    const { data, error } = await query.order('departure_time');

    if (error) {
      console.error('Error fetching flights:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    return data as FlightEntity[];
  }

  async findFlightById(flightId: string): Promise<FlightEntity | null> {
    const { data, error } = await supabase
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
      `)
      .eq('id', flightId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching flight by ID:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    return data as FlightEntity | null;
  }

  async findAllAvailableFlights(): Promise<FlightEntity[]> {
    const now = DateUtils.formatDateForDatabase(DateUtils.getCurrentDate());
    
    const { data, error } = await supabase
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
      `)
      .gte('departure_time', now)
      .order('departure_time', { ascending: true });

    if (error) {
      console.error('Error fetching all available flights:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    return data as FlightEntity[];
  }
}
