
import { Flight } from '@/hooks/useFlights';

export interface DestinationDeal {
  id: string;
  destination: string;
  destinationCode: string;
  countryKey: string; // Translation key for country instead of translated text
  flights: Flight[];
  minPrice: number;
  totalAvailableSeats: number;
  operators: string[];
  imageUrl: string;
  operatorCount: number; // Add operator count field
}
