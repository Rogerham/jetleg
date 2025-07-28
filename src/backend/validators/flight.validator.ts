
// Flight search validatie logica
import { FlightSearchParams, FlightFilters, FlightSortOptions } from '../models/flight.model';
import { DATABASE_CONFIG } from '../config/database.config';

export class FlightValidator {
  static validateSearchParams(params: FlightSearchParams): {
    isValid: boolean;
    errors: string[];
    sanitized: FlightSearchParams;
  } {
    const errors: string[] = [];
    const sanitized: FlightSearchParams = { ...params };

    // Valideer passengers
    if (params.passengers) {
      const passengerCount = parseInt(params.passengers);
      if (isNaN(passengerCount) || passengerCount < 1 || passengerCount > 20) {
        errors.push('Aantal passagiers moet tussen 1 en 20 zijn');
        sanitized.passengers = '1';
      }
    }

    // Valideer datum format
    if (params.date && !DATABASE_CONFIG.FLEXIBLE_DATE_OPTIONS.includes(params.date as any)) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(params.date)) {
        const testDate = new Date(params.date);
        if (isNaN(testDate.getTime())) {
          errors.push('Ongeldige datum format');
          sanitized.date = undefined;
        }
      }
    }

    // Sanitize locatie inputs
    if (params.from) {
      sanitized.from = params.from.trim();
    }
    if (params.to) {
      sanitized.to = params.to.trim();
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitized
    };
  }

  static validateFilters(filters: FlightFilters): {
    isValid: boolean;
    errors: string[];
    sanitized: FlightFilters;
  } {
    const errors: string[] = [];
    const sanitized: FlightFilters = { ...filters };

    // Valideer price range
    if (filters.minPrice !== undefined && filters.minPrice < 0) {
      errors.push('Minimale prijs kan niet negatief zijn');
      sanitized.minPrice = 0;
    }

    if (filters.maxPrice !== undefined && filters.maxPrice < 0) {
      errors.push('Maximale prijs kan niet negatief zijn');
      sanitized.maxPrice = undefined;
    }

    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      if (filters.minPrice > filters.maxPrice) {
        errors.push('Minimale prijs kan niet hoger zijn dan maximale prijs');
        sanitized.minPrice = filters.maxPrice;
      }
    }

    // Valideer duration
    if (filters.maxDuration) {
      const duration = parseFloat(filters.maxDuration);
      if (isNaN(duration) || duration <= 0 || duration > 24) {
        errors.push('Maximale vliegduur moet tussen 0 en 24 uur zijn');
        sanitized.maxDuration = undefined;
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitized
    };
  }

  static validateSortOptions(sortOptions: FlightSortOptions): FlightSortOptions {
    const validFields = ['price_per_seat', 'departure_time', 'flight_duration'];
    const validDirections = ['asc', 'desc'];

    return {
      field: validFields.includes(sortOptions.field) ? sortOptions.field : 'departure_time',
      direction: validDirections.includes(sortOptions.direction) ? sortOptions.direction : 'asc'
    };
  }
}
