
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create flights table for storing available flights
CREATE TABLE public.flights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  aircraft_type TEXT NOT NULL,
  departure_airport TEXT NOT NULL,
  arrival_airport TEXT NOT NULL,
  departure_time TIMESTAMP WITH TIME ZONE NOT NULL,
  arrival_time TIMESTAMP WITH TIME ZONE NOT NULL,
  price_per_seat DECIMAL(10,2) NOT NULL,
  available_seats INTEGER NOT NULL DEFAULT 8,
  operator TEXT NOT NULL,
  flight_duration TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table for storing user flight bookings
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  flight_id UUID REFERENCES public.flights(id) ON DELETE CASCADE NOT NULL,
  passenger_count INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10,2) NOT NULL,
  booking_status TEXT NOT NULL DEFAULT 'confirmed',
  passenger_details JSONB,
  payment_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- RLS Policies for flights (public read access)
CREATE POLICY "Anyone can view flights" 
  ON public.flights 
  FOR SELECT 
  TO public 
  USING (true);

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings" 
  ON public.bookings 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
  ON public.bookings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
  ON public.bookings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, phone)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.raw_user_meta_data ->> 'phone'
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample flight data
INSERT INTO public.flights (aircraft_type, departure_airport, arrival_airport, departure_time, arrival_time, price_per_seat, available_seats, operator, flight_duration) VALUES
('Citation CJ3+', 'Amsterdam (AMS)', 'London (LHR)', '2024-01-25 10:00:00+00', '2024-01-25 11:30:00+00', 2500.00, 6, 'EuroJet Charter', '1h 30m'),
('Phenom 300', 'Paris (CDG)', 'Nice (NCE)', '2024-01-26 14:00:00+00', '2024-01-26 15:45:00+00', 1800.00, 8, 'French Aviation', '1h 45m'),
('King Air 350', 'Frankfurt (FRA)', 'Zurich (ZUR)', '2024-01-27 09:30:00+00', '2024-01-27 10:45:00+00', 1200.00, 7, 'Alpine Air', '1h 15m'),
('Citation Sovereign', 'Milan (MXP)', 'Barcelona (BCN)', '2024-01-28 16:00:00+00', '2024-01-28 17:30:00+00', 2200.00, 8, 'Mediterranean Jets', '1h 30m');
