
-- Update all existing flights to have departure times from August 2025 onwards
-- First, let's move all flights that are before August 2025 to August 2025 or later
UPDATE public.flights 
SET 
  departure_time = CASE 
    WHEN departure_time < '2025-08-01 00:00:00+00' THEN 
      '2025-08-01 00:00:00+00'::timestamp with time zone + 
      (EXTRACT(EPOCH FROM departure_time::time) || ' seconds')::interval +
      (RANDOM() * 30)::int * INTERVAL '1 day'
    ELSE departure_time
  END,
  arrival_time = CASE 
    WHEN departure_time < '2025-08-01 00:00:00+00' THEN 
      '2025-08-01 00:00:00+00'::timestamp with time zone + 
      (EXTRACT(EPOCH FROM departure_time::time) || ' seconds')::interval +
      (RANDOM() * 30)::int * INTERVAL '1 day' +
      (arrival_time - departure_time)
    ELSE arrival_time
  END;

-- Delete any existing sample flights to avoid duplicates
DELETE FROM public.flights WHERE operator IN (
  'Dutch Aviation', 'Europa Jets', 'Iberian Sky', 'Alpine Express', 'Swiss Connection',
  'Mediterranean Air', 'Balearic Wings', 'Hellenic Jets', 'Aegean Elite', 'Tuscan Air',
  'Nordic Jets', 'Hanseatic Air', 'Celtic Wings', 'Highland Express', 'Benelux Air',
  'Central European', 'Eastern Sky', 'Danube Jets', 'Bohemian Air', 'Habsburg Wings',
  'Riviera Luxury', 'Alpine Prestige', 'Monte Carlo Jets', 'Alpine Luxury', 'Côte d''Azur Air',
  'Executive Swiss', 'Franco-German Air', 'Swiss Italian', 'European Capital', 'Iberian Connect', 'Latin Connection'
);

-- Add 30 new flights with diverse routes starting from August 2025
INSERT INTO public.flights (departure_airport, arrival_airport, departure_time, arrival_time, price_per_seat, available_seats, operator, flight_duration, jet_id) VALUES
-- Popular European routes - August 2025
('Amsterdam (AMS)', 'London (LHR)', '2025-08-05 08:30:00+00', '2025-08-05 09:50:00+00', 2800, 6, 'Dutch Aviation', '1h 20m', 3),
('Paris (CDG)', 'Rome (FCO)', '2025-08-05 14:15:00+00', '2025-08-05 16:30:00+00', 3200, 8, 'Europa Jets', '2h 15m', 4),
('London (LHR)', 'Barcelona (BCN)', '2025-08-06 10:45:00+00', '2025-08-06 12:15:00+00', 2900, 7, 'Iberian Sky', '2h 30m', 2),
('Frankfurt (FRA)', 'Milan (MXP)', '2025-08-06 16:20:00+00', '2025-08-06 17:35:00+00', 2400, 5, 'Alpine Express', '1h 15m', 1),
('Brussels (BRU)', 'Geneva (GVA)', '2025-08-07 09:00:00+00', '2025-08-07 10:20:00+00', 2600, 6, 'Swiss Connection', '1h 20m', 5),

-- Mediterranean routes - August 2025
('Nice (NCE)', 'Naples (NAP)', '2025-08-07 13:45:00+00', '2025-08-07 15:00:00+00', 2200, 4, 'Mediterranean Air', '1h 15m', 1),
('Barcelona (BCN)', 'Palma (PMI)', '2025-08-08 11:30:00+00', '2025-08-08 12:15:00+00', 1800, 6, 'Balearic Wings', '45m', 2),
('Rome (FCO)', 'Athens (ATH)', '2025-08-08 15:00:00+00', '2025-08-08 17:30:00+00', 3400, 8, 'Hellenic Jets', '2h 30m', 3),
('Milan (MXP)', 'Santorini (JTR)', '2025-08-09 07:30:00+00', '2025-08-09 10:45:00+00', 4200, 10, 'Aegean Elite', '3h 15m', 4),
('Munich (MUC)', 'Florence (FLR)', '2025-08-09 12:15:00+00', '2025-08-09 13:30:00+00', 2300, 5, 'Tuscan Air', '1h 15m', 1),

