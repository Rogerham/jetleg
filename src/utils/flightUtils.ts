
import { Flight } from '@/hooks/useFlights';

/**
 * De-duplicates flights by origin/destination, keeping only the most recent flight
 * for each unique route. This is specifically for deals sections.
 */
export const deduplicateFlightsByRoute = (flights: Flight[]): Flight[] => {
  const routeMap = new Map<string, Flight>();
  
  flights.forEach(flight => {
    // Create a unique key for the route (origin -> destination)
    const routeKey = `${flight.departure_airport}->${flight.arrival_airport}`;
    
    // If we haven't seen this route before, or if this flight is more recent
    if (!routeMap.has(routeKey) || 
        new Date(flight.departure_time) > new Date(routeMap.get(routeKey)!.departure_time)) {
      routeMap.set(routeKey, flight);
    }
  });
  
  // Return the deduplicated flights sorted by departure time
  return Array.from(routeMap.values()).sort((a, b) => 
    new Date(a.departure_time).getTime() - new Date(b.departure_time).getTime()
  );
};

/**
 * Extracts airport code from airport string
 */
export const extractAirportCode = (airport: string): string => {
  const match = airport.match(/\(([^)]+)\)/);
  return match ? match[1] : airport.slice(-3);
};

/**
 * Extracts city name from airport string
 */
export const extractCityName = (airport: string): string => {
  return airport.split('(')[0].trim();
};
