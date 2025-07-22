
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
        return [];
      }
      
      const destinationDeals = groupFlightsByDestination(flights);
      console.log(`Processed ${flights.length} flights into ${destinationDeals.length} destination deals`);
      
      return destinationDeals;
    },
    enabled: !flightsLoading && flights.length > 0,
    // Use the flights loading state and error
    meta: {
      isLoading: flightsLoading,
      error: flightsError
    }
  });
};
