import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Filter, SlidersHorizontal, MapPin, Clock, Users, Plane, Star, ArrowLeft, Calendar } from 'lucide-react';
import FlightCard from '@/components/FlightCard';
import SearchWithSuggestions from '@/components/SearchWithSuggestions';
import ActiveFilters from '@/components/ActiveFilters';
interface Flight {
  id: string;
  route: {
    from: string;
    to: string;
    fromCode: string;
    toCode: string;
  };
  date: string;
  aircraft: string;
  maxPassengers: number;
  price: number;
  discount: number;
  image: string;
  imageAlt: string;
  duration: string;
  departure: string;
  arrival: string;
  rating: number;
}
const mockFlights: Flight[] = [{
  id: '1',
  route: {
    from: 'Brussels',
    to: 'Nice',
    fromCode: 'BRU',
    toCode: 'NCE'
  },
  date: '2024-08-15',
  aircraft: 'Cessna Citation CJ3+',
  maxPassengers: 8,
  price: 2450,
  discount: 65,
  image: '/src/assets/jet-interior.jpg',
  imageAlt: 'Luxe privéjet interieur',
  duration: '1h 45m',
  departure: '14:30',
  arrival: '16:15',
  rating: 4.8
}, {
  id: '2',
  route: {
    from: 'Brussels',
    to: 'Paris',
    fromCode: 'BRU',
    toCode: 'CDG'
  },
  date: '2024-08-15',
  aircraft: 'Embraer Phenom 300',
  maxPassengers: 6,
  price: 1890,
  discount: 58,
  image: '/src/assets/paris-aerial.jpg',
  imageAlt: 'Luchtfoto van Parijs',
  duration: '45m',
  departure: '09:15',
  arrival: '10:00',
  rating: 4.9
}, {
  id: '3',
  route: {
    from: 'Brussels',
    to: 'London',
    fromCode: 'BRU',
    toCode: 'LHR'
  },
  date: '2024-08-15',
  aircraft: 'Bombardier Challenger 350',
  maxPassengers: 10,
  price: 3200,
  discount: 72,
  image: '/src/assets/london-aerial.jpg',
  imageAlt: 'Luchtfoto van Londen',
  duration: '1h 20m',
  departure: '16:45',
  arrival: '17:05',
  rating: 4.7
}];
const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [flights, setFlights] = useState<Flight[]>(mockFlights);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(mockFlights);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('price');
  const [filters, setFilters] = useState({
    maxPrice: 5000,
    minPassengers: 1,
    aircraft: '',
    timeOfDay: 'any'
  });
  const searchData = {
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    date: searchParams.get('date') || '',
    passengers: searchParams.get('passengers') || '1'
  };
  useEffect(() => {
    let filtered = [...flights];

    // Apply filters
    filtered = filtered.filter(flight => {
      if (flight.price > filters.maxPrice) return false;
      if (flight.maxPassengers < filters.minPassengers) return false;
      if (filters.aircraft && !flight.aircraft.toLowerCase().includes(filters.aircraft.toLowerCase())) return false;
      if (filters.timeOfDay !== 'any') {
        const hour = parseInt(flight.departure.split(':')[0]);
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
          return a.price - b.price;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        case 'departure':
          return a.departure.localeCompare(b.departure);
        case 'rating':
          return b.rating - a.rating;
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
      aircraft: '',
      timeOfDay: 'any'
    });
  };
  return <div className="min-h-screen bg-background">
      {/* Search Bar */}
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
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
              Vluchten van {searchData.from} naar {searchData.to}
            </h1>
            <p className="text-muted-foreground flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {searchData.date}
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
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-accent/20">
                <option value="price">Prijs (laag naar hoog)</option>
                <option value="duration">Vliegduur</option>
                <option value="departure">Vertrektijd</option>
                <option value="rating">Beoordeling</option>
              </select>
            </div>

            {/* Filter Toggle */}
            
          </div>
        </div>

        {/* Active Filters */}
        <ActiveFilters filters={filters} onRemoveFilter={handleRemoveFilter} onClearAll={handleClearAllFilters} />

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
                <input type="range" min="500" max="10000" step="100" value={filters.maxPrice} onChange={e => handleFilterChange('maxPrice', parseInt(e.target.value))} className="w-full accent-accent" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>€500</span>
                  <span>€10.000</span>
                </div>
              </div>

              {/* Minimum Passengers */}
              

              {/* Aircraft Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Vliegtuigtype
                </label>
                <input type="text" value={filters.aircraft} onChange={e => handleFilterChange('aircraft', e.target.value)} placeholder="bv. Cessna, Embraer" className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground" />
              </div>

              {/* Time of Day */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Vertrektijd
                </label>
                <div className="space-y-2">
                  {[{
                  value: 'any',
                  label: 'Alle tijden'
                }, {
                  value: 'morning',
                  label: 'Ochtend (06:00 - 12:00)'
                }, {
                  value: 'afternoon',
                  label: 'Middag (12:00 - 18:00)'
                }, {
                  value: 'evening',
                  label: 'Avond (18:00 - 24:00)'
                }].map(option => <label key={option.value} className="flex items-center gap-2">
                      <input type="radio" name="timeOfDay" value={option.value} checked={filters.timeOfDay === option.value} onChange={e => handleFilterChange('timeOfDay', e.target.value)} className="accent-accent" />
                      <span className="text-sm text-foreground">{option.label}</span>
                    </label>)}
                </div>
              </div>

              {/* Clear Filters */}
              <button onClick={() => setFilters({
              maxPrice: 5000,
              minPassengers: 1,
              aircraft: '',
              timeOfDay: 'any'
            })} className="w-full text-accent hover:text-accent/80 text-sm font-medium transition-colors">
                Wis alle filters
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {filteredFlights.length === 0 ? <div className="text-center py-12">
                <Plane className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Geen vluchten gevonden</h3>
                <p className="text-muted-foreground mb-4">
                  Probeer je zoekcriteria aan te passen of kies andere filters.
                </p>
                <button onClick={() => setFilters({
              maxPrice: 5000,
              minPassengers: 1,
              aircraft: '',
              timeOfDay: 'any'
            })} className="btn-jetleg-primary">
                  Reset filters
                </button>
              </div> : <div className="space-y-6">
                {filteredFlights.map(flight => <div key={flight.id} className="card-jetleg overflow-hidden">
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                        {/* Flight Info */}
                        <div className="lg:col-span-2">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="text-center">
                              <div className="text-xl font-bold text-foreground">{flight.departure}</div>
                              <div className="text-sm text-muted-foreground">{flight.route.fromCode}</div>
                            </div>
                            
                            <div className="flex-1 relative">
                              <div className="border-t border-dashed border-border"></div>
                              <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 bg-background px-2">
                                <Plane className="h-4 w-4 text-accent" />
                              </div>
                              <div className="text-center text-xs text-muted-foreground mt-1">
                                {flight.duration}
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <div className="text-xl font-bold text-foreground">{flight.arrival}</div>
                              <div className="text-sm text-muted-foreground">{flight.route.toCode}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="font-medium text-foreground">{flight.aircraft}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                Max {flight.maxPassengers} passagiers
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-current text-accent" />
                                {flight.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="lg:col-span-1">
                          <img src={flight.image} alt={flight.imageAlt} className="w-full h-24 object-cover rounded-lg" />
                        </div>

                        {/* Price & Book */}
                        <div className="lg:col-span-1 text-center lg:text-right">
                          <div className="mb-2">
                            <span className="deal-badge">-{flight.discount}%</span>
                          </div>
                          <div className="text-2xl font-bold text-foreground mb-1">
                            €{flight.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground mb-4">per vlucht</div>
                          <button onClick={() => navigate(`/booking/${flight.id}`)} className="btn-jetleg-primary w-full lg:w-auto">
                            Boek Nu
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default SearchResults;