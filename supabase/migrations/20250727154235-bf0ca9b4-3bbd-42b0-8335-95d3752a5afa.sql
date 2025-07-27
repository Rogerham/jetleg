
-- Add foreign key constraint between flights and jets tables
ALTER TABLE public.flights 
ADD CONSTRAINT fk_flights_jet_id 
FOREIGN KEY (jet_id) REFERENCES public.jets(id);

-- Add foreign key constraint between bookings and flights tables  
ALTER TABLE public.bookings
ADD CONSTRAINT fk_bookings_flight_id
FOREIGN KEY (flight_id) REFERENCES public.flights(id);

-- Add foreign key constraint between bookings and profiles tables
ALTER TABLE public.bookings
ADD CONSTRAINT fk_bookings_user_id
FOREIGN KEY (user_id) REFERENCES public.profiles(id);

-- Add performance indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_flights_departure_airport ON public.flights(departure_airport);
CREATE INDEX IF NOT EXISTS idx_flights_arrival_airport ON public.flights(arrival_airport);  
CREATE INDEX IF NOT EXISTS idx_flights_departure_time ON public.flights(departure_time);
CREATE INDEX IF NOT EXISTS idx_flights_price_per_seat ON public.flights(price_per_seat);
CREATE INDEX IF NOT EXISTS idx_flights_available_seats ON public.flights(available_seats);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_flight_id ON public.bookings(flight_id);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at);

-- Add composite index for common flight search queries
CREATE INDEX IF NOT EXISTS idx_flights_search ON public.flights(departure_airport, arrival_airport, departure_time, available_seats);
