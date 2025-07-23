
import { useQuery } from '@tanstack/react-query';
import { useDealsFlights } from './useFlights';
import { groupFlightsByDestination } from '@/utils/destinationUtils';
import { DestinationDeal } from '@/types/destinationDeals';

export const useDestinationDeals = () => {
  const { data: flights = [], isLoading: flightsLoading, error: flightsError } = useDealsFlights();

  return useQuery({
    queryKey: ['destination-deals', flights.length],
    queryFn: async (): Promise<DestinationDeal[]> => {
      if (flights.length === 0) {
        console.log('No flights available for destination deals');
        return [];
      }
      
      console.log(`Processing ${flights.length} flights for destination deals`);
      const destinationDeals = groupFlightsByDestination(flights);
      console.log(`Generated ${destinationDeals.length} destination deals from ${flights.length} flights`);
      
      return destinationDeals;
    },
    enabled: !flightsLoading && flights.length > 0,
    // Return the loading state and error from flights query
    meta: {
      isLoading: flightsLoading,
      error: flightsError
    }
  });
};