-- Northern European routes - August 2025
('Copenhagen (CPH)', 'Stockholm (ARN)', '2025-08-10 08:45:00+00', '2025-08-10 10:00:00+00', 2500, 7, 'Nordic Jets', '1h 15m', 2),
('Amsterdam (AMS)', 'Hamburg (HAM)', '2025-08-10 14:30:00+00', '2025-08-10 15:45:00+00', 2100, 6, 'Hanseatic Air', '1h 15m', 1),
('Brussels (BRU)', 'Dublin (DUB)', '2025-08-11 10:00:00+00', '2025-08-11 11:30:00+00', 2700, 8, 'Celtic Wings', '1h 30m', 3),
('London (LHR)', 'Edinburgh (EDI)', '2025-08-11 16:45:00+00', '2025-08-11 18:00:00+00', 2200, 5, 'Highland Express', '1h 15m', 2),
('Paris (CDG)', 'Amsterdam (AMS)', '2025-08-12 09:30:00+00', '2025-08-12 10:45:00+00', 1900, 6, 'Benelux Air', '1h 15m', 1),

-- Eastern European routes - August 2025
('Vienna (VIE)', 'Prague (PRG)', '2025-08-12 13:20:00+00', '2025-08-12 14:15:00+00', 1700, 4, 'Central European', '55m', 2),
('Berlin (BER)', 'Warsaw (WAW)', '2025-08-13 11:00:00+00', '2025-08-13 12:30:00+00', 2300, 7, 'Eastern Sky', '1h 30m', 3),
('Budapest (BUD)', 'Vienna (VIE)', '2025-08-13 15:45:00+00', '2025-08-13 16:30:00+00', 1600, 5, 'Danube Jets', '45m', 1),
('Frankfurt (FRA)', 'Prague (PRG)', '2025-08-14 08:15:00+00', '2025-08-14 09:30:00+00', 2000, 6, 'Bohemian Air', '1h 15m', 2),
('Munich (MUC)', 'Budapest (BUD)', '2025-08-14 17:00:00+00', '2025-08-14 18:30:00+00', 2400, 8, 'Habsburg Wings', '1h 30m', 4),

-- Luxury weekend routes - September 2025
('London (LHR)', 'Cannes (CEQ)', '2025-09-05 10:30:00+00', '2025-09-05 13:15:00+00', 4500, 12, 'Riviera Luxury', '2h 45m', 5),
('Paris (CDG)', 'St. Moritz (SMV)', '2025-09-05 14:00:00+00', '2025-09-05 15:30:00+00', 3800, 10, 'Alpine Prestige', '1h 30m', 4),
('Brussels (BRU)', 'Monaco (MCM)', '2025-09-06 09:45:00+00', '2025-09-06 11:30:00+00', 4200, 8, 'Monte Carlo Jets', '1h 45m', 3),
('Frankfurt (FRA)', 'Courchevel (CVF)', '2025-09-06 16:30:00+00', '2025-09-06 18:00:00+00', 3600, 6, 'Alpine Luxury', '1h 30m', 2),
('Amsterdam (AMS)', 'St. Tropez (LTT)', '2025-09-07 11:15:00+00', '2025-09-07 13:45:00+00', 4000, 9, 'Côte d''Azur Air', '2h 30m', 4),

-- Business routes - September 2025
('Zurich (ZUR)', 'London (LHR)', '2025-09-10 07:00:00+00', '2025-09-10 08:30:00+00', 3200, 8, 'Executive Swiss', '1h 30m', 3),
('Frankfurt (FRA)', 'Paris (CDG)', '2025-09-10 18:45:00+00', '2025-09-10 20:00:00+00', 2500, 7, 'Franco-German Air', '1h 15m', 2),
('Milan (MXP)', 'Geneva (GVA)', '2025-09-11 12:30:00+00', '2025-09-11 13:45:00+00', 2300, 5, 'Swiss Italian', '1h 15m', 1),
('Vienna (VIE)', 'Brussels (BRU)', '2025-09-11 15:15:00+00', '2025-09-11 17:00:00+00', 2800, 6, 'European Capital', '1h 45m', 3),
('Madrid (MAD)', 'Lisbon (LIS)', '2025-09-12 13:45:00+00', '2025-09-12 14:30:00+00', 1900, 4, 'Iberian Connect', '45m', 1),
('Rome (FCO)', 'Madrid (MAD)', '2025-09-12 10:20:00+00', '2025-09-12 12:30:00+00', 3100, 7, 'Latin Connection', '2h 10m', 2);
