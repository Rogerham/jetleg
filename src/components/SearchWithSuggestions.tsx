import { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Calendar, Users, Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

const popularAirports: Airport[] = [
  { code: 'BRU', name: 'Brussels Airport', city: 'Brussels', country: 'Belgium' },
  { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam', country: 'Netherlands' },
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France' },
  { code: 'LHR', name: 'Heathrow', city: 'London', country: 'United Kingdom' },
  { code: 'FRA', name: 'Frankfurt am Main', city: 'Frankfurt', country: 'Germany' },
  { code: 'NCE', name: 'Nice Côte d\'Azur', city: 'Nice', country: 'France' },
  { code: 'ZUR', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland' },
  { code: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Germany' },
  { code: 'VIE', name: 'Vienna International', city: 'Vienna', country: 'Austria' },
  { code: 'MXP', name: 'Milan Malpensa', city: 'Milan', country: 'Italy' },
];

interface SearchWithSuggestionsProps {
  className?: string;
}

const SearchWithSuggestions = ({ className = '' }: SearchWithSuggestionsProps) => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '1'
  });

  const [suggestions, setSuggestions] = useState<{
    from: Airport[];
    to: Airport[];
  }>({
    from: [],
    to: []
  });

  const [activeSuggestion, setActiveSuggestion] = useState<{
    field: 'from' | 'to' | null;
  }>({
    field: null
  });

  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setActiveSuggestion({ field: null });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'from' || field === 'to') {
      if (value.length > 0) {
        const filtered = popularAirports.filter(airport =>
          airport.name.toLowerCase().includes(value.toLowerCase()) ||
          airport.city.toLowerCase().includes(value.toLowerCase()) ||
          airport.code.toLowerCase().includes(value.toLowerCase()) ||
          airport.country.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(prev => ({
          ...prev,
          [field]: filtered.slice(0, 6)
        }));
        setActiveSuggestion({ field: field as 'from' | 'to' });
      } else {
        setSuggestions(prev => ({
          ...prev,
          [field]: []
        }));
        setActiveSuggestion({ field: null });
      }
    }
  };

  const handleSuggestionClick = (field: 'from' | 'to', airport: Airport) => {
    setSearchData(prev => ({
      ...prev,
      [field]: `${airport.city} (${airport.code})`
    }));
    setActiveSuggestion({ field: null });
    setSuggestions(prev => ({
      ...prev,
      [field]: []
    }));
  };

  const handleEverywhere = () => {
    setSearchData(prev => ({
      ...prev,
      to: 'Overal'
    }));
    setActiveSuggestion({ field: null });
    setSuggestions(prev => ({
      ...prev,
      to: []
    }));
  };

  const handleSwapLocations = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev.to === 'Overal' ? '' : prev.to,
      to: prev.from
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchData.from || !searchData.to || !searchData.date) {
      return;
    }

    const searchParams = new URLSearchParams({
      from: searchData.from,
      to: searchData.to,
      date: searchData.date,
      passengers: searchData.passengers
    });

    navigate(`/search-results?${searchParams.toString()}`);
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className={`search-form-jetleg max-w-5xl mx-auto animate-fade-in ${className}`}>
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* From Field */}
        <div className="text-left relative" ref={suggestionsRef}>
          <label htmlFor="from" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Van
          </label>
          <input 
            ref={fromInputRef}
            type="text" 
            id="from"
            value={searchData.from}
            onChange={(e) => handleInputChange('from', e.target.value)}
            onFocus={() => {
              if (searchData.from.length > 0) {
                setActiveSuggestion({ field: 'from' });
              }
            }}
            placeholder="bv. Brussel" 
            className="input-jetleg"
            required
          />
          
          {/* From Suggestions */}
          {activeSuggestion.field === 'from' && suggestions.from.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-xl mt-1 shadow-lg z-10 max-h-64 overflow-y-auto">
              {suggestions.from.map((airport) => (
                <button
                  key={airport.code}
                  type="button"
                  onClick={() => handleSuggestionClick('from', airport)}
                  className="w-full px-4 py-3 text-left hover:bg-muted border-b border-border last:border-b-0 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Plane className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{airport.city} ({airport.code})</div>
                      <div className="text-sm text-muted-foreground">{airport.name}, {airport.country}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Swap Button */}
        <div className="flex justify-center lg:order-3">
          <button
            type="button"
            onClick={handleSwapLocations}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            title="Wissel vertrek en bestemming"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>
        
        {/* To Field */}
        <div className="text-left relative lg:order-2">
          <label htmlFor="to" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Naar
          </label>
          <input 
            ref={toInputRef}
            type="text" 
            id="to"
            value={searchData.to}
            onChange={(e) => handleInputChange('to', e.target.value)}
            onFocus={() => {
              if (searchData.to.length > 0 && searchData.to !== 'Overal') {
                setActiveSuggestion({ field: 'to' });
              }
            }}
            placeholder="bv. Nice" 
            className="input-jetleg"
            required
          />
          
          {/* To Suggestions */}
          {activeSuggestion.field === 'to' && (
            <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-xl mt-1 shadow-lg z-10 max-h-64 overflow-y-auto">
              {/* Everywhere Option */}
              <button
                type="button"
                onClick={handleEverywhere}
                className="w-full px-4 py-3 text-left hover:bg-muted border-b border-border transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-accent to-[hsl(var(--jetleg-amber-dark))] rounded-lg flex items-center justify-center">
                    <Search className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Overal</div>
                    <div className="text-sm text-muted-foreground">Vind de beste deals naar elke bestemming</div>
                  </div>
                </div>
              </button>
              
              {suggestions.to.map((airport) => (
                <button
                  key={airport.code}
                  type="button"
                  onClick={() => handleSuggestionClick('to', airport)}
                  className="w-full px-4 py-3 text-left hover:bg-muted border-b border-border last:border-b-0 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Plane className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{airport.city} ({airport.code})</div>
                      <div className="text-sm text-muted-foreground">{airport.name}, {airport.country}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Date Field */}
        <div className="text-left lg:order-4">
          <label htmlFor="date" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Datum
          </label>
          <input 
            type="date" 
            id="date"
            value={searchData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            min={minDate}
            className="input-jetleg"
            required
          />
        </div>
        
        {/* Passengers Field */}
        <div className="text-left lg:order-5">
          <label htmlFor="passengers" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Passagiers
          </label>
          <select 
            id="passengers"
            value={searchData.passengers}
            onChange={(e) => handleInputChange('passengers', e.target.value)}
            className="input-jetleg"
            required
          >
            {[...Array(20)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? 'passagier' : 'passagiers'}
              </option>
            ))}
          </select>
        </div>
        
        {/* Search Button */}
        <button type="submit" className="btn-jetleg-primary w-full lg:col-span-1 lg:order-6 flex items-center justify-center gap-2">
          <Search className="h-5 w-5" />
          Zoek Vluchten
        </button>
      </form>
    </div>
  );
};

export default SearchWithSuggestions;