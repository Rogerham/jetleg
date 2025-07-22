
import { Flight } from '@/hooks/useFlights';

export interface DestinationDeal {
  id: string;
  destination: string;
  destinationCode: string;
  country: string;
  flights: Flight[];
  minPrice: number;
  totalAvailableSeats: number;
  operators: string[];
  imageUrl: string;
  description: string;
}
