
// Flight gerelateerde TypeScript interfaces en types
export interface FlightSearchParams {
  from?: string;
  to?: string;
  date?: string;
  passengers?: string;
}

export interface FlightFilters {
  minPrice?: number;
  maxPrice?: number;
  jetType?: string;
  operator?: string;
  maxDuration?: string;
}

export interface FlightSortOptions {
  field: 'price_per_seat' | 'departure_time' | 'flight_duration';
  direction: 'asc' | 'desc';
}

export interface FlightEntity {
  id: string;
  departure_airport: string;
  arrival_airport: string;
  departure_time: string;
  arrival_time: string;
  price_per_seat: number;
  available_seats: number;
  operator: string;
  flight_duration: string;
  jet_id: number;
  img_destination?: string;
  jets: JetEntity | null;
}

export interface JetEntity {
  brand: string;
  model: string;
  type: string;
  seating_capacity: number;
  range_km: number;
  description: string;
  image_url: string | null;
}

export interface FlightSearchResult {
  flights: FlightEntity[];
  totalCount: number;
  filteredCount: number;
  searchParams: FlightSearchParams;
}
