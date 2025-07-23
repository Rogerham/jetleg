
import { Flight } from '@/hooks/useFlights';
import { DestinationDeal } from '@/types/destinationDeals';
import { extractAirportCode, extractCityName } from './flightUtils';

// The 12 specific destinations we want to feature
const FEATURED_DESTINATIONS = [
  'Barcelona', 'Berlin', 'Cannes', 'Dubai', 'Courchevel', 
  'London', 'Los Angeles', 'Madrid', 'Monaco', 'New York', 'Paris', 'Geneva'
];

// Country mapping for the 12 featured destinations
const DESTINATION_COUNTRIES: Record<string, string> = {
  'Barcelona': 'Spanje',
  'Berlin': 'Duitsland',
  'Cannes': 'Frankrijk',
  'Dubai': 'Verenigde Arabische Emiraten',
  'Courchevel': 'Frankrijk',
  'London': 'Verenigd Koninkrijk',
  'Los Angeles': 'Verenigde Staten',
  'Madrid': 'Spanje',
  'Monaco': 'Monaco',
  'New York': 'Verenigde Staten',
  'Paris': 'Frankrijk',
  'Geneva': 'Zwitserland'
};

// Default fallback image
const DEFAULT_DESTINATION_IMAGE = '/src/assets/hero-bg.jpg';

/**
 * Groups flights by destination and creates DestinationDeal objects for the 12 featured destinations
 */
export const groupFlightsByDestination = (flights: Flight[]): DestinationDeal[] => {
  console.log(`Processing ${flights.length} flights for destination deals`);
  
  // Filter flights to only include our 12 featured destinations
  const featuredFlights = flights.filter(flight => {
    const destinationCity = extractCityName(flight.arrival_airport);
    const isFeatured = FEATURED_DESTINATIONS.includes(destinationCity);
    if (isFeatured) {
      console.log(`Found flight to featured destination: ${destinationCity}`);
    }
    return isFeatured;
  });

  console.log(`Filtered to ${featuredFlights.length} flights for featured destinations`);

  const destinationMap = new Map<string, Flight[]>();
  
  // Group flights by destination city
  featuredFlights.forEach(flight => {
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
    
    // Get country from our mapping
    const country = DESTINATION_COUNTRIES[destinationCity] || 'Europa';
    
    // Get image URL - prioritize img_destination from flights, then fallback
    const imageUrl = getDestinationImageUrl(flights, destinationCity);
    
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
      imageUrl,
      description: generateDestinationDescription(destinationCity, country, operators.length)
    };
    
    console.log(`Created destination deal for ${destinationCity}: ${flights.length} flights, min price ${minPrice}`);
    destinationDeals.push(destinationDeal);
  });
  
  // Sort by min price and ensure we have all destinations
  const sortedDeals = destinationDeals.sort((a, b) => a.minPrice - b.minPrice);
  
  console.log(`Final destination deals: ${sortedDeals.length} destinations`);
  return sortedDeals;
};

/**
 * Get the best image URL for a destination
 */
const getDestinationImageUrl = (flights: Flight[], destinationCity: string): string => {
  // First, try to find a flight with img_destination
  const flightWithImage = flights.find(flight => flight.img_destination && flight.img_destination.trim() !== '');
  
  if (flightWithImage?.img_destination) {
    console.log(`Using img_destination for ${destinationCity}: ${flightWithImage.img_destination}`);
    return flightWithImage.img_destination;
  }
  
  // Fallback to destination-photos storage bucket
  const fallbackUrl = `https://dtvvyopjzdmbnpgwhkbi.supabase.co/storage/v1/object/public/destination-photos/${destinationCity.toLowerCase()}.jpg`;
  console.log(`Using fallback image for ${destinationCity}: ${fallbackUrl}`);
  return fallbackUrl;
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
