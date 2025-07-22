
-- Insert some sample jets data
INSERT INTO public.jets (id, brand, model, type, seating_capacity, range_km, description, image_url) VALUES
(1, 'Cessna', 'Citation CJ3+', 'Light Jet', 8, 3700, 'Perfect for short to medium range flights with excellent fuel efficiency', '/src/assets/jet-interior.jpg'),
(2, 'Embraer', 'Phenom 300', 'Light Jet', 6, 3334, 'Spacious cabin with advanced avionics for comfortable business travel', '/src/assets/jet-interior.jpg'),
(3, 'Bombardier', 'Challenger 350', 'Super Mid-size', 10, 5926, 'Large cabin jet ideal for transcontinental flights with luxury amenities', '/src/assets/jet-interior.jpg'),
(4, 'Gulfstream', 'G650', 'Heavy Jet', 12, 11112, 'Ultra-long range jet with exceptional speed and comfort', '/src/assets/jet-interior.jpg'),
(5, 'Dassault', 'Falcon 7X', 'Heavy Jet', 14, 11019, 'Three-engine reliability with impressive range and cabin space', '/src/assets/jet-interior.jpg');

-- Insert sample flight data
INSERT INTO public.flights (id, departure_airport, arrival_airport, departure_time, arrival_time, price_per_seat, available_seats, operator, flight_duration, jet_id) VALUES
(gen_random_uuid(), 'Brussels (BRU)', 'Nice (NCE)', '2024-08-15 14:30:00+00', '2024-08-15 16:15:00+00', 2450, 6, 'JetLeg Charter', '1h 45m', 1),
(gen_random_uuid(), 'Brussels (BRU)', 'Paris (CDG)', '2024-08-15 09:15:00+00', '2024-08-15 10:00:00+00', 1890, 4, 'EuroJet', '45m', 2),
(gen_random_uuid(), 'Brussels (BRU)', 'London (LHR)', '2024-08-15 16:45:00+00', '2024-08-15 17:05:00+00', 3200, 8, 'Sky Executive', '1h 20m', 3),
(gen_random_uuid(), 'Paris (CDG)', 'Nice (NCE)', '2024-08-16 11:30:00+00', '2024-08-16 12:45:00+00', 2100, 5, 'Riviera Jets', '1h 15m', 1),
(gen_random_uuid(), 'London (LHR)', 'Zurich (ZUR)', '2024-08-17 08:00:00+00', '2024-08-17 10:30:00+00', 2800, 7, 'Alpine Air', '2h 30m', 2),
(gen_random_uuid(), 'Barcelona (BCN)', 'Ibiza (IBZ)', '2024-08-18 15:00:00+00', '2024-08-18 16:00:00+00', 1600, 3, 'Balearic Express', '1h 00m', 1),
(gen_random_uuid(), 'Milan (MXP)', 'Monaco (MCM)', '2024-08-19 13:15:00+00', '2024-08-19 14:30:00+00', 2200, 6, 'Mediterranean Jets', '1h 15m', 2),
(gen_random_uuid(), 'Frankfurt (FRA)', 'Vienna (VIE)', '2024-08-20 10:45:00+00', '2024-08-20 12:00:00+00', 1950, 4, 'Central European Air', '1h 15m', 1);

-- Add RLS policy for jets table to make it publicly readable
ALTER TABLE public.jets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view jets" 
ON public.jets 
FOR SELECT 
USING (true);
