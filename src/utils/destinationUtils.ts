
import { Flight } from '@/hooks/useFlights';
import { DestinationDeal } from '@/types/destinationDeals';
import { extractAirportCode, extractCityName } from './flightUtils';

// Default destination images mapping
const DESTINATION_IMAGES: Record<string, string> = {
  'Paris': '/src/assets/paris-aerial.jpg',
  'London': '/src/assets/london-aerial.jpg',
  'Ibiza': '/src/assets/ibiza-aerial.jpg',
  // Add more as needed
};

// Default fallback image
const DEFAULT_DESTINATION_IMAGE = '/src/assets/hero-bg.jpg';

/**
 * Groups flights by destination and creates DestinationDeal objects
 */
export const groupFlightsByDestination = (flights: Flight[]): DestinationDeal[] => {
  const destinationMap = new Map<string, Flight[]>();
  
  // Group flights by destination city
  flights.forEach(flight => {
    const destinationCity = extractCityName(flight.arrival_airport);
    const destinationCode = extractAirportCode(flight.arrival_airport);
    const key = `${destinationCity}-${destinationCode}`;
    
    if (!destinationMap.has(key)) {
      destinationMap.set(key, []);
    }
    destinationMap.get(key)!.push(flight);
  });
  
  // Convert to DestinationDeal objects
  const destinationDeals: DestinationDeal[] = [];
  
  destinationMap.forEach((flights, key) => {
    const [destinationCity, destinationCode] = key.split('-');
    
    // Calculate aggregated data
    const minPrice = Math.min(...flights.map(f => f.price_per_seat));
    const totalAvailableSeats = flights.reduce((sum, f) => sum + f.available_seats, 0);
    const operators = [...new Set(flights.map(f => f.operator))];
    
    // Get country from airport string (simple extraction)
    const country = extractCountryFromAirport(flights[0].arrival_airport);
    
    // Create destination deal
    const destinationDeal: DestinationDeal = {
      id: `dest-${destinationCode.toLowerCase()}`,
      destination: destinationCity,
      destinationCode,
      country,
      flights,
      minPrice,
      totalAvailableSeats,
      operators,
      imageUrl: DESTINATION_IMAGES[destinationCity] || DEFAULT_DESTINATION_IMAGE,
      description: generateDestinationDescription(destinationCity, country, operators.length)
    };
    
    destinationDeals.push(destinationDeal);
  });
  
  // Sort by min price and limit to 12
  return destinationDeals
    .sort((a, b) => a.minPrice - b.minPrice)
    .slice(0, 12);
};

/**
 * Extract country from airport string (basic implementation)
 */
const extractCountryFromAirport = (airport: string): string => {
  // This is a simplified implementation
  // In a real app, you'd have a proper airport database
  if (airport.includes('France') || airport.includes('Paris')) return 'Frankrijk';
  if (airport.includes('UK') || airport.includes('London') || airport.includes('England')) return 'Verenigd Koninkrijk';
  if (airport.includes('Spain') || airport.includes('Madrid') || airport.includes('Barcelona') || airport.includes('Ibiza')) return 'Spanje';
  if (airport.includes('Italy') || airport.includes('Rome') || airport.includes('Milan')) return 'Italië';
  if (airport.includes('Germany') || airport.includes('Berlin') || airport.includes('Munich')) return 'Duitsland';
  if (airport.includes('Netherlands') || airport.includes('Amsterdam')) return 'Nederland';
  
  return 'Europa'; // Default fallback
};

/**
 * Generate a description for the destination
 */
const generateDestinationDescription = (destination: string, country: string, operatorCount: number): string => {
  const flightText = operatorCount === 1 ? 'operator' : 'operators';
  return `Ontdek ${destination}, ${country} met ${operatorCount} beschikbare ${flightText}`;
};

/**
 * Get the best (cheapest) flight for a destination
 */
export const getBestFlightForDestination = (destinationDeal: DestinationDeal): Flight => {
  return destinationDeal.flights.reduce((best, current) => 
    current.price_per_seat < best.price_per_seat ? current : best
  );
};
