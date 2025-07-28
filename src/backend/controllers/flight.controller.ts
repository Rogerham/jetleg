
// Flight API controller
import { FlightService } from '../services/flight.service';
import { FlightSearchParams, FlightFilters, FlightSortOptions } from '../models/flight.model';

export class FlightController {
  private flightService: FlightService;

  constructor() {
    this.flightService = new FlightService();
  }

  async handleFlightSearch(
    searchParams: FlightSearchParams,
    filters?: FlightFilters,
    sortOptions?: FlightSortOptions
  ) {
    try {
      console.log('Processing flight search request:', { searchParams, filters, sortOptions });

      const result = await this.flightService.searchFlights(searchParams, filters, sortOptions);

      return {
        success: true,
        data: result,
        message: `Found ${result.filteredCount} flights`
      };
    } catch (error) {
      console.error('Flight search error:', error);
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async handleGetFlightById(flightId: string) {
    try {
      console.log('Processing get flight by ID request:', flightId);

      const flight = await this.flightService.getFlightById(flightId);

      return {
        success: true,
        data: flight,
        message: 'Flight retrieved successfully'
      };
    } catch (error) {
      console.error('Get flight by ID error:', error);
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Flight not found'
      };
    }
  }

  async handleGetAllFlights() {
    try {
      console.log('Processing get all flights request');

      const flights = await this.flightService.getAllAvailableFlights();

      return {
        success: true,
        data: flights,
        message: `Retrieved ${flights.length} available flights`
      };
    } catch (error) {
      console.error('Get all flights error:', error);
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to retrieve flights'
      };
    }
  }
}
