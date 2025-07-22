
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Filter, SlidersHorizontal, MapPin, Clock, Users, Plane, Star, ArrowLeft, Calendar } from 'lucide-react';
import SearchWithSuggestions from '@/components/SearchWithSuggestions';
import ActiveFilters from '@/components/ActiveFilters';
import { useFlights, type Flight } from '@/hooks/useFlights';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('price');
  const [filters, setFilters] = useState({
    maxPrice: 5000,
    minPassengers: 1,
    maxPassengers: 20,
    aircraft: '',
    timeOfDay: 'any'
  });

  const searchData = {
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    date: searchParams.get('date') || '',
    passengers: searchParams.get('passengers') || '1'
  };

  const { data: flights = [], isLoading, error } = useFlights(searchData);

  useEffect(() => {
    let filtered = [...flights];

    // Apply filters
    filtered = filtered.filter(flight => {
      if (flight.price_per_seat > filters.maxPrice) return false;
      if (flight.available_seats < filters.minPassengers) return false;
      if (flight.jets.seating_capacity > filters.maxPassengers) return false;
      if (filters.aircraft && !`${flight.jets.brand} ${flight.jets.model}`.toLowerCase().includes(filters.aircraft.toLowerCase())) return false;
      if (filters.timeOfDay !== 'any') {
        const hour = new Date(flight.departure_time).getHours();
        if (filters.timeOfDay === 'morning' && (hour < 6 || hour >= 12)) return false;
        if (filters.timeOfDay === 'afternoon' && (hour < 12 || hour >= 18)) return false;
        if (filters.timeOfDay === 'evening' && (hour < 18 || hour >= 24)) return false;
      }
      return true;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price_per_seat - b.price_per_seat;
        case 'duration':
          return parseInt(a.flight_duration) - parseInt(b.flight_duration);
        case 'departure':
          return new Date(a.departure_time).getTime() - new Date(b.departure_time).getTime();
        default:
          return 0;
      }
    });

    setFilteredFlights(filtered);
  }, [flights, filters, sortBy]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleRemoveFilter = (key: string) => {
    const defaultFilters = {
      maxPrice: 5000,
      minPassengers: 1,
      maxPassengers: 20,
      aircraft: '',
      timeOfDay: 'any'
    };
    setFilters(prev => ({
      ...prev,
      [key]: defaultFilters[key as keyof typeof defaultFilters]
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      maxPrice: 5000,
      minPassengers: 1,
      maxPassengers: 20,
      aircraft: '',
      timeOfDay: 'any'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL');
  };

  const extractAirportCode = (airport: string) => {
    const match = airport.match(/\(([^)]+)\)/);
    return match ? match[1] : airport.slice(-3);
  };

  const extractCityName = (airport: string) => {
    return airport.split('(')[0].trim();
  };

  const getSearchResultsTitle = () => {
    const fromText = searchData.from || 'Alle luchthavens';
    const toText = searchData.to === 'Overal' ? 'alle bestemmingen' : searchData.to || 'alle bestemmingen';
    return `Vluchten van ${fromText} naar ${toText}`;
  };

  const getDateDisplayText = () => {
    if (!searchData.date) return 'Alle data';
    
    const flexibleOptions: { [key: string]: string } = {
      'today': 'Vandaag',
      'tomorrow': 'Morgen',
      'weekend': 'Dit weekend',
      'next-week': 'Volgende week',
      'next-month': 'Volgende maand',
      'flexible': 'Flexibele data'
    };

    return flexibleOptions[searchData.date] || searchData.date;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Plane className="h-16 w-16 text-accent mx-auto mb-4 animate-pulse" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Vluchten zoeken...</h3>
          <p className="text-muted-foreground">We zoeken de beste beschikbare vluchten voor je.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Plane className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Er is een fout opgetreden</h3>
          <p className="text-muted-foreground mb-4">We konden geen vluchten laden. Probeer het opnieuw.</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-jetleg-primary"
          >
            Opnieuw proberen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Search Bar */}
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Terug naar home
            </button>
          </div>
          
          <SearchWithSuggestions className="max-w-none" />
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Results Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-title text-foreground mb-2">
              {getSearchResultsTitle()}
            </h1>
            <p className="text-muted-foreground flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {getDateDisplayText()}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {searchData.passengers} {parseInt(searchData.passengers) === 1 ? 'passagier' : 'passagiers'}
              </span>
              <span className="font-medium text-accent">
                {filteredFlights.length} beschikbare vluchten
              </span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sorteer op:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-accent/20"
              >
                <option value="price">Prijs (laag naar hoog)</option>
                <option value="duration">Vliegduur</option>
                <option value="departure">Vertrektijd</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        <ActiveFilters
          filters={filters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="card-jetleg p-6 sticky top-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h3>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Max. prijs: €{filters.maxPrice}
                </label>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={filters.maxPrice}
                  onChange={e => handleFilterChange('maxPrice', parseInt(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>€500</span>
                  <span>€10.000</span>
                </div>
              </div>

              {/* Aircraft Size Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Vliegtuiggrootte (passagiers)
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">
                      Minimum: {filters.minPassengers}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={filters.minPassengers}
                      onChange={e => handleFilterChange('minPassengers', parseInt(e.target.value))}
                      className="w-full accent-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">
                      Maximum: {filters.maxPassengers}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={filters.maxPassengers}
                      onChange={e => handleFilterChange('maxPassengers', parseInt(e.target.value))}
                      className="w-full accent-accent"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1 pax</span>
                  <span>20 pax</span>
                </div>
              </div>

              {/* Aircraft Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Vliegtuigtype
                </label>
                <input
                  type="text"
                  value={filters.aircraft}
                  onChange={e => handleFilterChange('aircraft', e.target.value)}
                  placeholder="bv. Cessna, Embraer"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
                />
              </div>

              {/* Time of Day */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Vertrektijd
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'any', label: 'Alle tijden' },
                    { value: 'morning', label: 'Ochtend (06:00 - 12:00)' },
                    { value: 'afternoon', label: 'Middag (12:00 - 18:00)' },
                    { value: 'evening', label: 'Avond (18:00 - 24:00)' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="timeOfDay"
                        value={option.value}
                        checked={filters.timeOfDay === option.value}
                        onChange={e => handleFilterChange('timeOfDay', e.target.value)}
                        className="accent-accent"
                      />
                      <span className="text-sm text-foreground">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={handleClearAllFilters}
                className="w-full text-accent hover:text-accent/80 text-sm font-medium transition-colors"
              >
                Wis alle filters
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {filteredFlights.length === 0 ? (
              <div className="text-center py-12">
                <Plane className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Geen vluchten gevonden</h3>
                <p className="text-muted-foreground mb-4">
                  Probeer je zoekcriteria aan te passen of kies andere filters.
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="btn-jetleg-primary"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredFlights.map(flight => (
                  <div key={flight.id} className="card-jetleg overflow-hidden">
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                        {/* Flight Info */}
                        <div className="lg:col-span-2">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="text-center">
                              <div className="text-xl font-bold text-foreground">{formatTime(flight.departure_time)}</div>
                              <div className="text-sm text-muted-foreground">{extractAirportCode(flight.departure_airport)}</div>
                            </div>
                            
                            <div className="flex-1 relative">
                              <div className="border-t border-dashed border-border"></div>
                              <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 bg-background px-2">
                                <Plane className="h-4 w-4 text-accent" />
                              </div>
                              <div className="text-center text-xs text-muted-foreground mt-1">
                                {flight.flight_duration}
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <div className="text-xl font-bold text-foreground">{formatTime(flight.arrival_time)}</div>
                              <div className="text-sm text-muted-foreground">{extractAirportCode(flight.arrival_airport)}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="font-medium text-foreground">
                              {flight.jets.brand} {flight.jets.model}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {flight.available_seats} beschikbaar
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {flight.operator}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="lg:col-span-1">
                          <img
                            src={flight.jets.image_url}
                            alt={`${flight.jets.brand} ${flight.jets.model}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                        </div>

                        {/* Price & Book */}
                        <div className="lg:col-span-1 text-center lg:text-right">
                          <div className="text-2xl font-bold text-foreground mb-1">
                            €{flight.price_per_seat.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground mb-4">per persoon</div>
                          <button
                            onClick={() => navigate(`/booking/${flight.id}`, {
                              state: { flight }
                            })}
                            className="btn-jetleg-primary w-full lg:w-auto"
                          >
                            Boek Nu
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
