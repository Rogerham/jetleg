
// Flight business logica
import { FlightRepository } from '../repositories/flight.repository';
import { FlightValidator } from '../validators/flight.validator';
import { 
  FlightEntity, 
  FlightSearchParams, 
  FlightFilters, 
  FlightSortOptions, 
  FlightSearchResult 
} from '../models/flight.model';

export class FlightService {
  private flightRepository: FlightRepository;

  constructor() {
    this.flightRepository = new FlightRepository();
  }

  async searchFlights(
    searchParams: FlightSearchParams,
    filters?: FlightFilters,
    sortOptions?: FlightSortOptions
  ): Promise<FlightSearchResult> {
    // Valideer input parameters
    const paramsValidation = FlightValidator.validateSearchParams(searchParams);
    if (!paramsValidation.isValid) {
      throw new Error(`Invalid search parameters: ${paramsValidation.errors.join(', ')}`);
    }

    let filtersValidation;
    if (filters) {
      filtersValidation = FlightValidator.validateFilters(filters);
      if (!filtersValidation.isValid) {
        throw new Error(`Invalid filters: ${filtersValidation.errors.join(', ')}`);
      }
    }

    // Haal flights op uit repository
    const rawFlights = await this.flightRepository.findFlights(
      paramsValidation.sanitized,
      filtersValidation?.sanitized || filters
    );

    // Apply client-side filters
    let filteredFlights = this.applyClientSideFilters(rawFlights, filters);

    // Apply sorting
    if (sortOptions) {
      const validatedSort = FlightValidator.validateSortOptions(sortOptions);
      filteredFlights = this.sortFlights(filteredFlights, validatedSort);
    }

    console.log(`Flight search completed: ${filteredFlights.length} flights found`);

    return {
      flights: filteredFlights,
      totalCount: rawFlights.length,
      filteredCount: filteredFlights.length,
      searchParams: paramsValidation.sanitized
    };
  }

  async getFlightById(flightId: string): Promise<FlightEntity> {
    if (!flightId || typeof flightId !== 'string') {
      throw new Error('Invalid flight ID provided');
    }

    const flight = await this.flightRepository.findFlightById(flightId);
    
    if (!flight) {
      throw new Error(`Flight with ID ${flightId} not found`);
    }

    return flight;
  }

  async getAllAvailableFlights(): Promise<FlightEntity[]> {
    return await this.flightRepository.findAllAvailableFlights();
  }

  private applyClientSideFilters(flights: FlightEntity[], filters?: FlightFilters): FlightEntity[] {
    if (!filters) return flights;

    let filtered = [...flights];

    // Jet type filter
    if (filters.jetType) {
      filtered = filtered.filter(flight => 
        flight.jets?.type?.toLowerCase().includes(filters.jetType!.toLowerCase())
      );
    }

    // Duration filter
    if (filters.maxDuration) {
      const maxHours = parseFloat(filters.maxDuration);
      if (!isNaN(maxHours)) {
        filtered = filtered.filter(flight => {
          const duration = this.parseDuration(flight.flight_duration);
          return duration <= maxHours;
        });
      }
    }

    return filtered;
  }

  private sortFlights(flights: FlightEntity[], sortOptions: FlightSortOptions): FlightEntity[] {
    return [...flights].sort((a, b) => {
      let comparison = 0;

      switch (sortOptions.field) {
        case 'price_per_seat':
          comparison = a.price_per_seat - b.price_per_seat;
          break;
        case 'departure_time':
          comparison = new Date(a.departure_time).getTime() - new Date(b.departure_time).getTime();
          break;
        case 'flight_duration':
          const aDuration = this.parseDuration(a.flight_duration);
          const bDuration = this.parseDuration(b.flight_duration);
          comparison = aDuration - bDuration;
          break;
      }

      return sortOptions.direction === 'desc' ? -comparison : comparison;
    });
  }

  private parseDuration(duration: string): number {
    const hourMatch = duration.match(/(\d+)h/);
    const minuteMatch = duration.match(/(\d+)m/);
    
    const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
    const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
    
    return hours + minutes / 60;
  }
}
