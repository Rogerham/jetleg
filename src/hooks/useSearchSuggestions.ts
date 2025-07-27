
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { worldwideAirports } from '@/data/airports';

interface SearchSuggestion {
  value: string;
  label: string;
  type: 'airport' | 'city' | 'special' | 'popular';
  frequency?: number;
}

const POPULAR_ROUTES = [
  { from: 'London (LGW)', to: 'Paris (CDG)', frequency: 150 },
  { from: 'Amsterdam (AMS)', to: 'Barcelona (BCN)', frequency: 120 },
  { from: 'Frankfurt (FRA)', to: 'Rome (FCO)', frequency: 100 },
  { from: 'Brussels (BRU)', to: 'Milan (MXP)', frequency: 90 },
  { from: 'Zurich (ZUR)', to: 'Nice (NCE)', frequency: 80 },
  { from: 'Vienna (VIE)', to: 'London (LGW)', frequency: 75 },
  { from: 'Munich (MUC)', to: 'Barcelona (BCN)', frequency: 70 },
  { from: 'Berlin (BER)', to: 'Rome (FCO)', frequency: 65 }
];

// Convert airport objects to display format
const airportsDisplayList = worldwideAirports.map(airport => 
  `${airport.city} (${airport.code})`
);

export const useSearchSuggestions = (query: string, field: 'from' | 'to') => {
  return useQuery({
    queryKey: ['search-suggestions', query, field],
    queryFn: async (): Promise<SearchSuggestion[]> => {
      if (query.length < 2) return [];

      const suggestions: SearchSuggestion[] = [];
      const queryLower = query.toLowerCase();

      // Add special options first
      if (field === 'from' && 'alle luchthavens'.includes(queryLower)) {
        suggestions.push({
          value: 'Alle luchthavens',
          label: 'Alle luchthavens',
          type: 'special'
        });
      }
      
      if (field === 'to' && 'overal'.includes(queryLower)) {
        suggestions.push({
          value: 'Overal',
          label: 'Overal - Any destination',
          type: 'special'
        });
      }

      // Add airport matches
      const airportMatches = airportsDisplayList
        .filter(airport => airport.toLowerCase().includes(queryLower))
        .slice(0, 6)
        .map(airport => ({
          value: airport,
          label: airport,
          type: 'airport' as const
        }));

      suggestions.push(...airportMatches);

      // Add popular route suggestions
      const routeMatches = POPULAR_ROUTES
        .filter(route => {
          const location = field === 'from' ? route.from : route.to;
          return location.toLowerCase().includes(queryLower) && 
                 !suggestions.some(s => s.value === location);
        })
        .slice(0, 3)
        .map(route => ({
          value: field === 'from' ? route.from : route.to,
          label: `${field === 'from' ? route.from : route.to} (Popular route)`,
          type: 'popular' as const,
          frequency: route.frequency
        }));

      suggestions.push(...routeMatches);

      // Sort by relevance
      return suggestions
        .sort((a, b) => {
          // Special options first
          if (a.type === 'special' && b.type !== 'special') return -1;
          if (b.type === 'special' && a.type !== 'special') return 1;
          
          // Then popular routes
          if (a.type === 'popular' && b.type !== 'popular') return -1;
          if (b.type === 'popular' && a.type !== 'popular') return 1;
          
          // Then by frequency if both are popular
          if (a.type === 'popular' && b.type === 'popular') {
            return (b.frequency || 0) - (a.frequency || 0);
          }
          
          // Finally alphabetical
          return a.label.localeCompare(b.label);
        })
        .slice(0, 8);
    },
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to get trending searches
export const useTrendingSearches = () => {
  return useQuery({
    queryKey: ['trending-searches'],
    queryFn: async () => {
      // In a real app, this would fetch from analytics
      return POPULAR_ROUTES
        .sort((a, b) => b.frequency - a.frequency)
        .slice(0, 6)
        .map(route => ({
          from: route.from,
          to: route.to,
          label: `${route.from} → ${route.to}`,
          frequency: route.frequency
        }));
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};
