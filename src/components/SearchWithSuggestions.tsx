
import { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Calendar, Users, Plane, ArrowLeftRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { worldwideAirports, type Airport } from '@/data/airports';
import PassengerCounter from './PassengerCounter';

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
    setSearchData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'from' || field === 'to') {
      if (value.length > 0 && value !== 'Overal') {
        const filtered = worldwideAirports.filter(airport =>
          airport.name.toLowerCase().includes(value.toLowerCase()) ||
          airport.city.toLowerCase().includes(value.toLowerCase()) ||
          airport.code.toLowerCase().includes(value.toLowerCase()) ||
          airport.country.toLowerCase().includes(value.toLowerCase())
        );
        
        setSuggestions(prev => ({ ...prev, [field]: filtered.slice(0, 8) }));
        setActiveSuggestion({ field: field as 'from' | 'to' });
      } else {
        setSuggestions(prev => ({ ...prev, [field]: [] }));
        if (value !== 'Overal') {
          setActiveSuggestion({ field: null });
        }
      }
    }
  };

  const handleSuggestionClick = (field: 'from' | 'to', airport: Airport) => {
    const airportText = `${airport.city} (${airport.code})`;
    setSearchData(prev => ({ ...prev, [field]: airportText }));
    setActiveSuggestion({ field: null });
    setSuggestions(prev => ({ ...prev, [field]: [] }));
    
    // Focus the next field after selection
    if (field === 'from' && toInputRef.current) {
      toInputRef.current.focus();
    }
  };

  const handleEverywhere = () => {
    setSearchData(prev => ({ ...prev, to: 'Overal' }));
    setActiveSuggestion({ field: null });
    setSuggestions(prev => ({ ...prev, to: [] }));
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
    <div className={`search-form-jetleg max-w-6xl mx-auto animate-fade-in ${className}`}>
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4">
          {/* From and To Fields Row */}
          <div className="flex items-end gap-2 relative" ref={suggestionsRef}>
            {/* From Field */}
            <div className="flex-1">
              <label htmlFor="from" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Van
              </label>
              <input
                ref={fromInputRef}
                type="text"
                id="from"
                value={searchData.from}
                onChange={e => handleInputChange('from', e.target.value)}
                onFocus={() => {
                  if (searchData.from.length > 0) {
                    setActiveSuggestion({ field: 'from' });
                  }
                }}
                placeholder="bv. Brussel"
                className="input-jetleg h-12"
                required
              />
            </div>
            
            {/* Swap Button */}
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={handleSwapLocations}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                title="Wissel vertrek en bestemming"
              >
                <ArrowLeftRight className="w-4 h-4 text-white" />
              </button>
            </div>
            
            {/* To Field */}
            <div className="flex-1">
              <label htmlFor="to" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Naar
              </label>
              <input
                ref={toInputRef}
                type="text"
                id="to"
                value={searchData.to}
                onChange={e => handleInputChange('to', e.target.value)}
                onFocus={() => {
                  setActiveSuggestion({ field: 'to' });
                }}
                placeholder="bv. Nice"
                className="input-jetleg h-12"
                required
              />
            </div>
            
            {/* Suggestions for mobile */}
            {activeSuggestion.field === 'from' && suggestions.from.length > 0 && (
              <div className="absolute top-full left-0 right-[50%] bg-white border border-border rounded-xl mt-1 shadow-lg z-50 max-h-64 overflow-y-auto">
                {suggestions.from.map(airport => (
                  <button
                    key={airport.code}
                    type="button"
                    onClick={() => handleSuggestionClick('from', airport)}
                    className="w-full px-4 py-3 text-left border-b border-border last:border-b-0 transition-colors bg-white hover:bg-gray-100"
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
            
            {activeSuggestion.field === 'to' && (
              <div className="absolute top-full left-[50%] right-0 bg-white border border-border rounded-xl mt-1 shadow-lg z-50 max-h-64 overflow-y-auto">
                {/* Everywhere Option */}
                <button
                  type="button"
                  onClick={handleEverywhere}
                  className="w-full px-4 py-3 text-left hover:bg-muted border-b border-border transition-colors bg-white"
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
                
                {suggestions.to.map(airport => (
                  <button
                    key={airport.code}
                    type="button"
                    onClick={() => handleSuggestionClick('to', airport)}
                    className="w-full px-4 py-3 text-left hover:bg-muted border-b border-border last:border-b-0 transition-colors bg-white"
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
          
          {/* Date and Passengers Row */}
          <div className="flex items-end gap-4">
            {/* Date Field */}
            <div className="flex-1">
              <label htmlFor="date-mobile" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Datum
              </label>
              <input
                type="date"
                id="date-mobile"
                value={searchData.date}
                onChange={e => handleInputChange('date', e.target.value)}
                min={minDate}
                className="input-jetleg h-12"
                required
              />
            </div>
            
            {/* Passengers Field */}
            <div className="flex-shrink-0 w-24">
              <label htmlFor="passengers-mobile" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Pax
              </label>
              <PassengerCounter
                value={searchData.passengers}
                onChange={value => handleInputChange('passengers', value)}
                className="h-12"
                hideArrows
              />
            </div>
          </div>
          
          {/* Search Button */}
          <button type="submit" className="btn-jetleg-primary h-12 px-6 flex items-center justify-center gap-2 whitespace-nowrap w-full">
            <Search className="h-5 w-5" />
            Zoek Vluchten
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-end gap-4 lg:gap-1">
          {/* From Field */}
          <div className="flex-1 min-w-0 relative" ref={suggestionsRef}>
            <label htmlFor="from-desktop" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Van
            </label>
            <input
              type="text"
              id="from-desktop"
              value={searchData.from}
              onChange={e => handleInputChange('from', e.target.value)}
              onFocus={() => {
                if (searchData.from.length > 0) {
                  setActiveSuggestion({ field: 'from' });
                }
              }}
              placeholder="bv. Brussel"
              className="input-jetleg h-12"
              required
            />
            
            {/* From Suggestions */}
            {activeSuggestion.field === 'from' && suggestions.from.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-xl mt-1 shadow-lg z-50 max-h-64 overflow-y-auto">
                {suggestions.from.map(airport => (
                  <button
                    key={airport.code}
                    type="button"
                    onClick={() => handleSuggestionClick('from', airport)}
                    className="w-full px-4 py-3 text-left border-b border-border last:border-b-0 transition-colors bg-white hover:bg-gray-100"
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
          <div className="flex-shrink-0 self-end mb-1">
            <button
              type="button"
              onClick={handleSwapLocations}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              title="Wissel vertrek en bestemming"
            >
              <ArrowLeftRight className="w-5 h-5 text-white" />
            </button>
          </div>
          
          {/* To Field */}
          <div className="flex-1 min-w-0 relative">
            <label htmlFor="to-desktop" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Naar
            </label>
            <input
              type="text"
              id="to-desktop"
              value={searchData.to}
              onChange={e => handleInputChange('to', e.target.value)}
              onFocus={() => {
                setActiveSuggestion({ field: 'to' });
              }}
              placeholder="bv. Nice"
              className="input-jetleg h-12"
              required
            />
            
            {/* To Suggestions */}
            {activeSuggestion.field === 'to' && (
              <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-xl mt-1 shadow-lg z-50 max-h-64 overflow-y-auto">
                {/* Everywhere Option */}
                <button
                  type="button"
                  onClick={handleEverywhere}
                  className="w-full px-4 py-3 text-left hover:bg-muted border-b border-border transition-colors bg-white"
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
                
                {suggestions.to.map(airport => (
                  <button
                    key={airport.code}
                    type="button"
                    onClick={() => handleSuggestionClick('to', airport)}
                    className="w-full px-4 py-3 text-left hover:bg-muted border-b border-border last:border-b-0 transition-colors bg-white"
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
          <div className="flex-shrink-0 w-40">
            <label htmlFor="date-desktop" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Datum
            </label>
            <input
              type="date"
              id="date-desktop"
              value={searchData.date}
              onChange={e => handleInputChange('date', e.target.value)}
              min={minDate}
              className="input-jetleg h-12"
              required
            />
          </div>
          
          {/* Passengers Field */}
          <div className="flex-shrink-0 w-24">
            <label htmlFor="passengers-desktop" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Pax
            </label>
            <PassengerCounter
              value={searchData.passengers}
              onChange={value => handleInputChange('passengers', value)}
              className="h-12"
              hideArrows
            />
          </div>
          
          {/* Search Button */}
          <div className="flex-shrink-0 self-end">
            <button type="submit" className="btn-jetleg-primary h-12 px-6 flex items-center justify-center gap-2 whitespace-nowrap">
              <Search className="h-5 w-5" />
              Zoek Vluchten
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchWithSuggestions;
