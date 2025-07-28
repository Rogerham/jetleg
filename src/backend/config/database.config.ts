
// Database configuratie en constanten
export const DATABASE_CONFIG = {
  CACHE_TIMES: {
    FLIGHTS: 5 * 60 * 1000, // 5 minuten
    STALE_TIME: 2 * 60 * 1000, // 2 minuten
    LONG_CACHE: 30 * 60 * 1000, // 30 minuten
  },
  
  QUERY_LIMITS: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    SEARCH_SUGGESTIONS: 8,
  },
  
  FLEXIBLE_DATE_OPTIONS: [
    'today',
    'tomorrow', 
    'weekend',
    'next-week',
    'next-month',
    'flexible',
    'fully-flexible'
  ] as const,
  
  SPECIAL_LOCATIONS: {
    ALL_AIRPORTS: 'Alle luchthavens',
    EVERYWHERE: 'Overal'
  } as const
} as const;

export type FlexibleDateOption = typeof DATABASE_CONFIG.FLEXIBLE_DATE_OPTIONS[number];
