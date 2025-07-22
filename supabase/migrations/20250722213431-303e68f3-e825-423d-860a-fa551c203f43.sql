
-- Fix the malformed airport entry
UPDATE public.flights 
SET departure_airport = 'London (LHR)' 
WHERE departure_airport = 'London (LHR}';

-- Add more flights from popular airports to ensure dropdown suggestions work properly
-- We need at least 2 flights from each major airport for the suggestions to work

-- Add more flights from London (LHR)
INSERT INTO public.flights (departure_airport, arrival_airport, departure_time, arrival_time, price_per_seat, available_seats, operator, flight_duration, jet_id) VALUES
('London (LHR)', 'Paris (CDG)', '2025-08-15 10:30:00+00', '2025-08-15 12:45:00+00', 2800, 8, 'London Express', '2h 15m', 1),
('London (LHR)', 'Amsterdam (AMS)', '2025-08-15 14:20:00+00', '2025-08-15 16:05:00+00', 2600, 6, 'Anglo Dutch Air', '1h 45m', 2),
('London (LHR)', 'Rome (FCO)', '2025-08-16 09:15:00+00', '2025-08-16 12:30:00+00', 3400, 10, 'British Roman', '3h 15m', 3),
('London (LHR)', 'Berlin (BER)', '2025-08-16 16:45:00+00', '2025-08-16 18:50:00+00', 2900, 7, 'Germanic Wings', '2h 05m', 4),
('London (LHR)', 'Geneva (GVA)', '2025-08-17 11:00:00+00', '2025-08-17 13:30:00+00', 3200, 9, 'Alpine British', '2h 30m', 5);

-- Add more flights from Paris (CDG)
INSERT INTO public.flights (departure_airport, arrival_airport, departure_time, arrival_time, price_per_seat, available_seats, operator, flight_duration, jet_id) VALUES
('Paris (CDG)', 'London (LHR)', '2025-08-15 08:45:00+00', '2025-08-15 10:00:00+00', 2750, 7, 'Franco British', '1h 15m', 2),
('Paris (CDG)', 'Barcelona (BCN)', '2025-08-15 13:30:00+00', '2025-08-15 15:45:00+00', 2400, 8, 'Iberian French', '2h 15m', 1),
('Paris (CDG)', 'Milan (MXP)', '2025-08-16 10:20:00+00', '2025-08-16 12:15:00+00', 2800, 6, 'Franco Italian', '1h 55m', 3),
('Paris (CDG)', 'Munich (MUC)', '2025-08-16 15:45:00+00', '2025-08-16 17:30:00+00', 2650, 9, 'Bavarian French', '1h 45m', 4);

-- Add more flights from Amsterdam (AMS)
INSERT INTO public.flights (departure_airport, arrival_airport, departure_time, arrival_time, price_per_seat, available_seats, operator, flight_duration, jet_id) VALUES
('Amsterdam (AMS)', 'Paris (CDG)', '2025-08-15 12:15:00+00', '2025-08-15 14:00:00+00', 2300, 5, 'Dutch French', '1h 45m', 1),
('Amsterdam (AMS)', 'Brussels (BRU)', '2025-08-15 17:30:00+00', '2025-08-15 18:15:00+00', 1800, 4, 'Benelux Connect', '45m', 2),
('Amsterdam (AMS)', 'Rome (FCO)', '2025-08-16 09:45:00+00', '2025-08-16 12:30:00+00', 3100, 8, 'Dutch Roman', '2h 45m', 5),
('Amsterdam (AMS)', 'Vienna (VIE)', '2025-08-16 14:20:00+00', '2025-08-16 16:15:00+00', 2700, 7, 'Austrian Dutch', '1h 55m', 3);

-- Add more flights from Brussels (BRU)  
INSERT INTO public.flights (departure_airport, arrival_airport, departure_time, arrival_time, price_per_seat, available_seats, operator, flight_duration, jet_id) VALUES
('Brussels (BRU)', 'Amsterdam (AMS)', '2025-08-15 11:00:00+00', '2025-08-15 11:45:00+00', 1750, 6, 'Netherlands Belgian', '45m', 1),
('Brussels (BRU)', 'Frankfurt (FRA)', '2025-08-15 16:15:00+00', '2025-08-15 17:30:00+00', 2200, 8, 'German Belgian', '1h 15m', 2),
('Brussels (BRU)', 'Vienna (VIE)', '2025-08-16 13:45:00+00', '2025-08-16 15:30:00+00', 2500, 5, 'Austrian Belgian', '1h 45m', 4);

-- Add more flights from Frankfurt (FRA)
INSERT INTO public.flights (departure_airport, arrival_airport, departure_time, arrival_time, price_per_seat, available_seats, operator, flight_duration, jet_id) VALUES
('Frankfurt (FRA)', 'Brussels (BRU)', '2025-08-15 09:30:00+00', '2025-08-15 10:45:00+00', 2150, 7, 'Belgian German', '1h 15m', 3),
('Frankfurt (FRA)', 'London (LHR)', '2025-08-15 14:00:00+00', '2025-08-15 15:30:00+00', 2900, 9, 'British German', '1h 30m', 5),
('Frankfurt (FRA)', 'Zurich (ZUR)', '2025-08-16 11:45:00+00', '2025-08-16 12:30:00+00', 2000, 6, 'Swiss German', '45m', 1);
